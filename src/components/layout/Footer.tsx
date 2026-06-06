/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Link } from 'react-router-dom';
import { Instagram, Linkedin, MapPin, Phone, MessageSquare, Facebook, ArrowUp, Zap } from 'lucide-react';
import { cn } from '../../lib/utils';

import { AlchoLogo } from '../common/AlchoLogo';

const FOOTER_LINKS = {
  Products: [
    { name: 'Sauces & Marinades', href: '/products' },
    { name: 'Bouillon Systems', href: '/products' },
    { name: 'Snack Seasonings', href: '/products' },
    { name: 'Recipe Benchmarks', href: '/recipes' },
  ],
  Solutions: [
    { name: 'Horeca & Catering', href: '/horeca' },
    { name: 'Industrial OEM', href: '/oem' },
    { name: 'Distributor Network', href: '/distributor' },
  ],
  Company: [
    { name: 'Our Heritage', href: '/about' },
    { name: 'Flavor Gallery', href: '/gallery' },
    { name: 'Technical Resources', href: '/resources' },
    { name: 'Contact Inquiry', href: '/contact' },
  ]
};

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-brand-bg pt-24 pb-16 border-t border-brand-border relative z-10 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24 mb-24">
          
          <div className="lg:col-span-12 flex justify-center mb-16">
            <Link to="/" className="inline-block group text-center">
              <AlchoLogo className="w-48 mx-auto" />
              <p className="text-[10px] uppercase font-bold tracking-[0.3em] text-brand-primary mt-4">
                PT. NEW ALFA OMEGA UTAMA
              </p>
            </Link>
          </div>
          
          <div className="lg:col-span-5">
            <p className="text-brand-text-secondary text-lg leading-relaxed max-w-md mb-12">
              Since 2008, we have been the silent engine behind Indonesia's most iconic flavors. We deliver consistency, quality, and heritage in every gram.
            </p>
            
            <div className="space-y-6 text-brand-text-secondary text-sm">
               <div className="flex items-start gap-4">
                  <MapPin size={18} className="text-brand-primary shrink-0 mt-1" />
                  <p>Perm. Pondok Chandra Indah, Jl. Nanas / III 296 Waru - Sidoarjo, Indonesia</p>
               </div>
               <div className="flex items-center gap-4">
                  <Phone size={18} className="text-brand-primary shrink-0" />
                  <p>031 866 8858</p>
               </div>
               <div className="flex items-center gap-4">
                  <MessageSquare size={18} className="text-[#25D366] shrink-0" />
                  <p>0812 4918 6623 (WhatsApp)</p>
               </div>
            </div>
          </div>

          <div className="lg:col-span-7 grid grid-cols-2 md:grid-cols-3 gap-12">
            {Object.entries(FOOTER_LINKS).map(([title, links]) => (
              <div key={title}>
                <h4 className="text-brand-text text-[10px] uppercase tracking-[0.3em] font-bold mb-8 opacity-50">{title}</h4>
                <ul className="space-y-4">
                  {links.map((link) => (
                    <li key={link.name}>
                      <Link to={link.href} className="text-brand-text-secondary hover:text-brand-primary font-bold transition-all text-sm">
                        {link.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 p-10 bg-brand-surface rounded-[2.5rem] border border-brand-border mb-24">
          <div className="flex items-center gap-5">
            <div className="w-12 h-12 rounded-xl bg-brand-bg flex items-center justify-center text-brand-primary">
              <MapPin size={20} />
            </div>
            <div>
              <p className="text-[10px] uppercase font-bold tracking-widest text-brand-text-secondary opacity-50">HQ Base</p>
              <p className="text-brand-text text-xs font-bold leading-relaxed">Sidoarjo, Indonesia</p>
            </div>
          </div>
          <div className="flex items-center gap-5">
            <div className="w-12 h-12 rounded-xl bg-brand-bg flex items-center justify-center text-brand-primary">
              <Phone size={20} />
            </div>
            <div>
              <p className="text-[10px] uppercase font-bold tracking-widest text-brand-text-secondary opacity-50">Office</p>
              <p className="text-brand-text text-xs font-bold leading-relaxed">031 866 8858</p>
            </div>
          </div>
          <div className="flex items-center gap-5">
            <div className="w-12 h-12 rounded-xl bg-brand-bg flex items-center justify-center text-brand-primary">
              <MessageSquare size={20} />
            </div>
            <div>
              <p className="text-[10px] uppercase font-bold tracking-widest text-brand-text-secondary opacity-50">WhatsApp</p>
              <p className="text-brand-text text-xs font-bold leading-relaxed">0812 4918 6623</p>
            </div>
          </div>
        </div>

        <div className="flex flex-col md:flex-row justify-between items-center gap-8 pt-8 border-t border-brand-border">
           <p className="text-brand-text-secondary text-[10px] uppercase tracking-[0.2em] font-bold">
             &copy; {new Date().getFullYear()} PT. NEW ALFA OMEGA UTAMA. FSSC 22000 & MUI HALAL.
           </p>
           
           <button 
             onClick={scrollToTop}
             className="flex items-center gap-3 text-brand-text-secondary hover:text-brand-text transition-all text-[10px] uppercase font-bold tracking-widest group"
           >
             Back to Top <ArrowUp size={14} className="group-hover:-translate-y-1 transition-transform" />
           </button>
        </div>
      </div>
    </footer>
  );
}
