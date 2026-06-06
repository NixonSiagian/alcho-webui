/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, ChefHat, Timer, Flame, ArrowRight, Zap } from 'lucide-react';
import { cn } from '../../lib/utils';
import { SafeImage } from '../common/SafeImage';
import { Link } from 'react-router-dom';
import { IMG } from '../../assets/images';

const RECIPES = [
  {
    id: "rendang",
    name: "Classic Rendang",
    description: "The crown jewel of Indonesian cuisine. A rich, dark, and intensely flavored slow-cooked beef curry, powered by Alcho's Beef Powder BS-003.",
    image: IMG.chef,
    stats: { time: "4.5h", difficulty: "High", heat: "Medium" },
    secret: "Alcho Beef Powder BS-003 provides the foundational umami that anchors the rich coconut and spice reduction without requiring massive labor hours.",
    product: "Alcho Beef Powder BS-003"
  },
  {
    id: "bakso",
    name: "Indonesian Bakso",
    description: "Springy meatballs in a crystal clear, savory beef broth. Alcho's Bumbu Kuah Bakso BS-010 delivers the deep umami notes of slow-boiled marrow.",
    image: IMG.product,
    stats: { time: "30m", difficulty: "Easy", heat: "Low" },
    secret: "The perfect ratio of garlic and roasted beef notes in BS-010 allows for a clear but intensely flavorful broth that stays consistent all day.",
    product: "Alcho Bumbu Kuah Bakso BS-010"
  },
  {
    id: "ayam-goreng",
    name: "Ayam Goreng Kremes",
    description: "Traditional Indonesian fried chicken with signature crispy bits. Alcho Tepung Kremes BS-006 ensures that perfect crunch every time.",
    image: IMG.hero,
    stats: { time: "45m", difficulty: "Medium", heat: "Low" },
    secret: "Our BS-006 formula is engineered for high stability in high-temperature frying, maintaining texture even when held in warmers for Horeca service.",
    product: "Alcho Tepung Kremes BS-006"
  },
  {
    id: "soto-lamongan",
    name: "Soto Lamongan",
    description: "A bright, savory chicken soup. Alcho Bumbu Kaldu Ayam BS-014 captures the fresh aromatic profile of a traditional Soto.",
    image: IMG.chef,
    stats: { time: "1h", difficulty: "Medium", heat: "Low" },
    secret: "BS-014 preserves the vibrant aromatics and citrusy notes that define high-quality Soto, reducing the need for expensive fresh herbs in production.",
    product: "Alcho Bumbu Kaldu Ayam BS-014"
  }
];

