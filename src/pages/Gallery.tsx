/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { motion } from 'motion/react';
import { SafeImage } from '../components/common/SafeImage';

const GALLERY_ITEMS = [
  { url: "https://images.unsplash.com/photo-1549590143-d5855148a9d5?q=80&w=1200", title: "Raw Spices", category: "Source" },
  { url: "https://images.unsplash.com/photo-1590089415225-401ed6f9db8e?q=80&w=1200", title: "Milling Facility", category: "Production" },
  { url: "https://images.unsplash.com/photo-1615484477778-ca3b77940c25?q=80&w=1200", title: "Blending Unit", category: "Production" },
  { url: "https://images.unsplash.com/photo-1544025162-d76694265947?q=80&w=1200", title: "Laboratory Check", category: "Quality" },
  { url: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?q=80&w=1200", title: "Plated Excellence", category: "Culinary" },
  { url: "https://images.unsplash.com/photo-1596797038530-2c39fa81b487?q=80&w=1200", title: "Bakso Presentation", category: "Culinary" },
  { url: "https://images.unsplash.com/photo-1560611580-b9f0d7f688a2?q=80&w=1200", title: "Warehouse Scale", category: "Logistics" },
  { url: "https://images.unsplash.com/photo-1506368249639-73a05d6f6488?q=80&w=1200", title: "Fresh Aromatics", category: "Source" }
];

import SEO from '../components/common/SEO';

export default function Gallery() {
  return (
    <div className="pt-24 min-h-screen bg-brand-bg">
      <SEO title="Flavor Gallery" description="Visual journey through our archipelagic spice sources and industrial manufacturing precision." />
      <section className="py-24 px-6 text-center">
         <h1 className="text-5xl md:text-9xl font-bold uppercase mb-8 italic">Visual <span className="text-brand-primary">Heritage.</span></h1>
         <p className="text-brand-text-secondary text-xl max-w-2xl mx-auto">From the raw archipelagic origin to the precision of our industrial labs.</p>
      </section>

      <section className="px-6 pb-24">
        <div className="max-w-7xl mx-auto columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6">
           {GALLERY_ITEMS.map((item, i) => (
             <motion.div 
               key={i}
               initial={{ opacity: 0, y: 20 }}
               whileInView={{ opacity: 1, y: 0 }}
               transition={{ delay: i * 0.05 }}
               className="group relative overflow-hidden rounded-[2rem] break-inside-avoid bg-brand-surface border border-white/5"
             >
                <SafeImage src={item.url} alt={item.title} className="w-full group-hover:scale-105 transition-transform duration-700" />
                <div className="absolute inset-0 bg-gradient-to-t from-brand-bg via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity p-8 flex flex-col justify-end">
                   <p className="text-[10px] uppercase font-bold tracking-widest text-brand-primary mb-2">{item.category}</p>
                   <p className="text-white text-xl font-bold">{item.title}</p>
                </div>
             </motion.div>
           ))}
        </div>
      </section>
    </div>
  );
}
