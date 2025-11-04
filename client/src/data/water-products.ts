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
