/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 *
 * React hook that loads the daily AI Market Intelligence snapshot through the
 * mock API, exposing loading / refreshing / error states for skeletons and the
 * animated refresh indicator. Also schedules a 24h auto-refresh to mirror the
 * production cadence.
 */

import { useCallback, useEffect, useRef, useState } from 'react';
import { fetchMarketIntelligence } from './api';
import type { MarketIntelligenceSnapshot } from './types';

const ONE_DAY_MS = 24 * 60 * 60 * 1000;

interface State {
  data: MarketIntelligenceSnapshot | null;
  loading: boolean;
  refreshing: boolean;
  error: Error | null;
}

export interface MarketIntelligence extends State {
  /** Manually re-run the analysis fetch (also used by the refresh button). */
  refresh: () => void;
}

export function useMarketIntelligence(): MarketIntelligence {
  const [state, setState] = useState<State>({
    data: null,
    loading: true,
    refreshing: false,
    error: null,
  });
  const mounted = useRef(true);

  const load = useCallback((mode: 'initial' | 'refresh') => {
    const controller = new AbortController();
    setState((prev) => ({
      ...prev,
      loading: mode === 'initial',
      refreshing: mode === 'refresh',
      error: null,
    }));

    fetchMarketIntelligence(controller.signal)
      .then((data) => {
        if (!mounted.current) return;
        setState({ data, loading: false, refreshing: false, error: null });
      })
      .catch((error: unknown) => {
        if (!mounted.current || (error as Error).name === 'AbortError') return;
        setState((prev) => ({
          ...prev,
          loading: false,
          refreshing: false,
          error: error instanceof Error ? error : new Error('Unknown error'),
        }));
      });

    return () => controller.abort();
  }, []);

  useEffect(() => {
    mounted.current = true;
    const abort = load('initial');
    const interval = setInterval(() => load('refresh'), ONE_DAY_MS);
    return () => {
      mounted.current = false;
      abort();
      clearInterval(interval);
    };
  }, [load]);

  const refresh = useCallback(() => load('refresh'), [load]);

  return { ...state, refresh };
}
