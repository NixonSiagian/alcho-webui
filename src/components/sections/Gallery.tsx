/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion } from 'motion/react';
import { Camera, Factory, Droplets, FlaskConical, Truck, Users } from 'lucide-react';
import { SafeImage } from '../common/SafeImage';

const GALLERY_ITEMS = [
  { 
    title: 'Precision Blending', 
    category: 'Production', 
    icon: Factory,
    image: 'https://images.unsplash.com/photo-1596040033229-a9821ebd058d?q=80&w=2000&auto=format&fit=crop'
  },
  { 
    title: 'Extraction Lab', 
    category: 'R&D', 
    icon: FlaskConical,
    image: 'https://images.unsplash.com/photo-1532187875605-2fe358a3d46a?q=80&w=2000&auto=format&fit=crop'
  },
  { 
    title: 'Sensory Testing', 
    category: 'Quality', 
    icon: Droplets,
    image: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?q=80&w=2000&auto=format&fit=crop'
  },
  { 
    title: 'Partner Network', 
    category: 'B2B', 
    icon: Users,
    image: 'https://images.unsplash.com/photo-1557426272-fc759fbb7a8d?q=80&w=2000&auto=format&fit=crop'
  },
  { 
    title: 'Global Export', 
    category: 'Logistics', 
    icon: Truck,
    image: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?q=80&w=2000&auto=format&fit=crop'
  }
];

export default function Gallery() {
  const HeroIcon = GALLERY_ITEMS[0].icon;

  return (
    <section id="gallery" className="py-32 lg:py-48 bg-brand-dark/20 selection:bg-brand-yellow selection:text-brand-maroon">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col lg:flex-row justify-between items-end gap-12 mb-24">
          <div className="max-w-3xl">
            <motion.span 
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              className="text-brand-yellow text-xs uppercase font-black tracking-[0.6em] mb-8 block"
            >
              VISUAL CAPABILITIES
            </motion.span>
            <h2 className="text-white text-5xl lg:text-8xl font-serif font-black mb-0 leading-none">
              Production <br />
              <span className="italic text-brand-yellow">Journey.</span>
            </h2>
          </div>
          <div className="text-right">
             <Camera className="text-brand-yellow ml-auto mb-8" size={48} />
             <p className="text-gray-500 text-[10px] uppercase font-black tracking-widest max-w-[240px] leading-relaxed">
               A behind-the-scenes look at our 24/7 industrial manufacturing facility in Tangerang.
             </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-6 h-[1000px] lg:h-[700px]">
          {/* Main Hero Card */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            className="lg:col-span-3 lg:row-span-2 group relative rounded-3xl overflow-hidden border border-white/5"
          >
            <SafeImage 
              src={GALLERY_ITEMS[0].image} 
              alt={GALLERY_ITEMS[0].title}
              className="group-hover:scale-105 transition-transform duration-1000"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-brand-maroon via-brand-maroon/20 to-transparent opacity-80" />
            <div className="absolute bottom-12 left-12">
               <HeroIcon className="text-brand-yellow mb-6" size={40} />
               <span className="text-[10px] uppercase font-black tracking-widest text-brand-yellow/70 block mb-2">{GALLERY_ITEMS[0].category}</span>
               <h3 className="text-white text-4xl font-serif font-black">{GALLERY_ITEMS[0].title}</h3>
            </div>
          </motion.div>

          {/* Grid Cards */}
          <div className="lg:col-span-3 grid grid-cols-1 md:grid-cols-2 gap-6">
            {GALLERY_ITEMS.slice(1, 3).map((item, i) => (
              <motion.div 
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className="group relative h-[340px] rounded-3xl overflow-hidden border border-white/5"
              >
                <SafeImage src={item.image} alt={item.title} className="group-hover:scale-110 transition-transform duration-1000" />
                <div className="absolute inset-0 bg-gradient-to-t from-brand-dark/90 via-transparent to-transparent opacity-90" />
                <div className="absolute bottom-8 left-8">
                  <span className="text-[9px] uppercase font-black tracking-widest text-brand-yellow/60 block mb-1">{item.category}</span>
                  <h4 className="text-white font-serif font-black text-xl">{item.title}</h4>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="lg:col-span-3 grid grid-cols-1 md:grid-cols-2 gap-6">
            {GALLERY_ITEMS.slice(3, 5).map((item, i) => (
              <motion.div 
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className="group relative h-[340px] rounded-3xl overflow-hidden border border-white/5"
              >
                <SafeImage src={item.image} alt={item.title} className="group-hover:scale-110 transition-transform duration-1000" />
                <div className="absolute inset-0 bg-gradient-to-t from-brand-dark/90 via-transparent to-transparent opacity-90" />
                <div className="absolute bottom-8 left-8">
                  <span className="text-[9px] uppercase font-black tracking-widest text-brand-yellow/60 block mb-1">{item.category}</span>
                  <h4 className="text-white font-serif font-black text-xl">{item.title}</h4>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          className="mt-24 p-12 border-y border-white/5 flex flex-wrap justify-between items-center gap-12"
        >
          <div className="flex items-center gap-8">
             <div className="h-[1px] w-12 bg-brand-yellow" />
             <p className="text-white font-serif font-black text-2xl">Partner Network Highlights</p>
          </div>
          <div className="flex flex-wrap gap-12">
            {["Hotel Chains", "Snack Brands", "Cloud Kitchens", "Distributors"].map(item => (
              <div key={item} className="text-[10px] uppercase font-black tracking-[0.4em] text-gray-600 flex items-center gap-3">
                 <div className="w-1.5 h-1.5 bg-brand-yellow rounded-full" />
                 {item}
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
