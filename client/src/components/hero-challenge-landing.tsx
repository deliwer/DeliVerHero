import { useState, useEffect } from "react";
import { Star, Clock, Users, Zap, Trophy, Target, Timer, Calculator, Smartphone, Leaf, ShoppingCart, Crown } from "lucide-react";
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
        {/* Mission Header */}
        <div className="text-center mb-12" data-testid="challenge-header">
          <div className="inline-flex items-center glass-light rounded-full px-6 py-3 mb-6 border border-hero-green-500/30">
            <Star className="w-5 h-5 text-amber-500 mr-2 animate-pulse" />
            <span className="text-white font-medium">WELCOME TO MISSION: SAVE DUBAI 2030</span>
          </div>
          
          <h1 className="text-4xl md:text-7xl font-bold text-white mb-6 leading-tight" data-testid="hero-challenge-title">
            <span className="text-hero-green-500 text-glow">Dubai's First Sustainability Game</span>
            <br />
            <span className="text-gray-300 text-[36px]">complete missions, save money</span>
            <br />
            <span className="bg-gradient-to-r from-amber-500 to-orange-500 bg-clip-text text-transparent text-[48px]">Become a Planet Hero</span>
          </h1>
          
          <div className="flex flex-col items-center space-y-4 mb-8">
            <HeroSpotCounter />
            <CountdownTimer />
          </div>
          
          <p className="text-xl text-gray-200 max-w-4xl mx-auto mb-8">
            Join the exclusive Founding Heroes program. Get instant trade-in value, premium AquaCafe water system, 
            and become part of Dubai's biggest environmental mission. Limited spots available.
          </p>
        </div>

        {/* Deli AI Input Section */}
        <div className="mb-16">
          <DeliAIInput />
        </div>

        {/* Live Stats Banner */}
        {stats && (
          <div className="glass rounded-2xl p-6 mb-12 border border-slate-600" data-testid="live-stats-banner">
            <div className="grid md:grid-cols-4 gap-6 text-center">
              <div className="border-r border-slate-600 last:border-r-0">
                <div className="text-2xl font-bold text-hero-green-500 mb-1">
                  {(stats.totalBottlesPrevented / 1000).toFixed(0)}K+
                </div>
                <div className="text-sm text-gray-400">Bottles Prevented</div>
              </div>
              <div className="border-r border-slate-600 last:border-r-0">
                <div className="text-2xl font-bold text-blue-400 mb-1">
                  {(stats.totalCo2Saved / 1000000).toFixed(1)}T
                </div>
                <div className="text-sm text-gray-400">CO₂ Saved</div>
              </div>
              <div className="border-r border-slate-600 last:border-r-0">
                <div className="text-2xl font-bold text-amber-500 mb-1">
                  AED {(stats.totalRewards / 100 / 1000).toFixed(0)}K+
                </div>
                <div className="text-sm text-gray-400">Hero Rewards</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-purple-400 mb-1">
                  {(stats.activeHeroes / 1000).toFixed(1)}K
                </div>
                <div className="text-sm text-gray-400">Active Heroes</div>
              </div>
            </div>
          </div>
        )}

        {/* Hero Challenge CTA Section */}
        <div className="grid lg:grid-cols-2 gap-12 mb-16">
          {/* Device Simulator */}
          <div>
            <DeviceSimulator />
          </div>
          
          {/* Calculator Output Display */}
          <div>
            <div className="mb-6">
              <h2 className="text-2xl font-bold text-white mb-4 flex items-center">
                <Calculator className="w-6 h-6 text-hero-green-500 mr-2" />
                YOUR TRADE CALCULATION
              </h2>
              <p className="text-gray-300">Real-time valuation based on your device selection</p>
            </div>
            
            <div className="bg-gradient-to-br from-slate-800/90 to-slate-900/95 backdrop-blur-sm rounded-2xl p-6 border border-hero-green-500/30 shadow-xl">
              <div className="space-y-4">
                {/* Device Info Display */}
                <div className="flex items-center justify-between p-4 bg-slate-700/50 rounded-xl">
                  <div className="flex items-center">
                    <div className="w-12 h-12 bg-gradient-to-br from-gray-600 to-gray-800 rounded-lg flex items-center justify-center mr-4">
                      <Smartphone className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <div className="text-white font-bold">iPhone 13 Pro</div>
                      <div className="text-gray-400 text-sm">Excellent Condition</div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold text-hero-green-500">AED 1,200</div>
                    <div className="text-gray-400 text-sm">Trade Value</div>
                  </div>
                </div>

                {/* Impact Breakdown */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center p-4 bg-amber-500/10 rounded-xl border border-amber-500/30">
                    <div className="text-xl font-bold text-amber-500">+2,400</div>
                    <div className="text-gray-300 text-sm">Planet Points</div>
                  </div>
                  <div className="text-center p-4 bg-hero-green-500/10 rounded-xl border border-hero-green-500/30">
                    <div className="text-xl font-bold text-hero-green-500">18 Months</div>
                    <div className="text-gray-300 text-sm">Water Protection</div>
                  </div>
                </div>

                {/* Environmental Impact */}
                <div className="p-4 bg-gradient-to-r from-emerald-500/10 to-blue-500/10 rounded-xl border border-emerald-500/30">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <Leaf className="w-5 h-5 text-emerald-500 mr-2" />
                      <span className="text-white font-medium">Environmental Impact</span>
                    </div>
                    <div className="text-emerald-500 font-bold">-2.4 kg CO₂</div>
                  </div>
                  <div className="mt-2 text-gray-300 text-sm">
                    Equal to removing 520 plastic bottles from waste
                  </div>
                </div>

                {/* User Journey Options */}
                <div className="pt-2 space-y-3">
                  <Link href="/aquacafe" className="block w-full">
                    <Button className="w-full bg-gradient-to-r from-hero-green-500 to-emerald-600 hover:from-hero-green-600 hover:to-emerald-700 text-white py-3 font-bold rounded-xl">
                      <ShoppingCart className="mr-2 w-5 h-5" />
                      TRADE & SHOP AQUACAFE PRODUCTS
                    </Button>
                  </Link>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <Link href="/aquacafe" className="block">
                      <Button variant="outline" className="w-full border-amber-500 text-amber-500 hover:bg-amber-500 hover:text-black py-2.5 rounded-lg font-medium">
                        <Star className="mr-2 w-4 h-4" />
                        Buy Starter Kit Only
                      </Button>
                    </Link>
                    
                    <Link href="/leaderboard" className="block">
                      <Button variant="outline" className="w-full border-blue-500 text-blue-500 hover:bg-blue-500 hover:text-white py-2.5 rounded-lg font-medium">
                        <Trophy className="mr-2 w-4 h-4" />
                        Join Heroes & Collect Points
                      </Button>
                    </Link>
                  </div>
                  
                  <div className="text-center pt-2">
                    <p className="text-xs text-gray-400 mb-1">Choose Your Hero Journey:</p>
                    <p className="text-xs text-emerald-400">✓ Trade iPhone + Buy Products • ✓ Buy Starter Kit & Share • ✓ Join Heroes & Earn Points</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
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
    <div className="glass rounded-3xl p-8 border border-amber-500/30 bg-gradient-to-br from-amber-500/5 to-orange-500/5 mb-12" data-testid="founding-heroes-section">
      <div className="grid lg:grid-cols-2 gap-8">
        {/* Left: Founding Hero Perks */}
        <div>
          <div className="text-center mb-6">
            <div className="w-16 h-16 bg-gradient-to-r from-amber-500 to-orange-500 rounded-full flex items-center justify-center mx-auto mb-3">
              <Trophy className="w-8 h-8 text-black" />
            </div>
            <h2 className="text-2xl font-bold text-white mb-2">FOUNDING HERO PROGRAM</h2>
            <p className="text-gray-300 text-sm">Limited to first 100 heroes only</p>
          </div>
          
          <div className="space-y-4">
            <div className="flex items-center p-4 bg-slate-700/30 rounded-lg border border-amber-500/20">
              <Zap className="w-6 h-6 text-amber-500 mr-3" />
              <div>
                <h3 className="text-white font-bold text-sm">Lifetime Double Points</h3>
                <p className="text-gray-400 text-xs">All future trades earn 2x points forever</p>
              </div>
            </div>
            <div className="flex items-center p-4 bg-slate-700/30 rounded-lg border border-hero-green-500/20">
              <Star className="w-6 h-6 text-hero-green-500 mr-3" />
              <div>
                <h3 className="text-white font-bold text-sm">Priority Access</h3>
                <p className="text-gray-400 text-xs">First access to limited edition rewards</p>
              </div>
            </div>
            <div className="flex items-center p-4 bg-slate-700/30 rounded-lg border border-dubai-blue-500/20">
              <Target className="w-6 h-6 text-dubai-blue-500 mr-3" />
              <div>
                <h3 className="text-white font-bold text-sm">Exclusive Founding Badge</h3>
                <p className="text-gray-400 text-xs">Permanent status on all profiles</p>
              </div>
            </div>
          </div>
          
          <div className="text-center mt-6">
            <div className="inline-flex items-center bg-red-500/20 border border-red-500/50 rounded-full px-4 py-2">
              <Clock className="w-4 h-4 text-red-400 mr-2" />
              <span className="text-red-400 font-bold text-sm">Expires in 6 days</span>
            </div>
          </div>
        </div>

        {/* Right: Top Heroes Leaderboard */}
        <div>
          <div className="text-center mb-6">
            <div className="w-16 h-16 bg-gradient-to-r from-hero-green-500 to-dubai-blue-500 rounded-full flex items-center justify-center mx-auto mb-3">
              <Crown className="w-8 h-8 text-white" />
            </div>
            <h2 className="text-2xl font-bold text-white mb-2">TOP PLANET HEROES</h2>
            <p className="text-gray-300 text-sm">Join {stats?.activeHeroes?.toLocaleString() || '12,847'} active heroes</p>
          </div>
          
          <div className="space-y-3">
            {topHeroes?.map((hero, index) => (
              <div key={hero.id} className="flex items-center p-4 bg-slate-700/30 rounded-lg border border-slate-600/50">
                <div className="flex items-center mr-4">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center text-white font-bold text-sm ${
                    index === 0 ? 'bg-amber-500' : index === 1 ? 'bg-gray-400' : 'bg-orange-600'
                  }`}>
                    {index + 1}
                  </div>
                </div>
                <div className="flex-1">
                  <div className="flex justify-between items-center">
                    <span className="text-white font-bold text-sm">{hero.name}</span>
                    <span className="text-hero-green-500 font-bold text-sm">{hero.points.toLocaleString()} pts</span>
                  </div>
                  <div className="flex justify-between items-center mt-1">
                    <span className="text-gray-400 text-xs">{hero.level}</span>
                    <span className="text-gray-400 text-xs">{hero.bottlesPrevented.toLocaleString()} bottles saved</span>
                  </div>
                </div>
              </div>
            )) || (
              // Fallback display while loading
              Array.from({ length: 3 }, (_, index) => (
                <div key={index} className="flex items-center p-4 bg-slate-700/30 rounded-lg border border-slate-600/50">
                  <div className="flex items-center mr-4">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center text-white font-bold text-sm ${
                      index === 0 ? 'bg-amber-500' : index === 1 ? 'bg-gray-400' : 'bg-orange-600'
                    }`}>
                      {index + 1}
                    </div>
                  </div>
                  <div className="flex-1">
                    <div className="h-4 bg-slate-600 rounded animate-pulse mb-2"></div>
                    <div className="h-3 bg-slate-600 rounded animate-pulse w-3/4"></div>
                  </div>
                </div>
              ))
            )}
          </div>
          
          <div className="text-center mt-6">
            <span className="text-hero-green-500 font-bold text-sm">Start your hero journey today!</span>
          </div>
        </div>
      </div>
    </div>
  );
}