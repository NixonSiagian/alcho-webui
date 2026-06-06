/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChefHat, Hotel, Coffee, Factory, Utensils, Zap, PackageOpen, Settings2, Plus, ArrowRight } from 'lucide-react';
import { cn } from '../../lib/utils';

const HORECA_SEGMENTS = [
  { 
    icon: Hotel, 
    name: 'Hotel', 
    desc: 'Bespoke bouillon and base seasonings optimized for high-volume banquet excellence.',
    solutions: ['Signature Soup Bases', 'Breakfast Buffet Seasonings', 'Banquet Scaling Solutions']
  },
  { 
    icon: ChefHat, 
    name: 'Restaurant', 
    desc: 'Signature dry rubs and savory coatings that define your brand identity.',
    solutions: ['Custom Dry Rubs', 'Saucier Concentrates', 'Menu Standardizers']
  },
  { 
    icon: Coffee, 
    name: 'Cafe', 
    desc: 'Zesty snack seasonings and fusion blends for fast-paced modern menus.',
    solutions: ['Snack Toss Seasonings', 'Fusion Spice Blends', 'Quick-Mix Marinades']
  },
  { 
    icon: Zap, 
    name: 'Cloud Kitchen', 
    desc: 'Ultra-consistent flavor systems for multi-brand digital storefronts.',
    solutions: ['Cross-Brand Bases', 'Micro-Dosing Pouches', 'Fast-Prep Marinades']
  },
  { 
    icon: Factory, 
    name: 'Factory', 
    desc: 'Food grade industrial seasonings for snacks, meat processing, and noodles.',
    solutions: ['Bulk Raw Materials', 'High-Purity Seasonings', 'Technical Formulation']
  },
  { 
    icon: Utensils, 
    name: 'Catering', 
    desc: 'Reliable, cost-effective seasonings designed for large-scale professional kitchens.',
    solutions: ['Bulk Economy Tubs', 'All-Purpose Seasonings', 'Stable Stock Concentrates']
  },
];

