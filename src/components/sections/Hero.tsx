/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion, useScroll, useTransform } from 'motion/react';
import { useRef } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { AlchoLogo } from '../common/AlchoLogo';
import { IMG } from '../../assets/images';

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start'],
  });

  const textY = useTransform(scrollYProgress, [0, 1], [0, 220]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], [1.05, 1.18]);

  return (
    <section ref={containerRef} id="home" className="relative h-[150vh] bg-brand-bg">
      {/* Sticky Hero Container */}
      <div className="sticky top-0 h-screen w-full overflow-hidden">

        {/* Layer 1: Premium product hero shot with a clean cream wash */}
        <motion.div style={{ scale }} className="absolute inset-0 z-0">
          <img
            src={IMG.hero}
            alt="Alcho premium seasoning, studio product shot"
            className="w-full h-full object-cover"
          />
          {/* Warm cream veil keeps the studio shot legible behind the type */}
          <div className="absolute inset-0 bg-brand-bg/50 z-10" />
          <div className="absolute inset-0 bg-gradient-to-b from-brand-bg/70 via-brand-bg/35 to-brand-bg z-10" />
        </motion.div>

        {/* Layer 2: Main Content */}
        <div className="relative h-full flex flex-col items-center justify-center z-30 px-6 text-center">
          <motion.div style={{ y: textY, opacity }} className="max-w-5xl">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1 }}
              className="mb-8 flex justify-center"
            >
              {/* Logo rendered from its original asset — no filters or tint applied */}
              <AlchoLogo className="h-24 md:h-36" />
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.2, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
              className="text-brand-text mb-8 leading-[0.9] text-5xl md:text-8xl lg:text-9xl tracking-tight"
            >
              Every Great Dish <br />
              <span className="italic text-brand-secondary font-serif">Starts With Great Seasoning.</span>
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
              <Link to="/products" className="btn-primary px-10 py-5 text-lg flex items-center gap-2 w-full sm:w-auto justify-center group">
                Explore Products
                <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link to="/recipes" className="btn-secondary px-10 py-5 text-lg w-full sm:w-auto text-center">
                View Recipes
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
