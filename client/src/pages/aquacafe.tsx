import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { useLocation } from "wouter";
import { shopifyCartService } from "@/lib/shopify-cart";
import { Link } from "wouter";
import { Star, ShoppingCart, Gift, CheckCircle, Zap, Shield, Award, Heart, Home, Users, Rocket, Target, Eye, Droplets, Leaf, MapPin, Clock, Phone, ChefHat, Bike, Footprints, Ship, TreePine, Building2, Camera, Crown, Navigation, Smartphone, Trophy } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ARPreview } from "@/components/ar-preview";
import { TombolaWidget } from "@/components/tombola-widget";
import { CouponsPanel } from "@/components/coupons-panel";
import { DubaiWellnessJourney } from "@/components/dubai-wellness-journey";
import aquacafeTradeIn from "@assets/Banner_AquaCafe_1755270492134.jpg";
import beautyWater1 from "@assets/Beauty_Water_1_1756065010937.jpg";
import beautyWater2 from "@assets/Beauty_Water_2_1756065010940.jpg";
import plumberBanner from "@assets/To_Do_Banner_Plumber_Sm_1756065010946.jpg";
import rollupBanner from "@assets/Rollup_Banner_Image_1756065010951.jpg";
import washingFace from "@assets/washing-face-01 (1)_1756065010952.jpg";
import withoutText from "@assets/without_text_1756065010951.jpg";
import aquacafeLogo from "@assets/AquaCafe_Logo_1756289482990.png";
import bakersKitchenLogo from "@assets/BK_Logo_1756289175349.jpg";

