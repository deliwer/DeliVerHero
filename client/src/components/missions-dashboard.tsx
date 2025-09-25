import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { Skeleton } from "@/components/ui/skeleton";
import { 
  Trophy, 
  Target, 
  MapPin, 
  Clock, 
  Users, 
  Star, 
  Droplets, 
  Zap, 
  Smartphone,
  Building,
  Coffee,
  Camera,
  Utensils,
  Ticket,
  Gift,
  Crown,
  Sparkles,
  Rocket,
  Shield,
  Heart,
  CheckCircle,
  Play,
  ArrowRight,
  Globe,
  TrendingUp,
  Award,
  Eye,
  Share2,
  QrCode,
  Upload,
  MessageCircle
} from "lucide-react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";

interface Mission {
  id: string;
  code: string;
  title: string;
  description: string;
  category: string;
  missionType: string;
  pointsReward: number;
  xpReward: number;
  difficulty: string;
  estimatedDuration: number;
  maxCompletions: number;
  isRepeatable: boolean;
  isEpic: boolean;
  cityId: string | null;
  sponsorId: string | null;
  steps: any[];
  isActive: boolean;
  expiresAt: string | null;
  createdAt: string;
}

interface MissionProgress {
  id: string;
  heroId: string;
  missionCode: string;
  missionInstanceId: string;
  status: string;
  currentStep: number;
  totalSteps: number;
  pointsEarned: number;
  xpEarned: number;
  completedAt: string | null;
  payload: any;
  createdAt: string;
}

const missionTypeIcons = {
  water: Droplets,
  energy: Zap,
  waste: Trophy,
  mobility: Building,
  community: Users,
  trade: Smartphone,
};

const getMissionTypeColor = (type: string) => {
  const colors = {
    water: "bg-blue-500",
    energy: "bg-yellow-500",
    waste: "bg-green-500", 
    mobility: "bg-purple-500",
    community: "bg-pink-500",
    trade: "bg-orange-500",
  };
  return colors[type as keyof typeof colors] || "bg-gray-500";
};

const getDifficultyColor = (difficulty: string) => {
  const colors = {
    easy: "bg-green-100 text-green-800",
    medium: "bg-yellow-100 text-yellow-800",
    hard: "bg-red-100 text-red-800",
    epic: "bg-purple-100 text-purple-800",
  };
  return colors[difficulty as keyof typeof colors] || "bg-gray-100 text-gray-800";
};

