/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion } from 'motion/react';
import { ShieldCheck, Target, Award, Users, ArrowRight, History, Fingerprint, Microscope, Box } from 'lucide-react';

const MILESTONES = [
  { year: '2008', title: 'Phase 01: Formulation', description: 'Established lab in Tangerang focusing on custom seasoning blends.' },
  { year: '2014', title: 'Phase 02: Industrial Scaling', description: 'Transitioned to 1,500 sqm specialized production facility with ISO 22000.' },
  { year: '2019', title: 'Phase 03: Global Routing', description: 'Operationalized international distribution SERA & MENA secondary nodes.' },
  { year: '2025', title: 'Phase 04: Digital Logic', description: 'Full implementation of AI-assisted flavor profiling and rapid sampling.' },
];

export default function About() {
  return (
    <section id="about" className="py-24 lg:py-40 bg-brand-bg overflow-hidden relative">
      <div className="max-w-7xl mx-auto px-6">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-32 items-center mb-40">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            className="lg:col-span-6"
          >
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              className="flex items-center gap-4 mb-8"
            >
              <div className="h-[1px] w-12 bg-brand-primary" />
              <span className="text-brand-primary text-xs font-bold tracking-[0.3em] uppercase">Core Infrastructure</span>
            </motion.div>
            
            <h2 className="text-brand-text mb-10">
              Pioneering <br />
              <span className="italic text-brand-primary">Flavor Intelligence.</span>
            </h2>
            
            <p className="text-brand-text-secondary text-xl leading-relaxed mb-10 max-w-xl">
              Alcho Food Indonesia was founded on a singular premise: that <span className="text-brand-text">industrial-scale production</span> deserves the same molecular precision found in professional flavor laboratories.
            </p>
            <p className="text-brand-text-secondary text-lg leading-relaxed mb-12">
              Today, our Tangerang-based facility processes over 50 metric tons of custom-blended substrates monthly, serving enterprise HORECA and multi-national food processors.
            </p>
            
            <button className="btn-secondary group flex items-center gap-4 py-6 px-10">
              Technical Documentation <ArrowRight className="group-hover:translate-x-1 transition-transform" size={18} />
            </button>
          </motion.div>

          <div className="lg:col-span-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
             {[
               { icon: ShieldCheck, title: 'Compliance Stack', desc: 'ISO 22000:2018 & MUI Halal ID-001 Tiered audits.' },
               { icon: Microscope, title: 'Molecular Precision', desc: 'Flavor consistency within 99.9% tolerance.' },
               { icon: Fingerprint, title: 'Heritage Logic', desc: 'Deep-learning based Nusantara profile matching.' },
               { icon: Box, title: 'Modular OEM', desc: 'White-labeling for enterprise cloud kitchen networks.' },
             ].map((feature, i) => (
               <motion.div 
                 key={feature.title}
                 initial={{ opacity: 0, y: 20 }}
                 whileInView={{ opacity: 1, y: 0 }}
                 transition={{ delay: i * 0.1 }}
                 className="p-10 bg-brand-surface border border-brand-border rounded-[2.5rem] flex flex-col items-start gap-6 group hover:border-brand-primary/30 transition-all cursor-default"
               >
                  <div className="w-12 h-12 rounded-2xl bg-brand-bg border border-brand-border flex items-center justify-center group-hover:bg-brand-primary/10 transition-colors">
                     <feature.icon className="text-brand-primary" size={24} />
                  </div>
                  <h4 className="text-brand-text text-xl font-bold">{feature.title}</h4>
                  <p className="text-brand-text-secondary text-sm leading-relaxed">{feature.desc}</p>
               </motion.div>
             ))}
          </div>
        </div>

        {/* Timeline (Roadmap Style) */}
        <div className="relative pt-32 border-t border-brand-border">
           <div className="flex justify-between items-center mb-24">
             <div className="flex items-center gap-4">
               <History size={18} className="text-brand-primary" />
               <h3 className="text-brand-text text-xs uppercase tracking-[0.5em] font-bold">Industrial Roadmap</h3>
             </div>
             <span className="text-brand-primary font-mono text-[10px] font-bold uppercase tracking-[0.2em] bg-brand-primary/5 px-4 py-2 rounded-full border border-brand-primary/20">Operational for 18+ Years</span>
           </div>
           
           <div className="grid grid-cols-1 md:grid-cols-4 gap-8 relative">
             {MILESTONES.map((milestone, i) => (
               <motion.div 
                 key={milestone.year}
                 initial={{ opacity: 0, y: 20 }}
                 whileInView={{ opacity: 1, y: 0 }}
                 transition={{ delay: i * 0.1 }}
                 className="relative group"
               >
                  <div className="mb-8 flex items-end gap-3">
                    <span className="text-5xl font-serif font-black text-brand-surface group-hover:text-brand-primary/20 transition-colors drop-shadow-sm">{milestone.year}</span>
                    <div className="h-[1px] flex-1 bg-brand-fill mb-4 group-hover:bg-brand-primary/20 transition-colors" />
                  </div>
                  <h4 className="text-brand-text text-sm font-bold uppercase tracking-widest mb-4">{milestone.title}</h4>
                  <p className="text-brand-text-secondary text-xs leading-relaxed group-hover:text-brand-text transition-colors">{milestone.description}</p>
               </motion.div>
             ))}
           </div>
        </div>
      </div>
    </section>
  );
}
