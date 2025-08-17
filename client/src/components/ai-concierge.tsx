import { useState, useEffect, useRef } from "react";
import { Bot, Send, Calendar, ShoppingCart, TrendingUp, Award } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { openAIService } from "@/lib/openai-service";
import { DEVICE_OPTIONS } from "@/types/hero";
import { EmbeddedCheckout } from "./embedded-checkout";
import { ProgressCelebrationModal, sampleAchievements } from "@/components/progress-celebration-modal";
import { useProgressCelebration } from "@/hooks/use-progress-celebration";
import type { ChatMessage } from "@/types/hero";

export function AIConcierge() {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputMessage, setInputMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showCheckout, setShowCheckout] = useState(false);
  const [tradeValue, setTradeValue] = useState(1200);
  const [selectedDevice, setSelectedDevice] = useState("iPhone 13 Pro");
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  const { 
    isModalOpen, 
    celebrationData, 
    hideCelebration, 
    triggerTradeSuccessCelebration 
  } = useProgressCelebration();

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    // Enhanced AI greeting with location and gamification
    const initialMessage: ChatMessage = {
      id: "initial",
      content: "👋 Welcome from Dubai, future Planet Hero! I'm your 24/7 AI sales assistant. Ready to turn your iPhone into AED 1,200+ premium water delivery? You're currently ranked #23 in Dubai — just one trade to hit Top 10! What iPhone model do you have?",
      isUser: false,
      timestamp: new Date(),
      options: DEVICE_OPTIONS.slice(0, 4).map(d => d.model),
    };
    setMessages([initialMessage]);
  }, []);

  const sendMessage = async (message: string) => {
    if (!message.trim()) return;

    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      content: message,
      isUser: true,
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage("");
    setIsLoading(true);

    try {
      const response = await openAIService.sendMessage(message, {
        phoneModels: DEVICE_OPTIONS.map(d => d.model),
        recentMessages: messages.slice(-3),
      });

      // Enhanced AI responses with gamification and conversion focus
      let enhancedContent = response.response || response.fallback || "I'm here to help with your iPhone trade-in!";
      
      // Add contextual gamification elements and checkout triggers
      if (message.toLowerCase().includes('iphone')) {
        const deviceMatch = DEVICE_OPTIONS.find(d => message.toLowerCase().includes(d.model.toLowerCase()));
        if (deviceMatch) {
          setSelectedDevice(deviceMatch.model);
          setTradeValue(deviceMatch.baseValue);
        }
        enhancedContent += `\n\n🎯 **Live Impact Calculation**: This trade will save 12,500L water and earn you +2,400 Planet Points! You'll jump to #18 on our Dubai leaderboard.`;
        enhancedContent += `\n\n💰 **Your Trade Value**: AED ${tradeValue} + FREE AquaCafe Starter Kit`;
        enhancedContent += "\n\n💎 **Upgrade Available**: Switch to family plan and you'll offset 3x more CO₂ and earn 'Water Guardian' badge!";
      }
      
      if (message.toLowerCase().includes('buy') || message.toLowerCase().includes('order') || message.toLowerCase().includes('checkout')) {
        enhancedContent += "\n\n🚀 Ready to complete your order? I can process this right here - no page redirects needed!";
      }

      const aiMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        content: enhancedContent + `\n\n💰 BONUS: Get Bakers Kitchen AED100 Kangen Water voucher when you refer friends! Join GOAFFPRO as Ambassador to earn AED 4,200+ monthly.`,
        isUser: false,
        timestamp: new Date(),
        options: message.toLowerCase().includes('iphone') ? ['Complete order now', 'Share & earn', 'Join GOAFFPRO', 'Book pickup'] : 
                 (message.toLowerCase().includes('buy') || message.toLowerCase().includes('order')) ? ['Checkout in chat', 'Share deal', 'View impact'] : 
                 (message.toLowerCase().includes('ambassador') || message.toLowerCase().includes('earn')) ? ['GOAFFPRO signup', 'WhatsApp info', 'Watch training'] : 
                 ['Get voucher', 'Share platform', 'Join Ambassadors'],
      };

      setMessages(prev => [...prev, aiMessage]);
    } catch (error) {
      const errorMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        content: "I'm temporarily unavailable, but I'll be back soon to help with your iPhone trade-in! 🤖\n\nWhile I'm offline, you can still check your potential trade value with our device simulator above!",
        isUser: false,
        timestamp: new Date(),
        options: ['Try device simulator', 'Check leaderboard'],
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleQuickOption = (option: string) => {
    if (option === 'Complete order now' || option === 'Checkout in chat') {
      setShowCheckout(true);
      return;
    }
    
    // Handle GOAFFPRO and sharing options
    if (option === 'GOAFFPRO signup' || option === 'Join GOAFFPRO') {
      const affiliateSignupLink = `https://goaffpro.com/signup/deliwer?ref=AI${Math.random().toString(36).substr(2, 6).toUpperCase()}`;
      const shareText = `💰 Join DeliWer GOAFFPRO Ambassador Program! Earn AED 4,200+ monthly promoting sustainable tech trades and Bakers Kitchen vouchers: ${affiliateSignupLink}`;
      
      if (navigator.share) {
        navigator.share({ title: 'Join GOAFFPRO Ambassador Program', text: shareText, url: affiliateSignupLink });
      } else {
        navigator.clipboard.writeText(shareText);
        window.open('/partners?utm_source=ai_concierge&utm_medium=goaffpro&utm_campaign=ambassador_signup', '_blank');
      }
      return;
    }
    
    if (option === 'Share & earn' || option === 'Share deal' || option === 'Share platform') {
      const shareLink = `https://deliwer.com/?ref=SHARE${Math.random().toString(36).substr(2, 4).toUpperCase()}`;
      const shareText = `🚀 Check out DeliWer - World's First Sustainability Game! Trade iPhones for premium water systems + Bakers Kitchen AED100 Kangen Water vouchers: ${shareLink}`;
      
      if (navigator.share) {
        navigator.share({ title: 'DeliWer - Sustainability Game', text: shareText, url: shareLink });
      } else {
        navigator.clipboard.writeText(shareText);
        alert('Link copied! Share with friends to earn Bakers Kitchen vouchers.');
      }
      return;
    }
    
    if (option === 'WhatsApp info') {
      const whatsappLink = `https://wa.me/971523946311?text=Hi! I'm interested in the GOAFFPRO Ambassador Program. Can you share details about earning AED 4,200+ monthly and the Bakers Kitchen partnership?`;
      window.open(whatsappLink, '_blank');
      return;
    }
    
    if (option === 'Get voucher') {
      const voucherLink = `https://deliwer.com/aquacafe?voucher=true&ref=AI${Math.random().toString(36).substr(2, 4).toUpperCase()}`;
      const shareText = `🎁 Get FREE Bakers Kitchen AED100 Kangen Water voucher! Planet Hero Starter Kit: ${voucherLink}`;
      
      if (navigator.share) {
        navigator.share({ title: 'Free Bakers Kitchen Voucher', text: shareText, url: voucherLink });
      } else {
        window.open('/aquacafe', '_blank');
      }
      return;
    }
    
    sendMessage(option);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage(inputMessage);
    }
  };

  return (
    <section className="py-16 px-4 bg-slate-900/50" id="trade">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-white mb-4">
            <Bot className="inline w-8 h-8 text-dubai-blue-500 mr-3" />
            AI HERO CONCIERGE
          </h2>
          <p className="text-gray-300 text-lg">Get instant trade-in valuation and start your hero journey</p>
        </div>

        <div className="glass rounded-2xl border border-slate-600 overflow-hidden" data-testid="ai-concierge">
          {/* Chat Header with Live Stats */}
          <div className="bg-gradient-to-r from-dubai-blue-600 to-dubai-blue-500 p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center">
                  <Bot className="w-6 h-6 text-dubai-blue-600" />
                </div>
                <div>
                  <p className="text-white font-semibold">DeliWer AI Hero Concierge</p>
                  <div className="flex items-center text-green-300 text-sm">
                    <div className="w-2 h-2 bg-green-400 rounded-full mr-2 animate-pulse"></div>
                    Online & Ready to Close Sales
                  </div>
                </div>
              </div>
              <div className="text-right">
                <div className="flex items-center text-amber-300 text-xs">
                  <TrendingUp className="w-3 h-3 mr-1" />
                  You're #23 in Dubai
                </div>
                <div className="flex items-center text-hero-green-300 text-xs">
                  <Award className="w-3 h-3 mr-1" />
                  1 trade to Top 10
                </div>
              </div>
            </div>
          </div>

          {/* Show checkout or chat messages */}
          {showCheckout ? (
            <div className="p-6">
              <EmbeddedCheckout 
                tradeValue={tradeValue}
                deviceModel={selectedDevice}
                onClose={() => setShowCheckout(false)}
              />
            </div>
          ) : (
            /* Chat Messages */
            <div className="p-6 h-96 overflow-y-auto space-y-4" data-testid="chat-messages">
            {messages.map((message) => (
              <div key={message.id} className={`flex ${message.isUser ? 'justify-end' : 'items-start space-x-3'}`}>
                {!message.isUser && (
                  <div className="w-8 h-8 bg-dubai-blue-500 rounded-full flex items-center justify-center flex-shrink-0">
                    <Bot className="w-4 h-4 text-white" />
                  </div>
                )}
                
                <div className={`rounded-lg p-3 max-w-md ${
                  message.isUser 
                    ? 'bg-dubai-blue-600 text-white ml-auto' 
                    : 'bg-slate-700 text-white'
                }`}>
                  <p>{message.content}</p>
                  
                  {message.options && !message.isUser && (
                    <div className="flex flex-wrap gap-2 mt-3">
                      {message.options.map((option, index) => (
                        <Button
                          key={index}
                          onClick={() => handleQuickOption(option)}
                          variant="secondary"
                          size="sm"
                          className="bg-dubai-blue-600 hover:bg-dubai-blue-700 text-white text-xs"
                          data-testid={`button-option-${index}`}
                        >
                          {option}
                        </Button>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            ))}
            
            {isLoading && (
              <div className="flex items-start space-x-3">
                <div className="w-8 h-8 bg-dubai-blue-500 rounded-full flex items-center justify-center">
                  <Bot className="w-4 h-4 text-white" />
                </div>
                <div className="bg-slate-700 rounded-lg p-3">
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-pulse"></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-pulse" style={{animationDelay: '0.1s'}}></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-pulse" style={{animationDelay: '0.2s'}}></div>
                  </div>
                </div>
              </div>
            )}
            
              <div ref={messagesEndRef} />
            </div>
          )}

          {/* Chat Input - Only show if not in checkout */}
          {!showCheckout && (
            <div className="border-t border-slate-600 p-6 bg-gradient-to-r from-slate-800/50 to-slate-700/50">
              {/* Enhanced Input Section */}
              <div className="mb-4">
                <div className="text-center mb-3">
                  <p className="text-lg font-bold text-white mb-1">💬 Chat with Your AI Trade Assistant</p>
                  <p className="text-sm text-gray-300">Ask about iPhone models, trade values, or start your order!</p>
                </div>
                
                <div className="flex space-x-3">
                  <div className="flex-1 relative">
                    <Input
                      type="text"
                      placeholder="👋 Hi! What iPhone model do you want to trade?"
                      value={inputMessage}
                      onChange={(e) => setInputMessage(e.target.value)}
                      onKeyDown={handleKeyPress}
                      className="h-14 px-6 text-lg bg-white/95 text-slate-900 border-2 border-emerald-400/50 focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/20 rounded-xl shadow-xl placeholder:text-slate-500 transition-all duration-300"
                      disabled={isLoading}
                      data-testid="input-chat-message"
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
                    className="h-14 bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 text-white px-8 rounded-xl shadow-xl font-bold text-lg transition-all duration-300 transform hover:scale-105"
                    data-testid="button-send-message"
                  >
                    <Send className="w-5 h-5" />
                  </Button>
                </div>
              </div>
            <div className="mt-2 space-y-1">
              <p className="text-xs text-gray-500">💡 Pro tip: Mention your phone's condition for more accurate valuation!</p>
              <div className="flex items-center text-xs text-hero-green-400">
                <div className="w-2 h-2 bg-hero-green-400 rounded-full mr-2 animate-pulse"></div>
                As of today: 78 devices repurposed • 125,000L water saved • 12.3T CO₂ reduced
              </div>
            </div>
            
            {/* Quick Action Buttons */}
            <div className="flex flex-wrap gap-2 mt-3">
              <Button
                onClick={() => handleQuickOption("Book pickup for my iPhone")}
                variant="outline"
                size="sm"
                className="bg-hero-green-500 hover:bg-hero-green-600 text-white border-hero-green-500"
                data-testid="button-book-pickup"
              >
                <Calendar className="w-4 h-4 mr-2" />
                Book Pickup
              </Button>
              <Button
                onClick={() => handleQuickOption("Order AquaCafe Starter Kit")}
                variant="outline"
                size="sm"
                className="bg-amber-500 hover:bg-amber-600 text-black border-amber-500"
                data-testid="button-order-aquacafe"
              >
                <ShoppingCart className="w-4 h-4 mr-2" />
                Order AquaCafe Kit
              </Button>
              <Button
                onClick={() => triggerTradeSuccessCelebration(1500, "iPhone 14 Pro")}
                variant="outline"
                size="sm"
                className="bg-purple-500 hover:bg-purple-600 text-white border-purple-500"
                data-testid="button-demo-celebration"
              >
                <Award className="w-4 h-4 mr-2" />
                Demo Achievement
              </Button>
            </div>
            </div>
          )}
        </div>
      </div>
      
      {/* Progress Celebration Modal */}
      {celebrationData && (
        <ProgressCelebrationModal
          isOpen={isModalOpen}
          onClose={hideCelebration}
          achievements={celebrationData.achievements}
          progressChange={celebrationData.progressChange}
          impactStats={celebrationData.impactStats}
        />
      )}
    </section>
  );
}
