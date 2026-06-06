/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { motion } from 'motion/react';
import { ChefHat, UtensilsCrossed, Hotel, Coffee, Utensils, CheckCircle2 } from 'lucide-react';
import { SafeImage } from '../components/common/SafeImage';
import { IMG } from '../assets/images';

import SEO from '../components/common/SEO';

export default function HorecaSolutions() {
  return (
    <div className="pt-24 min-h-screen">
      <SEO title="Horeca Solutions" description="Standardized flavor systems for hotel chains and professional kitchens." />
      {/* Hero */}
      <section className="py-24 px-6 bg-brand-card overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
             <div className="space-y-8">
                <ChefHat className="text-brand-primary" size={48} />
                <h1 className="text-5xl md:text-8xl font-bold leading-tight uppercase">Standardizing <br /> <span className="italic text-brand-primary">Great Kitchens.</span></h1>
                <p className="text-xl text-brand-text-secondary max-w-xl">
                  We provide the foundational flavor systems for Indonesia's leading hotel chains, restaurants, and catering services. Reduce labor, increase consistency.
                </p>
                <div className="flex flex-wrap gap-4 pt-8">
                   <div className="flex items-center gap-3 px-6 py-3 bg-brand-fill rounded-full border border-brand-border-strong">
                      <CheckCircle2 size={16} className="text-brand-accent" />
                      <span className="text-xs font-bold uppercase tracking-widest">Consistency</span>
                   </div>
                   <div className="flex items-center gap-3 px-6 py-3 bg-brand-fill rounded-full border border-brand-border-strong">
                      <CheckCircle2 size={16} className="text-brand-accent" />
                      <span className="text-xs font-bold uppercase tracking-widest">Cost Reduction</span>
                   </div>
                   <div className="flex items-center gap-3 px-6 py-3 bg-brand-fill rounded-full border border-brand-border-strong">
                      <CheckCircle2 size={16} className="text-brand-accent" />
                      <span className="text-xs font-bold uppercase tracking-widest">Speed of Service</span>
                   </div>
                </div>
             </div>
             <div className="relative aspect-video lg:aspect-square rounded-[4rem] overflow-hidden shadow-2xl">
                <SafeImage src={IMG.chef} alt="Professional Plating" className="w-full h-full" />
                <div className="absolute inset-0 bg-gradient-to-t from-brand-bg/60 to-transparent" />
             </div>
          </div>
        </div>
      </section>

      {/* Services sectors */}
      <section className="py-24 px-6 bg-brand-bg">
        <div className="max-w-7xl mx-auto">
           <div className="text-center mb-20">
              <h2 className="text-4xl md:text-6xl font-bold mb-6 italic">Who We <span className="text-brand-primary font-sans lowercase">serve.</span></h2>
           </div>
           <div className="grid md:grid-cols-4 gap-8">
              {[
                { title: "Hotel Chains", icon: <Hotel />, desc: "Uniform breakfast and buffet solutions for nationwide hospitality." },
                { title: "Quick Service", icon: <UtensilsCrossed />, desc: "Fast-deployment seasonings for high-turnover casual dining." },
                { title: "Coffee Shops", icon: <Coffee />, desc: "Gourmet syrups and specialty powders for modern cafes." },
                { title: "Catering", icon: <Utensils />, desc: "Bulk-format flavor bases for large scale banquet services." }
              ].map((s, i) => (
                <div key={i} className="p-10 bg-brand-surface rounded-[2.5rem] border border-brand-border hover:border-brand-primary/30 transition-all group">
                   <div className="w-16 h-16 bg-brand-primary/10 rounded-2xl flex items-center justify-center text-brand-primary mb-8 group-hover:scale-110 transition-transform">
                      {s.icon}
                   </div>
                   <h3 className="text-brand-text text-2xl font-bold mb-4">{s.title}</h3>
                   <p className="text-brand-text-secondary text-sm leading-relaxed">{s.desc}</p>
                </div>
              ))}
           </div>
        </div>
      </section>

      {/* Solutions */}
      <section className="py-24 bg-brand-surface border-t border-brand-border">
        <div className="max-w-7xl mx-auto px-6">
           <div className="flex flex-col lg:flex-row gap-16 items-center">
              <div className="lg:order-2 w-full lg:w-1/2 rounded-[3.5rem] overflow-hidden aspect-video">
                 <SafeImage src={IMG.lab} alt="R&D flavor customization" className="w-full h-full" />
              </div>
              <div className="w-full lg:w-1/2 space-y-10">
                 <h2 className="text-4xl md:text-6xl font-bold leading-tight">Flavor <br /> <span className="italic text-brand-primary">Customization.</span></h2>
                 <p className="text-xl text-brand-text-secondary leading-relaxed">
                   Looking for a signature glaze or a unique soup base? Our R&D team works directly with executive chefs to replicate and standardize proprietary recipes.
                 </p>
                 <button className="btn-primary px-10 py-5">Book a Tasting Session</button>
              </div>
           </div>
        </div>
      </section>
    </div>
  );
}
