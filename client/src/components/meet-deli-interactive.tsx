import { useState } from "react";
import { Bot, Send, Calendar, ShoppingCart, Smartphone, Calculator, ArrowRight, Leaf, Star, Trophy, Rocket, MessageCircle, Zap, Target, Droplets, Users, Crown, Gamepad2, CheckCircle, Clock, TrendingUp, Gift } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { openAIService } from "@/lib/openai-service";
import { DEVICE_OPTIONS, CONDITION_OPTIONS } from "@/types/hero";
import { useMutation } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { Link } from "wouter";

interface TradeCalculationResult {
  tradeValue: number;
  points: number;
  co2Saved: number;
  bottlesPrevented: number;
  waterSaved: string;
}

export function MeetDeliInteractive() {
  // AI Chat State
  const [inputMessage, setInputMessage] = useState("");
  const [isAILoading, setIsAILoading] = useState(false);
  const [aiResponse, setAIResponse] = useState<string>("");

  // Trade-in Offer State (integrated from GetTradeOffer component)
  const [selectedTradeDevice, setSelectedTradeDevice] = useState("");
  const [selectedTradeCondition, setSelectedTradeCondition] = useState("");
  const [activeStep, setActiveStep] = useState(1);
  const [calculatedTradeValue, setCalculatedTradeValue] = useState<number | null>(null);
  const [calculatedTradePoints, setCalculatedTradePoints] = useState<number | null>(null);
  const [showTradeDetails, setShowTradeDetails] = useState(false);

  // Calculator State (for quick calculator tab)
  const [selectedDevice, setSelectedDevice] = useState(DEVICE_OPTIONS[0].model);
  const [selectedCondition, setSelectedCondition] = useState(CONDITION_OPTIONS[0].condition);
  const [calculationResult, setCalculationResult] = useState<TradeCalculationResult | null>(null);

  // Active interaction mode
  const [activeTab, setActiveTab] = useState("trade-offer");

  // AI Chat Functions
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

  // Trade-in Offer Functions (integrated from GetTradeOffer)
  const handleTradeCalculate = () => {
    if (selectedTradeDevice && selectedTradeCondition) {
      const device = DEVICE_OPTIONS.find(d => d.model === selectedTradeDevice);
      const condition = CONDITION_OPTIONS.find(c => c.condition === selectedTradeCondition);
      
      if (device && condition) {
        const value = Math.round(device.baseValue * condition.multiplier);
        const points = Math.round(device.points * condition.multiplier);
        setCalculatedTradeValue(value);
        setCalculatedTradePoints(points);
        setActiveStep(2);
        setShowTradeDetails(true);
      }
    }
  };

  const handleStepClick = (step: number) => {
    if (step === 1) {
      setActiveStep(1);
      setShowTradeDetails(false);
    } else if (step === 2 && calculatedTradeValue) {
      setActiveStep(2);
    } else if (step === 3 && calculatedTradeValue) {
      setActiveStep(3);
    }
  };

  // Calculator Functions (for quick calculator tab)
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

  const handleCalculate = () => {
    calculationMutation.mutate({
      device: selectedDevice,
      condition: selectedCondition,
    });
  };

  return (
    <div className="glass rounded-2xl p-8 border border-slate-600" data-testid="meet-deli-interactive" data-section="meet-deli">
      {/* Unified Header */}
      <div className="text-center mb-8">
        <div className="flex items-center justify-center mb-4">
          <div className="w-16 h-16 bg-gradient-to-r from-emerald-500 to-blue-500 rounded-full flex items-center justify-center mr-4">
            <Bot className="w-8 h-8 text-white" />
          </div>
          <div>
            <h2 className="text-3xl font-bold text-white mb-2">Meet Deli</h2>
            <div className="flex items-center text-emerald-300">
              <div className="w-2 h-2 bg-emerald-400 rounded-full mr-2 animate-pulse"></div>
              Your Interactive Trade Assistant
            </div>
          </div>
        </div>
        <p className="text-gray-300 text-lg max-w-3xl mx-auto">
          Get instant iPhone trade valuation, collect Planet Points, and join the challenge for iPhone 17 upgrade
        </p>
      </div>

      {/* Interactive Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-3 mb-8 bg-slate-700">
          <TabsTrigger 
            value="trade-offer" 
            className="flex items-center gap-2 data-[state=active]:bg-hero-green-500 data-[state=active]:text-black"
            data-testid="tab-trade-offer"
          >
            <Smartphone className="w-4 h-4" />
            Trade-in Offer
          </TabsTrigger>
          <TabsTrigger 
            value="chat" 
            className="flex items-center gap-2 data-[state=active]:bg-emerald-500 data-[state=active]:text-white"
            data-testid="tab-chat"
          >
            <MessageCircle className="w-4 h-4" />
            Chat with Deli
          </TabsTrigger>
          <TabsTrigger 
            value="calculator" 
            className="flex items-center gap-2 data-[state=active]:bg-blue-500 data-[state=active]:text-white"
            data-testid="tab-calculator"
          >
            <Calculator className="w-4 h-4" />
            Quick Calculator
          </TabsTrigger>
        </TabsList>

        {/* Trade-in Offer Tab - Integrated from GetTradeOffer component */}
        <TabsContent value="trade-offer" className="space-y-6">
          {/* Three-Step Interactive Process */}
          <div className="grid md:grid-cols-3 gap-6 mb-8">
            {/* Step 1: Input & Calculate */}
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
                    <Select value={selectedTradeDevice} onValueChange={setSelectedTradeDevice}>
                      <SelectTrigger className={`text-white transition-colors ${
                        selectedTradeDevice 
                          ? 'bg-hero-green-600/20 border-hero-green-400 ring-2 ring-hero-green-400/30' 
                          : 'bg-slate-700 border-hero-green-500/50 hover:border-hero-green-500'
                      }`}>
                        <SelectValue placeholder="Choose iPhone Model" />
                      </SelectTrigger>
                      <SelectContent>
                        {DEVICE_OPTIONS.map((device) => (
                          <SelectItem key={device.model} value={device.model}>
                            <div className="flex justify-between items-center w-full">
                              <span>{device.model}</span>
                              <span className="text-xs text-gray-400 ml-2">AED {device.baseValue}</span>
                            </div>
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    
                    <Select value={selectedTradeCondition} onValueChange={setSelectedTradeCondition}>
                      <SelectTrigger className={`text-white transition-colors ${
                        selectedTradeCondition 
                          ? 'bg-hero-green-600/20 border-hero-green-400 ring-2 ring-hero-green-400/30' 
                          : 'bg-slate-700 border-hero-green-500/50 hover:border-hero-green-500'
                      }`}>
                        <SelectValue placeholder="Device Condition" />
                      </SelectTrigger>
                      <SelectContent>
                        {CONDITION_OPTIONS.map((condition) => (
                          <SelectItem key={condition.condition} value={condition.condition}>
                            <div className="flex justify-between items-center w-full">
                              <span>{condition.label}</span>
                              <span className="text-xs text-amber-400 ml-2">{Math.round(condition.multiplier * 100)}%</span>
                            </div>
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    
                    <Button
                      onClick={handleTradeCalculate}
                      disabled={!selectedTradeDevice || !selectedTradeCondition}
                      className="w-full bg-hero-green-500 hover:bg-hero-green-600 text-black font-bold py-3 rounded-lg transition-all"
                    >
                      <Calculator className="w-5 h-5 mr-2" />
                      CALCULATE VALUE
                    </Button>
                  </div>
                )}
                
                <div className="flex items-center justify-center gap-2 mt-4">
                  <div className={`w-5 h-5 ${activeStep === 1 ? 'text-hero-green-500' : 'text-blue-500'}`}>
                    {activeStep === 1 ? <Target /> : <CheckCircle />}
                  </div>
                  <span className={`font-semibold ${activeStep === 1 ? 'text-hero-green-400' : 'text-blue-400'}`}>
                    {activeStep === 1 ? 'Enter Details' : 'Ready'}
                  </span>
                </div>
              </div>
            </div>

            {/* Step 2: Collect Planet Points */}
            <div 
              className={`glass rounded-2xl p-6 border backdrop-blur-sm relative cursor-pointer transition-all duration-300 ${
                activeStep === 2 
                  ? 'border-hero-green-500/50 bg-gradient-to-br from-hero-green-500/10 to-emerald-500/10 transform scale-105 z-10' 
                  : calculatedTradeValue 
                    ? 'border-amber-500/50 bg-gradient-to-br from-amber-500/10 to-orange-500/10' 
                    : 'border-gray-500/50 bg-gradient-to-br from-gray-500/10 to-slate-500/10'
              }`}
              onClick={() => calculatedTradeValue && handleStepClick(2)}
            >
              <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                <div className={`font-bold px-4 py-1 rounded-full text-sm ${
                  activeStep === 2 
                    ? 'bg-hero-green-500 text-black' 
                    : calculatedTradeValue 
                      ? 'bg-amber-500 text-black'
                      : 'bg-gray-500 text-white'
                }`}>
                  {activeStep === 2 ? 'STEP 2 - ACTIVE' : 'STEP 2'}
                </div>
              </div>
              
              <div className="text-center mt-4">
                <div className={`w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 ${
                  activeStep === 2 
                    ? 'bg-gradient-to-r from-hero-green-500 to-emerald-500' 
                    : calculatedTradeValue 
                      ? 'bg-gradient-to-r from-amber-500 to-orange-500'
                      : 'bg-gradient-to-r from-gray-500 to-slate-500'
                }`}>
                  <Target className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-white mb-3">COLLECT POINTS</h3>
                <p className="text-gray-300 mb-4">Complete eco-missions and level up to meet iPhone 17 shortfall</p>
                
                {calculatedTradeValue && activeStep === 2 && (
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between items-center bg-hero-green-500/20 rounded-lg p-2">
                      <div className="flex items-center">
                        <Droplets className="w-4 h-4 text-blue-400 mr-2" />
                        <span className="text-gray-300">AquaCafe Mission</span>
                      </div>
                      <span className="text-hero-green-400 font-bold">+1,500</span>
                    </div>
                    <div className="flex justify-between items-center bg-hero-green-500/20 rounded-lg p-2">
                      <div className="flex items-center">
                        <Users className="w-4 h-4 text-purple-400 mr-2" />
                        <span className="text-gray-300">Referral Bonus</span>
                      </div>
                      <span className="text-hero-green-400 font-bold">+800</span>
                    </div>
                    <div className="flex justify-between items-center bg-gradient-to-r from-hero-green-500/30 to-amber-500/30 rounded-lg p-2 border border-amber-400/50">
                      <div className="flex items-center">
                        <Star className="w-4 h-4 text-amber-400 mr-2" />
                        <span className="text-gray-200 font-medium">Media Share</span>
                      </div>
                      <span className="text-amber-400 font-black">+1,200</span>
                    </div>
                  </div>
                )}
                
                <div className="flex items-center justify-center gap-2 mt-4">
                  <div className={`w-5 h-5 ${
                    activeStep === 2 
                      ? 'text-hero-green-500' 
                      : calculatedTradeValue 
                        ? 'text-amber-500' 
                        : 'text-gray-500'
                  }`}>
                    {calculatedTradeValue ? <TrendingUp /> : <Clock />}
                  </div>
                  <span className={`font-semibold ${
                    activeStep === 2 
                      ? 'text-hero-green-400' 
                      : calculatedTradeValue 
                        ? 'text-amber-400' 
                        : 'text-gray-400'
                  }`}>
                    {calculatedTradeValue ? 'Keep Growing' : 'Waiting'}
                  </span>
                </div>
              </div>
            </div>

            {/* Step 3: Redeem iPhone 17 */}
            <div 
              className={`glass rounded-2xl p-6 border backdrop-blur-sm relative cursor-pointer transition-all duration-300 ${
                activeStep === 3 
                  ? 'border-purple-500/50 bg-gradient-to-br from-purple-500/10 to-pink-500/10 transform scale-105 z-10' 
                  : calculatedTradeValue 
                    ? 'border-hero-green-500/50 bg-gradient-to-br from-hero-green-500/10 to-blue-500/10' 
                    : 'border-gray-500/50 bg-gradient-to-br from-gray-500/10 to-slate-500/10'
              }`}
              onClick={() => calculatedTradeValue && handleStepClick(3)}
            >
              <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                <div className={`font-bold px-4 py-1 rounded-full text-sm ${
                  activeStep === 3 
                    ? 'bg-purple-500 text-white' 
                    : calculatedTradeValue 
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
                    : calculatedTradeValue 
                      ? 'bg-gradient-to-r from-hero-green-500 to-blue-500'
                      : 'bg-gradient-to-r from-gray-500 to-slate-500'
                }`}>
                  <Gift className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-white mb-3">REDEEM</h3>
                <p className="text-gray-300 mb-4">Use points as store credit to minimize cash for iPhone 17</p>
                
                {calculatedTradeValue && activeStep === 3 && (
                  <div className="space-y-2 text-sm">
                    <div className="bg-purple-500/20 rounded-lg p-3">
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-gray-300">iPhone 17 Pro</span>
                        <span className="text-white font-bold">AED 4,999</span>
                      </div>
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-hero-green-400">Store Credit</span>
                        <span className="text-hero-green-400">-AED {calculatedTradeValue}</span>
                      </div>
                      <div className="border-t border-purple-400/30 pt-2">
                        <div className="flex justify-between items-center">
                          <span className="text-purple-300 font-bold">Cash Needed</span>
                          <span className="text-purple-400 font-black text-lg">AED {4999 - calculatedTradeValue}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
                
                <div className="flex items-center justify-center gap-2 mt-4">
                  <div className={`w-5 h-5 ${
                    activeStep === 3 
                      ? 'text-purple-500' 
                      : calculatedTradeValue 
                        ? 'text-hero-green-500' 
                        : 'text-gray-500'
                  }`}>
                    {calculatedTradeValue ? <ArrowRight /> : <Clock />}
                  </div>
                  <span className={`font-semibold ${
                    activeStep === 3 
                      ? 'text-purple-400' 
                      : calculatedTradeValue 
                        ? 'text-hero-green-400' 
                        : 'text-gray-400'
                  }`}>
                    {calculatedTradeValue ? 'Unlock Rewards' : 'Complete Steps'}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Trade Value Display */}
          {calculatedTradeValue && (
            <div className="text-center mb-6">
              <div className="inline-flex items-center bg-hero-green-900/30 border border-hero-green-500/50 rounded-full px-6 py-3">
                <Trophy className="w-5 h-5 text-hero-green-400 mr-2" />
                <span className="text-hero-green-400 font-bold">Your Trade Value: AED {calculatedTradeValue} + {calculatedTradePoints} Planet Points</span>
              </div>
            </div>
          )}

          {/* Enter the Game Section - Integrated within Meet Deli */}
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
                    handleStepClick(3);
                  }}
                  className="border-2 border-purple-400 text-purple-400 hover:bg-purple-400/10 font-bold px-8 py-6 text-xl rounded-full backdrop-blur-sm transition-all"
                >
                  <Crown className="w-6 h-6 mr-2 inline" />
                  SKIP TO REDEEM
                </button>
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
              onClick={() => sendMessage("What's my iPhone 14 Pro worth?")}
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
                        <SelectValue />
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
                        <SelectValue />
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
                    disabled={calculationMutation.isPending}
                    className="bg-hero-green-500 hover:bg-hero-green-600 text-white px-6 py-3 rounded-lg font-bold transition-colors"
                    data-testid="button-calculate"
                  >
                    {calculationMutation.isPending ? (
                      <>
                        <Rocket className="mr-2 w-5 h-5 animate-spin" />
                        CALCULATING...
                      </>
                    ) : (
                      <>
                        <Calculator className="mr-2 w-5 h-5" />
                        CALCULATE IMPACT
                      </>
                    )}
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
                        <div className="text-white font-bold">{selectedDevice}</div>
                        <div className="text-gray-400 text-sm">{CONDITION_OPTIONS.find(c => c.condition === selectedCondition)?.label || "Excellent Condition"}</div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-bold text-hero-green-500">AED {calculationResult?.tradeValue || 1200}</div>
                      <div className="text-gray-400 text-sm">Trade Value</div>
                    </div>
                  </div>

                  {/* Impact Breakdown */}
                  <div className="grid grid-cols-2 gap-4">
                    <div className="text-center p-4 bg-amber-500/10 rounded-xl border border-amber-500/30">
                      <div className="text-xl font-bold text-amber-500">+{calculationResult?.points || 2400}</div>
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
      </Tabs>

      {/* Live Stats & Value Proposition */}
      <div className="text-center pt-6 px-4 space-y-3">
        <div className="flex items-center justify-center text-xs text-hero-green-400">
          <div className="w-2 h-2 bg-hero-green-400 rounded-full mr-2 animate-pulse"></div>
          Live: 78 devices traded today • 125,000L water saved • 12.3T CO₂ reduced
        </div>
      </div>
    </div>
  );
}