export default function AquaCafe() {
  const [isOrderLoading, setIsOrderLoading] = useState<string | null>(null);
  const [arPreview, setArPreview] = useState<{ isOpen: boolean; product: any }>({ isOpen: false, product: null });
  const { toast } = useToast();
  const [, setLocation] = useLocation();

  const plans = [
    {
      id: "hero-minimal",
      name: "AquaCafe Hero Minimal - PLANET HERO ENTRY",
      price: 1299,
      originalPrice: 1599,
      promotionalPrice: 1299,
      heroDiscount: 300,
      features: [
        "💧 Premium 3-stage filtration system",
        "📦 12-month filter supply included",
        "⭐ Instant Planet Hero Level 2 status",
        "🎯 1000 starter points + 2X Hero multiplier",
        "📞 24/7 Planet Hero priority support",
        "📱 Smart monitoring app with Hero dashboard",
        "🏆 Exclusive Hero member badge",
        "💰 20% discount on ALL future plans",
        "🍰 AED 100 Baker's Kitchen voucher when friend signs up via referral"
      ],
      badge: "🚀 PLANET HERO GATEWAY",
      isHeroEntry: true
    },
    {
      id: "hero-premium",
      name: "AquaCafe Hero Premium",
      price: 1499,
      originalPrice: 1999,
      features: [
        "Advanced 5-stage filtration",
        "18-month filter supply",
        "Planet Hero Level 3 status",
        "2500 starter points + 2X multiplier",
        "24/7 priority phone support",
        "Smart water quality monitoring",
        "Exclusive Hero premium badge",
        "Free home installation"
      ],
      badge: "⚡ MOST POPULAR",
      popular: true
    },
    {
      id: "hero-elite",
      name: "AquaCafe Hero Elite",
      price: 2299,
      originalPrice: 2999,
      features: [
        "Ultimate 7-stage whole-home system",
        "36-month filter supply",
        "Planet Hero Level 4 Elite status",
        "5000 starter points + 3X multiplier",
        "24/7 VIP concierge support",
        "AI-powered smart home integration",
        "Elite Hero platinum badges",
        "Free annual maintenance & upgrades",
        "Carbon footprint certificate"
      ],
      badge: "🏆 ULTIMATE HERO"
    }
  ];

  const handleOrderNow = async (planId: string) => {
    const plan = plans.find(p => p.id === planId);
    if (!plan) return;
    
    setIsOrderLoading(planId);
    
    try {
      // Add AquaCafe product to cart
      const aquacafeProduct = {
        id: `aquacafe-${planId}`,
        variantId: `gid://shopify/ProductVariant/aquacafe-${planId}`,
        title: plan.name,
        variant: planId,
        price: plan.price,
        image: "🌊", // Using emoji as placeholder - will be replaced with actual image
        quantity: 1,
      };

      // Add to cart using our cart service
      await shopifyCartService.addToCart(aquacafeProduct);
      
      toast({
        title: "Added to Cart!",
        description: `${plan.name} has been added to your cart`,
      });

      // Navigate to checkout page
      setLocation('/checkout');
      
    } catch (error) {
      console.error('Error adding to cart:', error);
      toast({
        title: "Error",
        description: "Failed to add to cart. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsOrderLoading(null);
    }
  };

  const handleARPreview = (plan: typeof plans[0]) => {
    const product = {
      id: plan.id,
      name: plan.name,
      category: 'water-solutions',
      image: '🚰',
      price: plan.price
    };
    setArPreview({ isOpen: true, product });
    toast({
      title: "AR Preview Loading",
      description: "Initializing AR preview for " + plan.name,
    });
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
          <Link href="/products" className="px-4 py-2 rounded-xl bg-emerald-600 text-white text-sm hover:bg-emerald-700 transition-colors" data-testid="link-shop-all">
            Shop All
          </Link>
          <Link href="/earn" className="px-4 py-2 rounded-xl bg-blue-600 text-white text-sm hover:bg-blue-700 transition-colors" data-testid="link-start-earning">
            Start Earning
          </Link>
        </div>
      </div>
      
      {/* New Game Hero Section */}
      <section className="w-full py-8 sm:py-16 px-2 sm:px-4 bg-gradient-to-br from-cyan-500/10 via-emerald-500/10 to-blue-500/10 relative overflow-hidden" data-testid="hero-section">
        {/* Game Background Elements */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 left-10 w-20 h-20 bg-blue-400 rounded-full animate-pulse"></div>
          <div className="absolute top-32 right-20 w-12 h-12 bg-cyan-400 rounded-full animate-bounce"></div>
          <div className="absolute bottom-20 left-1/4 w-16 h-16 bg-emerald-400 rounded-full animate-pulse" style={{animationDelay: '1s'}}></div>
        </div>
        
        <div className="w-full max-w-7xl mx-auto text-center relative z-10">
          {/* Game Title */}
          <div className="inline-flex items-center bg-gradient-to-r from-purple-600 to-amber-500 text-white rounded-full px-8 py-4 mb-6 font-bold text-xl shadow-2xl animate-pulse">
            <Rocket className="w-6 h-6 mr-3" />
            🎮 THE ULTIMATE ECO-GAME 🎮
            <Rocket className="w-6 h-6 ml-3" />
          </div>
          
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-gray-800 mb-6 leading-tight">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-emerald-600 to-cyan-600 animate-pulse drop-shadow-2xl">
              "From iPhones to Water Game"
            </span>
          </h1>
          
          <h2 className="text-xl sm:text-2xl md:text-3xl mb-6 font-bold">
            <span className="text-emerald-600 drop-shadow-lg">Play Dubai Canal Journey</span> • 
            <span className="text-blue-600 drop-shadow-lg">Earn Planet Points</span> • 
            <span className="text-amber-600 drop-shadow-lg">Redeem Rewards</span>
          </h2>
          
          <p className="text-lg sm:text-xl md:text-2xl text-gray-600 mb-8 max-w-4xl mx-auto leading-relaxed">
            Transform your iPhone into premium water systems while exploring Dubai Canal's sustainable ecosystem from Creek Harbour to Marina through the most addictive eco-gaming experience.
          </p>
          
          {/* 3-Step Game Flow */}
          <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto mb-8">
            {/* Step 1: Start Your Journey */}
            <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-6 border-2 border-emerald-300 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
              <div className="text-emerald-600 font-bold text-3xl mb-3">STEP 1</div>
              <div className="text-emerald-600 text-2xl mb-3">🚀</div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">Start Your Journey</h3>
              <p className="text-gray-600 text-sm mb-4">Get AquaCafe Starter Kit & join Planet Heroes</p>
              <Button 
                onClick={() => {
                  const element = document.querySelector('[data-testid="starter-kit-gateway"]');
                  if (element) {
                    element.scrollIntoView({ behavior: 'smooth' });
                  }
                }}
                className="w-full bg-emerald-500 hover:bg-emerald-600 text-white font-bold py-2 text-sm rounded-lg"
                data-testid="button-step1-starter-kit"
              >
                Order Starter Kit
              </Button>
            </div>
            
            {/* Step 2: Missions Hub */}
            <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-6 border-2 border-blue-300 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
              <div className="text-blue-600 font-bold text-3xl mb-3">STEP 2</div>
              <div className="text-blue-600 text-2xl mb-3">🎯</div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">Missions Hub</h3>
              <p className="text-gray-600 text-sm mb-4">Explore Dubai Canal & earn Planet Points</p>
              <Button 
                onClick={() => {
                  const element = document.querySelector('[data-testid="missions-hub"]');
                  if (element) {
                    element.scrollIntoView({ behavior: 'smooth' });
                  }
                }}
                className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 text-sm rounded-lg"
                data-testid="button-step2-missions"
              >
                Enter Missions Hub
              </Button>
            </div>
            
            {/* Step 3: Redeem Rewards */}
            <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-6 border-2 border-amber-300 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
              <div className="text-amber-600 font-bold text-3xl mb-3">STEP 3</div>
              <div className="text-amber-600 text-2xl mb-3">🏆</div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">Redeem Your Rewards</h3>
              <p className="text-gray-600 text-sm mb-4">Unlock exclusive benefits at partner locations</p>
              <Button 
                onClick={() => {
                  const element = document.querySelector('[data-testid="rewards-redemption"]');
                  if (element) {
                    element.scrollIntoView({ behavior: 'smooth' });
                  }
                }}
                className="w-full bg-amber-500 hover:bg-amber-600 text-white font-bold py-2 text-sm rounded-lg"
                data-testid="button-step3-redeem"
              >
                Redeem Rewards
              </Button>
            </div>
          </div>
          
          {/* Primary Game CTA */}
          <div className="mb-6">
            <Button
              onClick={() => {
                const element = document.querySelector('[data-testid="starter-kit-gateway"]');
                if (element) {
                  element.scrollIntoView({ behavior: 'smooth' });
                }
              }}
              className="bg-gradient-to-r from-emerald-500 via-blue-500 to-amber-500 hover:from-emerald-600 hover:via-blue-600 hover:to-amber-600 text-white px-12 py-6 rounded-3xl font-bold text-xl lg:text-2xl shadow-2xl transform hover:scale-105 transition-all duration-300"
              data-testid="button-start-game"
            >
              <Rocket className="w-8 h-8 mr-3" />
              🎮 START THE GAME 🎮
              <Target className="w-8 h-8 ml-3" />
            </Button>
          </div>
          
          <p className="text-gray-500 text-sm">
            Join 12,847+ Planet Heroes in Dubai's most addictive sustainability game
          </p>
        </div>
      </section>

      {/* AquaCafe Heroes Tombola Gamification */}
      <section className="w-full py-12 px-4 bg-gradient-to-br from-cyan-600/5 to-blue-600/5 relative overflow-hidden" data-testid="tombola-section">
        {/* Sustainability Background Elements */}
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
                AquaCafe Heroes Sustainability Rewards
              </h2>
              <Leaf className="w-8 h-8 text-emerald-600" />
            </div>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-4">
              🌊 <strong>Every spin saves our planet!</strong> Win exclusive AquaCafe prizes, digital coupons, and bonus Planet Points while supporting clean water initiatives and plastic reduction worldwide.
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
            {/* Tombola Widget */}
            <div className="flex justify-center">
              <TombolaWidget heroId="founder-1" theme="aquacafe" size="full" />
            </div>
            
            {/* Digital Coupons Wallet */}
            <div className="flex justify-center">
              <CouponsPanel heroId="founder-1" theme="aquacafe" showTitle={true} />
            </div>
          </div>
        </div>
      </section>

      {/* Combined Partnership Section with Why AquaCafe + Baker's Kitchen */}
      <section className="w-full py-8 sm:py-16 px-2 sm:px-4 bg-gradient-to-br from-cyan-500/10 via-emerald-500/10 to-amber-500/10 relative overflow-hidden" data-testid="partnership-hero" style={{ maxWidth: '100vw' }}>
        <div className="w-full max-w-full mx-auto" style={{ maxWidth: '100vw' }}>
          {/* Partnership Header with Logos */}
          <div className="text-center mb-8 sm:mb-12">
            <div className="flex flex-col items-center justify-center gap-4 mb-6">
              {/* Logo Row */}
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
                    alt="Baker's Kitchen UAE Logo" 
                    className="h-16 sm:h-20 w-auto object-contain mb-2"
                  />
                  <div className="bg-gradient-to-r from-amber-500 to-orange-500 text-white px-3 py-1 rounded-full font-bold text-xs">
                    Healthy Dining
                  </div>
                </div>
              </div>
            </div>
            
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-800 mb-4">
              Why AquaCafe + Baker's Kitchen?
            </h2>
            
            <p className="text-lg sm:text-xl text-gray-600 mb-6 max-w-3xl mx-auto">
              The perfect synergy of pure water and wholesome nutrition for your health and our planet
            </p>
            
            <Button
              onClick={() => window.location.href = '/checkout'}
              className="bg-gradient-to-r from-emerald-500 to-cyan-500 hover:from-emerald-600 hover:to-cyan-600 text-white px-6 py-3 text-base font-bold rounded-xl shadow-lg transition-all"
              data-testid="button-experience-alliance"
            >
              <ShoppingCart className="mr-3 w-5 h-5" />
              Go to Checkout
            </Button>
          </div>

          {/* Partnership Benefits - Compact Grid */}
          <div className="grid md:grid-cols-2 gap-4 sm:gap-6 mb-6 sm:mb-8">
            {/* AquaCafe Card */}
            <Card className="bg-gradient-to-br from-cyan-50 to-blue-50 border-cyan-200 shadow-lg">
              <CardContent className="p-4 sm:p-6">
                <div className="flex items-center gap-4 mb-4">
                  <img 
                    src={aquacafeLogo} 
                    alt="AquaCafe Logo" 
                    className="h-10 w-auto object-contain"
                  />
                  <div>
                    <h3 className="text-lg font-bold text-gray-800">AquaCafe by DeliWer</h3>
                    <p className="text-cyan-600 text-sm font-semibold">Eco-Friendly Water Filtration</p>
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-2 text-xs sm:text-sm text-gray-700">
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-3 h-3 text-emerald-500" />
                    <span>Plastic-free solutions</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-3 h-3 text-emerald-500" />
                    <span>Kangen technology</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-3 h-3 text-emerald-500" />
                    <span>Family hydration</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-3 h-3 text-emerald-500" />
                    <span>7-stage filtration</span>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            {/* Baker's Kitchen Card */}
            <Card className="bg-gradient-to-br from-amber-50 to-orange-50 border-amber-200 shadow-lg">
              <CardContent className="p-4 sm:p-6">
                <div className="flex items-center gap-4 mb-4">
                  <img 
                    src={bakersKitchenLogo} 
                    alt="Baker's Kitchen Logo" 
                    className="h-10 w-auto object-contain"
                  />
                  <div>
                    <h3 className="text-lg font-bold text-gray-800">Baker's Kitchen UAE</h3>
                    <p className="text-amber-600 text-sm font-semibold">Healthy Restaurant Experience</p>
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-2 text-xs sm:text-sm text-gray-700">
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-3 h-3 text-emerald-500" />
                    <span>Fresh meals</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-3 h-3 text-emerald-500" />
                    <span>Kangen Water served</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-3 h-3 text-emerald-500" />
                    <span>Mazaya Center</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-3 h-3 text-emerald-500" />
                    <span>Gourmet experience</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Partnership Location Info with Alliance CTA */}
          <div className="text-center">
            <div className="bg-white/80 backdrop-blur-sm rounded-xl p-4 sm:p-6 border border-emerald-200 shadow-lg inline-block mb-6">
              <div className="text-amber-600 font-bold text-base sm:text-lg mb-2">Visit Baker's Kitchen Mazaya Center</div>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4 text-sm text-gray-600">
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-amber-500" />
                  <span>Mazaya Center, Business Bay</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-emerald-500" />
                  <span>Open Daily 9AM-11PM</span>
                </div>
              </div>
            </div>
            
            {/* Alliance Partner CTA */}
            <div className="max-w-2xl mx-auto">
              <Link href="/aquacafe-alliance" className="block">
                <div className="bg-gradient-to-r from-amber-500 to-orange-500 text-white rounded-2xl p-6 shadow-2xl hover:shadow-3xl transition-all duration-300 hover:scale-105">
                  <div className="flex items-center justify-center gap-3 mb-3">
                    <ChefHat className="w-8 h-8" />
                    <span className="text-2xl font-bold">Experience Our Alliance</span>
                    <Gift className="w-8 h-8" />
                  </div>
                  <p className="text-lg mb-4">Discover how AquaCafe + Dr Sven The Baker are revolutionizing wellness in Dubai</p>
                  <div className="bg-white/20 rounded-lg p-3 text-sm">
                    <strong>🎁 Referral Rewards:</strong> Get AED 100 Baker's Kitchen vouchers when your friends join our community!
                  </div>
                </div>
              </Link>
            </div>
          </div>
        </div>
      </section>
      
      {/* Referral Rewards System CTA */}
      <section className="w-full py-16 px-4 bg-gradient-to-r from-purple-600 via-pink-600 to-red-500 relative overflow-hidden">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative max-w-7xl mx-auto text-center">
          <div className="mb-8">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
              🎁 Refer Friends, Earn Rewards! 🎁
            </h2>
            <p className="text-xl text-white/90 max-w-3xl mx-auto mb-8">
              Share the wellness journey with your friends and family. Every successful referral earns you exclusive vouchers at Baker's Kitchen and extra Planet Points!
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-6 mb-10">
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
              <div className="text-5xl mb-4">🤝</div>
              <h3 className="text-xl font-bold text-white mb-2">Invite Friends</h3>
              <p className="text-white/80">Share your unique referral code with friends and family</p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
              <div className="text-5xl mb-4">🛒</div>
              <h3 className="text-xl font-bold text-white mb-2">They Join & Order</h3>
              <p className="text-white/80">Friends sign up and purchase any AquaCafe starter kit</p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
              <div className="text-5xl mb-4">🎁</div>
              <h3 className="text-xl font-bold text-white mb-2">You Get Rewards</h3>
              <p className="text-white/80">Receive AED 100 Baker's Kitchen vouchers + bonus Planet Points</p>
            </div>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link href="/aquacafe-alliance">
              <Button className="bg-white text-purple-600 hover:bg-gray-100 text-lg px-8 py-4 rounded-full font-bold shadow-2xl">
                <Users className="w-6 h-6 mr-3" />
                Start Referring Friends
              </Button>
            </Link>
            <Link href="/community">
              <Button className="bg-transparent border-2 border-white text-white hover:bg-white hover:text-purple-600 text-lg px-8 py-4 rounded-full font-bold">
                <Heart className="w-6 h-6 mr-3" />
                Join Community
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* STEP 2: Missions Hub - Dubai Canal Gaming Experience */}
      <section className="w-full py-16 px-4 bg-gradient-to-br from-blue-50 via-cyan-50 to-emerald-50 relative overflow-hidden" data-testid="missions-hub">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-20 w-32 h-32 bg-blue-400 rounded-full animate-pulse"></div>
          <div className="absolute bottom-20 right-20 w-24 h-24 bg-emerald-400 rounded-full animate-bounce"></div>
        </div>
        
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-center mb-12">
            <div className="inline-flex items-center bg-gradient-to-r from-blue-600 to-cyan-500 text-white rounded-full px-8 py-4 mb-6 font-bold text-xl shadow-2xl">
              <Target className="w-6 h-6 mr-3" />
              🎯 MISSIONS HUB - STEP 2 🎯
              <Target className="w-6 h-6 ml-3" />
            </div>
            
            <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-600 to-emerald-600 bg-clip-text text-transparent mb-6">
              Dubai Canal Eco-Gaming Journey
            </h2>
            
            <p className="text-xl text-gray-700 max-w-4xl mx-auto mb-8">
              Explore Dubai's sustainable infrastructure from Creek Harbour to Marina. Every check-in, every activity, every eco-choice earns you Planet Points!
            </p>
            
            <div className="grid md:grid-cols-4 gap-4 max-w-4xl mx-auto mb-8">
              <div className="bg-white/80 rounded-lg p-4 border border-blue-200">
                <div className="text-2xl mb-2">🏆</div>
                <div className="text-lg font-bold text-blue-600">12,847</div>
                <div className="text-sm text-gray-600">Active Players</div>
              </div>
              <div className="bg-white/80 rounded-lg p-4 border border-emerald-200">
                <div className="text-2xl mb-2">🌍</div>
                <div className="text-lg font-bold text-emerald-600">247K</div>
                <div className="text-sm text-gray-600">Planet Points Earned</div>
              </div>
              <div className="bg-white/80 rounded-lg p-4 border border-cyan-200">
                <div className="text-2xl mb-2">🏨</div>
                <div className="text-lg font-bold text-cyan-600">89</div>
                <div className="text-sm text-gray-600">Partner Locations</div>
              </div>
              <div className="bg-white/80 rounded-lg p-4 border border-amber-200">
                <div className="text-2xl mb-2">🏅</div>
                <div className="text-lg font-bold text-amber-600">Live</div>
                <div className="text-sm text-gray-600">Daily Challenges</div>
              </div>
            </div>
          </div>
          
          {/* Dubai Canal Journey Map */}
          <div className="grid lg:grid-cols-2 gap-8 mb-12">
            {/* Journey Activities */}
            <div className="space-y-4">
              <h3 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-3">
                <Ship className="w-8 h-8 text-blue-600" />
                Canal Journey Activities
              </h3>
              
              <div className="space-y-3">
                {/* Dubai Creek Harbour */}
                <div className="bg-white rounded-xl p-4 shadow-lg border-l-4 border-blue-500 hover:shadow-xl transition-all">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <Building2 className="w-6 h-6 text-blue-600" />
                      <div>
                        <h4 className="font-bold text-gray-800">Dubai Creek Harbour</h4>
                        <p className="text-sm text-gray-600">Marina check-ins & waterfront dining</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-lg font-bold text-blue-600">+150 PP</div>
                      <div className="text-xs text-gray-500">per visit</div>
                    </div>
                  </div>
                </div>
                
                {/* Ras Al Khor Wildlife Sanctuary */}
                <div className="bg-white rounded-xl p-4 shadow-lg border-l-4 border-emerald-500 hover:shadow-xl transition-all">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <TreePine className="w-6 h-6 text-emerald-600" />
                      <div>
                        <h4 className="font-bold text-gray-800">Ras Al Khor Wildlife Sanctuary</h4>
                        <p className="text-sm text-gray-600">Nature photography & eco-education</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-lg font-bold text-emerald-600">+200 PP</div>
                      <div className="text-xs text-gray-500">per activity</div>
                    </div>
                  </div>
                </div>
                
                {/* Business Bay & Mazaya */}
                <div className="bg-white rounded-xl p-4 shadow-lg border-l-4 border-cyan-500 hover:shadow-xl transition-all">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <ChefHat className="w-6 h-6 text-cyan-600" />
                      <div>
                        <h4 className="font-bold text-gray-800">Business Bay & Mazaya Center</h4>
                        <p className="text-sm text-gray-600">Baker's Kitchen + wellness shopping</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-lg font-bold text-cyan-600">+300 PP</div>
                      <div className="text-xs text-gray-500">per dining</div>
                    </div>
                  </div>
                </div>
                
                {/* La Perle Aqua Show */}
                <div className="bg-white rounded-xl p-4 shadow-lg border-l-4 border-purple-500 hover:shadow-xl transition-all">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <Crown className="w-6 h-6 text-purple-600" />
                      <div>
                        <h4 className="font-bold text-gray-800">La Perle Aqua Show</h4>
                        <p className="text-sm text-gray-600">VIP experience at Al Habtoor City</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-lg font-bold text-purple-600">+500 PP</div>
                      <div className="text-xs text-gray-500">show attendance</div>
                    </div>
                  </div>
                </div>
                
                {/* Marina & JBR */}
                <div className="bg-white rounded-xl p-4 shadow-lg border-l-4 border-amber-500 hover:shadow-xl transition-all">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <Ship className="w-6 h-6 text-amber-600" />
                      <div>
                        <h4 className="font-bold text-gray-800">Marina & JBR Waterfront</h4>
                        <p className="text-sm text-gray-600">Canal cruise & cycling track finish</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-lg font-bold text-amber-600">+400 PP</div>
                      <div className="text-xs text-gray-500">journey complete</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Transportation & Activities */}
            <div className="space-y-6">
              <h3 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-3">
                <Bike className="w-8 h-8 text-emerald-600" />
                Transportation & Activities
              </h3>
              
              {/* Canal Cruise */}
              <div className="bg-gradient-to-r from-blue-500 to-cyan-500 rounded-2xl p-6 text-white">
                <div className="flex items-center gap-4 mb-4">
                  <Ship className="w-12 h-12" />
                  <div>
                    <h4 className="text-2xl font-bold">Dubai Canal Cruise</h4>
                    <p className="text-blue-100">Scenic waterway journey Creek → Marina</p>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div className="bg-white/20 rounded-lg p-3 text-center">
                    <div className="text-2xl font-bold">90 mins</div>
                    <div className="text-sm text-blue-100">Journey Time</div>
                  </div>
                  <div className="bg-white/20 rounded-lg p-3 text-center">
                    <div className="text-2xl font-bold">+800 PP</div>
                    <div className="text-sm text-blue-100">Full Journey</div>
                  </div>
                </div>
                <Button className="w-full bg-white text-blue-600 hover:bg-blue-50 font-bold">
                  Book Canal Cruise
                </Button>
              </div>
              
              {/* Cycling Track */}
              <div className="bg-gradient-to-r from-emerald-500 to-green-500 rounded-2xl p-6 text-white">
                <div className="flex items-center gap-4 mb-4">
                  <Bike className="w-12 h-12" />
                  <div>
                    <h4 className="text-2xl font-bold">Sheikh Zayed Road Cycling</h4>
                    <p className="text-emerald-100">Sustainable cycling track with covered walkway</p>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div className="bg-white/20 rounded-lg p-3 text-center">
                    <div className="text-2xl font-bold">45 mins</div>
                    <div className="text-sm text-emerald-100">Cycling Time</div>
                  </div>
                  <div className="bg-white/20 rounded-lg p-3 text-center">
                    <div className="text-2xl font-bold">+600 PP</div>
                    <div className="text-sm text-emerald-100">Eco Transport</div>
                  </div>
                </div>
                <Button className="w-full bg-white text-emerald-600 hover:bg-emerald-50 font-bold">
                  Start Cycling Journey
                </Button>
              </div>
              
              {/* Walking Track */}
              <div className="bg-gradient-to-r from-amber-500 to-orange-500 rounded-2xl p-6 text-white">
                <div className="flex items-center gap-4 mb-4">
                  <Footprints className="w-12 h-12" />
                  <div>
                    <h4 className="text-2xl font-bold">Waterfront Walking</h4>
                    <p className="text-amber-100">Wellness walk with sustainability stops</p>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div className="bg-white/20 rounded-lg p-3 text-center">
                    <div className="text-2xl font-bold">60 mins</div>
                    <div className="text-sm text-amber-100">Walking Time</div>
                  </div>
                  <div className="bg-white/20 rounded-lg p-3 text-center">
                    <div className="text-2xl font-bold">+400 PP</div>
                    <div className="text-sm text-amber-100">Wellness Walk</div>
                  </div>
                </div>
                <Button className="w-full bg-white text-amber-600 hover:bg-amber-50 font-bold">
                  Begin Walking Journey
                </Button>
              </div>
            </div>
          </div>
          
          {/* Integrated Activities */}
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 border border-cyan-200 shadow-xl">
            <h3 className="text-2xl font-bold text-gray-800 mb-6 text-center">Earning Activities Integration</h3>
            
            <div className="grid md:grid-cols-4 gap-4">
              <div className="text-center p-4 bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl border border-purple-200">
                <Smartphone className="w-8 h-8 text-purple-600 mx-auto mb-2" />
                <h4 className="font-bold text-purple-800 mb-1">iPhone Trade-ins</h4>
                <p className="text-sm text-purple-600 mb-2">Convert devices to water systems</p>
                <div className="text-lg font-bold text-purple-600">+2400 PP</div>
              </div>
              
              <div className="text-center p-4 bg-gradient-to-br from-blue-50 to-cyan-50 rounded-xl border border-blue-200">
                <MapPin className="w-8 h-8 text-blue-600 mx-auto mb-2" />
                <h4 className="font-bold text-blue-800 mb-1">Partner Check-ins</h4>
                <p className="text-sm text-blue-600 mb-2">Visit restaurants & hotels</p>
                <div className="text-lg font-bold text-blue-600">+150 PP</div>
              </div>
              
              <div className="text-center p-4 bg-gradient-to-br from-emerald-50 to-green-50 rounded-xl border border-emerald-200">
                <Target className="w-8 h-8 text-emerald-600 mx-auto mb-2" />
                <h4 className="font-bold text-emerald-800 mb-1">Sustainability Challenges</h4>
                <p className="text-sm text-emerald-600 mb-2">Complete wellness missions</p>
                <div className="text-lg font-bold text-emerald-600">+300 PP</div>
              </div>
              
              <div className="text-center p-4 bg-gradient-to-br from-amber-50 to-orange-50 rounded-xl border border-amber-200">
                <Zap className="w-8 h-8 text-amber-600 mx-auto mb-2" />
                <h4 className="font-bold text-amber-800 mb-1">Metaverse Purchases</h4>
                <p className="text-sm text-amber-600 mb-2">In-app game rewards</p>
                <div className="text-lg font-bold text-amber-600">+500 PP</div>
              </div>
            </div>
            
            <div className="text-center mt-6">
              <Button className="bg-gradient-to-r from-blue-600 to-emerald-600 hover:from-blue-700 hover:to-emerald-700 text-white px-8 py-4 text-lg font-bold rounded-xl shadow-lg">
                <Target className="w-6 h-6 mr-3" />
                Start Your Canal Mission
                <Navigation className="w-6 h-6 ml-3" />
              </Button>
            </div>
          </div>
        </div>
      </section>
      
      {/* STEP 3: Redeem Your Rewards - Partner Network Redemption */}
      <section className="w-full py-16 px-4 bg-gradient-to-br from-amber-50 via-orange-50 to-red-50 relative overflow-hidden" data-testid="rewards-redemption">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 right-20 w-32 h-32 bg-amber-400 rounded-full animate-pulse"></div>
          <div className="absolute bottom-20 left-20 w-24 h-24 bg-orange-400 rounded-full animate-bounce"></div>
        </div>
        
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-center mb-12">
            <div className="inline-flex items-center bg-gradient-to-r from-amber-600 to-orange-500 text-white rounded-full px-8 py-4 mb-6 font-bold text-xl shadow-2xl">
              <Trophy className="w-6 h-6 mr-3" />
              🏆 REDEEM YOUR REWARDS - STEP 3 🏆
              <Trophy className="w-6 h-6 ml-3" />
            </div>
            
            <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-amber-600 to-red-600 bg-clip-text text-transparent mb-6">
              Planet Points Redemption Hub
            </h2>
            
            <p className="text-xl text-gray-700 max-w-4xl mx-auto mb-8">
              Your Planet Points unlock exclusive benefits across Dubai's premier partner network. From Baker's Kitchen to luxury hotels, every point opens new possibilities!
            </p>
            
            {/* Points Summary Card */}
            <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-8 border border-amber-200 shadow-xl max-w-4xl mx-auto mb-8">
              <h3 className="text-2xl font-bold text-gray-800 mb-6">Your Planet Points Portfolio</h3>
              
              <div className="grid md:grid-cols-2 gap-6">
                {/* Points Earned */}
                <div className="space-y-3">
                  <h4 className="text-lg font-bold text-amber-600 mb-4">Points Earned Through:</h4>
                  <div className="space-y-2">
                    <div className="flex justify-between items-center p-3 bg-amber-50 rounded-lg">
                      <span className="text-sm font-medium">iPhone Trade-ins</span>
                      <span className="text-lg font-bold text-amber-600">+2,400 PP</span>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-blue-50 rounded-lg">
                      <span className="text-sm font-medium">Canal Journey Activities</span>
                      <span className="text-lg font-bold text-blue-600">+800 PP</span>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-emerald-50 rounded-lg">
                      <span className="text-sm font-medium">Partner Check-ins</span>
                      <span className="text-lg font-bold text-emerald-600">+150 PP</span>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-purple-50 rounded-lg">
                      <span className="text-sm font-medium">Sustainability Challenges</span>
                      <span className="text-lg font-bold text-purple-600">+300 PP</span>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-cyan-50 rounded-lg">
                      <span className="text-sm font-medium">Metaverse Purchases</span>
                      <span className="text-lg font-bold text-cyan-600">+500 PP</span>
                    </div>
                  </div>
                </div>
                
                {/* Redemption Options */}
                <div className="space-y-3">
                  <h4 className="text-lg font-bold text-orange-600 mb-4">Redeem At Partner Locations:</h4>
                  <div className="space-y-2">
                    <div className="flex justify-between items-center p-3 bg-orange-50 rounded-lg">
                      <span className="text-sm font-medium">Baker's Kitchen Vouchers</span>
                      <span className="text-lg font-bold text-orange-600">100 PP = AED 25</span>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-blue-50 rounded-lg">
                      <span className="text-sm font-medium">Dubai Hotels Discounts</span>
                      <span className="text-lg font-bold text-blue-600">200 PP = 20% off</span>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-cyan-50 rounded-lg">
                      <span className="text-sm font-medium">La Perle Show Tickets</span>
                      <span className="text-lg font-bold text-cyan-600">500 PP = VIP Access</span>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-emerald-50 rounded-lg">
                      <span className="text-sm font-medium">AquaCafe Products</span>
                      <span className="text-lg font-bold text-emerald-600">300 PP = Free Filters</span>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-purple-50 rounded-lg">
                      <span className="text-sm font-medium">Wellness Experiences</span>
                      <span className="text-lg font-bold text-purple-600">400 PP = Spa Packages</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Partner Network */}
          <div className="grid lg:grid-cols-3 gap-8 mb-12">
            {/* Restaurant Partners */}
            <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-6 border border-orange-200 shadow-lg">
              <div className="text-center mb-6">
                <ChefHat className="w-12 h-12 text-orange-600 mx-auto mb-4" />
                <h3 className="text-xl font-bold text-gray-800">Restaurant Partners</h3>
                <p className="text-gray-600 text-sm">Premium dining experiences</p>
              </div>
              
              <div className="space-y-3">
                <div className="flex items-center justify-between p-3 bg-orange-50 rounded-lg">
                  <div>
                    <h4 className="font-bold text-orange-800">Baker's Kitchen</h4>
                    <p className="text-xs text-orange-600">Mazaya Center</p>
                  </div>
                  <div className="text-orange-600 font-bold">25% off</div>
                </div>
                <div className="flex items-center justify-between p-3 bg-amber-50 rounded-lg">
                  <div>
                    <h4 className="font-bold text-amber-800">Canal Side Cafes</h4>
                    <p className="text-xs text-amber-600">Business Bay</p>
                  </div>
                  <div className="text-amber-600 font-bold">20% off</div>
                </div>
                <div className="flex items-center justify-between p-3 bg-yellow-50 rounded-lg">
                  <div>
                    <h4 className="font-bold text-yellow-800">Marina Restaurants</h4>
                    <p className="text-xs text-yellow-600">JBR Waterfront</p>
                  </div>
                  <div className="text-yellow-600 font-bold">15% off</div>
                </div>
              </div>
            </div>
            
            {/* Hotel Partners */}
            <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-6 border border-blue-200 shadow-lg">
              <div className="text-center mb-6">
                <Building2 className="w-12 h-12 text-blue-600 mx-auto mb-4" />
                <h3 className="text-xl font-bold text-gray-800">Hotel Partners</h3>
                <p className="text-gray-600 text-sm">Luxury accommodation benefits</p>
              </div>
              
              <div className="space-y-3">
                <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                  <div>
                    <h4 className="font-bold text-blue-800">Hilton Al Habtoor City</h4>
                    <p className="text-xs text-blue-600">Business Bay</p>
                  </div>
                  <div className="text-blue-600 font-bold">20% off</div>
                </div>
                <div className="flex items-center justify-between p-3 bg-purple-50 rounded-lg">
                  <div>
                    <h4 className="font-bold text-purple-800">JW Marriott Marquis</h4>
                    <p className="text-xs text-purple-600">Business Bay</p>
                  </div>
                  <div className="text-purple-600 font-bold">VIP Access</div>
                </div>
                <div className="flex items-center justify-between p-3 bg-indigo-50 rounded-lg">
                  <div>
                    <h4 className="font-bold text-indigo-800">The Oberoi Dubai</h4>
                    <p className="text-xs text-indigo-600">Business Bay</p>
                  </div>
                  <div className="text-indigo-600 font-bold">Spa Credits</div>
                </div>
              </div>
            </div>
            
            {/* Experience Partners */}
            <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-6 border border-emerald-200 shadow-lg">
              <div className="text-center mb-6">
                <Crown className="w-12 h-12 text-emerald-600 mx-auto mb-4" />
                <h3 className="text-xl font-bold text-gray-800">Experience Partners</h3>
                <p className="text-gray-600 text-sm">Premium entertainment & wellness</p>
              </div>
              
              <div className="space-y-3">
                <div className="flex items-center justify-between p-3 bg-emerald-50 rounded-lg">
                  <div>
                    <h4 className="font-bold text-emerald-800">La Perle by Dragone</h4>
                    <p className="text-xs text-emerald-600">Al Habtoor City</p>
                  </div>
                  <div className="text-emerald-600 font-bold">VIP Tickets</div>
                </div>
                <div className="flex items-center justify-between p-3 bg-teal-50 rounded-lg">
                  <div>
                    <h4 className="font-bold text-teal-800">Canal Cruise Dubai</h4>
                    <p className="text-xs text-teal-600">Creek to Marina</p>
                  </div>
                  <div className="text-teal-600 font-bold">Free Tours</div>
                </div>
                <div className="flex items-center justify-between p-3 bg-cyan-50 rounded-lg">
                  <div>
                    <h4 className="font-bold text-cyan-800">Wellness Centers</h4>
                    <p className="text-xs text-cyan-600">Multiple Locations</p>
                  </div>
                  <div className="text-cyan-600 font-bold">Packages</div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Redemption CTA */}
          <div className="text-center">
            <div className="bg-gradient-to-r from-amber-500 to-orange-500 rounded-2xl p-8 text-white shadow-2xl max-w-3xl mx-auto">
              <h3 className="text-2xl font-bold mb-4">Ready to Redeem Your Planet Points?</h3>
              <p className="text-lg mb-6">
                Access your personalized redemption dashboard and start enjoying exclusive benefits across Dubai's premier partner network!
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button 
                  onClick={() => setLocation('/redeem')}
                  className="bg-white text-amber-600 hover:bg-amber-50 font-bold px-8 py-3 text-lg rounded-xl shadow-lg"
                  data-testid="button-redeem-dashboard"
                >
                  <Trophy className="w-6 h-6 mr-3" />
                  Enter Redemption Dashboard
                </Button>
                
                <Button 
                  onClick={() => {
                    const element = document.querySelector('[data-testid="missions-hub"]');
                    if (element) {
                      element.scrollIntoView({ behavior: 'smooth' });
                    }
                  }}
                  className="bg-transparent border-2 border-white text-white hover:bg-white hover:text-amber-600 font-bold px-8 py-3 text-lg rounded-xl"
                  data-testid="button-earn-more-points"
                >
                  <Target className="w-6 h-6 mr-3" />
                  Earn More Points
                </Button>
              </div>
            </div>
          </div>
          
          {/* Sponsor Integration Notice */}
          <div className="mt-12 text-center">
            <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6 border border-amber-200 shadow-lg max-w-4xl mx-auto">
              <h4 className="text-lg font-bold text-gray-800 mb-3">🤝 Powered by Partner Sponsors</h4>
              <p className="text-gray-600 text-sm mb-4">
                This rewards program is made possible through our strategic partnerships with Dubai's leading hospitality, dining, and entertainment venues. 
                Every redemption supports local businesses while advancing sustainability goals.
              </p>
              <div className="flex flex-wrap justify-center gap-4 text-xs text-gray-500">
                <span className="bg-gray-100 px-3 py-1 rounded-full">Hilton Hotels</span>
                <span className="bg-gray-100 px-3 py-1 rounded-full">JW Marriott</span>
                <span className="bg-gray-100 px-3 py-1 rounded-full">Baker's Kitchen</span>
                <span className="bg-gray-100 px-3 py-1 rounded-full">La Perle</span>
                <span className="bg-gray-100 px-3 py-1 rounded-full">Dubai Canal Cruises</span>
                <span className="bg-gray-100 px-3 py-1 rounded-full">+89 More Partners</span>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Dubai Wellness Journey Passport Section - Integrated */}
      <DubaiWellnessJourney 
        variant="aquacafe"
        showMembershipCTA={true}
        onMembershipSignup={() => {
          // Scroll to starter kit section
          const element = document.querySelector('[data-testid="starter-kit-gateway"]');
          if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
          }
          toast({
            title: "Complete Your Journey",
            description: "Choose your AquaCafe starter kit to complete the wellness journey and unlock all benefits!",
          });
        }}
      />
      
      {/* AquaCafe Starter Kit - Flagship Gateway Section */}
      <section className="w-full py-8 sm:py-12 px-0 bg-gradient-to-br from-emerald-50 via-cyan-50 to-blue-50" data-testid="starter-kit-gateway" style={{ maxWidth: '100vw' }}>
        {/* Full Width Banner */}
        <div className="w-full mb-8">
          <img 
            src={washingFace} 
            alt="Love is in the Hair - AquaCafe Beauty Water" 
            className="w-full h-48 sm:h-64 md:h-80 object-cover"
          />
        </div>

        <div className="w-full max-w-7xl mx-auto px-4">
          {/* Gateway Header */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-full px-6 py-3 mb-6 font-bold text-lg shadow-2xl">
              <Rocket className="w-6 h-6 mr-3" />
              <span>🚀 AQUACAFE LOYALTY GATEWAY - YOUR CIRCULAR EXCHANGE HUB 🚀</span>
              <Rocket className="w-6 h-6 ml-3" />
            </div>
            
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-gray-800 mb-4">
              <span className="bg-gradient-to-r from-emerald-500 to-cyan-500 bg-clip-text text-transparent">
                AED 99
              </span>
              <br />
              <span className="text-2xl sm:text-3xl md:text-4xl text-gray-600">Starter Kit</span>
            </h1>
            
            <p className="text-lg sm:text-xl text-gray-700 mb-6 max-w-4xl mx-auto">
              Your gateway to AquaCafe's comprehensive loyalty ecosystem - where sustainability meets rewards, 
              trade-ins become Planet Points, and every action contributes to Dubai's circular economy.
            </p>
          </div>

          {/* Central Pivot Concept */}
          <div className="bg-gradient-to-r from-white/90 to-emerald-50/90 backdrop-blur-sm rounded-3xl p-6 sm:p-8 border-2 border-emerald-300 shadow-2xl mb-8">
            <div className="text-center mb-6">
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-4">
                🔄 THE CIRCULAR EXCHANGE CONCEPT 🔄
              </h2>
              <p className="text-gray-700 text-base sm:text-lg mb-6">
                This starter kit isn't just a product - it's your lifetime membership to Dubai's most innovative sustainability platform.
                Every feature works together to create continuous value and environmental impact.
              </p>
            </div>

            {/* Ecosystem Flow */}
            <div className="grid md:grid-cols-3 gap-6 mb-8">
              <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-xl p-6 border border-blue-200">
                <div className="text-center">
                  <div className="w-16 h-16 bg-blue-500 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Target className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="font-bold text-gray-800 mb-3">Trade-In Hub</h3>
                  <p className="text-sm text-gray-600">iPhone valuations, tech exchanges, and instant Planet Points earning through your membership portal.</p>
                </div>
              </div>

              <div className="bg-gradient-to-br from-emerald-50 to-green-50 rounded-xl p-6 border border-emerald-200">
                <div className="text-center">
                  <div className="w-16 h-16 bg-emerald-500 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Zap className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="font-bold text-gray-800 mb-3">Rewards Engine</h3>
                  <p className="text-sm text-gray-600">Planet Points redemption, Baker's Kitchen vouchers, and exclusive member discounts on all AquaCafe products.</p>
                </div>
              </div>

              <div className="bg-gradient-to-br from-amber-50 to-orange-50 rounded-xl p-6 border border-amber-200">
                <div className="text-center">
                  <div className="w-16 h-16 bg-amber-500 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Users className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="font-bold text-gray-800 mb-3">Community Impact</h3>
                  <p className="text-sm text-gray-600">Awareness campaigns, environmental initiatives, and social engagement activities exclusive to members.</p>
                </div>
              </div>
            </div>
          </div>

          {/* Comprehensive Benefits Package */}
          <div className="grid lg:grid-cols-2 gap-8 mb-8">
            {/* Left: Lifetime Value */}
            <div>
              <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl p-6 border border-purple-200 mb-6">
                <h3 className="text-xl font-bold text-gray-800 mb-4">💎 LIFETIME MEMBERSHIP BENEFITS (AED 1000+ VALUE)</h3>
                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <Gift className="w-5 h-5 text-emerald-500 mt-1 flex-shrink-0" />
                    <div>
                      <span className="font-bold text-gray-800">FREE Ionic Shower Filter</span>
                      <span className="text-emerald-600 ml-2">(AED 399 value)</span>
                      <p className="text-sm text-gray-600">Premium beauty & skincare filtration system</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <Shield className="w-5 h-5 text-cyan-500 mt-1 flex-shrink-0" />
                    <div>
                      <span className="font-bold text-gray-800">FREE Membership Card & Setup</span>
                      <span className="text-cyan-600 ml-2">(AED 299 value)</span>
                      <p className="text-sm text-gray-600">Professional installation & lifetime support</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <Heart className="w-5 h-5 text-pink-500 mt-1 flex-shrink-0" />
                    <div>
                      <span className="font-bold text-gray-800">Baker's Kitchen Partnership</span>
                      <span className="text-pink-600 ml-2">(AED 100+ per referral)</span>
                      <p className="text-sm text-gray-600">Free vouchers + Kangen Water demos</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <Star className="w-5 h-5 text-purple-500 mt-1 flex-shrink-0" />
                    <div>
                      <span className="font-bold text-gray-800">Planet Hero Level 2 Status</span>
                      <span className="text-purple-600 ml-2">(Exclusive Access)</span>
                      <p className="text-sm text-gray-600">Priority support, special events, premium features</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Continuing Benefits */}
              <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl p-6 border border-green-200">
                <h3 className="text-lg font-bold text-gray-800 mb-4">🔄 CONTINUING MEMBER BENEFITS</h3>
                <div className="grid grid-cols-2 gap-3 text-sm">
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-emerald-500" />
                    <span className="text-gray-800 font-medium">Lifetime discounts on all products</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-emerald-500" />
                    <span className="text-gray-800 font-medium">Priority trade-in valuations</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-emerald-500" />
                    <span className="text-gray-800 font-medium">Exclusive Planet Points bonuses</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-emerald-500" />
                    <span className="text-gray-800 font-medium">Community event invitations</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Right: Call to Action */}
            <div className="text-center">
              <div className="bg-gradient-to-br from-white to-gray-50 rounded-2xl p-6 border-2 border-emerald-300 shadow-xl">
                <div className="mb-6">
                  <div className="text-6xl font-bold text-emerald-500 mb-2">AED 99</div>
                  <div className="text-xl text-gray-600 mb-4">One-time investment</div>
                  <div className="text-sm text-purple-600 font-bold bg-purple-100 rounded-full px-4 py-2 mb-4">
                    Lifetime Value: AED 1000+ in benefits
                  </div>
                </div>

                <a
                  href="http://deliwer.com/products/aquacafe"
                  className="w-full bg-gradient-to-r from-emerald-500 via-cyan-500 to-blue-500 hover:from-emerald-600 hover:via-cyan-600 hover:to-blue-600 text-white px-8 py-4 text-lg font-bold rounded-2xl shadow-2xl transition-all transform hover:scale-105 inline-block mb-4"
                  data-testid="button-starter-kit-gateway"
                >
                  <Rocket className="mr-3 w-6 h-6 inline" />
                  START YOUR CIRCULAR JOURNEY
                </a>

                <p className="text-sm text-gray-600">
                  Join thousands of Dubai residents building a sustainable future through the circular economy.
                </p>
              </div>
            </div>
          </div>

          {/* Partnership Integration */}
          <div className="text-center bg-gradient-to-r from-amber-100 to-orange-100 rounded-2xl p-6 border border-amber-300">
            <h3 className="text-xl font-bold text-gray-800 mb-3">🤝 BAKER'S KITCHEN PARTNERSHIP EXPERIENCE</h3>
            <p className="text-gray-700 mb-4">
              Your membership includes exclusive access to Kangen Water demonstrations and healthy dining experiences at Baker's Kitchen Mazaya Center.
              Every friend you refer earns you both AED 100 vouchers - it's sustainability that pays forward.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 text-sm text-gray-600">
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-amber-500" />
                <span>Mazaya Center, Business Bay</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-emerald-500" />
                <span>Open Daily 9AM-11PM</span>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      
      {/* Referral Program - Streamlined */}
      <section className="w-full py-4 sm:py-8 px-2 sm:px-4 bg-gradient-to-br from-amber-50 to-orange-50" data-testid="referral-program">
        <div className="w-full max-w-7xl mx-auto text-center">
          <div className="inline-flex items-center bg-amber-500/20 border border-amber-500/50 rounded-full px-3 py-1 mb-3">
            <Users className="w-3 h-3 text-amber-600 mr-1" />
            <span className="text-amber-600 font-bold text-xs">PARTNERSHIP REFERRAL REWARDS</span>
          </div>
          
          <h2 className="text-base sm:text-lg font-bold text-gray-800 mb-4">
            Refer Friends & Get <span className="text-emerald-600">AED 100 FREE VOUCHER</span> at Baker's Kitchen!
          </h2>
          
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 sm:gap-4 mb-4 max-w-4xl mx-auto">
            <div className="bg-white backdrop-blur-sm rounded-lg p-2 sm:p-3 border border-emerald-200 shadow-md">
              <div className="w-6 h-6 sm:w-8 sm:h-8 bg-emerald-500 rounded-full flex items-center justify-center mx-auto mb-2">
                <span className="text-white font-bold text-xs sm:text-sm">1</span>
              </div>
              <h3 className="text-xs sm:text-sm font-bold text-gray-800 mb-1">Share Code</h3>
              <p className="text-gray-600 text-xs">Get unique referral code</p>
            </div>
            
            <div className="bg-white backdrop-blur-sm rounded-lg p-2 sm:p-3 border border-cyan-200 shadow-md">
              <div className="w-6 h-6 sm:w-8 sm:h-8 bg-cyan-500 rounded-full flex items-center justify-center mx-auto mb-2">
                <span className="text-white font-bold text-xs sm:text-sm">2</span>
              </div>
              <h3 className="text-xs sm:text-sm font-bold text-gray-800 mb-1">Friend Joins</h3>
              <p className="text-gray-600 text-xs">They purchase using code</p>
            </div>
            
            <div className="bg-white backdrop-blur-sm rounded-lg p-2 sm:p-3 border border-amber-200 shadow-md">
              <div className="w-6 h-6 sm:w-8 sm:h-8 bg-amber-500 rounded-full flex items-center justify-center mx-auto mb-2">
                <span className="text-white font-bold text-xs sm:text-sm">3</span>
              </div>
              <h3 className="text-xs sm:text-sm font-bold text-gray-800 mb-1">Both Win!</h3>
              <p className="text-gray-600 text-xs">AED 100 voucher each</p>
            </div>
          </div>
          
          <div className="bg-gradient-to-r from-emerald-100 to-amber-100 border border-emerald-300 rounded-xl p-4">
            <div className="text-amber-600 font-bold text-sm sm:text-base mb-2 text-center">🍰 Exclusive Partnership with Baker's Kitchen Dubai 🍰</div>
            <p className="text-gray-700 text-xs sm:text-sm text-center mb-3">Use your AED 100 voucher at Baker's Kitchen Mazaya Center for Kangen Water experience!</p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-4 text-xs text-gray-600">
              <div className="flex items-center gap-1">
                <MapPin className="w-3 h-3" />
                <span>Mazaya Center, Business Bay</span>
              </div>
              <div className="flex items-center gap-1">
                <Phone className="w-3 h-3" />
                <span>Visit bakerskitchenuae.com</span>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* Pricing Plans */}
      <section className="w-full py-6 sm:py-12 px-2 sm:px-4 bg-gradient-to-br from-gray-50 to-emerald-50" data-testid="pricing-plans">
        <div className="w-full max-w-7xl mx-auto">
          <div className="text-center mb-6 sm:mb-8 bg-white/80 backdrop-blur-sm rounded-xl p-3 sm:p-4 border border-emerald-200 shadow-lg">
            <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-800 mb-3">
              🏆 PARTNERSHIP PACKAGES
            </h2>
            <p className="text-gray-600 text-sm sm:text-base leading-relaxed">
              Choose the perfect AquaCafe package with Baker's Kitchen perks
            </p>
          </div>
          
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 w-full max-w-full" data-testid="aquacafe-packages">
            {plans.map((plan) => {
              const basePrice = plan.price;
              const heroDiscountAmount = plan.heroDiscount || 0;
              const finalPrice = plan.promotionalPrice || basePrice;
              const totalSavings = plan.originalPrice - finalPrice;
              
              return (
                <Card 
                  key={plan.id} 
                  className={`relative bg-gradient-to-br from-white to-gray-50 backdrop-blur-sm border-gray-200 overflow-hidden shadow-xl ${
                    plan.popular ? 'border-emerald-500/50 scale-105 ring-2 ring-emerald-500/30' : ''
                  }`}
                  data-testid={`plan-${plan.id}`}
                >
                  {plan.popular && (
                    <div className="absolute top-0 left-0 right-0 bg-gradient-to-r from-emerald-500 to-cyan-500 text-white text-center py-2 font-bold text-sm">
                      {plan.badge}
                    </div>
                  )}
                  
                  <CardContent className="p-4 pt-8">
                    {!plan.popular && (
                      <div className="text-center mb-4">
                        <span className="bg-gray-200 text-gray-700 px-3 py-1 rounded-full text-xs font-bold">
                          {plan.badge}
                        </span>
                      </div>
                    )}
                    
                    <div className="text-center mb-4">
                      <h3 className="text-lg font-bold text-gray-800 mb-2">{plan.name}</h3>
                      
                      <div className="mb-4">
                        <div className="text-gray-500 line-through text-lg mb-1">
                          AED {plan.originalPrice.toLocaleString()}
                        </div>
                        {plan.isHeroEntry ? (
                          <>
                            <div className="text-2xl sm:text-3xl font-bold text-emerald-600 mb-2">
                              AED {plan.price.toLocaleString()}
                            </div>
                            <div className="text-xs sm:text-sm text-amber-600 font-bold">
                              SAVE AED {plan.heroDiscount} + BAKER'S REFERRAL PERKS!
                            </div>
                          </>
                        ) : (
                          <>
                            <div className="text-2xl font-bold text-gray-800 mb-2">
                              AED {plan.price.toLocaleString()}
                            </div>
                            <div className="text-xs sm:text-sm text-emerald-600 font-bold">
                              Save AED {totalSavings.toLocaleString()}
                            </div>
                          </>
                        )}
                      </div>
                    </div>
                    
                    <div className="space-y-1 mb-6">
                      {plan.features.map((feature, index) => (
                        <div key={index} className="flex items-center text-xs sm:text-sm text-gray-700">
                          <CheckCircle className="w-3 h-3 text-emerald-500 mr-2 flex-shrink-0" />
                          {feature}
                        </div>
                      ))}
                    </div>
                    
                    <div className="space-y-2">
                      <Button
                        onClick={() => handleARPreview(plan)}
                        className="w-full py-2 bg-purple-600 hover:bg-purple-700 text-white font-semibold rounded-lg transition-all text-xs sm:text-sm"
                        data-testid={`button-ar-preview-${plan.id}`}
                      >
                        <Eye className="mr-1 w-3 h-3" />
                        AR Preview
                      </Button>
                      
                      <Button
                        onClick={() => handleOrderNow(plan.id)}
                        disabled={isOrderLoading === plan.id}
                        className={`w-full py-3 font-bold text-sm sm:text-base rounded-lg transition-all ${
                          plan.isHeroEntry
                            ? 'bg-gradient-to-r from-emerald-500 to-cyan-500 hover:from-emerald-600 hover:to-cyan-600 text-white disabled:opacity-70 shadow-lg'
                            : plan.popular
                            ? 'bg-gradient-to-r from-emerald-500 to-cyan-500 hover:from-emerald-600 hover:to-cyan-600 text-white disabled:opacity-70'
                            : 'bg-emerald-500 hover:bg-emerald-600 text-white disabled:opacity-70'
                        }`}
                        data-testid={`button-order-${plan.id}`}
                      >
                        {isOrderLoading === plan.id ? (
                          <>
                            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-current mr-2"></div>
                            PROCESSING...
                          </>
                        ) : (
                          <>
                            <ShoppingCart className="mr-2 w-4 h-4" />
                            {plan.isHeroEntry ? 'START JOURNEY' : plan.popular ? 'UPGRADE NOW' : 'ORDER NOW'}
                          </>
                        )}
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>
      {/* Partnership Footer */}
      <footer className="w-full border-t border-emerald-200 mt-6 sm:mt-8 bg-gradient-to-r from-emerald-50 to-cyan-50">
        <div className="w-full max-w-7xl mx-auto px-2 sm:px-4 py-4 sm:py-6">
          {/* Bottom CTA Flow - Complete Journey */}
          <div className="mb-6 sm:mb-8">
            <div className="text-center mb-6">
              <h3 className="text-xl font-bold text-gray-800 mb-2">Continue Your DeliWer Journey</h3>
              <p className="text-sm text-gray-600">Follow the complete flow: Earn → Play → Redeem → Community → Checkout</p>
            </div>
            <div className="flex flex-col lg:flex-row items-center justify-center gap-3 max-w-6xl mx-auto">
              <Link
                href="/earn"
                className="w-full lg:w-auto px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl text-center transition-all shadow-lg"
                data-testid="footer-cta-exchange"
              >
                Start Earning
              </Link>
              <Link
                href="/collect"
                className="w-full lg:w-auto px-6 py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl text-center transition-all shadow-lg"
                data-testid="footer-cta-play"
              >
                Join Leaderboard
              </Link>
              <Link
                href="/redeem"
                className="w-full lg:w-auto px-6 py-3 bg-purple-600 hover:bg-purple-700 text-white font-bold rounded-xl text-center transition-all shadow-lg"
                data-testid="footer-cta-redeem"
              >
                Redeem Now
              </Link>
              <Link
                href="/community"
                className="w-full lg:w-auto px-6 py-3 bg-amber-600 hover:bg-amber-700 text-white font-bold rounded-xl text-center transition-all shadow-lg"
                data-testid="footer-cta-community"
              >
                Community
              </Link>
              <a
                href="http://deliwer.com/products/aquacafe"
                className="w-full lg:w-auto px-6 py-3 bg-gray-900 hover:bg-black text-white font-bold rounded-xl transition-all shadow-lg text-center inline-block"
                data-testid="footer-cta-checkout"
              >
                Order Starter Kit
              </a>
            </div>
          </div>

          <div className="text-center mb-3 sm:mb-4">
            <div className="flex flex-col items-center justify-center gap-2 mb-3">
              <div className="flex items-center gap-2">
                <img 
                  src={aquacafeLogo} 
                  alt="AquaCafe Logo" 
                  className="h-6 w-auto object-contain"
                />
                <span className="font-bold text-gray-800 text-xs sm:text-sm">AquaCafe by DeliWer</span>
              </div>
              <span className="text-lg text-gray-600">×</span>
              <div className="flex items-center gap-2">
                <img 
                  src={bakersKitchenLogo} 
                  alt="Baker's Kitchen Logo" 
                  className="h-6 w-auto object-contain"
                />
                <span className="font-bold text-gray-800 text-xs sm:text-sm">Baker's Kitchen UAE</span>
              </div>
            </div>
            <div className="text-sm font-bold text-emerald-600 mb-1">
              #SvenTheBaker × #DeliWer
            </div>
            <div className="text-xs text-gray-600">
              © 2024 Partnership • Mazaya Center, Business Bay • AI‑First Circular Earning Platform
            </div>
          </div>
          
          <div className="flex flex-col items-center justify-center gap-2">
            <div className="flex flex-col items-center gap-2 w-full">
              <Link href="/exchange" className="px-3 py-2 rounded-lg bg-blue-600 text-white font-semibold hover:bg-blue-700 transition-colors text-xs w-full max-w-xs text-center" data-testid="footer-start-exchange">
                Start iPhone Earning
              </Link>
              <a
                href="http://deliwer.com/products/aquacafe"
                className="px-3 py-2 rounded-lg bg-gradient-to-r from-emerald-500 to-cyan-500 text-white font-semibold hover:from-emerald-600 hover:to-cyan-600 transition-colors text-xs w-full max-w-xs text-center inline-block"
                data-testid="footer-order-partnership-kit"
              >
                Get Starter Kit - AED 99
              </a>
            </div>
            <div className="text-xs text-gray-600 text-center">
              📍 Visit us at Baker's Kitchen, Mazaya Center
            </div>
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