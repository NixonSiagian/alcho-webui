/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 *
 * Knowledge base + lightweight retrieval for the Alcho Product Advisor (RAG).
 *
 * The corpus is built ONLY from authoritative Alcho sources:
 *   - Product Catalog        (products.json via PRODUCTS)
 *   - Technical Docs          (generated per product + standard config)
 *   - Recipe Database         (recipes.ts)
 *   - Company Profile         (curated below)
 *
 * Retrieval is a dependency-free keyword/overlap scorer suitable for this
 * catalog size — no external vector service required. Documents are the only
 * grounding the model is given, which keeps answers from hallucinating products.
 */

import { PRODUCTS, CATEGORIES } from '../data/products';
import { buildTechnicalDoc } from './technical-docs';
import { RECIPES } from '../data/recipes';

export type KbSource = 'Product' | 'Recipe' | 'Technical' | 'Company' | 'Category';

export interface KbDoc {
  id: string;
  title: string;
  source: KbSource;
  /** Optional in-app route the UI can link to. */
  ref?: string;
  text: string;
}

export interface RetrievedDoc extends KbDoc {
  score: number;
}

const STOP_WORDS = new Set([
  'the', 'a', 'an', 'and', 'or', 'of', 'to', 'in', 'on', 'for', 'with', 'is', 'are',
  'do', 'does', 'i', 'we', 'you', 'my', 'our', 'your', 'can', 'what', 'which', 'how',
  'me', 'about', 'have', 'has', 'any', 'use', 'used', 'using', 'best', 'good', 'need',
  'want', 'please', 'tell', 'show', 'give', 'this', 'that', 'it', 'be', 'as', 'at', 'by',
]);

function tokenize(text: string): string[] {
  const matches = text.toLowerCase().match(/[a-z0-9]+/g);
  if (!matches) return [];
  return matches.filter((t) => t.length > 1 && !STOP_WORDS.has(t));
}

const COMPANY_PROFILE = `Alcho Foods is the brand of PT. NEW ALFA OMEGA UTAMA, an Indonesian industrial
seasoning and flavor manufacturer founded in 2008, based in Waru, Sidoarjo. Alcho supplies standardized
seasoning systems and flavor foundations for HORECA (Hotel, Restaurant & Catering), OEM / private-label
food manufacturers, and distributors. The product range is Halal (MUI) certified, produced under an
FSSC 22000 food-safety system and BPOM registered. Contact: phone 031 866 8858, WhatsApp 0812 4918 6623,
email qc@alchofoods.com.`;

const SERVICES_TEXT = `Alcho Foods serves three buyer types. HORECA: standardized sauces, bouillon and
seasoning bases for hotel chains, restaurants, quick-service, cafes and catering to reduce labor and keep
flavor consistent. OEM / Private Label: custom flavor development, flexible packaging from 10 g sachets to
25 kg industrial bulk bags, and full manufacturing under FSSC 22000 and Halal certification. Distributor:
regional partnership program for distributing the Alcho range. Available downloads in the Resource Center:
Product Catalog, HORECA Price List, Company Profile, Technical Data Sheet (TDS), Safety Data Sheet (SDS),
OEM Implementation Guide, and certificates (Halal MUI, FSSC 22000, BPOM).`;

let cachedKb: KbDoc[] | null = null;
let cachedIndex: { doc: KbDoc; freq: Map<string, number>; length: number }[] | null = null;

