/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 *
 * AI Market Intelligence — mock API layer.
 *
 * The UI depends only on `fetchMarketIntelligence()`. Today it returns a mock
 * snapshot after a simulated latency. Swapping in the real backend is a one-line
 * change inside this function — no component touches the network directly.
 *
 * ── FUTURE BACKEND INTEGRATION ───────────────────────────────────────────────
 * Daily automation workflow (runs once / 24h as a scheduled job, e.g. cron or a
 * serverless scheduler):
 *   1. Fetch F&B industry news from RSS feeds + trusted sources.
 *   2. Send collected articles to the AI model.
 *   3. Extract trending flavors, trending products, consumer-behavior changes
 *      and market opportunities.
 *   4. Generate human-readable summaries (insight + opportunities).
 *   5. Persist the resulting `MarketIntelligenceRecord` to the database.
 *   6. The website reads the latest record; clients refresh every 24h.
 *
 * To go live, implement `MARKET_INTEL_ENDPOINT` server-side and replace the
 * mock branch below with the real `fetch(...)` call (already stubbed).
 */

import type { MarketIntelligenceSnapshot } from './types';
import { createMockSnapshot } from './mock-data';

/** Read-only endpoint the website will call once the backend is deployed. */
export const MARKET_INTEL_ENDPOINT = '/api/market-intelligence/latest';

/** Toggle to flip the data source without touching the UI. */
const USE_MOCK = true;

/**
 * Shape persisted by the daily pipeline. Mirrors the snapshot plus storage
 * metadata, so the database row and the API response stay in lock-step.
 */
export interface MarketIntelligenceRecord extends MarketIntelligenceSnapshot {
  /** Database primary key, e.g. "2026-06-06". */
  id: string;
  /** Pipeline version that produced the record (for reproducibility). */
  pipelineVersion: string;
  /** RSS / source feeds consumed for this run. */
  feeds: string[];
}

const delay = (ms: number) => new Promise<void>((resolve) => setTimeout(resolve, ms));

/**
 * Returns the latest daily intelligence snapshot.
 * `signal` lets callers abort in-flight requests on unmount.
 */
export async function fetchMarketIntelligence(
  signal?: AbortSignal,
): Promise<MarketIntelligenceSnapshot> {
  if (USE_MOCK) {
    // Simulate network + AI inference latency so skeletons are exercised.
    await delay(900);
    if (signal?.aborted) throw new DOMException('Aborted', 'AbortError');
    return createMockSnapshot();
  }

  // ── Real implementation (enabled when USE_MOCK = false) ───────────────────
  const res = await fetch(MARKET_INTEL_ENDPOINT, {
    headers: { Accept: 'application/json' },
    signal,
  });
  if (!res.ok) {
    throw new Error(`Failed to load market intelligence (${res.status})`);
  }
  return (await res.json()) as MarketIntelligenceSnapshot;
}
