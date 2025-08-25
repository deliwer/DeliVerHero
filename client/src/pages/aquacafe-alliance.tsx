import { useState, useEffect } from "react";
import { useToast } from "@/hooks/use-toast";
import { Link, useLocation } from "wouter";
import { 
  Star, ShoppingCart, Gift, CheckCircle, Zap, Shield, Award, Heart, 
  Home, Users, Rocket, Target, Eye, Droplets, Leaf, MapPin, Clock, 
  Phone, ChefHat, Utensils, Coffee, Quote
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

// Import assets
import aquacafeDesign from "@assets/Final_Design_DeliWer_AquaCafe_1755000844134.png";
import aquacafeTradeIn from "@assets/without_text_1756065010951.jpg";
import deliwerLogo from "@assets/deliwer logo_1755631850889.png";
import aquacafeCard from "@assets/Aquacafe_byDeliWer_Card_Corners_1755485915603.png";
import washingFace from "@assets/washing-face-01 (1)_1756065010952.jpg";
import bannerAquaCafe from "@assets/Banner_AquaCafe_1755270492134.jpg";

export default function AquaCafeAlliance() {
  const [isOrderLoading, setIsOrderLoading] = useState(false);
  const [location] = useLocation();
  const { toast } = useToast();

  // Extract variant from URL params
  const urlParams = new URLSearchParams(location.split('?')[1] || '');
  const variant = urlParams.get('variant') || 'hero-minimal';

  const handleOrderNow = async () => {
    setIsOrderLoading(true);
    
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      // Navigate to Shopify checkout directly
      window.location.href = `https://www.deliwer.com/products/aquacafe?variant=${variant}`;
      
      toast({
        title: "Proceeding to Checkout",
        description: "Loading secure checkout for AquaCafe Alliance Kit",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to process order. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsOrderLoading(false);
    }
  };

  const handleExperienceAlliance = () => {
    window.open('https://maps.google.com/maps?q=Baker\'s+Kitchen+Mazaya+Center+Dubai', '_blank');
    toast({
      title: "Opening Maps",
      description: "Directing you to Baker's Kitchen location",
    });
  };

  return (
    <div className="min-h-screen w-full max-w-full overflow-x-hidden bg-gradient-to-br from-emerald-50 via-white to-amber-50">
      {/* Navigation Bar */}
      <div className="w-full max-w-none mx-0 px-4 py-4 flex items-center justify-between bg-white/80 backdrop-blur-sm border-b border-emerald-100">
        <Link href="/" className="flex items-center gap-2 text-emerald-800 hover:text-emerald-600 transition-colors">
          <Home className="w-5 h-5" />
          <span className="font-semibold">DeliWer</span>
        </Link>
        <div className="flex gap-2">
          <Link href="/products" className="px-4 py-2 rounded-xl bg-emerald-600 text-white text-sm hover:bg-emerald-700 transition-colors">
            Shop All
          </Link>
          <Link href="/exchange" className="px-4 py-2 rounded-xl bg-blue-600 text-white text-sm hover:bg-blue-700 transition-colors">
            Start Exchange
          </Link>
        </div>
      </div>

      {/* Hero Section */}
      <section className="w-full py-12 sm:py-20 px-4 bg-gradient-to-br from-emerald-500/10 via-white to-amber-500/10 relative overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            {/* Left: Partnership Branding */}
            <div className="text-center lg:text-left">
              <div className="mb-6">
                {/* Partnership Logos */}
                <div className="flex flex-col lg:flex-row items-center justify-center lg:justify-start gap-4 mb-6">
                  <div className="bg-gradient-to-r from-cyan-500 to-blue-600 text-white px-6 py-3 rounded-full font-bold text-lg shadow-lg">
                    AquaCafe by DeliWer
                  </div>
                  <span className="text-3xl font-bold text-emerald-600">+</span>
                  <div className="bg-gradient-to-r from-amber-500 to-orange-500 text-white px-6 py-3 rounded-full font-bold text-lg shadow-lg">
                    Baker's Kitchen UAE
                  </div>
                </div>
                
                {/* Hero Headline */}
                <div className="mb-6">
                  <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold bg-gradient-to-r from-emerald-600 to-cyan-600 bg-clip-text text-transparent mb-4">
                    Healthy Water
                  </h1>
                  <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold bg-gradient-to-r from-amber-600 to-orange-600 bg-clip-text text-transparent mb-6">
                    Meets Healthy Food
                  </h1>
                </div>
              </div>

              <p className="text-lg text-gray-700 mb-8 leading-relaxed max-w-2xl">
                Introducing a first-of-its-kind alliance in Dubai — AquaCafe by DeliWer partners with Baker's Kitchen UAE, 
                serving revitalized Kangen Water with wholesome meals. Together, we empower families to live healthier and more sustainably.
              </p>

              <div className="space-y-4">
                <Button
                  onClick={handleExperienceAlliance}
                  className="w-full sm:w-auto bg-gradient-to-r from-emerald-500 to-cyan-500 hover:from-emerald-600 hover:to-cyan-600 text-white px-8 py-4 text-lg font-bold rounded-xl shadow-lg transition-all"
                >
                  <Heart className="mr-3 w-6 h-6" />
                  Experience the Alliance
                </Button>
                
                <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 text-sm text-gray-600">
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

            {/* Right: Lifestyle Image */}
            <div className="relative">
              <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-6 shadow-2xl">
                <img 
                  src="https://static.wixstatic.com/media/74367b_9f4b70ed3be04cd89f9fd7dab4f3fec5~mv2.jpeg/v1/fill/w_1500,h_749,al_t,q_85,enc_avif,quality_auto/74367b_9f4b70ed3be04cd89f9fd7dab4f3fec5~mv2.jpeg" 
                  alt="Baker's Kitchen UAE - Healthy Food & Wellness by Sven The Baker" 
                  className="w-full h-64 sm:h-80 object-cover rounded-2xl shadow-lg"
                />
                <div className="text-center mt-4">
                  <div className="text-lg font-bold text-gray-800 mb-2">Real Partnership, Real Results</div>
                  <div className="text-gray-600">Pure water with wholesome meals at Baker's Kitchen</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Our Shared Mission Section */}
      <section className="w-full py-16 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
              Why AquaCafe + Baker's Kitchen?
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              When water meets food, true wellness begins. This partnership is built on shared values:
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8">
            {/* AquaCafe Card */}
            <Card className="bg-gradient-to-br from-cyan-50 to-blue-50 border-cyan-200 shadow-xl hover:shadow-2xl transition-shadow">
              <CardContent className="p-8">
                <div className="text-center mb-6">
                  <div className="w-20 h-20 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Droplets className="w-10 h-10 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-800 mb-2">Pure Hydration</h3>
                  <p className="text-cyan-600 font-semibold">Plastic-Free | AED 1299 Hero Minimal</p>
                </div>
                
                <div className="space-y-4 text-gray-700">
                  <div className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-emerald-500" />
                    <span>Fresh, honest food crafted daily</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-emerald-500" />
                    <span>Plastic-free, revitalized hydration</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-emerald-500" />
                    <span>Advanced Kangen Water technology</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-emerald-500" />
                    <span>7-stage premium filtration</span>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            {/* Baker's Kitchen Card */}
            <Card className="bg-gradient-to-br from-amber-50 to-orange-50 border-amber-200 shadow-xl hover:shadow-2xl transition-shadow">
              <CardContent className="p-8">
                <div className="text-center mb-6">
                  <div className="w-20 h-20 bg-gradient-to-r from-amber-500 to-orange-500 rounded-full flex items-center justify-center mx-auto mb-4">
                    <ChefHat className="w-10 h-10 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-800 mb-2">Wholesome Meals</h3>
                  <p className="text-amber-600 font-semibold">Fresh Bread Daily | Serving AquaCafe Water</p>
                </div>
                
                <div className="space-y-4 text-gray-700">
                  <div className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-emerald-500" />
                    <span>Fresh, wholesome meals daily</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-emerald-500" />
                    <span>Kangen Water served with every meal</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-emerald-500" />
                    <span>Premium location in Mazaya Center</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-emerald-500" />
                    <span>Commitment to health & sustainability</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Message from #SvenTheBaker */}
      <section className="w-full py-16 px-4 bg-gradient-to-br from-amber-50 to-orange-50">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-3xl p-8 shadow-2xl">
            <div className="grid md:grid-cols-3 gap-6 items-center">
              {/* Dr. Sven's Photo */}
              <div className="text-center">
                <div className="w-32 h-32 bg-gradient-to-r from-amber-500 to-orange-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <ChefHat className="w-16 h-16 text-white" />
                </div>
                <h4 className="text-xl font-bold text-gray-800 mb-2">Dr. Sven The Baker</h4>
                <p className="text-amber-600 font-semibold">Founder, Baker's Kitchen UAE</p>
              </div>
              
              {/* Quote */}
              <div className="md:col-span-2">
                <Quote className="w-8 h-8 text-amber-500 mb-4" />
                <blockquote className="text-lg text-gray-700 italic leading-relaxed mb-4">
                  "Healthy food deserves healthy water. That's why at Baker's Kitchen, we proudly serve AquaCafe Kangen Water — 
                  for our guests, for our community, for a healthier Dubai."
                </blockquote>
                <div className="text-right">
                  <span className="text-amber-600 font-bold">– Dr. Sven The Baker</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Exclusive Offer Section */}
      <section className="w-full py-16 px-4 bg-gradient-to-br from-emerald-50 to-cyan-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <div className="inline-flex items-center bg-gradient-to-r from-emerald-500 to-amber-500 text-white rounded-full px-8 py-4 mb-6 font-bold text-xl shadow-2xl">
              <Gift className="w-6 h-6 mr-3" />
              AED 1299 Hero Minimal + Referral Rewards at Baker's Kitchen
              <Gift className="w-6 h-6 ml-3" />
            </div>
          </div>

          <div className="grid lg:grid-cols-2 gap-8 items-center">
            {/* Left: Offer Details */}
            <div className="text-center lg:text-left">
              <h3 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6">
                <span className="bg-gradient-to-r from-emerald-500 to-cyan-500 bg-clip-text text-transparent">
                  AED 1299
                </span>
                <br />
                <span className="text-2xl text-gray-600">Starter Kit + Referral Rewards</span>
              </h3>
              
              <p className="text-lg text-gray-700 mb-8">
                Get the AquaCafe system at partnership price, plus earn Baker's Kitchen rewards through referrals.
              </p>

              {/* Benefits List */}
              <div className="space-y-4 mb-8">
                <div className="flex items-center justify-center lg:justify-start text-lg">
                  <div className="w-8 h-8 bg-emerald-500 rounded-full flex items-center justify-center mr-4">
                    <Gift className="w-4 h-4 text-white" />
                  </div>
                  <span className="text-gray-800 font-semibold">Get the AquaCafe Hero Minimal (AED 1299)</span>
                </div>
                <div className="flex items-center justify-center lg:justify-start text-lg">
                  <div className="w-8 h-8 bg-amber-500 rounded-full flex items-center justify-center mr-4">
                    <Utensils className="w-4 h-4 text-white" />
                  </div>
                  <span className="text-gray-800 font-semibold">AED 100 Baker's Kitchen voucher when your friend signs up via referral</span>
                </div>
                <div className="flex items-center justify-center lg:justify-start text-lg">
                  <div className="w-8 h-8 bg-cyan-500 rounded-full flex items-center justify-center mr-4">
                    <Star className="w-4 h-4 text-white" />
                  </div>
                  <span className="text-gray-800 font-semibold">Experience Kangen Water with your meal</span>
                </div>
              </div>

              <Button
                onClick={handleOrderNow}
                disabled={isOrderLoading}
                className="w-full lg:w-auto bg-gradient-to-r from-emerald-500 to-amber-500 hover:from-emerald-600 hover:to-amber-600 text-white px-8 py-4 text-lg font-bold rounded-xl shadow-lg transition-all"
              >
                {isOrderLoading ? (
                  <>
                    <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-current mr-3"></div>
                    PROCESSING...
                  </>
                ) : (
                  <>
                    <Heart className="mr-3 w-6 h-6" />
                    Get My Kit + Referral Program
                  </>
                )}
              </Button>
            </div>

            {/* Right: Product Showcase */}
            <div className="relative">
              <div className="bg-white/90 backdrop-blur-sm rounded-3xl p-6 shadow-lg">
                <img 
                  src={aquacafeTradeIn} 
                  alt="AquaCafe Starter Kit" 
                  className="w-full h-64 object-cover rounded-2xl shadow-md mb-6"
                />
                
                <div className="bg-gradient-to-r from-emerald-50 to-amber-50 rounded-xl p-6 border border-emerald-200">
                  <div className="text-center">
                    <div className="text-xl font-bold text-gray-800 mb-3">Partnership Exclusive Benefits</div>
                    <div className="grid grid-cols-2 gap-3 text-sm text-gray-700">
                      <div className="flex items-center gap-2">
                        <CheckCircle className="w-4 h-4 text-emerald-500" />
                        <span>AED 1299 Hero Minimal</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <CheckCircle className="w-4 h-4 text-amber-500" />
                        <span>Baker's Referral Reward</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <CheckCircle className="w-4 h-4 text-cyan-500" />
                        <span>Kangen Water Experience</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <CheckCircle className="w-4 h-4 text-purple-500" />
                        <span>Premium Installation</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Sustainability Commitment */}
      <section className="w-full py-16 px-4 bg-gradient-to-br from-emerald-600 to-cyan-600 text-white">
        <div className="max-w-7xl mx-auto text-center">
          <div className="mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              #SayNoToPlastic, SayYesToHealth
            </h2>
            <p className="text-xl text-emerald-100 max-w-3xl mx-auto">
              Join AquaCafe and Baker's Kitchen in creating a sustainable future for Dubai
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 hover:bg-white/20 transition-colors">
              <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <Leaf className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold mb-3">🌱 Plastic-Free</h3>
              <p className="text-emerald-100">Eliminate single-use plastic bottles with our advanced filtration systems</p>
            </div>
            
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 hover:bg-white/20 transition-colors">
              <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <ChefHat className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold mb-3">🥖 Healthy Dining</h3>
              <p className="text-emerald-100">Pure water and nutritious meals for optimal health and wellness</p>
            </div>
            
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 hover:bg-white/20 transition-colors">
              <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold mb-3">🌍 Dubai 2030 Sustainability</h3>
              <p className="text-emerald-100">Supporting Dubai's sustainable development goals through partnership</p>
            </div>
          </div>

          <div className="mt-12">
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 max-w-2xl mx-auto">
              <h4 className="text-xl font-bold mb-3">#SvenTheBaker #HealthyDubai #DeliWer</h4>
              <p className="text-emerald-100">
                Together, we're making Dubai healthier, one meal and one drop at a time.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="w-full py-12 px-4 bg-gray-900 text-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-3 gap-8 items-center">
            {/* Logos */}
            <div className="text-center md:text-left">
              <div className="flex flex-col sm:flex-row items-center gap-4 mb-4">
                <div className="bg-gradient-to-r from-cyan-500 to-blue-600 text-white px-4 py-2 rounded-lg font-bold">
                  AquaCafe by DeliWer
                </div>
                <span className="text-2xl">+</span>
                <div className="bg-gradient-to-r from-amber-500 to-orange-500 text-white px-4 py-2 rounded-lg font-bold">
                  Baker's Kitchen UAE
                </div>
              </div>
            </div>
            
            {/* Contact */}
            <div className="text-center">
              <h4 className="text-lg font-bold mb-3">Visit Baker's Kitchen</h4>
              <div className="space-y-2 text-gray-300">
                <div className="flex items-center justify-center gap-2">
                  <MapPin className="w-4 h-4" />
                  <span>Mazaya Center, Business Bay</span>
                </div>
                <div className="flex items-center justify-center gap-2">
                  <Clock className="w-4 h-4" />
                  <span>Open Daily 9AM-11PM</span>
                </div>
              </div>
            </div>
            
            {/* Social Links */}
            <div className="text-center md:text-right">
              <div className="space-y-2">
                <Link href="/contact" className="block text-emerald-400 hover:text-emerald-300 transition-colors">
                  Contact Us
                </Link>
                <Link href="/privacy" className="block text-gray-400 hover:text-gray-300 transition-colors">
                  Privacy Policy
                </Link>
                <Link href="/terms" className="block text-gray-400 hover:text-gray-300 transition-colors">
                  Terms of Service
                </Link>
              </div>
            </div>
          </div>
          
          <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 DeliWer & Baker's Kitchen UAE. All rights reserved.</p>
            <p className="mt-2 text-sm">#SvenTheBaker #HealthyDubai #DeliWer</p>
          </div>
        </div>
      </footer>
    </div>
  );
}