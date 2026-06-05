/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { motion } from 'motion/react';
import { Factory, ShieldCheck, PenTool, Zap, ArrowRight, Package } from 'lucide-react';
import { Link } from 'react-router-dom';
import { SafeImage } from '../components/common/SafeImage';

import SEO from '../components/common/SEO';

export default function OEM() {
  return (
    <div className="pt-24 min-h-screen bg-brand-bg">
      <SEO title="OEM Manufacturing" description="Private label seasoning production for food brands and factories." />
      {/* Hero */}
      <section className="py-24 px-6 relative overflow-hidden">
        <div className="absolute inset-0 z-0 opacity-40">
           <SafeImage src="/src/assets/images/alcho_factory_interior_1780645061770.png" alt="Factory" className="w-full h-full" />
           <div className="absolute inset-0 bg-gradient-to-t from-brand-bg via-transparent to-brand-bg" />
        </div>
        <div className="max-w-7xl mx-auto relative z-10 text-center py-24">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="mb-12 inline-flex items-center gap-3 px-6 py-3 bg-brand-primary/10 border border-brand-primary/20 rounded-full"
          >
            <Factory className="text-brand-primary" size={20} />
            <span className="text-[10px] uppercase font-bold tracking-[0.4em] text-brand-primary">Manufacturing Excellence</span>
          </motion.div>
          <h1 className="text-5xl md:text-9xl font-bold uppercase mb-12">OEM & <br /><span className="italic text-brand-primary lowercase font-serif">private label.</span></h1>
          <p className="text-xl text-brand-text-secondary max-w-2xl mx-auto leading-relaxed">
            From concept to pallet. We provide full-service manufacturing for your seasoning brand, backed by FSSC 22000 transparency and Halal certification.
          </p>
        </div>
      </section>

      {/* OEM Capabilities */}
      <section className="py-24 px-6">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-3 gap-8">
           {[
             { 
               title: "Proprietary R&D", 
               icon: <PenTool />, 
               desc: "Our lab creates custom flavor profiles according to your specific target audience and market requirements." 
             },
             { 
               title: "Flexible Packaging", 
               icon: <Package />, 
               desc: "From 10g sachet formats to 25kg industrial bulk bags, we handle diverse packaging needs." 
             },
             { 
               title: "Quality Assurance", 
               icon: <ShieldCheck />, 
               desc: "Rigorous testing and batch retention samples ensure every unit matches your specification." 
             }
           ].map((c, i) => (
             <div key={i} className="p-12 bg-brand-card rounded-[3rem] border border-white/5 hover:border-brand-primary/30 transition-all group">
                <div className="w-16 h-16 bg-brand-primary/10 rounded-2xl flex items-center justify-center text-brand-primary mb-8 group-hover:scale-110 transition-transform">
                   {c.icon}
                </div>
                <h3 className="text-white text-2xl font-bold mb-6">{c.title}</h3>
                <p className="text-brand-text-secondary leading-relaxed">{c.desc}</p>
             </div>
           ))}
        </div>
      </section>

      {/* Process */}
      <section className="py-24 bg-brand-surface">
        <div className="max-w-7xl mx-auto px-6">
           <div className="text-center mb-24">
              <h2 className="text-4xl md:text-6xl font-bold mb-6">Our <span className="italic text-brand-primary">OEM Journey.</span></h2>
           </div>
           
           <div className="grid md:grid-cols-4 gap-4">
              {[
                { step: "01", val: "Consultation", desc: "Defining flavor target and market segment." },
                { step: "02", val: "Sampling", desc: "Batch testing until the profile is perfect." },
                { step: "03", val: "Production", desc: "Industrial scale manufacturing and QC." },
                { step: "04", val: "Delivery", desc: "Secure packaging and nationwide logistics." }
              ].map((s, i) => (
                <div key={i} className="relative p-8 text-center space-y-4">
                   <p className="text-6xl font-black text-white/5 absolute -top-4 left-1/2 -translate-x-1/2 z-0">{s.step}</p>
                   <p className="text-brand-primary font-bold text-xl relative z-10">{s.val}</p>
                   <p className="text-brand-text-secondary text-sm relative z-10">{s.desc}</p>
                   {i < 3 && <div className="hidden md:block absolute top-1/2 -right-4 w-8 h-[1px] bg-white/10" />}
                </div>
              ))}
           </div>
        </div>
      </section>

      {/* Inquiry Flow Trigger */}
      <section className="py-24 px-6 bg-brand-bg relative overflow-hidden">
        <div className="max-w-4xl mx-auto text-center space-y-12 relative z-10">
           <h2 className="text-4xl md:text-7xl font-black uppercase">Ready to Develop <br /> <span className="text-brand-primary italic">Your Signature?</span></h2>
           <p className="text-xl text-brand-text-secondary">Skip the guesswork. Our technical lab is ready to reverse-engineer your proprietary flavor or create something entirely new from our database of 200+ flavor compounds.</p>
           <Link to="/contact" className="btn-primary px-16 py-7 text-xl flex mx-auto items-center gap-4 group">
              Start OEM Consultation <ArrowRight size={24} className="group-hover:translate-x-2 transition-transform" />
           </Link>
        </div>
        <div className="absolute inset-0 bg-brand-primary/5 blur-[120px] -z-10" />
      </section>
    </div>
  );
}
