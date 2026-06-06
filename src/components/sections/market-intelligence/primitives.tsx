/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 *
 * Shared UI primitives for the AI Market Intelligence dashboard: scroll-reveal
 * wrapper, glass card, loading skeleton, animated metric bar and score ring.
 */

import { type ReactNode, useEffect, useRef, useState } from 'react';
import { motion, useInView } from 'motion/react';
import { cn } from '../../../lib/utils';
import { useIntel } from './theme';

export const EASE = [0.22, 1, 0.36, 1] as const;

/** Fade-and-rise on scroll into view. */
export function Reveal({
  children,
  delay = 0,
  className,
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 22 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.25 }}
      transition={{ duration: 0.6, ease: EASE, delay }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/** Glassmorphism surface used across the dashboard. */
export function GlassCard({
  children,
  className,
  interactive = false,
}: {
  children: ReactNode;
  className?: string;
  interactive?: boolean;
}) {
  const p = useIntel();
  return (
    <div
      className={cn(
        'rounded-3xl shadow-xl shadow-black/5',
        p.glass,
        interactive && cn('transition-all duration-300', p.hover, 'hover:-translate-y-1'),
        className,
      )}
    >
      {children}
    </div>
  );
}

/** Skeleton shimmer block for loading states. */
export function Skeleton({ className }: { className?: string }) {
  const p = useIntel();
  return (
    <div
      className={cn(
        'animate-pulse rounded-xl',
        p.dark ? 'bg-white/10' : 'bg-brand-border/70',
        className,
      )}
    />
  );
}

/** Animated horizontal meter, fills to `value`% when scrolled into view. */
export function MetricBar({ value, tone = 'gold' }: { value: number; tone?: 'gold' | 'green' | 'red' }) {
  const p = useIntel();
  const color =
    tone === 'green' ? 'bg-brand-accent' : tone === 'red' ? 'bg-red-400' : 'bg-brand-primary';
  return (
    <div className={cn('h-2 w-full overflow-hidden rounded-full', p.track)}>
      <motion.div
        className={cn('h-full rounded-full', color)}
        initial={{ width: 0 }}
        whileInView={{ width: `${Math.max(0, Math.min(100, value))}%` }}
        viewport={{ once: true, amount: 0.6 }}
        transition={{ duration: 1.1, ease: EASE }}
      />
    </div>
  );
}

/** Counts up to `value` once scrolled into view (subtle, ~1s). */
export function CountUp({
  value,
  duration = 1100,
  suffix = '',
  prefix = '',
  className,
}: {
  value: number;
  duration?: number;
  suffix?: string;
  prefix?: string;
  className?: string;
}) {
  const [display, setDisplay] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.6 });

  useEffect(() => {
    if (!inView) return;
    let raf = 0;
    const start = performance.now();
    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / duration);
      const eased = 1 - Math.pow(1 - t, 3);
      setDisplay(Math.round(eased * value));
      if (t < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, value, duration]);

  return (
    <span ref={ref} className={className}>
      {prefix}
      {display}
      {suffix}
    </span>
  );
}

/** Circular confidence/score ring with animated sweep. */
export function ScoreRing({ value, label, size = 64 }: { value: number; label?: string; size?: number }) {
  const p = useIntel();
  const r = (size - 8) / 2;
  const c = 2 * Math.PI * r;
  return (
    <div className="relative flex flex-none items-center justify-center" style={{ width: size, height: size }}>
      <svg width={size} height={size} className="-rotate-90">
        <circle cx={size / 2} cy={size / 2} r={r} fill="none" strokeWidth={6} className={p.dark ? 'stroke-white/10' : 'stroke-brand-border'} />
        <motion.circle
          cx={size / 2}
          cy={size / 2}
          r={r}
          fill="none"
          strokeWidth={6}
          strokeLinecap="round"
          className="stroke-brand-primary"
          strokeDasharray={c}
          initial={{ strokeDashoffset: c }}
          whileInView={{ strokeDashoffset: c - (c * Math.min(100, value)) / 100 }}
          viewport={{ once: true, amount: 0.6 }}
          transition={{ duration: 1.2, ease: EASE }}
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className={cn('text-sm font-bold', p.text)}>{value}</span>
        {label && <span className={cn('text-[8px] font-bold uppercase tracking-widest', p.muted)}>{label}</span>}
      </div>
    </div>
  );
}
