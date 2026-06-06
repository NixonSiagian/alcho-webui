/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 *
 * Alcho Product Advisor — Retrieval-Augmented Generation over Alcho data.
 *
 * Retrieves grounding documents from the knowledge base and calls Gemini with a
 * strict, scope-limited system instruction. The model is only allowed to answer
 * Alcho-related questions and must ground every answer in the retrieved context,
 * never inventing products, codes, prices, or laboratory values.
 */

import { GoogleGenAI } from '@google/genai';
import { retrieve } from './advisor-kb';
import { ADVISOR_REFUSAL, getAdvisorApiKey, getAdvisorKeyStatus } from './advisor-config';

const MODEL = 'gemini-2.5-flash';
const LOG = '[Alcho Advisor]';

/** Structured error carrying the exact failing step + provider detail. */
export class AdvisorError extends Error {
  constructor(
    message: string,
    readonly step: 'NOT_CONFIGURED' | 'RETRIEVE' | 'GEMINI_CALL' | 'EMPTY_RESPONSE',
    readonly status?: number,
    readonly cause?: unknown,
  ) {
    super(message);
    this.name = 'AdvisorError';
  }
}

export { ADVISOR_REFUSAL };

const SYSTEM_INSTRUCTION = `You are the Alcho Product Advisor, an assistant for Alcho Foods
(PT. NEW ALFA OMEGA UTAMA), an industrial seasoning and flavor manufacturer serving HORECA and OEM
food businesses in Indonesia.

STRICT SCOPE — you may ONLY help with:
- Alcho products and product categories
- Product applications and usage
- Recipes that use Alcho products
- HORECA recommendations
- Packaging
- Technical documentation (storage, shelf life, certifications, available documents)

If the user asks about anything outside this scope — including politics, programming, general knowledge,
mathematics, religion, personal advice, current events, or any non-Alcho product or brand — you MUST reply
with EXACTLY this sentence and nothing else:
"${ADVISOR_REFUSAL}"

GROUNDING RULES:
- Base every answer ONLY on the CONTEXT provided with the user's message.
- NEVER invent or guess product names, product codes, specifications, prices, or nutritional/laboratory
  values. If a detail is not in the CONTEXT, state that it is available upon request and suggest contacting
  the Alcho technical team (phone 031 866 8858, WhatsApp 0812 4918 6623, email qc@alchofoods.com).
- When recommending products, reference them by name and code, e.g. "Alcho Beef Powder (BS-003)".
- If the question is within scope but the CONTEXT does not contain the answer, do not refuse and do not
  guess — explain what is available and point to the technical team or the Resource Center downloads.

STYLE: concise, factual and professional, written for food manufacturers and chefs. Use short paragraphs
or bullet points. No marketing fluff or exaggerated claims.`;

function getApiKey(): string | undefined {
  return getAdvisorApiKey();
}

let client: GoogleGenAI | null = null;
function getClient(): GoogleGenAI | null {
  if (client) return client;
  const apiKey = getApiKey();
  if (!apiKey) return null;
  client = new GoogleGenAI({ apiKey });
  return client;
}

export function isAdvisorConfigured(): boolean {
  return Boolean(getApiKey());
}

export interface AdvisorTurn {
  role: 'user' | 'assistant';
  content: string;
}

export interface AdvisorSource {
  title: string;
  source: string;
  ref?: string;
}

export interface AdvisorResult {
  text: string;
  sources: AdvisorSource[];
}

export async function askAdvisor(history: AdvisorTurn[], query: string): Promise<AdvisorResult> {
  const keyStatus = getAdvisorKeyStatus();
  console.info(`${LOG} askAdvisor() — query length=${query.length}, history turns=${history.length}`);
  console.info(`${LOG} env/key status:`, keyStatus);

  const ai = getClient();
  if (!ai) {
    console.error(`${LOG} STEP=NOT_CONFIGURED — no usable API key inlined in this build.`, keyStatus);
    throw new AdvisorError(
      keyStatus.looksPlaceholder
        ? 'GEMINI_API_KEY is a placeholder value in this build.'
        : 'GEMINI_API_KEY is missing from this build.',
      'NOT_CONFIGURED',
    );
  }

  let docs: ReturnType<typeof retrieve>;
  try {
    docs = retrieve(query, 6);
    console.info(`${LOG} STEP=RETRIEVE — ${docs.length} grounding docs matched.`);
  } catch (err) {
    console.error(`${LOG} STEP=RETRIEVE failed`, err);
    throw new AdvisorError('Knowledge-base retrieval failed.', 'RETRIEVE', undefined, err);
  }

  const context = docs.length
    ? docs.map((d, i) => `[${i + 1}] (${d.source}) ${d.title}\n${d.text}`).join('\n\n')
    : 'No matching Alcho catalog, recipe, technical, or company information was found for this query.';

  const contents = history.slice(-6).map((m) => ({
    role: m.role === 'assistant' ? 'model' : 'user',
    parts: [{ text: m.content }],
  }));
  contents.push({
    role: 'user',
    parts: [
      {
        text: `CONTEXT (authoritative Alcho sources):\n${context}\n\n---\nUSER QUESTION: ${query}`,
      },
    ],
  });

  let response: Awaited<ReturnType<typeof ai.models.generateContent>>;
  try {
    console.info(`${LOG} STEP=GEMINI_CALL — model=${MODEL}, contents=${contents.length} parts`);
    const t0 = Date.now();
    response = await ai.models.generateContent({
      model: MODEL,
      contents,
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
        temperature: 0.2,
        maxOutputTokens: 1024,
        thinkingConfig: { thinkingBudget: 0 },
      },
    });
    console.info(`${LOG} STEP=GEMINI_CALL ok in ${Date.now() - t0}ms`);
  } catch (err) {
    const status = extractStatus(err);
    console.error(`${LOG} STEP=GEMINI_CALL FAILED — status=${status ?? 'n/a'}`, err);
    if (err instanceof Error && err.stack) console.error(`${LOG} stack:\n${err.stack}`);
    throw new AdvisorError(
      `Gemini request failed${status ? ` (HTTP ${status})` : ''}: ${
        err instanceof Error ? err.message : String(err)
      }`,
      'GEMINI_CALL',
      status,
      err,
    );
  }

  const text = (response.text ?? '').trim();
  console.info(`${LOG} response text length=${text.length}`);
  if (!text) {
    console.warn(`${LOG} STEP=EMPTY_RESPONSE — model returned no text; treating as refusal.`);
    return { text: ADVISOR_REFUSAL, sources: [] };
  }

  const isRefusal = text.replace(/["']/g, '').trim() === ADVISOR_REFUSAL.replace(/["']/g, '');
  const sources: AdvisorSource[] = isRefusal
    ? []
    : docs.slice(0, 4).map((d) => ({ title: d.title, source: d.source, ref: d.ref }));

  return { text, sources };
}

/** Best-effort extraction of an HTTP status from a GoogleGenAI / fetch error. */
function extractStatus(err: unknown): number | undefined {
  if (typeof err !== 'object' || err === null) return undefined;
  const e = err as Record<string, unknown>;
  if (typeof e.status === 'number') return e.status;
  if (typeof e.code === 'number') return e.code;
  const msg = typeof e.message === 'string' ? e.message : '';
  const m = msg.match(/\b(4\d\d|5\d\d)\b/);
  return m ? Number(m[1]) : undefined;
}