export default function RecipeCenter() {
  const [selected, setSelected] = useState<typeof RECIPES[0] | null>(null);

  return (
    <section id="recipes" className="py-24 lg:py-48 bg-brand-bg relative selection:bg-brand-primary selection:text-brand-text">
      <div className="max-w-7xl mx-auto px-6">
        <div className="mb-24 text-center">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              className="flex justify-center items-center gap-4 mb-8"
            >
              <div className="h-[1px] w-12 bg-brand-primary" />
              <span className="text-brand-primary text-xs font-bold tracking-[0.4em] uppercase">Culinary R&D</span>
            </motion.div>
            <h2 className="text-brand-text text-5xl md:text-8xl mb-8 leading-tight uppercase font-black">Recipe <br /><span className="italic text-brand-primary lowercase font-serif">benchmarks.</span></h2>
            <p className="text-xl text-brand-text-secondary max-w-2xl mx-auto">
              Our seasoning systems are the foundation for consistent, high-scale Indonesian cuisine. Reduced complexity, maximized flavor.
            </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {RECIPES.map((recipe, i) => (
              <motion.div
                key={recipe.id}
                layoutId={`recipe-${recipe.id}`}
                onClick={() => setSelected(recipe)}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className="group relative h-[500px] rounded-[3rem] overflow-hidden cursor-pointer bg-brand-surface border border-brand-border"
              >
                 <SafeImage src={recipe.image} alt={recipe.name} className="absolute inset-0 w-full h-full flex-shrink-0 group-hover:scale-110 transition-transform duration-1000" />
                 <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent z-10" />
                 
                 <div className="absolute bottom-10 left-10 right-10 z-20">
                    <div className="flex items-center gap-4 mb-4">
                       <span className="px-3 py-1 bg-brand-primary text-brand-text text-[10px] font-bold rounded-full uppercase tracking-widest">{recipe.stats.difficulty}</span>
                       <span className="text-white/70 text-[10px] uppercase font-bold tracking-widest flex items-center gap-2"><Timer size={12}/> {recipe.stats.time}</span>
                    </div>
                    <h3 className="text-white text-3xl mb-4 group-hover:text-brand-primary transition-colors">{recipe.name}</h3>
                    
                    <div className="flex items-center gap-4 text-brand-primary text-xs font-bold uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-all translate-y-4 group-hover:translate-y-0">
                       View Secrets <ArrowRight size={16} />
                    </div>
                 </div>
              </motion.div>
            ))}
        </div>
      </div>

      {/* Expanded Modal */}
      <AnimatePresence>
        {selected && (
          <div className="fixed inset-0 z-[200] flex items-center justify-center p-6 sm:p-12">
             <motion.div 
               initial={{ opacity: 0 }}
               animate={{ opacity: 1 }}
               exit={{ opacity: 0 }}
               onClick={() => setSelected(null)}
               className="absolute inset-0 bg-brand-bg/95 backdrop-blur-3xl" 
             />
             
             <motion.div
               layoutId={`recipe-${selected.id}`}
               className="relative w-full max-w-6xl bg-brand-card rounded-[4rem] border border-brand-border-strong overflow-hidden shadow-2xl flex flex-col lg:flex-row h-full max-h-[90vh] z-10"
             >
                <div className="lg:w-1/2 relative h-64 lg:h-full">
                   <SafeImage src={selected.image} alt={selected.name} className="absolute inset-0 w-full h-full" />
                   <div className="absolute inset-0 bg-gradient-to-r from-transparent via-transparent to-brand-card z-10 hidden lg:block" />
                </div>
                
                <div className="lg:w-1/2 p-10 lg:p-16 overflow-y-auto relative z-20">
                    <button 
                      onClick={() => setSelected(null)}
                      className="absolute top-8 right-8 w-12 h-12 rounded-full bg-brand-fill border border-brand-border-strong flex items-center justify-center text-brand-text hover:bg-brand-primary hover:text-brand-text transition-all"
                    >
                      <X size={24} />
                    </button>

                    <span className="text-brand-primary text-xs font-bold tracking-[0.4em] uppercase mb-8 block">Industrial Formula Benchmark</span>
                    <h2 className="text-brand-text text-5xl mb-10 leading-tight uppercase font-black">{selected.name}</h2>
                    
                    <div className="grid grid-cols-2 gap-8 mb-12">
                       <div className="space-y-2">
                          <p className="text-[10px] text-brand-text-secondary uppercase font-bold tracking-widest">Typical Prep</p>
                          <div className="flex items-center gap-3 text-brand-text font-bold"><Timer size={18} className="text-brand-primary"/> {selected.stats.time}</div>
                       </div>
                       <div className="space-y-2">
                          <p className="text-[10px] text-brand-text-secondary uppercase font-bold tracking-widest">Skill Requirement</p>
                          <div className="flex items-center gap-3 text-brand-text font-bold"><ChefHat size={18} className="text-brand-primary"/> {selected.stats.difficulty}</div>
                       </div>
                    </div>

                    <div className="space-y-12">
                       <div>
                          <h4 className="text-brand-text text-lg font-bold mb-4 flex items-center gap-3">
                             <div className="w-2 h-2 rounded-full bg-brand-primary" />
                             Flavor Profile
                          </h4>
                          <p className="text-brand-text-secondary leading-relaxed text-lg">{selected.description}</p>
                       </div>

                       <div className="p-8 bg-brand-fill border-l-4 border-l-brand-primary rounded-2xl space-y-4">
                          <div className="flex items-center gap-3 text-brand-primary">
                             <Zap size={18} />
                             <span className="text-[10px] font-bold uppercase tracking-widest">The Consistency Secret</span>
                          </div>
                          <p className="text-brand-text leading-relaxed italic text-lg opacity-90">"{selected.secret}"</p>
                          <div className="pt-4 border-t border-brand-border">
                             <p className="text-[10px] text-brand-text-secondary uppercase mb-2">Utilized Industrial SKU</p>
                             <Link to="/products" className="text-brand-primary font-bold flex items-center gap-2 hover:underline">
                                {selected.product} <ArrowRight size={14} />
                             </Link>
                          </div>
                       </div>
                    </div>
                </div>
             </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
