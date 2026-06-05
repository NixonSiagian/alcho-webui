/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion, useScroll, useTransform } from 'motion/react';
import { useRef, useEffect } from 'react';
import { ArrowRight } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { AlchoLogo } from '../common/AlchoLogo';

gsap.registerPlugin(ScrollTrigger);

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  const textY = useTransform(scrollYProgress, [0, 1], [0, 300]);
  const opacity = useTransform(scrollYProgress, [0, 0.4], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], [1.05, 1.3]);

  useEffect(() => {
    if (!containerRef.current) return;

    const ctx = gsap.context(() => {
      // Parallax Layers
      gsap.to(".food-layer", {
        y: -150,
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          scrub: 1,
        }
      });
      gsap.to(".spice-layer-fast", {
        y: -400,
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          scrub: 1.5,
        }
      });
      gsap.to(".spice-layer-slow", {
        y: -100,
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          scrub: 0.5,
        }
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} id="home" className="relative h-[150vh] bg-brand-bg">
      {/* Sticky Hero Container */}
      <div className="sticky top-0 h-screen w-full overflow-hidden">
        
        {/* Layer 1: Background Cinematic Food */}
        <motion.div style={{ scale }} className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-black/60 z-10" />
          <div className="absolute inset-0 bg-gradient-to-t from-brand-bg via-transparent to-black/40 z-10" />
          <img 
            src="/src/assets/images/alcho_seasoning_powder_1780645078244.png" 
            alt="Cinematic Seasoning" 
            className="w-full h-full object-cover brightness-[0.8]"
          />
        </motion.div>

        {/* Layer 2: Floating Spices (Back - Blurs) */}
        <div className="absolute inset-0 z-10 pointer-events-none hidden md:block">
           <div className="spice-layer-slow absolute top-[20%] left-[5%] w-32 h-32 blur-sm rotate-12 opacity-60">
              <img src="https://images.unsplash.com/photo-1549590143-d5855148a9d5?q=80&w=400&auto=format&fit=crop" alt="Spice" className="w-full h-full object-contain" />
           </div>
           <div className="spice-layer-slow absolute bottom-[20%] right-[10%] w-48 h-48 blur-md -rotate-45 opacity-40">
              <img src="https://images.unsplash.com/photo-1615484477778-ca3b77940c25?q=80&w=400&auto=format&fit=crop" alt="Chili" className="w-full h-full object-contain" />
           </div>
        </div>

        {/* Layer 3: Main Content */}
        <div className="relative h-full flex flex-col items-center justify-center z-30 px-6 text-center">
            <motion.div
              style={{ y: textY, opacity }}
              className="max-w-5xl"
            >
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1 }}
                className="mb-8 flex justify-center"
              >
                <AlchoLogo className="w-48 md:w-72 drop-shadow-[0_0_30px_rgba(255,179,71,0.3)]" />
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1.2, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
                className="text-white mb-8 leading-[0.9] text-5xl md:text-8xl lg:text-9xl tracking-tight"
              >
                Every Great Dish <br />
                <span className="italic text-brand-primary font-serif">Starts With Great Seasoning.</span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1, delay: 0.6 }}
                className="text-lg md:text-2xl text-brand-text-secondary max-w-2xl mx-auto leading-relaxed mb-12"
              >
                PT. NEW ALFA OMEGA UTAMA brings the authentic soul of Indonesian kitchens to the industrial scale.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.8 }}
                className="flex flex-col sm:flex-row items-center gap-6 justify-center"
              >
                <button className="btn-primary px-10 py-5 text-lg group w-full sm:w-auto">
                  Explore Products
                </button>
                <button className="px-10 py-5 rounded-xl font-bold text-lg text-white border border-white/20 hover:bg-white/5 transition-colors w-full sm:w-auto">
                  View Recipes
                </button>
              </motion.div>
            </motion.div>
        </div>

        {/* Layer 4: Foreground Elements (Sharp Spices & Smoke) */}
        <div className="absolute inset-0 z-40 pointer-events-none">
           <div className="spice-layer-fast absolute top-[10%] right-[15%] w-24 h-24 rotate-45 hidden lg:block">
              <img src="https://images.unsplash.com/photo-1532433226245-0d297a72d3f2?q=80&w=400&auto=format&fit=crop" alt="Spice" className="w-full h-full object-contain filter drop-shadow-2xl" />
           </div>
           <div className="spice-layer-fast absolute bottom-[10%] left-[10%] w-32 h-32 -rotate-12 hidden md:block">
              <img src="https://images.unsplash.com/photo-1549590143-d5855148a9d5?q=80&w=400&auto=format&fit=crop" alt="Pepper" className="w-full h-full object-contain filter drop-shadow-2xl" />
           </div>
           
           {/* Particles/Embers */}
           <div className="absolute inset-0 opacity-40">
              {[...Array(15)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute w-1 h-1 bg-brand-primary rounded-full"
                  initial={{ 
                    x: Math.random() * 100 + "%", 
                    y: "110%", 
                  }}
                  animate={{ 
                    y: "-10%", 
                    opacity: [0, 1, 0],
                  }}
                  transition={{ 
                    duration: 5 + Math.random() * 5, 
                    repeat: Infinity, 
                    delay: Math.random() * 5,
                    ease: "linear"
                  }}
                />
              ))}
           </div>
        </div>
      </div>
    </section>
  );
}
