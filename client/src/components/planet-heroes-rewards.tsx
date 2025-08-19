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
  Building
} from "lucide-react";

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
    title: "Collect Planet Points",
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
  const [userPoints] = useState(12450); // Mock user points
  
  const filteredProducts = selectedCategory === 'all' 
    ? ecoProducts 
    : ecoProducts.filter(p => p.category === selectedCategory);

  const categories = [
    { id: 'all', name: 'All Products', icon: ShoppingBag },
    { id: 'tech', name: 'Technology', icon: Smartphone },
    { id: 'water', name: 'Water Systems', icon: Droplets },
    { id: 'food', name: 'Healthy Food', icon: Utensils },
  ];

  return (
    <div className="py-16 px-4 relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-purple-900/20 to-blue-900/20"></div>
      <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-96 h-96 bg-gradient-to-r from-hero-green-500/10 to-blue-500/10 rounded-full blur-3xl"></div>
      
      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="flex items-center justify-center gap-3 mb-6">
            <Trophy className="w-8 h-8 text-amber-500" />
            <div className="inline-flex items-center bg-gradient-to-r from-amber-500/30 to-orange-500/30 border border-amber-400/50 rounded-full px-6 py-2 shadow-lg backdrop-blur-sm">
              <Sparkles className="w-4 h-4 text-amber-300 mr-2" />
              <span className="text-amber-200 font-bold text-sm tracking-wide">DUBAI ENVIRONMENTAL CHAMPIONS</span>
              <Sparkles className="w-4 h-4 text-amber-300 ml-2" />
            </div>
            <Award className="w-8 h-8 text-amber-500" />
          </div>
          
          <h2 className="text-4xl md:text-6xl font-black mb-6 leading-tight">
            <span className="bg-gradient-to-r from-amber-400 via-orange-400 to-red-400 bg-clip-text text-transparent">
              PLANET HEROES REWARDS
            </span>
          </h2>
          
          <p className="text-xl text-gray-300 max-w-4xl mx-auto mb-8 leading-relaxed">
            Rewarding Dubai Environmental Champions (Planet Heroes) with exclusive offers from 
            <strong className="text-hero-green-400"> AquaCafe</strong> and Partners like 
            <strong className="text-blue-400"> Bakers Kitchen</strong> and more
          </p>

          {/* Starter Kit Value Highlight */}
          <div className="glass rounded-2xl p-6 border border-amber-500/50 bg-gradient-to-r from-amber-500/10 to-orange-500/10 backdrop-blur-sm max-w-2xl mx-auto mb-8">
            <div className="flex items-center justify-center gap-3 mb-4">
              <Gift className="w-6 h-6 text-amber-400" />
              <span className="text-2xl font-bold text-white">Starter Kit Value</span>
            </div>
            <div className="text-4xl font-black text-amber-400 mb-2">AED 1,000+</div>
            <p className="text-gray-300">Including AquaCafe Shower Filter Gift & Premium Welcome Package</p>
          </div>

          {/* User Points Display */}
          <div className="flex items-center justify-center gap-6 mb-12">
            <div className="glass rounded-2xl p-4 border border-hero-green-500/50 bg-gradient-to-r from-hero-green-500/10 to-blue-500/10 backdrop-blur-sm">
              <div className="flex items-center gap-2">
                <Star className="w-5 h-5 text-amber-500" />
                <span className="text-lg text-gray-300">Your Planet Points:</span>
                <span className="text-2xl font-bold text-amber-400">{userPoints.toLocaleString()}</span>
              </div>
            </div>
            <div className="glass rounded-2xl p-4 border border-purple-500/50 bg-gradient-to-r from-purple-500/10 to-pink-500/10 backdrop-blur-sm">
              <div className="flex items-center gap-2">
                <Users className="w-5 h-5 text-purple-400" />
                <span className="text-lg text-gray-300">Active Heroes:</span>
                <span className="text-2xl font-bold text-purple-400">12,847</span>
              </div>
            </div>
          </div>
        </div>

        {/* How It Works Section */}
        <div className="mb-16">
          <h3 className="text-3xl font-bold text-center text-white mb-12">
            <Globe className="inline w-8 h-8 text-hero-green-500 mr-3" />
            How Participation Works
          </h3>
          
          <div className="space-y-12 max-w-4xl mx-auto">
            {participationSteps.map((step, index) => (
              <ParticipationStep key={step.number} step={step} index={index} />
            ))}
          </div>
        </div>

        {/* Product Categories */}
        <div className="mb-8">
          <div className="flex flex-wrap justify-center gap-4 mb-8">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`flex items-center gap-2 px-6 py-3 rounded-xl font-medium transition-all ${
                  selectedCategory === category.id
                    ? 'bg-gradient-to-r from-hero-green-500 to-blue-500 text-black'
                    : 'glass border border-slate-600 text-gray-300 hover:border-hero-green-500/50'
                }`}
                data-testid={`category-${category.id}`}
              >
                <category.icon className="w-4 h-4" />
                {category.name}
              </button>
            ))}
          </div>
        </div>

        {/* Eco-Friendly Products Visualization */}
        <div className="mb-16">
          <h3 className="text-3xl font-bold text-center text-white mb-8">
            <ShoppingBag className="inline w-8 h-8 text-blue-500 mr-3" />
            Eco-Friendly Rewards Store
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>

        {/* Online Shop CTA */}
        <div className="text-center">
          <div className="glass rounded-2xl p-8 border border-hero-green-500/50 bg-gradient-to-r from-hero-green-500/10 to-blue-500/10 backdrop-blur-sm max-w-3xl mx-auto">
            <Building className="w-12 h-12 text-hero-green-500 mx-auto mb-4" />
            <h3 className="text-2xl font-bold text-white mb-4">Shop Online at AquaCafe</h3>
            <p className="text-gray-300 mb-6">
              All eco-friendly products can also be ordered directly from our AquaCafe Shop online. 
              Earn points with every purchase and contribute to Dubai's sustainability goals.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                size="lg" 
                className="bg-gradient-to-r from-hero-green-500 to-blue-500 hover:from-hero-green-600 hover:to-blue-600 text-black font-bold px-8 py-3 shadow-xl transform hover:scale-105 transition-all"
                data-testid="button-shop-online"
              >
                <ShoppingBag className="w-5 h-5 mr-2" />
                Shop AquaCafe Online
              </Button>
              <Button 
                size="lg" 
                variant="outline" 
                className="border-amber-500/50 text-amber-400 hover:bg-amber-500/10 px-8 py-3 font-bold"
                data-testid="button-earn-points"
              >
                <TrendingUp className="w-5 h-5 mr-2" />
                Start Earning Points
              </Button>
            </div>
          </div>
        </div>

        {/* Engagement Message */}
        <div className="text-center mt-12">
          <p className="text-lg text-gray-300 max-w-4xl mx-auto leading-relaxed">
            <strong className="text-hero-green-400">The whole concept revolves around engaging people for eco-friendly initiatives</strong> and 
            practices enablement by the <strong className="text-blue-400">DeliWer platform</strong>. 
            Join our community of Planet Heroes and make a real impact on Dubai's environmental future.
          </p>
          <div className="flex items-center justify-center gap-2 mt-4">
            <CheckCircle className="w-5 h-5 text-hero-green-500" />
            <span className="text-hero-green-400 font-semibold">That's How it Works!</span>
          </div>
        </div>
      </div>
    </div>
  );
}