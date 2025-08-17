import React, { useState } from 'react';
import { Users, Trophy, Target, Calendar, Share2, Play, Award, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/hooks/use-toast';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { apiRequest } from '@/lib/queryClient';
import { SocialSharingWidget } from './social-sharing-widget';
import { ChallengeCreator } from './challenge-creator';

interface SocialChallenge {
  id: string;
  creatorId: string;
  creatorName?: string;
  creatorAvatar?: string;
  title: string;
  description: string;
  challengeType: string;
  targetValue: number;
  duration: number;
  pointsReward: number;
  participantLimit: number;
  currentParticipants: number;
  completedParticipants: number;
  shareCount: number;
  isActive: boolean;
  createdAt: string;
  expiresAt: string;
  userParticipation?: {
    status: string;
    currentProgress: number;
    pointsEarned: number;
  };
}

export function SocialChallengesFeed() {
  const [selectedTab, setSelectedTab] = useState('active');
  const { toast } = useToast();
  const queryClient = useQueryClient();

  // Fetch social challenges
  const { data: challenges = [], isLoading } = useQuery<SocialChallenge[]>({
    queryKey: ['/api/social-challenges', selectedTab],
  });

  // Join challenge mutation
  const joinChallengeMutation = useMutation({
    mutationFn: async (challengeId: string) => {
      return apiRequest(`/api/social-challenges/${challengeId}/join`, 'POST');
    },
    onSuccess: (data, challengeId) => {
      toast({
        title: "Challenge Joined!",
        description: "You're now part of the challenge. Start making impact!",
      });
      queryClient.invalidateQueries({ queryKey: ['/api/social-challenges'] });
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to join challenge. Please try again.",
        variant: "destructive",
      });
    },
  });

  const formatChallengeType = (type: string) => {
    const types = {
      bottles_prevented: { label: 'Bottles Saved', icon: '🌊', unit: '' },
      co2_saved: { label: 'CO2 Reduced', icon: '🌱', unit: 'kg' },
      trade_value: { label: 'Trade Value', icon: '💰', unit: 'AED' },
      points_earned: { label: 'Points', icon: '🏆', unit: 'pts' },
    };
    return types[type as keyof typeof types] || { label: type, icon: '🎯', unit: '' };
  };

  const getTimeRemaining = (expiresAt: string) => {
    const now = new Date();
    const expiry = new Date(expiresAt);
    const diff = expiry.getTime() - now.getTime();
    
    if (diff <= 0) return 'Expired';
    
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    
    if (days > 0) return `${days}d ${hours}h left`;
    return `${hours}h left`;
  };

  const ChallengeCard = ({ challenge }: { challenge: SocialChallenge }) => {
    const typeInfo = formatChallengeType(challenge.challengeType);
    const isParticipating = challenge.userParticipation?.status === 'active';
    const isCompleted = challenge.userParticipation?.status === 'completed';
    const participationRate = (challenge.currentParticipants / challenge.participantLimit) * 100;
    const completionRate = challenge.currentParticipants > 0 ? (challenge.completedParticipants / challenge.currentParticipants) * 100 : 0;

    return (
      <Card className="hover:shadow-lg transition-all duration-300 border-l-4 border-l-hero-green-500">
        <CardHeader className="pb-3">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-2">
                <Avatar className="w-8 h-8">
                  <AvatarImage src={challenge.creatorAvatar} />
                  <AvatarFallback>{challenge.creatorName?.charAt(0) || 'H'}</AvatarFallback>
                </Avatar>
                <div>
                  <p className="text-sm font-medium">{challenge.creatorName || 'Planet Hero'}</p>
                  <p className="text-xs text-gray-500">
                    {new Date(challenge.createdAt).toLocaleDateString()}
                  </p>
                </div>
              </div>
              <CardTitle className="text-lg">{challenge.title}</CardTitle>
            </div>
            <div className="text-right">
              <Badge 
                variant={isCompleted ? "default" : isParticipating ? "secondary" : "outline"}
                className={isCompleted ? "bg-green-500" : isParticipating ? "bg-blue-500" : ""}
              >
                {isCompleted ? 'Completed' : isParticipating ? 'Joined' : 'Open'}
              </Badge>
            </div>
          </div>
        </CardHeader>
        
        <CardContent className="space-y-4">
          <p className="text-gray-600 dark:text-gray-300 text-sm">
            {challenge.description}
          </p>
          
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div className="flex items-center gap-2">
              <Target className="w-4 h-4 text-hero-green-500" />
              <span>
                <strong>{challenge.targetValue}</strong> {typeInfo.label}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <Trophy className="w-4 h-4 text-dubai-gold" />
              <span><strong>{challenge.pointsReward}</strong> points</span>
            </div>
            <div className="flex items-center gap-2">
              <Users className="w-4 h-4 text-dubai-blue-500" />
              <span>{challenge.currentParticipants}/{challenge.participantLimit}</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-orange-500" />
              <span>{getTimeRemaining(challenge.expiresAt)}</span>
            </div>
          </div>

          {/* Progress bars */}
          <div className="space-y-2">
            <div>
              <div className="flex justify-between text-xs mb-1">
                <span>Participation</span>
                <span>{Math.round(participationRate)}%</span>
              </div>
              <Progress value={participationRate} className="h-2" />
            </div>
            {challenge.currentParticipants > 0 && (
              <div>
                <div className="flex justify-between text-xs mb-1">
                  <span>Completion Rate</span>
                  <span>{Math.round(completionRate)}%</span>
                </div>
                <Progress value={completionRate} className="h-2" />
              </div>
            )}
          </div>

          {/* User's progress if participating */}
          {isParticipating && challenge.userParticipation && (
            <div className="bg-blue-50 dark:bg-blue-900/20 p-3 rounded-lg">
              <div className="flex justify-between text-sm mb-2">
                <span>Your Progress</span>
                <span>{challenge.userParticipation.currentProgress}/{challenge.targetValue}</span>
              </div>
              <Progress 
                value={(challenge.userParticipation.currentProgress / challenge.targetValue) * 100} 
                className="h-2 mb-2" 
              />
              <p className="text-xs text-gray-600 dark:text-gray-300">
                Points earned: {challenge.userParticipation.pointsEarned}
              </p>
            </div>
          )}

          {/* Action buttons */}
          <div className="flex gap-2 pt-2">
            {!isParticipating && !isCompleted && challenge.currentParticipants < challenge.participantLimit && (
              <Button
                onClick={() => joinChallengeMutation.mutate(challenge.id)}
                disabled={joinChallengeMutation.isPending}
                className="flex-1 bg-hero-green-500 hover:bg-hero-green-600 text-white"
                data-testid={`button-join-challenge-${challenge.id}`}
              >
                <Play className="w-4 h-4 mr-2" />
                {joinChallengeMutation.isPending ? 'Joining...' : 'Join Challenge'}
              </Button>
            )}
            
            <SocialSharingWidget 
              content={{
                type: 'challenge',
                title: challenge.title,
                description: challenge.description,
                value: challenge.pointsReward,
              }}
            />
          </div>
        </CardContent>
      </Card>
    );
  };

  if (isLoading) {
    return (
      <div className="space-y-4">
        {[1, 2, 3].map((i) => (
          <Card key={i} className="animate-pulse">
            <CardContent className="pt-6">
              <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded mb-2"></div>
              <div className="h-20 bg-gray-200 dark:bg-gray-700 rounded"></div>
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Social Eco-Challenges</h2>
          <p className="text-gray-600 dark:text-gray-300">
            Challenge friends, earn rewards, amplify your environmental impact
          </p>
        </div>
        <ChallengeCreator />
      </div>

      <Tabs value={selectedTab} onValueChange={setSelectedTab}>
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="active">Active Challenges</TabsTrigger>
          <TabsTrigger value="my">My Challenges</TabsTrigger>
          <TabsTrigger value="completed">Completed</TabsTrigger>
        </TabsList>
        
        <TabsContent value="active" className="space-y-4 mt-6">
          {challenges.filter((c: SocialChallenge) => c.isActive).length === 0 ? (
            <Card>
              <CardContent className="pt-6 text-center">
                <Trophy className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <h3 className="font-semibold mb-2">No Active Challenges</h3>
                <p className="text-gray-600 dark:text-gray-300 mb-4">
                  Be the first to create an eco-challenge for the community!
                </p>
                <ChallengeCreator />
              </CardContent>
            </Card>
          ) : (
            challenges
              .filter((c: SocialChallenge) => c.isActive)
              .map((challenge: SocialChallenge) => (
                <ChallengeCard key={challenge.id} challenge={challenge} />
              ))
          )}
        </TabsContent>
        
        <TabsContent value="my" className="space-y-4 mt-6">
          {challenges.filter((c: SocialChallenge) => c.userParticipation).length === 0 ? (
            <Card>
              <CardContent className="pt-6 text-center">
                <Users className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <h3 className="font-semibold mb-2">No Joined Challenges</h3>
                <p className="text-gray-600 dark:text-gray-300">
                  Join active challenges to start earning rewards!
                </p>
              </CardContent>
            </Card>
          ) : (
            challenges
              .filter((c: SocialChallenge) => c.userParticipation)
              .map((challenge: SocialChallenge) => (
                <ChallengeCard key={challenge.id} challenge={challenge} />
              ))
          )}
        </TabsContent>
        
        <TabsContent value="completed" className="space-y-4 mt-6">
          {challenges.filter((c: SocialChallenge) => !c.isActive).length === 0 ? (
            <Card>
              <CardContent className="pt-6 text-center">
                <Award className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <h3 className="font-semibold mb-2">No Completed Challenges</h3>
                <p className="text-gray-600 dark:text-gray-300">
                  Complete challenges to see them here!
                </p>
              </CardContent>
            </Card>
          ) : (
            challenges
              .filter((c: SocialChallenge) => !c.isActive)
              .map((challenge: SocialChallenge) => (
                <ChallengeCard key={challenge.id} challenge={challenge} />
              ))
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}