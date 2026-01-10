import { useState, useEffect } from "react";
import { Star, Clock, Users, Zap, Trophy, Target, Timer, Calculator, Smartphone, Leaf, ShoppingCart, Crown, Gift, Shield, CheckCircle, Building, Handshake, Heart, Sparkles, ChevronRight, Award, TrendingUp, ArrowRight, Gamepad2, Repeat, Droplets, Home, Package, Truck, Utensils, ArrowDown, BarChart, X, User, Mail, Phone, MapPin, ChevronDown, ChevronUp, Play, Copy, QrCode, Rocket, Calendar } from "lucide-react";
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
import { DirhamSymbol } from "@/components/ui/dirham-symbol";
import { PlayTV } from "./play-tv";
import { InstantImpactUnlocks } from "./instant-impact-unlocks";
import { CalendlyButton } from "@/components/calendly-popup";
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
import pizzaBobaComboImage from "@assets/stock_images/pizza_and_boba_tea_d_a375dab3.jpg";

import Dubai_Creek_Apartment from "@assets/Dubai_Creek_Apartment.jpg";
import smartHomeLivingRoom from "@assets/stock_images/smart_home_living_ro_92fee3d3.jpg";
import homeServiceTechnician from "@assets/stock_images/professional_home_se_d1e6daec.jpg";

import Nicole_Oliver from "@assets/Nicole_Oliver.jpeg";

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
    1: { icon: Home, label: "Smart Home", section: "How it Works" },
    2: { icon: Droplets, label: "Home Service", section: "How it Works" },
    3: { icon: Crown, label: "Join Loyalty", section: "How it Works" }
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
              aria-label="Toggle Play to Earn DXBs section"
              data-testid="toggle-play-earn"
            >
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400">Play the Planet Hero Game</span>
              {isExpanded ? (
                <ChevronUp className="w-8 h-8 text-purple-400" />
              ) : (
                <ChevronDown className="w-8 h-8 text-purple-400" />
              )}
            </button>
          </h2>
          <div className="flex items-center justify-center gap-2 mb-3">
            <Sparkles className="w-5 h-5 text-purple-400 animate-pulse" />
            <span className="text-purple-400 font-bold text-lg">Planet Gamification</span>
            <div className="w-2 h-2 bg-purple-400 rounded-full animate-ping"></div>
          </div>
          <p className="text-lg text-gray-300 max-w-2xl mx-auto mb-8">
            Join the planet gamification movement! Complete eco-missions, earn DXB tokens, and make real environmental impact. 
            <span className="text-purple-400 font-bold">Play games, win rewards, save the planet!</span>
          </p>

          {/* Play TV Interactive Component - Always Visible */}
          <div className="max-w-7xl mx-auto">
            <PlayTV />
          </div>

          {/* CTAs - Calendar Booking and Play Page */}
          <div className="mt-6 space-y-4">
            <div className="flex flex-col sm:flex-row gap-4 max-w-2xl mx-auto">
              <div className="flex-1">
                <CalendlyButton
                  size="lg"
                  className="w-full flex items-center justify-center gap-3 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-bold px-8 py-6 text-lg shadow-2xl transform hover:scale-105 transition-all rounded-full"
                  data-testid="button-book-gaming-session"
                >
                  <Calendar className="w-5 h-5 flex-shrink-0" />
                  <span>Book Gaming Session</span>
                </CalendlyButton>
              </div>
              <Link href="/play" className="flex-1">
                <Button
                  size="lg"
                  variant="outline"
                  className="w-full flex items-center justify-center gap-3 border-purple-400/50 text-purple-400 hover:bg-purple-500/20 font-bold px-8 py-6 text-lg shadow-xl transform hover:scale-105 transition-all rounded-full"
                  data-testid="button-start-playing"
                >
                  <Gamepad2 className="w-5 h-5 flex-shrink-0" />
                  <span>Start Playing</span>
                </Button>
              </Link>
            </div>
            <p className="text-center text-gray-400 text-sm">
              Join the planet heroes community - Earn DXB tokens while saving the environment
            </p>
          </div>
        </div>

        {/* Expanded Content - Full Details */}
        {isExpanded && (
        <>
        {/* Planet Gamification Info Section */}
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
                  <span className="font-bold">PLANET GAMIFICATION</span>
                </div>
                <h3 className="text-2xl font-bold text-white mb-2">Earn DXBs While Saving the Planet</h3>
                <p className="text-gray-200 text-sm">
                  Complete eco-missions, earn DXB tokens, and contribute to real environmental impact across Dubai and beyond!
                </p>
              </div>
              
              {/* Visit Play Page CTA */}
              <div className="text-center">
                <div className="text-gray-400 text-sm mb-6">Ready to become a Planet Hero?</div>
                <Link href="/play">
                  <Button 
                    size="lg" 
                    className="w-full flex items-center justify-center gap-3 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-bold px-8 py-4 text-xl shadow-2xl transform hover:scale-105 transition-all rounded-full"
                    data-testid="button-visit-play-page"
                  >
                    <Gamepad2 className="w-6 h-6 flex-shrink-0" />
                    <span>Enter the Game</span>
                  </Button>
                </Link>
                <div className="text-xs text-gray-400 mt-4">
                  Access Tombola, Eco-Missions, Leaderboards & Earn DXB Tokens!
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

        {/* Impact Slot Machine - Interactive Rewards Preview */}
        <div className="mt-8">
          <InstantImpactUnlocks />
        </div>
        </>
        )}
      </div>
    </section>
  );
}

