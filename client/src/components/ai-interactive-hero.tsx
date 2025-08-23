import { useState } from "react";
import { Droplets, Smartphone, Globe, MessageCircle, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import heroImage from "@assets/mobile-water-purification-hero_1755786909344.jpg";

interface CTAOption {
  id: string;
  text: string;
  icon: string;
  href: string;
  gradient: string;
  hoverGradient: string;
}

const ctaOptions: CTAOption[] = [
  {
    id: "water",
    text: "I want clean water at home",
    icon: "💧",
    href: "/shop",
    gradient: "from-blue-500 to-cyan-500",
    hoverGradient: "from-blue-400 to-cyan-400"
  },
  {
    id: "trade",
    text: "I want to trade in my iPhone",
    icon: "📱",
    href: "/#meet-deli", 
    gradient: "from-amber-500 to-orange-500",
    hoverGradient: "from-amber-400 to-orange-400"
  },
  {
    id: "leaderboard",
    text: "I want to join the eco leaderboard",
    icon: "🌍",
    href: "/#meet-deli",
    gradient: "from-emerald-500 to-green-500", 
    hoverGradient: "from-emerald-400 to-green-400"
  }
];

export function AIInteractiveHero() {
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [showButtons, setShowButtons] = useState(false);

  const handleCTAClick = () => {
    if (!showButtons) {
      setShowButtons(true);
    }
  };

  return (
    <section className="relative py-16 sm:py-20 lg:py-24 px-4 overflow-hidden min-h-screen flex items-center">
      {/* Full-width Hero Background Image */}
      <div 
        className="absolute inset-0 w-full h-full"
        style={{
          backgroundImage: `url(${heroImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center center',
          backgroundRepeat: 'no-repeat',
          backgroundAttachment: 'fixed',
        }}
      >
        {/* Eco-inspired gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-black/40 via-black/50 to-emerald-900/60"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-emerald-900/20 via-transparent to-transparent"></div>
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto relative z-10 text-center">
        {/* Main Headlines */}
        <div className="mb-8 sm:mb-12">
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-4 sm:mb-6 leading-tight">
            <span className="text-white drop-shadow-2xl">From iPhones to Water,</span><br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-green-400 to-teal-400 drop-shadow-lg">
              a Circular Exchange
            </span>
          </h1>
          <p className="text-xl sm:text-2xl lg:text-3xl text-gray-100 max-w-3xl mx-auto leading-relaxed drop-shadow-lg">
            Trade iPhones for premium water purifiers, earn Planet Points, and redeem in the Shop all.
          </p>
        </div>

        {/* AI-Style Interactive CTA Box */}
        <div className="max-w-2xl mx-auto">
          <div className="glass rounded-3xl p-6 sm:p-8 border border-white/20 backdrop-blur-md shadow-2xl bg-gradient-to-br from-white/10 via-white/5 to-white/10">
            {/* AI Chat Bubble Header */}
            <div className="flex items-center justify-center mb-6">
              <div className="flex items-center space-x-3 bg-gradient-to-r from-emerald-500/20 to-blue-500/20 rounded-full px-4 py-2 border border-emerald-400/30">
                <MessageCircle className="w-5 h-5 text-emerald-400" />
                <Sparkles className="w-4 h-4 text-blue-400 animate-pulse" />
                <span className="text-white font-medium">AI Assistant</span>
              </div>
            </div>

            {/* Question */}
            <div className="mb-6 sm:mb-8">
              <h3 className="text-2xl sm:text-3xl font-bold text-white mb-2">
                What brings you to DeliWer today?
              </h3>
              <div className="w-16 h-1 bg-gradient-to-r from-emerald-400 to-blue-400 mx-auto rounded-full"></div>
            </div>

            {/* CTA Buttons */}
            <div className="space-y-4">
              {!showButtons ? (
                <Button
                  onClick={handleCTAClick}
                  className="w-full bg-gradient-to-r from-emerald-500 to-blue-500 hover:from-emerald-400 hover:to-blue-400 text-white px-8 py-6 text-lg font-bold rounded-2xl shadow-xl transform hover:scale-105 transition-all duration-300 border-2 border-white/20"
                  data-testid="ai-cta-trigger"
                >
                  <MessageCircle className="w-5 h-5 mr-2" />
                  Tell me what you need
                </Button>
              ) : (
                <div className="space-y-3 animate-in slide-in-from-top duration-500">
                  {ctaOptions.map((option) => (
                    <Link key={option.id} href={option.href}>
                      <Button
                        className={`w-full bg-gradient-to-r ${option.gradient} hover:${option.hoverGradient} text-white px-6 py-5 text-base sm:text-lg font-bold rounded-2xl shadow-lg transform hover:scale-105 transition-all duration-300 border border-white/20 group`}
                        onMouseEnter={() => setSelectedOption(option.id)}
                        onMouseLeave={() => setSelectedOption(null)}
                        data-testid={`ai-cta-${option.id}`}
                      >
                        <div className="flex items-center justify-center space-x-3">
                          <span className="text-2xl group-hover:scale-110 transition-transform duration-200">
                            {option.icon}
                          </span>
                          <span className="flex-1 text-left">
                            {option.text}
                          </span>
                          <div className={`transition-transform duration-200 ${
                            selectedOption === option.id ? 'translate-x-1' : ''
                          }`}>
                            →
                          </div>
                        </div>
                      </Button>
                    </Link>
                  ))}
                  
                  {/* Reset Button */}
                  <Button
                    onClick={() => setShowButtons(false)}
                    variant="ghost"
                    className="w-full text-white/70 hover:text-white hover:bg-white/10 px-4 py-2 text-sm font-medium rounded-xl transition-all duration-200"
                    data-testid="ai-cta-reset"
                  >
                    ← Ask me something else
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Floating Elements for Visual Interest */}
      <div className="absolute top-20 left-10 w-16 h-16 bg-emerald-500/10 rounded-full blur-xl animate-float"></div>
      <div className="absolute top-32 right-20 w-20 h-20 bg-blue-500/10 rounded-full blur-lg animate-float-delayed"></div>
      <div className="absolute bottom-40 left-20 w-12 h-12 bg-amber-500/10 rounded-full blur-lg animate-pulse-slow"></div>
      <div className="absolute bottom-60 right-10 w-24 h-24 bg-cyan-500/10 rounded-full blur-xl animate-bounce-slow"></div>
    </section>
  );
}