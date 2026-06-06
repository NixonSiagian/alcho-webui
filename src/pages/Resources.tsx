/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { motion } from 'motion/react';
import {
  Download,
  FileText,
  BookOpen,
  Tag,
  ShieldCheck,
  Calendar,
  Mail,
  ArrowRight,
  AlertCircle,
  type LucideIcon,
} from 'lucide-react';
import SEO from '../components/common/SEO';
import {
  useResourceManifest,
  downloadResource,
  type ResourceCategory,
  type ResourceDocument,
} from '../lib/resources';

const CATEGORY_ICONS: Record<string, LucideIcon> = {
  BookOpen,
  Tag,
  FileText,
  ShieldCheck,
};

function formatDate(iso: string): string {
  const date = new Date(iso);
  if (Number.isNaN(date.getTime())) return iso;
  return date.toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' });
}

function slug(id: string): string {
  return `cat-${id}`;
}

export default function Resources() {
  const { manifest, loading, error } = useResourceManifest();

  return (
    <div className="pt-24 min-h-screen bg-brand-bg">
      <SEO
        title="Resource Center"
        description="Download the latest Alcho Foods product catalog, HORECA price list, company profile, technical documents, and Halal & food-safety certifications."
      />

      {/* Hero */}
      <section className="py-20 md:py-24 px-6 text-center border-b border-brand-border">
        <div className="max-w-3xl mx-auto space-y-6">
          <div className="inline-flex items-center gap-3 px-4 py-2 bg-brand-primary/10 border border-brand-primary/20 rounded-full">
            <BookOpen size={16} className="text-brand-secondary" />
            <span className="text-[10px] uppercase font-bold tracking-[0.3em] text-brand-secondary">
              Resource Center
            </span>
          </div>
          <h1 className="text-5xl md:text-8xl font-bold uppercase leading-none">
            Document <br />
            <span className="italic text-brand-primary lowercase font-serif">downloads.</span>
          </h1>
          <p className="text-brand-text-secondary text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
            Everything you need to evaluate, specify, and onboard Alcho Foods — catalogs,
            pricing, technical sheets and certifications, ready to download.
          </p>
          {manifest && (
            <p className="text-xs uppercase font-bold tracking-widest text-brand-text-secondary/80">
              Library updated {formatDate(manifest.updated)}
            </p>
          )}
        </div>
      </section>

      {/* Loading state */}
      {loading && (
        <div className="py-32 flex justify-center">
          <div className="w-12 h-12 rounded-full border-2 border-brand-primary/20 border-t-brand-primary animate-spin" />
        </div>
      )}

      {/* Error state */}
      {error && !loading && (
        <div className="py-32 px-6">
          <div className="max-w-md mx-auto text-center space-y-4">
            <AlertCircle size={40} className="mx-auto text-brand-secondary" />
            <h3 className="text-brand-text text-2xl font-bold">Resources unavailable</h3>
            <p className="text-brand-text-secondary">
              We couldn't load the document library right now. Please refresh, or contact our
              team directly and we'll send the files over.
            </p>
            <a href="/contact" className="btn-secondary inline-flex">Contact Us</a>
          </div>
        </div>
      )}

      {/* Category quick nav */}
      {manifest && !loading && (
        <div className="sticky top-20 z-40 bg-brand-bg/85 backdrop-blur-xl border-b border-brand-border">
          <div className="max-w-7xl mx-auto px-6 py-4 flex gap-3 overflow-x-auto no-scrollbar">
            {manifest.categories.map((cat) => (
              <a
                key={cat.id}
                href={`#${slug(cat.id)}`}
                className="chip chip-inactive whitespace-nowrap shrink-0"
              >
                {cat.title}
              </a>
            ))}
          </div>
        </div>
      )}

      {/* Categories */}
      {manifest && !loading && (
        <div className="max-w-7xl mx-auto px-6 py-16 md:py-24 space-y-20 md:space-y-28">
          {manifest.categories.map((category, i) => (
            <CategoryBlock key={category.id} category={category} index={i} />
          ))}
        </div>
      )}

      {/* Bottom CTA */}
      <section className="px-6 pb-24">
        <div className="max-w-7xl mx-auto bg-brand-surface border border-brand-border rounded-[3rem] md:rounded-[4rem] p-10 md:p-20 text-center space-y-8 shadow-xl shadow-black/5">
          <h2 className="text-3xl md:text-6xl font-bold">
            Need official <span className="italic text-brand-primary">signed copies?</span>
          </h2>
          <p className="text-brand-text-secondary text-lg max-w-2xl mx-auto">
            Our Quality Control department issues stamped certificates and product-specific
            technical sheets for industrial audits and onboarding.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
            <a href="mailto:qc@alchofoods.com" className="btn-primary inline-flex items-center gap-3">
              Email QC Department <Mail size={18} />
            </a>
            <a
              href="/contact"
              className="font-bold text-brand-text flex items-center gap-2 hover:gap-4 transition-all"
            >
              Contact Sales <ArrowRight size={18} />
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}

function CategoryBlock({ category, index }: { category: ResourceCategory; index: number }) {
  const Icon = CATEGORY_ICONS[category.icon] ?? FileText;

  return (
    <section id={slug(category.id)} className="scroll-mt-40">
      <div className="flex items-start gap-5 mb-10">
        <div className="w-14 h-14 shrink-0 rounded-2xl bg-brand-primary/10 flex items-center justify-center text-brand-secondary">
          <Icon size={24} />
        </div>
        <div>
          <div className="flex items-center gap-3">
            <span className="text-brand-text-secondary/70 font-mono text-xs">
              {String(index + 1).padStart(2, '0')}
            </span>
            <h2 className="text-3xl md:text-5xl font-bold">{category.title}</h2>
          </div>
          <p className="text-brand-text-secondary mt-2 max-w-2xl">{category.description}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {category.documents.map((doc) => (
          <DocumentCard key={doc.id} doc={doc} />
        ))}
      </div>
    </section>
  );
}

function DocumentCard({ doc }: { doc: ResourceDocument }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4 }}
      className="group flex flex-col h-full bg-brand-surface border border-brand-border rounded-[2rem] p-7 transition-all hover:border-brand-primary/40 hover:shadow-xl hover:shadow-black/5 hover:-translate-y-1"
    >
      <div className="flex items-start justify-between mb-6">
        <div className="w-12 h-12 rounded-xl bg-brand-fill flex items-center justify-center text-brand-secondary">
          <FileText size={22} />
        </div>
        <div className="flex items-center gap-2">
          {doc.featured && (
            <span className="text-[9px] uppercase font-bold tracking-widest text-brand-accent bg-brand-accent/10 px-2.5 py-1 rounded-full">
              Latest
            </span>
          )}
          <span className="text-[10px] uppercase font-bold tracking-widest text-brand-text-secondary border border-brand-border rounded-md px-2.5 py-1">
            {doc.fileType}
          </span>
        </div>
      </div>

      <h3 className="text-brand-text text-lg font-bold leading-snug mb-2">{doc.title}</h3>
      <p className="text-brand-text-secondary text-sm leading-relaxed mb-6 flex-grow">
        {doc.description}
      </p>

      <div className="flex items-center gap-4 text-[10px] uppercase font-bold tracking-widest text-brand-text-secondary mb-6">
        <span>{doc.fileSize}</span>
        <span className="w-1 h-1 rounded-full bg-brand-border-strong" />
        <span className="flex items-center gap-1.5">
          <Calendar size={12} /> {formatDate(doc.updated)}
        </span>
      </div>

      <button
        type="button"
        onClick={() => downloadResource(doc, 'resource_center')}
        className="btn-primary w-full flex items-center justify-center gap-2 group/btn"
        aria-label={`Download ${doc.title}`}
      >
        Download
        <Download size={16} className="group-hover/btn:translate-y-0.5 transition-transform" />
      </button>
    </motion.div>
  );
}
