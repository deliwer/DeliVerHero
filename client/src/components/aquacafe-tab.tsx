import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { Star, ShoppingCart, Gift, CheckCircle, Zap, Shield, Award, Heart, Target, Rocket, Users, Droplets, Home, Package } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { shopifyCartService } from "@/lib/shopify-cart";

interface ProductFeatureProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

function ProductFeature({ icon, title, description }: ProductFeatureProps) {
  return (
    <div className="text-center p-4 sm:p-6 bg-gradient-to-br from-slate-800/80 to-slate-900/90 backdrop-blur-sm rounded-xl border border-slate-600/70 shadow-lg">
      <div className="mb-3 sm:mb-4">{icon}</div>
      <h3 className="text-base sm:text-lg font-bold text-white mb-2 drop-shadow-sm">{title}</h3>
      <p className="text-gray-200 text-xs sm:text-sm leading-relaxed">{description}</p>
    </div>
  );
}

export function AquaCafeTab() {
  const [isOrderLoading, setIsOrderLoading] = useState<string | null>(null);
  const { toast } = useToast();

  const productFeatures = [
    {
      icon: <Droplets className="w-8 h-8 sm:w-12 sm:h-12 text-blue-400 mx-auto" />,
      title: "99.9% Filtration",
      description: "Advanced multi-stage filtration removes chlorine, heavy metals, and contaminants"
    },
    {
      icon: <Shield className="w-8 h-8 sm:w-12 sm:h-12 text-hero-green-500 mx-auto" />,
      title: "NSF Certified",
      description: "Certified by NSF International for water safety and quality standards"
    },
    {
      icon: <Home className="w-8 h-8 sm:w-12 sm:h-12 text-amber-500 mx-auto" />,
      title: "Loyalty Program",
      description: "Exclusive member benefits including installation perks"
    },
    {
      icon: <Package className="w-8 h-8 sm:w-12 sm:h-12 text-purple-500 mx-auto" />,
      title: "5 Year Warranty",
      description: "Comprehensive warranty with 24/7 customer support"
    }
  ];

  const plans = [
    {
      id: "hero-minimal",
      name: "Hero Minimal",
      subtitle: "UNDERSINK PURIFIER",
      price: 1299,
      originalPrice: 1599,
      features: [
        "🎁 FREE Beauty Ionic Shower Filter (AED 399)",
        "💧 Advanced undersink filtration system",
        "⭐ Planet Hero Level 2 status",
        "🎯 1000 points + 2X multiplier",
        "💰 20% discount on future plans"
      ],
      badge: "🚀 HERO MINIMAL",
      isHeroEntry: true
    },
    {
      id: "hero-premium",
      name: "Hero Premium",
      subtitle: "MOST POPULAR",
      price: 1499,
      originalPrice: 1999,
      features: [
        "Advanced 5-stage filtration",
        "18-month filter supply",
        "Planet Hero Level 3 status",
        "2500 points + 2X multiplier",
        "24/7 priority support",
        "Smart monitoring app"
      ],
      badge: "⚡ POPULAR",
      popular: true
    },
    {
      id: "hero-elite",
      name: "Hero Elite",
      subtitle: "PREMIUM EXPERIENCE",
      price: 2299,
      originalPrice: 2999,
      features: [
        "Premium 7-stage filtration",
        "24-month filter supply",
        "Planet Hero Level 4 status",
        "5000 points + 3X multiplier",
        "VIP concierge service",
        "Smart home integration"
      ],
      badge: "👑 ELITE"
    }
  ];

  const handleOrderNow = async (planId: string) => {
    setIsOrderLoading(planId);
    
    try {
      // Define product configurations for Shopify integration
      const productConfig = {
        'starter-kit': {
          id: 'aquacafe-starter-kit',
          variantId: 'gid://shopify/ProductVariant/starter-kit-default',
          title: 'AquaCafe Planet Hero Starter Kit',
          price: 99,
          image: 'https://deliwer-ecosystem.vercel.app/assets/aquacafe_shower_main_1755270492134.jpg'
        },
        'hero-minimal': {
          id: 'aquacafe-hero-minimal',
          variantId: 'gid://shopify/ProductVariant/hero-minimal-default',
          title: 'AquaCafe Hero Minimal - Undersink Purifier',
          price: 1299,
          image: 'https://deliwer-ecosystem.vercel.app/assets/aquacafe_shower_main_1755270492134.jpg'
        },
        'hero-premium': {
          id: 'aquacafe-hero-premium',
          variantId: 'gid://shopify/ProductVariant/hero-premium-default',
          title: 'AquaCafe Hero Premium - Most Popular',
          price: 1499,
          image: 'https://deliwer-ecosystem.vercel.app/assets/aquacafe_shower_main_1755270492134.jpg'
        },
        'hero-elite': {
          id: 'aquacafe-hero-elite',
          variantId: 'gid://shopify/ProductVariant/hero-elite-default',
          title: 'AquaCafe Hero Elite - Premium Experience',
          price: 2299,
          image: 'https://deliwer-ecosystem.vercel.app/assets/aquacafe_shower_main_1755270492134.jpg'
        }
      };

      const product = productConfig[planId as keyof typeof productConfig];
      
      if (!product) {
        throw new Error('Product configuration not found');
      }

      // Add product to Shopify cart
      await shopifyCartService.addToCart({
        id: product.id,
        variantId: product.variantId,
        title: product.title,
        variant: 'Default',
        price: product.price,
        image: product.image,
        quantity: 1
      });

      toast({
        title: "Added to Cart!",
        description: `${product.title} has been added to your cart`,
      });

      // Create checkout session and redirect to Shopify
      const cartItems = await shopifyCartService.getCartItems();
      const checkoutUrl = await shopifyCartService.createCheckout(cartItems);

      toast({
        title: "Redirecting to Checkout",
        description: "Taking you to secure payment...",
      });

      // Redirect to Shopify checkout
      window.location.href = checkoutUrl;
      
    } catch (error) {
      console.error('Order error:', error);
      
      // Fallback to direct product page if cart integration fails
      toast({
        title: "Redirecting to Product Page",
        description: "Opening product page for secure checkout...",
      });
      
      if (planId === 'starter-kit') {
        window.open('https://1529ec-71.myshopify.com/products/aquacafe-planet-hero-starter-kit?ref=PLANETHEROES', '_blank');
      } else {
        window.open(`https://1529ec-71.myshopify.com/products/aquacafe-hero-${planId.split('-')[1]}?ref=HEROPROGRAM`, '_blank');
      }
    } finally {
      setIsOrderLoading(null);
    }
  };

  return (
    <div className="w-full">
      {/* Hero Section - Compact & Mobile Optimized */}
      <section className="py-8 sm:py-12 px-3 sm:px-4 bg-gradient-to-br from-amber-900/40 via-hero-green-900/30 to-dubai-blue-900/40 backdrop-blur-sm border-b border-amber-500/30">
        <div className="max-w-6xl mx-auto">
          {/* Urgent Banner - Mobile Responsive */}
          <div className="text-center mb-6 sm:mb-8">
            <div className="inline-flex items-center bg-gradient-to-r from-amber-500 to-orange-500 text-black rounded-full px-4 sm:px-8 py-2 sm:py-3 mb-4 sm:mb-6 font-bold text-sm sm:text-base md:text-lg shadow-xl animate-pulse">
              <Gift className="w-4 h-4 sm:w-6 sm:h-6 mr-2 sm:mr-3" />
              <span className="text-center">🚨 FREE SHOWER FILTER + INSTALLATION 🚨</span>
              <Gift className="w-4 h-4 sm:w-6 sm:h-6 ml-2 sm:ml-3" />
            </div>
          </div>

          <div className="grid lg:grid-cols-2 gap-6 lg:gap-8 items-center">
            {/* Left: Value Proposition - Streamlined */}
            <div className="text-center lg:text-left space-y-4 sm:space-y-6">
              <div className="inline-flex items-center bg-hero-green-500/20 border border-hero-green-500/50 rounded-full px-3 sm:px-6 py-2 sm:py-3 mb-3 sm:mb-4">
                <Award className="w-4 h-4 sm:w-5 sm:h-5 text-hero-green-500 mr-2" />
                <span className="text-hero-green-500 font-bold text-xs sm:text-sm md:text-base">LOYALTY MEMBERSHIP PROGRAM</span>
              </div>
              
              <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white leading-tight">
                <span className="bg-gradient-to-r from-amber-400 to-orange-500 bg-clip-text text-transparent">AED 99</span>
                <br />
                <span className="text-lg sm:text-xl md:text-2xl text-gray-200">Starter Kit</span>
              </h1>
              
              <div className="relative mb-4 sm:mb-6 group">
                <div className="bg-gradient-to-r from-cyan-400 via-yellow-400 to-pink-400 bg-clip-text text-transparent text-xl sm:text-2xl md:text-3xl font-black text-center py-3 sm:py-4 px-4 sm:px-6 bg-black/80 rounded-xl border border-cyan-400 shadow-xl animate-pulse">
                  💎 LIFETIME MEMBER BENEFITS! 💎
                </div>
              </div>

              {/* Key Benefits - Compact */}
              <div className="space-y-3 mb-6 sm:mb-8">
                <div className="flex items-center justify-center lg:justify-start text-sm sm:text-base">
                  <div className="w-6 h-6 sm:w-8 sm:h-8 bg-amber-500 rounded-full flex items-center justify-center mr-3 sm:mr-4">
                    <Gift className="w-3 h-3 sm:w-5 sm:h-5 text-black" />
                  </div>
                  <span className="text-white font-medium">FREE Ionic Shower Filter</span>
                </div>
                <div className="flex items-center justify-center lg:justify-start text-sm sm:text-base">
                  <div className="w-6 h-6 sm:w-8 sm:h-8 bg-hero-green-500 rounded-full flex items-center justify-center mr-3 sm:mr-4">
                    <CheckCircle className="w-3 h-3 sm:w-5 sm:h-5 text-white" />
                  </div>
                  <span className="text-white font-medium">Loyalty Member Perk</span>
                </div>
                <div className="flex items-center justify-center lg:justify-start text-sm sm:text-base">
                  <div className="w-6 h-6 sm:w-8 sm:h-8 bg-dubai-blue-500 rounded-full flex items-center justify-center mr-3 sm:mr-4">
                    <Star className="w-3 h-3 sm:w-5 sm:h-5 text-white" />
                  </div>
                  <span className="text-white font-medium">Loyalty Member Level 2 Status</span>
                </div>
                <div className="flex items-center justify-center lg:justify-start text-sm sm:text-base">
                  <div className="w-6 h-6 sm:w-8 sm:h-8 bg-purple-500 rounded-full flex items-center justify-center mr-3 sm:mr-4">
                    <Target className="w-3 h-3 sm:w-5 sm:h-5 text-white" />
                  </div>
                  <span className="text-white font-medium">1000 Loyalty Points + Lifetime Benefits</span>
                </div>
              </div>

              {/* CTA Button */}
              <Button
                onClick={() => handleOrderNow('starter-kit')}
                disabled={isOrderLoading === 'starter-kit'}
                className="w-full lg:w-auto bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-black px-6 sm:px-12 py-3 sm:py-4 text-lg sm:text-xl md:text-2xl font-bold rounded-xl shadow-2xl transform hover:scale-105 transition-all disabled:opacity-70"
                data-testid="button-join-planet-heroes"
              >
                {isOrderLoading === 'starter-kit' ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 sm:h-6 sm:w-6 border-b-2 border-current mr-2 sm:mr-3"></div>
                    PROCESSING...
                  </>
                ) : (
                  <>
                    <Rocket className="mr-2 sm:mr-3 w-5 h-5 sm:w-6 sm:h-6" />
                    JOIN LOYALTY - AED 99
                  </>
                )}
              </Button>
              
              <p className="text-amber-300 font-bold text-sm sm:text-base">
                🔥 Limited Time: FREE Installation Worth AED 299! 🔥
              </p>
            </div>

            {/* Right: Shower Filter Showcase - Simplified */}
            <div className="bg-gradient-to-br from-blue-500/20 to-purple-500/20 backdrop-blur-sm rounded-2xl sm:rounded-3xl p-4 sm:p-6 md:p-8 border border-blue-500/30">
              <div className="text-center mb-4 sm:mb-6">
                <div className="text-xl sm:text-2xl md:text-3xl font-bold text-white mb-2">💝 FREE GIFT</div>
                <div className="text-amber-400 text-base sm:text-lg md:text-xl font-bold">"LOVE IS IN THE HAIR"</div>
              </div>
              
              <div className="bg-white/10 backdrop-blur-sm rounded-xl sm:rounded-2xl p-4 sm:p-6 border border-white/20 mb-4 sm:mb-6">
                <div className="text-center">
                  <div className="text-lg sm:text-xl md:text-2xl font-bold text-white mb-2 sm:mb-3">Beauty Ionic Filter</div>
                  <div className="text-sm sm:text-base md:text-lg text-blue-300 mb-3 sm:mb-4">For Hair & Skincare</div>
                  <div className="grid grid-cols-2 gap-2 sm:gap-4 text-xs sm:text-sm text-gray-300">
                    <div>✨ 4-Level Filter</div>
                    <div>💧 Removes Chlorine</div>
                    <div>🌟 Softer Hair</div>
                    <div>💎 Healthier Skin</div>
                  </div>
                </div>
              </div>
              
              <div className="text-center">
                <div className="text-gray-400 line-through text-sm sm:text-base md:text-lg mb-1">AED 399</div>
                <div className="text-xl sm:text-2xl md:text-3xl font-bold text-hero-green-500 mb-2">FREE!</div>
                <div className="text-amber-400 font-bold text-sm sm:text-base">AED 99</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Product Features - Simplified Grid */}
      <section className="py-8 sm:py-12 px-3 sm:px-4 bg-gradient-to-br from-blue-950/40 to-slate-900/60 backdrop-blur-sm">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-6 sm:mb-8 bg-slate-800/60 backdrop-blur-sm rounded-xl sm:rounded-2xl p-4 sm:p-6 md:p-8 border border-slate-700/50">
            <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-white mb-2 sm:mb-4 drop-shadow-md">Why 12,000+ Dubai Families Choose AquaCafe</h2>
            <p className="text-gray-200 text-sm sm:text-base md:text-lg leading-relaxed">Premium filtration for Dubai's water challenges</p>
          </div>
          
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 md:gap-6">
            {productFeatures.map((feature, index) => (
              <ProductFeature key={index} {...feature} />
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Plans - Mobile Optimized */}
      <section className="py-8 sm:py-12 px-3 sm:px-4 bg-gradient-to-br from-amber-950/20 to-slate-900/80 backdrop-blur-sm">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-6 sm:mb-8 bg-slate-800/70 backdrop-blur-sm rounded-xl sm:rounded-2xl p-4 sm:p-6 md:p-8 border border-amber-500/30">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-2 sm:mb-4 drop-shadow-md">
              🏆 CHOOSE YOUR PACKAGE
            </h2>
            <p className="text-gray-100 text-sm sm:text-base md:text-lg leading-relaxed">
              Perfect AquaCafe package for your family
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-4 sm:gap-6 md:gap-8 mb-8 sm:mb-12">
            {plans.map((plan) => {
              const finalPrice = plan.price;
              const totalSavings = plan.originalPrice - plan.price;
              
              return (
                <Card 
                  key={plan.id} 
                  className={`relative bg-gradient-to-br from-slate-800/90 to-slate-900/95 backdrop-blur-sm border-slate-600/70 overflow-hidden shadow-xl ${
                    plan.popular ? 'border-amber-500/50 scale-105 ring-2 ring-amber-500/30' : ''
                  }`}
                  data-testid={`plan-${plan.id}`}
                >
                  {plan.popular && (
                    <div className="absolute top-0 left-0 right-0 bg-gradient-to-r from-amber-500 to-orange-500 text-black text-center py-2 font-bold text-xs sm:text-sm">
                      {plan.badge}
                    </div>
                  )}
                  
                  <CardContent className="p-4 sm:p-6 md:p-8 pt-8 sm:pt-12">
                    {!plan.popular && (
                      <div className="text-center mb-3 sm:mb-4">
                        <span className="bg-slate-700 text-gray-300 px-2 sm:px-3 py-1 rounded-full text-xs font-bold">
                          {plan.badge}
                        </span>
                      </div>
                    )}
                    
                    <div className="text-center mb-4 sm:mb-6">
                      <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-white mb-1 sm:mb-2">{plan.name}</h3>
                      <p className="text-xs sm:text-sm text-gray-400 mb-2 sm:mb-4">{plan.subtitle}</p>
                      
                      <div className="mb-3 sm:mb-4">
                        <div className="text-gray-400 line-through text-sm sm:text-base md:text-lg mb-1">
                          AED {plan.originalPrice.toLocaleString()}
                        </div>
                        {plan.isHeroEntry ? (
                          <>
                            <div className="text-3xl sm:text-4xl md:text-6xl font-bold text-amber-500 mb-2">
                              AED {plan.price}
                            </div>
                            <div className="text-xs sm:text-sm text-amber-500 font-bold">
                              SAVE AED {totalSavings.toLocaleString()}+
                            </div>
                          </>
                        ) : (
                          <>
                            <div className="text-2xl sm:text-3xl font-bold text-white mb-2">
                              AED {plan.price.toLocaleString()}
                            </div>
                            <div className="text-xs sm:text-sm text-amber-500 font-bold">
                              Save AED {totalSavings.toLocaleString()}
                            </div>
                          </>
                        )}
                      </div>
                    </div>
                    
                    <div className="space-y-2 sm:space-y-3 mb-6 sm:mb-8">
                      {plan.features.map((feature, index) => (
                        <div key={index} className="flex items-start text-xs sm:text-sm text-gray-300">
                          <CheckCircle className="w-3 h-3 sm:w-4 sm:h-4 text-hero-green-500 mr-2 sm:mr-3 flex-shrink-0 mt-0.5" />
                          <span className="leading-relaxed">{feature}</span>
                        </div>
                      ))}
                    </div>
                    
                    <Button
                      onClick={() => handleOrderNow(plan.id)}
                      disabled={isOrderLoading === plan.id}
                      className={`w-full py-3 sm:py-4 font-bold text-sm sm:text-base md:text-lg rounded-xl transition-all transform hover:scale-105 ${
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
                          <div className="animate-spin rounded-full h-4 w-4 sm:h-5 sm:w-5 border-b-2 border-current mr-2"></div>
                          PROCESSING...
                        </>
                      ) : plan.isHeroEntry ? (
                        <>
                          <Rocket className="mr-2 w-4 h-4 sm:w-5 sm:h-5" />
                          🚀 JOIN NOW!
                        </>
                      ) : (
                        <>
                          <ShoppingCart className="mr-2 w-4 h-4 sm:w-5 sm:h-5" />
                          ORDER NOW
                        </>
                      )}
                    </Button>
                  </CardContent>
                </Card>
              );
            })}
          </div>
          
          {/* Guarantee - Compact */}
          <div className="text-center">
            <div className="glass rounded-xl p-4 sm:p-6 border border-slate-600 inline-block">
              <Shield className="w-8 h-8 sm:w-12 sm:h-12 text-hero-green-500 mx-auto mb-3 sm:mb-4" />
              <h3 className="text-lg sm:text-xl font-bold text-white mb-2">30-Day Guarantee</h3>
              <p className="text-gray-300 text-sm sm:text-base">
                Full refund + keep your Planet Hero points
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA - Streamlined */}
      <section className="py-8 sm:py-12 px-3 sm:px-4 bg-gradient-to-br from-orange-950/30 to-slate-900/90 backdrop-blur-sm border-t border-slate-700/50">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-4 sm:mb-6">
            🚀 JOIN 12,000+ HEROES TODAY
          </h2>
          
          <div className="grid grid-cols-3 gap-4 sm:gap-6 mb-6 sm:mb-8">
            <div className="text-center p-3 sm:p-4">
              <div className="text-xl sm:text-2xl md:text-3xl font-bold text-hero-green-500 mb-1 sm:mb-2">99.9%</div>
              <div className="text-gray-300 text-xs sm:text-sm">Filtration</div>
            </div>
            <div className="text-center p-3 sm:p-4">
              <div className="text-xl sm:text-2xl md:text-3xl font-bold text-blue-400 mb-1 sm:mb-2">5 Year</div>
              <div className="text-gray-300 text-xs sm:text-sm">Warranty</div>
            </div>
            <div className="text-center p-3 sm:p-4">
              <div className="text-xl sm:text-2xl md:text-3xl font-bold text-amber-500 mb-1 sm:mb-2">24/7</div>
              <div className="text-gray-300 text-xs sm:text-sm">Support</div>
            </div>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
            <a 
              href="https://www.deliwer.com/products/aquacafe"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-black px-8 sm:px-12 py-3 sm:py-4 rounded-xl font-bold text-lg sm:text-xl transform hover:scale-105 transition-all"
              data-testid="button-order-hero"
            >
              <Target className="mr-2 w-5 h-5 sm:w-6 sm:h-6" />
              ORDER - AED 99
            </a>
            <a 
              href="https://wa.me/971523946311"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center border-2 border-hero-green-500 text-hero-green-500 hover:bg-hero-green-500 hover:text-white px-8 sm:px-12 py-3 sm:py-4 rounded-xl font-bold text-lg sm:text-xl transition-all"
              data-testid="button-chat-hero"
            >
              💬 CHAT SUPPORT
            </a>
          </div>
          
          <p className="text-gray-400 text-xs sm:text-sm mt-4 sm:mt-6">
            🔒 Secure • 🚚 Free Delivery • 🌍 Carbon Neutral
          </p>
        </div>
      </section>
    </div>
  );
}