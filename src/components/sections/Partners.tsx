/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion } from 'motion/react';
import { PARTNERS, TESTIMONIALS } from '../../data';
import { Quote } from 'lucide-react';

export default function Partners() {
  return (
    <section id="partners" className="relative py-40 bg-black z-10">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-24">
          <span className="text-brand-orange text-[11px] uppercase tracking-[0.4em] font-bold block mb-6">Partner Network</span>
          <h2 className="font-serif text-5xl md:text-7xl text-white mb-6 uppercase">
            GLOBAL <span className="lux-gradient-text italic">TRUST.</span>
          </h2>
        </div>

        {/* Partners Marquee / Grid */}
        <div className="flex flex-wrap items-center justify-center gap-16 md:gap-x-32 md:gap-y-20 opacity-30 grayscale invert mb-40">
           {PARTNERS.map((p) => (
             <motion.div 
              key={p.name}
              whileHover={{ scale: 1.1, opacity: 1 }}
              className="w-32 md:w-48 transition-all"
             >
                <img src={p.logo} alt={p.name} className="w-full h-auto" />
             </motion.div>
           ))}
        </div>

        {/* Testimonials */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {TESTIMONIALS.map((t, i) => (
            <div key={i} className="relative p-12 bg-zinc-900/40 border border-white/5 rounded-sm overflow-hidden group">
               <Quote className="absolute top-10 right-10 text-brand-gold/10 group-hover:text-brand-gold/20 transition-colors" size={80} />
               <p className="text-gray-300 text-lg md:text-xl font-light italic leading-relaxed mb-10 relative z-10">
                 "{t.content}"
               </p>
               <div className="flex items-center gap-4 border-t border-white/5 pt-8">
                  <div className="w-12 h-12 rounded-full bg-brand-gold flex items-center justify-center font-bold text-black border-2 border-brand-gold/30">
                    {t.name.charAt(0)}
                  </div>
                  <div>
                    <h5 className="text-white text-sm font-bold uppercase tracking-widest">{t.name}</h5>
                    <p className="text-gray-500 text-[10px] uppercase tracking-[0.2em]">{t.role} // {t.company}</p>
                  </div>
               </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