// Step 2: Home Service Section (formerly Step 1)
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
    <section className="py-8 px-4 mb-8" data-section="step-2">
      <div className="max-w-4xl mx-auto">
        <ProgressIndicator currentStep={2} />
        
        <div className="text-center mb-8">
          <h2 className="text-3xl md:text-5xl font-black mb-4 text-white">
            <button
              className="cursor-pointer hover:scale-105 transition-all duration-300 border-0 bg-transparent p-0 inline-flex items-center gap-3"
              onClick={() => setIsExpanded(!isExpanded)}
              aria-expanded={isExpanded}
              aria-label="Toggle Get Home Service section"
              data-testid="toggle-home-service"
            >
              <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">Enjoy Service at Home</span>
              {isExpanded ? (
                <ChevronUp className="w-8 h-8 text-cyan-400" />
              ) : (
                <ChevronDown className="w-8 h-8 text-cyan-400" />
              )}
            </button>
          </h2>
          <p className="text-lg text-gray-300 max-w-2xl mx-auto mb-4">
            Home Water Purification & Installation Packages: Transform your home with clean, alkaline water systems professionally installed
          </p>
          
          {/* Water Purification Banner - Always Visible */}
          <div className="max-w-3xl mx-auto mt-6 rounded-2xl overflow-hidden border border-cyan-500/50 shadow-2xl bg-gradient-to-br from-blue-600/20 to-cyan-600/20 p-2 backdrop-blur-sm">
            <div className="bg-slate-900/50 rounded-xl p-6">
              <div className="flex flex-col md:flex-row items-center gap-6">
                <div className="flex-1">
                  <img 
                    src={Nicole_Oliver} 
                    alt="Premium Water Purification System for Home" 
                    className="w-full h-auto rounded-lg shadow-lg"
                    data-testid="img-water-purification-banner"
                  />
                </div>
                <div className="flex-1 text-center md:text-left">
                  <div className="inline-flex items-center gap-2 bg-cyan-500/20 text-cyan-400 px-4 py-2 rounded-full mb-3">
                    <Droplets className="w-5 h-5" />
                    <span className="font-bold">WATER PURIFICATION</span>
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-2">Home Water Purification & Installation</h3>
                  <p className="text-gray-300 mb-4">
                    Get clean, alkaline water at home with our premium Kangen water systems. Professional installation included with all packages.
                  </p>
                  <div className="flex flex-wrap gap-2 justify-center md:justify-start">
                    <span className="bg-cyan-500/20 text-cyan-400 px-3 py-1 rounded-full text-sm font-bold">Professional Install</span>
                    <span className="bg-blue-500/20 text-blue-400 px-3 py-1 rounded-full text-sm font-bold">Alkaline Water</span>
                    <span className="bg-teal-500/20 text-teal-400 px-3 py-1 rounded-full text-sm font-bold">Health Benefits</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* CTAs - Calendar Booking and AquaCafe Products */}
          <div className="mt-6 space-y-4">
            <div className="flex flex-col sm:flex-row gap-4 max-w-2xl mx-auto">
              <div className="flex-1">
                <CalendlyButton
                  size="lg"
                  className="w-full flex items-center justify-center gap-3 bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white font-bold px-8 py-6 text-lg shadow-2xl transform hover:scale-105 transition-all rounded-full"
                  data-testid="button-book-water-installation"
                >
                  <Calendar className="w-5 h-5 flex-shrink-0" />
                  <span>Book Installation</span>
                </CalendlyButton>
              </div>
              <Link href="/aquacafe" className="flex-1">
                <Button
                  size="lg"
                  variant="outline"
                  className="w-full flex items-center justify-center gap-3 border-cyan-400/50 text-cyan-400 hover:bg-cyan-500/20 font-bold px-8 py-6 text-lg shadow-xl transform hover:scale-105 transition-all rounded-full"
                  data-testid="button-view-aquacafe-packages"
                >
                  <Droplets className="w-5 h-5 flex-shrink-0" />
                  <span>View Packages</span>
                </Button>
              </Link>
            </div>
            <p className="text-center text-gray-400 text-sm">
              Free consultation with water purification experts - Schedule your home visit today
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
              
              {/* Free Installation Banner - Always Visible */}
              <div className="max-w-3xl mx-auto mb-4 rounded-xl overflow-hidden border-2 border-cyan-500 shadow-2xl bg-gradient-to-r from-cyan-500/20 to-blue-500/20 p-4 backdrop-blur-sm animate-pulse">
                <div className="flex items-center justify-center gap-3">
                  <Droplets className="w-6 h-6 text-cyan-400" />
                  <div className="text-center">
                    <p className="text-lg font-black text-cyan-300 mb-1">
                      FREE Professional Installation
                    </p>
                    <p className="text-sm text-cyan-100">
                      When you order any water filtration package - Limited time offer!
                    </p>
                  </div>
                  <Gift className="w-6 h-6 text-cyan-400" />
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
                <div className="text-center text-2xl font-bold text-blue-400 mb-2"><DirhamSymbol size={18} className="mr-1" />19,250</div>
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
                  <span className="text-2xl font-bold text-cyan-400"><DirhamSymbol size={18} className="mr-1" />99</span>
                  <span className="text-gray-500 line-through ml-2"><DirhamSymbol size={14} className="mr-0.5" />1,698</span>
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

