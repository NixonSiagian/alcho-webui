/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 *
 * Interactive Product Showcase — premium B2B flavor-solution explorer.
 * A dominant featured panel pairs with a swipeable selector strip. Hovering or
 * tapping a card promotes that solution into the featured panel with smooth
 * Framer Motion transitions (fade, reveal, hover lift, active glow).
 */

import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Soup, Wheat, Drumstick, Popcorn, FlaskConical, Droplets,
  ArrowRight, Check, Sparkles, type LucideIcon,
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { SafeImage } from '../common/SafeImage';
import { IMG } from '../../assets/images';
import { cn } from '../../lib/utils';

interface Solution {
  id: string;
  name: string;
  tagline: string;
  description: string;
  applications: string[];
  benefits: string[];
  specs: string[];
  icon: LucideIcon;
  image: string;
}

const SOLUTIONS: Solution[] = [
  {
    id: 'chicken-seasoning',
    name: 'Chicken Seasoning',
    tagline: 'Savory base system',
    description:
      'A rich, savory chicken base engineered for uniform taste across every batch — from soups and rice bowls to coatings and marinades.',
    applications: ['Restaurants', 'Rice Bowl', 'Frozen Food', 'Snacks'],
    benefits: ['Consistent Flavor', 'Easy Application', 'Cost Efficient', 'Scalable Production'],
    specs: ['Powder system', 'MSG / Non-MSG', 'Halal MUI'],
    icon: Soup,
    image: IMG.product,
  },
  {
    id: 'crispy-coating',
    name: 'Crispy Coating Mix',
    tagline: 'Batter & breading',
    description:
      'A high-adhesion batter and breading system that delivers a consistent golden crunch with extended crispiness hold time on the line.',
    applications: ['Fried Chicken', 'Frozen Food', 'Snacks', 'Restaurants'],
    benefits: ['Consistent Flavor', 'Easy Application', 'Cost Efficient', 'Scalable Production'],
    specs: ['Batter & breader', 'High crunch retention', 'Halal MUI'],
    icon: Wheat,
    image: IMG.hero,
  },
  {
    id: 'fried-chicken-system',
    name: 'Fried Chicken System',
    tagline: 'Marinade to coating',
    description:
      'A complete marinade-to-coating program for fried-chicken brands — balanced juiciness, signature crunch, and repeatable results at scale.',
    applications: ['Fried Chicken', 'Restaurants', 'Frozen Food'],
    benefits: ['Consistent Flavor', 'Easy Application', 'Cost Efficient', 'Scalable Production'],
    specs: ['Marinade + coating', 'Turn-key program', 'Halal MUI'],
    icon: Drumstick,
    image: IMG.chef,
  },
  {
    id: 'snack-seasoning',
    name: 'Snack Seasoning',
    tagline: 'Topical flavor powders',
    description:
      'Vibrant topical seasonings — balado, cheese, sweet corn, seaweed — with excellent cling and color for chips and extruded snacks.',
    applications: ['Snacks', 'Frozen Food'],
    benefits: ['Consistent Flavor', 'Easy Application', 'Cost Efficient', 'Scalable Production'],
    specs: ['Topical powder', 'High cling & color', 'Halal MUI'],
    icon: Popcorn,
    image: IMG.product,
  },
  {
    id: 'oem-custom-flavor',
    name: 'OEM Custom Flavor',
    tagline: 'Private-label R&D',
    description:
      'Private-label flavor development tailored to your brief. Our R&D team matches targets, optimizes cost, and scales cleanly to production.',
    applications: ['Frozen Food', 'Snacks', 'Restaurants', 'Rice Bowl'],
    benefits: ['Consistent Flavor', 'Easy Application', 'Cost Efficient', 'Scalable Production'],
    specs: ['Bespoke R&D', 'Cost optimization', 'NDA protected'],
    icon: FlaskConical,
    image: IMG.lab,
  },
  {
    id: 'sauce-marinade',
    name: 'Sauce & Marinade Solutions',
    tagline: 'Ready-to-use systems',
    description:
      'Ready-to-use sauces, glazes, and marinades — from smoky BBQ to soy honey — formulated for stable viscosity and dependable shelf life.',
    applications: ['Restaurants', 'Rice Bowl', 'Fried Chicken', 'Frozen Food'],
    benefits: ['Consistent Flavor', 'Easy Application', 'Cost Efficient', 'Scalable Production'],
    specs: ['Liquid & paste', 'Stable viscosity', 'Halal MUI'],
    icon: Droplets,
    image: IMG.factory,
  },
];

const EASE = [0.22, 1, 0.36, 1] as const;