/** Builds the knowledge base from Alcho data sources (memoized). */
export function buildKnowledgeBase(): KbDoc[] {
  if (cachedKb) return cachedKb;

  const docs: KbDoc[] = [];

  // Products + their generated technical docs
  for (const product of PRODUCTS) {
    const tds = buildTechnicalDoc(product);
    const certs = [...tds.productCertifications, ...tds.facilityCertifications].join(', ');
    docs.push({
      id: `product:${product.code}`,
      title: `${product.name} (${product.code})`,
      source: 'Product',
      ref: `/products/${product.code}`,
      text: [
        `${product.name}, product code ${product.code}.`,
        `Category: ${product.category}.`,
        product.description ?? '',
        `Packaging formats: ${product.sizes.join(', ')}.`,
        `Recommended applications: ${tds.applications.join(', ')}.`,
        `Attributes: ${tds.attributes.join(', ')}.`,
        `Certifications: ${certs}.`,
        `Shelf life: ${tds.shelfLife}.`,
        `Storage: ${tds.storageConditions.join(' ')}`,
      ].join(' '),
    });
  }

  // Recipes
  for (const recipe of RECIPES) {
    docs.push({
      id: `recipe:${recipe.id}`,
      title: recipe.name,
      source: 'Recipe',
      ref: '/recipes',
      text: [
        `${recipe.name} — ${recipe.category} recipe.`,
        `Difficulty ${recipe.difficulty}, prep/cook ${recipe.time}, serves ${recipe.servings}.`,
        `Dietary: ${recipe.dietary.join(', ')}.`,
        `Alcho products used: ${recipe.products.join(', ')}.`,
        `Ingredients: ${recipe.ingredients.join('; ')}.`,
        `Method: ${recipe.steps.join(' ')}`,
      ].join(' '),
    });
  }

  // Category overview
  docs.push({
    id: 'category:overview',
    title: 'Product Categories',
    source: 'Category',
    ref: '/products',
    text: `Alcho Foods product categories: ${CATEGORIES.map(
      (c) => `${c} (${PRODUCTS.filter((p) => p.category === c).length} products)`,
    ).join(', ')}. Sauces & Bumbu Dasar are ready-to-use sauces and cooking bases. Bouillon & Seasoning
      are chicken/beef powders, broth bases and spices. Snack Seasoning are dry coating seasonings for
      chips, popcorn, crackers and extruded snacks.`,
  });

  // Technical / packaging / certifications
  docs.push({
    id: 'technical:standards',
    title: 'Technical, Packaging & Certifications',
    source: 'Technical',
    ref: '/resources',
    text: `Packaging is available in box formats such as 20 x 500 g, 20 x 1 kg, 25 x 1 kg, 25 x 500 g and
      25 x 250 g depending on the product. Typical shelf life is 12 Months (Typical); contact sales for
      product-specific shelf life. Storage: store in a cool and dry place, avoid direct sunlight, keep the
      package tightly sealed after opening. Certifications: Halal (MUI) on products, FSSC 22000 food-safety
      system and BPOM registration at facility level. Detailed laboratory specifications, nutritional values
      and microbiological data are available upon request. Technical Data Sheets are available per product.`,
  });

  // Company profile + services
  docs.push({
    id: 'company:profile',
    title: 'Company Profile',
    source: 'Company',
    ref: '/about',
    text: COMPANY_PROFILE,
  });
  docs.push({
    id: 'company:services',
    title: 'HORECA, OEM & Distributor Services',
    source: 'Company',
    ref: '/horeca',
    text: SERVICES_TEXT,
  });

  cachedKb = docs;
  return docs;
}

function getIndex() {
  if (cachedIndex) return cachedIndex;
  const kb = buildKnowledgeBase();
  cachedIndex = kb.map((doc) => {
    const tokens = tokenize(`${doc.title} ${doc.text}`);
    const freq = new Map<string, number>();
    for (const t of tokens) freq.set(t, (freq.get(t) ?? 0) + 1);
    return { doc, freq, length: tokens.length };
  });
  return cachedIndex;
}

const CODE_RE = /\b(sb|bs|ss)-?\s?0?\d{1,3}\b/gi;

/** Retrieves the most relevant documents for a query. */
export function retrieve(query: string, k = 6): RetrievedDoc[] {
  const queryTokens = Array.from(new Set(tokenize(query)));
  if (queryTokens.length === 0) return [];

  // Normalize any product codes mentioned (e.g. "bs003" -> "bs-003")
  const codeMatches: string[] = query.match(CODE_RE) ?? [];
  const codes = codeMatches.map((c) =>
    c.toLowerCase().replace(/\s/g, '').replace(/^(sb|bs|ss)-?(\d+)$/, (_, p, n) => `${p}-${n.padStart(3, '0')}`),
  );

  const scored = getIndex().map(({ doc, freq, length }) => {
    let score = 0;
    for (const term of queryTokens) {
      const f = freq.get(term) ?? 0;
      if (f > 0) score += 1 + Math.log(1 + f);
    }
    // Normalize slightly by length so long docs don't dominate
    score = length > 0 ? score / Math.log(10 + length) : score;
    // Strong boost for exact product-code matches
    for (const code of codes) {
      if (doc.id.toLowerCase().includes(code)) score += 10;
    }
    return { ...doc, score };
  });

  return scored
    .filter((d) => d.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, k);
}
