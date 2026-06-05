/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { motion } from 'motion/react';

const STEPS = [
  { 
    title: "Sourcing", 
    desc: "Single-origin volcanic spices selected from elite boutique farms.",
    icon: "01",
    img: "https://images.unsplash.com/photo-1605634563901-fe6d8aebceba?q=80"
  },
  { 
    title: "Extraction", 
    desc: "Cold-press technology to preserve heat-sensitive aromatic compounds.",
    icon: "02",
    img: "https://images.unsplash.com/photo-1544025162-811114215b80?q=80"
  },
  { 
    title: "Formulation", 
    desc: "Bespoke blending in our ISO-certified Jakarta laboratory.",
    icon: "03",
    img: "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?q=80"
  },
  { 
    title: "Validation", 
    desc: "Multi-stage QA testing for solubility and flavor consistency.",
    icon: "04",
    img: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?q=80"
  }
];

export default function Journey() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;
    
    let ctx = gsap.context(() => {
      gsap.from(".journey-step", {
        opacity: 0,
        x: 50,
        stagger: 0.3,
        duration: 1.2,
        ease: "power4.out",
        scrollTrigger: {
          trigger: ".journey-container",
          start: "top 70%",
        }
      });
    }, containerRef);
    
    return () => ctx.revert();
  }, []);

  return (
    <section id="journey" className="relative py-40 bg-[#030303] z-10">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-24">
          <div className="max-w-xl">
            <span className="text-brand-gold text-[11px] uppercase tracking-[0.4em] font-bold block mb-6">Production Ethics</span>
            <h2 className="font-serif text-5xl md:text-7xl text-white mb-6 uppercase">
              THE <span className="lux-gradient-text italic">JOURNEY.</span>
            </h2>
          </div>
          <p className="text-gray-500 text-lg font-light max-w-sm">
            Total transparency from the soil to the sauce. Our production cycle is engineered for uncompromised purity.
          </p>
        </div>

        <div ref={containerRef} className="journey-container grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {STEPS.map((step) => (
            <div key={step.title} className="journey-step group">
              <div className="relative aspect-[3/4] mb-8 overflow-hidden rounded-sm grayscale group-hover:grayscale-0 transition-all duration-1000">
                <img 
                  src={step.img} 
                  alt={step.title} 
                  className="w-full h-full object-cover scale-105 group-hover:scale-100 transition-transform duration-1000"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1596040033229-a9821ebd058d?q=80';
                  }}
                />
                <div className="absolute top-6 left-6 w-10 h-10 rounded-full border border-white/20 bg-black/40 backdrop-blur-md flex items-center justify-center text-brand-gold font-serif text-sm font-bold">
                  {step.icon}
                </div>
              </div>
              <h4 className="text-white font-serif text-2xl font-bold mb-4 uppercase tracking-widest">{step.title}</h4>
              <p className="text-gray-500 text-xs leading-relaxed uppercase tracking-widest font-medium">
                {step.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
