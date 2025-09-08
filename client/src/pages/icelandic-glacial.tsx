import { useState, useMemo } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Input } from '@/components/ui/input';
import { 
  Droplets, 
  Award, 
  Leaf, 
  Shield, 
  Truck, 
  Clock, 
  Star,
  Filter,
  Heart,
  Users,
  Gift,
  MapPin,
  Phone,
  Mail,
  CheckCircle,
  Sparkles,
  Mountain,
  Snowflake,
  Globe,
  Recycle
} from 'lucide-react';
import { Link } from 'wouter';
import { icelandicGlacialProducts, productCategories, brandStory, sustainabilityFeatures, type IcelandicGlacialProduct } from '@/data/icelandic-glacial-products';

export default function IcelandicGlacialLandingPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [showLoyaltySignup, setShowLoyaltySignup] = useState(false);
  const [email, setEmail] = useState('');

  // Filter products based on category and search
  const filteredProducts = useMemo(() => {
    return icelandicGlacialProducts.filter(product => {
      const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory;
      const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          product.description.toLowerCase().includes(searchTerm.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [selectedCategory, searchTerm]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 via-blue-50 to-white">
      
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-blue-900 via-slate-800 to-blue-950 text-white overflow-hidden">
        {/* Background Elements */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-20 w-32 h-32 rounded-full bg-blue-400 blur-3xl"></div>
          <div className="absolute top-40 right-32 w-24 h-24 rounded-full bg-white blur-2xl"></div>
          <div className="absolute bottom-20 left-1/3 w-40 h-40 rounded-full bg-cyan-400 blur-3xl"></div>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 py-20 lg:py-32">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            
            {/* Hero Content */}
            <div className="space-y-8">
              <div className="space-y-4">
                <div className="flex items-center gap-3 mb-6">
                  <img src="/deliwer-logo.png" alt="DeliWer" className="h-8" />
                  <span className="text-blue-300">×</span>
                  <div className="flex items-center gap-2">
                    <Mountain className="w-6 h-6 text-cyan-400" />
                    <span className="text-xl font-bold">ICELANDIC GLACIAL</span>
                  </div>
                </div>
                
                <h1 className="text-4xl lg:text-6xl font-bold leading-tight">
                  Pure Icelandic Water,
                  <span className="block text-cyan-400">Delivered to Dubai</span>
                </h1>
                
                <p className="text-xl lg:text-2xl text-blue-100 leading-relaxed">
                  World's first CarbonNeutral™ bottled water from Iceland's legendary Ölfus Spring. 
                  Join AquaCafe Loyalty Program and become a Planet Hero.
                </p>
              </div>

              {/* Key Benefits */}
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="flex items-center gap-3 p-4 bg-white/10 rounded-lg backdrop-blur">
                  <Award className="w-6 h-6 text-yellow-400" />
                  <div>
                    <div className="font-semibold">CarbonNeutral™ Certified</div>
                    <div className="text-sm text-blue-200">World's first certified water</div>
                  </div>
                </div>
                
                <div className="flex items-center gap-3 p-4 bg-white/10 rounded-lg backdrop-blur">
                  <Droplets className="w-6 h-6 text-cyan-400" />
                  <div>
                    <div className="font-semibold">pH 8.4 Naturally Alkaline</div>
                    <div className="text-sm text-blue-200">5,000 years filtered</div>
                  </div>
                </div>
                
                <div className="flex items-center gap-3 p-4 bg-white/10 rounded-lg backdrop-blur">
                  <Truck className="w-6 h-6 text-green-400" />
                  <div>
                    <div className="font-semibold">Same-Day Dubai Delivery</div>
                    <div className="text-sm text-blue-200">Premium temperature control</div>
                  </div>
                </div>
                
                <div className="flex items-center gap-3 p-4 bg-white/10 rounded-lg backdrop-blur">
                  <Gift className="w-6 h-6 text-purple-400" />
                  <div>
                    <div className="font-semibold">AquaCafe Rewards</div>
                    <div className="text-sm text-blue-200">Up to 30% member savings</div>
                  </div>
                </div>
              </div>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4">
                <Button 
                  size="lg" 
                  className="bg-cyan-500 hover:bg-cyan-600 text-white px-8 py-4 text-lg"
                  onClick={() => document.getElementById('products')?.scrollIntoView({ behavior: 'smooth' })}
                >
                  <Droplets className="w-5 h-5 mr-2" />
                  Shop Premium Water
                </Button>
                
                <Button 
                  size="lg" 
                  variant="outline" 
                  className="border-white text-white hover:bg-white hover:text-blue-900 px-8 py-4 text-lg"
                  onClick={() => setShowLoyaltySignup(true)}
                >
                  <Star className="w-5 h-5 mr-2" />
                  Join AquaCafe Program
                </Button>
                
                <Button 
                  size="lg" 
                  variant="outline"
                  className="border-green-400 text-green-400 hover:bg-green-400 hover:text-white px-8 py-4 text-lg"
                >
                  <Leaf className="w-5 h-5 mr-2" />
                  Become Planet Hero
                </Button>
              </div>
            </div>

            {/* Hero Product Showcase */}
            <div className="relative">
              <div className="relative z-10">
                <img 
                  src="/src/assets/products/icelandic-glacial/icelandic_glacial_750ml_1757348358065.png"
                  alt="Icelandic Glacial Premium Water"
                  className="w-full max-w-md mx-auto drop-shadow-2xl"
                />
              </div>
              
              {/* Floating Features */}
              <div className="absolute -top-4 -left-4 bg-green-500 text-white px-4 py-2 rounded-full text-sm font-bold shadow-lg">
                <Leaf className="w-4 h-4 inline mr-1" />
                CarbonNeutral™
              </div>
              
              <div className="absolute -bottom-4 -right-4 bg-blue-500 text-white px-4 py-2 rounded-full text-sm font-bold shadow-lg">
                <Award className="w-4 h-4 inline mr-1" />
                pH 8.4
              </div>
              
              <div className="absolute top-1/2 -left-8 bg-cyan-500 text-white px-3 py-2 rounded-full text-sm font-bold shadow-lg">
                <Snowflake className="w-4 h-4 inline mr-1" />
                Iceland Pure
              </div>
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border-2 border-white rounded-full flex justify-center">
            <div className="w-1 h-3 bg-white rounded-full mt-2 animate-pulse"></div>
          </div>
        </div>
      </section>

      {/* Brand Story Section */}
      <section className="py-16 bg-gradient-to-r from-blue-50 to-cyan-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              From Iceland's Legendary Ölfus Spring
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Sourced from one of the world's most pristine ecosystems, naturally filtered through layers of lava rock for 5,000 years
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <Card className="text-center border-blue-200 shadow-lg hover:shadow-xl transition-shadow">
              <CardContent className="p-6">
                <Mountain className="w-12 h-12 text-blue-600 mx-auto mb-4" />
                <h3 className="text-lg font-bold text-gray-900 mb-2">Pure Source</h3>
                <p className="text-gray-600 text-sm">Legendary Ölfus Spring protected by 128,000 acre exclusion zone</p>
              </CardContent>
            </Card>

            <Card className="text-center border-green-200 shadow-lg hover:shadow-xl transition-shadow">
              <CardContent className="p-6">
                <Leaf className="w-12 h-12 text-green-600 mx-auto mb-4" />
                <h3 className="text-lg font-bold text-gray-900 mb-2">CarbonNeutral™</h3>
                <p className="text-gray-600 text-sm">World's first bottled water certified for product and operation</p>
              </CardContent>
            </Card>

            <Card className="text-center border-cyan-200 shadow-lg hover:shadow-xl transition-shadow">
              <CardContent className="p-6">
                <Droplets className="w-12 h-12 text-cyan-600 mx-auto mb-4" />
                <h3 className="text-lg font-bold text-gray-900 mb-2">Naturally Alkaline</h3>
                <p className="text-gray-600 text-sm">pH 8.4 with naturally low mineral content (62ppm TDS)</p>
              </CardContent>
            </Card>

            <Card className="text-center border-purple-200 shadow-lg hover:shadow-xl transition-shadow">
              <CardContent className="p-6">
                <Award className="w-12 h-12 text-purple-600 mx-auto mb-4" />
                <h3 className="text-lg font-bold text-gray-900 mb-2">Award Winning</h3>
                <p className="text-gray-600 text-sm">Recognized by leading chefs and sommeliers worldwide</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Product Catalog Section */}
      <section id="products" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Complete Product Collection
            </h2>
            <p className="text-xl text-gray-600 mb-8">
              17 premium products from still water to flavored sparkling - all CarbonNeutral™ certified
            </p>
          </div>

          {/* Product Filters */}
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            <Button
              variant={selectedCategory === 'all' ? 'default' : 'outline'}
              onClick={() => setSelectedCategory('all')}
              className="flex items-center gap-2"
            >
              <Filter className="w-4 h-4" />
              All Products ({icelandicGlacialProducts.length})
            </Button>
            
            {Object.entries(productCategories).map(([key, label]) => {
              const count = icelandicGlacialProducts.filter(p => p.category === key).length;
              return (
                <Button
                  key={key}
                  variant={selectedCategory === key ? 'default' : 'outline'}
                  onClick={() => setSelectedCategory(key)}
                >
                  {label} ({count})
                </Button>
              );
            })}
          </div>

          {/* Search Bar */}
          <div className="max-w-md mx-auto mb-12">
            <Input
              type="text"
              placeholder="Search products..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full"
            />
          </div>

          {/* Products Grid */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>

          {filteredProducts.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-500 text-lg">No products found matching your criteria.</p>
            </div>
          )}
        </div>
      </section>

      {/* AquaCafe Loyalty Program Section */}
      <section className="py-20 bg-gradient-to-br from-blue-900 via-purple-900 to-blue-800 text-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <div className="flex items-center justify-center gap-3 mb-6">
              <Star className="w-8 h-8 text-yellow-400" />
              <h2 className="text-3xl lg:text-4xl font-bold">AquaCafe Loyalty Program</h2>
              <Star className="w-8 h-8 text-yellow-400" />
            </div>
            <p className="text-xl text-blue-100 max-w-3xl mx-auto">
              Exclusive member pricing, priority delivery, and sustainability rewards. Join thousands of loyalty members saving up to 30%.
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8 mb-12">
            <Card className="bg-white/10 border-blue-300 backdrop-blur text-white">
              <CardHeader>
                <CardTitle className="flex items-center gap-3 text-white">
                  <Gift className="w-6 h-6 text-yellow-400" />
                  Member Benefits
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-green-400" />
                  <span>Up to 30% exclusive discounts</span>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-green-400" />
                  <span>Priority same-day delivery slots</span>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-green-400" />
                  <span>Early access to new flavors</span>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-green-400" />
                  <span>Birthday month special offers</span>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white/10 border-green-300 backdrop-blur text-white">
              <CardHeader>
                <CardTitle className="flex items-center gap-3 text-white">
                  <Leaf className="w-6 h-6 text-green-400" />
                  Planet Heroes Rewards
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-green-400" />
                  <span>Carbon offset reward points</span>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-green-400" />
                  <span>Environmental impact tracking</span>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-green-400" />
                  <span>Sustainability challenges</span>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-green-400" />
                  <span>Green packaging bonuses</span>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white/10 border-cyan-300 backdrop-blur text-white">
              <CardHeader>
                <CardTitle className="flex items-center gap-3 text-white">
                  <Truck className="w-6 h-6 text-cyan-400" />
                  Dubai Delivery Plus
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-green-400" />
                  <span>Same-day delivery available</span>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-green-400" />
                  <span>Temperature-controlled transport</span>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-green-400" />
                  <span>Subscription delivery options</span>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-green-400" />
                  <span>Bulk order discounts</span>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="text-center">
            <Button 
              size="lg" 
              className="bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 text-white px-12 py-4 text-lg"
              onClick={() => setShowLoyaltySignup(true)}
            >
              <Star className="w-5 h-5 mr-2" />
              Join AquaCafe Program - Free
            </Button>
            <p className="text-blue-200 mt-4">
              12,847 members already saving on premium water delivery
            </p>
          </div>
        </div>
      </section>

      {/* Dubai Delivery Service Section */}
      <section className="py-20 bg-gradient-to-r from-emerald-50 to-teal-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Premium Dubai Delivery Service
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Direct delivery to your home in Dubai UAE with same-day service, temperature-controlled transport, and premium packaging
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="space-y-8">
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                    <MapPin className="w-6 h-6 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">All Dubai Coverage</h3>
                    <p className="text-gray-600">Complete coverage across all Dubai emirates with optimized routing for fastest delivery times.</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                    <Clock className="w-6 h-6 text-green-600" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">Same-Day Delivery</h3>
                    <p className="text-gray-600">Order before 2 PM for same-day delivery. Schedule recurring deliveries for ultimate convenience.</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                    <Shield className="w-6 h-6 text-purple-600" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">Temperature Control</h3>
                    <p className="text-gray-600">Climate-controlled vehicles maintain optimal freshness and quality throughout transport.</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-cyan-100 rounded-lg flex items-center justify-center">
                    <Recycle className="w-6 h-6 text-cyan-600" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">Sustainable Packaging</h3>
                    <p className="text-gray-600">Premium, eco-friendly delivery packaging that aligns with our sustainability commitments.</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl shadow-xl p-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">Schedule Your Delivery</h3>
              
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Delivery Address in Dubai</label>
                  <Input placeholder="Enter your Dubai address..." />
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Preferred Date</label>
                    <Input type="date" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Time Slot</label>
                    <select className="w-full p-3 border border-gray-300 rounded-md">
                      <option>9 AM - 12 PM</option>
                      <option>12 PM - 3 PM</option>
                      <option>3 PM - 6 PM</option>
                      <option>6 PM - 9 PM</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Contact Number</label>
                  <Input placeholder="+971 XX XXX XXXX" />
                </div>

                <div className="flex items-center gap-3">
                  <input type="checkbox" id="recurring" className="w-4 h-4 text-blue-600" />
                  <label htmlFor="recurring" className="text-sm text-gray-700">
                    Set up recurring weekly deliveries (additional 10% savings)
                  </label>
                </div>

                <Button className="w-full bg-blue-600 hover:bg-blue-700 py-3">
                  <Truck className="w-5 h-5 mr-2" />
                  Schedule Dubai Delivery
                </Button>
              </div>

              <div className="mt-6 p-4 bg-green-50 rounded-lg">
                <div className="flex items-center gap-2 text-green-700 text-sm">
                  <CheckCircle className="w-4 h-4" />
                  <span>Free delivery on orders over AED 150</span>
                </div>
                <div className="flex items-center gap-2 text-green-700 text-sm mt-1">
                  <CheckCircle className="w-4 h-4" />
                  <span>Same-day delivery available until 2 PM</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Loyalty Program Signup Modal */}
      {showLoyaltySignup && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <Card className="w-full max-w-md">
            <CardHeader>
              <CardTitle className="flex items-center gap-3">
                <Star className="w-6 h-6 text-yellow-500" />
                Join AquaCafe Loyalty Program
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
                <Input 
                  type="email" 
                  placeholder="your.email@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
                <Input placeholder="Your full name" />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number</label>
                <Input placeholder="+971 XX XXX XXXX" />
              </div>

              <div className="flex items-center gap-3">
                <input type="checkbox" id="planet-hero" className="w-4 h-4 text-green-600" />
                <label htmlFor="planet-hero" className="text-sm text-gray-700">
                  Also join Planet Heroes program for environmental rewards
                </label>
              </div>

              <div className="flex gap-3">
                <Button 
                  className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600"
                  onClick={() => {
                    setShowLoyaltySignup(false);
                    setEmail('');
                  }}
                >
                  Join Program - Free
                </Button>
                <Button 
                  variant="outline" 
                  onClick={() => setShowLoyaltySignup(false)}
                >
                  Cancel
                </Button>
              </div>
              
              <p className="text-xs text-gray-500 text-center">
                By joining, you agree to receive exclusive offers and updates. Unsubscribe anytime.
              </p>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}

// Product Card Component
function ProductCard({ product }: { product: IcelandicGlacialProduct }) {
  const savings = product.pricing.regular - product.pricing.member;
  const savingsPercent = Math.round((savings / product.pricing.regular) * 100);

  return (
    <Card className="group hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border-gray-200 hover:border-blue-300">
      <CardContent className="p-6">
        <div className="relative mb-4">
          <img 
            src={product.image} 
            alt={product.name}
            className="w-full h-48 object-contain group-hover:scale-110 transition-transform duration-300"
          />
          
          {/* Product Badges */}
          <div className="absolute top-2 left-2 space-y-1">
            {product.isNew && (
              <Badge className="bg-red-500 text-white text-xs">NEW</Badge>
            )}
            {product.isPremium && (
              <Badge className="bg-purple-600 text-white text-xs">PREMIUM</Badge>
            )}
            {product.sustainability.carbonNeutral && (
              <Badge className="bg-green-600 text-white text-xs">
                <Leaf className="w-3 h-3 mr-1" />
                CarbonNeutral™
              </Badge>
            )}
          </div>

          {/* Member Savings Badge */}
          {savingsPercent > 0 && (
            <div className="absolute top-2 right-2 bg-gradient-to-r from-yellow-500 to-orange-500 text-white px-2 py-1 rounded-full text-xs font-bold">
              Save {savingsPercent}%
            </div>
          )}
        </div>

        <div className="space-y-3">
          <div>
            <h3 className="font-bold text-gray-900 text-lg leading-tight">{product.name}</h3>
            <p className="text-gray-600 text-sm">{product.volume} • {product.packaging}</p>
          </div>

          <p className="text-gray-600 text-sm line-clamp-2">{product.description}</p>

          {/* Key Features */}
          <div className="flex flex-wrap gap-1">
            {product.keyFeatures.slice(0, 2).map((feature, index) => (
              <Badge key={index} variant="outline" className="text-xs">
                {feature}
              </Badge>
            ))}
          </div>

          {/* Awards */}
          {product.awards && (
            <div className="flex items-center gap-1 text-yellow-600">
              <Award className="w-4 h-4" />
              <span className="text-xs font-medium">Award Winner</span>
            </div>
          )}

          {/* Pricing */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-gray-500 text-sm">Regular Price:</span>
              <span className="text-gray-400 line-through text-sm">
                AED {product.pricing.regular.toFixed(2)}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-blue-600 font-semibold">Member Price:</span>
              <span className="text-blue-600 font-bold text-lg">
                AED {product.pricing.member.toFixed(2)}
              </span>
            </div>
            {savingsPercent > 0 && (
              <div className="text-green-600 text-sm font-medium">
                You save AED {savings.toFixed(2)} ({savingsPercent}%)
              </div>
            )}
          </div>

          {/* Add to Cart Button */}
          <Button className="w-full mt-4 bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700">
            <Droplets className="w-4 h-4 mr-2" />
            Add to Cart
          </Button>

          {/* Sustainability Icons */}
          <div className="flex items-center justify-center gap-4 pt-2 border-t border-gray-100">
            {product.sustainability.recyclable && (
              <div className="flex items-center gap-1 text-green-600">
                <Recycle className="w-4 h-4" />
                <span className="text-xs">Recyclable</span>
              </div>
            )}
            {product.sustainability.bpaFree && (
              <div className="flex items-center gap-1 text-blue-600">
                <Shield className="w-4 h-4" />
                <span className="text-xs">BPA Free</span>
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}