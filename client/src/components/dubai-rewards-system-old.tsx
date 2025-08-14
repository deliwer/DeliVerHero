import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { 
  Trophy, 
  Gift, 
  MapPin, 
  Clock, 
  Users, 
  Star, 
  Droplets, 
  Zap, 
  Car, 
  Recycle,
  Building,
  Coffee,
  Camera,
  Utensils,
  Ticket
} from "lucide-react";

interface DubaiChallenge {
  id: string;
  title: string;
  description: string;
  category: 'water' | 'energy' | 'transport' | 'waste';
  targetZone?: string;
  pointsReward: number;
  timeLimit?: number;
  participantLimit?: number;
  currentParticipants: number;
  progress?: number;
}

interface DubaiReward {
  id: string;
  title: string;
  description: string;
  category: 'voucher' | 'experience' | 'product' | 'service';
  partner: string;
  value: number;
  pointsCost: number;
  availableQuantity?: number;
  claimedQuantity: number;
  zoneRestriction?: string;
}

const mockChallenges: DubaiChallenge[] = [
  {
    id: "1",
    title: "Dubai Marina Water Challenge",
    description: "Install AquaCafe system and reduce 100 plastic bottles this month",
    category: "water",
    targetZone: "Dubai Marina",
    pointsReward: 500,
    timeLimit: 30,
    participantLimit: 100,
    currentParticipants: 67,
    progress: 45
  },
  {
    id: "2", 
    title: "Business Bay Energy Mission",
    description: "Reduce energy consumption by 20% using smart home tech",
    category: "energy",
    targetZone: "Business Bay",
    pointsReward: 750,
    timeLimit: 45,
    participantLimit: 50,
    currentParticipants: 23,
    progress: 78
  },
  {
    id: "3",
    title: "JLT Green Transport Week",
    description: "Use sustainable transport for 7 consecutive days",
    category: "transport", 
    targetZone: "Jumeirah Lake Towers",
    pointsReward: 300,
    timeLimit: 7,
    participantLimit: 200,
    currentParticipants: 156,
    progress: 12
  },
  {
    id: "4",
    title: "City-wide Waste Warrior",
    description: "Complete 5 e-waste recycling missions across Dubai",
    category: "waste",
    pointsReward: 1000,
    timeLimit: 60,
    participantLimit: 75,
    currentParticipants: 34,
    progress: 0
  }
];

const mockRewards: DubaiReward[] = [
  {
    id: "1",
    title: "Burj Khalifa Observation Deck",
    description: "Skip-the-line tickets for Level 148 + 125",
    category: "experience",
    partner: "Emaar Entertainment", 
    value: 35000, // AED 350
    pointsCost: 2500,
    availableQuantity: 10,
    claimedQuantity: 3,
    zoneRestriction: "Downtown Dubai"
  },
  {
    id: "2",
    title: "Gold Souk Sustainability Shopping",
    description: "AED 200 voucher for eco-certified jewelry",
    category: "voucher",
    partner: "Dubai Gold & Jewellery Group",
    value: 20000, // AED 200
    pointsCost: 1500,
    availableQuantity: 25,
    claimedQuantity: 8
  },
  {
    id: "3", 
    title: "Desert Safari Carbon Offset",
    description: "Desert conservation experience with tree planting",
    category: "experience",
    partner: "Emirates Nature-WWF",
    value: 45000, // AED 450
    pointsCost: 3000,
    availableQuantity: 15,
    claimedQuantity: 2,
    zoneRestriction: "Dubai Desert Conservation Reserve"
  },
  {
    id: "4",
    title: "Mall of Emirates Eco Dining",
    description: "AED 150 voucher for sustainable restaurants",
    category: "voucher", 
    partner: "Majid Al Futtaim",
    value: 15000, // AED 150
    pointsCost: 1000,
    availableQuantity: 50,
    claimedQuantity: 22
  }
];

const categoryIcons = {
  water: Droplets,
  energy: Zap,
  transport: Car,
  waste: Recycle
};

const rewardIcons = {
  voucher: Ticket,
  experience: Camera,
  product: Gift,
  service: Building
};

