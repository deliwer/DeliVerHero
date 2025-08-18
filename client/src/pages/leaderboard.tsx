import { Trophy, Crown, Medal, Star } from "lucide-react";
import { useLeaderboard } from "@/hooks/use-leaderboard";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";

export default function Leaderboard() {
  const { data: heroes, isLoading, error } = useLeaderboard(50);

  const getRankIcon = (index: number) => {
    switch (index) {
      case 0: return <Crown className="w-8 h-8 text-amber-500" />;
      case 1: return <Medal className="w-8 h-8 text-slate-400" />;
      case 2: return <Medal className="w-8 h-8 text-amber-600" />;
      default: return <div className="w-8 h-8 bg-slate-600 rounded-full flex items-center justify-center text-white font-bold text-sm">{index + 1}</div>;
    }
  };

  const getLevelBadgeColor = (level: string) => {
    switch (level) {
      case "Gold Hero": return "bg-gradient-to-r from-amber-500 to-orange-500 text-black";
      case "Silver Hero": return "bg-gradient-to-r from-slate-400 to-slate-500 text-white";
      default: return "bg-gradient-to-r from-amber-600 to-amber-700 text-white";
    }
  };

  if (isLoading) {
    return (
      <div className="py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-white mb-4">
              <Trophy className="inline w-8 h-8 text-amber-500 mr-3" />
              DUBAI PLANET HEROES LEADERBOARD
            </h1>
          </div>
          <div className="space-y-4">
            {Array.from({ length: 10 }, (_, i) => (
              <Skeleton key={i} className="h-20 w-full" />
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (error || !heroes) {
    return (
      <div className="py-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl font-bold text-white mb-8">
            <Trophy className="inline w-8 h-8 text-amber-500 mr-3" />
            LEADERBOARD UNAVAILABLE
          </h1>
          <p className="text-gray-300 text-lg mb-8">
            Our heroes are working hard to save the planet! Check back soon for updated rankings.
          </p>
          <Link href="/">
            <Button className="btn-hero px-8 py-4 text-lg" data-testid="button-back-home">
              Start Your Hero Journey
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="py-16 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-white mb-4" data-testid="page-title">
            <Trophy className="inline w-8 h-8 text-amber-500 mr-3" />
            DUBAI PLANET HEROES LEADERBOARD
          </h1>
          <p className="text-gray-300 text-lg">Environmental champions making Dubai sustainable</p>
        </div>

        {/* Enhanced Join Banner with Free Actions */}
        <div className="glass rounded-2xl p-8 mb-8 border border-amber-500/30 bg-gradient-to-r from-amber-500/10 to-orange-500/10">
          <div className="text-center mb-6">
            <Star className="w-12 h-12 text-amber-500 mx-auto mb-4" />
            <h2 className="text-3xl font-bold text-white mb-4">JOIN 12,847 HEROES FOR FREE!</h2>
            <p className="text-gray-300 mb-6">Start collecting points immediately with these 100% free actions</p>
          </div>
          
          {/* Free Actions Grid */}
          <div className="grid md:grid-cols-3 gap-4 mb-6">
            <div className="bg-slate-800/50 rounded-lg p-4 border border-hero-green-500/30">
              <div className="text-center">
                <div className="w-8 h-8 bg-hero-green-500 rounded-full flex items-center justify-center mx-auto mb-2">
                  <span className="text-black font-bold text-sm">1</span>
                </div>
                <h3 className="text-white font-bold text-sm mb-1">Join Leaderboard</h3>
                <p className="text-hero-green-400 font-bold">+25 points</p>
                <p className="text-gray-400 text-xs">Instant on signup</p>
              </div>
            </div>
            
            <div className="bg-slate-800/50 rounded-lg p-4 border border-blue-500/30">
              <div className="text-center">
                <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center mx-auto mb-2">
                  <span className="text-white font-bold text-sm">2</span>
                </div>
                <h3 className="text-white font-bold text-sm mb-1">Complete Profile</h3>
                <p className="text-blue-400 font-bold">+75 points</p>
                <p className="text-gray-400 text-xs">Basic info only</p>
              </div>
            </div>
            
            <div className="bg-slate-800/50 rounded-lg p-4 border border-purple-500/30">
              <div className="text-center">
                <div className="w-8 h-8 bg-purple-500 rounded-full flex items-center justify-center mx-auto mb-2">
                  <span className="text-white font-bold text-sm">3</span>
                </div>
                <h3 className="text-white font-bold text-sm mb-1">Share with Friends</h3>
                <p className="text-purple-400 font-bold">+50 each</p>
                <p className="text-gray-400 text-xs">Unlimited referrals</p>
              </div>
            </div>
          </div>
          
          <div className="text-center">
            <p className="text-sm text-gray-300 mb-4">
              Earn <strong className="text-hero-green-400">150+ FREE points</strong> in under 5 minutes • No credit card required
            </p>
            <Link href="/">
              <Button className="bg-amber-500 hover:bg-amber-600 text-black px-8 py-3 rounded-xl font-bold text-lg transform hover:scale-105 transition-all" data-testid="button-join-leaderboard">
                JOIN FREE & START EARNING
              </Button>
            </Link>
            <p className="text-xs text-gray-500 mt-2">
              Join now • Climb leaderboard • Win iPhone 17 priority access
            </p>
          </div>
        </div>

        {/* Leaderboard */}
        <div className="glass rounded-2xl p-6 border border-slate-600" data-testid="full-leaderboard">
          <div className="space-y-4">
            {heroes.map((hero, index) => (
              <div 
                key={hero.id} 
                className={`flex items-center space-x-6 p-4 rounded-xl transition-all hover:bg-slate-600/30 ${
                  index < 3 ? 'bg-gradient-to-r from-slate-700/50 to-slate-800/50 border border-slate-500' : 'bg-slate-700/30'
                }`}
                data-testid={`leaderboard-hero-${index}`}
              >
                {/* Rank */}
                <div className="flex-shrink-0">
                  {getRankIcon(index)}
                </div>

                {/* Hero Info */}
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-2">
                    <h3 className="text-xl font-bold text-white" data-testid={`hero-name-${index}`}>
                      {hero.name}
                    </h3>
                    <span 
                      className={`px-3 py-1 rounded-full text-sm font-bold ${getLevelBadgeColor(hero.level)}`}
                      data-testid={`hero-level-${index}`}
                    >
                      {hero.level}
                    </span>
                  </div>
                  
                  <div className="flex flex-wrap gap-4 text-sm text-gray-400">
                    <span data-testid={`hero-bottles-${index}`}>
                      💧 {hero.bottlesPrevented.toLocaleString()} bottles saved
                    </span>
                    <span data-testid={`hero-co2-${index}`}>
                      🌱 {(hero.co2Saved / 1000).toFixed(1)}kg CO₂ prevented
                    </span>
                    {hero.referralCount > 0 && (
                      <span data-testid={`hero-referrals-${index}`}>
                        👥 {hero.referralCount} referrals
                      </span>
                    )}
                  </div>

                  {/* Badges */}
                  {hero.badges && Array.isArray(hero.badges) && hero.badges.length > 0 && (
                    <div className="flex flex-wrap gap-2 mt-2">
                      {hero.badges.map((badge: string, badgeIndex: number) => (
                        <span 
                          key={badgeIndex}
                          className="bg-dubai-blue-600 text-white px-2 py-1 rounded text-xs font-medium"
                          data-testid={`hero-badge-${index}-${badgeIndex}`}
                        >
                          🏆 {badge}
                        </span>
                      ))}
                    </div>
                  )}
                </div>

                {/* Points */}
                <div className="text-right flex-shrink-0">
                  <div className="text-3xl font-bold text-hero-green-500" data-testid={`hero-points-${index}`}>
                    {hero.points.toLocaleString()}
                  </div>
                  <div className="text-sm text-gray-400">points</div>
                </div>
              </div>
            ))}
          </div>

          {heroes.length === 0 && (
            <div className="text-center py-12">
              <Trophy className="w-16 h-16 text-gray-600 mx-auto mb-4" />
              <p className="text-gray-400 text-lg">Be the first hero on the leaderboard!</p>
            </div>
          )}
        </div>

        {/* Call to Action */}
        <div className="text-center mt-12">
          <Link href="/">
            <Button className="btn-hero px-8 py-4 text-lg" data-testid="button-start-trading">
              Trade Your iPhone & Join the Heroes
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
