import { useState, useEffect } from "react";
import { Star, Clock, Users, Zap, Trophy, Target, Timer, Calculator, Smartphone, Leaf, ShoppingCart, Crown, Gift, Shield, CheckCircle, Building, Handshake, Heart, Sparkles, ChevronRight, Award, TrendingUp, ArrowRight, Gamepad2, Repeat, Droplets, Home, Package, Truck, Utensils } from "lucide-react";
import { Button } from "@/components/ui/button";
import { OptimizedImage } from "@/components/ui/optimized-image";
import { MeetDeliInteractive } from "./meet-deli-interactive";
import { useImpactStats } from "@/hooks/use-impact-stats";
import { useLeaderboard } from "@/hooks/use-leaderboard";
import { useImageOptimization, useImageServiceWorker } from "@/hooks/use-image-optimization";
import { Link } from "wouter";
import heroImage from "@assets/generated_images/iPhone_water_circular_exchange_e4541c3c.png";

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

function ComprehensiveCampaignSection() {
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    // iPhone 17 Apple Event - Tuesday, September 9, 2025 at 10 AM PDT (6 PM GMT+4 Dubai)
    const eventDate = new Date('2025-09-09T18:00:00+04:00'); // 6 PM Dubai time
    
    const updateCountdown = () => {
      const now = new Date();
      const difference = eventDate.getTime() - now.getTime();
      
      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((difference % (1000 * 60)) / 1000)
        });
      }
    };

    updateCountdown();
    const interval = setInterval(updateCountdown, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section id="planet-points-challenge" className="py-16 px-4 relative overflow-hidden bg-gradient-to-br from-slate-900 via-purple-900/30 to-blue-900/30 mb-12">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 to-blue-500/10 rounded-3xl"></div>
      <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-96 h-96 bg-gradient-to-r from-hero-green-500/20 to-blue-500/20 rounded-full blur-3xl animate-pulse-glow"></div>
      
      <div className="max-w-6xl mx-auto relative z-10">
        {/* Gamified iPhone 17 Challenge Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Gamepad2 className="w-8 h-8 text-emerald-400" />
            <div className="inline-flex items-center bg-gradient-to-r from-hero-green-500/30 to-purple-500/30 border border-hero-green-400/50 rounded-full px-6 py-2 shadow-lg backdrop-blur-sm">
              <Zap className="w-4 h-4 text-hero-green-300 mr-2" />
              <span className="text-hero-green-200 font-bold text-sm tracking-wide">BEAT ETISALAT & DU AT THEIR GAME</span>
              <Zap className="w-4 h-4 text-hero-green-300 ml-2" />
            </div>
            <Trophy className="w-8 h-8 text-amber-400" />
          </div>
          
          <h2 className="text-4xl md:text-6xl font-black mb-4 leading-tight">
            <span className="bg-gradient-to-r from-white via-hero-green-200 to-purple-200 bg-clip-text text-transparent">
              PLANET POINTS CHALLENGE
            </span>
            <br />
            <span className="text-2xl md:text-3xl text-amber-400 font-bold">Win iPhone 17 • Sep 9 Launch</span>
          </h2>
          
          <p className="text-lg text-gray-300 max-w-4xl mx-auto mb-8 leading-relaxed">
            Play the AquaCafe game - collect Planet Points through trade-ins and eco-missions. 
            <strong className="text-hero-green-400"> Maximize store credit to minimize cash</strong> for iPhone 17 upgrade at GITEX 2025.
          </p>
        </div>

        {/* Three-Step Gamified Participation Process */}
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          {/* Step 1: Exchange/Trade-In */}
          <div className="glass rounded-2xl p-6 border border-blue-500/50 bg-gradient-to-br from-blue-500/10 to-cyan-500/10 backdrop-blur-sm relative">
            <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
              <div className="bg-blue-500 text-white font-bold px-4 py-1 rounded-full text-sm">STEP 1</div>
            </div>
            <div className="text-center mt-4">
              <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <Repeat className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">EXCHANGE</h3>
              <p className="text-gray-300 mb-4">Trade your old iPhone for instant Planet Points + store credit</p>
              
              {/* Points Breakdown */}
              <div className="space-y-2 text-sm">
                <div className="flex justify-between items-center bg-blue-500/20 rounded-lg p-2">
                  <span className="text-gray-300">iPhone 14</span>
                  <span className="text-blue-400 font-bold">2,500 PTS</span>
                </div>
                <div className="flex justify-between items-center bg-blue-500/20 rounded-lg p-2">
                  <span className="text-gray-300">iPhone 15</span>
                  <span className="text-blue-400 font-bold">3,200 PTS</span>
                </div>
                <div className="flex justify-between items-center bg-gradient-to-r from-blue-500/30 to-purple-500/30 rounded-lg p-2 border border-purple-400/50">
                  <span className="text-gray-200 font-medium">iPhone 16</span>
                  <span className="text-purple-400 font-black">4,000 PTS</span>
                </div>
              </div>
            </div>
          </div>

          {/* Step 2: Collect Planet Points */}
          <div className="glass rounded-2xl p-6 border border-hero-green-500/50 bg-gradient-to-br from-hero-green-500/10 to-emerald-500/10 backdrop-blur-sm relative transform scale-105 z-10">
            <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
              <div className="bg-hero-green-500 text-black font-bold px-4 py-1 rounded-full text-sm">STEP 2 - ACTIVE</div>
            </div>
            <div className="text-center mt-4">
              <div className="w-16 h-16 bg-gradient-to-r from-hero-green-500 to-emerald-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <Target className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">COLLECT POINTS</h3>
              <p className="text-gray-300 mb-4">Complete eco-missions and level up to meet iPhone 17 shortfall</p>
              
              {/* Mission Options */}
              <div className="space-y-2 text-sm">
                <div className="flex justify-between items-center bg-hero-green-500/20 rounded-lg p-2">
                  <div className="flex items-center">
                    <Droplets className="w-4 h-4 text-blue-400 mr-2" />
                    <span className="text-gray-300">AquaCafe Mission</span>
                  </div>
                  <span className="text-hero-green-400 font-bold">+1,500</span>
                </div>
                <div className="flex justify-between items-center bg-hero-green-500/20 rounded-lg p-2">
                  <div className="flex items-center">
                    <Users className="w-4 h-4 text-purple-400 mr-2" />
                    <span className="text-gray-300">Referral Bonus</span>
                  </div>
                  <span className="text-hero-green-400 font-bold">+800</span>
                </div>
                <div className="flex justify-between items-center bg-gradient-to-r from-hero-green-500/30 to-amber-500/30 rounded-lg p-2 border border-amber-400/50">
                  <div className="flex items-center">
                    <Star className="w-4 h-4 text-amber-400 mr-2" />
                    <span className="text-gray-200 font-medium">Media Share</span>
                  </div>
                  <span className="text-amber-400 font-black">+1,200</span>
                </div>
              </div>
            </div>
          </div>

          {/* Step 3: Redeem iPhone 17 */}
          <div className="glass rounded-2xl p-6 border border-purple-500/50 bg-gradient-to-br from-purple-500/10 to-pink-500/10 backdrop-blur-sm relative">
            <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
              <div className="bg-purple-500 text-white font-bold px-4 py-1 rounded-full text-sm">STEP 3</div>
            </div>
            <div className="text-center mt-4">
              <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <Crown className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">REDEEM</h3>
              <p className="text-gray-300 mb-4">Use points as store credit to minimize cash for iPhone 17</p>
              
              {/* iPhone 17 Pricing Strategy */}
              <div className="space-y-2 text-sm">
                <div className="bg-purple-500/20 rounded-lg p-3">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-gray-300">iPhone 17 Pro</span>
                    <span className="text-white font-bold">AED 4,999</span>
                  </div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-hero-green-400">Store Credit</span>
                    <span className="text-hero-green-400">-AED 3,200</span>
                  </div>
                  <div className="border-t border-purple-400/30 pt-2">
                    <div className="flex justify-between items-center">
                      <span className="text-purple-300 font-bold">Cash Needed</span>
                      <span className="text-purple-400 font-black text-lg">AED 1,799</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Strategic Timing - Apple Event & GITEX 2025 */}
        <div className="grid md:grid-cols-2 gap-6 mb-12">
          {/* Apple Event Countdown */}
          <div className="glass rounded-2xl p-6 border border-amber-500/50 bg-gradient-to-br from-amber-500/10 to-orange-500/10">
            <h3 className="text-xl font-bold text-white mb-4 flex items-center justify-center">
              <Clock className="w-6 h-6 text-amber-400 mr-3" />
              iPhone 17 Launch Event
            </h3>
            
            <div className="grid grid-cols-2 gap-3 text-center mb-4">
              <div>
                <div className="bg-amber-500/30 border border-amber-400/50 rounded-xl p-3">
                  <div className="text-2xl font-black text-white">{timeLeft.days}</div>
                  <div className="text-sm text-gray-300">Days</div>
                </div>
              </div>
              <div>
                <div className="bg-amber-500/30 border border-amber-400/50 rounded-xl p-3">
                  <div className="text-2xl font-black text-white">{timeLeft.hours}</div>
                  <div className="text-sm text-gray-300">Hours</div>
                </div>
              </div>
            </div>
            
            <div className="text-center">
              <p className="text-amber-300 text-sm font-medium mb-2">Tuesday, Sep 9 • 6PM Dubai Time</p>
              <p className="text-gray-400 text-xs">Pre-order opens immediately after event</p>
            </div>
          </div>

          {/* GITEX 2025 Opportunity */}
          <div className="glass rounded-2xl p-6 border border-hero-green-500/50 bg-gradient-to-br from-hero-green-500/10 to-teal-500/10">
            <h3 className="text-xl font-bold text-white mb-4 flex items-center justify-center">
              <Sparkles className="w-6 h-6 text-hero-green-400 mr-3" />
              GITEX 2025 Launch Benefits
            </h3>
            
            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 bg-hero-green-500/20 rounded-lg">
                <div className="flex items-center">
                  <Star className="w-5 h-5 text-amber-400 mr-2" />
                  <span className="text-white">iPhone 17 Priority</span>
                </div>
                <span className="text-hero-green-400 font-bold">Guaranteed</span>
              </div>
              
              <div className="flex items-center justify-between p-3 bg-hero-green-500/20 rounded-lg">
                <div className="flex items-center">
                  <Gift className="w-5 h-5 text-purple-400 mr-2" />
                  <span className="text-white">Bonus Points</span>
                </div>
                <span className="text-purple-400 font-bold">+2,500 PTS</span>
              </div>
              
              <div className="flex items-center justify-between p-3 bg-gradient-to-r from-hero-green-500/30 to-amber-500/30 rounded-lg border border-amber-400/50">
                <div className="flex items-center">
                  <Crown className="w-5 h-5 text-amber-400 mr-2" />
                  <span className="text-white">Media Coverage</span>
                </div>
                <span className="text-amber-400 font-bold">Viral Story</span>
              </div>
            </div>
          </div>
        </div>

        {/* Main CTA - Fulfill Your Dreams */}
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-purple-600/20 via-blue-600/20 to-hero-green-600/20 p-8 border-2 border-hero-green-400/50 shadow-2xl mb-8">
          {/* Neon glow effect */}
          <div className="absolute inset-0 bg-gradient-to-r from-purple-400/10 via-blue-400/10 to-hero-green-400/10 animate-pulse"></div>
          <div className="absolute -inset-1 bg-gradient-to-r from-purple-400/20 via-blue-400/20 to-hero-green-400/20 rounded-3xl blur-xl animate-pulse"></div>
          
          <div className="relative z-10 text-center">
            <div className="inline-flex items-center bg-hero-green-500/30 border border-hero-green-400/50 rounded-full px-6 py-2 mb-6 backdrop-blur-sm">
              <Target className="w-5 h-5 text-hero-green-300 mr-2 animate-pulse" />
              <span className="text-hero-green-200 font-bold text-sm tracking-wide">MISSION MONTH • LIMITED TIME</span>
              <Target className="w-5 h-5 text-hero-green-300 ml-2 animate-pulse" />
            </div>
            
            <h3 className="text-4xl md:text-5xl font-black mb-4 leading-tight">
              <span className="bg-gradient-to-r from-hero-green-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">
                FULFILL YOUR DREAMS
              </span>
            </h3>
            
            <p className="text-xl text-gray-200 mb-8 max-w-3xl mx-auto leading-relaxed">
              Transform your old iPhone into iPhone 17 with <strong className="text-hero-green-400">minimal cash</strong>. 
              Upgrade communication & health essentials through Planet Points system.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={() => {
                  const meetDeliSection = document.querySelector('[data-section="meet-deli"]');
                  if (meetDeliSection) {
                    meetDeliSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
                    // Focus on the input after scrolling
                    setTimeout(() => {
                      const input = meetDeliSection.querySelector('input, textarea, select');
                      if (input) {
                        (input as HTMLElement).focus();
                      }
                    }, 500);
                  }
                }}
                className="relative group bg-gradient-to-r from-hero-green-500 to-emerald-500 hover:from-hero-green-400 hover:to-emerald-400 text-black font-black px-12 py-6 text-2xl rounded-full shadow-2xl transform hover:scale-105 transition-all duration-300"
                data-testid="button-start-planet-mission"
              >
                <div className="absolute -inset-1 bg-gradient-to-r from-hero-green-400 to-emerald-400 rounded-full blur-lg opacity-70 group-hover:opacity-100 transition-opacity"></div>
                <div className="relative flex items-center">
                  <Gamepad2 className="w-8 h-8 mr-3" />
                  START PLANET MISSION
                </div>
              </button>
              
              <Link href="/leaderboard">
                <button className="border-2 border-purple-400 text-purple-400 hover:bg-purple-400/10 font-bold px-8 py-6 text-xl rounded-full backdrop-blur-sm transition-all">
                  <Trophy className="w-6 h-6 mr-2 inline" />
                  View Leaderboard
                </button>
              </Link>
            </div>
            
            <div className="mt-6 text-hero-green-300 text-sm">
              🎮 Play • 📱 Upgrade • 💧 Transform • 🏆 Win iPhone 17
            </div>
          </div>
        </div>
        
        <div className="text-center">
          <p className="text-gray-400 text-sm">
            🚀 Apple Event Sep 9 • 🎯 GITEX 2025 media campaign • 💎 Maximum store credit strategy • ⚡ Beat telco limitations
          </p>
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
        {/* Main Hero Background Image */}
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `url('/attached_assets/generated_images/iPhone_water_circular_exchange_e4541c3c.png')`,
            backgroundSize: 'cover',
            backgroundPosition: 'center center',
          }}
        />
        
        {/* Overlay pattern with original colors */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_25%_25%,rgba(34,197,94,0.3)_0%,transparent_50%)]"></div>
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_75%_75%,rgba(59,130,246,0.3)_0%,transparent_50%)]"></div>
        </div>
        
        {/* Animated floating elements */}
        <div className="absolute top-10 right-10 w-20 h-20 bg-hero-green-500/10 rounded-full blur-xl animate-float"></div>
        <div className="absolute top-32 left-10 w-16 h-16 bg-blue-500/10 rounded-full blur-lg animate-float-delayed"></div>
        <div className="absolute bottom-32 right-32 w-24 h-24 bg-purple-500/10 rounded-full blur-xl animate-pulse-slow"></div>
        <div className="absolute bottom-20 left-20 w-12 h-12 bg-amber-500/10 rounded-full blur-lg animate-bounce-slow"></div>
        
        {/* Subtle brand accent gradients without dark overlay */}
        <div className="absolute top-0 left-0 w-full h-1/4 bg-gradient-to-b from-hero-green-900/10 to-transparent"></div>
        <div className="absolute bottom-0 left-0 w-full h-1/4 bg-gradient-to-t from-dubai-blue-900/10 to-transparent"></div>
      </div>
      <div className="max-w-7xl mx-auto relative z-10">
        {/* Simplified Header Text */}
        <div className="text-center mb-8" data-testid="challenge-header">
          {/* Simplified Badge */}
          <div className="inline-flex items-center bg-hero-green-500/20 backdrop-blur-sm rounded-full px-4 py-2 mb-6 border border-hero-green-500/50">
            <span className="text-hero-green-300 font-bold text-sm tracking-wide">🔄 WORLD'S FIRST SUSTAINABILITY GAME</span>
          </div>
          
          {/* Powerful, Direct Headline */}
          <h1 className="text-4xl sm:text-6xl md:text-7xl font-black mb-6 leading-tight max-w-4xl mx-auto" data-testid="hero-challenge-title">
            <span className="block text-white drop-shadow-lg font-extrabold">From iPhones to Water,</span>
            <span className="block from-hero-green-400 to-blue-400 bg-clip-text text-transparent drop-shadow-lg font-bold bg-[#3787eb] text-[50px]">a Circular Exchange</span>
          </h1>
          
          <p className="text-xl sm:text-2xl text-gray-200 max-w-3xl mx-auto mb-8 leading-relaxed">Join Dubai’s first sustainable trade-in → Unlock Clean Water for Your Home</p>
        </div>

        {/* Hero Image with Overlaid Benefits */}
        <div className="text-center mb-12">
          <div className="relative max-w-6xl mx-auto">
            {/* Hero Image Background */}
            <div className="relative rounded-3xl overflow-hidden border-2 border-hero-green-500/50 shadow-2xl">
              <img
                src="/iPhone_water_circular_exchange_e4541c3c.png"
                alt="iPhone Water Circular Exchange - Transform your iPhone into premium water systems"
                className="w-full h-auto"
                style={{ minHeight: '500px', maxHeight: '700px', objectFit: 'cover' }}
                loading="eager"
                data-testid="hero-main-image"
                onError={(e) => {
                  console.error('Image failed to load:', e);
                  e.currentTarget.src = '/attached_assets/generated_images/iPhone_water_circular_exchange_e4541c3c.png';
                }}
              />
              
              {/* Gradient Overlay for Text Readability */}
              <div className="absolute inset-0 bg-gradient-to-b from-slate-900/20 via-slate-900/50 to-slate-900/80"></div>
              
              {/* Content Overlay */}
              <div className="absolute inset-0 flex flex-col justify-end p-6 md:p-8">
                
                {/* Key Stats */}
                <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-8 mb-6">
                  <HeroSpotCounter />
                  <CountdownTimer />
                </div>
                
                
                
                {/* Clear Main CTAs */}
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button 
                    size="lg" 
                    className="bg-hero-green-500 hover:bg-hero-green-600 text-black font-bold px-10 py-4 text-xl shadow-2xl transform hover:scale-105 transition-all rounded-full"
                    onClick={() => {
                      const meetDeliSection = document.querySelector('[data-section="meet-deli"]');
                      if (meetDeliSection) {
                        meetDeliSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
                        // Focus on the input after scrolling
                        setTimeout(() => {
                          const input = meetDeliSection.querySelector('input, textarea, select');
                          if (input) {
                            (input as HTMLElement).focus();
                          }
                        }, 500);
                      }
                    }}
                    data-testid="button-get-trade-value"
                  >
                    <Smartphone className="mr-3 w-6 h-6" />
                    Get My Trade Value
                  </Button>
                  <Link href="/leaderboard">
                    <Button 
                      size="lg"
                      variant="outline" 
                      className="border-2 border-white text-white hover:bg-white hover:text-black px-10 py-4 text-xl font-bold transition-all rounded-full backdrop-blur-sm bg-slate-900/20"
                    >
                      <Trophy className="mr-3 w-6 h-6" />
                      Join Heroes
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Meet Deli - Interactive Trade Assistant */}
        <div className="mb-16">
          <MeetDeliInteractive />
        </div>

        {/* Comprehensive Campaign Section */}
        <ComprehensiveCampaignSection />


        {/* Planet Heroes Rewards - Unified Section */}
        <div className="glass rounded-3xl p-8 border border-emerald-500/30 bg-gradient-to-br from-emerald-600/10 via-teal-600/10 to-blue-600/10 mb-12" data-testid="planet-heroes-rewards-section">
          <div className="text-center mb-8">
            <div className="flex items-center justify-center gap-6 mb-8">
              <img 
                src="/attached_assets/deliwer logo_1755631863675.png" 
                alt="DeliWer" 
                className="h-16 w-auto"
              />
              <div className="inline-flex items-center bg-gradient-to-r from-amber-500/30 to-orange-500/30 border border-amber-400/50 rounded-2xl px-8 py-4 shadow-lg backdrop-blur-sm">
                <Trophy className="w-6 h-6 text-amber-300 mr-3" />
                <span className="text-amber-200 font-black text-lg tracking-wide">DUBAI ENVIRONMENTAL CHAMPIONS</span>
              </div>
            </div>
            <h2 className="text-4xl md:text-6xl font-black mb-6 leading-tight">
              <span className="bg-gradient-to-r from-amber-400 via-orange-400 to-red-400 bg-clip-text text-transparent">
                PLANET HEROES REWARDS
              </span>
            </h2>
            <div className="glass rounded-3xl p-8 border border-hero-green-500/50 bg-gradient-to-r from-hero-green-500/10 to-blue-500/10 backdrop-blur-sm max-w-4xl mx-auto mb-8">
              <div className="flex items-center justify-center gap-4 mb-4">
                <Home className="w-8 h-8 text-hero-green-400" />
                <span className="text-3xl font-black text-white">All at the convenience of your home</span>
                <Package className="w-8 h-8 text-blue-400" />
              </div>
              <div className="flex items-center justify-center gap-8 text-lg text-gray-300">
                <div className="flex items-center gap-2">
                  <Truck className="w-5 h-5 text-hero-green-400" />
                  <span>Free Delivery</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-5 h-5 text-blue-400" />
                  <span>Same Day</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-amber-400" />
                  <span>Instant Rewards</span>
                </div>
              </div>
            </div>
          </div>

          {/* Three-Step Process - Enhanced Step 3 */}
          <div className="grid md:grid-cols-3 gap-6 mb-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-white">1</span>
              </div>
              <h3 className="text-xl font-bold text-white mb-3">Exchange</h3>
              <p className="text-gray-300 mb-4">Trade your old iPhone for instant Planet Points and exclusive rewards</p>
              <div className="flex items-center justify-center gap-2">
                <CheckCircle className="w-5 h-5 text-hero-green-500" />
                <span className="text-hero-green-400 font-semibold">Get Started</span>
              </div>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-emerald-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-white">2</span>
              </div>
              <h3 className="text-xl font-bold text-white mb-3">Collect</h3>
              <p className="text-gray-300 mb-4">Earn Planet Points through eco-missions and sustainability actions</p>
              <div className="flex items-center justify-center gap-2">
                <TrendingUp className="w-5 h-5 text-hero-green-500" />
                <span className="text-hero-green-400 font-semibold">Keep Growing</span>
              </div>
            </div>
            
            {/* Enhanced Step 3 - Matching Step 2 Style */}
            <div className="glass rounded-2xl p-6 border border-amber-500/50 bg-gradient-to-br from-amber-500/10 to-orange-500/10 backdrop-blur-sm relative transform scale-105 z-10">
              <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                <div className="bg-amber-500 text-black font-bold px-4 py-1 rounded-full text-sm">STEP 3 - REDEEM</div>
              </div>
              <div className="text-center mt-4">
                <div className="w-16 h-16 bg-gradient-to-r from-amber-500 to-orange-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Gift className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-white mb-3">REDEEM & EVOLVE</h3>
                <p className="text-gray-300 mb-4">Transform points into exclusive eco-rewards delivered to your home</p>
                
                {/* Reward Options */}
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between items-center bg-amber-500/20 rounded-lg p-2">
                    <div className="flex items-center">
                      <Smartphone className="w-4 h-4 text-blue-400 mr-2" />
                      <span className="text-gray-300">iPhone 17 Pro Max</span>
                    </div>
                    <span className="text-amber-400 font-bold">45,000 PTS</span>
                  </div>
                  <div className="flex justify-between items-center bg-amber-500/20 rounded-lg p-2">
                    <div className="flex items-center">
                      <Droplets className="w-4 h-4 text-blue-400 mr-2" />
                      <span className="text-gray-300">AquaCafe System</span>
                    </div>
                    <span className="text-amber-400 font-bold">15,000 PTS</span>
                  </div>
                  <div className="flex justify-between items-center bg-gradient-to-r from-amber-500/30 to-orange-500/30 rounded-lg p-2 border border-orange-400/50">
                    <div className="flex items-center">
                      <Utensils className="w-4 h-4 text-orange-400 mr-2" />
                      <span className="text-gray-200 font-medium">Bakers Kitchen</span>
                    </div>
                    <span className="text-orange-400 font-black">3,500 PTS</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Prominent Neon-Style CTA for Starter Kit */}
          <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-cyan-500/20 via-blue-500/20 to-purple-500/20 p-8 border-2 border-cyan-400/50 shadow-2xl mb-8">
            {/* Neon glow effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-cyan-400/10 via-blue-400/10 to-purple-400/10 animate-pulse"></div>
            <div className="absolute -inset-1 bg-gradient-to-r from-cyan-400/20 via-blue-400/20 to-purple-400/20 rounded-3xl blur-xl animate-pulse"></div>
            
            <div className="relative z-10 text-center">
              <div className="inline-flex items-center bg-cyan-500/30 border border-cyan-400/50 rounded-full px-6 py-2 mb-6 backdrop-blur-sm">
                <Sparkles className="w-5 h-5 text-cyan-300 mr-2 animate-pulse" />
                <span className="text-cyan-200 font-bold text-sm tracking-wide">LIMITED TIME - STARTER KIT</span>
                <Sparkles className="w-5 h-5 text-cyan-300 ml-2 animate-pulse" />
              </div>
              
              <h3 className="text-4xl md:text-5xl font-black mb-4 leading-tight">
                <span className="bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent animate-pulse">
                  AED 1,000+ VALUE
                </span>
              </h3>
              
              <p className="text-xl text-gray-200 mb-8 max-w-2xl mx-auto">
                Planet Hero Starter Kit with FREE AquaCafe Shower Filter + Exclusive Partner Benefits
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button
                  onClick={() => {
                    window.open('/aquacafe?starter=true&ref=NEON', '_blank');
                  }}
                  className="relative group bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-400 hover:to-blue-400 text-black font-black px-12 py-6 text-2xl rounded-full shadow-2xl transform hover:scale-105 transition-all duration-300"
                  data-testid="button-neon-starter-kit"
                >
                  <div className="absolute -inset-1 bg-gradient-to-r from-cyan-400 to-blue-400 rounded-full blur-lg opacity-70 group-hover:opacity-100 transition-opacity"></div>
                  <div className="relative flex items-center">
                    <Gift className="w-8 h-8 mr-3" />
                    SHOP AQUACAFE NOW
                  </div>
                </button>
                
                <button
                  onClick={() => {
                    const shareText = `🔥 Get the Planet Hero AED1000+ Starter Kit! FREE AquaCafe Shower Filter + Partner Benefits! Limited time: https://deliwer.com/aquacafe?starter=true`;
                    if (navigator.share) {
                      navigator.share({ title: 'Planet Hero Starter Kit', text: shareText });
                    } else {
                      navigator.clipboard.writeText(shareText);
                    }
                  }}
                  className="border-2 border-cyan-400 text-cyan-400 hover:bg-cyan-400/10 font-bold px-8 py-6 text-xl rounded-full backdrop-blur-sm transition-all"
                  data-testid="button-share-starter-kit"
                >
                  <Users className="w-6 h-6 mr-2 inline" />
                  Share Deal
                </button>
              </div>
              
              <div className="mt-6 text-cyan-300 text-sm">
                🎁 Includes: AED 399 Shower Filter + Premium Demo + Partner Vouchers
              </div>
            </div>
          </div>



          <div className="text-center">
            <div className="inline-flex items-center bg-emerald-900/30 border border-emerald-500/50 rounded-full px-6 py-3 mb-4">
              <Crown className="w-5 h-5 text-emerald-400 mr-2" />
              <span className="text-emerald-400 font-bold">Join Dubai's Environmental Leaders Today</span>
            </div>
            <div className="inline-flex items-center bg-red-500/20 border border-red-500/50 rounded-full px-4 py-2">
              <Clock className="w-4 h-4 text-red-400 mr-2" />
              <span className="text-red-400 font-bold text-sm">Founding Hero Program Expires in 6 days</span>
            </div>
          </div>
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