export function DubaiRewardsSystem() {
  const [selectedChallenge, setSelectedChallenge] = useState<string | null>(null);
  const [selectedReward, setSelectedReward] = useState<string | null>(null);

  return (
    <div className="max-w-6xl mx-auto p-6">
      <div className="text-center mb-8">
        <motion.h1 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-4xl font-bold text-white mb-4"
        >
          Dubai Sustainability Rewards
        </motion.h1>
        <p className="text-xl text-gray-300 max-w-3xl mx-auto">
          Complete local eco-missions, earn rewards from Dubai's top partners, and help make our city more sustainable
        </p>
      </div>

      <Tabs defaultValue="challenges" className="w-full">
        <TabsList className="grid w-full grid-cols-2 mb-8">
          <TabsTrigger value="challenges" className="flex items-center gap-2">
            <Trophy className="w-4 h-4" />
            Active Challenges
          </TabsTrigger>
          <TabsTrigger value="rewards" className="flex items-center gap-2">
            <Gift className="w-4 h-4" />
            Available Rewards
          </TabsTrigger>
        </TabsList>

        <TabsContent value="challenges">
          <div className="grid gap-6">
            {mockChallenges.map((challenge) => {
              const IconComponent = categoryIcons[challenge.category];
              const isSelected = selectedChallenge === challenge.id;
              
              return (
                <motion.div
                  key={challenge.id}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  whileHover={{ scale: 1.02 }}
                  className={`cursor-pointer transition-all duration-300 ${
                    isSelected ? 'ring-2 ring-hero-green-500' : ''
                  }`}
                  onClick={() => setSelectedChallenge(isSelected ? null : challenge.id)}
                >
                  <Card className="bg-gradient-to-r from-slate-800/80 to-slate-900/80 border-slate-700 hover:border-hero-green-500/50">
                    <CardHeader>
                      <div className="flex items-start justify-between">
                        <div className="flex items-center gap-3">
                          <div className="p-2 rounded-lg bg-hero-green-500/20">
                            <IconComponent className="w-6 h-6 text-hero-green-500" />
                          </div>
                          <div>
                            <CardTitle className="text-white text-xl">{challenge.title}</CardTitle>
                            <div className="flex items-center gap-4 mt-2">
                              {challenge.targetZone && (
                                <Badge variant="outline" className="text-amber-500 border-amber-500/50">
                                  <MapPin className="w-3 h-3 mr-1" />
                                  {challenge.targetZone}
                                </Badge>
                              )}
                              <Badge variant="outline" className="text-hero-green-500 border-hero-green-500/50">
                                <Star className="w-3 h-3 mr-1" />
                                {challenge.pointsReward} points
                              </Badge>
                            </div>
                          </div>
                        </div>
                        <div className="text-right">
                          {challenge.timeLimit && (
                            <div className="flex items-center text-gray-400 text-sm">
                              <Clock className="w-4 h-4 mr-1" />
                              {challenge.timeLimit} days
                            </div>
                          )}
                          <div className="flex items-center text-gray-400 text-sm mt-1">
                            <Users className="w-4 h-4 mr-1" />
                            {challenge.currentParticipants}/{challenge.participantLimit || '∞'}
                          </div>
                        </div>
                      </div>
                    </CardHeader>
                    
                    <CardContent>
                      <p className="text-gray-300 mb-4">{challenge.description}</p>
                      
                      {challenge.progress !== undefined && (
                        <div className="mb-4">
                          <div className="flex justify-between text-sm text-gray-400 mb-2">
                            <span>Your Progress</span>
                            <span>{challenge.progress}%</span>
                          </div>
                          <Progress value={challenge.progress} className="h-2" />
                        </div>
                      )}

                      <AnimatePresence>
                        {isSelected && (
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            className="border-t border-slate-600 pt-4 mt-4"
                          >
                            <div className="grid md:grid-cols-2 gap-4">
                              <Button className="bg-hero-green-500 hover:bg-hero-green-600">
                                Join Challenge
                              </Button>
                              <Button variant="outline" className="border-slate-600">
                                View Details
                              </Button>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </CardContent>
                  </Card>
                </motion.div>
              );
            })}
          </div>
        </TabsContent>

        <TabsContent value="rewards">
          <div className="grid gap-6">
            {mockRewards.map((reward) => {
              const IconComponent = rewardIcons[reward.category];
              const isSelected = selectedReward === reward.id;
              const availability = reward.availableQuantity ? 
                ((reward.availableQuantity - reward.claimedQuantity) / reward.availableQuantity * 100) : 100;
              
              return (
                <motion.div
                  key={reward.id}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  whileHover={{ scale: 1.02 }}
                  className={`cursor-pointer transition-all duration-300 ${
                    isSelected ? 'ring-2 ring-amber-500' : ''
                  }`}
                  onClick={() => setSelectedReward(isSelected ? null : reward.id)}
                >
                  <Card className="bg-gradient-to-r from-slate-800/80 to-slate-900/80 border-slate-700 hover:border-amber-500/50">
                    <CardHeader>
                      <div className="flex items-start justify-between">
                        <div className="flex items-center gap-3">
                          <div className="p-2 rounded-lg bg-amber-500/20">
                            <IconComponent className="w-6 h-6 text-amber-500" />
                          </div>
                          <div>
                            <CardTitle className="text-white text-xl">{reward.title}</CardTitle>
                            <div className="flex items-center gap-4 mt-2">
                              <Badge variant="outline" className="text-blue-400 border-blue-400/50">
                                {reward.partner}
                              </Badge>
                              <Badge variant="outline" className="text-amber-500 border-amber-500/50">
                                AED {(reward.value / 100).toFixed(0)}
                              </Badge>
                              {reward.zoneRestriction && (
                                <Badge variant="outline" className="text-purple-400 border-purple-400/50">
                                  <MapPin className="w-3 h-3 mr-1" />
                                  {reward.zoneRestriction}
                                </Badge>
                              )}
                            </div>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="text-2xl font-bold text-hero-green-500">
                            {reward.pointsCost}
                          </div>
                          <div className="text-sm text-gray-400">points</div>
                        </div>
                      </div>
                    </CardHeader>
                    
                    <CardContent>
                      <p className="text-gray-300 mb-4">{reward.description}</p>
                      
                      {reward.availableQuantity && (
                        <div className="mb-4">
                          <div className="flex justify-between text-sm text-gray-400 mb-2">
                            <span>Availability</span>
                            <span>
                              {reward.availableQuantity - reward.claimedQuantity} of {reward.availableQuantity} left
                            </span>
                          </div>
                          <Progress value={availability} className="h-2" />
                        </div>
                      )}

                      <AnimatePresence>
                        {isSelected && (
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            className="border-t border-slate-600 pt-4 mt-4"
                          >
                            <div className="grid md:grid-cols-2 gap-4">
                              <Button className="bg-amber-500 hover:bg-amber-600 text-black font-semibold">
                                Claim Reward
                              </Button>
                              <Button variant="outline" className="border-slate-600">
                                Learn More
                              </Button>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </CardContent>
                  </Card>
                </motion.div>
              );
            })}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}