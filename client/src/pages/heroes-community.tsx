import { useState } from "react";
import { MessageCircle, Users, Globe, Droplet, Recycle, Send, Heart, MessageSquare, Filter, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

interface Post {
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

const mockPosts: Post[] = [
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

export default function HeroesCommunity() {
  const [activeTab, setActiveTab] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [newPost, setNewPost] = useState({ title: "", content: "", category: "water" as const });

  const categories = [
    { id: "all", label: "All Discussions", icon: MessageCircle, color: "text-blue-400" },
    { id: "water", label: "Water Heroes", icon: Droplet, color: "text-cyan-400" },
    { id: "ewaste", label: "E-Waste Trading", icon: Recycle, color: "text-green-400" }, 
    { id: "missions", label: "Global Missions", icon: Globe, color: "text-purple-400" },
    { id: "connect", label: "Community Connect", icon: Users, color: "text-orange-400" }
  ];

  const filteredPosts = mockPosts.filter(post => {
    const matchesTab = activeTab === "all" || post.category === activeTab;
    const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         post.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         post.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesTab && matchesSearch;
  });

  const getCategoryColor = (category: string) => {
    switch(category) {
      case "water": return "bg-cyan-500/20 text-cyan-300 border-cyan-500/30";
      case "ewaste": return "bg-green-500/20 text-green-300 border-green-500/30";
      case "missions": return "bg-purple-500/20 text-purple-300 border-purple-500/30";
      default: return "bg-blue-500/20 text-blue-300 border-blue-500/30";
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-emerald-900">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-emerald-600/20 to-cyan-600/20 border-b border-emerald-500/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Heroes Community Forum
            </h1>
            <p className="text-xl text-emerald-100 mb-6 max-w-3xl mx-auto">
              Connect with environmental heroes worldwide. Share missions, exchange ideas, and multiply your impact through global collaboration.
            </p>
            <div className="flex flex-wrap justify-center gap-4 text-emerald-200">
              <div className="flex items-center gap-2">
                <Users className="w-5 h-5" />
                <span>12,847 Active Heroes</span>
              </div>
              <div className="flex items-center gap-2">
                <Globe className="w-5 h-5" />
                <span>89 Cities Connected</span>
              </div>
              <div className="flex items-center gap-2">
                <MessageCircle className="w-5 h-5" />
                <span>24/7 Global Discussions</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Search and Filter Bar */}
        <div className="mb-8">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <Input
                placeholder="Search discussions, missions, and communities..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 bg-slate-800/50 border-slate-600 text-white placeholder-gray-400"
                data-testid="input-search-community"
              />
            </div>
            <Button variant="outline" className="border-emerald-500/30 text-emerald-300 hover:bg-emerald-500/20">
              <Filter className="w-4 h-4 mr-2" />
              Filter
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar - Categories */}
          <div className="lg:col-span-1">
            <Card className="bg-slate-800/50 border-slate-700">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <MessageCircle className="w-5 h-5 text-emerald-400" />
                  Discussion Categories
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                {categories.map((category) => {
                  const Icon = category.icon;
                  return (
                    <button
                      key={category.id}
                      onClick={() => setActiveTab(category.id)}
                      className={`w-full flex items-center gap-3 p-3 rounded-lg transition-colors text-left ${
                        activeTab === category.id
                          ? "bg-emerald-500/20 border border-emerald-500/30 text-emerald-300"
                          : "text-gray-300 hover:bg-slate-700/50 hover:text-white"
                      }`}
                      data-testid={`button-category-${category.id}`}
                    >
                      <Icon className={`w-5 h-5 ${category.color}`} />
                      <span className="font-medium">{category.label}</span>
                    </button>
                  );
                })}
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card className="bg-slate-800/50 border-slate-700 mt-6">
              <CardHeader>
                <CardTitle className="text-white text-sm">Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button className="w-full bg-emerald-600 hover:bg-emerald-700" data-testid="button-start-discussion">
                  <MessageSquare className="w-4 h-4 mr-2" />
                  Start Discussion
                </Button>
                <Button variant="outline" className="w-full border-cyan-500/30 text-cyan-300 hover:bg-cyan-500/20" data-testid="button-find-communities">
                  <Globe className="w-4 h-4 mr-2" />
                  Find Communities
                </Button>
                <Button variant="outline" className="w-full border-purple-500/30 text-purple-300 hover:bg-purple-500/20" data-testid="button-join-mission">
                  <Users className="w-4 h-4 mr-2" />
                  Join Global Mission
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            {/* Post Creation */}
            <Card className="bg-slate-800/50 border-slate-700 mb-6">
              <CardHeader>
                <CardTitle className="text-white">Share with Global Heroes</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
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
                    <Badge variant="outline" className="border-cyan-500/30 text-cyan-300">
                      <Droplet className="w-3 h-3 mr-1" />
                      Water
                    </Badge>
                    <Badge variant="outline" className="border-green-500/30 text-green-300">
                      <Recycle className="w-3 h-3 mr-1" />
                      E-Waste
                    </Badge>
                  </div>
                  <Button className="bg-emerald-600 hover:bg-emerald-700" data-testid="button-post-share">
                    <Send className="w-4 h-4 mr-2" />
                    Share
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Discussion Posts */}
            <div className="space-y-4">
              {filteredPosts.map((post) => (
                <Card key={post.id} className="bg-slate-800/50 border-slate-700 hover:border-slate-600 transition-colors">
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      <Avatar className="bg-emerald-500">
                        <AvatarFallback className="text-white font-bold">
                          {post.avatar}
                        </AvatarFallback>
                      </Avatar>
                      
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h3 className="font-bold text-white">{post.author}</h3>
                          <span className="text-gray-400 text-sm">{post.location}</span>
                          <span className="text-gray-500 text-sm">{post.timestamp}</span>
                          <Badge variant="outline" className={getCategoryColor(post.category)}>
                            {post.category}
                          </Badge>
                        </div>
                        
                        <h4 className="text-lg font-semibold text-white mb-3">{post.title}</h4>
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

            {/* Load More */}
            <div className="text-center mt-8">
              <Button variant="outline" className="border-emerald-500/30 text-emerald-300 hover:bg-emerald-500/20" data-testid="button-load-more">
                Load More Discussions
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}