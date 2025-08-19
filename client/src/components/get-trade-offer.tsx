import { useState, useEffect } from "react";
import { Smartphone, ArrowRight, Calculator, Bot, Gift, Trophy, Target, Clock, CheckCircle, Zap, Star, TrendingUp, Droplets, Package, Home, Users, Crown, Gamepad2, Send, MessageCircle, Calendar, ShoppingCart, Leaf } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { openAIService } from "@/lib/openai-service";
import { useMutation } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { Link } from "wouter";

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

interface TradeCalculationResult {
  tradeValue: number;
  points: number;
  co2Saved: number;
  bottlesPrevented: number;
  waterSaved: string;
}

export function GetTradeOffer() {
  const [selectedDevice, setSelectedDevice] = useState("");
  const [selectedCondition, setSelectedCondition] = useState("");
  const [activeStep, setActiveStep] = useState(1);
  const [calculatedValue, setCalculatedValue] = useState<number | null>(null);
  const [calculatedPoints, setCalculatedPoints] = useState<number | null>(null);
  const [showDetails, setShowDetails] = useState(false);
  const [showInputDetails, setShowInputDetails] = useState(false);
  const [hoveredDevice, setHoveredDevice] = useState<string | null>(null);
  
  // AI Chat State (from Meet Deli Interactive)
  const [inputMessage, setInputMessage] = useState("");
  const [isAILoading, setIsAILoading] = useState(false);
  const [aiResponse, setAIResponse] = useState<string>("");
  const [activeTab, setActiveTab] = useState("calculator");
  const [calculationResult, setCalculationResult] = useState<TradeCalculationResult | null>(null);

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

  // AI Chat Functions (from Meet Deli Interactive)
  const sendMessage = async (message: string) => {
    if (!message.trim()) return;

    setInputMessage("");
    setIsAILoading(true);

    try {
      const response = await openAIService.sendMessage(message, {
        phoneModels: DEVICE_OPTIONS.map(d => d.model),
        recentMessages: [],
      });

      let enhancedContent = response.response || response.fallback || "Hi! I'm Deli, your trade-in assistant. I'm here to help with your iPhone trade!";
      
      // Add contextual responses for better conversational experience
      if (message.toLowerCase().includes('iphone')) {
        const deviceMatch = DEVICE_OPTIONS.find(d => message.toLowerCase().includes(d.model.toLowerCase()));
        if (deviceMatch) {
          enhancedContent = `Great! Your ${deviceMatch.model} has a trade value of AED ${deviceMatch.baseValue}. This trade will save 12,500L water and earn you +2,400 Planet Points! 🌍✨`;
        }
      }
      
      setAIResponse(enhancedContent);
    } catch (error) {
      setAIResponse("I'm temporarily unavailable, but I'll be back soon to help with your iPhone trade-in! 🤖");
    } finally {
      setIsAILoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage(inputMessage);
    }
  };

  // Calculator Functions (from Meet Deli Interactive)
  const calculationMutation = useMutation({
    mutationFn: async (data: { device: string; condition: string }): Promise<TradeCalculationResult> => {
      const response = await apiRequest('/api/calculate-trade', 'POST', data);
      const result = await response.json() as TradeCalculationResult;
      return result;
    },
    onSuccess: (result: TradeCalculationResult) => {
      setCalculationResult(result);
    },
  });

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
            <span className="bg-gradient-to-r from-white via-hero-green-200 to-blue-200 bg-clip-text text-transparent">GET TRADE-IN OFFER</span>
            <br />
            <span className="text-2xl md:text-3xl text-hero-green-400 font-bold">Trade iPhone • Win iPhone 17 • Collect Points</span>
          </h2>
          
          <p className="text-lg text-gray-300 max-w-4xl mx-auto mb-8 leading-relaxed">
            Get instant iPhone trade value and start collecting Planet Points through eco-missions. 
            <strong className="text-hero-green-400"> Maximize store credit to minimize cash</strong> for iPhone 17 upgrade at GITEX 2025.
          </p>
        </div>


        {/* Three-Step Process Overview */}
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          {/* Step 1: Exchange (Active) */}
          <div className="glass rounded-2xl p-6 border border-hero-green-500/50 bg-gradient-to-br from-hero-green-500/10 to-emerald-500/10 backdrop-blur-sm relative transform scale-105 z-10">
            <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
              <div className="bg-hero-green-500 text-black font-bold px-4 py-1 rounded-full text-sm">
                STEP 1 - ACTIVE
              </div>
            </div>
            
            <div className="text-center mt-4">
              <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 bg-gradient-to-r from-hero-green-500 to-emerald-500">
                <Smartphone className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">EXCHANGE</h3>
              <p className="text-gray-300 mb-4">Trade your old iPhone for instant Planet Points and exclusive rewards</p>
              
              <div className="flex items-center justify-center gap-2 mt-4">
                <CheckCircle className="w-5 h-5 text-hero-green-500" />
                <span className="font-semibold text-hero-green-400">Get Started</span>
              </div>
            </div>
          </div>

          {/* Step 2: Collect Planet Points */}
          <div 
            className={`glass rounded-2xl p-6 border backdrop-blur-sm relative cursor-pointer transition-all duration-300 ${
              activeStep === 2 
                ? 'border-hero-green-500/50 bg-gradient-to-br from-hero-green-500/10 to-emerald-500/10 transform scale-105 z-10' 
                : calculatedValue 
                  ? 'border-amber-500/50 bg-gradient-to-br from-amber-500/10 to-orange-500/10' 
                  : 'border-gray-500/50 bg-gradient-to-br from-gray-500/10 to-slate-500/10'
            }`}
            onClick={() => calculatedValue && handleStepClick(2)}
          >
            <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
              <div className={`font-bold px-4 py-1 rounded-full text-sm ${
                activeStep === 2 
                  ? 'bg-hero-green-500 text-black' 
                  : calculatedValue 
                    ? 'bg-amber-500 text-black'
                    : 'bg-gray-500 text-white'
              }`}>
                STEP 2
              </div>
            </div>
            
            <div className="text-center mt-4">
              <div className={`w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 ${
                activeStep === 2 
                  ? 'bg-gradient-to-r from-hero-green-500 to-emerald-500' 
                  : calculatedValue 
                    ? 'bg-gradient-to-r from-amber-500 to-orange-500'
                    : 'bg-gradient-to-r from-gray-500 to-slate-500'
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
                      : 'text-gray-500'
                }`}>
                  {calculatedValue ? <TrendingUp /> : <Clock />}
                </div>
                <span className={`font-semibold ${
                  activeStep === 2 
                    ? 'text-hero-green-400' 
                    : calculatedValue 
                      ? 'text-amber-400' 
                      : 'text-gray-400'
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
                STEP 3
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
                <Gift className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">REDEEM</h3>
              <p className="text-gray-300 mb-4">Use points as store credit to minimize cash for iPhone 17</p>
              
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
                  {calculatedValue ? 'Unlock Rewards' : 'Complete Steps'}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Neon-Style CTAs */}
        <div className="text-center space-y-6">
          {calculatedValue && (
            <div className="inline-flex items-center bg-hero-green-900/30 border border-hero-green-500/50 rounded-full px-6 py-3 mb-6">
              <Trophy className="w-5 h-5 text-hero-green-400 mr-2" />
              <span className="text-hero-green-400 font-bold">Your Trade Value: AED {calculatedValue} + {calculatedPoints} Planet Points</span>
            </div>
          )}
          
          {/* Neon "Enter the Game" CTA */}
          <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-cyan-500/20 via-purple-500/20 to-pink-500/20 p-8 border-2 border-cyan-400/50 shadow-2xl">
            {/* Neon glow effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-cyan-400/10 via-purple-400/10 to-pink-400/10 animate-pulse"></div>
            <div className="absolute -inset-1 bg-gradient-to-r from-cyan-400/20 via-purple-400/20 to-pink-400/20 rounded-3xl blur-xl animate-pulse"></div>
            
            <div className="relative z-10">
              <h3 className="text-3xl md:text-4xl font-black mb-4 leading-tight">
                <span className="bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent animate-pulse">
                  ENTER THE GAME
                </span>
              </h3>
              
              <p className="text-xl text-gray-200 mb-8 max-w-2xl mx-auto">
                Join the Planet Points Challenge and compete for iPhone 17 • Sep 9 Launch
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button
                  onClick={() => {
                    document.getElementById('planet-points-challenge')?.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="relative group bg-gradient-to-r from-cyan-500 to-purple-500 hover:from-cyan-400 hover:to-purple-400 text-black font-black px-12 py-6 text-2xl rounded-full shadow-2xl transform hover:scale-105 transition-all duration-300"
                >
                  <div className="absolute -inset-1 bg-gradient-to-r from-cyan-400 to-purple-400 rounded-full blur-lg opacity-70 group-hover:opacity-100 transition-opacity"></div>
                  <div className="relative flex items-center">
                    <Gamepad2 className="w-8 h-8 mr-3" />
                    JOIN CHALLENGE
                  </div>
                </button>
                
                <button
                  onClick={() => {
                    setActiveStep(3);
                    document.getElementById('step-3')?.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="border-2 border-purple-400 text-purple-400 hover:bg-purple-400/10 font-bold px-8 py-6 text-xl rounded-full backdrop-blur-sm transition-all"
                >
                  <Crown className="w-6 h-6 mr-2 inline" />
                  SKIP TO REDEEM
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}