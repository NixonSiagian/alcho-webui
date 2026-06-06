/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 *
 * Indonesia Map Component - renders the COMPLETE Indonesia archipelago.
 * Source: /public/resources/id.svg
 *
 * Copyright (c) 2024 Pareto Software, LLC DBA Simplemaps.com
 * Free for Commercial Use, full terms at https://simplemaps.com/resources/svg-license
 * Attribution is appreciated! https://simplemaps.com
 *
 * IMPORTANT:
 * - The full SVG is rendered with a fixed viewBox "0 0 1000 368".
 * - preserveAspectRatio="xMidYMid meet" fits the whole map in the container.
 * - There is NO auto-zoom, fitBounds, region focusing, or marker-based transform.
 *   The map never moves to accommodate markers.
 */

import { useEffect, useRef, useState } from 'react';

interface IndonesiaMapProps {
  className?: string;
  style?: React.CSSProperties;
  onLoad?: () => void;
}

// The original SVG's native viewBox. Never changed based on markers/regions.
export const INDONESIA_VIEWBOX = { width: 1000, height: 368 };

export default function IndonesiaMap({ className = '', style, onLoad }: IndonesiaMapProps) {
  const svgRef = useRef<SVGSVGElement>(null);
  const [inner, setInner] = useState<string>('');

  // Load the full Indonesia SVG and extract its inner geometry (all provinces).
  useEffect(() => {
    let cancelled = false;
    fetch('/resources/id.svg')
      .then((res) => res.text())
      .then((text) => {
        if (cancelled) return;
        // Strip XML declaration, comments, and the outer <svg> wrapper so the
        // root <svg> attributes are controlled by React (fixed viewBox, no zoom).
        const innerContent = text
          .replace(/<\?xml[\s\S]*?\?>/g, '')
          .replace(/<!--[\s\S]*?-->/g, '')
          .replace(/<svg[^>]*>/i, '')
          .replace(/<\/svg>\s*$/i, '');
        setInner(innerContent);
      })
      .catch((err) => console.error('Failed to load Indonesia SVG:', err));
    return () => {
      cancelled = true;
    };
  }, []);

  // Temporary debug: confirm the SVG occupies its full, untransformed viewBox.
  useEffect(() => {
    if (!inner || !svgRef.current) return;
    const svg = svgRef.current;
    // eslint-disable-next-line no-console
    console.log('viewBox.baseVal:', svg.viewBox.baseVal);
    try {
      // eslint-disable-next-line no-console
      console.log('getBBox():', svg.getBBox());
    } catch (err) {
      console.error('getBBox() error:', err);
    }
    onLoad?.();
  }, [inner, onLoad]);

  return (
    <div
      className={className}
      style={{ width: '100%', height: '100%', ...style }}
    >
      <svg
        ref={svgRef}
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 1000 368"
        preserveAspectRatio="xMidYMid meet"
        fill="#F1ECE0"
        stroke="#C99A2E"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="0.5"
        width="100%"
        height="100%"
        style={{ width: '100%', height: '100%', display: 'block' }}
        dangerouslySetInnerHTML={{ __html: inner }}
      />
    </div>
  );
}
