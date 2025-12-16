import { useState, useEffect } from "react";
import { Helmet } from "react-helmet";
import { useToast } from "@/hooks/use-toast";
import { Droplets, Filter, Zap, Shield, TrendingUp, Star, Heart, Users, Sparkles, Gift } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { AquaCafeCheckoutModal } from "@/components/aquacafe-checkout-modal";
import { AquaCafeServiceHighlights } from "@/components/aquacafe-service-highlights";
import { AquaCafeTestimonials } from "@/components/aquacafe-testimonials";
import { AquaCafeComparisonTable } from "@/components/aquacafe-comparison-table";

import waterFilter1 from "@assets/stock_images/modern_water_filtrat_b0dbec4a.jpg";
import waterFilter2 from "@assets/stock_images/5-stage_water_purifi_ca3daeaf.jpg";
import waterFilter3 from "@assets/stock_images/5-stage_water_purifi_b2e38594.jpg";
import cleanWater1 from "@assets/stock_images/clean_water_sustaina_50892fbd.jpg";
import cleanWater2 from "@assets/stock_images/clean_water_sustaina_b2e8ad83.jpg";
import beautyWater1 from "@assets/Beauty_Water_1_1756065010937.jpg";
import beautyWater2 from "@assets/Beauty_Water_2_1756065010940.jpg";
import showerFilterCollage from "@assets/collage_1755270492135.jpg";

interface Product {
  id: string;
  name: string;
  price: number;
  originalPrice: number;
  image: string;
  badge: string;
  popular?: boolean;
  specs: {
    stages: string;
    tdsReduction: string;
    flowRate: string;
    warranty: string;
  };
  features: string[];
  picsEarned: number;
}

