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
        <div className="glass rounded-3xl p-6 border border-emerald-500/30 bg-gradient-to-br from-emerald-600/10 via-teal-600/10 to-blue-600/10">
          <div className="text-center mb-6">
            <h2 className="text-2xl font-bold text-white">BEYOND ETISALAT & DU</h2>
            <p className="text-gray-300 text-sm max-w-2xl mx-auto mt-2">
              World's first cross-category trade platform
            </p>
          </div>
          
          <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
            {/* iPhone Trade Advantage */}
            <div className="glass rounded-2xl p-4 border border-amber-500/30 bg-amber-600/5 hover:bg-amber-600/10 transition-all duration-300">
              <div className="text-center mb-4">
                <Building className="w-8 h-8 text-amber-400 mx-auto mb-2" />
                <h3 className="text-base font-bold text-white">iPHONE TRADE</h3>
              </div>
              <Link
                href="/partners"
                className="w-full bg-amber-600 hover:bg-amber-500 text-white px-4 py-2 rounded-lg text-sm font-bold transition-all text-center inline-block"
                data-testid="button-trade-iphone"
              >
                Start Partnership
              </Link>
            </div>

            {/* Gitex Launch Special */}
            <div className="glass rounded-2xl p-4 border border-hero-green-500/30 bg-hero-green-600/5 hover:bg-hero-green-600/10 transition-all duration-300">
              <div className="text-center mb-4">
                <Heart className="w-8 h-8 text-hero-green-400 mx-auto mb-2" />
                <h3 className="text-base font-bold text-white">GITEX 2025</h3>
              </div>
              <Link
                href="/aquacafe"
                className="w-full bg-hero-green-600 hover:bg-hero-green-500 text-white px-4 py-2 rounded-lg text-sm font-bold transition-all text-center inline-block"
                data-testid="button-gitex-launch"
              >
                Starter Kit - <DirhamCurrency amount={99} iconSize="sm" />
              </Link>
            </div>

            {/* Media Story */}
            <div className="glass rounded-2xl p-4 border border-purple-500/30 bg-purple-600/5 hover:bg-purple-600/10 transition-all duration-300">
              <div className="text-center mb-4">
                <Users className="w-8 h-8 text-purple-400 mx-auto mb-2" />
                <h3 className="text-base font-bold text-white">MEDIA KIT</h3>
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
                className="w-full bg-purple-600 hover:bg-purple-500 text-white px-4 py-2 rounded-lg text-sm font-bold transition-all text-center"
                data-testid="button-media-kit"
              >
                Download Kit
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
    <div className="glass rounded-2xl p-6 border border-slate-600" data-testid="live-challenge">
      <h3 className="text-xl font-bold text-white mb-6 flex items-center">
        <Flame className="w-6 h-6 text-red-500 mr-2" />
        LIVE COMMUNITY CHALLENGE
      </h3>

      <div className="text-center mb-8">
        <h4 className="text-2xl font-bold text-white mb-2">1 MILLION BOTTLES PREVENTED BY RAMADAN</h4>
        <p className="text-gray-300">Join Dubai's biggest environmental mission</p>
      </div>

      {/* Progress Bar */}
      <div className="mb-6">
        <div className="flex justify-between text-sm text-gray-400 mb-2">
          <span>Progress</span>
          <span>80% Complete</span>
        </div>
        <div className="w-full bg-slate-700 rounded-full h-4">
          <div className="bg-gradient-to-r from-hero-green-500 to-hero-green-600 h-4 rounded-full" style={{width: '80%'}}></div>
        </div>
      </div>

      {/* Challenge Stats */}
      <div className="grid grid-cols-2 gap-4 mb-6">
        <div className="text-center p-4 bg-slate-700/50 rounded-lg">
          <Clock className="w-6 h-6 text-gray-400 mx-auto mb-2" />
          <div className="text-2xl font-bold text-white">23</div>
          <div className="text-sm text-gray-400">days left</div>
        </div>
        <div className="text-center p-4 bg-slate-700/50 rounded-lg">
          <TrendingUp className="w-6 h-6 text-gray-400 mx-auto mb-2" />
          <div className="text-2xl font-bold text-white">200K</div>
          <div className="text-sm text-gray-400">bottles to go</div>
        </div>
      </div>

      {/* Live Activity Feed */}
      <div className="border-t border-slate-600 pt-4">
        <div className="flex items-center mb-2">
          <div className="w-2 h-2 bg-red-500 rounded-full mr-2 animate-pulse"></div>
          <span className="text-sm text-gray-300">LIVE: Planet Heroes in Action</span>
        </div>

        <div className="space-y-2 text-sm">
          <div className="text-gray-300">🎉 Sarah M. just became Level 2!</div>
          <div className="text-gray-300">🏅 Ahmed K. earned "Water Warrior"</div>
          <div className="text-gray-300">⚡ Fatima A. prevented 500 bottles</div>
          <div className="text-gray-300">🚀 YOU could be next! Join the mission</div>
        </div>
        
        {/* Live Challenge CTA */}
        <div className="mt-4 pt-4 border-t border-slate-600">
          <button
            onClick={() => {
              const challengeLink = `https://deliwer.com/challenge?ref=LIVE${Math.random().toString(36).substr(2, 4).toUpperCase()}`;
              const shareText = `🔥 Join Dubai's LIVE Community Challenge! 1 Million Bottles to Prevent by Ramadan - 80% Complete! Get Bakers Kitchen Dirham 100 Kangen Water voucher: ${challengeLink}`;
              
              if (navigator.share) {
                navigator.share({ title: 'Join LIVE Community Challenge', text: shareText, url: challengeLink });
              } else {
                navigator.clipboard.writeText(shareText);
                window.open('/?utm_source=live_challenge&utm_medium=share_cta', '_blank');
              }
            }}
            className="w-full bg-gradient-to-r from-red-500 to-orange-500 hover:from-red-600 hover:to-orange-600 text-white px-4 py-2 rounded-lg font-bold transition-all flex items-center justify-center"
          >
            <Flame className="w-4 h-4 mr-2" />
            Share Challenge & Join
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
        title="Trade Your iPhone for DXBs - Dubai Carbon Tokens Rewards"
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

      {/* PHASE 1: PLAY (Attraction) - Dual-Purpose Hero with Founder Stories */}
      <DualPurposeHero />

      {/* PHASE 4: HOME SERVICE - Unified AquaCafe + Trade-in */}
      <HomeServiceSection />

      {/* PHASE 2: EARN (Participation) - Planet Points Challenge & Rewards */}
      <HeroChallengeLanding />

      {/* Trade-In Banner - Prominent CTA for trade-ins (Part of Earn) */}
      <div className="py-8 px-4">
        <TradeInBanner />
      </div>

      {/* PHASE 3: LEADERBOARD (Belonging) - Social Proof Section */}
      {/* Hidden Community Leaderboard Section */}
      {/* <LeaderboardSocialProof /> */}

      {/* Sustainability Section - Stars Sponsorship */}
      <StarsSponsorshipSection />

      {/* Testimonials Section */}
      <TestimonialsSection />

      {/* Trust Elements Section */}
      <TrustElements />

      {/* PHASE 5: RELOCATE (Monetization) - Conversion Bridge */}
      {/* Hidden Relocate Section */}
      {/* <section className="py-16 px-4 bg-gradient-to-br from-amber-900/20 via-orange-900/10 to-red-900/20">
        ...
      </section> */}

      {/* B2B Wholesale Solutions - Concise Footer Section */}
      <section className="py-12 px-4 bg-gradient-to-b from-slate-900 to-slate-950">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-white mb-2">
              B2B Solutions
            </h2>
            <p className="text-gray-400">
              Bulk procurement & fulfillment for wholesale buyers
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-slate-800/50 rounded-xl p-6 border border-blue-500/20">
              <div className="flex items-center gap-2 mb-3">
                <Gavel className="w-5 h-5 text-blue-400" />
                <h3 className="text-lg font-bold text-white">ChainTrack</h3>
              </div>
              <p className="text-sm text-gray-400 mb-4">Reverse auctions for bulk iPhone procurement</p>
              <Link href="/chaintrack">
                <Button variant="outline" size="sm" className="w-full border-blue-500/50" data-testid="button-chaintrack-footer">
                  Learn More <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </Link>
            </div>

            <div className="bg-slate-800/50 rounded-xl p-6 border border-purple-500/20">
              <div className="flex items-center gap-2 mb-3">
                <ShoppingCart className="w-5 h-5 text-purple-400" />
                <h3 className="text-lg font-bold text-white">Fulfillment by DeliWer</h3>
              </div>
              <p className="text-sm text-gray-400 mb-4">Dropship program with quality guarantee</p>
              <Link href="/fulfillment">
                <Button variant="outline" size="sm" className="w-full border-purple-500/50" data-testid="button-fulfillment-footer">
                  Learn More <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Founders Section */}
      <FoundersSection />

    </div>
  );
}