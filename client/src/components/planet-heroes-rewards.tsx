import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { 
  Trophy, 
  Gift, 
  Star, 
  Droplets, 
  Zap, 
  Smartphone,
  Coffee,
  Utensils,
  ShoppingBag,
  Target,
  Award,
  TrendingUp,
  Globe,
  Sparkles,
  ArrowRight,
  CheckCircle,
  Users,
  Building,
  Home,
  Package,
  Clock,
  Truck
} from "lucide-react";
import deliwerLogoPath from "@assets/deliwer logo_1755631863675.png";

interface Product {
  id: string;
  name: string;
  image: string;
  points: number;
  value: string;
  category: 'tech' | 'water' | 'food' | 'lifestyle';
  available: boolean;
  popular?: boolean;
}

interface Step {
  number: number;
  title: string;
  description: string;
  icon: any;
  color: string;
}

const ecoProducts: Product[] = [
  {
    id: 'iphone17',
    name: 'iPhone 17 Pro Max',
    image: '/iphone17-pro.jpg',
    points: 45000,
    value: 'AED 4,999',
    category: 'tech',
    available: true,
    popular: true
  },
  {
    id: 'aquacafe-system',
    name: 'AquaCafe Premium Water System',
    image: '/aquacafe-system.jpg',
    points: 15000,
    value: 'AED 1,299',
    category: 'water',
    available: true,
    popular: true
  },
  {
    id: 'kangen-water',
    name: 'Kangen Water Monthly Supply',
    image: '/kangen-water.jpg',
    points: 2500,
    value: 'AED 199/month',
    category: 'water',
    available: true
  },
  {
    id: 'bakers-meals',
    name: "Bakers Kitchen Healthy Meal Plan",
    image: '/bakers-meals.jpg',
    points: 3500,
    value: 'AED 299/week',
    category: 'food',
    available: true
  },
  {
    id: 'iceland-water',
    name: 'Icelandic Mineral Water Case',
    image: '/iceland-water.jpg',
    points: 800,
    value: 'AED 89',
    category: 'water',
    available: true
  },
  {
    id: 'aquacafe-filter',
    name: 'AquaCafe Shower Filter',
    image: '/shower-filter.jpg',
    points: 1200,
    value: 'AED 149 (Gift in Starter Kit)',
    category: 'water',
    available: true
  }
];

const participationSteps: Step[] = [
  {
    number: 1,
    title: "Start at Home",
    description: "Exchange your old iPhone for AquaCafe products with instant rewards and Planet Points",
    icon: Smartphone,
    color: "from-blue-500 to-cyan-500"
  },
  {
    number: 2,
    title: "Earn Planet Points",
    description: "Continue earning through missions, challenges, and eco-friendly actions",
    icon: Target,
    color: "from-green-500 to-emerald-500"
  },
  {
    number: 3,
    title: "Redeem & Evolve",
    description: "Use points in our evolving ecosystem of partner campaigns and store credit",
    icon: Trophy,
    color: "from-amber-500 to-orange-500"
  }
];

function CategoryIcon({ category }: { category: string }) {
  switch (category) {
    case 'tech':
      return <Smartphone className="w-5 h-5" />;
    case 'water':
      return <Droplets className="w-5 h-5" />;
    case 'food':
      return <Utensils className="w-5 h-5" />;
    default:
      return <Gift className="w-5 h-5" />;
  }
}

function ProductCard({ product }: { product: Product }) {
  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      className="relative glass rounded-2xl p-6 border border-slate-600 bg-gradient-to-br from-slate-800/50 to-slate-900/50 backdrop-blur-sm"
      data-testid={`product-${product.id}`}
    >
      {product.popular && (
        <div className="absolute -top-2 -right-2 bg-gradient-to-r from-amber-500 to-orange-500 text-black px-3 py-1 rounded-full text-xs font-bold">
          <Sparkles className="w-3 h-3 inline mr-1" />
          POPULAR
        </div>
      )}
      
      <div className="flex items-center gap-3 mb-4">
        <div className={`p-2 rounded-lg bg-gradient-to-r ${
          product.category === 'tech' ? 'from-blue-500/20 to-cyan-500/20 border border-blue-500/30' :
          product.category === 'water' ? 'from-blue-500/20 to-teal-500/20 border border-blue-500/30' :
          product.category === 'food' ? 'from-green-500/20 to-emerald-500/20 border border-green-500/30' :
          'from-purple-500/20 to-pink-500/20 border border-purple-500/30'
        }`}>
          <CategoryIcon category={product.category} />
        </div>
        <div>
          <h3 className="font-bold text-white text-sm">{product.name}</h3>
          <p className="text-gray-400 text-xs">{product.value}</p>
        </div>
      </div>

      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center gap-2">
          <Star className="w-4 h-4 text-amber-500" />
          <span className="font-bold text-amber-500">{product.points.toLocaleString()}</span>
          <span className="text-gray-400 text-xs">points</span>
        </div>
        {product.available ? (
          <Badge className="bg-green-500/20 text-green-400 border-green-500/30">Available</Badge>
        ) : (
          <Badge className="bg-red-500/20 text-red-400 border-red-500/30">Coming Soon</Badge>
        )}
      </div>

      <Button 
        className="w-full bg-gradient-to-r from-hero-green-500 to-blue-500 hover:from-hero-green-600 hover:to-blue-600 text-black font-bold"
        disabled={!product.available}
        data-testid={`redeem-${product.id}`}
      >
        {product.available ? 'Redeem Now' : 'Notify Me'}
        <ArrowRight className="w-4 h-4 ml-2" />
      </Button>
    </motion.div>
  );
}

