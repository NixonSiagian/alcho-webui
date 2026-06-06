/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 *
 * Compact header used by each dashboard sub-section.
 */

import { type ReactNode } from 'react';
import { cn } from '../../../lib/utils';
import { useIntel } from './theme';
import { Reveal } from './primitives';

export function SectionHeader({
  kicker,
  title,
  subtitle,
  icon,
}: {
  kicker: string;
  title: string;
  subtitle?: string;
  icon?: ReactNode;
}) {
  const p = useIntel();
  return (
    <Reveal className="mb-6">
      <div className="flex items-center gap-2.5">
        {icon && (
          <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-brand-primary/15 text-brand-primary">
            {icon}
          </span>
        )}
        <span className="text-[11px] font-bold uppercase tracking-[0.3em] text-brand-primary">{kicker}</span>
      </div>
      <h3 className={cn('mt-3 text-2xl font-bold sm:text-3xl', p.text)}>{title}</h3>
      {subtitle && <p className={cn('mt-2 max-w-2xl text-sm leading-relaxed', p.muted)}>{subtitle}</p>}
    </Reveal>
  );
}
