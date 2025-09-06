import { useState, useEffect } from "react";
import { Star, Clock, Users, Zap, Trophy, Target, Timer, Calculator, Smartphone, Leaf, ShoppingCart, Crown, Gift, Shield, CheckCircle, Building, Handshake, Heart, Sparkles, ChevronRight, Award, TrendingUp, ArrowRight, Gamepad2, Repeat, Droplets, Home, Package, Truck, Utensils } from "lucide-react";
import { Button } from "@/components/ui/button";
import { OptimizedImage } from "@/components/ui/optimized-image";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { MeetDeliInteractive } from "./meet-deli-interactive";
import { AquaCafeTab } from "./aquacafe-tab";
import { useImpactStats } from "@/hooks/use-impact-stats";
import { useLeaderboard } from "@/hooks/use-leaderboard";
import { useImageOptimization, useImageServiceWorker } from "@/hooks/use-image-optimization";
import { Link } from "wouter";
import mobile_water_purification_hero from "@assets/mobile-water-purification-hero.jpg";
// Old circular image removed - using new mobile water purification image in main hero

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
  return (
    <div className="flex items-center justify-center mb-8">
      <div className="flex items-center space-x-4">
        {[1, 2, 3].map((step) => (
          <div key={step} className="flex items-center">
            <div 
              className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm transition-all duration-300 ${
                currentStep >= step 
                  ? 'bg-hero-green-500 text-black animate-pulse' 
                  : 'bg-gray-600 text-gray-400'
              }`}
            >
              {currentStep > step ? <CheckCircle className="w-5 h-5" /> : step}
            </div>
            {step < 3 && (
              <div className={`w-16 h-0.5 transition-all duration-300 ${
                currentStep > step ? 'bg-hero-green-500' : 'bg-gray-600'
              }`} />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

// Step 1: Get Trade-in Offer Section
function StepOneTradeIn() {
  return (
    <section className="py-8 px-4 mb-8">
      <div className="max-w-4xl mx-auto">
        <ProgressIndicator currentStep={1} />
        
        <div className="text-center mb-8">
          <div className="inline-flex items-center bg-blue-500/20 backdrop-blur-sm rounded-full px-6 py-3 mb-6 border border-blue-500/50">
            <span className="text-blue-300 font-bold text-lg">STEP 1 - EXCHANGE</span>
          </div>
          <h2 className="text-3xl md:text-5xl font-black mb-4 text-white">
            Get Your Trade-in Offer
          </h2>
          <p className="text-lg text-gray-300 max-w-2xl mx-auto">
            Start your sustainability journey. Get instant valuation for your iPhone and unlock Planet Points.
          </p>
        </div>

        {/* Split-Screen iPhone Transformation Infographic */}
        <div className="glass rounded-2xl p-8 border border-blue-500/50 bg-gradient-to-br from-blue-500/10 to-cyan-500/10">
          <div className="grid lg:grid-cols-3 gap-8 items-center">
            
            {/* Left: iPhone Visual */}
            <div className="text-center">
              <div className="relative mb-6">
                <div className="w-32 h-48 mx-auto bg-gradient-to-b from-gray-800 to-gray-900 rounded-3xl border-4 border-gray-700 shadow-2xl transform rotate-3 hover:rotate-0 transition-transform duration-300">
                  <div className="w-full h-6 bg-black rounded-t-2xl"></div>
                  <div className="p-4 text-xs text-blue-400 font-mono">
                    <div className="text-center">📱</div>
                    <div className="mt-2">iPhone 14 Pro</div>
                  </div>
                </div>
                <div className="absolute -top-2 -right-2 w-8 h-8 bg-red-500 rounded-full flex items-center justify-center text-white text-xs font-bold animate-bounce">
                  NEW
                </div>
              </div>
              <h3 className="text-lg font-bold text-white mb-2">Your Device</h3>
              <p className="text-gray-400 text-sm">Any iPhone, any condition</p>
            </div>

            {/* Center: Transformation Arrow & Process */}
            <div className="text-center lg:order-2">
              <div className="relative">
                {/* Circular transformation flow */}
                <div className="w-24 h-24 mx-auto bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full flex items-center justify-center mb-4 animate-pulse">
                  <ArrowRight className="w-8 h-8 text-white" />
                </div>
                
                {/* Process steps mini infographic */}
                <div className="space-y-2 text-xs text-gray-300">
                  <div className="flex items-center justify-center gap-2">
                    <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                    <span>Evaluate</span>
                  </div>
                  <div className="flex items-center justify-center gap-2">
                    <div className="w-2 h-2 bg-cyan-400 rounded-full"></div>
                    <span>Transform</span>
                  </div>
                  <div className="flex items-center justify-center gap-2">
                    <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                    <span>Reward</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Right: Value Calculator Infographic */}
            <div className="lg:order-3">
              <div className="bg-gradient-to-br from-cyan-500/20 to-blue-500/20 rounded-xl p-4 border border-cyan-400/30">
                <h3 className="text-lg font-bold text-white mb-4 text-center">💰 Instant Value</h3>
                
                {/* Value progression infographic */}
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-2 bg-blue-500/20 rounded-lg">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 bg-gray-600 rounded-lg flex items-center justify-center text-xs">📱</div>
                      <span className="text-gray-300 text-sm">iPhone 12</span>
                    </div>
                    <div className="text-right">
                      <div className="text-blue-400 font-bold">2,500 PTS</div>
                      <div className="text-xs text-gray-400">≈ AED 250</div>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between p-2 bg-cyan-500/20 rounded-lg">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 bg-gray-700 rounded-lg flex items-center justify-center text-xs">📱</div>
                      <span className="text-gray-300 text-sm">iPhone 13</span>
                    </div>
                    <div className="text-right">
                      <div className="text-cyan-400 font-bold">3,200 PTS</div>
                      <div className="text-xs text-gray-400">≈ AED 320</div>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between p-2 bg-gradient-to-r from-cyan-500/30 to-green-500/30 rounded-lg border border-green-400/50">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 bg-gray-800 rounded-lg flex items-center justify-center text-xs">📱</div>
                      <span className="text-gray-200 font-medium text-sm">iPhone 14+</span>
                    </div>
                    <div className="text-right">
                      <div className="text-green-400 font-black">4,000+ PTS</div>
                      <div className="text-xs text-green-300">≈ AED 400+</div>
                    </div>
                  </div>
                </div>

                {/* Impact preview mini chart */}
                <div className="mt-4 p-3 bg-green-500/10 rounded-lg border border-green-500/30">
                  <div className="text-center text-xs text-green-400 mb-2">🌍 Your Impact Preview</div>
                  <div className="grid grid-cols-2 gap-2 text-xs">
                    <div className="text-center">
                      <div className="text-blue-300 font-bold">12,500L</div>
                      <div className="text-gray-400">Water Saved</div>
                    </div>
                    <div className="text-center">
                      <div className="text-green-300 font-bold">5.2kg</div>
                      <div className="text-gray-400">CO₂ Reduced</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Action Button */}
          <div className="mt-8 text-center">
            <Button 
              size="lg" 
              className="bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-400 hover:to-cyan-400 text-white font-bold px-12 py-4 text-xl shadow-2xl transform hover:scale-105 transition-all rounded-full"
              onClick={() => {
                const meetDeliSection = document.querySelector('[data-section="meet-deli"]');
                if (meetDeliSection) {
                  meetDeliSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
                  setTimeout(() => {
                    const input = meetDeliSection.querySelector('input, textarea, select');
                    if (input) (input as HTMLElement).focus();
                  }, 500);
                }
              }}
            >
              <Calculator className="mr-3 w-6 h-6" />
              Calculate My iPhone Value
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}

// Step 2: Earn Planet Points Section  
function StepTwoEarnPoints() {
  return (
    <section className="py-8 px-4 mb-8" data-section="step-2-earn-points">
      <div className="max-w-4xl mx-auto">
        <ProgressIndicator currentStep={2} />
        
        <div className="text-center mb-8">
          <div className="inline-flex items-center bg-green-500/20 backdrop-blur-sm rounded-full px-6 py-3 mb-6 border border-green-500/50">
            <span className="text-green-300 font-bold text-lg">STEP 2 - EARN</span>
          </div>
          <h2 className="text-3xl md:text-5xl font-black mb-4 text-white">
            Earn Planet Points
          </h2>
          <p className="text-lg text-gray-300 max-w-2xl mx-auto">
            Complete eco-missions and sustainability actions to multiply your points.
          </p>
        </div>

        {/* Animated Point Collection System Infographic */}
        <div className="glass rounded-2xl p-8 border border-green-500/50 bg-gradient-to-br from-green-500/10 to-emerald-500/10">
          <div className="grid lg:grid-cols-3 gap-8">
            
            {/* Left: Daily Activities Infographic */}
            <div>
              <h3 className="text-xl font-bold text-white mb-6 text-center">🌱 Daily Eco-Actions</h3>
              <div className="space-y-4">
                
                {/* Water Conservation */}
                <div className="relative p-4 bg-gradient-to-r from-blue-500/20 to-cyan-500/20 rounded-xl border border-blue-400/30">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-blue-500/30 rounded-full flex items-center justify-center">
                        <Droplets className="w-5 h-5 text-blue-400" />
                      </div>
                      <span className="text-gray-200 font-medium">Water Conservation</span>
                    </div>
                    <div className="text-right">
                      <div className="text-green-400 font-bold text-lg">+500 PTS</div>
                      <div className="text-xs text-gray-400">monthly</div>
                    </div>
                  </div>
                  {/* Progress bar */}
                  <div className="w-full bg-blue-900/50 rounded-full h-2 mb-2">
                    <div className="bg-gradient-to-r from-blue-400 to-cyan-400 h-2 rounded-full w-3/4 animate-pulse"></div>
                  </div>
                  <div className="text-xs text-blue-300">12,500L saved this month</div>
                </div>

                {/* Referrals */}
                <div className="relative p-4 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-xl border border-purple-400/30">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-purple-500/30 rounded-full flex items-center justify-center">
                        <Users className="w-5 h-5 text-purple-400" />
                      </div>
                      <span className="text-gray-200 font-medium">Refer Friends</span>
                    </div>
                    <div className="text-right">
                      <div className="text-green-400 font-bold text-lg">+1,000 PTS</div>
                      <div className="text-xs text-gray-400">per friend</div>
                    </div>
                  </div>
                  {/* Friend icons */}
                  <div className="flex gap-1 mb-2">
                    <div className="w-6 h-6 bg-purple-400 rounded-full flex items-center justify-center text-xs">👤</div>
                    <div className="w-6 h-6 bg-purple-400 rounded-full flex items-center justify-center text-xs">👤</div>
                    <div className="w-6 h-6 bg-gray-600 rounded-full flex items-center justify-center text-xs opacity-50">+</div>
                  </div>
                  <div className="text-xs text-purple-300">2 friends joined</div>
                </div>

                {/* Daily Check-in */}
                <div className="relative p-4 bg-gradient-to-r from-amber-500/20 to-yellow-500/20 rounded-xl border border-amber-400/30">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-amber-500/30 rounded-full flex items-center justify-center">
                        <Star className="w-5 h-5 text-amber-400 animate-pulse" />
                      </div>
                      <span className="text-gray-200 font-medium">Daily Check-in</span>
                    </div>
                    <div className="text-right">
                      <div className="text-green-400 font-bold text-lg">+100 PTS</div>
                      <div className="text-xs text-gray-400">daily</div>
                    </div>
                  </div>
                  {/* Week calendar */}
                  <div className="grid grid-cols-7 gap-1 mb-2">
                    {[1,2,3,4,5,6,7].map(day => (
                      <div key={day} className={`w-4 h-4 rounded ${day <= 4 ? 'bg-amber-400' : 'bg-gray-600'}`}></div>
                    ))}
                  </div>
                  <div className="text-xs text-amber-300">4 day streak!</div>
                </div>
              </div>
            </div>

            {/* Center: Animated Points Collector */}
            <div className="flex flex-col items-center justify-center">
              {/* Animated Point Counter */}
              <div className="relative mb-6">
                <div className="w-32 h-32 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full flex items-center justify-center shadow-2xl animate-bounce">
                  <div className="text-center">
                    <div className="text-3xl font-black text-white mb-1">7,500+</div>
                    <div className="text-xs text-green-100 font-bold">POINTS</div>
                  </div>
                </div>
                
                {/* Floating point indicators */}
                <div className="absolute -top-2 -right-2 w-8 h-8 bg-blue-400 rounded-full flex items-center justify-center text-white text-xs font-bold animate-ping">
                  +500
                </div>
                <div className="absolute -bottom-2 -left-2 w-8 h-8 bg-purple-400 rounded-full flex items-center justify-center text-white text-xs font-bold animate-pulse">
                  +1K
                </div>
                <div className="absolute top-4 -left-4 w-6 h-6 bg-amber-400 rounded-full flex items-center justify-center text-white text-xs font-bold animate-bounce">
                  +100
                </div>
              </div>

              {/* Point flow animation */}
              <div className="text-center mb-6">
                <div className="text-lg text-gray-300 mb-2">Average Monthly Points</div>
                <div className="flex items-center justify-center gap-2 text-green-400">
                  <TrendingUp className="w-5 h-5 animate-pulse" />
                  <span className="font-bold">Growing Your Impact</span>
                </div>
              </div>

              {/* Action button */}
              <Button 
                size="lg" 
                className="bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-400 hover:to-emerald-400 text-black font-bold px-10 py-4 text-xl shadow-2xl transform hover:scale-105 transition-all rounded-full"
                onClick={() => {
                  const step3Section = document.querySelector('[data-section="step-3"]');
                  if (step3Section) {
                    step3Section.scrollIntoView({ behavior: 'smooth', block: 'start' });
                  }
                }}
              >
                <Target className="mr-3 w-6 h-6" />
                Start Earning
              </Button>
            </div>

            {/* Right: Hero Level Progress Infographic */}
            <div>
              <h3 className="text-xl font-bold text-white mb-6 text-center">🏆 Hero Levels</h3>
              <div className="space-y-4">
                
                {/* Bronze Level - Completed */}
                <div className="p-4 bg-gradient-to-r from-orange-600/20 to-amber-600/20 rounded-xl border border-amber-500/50">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-8 h-8 bg-amber-600 rounded-full flex items-center justify-center">
                      <CheckCircle className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <div className="text-amber-400 font-bold">Bronze Hero</div>
                      <div className="text-xs text-gray-400">0 - 2,500 PTS</div>
                    </div>
                  </div>
                  <div className="w-full bg-amber-900/50 rounded-full h-2">
                    <div className="bg-gradient-to-r from-amber-600 to-orange-500 h-2 rounded-full w-full"></div>
                  </div>
                  <div className="text-xs text-amber-300 mt-1">✅ Completed</div>
                </div>

                {/* Silver Level - In Progress */}
                <div className="p-4 bg-gradient-to-r from-gray-500/20 to-slate-500/20 rounded-xl border border-gray-400/50 ring-2 ring-green-500/50">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-8 h-8 bg-gray-500 rounded-full flex items-center justify-center animate-pulse">
                      <Star className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <div className="text-gray-300 font-bold">Silver Hero</div>
                      <div className="text-xs text-gray-400">2,500 - 10,000 PTS</div>
                    </div>
                  </div>
                  <div className="w-full bg-gray-900/50 rounded-full h-2">
                    <div className="bg-gradient-to-r from-gray-500 to-slate-400 h-2 rounded-full w-3/4 animate-pulse"></div>
                  </div>
                  <div className="text-xs text-green-400 mt-1">🔥 Current: 7,500/10,000</div>
                </div>

                {/* Gold Level - Locked */}
                <div className="p-4 bg-gradient-to-r from-yellow-600/20 to-amber-500/20 rounded-xl border border-yellow-500/30 opacity-60">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-8 h-8 bg-yellow-600/50 rounded-full flex items-center justify-center">
                      <Crown className="w-5 h-5 text-yellow-400" />
                    </div>
                    <div>
                      <div className="text-yellow-400 font-bold">Gold Hero</div>
                      <div className="text-xs text-gray-400">10,000+ PTS</div>
                    </div>
                  </div>
                  <div className="w-full bg-yellow-900/50 rounded-full h-2">
                    <div className="bg-gray-600 h-2 rounded-full w-1/4"></div>
                  </div>
                  <div className="text-xs text-gray-500 mt-1">🔒 Unlocks at 10K PTS</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// Step 3: Redeem Rewards Section
function StepThreeRedeem() {
  return (
    <section className="py-8 px-4 mb-8" data-section="step-3">
      <div className="max-w-4xl mx-auto">
        <ProgressIndicator currentStep={3} />
        
        <div className="text-center mb-8">
          <div className="inline-flex items-center bg-amber-500/20 backdrop-blur-sm rounded-full px-6 py-3 mb-6 border border-amber-500/50">
            <span className="text-amber-300 font-bold text-lg">STEP 3 - REDEEM</span>
          </div>
          <h2 className="text-3xl md:text-5xl font-black mb-4">
            <span className="bg-gradient-to-r from-amber-400 to-orange-400 bg-clip-text text-transparent">
              Get Your Rewards
            </span>
          </h2>
          <p className="text-lg text-gray-300 max-w-2xl mx-auto">
            Transform your Planet Points into premium eco-products delivered to your home.
          </p>
        </div>

        {/* Product Showcase & Benefits Flowchart Infographic */}
        <div className="glass rounded-2xl p-8 border border-amber-500/50 bg-gradient-to-br from-amber-500/10 to-orange-500/10 mb-8">
          <div className="grid lg:grid-cols-3 gap-8">
            
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


      </div>
    </section>
  );
}

export function HeroChallengeLanding() {
  const { data: stats } = useImpactStats();
  const { isRegistered } = useImageServiceWorker();
  
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



        {/* 3-Step Progressive Flow */}
        <div data-section="step-1">
          <StepOneTradeIn />
          
          {/* Meet Deli - Interactive Trade Assistant positioned below Step 1 */}
          <div className="mb-8" data-section="meet-deli">
            <MeetDeliInteractive />
          </div>
        </div>

        <div data-section="step-2">
          <StepTwoEarnPoints />
        </div>

        <div data-section="step-3">
          <StepThreeRedeem />
        </div>

        {/* Main Tabs Section */}
        <div data-section="main-tabs" className="mt-16 mb-12">
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

        {/* Trust Indicators */}
        <div className="text-center">
          <p className="text-gray-400 text-sm">
            🔒 Secure • ⚡ Instant • 🌍 Environmental Impact Guaranteed
          </p>
        </div>
      </div>
    </section>
  );
}