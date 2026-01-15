import { useState } from "react";
import { Bot, Send, Calendar, Smartphone, Calculator, ArrowRight, Leaf, Star, Trophy, Rocket, MessageCircle, Zap, Target, Gift, CheckCircle, Clock, TrendingUp, Gamepad2, Crown, MapPin, Key, Home, Sparkles, Thermometer, Truck, Loader2, Users, Droplets } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useMutation } from "@tanstack/react-query";
import { apiRequest, queryClient } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { shopifyCartService } from "@/lib/shopify-cart";
import { Badge } from "@/components/ui/badge";

// Move-In Calculator Constants
const MOVE_IN_STEPS = [
  { id: "find", label: "Find a place", icon: MapPin, description: "Searching for the right property in JVC" },
  { id: "handover", label: "Handover", icon: Key, description: "Keys received, waiting for setup" },
  { id: "settled", label: "Settled", icon: Home, description: "Already moved in, need ongoing support" }
];

const REQUIREMENTS_OPTIONS = [
  { id: "cleaning", label: "Deep Cleaning", icon: Sparkles },
  { id: "utilities", label: "DEWA/Chiller Setup", icon: Zap },
  { id: "water", label: "Drinking Water", icon: Droplets },
  { id: "maintenance", label: "AC Maintenance", icon: Thermometer },
  { id: "relocation", label: "Relocation Help", icon: Truck }
];

