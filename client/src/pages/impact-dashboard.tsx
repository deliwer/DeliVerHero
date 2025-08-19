import { Globe, Calculator, TrendingUp, Zap, Target, CheckCircle, ArrowRight } from "lucide-react";
import { ImpactStats } from "@/components/impact-stats";
import { DeviceSimulator } from "@/components/device-simulator";
import { PlanetHeroesRewards } from "@/components/planet-heroes-rewards";
import { ImpactSlotMachine } from "@/components/impact-slot-machine";
import { useState } from "react";
import type { TradeCalculation } from "@/types/hero";

export default function ImpactDashboard() {
  const [personalImpact, setPersonalImpact] = useState<TradeCalculation | null>(null);

  const handleCalculation = (result: TradeCalculation) => {
    setPersonalImpact(result);
  };

  return (
    <div className="py-16 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-white mb-4" data-testid="page-title">
            <Globe className="inline w-8 h-8 text-hero-green-500 mr-3" />
            IMPACT & REWARDS DASHBOARD
          </h1>
          <p className="text-gray-300 text-lg">Real-time environmental impact and hero rewards system</p>
        </div>

        {/* Global Impact Stats */}
        <ImpactStats />

        {/* Interactive Impact Calculator */}
        <ImpactSlotMachine />

        {/* Personal Impact Calculator */}
        <div className="glass rounded-2xl p-8 border border-slate-600 mb-12" data-testid="personal-calculator">
          <h2 className="text-2xl font-bold text-white text-center mb-8">
            <Calculator className="inline w-6 h-6 text-dubai-blue-500 mr-2" />
            YOUR PERSONAL IMPACT SIMULATOR
          </h2>

          <div className="grid lg:grid-cols-2 gap-8">
            {/* Calculator */}
            <div>
              <DeviceSimulator onCalculation={handleCalculation} />
            </div>

            {/* Results */}
            <div className="bg-gradient-to-br from-hero-green-500/10 to-blue-500/10 rounded-xl p-6 border border-hero-green-500/30" data-testid="calculation-results">
              <h3 className="text-lg font-semibold text-white mb-4 flex items-center">
                <Zap className="w-5 h-5 text-amber-500 mr-2" />
                Your Environmental Superpower
              </h3>
              
              {personalImpact ? (
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-300">Trade Value</span>
                    <span className="text-2xl font-bold text-amber-500" data-testid="result-trade-value">
                      AED {personalImpact.tradeValue}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-300">Planet Points</span>
                    <span className="text-xl font-bold text-hero-green-500" data-testid="result-points">
                      +{personalImpact.points} pts
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-300">Bottles Prevented</span>
                    <span className="text-xl font-bold text-blue-400" data-testid="result-bottles">
                      {personalImpact.bottlesPrevented.toLocaleString()}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-300">CO₂ Saved</span>
                    <span className="text-xl font-bold text-green-400" data-testid="result-co2">
                      {(personalImpact.co2Saved / 1000).toFixed(2)} kg
                    </span>
                  </div>
                  <div className="border-t border-slate-600 pt-4">
                    <div className="text-center">
                      <div className="text-sm text-gray-400 mb-2">Hero Level Achieved</div>
                      <div className="bg-gradient-to-r from-amber-500 to-orange-500 text-black px-4 py-2 rounded-lg font-bold inline-block" data-testid="result-level">
                        🏆 {personalImpact.level.toUpperCase()}
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="text-center py-8">
                  <Calculator className="w-16 h-16 text-gray-600 mx-auto mb-4" />
                  <p className="text-gray-400">Use the calculator to see your environmental impact!</p>
                  <p className="text-sm text-gray-500 mt-2">Select your iPhone model and condition to get started</p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Dubai 2030 Progress */}
        <div className="glass rounded-2xl p-8 border border-slate-600" data-testid="dubai-2030-progress">
          <h2 className="text-2xl font-bold text-white text-center mb-8">
            <TrendingUp className="inline w-6 h-6 text-dubai-blue-500 mr-2" />
            DUBAI 2030 ENVIRONMENTAL GOALS
          </h2>

          <div className="grid md:grid-cols-3 gap-6">
            <div className="text-center p-6 bg-slate-700/30 rounded-xl">
              <div className="text-3xl font-bold text-blue-400 mb-2">60%</div>
              <div className="text-gray-300 mb-4">Clean Water Goal</div>
              <div className="w-full bg-slate-600 rounded-full h-2">
                <div className="bg-blue-400 h-2 rounded-full" style={{width: '60%'}}></div>
              </div>
              {personalImpact && (
                <div className="text-xs text-hero-green-500 mt-2">
                  Your contribution: +0.003%
                </div>
              )}
            </div>

            <div className="text-center p-6 bg-slate-700/30 rounded-xl">
              <div className="text-3xl font-bold text-hero-green-500 mb-2">45%</div>
              <div className="text-gray-300 mb-4">Carbon Reduction</div>
              <div className="w-full bg-slate-600 rounded-full h-2">
                <div className="bg-hero-green-500 h-2 rounded-full" style={{width: '45%'}}></div>
              </div>
              {personalImpact && (
                <div className="text-xs text-hero-green-500 mt-2">
                  Your contribution: +0.002%
                </div>
              )}
            </div>

            <div className="text-center p-6 bg-slate-700/30 rounded-xl">
              <div className="text-3xl font-bold text-amber-500 mb-2">72%</div>
              <div className="text-gray-300 mb-4">Plastic Elimination</div>
              <div className="w-full bg-slate-600 rounded-full h-2">
                <div className="bg-amber-500 h-2 rounded-full" style={{width: '72%'}}></div>
              </div>
              {personalImpact && (
                <div className="text-xs text-hero-green-500 mt-2">
                  Your contribution: +0.001%
                </div>
              )}
            </div>
          </div>

          <div className="text-center mt-8">
            <p className="text-gray-300 mb-4">Every iPhone trade brings Dubai closer to its sustainability goals!</p>
            <div className="text-sm text-gray-500">
              Data updated in real-time from Dubai Municipality Environmental Department
            </div>
          </div>
        </div>

        {/* Consolidated Sustainability Path */}
        <div className="glass rounded-2xl p-8 border border-hero-green-500/50 bg-gradient-to-br from-hero-green-500/10 to-blue-500/10 mb-12 mt-12" data-testid="sustainability-path">
          <h2 className="text-3xl font-bold text-center text-white mb-8">
            <Target className="inline w-8 h-8 text-hero-green-500 mr-3" />
            Your Path to Sustainability
          </h2>
          
          <div className="grid md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-white">1</span>
              </div>
              <h3 className="text-xl font-bold text-white mb-3">Start at Home</h3>
              <p className="text-gray-300 mb-4">Exchange your old iPhone for AquaCafe products with instant rewards</p>
              <div className="flex items-center justify-center gap-2">
                <CheckCircle className="w-5 h-5 text-hero-green-500" />
                <span className="text-hero-green-400 font-semibold">Begin Today</span>
              </div>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-emerald-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-white">2</span>
              </div>
              <h3 className="text-xl font-bold text-white mb-3">Collect Planet Points</h3>
              <p className="text-gray-300 mb-4">Continue earning through missions and eco-friendly actions</p>
              <div className="flex items-center justify-center gap-2">
                <TrendingUp className="w-5 h-5 text-hero-green-500" />
                <span className="text-hero-green-400 font-semibold">Keep Growing</span>
              </div>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-amber-500 to-orange-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-white">3</span>
              </div>
              <h3 className="text-xl font-bold text-white mb-3">Redeem & Evolve</h3>
              <p className="text-gray-300 mb-4">Use points in our evolving ecosystem of partner campaigns</p>
              <div className="flex items-center justify-center gap-2">
                <ArrowRight className="w-5 h-5 text-hero-green-500" />
                <span className="text-hero-green-400 font-semibold">Unlock Rewards</span>
              </div>
            </div>
          </div>
          
          <div className="text-center mt-8">
            <p className="text-lg text-hero-green-400 font-semibold">That's How it Works!</p>
            <p className="text-gray-300 mt-2">Join the movement for Dubai's sustainable future</p>
          </div>
        </div>

        {/* Planet Heroes Rewards System */}
        <PlanetHeroesRewards />
      </div>
    </div>
  );
}
