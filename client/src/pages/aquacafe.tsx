import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { Link } from "wouter";
import { Star, ShoppingCart, Gift, CheckCircle, Zap, Shield, Award, Heart, Target, Rocket, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { AquaCafeProductsSection } from "@/components/aquacafe-products-section";

interface ProductFeatureProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

function ProductFeature({ icon, title, description }: ProductFeatureProps) {
  return (
    <div className="text-center p-6 bg-gradient-to-br from-slate-800/80 to-slate-900/90 backdrop-blur-sm rounded-xl border border-slate-600/70 shadow-lg">
      <div className="mb-4">{icon}</div>
      <h3 className="text-lg font-bold text-white mb-2 drop-shadow-sm">{title}</h3>
      <p className="text-gray-200 text-sm leading-relaxed">{description}</p>
    </div>
  );
}

export default function AquaCafe() {
  const [selectedPlan, setSelectedPlan] = useState<string>("premium");
  const [isOrderLoading, setIsOrderLoading] = useState<string | null>(null);
  const { toast } = useToast();

  const plans = [
    {
      id: "hero-starter",
      name: "AquaCafe Hero Starter - PLANET HERO ENTRY",
      price: 99,
      originalPrice: 1398,
      heroDiscount: 20,
      features: [
        "🎁 FREE AquaCafe Beauty Ionic Shower Filter (AED 399 value)",
        "🔧 FREE Professional Installation (AED 299 value)",
        "💧 Premium 3-stage filtration system",
        "📦 12-month filter supply included",
        "⭐ Instant Planet Hero Level 2 status",
        "🎯 1000 starter points + 2X Hero multiplier",
        "📞 24/7 Planet Hero priority support",
        "📱 Smart monitoring app with Hero dashboard",
        "🏆 Exclusive Hero member badge",
        "💰 20% discount on ALL future plans",
        "🍰 Referral rewards: AED 100 Bakers Kitchen voucher"
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

  const productFeatures = [
    {
      icon: <Shield className="w-8 h-8 text-blue-400 mx-auto" />,
      title: "99.9% Filtration",
      description: "Removes chlorine, heavy metals, bacteria, and microplastics"
    },
    {
      icon: <Heart className="w-8 h-8 text-red-400 mx-auto" />,
      title: "Family Safe",
      description: "NSF certified, BPA-free materials, child-safe design"
    },
    {
      icon: <Zap className="w-8 h-8 text-amber-500 mx-auto" />,
      title: "Smart Monitoring",
      description: "Real-time water quality tracking with mobile alerts"
    },
    {
      icon: <Award className="w-8 h-8 text-hero-green-500 mx-auto" />,
      title: "Dubai Approved",
      description: "DEWA certified, meets UAE water safety standards"
    }
  ];

  const handleOrderNow = async (planId: string) => {
    const plan = plans.find(p => p.id === planId);
    if (!plan) return;
    
    setIsOrderLoading(planId);
    
    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Redirect to Shopify with proper product variant
      const shopifyUrl = `https://www.deliwer.com/products/aquacafe?variant=${planId}`;
      window.open(shopifyUrl, '_blank');
      
      toast({
        title: "Redirecting to Checkout",
        description: `Opening Shopify checkout for ${plan.name}`,
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
    <div className="min-h-screen">
      {/* Planet Hero Program Entry Gateway - MAIN REVENUE SECTION */}
      <section className="py-16 px-4 bg-gradient-to-br from-amber-900/40 via-hero-green-900/30 to-dubai-blue-900/40 backdrop-blur-sm border-b-4 border-amber-500/50" data-testid="planet-hero-gateway">
        <div className="max-w-7xl mx-auto">
          {/* URGENT Revenue Banner */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center bg-gradient-to-r from-amber-500 to-orange-500 text-black rounded-full px-8 py-4 mb-6 font-bold text-lg shadow-2xl animate-pulse">
              <Gift className="w-6 h-6 mr-3" />
              <span>🚨 LIMITED TIME: 100% FREE SHOWER FILTER + INSTALLATION 🚨</span>
              <Gift className="w-6 h-6 ml-3" />
            </div>
          </div>

          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            {/* Left: Value Proposition */}
            <div className="text-center lg:text-left">
              <div className="mb-4 lg:mb-6">
                <div className="inline-flex items-center bg-hero-green-500/20 border border-hero-green-500/50 rounded-full px-4 sm:px-6 py-2 sm:py-3 mb-3 sm:mb-4">
                  <Award className="w-4 sm:w-5 h-4 sm:h-5 text-hero-green-500 mr-2" />
                  <span className="text-hero-green-500 font-bold text-sm sm:text-base">PLANET HERO PROGRAM ENTRY</span>
                </div>
                
                <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-white mb-3 sm:mb-4 leading-tight">
                  <span className="bg-gradient-to-r from-amber-400 to-orange-500 bg-clip-text text-transparent">
                    AED 99
                  </span>
                  <br />
                  <span className="text-xl sm:text-2xl md:text-3xl lg:text-4xl text-gray-200">Starter Kit</span>
                </h1>
                
                <div className="relative mb-6 group">
                  <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 via-yellow-400 to-pink-400 rounded-2xl blur-xl opacity-75 group-hover:opacity-100 transition-opacity animate-pulse"></div>
                  <div className="relative bg-gradient-to-r from-cyan-400 via-yellow-400 to-pink-400 bg-clip-text text-transparent text-3xl md:text-5xl font-black tracking-wider text-center py-4 px-6 bg-black/80 rounded-2xl border-2 border-cyan-400 shadow-2xl shadow-cyan-400/50 animate-pulse">
                    💎 GET AED 1000+ INSTANT VALUE! 💎
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-r from-cyan-400/20 via-yellow-400/20 to-pink-400/20 rounded-2xl animate-ping"></div>
                </div>
              </div>

              {/* Key Benefits */}
              <div className="space-y-4 mb-8">
                <div className="flex items-center justify-center lg:justify-start text-lg">
                  <div className="w-8 h-8 bg-amber-500 rounded-full flex items-center justify-center mr-4">
                    <Gift className="w-5 h-5 text-black" />
                  </div>
                  <span className="text-white font-bold">FREE AquaCafe Beauty Hair & Skincare Ionic Shower Filter</span>
                </div>
                <div className="flex items-center justify-center lg:justify-start text-lg">
                  <div className="w-8 h-8 bg-hero-green-500 rounded-full flex items-center justify-center mr-4">
                    <CheckCircle className="w-5 h-5 text-white" />
                  </div>
                  <span className="text-white font-bold">FREE Professional Installation (AED 299 value)</span>
                </div>
                <div className="flex items-center justify-center lg:justify-start text-lg">
                  <div className="w-8 h-8 bg-dubai-blue-500 rounded-full flex items-center justify-center mr-4">
                    <Star className="w-5 h-5 text-white" />
                  </div>
                  <span className="text-white font-bold">Instant Planet Hero Level 2 Status</span>
                </div>
                <div className="flex items-center justify-center lg:justify-start text-lg">
                  <div className="w-8 h-8 bg-purple-500 rounded-full flex items-center justify-center mr-4">
                    <Target className="w-5 h-5 text-white" />
                  </div>
                  <span className="text-white font-bold">1000 Planet Points + Hero Multiplier</span>
                </div>
                <div className="flex items-center justify-center lg:justify-start text-lg">
                  <div className="w-8 h-8 bg-amber-500 rounded-full flex items-center justify-center mr-4">
                    <Heart className="w-5 h-5 text-black" />
                  </div>
                  <span className="text-white font-bold">20% Discount on ALL Future AquaCafe Plans</span>
                </div>
              </div>

              {/* URGENT CTA */}
              <div className="space-y-4">
                <Button
                  onClick={() => handleOrderNow('hero-starter')}
                  disabled={isOrderLoading === 'hero-starter'}
                  className="w-full lg:w-auto bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-black px-12 py-6 text-2xl font-bold rounded-2xl shadow-2xl transform hover:scale-105 transition-all disabled:opacity-70"
                  data-testid="button-join-planet-heroes"
                >
                  {isOrderLoading === 'hero-starter' ? (
                    <>
                      <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-current mr-3"></div>
                      PROCESSING...
                    </>
                  ) : (
                    <>
                      <Rocket className="mr-3 w-6 h-6" />
                      JOIN PLANET HEROES NOW - AED 99
                    </>
                  )}
                </Button>
                
                <p className="text-amber-300 font-bold text-lg">
                  🔥 Only 47 starter kits left in Dubai! 🔥
                </p>
              </div>
            </div>

            {/* Right: Shower Filter Showcase */}
            <div className="relative">
              <div className="bg-gradient-to-br from-blue-500/20 to-purple-500/20 backdrop-blur-sm rounded-3xl p-8 border border-blue-500/30">
                <div className="text-center mb-6">
                  <div className="text-3xl font-bold text-white mb-2">💝 FREE GIFT WITH EVERY STARTER KIT</div>
                  <div className="text-amber-400 text-xl font-bold">"LOVE IS IN THE HAIR" Campaign</div>
                </div>
                
                <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20 mb-6">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-white mb-3">AquaCafe Beauty Hair & Skincare</div>
                    <div className="text-lg text-blue-300 mb-4">Ionic Shower Filter</div>
                    <div className="grid grid-cols-2 gap-4 text-sm text-gray-300">
                      <div>✨ 4-Level Filtration</div>
                      <div>💧 Removes Chlorine</div>
                      <div>🌟 Softer Hair</div>
                      <div>💎 Healthier Skin</div>
                    </div>
                  </div>
                </div>
                
                <div className="text-center">
                  <div className="text-gray-400 line-through text-lg mb-1">Regular Price: AED 399</div>
                  <div className="text-3xl font-bold text-hero-green-500 mb-2">FREE with Starter Kit!</div>
                  <div className="text-amber-400 font-bold">+ FREE Installation (AED 299 value)</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* Referral Program & Bakers Kitchen Voucher */}
      <section className="py-12 px-4 bg-gradient-to-br from-purple-900/30 to-pink-900/20 backdrop-blur-sm border-y border-purple-500/30" data-testid="referral-program">
        <div className="max-w-6xl mx-auto text-center">
          <div className="inline-flex items-center bg-purple-500/20 border border-purple-500/50 rounded-full px-6 py-3 mb-6">
            <Users className="w-5 h-5 text-purple-400 mr-2" />
            <span className="text-purple-400 font-bold">HERO REFERRAL REWARDS</span>
          </div>
          
          <h2 className="text-3xl font-bold text-white mb-6">
            Refer Friends & Get <span className="text-amber-500">AED 100 FREE KANGENWATER</span> from Bakers Kitchen!
          </h2>
          
          <div className="grid md:grid-cols-3 gap-6 mb-8">
            <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-6 border border-purple-500/20">
              <div className="w-12 h-12 bg-purple-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-white font-bold text-xl">1</span>
              </div>
              <h3 className="text-lg font-bold text-white mb-2">Share Your Code</h3>
              <p className="text-gray-300 text-sm">Every Planet Hero gets a unique referral code to share with friends</p>
            </div>
            
            <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-6 border border-hero-green-500/20">
              <div className="w-12 h-12 bg-hero-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-white font-bold text-xl">2</span>
              </div>
              <h3 className="text-lg font-bold text-white mb-2">Friend Joins</h3>
              <p className="text-gray-300 text-sm">When they purchase any AquaCafe plan using your code</p>
            </div>
            
            <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-6 border border-amber-500/20">
              <div className="w-12 h-12 bg-amber-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-black font-bold text-xl">3</span>
              </div>
              <h3 className="text-lg font-bold text-white mb-2">You Both Win!</h3>
              <p className="text-gray-300 text-sm">AED 100 Bakers Kitchen voucher + 500 bonus Planet Points each</p>
            </div>
          </div>
          
          <div className="bg-gradient-to-r from-amber-500/10 to-purple-500/10 border border-amber-500/30 rounded-xl p-6">
            <div className="text-amber-400 font-bold text-lg mb-2">🍰 Partnership with Bakers Kitchen Dubai 🍰</div>
            <p className="text-gray-300">Use your AED 100 Kangen Water voucher at Bakers Kitchen Dubai for premium cakes, pastries, and gourmet meals!</p>
          </div>
        </div>
      </section>
      {/* Hero Section - Now Secondary */}
      <section className="py-16 px-4 bg-gradient-to-br from-slate-900/95 to-slate-800/90 backdrop-blur-sm" data-testid="aquacafe-hero">
        <div className="max-w-7xl mx-auto text-center">
          <div className="inline-flex items-center glass rounded-full px-6 py-3 mb-6 border border-hero-green-500/30">
            <Star className="w-5 h-5 text-amber-500 mr-2" />
            <span className="text-white font-medium">DUBAI'S #1 WATER FILTRATION SYSTEM</span>
          </div>
          
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-6 leading-tight">
            AquaCafe
            <br />
            <span className="bg-gradient-to-r from-blue-400 to-cyan-500 bg-clip-text text-transparent">
              Premium Water Systems
            </span>
          </h2>
          
          <p className="text-xl text-gray-200 max-w-3xl mx-auto mb-8">
            Transform your old iPhone into premium clean water for your family. 
            Join 12,000+ Dubai families already protecting their health with AquaCafe.
          </p>
          
          {/* Trust Indicators */}
          <div className="flex flex-wrap justify-center items-center gap-8 mb-12 text-sm text-gray-400">
            <div className="flex items-center">
              <CheckCircle className="w-4 h-4 text-hero-green-500 mr-2" />
              DEWA Certified
            </div>
            <div className="flex items-center">
              <CheckCircle className="w-4 h-4 text-hero-green-500 mr-2" />
              NSF International
            </div>
            <div className="flex items-center">
              <CheckCircle className="w-4 h-4 text-hero-green-500 mr-2" />
              ISO 9001 Quality
            </div>
            <div className="flex items-center">
              <CheckCircle className="w-4 h-4 text-hero-green-500 mr-2" />
              5 Year Warranty
            </div>
          </div>
        </div>
      </section>
      {/* Product Features Grid */}
      <section className="py-16 px-4 bg-gradient-to-br from-blue-950/40 to-slate-900/60 backdrop-blur-sm" data-testid="product-features">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12 bg-slate-800/60 backdrop-blur-sm rounded-2xl p-8 border border-slate-700/50">
            <h2 className="text-3xl font-bold text-white mb-4 drop-shadow-md">Why 12,000+ Dubai Families Choose AquaCafe</h2>
            <p className="text-gray-200 text-lg leading-relaxed">Premium filtration technology meets Dubai's water challenges</p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {productFeatures.map((feature, index) => (
              <ProductFeature key={index} {...feature} />
            ))}
          </div>
        </div>
      </section>
      {/* AquaCafe Products Section */}
      <AquaCafeProductsSection />
      {/* Pricing Plans */}
      <section className="py-16 px-4 bg-gradient-to-br from-amber-950/20 to-slate-900/80 backdrop-blur-sm" data-testid="pricing-plans">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12 bg-slate-800/70 backdrop-blur-sm rounded-2xl p-8 border border-amber-500/30">
            <h2 className="text-4xl font-bold text-white mb-4 drop-shadow-md">
              🏆 CHOOSE YOUR HERO PACKAGE
            </h2>
            <p className="text-gray-100 text-lg leading-relaxed">
  Choose the perfect AquaCafe package for your family's needs
            </p>
            
          </div>
          
          <div className="grid md:grid-cols-3 gap-8 mb-12" data-testid="aquacafe-packages">
            {plans.map((plan) => {
              const basePrice = plan.price;
              const heroDiscountAmount = plan.heroDiscount ? (plan.price * plan.heroDiscount / 100) : 0;
              const finalPrice = basePrice - heroDiscountAmount;
              const totalSavings = plan.originalPrice - plan.price + heroDiscountAmount;
              
              return (
                <Card 
                  key={plan.id} 
                  className={`relative bg-gradient-to-br from-slate-800/90 to-slate-900/95 backdrop-blur-sm border-slate-600/70 overflow-hidden shadow-xl ${
                    plan.popular ? 'border-amber-500/50 scale-105 ring-2 ring-amber-500/30' : ''
                  }`}
                  data-testid={`plan-${plan.id}`}
                >
                  {plan.popular && (
                    <div className="absolute top-0 left-0 right-0 bg-gradient-to-r from-amber-500 to-orange-500 text-black text-center py-2 font-bold text-sm">
                      {plan.badge}
                    </div>
                  )}
                  
                  <CardContent className="p-8 pt-12">
                    {!plan.popular && (
                      <div className="text-center mb-4">
                        <span className="bg-slate-700 text-gray-300 px-3 py-1 rounded-full text-xs font-bold">
                          {plan.badge}
                        </span>
                      </div>
                    )}
                    
                    <div className="text-center mb-6">
                      <h3 className="text-2xl font-bold text-white mb-2">{plan.name}</h3>
                      
                      <div className="mb-4">
                        <div className="text-gray-400 line-through text-lg mb-1">
                          AED {plan.originalPrice.toLocaleString()}
                        </div>
                        {plan.isHeroEntry ? (
                          <>
                            <div className="text-6xl font-bold text-amber-500 mb-2">
                              AED {plan.price}
                            </div>
                            <div className="text-hero-green-500 font-bold text-lg mb-1">
                              Planet Hero Price: AED {Math.max(0, finalPrice).toLocaleString()}
                            </div>
                            <div className="text-sm text-amber-500 font-bold">
                              TOTAL VALUE: AED {totalSavings.toLocaleString()}+ FREE!
                            </div>
                          </>
                        ) : (
                          <>
                            <div className="text-3xl font-bold text-white mb-2">
                              AED {plan.price.toLocaleString()}
                            </div>
                            <div className="text-sm text-amber-500 font-bold">
                              Save AED {totalSavings.toLocaleString()}
                            </div>
                          </>
                        )}
                      </div>
                    </div>
                    
                    <div className="space-y-3 mb-8">
                      {plan.features.map((feature, index) => (
                        <div key={index} className="flex items-center text-sm text-gray-300">
                          <CheckCircle className="w-4 h-4 text-hero-green-500 mr-3 flex-shrink-0" />
                          {feature}
                        </div>
                      ))}
                    </div>
                    
                    <Button
                      onClick={() => handleOrderNow(plan.id)}
                      disabled={isOrderLoading === plan.id}
                      className={`w-full py-4 font-bold text-lg rounded-xl transition-all transform hover:scale-105 ${
                        plan.isHeroEntry
                          ? 'bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-black disabled:opacity-70 shadow-2xl animate-pulse'
                          : plan.popular
                          ? 'bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-black disabled:opacity-70'
                          : 'bg-hero-green-500 hover:bg-hero-green-600 text-white disabled:opacity-70'
                      }`}
                      data-testid={`button-order-${plan.id}`}
                    >
                      {isOrderLoading === plan.id ? (
                        <>
                          <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-current mr-2"></div>
                          PROCESSING...
                        </>
                      ) : plan.isHeroEntry ? (
                        <>
                          <Rocket className="mr-2 w-5 h-5" />
                          🚀 JOIN PLANET HEROES NOW!
                        </>
                      ) : (
                        <>
                          <ShoppingCart className="mr-2 w-5 h-5" />
                          ORDER NOW
                        </>
                      )}
                    </Button>
                  </CardContent>
                </Card>
              );
            })}
          </div>
          
          {/* Money Back Guarantee */}
          <div className="text-center">
            <div className="glass rounded-xl p-6 border border-slate-600 inline-block">
              <Shield className="w-12 h-12 text-hero-green-500 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-white mb-2">30-Day Money Back Guarantee</h3>
              <p className="text-gray-300">
                Not satisfied? Get your full refund + keep your Planet Hero points
              </p>
            </div>
          </div>
        </div>
      </section>
      {/* Final CTA Section */}
      <section className="py-16 px-4 bg-gradient-to-br from-orange-950/30 to-slate-900/90 backdrop-blur-sm border-t border-slate-700/50" data-testid="final-cta">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold text-white mb-6">
            🚀 JOIN 12,000+ DUBAI PLANET HEROES TODAY
          </h2>
          
          <div className="grid md:grid-cols-3 gap-6 mb-8">
            <div className="text-center p-4">
              <div className="text-3xl font-bold text-hero-green-500 mb-2">99.9%</div>
              <div className="text-gray-300">Filtration Rate</div>
            </div>
            <div className="text-center p-4">
              <div className="text-3xl font-bold text-blue-400 mb-2">5 Year</div>
              <div className="text-gray-300">Warranty</div>
            </div>
            <div className="text-center p-4">
              <div className="text-3xl font-bold text-amber-500 mb-2">24/7</div>
              <div className="text-gray-300">Support</div>
            </div>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a 
              href="https://www.deliwer.com/products/aquacafe"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-black px-12 py-4 rounded-xl font-bold text-xl transform hover:scale-105 transition-all"
              data-testid="button-order-hero"
            >
              <Target className="mr-2 w-6 h-6" />
              ORDER AQUACAFE - AED 99
            </a>
            <a 
              href="https://wa.me/971523946311"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center border-2 border-hero-green-500 text-hero-green-500 hover:bg-hero-green-500 hover:text-white px-12 py-4 rounded-xl font-bold text-xl transition-all"
              data-testid="button-chat-hero"
            >
              💬 CHAT WITH HERO CONCIERGE
            </a>
          </div>
          
          <p className="text-gray-400 text-sm mt-6">
            🔒 Secure Checkout • 🚚 Free Dubai Delivery • 🌍 Carbon Neutral Shipping
          </p>
        </div>
      </section>
    </div>
  );
}