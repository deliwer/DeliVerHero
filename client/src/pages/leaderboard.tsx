import { Trophy, Crown, Medal, Star, Users, Target, Zap, Globe, Heart, Award, TrendingUp, MessageCircle, Share2, MapPin, Gift, Calendar, CheckCircle, Flame, Send, Camera, Hash, Filter, Search, Plus, Droplet, Recycle, ExternalLink, Clock, Play, Phone } from "lucide-react";
import { useLeaderboard } from "@/hooks/use-leaderboard";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Link } from "wouter";
import { useState } from "react";
import { SocialChallengesFeed } from "@/components/social-challenges-feed";

export default function Leaderboard() {
  const { data: heroes, isLoading, error } = useLeaderboard(50);
  const [activeTab, setActiveTab] = useState<string>("leaderboard");
  const [newPost, setNewPost] = useState({ title: "", content: "", category: "water" as const });
  const [forumSearchQuery, setForumSearchQuery] = useState("");
  
  // Enhanced community stats for addiction and engagement
  const communityStats = {
    totalMembers: 12847,
    bottlesPrevented: 2400000,
    co2Saved: 180,
    treesEquivalent: 2400,
    monthlyGrowth: 23,
    activeDistricts: 24,
    weeklyChallenge: "1 Million Bottles by Ramadan",
    liveActivities: 47,
    dailyCheckins: 3892,
    streakLeaders: 156
  };

  // Recent community activities for live feed
  const recentActivities = [
    {
      id: "1",
      user: "Sarah K.",
      avatar: "SK",
      action: "just earned 500 points for iPhone 13 trade-in",
      timeAgo: "2 min ago",
      type: "earn",
      location: "Dubai Marina"
    },
    {
      id: "2", 
      user: "Ahmed R.",
      avatar: "AR",
      action: "completed Water Conservation Challenge",
      timeAgo: "5 min ago",
      type: "challenge",
      location: "Downtown Dubai"
    },
    {
      id: "3",
      user: "Lisa M.",
      avatar: "LM", 
      action: "started 7-day sustainability streak",
      timeAgo: "8 min ago",
      type: "streak",
      location: "JBR"
    },
    {
      id: "4",
      user: "Hassan A.",
      avatar: "HA",
      action: "invited 3 friends to join movement",
      timeAgo: "12 min ago", 
      type: "referral",
      location: "Business Bay"
    }
  ];

  // Community events for engagement
  const upcomingEvents = [
    {
      id: "ramadan2025",
      title: "1 Million Bottles by Ramadan",
      description: "Community-wide challenge to prevent 1 million plastic bottles",
      date: "March 10, 2025",
      participants: 8947,
      reward: "Golden Hero Badge + AED 1000 Voucher",
      type: "challenge" as const,
      status: "active" as const,
      timeLeft: "23 days"
    },
    {
      id: "iphone17launch",
      title: "iPhone 17 Launch Day Mega Event",
      description: "Trade your old iPhone for the latest iPhone 17 + AquaCafe credits",
      date: "September 9, 2025",
      participants: 15230,
      reward: "iPhone 17 + Premium Water System",
      type: "social" as const,
      status: "upcoming" as const,
      timeLeft: "2 days"
    }
  ];

  // Social posts for community engagement
  const socialPosts = [
    {
      id: "1",
      author: "Fatima Al-Zahra",
      avatar: "FZ",
      content: "Just traded my iPhone 12 for 450 Planet Points and got a full AquaCafe system installed! The water tastes amazing and I'm contributing to Dubai's sustainability goals. Who's next? 💧🌱",
      image: "/attached_assets/aquacafe_shower_main_1755270492134.jpg",
      likes: 127,
      comments: 23,
      shares: 45,
      timeAgo: "1 hour ago",
      badges: ["Water Hero", "Trade Champion"],
      location: "Palm Jumeirah"
    },
    {
      id: "2", 
      author: "Mohammed Rashid",
      avatar: "MR",
      content: "Our office challenge is heating up! Team Marina vs Team Downtown in the sustainability race. We've prevented 2,000 bottles this week alone. Challenge accepted! 🏆",
      likes: 89,
      comments: 34,
      shares: 12,
      timeAgo: "3 hours ago",
      badges: ["Corporate Hero", "Challenge Master"],
      location: "Business Bay"
    }
  ];

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
    <div className="min-h-screen bg-dubai-gradient">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 bg-amber-500/20 text-amber-400 px-4 py-2 rounded-full mb-6">
            <Flame className="w-5 h-5" />
            <span className="font-medium">Community Hub • {communityStats.liveActivities} Live Now</span>
          </div>
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6" data-testid="page-title">
            Dubai Planet Heroes
            <span className="block text-amber-400">Community & Leaderboard</span>
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-6">
            Join 12,847+ sustainability champions. Compete, connect, and earn rewards as we build Dubai's most sustainable community together.
          </p>
          
          {/* iPhone 17 Launch Countdown */}
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-600/20 to-purple-600/20 border border-blue-500/30 text-blue-300 px-6 py-3 rounded-full">
            <Calendar className="w-5 h-5" />
            <span className="font-bold">iPhone 17 Launch in 2 days • Join 15,230 heroes ready to trade!</span>
          </div>
        </div>

        {/* Live Stats Banner */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-gradient-to-r from-amber-500/20 to-orange-500/20 border border-amber-500/30 rounded-xl p-4 text-center">
            <div className="text-2xl font-bold text-amber-400">{communityStats.totalMembers.toLocaleString()}</div>
            <div className="text-sm text-amber-300">Active Heroes</div>
            <div className="text-xs text-gray-400">+{communityStats.monthlyGrowth}% this month</div>
          </div>
          <div className="bg-gradient-to-r from-hero-green-500/20 to-emerald-500/20 border border-hero-green-500/30 rounded-xl p-4 text-center">
            <div className="text-2xl font-bold text-hero-green-400">{(communityStats.bottlesPrevented / 1000000).toFixed(1)}M</div>
            <div className="text-sm text-hero-green-300">Bottles Prevented</div>
            <div className="text-xs text-gray-400">Community impact</div>
          </div>
          <div className="bg-gradient-to-r from-blue-500/20 to-cyan-500/20 border border-blue-500/30 rounded-xl p-4 text-center">
            <div className="text-2xl font-bold text-blue-400">{communityStats.dailyCheckins.toLocaleString()}</div>
            <div className="text-sm text-blue-300">Daily Check-ins</div>
            <div className="text-xs text-gray-400">Today</div>
          </div>
          <div className="bg-gradient-to-r from-purple-500/20 to-pink-500/20 border border-purple-500/30 rounded-xl p-4 text-center">
            <div className="text-2xl font-bold text-purple-400">{communityStats.streakLeaders}</div>
            <div className="text-sm text-purple-300">Streak Leaders</div>
            <div className="text-xs text-gray-400">7+ days active</div>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="flex flex-wrap justify-center gap-2 mb-8">
          {[
            { id: "leaderboard", label: "🏆 Rankings", icon: Trophy },
            { id: "live", label: "🔴 Live Feed", icon: Zap },
            { id: "challenges", label: "🎯 Challenges", icon: Target },
            { id: "social", label: "💬 Social", icon: MessageCircle },
            { id: "events", label: "📅 Events", icon: Calendar },
            { id: "forum", label: "💭 Forum", icon: MessageCircle },
            { id: "rewards", label: "🎁 Rewards", icon: Gift },
            { id: "map", label: "🗺️ Dubai Map", icon: MapPin }
          ].map(({ id, label, icon: Icon }) => (
            <button
              key={id}
              onClick={() => setActiveTab(id)}
              className={`flex items-center px-4 py-2 rounded-xl font-medium transition-all text-sm ${
                activeTab === id
                  ? 'bg-gradient-to-r from-amber-500 to-orange-500 text-black shadow-lg'
                  : 'glass text-white hover:bg-slate-700/50 border border-slate-600'
              }`}
              data-testid={`tab-${id}`}
            >
              <span className="mr-2">{label.split(' ')[0]}</span>
              <span className="hidden sm:inline">{label.split(' ').slice(1).join(' ')}</span>
            </button>
          ))}
        </div>

        {/* Tab Content */}
        
        {/* Live Feed Tab */}
        {activeTab === "live" && (
          <div className="space-y-6">
            <Card className="bg-gradient-to-r from-red-900/30 to-orange-900/30 border border-red-500/30">
              <CardContent className="p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
                  <h2 className="text-xl font-bold text-white">🔴 Live Community Activity</h2>
                  <Badge className="bg-red-500/20 text-red-400">
                    {communityStats.liveActivities} activities now
                  </Badge>
                </div>
                
                <div className="space-y-3">
                  {recentActivities.map((activity) => (
                    <div key={activity.id} className="flex items-center gap-4 p-3 bg-slate-800/30 rounded-lg">
                      <Avatar className="w-10 h-10">
                        <AvatarFallback className="bg-gradient-to-r from-amber-500 to-orange-500 text-black font-bold text-sm">
                          {activity.avatar}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <span className="font-medium text-white">{activity.user}</span>
                          <span className="text-gray-300">{activity.action}</span>
                        </div>
                        <div className="flex items-center gap-3 text-sm text-gray-400">
                          <span>{activity.timeAgo}</span>
                          <span>•</span>
                          <span className="flex items-center gap-1">
                            <MapPin className="w-3 h-3" />
                            {activity.location}
                          </span>
                        </div>
                      </div>
                      <Badge className={`${
                        activity.type === 'earn' ? 'bg-amber-500/20 text-amber-400' :
                        activity.type === 'challenge' ? 'bg-hero-green-500/20 text-hero-green-400' :
                        activity.type === 'streak' ? 'bg-purple-500/20 text-purple-400' :
                        'bg-blue-500/20 text-blue-400'
                      }`}>
                        {activity.type}
                      </Badge>
                    </div>
                  ))}
                </div>
                
                <div className="mt-4 text-center">
                  <Button className="bg-gradient-to-r from-red-500 to-orange-500 text-white">
                    <Zap className="w-4 h-4 mr-2" />
                    Join Live Activity
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Challenges Tab */}
        {activeTab === "challenges" && (
          <div className="space-y-6">
            <SocialChallengesFeed />
            
            {/* Featured iPhone 17 Challenge */}
            <Card className="bg-gradient-to-r from-blue-900/50 to-purple-900/50 border border-blue-500/30">
              <CardContent className="p-8">
                <div className="text-center mb-6">
                  <div className="inline-flex items-center gap-2 bg-blue-500/20 px-4 py-2 rounded-full mb-4">
                    <Phone className="w-5 h-5 text-blue-400" />
                    <span className="font-bold text-blue-300">iPhone 17 Launch Special</span>
                  </div>
                  <h2 className="text-3xl font-bold text-white mb-4">🚀 Ultimate Trade Challenge</h2>
                  <p className="text-gray-300 max-w-2xl mx-auto">
                    Be among the first 100 heroes to trade your old iPhone for the new iPhone 17 + AquaCafe system. Limited time offer ending September 9th!
                  </p>
                </div>
                
                <div className="grid md:grid-cols-3 gap-6 mb-6">
                  <div className="text-center p-4 bg-blue-500/10 rounded-lg">
                    <Phone className="w-8 h-8 text-blue-400 mx-auto mb-2" />
                    <div className="text-xl font-bold text-blue-400">iPhone 17</div>
                    <div className="text-sm text-gray-400">Latest model</div>
                  </div>
                  <div className="text-center p-4 bg-hero-green-500/10 rounded-lg">
                    <Droplet className="w-8 h-8 text-hero-green-400 mx-auto mb-2" />
                    <div className="text-xl font-bold text-hero-green-400">AquaCafe Pro</div>
                    <div className="text-sm text-gray-400">Premium system</div>
                  </div>
                  <div className="text-center p-4 bg-amber-500/10 rounded-lg">
                    <Trophy className="w-8 h-8 text-amber-400 mx-auto mb-2" />
                    <div className="text-xl font-bold text-amber-400">Hero Status</div>
                    <div className="text-sm text-gray-400">Platinum level</div>
                  </div>
                </div>
                
                <div className="text-center">
                  <Link href="/earn">
                    <Button className="bg-gradient-to-r from-blue-500 to-purple-500 text-white px-8 py-4 text-lg">
                      <Target className="w-5 h-5 mr-2" />
                      Start Trading Challenge
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Social Feed Tab */}
        {activeTab === "social" && (
          <div className="space-y-6">
            {/* Post Creation */}
            <Card className="bg-gradient-to-r from-slate-800/50 to-slate-700/50 border border-slate-600">
              <CardContent className="p-6">
                <div className="flex items-center gap-4 mb-4">
                  <Avatar className="w-12 h-12">
                    <AvatarFallback className="bg-gradient-to-r from-amber-500 to-orange-500 text-black font-bold">
                      YOU
                    </AvatarFallback>
                  </Avatar>
                  <Input
                    placeholder="Share your Planet Hero journey... How did you earn today?"
                    className="flex-1 bg-slate-700/50 border-slate-600 text-white"
                    data-testid="social-post-input"
                  />
                  <Button className="bg-gradient-to-r from-amber-500 to-orange-500 text-black">
                    <Send className="w-4 h-4 mr-2" />
                    Share
                  </Button>
                </div>
                <div className="flex gap-4 text-sm">
                  <Button variant="outline" size="sm" className="border-slate-600 text-gray-300">
                    <Camera className="w-4 h-4 mr-1" />
                    Photo
                  </Button>
                  <Button variant="outline" size="sm" className="border-slate-600 text-gray-300">
                    <MapPin className="w-4 h-4 mr-1" />
                    Location
                  </Button>
                  <Button variant="outline" size="sm" className="border-slate-600 text-gray-300">
                    <Hash className="w-4 h-4 mr-1" />
                    Challenge
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Social Posts */}
            {socialPosts.map((post) => (
              <Card key={post.id} className="bg-slate-800/50 border-slate-700">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <Avatar className="w-12 h-12">
                      <AvatarFallback className="bg-gradient-to-r from-hero-green-500 to-emerald-500 text-black font-bold">
                        {post.avatar}
                      </AvatarFallback>
                    </Avatar>
                    
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <h4 className="font-bold text-white">{post.author}</h4>
                        {post.badges?.map((badge, index) => (
                          <Badge key={index} className="bg-amber-500/20 text-amber-400 border-amber-500/30 text-xs">
                            {badge}
                          </Badge>
                        ))}
                        <span className="text-gray-400 text-sm">• {post.timeAgo}</span>
                      </div>
                      
                      <p className="text-gray-300 mb-4">{post.content}</p>
                      
                      {post.image && (
                        <div className="mb-4 rounded-lg overflow-hidden">
                          <img 
                            src={post.image} 
                            alt="User post" 
                            className="w-full h-48 object-cover"
                          />
                        </div>
                      )}
                      
                      <div className="flex items-center gap-6 text-gray-400">
                        <button className="flex items-center gap-2 hover:text-red-400 transition-colors">
                          <Heart className="w-4 h-4" />
                          <span>{post.likes}</span>
                        </button>
                        <button className="flex items-center gap-2 hover:text-blue-400 transition-colors">
                          <MessageCircle className="w-4 h-4" />
                          <span>{post.comments}</span>
                        </button>
                        <button className="flex items-center gap-2 hover:text-green-400 transition-colors">
                          <Share2 className="w-4 h-4" />
                          <span>{post.shares}</span>
                        </button>
                        <div className="flex items-center gap-1 text-sm">
                          <MapPin className="w-3 h-3" />
                          {post.location}
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {/* Events Tab */}
        {activeTab === "events" && (
          <div className="space-y-6">
            {upcomingEvents.map((event) => (
              <Card key={event.id} className="bg-gradient-to-r from-slate-800/50 to-slate-700/50 border border-slate-600">
                <CardContent className="p-6">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="text-2xl font-bold text-white">{event.title}</h3>
                        <Badge className={`${
                          event.status === 'active' ? 'bg-hero-green-500/20 text-hero-green-500 border-hero-green-500/30' :
                          'bg-blue-500/20 text-blue-500 border-blue-500/30'
                        }`}>
                          {event.status} • {event.timeLeft} left
                        </Badge>
                      </div>
                      <p className="text-gray-300 mb-4">{event.description}</p>
                      <div className="flex items-center gap-6 text-sm text-gray-400 mb-4">
                        <div className="flex items-center gap-1">
                          <Calendar className="w-4 h-4" />
                          {event.date}
                        </div>
                        <div className="flex items-center gap-1">
                          <Users className="w-4 h-4" />
                          {event.participants.toLocaleString()} joined
                        </div>
                      </div>
                      <div className="p-3 bg-amber-500/10 border border-amber-500/30 rounded-lg">
                        <div className="flex items-center gap-2">
                          <Gift className="w-5 h-5 text-amber-500" />
                          <span className="text-amber-400 font-medium">Reward: {event.reward}</span>
                        </div>
                      </div>
                    </div>
                    
                    <Button className={`${
                      event.status === 'active' ? 'bg-hero-green-500 hover:bg-hero-green-600' :
                      'bg-blue-500 hover:bg-blue-600'
                    } text-white px-6 py-3`}>
                      {event.status === 'active' ? 'Join Event' : 'Pre-Register'}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {/* Default: Leaderboard Tab */}
        {activeTab === "leaderboard" && (
          <div className="space-y-6">
            {/* Current Challenge Banner */}
            <Card className="bg-gradient-to-r from-red-900/50 to-orange-900/50 border border-red-500/30">
              <CardContent className="p-6">
                <div className="text-center mb-4">
                  <h2 className="text-2xl font-bold text-white mb-2 flex items-center justify-center gap-2">
                    <Target className="w-6 h-6 text-red-400" />
                    {communityStats.weeklyChallenge}
                  </h2>
                  <p className="text-gray-300">Dubai community target: prevent 1 million plastic bottles before Ramadan</p>
                </div>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-gray-400">Progress:</span>
                  <span className="font-bold text-red-400">847K / 1M bottles</span>
                </div>
                <div className="w-full bg-slate-700 rounded-full h-3 mb-4">
                  <div className="bg-gradient-to-r from-red-500 to-orange-500 h-3 rounded-full" style={{width: '85%'}}></div>
                </div>
                <div className="flex gap-2 justify-center">
                  <Link href="/play">
                    <Button className="bg-red-600 hover:bg-red-700 text-white">Join Challenge</Button>
                  </Link>
                  <Link href="/earn">
                    <Button variant="outline" className="border-orange-500 text-orange-300">Trade iPhone</Button>
                  </Link>
                </div>
              </CardContent>
            </Card>

            {/* Leaderboard Table */}
            <Card className="bg-slate-800/50 border-slate-700">
              <CardHeader>
                <CardTitle className="text-white text-xl">🏆 Top Planet Heroes</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {heroes?.map((hero, index) => (
                    <div key={hero.id} className="flex items-center gap-4 p-4 bg-slate-700/30 rounded-lg">
                      <div className="flex items-center">
                        {getRankIcon(index)}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-3">
                          <h3 className="font-bold text-white text-lg">{hero.name}</h3>
                          <Badge className={getLevelBadgeColor(hero.level)}>
                            {hero.level}
                          </Badge>
                        </div>
                        <p className="text-gray-400 text-sm">{hero.location}</p>
                      </div>
                      <div className="text-right">
                        <div className="text-2xl font-bold text-amber-400">
                          {hero.total_points?.toLocaleString() || "0"}
                        </div>
                        <div className="text-sm text-gray-400">points</div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        
        {/* Quick Action Bar */}
        <div className="mt-8 text-center">
          <div className="inline-flex gap-4 bg-slate-800/50 border border-slate-600 rounded-xl p-6">
            <Link href="/earn">
              <Button className="bg-gradient-to-r from-amber-500 to-orange-500 text-black px-6 py-3">
                <Phone className="w-5 h-5 mr-2" />
                Trade iPhone Now
              </Button>
            </Link>
            <Button 
              onClick={() => setActiveTab("challenges")}
              className="bg-gradient-to-r from-blue-500 to-purple-500 text-white px-6 py-3"
            >
              <Target className="w-5 h-5 mr-2" />
              Join Challenge
            </Button>
            <Link href="/redeem">
              <Button className="bg-gradient-to-r from-hero-green-500 to-emerald-500 text-black px-6 py-3">
                <Gift className="w-5 h-5 mr-2" />
                Redeem Rewards
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
          {/* Free Actions Grid */}
          <div className="grid md:grid-cols-3 gap-4 mb-6">
            <div className="bg-slate-800/50 rounded-lg p-4 border border-hero-green-500/30">
