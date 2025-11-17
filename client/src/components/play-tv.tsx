import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Play, 
  Tv, 
  TrendingUp, 
  Users, 
  Upload,
  Sparkles,
  Youtube,
  Video
} from "lucide-react";

interface PlayTVProps {
  className?: string;
}

export function PlayTV({ className = "" }: PlayTVProps) {
  const [selectedTab, setSelectedTab] = useState<"live" | "ugc" | "community">("live");

  // YouTube channel for @vdeliwer
  const YOUTUBE_CHANNEL_URL = "https://www.youtube.com/@vdeliwer";
  
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
          variant={selectedTab === "ugc" ? "default" : "outline"}
          onClick={() => setSelectedTab("ugc")}
          className="toggle-elevate"
          data-testid="tab-ugc"
        >
          <Video className="w-4 h-4 mr-2" />
          Featured Videos
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
      <div className="grid lg:grid-cols-1 gap-6">
        {/* Main Video Player */}
        <div>
          <Card className="bg-gradient-to-br from-slate-900/90 to-slate-800/90 border-purple-500/30 overflow-hidden">
            <CardContent className="p-0">
              {selectedTab === "live" && (
                <div className="aspect-video bg-slate-950 relative group">
                  {/* YouTube Channel - Simplified for Mobile */}
                  <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-purple-900/40 via-slate-900 to-blue-900/40 p-4">
                    <div className="text-center max-w-lg w-full">
                      <div className="mb-4 relative">
                        <div className="absolute inset-0 bg-red-500/20 blur-3xl rounded-full"></div>
                        <Youtube className="w-16 h-16 md:w-20 md:h-20 mx-auto text-red-500 relative z-10" />
                      </div>
                      <h4 className="text-white font-bold text-xl md:text-2xl mb-2">DeliWer Sustainability Channel</h4>
                      <p className="text-gray-300 mb-4 text-sm md:text-base">
                        Watch sustainability impact stories and community missions
                      </p>
                      <div className="flex flex-col gap-3 max-w-sm mx-auto">
                        <a
                          href={YOUTUBE_CHANNEL_URL}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center justify-center gap-2 bg-red-600 hover:bg-red-700 text-white px-6 py-3 md:px-8 md:py-4 rounded-lg transition-colors font-semibold shadow-lg shadow-red-500/30"
                          data-testid="button-visit-youtube"
                        >
                          <Youtube className="w-5 h-5" />
                          Watch on YouTube
                        </a>
                        <a
                          href={`${YOUTUBE_CHANNEL_URL}?sub_confirmation=1`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center justify-center gap-2 bg-slate-700 hover:bg-slate-600 text-white px-6 py-3 md:px-8 md:py-4 rounded-lg transition-colors font-semibold border border-slate-600"
                          data-testid="button-subscribe-youtube"
                        >
                          <Sparkles className="w-5 h-5" />
                          Subscribe
                        </a>
                      </div>
                      <p className="text-gray-500 text-xs mt-3">@vdeliwer</p>
                    </div>
                  </div>
                </div>
              )}

              {selectedTab === "ugc" && (
                <div className="aspect-video bg-gradient-to-br from-purple-900/20 to-blue-900/20 p-4 md:p-6 overflow-y-auto">
                  <div className="flex items-center justify-between mb-4">
                    <h4 className="text-white font-bold text-lg md:text-xl flex items-center gap-2">
                      <Video className="w-5 h-5 md:w-6 md:h-6 text-purple-400" />
                      Featured Impact Videos
                    </h4>
                    <Button size="sm" variant="outline" className="border-purple-500/50 text-purple-400" data-testid="button-upload-video">
                      <Upload className="w-4 h-4 mr-1" />
                      Upload
                    </Button>
                  </div>
                  
                  <div className="space-y-3">
                    {/* Featured Video 1 */}
                    <Card className="bg-slate-800/50 border-purple-500/30 hover-elevate">
                      <CardContent className="p-3 md:p-4">
                        <div className="flex gap-3">
                          <div className="w-20 h-20 md:w-24 md:h-24 bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-lg flex items-center justify-center flex-shrink-0">
                            <Play className="w-8 h-8 text-purple-400" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <h5 className="text-white font-semibold mb-1 text-sm md:text-base">Dubai Marina Water Cleanup</h5>
                            <p className="text-gray-400 text-xs md:text-sm mb-2 line-clamp-2">
                              Community heroes removed 500+ plastic bottles from the marina
                            </p>
                            <div className="flex flex-wrap items-center gap-2">
                              <Badge variant="outline" className="text-xs">
                                <Users className="w-3 h-3 mr-1" />
                                142 views
                              </Badge>
                              <Badge variant="outline" className="text-xs">
                                <TrendingUp className="w-3 h-3 mr-1" />
                                Trending
                              </Badge>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>

                    {/* Featured Video 2 */}
                    <Card className="bg-slate-800/50 border-pink-500/30 hover-elevate">
                      <CardContent className="p-3 md:p-4">
                        <div className="flex gap-3">
                          <div className="w-20 h-20 md:w-24 md:h-24 bg-gradient-to-br from-pink-500/20 to-purple-500/20 rounded-lg flex items-center justify-center flex-shrink-0">
                            <Play className="w-8 h-8 text-pink-400" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <h5 className="text-white font-semibold mb-1 text-sm md:text-base">iPhone Trade-In Success Story</h5>
                            <p className="text-gray-400 text-xs md:text-sm mb-2 line-clamp-2">
                              How Sarah got an AquaCafe system through iPhone trade-in program
                            </p>
                            <div className="flex flex-wrap items-center gap-2">
                              <Badge variant="outline" className="text-xs">
                                <Users className="w-3 h-3 mr-1" />
                                89 views
                              </Badge>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>

                    {/* Upload CTA */}
                    <div className="text-center pt-2">
                      <p className="text-gray-400 text-xs md:text-sm mb-2">Share your sustainability journey</p>
                      <Button size="sm" variant="outline" className="border-emerald-500/50 text-emerald-400 hover-elevate">
                        <Upload className="w-4 h-4 mr-2" />
                        Submit Your Video
                      </Button>
                    </div>
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

      </div>
    </div>
  );
}
