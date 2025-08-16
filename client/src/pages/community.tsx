import { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
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
  Headphones,
  Droplet,
  Recycle,
  Send,
  Filter,
  Search,
  Settings,
  Plus,
  ExternalLink,
  MessageCircle
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

interface ForumPost {
  id: string;
  author: string;
  avatar: string;
  title: string;
  content: string;
  category: "water" | "ewaste" | "missions" | "global";
  location: string;
  likes: number;
  replies: number;
  timestamp: string;
  tags: string[];
}

interface SocialResource {
  id: string;
  name: string;
  type: "whatsapp" | "linkedin" | "facebook" | "telegram" | "discord";
  url: string;
  description: string;
  members: number;
  isOfficial: boolean;
  adminOnly?: boolean;
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
  const [forumSearchQuery, setForumSearchQuery] = useState("");
  const [newPost, setNewPost] = useState({ title: "", content: "", category: "water" as const });
  const [isAdmin] = useState(false); // This would be set based on user auth
  
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

  const forumPosts: ForumPost[] = [
    {
      id: "1",
      author: "Amira Al-Zahra",
      avatar: "AZ",
      title: "Connecting Dubai's Water Heroes with Global Communities",
      content: "Looking to connect with water sustainability groups worldwide. Our AquaCafe mission has prevented 50,000+ bottles in Dubai. What initiatives are running in your cities?",
      category: "water",
      location: "Dubai, UAE",
      likes: 24,
      replies: 8,
      timestamp: "2 hours ago",
      tags: ["water-heroes", "global-connect", "aquacafe"]
    },
    {
      id: "2", 
      author: "Omar Khalil",
      avatar: "OK",
      title: "E-Waste Trading Network: iPhone → Clean Water Impact",
      content: "Just completed my 15th iPhone trade-in! Each device = 2,400 bottles prevented. Building connections with e-waste programs in Singapore and Kenya. Who's interested in cross-border impact?",
      category: "ewaste",
      location: "Dubai, UAE", 
      likes: 31,
      replies: 12,
      timestamp: "4 hours ago",
      tags: ["iphone-trade", "e-waste", "global-impact"]
    },
    {
      id: "3",
      author: "Sarah Chen",
      avatar: "SC", 
      title: "Multiplayer Mission: Global Water Week Challenge",
      content: "Starting a 7-day global challenge! Teams from different cities compete to prevent the most plastic bottles. Dubai vs Singapore vs São Paulo. Who's in?",
      category: "missions",
      location: "Singapore",
      likes: 45,
      replies: 20,
      timestamp: "6 hours ago",
      tags: ["multiplayer", "global-challenge", "team-missions"]
    },
    {
      id: "4",
      author: "Green Lagos Initiative",
      avatar: "GL",
      title: "Water Purification Lessons from Dubai's AquaCafe",
      content: "We're implementing similar shower filter programs in Lagos. Dubai Heroes - can you share best practices and installation tips for community rollout?",
      category: "water", 
      location: "Lagos, Nigeria",
      likes: 19,
      replies: 6,
      timestamp: "1 day ago",
      tags: ["water-purification", "community-sharing", "best-practices"]
    }
  ];

  const socialResources: SocialResource[] = [
    {
      id: "whatsapp1",
      name: "DeliWer Shopping Metaverse - Dubai Heroes",
      type: "whatsapp",
      url: "https://chat.whatsapp.com/GcnBVI6Ere6GqOg0jb8L5O",
      description: "Official WhatsApp community for Dubai Planet Heroes - daily missions, tips, and celebration",
      members: 2847,
      isOfficial: true
    },
    {
      id: "whatsapp2",
      name: "DeliWer AquaCafe Champions",
      type: "whatsapp",
      url: "https://chat.whatsapp.com/EjlA3pKnhn8AcpxDEuTnvC",
      description: "Dedicated group for AquaCafe users - installation support, water quality discussions, impact sharing",
      members: 1643,
      isOfficial: true
    },
    {
      id: "linkedin1",
      name: "DeliWer Shopping - Professional Network",
      type: "linkedin",
      url: "#",
      description: "Connect with sustainability professionals and corporate partners in Dubai's green economy",
      members: 5234,
      isOfficial: true,
      adminOnly: true
    },
    {
      id: "facebook1",
      name: "DeliWer Shopping Community",
      type: "facebook",
      url: "#",
      description: "Share your environmental journey, connect with families, and discover local green initiatives",
      members: 8921,
      isOfficial: true,
      adminOnly: true
    },
    {
      id: "telegram1",
      name: "Global Water Heroes Network",
      type: "telegram",
      url: "#",
      description: "International network connecting water sustainability projects across continents",
      members: 12456,
      isOfficial: false,
      adminOnly: true
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
              <span className="bg-gradient-to-r from-hero-green-500 to-dubai-blue-500 bg-clip-text text-[#3b82f6]">
                Planet Heroes
              </span>
              <br />
              <span className="text-3xl md:text-4xl">Community Hub</span>
            </h1>
            <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto">
              Join Dubai's largest environmental community. Connect globally, share missions, and multiply your impact through collaboration.
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
              { id: "forum", label: "Heroes Forum", icon: MessageCircle },
              { id: "events", label: "Events", icon: Calendar },
              { id: "social", label: "Social Feed", icon: MessageSquare },
              { id: "connect", label: "Global Connect", icon: ExternalLink },
              { id: "leaderboard", label: "Leaderboard", icon: Trophy },
              { id: "achievements", label: "Achievements", icon: Star },
              { id: "delivery", label: "Delivery Areas", icon: Truck }
            ].map(({ id, label, icon: Icon }) => (
              <button
                key={id}
                onClick={() => setActiveTab(id)}
                className={`flex items-center px-4 py-2 rounded-xl font-medium transition-all text-sm ${
                  activeTab === id
                    ? 'bg-hero-green-500 text-black'
                    : 'glass text-white hover:bg-slate-700'
                }`}
                data-testid={`tab-${id}`}
              >
                <Icon className="w-4 h-4 mr-2" />
                {label}
              </button>
            ))}
          </div>

          {/* Heroes Forum Tab */}
          {activeTab === "forum" && (
            <div className="space-y-6">
              {/* Search and Filter */}
              <Card className="glass border-slate-600">
                <CardContent className="p-6 bg-gradient-to-br from-slate-900/80 to-slate-800/90 backdrop-blur-sm">
                  <div className="flex flex-col md:flex-row gap-4">
                    <div className="relative flex-1">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                      <Input
                        placeholder="Search discussions, missions, and global communities..."
                        value={forumSearchQuery}
                        onChange={(e) => setForumSearchQuery(e.target.value)}
                        className="pl-10 bg-slate-800/50 border-slate-600 text-white placeholder-gray-400"
                        data-testid="input-forum-search"
                      />
                    </div>
                    <Button variant="outline" className="border-emerald-500/30 text-emerald-300 hover:bg-emerald-500/20">
                      <Filter className="w-4 h-4 mr-2" />
                      Filter
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* Categories */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {[
                  { id: "water", label: "Water Heroes", icon: Droplet, color: "text-cyan-400", bgColor: "bg-cyan-500/20" },
                  { id: "ewaste", label: "E-Waste Trading", icon: Recycle, color: "text-green-400", bgColor: "bg-green-500/20" },
                  { id: "missions", label: "Global Missions", icon: Globe, color: "text-purple-400", bgColor: "bg-purple-500/20" },
                  { id: "connect", label: "Community Connect", icon: Users, color: "text-orange-400", bgColor: "bg-orange-500/20" }
                ].map((category) => {
                  const Icon = category.icon;
                  return (
                    <Card key={category.id} className="glass border-slate-600 hover:border-slate-500 transition-colors cursor-pointer">
                      <CardContent className={`p-4 text-center ${category.bgColor}`}>
                        <Icon className={`w-8 h-8 ${category.color} mx-auto mb-2`} />
                        <h3 className="font-medium text-white text-sm">{category.label}</h3>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>

              {/* Post Creation */}
              <Card className="glass border-slate-600">
                <CardContent className="p-6 bg-gradient-to-br from-slate-900/80 to-slate-800/90 backdrop-blur-sm">
                  <h3 className="text-lg font-bold text-white mb-4">Share with Global Heroes</h3>
                  <div className="space-y-4">
                    <Input
                      placeholder="What's your environmental mission or question?"
                      value={newPost.title}
                      onChange={(e) => setNewPost({...newPost, title: e.target.value})}
                      className="bg-slate-700/50 border-slate-600 text-white placeholder-gray-400"
                      data-testid="input-post-title"
                    />
                    <Textarea
                      placeholder="Share your experience, ask for advice, or connect with other heroes..."
                      value={newPost.content}
                      onChange={(e) => setNewPost({...newPost, content: e.target.value})}
                      className="bg-slate-700/50 border-slate-600 text-white placeholder-gray-400 min-h-[100px]"
                      data-testid="textarea-post-content"
                    />
                    <div className="flex items-center justify-between">
                      <div className="flex gap-2">
                        <Badge variant="outline" className="border-cyan-500/30 text-cyan-300 cursor-pointer hover:bg-cyan-500/10">
                          <Droplet className="w-3 h-3 mr-1" />
                          Water
                        </Badge>
                        <Badge variant="outline" className="border-green-500/30 text-green-300 cursor-pointer hover:bg-green-500/10">
                          <Recycle className="w-3 h-3 mr-1" />
                          E-Waste
                        </Badge>
                      </div>
                      <Button className="bg-emerald-600 hover:bg-emerald-700" data-testid="button-post-share">
                        <Send className="w-4 h-4 mr-2" />
                        Share
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Forum Posts */}
              <div className="space-y-4">
                {forumPosts
                  .filter(post => 
                    forumSearchQuery === "" || 
                    post.title.toLowerCase().includes(forumSearchQuery.toLowerCase()) ||
                    post.content.toLowerCase().includes(forumSearchQuery.toLowerCase()) ||
                    post.tags.some(tag => tag.toLowerCase().includes(forumSearchQuery.toLowerCase()))
                  )
                  .map((post) => (
                  <Card key={post.id} className="glass border-slate-600 hover:border-slate-600 transition-colors">
                    <CardContent className="p-6 bg-gradient-to-br from-slate-900/80 to-slate-800/90 backdrop-blur-sm">
                      <div className="flex items-start gap-4">
                        <Avatar className="bg-emerald-500">
                          <AvatarFallback className="text-white font-bold">
                            {post.avatar}
                          </AvatarFallback>
                        </Avatar>
                        
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <h4 className="font-bold text-white">{post.author}</h4>
                            <span className="text-gray-400 text-sm">{post.location}</span>
                            <span className="text-gray-500 text-sm">{post.timestamp}</span>
                            <Badge variant="outline" className={`${
                              post.category === 'water' ? 'bg-cyan-500/20 text-cyan-300 border-cyan-500/30' :
                              post.category === 'ewaste' ? 'bg-green-500/20 text-green-300 border-green-500/30' :
                              post.category === 'missions' ? 'bg-purple-500/20 text-purple-300 border-purple-500/30' :
                              'bg-blue-500/20 text-blue-300 border-blue-500/30'
                            }`}>
                              {post.category}
                            </Badge>
                          </div>
                          
                          <h5 className="text-lg font-semibold text-white mb-3">{post.title}</h5>
                          <p className="text-gray-300 mb-4 leading-relaxed">{post.content}</p>
                          
                          <div className="flex flex-wrap gap-2 mb-4">
                            {post.tags.map((tag) => (
                              <Badge key={tag} variant="secondary" className="bg-slate-700 text-gray-300 text-xs">
                                #{tag}
                              </Badge>
                            ))}
                          </div>
                          
                          <div className="flex items-center gap-6 text-gray-400">
                            <button 
                              className="flex items-center gap-2 hover:text-red-400 transition-colors"
                              data-testid={`button-like-${post.id}`}
                            >
                              <Heart className="w-4 h-4" />
                              <span>{post.likes}</span>
                            </button>
                            <button 
                              className="flex items-center gap-2 hover:text-emerald-400 transition-colors"
                              data-testid={`button-reply-${post.id}`}
                            >
                              <MessageCircle className="w-4 h-4" />
                              <span>{post.replies} replies</span>
                            </button>
                            <button 
                              className="text-gray-400 hover:text-white transition-colors"
                              data-testid={`button-share-${post.id}`}
                            >
                              Share
                            </button>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          )}

          {/* Global Connect Tab */}
          {activeTab === "connect" && (
            <div className="space-y-6">
              <Card className="glass border-slate-600">
                <CardContent className="p-6 bg-gradient-to-br from-emerald-600/20 to-cyan-600/20">
                  <h2 className="text-2xl font-bold text-white mb-4 flex items-center">
                    <ExternalLink className="w-6 h-6 text-emerald-400 mr-2" />
                    Connect with DeliWer Communities Worldwide
                  </h2>
                  <p className="text-emerald-100 mb-6">
                    Join our official social channels and connect with environmental heroes across Dubai and beyond. 
                    Share your journey, get support, and multiply your impact.
                  </p>
                </CardContent>
              </Card>

              <div className="grid md:grid-cols-2 gap-6">
                {socialResources.filter(resource => !resource.adminOnly || isAdmin).map((resource) => {
                  const getIcon = (type: string) => {
                    switch(type) {
                      case 'whatsapp': return '💬';
                      case 'linkedin': return '💼';
                      case 'facebook': return '👥';
                      case 'telegram': return '✈️';
                      case 'discord': return '🎮';
                      default: return '🌐';
                    }
                  };

                  const getColor = (type: string) => {
                    switch(type) {
                      case 'whatsapp': return 'border-green-500/30 bg-green-500/10';
                      case 'linkedin': return 'border-blue-500/30 bg-blue-500/10';
                      case 'facebook': return 'border-indigo-500/30 bg-indigo-500/10';
                      case 'telegram': return 'border-cyan-500/30 bg-cyan-500/10';
                      case 'discord': return 'border-purple-500/30 bg-purple-500/10';
                      default: return 'border-gray-500/30 bg-gray-500/10';
                    }
                  };

                  return (
                    <Card key={resource.id} className={`glass border-slate-600 hover:border-slate-500 transition-colors ${getColor(resource.type)}`}>
                      <CardContent className="p-6">
                        <div className="flex items-start justify-between mb-4">
                          <div className="flex items-center gap-3">
                            <span className="text-2xl">{getIcon(resource.type)}</span>
                            <div>
                              <h3 className="font-bold text-white flex items-center gap-2">
                                {resource.name}
                                {resource.isOfficial && (
                                  <Badge className="bg-emerald-500/20 text-emerald-300 border-emerald-500/30 text-xs">
                                    Official
                                  </Badge>
                                )}
                              </h3>
                              <p className="text-sm text-gray-400 capitalize">{resource.type}</p>
                            </div>
                          </div>
                          {isAdmin && (
                            <Button size="sm" variant="outline" className="border-slate-600">
                              <Settings className="w-4 h-4" />
                            </Button>
                          )}
                        </div>
                        
                        <p className="text-gray-300 mb-4 text-sm">{resource.description}</p>
                        
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2 text-sm text-gray-400">
                            <Users className="w-4 h-4" />
                            <span>{resource.members.toLocaleString()} members</span>
                          </div>
                          <Button 
                            size="sm" 
                            className="bg-emerald-600 hover:bg-emerald-700"
                            onClick={() => window.open(resource.url, '_blank')}
                            data-testid={`button-join-${resource.id}`}
                          >
                            <ExternalLink className="w-4 h-4 mr-2" />
                            Join
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>

              {isAdmin && (
                <Card className="glass border-slate-600">
                  <CardContent className="p-6 bg-gradient-to-br from-slate-900/80 to-slate-800/90 backdrop-blur-sm">
                    <h3 className="text-lg font-bold text-white mb-4 flex items-center">
                      <Settings className="w-5 h-5 text-amber-400 mr-2" />
                      Admin: Manage Resources
                    </h3>
                    <p className="text-gray-300 mb-4 text-sm">
                      Add new social channels, communities, and resources for the DeliWer global network.
                    </p>
                    <Button className="bg-amber-600 hover:bg-amber-700" data-testid="button-add-resource">
                      <Plus className="w-4 h-4 mr-2" />
                      Add New Resource
                    </Button>
                  </CardContent>
                </Card>
              )}
            </div>
          )}

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
            <div className="grid md:grid-cols-3 gap-6">
              {Object.values(deliveryZones).map((zone, index) => (
                <Card key={index} className="glass border-slate-600">
                  <CardContent className="p-6 bg-gradient-to-br from-slate-900/80 to-slate-800/90 backdrop-blur-sm">
                    <div className="flex items-center gap-3 mb-4">
                      <Truck className="w-6 h-6 text-dubai-blue-500" />
                      <h3 className="text-lg font-bold text-white">{zone.name}</h3>
                    </div>
                    
                    <div className="space-y-4">
                      <div>
                        <h4 className="text-sm font-medium text-gray-400 mb-2">Areas Covered</h4>
                        <div className="flex flex-wrap gap-1">
                          {zone.areas.map((area, areaIndex) => (
                            <Badge key={areaIndex} variant="secondary" className="bg-slate-700 text-gray-300 text-xs">
                              {area}
                            </Badge>
                          ))}
                        </div>
                      </div>
                      
                      <div>
                        <h4 className="text-sm font-medium text-gray-400 mb-2">Time Slots</h4>
                        <div className="grid grid-cols-2 gap-1">
                          {zone.timeSlots.map((slot, slotIndex) => (
                            <div key={slotIndex} className="text-xs text-gray-300 bg-slate-700/50 rounded px-2 py-1 text-center">
                              {slot}
                            </div>
                          ))}
                        </div>
                      </div>
                      
                      <div className="flex justify-between items-center pt-2 border-t border-slate-700">
                        <div>
                          <div className="text-lg font-bold text-white">
                            {zone.fee === 0 ? 'FREE' : `AED ${zone.fee}`}
                          </div>
                          <div className="text-xs text-gray-400">Delivery Fee</div>
                        </div>
                        <div className="text-right">
                          <div className={`text-sm font-medium ${zone.nextDay ? 'text-hero-green-500' : 'text-amber-500'}`}>
                            {zone.nextDay ? 'Next Day' : '2-3 Days'}
                          </div>
                          <div className="text-xs text-gray-400">Delivery</div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}