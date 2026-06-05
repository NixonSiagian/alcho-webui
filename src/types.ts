/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface Product {
  id: string;
  name: string;
  category: 'BBQ' | 'Chicken' | 'Beef' | 'Spicy' | 'Horeca';
  description: string;
  image: string;
  features: string[];
}

export interface Milestone {
  year: string;
  title: string;
  description: string;
}

export interface Partner {
  name: string;
  logo: string;
  type: 'Hotel' | 'Restaurant' | 'Factory';
}

export interface Testimonial {
  name: string;
  role: string;
  company: string;
  content: string;
  avatar?: string;
}

export interface Metric {
  label: string;
  value: string;
  suffix: string;
}
