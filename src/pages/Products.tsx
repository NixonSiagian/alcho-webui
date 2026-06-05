/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import Showcase from '../components/sections/Showcase';
import { motion } from 'motion/react';

import SEO from '../components/common/SEO';

export default function Products() {
  return (
    <div className="pt-24 min-h-screen">
      <SEO title="Product Catalog" description="Browse our professional range of sauces, bouillon, and seasonings designed for industrial kitchen consistency." />
      <Showcase />
      
      {/* Certifications Footer */}
      <section className="pb-24 px-6">
        <div className="max-w-7xl mx-auto border-t border-white/5 pt-24 grid grid-cols-2 md:grid-cols-4 gap-8">
          {[
            { label: "MUI Halal", val: "Indonesian Standard" },
            { label: "FSSC 22000", val: "Food Safety Grade" },
            { label: "Laboratory Controlled", val: "Zero Variance" },
            { label: "BPOM Certified", val: "Full Compliance" }
          ].map((c, i) => (
            <div key={i} className="space-y-2">
              <p className="text-brand-primary text-xs font-bold uppercase tracking-widest">{c.label}</p>
              <p className="text-white text-lg">{c.val}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