function ParticipationStep({ step, index }: { step: Step; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -50 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: index * 0.2 }}
      className="relative"
    >
      <div className="flex items-start gap-4">
        <div className={`flex-shrink-0 w-16 h-16 rounded-2xl bg-gradient-to-r ${step.color} flex items-center justify-center shadow-lg`}>
          <step.icon className="w-8 h-8 text-white" />
        </div>
        <div className="flex-1">
          <h3 className="text-xl font-bold text-white mb-2">
            Step {step.number}: {step.title}
          </h3>
          <p className="text-gray-300 leading-relaxed">{step.description}</p>
        </div>
      </div>
      
      {index < participationSteps.length - 1 && (
        <div className="absolute left-8 top-16 w-0.5 h-16 bg-gradient-to-b from-slate-600 to-transparent"></div>
      )}
    </motion.div>
  );
}

export function PlanetHeroesRewards() {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [userPoints] = useState(12450);
  
  const filteredProducts = selectedCategory === 'all' 
    ? ecoProducts 
    : ecoProducts.filter(p => p.category === selectedCategory);

  const categories = [
    { id: 'all', name: 'All Rewards', icon: Gift },
    { id: 'tech', name: 'Tech', icon: Smartphone },
    { id: 'water', name: 'Water', icon: Droplets },
    { id: 'food', name: 'Food', icon: Utensils },
  ];

  return (
    <div className="py-16 px-4 relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-purple-900/10 to-blue-900/10"></div>
      <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-[800px] h-[400px] bg-gradient-to-r from-amber-500/5 to-orange-500/5 rounded-full blur-3xl"></div>
      
      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header with DeliWer Branding */}
        <div className="text-center mb-12">
          {/* DeliWer Logo & Step 3 Badge */}
          <div className="flex items-center justify-center gap-6 mb-8">
            <img 
              src={deliwerLogoPath} 
              alt="DeliWer" 
              className="h-16 w-auto"
            />
            <div className="inline-flex items-center bg-gradient-to-r from-amber-500/30 to-orange-500/30 border border-amber-400/50 rounded-2xl px-8 py-4 shadow-lg backdrop-blur-sm">
              <Trophy className="w-6 h-6 text-amber-300 mr-3" />
              <span className="text-amber-200 font-black text-lg tracking-wide">STEP 3: REDEEM & EVOLVE</span>
            </div>
          </div>
          
          {/* Main Heading */}
          <h2 className="text-5xl md:text-7xl font-black mb-6 leading-tight">
            <span className="bg-gradient-to-r from-amber-400 via-orange-400 to-red-400 bg-clip-text text-transparent">
              PLANET REWARDS
            </span>
          </h2>
          
          {/* USP Highlight */}
          <div className="glass rounded-3xl p-8 border border-hero-green-500/50 bg-gradient-to-r from-hero-green-500/10 to-blue-500/10 backdrop-blur-sm max-w-4xl mx-auto mb-8">
            <div className="flex items-center justify-center gap-4 mb-4">
              <Home className="w-8 h-8 text-hero-green-400" />
              <span className="text-3xl font-black text-white">All at the convenience of your home</span>
              <Package className="w-8 h-8 text-blue-400" />
            </div>
            <div className="flex items-center justify-center gap-8 text-lg text-gray-300">
              <div className="flex items-center gap-2">
                <Truck className="w-5 h-5 text-hero-green-400" />
                <span>Free Delivery</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-5 h-5 text-blue-400" />
                <span>Same Day</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-amber-400" />
                <span>Instant Rewards</span>
              </div>
            </div>
          </div>
        </div>

        {/* Visual Points Display */}
        <div className="flex items-center justify-center gap-8 mb-12">
          <motion.div 
            className="glass rounded-3xl p-6 border border-amber-500/50 bg-gradient-to-r from-amber-500/20 to-orange-500/20 backdrop-blur-sm"
            whileHover={{ scale: 1.05 }}
          >
            <div className="text-center">
              <Star className="w-8 h-8 text-amber-400 mx-auto mb-2" />
              <div className="text-3xl font-black text-amber-400">{userPoints.toLocaleString()}</div>
              <div className="text-sm text-gray-300">Your Points</div>
            </div>
          </motion.div>
          
          <div className="text-4xl text-amber-400">→</div>
          
          <motion.div 
            className="glass rounded-3xl p-6 border border-hero-green-500/50 bg-gradient-to-r from-hero-green-500/20 to-emerald-500/20 backdrop-blur-sm"
            whileHover={{ scale: 1.05 }}
          >
            <div className="text-center">
              <Gift className="w-8 h-8 text-hero-green-400 mx-auto mb-2" />
              <div className="text-3xl font-black text-hero-green-400">AED 1,245</div>
              <div className="text-sm text-gray-300">Reward Value</div>
            </div>
          </motion.div>
        </div>

        {/* Category Filters - Visual */}
        <div className="flex flex-wrap justify-center gap-4 mb-8">
          {categories.map((category) => (
            <motion.button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`flex items-center gap-3 px-8 py-4 rounded-2xl font-bold transition-all ${
                selectedCategory === category.id
                  ? 'bg-gradient-to-r from-hero-green-500 to-blue-500 text-black shadow-xl'
                  : 'glass border border-slate-600 text-gray-300 hover:border-hero-green-500/50'
              }`}
            >
              <category.icon className="w-6 h-6" />
              {category.name}
            </motion.button>
          ))}
        </div>

        {/* Product Grid - Visual Focus */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {filteredProducts.map((product, index) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ scale: 1.02, y: -5 }}
              className="relative glass rounded-3xl p-8 border border-slate-600 bg-gradient-to-br from-slate-800/50 to-slate-900/50 backdrop-blur-sm shadow-2xl"
            >
              {product.popular && (
                <div className="absolute -top-4 -right-4 bg-gradient-to-r from-amber-500 to-orange-500 text-black px-4 py-2 rounded-2xl text-sm font-black shadow-lg">
                  <Sparkles className="w-4 h-4 inline mr-1" />
                  POPULAR
                </div>
              )}
              
              {/* Product Visual */}
              <div className="text-center mb-6">
                <div className={`w-20 h-20 mx-auto rounded-3xl bg-gradient-to-r ${
                  product.category === 'tech' ? 'from-blue-500 to-cyan-500' :
                  product.category === 'water' ? 'from-blue-500 to-teal-500' :
                  product.category === 'food' ? 'from-green-500 to-emerald-500' :
                  'from-purple-500 to-pink-500'
                } flex items-center justify-center mb-4 shadow-lg`}>
                  <CategoryIcon category={product.category} />
                </div>
                <h3 className="font-black text-white text-xl mb-2">{product.name}</h3>
                <p className="text-gray-400 text-lg">{product.value}</p>
              </div>

              {/* Points Display */}
              <div className="flex items-center justify-center gap-3 mb-6">
                <Star className="w-6 h-6 text-amber-500" />
                <span className="font-black text-amber-500 text-2xl">{product.points.toLocaleString()}</span>
                <span className="text-gray-400">pts</span>
              </div>

              {/* Redeem Button */}
              <Button 
                className="w-full bg-gradient-to-r from-hero-green-500 to-blue-500 hover:from-hero-green-600 hover:to-blue-600 text-black font-black py-6 text-lg shadow-xl transform hover:scale-105 transition-all"
                disabled={!product.available}
              >
                {product.available ? 'REDEEM NOW' : 'COMING SOON'}
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </motion.div>
          ))}
        </div>

        {/* Main CTA - Conversion Focused */}
        <div className="text-center">
          <motion.div 
            className="glass rounded-3xl p-12 border border-hero-green-500/50 bg-gradient-to-r from-hero-green-500/20 to-blue-500/20 backdrop-blur-sm max-w-4xl mx-auto"
            whileHover={{ scale: 1.02 }}
          >
            <div className="flex items-center justify-center gap-4 mb-8">
              <img src={deliwerLogoPath} alt="DeliWer" className="h-12 w-auto" />
              <div className="text-4xl font-black text-white">×</div>
              <Droplets className="w-12 h-12 text-blue-400" />
              <div className="text-2xl font-bold text-blue-400">AquaCafe</div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
              <div className="text-center">
                <Home className="w-12 h-12 text-hero-green-400 mx-auto mb-4" />
                <div className="text-xl font-bold text-white">Home Delivery</div>
              </div>
              <div className="text-center">
                <Clock className="w-12 h-12 text-blue-400 mx-auto mb-4" />
                <div className="text-xl font-bold text-white">Same Day</div>
              </div>
              <div className="text-center">
                <Gift className="w-12 h-12 text-amber-400 mx-auto mb-4" />
                <div className="text-xl font-bold text-white">Instant Rewards</div>
              </div>
            </div>

            <Button 
              size="lg" 
              className="bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-black font-black px-12 py-6 text-xl shadow-2xl transform hover:scale-105 transition-all"
            >
              <Trophy className="w-6 h-6 mr-3" />
              START REDEEMING NOW
              <ArrowRight className="w-6 h-6 ml-3" />
            </Button>
          </motion.div>
        </div>
      </div>
    </div>
  );
}