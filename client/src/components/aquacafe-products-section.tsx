import { ShoppingCart, Star, CheckCircle, Droplets, Zap, Shield, Award } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const products = [
  {
    id: "aquacafe-starter",
    name: "AquaCafe Starter Kit",
    price: "AED 99",
    originalPrice: "AED 399",
    rating: 4.8,
    reviews: 247,
    description: "Loyalty member exclusive - Essential water filtration starter kit",
    features: ["5-Stage Filtration", "2L/min Flow Rate", "6-Month Filter Life", "FREE Installation (Loyalty Perk)"],
    badge: "Loyalty Exclusive",
    badgeColor: "bg-amber-500",
    shopifyUrl: "https://www.deliwer.com/products/aquacafe-starter"
  },
  {
    id: "aquacafe-pro", 
    name: "AquaCafe Pro",
    price: "AED 299",
    originalPrice: "AED 499",
    rating: 4.9,
    reviews: 156,
    description: "Advanced filtration with smart monitoring",
    features: ["7-Stage Filtration", "Smart IoT Monitoring", "UV Sterilization", "1-Year Warranty"],
    badge: "Premium",
    badgeColor: "bg-blue-500",
    shopifyUrl: "https://www.deliwer.com/products/aquacafe-pro"
  },
  {
    id: "aquacafe-hero",
    name: "AquaCafe Hero Edition",
    price: "AED 599", 
    originalPrice: "AED 899",
    rating: 5.0,
    reviews: 89,
    description: "Ultimate eco-warrior water system",
    features: ["9-Stage Filtration", "Alkaline Enhancement", "Mineral Restoration", "5-Year Warranty"],
    badge: "Hero Edition", 
    badgeColor: "bg-hero-green-500",
    shopifyUrl: "https://www.deliwer.com/products/aquacafe-hero"
  },
  {
    id: "aquacafe-commercial",
    name: "AquaCafe Commercial",
    price: "AED 1,299",
    originalPrice: "AED 1,899", 
    rating: 4.9,
    reviews: 45,
    description: "High-capacity system for businesses",
    features: ["Industrial Grade", "500L/day Capacity", "Real-time Monitoring", "24/7 Support"],
    badge: "Commercial",
    badgeColor: "bg-purple-500",
    shopifyUrl: "https://www.deliwer.com/products/aquacafe-commercial"
  }
];

