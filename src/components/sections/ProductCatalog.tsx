/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Search, Filter, ArrowRight, Download, Info, Check, Package, ShieldCheck, ChevronLeft, X, UtensilsCrossed, Sparkles, ChefHat, LayoutGrid } from 'lucide-react';
import { PRODUCTS, CATEGORIES, Product } from '../../data/products';
import { cn } from '../../lib/utils';

const CATEGORY_META: Record<string, { desc: string; icon: any; color: string }> = {
  "Sauces & Bumbu Dasar": {
    desc: "Foundational wet bases and premium sauces for high-volume consistent cooking.",
    icon: UtensilsCrossed,
    color: "from-orange-500/20 to-brand-accent/20"
  },
  "Bouillon & Seasoning": {
    desc: "Industrial-grade bouillon powders and dry seasoning blends for intense umami depth.",
    icon: Sparkles,
    color: "from-brand-primary/20 to-yellow-500/20"
  },
  "Snack Seasoning": {
    desc: "Specially engineered coating powders with high adhesion and bold flavor release.",
    icon: ChefHat,
    color: "from-blue-500/20 to-purple-500/20"
  }
};

export default function ProductCatalog() {
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  const filteredProducts = useMemo(() => {
    if (searchQuery) {
      return PRODUCTS.filter(p => 
        p.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
        p.code.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.description?.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    if (activeCategory) {
      return PRODUCTS.filter(p => p.category === activeCategory);
    }
    return [];
  }, [activeCategory, searchQuery]);

  const showSearch = searchQuery.length > 0;
  const showCategoryResults = activeCategory !== null && !showSearch;
  const showLanding = !activeCategory && !showSearch;

  return (
    <section id="products" className="py-24 lg:py-40 bg-brand-bg text-brand-text">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Header Area */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-12 mb-20">
          <div className="max-w-3xl">
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              className="flex items-center gap-4 mb-6"
            >
              <div className="h-[1px] w-12 bg-brand-primary" />
              <span className="text-brand-primary text-xs font-bold tracking-[0.3em] uppercase">Enterprise Catalog</span>
            </motion.div>
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              className="text-brand-text mb-8"
            >
              Explore Our <span className="text-brand-primary">Seasoning Engine.</span>
            </motion.h2>
            <p className="text-lg max-w-xl">
              From foundational wet bases to advanced snack coatings, discover the technical specifications of our complete product lineup.
            </p>
          </div>

          <div className="relative w-full md:w-96 group">
            <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-brand-text-secondary group-focus-within:text-brand-primary transition-colors" size={20} />
            <input 
              type="text" 
              placeholder="Search products or SKUs..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-brand-surface border border-brand-border rounded-2xl py-5 pl-14 pr-6 focus:border-brand-primary/30 focus:bg-brand-card outline-none transition-all placeholder:text-brand-text-secondary/30 text-sm font-medium"
            />
            {searchQuery && (
              <button onClick={() => setSearchQuery('')} className="absolute right-5 top-1/2 -translate-y-1/2 text-brand-text-secondary hover:text-brand-text">
                <X size={16} />
              </button>
            )}
          </div>
        </div>

        {/* View Content */}
        <AnimatePresence mode="wait">
          {showLanding ? (
            <motion.div 
              key="landing"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            >
              {CATEGORIES.map((cat, i) => {
                const meta = CATEGORY_META[cat] || { desc: '', icon: LayoutGrid, color: 'from-gray-500/20' };
                return (
                  <button
                    key={cat}
                    onClick={() => setActiveCategory(cat)}
                    className="group text-left"
                  >
                    <div className="bg-brand-surface border border-brand-border rounded-[2.5rem] p-10 h-full flex flex-col transition-all duration-500 group-hover:border-brand-primary/30 group-hover:bg-brand-card relative overflow-hidden">
                      <div className={cn("absolute inset-0 bg-gradient-to-br opacity-0 group-hover:opacity-100 transition-opacity duration-700", meta.color)} />
                      <div className="relative z-10">
                        <div className="w-16 h-16 rounded-2xl bg-brand-bg flex items-center justify-center mb-8 border border-brand-border group-hover:scale-110 transition-transform duration-500">
                          <meta.icon className="text-brand-primary" size={28} />
                        </div>
                        <h3 className="text-2xl mb-4 group-hover:text-brand-primary transition-colors">{cat}</h3>
                        <p className="text-sm mb-12 flex-grow">{meta.desc}</p>
                        <div className="flex items-center gap-3 text-brand-primary text-xs font-bold tracking-widest uppercase mt-auto">
                          Browse Products <ArrowRight size={16} className="group-hover:translate-x-2 transition-transform" />
                        </div>
                      </div>
                    </div>
                  </button>
                );
              })}
            </motion.div>
          ) : (
            <motion.div 
              key="results"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <div className="flex items-center gap-6 mb-12">
                <button 
                  onClick={() => {setActiveCategory(null); setSearchQuery('');}}
                  className="flex items-center gap-2 text-brand-text-secondary hover:text-brand-primary transition-all text-xs font-bold uppercase tracking-widest"
                >
                  <ChevronLeft size={16} /> Back to Categories
                </button>
                <div className="h-4 w-[1px] bg-brand-border-strong" />
                <span className="text-xs uppercase font-bold tracking-widest text-brand-primary">
                  {showSearch ? `Search Results (${filteredProducts.length})` : activeCategory}
                </span>
              </div>

              {filteredProducts.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredProducts.map((p, i) => (
                    <motion.div
                      key={p.code}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.05 }}
                      onClick={() => setSelectedProduct(p)}
                      className="modern-card group cursor-pointer"
                    >
                      <div className="flex justify-between items-start mb-8">
                        <span className="font-mono text-[10px] bg-brand-fill px-2 py-1 rounded text-brand-primary border border-brand-border">
                          {p.code}
                        </span>
                        {p.halal && <ShieldCheck className="text-emerald-500/50" size={16} />}
                      </div>
                      <h4 className="text-brand-text text-xl font-serif font-bold mb-4 group-hover:text-brand-primary transition-colors">{p.name}</h4>
                      <p className="text-xs line-clamp-2 mb-10 leading-relaxed">{p.description}</p>
                      
                      <div className="flex items-center justify-between pt-6 border-t border-brand-border">
                        <span className="text-[10px] uppercase font-bold tracking-widest text-brand-text-secondary/50">Details & Specs</span>
                        <ArrowRight size={16} className="text-brand-primary opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
                      </div>
                    </motion.div>
                  ))}
                </div>
              ) : (
                <div className="py-24 text-center">
                  <Search size={48} className="mx-auto text-brand-text/10 mb-8" />
                  <h3 className="text-xl mb-4">No industrial profiles matched your query.</h3>
                  <button onClick={() => setSearchQuery('')} className="text-brand-primary font-bold hover:underline">Clear search filters</button>
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Global Catalog CTA */}
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="mt-32 p-12 lg:p-20 bg-brand-surface border border-brand-border rounded-[3rem] relative overflow-hidden"
        >
          <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-12">
            <div className="max-w-2xl text-center lg:text-left">
              <Package className="text-brand-primary mb-8 mx-auto lg:mx-0" size={48} />
              <h3 className="text-3xl md:text-4xl mb-6">Commercial Bulk <br /><span className="text-brand-primary italic">Documentation Hub.</span></h3>
              <p className="text-lg">Need full technical dossiers for auditing or procurement? Access our complete technical library including MSDS and PDS for every SKU.</p>
            </div>
            <div className="flex flex-col gap-4 w-full lg:w-auto">
              <button className="btn-primary flex items-center justify-center gap-4">
                <Download size={20} /> Download Technical Catalog
              </button>
              <button className="btn-secondary flex items-center justify-center gap-4">
                Request Custom Sample Kit
              </button>
            </div>
          </div>
          <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-brand-primary/5 rounded-full blur-[100px]" />
        </motion.div>

        {/* Fullscreen Product Modal */}
        <AnimatePresence>
          {selectedProduct && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-[500] bg-brand-bg/98 backdrop-blur-md flex items-center justify-center overflow-y-auto p-4 md:p-8"
              onClick={() => setSelectedProduct(null)}
            >
              <motion.div 
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 20 }}
                className="w-full max-w-6xl bg-brand-surface border border-brand-border-strong rounded-[3rem] shadow-2xl relative flex flex-col lg:flex-row overflow-hidden max-h-[90vh]"
                onClick={(e) => e.stopPropagation()}
              >
                <button 
                  onClick={() => setSelectedProduct(null)}
                  className="absolute top-8 right-8 z-50 p-4 bg-brand-bg/50 rounded-full text-brand-text hover:bg-brand-primary transition-all"
                >
                  <X size={24} />
                </button>

                <div className="lg:w-2/5 bg-brand-card p-12 border-r border-brand-border flex flex-col">
                  <div className="mb-12">
                    <span className="font-mono text-xs bg-brand-primary/10 text-brand-primary px-3 py-1.5 rounded border border-brand-primary/20 uppercase font-bold tracking-widest">
                       {selectedProduct.code}
                    </span>
                  </div>
                  
                  <h2 className="text-4xl md:text-5xl mb-8 leading-tight">{selectedProduct.name}</h2>
                  <div className="flex items-center gap-2 text-brand-primary mb-12">
                    <LayoutGrid size={16} />
                    <span className="text-xs font-bold uppercase tracking-[0.2em]">{selectedProduct.category}</span>
                  </div>

                  <p className="text-lg leading-relaxed text-brand-text-secondary italic mb-12">
                    "{selectedProduct.description}"
                  </p>

                  <div className="mt-auto pt-10 border-t border-brand-border">
                    <h5 className="text-[10px] uppercase font-bold tracking-[0.3em] text-brand-text-secondary/50 mb-6 font-mono">Standard Packaging SKUs</h5>
                    <div className="space-y-3">
                      {selectedProduct.sizes.map(size => (
                        <div key={size} className="flex items-center justify-between p-4 bg-brand-bg/50 border border-brand-border rounded-xl group hover:border-brand-primary/20 transition-all">
                          <span className="text-sm font-bold">{size}</span>
                          <Check size={14} className="text-brand-primary opacity-0 group-hover:opacity-100" />
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="lg:w-3/5 p-12 md:p-20 overflow-y-auto custom-scrollbar flex flex-col">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-20">
                    <div className="space-y-8">
                       <div>
                         <h5 className="text-[10px] uppercase font-bold tracking-[0.3em] text-brand-primary mb-4 font-mono">Application Areas</h5>
                         <ul className="space-y-4">
                           {["Industrial Processing", "HORECA Standard", "Export Grade"].map(app => (
                             <li key={app} className="flex items-center gap-3 text-sm text-brand-text-secondary">
                               <div className="w-1.5 h-1.5 rounded-full bg-brand-primary" />
                               {app}
                             </li>
                           ))}
                         </ul>
                       </div>
                       
                       <div className="p-8 bg-brand-bg/30 border border-brand-border rounded-2xl">
                          <h5 className="text-[10px] uppercase font-bold tracking-[0.3em] text-brand-text-secondary mb-4 font-mono">Storage Specifications</h5>
                          <p className="text-xs leading-relaxed">Keep in cool, dry conditions away from direct sunlight. Shelf life of 12 months under recommended storage.</p>
                       </div>
                    </div>

                    <div className="space-y-8">
                       <h5 className="text-[10px] uppercase font-bold tracking-[0.3em] text-emerald-500 mb-4 font-mono">Compliance Audit</h5>
                       <div className="p-8 rounded-2xl bg-emerald-500/5 border border-emerald-500/10 flex flex-col gap-6">
                          <div className="flex items-center gap-4">
                             <div className="w-12 h-12 bg-white flex items-center justify-center rounded-lg">
                                <ShieldCheck className="text-emerald-600" />
                             </div>
                             <div>
                                <span className="block text-xs font-bold text-brand-text">MUI Halal Certified</span>
                                <span className="block text-[9px] text-emerald-500 font-mono tracking-widest uppercase">Verified 2026</span>
                             </div>
                          </div>
                          <div className="flex items-center gap-4">
                             <div className="w-12 h-12 bg-white flex items-center justify-center rounded-lg">
                                <Check className="text-emerald-600" />
                             </div>
                             <div>
                                <span className="block text-xs font-bold text-brand-text">FSSC 22000</span>
                                <span className="block text-[9px] text-emerald-500 font-mono tracking-widest uppercase">Food Safety Standard</span>
                             </div>
                          </div>
                       </div>
                    </div>
                  </div>

                  <div className="mt-auto">
                    <div className="flex flex-col sm:flex-row gap-4 mb-8">
                      <button className="flex-1 btn-primary flex items-center justify-center gap-3">
                        <Download size={18} /> Technical Specs (PDF)
                      </button>
                      <button className="flex-1 btn-secondary flex items-center justify-center gap-3">
                        <ArrowRight size={18} /> Get Formal Quote
                      </button>
                    </div>
                    <p className="text-center text-[10px] text-brand-text-secondary/30 uppercase tracking-[0.3em] font-mono">
                      Logistical Support Available for Indonesia & Export Markets
                    </p>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}

