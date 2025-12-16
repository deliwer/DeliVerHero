import { Trophy, Crown, Medal, Star, Users, Target, Zap, Globe, Heart, Award, TrendingUp, MessageCircle, Share2, MapPin, Gift, Calendar, CheckCircle, Flame, Send, Camera, Hash, Filter, Search, Plus, Droplet, Recycle, ExternalLink, Clock, Play, Phone, Shield, Truck, Navigation, AlertCircle, Headphones, Utensils, Coffee, Smartphone, Building2, Sparkles, ArrowRight, Leaf, ShoppingCart, ChefHat, Footprints } from "lucide-react";
import { useLeaderboard } from "@/hooks/use-leaderboard";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Link, useLocation } from "wouter";
import { useState } from "react";
import { SocialChallengesFeed } from "@/components/social-challenges-feed";
import { useToast } from "@/hooks/use-toast";
import { shopifyCartService } from "@/lib/shopify-cart";

import showerFilterCollage from "@assets/collage_1755270492135.jpg";
import membershipCard from "@assets/Aquacafe_byDeliWer_Card_Corners_1755482696304.png";
import pizzaImage from "@assets/stock_images/delicious_pizza_clos_ace0f742.jpg";
import bobaTeaImage from "@assets/stock_images/kulfi_indian_ice_cre_64eeba10.jpg";
import happyDiningImage from "@assets/stock_images/happy_people_eating__21b9cf0b.jpg";
import { SEOMeta } from "@/components/seo-meta";

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

interface Achievement {
  title: string;
  description: string;
  icon: JSX.Element;
  progress: number;
  unlocked: boolean;
}

interface DeliveryZone {
  name: string;
  areas: string[];
  timeSlots: string[];
  fee: number;
  nextDay: boolean;
}

interface FutureEvent {
  id: string;
  title: string;
  description: string;
  date: string;
  location: string;
  participants?: number;
  category: "ai" | "sustainability" | "innovation" | "community";
  impact: string;
}

