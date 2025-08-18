import { useState, useEffect } from "react";
import { Star, Clock, Users, Zap, Trophy, Target, Timer, Calculator, Smartphone, Leaf, ShoppingCart, Crown, Gift, Shield, CheckCircle, Building, Handshake, Heart, Sparkles, ChevronRight, Award } from "lucide-react";
import { Button } from "@/components/ui/button";
import { DeviceSimulator } from "./device-simulator";
import { DeliAIInput } from "./deli-ai-input";
import { useImpactStats } from "@/hooks/use-impact-stats";
import { useLeaderboard } from "@/hooks/use-leaderboard";
import { Link } from "wouter";

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

function OpportunitiesSection() {
  return (
    <section className="py-12 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="glass rounded-3xl p-8 border border-emerald-500/30 bg-gradient-to-br from-emerald-600/10 via-teal-600/10 to-blue-600/10 ring-4 ring-yellow-400/50 shadow-lg shadow-yellow-400/20">
          <div className="text-center mb-8">
            <div className="flex items-center justify-center gap-3 mb-4">
              <Building className="w-8 h-8 text-emerald-400" />
              <h2 className="text-3xl font-bold text-white">BEYOND ETISALAT & DU</h2>
              <Handshake className="w-8 h-8 text-blue-400" />
            </div>
            <p className="text-gray-300 text-lg max-w-3xl mx-auto">
              World's first cross-category trade platform. While others stay in electronics, we connect your iPhone to life essentials.
            </p>
          </div>
          
          <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 mb-8">
            {/* iPhone Trade Advantage */}
            <div className="glass rounded-2xl p-6 border border-amber-500/30 bg-amber-600/5">
              <div className="text-center mb-4">
                <Building className="w-10 h-10 text-amber-400 mx-auto mb-3" />
                <h3 className="text-xl font-bold text-white mb-2">iPHONE TRADE LEADERS</h3>
                <p className="text-gray-300 text-sm">Cross-category advantage</p>
              </div>
              <div className="space-y-3 mb-6">
                <div className="flex justify-between items-center text-sm">
                  <span className="text-gray-400">vs Etisalat/Du</span>
                  <span className="text-amber-400 font-bold">+Water Systems</span>
                </div>
                <div className="flex justify-between items-center text-sm">
                  <span className="text-gray-400">Trade Categories</span>
                  <span className="text-amber-400 font-bold">Cross-Category</span>
                </div>
                <div className="flex justify-between items-center text-sm">
                  <span className="text-gray-400">Global First</span>
                  <span className="text-amber-400 font-bold">iPhone→Water</span>
                </div>
              </div>
              <Link
                href="/"
                className="w-full bg-amber-600 hover:bg-amber-500 text-white px-4 py-3 rounded-lg font-bold transition-all text-center inline-block"
                data-testid="button-trade-iphone"
              >
                Trade iPhone Now
              </Link>
            </div>

            {/* Gitex Launch Special */}
            <div className="glass rounded-2xl p-6 border border-hero-green-500/30 bg-hero-green-600/5">
              <div className="text-center mb-4">
                <Heart className="w-10 h-10 text-hero-green-400 mx-auto mb-3" />
                <h3 className="text-xl font-bold text-white mb-2">GITEX 2025 LAUNCH</h3>
                <p className="text-gray-300 text-sm">iPhone 17 cash preparation</p>
              </div>
              <div className="space-y-3 mb-6">
                <div className="flex justify-between items-center text-sm">
                  <span className="text-gray-400">Trade Now</span>
                  <span className="text-hero-green-400 font-bold">Get Cash</span>
                </div>
                <div className="flex justify-between items-center text-sm">
                  <span className="text-gray-400">iPhone 17 Launch</span>
                  <span className="text-hero-green-400 font-bold">First in Line</span>
                </div>
                <div className="flex justify-between items-center text-sm">
                  <span className="text-gray-400">Water Systems</span>
                  <span className="text-hero-green-400 font-bold">Included</span>
                </div>
              </div>
              <Link
                href="/"
                className="w-full bg-hero-green-600 hover:bg-hero-green-500 text-white px-4 py-3 rounded-lg font-bold transition-all text-center inline-block"
                data-testid="button-gitex-launch"
              >
                Join Launch Campaign
              </Link>
            </div>

            {/* Media Story */}
            <div className="glass rounded-2xl p-6 border border-purple-500/30 bg-purple-600/5">
              <div className="text-center mb-4">
                <Users className="w-10 h-10 text-purple-400 mx-auto mb-3" />
                <h3 className="text-xl font-bold text-white mb-2">MEDIA SPOTLIGHT</h3>
                <p className="text-gray-300 text-sm">Revolutionary trade story</p>
              </div>
              <div className="space-y-3 mb-6">
                <div className="flex justify-between items-center text-sm">
                  <span className="text-gray-400">Global First</span>
                  <span className="text-purple-400 font-bold">Cross-Category</span>
                </div>
                <div className="flex justify-between items-center text-sm">
                  <span className="text-gray-400">Market Disruption</span>
                  <span className="text-purple-400 font-bold">Beyond Telcos</span>
                </div>
                <div className="flex justify-between items-center text-sm">
                  <span className="text-gray-400">Rally Story</span>
                  <span className="text-purple-400 font-bold">iPhone→Water</span>
                </div>
              </div>
              <button
                onClick={() => {
                  const mediaKit = `https://deliwer.com/media-kit?story=iphone-water-trade`;
                  const shareText = `📰 BREAKING: World's first iPhone-to-Water trade platform launches at GITEX 2025! DeliWer disrupts Etisalat/Du with cross-category trading. Media kit: ${mediaKit}`;
                  
                  if (navigator.share) {
                    navigator.share({ title: 'DeliWer Media Story', text: shareText, url: mediaKit });
                  } else {
                    navigator.clipboard.writeText(shareText);
                  }
                }}
                className="w-full bg-purple-600 hover:bg-purple-500 text-white px-4 py-3 rounded-lg font-bold transition-all text-center"
                data-testid="button-media-kit"
              >
                Download Media Kit
              </button>
            </div>
          </div>
          
          <div className="text-center space-y-4">
            <p className="text-gray-400 text-sm">
              🤝 Cross-category trade advantage • 📈 iPhone 17 launch campaign • 🌍 Media ready sustainability story
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

export function HeroChallengeLanding() {
  const { data: stats } = useImpactStats();
  
  return (
    <section className="relative py-20 px-4 overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-10 left-10 w-32 h-32 bg-hero-green-500/10 rounded-full blur-xl animate-pulse-glow"></div>
        <div className="absolute top-20 right-20 w-24 h-24 bg-amber-500/10 rounded-full blur-xl animate-bounce-slow"></div>
        <div className="absolute bottom-20 left-1/4 w-20 h-20 bg-dubai-blue-500/10 rounded-full blur-xl animate-spin-slow"></div>
      </div>
      <div className="max-w-7xl mx-auto relative z-10">
        {/* Clean Hero Header */}
        <div className="text-center mb-16" data-testid="challenge-header">
          {/* Strong Two-Line Headline */}
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-8 leading-tight" data-testid="hero-challenge-title">
            <span className="block text-white">
              Complete missions. Earn liters.
            </span>
            <span className="block text-white">
              Save money.
            </span>
          </h1>

          {/* Clean CTA Button */}
          <div className="mb-8">
            <Link href="/">
              <Button 
                size="lg" 
                className="bg-hero-green-500 hover:bg-hero-green-600 text-black px-12 py-4 rounded-xl font-bold text-xl transform hover:scale-105 transition-all shadow-lg" 
                data-testid="button-start-quest"
              >
                Start Your Quest
              </Button>
            </Link>
          </div>

          {/* Short Subtext */}
          <p className="text-gray-300 text-lg max-w-lg mx-auto">
            Complete missions. Earn liters. Save money.
          </p>
        </div>

        {/* Progress Section */}
        <div className="text-center mb-16">
          <div className="flex flex-col items-center space-y-4 mb-8">
            <HeroSpotCounter />
            <CountdownTimer />
          </div>
          
          <p className="text-xl text-gray-200 max-w-4xl mx-auto mb-8">
            Join the exclusive Founding Heroes program. Get instant trade-in value, premium AquaCafe water system, 
            and become part of Dubai's biggest environmental mission. Limited spots available.
          </p>
        </div>

        {/* Unified Device Calculator */}
        <div className="mb-16">
          <DeviceSimulator />
        </div>

        {/* Meet Deli - Below the Fold */}
        <div className="mb-16">
          <DeliAIInput />
        </div>

        {/* Opportunities Section */}
        <OpportunitiesSection />

        {/* iPhone 17 Launch Section */}
        <IPhone17LaunchSection />

        {/* Founding Heroes Program & Leaderboard */}
        <FoundingHeroesSection stats={stats} />

        {/* Simplified Final CTA */}
        <div className="text-center">
          <Link href="/">
            <Button className="bg-hero-green-500 hover:bg-hero-green-600 text-black px-12 py-4 rounded-xl font-bold text-xl transform hover:scale-105 transition-all shadow-lg" data-testid="button-start-quest-final">
              Start Your Quest
            </Button>
          </Link>
          
          <p className="text-gray-400 text-sm mt-4">
            🔒 Secure • ⚡ Instant • 🌍 Environmental Impact Guaranteed
          </p>
        </div>
      </div>
    </section>
  );
}

function IPhone17LaunchSection() {
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
    <section className="py-16 px-4 relative overflow-hidden bg-gradient-to-br from-slate-900 via-purple-900/30 to-blue-900/30 mb-12">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 to-blue-500/10 rounded-3xl"></div>
      <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-96 h-96 bg-gradient-to-r from-hero-green-500/20 to-blue-500/20 rounded-full blur-3xl animate-pulse-glow"></div>
      
      <div className="max-w-6xl mx-auto relative z-10">
        {/* Header with Apple Event Integration */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center bg-gradient-to-r from-hero-green-500/30 to-blue-500/30 border border-hero-green-400/50 rounded-full px-6 py-2 mb-6 shadow-lg backdrop-blur-sm">
            <Sparkles className="w-4 h-4 text-hero-green-300 mr-2" />
            <span className="text-hero-green-200 font-bold text-sm tracking-wide">APPLE EVENT • SEPTEMBER 9, 2025</span>
            <Sparkles className="w-4 h-4 text-hero-green-300 ml-2" />
          </div>
          
          <h2 className="text-4xl md:text-6xl font-black mb-4 leading-tight">
            <span className="bg-gradient-to-r from-white via-hero-green-200 to-blue-200 bg-clip-text text-transparent">
              iPhone 17 Launch
            </span>
            <br />
            <span className="text-2xl md:text-3xl text-gray-200 font-bold">Free Points Collection Starts Now</span>
          </h2>
          
          <p className="text-lg text-gray-300 max-w-2xl mx-auto mb-8 leading-relaxed">
            Join <strong className="text-hero-green-400">12,847 Planet Heroes</strong> earning points for iPhone 17 preorder priority. 
            <strong className="text-white"> 100% free to start collecting points today!</strong>
          </p>

          {/* Simplified Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
            <Link href="/leaderboard" className="inline-block">
              <Button size="lg" className="bg-hero-green-500 hover:bg-hero-green-600 text-black font-bold px-8 py-3 text-lg shadow-xl transform hover:scale-105 transition-all">
                <Trophy className="w-5 h-5 mr-2" />
                Join Leaderboard FREE
              </Button>
            </Link>
            
            <Link href="/" className="inline-block">
              <Button 
                size="lg" 
                variant="outline" 
                className="border-2 border-hero-green-400 text-hero-green-200 hover:bg-hero-green-500/20 px-8 py-3 text-lg font-bold shadow-lg transform hover:scale-105 transition-all"
              >
                <Zap className="w-5 h-5 mr-2" />
                Start Earning Points
              </Button>
            </Link>
          </div>
        </div>

        {/* Free Actions Grid */}
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          
          {/* Apple Event Countdown */}
          <div className="glass rounded-2xl p-6 border border-purple-500/50 bg-gradient-to-br from-purple-500/10 to-blue-500/10 backdrop-blur-sm">
            <h3 className="text-lg font-bold text-white mb-4 flex items-center justify-center">
              <Clock className="w-5 h-5 text-purple-400 mr-2" />
              Apple Event Countdown
            </h3>
            
            <div className="grid grid-cols-2 gap-2 text-center mb-4">
              <div>
                <div className="bg-purple-500/30 border border-purple-400/50 rounded-lg p-3">
                  <div className="text-2xl font-black text-white">{timeLeft.days}</div>
                  <div className="text-xs text-gray-300">Days</div>
                </div>
              </div>
              <div>
                <div className="bg-purple-500/30 border border-purple-400/50 rounded-lg p-3">
                  <div className="text-2xl font-black text-white">{timeLeft.hours}</div>
                  <div className="text-xs text-gray-300">Hours</div>
                </div>
              </div>
            </div>
            <p className="text-xs text-gray-400 text-center">Sep 9, 6PM Dubai • Pre-orders Sep 12</p>
          </div>

          {/* Free Points Collection */}
          <div className="glass rounded-2xl p-6 border border-hero-green-500/50 bg-gradient-to-br from-hero-green-500/10 to-emerald-500/10 backdrop-blur-sm">
            <h3 className="text-lg font-bold text-white mb-4 flex items-center justify-center">
              <Gift className="w-5 h-5 text-hero-green-500 mr-2" />
              FREE Point Collection
            </h3>
            
            <div className="space-y-3">
              <div className="flex items-center justify-between text-sm">
                <div className="flex items-center">
                  <Users className="w-4 h-4 text-blue-500 mr-2" />
                  <span className="text-white">Join Leaderboard</span>
                </div>
                <span className="font-bold text-blue-500">+25 FREE</span>
              </div>
              
              <div className="flex items-center justify-between text-sm">
                <div className="flex items-center">
                  <Heart className="w-4 h-4 text-purple-500 mr-2" />
                  <span className="text-white">Share with Friend</span>
                </div>
                <span className="font-bold text-purple-500">+50 FREE</span>
              </div>
              
              <div className="flex items-center justify-between text-sm">
                <div className="flex items-center">
                  <Award className="w-4 h-4 text-amber-500 mr-2" />
                  <span className="text-white">Complete Profile</span>
                </div>
                <span className="font-bold text-amber-500">+75 FREE</span>
              </div>
            </div>
          </div>

          {/* Leaderboard Benefits */}
          <div className="glass rounded-2xl p-6 border border-amber-500/50 bg-gradient-to-br from-amber-500/10 to-yellow-500/10 backdrop-blur-sm">
            <h3 className="text-lg font-bold text-white mb-4 flex items-center justify-center">
              <Trophy className="w-5 h-5 text-amber-500 mr-2" />
              Top 100 Benefits
            </h3>
            
            <div className="space-y-3 text-sm">
              <div className="flex items-start space-x-2">
                <Star className="w-4 h-4 text-amber-500 mt-0.5 flex-shrink-0" />
                <span className="text-white">Priority iPhone 17 access</span>
              </div>
              
              <div className="flex items-start space-x-2">
                <Gift className="w-4 h-4 text-purple-400 mt-0.5 flex-shrink-0" />
                <span className="text-white">AED 2,500 trade bonus</span>
              </div>
              
              <div className="flex items-start space-x-2">
                <Crown className="w-4 h-4 text-blue-400 mt-0.5 flex-shrink-0" />
                <span className="text-white">VIP Planet Hero status</span>
              </div>
            </div>
          </div>
        </div>

        {/* How to Join Guide */}
        <div className="grid md:grid-cols-2 gap-6">
          {/* Simple Steps to Join */}
          <div className="glass rounded-2xl p-6 border border-slate-600/50 bg-slate-800/30">
            <h3 className="text-lg font-bold text-white mb-4 flex items-center">
              <Users className="w-5 h-5 text-hero-green-400 mr-2" />
              How to Join Leaderboard (FREE)
            </h3>
            
            <div className="space-y-3">
              <div className="flex items-start space-x-3">
                <div className="w-6 h-6 bg-hero-green-500 rounded-full flex items-center justify-center text-black font-bold text-sm">1</div>
                <div>
                  <p className="text-white text-sm font-medium">Click "Join Leaderboard FREE"</p>
                  <p className="text-gray-400 text-xs">Instant +25 points just for joining</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-3">
                <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center text-white font-bold text-sm">2</div>
                <div>
                  <p className="text-white text-sm font-medium">Complete your profile</p>
                  <p className="text-gray-400 text-xs">Get +75 points for basic info</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-3">
                <div className="w-6 h-6 bg-purple-500 rounded-full flex items-center justify-center text-white font-bold text-sm">3</div>
                <div>
                  <p className="text-white text-sm font-medium">Share with friends</p>
                  <p className="text-gray-400 text-xs">Earn +50 points per referral</p>
                </div>
              </div>
            </div>
          </div>

          {/* Current Status & CTA */}
          <div className="glass rounded-2xl p-6 border border-hero-green-500/50 bg-gradient-to-r from-hero-green-500/10 to-blue-500/10 text-center">
            <h3 className="text-xl font-bold text-white mb-2">Ready for iPhone 17?</h3>
            <div className="mb-4">
              <div className="text-sm text-gray-300 mb-2">Your potential starting position:</div>
              <div className="text-3xl font-bold text-hero-green-400">#150</div>
              <div className="text-xs text-gray-400">out of 12,847 heroes</div>
            </div>
            
            <p className="text-sm text-gray-300 mb-4">Join now • Collect free points • Climb to Top 100</p>
            
            <Link href="/leaderboard" className="block">
              <Button className="w-full bg-hero-green-500 hover:bg-hero-green-600 text-black font-bold py-3 shadow-lg transform hover:scale-105 transition-all">
                Join Leaderboard FREE
                <ChevronRight className="w-4 h-4 ml-2" />
              </Button>
            </Link>
            
            <p className="text-xs text-gray-500 mt-2">
              No credit card • Instant access • Free forever
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

function FoundingHeroesSection({ stats }: { stats: any }) {
  const { data: topHeroes } = useLeaderboard(3);

  return (
    <div className="glass rounded-3xl p-8 border border-emerald-500/30 bg-gradient-to-br from-emerald-600/10 via-teal-600/10 to-blue-600/10 mb-12" data-testid="founding-heroes-section">
      <div className="text-center mb-8">
        <div className="w-20 h-20 bg-gradient-to-r from-emerald-600 to-teal-600 rounded-full flex items-center justify-center mx-auto mb-4">
          <Crown className="w-10 h-10 text-white" />
        </div>
        <h2 className="text-3xl font-bold text-white mb-3">DUBAI ENVIRONMENTAL CHAMPIONS</h2>
        <p className="text-gray-300 text-lg max-w-3xl mx-auto">
          Join {stats?.activeHeroes?.toLocaleString() || '12,847'} sustainability leaders making real environmental impact across Dubai
        </p>
      </div>

      {/* Top Environmental Champions */}
      <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 mb-8">
        <div className="flex items-center p-4 bg-slate-700/30 rounded-lg border border-emerald-600/30">
          <div className="flex items-center mr-4">
            <div className="w-10 h-10 bg-emerald-600 rounded-full flex items-center justify-center text-white font-bold">
              1
            </div>
          </div>
          <div className="flex-1 min-w-0">
            <div className="text-white font-bold text-sm mb-1">Sarah Al-Mansouri</div>
            <div className="text-gray-400 text-xs truncate">Environmental Engineer • DEWA</div>
            <div className="text-emerald-500 font-bold text-sm">15,240 pts</div>
          </div>
        </div>

        <div className="flex items-center p-4 bg-slate-700/30 rounded-lg border border-teal-600/30">
          <div className="flex items-center mr-4">
            <div className="w-10 h-10 bg-teal-600 rounded-full flex items-center justify-center text-white font-bold">
              2
            </div>
          </div>
          <div className="flex-1 min-w-0">
            <div className="text-white font-bold text-sm mb-1">Ahmed Hassan</div>
            <div className="text-gray-400 text-xs truncate">Sustainability Director • Emirates</div>
            <div className="text-teal-500 font-bold text-sm">12,890 pts</div>
          </div>
        </div>

        <div className="flex items-center p-4 bg-slate-700/30 rounded-lg border border-slate-600/30">
          <div className="flex items-center mr-4">
            <div className="w-10 h-10 bg-slate-600 rounded-full flex items-center justify-center text-white font-bold">
              3
            </div>
          </div>
          <div className="flex-1 min-w-0">
            <div className="text-white font-bold text-sm mb-1">Fatima Al-Zahra</div>
            <div className="text-gray-400 text-xs truncate">Green Building Consultant</div>
            <div className="text-slate-400 font-bold text-sm">11,475 pts</div>
          </div>
        </div>
      </div>

      {/* Planet Heroes Membership Card */}
      <div className="mb-8 text-center">
        <div className="bg-gradient-to-r from-pink-600/20 to-purple-600/20 border border-pink-500/30 rounded-2xl p-6 mb-6">
          <h3 className="text-xl font-bold text-white mb-4">🏆 Exclusive Planet Heroes Membership</h3>
          <div className="flex flex-col lg:flex-row items-center gap-4 lg:gap-6">
            <div className="flex-1 w-full">
              <img 
                src="/attached_assets/Aquacafe_byDeliWer_Card_Corners_1755485915603.png" 
                alt="AquaCafe Planet Heroes Membership Card" 
                className="w-full max-w-sm sm:max-w-md mx-auto rounded-xl shadow-2xl"
              />
            </div>
            <div className="flex-1 text-left w-full">
              <div className="space-y-2 sm:space-y-3">
                <div className="flex items-center text-emerald-400">
                  <Gift className="w-5 h-5 mr-2" />
                  <span className="font-semibold">FREE AquaCafe Hair Shower Filter (AED 399 value)</span>
                </div>
                <div className="flex items-center text-pink-400">
                  <Star className="w-5 h-5 mr-2" />
                  <span className="font-semibold">Exclusive #SAYNOTO PLASTIC Campaign Member</span>
                </div>
                <div className="flex items-center text-blue-400">
                  <Shield className="w-5 h-5 mr-2" />
                  <span className="font-semibold">FREE Premium Demo & Installation</span>
                </div>
                <div className="flex items-center text-yellow-400">
                  <Zap className="w-5 h-5 mr-2" />
                  <span className="font-semibold">Young & Healthy with Water Program Access</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* FREE Gift Showcase */}
      <div className="mb-8">
        <div className="bg-gradient-to-br from-blue-600/20 via-cyan-600/20 to-teal-600/20 border border-cyan-500/30 rounded-2xl p-6">
          <div className="text-center mb-4">
            <div className="inline-flex items-center bg-red-500/20 border border-red-500/50 rounded-full px-4 py-2 mb-3">
              <Gift className="w-5 h-5 text-red-400 mr-2" />
              <span className="text-red-400 font-bold">FREE GIFT WITH MEMBERSHIP</span>
            </div>
            <h3 className="text-xl font-bold text-white">AquaCafe Hair Shower Filter</h3>
            <p className="text-cyan-300">Transform your daily routine with premium filtered water</p>
          </div>
          <div className="flex flex-col lg:flex-row items-center gap-4 lg:gap-6">
            <div className="flex-1 w-full">
              <img 
                src="/attached_assets/washing-face-01 (1)_1755485447693.jpg" 
                alt="AquaCafe Hair Shower Filter - Free Gift" 
                className="w-full max-w-sm sm:max-w-md mx-auto rounded-xl shadow-2xl"
              />
            </div>
            <div className="flex-1 text-left w-full space-y-3 sm:space-y-4">
              <div className="text-white">
                <h4 className="font-bold text-lg mb-2">✨ Premium Benefits:</h4>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-center">
                    <CheckCircle className="w-4 h-4 text-green-400 mr-2 flex-shrink-0" />
                    Removes chlorine & harmful chemicals
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="w-4 h-4 text-green-400 mr-2 flex-shrink-0" />
                    Softer, healthier hair & skin
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="w-4 h-4 text-green-400 mr-2 flex-shrink-0" />
                    Easy installation with beautiful design
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="w-4 h-4 text-green-400 mr-2 flex-shrink-0" />
                    Worth AED 399 - yours FREE as Planet Hero
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Founding Hero Benefits */}
      <div className="grid sm:grid-cols-1 md:grid-cols-3 gap-3 sm:gap-4 mb-6">
        <div className="flex items-center p-4 bg-amber-500/10 rounded-lg border border-amber-500/30">
          <Zap className="w-6 h-6 text-amber-500 mr-3 flex-shrink-0" />
          <div>
            <h3 className="text-white font-bold text-sm mb-1">Lifetime Double Points</h3>
            <p className="text-gray-400 text-xs">All future trades earn 2x points forever</p>
          </div>
        </div>
        <div className="flex items-center p-4 bg-hero-green-500/10 rounded-lg border border-hero-green-500/30">
          <Star className="w-6 h-6 text-hero-green-500 mr-3 flex-shrink-0" />
          <div>
            <h3 className="text-white font-bold text-sm mb-1">Priority Access</h3>
            <p className="text-gray-400 text-xs">First access to limited edition rewards</p>
          </div>
        </div>
        <div className="flex items-center p-4 bg-dubai-blue-500/10 rounded-lg border border-dubai-blue-500/30">
          <Trophy className="w-6 h-6 text-dubai-blue-500 mr-3 flex-shrink-0" />
          <div>
            <h3 className="text-white font-bold text-sm mb-1">Exclusive Founding Badge</h3>
            <p className="text-gray-400 text-xs">Permanent status on all profiles</p>
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
  );
}