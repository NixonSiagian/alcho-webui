/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 *
 * Product catalog is sourced from products.json so the data layer is JSON-driven.
 * Add a product to products.json and it automatically appears in the catalog,
 * gets a Technical Page, and inherits the generated Technical Data Sheet.
 */

import productsData from './products.json';

export interface Product {
  code: string;
  name: string;
  category: string;
  sizes: string[];
  description?: string;
  tags?: string[];
  halal: boolean;
}

export const PRODUCTS: Product[] = productsData as Product[];

/** Categories derived from the data, preserving first-seen order. */
export const CATEGORIES: string[] = PRODUCTS.reduce<string[]>((acc, p) => {
  if (!acc.includes(p.category)) acc.push(p.category);
  return acc;
}, []);
