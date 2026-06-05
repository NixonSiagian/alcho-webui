/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion } from 'motion/react';
import { ArrowUpRight, ShieldCheck, Zap } from 'lucide-react';
import { PRODUCTS } from '../../data/products';

// Select representative flagships for the showcase
const FLAGSHIPS = [
  PRODUCTS.find(p => p.code === 'SB-001'), // Smoky BBQ
  PRODUCTS.find(p => p.code === 'BS-001'), // Chicken Powder
  PRODUCTS.find(p => p.code === 'SS-001'), // Balado
  PRODUCTS.find(p => p.code === 'BS-010'), // Kuah Bakso
].filter(Boolean);

export default function BestSellers() {
  return (
    <section id="best-sellers" className="py-24 lg:py-40 bg-brand-bg relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-12 mb-24">
          <div className="max-w-3xl">
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              className="flex items-center gap-4 mb-6"
            >
              <div className="h-[1px] w-12 bg-brand-primary" />
              <span className="text-brand-primary text-xs font-bold tracking-[0.3em] uppercase">Core Architectures</span>
            </motion.div>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              className="text-white mb-0"
            >
              Flagship <span className="italic text-brand-primary">Taste Foundations.</span>
            </motion.h2>
          </div>
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
          >
            <a href="#products" className="text-brand-text-secondary hover:text-brand-primary font-bold uppercase tracking-widest text-[10px] flex items-center gap-4 group transition-all">
              EXPLORE FULL 45+ SKU DATABASE
              <ArrowUpRight size={18} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-all" />
            </a>
          </motion.div>
        </div>

        {/* Flagships Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {FLAGSHIPS.map((product, i) => (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              key={product?.code}
              className="group relative"
            >
              <div className="h-[450px] relative rounded-[3rem] bg-brand-surface border border-white/5 group-hover:border-brand-primary/30 transition-all duration-500 flex flex-col items-start p-12 overflow-hidden">
                 
                 <div className="flex justify-between w-full items-center mb-12">
                    <span className="text-[10px] font-mono font-bold tracking-widest text-brand-text-secondary">{product?.code}</span>
                    {product?.halal && <ShieldCheck size={16} className="text-emerald-500/50" />}
                 </div>

                 <div className="relative mb-8">
                   <div className="w-24 h-24 bg-brand-primary/5 rounded-2xl flex items-center justify-center group-hover:bg-brand-primary/10 transition-colors">
                      <Zap size={32} className="text-brand-primary" />
                   </div>
                 </div>

                 <h3 className="text-2xl text-white mb-4 leading-tight group-hover:text-brand-primary transition-colors">
                   {product?.name}
                 </h3>
                 
                 <p className="text-brand-text-secondary text-xs uppercase font-bold tracking-widest mb-8">
                    {product?.category}
                 </p>

                 <div className="mt-auto w-full space-y-4">
                    <p className="text-[10px] text-brand-text-secondary line-clamp-2 leading-relaxed opacity-60">
                      Standardized for industrial application with high-yield solubility metrics.
                    </p>
                    <div className="pt-6 border-t border-white/5 flex items-center justify-between">
                       <span className="text-[10px] text-white font-bold uppercase tracking-widest">Spec Sheet 4.2</span>
                       <ArrowUpRight size={14} className="text-brand-primary" />
                    </div>
                 </div>

                 {/* Hover Glow */}
                 <div className="absolute inset-0 bg-gradient-to-br from-brand-primary/[0.03] to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
            </motion.div>
          ))}
        </div>
        
        {/* R&D Section Update */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="mt-32 p-12 lg:p-24 relative overflow-hidden rounded-[4rem] bg-brand-card border border-white/5"
        >
          <div className="relative z-10 grid lg:grid-cols-2 items-center gap-20">
            <div>
              <motion.div 
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                className="flex items-center gap-4 mb-8"
              >
                <div className="h-[1px] w-12 bg-emerald-500" />
                <span className="text-emerald-500 text-xs font-bold tracking-[0.3em] uppercase">R&D Laboratory</span>
              </motion.div>
              <h2 className="text-4xl lg:text-7xl text-white mb-10 leading-tight">
                Your Formula, <br />
                <span className="italic text-brand-primary">Scaled for Production.</span>
              </h2>
              <p className="text-brand-text-secondary text-lg leading-relaxed mb-12 max-w-xl">
                Alcho's technical facility specializes in private label development and high-purity seasoning engineering for enterprise hospitality brands.
              </p>
              <div className="flex flex-wrap gap-12 pt-8 border-t border-white/5">
                {[
                  { label: "DAILY OUTPUT", val: "250T" },
                  { label: "CUSTOM SKUS", val: "1.2K+" },
                  { label: "QUALITY STD", val: "FSSC" }
                ].map(stat => (
                  <div key={stat.label}>
                    <p className="text-white text-3xl font-serif font-bold text-brand-primary">{stat.val}</p>
                    <p className="text-[10px] uppercase tracking-widest text-brand-text-secondary font-bold mt-2 opacity-50">{stat.label}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-brand-surface p-12 rounded-[3rem] border border-white/5">
               <h4 className="text-white text-2xl mb-4">Enterprise OEM</h4>
               <p className="text-brand-text-secondary text-sm mb-10 leading-relaxed">
                 Leverage our manufacturing stack to launch your proprietary flavor profile with audited industrial traceability.
               </p>
               <button className="btn-primary w-full py-6 flex items-center justify-center gap-4">
                 Initialize Project <Zap size={18} />
               </button>
            </div>
          </div>
          
          <div className="absolute inset-0 bg-brand-primary/5 blur-[120px] pointer-events-none" />
        </motion.div>
      </div>
    </section>
  );
}

function ArrowRight({ size, className }: { size?: number, className?: string }) {
  return (
    <svg 
      xmlns="http://www.w3.org/2000/svg" 
      width={size || 24} 
      height={size || 24} 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round" 
      className={className}
    >
      <path d="M5 12h14"/><path d="m12 5 7 7-7 7"/>
    </svg>
  );
}
