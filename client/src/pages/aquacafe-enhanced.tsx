import { useState, useEffect } from "react";
import { Helmet } from "react-helmet";
import { useToast } from "@/hooks/use-toast";
import { Droplets, Filter, Zap, Shield, TrendingUp, Star } from "lucide-react";
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
      badge: "🚀 PLANET HERO GATEWAY",
      specs: {
        stages: "3-Stage",
        tdsReduction: "85%",
        flowRate: "2L/min",
        warranty: "1 Year"
      },
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
      ]
    },
    {
      id: "hero-premium",
      name: "AquaCafe Hero Premium",
      price: 1499,
      originalPrice: 1999,
      image: waterFilter2,
      badge: "⚡ MOST POPULAR",
      popular: true,
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
        "2500 starter points + 2X multiplier",
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
      badge: "🏆 ULTIMATE HERO",
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
        "5000 starter points + 3X multiplier",
        "24/7 VIP concierge support",
        "AI-powered smart home integration",
        "Elite Hero platinum badges",
        "Free annual maintenance & upgrades",
        "Carbon footprint certificate"
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
        <title>Buy Water Filter in Dubai | AquaCafe by DeliWer</title>
        <meta 
          name="description" 
          content="Order 5-stage water purifiers with installation in Dubai. AquaCafe by DeliWer offers eco-friendly filtered water systems with fast delivery. Free installation across Dubai areas." 
        />
        <meta name="keywords" content="water filter Dubai, buy water purifier UAE, AquaCafe water filter Dubai, water filtration Dubai, home water filter Dubai" />
        
        <meta property="og:title" content="Buy Water Filter in Dubai | AquaCafe by DeliWer" />
        <meta property="og:description" content="Order premium water purifiers with free installation across Dubai. Eco-friendly 5-stage filtration systems from AED 1,299." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://deliwer.com/aquacafe" />
        
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Buy Water Filter in Dubai | AquaCafe" />
        <meta name="twitter:description" content="Premium water filtration systems with free Dubai installation" />

        <script type="application/ld+json">
          {JSON.stringify(productJsonLd)}
        </script>
      </Helmet>

      <div className="min-h-screen bg-white dark:bg-gray-900">
        {/* Hero Section */}
        <section className="relative bg-gradient-to-br from-blue-600 via-cyan-600 to-teal-600 text-white py-20 px-4">
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-0 left-0 w-96 h-96 bg-white rounded-full blur-3xl animate-pulse"></div>
            <div className="absolute bottom-0 right-0 w-96 h-96 bg-cyan-300 rounded-full blur-3xl animate-pulse"></div>
          </div>

          <div className="container mx-auto max-w-6xl relative z-10 text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Premium Water Filters for Dubai Homes
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-cyan-50">
              Buy & Install in 24 Hours • Free Installation • 1-Year Warranty
            </p>
            <div className="flex flex-wrap justify-center gap-4 mb-6">
              <div className="bg-white/20 backdrop-blur-sm px-6 py-3 rounded-full">
                <span className="font-bold">✓ 85-99% TDS Reduction</span>
              </div>
              <div className="bg-white/20 backdrop-blur-sm px-6 py-3 rounded-full">
                <span className="font-bold">✓ Free Dubai Installation</span>
              </div>
              <div className="bg-white/20 backdrop-blur-sm px-6 py-3 rounded-full">
                <span className="font-bold">✓ Eco Rewards Points</span>
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
              Shop Water Filters Now
            </Button>
          </div>
        </section>

        {/* Products Section */}
        <section id="products" className="py-16 px-4 bg-gray-50 dark:bg-gray-800">
          <div className="container mx-auto max-w-7xl">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">
              Choose Your AquaCafe Water Filter
            </h2>
            <p className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto">
              All systems include free professional installation across Dubai and comprehensive warranty
            </p>

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
                  
                  <div className="relative h-64 overflow-hidden">
                    <img 
                      src={product.image} 
                      alt={`${product.name} - Water filter system`}
                      className="w-full h-full object-cover"
                      loading="lazy"
                    />
                    <div className="absolute top-4 left-4">
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
                        Save AED {(product.originalPrice - product.price).toFixed(2)}
                      </p>
                    </div>

                    {/* CTA Button */}
                    <Button 
                      className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-6"
                      onClick={() => handleBuyNow(product)}
                      data-testid={`button-buy-${product.id}`}
                    >
                      Buy & Install in Dubai
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
            <p className="text-xl mb-8">
              Join thousands of Dubai families enjoying premium filtered water
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
              Order Your Water Filter Now
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