// Step 1: Smart Home Section
function StepSellIPhone() {
  const [isExpanded, setIsExpanded] = useState(false);
  
  return (
    <section className="py-8 px-4 mb-8" data-section="step-1">
      <div className="max-w-4xl mx-auto">
        <ProgressIndicator currentStep={1} />
        
        <div className="text-center mb-8">
          <h2 className="text-3xl md:text-5xl font-black mb-4">
            <button
              className="cursor-pointer hover:scale-105 transition-all duration-300 border-0 bg-transparent p-0 inline-flex items-center gap-3"
              onClick={() => setIsExpanded(!isExpanded)}
              aria-expanded={isExpanded}
              aria-label="Toggle Get Smart Home section"
              data-testid="toggle-smart-home"
            >
              <span className="bg-gradient-to-r from-emerald-400 to-green-400 bg-clip-text text-transparent"> Residence in Dubai</span>
              {isExpanded ? (
                <ChevronUp className="w-8 h-8 text-emerald-400" />
              ) : (
                <ChevronDown className="w-8 h-8 text-emerald-400" />
              )}
            </button>
          </h2>
          <p className="text-lg text-gray-300 max-w-2xl mx-auto">DeliWer does not sell property or act as a real estate agent.</p>

          {/* Smart Home Search Banner - Always Visible */}
          <div className="max-w-3xl mx-auto mt-6 rounded-2xl overflow-hidden border border-emerald-500/50 shadow-2xl bg-gradient-to-br from-emerald-600/20 to-green-600/20 p-2 backdrop-blur-sm">
            <div className="bg-slate-900/50 rounded-xl p-6">
              <div className="flex flex-col md:flex-row items-center gap-6">
                <div className="flex-1">
                  <img 
                    src={Dubai_Creek_Apartment} 
                    alt="Modern Smart Home Apartment in Dubai" 
                    className="w-full h-auto rounded-lg shadow-lg"
                    data-testid="img-smart-home-banner"
                  />
                </div>
                <div className="flex-1 text-center md:text-left">
                  <div className="inline-flex items-center bg-gradient-to-r from-emerald-500 to-green-500 text-white rounded-full px-6 py-2 mb-3 font-bold animate-pulse">
                    <Home className="w-5 h-5 mr-2 flex-shrink-0" />
                    <span>SMART HOME SEARCH</span>
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-2">What DeliWer Does?</h3>
                  <p className="text-gray-300 mb-4">We handle the practical work of living in Dubai — so you don’t manage multiple vendors, timelines, or follow-ups.</p>
                  <div className="flex flex-wrap gap-2 justify-center md:justify-start">
                    <span className="bg-emerald-500/20 text-emerald-400 px-3 py-1 rounded-full text-sm font-bold">Premium Listings</span>
                    <span className="bg-green-500/20 text-green-400 px-3 py-1 rounded-full text-sm font-bold">Smart Technology</span>
                    <span className="bg-teal-500/20 text-teal-400 px-3 py-1 rounded-full text-sm font-bold">Expert Support</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* CTAs - Calendar Booking and Housing Search */}
          <div className="mt-6 space-y-4">
            <div className="flex flex-col sm:flex-row gap-4 max-w-2xl mx-auto">
              <div className="flex-1">
                <CalendlyButton
                  size="lg"
                  className="w-full flex items-center justify-center gap-3 bg-gradient-to-r from-emerald-500 to-green-500 hover:from-emerald-600 hover:to-green-600 text-white font-bold px-8 py-6 text-lg shadow-2xl transform hover:scale-105 transition-all rounded-full"
                  data-testid="button-book-housing-consultation"
                >
                  <Calendar className="w-5 h-5 flex-shrink-0" />
                  <span>New Resident Essentials — AED 1,499</span>
                </CalendlyButton>
              </div>
              <Link href="/residence" className="flex-1">
                <Button
                  size="lg"
                  variant="outline"
                  className="w-full flex items-center justify-center gap-3 border-emerald-400/50 text-emerald-400 hover:bg-emerald-500/20 font-bold px-8 py-6 text-lg shadow-xl transform hover:scale-105 transition-all rounded-full"
                  data-testid="button-browse-housing"
                >
                  <Home className="w-5 h-5 flex-shrink-0" />
                  <span>Move-In Complete — AED 2,999</span>
                </Button>
              </Link>
            </div>
            <p className="text-center text-gray-400 text-sm">Free consultation - Schedule your meeting today</p>
          </div>
        </div>

        {isExpanded && (
        <>
        {/* Smart Home Property Search Info */}
        <div className="glass rounded-2xl p-8 border border-emerald-500/50 bg-gradient-to-br from-emerald-500/10 to-green-500/10 mb-8 animate-in slide-in-from-top duration-500">
          <div className="text-center mb-6">
            <div className="inline-flex items-center gap-2 bg-emerald-500/20 text-emerald-400 px-4 py-2 rounded-full mb-4">
              <Home className="w-5 h-5" />
              <span className="font-bold">SMART HOME FINDER</span>
            </div>
            <h3 className="text-2xl font-bold text-white mb-2">Find Your Perfect Home in Dubai</h3>
            <p className="text-gray-300 text-sm">
              Rent or buy smart homes with integrated technology and sustainable living features
            </p>
          </div>

          {/* Property Types Grid */}
          <div className="max-w-2xl mx-auto mb-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
              <div className="bg-slate-800/50 rounded-xl p-6 border border-emerald-400/30 text-center hover:border-emerald-400/60 transition-all">
                <Building className="w-10 h-10 text-emerald-400 mx-auto mb-3" />
                <h4 className="text-white font-bold mb-2">Apartments</h4>
                <p className="text-gray-400 text-sm">Modern smart apartments in prime locations</p>
              </div>
              <div className="bg-slate-800/50 rounded-xl p-6 border border-green-400/30 text-center hover:border-green-400/60 transition-all">
                <Home className="w-10 h-10 text-green-400 mx-auto mb-3" />
                <h4 className="text-white font-bold mb-2">Villas</h4>
                <p className="text-gray-400 text-sm">Spacious villas with smart home systems</p>
              </div>
              <div className="bg-slate-800/50 rounded-xl p-6 border border-teal-400/30 text-center hover:border-teal-400/60 transition-all">
                <Building className="w-10 h-10 text-teal-400 mx-auto mb-3" />
                <h4 className="text-white font-bold mb-2">Townhouses</h4>
                <p className="text-gray-400 text-sm">Family-friendly townhouses with gardens</p>
              </div>
            </div>

            {/* Smart Home Features */}
            <div className="bg-gradient-to-r from-emerald-500/20 to-green-500/20 rounded-2xl p-8 border-2 border-emerald-400/50 text-center">
              <div className="text-gray-300 text-sm mb-2">Every Smart Home Includes</div>
              <div className="flex flex-wrap gap-3 justify-center mb-4">
                <span className="bg-emerald-500/20 text-emerald-400 px-4 py-2 rounded-full text-sm font-bold">Water Purification</span>
                <span className="bg-green-500/20 text-green-400 px-4 py-2 rounded-full text-sm font-bold">Smart Thermostat</span>
                <span className="bg-teal-500/20 text-teal-400 px-4 py-2 rounded-full text-sm font-bold">Solar Ready</span>
                <span className="bg-cyan-500/20 text-cyan-400 px-4 py-2 rounded-full text-sm font-bold">EV Charging</span>
              </div>
              <div className="flex flex-wrap gap-3 justify-center">
                <Link href="/residence">
                  <Button 
                    size="lg"
                    className="bg-gradient-to-r from-emerald-500 to-green-500 hover:from-emerald-600 hover:to-green-600"
                    data-testid="button-browse-rent"
                  >
                    <Home className="w-5 h-5 mr-2" />
                    Browse Rentals
                  </Button>
                </Link>
                <Link href="/residence?type=buy">
                  <Button 
                    size="lg"
                    variant="outline"
                    className="border-emerald-400/50 text-emerald-400 hover:bg-emerald-500/20"
                    data-testid="button-browse-buy"
                  >
                    <Building className="w-5 h-5 mr-2" />
                    Properties for Sale
                  </Button>
                </Link>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-r from-emerald-500/10 to-green-500/10 rounded-xl p-6 border border-emerald-400/30">
            <h4 className="text-lg font-bold text-white mb-3 text-center">How It Works</h4>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-sm">
              <div className="text-center">
                <div className="w-12 h-12 bg-emerald-500/20 rounded-full flex items-center justify-center mx-auto mb-2">
                  <Target className="w-6 h-6 text-emerald-400" />
                </div>
                <div className="text-white font-bold mb-1">Browse Listings</div>
                <div className="text-gray-400">Search smart homes by area & budget</div>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-2">
                  <Calendar className="w-6 h-6 text-green-400" />
                </div>
                <div className="text-white font-bold mb-1">Schedule Viewing</div>
                <div className="text-gray-400">Book a tour with our experts</div>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-teal-500/20 rounded-full flex items-center justify-center mx-auto mb-2">
                  <CheckCircle className="w-6 h-6 text-teal-400" />
                </div>
                <div className="text-white font-bold mb-1">Move In</div>
                <div className="text-gray-400">Complete relocation support included</div>
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
export function MembershipBenefitsSection({ onJoinMembership }: { onJoinMembership?: () => void }) {
  const [isExpanded, setIsExpanded] = useState(false);

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
              <span className="bg-gradient-to-r from-amber-400 to-orange-500 bg-clip-text text-transparent">Join FREE + Welcome Bonus</span>
              {isExpanded ? (
                <ChevronUp className="w-8 h-8 text-amber-400" />
              ) : (
                <ChevronDown className="w-8 h-8 text-amber-400" />
              )}
            </button>
          </h2>
          <p className="text-lg text-gray-300 max-w-2xl mx-auto mb-4">
            <span className="text-amber-400 font-bold"><DirhamSymbol size={14} className="mr-0.5" />99</span> Loyalty Starter Kit: FREE Shower Filter + Chill & Grill D100 Voucher
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
                  <h3 className="text-2xl font-bold text-white mb-2"><DirhamSymbol size={18} className="mr-1" />99 Starter Kit Benefits</h3>
                  <p className="text-gray-300 mb-4">
                    Get FREE Shower Filter (<DirhamSymbol size={12} className="mr-0.5" />399) + Discounted Installation for Loyalty Members + Chill & Grill D100 Voucher + 1000 Loyalty Points
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
            <Link href="/leaderboard" className="block">
              <Button
                size="lg"
                className="w-full max-w-md mx-auto flex items-center justify-center gap-3 bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-black font-bold px-12 py-6 text-xl shadow-2xl transform hover:scale-105 transition-all rounded-full"
                data-testid="button-join-loyalty-membership"
              >
                <Rocket className="w-6 h-6 flex-shrink-0" />
                <span>JOIN LOYALTY - <DirhamSymbol size={14} className="mx-0.5" />99</span>
              </Button>
            </Link>
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
                          <span className="font-bold text-white">FREE Ionic Shower Filter</span> (<DirhamSymbol size={10} className="mr-0.5" />399 value)
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
                          <span className="font-bold text-white">Instant D100 Voucher</span> with <DirhamSymbol size={10} className="mx-0.5" />99 membership
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

        {/* 3-Way Path Selector - Start Your Journey */}
        <div className="flex justify-center my-16">
          <div className="flex flex-col md:flex-row items-center gap-8">
            {/* Path 1: Smart Home */}
            <button
              onClick={() => {
                const step1Section = document.querySelector('[data-section="step-1"]');
                if (step1Section) {
                  step1Section.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }
              }}
              className="flex flex-col items-center cursor-pointer hover:scale-105 transition-all duration-300 border-0 bg-transparent p-0"
              aria-label="Start Your Journey - Smart Home"
              data-testid="button-scroll-step-1"
            >
              <div className="w-1 h-12 bg-gradient-to-b from-teal-500 to-emerald-500 mb-2"></div>
              <div className="w-14 h-14 bg-gradient-to-r from-emerald-500 to-green-500 rounded-full flex items-center justify-center animate-pulse shadow-2xl border-4 border-white/20">
                <Home className="w-7 h-7 text-white" />
              </div>
              <div className="w-1 h-12 bg-gradient-to-b from-green-500 to-emerald-500 mt-2"></div>
              <div className="text-xs text-emerald-400 mt-3 font-bold">SMART HOME</div>
            </button>

            {/* Path 2: Home Service */}
            <button
              onClick={() => {
                const step2Section = document.querySelector('[data-section="step-2"]');
                if (step2Section) {
                  step2Section.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }
              }}
              className="flex flex-col items-center cursor-pointer hover:scale-105 transition-all duration-300 border-0 bg-transparent p-0"
              aria-label="Start Your Journey - Home Service"
              data-testid="button-scroll-step-2"
            >
              <div className="w-1 h-12 bg-gradient-to-b from-purple-500 to-blue-500 mb-2"></div>
              <div className="w-14 h-14 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full flex items-center justify-center animate-pulse shadow-2xl border-4 border-white/20">
                <Droplets className="w-7 h-7 text-white" />
              </div>
              <div className="w-1 h-12 bg-gradient-to-b from-cyan-500 to-teal-500 mt-2"></div>
              <div className="text-xs text-cyan-400 mt-3 font-bold">HOME SERVICE</div>
            </button>

            {/* Path 3: Join Loyalty */}
            <button
              onClick={() => {
                const loyaltySection = document.querySelector('[data-section="membership-benefits"]');
                if (loyaltySection) {
                  loyaltySection.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }
              }}
              className="flex flex-col items-center cursor-pointer hover:scale-105 transition-all duration-300 border-0 bg-transparent p-0"
              aria-label="Start Your Journey - Join Loyalty"
              data-testid="button-scroll-membership"
            >
              <div className="w-1 h-12 bg-gradient-to-b from-indigo-500 to-amber-500 mb-2"></div>
              <div className="w-14 h-14 bg-gradient-to-r from-amber-500 to-orange-500 rounded-full flex items-center justify-center animate-pulse shadow-2xl border-4 border-white/20">
                <Crown className="w-7 h-7 text-white" />
              </div>
              <div className="w-1 h-12 bg-gradient-to-b from-orange-500 to-amber-500 mt-2"></div>
              <div className="text-xs text-amber-400 mt-3 font-bold">JOIN LOYALTY</div>
            </button>
          </div>
        </div>

        {/* 3-Step Progressive Flow with Visual Connectors */}
        {/* Step 1: Smart Home */}
        <div data-section="step-1">
          <StepSellIPhone />
        </div>

        {/* Flow Connector 1→2 */}
        <div className="flex justify-center mb-8">
          <div className="flex flex-col items-center">
            <div className="w-1 h-12 bg-gradient-to-b from-green-500 to-blue-500 mb-2"></div>
            <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-blue-500 rounded-full flex items-center justify-center animate-pulse shadow-lg">
              <ArrowDown className="w-6 h-6 text-white" />
            </div>
            <div className="w-1 h-12 bg-gradient-to-b from-blue-500 to-cyan-500 mt-2"></div>
            <div className="text-xs text-gray-400 mt-2 font-bold">NEXT STEP</div>
          </div>
        </div>

        {/* Step 2: Home Service */}
        <div data-section="step-2">
          <StepTwoExchange />
        </div>

        {/* Flow Connector 2→3 */}
        <div className="flex justify-center mb-8">
          <div className="flex flex-col items-center">
            <div className="w-1 h-12 bg-gradient-to-b from-teal-500 to-purple-500 mb-2"></div>
            <div className="w-12 h-12 bg-gradient-to-r from-teal-500 to-purple-500 rounded-full flex items-center justify-center animate-pulse shadow-lg">
              <ArrowDown className="w-6 h-6 text-white" />
            </div>
            <div className="w-1 h-12 bg-gradient-to-b from-purple-500 to-indigo-500 mt-2"></div>
            <div className="text-xs text-gray-400 mt-2 font-bold">NEXT STEP</div>
          </div>
        </div>

        {/* Step 3: Join Loyalty (Progress indicator step 3) */}
        <div data-section="membership-benefits">
          <ProgressIndicator currentStep={3} />
          <MembershipBenefitsSection />
        </div>

        {/* Flow Connector Loyalty→Play */}
        <div className="flex justify-center mb-8">
          <div className="flex flex-col items-center">
            <div className="w-1 h-12 bg-gradient-to-b from-amber-500 to-purple-500 mb-2"></div>
            <div className="w-12 h-12 bg-gradient-to-r from-amber-500 to-purple-500 rounded-full flex items-center justify-center animate-pulse shadow-lg">
              <ArrowDown className="w-6 h-6 text-white" />
            </div>
            <div className="w-1 h-12 bg-gradient-to-b from-purple-500 to-indigo-500 mt-2"></div>
            <div className="text-xs text-gray-400 mt-2 font-bold">BONUS STEP</div>
          </div>
        </div>

        {/* Demoted Play to Earn Section */}
        <div data-section="step-3">
          <StepOnePlay onJoinMission={() => setShowMissionSelection(true)} />
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