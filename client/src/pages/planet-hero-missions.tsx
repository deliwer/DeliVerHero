import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useQuery, useMutation } from "@tanstack/react-query";
import { useToast } from "@/hooks/use-toast";
import { queryClient, apiRequest } from "@/lib/queryClient";
import { 
  Trophy, 
  Droplets, 
  Zap, 
  Recycle, 
  Globe, 
  Filter,
  CheckCircle,
  Clock,
  Award,
  Leaf,
  TrendingUp
} from "lucide-react";
import { SEOMeta } from "@/components/seo-meta";
import type { PlanetMission } from "@shared/schema";

const categoryIcons = {
  water: Droplets,
  energy: Zap,
  trade: Recycle,
  planet_saving: Globe,
  waste: Recycle,
  mobility: TrendingUp,
  community: Award,
};

const difficultyColors = {
  beginner: "bg-green-500/20 text-green-400 border-green-500/50",
  intermediate: "bg-blue-500/20 text-blue-400 border-blue-500/50",
  expert: "bg-purple-500/20 text-purple-400 border-purple-500/50",
  legendary: "bg-amber-500/20 text-amber-400 border-amber-500/50",
};

export default function PlanetHeroMissions() {
  const { toast } = useToast();
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  
  const { data: missions, isLoading } = useQuery<PlanetMission[]>({
    queryKey: ['/api/metaverse/missions'],
  });

  const acceptMissionMutation = useMutation({
    mutationFn: async (missionCode: string) => {
      // Note: This would need a heroId in a real implementation
      const response = await fetch('/api/metaverse/heroes/founder-1/missions/accept', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ missionCode }),
      });
      if (!response.ok) throw new Error('Failed to accept mission');
      return response.json();
    },
    onSuccess: () => {
      toast({
        title: "Mission Accepted!",
        description: "Check your dashboard to start completing this mission.",
      });
      queryClient.invalidateQueries({ queryKey: ['/api/metaverse/missions'] });
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to accept mission. Please try again.",
        variant: "destructive",
      });
    },
  });

  const filteredMissions = missions?.filter(m => {
    if (!m.isActive) return false;
    if (selectedCategory === "all") return true;
    return m.category === selectedCategory || m.missionType === selectedCategory;
  }) || [];

  const categories = [
    { value: "all", label: "All Missions", icon: Trophy },
    { value: "water", label: "Water", icon: Droplets },
    { value: "energy", label: "Energy", icon: Zap },
    { value: "trade", label: "Trade-In", icon: Recycle },
    { value: "planet_saving", label: "Planet Saving", icon: Globe },
  ];

  return (
    <div className="min-h-screen bg-dubai-gradient">
      <SEOMeta 
        title="Planet Hero Missions - Earn & Impact"
        description="Browse and complete Planet Hero missions. Earn rewards while making a positive environmental impact in Dubai."
      />

      {/* Header */}
      <section className="py-12 px-4 bg-gradient-to-br from-hero-green-900/30 to-dubai-blue-900/30">
        <div className="max-w-6xl mx-auto text-center">
          <Badge className="mb-6 bg-hero-green-500/20 text-hero-green-400 border-hero-green-500/50 px-6 py-2 text-lg" data-testid="badge-missions">
            <Trophy className="w-5 h-5 mr-2 inline" />
            Active Missions
          </Badge>
          
          <h1 className="text-5xl md:text-6xl font-black text-white mb-6">
            Planet Hero Missions
            <span className="block text-hero-green-400 mt-2">Earn & Impact</span>
          </h1>
          
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Complete sustainable missions, earn Planet Points, and make a real difference in Dubai's environmental future.
          </p>
        </div>
      </section>

      {/* Category Filter */}
      <section className="py-8 px-4 sticky top-0 z-20 bg-slate-900/95 backdrop-blur-lg border-b border-slate-700">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center gap-4 overflow-x-auto pb-2">
            <Filter className="w-5 h-5 text-gray-400 flex-shrink-0" />
            <div className="flex gap-2">
              {categories.map(({ value, label, icon: Icon }) => (
                <Button
                  key={value}
                  onClick={() => setSelectedCategory(value)}
                  variant={selectedCategory === value ? "default" : "outline"}
                  className={`flex-shrink-0 ${
                    selectedCategory === value
                      ? "bg-hero-green-500 hover:bg-hero-green-600 text-white"
                      : "border-slate-600 text-gray-400 hover:bg-slate-700"
                  }`}
                  data-testid={`filter-${value}`}
                >
                  <Icon className="w-4 h-4 mr-2" />
                  {label}
                </Button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Missions Grid */}
      <section className="py-12 px-4">
        <div className="max-w-6xl mx-auto">
          {isLoading ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1, 2, 3, 4, 5, 6].map(i => (
                <Card key={i} className="glass border-slate-600 animate-pulse">
                  <CardHeader className="h-32 bg-slate-700/50"></CardHeader>
                  <CardContent className="space-y-3">
                    <div className="h-4 bg-slate-700/50 rounded"></div>
                    <div className="h-4 bg-slate-700/50 rounded w-2/3"></div>
                    <div className="h-10 bg-slate-700/50 rounded"></div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : filteredMissions.length === 0 ? (
            <Card className="glass border-slate-600">
              <CardContent className="text-center py-16">
                <Trophy className="w-20 h-20 text-gray-500 mx-auto mb-4" />
                <h3 className="text-2xl font-bold text-white mb-2">No Missions Available</h3>
                <p className="text-gray-400 mb-6">
                  {selectedCategory === "all" 
                    ? "Check back soon for new missions!" 
                    : "Try selecting a different category"}
                </p>
                <Button 
                  onClick={() => setSelectedCategory("all")}
                  className="bg-hero-green-500 hover:bg-hero-green-600"
                  data-testid="button-show-all"
                >
                  Show All Missions
                </Button>
              </CardContent>
            </Card>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredMissions.map((mission) => {
                const CategoryIcon = categoryIcons[mission.category as keyof typeof categoryIcons] || Trophy;
                const difficultyClass = difficultyColors[mission.difficulty as keyof typeof difficultyColors] || difficultyColors.beginner;
                
                return (
                  <Card 
                    key={mission.id}
                    className={`glass border-slate-600 hover:shadow-xl hover:shadow-hero-green-500/20 transition-all group ${
                      mission.isEpic ? "border-amber-500/50 bg-gradient-to-br from-amber-900/10 to-orange-900/10" : ""
                    }`}
                    data-testid={`card-mission-${mission.code}`}
                  >
                    <CardHeader>
                      <div className="flex items-start justify-between mb-3">
                        <CategoryIcon className="w-8 h-8 text-hero-green-500" />
                        {mission.isEpic && (
                          <Badge className="bg-amber-500/20 text-amber-400 border-amber-500/50">
                            EPIC
                          </Badge>
                        )}
                      </div>
                      
                      <CardTitle className="text-white text-xl group-hover:text-hero-green-400 transition-colors">
                        {mission.title}
                      </CardTitle>
                      
                      <div className="flex items-center gap-2 mt-2">
                        <Badge className={difficultyClass} data-testid={`badge-difficulty-${mission.code}`}>
                          {mission.difficulty}
                        </Badge>
                        <Badge variant="outline" className="border-slate-600 text-gray-400">
                          {mission.category}
                        </Badge>
                      </div>
                    </CardHeader>
                    
                    <CardContent className="space-y-4">
                      <p className="text-gray-300 text-sm line-clamp-3" data-testid={`text-description-${mission.code}`}>
                        {mission.description}
                      </p>
                      
                      {/* Rewards */}
                      <div className="flex items-center justify-between p-3 rounded-lg bg-hero-green-500/10 border border-hero-green-500/30">
                        <div className="flex items-center gap-2">
                          <Award className="w-5 h-5 text-hero-green-400" />
                          <span className="text-hero-green-400 font-bold" data-testid={`text-points-${mission.code}`}>
                            +{mission.basePoints || 0} Points
                          </span>
                        </div>
                        <div className="flex items-center gap-2 text-emerald-400 text-sm">
                          <Clock className="w-4 h-4" />
                          <span>{mission.estimatedDuration || '5 minutes'}</span>
                        </div>
                      </div>
                      
                      {/* Environmental Impact */}
                      {mission.environmentalImpact && typeof mission.environmentalImpact === 'object' && Object.keys(mission.environmentalImpact).length > 0 && (
                        <div className="flex items-center gap-2 text-sm text-emerald-400" data-testid={`text-impact-${mission.code}`}>
                          <Leaf className="w-4 h-4" />
                          <span className="line-clamp-1">Impact Tracked</span>
                        </div>
                      )}
                      
                      {/* Accept Button */}
                      <Button 
                        onClick={() => acceptMissionMutation.mutate(mission.code)}
                        disabled={acceptMissionMutation.isPending}
                        className="w-full bg-gradient-to-r from-hero-green-500 to-emerald-600 hover:from-hero-green-600 hover:to-emerald-700 font-bold"
                        data-testid={`button-accept-${mission.code}`}
                      >
                        {acceptMissionMutation.isPending ? (
                          "Accepting..."
                        ) : (
                          <>
                            <CheckCircle className="w-4 h-4 mr-2" />
                            Accept Mission
                          </>
                        )}
                      </Button>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          )}
        </div>
      </section>

      {/* Stats Footer */}
      <section className="py-12 px-4 bg-gradient-to-br from-slate-900/50 to-slate-800/50">
        <div className="max-w-4xl mx-auto">
          <Card className="glass border-hero-green-500/30">
            <CardContent className="py-8">
              <div className="grid md:grid-cols-3 gap-6 text-center">
                <div>
                  <div className="text-4xl font-black text-hero-green-400 mb-2">
                    {filteredMissions.length}
                  </div>
                  <p className="text-gray-300">Available Missions</p>
                </div>
                <div>
                  <div className="text-4xl font-black text-dubai-blue-400 mb-2">
                    {filteredMissions.filter(m => m.isEpic).length}
                  </div>
                  <p className="text-gray-300">Epic Missions</p>
                </div>
                <div>
                  <div className="text-4xl font-black text-amber-400 mb-2">
                    {filteredMissions.reduce((sum, m) => sum + m.basePoints, 0)}
                  </div>
                  <p className="text-gray-300">Total Points Available</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
}
