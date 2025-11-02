import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Gift, Smartphone, Droplets, ShoppingBag, Crown, Star, CheckCircle, Utensils, Coffee, Heart, ArrowRight, Zap, Shield, Users, Trophy, Recycle, TrendingUp } from "lucide-react";
import { Link, useLocation } from "wouter";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { shopifyCartService } from "@/lib/shopify-cart";
import pizzaImage from "@assets/stock_images/delicious_pizza_clos_ace0f742.jpg";
import kulfiImage from "@assets/stock_images/kulfi_indian_ice_cre_64eeba10.jpg";
import happyDiningImage from "@assets/stock_images/happy_people_eating__21b9cf0b.jpg";
import showerFilterCollage from "@assets/collage_1755270492135.jpg";
import membershipCard from "@assets/Aquacafe_byDeliWer_Card_Corners_1755482696304.png";

export default function Rewards() {
  const [, setLocation] = useLocation();
  const [isOrderLoading, setIsOrderLoading] = useState(false);
  const { toast } = useToast();

  const handleOrderStarterKit = async () => {
    setIsOrderLoading(true);
    try {
      const starterKitProduct = {
        id: "aquacafe-starter-kit",
        variantId: "aquacafe-starter-kit-loyalty-gateway",
        title: "AquaCafe Planet Hero Starter Kit - Loyalty Gateway",
        variant: "Standard",
        price: 99,
        quantity: 1,
        image: "/aquacafe_shower_main_1755270492134.jpg",
      };
      
      await shopifyCartService.addToCart(starterKitProduct);
      
      toast({
        title: "Added to Cart! 🎉",
        description: "AquaCafe Loyalty Starter Kit (AED 99) - Your gateway to sustainability rewards",
      });
      
      setLocation('/cart');
    } catch (error) {
      console.error('Error adding to cart:', error);
      toast({
        title: "Error",
        description: "Failed to add to cart. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsOrderLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-dubai-gradient">
      <div className="container mx-auto px-4 py-8">
        
        {/* Hero Section - AquaCafe Loyalty Gateway */}
        <div className="text-center mb-12 relative overflow-hidden rounded-3xl bg-gradient-to-br from-emerald-900/40 to-blue-900/40 border-2 border-emerald-500/50 p-12 backdrop-blur-sm">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(34,197,94,0.1)_0%,transparent_70%)]"></div>
          <div className="relative z-10">
            <div className="inline-flex items-center gap-2 bg-emerald-500/20 text-emerald-400 px-6 py-3 rounded-full mb-6 border border-emerald-500/50">
              <Gift className="w-6 h-6" />
              <span className="font-bold text-lg">🚀 AQUACAFE LOYALTY GATEWAY</span>
            </div>
            <h1 className="text-5xl md:text-7xl font-black text-white mb-6">
              Your Circular Exchange Hub
              <span className="block text-emerald-400 mt-2">AED 99 Starter Kit</span>
            </h1>
            <p className="text-2xl text-gray-300 max-w-4xl mx-auto mb-8 leading-relaxed">
              Your gateway to AquaCafe's comprehensive loyalty ecosystem - where sustainability meets rewards, trade-ins become Planet Points, and every action contributes to Dubai's circular economy.
            </p>
            
            {/* Lifetime Value Badge */}
            <div className="flex flex-col md:flex-row items-center justify-center gap-4 mb-8">
              <Badge className="bg-amber-500/30 text-amber-300 px-6 py-3 text-xl font-bold border-2 border-amber-500/50">
                <Crown className="w-6 h-6 mr-2" />
                Lifetime Membership Benefits
              </Badge>
              <span className="text-3xl font-black text-white">→</span>
              <span className="text-4xl font-black text-emerald-400">AED 1000+ Value</span>
            </div>

            {/* Primary CTA */}
            <Button 
              size="lg"
              onClick={handleOrderStarterKit}
              disabled={isOrderLoading}
              className="bg-gradient-to-r from-emerald-600 to-green-600 hover:from-emerald-500 hover:to-green-500 text-white font-black px-12 py-8 text-2xl shadow-2xl transform hover:scale-105 transition-all rounded-full border-4 border-white/20 disabled:opacity-50"
              data-testid="button-order-starter-kit-hero"
            >
              <Zap className="w-8 h-8 mr-3" />
              {isOrderLoading ? "ADDING TO CART..." : "START YOUR CIRCULAR JOURNEY - AED 99"}
            </Button>
            <p className="text-gray-400 mt-4 text-sm">
              Join thousands of Dubai residents building a sustainable future
            </p>
          </div>
        </div>

        {/* The Circular Exchange Concept */}
        <div className="mb-16">
          <h2 className="text-4xl font-black text-white text-center mb-8">
            🔄 The Circular Exchange Concept
          </h2>
          <p className="text-center text-xl text-gray-300 max-w-3xl mx-auto mb-12">
            This starter kit isn't just a product - it's your lifetime membership to Dubai's most innovative sustainability platform. Every feature works together to create continuous value and environmental impact.
          </p>
          
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="bg-gradient-to-br from-blue-900/40 to-cyan-900/40 border-2 border-blue-500/50 hover:scale-105 transition-transform">
              <CardHeader className="text-center">
                <Smartphone className="w-16 h-16 text-blue-400 mx-auto mb-4" />
                <CardTitle className="text-white text-2xl">Trade-In Hub</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <p className="text-gray-300 text-lg">
                  iPhone valuations, tech exchanges, and instant Planet Points earning through your membership portal.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-emerald-900/40 to-green-900/40 border-2 border-emerald-500/50 hover:scale-105 transition-transform">
              <CardHeader className="text-center">
                <Trophy className="w-16 h-16 text-emerald-400 mx-auto mb-4" />
                <CardTitle className="text-white text-2xl">Rewards Engine</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <p className="text-gray-300 text-lg">
                  Planet Points redemption, Chill & Grill vouchers, and exclusive member discounts on all AquaCafe products.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-purple-900/40 to-pink-900/40 border-2 border-purple-500/50 hover:scale-105 transition-transform">
              <CardHeader className="text-center">
                <Users className="w-16 h-16 text-purple-400 mx-auto mb-4" />
                <CardTitle className="text-white text-2xl">Community Impact</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <p className="text-gray-300 text-lg">
                  Awareness campaigns, environmental initiatives, and social engagement activities exclusive to members.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Lifetime Membership Benefits */}
        <div className="mb-16 bg-gradient-to-r from-amber-900/30 to-orange-900/30 rounded-3xl p-8 md:p-12 border-2 border-amber-500/50">
          <h2 className="text-4xl font-black text-white text-center mb-10">
            💎 Lifetime Membership Benefits
          </h2>
          
          <div className="grid md:grid-cols-2 gap-8">
            {/* FREE Ionic Shower Filter */}
            <div className="bg-slate-800/50 rounded-2xl p-6 border-2 border-cyan-500/50">
              <div className="flex items-start gap-4 mb-4">
                <div className="w-16 h-16 bg-cyan-500/20 rounded-full flex items-center justify-center flex-shrink-0">
                  <Droplets className="w-8 h-8 text-cyan-400" />
                </div>
                <div className="flex-1">
                  <h3 className="text-2xl font-bold text-white mb-2">FREE Ionic Shower Filter</h3>
                  <Badge className="bg-amber-500/30 text-amber-300 mb-3">AED 399 value</Badge>
                  <p className="text-gray-300">Premium beauty & skincare filtration system</p>
                </div>
              </div>
              <img src={showerFilterCollage} alt="Free Shower Filter" className="w-full rounded-lg shadow-lg" />
            </div>

            {/* FREE Membership Card & Setup */}
            <div className="bg-slate-800/50 rounded-2xl p-6 border-2 border-blue-500/50">
              <div className="flex items-start gap-4 mb-4">
                <div className="w-16 h-16 bg-blue-500/20 rounded-full flex items-center justify-center flex-shrink-0">
                  <Crown className="w-8 h-8 text-blue-400" />
                </div>
                <div className="flex-1">
                  <h3 className="text-2xl font-bold text-white mb-2">FREE Membership Card & Setup</h3>
                  <Badge className="bg-amber-500/30 text-amber-300 mb-3">AED 299 value</Badge>
                  <p className="text-gray-300">Professional installation & lifetime support</p>
                </div>
              </div>
              <img src={membershipCard} alt="Membership Card" className="w-full rounded-lg shadow-lg" />
            </div>

            {/* Chill & Grill Partnership */}
            <div className="bg-slate-800/50 rounded-2xl p-6 border-2 border-orange-500/50">
              <div className="flex items-start gap-4 mb-4">
                <div className="w-16 h-16 bg-orange-500/20 rounded-full flex items-center justify-center flex-shrink-0">
                  <Utensils className="w-8 h-8 text-orange-400" />
                </div>
                <div className="flex-1">
                  <h3 className="text-2xl font-bold text-white mb-2">Chill & Grill Partnership</h3>
                  <Badge className="bg-amber-500/30 text-amber-300 mb-3">D100+ per referral</Badge>
                  <p className="text-gray-300">Free vouchers for Pizza & Kulfi for Two + referral rewards</p>
                </div>
              </div>
              <div className="grid grid-cols-3 gap-3">
                <img src={pizzaImage} alt="Delicious Pizza" className="rounded-lg shadow-lg object-cover aspect-square" />
                <img src={kulfiImage} alt="Kulfi Dessert" className="rounded-lg shadow-lg object-cover aspect-square" />
                <img src={happyDiningImage} alt="Happy Dining" className="rounded-lg shadow-lg object-cover aspect-square" />
              </div>
            </div>

            {/* Planet Hero Level 2 Status */}
            <div className="bg-slate-800/50 rounded-2xl p-6 border-2 border-emerald-500/50">
              <div className="flex items-start gap-4">
                <div className="w-16 h-16 bg-emerald-500/20 rounded-full flex items-center justify-center flex-shrink-0">
                  <Star className="w-8 h-8 text-emerald-400" />
                </div>
                <div className="flex-1">
                  <h3 className="text-2xl font-bold text-white mb-2">Planet Hero Level 2 Status</h3>
                  <Badge className="bg-purple-500/30 text-purple-300 mb-3">Exclusive Access</Badge>
                  <p className="text-gray-300 mb-4">Priority support, special events, premium features</p>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-emerald-400">
                      <CheckCircle className="w-5 h-5" />
                      <span>2X Planet Points Multiplier</span>
                    </div>
                    <div className="flex items-center gap-2 text-emerald-400">
                      <CheckCircle className="w-5 h-5" />
                      <span>1000 Welcome Planet Points</span>
                    </div>
                    <div className="flex items-center gap-2 text-emerald-400">
                      <CheckCircle className="w-5 h-5" />
                      <span>Priority Customer Support</span>
                    </div>
                    <div className="flex items-center gap-2 text-emerald-400">
                      <CheckCircle className="w-5 h-5" />
                      <span>Exclusive Event Access</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="text-center mt-10">
            <p className="text-3xl font-black text-amber-400 mb-6">
              AED 99 One-time investment • Lifetime Value: AED 1000+ in benefits
            </p>
            <Button 
              size="lg"
              onClick={handleOrderStarterKit}
              disabled={isOrderLoading}
              className="bg-gradient-to-r from-orange-600 to-amber-600 hover:from-orange-500 hover:to-amber-500 text-white font-black px-12 py-8 text-2xl shadow-2xl transform hover:scale-105 transition-all rounded-full disabled:opacity-50"
              data-testid="button-order-starter-kit-benefits"
            >
              <Gift className="w-8 h-8 mr-3" />
              {isOrderLoading ? "ADDING..." : "ORDER STARTER KIT NOW"}
            </Button>
          </div>
        </div>

        {/* Simplified Loyalty Flow: Join → Earn → Redeem */}
        <div className="mb-16">
          <h2 className="text-4xl font-black text-white text-center mb-12">
            ⚡ Simple 3-Step Loyalty Journey
          </h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            {/* Step 1: Join */}
            <div className="relative">
              <div className="bg-gradient-to-br from-blue-900/40 to-cyan-900/40 border-2 border-blue-500/50 rounded-2xl p-8 text-center">
                <div className="w-20 h-20 bg-blue-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
                  <span className="text-4xl font-black text-blue-400">1</span>
                </div>
                <h3 className="text-3xl font-bold text-white mb-4">Join</h3>
                <p className="text-gray-300 text-lg mb-6">
                  Get the AED 99 Starter Kit with FREE Shower Filter, Membership Card, and Level 2 Hero Status
                </p>
                <div className="space-y-3">
                  <div className="flex items-center gap-2 text-cyan-400">
                    <CheckCircle className="w-5 h-5" />
                    <span>Instant activation</span>
                  </div>
                  <div className="flex items-center gap-2 text-cyan-400">
                    <CheckCircle className="w-5 h-5" />
                    <span>1000 welcome points</span>
                  </div>
                  <div className="flex items-center gap-2 text-cyan-400">
                    <CheckCircle className="w-5 h-5" />
                    <span>FREE installation</span>
                  </div>
                </div>
              </div>
              <div className="hidden md:block absolute top-1/2 -right-4 transform -translate-y-1/2 z-10">
                <ArrowRight className="w-8 h-8 text-emerald-400" />
              </div>
            </div>

            {/* Step 2: Earn */}
            <div className="relative">
              <div className="bg-gradient-to-br from-emerald-900/40 to-green-900/40 border-2 border-emerald-500/50 rounded-2xl p-8 text-center">
                <div className="w-20 h-20 bg-emerald-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
                  <span className="text-4xl font-black text-emerald-400">2</span>
                </div>
                <h3 className="text-3xl font-bold text-white mb-4">Earn</h3>
                <p className="text-gray-300 text-lg mb-6">
                  Collect Planet Points through iPhone trade-ins, referrals, purchases, and eco-actions
                </p>
                <div className="space-y-3">
                  <div className="flex items-center gap-2 text-emerald-400">
                    <Smartphone className="w-5 h-5" />
                    <span>iPhone trade-ins</span>
                  </div>
                  <div className="flex items-center gap-2 text-emerald-400">
                    <Users className="w-5 h-5" />
                    <span>Friend referrals</span>
                  </div>
                  <div className="flex items-center gap-2 text-emerald-400">
                    <ShoppingBag className="w-5 h-5" />
                    <span>Product purchases</span>
                  </div>
                  <div className="flex items-center gap-2 text-emerald-400">
                    <Recycle className="w-5 h-5" />
                    <span>Eco activities</span>
                  </div>
                </div>
              </div>
              <div className="hidden md:block absolute top-1/2 -right-4 transform -translate-y-1/2 z-10">
                <ArrowRight className="w-8 h-8 text-amber-400" />
              </div>
            </div>

            {/* Step 3: Redeem */}
            <div className="bg-gradient-to-br from-amber-900/40 to-orange-900/40 border-2 border-amber-500/50 rounded-2xl p-8 text-center">
              <div className="w-20 h-20 bg-amber-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-4xl font-black text-amber-400">3</span>
              </div>
              <h3 className="text-3xl font-bold text-white mb-4">Redeem</h3>
              <p className="text-gray-300 text-lg mb-6">
                Use Planet Points for Chill & Grill vouchers, iPhones, water systems, and exclusive rewards
              </p>
              <div className="space-y-3">
                <div className="flex items-center gap-2 text-amber-400">
                  <Utensils className="w-5 h-5" />
                  <span>Chill & Grill meals</span>
                </div>
                <div className="flex items-center gap-2 text-amber-400">
                  <Smartphone className="w-5 h-5" />
                  <span>Latest iPhones</span>
                </div>
                <div className="flex items-center gap-2 text-amber-400">
                  <Droplets className="w-5 h-5" />
                  <span>Water systems</span>
                </div>
                <div className="flex items-center gap-2 text-amber-400">
                  <Gift className="w-5 h-5" />
                  <span>Partner rewards</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Chill & Grill Partnership Experience */}
        <div className="mb-16 bg-gradient-to-r from-orange-900/30 to-red-900/30 rounded-3xl p-8 md:p-12 border-2 border-orange-500/50">
          <div className="text-center mb-10">
            <div className="inline-flex items-center gap-2 bg-orange-500/20 text-orange-400 px-6 py-3 rounded-full mb-6">
              <Utensils className="w-6 h-6" />
              <span className="font-bold text-lg">🤝 PARTNERSHIP EXPERIENCE</span>
            </div>
            <h2 className="text-4xl font-black text-white mb-4">
              Chill & Grill: Pizza for Two + Kulfi
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Your membership includes exclusive access to healthy dining experiences. Every friend you refer earns you both D100 vouchers - it's sustainability that pays forward.
            </p>
          </div>

          {/* Lifestyle Gallery */}
          <div className="grid md:grid-cols-3 gap-6 mb-10">
            <div className="relative rounded-2xl overflow-hidden shadow-2xl group">
              <img src={pizzaImage} alt="Delicious Pizza" className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-300" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end p-6">
                <p className="text-white font-bold text-xl">Authentic Pizzas</p>
              </div>
            </div>
            <div className="relative rounded-2xl overflow-hidden shadow-2xl group">
              <img src={kulfiImage} alt="Kulfi Dessert" className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-300" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end p-6">
                <p className="text-white font-bold text-xl">Premium Kulfi</p>
              </div>
            </div>
            <div className="relative rounded-2xl overflow-hidden shadow-2xl group">
              <img src={happyDiningImage} alt="Happy Dining Experience" className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-300" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end p-6">
                <p className="text-white font-bold text-xl">Memorable Moments</p>
              </div>
            </div>
          </div>

          {/* Referral Rewards Process */}
          <div className="bg-slate-800/50 rounded-2xl p-8 border border-orange-500/30">
            <h3 className="text-2xl font-bold text-white text-center mb-8">
              Refer Friends & Get D100 FREE VOUCHER!
            </h3>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="w-16 h-16 bg-blue-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-3xl font-bold text-blue-400">1</span>
                </div>
                <h4 className="font-bold text-white mb-2">Share Code</h4>
                <p className="text-gray-400">Get unique referral code</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-emerald-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-3xl font-bold text-emerald-400">2</span>
                </div>
                <h4 className="font-bold text-white mb-2">Friend Joins</h4>
                <p className="text-gray-400">They purchase using code</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-amber-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-3xl font-bold text-amber-400">3</span>
                </div>
                <h4 className="font-bold text-white mb-2">Both Win!</h4>
                <p className="text-gray-400">D100 voucher each</p>
              </div>
            </div>
          </div>
        </div>

        {/* Planet Points & iPhone Trade-In Integration */}
        <div className="mb-16">
          <h2 className="text-4xl font-black text-white text-center mb-12">
            💰 Maximize Your Rewards
          </h2>
          
          <div className="grid md:grid-cols-2 gap-8">
            {/* Trade-In Calculator CTA */}
            <Card className="bg-gradient-to-br from-blue-900/40 to-purple-900/40 border-2 border-blue-500/50">
              <CardHeader>
                <CardTitle className="text-white text-2xl flex items-center gap-3">
                  <Smartphone className="w-8 h-8 text-blue-400" />
                  iPhone Trade-In Hub
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-300 text-lg mb-6">
                  Turn your old iPhone into instant Planet Points. Get fair valuations and boost your rewards balance.
                </p>
                <div className="bg-slate-800/50 rounded-xl p-4 mb-6">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-gray-400">iPhone 15 Pro</span>
                    <span className="text-emerald-400 font-bold">Up to 15,000 PTS</span>
                  </div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-gray-400">iPhone 14 Pro</span>
                    <span className="text-emerald-400 font-bold">Up to 12,000 PTS</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-400">iPhone 13</span>
                    <span className="text-emerald-400 font-bold">Up to 9,000 PTS</span>
                  </div>
                </div>
                <Link href="/exchange">
                  <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold text-lg py-6" data-testid="button-check-trade-in">
                    <Smartphone className="w-5 h-5 mr-2" />
                    Check Your iPhone Value
                  </Button>
                </Link>
              </CardContent>
            </Card>

            {/* Planet Points Earning */}
            <Card className="bg-gradient-to-br from-emerald-900/40 to-green-900/40 border-2 border-emerald-500/50">
              <CardHeader>
                <CardTitle className="text-white text-2xl flex items-center gap-3">
                  <Star className="w-8 h-8 text-amber-400" />
                  Earn Planet Points
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-300 text-lg mb-6">
                  Multiple ways to earn rewards and build your sustainable lifestyle.
                </p>
                <div className="space-y-4 mb-6">
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 bg-emerald-500/20 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Zap className="w-5 h-5 text-emerald-400" />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-bold text-white mb-1">Welcome Bonus</h4>
                      <p className="text-gray-400 text-sm">1000 PTS instantly on membership</p>
                    </div>
                    <span className="text-emerald-400 font-bold">1,000</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 bg-blue-500/20 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Users className="w-5 h-5 text-blue-400" />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-bold text-white mb-1">Referrals</h4>
                      <p className="text-gray-400 text-sm">Per friend who joins</p>
                    </div>
                    <span className="text-blue-400 font-bold">500</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 bg-purple-500/20 rounded-lg flex items-center justify-center flex-shrink-0">
                      <ShoppingBag className="w-5 h-5 text-purple-400" />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-bold text-white mb-1">Purchases</h4>
                      <p className="text-gray-400 text-sm">1 point per AED spent</p>
                    </div>
                    <span className="text-purple-400 font-bold">1:1</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 bg-amber-500/20 rounded-lg flex items-center justify-center flex-shrink-0">
                      <TrendingUp className="w-5 h-5 text-amber-400" />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-bold text-white mb-1">2X Multiplier</h4>
                      <p className="text-gray-400 text-sm">With Level 2 membership</p>
                    </div>
                    <span className="text-amber-400 font-bold">2X</span>
                  </div>
                </div>
                <Link href="/earn">
                  <Button className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-lg py-6" data-testid="button-earn-points">
                    <Trophy className="w-5 h-5 mr-2" />
                    Start Earning Points
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Final CTA Section */}
        <div className="text-center bg-gradient-to-br from-emerald-900/40 to-blue-900/40 rounded-3xl p-12 border-2 border-emerald-500/50">
          <h2 className="text-5xl font-black text-white mb-6">
            Ready to Transform Your Lifestyle?
          </h2>
          <p className="text-2xl text-gray-300 mb-10 max-w-3xl mx-auto">
            Join the AquaCafe Loyalty Gateway today and start earning rewards while building a sustainable future for Dubai.
          </p>
          <div className="flex flex-col md:flex-row gap-6 justify-center items-center">
            <Button 
              size="lg"
              onClick={handleOrderStarterKit}
              disabled={isOrderLoading}
              className="bg-gradient-to-r from-emerald-600 to-green-600 hover:from-emerald-500 hover:to-green-500 text-white font-black px-16 py-10 text-3xl shadow-2xl transform hover:scale-105 transition-all rounded-full border-4 border-white/20 disabled:opacity-50"
              data-testid="button-order-starter-kit-final"
            >
              <Gift className="w-10 h-10 mr-4" />
              {isOrderLoading ? "ADDING TO CART..." : "ORDER AED 99 STARTER KIT"}
            </Button>
          </div>
          <p className="text-gray-400 mt-6 text-lg">
            ✓ FREE Shower Filter (AED 399) • ✓ FREE Membership Card • ✓ 1000 Welcome Points • ✓ Level 2 Status
          </p>
        </div>

      </div>
    </div>
  );
}
