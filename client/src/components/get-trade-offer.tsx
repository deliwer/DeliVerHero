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

        {/* Interactive Trade Assistant with Deli */}
        <div className="glass rounded-2xl p-8 border border-slate-600 mb-12" data-testid="meet-deli-interactive" data-section="meet-deli">
          {/* Unified Header */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center bg-gradient-to-r from-blue-500/30 to-purple-500/30 border border-blue-400/50 rounded-full px-6 py-2 shadow-lg backdrop-blur-sm mb-6">
              <div className="w-2 h-2 bg-blue-400 rounded-full mr-2 animate-pulse"></div>
              <span className="text-blue-200 font-bold text-sm tracking-wide">INTERACTIVE TRADE ASSISTANT</span>
            </div>
            <div className="flex items-center justify-center mb-4">
              <div className="w-16 h-16 bg-gradient-to-r from-emerald-500 to-blue-500 rounded-full flex items-center justify-center mr-4">
                <Bot className="w-8 h-8 text-white" />
              </div>
              <div>
                <h3 className="text-3xl font-bold text-white mb-2">Meet Deli</h3>
                <div className="flex items-center text-emerald-300">
                  <div className="w-2 h-2 bg-emerald-400 rounded-full mr-2 animate-pulse"></div>
                  Your Interactive Trade Assistant
                </div>
              </div>
            </div>
            <p className="text-gray-300 text-lg max-w-3xl mx-auto">
              Choose how you want to interact: Chat naturally with Deli or use our quick calculator for instant device valuation
            </p>
          </div>

          {/* Interactive Tabs */}
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-2 mb-8 bg-slate-700">
              <TabsTrigger 
                value="calculator" 
                className="flex items-center gap-2 data-[state=active]:bg-blue-500 data-[state=active]:text-white"
                data-testid="tab-calculator"
              >
                <Calculator className="w-4 h-4" />
                Quick Calculator
              </TabsTrigger>
              <TabsTrigger 
                value="chat" 
                className="flex items-center gap-2 data-[state=active]:bg-emerald-500 data-[state=active]:text-white"
                data-testid="tab-chat"
              >
                <MessageCircle className="w-4 h-4" />
                Chat with Deli
              </TabsTrigger>
            </TabsList>

            {/* Calculator Tab */}
            <TabsContent value="calculator" className="space-y-6">
              <div className="grid lg:grid-cols-2 gap-6 lg:gap-8">
                {/* Device Selection Side */}
                <div className="flex flex-col items-center">
                  <div className="grid sm:grid-cols-2 gap-4 sm:gap-6 items-center mb-8 w-full max-w-lg">
                    {/* Device Selection */}
                    <div className="text-center" data-testid="device-selection">
                      <div className="bg-slate-700 rounded-xl p-6 mb-4 hover:bg-slate-600 transition-colors">
                        <Smartphone className="w-12 h-12 text-white mx-auto mb-4" />
                        <Select value={selectedDevice} onValueChange={setSelectedDevice}>
                          <SelectTrigger className="bg-slate-600 text-white border-slate-500 mb-3" data-testid="select-device">
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
                          <SelectTrigger className="bg-slate-600 text-white border-slate-500" data-testid="select-condition">
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
                      </div>
                      <p className="text-gray-400">Select Your Device</p>
                    </div>

                    {/* Calculate Button */}
                    <div className="text-center">
                      <div className="flex justify-center mb-4">
                        <ArrowRight className="w-8 h-8 text-hero-green-500 animate-pulse" />
                      </div>
                      <Button
                        onClick={handleCalculate}
                        disabled={!selectedDevice || !selectedCondition}
                        className="bg-hero-green-500 hover:bg-hero-green-600 text-white px-6 py-3 rounded-lg font-bold transition-colors"
                        data-testid="button-calculate"
                      >
                        <Calculator className="mr-2 w-5 h-5" />
                        CALCULATE IMPACT
                      </Button>
                    </div>
                  </div>

                  {/* Mission Contribution Message */}
                  <div className="bg-gradient-to-r from-emerald-500/10 to-blue-500/10 rounded-lg p-4 border border-emerald-500/30 text-center">
                    <p className="text-emerald-400 font-medium">
                      🌍 Every trade-in contributes to Dubai's 2030 sustainability missions
                    </p>
                  </div>
                </div>

                {/* Calculation Results */}
                <div>
                  <div className="bg-gradient-to-br from-slate-800/90 to-slate-900/95 backdrop-blur-sm rounded-2xl p-6 border border-hero-green-500/30 shadow-xl">
                    <div className="space-y-4">
                      {/* Device Info Display */}
                      <div className="flex items-center justify-between p-4 bg-slate-700/50 rounded-xl">
                        <div className="flex items-center">
                          <div className="w-12 h-12 bg-gradient-to-br from-gray-600 to-gray-800 rounded-lg flex items-center justify-center mr-4">
                            <Smartphone className="w-6 h-6 text-white" />
                          </div>
                          <div>
                            <div className="text-white font-bold">{selectedDevice || "iPhone 15 Pro"}</div>
                            <div className="text-gray-400 text-sm">{CONDITION_OPTIONS.find(c => c.condition === selectedCondition)?.label || "Excellent Condition"}</div>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="text-2xl font-bold text-hero-green-500">AED {calculatedValue || calculationResult?.tradeValue || 3100}</div>
                          <div className="text-gray-400 text-sm">Trade Value</div>
                        </div>
                      </div>

                      {/* Impact Breakdown */}
                      <div className="grid grid-cols-2 gap-4">
                        <div className="text-center p-4 bg-amber-500/10 rounded-xl border border-amber-500/30">
                          <div className="text-xl font-bold text-amber-500">+{calculatedPoints || calculationResult?.points || 2800}</div>
                          <div className="text-gray-300 text-sm">Planet Points</div>
                        </div>
                        <div className="text-center p-4 bg-hero-green-500/10 rounded-xl border border-hero-green-500/30">
                          <div className="text-xl font-bold text-hero-green-500">{calculationResult ? Math.floor(calculationResult.bottlesPrevented / 200) : 18} Months</div>
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
                          <div className="text-emerald-500 font-bold">-{calculationResult ? (calculationResult.co2Saved || 2.4) : 2.4} kg CO₂</div>
                        </div>
                        <div className="mt-2 text-gray-300 text-sm">
                          Equal to removing {calculationResult?.bottlesPrevented || 520} plastic bottles from waste
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </TabsContent>

            {/* AI Chat Tab */}
            <TabsContent value="chat" className="space-y-6">
              {/* AI Response Display */}
              {aiResponse && (
                <div className="p-4 bg-gradient-to-r from-emerald-500/10 to-blue-500/10 border border-emerald-500/30 rounded-xl">
                  <div className="flex items-start space-x-3">
                    <div className="w-8 h-8 bg-emerald-500 rounded-full flex items-center justify-center flex-shrink-0">
                      <Bot className="w-4 h-4 text-white" />
                    </div>
                    <div className="flex-1">
                      <p className="text-white font-medium">Deli says:</p>
                      <p className="text-gray-300 mt-1">{aiResponse}</p>
                    </div>
                  </div>
                </div>
              )}

              {/* Chat Input */}
              <div className="flex space-x-3">
                <div className="flex-1 relative">
                  <Input
                    type="text"
                    placeholder="👋 Hi Deli! What iPhone model do you want to trade?"
                    value={inputMessage}
                    onChange={(e) => setInputMessage(e.target.value)}
                    onKeyDown={handleKeyPress}
                    className="h-16 px-6 text-lg bg-white/95 text-slate-900 border-2 border-emerald-400/50 focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/20 rounded-xl shadow-xl placeholder:text-slate-500 transition-all duration-300"
                    disabled={isAILoading}
                    data-testid="input-deli-message"
                  />
                  {!inputMessage && (
                    <div className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 animate-pulse">
                      <Bot className="w-6 h-6" />
                    </div>
                  )}
                </div>
                <Button
                  onClick={() => sendMessage(inputMessage)}
                  disabled={isAILoading || !inputMessage.trim()}
                  className="h-16 bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 text-white px-8 rounded-xl shadow-xl font-bold text-lg transition-all duration-300 transform hover:scale-105"
                  data-testid="button-send-deli-message"
                >
                  {isAILoading ? (
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
                      <div className="w-2 h-2 bg-white rounded-full animate-pulse" style={{animationDelay: '0.1s'}}></div>
                      <div className="w-2 h-2 bg-white rounded-full animate-pulse" style={{animationDelay: '0.2s'}}></div>
                    </div>
                  ) : (
                    <Send className="w-5 h-5" />
                  )}
                </Button>
              </div>

              {/* Quick Action Buttons */}
              <div className="flex flex-wrap gap-3 justify-center">
                <Button
                  onClick={() => sendMessage("What's my iPhone 15 Pro worth?")}
                  variant="outline"
                  size="sm"
                  className="bg-emerald-500/20 hover:bg-emerald-500 text-emerald-300 hover:text-white border-emerald-500/50 hover:border-emerald-500 transition-all"
                  data-testid="button-quick-valuation"
                >
                  <Zap className="w-4 h-4 mr-2" />
                  Quick Valuation
                </Button>
                <Button
                  onClick={() => sendMessage("Book pickup for my iPhone")}
                  variant="outline"
                  size="sm"
                  className="bg-blue-500/20 hover:bg-blue-500 text-blue-300 hover:text-white border-blue-500/50 hover:border-blue-500 transition-all"
                  data-testid="button-book-pickup"
                >
                  <Calendar className="w-4 h-4 mr-2" />
                  Book Pickup
                </Button>
              </div>
            </TabsContent>
          </Tabs>

          {/* Unified CTAs */}
          <div className="space-y-4 mt-8">
            {/* Primary CTA - Trade & Shop */}
            <Link href="/aquacafe" className="block w-full">
              <Button className="w-full bg-gradient-to-r from-hero-green-500 to-emerald-600 hover:from-hero-green-600 hover:to-emerald-700 text-white py-4 font-bold rounded-xl text-lg shadow-lg border-2 border-hero-green-400 transform hover:scale-[1.02] transition-all">
                <ShoppingCart className="mr-3 w-6 h-6" />
                TRADE-IN & SHOP AQUACAFE
                <ArrowRight className="ml-3 w-5 h-5" />
              </Button>
            </Link>
            
            {/* Live Stats & Value Proposition */}
            <div className="text-center pt-3 px-4 space-y-3">
              <div className="flex items-center justify-center text-xs text-hero-green-400">
                <div className="w-2 h-2 bg-hero-green-400 rounded-full mr-2 animate-pulse"></div>
                Live: 78 devices traded today • 125,000L water saved • 12.3T CO₂ reduced
              </div>
            </div>
          </div>
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

          {/* Planet Points Challenge Link */}
          <div 
            className="glass rounded-2xl p-6 border border-cyan-500/50 bg-gradient-to-br from-cyan-500/10 to-purple-500/10 relative cursor-pointer transition-all duration-300 hover:scale-105"
            onClick={() => {
              document.getElementById('planet-points-challenge')?.scrollIntoView({ behavior: 'smooth' });
            }}
          >
            <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
              <div className="bg-cyan-500 text-black font-bold px-4 py-1 rounded-full text-sm">
                CHALLENGE
              </div>
            </div>
            
            <div className="text-center mt-4">
              <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 bg-gradient-to-r from-cyan-500 to-purple-500">
                <Crown className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">PLANET POINTS</h3>
              <p className="text-gray-300 mb-4">Join the challenge below and compete for iPhone 17</p>
              
              <div className="flex items-center justify-center gap-2 mt-4">
                <ArrowRight className="w-5 h-5 text-cyan-500" />
                <span className="font-semibold text-cyan-400">View Challenge</span>
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