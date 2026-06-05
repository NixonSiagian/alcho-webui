/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion } from 'motion/react';
import { Package, Briefcase, FileText, Settings, ArrowRight, Layers } from 'lucide-react';

const CAPABILITIES = [
  { 
    title: 'Custom R&D', 
    desc: 'Bespoke flavor matching and profile development in state-of-the-art labs.',
    icon: Settings
  },
  { 
    title: 'Packaging Suite', 
    desc: 'From 100g sachets to industrial 25kg bulk bags with custom branding.',
    icon: Package
  },
  { 
    title: 'Regulatory Support', 
    desc: 'Full assistance with BPOM registration and Halal certification dossiers.',
    icon: FileText
  },
  { 
    title: 'Volume Scaling', 
    desc: 'Automated infrastructure capable of 100+ metric tons / month per SKU.',
    icon: Layers
  }
];

export default function OEM() {
  return (
    <section id="oem" className="py-32 lg:py-48 bg-brand-dark overflow-hidden selection:bg-brand-yellow selection:text-brand-maroon">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-center mb-40">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <span className="text-brand-yellow text-xs uppercase font-black tracking-[0.6em] mb-8 block">PRIVATE LABEL INFRASTRUCTURE</span>
            <h2 className="text-white text-5xl lg:text-8xl font-serif font-black mb-10 leading-none">
              OEM <br />
              <span className="italic text-brand-yellow">Excellence.</span>
            </h2>
            <p className="text-gray-400 text-xl font-medium leading-relaxed mb-12 max-w-xl">
              Launch your own seasoning brand or optimize your commercial supply chain with Alcho's industrial private label services.
            </p>
            
            <button className="group flex items-center gap-8 bg-brand-yellow text-brand-maroon px-12 py-7 rounded-sm font-serif font-black uppercase tracking-widest hover:bg-white transition-all shadow-2xl shadow-brand-yellow/10">
              Download OEM Prospectus <ArrowRight className="group-hover:translate-x-3 transition-transform" />
            </button>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
             {CAPABILITIES.map((cap, i) => (
               <motion.div 
                 key={cap.title}
                 initial={{ opacity: 0, y: 20 }}
                 whileInView={{ opacity: 1, y: 0 }}
                 transition={{ delay: i * 0.1 }}
                 className="p-10 bg-white/5 border border-white/10 rounded-3xl hover:border-brand-yellow/30 transition-all"
               >
                  <cap.icon className="text-brand-yellow mb-8" size={32} />
                  <h4 className="text-white text-xl font-serif font-black mb-4">{cap.title}</h4>
                  <p className="text-gray-500 text-sm leading-relaxed">{cap.desc}</p>
               </motion.div>
             ))}
          </div>
        </div>

        <div className="p-12 lg:p-20 bg-brand-maroon/20 rounded-[3rem] border border-brand-yellow/10 flex flex-col lg:flex-row items-center justify-between gap-12">
           <div className="max-w-2xl text-center lg:text-left">
              <h3 className="text-white text-3xl font-serif font-black mb-6">Ready to lead your own brand?</h3>
              <p className="text-gray-400 text-lg font-medium">Schedule a technical consultation with our R&D director to discuss your proprietary profile requirements.</p>
           </div>
           <button className="whitespace-nowrap px-12 py-7 border-2 border-brand-yellow text-brand-yellow rounded-full font-serif font-black uppercase tracking-[0.2em] text-sm hover:bg-brand-yellow hover:text-brand-maroon transition-all">
              Request Consultation
           </button>
        </div>
      </div>
    </section>
  );
}
