/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface Recipe {
  id: string;
  name: string;
  category: string;
  time: string;
  servings: string;
  image: string;
  ingredients: string[];
  steps: string[];
  products: string[];
  difficulty: 'Easy' | 'Medium' | 'Hard';
  dietary: string[]; // e.g. ["Non-MSG", "Halal", "Low Carb", "Vegetarian"]
  spice: 0 | 1 | 2 | 3; // Heat levels
}

export const RECIPES: Recipe[] = [
  {
    id: "rendang",
    name: "Classic Beef Rendang",
    category: "Indonesian Heritage",
    time: "4 Hours",
    servings: "6 Persons",
    difficulty: "Hard",
    spice: 2,
    dietary: ["Halal"],
    image: "https://images.unsplash.com/photo-1596450514735-2d1373574d6e?q=80&w=2000&auto=format&fit=crop",
    ingredients: [
      "1kg Beef Shank, cubed",
      "2 liters Coconut Milk",
      "2 stalks Lemongrass",
      "4 kaffir lime leaves",
      "2 turmeric leaves",
      "Salt to taste"
    ],
    steps: [
      "Blanch the beef cubes in boiling water for 5 minutes, then drain.",
      "In a large wok, combine coconut milk and Alcho Beef Powder for base flavor.",
      "Add aromatic leaves and simmer until the milk reduces by half.",
      "Add beef and continue cooking over low heat until the sauce turns dark brown and oil separates.",
      "Stir constantly at the end to prevent burning until the rendang is dry."
    ],
    products: ["Alcho Beef Powder", "Alcho Smokey Barbeque Sauce (Optional tweak)"]
  },
  {
    id: "nasi-goreng",
    name: "Special Chicken Nasi Goreng",
    category: "Indonesian Classic",
    time: "20 Mins",
    servings: "2 Persons",
    difficulty: "Easy",
    spice: 1,
    dietary: ["Halal"],
    image: "https://images.unsplash.com/photo-1603133872878-684f208fb84b?q=80&w=2000&auto=format&fit=crop",
    ingredients: [
      "2 plates cold Jasmine Rice",
      "150g Chicken breast, sliced",
      "2 Eggs",
      "Alcho Chicken Powder",
      "Sweet Soy Sauce",
      "Garlic and Shallots"
    ],
    steps: [
      "Sauté garlic and shallots until aromatic.",
      "Cook chicken until browned.",
      "Push everything to the side and scramble eggs.",
      "Add rice and Alcho Chicken Powder. Toss vigorously on high heat.",
      "Finish with sweet soy sauce and garnish with cucumber and crackers."
    ],
    products: ["Alcho Chicken Powder", "Alcho Garlic Powder"]
  },
  {
    id: "bbq-chicken",
    name: "Industrial Style BBQ Chicken",
    category: "Western",
    time: "45 Mins",
    servings: "4 Persons",
    difficulty: "Medium",
    spice: 1,
    dietary: ["Halal", "Non-MSG"],
    image: "https://images.unsplash.com/photo-1598515214211-89d3c73ae83b?q=80&w=2000&auto=format&fit=crop",
    ingredients: [
      "1kg Chicken Drumsticks",
      "200ml Alcho Smokey Barbeque Sauce",
      "Alcho Garlic Granule",
      "Salt and Black Pepper"
    ],
    steps: [
      "Marinate chicken with Alcho Garlic Granule and pepper for 30 minutes.",
      "Sear chicken on a hot pan for color.",
      "Brush generously with Alcho Smokey Barbeque Sauce.",
      "Bake at 200°C for 25 minutes, basting occasionally with more sauce.",
      "Rest for 5 minutes before serving."
    ],
    products: ["Alcho Smokey Barbeque Sauce", "Alcho Garlic Granule"]
  },
  {
    id: "soto-betawi",
    name: "Soto Betawi Creamy",
    category: "Indonesian Heritage",
    time: "1.5 Hours",
    servings: "4 Persons",
    difficulty: "Medium",
    spice: 0,
    dietary: ["Halal"],
    image: "https://images.unsplash.com/photo-1572656631137-7935297eff55?q=80&w=2000&auto=format&fit=crop",
    ingredients: ["500g Beef Brisket", "500ml Fresh Milk", "Alcho Beef Powder", "Potatoes", "Tomatoes"],
    steps: ["Boil brisket until tender.", "Sauté aromatics and add to broth.", "Add milk and Alcho Beef Powder for rich savory depth.", "Serve with fried lungs, tomatoes, and lime."],
    products: ["Alcho Beef Powder"]
  },
  {
    id: "ayam-bakar",
    name: "Taliwang Style Grilled Chicken",
    category: "Indonesian Classic",
    time: "1 Hour",
    servings: "2 Persons",
    difficulty: "Medium",
    spice: 3,
    dietary: ["Halal"],
    image: "https://images.unsplash.com/photo-1598514983318-291420552733?q=80&w=2000&auto=format&fit=crop",
    ingredients: ["1 Whole Chicken, butterflied", "Alcho Jagung Bakar (for smokiness)", "Birdseye chili", "Shrimp paste"],
    steps: ["Marinate chicken with spices.", "Grill until half cooked.", "Baste with chili paste mixed with Alcho seasoning.", "Grill until charred and aromatic."],
    products: ["Alcho Jagung Bakar", "Alcho Chicken Powder"]
  },
  {
    id: "ayam-goreng",
    name: "Ayam Goreng Kremes Sensation",
    category: "Indonesian Classic",
    time: "40 Mins",
    servings: "4 Persons",
    difficulty: "Medium",
    spice: 0,
    dietary: ["Halal"],
    image: "https://images.unsplash.com/photo-1626082927389-6cd097cdc6ec?q=80&w=1000&auto=format&fit=crop",
    ingredients: [
      "1kg Chicken pieces",
      "Alcho Chicken Powder",
      "Alcho Tepung Kremes",
      "Garlic and Turmeric marinade"
    ],
    steps: [
      "Bone-in chicken is marinated with Alcho Chicken Powder, garlic, and turmeric, then simmered.",
      "Prepare batter using Alcho Tepung Kremes with water.",
      "Deep fry chicken until golden brown.",
      "Drizzle batter into hot oil from a height to make the crispy crunch decoration ('Kremesan').",
      "Serve hot with samba and raw vegetables."
    ],
    products: ["Alcho Chicken Powder", "Alcho Tepung Kremes"]
  },
  {
    id: "bakso",
    name: "Bakso Sapi Kuah Segar",
    category: "Indonesian Street Food",
    time: "30 Mins",
    servings: "4 Persons",
    difficulty: "Easy",
    spice: 0,
    dietary: ["Halal"],
    image: "https://images.unsplash.com/photo-1616034124976-121669766935?q=80&w=2000&auto=format&fit=crop",
    ingredients: [
      "500g Beef Meatballs",
      "2 liters Beef Bone Broth",
      "Alcho Bumbu Kuah Bakso",
      "Rice Vermicelli",
      "Fried Shallots"
    ],
    steps: [
      "Boil 2 liters of water or beef stock.",
      "Add Alcho Bumbu Kuah Bakso to the boiling liquid. Stir well.",
      "Add meatballs and simmer until they float.",
      "Prepare bowls with vermicelli and salt.",
      "Pour soup and meatballs into bowls. Garnish with fried shallots and celery."
    ],
    products: ["Alcho Bumbu Kuah Bakso", "Alcho Garlic Powder"]
  },
  {
    id: "sate",
    name: "Sate Madura Premium",
    category: "Indonesian Street Food",
    time: "45 Mins",
    servings: "4 Persons",
    difficulty: "Medium",
    spice: 1,
    dietary: ["Halal"],
    image: "https://images.unsplash.com/photo-1529042410759-befb1204b468?q=80&w=1000&auto=format&fit=crop",
    ingredients: [
      "500g Chicken breast, cubed",
      "Alcho Chicken Powder",
      "Alcho Soy Honey Sauce",
      "Peanut Butter",
      "Shallots"
    ],
    steps: [
      "Thread skewered chicken meat.",
      "Marinate with garlic, Alcho Chicken Powder, and a splash of oil.",
      "Grill skewers over hot coals, brushing with Alcho Soy Honey Sauce.",
      "Serve with aromatic peanut sauce, shallots, and sweet soy sauce."
    ],
    products: ["Alcho Chicken Powder", "Alcho Soy Honey Sauce"]
  },
  {
    id: "gulai",
    name: "Gulai Kambing Padang",
    category: "Indonesian Heritage",
    time: "2 Hours",
    servings: "5 Persons",
    difficulty: "Hard",
    spice: 2,
    dietary: ["Halal"],
    image: "https://images.unsplash.com/photo-1544025162-811114215b80?q=80&w=1000&auto=format&fit=crop",
    ingredients: [
      "750g Mutton or Beef, cubed",
      "1 liter Thin Coconut Milk",
      "Alcho Bumbu Kaldu Sapi",
      "Lemongrass, Ginger, Galangal",
      "Gulai spices"
    ],
    steps: [
      "Boil meat with aromatics until tender.",
      "Sauté spiced paste until fragrant.",
      "Add spices and thin coconut milk to the meat pot. Bring to a boil.",
      "Stir in Alcho Bumbu Kaldu Sapi to standardize savory richness.",
      "Simmer until sauce thickens slightly."
    ],
    products: ["Alcho Bumbu Kaldu Sapi", "Alcho Garlic Powder"]
  },
  {
    id: "mie-goreng",
    name: "Mie Goreng Jawa",
    category: "Indonesian Street Food",
    time: "20 Mins",
    servings: "2 Persons",
    difficulty: "Easy",
    spice: 1,
    dietary: ["Halal"],
    image: "https://images.unsplash.com/photo-1585032226651-759b368d7246?q=80&w=1000&auto=format&fit=crop",
    ingredients: [
      "2 packs Egg Noodles, boiled",
      "Alcho Chicken Powder",
      "Alcho Soy Honey Sauce",
      "Cabbage and Mustard greens",
      "Sausages and Meatballs"
    ],
    steps: [
      "Sauté garlic paste and shallots until yellow.",
      "Add cabbage, mustard greens, sausages, and meatballs.",
      "Add noodles, Alcho Chicken Powder, and Alcho Soy Honey Sauce.",
      "Stir fry on high heat until dry and smoky."
    ],
    products: ["Alcho Chicken Powder", "Alcho Soy Honey Sauce"]
  },
  {
    id: "beef-bbq",
    name: "Smokey Beef BBQ Platter",
    category: "Western",
    time: "2.5 Hours",
    servings: "6 Persons",
    difficulty: "Hard",
    spice: 1,
    dietary: ["Halal"],
    image: "https://images.unsplash.com/photo-1544025162-811114215b80?q=80&w=1000&auto=format&fit=crop",
    ingredients: [
      "1.5kg Beef Short Ribs or Brisket",
      "Alcho Smokey Barbeque Sauce",
      "Alcho Barbeque Seasoning",
      "Brown Sugar",
      "Mustard"
    ],
    steps: [
      "Coat beef with mustard, then rub generously with Alcho Barbeque Seasoning.",
      "Smoke or roast at 120°C for 2 hours.",
      "Glaze with Alcho Smokey Barbeque Sauce during the last 30 minutes of cooking.",
      "Rest 15 minutes before carving."
    ],
    products: ["Alcho Smokey Barbeque Sauce", "Alcho Barbeque Seasoning"]
  },
  {
    id: "seafood-bbq",
    name: "Sweet Chili Seafood BBQ",
    category: "Western",
    time: "30 Mins",
    servings: "3 Persons",
    difficulty: "Medium",
    spice: 2,
    dietary: ["Halal"],
    image: "https://images.unsplash.com/photo-1475924156734-496f6cac6ec1?q=80&w=1000&auto=format&fit=crop",
    ingredients: [
      "500g Large Prawns and Calamari",
      "Alcho Udang Pedas Manis",
      "Alcho Smokey Barbeque Sauce",
      "Garlic Butter",
      "Lime Juice"
    ],
    steps: [
      "Clean prawns and butterfly cut.",
      "Mix Alcho Udang Pedas Manis seasoning with garlic butter and lime juice.",
      "Marinate seafood for 15 minutes.",
      "Grill seafood quickly on high heat while brushing with Alcho Smokey Barbeque Sauce.",
      "Serve warm."
    ],
    products: ["Alcho Udang Pedas Manis", "Alcho Smokey Barbeque Sauce"]
  }
];
