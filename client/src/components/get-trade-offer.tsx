import { useState, useEffect } from "react";
import { Smartphone, ArrowRight, Calculator, Bot, Gift, Trophy, Target, Clock, CheckCircle, Zap, Star, TrendingUp, Droplets, Package, Home } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";

const DEVICE_OPTIONS = [
  { model: "iPhone 16 Pro Max", baseValue: 4200, points: 4000 },
  { model: "iPhone 16 Pro", baseValue: 3800, points: 3600 },
  { model: "iPhone 16", baseValue: 3200, points: 3000 },
  { model: "iPhone 15 Pro Max", baseValue: 3500, points: 3200 },
  { model: "iPhone 15 Pro", baseValue: 3100, points: 2800 },
  { model: "iPhone 15", baseValue: 2800, points: 2500 },
  { model: "iPhone 14 Pro Max", baseValue: 2900, points: 2600 },
  { model: "iPhone 14 Pro", baseValue: 2500, points: 2300 },
  { model: "iPhone 14", baseValue: 2200, points: 2000 },
];

const CONDITION_OPTIONS = [
  { condition: "excellent", label: "Excellent", multiplier: 1.0 },
  { condition: "good", label: "Good", multiplier: 0.8 },
  { condition: "fair", label: "Fair", multiplier: 0.6 },
];