export function MeetDeliInteractive() {
  const { toast } = useToast();
  
  // AI Chat State
  const [inputMessage, setInputMessage] = useState("");
  const [isAILoading, setIsAILoading] = useState(false);
  const [aiResponse, setAiResponse] = useState<string>("");

  // Calculator State
  const [activeTab, setActiveTab] = useState("calculator");
  const [currentStep, setCurrentStep] = useState("find");
  const [selectedRequirements, setSelectedRequirements] = useState<string[]>([]);

  // AI Chat Functions
  const sendMessage = async (message: string) => {
    if (!message.trim()) return;

    setInputMessage("");
    setIsAILoading(true);

    try {
      const response = await apiRequest("POST", "/api/chat", {
        message: message,
        context: "Deli Interactive Move-In Assistant"
      });
      const data = await response.json();
      setAiResponse(data.reply);
    } catch (error) {
      setAiResponse("I'm temporarily unavailable, but I'll be back soon to help with your JVC move-in! 🤖");
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

  const toggleRequirement = (id: string) => {
    setSelectedRequirements(prev => 
      prev.includes(id) ? prev.filter(r => r !== id) : [...prev, id]
    );
  };

  const handleCalculateMoveIn = () => {
    if (selectedRequirements.length === 0) {
      toast({
        title: "Selection Required",
        description: "Please select at least one requirement to calculate.",
        variant: "destructive"
      });
      return;
    }
    
    toast({
      title: "Calculation Complete",
      description: "Deli has prepared your move-in plan. Check the summary below.",
    });
  };

  return (
    <section id="meet-deli" className="relative py-12 sm:py-20 px-4 bg-gradient-to-br from-hero-green-900/20 via-slate-800 to-dubai-blue-900/20 overflow-hidden rounded-3xl">
      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Meet Deli Header */}
        <div className="text-center mb-12" data-testid="meet-deli-interactive" data-section="meet-deli">
          <div className="inline-flex items-center bg-gradient-to-r from-hero-green-500/30 to-dubai-blue-500/30 border border-hero-green-400/50 rounded-full px-6 py-2 shadow-lg backdrop-blur-sm mb-6">
            <div className="w-2 h-2 bg-hero-green-400 rounded-full mr-2 animate-pulse"></div>
            <span className="text-hero-green-200 font-bold text-sm tracking-wide uppercase">Start Your Move-In Journey</span>
          </div>
          <div className="flex items-center justify-center mb-4">
            <div className="w-16 h-16 bg-gradient-to-r from-hero-green-500 to-dubai-blue-500 rounded-full flex items-center justify-center mr-4 shadow-xl">
              <Bot className="w-8 h-8 text-white" />
            </div>
            <div className="text-left">
              <h3 className="text-3xl font-black text-white mb-1 uppercase tracking-tighter">Meet Deli</h3>
              <div className="flex items-center text-emerald-300 font-bold italic">
                <div className="w-2 h-2 bg-emerald-400 rounded-full mr-2 animate-pulse"></div>
                Your Interactive Move-In Coordinator
              </div>
            </div>
          </div>
          <p className="text-gray-300 text-lg max-w-2xl mx-auto">
            Tell Deli what you need for your JVC home. We'll calculate the impact and coordination required for a stress-free move.
          </p>
        </div>

        {/* Interactive Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-12 bg-white/5 backdrop-blur-xl border border-white/10 p-1 rounded-2xl h-16">
            <TabsTrigger 
              value="calculator" 
              className="flex items-center gap-2 rounded-xl text-lg font-bold data-[state=active]:bg-hero-green-500 data-[state=active]:text-black transition-all"
              data-testid="tab-calculator"
            >
              <Calculator className="w-5 h-5" />
              Move-In Calculator
            </TabsTrigger>
            <TabsTrigger 
              value="chat" 
              className="flex items-center gap-2 rounded-xl text-lg font-bold data-[state=active]:bg-dubai-blue-500 data-[state=active]:text-white transition-all"
              data-testid="tab-chat"
            >
              <MessageCircle className="w-5 h-5" />
              Chat with Deli
            </TabsTrigger>
          </TabsList>

          {/* Calculator Tab */}
          <TabsContent value="calculator" className="space-y-12">
            <div className="grid lg:grid-cols-2 gap-12">
              {/* Requirements Selection Side */}
              <div className="space-y-10">
                {/* Step 1: Current Status */}
                <div>
                  <h4 className="text-white font-black text-xl mb-6 flex items-center gap-2 uppercase tracking-tight">
                    <span className="bg-hero-green-500 text-black w-6 h-6 flex items-center justify-center rounded-md text-xs">1</span>
                    Where are you now?
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    {MOVE_IN_STEPS.map((step) => (
                      <button
                        key={step.id}
                        onClick={() => setCurrentStep(step.id)}
                        className={`flex flex-col items-center p-6 rounded-2xl border transition-all ${
                          currentStep === step.id 
                            ? 'bg-hero-green-500/20 border-hero-green-500 shadow-[0_0_20px_rgba(34,197,94,0.2)]' 
                            : 'bg-white/5 border-white/10 hover:border-white/20'
                        }`}
                      >
                        <step.icon className={`w-8 h-8 mb-3 ${currentStep === step.id ? 'text-hero-green-400' : 'text-gray-400'}`} />
                        <span className={`text-sm font-bold ${currentStep === step.id ? 'text-white' : 'text-gray-400'}`}>{step.label}</span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Step 2: Select Requirements */}
                <div>
                  <h4 className="text-white font-black text-xl mb-6 flex items-center gap-2 uppercase tracking-tight">
                    <span className="bg-hero-green-500 text-black w-6 h-6 flex items-center justify-center rounded-md text-xs">2</span>
                    What do you need?
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {REQUIREMENTS_OPTIONS.map((req) => (
                      <button
                        key={req.id}
                        onClick={() => toggleRequirement(req.id)}
                        className={`flex items-center gap-4 p-5 rounded-2xl border transition-all text-left ${
                          selectedRequirements.includes(req.id)
                            ? 'bg-hero-green-500/20 border-hero-green-500'
                            : 'bg-white/5 border-white/10 hover:border-white/20'
                        }`}
                      >
                        <div className={`p-3 rounded-xl ${selectedRequirements.includes(req.id) ? 'bg-hero-green-500 text-black' : 'bg-white/5 text-gray-400'}`}>
                          <req.icon className="w-5 h-5" />
                        </div>
                        <span className={`font-bold ${selectedRequirements.includes(req.id) ? 'text-white' : 'text-gray-400'}`}>{req.label}</span>
                      </button>
                    ))}
                  </div>
                </div>

                <Button
                  onClick={handleCalculateMoveIn}
                  className="w-full h-16 bg-hero-green-500 hover:bg-hero-green-600 text-black font-black text-lg rounded-2xl shadow-xl transition-all hover:scale-[1.02] active:scale-[0.98]"
                >
                  <Calculator className="mr-3 w-6 h-6" />
                  CALCULATE MOVE-IN PLAN
                </Button>
              </div>

              {/* Summary Side */}
              <div className="lg:sticky lg:top-24 h-fit">
                <div className="bg-white/5 backdrop-blur-xl rounded-3xl p-8 border border-white/10 shadow-2xl space-y-8">
                  <div className="flex items-center justify-between border-b border-white/5 pb-6">
                    <div>
                      <h4 className="text-white font-black text-2xl uppercase tracking-tighter">Coordination Plan</h4>
                      <p className="text-gray-400 text-sm italic">Estimated based on JVC standards</p>
                    </div>
                    <Badge className="bg-emerald-500/20 text-emerald-400 border-emerald-500/30 px-3 py-1">Ready to Deploy</Badge>
                  </div>

                  <div className="space-y-6">
                    <div className="flex items-center justify-between p-4 bg-white/5 rounded-2xl border border-white/5">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-hero-green-500 rounded-xl flex items-center justify-center">
                          <Users className="w-6 h-6 text-black" />
                        </div>
                        <div>
                          <p className="text-white font-bold">Coordination Time</p>
                          <p className="text-gray-400 text-xs uppercase tracking-widest font-bold">12-24 Hours</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-emerald-400 font-black text-xl">IMMEDIATE</p>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <h5 className="text-white font-bold text-sm uppercase tracking-widest flex items-center gap-2">
                        <CheckCircle className="w-4 h-4 text-emerald-400" />
                        Selected Services
                      </h5>
                      <div className="flex flex-wrap gap-2">
                        {selectedRequirements.length > 0 ? selectedRequirements.map(id => (
                          <Badge key={id} variant="outline" className="bg-white/5 border-white/10 text-gray-300 py-2 px-4 rounded-full">
                            {REQUIREMENTS_OPTIONS.find(r => r.id === id)?.label}
                          </Badge>
                        )) : (
                          <p className="text-gray-500 italic text-sm">No services selected yet...</p>
                        )}
                      </div>
                    </div>

                    <div className="p-6 bg-gradient-to-br from-emerald-500/10 to-blue-500/10 rounded-2xl border border-emerald-500/20">
                      <div className="flex items-center gap-3 mb-3">
                        <Bot className="w-5 h-5 text-emerald-400" />
                        <span className="text-white font-bold">Deli's Recommendation</span>
                      </div>
                      <p className="text-gray-300 text-sm leading-relaxed">
                        Based on JVC's water hardness, we strongly recommend adding <span className="text-emerald-400 font-bold">Drinking Water Filtration</span> to your plan to save <span className="text-white font-bold">AED 150/month</span> on plastic bottles.
                      </p>
                    </div>
                  </div>

                  <Button 
                    className="w-full h-14 bg-white text-black font-black uppercase tracking-widest hover:bg-gray-200 transition-all rounded-xl"
                    onClick={() => window.open('https://wa.me/yourwhatsappnumber', '_blank')}
                  >
                    Confirm with Coordinator
                  </Button>
                </div>
              </div>
            </div>
          </TabsContent>

          {/* AI Chat Tab */}
          <TabsContent value="chat" className="space-y-6">
            <div className="max-w-4xl mx-auto space-y-6">
              {/* AI Response Display */}
              {aiResponse && (
                <div className="p-6 bg-white/5 backdrop-blur-md border border-emerald-500/20 rounded-2xl animate-in fade-in slide-in-from-bottom-4">
                  <div className="flex items-start space-x-4">
                    <div className="w-10 h-10 bg-emerald-500 rounded-xl flex items-center justify-center flex-shrink-0 shadow-lg shadow-emerald-500/20">
                      <Bot className="w-6 h-6 text-black" />
                    </div>
                    <div className="flex-1">
                      <p className="text-emerald-400 font-black uppercase tracking-widest text-xs mb-2">Deli says</p>
                      <p className="text-gray-200 text-lg leading-relaxed">{aiResponse}</p>
                    </div>
                  </div>
                </div>
              )}

              {/* Chat Input */}
              <div className="relative group">
                <div className="absolute inset-0 bg-emerald-500/20 blur-2xl rounded-full scale-90 opacity-0 group-focus-within:opacity-100 transition-opacity"></div>
                <div className="relative flex gap-3">
                  <Input
                    type="text"
                    placeholder="👋 Hi Deli! I'm moving to JVC next week. What do I need?"
                    value={inputMessage}
                    onChange={(e) => setInputMessage(e.target.value)}
                    onKeyDown={handleKeyPress}
                    className="h-16 px-6 text-lg bg-white border-0 text-slate-900 rounded-2xl shadow-2xl placeholder:text-slate-400"
                    disabled={isAILoading}
                    data-testid="input-deli-message"
                  />
                  <Button
                    onClick={() => sendMessage(inputMessage)}
                    disabled={isAILoading || !inputMessage.trim()}
                    className="h-16 w-16 bg-emerald-500 hover:bg-emerald-600 text-black rounded-2xl shadow-xl transition-all hover:scale-105 active:scale-95"
                    data-testid="button-send-deli-message"
                  >
                    {isAILoading ? (
                      <Loader2 className="w-6 h-6 animate-spin" />
                    ) : (
                      <Send className="w-6 h-6" />
                    )}
                  </Button>
                </div>
              </div>

              {/* Quick Action Buttons */}
              <div className="flex flex-wrap gap-3 justify-center">
                {[
                  "What are JVC move-in requirements?",
                  "Help me find a place in JVC",
                  "I need deep cleaning services",
                  "How do I set up DEWA?"
                ].map((text) => (
                  <Button
                    key={text}
                    onClick={() => sendMessage(text)}
                    variant="outline"
                    className="bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white border-white/10 rounded-full px-6 transition-all"
                  >
                    {text}
                  </Button>
                ))}
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </section>
  );
}
