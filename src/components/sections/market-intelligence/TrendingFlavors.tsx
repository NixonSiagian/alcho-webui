/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 *
 * Section 2 — Trending Flavors. Interactive metric cards with animated progress
 * bars, growth %, confidence and trend direction.
 */

import { motion } from 'motion/react';
import { TrendingUp, TrendingDown, Minus, Flame } from 'lucide-react';
import { cn } from '../../../lib/utils';
import type { FlavorTrend, TrendDirection } from '../../../lib/market-intelligence/types';
import { useIntel } from './theme';
import { GlassCard, MetricBar, Skeleton, EASE, CountUp } from './primitives';
import { SectionHeader } from './SectionHeader';

export default function TrendingFlavors({ flavors, loading }: { flavors: FlavorTrend[]; loading: boolean }) {
  return (
    <div>
      <SectionHeader
        kicker="Section 02"
        title="Trending Flavors"
        subtitle="Flavor profiles gaining attention across the market right now."
        icon={<Flame size={16} />}
      />
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {loading
          ? Array.from({ length: 6 }).map((_, i) => <SkeletonCard key={i} />)
          : flavors.map((f, i) => <FlavorCard key={f.id} flavor={f} index={i} />)}
      </div>
    </div>
  );
}

function FlavorCard({ flavor, index }: { flavor: FlavorTrend; index: number }) {
  const p = useIntel();
  return (
    <motion.div
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.5, ease: EASE, delay: index * 0.06 }}
      className="h-full"
    >
      <GlassCard interactive className="group flex h-full flex-col p-5">
        <div className="flex items-start justify-between">
          <div>
            <h4 className={cn('text-lg font-bold', p.text)}>{flavor.name}</h4>
            <p className={cn('text-[11px] font-semibold uppercase tracking-wider', p.muted)}>
              Confidence {flavor.confidence}%
            </p>
          </div>
          <DirectionBadge direction={flavor.direction} growth={flavor.growthPct} />
        </div>

        {/* Food categories / applications */}
        <div className="mt-3 flex flex-wrap gap-1.5">
          {flavor.categories.map((c) => (
            <span key={c} className={cn('rounded-full border px-2 py-0.5 text-[10px] font-semibold', p.chip)}>
              {c}
            </span>
          ))}
        </div>

        <div className="mt-auto pt-5">
          <div className="flex items-end justify-between">
            <span className={cn('text-[11px] font-bold uppercase tracking-widest', p.muted)}>Trend score</span>
            <span className={cn('text-2xl font-black', p.text)}>
              <CountUp value={flavor.trendScore} />
            </span>
          </div>
          <div className="mt-2">
            <MetricBar value={flavor.trendScore} tone={flavor.direction === 'down' ? 'red' : 'gold'} />
          </div>
        </div>
      </GlassCard>
    </motion.div>
  );
}

function DirectionBadge({ direction, growth }: { direction: TrendDirection; growth: number }) {
  const up = direction === 'up';
  const down = direction === 'down';
  const Icon = up ? TrendingUp : down ? TrendingDown : Minus;
  const cls = up
    ? 'bg-brand-accent/15 text-brand-accent'
    : down
      ? 'bg-red-400/15 text-red-400'
      : 'bg-brand-primary/15 text-brand-primary';
  const sign = growth > 0 ? '+' : '';
  return (
    <span className={cn('inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-xs font-bold', cls)}>
      <Icon size={13} />
      {sign}
      {growth}%
    </span>
  );
}

function SkeletonCard() {
  return (
    <GlassCard className="p-5">
      <Skeleton className="h-5 w-24" />
      <Skeleton className="mt-2 h-3 w-20" />
      <Skeleton className="mt-6 h-7 w-12" />
      <Skeleton className="mt-3 h-2 w-full" />
    </GlassCard>
  );
}
