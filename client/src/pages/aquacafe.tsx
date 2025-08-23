import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { Link } from "wouter";
import { Star, ShoppingCart, Gift, CheckCircle, Zap, Shield, Award, Heart, ArrowLeft, Home } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export default function AquaCafe() {
  const [isOrderLoading, setIsOrderLoading] = useState<string | null>(null);
  const { toast } = useToast();

  const handleOrderNow = async (planId: string, planName: string) => {
    setIsOrderLoading(planId);
    
    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Redirect to Shopify with proper product variant
      const shopifyUrl = `https://www.deliwer.com/products/aquacafe?variant=${planId}`;
      window.open(shopifyUrl, '_blank');
      
      toast({
        title: "Redirecting to Checkout",
        description: `Opening checkout for ${planName}`,
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
          <Link href="/exchange" className="px-4 py-2 rounded-xl bg-blue-600 text-white text-sm hover:bg-blue-700 transition-colors" data-testid="link-start-exchange">
            Start Exchange
          </Link>
        </div>
      </div>

      {/* Hero Section */}
      <section className="max-w-6xl mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Shop – AquaCafe
          </h1>
          <p className="text-gray-300 text-lg max-w-2xl mx-auto">
            Order your Starter Kit to unlock free membership and begin earning Planet Points.
          </p>
        </div>

        {/* Campaign Banner */}
        <div className="mb-8 text-center">
          <div className="inline-flex items-center gap-2 bg-emerald-600/20 border border-emerald-500/50 rounded-full px-6 py-3 text-emerald-400 text-sm">
            <Gift className="w-4 h-4" />
            🔥 Double Rewards during iPhone 17 + GITEX launch
          </div>
        </div>

        {/* Main Product Cards */}
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          <Card className="bg-white/5 backdrop-blur border-slate-600">
            <CardContent className="p-6">
              <div className="flex items-start justify-between gap-4 mb-4">
                <div>
                  <h3 className="text-xl font-semibold text-white mb-1">AquaCafe Starter Kit</h3>
                  <p className="text-sm text-blue-400">Best for new members</p>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-bold text-white">AED 99</div>
                  <div className="text-sm text-gray-400 line-through">AED 399</div>
                </div>
              </div>
              
              <ul className="text-sm text-gray-300 space-y-2 mb-6">
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-emerald-500 flex-shrink-0" />
                  Premium filtration + shower filter
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-emerald-500 flex-shrink-0" />
                  Free membership included
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-emerald-500 flex-shrink-0" />
                  Earn Planet Points on every refill
                </li>
              </ul>
              
              <Button 
                onClick={() => handleOrderNow('hero-starter', 'AquaCafe Starter Kit')}
                disabled={isOrderLoading === 'hero-starter'}
                className="w-full bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-black font-semibold py-3 rounded-xl transition-all transform hover:scale-105"
                data-testid="button-order-starter-kit"
              >
                {isOrderLoading === 'hero-starter' ? (
                  <div className="flex items-center gap-2">
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-current"></div>
                    Processing...
                  </div>
                ) : (
                  <>
                    <ShoppingCart className="w-4 h-4 mr-2" />
                    Order Starter Kit
                  </>
                )}
              </Button>
            </CardContent>
          </Card>

          <Card className="bg-white/5 backdrop-blur border-slate-600">
            <CardContent className="p-6">
              <div className="flex items-start justify-between gap-4 mb-4">
                <div>
                  <h3 className="text-xl font-semibold text-white mb-1">Browse Premium Water Solutions</h3>
                  <p className="text-sm text-blue-400">Explore all products</p>
                </div>
                <Zap className="w-8 h-8 text-blue-400 flex-shrink-0" />
              </div>
              
              <p className="text-sm text-gray-300 mb-6">
                Pitcher systems, under-sink units, and more premium filtration solutions for your home.
              </p>
              
              <Button 
                variant="outline"
                className="w-full border-slate-500 text-white hover:bg-slate-700 py-3 rounded-xl"
                onClick={() => toast({ title: "Coming Soon", description: "Product catalog is being updated." })}
                data-testid="button-view-products"
              >
                View Products
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-4 gap-4 mb-8">
          <div className="bg-white/5 backdrop-blur border border-slate-600 rounded-xl p-4 text-center">
            <Shield className="w-8 h-8 text-blue-400 mx-auto mb-2" />
            <h4 className="font-semibold text-white text-sm mb-1">99.9% Filtration</h4>
            <p className="text-xs text-gray-400">Removes chlorine & bacteria</p>
          </div>
          <div className="bg-white/5 backdrop-blur border border-slate-600 rounded-xl p-4 text-center">
            <Heart className="w-8 h-8 text-red-400 mx-auto mb-2" />
            <h4 className="font-semibold text-white text-sm mb-1">Family Safe</h4>
            <p className="text-xs text-gray-400">NSF certified materials</p>
          </div>
          <div className="bg-white/5 backdrop-blur border border-slate-600 rounded-xl p-4 text-center">
            <Zap className="w-8 h-8 text-amber-400 mx-auto mb-2" />
            <h4 className="font-semibold text-white text-sm mb-1">Smart Monitoring</h4>
            <p className="text-xs text-gray-400">Real-time quality tracking</p>
          </div>
          <div className="bg-white/5 backdrop-blur border border-slate-600 rounded-xl p-4 text-center">
            <Award className="w-8 h-8 text-emerald-400 mx-auto mb-2" />
            <h4 className="font-semibold text-white text-sm mb-1">Dubai Approved</h4>
            <p className="text-xs text-gray-400">DEWA certified</p>
          </div>
        </div>

        {/* CTA Section */}
        <div className="bg-gradient-to-r from-blue-600/20 to-purple-600/20 border border-blue-500/30 rounded-2xl p-6 text-center">
          <h3 className="text-xl font-bold text-white mb-2">Have an iPhone?</h3>
          <p className="text-gray-300 mb-4">Trade it in for water benefits and earn bonus Planet Points</p>
          <Link href="/exchange" className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl font-semibold transition-colors" data-testid="button-start-exchange">
            <Gift className="w-4 h-4" />
            Start Exchange
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-slate-700 mt-12">
        <div className="max-w-6xl mx-auto px-4 py-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-sm text-gray-400">
            © 2024 DeliWer • AI‑First Circular Exchange
          </div>
          <div className="flex gap-3">
            <Link href="/exchange" className="px-4 py-2 rounded-xl bg-blue-600 text-white text-sm hover:bg-blue-700 transition-colors" data-testid="footer-start-exchange">
              Start Exchange
            </Link>
            <Button 
              onClick={() => handleOrderNow('hero-starter', 'AquaCafe Starter Kit')}
              disabled={isOrderLoading === 'hero-starter'}
              className="px-4 py-2 rounded-xl bg-emerald-600 text-white text-sm hover:bg-emerald-700 transition-colors"
              data-testid="footer-order-starter-kit"
            >
              Order Starter Kit
            </Button>
          </div>
        </div>
      </footer>
    </div>
  );
}