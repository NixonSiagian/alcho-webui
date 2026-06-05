/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion } from 'motion/react';
import { Search, Zap, ShieldCheck, Target } from 'lucide-react';

const METRICS = [
  { val: "100%", label: "Halal Certified", icon: ShieldCheck },
  { val: "2008", label: "Heritage Established", icon: Zap },
  { val: "FSSC", label: "22000 Grade", icon: Target },
  { val: "99.9%", label: "Batch Symmetry", icon: Search },
];

export default function WhyChefsChoose() {
  return (
    <section id="trust" className="py-24 md:py-48 bg-brand-bg relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-24 items-center">
            <div>
                <motion.div 
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    className="flex items-center gap-4 mb-8"
                >
                    <div className="h-[1px] w-12 bg-brand-primary" />
                    <span className="text-brand-primary text-xs font-bold tracking-[0.4em] uppercase">Alcho Performance</span>
                </motion.div>
                <h2 className="text-white text-5xl md:text-8xl mb-8 leading-tight">Trusted by <br /><span className="italic text-brand-primary">National Leaders.</span></h2>
                <p className="text-2xl text-brand-text-secondary leading-relaxed max-w-xl mb-12">
                   From fast-moving consumer goods to premium hospitality chains, we deliver the seasoning infrastructure that defines the Indonesian palate.
                </p>

                <div className="grid grid-cols-2 gap-8">
                   {METRICS.map((metric, i) => (
                      <motion.div 
                        key={i}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.1 }}
                        className="p-8 bg-brand-surface border border-white/5 rounded-3xl group hover:border-brand-primary/30 transition-all"
                      >
                         <div className="text-brand-primary mb-6 group-hover:scale-110 transition-transform">
                            <metric.icon size={24} />
                         </div>
                         <p className="text-4xl text-white font-bold mb-2">{metric.val}</p>
                         <p className="text-[10px] text-brand-text-secondary uppercase font-bold tracking-widest">{metric.label}</p>
                      </motion.div>
                   ))}
                </div>
            </div>

            <div className="relative">
                <div className="aspect-[4/5] rounded-[4rem] overflow-hidden border border-white/5 bg-brand-surface">
                   <img src="https://images.unsplash.com/photo-1577214714282-2e454647c81c?q=80&w=1200" alt="Chef" className="w-full h-full object-cover grayscale opacity-60" />
                   <div className="absolute inset-0 bg-gradient-to-t from-brand-bg via-transparent to-transparent" />
                </div>
                
                {/* Float Quote */}
                <motion.div 
                  initial={{ opacity: 0, x: 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  className="absolute -bottom-10 -left-10 md:-left-20 p-10 bg-brand-card border border-brand-primary/20 rounded-[2.5rem] shadow-2xl max-w-xs md:max-w-sm backdrop-blur-xl"
                >
                   <p className="text-white text-lg italic mb-6">"Alcho's technical consistency allowed us to scale our signature broth from one outlet to seventy without losing the soul of the dish."</p>
                   <div>
                      <p className="text-brand-primary font-bold">Chef Andre Wijaya</p>
                      <p className="text-[10px] text-brand-text-secondary uppercase tracking-widest font-bold">Group Executive Chef, Nusantara Chains</p>
                   </div>
                </motion.div>
            </div>
        </div>
      </div>
    </section>
  );
}
