/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import FlavorJourney from '../components/sections/FlavorJourney';
import ProductionJourney from '../components/sections/ProductionJourney';
import { motion } from 'motion/react';

import SEO from '../components/common/SEO';

export default function About() {
  return (
    <div className="pt-24 min-h-screen bg-brand-bg">
      <SEO title="Our Heritage" description="PT. NEW ALFA OMEGA UTAMA history and commitment to industrial flavor purity." />
      <section className="py-24 px-6 border-b border-white/5">
        <div className="max-w-7xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-block px-4 py-2 bg-brand-primary/10 rounded-full mb-8"
          >
            <span className="text-[10px] uppercase font-bold tracking-widest text-brand-primary">Our Story</span>
          </motion.div>
          <h1 className="text-5xl md:text-9xl font-bold mb-8 italic">The Flavor <span className="text-brand-primary">Architects.</span></h1>
          <p className="text-xl text-brand-text-secondary max-w-2xl mx-auto leading-relaxed">
            PT. NEW ALFA OMEGA UTAMA was founded on a simple premise: Industrial scale should never mean a compromise in authentic flavor.
          </p>
        </div>
      </section>
      
      <FlavorJourney />
      <ProductionJourney />
      
      <section className="py-48 px-6 bg-brand-bg text-center">
        <h2 className="text-4xl md:text-7xl font-bold mb-12">Commitment to <span className="italic text-brand-primary">Purity.</span></h2>
        <div className="grid md:grid-cols-3 gap-12 max-w-5xl mx-auto text-left">
           {[
             { title: "Zero Variance", desc: "Every batch is balanced using high-precision digital blending to ensure the same taste every time." },
             { title: "Pure Ingredients", desc: "We source raw spices from trusted archipelago farmers, verified for quality and potency." },
             { title: "Safety First", desc: "FSSC 22000 certified manufacturing processes prioritizing hygiene and food safety above all." }
           ].map((item, i) => (
             <div key={i} className="space-y-4">
                <p className="text-brand-primary font-bold text-xl">{item.title}</p>
                <p className="text-brand-text-secondary leading-relaxed">{item.desc}</p>
             </div>
           ))}
        </div>
      </section>
    </div>
  );
}