export default function Leaderboard() {
  const { data: heroes, isLoading, error } = useLeaderboard(50);
  const [activeTab, setActiveTab] = useState<string>("wellness-hub");
  const [newPost, setNewPost] = useState({ title: "", content: "", category: "water" as const });
  const [forumSearchQuery, setForumSearchQuery] = useState("");
  const { toast } = useToast();
  const [, setLocation] = useLocation();
  const [isOrderLoading, setIsOrderLoading] = useState(false);

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
        variant: "destructive"
      });
    } finally {
      setIsOrderLoading(false);
    }
  };
  
  // Dubai Future Foundation Events - Inspired by real activities
  const futureEvents: FutureEvent[] = [
    {
      id: "dubai-ai-week-2025",
      title: "Dubai AI Week 2025",
      description: "Global summit bringing together AI innovators, policymakers, and entrepreneurs. Join sessions on AI for sustainability, smart cities, and environmental impact.",
      date: "April 15-18, 2025",
      location: "Museum of the Future, Dubai",
      participants: 12500,
      category: "ai",
      impact: "Smart Shopping & Electronics Recycling Workshops"
    },
    {
      id: "future-festival",
      title: "Future Festival - Innovation Expo",
      description: "Annual celebration of innovation showcasing breakthrough technologies in sustainability, urban development, and circular economy.",
      date: "May 20-25, 2025",
      location: "Future District, Dubai",
      participants: 25000,
      category: "innovation",
      impact: "Impact Commerce Demonstrations & E-Waste Collection Drive"
    },
    {
      id: "smart-city-summit",
      title: "Smart City & Metropolitan Leadership Summit",
      description: "Conference uniting global city leaders to discuss environmental leadership, sustainable urban planning, and green technology integration.",
      date: "June 10-12, 2025",
      location: "Dubai Future Foundation HQ",
      participants: 8900,
      category: "sustainability",
      impact: "Launch of City-Wide Electronics Recycling Program"
    },
    {
      id: "circular-economy-forum",
      title: "Circular Economy & Impact Commerce Forum",
      description: "Interactive sessions on transforming consumer behavior through smart shopping, trade-in programs, and sustainable commerce.",
      date: "July 5-7, 2025",
      location: "Future District Hub",
      participants: 5600,
      category: "community",
      impact: "iPhone Trade-In for Water Filtration Initiative Launch"
    },
    {
      id: "youth-sustainability",
      title: "Youth Sustainability Challenge",
      description: "Engaging Dubai's young residents and tourists in environmental initiatives through gamified impact commerce and recycling competitions.",
      date: "August 12-14, 2025",
      location: "Museum of the Future",
      participants: 15000,
      category: "community",
      impact: "Student E-Waste Collection Competition"
    }
  ];

  // Future District Activities - Community Engagement
  const futureActivities = [
    {
      id: "museum-tours",
      title: "Museum of the Future - Sustainability Tours",
      description: "Interactive tours showcasing water conservation tech, electronics recycling innovations, and circular economy solutions",
      time: "Daily 10:00 AM - 8:00 PM",
      participants: "12,500+ monthly visitors",
      icon: Building2
    },
    {
      id: "district-workshops",
      title: "Future District Innovation Workshops",
      description: "Hands-on sessions on smart shopping, impact commerce, and sustainable living. Learn how everyday choices drive environmental change.",
      time: "Weekends 2:00 PM - 5:00 PM",
      participants: "850+ participants monthly",
      icon: Users
    },
    {
      id: "recycling-hub",
      title: "Electronics Recycling Hub",
      description: "Trade your old devices for rewards. iPhone trade-ins, laptop recycling, and e-waste collection with instant DXB credits.",
      time: "Mon-Sat 9:00 AM - 6:00 PM",
      participants: "3,200+ devices recycled monthly",
      icon: Recycle
    },
    {
      id: "impact-market",
      title: "Impact Commerce Marketplace",
      description: "Shop sustainable products, water filtration systems, and eco-friendly goods. Every purchase earns Dubai Carbon Tokens.",
      time: "Daily 10:00 AM - 9:00 PM",
      participants: "5,600+ shoppers monthly",
      icon: ShoppingCart
    }
  ];
  
  // Enhanced community stats for Dubai Future District
  const communityStats = {
    totalMembers: 12847,
    bottlesPrevented: 2400000,
    devicesRecycled: 15600,
    eventsHosted: 47,
    co2Saved: 180,
    treesEquivalent: 2400,
    monthlyGrowth: 23,
    activeDistricts: 24,
    weeklyChallenge: "1 Million Bottles by Ramadan",
    liveActivities: 47,
    dailyCheckins: 3892,
    streakLeaders: 156,
    tourismEngagement: 8500
  };

  // Recent community activities
  const recentActivities = [
    {
      id: "1",
      user: "Sarah K.",
      avatar: "SK",
      action: "attended Dubai AI Week workshop on Smart Shopping",
      timeAgo: "2 min ago",
      type: "event",
      location: "Museum of the Future"
    },
    {
      id: "2", 
      user: "Ahmed R.",
      avatar: "AR",
      action: "traded iPhone 13 at Future District Recycling Hub",
      timeAgo: "5 min ago",
      type: "recycle",
      location: "Future District"
    },
    {
      id: "3",
      user: "Lisa M.",
      avatar: "LM", 
      action: "joined Impact Commerce workshop series",
      timeAgo: "8 min ago",
      type: "learn",
      location: "Future District Hub"
    },
    {
      id: "4",
      user: "Hassan A.",
      avatar: "HA",
      action: "earned 500 DXBs from sustainability tour",
      timeAgo: "12 min ago", 
      type: "earn",
      location: "Museum of the Future"
    }
  ];

  // Forum posts for community engagement
  const forumPosts: ForumPost[] = [
    {
      id: "1",
      author: "Amira Al-Zahra",
      avatar: "AZ",
      title: "Dubai Future District: Global Environmental Leadership Hub",
      content: "Visited the Museum of the Future sustainability exhibit. Dubai is positioning itself as a metropolitan leader in environmental innovation. The electronics recycling program is world-class!",
      category: "global",
      location: "Dubai, UAE",
      likes: 24,
      replies: 8,
      timestamp: "2 hours ago",
      tags: ["future-district", "leadership", "recycling"]
    },
    {
      id: "2", 
      author: "Omar Khalil",
      avatar: "OK",
      title: "Impact Commerce: Smart Shopping Workshop Insights",
      content: "Just attended the Future Festival workshop on impact commerce. Learned how every purchase can drive environmental change. Trading my iPhone for water filtration was the best decision!",
      category: "ewaste",
      location: "Dubai, UAE", 
      likes: 31,
      replies: 12,
      timestamp: "4 hours ago",
      tags: ["impact-commerce", "smart-shopping", "workshops"]
    },
    {
      id: "3",
      author: "Tourist from Singapore",
      avatar: "TS", 
      title: "Must-Visit: Museum of the Future Sustainability Tour",
      content: "As a tourist, I'm blown away by Dubai's commitment to environmental leadership. The interactive exhibits on electronics recycling and water conservation are incredible. Joined AquaCafe while here!",
      category: "water",
      location: "Singapore → Dubai",
      likes: 45,
      replies: 20,
      timestamp: "6 hours ago",
      tags: ["tourism", "museum-tour", "sustainability"]
    },
    {
      id: "4",
      author: "Green Dubai Initiative",
      avatar: "GD",
      title: "Dubai AI Week: Technology for Environmental Impact",
      content: "Excited for Dubai AI Week sessions on AI-powered recycling systems and smart city solutions. This is how we build a sustainable future!",
      category: "global", 
      location: "Dubai, UAE",
      likes: 19,
      replies: 6,
      timestamp: "1 day ago",
      tags: ["dubai-ai-week", "technology", "innovation"]
    }
  ];

  // Social resources
  const socialResources: SocialResource[] = [
    {
      id: "whatsapp1",
      name: "Future District Community Hub",
      type: "whatsapp",
      url: "https://chat.whatsapp.com/GcnBVI6Ere6GqOg0jb8L5O",
      description: "Connect with Future District participants, event updates, and impact commerce discussions",
      members: 5847,
      isOfficial: true
    },
    {
      id: "whatsapp2",
      name: "Electronics Recycling Network",
      type: "whatsapp",
      url: "https://chat.whatsapp.com/EjlA3pKnhn8AcpxDEuTnvC",
      description: "Trade-in tips, recycling schedules, and sustainability impact tracking",
      members: 3643,
      isOfficial: true
    },
    {
      id: "linkedin1",
      name: "Dubai Metropolitan Leadership Network",
      type: "linkedin",
      url: "#",
      description: "Professional network for environmental and urban development leaders",
      members: 8234,
      isOfficial: true,
      adminOnly: true
    },
    {
      id: "telegram1",
      name: "Impact Commerce Global Network",
      type: "telegram",
      url: "#",
      description: "International network connecting smart shopping and circular economy initiatives",
      members: 12456,
      isOfficial: false,
      adminOnly: true
    }
  ];

  // Community achievements
  const achievements: Achievement[] = [
    {
      title: "Future District Pioneer",
      description: "Attend 3 Future District events",
      icon: <Building2 className="w-8 h-8 text-blue-500" />,
      progress: 66,
      unlocked: false
    },
    {
      title: "Impact Commerce Champion", 
      description: "Complete smart shopping workshop series",
      icon: <Award className="w-8 h-8 text-emerald-500" />,
      progress: 100,
      unlocked: true
    },
    {
      title: "Recycling Hero",
      description: "Trade-in 5 electronics devices",
      icon: <Recycle className="w-8 h-8 text-green-500" />,
      progress: 60,
      unlocked: false
    },
    {
      title: "Community Builder",
      description: "Refer 10 residents or tourists to join",
      icon: <Users className="w-8 h-8 text-purple-500" />,
      progress: 80,
      unlocked: false
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
      <div className="py-16 px-4 bg-gradient-to-br from-slate-900 to-blue-900">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-white mb-4">
              <Building2 className="inline w-8 h-8 text-blue-500 mr-3" />
              DUBAI FUTURE DISTRICT COMMUNITY HUB
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

  const hasLeaderboardError = error || !heroes;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900">
      <SEOMeta
        title="Dubai Future District Wellness Hub | Museum of the Future Tours & Healthy Living"
        description="Discover Dubai's wellness & innovation hub for international travelers and residents. Museum of the Future tours, Downtown wellness journeys, healthy dining at Baker's Kitchen, La Perle show experiences, and sustainable living rewards. Join AED 99 membership for exclusive discounts."
        keywords="Museum of the Future Dubai, Dubai wellness journey, Downtown Dubai experiences, healthy dining Dubai, sustainable living UAE, Dubai tourism, wellness travel Dubai, Museum of the Future tickets, La Perle Dubai, Baker's Kitchen Dubai, Dubai Future District, wellness hub Dubai, sustainable tourism, eco-friendly Dubai, Museum tour Dubai, international travelers Dubai"
      />
      <div className="container mx-auto px-4 py-8">
        {/* Hero Header - Dubai Future District */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-blue-500/20 text-blue-400 px-6 py-3 rounded-full mb-6 border border-blue-500/30">
            <Building2 className="w-6 h-6" />
            <span className="font-bold text-lg">DUBAI FUTURE DISTRICT</span>
          </div>
          <h1 className="text-4xl md:text-6xl font-black text-white mb-6" data-testid="page-title">
            Community Engagement Hub
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-emerald-400 to-cyan-400 mt-2">
              Impact Commerce • Electronics Recycling • Metropolitan Leadership
            </span>
          </h1>
          <p className="text-xl text-gray-300 max-w-4xl mx-auto mb-8 leading-relaxed">
            Join Dubai's movement as a global leader in environmental innovation. Engage with Future District activities, Museum of the Future experiences, Dubai AI Week, and Future Festival. Turn everyday actions into environmental impact through smart shopping and electronics recycling.
          </p>
          
          {/* Upcoming Event Highlight */}
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-purple-600/20 to-pink-600/20 border border-purple-500/30 text-purple-300 px-6 py-3 rounded-full mb-6">
            <Calendar className="w-5 h-5" />
            <span className="font-bold">Dubai AI Week April 15-18 • Future Festival May 20-25</span>
          </div>
        </div>

        {/* Impact Stats Banner */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
          <div className="bg-gradient-to-r from-blue-500/20 to-cyan-500/20 border border-blue-500/30 rounded-xl p-4 text-center">
            <Building2 className="w-8 h-8 text-blue-400 mx-auto mb-2" />
            <div className="text-2xl font-bold text-blue-400">{communityStats.eventsHosted}</div>
            <div className="text-sm text-blue-300">Events Hosted</div>
            <div className="text-xs text-gray-400">Future District</div>
          </div>
          <div className="bg-gradient-to-r from-emerald-500/20 to-green-500/20 border border-emerald-500/30 rounded-xl p-4 text-center">
            <Recycle className="w-8 h-8 text-emerald-400 mx-auto mb-2" />
            <div className="text-2xl font-bold text-emerald-400">{(communityStats.devicesRecycled / 1000).toFixed(1)}K</div>
            <div className="text-sm text-emerald-300">Devices Recycled</div>
            <div className="text-xs text-gray-400">E-Waste Impact</div>
          </div>
          <div className="bg-gradient-to-r from-purple-500/20 to-pink-500/20 border border-purple-500/30 rounded-xl p-4 text-center">
            <Users className="w-8 h-8 text-purple-400 mx-auto mb-2" />
            <div className="text-2xl font-bold text-purple-400">{communityStats.tourismEngagement.toLocaleString()}</div>
            <div className="text-sm text-purple-300">Tourist Engagement</div>
            <div className="text-xs text-gray-400">Monthly visitors</div>
          </div>
          <div className="bg-gradient-to-r from-amber-500/20 to-orange-500/20 border border-amber-500/30 rounded-xl p-4 text-center">
            <Trophy className="w-8 h-8 text-amber-400 mx-auto mb-2" />
            <div className="text-2xl font-bold text-amber-400">{communityStats.totalMembers.toLocaleString()}</div>
            <div className="text-sm text-amber-300">Active Members</div>
            <div className="text-xs text-gray-400">+{communityStats.monthlyGrowth}% growth</div>
          </div>
        </div>

        {/* ⭐ PRIMARY FOCUS: Order Starter Kit - PROMINENT PLACEMENT */}
        <section className="w-full mb-12 px-4 bg-gradient-to-br from-emerald-900/40 to-blue-900/40 border-4 border-emerald-500/50 rounded-3xl backdrop-blur-sm" data-testid="order-starter-kit-primary">
          <div className="max-w-7xl mx-auto py-16">
            <div className="text-center mb-12 relative overflow-hidden rounded-3xl bg-gradient-to-br from-emerald-900/60 to-blue-900/60 border-2 border-emerald-500/50 p-12">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(34,197,94,0.15)_0%,transparent_70%)]"></div>
              <div className="relative z-10">
                <div className="inline-flex items-center gap-2 bg-emerald-500/20 text-emerald-400 px-6 py-3 rounded-full mb-6 border border-emerald-500/50">
                  <Gift className="w-6 h-6" />
                  <span className="font-bold text-lg">JOIN THE MOVEMENT</span>
                </div>
                <h2 className="text-5xl md:text-7xl font-black text-white mb-6">
                  Your Gateway to Impact Commerce
                  <span className="block text-emerald-400 mt-2">AED 99 Starter Kit</span>
                </h2>
                <p className="text-2xl text-gray-300 max-w-4xl mx-auto mb-8 leading-relaxed">
                  Join thousands of Dubai residents and tourists transforming everyday shopping into environmental impact. Access Future District events, electronics recycling rewards, and the Museum of the Future community.
                </p>
                
                {/* Lifetime Value Badge */}
                <div className="flex flex-col md:flex-row items-center justify-center gap-4 mb-8">
                  <Badge className="bg-amber-500/30 text-amber-300 px-6 py-3 text-xl font-bold border-2 border-amber-500/50">
                    <Crown className="w-6 h-6 mr-2" />
                    Lifetime Membership Benefits
                  </Badge>
                  <span className="text-3xl font-black text-white">→</span>
                  <span className="text-4xl font-black text-emerald-400">AED 1000+ Value</span>
                </div>

                <Button 
                  size="lg"
                  onClick={handleOrderStarterKit}
                  disabled={isOrderLoading}
                  className="bg-gradient-to-r from-emerald-600 to-green-600 hover:from-emerald-500 hover:to-green-500 text-white font-black px-12 py-8 text-2xl shadow-2xl rounded-full border-4 border-white/20 disabled:opacity-50"
                  data-testid="button-order-starter-kit-hero"
                >
                  <Zap className="w-8 h-8 mr-3" />
                  {isOrderLoading ? "ADDING TO CART..." : "START YOUR JOURNEY - AED 99"}
                </Button>
                <p className="text-gray-400 mt-4 text-sm">
                  Join the Future District community of environmental champions
                </p>
              </div>
            </div>

            {/* What's Included */}
            <div className="grid md:grid-cols-2 gap-8 mb-12">
              <div className="bg-slate-800/50 rounded-2xl p-6 border-2 border-cyan-500/50">
                <div className="flex items-start gap-4 mb-4">
                  <div className="w-16 h-16 bg-cyan-500/20 rounded-full flex items-center justify-center flex-shrink-0">
                    <Droplet className="w-8 h-8 text-cyan-400" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-2xl font-bold text-white mb-2">FREE Ionic Shower Filter</h3>
                    <Badge className="bg-amber-500/30 text-amber-300 mb-3">AED 399 value</Badge>
                    <p className="text-gray-300">Premium water filtration system for sustainable living</p>
                  </div>
                </div>
                <img src={showerFilterCollage} alt="Free Shower Filter" className="w-full rounded-lg shadow-lg" data-testid="image-shower-filter" />
              </div>

              <div className="bg-slate-800/50 rounded-2xl p-6 border-2 border-blue-500/50">
                <div className="flex items-start gap-4 mb-4">
                  <div className="w-16 h-16 bg-blue-500/20 rounded-full flex items-center justify-center flex-shrink-0">
                    <Crown className="w-8 h-8 text-blue-400" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-2xl font-bold text-white mb-2">Membership Card & Event Access</h3>
                    <Badge className="bg-amber-500/30 text-amber-300 mb-3">AED 299 value</Badge>
                    <p className="text-gray-300">Access to all Future District events and exclusive community benefits</p>
                  </div>
                </div>
                <img src={membershipCard} alt="Membership Card" className="w-full rounded-lg shadow-lg" data-testid="image-membership-card" />
              </div>
            </div>

            {/* 3-Step Journey */}
            <div className="mb-12">
              <h3 className="text-4xl font-black text-white text-center mb-12">
                Simple 3-Step Impact Journey
              </h3>
              
              <div className="grid md:grid-cols-3 gap-8">
                <div className="relative">
                  <div className="bg-gradient-to-br from-blue-900/40 to-cyan-900/40 border-2 border-blue-500/50 rounded-2xl p-8 text-center">
                    <div className="w-20 h-20 bg-blue-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
                      <span className="text-4xl font-black text-blue-400">1</span>
                    </div>
                    <h4 className="text-3xl font-bold text-white mb-4">Join</h4>
                    <p className="text-gray-300 text-lg mb-6">
                      Get AED 99 Starter Kit with FREE Filter, Card & Future District Access
                    </p>
                    <div className="space-y-3">
                      <div className="flex items-center gap-2 text-cyan-400">
                        <CheckCircle className="w-5 h-5" />
                        <span>Instant activation</span>
                      </div>
                      <div className="flex items-center gap-2 text-cyan-400">
                        <CheckCircle className="w-5 h-5" />
                        <span>1000 welcome DXBs</span>
                      </div>
                    </div>
                  </div>
                  <div className="hidden md:block absolute top-1/2 -right-4 transform -translate-y-1/2 z-10">
                    <ArrowRight className="w-8 h-8 text-emerald-400" />
                  </div>
                </div>

                <div className="relative">
                  <div className="bg-gradient-to-br from-emerald-900/40 to-green-900/40 border-2 border-emerald-500/50 rounded-2xl p-8 text-center">
                    <div className="w-20 h-20 bg-emerald-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
                      <span className="text-4xl font-black text-emerald-400">2</span>
                    </div>
                    <h4 className="text-3xl font-bold text-white mb-4">Engage</h4>
                    <p className="text-gray-300 text-lg mb-6">
                      Attend events, recycle electronics, shop smart at Future District
                    </p>
                    <div className="space-y-3">
                      <div className="flex items-center gap-2 text-emerald-400">
                        <Recycle className="w-5 h-5" />
                        <span>Device trade-ins</span>
                      </div>
                      <div className="flex items-center gap-2 text-emerald-400">
                        <Building2 className="w-5 h-5" />
                        <span>Event participation</span>
                      </div>
                    </div>
                  </div>
                  <div className="hidden md:block absolute top-1/2 -right-4 transform -translate-y-1/2 z-10">
                    <ArrowRight className="w-8 h-8 text-amber-400" />
                  </div>
                </div>

                <div className="bg-gradient-to-br from-amber-900/40 to-orange-900/40 border-2 border-amber-500/50 rounded-2xl p-8 text-center">
                  <div className="w-20 h-20 bg-amber-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
                    <span className="text-4xl font-black text-amber-400">3</span>
                  </div>
                  <h4 className="text-3xl font-bold text-white mb-4">Impact</h4>
                  <p className="text-gray-300 text-lg mb-6">
                    Use DXBs for rewards while driving Dubai's environmental leadership
                  </p>
                  <div className="space-y-3">
                    <div className="flex items-center gap-2 text-amber-400">
                      <Utensils className="w-5 h-5" />
                      <span>Dining rewards</span>
                    </div>
                    <div className="flex items-center gap-2 text-amber-400">
                      <Globe className="w-5 h-5" />
                      <span>Global impact</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Navigation Tabs */}
        <div className="flex flex-wrap justify-center gap-2 mb-8">
          {[
            { id: "wellness-hub", label: "🌿 Wellness & Discovery", icon: Heart },
            { id: "community-hub", label: "🏢 Community Hub", icon: Building2 },
            { id: "chill-grill", label: "🍕 Chill & Grill", icon: Utensils },
            { id: "future-events", label: "📅 Future Events", icon: Calendar },
            { id: "activities", label: "🎯 District Activities", icon: Target },
            { id: "leaderboard", label: "🏆 Rankings", icon: Trophy },
            { id: "live", label: "🔴 Live Feed", icon: Zap },
            { id: "forum", label: "💭 Forum", icon: MessageCircle },
            { id: "achievements", label: "🎖️ Achievements", icon: Award }
          ].map(({ id, label, icon: Icon }) => (
            <button
              key={id}
              onClick={() => setActiveTab(id)}
              className={`flex items-center px-4 py-2 rounded-xl font-medium transition-all text-sm ${
                activeTab === id
                  ? 'bg-gradient-to-r from-blue-500 to-cyan-500 text-white shadow-lg'
                  : 'bg-slate-800/50 text-gray-300 hover:bg-slate-700/50 border border-slate-600'
              }`}
              data-testid={`tab-${id}`}
            >
              <Icon className="w-4 h-4 mr-2" />
              <span className="hidden sm:inline">{label.split(' ').slice(1).join(' ')}</span>
              <span className="sm:hidden">{label.split(' ')[0]}</span>
            </button>
          ))}
        </div>

        {/* Wellness & Discovery Hub Tab - International Engagement Lead Magnet */}
        {activeTab === "wellness-hub" && (
          <div className="space-y-8">
            {/* Hero Section for International Travelers */}
            <section className="relative w-full py-16 px-4 bg-gradient-to-br from-emerald-900/40 via-teal-900/40 to-cyan-900/40 rounded-3xl border-2 border-emerald-500/30 overflow-hidden">
              <div className="absolute inset-0">
                <div className="absolute top-10 left-10 w-32 h-32 bg-emerald-400/10 rounded-full animate-pulse"></div>
                <div className="absolute bottom-10 right-10 w-40 h-40 bg-cyan-400/10 rounded-full animate-pulse"></div>
              </div>
              <div className="relative max-w-6xl mx-auto text-center">
                <Badge className="bg-emerald-500/20 text-emerald-300 px-6 py-3 text-lg font-bold border border-emerald-400/30 mb-6">
                  <Globe className="w-5 h-5 mr-2" />
                  Dubai Future District International Engagement Hub
                </Badge>
                <h1 className="text-4xl md:text-6xl font-black text-white mb-6">
                  Discover Dubai's Future
                  <span className="block text-transparent bg-clip-text bg-gradient-to-r from-emerald-300 to-cyan-300">
                    Through Wellness & Purpose
                  </span>
                </h1>
                <p className="text-xl md:text-2xl text-gray-200 max-w-4xl mx-auto mb-8">
                  Experience the perfect blend of Museum of the Future tours, wellness journeys, healthy dining, and Downtown Dubai entertainment - all with exclusive member benefits for travelers and residents.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                  <Button 
                    onClick={handleOrderStarterKit}
                    disabled={isOrderLoading}
                    className="bg-gradient-to-r from-emerald-500 to-cyan-500 hover:from-emerald-600 hover:to-cyan-600 text-white text-xl px-10 py-6 rounded-full font-bold shadow-2xl"
                    data-testid="button-get-starter-kit-wellness"
                  >
                    <ShoppingCart className="w-6 h-6 mr-3" />
                    Get AED 99 Starter Kit & Join
                  </Button>
                  <Badge className="bg-white/10 text-white px-6 py-3 text-lg border border-white/20">
                    <Gift className="w-5 h-5 mr-2" />
                    Includes All Experience Benefits
                  </Badge>
                </div>
              </div>
            </section>

            {/* Museum of the Future Tours Section */}
            <Card className="bg-gradient-to-br from-purple-900/30 via-blue-900/30 to-cyan-900/30 border-2 border-purple-500/30">
              <CardHeader>
                <div className="text-center">
                  <CardTitle className="text-white flex items-center justify-center gap-3 text-3xl mb-4">
                    <Building2 className="w-10 h-10 text-purple-400" />
                    Museum of the Future Tours
                    <Sparkles className="w-10 h-10 text-cyan-400" />
                  </CardTitle>
                  <p className="text-gray-300 text-lg max-w-3xl mx-auto">
                    Explore tomorrow's innovations today with exclusive member discounts on Dubai's most iconic destination
                  </p>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-3 gap-6 mb-8">
                  {/* Standard Museum Tour */}
                  <Card className="bg-slate-800/50 border-purple-500/30 hover-elevate">
                    <CardContent className="p-6">
                      <div className="text-center mb-4">
                        <div className="w-16 h-16 bg-purple-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                          <Building2 className="w-8 h-8 text-purple-400" />
                        </div>
                        <h3 className="text-xl font-bold text-white mb-2">Discovery Tour</h3>
                        <Badge className="bg-purple-500/20 text-purple-300">Most Popular</Badge>
                      </div>
                      <div className="space-y-3 mb-6">
                        <div className="flex items-center gap-2 text-gray-300">
                          <CheckCircle className="w-4 h-4 text-emerald-400" />
                          <span className="text-sm">Full museum access</span>
                        </div>
                        <div className="flex items-center gap-2 text-gray-300">
                          <CheckCircle className="w-4 h-4 text-emerald-400" />
                          <span className="text-sm">Interactive exhibits</span>
                        </div>
                        <div className="flex items-center gap-2 text-gray-300">
                          <CheckCircle className="w-4 h-4 text-emerald-400" />
                          <span className="text-sm">Future wellness innovations</span>
                        </div>
                        <div className="flex items-center gap-2 text-gray-300">
                          <CheckCircle className="w-4 h-4 text-emerald-400" />
                          <span className="text-sm">Climate solutions showcase</span>
                        </div>
                      </div>
                      <div className="text-center">
                        <div className="text-3xl font-bold text-white mb-2">AED 145</div>
                        <div className="text-emerald-400 font-semibold mb-4">Members: 10% off</div>
                        <a href="https://museumofthefuture.ae" target="_blank" rel="noopener noreferrer">
                          <Button className="w-full bg-purple-500 hover:bg-purple-600" data-testid="button-book-discovery-tour">
                            <ExternalLink className="w-4 h-4 mr-2" />
                            Book Tour
                          </Button>
                        </a>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Wellness & Innovation Tour */}
                  <Card className="bg-slate-800/50 border-emerald-500/50 hover-elevate transform scale-105">
                    <CardContent className="p-6">
                      <div className="text-center mb-4">
                        <div className="w-16 h-16 bg-gradient-to-r from-emerald-500 to-cyan-500 rounded-full flex items-center justify-center mx-auto mb-4">
                          <Heart className="w-8 h-8 text-white" />
                        </div>
                        <h3 className="text-xl font-bold text-white mb-2">Wellness & Innovation</h3>
                        <Badge className="bg-gradient-to-r from-emerald-400 to-cyan-400 text-white">Recommended</Badge>
                      </div>
                      <div className="space-y-3 mb-6">
                        <div className="flex items-center gap-2 text-gray-300">
                          <CheckCircle className="w-4 h-4 text-emerald-400" />
                          <span className="text-sm">Everything in Discovery</span>
                        </div>
                        <div className="flex items-center gap-2 text-gray-300">
                          <CheckCircle className="w-4 h-4 text-emerald-400" />
                          <span className="text-sm">Guided wellness journey</span>
                        </div>
                        <div className="flex items-center gap-2 text-gray-300">
                          <CheckCircle className="w-4 h-4 text-emerald-400" />
                          <span className="text-sm">Sustainable living showcase</span>
                        </div>
                        <div className="flex items-center gap-2 text-gray-300">
                          <CheckCircle className="w-4 h-4 text-emerald-400" />
                          <span className="text-sm">Healthy dining voucher</span>
                        </div>
                      </div>
                      <div className="text-center">
                        <div className="text-3xl font-bold text-white mb-2">AED 199</div>
                        <div className="text-emerald-400 font-semibold mb-4">Members: 15% off + free water</div>
                        <Button className="w-full bg-gradient-to-r from-emerald-500 to-cyan-500 hover:from-emerald-600 hover:to-cyan-600" data-testid="button-book-wellness-tour">
                          <Heart className="w-4 h-4 mr-2" />
                          Start Wellness Journey
                        </Button>
                      </div>
                    </CardContent>
                  </Card>

                  {/* VIP Experience */}
                  <Card className="bg-slate-800/50 border-amber-500/30 hover-elevate">
                    <CardContent className="p-6">
                      <div className="text-center mb-4">
                        <div className="w-16 h-16 bg-amber-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                          <Crown className="w-8 h-8 text-amber-400" />
                        </div>
                        <h3 className="text-xl font-bold text-white mb-2">VIP Experience</h3>
                        <Badge className="bg-amber-500/20 text-amber-300">Premium</Badge>
                      </div>
                      <div className="space-y-3 mb-6">
                        <div className="flex items-center gap-2 text-gray-300">
                          <CheckCircle className="w-4 h-4 text-emerald-400" />
                          <span className="text-sm">Everything in Wellness</span>
                        </div>
                        <div className="flex items-center gap-2 text-gray-300">
                          <CheckCircle className="w-4 h-4 text-emerald-400" />
                          <span className="text-sm">Private guided tour</span>
                        </div>
                        <div className="flex items-center gap-2 text-gray-300">
                          <CheckCircle className="w-4 h-4 text-emerald-400" />
                          <span className="text-sm">Downtown dining package</span>
                        </div>
                        <div className="flex items-center gap-2 text-gray-300">
                          <CheckCircle className="w-4 h-4 text-emerald-400" />
                          <span className="text-sm">La Perle show discount</span>
                        </div>
                      </div>
                      <div className="text-center">
                        <div className="text-3xl font-bold text-white mb-2">AED 349</div>
                        <div className="text-emerald-400 font-semibold mb-4">Members: 20% off + perks</div>
                        <Button className="w-full bg-amber-500 hover:bg-amber-600" data-testid="button-book-vip-tour">
                          <Crown className="w-4 h-4 mr-2" />
                          Book VIP Experience
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                <div className="bg-gradient-to-r from-purple-500/10 to-cyan-500/10 rounded-2xl p-6 border border-purple-500/20">
                  <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                    <div className="flex-1">
                      <h4 className="text-lg font-bold text-white mb-2">Combine Museum Tour with Wellness Journey</h4>
                      <p className="text-gray-300 text-sm">
                        Members who book a Museum tour get exclusive access to our Dubai Wellness Walk, including stops at Baker's Kitchen, Mazaya Center wellness experiences, and Downtown entertainment.
                      </p>
                    </div>
                    <Button className="bg-white/10 border border-white/20 text-white hover:bg-white/20">
                      <MapPin className="w-4 h-4 mr-2" />
                      View Full Journey Map
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Downtown Dubai Wellness Journey */}
            <Card className="bg-gradient-to-br from-emerald-900/30 via-teal-900/30 to-cyan-900/30 border-2 border-emerald-500/30">
              <CardHeader>
                <div className="text-center">
                  <CardTitle className="text-white flex items-center justify-center gap-3 text-3xl mb-4">
                    <MapPin className="w-10 h-10 text-emerald-400" />
                    Downtown Dubai Wellness Journey
                    <Leaf className="w-10 h-10 text-green-400" />
                  </CardTitle>
                  <p className="text-gray-300 text-lg max-w-3xl mx-auto">
                    The world's first urban wellness track connecting luxury hospitality with sustainable living
                  </p>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                  {/* Step 1: Museum of the Future */}
                  <Card className="bg-slate-800/50 border-purple-500/30 hover-elevate">
                    <CardContent className="p-6">
                      <div className="text-center">
                        <div className="w-12 h-12 bg-purple-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                          <Building2 className="w-6 h-6 text-purple-400" />
                        </div>
                        <h3 className="font-bold text-white mb-3">Museum of the Future</h3>
                        <p className="text-sm text-gray-300 mb-4">
                          Begin your journey exploring tomorrow's wellness innovations
                        </p>
                        <Badge className="bg-purple-500/20 text-purple-300 mb-2">+100 Points</Badge>
                        <div className="text-xs text-gray-400 mt-2">
                          <MapPin className="w-3 h-3 inline mr-1" />
                          Emirates Towers area
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Step 2: Wellness Walk */}
                  <Card className="bg-slate-800/50 border-emerald-500/30 hover-elevate">
                    <CardContent className="p-6">
                      <div className="text-center">
                        <div className="w-12 h-12 bg-emerald-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                          <Footprints className="w-6 h-6 text-emerald-400" />
                        </div>
                        <h3 className="font-bold text-white mb-3">Urban Wellness Walk</h3>
                        <p className="text-sm text-gray-300 mb-4">
                          Scenic 3km track along Sheikh Zayed Road with hydration stations
                        </p>
                        <Badge className="bg-emerald-500/20 text-emerald-300 mb-2">+150 Points</Badge>
                        <div className="text-xs text-gray-400 mt-2">
                          <Clock className="w-3 h-3 inline mr-1" />
                          45 min walk
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Step 3: Healthy Dining */}
                  <Card className="bg-slate-800/50 border-amber-500/30 hover-elevate">
                    <CardContent className="p-6">
                      <div className="text-center">
                        <div className="w-12 h-12 bg-amber-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                          <Utensils className="w-6 h-6 text-amber-400" />
                        </div>
                        <h3 className="font-bold text-white mb-3">Baker's Kitchen</h3>
                        <p className="text-sm text-gray-300 mb-4">
                          Organic meals & Kangen water tasting at Mazaya Center
                        </p>
                        <Badge className="bg-amber-500/20 text-amber-300 mb-2">+75 Points</Badge>
                        <div className="text-xs text-gray-400 mt-2">
                          <Gift className="w-3 h-3 inline mr-1" />
                          Members: 20% off
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Step 4: Downtown Entertainment */}
                  <Card className="bg-slate-800/50 border-cyan-500/30 hover-elevate">
                    <CardContent className="p-6">
                      <div className="text-center">
                        <div className="w-12 h-12 bg-cyan-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                          <Star className="w-6 h-6 text-cyan-400" />
                        </div>
                        <h3 className="font-bold text-white mb-3">Downtown Shows</h3>
                        <p className="text-sm text-gray-300 mb-4">
                          La Perle Aqua Show & Dubai Mall experiences
                        </p>
                        <Badge className="bg-cyan-500/20 text-cyan-300 mb-2">+100 Points</Badge>
                        <div className="text-xs text-gray-400 mt-2">
                          <Trophy className="w-3 h-3 inline mr-1" />
                          VIP access available
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                {/* Journey Benefits */}
                <div className="bg-gradient-to-r from-emerald-500/10 to-cyan-500/10 rounded-2xl p-8 border border-emerald-500/20">
                  <h3 className="text-2xl font-bold text-white text-center mb-6">Complete Journey Rewards</h3>
                  <div className="grid md:grid-cols-3 gap-6">
                    <div className="text-center">
                      <Trophy className="w-12 h-12 text-amber-400 mx-auto mb-3" />
                      <div className="text-xl font-bold text-white mb-2">425 Total Points</div>
                      <p className="text-gray-300 text-sm">Unlock exclusive rewards & level up</p>
                    </div>
                    <div className="text-center">
                      <Gift className="w-12 h-12 text-emerald-400 mx-auto mb-3" />
                      <div className="text-xl font-bold text-white mb-2">AED 200+ Value</div>
                      <p className="text-gray-300 text-sm">In discounts & free experiences</p>
                    </div>
                    <div className="text-center">
                      <Share2 className="w-12 h-12 text-cyan-400 mx-auto mb-3" />
                      <div className="text-xl font-bold text-white mb-2">Social Rewards</div>
                      <p className="text-gray-300 text-sm">Share journey for bonus points</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Healthy Living & Dining Experiences */}
            <Card className="bg-gradient-to-br from-orange-900/30 via-red-900/30 to-pink-900/30 border-2 border-orange-500/30">
              <CardHeader>
                <div className="text-center">
                  <CardTitle className="text-white flex items-center justify-center gap-3 text-3xl mb-4">
                    <Coffee className="w-10 h-10 text-orange-400" />
                    Healthy Living & Dining
                    <Utensils className="w-10 h-10 text-red-400" />
                  </CardTitle>
                  <p className="text-gray-300 text-lg max-w-3xl mx-auto">
                    Curated healthy dining experiences across Downtown Dubai with member-exclusive discounts
                  </p>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-6">
                  {/* Baker's Kitchen */}
                  <Card className="bg-slate-800/50 border-emerald-500/30 hover-elevate">
                    <CardContent className="p-6">
                      <div className="flex items-start gap-4 mb-4">
                        <div className="w-12 h-12 bg-emerald-500/20 rounded-lg flex items-center justify-center flex-shrink-0">
                          <ChefHat className="w-6 h-6 text-emerald-400" />
                        </div>
                        <div className="flex-1">
                          <h3 className="text-lg font-bold text-white mb-2">Baker's Kitchen</h3>
                          <p className="text-gray-300 text-sm mb-3">
                            Organic healthy meals, fresh juices & Kangen water tasting experiences
                          </p>
                          <div className="space-y-2 mb-4">
                            <div className="flex items-center gap-2 text-sm">
                              <CheckCircle className="w-4 h-4 text-emerald-400" />
                              <span className="text-gray-300">Organic ingredients</span>
                            </div>
                            <div className="flex items-center gap-2 text-sm">
                              <CheckCircle className="w-4 h-4 text-emerald-400" />
                              <span className="text-gray-300">Alkaline water tasting</span>
                            </div>
                            <div className="flex items-center gap-2 text-sm">
                              <CheckCircle className="w-4 h-4 text-emerald-400" />
                              <span className="text-gray-300">Wellness consultations</span>
                            </div>
                          </div>
                          <Badge className="bg-emerald-500/20 text-emerald-300">Members: 20% off</Badge>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Chill & Grill */}
                  <Card className="bg-slate-800/50 border-orange-500/30 hover-elevate">
                    <CardContent className="p-6">
                      <div className="flex items-start gap-4 mb-4">
                        <div className="w-12 h-12 bg-orange-500/20 rounded-lg flex items-center justify-center flex-shrink-0">
                          <Utensils className="w-6 h-6 text-orange-400" />
                        </div>
                        <div className="flex-1">
                          <h3 className="text-lg font-bold text-white mb-2">Chill & Grill</h3>
                          <p className="text-gray-300 text-sm mb-3">
                            Premium pizzas & boba tea - perfect for community gatherings
                          </p>
                          <div className="space-y-2 mb-4">
                            <div className="flex items-center gap-2 text-sm">
                              <CheckCircle className="w-4 h-4 text-orange-400" />
                              <span className="text-gray-300">Pizza + Boba for 2</span>
                            </div>
                            <div className="flex items-center gap-2 text-sm">
                              <CheckCircle className="w-4 h-4 text-orange-400" />
                              <span className="text-gray-300">Referral rewards</span>
                            </div>
                            <div className="flex items-center gap-2 text-sm">
                              <CheckCircle className="w-4 h-4 text-orange-400" />
                              <span className="text-gray-300">Community events</span>
                            </div>
                          </div>
                          <Badge className="bg-orange-500/20 text-orange-300">D100 Vouchers Available</Badge>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Mazaya Center Wellness */}
                  <Card className="bg-slate-800/50 border-purple-500/30 hover-elevate">
                    <CardContent className="p-6">
                      <div className="flex items-start gap-4 mb-4">
                        <div className="w-12 h-12 bg-purple-500/20 rounded-lg flex items-center justify-center flex-shrink-0">
                          <Heart className="w-6 h-6 text-purple-400" />
                        </div>
                        <div className="flex-1">
                          <h3 className="text-lg font-bold text-white mb-2">Mazaya Center Partners</h3>
                          <p className="text-gray-300 text-sm mb-3">
                            Exclusive discounts at 15+ wellness & lifestyle merchants
                          </p>
                          <div className="space-y-2 mb-4">
                            <div className="flex items-center gap-2 text-sm">
                              <CheckCircle className="w-4 h-4 text-purple-400" />
                              <span className="text-gray-300">Health & beauty</span>
                            </div>
                            <div className="flex items-center gap-2 text-sm">
                              <CheckCircle className="w-4 h-4 text-purple-400" />
                              <span className="text-gray-300">Fitness & yoga</span>
                            </div>
                            <div className="flex items-center gap-2 text-sm">
                              <CheckCircle className="w-4 h-4 text-purple-400" />
                              <span className="text-gray-300">Spa services</span>
                            </div>
                          </div>
                          <Badge className="bg-purple-500/20 text-purple-300">Up to 20% off</Badge>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Downtown Entertainment */}
                  <Card className="bg-slate-800/50 border-pink-500/30 hover-elevate">
                    <CardContent className="p-6">
                      <div className="flex items-start gap-4 mb-4">
                        <div className="w-12 h-12 bg-pink-500/20 rounded-lg flex items-center justify-center flex-shrink-0">
                          <Star className="w-6 h-6 text-pink-400" />
                        </div>
                        <div className="flex-1">
                          <h3 className="text-lg font-bold text-white mb-2">Entertainment Experiences</h3>
                          <p className="text-gray-300 text-sm mb-3">
                            Access to Dubai's best shows, attractions & cultural experiences
                          </p>
                          <div className="space-y-2 mb-4">
                            <div className="flex items-center gap-2 text-sm">
                              <CheckCircle className="w-4 h-4 text-pink-400" />
                              <span className="text-gray-300">La Perle Aqua Show</span>
                            </div>
                            <div className="flex items-center gap-2 text-sm">
                              <CheckCircle className="w-4 h-4 text-pink-400" />
                              <span className="text-gray-300">Dubai Mall attractions</span>
                            </div>
                            <div className="flex items-center gap-2 text-sm">
                              <CheckCircle className="w-4 h-4 text-pink-400" />
                              <span className="text-gray-300">Cultural tours</span>
                            </div>
                          </div>
                          <Badge className="bg-pink-500/20 text-pink-300">Exclusive Member Rates</Badge>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </CardContent>
            </Card>

            {/* Member Benefits Summary */}
            <Card className="bg-gradient-to-r from-cyan-900/30 to-blue-900/30 border-2 border-cyan-500/30">
              <CardContent className="p-8">
                <div className="text-center mb-8">
                  <Crown className="w-16 h-16 text-cyan-400 mx-auto mb-4" />
                  <h2 className="text-3xl font-bold text-white mb-4">
                    AED 99 Starter Kit Membership Benefits
                  </h2>
                  <p className="text-gray-300 text-lg max-w-3xl mx-auto">
                    Join as a resident or visitor and unlock exclusive access to Dubai's wellness ecosystem
                  </p>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                  <div className="bg-slate-800/30 rounded-xl p-6 text-center">
                    <Droplet className="w-12 h-12 text-cyan-400 mx-auto mb-3" />
                    <h3 className="font-bold text-white mb-2">Water Filter System</h3>
                    <p className="text-sm text-gray-300">Premium shower filter worth AED 299</p>
                  </div>
                  <div className="bg-slate-800/30 rounded-xl p-6 text-center">
                    <Gift className="w-12 h-12 text-emerald-400 mx-auto mb-3" />
                    <h3 className="font-bold text-white mb-2">Experience Discounts</h3>
                    <p className="text-sm text-gray-300">10-20% off tours, dining & shows</p>
                  </div>
                  <div className="bg-slate-800/30 rounded-xl p-6 text-center">
                    <Smartphone className="w-12 h-12 text-purple-400 mx-auto mb-3" />
                    <h3 className="font-bold text-white mb-2">iPhone Trade-in Rewards</h3>
                    <p className="text-sm text-gray-300">Extra DXBs + free pickup</p>
                  </div>
                  <div className="bg-slate-800/30 rounded-xl p-6 text-center">
                    <Trophy className="w-12 h-12 text-amber-400 mx-auto mb-3" />
                    <h3 className="font-bold text-white mb-2">Rewards & Points</h3>
                    <p className="text-sm text-gray-300">Earn points for every activity</p>
                  </div>
                </div>

                <div className="mt-8 text-center">
                  <Button 
                    onClick={handleOrderStarterKit}
                    disabled={isOrderLoading}
                    className="bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white text-xl px-12 py-6 rounded-full font-bold"
                    data-testid="button-join-wellness-community"
                  >
                    <ShoppingCart className="w-6 h-6 mr-3" />
                    Join for AED 99 - Start Your Journey
                  </Button>
                  <p className="text-gray-400 mt-4">
                    Perfect for tourists & residents • Share on social media for bonus rewards
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Social Sharing CTA */}
            <Card className="bg-gradient-to-r from-pink-900/30 to-purple-900/30 border-2 border-pink-500/30">
              <CardContent className="p-8">
                <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-4">
                      <Share2 className="w-10 h-10 text-pink-400" />
                      <h3 className="text-2xl font-bold text-white">Share Your Dubai Journey</h3>
                    </div>
                    <p className="text-gray-300 mb-4">
                      Post about your Museum of the Future visit, wellness walk, or dining experiences with #DubaiWellnessJourney and earn bonus points. Help friends discover sustainable living in Dubai!
                    </p>
                    <div className="flex flex-wrap gap-2">
                      <Badge className="bg-pink-500/20 text-pink-300">#DubaiWellnessJourney</Badge>
                      <Badge className="bg-purple-500/20 text-purple-300">#MuseumOfTheFuture</Badge>
                      <Badge className="bg-cyan-500/20 text-cyan-300">#SustainableDubai</Badge>
                      <Badge className="bg-emerald-500/20 text-emerald-300">#AquaCafeJourney</Badge>
                    </div>
                  </div>
                  <div className="flex flex-col gap-3">
                    <Button className="bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600 text-white">
                      <Camera className="w-4 h-4 mr-2" />
                      Share on Social Media
                    </Button>
                    <Button variant="outline" className="border-white/20 text-white hover:bg-white/10">
                      <Send className="w-4 h-4 mr-2" />
                      Invite Friends
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Community Hub Tab */}
        {activeTab === "community-hub" && (
          <div className="space-y-8">
            {/* Future District Activities */}
            <Card className="bg-gradient-to-r from-blue-900/30 to-cyan-900/30 border border-blue-500/30">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-3">
                  <Building2 className="w-8 h-8 text-blue-400" />
                  Future District & Museum of the Future Activities
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-6">
                  {futureActivities.map((activity) => (
                    <Card key={activity.id} className="bg-slate-800/50 border-slate-700 hover-elevate">
                      <CardContent className="p-6">
                        <div className="flex items-start gap-4 mb-4">
                          <div className="w-12 h-12 bg-blue-500/20 rounded-lg flex items-center justify-center flex-shrink-0">
                            <activity.icon className="w-6 h-6 text-blue-400" />
                          </div>
                          <div className="flex-1">
                            <h3 className="text-lg font-bold text-white mb-2">{activity.title}</h3>
                            <p className="text-gray-300 text-sm mb-3">{activity.description}</p>
                            <div className="flex items-center gap-4 text-xs">
                              <Badge className="bg-blue-500/20 text-blue-400">
                                <Clock className="w-3 h-3 mr-1" />
                                {activity.time}
                              </Badge>
                              <span className="text-gray-400">{activity.participants}</span>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Metropolitan Leadership Message */}
            <Card className="bg-gradient-to-r from-purple-900/30 to-pink-900/30 border border-purple-500/30">
              <CardContent className="p-8">
                <div className="text-center">
                  <Globe className="w-16 h-16 text-purple-400 mx-auto mb-4" />
                  <h2 className="text-3xl font-bold text-white mb-4">
                    Dubai: Global Environmental & Metropolitan Leadership
                  </h2>
                  <p className="text-gray-300 text-lg max-w-3xl mx-auto mb-6">
                    The Future District is positioning Dubai as an important hub in global environmental and metropolitan leadership. Through innovative programs in impact commerce, smart shopping, and electronics recycling, we're building a sustainable future that engages residents, participants, and tourists alike.
                  </p>
                  <div className="grid md:grid-cols-3 gap-4 mt-8">
                    <div className="bg-purple-500/10 rounded-lg p-4">
                      <Recycle className="w-8 h-8 text-purple-400 mx-auto mb-2" />
                      <div className="text-xl font-bold text-purple-400">{(communityStats.devicesRecycled / 1000).toFixed(1)}K</div>
                      <div className="text-sm text-gray-300">Devices Recycled</div>
                    </div>
                    <div className="bg-pink-500/10 rounded-lg p-4">
                      <Users className="w-8 h-8 text-pink-400 mx-auto mb-2" />
                      <div className="text-xl font-bold text-pink-400">{communityStats.totalMembers.toLocaleString()}</div>
                      <div className="text-sm text-gray-300">Active Participants</div>
                    </div>
                    <div className="bg-purple-500/10 rounded-lg p-4">
                      <Trophy className="w-8 h-8 text-purple-400 mx-auto mb-2" />
                      <div className="text-xl font-bold text-purple-400">{communityStats.eventsHosted}</div>
                      <div className="text-sm text-gray-300">Events Hosted</div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Chill & Grill Tab */}
        {activeTab === "chill-grill" && (
          <div className="space-y-6">
            {/* Chill & Grill Partnership Experience */}
            <section className="w-full py-12 px-4 bg-gradient-to-r from-orange-900/30 to-red-900/30 rounded-3xl border-2 border-orange-500/30" data-testid="chill-grill-partnership">
              <div className="max-w-7xl mx-auto">
                <div className="text-center mb-10">
                  <div className="inline-flex items-center gap-2 bg-orange-500/20 text-orange-400 px-6 py-3 rounded-full mb-6 border border-orange-500/30">
                    <Utensils className="w-6 h-6" />
                    <span className="font-bold text-lg">PARTNERSHIP EXPERIENCE</span>
                  </div>
                  <h2 className="text-4xl font-black text-white mb-4">
                    Chill & Grill: Pizza + Boba Tea for Two
                  </h2>
                  <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-6">
                    Your membership includes exclusive access to healthy dining experiences. Every friend you refer to the Future District community earns you both D100 vouchers.
                  </p>
                  <Badge className="bg-emerald-500/20 text-emerald-400 px-6 py-3 text-lg font-bold border border-emerald-500/30">
                    Part of Your AED 99 Starter Kit Benefits
                  </Badge>
                </div>

                {/* Lifestyle Gallery */}
                <div className="grid md:grid-cols-3 gap-6 mb-10">
                  <div className="relative rounded-2xl overflow-hidden shadow-2xl" data-testid="image-pizza">
                    <img src={pizzaImage} alt="Delicious Pizza" className="w-full h-64 object-cover" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end p-6">
                      <p className="text-white font-bold text-xl">Authentic Pizzas</p>
                    </div>
                  </div>
                  <div className="relative rounded-2xl overflow-hidden shadow-2xl" data-testid="image-boba">
                    <img src={bobaTeaImage} alt="Boba Tea" className="w-full h-64 object-cover" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end p-6">
                      <p className="text-white font-bold text-xl">Premium Boba Tea</p>
                    </div>
                  </div>
                  <div className="relative rounded-2xl overflow-hidden shadow-2xl" data-testid="image-dining">
                    <img src={happyDiningImage} alt="Happy Dining Experience" className="w-full h-64 object-cover" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end p-6">
                      <p className="text-white font-bold text-xl">Memorable Moments</p>
                    </div>
                  </div>
                </div>

                {/* How It Works */}
                <div className="bg-slate-800/50 rounded-2xl p-8 border border-orange-500/30">
                  <h3 className="text-2xl font-bold text-white text-center mb-8">
                    Earn Dining Rewards Through Community Engagement
                  </h3>
                  <div className="grid md:grid-cols-3 gap-6">
                    <div className="text-center">
                      <div className="w-16 h-16 bg-orange-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                        <Users className="w-8 h-8 text-orange-400" />
                      </div>
                      <h4 className="font-bold text-white mb-2">Refer Friends</h4>
                      <p className="text-gray-300 text-sm">
                        Invite residents or tourists to join Future District community
                      </p>
                    </div>
                    <div className="text-center">
                      <div className="w-16 h-16 bg-red-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                        <Gift className="w-8 h-8 text-red-400" />
                      </div>
                      <h4 className="font-bold text-white mb-2">Earn Vouchers</h4>
                      <p className="text-gray-300 text-sm">
                        Both you and your friend get D100 dining vouchers
                      </p>
                    </div>
                    <div className="text-center">
                      <div className="w-16 h-16 bg-orange-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                        <Utensils className="w-8 h-8 text-orange-400" />
                      </div>
                      <h4 className="font-bold text-white mb-2">Enjoy Together</h4>
                      <p className="text-gray-300 text-sm">
                        Redeem for Chill & Grill meals and celebrate impact
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </div>
        )}

        {/* Future Events Tab */}
        {activeTab === "future-events" && (
          <div className="space-y-6">
            <Card className="bg-gradient-to-r from-blue-900/30 to-purple-900/30 border border-blue-500/30">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-3">
                  <Calendar className="w-8 h-8 text-blue-400" />
                  Upcoming Dubai Future District Events
                </CardTitle>
                <p className="text-gray-300 mt-2">
                  Engage with innovation, sustainability, and metropolitan leadership through these signature events
                </p>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {futureEvents.map((event) => (
                    <Card key={event.id} className="bg-slate-800/50 border-slate-700 hover-elevate">
                      <CardContent className="p-6">
                        <div className="flex flex-col md:flex-row gap-6">
                          <div className="flex-1">
                            <div className="flex items-center gap-3 mb-3">
                              <Badge className={`
                                ${event.category === 'ai' ? 'bg-purple-500/20 text-purple-400' : ''}
                                ${event.category === 'sustainability' ? 'bg-green-500/20 text-green-400' : ''}
                                ${event.category === 'innovation' ? 'bg-blue-500/20 text-blue-400' : ''}
                                ${event.category === 'community' ? 'bg-orange-500/20 text-orange-400' : ''}
                              `}>
                                {event.category.toUpperCase()}
                              </Badge>
                              {event.participants && (
                                <span className="text-sm text-gray-400">
                                  <Users className="w-4 h-4 inline mr-1" />
                                  {event.participants.toLocaleString()} registered
                                </span>
                              )}
                            </div>
                            <h3 className="text-2xl font-bold text-white mb-2">{event.title}</h3>
                            <p className="text-gray-300 mb-4">{event.description}</p>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
                              <div className="flex items-center gap-2 text-blue-400">
                                <Calendar className="w-4 h-4" />
                                {event.date}
                              </div>
                              <div className="flex items-center gap-2 text-cyan-400">
                                <MapPin className="w-4 h-4" />
                                {event.location}
                              </div>
                            </div>
                            <div className="mt-4 p-3 bg-emerald-500/10 rounded-lg border border-emerald-500/20">
                              <div className="flex items-center gap-2 text-emerald-400 font-semibold text-sm">
                                <Sparkles className="w-4 h-4" />
                                Impact Focus: {event.impact}
                              </div>
                            </div>
                          </div>
                          <div className="flex items-center">
                            <Button className="bg-gradient-to-r from-blue-500 to-purple-500 text-white">
                              <Plus className="w-4 h-4 mr-2" />
                              Register Now
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* CTA to Order Starter Kit */}
            <Card className="bg-gradient-to-r from-emerald-900/40 to-green-900/40 border-2 border-emerald-500/50">
              <CardContent className="p-8 text-center">
                <h3 className="text-2xl font-bold text-white mb-4">
                  Get Priority Access to All Events
                </h3>
                <p className="text-gray-300 mb-6">
                  AED 99 Starter Kit members get early registration and exclusive perks at all Future District events
                </p>
                <Button
                  size="lg"
                  onClick={handleOrderStarterKit}
                  disabled={isOrderLoading}
                  className="bg-gradient-to-r from-emerald-600 to-green-600 hover:from-emerald-500 hover:to-green-500 text-white font-bold"
                  data-testid="button-order-starter-kit-events"
                >
                  <Gift className="w-5 h-5 mr-2" />
                  {isOrderLoading ? "Adding..." : "Order Starter Kit - AED 99"}
                </Button>
              </CardContent>
            </Card>
          </div>
        )}

        {/* District Activities Tab */}
        {activeTab === "activities" && (
          <div className="space-y-6">
            <SocialChallengesFeed />
          </div>
        )}

        {/* Leaderboard Tab */}
        {activeTab === "leaderboard" && (
          <div className="space-y-6">
            {hasLeaderboardError ? (
              <Card className="bg-slate-800/50 border-slate-700">
                <CardContent className="p-8 text-center">
                  <AlertCircle className="w-16 h-16 text-amber-500 mx-auto mb-4" />
                  <h3 className="text-xl font-bold text-white mb-2">Rankings Coming Soon</h3>
                  <p className="text-gray-400">
                    Leaderboard data is currently unavailable. Check back soon to see community rankings!
                  </p>
                </CardContent>
              </Card>
            ) : (
              <Card className="bg-slate-800/50 border-slate-700">
                <CardHeader>
                  <CardTitle className="text-white flex items-center gap-3">
                    <Trophy className="w-8 h-8 text-amber-500" />
                    Top Planet Heroes
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {heroes?.map((hero, index) => (
                      <div
                        key={hero.id}
                        className="flex items-center gap-4 p-4 bg-slate-700/30 rounded-lg hover-elevate"
                        data-testid={`hero-${index}`}
                      >
                        <div className="flex-shrink-0">
                          {getRankIcon(index)}
                        </div>
                        <Avatar className="w-12 h-12">
                          <AvatarFallback className="bg-gradient-to-r from-blue-500 to-cyan-500 text-white font-bold">
                            {hero.name.split(' ').map(n => n[0]).join('')}
                          </AvatarFallback>
                        </Avatar>
                        <div className="flex-1">
                          <div className="font-bold text-white">{hero.name}</div>
                          <div className="text-sm text-gray-400">
                            {hero.points.toLocaleString()} points • {hero.bottlesPrevented.toLocaleString()} bottles prevented
                          </div>
                        </div>
                        <Badge className={getLevelBadgeColor(hero.level)}>
                          {hero.level}
                        </Badge>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        )}

        {/* Live Feed Tab */}
        {activeTab === "live" && (
          <div className="space-y-6">
            <Card className="bg-gradient-to-r from-red-900/30 to-orange-900/30 border border-red-500/30">
              <CardContent className="p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
                  <h2 className="text-xl font-bold text-white">Live Community Activity</h2>
                  <Badge className="bg-red-500/20 text-red-400">
                    {communityStats.liveActivities} activities now
                  </Badge>
                </div>
                
                <div className="space-y-3">
                  {recentActivities.map((activity) => (
                    <div key={activity.id} className="flex items-center gap-4 p-3 bg-slate-800/30 rounded-lg">
                      <Avatar className="w-10 h-10">
                        <AvatarFallback className="bg-gradient-to-r from-blue-500 to-cyan-500 text-white font-bold text-sm">
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
                        activity.type === 'event' ? 'bg-purple-500/20 text-purple-400' :
                        activity.type === 'recycle' ? 'bg-green-500/20 text-green-400' :
                        activity.type === 'learn' ? 'bg-blue-500/20 text-blue-400' :
                        'bg-amber-500/20 text-amber-400'
                      }`}>
                        {activity.type}
                      </Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Forum Tab */}
        {activeTab === "forum" && (
          <div className="space-y-6">
            <Card className="bg-slate-800/50 border-slate-700">
              <CardHeader>
                <CardTitle className="text-white">Community Forum</CardTitle>
                <p className="text-gray-400 text-sm">
                  Connect with Future District participants, share insights, and discuss impact commerce
                </p>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {forumPosts.map((post) => (
                    <Card key={post.id} className="bg-slate-700/30 border-slate-600 hover-elevate">
                      <CardContent className="p-4">
                        <div className="flex items-start gap-4">
                          <Avatar className="w-10 h-10">
                            <AvatarFallback className="bg-gradient-to-r from-blue-500 to-cyan-500 text-white font-bold text-sm">
                              {post.avatar}
                            </AvatarFallback>
                          </Avatar>
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-2">
                              <span className="font-semibold text-white">{post.author}</span>
                              <Badge className={`text-xs ${
                                post.category === 'water' ? 'bg-blue-500/20 text-blue-400' :
                                post.category === 'ewaste' ? 'bg-green-500/20 text-green-400' :
                                post.category === 'global' ? 'bg-purple-500/20 text-purple-400' :
                                'bg-cyan-500/20 text-cyan-400'
                              }`}>
                                {post.category}
                              </Badge>
                              <span className="text-sm text-gray-400">• {post.timestamp}</span>
                            </div>
                            <h3 className="text-lg font-bold text-white mb-2">{post.title}</h3>
                            <p className="text-gray-300 mb-3">{post.content}</p>
                            <div className="flex flex-wrap items-center gap-3 text-sm">
                              <span className="text-gray-400 flex items-center gap-1">
                                <MapPin className="w-3 h-3" />
                                {post.location}
                              </span>
                              <span className="text-gray-400">{post.likes} likes</span>
                              <span className="text-gray-400">{post.replies} replies</span>
                              <div className="flex flex-wrap gap-2">
                                {post.tags.map((tag) => (
                                  <Badge key={tag} className="bg-slate-600/50 text-gray-300 text-xs">
                                    #{tag}
                                  </Badge>
                                ))}
                              </div>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Social Resources */}
            <Card className="bg-gradient-to-r from-emerald-900/30 to-cyan-900/30 border border-emerald-500/30">
              <CardHeader>
                <CardTitle className="text-white">Join Our Communities</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-4">
                  {socialResources.map((resource) => (
                    <a
                      key={resource.id}
                      href={resource.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block p-4 bg-slate-800/50 rounded-lg border border-slate-700 hover-elevate"
                    >
                      <div className="flex items-start gap-3">
                        <div className="w-10 h-10 bg-emerald-500/20 rounded-lg flex items-center justify-center flex-shrink-0">
                          <MessageCircle className="w-5 h-5 text-emerald-400" />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <h3 className="font-bold text-white">{resource.name}</h3>
                            {resource.isOfficial && (
                              <Badge className="bg-blue-500/20 text-blue-400 text-xs">Official</Badge>
                            )}
                          </div>
                          <p className="text-sm text-gray-300 mb-2">{resource.description}</p>
                          <div className="text-xs text-gray-400">
                            {resource.members.toLocaleString()} members
                          </div>
                        </div>
                        <ExternalLink className="w-4 h-4 text-gray-400" />
                      </div>
                    </a>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Achievements Tab */}
        {activeTab === "achievements" && (
          <div className="space-y-6">
            <Card className="bg-slate-800/50 border-slate-700">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-3">
                  <Award className="w-8 h-8 text-amber-500" />
                  Community Achievements
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-6">
                  {achievements.map((achievement, index) => (
                    <Card key={index} className={`${achievement.unlocked ? 'bg-gradient-to-r from-amber-900/30 to-orange-900/30 border-amber-500/50' : 'bg-slate-700/30 border-slate-600'}`}>
                      <CardContent className="p-6">
                        <div className="flex items-center gap-4 mb-4">
                          <div className={`p-3 rounded-lg ${achievement.unlocked ? 'bg-amber-500/20' : 'bg-slate-600/20'}`}>
                            {achievement.icon}
                          </div>
                          <div className="flex-1">
                            <h3 className="font-bold text-white mb-1">{achievement.title}</h3>
                            <p className="text-sm text-gray-300">{achievement.description}</p>
                          </div>
                          {achievement.unlocked && (
                            <CheckCircle className="w-6 h-6 text-amber-400" />
                          )}
                        </div>
                        <div className="w-full bg-slate-700 rounded-full h-2">
                          <div
                            className={`h-2 rounded-full ${achievement.unlocked ? 'bg-gradient-to-r from-amber-500 to-orange-500' : 'bg-blue-500'}`}
                            style={{ width: `${achievement.progress}%` }}
                          />
                        </div>
                        <div className="text-sm text-gray-400 mt-2 text-right">
                          {achievement.progress}% complete
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
}
