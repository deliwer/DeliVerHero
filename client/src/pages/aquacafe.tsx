import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { Link } from "wouter";
import { Star, ShoppingCart, Gift, CheckCircle, Zap, Shield, Award, Heart, Home, Users, Rocket, Target, Eye, Droplets, Leaf, MapPin, Clock, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ARPreview } from "@/components/ar-preview";
import aquacafeTradeIn from "@assets/Banner_AquaCafe_1755270492134.jpg";
import membershipClean from "@assets/Membership_Clean_1756065010923.png";
import beautyWater1 from "@assets/Beauty_Water_1_1756065010937.jpg";
import beautyWater2 from "@assets/Beauty_Water_2_1756065010940.jpg";
import plumberBanner from "@assets/To_Do_Banner_Plumber_Sm_1756065010946.jpg";
import rollupBanner from "@assets/Rollup_Banner_Image_1756065010951.jpg";
import washingFace from "@assets/washing-face-01 (1)_1756065010952.jpg";
import withoutText from "@assets/without_text_1756065010951.jpg";

export default function AquaCafe() {
  const [isOrderLoading, setIsOrderLoading] = useState<string | null>(null);
  const [arPreview, setArPreview] = useState<{ isOpen: boolean; product: any }>({ isOpen: false, product: null });
  const { toast } = useToast();

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
      await new Promise(resolve => setTimeout(resolve, 1000));
      // Navigate to alliance page for detailed checkout
      window.location.href = `/aquacafe-alliance?variant=${planId}`;
      
      toast({
        title: "Redirecting to Alliance Page",
        description: `Loading checkout for ${plan.name}`,
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
      <div className="w-full max-w-none mx-0 px-4 py-4 flex items-center justify-between bg-white/80 backdrop-blur-sm"
           style={{ maxWidth: '100vw' }}>
        <Link href="/" className="flex items-center gap-2 text-emerald-800 hover:text-emerald-600 transition-colors" data-testid="link-back-home">
          <Home className="w-5 h-5" />
          <span className="font-semibold">DeliWer</span>
        </Link>
        <div className="flex gap-2">
          <Link href="/products" className="px-4 py-2 rounded-xl bg-emerald-600 text-white text-sm hover:bg-emerald-700 transition-colors" data-testid="link-shop-all">
            Shop All
          </Link>
          <Link href="/exchange" className="px-4 py-2 rounded-xl bg-blue-600 text-white text-sm hover:bg-blue-700 transition-colors" data-testid="link-start-exchange">
            Start Exchange
          </Link>
        </div>
      </div>
      {/* Top CTA Flow Section - Following Prototype */}
      <section className="w-full py-4 px-2 sm:px-4 bg-gradient-to-r from-blue-500 to-emerald-500" data-testid="top-cta-flow" style={{ maxWidth: '100vw' }}>
        <div className="w-full max-w-full mx-auto flex flex-col sm:flex-row items-center justify-center gap-3" style={{ maxWidth: '100vw' }}>
          <Link
            href="/exchange"
            className="w-full sm:w-auto px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-full text-center transition-all shadow-lg text-lg"
            data-testid="top-cta-exchange"
          >
            Start iPhone Exchange
          </Link>
          <Link
            href="/collect"
            className="w-full sm:w-auto px-8 py-4 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-full text-center transition-all shadow-lg text-lg"
            data-testid="top-cta-minimal"
          >
            Get Hero Minimal - AED 1299
          </Link>
        </div>
      </section>
      {/* Partnership Hero Section */}
      <section className="w-full py-8 sm:py-16 px-2 sm:px-4 bg-gradient-to-br from-cyan-500/10 via-emerald-500/10 to-amber-500/10 relative overflow-hidden" data-testid="partnership-hero" style={{ maxWidth: '100vw' }}>
        <div className="w-full max-w-full mx-auto" style={{ maxWidth: '100vw' }}>
          <div className="grid lg:grid-cols-2 gap-4 lg:gap-8 items-center w-full max-w-full">
            {/* Left: Partnership Branding */}
            <div className="text-center lg:text-left w-full">
              <div className="mb-4 lg:mb-6 w-full">
                <div className="flex flex-col items-center justify-center lg:justify-start gap-2 mb-4 w-full">
                  <div className="bg-gradient-to-r from-cyan-500 to-blue-600 text-white px-2 sm:px-3 py-1 rounded-full font-bold text-xs sm:text-sm">
                    AquaCafe
                  </div>
                  <span className="text-lg sm:text-2xl font-bold text-gray-600">+</span>
                  <div className="bg-gradient-to-r from-amber-500 to-orange-500 text-white px-2 sm:px-3 py-1 rounded-full font-bold text-xs sm:text-sm">
                    Baker's Kitchen UAE
                  </div>
                </div>
                <div className="bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent text-lg sm:text-xl md:text-2xl font-bold mb-4 text-center lg:text-left">
                  Healthy Water Meets Healthy Food
                </div>
              </div>

              <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-gray-800 mb-4 leading-tight">
                AquaCafe by DeliWer
                <span className="block text-lg sm:text-xl md:text-2xl lg:text-3xl text-amber-600">
                  + Baker's Kitchen UAE
                </span>
              </h1>
              
              <p className="text-sm sm:text-base md:text-lg text-gray-600 mb-6 leading-relaxed">
                Serving Kangen Water with Wholesome Meals – A Partnership for Your Health & Our Planet
              </p>

              <div className="space-y-4 mb-8">
                <Button
                  onClick={() => handleOrderNow('hero-minimal')}
                  className="w-full sm:w-auto bg-gradient-to-r from-emerald-500 to-cyan-500 hover:from-emerald-600 hover:to-cyan-600 text-white px-4 sm:px-6 py-3 text-sm sm:text-base font-bold rounded-xl shadow-lg transition-all"
                  data-testid="button-experience-alliance"
                >
                  <Heart className="mr-3 w-6 h-6" />
                  Experience the Alliance
                </Button>
                
                <div className="flex flex-col items-center justify-center lg:justify-start gap-2 text-xs text-gray-600">
                  <div className="flex items-center gap-1">
                    <MapPin className="w-3 h-3 text-amber-500" />
                    <span>Mazaya Center</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock className="w-3 h-3 text-emerald-500" />
                    <span>Open Daily 9AM-11PM</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Right: Lifestyle Image */}
            <div className="relative mt-6 lg:mt-0 w-full">
              <div className="bg-gradient-to-br from-white/80 to-emerald-50/80 backdrop-blur-sm rounded-2xl p-3 sm:p-4 shadow-xl w-full">
                <img 
                  src={withoutText} 
                  alt="Healthy Lifestyle with AquaCafe and Baker's Kitchen" 
                  className="w-full h-40 sm:h-48 object-cover rounded-xl shadow-md"
                />
                <div className="text-center mt-3">
                  <div className="text-sm sm:text-base font-bold text-gray-800 mb-1">Real People, Real Results</div>
                  <div className="text-xs sm:text-sm text-gray-600">Healthier living with AquaCafe & Baker's Kitchen</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* Partnership Highlight Section */}
      <section className="w-full py-6 sm:py-12 px-2 sm:px-4 bg-white" data-testid="partnership-highlights" style={{ maxWidth: '100vw' }}>
        <div className="w-full max-w-full mx-auto" style={{ maxWidth: '100vw' }}>
          <div className="text-center mb-6 sm:mb-8">
            <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-800 mb-3">
              Why AquaCafe + Baker's Kitchen?
            </h2>
            <p className="text-sm sm:text-base text-gray-600 max-w-full mx-auto px-2">
              The perfect synergy of pure water and wholesome nutrition
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-3 sm:gap-6 w-full max-w-full">
            {/* AquaCafe Card */}
            <Card className="bg-gradient-to-br from-cyan-50 to-blue-50 border-cyan-200 shadow-xl">
              <CardContent className="p-8">
                <div className="text-center mb-6">
                  <div className="w-16 h-16 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Droplets className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-800 mb-2">AquaCafe by DeliWer</h3>
                  <p className="text-cyan-600 font-semibold">Eco-Friendly Water Filtration</p>
                </div>
                
                <div className="space-y-3 text-gray-700">
                  <div className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-emerald-500" />
                    <span>Plastic-free water solutions</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-emerald-500" />
                    <span>Kangen Water technology</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-emerald-500" />
                    <span>Family hydration solutions</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-emerald-500" />
                    <span>7-stage filtration system</span>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            {/* Baker's Kitchen Card */}
            <Card className="bg-gradient-to-br from-amber-50 to-orange-50 border-amber-200 shadow-xl">
              <CardContent className="p-8">
                <div className="text-center mb-6">
                  <div className="w-16 h-16 bg-gradient-to-r from-amber-500 to-orange-500 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Heart className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-800 mb-2">Baker's Kitchen UAE</h3>
                  <p className="text-amber-600 font-semibold">Healthy Restaurant Experience</p>
                </div>
                
                <div className="space-y-3 text-gray-700">
                  <div className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-emerald-500" />
                    <span>Fresh, wholesome meals</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-emerald-500" />
                    <span>Serving Kangen Water with meals</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-emerald-500" />
                    <span>Located in Mazaya Center</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-emerald-500" />
                    <span>Premium gourmet experience</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
      {/* Offer Section */}
      <section className="w-full py-6 sm:py-12 px-2 sm:px-4 bg-gradient-to-br from-emerald-50 to-cyan-50" data-testid="offer-section" style={{ maxWidth: '100vw' }}>
        <div className="w-full max-w-full mx-auto" style={{ maxWidth: '100vw' }}>
          {/* Partnership Offer Banner */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center bg-gradient-to-r from-emerald-500 to-amber-500 text-white rounded-full px-8 py-4 mb-6 font-bold text-lg shadow-2xl">
              <Gift className="w-6 h-6 mr-3" />
              <span>🎉 PARTNERSHIP SPECIAL: AED 99 STARTER KIT + BAKER'S KITCHEN PERKS 🎉</span>
              <Gift className="w-6 h-6 ml-3" />
            </div>
          </div>

          <div className="grid lg:grid-cols-2 gap-4 lg:gap-8 items-center w-full max-w-full">
            {/* Left: Value Proposition */}
            <div className="text-center lg:text-left">
              <div className="mb-4 lg:mb-6">
                <div className="inline-flex items-center bg-emerald-500/20 border border-emerald-500/50 rounded-full px-4 sm:px-6 py-2 sm:py-3 mb-3 sm:mb-4">
                  <Award className="w-4 sm:w-5 h-4 sm:h-5 text-emerald-500 mr-2" />
                  <span className="text-emerald-600 font-bold text-sm sm:text-base">PARTNERSHIP EXCLUSIVE OFFER</span>
                </div>
                
                <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-gray-800 mb-3 sm:mb-4 leading-tight">
                  <span className="bg-gradient-to-r from-emerald-500 to-cyan-500 bg-clip-text text-transparent">
                    AED 99
                  </span>
                  <br />
                  <span className="text-xl sm:text-2xl md:text-3xl lg:text-4xl text-gray-600">Starter Kit</span>
                </h1>
                
                <div className="relative mb-4 group">
                  <div className="bg-gradient-to-r from-emerald-100 to-cyan-100 rounded-xl p-3 sm:p-4 border border-emerald-300">
                    <div className="text-sm sm:text-base md:text-lg font-bold text-gray-800 text-center mb-1">
                      💎 Now Available at Baker's Kitchen! 💎
                    </div>
                    <div className="text-xs sm:text-sm text-emerald-600 text-center font-semibold">
                      Experience with your meal at Mazaya Center
                    </div>
                  </div>
                </div>
              </div>

              {/* Key Benefits */}
              <div className="space-y-2 mb-6">
                <div className="flex items-center justify-center lg:justify-start text-xs sm:text-sm">
                  <div className="w-6 h-6 bg-emerald-500 rounded-full flex items-center justify-center mr-3 flex-shrink-0">
                    <Gift className="w-3 h-3 text-white" />
                  </div>
                  <span className="text-gray-800 font-semibold">FREE Beauty Ionic Shower Filter (AED 399 value)</span>
                </div>
                <div className="flex items-center justify-center lg:justify-start text-xs sm:text-sm">
                  <div className="w-6 h-6 bg-cyan-500 rounded-full flex items-center justify-center mr-3 flex-shrink-0">
                    <CheckCircle className="w-3 h-3 text-white" />
                  </div>
                  <span className="text-gray-800 font-semibold">Premium Support & Setup Guidance</span>
                </div>
                <div className="flex items-center justify-center lg:justify-start text-xs sm:text-sm">
                  <div className="w-6 h-6 bg-amber-500 rounded-full flex items-center justify-center mr-3 flex-shrink-0">
                    <Heart className="w-3 h-3 text-white" />
                  </div>
                  <span className="text-gray-800 font-semibold">AED 100 Baker's Kitchen Voucher when your friend signs up</span>
                </div>
                <div className="flex items-center justify-center lg:justify-start text-xs sm:text-sm">
                  <div className="w-6 h-6 bg-purple-500 rounded-full flex items-center justify-center mr-3 flex-shrink-0">
                    <Star className="w-3 h-3 text-white" />
                  </div>
                  <span className="text-gray-800 font-semibold">Instant Planet Hero Level 2 Status</span>
                </div>
                <div className="flex items-center justify-center lg:justify-start text-xs sm:text-sm">
                  <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center mr-3 flex-shrink-0">
                    <MapPin className="w-3 h-3 text-white" />
                  </div>
                  <span className="text-gray-800 font-semibold">Experience Kangen Water at Baker's Kitchen</span>
                </div>
              </div>

              {/* Partnership CTA */}
              <div className="space-y-3">
                <Button
                  onClick={() => handleOrderNow('hero-minimal')}
                  disabled={isOrderLoading === 'hero-minimal'}
                  className="w-full bg-gradient-to-r from-emerald-500 to-cyan-500 hover:from-emerald-600 hover:to-cyan-600 text-white px-4 sm:px-6 py-2 sm:py-3 text-sm sm:text-base font-bold rounded-xl shadow-lg transition-all disabled:opacity-70"
                  data-testid="button-partnership-offer"
                >
                  {isOrderLoading === 'hero-minimal' ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-current mr-2"></div>
                      PROCESSING...
                    </>
                  ) : (
                    <>
                      <Heart className="mr-2 w-4 h-4" />
                      GET HERO GATEWAY - AED 99
                    </>
                  )}
                </Button>
                
                <p className="text-emerald-600 font-bold text-xs sm:text-sm text-center">
                  🍰 Includes Baker's Kitchen dining experience! 🍰
                </p>
              </div>
            </div>

            {/* Right: Product & Partnership Showcase */}
            <div className="relative mt-6 lg:mt-0 w-full">
              <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-3 sm:p-4 border border-emerald-200 shadow-lg w-full">
                <div className="text-center mb-3 sm:mb-4">
                  <img 
                    src={aquacafeTradeIn} 
                    alt="AquaCafe Trade-in Offer" 
                    className="w-full h-40 sm:h-48 object-cover rounded-xl shadow-md mb-3"
                  />
                </div>
                
                <div className="bg-emerald-50 rounded-xl p-3 sm:p-4 border border-emerald-200 mb-4">
                  <div className="text-center">
                    <div className="text-sm sm:text-base font-bold text-gray-800 mb-2">AquaCafe Beauty Hair & Skincare</div>
                    <div className="text-xs sm:text-sm text-emerald-600 mb-3">Ionic Shower Filter</div>
                    <div className="grid grid-cols-2 gap-2 text-xs text-gray-700">
                      <div>✨ 4-Level Filtration</div>
                      <div>💧 Removes Chlorine</div>
                      <div>🌟 Softer Hair</div>
                      <div>💎 Healthier Skin</div>
                    </div>
                  </div>
                </div>
                
                <div className="text-center">
                  <div className="text-gray-500 line-through text-sm mb-1">Regular Price: AED 399</div>
                  <div className="text-lg sm:text-xl font-bold text-emerald-600 mb-2">FREE with Partnership Kit!</div>
                  <div className="text-amber-600 font-bold text-xs sm:text-sm">+ Baker's Kitchen AED 100 Voucher</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* AI-Guided Journey CTAs - Following the prototype flow */}
      <section className="w-full py-8 sm:py-12 px-2 sm:px-4 bg-gradient-to-br from-slate-50 to-blue-50" data-testid="journey-ctas" style={{ maxWidth: '100vw' }}>
        <div className="w-full max-w-full mx-auto" style={{ maxWidth: '100vw' }}>
          <div className="text-center mb-6 sm:mb-8">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-4">
              🚀 Your DeliWer Journey Starts Here
            </h2>
            <p className="text-gray-600 text-sm sm:text-base max-w-2xl mx-auto px-2">
              Now that you've discovered AquaCafe, explore more ways to earn Planet Points and join Dubai's circular economy
            </p>
          </div>

          {/* AI-style wizard inspired by prototype */}
          <div className="max-w-4xl mx-auto rounded-3xl border-2 border-gray-200 shadow-2xl bg-white p-6 sm:p-8 text-left mb-8">
            <div className="flex items-start gap-4">
              <div className="text-4xl">🤖</div>
              <div className="flex-1">
                <p className="font-bold text-lg text-gray-800 mb-6">What brings you to DeliWer today?</p>
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  <Link 
                    href="/exchange"
                    className="rounded-2xl border-2 border-blue-300 p-6 hover:shadow-xl hover:border-blue-500 text-left transition-all group bg-blue-50 hover:bg-blue-100"
                    data-testid="cta-exchange"
                  >
                    <div className="text-3xl mb-3">📱</div>
                    <div className="font-bold text-gray-800 group-hover:text-blue-600 mb-2">I want to trade in my iPhone</div>
                    <div className="text-sm text-gray-600">Start Exchange</div>
                  </Link>
                  
                  <Link 
                    href="/collect"
                    className="rounded-2xl border-2 border-emerald-300 p-6 hover:shadow-xl hover:border-emerald-500 text-left transition-all group bg-emerald-50 hover:bg-emerald-100"
                    data-testid="cta-play"
                  >
                    <div className="text-3xl mb-3">🌍</div>
                    <div className="font-bold text-gray-800 group-hover:text-emerald-600 mb-2">I want to join the eco leaderboard</div>
                    <div className="text-sm text-gray-600">Collect Points</div>
                  </Link>
                  
                  <Link 
                    href="/redeem"
                    className="rounded-2xl border-2 border-purple-300 p-6 hover:shadow-xl hover:border-purple-500 text-left transition-all group bg-purple-50 hover:bg-purple-100"
                    data-testid="cta-redeem"
                  >
                    <div className="text-3xl mb-3">🎁</div>
                    <div className="font-bold text-gray-800 group-hover:text-purple-600 mb-2">I want to redeem rewards</div>
                    <div className="text-sm text-gray-600">Use Planet Points</div>
                  </Link>
                </div>
                
                {/* Additional CTA for community */}
                <div className="mt-6 pt-6 border-t border-gray-200">
                  <Link 
                    href="/community"
                    className="inline-flex items-center gap-3 text-amber-600 hover:text-amber-700 font-semibold transition-colors"
                    data-testid="cta-community"
                  >
                    <span className="text-2xl">👥</span>
                    <span>Join the community & share impact stories</span>
                  </Link>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Stats & Campaign Banner */}
          <div className="grid sm:grid-cols-3 gap-4 mb-6">
            <div className="bg-gradient-to-r from-blue-500/10 to-cyan-500/10 rounded-xl p-4 text-center border border-blue-200">
              <div className="text-2xl font-bold text-blue-600">12,000+</div>
              <div className="text-sm text-gray-600">Planet Heroes in Dubai</div>
            </div>
            <div className="bg-gradient-to-r from-emerald-500/10 to-green-500/10 rounded-xl p-4 text-center border border-emerald-200">
              <div className="text-2xl font-bold text-emerald-600">2.5M</div>
              <div className="text-sm text-gray-600">Plastic bottles avoided</div>
            </div>
            <div className="bg-gradient-to-r from-purple-500/10 to-pink-500/10 rounded-xl p-4 text-center border border-purple-200">
              <div className="text-2xl font-bold text-purple-600">AED 50K+</div>
              <div className="text-sm text-gray-600">Total rewards redeemed</div>
            </div>
          </div>

          <div className="text-center">
            <div className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-emerald-500 to-blue-500 text-white px-6 py-3 text-sm font-bold shadow-lg">
              🔥 Double rewards during iPhone 17 + GITEX launch
            </div>
          </div>
        </div>
      </section>
      {/* Sustainability Section */}
      <section className="w-full py-6 sm:py-12 px-2 sm:px-4 bg-gradient-to-br from-emerald-600 to-cyan-600 text-white" data-testid="sustainability-section" style={{ maxWidth: '100vw' }}>
        <div className="w-full max-w-full mx-auto text-center" style={{ maxWidth: '100vw' }}>
          <div className="mb-4 sm:mb-6">
            <h2 className="text-xl sm:text-2xl md:text-3xl font-bold mb-3">
              #SayNoToPlastic, SayYesToHealth
            </h2>
            <p className="text-sm sm:text-base text-emerald-100 max-w-full mx-auto px-2">
              Join AquaCafe and Baker's Kitchen in creating a sustainable future for Dubai
            </p>
          </div>
          
          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-3 sm:gap-4 mb-6 sm:mb-8 w-full max-w-full">
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
              <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-3">
                <Leaf className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-lg font-bold mb-2">Plastic-Free</h3>
              <p className="text-emerald-100 text-sm">Eliminate single-use plastic bottles with our advanced filtration systems</p>
            </div>
            
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
              <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-3">
                <Heart className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-lg font-bold mb-2">Healthy Lifestyle</h3>
              <p className="text-emerald-100 text-sm">Pure water and nutritious meals for optimal health and wellness</p>
            </div>
            
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
              <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-3">
                <Users className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-lg font-bold mb-2">Local Community Impact</h3>
              <p className="text-emerald-100 text-sm">Supporting Dubai's sustainable development goals through partnership</p>
            </div>
          </div>
        </div>
      </section>
      {/* Referral Program & Bakers Kitchen Partnership */}
      <section className="w-full py-6 sm:py-10 px-2 sm:px-4 bg-gradient-to-br from-amber-50 to-orange-50" data-testid="referral-program" style={{ maxWidth: '100vw' }}>
        <div className="w-full max-w-full mx-auto text-center" style={{ maxWidth: '100vw' }}>
          <div className="inline-flex items-center bg-amber-500/20 border border-amber-500/50 rounded-full px-3 sm:px-4 py-2 mb-4">
            <Users className="w-4 h-4 text-amber-600 mr-2" />
            <span className="text-amber-600 font-bold text-xs sm:text-sm">PARTNERSHIP REFERRAL REWARDS</span>
          </div>
          
          <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-800 mb-3 sm:mb-4">
            Refer Friends & Get <span className="text-emerald-600">AED 100 FREE VOUCHER</span> at Baker's Kitchen!
          </h2>
          
          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-3 sm:gap-4 mb-4 sm:mb-6 w-full max-w-full">
            <div className="bg-white backdrop-blur-sm rounded-xl p-4 border border-emerald-200 shadow-lg">
              <div className="w-10 h-10 bg-emerald-500 rounded-full flex items-center justify-center mx-auto mb-3">
                <span className="text-white font-bold text-lg">1</span>
              </div>
              <h3 className="text-base font-bold text-gray-800 mb-2">Share Your Code</h3>
              <p className="text-gray-600 text-xs">Every Planet Hero gets a unique referral code to share with friends</p>
            </div>
            
            <div className="bg-white backdrop-blur-sm rounded-xl p-4 border border-cyan-200 shadow-lg">
              <div className="w-10 h-10 bg-cyan-500 rounded-full flex items-center justify-center mx-auto mb-3">
                <span className="text-white font-bold text-lg">2</span>
              </div>
              <h3 className="text-base font-bold text-gray-800 mb-2">Friend Joins</h3>
              <p className="text-gray-600 text-xs">When they purchase any AquaCafe plan using your code</p>
            </div>
            
            <div className="bg-white backdrop-blur-sm rounded-xl p-4 border border-amber-200 shadow-lg">
              <div className="w-10 h-10 bg-amber-500 rounded-full flex items-center justify-center mx-auto mb-3">
                <span className="text-white font-bold text-lg">3</span>
              </div>
              <h3 className="text-base font-bold text-gray-800 mb-2">You Both Win!</h3>
              <p className="text-gray-600 text-xs">AED 100 Baker's Kitchen voucher + 500 bonus Planet Points each</p>
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
      <section className="w-full py-6 sm:py-12 px-2 sm:px-4 bg-gradient-to-br from-gray-50 to-emerald-50" data-testid="pricing-plans" style={{ maxWidth: '100vw' }}>
        <div className="w-full max-w-full mx-auto" style={{ maxWidth: '100vw' }}>
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
      <footer className="w-full border-t border-emerald-200 mt-6 sm:mt-8 bg-gradient-to-r from-emerald-50 to-cyan-50" style={{ maxWidth: '100vw' }}>
        <div className="w-full max-w-full mx-auto px-2 sm:px-4 py-4 sm:py-6" style={{ maxWidth: '100vw' }}>
          {/* Bottom CTA Flow - Complete Journey */}
          <div className="mb-6 sm:mb-8">
            <div className="text-center mb-6">
              <h3 className="text-xl font-bold text-gray-800 mb-2">Continue Your DeliWer Journey</h3>
              <p className="text-sm text-gray-600">Follow the complete flow: Exchange → Play → Redeem → Community → Checkout</p>
            </div>
            <div className="flex flex-col lg:flex-row items-center justify-center gap-3 max-w-6xl mx-auto">
              <Link
                href="/exchange"
                className="w-full lg:w-auto px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl text-center transition-all shadow-lg"
                data-testid="footer-cta-exchange"
              >
                Start Exchange
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
              <Button
                onClick={() => handleOrderNow('hero-minimal')}
                className="w-full lg:w-auto px-6 py-3 bg-gray-900 hover:bg-black text-white font-bold rounded-xl transition-all shadow-lg"
                data-testid="footer-cta-checkout"
              >
                Order Starter Kit
              </Button>
            </div>
          </div>

          <div className="text-center mb-3 sm:mb-4">
            <div className="flex flex-col items-center justify-center gap-2 mb-3">
              <div className="flex items-center gap-1">
                <div className="w-5 h-5 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-full flex items-center justify-center">
                  <Droplets className="w-3 h-3 text-white" />
                </div>
                <span className="font-bold text-gray-800 text-xs sm:text-sm">AquaCafe by DeliWer</span>
              </div>
              <span className="text-lg text-gray-600">×</span>
              <div className="flex items-center gap-1">
                <div className="w-5 h-5 bg-gradient-to-r from-amber-500 to-orange-500 rounded-full flex items-center justify-center">
                  <Heart className="w-3 h-3 text-white" />
                </div>
                <span className="font-bold text-gray-800 text-xs sm:text-sm">Baker's Kitchen UAE</span>
              </div>
            </div>
            <div className="text-sm font-bold text-emerald-600 mb-1">
              #SvenTheBaker × #DeliWer
            </div>
            <div className="text-xs text-gray-600">
              © 2024 Partnership • Mazaya Center, Business Bay • AI‑First Circular Exchange
            </div>
          </div>
          
          <div className="flex flex-col items-center justify-center gap-2">
            <div className="flex flex-col items-center gap-2 w-full">
              <Link href="/exchange" className="px-3 py-2 rounded-lg bg-blue-600 text-white font-semibold hover:bg-blue-700 transition-colors text-xs w-full max-w-xs text-center" data-testid="footer-start-exchange">
                Start iPhone Exchange
              </Link>
              <Button 
                onClick={() => handleOrderNow('hero-minimal')}
                disabled={isOrderLoading === 'hero-minimal'}
                className="px-3 py-2 rounded-lg bg-gradient-to-r from-emerald-500 to-cyan-500 text-white font-semibold hover:from-emerald-600 hover:to-cyan-600 transition-colors text-xs w-full max-w-xs"
                data-testid="footer-order-partnership-kit"
              >
                Get Hero Minimal - AED 1299
              </Button>
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