import { useState, useEffect } from "react";
import { HeroChallengeLanding } from "@/components/hero-challenge-landing";
import { IPhone17Launch } from "@/components/iphone17-launch";
import { InstantImpactUnlocks } from "@/components/instant-impact-unlocks";

import { LeaderboardWidget } from "@/components/leaderboard-widget";
import { ImpactStats } from "@/components/impact-stats";
import { HeroOnboardingTutorial } from "@/components/hero-onboarding-tutorial";
import { LiveActivityFeed } from "@/components/live-activity-feed";
import { Flame, Clock, TrendingUp, Play, Building, Heart, Users, Award, ChevronRight, Handshake } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";

function OpportunitiesSection() {
  return (
    <section className="py-12 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="glass rounded-3xl p-8 border border-emerald-500/30 bg-gradient-to-br from-emerald-600/10 via-teal-600/10 to-blue-600/10">
          <div className="text-center mb-8">
            <div className="flex items-center justify-center gap-3 mb-4">
              <Building className="w-8 h-8 text-emerald-400" />
              <h2 className="text-3xl font-bold text-white">JOIN THE MOVEMENT</h2>
              <Handshake className="w-8 h-8 text-blue-400" />
            </div>
            <p className="text-gray-300 text-lg max-w-3xl mx-auto">
              Multiple ways to contribute to Dubai's environmental transformation
            </p>
          </div>
          
          <div className="grid lg:grid-cols-3 gap-6 mb-8">
            {/* Partnership Opportunities */}
            <div className="glass rounded-2xl p-6 border border-emerald-500/30 bg-emerald-600/5">
              <div className="text-center mb-4">
                <Building className="w-10 h-10 text-emerald-400 mx-auto mb-3" />
                <h3 className="text-xl font-bold text-white mb-2">PARTNER WITH US</h3>
                <p className="text-gray-300 text-sm">Organizations & businesses</p>
              </div>
              <div className="space-y-3 mb-6">
                <div className="flex justify-between items-center text-sm">
                  <span className="text-gray-400">Active Partners</span>
                  <span className="text-emerald-400 font-bold">50+</span>
                </div>
                <div className="flex justify-between items-center text-sm">
                  <span className="text-gray-400">Funded Missions</span>
                  <span className="text-emerald-400 font-bold">200+</span>
                </div>
                <div className="flex justify-between items-center text-sm">
                  <span className="text-gray-400">Total Investment</span>
                  <span className="text-emerald-400 font-bold">AED 50K+</span>
                </div>
              </div>
              <Link
                href="/partners"
                className="w-full bg-emerald-600 hover:bg-emerald-500 text-white px-4 py-3 rounded-lg font-bold transition-all text-center inline-block"
                data-testid="button-become-partner"
              >
                Become a Partner
              </Link>
            </div>

            {/* Sponsorship Opportunities */}
            <div className="glass rounded-2xl p-6 border border-blue-500/30 bg-blue-600/5">
              <div className="text-center mb-4">
                <Heart className="w-10 h-10 text-blue-400 mx-auto mb-3" />
                <h3 className="text-xl font-bold text-white mb-2">SPONSOR MISSIONS</h3>
                <p className="text-gray-300 text-sm">Fund environmental challenges</p>
              </div>
              <div className="space-y-3 mb-6">
                <div className="flex justify-between items-center text-sm">
                  <span className="text-gray-400">Bronze Tier</span>
                  <span className="text-blue-400 font-bold">AED 500</span>
                </div>
                <div className="flex justify-between items-center text-sm">
                  <span className="text-gray-400">Silver Tier</span>
                  <span className="text-blue-400 font-bold">AED 2K</span>
                </div>
                <div className="flex justify-between items-center text-sm">
                  <span className="text-gray-400">Gold & Platinum</span>
                  <span className="text-blue-400 font-bold">AED 5K+</span>
                </div>
              </div>
              <Link
                href="/sponsorships"
                className="w-full bg-blue-600 hover:bg-blue-500 text-white px-4 py-3 rounded-lg font-bold transition-all text-center inline-block"
                data-testid="button-sponsor-mission"
              >
                Sponsor a Mission
              </Link>
            </div>

            {/* Ambassador Program */}
            <div className="glass rounded-2xl p-6 border border-amber-500/30 bg-amber-600/5">
              <div className="text-center mb-4">
                <Users className="w-10 h-10 text-amber-400 mx-auto mb-3" />
                <h3 className="text-xl font-bold text-white mb-2">BECOME AMBASSADOR</h3>
                <p className="text-gray-300 text-sm">Earn while making impact</p>
              </div>
              <div className="space-y-3 mb-6">
                <div className="flex justify-between items-center text-sm">
                  <span className="text-gray-400">Starter Kit Commission</span>
                  <span className="text-amber-400 font-bold">35%</span>
                </div>
                <div className="flex justify-between items-center text-sm">
                  <span className="text-gray-400">Trade-in Commission</span>
                  <span className="text-amber-400 font-bold">25%</span>
                </div>
                <div className="flex justify-between items-center text-sm">
                  <span className="text-gray-400">Monthly Potential</span>
                  <span className="text-amber-400 font-bold">AED 4,200+</span>
                </div>
              </div>
              <button
                onClick={() => {
                  const affiliateSignupLink = `https://goaffpro.com/signup/deliwer?ref=AMBASSADOR${Math.random().toString(36).substr(2, 6).toUpperCase()}`;
                  const shareText = `💰 Become a DeliWer Ambassador! Earn AED 4,200+ monthly promoting sustainable tech trades and Bakers Kitchen AED100 Kangen Water vouchers. Join the affiliate network: ${affiliateSignupLink}`;
                  
                  if (navigator.share) {
                    navigator.share({ 
                      title: 'Join DeliWer Ambassador Program', 
                      text: shareText, 
                      url: affiliateSignupLink 
                    });
                  } else {
                    navigator.clipboard.writeText(shareText);
                    window.open('/partners?utm_source=home&utm_medium=ambassador_cta&utm_campaign=goaffpro_signup', '_blank');
                  }
                }}
                className="w-full bg-amber-600 hover:bg-amber-500 text-white px-4 py-3 rounded-lg font-bold transition-all text-center"
                data-testid="button-join-ambassadors"
              >Join Ambassadors</button>
            </div>
          </div>
          
          <div className="text-center space-y-4">
            <p className="text-gray-400 text-sm">
              🤝 Multiple partnership models available • 📈 Performance-based rewards • 🌍 Measurable environmental impact
            </p>
            
            {/* Additional Ambassador CTAs */}
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <button
                onClick={() => {
                  const whatsappLink = `https://wa.me/971523946311?text=Hi! I'm interested in becoming a GOAFFPRO Ambassador for DeliWer. Can you share more details about the AED 4,200+ monthly earning potential and the Bakers Kitchen partnership program?`;
                  const shareText = `💬 Get instant info on DeliWer Ambassador Program! WhatsApp for AED 4,200+ earning details: ${whatsappLink}`;
                  
                  if (navigator.share) {
                    navigator.share({ title: 'Ambassador Program Info', text: shareText, url: whatsappLink });
                  } else {
                    window.open(whatsappLink, '_blank');
                  }
                }}
                className="inline-flex items-center bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
              >
                <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.890-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.515z"/>
                </svg>
                WhatsApp Info
              </button>
              
              <button
                onClick={() => {
                  const videoLink = 'https://deliwer.com/ambassador-training?ref=HOME_CTA';
                  const shareText = `🎬 Watch how to earn AED 4,200+ monthly as DeliWer Ambassador! Free training video: ${videoLink}`;
                  
                  if (navigator.share) {
                    navigator.share({ title: 'Ambassador Training Video', text: shareText, url: videoLink });
                  } else {
                    navigator.clipboard.writeText(shareText);
                    alert('Training link copied! Share with friends to earn referral bonuses.');
                  }
                }}
                className="inline-flex items-center border border-amber-500 text-amber-400 hover:bg-amber-500 hover:text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
              >
                <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M8 5v14l11-7z"/>
                </svg>
                Watch Training
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

  // Check if user has seen onboarding before
  useEffect(() => {
    const seenOnboarding = localStorage.getItem('hero-onboarding-completed');
    if (!seenOnboarding) {
      // Show onboarding after a brief delay for better UX
      const timer = setTimeout(() => {
        setShowOnboarding(true);
      }, 1500);
      return () => clearTimeout(timer);
    } else {
      setHasSeenOnboarding(true);
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

      {/* Enhanced Hero Challenge Landing */}
      <HeroChallengeLanding />

      {/* iPhone 17 Launch Section */}
      <IPhone17Launch />

      {/* Instant Impact Unlocks */}
      <InstantImpactUnlocks />

      {/* Opportunities Section */}
      <OpportunitiesSection />


      {/* Impact Stats */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-white mb-4">
              🌍 LIVE PLANET IMPACT DASHBOARD
            </h2>
            <p className="text-gray-300 text-lg">Real-time environmental superpowers unleashed by our heroes</p>
          </div>
          <ImpactStats />
          
          {/* Additional Action CTAs */}
          <div className="mt-12 grid md:grid-cols-3 gap-6">
            <div className="glass rounded-xl p-6 border border-emerald-500/30 bg-emerald-600/5 text-center">
              <div className="w-16 h-16 bg-emerald-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-emerald-500" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                </svg>
              </div>
              <h3 className="text-xl font-bold text-white mb-2">Become Top Hero</h3>
              <p className="text-gray-300 text-sm mb-4">Climb the leaderboard and earn exclusive rewards</p>
              <button
                onClick={() => {
                  const leaderboardLink = `https://deliwer.com/leaderboard?ref=HERO${Math.random().toString(36).substr(2, 4).toUpperCase()}`;
                  const shareText = `🏆 Challenge me on the DeliWer Planet Heroes Leaderboard! Compete for Bakers Kitchen AED100 Kangen Water vouchers: ${leaderboardLink}`;
                  
                  if (navigator.share) {
                    navigator.share({ title: 'Challenge Friends on Leaderboard', text: shareText, url: leaderboardLink });
                  } else {
                    navigator.clipboard.writeText(shareText);
                    window.open('/leaderboard', '_blank');
                  }
                }}
                className="w-full bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 rounded-lg font-medium transition-colors"
              >
                Challenge Friends
              </button>
            </div>
            
            <div className="glass rounded-xl p-6 border border-blue-500/30 bg-blue-600/5 text-center">
              <div className="w-16 h-16 bg-blue-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-blue-500" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M18 8h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zM12 17c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2zM15.1 8H8.9V6c0-1.71 1.39-3.1 3.1-3.1 1.71 0 3.1 1.39 3.1 3.1v2z"/>
                </svg>
              </div>
              <h3 className="text-xl font-bold text-white mb-2">Get AED 99 Kit</h3>
              <p className="text-gray-300 text-sm mb-4">Planet Hero Starter with FREE shower filter</p>
              <button
                onClick={() => {
                  const aquacafeLink = `https://deliwer.com/aquacafe?ref=KIT${Math.random().toString(36).substr(2, 4).toUpperCase()}`;
                  const shareText = `💧 Get the Planet Hero AED 99 Starter Kit! FREE AquaCafe Shower Filter (AED 399 value) + Bakers Kitchen AED100 voucher: ${aquacafeLink}`;
                  
                  if (navigator.share) {
                    navigator.share({ title: 'Planet Hero Starter Kit', text: shareText, url: aquacafeLink });
                  } else {
                    navigator.clipboard.writeText(shareText);
                    window.open('/aquacafe', '_blank');
                  }
                }}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors"
              >
                Share Kit Deal
              </button>
            </div>
            
            <div className="glass rounded-xl p-6 border border-purple-500/30 bg-purple-600/5 text-center">
              <div className="w-16 h-16 bg-purple-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-purple-500" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M16 1H4c-1.1 0-2 .9-2 2v14h2V3h12V1zm3 4H8c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h11c1.1 0 2-.9 2-2V7c0-1.1-.9-2-2-2zm-1 16H9V7h9v14z"/>
                </svg>
              </div>
              <h3 className="text-xl font-bold text-white mb-2">Trade iPhone</h3>
              <p className="text-gray-300 text-sm mb-4">Instant valuation and eco-impact calculation</p>
              <button
                onClick={() => {
                  const tradeLink = `https://deliwer.com/?section=calculator&ref=TRADE${Math.random().toString(36).substr(2, 4).toUpperCase()}`;
                  const shareText = `📱 Trade your iPhone for premium water systems! Instant valuation + Bakers Kitchen AED100 Kangen Water voucher: ${tradeLink}`;
                  
                  if (navigator.share) {
                    navigator.share({ title: 'iPhone Trade Calculator', text: shareText, url: tradeLink });
                  } else {
                    navigator.clipboard.writeText(shareText);
                    window.open('/#device-simulator', '_blank');
                  }
                }}
                className="w-full bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg font-medium transition-colors"
              >
                Share Calculator
              </button>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}