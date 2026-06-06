/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 *
 * Section 4 — Opportunity Radar. AI-generated business opportunities presented
 * as futuristic radar-style cards with an animated sweep, opportunity score,
 * confidence and a suggested action.
 */

import { motion } from 'motion/react';
import { Radar, Lightbulb, Target } from 'lucide-react';
import { cn } from '../../../lib/utils';
import type { Opportunity } from '../../../lib/market-intelligence/types';
import { useIntel } from './theme';
import { GlassCard, MetricBar, Skeleton, EASE, CountUp } from './primitives';
import { SectionHeader } from './SectionHeader';

export default function OpportunityRadar({ opportunities, loading }: { opportunities: Opportunity[]; loading: boolean }) {
  return (
    <div>
      <SectionHeader
        kicker="Section 04"
        title="Opportunity Radar"
        subtitle="Business opportunities synthesized from market gaps and rising demand."
        icon={<Radar size={16} />}
      />
      <div className="grid gap-4 lg:grid-cols-3">
        {loading
          ? Array.from({ length: 3 }).map((_, i) => <SkeletonCard key={i} />)
          : opportunities.map((op, i) => <OppCard key={op.id} op={op} index={i} />)}
      </div>
    </div>
  );
}

function OppCard({ op, index }: { op: Opportunity; index: number }) {
  const p = useIntel();
  return (
    <motion.div
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.55, ease: EASE, delay: index * 0.08 }}
      className="h-full"
    >
      <GlassCard interactive className="relative h-full overflow-hidden p-6">
        <div className="pointer-events-none absolute -right-10 -top-10 opacity-60">
          <RadarGlyph />
        </div>

        <div className="relative flex items-center justify-between">
          <span className={cn('rounded-full border px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider', p.chip)}>
            {op.segment}
          </span>
          <div className="text-right">
            <p className="text-2xl font-black text-brand-primary">
              <CountUp value={op.opportunityScore} />
            </p>
            <p className={cn('text-[9px] font-bold uppercase tracking-widest', p.muted)}>Opp. score</p>
          </div>
        </div>

        <h4 className={cn('relative mt-4 text-lg font-bold leading-tight', p.text)}>{op.title}</h4>
        <p className={cn('relative mt-2 text-sm leading-relaxed', p.muted)}>{op.description}</p>

        <div className={cn('relative mt-5 flex items-start gap-2 rounded-2xl border p-3', p.chip)}>
          <Lightbulb size={15} className="mt-0.5 flex-none text-brand-primary" />
          <p className={cn('text-xs leading-relaxed', p.text)}>{op.suggestion}</p>
        </div>

        <div className="relative mt-5">
          <div className="mb-2 flex items-center justify-between">
            <span className={cn('inline-flex items-center gap-1 text-[10px] font-bold uppercase tracking-widest', p.muted)}>
              <Target size={11} /> Confidence
            </span>
            <span className={cn('text-xs font-bold', p.text)}>{op.confidence}%</span>
          </div>
          <MetricBar value={op.confidence} tone="green" />
        </div>
      </GlassCard>
    </motion.div>
  );
}

/** Decorative radar grid with a continuously rotating sweep. */
function RadarGlyph() {
  return (
    <div className="relative h-28 w-28">
      <svg viewBox="0 0 100 100" className="h-full w-full">
        {[16, 30, 44].map((r) => (
          <circle key={r} cx={50} cy={50} r={r} fill="none" strokeWidth={1} className="stroke-brand-primary/25" />
        ))}
        <line x1={50} y1={6} x2={50} y2={94} strokeWidth={1} className="stroke-brand-primary/20" />
        <line x1={6} y1={50} x2={94} y2={50} strokeWidth={1} className="stroke-brand-primary/20" />
      </svg>
      <motion.div
        className="absolute inset-0"
        style={{
          background: 'conic-gradient(from 0deg, rgba(201,154,46,0.35), transparent 70%)',
          borderRadius: '9999px',
        }}
        animate={{ rotate: 360 }}
        transition={{ duration: 4, repeat: Infinity, ease: 'linear' }}
      />
    </div>
  );
}

function SkeletonCard() {
  return (
    <GlassCard className="p-6">
      <Skeleton className="h-4 w-20" />
      <Skeleton className="mt-4 h-5 w-40" />
      <Skeleton className="mt-3 h-3 w-full" />
      <Skeleton className="mt-2 h-3 w-5/6" />
      <Skeleton className="mt-5 h-12 w-full" />
    </GlassCard>
  );
}
