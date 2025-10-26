import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { useLocation } from "wouter";
import { shopifyCartService } from "@/lib/shopify-cart";
import { Link } from "wouter";
import { Star, ShoppingCart, Gift, CheckCircle, Zap, Shield, Award, Heart, Home, Users, Rocket, Target, Eye, MapPin, Clock, ChefHat } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ARPreview } from "@/components/ar-preview";
import washingFace from "@assets/washing-face-01 (1)_1756065010952.jpg";
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
      const aquacafeProduct = {
        id: `aquacafe-${planId}`,
        variantId: `gid://shopify/ProductVariant/aquacafe-${planId}`,
        title: plan.name,
        variant: planId,
        price: plan.price,
        image: "🌊",
        quantity: 1,
      };

      await shopifyCartService.addToCart(aquacafeProduct);
      
      toast({
        title: "Added to Cart!",
        description: `${plan.name} has been added to your cart`,
      });

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
          <Link href="/earn" className="px-4 py-2 rounded-xl bg-blue-600 text-white text-sm hover:bg-blue-700 transition-colors" data-testid="link-start-earning">
            Earn Points
          </Link>
          <Link href="/products" className="px-4 py-2 rounded-xl bg-purple-600 text-white text-sm hover:bg-purple-700 transition-colors" data-testid="link-products">
            All Products
          </Link>
        </div>
      </div>
      
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
                <ChefHat className="w-3 h-3" />
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
              🏆 AQUACAFE MEMBERSHIP PACKAGES
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
                href="/leaderboard"
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
