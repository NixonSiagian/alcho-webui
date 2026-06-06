/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 *
 * Section 3 — Viral Product Watch. Premium dashboard cards showing popularity,
 * growth rate, category and a momentum indicator.
 */

import { motion } from 'motion/react';
import { Rocket, ArrowUpRight, Activity, Snowflake } from 'lucide-react';
import { cn } from '../../../lib/utils';
import type { ViralProduct, Momentum } from '../../../lib/market-intelligence/types';
import { useIntel } from './theme';
import { GlassCard, MetricBar, Skeleton, EASE, CountUp } from './primitives';
import { SectionHeader } from './SectionHeader';

export default function ViralProducts({ products, loading }: { products: ViralProduct[]; loading: boolean }) {
  return (
    <div>
      <SectionHeader
        kicker="Section 03"
        title="Viral Product Watch"
        subtitle="Product concepts climbing in popularity across channels and regions."
        icon={<Rocket size={16} />}
      />
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
        {loading
          ? Array.from({ length: 5 }).map((_, i) => <SkeletonCard key={i} />)
          : products.map((prod, i) => <ProductCard key={prod.id} product={prod} index={i} />)}
      </div>
    </div>
  );
}

function ProductCard({ product, index }: { product: ViralProduct; index: number }) {
  const p = useIntel();
  return (
    <motion.div
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.5, ease: EASE, delay: index * 0.06 }}
      className="h-full"
    >
      <GlassCard interactive className="flex h-full flex-col p-5">
        <div className="flex items-center justify-between">
          <span className={cn('rounded-full border px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider', p.chip)}>
            {product.category}
          </span>
          <MomentumPill momentum={product.momentum} />
        </div>

        <h4 className={cn('mt-4 text-base font-bold leading-tight', p.text)}>{product.name}</h4>

        <div className="mt-auto pt-5">
          <div className="flex items-end justify-between">
            <span className={cn('text-[10px] font-bold uppercase tracking-widest', p.muted)}>Popularity</span>
            <span className="inline-flex items-center gap-1 text-sm font-bold text-brand-accent">
              <ArrowUpRight size={14} />+{product.growthRate}%
            </span>
          </div>
          <div className="mt-2 flex items-center gap-3">
            <MetricBar value={product.popularity} />
            <span className={cn('text-sm font-black', p.text)}>
              <CountUp value={product.popularity} />
            </span>
          </div>
        </div>
      </GlassCard>
    </motion.div>
  );
}

function MomentumPill({ momentum }: { momentum: Momentum }) {
  const map = {
    accelerating: { cls: 'bg-brand-accent/15 text-brand-accent', icon: <Rocket size={11} />, label: 'Accelerating' },
    steady: { cls: 'bg-brand-primary/15 text-brand-primary', icon: <Activity size={11} />, label: 'Steady' },
    cooling: { cls: 'bg-sky-400/15 text-sky-400', icon: <Snowflake size={11} />, label: 'Cooling' },
  } as const;
  const m = map[momentum];
  return (
    <span className={cn('inline-flex items-center gap-1 rounded-full px-2 py-1 text-[10px] font-bold uppercase tracking-wider', m.cls)}>
      {m.icon}
      {m.label}
    </span>
  );
}

function SkeletonCard() {
  return (
    <GlassCard className="p-5">
      <Skeleton className="h-4 w-16" />
      <Skeleton className="mt-4 h-5 w-28" />
      <Skeleton className="mt-8 h-2 w-full" />
    </GlassCard>
  );
}
