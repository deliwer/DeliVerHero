import { useState, useEffect } from "react";
import { Star, Clock, Users, Zap, Trophy, Target, Timer, Calculator, Smartphone, Leaf, ShoppingCart, Crown, Gift, Shield, CheckCircle, Building, Handshake, Heart, Sparkles, ChevronRight, Award, TrendingUp, ArrowRight, Gamepad2, Repeat, Droplets, Home, Package, Truck, Utensils, ArrowDown, BarChart, X, User, Mail, Phone, MapPin, ChevronDown, ChevronUp, Play, Copy, QrCode, Rocket } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { OptimizedImage } from "@/components/ui/optimized-image";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { MeetDeliInteractive } from "./meet-deli-interactive";
import { AquaCafeTab } from "./aquacafe-tab";
import { HeroRegistrationModal, MissionSelectionModal } from "./hero-onboarding-modals";
import { TombolaWidget } from "./tombola-widget";
import { ImpactSlotMachine } from "./impact-slot-machine";
import { DirhamSymbol } from "./dirham-symbol";
import { StarsSponsorshipSection } from "./stars-sponsorship-section";
import { PlayTV } from "./play-tv";
import { useImpactStats } from "@/hooks/use-impact-stats";
import { useLeaderboard } from "@/hooks/use-leaderboard";
import { useImageOptimization, useImageServiceWorker } from "@/hooks/use-image-optimization";
import { useToast } from "@/hooks/use-toast";
import { useMutation, useQuery } from "@tanstack/react-query";
import { apiRequest, queryClient } from "@/lib/queryClient";
import { shopifyCartService } from "@/lib/shopify-cart";
import { Link } from "wouter";
import mobile_water_purification_hero from "@assets/mobile-water-purification-hero.jpg";
import k8MachineImage from "@assets/without_text_1756065010951.jpg";
import showerFilterCollage from "@assets/collage_1755270492135.jpg";
import membershipCard from "@assets/Aquacafe_byDeliWer_Card_Corners_1755482696304.png";
import planetHeroesGaming from "@assets/generated_images/Planet_Heroes_environmental_gaming_7f7bf177.png";
import kangenWaterSystem from "@assets/generated_images/Kangen_K8_water_filtration_system_e7d8eaaa.png";
import iphoneCollection from "@assets/generated_images/Latest_iPhone_models_collection_cbe8ffe3.png";
import iphoneTradeInLifestyle from "@assets/stock_images/smartphone_trade-in__bd93d09e.jpg";
import pizzaBobaComboImage from "@assets/stock_images/pizza_and_boba_tea_d_a375dab3.jpg";

interface HeroSpotCounterProps {
  initialCount?: number;
}

function HeroSpotCounter({ initialCount = 47 }: HeroSpotCounterProps) {
  const [spotsLeft, setSpotsLeft] = useState(initialCount);
  
  useEffect(() => {
    // Simulate spots being taken every 30-60 seconds
    const interval = setInterval(() => {
      setSpotsLeft(prev => {
        const newCount = Math.max(1, prev - Math.floor(Math.random() * 2));
        return newCount;
      });
    }, 45000 + Math.random() * 30000);
    
    return () => clearInterval(interval);
  }, []);
  
  return (
    <div className="inline-flex items-center bg-red-500/20 border border-red-500/50 rounded-full px-4 py-2" data-testid="hero-spots-counter">
      <div className="w-2 h-2 bg-red-500 rounded-full mr-2 animate-pulse"></div>
      <span className="text-red-400 font-bold text-sm">
        Only {spotsLeft} Founding Hero spots left today
      </span>
    </div>
  );
}

interface CountdownTimerProps {
  hours?: number;
  minutes?: number;
  seconds?: number;
}

function CountdownTimer({ hours = 23, minutes = 47, seconds = 32 }: CountdownTimerProps) {
  const [time, setTime] = useState({ hours, minutes, seconds });
  
  useEffect(() => {
    const interval = setInterval(() => {
      setTime(prev => {
        let { hours, minutes, seconds } = prev;
        
        if (seconds > 0) {
          seconds -= 1;
        } else {
          seconds = 59;
          if (minutes > 0) {
            minutes -= 1;
          } else {
            minutes = 59;
            if (hours > 0) {
              hours -= 1;
            } else {
              // Reset when reaches zero
              return { hours: 23, minutes: 47, seconds: 32 };
            }
          }
        }
        
        return { hours, minutes, seconds };
      });
    }, 1000);
    
    return () => clearInterval(interval);
  }, []);
  
  const formatTime = (time: number) => time.toString().padStart(2, '0');
  
  return (
    <div className="flex items-center space-x-2 text-amber-500" data-testid="hero-countdown">
      <Timer className="w-4 h-4" />
      <span className="font-mono font-bold">
        {formatTime(time.hours)}:{formatTime(time.minutes)}:{formatTime(time.seconds)}
      </span>
      <span className="text-sm text-gray-400">until double points end</span>
    </div>
  );
}

