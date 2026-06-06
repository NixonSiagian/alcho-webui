/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 *
 * Central registry of Alcho Foods photography.
 *
 * Every image slot in the UI maps to a real Alcho asset with a clear business
 * purpose — no random stock photography and no decorative floating imagery.
 * Assets are imported so Vite fingerprints and bundles them for production.
 *
 * NOTE FOR THE TEAM: the five base assets below are the production-ready shots
 * currently available. The commercial photography brief still pending capture
 * is tracked in `PENDING_PHOTOGRAPHY` so each future shot has a defined home.
 */

import chefPlating from './images/alcho_chef_plating_1780645095547.png';
import factoryInterior from './images/alcho_factory_interior_1780645061770.png';
import foodsHero from './images/alcho_foods_hero_1780594022370.png';
import seasoningPowder from './images/alcho_seasoning_powder_1780645078244.png';
import spiceLab from './images/alcho_spice_lab_1780645143710.png';

/** Raw asset handles. */
export const ASSETS = {
  chefPlating,
  factoryInterior,
  foodsHero,
  seasoningPowder,
  spiceLab,
} as const;

/**
 * Purpose-driven image map. Components reference these semantic keys so the
 * underlying asset can be swapped centrally once new photography lands.
 */
export const IMG = {
  /** Hero — premium seasoning product shot, studio lit. */
  hero: foodsHero,
  /** Packaged / loose seasoning powder product shot. */
  product: seasoningPowder,
  /** Industrial food manufacturing line, stainless steel, HACCP environment. */
  factory: factoryInterior,
  /** R&D / quality-control spice laboratory. */
  lab: spiceLab,
  /** Professional chef applying seasoning in a commercial kitchen. */
  chef: chefPlating,
} as const;

/**
 * Outstanding commercial photography to be produced. Each entry already has a
 * UI home; until captured, the closest available real asset is used as the
 * interim image (see component usage), never stock or placeholder imagery.
 */
export const PENDING_PHOTOGRAPHY = [
  'Ingredient close-ups: garlic, chili, pepper, onion, fresh herbs',
  'Food results: fried chicken, BBQ meat, noodles, rice dishes',
] as const;
