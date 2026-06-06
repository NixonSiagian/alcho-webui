/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 *
 * Section 1 — Daily AI Insight. One premium, glassmorphic featured card with
 * the AI conclusion, confidence, articles analyzed, timestamp and an animated
 * refresh indicator.
 */

import { motion } from 'motion/react';
import { Sparkles, RefreshCw, FileText, Gauge } from 'lucide-react';
import { cn } from '../../../lib/utils';
import { relativeTime } from '../../../lib/market-intelligence/format';
import type { DailyInsight as Insight } from '../../../lib/market-intelligence/types';
import { useIntel } from './theme';
import { GlassCard, Skeleton, ScoreRing, CountUp } from './primitives';

interface Props {
  insight?: Insight;
  loading: boolean;
  refreshing: boolean;
  onRefresh: () => void;
}

export default function DailyInsight({ insight, loading, refreshing, onRefresh }: Props) {
  const p = useIntel();

  return (
    <GlassCard className="relative overflow-hidden p-5 sm:p-7">
      {/* Ambient gradient accent */}
      <div className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-brand-primary/20 blur-[120px]" />

      <div className="relative flex flex-wrap items-center justify-between gap-3">
        <div className="inline-flex items-center gap-2.5">
          <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-brand-primary/15 text-brand-primary">
            <Sparkles size={16} />
          </span>
          <div className="flex flex-col">
            <span className="text-[11px] font-bold uppercase tracking-[0.3em] text-brand-primary">
              Daily AI Insight
            </span>
            <span className={cn('flex items-center gap-1.5 text-[11px]', p.faint)}>
              <LiveDot /> Auto-generated · refreshes every 24h
            </span>
          </div>
        </div>

        <button
          type="button"
          onClick={onRefresh}
          disabled={refreshing || loading}
          className={cn(
            'inline-flex items-center gap-2 rounded-full border px-3.5 py-2 text-[11px] font-bold uppercase tracking-widest transition-all disabled:opacity-60',
            p.chip,
            p.hover,
          )}
        >
          <RefreshCw size={13} className={cn(refreshing && 'animate-spin')} />
          {refreshing ? 'Analyzing' : 'Refresh'}
        </button>
      </div>

      {loading ? (
        <div className="relative mt-6 space-y-3">
          <Skeleton className="h-6 w-3/4" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-2/3" />
        </div>
      ) : insight ? (
        <div className="relative mt-6 grid gap-6 lg:grid-cols-[1fr_auto] lg:items-center">
          <div>
            <motion.h3
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className={cn('text-xl font-bold leading-snug sm:text-2xl', p.text)}
            >
              {insight.title}
            </motion.h3>
            <p className={cn('mt-3 max-w-2xl text-sm leading-relaxed', p.muted)}>{insight.summary}</p>

            <div className="mt-5 flex flex-wrap items-center gap-2.5">
              <Stat icon={<FileText size={13} />} value={<CountUp value={insight.articlesAnalyzed} />} label="Articles" />
              <Stat icon={<Gauge size={13} />} value={<CountUp value={insight.confidence} suffix="%" />} label="Confidence" />
              <span className={cn('rounded-full border px-3 py-1.5 text-[11px] font-semibold', p.chip)}>
                Updated {relativeTime(insight.updatedAt)}
              </span>
            </div>
          </div>

          <div className="flex flex-none items-center lg:justify-center">
            <ScoreRing value={insight.confidence} label="confidence" size={84} />
          </div>
        </div>
      ) : null}
    </GlassCard>
  );
}

function Stat({ icon, label, value }: { icon: React.ReactNode; label: string; value: React.ReactNode }) {
  const p = useIntel();
  return (
    <div className={cn('inline-flex items-center gap-2 rounded-full border px-3 py-1.5', p.chip)}>
      <span className="text-brand-primary">{icon}</span>
      <span className={cn('text-sm font-bold', p.text)}>{value}</span>
      <span className="text-[11px] font-semibold uppercase tracking-wider opacity-70">{label}</span>
    </div>
  );
}

function LiveDot() {
  return (
    <span className="relative flex h-2 w-2">
      <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-brand-accent opacity-75" />
      <span className="relative inline-flex h-2 w-2 rounded-full bg-brand-accent" />
    </span>
  );
}
