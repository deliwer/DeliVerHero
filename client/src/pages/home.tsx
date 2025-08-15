import { useState, useEffect } from "react";
import { HeroChallengeLanding } from "@/components/hero-challenge-landing";
import { IPhone17Launch } from "@/components/iphone17-launch";
import { InstantImpactUnlocks } from "@/components/instant-impact-unlocks";
import { ImpactSlotMachine } from "@/components/impact-slot-machine";
import { LeaderboardWidget } from "@/components/leaderboard-widget";
import { AIConcierge } from "@/components/ai-concierge";
import { ImpactStats } from "@/components/impact-stats";
import { HeroOnboardingTutorial } from "@/components/hero-onboarding-tutorial";
import { LiveActivityFeed } from "@/components/live-activity-feed";
import { TooltipHintsDemo } from "@/components/tooltip-hints-demo";
import { Flame, Clock, TrendingUp, Play } from "lucide-react";
import { Button } from "@/components/ui/button";

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

      {/* Interactive Slot Machine */}
      <ImpactSlotMachine />

      {/* Leaderboard & Challenge Section */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-white mb-4">
              🏆 DUBAI ENVIRONMENTAL CHAMPIONS
            </h2>
            <p className="text-gray-300 text-lg">Real-time leaderboard of planet heroes making impact</p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            <div data-testid="leaderboard">
              <LeaderboardWidget showHeader={false} />
            </div>
            <div className="space-y-6">
              <LiveChallengeWidget />
              <LiveActivityFeed />
            </div>
          </div>
        </div>
      </section>

      {/* AI Concierge */}
      <AIConcierge />

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
        </div>
      </section>

      {/* Tooltip Hints Demo Panel */}
      <TooltipHintsDemo />
    </div>
  );
}