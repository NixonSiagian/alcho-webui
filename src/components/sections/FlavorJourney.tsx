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

const STAGES = [
  {
    title: "Source",
    description: "Our flavor journey starts at the origin. We source the finest spices across the archipelago, from Lampung peppercorns to Padang cinnamon.",
    image: IMG.product,
    color: "#C99A2E"
  },
  {
    title: "Milling",
    description: "Preserving the soul of the spice. Advanced cryogenic milling locks in the aromatherapy and essential oils of our raw ingredients.",
    image: IMG.factory,
    color: "#A65A2A"
  },
  {
    title: "Blending",
    description: "Scientific precision in every batch. Our laboratory-controlled environment ensures zero variance in your proprietary flavor profiles.",
    image: IMG.lab,
    color: "#3F5F3A"
  },
  {
    title: "Culinary",
    description: "From our production lines to the world's most demanding professional kitchens and industrial food manufacturers.",
    image: IMG.chef,
    color: "#C99A2E"
  },
  {
    title: "Taste",
    description: "The final proof of excellence. Consistent, deep, and authentically Indonesian flavor systems that define market leaders.",
    image: IMG.hero,
    color: "#A65A2A"
  }
];

export default function FlavorJourney() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Disable horizontal scroll on mobile
    const isMobile = window.innerWidth < 1024;
    if (isMobile) return;

    const pin = gsap.fromTo(
      sectionRef.current,
      { translateX: 0 },
      {
        translateX: `-${100 * (STAGES.length - 1)}vw`,
        ease: "none",
        duration: 1,
        scrollTrigger: {
          trigger: triggerRef.current,
          start: "top top",
          end: () => `+=${triggerRef.current?.offsetWidth}`,
          scrub: 1,
          pin: true,
          snap: 1 / (STAGES.length - 1),
        }
      }
    );

    return () => {
      pin.kill();
    };
  }, []);

  return (
    <section className="bg-brand-bg overflow-hidden">
      <div ref={triggerRef} className="lg:h-screen lg:w-[500vw]">
        <div ref={sectionRef} className="flex flex-col lg:flex-row lg:h-screen">
          {STAGES.map((stage, i) => (
            <div 
              key={i} 
              className="w-full lg:w-screen h-[80vh] lg:h-screen flex-shrink-0 relative overflow-hidden flex items-center"
              style={{ backgroundColor: stage.color + "11" }}
            >
              {/* Background Plate */}
              <div className="absolute inset-0 z-0">
                 <img src={stage.image} alt={stage.title} className="w-full h-full object-cover opacity-20" />
                 <div className="absolute inset-0 bg-gradient-to-r from-brand-bg via-transparent to-brand-bg opacity-80" />
              </div>

              <div className="relative z-10 h-full max-w-7xl mx-auto px-6 flex items-center">
                 <div className="max-w-2xl">
                    <motion.div
                      initial={{ opacity: 0, x: -50 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.8 }}
                      className="flex items-center gap-4 mb-8"
                    >
                       <span className="text-brand-primary text-2xl font-serif">0{i + 1}</span>
                       <div className="h-[1px] w-12 bg-brand-primary/30" />
                       <span className="text-brand-text-secondary uppercase tracking-[0.4em] text-xs font-bold font-sans">The Flavor Phase</span>
                    </motion.div>
                    
                    <motion.h2 
                       initial={{ opacity: 0, y: 30 }}
                       whileInView={{ opacity: 1, y: 0 }}
                       transition={{ duration: 1 }}
                       className="text-brand-text text-6xl md:text-9xl mb-8 leading-none"
                    >
                      {stage.title}
                    </motion.h2>
                    
                    <motion.p 
                       initial={{ opacity: 0 }}
                       whileInView={{ opacity: 1 }}
                       transition={{ duration: 1, delay: 0.3 }}
                       className="text-2xl text-brand-text-secondary leading-relaxed mb-12"
                    >
                      {stage.description}
                    </motion.p>

                    <div className="w-24 h-1 bg-brand-primary" />
                 </div>

                 {/* Visual Accent */}
                 <div className="absolute right-0 top-1/2 -translate-y-1/2 w-1/3 aspect-square hidden lg:block opacity-40">
                    <div className="w-full h-full rounded-full border border-brand-primary/20 animate-[spin_20s_linear_infinite]" 
                         style={{ boxShadow: `inset 0 0 100px ${stage.color}44` }} />
                 </div>
              </div>

              {/* Stage Counter */}
              <div className="absolute bottom-12 right-12 flex items-center gap-4">
                 {[...Array(STAGES.length)].map((_, idx) => (
                    <div 
                      key={idx}
                      className={`h-1 transition-all duration-500 rounded-full ${idx === i ? 'w-12 bg-brand-primary' : 'w-4 bg-brand-border-strong'}`}
                    />
                 ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
