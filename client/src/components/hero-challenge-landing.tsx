import { useState, useEffect } from "react";
import { Star, Clock, Users, Zap, Trophy, Target, Timer, Calculator, Smartphone, Leaf, ShoppingCart, Crown, Gift, Shield, CheckCircle, Building, Handshake, Heart, Sparkles, ChevronRight, Award, TrendingUp, ArrowRight, Gamepad2, Repeat, Droplets, Home, Package, Truck, Utensils } from "lucide-react";
import { Button } from "@/components/ui/button";
import { OptimizedImage } from "@/components/ui/optimized-image";
import { MeetDeliInteractive } from "./meet-deli-interactive";
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

        <div className="glass rounded-2xl p-6 border border-blue-500/50 bg-gradient-to-br from-blue-500/10 to-cyan-500/10">
          <div className="grid md:grid-cols-2 gap-6 items-center">
            <div>
              <h3 className="text-xl font-bold text-white mb-4">Your iPhone = Planet Points</h3>
              <div className="space-y-3">
                <div className="flex justify-between items-center p-3 bg-blue-500/20 rounded-lg">
                  <span className="text-gray-300">iPhone 12 Pro</span>
                  <span className="text-blue-400 font-bold">2,500 PTS</span>
                </div>
                <div className="flex justify-between items-center p-3 bg-blue-500/20 rounded-lg">
                  <span className="text-gray-300">iPhone 13 Pro</span>
                  <span className="text-blue-400 font-bold">3,200 PTS</span>
                </div>
                <div className="flex justify-between items-center p-3 bg-gradient-to-r from-blue-500/30 to-cyan-500/30 rounded-lg border border-cyan-400/50">
                  <span className="text-gray-200 font-medium">iPhone 14 Pro+</span>
                  <span className="text-cyan-400 font-black">4,000+ PTS</span>
                </div>
              </div>
            </div>
            <div className="text-center">
              <Button 
                size="lg" 
                className="bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-400 hover:to-cyan-400 text-white font-bold px-8 py-4 text-xl shadow-2xl transform hover:scale-105 transition-all rounded-full w-full"
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
                Start Trade-in
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// Step 2: Collect Planet Points Section  
function StepTwoCollectPoints() {
  return (
    <section className="py-8 px-4 mb-8">
      <div className="max-w-4xl mx-auto">
        <ProgressIndicator currentStep={2} />
        
        <div className="text-center mb-8">
          <div className="inline-flex items-center bg-green-500/20 backdrop-blur-sm rounded-full px-6 py-3 mb-6 border border-green-500/50">
            <span className="text-green-300 font-bold text-lg">STEP 2 - COLLECT</span>
          </div>
          <h2 className="text-3xl md:text-5xl font-black mb-4 text-white">
            Earn Planet Points
          </h2>
          <p className="text-lg text-gray-300 max-w-2xl mx-auto">
            Complete eco-missions and sustainability actions to multiply your points.
          </p>
        </div>

        <div className="glass rounded-2xl p-6 border border-green-500/50 bg-gradient-to-br from-green-500/10 to-emerald-500/10">
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-xl font-bold text-white mb-4">Earn More Points</h3>
              <div className="space-y-3">
                <div className="flex items-center p-3 bg-green-500/20 rounded-lg">
                  <Droplets className="w-5 h-5 text-blue-400 mr-3" />
                  <div className="flex-1">
                    <span className="text-gray-300">Water Conservation</span>
                    <div className="text-green-400 text-sm font-bold">+500 PTS/month</div>
                  </div>
                </div>
                <div className="flex items-center p-3 bg-green-500/20 rounded-lg">
                  <Users className="w-5 h-5 text-purple-400 mr-3" />
                  <div className="flex-1">
                    <span className="text-gray-300">Refer Friends</span>
                    <div className="text-green-400 text-sm font-bold">+1,000 PTS each</div>
                  </div>
                </div>
                <div className="flex items-center p-3 bg-gradient-to-r from-green-500/30 to-emerald-500/30 rounded-lg border border-emerald-400/50">
                  <Star className="w-5 h-5 text-amber-400 mr-3" />
                  <div className="flex-1">
                    <span className="text-gray-200 font-medium">Daily Check-in</span>
                    <div className="text-emerald-400 text-sm font-black">+100 PTS daily</div>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex items-center justify-center">
              <div className="text-center">
                <div className="text-6xl font-black text-green-400 mb-2">7,500+</div>
                <div className="text-gray-300">Average Monthly Points</div>
                <div className="mt-4 text-sm text-green-400">
                  <TrendingUp className="w-4 h-4 inline mr-1" />
                  Keep Growing Your Impact
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
    <section className="py-8 px-4 mb-8">
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

        <div className="glass rounded-2xl p-6 border border-amber-500/50 bg-gradient-to-br from-amber-500/10 to-orange-500/10 mb-8">
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-xl font-bold text-white mb-4">Premium Rewards</h3>
              <div className="space-y-3">
                <div className="flex justify-between items-center bg-amber-500/20 rounded-lg p-3">
                  <div className="flex items-center">
                    <Smartphone className="w-5 h-5 text-blue-400 mr-2" />
                    <span className="text-gray-300">iPhone 17 Pro Max</span>
                  </div>
                  <span className="text-amber-400 font-bold">45,000 PTS</span>
                </div>
                <div className="flex justify-between items-center bg-amber-500/20 rounded-lg p-3">
                  <div className="flex items-center">
                    <Droplets className="w-5 h-5 text-blue-400 mr-2" />
                    <span className="text-gray-300">AquaCafe System</span>
                  </div>
                  <span className="text-amber-400 font-bold">15,000 PTS</span>
                </div>
                <div className="flex justify-between items-center bg-gradient-to-r from-amber-500/30 to-orange-500/30 rounded-lg p-3 border border-orange-400/50">
                  <div className="flex items-center">
                    <Utensils className="w-5 h-5 text-orange-400 mr-2" />
                    <span className="text-gray-200 font-medium">Bakers Kitchen</span>
                  </div>
                  <span className="text-orange-400 font-black">3,500 PTS</span>
                </div>
              </div>
            </div>
            <div className="text-center flex items-center">
              <div className="w-full">
                <div className="text-4xl font-black text-amber-400 mb-2">START NOW</div>
                <div className="text-gray-300 mb-6">Get your Starter Kit</div>
                <Button 
                  size="lg" 
                  className="bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 text-black font-bold px-8 py-4 text-xl shadow-2xl transform hover:scale-105 transition-all rounded-full w-full"
                  onClick={() => window.open('/aquacafe?starter=true&ref=STEP3', '_blank')}
                >
                  <Gift className="mr-3 w-6 h-6" />
                  Shop AquaCafe Kit
                </Button>
              </div>
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


        {/* Merged Hero Section with Image Background and Overlaid Content */}
        <div className="text-center mb-12">
          <div className="relative max-w-6xl mx-auto">
            <div className="relative rounded-3xl overflow-hidden border-2 border-hero-green-500/50 shadow-2xl min-h-[500px] sm:min-h-[600px] md:min-h-[700px] lg:min-h-[800px]">
              {/* Background Image */}
              <img
                src={mobile_water_purification_hero}
                alt="iPhone Water Circular Exchange - Transform your iPhone into premium water systems"
                className="absolute inset-0 w-full h-full object-cover object-center"
                loading="eager"
                data-testid="hero-main-image"
                onError={(e) => {
                  console.error('Image failed to load:', e);
                  e.currentTarget.src = '/attached_assets/generated_images/iPhone_water_circular_exchange_e4541c3c.png';
                }}
              />
              
              {/* Dark overlay for better text visibility */}
              <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/50 to-black/70"></div>
              
              {/* Hero Content Overlaid on Image */}
              <div className="absolute inset-0 flex flex-col justify-center items-center text-center p-4 sm:p-6 md:p-8 lg:p-12">
                {/* Mission Header */}
                <div className="mb-8" data-testid="mission-header">
                  <div className="inline-flex items-center glass-light rounded-full px-4 sm:px-6 py-2 sm:py-3 mb-6 border border-hero-green-500/50 backdrop-blur-md">
                    <Star className="w-4 sm:w-5 h-4 sm:h-5 text-amber-500 mr-2" />
                    <span className="text-white font-medium text-sm sm:text-base">LAUNCHING AT GITEX 2025</span>
                  </div>
                </div>

                {/* Main Headlines with Neon Styling */}
                <div className="mb-8 sm:mb-12">
                  <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold mb-4 sm:mb-6 leading-tight">
                    <span className="text-white drop-shadow-2xl neon-text-white text-[72px]">From iPhones to Water,</span><br />
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-hero-green-400 via-dubai-blue-400 to-hero-green-400 neon-glow animate-pulse">
                      a Circular Exchange
                    </span>
                  </h1>
                  <h2 className="text-lg sm:text-xl md:text-2xl lg:text-3xl mb-4 sm:mb-6 font-bold neon-text-green">
                    <span className="text-hero-green-400 drop-shadow-lg">Dubai's First Trade-in Platform</span> • 
                    <span className="text-dubai-blue-400 drop-shadow-lg">Reuse ↔ Reflow</span> • 
                    <span className="text-amber-400 drop-shadow-lg">Unlock Clean Water for Your Home</span>
                  </h2>
                  
                </div>

                

                {/* Action Buttons - Bottom Overlay */}
                
                <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center w-full max-w-md sm:max-w-none">
                  <Button 
                    size="lg" 
                    className="bg-hero-green-500 hover:bg-hero-green-600 text-[#cedb00] font-bold px-6 sm:px-10 py-3 sm:py-4 text-base sm:text-xl shadow-2xl transform hover:scale-105 transition-all rounded-full neon-glow w-full sm:w-auto"
                    onClick={() => {
                      const step1Section = document.querySelector('[data-section="step-1"]');
                      if (step1Section) {
                        step1Section.scrollIntoView({ behavior: 'smooth', block: 'start' });
                      }
                    }}
                    data-testid="button-get-trade-value"
                  >
                    <Smartphone className="mr-2 sm:mr-3 w-4 sm:w-6 h-4 sm:h-6" />
                    Get My Trade Value
                  </Button>
                  <Link href="/leaderboard">
                    <Button 
                      size="lg"
                      variant="outline" 
                      className="border-2 border-white text-white hover:bg-white hover:text-black px-6 sm:px-10 py-3 sm:py-4 text-base sm:text-xl font-bold transition-all rounded-full backdrop-blur-sm bg-black/30 hover:bg-white w-full sm:w-auto"
                    >
                      <Trophy className="mr-2 sm:mr-3 w-4 sm:w-6 h-4 sm:h-6" />
                      Join Heroes
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 3-Step Progressive Flow */}
        <div data-section="step-1">
          <StepOneTradeIn />
          
          {/* Meet Deli - Interactive Trade Assistant positioned below Step 1 */}
          <div className="mb-8" data-section="meet-deli">
            <MeetDeliInteractive />
          </div>
        </div>

        <div data-section="step-2">
          <StepTwoCollectPoints />
        </div>

        <div data-section="step-3">
          <StepThreeRedeem />
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