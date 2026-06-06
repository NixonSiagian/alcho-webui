/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 *
 * Mock database snapshot for the AI Market Intelligence section.
 *
 * This stands in for the row that the daily pipeline would persist (see api.ts
 * `MarketIntelligenceRecord`). Timestamps are computed at call time so the
 * dashboard always feels freshly generated. Replace `createMockSnapshot()` with
 * a real database read once the backend pipeline is live.
 */

import type { MarketIntelligenceSnapshot } from './types';

const hoursAgo = (h: number) => new Date(Date.now() - h * 3_600_000).toISOString();
const minutesAgo = (m: number) => new Date(Date.now() - m * 60_000).toISOString();

export function createMockSnapshot(): MarketIntelligenceSnapshot {
  return {
    generatedAt: minutesAgo(8),
    windowDays: 7,
    insight: {
      id: 'insight-korean-sweet-spicy',
      title: 'Korean Sweet-Spicy momentum is accelerating across frozen & snack categories',
      summary:
        'AI analysis detected a significant increase in discussion around Korean Sweet-Spicy (dak-gangjeong / gochujang-style) flavors across frozen food and snack categories over the last 7 days. Conversation volume rose alongside retail launch announcements, suggesting a shift from niche interest toward mainstream demand.',
      confidence: 87,
      articlesAnalyzed: 142,
      updatedAt: minutesAgo(8),
    },
    flavors: [
      { id: 'korean-spicy', name: 'Korean Spicy', trendScore: 92, growthPct: 38, confidence: 88, direction: 'up', categories: ['Snacks', 'Fried Chicken', 'Frozen'] },
      { id: 'cheese', name: 'Cheese', trendScore: 84, growthPct: 12, confidence: 81, direction: 'up', categories: ['Snacks', 'QSR'] },
      { id: 'salted-egg', name: 'Salted Egg', trendScore: 76, growthPct: 21, confidence: 74, direction: 'up', categories: ['Snacks', 'Sauces'] },
      { id: 'bbq', name: 'BBQ', trendScore: 71, growthPct: 4, confidence: 79, direction: 'stable', categories: ['Snacks', 'Meat'] },
      { id: 'matcha', name: 'Matcha', trendScore: 64, growthPct: 17, confidence: 69, direction: 'up', categories: ['Beverage', 'Bakery'] },
      { id: 'truffle', name: 'Truffle', trendScore: 58, growthPct: -6, confidence: 63, direction: 'down', categories: ['Premium', 'Sauces'] },
    ],
    products: [
      { id: 'korean-garlic-chicken', name: 'Korean Garlic Chicken', popularity: 90, growthRate: 41, category: 'Fried Chicken', momentum: 'accelerating' },
      { id: 'cheese-snacks', name: 'Cheese Snacks', popularity: 82, growthRate: 15, category: 'Snacks', momentum: 'steady' },
      { id: 'spicy-instant-noodles', name: 'Spicy Instant Noodles', popularity: 79, growthRate: 23, category: 'Instant Food', momentum: 'accelerating' },
      { id: 'ready-to-cook', name: 'Ready-to-Cook Meals', popularity: 73, growthRate: 19, category: 'Convenience', momentum: 'steady' },
      { id: 'frozen-street-food', name: 'Frozen Street Food', popularity: 68, growthRate: 27, category: 'Frozen', momentum: 'accelerating' },
    ],
    opportunities: [
      {
        id: 'premium-spicy-snacks',
        title: 'Premium spicy snack seasonings',
        description:
          'Premium spicy snack products are growing rapidly while branded competition in the premium tier remains relatively low.',
        opportunityScore: 88,
        confidence: 82,
        segment: 'Snacks · Premium',
        suggestion: 'Develop a Korean Sweet-Spicy topical seasoning line for premium chips and extruded snacks.',
      },
      {
        id: 'korean-coating-system',
        title: 'Korean-style coating systems for QSR',
        description:
          'Quick-service fried chicken brands are seeking differentiated crunch and glaze systems to ride the Korean flavor wave.',
        opportunityScore: 81,
        confidence: 77,
        segment: 'HORECA · QSR',
        suggestion: 'Bundle a marinade + glaze + coating program tuned for sweet-spicy fried chicken.',
      },
      {
        id: 'salted-egg-frozen',
        title: 'Salted egg sauces for frozen meals',
        description:
          'Salted egg demand is steady-to-rising with limited shelf-stable formats available to manufacturers.',
        opportunityScore: 74,
        confidence: 70,
        segment: 'OEM · Frozen',
        suggestion: 'Offer a shelf-stable salted egg sauce base optimized for frozen ready-to-cook lines.',
      },
    ],
    sources: [
      { id: 's1', title: 'Korean-inspired flavors lead 2026 snack launch pipeline', source: 'FoodNavigator-Asia', publishedAt: hoursAgo(6) },
      { id: 's2', title: 'Gochujang and sweet-spicy profiles spike in retail data', source: 'Mintel', publishedAt: hoursAgo(11) },
      { id: 's3', title: 'Frozen street food expands beyond convenience channels', source: 'Just Food', publishedAt: hoursAgo(19) },
      { id: 's4', title: 'Salted egg moves from regional treat to mainstream sauce', source: 'The Food Institute', publishedAt: hoursAgo(26) },
      { id: 's5', title: 'QSR chains test differentiated fried chicken coatings', source: 'Restaurant Dive', publishedAt: hoursAgo(33) },
      { id: 's6', title: 'Cheese remains the most resilient snack seasoning', source: 'Snack Food & Wholesale Bakery', publishedAt: hoursAgo(40) },
    ],
  };
}
