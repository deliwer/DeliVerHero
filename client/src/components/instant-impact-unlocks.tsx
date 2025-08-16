import { useState, useEffect } from "react";
import { Gift, Star, Zap, Award, Target, Trophy, Sparkles, Crown, Shield, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import type { TradeCalculation } from "@/types/hero";

interface InstantImpactUnlocksProps {
  calculation?: TradeCalculation;
  onOrderNow?: () => void;
}

function SlotMachine({ calculation }: { calculation?: TradeCalculation }) {
  const [spinning, setSpinning] = useState(false);
  
  const slots = [
    { icon: "🎯", value: calculation?.points || 2400, label: "Points" },
    { icon: "🏆", value: "Water Warrior", label: "Badge" },
    { icon: "🎁", value: "FREE Filter", label: "Gift" }
  ];
  
  return (
    <div className="flex justify-center gap-4 mb-8">
      {slots.map((slot, index) => (
        <div key={index} className="glass rounded-xl p-4 border border-amber-500/30 bg-gradient-to-br from-amber-500/10 to-orange-500/10 text-center min-w-[120px]">
          <div className="text-3xl mb-2 animate-bounce">{slot.icon}</div>
          <div className="text-white font-bold text-sm">{slot.value}</div>
          <div className="text-gray-400 text-xs">{slot.label}</div>
        </div>
      ))}
    </div>
  );
}

export function InstantImpactUnlocks({ calculation, onOrderNow }: InstantImpactUnlocksProps) {
  const champions = [
    { name: "Khalid Al-M", impact: "8.2K bottles", icon: <Crown className="w-4 h-4 text-amber-500" /> },
    { name: "Amira B.", impact: "6.1K bottles", icon: <Shield className="w-4 h-4 text-blue-500" /> },
    { name: "Omar Z.", impact: "4.8K bottles", icon: <Heart className="w-4 h-4 text-hero-green-500" /> }
  ];

  if (!calculation) {
    return (
      <section className="py-12 px-4 bg-slate-900/95">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-white mb-2">
            🎰 Impact Slot Machine
          </h2>
          <p className="text-gray-400 mb-6">Trade iPhone → Instant Planet Rewards</p>
          
          <SlotMachine />
          
          <Button 
            onClick={onOrderNow}
            className="bg-hero-green-500 hover:bg-hero-green-600 text-black font-bold px-8 py-3 rounded-xl transform hover:scale-105 transition-all"
          >
            <Zap className="mr-2 w-5 h-5" />
            Start Rescue Mission
          </Button>
        </div>
      </section>
    );
  }

  return (
    <section className="py-12 px-4 bg-slate-900/95" data-testid="instant-unlocks">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-white mb-2">
            🎰 Mission Complete!
          </h2>
          <p className="text-gray-400">Your planet rescue impact is live</p>
        </div>

        <SlotMachine calculation={calculation} />

        {/* Compact Impact & Champions Grid */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          
          {/* Rescue Progress */}
          <Card className="glass border-slate-600">
            <CardContent className="p-6 text-center">
              <Target className="w-8 h-8 text-hero-green-500 mx-auto mb-3" />
              <h3 className="text-lg font-bold text-white mb-3">Rescue Progress</h3>
              
              <div className="space-y-3">
                <div>
                  <div className="text-2xl font-bold text-blue-400">
                    {calculation?.bottlesPrevented.toLocaleString() || '2,400'}
                  </div>
                  <div className="text-xs text-gray-400">Bottles Rescued</div>
                </div>
                
                <div>
                  <div className="text-xl font-bold text-hero-green-500">
                    {calculation ? (calculation.co2Saved / 1000).toFixed(1) : '1.2'}T
                  </div>
                  <div className="text-xs text-gray-400">CO₂ Blocked</div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Environmental Champions */}
          <Card className="glass border-slate-600">
            <CardContent className="p-6 text-center">
              <Trophy className="w-8 h-8 text-amber-500 mx-auto mb-3" />
              <h3 className="text-lg font-bold text-white mb-3">Top Champions</h3>
              
              <div className="space-y-2">
                {champions.map((champion, index) => (
                  <div key={index} className="flex items-center justify-between text-sm">
                    <div className="flex items-center">
                      {champion.icon}
                      <span className="text-white ml-2">{champion.name}</span>
                    </div>
                    <span className="text-gray-400 text-xs">{champion.impact}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Your Status */}
          <Card className="glass border-slate-600">
            <CardContent className="p-6 text-center">
              <Star className="w-8 h-8 text-amber-500 mx-auto mb-3" />
              <h3 className="text-lg font-bold text-white mb-3">Your Status</h3>
              
              <div className="space-y-2">
                <div className="bg-hero-green-500/20 border border-hero-green-500/30 rounded-lg p-3">
                  <div className="text-white font-bold text-sm">Water Warrior</div>
                  <div className="text-xs text-hero-green-500">ACTIVE</div>
                </div>
                
                <div className="text-xs text-gray-400">
                  Next: Hydration Hero (30 days)
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Simple CTA */}
        <div className="text-center">
          <Button 
            onClick={onOrderNow}
            className="bg-hero-green-500 hover:bg-hero-green-600 text-black font-bold px-8 py-3 rounded-xl transform hover:scale-105 transition-all"
            data-testid="button-continue-mission"
          >
            <Zap className="mr-2 w-5 h-5" />
            Continue Mission
          </Button>
        </div>
      </div>
    </section>
  );
}