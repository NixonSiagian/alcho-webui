/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useRef, useEffect } from 'react';
import { motion } from 'motion/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { IMG } from '../../assets/images';

gsap.registerPlugin(ScrollTrigger);

const SCENES = [
  {
    title: "Spice Screening",
    description: "Multi-stage screening ensures that only the purest particulates pass through, maintaining the high standard of Alcho's raw ingredients.",
    image: IMG.lab
  },
  {
    title: "Flavor Locking",
    description: "Our state-of-the-art milling systems ground spices at ultra-low temperatures, locking in the aromatic intensity required for industrial-scale consistency.",
    image: IMG.factory
  },
  {
    title: "Batch Master",
    description: "Large-scale blending units ensure that every kilogram of seasoning provides the exact same flavor profile, batch after batch, year after year.",
    image: IMG.product
  }
];

export default function ProductionJourney() {
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <section ref={containerRef} className="relative bg-brand-bg">
      <div className="max-w-7xl mx-auto px-6 pt-32 pb-12">
          <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              className="flex items-center gap-4 mb-8"
          >
              <div className="h-[1px] w-12 bg-brand-primary" />
              <span className="text-brand-primary text-xs font-bold tracking-[0.4em] uppercase">Industrial Heritage</span>
          </motion.div>
          <h2 className="text-brand-text text-5xl md:text-8xl mb-24">Our <span className="italic text-brand-primary">Process.</span></h2>
      </div>

      <div className="space-y-[5vh] pb-[24vh]">
          {SCENES.map((scene, i) => (
             <SceneBlock key={i} scene={scene} index={i} />
          ))}
      </div>
    </section>
  );
}

function SceneBlock({ scene, index }: { scene: any, index: number }) {
  const blockRef = useRef<HTMLDivElement>(null);
  
  return (
    <div ref={blockRef} className="relative py-24 flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0 opacity-20">
           <img src={scene.image} alt={scene.title} className="w-full h-full object-cover grayscale" />
           <div className="absolute inset-0 bg-gradient-to-b from-brand-bg via-transparent to-brand-bg" />
        </div>

        <motion.div
           initial={{ opacity: 0, y: 50 }}
           whileInView={{ opacity: 1, y: 0 }}
           transition={{ duration: 1 }}
           className="relative z-20 max-w-4xl px-6 text-center"
        >
           <span className="text-brand-primary font-serif text-3xl md:text-5xl mb-12 block">Step {index + 1}</span>
           <h3 className="text-brand-text text-5xl md:text-8xl mb-8">{scene.title}</h3>
           <p className="text-2xl text-brand-text-secondary leading-relaxed max-w-2xl mx-auto">
             {scene.description}
           </p>
        </motion.div>

        {/* Ambient numbers in background */}
        <div className="absolute -bottom-20 -right-20 text-[20rem] font-serif font-black text-brand-text/10 pointer-events-none select-none">
           0{index + 1}
        </div>
    </div>
  );
}
