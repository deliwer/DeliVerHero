import { useState } from "react";
import { Sparkles, ArrowRight, Building2, Heart, Zap, TrendingUp, Shield, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import heroImage from "@assets/generated_images/diverse_global_founders_and_hnwis_from_many_nationalities.png";
import ecosystemImage from "@assets/generated_images/peaceful_and_safe_dubai_environment_encouraging_relocation.png";
import settlementImage from "@assets/generated_images/dubai_urban_community_services_background.png";

export function DualPurposeHero() {
  const [audience, setAudience] = useState<'consumer' | 'entrepreneur'>('consumer');

  return (
    <section className="relative overflow-hidden">
      {/* Main Hero Section */}
      <div className="relative py-12 sm:py-16 lg:py-20 px-4 overflow-hidden flex items-center">
        {/* Full-width Hero Background Image */}
        <div 
          className="absolute inset-0 w-full h-full"
          style={{
            backgroundImage: `url(${heroImage})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center center',
            backgroundRepeat: 'no-repeat',
          }}
        >
          {/* Dark overlay for text readability */}
          <div className="absolute inset-0 bg-gradient-to-br from-black/60 via-black/65 to-black/60"></div>
        </div>

        {/* Main Content */}
        <div className="max-w-4xl mx-auto relative z-10 text-center">
          {/* Dual-purpose Headlines */}
          <div className="mb-10 sm:mb-12">
            {audience === 'consumer' ? (
              <>
                <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-4 leading-tight">
                  <span className="text-white drop-shadow-lg">Living in Dubai, simplified.</span>
                </h1>
                <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-6 leading-tight">
                  <span className="relative inline-block">
                    <span className="absolute inset-0 bg-black/70 blur-md rounded-lg px-4 py-2"></span>
                    <span className="relative bg-clip-text bg-gradient-to-r from-emerald-300 via-teal-200 to-cyan-300 drop-shadow-lg font-bold px-4 py-2 text-[#14b491]" 
                          style={{ 
                            textShadow: '0 0 30px rgba(16, 185, 129, 1), 0 0 50px rgba(20, 184, 166, 0.8)',
                            filter: 'contrast(1.2) brightness(1.3)',
                          }}>Everything you need — done for you</span>
                  </span>
                </h2>
                <p className="text-lg sm:text-xl text-white/90 font-medium max-w-3xl mx-auto drop-shadow-lg">before and after you move in.</p>
              </>
            ) : (
              <>
                <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-4 leading-tight">
                  <span className="text-white drop-shadow-lg">Build globally.</span>
                </h1>
                <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-6 leading-tight">
                  <span className="relative inline-block">
                    <span className="absolute inset-0 bg-black/70 blur-md rounded-lg px-4 py-2"></span>
                    <span className="relative bg-clip-text bg-gradient-to-r from-amber-300 via-orange-200 to-red-300 drop-shadow-lg font-bold px-4 py-2 text-[#f59e0b]" 
                          style={{ 
                            textShadow: '0 0 30px rgba(245, 158, 11, 1), 0 0 50px rgba(251, 146, 60, 0.8)',
                            filter: 'contrast(1.2) brightness(1.3)',
                          }}>Live in Dubai.</span>
                  </span>
                </h2>
                <p className="text-lg sm:text-xl text-white/90 font-medium max-w-3xl mx-auto drop-shadow-lg">
                  Join 500+ founders who relocated for family, lifestyle, and opportunity.
                </p>
              </>
            )}
          </div>

          {/* Audience Toggle & CTAs */}
          <div className="max-w-2xl mx-auto space-y-4">
            {/* Toggle Buttons */}
            <div className="flex gap-2 justify-center mb-6">
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
                <Link href="/relocate/move-in-services">
                  <Button
                    className="w-full bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white px-10 py-8 text-lg font-bold rounded-2xl shadow-2xl transition-all"
                    data-testid="button-get-home-service-hero"
                  >
                    <Sparkles className="w-5 h-5 mr-3" />
                    Set Up My Residence
                  </Button>
                </Link>
                <Link href="/home-service">
                  <Button
                    variant="outline"
                    className="w-full border-white/30 text-white backdrop-blur-sm bg-white/10 px-8 py-6 text-base font-medium rounded-xl hover:bg-white/20 transition-all"
                    data-testid="button-trade-iphone-hero"
                  >
                    <Heart className="w-4 h-4 mr-2" />
                    Already Living Here? Get Services
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
      {/* Trust & Proof Section Integrated */}
      <section 
        className="relative py-16 px-4 overflow-hidden"
        style={{
          backgroundImage: `url(${settlementImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundAttachment: 'fixed',
        }}
      >
        {/* Dark overlay for text readability */}
        <div className="absolute inset-0 bg-black/60"></div>

        <div className="max-w-5xl mx-auto relative z-10 text-center">
          {/* Section Header */}
          <div className="mb-12">
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">Trusted for everyday living in Dubai</h2>
            <p className="text-lg md:text-xl text-gray-200 max-w-3xl mx-auto">
              DeliWer supports residents during move-in, setup, and ongoing home care across key Dubai communities.
            </p>
          </div>

          {/* Central Trust Card */}
          <div className="max-w-xl mx-auto mb-12">
            <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-8 hover-elevate shadow-2xl">
              <h3 className="text-2xl font-semibold text-white mb-6">Currently operating in:</h3>
              <div className="flex flex-wrap justify-center gap-3 mb-8">
                {["JVC / JVT", "Business Bay", "Marina / JLT", "Barsha Heights"].map((c) => (
                  <span key={c} className="px-4 py-2 bg-white/20 rounded-full text-white text-sm font-medium border border-white/10">
                    {c}
                  </span>
                ))}
              </div>
              
              <Link href="/relocate/move-in-services">
                <Button size="lg" className="bg-emerald-600 hover:bg-emerald-500 text-white w-full py-6 text-lg font-bold rounded-xl shadow-lg transition-all" data-testid="button-setup-residence-hero">
                  Set Up My Residence
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              </Link>
            </div>
          </div>

          {/* Operational Proof & Boundary */}
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto text-left">
            <div className="bg-black/30 backdrop-blur-sm p-6 rounded-xl border border-white/10">
              <h4 className="text-white font-bold mb-4 uppercase tracking-wider text-sm flex items-center gap-2">
                <Shield className="w-4 h-4 text-blue-400" /> Operational Proof
              </h4>
              <ul className="space-y-3 text-gray-300 text-sm">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500" /> 
                  Supporting residents across multiple communities
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500" /> 
                  Handling regular move-ins and service requests
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500" /> 
                  Coordinating through a single point of contact
                </li>
              </ul>
            </div>
            
            <div className="bg-amber-500/10 backdrop-blur-sm p-6 rounded-xl border border-amber-500/20 flex flex-col justify-center">
              <p className="text-amber-400 font-bold text-sm mb-2 uppercase tracking-tight">
                DeliWer is not a real estate agency
              </p>
              <p className="text-gray-300 text-xs leading-relaxed">
                We do not sell property, show listings, or earn commissions. We work with vetted local partners to ensure consistent delivery.
              </p>
            </div>
          </div>

          {/* Trust Microcopy */}
          <div className="mt-12 text-center">
            <p className="text-sm text-gray-400">
              Most residents come to DeliWer through building referrals and word of mouth.
            </p>
          </div>
        </div>
      </section>
      {/* Ecosystem Impact Section - Compact, Statistics-Driven */}
      {/* <section 
        className="relative py-12 px-4 overflow-hidden"
        style={{
          backgroundImage: `url(${ecosystemImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundAttachment: 'fixed',
        }}
      >
        ...
      </section> */}
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