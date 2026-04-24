import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { 
  Coins, Trophy, Target, TrendingUp, Gift, Star, Crown, AlertTriangle, Users, 
  Droplets, Zap, Award, Gamepad2, Medal, Sparkles, Clock, Atom, Rocket,
  CheckCircle, Heart, ShoppingCart, ChevronRight, ArrowRight, Leaf, ChevronUp, ChevronDown,
  Smartphone, TreePine
} from "lucide-react";
import { Link, useLocation } from "wouter";
import { TombolaWidget } from "@/components/tombola-widget";
import { CouponsPanel } from "@/components/coupons-panel";
import { StarsSponsorshipSection } from "@/components/stars-sponsorship-section";
import { shopifyCartService } from "@/lib/shopify-cart";
import { useToast } from "@/hooks/use-toast";
import type { PlanetMission } from "@shared/schema";

interface Achievement {
  id: string;
  name: string;
  description: string;
  icon: string;
  rarity: "common" | "rare" | "epic" | "legendary";
  progress: number;
  maxProgress: number;
  completed: boolean;
  rewards: string;
}

interface LeaderboardEntry {
  rank: number;
  heroName: string;
  level: string;
  totalSpins: number;
  vouchersEarned: number;
  sustainabilityScore: number;
  avatar: string;
}

