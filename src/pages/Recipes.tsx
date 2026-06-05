/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import RecipeCenter from '../components/sections/RecipeCenter';

import SEO from '../components/common/SEO';

export default function Recipes() {
  return (
    <div className="pt-24 min-h-screen bg-brand-bg">
      <SEO title="Recipe Benchmarks" description="Technical guides and industrial secrets for standardizing iconic Indonesian dishes." />
      <RecipeCenter />
      
      {/* Resource Highlight */}
      <section className="py-24 max-w-7xl mx-auto px-6 bg-brand-surface rounded-[4rem] mb-24 border border-white/5 text-center">
        <h3 className="text-3xl md:text-5xl font-bold mb-8">Need custom <span className="italic text-brand-primary">Flavor Development?</span></h3>
        <p className="text-brand-text-secondary text-xl max-w-2xl mx-auto mb-12 italic">
          "The recipe is only as good as the consistency of its ingredients. We help you standardize your signature taste for mass scale."
        </p>
        <button className="btn-primary px-10 py-5">Talk to R&D Team</button>
      </section>
    </div>
  );
}
