/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { motion } from 'motion/react';
import { Truck, Handshake, TrendingUp, ShieldCheck, Globe, ArrowRight } from 'lucide-react';
import { SafeImage } from '../components/common/SafeImage';
import { IMG } from '../assets/images';
import DistributionNetwork from '../components/sections/DistributionNetwork';

import SEO from '../components/common/SEO';

export default function Distributor() {
  return (
    <div className="pt-24 min-h-screen bg-brand-bg">
      <SEO title="Distributor Program" description="Join our nationwide network and bring Alcho's industrial flavor consistency to your regional market." />
      {/* Hero */}
      <section className="py-24 px-6 text-center border-b border-brand-border">
        <div className="max-w-4xl mx-auto space-y-8">
          <div className="inline-flex items-center gap-3 px-4 py-2 bg-brand-primary/10 border border-brand-primary/20 rounded-full">
            <Globe size={16} className="text-brand-primary" />
            <span className="text-[10px] uppercase font-bold tracking-[0.4em] text-brand-primary">Growth Partnership</span>
          </div>
          <h1 className="text-5xl md:text-9xl font-bold uppercase leading-none">Distributor <br /><span className="italic text-brand-primary lowercase font-serif">network.</span></h1>
          <p className="text-xl text-brand-text-secondary leading-relaxed">
            Expand your portfolio with Indonesia's most consistent seasoning infrastructure. We are seeking regional partners to bring Alcho quality to every corner of the archipelago and beyond.
          </p>
        </div>
      </section>

      <DistributionNetwork />

      {/* Why Join */}
      <section className="py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-3 gap-12">
            {[
              { 
                icon: <TrendingUp />, 
                title: "High Demand", 
                desc: "Serve the growing FMCG and Horeca sectors with products that solve real consistency problems for chefs." 
              },
              { 
                icon: <Handshake />, 
                title: "Full Tech Support", 
                desc: "Direct access to our R&D lab for customized requests and technical product training." 
              },
              { 
                icon: <Truck />, 
                title: "Reliable Logistics", 
                desc: "Tier-1 supply chain management ensures your stock is always replenished and never stagnant." 
              }
            ].map((p, i) => (
              <div key={i} className="p-10 bg-brand-surface rounded-[3rem] border border-brand-border space-y-6">
                <div className="w-16 h-16 bg-brand-primary/10 rounded-2xl flex items-center justify-center text-brand-primary mb-4">
                  {p.icon}
                </div>
                <h3 className="text-2xl font-bold text-brand-text">{p.title}</h3>
                <p className="text-brand-text-secondary leading-relaxed">{p.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Requirement Map */}
      <section className="py-24 bg-brand-surface border-t border-brand-border">
         <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-16 items-center">
            <div className="rounded-[4rem] overflow-hidden aspect-square relative">
               <SafeImage src={IMG.factory} alt="Distribution warehouse and logistics" className="w-full h-full" />
               <div className="absolute inset-0 bg-brand-primary/10 mix-blend-overlay" />
            </div>
            <div className="space-y-10">
               <h2 className="text-4xl md:text-6xl font-bold leading-tight">Become an <span className="italic text-brand-primary">Authorized Partner.</span></h2>
               <div className="space-y-6">
                  {[
                    "Proven track record in FMCG or Horeca distribution.",
                    "Controlled storage environment for dry food products.",
                    "Active dedicated sales force for regional coverage.",
                    "Commitment to Alcho quality and brand standards."
                  ].map((text, i) => (
                    <div key={i} className="flex gap-4 items-start">
                       <div className="w-6 h-6 rounded-full bg-brand-primary/20 flex items-center justify-center text-brand-primary mt-1 shrink-0">
                          <ShieldCheck size={14} />
                       </div>
                       <p className="text-brand-text-secondary">{text}</p>
                    </div>
                  ))}
               </div>
               <button className="btn-primary px-12 py-6 flex items-center gap-3">
                  Apply for Partnership <ArrowRight size={20} />
               </button>
            </div>
         </div>
      </section>
    </div>
  );
}
