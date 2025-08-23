import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { Link } from "wouter";
import { Star, ShoppingCart, Gift, CheckCircle, Zap, Shield, Award, Heart, Home, Filter, Droplets } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export default function Products() {
  const [isOrderLoading, setIsOrderLoading] = useState<string | null>(null);
  const { toast } = useToast();

  const products = [
    {
      id: "pitcher-basic",
      name: "AquaCafe Pitcher Basic",
      price: 199,
      originalPrice: 299,
      image: "🚰",
      features: ["2-stage filtration", "1.5L capacity", "BPA-free design", "6-month filter life"]
    },
    {
      id: "pitcher-premium", 
      name: "AquaCafe Pitcher Premium",
      price: 399,
      originalPrice: 599,
      image: "🏆",
      features: ["4-stage filtration", "2.5L capacity", "Smart LED indicators", "1-year filter life"],
      popular: true
    },
    {
      id: "under-sink-compact",
      name: "Under-Sink Compact System",
      price: 899,
      originalPrice: 1299,
      image: "🔧",
      features: ["5-stage filtration", "Space-saving design", "Professional installation", "2-year warranty"]
    },
    {
      id: "under-sink-premium",
      name: "Under-Sink Premium System",
      price: 1499,
      originalPrice: 1999,
      image: "💎",
      features: ["7-stage filtration", "Smart monitoring", "Alkaline enhancement", "5-year warranty"]
    },
    {
      id: "whole-home-basic",
      name: "Whole Home Basic System",
      price: 2499,
      originalPrice: 3499,
      image: "🏠",
      features: ["Whole house coverage", "Sediment + carbon filters", "Professional installation", "3-year warranty"]
    },
    {
      id: "whole-home-premium",
      name: "Whole Home Premium System", 
      price: 3999,
      originalPrice: 5999,
      image: "🏆",
      features: ["Complete home solution", "Multi-stage filtration", "Smart home integration", "10-year warranty"]
    }
  ];

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
            Shop – All Water Solutions
          </h1>
          <p className="text-gray-300 text-lg max-w-2xl mx-auto">
            Browse our complete range of premium water filtration systems for every home and budget.
          </p>
        </div>

        {/* Filter Categories */}
        <div className="flex flex-wrap justify-center gap-3 mb-8">
          <button className="px-4 py-2 rounded-full bg-white/10 text-white border border-white/20 text-sm">
            All Products
          </button>
          <button className="px-4 py-2 rounded-full bg-white/5 text-gray-300 border border-white/10 text-sm hover:bg-white/10 hover:text-white">
            Pitchers
          </button>
          <button className="px-4 py-2 rounded-full bg-white/5 text-gray-300 border border-white/10 text-sm hover:bg-white/10 hover:text-white">
            Under-Sink
          </button>
          <button className="px-4 py-2 rounded-full bg-white/5 text-gray-300 border border-white/10 text-sm hover:bg-white/10 hover:text-white">
            Whole Home
          </button>
        </div>

        {/* Special Offer Banner */}
        <div className="mb-8 bg-gradient-to-r from-amber-600/20 to-orange-600/20 border border-amber-500/30 rounded-2xl p-6 text-center">
          <h3 className="text-xl font-bold text-white mb-2">🎁 Special AquaCafe Starter Offer</h3>
          <p className="text-gray-300 mb-4">Get started with our exclusive starter kit featuring free gifts and Bakers Kitchen partnership</p>
          <Link href="/aquacafe" className="inline-flex items-center gap-2 bg-amber-600 hover:bg-amber-700 text-white px-6 py-3 rounded-xl font-semibold transition-colors" data-testid="button-view-aquacafe-offer">
            <Gift className="w-4 h-4" />
            View AquaCafe Offer - AED 99
          </Link>
        </div>

        {/* Products Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((product) => (
            <Card key={product.id} className={`bg-white/5 backdrop-blur border-slate-600 relative ${product.popular ? 'ring-2 ring-amber-500/50' : ''}`}>
              {product.popular && (
                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                  <span className="bg-amber-500 text-black px-3 py-1 rounded-full text-xs font-bold">
                    MOST POPULAR
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
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Why Choose AquaCafe */}
        <div className="mt-16 bg-white/5 backdrop-blur border border-slate-600 rounded-2xl p-8">
          <h3 className="text-2xl font-bold text-white text-center mb-8">Why 12,000+ Dubai Families Choose AquaCafe</h3>
          <div className="grid md:grid-cols-4 gap-6">
            <div className="text-center">
              <Shield className="w-12 h-12 text-blue-400 mx-auto mb-3" />
              <h4 className="font-semibold text-white mb-2">99.9% Filtration</h4>
              <p className="text-sm text-gray-400">Removes chlorine, heavy metals, bacteria, and microplastics</p>
            </div>
            <div className="text-center">
              <Heart className="w-12 h-12 text-red-400 mx-auto mb-3" />
              <h4 className="font-semibold text-white mb-2">Family Safe</h4>
              <p className="text-sm text-gray-400">NSF certified, BPA-free materials, child-safe design</p>
            </div>
            <div className="text-center">
              <Zap className="w-12 h-12 text-amber-400 mx-auto mb-3" />
              <h4 className="font-semibold text-white mb-2">Smart Monitoring</h4>
              <p className="text-sm text-gray-400">Real-time water quality tracking with mobile alerts</p>
            </div>
            <div className="text-center">
              <Award className="w-12 h-12 text-emerald-400 mx-auto mb-3" />
              <h4 className="font-semibold text-white mb-2">Dubai Approved</h4>
              <p className="text-sm text-gray-400">DEWA certified, meets UAE water safety standards</p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-slate-700 mt-12">
        <div className="max-w-6xl mx-auto px-4 py-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-sm text-gray-400">
            © 2024 DeliWer • Premium Water Solutions
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
    </div>
  );
}