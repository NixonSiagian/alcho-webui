/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { motion } from 'motion/react';
import { SafeImage } from '../components/common/SafeImage';
import { IMG } from '../assets/images';

const GALLERY_ITEMS = [
  { url: IMG.product, title: "Signature Seasoning", category: "Product" },
  { url: IMG.factory, title: "Manufacturing Line", category: "Production" },
  { url: IMG.lab, title: "Flavor Laboratory", category: "Quality" },
  { url: IMG.chef, title: "Chef Application", category: "Culinary" },
  { url: IMG.hero, title: "Studio Product Shot", category: "Product" },
  { url: IMG.factory, title: "Industrial Capacity", category: "Logistics" },
  { url: IMG.lab, title: "Quality Control", category: "Quality" },
  { url: IMG.chef, title: "Plated Excellence", category: "Culinary" }
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
               className="group relative overflow-hidden rounded-[2rem] break-inside-avoid bg-brand-surface border border-brand-border"
             >
                <SafeImage src={item.url} alt={item.title} className="w-full group-hover:scale-105 transition-transform duration-700" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity p-8 flex flex-col justify-end">
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
