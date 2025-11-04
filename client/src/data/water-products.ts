export interface WaterProduct {
  id: string;
  name: string;
  category: 'kangen' | 'shower-filter' | 'ro-system' | 'starter-kit';
  brand: string;
  price: number;
  originalPrice?: number;
  currency: string;
  description: string;
  features: string[];
  image?: string;
  inStock: boolean;
  freeDelivery: boolean;
  warranty?: string;
  specifications?: Record<string, string>;
}

export const waterProducts: WaterProduct[] = [
  {
    id: 'kangen-k8',
    name: 'Kangen K8 Water Ionizer',
    category: 'kangen',
    brand: 'Enagic',
    price: 19250,
    currency: 'AED',
    description: 'Most powerful Kangen water ionizer with 8 platinum-coated titanium plates',
    features: [
      '8 platinum-coated titanium plates',
      '8-language touchscreen display',
      'Produces 5 types of water (pH 2.5-11.5)',
      'Best antioxidant production',
      'Medical-grade quality',
      '15-year warranty'
    ],
    inStock: true,
    freeDelivery: true,
    warranty: '15 years',
    specifications: {
      'Electrode Plates': '8 platinum-coated titanium',
      'pH Range': '2.5 - 11.5',
      'Water Types': '5',
      'Display': '8-language touchscreen',
      'Origin': 'Made in Japan'
    }
  },
  {
    id: 'kangen-sd501-platinum',
    name: 'LeveLuk SD501 Platinum',
    category: 'kangen',
    brand: 'Enagic',
    price: 15500,
    currency: 'AED',
    description: 'Flagship model with premium finish and advanced features',
    features: [
      '7 platinum-coated titanium plates',
      '5-language voice prompts',
      'LCD control panel',
      'Premium platinum finish',
      'Compact design',
      'ISO certified quality'
    ],
    inStock: true,
    freeDelivery: true,
    warranty: '5 years',
    specifications: {
      'Electrode Plates': '7 platinum-coated titanium',
      'pH Range': '2.5 - 11.5',
      'Water Types': '5',
      'Display': 'LCD with voice',
      'Origin': 'Made in Japan'
    }
  },
  {
    id: 'kangen-sd501',
    name: 'LeveLuk SD501',
    category: 'kangen',
    brand: 'Enagic',
    price: 13200,
    currency: 'AED',
    description: 'Industry-leading flagship model, compact and reliable',
    features: [
      '7 platinum-coated titanium plates',
      'LCD control panel',
      'Compact design',
      'Proven reliability',
      'Energy efficient',
      'Easy maintenance'
    ],
    inStock: true,
    freeDelivery: true,
    warranty: '5 years',
    specifications: {
      'Electrode Plates': '7 platinum-coated titanium',
      'pH Range': '2.5 - 11.5',
      'Water Types': '5',
      'Display': 'LCD panel',
      'Origin': 'Made in Japan'
    }
  },
  {
    id: 'kangen-jr4',
    name: 'LeveLuk Junior IV (JR4)',
    category: 'kangen',
    brand: 'Enagic',
    price: 11550,
    currency: 'AED',
    description: 'Entry-level Kangen water ionizer perfect for smaller households',
    features: [
      '4 platinum-coated titanium plates',
      'Economical option',
      'Perfect for small households',
      'Easy to use',
      'Reliable performance',
      'Free delivery in Dubai'
    ],
    inStock: true,
    freeDelivery: true,
    warranty: '3 years',
    specifications: {
      'Electrode Plates': '4 platinum-coated titanium',
      'pH Range': '8.5 - 9.5',
      'Water Types': '3',
      'Display': 'Basic controls',
      'Origin': 'Made in Japan'
    }
  },
  {
    id: 'aquacafe-shower-filter',
    name: 'AquaCafe 4-Level IONIC Luxury Shower Filter',
    category: 'shower-filter',
    brand: 'AquaCafe',
    price: 199,
    currency: 'AED',
    description: '4-stage filtration system for healthier hair and skin',
    features: [
      'Removes 99% of harmful pollutants',
      'Reduces chlorine content',
      'Prevents hair loss and breakage',
      'Softens skin, reduces dandruff',
      'Saves 30% water cost',
      'Easy DIY installation'
    ],
    inStock: true,
    freeDelivery: true,
    specifications: {
      'Filtration Stages': '4',
      'Technologies': 'Activated Carbon, Maifan Stones, Calcium Sulfite, Vitamin C',
      'Installation': 'Easy DIY - No tools required',
      'Water Savings': '30%'
    }
  },
  {
    id: 'blue-oasis-shower-filter',
    name: 'Blue Oasis TUV Certified Shower Filter',
    category: 'shower-filter',
    brand: 'Blue Oasis',
    price: 359,
    currency: 'AED',
    description: 'TUV certified premium shower filter for Dubai hard water',
    features: [
      'TUV Germany certified',
      'Designed for Dubai hard water',
      'Reduces chlorine and minerals',
      'Protects hair and skin',
      'Professional quality',
      'Durable construction'
    ],
    inStock: true,
    freeDelivery: true,
    specifications: {
      'Certification': 'TUV Germany',
      'Filtration': 'Multi-stage',
      'Designed For': 'Hard water regions',
      'Installation': 'Universal fitting'
    }
  },
  {
    id: 'h2o-pure-blue-shower',
    name: 'H2O Pure Blue Premium Shower Filter',
    category: 'shower-filter',
    brand: 'H2O Pure Blue',
    price: 397.80,
    currency: 'AED',
    description: 'Premium shower filter for hair loss prevention and skin care',
    features: [
      'Prevents hair loss',
      'Reduces skin irritation',
      'Multi-stage filtration',
      'Long-lasting filters',
      'Easy replacement',
      'Free delivery UAE'
    ],
    inStock: true,
    freeDelivery: true,
    specifications: {
      'Filter Life': '6-8 months',
      'Filtration': 'Multi-stage',
      'Target Issues': 'Hair loss, skin irritation',
      'Coverage': 'UAE-wide delivery'
    }
  },
  {
    id: 'ispring-rcc7ak',
    name: 'iSpring RCC7AK 6-Stage RO System',
    category: 'ro-system',
    brand: 'iSpring',
    price: 1384,
    currency: 'AED',
    description: 'NSF certified 6-stage reverse osmosis with alkaline remineralization',
    features: [
      'NSF/ANSI 58 certified',
      '75 GPD capacity',
      'Alkaline pH+ remineralization',
      'Removes 99% contaminants',
      'Removes lead, chlorine, fluoride, PFAS',
      'Easy DIY installation'
    ],
    inStock: true,
    freeDelivery: true,
    warranty: '1 year manufacturer + lifetime support',
    specifications: {
      'Filtration Stages': '6',
      'Daily Capacity': '75 GPD',
      'Certification': 'NSF/ANSI 58 & 372',
      'pH Enhancement': 'Alkaline remineralization',
      'Contaminant Removal': '99% of 1000+ contaminants'
    }
  },
  {
    id: 'ispring-ro500ak',
    name: 'iSpring RO500AK Tankless RO System',
    category: 'ro-system',
    brand: 'iSpring',
    price: 2648,
    currency: 'AED',
    description: 'High-flow tankless system with 500 GPD capacity',
    features: [
      '500 GPD high-flow capacity',
      'Tankless design saves space',
      'Alkaline remineralization',
      'Brushed nickel faucet included',
      '2:1 drain ratio (water efficient)',
      'Fast filtration'
    ],
    inStock: true,
    freeDelivery: true,
    warranty: '1 year manufacturer',
    specifications: {
      'Type': 'Tankless',
      'Daily Capacity': '500 GPD',
      'Drain Ratio': '2:1 (efficient)',
      'pH Enhancement': 'Alkaline remineralization',
      'Installation': 'Under sink'
    }
  },
  {
    id: 'express-water-ro10m',
    name: 'Express Water RO10M 10-Stage RO System',
    category: 'ro-system',
    brand: 'Express Water',
    price: 1840,
    currency: 'AED',
    description: 'Advanced 10-stage reverse osmosis with UV & alkaline for Dubai homes',
    features: [
      '10 filtration stages including UV',
      'Removes 99.99% contaminants',
      'Alkaline & mineral enhancement',
      'LED display with filter status',
      'TDS meter included',
      '100 GPD capacity'
    ],
    inStock: true,
    freeDelivery: true,
    warranty: '1 year',
    specifications: {
      'Filtration Stages': '10 (RO + UV + Alkaline)',
      'Daily Capacity': '100 GPD',
      'Technology': 'UV sterilization + remineralization',
      'Features': 'LED display, TDS meter',
      'Installation': 'Under sink'
    }
  },
  {
    id: 'express-water-dealk',
    name: 'Express Water DEALK Alkaline RO System',
    category: 'ro-system',
    brand: 'Express Water',
    price: 1475,
    currency: 'AED',
    description: '6-stage RO with alkaline remineralization for healthy pH balance',
    features: [
      '6-stage alkaline filtration',
      'Balanced pH 7-9.5',
      'Restores healthy minerals',
      'Clear housing for monitoring',
      'Quick-connect fittings',
      'WQA Gold Seal certified'
    ],
    inStock: true,
    freeDelivery: true,
    warranty: '1 year',
    specifications: {
      'Filtration Stages': '6 with alkaline',
      'pH Range': '7.0 - 9.5',
      'Certification': 'WQA Gold Seal',
      'Features': 'Clear housing, quick-connect',
      'Installation': 'Under sink'
    }
  },
  {
    id: 'express-water-uv11',
    name: 'Express Water UV11 Under Sink System',
    category: 'ro-system',
    brand: 'Express Water',
    price: 2240,
    currency: 'AED',
    description: '11-stage premium system with UV sterilization and alkaline',
    features: [
      '11 advanced filtration stages',
      'UV light sterilization',
      'Alkaline remineralization',
      'Removes bacteria & viruses',
      'Smart LED indicators',
      'Premium quality components'
    ],
    inStock: true,
    freeDelivery: true,
    warranty: '1 year',
    specifications: {
      'Filtration Stages': '11 (RO + UV + Alkaline)',
      'UV Sterilization': 'Yes - kills 99.99% bacteria',
      'pH Enhancement': 'Alkaline filter included',
      'Features': 'LED indicators, premium faucet',
      'Ideal For': 'Large families'
    }
  },
  {
    id: 'ispring-rcc7p',
    name: 'iSpring RCC7P Boosted Performance RO',
    category: 'ro-system',
    brand: 'iSpring',
    price: 1658,
    currency: 'AED',
    description: 'High-performance RO with built-in booster pump for low pressure',
    features: [
      'Built-in booster pump',
      'Works with low water pressure',
      '75 GPD capacity',
      '5-stage filtration',
      'NSF certified components',
      'Efficient production rate'
    ],
    inStock: true,
    freeDelivery: true,
    warranty: '1 year + lifetime support',
    specifications: {
      'Filtration Stages': '5',
      'Daily Capacity': '75 GPD',
      'Pump': 'Built-in booster (50 PSI)',
      'Certification': 'NSF components',
      'Best For': 'Low pressure areas'
    }
  },
  {
    id: 'ispring-rcc1up',
    name: 'iSpring RCC1UP 7-Stage UV RO System',
    category: 'ro-system',
    brand: 'iSpring',
    price: 2192,
    currency: 'AED',
    description: 'Premium 7-stage system with UV and alkaline for maximum protection',
    features: [
      'UV sterilization (11-watt)',
      'Alkaline remineralization',
      '100 GPD capacity',
      'Kills 99.99% bacteria & viruses',
      'Designer faucet included',
      'Perfect for Dubai water'
    ],
    inStock: true,
    freeDelivery: true,
    warranty: '1 year + lifetime support',
    specifications: {
      'Filtration Stages': '7 (RO + UV + Alkaline)',
      'Daily Capacity': '100 GPD',
      'UV Power': '11-watt sterilization',
      'pH Enhancement': 'Alkaline filter',
      'Certification': 'NSF/ANSI certified'
    }
  },
  {
    id: 'aquacafe-starter-kit',
    name: 'AquaCafe Starter Kit - Special Offer',
    category: 'starter-kit',
    brand: 'AquaCafe',
    price: 99,
    originalPrice: 1698,
    currency: 'AED',
    description: 'Complete water filtration starter package with installation',
    features: [
      'Shower filter included',
      'Professional installation service',
      'FREE AquaCafe Loyalty membership',
      'Digital voucher worth AED 99',
      'Remove chlorine & heavy metals',
      'Instant health benefits'
    ],
    inStock: true,
    freeDelivery: true,
    specifications: {
      'Package Includes': 'Shower filter + installation',
      'Membership': 'FREE AquaCafe Loyalty',
      'Bonus': 'AED 99 digital voucher',
      'Savings': '94% off (Limited time)'
    }
  }
];

export const getProductsByCategory = (category: WaterProduct['category']) => {
  return waterProducts.filter(product => product.category === category);
};

export const getProductById = (id: string) => {
  return waterProducts.find(product => product.id === id);
};

export const getKangenProducts = () => getProductsByCategory('kangen');
export const getShowerFilters = () => getProductsByCategory('shower-filter');
export const getROSystems = () => getProductsByCategory('ro-system');
export const getStarterKits = () => getProductsByCategory('starter-kit');
