import { useState } from "react";
import { ShoppingCart, Star, Truck, Shield, Droplets, Phone, Zap, Award, Heart, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export default function Products() {
  const [selectedCategory, setSelectedCategory] = useState("all");

  const categories = [
    { id: "all", label: "All Products", count: 15 },
    { id: "water-systems", label: "Water Systems", count: 4 },
    { id: "iphones", label: "iPhone Preowned", count: 6 },
    { id: "premium-water", label: "Premium Water", count: 3 },
    { id: "kangen", label: "Kangen Systems", count: 2 }
  ];

  const products = [
    // AquaCafe Water Systems
    {
      id: "aquacafe-basic",
      name: "AquaCafe Basic",
      category: "water-systems",
      price: "AED 99",
      originalPrice: "AED 199",
      image: "/api/placeholder/400/300",
      rating: 4.8,
      reviews: 247,
      description: "Essential water filtration for your home",
      features: ["5-Stage Filtration", "2L/min Flow Rate", "6-Month Filter Life", "Free Installation"],
      badge: "Best Seller",
      shopifyUrl: "https://www.deliwer.com/products/aquacafe-basic"
    },
    {
      id: "aquacafe-pro",
      name: "AquaCafe Pro",
      category: "water-systems",
      price: "AED 299",
      originalPrice: "AED 499",
      image: "/api/placeholder/400/300",
      rating: 4.9,
      reviews: 156,
      description: "Advanced filtration with smart monitoring",
      features: ["7-Stage Filtration", "Smart IoT Monitoring", "UV Sterilization", "1-Year Warranty"],
      badge: "Premium",
      shopifyUrl: "https://www.deliwer.com/products/aquacafe-pro"
    },
    {
      id: "aquacafe-hero",
      name: "AquaCafe Hero Edition",
      category: "water-systems",
      price: "AED 599",
      originalPrice: "AED 899",
      image: "/api/placeholder/400/300",
      rating: 5.0,
      reviews: 89,
      description: "Ultimate eco-warrior water system",
      features: ["9-Stage Filtration", "Alkaline Enhancement", "Mineral Restoration", "5-Year Warranty"],
      badge: "Hero Edition",
      shopifyUrl: "https://www.deliwer.com/products/aquacafe-hero"
    },
    {
      id: "aquacafe-commercial",
      name: "AquaCafe Commercial",
      category: "water-systems",
      price: "AED 1,299",
      originalPrice: "AED 1,899",
      image: "/api/placeholder/400/300",
      rating: 4.9,
      reviews: 45,
      description: "High-capacity system for businesses",
      features: ["Industrial Grade", "500L/day Capacity", "Real-time Monitoring", "24/7 Support"],
      badge: "Commercial",
      shopifyUrl: "https://www.deliwer.com/products/aquacafe-commercial"
    },

    // iPhone Preowned Models
    {
      id: "iphone-14-pro",
      name: "iPhone 14 Pro (Renewed)",
      category: "iphones",
      price: "AED 2,799",
      originalPrice: "AED 3,499",
      image: "/api/placeholder/400/300",
      rating: 4.7,
      reviews: 134,
      description: "Like-new iPhone 14 Pro with 1-year warranty",
      features: ["128GB Storage", "Battery Health 95%+", "Certified Authentic", "30-Day Return"],
      badge: "Certified",
      shopifyUrl: "https://www.deliwer.com/products/iphone-14-pro-renewed"
    },
    {
      id: "iphone-13",
      name: "iPhone 13 (Excellent)",
      category: "iphones",
      price: "AED 2,199",
      originalPrice: "AED 2,799",
      image: "/api/placeholder/400/300",
      rating: 4.6,
      reviews: 89,
      description: "High-quality refurbished iPhone 13",
      features: ["128GB Storage", "Battery Health 90%+", "Minor Cosmetic Wear", "6-Month Warranty"],
      badge: "Popular",
      shopifyUrl: "https://www.deliwer.com/products/iphone-13-excellent"
    },
    {
      id: "iphone-12-pro",
      name: "iPhone 12 Pro (Good)",
      category: "iphones",
      price: "AED 1,799",
      originalPrice: "AED 2,399",
      image: "/api/placeholder/400/300",
      rating: 4.5,
      reviews: 76,
      description: "Reliable iPhone 12 Pro in good condition",
      features: ["128GB Storage", "Battery Health 85%+", "Functional Perfect", "3-Month Warranty"],
      badge: "Value",
      shopifyUrl: "https://www.deliwer.com/products/iphone-12-pro-good"
    },
    {
      id: "iphone-11",
      name: "iPhone 11 (Very Good)",
      category: "iphones",
      price: "AED 1,399",
      originalPrice: "AED 1,899",
      image: "/api/placeholder/400/300",
      rating: 4.4,
      reviews: 112,
      description: "Affordable iPhone 11 in very good condition",
      features: ["64GB Storage", "Battery Health 88%+", "Light Usage Signs", "6-Month Warranty"],
      badge: "Budget",
      shopifyUrl: "https://www.deliwer.com/products/iphone-11-very-good"
    },
    {
      id: "iphone-se",
      name: "iPhone SE 2022 (Like New)",
      category: "iphones",
      price: "AED 999",
      originalPrice: "AED 1,399",
      image: "/api/placeholder/400/300",
      rating: 4.6,
      reviews: 67,
      description: "Compact power in excellent condition",
      features: ["64GB Storage", "Battery Health 95%+", "A15 Bionic Chip", "1-Year Warranty"],
      badge: "Compact",
      shopifyUrl: "https://www.deliwer.com/products/iphone-se-2022-like-new"
    },
    {
      id: "iphone-xr",
      name: "iPhone XR (Excellent)",
      category: "iphones",
      price: "AED 899",
      originalPrice: "AED 1,299",
      image: "/api/placeholder/400/300",
      rating: 4.3,
      reviews: 94,
      description: "Colorful iPhone XR in excellent shape",
      features: ["128GB Storage", "Battery Health 85%+", "Multiple Colors", "3-Month Warranty"],
      badge: "Colorful",
      shopifyUrl: "https://www.deliwer.com/products/iphone-xr-excellent"
    },

    // Premium Water Products
    {
      id: "icelandic-premium",
      name: "Icelandic Glacial Water",
      category: "premium-water",
      price: "AED 12",
      originalPrice: "AED 18",
      image: "/api/placeholder/400/300",
      rating: 4.9,
      reviews: 234,
      description: "Pure glacial water from Iceland's pristine springs",
      features: ["500ml Glass Bottle", "pH 8.4 Alkaline", "Zero Sodium", "Sustainable Packaging"],
      badge: "Premium",
      shopifyUrl: "https://www.deliwer.com/products/icelandic-glacial-water"
    },
    {
      id: "himalayan-spring",
      name: "Himalayan Spring Water",
      category: "premium-water",
      price: "AED 15",
      originalPrice: "AED 22",
      image: "/api/placeholder/400/300",
      rating: 4.8,
      reviews: 167,
      description: "High-altitude spring water with natural minerals",
      features: ["750ml Glass Bottle", "Natural Minerals", "High Altitude Source", "Carbon Neutral"],
      badge: "Natural",
      shopifyUrl: "https://www.deliwer.com/products/himalayan-spring-water"
    },
    {
      id: "volcanic-mineral",
      name: "Volcanic Mineral Water",
      category: "premium-water",
      price: "AED 18",
      originalPrice: "AED 25",
      image: "/api/placeholder/400/300",
      rating: 4.7,
      reviews: 123,
      description: "Mineral-rich water from volcanic springs",
      features: ["1L Glass Bottle", "Rich in Silica", "Volcanic Origin", "Limited Edition"],
      badge: "Limited",
      shopifyUrl: "https://www.deliwer.com/products/volcanic-mineral-water"
    },

    // Kangen Water Systems
    {
      id: "kangen-k8",
      name: "Kangen K8 Machine",
      category: "kangen",
      price: "AED 4,999",
      originalPrice: "AED 6,499",
      image: "/api/placeholder/400/300",
      rating: 4.9,
      reviews: 78,
      description: "Premium Kangen water ionizer with installation",
      features: ["8 Platinum Plates", "Professional Installation", "5-Year Warranty", "Training Included"],
      badge: "Professional",
      shopifyUrl: "https://www.deliwer.com/products/kangen-k8-machine"
    },
    {
      id: "kangen-delivery",
      name: "Kangen Water Delivery",
      category: "kangen",
      price: "AED 45",
      originalPrice: "AED 65",
      image: "/api/placeholder/400/300",
      rating: 4.8,
      reviews: 156,
      description: "Fresh Kangen water delivered to your door",
      features: ["20L Container", "Weekly Delivery", "pH 9.5 Alkaline", "Free Container Rental"],
      badge: "Delivery",
      shopifyUrl: "https://www.deliwer.com/products/kangen-water-delivery"
    }
  ];

  const filteredProducts = selectedCategory === "all" 
    ? products 
    : products.filter(product => product.category === selectedCategory);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white py-20 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-5xl md:text-6xl font-bold mb-6">
            <span className="bg-gradient-to-r from-hero-green-500 to-dubai-blue-500 bg-clip-text text-transparent">
              DeliWer Store
            </span>
          </h1>
          <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto">
            Premium water systems, certified preowned iPhones, and sustainable products for Dubai's eco-conscious community
          </p>
          
          <div className="flex flex-wrap justify-center gap-4 mb-8">
            <Badge className="bg-hero-green-500/20 text-hero-green-500 border-hero-green-500/30 px-4 py-2">
              <Shield className="w-4 h-4 mr-2" />
              Dubai Municipality Certified
            </Badge>
            <Badge className="bg-blue-500/20 text-blue-500 border-blue-500/30 px-4 py-2">
              <Truck className="w-4 h-4 mr-2" />
              Free Dubai Delivery
            </Badge>
            <Badge className="bg-amber-500/20 text-amber-500 border-amber-500/30 px-4 py-2">
              <Award className="w-4 h-4 mr-2" />
              1-Year Warranty
            </Badge>
          </div>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {categories.map(category => (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              className={`px-6 py-3 rounded-lg font-medium transition-all ${
                selectedCategory === category.id
                  ? 'bg-hero-green-500 text-black'
                  : 'bg-slate-700/50 text-gray-300 hover:bg-slate-700'
              }`}
            >
              {category.label}
              <span className="ml-2 text-sm opacity-70">({category.count})</span>
            </button>
          ))}
        </div>

        {/* Products Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 mb-16">
          {filteredProducts.map(product => (
            <Card key={product.id} className="glass border-slate-600 group hover:border-hero-green-500/50 transition-all">
              <CardContent className="p-0 bg-gradient-to-br from-slate-900/80 to-slate-800/90 backdrop-blur-sm rounded-lg overflow-hidden">
                {/* Product Image */}
                <div className="relative h-48 bg-slate-700/30 flex items-center justify-center">
                  <div className="w-24 h-24 bg-hero-green-500/20 rounded-full flex items-center justify-center">
                    <Droplets className="w-12 h-12 text-hero-green-500" />
                  </div>
                  
                  {product.badge && (
                    <Badge className="absolute top-3 left-3 bg-amber-500/90 text-black border-0 font-bold">
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

                  {/* CTA Button */}
                  <a
                    href={product.shopifyUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full bg-gradient-to-r from-hero-green-500 to-dubai-blue-500 hover:from-hero-green-600 hover:to-dubai-blue-600 text-white py-3 rounded-lg font-medium transition-all inline-flex items-center justify-center group"
                  >
                    <ShoppingCart className="w-4 h-4 mr-2" />
                    Add to Cart
                  </a>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Special Offers */}
        <div className="grid md:grid-cols-2 gap-8 mb-16">
          <Card className="glass border-amber-500/30 bg-gradient-to-br from-amber-500/5 to-orange-500/5">
            <CardContent className="p-8 text-center">
              <h3 className="text-2xl font-bold text-white mb-4">iPhone Trade-In Program</h3>
              <p className="text-gray-300 mb-6">
                Trade your old iPhone for instant credit towards any AquaCafe system
              </p>
              <a
                href="/exchange"
                className="inline-flex items-center bg-amber-500 hover:bg-amber-600 text-black px-6 py-3 rounded-lg font-bold transition-colors"
              >
                <Phone className="mr-2 w-5 h-5" />
                Start Trade-In
              </a>
            </CardContent>
          </Card>

          <Card className="glass border-blue-500/30 bg-gradient-to-br from-blue-500/5 to-cyan-500/5">
            <CardContent className="p-8 text-center">
              <h3 className="text-2xl font-bold text-white mb-4">Kangen Installation Service</h3>
              <p className="text-gray-300 mb-6">
                Professional installation and setup for all Kangen water systems
              </p>
              <a
                href="https://wa.me/971523946311"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-lg font-bold transition-colors"
              >
                <Zap className="mr-2 w-5 h-5" />
                Book Installation
              </a>
            </CardContent>
          </Card>
        </div>

        {/* Call to Action */}
        <Card className="glass border-slate-600">
          <CardContent className="p-8 text-center bg-gradient-to-br from-slate-900/80 to-slate-800/90 backdrop-blur-sm">
            <h2 className="text-3xl font-bold text-white mb-6">Need Help Choosing?</h2>
            <p className="text-gray-300 mb-8 max-w-2xl mx-auto">
              Our Planet Hero Concierge team is standing by to help you find the perfect sustainable solution for your needs.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="https://wa.me/971523946311"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center bg-hero-green-500 hover:bg-hero-green-600 text-white px-8 py-4 rounded-xl font-bold text-lg transition-all"
              >
                <Heart className="mr-2 w-6 h-6" />
                Chat with Concierge
              </a>
              <a
                href="tel:+971523946311"
                className="inline-flex items-center justify-center border-2 border-hero-green-500 text-hero-green-500 hover:bg-hero-green-500 hover:text-white px-8 py-4 rounded-xl font-bold text-lg transition-all"
              >
                <Phone className="mr-2 w-6 h-6" />
                Call +971 52 394 6311
              </a>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}