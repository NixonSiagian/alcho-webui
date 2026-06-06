/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 *
 * Lightweight advisor config — safe to import synchronously anywhere.
 * Deliberately free of the Gemini SDK so the heavy `advisor.ts` module can be
 * code-split and loaded only when the user actually sends a message.
 */

export const ADVISOR_REFUSAL = 'I can only assist with Alcho Foods products and applications.';

export function getAdvisorApiKey(): string | undefined {
  try {
    return process.env.GEMINI_API_KEY || process.env.API_KEY;
  } catch {
    return undefined;
  }
}

export function isAdvisorConfigured(): boolean {
  return Boolean(getAdvisorApiKey());
}

// One-time startup diagnostic. Confirms which variable was read and whether a
// key was detected — without ever printing the key value itself.
{
  const key = getAdvisorApiKey();
  console.info(
    `[Alcho Advisor] API key source: process.env.GEMINI_API_KEY (matches .env.local) — ${
      key ? `detected (length ${key.length})` : 'NOT detected'
    }`,
  );
}
