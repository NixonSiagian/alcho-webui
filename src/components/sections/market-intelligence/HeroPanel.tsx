/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 *
 * Right-side "Live Flavor Signal" visualization for the dashboard hero.
 * Balances the header with an analytics preview: a mini flavor-trend chart,
 * animated stat tiles, and the food categories currently being tracked.
 */

import { motion } from 'motion/react';
import { Activity, FileText, Gauge } from 'lucide-react';
import { cn } from '../../../lib/utils';
import type { DailyInsight, FlavorTrend } from '../../../lib/market-intelligence/types';
import { useIntel } from './theme';
import { CountUp, EASE, Skeleton } from './primitives';

const TRACKED = ['Snacks', 'Beverage', 'Frozen', 'Sauces', 'QSR', 'Bakery'];

export default function HeroPanel({
  flavors,
  insight,
  loading,
}: {
  flavors: FlavorTrend[];
  insight?: DailyInsight;
  loading: boolean;
}) {
  const p = useIntel();
  const top = flavors.slice(0, 4);

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: EASE, delay: 0.15 }}
      className={cn('relative overflow-hidden rounded-3xl p-5 sm:p-6', p.glass)}
    >
      <div className="pointer-events-none absolute -right-16 -top-16 h-44 w-44 rounded-full bg-brand-primary/20 blur-[90px]" />

      <div className="relative flex items-center justify-between">
        <div className="inline-flex items-center gap-2">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-brand-accent opacity-75" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-brand-accent" />
          </span>
          <span className={cn('text-[11px] font-bold uppercase tracking-[0.25em]', p.text)}>
            Live Flavor Signal
          </span>
        </div>
        <span className={cn('inline-flex items-center gap-1 text-[10px] font-bold uppercase tracking-widest', p.muted)}>
          <Activity size={12} className="text-brand-primary" /> 7-day
        </span>
      </div>

      {/* Mini flavor-trend chart */}
      <div className="relative mt-5 space-y-2.5">
        {loading
          ? Array.from({ length: 4 }).map((_, i) => <Skeleton key={i} className="h-7 w-full" />)
          : top.map((f, i) => (
              <div key={f.id} className="flex items-center gap-3">
                <span className={cn('w-24 flex-none truncate text-xs font-semibold', p.text)}>{f.name}</span>
                <div className={cn('h-2 flex-1 overflow-hidden rounded-full', p.track)}>
                  <motion.div
                    className="h-full rounded-full bg-brand-primary"
                    initial={{ width: 0 }}
                    animate={{ width: `${f.trendScore}%` }}
                    transition={{ duration: 1, ease: EASE, delay: 0.3 + i * 0.1 }}
                  />
                </div>
                <span className={cn('w-8 flex-none text-right text-xs font-bold', p.text)}>{f.trendScore}</span>
              </div>
            ))}
      </div>

      {/* Stat tiles */}
      <div className="relative mt-5 grid grid-cols-2 gap-3">
        <StatTile
          icon={<FileText size={13} />}
          label="Articles analyzed"
          value={insight?.articlesAnalyzed ?? 0}
          loading={loading}
        />
        <StatTile
          icon={<Gauge size={13} />}
          label="Avg confidence"
          value={insight?.confidence ?? 0}
          suffix="%"
          loading={loading}
        />
      </div>

      {/* Tracked food categories */}
      <div className={cn('relative mt-5 border-t pt-4', p.divider)}>
        <p className={cn('mb-2 text-[10px] font-bold uppercase tracking-widest', p.muted)}>Tracking categories</p>
        <div className="flex flex-wrap gap-1.5">
          {TRACKED.map((c) => (
            <span key={c} className={cn('rounded-full border px-2.5 py-1 text-[10px] font-semibold', p.chip)}>
              {c}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

function StatTile({
  icon,
  label,
  value,
  suffix,
  loading,
}: {
  icon: React.ReactNode;
  label: string;
  value: number;
  suffix?: string;
  loading: boolean;
}) {
  const p = useIntel();
  return (
    <div className={cn('rounded-2xl border p-3.5', p.chip)}>
      <span className="inline-flex items-center gap-1.5 text-brand-primary">{icon}</span>
      {loading ? (
        <Skeleton className="mt-2 h-6 w-12" />
      ) : (
        <p className={cn('mt-1 text-2xl font-black', p.text)}>
          <CountUp value={value} suffix={suffix} />
        </p>
      )}
      <p className={cn('mt-0.5 text-[10px] font-bold uppercase tracking-wider', p.muted)}>{label}</p>
    </div>
  );
}
