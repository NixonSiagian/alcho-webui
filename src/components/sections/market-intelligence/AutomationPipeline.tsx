/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 *
 * Section 6 — Daily Automation. A visual of the architecture that keeps the
 * dashboard fresh: RSS ingest -> AI extraction -> summaries -> database ->
 * 24h website refresh. Mirrors the pipeline documented in api.ts.
 */

import { motion } from 'motion/react';
import { Rss, Bot, Sparkles, Database, RefreshCw, Globe, ArrowRight } from 'lucide-react';
import { cn } from '../../../lib/utils';
import { useIntel } from './theme';
import { GlassCard, EASE } from './primitives';
import { SectionHeader } from './SectionHeader';

const STEPS = [
  { icon: Rss, title: 'Ingest', desc: 'Fetch F&B news from RSS feeds & trusted sources.' },
  { icon: Bot, title: 'Analyze', desc: 'Send collected articles to the AI model.' },
  { icon: Sparkles, title: 'Extract', desc: 'Flavors, products, behavior shifts & opportunities.' },
  { icon: Database, title: 'Store', desc: 'Persist generated summaries to the database.' },
  { icon: Globe, title: 'Publish', desc: 'Website reads the latest analysis record.' },
] as const;

export default function AutomationPipeline() {
  const p = useIntel();
  return (
    <div>
      <SectionHeader
        kicker="Section 06"
        title="Daily Automation"
        subtitle="A scheduled pipeline regenerates every insight on this page automatically."
        icon={<RefreshCw size={16} />}
      />
      <GlassCard className="p-6 sm:p-8">
        <div className="flex flex-col gap-3 lg:flex-row lg:items-stretch">
          {STEPS.map((step, i) => (
            <div key={step.title} className="contents">
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.4 }}
                transition={{ duration: 0.45, ease: EASE, delay: i * 0.08 }}
                className={cn('flex flex-1 items-start gap-3 rounded-2xl border p-4', p.chip)}
              >
                <span className="flex h-10 w-10 flex-none items-center justify-center rounded-xl bg-brand-primary/15 text-brand-primary">
                  <step.icon size={18} />
                </span>
                <div>
                  <p className={cn('text-[10px] font-bold uppercase tracking-widest text-brand-primary')}>
                    Step {i + 1}
                  </p>
                  <p className={cn('text-sm font-bold', p.text)}>{step.title}</p>
                  <p className={cn('mt-1 text-[11px] leading-relaxed', p.muted)}>{step.desc}</p>
                </div>
              </motion.div>
              {i < STEPS.length - 1 && (
                <div className="flex items-center justify-center">
                  <ArrowRight size={16} className={cn('rotate-90 lg:rotate-0', p.muted)} />
                </div>
              )}
            </div>
          ))}
        </div>

        <div className={cn('mt-6 flex items-center justify-center gap-2 border-t pt-5 text-[11px] font-semibold', p.divider, p.muted)}>
          <RefreshCw size={13} className="text-brand-primary" />
          Automatically refreshes website data every 24 hours.
        </div>
      </GlassCard>
    </div>
  );
}