export function AquaCafeProductsSection() {
  return (
    <section className="py-16 px-4 bg-gradient-to-br from-slate-800/80 to-slate-900/90 backdrop-blur-sm" data-testid="aquacafe-products">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center bg-hero-green-500/20 border border-hero-green-500/50 rounded-full px-6 py-3 mb-6">
            <Droplets className="w-5 h-5 text-hero-green-500 mr-2" />
            <span className="text-hero-green-500 font-bold">PREMIUM AQUACAFE PRODUCTS</span>
          </div>
          
          <h2 className="text-4xl font-bold text-white mb-4 drop-shadow-md">
            Choose Your Perfect Water System
          </h2>
          <p className="text-gray-200 text-lg leading-relaxed max-w-3xl mx-auto">
            From essential home filtration to premium commercial systems - find the perfect AquaCafe solution for your needs
          </p>
        </div>

        {/* Products Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {products.map((product) => (
            <Card 
              key={product.id} 
              className="bg-gradient-to-br from-slate-800/90 to-slate-900/95 backdrop-blur-sm border-slate-600/70 group hover:border-hero-green-500/50 transition-all duration-300 shadow-xl"
              data-testid={`product-${product.id}`}
            >
              <CardContent className="p-0 overflow-hidden rounded-lg">
                {/* Product Image */}
                <div className="relative h-48 bg-gradient-to-br from-slate-700/30 to-slate-800/50 flex items-center justify-center">
                  <div className="w-20 h-20 bg-hero-green-500/20 rounded-full flex items-center justify-center">
                    <Droplets className="w-10 h-10 text-hero-green-500" />
                  </div>
                  
                  {product.badge && (
                    <Badge className={`absolute top-3 left-3 ${product.badgeColor} text-white border-0 font-bold`}>
                      {product.badge}
                    </Badge>
                  )}
                  
                  <div className="absolute top-3 right-3 flex items-center space-x-1">
                    <Star className="w-4 h-4 text-amber-500 fill-current" />
                    <span className="text-sm text-white font-medium">{product.rating}</span>
                  </div>
                </div>

                {/* Product Info */}
                <div className="p-6">
                  <h3 className="text-lg font-bold text-white mb-2 group-hover:text-hero-green-500 transition-colors">
                    {product.name}
                  </h3>
                  
                  <p className="text-sm text-gray-400 mb-3">
                    {product.description}
                  </p>

                  {/* Features */}
                  <ul className="space-y-1 mb-4">
                    {product.features.slice(0, 2).map((feature, index) => (
                      <li key={index} className="flex items-center text-xs text-gray-300">
                        <CheckCircle className="w-3 h-3 text-hero-green-500 mr-2 flex-shrink-0" />
                        {feature}
                      </li>
                    ))}
                  </ul>

                  {/* Price */}
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <span className="text-2xl font-bold text-white">{product.price}</span>
                      {product.originalPrice && (
                        <span className="text-sm text-gray-500 line-through ml-2">{product.originalPrice}</span>
                      )}
                    </div>
                    <div className="text-xs text-gray-400">
                      {product.reviews} reviews
                    </div>
                  </div>

                  {/* CTA Button with GOAFFPRO Tracking */}
                  <button
                    onClick={() => {
                      const affiliateLink = `${product.shopifyUrl}?ref=AQUA${Math.random().toString(36).substr(2, 4).toUpperCase()}`;
                      const shareText = `💧 Check out this amazing ${product.name} - ${product.description}! Get yours with FREE Bakers Kitchen AED100 Kangen Water voucher when you refer friends! ${affiliateLink}`;
                      
                      if (navigator.share) {
                        navigator.share({ title: `${product.name} - DeliWer AquaCafe`, text: shareText, url: affiliateLink });
                      } else {
                        window.open(affiliateLink, '_blank');
                      }
                    }}
                    className="w-full bg-gradient-to-r from-hero-green-500 to-dubai-blue-500 hover:from-hero-green-600 hover:to-dubai-blue-600 text-white py-3 rounded-lg font-medium transition-all inline-flex items-center justify-center group"
                  >
                    <ShoppingCart className="w-4 h-4 mr-2" />
                    Order & Share
                  </button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Additional Products CTA */}
        <div className="text-center">
          <div className="bg-gradient-to-r from-slate-800/60 to-slate-700/70 backdrop-blur-sm rounded-2xl p-8 border border-slate-600/50">
            <h3 className="text-2xl font-bold text-white mb-4">Need Something Different?</h3>
            <p className="text-gray-300 mb-6 max-w-2xl mx-auto">
              Explore our full range of premium water products, iPhone trade-ins, and sustainable solutions
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="/products?utm_source=aquacafe&utm_medium=cta&utm_campaign=ambassador"
                className="inline-flex items-center justify-center bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white px-8 py-3 rounded-xl font-bold transition-all"
              >
                <Shield className="w-5 h-5 mr-2" />
                View All Products
              </a>
              <button
                onClick={() => {
                  const affiliateLink = `https://wa.me/971523946311?text=Hi! I'm interested in AquaCafe products and the Bakers Kitchen AED100 Kangen Water voucher offer. Can you help me choose the right system?`;
                  const shareText = `💧 Need expert advice on water systems? Chat with DeliWer experts and get FREE Bakers Kitchen AED100 Kangen Water voucher! ${affiliateLink}`;
                  
                  if (navigator.share) {
                    navigator.share({ title: 'Get AquaCafe Expert Advice', text: shareText, url: affiliateLink });
                  } else {
                    window.open(affiliateLink, '_blank');
                  }
                }}
                className="inline-flex items-center justify-center border-2 border-hero-green-500 text-hero-green-500 hover:bg-hero-green-500 hover:text-white px-8 py-3 rounded-xl font-bold transition-all"
              >
                <Award className="w-5 h-5 mr-2" />
                Share & Get Advice
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}