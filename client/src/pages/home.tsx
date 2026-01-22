import { useState, useEffect } from "react";
import { DualPurposeHero } from "@/components/dual-purpose-hero";
import { HeroChallengeLanding } from "@/components/hero-challenge-landing";
import { HeroOnboardingTutorial } from "@/components/hero-onboarding-tutorial";
import { FoundersSection } from "@/components/founders-section";
import { TradeInBanner } from "@/components/trade-in-banner";
import { TestimonialsSection } from "@/components/testimonials-section";
import { TrustElements } from "@/components/trust-elements";
import { RewardComparison } from "@/components/reward-comparison";
import { StarsSponsorshipSection } from "@/components/stars-sponsorship-section";
import { SEOMeta } from "@/components/seo-meta";
import { HomeServiceSection } from "@/components/home-service-section";
import { LeaderboardSocialProof } from "@/components/leaderboard-social-proof";
import { DirhamCurrency } from "@/components/dirham-currency";
import { Flame, Clock, TrendingUp, Play, Building, Heart, Users, Award, ChevronRight, Handshake, ShoppingCart, ChefHat, CheckCircle, Gift, Crown, Trophy, Sparkles, Rocket, Star, Zap, ChevronDown, ChevronUp, Gavel, ArrowRight, Plane, Globe, MessageSquare, CheckCircle2, UserCheck, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";

function OpportunitiesSection() {
  return (
    <section className="py-8 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="bg-slate-900 rounded-3xl p-6 border border-slate-800">
          <div className="text-center mb-6">
            <h2 className="text-2xl font-bold text-white uppercase tracking-tight">Ecosystem Partnerships</h2>
            <p className="text-gray-400 text-sm max-w-2xl mx-auto mt-2">
              Expanding sustainable trade and relocation orchestration in JVC.
            </p>
          </div>
          
          <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* iPhone Trade Advantage */}
            <div className="bg-slate-800/50 rounded-2xl p-6 border border-slate-700 hover:border-slate-600 transition-all duration-300">
              <div className="text-left mb-4">
                <Building className="w-8 h-8 text-blue-400 mb-4" />
                <h3 className="text-lg font-bold text-white uppercase">iPhone Trade</h3>
                <p className="text-sm text-gray-400 mt-2 mb-4">Certified trade-in program for JVC residents.</p>
              </div>
              <Link
                href="/partners"
                className="w-full bg-slate-700 hover:bg-slate-600 text-white px-4 py-3 rounded-lg text-sm font-bold transition-all text-center inline-block"
                data-testid="button-trade-iphone"
              >
                Start Partnership
              </Link>
            </div>

            {/* Gitex Launch Special */}
            <div className="bg-slate-800/50 rounded-2xl p-6 border border-slate-700 hover:border-slate-600 transition-all duration-300">
              <div className="text-left mb-4">
                <Heart className="w-8 h-8 text-emerald-400 mb-4" />
                <h3 className="text-lg font-bold text-white uppercase">Community Impact</h3>
                <p className="text-sm text-gray-400 mt-2 mb-4">Join our local environmental missions.</p>
              </div>
              <Link
                href="/aquacafe"
                className="w-full bg-slate-700 hover:bg-slate-600 text-white px-4 py-3 rounded-lg text-sm font-bold transition-all text-center inline-block"
                data-testid="button-gitex-launch"
              >
                Learn More
              </Link>
            </div>

            {/* Media Story */}
            <div className="bg-slate-800/50 rounded-2xl p-6 border border-slate-700 hover:border-slate-600 transition-all duration-300">
              <div className="text-left mb-4">
                <Users className="w-8 h-8 text-purple-400 mb-4" />
                <h3 className="text-lg font-bold text-white uppercase">Media Relations</h3>
                <p className="text-sm text-gray-400 mt-2 mb-4">Access our JVC orchestration story assets.</p>
              </div>
              <button
                onClick={() => {
                  const mediaKit = `https://deliwer.com/media-kit?story=iphone-water-trade`;
                  const shareText = `World's first iPhone-to-Water trade platform launches at GITEX 2025! Media kit: ${mediaKit}`;
                  
                  if (navigator.share) {
                    navigator.share({ title: 'DeliWer Media Story', text: shareText, url: mediaKit });
                  } else {
                    navigator.clipboard.writeText(shareText);
                  }
                }}
                className="w-full bg-slate-700 hover:bg-slate-600 text-white px-4 py-3 rounded-lg text-sm font-bold transition-all text-center"
                data-testid="button-media-kit"
              >
                Media Kit
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function LiveChallengeWidget() {
  return (
    <div className="bg-slate-900 rounded-2xl p-6 border border-slate-800" data-testid="live-challenge">
      <h3 className="text-lg font-bold text-white mb-6 flex items-center uppercase tracking-tight">
        <Flame className="w-5 h-5 text-slate-400 mr-2" />
        Community Mission
      </h3>

      <div className="text-left mb-8">
        <h4 className="text-xl font-bold text-white mb-2 uppercase">1 Million Bottles Target</h4>
        <p className="text-gray-400 text-sm italic">Local JVC environmental initiative</p>
      </div>

      {/* Progress Bar */}
      <div className="mb-6">
        <div className="flex justify-between text-xs text-gray-500 mb-2">
          <span>Current Impact</span>
          <span>80% Verified</span>
        </div>
        <div className="w-full bg-slate-800 rounded-full h-2">
          <div className="bg-slate-600 h-2 rounded-full" style={{width: '80%'}}></div>
        </div>
      </div>

      {/* Challenge Stats */}
      <div className="grid grid-cols-2 gap-4 mb-6">
        <div className="text-left p-4 bg-slate-800/50 rounded-lg border border-slate-700">
          <div className="text-xl font-bold text-white">23 Days</div>
          <div className="text-xs text-gray-500">Remaining</div>
        </div>
        <div className="text-left p-4 bg-slate-800/50 rounded-lg border border-slate-700">
          <div className="text-xl font-bold text-white">200K</div>
          <div className="text-xs text-gray-500">To target</div>
        </div>
      </div>

      {/* Live Activity Feed */}
      <div className="pt-4">
        <div className="flex items-center mb-4">
          <div className="w-1.5 h-1.5 bg-slate-500 rounded-full mr-2"></div>
          <span className="text-xs text-gray-500 uppercase font-bold">Recent Impact Log</span>
        </div>

        <div className="space-y-3 text-sm text-gray-400">
          <div className="flex gap-2"><span>•</span> <span>Community mission updated: 500 bottles prevented</span></div>
          <div className="flex gap-2"><span>•</span> <span>New local partner joined environmental initiative</span></div>
        </div>
        
        {/* Live Challenge CTA */}
        <div className="mt-8">
          <button
            onClick={() => {
              const challengeLink = `https://deliwer.com/challenge?ref=LIVE${Math.random().toString(36).substr(2, 4).toUpperCase()}`;
              const shareText = `Join Dubai's JVC Community Challenge! 1 Million Bottles target. Get local support details: ${challengeLink}`;
              
              if (navigator.share) {
                navigator.share({ title: 'JVC Community Challenge', text: shareText, url: challengeLink });
              } else {
                navigator.clipboard.writeText(shareText);
                window.open('/?utm_source=live_challenge&utm_medium=share_cta', '_blank');
              }
            }}
            className="w-full bg-slate-700 hover:bg-slate-600 text-white px-4 py-3 rounded-lg font-bold transition-all flex items-center justify-center text-sm"
          >
            Mission Details
          </button>
        </div>
      </div>
    </div>
  );
}

import relocationHeroPng from "@/assets/generated_images/dubai-relocation-luxury-moment.png";

export default function Home() {
  const [showOnboarding, setShowOnboarding] = useState(false);
  const [hasSeenOnboarding, setHasSeenOnboarding] = useState(false);

  // Check if user has seen onboarding before
  useEffect(() => {
    const seenOnboarding = localStorage.getItem('hero-onboarding-completed');
    // Always mark as seen to prevent automatic onboarding display
    setHasSeenOnboarding(true);
    // Set onboarding as completed if not already
    if (!seenOnboarding) {
      localStorage.setItem('hero-onboarding-completed', 'true');
    }
  }, []);

  const handleOnboardingComplete = () => {
    localStorage.setItem('hero-onboarding-completed', 'true');
    setShowOnboarding(false);
    setHasSeenOnboarding(true);
  };

  const handleOnboardingSkip = () => {
    localStorage.setItem('hero-onboarding-completed', 'true');
    setShowOnboarding(false);
    setHasSeenOnboarding(true);
  };

  const handleRestartTutorial = () => {
    setShowOnboarding(true);
  };

  return (
    <div className="min-h-screen bg-slate-950">
      {/* Hero Section - Elite Concierge Focus */}
      <section className="relative py-24 md:py-40 px-4 overflow-hidden min-h-[90vh] flex items-center">
        <div 
          className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url(${relocationHeroPng})` }}
        />
        <div className="absolute inset-0 z-0 bg-[#0A3D62]/75 backdrop-blur-[1px]" />

        <div className="max-w-5xl mx-auto text-center relative z-10">
          <div className="mb-6 inline-block px-4 py-1 bg-[#FFC845] text-[#0A3D62] font-black text-sm uppercase tracking-[0.3em] rounded-full">
            Elite Concierge by DeliWer
          </div>
          <h1 className="text-5xl md:text-8xl font-black uppercase tracking-tighter mb-8 text-white leading-[0.9] drop-shadow-2xl">
            Arriving in Dubai?<br />
            <span className="text-[#FFC845]">Your New Chapter, Handled Right.</span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-200 mb-12 font-medium max-w-3xl mx-auto leading-relaxed">Relocation, company setup, and premium living managed with absolute clarity.</p>
          <div className="flex flex-col md:flex-row justify-center items-center gap-6">
            <Button 
              size="lg" 
              className="bg-[#25D366] hover:bg-[#20bd5a] text-white font-black rounded-full px-16 h-24 text-2xl shadow-2xl transition-all w-full md:w-auto active-elevate-2" 
              onClick={() => window.open('https://wa.me/971523946311?text=I%20am%20interested%20in%20DeliWer%20premium%20concierge%20services', '_blank')}
            >
              <MessageSquare className="w-8 h-8 mr-3" />
              Get Started on WhatsApp
            </Button>
            <Link href="/relocate">
              <Button size="lg" variant="outline" className="border-white/20 text-white hover:bg-white/10 rounded-full px-12 h-20 text-xl backdrop-blur-md font-bold">
                Explore Relocation
                <ChevronRight className="w-5 h-5 ml-2" />
              </Button>
            </Link>
          </div>
        </div>
      </section>
      {/* 3 Quick Value Points */}
      <section className="py-24 px-4 bg-[#0A3D62] border-y border-white/5">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-3 gap-12">
            <div className="flex flex-col items-center text-center group">
              <div className="w-20 h-20 bg-emerald-500/20 rounded-3xl flex items-center justify-center mb-6 border border-emerald-500/30 group-hover:scale-110 transition-transform">
                <Sparkles className="w-10 h-10 text-emerald-400" />
              </div>
              <h3 className="text-2xl font-black text-white uppercase mb-4 tracking-tight">Max Deposit Recovery</h3>
              <p className="text-blue-100/70 text-lg leading-relaxed">We manage move-out cleaning and handover to ensure you get your money back.</p>
            </div>
            
            <div className="flex flex-col items-center text-center group">
              <div className="w-20 h-20 bg-[#FFC845]/20 rounded-3xl flex items-center justify-center mb-6 border border-[#FFC845]/30 group-hover:scale-110 transition-transform">
                <FileText className="w-10 h-10 text-[#FFC845]" />
              </div>
              <h3 className="text-2xl font-black text-white uppercase mb-4 tracking-tight">Utility & Billing Closure</h3>
              <p className="text-blue-100/70 text-lg leading-relaxed">DEWA, Internet, and final settlements handled professionally and compliantly.</p>
            </div>

            <div className="flex flex-col items-center text-center group">
              <div className="w-20 h-20 bg-blue-400/20 rounded-3xl flex items-center justify-center mb-6 border border-blue-400/30 group-hover:scale-110 transition-transform">
                <Plane className="w-10 h-10 text-blue-400" />
              </div>
              <h3 className="text-2xl font-black text-white uppercase mb-4 tracking-tight">International Move Support</h3>
              <p className="text-blue-100/70 text-lg leading-relaxed">Expert connections for your next destination—wherever that may be.</p>
            </div>
          </div>
        </div>
      </section>
      {/* Why Exit Is Hard */}
      <section className="py-24 px-4 bg-slate-900/30">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-black text-white uppercase tracking-tighter mb-16">The Reality of Leaving Dubai</h2>
          <div className="grid md:grid-cols-2 gap-8 text-left">
            {[
              "DEWA & utility closures",
              "Ejari & landlord coordination",
              "Deposit recovery",
              "Timelines & penalties",
              "Too many vendors"
            ].map((item, i) => (
              <div key={i} className="flex items-center gap-4 p-4 bg-white/5 border border-white/10 rounded-2xl">
                <div className="w-3 h-3 bg-red-500 rounded-full" />
                <span className="text-lg text-gray-300 font-medium">{item}</span>
              </div>
            ))}
          </div>
          <div className="mt-16 p-8 bg-[#FFC845]/10 border border-[#FFC845]/20 rounded-[2rem]">
             <p className="text-2xl font-bold text-white uppercase tracking-tight">“Your Dubai chapter should end with clarity — not loose ends.”</p>
          </div>
        </div>
      </section>
      {/* Authority & Contact Section */}
      <section className="py-24 px-4 border-t border-white/5 bg-slate-950">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-black text-white uppercase tracking-tighter mb-12">Immediate Professional Support</h2>
          <div className="grid md:grid-cols-2 gap-8 mb-16">
            <div className="bg-[#0A3D62] p-8 rounded-[2rem] border border-white/10">
              <p className="text-blue-200 text-sm uppercase font-bold tracking-widest mb-2">WhatsApp (Fastest Help)</p>
              <a href="https://wa.me/971523946311" className="text-3xl font-black text-white hover:text-[#FFC845] transition-colors tracking-tight">+971 52 394 6311</a>
            </div>
            <div className="bg-slate-900 p-8 rounded-[2rem] border border-white/10">
              <p className="text-gray-400 text-sm uppercase font-bold tracking-widest mb-2">CEO Direct Line</p>
              <a href="tel:+971523906019" className="text-3xl font-black text-white hover:text-[#FFC845] transition-colors tracking-tight">+971 52 390 6019</a>
            </div>
          </div>
          
          <div className="flex flex-wrap justify-center gap-x-12 gap-y-6 text-gray-500 font-bold uppercase tracking-[0.2em] text-xs">
            <span>UAE-based team</span>
            <span>Compliance-first</span>
            <span>Confidential & Professional</span>
          </div>
        </div>
      </section>
      {/* Footer - Exit Focus */}
      <footer className="py-12 px-4 border-t border-white/5 bg-slate-950">
        <div className="max-w-4xl mx-auto text-center">
          <Link href="/relocate/exit" className="inline-block mb-8">
            <img src="/deliwer-logo.png" alt="DeliWer" className="h-8 w-auto opacity-50 grayscale hover:opacity-100 hover:grayscale-0 transition-all" />
          </Link>
          <div className="flex flex-col md:flex-row justify-center items-center gap-8 mb-8">
            <a href="https://wa.me/971523946311" className="text-[#FFC845] font-bold hover:underline">WhatsApp</a>
            <a href="mailto:service@deliwer.com" className="text-gray-400 hover:text-white">service@deliwer.com</a>
            <span className="text-gray-600 text-sm">Dubai, United Arab Emirates</span>
          </div>
          <Link href="/relocate/exit" className="text-emerald-500 font-black uppercase tracking-widest text-sm hover:underline">
            Exit Concierge →
          </Link>
        </div>
      </footer>
      {/* Sticky Components */}
      <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-3">
        <Button 
          className="bg-[#25D366] hover:bg-[#20bd5a] text-white rounded-full h-16 w-16 p-0 shadow-2xl animate-bounce ml-auto"
          onClick={() => window.open('https://wa.me/971523946311', '_blank')}
        >
          <MessageSquare className="w-8 h-8" />
        </Button>
      </div>
      <SEOMeta
        title="DeliWer | Dubai Exit Concierge - Move Out Professionally"
        description="Leaving Dubai? We handle your entire move-out and closure process. DEWA, Ejari, property handover, and deposit recovery. UAE-based end-to-end support."
        keywords="Dubai move out, leaving Dubai, exit concierge UAE, DEWA closure, Ejari cancellation, Dubai property handover, deposit recovery Dubai"
      />
    </div>
  );
}