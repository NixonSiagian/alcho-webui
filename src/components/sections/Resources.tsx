/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion } from 'motion/react';
import { Download, FileText, BookOpen, Presentation, ChevronRight } from 'lucide-react';

const RESOURCES = [
  { 
    title: 'Technical Catalog 2024', 
    type: 'PDF / 4.2MB', 
    icon: BookOpen,
    desc: 'Complete overview of all Alcho seasoning profiles and SKU data.'
  },
  { 
    title: 'Horeca Application Guide', 
    type: 'PDF / 8.5MB', 
    icon: Presentation,
    desc: 'Best practices for high-volume seasoning usage in professional kitchens.'
  },
  { 
    title: 'MUI & ISO Certifications', 
    type: 'ZIP / 1.2MB', 
    icon: FileText,
    desc: 'Download our latest quality assurance and Halal compliance dossiers.'
  },
  { 
    title: 'Private Label Prospectus', 
    type: 'PDF / 3.1MB', 
    icon: BookOpen,
    desc: 'Infrastructure capabilities and MOQ information for OEM partners.'
  }
];

export default function Resources() {
  return (
    <section id="resources" className="py-32 lg:py-48 bg-brand-dark selection:bg-brand-yellow selection:text-brand-maroon">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col lg:flex-row justify-between items-end gap-12 mb-24">
          <div className="max-w-3xl">
            <motion.span 
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              className="text-brand-yellow text-xs uppercase font-black tracking-[0.6em] mb-8 block"
            >
              TECHNICAL REPOSITORY
            </motion.span>
            <h2 className="text-white text-5xl lg:text-8xl font-serif font-black mb-0 leading-none">
              Resource <br />
              <span className="italic text-brand-yellow">Center.</span>
            </h2>
          </div>
          <p className="text-gray-500 text-xs uppercase font-black tracking-widest max-w-[240px] leading-relaxed text-right">
            Access secure technical documentation and brand assets for our global partners.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-24">
           {RESOURCES.map((res, i) => (
             <motion.div 
               key={res.title}
               initial={{ opacity: 0, y: 20 }}
               whileInView={{ opacity: 1, y: 0 }}
               transition={{ delay: i * 0.1 }}
               className="group p-10 bg-white/5 border border-white/5 rounded-[2rem] hover:border-brand-yellow/30 transition-all duration-700 flex flex-col sm:flex-row items-start gap-10"
             >
                <div className="w-20 h-20 bg-brand-yellow/5 rounded-2xl flex items-center justify-center text-brand-yellow flex-shrink-0 group-hover:bg-brand-yellow group-hover:text-brand-maroon transition-all duration-500">
                   <res.icon size={32} />
                </div>
                <div className="flex-1">
                   <div className="flex items-center justify-between mb-4">
                      <span className="text-[9px] uppercase font-black tracking-widest text-brand-yellow/60">{res.type}</span>
                      <Download size={18} className="text-gray-600 group-hover:text-brand-yellow transition-colors" />
                   </div>
                   <h3 className="text-white text-2xl font-serif font-black mb-4">{res.title}</h3>
                   <p className="text-gray-500 text-sm leading-relaxed mb-8">{res.desc}</p>
                   <button className="flex items-center gap-3 text-white text-[10px] uppercase font-black tracking-[0.4em] hover:gap-6 transition-all">
                      Download File <ChevronRight size={14} className="text-brand-yellow" />
                   </button>
                </div>
             </motion.div>
           ))}
        </div>

        <div className="bg-brand-yellow p-12 lg:p-20 rounded-[3rem] text-brand-maroon flex flex-col md:flex-row items-center justify-between gap-12">
            <div className="max-w-xl text-center md:text-left">
               <h3 className="text-4xl font-serif font-black mb-6">Need printed copies?</h3>
               <p className="font-bold leading-relaxed">Our regional sales representatives can provide high-quality physical brochures and product swatches for your procurement team.</p>
            </div>
            <button className="px-12 py-7 bg-brand-maroon text-white rounded-sm font-serif font-black uppercase tracking-widest text-sm hover:translate-y-[-4px] transition-all shadow-2xl">
               Request Physical Kits
            </button>
        </div>
      </div>
    </section>
  );
}
