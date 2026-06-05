/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { Menu, X, ChevronRight } from 'lucide-react';
import { cn } from '../../lib/utils';

import { AlchoLogo } from '../common/AlchoLogo';

const NAV_LINKS = [
  { name: 'Products', href: '/products' },
  { name: 'Recipes', href: '/recipes' },
  { name: 'Horeca', href: '/horeca' },
  { name: 'OEM', href: '/oem' },
  { name: 'Partners', href: '/distributor' },
  { name: 'About', href: '/about' },
  { name: 'Gallery', href: '/gallery' },
  { name: 'Resources', href: '/resources' },
];

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    const element = document.querySelector(href);
    if (element) {
      window.scrollTo({
        top: element.getBoundingClientRect().top + window.scrollY - 80,
        behavior: 'smooth'
      });
    }
  };

  return (
    <>
      <nav 
        className={cn(
          "fixed top-0 left-0 w-full z-[100] transition-all duration-500",
          isScrolled 
            ? "py-4 bg-brand-bg/90 backdrop-blur-xl border-b border-white/5" 
            : "py-8 bg-transparent"
        )}
      >
        <div className="max-w-7xl mx-auto px-6 h-full flex items-center justify-between">
          <Link 
            to="/" 
            onClick={() => setMobileMenuOpen(false)}
            className="flex items-center gap-2 group relative z-[150]"
          >
            <AlchoLogo className="w-24 md:w-32" />
          </Link>

          {/* Desktop Links */}
          <div className="hidden lg:flex items-center gap-2">
            <div className="flex items-center px-4 bg-white/5 border border-white/5 rounded-full mr-4 backdrop-blur-md">
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.name}
                  to={link.href}
                  className={cn(
                    "px-6 py-4 text-brand-text-secondary hover:text-brand-primary text-[10px] uppercase font-bold tracking-widest transition-all relative group",
                    location.pathname === link.href && "text-brand-primary"
                  )}
                >
                  {link.name}
                  <div className={cn(
                    "absolute bottom-2 left-6 right-6 h-[1px] bg-brand-primary transition-all scale-x-0 group-hover:scale-x-100",
                    location.pathname === link.href && "scale-x-100"
                  )} />
                </Link>
              ))}
            </div>
            <Link to="/contact" className="btn-primary py-4 px-8 text-[10px] uppercase tracking-widest flex items-center gap-2">
              Request Trial <ChevronRight size={14} />
            </Link>
          </div>

          {/* Mobile Menu Toggle */}
          <button 
            className="lg:hidden text-white"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu Overlay */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="absolute top-20 left-6 right-6 lg:hidden bg-brand-surface border border-brand-primary/20 rounded-[2rem] p-8 shadow-2xl z-[110]"
            >
              <div className="flex flex-col gap-2">
                {NAV_LINKS.map((link) => (
                  <Link
                    key={link.name}
                    to={link.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className={cn(
                      "text-white text-2xl font-bold py-4 border-b border-white/5 last:border-0",
                      location.pathname === link.href && "text-brand-primary"
                    )}
                  >
                    {link.name}
                  </Link>
                ))}
                <Link 
                  to="/contact" 
                  onClick={() => setMobileMenuOpen(false)}
                  className="btn-primary w-full py-6 mt-4 flex items-center justify-center gap-2"
                >
                  Request Industrial Trial <ChevronRight size={18} />
                </Link>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </>
  );
}
