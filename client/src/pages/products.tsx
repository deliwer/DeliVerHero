import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { Link } from "wouter";
import { Star, ShoppingCart, Gift, CheckCircle, Zap, Shield, Award, Heart, Home, Smartphone, Droplets, Sparkles, Eye } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ARPreview } from "@/components/ar-preview";

export default function Products() {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [isOrderLoading, setIsOrderLoading] = useState<string | null>(null);
  const [arPreview, setArPreview] = useState<{ isOpen: boolean; product: any }>({ isOpen: false, product: null });
  const { toast } = useToast();

  const categories = [
    { id: "all", label: "All Products", icon: ShoppingCart },
    { id: "refurbished-phones", label: "Refurbished Phones", icon: Smartphone },
    { id: "water-solutions", label: "Water Solutions", icon: Droplets },
    { id: "premium-water", label: "Premium Water", icon: Sparkles }
  ];

  const products = [
    // Refurbished Phones
    {
      id: "iphone-15-pro",
      name: "iPhone 15 Pro (Excellent)",
      category: "refurbished-phones",
      price: 3799,
      originalPrice: 4499,
      image: "📱",
      features: ["256GB Storage", "Battery 95%+", "Like New Condition", "1-Year Warranty"],
      badge: "Latest Model"
    },
    {
      id: "iphone-14-pro",
      name: "iPhone 14 Pro (Very Good)",
      category: "refurbished-phones",
      price: 2999,
      originalPrice: 3699,
      image: "📱",
      features: ["128GB Storage", "Battery 90%+", "Minor Cosmetic Wear", "6-Month Warranty"],
      popular: true
    },
    {
      id: "iphone-13",
      name: "iPhone 13 (Good)",
      category: "refurbished-phones",
      price: 2199,
      originalPrice: 2799,
      image: "📱",
      features: ["128GB Storage", "Battery 85%+", "Functional Perfect", "3-Month Warranty"]
    },
    {
      id: "iphone-12",
      name: "iPhone 12 (Excellent)",
      category: "refurbished-phones",
      price: 1799,
      originalPrice: 2299,
      image: "📱",
      features: ["64GB Storage", "Battery 88%+", "Light Usage Signs", "6-Month Warranty"],
      badge: "Best Value"
    },

    // Water Solutions
    {
      id: "aquacafe-basic",
      name: "AquaCafe Pitcher Basic",
      category: "water-solutions",
      price: 199,
      originalPrice: 299,
      image: "🚰",
      features: ["2-stage filtration", "1.5L capacity", "BPA-free design", "6-month filter life"]
    },
    {
      id: "aquacafe-premium", 
      name: "AquaCafe Pitcher Premium",
      category: "water-solutions",
      price: 399,
      originalPrice: 599,
      image: "🏆",
      features: ["4-stage filtration", "2.5L capacity", "Smart LED indicators", "1-year filter life"],
      popular: true
    },
    {
      id: "under-sink-compact",
      name: "Under-Sink Compact System",
      category: "water-solutions",
      price: 899,
      originalPrice: 1299,
      image: "🔧",
      features: ["5-stage filtration", "Space-saving design", "Professional installation", "2-year warranty"]
    },
    {
      id: "under-sink-premium",
      name: "Under-Sink Premium System",
      category: "water-solutions",
      price: 1499,
      originalPrice: 1999,
      image: "💎",
      features: ["7-stage filtration", "Smart monitoring", "Alkaline enhancement", "5-year warranty"]
    },
    {
      id: "whole-home-basic",
      name: "Whole Home Basic System",
      category: "water-solutions",
      price: 2499,
      originalPrice: 3499,
      image: "🏠",
      features: ["Whole house coverage", "Sediment + carbon filters", "Professional installation", "3-year warranty"]
    },
    {
      id: "kangen-k8",
      name: "Kangen K8 Machine",
      category: "water-solutions",
      price: 4999,
      originalPrice: 6499,
      image: "⚡",
      features: ["8 Platinum plates", "Professional installation", "5-year warranty", "Training included"],
      badge: "Professional Grade"
    },

    // Premium Water
    {
      id: "icelandic-premium",
      name: "Icelandic Glacial Water",
      category: "premium-water",
      price: 12,
      originalPrice: 18,
      image: "🧊",
      features: ["500ml Glass Bottle", "pH 8.4 Alkaline", "Zero Sodium", "Sustainable Packaging"],
      badge: "Premium"
    },
    {
      id: "himalayan-spring",
      name: "Himalayan Spring Water",
      category: "premium-water",
      price: 15,
      originalPrice: 22,
      image: "🏔️",
      features: ["750ml Glass Bottle", "Natural Minerals", "High Altitude Source", "Carbon Neutral"]
    },
    {
      id: "volcanic-mineral",
      name: "Volcanic Mineral Water",
      category: "premium-water",
      price: 18,
      originalPrice: 25,
      image: "🌋",
      features: ["1L Glass Bottle", "Rich in Silica", "Volcanic Origin", "Limited Edition"],
      badge: "Limited Edition"
    },
    {
      id: "kangen-delivery",
      name: "Kangen Water Delivery",
      category: "premium-water",
      price: 45,
      originalPrice: 65,
      image: "🚚",
      features: ["20L Container", "Weekly Delivery", "pH 9.5 Alkaline", "Free Container Rental"],
      badge: "Delivery Service"
    }
  ];

  const filteredProducts = selectedCategory === "all" 
    ? products 
    : products.filter(product => product.category === selectedCategory);

  const handleOrderNow = async (productId: string, productName: string) => {
    setIsOrderLoading(productId);
    
    try {
      await new Promise(resolve => setTimeout(resolve, 1500));
      const shopifyUrl = `https://www.deliwer.com/products/${productId}`;
      window.open(shopifyUrl, '_blank');
      
      toast({
        title: "Redirecting to Checkout",
        description: `Opening checkout for ${productName}`,
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to process order. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsOrderLoading(null);
    }
  };

  const handleARPreview = (product: typeof products[0]) => {
    setArPreview({ isOpen: true, product });
    toast({
      title: "AR Preview Loading",
      description: "Initializing AR preview for " + product.name,
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800">
      {/* Navigation Bar */}
      <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 text-white hover:text-blue-400 transition-colors" data-testid="link-back-home">
          <Home className="w-5 h-5" />
          <span className="font-semibold">DeliWer</span>
        </Link>
        <div className="flex gap-2">
          <Link href="/aquacafe" className="px-4 py-2 rounded-xl bg-amber-600 text-white text-sm hover:bg-amber-700 transition-colors" data-testid="link-aquacafe-offer">
            AquaCafe Offer
          </Link>
          <Link href="/exchange" className="px-4 py-2 rounded-xl bg-blue-600 text-white text-sm hover:bg-blue-700 transition-colors" data-testid="link-start-exchange">
            Start Exchange
          </Link>
        </div>
      </div>

      {/* Hero Section */}
      <section className="max-w-6xl mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Shop – All Products
          </h1>
          <p className="text-gray-300 text-lg max-w-2xl mx-auto">
            Browse refurbished phones, water solutions, and premium water products.
          </p>
        </div>

        {/* Category Filter Buttons */}
        <div className="flex flex-wrap justify-center gap-3 mb-8">
          {categories.map((category) => {
            const Icon = category.icon;
            return (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all ${
                  selectedCategory === category.id
                    ? 'bg-blue-600 text-white'
                    : 'bg-white/10 text-gray-300 hover:bg-white/20 hover:text-white border border-white/20'
                }`}
                data-testid={`filter-${category.id}`}
              >
                <Icon className="w-4 h-4" />
                {category.label}
              </button>
            );
          })}
        </div>

        {/* Special AquaCafe Offer Banner */}
        <div className="mb-8 bg-gradient-to-r from-amber-600/20 to-orange-600/20 border border-amber-500/30 rounded-2xl p-6 text-center">
          <h3 className="text-xl font-bold text-white mb-2">🎁 Special AquaCafe Starter Offer</h3>
          <p className="text-gray-300 mb-4">Get started with our exclusive AED 99 starter kit featuring free gifts and Bakers Kitchen partnership</p>
          <Link href="/aquacafe" className="inline-flex items-center gap-2 bg-amber-600 hover:bg-amber-700 text-white px-6 py-3 rounded-xl font-semibold transition-colors" data-testid="button-view-aquacafe-offer">
            <Gift className="w-4 h-4" />
            View AquaCafe Offer - AED 99
          </Link>
        </div>

        {/* Products Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProducts.map((product) => (
            <Card key={product.id} className={`bg-white/5 backdrop-blur border-slate-600 relative ${product.popular ? 'ring-2 ring-amber-500/50' : ''}`}>
              {product.badge && (
                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                  <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                    product.popular ? 'bg-amber-500 text-black' : 'bg-slate-600 text-white'
                  }`}>
                    {product.badge}
                  </span>
                </div>
              )}
              
              <CardContent className="p-6">
                <div className="text-center mb-4">
                  <div className="text-4xl mb-3">{product.image}</div>
                  <h3 className="text-lg font-semibold text-white mb-1">{product.name}</h3>
                  <div className="flex items-center justify-center gap-2 mb-3">
                    <span className="text-2xl font-bold text-white">AED {product.price.toLocaleString()}</span>
                    <span className="text-sm text-gray-400 line-through">AED {product.originalPrice.toLocaleString()}</span>
                  </div>
                  <div className="text-sm text-emerald-400 font-semibold">
                    Save AED {(product.originalPrice - product.price).toLocaleString()}
                  </div>
                </div>
                
                <ul className="text-sm text-gray-300 space-y-2 mb-6">
                  {product.features.map((feature, index) => (
                    <li key={index} className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-emerald-500 flex-shrink-0" />
                      {feature}
                    </li>
                  ))}
                </ul>
                
                <div className="space-y-3">
                  <Button 
                    onClick={() => handleARPreview(product)}
                    className="w-full py-3 rounded-xl bg-purple-600 hover:bg-purple-700 text-white font-semibold transition-all transform hover:scale-105"
                    data-testid={`button-ar-preview-${product.id}`}
                  >
                    <Eye className="w-4 h-4 mr-2" />
                    AR Preview
                  </Button>
                  
                  <Button 
                    onClick={() => handleOrderNow(product.id, product.name)}
                    disabled={isOrderLoading === product.id}
                    className={`w-full py-3 rounded-xl font-semibold transition-all transform hover:scale-105 ${
                      product.popular 
                        ? 'bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-black'
                        : 'bg-slate-700 hover:bg-slate-600 text-white'
                    }`}
                    data-testid={`button-order-${product.id}`}
                  >
                    {isOrderLoading === product.id ? (
                      <div className="flex items-center justify-center gap-2">
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-current"></div>
                        Processing...
                      </div>
                    ) : (
                      <>
                        <ShoppingCart className="w-4 h-4 mr-2" />
                        Order Now
                      </>
                    )}
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Cross-sell Section */}
        <div className="mt-16 grid md:grid-cols-2 gap-6">
          <Card className="bg-gradient-to-br from-blue-600/20 to-purple-600/20 border border-blue-500/30">
            <CardContent className="p-6 text-center">
              <Smartphone className="w-12 h-12 text-blue-400 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-white mb-2">Have an Old iPhone?</h3>
              <p className="text-gray-300 mb-4">Trade it in for instant credit towards water solutions</p>
              <Link href="/exchange" className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl font-semibold transition-colors" data-testid="button-start-exchange-crosssell">
                <Gift className="w-4 h-4" />
                Start Exchange
              </Link>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-amber-600/20 to-orange-600/20 border border-amber-500/30">
            <CardContent className="p-6 text-center">
              <Droplets className="w-12 h-12 text-amber-400 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-white mb-2">Need a Starter System?</h3>
              <p className="text-gray-300 mb-4">Get AED 1000+ value for only AED 99 with our Planet Hero starter kit</p>
              <Link href="/aquacafe" className="inline-flex items-center gap-2 bg-amber-600 hover:bg-amber-700 text-white px-6 py-3 rounded-xl font-semibold transition-colors" data-testid="button-aquacafe-crosssell">
                <Star className="w-4 h-4" />
                View Starter Kit
              </Link>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-slate-700 mt-12">
        <div className="max-w-6xl mx-auto px-4 py-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-sm text-gray-400">
            © 2024 DeliWer • Premium Products & Solutions
          </div>
          <div className="flex gap-3">
            <Link href="/exchange" className="px-4 py-2 rounded-xl bg-blue-600 text-white text-sm hover:bg-blue-700 transition-colors" data-testid="footer-start-exchange">
              Start Exchange
            </Link>
            <Link href="/aquacafe" className="px-4 py-2 rounded-xl bg-amber-600 text-white text-sm hover:bg-amber-700 transition-colors" data-testid="footer-aquacafe-offer">
              AquaCafe Offer
            </Link>
          </div>
        </div>
      </footer>

      {/* AR Preview Modal */}
      <ARPreview
        isOpen={arPreview.isOpen}
        onClose={() => setArPreview({ isOpen: false, product: null })}
        product={arPreview.product}
      />
    </div>
  );
}