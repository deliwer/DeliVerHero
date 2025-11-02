import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Link } from "wouter";
import { useQuery } from "@tanstack/react-query";
import { 
  Trophy, 
  Users, 
  Coins, 
  Leaf, 
  ArrowRight, 
  Target, 
  Gift, 
  Share2,
  CheckCircle,
  Zap,
  TrendingUp,
  Award,
  Sparkles
} from "lucide-react";
import { SEOMeta } from "@/components/seo-meta";
import type { PlanetMission } from "@shared/schema";

export default function PlanetHero() {
  const { data: missions, isLoading } = useQuery<PlanetMission[]>({
    queryKey: ['/api/metaverse/missions'],
  });

  const featuredMissions = missions?.filter(m => m.isEpic && m.isActive).slice(0, 3) || [];

  return (
    <div className="min-h-screen bg-dubai-gradient">
      <SEOMeta 
        title="Planet Hero Movement - Play, Earn, Make Dubai Greener"
        description="Join the Planet Hero Movement and earn rewards while making Dubai greener. Complete missions, earn Planet Points, and make a real environmental impact."
      />

      {/* Hero Banner */}
      <section className="relative overflow-hidden py-20 px-4">
        <div className="absolute inset-0 bg-gradient-to-br from-hero-green-900/30 via-dubai-blue-900/30 to-purple-900/30"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(34,197,94,0.1)_0%,transparent_50%)]"></div>
        
        <div className="max-w-6xl mx-auto relative z-10">
          <div className="text-center mb-12">
            <Badge className="mb-6 bg-hero-green-500/20 text-hero-green-400 border-hero-green-500/50 px-6 py-2 text-lg" data-testid="badge-movement">
              <Sparkles className="w-5 h-5 mr-2 inline" />
              Planet Hero Movement
            </Badge>
            
            <h1 className="text-5xl md:text-7xl font-black text-white mb-6 leading-tight">
              Join the Planet Hero Movement
              <span className="block bg-gradient-to-r from-hero-green-400 to-emerald-400 bg-clip-text text-transparent">
                Play, Earn, Make Dubai Greener
              </span>
            </h1>
            
            <p className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto mb-10">
              Transform everyday actions into environmental impact. Complete missions, earn Planet Points, and get rewarded for making Dubai more sustainable.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link href="/planet-hero-missions">
                <Button 
                  size="lg" 
                  className="bg-gradient-to-r from-hero-green-500 to-emerald-600 hover:from-hero-green-600 hover:to-emerald-700 text-white font-bold px-8 py-6 text-xl shadow-2xl transform hover:scale-105 transition-all"
                  data-testid="button-start-earning"
                >
                  <Zap className="w-6 h-6 mr-2" />
                  Start Earning
                </Button>
              </Link>
              <Link href="/planet-hero-missions">
                <Button 
                  size="lg" 
                  variant="outline"
                  className="bg-dubai-blue-600/20 border-dubai-blue-500 text-dubai-blue-400 hover:bg-dubai-blue-600/40 font-bold px-8 py-6 text-xl"
                  data-testid="button-view-missions"
                >
                  <Target className="w-6 h-6 mr-2" />
                  View Missions
                </Button>
              </Link>
              <Link href="/planet-hero-affiliates">
                <Button 
                  size="lg" 
                  variant="outline"
                  className="bg-purple-600/20 border-purple-500 text-purple-400 hover:bg-purple-600/40 font-bold px-8 py-6 text-xl"
                  data-testid="button-become-affiliate"
                >
                  <Share2 className="w-6 h-6 mr-2" />
                  Become an Affiliate
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Overview Cards */}
      <section className="py-12 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="glass border-hero-green-500/30 hover:shadow-xl hover:shadow-hero-green-500/20 transition-all" data-testid="card-total-missions">
              <CardHeader className="text-center pb-3">
                <Trophy className="w-12 h-12 text-hero-green-500 mx-auto mb-3" />
                <CardTitle className="text-white text-lg">Total Missions</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <div className="text-4xl font-black text-hero-green-400 mb-2" data-testid="text-mission-count">
                  {missions?.filter(m => m.isActive).length || 0}
                </div>
                <p className="text-gray-400 text-sm">Active Missions Available</p>
              </CardContent>
            </Card>

            <Card className="glass border-amber-500/30 hover:shadow-xl hover:shadow-amber-500/20 transition-all" data-testid="card-referral-earnings">
              <CardHeader className="text-center pb-3">
                <Coins className="w-12 h-12 text-amber-500 mx-auto mb-3" />
                <CardTitle className="text-white text-lg">Referral Earnings</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <div className="text-4xl font-black text-amber-400 mb-2" data-testid="text-referral-earnings">
                  AED 0
                </div>
                <p className="text-gray-400 text-sm">Start Referring Today</p>
              </CardContent>
            </Card>

            <Card className="glass border-purple-500/30 hover:shadow-xl hover:shadow-purple-500/20 transition-all" data-testid="card-planet-points">
              <CardHeader className="text-center pb-3">
                <Award className="w-12 h-12 text-purple-500 mx-auto mb-3" />
                <CardTitle className="text-white text-lg">Planet Points</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <div className="text-4xl font-black text-purple-400 mb-2" data-testid="text-planet-points">
                  0
                </div>
                <p className="text-gray-400 text-sm">Complete Missions to Earn</p>
              </CardContent>
            </Card>

            <Card className="glass border-emerald-500/30 hover:shadow-xl hover:shadow-emerald-500/20 transition-all" data-testid="card-impact-made">
              <CardHeader className="text-center pb-3">
                <Leaf className="w-12 h-12 text-emerald-500 mx-auto mb-3" />
                <CardTitle className="text-white text-lg">Impact Made</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <div className="text-4xl font-black text-emerald-400 mb-2" data-testid="text-impact-bottles">
                  0
                </div>
                <p className="text-gray-400 text-sm">Bottles Prevented</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Quick Stats Dashboard */}
      <section className="py-12 px-4">
        <div className="max-w-6xl mx-auto">
          <Card className="glass border-slate-600">
            <CardHeader>
              <CardTitle className="text-white text-2xl flex items-center">
                <TrendingUp className="w-6 h-6 mr-3 text-hero-green-500" />
                Quick Stats Dashboard
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-3 gap-6">
                <div className="text-center p-4 rounded-lg bg-hero-green-500/10 border border-hero-green-500/30">
                  <div className="text-3xl font-bold text-hero-green-400 mb-2">0</div>
                  <p className="text-gray-300">Missions Completed</p>
                </div>
                <div className="text-center p-4 rounded-lg bg-dubai-blue-500/10 border border-dubai-blue-500/30">
                  <div className="text-3xl font-bold text-dubai-blue-400 mb-2">0</div>
                  <p className="text-gray-300">Active Referrals</p>
                </div>
                <div className="text-center p-4 rounded-lg bg-amber-500/10 border border-amber-500/30">
                  <div className="text-3xl font-bold text-amber-400 mb-2">Bronze</div>
                  <p className="text-gray-300">Current Level</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Featured Missions */}
      <section className="py-12 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-10">
            <h2 className="text-4xl font-black text-white mb-4">
              Featured Epic Missions
            </h2>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Start with these high-impact missions and earn massive rewards
            </p>
          </div>

          {isLoading ? (
            <div className="grid md:grid-cols-3 gap-6">
              {[1, 2, 3].map(i => (
                <Card key={i} className="glass border-slate-600 animate-pulse">
                  <CardHeader className="h-48 bg-slate-700/50"></CardHeader>
                  <CardContent className="space-y-3">
                    <div className="h-4 bg-slate-700/50 rounded"></div>
                    <div className="h-4 bg-slate-700/50 rounded w-2/3"></div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : featuredMissions.length > 0 ? (
            <div className="grid md:grid-cols-3 gap-6">
              {featuredMissions.map((mission) => (
                <Card 
                  key={mission.id} 
                  className="glass border-amber-500/50 hover:shadow-xl hover:shadow-amber-500/30 transition-all group"
                  data-testid={`card-mission-${mission.code}`}
                >
                  <CardHeader>
                    <Badge className="mb-3 bg-amber-500/20 text-amber-400 border-amber-500/50 w-fit">
                      {mission.difficulty.toUpperCase()}
                    </Badge>
                    <CardTitle className="text-white text-xl group-hover:text-hero-green-400 transition-colors">
                      {mission.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <p className="text-gray-300 text-sm line-clamp-3">
                      {mission.description}
                    </p>
                    <div className="flex items-center justify-between">
                      <div className="text-hero-green-400 font-bold">
                        +{mission.basePoints} Points
                      </div>
                      <Badge variant="outline" className="border-slate-600 text-gray-400">
                        {mission.category}
                      </Badge>
                    </div>
                    <Link href="/planet-hero-missions">
                      <Button 
                        className="w-full bg-gradient-to-r from-hero-green-500 to-emerald-600 hover:from-hero-green-600 hover:to-emerald-700"
                        data-testid={`button-view-mission-${mission.code}`}
                      >
                        View Mission
                        <ArrowRight className="w-4 h-4 ml-2" />
                      </Button>
                    </Link>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <Card className="glass border-slate-600">
              <CardContent className="text-center py-12">
                <Trophy className="w-16 h-16 text-gray-500 mx-auto mb-4" />
                <p className="text-gray-400 text-lg">No featured missions available yet. Check back soon!</p>
              </CardContent>
            </Card>
          )}
        </div>
      </section>

      {/* How It Works */}
      <section className="py-16 px-4 bg-gradient-to-br from-slate-900/50 to-slate-800/50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-black text-white mb-4">
              How Planet Hero Works
            </h2>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Start earning and making an impact in 4 simple steps
            </p>
          </div>

          <div className="grid md:grid-cols-4 gap-8">
            <div className="text-center" data-testid="step-signup">
              <div className="w-20 h-20 rounded-full bg-gradient-to-br from-hero-green-500 to-emerald-600 flex items-center justify-center mx-auto mb-4 shadow-lg shadow-hero-green-500/50">
                <span className="text-3xl font-black text-white">1</span>
              </div>
              <h3 className="text-xl font-bold text-white mb-3">Sign Up Free</h3>
              <p className="text-gray-400">
                Create your Planet Hero account in seconds. No credit card required.
              </p>
            </div>

            <div className="text-center" data-testid="step-choose-mission">
              <div className="w-20 h-20 rounded-full bg-gradient-to-br from-dubai-blue-500 to-blue-600 flex items-center justify-center mx-auto mb-4 shadow-lg shadow-dubai-blue-500/50">
                <span className="text-3xl font-black text-white">2</span>
              </div>
              <h3 className="text-xl font-bold text-white mb-3">Choose a Mission</h3>
              <p className="text-gray-400">
                Browse missions across categories like water, energy, and trade-ins.
              </p>
            </div>

            <div className="text-center" data-testid="step-complete-action">
              <div className="w-20 h-20 rounded-full bg-gradient-to-br from-purple-500 to-pink-600 flex items-center justify-center mx-auto mb-4 shadow-lg shadow-purple-500/50">
                <span className="text-3xl font-black text-white">3</span>
              </div>
              <h3 className="text-xl font-bold text-white mb-3">Complete Action</h3>
              <p className="text-gray-400">
                Take real sustainable actions and track your environmental impact.
              </p>
            </div>

            <div className="text-center" data-testid="step-earn-rewards">
              <div className="w-20 h-20 rounded-full bg-gradient-to-br from-amber-500 to-orange-600 flex items-center justify-center mx-auto mb-4 shadow-lg shadow-amber-500/50">
                <span className="text-3xl font-black text-white">4</span>
              </div>
              <h3 className="text-xl font-bold text-white mb-3">Earn Rewards</h3>
              <p className="text-gray-400">
                Get Planet Points, cash rewards, and exclusive benefits instantly.
              </p>
            </div>
          </div>

          <div className="mt-12 text-center">
            <Link href="/planet-hero-manual">
              <Button 
                size="lg" 
                variant="outline"
                className="border-hero-green-500 text-hero-green-400 hover:bg-hero-green-500/20"
                data-testid="button-learn-more"
              >
                <Gift className="w-5 h-5 mr-2" />
                Learn More
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <Card className="glass border-hero-green-500/50 bg-gradient-to-br from-hero-green-900/20 to-emerald-900/20">
            <CardContent className="text-center py-12">
              <Users className="w-16 h-16 text-hero-green-400 mx-auto mb-6" />
              <h2 className="text-3xl font-black text-white mb-4">
                Ready to Make an Impact?
              </h2>
              <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
                Join thousands of Planet Heroes in Dubai who are earning rewards while creating a greener, more sustainable future.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/signup">
                  <Button 
                    size="lg" 
                    className="bg-gradient-to-r from-hero-green-500 to-emerald-600 hover:from-hero-green-600 hover:to-emerald-700 text-white font-bold px-10 py-6 text-xl"
                    data-testid="button-get-started"
                  >
                    <CheckCircle className="w-6 h-6 mr-2" />
                    Get Started Now
                  </Button>
                </Link>
                <Link href="/planet-hero-manual">
                  <Button 
                    size="lg" 
                    variant="outline"
                    className="border-dubai-blue-500 text-dubai-blue-400 hover:bg-dubai-blue-500/20 font-bold px-10 py-6 text-xl"
                    data-testid="button-read-manual"
                  >
                    Read the Manual
                    <ArrowRight className="w-6 h-6 ml-2" />
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
}
