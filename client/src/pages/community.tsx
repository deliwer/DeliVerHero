import { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { LeaderboardWidget } from '@/components/leaderboard-widget';
import { 
  Users, 
  Trophy, 
  Globe, 
  Star, 
  Zap, 
  Calendar,
  MessageSquare,
  Share2,
  Gift,
  Target,
  Flame,
  Shield,
  Heart,
  CheckCircle,
  TrendingUp,
  MapPin,
  Camera,
  Hash,
  Clock,
  Truck,
  Phone,
  Navigation,
  AlertCircle,
  Headphones
} from 'lucide-react';

interface CommunityEvent {
  id: string;
  title: string;
  description: string;
  date: string;
  participants: number;
  reward: string;
  type: 'challenge' | 'workshop' | 'cleanup' | 'social';
  status: 'upcoming' | 'active' | 'completed';
}

interface SocialPost {
  id: string;
  author: string;
  avatar: string;
  content: string;
  image?: string;
  likes: number;
  comments: number;
  shares: number;
  timeAgo: string;
  badges: string[];
}

interface DeliveryZone {
  name: string;
  areas: string[];
  timeSlots: string[];
  fee: number;
  nextDay: boolean;
}

export default function Community() {
  const [activeTab, setActiveTab] = useState<string>("overview");
  const [selectedEvent, setSelectedEvent] = useState<string>("");
  
  const communityStats = {
    totalMembers: 12847,
    bottlesPrevented: 2400000,
    co2Saved: 180,
    treesEquivalent: 2400,
    monthlyGrowth: 23
  };

  const events: CommunityEvent[] = [
    {
      id: "ramadan2025",
      title: "1 Million Bottles by Ramadan",
      description: "Community-wide challenge to prevent 1 million plastic bottles before Ramadan 2025",
      date: "March 10, 2025",
      participants: 8734,
      reward: "Exclusive Golden Hero Badge + AED 1000 voucher",
      type: "challenge",
      status: "active"
    },
    {
      id: "sustainability-workshop",
      title: "Sustainability in Action Workshop",
      description: "Learn advanced eco-techniques from Dubai Municipality environmental experts",
      date: "March 5, 2025",
      participants: 156,
      reward: "Certificate + 500 Hero Points",
      type: "workshop",
      status: "upcoming"
    },
    {
      id: "beach-cleanup",
      title: "Jumeirah Beach Community Cleanup",
      description: "Monthly beach cleanup with fellow Planet Heroes - build impact together",
      date: "February 28, 2025",
      participants: 89,
      reward: "Cleanup Champion Badge + 300 Points",
      type: "cleanup",
      status: "upcoming"
    },
    {
      id: "hero-meetup",
      title: "Planet Heroes Dubai Meetup",
      description: "Monthly social gathering for all Planet Heroes - networking and celebration",
      date: "March 15, 2025",
      participants: 234,
      reward: "Community Builder Badge",
      type: "social",
      status: "upcoming"
    }
  ];

  const socialPosts: SocialPost[] = [
    {
      id: "post1",
      author: "Sarah M.",
      avatar: "SM",
      content: "Just hit Level 3 Planet Hero! 🌍✨ My AquaCafe system has prevented 1,200 bottles this month. Every sip feels like saving the planet! #PlanetHero #DubaiGreen",
      likes: 47,
      comments: 12,
      shares: 8,
      timeAgo: "2 hours ago",
      badges: ["Level 3 Hero", "Water Warrior"]
    },
    {
      id: "post2", 
      author: "Ahmed K.",
      avatar: "AK",
      content: "Amazing workshop today on sustainable living! Learned so much from the Dubai Municipality team. Who else is joining the beach cleanup this weekend?",
      likes: 23,
      comments: 15,
      shares: 5,
      timeAgo: "4 hours ago",
      badges: ["Community Leader", "Eco Educator"]
    },
    {
      id: "post3",
      author: "Fatima A.",
      avatar: "FA", 
      content: "Monthly impact: 500 bottles prevented, 37.5kg CO₂ saved! 🌱 My old iPhone 12 trade turned into the best environmental decision ever. Thank you @DeliWer team!",
      likes: 91,
      comments: 24,
      shares: 18,
      timeAgo: "6 hours ago",
      badges: ["Founding Hero", "Impact Leader"]
    }
  ];

  const achievements = [
    {
      title: "Water Guardian",
      description: "Prevent 1,000 plastic bottles",
      icon: <Shield className="w-8 h-8 text-blue-500" />,
      progress: 78,
      unlocked: false
    },
    {
      title: "Community Builder", 
      description: "Refer 10 new Planet Heroes",
      icon: <Users className="w-8 h-8 text-hero-green-500" />,
      progress: 60,
      unlocked: false
    },
    {
      title: "Impact Multiplier",
      description: "Reach Level 5 Hero status",
      icon: <Zap className="w-8 h-8 text-amber-500" />,
      progress: 45,
      unlocked: false
    },
    {
      title: "Event Champion",
      description: "Participate in 5 community events",
      icon: <Trophy className="w-8 h-8 text-purple-500" />,
      progress: 100,
      unlocked: true
    }
  ];

  const deliveryZones: Record<string, DeliveryZone> = {
    zone1: {
      name: "Dubai City Center",
      areas: ["Downtown Dubai", "DIFC", "Business Bay", "Marina", "JBR"],
      timeSlots: ["9:00-11:00", "11:00-13:00", "14:00-16:00", "16:00-18:00", "18:00-20:00"],
      fee: 0,
      nextDay: true
    },
    zone2: {
      name: "Dubai Suburbs",
      areas: ["Jumeirah", "Umm Suqeim", "Al Barsha", "Motor City", "Sports City"],
      timeSlots: ["10:00-12:00", "14:00-16:00", "16:00-18:00"],
      fee: 25,
      nextDay: false
    },
    zone3: {
      name: "Extended Dubai",
      areas: ["Dubai Investment Park", "Dubailand", "Dubai South", "International City"],
      timeSlots: ["10:00-14:00", "14:00-18:00"],
      fee: 50,
      nextDay: false
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white">
      {/* Hero Section */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              <span className="bg-gradient-to-r from-hero-green-500 to-dubai-blue-500 bg-clip-text text-transparent">
                Planet Heroes
              </span>
              <br />
              <span className="text-3xl md:text-4xl">Community Hub</span>
            </h1>
            <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto">
              Join Dubai's largest environmental community. Together, we're building a sustainable future one iPhone trade at a time.
            </p>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
              <div className="text-center">
                <div className="text-3xl font-bold text-hero-green-500">{communityStats.totalMembers.toLocaleString()}</div>
                <div className="text-sm text-gray-400">Planet Heroes</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-500">{(communityStats.bottlesPrevented / 1000000).toFixed(1)}M</div>
                <div className="text-sm text-gray-400">Bottles Prevented</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-amber-500">{communityStats.co2Saved}T</div>
                <div className="text-sm text-gray-400">CO₂ Saved</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-purple-500">+{communityStats.monthlyGrowth}%</div>
                <div className="text-sm text-gray-400">Monthly Growth</div>
              </div>
            </div>
          </div>

          {/* Navigation Tabs */}
          <div className="flex flex-wrap justify-center gap-2 mb-12">
            {[
              { id: "overview", label: "Overview", icon: Globe },
              { id: "events", label: "Events", icon: Calendar },
              { id: "social", label: "Social Feed", icon: MessageSquare },
              { id: "leaderboard", label: "Leaderboard", icon: Trophy },
              { id: "achievements", label: "Achievements", icon: Star },
              { id: "delivery", label: "Delivery Areas", icon: Truck }
            ].map(({ id, label, icon: Icon }) => (
              <button
                key={id}
                onClick={() => setActiveTab(id)}
                className={`flex items-center px-6 py-3 rounded-xl font-medium transition-all ${
                  activeTab === id
                    ? 'bg-hero-green-500 text-black'
                    : 'glass text-white hover:bg-slate-700'
                }`}
              >
                <Icon className="w-4 h-4 mr-2" />
                {label}
              </button>
            ))}
          </div>

          {/* Overview Tab */}
          {activeTab === "overview" && (
            <div className="space-y-8">
              {/* Community Challenges */}
              <Card className="glass border-slate-600">
                <CardContent className="p-8 bg-gradient-to-br from-slate-900/80 to-slate-800/90 backdrop-blur-sm">
                  <h2 className="text-2xl font-bold text-white mb-6 flex items-center">
                    <Flame className="w-6 h-6 text-red-500 mr-2" />
                    ACTIVE COMMUNITY CHALLENGE
                  </h2>
                  
                  <div className="grid md:grid-cols-2 gap-8">
                    <div>
                      <h3 className="text-3xl font-bold text-white mb-2">1 Million Bottles by Ramadan</h3>
                      <p className="text-gray-300 mb-6">Join the biggest environmental mission in Dubai's history</p>
                      
                      <div className="space-y-4">
                        <div>
                          <div className="flex justify-between text-sm text-gray-400 mb-2">
                            <span>Progress</span>
                            <span>80% Complete</span>
                          </div>
                          <div className="w-full bg-slate-700 rounded-full h-4">
                            <div className="bg-gradient-to-r from-hero-green-500 to-hero-green-600 h-4 rounded-full" style={{width: '80%'}}></div>
                          </div>
                        </div>
                        
                        <div className="grid grid-cols-2 gap-4">
                          <div className="text-center p-4 bg-slate-700/50 rounded-lg">
                            <div className="text-2xl font-bold text-white">23</div>
                            <div className="text-sm text-gray-400">days left</div>
                          </div>
                          <div className="text-center p-4 bg-slate-700/50 rounded-lg">
                            <div className="text-2xl font-bold text-white">200K</div>
                            <div className="text-sm text-gray-400">bottles to go</div>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div>
                      <h4 className="text-lg font-bold text-white mb-4">Challenge Rewards</h4>
                      <div className="space-y-3">
                        <div className="flex items-center p-3 bg-amber-500/10 border border-amber-500/30 rounded-lg">
                          <Trophy className="w-5 h-5 text-amber-500 mr-3" />
                          <span className="text-amber-500 font-medium">Golden Hero Badge</span>
                        </div>
                        <div className="flex items-center p-3 bg-hero-green-500/10 border border-hero-green-500/30 rounded-lg">
                          <Gift className="w-5 h-5 text-hero-green-500 mr-3" />
                          <span className="text-hero-green-500 font-medium">AED 1000 Voucher</span>
                        </div>
                        <div className="flex items-center p-3 bg-dubai-blue-500/10 border border-dubai-blue-500/30 rounded-lg">
                          <Zap className="w-5 h-5 text-dubai-blue-500 mr-3" />
                          <span className="text-dubai-blue-500 font-medium">Lifetime 2X Points</span>
                        </div>
                      </div>
                      
                      <Button className="w-full mt-6 bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-black py-3 font-bold">
                        <Target className="mr-2 w-5 h-5" />
                        Join Challenge
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Community Impact Map */}
              <Card className="glass border-slate-600">
                <CardContent className="p-8 bg-gradient-to-br from-slate-900/80 to-slate-800/90 backdrop-blur-sm">
                  <h2 className="text-2xl font-bold text-white mb-6 flex items-center">
                    <MapPin className="w-6 h-6 text-dubai-blue-500 mr-2" />
                    Dubai Impact Heatmap
                  </h2>
                  
                  <div className="grid md:grid-cols-3 gap-6">
                    <div className="text-center p-6 bg-slate-700/30 rounded-xl">
                      <div className="text-3xl font-bold text-hero-green-500 mb-2">3,247</div>
                      <div className="text-gray-300 mb-2">Heroes in Downtown</div>
                      <div className="w-full bg-slate-600 rounded-full h-2">
                        <div className="bg-hero-green-500 h-2 rounded-full" style={{width: '85%'}}></div>
                      </div>
                    </div>
                    
                    <div className="text-center p-6 bg-slate-700/30 rounded-xl">
                      <div className="text-3xl font-bold text-dubai-blue-500 mb-2">2,891</div>
                      <div className="text-gray-300 mb-2">Heroes in Marina</div>
                      <div className="w-full bg-slate-600 rounded-full h-2">
                        <div className="bg-dubai-blue-500 h-2 rounded-full" style={{width: '75%'}}></div>
                      </div>
                    </div>
                    
                    <div className="text-center p-6 bg-slate-700/30 rounded-xl">
                      <div className="text-3xl font-bold text-amber-500 mb-2">1,956</div>
                      <div className="text-gray-300 mb-2">Heroes in JBR</div>
                      <div className="w-full bg-slate-600 rounded-full h-2">
                        <div className="bg-amber-500 h-2 rounded-full" style={{width: '60%'}}></div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          {/* Events Tab */}
          {activeTab === "events" && (
            <div className="space-y-6">
              {events.map((event) => (
                <Card key={event.id} className="glass border-slate-600">
                  <CardContent className="p-6 bg-gradient-to-br from-slate-900/80 to-slate-800/90 backdrop-blur-sm">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <div className="flex items-center gap-3 mb-2">
                          <h3 className="text-xl font-bold text-white">{event.title}</h3>
                          <Badge className={`${
                            event.status === 'active' ? 'bg-hero-green-500/20 text-hero-green-500 border-hero-green-500/30' :
                            event.status === 'upcoming' ? 'bg-dubai-blue-500/20 text-dubai-blue-500 border-dubai-blue-500/30' :
                            'bg-gray-500/20 text-gray-500 border-gray-500/30'
                          }`}>
                            {event.status}
                          </Badge>
                        </div>
                        <p className="text-gray-300 mb-3">{event.description}</p>
                        <div className="flex items-center gap-4 text-sm text-gray-400">
                          <div className="flex items-center">
                            <Calendar className="w-4 h-4 mr-1" />
                            {event.date}
                          </div>
                          <div className="flex items-center">
                            <Users className="w-4 h-4 mr-1" />
                            {event.participants} participants
                          </div>
                        </div>
                      </div>
                      
                      <Button className={`${
                        event.status === 'active' ? 'bg-hero-green-500 hover:bg-hero-green-600' :
                        'bg-dubai-blue-500 hover:bg-dubai-blue-600'
                      } text-white`}>
                        {event.status === 'active' ? 'Join Now' : 'Register'}
                      </Button>
                    </div>
                    
                    <div className="p-3 bg-amber-500/10 border border-amber-500/30 rounded-lg">
                      <div className="flex items-center">
                        <Gift className="w-5 h-5 text-amber-500 mr-2" />
                        <span className="text-amber-500 font-medium">Reward: {event.reward}</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}

          {/* Social Feed Tab */}
          {activeTab === "social" && (
            <div className="space-y-6">
              <Card className="glass border-slate-600">
                <CardContent className="p-6 bg-gradient-to-br from-slate-900/80 to-slate-800/90 backdrop-blur-sm">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="w-12 h-12 bg-hero-green-500 rounded-full flex items-center justify-center text-black font-bold">
                      YOU
                    </div>
                    <input
                      type="text"
                      placeholder="Share your Planet Hero journey..."
                      className="flex-1 bg-slate-700 text-white rounded-lg px-4 py-3 border border-slate-600 focus:border-hero-green-500 focus:outline-none"
                    />
                    <Button className="bg-hero-green-500 hover:bg-hero-green-600 text-black">
                      <Share2 className="w-4 h-4 mr-2" />
                      Post
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {socialPosts.map((post) => (
                <Card key={post.id} className="glass border-slate-600">
                  <CardContent className="p-6 bg-gradient-to-br from-slate-900/80 to-slate-800/90 backdrop-blur-sm">
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 bg-hero-green-500 rounded-full flex items-center justify-center text-black font-bold text-sm">
                        {post.avatar}
                      </div>
                      
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <h4 className="font-bold text-white">{post.author}</h4>
                          {post.badges.map((badge, index) => (
                            <Badge key={index} className="bg-amber-500/20 text-amber-500 border-amber-500/30 text-xs">
                              {badge}
                            </Badge>
                          ))}
                          <span className="text-gray-500 text-sm ml-auto">{post.timeAgo}</span>
                        </div>
                        
                        <p className="text-gray-300 mb-4">{post.content}</p>
                        
                        <div className="flex items-center gap-6 text-sm text-gray-400">
                          <button className="flex items-center gap-1 hover:text-red-400 transition-colors">
                            <Heart className="w-4 h-4" />
                            {post.likes}
                          </button>
                          <button className="flex items-center gap-1 hover:text-blue-400 transition-colors">
                            <MessageSquare className="w-4 h-4" />
                            {post.comments}
                          </button>
                          <button className="flex items-center gap-1 hover:text-hero-green-400 transition-colors">
                            <Share2 className="w-4 h-4" />
                            {post.shares}
                          </button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}

          {/* Leaderboard Tab */}
          {activeTab === "leaderboard" && (
            <div>
              <LeaderboardWidget showHeader={true} />
            </div>
          )}

          {/* Achievements Tab */}
          {activeTab === "achievements" && (
            <div className="grid md:grid-cols-2 gap-6">
              {achievements.map((achievement, index) => (
                <Card key={index} className="glass border-slate-600">
                  <CardContent className="p-6 bg-gradient-to-br from-slate-900/80 to-slate-800/90 backdrop-blur-sm">
                    <div className="flex items-start gap-4">
                      <div className={`p-3 rounded-full ${achievement.unlocked ? 'bg-slate-700' : 'bg-slate-800/50'}`}>
                        {achievement.icon}
                      </div>
                      
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-2">
                          <h3 className={`font-bold ${achievement.unlocked ? 'text-white' : 'text-gray-400'}`}>
                            {achievement.title}
                          </h3>
                          {achievement.unlocked && (
                            <CheckCircle className="w-5 h-5 text-hero-green-500" />
                          )}
                        </div>
                        
                        <p className="text-gray-300 text-sm mb-4">{achievement.description}</p>
                        
                        <div className="space-y-2">
                          <div className="flex justify-between text-sm">
                            <span className="text-gray-400">Progress</span>
                            <span className={achievement.unlocked ? 'text-hero-green-500' : 'text-white'}>
                              {achievement.progress}%
                            </span>
                          </div>
                          <div className="w-full bg-slate-700 rounded-full h-2">
                            <div 
                              className={`h-2 rounded-full ${
                                achievement.unlocked ? 'bg-hero-green-500' : 'bg-gray-500'
                              }`}
                              style={{width: `${achievement.progress}%`}}
                            ></div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}

          {/* Delivery Areas Tab */}
          {activeTab === "delivery" && (
            <div className="space-y-8">
              {/* Delivery Coverage */}
              <Card className="glass border-slate-600">
                <CardContent className="p-8 bg-gradient-to-br from-slate-900/80 to-slate-800/90 backdrop-blur-sm">
                  <h2 className="text-2xl font-bold text-white mb-6 text-center flex items-center justify-center">
                    <Truck className="w-6 h-6 text-hero-green-500 mr-2" />
                    Dubai Delivery Coverage Areas
                  </h2>
                  
                  <div className="grid md:grid-cols-3 gap-6 mb-8">
                    {Object.entries(deliveryZones).map(([zoneId, zone]) => (
                      <div 
                        key={zoneId}
                        className="p-6 rounded-xl border-2 border-slate-600 bg-slate-700/30 hover:border-slate-500 transition-all"
                      >
                        <h3 className="text-lg font-bold text-white mb-2">{zone.name}</h3>
                        <div className="space-y-2 mb-4">
                          {zone.areas.map((area, index) => (
                            <div key={index} className="text-sm text-gray-300">{area}</div>
                          ))}
                        </div>
                        <div className="flex justify-between items-center">
                          <span className={`text-sm font-bold ${zone.fee === 0 ? 'text-hero-green-500' : 'text-amber-500'}`}>
                            {zone.fee === 0 ? 'FREE' : `AED ${zone.fee}`}
                          </span>
                          {zone.nextDay && (
                            <Badge className="bg-amber-500/20 text-amber-500 border-amber-500/30">
                              Next Day
                            </Badge>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                  
                  <div className="text-center">
                    <p className="text-gray-300 mb-4">
                      All AquaCafe systems include free installation and setup by certified technicians
                    </p>
                    <Button className="bg-gradient-to-r from-hero-green-500 to-dubai-blue-500 hover:from-hero-green-600 hover:to-dubai-blue-600 text-white px-8 py-3 font-bold">
                      <Navigation className="mr-2 w-5 h-5" />
                      Track Your Delivery
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* Delivery Features */}
              <div className="grid md:grid-cols-3 gap-6">
                <Card className="glass border-slate-600">
                  <CardContent className="p-6 bg-gradient-to-br from-slate-900/70 to-slate-800/80 backdrop-blur-sm text-center">
                    <div className="w-16 h-16 bg-hero-green-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Truck className="w-8 h-8 text-hero-green-500" />
                    </div>
                    <h3 className="text-lg font-bold text-white mb-2">Eco-Friendly Fleet</h3>
                    <p className="text-gray-300 text-sm mb-4">100% electric delivery vehicles reducing carbon footprint</p>
                    <Badge className="bg-hero-green-500/20 text-hero-green-500 border-hero-green-500/30">
                      Zero Emissions
                    </Badge>
                  </CardContent>
                </Card>

                <Card className="glass border-slate-600">
                  <CardContent className="p-6 bg-gradient-to-br from-slate-900/70 to-slate-800/80 backdrop-blur-sm text-center">
                    <div className="w-16 h-16 bg-dubai-blue-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Shield className="w-8 h-8 text-dubai-blue-500" />
                    </div>
                    <h3 className="text-lg font-bold text-white mb-2">Secure Installation</h3>
                    <p className="text-gray-300 text-sm mb-4">Professional setup by certified technicians</p>
                    <Badge className="bg-dubai-blue-500/20 text-dubai-blue-500 border-dubai-blue-500/30">
                      Expert Setup
                    </Badge>
                  </CardContent>
                </Card>

                <Card className="glass border-slate-600">
                  <CardContent className="p-6 bg-gradient-to-br from-slate-900/70 to-slate-800/80 backdrop-blur-sm text-center">
                    <div className="w-16 h-16 bg-amber-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Phone className="w-8 h-8 text-amber-500" />
                    </div>
                    <h3 className="text-lg font-bold text-white mb-2">24/7 Support</h3>
                    <p className="text-gray-300 text-sm mb-4">Round-the-clock delivery and installation support</p>
                    <Badge className="bg-amber-500/20 text-amber-500 border-amber-500/30">
                      Always Available
                    </Badge>
                  </CardContent>
                </Card>
              </div>
            </div>
          )}

          {/* Community CTA */}
          <Card className="glass border-slate-600 mt-12">
            <CardContent className="p-8 bg-gradient-to-br from-slate-900/80 to-slate-800/90 backdrop-blur-sm text-center">
              <h2 className="text-3xl font-bold text-white mb-4">Join the Movement</h2>
              <p className="text-gray-300 mb-8 max-w-2xl mx-auto">
                Ready to become a Planet Hero? Trade your iPhone, get an AquaCafe system, and join Dubai's largest environmental community.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button className="bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-black px-8 py-3 font-bold">
                  <Zap className="mr-2 w-5 h-5" />
                  Start Your Hero Journey
                </Button>
                <Button 
                  variant="outline" 
                  className="border-2 border-hero-green-500 text-hero-green-500 hover:bg-hero-green-500 hover:text-white px-8 py-3 font-bold"
                >
                  <Users className="mr-2 w-5 h-5" />
                  Invite Friends
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
}