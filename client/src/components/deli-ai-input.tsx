import { useState } from "react";
import { Bot, Send, Calendar, ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { openAIService } from "@/lib/openai-service";
import { DEVICE_OPTIONS } from "@/types/hero";

export function DeliAIInput() {
  const [inputMessage, setInputMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [lastResponse, setLastResponse] = useState<string>("");

  const sendMessage = async (message: string) => {
    if (!message.trim()) return;

    setInputMessage("");
    setIsLoading(true);

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
      
      setLastResponse(enhancedContent);
    } catch (error) {
      setLastResponse("I'm temporarily unavailable, but I'll be back soon to help with your iPhone trade-in! 🤖");
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage(inputMessage);
    }
  };

  const handleQuickAction = (action: string) => {
    sendMessage(action);
  };

  return (
    <div className="w-full max-w-2xl mx-auto">
      {/* Deli AI Header */}
      <div className="text-center mb-6">
        <div className="flex items-center justify-center mb-3">
          <div className="w-12 h-12 bg-gradient-to-r from-emerald-500 to-blue-500 rounded-full flex items-center justify-center mr-3">
            <Bot className="w-7 h-7 text-white" />
          </div>
          <div>
            <h3 className="text-2xl font-bold text-white">Meet Deli</h3>
            <div className="flex items-center text-emerald-300 text-sm">
              <div className="w-2 h-2 bg-emerald-400 rounded-full mr-2 animate-pulse"></div>
              Your AI-First Trade Assistant
            </div>
          </div>
        </div>
        <p className="text-gray-300 text-lg">Ask about iPhone models, trade values, or start your order instantly!</p>
      </div>

      {/* AI Response Display */}
      {lastResponse && (
        <div className="mb-6 p-4 bg-gradient-to-r from-emerald-500/10 to-blue-500/10 border border-emerald-500/30 rounded-xl">
          <div className="flex items-start space-x-3">
            <div className="w-8 h-8 bg-emerald-500 rounded-full flex items-center justify-center flex-shrink-0">
              <Bot className="w-4 h-4 text-white" />
            </div>
            <div className="flex-1">
              <p className="text-white font-medium">Deli says:</p>
              <p className="text-gray-300 mt-1">{lastResponse}</p>
            </div>
          </div>
        </div>
      )}

      {/* Input Field */}
      <div className="mb-4">
        <div className="flex space-x-3">
          <div className="flex-1 relative">
            <Input
              type="text"
              placeholder="👋 Hi Deli! What iPhone model do you want to trade?"
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              onKeyDown={handleKeyPress}
              className="h-16 px-6 text-lg bg-white/95 text-slate-900 border-2 border-emerald-400/50 focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/20 rounded-xl shadow-xl placeholder:text-slate-500 transition-all duration-300"
              disabled={isLoading}
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
            disabled={isLoading || !inputMessage.trim()}
            className="h-16 bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 text-white px-8 rounded-xl shadow-xl font-bold text-lg transition-all duration-300 transform hover:scale-105"
            data-testid="button-send-deli-message"
          >
            {isLoading ? (
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
      </div>

      {/* Quick Action Buttons */}
      <div className="flex flex-wrap gap-3 justify-center">
        <Button
          onClick={() => handleQuickAction("What's my iPhone 14 Pro worth?")}
          variant="outline"
          size="sm"
          className="bg-emerald-500/20 hover:bg-emerald-500 text-emerald-300 hover:text-white border-emerald-500/50 hover:border-emerald-500 transition-all"
          data-testid="button-quick-valuation"
        >
          Quick Valuation
        </Button>
        <Button
          onClick={() => handleQuickAction("Book pickup for my iPhone")}
          variant="outline"
          size="sm"
          className="bg-blue-500/20 hover:bg-blue-500 text-blue-300 hover:text-white border-blue-500/50 hover:border-blue-500 transition-all"
          data-testid="button-book-pickup"
        >
          <Calendar className="w-4 h-4 mr-2" />
          Book Pickup
        </Button>
        <Button
          onClick={() => handleQuickAction("Order AquaCafe Starter Kit")}
          variant="outline"
          size="sm"
          className="bg-amber-500/20 hover:bg-amber-500 text-amber-300 hover:text-white border-amber-500/50 hover:border-amber-500 transition-all"
          data-testid="button-order-aquacafe"
        >
          <ShoppingCart className="w-4 h-4 mr-2" />
          Order AquaCafe
        </Button>
      </div>

      {/* Live Stats Footer */}
      <div className="mt-4 text-center">
        <div className="flex items-center justify-center text-xs text-hero-green-400">
          <div className="w-2 h-2 bg-hero-green-400 rounded-full mr-2 animate-pulse"></div>
          Live: 78 devices traded today • 125,000L water saved • 12.3T CO₂ reduced
        </div>
      </div>
    </div>
  );
}