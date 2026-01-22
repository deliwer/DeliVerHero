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

import nightmarePng from "@/assets/generated_images/dubai-relocation-nightmare.png";
import expertSupportPng from "@/assets/generated_images/dubai-relocation-expert-support.png";

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
      {/* Hero Section - Elite Concierge & Risk Mitigation Focus */}
      <section className="relative py-24 md:py-40 px-4 overflow-hidden min-h-[90vh] flex items-center">
        <div 
          className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url(${relocationHeroPng})` }}
        />
        <div className="absolute inset-0 z-0 bg-[#0A3D62]/60 backdrop-blur-[0.5px]" />

        <div className="max-w-5xl mx-auto text-center relative z-10">
          <div className="mb-6 inline-block px-4 py-1 bg-[#FFC845] text-[#0A3D62] font-black text-sm uppercase tracking-[0.3em] rounded-full">
            Elite Concierge & Risk Mitigation by DeliWer
          </div>
          <h1 className="text-5xl md:text-8xl font-black uppercase tracking-tighter mb-8 text-white leading-[0.9] drop-shadow-2xl">
            Entering Dubai?<br />
            <span className="text-[#FFC845]">Ensure Your Exit is Already Handled.</span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-200 mb-12 font-medium max-w-3xl mx-auto leading-relaxed">Most relocations fail at the end. We manage your arrival with a focus on mitigating the liabilities that trap founders upon exit.</p>
          <div className="flex flex-col md:flex-row justify-center items-center gap-6">
            <Button 
              size="lg" 
              className="bg-[#25D366] hover:bg-[#20bd5a] text-white font-black rounded-full px-16 h-24 text-2xl shadow-2xl transition-all w-full md:w-auto active-elevate-2" 
              onClick={() => window.open('https://wa.me/971523946311?text=I%20want%20to%20avoid%20relocation%20mishandling%20and%20exit%20traps', '_blank')}
            >
              <MessageSquare className="w-8 h-8 mr-3" />
              Mitigate Risk on WhatsApp
            </Button>
            <Link href="/relocate">
              <Button size="lg" variant="outline" className="border-white/20 text-white hover:bg-white/10 rounded-full px-12 h-20 text-xl backdrop-blur-md font-bold">
                Relocate with Certainty
                <ChevronRight className="w-5 h-5 ml-2" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Nightmare vs Success Section */}
      <section className="relative py-32 px-4 overflow-hidden">
        <div 
          className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat opacity-20 grayscale"
          style={{ backgroundImage: `url(${nightmarePng})` }}
        />
        <div className="absolute inset-0 z-0 bg-gradient-to-b from-slate-950 via-red-950/20 to-slate-950" />
        
        <div className="max-w-6xl mx-auto relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-6xl font-black text-white uppercase tracking-tighter mb-6">When Relocation Turns Into a Nightmare</h2>
            <p className="text-xl text-red-200/70 max-w-2xl mx-auto">One small oversight at arrival can lead to legal blocks, frozen deposits, and travel bans at exit.</p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              {[
                { title: "Ejari Misalignment", desc: "Contracts that don't protect your move-out rights." },
                { title: "Utility Liability", desc: "Accumulated bills hidden in unclosed accounts." },
                { title: "Deposit Erosion", desc: "Landlords withholding 100% due to technicalities." },
                { title: "Compliance Gaps", desc: "Failing to deregister correctly, leading to future fines." }
              ].map((item, i) => (
                <div key={i} className="flex gap-4 p-6 bg-red-950/10 border border-red-500/20 rounded-2xl backdrop-blur-sm">
                  <div className="w-2 h-2 bg-red-500 rounded-full mt-2 shrink-0" />
                  <div>
                    <h3 className="text-lg font-bold text-white uppercase tracking-tight">{item.title}</h3>
                    <p className="text-gray-400 text-sm">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="relative group">
               <div className="absolute -inset-1 bg-gradient-to-r from-red-600 to-orange-600 rounded-3xl blur opacity-25 group-hover:opacity-50 transition duration-1000 group-hover:duration-200"></div>
               <img src={nightmarePng} alt="Nightmare scenario" className="relative rounded-3xl border border-white/10 shadow-2xl grayscale hover:grayscale-0 transition-all duration-700" />
            </div>
          </div>
        </div>
      </section>

      {/* Expert Success Section */}
      <section className="relative py-32 px-4 overflow-hidden bg-slate-900/50">
        <div 
          className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat opacity-20"
          style={{ backgroundImage: `url(${expertSupportPng})` }}
        />
        <div className="absolute inset-0 z-0 bg-gradient-to-b from-slate-950 via-emerald-950/10 to-slate-950" />

        <div className="max-w-6xl mx-auto relative z-10">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="order-2 md:order-1 relative group">
               <div className="absolute -inset-1 bg-gradient-to-r from-emerald-600 to-blue-600 rounded-3xl blur opacity-25 group-hover:opacity-50 transition duration-1000 group-hover:duration-200"></div>
               <img src={expertSupportPng} alt="Expert support" className="relative rounded-3xl border border-white/10 shadow-2xl" />
            </div>
            <div className="order-1 md:order-2 space-y-8">
              <h2 className="text-4xl md:text-5xl font-black text-white uppercase tracking-tighter">Emerging Successful Without Pitfalls</h2>
              <p className="text-xl text-emerald-100/70">Our local experts handle the complexity from Day 1, ensuring you are always ready to scale or ready to exit safely.</p>
              
              <div className="space-y-4">
                {[
                  "Proactive Contract Audits",
                  "Digital Liability Tracking",
                  "Direct Landlord Mediation",
                  "Express Exit Clearance"
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-3 text-lg font-bold text-white">
                    <CheckCircle2 className="w-6 h-6 text-emerald-400" />
                    <span className="uppercase tracking-tight">{item}</span>
                  </div>
                ))}
              </div>

              <Button 
                size="lg" 
                className="bg-[#FFC845] hover:bg-[#e6b43e] text-[#0A3D62] font-black rounded-full px-12 h-20 text-xl shadow-xl w-full md:w-auto"
                onClick={() => window.open('https://wa.me/971523946311', '_blank')}
              >
                Secure Your Relocation
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* 3 Quick Value Points - Focus on Dilemma & Consequences */}
      <section className="py-24 px-4 bg-[#0A3D62] border-y border-white/5">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-3 gap-12">
            <div className="flex flex-col items-center text-center group">
              <div className="w-20 h-20 bg-red-500/20 rounded-3xl flex items-center justify-center mb-6 border border-red-500/30 group-hover:scale-110 transition-transform">
                <Gavel className="w-10 h-10 text-red-400" />
              </div>
              <h3 className="text-2xl font-black text-white uppercase mb-4 tracking-tight">Avoid Exit Traps</h3>
              <p className="text-blue-100/70 text-lg leading-relaxed">Mishandled Ejari or DEWA closures at arrival create massive legal liabilities when you eventually leave.</p>
            </div>
            
            <div className="flex flex-col items-center text-center group">
              <div className="w-20 h-20 bg-[#FFC845]/20 rounded-3xl flex items-center justify-center mb-6 border border-[#FFC845]/30 group-hover:scale-110 transition-transform">
                <FileText className="w-10 h-10 text-[#FFC845]" />
              </div>
              <h3 className="text-2xl font-black text-white uppercase mb-4 tracking-tight">Liability Protection</h3>
              <p className="text-blue-100/70 text-lg leading-relaxed">We audit your contracts from day one to ensure a smooth, penalty-free exit when the time comes.</p>
            </div>

            <div className="flex flex-col items-center text-center group">
              <div className="w-20 h-20 bg-blue-400/20 rounded-3xl flex items-center justify-center mb-6 border border-blue-400/30 group-hover:scale-110 transition-transform">
                <Plane className="w-10 h-10 text-blue-400" />
              </div>
              <h3 className="text-2xl font-black text-white uppercase mb-4 tracking-tight">Zero-Friction Departure</h3>
              <p className="text-blue-100/70 text-lg leading-relaxed">Whether you're moving in or ready to move out, we ensure no loose ends are left behind in Dubai.</p>
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