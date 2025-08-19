import { useState } from "react";
import { Smartphone, Calculator, ArrowRight, Target, Clock, CheckCircle, Zap, Star, Trophy, TrendingUp, Gift } from "lucide-react";
import { Button } from "@/components/ui/button";

interface TradeCalculationResult {
  tradeValue: number;
  points: number;
  co2Saved: number;
  bottlesPrevented: number;
  waterSaved: string;
}

export function MeetDeliInteractive() {
  const [activeStep, setActiveStep] = useState(1);
  const [calculatedValue, setCalculatedValue] = useState<number | null>(null);
  const [calculatedPoints, setCalculatedPoints] = useState<number | null>(null);

  const handleStepClick = (step: number) => {
    if (step === 1) {
      setActiveStep(1);
    } else if (step === 2 && calculatedValue) {
      setActiveStep(2);
    } else if (step === 3 && calculatedValue) {
      setActiveStep(3);
    }
  };

  return (
    <div className="glass rounded-2xl p-8 border border-slate-600" data-testid="get-trade-offer" data-section="get-trade-offer">
      {/* Header */}
      <div className="text-center mb-12">
        <div className="flex items-center justify-center gap-3 mb-4">
          <Calculator className="w-8 h-8 text-hero-green-500" />
          <div className="inline-flex items-center bg-gradient-to-r from-hero-green-500/30 to-slate-600/30 border border-hero-green-500/50 rounded-full px-6 py-2 shadow-lg backdrop-blur-sm">
            <Zap className="w-4 h-4 text-hero-green-400 mr-2" />
            <span className="text-hero-green-300 font-bold text-sm tracking-wide">INSTANT TRADE VALUATION</span>
            <Zap className="w-4 h-4 text-hero-green-400 ml-2" />
          </div>
          <Smartphone className="w-8 h-8 text-slate-400" />
        </div>
        
        <h2 className="text-4xl md:text-6xl font-black mb-4 leading-tight">
          <span className="bg-gradient-to-r from-white via-hero-green-300 to-slate-200 bg-clip-text text-transparent">GET TRADE-IN OFFER</span>
          <br />
          <span className="text-2xl md:text-3xl text-hero-green-500 font-bold">Trade iPhone • Win iPhone 17 • Collect Points</span>
        </h2>
        
        <p className="text-lg text-gray-300 max-w-4xl mx-auto mb-8 leading-relaxed">
          Get instant iPhone trade value and start collecting Planet Points through eco-missions. 
          <strong className="text-hero-green-500"> Maximize store credit to minimize cash</strong> for iPhone 17 upgrade at GITEX 2025.
        </p>
      </div>

      {/* Three-Step Process Overview */}
      <div className="grid md:grid-cols-3 gap-6 mb-12">
        {/* Step 1: Exchange (Active) */}
        <div className="glass rounded-2xl p-6 border border-hero-green-500/50 bg-gradient-to-br from-hero-green-500/10 to-hero-green-600/10 backdrop-blur-sm relative transform scale-105 z-10">
          <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
            <div className="bg-hero-green-500 text-black font-bold px-4 py-1 rounded-full text-sm">
              STEP 1 - ACTIVE
            </div>
          </div>
          
          <div className="text-center mt-4">
            <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 bg-gradient-to-r from-hero-green-500 to-hero-green-600">
              <Smartphone className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-xl font-bold text-white mb-3">EXCHANGE</h3>
            <p className="text-gray-300 mb-4">Trade your old iPhone for instant Planet Points and exclusive rewards</p>
            
            <div className="flex items-center justify-center gap-2 mt-4">
              <CheckCircle className="w-5 h-5 text-hero-green-500" />
              <span className="font-semibold text-hero-green-500">Get Started</span>
            </div>
          </div>
        </div>

        {/* Step 2: Collect Planet Points */}
        <div 
          className={`glass rounded-2xl p-6 border backdrop-blur-sm relative cursor-pointer transition-all duration-300 ${
            activeStep === 2 
              ? 'border-hero-green-500/50 bg-gradient-to-br from-hero-green-500/10 to-hero-green-600/10 transform scale-105 z-10' 
              : calculatedValue 
                ? 'border-amber-500/50 bg-gradient-to-br from-amber-500/10 to-amber-600/10' 
                : 'border-slate-500/50 bg-gradient-to-br from-slate-600/10 to-slate-700/10'
          }`}
          onClick={() => calculatedValue && handleStepClick(2)}
        >
          <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
            <div className={`font-bold px-4 py-1 rounded-full text-sm ${
              activeStep === 2 
                ? 'bg-hero-green-500 text-black' 
                : calculatedValue 
                  ? 'bg-amber-500 text-black'
                  : 'bg-slate-500 text-white'
            }`}>
              STEP 2
            </div>
          </div>
          
          <div className="text-center mt-4">
            <div className={`w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 ${
              activeStep === 2 
                ? 'bg-gradient-to-r from-hero-green-500 to-hero-green-600' 
                : calculatedValue 
                  ? 'bg-gradient-to-r from-amber-500 to-amber-600'
                  : 'bg-gradient-to-r from-slate-500 to-slate-600'
            }`}>
              <Target className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-xl font-bold text-white mb-3">COLLECT POINTS</h3>
            <p className="text-gray-300 mb-4">Complete eco-missions and level up to meet iPhone 17 shortfall</p>
            
            <div className="flex items-center justify-center gap-2 mt-4">
              <div className={`w-5 h-5 ${
                activeStep === 2 
                  ? 'text-hero-green-500' 
                  : calculatedValue 
                    ? 'text-amber-500' 
                    : 'text-slate-500'
              }`}>
                {calculatedValue ? <TrendingUp /> : <Clock />}
              </div>
              <span className={`font-semibold ${
                activeStep === 2 
                  ? 'text-hero-green-500' 
                  : calculatedValue 
                    ? 'text-amber-500' 
                    : 'text-slate-500'
              }`}>
                {calculatedValue ? 'Keep Growing' : 'Waiting'}
              </span>
            </div>
          </div>
        </div>

        {/* Step 3: Redeem iPhone 17 */}
        <div 
          className={`glass rounded-2xl p-6 border backdrop-blur-sm relative cursor-pointer transition-all duration-300 ${
            activeStep === 3 
              ? 'border-slate-500/50 bg-gradient-to-br from-slate-600/10 to-slate-700/10 transform scale-105 z-10' 
              : calculatedValue 
                ? 'border-hero-green-500/50 bg-gradient-to-br from-hero-green-500/10 to-slate-600/10' 
                : 'border-slate-500/50 bg-gradient-to-br from-slate-600/10 to-slate-700/10'
          }`}
          onClick={() => calculatedValue && handleStepClick(3)}
        >
          <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
            <div className={`font-bold px-4 py-1 rounded-full text-sm ${
              activeStep === 3 
                ? 'bg-slate-500 text-white' 
                : calculatedValue 
                  ? 'bg-hero-green-500 text-black'
                  : 'bg-slate-500 text-white'
            }`}>
              STEP 3
            </div>
          </div>
          
          <div className="text-center mt-4">
            <div className={`w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 ${
              activeStep === 3 
                ? 'bg-gradient-to-r from-slate-500 to-slate-600' 
                : calculatedValue 
                  ? 'bg-gradient-to-r from-hero-green-500 to-slate-600'
                  : 'bg-gradient-to-r from-slate-500 to-slate-600'
            }`}>
              <Gift className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-xl font-bold text-white mb-3">REDEEM</h3>
            <p className="text-gray-300 mb-4">Use points as store credit to minimize cash for iPhone 17</p>
            
            <div className="flex items-center justify-center gap-2 mt-4">
              <div className={`w-5 h-5 ${
                activeStep === 3 
                  ? 'text-slate-500' 
                  : calculatedValue 
                    ? 'text-hero-green-500' 
                    : 'text-slate-500'
              }`}>
                {calculatedValue ? <ArrowRight /> : <Clock />}
              </div>
              <span className={`font-semibold ${
                activeStep === 3 
                  ? 'text-slate-500' 
                  : calculatedValue 
                    ? 'text-hero-green-500' 
                    : 'text-slate-500'
              }`}>
                {calculatedValue ? 'Unlock Rewards' : 'Complete Steps'}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Trade Value Display */}
      {calculatedValue && (
        <div className="text-center space-y-6">
          <div className="inline-flex items-center bg-hero-green-500/20 border border-hero-green-500/50 rounded-full px-6 py-3 mb-6">
            <Trophy className="w-5 h-5 text-hero-green-500 mr-2" />
            <span className="text-hero-green-500 font-bold">Your Trade Value: AED {calculatedValue} + {calculatedPoints} Planet Points</span>
          </div>
        </div>
      )}

      {/* Live Stats */}
      <div className="text-center pt-3 px-4 space-y-3">
        <div className="flex items-center justify-center text-xs text-hero-green-500">
          <div className="w-2 h-2 bg-hero-green-500 rounded-full mr-2 animate-pulse"></div>
          Live: 78 devices traded today • 125,000L water saved • 12.3T CO₂ reduced
        </div>
      </div>
    </div>
  );
}