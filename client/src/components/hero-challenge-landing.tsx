import { useState, useEffect } from "react";
import { Star, Clock, Users, Zap, Trophy, Target, Timer, Calculator, Smartphone, Leaf, ShoppingCart, Crown, Gift, Shield, CheckCircle, Building, Handshake, Heart, Sparkles, ChevronRight, Award, TrendingUp, ArrowRight, Gamepad2, Repeat, Droplets, Home, Package, Truck, Utensils, ArrowDown, BarChart, X, User, Mail, Phone, MapPin, ChevronDown, ChevronUp, Play, Copy, QrCode } from "lucide-react";
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
import pizzaImage from "@assets/stock_images/delicious_pizza_clos_ace0f742.jpg";
import bobaTeaImage from "@assets/stock_images/kulfi_indian_ice_cre_64eeba10.jpg";
import happyDiningImage from "@assets/stock_images/happy_people_eating__21b9cf0b.jpg";

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
function ProgressIndicator({ currentStep }: { currentStep: 1 | 2 | 3 | 4 }) {
  const stepConfig = {
    1: { icon: ShoppingCart, label: "Shop Smart" },
    2: { icon: Smartphone, label: "Sell iPhone" },
    3: { icon: Gift, label: "Claim Loyalty Rewards" },  
    4: { icon: Play, label: "Create Impact" }
  };

  return (
    <div className="flex items-center justify-center mb-8 overflow-x-auto">
      <div className="flex items-center space-x-4 sm:space-x-6 px-4">
        {[1, 2, 3, 4].map((step) => {
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
                {step < 4 && (
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
  );
}

// Step 4: Create Impact Section (Play - Standalone)
function StepOnePlay({ onJoinMission }: { onJoinMission: () => void }) {
  const [heroId] = useState("demo-hero-id"); // Demo hero ID for tombola
  const [isExpanded, setIsExpanded] = useState(false);
  
  return (
    <section className="py-8 px-4 mb-8 relative overflow-hidden" data-section="step-4">
      {/* Metaverse background effects */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 via-indigo-900/20 to-blue-900/20"></div>
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-10 left-10 w-2 h-2 bg-purple-400 rounded-full animate-pulse"></div>
        <div className="absolute top-20 right-16 w-3 h-3 bg-blue-400 rounded-full animate-pulse delay-300"></div>
        <div className="absolute bottom-20 left-16 w-2 h-2 bg-pink-400 rounded-full animate-pulse delay-700"></div>
        <div className="absolute bottom-10 right-10 w-4 h-4 bg-cyan-400 rounded-full animate-pulse delay-1000"></div>
      </div>
      
      <div className="max-w-4xl mx-auto relative z-10">
        <ProgressIndicator currentStep={4} />
        
        <div className="text-center mb-8">
          <h2 className="text-3xl md:text-5xl font-black mb-4">
            <button
              className="cursor-pointer hover:scale-105 transition-all duration-300 border-0 bg-transparent p-0 inline-flex items-center gap-3"
              onClick={() => setIsExpanded(!isExpanded)}
              aria-expanded={isExpanded}
              aria-label="Toggle Create Impact section"
              data-testid="toggle-create-impact"
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
          <p className="text-lg text-gray-300 max-w-2xl mx-auto">
            Your actions fund recycling drives, water renewal, and food security programs across Dubai & Pakistan. 
            <span className="text-purple-400 font-bold">Visit the Play page to start your Planet Points journey!</span>
          </p>

          {/* Planet Heroes Gaming Banner - Always Visible */}
          <div className="max-w-3xl mx-auto mt-6 rounded-2xl overflow-hidden border border-purple-500/50 shadow-2xl bg-gradient-to-br from-purple-600/20 to-indigo-600/20 p-2 backdrop-blur-sm">
            <div className="bg-slate-900/50 rounded-xl p-6">
              <img 
                src={planetHeroesGaming} 
                alt="Planet Heroes Environmental Gaming - Create Impact Through Play" 
                className="w-full h-auto rounded-lg shadow-lg"
              />
            </div>
          </div>
        </div>

        {/* Play Mission Info Section */}
        {isExpanded && (
        <>
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
                    className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-bold px-8 py-4 text-xl shadow-2xl transform hover:scale-105 transition-all rounded-full"
                    data-testid="button-visit-play-page"
                  >
                    <Gamepad2 className="mr-3 w-6 h-6" />
                    Visit Play Page
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

        {/* Win Aqua Show - La Perle Tombola Prizes */}
        <div className="glass rounded-2xl p-8 border border-cyan-500/50 bg-gradient-to-br from-blue-950/30 to-cyan-950/30 relative overflow-hidden animate-in slide-in-from-top duration-700 mt-8">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-3 bg-gradient-to-r from-blue-500/20 to-cyan-500/20 px-8 py-4 rounded-full mb-6 border border-cyan-400/50">
              <Gift className="w-8 h-8 text-cyan-300 animate-spin" />
              <span className="text-2xl font-bold text-white">🌊 WIN AQUA SHOW TICKETS</span>
              <Trophy className="w-8 h-8 text-blue-300 animate-bounce" />
            </div>
            
            <h3 className="text-3xl md:text-5xl font-bold text-white mb-4">
              La Perle by Dragone
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 to-blue-300 mt-2">
                Premium Experience Prizes
              </span>
            </h3>
            
            <p className="text-lg text-white/90 max-w-3xl mx-auto mb-6">
              Premium members can now win exclusive <strong>La Perle by Dragone</strong> aqua show experience tickets through our enhanced tombola system!
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 mb-8">
            {/* Silver Experience */}
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-gray-300/20 hover:bg-white/15 transition-all duration-300 transform hover:scale-105">
              <div className="text-center">
                <div className="w-14 h-14 bg-gray-400 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Award className="w-7 h-7 text-white" />
                </div>
                <h4 className="text-xl font-bold text-white mb-3">🥈 Silver Experience</h4>
                <div className="text-3xl font-bold text-gray-300 mb-2">5% Chance</div>
                <div className="text-white/70 text-sm mb-4">Premium seating</div>
                <div className="space-y-1 text-xs text-white/60">
                  <div>✨ Silver section seating</div>
                  <div>🎭 Full show experience</div>
                  <div>📅 6-month validity</div>
                  <div>🏆 200 XP + 300 Points</div>
                </div>
              </div>
            </div>

            {/* Gold Experience */}
            <div className="bg-white/15 backdrop-blur-sm rounded-2xl p-6 border-2 border-yellow-400/40 hover:bg-white/20 transition-all duration-300 transform hover:scale-105 shadow-xl shadow-yellow-400/20">
              <div className="text-center">
                <div className="w-14 h-14 bg-yellow-500 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Crown className="w-7 h-7 text-white" />
                </div>
                <h4 className="text-xl font-bold text-white mb-3">🥇 Gold Experience</h4>
                <div className="text-3xl font-bold text-yellow-400 mb-2">1% Chance</div>
                <div className="text-white/70 text-sm mb-4">Premium + refreshments</div>
                <div className="space-y-1 text-xs text-white/60">
                  <div>⭐ Gold section seating</div>
                  <div>🥂 Welcome refreshments</div>
                  <div>📅 6-month validity</div>
                  <div>🏆 500 XP + 750 Points</div>
                </div>
              </div>
            </div>

            {/* VIP Experience */}
            <div className="bg-gradient-to-br from-purple-500/20 to-pink-500/20 backdrop-blur-sm rounded-2xl p-6 border-2 border-purple-400/50 hover:from-purple-500/30 hover:to-pink-500/30 transition-all duration-300 transform hover:scale-105 shadow-xl shadow-purple-400/30">
              <div className="text-center">
                <div className="w-14 h-14 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Sparkles className="w-7 h-7 text-white animate-pulse" />
                </div>
                <h4 className="text-xl font-bold text-white mb-3">💎 VIP Experience</h4>
                <div className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400 mb-2">0.5% Chance</div>
                <div className="text-white/70 text-sm mb-4">Ultimate experience</div>
                <div className="space-y-1 text-xs text-white/60">
                  <div>👑 VIP section seating</div>
                  <div>🎭 Backstage tour</div>
                  <div>🍽️ Premium dinner</div>
                  <div>🏆 1000 XP + 1500 Points</div>
                </div>
              </div>
            </div>
          </div>

          <div className="text-center">
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
              <p className="text-white/90 text-base mb-4">
                Premium members get exclusive access to these extraordinary entertainment experiences!
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <Link href="/play">
                  <Button className="bg-gradient-to-r from-cyan-400 to-blue-500 text-white hover:from-cyan-500 hover:to-blue-600 text-lg px-8 py-3 rounded-full font-bold shadow-xl transition-all duration-300 hover:scale-105" data-testid="button-play-tombola">
                    <Gift className="w-5 h-5 mr-2" />
                    🎰 Play Tombola Now
                  </Button>
                </Link>
                
                <a 
                  href="https://www.laperle.com" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="bg-gradient-to-r from-blue-500 to-purple-500 text-white hover:from-blue-600 hover:to-purple-600 px-6 py-3 rounded-full font-bold shadow-lg transition-all duration-300 hover:scale-105"
                  data-testid="button-laperle-website"
                >
                  🎭 Visit laperle.com
                </a>
              </div>
              
              <div className="text-xs text-white/70 mt-3">
                ✨ Premium membership required for enhanced tombola prizes ✨
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
                className="w-full max-w-md mx-auto block bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white font-bold px-12 py-6 text-xl shadow-2xl transform hover:scale-105 transition-all rounded-full"
                data-testid="button-view-aquacafe-products"
              >
                <Droplets className="mr-3 w-6 h-6" />
                View All Filtration Products
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
                  <ShoppingCart className="mr-2 w-5 h-5" />
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
                  <ShoppingCart className="mr-2 w-5 h-5" />
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
                  <Droplets className="mr-2 w-6 h-6" />
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
                <Droplets className="mr-3 w-8 h-8" />
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
            Get instant cash or trade-in credit for your old iPhone. Fast, secure, and hassle-free!
          </p>

          {/* iPhone Collection Banner - Always Visible */}
          <div className="max-w-3xl mx-auto mt-6 rounded-2xl overflow-hidden border border-purple-500/50 shadow-2xl bg-gradient-to-br from-purple-600/20 to-pink-600/20 p-2 backdrop-blur-sm">
            <div className="bg-slate-900/50 rounded-xl p-6">
              <img 
                src={iphoneCollection} 
                alt="Sell Your iPhone - Latest Models Accepted" 
                className="w-full h-auto rounded-lg shadow-lg"
              />
            </div>
          </div>

          {/* CTA to Sell iPhone - Always Visible Below Banner */}
          <div className="mt-6">
            <Link href="/exchange">
              <Button
                size="lg"
                className="w-full max-w-md mx-auto block bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-bold px-12 py-6 text-xl shadow-2xl transform hover:scale-105 transition-all rounded-full"
                data-testid="button-sell-iphone-cta"
              >
                <Smartphone className="mr-3 w-6 h-6" />
                Sell Your iPhone
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
                <div className="text-gray-400">Free pickup in Dubai</div>
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

// Step 3: Claim Loyalty Rewards Section (with Membership Benefits merged)
function StepThreeRewards() {
  const [isExpanded, setIsExpanded] = useState(false);
  const [claimedVoucher, setClaimedVoucher] = useState<any>(null);
  const [copied, setCopied] = useState(false);
  const { toast } = useToast();

  const referralCode = "HERO123";
  const referralLink = `${window.location.origin}/aquacafe-deal?ref=${referralCode}`;

  const claimVoucherMutation = useMutation({
    mutationFn: () => apiRequest('/api/vouchers/claim-deal', 'POST', {
      dealType: 'chill-grill-pizza-boba-tea',
    }),
    onSuccess: (data) => {
      setClaimedVoucher(data);
      toast({
        title: "Voucher Claimed! 🎉",
        description: "Your Chill & Grill voucher code is ready to use!",
      });
      queryClient.invalidateQueries({ queryKey: ['/api/vouchers/my-vouchers'] });
    },
    onError: () => {
      toast({
        title: "Claim Failed",
        description: "Please try again or contact support.",
        variant: "destructive",
      });
    },
  });

  const handleCopyReferralLink = () => {
    navigator.clipboard.writeText(referralLink);
    setCopied(true);
    toast({
      title: "Link Copied!",
      description: "Share with friends to earn rewards",
    });
    setTimeout(() => setCopied(false), 2000);
  };
  
  return (
    <section className="py-8 px-4 mb-8" data-section="step-3">
      <div className="max-w-4xl mx-auto">
        <ProgressIndicator currentStep={3} />
        
        <div className="text-center mb-8">
          <h2 className="text-3xl md:text-5xl font-black mb-4">
            <button
              className="cursor-pointer hover:scale-105 transition-all duration-300 border-0 bg-transparent p-0 inline-flex items-center gap-3"
              onClick={() => setIsExpanded(!isExpanded)}
              aria-expanded={isExpanded}
              aria-label="Toggle Claim Loyalty Rewards section"
              data-testid="toggle-claim-rewards"
            >
              <span className="bg-gradient-to-r from-amber-400 to-orange-400 bg-clip-text text-transparent">
                Claim Loyalty Rewards
              </span>
              {isExpanded ? (
                <ChevronUp className="w-8 h-8 text-amber-400" />
              ) : (
                <ChevronDown className="w-8 h-8 text-amber-400" />
              )}
            </button>
          </h2>
          <p className="text-lg text-gray-300 max-w-2xl mx-auto">
            Redeem for free meals, eco gifts, or wellness products including FREE Shower Filter.
          </p>

          {/* Chill & Grill Deal Banner - Always Visible with Lifestyle Photos */}
          <div className="max-w-3xl mx-auto mt-6 rounded-2xl overflow-hidden border border-orange-500/50 shadow-2xl bg-gradient-to-br from-orange-600/20 to-red-600/20 p-2 backdrop-blur-sm">
            <div className="bg-slate-900/50 rounded-xl p-6">
              <div className="flex flex-col md:flex-row items-center gap-6">
                {/* Left: Food Lifestyle Images */}
                <div className="flex-1">
                  <div className="grid grid-cols-3 gap-3">
                    <img 
                      src={pizzaImage} 
                      alt="Delicious Pizza" 
                      className="aspect-square rounded-lg overflow-hidden shadow-lg object-cover"
                    />
                    <img 
                      src={bobaTeaImage} 
                      alt="Boba Tea" 
                      className="aspect-square rounded-lg overflow-hidden shadow-lg object-cover"
                    />
                    <img 
                      src={happyDiningImage} 
                      alt="Happy Dining Experience" 
                      className="aspect-square rounded-lg overflow-hidden shadow-lg object-cover"
                    />
                  </div>
                </div>
                
                {/* Right: Deal Information */}
                <div className="flex-1 text-center md:text-left">
                  <div className="inline-flex items-center gap-2 bg-green-500/20 text-green-400 px-4 py-2 rounded-full mb-3">
                    <Gift className="w-5 h-5" />
                    <span className="font-bold">LOYALTY DEAL</span>
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-2">Chill & Grill: Pizza + Boba Tea for Two</h3>
                  <p className="text-gray-300 mb-4">
                    Get D100 voucher for Pizza + Boba Tea for Two when you signup for each friend!
                  </p>
                  <div className="flex flex-wrap gap-2 justify-center md:justify-start">
                    <span className="bg-orange-500/20 text-orange-400 px-3 py-1 rounded-full text-sm font-bold">D100 Voucher</span>
                    <span className="bg-amber-500/20 text-amber-400 px-3 py-1 rounded-full text-sm font-bold">For Two</span>
                    <span className="bg-green-500/20 text-green-400 px-3 py-1 rounded-full text-sm font-bold">Per Referral</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Unified Rewards Page CTA - Inside Collapsible */}
        {isExpanded && (
        <>
        {/* Claim Chill & Grill Voucher Section */}
        <div className="glass rounded-2xl p-8 border border-orange-500/50 bg-gradient-to-br from-orange-500/10 to-red-500/10 mb-8 animate-in slide-in-from-top duration-300">
          <div className="text-center mb-6">
            <div className="inline-flex items-center gap-2 bg-orange-500/20 text-orange-400 px-4 py-2 rounded-full mb-4">
              <Gift className="w-5 h-5" />
              <span className="font-bold">🍕 CLAIM YOUR DEAL</span>
            </div>
            <h3 className="text-2xl font-bold text-white mb-2">Get Your Chill & Grill Voucher</h3>
            <p className="text-gray-300 text-sm mb-6">
              Show your generated code at Aqua Cafe to redeem. Limited time offer. T&C apply.
            </p>
          </div>

          <div className="max-w-2xl mx-auto">
            {!claimedVoucher ? (
              <div className="space-y-4">
                <Button
                  size="lg"
                  onClick={() => claimVoucherMutation.mutate()}
                  disabled={claimVoucherMutation.isPending}
                  className="w-full h-16 text-xl font-bold bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-700 hover:to-red-700"
                  data-testid="button-claim-deal"
                >
                  <Gift className="w-6 h-6 mr-2" />
                  {claimVoucherMutation.isPending ? "Claiming..." : "Claim Deal"}
                </Button>
                
                <Button
                  variant="outline"
                  size="lg"
                  onClick={() => window.open('https://www.deliwer.com/aquacafe', '_blank')}
                  className="w-full h-14 text-lg border-2 border-white/20 text-white hover:bg-white/10"
                  data-testid="button-visit-aquacafe"
                >
                  Visit deliwer.com/aquacafe
                </Button>
              </div>
            ) : (
              <div className="bg-green-500/20 border-2 border-green-400/50 rounded-xl p-6 space-y-4 backdrop-blur-sm" data-testid="container-claimed-voucher">
                <div className="flex items-center justify-center gap-2 text-green-300">
                  <CheckCircle className="w-6 h-6" />
                  <span className="font-bold text-lg">Voucher Claimed!</span>
                </div>
                <div className="bg-slate-900/50 rounded-lg p-4 border border-green-400/30">
                  <p className="text-sm text-gray-400 mb-2 text-center">Your Code:</p>
                  <p className="text-3xl font-mono font-bold text-center tracking-wider text-white" data-testid="text-voucher-code">
                    {claimedVoucher.code}
                  </p>
                </div>
                <Button
                  variant="outline"
                  className="w-full border-white/20 text-white hover:bg-white/10"
                  data-testid="button-view-qr"
                >
                  <QrCode className="w-5 h-5 mr-2" />
                  View QR Code
                </Button>
              </div>
            )}

            <div className="mt-6 pt-6 border-t border-white/10">
              <p className="text-sm font-semibold text-gray-300 mb-3 text-center">
                🎁 Refer friends, earn <DirhamSymbol size={12} className="inline mx-1" />100 per signup!
              </p>
              <Button
                variant="outline"
                size="lg"
                onClick={handleCopyReferralLink}
                className="w-full h-12 border-2 border-blue-400/30 text-white hover:bg-blue-500/20"
                data-testid="button-copy-referral"
              >
                {copied ? (
                  <>
                    <CheckCircle className="w-5 h-5 mr-2 text-green-400" />
                    Copied!
                  </>
                ) : (
                  <>
                    <Copy className="w-5 h-5 mr-2" />
                    Copy referral link
                  </>
                )}
              </Button>
            </div>
          </div>

          <p className="text-center text-gray-400 text-xs mt-6">
            <span className="font-semibold text-white">AquaCafe</span> by DeliWer • <span className="font-semibold text-white">Chill & Grill</span> Ghost Kitchen by DeliWer
          </p>
        </div>

        <div className="text-center mb-8 animate-in slide-in-from-top duration-300">
          <Link href="/rewards">
            <Button 
              size="lg" 
              className="bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white font-bold px-8 py-4 text-xl shadow-2xl transform hover:scale-105 transition-all rounded-full"
              data-testid="button-visit-rewards-page"
            >
              <Gift className="mr-3 w-6 h-6" />
              Visit Rewards Page
            </Button>
          </Link>
          <div className="text-xs text-gray-400 mt-4">
            Browse products, track points, and redeem rewards all in one place
          </div>
        </div>

        {/* FREE Shower Filter Visual */}
        <div className="mb-8 animate-in slide-in-from-top duration-500">
          <div className="max-w-3xl mx-auto bg-gradient-to-r from-cyan-600/20 to-blue-600/20 rounded-2xl p-6 border border-cyan-500/50 backdrop-blur-sm">
            <div className="text-center mb-4">
              <div className="inline-flex items-center gap-2 bg-cyan-500/20 text-cyan-400 px-4 py-2 rounded-full mb-3">
                <Gift className="w-5 h-5" />
                <span className="font-bold">FREE GIFT INCLUDED</span>
              </div>
              <h3 className="text-2xl font-bold text-white mb-2">Premium Shower Filter</h3>
              <p className="text-gray-300 mb-4">
                Get your FREE Beauty Ionic Shower Filter with AquaCafe membership
              </p>
            </div>
            <div className="rounded-xl overflow-hidden shadow-2xl">
              <img 
                src={showerFilterCollage} 
                alt="Free Shower Filter Gift" 
                className="w-full h-auto"
              />
            </div>
            <div className="mt-4 text-center">
              <span className="text-amber-400 font-bold text-lg">AED 399 Value - Yours FREE!</span>
            </div>
          </div>
        </div>

        <div className="glass rounded-2xl p-8 border border-amber-500/50 bg-gradient-to-br from-amber-500/10 to-orange-500/10 mb-8 animate-in slide-in-from-top duration-500">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            
            {/* Left: Premium Product Showcase */}
            <div>
              <h3 className="text-xl font-bold text-white mb-6 text-center">🎁 Premium Products</h3>
              <div className="space-y-4">
                
                {/* iPhone 17 Pro Max */}
                <div className="relative p-4 bg-gradient-to-r from-blue-600/20 to-purple-600/20 rounded-xl border border-blue-400/50 hover:scale-105 transition-transform">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-12 h-12 bg-gradient-to-b from-gray-800 to-gray-900 rounded-2xl border-2 border-gray-600 flex items-center justify-center">
                      <Smartphone className="w-6 h-6 text-blue-400" />
                    </div>
                    <div>
                      <div className="text-white font-bold">iPhone 17 Pro Max</div>
                      <div className="text-xs text-gray-400">Latest flagship</div>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="text-2xl font-black text-amber-400">45,000 PTS</div>
                    <div className="text-xs text-gray-400 text-right">
                      <div>≈ AED 4,500 value</div>
                      <div className="text-green-400">🔥 Most Popular</div>
                    </div>
                  </div>
                  <div className="absolute top-2 right-2 w-6 h-6 bg-red-500 rounded-full flex items-center justify-center text-white text-xs font-bold animate-bounce">
                    NEW
                  </div>
                </div>

                {/* AquaCafe Water System */}
                <div className="relative p-4 bg-gradient-to-r from-cyan-600/20 to-blue-600/20 rounded-xl border border-cyan-400/50 hover:scale-105 transition-transform">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-12 h-12 bg-gradient-to-br from-cyan-500 to-blue-500 rounded-2xl flex items-center justify-center">
                      <Droplets className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <div className="text-white font-bold">AquaCafe Pro System</div>
                      <div className="text-xs text-gray-400">5-stage purification</div>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="text-2xl font-black text-amber-400">15,000 PTS</div>
                    <div className="text-xs text-gray-400 text-right">
                      <div>≈ AED 1,500 value</div>
                      <div className="text-cyan-400">💧 Essential</div>
                    </div>
                  </div>
                </div>

                {/* Chill & Grill Vouchers */}
                <div className="relative p-4 bg-gradient-to-r from-orange-600/20 to-amber-600/20 rounded-xl border border-orange-400/50 hover:scale-105 transition-transform">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-amber-500 rounded-2xl flex items-center justify-center">
                      <Utensils className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <div className="text-white font-bold">Chill & Grill</div>
                      <div className="text-xs text-gray-400">Pizza + Boba Tea vouchers</div>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="text-2xl font-black text-amber-400">1,000 PTS</div>
                    <div className="text-xs text-gray-400 text-right">
                      <div>D100 voucher</div>
                      <div className="text-orange-400">🍕 Partnership</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Center: Benefits Flow Process */}
            <div className="flex flex-col justify-center">
              <h3 className="text-xl font-bold text-white mb-6 text-center">⚡ Instant Benefits</h3>
              
              {/* Flow Process */}
              <div className="space-y-6">
                {/* Points to Products */}
                <div className="text-center">
                  <div className="w-16 h-16 bg-gradient-to-r from-amber-500 to-orange-500 rounded-full flex items-center justify-center mx-auto mb-3 animate-pulse">
                    <ArrowDown className="w-8 h-8 text-white" />
                  </div>
                  <div className="text-sm text-gray-300">
                    <div className="font-bold text-amber-400">Points → Products</div>
                    <div>Transform earned points</div>
                  </div>
                </div>

                {/* Delivery Process */}
                <div className="text-center">
                  <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full flex items-center justify-center mx-auto mb-3">
                    <Package className="w-8 h-8 text-white" />
                  </div>
                  <div className="text-sm text-gray-300">
                    <div className="font-bold text-green-400">Free Delivery</div>
                    <div>Direct to your home</div>
                  </div>
                </div>

                {/* Impact Tracking */}
                <div className="text-center">
                  <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full flex items-center justify-center mx-auto mb-3">
                    <BarChart className="w-8 h-8 text-white" />
                  </div>
                  <div className="text-sm text-gray-300">
                    <div className="font-bold text-blue-400">Track Impact</div>
                    <div>Measure your contribution</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right: Quick Start Benefits */}
            <div>
              <h3 className="text-xl font-bold text-white mb-6 text-center">🚀 Start Today</h3>
              
              {/* Starter Kit Highlight */}
              <div className="p-6 bg-gradient-to-br from-green-500/20 to-emerald-500/20 rounded-xl border-2 border-green-400/50 mb-6">
                <div className="text-center mb-4">
                  <div className="text-3xl font-black text-green-400">AED 99</div>
                  <div className="text-sm text-gray-300">Starter Kit Gateway</div>
                  <div className="text-xs text-green-300 font-bold">FREE Installation (AED 299 value)</div>
                </div>
                
                {/* Quick benefits list */}
                <div className="space-y-2 text-xs">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                    <span className="text-gray-300">Immediate point earning</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                    <span className="text-gray-300">Premium water access</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-purple-400 rounded-full"></div>
                    <span className="text-gray-300">Partnership benefits</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-amber-400 rounded-full"></div>
                    <span className="text-gray-300">Hero status unlocked</span>
                  </div>
                </div>
              </div>

              {/* Monthly Rewards Preview */}
              <div className="p-4 bg-amber-500/10 rounded-xl border border-amber-400/30 mb-6">
                <div className="text-center text-sm">
                  <div className="text-amber-400 font-bold mb-2">Monthly Rewards Preview</div>
                  <div className="grid grid-cols-2 gap-2 text-xs">
                    <div className="text-center">
                      <div className="text-white font-bold">7,500 PTS</div>
                      <div className="text-gray-400">Avg Monthly</div>
                    </div>
                    <div className="text-center">
                      <div className="text-green-400 font-bold">AED 750</div>
                      <div className="text-gray-400">Reward Value</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Action Button */}
              <Button 
                size="lg" 
                className="w-full bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 text-black font-bold px-8 py-4 text-xl shadow-2xl transform hover:scale-105 transition-all rounded-full"
                onClick={() => {
                  const tabsSection = document.querySelector('[data-section="main-tabs"]');
                  if (tabsSection) {
                    tabsSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
                    // Programmatically switch to AquaCafe tab
                    const aquacafeTab = document.querySelector('[data-value="aquacafe"]') as HTMLElement;
                    if (aquacafeTab) {
                      aquacafeTab.click();
                    }
                  }
                }}
              >
                <Gift className="mr-3 w-6 h-6" />
                Shop AquaCafe Now
              </Button>
            </div>
          </div>
        </div>

        {/* Tombola Prizes Section */}
        <div className="glass rounded-2xl p-8 border border-purple-500/50 bg-gradient-to-br from-purple-950/30 to-indigo-950/30 relative overflow-hidden animate-in slide-in-from-top duration-500 mt-8">
          <div className="text-center mb-6">
            <div className="inline-flex items-center gap-2 bg-purple-500/20 text-purple-400 px-4 py-2 rounded-full mb-4">
              <Play className="w-5 h-5 animate-pulse" />
              <span className="font-bold">🎮 TOMBOLA PRIZES</span>
              <Sparkles className="w-5 h-5 animate-pulse" />
            </div>
            <h3 className="text-2xl font-bold text-white mb-2">Win Amazing Prizes!</h3>
            <p className="text-purple-200 text-sm mb-4">
              Spin the tombola daily to win exciting rewards and support environmental impact!
            </p>
          </div>
          
          {/* Impact Visual Representation */}
          <div className="grid grid-cols-3 gap-4 mb-6">
            <div className="text-center p-4 bg-gradient-to-br from-green-500/20 to-emerald-500/20 rounded-xl border border-green-500/30">
              <Droplets className="w-8 h-8 text-cyan-400 mx-auto mb-2" />
              <div className="text-white font-bold text-sm">Water Renewal</div>
              <div className="text-gray-400 text-xs">Clean water access</div>
            </div>
            <div className="text-center p-4 bg-gradient-to-br from-blue-500/20 to-indigo-500/20 rounded-xl border border-blue-500/30">
              <Repeat className="w-8 h-8 text-blue-400 mx-auto mb-2" />
              <div className="text-white font-bold text-sm">Recycling</div>
              <div className="text-gray-400 text-xs">Device reclamation</div>
            </div>
            <div className="text-center p-4 bg-gradient-to-br from-amber-500/20 to-orange-500/20 rounded-xl border border-amber-500/30">
              <Utensils className="w-8 h-8 text-amber-400 mx-auto mb-2" />
              <div className="text-white font-bold text-sm">Food Security</div>
              <div className="text-gray-400 text-xs">Community support</div>
            </div>
          </div>
          
          {/* Tombola Widget */}
          <div className="max-w-md mx-auto">
            <TombolaWidget heroId="demo-hero-id" theme="metaverse" size="full" />
          </div>
        </div>

        {/* Impact Slot Machine */}
        <div className="mt-8 animate-in slide-in-from-top duration-1000">
          <ImpactSlotMachine />
        </div>
        </>
        )}
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



        {/* 4-Step Progressive Flow with Visual Connectors */}
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
            <div className="w-1 h-12 bg-gradient-to-b from-purple-500 to-amber-500 mb-2"></div>
            <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-amber-500 rounded-full flex items-center justify-center animate-pulse shadow-lg">
              <ArrowDown className="w-6 h-6 text-white" />
            </div>
            <div className="w-1 h-12 bg-gradient-to-b from-amber-500 to-orange-500 mt-2"></div>
            <div className="text-xs text-gray-400 mt-2 font-bold">NEXT STEP</div>
          </div>
        </div>

        {/* Step 3: Claim Loyalty Rewards */}
        <div data-section="step-3">
          <StepThreeRewards />
        </div>

        {/* Main Tabs Section - Collapsible with AquaCafe Membership Card Banner */}
        <div data-section="main-tabs" className="mt-16 mb-12">
          <CollapsibleTabsSection />
        </div>

        {/* Flow Connector - Standalone Section Separator */}
        <div className="flex justify-center my-16">
          <div className="flex flex-col items-center">
            <div className="w-1 h-16 bg-gradient-to-b from-orange-500 to-purple-500 mb-2"></div>
            <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center animate-pulse shadow-2xl border-4 border-white/20">
              <Play className="w-8 h-8 text-white" />
            </div>
            <div className="w-1 h-16 bg-gradient-to-b from-purple-500 to-indigo-500 mt-2"></div>
            <div className="text-sm text-purple-400 mt-3 font-bold">UNIQUE ATTRACTION</div>
          </div>
        </div>

        {/* Step 4: Create Impact (Standalone Gamification Section) */}
        <div data-section="step-4">
          <StepOnePlay onJoinMission={() => setShowHeroRegistration(true)} />
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

// Collapsible Tabs Section Component
function CollapsibleTabsSection() {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="max-w-7xl mx-auto">
      {/* Membership Card Banner - Click to Expand */}
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full cursor-pointer hover:scale-[1.02] transition-all duration-300 mb-8 group"
        aria-expanded={isExpanded}
        aria-label="Toggle AquaCafe Membership options"
        data-testid="toggle-aquacafe-membership"
      >
        <div className="relative rounded-2xl overflow-hidden shadow-2xl border-2 border-blue-500/50 group-hover:border-blue-400 transition-colors">
          <img 
            src={membershipCard} 
            alt="AquaCafe Membership Card - Click to explore benefits" 
            className="w-full h-auto"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent flex items-end justify-center pb-6">
            <div className="flex items-center gap-3 bg-white/10 backdrop-blur-md rounded-full px-6 py-3 border border-white/30">
              <span className="text-white font-bold text-lg">
                {isExpanded ? "Hide" : "Explore"} Membership Benefits
              </span>
              {isExpanded ? (
                <ChevronUp className="w-6 h-6 text-white" />
              ) : (
                <ChevronDown className="w-6 h-6 text-white animate-bounce" />
              )}
            </div>
          </div>
        </div>
      </button>

      {/* Collapsible Tabs Content */}
      {isExpanded && (
        <div className="animate-in slide-in-from-top duration-500">
          <Tabs defaultValue="aquacafe" className="w-full">
            <TabsList className="grid w-full grid-cols-3 mb-8 bg-slate-800/50 backdrop-blur-sm rounded-2xl p-2 border border-slate-600/50">
              <TabsTrigger 
                value="explore" 
                className="flex items-center gap-2 data-[state=active]:bg-gray-600 data-[state=active]:text-white text-gray-300 font-bold py-3 px-6 rounded-xl transition-all"
                data-testid="tab-explore"
              >
                <Target className="w-5 h-5" />
                <span className="hidden sm:inline">Explore</span> Missions
              </TabsTrigger>
              <TabsTrigger 
                value="aquacafe"
                data-value="aquacafe"
                className="flex items-center gap-2 data-[state=active]:bg-blue-500 data-[state=active]:text-white text-white font-bold py-3 px-6 rounded-xl transition-all"
                data-testid="tab-aquacafe"
              >
                <Droplets className="w-5 h-5" />
                <span className="hidden sm:inline">Shop</span> AquaCafe
              </TabsTrigger>
              <TabsTrigger 
                value="heroes" 
                className="flex items-center gap-2 data-[state=active]:bg-amber-500 data-[state=active]:text-black text-white font-bold py-3 px-6 rounded-xl transition-all"
                data-testid="tab-heroes"
              >
                <Trophy className="w-5 h-5" />
                <span className="hidden sm:inline">Planet</span> Heroes
              </TabsTrigger>
            </TabsList>

            {/* Explore Missions Tab */}
            <TabsContent value="explore" className="space-y-8">
              <div className="text-center">
                <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                  <span className="bg-gradient-to-r from-hero-green-400 to-blue-400 bg-clip-text text-transparent">
                    Explore Eco Missions
                  </span>
                </h2>
                <p className="text-gray-300 text-lg max-w-2xl mx-auto mb-8">
                  Discover ways to earn Planet Points and contribute to Dubai's sustainability goals
                </p>
              </div>

              <div className="grid md:grid-cols-3 gap-6">
                <div className="bg-gradient-to-br from-emerald-500/10 to-blue-500/10 rounded-2xl p-6 border border-emerald-500/30">
                  <div className="w-16 h-16 bg-emerald-500/20 rounded-full flex items-center justify-center mb-4">
                    <Droplets className="w-8 h-8 text-emerald-400" />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-2">Water Conservation</h3>
                  <p className="text-gray-300 mb-4">Install smart water systems and track usage</p>
                  <div className="text-emerald-400 font-bold">+500 PTS/month</div>
                </div>

                <div className="bg-gradient-to-br from-purple-500/10 to-pink-500/10 rounded-2xl p-6 border border-purple-500/30">
                  <div className="w-16 h-16 bg-purple-500/20 rounded-full flex items-center justify-center mb-4">
                    <Users className="w-8 h-8 text-purple-400" />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-2">Refer Friends</h3>
                  <p className="text-gray-300 mb-4">Share the sustainability movement</p>
                  <div className="text-purple-400 font-bold">+1,000 PTS each</div>
                </div>

                <div className="bg-gradient-to-br from-amber-500/10 to-orange-500/10 rounded-2xl p-6 border border-amber-500/30">
                  <div className="w-16 h-16 bg-amber-500/20 rounded-full flex items-center justify-center mb-4">
                    <Star className="w-8 h-8 text-amber-400" />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-2">Daily Check-in</h3>
                  <p className="text-gray-300 mb-4">Stay engaged with the platform</p>
                  <div className="text-amber-400 font-bold">+100 PTS daily</div>
                </div>
              </div>
            </TabsContent>

            {/* AquaCafe Tab */}
            <TabsContent value="aquacafe">
              <AquaCafeTab />
            </TabsContent>

            {/* Planet Heroes Tab */}
            <TabsContent value="heroes" className="space-y-8">
              <div className="text-center">
                <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                  <span className="bg-gradient-to-r from-amber-400 to-orange-400 bg-clip-text text-transparent">
                    Planet Heroes Community
                  </span>
                </h2>
                <p className="text-gray-300 text-lg max-w-2xl mx-auto mb-8">
                  Join Dubai's sustainability leaders and unlock exclusive rewards
                </p>
              </div>

              <div className="grid md:grid-cols-2 gap-8">
                <div className="bg-gradient-to-br from-amber-500/10 to-orange-500/10 rounded-2xl p-8 border border-amber-500/30">
                  <h3 className="text-2xl font-bold text-white mb-4">Hero Benefits</h3>
                  <div className="space-y-3">
                    <div className="flex items-center">
                      <CheckCircle className="w-5 h-5 text-amber-500 mr-3" />
                      <span className="text-gray-300">Exclusive discounts on eco-products</span>
                    </div>
                    <div className="flex items-center">
                      <CheckCircle className="w-5 h-5 text-amber-500 mr-3" />
                      <span className="text-gray-300">Priority access to new programs</span>
                    </div>
                    <div className="flex items-center">
                      <CheckCircle className="w-5 h-5 text-amber-500 mr-3" />
                      <span className="text-gray-300">Special Hero multipliers</span>
                    </div>
                    <div className="flex items-center">
                      <CheckCircle className="w-5 h-5 text-amber-500 mr-3" />
                      <span className="text-gray-300">Community events & workshops</span>
                    </div>
                  </div>
                </div>

                <div className="bg-gradient-to-br from-hero-green-500/10 to-emerald-500/10 rounded-2xl p-8 border border-hero-green-500/30">
                  <h3 className="text-2xl font-bold text-white mb-4">How to Join</h3>
                  <div className="space-y-4">
                    <div className="flex items-start">
                      <div className="w-8 h-8 bg-hero-green-500 rounded-full flex items-center justify-center mr-3 mt-1">
                        <span className="text-white font-bold text-sm">1</span>
                      </div>
                      <div>
                        <div className="text-white font-medium">Start with AquaCafe</div>
                        <div className="text-gray-400 text-sm">Get your Hero Minimal for AED 1299</div>
                      </div>
                    </div>
                    <div className="flex items-start">
                      <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center mr-3 mt-1">
                        <span className="text-white font-bold text-sm">2</span>
                      </div>
                      <div>
                        <div className="text-white font-medium">Complete Missions</div>
                        <div className="text-gray-400 text-sm">Earn points through eco-actions</div>
                      </div>
                    </div>
                    <div className="flex items-start">
                      <div className="w-8 h-8 bg-amber-500 rounded-full flex items-center justify-center mr-3 mt-1">
                        <span className="text-black font-bold text-sm">3</span>
                      </div>
                      <div>
                        <div className="text-white font-medium">Unlock Rewards</div>
                        <div className="text-gray-400 text-sm">Redeem points for premium products</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      )}

      {/* Trust Indicators */}
      <div className="text-center mt-8">
        <p className="text-gray-400 text-sm">
          🔒 Secure • ⚡ Instant • 🌍 Environmental Impact Guaranteed
        </p>
      </div>
    </div>
  );
}