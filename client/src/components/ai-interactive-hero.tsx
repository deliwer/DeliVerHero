import { useState } from "react";
import { Sparkles, ArrowRight, Play, Globe } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import heroImage from "@assets/stock_images/people_at_home_drink_21a6f771.jpg";

export function AIInteractiveHero() {
  const handlePlayClick = () => {
    const section = document.querySelector(`[data-section="step-1"]`);
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
        <div className="absolute inset-0 bg-gradient-to-br from-black/50 via-black/60 to-black/50"></div>
      </div>
      {/* Main Content */}
      <div className="max-w-5xl mx-auto relative z-10 text-center">
        {/* Trust Badge */}
        <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2 mb-8">
          <Globe className="w-4 h-4 text-emerald-400" />
          <span className="text-sm text-white/90">Trusted by visitors, founders, and families from 200+ nationalities in Dubai</span>
        </div>

        {/* Main Headlines - Refined per prompt */}
        <div className="mb-16 sm:mb-20">
          <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold mb-6 leading-tight">
            <span className="text-white drop-shadow-2xl">Shop smart.</span>
          </h1>
          <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
            <span className="text-white drop-shadow-2xl">Live sustainably.</span>
          </h2>
          <h3 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-10 leading-tight">
            <span className="relative inline-block">
              <span className="absolute inset-0 bg-black/70 blur-md rounded-xl px-6 py-3"></span>
              <span className="relative bg-clip-text bg-gradient-to-r from-emerald-300 via-teal-200 to-cyan-300 drop-shadow-2xl font-black px-6 py-3 text-[#14b491]" 
                    style={{ 
                      textShadow: '0 0 40px rgba(16, 185, 129, 1), 0 0 60px rgba(20, 184, 166, 0.9), 0 0 80px rgba(6, 182, 212, 0.7)',
                      filter: 'contrast(1.3) brightness(1.4)',
                      WebkitTextStroke: '1px rgba(255, 255, 255, 0.3)'
                    }}>Renew. Reuse.</span>
            </span>
          </h3>
          <p className="text-xl sm:text-2xl lg:text-3xl text-white/90 font-medium max-w-4xl mx-auto leading-relaxed drop-shadow-2xl">
            Many who start here eventually call Dubai home.
          </p>
        </div>

        {/* CTAs - Primary "Get Home Service" + Secondary actions */}
        <div className="max-w-lg mx-auto space-y-4">
          {/* Primary CTA - Home Service */}
          <Link href="/home-service">
            <Button
              className="w-full bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white px-10 py-8 text-xl font-bold rounded-2xl shadow-2xl transform hover:scale-105 transition-all duration-300 border-2 border-white/30"
              data-testid="button-get-home-service"
            >
              <Sparkles className="w-6 h-6 mr-3" />
              Get Home Service
            </Button>
          </Link>
          
          {/* Secondary CTA - leads to /relocate */}
          <Link href="/relocate">
            <Button
              variant="outline"
              className="w-full border-white/30 text-white backdrop-blur-sm bg-white/10 px-8 py-6 text-lg font-medium rounded-xl hover:bg-white/20 transition-all duration-200"
              data-testid="button-why-dubai"
            >
              Why People Choose Dubai
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}