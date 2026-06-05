/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface Product {
  code: string;
  name: string;
  category: string;
  sizes: string[];
  description?: string;
  tags?: string[];
  halal: boolean;
}

export const CATEGORIES = [
  "Sauces & Bumbu Dasar",
  "Bouillon & Seasoning",
  "Snack Seasoning"
];

export const PRODUCTS: Product[] = [
  // Sauces & Bumbu Dasar
  {
    code: "SB-001",
    name: "Alcho Smokey Barbeque Sauce",
    category: "Sauces & Bumbu Dasar",
    sizes: ["20 x 500 Gr"],
    halal: true,
    description: "Premium smoky BBQ sauce with rich, deep flavor profile."
  },
  {
    code: "SB-002",
    name: "Alcho Soy Honey Sauce",
    category: "Sauces & Bumbu Dasar",
    sizes: ["20 x 1 Kg"],
    halal: true,
    description: "Sweet and savory honey soy sauce blend."
  },
  {
    code: "SB-003",
    name: "Alcho Tako Yaky",
    category: "Sauces & Bumbu Dasar",
    sizes: ["20 x 500 Gr"],
    halal: true,
    description: "Authentic Takoyaki sauce for professional food service."
  },
  {
    code: "SB-004",
    name: "Alcho Black Paper Sauce",
    category: "Sauces & Bumbu Dasar",
    sizes: ["20 x 500 Gr"],
    halal: true,
    description: "Zesty black pepper sauce with a balanced kick."
  },

  // Bouillon & Seasoning
  {
    code: "BS-001",
    name: "Alcho Chicken Powder",
    category: "Bouillon & Seasoning",
    sizes: ["25 x 1 Kg"],
    halal: true,
    description: "Concentrated chicken powder for rich culinary foundations."
  },
  {
    code: "BS-002",
    name: "Alcho Chicken Powder Non MSG",
    category: "Bouillon & Seasoning",
    sizes: ["25 x 1 Kg"],
    halal: true,
    description: "Healthy chicken bouillon without MSG."
  },
  {
    code: "BS-003",
    name: "Alcho Beef Powder",
    category: "Bouillon & Seasoning",
    sizes: ["25 x 1 Kg", "25 x 500 Gr"],
    halal: true,
    description: "Deep roasted beef flavor powder."
  },
  {
    code: "BS-004",
    name: "Alcho Beef Powder Non MSG",
    category: "Bouillon & Seasoning",
    sizes: ["25 x 1 Kg"],
    halal: true,
    description: "Pure beef flavor without MSG."
  },
  {
    code: "BS-005",
    name: "Alcho Garlic Granule",
    category: "Bouillon & Seasoning",
    sizes: ["25 x 1 Kg", "25 x 500 Gr"],
    halal: true,
    description: "Premium toasted garlic granules."
  },
  {
    code: "BS-006",
    name: "Alcho Tepung Kremes",
    category: "Bouillon & Seasoning",
    sizes: ["25 x 1 Kg", "25 x 500 Gr"],
    halal: true,
    description: "Traditional Indonesian crispy flour mix."
  },
  {
    code: "BS-007",
    name: "Alcho Barbeque Seasoning",
    category: "Bouillon & Seasoning",
    sizes: ["25 x 1 Kg", "25 x 500 Gr"],
    halal: true,
    description: "Dry rub BBQ seasoning for meats and poultry."
  },
  {
    code: "BS-008",
    name: "Alcho Garlic Powder",
    category: "Bouillon & Seasoning",
    sizes: ["25 x 1 Kg", "25 x 500 Gr"],
    halal: true,
    description: "Finely ground aromatic garlic powder."
  },
  {
    code: "BS-009",
    name: "Alcho Chicken Powder BBQ",
    category: "Bouillon & Seasoning",
    sizes: ["25 x 1 Kg", "25 x 500 Gr"],
    halal: true,
    description: "BBQ flavored chicken bouillon."
  },
  {
    code: "BS-010",
    name: "Alcho Bumbu Kuah Bakso",
    category: "Bouillon & Seasoning",
    sizes: ["25 x 1 Kg", "25 x 500 Gr", "25 x 250 Gr"],
    halal: true,
    description: "Authentic Indonesian meatball soup base."
  },
  {
    code: "BS-011",
    name: "Alcho Bumbu Kaldu Sapi",
    category: "Bouillon & Seasoning",
    sizes: ["25 x 1 Kg", "25 x 500 Gr", "25 x 250 Gr"],
    halal: true,
    description: "Concentrated beef stock seasoning."
  },
  {
    code: "BS-012",
    name: "Alcho Bumbu Kuah Ayam",
    category: "Bouillon & Seasoning",
    sizes: ["25 x 1 Kg", "25 x 500 Gr", "25 x 250 Gr"],
    halal: true,
    description: "Concentrated chicken soup seasoning."
  },
  {
    code: "BS-013",
    name: "Alcho Lada Putih",
    category: "Bouillon & Seasoning",
    sizes: ["25 x 1 Kg", "25 x 500 Gr", "25 x 250 Gr"],
    halal: true,
    description: "Premium pure white pepper powder."
  },
  {
    code: "BS-014",
    name: "Alcho Bumbu Kaldu Ayam",
    category: "Bouillon & Seasoning",
    sizes: ["25 x 1 Kg", "25 x 500 Gr", "25 x 250 Gr"],
    halal: true,
    description: "Rich chicken stock bouillon."
  },

  // Snack Seasoning
  {
    code: "SS-001",
    name: "Alcho Bumbu Tabur Balado",
    category: "Snack Seasoning",
    sizes: ["25 x 1 Kg", "25 x 500 Gr", "25 x 250 Gr"],
    halal: true,
    description: "Spicy and tangy Balado seasoning for snacks."
  },
  {
    code: "SS-002",
    name: "Alcho Balado Pedas Manis",
    category: "Snack Seasoning",
    sizes: ["25 x 1 Kg", "25 x 500 Gr", "25 x 250 Gr"],
    halal: true,
    description: "Sweet and spicy Balado seasoning."
  },
  {
    code: "SS-003",
    name: "Alcho Jagung Manis",
    category: "Snack Seasoning",
    sizes: ["25 x 1 Kg", "25 x 500 Gr", "25 x 250 Gr"],
    halal: true,
    description: "Sweet corn seasoning for chips and popcorn."
  },
  {
    code: "SS-004",
    name: "Alcho Jagung Bakar",
    category: "Snack Seasoning",
    sizes: ["25 x 1 Kg", "25 x 500 Gr", "25 x 250 Gr"],
    halal: true,
    description: "Roasted corn seasoning with smoky aroma."
  },
  {
    code: "SS-005",
    name: "Alcho Cheese",
    category: "Snack Seasoning",
    sizes: ["25 x 1 Kg", "25 x 500 Gr", "25 x 250 Gr"],
    halal: true,
    description: "Creamy cheddar cheese powder for snacks."
  },
  {
    code: "SS-006",
    name: "Alcho Udang Pedas Manis",
    category: "Snack Seasoning",
    sizes: ["25 x 1 Kg", "25 x 500 Gr", "25 x 250 Gr"],
    halal: true,
    description: "Sweet and spicy shrimp flavored seasoning."
  },
  {
    code: "SS-007",
    name: "Alcho Bumbu Barbeque Manis",
    category: "Snack Seasoning",
    sizes: ["25 x 1 Kg", "25 x 500 Gr", "25 x 250 Gr"],
    halal: true,
    description: "Sweet BBQ seasoning for savory snacks."
  },
  {
    code: "SS-008",
    name: "Alcho Ayam Barbeque",
    category: "Snack Seasoning",
    sizes: ["25 x 1 Kg", "25 x 500 Gr", "25 x 250 Gr"],
    halal: true,
    description: "Chicken BBQ flavored seasoning."
  },
  {
    code: "SS-009",
    name: "Alcho Bumbu Ayam Panggang",
    category: "Snack Seasoning",
    sizes: ["25 x 1 Kg", "25 x 500 Gr", "25 x 250 Gr"],
    halal: true,
    description: "Roasted chicken flavored seasoning."
  },
  {
    code: "SS-010",
    name: "Alcho Rumput Laut",
    category: "Snack Seasoning",
    sizes: ["25 x 1 Kg", "25 x 500 Gr", "25 x 250 Gr"],
    halal: true,
    description: "Nori / Seaweed flavored seasoning."
  }
];
