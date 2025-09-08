// Icelandic Glacial Product Catalog for DeliWer.com
// Complete product lineup with pricing, specifications, and targeting

export interface IcelandicGlacialProduct {
  id: string;
  name: string;
  size: string;
  volume: string;
  category: 'still' | 'sparkling' | 'glass' | 'multipack' | 'flavored';
  packaging: 'rPET' | 'glass' | 'PET';
  targetAudience: string;
  keyFeatures: string[];
  flavorProfile?: string;
  awards?: string[];
  pricing: {
    regular: number;
    member: number;
    currency: string;
  };
  image: string;
  isNew?: boolean;
  isPremium?: boolean;
  sustainability: {
    recyclable: boolean;
    carbonNeutral: boolean;
    bpaFree: boolean;
  };
  description: string;
}

export const icelandicGlacialProducts: IcelandicGlacialProduct[] = [
  // Still Water Collection (rPET Bottles)
  {
    id: 'ig-330ml',
    name: 'Icelandic Glacial 330ml',
    size: '330ml',
    volume: '11.1 fl oz',
    category: 'still',
    packaging: 'rPET',
    targetAudience: 'On-the-go hydration, personal consumption',
    keyFeatures: ['Compact size', 'Perfect for travel', 'Daily hydration', 'BPA-free rPET bottle'],
    pricing: {
      regular: 8.50,
      member: 7.20,
      currency: 'AED'
    },
    image: '/icelandic_glacial_330ml_1757348358063.png',
    sustainability: {
      recyclable: true,
      carbonNeutral: true,
      bpaFree: true
    },
    description: 'Perfect personal size for on-the-go hydration. Sourced from Iceland\'s legendary Ölfus Spring, naturally alkaline with pH 8.4.'
  },
  {
    id: 'ig-500ml',
    name: 'Icelandic Glacial 500ml',
    size: '500ml',
    volume: '16.9 fl oz',
    category: 'still',
    packaging: 'rPET',
    targetAudience: 'Active lifestyle, gym, office',
    keyFeatures: ['Ideal portion size', 'Moderate hydration needs', 'Active lifestyle', 'Signature glacier-inspired design'],
    pricing: {
      regular: 12.00,
      member: 10.20,
      currency: 'AED'
    },
    image: '/icelandic_glacial_500ml_1757348358064.png',
    sustainability: {
      recyclable: true,
      carbonNeutral: true,
      bpaFree: true
    },
    description: 'Ideal for active lifestyles and office hydration. Naturally filtered through layers of lava rock for 5,000 years.'
  },
  {
    id: 'ig-750ml',
    name: 'Icelandic Glacial 750ml',
    size: '750ml',
    volume: '25.3 fl oz',
    category: 'still',
    packaging: 'rPET',
    targetAudience: 'Sharing, family meals, extended activities',
    keyFeatures: ['Premium size', 'Longer hydration periods', 'Family sharing', 'Glacier-inspired neck design'],
    pricing: {
      regular: 16.50,
      member: 14.00,
      currency: 'AED'
    },
    image: '/icelandic_glacial_750ml_1757348358065.png',
    sustainability: {
      recyclable: true,
      carbonNeutral: true,
      bpaFree: true
    },
    description: 'Premium sharing size perfect for family meals and extended activities. Exceptionally pure with naturally low mineral content.'
  },
  {
    id: 'ig-1l',
    name: 'Icelandic Glacial 1L',
    size: '1L',
    volume: '33.8 fl oz',
    category: 'still',
    packaging: 'rPET',
    targetAudience: 'Family consumption, office sharing',
    keyFeatures: ['Large capacity', 'Extended use', 'Family size', 'Cost-effective'],
    pricing: {
      regular: 22.00,
      member: 18.70,
      currency: 'AED'
    },
    image: '/icelandic_glacial_1L_1757348358062.png',
    sustainability: {
      recyclable: true,
      carbonNeutral: true,
      bpaFree: true
    },
    description: 'Large capacity for family consumption and office sharing. World\'s first bottled water certified CarbonNeutral™.'
  },
  {
    id: 'ig-1-5l',
    name: 'Icelandic Glacial 1.5L',
    size: '1.5L',
    volume: '50.7 fl oz',
    category: 'still',
    packaging: 'rPET',
    targetAudience: 'Family size, bulk consumption',
    keyFeatures: ['Maximum capacity', 'Family groups', 'Bulk consumption', 'Best value per ml'],
    pricing: {
      regular: 28.00,
      member: 23.80,
      currency: 'AED'
    },
    image: '/icelandic_glacial_1_5L_1757348358045.png',
    sustainability: {
      recyclable: true,
      carbonNeutral: true,
      bpaFree: true
    },
    description: 'Maximum family size for bulk consumption. From one of the world\'s most pristine ecosystems with 128,000 acre protected zone.'
  },

  // Multipack Options
  {
    id: 'ig-6x500ml',
    name: 'Icelandic Glacial 6 x 500ml Multipack',
    size: '6 x 500ml',
    volume: '6 x 16.9 fl oz',
    category: 'multipack',
    packaging: 'rPET',
    targetAudience: 'Bulk buyers, families, offices',
    keyFeatures: ['Convenient packaging', 'Cost-effective', 'Stunning graphics', 'Reduced packaging waste'],
    pricing: {
      regular: 65.00,
      member: 55.25,
      currency: 'AED'
    },
    image: '/icelandic_glacial_6x500ml_multipack_1757348358062.png',
    sustainability: {
      recyclable: true,
      carbonNeutral: true,
      bpaFree: true
    },
    description: 'Convenient 6-pack for families and offices. Bulk packaging reduces waste while maintaining premium quality.'
  },
  {
    id: 'ig-6x1000ml',
    name: 'Icelandic Glacial 6 x 1000ml Multipack',
    size: '6 x 1000ml',
    volume: '6 x 33.8 fl oz',
    category: 'multipack',
    packaging: 'rPET',
    targetAudience: 'Heavy consumers, commercial use',
    keyFeatures: ['Maximum value pack', 'Commercial use', 'Bulk savings', 'Professional packaging'],
    pricing: {
      regular: 120.00,
      member: 102.00,
      currency: 'AED'
    },
    image: '/icelandic_glacial_6x1000ml_multipack_1757348358062.png',
    sustainability: {
      recyclable: true,
      carbonNeutral: true,
      bpaFree: true
    },
    description: 'Maximum value 6-pack for heavy consumers and commercial use. Optimal cost per liter with premium presentation.'
  },

  // Premium Glass Collection - Still
  {
    id: 'ig-glass-still-330ml',
    name: 'Icelandic Glacial Glass Still 330ml',
    size: '330ml',
    volume: '11.1 fl oz',
    category: 'glass',
    packaging: 'glass',
    targetAudience: 'Fine dining, premium hospitality',
    keyFeatures: ['Iconic glass bottle', 'Premium presentation', 'High-end restaurants', 'Signature design'],
    pricing: {
      regular: 35.00,
      member: 29.75,
      currency: 'AED'
    },
    image: '/icelandic_glacial_glass_still_330ml_1757348358070.png',
    isPremium: true,
    sustainability: {
      recyclable: true,
      carbonNeutral: true,
      bpaFree: true
    },
    description: 'Iconic glass bottle for premium hospitality. Preferred by leading chefs and sommeliers worldwide.'
  },
  {
    id: 'ig-glass-still-750ml',
    name: 'Icelandic Glacial Glass Still 750ml',
    size: '750ml',
    volume: '25.3 fl oz',
    category: 'glass',
    packaging: 'glass',
    targetAudience: 'Fine dining, premium hospitality',
    keyFeatures: ['Large glass format', 'Sharing size', 'Luxury hotels', 'Restaurant quality'],
    pricing: {
      regular: 65.00,
      member: 55.25,
      currency: 'AED'
    },
    image: '/icelandic_glacial_glass_still_750ml_1757348358071.png',
    isPremium: true,
    sustainability: {
      recyclable: true,
      carbonNeutral: true,
      bpaFree: true
    },
    description: 'Premium glass sharing size for fine dining establishments. Multi-award winning water preferred by luxury resorts.'
  },

  // Premium Glass Collection - Sparkling
  {
    id: 'ig-glass-sparkling-330ml',
    name: 'Icelandic Glacial Glass Sparkling 330ml',
    size: '330ml',
    volume: '11.1 fl oz',
    category: 'glass',
    packaging: 'glass',
    targetAudience: 'Fine dining, premium hospitality',
    keyFeatures: ['Lightly carbonated', 'Naturally low minerals', 'Award-winning taste', 'Premium glass bottle'],
    awards: ['Superior Taste Awards 2016 - Top Honor'],
    pricing: {
      regular: 38.00,
      member: 32.30,
      currency: 'AED'
    },
    image: '/icelandic_glacial_glass_sparkling_330ml_1757348358066.png',
    isPremium: true,
    sustainability: {
      recyclable: true,
      carbonNeutral: true,
      bpaFree: true
    },
    description: 'Award-winning sparkling water in iconic glass bottle. Lightly carbonated with naturally low mineral content, winner of Superior Taste Awards.'
  },
  {
    id: 'ig-glass-sparkling-750ml',
    name: 'Icelandic Glacial Glass Sparkling 750ml',
    size: '750ml',
    volume: '25.3 fl oz',
    category: 'glass',
    packaging: 'glass',
    targetAudience: 'Fine dining, premium hospitality',
    keyFeatures: ['Large sparkling format', 'Sharing size', 'Award-winning', 'Restaurant grade'],
    awards: ['Superior Taste Awards 2016 - Top Honor'],
    pricing: {
      regular: 70.00,
      member: 59.50,
      currency: 'AED'
    },
    image: '/icelandic_glacial_glass_sparkling_750ml_1757348358067.png',
    isPremium: true,
    sustainability: {
      recyclable: true,
      carbonNeutral: true,
      bpaFree: true
    },
    description: 'Large format award-winning sparkling water for premium sharing. Perfect for fine dining and special occasions.'
  },

  // Sparkling Flavored Collection
  {
    id: 'ig-sparkling-classic',
    name: 'Icelandic Glacial Sparkling Classic',
    size: '500ml',
    volume: '16.9 fl oz',
    category: 'sparkling',
    packaging: 'PET',
    targetAudience: 'Health-conscious consumers seeking soda alternatives',
    keyFeatures: ['Zero calories', 'Zero sugar', 'Award-winning', 'Perfect for on-the-go'],
    pricing: {
      regular: 15.00,
      member: 12.75,
      currency: 'AED'
    },
    image: '/icelandic_glacial_sparkling_classic_1757348358072.png',
    sustainability: {
      recyclable: true,
      carbonNeutral: true,
      bpaFree: true
    },
    description: 'Classic sparkling water with zero calories and zero sugar. Perfect healthy alternative to soda with natural alkalinity.'
  },
  {
    id: 'ig-sparkling-sicilian-lemon',
    name: 'Icelandic Glacial Sparkling Sicilian Lemon',
    size: '500ml',
    volume: '16.9 fl oz',
    category: 'flavored',
    packaging: 'PET',
    targetAudience: 'Flavor enthusiasts, health-conscious consumers',
    keyFeatures: ['Zero calories', 'Zero sugar', 'Exotic citrus tang', 'Hint of sweet'],
    flavorProfile: 'Crisp, refreshing taste of summer year-round',
    pricing: {
      regular: 16.50,
      member: 14.00,
      currency: 'AED'
    },
    image: '/icelandic_glacial_sparkling_sicilian_lemon_1757348358074.png',
    sustainability: {
      recyclable: true,
      carbonNeutral: true,
      bpaFree: true
    },
    description: 'Exotic Sicilian lemon flavor with zero calories. Crisp citrus tang with a hint of sweetness brings summer freshness year-round.'
  },
  {
    id: 'ig-sparkling-tahitian-lime',
    name: 'Icelandic Glacial Sparkling Tahitian Lime',
    size: '500ml',
    volume: '16.9 fl oz',
    category: 'flavored',
    packaging: 'PET',
    targetAudience: 'Soda alternative seekers',
    keyFeatures: ['Zero calories', 'Zero sugar', 'Perfect balance', 'Zesty and sweet'],
    flavorProfile: 'Great alternative to soda',
    pricing: {
      regular: 16.50,
      member: 14.00,
      currency: 'AED'
    },
    image: '/icelandic_glacial_sparkling_tahitian_lime_1757348358074.png',
    sustainability: {
      recyclable: true,
      carbonNeutral: true,
      bpaFree: true
    },
    description: 'Tahitian lime flavor with perfect balance of zesty and sweet. The ideal healthy replacement for traditional sodas.'
  },
  {
    id: 'ig-sparkling-elderflower',
    name: 'Icelandic Glacial Sparkling Elderflower',
    size: '500ml',
    volume: '16.9 fl oz',
    category: 'flavored',
    packaging: 'PET',
    targetAudience: 'Premium cocktail enthusiasts, sophisticated palates',
    keyFeatures: ['Zero calories', 'Zero sugar', 'Delicate floral taste', 'Excellent mixer'],
    flavorProfile: 'Pure refreshment, excellent for cocktails',
    pricing: {
      regular: 17.00,
      member: 14.45,
      currency: 'AED'
    },
    image: '/icelandic_glacial_sparkling_elderflower_1757348358072.png',
    sustainability: {
      recyclable: true,
      carbonNeutral: true,
      bpaFree: true
    },
    description: 'Sophisticated elderflower with delicate floral notes. Perfect for refined palates and as a premium cocktail mixer.'
  },
  {
    id: 'ig-sparkling-blood-orange',
    name: 'Icelandic Glacial Sparkling Tarocco Blood Orange',
    size: '500ml',
    volume: '16.9 fl oz',
    category: 'flavored',
    packaging: 'PET',
    targetAudience: 'Adventurous flavor seekers',
    keyFeatures: ['Zero calories', 'Zero sugar', 'Unique citrus experience', 'Rich complexity'],
    flavorProfile: 'Rich, complex orange flavor',
    pricing: {
      regular: 17.50,
      member: 14.90,
      currency: 'AED'
    },
    image: '/icelandic_glacial_sparkling_tarocco_blood_orange_1757348358075.png',
    isNew: true,
    sustainability: {
      recyclable: true,
      carbonNeutral: true,
      bpaFree: true
    },
    description: 'NEW! Rich and complex Tarocco blood orange flavor. A unique citrus experience for adventurous taste explorers.'
  },
  {
    id: 'ig-sparkling-lemongrass',
    name: 'Icelandic Glacial Sparkling Indonesian Lemongrass',
    size: '500ml',
    volume: '16.9 fl oz',
    category: 'flavored',
    packaging: 'PET',
    targetAudience: 'Exotic flavor enthusiasts',
    keyFeatures: ['Zero calories', 'Zero sugar', 'Unique herbal refreshment', 'Exotic taste'],
    flavorProfile: 'Refreshing herbal notes',
    pricing: {
      regular: 17.50,
      member: 14.90,
      currency: 'AED'
    },
    image: '/icelandic_glacial_sparkling_indonesian_lemongrass_1757348358073.png',
    isNew: true,
    sustainability: {
      recyclable: true,
      carbonNeutral: true,
      bpaFree: true
    },
    description: 'NEW! Exotic Indonesian lemongrass with refreshing herbal notes. A unique flavor journey from Southeast Asia.'
  }
];

