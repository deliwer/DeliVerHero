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
        className="text-center space-y-4"
      >
        <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
          Dubai Sustainability Rewards
        </h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Exclusive challenges and rewards for Dubai's Planet Heroes. Complete local missions, earn points, and unlock amazing experiences across the city.
        </p>
      </motion.div>

      {/* Tabs */}
      <Tabs value={selectedTab} onValueChange={setSelectedTab} className="w-full">
        <TabsList className="grid w-full grid-cols-2 bg-white border">
          <TabsTrigger value="challenges" className="flex items-center gap-2">
            <Trophy className="h-4 w-4" />
            Dubai Challenges
          </TabsTrigger>
          <TabsTrigger value="rewards" className="flex items-center gap-2">
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
                    <Card className="h-full hover:shadow-lg transition-shadow border-l-4 border-l-blue-500">
                      <CardHeader className="pb-3">
                        <div className="flex items-start justify-between">
                          <div className="flex items-center gap-3">
                            <div className={`p-2 rounded-lg ${getCategoryColor(challenge.category)} text-white`}>
                              <Icon className="h-5 w-5" />
                            </div>
                            <div>
                              <CardTitle className="text-lg font-semibold">{challenge.title}</CardTitle>
                              <div className="flex items-center gap-2 mt-1">
                                {challenge.targetZone && (
                                  <Badge variant="outline" className="text-xs">
                                    <MapPin className="h-3 w-3 mr-1" />
                                    {challenge.targetZone}
                                  </Badge>
                                )}
                                <Badge className="bg-green-100 text-green-800">
                                  +{challenge.pointsReward} pts
                                </Badge>
                              </div>
                            </div>
                          </div>
                        </div>
                      </CardHeader>

                      <CardContent className="space-y-4">
                        <p className="text-gray-600 text-sm">{challenge.description}</p>
                        
                        <div className="flex items-center justify-between text-sm text-gray-500">
                          <div className="flex items-center gap-1">
                            <Clock className="h-4 w-4" />
                            {formatTimeLeft(challenge.expiresAt)}
                          </div>
                          <div className="flex items-center gap-1">
                            <Users className="h-4 w-4" />
                            {challenge.currentParticipants}
                            {challenge.participantLimit && `/${challenge.participantLimit}`}
                          </div>
                        </div>

                        {challenge.participantLimit && (
                          <div className="space-y-2">
                            <Progress 
                              value={(challenge.currentParticipants / challenge.participantLimit) * 100} 
                              className="h-2"
                            />
                            {isNearCapacity && (
                              <p className="text-xs text-amber-600 font-medium">
                                ⚡ Almost full! Join now to secure your spot
                              </p>
                            )}
                          </div>
                        )}

                        <div className="flex items-center justify-between pt-2">
                          <div className="text-sm font-medium text-gray-700">
                            Reward: {challenge.rewardItem}
                          </div>
                          <Button 
                            onClick={() => handleJoinChallenge(challenge.id)}
                            disabled={joinChallenge.isPending}
                            size="sm"
                            className="bg-blue-600 hover:bg-blue-700"
                            data-testid={`button-join-challenge-${challenge.id}`}
                          >
                            {joinChallenge.isPending ? "Joining..." : "Join Challenge"}
                          </Button>
                        </div>
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
                    <Card className="h-full hover:shadow-lg transition-shadow border-l-4 border-l-purple-500">
                      <CardHeader className="pb-3">
                        <div className="flex items-start justify-between">
                          <div className="flex items-center gap-3">
                            <div className={`p-2 rounded-lg ${getCategoryColor(reward.category)} text-white`}>
                              <Icon className="h-5 w-5" />
                            </div>
                            <div className="flex-1">
                              <CardTitle className="text-base font-semibold">{reward.title}</CardTitle>
                              <p className="text-sm text-gray-500">by {reward.partner}</p>
                            </div>
                          </div>
                        </div>
                      </CardHeader>

                      <CardContent className="space-y-4">
                        <p className="text-gray-600 text-sm">{reward.description}</p>
                        
                        <div className="space-y-2">
                          <div className="flex justify-between items-center">
                            <span className="text-sm font-medium">Value:</span>
                            <span className="text-lg font-bold text-green-600">
                              {formatValue(reward.value)}
                            </span>
                          </div>
                          
                          <div className="flex justify-between items-center">
                            <span className="text-sm font-medium">Cost:</span>
                            <span className="text-lg font-bold text-blue-600">
                              {reward.pointsCost} pts
                            </span>
                          </div>
                        </div>

                        <div className="flex items-center justify-between text-sm text-gray-500">
                          <div className="flex items-center gap-1">
                            <Clock className="h-4 w-4" />
                            {formatTimeLeft(reward.expiresAt)}
                          </div>
                          {reward.availableQuantity && (
                            <div className="flex items-center gap-1">
                              <Gift className="h-4 w-4" />
                              {reward.availableQuantity - reward.claimedQuantity} left
                            </div>
                          )}
                        </div>

                        {reward.zoneRestriction && (
                          <Badge variant="outline" className="text-xs">
                            <MapPin className="h-3 w-3 mr-1" />
                            {reward.zoneRestriction} only
                          </Badge>
                        )}

                        {isLowStock && (
                          <div className="bg-amber-50 border border-amber-200 rounded-md p-2">
                            <p className="text-xs text-amber-700 font-medium flex items-center gap-1">
                              <AlertCircle className="h-3 w-3" />
                              Limited quantity remaining!
                            </p>
                          </div>
                        )}

                        <Button 
                          onClick={() => handleClaimReward(reward.id)}
                          disabled={claimReward.isPending || 
                            (reward.availableQuantity && reward.claimedQuantity >= reward.availableQuantity)}
                          className="w-full bg-purple-600 hover:bg-purple-700"
                          data-testid={`button-claim-reward-${reward.id}`}
                        >
                          {claimReward.isPending ? "Claiming..." : 
                           (reward.availableQuantity && reward.claimedQuantity >= reward.availableQuantity) ? 
                           "Sold Out" : "Claim Reward"}
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