export default function Play() {
  const [activeTab, setActiveTab] = useState<"tombola" | "achievements" | "leaderboard" | "missions">("tombola");
  const [heroId] = useState("current-hero-id"); // This would come from auth context
  const [isLoyaltyMember, setIsLoyaltyMember] = useState(false); // Check loyalty status
  const [isTombolaExpanded, setIsTombolaExpanded] = useState(false);
  const [isOrderLoading, setIsOrderLoading] = useState(false);
  const { toast } = useToast();
  const [, setLocation] = useLocation();

  const handleOrderStarterKit = async () => {
    setIsOrderLoading(true);
    try {
      const starterKitProduct = {
        id: "aquacafe-starter-kit",
        variantId: "aquacafe-starter-kit-loyalty-gateway",
        title: "AquaCafe Planet Hero Starter Kit - Loyalty Gateway",
        variant: "Standard",
        price: 99,
        quantity: 1,
        image: "/aquacafe_shower_main_1755270492134.jpg",
      };
      await shopifyCartService.addToCart(starterKitProduct);
      toast({
        title: "Added to Cart!",
        description: "AquaCafe Loyalty Starter Kit (AED 99) - Your gateway to sustainability rewards",
      });
      setLocation('/cart');
    } catch (error) {
      console.error('Error adding to cart:', error);
      toast({
        title: "Error",
        description: "Failed to add to cart. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsOrderLoading(false);
    }
  };

  // Fetch missions for the missions tab
  const { data: missions, isLoading: missionsLoading } = useQuery<PlanetMission[]>({
    queryKey: ['/api/metaverse/missions'],
  });

  const featuredMissions = missions?.filter(m => m.isEpic && m.isActive).slice(0, 6) || [];

  // Mock achievements data
  const achievements: Achievement[] = [
    {
      id: "first-spin",
      name: "🚀 First Launch",
      description: "Complete your first Planet Points spin",
      icon: "🌌",
      rarity: "common",
      progress: 1,
      maxProgress: 1,
      completed: true,
      rewards: "50 Planet Points + AquaCafe Starter Badge"
    },
    {
      id: "spin-master",
      name: "🎮 Spin Master",
      description: "Complete 50 Planet Points spins",
      icon: "⚡",
      rarity: "rare",
      progress: 23,
      maxProgress: 50,
      completed: false,
      rewards: "500 Planet Points + Premium Water Access"
    },
    {
      id: "voucher-collector",
      name: "🎫 Reward Collector",
      description: "Collect 25 rewards through gaming",
      icon: "🍽️",
      rarity: "epic",
      progress: 12,
      maxProgress: 25,
      completed: false,
      rewards: "1000 Planet Points + VIP Status"
    }
  ];

  // Mock leaderboard data
  const leaderboard: LeaderboardEntry[] = [
    { rank: 1, heroName: "Ahmed Al-Mansouri", level: "Gold Hero", totalSpins: 234, vouchersEarned: 45, sustainabilityScore: 15680, avatar: "👑" },
    { rank: 2, heroName: "Sara Al-Zahra", level: "Silver Hero", totalSpins: 187, vouchersEarned: 32, sustainabilityScore: 12450, avatar: "⭐" },
    { rank: 3, heroName: "Omar Hassan", level: "Silver Hero", totalSpins: 156, vouchersEarned: 28, sustainabilityScore: 9870, avatar: "🌟" }
  ];

  return (
    <div className="min-h-screen bg-dubai-gradient">
      <div className="container mx-auto px-4 py-8">
        {/* Hero Section - Dubai's Gamified Sustainability Hub */}
        <div className="text-center mb-12 relative overflow-hidden">
          {/* Background effects */}
          <div className="absolute inset-0 bg-gradient-to-r from-purple-600/10 to-hero-green-600/10 animate-pulse"></div>
          
          <div className="relative z-10">
            <div className="inline-flex items-center gap-3 bg-gradient-to-r from-purple-500/20 to-hero-green-500/20 px-8 py-4 rounded-full mb-8 border border-purple-500/50 shadow-lg shadow-purple-500/20">
              <Gift className="w-8 h-8 text-purple-400 animate-bounce" />
              <span className="text-2xl font-bold text-white">🎮 PLAY FOR PLANET POINTS</span>
              <Award className="w-8 h-8 text-hero-green-400 animate-bounce" />
            </div>
            <h1 className="text-5xl md:text-7xl font-bold text-white mb-6">
              Dubai's Gamified 
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-hero-green-400">
                Sustainability Hub
              </span>
            </h1>
            <p className="text-xl text-gray-300 max-w-4xl mx-auto mb-8">
              Join thousands of Dubai residents earning Planet Points through sustainable actions. 
              Spin our Tombola wheel, unlock achievements, climb leaderboards, and redeem amazing rewards!
            </p>
            <div className="inline-flex items-center gap-2 text-amber-300 text-lg font-semibold bg-amber-500/20 px-6 py-3 rounded-full border border-amber-500/50">
              <Crown className="w-6 h-6" />
              AquaCafe Loyalty Required for Point Redemption
            </div>
          </div>
        </div>
          
        {/* Gaming Stats */}
        <div className="grid md:grid-cols-4 gap-4 max-w-4xl mx-auto mb-8">
            <div className="bg-gradient-to-br from-hero-green-500/20 to-hero-green-600/20 rounded-xl p-4 border border-hero-green-500/30">
              <div className="text-3xl font-bold text-hero-green-400">1,247</div>
              <div className="text-sm text-gray-300 font-medium">Your Points</div>
            </div>
            <div className="bg-gradient-to-br from-amber-500/20 to-amber-600/20 rounded-xl p-4 border border-amber-500/30">
              <div className="text-3xl font-bold text-amber-400">Bronze</div>
              <div className="text-sm text-gray-300 font-medium">Hero Level</div>
            </div>
            <div className="bg-gradient-to-br from-purple-500/20 to-purple-600/20 rounded-xl p-4 border border-purple-500/30">
              <div className="text-3xl font-bold text-purple-400">23</div>
              <div className="text-sm text-gray-300 font-medium">Free Spins</div>
            </div>
            <div className="bg-gradient-to-br from-blue-500/20 to-blue-600/20 rounded-xl p-4 border border-blue-500/30">
              <div className="text-3xl font-bold text-blue-400">12</div>
              <div className="text-sm text-gray-300 font-medium">Achievements</div>
            </div>
        </div>
          
        {/* Loyalty Membership Status */}
        {!isLoyaltyMember && (
          <div className="max-w-2xl mx-auto mb-8 p-4 bg-amber-500/20 border border-amber-500/50 rounded-xl">
              <div className="flex items-center justify-center gap-3 mb-3">
                <Heart className="w-6 h-6 text-amber-400" />
                <span className="text-amber-300 font-bold text-lg">Join AquaCafe Loyalty to Redeem Points!</span>
              </div>
              <p className="text-amber-200 text-center mb-4">
                Unlock point redemption for coupons, vouchers, packages & exclusive deals
              </p>
              <Link href="/aquacafe">
                <Button className="bg-amber-600 hover:bg-amber-700 text-white font-bold px-6 py-3 mx-auto block">
                  <ShoppingCart className="w-5 h-5 mr-2" />
                  Join AquaCafe Loyalty - AED 99
                </Button>
              </Link>
            </div>
          )}

        {/* La Perle Aqua Show CTA - New Tombola Prizes - Collapsible */}
        <section className="py-4 px-4 bg-gradient-to-br from-blue-600 via-cyan-600 to-teal-600 relative overflow-hidden rounded-3xl mb-12">
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
                  <Button 
                    onClick={() => setActiveTab("tombola")}
                    className="bg-gradient-to-r from-cyan-400 to-blue-500 text-white hover:from-cyan-500 hover:to-blue-600 text-xl px-10 py-4 rounded-full font-bold shadow-2xl transition-all duration-300 hover:scale-105"
                    data-testid="button-play-tombola-now"
                  >
                    <Gift className="w-6 h-6 mr-3" />
                    🎰 Play Tombola Now
                  </Button>
                  
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

        {/* Gaming Tabs */}
        <div className="max-w-6xl mx-auto mb-12">
          <div className="flex justify-center mb-8">
            <div className="bg-slate-800/50 p-1 rounded-xl border border-slate-600">
              <div className="flex gap-1 flex-wrap justify-center">
                <button
                  onClick={() => setActiveTab("tombola")}
                  className={`px-6 py-3 rounded-lg font-medium transition-all ${
                    activeTab === "tombola"
                      ? "bg-hero-green-600 text-white shadow-lg"
                      : "text-gray-400 hover:text-white hover:bg-slate-700"
                  }`}
                  data-testid="tab-tombola"
                >
                  🎰 Planet Points Spin
                </button>
                <button
                  onClick={() => setActiveTab("missions")}
                  className={`px-6 py-3 rounded-lg font-medium transition-all ${
                    activeTab === "missions"
                      ? "bg-hero-green-600 text-white shadow-lg"
                      : "text-gray-400 hover:text-white hover:bg-slate-700"
                  }`}
                  data-testid="tab-missions"
                >
                  🎯 Missions
                </button>
                <button
                  onClick={() => setActiveTab("achievements")}
                  className={`px-6 py-3 rounded-lg font-medium transition-all ${
                    activeTab === "achievements"
                      ? "bg-hero-green-600 text-white shadow-lg"
                      : "text-gray-400 hover:text-white hover:bg-slate-700"
                  }`}
                  data-testid="tab-achievements"
                >
                  🏆 Achievements
                </button>
                <button
                  onClick={() => setActiveTab("leaderboard")}
                  className={`px-6 py-3 rounded-lg font-medium transition-all ${
                    activeTab === "leaderboard"
                      ? "bg-hero-green-600 text-white shadow-lg"
                      : "text-gray-400 hover:text-white hover:bg-slate-700"
                  }`}
                  data-testid="tab-leaderboard"
                >
                  📊 Leaderboard
                </button>
              </div>
            </div>
          </div>

          {/* Tombola Tab */}
          {activeTab === "tombola" && (
            <div className="text-center">
              <div className="mb-8">
                <h3 className="text-3xl font-bold text-white mb-4">
                  🎰 Planet Points Tombola
                </h3>
                <p className="text-gray-300 text-lg max-w-2xl mx-auto">
                  Spin the wheel to earn Planet Points, unlock achievements, and win amazing prizes!
                  <span className="block text-hero-green-400 mt-2 font-semibold">
                    Free spins available • Premium spins for bonus rewards
                  </span>
                </p>
              </div>
              <div className="max-w-md mx-auto">
                <TombolaWidget heroId={heroId} theme="aquacafe" size="full" />
              </div>
            </div>
          )}

          {/* Achievements Tab */}
          {activeTab === "achievements" && (
            <div>
              <div className="text-center mb-8">
                <h3 className="text-3xl font-bold text-white mb-4">
                  🏆 Your Achievements
                </h3>
                <p className="text-gray-300 text-lg">
                  Unlock badges and earn bonus Planet Points through sustainable actions
                </p>
              </div>
              
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {achievements.map((achievement) => (
                  <Card key={achievement.id} className={`bg-slate-800/50 border-slate-600 transition-all hover:scale-105 ${
                    achievement.completed ? 'ring-2 ring-hero-green-500' : ''
                  }`}>
                    <CardHeader className="text-center">
                      <div className="text-4xl mb-2">{achievement.icon}</div>
                      <CardTitle className="text-white text-lg">{achievement.name}</CardTitle>
                      <Badge className={`${
                        achievement.rarity === 'legendary' ? 'bg-purple-600/20 text-purple-400' :
                        achievement.rarity === 'epic' ? 'bg-orange-600/20 text-orange-400' :
                        achievement.rarity === 'rare' ? 'bg-blue-600/20 text-blue-400' :
                        'bg-gray-600/20 text-gray-400'
                      }`}>
                        {achievement.rarity.charAt(0).toUpperCase() + achievement.rarity.slice(1)}
                      </Badge>
                    </CardHeader>
                    <CardContent>
                      <p className="text-gray-300 text-sm mb-4">{achievement.description}</p>
                      <div className="mb-4">
                        <div className="flex justify-between text-sm mb-2">
                          <span className="text-gray-400">Progress</span>
                          <span className="text-white">{achievement.progress}/{achievement.maxProgress}</span>
                        </div>
                        <Progress 
                          value={(achievement.progress / achievement.maxProgress) * 100} 
                          className="h-2"
                        />
                      </div>
                      <div className="text-xs text-hero-green-400 font-medium">
                        Reward: {achievement.rewards}
                      </div>
                      {achievement.completed && (
                        <div className="mt-2 flex items-center justify-center text-hero-green-400">
                          <CheckCircle className="w-4 h-4 mr-1" />
                          <span className="text-sm font-bold">COMPLETED!</span>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          )}

          {/* Leaderboard Tab */}
          {activeTab === "leaderboard" && (
            <div>
              <div className="text-center mb-8">
                <h3 className="text-3xl font-bold text-white mb-4">
                  📊 Dubai Heroes Leaderboard
                </h3>
                <p className="text-gray-300 text-lg">
                  Compete with fellow sustainability champions across Dubai
                </p>
              </div>
              
              <div className="max-w-4xl mx-auto">
                <div className="space-y-4">
                  {leaderboard.map((entry, index) => (
                    <div key={entry.rank} className={`glass rounded-xl p-6 border transition-all hover:scale-102 ${
                      entry.rank === 1 ? 'border-yellow-500/50 bg-yellow-500/10' :
                      entry.rank === 2 ? 'border-gray-400/50 bg-gray-400/10' :
                      entry.rank === 3 ? 'border-amber-600/50 bg-amber-600/10' :
                      'border-slate-600'
                    }`}>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                          <div className={`w-12 h-12 rounded-full flex items-center justify-center text-2xl ${
                            entry.rank === 1 ? 'bg-yellow-500/20' :
                            entry.rank === 2 ? 'bg-gray-400/20' :
                            entry.rank === 3 ? 'bg-amber-600/20' :
                            'bg-slate-700'
                          }`}>
                            {entry.rank <= 3 ? entry.avatar : `#${entry.rank}`}
                          </div>
                          <div>
                            <h4 className="text-white font-bold text-lg">{entry.heroName}</h4>
                            <Badge className="bg-hero-green-500/20 text-hero-green-400">
                              {entry.level}
                            </Badge>
                          </div>
                        </div>
                        <div className="grid grid-cols-3 gap-6 text-center">
                          <div>
                            <div className="text-2xl font-bold text-hero-green-400">{entry.totalSpins}</div>
                            <div className="text-xs text-gray-400">Total Spins</div>
                          </div>
                          <div>
                            <div className="text-2xl font-bold text-purple-400">{entry.vouchersEarned}</div>
                            <div className="text-xs text-gray-400">Rewards Won</div>
                          </div>
                          <div>
                            <div className="text-2xl font-bold text-amber-400">{entry.sustainabilityScore.toLocaleString()}</div>
                            <div className="text-xs text-gray-400">Impact Score</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Missions Tab */}
          {activeTab === "missions" && (
            <div>
              <div className="text-center mb-8">
                <h3 className="text-3xl font-bold text-white mb-4">
                  🎯 Planet Hero Missions
                </h3>
                <p className="text-gray-300 text-lg">
                  Complete epic missions to earn massive Planet Points and make real environmental impact
                </p>
              </div>

              {missionsLoading ? (
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
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
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
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
                        <Link href="/play?tab=missions">
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
                    <Link href="/play?tab=missions">
                      <Button 
                        variant="outline" 
                        className="mt-4 border-hero-green-500 text-hero-green-400 hover:bg-hero-green-500/20"
                      >
                        <Target className="w-4 h-4 mr-2" />
                        Browse All Missions
                      </Button>
                    </Link>
                  </CardContent>
                </Card>
              )}

              {/* Mission Stats */}
              <div className="mt-8 grid md:grid-cols-4 gap-4">
                <div className="text-center p-4 rounded-lg bg-hero-green-500/10 border border-hero-green-500/30">
                  <Trophy className="w-8 h-8 text-hero-green-500 mx-auto mb-2" />
                  <div className="text-2xl font-bold text-hero-green-400 mb-1">
                    {missions?.filter(m => m.isActive).length || 0}
                  </div>
                  <p className="text-gray-300 text-sm">Active Missions</p>
                </div>
                <div className="text-center p-4 rounded-lg bg-amber-500/10 border border-amber-500/30">
                  <Coins className="w-8 h-8 text-amber-500 mx-auto mb-2" />
                  <div className="text-2xl font-bold text-amber-400 mb-1">0</div>
                  <p className="text-gray-300 text-sm">Completed</p>
                </div>
                <div className="text-center p-4 rounded-lg bg-purple-500/10 border border-purple-500/30">
                  <Award className="w-8 h-8 text-purple-500 mx-auto mb-2" />
                  <div className="text-2xl font-bold text-purple-400 mb-1">0</div>
                  <p className="text-gray-300 text-sm">Total Points Earned</p>
                </div>
                <div className="text-center p-4 rounded-lg bg-emerald-500/10 border border-emerald-500/30">
                  <Leaf className="w-8 h-8 text-emerald-500 mx-auto mb-2" />
                  <div className="text-2xl font-bold text-emerald-400 mb-1">0</div>
                  <p className="text-gray-300 text-sm">Impact Score</p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* ⭐ Stars & DXB Monetization - Fund Sustainability (moved from /earn) */}
        <section id="section-stars" className="w-full py-16 px-4 bg-gradient-to-br from-slate-900 to-slate-800 text-white scroll-mt-[200px] rounded-2xl mb-12" data-testid="stars-pic-monetization">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-8">
              <div className="inline-flex items-center gap-2 bg-emerald-500/20 text-emerald-400 px-4 py-2 rounded-full border border-emerald-500/30 mb-4">
                <Star className="w-4 h-4 flex-shrink-0" />
                <span className="font-bold text-sm">MONETIZE SUSTAINABILITY</span>
              </div>
              <h2 className="text-3xl md:text-5xl font-bold mb-4">
                Support Global Sustainability with <span className="bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent">Stars & DXBs</span>
              </h2>
              <p className="text-gray-300 text-lg max-w-3xl mx-auto mb-6">
                Purchase Dubai Carbon Tokens directly to support clean water access, e-waste recycling, and environmental awareness campaigns.
                <strong className="text-emerald-400"> 100 DXBs = $10 value</strong>
              </p>
            </div>
            <StarsSponsorshipSection />
          </div>
        </section>

        {/* Dubai Carbon Tokens (DXBs) - Unified Rewards System (moved from /earn) */}
        <section id="section-dxbs" className="w-full py-12 px-4 bg-gradient-to-br from-slate-800 to-slate-900 scroll-mt-[200px] rounded-2xl mb-12" data-testid="pics-rewards-section">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-8">
              <div className="inline-flex items-center gap-2 bg-emerald-500/20 text-emerald-400 px-4 py-2 rounded-full border border-emerald-500/30 mb-4">
                <Star className="w-4 h-4 flex-shrink-0" />
                <span className="font-bold text-sm">UNIFIED REWARDS SYSTEM</span>
              </div>
              <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">
                Earn <span className="bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent">Dubai Carbon Tokens (DXBs)</span>
              </h2>
              <p className="text-gray-300 text-lg max-w-3xl mx-auto mb-6">
                One simple reward system that tracks your environmental impact and gives you real value. Use DXBs for products, water delivery, dining, and more.
              </p>
            </div>

            <div className="max-w-4xl mx-auto">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6" data-testid="dxb-pillars">
                <div className="bg-emerald-900/20 border border-emerald-500/30 rounded-xl p-3 text-center">
                  <div className="text-emerald-300 text-[10px] font-bold uppercase tracking-wider">Universal</div>
                  <div className="text-white text-xs mt-1">One currency, full ecosystem</div>
                </div>
                <div className="bg-emerald-900/20 border border-emerald-500/30 rounded-xl p-3 text-center">
                  <div className="text-emerald-300 text-[10px] font-bold uppercase tracking-wider">Real Value</div>
                  <div className="text-white text-xs mt-1">100 DXBs = $10</div>
                </div>
                <div className="bg-emerald-900/20 border border-emerald-500/30 rounded-xl p-3 text-center">
                  <div className="text-emerald-300 text-[10px] font-bold uppercase tracking-wider">Impact</div>
                  <div className="text-white text-xs mt-1">Tracks CO₂ & water saved</div>
                </div>
                <div className="bg-emerald-900/20 border border-emerald-500/30 rounded-xl p-3 text-center">
                  <div className="text-emerald-300 text-[10px] font-bold uppercase tracking-wider">Flexible</div>
                  <div className="text-white text-xs mt-1">Cash · products · donate</div>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <Card className="bg-slate-800/50 border-slate-700">
                  <CardContent className="p-6">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center">
                        <Smartphone className="w-6 h-6 text-white" />
                      </div>
                      <h4 className="text-xl font-bold text-white">Earn DXBs</h4>
                    </div>
                    <ul className="space-y-2 text-gray-300 text-sm">
                      <li className="flex items-start gap-2"><div className="w-1.5 h-1.5 rounded-full bg-emerald-400 mt-1.5 flex-shrink-0" /><span>iPhone trade-ins (up to 22,000 DXBs)</span></li>
                      <li className="flex items-start gap-2"><div className="w-1.5 h-1.5 rounded-full bg-emerald-400 mt-1.5 flex-shrink-0" /><span>Shopping sustainable products</span></li>
                      <li className="flex items-start gap-2"><div className="w-1.5 h-1.5 rounded-full bg-emerald-400 mt-1.5 flex-shrink-0" /><span>Completing sustainability missions</span></li>
                      <li className="flex items-start gap-2"><div className="w-1.5 h-1.5 rounded-full bg-emerald-400 mt-1.5 flex-shrink-0" /><span>Referring friends and family</span></li>
                    </ul>
                  </CardContent>
                </Card>

                <Card className="bg-slate-800/50 border-slate-700">
                  <CardContent className="p-6">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-cyan-500 to-blue-500 flex items-center justify-center">
                        <Gift className="w-6 h-6 text-white" />
                      </div>
                      <h4 className="text-xl font-bold text-white">Use DXBs</h4>
                    </div>
                    <ul className="space-y-2 text-gray-300 text-sm">
                      <li className="flex items-start gap-2"><div className="w-1.5 h-1.5 rounded-full bg-cyan-400 mt-1.5 flex-shrink-0" /><span>Premium water filtration systems</span></li>
                      <li className="flex items-start gap-2"><div className="w-1.5 h-1.5 rounded-full bg-cyan-400 mt-1.5 flex-shrink-0" /><span>Free water delivery subscriptions</span></li>
                      <li className="flex items-start gap-2"><div className="w-1.5 h-1.5 rounded-full bg-cyan-400 mt-1.5 flex-shrink-0" /><span>Restaurant vouchers & dining rewards</span></li>
                      <li className="flex items-start gap-2"><div className="w-1.5 h-1.5 rounded-full bg-cyan-400 mt-1.5 flex-shrink-0" /><span>Cash withdrawal or sustainability donations</span></li>
                    </ul>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* AquaCafe Heroes Tombola - Win Prizes While Earning (moved from /earn) */}
        <section id="section-win" className="w-full py-12 px-4 bg-gradient-to-br from-cyan-600/5 to-blue-600/5 relative overflow-hidden scroll-mt-[200px] rounded-2xl mb-12" data-testid="tombola-section">
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-10 left-10 w-20 h-20 bg-blue-400 rounded-full animate-pulse"></div>
            <div className="absolute top-32 right-20 w-12 h-12 bg-cyan-400 rounded-full animate-bounce"></div>
            <div className="absolute bottom-20 left-1/4 w-16 h-16 bg-emerald-400 rounded-full animate-pulse" style={{ animationDelay: '1s' }}></div>
            <div className="absolute bottom-32 right-1/3 w-8 h-8 bg-blue-300 rounded-full animate-bounce" style={{ animationDelay: '2s' }}></div>
          </div>

          <div className="max-w-4xl mx-auto relative z-10">
            <div className="text-center mb-8">
              <div className="flex items-center justify-center gap-3 mb-4">
                <Droplets className="w-8 h-8 text-cyan-300" />
                <h2 className="text-3xl font-bold text-white">Win Rewards While You Earn</h2>
                <Leaf className="w-8 h-8 text-emerald-300" />
              </div>
              <p className="text-lg text-gray-300 max-w-2xl mx-auto mb-4">
                🌊 <strong>Every spin saves our planet!</strong> Win exclusive AquaCafe prizes, digital coupons, and bonus DXBs while supporting clean water initiatives.
              </p>
              <div className="flex items-center justify-center gap-6 text-sm text-gray-400">
                <div className="flex items-center gap-2"><Target className="w-4 h-4" /><span>Zero Plastic Waste</span></div>
                <div className="flex items-center gap-2"><Zap className="w-4 h-4" /><span>Clean Energy Powered</span></div>
                <div className="flex items-center gap-2"><Award className="w-4 h-4" /><span>Hero Impact Certified</span></div>
              </div>
            </div>

            <div className="grid lg:grid-cols-2 gap-8">
              <div className="flex justify-center">
                <TombolaWidget heroId="founder-1" theme="aquacafe" size="full" />
              </div>
              <div className="flex justify-center">
                <CouponsPanel heroId="founder-1" theme="aquacafe" showTitle={true} />
              </div>
            </div>
          </div>
        </section>

        {/* Missions Hub - Activities to Earn DXBs (moved from /earn) */}
        <section id="section-missions" className="w-full py-10 px-4 bg-gradient-to-br from-blue-50 to-emerald-50 scroll-mt-[200px] rounded-2xl mb-12" data-testid="missions-hub">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-8">
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-2">
                Earn More DXBs · Missions Hub
              </h2>
              <p className="text-sm sm:text-base text-gray-600 max-w-2xl mx-auto">
                Quick actions that earn Dubai Carbon Tokens.
              </p>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
              <Card className="bg-white border-blue-200 shadow-sm hover:shadow-md transition-all">
                <CardContent className="p-4">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                      <Smartphone className="w-5 h-5 text-blue-600" />
                    </div>
                    <div className="min-w-0">
                      <h3 className="font-bold text-gray-800 text-sm">iPhone Trade-in</h3>
                      <p className="text-xs text-blue-600 font-bold">Up to 5,000 DXBs</p>
                    </div>
                  </div>
                  <Link
                    href="/exchange"
                    className="inline-block w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold text-sm py-1.5 px-3 rounded-lg text-center transition-all"
                    data-testid="button-mission-tradein"
                  >
                    Start Trade-in
                  </Link>
                </CardContent>
              </Card>

              <Card className="bg-white border-emerald-200 shadow-sm hover:shadow-md transition-all">
                <CardContent className="p-4">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 bg-emerald-100 rounded-full flex items-center justify-center flex-shrink-0">
                      <Droplets className="w-5 h-5 text-emerald-600" />
                    </div>
                    <div className="min-w-0">
                      <h3 className="font-bold text-gray-800 text-sm">AquaCafe Membership</h3>
                      <p className="text-xs text-emerald-600 font-bold">1,000 DXBs</p>
                    </div>
                  </div>
                  <Button
                    onClick={handleOrderStarterKit}
                    disabled={isOrderLoading}
                    size="sm"
                    className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-semibold"
                    data-testid="button-mission-membership"
                  >
                    {isOrderLoading ? "Adding..." : "Join Now"}
                  </Button>
                </CardContent>
              </Card>

              <Card className="bg-white border-amber-200 shadow-sm hover:shadow-md transition-all">
                <CardContent className="p-4">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 bg-amber-100 rounded-full flex items-center justify-center flex-shrink-0">
                      <Users className="w-5 h-5 text-amber-600" />
                    </div>
                    <div className="min-w-0">
                      <h3 className="font-bold text-gray-800 text-sm">Referral Bonus</h3>
                      <p className="text-xs text-amber-600 font-bold">500 DXBs + AED 100</p>
                    </div>
                  </div>
                  <Button
                    onClick={() => {
                      toast({
                        title: "Referral Code",
                        description: "Your unique referral code: HERO" + Math.random().toString(36).substr(2, 6).toUpperCase(),
                      });
                    }}
                    size="sm"
                    className="w-full bg-amber-600 hover:bg-amber-700 text-white font-semibold"
                    data-testid="button-mission-referral"
                  >
                    Get Referral Code
                  </Button>
                </CardContent>
              </Card>

              <Card className="bg-white border-purple-200 shadow-sm hover:shadow-md transition-all">
                <CardContent className="p-4">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center flex-shrink-0">
                      <Star className="w-5 h-5 text-purple-600" />
                    </div>
                    <div className="min-w-0">
                      <h3 className="font-bold text-gray-800 text-sm">Daily Check-in</h3>
                      <p className="text-xs text-purple-600 font-bold">50 DXBs/day</p>
                    </div>
                  </div>
                  <Button
                    onClick={() => {
                      toast({
                        title: "Daily Reward Claimed!",
                        description: "+50 DXBs earned! Come back tomorrow for more!",
                      });
                    }}
                    size="sm"
                    className="w-full bg-purple-600 hover:bg-purple-700 text-white font-semibold"
                    data-testid="button-mission-checkin"
                  >
                    Claim Daily Reward
                  </Button>
                </CardContent>
              </Card>

              <Card className="bg-white border-green-200 shadow-sm hover:shadow-md transition-all">
                <CardContent className="p-4">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                      <TreePine className="w-5 h-5 text-green-600" />
                    </div>
                    <div className="min-w-0">
                      <h3 className="font-bold text-gray-800 text-sm">Plastic-Free Week</h3>
                      <p className="text-xs text-green-600 font-bold">1,000 DXBs</p>
                    </div>
                  </div>
                  <Link
                    href="/collect"
                    className="inline-block w-full bg-green-600 hover:bg-green-700 text-white font-semibold text-sm py-1.5 px-3 rounded-lg text-center transition-all"
                    data-testid="button-mission-challenge"
                  >
                    Start Challenge
                  </Link>
                </CardContent>
              </Card>

              <Card className="bg-white border-pink-200 shadow-sm hover:shadow-md transition-all">
                <CardContent className="p-4">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 bg-pink-100 rounded-full flex items-center justify-center flex-shrink-0">
                      <Heart className="w-5 h-5 text-pink-600" />
                    </div>
                    <div className="min-w-0">
                      <h3 className="font-bold text-gray-800 text-sm">Community Event</h3>
                      <p className="text-xs text-pink-600 font-bold">750 DXBs</p>
                    </div>
                  </div>
                  <Button
                    onClick={() => {
                      toast({
                        title: "Event Registered",
                        description: "See you at Chill & Grill Clover Bay Tower, Business Bay!",
                      });
                    }}
                    size="sm"
                    className="w-full bg-pink-600 hover:bg-pink-700 text-white font-semibold"
                    data-testid="button-mission-event"
                  >
                    Register
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Call to Action - Join AquaCafe for Full Benefits */}
        {!isLoyaltyMember && (
          <div className="mb-12">
            <div className="bg-gradient-to-r from-hero-green-900/50 to-blue-900/50 rounded-2xl p-8 border-2 border-hero-green-500/30 backdrop-blur-sm relative overflow-hidden">
              <div className="absolute inset-0 bg-hero-green-600/5 animate-pulse"></div>
              <div className="relative z-10 text-center">
                <div className="flex items-center justify-center gap-3 mb-6">
                  <Heart className="w-8 h-8 text-hero-green-400 animate-pulse" />
                  <Badge className="bg-hero-green-600/20 text-hero-green-300 border border-hero-green-500/30 text-lg px-4 py-2">
                    🎯 UNLOCK FULL GAMING EXPERIENCE
                  </Badge>
                </div>
                <h2 className="text-3xl font-bold text-white mb-4">Join AquaCafe Loyalty Program</h2>
                <p className="text-gray-300 mb-6 text-lg max-w-3xl mx-auto">
                  Ready to redeem your Planet Points? Join AquaCafe Loyalty to unlock coupon redemption, exclusive deals, 
                  premium water systems, and VIP rewards access.
                </p>
                
                <div className="grid md:grid-cols-3 gap-4 mb-6 max-w-2xl mx-auto">
                  <div className="bg-black/30 rounded-lg p-4 text-center">
                    <Gift className="w-8 h-8 text-hero-green-400 mx-auto mb-2" />
                    <div className="text-lg font-bold text-white">Point Redemption</div>
                    <div className="text-sm text-gray-400">Coupons & Vouchers</div>
                  </div>
                  <div className="bg-black/30 rounded-lg p-4 text-center">
                    <Droplets className="w-8 h-8 text-blue-400 mx-auto mb-2" />
                    <div className="text-lg font-bold text-white">Water Systems</div>
                    <div className="text-sm text-gray-400">Premium Access</div>
                  </div>
                  <div className="bg-black/30 rounded-lg p-4 text-center">
                    <Crown className="w-8 h-8 text-amber-400 mx-auto mb-2" />
                    <div className="text-lg font-bold text-white">VIP Status</div>
                    <div className="text-sm text-gray-400">Exclusive Rewards</div>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                  <Link href="/aquacafe">
                    <Button className="bg-hero-green-600 hover:bg-hero-green-700 text-white px-8 py-4 text-lg font-bold">
                      <ShoppingCart className="w-5 h-5 mr-2" />
                      Join AquaCafe Loyalty - AED 99
                    </Button>
                  </Link>
                  <Link href="/rewards">
                    <Button variant="outline" className="border-blue-500 text-blue-300 hover:bg-blue-500/10 px-8 py-4 text-lg">
                      <Gift className="w-5 h-5 mr-2" />
                      Preview Available Rewards
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* 🚨 Featured Mission */}
        <div className="mb-12">
          <div className="bg-gradient-to-r from-red-900/50 to-cyan-900/50 rounded-2xl p-8 border-2 border-red-500/30 backdrop-blur-sm relative overflow-hidden">
            <div className="absolute inset-0 bg-red-600/5 animate-pulse"></div>
            <div className="relative z-10">
              <div className="flex items-center gap-3 mb-6">
                <AlertTriangle className="w-8 h-8 text-red-400 animate-pulse" />
                <Badge className="bg-red-600/20 text-red-300 border border-red-500/30">
                  🚨 MEGA MISSION - URGENT
                </Badge>
              </div>
              <h2 className="text-3xl font-bold text-white mb-4">Saqi Kawthar Project Mission</h2>
              <p className="text-gray-300 mb-6 text-lg">
                Help provide clean water to communities in need. Your trades and donations directly fund solar-powered water purification stations.
              </p>
              
              <div className="grid md:grid-cols-3 gap-4 mb-6">
                <div className="bg-black/30 rounded-lg p-4 text-center">
                  <div className="text-2xl font-bold text-cyan-400">2,547</div>
                  <div className="text-sm text-gray-400">People Served</div>
                </div>
                <div className="bg-black/30 rounded-lg p-4 text-center">
                  <div className="text-2xl font-bold text-red-400">12</div>
                  <div className="text-sm text-gray-400">Stations Active</div>
                </div>
                <div className="bg-black/30 rounded-lg p-4 text-center">
                  <div className="text-2xl font-bold text-yellow-400">AED 45K</div>
                  <div className="text-sm text-gray-400">Raised So Far</div>
                </div>
              </div>

              <div className="flex gap-4">
                <Link href="/mission-control-saqi-kawthar">
                  <Button className="bg-red-600 hover:bg-red-700 text-white">
                    <Zap className="w-4 h-4 mr-2" />
                    Join Mission Control
                  </Button>
                </Link>
                <Link href="/earn">
                  <Button variant="outline" className="border-cyan-500 text-cyan-300 hover:bg-cyan-500/10">
                    <Droplets className="w-4 h-4 mr-2" />
                    Trade for Water Credits
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* How to Earn More Points */}
        <div className="mb-12">
          <div className="bg-gradient-to-r from-slate-900/80 to-slate-800/80 rounded-2xl p-8 border border-hero-green-500/30 backdrop-blur-sm">
            <div className="text-center mb-8">
              <div className="flex items-center justify-center gap-2 mb-4">
                <Trophy className="w-8 h-8 text-hero-green-400" />
                <h2 className="text-3xl font-bold text-white">Earn More Planet Points</h2>
              </div>
              <p className="text-gray-300 text-lg max-w-2xl mx-auto">
                Beyond spinning, earn bonus Planet Points through sustainable actions. Each action multiplies your impact and rewards!
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-6 mb-8">
              <div className="bg-black/30 rounded-xl p-6 border border-hero-green-500/20 text-center">
                <div className="w-16 h-16 bg-hero-green-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Trophy className="w-8 h-8 text-hero-green-400" />
                </div>
                <h3 className="text-xl font-bold text-white mb-3">iPhone Trade-Ins</h3>
                <div className="text-3xl font-bold text-hero-green-400 mb-2">300-600</div>
                <p className="text-gray-400 text-sm mb-4">Planet Points per iPhone trade based on model and condition</p>
                <Link href="/earn">
                  <Button variant="outline" className="border-hero-green-500 text-hero-green-300 hover:bg-hero-green-500/10">
                    Start Trading
                  </Button>
                </Link>
              </div>
              
              <div className="bg-black/30 rounded-xl p-6 border border-blue-500/20 text-center">
                <div className="w-16 h-16 bg-blue-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Droplets className="w-8 h-8 text-blue-400" />
                </div>
                <h3 className="text-xl font-bold text-white mb-3">Water Systems</h3>
                <div className="text-3xl font-bold text-blue-400 mb-2">50-200</div>
                <p className="text-gray-400 text-sm mb-4">Points for AquaCafe water system purchases and installations</p>
                <Link href="/aquacafe">
                  <Button variant="outline" className="border-blue-500 text-blue-300 hover:bg-blue-500/10">
                    View Systems
                  </Button>
                </Link>
              </div>
              
              <div className="bg-black/30 rounded-xl p-6 border border-purple-500/20 text-center">
                <div className="w-16 h-16 bg-purple-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Users className="w-8 h-8 text-purple-400" />
                </div>
                <h3 className="text-xl font-bold text-white mb-3">Referrals</h3>
                <div className="text-3xl font-bold text-purple-400 mb-2">25-100</div>
                <p className="text-gray-400 text-sm mb-4">Bonus points for each friend who joins the sustainability mission</p>
                <Link href="/leaderboard">
                  <Button variant="outline" className="border-purple-500 text-purple-300 hover:bg-purple-500/10">
                    Invite Friends
                  </Button>
                </Link>
              </div>
            </div>

            <div className="text-center">
              <div className="inline-flex items-center gap-4 bg-gradient-to-r from-hero-green-500/10 to-purple-500/10 rounded-xl p-6 border border-hero-green-500/30">
                <div className="text-center">
                  <div className="text-2xl font-bold text-white mb-1">Collect Points</div>
                  <div className="text-sm text-gray-400">Through Actions</div>
                </div>
                <div className="text-gray-400">
                  <ChevronRight className="w-6 h-6" />
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-white mb-1">Spin Tombola</div>
                  <div className="text-sm text-gray-400">Multiply Rewards</div>
                </div>
                <div className="text-gray-400">
                  <ChevronRight className="w-6 h-6" />
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-white mb-1">Redeem Prizes</div>
                  <div className="text-sm text-gray-400">AquaCafe Members</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Additional Earning Opportunities */}
        <div className="grid md:grid-cols-2 gap-6 mb-12">

          <Card className="bg-slate-800/50 border-slate-700 backdrop-blur-sm">
            <CardHeader className="text-center">
              <Target className="w-12 h-12 text-dubai-blue-500 mx-auto mb-4" />
              <CardTitle className="text-white">Water System Investments</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center">
                <div className="text-3xl font-bold text-dubai-blue-400 mb-2">50-200</div>
                <p className="text-gray-400 mb-4">Points earned through AquaCafe system purchases and installations</p>
                <Link href="/aquacafe">
                  <Button className="bg-dubai-blue-600 hover:bg-dubai-blue-700 text-white">
                    View Systems
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-slate-800/50 border-slate-700 backdrop-blur-sm">
            <CardHeader className="text-center">
              <Users className="w-12 h-12 text-purple-500 mx-auto mb-4" />
              <CardTitle className="text-white">Network Expansion</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center">
                <div className="text-3xl font-bold text-purple-400 mb-2">25-100</div>
                <p className="text-gray-400 mb-4">Strategic referral bonuses for expanding the professional network</p>
                <Link href="/leaderboard">
                  <Button className="bg-purple-600 hover:bg-purple-700 text-white">
                    Join Community
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Community Challenges */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold text-white text-center mb-8">Community Challenges</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <Card className="bg-slate-800/50 border-slate-700">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <Users className="w-5 h-5 text-yellow-500" />
                  Dubai Neighborhood Challenge
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-300 mb-4">
                  Compete with your local community to see which Dubai neighborhood can collect the most Planet Points this month.
                </p>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-gray-400">Progress:</span>
                  <span className="font-bold text-yellow-400">2,847 / 5,000 points</span>
                </div>
                <div className="w-full bg-slate-700 rounded-full h-2">
                  <div className="bg-yellow-500 h-2 rounded-full" style={{width: '57%'}}></div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-slate-800/50 border-slate-700">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <Droplets className="w-5 h-5 text-cyan-500" />
                  Weekly Water Impact Goal
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-300 mb-4">
                  Help our community reach 50,000 liters of clean water delivered this week through collective actions.
                </p>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-gray-400">Progress:</span>
                  <span className="font-bold text-cyan-400">38,291 / 50,000 L</span>
                </div>
                <div className="w-full bg-slate-700 rounded-full h-2">
                  <div className="bg-cyan-500 h-2 rounded-full" style={{width: '77%'}}></div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Strategic Implementation Framework */}
        <div className="bg-slate-800/50 border border-slate-700 rounded-2xl p-8 mb-8">
          <h3 className="text-2xl font-bold text-white mb-6 text-center">Strategic Implementation Framework</h3>
          <div className="grid md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="bg-hero-green-500/20 rounded-xl w-16 h-16 flex items-center justify-center mx-auto mb-4 border border-hero-green-500/30">
                <span className="text-xl font-bold text-hero-green-400">01</span>
              </div>
              <h4 className="font-bold text-white mb-2">Execute Actions</h4>
              <p className="text-gray-400 text-sm">Implement strategic device exchanges, water system investments, and mission participation</p>
            </div>
            <div className="text-center">
              <div className="bg-dubai-blue-500/20 rounded-xl w-16 h-16 flex items-center justify-center mx-auto mb-4 border border-dubai-blue-500/30">
                <span className="text-xl font-bold text-dubai-blue-400">02</span>
              </div>
              <h4 className="font-bold text-white mb-2">Accumulate Capital</h4>
              <p className="text-gray-400 text-sm">Build Planet Points portfolio through verified sustainable activities</p>
            </div>
            <div className="text-center">
              <div className="bg-purple-500/20 rounded-xl w-16 h-16 flex items-center justify-center mx-auto mb-4 border border-purple-500/30">
                <span className="text-xl font-bold text-purple-400">03</span>
              </div>
              <h4 className="font-bold text-white mb-2">Advance Tier Status</h4>
              <p className="text-gray-400 text-sm">Progress through Bronze, Silver, Gold, and Platinum professional tiers</p>
            </div>
            <div className="text-center">
              <div className="bg-yellow-500/20 rounded-xl w-16 h-16 flex items-center justify-center mx-auto mb-4 border border-yellow-500/30">
                <span className="text-xl font-bold text-yellow-400">04</span>
              </div>
              <h4 className="font-bold text-white mb-2">Access Benefits</h4>
              <p className="text-gray-400 text-sm">Unlock exclusive products, services, and partnership opportunities</p>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="text-center">
          <div className="bg-gradient-to-r from-slate-800/80 to-slate-700/80 border border-slate-600 rounded-2xl p-8 max-w-4xl mx-auto backdrop-blur-sm">
            <h3 className="text-3xl font-bold text-white mb-8">
              🚀 Ready to Level Up Your Impact?
            </h3>
            
            <div className="grid md:grid-cols-2 gap-6">
              <Link href="/earn">
                <div className="bg-gradient-to-br from-hero-green-500/20 to-hero-green-600/20 rounded-xl p-6 border border-hero-green-500/30 hover:scale-105 transition-all cursor-pointer">
                  <Trophy className="w-12 h-12 text-hero-green-400 mx-auto mb-4" />
                  <h4 className="text-xl font-bold text-white mb-2">Start Earning Points</h4>
                  <p className="text-gray-300 mb-4">
                    Trade your iPhone, join missions, and rack up Planet Points through sustainable actions
                  </p>
                  <Button className="bg-hero-green-600 hover:bg-hero-green-700 text-white w-full">
                    Begin Your Journey
                  </Button>
                </div>
              </Link>
              
              <Link href="/rewards">
                <div className="bg-gradient-to-br from-purple-500/20 to-purple-600/20 rounded-xl p-6 border border-purple-500/30 hover:scale-105 transition-all cursor-pointer">
                  <Gift className="w-12 h-12 text-purple-400 mx-auto mb-4" />
                  <h4 className="text-xl font-bold text-white mb-2">Explore Rewards</h4>
                  <p className="text-gray-300 mb-4">
                    Discover amazing coupons, vouchers, and exclusive deals waiting for your Planet Points
                  </p>
                  <Button className="bg-purple-600 hover:bg-purple-700 text-white w-full">
                    Browse Rewards
                  </Button>
                </div>
              </Link>
            </div>
            
            <div className="mt-8 p-4 bg-amber-500/20 border border-amber-500/30 rounded-xl">
              <p className="text-amber-200 text-lg">
                💡 <strong>Pro Tip:</strong> AquaCafe Loyalty members get exclusive access to premium rewards and 2x point redemption value!
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}