export default function ProductShowcase() {
  const [activeId, setActiveId] = useState<string>(SOLUTIONS[0].id);
  const active = SOLUTIONS.find((s) => s.id === activeId) ?? SOLUTIONS[0];

  return (
    <section
      id="flavor-solutions"
      aria-label="Explore our flavor solutions"
      className="relative overflow-hidden bg-brand-bg py-20 lg:py-28"
    >
      {/* Ambient gold glow */}
      <div className="pointer-events-none absolute -top-32 right-1/4 h-[420px] w-[420px] rounded-full bg-brand-primary/5 blur-[140px]" />

      <div className="relative mx-auto max-w-7xl px-6">
        {/* Header */}
        <div className="mx-auto mb-12 max-w-3xl text-center lg:mb-16">
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.6 }}
            className="mb-5 inline-flex items-center gap-3 rounded-full border border-brand-border bg-brand-surface px-4 py-2"
          >
            <Sparkles size={15} className="text-brand-primary" />
            <span className="text-[11px] font-bold uppercase tracking-[0.3em] text-brand-secondary">
              Flavor Solutions
            </span>
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.6 }}
            transition={{ delay: 0.05 }}
            className="text-4xl font-bold leading-tight md:text-6xl"
          >
            Explore Our <span className="italic text-brand-primary">Flavor Solutions</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.6 }}
            transition={{ delay: 0.12 }}
            className="mx-auto mt-5 max-w-2xl text-lg leading-relaxed text-brand-text-secondary"
          >
            Discover seasoning systems designed for HORECA, OEM manufacturing, distributors,
            and food brands.
          </motion.p>
        </div>

        {/* Featured panel */}
        <FeaturedPanel active={active} />

        {/* Selector strip */}
        <Selector activeId={activeId} onSelect={setActiveId} />
      </div>
    </section>
  );
}

function FeaturedPanel({ active }: { active: Solution }) {
  const Icon = active.icon;
  return (
    <motion.div
      layout
      className="grid gap-5 rounded-[2rem] border border-brand-border bg-brand-surface p-4 shadow-xl shadow-black/5 sm:p-6 lg:grid-cols-5 lg:gap-8 lg:p-8"
    >
      {/* Dominant product image */}
      <div className="relative h-64 overflow-hidden rounded-[1.5rem] bg-brand-fill sm:h-80 lg:col-span-3 lg:h-auto lg:min-h-[30rem]">
        <AnimatePresence mode="wait">
          <motion.div
            key={active.id}
            initial={{ opacity: 0, scale: 1.05 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.55, ease: EASE }}
            className="absolute inset-0"
          >
            <SafeImage src={active.image} alt={active.name} className="h-full w-full" />
            {/* Legibility gradient */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/45 via-black/0 to-black/0" />
            {/* Floating spec badges */}
            <div className="absolute bottom-4 left-4 right-4 flex flex-wrap gap-2">
              {active.specs.map((spec, i) => (
                <motion.span
                  key={spec}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.25 + i * 0.07, ease: EASE }}
                  className="rounded-full border border-white/25 bg-black/35 px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-white backdrop-blur-md"
                >
                  {spec}
                </motion.span>
              ))}
            </div>
            {/* Category icon chip */}
            <div className="absolute left-4 top-4 flex h-11 w-11 items-center justify-center rounded-2xl bg-brand-surface/90 text-brand-secondary shadow-lg backdrop-blur">
              <Icon size={20} />
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Animated details */}
      <div className="flex flex-col lg:col-span-2">
        <AnimatePresence mode="wait">
          <motion.div
            key={active.id}
            initial="hidden"
            animate="show"
            exit={{ opacity: 0, transition: { duration: 0.15 } }}
            variants={{ hidden: {}, show: { transition: { staggerChildren: 0.06 } } }}
            className="flex h-full flex-col"
          >
            <FeaturedDetails active={active} />
          </motion.div>
        </AnimatePresence>
      </div>
    </motion.div>
  );
}

const itemFade = {
  hidden: { opacity: 0, y: 14 },
  show: { opacity: 1, y: 0, transition: { ease: EASE, duration: 0.4 } },
};

