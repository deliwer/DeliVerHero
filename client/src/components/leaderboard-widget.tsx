import { Trophy, Star, Medal } from "lucide-react";
import { useLeaderboard } from "@/hooks/use-leaderboard";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";

interface LeaderboardWidgetProps {
  limit?: number;
  showHeader?: boolean;
}

export function LeaderboardWidget({ limit = 3, showHeader = true }: LeaderboardWidgetProps) {
  const { data: heroes, isLoading, error } = useLeaderboard(limit);

  if (isLoading) {
    return (
      <div className="space-y-4">
        {Array.from({ length: limit }, (_, i) => (
          <Skeleton key={i} className="h-16 w-full" />
        ))}
      </div>
    );
  }

  if (error || !heroes) {
    return (
      <div className="text-center text-gray-400 py-8">
        <p>Unable to load leaderboard</p>
        <p className="text-sm">Check back soon for hero updates!</p>
      </div>
    );
  }

  const getRankIcon = (index: number) => {
    switch (index) {
      case 0: return <div className="w-10 h-10 bg-amber-500 rounded-full flex items-center justify-center text-black font-bold">1</div>;
      case 1: return <div className="w-10 h-10 bg-slate-400 rounded-full flex items-center justify-center text-white font-bold">2</div>;
      case 2: return <div className="w-10 h-10 bg-amber-600 rounded-full flex items-center justify-center text-white font-bold">3</div>;
      default: return <div className="w-10 h-10 bg-slate-600 rounded-full flex items-center justify-center text-white font-bold">{index + 1}</div>;
    }
  };

  const getLevelIcon = (level: string) => {
    switch (level) {
      case "Gold Hero": return <Medal className="w-3 h-3 text-amber-500" />;
      case "Silver Hero": return <Medal className="w-3 h-3 text-slate-400" />;
      default: return <Medal className="w-3 h-3 text-amber-600" />;
    }
  };

  return (
    <div className="glass rounded-2xl p-6 border border-slate-600" data-testid="leaderboard-widget">
      {showHeader && (
        <div className="mb-6">
          <h3 className="text-xl font-bold text-white mb-2 flex items-center">
            <Trophy className="w-6 h-6 text-amber-500 mr-2" />
            TOP PLANET HEROES
          </h3>
          <p className="text-gray-400 text-sm">Real-time environmental champions</p>
        </div>
      )}
      
      {/* Enhanced You Could Be Here Banner */}
      <div className="bg-gradient-to-r from-amber-500/20 to-orange-500/20 border border-amber-500/50 rounded-lg p-4 mb-6" data-testid="could-be-here-banner">
        <div className="text-center">
          <Star className="w-6 h-6 text-amber-500 mx-auto mb-2" />
          <p className="text-white font-bold text-lg">YOU COULD BE HERE!</p>
          <p className="text-gray-300 text-sm mb-3">Start with +150 FREE points today</p>
          <div className="flex justify-center gap-2 mb-3">
            <Link href="/leaderboard">
              <Button className="bg-amber-500 hover:bg-amber-600 text-black px-4 py-2 rounded-lg font-bold text-sm" data-testid="button-join-leaderboard">
                JOIN FREE
              </Button>
            </Link>
            <Link href="/">
              <Button variant="outline" className="border-amber-500 text-amber-500 hover:bg-amber-500 hover:text-black px-4 py-2 rounded-lg font-bold text-sm" data-testid="button-start-earning">
                START EARNING
              </Button>
            </Link>
          </div>
        </div>
      </div>

      {/* Hero List */}
      <div className="space-y-4" data-testid="hero-list">
        {heroes.map((hero, index) => (
          <div key={hero.id} className="flex items-center space-x-4 p-3 bg-slate-700/50 rounded-lg" data-testid={`hero-item-${index}`}>
            {getRankIcon(index)}
            <div className="flex-1">
              <p className="text-white font-semibold" data-testid={`hero-name-${index}`}>{hero.name}</p>
              <p className="text-gray-400 text-sm" data-testid={`hero-impact-${index}`}>Saved {hero.bottlesPrevented.toLocaleString()} bottles</p>
            </div>
            <div className="text-right">
              <p className="text-hero-green-500 font-bold" data-testid={`hero-points-${index}`}>{hero.points.toLocaleString()} pts</p>
              <div className="flex items-center justify-end">
                {getLevelIcon(hero.level)}
                <span className="text-xs text-gray-400 ml-1" data-testid={`hero-level-${index}`}>{hero.level}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {showHeader && (
        <div className="text-center mt-6">
          <Link href="/leaderboard">
            <Button variant="outline" className="text-hero-green-500 border-hero-green-500 hover:bg-hero-green-500 hover:text-white" data-testid="button-view-all-heroes">
              View All Heroes
            </Button>
          </Link>
        </div>
      )}
    </div>
  );
}
