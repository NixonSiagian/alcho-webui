/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Search, ChevronRight, ShoppingBag, CheckCircle2, Download } from 'lucide-react';
import { PRODUCTS, CATEGORIES } from '../../data/products';
import { cn } from '../../lib/utils';
import { SafeImage } from '../common/SafeImage';
import { Link } from 'react-router-dom';
import { useResourceManifest, getPriceListDocument, downloadResource } from '../../lib/resources';

export default function FeaturedShowcase() {
  const [activeCategory, setActiveCategory] = useState<string>("All");
  const [searchQuery, setSearchQuery] = useState("");
  const { manifest } = useResourceManifest();
  const priceListDoc = getPriceListDocument(manifest);

  const filteredProducts = useMemo(() => {
    return PRODUCTS.filter(p => {
      const matchesCategory = activeCategory === "All" || p.category === activeCategory;
      const matchesSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                           p.code.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [activeCategory, searchQuery]);

  return (
    <section id="products" className="py-24 lg:py-48 bg-brand-bg relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <div className="mb-24 flex flex-col lg:flex-row lg:items-end justify-between gap-12">
            <div className="max-w-3xl">
                <motion.div 
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    className="flex items-center gap-4 mb-8"
                >
                    <div className="h-[1px] w-12 bg-brand-primary" />
                    <span className="text-brand-primary text-xs font-bold tracking-[0.4em] uppercase">Official Catalog</span>
                </motion.div>
                <h2 className="text-brand-text text-5xl md:text-8xl mb-8">Solution <span className="italic text-brand-primary">Systems.</span></h2>
                <p className="text-brand-text-secondary text-xl max-w-2xl leading-relaxed">
                  From traditional Indonesian sauces to high-stability snack seasonings, our portfolio is engineered for HORECA and food industry leaders.
                </p>
            </div>
        </div>

        {/* Filters & Search */}
        <div className="mb-16 space-y-8">
          <div className="flex flex-col md:flex-row gap-6 items-center justify-between border-b border-brand-border pb-8">
            {/* Search */}
            <div className="relative w-full md:w-96">
               <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-brand-text-secondary" size={20} />
               <input 
                 type="text" 
                 placeholder="Search by product name or code..."
                 value={searchQuery}
                 onChange={(e) => setSearchQuery(e.target.value)}
                 className="w-full bg-brand-surface/50 border border-brand-border rounded-2xl py-4 pl-12 pr-6 text-brand-text focus:outline-none focus:border-brand-primary/50 transition-colors"
               />
            </div>

            {/* Categories */}
            <div className="flex flex-wrap gap-3 justify-center">
               <button 
                 onClick={() => setActiveCategory("All")}
                 className={cn(
                   "px-6 py-3 rounded-full text-xs font-bold uppercase tracking-widest transition-all",
                   activeCategory === "All" ? "bg-brand-primary text-brand-text" : "bg-brand-fill text-brand-text-secondary hover:bg-brand-border-strong"
                 )}
               >
                 All Products
               </button>
               {CATEGORIES.map(cat => (
                 <button 
                    key={cat}
                    onClick={() => setActiveCategory(cat)}
                    className={cn(
                      "px-6 py-3 rounded-full text-xs font-bold uppercase tracking-widest transition-all",
                      activeCategory === cat ? "bg-brand-primary text-brand-text" : "bg-brand-fill text-brand-text-secondary hover:bg-brand-border-strong"
                    )}
                 >
                   {cat}
                 </button>
               ))}
            </div>
          </div>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <AnimatePresence mode="popLayout">
            {filteredProducts.map((product) => (
              <motion.div
                key={product.code}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className="group bg-brand-surface border border-brand-border rounded-[2.5rem] p-8 hover:border-brand-primary/30 transition-all duration-500 hover:-translate-y-2 flex flex-col h-full"
              >
                <div className="flex justify-between items-start mb-8">
                  <div className="space-y-1">
                    <span className="text-brand-primary font-mono text-xs tracking-widest">{product.code}</span>
                    <h3 className="text-brand-text text-2xl font-medium leading-tight group-hover:text-brand-primary transition-colors">{product.name}</h3>
                  </div>
                  <div className="p-3 bg-brand-primary/10 rounded-2xl text-brand-primary group-hover:scale-110 transition-transform">
                    <ShoppingBag size={20} />
                  </div>
                </div>

                <p className="text-brand-text-secondary text-sm leading-relaxed mb-8 flex-grow">
                  {product.description} Engineered for consistency and high stability in industrial applications.
                </p>

                <div className="space-y-4 pt-8 border-t border-brand-border">
                  <div className="flex flex-wrap gap-2 text-[10px] font-bold uppercase tracking-widest text-brand-text-secondary">
                    {product.sizes.map(size => (
                      <span key={size} className="px-3 py-1 bg-brand-fill rounded-md">{size}</span>
                    ))}
                  </div>
                  <div className="flex items-center gap-2 text-brand-accent text-[10px] font-bold uppercase tracking-widest">
                    <CheckCircle2 size={12} />
                    MUI HALAL CERTIFIED
                  </div>
                </div>

                <div className="mt-8 flex flex-col gap-3">
                  <button
                    type="button"
                    onClick={() => priceListDoc && downloadResource(priceListDoc, 'product_card')}
                    disabled={!priceListDoc}
                    aria-label={`Download price list for ${product.name}`}
                    className="w-full py-4 rounded-2xl bg-brand-primary text-brand-text font-bold text-xs uppercase tracking-widest hover:bg-brand-secondary hover:text-white transition-all flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed group/dl"
                  >
                    Download Price List
                    <Download size={16} className="group-hover/dl:translate-y-0.5 transition-transform" />
                  </button>
                  <Link
                    to={`/products/${product.code}`}
                    className="w-full py-4 rounded-2xl border border-brand-border-strong text-brand-text font-bold text-xs uppercase tracking-widest hover:bg-brand-fill transition-all flex items-center justify-center gap-2 group/btn"
                  >
                    Technical Docs
                    <ChevronRight size={16} className="group-hover/btn:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {filteredProducts.length === 0 && (
          <div className="text-center py-24">
             <p className="text-brand-text-secondary text-xl">No products matched your search across {activeCategory} category.</p>
          </div>
        )}
      </div>

      <div className="absolute top-0 right-0 w-full h-[1000px] bg-brand-primary/5 blur-[200px] pointer-events-none -translate-y-1/2" />
    </section>
  );
}
