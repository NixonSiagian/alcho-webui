/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 *
 * Lightweight advisor config — safe to import synchronously anywhere.
 * Deliberately free of the Gemini SDK so the heavy `advisor.ts` module can be
 * code-split and loaded only when the user actually sends a message.
 *
 * IMPORTANT (build-time key): the values below are produced by Vite's `define`
 * which inlines `process.env.GEMINI_API_KEY` / `process.env.API_KEY` AT BUILD
 * TIME from `loadEnv()` (i.e. `.env.local` / shell env on the build machine).
 * If the production build runs without those, the bundle ships without a key.
 */

export const ADVISOR_REFUSAL = 'I can only assist with Alcho Foods products and applications.';

/** Placeholder shipped in .env.example — treated as "no key". */
const PLACEHOLDER_KEYS = new Set(['YOUR_GEMINI_API_KEY', 'MY_APP_URL', '']);

function readRaw(): { value: string; source: 'GEMINI_API_KEY' | 'API_KEY' | 'none' } {
  try {
    if (process.env.GEMINI_API_KEY) return { value: process.env.GEMINI_API_KEY, source: 'GEMINI_API_KEY' };
    if (process.env.API_KEY) return { value: process.env.API_KEY, source: 'API_KEY' };
  } catch {
    // `process` not defined (define didn't run) — fall through.
  }
  return { value: '', source: 'none' };
}

export function getAdvisorApiKey(): string | undefined {
  const { value } = readRaw();
  const trimmed = (value || '').trim();
  if (!trimmed || PLACEHOLDER_KEYS.has(trimmed)) return undefined;
  return trimmed;
}

export function isAdvisorConfigured(): boolean {
  return Boolean(getAdvisorApiKey());
}

export interface AdvisorKeyStatus {
  present: boolean;
  source: 'GEMINI_API_KEY' | 'API_KEY' | 'none';
  length: number;
  looksPlaceholder: boolean;
}

/** Safe, non-leaking diagnostic about the inlined key (never returns the key). */
export function getAdvisorKeyStatus(): AdvisorKeyStatus {
  const { value, source } = readRaw();
  const trimmed = (value || '').trim();
  return {
    present: Boolean(trimmed) && !PLACEHOLDER_KEYS.has(trimmed),
    source,
    length: trimmed.length,
    looksPlaceholder: PLACEHOLDER_KEYS.has(trimmed) && trimmed.length > 0,
  };
}

// One-time startup diagnostic. Confirms which variable was read and whether a
// usable key was detected — without ever printing the key value itself.
{
  const s = getAdvisorKeyStatus();
  console.info(
    `[Alcho Advisor] key status — source=${s.source} present=${s.present} length=${s.length}` +
      (s.looksPlaceholder ? ' (PLACEHOLDER value detected — set a real GEMINI_API_KEY at build time)' : ''),
  );
}
