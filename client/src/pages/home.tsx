import { useState, useEffect } from "react";
import { AIInteractiveHero } from "@/components/ai-interactive-hero";
import { HeroChallengeLanding } from "@/components/hero-challenge-landing";
import { IPhone17Launch } from "@/components/iphone17-launch";
import { InstantImpactUnlocks } from "@/components/instant-impact-unlocks";
import { LeaderboardWidget } from "@/components/leaderboard-widget";
import { ImpactStats } from "@/components/impact-stats";
import { HeroOnboardingTutorial } from "@/components/hero-onboarding-tutorial";
import { FoundersSection } from "@/components/founders-section";
import { LiveActivityFeed } from "@/components/live-activity-feed";
import { PlanetHeroesRewards } from "@/components/planet-heroes-rewards";
import { MeetDeliInteractive } from "@/components/meet-deli-interactive";
import { Flame, Clock, TrendingUp, Play, Building, Heart, Users, Award, ChevronRight, Handshake, ShoppingCart, ChefHat, CheckCircle, Gift, Crown, Trophy, Sparkles, Rocket, Star, Zap, ChevronDown, ChevronUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";

function OpportunitiesSection() {
  return (
    <section className="py-12 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="glass rounded-3xl p-8 border border-emerald-500/30 bg-gradient-to-br from-emerald-600/10 via-teal-600/10 to-blue-600/10 ring-4 ring-yellow-400/50 shadow-lg shadow-yellow-400/20">
          <div className="text-center mb-8">
            <div className="flex items-center justify-center gap-3 mb-4">
              <Building className="w-8 h-8 text-emerald-400" />
              <h2 className="text-3xl font-bold text-white">BEYOND ETISALAT & DU</h2>
              <Handshake className="w-8 h-8 text-blue-400" />
            </div>
            <p className="text-gray-300 text-lg max-w-3xl mx-auto">
              World's first cross-category trade platform. While others stay in electronics, we connect your iPhone to life essentials.
            </p>
          </div>
          
          <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 mb-8">
            {/* iPhone Trade Advantage */}
            <div className="glass rounded-2xl p-6 border border-amber-500/30 bg-amber-600/5 hover:bg-amber-600/10 transition-all duration-300 group cursor-pointer">
              <div className="text-center mb-4">
                <Building className="w-10 h-10 text-amber-400 mx-auto mb-3" />
                <h3 className="text-xl font-bold text-white mb-2">iPHONE TRADE LEADERS</h3>
                <p className="text-gray-300 text-sm">Cross-category advantage</p>
              </div>
              <div className="space-y-3 mb-6 opacity-0 group-hover:opacity-100 max-h-0 group-hover:max-h-40 overflow-hidden transition-all duration-500">
                <div className="flex justify-between items-center text-sm">
                  <span className="text-gray-400">vs Etisalat/Du</span>
                  <span className="text-amber-400 font-bold">+Water Systems</span>
                </div>
                <div className="flex justify-between items-center text-sm">
                  <span className="text-gray-400">Trade Categories</span>
                  <span className="text-amber-400 font-bold">Cross-Category</span>
                </div>
                <div className="flex justify-between items-center text-sm">
                  <span className="text-gray-400">Global First</span>
                  <span className="text-amber-400 font-bold">iPhone→Water</span>
                </div>
              </div>
              <Link
                href="/partners"
                className="w-full bg-amber-600 hover:bg-amber-500 text-white px-4 py-3 rounded-lg font-bold transition-all text-center inline-block"
                data-testid="button-trade-iphone"
              >
                Start Trade-in Partnership
              </Link>
            </div>

            {/* Gitex Launch Special */}
            <div className="glass rounded-2xl p-6 border border-hero-green-500/30 bg-hero-green-600/5 hover:bg-hero-green-600/10 transition-all duration-300 group cursor-pointer">
              <div className="text-center mb-4">
                <Heart className="w-10 h-10 text-hero-green-400 mx-auto mb-3" />
                <h3 className="text-xl font-bold text-white mb-2">GITEX 2025 LAUNCH</h3>
                <p className="text-gray-300 text-sm">iPhone 17 cash preparation</p>
              </div>
              <div className="space-y-3 mb-6 opacity-0 group-hover:opacity-100 max-h-0 group-hover:max-h-40 overflow-hidden transition-all duration-500">
                <div className="flex justify-between items-center text-sm">
                  <span className="text-gray-400">Trade Now</span>
                  <span className="text-hero-green-400 font-bold">Get Cash</span>
                </div>
                <div className="flex justify-between items-center text-sm">
                  <span className="text-gray-400">iPhone 17 Launch</span>
                  <span className="text-hero-green-400 font-bold">First in Line</span>
                </div>
                <div className="flex justify-between items-center text-sm">
                  <span className="text-gray-400">Water Systems</span>
                  <span className="text-hero-green-400 font-bold">Included</span>
                </div>
              </div>
              <Link
                href="/aquacafe"
                className="w-full bg-hero-green-600 hover:bg-hero-green-500 text-white px-4 py-3 rounded-lg font-bold transition-all text-center inline-block"
                data-testid="button-gitex-launch"
              >
                Get Starter Kit - AED 99
              </Link>
            </div>

            {/* Media Story */}
            <div className="glass rounded-2xl p-6 border border-purple-500/30 bg-purple-600/5 hover:bg-purple-600/10 transition-all duration-300 group cursor-pointer">
              <div className="text-center mb-4">
                <Users className="w-10 h-10 text-purple-400 mx-auto mb-3" />
                <h3 className="text-xl font-bold text-white mb-2">MEDIA SPOTLIGHT</h3>
                <p className="text-gray-300 text-sm">Revolutionary trade story</p>
              </div>
              <div className="space-y-3 mb-6 opacity-0 group-hover:opacity-100 max-h-0 group-hover:max-h-40 overflow-hidden transition-all duration-500">
                <div className="flex justify-between items-center text-sm">
                  <span className="text-gray-400">Global First</span>
                  <span className="text-purple-400 font-bold">Cross-Category</span>
                </div>
                <div className="flex justify-between items-center text-sm">
                  <span className="text-gray-400">Market Disruption</span>
                  <span className="text-purple-400 font-bold">Beyond Telcos</span>
                </div>
                <div className="flex justify-between items-center text-sm">
                  <span className="text-gray-400">Rally Story</span>
                  <span className="text-purple-400 font-bold">iPhone→Water</span>
                </div>
              </div>
              <button
                onClick={() => {
                  const mediaKit = `https://deliwer.com/media-kit?story=iphone-water-trade`;
                  const shareText = `📰 BREAKING: World's first iPhone-to-Water trade platform launches at GITEX 2025! DeliWer disrupts Etisalat/Du with cross-category trading. Media kit: ${mediaKit}`;
                  
                  if (navigator.share) {
                    navigator.share({ title: 'DeliWer Media Story', text: shareText, url: mediaKit });
                  } else {
                    navigator.clipboard.writeText(shareText);
                  }
                }}
                className="w-full bg-purple-600 hover:bg-purple-500 text-white px-4 py-3 rounded-lg font-bold transition-all text-center"
                data-testid="button-media-kit"
              >
                Download Media Kit
              </button>
            </div>
          </div>
          
          <div className="text-center space-y-4">
            <p className="text-gray-400 text-sm">
              🤝 Cross-category trade advantage • 📈 iPhone 17 launch campaign • 🌍 Media ready sustainability story
            </p>
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
              const shareText = `🔥 Join Dubai's LIVE Community Challenge! 1 Million Bottles to Prevent by Ramadan - 80% Complete! Get Bakers Kitchen AED100 Kangen Water voucher: ${challengeLink}`;
              
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
  const [showPartnershipSection, setShowPartnershipSection] = useState(false);
  const [isTombolaExpanded, setIsTombolaExpanded] = useState(false);

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

      {/* AI Interactive Hero Section - New modular hero at the top */}
      <AIInteractiveHero />

      {/* Enhanced Hero Challenge Landing with Planet Points Challenge - Now includes How It Works flow */}
      <HeroChallengeLanding />

      {/* Partnership & Starter Kit Convergence Section - Now Collapsible for Partners */}
      <section className="py-12 px-4 bg-gradient-to-b from-slate-900 via-blue-900 to-slate-900">
        <div className="max-w-6xl mx-auto">
          {/* Collapsible Header */}
          <div className="text-center mb-8">
            <Button
              onClick={() => setShowPartnershipSection(!showPartnershipSection)}
              size="lg"
              className="bg-gradient-to-r from-emerald-600 to-blue-600 hover:from-emerald-700 hover:to-blue-700 text-white px-8 py-6 text-xl font-bold shadow-xl"
              data-testid="button-toggle-partnership"
            >
              <Handshake className="w-6 h-6 mr-3" />
              {showPartnershipSection ? 'Hide' : 'Join the'} Sustainability Journey
              {showPartnershipSection ? <ChevronUp className="w-6 h-6 ml-3" /> : <ChevronDown className="w-6 h-6 ml-3" />}
            </Button>
            <p className="text-gray-400 mt-4">
              {showPartnershipSection ? 'Explore partnership opportunities below' : 'Click to explore partnership opportunities for businesses and organizations'}
            </p>
          </div>

          {/* Collapsible Content */}
          {showPartnershipSection && (
            <div className="animate-in slide-in-from-top duration-500">
              <div className="text-center mb-12">
                <h2 className="text-4xl md:text-6xl font-bold text-white mb-6">
                  Discover Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-green-400">Sustainability Journey</span>
                </h2>
                <p className="text-xl text-gray-300 max-w-4xl mx-auto">
                  Every path to environmental impact is unique. Whether you're exploring individual solutions, considering corporate sustainability, or building community initiatives - we're here to help you find what works best for your goals.
                </p>
              </div>

          <div className="grid md:grid-cols-3 gap-8 mb-12">
            {/* Individual Trade-in */}
            <div className="bg-slate-800/50 rounded-2xl p-8 border border-cyan-500/30 hover:bg-slate-800/70 transition-all duration-300 group cursor-pointer">
              <div className="w-16 h-16 bg-cyan-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
                <Users className="w-8 h-8 text-cyan-400" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">Individual Explorer</h3>
              <p className="text-gray-300 mb-6 opacity-100 group-hover:opacity-80">Perfect for those curious about device recycling and water conservation.</p>
              <div className="space-y-2 text-sm text-gray-400 mb-8 opacity-0 group-hover:opacity-100 max-h-0 group-hover:max-h-32 overflow-hidden transition-all duration-500">
                <div>✓ Device valuation & trade</div>
                <div>✓ Water filtration credits</div>
                <div>✓ Planet Points earning</div>
                <div>✓ Loyalty member benefits</div>
              </div>
              <Link 
                href="/aquacafe"
                className="inline-flex items-center justify-center w-full bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-700 hover:to-blue-700 text-white px-6 py-3 rounded-lg font-semibold transition-all"
              >
                Learn More
                <ChevronRight className="w-5 h-5 ml-2" />
              </Link>
            </div>

            {/* Corporate Partnership */}
            <div className="bg-slate-800/50 rounded-2xl p-8 border border-emerald-500/30 transform scale-105 hover:bg-slate-800/70 transition-all duration-300 group cursor-pointer">
              <div className="w-16 h-16 bg-emerald-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
                <Building className="w-8 h-8 text-emerald-400" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">Corporate Solutions</h3>
              <p className="text-gray-300 mb-6 opacity-100 group-hover:opacity-80">Designed for organizations interested in comprehensive sustainability programs.</p>
              <div className="space-y-2 text-sm text-gray-400 mb-8 opacity-0 group-hover:opacity-100 max-h-0 group-hover:max-h-32 overflow-hidden transition-all duration-500">
                <div>✓ Bulk device processing</div>
                <div>✓ ESG impact reporting</div>
                <div>✓ Employee engagement</div>
                <div>✓ Enterprise discounts</div>
              </div>
              <Link 
                href="/partners"
                className="inline-flex items-center justify-center w-full bg-gradient-to-r from-emerald-600 to-green-600 hover:from-emerald-700 hover:to-green-700 text-white px-6 py-3 rounded-lg font-semibold transition-all"
              >
                Explore Options
                <ChevronRight className="w-5 h-5 ml-2" />
              </Link>
            </div>

            {/* Community CSR */}
            <div className="bg-slate-800/50 rounded-2xl p-8 border border-purple-500/30 hover:bg-slate-800/70 transition-all duration-300 group cursor-pointer">
              <div className="w-16 h-16 bg-purple-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
                <Heart className="w-8 h-8 text-purple-400" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">Community Initiatives</h3>
              <p className="text-gray-300 mb-6 opacity-100 group-hover:opacity-80">Ideal for neighborhoods and communities who want to collaborate on sustainability goals.</p>
              <div className="space-y-2 text-sm text-gray-400 mb-8 opacity-0 group-hover:opacity-100 max-h-0 group-hover:max-h-32 overflow-hidden transition-all duration-500">
                <div>✓ Community leaderboards</div>
                <div>✓ Shared starter kits</div>
                <div>✓ Collective impact tracking</div>
                <div>✓ Group rewards & benefits</div>
              </div>
              <Link 
                href="/leaderboard"
                className="inline-flex items-center justify-center w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-6 py-3 rounded-lg font-semibold transition-all"
              >
                Discover Benefits
                <ChevronRight className="w-5 h-5 ml-2" />
              </Link>
            </div>
          </div>

          {/* Unified Starter Kit CTA */}
          <div className="bg-gradient-to-r from-blue-900/50 to-green-900/50 rounded-3xl p-12 border border-cyan-500/30">
            <div className="max-w-4xl mx-auto">
              <h3 className="text-3xl md:text-4xl font-bold text-white mb-6">
                🌱 Consider Our Starter Kit: AED 99
              </h3>
              <p className="text-xl text-gray-300 mb-8">
                For those ready to take the next step, our starter kit provides everything you need to begin your sustainability journey. Includes complimentary installation (AED 299 value) and access to our complete ecosystem.
              </p>
              
              <div className="grid md:grid-cols-2 gap-8 mb-8">
                <div className="text-left">
                  <h4 className="text-lg font-semibold text-white mb-4">Included in Starter Kit:</h4>
                  <div className="space-y-2 text-gray-300">
                    <div className="flex items-center"><Award className="w-4 h-4 text-green-400 mr-2" />5-Stage Water Filtration System</div>
                    <div className="flex items-center"><Award className="w-4 h-4 text-green-400 mr-2" />FREE Professional Installation (AED 299 value)</div>
                    <div className="flex items-center"><Award className="w-4 h-4 text-green-400 mr-2" />Loyalty Membership Access</div>
                    <div className="flex items-center"><Award className="w-4 h-4 text-green-400 mr-2" />Planet Points Earning System</div>
                  </div>
                </div>
                <div className="text-left">
                  <h4 className="text-lg font-semibold text-white mb-4">Membership Benefits:</h4>
                  <div className="space-y-2 text-gray-300">
                    <div className="flex items-center"><Award className="w-4 h-4 text-blue-400 mr-2" />Device Trade-in Priority</div>
                    <div className="flex items-center"><Award className="w-4 h-4 text-blue-400 mr-2" />Partnership Program Access</div>
                    <div className="flex items-center"><Award className="w-4 h-4 text-blue-400 mr-2" />Community Challenges</div>
                    <div className="flex items-center"><Award className="w-4 h-4 text-blue-400 mr-2" />Exclusive Discounts & Rewards</div>
                  </div>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  href="/aquacafe"
                  className="inline-flex items-center justify-center bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white px-8 py-4 rounded-xl text-lg font-bold transition-all transform hover:scale-105"
                >
                  <ShoppingCart className="w-6 h-6 mr-3" />
                  View Starter Kit Details
                </Link>
                <Link
                  href="/partners"
                  className="inline-flex items-center justify-center border-2 border-cyan-500 text-cyan-400 hover:bg-cyan-500 hover:text-white px-8 py-4 rounded-xl text-lg font-bold transition-all transform hover:scale-105"
                >
                  <Handshake className="w-6 h-6 mr-3" />
                  Learn About Partnerships
                </Link>
              </div>
            </div>
          </div>
            </div>
          )}
        </div>
      </section>

      {/* Instant Impact Unlocks */}
      <InstantImpactUnlocks />

      {/* La Perle Aqua Show CTA - New Tombola Prizes - Collapsible */}
      <section className="py-4 px-4 bg-gradient-to-br from-blue-600 via-cyan-600 to-teal-600 relative overflow-hidden">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="absolute inset-0">
          <div className="absolute top-10 left-10 w-32 h-32 bg-white/10 rounded-full animate-pulse"></div>
          <div className="absolute bottom-10 right-10 w-24 h-24 bg-blue-300/20 rounded-full animate-bounce"></div>
          <div className="absolute top-1/2 left-1/4 w-16 h-16 bg-cyan-300/30 rounded-full animate-ping"></div>
        </div>
        
        <div className="relative max-w-7xl mx-auto">
          {/* Collapsible Header */}
          <div className="text-center mb-6">
            <button
              onClick={() => setIsTombolaExpanded(!isTombolaExpanded)}
              className="inline-flex items-center gap-3 bg-gradient-to-r from-blue-500/30 to-cyan-500/30 hover:from-blue-500/40 hover:to-cyan-500/40 px-8 py-4 rounded-full border border-cyan-400/50 shadow-lg shadow-cyan-400/20 transition-all"
              data-testid="button-toggle-tombola"
            >
              <Gift className="w-8 h-8 text-cyan-300" />
              <span className="text-2xl font-bold text-white">🌊 Win Aqua Show Experience Tickets</span>
              {isTombolaExpanded ? (
                <ChevronUp className="w-6 h-6 text-white" />
              ) : (
                <ChevronDown className="w-6 h-6 text-white animate-bounce" />
              )}
            </button>
          </div>

          {isTombolaExpanded && (
            <>
              <div className="text-center mb-12">
                <div className="inline-flex items-center gap-3 bg-gradient-to-r from-blue-500/20 to-cyan-500/20 px-8 py-4 rounded-full mb-8 border border-cyan-400/50 shadow-lg shadow-cyan-400/20">
                  <Gift className="w-8 h-8 text-cyan-300 animate-spin" />
                  <span className="text-2xl font-bold text-white">🌊 NEW TOMBOLA PRIZES</span>
                  <Trophy className="w-8 h-8 text-blue-300 animate-bounce" />
                </div>
                
                <h2 className="text-4xl md:text-6xl font-bold text-white mb-6">
                  Win Aqua Show
                  <span className="block text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 to-blue-300">
                    Experience Tickets
                  </span>
                </h2>
                
                <p className="text-xl text-white/90 max-w-4xl mx-auto mb-8">
                  Premium members can now win exclusive <strong>La Perle by Dragone</strong> aqua show experience tickets through our enhanced tombola system. 
                  From Silver seating to VIP backstage tours - Dubai's most extraordinary entertainment awaits at the world-renowned aquatic theater!
                </p>
              </div>

              <div className="grid md:grid-cols-3 gap-8 mb-12">
            {/* Silver Experience */}
            <div className="bg-white/10 backdrop-blur-sm rounded-3xl p-8 border border-gray-300/20 hover:bg-white/15 transition-all duration-300 transform hover:scale-105">
              <div className="text-center">
                <div className="w-16 h-16 bg-gray-400 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Award className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-4">🥈 Silver Experience</h3>
                <div className="text-4xl font-bold text-gray-300 mb-2">5% Chance</div>
                <div className="text-white/80 mb-6">Premium seating for Dubai's #1 aqua show</div>
                <div className="space-y-2 text-sm text-white/70">
                  <div>✨ Silver section seating</div>
                  <div>🎭 Full show experience</div>
                  <div>📅 6-month validity</div>
                  <div>🏆 200 XP + 300 Points</div>
                </div>
              </div>
            </div>

            {/* Gold Experience */}
            <div className="bg-white/15 backdrop-blur-sm rounded-3xl p-8 border-2 border-yellow-400/40 hover:bg-white/20 transition-all duration-300 transform hover:scale-105 shadow-xl shadow-yellow-400/20">
              <div className="text-center">
                <div className="w-16 h-16 bg-yellow-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Crown className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-4">🥇 Gold Experience</h3>
                <div className="text-4xl font-bold text-yellow-400 mb-2">1% Chance</div>
                <div className="text-white/80 mb-6">Premium seating plus refreshments</div>
                <div className="space-y-2 text-sm text-white/70">
                  <div>⭐ Gold section seating</div>
                  <div>🥂 Welcome refreshments</div>
                  <div>📅 6-month validity</div>
                  <div>🏆 500 XP + 750 Points</div>
                </div>
              </div>
            </div>

            {/* VIP Experience */}
            <div className="bg-gradient-to-br from-purple-500/20 to-pink-500/20 backdrop-blur-sm rounded-3xl p-8 border-2 border-purple-400/50 hover:from-purple-500/30 hover:to-pink-500/30 transition-all duration-300 transform hover:scale-105 shadow-xl shadow-purple-400/30">
              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Sparkles className="w-8 h-8 text-white animate-pulse" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-4">💎 VIP Experience</h3>
                <div className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400 mb-2">0.5% Chance</div>
                <div className="text-white/80 mb-6">Ultimate experience with backstage tour</div>
                <div className="space-y-2 text-sm text-white/70">
                  <div>👑 VIP section seating</div>
                  <div>🎭 Backstage tour included</div>
                  <div>🍽️ Premium dinner experience</div>
                  <div>🏆 1000 XP + 1500 Points</div>
                </div>
              </div>
            </div>
          </div>

          <div className="text-center">
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 mb-8 border border-white/20 max-w-4xl mx-auto">
              <h3 className="text-3xl font-bold text-white mb-4">🎰 Ready to Win Your Aqua Show Experience?</h3>
              <p className="text-white/90 text-lg mb-6">
                Premium members get exclusive access to these extraordinary entertainment experiences. 
                Start playing to unlock your chance at Dubai's most breathtaking aquatic performances!
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <Link href="/play">
                  <Button className="bg-gradient-to-r from-cyan-400 to-blue-500 text-white hover:from-cyan-500 hover:to-blue-600 text-xl px-10 py-4 rounded-full font-bold shadow-2xl transition-all duration-300 hover:scale-105">
                    <Gift className="w-6 h-6 mr-3" />
                    🎰 Play Tombola Now
                  </Button>
                </Link>
                
                <Link href="/aquacafe">
                  <Button className="bg-transparent border-2 border-white text-white hover:bg-white hover:text-cyan-600 text-xl px-10 py-4 rounded-full font-bold transition-all duration-300">
                    <Crown className="w-6 h-6 mr-3" />
                    Become Premium Member
                  </Button>
                </Link>
                
                <div className="flex flex-col sm:flex-row gap-3 items-center">
                  <a 
                    href="https://www.laperle.com" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="bg-gradient-to-r from-blue-500 to-purple-500 text-white hover:from-blue-600 hover:to-purple-600 px-6 py-3 rounded-full font-bold shadow-lg transition-all duration-300 hover:scale-105 text-center"
                    data-testid="button-laperle-website"
                  >
                    🎭 Visit laperle.com
                  </a>
                  <a 
                    href="https://laperle.platinumlist.net/event-tickets/52238/la-perle-by-dragone" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-white/90 hover:text-white text-lg underline decoration-cyan-300 underline-offset-4 transition-all duration-300 hover:decoration-2"
                    data-testid="link-laperle-tickets"
                  >
                    🎫 Book Tickets
                  </a>
                </div>
              </div>
              
              <div className="text-sm text-white/80 mt-4">
                ✨ Premium membership required for enhanced tombola prizes ✨
              </div>
            </div>
              </div>
            </>
          )}
        </div>
      </section>

      {/* Founders Section */}
      <FoundersSection />

    </div>
  );
}