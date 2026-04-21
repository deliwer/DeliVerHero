import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { Link, useLocation } from "wouter";
import { 
  Home, Rocket, Target, Trophy, Star, Zap, Shield, Award, Heart, 
  Users, Droplets, Leaf, MapPin, Clock, Phone, ChefHat, Gift, 
  CheckCircle, ShoppingCart, Building2, Smartphone, Camera, 
  Footprints, Bike, TreePine, Ship, Crown, Navigation, Recycle,
  TrendingUp, Sparkles, ArrowRight, Utensils, Coffee
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { TombolaWidget } from "@/components/tombola-widget";
import { CouponsPanel } from "@/components/coupons-panel";
import { DubaiWellnessJourney } from "@/components/dubai-wellness-journey";
import { StarsSponsorshipSection } from "@/components/stars-sponsorship-section";
import { shopifyCartService } from "@/lib/shopify-cart";
import aquacafeLogo from "@assets/AquaCafe_Logo_1756289482990.png";
import earnHeroBanner from "@assets/banner_1776801988936.jpg";
import bakersKitchenLogo from "@assets/BK_Logo_1756289175349.jpg";
import showerFilterCollage from "@assets/collage_1755270492135.jpg";
import membershipCard from "@assets/Aquacafe_byDeliWer_Card_Corners_1755482696304.png";
import pizzaImage from "@assets/stock_images/delicious_pizza_clos_ace0f742.jpg";
import bobaTeaImage from "@assets/stock_images/kulfi_indian_ice_cre_64eeba10.jpg";
import happyDiningImage from "@assets/stock_images/happy_people_eating__21b9cf0b.jpg";

export default function Earn() {
  const { toast } = useToast();
  const [, setLocation] = useLocation();
  const [isOrderLoading, setIsOrderLoading] = useState(false);

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
        title: "Added to Cart!",
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
    <div className="min-h-screen w-full max-w-full overflow-x-hidden bg-gradient-to-br from-emerald-50 to-cyan-50">
      {/* Navigation Bar */}
      <div className="w-full max-w-7xl mx-auto px-4 py-4 flex items-center justify-between bg-white/80 backdrop-blur-sm">
        <Link href="/" className="flex items-center gap-2 text-emerald-800 hover:text-emerald-600 transition-colors" data-testid="link-back-home">
          <Home className="w-5 h-5" />
          <span className="font-semibold">DeliWer</span>
        </Link>
        <div className="flex gap-2">
          <Link href="/aquacafe" className="px-4 py-2 rounded-xl bg-emerald-600 text-white text-sm hover:bg-emerald-700 transition-colors" data-testid="link-aquacafe">
            AquaCafe Shop
          </Link>
          <Link href="/collect" className="px-4 py-2 rounded-xl bg-purple-600 text-white text-sm hover:bg-purple-700 transition-colors" data-testid="link-play">
            Play
          </Link>
        </div>
      </div>
      
      {/* Main Hero Section - Earn Rewards */}
      <section className="w-full relative overflow-hidden" data-testid="earn-hero-section">
        {/* Hero banner image */}
        <div className="relative w-full">
          <img
            src={earnHeroBanner}
            alt="Plastic-free oceans — every action funds Dubai's sustainability"
            className="w-full h-48 sm:h-72 md:h-96 object-cover"
            data-testid="img-earn-hero-banner"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-emerald-50 via-emerald-50/30 to-transparent" />
          <div className="absolute inset-x-0 bottom-0 px-4 pb-4 sm:pb-8 text-center">
            <div className="inline-flex items-center bg-gradient-to-r from-emerald-700/95 to-cyan-700/95 backdrop-blur text-white rounded-full px-4 sm:px-6 py-2 sm:py-3 font-bold text-sm sm:text-lg shadow-2xl border border-white/20">
              <Trophy className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
              Turn Plastic Into Rewards
              <Trophy className="w-4 h-4 sm:w-5 sm:h-5 ml-2" />
            </div>
          </div>
        </div>

        <div className="w-full py-8 sm:py-12 px-2 sm:px-4 bg-gradient-to-br from-cyan-500/10 via-emerald-500/10 to-blue-500/10 relative">
        <div className="absolute inset-0 opacity-10 pointer-events-none">
          <div className="absolute top-10 left-10 w-20 h-20 bg-blue-400 rounded-full animate-pulse"></div>
          <div className="absolute top-32 right-20 w-12 h-12 bg-cyan-400 rounded-full animate-bounce"></div>
          <div className="absolute bottom-20 left-1/4 w-16 h-16 bg-emerald-400 rounded-full animate-pulse" style={{animationDelay: '1s'}}></div>
        </div>

        <div className="w-full max-w-7xl mx-auto text-center relative z-10">
          <div className="inline-flex items-center bg-gradient-to-r from-purple-600 to-amber-500 text-white rounded-full px-8 py-4 mb-6 font-bold text-xl shadow-2xl animate-pulse">
            <Trophy className="w-6 h-6 mr-3" />
            EARN REWARDS
            <Trophy className="w-6 h-6 ml-3" />
          </div>
          
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-gray-800 mb-6 leading-tight">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-emerald-600 to-cyan-600 animate-pulse drop-shadow-2xl">
              Impact Commerce Gateway
            </span>
          </h1>
          
          <h2 className="text-xl sm:text-2xl md:text-3xl mb-6 font-bold">
            <span className="text-emerald-600 drop-shadow-lg">Water Filtration</span> • 
            <span className="text-blue-600 drop-shadow-lg">iPhone Trade-ins</span> • 
            <span className="text-amber-600 drop-shadow-lg">Earn DXBs</span>
          </h2>
          
          <p className="text-lg sm:text-xl md:text-2xl text-gray-600 mb-8 max-w-4xl mx-auto leading-relaxed">
            Join AquaCafe Loyalty, earn Dubai Carbon Tokens (DXBs), complete missions, and redeem rewards. Every action funds Dubai's sustainability initiatives.
          </p>
        </div>
      </section>

      {/* ⭐ AquaCafe Loyalty Gateway - LEAD WITH THIS */}
      <section className="w-full py-16 px-4 bg-gradient-to-br from-emerald-900/40 to-blue-900/40 border-y-4 border-emerald-500/50 backdrop-blur-sm" data-testid="aquacafe-loyalty-gateway">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12 relative overflow-hidden rounded-3xl bg-gradient-to-br from-emerald-900/60 to-blue-900/60 border-2 border-emerald-500/50 p-12">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(34,197,94,0.15)_0%,transparent_70%)]"></div>
            <div className="relative z-10">
              <div className="inline-flex items-center gap-2 bg-emerald-500/20 text-emerald-400 px-6 py-3 rounded-full mb-6 border border-emerald-500/50">
                <Gift className="w-6 h-6" />
                <span className="font-bold text-lg">AQUACAFE LOYALTY GATEWAY</span>
              </div>
              <h2 className="text-5xl md:text-7xl font-black text-white mb-6">
                Your Circular Economy Hub
                <span className="block text-emerald-400 mt-2">AED 99 Starter Kit</span>
              </h2>
              <p className="text-2xl text-gray-300 max-w-4xl mx-auto mb-8 leading-relaxed">
                The gateway to Dubai's most innovative sustainability platform. Join AquaCafe Loyalty and unlock iPhone trade-ins, water filtration commerce, and continuous DXB rewards.
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

              <Button 
                size="lg"
                onClick={handleOrderStarterKit}
                disabled={isOrderLoading}
                className="bg-gradient-to-r from-emerald-600 to-green-600 hover:from-emerald-500 hover:to-green-500 text-white font-black px-12 py-8 text-2xl shadow-2xl rounded-full border-4 border-white/20 disabled:opacity-50"
                data-testid="button-order-starter-kit-hero"
              >
                <Zap className="w-8 h-8 mr-3" />
                {isOrderLoading ? "ADDING TO CART..." : "START YOUR JOURNEY - AED 99"}
              </Button>
              <p className="text-gray-400 mt-4 text-sm">
                Join thousands of Dubai residents building a sustainable future
              </p>
            </div>
          </div>

          {/* What's Included */}
          <div className="grid md:grid-cols-2 gap-8 mb-12">
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
              <img src={showerFilterCollage} alt="Free Shower Filter" className="w-full rounded-lg shadow-lg" data-testid="image-shower-filter" />
            </div>

            <div className="bg-slate-800/50 rounded-2xl p-6 border-2 border-blue-500/50">
              <div className="flex items-start gap-4 mb-4">
                <div className="w-16 h-16 bg-blue-500/20 rounded-full flex items-center justify-center flex-shrink-0">
                  <Crown className="w-8 h-8 text-blue-400" />
                </div>
                <div className="flex-1">
                  <h3 className="text-2xl font-bold text-white mb-2">Membership Card & Setup</h3>
                  <Badge className="bg-amber-500/30 text-amber-300 mb-3">AED 299 value</Badge>
                  <p className="text-gray-300">Professional installation & lifetime support</p>
                </div>
              </div>
              <img src={membershipCard} alt="Membership Card" className="w-full rounded-lg shadow-lg" data-testid="image-membership-card" />
            </div>
          </div>

          {/* 3-Step Journey */}
          <div className="mb-12">
            <h3 className="text-4xl font-black text-white text-center mb-12">
              Simple 3-Step Loyalty Journey
            </h3>
            
            <div className="grid md:grid-cols-3 gap-8">
              <div className="relative">
                <div className="bg-gradient-to-br from-blue-900/40 to-cyan-900/40 border-2 border-blue-500/50 rounded-2xl p-8 text-center">
                  <div className="w-20 h-20 bg-blue-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
                    <span className="text-4xl font-black text-blue-400">1</span>
                  </div>
                  <h4 className="text-3xl font-bold text-white mb-4">Join</h4>
                  <p className="text-gray-300 text-lg mb-6">
                    Get AED 99 Starter Kit with FREE Filter, Card & Level 2 Status
                  </p>
                  <div className="space-y-3">
                    <div className="flex items-center gap-2 text-cyan-400">
                      <CheckCircle className="w-5 h-5" />
                      <span>Instant activation</span>
                    </div>
                    <div className="flex items-center gap-2 text-cyan-400">
                      <CheckCircle className="w-5 h-5" />
                      <span>1000 welcome DXBs</span>
                    </div>
                  </div>
                </div>
                <div className="hidden md:block absolute top-1/2 -right-4 transform -translate-y-1/2 z-10">
                  <ArrowRight className="w-8 h-8 text-emerald-400" />
                </div>
              </div>

              <div className="relative">
                <div className="bg-gradient-to-br from-emerald-900/40 to-green-900/40 border-2 border-emerald-500/50 rounded-2xl p-8 text-center">
                  <div className="w-20 h-20 bg-emerald-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
                    <span className="text-4xl font-black text-emerald-400">2</span>
                  </div>
                  <h4 className="text-3xl font-bold text-white mb-4">Earn</h4>
                  <p className="text-gray-300 text-lg mb-6">
                    Collect DXBs through iPhone trade-ins, referrals, purchases
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
                  </div>
                </div>
                <div className="hidden md:block absolute top-1/2 -right-4 transform -translate-y-1/2 z-10">
                  <ArrowRight className="w-8 h-8 text-amber-400" />
                </div>
              </div>

              <div className="bg-gradient-to-br from-amber-900/40 to-orange-900/40 border-2 border-amber-500/50 rounded-2xl p-8 text-center">
                <div className="w-20 h-20 bg-amber-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
                  <span className="text-4xl font-black text-amber-400">3</span>
                </div>
                <h4 className="text-3xl font-bold text-white mb-4">Redeem</h4>
                <p className="text-gray-300 text-lg mb-6">
                  Use DXBs for vouchers, iPhones, water systems & rewards
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
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ⭐ The Circle Dubai: iPhone Trade-In Hub - ENHANCED */}
      <section className="w-full py-16 px-4 bg-gradient-to-br from-blue-900/30 to-cyan-900/30" data-testid="circle-dubai-tradein">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 bg-blue-500/20 text-blue-400 px-6 py-3 rounded-full mb-6 border border-blue-500/50">
              <Recycle className="w-6 h-6 flex-shrink-0" />
              <span className="font-bold text-lg">INSPIRED BY THE CIRCLE DUBAI</span>
            </div>
            <h2 className="text-4xl md:text-6xl font-black text-white mb-6">
              iPhone Trade-In Hub
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400 mt-2">
                E-Waste to Rewards
              </span>
            </h2>
            <p className="text-xl text-gray-300 max-w-4xl mx-auto mb-8">
              Following Dubai Municipality's The Circle initiative for responsible e-waste collection, trade your old iPhone and earn up to <strong className="text-emerald-400">5,000 DXBs</strong> plus instant credit toward water filtration systems.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mb-12">
            {/* Trade-in Value Calculator */}
            <Card className="bg-gradient-to-br from-blue-900/50 to-cyan-900/50 border-2 border-blue-500/50 hover-elevate" data-testid="card-tradein-calculator">
              <CardHeader className="text-center">
                <Smartphone className="w-16 h-16 text-blue-400 mx-auto mb-4" />
                <CardTitle className="text-white text-2xl">Check Your iPhone Value</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <p className="text-gray-300 text-lg mb-6">
                  Select your iPhone model and condition to see instant valuation + DXB rewards
                </p>
                <Link 
                  href="/exchange"
                  className="inline-block w-full bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-500 hover:to-cyan-500 text-white font-bold py-3 px-6 rounded-lg transition-all"
                  data-testid="button-check-value"
                >
                  <Smartphone className="w-5 h-5 inline mr-2" />
                  Get Instant Quote
                </Link>
              </CardContent>
            </Card>

            {/* Environmental Impact */}
            <Card className="bg-gradient-to-br from-emerald-900/50 to-green-900/50 border-2 border-emerald-500/50 hover-elevate" data-testid="card-environmental-impact">
              <CardHeader className="text-center">
                <Leaf className="w-16 h-16 text-emerald-400 mx-auto mb-4" />
                <CardTitle className="text-white text-2xl">Environmental Impact</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <div className="space-y-4 text-gray-300">
                  <div className="flex items-center gap-3">
                    <CheckCircle className="w-6 h-6 text-emerald-400" />
                    <span>Prevents toxic e-waste</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <CheckCircle className="w-6 h-6 text-emerald-400" />
                    <span>Recovers precious metals</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <CheckCircle className="w-6 h-6 text-emerald-400" />
                    <span>Supports circular economy</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Reward Multipliers */}
            <Card className="bg-gradient-to-br from-purple-900/50 to-pink-900/50 border-2 border-purple-500/50 hover-elevate" data-testid="card-reward-multipliers">
              <CardHeader className="text-center">
                <Zap className="w-16 h-16 text-purple-400 mx-auto mb-4" />
                <CardTitle className="text-white text-2xl">DXB Multipliers</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <p className="text-gray-300 mb-4">
                  AquaCafe members get bonus multipliers:
                </p>
                <div className="space-y-3">
                  <Badge className="bg-blue-500/30 text-blue-300 px-4 py-2 text-lg">
                    Level 2: 2X DXBs
                  </Badge>
                  <Badge className="bg-purple-500/30 text-purple-300 px-4 py-2 text-lg">
                    Level 3: 2.5X DXBs
                  </Badge>
                  <Badge className="bg-amber-500/30 text-amber-300 px-4 py-2 text-lg">
                    Level 4: 3X DXBs
                  </Badge>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Trade-in Process */}
          <div className="bg-slate-800/50 rounded-2xl p-8 border border-blue-500/30">
            <h3 className="text-3xl font-bold text-white text-center mb-8">
              📱 How iPhone Trade-In Works
            </h3>
            <div className="grid md:grid-cols-4 gap-6">
              <div className="text-center">
                <div className="w-16 h-16 bg-blue-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-3xl font-bold text-blue-400">1</span>
                </div>
                <h4 className="font-bold text-white mb-2">Get Quote</h4>
                <p className="text-gray-400 text-sm">Select model & condition</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-cyan-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-3xl font-bold text-cyan-400">2</span>
                </div>
                <h4 className="font-bold text-white mb-2">Ship or Drop-off</h4>
                <p className="text-gray-400 text-sm">Free pickup or visit us</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-emerald-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-3xl font-bold text-emerald-400">3</span>
                </div>
                <h4 className="font-bold text-white mb-2">Verification</h4>
                <p className="text-gray-400 text-sm">We inspect your device</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-purple-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-3xl font-bold text-purple-400">4</span>
                </div>
                <h4 className="font-bold text-white mb-2">Get Rewarded!</h4>
                <p className="text-gray-400 text-sm">Instant DXBs + credit</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ⭐ Stars & DXB Monetization - Fund Sustainability */}
      <section className="w-full py-16 px-4 bg-gradient-to-br from-slate-900 to-slate-800 text-white" data-testid="stars-pic-monetization">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-8">
            <div className="inline-flex items-center gap-2 bg-emerald-500/20 text-emerald-400 px-4 py-2 rounded-full border border-emerald-500/30 mb-4">
              <Star className="w-4 h-4 flex-shrink-0" />
              <span className="font-bold text-sm">MONETIZE SUSTAINABILITY</span>
            </div>
            <h2 className="text-3xl md:text-5xl font-bold mb-4">
              Support Global Sustainability with <span className="bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent">Stars & DXBs</span>
            </h2>
            <p className="text-gray-300 text-lg max-w-3xl mx-auto mb-6">
              Purchase Dubai Carbon Tokens directly to support clean water access, e-waste recycling, and environmental awareness campaigns. 
              <strong className="text-emerald-400"> 100 DXBs = $10 value</strong>
            </p>
          </div>
          <StarsSponsorshipSection />
        </div>
      </section>

      {/* Dubai Carbon Tokens (DXBs) - Unified Rewards System */}
      <section className="w-full py-12 px-4 bg-gradient-to-br from-slate-800 to-slate-900" data-testid="pics-rewards-section">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-8">
            <div className="inline-flex items-center gap-2 bg-emerald-500/20 text-emerald-400 px-4 py-2 rounded-full border border-emerald-500/30 mb-4">
              <Star className="w-4 h-4 flex-shrink-0" />
              <span className="font-bold text-sm">UNIFIED REWARDS SYSTEM</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">
              Earn <span className="bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent">Dubai Carbon Tokens (DXBs)</span>
            </h2>
            <p className="text-gray-300 text-lg max-w-3xl mx-auto mb-6">
              One simple reward system that tracks your environmental impact and gives you real value. Use DXBs for products, water delivery, dining, and more.
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            <Card className="bg-gradient-to-r from-emerald-900/30 to-cyan-900/30 border-emerald-500/40 mb-8">
              <CardContent className="p-8">
                <div className="flex items-start gap-6">
                  <div className="w-16 h-16 rounded-full bg-gradient-to-r from-emerald-500 to-cyan-500 flex items-center justify-center flex-shrink-0">
                    <Star className="w-8 h-8 text-white" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-2xl font-bold text-white mb-4">What are DXBs?</h3>
                    <div className="space-y-3 text-gray-300">
                      <div className="flex items-start gap-3">
                        <CheckCircle className="w-5 h-5 mt-1 flex-shrink-0 text-emerald-400" />
                        <div>
                          <p className="font-semibold text-white">Universal Currency</p>
                          <p className="text-sm">Use DXBs across our entire ecosystem - water delivery, premium products, restaurant rewards, and sustainability initiatives</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <CheckCircle className="w-5 h-5 mt-1 flex-shrink-0 text-emerald-400" />
                        <div>
                          <p className="font-semibold text-white">Real Value</p>
                          <p className="text-sm"><strong className="text-emerald-400">100 DXBs = $10 value</strong> - transparent and consistent pricing you can trust</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <CheckCircle className="w-5 h-5 mt-1 flex-shrink-0 text-emerald-400" />
                        <div>
                          <p className="font-semibold text-white">Impact Tracking</p>
                          <p className="text-sm">Every DXB earned represents real environmental impact - CO₂ reduction, water saved, and e-waste recycled through your actions</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <CheckCircle className="w-5 h-5 mt-1 flex-shrink-0 text-emerald-400" />
                        <div>
                          <p className="font-semibold text-white">Flexible Usage</p>
                          <p className="text-sm">Redeem for cash, products, water subscriptions, or donate to sustainability projects - you choose how to use your rewards</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <div className="grid md:grid-cols-2 gap-6">
              <Card className="bg-slate-800/50 border-slate-700">
                <CardContent className="p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center">
                      <Smartphone className="w-6 h-6 text-white" />
                    </div>
                    <h4 className="text-xl font-bold text-white">Earn DXBs</h4>
                  </div>
                  <ul className="space-y-2 text-gray-300 text-sm">
                    <li className="flex items-start gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 mt-1.5 flex-shrink-0" />
                      <span>iPhone trade-ins (up to 22,000 DXBs)</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 mt-1.5 flex-shrink-0" />
                      <span>Shopping sustainable products</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 mt-1.5 flex-shrink-0" />
                      <span>Completing sustainability missions</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 mt-1.5 flex-shrink-0" />
                      <span>Referring friends and family</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>

              <Card className="bg-slate-800/50 border-slate-700">
                <CardContent className="p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-cyan-500 to-blue-500 flex items-center justify-center">
                      <Gift className="w-6 h-6 text-white" />
                    </div>
                    <h4 className="text-xl font-bold text-white">Use DXBs</h4>
                  </div>
                  <ul className="space-y-2 text-gray-300 text-sm">
                    <li className="flex items-start gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-cyan-400 mt-1.5 flex-shrink-0" />
                      <span>Premium water filtration systems</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-cyan-400 mt-1.5 flex-shrink-0" />
                      <span>Free water delivery subscriptions</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-cyan-400 mt-1.5 flex-shrink-0" />
                      <span>Restaurant vouchers & dining rewards</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-cyan-400 mt-1.5 flex-shrink-0" />
                      <span>Cash withdrawal or sustainability donations</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </div>

            <div className="mt-8 text-center bg-gradient-to-r from-emerald-900/20 to-cyan-900/20 rounded-2xl p-6 border border-emerald-500/30">
              <h3 className="text-xl font-bold text-white mb-3 flex items-center justify-center gap-2">
                <Sparkles className="w-5 h-5 text-emerald-400" />
                Simple, Transparent, Impactful
              </h3>
              <p className="text-gray-300 max-w-3xl mx-auto">
                No confusing point systems or multiple currencies. Just DXBs - one unified reward that combines real value with environmental impact tracking.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Chill & Grill Partnership Experience */}
      <section className="w-full py-12 px-4 bg-gradient-to-r from-orange-900/30 to-red-900/30" data-testid="chill-grill-partnership">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-10">
            <div className="inline-flex items-center gap-2 bg-orange-500/20 text-orange-400 px-6 py-3 rounded-full mb-6 border border-orange-500/30">
              <Utensils className="w-6 h-6" />
              <span className="font-bold text-lg">🤝 PARTNERSHIP EXPERIENCE</span>
            </div>
            <h2 className="text-4xl font-black text-white mb-4">
              Chill & Grill: Pizza + Boba Tea for Two
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Your membership includes exclusive access to healthy dining experiences. Every friend you refer earns you both D100 vouchers.
            </p>
          </div>

          {/* Lifestyle Gallery */}
          <div className="grid md:grid-cols-3 gap-6 mb-10">
            <div className="relative rounded-2xl overflow-hidden shadow-2xl" data-testid="image-pizza">
              <img src={pizzaImage} alt="Delicious Pizza" className="w-full h-64 object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end p-6">
                <p className="text-white font-bold text-xl">Authentic Pizzas</p>
              </div>
            </div>
            <div className="relative rounded-2xl overflow-hidden shadow-2xl" data-testid="image-boba">
              <img src={bobaTeaImage} alt="Boba Tea" className="w-full h-64 object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end p-6">
                <p className="text-white font-bold text-xl">Premium Boba Tea</p>
              </div>
            </div>
            <div className="relative rounded-2xl overflow-hidden shadow-2xl" data-testid="image-dining">
              <img src={happyDiningImage} alt="Happy Dining Experience" className="w-full h-64 object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end p-6">
                <p className="text-white font-bold text-xl">Memorable Moments</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* AquaCafe Heroes Tombola - Win Prizes While Earning */}
      <section className="w-full py-12 px-4 bg-gradient-to-br from-cyan-600/5 to-blue-600/5 relative overflow-hidden" data-testid="tombola-section">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 left-10 w-20 h-20 bg-blue-400 rounded-full animate-pulse"></div>
          <div className="absolute top-32 right-20 w-12 h-12 bg-cyan-400 rounded-full animate-bounce"></div>
          <div className="absolute bottom-20 left-1/4 w-16 h-16 bg-emerald-400 rounded-full animate-pulse" style={{animationDelay: '1s'}}></div>
          <div className="absolute bottom-32 right-1/3 w-8 h-8 bg-blue-300 rounded-full animate-bounce" style={{animationDelay: '2s'}}></div>
        </div>
        
        <div className="max-w-4xl mx-auto relative z-10">
          <div className="text-center mb-8">
            <div className="flex items-center justify-center gap-3 mb-4">
              <Droplets className="w-8 h-8 text-cyan-600" />
              <h2 className="text-3xl font-bold text-gray-800">
                Win Rewards While You Earn
              </h2>
              <Leaf className="w-8 h-8 text-emerald-600" />
            </div>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-4">
              🌊 <strong>Every spin saves our planet!</strong> Win exclusive AquaCafe prizes, digital coupons, and bonus Planet Points while supporting clean water initiatives.
            </p>
            <div className="flex items-center justify-center gap-6 text-sm text-gray-500">
              <div className="flex items-center gap-2">
                <Target className="w-4 h-4" />
                <span>Zero Plastic Waste</span>
              </div>
              <div className="flex items-center gap-2">
                <Zap className="w-4 h-4" />
                <span>Clean Energy Powered</span>
              </div>
              <div className="flex items-center gap-2">
                <Award className="w-4 h-4" />
                <span>Hero Impact Certified</span>
              </div>
            </div>
          </div>
          
          <div className="grid lg:grid-cols-2 gap-8">
            <div className="flex justify-center">
              <TombolaWidget heroId="founder-1" theme="aquacafe" size="full" />
            </div>
            <div className="flex justify-center">
              <CouponsPanel heroId="founder-1" theme="aquacafe" showTitle={true} />
            </div>
          </div>
        </div>
      </section>

      {/* Missions Hub - Activities to Earn DXBs */}
      <section className="w-full py-12 px-4 bg-gradient-to-br from-blue-50 to-emerald-50" data-testid="missions-hub">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-800 mb-4">
              Earn More DXBs - Missions Hub
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Complete missions to earn Dubai Carbon Tokens. Every action contributes to Dubai's circular economy and funds global sustainability initiatives.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* iPhone Trade-in Mission */}
            <Card className="bg-white border-blue-300 shadow-lg hover:shadow-xl transition-all">
              <CardContent className="p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                    <Smartphone className="w-6 h-6 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-800">iPhone Trade-in</h3>
                    <p className="text-sm text-blue-600 font-bold">Up to 5,000 DXBs</p>
                  </div>
                </div>
                <p className="text-sm text-gray-600 mb-4">
                  Trade your old iPhone and get instant DXBs plus credit toward AquaCafe water systems
                </p>
                <Link 
                  href="/exchange"
                  className="inline-block w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg text-center transition-all"
                  data-testid="button-mission-tradein"
                >
                  Start Trade-in
                </Link>
              </CardContent>
            </Card>

            {/* Join AquaCafe Mission */}
            <Card className="bg-white border-emerald-300 shadow-lg hover:shadow-xl transition-all">
              <CardContent className="p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 bg-emerald-100 rounded-full flex items-center justify-center">
                    <Droplets className="w-6 h-6 text-emerald-600" />
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-800">AquaCafe Membership</h3>
                    <p className="text-sm text-emerald-600 font-bold">1,000 DXBs</p>
                  </div>
                </div>
                <p className="text-sm text-gray-600 mb-4">
                  Get the AED 99 Starter Kit and become a Planet Hero Level 2 member with instant DXBs
                </p>
                <Button 
                  onClick={handleOrderStarterKit}
                  disabled={isOrderLoading}
                  className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold"
                  data-testid="button-mission-membership"
                >
                  {isOrderLoading ? "Adding..." : "Join Now"}
                </Button>
              </CardContent>
            </Card>

            {/* Referral Mission */}
            <Card className="bg-white border-amber-300 shadow-lg hover:shadow-xl transition-all">
              <CardContent className="p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 bg-amber-100 rounded-full flex items-center justify-center">
                    <Users className="w-6 h-6 text-amber-600" />
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-800">Referral Bonus</h3>
                    <p className="text-sm text-amber-600 font-bold">500 DXBs + AED 100</p>
                  </div>
                </div>
                <p className="text-sm text-gray-600 mb-4">
                  Refer a friend to AquaCafe and both get AED 100 Chill & Grill voucher + 500 DXBs
                </p>
                <Button 
                  onClick={() => {
                    toast({
                      title: "Referral Code",
                      description: "Your unique referral code: HERO" + Math.random().toString(36).substr(2, 6).toUpperCase()
                    });
                  }}
                  className="w-full bg-amber-600 hover:bg-amber-700 text-white font-bold"
                  data-testid="button-mission-referral"
                >
                  Get Referral Code
                </Button>
              </CardContent>
            </Card>

            {/* Daily Check-in */}
            <Card className="bg-white border-purple-300 shadow-lg hover:shadow-xl transition-all">
              <CardContent className="p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
                    <Star className="w-6 h-6 text-purple-600" />
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-800">Daily Check-in</h3>
                    <p className="text-sm text-purple-600 font-bold">50 DXBs/Day</p>
                  </div>
                </div>
                <p className="text-sm text-gray-600 mb-4">
                  Log in daily to collect 50 DXBs and maintain your streak
                </p>
                <Button 
                  onClick={() => {
                    toast({
                      title: "Daily Reward Claimed!",
                      description: "+50 DXBs earned! Come back tomorrow for more!"
                    });
                  }}
                  className="w-full bg-purple-600 hover:bg-purple-700 text-white font-bold"
                  data-testid="button-mission-checkin"
                >
                  Claim Daily Reward
                </Button>
              </CardContent>
            </Card>

            {/* Eco Challenge */}
            <Card className="bg-white border-green-300 shadow-lg hover:shadow-xl transition-all">
              <CardContent className="p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                    <TreePine className="w-6 h-6 text-green-600" />
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-800">Plastic-Free Week</h3>
                    <p className="text-sm text-green-600 font-bold">1,000 DXBs</p>
                  </div>
                </div>
                <p className="text-sm text-gray-600 mb-4">
                  Complete the 7-day plastic-free challenge and document your journey
                </p>
                <Link 
                  href="/collect"
                  className="inline-block w-full bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-lg text-center transition-all"
                  data-testid="button-mission-challenge"
                >
                  Start Challenge
                </Link>
              </CardContent>
            </Card>

            {/* Community Event */}
            <Card className="bg-white border-pink-300 shadow-lg hover:shadow-xl transition-all">
              <CardContent className="p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 bg-pink-100 rounded-full flex items-center justify-center">
                    <Heart className="w-6 h-6 text-pink-600" />
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-800">Community Event</h3>
                    <p className="text-sm text-pink-600 font-bold">750 DXBs</p>
                  </div>
                </div>
                <p className="text-sm text-gray-600 mb-4">
                  Attend Chill & Grill sustainability workshop and Kangen Water demo
                </p>
                <Button 
                  onClick={() => {
                    toast({
                      title: "Event Registered",
                      description: "See you at Chill & Grill Clover Bay Tower, Business Bay!"
                    });
                  }}
                  className="w-full bg-pink-600 hover:bg-pink-700 text-white font-bold"
                  data-testid="button-mission-event"
                >
                  Register for Event
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Partnership Section */}
      <section className="w-full py-8 sm:py-16 px-2 sm:px-4 bg-gradient-to-br from-cyan-500/10 via-emerald-500/10 to-amber-500/10 relative overflow-hidden" data-testid="partnership-hero" style={{ maxWidth: '100vw' }}>
        <div className="w-full max-w-full mx-auto" style={{ maxWidth: '100vw' }}>
          <div className="text-center mb-8 sm:mb-12">
            <div className="flex flex-col items-center justify-center gap-4 mb-6">
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-8 mb-4">
                <div className="flex flex-col items-center">
                  <img 
                    src={aquacafeLogo} 
                    alt="AquaCafe by DeliWer Logo" 
                    className="h-16 sm:h-20 w-auto object-contain mb-2"
                  />
                  <div className="bg-gradient-to-r from-cyan-500 to-blue-600 text-white px-3 py-1 rounded-full font-bold text-xs">
                    Water Filtration
                  </div>
                </div>
                
                <div className="flex items-center justify-center">
                  <span className="text-3xl sm:text-4xl font-bold text-emerald-500">×</span>
                </div>
                
                <div className="flex flex-col items-center">
                  <img 
                    src={bakersKitchenLogo} 
                    alt="Chill & Grill Logo" 
                    className="h-16 sm:h-20 w-auto object-contain mb-2"
                  />
                  <div className="bg-gradient-to-r from-amber-500 to-orange-500 text-white px-3 py-1 rounded-full font-bold text-xs">
                    Healthy Dining
                  </div>
                </div>
              </div>
            </div>
            
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-800 mb-4">
              Earn DXBs Through Our Partnership Network
            </h2>
            
            <p className="text-lg sm:text-xl text-gray-600 mb-6 max-w-3xl mx-auto">
              AquaCafe + Chill & Grill: The perfect synergy of pure water and wholesome nutrition for earning rewards
            </p>
            
            <Link
              href="/aquacafe"
              className="inline-block bg-gradient-to-r from-emerald-500 to-cyan-500 hover:from-emerald-600 hover:to-cyan-600 text-white px-6 py-3 text-base font-bold rounded-xl shadow-lg transition-all"
              data-testid="button-join-partnership"
            >
              <ShoppingCart className="mr-3 w-5 h-5 inline" />
              Join Partnership Program
            </Link>
          </div>

          <div className="grid md:grid-cols-2 gap-4 sm:gap-6 mb-6 sm:mb-8">
            <Card className="bg-gradient-to-br from-cyan-50 to-blue-50 border-cyan-200 shadow-lg">
              <CardContent className="p-4 sm:p-6">
                <div className="flex items-center gap-4 mb-4">
                  <img 
                    src={aquacafeLogo} 
                    alt="AquaCafe Logo" 
                    className="h-10 w-auto object-contain"
                  />
                  <div>
                    <h3 className="text-lg font-bold text-gray-800">AquaCafe Rewards</h3>
                    <p className="text-cyan-600 text-sm font-semibold">Earn DXBs with every purchase</p>
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-2 text-xs sm:text-sm text-gray-700">
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-3 h-3 text-emerald-500" />
                    <span>Starter Kit: 1,000 DXBs</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-3 h-3 text-emerald-500" />
                    <span>Filter refills: 200 DXBs</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-3 h-3 text-emerald-500" />
                    <span>System upgrade: 500 DXBs</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-3 h-3 text-emerald-500" />
                    <span>Referrals: 500 DXBs each</span>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card className="bg-gradient-to-br from-amber-50 to-orange-50 border-amber-200 shadow-lg">
              <CardContent className="p-4 sm:p-6">
                <div className="flex items-center gap-4 mb-4">
                  <img 
                    src={bakersKitchenLogo} 
                    alt="Chill & Grill Logo" 
                    className="h-10 w-auto object-contain"
                  />
                  <div>
                    <h3 className="text-lg font-bold text-gray-800">Chill & Grill Perks</h3>
                    <p className="text-amber-600 text-sm font-semibold">Redeem DXBs for dining vouchers</p>
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-2 text-xs sm:text-sm text-gray-700">
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-3 h-3 text-emerald-500" />
                    <span>AED 100 voucher</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-3 h-3 text-emerald-500" />
                    <span>Kangen Water demos</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-3 h-3 text-emerald-500" />
                    <span>Special events</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-3 h-3 text-emerald-500" />
                    <span>Member discounts</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="text-center">
            <div className="bg-white/80 backdrop-blur-sm rounded-xl p-4 sm:p-6 border border-emerald-200 shadow-lg inline-block">
              <div className="text-amber-600 font-bold text-base sm:text-lg mb-2">Visit Chill & Grill Clover Bay Tower, Business Bay</div>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4 text-sm text-gray-600">
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-amber-500" />
                  <span>Clover Bay Tower, Business Bay Dubai</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-emerald-500" />
                  <span>Open Daily 9AM-11PM</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Dubai Wellness Journey Passport */}
      <DubaiWellnessJourney 
        variant="aquacafe"
        showMembershipCTA={true}
        onMembershipSignup={() => {
          toast({
            title: "Unlock All Locations",
            description: "Get the AquaCafe starter kit to unlock exclusive access to all wellness locations!",
          });
          window.location.href = '/aquacafe';
        }}
      />

      {/* CTA Footer */}
      <footer className="w-full border-t border-emerald-200 mt-8 bg-gradient-to-r from-emerald-50 to-cyan-50">
        <div className="w-full max-w-7xl mx-auto px-4 py-8">
          <div className="text-center mb-6">
            <h3 className="text-2xl font-bold text-gray-800 mb-4">Ready to Start Earning?</h3>
            <p className="text-gray-600 mb-6">
              Join thousands of Planet Heroes earning rewards while making Dubai more sustainable
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="/exchange"
                className="inline-block px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl transition-all shadow-lg"
                data-testid="footer-cta-exchange"
              >
                <Smartphone className="inline w-5 h-5 mr-2" />
                Trade Your iPhone
              </Link>
              <Button
                onClick={handleOrderStarterKit}
                disabled={isOrderLoading}
                className="px-8 py-4 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl shadow-lg"
                data-testid="footer-cta-aquacafe"
              >
                <Droplets className="inline w-5 h-5 mr-2" />
                {isOrderLoading ? "Adding..." : "Get Starter Kit"}
              </Button>
              <Link
                href="/collect"
                className="inline-block px-8 py-4 bg-purple-600 hover:bg-purple-700 text-white font-bold rounded-xl transition-all shadow-lg"
                data-testid="footer-cta-play"
              >
                <Trophy className="inline w-5 h-5 mr-2" />
                Play & Earn
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
