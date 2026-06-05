/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { motion } from 'motion/react';
import { FileText, Mail, ShieldCheck, HelpCircle, ArrowRight } from 'lucide-react';
import SEO from '../components/common/SEO';

const RESOURCE_TYPES = [
  { title: "Technical Data Sheets (TDS)", icon: <FileText />, desc: "Detailed ingredient composition and nutritional analysis for industrial compliance." },
  { title: "Safety Data Sheets (SDS)", icon: <ShieldCheck />, desc: "Handling and storage safety specifications for factory environments." },
  { title: "OEM Implementation Guide", icon: <HelpCircle />, desc: "Full process documentation for private label flavor development." }
];

export default function Resources() {
  return (
    <div className="pt-24 min-h-screen bg-brand-bg">
      <SEO title="Technical Resources" description="Request formal technical documentation, specifications, and certifications from our R&D team." />
      
      <section className="py-24 px-6 text-center">
         <h1 className="text-5xl md:text-9xl font-bold uppercase mb-8">Technical <br /><span className="italic text-brand-primary lowercase font-serif">documentation.</span></h1>
         <p className="text-brand-text-secondary text-xl max-w-2xl mx-auto">
           To ensure data integrity and security, all formal technical specifications and certifications are provided upon authorized request.
         </p>
      </section>

      <section className="px-6 pb-24">
        <div className="max-w-7xl mx-auto grid md:grid-cols-3 gap-8">
           {RESOURCE_TYPES.map((res, i) => (
             <motion.div 
               key={i}
               initial={{ opacity: 0, y: 20 }}
               whileInView={{ opacity: 1, y: 0 }}
               transition={{ delay: i * 0.1 }}
               className="p-12 bg-brand-surface rounded-[3rem] border border-white/5 space-y-6"
             >
                <div className="w-16 h-16 bg-brand-primary/10 rounded-2xl flex items-center justify-center text-brand-primary">
                   {res.icon}
                </div>
                <h3 className="text-2xl font-bold text-white">{res.title}</h3>
                <p className="text-brand-text-secondary leading-relaxed">{res.desc}</p>
             </motion.div>
           ))}
        </div>
      </section>

      <section className="py-24 bg-brand-card mx-6 rounded-[4rem] border border-white/10 text-center mb-24 overflow-hidden relative">
         <div className="absolute inset-0 bg-brand-primary/5 blur-[100px]" />
         <div className="relative z-10 max-w-2xl mx-auto space-y-10 py-12">
            <h2 className="text-4xl md:text-6xl font-bold">Request Official <br /><span className="text-brand-primary italic">Specifications.</span></h2>
            <p className="text-brand-text-secondary text-lg">
              Contact our Quality Control department directly to receive the latest FSSC 22000, Halal, and BPOM documentation for your industrial audit.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
               <a href="mailto:qc@alchofoods.com" className="btn-primary px-10 py-5 flex items-center gap-3">
                  Email QC Department <Mail size={18} />
               </a>
               <button className="text-white font-bold flex items-center gap-2 hover:gap-4 transition-all">
                  Request via Portal <ArrowRight size={18} />
               </button>
            </div>
         </div>
      </section>
    </div>
  );
}
