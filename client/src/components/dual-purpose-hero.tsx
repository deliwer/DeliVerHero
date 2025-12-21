import { useState } from "react";
import { Sparkles, ArrowRight, Globe, Building2, Heart, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import heroImage from "@assets/stock_images/people_at_home_drink_21a6f771.jpg";
import founderImage1 from "@assets/stock_images/professional_entrepr_fbd58974.jpg";
import founderImage2 from "@assets/stock_images/professional_entrepr_7fffe470.jpg";
import founderImage3 from "@assets/stock_images/professional_entrepr_d7f4e7f6.jpg";

export function DualPurposeHero() {
  const [audience, setAudience] = useState<'consumer' | 'entrepreneur'>('consumer');

  const founderStories = [
    {
      name: "Nikolay Storonsky",
      company: "Revolut",
      background: "Fintech Founder",
      image: founderImage1,
      lifestylePoints: [
        "Family-friendly communities with world-class schools",
        "No income tax - reinvest in your team",
        "10-min beach access from downtown"
      ],
      story: "London → Dubai 2025"
    },
    {
      name: "Sarah Chen",
      company: "GreenScale Tech",
      background: "Sustainability Innovator",
      image: founderImage2,
      lifestylePoints: [
        "Access to MENA market ecosystem",
        "No income tax for founders",
        "Year-round outdoor climate for team activities"
      ],
      story: "Singapore → Dubai 2024"
    },
    {
      name: "Amara Okafor",
      company: "ConnectHub AI",
      background: "SaaS Leader",
      image: founderImage3,
      lifestylePoints: [
        "Global talent hub - access 200+ nationalities",
        "9% corporate tax - build sustainably",
        "24/7 startup support ecosystem"
      ],
      story: "New York → Dubai 2023"
    }
  ];

  return (
    <section className="relative overflow-hidden">
      {/* Main Hero Section */}
      <div className="relative py-24 sm:py-32 lg:py-40 px-4 overflow-hidden min-h-screen flex items-center">
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
          {/* Dark overlay for text readability */}
          <div className="absolute inset-0 bg-gradient-to-br from-black/50 via-black/60 to-black/50"></div>
        </div>

        {/* Main Content */}
        <div className="max-w-5xl mx-auto relative z-10 text-center">
          {/* Trust Badge */}
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2 mb-8">
            <Globe className="w-4 h-4 text-emerald-400" />
            <span className="text-sm text-white/90">Trusted by founders, families, and entrepreneurs from 200+ nationalities</span>
          </div>

          {/* Dual-purpose Headlines */}
          <div className="mb-16 sm:mb-20">
            {audience === 'consumer' ? (
              <>
                <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold mb-6 leading-tight">
                  <span className="text-white drop-shadow-2xl">Shop smart.</span>
                </h1>
                <h3 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-10 leading-tight">
                  <span className="relative inline-block">
                    <span className="absolute inset-0 bg-black/70 blur-md rounded-xl px-6 py-3"></span>
                    <span className="relative bg-clip-text bg-gradient-to-r from-emerald-300 via-teal-200 to-cyan-300 drop-shadow-2xl font-black px-6 py-3 text-[#14b491]" 
                          style={{ 
                            textShadow: '0 0 40px rgba(16, 185, 129, 1), 0 0 60px rgba(20, 184, 166, 0.9), 0 0 80px rgba(6, 182, 212, 0.7)',
                            filter: 'contrast(1.3) brightness(1.4)',
                            WebkitTextStroke: '1px rgba(255, 255, 255, 0.3)'
                          }}>Build impact.</span>
                  </span>
                </h3>
                <p className="text-xl sm:text-2xl lg:text-3xl text-white/90 font-medium max-w-4xl mx-auto leading-relaxed drop-shadow-2xl">
                  Trade your iPhone. Build a sustainable future.
                </p>
              </>
            ) : (
              <>
                <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold mb-6 leading-tight">
                  <span className="text-white drop-shadow-2xl">Build globally.</span>
                </h1>
                <h3 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-10 leading-tight">
                  <span className="relative inline-block">
                    <span className="absolute inset-0 bg-black/70 blur-md rounded-xl px-6 py-3"></span>
                    <span className="relative bg-clip-text bg-gradient-to-r from-amber-300 via-orange-200 to-red-300 drop-shadow-2xl font-black px-6 py-3 text-[#f59e0b]" 
                          style={{ 
                            textShadow: '0 0 40px rgba(245, 158, 11, 1), 0 0 60px rgba(251, 146, 60, 0.9), 0 0 80px rgba(239, 68, 68, 0.7)',
                            filter: 'contrast(1.3) brightness(1.4)',
                            WebkitTextStroke: '1px rgba(255, 255, 255, 0.3)'
                          }}>Live in Dubai.</span>
                  </span>
                </h3>
                <p className="text-xl sm:text-2xl lg:text-3xl text-white/90 font-medium max-w-4xl mx-auto leading-relaxed drop-shadow-2xl">
                  Join 500+ founders who relocated for family, lifestyle, and opportunity.
                </p>
              </>
            )}
          </div>

          {/* Audience Toggle & CTAs */}
          <div className="max-w-2xl mx-auto space-y-6">
            {/* Toggle Buttons */}
            <div className="flex gap-3 justify-center mb-8">
              <button
                onClick={() => setAudience('consumer')}
                className={`px-6 py-2 rounded-full font-semibold transition-all ${
                  audience === 'consumer'
                    ? 'bg-emerald-600 text-white'
                    : 'bg-white/20 text-white hover:bg-white/30 backdrop-blur-sm'
                }`}
                data-testid="button-toggle-consumer"
              >
                <ShoppingCart className="w-4 h-4 inline mr-2" />
                Consumer
              </button>
              <button
                onClick={() => setAudience('entrepreneur')}
                className={`px-6 py-2 rounded-full font-semibold transition-all ${
                  audience === 'entrepreneur'
                    ? 'bg-amber-600 text-white'
                    : 'bg-white/20 text-white hover:bg-white/30 backdrop-blur-sm'
                }`}
                data-testid="button-toggle-entrepreneur"
              >
                <Building2 className="w-4 h-4 inline mr-2" />
                Entrepreneur
              </button>
            </div>

            {/* Context-specific CTAs */}
            {audience === 'consumer' ? (
              <div className="space-y-3">
                <Link href="/home-service">
                  <Button
                    className="w-full bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white px-10 py-8 text-lg font-bold rounded-2xl shadow-2xl transition-all"
                    data-testid="button-get-home-service-hero"
                  >
                    <Sparkles className="w-5 h-5 mr-3" />
                    Get Home Service
                  </Button>
                </Link>
                <Link href="/aquacafe">
                  <Button
                    variant="outline"
                    className="w-full border-white/30 text-white backdrop-blur-sm bg-white/10 px-8 py-6 text-base font-medium rounded-xl hover:bg-white/20 transition-all"
                    data-testid="button-trade-iphone-hero"
                  >
                    <Heart className="w-4 h-4 mr-2" />
                    Trade Your iPhone for Water
                  </Button>
                </Link>
              </div>
            ) : (
              <div className="space-y-3">
                <Link href="/relocate">
                  <Button
                    className="w-full bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-500 hover:to-orange-500 text-white px-10 py-8 text-lg font-bold rounded-2xl shadow-2xl transition-all"
                    data-testid="button-start-relocation-hero"
                  >
                    <Zap className="w-5 h-5 mr-3" />
                    Start Relocation Assessment
                  </Button>
                </Link>
                <Link href="/relocate">
                  <Button
                    variant="outline"
                    className="w-full border-white/30 text-white backdrop-blur-sm bg-white/10 px-8 py-6 text-base font-medium rounded-xl hover:bg-white/20 transition-all"
                    data-testid="button-founder-stories-hero"
                  >
                    Founder Success Stories
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Founder Stories Section - Always Visible Below Hero */}
      <section className="py-16 px-4 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Why Founders Choose Dubai
            </h2>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">
              It's not just about taxes. It's about building a sustainable lifestyle while growing globally.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {founderStories.map((story, idx) => (
              <div
                key={idx}
                className="group rounded-2xl overflow-hidden bg-slate-800/50 border border-slate-700 hover:border-emerald-500/50 transition-all duration-300 hover-elevate"
                data-testid={`card-founder-story-${idx}`}
              >
                {/* Founder Image */}
                <div className="relative h-64 overflow-hidden bg-slate-700">
                  <img
                    src={story.image}
                    alt={story.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
                  <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
                    <p className="text-sm text-emerald-400 font-semibold">{story.story}</p>
                  </div>
                </div>

                {/* Founder Info */}
                <div className="p-6">
                  <h3 className="text-xl font-bold text-white mb-1">{story.name}</h3>
                  <p className="text-emerald-400 font-semibold text-sm mb-2">{story.company}</p>
                  <p className="text-gray-400 text-sm mb-6">{story.background}</p>

                  {/* Lifestyle Benefits */}
                  <div className="space-y-3">
                    {story.lifestylePoints.map((point, pidx) => (
                      <div key={pidx} className="flex gap-3">
                        <div className="flex-shrink-0">
                          <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 mt-2"></div>
                        </div>
                        <p className="text-sm text-gray-300">{point}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* CTA */}
                <div className="px-6 pb-6 pt-0">
                  <Link href="/relocate">
                    <Button
                      variant="outline"
                      className="w-full text-emerald-400 border-emerald-500/50 hover:bg-emerald-500/10"
                      size="sm"
                      data-testid={`button-explore-story-${idx}`}
                    >
                      Learn More <ArrowRight className="w-3 h-3 ml-2" />
                    </Button>
                  </Link>
                </div>
              </div>
            ))}
          </div>

          {/* CTA to Relocation */}
          <div className="mt-12 text-center">
            <p className="text-gray-400 mb-6">Ready to explore relocation?</p>
            <Link href="/relocate">
              <Button
                size="lg"
                className="bg-emerald-600 hover:bg-emerald-700"
                data-testid="button-explore-relocation-final"
              >
                See Full Relocation Options
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </section>
  );
}

// Icon component
function ShoppingCart({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
    </svg>
  );
}