import { useState, useEffect } from "react";
import { Star, Clock, Users, Zap, Trophy, Target, Timer, Calculator, Smartphone, Leaf, ShoppingCart, Crown, Gift, Shield, CheckCircle, Building, Handshake, Heart, Sparkles, ChevronRight, Award, TrendingUp, ArrowRight, Gamepad2, Repeat, Droplets, Home, Package, Truck, Utensils, ArrowDown, BarChart, X, User, Mail, Phone, MapPin, ChevronDown, ChevronUp, Play } from "lucide-react";
import { Button } from "@/components/ui/button";
import { OptimizedImage } from "@/components/ui/optimized-image";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { MeetDeliInteractive } from "./meet-deli-interactive";
import { AquaCafeTab } from "./aquacafe-tab";
import { HeroRegistrationModal, MissionSelectionModal } from "./hero-onboarding-modals";
import { TombolaWidget } from "./tombola-widget";
import { useImpactStats } from "@/hooks/use-impact-stats";
import { useLeaderboard } from "@/hooks/use-leaderboard";
import { useImageOptimization, useImageServiceWorker } from "@/hooks/use-image-optimization";
import { Link } from "wouter";
import mobile_water_purification_hero from "@assets/mobile-water-purification-hero.jpg";
import k8MachineImage from "@assets/without_text_1756065010951.jpg";
import showerFilterCollage from "@assets/collage_1755270492135.jpg";
import membershipCard from "@assets/Aquacafe_byDeliWer_Card_Corners_1755482696304.png";
import planetHeroesGaming from "@assets/generated_images/Planet_Heroes_environmental_gaming_7f7bf177.png";

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
    1: { icon: ShoppingCart, label: "Shop Smart" },
    2: { icon: Gift, label: "Claim Rewards" },  
    3: { icon: Play, label: "Create Impact" }
  };

  return (
    <div className="flex items-center justify-center mb-8">
      <div className="flex items-center space-x-6">
        {[1, 2, 3].map((step) => {
          const { icon: StepIcon, label } = stepConfig[step as keyof typeof stepConfig];
          return (
            <div key={step} className="flex flex-col items-center">
              <div className="flex items-center">
                <div 
                  className={`w-16 h-16 rounded-full flex items-center justify-center font-bold text-sm transition-all duration-300 border-2 ${
                    currentStep >= step 
                      ? 'bg-hero-green-500 text-black animate-pulse border-hero-green-400 shadow-lg shadow-hero-green-500/30' 
                      : 'bg-gray-600 text-gray-400 border-gray-500'
                  }`}
                >
                  {currentStep > step ? (
                    <CheckCircle className="w-8 h-8" />
                  ) : (
                    <StepIcon className="w-8 h-8" />
                  )}
                </div>
                {step < 3 && (
                  <div className={`w-20 h-1 transition-all duration-300 rounded-full ${
                    currentStep > step ? 'bg-hero-green-500 shadow-md shadow-hero-green-500/30' : 'bg-gray-600'
                  }`} />
                )}
              </div>
              <div className={`mt-2 text-xs font-bold ${
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

// Step 3: Create Impact Section (formerly Step 1)
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
              aria-label="Toggle Create Impact section"
              data-testid="toggle-create-impact"
            >
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400">
                Create Impact
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
        </div>

        {/* Metaverse Tombola Game Section */}
        {isExpanded && (
        <div className="glass rounded-2xl p-8 border border-purple-500/50 bg-gradient-to-br from-purple-950/30 to-indigo-950/30 relative overflow-hidden animate-in slide-in-from-top duration-500">
          {/* Floating particles */}
          <div className="absolute inset-0 opacity-20">
            <div className="absolute top-4 left-8 w-1 h-1 bg-purple-400 rounded-full animate-pulse"></div>
            <div className="absolute top-12 right-12 w-2 h-2 bg-blue-400 rounded-full animate-pulse delay-300"></div>
            <div className="absolute bottom-12 left-12 w-1 h-1 bg-pink-400 rounded-full animate-pulse delay-700"></div>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 relative z-10">
            
            {/* Left: Tombola Game Widget */}
            <div>
              <div className="text-center mb-6">
                <div className="inline-flex items-center gap-2 bg-purple-500/20 text-purple-400 px-4 py-2 rounded-full mb-4">
                  <Play className="w-5 h-5 animate-pulse" />
                  <span className="font-bold">🎮 IMPACT ACTIVITIES</span>
                  <Sparkles className="w-5 h-5 animate-pulse" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-2">🌍 Create Environmental Impact</h3>
                <p className="text-purple-200 text-sm mb-4">
                  Your actions support recycling, water renewal, and sustainability programs across Dubai & Pakistan!
                </p>
              </div>
              
              {/* Planet Heroes Gaming Visual */}
              <div className="mb-6 rounded-xl overflow-hidden border border-purple-500/30 shadow-2xl">
                <img 
                  src={planetHeroesGaming} 
                  alt="Planet Heroes Environmental Gaming - Create Impact Through Play" 
                  className="w-full h-auto"
                />
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
              
              {/* Tombola Widget with Metaverse Theme */}
              <div className="max-w-md mx-auto">
                <TombolaWidget heroId={heroId} theme="metaverse" size="full" />
              </div>
            </div>
            
            {/* Right: Play Mission Info */}
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
        )}
      </div>
    </section>
  );
}

// Step 1: Shop Smart Section (formerly Step 2)
function StepTwoExchange() {
  const [isExpanded, setIsExpanded] = useState(false);
  
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
              aria-label="Toggle Shop Smart section"
              data-testid="toggle-shop-smart"
            >
              <span className="bg-gradient-to-r from-green-400 to-blue-400 bg-clip-text text-transparent">
                Shop Smart
              </span>
              {isExpanded ? (
                <ChevronUp className="w-8 h-8 text-green-400" />
              ) : (
                <ChevronDown className="w-8 h-8 text-green-400" />
              )}
            </button>
          </h2>
          <p className="text-lg text-gray-300 max-w-2xl mx-auto mb-4">
            Premium Bundle: Trade your iPhone for Kangen Water K8 Machine with huge discounts and exclusive benefits
          </p>
          
          {/* Featured Bundle Banner */}
          <div className="max-w-3xl mx-auto bg-gradient-to-r from-blue-600/20 to-green-600/20 rounded-2xl p-6 border border-blue-500/50 backdrop-blur-sm">
            <div className="flex flex-col md:flex-row items-center gap-6">
              <div className="flex-1">
                <img 
                  src={k8MachineImage} 
                  alt="Kangen Water K8 Machine" 
                  className="w-full h-auto rounded-xl shadow-2xl"
                />
              </div>
              <div className="flex-1 text-center md:text-left">
                <div className="inline-flex items-center gap-2 bg-amber-500/20 text-amber-400 px-4 py-2 rounded-full mb-3">
                  <Star className="w-5 h-5" />
                  <span className="font-bold">FLAGSHIP OFFER</span>
                </div>
                <h3 className="text-2xl font-bold text-white mb-2">Kangen Water + iPhone Bundle</h3>
                <p className="text-gray-300 mb-4">
                  Trade your iPhone and get premium K8 Machine with massive savings and lifetime benefits
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

        {/* AquaCafe Planetary Missions */}
        {isExpanded && (
        <>
        <div className="mb-8 animate-in slide-in-from-top duration-500">
          <div className="glass rounded-2xl p-8 border border-green-500/50 bg-gradient-to-br from-green-500/10 to-blue-500/10">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              
              {/* Left: AquaCafe Missions Header */}
              <div className="space-y-6">
                <div className="text-center mb-6">
                  <div className="inline-flex items-center gap-2 bg-blue-500/20 text-blue-400 px-4 py-2 rounded-full mb-4">
                    <Droplets className="w-5 h-5" />
                    <span className="font-bold">💧 AQUACAFE MISSIONS</span>
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-2">Join AquaCafe & Complete Missions</h3>
                  <p className="text-gray-200 text-sm">
                    Join AquaCafe loyalty program and complete planetary missions including iPhone trade-ins for maximum impact.
                  </p>
                </div>
                
                {/* AquaCafe CTA */}
                <div className="text-center">
                  <Link href="/aquacafe">
                    <Button 
                      size="lg" 
                      className="w-full bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white font-bold px-8 py-4 text-xl shadow-2xl transform hover:scale-105 transition-all rounded-full mb-4"
                      data-testid="button-join-aquacafe-missions"
                    >
                      <Droplets className="mr-3 w-6 h-6" />
                      Join AquaCafe Loyalty
                    </Button>
                  </Link>
                  <div className="text-xs text-gray-400">
                    Unlock iPhone trade-in missions & premium water systems
                  </div>
                </div>
                
                {/* Other Missions */}
                <div className="text-center">
                  <div className="text-gray-400 text-sm mb-3">Other ways to earn points:</div>
                  <div className="flex justify-center gap-4 text-xs">
                    <div className="text-center">
                      <div className="text-blue-400 font-bold">+50-200</div>
                      <div className="text-gray-500">Water Systems</div>
                    </div>
                    <div className="text-center">
                      <div className="text-purple-400 font-bold">+25-100</div>
                      <div className="text-gray-500">Referrals</div>
                    </div>
                    <div className="text-center">
                      <div className="text-amber-400 font-bold">+100</div>
                      <div className="text-gray-500">Daily Spin</div>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Right: Planetary Missions Overview */}
              <div className="text-center">
                <div className="mb-6">
                  <div className="inline-flex items-center gap-2 bg-green-500/20 text-green-400 px-4 py-2 rounded-full mb-4">
                    <Target className="w-5 h-5" />
                    <span className="font-bold">🌍 MISSIONS AVAILABLE</span>
                  </div>
                  <h3 className="text-xl font-bold text-white mb-4">Complete & Earn Points</h3>
                </div>
                
                {/* Mission Types Preview */}
                <div className="space-y-3">
                  <Link href="/earn">
                    <div className="flex justify-between items-center p-3 bg-slate-700/50 rounded-lg hover:bg-slate-600/50 transition-all duration-300 cursor-pointer group" data-testid="button-step2-trade-in">
                      <div className="flex items-center">
                        <Smartphone className="w-5 h-5 text-amber-400 mr-2 group-hover:scale-110 transition-transform" />
                        <span className="text-white font-medium group-hover:text-amber-300 transition-colors">iPhone Trade-In</span>
                      </div>
                      <div className="text-right">
                        <div className="text-green-400 font-bold">+2,000-4,000 PTS</div>
                        <div className="text-amber-400 text-sm group-hover:text-amber-300 transition-colors">Max rewards</div>
                      </div>
                    </div>
                  </Link>
                  <div className="flex justify-between items-center p-3 bg-slate-700/50 rounded-lg">
                    <div className="flex items-center">
                      <Droplets className="w-5 h-5 text-cyan-400 mr-2" />
                      <span className="text-white font-medium">Water System Setup</span>
                    </div>
                    <div className="text-right">
                      <div className="text-green-400 font-bold">+500 PTS</div>
                      <div className="text-cyan-400 text-sm">Monthly</div>
                    </div>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-slate-700/50 rounded-lg">
                    <div className="flex items-center">
                      <Users className="w-5 h-5 text-purple-400 mr-2" />
                      <span className="text-white font-medium">Referral Mission</span>
                    </div>
                    <div className="text-right">
                      <div className="text-green-400 font-bold">+1,000 PTS</div>
                      <div className="text-purple-400 text-sm">Per friend</div>
                    </div>
                  </div>
                </div>
                
                {/* Mission Calculator CTA */}
                <div className="mt-6">
                  <div className="text-xs text-gray-400 mb-4">
                    🎯 Complete missions to unlock higher Planet Points multipliers
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Meet Deli Interactive Component */}
        <div className="glass rounded-2xl p-8 border border-green-500/50 bg-gradient-to-br from-green-500/10 to-emerald-500/10">
          <MeetDeliInteractive />
        </div>
        </>
        )}
      </div>
    </section>
  );
}

// Step 2: Claim Rewards Section (formerly Step 3)
function StepThreeRewards() {
  const [isExpanded, setIsExpanded] = useState(false);
  
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
              aria-label="Toggle Claim Rewards section"
              data-testid="toggle-claim-rewards"
            >
              <span className="bg-gradient-to-r from-amber-400 to-orange-400 bg-clip-text text-transparent">
                Claim Rewards
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
        </div>

        {/* Product Showcase & Benefits Flowchart Infographic */}
        {isExpanded && (
        <>
        {/* Chill & Grill Promotional Banner */}
        <div className="mb-8 animate-in slide-in-from-top duration-300">
          <div className="bg-gradient-to-r from-orange-600 via-red-600 to-pink-600 rounded-2xl p-6 border-2 border-orange-400/50 shadow-2xl">
            <div className="text-center">
              <div className="flex items-center justify-center gap-2 mb-3">
                <Utensils className="w-6 h-6 text-white" />
                <h3 className="text-2xl md:text-3xl font-black text-white">🍕 Chill & Grill Rewards</h3>
                <Gift className="w-6 h-6 text-white animate-bounce" />
              </div>
              <p className="text-white text-lg mb-4 font-bold">
                Get D100 voucher for each friend signup! Pizza for Two + Kulfi just D99
              </p>
              <div className="flex flex-wrap items-center justify-center gap-4">
                <div className="bg-white/20 backdrop-blur-sm rounded-lg px-4 py-2 border border-white/30">
                  <div className="text-yellow-300 text-sm font-bold">D100 VOUCHER</div>
                  <div className="text-white text-xs">Per Referral</div>
                </div>
                <div className="bg-white/20 backdrop-blur-sm rounded-lg px-4 py-2 border border-white/30">
                  <div className="text-yellow-300 text-sm font-bold">D99 ONLY</div>
                  <div className="text-white text-xs">Pizza + Kulfi</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Unified Rewards Page CTA - Inside Collapsible */}
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

                {/* Baker's Kitchen Vouchers */}
                <div className="relative p-4 bg-gradient-to-r from-orange-600/20 to-amber-600/20 rounded-xl border border-orange-400/50 hover:scale-105 transition-transform">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-amber-500 rounded-2xl flex items-center justify-center">
                      <Utensils className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <div className="text-white font-bold">Baker's Kitchen</div>
                      <div className="text-xs text-gray-400">Dining vouchers</div>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="text-2xl font-black text-amber-400">3,500 PTS</div>
                    <div className="text-xs text-gray-400 text-right">
                      <div>≈ AED 350 value</div>
                      <div className="text-orange-400">🍽️ Partnership</div>
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



        {/* 3-Step Progressive Flow with Visual Connectors */}
        {/* Step 1: Shop Smart */}
        <div data-section="step-1">
          <StepTwoExchange />
          
        </div>

        {/* Flow Connector 1→2 */}
        <div className="flex justify-center mb-8">
          <div className="flex flex-col items-center">
            <div className="w-1 h-12 bg-gradient-to-b from-green-500 to-amber-500 mb-2"></div>
            <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-amber-500 rounded-full flex items-center justify-center animate-pulse shadow-lg">
              <ArrowDown className="w-6 h-6 text-white" />
            </div>
            <div className="w-1 h-12 bg-gradient-to-b from-amber-500 to-orange-500 mt-2"></div>
            <div className="text-xs text-gray-400 mt-2 font-bold">NEXT STEP</div>
          </div>
        </div>

        {/* Step 2: Claim Rewards */}
        <div data-section="step-2">
          <StepThreeRewards />
        </div>

        {/* Flow Connector 2→3 */}
        <div className="flex justify-center mb-8">
          <div className="flex flex-col items-center">
            <div className="w-1 h-12 bg-gradient-to-b from-amber-500 to-purple-500 mb-2"></div>
            <div className="w-12 h-12 bg-gradient-to-r from-amber-500 to-purple-500 rounded-full flex items-center justify-center animate-pulse shadow-lg">
              <ArrowDown className="w-6 h-6 text-white" />
            </div>
            <div className="w-1 h-12 bg-gradient-to-b from-purple-500 to-indigo-500 mt-2"></div>
            <div className="text-xs text-gray-400 mt-2 font-bold">FINAL STEP</div>
          </div>
        </div>

        {/* Step 3: Create Impact */}
        <div data-section="step-3">
          <StepOnePlay onJoinMission={() => setShowHeroRegistration(true)} />
        </div>

        {/* Main Tabs Section - Collapsible with AquaCafe Membership Card Banner */}
        <div data-section="main-tabs" className="mt-16 mb-12">
          <CollapsibleTabsSection />
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