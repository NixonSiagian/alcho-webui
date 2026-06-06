/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useRef, useEffect, useState } from 'react';
import { motion, useInView } from 'motion/react';
import { ShieldCheck, Award, Globe2, Beaker } from 'lucide-react';
import { METRICS } from '../../data';

export default function Trust() {
  return (
    <section className="relative py-32 bg-black z-10 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Metrics Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 mb-32">
          {METRICS.map((metric, i) => (
            <MetricCard key={metric.label} metric={metric} index={i} />
          ))}
        </div>

        {/* Certifications / Trust Indicators */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {[
            { icon: <ShieldCheck size={24} />, title: "ISO 22000", desc: "Highest international food safety management standards." },
            { icon: <Award size={24} />, title: "Halal MUI", desc: "Full compliance with LPPOM-MUI certification guidelines." },
            { icon: <Beaker size={24} />, title: "R&D Lab", desc: "In-house lab for precise moisture and oil content analysis." },
            { icon: <Globe2 size={24} />, title: "Export Grade", desc: "Meeting strict FDA and EU regulatory requirements." }
          ].map((item, i) => (
            <motion.div 
              key={item.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="flex flex-col items-start gap-4 p-8 rounded-sm bg-zinc-900/40 border border-brand-border"
            >
              <div className="text-brand-gold">{item.icon}</div>
              <h4 className="text-brand-text text-xs uppercase tracking-[0.2em] font-bold">{item.title}</h4>
              <p className="text-gray-500 text-[10px] leading-relaxed uppercase tracking-widest font-medium">
                {item.desc}
              </p>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}

function MetricCard({ metric, index }: { metric: any, index: number }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (isInView) {
      const target = parseInt(metric.value);
      let start = 0;
      const duration = 2000;
      const step = target / (duration / 20);
      
      const timer = setInterval(() => {
        start += step;
        if (start >= target) {
          setCount(target);
          clearInterval(timer);
        } else {
          setCount(Math.floor(start));
        }
      }, 20);
      return () => clearInterval(timer);
    }
  }, [isInView, metric.value]);

  return (
    <div ref={ref} className="text-center p-8 border-r border-brand-border last:border-0">
      <div className="font-serif text-5xl md:text-6xl text-brand-text font-bold mb-4 tracking-tighter">
        {count}{metric.suffix}
      </div>
      <div className="text-brand-gold text-[10px] uppercase tracking-[0.4em] font-bold">
        {metric.label}
      </div>
    </div>
  );
}