export function MissionsDashboard() {
  const [selectedTab, setSelectedTab] = useState("available");
  const [selectedMission, setSelectedMission] = useState<Mission | null>(null);
  const { toast } = useToast();
  const queryClient = useQueryClient();

  // Mock hero ID - in real app this would come from auth context
  const heroId = "founder-1";

  // Fetch available missions
  const { data: missions = [], isLoading: missionsLoading } = useQuery<Mission[]>({
    queryKey: ['/api/metaverse/missions'],
  });

  // Fetch hero's mission progress
  const { data: heroMissions = [], isLoading: progressLoading } = useQuery<MissionProgress[]>({
    queryKey: ['/api/metaverse/heroes', heroId, 'missions'],
  });

  // Accept mission mutation
  const acceptMissionMutation = useMutation({
    mutationFn: async (missionCode: string) => {
      return apiRequest(`/api/metaverse/heroes/${heroId}/missions/accept`, 'POST', {
        missionCode,
        heroId
      });
    },
    onSuccess: () => {
      toast({
        title: "Mission Accepted!",
        description: "You've successfully joined this mission. Start making impact!",
      });
      queryClient.invalidateQueries({ queryKey: ['/api/metaverse/heroes', heroId, 'missions'] });
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to accept mission. Please try again.",
        variant: "destructive",
      });
    },
  });

  // Submit mission activity mutation
  const submitActivityMutation = useMutation({
    mutationFn: async ({ missionCode, activityData }: { missionCode: string; activityData: any }) => {
      return apiRequest(`/api/metaverse/missions/${missionCode}/submit-activity`, 'POST', {
        heroId,
        ...activityData
      });
    },
    onSuccess: () => {
      toast({
        title: "Activity Submitted!",
        description: "Your mission activity has been submitted for verification.",
      });
      queryClient.invalidateQueries({ queryKey: ['/api/metaverse/heroes', heroId, 'missions'] });
    },
  });

  const handleAcceptMission = (missionCode: string) => {
    acceptMissionMutation.mutate(missionCode);
  };

  const handleSubmitActivity = (missionCode: string, activityType: string) => {
    const activityData = {
      submissionType: activityType,
      proofData: {
        description: `Submitted ${activityType} for mission verification`,
        photoUrls: [],
        documentation: `${activityType} submission`
      },
      locationData: null,
      metadata: {
        activityType,
        timestamp: new Date().toISOString()
      }
    };
    submitActivityMutation.mutate({ missionCode, activityData });
  };

  const filteredMissions = missions.filter(mission => {
    if (selectedTab === "available") {
      return !heroMissions.some(hm => hm.missionCode === mission.code && hm.status !== "completed");
    } else if (selectedTab === "active") {
      return heroMissions.some(hm => hm.missionCode === mission.code && hm.status === "active");
    } else if (selectedTab === "completed") {
      return heroMissions.some(hm => hm.missionCode === mission.code && hm.status === "completed");
    }
    return true;
  });

  const activeMissions = heroMissions.filter(hm => hm.status === "active");
  const completedMissions = heroMissions.filter(hm => hm.status === "completed");

  return (
    <div className="w-full max-w-7xl mx-auto p-6 space-y-8">
      {/* Header Section */}
      <div className="text-center space-y-4">
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center justify-center gap-3"
        >
          <Target className="w-10 h-10 text-blue-600" />
          <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-cyan-600 bg-clip-text text-transparent">
            Planet Hero Missions
          </h1>
          <Rocket className="w-10 h-10 text-purple-600" />
        </motion.div>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Join the metaverse sustainability revolution! Complete real-world missions to earn Planet Points, unlock exclusive rewards, and make a lasting impact on our planet.
        </p>
        
        {/* Mission Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-2xl mx-auto mt-6">
          <Card className="bg-gradient-to-br from-blue-50 to-cyan-50 border-blue-200">
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-blue-600">{activeMissions.length}</div>
              <div className="text-sm text-gray-600">Active Missions</div>
            </CardContent>
          </Card>
          <Card className="bg-gradient-to-br from-green-50 to-emerald-50 border-green-200">
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-green-600">{completedMissions.length}</div>
              <div className="text-sm text-gray-600">Completed</div>
            </CardContent>
          </Card>
          <Card className="bg-gradient-to-br from-purple-50 to-pink-50 border-purple-200">
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-purple-600">
                {completedMissions.reduce((sum, hm) => sum + hm.pointsEarned, 0)}
              </div>
              <div className="text-sm text-gray-600">Points Earned</div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Mission Tabs */}
      <Tabs value={selectedTab} onValueChange={setSelectedTab} className="w-full">
        <TabsList className="grid w-full grid-cols-4 mb-6">
          <TabsTrigger value="available" className="flex items-center gap-2">
            <Globe className="w-4 h-4" />
            Available
          </TabsTrigger>
          <TabsTrigger value="active" className="flex items-center gap-2">
            <Play className="w-4 h-4" />
            Active ({activeMissions.length})
          </TabsTrigger>
          <TabsTrigger value="completed" className="flex items-center gap-2">
            <Trophy className="w-4 h-4" />
            Completed ({completedMissions.length})
          </TabsTrigger>
          <TabsTrigger value="epic" className="flex items-center gap-2">
            <Crown className="w-4 h-4" />
            Epic Missions
          </TabsTrigger>
        </TabsList>

        {/* Available Missions */}
        <TabsContent value="available" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {missionsLoading ? (
              Array.from({ length: 6 }).map((_, i) => (
                <Card key={i} className="p-6">
                  <Skeleton className="h-6 w-3/4 mb-3" />
                  <Skeleton className="h-4 w-full mb-2" />
                  <Skeleton className="h-4 w-2/3 mb-4" />
                  <Skeleton className="h-10 w-full" />
                </Card>
              ))
            ) : (
              filteredMissions.map((mission) => {
                const Icon = missionTypeIcons[mission.missionType as keyof typeof missionTypeIcons] || Target;
                return (
                  <motion.div
                    key={mission.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    whileHover={{ y: -5 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Card className="h-full hover:shadow-xl transition-all duration-300 border-2 hover:border-blue-300">
                      <CardHeader className="pb-3">
                        <div className="flex items-start justify-between">
                          <div className="flex items-center gap-3">
                            <div className={`p-2 rounded-lg ${getMissionTypeColor(mission.missionType)}`}>
                              <Icon className="w-5 h-5 text-white" />
                            </div>
                            <div>
                              <CardTitle className="text-lg line-clamp-2">{mission.title}</CardTitle>
                              <Badge className={getDifficultyColor(mission.difficulty)}>
                                {mission.difficulty}
                              </Badge>
                            </div>
                          </div>
                          {mission.isEpic && (
                            <Crown className="w-6 h-6 text-yellow-500" />
                          )}
                        </div>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <p className="text-gray-600 text-sm line-clamp-3">{mission.description}</p>
                        
                        <div className="flex items-center gap-4 text-sm text-gray-500">
                          <div className="flex items-center gap-1">
                            <Clock className="w-4 h-4" />
                            {mission.estimatedDuration}min
                          </div>
                          <div className="flex items-center gap-1">
                            <Star className="w-4 h-4" />
                            {mission.pointsReward} PP
                          </div>
                        </div>

                        {mission.steps && mission.steps.length > 0 && (
                          <div className="text-sm">
                            <div className="font-medium text-gray-700 mb-1">Mission Steps:</div>
                            <div className="text-gray-600">{mission.steps.length} steps to complete</div>
                          </div>
                        )}

                        <Button 
                          onClick={() => handleAcceptMission(mission.code)}
                          disabled={acceptMissionMutation.isPending}
                          className="w-full bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600"
                        >
                          {acceptMissionMutation.isPending ? (
                            "Accepting..."
                          ) : (
                            <>
                              <Rocket className="w-4 h-4 mr-2" />
                              Accept Mission
                            </>
                          )}
                        </Button>
                      </CardContent>
                    </Card>
                  </motion.div>
                );
              })
            )}
          </div>
        </TabsContent>

        {/* Active Missions */}
        <TabsContent value="active" className="space-y-6">
          {activeMissions.length === 0 ? (
            <Card className="p-12 text-center">
              <Target className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-600 mb-2">No Active Missions</h3>
              <p className="text-gray-500 mb-4">Start a new mission to begin your sustainability journey!</p>
              <Button onClick={() => setSelectedTab("available")}>
                Explore Available Missions
              </Button>
            </Card>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {activeMissions.map((progress) => {
                const mission = missions.find(m => m.code === progress.missionCode);
                if (!mission) return null;
                
                const Icon = missionTypeIcons[mission.missionType as keyof typeof missionTypeIcons] || Target;
                const progressPercentage = (progress.currentStep / progress.totalSteps) * 100;
                
                return (
                  <Card key={progress.id} className="border-2 border-blue-200">
                    <CardHeader>
                      <div className="flex items-center gap-3">
                        <div className={`p-2 rounded-lg ${getMissionTypeColor(mission.missionType)}`}>
                          <Icon className="w-5 h-5 text-white" />
                        </div>
                        <div className="flex-1">
                          <CardTitle className="text-lg">{mission.title}</CardTitle>
                          <div className="flex items-center gap-2 mt-1">
                            <Badge className={getDifficultyColor(mission.difficulty)}>
                              {mission.difficulty}
                            </Badge>
                            <Badge variant="outline">
                              Step {progress.currentStep} of {progress.totalSteps}
                            </Badge>
                          </div>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>Progress</span>
                          <span>{Math.round(progressPercentage)}%</span>
                        </div>
                        <Progress value={progressPercentage} className="h-2" />
                      </div>
                      
                      <p className="text-gray-600 text-sm">{mission.description}</p>
                      
                      <div className="flex gap-2">
                        <Button 
                          size="sm" 
                          variant="outline"
                          onClick={() => handleSubmitActivity(mission.code, "photo_upload")}
                          disabled={submitActivityMutation.isPending}
                        >
                          <Camera className="w-4 h-4 mr-1" />
                          Photo
                        </Button>
                        <Button 
                          size="sm" 
                          variant="outline"
                          onClick={() => handleSubmitActivity(mission.code, "qr_scan")}
                          disabled={submitActivityMutation.isPending}
                        >
                          <QrCode className="w-4 h-4 mr-1" />
                          QR Scan
                        </Button>
                        <Button 
                          size="sm" 
                          variant="outline"
                          onClick={() => handleSubmitActivity(mission.code, "manual_entry")}
                          disabled={submitActivityMutation.isPending}
                        >
                          <Upload className="w-4 h-4 mr-1" />
                          Submit
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          )}
        </TabsContent>

        {/* Completed Missions */}
        <TabsContent value="completed" className="space-y-6">
          {completedMissions.length === 0 ? (
            <Card className="p-12 text-center">
              <Trophy className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-600 mb-2">No Completed Missions</h3>
              <p className="text-gray-500">Complete your first mission to see it here!</p>
            </Card>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {completedMissions.map((progress) => {
                const mission = missions.find(m => m.code === progress.missionCode);
                if (!mission) return null;
                
                const Icon = missionTypeIcons[mission.missionType as keyof typeof missionTypeIcons] || Target;
                
                return (
                  <Card key={progress.id} className="border-2 border-green-200 bg-green-50/30">
                    <CardHeader className="pb-3">
                      <div className="flex items-center gap-3">
                        <div className="p-2 rounded-lg bg-green-500">
                          <Icon className="w-5 h-5 text-white" />
                        </div>
                        <div className="flex-1">
                          <CardTitle className="text-lg">{mission.title}</CardTitle>
                          <div className="flex items-center gap-2 mt-1">
                            <CheckCircle className="w-4 h-4 text-green-600" />
                            <span className="text-sm text-green-600 font-medium">Completed</span>
                          </div>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-600">Points Earned:</span>
                          <span className="font-semibold text-green-600">+{progress.pointsEarned} PP</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-600">XP Earned:</span>
                          <span className="font-semibold text-blue-600">+{progress.xpEarned} XP</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-600">Completed:</span>
                          <span className="text-gray-500">
                            {progress.completedAt ? new Date(progress.completedAt).toLocaleDateString() : 'N/A'}
                          </span>
                        </div>
                        
                        {mission.isRepeatable && (
                          <Button 
                            size="sm" 
                            variant="outline" 
                            className="w-full mt-3"
                            onClick={() => handleAcceptMission(mission.code)}
                          >
                            <ArrowRight className="w-4 h-4 mr-2" />
                            Do Again
                          </Button>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          )}
        </TabsContent>

        {/* Epic Missions */}
        <TabsContent value="epic" className="space-y-6">
          <div className="text-center mb-8">
            <Crown className="w-16 h-16 text-yellow-500 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-gray-800 mb-2">Epic Missions</h2>
            <p className="text-gray-600">Legendary challenges with extraordinary rewards for elite Planet Heroes</p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {missions.filter(m => m.isEpic).map((mission) => {
              const Icon = missionTypeIcons[mission.missionType as keyof typeof missionTypeIcons] || Target;
              const isAccepted = heroMissions.some(hm => hm.missionCode === mission.code);
              
              return (
                <Card key={mission.id} className="border-2 border-yellow-300 bg-gradient-to-br from-yellow-50 to-amber-50">
                  <CardHeader>
                    <div className="flex items-center gap-3">
                      <div className="p-3 rounded-lg bg-gradient-to-r from-yellow-500 to-amber-500">
                        <Icon className="w-6 h-6 text-white" />
                      </div>
                      <div className="flex-1">
                        <CardTitle className="text-xl flex items-center gap-2">
                          {mission.title}
                          <Crown className="w-5 h-5 text-yellow-500" />
                        </CardTitle>
                        <Badge className="bg-yellow-500 text-white">Epic Mission</Badge>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <p className="text-gray-700">{mission.description}</p>
                    
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div className="flex items-center gap-2">
                        <Star className="w-4 h-4 text-yellow-500" />
                        <span><strong>{mission.pointsReward}</strong> Planet Points</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Sparkles className="w-4 h-4 text-purple-500" />
                        <span><strong>{mission.xpReward}</strong> XP</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Clock className="w-4 h-4 text-blue-500" />
                        <span>{mission.estimatedDuration} minutes</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Target className="w-4 h-4 text-green-500" />
                        <span>{mission.steps?.length || 0} steps</span>
                      </div>
                    </div>
                    
                    {!isAccepted && (
                      <Button 
                        onClick={() => handleAcceptMission(mission.code)}
                        disabled={acceptMissionMutation.isPending}
                        className="w-full bg-gradient-to-r from-yellow-500 to-amber-500 hover:from-yellow-600 hover:to-amber-600 text-white font-bold"
                      >
                        <Crown className="w-4 h-4 mr-2" />
                        Accept Epic Mission
                      </Button>
                    )}
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}