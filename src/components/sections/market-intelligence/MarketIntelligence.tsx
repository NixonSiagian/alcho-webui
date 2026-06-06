/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 *
 * AI Market Intelligence — orchestrator.
 *
 * Composes all six dashboard sections, owns the scoped dark/light theme, and
 * feeds each section from the `useMarketIntelligence` hook (loading skeletons,
 * animated refresh, 24h auto-refresh). This reads as an AI intelligence
 * platform — not a news page: AI conclusions lead, sources are last.
 */

import { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import { BrainCircuit, Sun, Moon, AlertTriangle } from 'lucide-react';
import { cn } from '../../../lib/utils';
import { useMarketIntelligence } from '../../../lib/market-intelligence/useMarketIntelligence';
import { relativeTime } from '../../../lib/market-intelligence/format';
import { buildPalette, IntelThemeProvider } from './theme';
import HeroPanel from './HeroPanel';
import DailyInsight from './DailyInsight';
import TrendingFlavors from './TrendingFlavors';
import ViralProducts from './ViralProducts';
import OpportunityRadar from './OpportunityRadar';
import AutomationPipeline from './AutomationPipeline';
import SourceNews from './SourceNews';

const THEME_KEY = 'alcho-intel-theme';

export default function MarketIntelligence() {
  const [dark, setDark] = useState(true);
  const palette = buildPalette(dark);
  const { data, loading, refreshing, error, refresh } = useMarketIntelligence();

  useEffect(() => {
    const saved = typeof localStorage !== 'undefined' ? localStorage.getItem(THEME_KEY) : null;
    if (saved) setDark(saved === 'dark');
  }, []);

  const toggleTheme = () => {
    setDark((d) => {
      const next = !d;
      try {
        localStorage.setItem(THEME_KEY, next ? 'dark' : 'light');
      } catch {
        /* ignore persistence errors */
      }
      return next;
    });
  };

  return (
    <IntelThemeProvider value={palette}>
      <section
        id="market-intelligence"
        aria-label="AI Market Intelligence"
        className={cn('relative overflow-hidden py-16 transition-colors duration-500 lg:py-20', palette.section, palette.text)}
      >
        {/* Ambient backdrop */}
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute left-1/4 top-0 h-[420px] w-[420px] -translate-x-1/2 rounded-full bg-brand-primary/10 blur-[160px]" />
          {dark && <div className="absolute bottom-0 right-1/4 h-[360px] w-[360px] rounded-full bg-brand-accent/10 blur-[160px]" />}
        </div>

        <div className="relative mx-auto max-w-7xl px-6">
          <Header
            dark={dark}
            onToggle={toggleTheme}
            generatedAt={data?.generatedAt}
            loading={loading}
            flavors={data?.flavors ?? []}
            insight={data?.insight}
          />

          {error ? (
            <ErrorState onRetry={refresh} />
          ) : (
            <div className="mt-12 space-y-12">
              <DailyInsight insight={data?.insight} loading={loading} refreshing={refreshing} onRefresh={refresh} />
              <TrendingFlavors flavors={data?.flavors ?? []} loading={loading} />
              <ViralProducts products={data?.products ?? []} loading={loading} />
              <OpportunityRadar opportunities={data?.opportunities ?? []} loading={loading} />
              <AutomationPipeline />
              <SourceNews sources={data?.sources ?? []} loading={loading} />
            </div>
          )}
        </div>
      </section>
    </IntelThemeProvider>
  );
}

function Header({
  dark,
  onToggle,
  generatedAt,
  loading,
  flavors,
  insight,
}: {
  dark: boolean;
  onToggle: () => void;
  generatedAt?: string;
  loading: boolean;
  flavors: import('../../../lib/market-intelligence/types').FlavorTrend[];
  insight?: import('../../../lib/market-intelligence/types').DailyInsight;
}) {
  const palette = buildPalette(dark);
  return (
    <div className="grid items-center gap-10 lg:grid-cols-[1.05fr_0.95fr]">
      {/* Left: positioning copy */}
      <div className="max-w-2xl">
        <div className="mb-5 flex items-center gap-3">
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.6 }}
            className={cn('inline-flex items-center gap-2.5 rounded-full border px-4 py-2', palette.chip)}
          >
            <BrainCircuit size={15} className="text-brand-primary" />
            <span className="text-[11px] font-bold uppercase tracking-[0.3em] text-brand-primary">
              AI Market Intelligence
            </span>
          </motion.div>

          {/* Small icon-only theme toggle (replaces the large labeled button) */}
          <button
            type="button"
            onClick={onToggle}
            aria-label={dark ? 'Switch to light mode' : 'Switch to dark mode'}
            title={dark ? 'Light mode' : 'Dark mode'}
            className={cn(
              'flex h-9 w-9 items-center justify-center rounded-full border transition-all hover:text-brand-primary',
              palette.chip,
              palette.hover,
            )}
          >
            {dark ? <Sun size={15} /> : <Moon size={15} />}
          </button>
        </div>

        <h2 className={cn('text-4xl font-bold leading-[1.08] md:text-5xl lg:text-6xl', palette.text)}>
          The food industry, <span className="italic text-brand-primary">decoded daily</span>
        </h2>
        <p className={cn('mt-4 text-base leading-relaxed lg:text-lg', palette.muted)}>
          Our AI continuously analyzes food &amp; beverage news to surface flavor trends, snack and
          beverage shifts, and seasoning opportunities — so you see conclusions, not noise.
        </p>
        {!loading && generatedAt && (
          <p className={cn('mt-4 inline-flex items-center gap-2 text-[11px] font-semibold uppercase tracking-widest', palette.faint)}>
            <span className="h-1.5 w-1.5 rounded-full bg-brand-accent" />
            Latest analysis generated {relativeTime(generatedAt)}
          </p>
        )}
      </div>

      {/* Right: live analytics preview */}
      <HeroPanel flavors={flavors} insight={insight} loading={loading} />
    </div>
  );
}

function ErrorState({ onRetry }: { onRetry: () => void }) {
  const palette = buildPalette(false);
  return (
    <div className={cn('mt-12 flex flex-col items-center gap-4 rounded-3xl border p-12 text-center', palette.card)}>
      <AlertTriangle className="text-brand-secondary" />
      <p className={palette.muted}>We couldn't load the latest analysis. Please try again.</p>
      <button type="button" onClick={onRetry} className="btn-primary px-6 py-3 text-xs uppercase tracking-widest">
        Retry
      </button>
    </div>
  );
}
