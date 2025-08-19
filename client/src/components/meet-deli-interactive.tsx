import { useState } from "react";
import { Bot, Send, Calendar, ShoppingCart, Smartphone, Calculator, ArrowRight, Leaf, Star, Trophy, Rocket, MessageCircle, Zap } from "lucide-react";
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

  // Calculator State
  const [selectedDevice, setSelectedDevice] = useState(DEVICE_OPTIONS[0].model);
  const [selectedCondition, setSelectedCondition] = useState(CONDITION_OPTIONS[0].condition);
  const [calculationResult, setCalculationResult] = useState<TradeCalculationResult | null>(null);

  // Active interaction mode
  const [activeTab, setActiveTab] = useState("chat");

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

  // Calculator Functions
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
      
    </div>
  );
}