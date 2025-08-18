import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { Skeleton } from "@/components/ui/skeleton";
import { 
  Trophy, 
  Gift, 
  MapPin, 
  Clock, 
  Users, 
  Star, 
  Droplets, 
  Zap, 
  AlertCircle,
  Building,
  Coffee,
  Camera,
  Utensils,
  Ticket
} from "lucide-react";
import { useDubaiChallenges, useDubaiRewards, useJoinChallenge, useClaimReward } from "@/hooks/use-dubai-rewards";
import { useToast } from "@/hooks/use-toast";

const categoryIcons = {
  water: Droplets,
  energy: Zap,
  transport: Building,
  waste: Trophy,
  voucher: Gift,
  experience: Star,
  product: Coffee,
  service: Utensils,
};

const getCategoryColor = (category: string) => {
  const colors = {
    water: "bg-blue-500",
    energy: "bg-yellow-500", 
    transport: "bg-green-500",
    waste: "bg-purple-500",
    voucher: "bg-orange-500",
    experience: "bg-pink-500",
    product: "bg-indigo-500",
    service: "bg-teal-500",
  };
  return colors[category as keyof typeof colors] || "bg-gray-500";
};

const formatTimeLeft = (expiresAt: string) => {
  const now = new Date().getTime();
  const expiry = new Date(expiresAt).getTime();
  const diff = expiry - now;
  
  if (diff <= 0) return "Expired";
  
  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  
  if (days > 0) return `${days}d ${hours}h`;
  return `${hours}h`;
};

const formatValue = (value: number) => {
  return `AED ${(value / 100).toFixed(2)}`;
};

