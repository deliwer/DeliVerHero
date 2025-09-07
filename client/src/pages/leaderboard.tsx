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
              <CardTitle className="text-white text-lg">CO₂ Reduced</CardTitle>
            </CardHeader>
            <CardContent className="text-center">
              <div className="text-3xl font-bold text-blue-400">{communityStats.co2Saved}</div>
              <div className="text-sm text-gray-400">tons saved</div>
            </CardContent>
          </Card>

          <Card className="bg-slate-800/50 border-slate-700 backdrop-blur-sm">
            <CardHeader className="text-center pb-2">
              <MapPin className="w-8 h-8 text-purple-500 mx-auto mb-2" />
              <CardTitle className="text-white text-lg">Districts Active</CardTitle>
            </CardHeader>
            <CardContent className="text-center">
              <div className="text-3xl font-bold text-purple-400">{communityStats.activeDistricts}</div>
              <div className="text-sm text-gray-400">across Dubai</div>
            </CardContent>
          </Card>
        </div>

        {/* Community Challenges */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
            <Zap className="w-6 h-6 text-yellow-500" />
            Active Community Challenges
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            <Card className="bg-gradient-to-r from-red-900/50 to-orange-900/50 border-red-500/30">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <Target className="w-5 h-5 text-red-400" />
                  {communityStats.weeklyChallenge}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-300 mb-4">Dubai community target: prevent 1 million plastic bottles before Ramadan</p>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-gray-400">Progress:</span>
                  <span className="font-bold text-red-400">847K / 1M bottles</span>
                </div>
                <div className="w-full bg-slate-700 rounded-full h-3">
                  <div className="bg-gradient-to-r from-red-500 to-orange-500 h-3 rounded-full" style={{width: '85%'}}></div>
                </div>
                <div className="flex gap-2 mt-4">
                  <Link href="/play">
                    <Button className="bg-red-600 hover:bg-red-700 text-white">Join Challenge</Button>
                  </Link>
                  <Link href="/exchange">
                    <Button variant="outline" className="border-orange-500 text-orange-300">Trade iPhone</Button>
                  </Link>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-r from-blue-900/50 to-cyan-900/50 border-blue-500/30">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <MapPin className="w-5 h-5 text-blue-400" />
                  Dubai Districts Competition
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-300 mb-4">Neighborhoods compete for highest Planet Points per capita</p>
                <div className="space-y-2 mb-4">
                  <div className="flex justify-between items-center">
                    <span className="text-blue-300">1. Dubai Marina</span>
                    <span className="font-bold text-blue-400">2,847 pts</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-400">2. Downtown</span>
                    <span className="font-bold text-gray-300">2,651 pts</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-400">3. JBR</span>
                    <span className="font-bold text-gray-300">2,489 pts</span>
                  </div>
                </div>
                <Button className="bg-blue-600 hover:bg-blue-700 text-white w-full">
                  <MapPin className="w-4 h-4 mr-2" />
                  Find My District
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Community Communication Hub */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
            <MessageCircle className="w-6 h-6 text-blue-500" />
            Community Communication Hub
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            <Card className="bg-slate-800/50 border-slate-700 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <MessageCircle className="w-5 h-5 text-blue-400" />
                  Heroes Forum
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-300 mb-4">Connect with fellow Planet Heroes, share experiences, and collaborate on sustainability projects</p>
                <div className="space-y-2 mb-4">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-400">💧 Water Solutions</span>
                    <span className="text-blue-400">847 posts</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-400">📱 E-Waste Trading</span>
                    <span className="text-blue-400">523 posts</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-400">🌍 Global Missions</span>
                    <span className="text-blue-400">345 posts</span>
                  </div>
                </div>
                <Button className="bg-blue-600 hover:bg-blue-700 text-white w-full">
                  <MessageCircle className="w-4 h-4 mr-2" />
                  Join Discussion
                </Button>
              </CardContent>
            </Card>

            <Card className="bg-slate-800/50 border-slate-700 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <Share2 className="w-5 h-5 text-green-400" />
                  Social Channels
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-300 mb-4">Connect across multiple platforms and stay updated with the latest sustainability initiatives</p>
                <div className="space-y-3 mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-green-500/20 rounded-full flex items-center justify-center">
                      <MessageCircle className="w-4 h-4 text-green-400" />
                    </div>
                    <div>
                      <div className="text-white font-medium">WhatsApp Group</div>
                      <div className="text-gray-400 text-sm">2,847 members</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-blue-500/20 rounded-full flex items-center justify-center">
                      <Users className="w-4 h-4 text-blue-400" />
                    </div>
                    <div>
                      <div className="text-white font-medium">LinkedIn Community</div>
                      <div className="text-gray-400 text-sm">1,234 professionals</div>
                    </div>
                  </div>
                </div>
                <Button variant="outline" className="border-green-500 text-green-300 w-full">
                  <Share2 className="w-4 h-4 mr-2" />
                  Connect Social
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Community Events & Engagement */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
            <Globe className="w-6 h-6 text-purple-500" />
            Active Community Events
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            <Card className="bg-gradient-to-r from-red-900/50 to-pink-900/50 border-red-500/30">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2 text-lg">
                  <Heart className="w-5 h-5 text-red-400" />
                  Pakistan Relief
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-300 text-sm mb-3">Emergency water purification for flood-affected regions</p>
                <div className="space-y-2 mb-4">
                  <div className="flex justify-between">
                    <span className="text-gray-400 text-sm">Progress:</span>
                    <span className="text-red-400 font-bold">67%</span>
                  </div>
                  <div className="w-full bg-slate-700 rounded-full h-2">
                    <div className="bg-red-500 h-2 rounded-full" style={{width: '67%'}}></div>
                  </div>
                </div>
                <Link href="/play">
                  <Button className="bg-red-600 hover:bg-red-700 text-white w-full text-sm">
                    Join Mission
                  </Button>
                </Link>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-r from-blue-900/50 to-cyan-900/50 border-blue-500/30">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2 text-lg">
                  <Users className="w-5 h-5 text-blue-400" />
                  Weekly Meetup
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-300 text-sm mb-3">Dubai Marina heroes networking session</p>
                <div className="space-y-2 mb-4">
                  <div className="flex justify-between">
                    <span className="text-gray-400 text-sm">This Saturday:</span>
                    <span className="text-blue-400 font-bold">7 PM</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400 text-sm">Participants:</span>
                    <span className="text-blue-400 font-bold">24/30</span>
                  </div>
                </div>
                <Button variant="outline" className="border-blue-500 text-blue-300 w-full text-sm">
                  <MapPin className="w-4 h-4 mr-1" />
                  RSVP Event
                </Button>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-r from-green-900/50 to-emerald-900/50 border-green-500/30">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2 text-lg">
                  <Award className="w-5 h-5 text-green-400" />
                  Monthly Challenge
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-300 text-sm mb-3">Zero plastic bottle month challenge</p>
                <div className="space-y-2 mb-4">
                  <div className="flex justify-between">
                    <span className="text-gray-400 text-sm">Participants:</span>
                    <span className="text-green-400 font-bold">3,247</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400 text-sm">Reward Pool:</span>
                    <span className="text-green-400 font-bold">50K pts</span>
                  </div>
                </div>
                <Button className="bg-green-600 hover:bg-green-700 text-white w-full text-sm">
                  <Target className="w-4 h-4 mr-1" />
                  Join Challenge
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Social Activity Feed */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
            <Share2 className="w-6 h-6 text-green-500" />
            Community Social Feed
          </h2>
          <div className="grid gap-6">
            <Card className="bg-slate-800/50 border-slate-700 backdrop-blur-sm">
              <CardContent className="pt-6">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-hero-green-500 rounded-full flex items-center justify-center font-bold text-white">SM</div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="font-medium text-white">Sarah M.</span>
                      <Badge className="bg-hero-green-500/20 text-hero-green-400">Level 3 Hero</Badge>
                      <Badge className="bg-blue-500/20 text-blue-400">Water Warrior</Badge>
                      <span className="text-gray-400 text-sm">2 hours ago</span>
                    </div>
                    <p className="text-gray-300 mb-3">
                      Just hit Level 3 Planet Hero! 🌍✨ My AquaCafe system has prevented 1,200 bottles this month. Every sip feels like saving the planet! #PlanetHero #DubaiGreen
                    </p>
                    <div className="flex items-center gap-4 text-gray-400">
                      <button className="flex items-center gap-1 hover:text-white">
                        <Heart className="w-4 h-4" />
                        <span>47</span>
                      </button>
                      <button className="flex items-center gap-1 hover:text-white">
                        <MessageCircle className="w-4 h-4" />
                        <span>12</span>
                      </button>
                      <button className="flex items-center gap-1 hover:text-white">
                        <Share2 className="w-4 h-4" />
                        <span>8</span>
                      </button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-slate-800/50 border-slate-700 backdrop-blur-sm">
              <CardContent className="pt-6">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center font-bold text-white">FA</div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="font-medium text-white">Fatima A.</span>
                      <Badge className="bg-amber-500/20 text-amber-400">Founding Hero</Badge>
                      <Badge className="bg-purple-500/20 text-purple-400">Impact Leader</Badge>
                      <span className="text-gray-400 text-sm">6 hours ago</span>
                    </div>
                    <p className="text-gray-300 mb-3">
                      Monthly impact: 500 bottles prevented, 37.5kg CO₂ saved! 🌱 My old iPhone 12 trade turned into the best environmental decision ever. Thank you @DeliWer team!
                    </p>
                    <div className="flex items-center gap-4 text-gray-400">
                      <button className="flex items-center gap-1 hover:text-white">
                        <Heart className="w-4 h-4" />
                        <span>91</span>
                      </button>
                      <button className="flex items-center gap-1 hover:text-white">
                        <MessageCircle className="w-4 h-4" />
                        <span>24</span>
                      </button>
                      <button className="flex items-center gap-1 hover:text-white">
                        <Share2 className="w-4 h-4" />
                        <span>18</span>
                      </button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
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
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/aquacafe">
                <Button className="bg-amber-500 hover:bg-amber-600 text-black px-8 py-3 rounded-xl font-bold text-lg transform hover:scale-105 transition-all" data-testid="button-join-leaderboard">
                  JOIN FREE & START EARNING
                </Button>
              </Link>
              <Link href="/exchange">
                <Button variant="outline" className="border-hero-green-500 text-hero-green-300 hover:bg-hero-green-500/10 px-8 py-3 rounded-xl font-bold text-lg transform hover:scale-105 transition-all">
                  TRADE iPhone NOW
                </Button>
              </Link>
            </div>
            <p className="text-xs text-gray-500 mt-2">
              Join AquaCafe membership • Trade device for points • Climb leaderboard • Win rewards
            </p>
          </div>
        </div>

        {/* Strategic Path to AquaCafe CTA */}
        <div className="mb-12">
          <div className="bg-gradient-to-r from-hero-green-900/60 to-blue-900/60 rounded-3xl p-8 border-2 border-hero-green-500/40 backdrop-blur-sm">
            <div className="text-center">
              <div className="inline-flex items-center gap-2 bg-hero-green-500/20 text-hero-green-400 px-4 py-2 rounded-full mb-6">
                <Target className="w-5 h-5" />
                <span className="font-medium">Strategic Next Step</span>
              </div>
              <h2 className="text-3xl font-bold text-white mb-4">
                Ready to Level Up Your Impact?
              </h2>
              <p className="text-xl text-gray-300 mb-6 max-w-2xl mx-auto">
                Join the heroes above you on the leaderboard. Start with AquaCafe membership (AED 99) and unlock the complete Planet Heroes ecosystem.
              </p>
              
              <div className="grid md:grid-cols-3 gap-6 mb-8">
                <div className="text-center">
                  <div className="w-16 h-16 bg-hero-green-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Target className="w-8 h-8 text-hero-green-400" />
                  </div>
                  <h3 className="font-bold text-white mb-2">Immediate Points</h3>
                  <p className="text-gray-300 text-sm">Get 100 Planet Points instantly with membership signup</p>
                </div>
                <div className="text-center">
                  <div className="w-16 h-16 bg-blue-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Users className="w-8 h-8 text-blue-400" />
                  </div>
                  <h3 className="font-bold text-white mb-2">Community Access</h3>
                  <p className="text-gray-300 text-sm">Join exclusive member forums and local meetups</p>
                </div>
                <div className="text-center">
                  <div className="w-16 h-16 bg-purple-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Award className="w-8 h-8 text-purple-400" />
                  </div>
                  <h3 className="font-bold text-white mb-2">Multiplier Benefits</h3>
                  <p className="text-gray-300 text-sm">2x points on all future iPhone trades and referrals</p>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/aquacafe">
                  <Button className="bg-gradient-to-r from-hero-green-600 to-emerald-600 hover:from-hero-green-700 hover:to-emerald-700 text-white px-12 py-4 rounded-xl font-bold text-xl transform hover:scale-105 transition-all">
                    🚀 START AQUACAFE JOURNEY - AED 99
                  </Button>
                </Link>
                <Link href="/community">
                  <Button variant="outline" className="border-blue-500 text-blue-300 hover:bg-blue-500/10 px-8 py-4 rounded-xl font-bold text-lg transform hover:scale-105 transition-all">
                    🌍 Visit Full Community Hub
                  </Button>
                </Link>
              </div>
              <p className="text-sm text-gray-400 mt-3">
                Includes FREE installation (AED 299 value) • Instant leaderboard boost • Member benefits
              </p>
            </div>
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
                      {hero.badges.map((badge: any, badgeIndex: number) => (
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
          <Link href="/exchange">
            <Button className="btn-hero px-8 py-4 text-lg" data-testid="button-start-trading">
              Trade Your iPhone & Join the Heroes
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
