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
import { Flame, Clock, TrendingUp, Play, Building, Heart, Users, Award, ChevronRight, Handshake, ShoppingCart, ChefHat, CheckCircle, Gift, Crown, Trophy, Sparkles, Rocket, Star, Zap, ChevronDown, ChevronUp, Gavel, ArrowRight, Plane, Globe } from "lucide-react";
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
    <div>
      <SEOMeta
        title="Your Everyday Living Companion for Dubai"
        description="Dubai's first iPhone to water trade platform. Earn DXBs (Dubai Carbon Tokens) for your old iPhone. Free pickup for AquaCafe loyalty members within 24 hours across Dubai, Sharjah & Abu Dhabi. Certified data wipe guaranteed."
        keywords="iPhone trade-in Dubai, sell iPhone UAE, DXBs, Dubai Carbon Tokens, water delivery Dubai, sustainability rewards, eco-friendly Dubai, iPhone buyback, DeliWer, trade iPhone for water, circular economy UAE"
      />

      {/* Onboarding Tutorial */}
      {showOnboarding && (
        <HeroOnboardingTutorial 
          onComplete={handleOnboardingComplete}
          onSkip={handleOnboardingSkip}
        />
      )}

      {/* Tutorial Restart Button (for returning users) */}
      {hasSeenOnboarding && (
        <div className="fixed bottom-6 right-6 z-30">
          <Button
            onClick={handleRestartTutorial}
            className="bg-gradient-to-r from-emerald-500/90 to-blue-500/90 hover:from-emerald-600 hover:to-blue-600 text-white shadow-lg backdrop-blur-sm"
            data-testid="restart-tutorial"
          >
            <Play className="w-4 h-4 mr-2" />
            Tutorial
          </Button>
        </div>
      )}

      {/* PHASE 2: PLAY (Attraction) - Dual-Purpose Hero with Founder Stories */}
      <DualPurposeHero />

      {/* Trust & Proof Section */}
      <TrustElements />

      <div className="relative bg-slate-950">
        <div className="relative z-20 space-y-0">
          {/* Relocation Operating Lifecycle */}
          <section className="py-24 px-4 bg-slate-950/50">
            <div className="max-w-6xl mx-auto">
              <div className="text-center mb-16">
                <h2 className="text-4xl md:text-5xl font-black text-white uppercase tracking-tighter mb-4">Operating Lifecycle</h2>
                <p className="text-xl text-emerald-400 font-medium max-w-3xl mx-auto">
                  End-to-end coordination. Arrival to exit.
                </p>
                <p className="text-gray-400 mt-4 font-bold">One coordinator responsible end-to-end.</p>
              </div>

              <div className="grid gap-8">
                {/* Step 1: Pre-Arrival */}
                <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-[2.5rem] p-8 md:p-12 hover-elevate transition-all">
                  <div className="flex flex-col md:flex-row gap-8 items-start">
                    <div className="w-16 h-16 bg-blue-500/20 rounded-2xl flex items-center justify-center shrink-0">
                      <Plane className="w-8 h-8 text-blue-400" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-2xl font-bold text-white uppercase mb-2">Pre-Arrival</h3>
                      <p className="text-gray-400 mb-6 leading-relaxed">
                        Readiness and coordination before your flight. We ensure your transition is operationally ready.
                      </p>
                      <Link href="/relocate">
                        <Button size="lg" className="bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-full px-8">
                          Plan Move
                        </Button>
                      </Link>
                    </div>
                  </div>
                </div>

                {/* Step 2: Arrival */}
                <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-[2.5rem] p-8 md:p-12 hover-elevate transition-all">
                  <div className="flex flex-col md:flex-row gap-8 items-start">
                    <div className="w-16 h-16 bg-emerald-500/20 rounded-2xl flex items-center justify-center shrink-0">
                      <Clock className="w-8 h-8 text-emerald-400" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-2xl font-bold text-white uppercase mb-2">Arrival & Move-In</h3>
                      <p className="text-gray-400 mb-6 leading-relaxed">
                        Keys to a fully functional home. Vetted execution for cleaning, utilities, and maintenance.
                      </p>
                      <Link href="/move-in-services">
                        <Button size="lg" className="bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-full px-8">
                          View Services
                        </Button>
                      </Link>
                    </div>
                  </div>
                </div>

                {/* Step 3: Living */}
                <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-[2.5rem] p-8 md:p-12 hover-elevate transition-all">
                  <div className="flex flex-col md:flex-row gap-8 items-start">
                    <div className="w-16 h-16 bg-purple-500/20 rounded-2xl flex items-center justify-center shrink-0">
                      <Globe className="w-8 h-8 text-purple-400" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-2xl font-bold text-white uppercase mb-2">Living & Support</h3>
                      <p className="text-gray-400 mb-6 leading-relaxed">
                        Ongoing home support and concierge assistance. We manage the home so you focus on the growth.
                      </p>
                      <Link href="/home-service">
                        <Button size="lg" className="bg-purple-600 hover:bg-purple-500 text-white font-bold rounded-full px-8">
                          Home Support
                        </Button>
                      </Link>
                    </div>
                  </div>
                </div>

                {/* Step 4: Exit */}
                <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-[2.5rem] p-8 md:p-12 hover-elevate transition-all">
                  <div className="flex flex-col md:flex-row gap-8 items-start">
                    <div className="w-16 h-16 bg-red-500/20 rounded-2xl flex items-center justify-center shrink-0">
                      <TrendingUp className="rotate-180 w-8 h-8 text-red-400" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-2xl font-bold text-white uppercase mb-2">Move-Out & Exit</h3>
                      <p className="text-gray-400 mb-6 leading-relaxed">
                        Handover, compliance, and utility closure. A professional exit as smooth as your arrival.
                      </p>
                      <Link href="/move-in-services">
                        <Button size="lg" className="bg-red-600 hover:bg-red-500 text-white font-bold rounded-full px-8">
                          Exit Support
                        </Button>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>

              {/* Partners */}
              <div className="mt-24 text-center">
                <div className="inline-block bg-emerald-500/10 border border-emerald-500/20 rounded-3xl p-8 md:p-12 max-w-4xl mx-auto">
                  <h3 className="text-3xl font-black text-white uppercase tracking-tight mb-4">Partners Welcome</h3>
                  <p className="text-xl text-gray-400 mb-8">Logistics, HR & Relocation Firms. Syndicate Dubai-side execution with DeliWer.</p>
                  <div className="flex flex-wrap justify-center gap-4">
                    <Link href="/partners">
                      <Button size="lg" className="bg-emerald-500 hover:bg-emerald-400 text-black font-black rounded-full px-12">
                        Explore
                      </Button>
                    </Link>
                    <Button 
                      size="lg" 
                      variant="outline" 
                      className="border-emerald-500/30 text-emerald-400 hover:bg-emerald-500/10 rounded-full px-12"
                      onClick={() => window.open('https://wa.me/971523946311', '_blank')}
                    >
                      WhatsApp
                    </Button>
                  </div>
                </div>
              </div>

              {/* Signals */}
              <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-6 text-center max-w-4xl mx-auto px-4">
                {[
                  "One accountable coordinator",
                  "Zero app dependency",
                  "Partner-led execution",
                  "Full lifecycle coverage"
                ].map((signal, idx) => (
                  <div key={idx} className="flex flex-col items-center gap-2">
                    <CheckCircle className="w-5 h-5 text-emerald-500" />
                    <span className="text-xs font-bold text-gray-300 uppercase tracking-tighter">{signal}</span>
                  </div>
                ))}
              </div>

              {/* Final CTA */}
              <div className="mt-24 text-center pb-24 border-t border-white/5 pt-24">
                <h3 className="text-4xl font-black text-white uppercase tracking-tighter mb-4">Relocation Without Loose Ends.</h3>
                <p className="text-xl text-gray-400 mb-10 max-w-2xl mx-auto">Arriving, living, or exiting — DeliWer stays responsible.</p>
                <Link href="/contact">
                  <Button size="lg" className="bg-white hover:bg-gray-200 text-black font-black rounded-full px-16 py-8 text-xl shadow-2xl transition-all">
                    Talk to a Coordinator
                  </Button>
                </Link>
              </div>
            </div>
          </section>
        </div>
      </div>

    </div>
  );
}