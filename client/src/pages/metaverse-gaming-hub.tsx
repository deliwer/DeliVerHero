import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { 
  Gamepad2, 
  Trophy, 
  Target, 
  Zap, 
  Star, 
  Atom, 
  Rocket,
  Crown,
  Medal,
  Award,
  TrendingUp,
  Users,
  Clock,
  Gift,
  Sparkles
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { TombolaWidget } from "@/components/tombola-widget";
import { useToast } from "@/hooks/use-toast";

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

export default function MetaverseGamingHub() {
  const [activeTab, setActiveTab] = useState<"tombola" | "achievements" | "leaderboard">("tombola");
  const [heroId] = useState("current-hero-id"); // This would come from auth context
  const { toast } = useToast();

  // Mock data - in real app would come from API
  const achievements: Achievement[] = [
    {
      id: "first-spin",
      name: "🚀 First Launch",
      description: "Complete your first cosmic tombola spin",
      icon: "🌌",
      rarity: "common",
      progress: 1,
      maxProgress: 1,
      completed: true,
      rewards: "50 Planet Points + F&B Starter Badge"
    },
    {
      id: "spin-master",
      name: "🎮 Spin Master",
      description: "Complete 50 tombola spins across all themes",
      icon: "⚡",
      rarity: "rare",
      progress: 23,
      maxProgress: 50,
      completed: false,
      rewards: "500 Planet Points + Premium Dining Access"
    },
    {
      id: "voucher-collector",
      name: "🎫 Voucher Vault",
      description: "Collect 25 restaurant vouchers through gaming",
      icon: "🍽️",
      rarity: "epic",
      progress: 12,
      maxProgress: 25,
      completed: false,
      rewards: "1000 Planet Points + VIP Restaurant Status"
    },
    {
      id: "cosmic-champion",
      name: "👑 Cosmic Champion",
      description: "Reach top 10 on sustainability leaderboard",
      icon: "🌟",
      rarity: "legendary",
      progress: 0,
      maxProgress: 1,
      completed: false,
      rewards: "2500 Planet Points + Exclusive Chef Experience"
    },
    {
      id: "planet-protector",
      name: "🌍 Planet Protector",
      description: "Contribute to 5 different sustainability missions",
      icon: "🛡️",
      rarity: "epic",
      progress: 3,
      maxProgress: 5,
      completed: false,
      rewards: "1500 Planet Points + Eco-Warrior Title"
    },
    {
      id: "metaverse-explorer",
      name: "🛸 Metaverse Explorer",
      description: "Unlock all restaurant cuisine categories",
      icon: "🌈",
      rarity: "rare",
      progress: 6,
      maxProgress: 8,
      completed: false,
      rewards: "750 Planet Points + Cultural Ambassador Badge"
    }
  ];

  const leaderboard: LeaderboardEntry[] = [
    {
      rank: 1,
      heroName: "Ahmed Al-Rashid",
      level: "Cosmic Champion",
      totalSpins: 247,
      vouchersEarned: 89,
      sustainabilityScore: 9840,
      avatar: "🥇"
    },
    {
      rank: 2,
      heroName: "Fatima Hassan",
      level: "Galactic Warrior",
      totalSpins: 198,
      vouchersEarned: 76,
      sustainabilityScore: 8920,
      avatar: "🥈"
    },
    {
      rank: 3,
      heroName: "Omar Khan",
      level: "Star Commander",
      totalSpins: 156,
      vouchersEarned: 62,
      sustainabilityScore: 7650,
      avatar: "🥉"
    },
    {
      rank: 4,
      heroName: "Aisha Al-Zahra",
      level: "Planet Guardian",
      totalSpins: 134,
      vouchersEarned: 48,
      sustainabilityScore: 6890,
      avatar: "🌟"
    },
    {
      rank: 5,
      heroName: "Mohammed Ali",
      level: "Eco Explorer",
      totalSpins: 112,
      vouchersEarned: 41,
      sustainabilityScore: 5940,
      avatar: "⚡"
    }
  ];

  const getRarityColor = (rarity: string) => {
    switch (rarity) {
      case "legendary": return "text-yellow-400 bg-yellow-500/20 border-yellow-500/50";
      case "epic": return "text-purple-400 bg-purple-500/20 border-purple-500/50";
      case "rare": return "text-blue-400 bg-blue-500/20 border-blue-500/50";
      default: return "text-gray-400 bg-gray-500/20 border-gray-500/50";
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-950/30 to-slate-900 py-12">
      {/* Cosmic Background Effects */}
      <div className="fixed inset-0 opacity-10 pointer-events-none">
        <div className="absolute top-20 left-10 w-2 h-2 bg-purple-400 rounded-full animate-pulse"></div>
        <div className="absolute top-40 right-20 w-1 h-1 bg-blue-400 rounded-full animate-pulse delay-300"></div>
        <div className="absolute bottom-60 left-20 w-2 h-2 bg-pink-400 rounded-full animate-pulse delay-700"></div>
        <div className="absolute bottom-20 right-10 w-1 h-1 bg-cyan-400 rounded-full animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/4 w-1 h-1 bg-yellow-400 rounded-full animate-pulse delay-500"></div>
        <div className="absolute top-1/3 right-1/3 w-2 h-2 bg-emerald-400 rounded-full animate-pulse delay-800"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex justify-center items-center gap-4 mb-6">
            <div className="relative">
              <Atom className="w-16 h-16 text-purple-400 animate-spin" />
              <div className="absolute inset-0 w-16 h-16 bg-purple-500/20 rounded-full animate-ping"></div>
            </div>
            <span className="text-5xl font-bold bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400 bg-clip-text text-transparent">
              🌌 Metaverse Gaming Hub
            </span>
            <div className="relative">
              <Rocket className="w-16 h-16 text-cyan-400" />
              <div className="absolute -top-2 -right-2 w-6 h-6 bg-pink-500 rounded-full animate-bounce flex items-center justify-center text-xs">🎮</div>
            </div>
          </div>
          <h1 className="text-4xl font-bold text-white mb-4">
            🚀 Your Cosmic F&B Adventure Awaits
          </h1>
          <p className="text-xl text-gray-300 max-w-4xl mx-auto mb-8">
            Play, earn, and dine! Spin the metaverse tombola, unlock achievements, climb leaderboards, and redeem premium restaurant vouchers while contributing to global sustainability missions.
          </p>
          
          {/* Tab Navigation */}
          <div className="flex justify-center gap-4 mb-8">
            {[
              { id: "tombola", icon: Target, label: "🎯 Cosmic Tombola" },
              { id: "achievements", icon: Trophy, label: "🏆 Achievements" },
              { id: "leaderboard", icon: Crown, label: "👑 Leaderboard" }
            ].map((tab) => (
              <Button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as typeof activeTab)}
                className={`${
                  activeTab === tab.id
                    ? "bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg shadow-purple-500/30"
                    : "bg-slate-800/50 border border-slate-600 text-slate-300 hover:bg-slate-700"
                } px-6 py-3 rounded-lg transition-all transform hover:scale-105`}
                data-testid={`tab-${tab.id}`}
              >
                <tab.icon className="w-5 h-5 mr-2" />
                {tab.label}
              </Button>
            ))}
          </div>
        </div>

        {/* Gaming Stats Overview */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
          <Card className="bg-gradient-to-br from-purple-950/60 to-indigo-950/60 border-purple-500/40">
            <CardContent className="p-4 text-center">
              <Gamepad2 className="w-8 h-8 text-purple-400 mx-auto mb-2" />
              <div className="text-2xl font-bold text-purple-400">156</div>
              <div className="text-purple-200 text-sm">Total Spins</div>
            </CardContent>
          </Card>
          
          <Card className="bg-gradient-to-br from-pink-950/60 to-rose-950/60 border-pink-500/40">
            <CardContent className="p-4 text-center">
              <Gift className="w-8 h-8 text-pink-400 mx-auto mb-2" />
              <div className="text-2xl font-bold text-pink-400">42</div>
              <div className="text-pink-200 text-sm">Vouchers Won</div>
            </CardContent>
          </Card>
          
          <Card className="bg-gradient-to-br from-cyan-950/60 to-blue-950/60 border-cyan-500/40">
            <CardContent className="p-4 text-center">
              <Award className="w-8 h-8 text-cyan-400 mx-auto mb-2" />
              <div className="text-2xl font-bold text-cyan-400">8/24</div>
              <div className="text-cyan-200 text-sm">Achievements</div>
            </CardContent>
          </Card>
          
          <Card className="bg-gradient-to-br from-emerald-950/60 to-green-950/60 border-emerald-500/40">
            <CardContent className="p-4 text-center">
              <TrendingUp className="w-8 h-8 text-emerald-400 mx-auto mb-2" />
              <div className="text-2xl font-bold text-emerald-400">#12</div>
              <div className="text-emerald-200 text-sm">Leaderboard Rank</div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content Tabs */}
        {activeTab === "tombola" && (
          <div className="space-y-8">
            <div className="grid lg:grid-cols-2 gap-8">
              <div>
                <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
                  <Target className="w-6 h-6 text-purple-400" />
                  🎯 Cosmic Tombola Wheel
                </h2>
                <TombolaWidget heroId={heroId} theme="metaverse" size="full" data-testid="metaverse-tombola-widget" />
              </div>
              
              <div className="space-y-6">
                <Card className="bg-gradient-to-br from-purple-950/50 to-indigo-950/50 border-purple-500/40">
                  <CardHeader>
                    <CardTitle className="text-purple-100 flex items-center gap-2">
                      <Sparkles className="w-5 h-5 text-purple-400" />
                      🌟 Today's Cosmic Specials
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="p-4 bg-gradient-to-r from-purple-900/40 to-pink-900/40 border border-purple-500/30 rounded-lg">
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-purple-300 font-semibold">🍣 Nobu Dubai Bonus</span>
                          <Badge className="bg-purple-500/20 text-purple-300">2x Points</Badge>
                        </div>
                        <p className="text-purple-200 text-sm">Spin for premium sushi vouchers with double point rewards!</p>
                      </div>
                      
                      <div className="p-4 bg-gradient-to-r from-cyan-900/40 to-blue-900/40 border border-cyan-500/30 rounded-lg">
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-cyan-300 font-semibold">🇫🇷 French Fine Dining</span>
                          <Badge className="bg-cyan-500/20 text-cyan-300">Exclusive</Badge>
                        </div>
                        <p className="text-cyan-200 text-sm">Limited La Petite Maison chef's table experiences available!</p>
                      </div>
                      
                      <div className="p-4 bg-gradient-to-r from-emerald-900/40 to-green-900/40 border border-emerald-500/30 rounded-lg">
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-emerald-300 font-semibold">🌱 Sustainability Boost</span>
                          <Badge className="bg-emerald-500/20 text-emerald-300">Mission</Badge>
                        </div>
                        <p className="text-emerald-200 text-sm">Every spin contributes to global environmental missions!</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                
                <Card className="bg-gradient-to-br from-slate-900/50 to-slate-800/50 border-slate-600">
                  <CardHeader>
                    <CardTitle className="text-white flex items-center gap-2">
                      <Clock className="w-5 h-5 text-blue-400" />
                      ⏰ Gaming Statistics
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span className="text-gray-300">Daily Spins Remaining:</span>
                        <span className="text-blue-400 font-semibold">3/5</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-300">Win Rate:</span>
                        <span className="text-emerald-400 font-semibold">78%</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-300">Streak:</span>
                        <span className="text-purple-400 font-semibold">12 spins</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-300">Next Achievement:</span>
                        <span className="text-cyan-400 font-semibold">Spin Master</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        )}

        {activeTab === "achievements" && (
          <div>
            <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
              <Trophy className="w-6 h-6 text-yellow-400" />
              🏆 Metaverse Achievements
            </h2>
            
            <div className="grid md:grid-cols-2 gap-6">
              {achievements.map((achievement) => (
                <Card 
                  key={achievement.id} 
                  className={`border ${getRarityColor(achievement.rarity)} ${
                    achievement.completed ? 'shadow-lg' : 'opacity-75'
                  } relative overflow-hidden`}
                >
                  {achievement.completed && (
                    <div className="absolute top-2 right-2">
                      <Badge className="bg-emerald-500/20 text-emerald-400 border-emerald-500/50">
                        ✓ Completed
                      </Badge>
                    </div>
                  )}
                  
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      <div className="text-4xl">{achievement.icon}</div>
                      <div className="flex-1">
                        <h3 className="text-lg font-bold text-white mb-2">{achievement.name}</h3>
                        <p className="text-gray-300 text-sm mb-3">{achievement.description}</p>
                        
                        <div className="space-y-2">
                          <div className="flex justify-between text-sm">
                            <span className="text-gray-400">Progress</span>
                            <span className="text-white">{achievement.progress}/{achievement.maxProgress}</span>
                          </div>
                          <Progress 
                            value={(achievement.progress / achievement.maxProgress) * 100} 
                            className="h-2"
                          />
                        </div>
                        
                        <div className="mt-3 p-2 bg-slate-800/50 rounded border border-slate-600">
                          <div className="text-xs text-gray-400 mb-1">Rewards:</div>
                          <div className="text-sm text-yellow-400">{achievement.rewards}</div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}

        {activeTab === "leaderboard" && (
          <div>
            <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
              <Crown className="w-6 h-6 text-yellow-400" />
              👑 Cosmic Champions Leaderboard
            </h2>
            
            <Card className="bg-gradient-to-br from-slate-900/50 to-slate-800/50 border-slate-600">
              <CardContent className="p-0">
                <div className="space-y-4 p-6">
                  {leaderboard.map((entry, index) => (
                    <div 
                      key={entry.rank}
                      className={`p-4 rounded-lg border ${
                        entry.rank <= 3 
                          ? 'bg-gradient-to-r from-yellow-900/20 to-amber-900/20 border-yellow-500/50' 
                          : 'bg-slate-800/50 border-slate-600'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                          <div className="text-3xl">{entry.avatar}</div>
                          <div>
                            <div className="flex items-center gap-2">
                              <span className="text-xl font-bold text-white">#{entry.rank}</span>
                              <span className="text-lg font-semibold text-white">{entry.heroName}</span>
                            </div>
                            <div className="text-sm text-gray-400">{entry.level}</div>
                          </div>
                        </div>
                        
                        <div className="grid grid-cols-3 gap-6 text-center">
                          <div>
                            <div className="text-lg font-bold text-purple-400">{entry.totalSpins}</div>
                            <div className="text-xs text-gray-400">Spins</div>
                          </div>
                          <div>
                            <div className="text-lg font-bold text-pink-400">{entry.vouchersEarned}</div>
                            <div className="text-xs text-gray-400">Vouchers</div>
                          </div>
                          <div>
                            <div className="text-lg font-bold text-emerald-400">{entry.sustainabilityScore.toLocaleString()}</div>
                            <div className="text-xs text-gray-400">Eco Score</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
            
            <div className="mt-8 text-center">
              <Card className="bg-gradient-to-r from-purple-900/40 to-pink-900/40 border-purple-500/50 inline-block">
                <CardContent className="p-6">
                  <div className="flex items-center gap-3 text-purple-200">
                    <Users className="w-6 h-6 text-purple-400" />
                    <span className="text-lg">2,847 active players worldwide • Join the cosmic competition!</span>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}