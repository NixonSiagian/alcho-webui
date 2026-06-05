/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Product, Milestone, Partner, Testimonial, Metric } from './types';

export const PRODUCTS: Product[] = [
  {
    id: 'bbq-standard',
    name: 'Alcho BBQ Signature',
    category: 'BBQ',
    description: 'Deep smoky profile with Indonesian palm sugar and aromatic spices.',
    image: 'https://images.unsplash.com/photo-1596040033229-a9821ebd058d?q=80',
    features: ['Real Hickory Smoke', 'Low Sodium', 'No MSG Added']
  },
  {
    id: 'chicken-yellow',
    name: 'Turmeric Gold Chicken',
    category: 'Chicken',
    description: 'Traditional Galangal and Turmeric blend for that authentic yellow chicken flavor.',
    image: 'https://images.unsplash.com/photo-1564149504817-d13783685f0b?q=80',
    features: ['Heritage Recipe', 'Cold-Pressed Extraction', 'All Natural']
  },
  {
    id: 'beef-rendang',
    name: 'Rendang Master Mix',
    category: 'Beef',
    description: 'Complex 21-spice blend for slow-cooked beef perfection.',
    image: 'https://images.unsplash.com/photo-1596646399120-6d3cd6161494?q=80',
    features: ['Indigenous Spices', 'Rich Oil Content', 'Professional Grade']
  },
  {
    id: 'spicy-extra',
    name: 'Ghost Chili Intensity',
    category: 'Spicy',
    description: 'Extreme heat balanced with aromatic citrus leaves.',
    image: 'https://images.unsplash.com/photo-1626078297492-b7ce552942f6?q=80',
    features: ['Grade A Birdseye', 'Precision Heat', 'Slow Infused']
  },
  {
    id: 'horeca-bulk',
    name: 'Kitchen Essential Base',
    category: 'Horeca',
    description: 'Universal savory foundation for high-volume commercial kitchens.',
    image: 'https://images.unsplash.com/photo-1556910103-1c02745aae4d?q=80',
    features: ['Instant Solubility', 'High Yield', 'OEM Customizable']
  }
];

export const MILESTONES: Milestone[] = [
  { year: '2015', title: 'The Origin', description: 'Founded in Jakarta with a small spice laboratory.' },
  { year: '2018', title: 'Factory Expansion', description: 'Opened our 2,000sqm production facility.' },
  { year: '2021', title: 'Global Reach', description: 'Began exporting to Singapore, Malaysia, and Japan.' },
  { year: '2024', title: 'Innovation Peak', description: 'Launched the AI-driven flavor profiling system.' }
];

export const PARTNERS: Partner[] = [
  { name: 'Ritz-Carlton', logo: 'https://cdn.worldvectorlogo.com/logos/the-ritz-carlton.svg', type: 'Hotel' },
  { name: 'Mandarin Oriental', logo: 'https://cdn.worldvectorlogo.com/logos/mandarin-oriental.svg', type: 'Hotel' },
  { name: 'Garuda Indonesia', logo: 'https://cdn.worldvectorlogo.com/logos/garuda-indonesia.svg', type: 'Restaurant' },
  { name: 'Cloud Kitchen Co', logo: 'https://cdn.worldvectorlogo.com/logos/ubereats-1.svg', type: 'Factory' }
];

export const TESTIMONIALS: Testimonial[] = [
  {
    name: 'Chef Gunawan',
    role: 'Executive Chef',
    company: 'The Grand Hyatt',
    content: 'Alcho seasonings are the only ones that meet our strict consistency standards for international banquets.',
  },
  {
    name: 'Sarah Tan',
    role: 'Procurement Director',
    company: 'FoodLabs Asia',
    content: 'Their Horeca solutions reduced our kitchen labor costs by 25% while improving flavor profiles.',
  }
];

export const METRICS: Metric[] = [
  { label: 'Annual Production', value: '500', suffix: ' Tons' },
  { label: 'Happy Partners', value: '120', suffix: '+' },
  { label: 'Spice Variants', value: '45', suffix: '' },
  { label: 'Quality Control', value: '100', suffix: '%' }
];
