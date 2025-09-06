import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { Link } from "wouter";
import { Star, ShoppingCart, Gift, CheckCircle, Zap, Shield, Award, Heart, Home, Smartphone, Droplets, Sparkles, Eye } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ARPreview } from "@/components/ar-preview";
import { shopifyCartService } from "@/lib/shopify-cart";
import { Product } from "@/types/cart";

export default function Products() {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [isOrderLoading, setIsOrderLoading] = useState<string | null>(null);
  const [arPreview, setArPreview] = useState<{ isOpen: boolean; product: any }>({ isOpen: false, product: null });
  const [apiProducts, setApiProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  const categories = [
    { id: "all", label: "All Products", icon: ShoppingCart },
    { id: "refurbished-phones", label: "Refurbished Phones", icon: Smartphone },
    { id: "water-solutions", label: "Water Solutions", icon: Droplets },
    { id: "premium-water", label: "Premium Water", icon: Sparkles }
  ];

  const products: Product[] = [
    // Refurbished Phones
    {
      id: "iphone-15-pro",
      name: "iPhone 15 Pro (Excellent)",
      category: "refurbished-phones",
      price: 3799,
      originalPrice: 4499,
      image: "📱",
      features: ["256GB Storage", "Battery 95%+", "Like New Condition", "1-Year Warranty"],
      badge: "Latest Model",
      variantId: "iphone-15-pro-256gb",
      available: true
    },
    {
      id: "aquacafe-starter-kit",
      name: "AquaCafe Planet Hero Starter Kit",
      category: "water-solutions",
      price: 99.00,
      originalPrice: 1698.00,
      image: "/aquacafe_shower_main_1755270492134.jpg",
      features: [
        "Premium Ionic Shower Filter",
        "Professional Installation",
        "Level 2 Planet Hero Status",
        "1000 Planet Points with 2X Multiplier"
      ],
      badge: "Best Value",
      popular: true,
      rating: 4.9,
      reviews: 127,
      description: "Transform your shower experience and become a Planet Hero! This exclusive starter kit includes our premium AquaCafe Beauty Hair & Skincare Ionic Shower Filter with professional installation.",
      variantId: "gid://shopify/ProductVariant/123456789",
      available: true
    }
  ];

  const handleAddToCart = async (product: Product) => {
    if (!product.variantId) return;
    
    setIsOrderLoading(product.id);
    
    try {
      await shopifyCartService.addToCart({
        id: product.id,
        variantId: product.variantId,
        title: product.name,
        variant: "Default",
        price: product.price,
        image: product.image,
        quantity: 1
      });

      toast({
        title: "Added to Cart",
        description: `${product.name} has been added to your cart.`
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to add item to cart. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsOrderLoading(null);
    }
  };

  const filteredProducts = selectedCategory === "all" 
    ? products 
    : products.filter(p => p.category === selectedCategory);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 py-12">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-white mb-4">
            Premium Products & Solutions
          </h1>
          <p className="text-gray-300 text-lg">
            Discover refurbished devices and water solutions that make a difference
          </p>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              className={`flex items-center gap-2 px-6 py-3 rounded-full transition-all ${
                selectedCategory === category.id
                  ? "bg-emerald-600 text-white"
                  : "bg-slate-800/50 text-gray-300 hover:bg-slate-700/50"
              }`}
            >
              <category.icon className="w-5 h-5" />
              {category.label}
            </button>
          ))}
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {filteredProducts.map((product) => (
            <Card key={product.id} className="bg-slate-800/50 border-slate-700 backdrop-blur-sm hover:bg-slate-800/70 transition-all duration-300">
              <CardContent className="p-6">
                <div className="aspect-video bg-gradient-to-br from-emerald-500/10 to-blue-500/10 rounded-lg mb-4 flex items-center justify-center overflow-hidden">
                  {typeof product.image === 'string' && product.image.startsWith('/') ? (
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-cover rounded-lg"
                    />
                  ) : (
                    <span className="text-6xl">{product.image}</span>
                  )}
                </div>
                
                <div className="flex items-start justify-between mb-2">
                  <h3 className="text-white text-lg font-semibold leading-tight">
                    {product.name}
                  </h3>
                  {product.badge && (
                    <span className="bg-emerald-600 text-white text-xs px-2 py-1 rounded">
                      {product.badge}
                    </span>
                  )}
                </div>
                
                {product.rating && (
                  <div className="flex items-center gap-2 mb-4">
                    <div className="flex items-center">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`w-4 h-4 ${
                            i < Math.floor(product.rating!) 
                              ? "fill-yellow-400 text-yellow-400" 
                              : "text-gray-600"
                          }`}
                        />
                      ))}
                    </div>
                    <span className="text-sm text-gray-400">
                      {product.rating} ({product.reviews} reviews)
                    </span>
                  </div>
                )}

                {product.description && (
                  <p className="text-gray-300 text-sm mb-4 line-clamp-2">
                    {product.description}
                  </p>
                )}
                
                <div className="mb-4">
                  <ul className="text-sm text-gray-300 space-y-1">
                    {product.features?.map((feature, index) => (
                      <li key={index} className="flex items-center">
                        <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full mr-2"></span>
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-baseline gap-2">
                    <span className="text-2xl font-bold text-emerald-400">
                      AED {product.price.toFixed(2)}
                    </span>
                    {product.originalPrice && (
                      <span className="text-gray-500 line-through text-sm">
                        AED {product.originalPrice.toFixed(2)}
                      </span>
                    )}
                  </div>
                </div>

                <Button
                  onClick={() => handleAddToCart(product)}
                  disabled={!product.available || isOrderLoading === product.id}
                  className="w-full bg-gradient-to-r from-emerald-600 to-blue-600 hover:from-emerald-700 hover:to-blue-700"
                >
                  {isOrderLoading === product.id ? (
                    "Adding..."
                  ) : (
                    <>
                      <ShoppingCart className="w-4 h-4 mr-2" />
                      Add to Cart
                    </>
                  )}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Footer */}
        <footer className="border-t border-slate-700 mt-12">
          <div className="max-w-6xl mx-auto px-4 py-6 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="text-sm text-gray-400">
              © 2024 DeliWer • Premium Products & Solutions
            </div>
            <div className="flex gap-3">
              <Link href="/exchange" className="px-4 py-2 rounded-xl bg-blue-600 text-white text-sm hover:bg-blue-700 transition-colors" data-testid="footer-start-exchange">
                Start Exchange
              </Link>
              <Link href="/aquacafe" className="px-4 py-2 rounded-xl bg-amber-600 text-white text-sm hover:bg-amber-700 transition-colors" data-testid="footer-aquacafe-offer">
                AquaCafe Offer
              </Link>
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
    </div>
  );
}