export function DubaiRewardsSystem() {
  const [selectedTab, setSelectedTab] = useState("challenges");
  const { toast } = useToast();
  
  const { data: challenges, isLoading: challengesLoading, error: challengesError } = useDubaiChallenges();
  const { data: rewards, isLoading: rewardsLoading, error: rewardsError } = useDubaiRewards();
  const joinChallenge = useJoinChallenge();
  const claimReward = useClaimReward();

  // For demo purposes, using a mock hero ID
  const mockHeroId = "founder-1";

  const handleJoinChallenge = async (challengeId: string) => {
    try {
      await joinChallenge.mutateAsync({ challengeId, heroId: mockHeroId });
      toast({
        title: "Challenge Joined!",
        description: "You've successfully joined the challenge. Start working towards your goal!",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to join challenge. Please try again.",
        variant: "destructive",
      });
    }
  };

  const handleClaimReward = async (rewardId: string) => {
    try {
      await claimReward.mutateAsync({ rewardId, heroId: mockHeroId });
      toast({
        title: "Reward Claimed!",
        description: "Your reward has been successfully claimed and will be processed soon.",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to claim reward. Please check your points and try again.",
        variant: "destructive",
      });
    }
  };

  if (challengesError || rewardsError) {
    return (
      <div className="container mx-auto px-4 py-8">
        <Card className="border-red-200 bg-red-50">
          <CardContent className="flex items-center gap-2 pt-6">
            <AlertCircle className="h-5 w-5 text-red-600" />
            <p className="text-red-800">Unable to load Dubai rewards data. Please try again later.</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 space-y-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center space-y-6 mb-8"
      >
        <div className="bg-gradient-to-r from-hero-green-500/20 to-dubai-blue-500/20 border border-hero-green-500/30 rounded-2xl p-6">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            🏆 Dubai Sustainability Rewards
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-6">
            Exclusive challenges and rewards for Dubai's Planet Heroes. Complete local missions, earn points, and unlock amazing experiences across the city.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              onClick={() => setSelectedTab("challenges")}
              className="bg-hero-green-500 hover:bg-hero-green-600 text-white font-bold px-8 py-3 text-lg"
              data-testid="button-view-challenges"
            >
              View Dubai Challenges
            </Button>
            <Button 
              onClick={() => setSelectedTab("rewards")}
              variant="outline"
              className="border-white text-white hover:bg-white/10 font-bold px-8 py-3 text-lg"
              data-testid="button-view-rewards"
            >
              Browse Rewards
            </Button>
          </div>
        </div>
      </motion.div>

      {/* Tabs */}
      <Tabs value={selectedTab} onValueChange={setSelectedTab} className="w-full">
        <TabsList className="grid w-full grid-cols-2 bg-black/20 border-gray-700 p-1">
          <TabsTrigger 
            value="challenges" 
            className="flex items-center gap-2 text-white data-[state=active]:bg-hero-green-500 data-[state=active]:text-white"
          >
            <Trophy className="h-4 w-4" />
            Dubai Challenges
          </TabsTrigger>
          <TabsTrigger 
            value="rewards" 
            className="flex items-center gap-2 text-white data-[state=active]:bg-dubai-blue-500 data-[state=active]:text-white"
          >
            <Gift className="h-4 w-4" />
            Dubai Rewards
          </TabsTrigger>
        </TabsList>

        {/* Challenges Tab */}
        <TabsContent value="challenges" className="mt-6">
          <div className="grid gap-6 md:grid-cols-2">
            {challengesLoading ? (
              Array.from({ length: 4 }).map((_, i) => (
                <Card key={i} className="h-64">
                  <CardHeader>
                    <Skeleton className="h-6 w-3/4" />
                    <Skeleton className="h-4 w-1/2" />
                  </CardHeader>
                  <CardContent>
                    <Skeleton className="h-20 w-full" />
                  </CardContent>
                </Card>
              ))
            ) : challenges?.length ? (
              challenges.map((challenge) => {
                const Icon = categoryIcons[challenge.category as keyof typeof categoryIcons] || Trophy;
                const isNearCapacity = challenge.participantLimit && 
                  challenge.currentParticipants / challenge.participantLimit > 0.8;
                
                return (
                  <motion.div
                    key={challenge.id}
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    whileHover={{ scale: 1.02 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Card className="h-full hover:shadow-xl transition-all duration-300 bg-black/20 border-gray-700 border-l-4 border-l-hero-green-500">
                      <CardHeader className="pb-3">
                        <div className="flex items-start justify-between">
                          <div className="flex items-center gap-3">
                            <div className={`p-3 rounded-xl ${getCategoryColor(challenge.category)} text-white shadow-lg`}>
                              <Icon className="h-6 w-6" />
                            </div>
                            <div>
                              <CardTitle className="text-xl font-bold text-white mb-2">{challenge.title}</CardTitle>
                              <div className="flex items-center gap-2 mt-1">
                                {challenge.targetZone && (
                                  <Badge variant="outline" className="text-xs border-hero-green-500 text-hero-green-400">
                                    <MapPin className="h-3 w-3 mr-1" />
                                    {challenge.targetZone}
                                  </Badge>
                                )}
                                <Badge className="bg-hero-green-500/20 text-hero-green-400 border border-hero-green-500">
                                  +{challenge.pointsReward} pts
                                </Badge>
                              </div>
                            </div>
                          </div>
                        </div>
                      </CardHeader>

                      <CardContent className="space-y-4">
                        <p className="text-gray-300 text-base leading-relaxed">{challenge.description}</p>
                        
                        <div className="bg-hero-green-500/10 border border-hero-green-500/30 p-4 rounded-lg">
                          <div className="text-hero-green-400 font-bold text-lg mb-1">
                            🎁 Reward: {challenge.rewardItem}
                          </div>
                        </div>
                        
                        <div className="flex items-center justify-between text-sm text-gray-400">
                          <div className="flex items-center gap-1">
                            <Clock className="h-4 w-4 text-dubai-blue-500" />
                            <span className="text-white font-medium">{formatTimeLeft(challenge.expiresAt.toString())}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Users className="h-4 w-4 text-purple-500" />
                            <span className="text-white font-medium">
                              {challenge.currentParticipants}
                              {challenge.participantLimit && `/${challenge.participantLimit}`}
                            </span>
                          </div>
                        </div>

                        {challenge.participantLimit && (
                          <div className="space-y-2">
                            <Progress 
                              value={(challenge.currentParticipants / challenge.participantLimit) * 100} 
                              className="h-3 bg-gray-700"
                            />
                            {isNearCapacity && (
                              <p className="text-xs text-amber-400 font-bold bg-amber-500/20 border border-amber-500/30 p-2 rounded">
                                ⚡ Almost full! Join now to secure your spot
                              </p>
                            )}
                          </div>
                        )}

                        <Button 
                          onClick={() => handleJoinChallenge(challenge.id)}
                          disabled={joinChallenge.isPending}
                          className="w-full bg-gradient-to-r from-hero-green-500 to-emerald-600 hover:from-hero-green-600 hover:to-emerald-700 text-white font-bold py-3 text-lg"
                          data-testid={`button-join-challenge-${challenge.id}`}
                        >
                          {joinChallenge.isPending ? "🔄 Joining..." : "🚀 Join Challenge Now"}
                        </Button>
                      </CardContent>
                    </Card>
                  </motion.div>
                );
              })
            ) : (
              <div className="col-span-2 text-center py-12">
                <Trophy className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-500">No active challenges available at the moment.</p>
              </div>
            )}
          </div>
        </TabsContent>

        {/* Rewards Tab */}
        <TabsContent value="rewards" className="mt-6">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {rewardsLoading ? (
              Array.from({ length: 6 }).map((_, i) => (
                <Card key={i} className="h-64">
                  <CardHeader>
                    <Skeleton className="h-6 w-3/4" />
                    <Skeleton className="h-4 w-1/2" />
                  </CardHeader>
                  <CardContent>
                    <Skeleton className="h-20 w-full" />
                  </CardContent>
                </Card>
              ))
            ) : rewards?.length ? (
              rewards.map((reward) => {
                const Icon = categoryIcons[reward.category as keyof typeof categoryIcons] || Gift;
                const isLowStock = reward.availableQuantity && 
                  (reward.availableQuantity - reward.claimedQuantity) <= 3;
                
                return (
                  <motion.div
                    key={reward.id}
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    whileHover={{ scale: 1.02 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Card className="h-full hover:shadow-xl transition-all duration-300 bg-black/20 border-gray-700 border-l-4 border-l-dubai-blue-500">
                      <CardHeader className="pb-3">
                        <div className="flex items-start justify-between">
                          <div className="flex items-center gap-3">
                            <div className={`p-3 rounded-xl ${getCategoryColor(reward.category)} text-white shadow-lg`}>
                              <Icon className="h-6 w-6" />
                            </div>
                            <div className="flex-1">
                              <CardTitle className="text-lg font-bold text-white">{reward.title}</CardTitle>
                              <p className="text-sm text-gray-400">by {reward.partner}</p>
                            </div>
                          </div>
                        </div>
                      </CardHeader>

                      <CardContent className="space-y-4">
                        <p className="text-gray-300 text-sm leading-relaxed">{reward.description}</p>
                        
                        <div className="bg-gradient-to-r from-dubai-blue-500/20 to-purple-500/20 border border-dubai-blue-500/30 p-4 rounded-lg space-y-2">
                          <div className="flex justify-between items-center">
                            <span className="text-sm font-medium text-gray-300">Value:</span>
                            <span className="text-xl font-bold text-hero-green-400">
                              {formatValue(reward.value)}
                            </span>
                          </div>
                          
                          <div className="flex justify-between items-center">
                            <span className="text-sm font-medium text-gray-300">Cost:</span>
                            <span className="text-xl font-bold text-dubai-blue-400">
                              {reward.pointsCost} pts
                            </span>
                          </div>
                        </div>

                        <div className="flex items-center justify-between text-sm">
                          <div className="flex items-center gap-1 text-gray-400">
                            <Clock className="h-4 w-4 text-dubai-blue-500" />
                            <span className="text-white">{formatTimeLeft(reward.expiresAt.toString())}</span>
                          </div>
                          {reward.availableQuantity && (
                            <div className="flex items-center gap-1 text-gray-400">
                              <Gift className="h-4 w-4 text-purple-500" />
                              <span className="text-white font-bold">{reward.availableQuantity - reward.claimedQuantity} left</span>
                            </div>
                          )}
                        </div>

                        {reward.zoneRestriction && (
                          <Badge variant="outline" className="text-xs border-gray-500 text-gray-300">
                            <MapPin className="h-3 w-3 mr-1" />
                            {reward.zoneRestriction} only
                          </Badge>
                        )}

                        {isLowStock && (
                          <div className="bg-amber-500/20 border border-amber-500/50 rounded-lg p-3">
                            <p className="text-sm text-amber-400 font-bold flex items-center gap-2">
                              <AlertCircle className="h-4 w-4" />
                              🔥 Limited quantity remaining!
                            </p>
                          </div>
                        )}

                        <Button 
                          onClick={() => handleClaimReward(reward.id)}
                          disabled={claimReward.isPending || 
                            Boolean(reward.availableQuantity && reward.claimedQuantity >= reward.availableQuantity)}
                          className="w-full bg-gradient-to-r from-dubai-blue-500 to-purple-600 hover:from-dubai-blue-600 hover:to-purple-700 text-white font-bold py-3 text-lg"
                          data-testid={`button-claim-reward-${reward.id}`}
                        >
                          {claimReward.isPending ? "🔄 Claiming..." : 
                           (reward.availableQuantity && reward.claimedQuantity >= reward.availableQuantity) ? 
                           "❌ Sold Out" : "🎁 Claim Reward"}
                        </Button>
                      </CardContent>
                    </Card>
                  </motion.div>
                );
              })
            ) : (
              <div className="col-span-3 text-center py-12">
                <Gift className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-500">No rewards available at the moment.</p>
              </div>
            )}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}