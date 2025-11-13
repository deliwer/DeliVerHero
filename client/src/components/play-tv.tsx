import { useState, useEffect, useRef } from "react";
import { useQuery } from "@tanstack/react-query";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Play, 
  Tv, 
  TrendingUp, 
  Users, 
  Globe, 
  Zap,
  Award,
  Target,
  Sparkles,
  ExternalLink,
  Youtube
} from "lucide-react";
import type { PlanetMission } from "@shared/schema";

interface PlayTVProps {
  className?: string;
}

export function PlayTV({ className = "" }: PlayTVProps) {
  const [selectedTab, setSelectedTab] = useState<"live" | "missions" | "community">("live");
  const [isPlaying, setIsPlaying] = useState(false);
  const [videoLoadError, setVideoLoadError] = useState(false);
  const loadTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Fetch active missions
  const { data: missionsData, isLoading } = useQuery<PlanetMission[]>({
    queryKey: ['/api/metaverse/missions'],
  });

  const missions = Array.isArray(missionsData) ? missionsData : [];

  const featuredMissions = missions
    ?.filter(m => m.isActive && m.isEpic)
    ?.slice(0, 4) || [];

  // YouTube channel for @vdeliwer
  const YOUTUBE_PLAYLIST_ID = "UUyQ8_cR5c6J0rX8fZQx9yKw"; // UC -> UU for uploads playlist
  const YOUTUBE_CHANNEL_URL = "https://www.youtube.com/@vdeliwer";

  // Add timeout to show fallback if iframe doesn't load
  useEffect(() => {
    if (selectedTab === "live") {
      // Reset error state when switching to live tab
      setVideoLoadError(false);
      
      // Clear any existing timeout
      if (loadTimeoutRef.current) {
        clearTimeout(loadTimeoutRef.current);
      }
      
      // Set new timeout for fallback
      loadTimeoutRef.current = setTimeout(() => {
        setVideoLoadError(true);
      }, 10000); // Show fallback after 10 seconds if iframe hasn't loaded
      
      return () => {
        if (loadTimeoutRef.current) {
          clearTimeout(loadTimeoutRef.current);
        }
      };
    }
  }, [selectedTab]);

  const handleIframeLoad = () => {
    // Clear timeout and reset error state on successful load
    if (loadTimeoutRef.current) {
      clearTimeout(loadTimeoutRef.current);
      loadTimeoutRef.current = null;
    }
    setVideoLoadError(false);
  };
  
  return (
    <div className={`${className}`}>
      {/* Play TV Header */}
      <div className="text-center mb-8">
        <div className="inline-flex items-center gap-3 bg-gradient-to-r from-purple-500/20 to-pink-500/20 border border-purple-500/50 rounded-full px-6 py-3 mb-4">
          <Tv className="w-6 h-6 text-purple-400 animate-pulse" />
          <span className="text-xl font-bold text-purple-400">PLAY TV</span>
          <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />
          <span className="text-sm text-red-400 font-semibold">LIVE</span>
        </div>
        <h3 className="text-2xl md:text-3xl font-bold text-white mb-2">
          Watch. Play. Impact.
        </h3>
        <p className="text-gray-300 max-w-2xl mx-auto">
          See how the community creates real environmental change through missions and sustainable actions
        </p>
      </div>

      {/* Tab Navigation */}
      <div className="flex flex-wrap justify-center gap-2 mb-6">
        <Button
          variant={selectedTab === "live" ? "default" : "outline"}
          onClick={() => setSelectedTab("live")}
          className="toggle-elevate"
          data-testid="tab-live-feed"
        >
          <Youtube className="w-4 h-4 mr-2" />
          Live Feed
        </Button>
        <Button
          variant={selectedTab === "missions" ? "default" : "outline"}
          onClick={() => setSelectedTab("missions")}
          className="toggle-elevate"
          data-testid="tab-missions"
        >
          <Target className="w-4 h-4 mr-2" />
          Active Missions
        </Button>
        <Button
          variant={selectedTab === "community" ? "default" : "outline"}
          onClick={() => setSelectedTab("community")}
          className="toggle-elevate"
          data-testid="tab-community"
        >
          <Users className="w-4 h-4 mr-2" />
          Community Stories
        </Button>
      </div>

      {/* Content Area */}
      <div className="grid lg:grid-cols-3 gap-6">
        {/* Main Video Player */}
        <div className="lg:col-span-2">
          <Card className="bg-gradient-to-br from-slate-900/90 to-slate-800/90 border-purple-500/30 overflow-hidden">
            <CardContent className="p-0">
              {selectedTab === "live" && (
                <div className="aspect-video bg-slate-950 relative group">
                  {!videoLoadError ? (
                    <>
                      {/* YouTube Channel Latest Videos Embed */}
                      <iframe
                        src={`https://www.youtube.com/embed/videoseries?list=${YOUTUBE_PLAYLIST_ID}`}
                        className="w-full h-full"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                        title="DeliWer YouTube Channel - Latest Videos"
                        data-testid="youtube-embed"
                        onLoad={handleIframeLoad}
                      />
                      
                      {/* Overlay Info */}
                      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent p-4 opacity-0 group-hover:opacity-100 transition-opacity">
                        <div className="flex items-center justify-between">
                          <div>
                            <h4 className="text-white font-bold text-lg mb-1">@vdeliwer Channel</h4>
                            <p className="text-gray-300 text-sm">Latest sustainability missions and impact stories</p>
                          </div>
                          <a
                            href={YOUTUBE_CHANNEL_URL}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg transition-colors"
                            data-testid="button-subscribe-youtube"
                          >
                            <Youtube className="w-5 h-5" />
                            Subscribe
                          </a>
                        </div>
                      </div>
                    </>
                  ) : (
                    /* Fallback UI when video doesn't load */
                    <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-slate-900 to-slate-800">
                      <div className="text-center p-6 max-w-md">
                        <Youtube className="w-16 h-16 mx-auto mb-4 text-red-500" />
                        <h4 className="text-white font-bold text-xl mb-2">Watch on YouTube</h4>
                        <p className="text-gray-300 mb-6">
                          See the latest sustainability missions and impact stories from our community
                        </p>
                        <a
                          href={YOUTUBE_CHANNEL_URL}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-lg transition-colors font-medium"
                          data-testid="button-visit-youtube"
                        >
                          <Youtube className="w-5 h-5" />
                          Visit YouTube Channel
                        </a>
                      </div>
                    </div>
                  )}
                </div>
              )}

              {selectedTab === "missions" && (
                <div className="aspect-video bg-gradient-to-br from-purple-900/20 to-blue-900/20 p-6 overflow-y-auto">
                  <h4 className="text-white font-bold text-xl mb-4 flex items-center gap-2">
                    <Target className="w-6 h-6 text-purple-400" />
                    Active Planet Missions
                  </h4>
                  <div className="space-y-3">
                    {isLoading ? (
                      <p className="text-gray-400">Loading missions...</p>
                    ) : featuredMissions.length > 0 ? (
                      featuredMissions.map((mission) => (
                        <Card key={mission.code} className="bg-slate-800/50 border-purple-500/30 hover-elevate">
                          <CardContent className="p-4">
                            <div className="flex items-start gap-3">
                              <div className="w-12 h-12 bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-lg flex items-center justify-center flex-shrink-0">
                                <Award className="w-6 h-6 text-purple-400" />
                              </div>
                              <div className="flex-1 min-w-0">
                                <h5 className="text-white font-semibold mb-1 truncate">{mission.title}</h5>
                                <p className="text-gray-400 text-sm mb-2 line-clamp-2">{mission.description}</p>
                                <div className="flex flex-wrap items-center gap-2">
                                  <Badge variant="outline" className="text-xs">
                                    <Zap className="w-3 h-3 mr-1" />
                                    {mission.basePoints} PICs
                                  </Badge>
                                  <Badge variant="outline" className="text-xs">
                                    <Globe className="w-3 h-3 mr-1" />
                                    {mission.category}
                                  </Badge>
                                </div>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      ))
                    ) : (
                      <p className="text-gray-400">No active missions right now. Check back soon!</p>
                    )}
                  </div>
                </div>
              )}

              {selectedTab === "community" && (
                <div className="aspect-video bg-gradient-to-br from-emerald-900/20 to-cyan-900/20 p-6 overflow-y-auto">
                  <h4 className="text-white font-bold text-xl mb-4 flex items-center gap-2">
                    <Users className="w-6 h-6 text-emerald-400" />
                    Community Impact Stories
                  </h4>
                  <div className="space-y-4">
                    {/* Featured Community Story */}
                    <Card className="bg-slate-800/50 border-emerald-500/30 hover-elevate">
                      <CardContent className="p-4">
                        <div className="flex items-start gap-3 mb-3">
                          <div className="w-10 h-10 bg-gradient-to-br from-emerald-500 to-cyan-500 rounded-full flex items-center justify-center text-white font-bold">
                            AK
                          </div>
                          <div className="flex-1">
                            <h5 className="text-white font-semibold">Ahmed K.</h5>
                            <p className="text-gray-400 text-sm">Gold Hero • Dubai</p>
                          </div>
                          <Badge className="bg-emerald-500/20 text-emerald-400 border-emerald-500/50">
                            <TrendingUp className="w-3 h-3 mr-1" />
                            Featured
                          </Badge>
                        </div>
                        <p className="text-gray-300 text-sm mb-3">
                          "Prevented 1,247 plastic bottles this month through our office AquaCafe system. 
                          Our entire team switched to refillable bottles!"
                        </p>
                        <div className="flex items-center gap-4 text-sm">
                          <span className="text-emerald-400 flex items-center gap-1">
                            <Sparkles className="w-4 h-4" />
                            2,450 PICs earned
                          </span>
                          <span className="text-gray-500">2 hours ago</span>
                        </div>
                      </CardContent>
                    </Card>

                    {/* More Stories */}
                    <Card className="bg-slate-800/50 border-cyan-500/30 hover-elevate">
                      <CardContent className="p-4">
                        <div className="flex items-start gap-3 mb-3">
                          <div className="w-10 h-10 bg-gradient-to-br from-cyan-500 to-blue-500 rounded-full flex items-center justify-center text-white font-bold">
                            SM
                          </div>
                          <div className="flex-1">
                            <h5 className="text-white font-semibold">Sarah M.</h5>
                            <p className="text-gray-400 text-sm">Silver Hero • Abu Dhabi</p>
                          </div>
                        </div>
                        <p className="text-gray-300 text-sm mb-3">
                          "Traded in my old iPhone and got an amazing AquaCafe filter system. 
                          Now my family drinks pure water and we're saving money!"
                        </p>
                        <div className="flex items-center gap-4 text-sm">
                          <span className="text-cyan-400 flex items-center gap-1">
                            <Sparkles className="w-4 h-4" />
                            1,800 PICs earned
                          </span>
                          <span className="text-gray-500">5 hours ago</span>
                        </div>
                      </CardContent>
                    </Card>

                    {/* Call to Action */}
                    <div className="text-center pt-4">
                      <p className="text-gray-400 text-sm mb-3">Want to share your impact story?</p>
                      <Button variant="outline" className="border-emerald-500/50 text-emerald-400 hover-elevate">
                        <Play className="w-4 h-4 mr-2" />
                        Submit Your Video
                      </Button>
                    </div>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Sidebar - Featured Content */}
        <div className="space-y-4">
          {/* Sponsor Spotlight */}
          <Card className="bg-gradient-to-br from-amber-900/20 to-orange-900/20 border-amber-500/30">
            <CardContent className="p-4">
              <div className="flex items-center gap-2 mb-3">
                <Sparkles className="w-5 h-5 text-amber-400" />
                <h4 className="text-white font-bold">Sponsor Spotlight</h4>
              </div>
              <p className="text-gray-300 text-sm mb-3">
                Support sustainability initiatives and get recognized as a Planet Champion
              </p>
              <Button className="w-full bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600">
                <Award className="w-4 h-4 mr-2" />
                Become a Sponsor
              </Button>
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <Card className="bg-gradient-to-br from-blue-900/20 to-cyan-900/20 border-blue-500/30">
            <CardContent className="p-4">
              <h4 className="text-white font-bold mb-3">Quick Actions</h4>
              <div className="space-y-2">
                <Button variant="outline" className="w-full justify-start" data-testid="button-start-mission">
                  <Target className="w-4 h-4 mr-2" />
                  Start a Mission
                </Button>
                <Button variant="outline" className="w-full justify-start" data-testid="button-join-challenge">
                  <Users className="w-4 h-4 mr-2" />
                  Join Challenge
                </Button>
                <Button variant="outline" className="w-full justify-start" data-testid="button-view-channel">
                  <ExternalLink className="w-4 h-4 mr-2" />
                  View Full Channel
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Live Leaderboard Preview */}
          <Card className="bg-gradient-to-br from-purple-900/20 to-pink-900/20 border-purple-500/30">
            <CardContent className="p-4">
              <div className="flex items-center justify-between mb-3">
                <h4 className="text-white font-bold">Top Heroes Today</h4>
                <Badge variant="outline" className="text-xs">
                  <TrendingUp className="w-3 h-3 mr-1" />
                  Live
                </Badge>
              </div>
              <div className="space-y-2">
                {[
                  { name: "Ahmed K.", points: "2.4K", rank: 1 },
                  { name: "Sarah M.", points: "1.8K", rank: 2 },
                  { name: "Mohammed A.", points: "1.5K", rank: 3 },
                ].map((hero) => (
                  <div key={hero.rank} className="flex items-center gap-3 p-2 rounded-lg bg-slate-800/50">
                    <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${
                      hero.rank === 1 ? "bg-yellow-500 text-black" :
                      hero.rank === 2 ? "bg-gray-400 text-black" :
                      "bg-amber-700 text-white"
                    }`}>
                      {hero.rank}
                    </div>
                    <div className="flex-1">
                      <div className="text-white text-sm font-semibold">{hero.name}</div>
                    </div>
                    <div className="text-purple-400 text-sm font-bold">{hero.points}</div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
