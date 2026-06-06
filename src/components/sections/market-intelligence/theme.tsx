/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 *
 * Section-scoped dark/light theme for the AI Market Intelligence dashboard.
 * The rest of the site is light-only, so this theme is intentionally local:
 * a small context exposes `dark` plus a palette of class strings, keeping the
 * glassmorphism consistent across every sub-component without prop drilling.
 */

import { createContext, useContext } from 'react';

export interface IntelPalette {
  dark: boolean;
  /** Full-section background. */
  section: string;
  /** Primary text. */
  text: string;
  /** Muted / secondary text. */
  muted: string;
  /** Faint text for metadata. */
  faint: string;
  /** Glass card surface. */
  glass: string;
  /** Solid raised card. */
  card: string;
  /** Small chip / pill surface. */
  chip: string;
  /** Progress / meter track. */
  track: string;
  /** Hairline divider border class (border-color only). */
  divider: string;
  /** Hover border affordance. */
  hover: string;
}

export function buildPalette(dark: boolean): IntelPalette {
  return {
    dark,
    section: dark ? 'bg-[#0A0E17]' : 'bg-brand-bg',
    text: dark ? 'text-slate-50' : 'text-brand-text',
    muted: dark ? 'text-slate-400' : 'text-brand-text-secondary',
    faint: dark ? 'text-slate-500' : 'text-brand-text-secondary/80',
    glass: dark
      ? 'bg-white/[0.04] backdrop-blur-xl border border-white/10'
      : 'bg-white/70 backdrop-blur-xl border border-brand-border',
    card: dark
      ? 'bg-white/[0.03] border border-white/10'
      : 'bg-brand-surface border border-brand-border',
    chip: dark
      ? 'bg-white/[0.05] border border-white/10 text-slate-300'
      : 'bg-brand-fill border border-brand-border text-brand-text-secondary',
    track: dark ? 'bg-white/10' : 'bg-brand-fill',
    divider: dark ? 'border-white/10' : 'border-brand-border',
    hover: dark ? 'hover:border-brand-primary/50' : 'hover:border-brand-primary/40',
  };
}

const IntelThemeContext = createContext<IntelPalette>(buildPalette(false));

export const IntelThemeProvider = IntelThemeContext.Provider;

/** Access the active palette inside any dashboard sub-component. */
export function useIntel(): IntelPalette {
  return useContext(IntelThemeContext);
}
