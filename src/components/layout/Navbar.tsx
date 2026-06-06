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
  { name: 'Intelligence', href: '/intelligence' },
  { name: 'Recipes', href: '/recipes' },
  { name: 'Horeca', href: '/horeca' },
  { name: 'OEM', href: '/oem' },
  { name: 'Partners', href: '/distributor' },
  { name: 'About', href: '/about' },
  { name: 'Gallery', href: '/gallery' },
  { name: 'Resources', href: '/resources' },
];

/** Grouped structure used by the full-screen mobile menu. */
const MENU_GROUPS: { label: string; items: { name: string; href: string }[] }[] = [
  {
    label: 'Explore',
    items: [
      { name: 'Products', href: '/products' },
      { name: 'Intelligence', href: '/intelligence' },
      { name: 'Recipes', href: '/recipes' },
    ],
  },
  {
    label: 'Solutions',
    items: [
      { name: 'Horeca', href: '/horeca' },
      { name: 'OEM', href: '/oem' },
      { name: 'Partners', href: '/distributor' },
    ],
  },
  {
    label: 'Company',
    items: [
      { name: 'About', href: '/about' },
      { name: 'Gallery', href: '/gallery' },
      { name: 'Resources', href: '/resources' },
      { name: 'Contact', href: '/contact' },
    ],
  },
];

const PANEL_EASE = [0.22, 1, 0.36, 1] as const;

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close the menu whenever the route changes.
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location.pathname]);

  // Lock body scroll while the mobile menu is open; restore on close/unmount.
  useEffect(() => {
    if (!mobileMenuOpen) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = previous;
    };
  }, [mobileMenuOpen]);

  return (
    <>
      <nav
        className={cn(
          'fixed top-0 left-0 w-full z-[100] transition-colors duration-500',
          isScrolled || mobileMenuOpen
            ? 'bg-brand-bg/90 backdrop-blur-xl border-b border-brand-border'
            : 'bg-transparent',
        )}
        style={{ paddingTop: 'env(safe-area-inset-top)' }}
      >
        <div className="max-w-7xl mx-auto px-5 sm:px-6 flex items-center justify-between h-[72px] lg:h-20">
          <Link
            to="/"
            onClick={() => setMobileMenuOpen(false)}
            className="flex items-center relative z-[150] max-w-[40%]"
            aria-label="Alcho — home"
          >
            <AlchoLogo className="w-24 sm:w-28 md:w-36" />
          </Link>

          {/* Desktop Links */}
          <div className="hidden lg:flex items-center gap-5">
            <div className="flex items-center gap-1">
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.name}
                  to={link.href}
                  className={cn(
                    'relative px-3.5 py-2 rounded-full text-[10px] uppercase font-bold tracking-[0.18em] transition-colors',
                    location.pathname === link.href
                      ? 'text-brand-primary'
                      : 'text-brand-text-secondary hover:text-brand-text hover:bg-brand-fill',
                  )}
                >
                  {link.name}
                </Link>
              ))}
            </div>
            <span className="h-5 w-px bg-brand-border" />
            <Link
              to="/contact"
              className="btn-primary py-3 px-6 text-[10px] uppercase tracking-[0.18em] flex items-center gap-1.5"
            >
              Request Trial <ChevronRight size={14} />
            </Link>
          </div>

          {/* Mobile Menu Toggle — 48px touch target, right aligned */}
          <button
            type="button"
            className="lg:hidden flex h-12 w-12 -mr-2 items-center justify-center rounded-full text-brand-text active:scale-95 transition-transform"
            onClick={() => setMobileMenuOpen((v) => !v)}
            aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={mobileMenuOpen}
          >
            <Menu size={24} />
          </button>
        </div>
      </nav>

      <MobileMenu
        open={mobileMenuOpen}
        onClose={() => setMobileMenuOpen(false)}
        pathname={location.pathname}
      />
    </>
  );
}

function MobileMenu({
  open,
  onClose,
  pathname,
}: {
  open: boolean;
  onClose: () => void;
  pathname: string;
}) {
  return (
    <AnimatePresence>
      {open && (
        <div className="lg:hidden">
          {/* Backdrop — sits above the floating AI assistant (z-120) */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={onClose}
            className="fixed inset-0 z-[190] bg-black/40 backdrop-blur-sm"
            aria-hidden="true"
          />

          {/* Slide-in panel from the right */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'tween', ease: PANEL_EASE, duration: 0.35 }}
            className="fixed inset-y-0 right-0 z-[200] flex w-[88%] max-w-sm flex-col bg-brand-bg shadow-2xl"
            style={{
              paddingTop: 'env(safe-area-inset-top)',
              paddingBottom: 'env(safe-area-inset-bottom)',
            }}
            role="dialog"
            aria-modal="true"
            aria-label="Main menu"
          >
            {/* Panel header */}
            <div className="flex h-[72px] flex-none items-center justify-between border-b border-brand-border px-5">
              <AlchoLogo className="w-24" />
              <button
                type="button"
                onClick={onClose}
                aria-label="Close menu"
                className="flex h-12 w-12 -mr-2 items-center justify-center rounded-full text-brand-text transition-colors hover:bg-brand-fill active:scale-95"
              >
                <X size={24} />
              </button>
            </div>

            {/* Scrollable menu body (only this scrolls; iOS rubber-band contained) */}
            <nav className="no-scrollbar flex-1 overflow-y-auto overscroll-contain px-5 py-6">
              {MENU_GROUPS.map((group) => (
                <div key={group.label} className="mb-7 last:mb-0">
                  <p className="mb-2 px-3 text-[10px] font-bold uppercase tracking-[0.3em] text-brand-text-secondary/70">
                    {group.label}
                  </p>
                  <div className="flex flex-col">
                    {group.items.map((item) => {
                      const active = pathname === item.href;
                      return (
                        <Link
                          key={item.name}
                          to={item.href}
                          onClick={onClose}
                          aria-current={active ? 'page' : undefined}
                          className={cn(
                            'group -mx-3 flex min-h-[48px] items-center justify-between rounded-2xl px-3 py-1.5 text-xl font-bold transition-colors active:scale-[0.98]',
                            active ? 'bg-brand-fill text-brand-primary' : 'text-brand-text hover:bg-brand-fill',
                          )}
                        >
                          <span className="flex items-center gap-3">
                            <span
                              className={cn(
                                'h-5 w-1 rounded-full bg-brand-primary transition-opacity',
                                active ? 'opacity-100' : 'opacity-0',
                              )}
                            />
                            {item.name}
                          </span>
                          <ChevronRight
                            size={18}
                            className="-translate-x-1 text-brand-primary opacity-0 transition-all group-hover:translate-x-0 group-hover:opacity-100"
                          />
                        </Link>
                      );
                    })}
                  </div>
                </div>
              ))}
            </nav>

            {/* Footer CTA */}
            <div className="flex-none border-t border-brand-border px-5 pb-6 pt-4">
              <Link
                to="/contact"
                onClick={onClose}
                className="btn-primary flex min-h-[52px] w-full items-center justify-center gap-2"
              >
                Request Industrial Trial <ChevronRight size={18} />
              </Link>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
