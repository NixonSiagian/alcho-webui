/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Building2, UtensilsCrossed, Factory, Ship, ArrowRight, Zap } from 'lucide-react';

const SOLUTIONS = [
  {
    id: "horeca",
    name: "Enterprise Hospitality",
    icon: UtensilsCrossed,
    description: "Standardized flavor profiles across 100+ outlets. We ensure every plate tastes exactly the same, from Jakarta to Singapore.",
    points: ["Menu Consistency Audit", "Custom Batch Sizing", "Ghost Kitchen Optimization"],
    image: "https://images.unsplash.com/photo-1550966841-3ee7adac1af8?q=80&w=800"
  },
  {
    id: "oem",
    name: "Industrial OEM",
    icon: Factory,
    description: "Your proprietary recipe, manufactured with our world-class traceability. Full white-label and private label support.",
    points: ["Confidentiality Guaranteed", "FSSC 22000 Facility", "Rapid Prototype-to-Scale"],
    image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=800"
  },
  {
    id: "export",
    name: "Global Logistics",
    icon: Ship,
    description: "Navigating international food compliance. We handle the technical documentation for seamless cross-border distribution.",
    points: ["International Compliance", "Export-Ready Packaging", "Cross-Border Tax Logic"],
    image: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?q=80&w=800"
  }
];

export default function HorecaSolutions() {
  const [active, setActive] = useState(SOLUTIONS[0]);

  return (
    <section id="horeca" className="py-24 lg:py-48 bg-brand-surface relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-24 items-start">
            <div className="space-y-16">
                <div>
                    <motion.div 
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        className="flex items-center gap-4 mb-8"
                    >
                        <div className="h-[1px] w-12 bg-brand-primary" />
                        <span className="text-brand-primary text-xs font-bold tracking-[0.4em] uppercase">Industry Selection</span>
                    </motion.div>
                    <h2 className="text-brand-text text-5xl md:text-8xl mb-8 leading-tight">Scale Your <br /><span className="italic text-brand-primary">Framework.</span></h2>
                    <p className="text-xl text-brand-text-secondary leading-relaxed max-w-xl">
                      Select your operational model to see how Alcho's technical seasoning systems integrate with your business architecture.
                    </p>
                </div>

                <div className="space-y-4">
                    {SOLUTIONS.map((item) => (
                      <button
                        key={item.id}
                        onClick={() => setActive(item)}
                        className={`w-full group p-8 rounded-[2rem] border transition-all text-left flex items-center gap-8 ${
                          active.id === item.id 
                            ? 'bg-brand-primary border-brand-primary text-brand-text shadow-2xl' 
                            : 'bg-brand-bg/50 border-brand-border text-brand-text hover:border-brand-primary/30'
                        }`}
                      >
                         <div className={`w-16 h-16 rounded-2xl flex items-center justify-center transition-colors ${
                            active.id === item.id ? 'bg-brand-bg/20' : 'bg-brand-surface group-hover:bg-brand-primary/10 group-hover:text-brand-primary'
                         }`}>
                             <item.icon size={28} />
                         </div>
                         <div className="flex-1">
                            <h4 className="text-2xl font-bold mb-1">{item.name}</h4>
                            <p className={`text-sm ${active.id === item.id ? 'text-brand-text/60' : 'text-brand-text-secondary'}`}>
                               Industrial solutions for {item.name.toLowerCase()}
                            </p>
                         </div>
                         <ArrowRight className={`transition-transform ${active.id === item.id ? 'translate-x-2' : ''}`} />
                      </button>
                    ))}
                </div>
            </div>

            <div className="relative sticky top-32">
                <AnimatePresence mode="wait">
                    <motion.div
                        key={active.id}
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        transition={{ duration: 0.5 }}
                        className="bg-brand-bg rounded-[4rem] border border-brand-border overflow-hidden shadow-2xl"
                    >
                        <div className="h-96 relative">
                            <img src={active.image} alt={active.name} className="w-full h-full object-cover grayscale brightness-50" />
                            <div className="absolute inset-0 bg-gradient-to-t from-brand-bg via-brand-bg/20 to-transparent" />
                            <div className="absolute top-10 left-10 p-4 bg-brand-primary/80 backdrop-blur-xl rounded-2xl text-brand-text">
                                <active.icon size={32} />
                            </div>
                        </div>
                        
                        <div className="p-12 space-y-12">
                            <div>
                                <h3 className="text-brand-text text-3xl mb-6">{active.name}</h3>
                                <p className="text-brand-text-secondary text-lg leading-relaxed">
                                    {active.description}
                                </p>
                            </div>

                            <div className="space-y-6">
                                {active.points.map((point, i) => (
                                    <div key={i} className="flex items-center gap-4 text-brand-text">
                                        <div className="p-1 bg-brand-primary rounded-full">
                                            <Zap size={10} className="text-brand-text" fill="currentColor" />
                                        </div>
                                        <span className="font-bold text-sm uppercase tracking-widest">{point}</span>
                                    </div>
                                ))}
                            </div>

                            <button className="btn-primary w-full py-7">
                                Consult Solution Architecture
                            </button>
                        </div>
                    </motion.div>
                </AnimatePresence>
                
                {/* Visual Flair */}
                <div className="absolute -bottom-20 -right-20 w-80 h-80 bg-brand-primary/10 blur-[120px] rounded-full pointer-events-none" />
            </div>
        </div>
      </div>
    </section>
  );
}
