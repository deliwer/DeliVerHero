import { Star, Bot, MapPin, Timer } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { useState } from "react";

export function HeroSection() {
  const [selectedPath, setSelectedPath] = useState<string | null>(null);

  return (
    <section className="relative py-20 px-4 overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 bg-gradient-to-br from-dubai-blue-900/50 to-transparent"></div>
      <div className="absolute top-10 left-10 w-32 h-32 bg-hero-green-500/20 rounded-full blur-xl animate-pulse-glow"></div>
      <div className="absolute bottom-20 right-20 w-24 h-24 bg-amber-500/20 rounded-full blur-xl animate-bounce-slow"></div>
      
      <div className="max-w-6xl mx-auto relative z-10">
        {/* Mission Header */}
        <div className="text-center mb-12" data-testid="mission-header">
          <div className="inline-flex items-center glass-light rounded-full px-6 py-3 mb-6 border border-hero-green-500/30">
            <Star className="w-5 h-5 text-amber-500 mr-2" />
            <span className="text-white font-medium">WELCOME TO MISSION: SAVE DUBAI 2030</span>
          </div>
          
          {/* AI-First Welcome Widget */}
          <div className="glass-light rounded-2xl p-8 mb-8 border border-dubai-blue-500/30 max-w-4xl mx-auto">
            <div className="flex items-center justify-center mb-6">
              <div className="w-16 h-16 bg-gradient-to-r from-dubai-blue-500 to-hero-green-500 rounded-full flex items-center justify-center mr-4">
                <Bot className="w-8 h-8 text-white" />
              </div>
              <div className="text-left">
                <p className="text-2xl font-bold text-white flex items-center">
                  <MapPin className="w-5 h-5 text-hero-green-500 mr-2" />
                  Welcome from Dubai
                </p>
                <p className="text-lg text-gray-300">Ready to turn your old iPhone into premium water delivery?</p>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              {/* Quick Trade-In Path */}
              <div 
                className={`glass rounded-xl p-6 border-2 cursor-pointer transition-all duration-300 ${
                  selectedPath === 'trade' 
                    ? 'border-amber-500 bg-amber-500/10' 
                    : 'border-slate-600 hover:border-amber-500/50'
                }`}
                onClick={() => setSelectedPath('trade')}
              >
                <h3 className="text-xl font-bold text-white mb-3 flex items-center">
                  <Timer className="w-5 h-5 text-amber-500 mr-2" />
                  Quick Trade-In Now
                </h3>
                <p className="text-gray-300 mb-4">Get instant AED 1,200+ valuation in 2 minutes</p>
                <div className="text-amber-500 font-semibold">⚡ Fastest path to rewards</div>
              </div>

              {/* Gamified Path */}
              <div 
                className={`glass rounded-xl p-6 border-2 cursor-pointer transition-all duration-300 ${
                  selectedPath === 'rewards' 
                    ? 'border-hero-green-500 bg-hero-green-500/10' 
                    : 'border-slate-600 hover:border-hero-green-500/50'
                }`}
                onClick={() => setSelectedPath('rewards')}
              >
                <h3 className="text-xl font-bold text-white mb-3 flex items-center">
                  <Star className="w-5 h-5 text-hero-green-500 mr-2" />
                  Learn & Earn Rewards
                </h3>
                <p className="text-gray-300 mb-4">Join leaderboard, unlock badges, double points</p>
                <div className="text-hero-green-500 font-semibold">🏆 Maximum rewards & status</div>
              </div>
            </div>

            {/* Dynamic CTA based on selection */}
            <div className="mt-8">
              {selectedPath === 'trade' && (
                <Link href="#trade">
                  <Button className="w-full bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white px-8 py-4 rounded-xl font-bold text-lg">
                    🚀 START INSTANT TRADE-IN
                  </Button>
                </Link>
              )}
              {selectedPath === 'rewards' && (
                <Link href="/leaderboard">
                  <Button className="w-full bg-gradient-to-r from-hero-green-500 to-dubai-blue-500 hover:from-hero-green-600 hover:to-dubai-blue-600 text-white px-8 py-4 rounded-xl font-bold text-lg">
                    🏆 JOIN PLANET HEROES
                  </Button>
                </Link>
              )}
              {!selectedPath && (
                <div className="text-center text-gray-400">
                  Choose your path above to continue →
                </div>
              )}
            </div>
          </div>

          {/* Urgency Timer */}
          <div className="flex items-center justify-center space-x-4 text-sm text-gray-300 mb-8">
            <div className="flex items-center">
              <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse mr-2"></div>
              Only 47 Founding Hero spots left today
            </div>
            <div>•</div>
            <div>23:47:31 until double points end</div>
          </div>
        </div>
      </div>
    </section>
  );
}