function FeaturedDetails({ active }: { active: Solution }) {
  return (
    <>
      <motion.p
        variants={itemFade}
        className="text-[11px] font-bold uppercase tracking-[0.3em] text-brand-primary"
      >
        {active.tagline}
      </motion.p>
      <motion.h3 variants={itemFade} className="mt-2 text-3xl font-bold text-brand-text md:text-4xl">
        {active.name}
      </motion.h3>
      <motion.p variants={itemFade} className="mt-4 text-base leading-relaxed text-brand-text-secondary">
        {active.description}
      </motion.p>

      {/* Applications */}
      <motion.div variants={itemFade} className="mt-7">
        <p className="mb-3 text-[10px] font-bold uppercase tracking-[0.25em] text-brand-text-secondary">
          Applications
        </p>
        <div className="flex flex-wrap gap-2">
          {active.applications.map((app) => (
            <span
              key={app}
              className="rounded-full border border-brand-border bg-brand-fill px-3 py-1.5 text-xs font-semibold text-brand-text"
            >
              {app}
            </span>
          ))}
        </div>
      </motion.div>

      {/* Benefits */}
      <motion.div variants={itemFade} className="mt-7">
        <p className="mb-3 text-[10px] font-bold uppercase tracking-[0.25em] text-brand-text-secondary">
          Key Benefits
        </p>
        <ul className="grid grid-cols-1 gap-2 sm:grid-cols-2">
          {active.benefits.map((benefit) => (
            <li key={benefit} className="flex items-center gap-2 text-sm font-medium text-brand-text">
              <span className="flex h-5 w-5 flex-none items-center justify-center rounded-full bg-brand-accent/15 text-brand-accent">
                <Check size={12} strokeWidth={3} />
              </span>
              {benefit}
            </li>
          ))}
        </ul>
      </motion.div>

      {/* CTA */}
      <motion.div variants={itemFade} className="mt-auto pt-8">
        <Link
          to="/contact"
          aria-label={`Request a sample of ${active.name}`}
          className="group inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-brand-primary px-6 py-4 text-xs font-bold uppercase tracking-widest text-brand-text transition-all hover:bg-brand-secondary hover:text-white"
        >
          Request Sample
          <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
        </Link>
      </motion.div>
    </>
  );
}

function Selector({ activeId, onSelect }: { activeId: string; onSelect: (id: string) => void }) {
  return (
    <div className="mt-6 lg:mt-8">
      <p className="mb-4 px-1 text-[10px] font-bold uppercase tracking-[0.25em] text-brand-text-secondary">
        Select a solution
      </p>
      {/* Swipeable on mobile (scroll-snap), 6-up grid on desktop */}
      <div className="no-scrollbar -mx-6 flex snap-x snap-mandatory gap-4 overflow-x-auto px-6 pb-2 lg:mx-0 lg:grid lg:grid-cols-6 lg:gap-4 lg:overflow-visible lg:px-0 lg:pb-0">
        {SOLUTIONS.map((s) => (
          <SelectorCard
            key={s.id}
            solution={s}
            active={s.id === activeId}
            onSelect={() => onSelect(s.id)}
          />
        ))}
      </div>
    </div>
  );
}

function SelectorCard({
  solution,
  active,
  onSelect,
}: {
  solution: Solution;
  active: boolean;
  onSelect: () => void;
}) {
  const Icon = solution.icon;
  return (
    <motion.button
      type="button"
      aria-pressed={active}
      onClick={onSelect}
      onMouseEnter={onSelect}
      onFocus={onSelect}
      whileHover={{ y: -4 }}
      transition={{ type: 'spring', stiffness: 320, damping: 24 }}
      className={cn(
        'group relative flex w-[230px] flex-none snap-start flex-col rounded-[1.5rem] border bg-brand-surface p-5 text-left transition-colors lg:w-auto',
        active
          ? 'border-brand-primary/50 shadow-xl shadow-brand-primary/10'
          : 'border-brand-border hover:border-brand-primary/30 shadow-sm',
      )}
    >
      {/* Animated border glow on hover/active */}
      <span
        aria-hidden
        className={cn(
          'pointer-events-none absolute inset-0 rounded-[1.5rem] ring-1 ring-inset ring-brand-primary/0 transition-all duration-300',
          active ? 'ring-brand-primary/40' : 'group-hover:ring-brand-primary/25',
        )}
      />
      <div
        className={cn(
          'flex h-11 w-11 items-center justify-center rounded-2xl transition-colors',
          active ? 'bg-brand-primary text-brand-text' : 'bg-brand-primary/10 text-brand-secondary',
        )}
      >
        <Icon size={20} />
      </div>
      <p className="mt-4 text-sm font-bold leading-tight text-brand-text">{solution.name}</p>
      <p className="mt-1 text-[11px] font-semibold uppercase tracking-wider text-brand-text-secondary">
        {solution.tagline}
      </p>

      {/* Quick specs: always shown when active, revealed on hover otherwise */}
      <div
        className={cn(
          'grid transition-all duration-300',
          active ? 'mt-3 grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0 group-hover:mt-3 group-hover:grid-rows-[1fr] group-hover:opacity-100',
        )}
      >
        <div className="overflow-hidden">
          <ul className="flex flex-col gap-1.5 border-t border-brand-border pt-3">
            {solution.specs.map((spec) => (
              <li key={spec} className="flex items-center gap-1.5 text-[11px] font-medium text-brand-text-secondary">
                <span className="h-1 w-1 flex-none rounded-full bg-brand-primary" />
                {spec}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </motion.button>
  );
}