export function GetTradeOffer() {
  const [selectedDevice, setSelectedDevice] = useState("");
  const [selectedCondition, setSelectedCondition] = useState("");
  const [activeStep, setActiveStep] = useState(1);
  const [calculatedValue, setCalculatedValue] = useState<number | null>(null);
  const [calculatedPoints, setCalculatedPoints] = useState<number | null>(null);
  const [showDetails, setShowDetails] = useState(false);

  const handleCalculate = () => {
    if (selectedDevice && selectedCondition) {
      const device = DEVICE_OPTIONS.find(d => d.model === selectedDevice);
      const condition = CONDITION_OPTIONS.find(c => c.condition === selectedCondition);
      
      if (device && condition) {
        const value = Math.round(device.baseValue * condition.multiplier);
        const points = Math.round(device.points * condition.multiplier);
        setCalculatedValue(value);
        setCalculatedPoints(points);
        setActiveStep(2);
        setShowDetails(true);
      }
    }
  };

  const handleStepClick = (step: number) => {
    if (step === 1) {
      setActiveStep(1);
      setShowDetails(false);
    } else if (step === 2 && calculatedValue) {
      setActiveStep(2);
    } else if (step === 3 && calculatedValue) {
      setActiveStep(3);
    }
  };

  return (
    <section className="relative py-12 sm:py-20 px-4 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 overflow-hidden">
      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Calculator className="w-8 h-8 text-hero-green-400" />
            <div className="inline-flex items-center bg-gradient-to-r from-hero-green-500/30 to-blue-500/30 border border-hero-green-400/50 rounded-full px-6 py-2 shadow-lg backdrop-blur-sm">
              <Zap className="w-4 h-4 text-hero-green-300 mr-2" />
              <span className="text-hero-green-200 font-bold text-sm tracking-wide">INSTANT TRADE VALUATION</span>
              <Zap className="w-4 h-4 text-hero-green-300 ml-2" />
            </div>
            <Smartphone className="w-8 h-8 text-blue-400" />
          </div>
          
          <h2 className="text-4xl md:text-6xl font-black mb-4 leading-tight">
            <span className="bg-gradient-to-r from-white via-hero-green-200 to-blue-200 bg-clip-text text-transparent">
              GET TRADE-IN OFFER
            </span>
            <br />
            <span className="text-2xl md:text-3xl text-hero-green-400 font-bold">Instant Value • Planet Points • Rewards</span>
          </h2>
          
          <p className="text-lg text-gray-300 max-w-4xl mx-auto mb-8 leading-relaxed">
            Calculate your iPhone's value and discover your Planet Points potential. 
            <strong className="text-hero-green-400"> Start your sustainability journey with instant rewards</strong>.
          </p>
        </div>

        {/* Three-Step Interactive Process */}
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          {/* Step 1: Input & Calculate - Enhanced when Active */}
          <div 
            className={`glass rounded-2xl p-6 border backdrop-blur-sm relative cursor-pointer transition-all duration-300 ${
              activeStep === 1 
                ? 'border-hero-green-500/50 bg-gradient-to-br from-hero-green-500/10 to-emerald-500/10 transform scale-105 z-10' 
                : 'border-blue-500/50 bg-gradient-to-br from-blue-500/10 to-cyan-500/10'
            }`}
            onClick={() => handleStepClick(1)}
          >
            <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
              <div className={`font-bold px-4 py-1 rounded-full text-sm ${
                activeStep === 1 
                  ? 'bg-hero-green-500 text-black' 
                  : 'bg-blue-500 text-white'
              }`}>
                {activeStep === 1 ? 'STEP 1 - ACTIVE' : 'STEP 1'}
              </div>
            </div>
            
            <div className="text-center mt-4">
              <div className={`w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 ${
                activeStep === 1 
                  ? 'bg-gradient-to-r from-hero-green-500 to-emerald-500' 
                  : 'bg-gradient-to-r from-blue-500 to-cyan-500'
              }`}>
                <Calculator className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">INPUT & CALCULATE</h3>
              <p className="text-gray-300 mb-4">Select your iPhone model and get instant trade value</p>
              
              {activeStep === 1 && (
                <div className="space-y-4 mt-6">
                  <Select value={selectedDevice} onValueChange={setSelectedDevice}>
                    <SelectTrigger className="bg-slate-700 text-white border-hero-green-500/50 hover:border-hero-green-500 transition-colors">
                      <SelectValue placeholder="Choose iPhone Model" />
                    </SelectTrigger>
                    <SelectContent>
                      {DEVICE_OPTIONS.map((device) => (
                        <SelectItem key={device.model} value={device.model}>
                          {device.model}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  
                  <Select value={selectedCondition} onValueChange={setSelectedCondition}>
                    <SelectTrigger className="bg-slate-700 text-white border-hero-green-500/50 hover:border-hero-green-500 transition-colors">
                      <SelectValue placeholder="Device Condition" />
                    </SelectTrigger>
                    <SelectContent>
                      {CONDITION_OPTIONS.map((condition) => (
                        <SelectItem key={condition.condition} value={condition.condition}>
                          {condition.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  
                  <Button
                    onClick={handleCalculate}
                    disabled={!selectedDevice || !selectedCondition}
                    className="w-full bg-hero-green-500 hover:bg-hero-green-600 text-black font-bold py-3 rounded-lg transition-all"
                  >
                    <Calculator className="w-5 h-5 mr-2" />
                    CALCULATE VALUE
                  </Button>
                </div>
              )}
              
              {!showDetails && (
                <div className="flex items-center justify-center gap-2 mt-4">
                  <div className={`w-5 h-5 ${activeStep === 1 ? 'text-hero-green-500' : 'text-blue-500'}`}>
                    {activeStep === 1 ? <Target /> : <CheckCircle />}
                  </div>
                  <span className={`font-semibold ${activeStep === 1 ? 'text-hero-green-400' : 'text-blue-400'}`}>
                    {activeStep === 1 ? 'Enter Details' : 'Ready'}
                  </span>
                </div>
              )}
            </div>
          </div>

          {/* Step 2: View Results - Enhanced when Active */}
          <div 
            className={`glass rounded-2xl p-6 border backdrop-blur-sm relative cursor-pointer transition-all duration-300 ${
              activeStep === 2 
                ? 'border-amber-500/50 bg-gradient-to-br from-amber-500/10 to-orange-500/10 transform scale-105 z-10' 
                : calculatedValue 
                  ? 'border-hero-green-500/50 bg-gradient-to-br from-hero-green-500/10 to-emerald-500/10' 
                  : 'border-gray-500/50 bg-gradient-to-br from-gray-500/10 to-slate-500/10'
            }`}
            onClick={() => calculatedValue && handleStepClick(2)}
          >
            <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
              <div className={`font-bold px-4 py-1 rounded-full text-sm ${
                activeStep === 2 
                  ? 'bg-amber-500 text-black' 
                  : calculatedValue 
                    ? 'bg-hero-green-500 text-black'
                    : 'bg-gray-500 text-white'
              }`}>
                {activeStep === 2 ? 'STEP 2 - ACTIVE' : 'STEP 2'}
              </div>
            </div>
            
            <div className="text-center mt-4">
              <div className={`w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 ${
                activeStep === 2 
                  ? 'bg-gradient-to-r from-amber-500 to-orange-500' 
                  : calculatedValue 
                    ? 'bg-gradient-to-r from-hero-green-500 to-emerald-500'
                    : 'bg-gradient-to-r from-gray-500 to-slate-500'
              }`}>
                <Gift className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">VIEW RESULTS</h3>
              <p className="text-gray-300 mb-4">See your trade value, points, and environmental impact</p>
              
              {calculatedValue && activeStep === 2 && (
                <div className="space-y-3 mt-6">
                  <div className="bg-amber-500/20 rounded-lg p-3">
                    <div className="text-2xl font-black text-amber-400">AED {calculatedValue}</div>
                    <div className="text-gray-300 text-sm">Trade Value</div>
                  </div>
                  <div className="flex justify-between items-center bg-amber-500/20 rounded-lg p-2">
                    <div className="flex items-center">
                      <Star className="w-4 h-4 text-amber-400 mr-2" />
                      <span className="text-gray-300">Planet Points</span>
                    </div>
                    <span className="text-amber-400 font-bold">+{calculatedPoints}</span>
                  </div>
                  <div className="flex justify-between items-center bg-hero-green-500/20 rounded-lg p-2">
                    <div className="flex items-center">
                      <Droplets className="w-4 h-4 text-hero-green-400 mr-2" />
                      <span className="text-gray-300">Water Saved</span>
                    </div>
                    <span className="text-hero-green-400 font-bold">520L</span>
                  </div>
                </div>
              )}
              
              <div className="flex items-center justify-center gap-2 mt-4">
                <div className={`w-5 h-5 ${
                  activeStep === 2 
                    ? 'text-amber-500' 
                    : calculatedValue 
                      ? 'text-hero-green-500' 
                      : 'text-gray-500'
                }`}>
                  {calculatedValue ? <CheckCircle /> : <Clock />}
                </div>
                <span className={`font-semibold ${
                  activeStep === 2 
                    ? 'text-amber-400' 
                    : calculatedValue 
                      ? 'text-hero-green-400' 
                      : 'text-gray-400'
                }`}>
                  {calculatedValue ? 'Value Ready' : 'Waiting'}
                </span>
              </div>
            </div>
          </div>

          {/* Step 3: Complete Trade */}
          <div 
            className={`glass rounded-2xl p-6 border backdrop-blur-sm relative cursor-pointer transition-all duration-300 ${
              activeStep === 3 
                ? 'border-purple-500/50 bg-gradient-to-br from-purple-500/10 to-pink-500/10 transform scale-105 z-10' 
                : calculatedValue 
                  ? 'border-hero-green-500/50 bg-gradient-to-br from-hero-green-500/10 to-blue-500/10' 
                  : 'border-gray-500/50 bg-gradient-to-br from-gray-500/10 to-slate-500/10'
            }`}
            onClick={() => calculatedValue && handleStepClick(3)}
          >
            <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
              <div className={`font-bold px-4 py-1 rounded-full text-sm ${
                activeStep === 3 
                  ? 'bg-purple-500 text-white' 
                  : calculatedValue 
                    ? 'bg-hero-green-500 text-black'
                    : 'bg-gray-500 text-white'
              }`}>
                {activeStep === 3 ? 'STEP 3 - ACTIVE' : 'STEP 3'}
              </div>
            </div>
            
            <div className="text-center mt-4">
              <div className={`w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 ${
                activeStep === 3 
                  ? 'bg-gradient-to-r from-purple-500 to-pink-500' 
                  : calculatedValue 
                    ? 'bg-gradient-to-r from-hero-green-500 to-blue-500'
                    : 'bg-gradient-to-r from-gray-500 to-slate-500'
              }`}>
                <Trophy className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">COMPLETE TRADE</h3>
              <p className="text-gray-300 mb-4">Book pickup and join the Planet Heroes community</p>
              
              {calculatedValue && activeStep === 3 && (
                <div className="space-y-3 mt-6">
                  <div className="bg-purple-500/20 rounded-lg p-3">
                    <div className="flex items-center justify-center gap-2 mb-2">
                      <Home className="w-5 h-5 text-purple-400" />
                      <span className="text-purple-200 font-medium">Home Pickup</span>
                    </div>
                    <div className="flex items-center justify-center gap-4 text-sm text-gray-300">
                      <div className="flex items-center gap-1">
                        <Clock className="w-4 h-4 text-blue-400" />
                        <span>Same Day</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Package className="w-4 h-4 text-hero-green-400" />
                        <span>Free</span>
                      </div>
                    </div>
                  </div>
                  
                  <Button className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-bold py-3 rounded-lg">
                    <Trophy className="w-5 h-5 mr-2" />
                    BOOK PICKUP NOW
                  </Button>
                </div>
              )}
              
              <div className="flex items-center justify-center gap-2 mt-4">
                <div className={`w-5 h-5 ${
                  activeStep === 3 
                    ? 'text-purple-500' 
                    : calculatedValue 
                      ? 'text-hero-green-500' 
                      : 'text-gray-500'
                }`}>
                  {calculatedValue ? <ArrowRight /> : <Clock />}
                </div>
                <span className={`font-semibold ${
                  activeStep === 3 
                    ? 'text-purple-400' 
                    : calculatedValue 
                      ? 'text-hero-green-400' 
                      : 'text-gray-400'
                }`}>
                  {calculatedValue ? 'Ready to Trade' : 'Complete Steps'}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Call to Action */}
        {calculatedValue && (
          <div className="text-center">
            <div className="inline-flex items-center bg-hero-green-900/30 border border-hero-green-500/50 rounded-full px-6 py-3 mb-4">
              <Trophy className="w-5 h-5 text-hero-green-400 mr-2" />
              <span className="text-hero-green-400 font-bold">Your Trade Value: AED {calculatedValue} + {calculatedPoints} Planet Points</span>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}