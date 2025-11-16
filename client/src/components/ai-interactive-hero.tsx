import { useState } from "react";
import { Droplets, Smartphone, Globe, MessageCircle, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import heroImage from "@assets/stock_images/people_drinking_wate_750227b9.jpg";

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
    text: "Shop Smart",
    icon: "💧",
    href: "#step-1",
    gradient: "from-blue-500 to-cyan-500",
    hoverGradient: "from-blue-400 to-cyan-400"
  },
  {
    id: "sell",
    text: "Sell iPhone",
    icon: "📱",
    href: "#step-2",
    gradient: "from-purple-500 to-pink-500",
    hoverGradient: "from-purple-400 to-pink-400"
  },
  {
    id: "play",
    text: "Play & Impact",
    icon: "🎮",
    href: "#step-3",
    gradient: "from-emerald-500 to-green-500", 
    hoverGradient: "from-emerald-400 to-green-400"
  }
];

export function AIInteractiveHero() {
  const [showOptions, setShowOptions] = useState(false);

  const handleOptionClick = (href: string) => {
    const sectionId = href.replace('#', '');
    const section = document.querySelector(`[data-section="${sectionId}"]`);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth', block: 'center' });
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
        {/* Metaverse-inspired gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-purple-900/30 via-blue-900/40 to-cyan-900/50"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-emerald-900/30 via-transparent to-blue-900/20"></div>
        {/* Holographic effect overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-cyan-500/5 to-transparent animate-pulse-slow"></div>
      </div>
      {/* Main Content */}
      <div className="max-w-4xl mx-auto relative z-10 text-center">
        {/* Main Headlines */}
        <div className="mb-8 sm:mb-12">
          <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold mb-6 leading-tight">
            <span className="text-white drop-shadow-2xl">Get Paid for Shopping</span>
          </h1>
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
            <span className="relative inline-block">
              <span className="absolute inset-0 bg-black/70 blur-md rounded-xl px-6 py-3"></span>
              <span className="relative text-transparent bg-clip-text bg-gradient-to-r from-yellow-200 via-pink-200 to-purple-200 drop-shadow-2xl animate-pulse-slow font-black px-6 py-3" 
                    style={{ 
                      textShadow: '0 0 40px rgba(251, 191, 36, 1), 0 0 60px rgba(236, 72, 153, 0.9), 0 0 80px rgba(168, 85, 247, 0.7)',
                      filter: 'contrast(1.3) brightness(1.4)',
                      WebkitTextStroke: '1px rgba(255, 255, 255, 0.3)'
                    }}>
                From iPhones to Wellness
              </span>
            </span>
          </h2>
          <p className="text-2xl sm:text-3xl lg:text-4xl text-white font-semibold max-w-4xl mx-auto leading-relaxed drop-shadow-2xl mb-2">Premium Quality. Below the Market. Planet Impact</p>
          <p className="text-lg sm:text-xl lg:text-2xl text-gray-100 max-w-3xl mx-auto leading-relaxed drop-shadow-lg">Get clean water at home while earning rewards for sustainable choices</p>
        </div>

        {/* AI-Style Interactive CTA Box */}
        <div className="max-w-2xl mx-auto">
          <div className="glass rounded-3xl p-6 sm:p-8 border border-white/20 backdrop-blur-md shadow-2xl bg-gradient-to-br from-white/10 via-white/5 to-white/10">
            {/* Question */}
            <div className="mb-6 sm:mb-8">
              <h3 className="text-2xl sm:text-3xl font-bold text-white mb-2">
                Ready for a Responsible Lifestyle?
              </h3>
              <div className="w-16 h-1 bg-gradient-to-r from-emerald-400 to-blue-400 mx-auto rounded-full"></div>
            </div>

            {/* CTA Buttons */}
            <div className="space-y-4">
              {!showOptions ? (
                <Button
                  onClick={() => setShowOptions(true)}
                  className="w-full bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-500 hover:to-cyan-500 text-white px-8 py-7 text-xl font-bold rounded-2xl shadow-2xl transform hover:scale-105 transition-all duration-300 border-2 border-white/30"
                  data-testid="ai-cta-trigger"
                >
                  <Sparkles className="w-6 h-6 mr-3" />
                  Start Your Journey
                </Button>
              ) : (
                <div className="space-y-3 animate-in fade-in slide-in-from-top duration-300">
                  {ctaOptions.map((option) => (
                    <Button
                      key={option.id}
                      onClick={() => handleOptionClick(option.href)}
                      className={`w-full bg-gradient-to-r ${option.gradient} hover:${option.hoverGradient} text-white px-6 py-6 text-lg font-semibold rounded-xl shadow-lg transform hover:scale-105 transition-all duration-200 border border-white/20`}
                      data-testid={`ai-option-${option.id}`}
                    >
                      <span className="text-2xl mr-3">{option.icon}</span>
                      {option.text}
                    </Button>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      {/* Metaverse Floating Elements for Visual Interest */}
      <div className="absolute top-20 left-10 w-16 h-16 bg-cyan-500/20 rounded-full blur-xl animate-float border border-cyan-400/20"></div>
      <div className="absolute top-32 right-20 w-20 h-20 bg-purple-500/20 rounded-full blur-lg animate-float-delayed border border-purple-400/20"></div>
      <div className="absolute bottom-40 left-20 w-12 h-12 bg-blue-500/20 rounded-full blur-lg animate-pulse-slow border border-blue-400/20"></div>
      <div className="absolute bottom-60 right-10 w-24 h-24 bg-emerald-500/20 rounded-full blur-xl animate-bounce-slow border border-emerald-400/20"></div>
      {/* Additional holographic elements */}
      <div className="absolute top-1/3 left-1/4 w-8 h-8 bg-gradient-to-r from-cyan-400/30 to-blue-400/30 rounded-full animate-pulse"></div>
      <div className="absolute bottom-1/3 right-1/4 w-6 h-6 bg-gradient-to-r from-purple-400/30 to-pink-400/30 rounded-full animate-bounce"></div>
    </section>
  );
}