// Product filtering and categorization helpers
export const productCategories = {
  still: 'Still Water',
  sparkling: 'Sparkling Water',
  flavored: 'Flavored Sparkling',
  glass: 'Premium Glass',
  multipack: 'Multipack Options'
};

export const packagingTypes = {
  rPET: 'Recyclable Plastic',
  glass: 'Premium Glass',
  PET: 'Plastic Bottle'
};

// Sustainability features
export const sustainabilityFeatures = [
  'World\'s first CarbonNeutral™ certified water',
  '100% recyclable packaging',
  'BPA-free bottles',
  '128,000 acre protected exclusion zone',
  '100% renewable energy facility',
  'Naturally alkaline pH 8.4',
  'Low mineral content (62ppm TDS)',
  'Filtered through lava rock for 5,000 years'
];

// Brand story highlights
export const brandStory = {
  source: 'Legendary Ölfus Spring, Iceland',
  heritage: '5,000 years of natural filtration through lava rock',
  purity: 'Exceptionally pure and naturally alkaline water',
  sustainability: 'World\'s first bottled water certified CarbonNeutral™',
  quality: 'Multi-award winning, recognized by leading chefs',
  protection: '128,000 acre exclusion zone protecting the source',
  ph: '8.4 - Naturally alkaline',
  minerals: 'Naturally low mineral content (TDS of 62ppm)'
};