export default function Horeca() {
  const [activeSegment, setActiveSegment] = useState<number | null>(null);

  return (
    <section id="horeca" className="py-32 lg:py-48 bg-brand-dark overflow-hidden selection:bg-brand-yellow selection:text-brand-maroon">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col lg:flex-row gap-20 items-center mb-32">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            className="flex-1"
          >
            <span className="text-brand-yellow text-xs uppercase font-black tracking-[0.5em] mb-8 block">B2B CULINARY INFRASTRUCTURE</span>
            <h2 className="text-brand-text mb-10 leading-none">
              Specialized Solutions for <br />
              <span className="italic font-serif text-brand-yellow">Horeca Industries.</span>
            </h2>
            <p className="text-gray-400 text-xl mb-12 max-w-2xl leading-relaxed font-medium">
              Alcho Food Industries Indonesia provides the technical foundation for flavor consistency and scalability across every hospitality segment.
            </p>
            
            <div className="flex flex-wrap gap-8">
              <div className="flex items-center gap-4 group">
                <div className="w-14 h-14 bg-brand-yellow/5 border border-brand-yellow/20 rounded-sm flex items-center justify-center group-hover:bg-brand-yellow transition-all duration-500">
                  <PackageOpen className="text-brand-yellow group-hover:text-brand-maroon" size={24} />
                </div>
                <div>
                   <h4 className="text-brand-text font-serif font-black text-lg">OEM Factory</h4>
                   <p className="text-[10px] uppercase tracking-widest text-gray-500 font-black">Contract Manufacturing</p>
                </div>
              </div>
              <div className="flex items-center gap-4 group">
                <div className="w-14 h-14 bg-brand-yellow/5 border border-brand-yellow/20 rounded-sm flex items-center justify-center group-hover:bg-brand-yellow transition-all duration-500">
                  <Settings2 className="text-brand-yellow group-hover:text-brand-maroon" size={24} />
                </div>
                <div>
                  <h4 className="text-brand-text font-serif font-black text-lg">Lab Access</h4>
                  <p className="text-[10px] uppercase tracking-widest text-gray-500 font-black">Custom R&D Formulation</p>
                </div>
              </div>
            </div>
          </motion.div>
          
          <div className="flex-1 lg:pl-12">
            <div className="p-12 bg-gradient-to-br from-brand-maroon/30 to-brand-dark border border-brand-yellow/10 rounded-3xl relative overflow-hidden group">
               <div className="relative z-10">
                 <h3 className="text-brand-text text-3xl font-serif font-black mb-6">Bulk Logistics Fleet.</h3>
                 <p className="text-gray-400 leading-relaxed mb-10">We handle nationwide distribution with climate-controlled logistics ensuring your seasonings arrive in optimal condition, from factory to kitchen floor.</p>
                 <a href="#contact" className="text-brand-yellow flex items-center gap-3 text-xs uppercase font-black tracking-widest group-hover:gap-6 transition-all duration-500">
                   Schedule Facility Visit <ArrowRight size={18} />
                 </a>
               </div>
               <div className="absolute top-0 right-0 w-64 h-64 bg-brand-yellow/5 blur-[80px] rounded-full translate-x-1/2 -translate-y-1/2" />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {HORECA_SEGMENTS.map((segment, i) => (
            <motion.div
              key={segment.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              onMouseEnter={() => setActiveSegment(i)}
              onMouseLeave={() => setActiveSegment(null)}
              className={cn(
                "group p-10 bg-brand-dark/50 border rounded-2xl transition-all duration-700 cursor-pointer overflow-hidden relative",
                activeSegment === i 
                  ? "border-brand-yellow bg-brand-yellow/[0.03] scale-[1.02]" 
                  : "border-brand-border grayscale group-hover:grayscale-0"
              )}
            >
              <div className="relative z-10 flex flex-col h-full">
                <segment.icon 
                  size={48} 
                  strokeWidth={1.5}
                  className={cn(
                    "mb-8 transition-all duration-500",
                    activeSegment === i ? "text-brand-yellow scale-110" : "text-gray-600"
                  )} 
                />
                
                <h4 className={cn(
                  "text-3xl font-serif font-black mb-6 transition-colors duration-500",
                  activeSegment === i ? "text-brand-yellow" : "text-brand-text"
                )}>
                  {segment.name}
                </h4>
                
                <p className="text-gray-500 text-sm leading-relaxed mb-8 font-medium">
                  {segment.desc}
                </p>

                <AnimatePresence>
                  {activeSegment === i && (
                    <motion.div 
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                      className="mt-6 space-y-3 pt-6 border-t border-brand-yellow/20"
                    >
                      {segment.solutions.map(sol => (
                        <div key={sol} className="flex items-center gap-3 text-[10px] uppercase font-black tracking-widest text-brand-yellow">
                           <Plus size={12} />
                           {sol}
                        </div>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Decorative texture */}
              <div className={cn(
                "absolute -bottom-10 -right-10 w-40 h-40 bg-brand-yellow/5 blur-3xl rounded-full transition-opacity duration-700",
                activeSegment === i ? "opacity-100" : "opacity-0"
              )} />
            </motion.div>
          ))}
        </div>
      </div>
      
      {/* Animated Metrics Strip */}
      <div className="mt-32 border-y border-brand-border bg-brand-dark/90 backdrop-blur-2xl py-20">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-2 lg:grid-cols-4 gap-16">
          {[
            { value: '500T+', label: 'Annual Throughput' },
            { value: '18 yrs', label: 'In-Market Mastery' },
            { value: '350+', label: 'Custom R&D Projects' },
            { value: 'ISO', label: 'Safety Gold Standard' },
          ].map((stat, i) => (
            <motion.div 
              key={stat.label}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.1 }}
              className="text-center lg:text-left flex flex-col gap-2"
            >
              <span className="text-brand-yellow font-serif font-black text-5xl lg:text-7xl leading-none">{stat.value}</span>
              <span className="text-[11px] uppercase font-black tracking-[0.4em] text-gray-400">{stat.label}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
