import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Users, 
  ArrowRight, 
  Trophy,
  Globe,
  TrendingUp
} from "lucide-react";

export function LeaderboardSocialProof() {
  return (
    <section className="py-16 px-4">
      <div className="max-w-4xl mx-auto text-center">
        <Badge variant="secondary" className="mb-6 bg-amber-500/20 text-amber-400 border-amber-500/30">
          <Trophy className="w-3 h-3 mr-1" />
          Community
        </Badge>
        
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-4" data-testid="text-leaderboard-section-title">
          Join a global community of Planet Heroes
        </h2>
        <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
          Members from across the world are earning, saving, and building lives in Dubai.
        </p>

        {/* Stats Row */}
        <div className="grid grid-cols-3 gap-6 mb-10 max-w-2xl mx-auto">
          <div className="glass rounded-2xl p-6 border border-amber-500/20">
            <div className="flex items-center justify-center mb-2">
              <Users className="w-6 h-6 text-amber-400" />
            </div>
            <div className="text-2xl font-bold text-white mb-1">12,500+</div>
            <p className="text-gray-400 text-sm">Active Members</p>
          </div>
          
          <div className="glass rounded-2xl p-6 border border-emerald-500/20">
            <div className="flex items-center justify-center mb-2">
              <Globe className="w-6 h-6 text-emerald-400" />
            </div>
            <div className="text-2xl font-bold text-white mb-1">200+</div>
            <p className="text-gray-400 text-sm">Nationalities</p>
          </div>
          
          <div className="glass rounded-2xl p-6 border border-blue-500/20">
            <div className="flex items-center justify-center mb-2">
              <TrendingUp className="w-6 h-6 text-blue-400" />
            </div>
            <div className="text-2xl font-bold text-white mb-1">850K+</div>
            <p className="text-gray-400 text-sm">Bottles Prevented</p>
          </div>
        </div>

        <Link href="/leaderboard">
          <Button size="lg" variant="outline" className="border-amber-500/50 text-amber-400 hover:bg-amber-500/10" data-testid="button-see-progress">
            <Trophy className="w-4 h-4 mr-2" />
            See How Members Progress
            <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        </Link>
      </div>
    </section>
  );
}