// Progress flow step indicator component
function ProgressIndicator({ currentStep }: { currentStep: 1 | 2 | 3 }) {
  const stepConfig = {
    1: { icon: ShoppingCart, label: "Shop Smart", section: "How it Works" },
    2: { icon: Smartphone, label: "Sell iPhone", section: "How it Works" },
    3: { icon: Play, label: "Create Impact", section: "How it Works" }
  };

  return (
    <div className="flex flex-col items-center mb-8">
      {/* Section indicator */}
      <div className="mb-4">
        <div className="inline-flex items-center gap-2 bg-hero-green-500/20 text-hero-green-400 px-4 py-2 rounded-full border border-hero-green-500/50">
          <Target className="w-4 h-4" />
          <span className="font-bold text-sm">HOW IT WORKS</span>
        </div>
      </div>
      
      {/* Steps */}
      <div className="flex items-center justify-center overflow-x-auto">
        <div className="flex items-center space-x-4 sm:space-x-6 px-4">
          {[1, 2, 3].map((step) => {
            const { icon: StepIcon, label } = stepConfig[step as keyof typeof stepConfig];
            return (
              <div key={step} className="flex flex-col items-center">
                <div className="flex items-center">
                  <div 
                    className={`w-14 h-14 sm:w-16 sm:h-16 rounded-full flex items-center justify-center font-bold text-sm transition-all duration-300 border-2 ${
                      currentStep >= step 
                        ? 'bg-hero-green-500 text-black animate-pulse border-hero-green-400 shadow-lg shadow-hero-green-500/30' 
                        : 'bg-gray-600 text-gray-400 border-gray-500'
                    }`}
                  >
                    {currentStep > step ? (
                      <CheckCircle className="w-6 h-6 sm:w-8 sm:h-8" />
                    ) : (
                      <StepIcon className="w-6 h-6 sm:w-8 sm:h-8" />
                    )}
                  </div>
                  {step < 3 && (
                    <div className={`w-16 sm:w-20 h-1 transition-all duration-300 rounded-full ${
                      currentStep > step ? 'bg-hero-green-500 shadow-md shadow-hero-green-500/30' : 'bg-gray-600'
                    }`} />
                  )}
                </div>
                <div className={`mt-2 text-xs font-bold whitespace-nowrap ${
                  currentStep >= step ? 'text-hero-green-400' : 'text-gray-400'
                }`}>
                  {label}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

// Step 3: Create Impact Section (Play) - Now Collapsible
function StepOnePlay({ onJoinMission }: { onJoinMission: () => void }) {
  const [heroId] = useState("demo-hero-id"); // Demo hero ID for tombola
  const [isExpanded, setIsExpanded] = useState(false);
  
  return (
    <section className="py-8 px-4 mb-8 relative overflow-hidden" data-section="step-3">
      {/* Metaverse background effects */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 via-indigo-900/20 to-blue-900/20"></div>
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-10 left-10 w-2 h-2 bg-purple-400 rounded-full animate-pulse"></div>
        <div className="absolute top-20 right-16 w-3 h-3 bg-blue-400 rounded-full animate-pulse delay-300"></div>
        <div className="absolute bottom-20 left-16 w-2 h-2 bg-pink-400 rounded-full animate-pulse delay-700"></div>
        <div className="absolute bottom-10 right-10 w-4 h-4 bg-cyan-400 rounded-full animate-pulse delay-1000"></div>
      </div>
      
      <div className="max-w-4xl mx-auto relative z-10">
        <ProgressIndicator currentStep={3} />
        
        <div className="text-center mb-8">
          <h2 className="text-3xl md:text-5xl font-black mb-4">
            <button
              className="cursor-pointer hover:scale-105 transition-all duration-300 border-0 bg-transparent p-0 inline-flex items-center gap-3"
              onClick={() => setIsExpanded(!isExpanded)}
              aria-expanded={isExpanded}
              aria-label="Toggle Play to Create Impact section"
              data-testid="toggle-play-impact"
            >
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400">
                Play to Create Impact
              </span>
              {isExpanded ? (
                <ChevronUp className="w-8 h-8 text-purple-400" />
              ) : (
                <ChevronDown className="w-8 h-8 text-purple-400" />
              )}
            </button>
          </h2>
          <div className="flex items-center justify-center gap-2 mb-3">
            <Sparkles className="w-5 h-5 text-emerald-400 animate-pulse" />
            <span className="text-emerald-400 font-bold text-lg">Guilt Free Living</span>
            <div className="w-2 h-2 bg-emerald-400 rounded-full animate-ping"></div>
          </div>
          <p className="text-lg text-gray-300 max-w-2xl mx-auto mb-8">
            Your actions fund recycling drives, water renewal, and food security programs across Dubai & Pakistan. 
            <span className="text-purple-400 font-bold">Watch live, play missions, and see real impact!</span>
          </p>

          {/* Play TV Interactive Component - Always Visible */}
          <div className="max-w-7xl mx-auto">
            <PlayTV />
          </div>
        </div>

        {/* Expanded Content - Full Details */}
        {isExpanded && (
        <>
        {/* Play Mission Info Section */}
        <div className="glass rounded-2xl p-8 border border-purple-500/50 bg-gradient-to-br from-purple-950/30 to-indigo-950/30 relative overflow-hidden animate-in slide-in-from-top duration-500">
          {/* Floating particles */}
          <div className="absolute inset-0 opacity-20">
            <div className="absolute top-4 left-8 w-1 h-1 bg-purple-400 rounded-full animate-pulse"></div>
            <div className="absolute top-12 right-12 w-2 h-2 bg-blue-400 rounded-full animate-pulse delay-300"></div>
            <div className="absolute bottom-12 left-12 w-1 h-1 bg-pink-400 rounded-full animate-pulse delay-700"></div>
          </div>
          
          <div className="max-w-2xl mx-auto relative z-10">
            <div className="space-y-6">
              <div className="text-center mb-6">
                <div className="inline-flex items-center gap-2 bg-purple-500/20 text-purple-400 px-4 py-2 rounded-full mb-4">
                  <Gamepad2 className="w-5 h-5" />
                  <span className="font-bold">🎮 PLAY MISSIONS</span>
                </div>
                <h3 className="text-2xl font-bold text-white mb-2">Win Prizes & Earn Points</h3>
                <p className="text-gray-200 text-sm">
                  Complete missions in the metaverse to unlock rewards and build your Planet Points!
                </p>
              </div>
              
              {/* Visit Play Page CTA */}
              <div className="text-center">
                <div className="text-gray-400 text-sm mb-6">Ready to start playing?</div>
                <Link href="/play">
                  <Button 
                    size="lg" 
                    className="w-full flex items-center justify-center gap-3 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-bold px-8 py-4 text-xl shadow-2xl transform hover:scale-105 transition-all rounded-full"
                    data-testid="button-visit-play-page"
                  >
                    <Gamepad2 className="w-6 h-6 flex-shrink-0" />
                    <span>Visit Play Page</span>
                  </Button>
                </Link>
                <div className="text-xs text-gray-400 mt-4">
                  Access Tombola, Achievements, Leaderboards & More!
                </div>
              </div>
              
              {/* Ways to earn preview */}
              <div className="text-center">
                <div className="text-gray-400 text-sm mb-3">Available on Play page:</div>
                <div className="flex justify-center gap-4 text-xs">
                  <div className="text-center">
                    <div className="text-purple-400 font-bold">Tombola</div>
                    <div className="text-gray-500">Daily Spins</div>
                  </div>
                  <div className="text-center">
                    <div className="text-blue-400 font-bold">Achievements</div>
                    <div className="text-gray-500">Unlock Badges</div>
                  </div>
                  <div className="text-center">
                    <div className="text-amber-400 font-bold">Leaderboard</div>
                    <div className="text-gray-500">Compete</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        </>
        )}
      </div>
    </section>
  );
}

// Step 1: Shop Smart Section (formerly Step 2)
function StepTwoExchange() {
  const [isExpanded, setIsExpanded] = useState(false);
  const { toast } = useToast();
  
  const handleBuyNow = async (productId: string, productName: string, price: number) => {
    try {
      await shopifyCartService.addToCart({
        id: productId,
        variantId: productId,
        title: productName,
        variant: "Default",
        price: price,
        image: "/aquacafe_shower_main_1755270492134.jpg",
        quantity: 1
      });

      toast({
        title: "Added to Cart",
        description: `${productName} has been added to your cart.`
      });

      window.location.href = "/cart";
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to add item to cart. Please try again.",
        variant: "destructive"
      });
    }
  };
  
  return (
    <section className="py-8 px-4 mb-8" data-section="step-1">
      <div className="max-w-4xl mx-auto">
        <ProgressIndicator currentStep={1} />
        
        <div className="text-center mb-8">
          <h2 className="text-3xl md:text-5xl font-black mb-4 text-white">
            <button
              className="cursor-pointer hover:scale-105 transition-all duration-300 border-0 bg-transparent p-0 inline-flex items-center gap-3"
              onClick={() => setIsExpanded(!isExpanded)}
              aria-expanded={isExpanded}
              aria-label="Toggle Get Clean Water at Home section"
              data-testid="toggle-shop-smart"
            >
              <span className="bg-gradient-to-r from-green-400 to-blue-400 bg-clip-text text-transparent">
                Get Clean Water at Home
              </span>
              {isExpanded ? (
                <ChevronUp className="w-8 h-8 text-green-400" />
              ) : (
                <ChevronDown className="w-8 h-8 text-green-400" />
              )}
            </button>
          </h2>
          <p className="text-lg text-gray-300 max-w-2xl mx-auto mb-4">
            Premium Water Systems: Get clean alkaline water at home with professional installation
          </p>
          
          {/* K8 Machine Banner - Always Visible */}
          <div className="max-w-3xl mx-auto mt-6 rounded-2xl overflow-hidden border border-blue-500/50 shadow-2xl bg-gradient-to-br from-blue-600/20 to-green-600/20 p-2 backdrop-blur-sm">
            <div className="bg-slate-900/50 rounded-xl p-6">
              <div className="flex flex-col md:flex-row items-center gap-6">
                <div className="flex-1">
                  <img 
                    src={k8MachineImage} 
                    alt="Kangen Water K8 Machine" 
                    className="w-full h-auto rounded-lg shadow-lg"
                  />
                </div>
                <div className="flex-1 text-center md:text-left">
                  <div className="inline-flex items-center gap-2 bg-amber-500/20 text-amber-400 px-4 py-2 rounded-full mb-3">
                    <Star className="w-5 h-5" />
                    <span className="font-bold">FLAGSHIP OFFER</span>
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-2">Planet Hero Package: Filter Service + FREE iPhone Upgrade</h3>
                  <p className="text-gray-300 mb-4">
                    Get premium K8 water filtration with professional installation service + upgrade your old iPhone to the next model FREE
                  </p>
                  <div className="flex flex-wrap gap-2 justify-center md:justify-start">
                    <span className="bg-hero-green-500/20 text-hero-green-400 px-3 py-1 rounded-full text-sm font-bold">Huge Discounts</span>
                    <span className="bg-blue-500/20 text-blue-400 px-3 py-1 rounded-full text-sm font-bold">Exclusive Benefits</span>
                    <span className="bg-purple-500/20 text-purple-400 px-3 py-1 rounded-full text-sm font-bold">Premium Quality</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* CTA to View All AquaCafe Products - Always Visible */}
          <div className="mt-6">
            <Link href="/aquacafe">
              <Button
                size="lg"
                className="w-full max-w-md mx-auto flex items-center justify-center gap-3 bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white font-bold px-12 py-6 text-xl shadow-2xl transform hover:scale-105 transition-all rounded-full"
                data-testid="button-view-aquacafe-products"
              >
                <Droplets className="w-6 h-6 flex-shrink-0" />
                <span>View All Filtration Products</span>
              </Button>
            </Link>
            <p className="text-center text-gray-400 text-sm mt-3">
              Explore shower filters, RO systems, and more water treatment solutions
            </p>
          </div>
        </div>

        {/* Product Showcase */}
        {isExpanded && (
        <>

        {/* Water Filtration Systems Showcase */}
        <div className="mb-8 animate-in slide-in-from-top duration-500">
          <div className="glass rounded-2xl p-8 border border-blue-500/50 bg-gradient-to-br from-blue-500/10 to-cyan-500/10">
            <div className="text-center mb-6">
              <div className="inline-flex items-center gap-2 bg-blue-500/20 text-blue-400 px-4 py-2 rounded-full mb-4">
                <Droplets className="w-5 h-5" />
                <span className="font-bold">💧 PREMIUM WATER SYSTEMS</span>
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">Choose Your Water Solution</h3>
              
              {/* Free iPhone Upgrade Banner - Always Visible */}
              <div className="max-w-3xl mx-auto mb-4 rounded-xl overflow-hidden border-2 border-amber-500 shadow-2xl bg-gradient-to-r from-amber-500/20 to-orange-500/20 p-4 backdrop-blur-sm animate-pulse">
                <div className="flex items-center justify-center gap-3">
                  <Smartphone className="w-6 h-6 text-amber-400" />
                  <div className="text-center">
                    <p className="text-lg font-black text-amber-300 mb-1">
                      🎁 FREE iPhone Upgrade to Next Model
                    </p>
                    <p className="text-sm text-amber-100">
                      When you order any water filtration package - Limited time offer!
                    </p>
                  </div>
                  <Gift className="w-6 h-6 text-amber-400" />
                </div>
              </div>

              <p className="text-gray-300 text-sm max-w-2xl mx-auto">
                Get clean, alkaline water at home with our premium filtration systems
              </p>
            </div>

            {/* Product Image Showcase */}
            <div className="mb-8 max-w-3xl mx-auto">
              <img 
                src={kangenWaterSystem} 
                alt="Kangen K8 Premium Water Filtration System" 
                className="w-full h-auto rounded-xl shadow-2xl border border-blue-400/30"
                data-testid="img-water-filtration-system"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Kangen K8 */}
              <div className="bg-slate-800/50 rounded-xl p-6 border border-blue-400/30 hover:border-blue-400/60 transition-all">
                <div className="flex items-center gap-2 mb-4">
                  <Badge className="bg-amber-500/20 text-amber-400">FLAGSHIP</Badge>
                  <Badge className="bg-blue-500/20 text-blue-400">Most Popular</Badge>
                </div>
                <h4 className="text-xl font-bold text-white mb-3">Kangen K8 Machine</h4>
                <div className="space-y-3 mb-4">
                  <div className="flex items-start">
                    <Zap className="w-4 h-4 text-blue-400 mr-2 mt-1 flex-shrink-0" />
                    <span className="text-gray-300 text-sm">8 platinum-coated titanium plates for superior ionization</span>
                  </div>
                  <div className="flex items-start">
                    <Droplets className="w-4 h-4 text-blue-400 mr-2 mt-1 flex-shrink-0" />
                    <span className="text-gray-300 text-sm">Produces 5 types of water (pH 2.5-11.5)</span>
                  </div>
                  <div className="flex items-start">
                    <Shield className="w-4 h-4 text-blue-400 mr-2 mt-1 flex-shrink-0" />
                    <span className="text-gray-300 text-sm">Medical-grade quality, 15-year warranty</span>
                  </div>
                  <div className="flex items-start">
                    <Home className="w-4 h-4 text-blue-400 mr-2 mt-1 flex-shrink-0" />
                    <span className="text-gray-300 text-sm">Saves money vs. bottled water</span>
                  </div>
                </div>
                <div className="text-center text-2xl font-bold text-blue-400 mb-2">AED 19,250</div>
                <p className="text-gray-400 text-sm text-center mb-4">Premium alkaline water system - Direct from Kangen Dubai</p>
                <Button
                  onClick={() => handleBuyNow("kangen-k8-machine", "Kangen K8 Machine", 19250)}
                  className="w-full bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white font-bold py-6 text-lg shadow-xl"
                  data-testid="button-buy-k8"
                >
                  <ShoppingCart className="mr-2 w-5 h-5 flex-shrink-0" />
                  Order Now with PayPal/Stripe
                </Button>
              </div>

              {/* Shower Filters & Portable */}
              <div className="bg-slate-800/50 rounded-xl p-6 border border-cyan-400/30 hover:border-cyan-400/60 transition-all">
                <div className="flex items-center gap-2 mb-4">
                  <Badge className="bg-cyan-500/20 text-cyan-400">Starter Friendly</Badge>
                </div>
                <h4 className="text-xl font-bold text-white mb-3">AquaCafe Starter Kit</h4>
                <div className="space-y-3 mb-4">
                  <div className="flex items-start">
                    <Droplets className="w-4 h-4 text-cyan-400 mr-2 mt-1 flex-shrink-0" />
                    <span className="text-gray-300 text-sm">Remove chlorine, heavy metals & impurities</span>
                  </div>
                  <div className="flex items-start">
                    <Heart className="w-4 h-4 text-cyan-400 mr-2 mt-1 flex-shrink-0" />
                    <span className="text-gray-300 text-sm">Healthier skin & hair from filtered shower water</span>
                  </div>
                  <div className="flex items-start">
                    <Package className="w-4 h-4 text-cyan-400 mr-2 mt-1 flex-shrink-0" />
                    <span className="text-gray-300 text-sm">Professional installation included</span>
                  </div>
                  <div className="flex items-start">
                    <Zap className="w-4 h-4 text-cyan-400 mr-2 mt-1 flex-shrink-0" />
                    <span className="text-gray-300 text-sm">Instant results, easy maintenance</span>
                  </div>
                </div>
                <div className="text-center mb-2">
                  <span className="text-2xl font-bold text-cyan-400">AED 99</span>
                  <span className="text-gray-500 line-through ml-2">AED 1,698</span>
                </div>
                <p className="text-gray-400 text-sm text-center mb-4">94% savings - Limited offer</p>
                <Button
                  onClick={() => handleBuyNow("aquacafe-starter-kit", "AquaCafe Starter Kit", 99)}
                  className="w-full bg-gradient-to-r from-cyan-500 to-emerald-500 hover:from-cyan-600 hover:to-emerald-600 text-white font-bold py-6 text-lg shadow-xl"
                  data-testid="button-buy-aquacafe"
                >
                  <ShoppingCart className="mr-2 w-5 h-5 flex-shrink-0" />
                  Order Now with PayPal/Stripe
                </Button>
              </div>
            </div>
            
            {/* Always-visible button to explore more products */}
            <div className="mt-6 text-center">
              <Link href="/aquacafe">
                <Button 
                  size="lg" 
                  className="bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white font-bold px-8 py-4 text-lg shadow-xl transform hover:scale-105 transition-all"
                  data-testid="button-explore-water-products"
                >
                  <Droplets className="mr-2 w-6 h-6 flex-shrink-0" />
                  Explore All Water Filtration Products
                </Button>
              </Link>
              <p className="text-gray-400 text-sm mt-2">
                See shower filters, RO systems, and more
              </p>
            </div>
          </div>
        </div>

        {/* Main CTA to AquaCafe */}
        <div className="mb-8 animate-in slide-in-from-top duration-500">
          <div className="glass rounded-2xl p-8 border border-green-500/50 bg-gradient-to-br from-green-500/10 to-emerald-500/10 text-center">
            <h3 className="text-3xl font-bold text-white mb-4">Want More Options?</h3>
            <p className="text-gray-300 mb-6 max-w-2xl mx-auto">
              Explore our full range of premium water products and Icelandic Glacial water delivery
            </p>
            <Link href="/aquacafe">
              <Button 
                size="lg" 
                className="bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white font-bold px-12 py-6 text-2xl shadow-2xl transform hover:scale-105 transition-all rounded-full"
                data-testid="button-main-aquacafe-cta"
              >
                <Droplets className="mr-3 w-8 h-8 flex-shrink-0" />
                View All AquaCafe Products
              </Button>
            </Link>
            <div className="mt-4 flex items-center justify-center gap-6 text-sm text-gray-400">
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-green-400" />
                <span>Free Delivery</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-green-400" />
                <span>Secure Checkout</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-green-400" />
                <span>Premium Quality</span>
              </div>
            </div>
          </div>
        </div>
        </>
        )}
      </div>
    </section>
  );
}

// Step 2: Sell iPhone Section
function StepSellIPhone() {
  const [isExpanded, setIsExpanded] = useState(false);
  const [selectedModel, setSelectedModel] = useState("iPhone 15 Pro");
  const [selectedCondition, setSelectedCondition] = useState("excellent");
  const [selectedStorage, setSelectedStorage] = useState("256");
  
  const phoneValues: Record<string, Record<string, number>> = {
    "iPhone 16 Pro Max": { "128": 3600, "256": 3800, "512": 4000, "1024": 4200 },
    "iPhone 16 Pro": { "128": 3200, "256": 3400, "512": 3600 },
    "iPhone 15 Pro Max": { "128": 3000, "256": 3200, "512": 3400 },
    "iPhone 15 Pro": { "128": 2700, "256": 2900, "512": 3100 },
    "iPhone 14 Pro": { "128": 2000, "256": 2200, "512": 2400 },
    "iPhone 14": { "128": 1600, "256": 1800, "512": 2000 },
    "iPhone 13 Pro": { "128": 1300, "256": 1500, "512": 1700 },
    "iPhone 13": { "128": 1000, "256": 1200, "512": 1400 },
  };
  
  const conditionMultipliers: Record<string, number> = {
    "excellent": 1.0,
    "good": 0.85,
    "fair": 0.7,
  };
  
  const calculateTradeInValue = () => {
    const modelValues = phoneValues[selectedModel];
    if (!modelValues) return 0;
    const baseValue = modelValues[selectedStorage] || 0;
    const multiplier = conditionMultipliers[selectedCondition] || 0;
    return Math.round(baseValue * multiplier);
  };
  
  return (
    <section className="py-8 px-4 mb-8" data-section="step-2">
      <div className="max-w-4xl mx-auto">
        <ProgressIndicator currentStep={2} />
        
        <div className="text-center mb-8">
          <h2 className="text-3xl md:text-5xl font-black mb-4">
            <button
              className="cursor-pointer hover:scale-105 transition-all duration-300 border-0 bg-transparent p-0 inline-flex items-center gap-3"
              onClick={() => setIsExpanded(!isExpanded)}
              aria-expanded={isExpanded}
              aria-label="Toggle Sell iPhone section"
              data-testid="toggle-sell-iphone"
            >
              <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                Sell Your iPhone
              </span>
              {isExpanded ? (
                <ChevronUp className="w-8 h-8 text-purple-400" />
              ) : (
                <ChevronDown className="w-8 h-8 text-purple-400" />
              )}
            </button>
          </h2>
          <p className="text-lg text-gray-300 max-w-2xl mx-auto">
            Upgrade your lifestyle sustainably
          </p>

          {/* iPhone Trade-In Lifestyle Banner - Always Visible */}
          <div className="max-w-3xl mx-auto mt-6 rounded-2xl overflow-hidden border border-purple-500/50 shadow-2xl bg-gradient-to-br from-purple-600/20 to-pink-600/20 p-2 backdrop-blur-sm">
            <div className="bg-slate-900/50 rounded-xl p-6">
              <div className="flex flex-col md:flex-row items-center gap-6">
                <div className="flex-1">
                  <img 
                    src={iphoneTradeInLifestyle} 
                    alt="Planet Hero Package: Filter Service + FREE iPhone Upgrade - Trade in your device and get premium water filtration with AquaCafe loyalty benefits" 
                    className="w-full h-auto rounded-lg shadow-lg"
                    data-testid="img-iphone-tradein-banner"
                  />
                </div>
                <div className="flex-1 text-center md:text-left">
                  <div className="inline-flex items-center bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-full px-6 py-2 mb-3 font-bold animate-pulse">
                    <Smartphone className="w-5 h-5 mr-2 flex-shrink-0" />
                    <span>TRADE-IN PROGRAM</span>
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-2">Planet Hero Package</h3>
                  <p className="text-gray-300 mb-4">
                    Filter Service + <span className="text-purple-400 font-bold">FREE iPhone Upgrade</span> - Trade your device for sustainable living rewards
                  </p>
                  <div className="flex flex-wrap gap-2 justify-center md:justify-start">
                    <span className="bg-purple-500/20 text-purple-400 px-3 py-1 rounded-full text-sm font-bold">Instant Quote</span>
                    <span className="bg-pink-500/20 text-pink-400 px-3 py-1 rounded-full text-sm font-bold">Free Pickup</span>
                    <span className="bg-blue-500/20 text-blue-400 px-3 py-1 rounded-full text-sm font-bold">Cash or Points</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* CTA to Sell iPhone - Always Visible Below Banner */}
          <div className="mt-6">
            <Link href="/exchange">
              <Button
                size="lg"
                className="w-full max-w-md mx-auto flex items-center justify-center gap-3 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-bold px-12 py-6 text-xl shadow-2xl transform hover:scale-105 transition-all rounded-full"
                data-testid="button-sell-iphone-cta"
              >
                <Smartphone className="w-6 h-6 flex-shrink-0" />
                <span>Sell Your iPhone</span>
              </Button>
            </Link>
            <p className="text-center text-gray-400 text-sm mt-3">
              Get instant cash or trade-in value for your old iPhone
            </p>
          </div>
        </div>

        {isExpanded && (
        <>
        {/* iPhone Trade-In Calculator */}
        <div className="glass rounded-2xl p-8 border border-purple-500/50 bg-gradient-to-br from-purple-500/10 to-pink-500/10 mb-8 animate-in slide-in-from-top duration-500">
          <div className="text-center mb-6">
            <div className="inline-flex items-center gap-2 bg-purple-500/20 text-purple-400 px-4 py-2 rounded-full mb-4">
              <Calculator className="w-5 h-5" />
              <span className="font-bold">📱 INSTANT VALUATION</span>
            </div>
            <h3 className="text-2xl font-bold text-white mb-2">Check Your iPhone Value</h3>
            <p className="text-gray-300 text-sm">
              Get an instant quote for your iPhone in seconds
            </p>
          </div>

          {/* Interactive Calculator */}
          <div className="max-w-2xl mx-auto mb-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
              {/* Model Selection */}
              <div>
                <label className="block text-white font-medium mb-3">Select Model</label>
                <select
                  value={selectedModel}
                  onChange={(e) => setSelectedModel(e.target.value)}
                  className="w-full bg-slate-800/80 border border-purple-400/30 rounded-lg px-4 py-3 text-white focus:border-purple-400 focus:outline-none focus:ring-2 focus:ring-purple-400/20"
                  data-testid="select-iphone-model-sell"
                >
                  {Object.keys(phoneValues).map((model) => (
                    <option key={model} value={model}>{model}</option>
                  ))}
                </select>
              </div>

              {/* Storage Selection */}
              <div>
                <label className="block text-white font-medium mb-3">Storage</label>
                <select
                  value={selectedStorage}
                  onChange={(e) => setSelectedStorage(e.target.value)}
                  className="w-full bg-slate-800/80 border border-purple-400/30 rounded-lg px-4 py-3 text-white focus:border-purple-400 focus:outline-none focus:ring-2 focus:ring-purple-400/20"
                  data-testid="select-storage"
                >
                  {Object.keys(phoneValues[selectedModel] || {}).map((storage) => (
                    <option key={storage} value={storage}>{storage}GB</option>
                  ))}
                </select>
              </div>

              {/* Condition Selection */}
              <div>
                <label className="block text-white font-medium mb-3">Condition</label>
                <select
                  value={selectedCondition}
                  onChange={(e) => setSelectedCondition(e.target.value)}
                  className="w-full bg-slate-800/80 border border-purple-400/30 rounded-lg px-4 py-3 text-white focus:border-purple-400 focus:outline-none focus:ring-2 focus:ring-purple-400/20"
                  data-testid="select-condition-sell"
                >
                  <option value="excellent">Excellent (100%)</option>
                  <option value="good">Good (85%)</option>
                  <option value="fair">Fair (70%)</option>
                </select>
              </div>
            </div>

            {/* Calculated Value Display */}
            <div className="bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-2xl p-8 border-2 border-purple-400/50 text-center">
              <div className="text-gray-300 text-sm mb-2">Your Instant Quote</div>
              <div className="text-5xl font-black text-purple-400 mb-2" data-testid="text-sell-value">
                AED {calculateTradeInValue().toLocaleString()}
              </div>
              <div className="text-gray-400 text-sm mb-4">
                💰 Choose cash payout or redeem for AquaCafe loyalty points
              </div>
              <div className="flex flex-wrap gap-3 justify-center">
                <Button 
                  size="lg"
                  className="bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600"
                  data-testid="button-cash-payout"
                >
                  💵 Get Cash via Stripe
                </Button>
                <Button 
                  size="lg"
                  variant="outline"
                  className="border-blue-400/50 text-blue-400 hover:bg-blue-500/20"
                  data-testid="button-loyalty-points"
                >
                  💧 Redeem for AquaCafe Points
                </Button>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-r from-purple-500/10 to-pink-500/10 rounded-xl p-6 border border-purple-400/30">
            <h4 className="text-lg font-bold text-white mb-3 text-center">How It Works</h4>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-sm">
              <div className="text-center">
                <div className="w-12 h-12 bg-purple-500/20 rounded-full flex items-center justify-center mx-auto mb-2">
                  <span className="text-2xl">1️⃣</span>
                </div>
                <div className="text-white font-bold mb-1">Get Quote</div>
                <div className="text-gray-400">Select your model & condition</div>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-purple-500/20 rounded-full flex items-center justify-center mx-auto mb-2">
                  <span className="text-2xl">2️⃣</span>
                </div>
                <div className="text-white font-bold mb-1">Ship or Drop-off</div>
                <div className="text-gray-400">Free pickup for loyalty members on trade-ins</div>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-purple-500/20 rounded-full flex items-center justify-center mx-auto mb-2">
                  <span className="text-2xl">3️⃣</span>
                </div>
                <div className="text-white font-bold mb-1">Get Paid</div>
                <div className="text-gray-400">Cash or loyalty points</div>
              </div>
            </div>
          </div>
        </div>
        </>
        )}
      </div>
    </section>
  );
}

// Membership Benefits Section - Uniform Format Following Step 2 Pattern
function MembershipBenefitsSection({ onJoinMembership }: { onJoinMembership?: () => void }) {
  const [isExpanded, setIsExpanded] = useState(false);

  const handleJoinClick = () => {
    if (onJoinMembership) {
      onJoinMembership();
    }
  };

  return (
    <section className="py-8 px-4 mb-8" data-section="membership-benefits">
      <div className="max-w-4xl mx-auto">
        
        <div className="text-center mb-8">
          <h2 className="text-3xl md:text-5xl font-black mb-4 text-white">
            <button
              className="cursor-pointer hover:scale-105 transition-all duration-300 border-0 bg-transparent p-0 inline-flex items-center gap-3"
              onClick={() => setIsExpanded(!isExpanded)}
              aria-expanded={isExpanded}
              aria-label="Toggle Become a Member section"
              data-testid="toggle-membership-offer"
            >
              <span className="bg-gradient-to-r from-amber-400 to-orange-500 bg-clip-text text-transparent">
                FREE Membership + Welcome Bonus
              </span>
              {isExpanded ? (
                <ChevronUp className="w-8 h-8 text-amber-400" />
              ) : (
                <ChevronDown className="w-8 h-8 text-amber-400" />
              )}
            </button>
          </h2>
          <p className="text-lg text-gray-300 max-w-2xl mx-auto mb-4">
            <span className="text-amber-400 font-bold">AED 99</span> Loyalty Starter Kit: FREE Shower Filter + Chill & Grill D100 Voucher
          </p>
          
          {/* Always Visible Banner - Membership Card + Chill & Grill Offer */}
          <div className="max-w-3xl mx-auto mt-6 rounded-2xl overflow-hidden border border-amber-500/50 shadow-2xl bg-gradient-to-br from-amber-600/20 to-orange-600/20 p-2 backdrop-blur-sm">
            <div className="bg-slate-900/50 rounded-xl p-6">
              <div className="flex flex-col md:flex-row items-center gap-6">
                <div className="flex-1">
                  <img 
                    src={membershipCard} 
                    alt="AquaCafe Membership Card" 
                    className="w-full h-auto rounded-lg shadow-lg"
                    data-testid="img-membership-card-banner"
                  />
                </div>
                <div className="flex-1 text-center md:text-left">
                  <div className="inline-flex items-center bg-gradient-to-r from-amber-500 to-orange-500 text-black rounded-full px-6 py-2 mb-3 font-bold animate-pulse">
                    <Gift className="w-5 h-5 mr-2 flex-shrink-0" />
                    <span>LOYALTY PROGRAM</span>
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-2">AED 99 Starter Kit Benefits</h3>
                  <p className="text-gray-300 mb-4">
                    Get FREE Shower Filter (AED 399) + Discounted Installation for Loyalty Members + Chill & Grill D100 Voucher + 1000 Loyalty Points
                  </p>
                  <div className="flex flex-wrap gap-2 justify-center md:justify-start">
                    <span className="bg-cyan-500/20 text-cyan-400 px-3 py-1 rounded-full text-sm font-bold">Membership Card</span>
                    <span className="bg-orange-500/20 text-orange-400 px-3 py-1 rounded-full text-sm font-bold">Chill & Grill D100</span>
                    <span className="bg-purple-500/20 text-purple-400 px-3 py-1 rounded-full text-sm font-bold">Lifetime Access</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* CTA to Join Loyalty - Always Visible */}
          <div className="mt-6">
            <Button
              onClick={handleJoinClick}
              size="lg"
              className="w-full max-w-md mx-auto flex items-center justify-center gap-3 bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-black font-bold px-12 py-6 text-xl shadow-2xl transform hover:scale-105 transition-all rounded-full"
              data-testid="button-join-loyalty-membership"
            >
              <Rocket className="w-6 h-6 flex-shrink-0" />
              <span>JOIN LOYALTY - AED 99</span>
            </Button>
          </div>
        </div>

        {/* Expanded Content - Full Details */}
        {isExpanded && (
          <div className="animate-in slide-in-from-top duration-500">
            <div className="glass rounded-2xl p-8 border border-amber-500/30 bg-gradient-to-br from-amber-900/20 to-hero-green-900/20 mb-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                
                {/* Left Column: AquaCafe Membership Details */}
                <Card className="bg-gradient-to-br from-cyan-500/10 to-blue-500/10 border-cyan-500/30 overflow-hidden" data-testid="card-aquacafe-membership">
                  <div className="p-6">
                    <div className="text-center mb-4">
                      <div className="inline-flex items-center gap-2 bg-cyan-500/20 text-cyan-400 px-4 py-2 rounded-full mb-4">
                        <Award className="w-5 h-5" />
                        <span className="font-bold">AquaCafe Membership</span>
                      </div>
                      <h3 className="text-2xl font-bold text-white mb-2">Loyalty Member Level 2</h3>
                      <p className="text-cyan-300 text-sm">Complete Benefits Package</p>
                    </div>

                    {/* Benefits List */}
                    <div className="space-y-3 mb-6">
                      <div className="flex items-start gap-3">
                        <Gift className="w-5 h-5 text-amber-400 flex-shrink-0 mt-0.5" />
                        <div className="text-sm text-gray-300">
                          <span className="font-bold text-white">FREE Ionic Shower Filter</span> (AED 399 value)
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <CheckCircle className="w-5 h-5 text-hero-green-400 flex-shrink-0 mt-0.5" />
                        <div className="text-sm text-gray-300">
                          <span className="font-bold text-white">Discounted Installation for Loyalty Members</span>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <Star className="w-5 h-5 text-blue-400 flex-shrink-0 mt-0.5" />
                        <div className="text-sm text-gray-300">
                          <span className="font-bold text-white">1000 Loyalty Points</span> + 2X multiplier
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <Crown className="w-5 h-5 text-purple-400 flex-shrink-0 mt-0.5" />
                        <div className="text-sm text-gray-300">
                          <span className="font-bold text-white">Lifetime Member Benefits</span> & special offers
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <Utensils className="w-5 h-5 text-orange-400 flex-shrink-0 mt-0.5" />
                        <div className="text-sm text-gray-300">
                          <span className="font-bold text-white">Chill & Grill D100 Voucher</span> included
                        </div>
                      </div>
                    </div>

                    {/* Payment Options */}
                    <div className="bg-white/5 rounded-xl p-4 mb-4">
                      <div className="text-center">
                        <div className="text-sm text-gray-400 mb-2">Payment Options Available</div>
                        <div className="flex justify-center gap-3">
                          <span className="text-2xl">💳</span>
                          <span className="text-xl text-white font-bold">PayPal & Stripe</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </Card>

                {/* Right Column: Chill & Grill Offer Details */}
                <Card className="bg-gradient-to-br from-orange-500/10 to-pink-500/10 border-orange-500/30 overflow-hidden" data-testid="card-chill-grill-offer">
                  <div className="p-6">
                    <div className="text-center mb-4">
                      <div className="inline-flex items-center gap-2 bg-orange-500/20 text-orange-400 px-4 py-2 rounded-full mb-4">
                        <Utensils className="w-5 h-5" />
                        <span className="font-bold">Partner Benefit</span>
                      </div>
                      <h3 className="text-2xl font-bold text-white mb-2">Chill & Grill Dubai</h3>
                      <p className="text-orange-300 text-sm">Pizza + Boba Tea for Two</p>
                    </div>

                    {/* Pizza & Boba Image */}
                    <div className="mb-6">
                      <img 
                        src={pizzaBobaComboImage} 
                        alt="Pizza and Boba Tea" 
                        className="w-full h-auto rounded-xl shadow-2xl border border-orange-500/30"
                        data-testid="img-pizza-boba-combo"
                      />
                    </div>

                    {/* Offer Details */}
                    <div className="bg-gradient-to-r from-amber-500/20 to-orange-500/20 rounded-xl p-4 mb-6 border border-amber-500/30">
                      <div className="text-center mb-3">
                        <div className="text-3xl font-bold text-amber-400 mb-1">D100 Voucher</div>
                        <div className="text-sm text-gray-300">FREE with membership + every referral!</div>
                      </div>
                    </div>

                    {/* Benefits */}
                    <div className="space-y-3 mb-6">
                      <div className="flex items-start gap-3">
                        <Gift className="w-5 h-5 text-pink-400 flex-shrink-0 mt-0.5" />
                        <div className="text-sm text-gray-300">
                          <span className="font-bold text-white">Instant D100 Voucher</span> with AED 99 membership
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <Users className="w-5 h-5 text-purple-400 flex-shrink-0 mt-0.5" />
                        <div className="text-sm text-gray-300">
                          <span className="font-bold text-white">D100 per Referral</span> for you & your friend
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <MapPin className="w-5 h-5 text-orange-400 flex-shrink-0 mt-0.5" />
                        <div className="text-sm text-gray-300">
                          <span className="font-bold text-white">Home Delivery</span> via AquaCafe platform
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <Clock className="w-5 h-5 text-blue-400 flex-shrink-0 mt-0.5" />
                        <div className="text-sm text-gray-300">
                          <span className="font-bold text-white">90-day validity</span> on all vouchers
                        </div>
                      </div>
                    </div>
                  </div>
                </Card>

              </div>
            </div>

            {/* After signup message */}
            <div className="text-center py-6 bg-slate-800/50 rounded-xl border border-slate-600 mb-8">
              <p className="text-gray-300 text-lg mb-2">
                <span className="text-hero-green-400 font-bold">Ready to Start?</span> Click "JOIN LOYALTY" above or explore water filtration packages below ⬇️
              </p>
            </div>
          </div>
        )}

        {/* Trust Indicators */}
        <div className="text-center mt-8">
          <p className="text-gray-400 text-sm">
            🔒 Secure PayPal & Stripe Checkout • ⚡ Instant Activation • 🌍 Environmental Impact
          </p>
        </div>
      </div>
    </section>
  );
}


export function HeroChallengeLanding() {
  const { data: stats } = useImpactStats();
  const { isRegistered } = useImageServiceWorker();
  const [showHeroRegistration, setShowHeroRegistration] = useState(false);
  const [showMissionSelection, setShowMissionSelection] = useState(false);
  const [registeredHero, setRegisteredHero] = useState<any>(null);
  
  return (
    <section className="relative py-12 sm:py-20 px-4 overflow-hidden">
      {/* iPhone Water Circular Exchange Background */}
      <div className="absolute inset-0">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `url('/attached_assets/generated_images/iPhone_water_circular_exchange_e4541c3c.png')`,
            backgroundSize: 'cover',
            backgroundPosition: 'center center',
          }}
        />
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_25%_25%,rgba(34,197,94,0.3)_0%,transparent_50%)]"></div>
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_75%_75%,rgba(59,130,246,0.3)_0%,transparent_50%)]"></div>
        </div>
        <div className="absolute top-10 right-10 w-20 h-20 bg-hero-green-500/10 rounded-full blur-xl animate-float"></div>
        <div className="absolute top-32 left-10 w-16 h-16 bg-blue-500/10 rounded-full blur-lg animate-float-delayed"></div>
        <div className="absolute bottom-32 right-32 w-24 h-24 bg-purple-500/10 rounded-full blur-xl animate-pulse-slow"></div>
        <div className="absolute bottom-20 left-20 w-12 h-12 bg-amber-500/10 rounded-full blur-lg animate-bounce-slow"></div>
        <div className="absolute top-0 left-0 w-full h-1/4 bg-gradient-to-b from-hero-green-900/10 to-transparent"></div>
        <div className="absolute bottom-0 left-0 w-full h-1/4 bg-gradient-to-t from-dubai-blue-900/10 to-transparent"></div>
      </div>
      <div className="max-w-7xl mx-auto relative z-10">

        {/* Step 0: Membership Pre-Step (Collapsed by default) */}
        <div data-section="step-0" className="mb-16">
          <MembershipBenefitsSection onJoinMembership={() => setShowHeroRegistration(true)} />
        </div>

        {/* 3-Way Path Selector - Start Your Journey */}
        <div className="flex justify-center my-16">
          <div className="flex flex-col md:flex-row items-center gap-8">
            {/* Path 1: Shop Smart */}
            <button
              onClick={() => {
                const step1Section = document.querySelector('[data-section="step-1"]');
                if (step1Section) {
                  step1Section.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }
              }}
              className="flex flex-col items-center cursor-pointer hover:scale-105 transition-all duration-300 border-0 bg-transparent p-0"
              aria-label="Start Your Journey - Shop Smart"
              data-testid="button-scroll-step-1"
            >
              <div className="w-1 h-12 bg-gradient-to-b from-purple-500 to-green-500 mb-2"></div>
              <div className="w-14 h-14 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full flex items-center justify-center animate-pulse shadow-2xl border-4 border-white/20">
                <ShoppingCart className="w-7 h-7 text-white" />
              </div>
              <div className="w-1 h-12 bg-gradient-to-b from-green-500 to-emerald-500 mt-2"></div>
              <div className="text-xs text-green-400 mt-3 font-bold">SHOP SMART</div>
            </button>

            {/* Path 2: Sell iPhone */}
            <button
              onClick={() => {
                const step2Section = document.querySelector('[data-section="step-2"]');
                if (step2Section) {
                  step2Section.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }
              }}
              className="flex flex-col items-center cursor-pointer hover:scale-105 transition-all duration-300 border-0 bg-transparent p-0"
              aria-label="Start Your Journey - Sell iPhone"
              data-testid="button-scroll-step-2"
            >
              <div className="w-1 h-12 bg-gradient-to-b from-purple-500 to-pink-500 mb-2"></div>
              <div className="w-14 h-14 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center animate-pulse shadow-2xl border-4 border-white/20">
                <Smartphone className="w-7 h-7 text-white" />
              </div>
              <div className="w-1 h-12 bg-gradient-to-b from-pink-500 to-purple-500 mt-2"></div>
              <div className="text-xs text-purple-400 mt-3 font-bold">SELL IPHONE</div>
            </button>

            {/* Path 3: Play to Create Impact */}
            <button
              onClick={() => {
                const step3Section = document.querySelector('[data-section="step-3"]');
                if (step3Section) {
                  step3Section.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }
              }}
              className="flex flex-col items-center cursor-pointer hover:scale-105 transition-all duration-300 border-0 bg-transparent p-0"
              aria-label="Start Your Journey - Play to Create Impact"
              data-testid="button-scroll-step-3"
            >
              <div className="w-1 h-12 bg-gradient-to-b from-indigo-500 to-blue-500 mb-2"></div>
              <div className="w-14 h-14 bg-gradient-to-r from-indigo-500 to-blue-500 rounded-full flex items-center justify-center animate-pulse shadow-2xl border-4 border-white/20">
                <Play className="w-7 h-7 text-white" />
              </div>
              <div className="w-1 h-12 bg-gradient-to-b from-blue-500 to-cyan-500 mt-2"></div>
              <div className="text-xs text-blue-400 mt-3 font-bold">CREATE IMPACT</div>
            </button>
          </div>
        </div>

        {/* 3-Step Progressive Flow with Visual Connectors */}
        {/* Step 1: Shop Smart */}
        <div data-section="step-1">
          <StepTwoExchange />
        </div>

        {/* Flow Connector 1→2 */}
        <div className="flex justify-center mb-8">
          <div className="flex flex-col items-center">
            <div className="w-1 h-12 bg-gradient-to-b from-green-500 to-purple-500 mb-2"></div>
            <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-purple-500 rounded-full flex items-center justify-center animate-pulse shadow-lg">
              <ArrowDown className="w-6 h-6 text-white" />
            </div>
            <div className="w-1 h-12 bg-gradient-to-b from-purple-500 to-pink-500 mt-2"></div>
            <div className="text-xs text-gray-400 mt-2 font-bold">NEXT STEP</div>
          </div>
        </div>

        {/* Step 2: Sell iPhone */}
        <div data-section="step-2">
          <StepSellIPhone />
        </div>

        {/* Flow Connector 2→3 */}
        <div className="flex justify-center mb-8">
          <div className="flex flex-col items-center">
            <div className="w-1 h-12 bg-gradient-to-b from-purple-500 to-indigo-500 mb-2"></div>
            <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-indigo-500 rounded-full flex items-center justify-center animate-pulse shadow-lg">
              <ArrowDown className="w-6 h-6 text-white" />
            </div>
            <div className="w-1 h-12 bg-gradient-to-b from-indigo-500 to-purple-500 mt-2"></div>
            <div className="text-xs text-gray-400 mt-2 font-bold">FINAL STEP</div>
          </div>
        </div>

        {/* Step 3: Create Impact (Play & Gamification) */}
        <div data-section="step-3">
          <StepOnePlay onJoinMission={() => setShowHeroRegistration(true)} />
        </div>

        {/* Stars Sponsorship Section - Post-Step Revenue Upsell */}
        <div data-section="stars-support" className="mt-16 mb-12">
          <StarsSponsorshipSection />
        </div>
      </div>

      {/* Hero Registration Modal */}
      <HeroRegistrationModal 
        open={showHeroRegistration}
        onClose={() => setShowHeroRegistration(false)}
        onSuccess={(hero) => {
          setRegisteredHero(hero);
          setShowHeroRegistration(false);
          setShowMissionSelection(true);
        }}
      />

      {/* Mission Selection Modal */}
      <MissionSelectionModal 
        open={showMissionSelection}
        onClose={() => setShowMissionSelection(false)}
        hero={registeredHero}
        onMissionSelect={(mission) => {
          setShowMissionSelection(false);
          // Navigate to dashboard with mission
          window.location.href = `/dashboard?mission=${mission.id}`;
        }}
      />
    </section>
  );
}