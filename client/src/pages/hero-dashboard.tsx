import { useState, useEffect } from "react";
import { Trophy, Target, Star, Flame, Award, TrendingUp, Users, Calendar, Clock, CheckCircle, ArrowRight, Smartphone, Droplets, Recycle, Gift, Home, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Link, useLocation } from "wouter";

interface Hero {
  id: string;
  name: string;
  email: string;
  level: string;
  points: number;
  badges: string[];
  bottlesPrevented: number;
  co2Saved: number;
  sustainabilityStreak: number;
  rewardsEarned: any[];
  challengesCompleted: any[];
  currentMissions: Mission[];
}

interface Mission {
  id: string;
  title: string;
  description: string;
  category: string;
  pointsReward: number;
  timeLimit: string;
  icon: string;
  progress: number;
  status: 'active' | 'completed' | 'pending';
  gradient: string;
}

export default function HeroDashboard() {
  const [, setLocation] = useLocation();
  const [hero, setHero] = useState<Hero | null>(null);
  const [selectedTab, setSelectedTab] = useState("overview");
  
  useEffect(() => {
    // Get hero data from URL params or localStorage
    const urlParams = new URLSearchParams(window.location.search);
    const missionId = urlParams.get('mission');
    
    // Simulate hero data - replace with actual API call
    const heroData: Hero = {
      id: "hero_123",
      name: "Ahmed Al-Rashid",
      email: "ahmed@example.com",
      level: "Bronze Hero",
      points: 750,
      badges: ["First Trade", "Water Saver", "Eco Warrior"],
      bottlesPrevented: 45,
      co2Saved: 120,
      sustainabilityStreak: 7,
      rewardsEarned: [],
      challengesCompleted: [],
      currentMissions: missionId ? [getMissionById(missionId)] : []
    };
    
    setHero(heroData);
  }, []);

  const getMissionById = (id: string): Mission => {
    const missions: { [key: string]: Mission } = {
      'pakistan-flood-relief': {
        id: 'pakistan-flood-relief',
        title: 'Pakistan Flood Relief Mission',
        description: 'Urgent mission to provide clean water access to flood victims',
        category: 'Crisis Response',
        pointsReward: 2500,
        timeLimit: '7 days',
        icon: '🚨',
        progress: 15,
        status: 'active',
        gradient: 'from-red-500 to-orange-500'
      },
      'dubai-water-conservation': {
        id: 'dubai-water-conservation',
        title: 'Dubai Water Conservation Challenge',
        description: 'Help Dubai reduce water waste by 20%',
        category: 'Local Impact',
        pointsReward: 1500,
        timeLimit: '30 days',
        icon: '💧',
        progress: 0,
        status: 'active',
        gradient: 'from-blue-500 to-cyan-500'
      }
    };
    
    return missions[id] || missions['pakistan-flood-relief'];
  };

  const getLevelProgress = (points: number) => {
    const levels = [
      { name: "Bronze Hero", min: 0, max: 2500 },
      { name: "Silver Hero", min: 2500, max: 10000 },
      { name: "Gold Hero", min: 10000, max: 25000 },
      { name: "Platinum Hero", min: 25000, max: 50000 }
    ];
    
    const currentLevel = levels.find(level => points >= level.min && points < level.max) || levels[0];
    const progress = ((points - currentLevel.min) / (currentLevel.max - currentLevel.min)) * 100;
    
    return { currentLevel, progress, nextLevel: levels[levels.indexOf(currentLevel) + 1] };
  };

  if (!hero) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="text-white text-xl">Loading your hero dashboard...</div>
      </div>
    );
  }

  const { currentLevel, progress, nextLevel } = getLevelProgress(hero.points);

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Header Section */}
      <div className="bg-gradient-to-r from-green-500/10 to-emerald-500/10 border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full flex items-center justify-center">
                <Trophy className="w-8 h-8 text-white" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-white">Welcome back, {hero.name}!</h1>
                <div className="flex items-center gap-2 mt-1">
                  <Badge className="bg-amber-500/20 text-amber-400 border-amber-500/30">
                    {currentLevel.name}
                  </Badge>
                  <span className="text-gray-400">•</span>
                  <span className="text-green-400 font-bold">{hero.points.toLocaleString()} Planet Points</span>
                </div>
              </div>
            </div>
            
            <Link href="/leaderboard">
              <Button className="bg-blue-500 hover:bg-blue-600" data-testid="button-view-community">
                <Users className="w-4 h-4 mr-2" />
                View Community
              </Button>
            </Link>
          </div>

          {/* Level Progress */}
          <div className="bg-slate-800/50 rounded-xl p-6">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-lg font-semibold">Hero Level Progress</h3>
              {nextLevel && (
                <span className="text-gray-400 text-sm">
                  {nextLevel.min - hero.points} points to {nextLevel.name}
                </span>
              )}
            </div>
            <Progress value={progress} className="h-3 mb-2" />
            <div className="flex justify-between text-sm text-gray-400">
              <span>{currentLevel.min.toLocaleString()} PTS</span>
              <span>{currentLevel.max.toLocaleString()} PTS</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        <Tabs value={selectedTab} onValueChange={setSelectedTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-4 bg-slate-800/50">
            <TabsTrigger value="overview" data-testid="tab-overview">Overview</TabsTrigger>
            <TabsTrigger value="missions" data-testid="tab-missions">Active Missions</TabsTrigger>
            <TabsTrigger value="rewards" data-testid="tab-rewards">Rewards</TabsTrigger>
            <TabsTrigger value="impact" data-testid="tab-impact">My Impact</TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-6">
            {/* Quick Stats */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card className="bg-slate-800/50 border-slate-700">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-gray-400 text-sm">Total Points</p>
                      <p className="text-2xl font-bold text-green-400">{hero.points.toLocaleString()}</p>
                    </div>
                    <Star className="w-8 h-8 text-green-400" />
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-slate-800/50 border-slate-700">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-gray-400 text-sm">Bottles Saved</p>
                      <p className="text-2xl font-bold text-blue-400">{hero.bottlesPrevented}</p>
                    </div>
                    <Droplets className="w-8 h-8 text-blue-400" />
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-slate-800/50 border-slate-700">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-gray-400 text-sm">CO₂ Reduced</p>
                      <p className="text-2xl font-bold text-emerald-400">{hero.co2Saved}kg</p>
                    </div>
                    <Recycle className="w-8 h-8 text-emerald-400" />
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-slate-800/50 border-slate-700">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-gray-400 text-sm">Daily Streak</p>
                      <p className="text-2xl font-bold text-amber-400">{hero.sustainabilityStreak}</p>
                    </div>
                    <Flame className="w-8 h-8 text-amber-400" />
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Active Missions Preview */}
            {hero.currentMissions.length > 0 && (
              <Card className="bg-slate-800/50 border-slate-700">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="flex items-center gap-2">
                      <Target className="w-5 h-5 text-green-400" />
                      Active Mission
                    </CardTitle>
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => setSelectedTab("missions")}
                      data-testid="button-view-all-missions"
                    >
                      View All
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  {hero.currentMissions.map((mission) => (
                    <div key={mission.id} className="space-y-4">
                      <div className="flex items-center gap-3">
                        <div className="text-2xl">{mission.icon}</div>
                        <div className="flex-1">
                          <h4 className="font-semibold text-white">{mission.title}</h4>
                          <p className="text-gray-400 text-sm">{mission.category} • +{mission.pointsReward} PTS</p>
                        </div>
                        <Badge className="bg-red-500/20 text-red-400 border-red-500/30">
                          {mission.timeLimit} left
                        </Badge>
                      </div>
                      
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-400">Progress</span>
                          <span className="text-white">{mission.progress}%</span>
                        </div>
                        <Progress value={mission.progress} className="h-2" />
                      </div>
                      
                      <Button 
                        className="w-full bg-gradient-to-r from-red-500 to-orange-500 hover:from-red-400 hover:to-orange-400"
                        onClick={() => setLocation(`/mission-control-pakistan`)}
                        data-testid="button-continue-mission"
                      >
                        Continue Mission
                        <ArrowRight className="w-4 h-4 ml-2" />
                      </Button>
                    </div>
                  ))}
                </CardContent>
              </Card>
            )}

            {/* Badges */}
            <Card className="bg-slate-800/50 border-slate-700">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Award className="w-5 h-5 text-amber-400" />
                  Earned Badges
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-3">
                  {hero.badges.map((badge, index) => (
                    <div key={index} className="flex items-center gap-2 bg-amber-500/10 border border-amber-500/30 rounded-lg px-3 py-2">
                      <Trophy className="w-4 h-4 text-amber-400" />
                      <span className="text-amber-400 font-medium">{badge}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Missions Tab */}
          <TabsContent value="missions" className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold">Active Missions</h2>
              <Link href="/leaderboard">
                <Button variant="outline" data-testid="button-browse-missions">
                  Browse More Missions
                </Button>
              </Link>
            </div>

            {hero.currentMissions.length === 0 ? (
              <Card className="bg-slate-800/50 border-slate-700">
                <CardContent className="p-8 text-center">
                  <Target className="w-16 h-16 text-gray-600 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold mb-2">No Active Missions</h3>
                  <p className="text-gray-400 mb-4">Start your first mission to begin earning Planet Points!</p>
                  <Link href="/leaderboard">
                    <Button className="bg-green-500 hover:bg-green-600" data-testid="button-start-first-mission">
                      Browse Available Missions
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            ) : (
              <div className="space-y-4">
                {hero.currentMissions.map((mission) => (
                  <Card key={mission.id} className="bg-slate-800/50 border-slate-700">
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-3">
                          <div className="text-3xl">{mission.icon}</div>
                          <div>
                            <h3 className="text-xl font-bold text-white">{mission.title}</h3>
                            <p className="text-gray-400">{mission.description}</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="text-green-400 font-bold text-2xl">+{mission.pointsReward} PTS</div>
                          <div className="text-gray-400 text-sm">{mission.timeLimit}</div>
                        </div>
                      </div>
                      
                      <div className="space-y-2 mb-4">
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-400">Mission Progress</span>
                          <span className="text-white">{mission.progress}% Complete</span>
                        </div>
                        <Progress value={mission.progress} className="h-3" />
                      </div>
                      
                      <div className="flex gap-3">
                        <Button 
                          className="flex-1 bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-400 hover:to-emerald-400"
                          onClick={() => setLocation(`/mission-control-pakistan`)}
                          data-testid={`button-continue-${mission.id}`}
                        >
                          Continue Mission
                        </Button>
                        <Button variant="outline" size="icon" data-testid={`button-share-${mission.id}`}>
                          <Users className="w-4 h-4" />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </TabsContent>

          {/* Rewards Tab */}
          <TabsContent value="rewards" className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold">Available Rewards</h2>
              <div className="text-right">
                <div className="text-green-400 font-bold text-xl">{hero.points.toLocaleString()} Points Available</div>
                <div className="text-gray-400 text-sm">Ready to redeem</div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* Sample rewards */}
              <Card className="bg-slate-800/50 border-slate-700">
                <CardContent className="p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <Smartphone className="w-8 h-8 text-blue-400" />
                    <div>
                      <h3 className="font-bold">iPhone 17 Pro Max</h3>
                      <p className="text-gray-400 text-sm">Latest flagship device</p>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="text-amber-400 font-bold text-lg">45,000 PTS</div>
                    <Button size="sm" disabled data-testid="button-redeem-iphone">
                      Need More Points
                    </Button>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-slate-800/50 border-slate-700">
                <CardContent className="p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <Gift className="w-8 h-8 text-green-400" />
                    <div>
                      <h3 className="font-bold">AED 50 Voucher</h3>
                      <p className="text-gray-400 text-sm">Restaurant dining credit</p>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="text-amber-400 font-bold text-lg">500 PTS</div>
                    <Button size="sm" className="bg-green-500 hover:bg-green-600" data-testid="button-redeem-voucher">
                      Redeem
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Impact Tab */}
          <TabsContent value="impact" className="space-y-6">
            <h2 className="text-2xl font-bold">Your Environmental Impact</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card className="bg-slate-800/50 border-slate-700">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <TrendingUp className="w-5 h-5 text-green-400" />
                    Impact Growth
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-400">Bottles Prevented</span>
                      <span className="text-2xl font-bold text-blue-400">+{hero.bottlesPrevented}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-400">CO₂ Reduced</span>
                      <span className="text-2xl font-bold text-green-400">+{hero.co2Saved}kg</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-400">Planet Points Earned</span>
                      <span className="text-2xl font-bold text-amber-400">+{hero.points}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-slate-800/50 border-slate-700">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Calendar className="w-5 h-5 text-amber-400" />
                    Daily Streak
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-center">
                    <div className="text-4xl font-bold text-amber-400 mb-2">{hero.sustainabilityStreak}</div>
                    <div className="text-gray-400">Days of consistent action</div>
                    <div className="mt-4 p-4 bg-amber-500/10 border border-amber-500/30 rounded-lg">
                      <div className="text-amber-400 font-medium">Keep going!</div>
                      <div className="text-gray-400 text-sm">You're making a real difference</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}