/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { useParams, Link } from 'react-router-dom';
import {
  Download,
  FileText,
  ShieldCheck,
  Phone,
  MessageSquare,
  Mail,
  ChevronLeft,
  ChevronRight,
  Printer,
  Check,
  AlertCircle,
} from 'lucide-react';
import SEO from '../components/common/SEO';
import { getProductByCode, buildTechnicalDoc } from '../lib/technical-docs';
import {
  useResourceManifest,
  getPriceListDocument,
  getDocumentById,
  downloadResource,
} from '../lib/resources';
import { trackEvent } from '../lib/analytics';

function formatDate(iso: string): string {
  const date = new Date(iso);
  if (Number.isNaN(date.getTime())) return iso;
  return date.toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' });
}

export default function ProductTechnical() {
  const { code = '' } = useParams();
  const product = getProductByCode(code);
  const { manifest } = useResourceManifest();

  if (!product) {
    return (
      <div className="pt-24 min-h-screen bg-brand-bg flex items-center justify-center px-6">
        <div className="text-center space-y-5 max-w-md">
          <AlertCircle size={40} className="mx-auto text-brand-secondary" />
          <h1 className="text-3xl font-bold">Product not found</h1>
          <p className="text-brand-text-secondary">
            We couldn't find a technical sheet for "{code}". It may have been moved or renamed.
          </p>
          <Link to="/products" className="btn-secondary inline-flex items-center gap-2">
            <ChevronLeft size={16} /> Back to Catalog
          </Link>
        </div>
      </div>
    );
  }

  const doc = buildTechnicalDoc(product);
  const priceListDoc = getPriceListDocument(manifest);
  const catalogDoc = getDocumentById(manifest, doc.documents.catalog);

  const handlePrintTDS = () => {
    trackEvent('resource_download', {
      document_id: `tds-${product.code}`,
      document_title: `${product.name} — Technical Data Sheet`,
      file_type: 'PDF',
      context: 'technical_page',
    });
    window.print();
  };

  return (
    <div className="pt-24 print:pt-6 min-h-screen bg-brand-bg">
      <SEO
        title={`${product.name} — Technical Data Sheet`}
        description={`Technical Data Sheet for ${product.name} (${product.code}). ${product.description ?? ''}`.trim()}
      />

      <div className="max-w-7xl mx-auto px-6 py-10">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-[11px] uppercase font-bold tracking-widest text-brand-text-secondary mb-8 no-print">
          <Link to="/products" className="hover:text-brand-secondary transition-colors">Products</Link>
          <ChevronRight size={12} />
          <span className="text-brand-text">{product.code}</span>
        </nav>

        {/* Document header */}
        <header className="border-b border-brand-border-strong pb-8 mb-10">
          <p className="text-[11px] uppercase font-bold tracking-[0.3em] text-brand-secondary mb-3">
            Technical Data Sheet
          </p>
          <h1 className="text-3xl md:text-5xl font-bold leading-tight mb-4">{product.name}</h1>
          <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-brand-text-secondary">
            <span className="font-mono text-brand-text">{product.code}</span>
            <span className="hidden sm:inline w-1 h-1 rounded-full bg-brand-border-strong" />
            <span>{product.category}</span>
            <span className="hidden sm:inline w-1 h-1 rounded-full bg-brand-border-strong" />
            <span>{doc.brand}</span>
            <span className="hidden sm:inline w-1 h-1 rounded-full bg-brand-border-strong" />
            <span>Last Updated {formatDate(doc.lastUpdated)}</span>
          </div>
        </header>

        <div className="grid lg:grid-cols-3 gap-12">
          {/* Document body */}
          <div className="lg:col-span-2 space-y-12">
            <Section number="01" title="Product Information">
              <SpecTable
                rows={[
                  { label: 'Product Name', value: product.name },
                  { label: 'Product Code', value: product.code, mono: true },
                  { label: 'Category', value: product.category },
                  { label: 'Brand', value: doc.brand },
                  { label: 'Manufacturer', value: doc.manufacturer },
                  { label: 'Last Updated', value: formatDate(doc.lastUpdated) },
                ]}
              />
            </Section>

            <Section number="02" title="Product Description">
              <p className="text-brand-text leading-relaxed">{product.description}</p>
            </Section>

            <Section number="03" title="Technical Specifications">
              <p className="text-sm text-brand-text-secondary mb-4">
                Detailed laboratory specifications are issued by Quality Control on request and
                for active commercial accounts.
              </p>
              <SpecTable rows={doc.specifications.map((s) => ({ label: s.label, value: s.value }))} />
            </Section>

            <Section number="04" title="Recommended Applications">
              <ul className="grid sm:grid-cols-2 gap-x-8 gap-y-3">
                {doc.applications.map((app) => (
                  <li key={app} className="flex items-center gap-3 text-brand-text">
                    <Check size={16} className="text-brand-accent shrink-0" />
                    <span>{app}</span>
                  </li>
                ))}
              </ul>
            </Section>

            <Section number="05" title="Packaging Information">
              <SpecTable
                rows={doc.packaging.map((size, i) => ({
                  label: `Format ${i + 1}`,
                  value: size,
                }))}
              />
            </Section>

            <Section number="06" title="Storage Conditions">
              <ul className="space-y-2">
                {doc.storageConditions.map((line) => (
                  <li key={line} className="flex items-start gap-3 text-brand-text">
                    <span className="mt-2 w-1.5 h-1.5 rounded-full bg-brand-border-strong shrink-0" />
                    <span>{line}</span>
                  </li>
                ))}
              </ul>
            </Section>

            <Section number="07" title="Shelf Life">
              <p className="text-brand-text font-medium">{doc.shelfLife}</p>
              <p className="text-sm text-brand-text-secondary mt-1">{doc.shelfLifeNote}</p>
            </Section>

            <Section number="08" title="Certifications">
              <div className="space-y-6">
                <div>
                  <p className="text-[11px] uppercase font-bold tracking-widest text-brand-text-secondary mb-3">
                    Product
                  </p>
                  <div className="flex flex-wrap gap-3">
                    {doc.productCertifications.length > 0 ? (
                      doc.productCertifications.map((c) => <CertBadge key={c} label={c} />)
                    ) : (
                      <span className="text-brand-text-secondary text-sm">{doc.unavailableLabel}</span>
                    )}
                  </div>
                </div>
                <div>
                  <p className="text-[11px] uppercase font-bold tracking-widest text-brand-text-secondary mb-3">
                    Manufacturing Facility
                  </p>
                  <div className="flex flex-wrap gap-3">
                    {doc.facilityCertifications.map((c) => <CertBadge key={c} label={c} />)}
                  </div>
                </div>
              </div>
            </Section>

            <Section number="09" title="Product Attributes">
              <div className="flex flex-wrap gap-2.5">
                {doc.attributes.map((attr) => (
                  <span
                    key={attr}
                    className="px-4 py-2 rounded-lg bg-brand-fill border border-brand-border text-sm font-medium text-brand-text"
                  >
                    {attr}
                  </span>
                ))}
              </div>
            </Section>
          </div>

          {/* Sidebar: downloads + support (excluded from print) */}
          <aside className="lg:col-span-1 no-print">
            <div className="lg:sticky lg:top-28 space-y-6">
              {/* Download area */}
              <div className="bg-brand-surface border border-brand-border rounded-2xl p-7 shadow-xl shadow-black/5">
                <h2 className="text-sm uppercase font-bold tracking-widest text-brand-text mb-5">
                  Download Area
                </h2>
                <div className="space-y-3">
                  <button
                    type="button"
                    onClick={handlePrintTDS}
                    className="btn-primary w-full flex items-center justify-center gap-2"
                  >
                    Technical Data Sheet (PDF) <Printer size={16} />
                  </button>
                  <DownloadRow
                    label="Price List"
                    sub={priceListDoc ? `${priceListDoc.fileType} · ${priceListDoc.fileSize}` : 'Unavailable'}
                    disabled={!priceListDoc}
                    onClick={() => priceListDoc && downloadResource(priceListDoc, 'technical_page')}
                  />
                  <DownloadRow
                    label="Product Catalog"
                    sub={catalogDoc ? `${catalogDoc.fileType} · ${catalogDoc.fileSize}` : 'Unavailable'}
                    disabled={!catalogDoc}
                    onClick={() => catalogDoc && downloadResource(catalogDoc, 'technical_page')}
                  />
                </div>
                <p className="text-[11px] text-brand-text-secondary mt-4 leading-relaxed">
                  The Technical Data Sheet opens a print-ready document you can save as PDF.
                </p>
              </div>

              {/* Contact CTA */}
              <div className="bg-brand-card border border-brand-border rounded-2xl p-7">
                <h2 className="text-lg font-bold text-brand-text mb-1">Need formulation support?</h2>
                <p className="text-sm text-brand-text-secondary mb-5">
                  Contact the {doc.contact.team} for specifications, samples and OEM development.
                </p>
                <div className="space-y-3 text-sm">
                  <a href={`tel:${doc.contact.phone.replace(/\s/g, '')}`} className="flex items-center gap-3 text-brand-text hover:text-brand-secondary transition-colors">
                    <Phone size={16} className="text-brand-secondary" /> {doc.contact.phone}
                  </a>
                  <a href="#" className="flex items-center gap-3 text-brand-text hover:text-brand-secondary transition-colors">
                    <MessageSquare size={16} className="text-brand-accent" /> {doc.contact.whatsapp}
                  </a>
                  <a href={`mailto:${doc.contact.email}`} className="flex items-center gap-3 text-brand-text hover:text-brand-secondary transition-colors">
                    <Mail size={16} className="text-brand-secondary" /> {doc.contact.email}
                  </a>
                </div>
                <Link to="/contact" className="btn-secondary w-full mt-6 inline-flex items-center justify-center gap-2">
                  Contact Technical Team <ChevronRight size={16} />
                </Link>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}

function Section({ number, title, children }: { number: string; title: string; children: React.ReactNode }) {
  return (
    <section className="print-block">
      <div className="flex items-baseline gap-3 mb-4 pb-3 border-b border-brand-border">
        <span className="font-mono text-xs text-brand-text-secondary/70">{number}</span>
        <h2 className="text-lg md:text-xl font-bold text-brand-text uppercase tracking-wide">{title}</h2>
      </div>
      {children}
    </section>
  );
}

function SpecTable({ rows }: { rows: { label: string; value: string; mono?: boolean }[] }) {
  return (
    <dl className="divide-y divide-brand-border border border-brand-border rounded-xl overflow-hidden">
      {rows.map((row) => (
        <div key={row.label} className="grid grid-cols-1 sm:grid-cols-3 gap-1 sm:gap-4 px-5 py-3.5 odd:bg-brand-surface">
          <dt className="text-[11px] sm:text-xs uppercase font-bold tracking-widest text-brand-text-secondary sm:pt-0.5">
            {row.label}
          </dt>
          <dd className={`sm:col-span-2 text-brand-text ${row.mono ? 'font-mono' : ''}`}>{row.value}</dd>
        </div>
      ))}
    </dl>
  );
}

function CertBadge({ label }: { label: string }) {
  return (
    <span className="inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-brand-border bg-brand-surface text-sm font-medium text-brand-text">
      <ShieldCheck size={16} className="text-brand-accent" />
      {label}
    </span>
  );
}

function DownloadRow({
  label,
  sub,
  onClick,
  disabled,
}: {
  label: string;
  sub: string;
  onClick: () => void;
  disabled?: boolean;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className="w-full flex items-center justify-between gap-3 px-5 py-3.5 rounded-xl border border-brand-border-strong text-left hover:bg-brand-fill transition-colors disabled:opacity-50 disabled:cursor-not-allowed group"
    >
      <span className="flex items-center gap-3">
        <FileText size={18} className="text-brand-secondary shrink-0" />
        <span>
          <span className="block text-sm font-bold text-brand-text">{label}</span>
          <span className="block text-[11px] uppercase tracking-widest text-brand-text-secondary">{sub}</span>
        </span>
      </span>
      <Download size={16} className="text-brand-text-secondary group-hover:text-brand-secondary group-hover:translate-y-0.5 transition-all shrink-0" />
    </button>
  );
}
