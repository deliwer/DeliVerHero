import { useState, useEffect } from "react";
import { Star, Clock, Users, Zap, Trophy, Target, Timer, Calculator, Smartphone, Leaf, ShoppingCart, Crown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { DeviceSimulator } from "./device-simulator";
import { DeliAIInput } from "./deli-ai-input";
import { useImpactStats } from "@/hooks/use-impact-stats";
import { useLeaderboard } from "@/hooks/use-leaderboard";
import { Link } from "wouter";
import heroImage from "@assets/mobile-water-purification-hero_1755470561445.jpg";

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

export function HeroChallengeLanding() {
  const { data: stats } = useImpactStats();
  
  return (
    <section className="relative py-20 px-4 overflow-hidden">
      {/* Hero Background Image */}
      <div className="absolute inset-0">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-20"
          style={{
            backgroundImage: `url(${heroImage})`,
            backgroundPosition: 'right center',
            filter: 'brightness(0.7) contrast(1.2)'
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-dubai-blue-900/90 via-dubai-blue-900/50 to-transparent"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-black/30"></div>
      </div>
      
      {/* Animated Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-10 left-10 w-32 h-32 bg-hero-green-500/10 rounded-full blur-xl animate-pulse-glow"></div>
        <div className="absolute top-20 right-20 w-24 h-24 bg-amber-500/10 rounded-full blur-xl animate-bounce-slow"></div>
        <div className="absolute bottom-20 left-1/4 w-20 h-20 bg-dubai-blue-500/10 rounded-full blur-xl animate-spin-slow"></div>
      </div>
      <div className="max-w-7xl mx-auto relative z-10">
        {/* Mission Header */}
        <div className="text-center mb-12" data-testid="challenge-header">
          <div className="inline-flex items-center glass-light rounded-full px-6 py-3 mb-6 border border-hero-green-500/30">
            <Star className="w-5 h-5 text-amber-500 mr-2 animate-pulse" />
            <span className="text-white font-medium">WELCOME TO MISSION: SAVE DUBAI 2030</span>
          </div>
          
          <h1 className="text-4xl md:text-7xl font-bold text-white mb-6 leading-tight" data-testid="hero-challenge-title">
            <span className="bg-gradient-to-r from-amber-500 to-orange-500 bg-clip-text text-transparent text-[36px]">
              <span className="line-through opacity-60 text-[#ffffff]">Dubai's</span> World's First Sustainability Game
            </span>
            <br />
            <span className="text-hero-green-500 text-glow">Become a Planet Hero</span>
            <br />
            <span className="text-gray-300 text-[36px]">complete missions, save money</span>
          </h1>
        </div>

        {/* Deli AI Input Section */}
        <div className="mb-16">
          <DeliAIInput />
        </div>

        <div className="text-center mb-12">
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

        {/* Founding Heroes Program & Leaderboard */}
        <FoundingHeroesSection stats={stats} />

        {/* Final CTA Buttons */}
        <div className="text-center">
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-6">
            <Link href="/">
              <Button className="bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-black px-12 py-4 rounded-xl font-bold text-xl transform hover:scale-105 transition-all" data-testid="button-check-value">
                <Zap className="mr-2 w-6 h-6" />
                CHECK YOUR TRADE-IN VALUE NOW
              </Button>
            </Link>
            <Link href="/leaderboard">
              <Button 
                variant="outline" 
                className="border-2 border-hero-green-500 text-hero-green-500 hover:bg-hero-green-500 hover:text-white px-12 py-4 rounded-xl font-bold text-xl transition-all"
                data-testid="button-join-heroes"
              >
                <Users className="mr-2 w-6 h-6" />
                JOIN {stats?.activeHeroes.toLocaleString() || '12,847'} HEROES
              </Button>
            </Link>
          </div>
          
          <p className="text-gray-400 text-sm">
            🔒 Secure • ⚡ Instant • 🌍 Environmental Impact Guaranteed
          </p>
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
      <div className="grid md:grid-cols-3 gap-4 mb-8">
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

      {/* Founding Hero Benefits */}
      <div className="grid md:grid-cols-3 gap-4 mb-6">
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