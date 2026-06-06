/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 *
 * Official Alcho logo.
 *
 * Single source of truth: docs/alcho-logo.png (the uploaded official asset).
 * This component renders a web-optimized encoding of that exact artwork
 * (src/assets/alcho-logo.png — same logo, downscaled for performance; no
 * redesign, recolor, crop or stretch). Size is controlled by the caller via
 * `className` (prefer height utilities, e.g. `h-10 w-auto`) so the natural
 * aspect ratio is always preserved.
 */

import React from 'react';
import { cn } from '../../lib/utils';
import logoUrl from '../../assets/alcho-logo.png';

interface AlchoLogoProps {
  className?: string;
}

export const AlchoLogo: React.FC<AlchoLogoProps> = ({ className }) => {
  return (
    <img
      src={logoUrl}
      alt="Alcho"
      draggable={false}
      className={cn('block w-auto select-none object-contain', className)}
    />
  );
};
