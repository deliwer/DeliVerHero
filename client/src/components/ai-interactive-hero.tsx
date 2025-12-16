import { useState } from "react";
import { Droplets, Smartphone, Globe, MessageCircle, Sparkles, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import heroImage from "@assets/stock_images/people_at_home_drink_21a6f771.jpg";

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
    <section className="relative py-24 sm:py-32 lg:py-40 px-4 overflow-hidden min-h-screen flex items-center">
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
        {/* Simplified dark overlay for text readability */}
        <div className="absolute inset-0 bg-gradient-to-br from-black/40 via-black/50 to-black/40"></div>
      </div>
      {/* Main Content */}
      <div className="max-w-5xl mx-auto relative z-10 text-center">
        {/* Main Headlines */}
        <div className="mb-16 sm:mb-20">
          <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold mb-8 leading-tight">
            <span className="text-white drop-shadow-2xl">Get Paid for Living</span>
          </h1>
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-10 leading-tight">
            <span className="relative inline-block">
              <span className="absolute inset-0 bg-black/70 blur-md rounded-xl px-6 py-3"></span>
              <span className="relative bg-clip-text bg-gradient-to-r from-yellow-200 via-pink-200 to-purple-200 drop-shadow-2xl animate-pulse-slow font-black px-6 py-3 text-[#14b491]" 
                    style={{ 
                      textShadow: '0 0 40px rgba(251, 191, 36, 1), 0 0 60px rgba(236, 72, 153, 0.9), 0 0 80px rgba(168, 85, 247, 0.7)',
                      filter: 'contrast(1.3) brightness(1.4)',
                      WebkitTextStroke: '1px rgba(255, 255, 255, 0.3)'
                    }}>
                Shop Smart: from iPhones to Wellness
              </span>
            </span>
          </h2>
          <p className="text-2xl sm:text-3xl lg:text-4xl text-white font-semibold max-w-4xl mx-auto leading-relaxed drop-shadow-2xl">Many who start here eventually call Dubai home.</p>
        </div>

        {/* Simplified CTA */}
        <div className="max-w-md mx-auto">
          {!showOptions ? (
            <Button
              onClick={() => setShowOptions(true)}
              className="w-full bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-500 hover:to-cyan-500 text-white px-10 py-8 text-xl font-bold rounded-2xl shadow-2xl transform hover:scale-105 transition-all duration-300 border-2 border-white/30"
              data-testid="ai-cta-trigger"
            >
              <Sparkles className="w-6 h-6 mr-3" />
              Save Smarter, Upgrade Sooner!
            </Button>
          ) : (
            <div className="space-y-4 animate-in fade-in slide-in-from-top duration-300">
              {ctaOptions.map((option) => (
                <Button
                  key={option.id}
                  onClick={() => handleOptionClick(option.href)}
                  className={`w-full bg-gradient-to-r ${option.gradient} hover:${option.hoverGradient} text-white px-8 py-6 text-lg font-semibold rounded-xl shadow-lg transform hover:scale-105 transition-all duration-200 border border-white/20`}
                  data-testid={`ai-option-${option.id}`}
                >
                  <span className="text-2xl mr-3">{option.icon}</span>
                  {option.text}
                </Button>
              ))}
            </div>
          )}
          
          {/* Secondary CTA - soft reveal to /relocate */}
          <div className="mt-8">
            <Link href="/relocate">
              <button 
                className="text-white/70 hover:text-white text-sm font-medium flex items-center justify-center mx-auto gap-2 transition-colors duration-200"
                data-testid="link-why-dubai"
              >
                Why People Choose Dubai
                <ArrowRight className="w-4 h-4" />
              </button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}