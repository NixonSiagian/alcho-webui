/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 *
 * Section 5 — Source News. Transparency list of the articles that fed today's
 * analysis. Intentionally understated so the AI insights stay the main focus.
 */

import { Newspaper, ExternalLink } from 'lucide-react';
import { cn } from '../../../lib/utils';
import { shortDate } from '../../../lib/market-intelligence/format';
import type { SourceArticle } from '../../../lib/market-intelligence/types';
import { useIntel } from './theme';
import { Reveal, Skeleton } from './primitives';

export default function SourceNews({ sources, loading }: { sources: SourceArticle[]; loading: boolean }) {
  const p = useIntel();
  return (
    <Reveal>
      <div className={cn('flex items-center gap-2.5 border-t pt-8', p.divider)}>
        <Newspaper size={15} className={p.muted} />
        <span className={cn('text-[11px] font-bold uppercase tracking-[0.3em]', p.muted)}>
          Sources Used For Today's AI Analysis
        </span>
      </div>

      <div className="mt-5 grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
        {loading
          ? Array.from({ length: 6 }).map((_, i) => <Skeleton key={i} className="h-16 w-full" />)
          : sources.map((s) => (
              <a
                key={s.id}
                href={s.url ?? '#'}
                target={s.url ? '_blank' : undefined}
                rel="noreferrer noopener"
                className={cn(
                  'group flex items-start justify-between gap-3 rounded-2xl border px-4 py-3 transition-colors',
                  p.dark ? 'border-white/10 hover:bg-white/[0.04]' : 'border-brand-border hover:bg-brand-fill',
                )}
              >
                <div className="min-w-0">
                  <p className={cn('truncate text-sm font-semibold', p.text)}>{s.title}</p>
                  <p className={cn('mt-0.5 text-[11px] font-medium', p.muted)}>
                    {s.source} · {shortDate(s.publishedAt)}
                  </p>
                </div>
                <ExternalLink size={13} className={cn('mt-0.5 flex-none opacity-0 transition-opacity group-hover:opacity-100', p.muted)} />
              </a>
            ))}
      </div>

      <p className={cn('mt-4 text-[11px] leading-relaxed', p.faint)}>
        Articles are used only as analysis inputs. Insights, scores and opportunities above are
        AI-generated summaries — not editorial content.
      </p>
    </Reveal>
  );
}
