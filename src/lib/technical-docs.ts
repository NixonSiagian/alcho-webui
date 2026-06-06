/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 *
 * Technical Data Sheet (TDS) generator.
 *
 * Technical docs are NOT hand-written per product. They are generated from
 * `products.json` + `technical-docs.json`:
 *   - applications & attributes resolve from a per-product profile, falling back
 *     to the product's category profile, so new products inherit the structure.
 *   - laboratory / nutritional / microbiological values are never invented; any
 *     unavailable field renders as "Available Upon Request".
 */

import config from '../data/technical-docs.json';
import { PRODUCTS, type Product } from '../data/products';

interface Profile {
  applications: string[];
  attributes: string[];
}

interface TechnicalConfig {
  defaults: {
    brand: string;
    manufacturer: string;
    lastUpdated: string;
    unavailableLabel: string;
    storageConditions: string[];
    shelfLife: string;
    shelfLifeNote: string;
    facilityCertifications: string[];
    specificationFields: string[];
    documents: { priceList: string; catalog: string };
    contact: { team: string; phone: string; whatsapp: string; email: string };
  };
  categoryProfiles: Record<string, Profile>;
  productProfiles: Record<string, Partial<Profile>>;
}

export interface SpecRow {
  label: string;
  value: string;
}

export interface TechnicalDoc {
  product: Product;
  brand: string;
  manufacturer: string;
  lastUpdated: string;
  applications: string[];
  attributes: string[];
  packaging: string[];
  storageConditions: string[];
  shelfLife: string;
  shelfLifeNote: string;
  productCertifications: string[];
  facilityCertifications: string[];
  specifications: SpecRow[];
  unavailableLabel: string;
  contact: TechnicalConfig['defaults']['contact'];
  documents: TechnicalConfig['defaults']['documents'];
}

const CFG = config as TechnicalConfig;

export function getProductByCode(code: string): Product | undefined {
  const target = code.trim().toLowerCase();
  return PRODUCTS.find((p) => p.code.toLowerCase() === target);
}

export function buildTechnicalDoc(product: Product): TechnicalDoc {
  const d = CFG.defaults;
  const categoryProfile = CFG.categoryProfiles[product.category] ?? { applications: [], attributes: [] };
  const override = CFG.productProfiles[product.code] ?? {};

  const applications = override.applications ?? categoryProfile.applications;
  const attributes = override.attributes ?? categoryProfile.attributes;

  const productCertifications = product.halal ? ['Halal (MUI)'] : [];

  // Laboratory/nutritional values are intentionally not fabricated.
  const specifications: SpecRow[] = d.specificationFields.map((label) => ({
    label,
    value: d.unavailableLabel,
  }));

  return {
    product,
    brand: d.brand,
    manufacturer: d.manufacturer,
    lastUpdated: d.lastUpdated,
    applications,
    attributes,
    packaging: product.sizes,
    storageConditions: d.storageConditions,
    shelfLife: d.shelfLife,
    shelfLifeNote: d.shelfLifeNote,
    productCertifications,
    facilityCertifications: d.facilityCertifications,
    specifications,
    unavailableLabel: d.unavailableLabel,
    contact: d.contact,
    documents: d.documents,
  };
}

/** Convenience: resolve a full technical doc straight from a product code. */
export function getTechnicalDoc(code: string): TechnicalDoc | null {
  const product = getProductByCode(code);
  return product ? buildTechnicalDoc(product) : null;
}
