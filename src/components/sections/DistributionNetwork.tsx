/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 *
 * Nationwide Distribution Network — built to docs/DISTRIBUTION_MAP_SPEC.md.
 * Uses real Indonesia SVG map with authentic geography.
 */

import { useEffect, useRef, useState } from 'react';
import { motion, useInView } from 'motion/react';
import { MapPin, ChefHat, Factory, Clock, Network } from 'lucide-react';
import IndonesiaMap from '../common/IndonesiaMap';

interface Region {
  id: string;
  name: string;
  area: string;
  horeca: number;
  oem: number;
  // Real geographic coordinates (WGS84). Projected onto the SVG viewBox.
  lat: number;
  lng: number;
  hq?: boolean;
}

/**
 * Equirectangular projection from lat/lng to the id.svg viewBox (0 0 1000 368).
 * Constants were calibrated against the SVG's actual province geometry and
 * verified with point-in-polygon checks (see scripts/calibrate-map.mjs):
 * every city lands inside its correct province.
 *   x = 19.4293 * lng - 1794.2036
 *   y = -19.2529 * lat + 135.7858
 */
const PROJ = { aLng: 19.4293, bLng: -1794.2036, aLat: -19.2529, bLat: 135.7858 };
function project(lng: number, lat: number): { x: number; y: number } {
  return { x: PROJ.aLng * lng + PROJ.bLng, y: PROJ.aLat * lat + PROJ.bLat };
}

const REGIONS: Region[] = [
  { id: 'surabaya', name: 'Surabaya', area: 'East Java', horeca: 40, oem: 18, lat: -7.2575, lng: 112.7521, hq: true },
  { id: 'madiun', name: 'Madiun', area: 'East Java', horeca: 11, oem: 6, lat: -7.6298, lng: 111.5239 },
  { id: 'yogyakarta', name: 'Yogyakarta', area: 'Special Region', horeca: 18, oem: 8, lat: -7.7956, lng: 110.3695 },
  { id: 'bali', name: 'Bali', area: 'Bali', horeca: 24, oem: 9, lat: -8.6705, lng: 115.2126 },
  { id: 'lombok', name: 'Lombok', area: 'West Nusa Tenggara', horeca: 9, oem: 4, lat: -8.5833, lng: 116.1167 },
  { id: 'kalsel', name: 'Kalimantan Selatan', area: 'South Kalimantan', horeca: 8, oem: 5, lat: -3.3194, lng: 114.5908 },
];

// Precompute projected pixel coordinates for each region once.
const POINTS: Record<string, { x: number; y: number }> = Object.fromEntries(
  REGIONS.map((r) => [r.id, project(r.lng, r.lat)]),
);

const HQ = REGIONS.find((r) => r.hq)!;
const HQ_PT = POINTS[HQ.id];

const STATS: Array<{ icon: typeof Network; to?: number; suffix?: string; value?: string; label: string }> = [
  { icon: Network, to: 7, suffix: '+', label: 'Active Regions' },
  { icon: ChefHat, to: 100, suffix: '+', label: 'HORECA Customers' },
  { icon: Factory, to: 50, suffix: '+', label: 'OEM Partners' },
  { icon: Clock, value: '24/7', label: 'Logistics Support' },
];

