/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { motion } from 'motion/react';
import Hero from '../components/sections/Hero';
import Testimonials from '../components/sections/Testimonials';
import { ArrowRight, ChefHat, Factory, Globe, Award } from 'lucide-react';
import { Link } from 'react-router-dom';
import { SafeImage } from '../components/common/SafeImage';

import SEO from '../components/common/SEO';

export default function Home() {
  return (
    <div className="w-full">
      <SEO 
        title="Industrial Flavor Solutions" 
        description="PT. NEW ALFA OMEGA UTAMA - Leading provider of industrial-scale seasoning systems and premium flavor solutions for Horeca and OEM in Indonesia."
      />
      <Hero />
      
      {/* Cinematic Vision Section */}
      <section className="py-48 bg-brand-bg relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-24 items-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            className="relative"
          >
            <div className="absolute -inset-4 border border-brand-primary/20 rounded-[4rem] animate-pulse" />
            <SafeImage 
              src="/src/assets/images/alcho_spice_lab_1780645143710.png" 
              alt="Culinary Precision Lab"
              className="rounded-[3.5rem] grayscale hover:grayscale-0 transition-all duration-1000 aspect-[4/5] object-cover shadow-2xl"
            />
            <div className="absolute -bottom-10 -right-10 bg-brand-card p-10 rounded-[3rem] border border-white/10 shadow-2xl hidden md:block">
              <p className="text-4xl font-black text-brand-primary mb-2">99.9%</p>
              <p className="text-[10px] uppercase font-bold tracking-widest text-brand-text-secondary leading-tight">Flavor <br /> Consistency</p>
            </div>
          </motion.div>
          <div className="space-y-12">
             <div className="space-y-6">
               <h2 className="text-5xl md:text-8xl font-black leading-none uppercase">The Logic <br /><span className="italic text-brand-primary font-serif lowercase">of taste.</span></h2>
               <p className="text-2xl text-brand-text-secondary leading-relaxed font-light">
                 We don't just supply ingredients; we supply precision. Every milligram is calculated to ensure your production line never sees a taste variance.
               </p>
             </div>
             
             <div className="space-y-8 border-l border-white/10 pl-10">
                {[
                  { title: "Standardized Base", desc: "Remove the guesswork from your central kitchen with our high-viscosity bumbu dasar." },
                  { title: "Flavor Integrity", desc: "Cryogenic milling preserves 100% of the volatile oils, locking in original spice intensity." },
                  { title: "Audited Safety", desc: "FSSC 22000 transparency means your industrial audit is always clean and compliant." }
                ].map((item, i) => (
                  <div key={i} className="space-y-2">
                     <p className="text-white font-black uppercase tracking-widest text-sm">{item.title}</p>
                     <p className="text-brand-text-secondary text-lg">{item.desc}</p>
                  </div>
                ))}
             </div>
          </div>
        </div>
      </section>

      <Testimonials />

      {/* Solutions Preview */}
      <section className="py-24 bg-brand-surface relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-6xl font-bold mb-6">Our Industrial <span className="italic text-brand-primary">Solutions.</span></h2>
            <p className="text-brand-text-secondary text-lg max-w-2xl mx-auto">We serve a diverse range of industries with tailored flavor systems.</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { 
                title: "Horeca", 
                desc: "Standardized sauces and bouillon for restaurants and hotel chains.", 
                link: "/horeca",
                icon: <ChefHat size={32} />
              },
              { 
                title: "Industrial OEM", 
                desc: "Private label seasonings and proprietary flavor development for factories.", 
                link: "/oem",
                icon: <Factory size={32} />
              },
              { 
                title: "Global Supply", 
                desc: "Export-grade certifications for international food distributors.", 
                link: "/distributor",
                icon: <Globe size={32} />
              }
            ].map((sol, i) => (
              <Link 
                key={i} 
                to={sol.link}
                className="group p-10 bg-brand-bg rounded-[2.5rem] border border-white/5 hover:border-brand-primary/30 transition-all hover:-translate-y-2"
              >
                <div className="w-16 h-16 bg-brand-primary/10 rounded-2xl flex items-center justify-center text-brand-primary mb-8 group-hover:scale-110 transition-transform">
                  {sol.icon}
                </div>
                <h3 className="text-white text-2xl font-bold mb-4">{sol.title}</h3>
                <p className="text-brand-text-secondary leading-relaxed mb-8">{sol.desc}</p>
                <span className="flex items-center gap-2 text-brand-primary text-xs font-bold uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity">
                  Learn More <ArrowRight size={16} />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Quick CTA */}
      <section className="py-24 bg-brand-bg">
        <div className="max-w-7xl mx-auto px-6">
          <div className="bg-brand-card p-12 md:p-24 rounded-[4rem] text-center space-y-8 border border-white/5 relative overflow-hidden">
            <div className="absolute inset-0 bg-brand-primary/5 blur-[100px]" />
            <h2 className="text-4xl md:text-7xl font-bold text-white relative z-10">Ready to Upgrade <br /><span className="italic text-brand-primary">Your Flavor Profile?</span></h2>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-6 relative z-10">
              <Link to="/products" className="btn-primary px-12 py-5 font-bold">Browse Catalog</Link>
              <Link to="/contact" className="px-12 py-5 rounded-2xl border border-white/10 text-white font-bold hover:bg-white/5 transition-colors">Request Samples</Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