export default function AquaCafeEnhanced() {
  const [checkoutModal, setCheckoutModal] = useState<{ isOpen: boolean; product: Product | null }>({
    isOpen: false,
    product: null
  });
  const { toast } = useToast();

  const products: Product[] = [
    {
      id: "hero-minimal",
      name: "AquaCafe Hero Minimal - PLANET HERO ENTRY",
      price: 1299,
      originalPrice: 1599,
      image: waterFilter1,
      badge: "PLANET HERO GATEWAY",
      picsEarned: 1000,
      specs: {
        stages: "3-Stage",
        tdsReduction: "85%",
        flowRate: "2L/min",
        warranty: "1 Year"
      },
      features: [
        "Premium 3-stage filtration system",
        "12-month filter supply included",
        "Instant Planet Hero Level 2 status",
        "1000 starter DXBs + 2X multiplier",
        "24/7 priority support",
        "Smart monitoring app",
        "Exclusive Hero member badge",
        "20% discount on ALL future plans"
      ]
    },
    {
      id: "hero-premium",
      name: "AquaCafe Hero Premium",
      price: 1499,
      originalPrice: 1999,
      image: waterFilter2,
      badge: "MOST POPULAR",
      popular: true,
      picsEarned: 2500,
      specs: {
        stages: "5-Stage",
        tdsReduction: "95%",
        flowRate: "3L/min",
        warranty: "1 Year"
      },
      features: [
        "Advanced 5-stage filtration",
        "18-month filter supply",
        "Planet Hero Level 3 status",
        "2500 starter DXBs + 2X multiplier",
        "24/7 priority phone support",
        "Smart water quality monitoring",
        "Exclusive Hero premium badge",
        "Free home installation"
      ]
    },
    {
      id: "hero-elite",
      name: "AquaCafe Hero Elite",
      price: 2299,
      originalPrice: 2999,
      image: waterFilter3,
      badge: "ULTIMATE HERO",
      picsEarned: 5000,
      specs: {
        stages: "7-Stage",
        tdsReduction: "99%",
        flowRate: "4L/min",
        warranty: "1 Year"
      },
      features: [
        "Ultimate 7-stage whole-home system",
        "36-month filter supply",
        "Planet Hero Level 4 Elite status",
        "5000 starter DXBs + 3X multiplier",
        "24/7 VIP concierge support",
        "AI-powered smart home integration",
        "Elite Hero platinum badges",
        "Free annual maintenance & upgrades"
      ]
    }
  ];

  const handleBuyNow = (product: Product) => {
    setCheckoutModal({ isOpen: true, product });
    toast({
      title: "Opening Checkout",
      description: `Proceeding with ${product.name}`,
    });
  };

  const productJsonLd = products.map(product => {
    const imageUrl = product.image.startsWith('http') 
      ? product.image 
      : `${window.location.origin}${product.image}`;
    
    return {
      "@context": "https://schema.org",
      "@type": "Product",
      "name": product.name,
      "image": imageUrl,
      "description": `${product.specs.stages} water filter with ${product.specs.tdsReduction} TDS reduction and ${product.specs.flowRate} flow rate. Includes ${product.specs.warranty} warranty and free installation in Dubai.`,
      "brand": {
        "@type": "Brand",
        "name": "AquaCafe by DeliWer"
      },
      "offers": {
        "@type": "Offer",
        "url": `${window.location.origin}/aquacafe#${product.id}`,
        "priceCurrency": "AED",
        "price": product.price,
        "priceValidUntil": "2025-12-31",
        "availability": "https://schema.org/InStock",
        "seller": {
          "@type": "Organization",
          "name": "DeliWer"
        }
      },
      "aggregateRating": {
        "@type": "AggregateRating",
        "ratingValue": "4.9",
        "reviewCount": "127"
      }
    };
  });

  return (
    <>
      <Helmet>
        <title>Buy Water Filter in Dubai | AquaCafe Lifestyle Marketplace</title>
        <meta 
          name="description" 
          content="Premium water filtration systems for healthy living in Dubai. Order 5-stage purifiers with installation, earn Dubai Carbon Tokens (DXBs), and join the sustainability movement. Free installation across Dubai." 
        />
        <meta name="keywords" content="water filter Dubai, buy water purifier UAE, AquaCafe water filter Dubai, water filtration Dubai, home water filter Dubai, healthy living, wellness Dubai" />
        
        <meta property="og:title" content="Buy Water Filter in Dubai | AquaCafe Lifestyle Marketplace" />
        <meta property="og:description" content="Premium water filtration for healthy living. Order with free installation, earn DXBs, support sustainability." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://deliwer.com/aquacafe" />
        
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Buy Water Filter in Dubai | AquaCafe" />
        <meta name="twitter:description" content="Premium water filtration systems with free Dubai installation + earn DXBs" />

        <script type="application/ld+json">
          {JSON.stringify(productJsonLd)}
        </script>
      </Helmet>

      <div className="min-h-screen bg-white dark:bg-gray-900">
        {/* Lifestyle Hero Section */}
        <section className="relative bg-gradient-to-br from-cyan-500 via-blue-600 to-teal-600 text-white py-20 px-4 overflow-hidden">
          <div className="absolute inset-0">
            <img 
              src={cleanWater1} 
              alt="Clean Water Lifestyle" 
              className="w-full h-full object-cover opacity-20"
            />
            <div className="absolute inset-0 bg-gradient-to-br from-cyan-600/90 via-blue-700/90 to-teal-700/90"></div>
          </div>

          <div className="container mx-auto max-w-6xl relative z-10 text-center">
            <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm px-6 py-3 rounded-full mb-6 border border-white/30">
              <Sparkles className="w-5 h-5" />
              <span className="font-bold">AQUACAFE LIFESTYLE MARKETPLACE</span>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Premium Water for<br />Healthy Living in Dubai
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-cyan-50">
              Transform your home with clean water • Earn Dubai Carbon Tokens • Support sustainability
            </p>
            <div className="flex flex-wrap justify-center gap-4 mb-6">
              <div className="bg-white/20 backdrop-blur-sm px-6 py-3 rounded-full">
                <span className="font-bold">✓ Earn up to 5,000 DXBs</span>
              </div>
              <div className="bg-white/20 backdrop-blur-sm px-6 py-3 rounded-full">
                <span className="font-bold">✓ Free Installation</span>
              </div>
              <div className="bg-white/20 backdrop-blur-sm px-6 py-3 rounded-full">
                <span className="font-bold">✓ 1-Year Warranty</span>
              </div>
            </div>
            <Button 
              size="lg" 
              className="bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-bold text-lg px-8 py-6"
              onClick={() => {
                const productsSection = document.getElementById('products');
                productsSection?.scrollIntoView({ behavior: 'smooth' });
              }}
              data-testid="button-hero-shop-now"
            >
              <Gift className="w-5 h-5 mr-2" />
              Shop & Earn DXBs Now
            </Button>
          </div>
        </section>

        {/* Lifestyle Benefits Section */}
        <section className="py-16 px-4 bg-gradient-to-br from-emerald-50 to-cyan-50">
          <div className="container mx-auto max-w-7xl">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
                Water Filtration That Transforms Your Lifestyle
              </h2>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                Premium filtration systems that enhance health, beauty, and wellness while earning you rewards for sustainable choices.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8 mb-12">
              {/* Health & Wellness */}
              <Card className="overflow-hidden hover:shadow-xl transition-all">
                <div className="relative h-64">
                  <img 
                    src={cleanWater2} 
                    alt="Health & Wellness" 
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end p-6">
                    <h3 className="text-white font-bold text-2xl">Health & Wellness</h3>
                  </div>
                </div>
                <CardContent className="p-6">
                  <ul className="space-y-3 text-gray-700">
                    <li className="flex items-start gap-2">
                      <Heart className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
                      <span>99% removal of contaminants</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Heart className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
                      <span>Enhanced mineral balance</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Heart className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
                      <span>Better hydration for active lifestyles</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>

              {/* Beauty & Skincare */}
              <Card className="overflow-hidden hover:shadow-xl transition-all">
                <div className="relative h-64">
                  <img 
                    src={beautyWater1} 
                    alt="Beauty & Skincare" 
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end p-6">
                    <h3 className="text-white font-bold text-2xl">Beauty & Skincare</h3>
                  </div>
                </div>
                <CardContent className="p-6">
                  <ul className="space-y-3 text-gray-700">
                    <li className="flex items-start gap-2">
                      <Sparkles className="w-5 h-5 text-pink-500 flex-shrink-0 mt-0.5" />
                      <span>Softer, healthier skin & hair</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Sparkles className="w-5 h-5 text-pink-500 flex-shrink-0 mt-0.5" />
                      <span>Chlorine-free shower experience</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Sparkles className="w-5 h-5 text-pink-500 flex-shrink-0 mt-0.5" />
                      <span>pH-balanced beauty water</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>

              {/* Family Wellness */}
              <Card className="overflow-hidden hover:shadow-xl transition-all">
                <div className="relative h-64">
                  <img 
                    src={beautyWater2} 
                    alt="Family Wellness" 
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end p-6">
                    <h3 className="text-white font-bold text-2xl">Family Wellness</h3>
                  </div>
                </div>
                <CardContent className="p-6">
                  <ul className="space-y-3 text-gray-700">
                    <li className="flex items-start gap-2">
                      <Users className="w-5 h-5 text-blue-500 flex-shrink-0 mt-0.5" />
                      <span>Safe water for children & elderly</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Users className="w-5 h-5 text-blue-500 flex-shrink-0 mt-0.5" />
                      <span>Peace of mind for families</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Users className="w-5 h-5 text-blue-500 flex-shrink-0 mt-0.5" />
                      <span>Whole-home protection</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Products Section with DXB Earning */}
        <section id="products" className="py-16 px-4 bg-gray-50 dark:bg-gray-800">
          <div className="container mx-auto max-w-7xl">
            <div className="text-center mb-12">
              <div className="inline-flex items-center gap-2 bg-emerald-500/20 text-emerald-700 px-6 py-3 rounded-full mb-6 border border-emerald-500/30">
                <Gift className="w-5 h-5" />
                <span className="font-bold">EARN PLANET IMPACT CREDITS (DXBs)</span>
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">
                Choose Your Water Filter & Start Earning
              </h2>
              <p className="text-center text-muted-foreground mb-4 max-w-3xl mx-auto text-lg">
                All systems include free professional installation across Dubai, comprehensive warranty, 
                <strong className="text-emerald-600"> and instant Dubai Carbon Tokens (DXBs)</strong> to use toward future purchases or redeem for rewards.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {products.map((product) => (
                <Card 
                  key={product.id} 
                  className={`relative overflow-hidden transition-all hover:shadow-2xl ${
                    product.popular ? 'border-4 border-blue-500 shadow-xl scale-105' : 'border-2'
                  }`}
                  data-testid={`card-product-${product.id}`}
                >
                  {product.popular && (
                    <div className="absolute top-4 right-4 z-10">
                      <Badge className="bg-amber-500 text-white px-3 py-1 text-sm font-bold">
                        MOST POPULAR
                      </Badge>
                    </div>
                  )}
                  
                  {/* DXB Earning Badge */}
                  <div className="absolute top-4 left-4 z-10">
                    <Badge className="bg-gradient-to-r from-emerald-600 to-green-600 text-white px-4 py-2 text-sm font-bold shadow-lg">
                      <Gift className="w-4 h-4 mr-1" />
                      Earn {product.picsEarned.toLocaleString()} DXBs
                    </Badge>
                  </div>
                  
                  <div className="relative h-64 overflow-hidden mt-12">
                    <img 
                      src={product.image} 
                      alt={`${product.name} - Water filter system`}
                      className="w-full h-full object-cover"
                      loading="lazy"
                    />
                    <div className="absolute bottom-4 left-4">
                      <Badge className="bg-blue-600 text-white px-3 py-1">
                        {product.badge}
                      </Badge>
                    </div>
                  </div>

                  <CardContent className="p-6">
                    <h3 className="font-bold text-xl mb-3 line-clamp-2" data-testid={`text-product-name-${product.id}`}>
                      {product.name}
                    </h3>

                    {/* Specifications Grid */}
                    <div className="grid grid-cols-2 gap-3 mb-4 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                      <div className="flex items-center gap-2">
                        <Filter className="w-4 h-4 text-blue-600" />
                        <div>
                          <p className="text-xs text-muted-foreground">Filtration</p>
                          <p className="font-semibold text-sm">{product.specs.stages}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <TrendingUp className="w-4 h-4 text-green-600" />
                        <div>
                          <p className="text-xs text-muted-foreground">TDS Reduction</p>
                          <p className="font-semibold text-sm">{product.specs.tdsReduction}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Droplets className="w-4 h-4 text-cyan-600" />
                        <div>
                          <p className="text-xs text-muted-foreground">Flow Rate</p>
                          <p className="font-semibold text-sm">{product.specs.flowRate}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Shield className="w-4 h-4 text-purple-600" />
                        <div>
                          <p className="text-xs text-muted-foreground">Warranty</p>
                          <p className="font-semibold text-sm">{product.specs.warranty}</p>
                        </div>
                      </div>
                    </div>

                    {/* Features List */}
                    <ul className="space-y-2 mb-4 text-sm">
                      {product.features.slice(0, 4).map((feature, idx) => (
                        <li key={idx} className="flex items-start gap-2">
                          <Zap className="w-4 h-4 text-green-600 flex-shrink-0 mt-0.5" />
                          <span className="text-gray-700 dark:text-gray-300">{feature}</span>
                        </li>
                      ))}
                    </ul>

                    {/* Pricing */}
                    <div className="mb-4">
                      <div className="flex items-baseline gap-2">
                        <span className="text-3xl font-bold text-blue-600 dark:text-blue-400" data-testid={`text-price-${product.id}`}>
                          AED {product.price.toFixed(2)}
                        </span>
                        <span className="text-lg text-muted-foreground line-through">
                          AED {product.originalPrice.toFixed(2)}
                        </span>
                      </div>
                      <p className="text-sm text-green-600 dark:text-green-400 font-semibold">
                        Save AED {(product.originalPrice - product.price).toFixed(2)} + Earn {product.picsEarned} DXBs
                      </p>
                    </div>

                    {/* CTA Button */}
                    <Button 
                      className="w-full bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white font-bold py-6"
                      onClick={() => handleBuyNow(product)}
                      data-testid={`button-buy-${product.id}`}
                    >
                      <Gift className="w-5 h-5 mr-2" />
                      Buy & Earn {product.picsEarned} DXBs
                    </Button>

                    {/* Rating */}
                    <div className="flex items-center justify-center gap-2 mt-4 text-sm text-muted-foreground">
                      <div className="flex gap-1">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                        ))}
                      </div>
                      <span>4.9 (127 reviews)</span>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* DXB Explainer */}
            <div className="mt-12 bg-gradient-to-r from-emerald-900/20 to-cyan-900/20 rounded-2xl p-8 border-2 border-emerald-500/30">
              <div className="text-center">
                <h3 className="text-2xl font-bold text-gray-800 mb-4">
                  What are Dubai Carbon Tokens (DXBs)?
                </h3>
                <p className="text-lg text-gray-700 max-w-3xl mx-auto mb-6">
                  DXBs are our sustainability currency. Earn them with every purchase, use them for future orders, 
                  or redeem them for rewards like dining vouchers, iPhones, and more. 
                  <strong className="text-emerald-600"> Every DXB earned supports Dubai's circular economy and environmental initiatives.</strong>
                </p>
                <a 
                  href="/earn" 
                  className="inline-block bg-gradient-to-r from-emerald-600 to-green-600 hover:from-emerald-700 hover:to-green-700 text-white font-bold px-8 py-4 rounded-lg transition-all"
                >
                  Learn More About Earning DXBs →
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* Lifestyle Showcase - Shower Filter */}
        <section className="py-16 px-4 bg-gradient-to-br from-purple-50 to-pink-50">
          <div className="container mx-auto max-w-7xl">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <div className="inline-flex items-center gap-2 bg-pink-500/20 text-pink-700 px-6 py-3 rounded-full mb-6">
                  <Sparkles className="w-5 h-5" />
                  <span className="font-bold">BEAUTY WATER SOLUTION</span>
                </div>
                <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-6">
                  Transform Your Beauty Routine
                </h2>
                <p className="text-lg text-gray-700 mb-6">
                  Experience the difference of filtered shower water. Our ionic filtration systems remove chlorine 
                  and impurities, leaving your skin softer and hair healthier.
                </p>
                <ul className="space-y-4 mb-8">
                  <li className="flex items-start gap-3">
                    <div className="w-8 h-8 bg-pink-500/20 rounded-full flex items-center justify-center flex-shrink-0">
                      <Sparkles className="w-5 h-5 text-pink-600" />
                    </div>
                    <div>
                      <h4 className="font-bold text-gray-800">Healthier Skin & Hair</h4>
                      <p className="text-gray-600">Chlorine-free water for beauty & wellness</p>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-8 h-8 bg-cyan-500/20 rounded-full flex items-center justify-center flex-shrink-0">
                      <Droplets className="w-5 h-5 text-cyan-600" />
                    </div>
                    <div>
                      <h4 className="font-bold text-gray-800">pH Balanced Water</h4>
                      <p className="text-gray-600">Perfect for sensitive skin</p>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-8 h-8 bg-emerald-500/20 rounded-full flex items-center justify-center flex-shrink-0">
                      <Gift className="w-5 h-5 text-emerald-600" />
                    </div>
                    <div>
                      <h4 className="font-bold text-gray-800">Earn DXBs with Purchase</h4>
                      <p className="text-gray-600">Included with AquaCafe membership</p>
                    </div>
                  </li>
                </ul>
                <Button 
                  size="lg"
                  className="bg-gradient-to-r from-pink-600 to-purple-600 hover:from-pink-700 hover:to-purple-700 text-white font-bold"
                  onClick={() => {
                    const productsSection = document.getElementById('products');
                    productsSection?.scrollIntoView({ behavior: 'smooth' });
                  }}
                >
                  Shop Beauty Water Systems
                </Button>
              </div>
              <div className="rounded-2xl overflow-hidden shadow-2xl">
                <img 
                  src={showerFilterCollage} 
                  alt="Ionic Shower Filter Collection" 
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Service Highlights */}
        <AquaCafeServiceHighlights />

        {/* Comparison Table */}
        <AquaCafeComparisonTable />

        {/* Testimonials */}
        <AquaCafeTestimonials />

        {/* Final CTA */}
        <section className="py-16 bg-gradient-to-r from-blue-600 to-cyan-600 text-white text-center px-4">
          <div className="container mx-auto max-w-4xl">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Ready for Pure, Clean Water at Home?
            </h2>
            <p className="text-xl mb-4">
              Join thousands of Dubai families enjoying premium filtered water
            </p>
            <p className="text-lg mb-8 text-cyan-100">
              <strong>Plus earn Dubai Carbon Tokens (DXBs)</strong> with every purchase to support sustainability
            </p>
            <Button 
              size="lg" 
              className="bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-bold text-lg px-8 py-6"
              onClick={() => {
                const productsSection = document.getElementById('products');
                productsSection?.scrollIntoView({ behavior: 'smooth' });
              }}
              data-testid="button-final-cta"
            >
              <Gift className="w-5 h-5 mr-2" />
              Order & Start Earning DXBs Now
            </Button>
          </div>
        </section>

        {/* Checkout Modal */}
        {checkoutModal.product && (
          <AquaCafeCheckoutModal
            isOpen={checkoutModal.isOpen}
            onClose={() => setCheckoutModal({ isOpen: false, product: null })}
            product={checkoutModal.product}
          />
        )}
      </div>
    </>
  );
}