export default function DistributionNetwork() {
  const sectionRef = useRef<HTMLElement>(null);
  const inView = useInView(sectionRef, { once: true, amount: 0.2 });
  const [active, setActive] = useState<string | null>(null);

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden bg-brand-bg py-16 md:py-20"
      aria-label="Nationwide distribution network"
    >
      <div className="pointer-events-none absolute left-1/2 top-1/4 h-[400px] w-[400px] -translate-x-1/2 rounded-full bg-brand-primary/5 blur-[120px]" />

      <div className="relative mx-auto max-w-7xl px-6">
        {/* Header */}
        <div className="mx-auto mb-12 max-w-3xl text-center">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            className="mb-5 inline-flex items-center gap-3 rounded-full border border-brand-border bg-brand-surface px-4 py-2"
          >
            <MapPin size={15} className="text-brand-secondary" />
            <span className="text-[11px] font-bold uppercase tracking-[0.3em] text-brand-secondary">
              Distribution Network
            </span>
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.05 }}
            className="text-4xl font-bold leading-tight md:text-6xl"
          >
            Nationwide <span className="italic text-brand-primary">Distribution Network</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.12 }}
            className="mx-auto mt-5 max-w-2xl text-lg leading-relaxed text-brand-text-secondary"
          >
            From our Surabaya hub, Alcho seasoning systems support HORECA kitchens, distributors, and
            OEM partners across Indonesia with consistent quality and reliable delivery.
          </motion.p>
        </div>

        {/* Statistics */}
        <div className="mb-12 grid grid-cols-2 gap-4 lg:grid-cols-4">
          {STATS.map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.15 + i * 0.1, ease: 'easeOut' }}
              className="rounded-3xl border border-brand-border bg-brand-surface p-6 text-center shadow-sm shadow-black/5 md:p-8"
            >
              <div className="mx-auto mb-4 flex h-11 w-11 items-center justify-center rounded-2xl bg-brand-primary/15 text-brand-secondary">
                <s.icon size={20} />
              </div>
              <p className="text-4xl font-black tracking-tight text-brand-text md:text-5xl">
                {s.to !== undefined ? <CountUp to={s.to} active={inView} /> : s.value}
                {s.suffix}
              </p>
              <p className="mt-2 text-[11px] font-bold uppercase tracking-widest text-brand-text-secondary">
                {s.label}
              </p>
            </motion.div>
          ))}
        </div>

        <div className="grid lg:grid-cols-5 gap-8">
          {/* Interactive Map */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, ease: 'easeOut' }}
            className="lg:col-span-3 relative w-full rounded-[2.5rem] border border-brand-border bg-brand-surface p-6 shadow-xl shadow-black/5"
          >
            <div className="relative w-full h-[400px] md:h-[500px]">
              {/* Indonesia Map using React SVG Component */}
              <div className="relative w-full h-full">
                <IndonesiaMap 
                  className="w-full h-full"
                  style={{ 
                    filter: 'drop-shadow(0 4px 12px rgba(0,0,0,0.1))'
                  }}
                  onLoad={() => console.log('Indonesia map loaded successfully')}
                />

                  {/* Distribution routes overlay */}
                  <svg 
                    viewBox="0 0 1000 368" 
                    className="absolute inset-0 w-full h-full pointer-events-none"
                    preserveAspectRatio="xMidYMid meet"
                  >
                    <defs>
                      <filter id="glow">
                        <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
                        <feMerge> 
                          <feMergeNode in="coloredBlur"/>
                          <feMergeNode in="SourceGraphic"/>
                        </feMerge>
                      </filter>
                    </defs>

                    {/* Routes from HQ to other regions */}
                    {REGIONS.filter((r) => !r.hq).map((r, i) => {
                      const p = POINTS[r.id];
                      const d = `M${HQ_PT.x},${HQ_PT.y} Q${(HQ_PT.x + p.x) / 2},${(HQ_PT.y + p.y) / 2 - 18} ${p.x},${p.y}`;
                      return (
                        <motion.path
                          key={r.id}
                          d={d}
                          fill="none"
                          stroke="#C99A2E"
                          strokeWidth="3"
                          strokeOpacity="0.6"
                          filter="url(#glow)"
                          initial={{ pathLength: 0 }}
                          animate={inView ? { pathLength: 1 } : {}}
                          transition={{ delay: 0.5 + i * 0.15, duration: 1, ease: 'easeInOut' }}
                        />
                      );
                    })}

                    {/* Region markers */}
                    {REGIONS.map((r, i) => {
                      const p = POINTS[r.id];
                      return (
                      <g key={r.id}>
                        {/* Pulse effect */}
                        <motion.circle
                          cx={p.x}
                          cy={p.y}
                          r={r.hq ? 12 : 10}
                          fill="#C99A2E"
                          fillOpacity="0.3"
                          animate={{ 
                            scale: [1, 2.5, 1], 
                            opacity: [0.3, 0, 0.3] 
                          }}
                          transition={{ 
                            duration: 2.5, 
                            repeat: Infinity, 
                            delay: i * 0.4,
                            ease: 'easeOut'
                          }}
                        />
                        
                        {/* Main marker */}
                        <motion.circle
                          cx={p.x}
                          cy={p.y}
                          r={r.hq ? 10 : 8}
                          fill="#C99A2E"
                          stroke="#FFFFFF"
                          strokeWidth="3"
                          filter="url(#glow)"
                          className="cursor-pointer"
                          initial={{ opacity: 0, scale: 0 }}
                          animate={inView ? { opacity: 1, scale: 1 } : {}}
                          transition={{ delay: 0.8 + i * 0.1, duration: 0.4, ease: 'backOut' }}
                          onMouseEnter={() => setActive(r.id)}
                          onMouseLeave={() => setActive(null)}
                          onClick={() => setActive(r.id === active ? null : r.id)}
                        />
                        
                        {/* HQ indicator */}
                        {r.hq && (
                          <motion.circle
                            cx={p.x}
                            cy={p.y}
                            r={3}
                            fill="#FFFFFF"
                            initial={{ opacity: 0 }}
                            animate={inView ? { opacity: 1 } : {}}
                            transition={{ delay: 1 + i * 0.1 }}
                          />
                        )}

                        {/* TEMP DEBUG: marker label showing name + projected coords */}
                        <text
                          x={p.x}
                          y={p.y - 14}
                          textAnchor="middle"
                          fontSize="11"
                          fontWeight="700"
                          fill="#1A1A1A"
                          stroke="#FFFFFF"
                          strokeWidth="0.6"
                          paintOrder="stroke"
                          style={{ pointerEvents: 'none' }}
                        >
                          {r.name} ({Math.round(p.x)},{Math.round(p.y)})
                        </text>

                        {/* Hover tooltip */}
                        {active === r.id && (
                          <foreignObject 
                            x={p.x - 80} 
                            y={p.y - 120} 
                            width="160" 
                            height="100"
                            className="pointer-events-none"
                          >
                            <motion.div
                              initial={{ opacity: 0, scale: 0.8 }}
                              animate={{ opacity: 1, scale: 1 }}
                              className="relative"
                            >
                              <div className="bg-brand-surface border border-brand-border rounded-lg p-2 shadow-xl text-xs whitespace-nowrap">
                                <div className="flex items-center gap-1 mb-1">
                                  <span className="font-bold text-brand-text">{r.name}</span>
                                  {r.hq && (
                                    <span className="bg-brand-primary/15 text-brand-secondary px-1 py-0.5 rounded text-[8px] font-bold uppercase">
                                      HQ
                                    </span>
                                  )}
                                </div>
                                <div className="text-brand-text-secondary text-[10px]">
                                  <div>{r.horeca} HORECA Partners</div>
                                  <div>{r.oem} OEM Clients</div>
                                </div>
                              </div>
                            </motion.div>
                          </foreignObject>
                        )}
                      </g>
                    );
                    })}
                  </svg>
                </div>
            </div>

            <p className="mt-4 text-center text-[11px] font-bold uppercase tracking-widest text-brand-text-secondary">
              Distribution routes from Surabaya headquarters
            </p>
          </motion.div>

          {/* Region Information Cards */}
          <div className="lg:col-span-2 space-y-4">
            <h3 className="text-sm font-bold uppercase tracking-[0.2em] text-brand-text-secondary mb-6">
              Active Regions
            </h3>
            {REGIONS.map((r, i) => (
              <motion.button
                key={r.id}
                type="button"
                initial={{ opacity: 0, x: 20 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ delay: 0.3 + i * 0.08, ease: 'easeOut' }}
                onMouseEnter={() => setActive(r.id)}
                onFocus={() => setActive(r.id)}
                onClick={() => setActive(r.id === active ? null : r.id)}
                className={`w-full rounded-2xl border bg-brand-surface p-4 text-left shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-md ${
                  active === r.id ? 'border-brand-primary/50 shadow-lg' : 'border-brand-border'
                }`}
              >
                <div className="flex items-center gap-3 mb-3">
                  <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-brand-primary/15 text-brand-secondary">
                    <MapPin size={14} />
                  </span>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <p className="font-bold text-brand-text text-sm truncate">{r.name}</p>
                      {r.hq && (
                        <span className="rounded-full bg-brand-primary/15 px-2 py-0.5 text-[8px] font-bold uppercase tracking-widest text-brand-secondary">
                          HQ
                        </span>
                      )}
                    </div>
                    <p className="text-[10px] font-bold uppercase tracking-widest text-brand-text-secondary">
                      {r.area}
                    </p>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <div className="rounded-xl bg-brand-fill px-3 py-2">
                    <p className="text-lg font-black text-brand-text">{r.horeca}</p>
                    <p className="text-[9px] font-bold uppercase tracking-widest text-brand-text-secondary">
                      HORECA
                    </p>
                  </div>
                  <div className="rounded-xl bg-brand-fill px-3 py-2">
                    <p className="text-lg font-black text-brand-text">{r.oem}</p>
                    <p className="text-[9px] font-bold uppercase tracking-widest text-brand-text-secondary">
                      OEM
                    </p>
                  </div>
                </div>
              </motion.button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function CountUp({ to, active, duration = 1800 }: { to: number; active: boolean; duration?: number }) {
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!active) return;
    let raf = 0;
    const start = performance.now();
    const tick = (now: number) => {
      const p = Math.min(1, (now - start) / duration);
      const eased = 1 - Math.pow(1 - p, 3);
      setValue(Math.round(eased * to));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [active, to, duration]);

  return <>{value}</>;
}