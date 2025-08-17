import React, { useState } from 'react';
import { Share2, Users, Trophy, Target, Calendar, Gift } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { apiRequest } from '@/lib/queryClient';

interface ShareContent {
  type: 'achievement' | 'challenge' | 'trade' | 'milestone';
  title: string;
  description: string;
  value?: number;
  url?: string;
  image?: string;
}

interface SocialChallenge {
  id: string;
  creatorId: string;
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
}

export function SocialSharingWidget({ content }: { content?: ShareContent }) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedPlatform, setSelectedPlatform] = useState<string>('');
  const { toast } = useToast();
  const queryClient = useQueryClient();

  // Fetch active social challenges
  const { data: challenges = [] } = useQuery<SocialChallenge[]>({
    queryKey: ['/api/social-challenges'],
  });

  // Share content mutation
  const shareContentMutation = useMutation({
    mutationFn: async (shareData: {
      shareType: string;
      contentId: string;
      platform: string;
      shareUrl: string;
      shareText: string;
    }) => {
      return apiRequest('/api/social-shares', 'POST', shareData);
    },
    onSuccess: () => {
      toast({
        title: "Shared Successfully!",
        description: "Your eco-action has been shared. Earn points when friends join!",
      });
      queryClient.invalidateQueries({ queryKey: ['/api/social-shares'] });
    },
  });

  const generateShareContent = (type: string, platform: string) => {
    const baseUrl = 'https://deliwer.com';
    const referralCode = `HERO${Math.random().toString(36).substr(2, 6).toUpperCase()}`;
    
    const shareTemplates = {
      achievement: {
        whatsapp: `🏆 Just became a Planet Hero on DeliWer! Traded my iPhone for premium water delivery + earned ${content?.value || 500} sustainability points! Join me: ${baseUrl}?ref=${referralCode}`,
        twitter: `🌍 Just leveled up as a Planet Hero! Traded tech for sustainability and earned ${content?.value || 500} points. Join Dubai's eco-gaming revolution! #DeliWer #SustainabilityGame ${baseUrl}?ref=${referralCode}`,
        facebook: `Amazing experience with DeliWer! I just traded my old iPhone for premium water delivery and became a Planet Hero. Earning real rewards while helping Dubai's environment! Who wants to join the challenge? ${baseUrl}?ref=${referralCode}`,
        linkedin: `Exciting to be part of Dubai's first sustainability gaming platform! Just traded my iPhone for premium water solutions and earned ${content?.value || 500} impact points. DeliWer is revolutionizing how we approach environmental action. ${baseUrl}?ref=${referralCode}`,
        instagram: `🌱 Planet Hero status unlocked! 📱➡️💧 Just traded my iPhone for premium water delivery through @deliwer.dubai! Earning rewards while saving the planet 🌍 #DeliWer #SustainabilityGame #DubaiTech`,
        native: `🏆 Check out my Planet Hero achievement on DeliWer! I traded my iPhone for premium water delivery and earned ${content?.value || 500} sustainability points. Join Dubai's first sustainability game! ${baseUrl}?ref=${referralCode}`
      },
      trade: {
        whatsapp: `💚 Just completed an epic trade on DeliWer! Exchanged my ${content?.title || 'iPhone'} for AED ${content?.value || 1200} + premium water delivery! Who's next? ${baseUrl}?ref=${referralCode}`,
        twitter: `📱➡️💧 Just traded my ${content?.title || 'iPhone'} for AED ${content?.value || 1200} + sustainability points on @DeliWer! Dubai's coolest eco-platform! #TechForWater #SustainabilityGame ${baseUrl}?ref=${referralCode}`,
        facebook: `Great news! Just completed my first trade on DeliWer - got AED ${content?.value || 1200} for my old ${content?.title || 'iPhone'} plus premium water delivery! It's like gaming but for real environmental impact. ${baseUrl}?ref=${referralCode}`,
        linkedin: `Impressed by DeliWer's innovative approach to sustainability! Just traded my ${content?.title || 'iPhone'} for AED ${content?.value || 1200} + premium water solutions. This gamified platform is changing how Dubai approaches eco-action. ${baseUrl}?ref=${referralCode}`,
        instagram: `✨ Trade complete! 📱➡️💧 Got AED ${content?.value || 1200} + premium water delivery for my ${content?.title || 'iPhone'}! @deliwer.dubai is revolutionizing sustainability in Dubai! #TradeForImpact #DubaiInnovation`,
        native: `🎯 Trade completed! Just exchanged my ${content?.title || 'iPhone'} for AED ${content?.value || 1200} + premium water delivery on DeliWer. Join the sustainability revolution! ${baseUrl}?ref=${referralCode}`
      },
      challenge: {
        whatsapp: `🎮 Challenge alert! I'm taking on "${content?.title || 'Water Conservation Challenge'}" on DeliWer. Goal: ${content?.description || 'Save 1000 plastic bottles'}! Who's joining me? Winner gets ${content?.value || 500} points! ${baseUrl}?ref=${referralCode}`,
        twitter: `🌍 Challenge accepted! Taking on "${content?.title || 'Eco Challenge'}" on @DeliWer - ${content?.description || 'Save the planet, one action at a time'}! Who's in? #EcoChallenge #SustainabilityGame ${baseUrl}?ref=${referralCode}`,
        facebook: `Challenge time! I'm participating in "${content?.title || 'Water Conservation Challenge'}" on DeliWer. The goal is ${content?.description || 'to make real environmental impact'}. Join me and let's compete for sustainability! ${baseUrl}?ref=${referralCode}`,
        linkedin: `Participating in DeliWer's "${content?.title || 'Sustainability Challenge'}" - ${content?.description || 'focused on measurable environmental impact'}. Love how this platform gamifies real-world eco-actions! ${baseUrl}?ref=${referralCode}`,
        instagram: `🎯 Challenge mode activated! Taking on "${content?.title || 'Eco Challenge'}" @deliwer.dubai! Goal: ${content?.description || 'Save the planet'} 🌱 Who's joining? #ChallengeAccepted #EcoWarrior`,
        native: `🏆 Challenge invitation! Join me in "${content?.title || 'Water Conservation Challenge'}" on DeliWer. Let's compete for sustainability and earn real rewards! ${baseUrl}?ref=${referralCode}`
      },
      milestone: {
        whatsapp: `🎉 Milestone achieved! Just hit ${content?.value || 1000} bottles prevented on DeliWer! Feeling proud of my environmental impact in Dubai. Join the Planet Heroes: ${baseUrl}?ref=${referralCode}`,
        twitter: `🌊 Milestone unlocked! ${content?.value || 1000} plastic bottles prevented through @DeliWer! Every small action counts in Dubai's sustainability journey! #PlasticFree #SustainabilityWin ${baseUrl}?ref=${referralCode}`,
        facebook: `Celebrating a milestone! Just prevented ${content?.value || 1000} plastic bottles from polluting our environment through DeliWer. Small actions, big impact! Who wants to join this journey? ${baseUrl}?ref=${referralCode}`,
        linkedin: `Proud to share a sustainability milestone: ${content?.value || 1000} plastic bottles prevented through DeliWer's platform. This is how technology can drive real environmental change in Dubai! ${baseUrl}?ref=${referralCode}`,
        instagram: `🌊 Milestone celebration! ${content?.value || 1000} bottles prevented! Every action counts 🌱 @deliwer.dubai is making sustainability fun and rewarding! #MilestoneUnlocked #SustainabilityWin`,
        native: `🎯 Environmental milestone! Just prevented ${content?.value || 1000} plastic bottles through DeliWer. Join me in making Dubai more sustainable! ${baseUrl}?ref=${referralCode}`
      }
    };

    return shareTemplates[type as keyof typeof shareTemplates]?.[platform as keyof typeof shareTemplates.achievement] || shareTemplates.achievement.native;
  };

  const handleShare = (platform: string) => {
    const shareText = generateShareContent(content?.type || 'achievement', platform);
    const shareUrl = content?.url || `https://deliwer.com?ref=HERO${Math.random().toString(36).substr(2, 6).toUpperCase()}`;

    // Track the share
    shareContentMutation.mutate({
      shareType: content?.type || 'achievement',
      contentId: content?.title || 'general-share',
      platform,
      shareUrl,
      shareText,
    });

    // Platform-specific sharing
    switch (platform) {
      case 'whatsapp':
        window.open(`https://wa.me/?text=${encodeURIComponent(shareText)}`, '_blank');
        break;
      case 'twitter':
        window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}`, '_blank');
        break;
      case 'facebook':
        window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}&quote=${encodeURIComponent(shareText)}`, '_blank');
        break;
      case 'linkedin':
        window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}&summary=${encodeURIComponent(shareText)}`, '_blank');
        break;
      case 'instagram':
        navigator.clipboard.writeText(shareText);
        toast({
          title: "Content Copied!",
          description: "Instagram caption copied to clipboard. Open Instagram to share!",
        });
        break;
      case 'native':
      default:
        if (navigator.share) {
          navigator.share({
            title: content?.title || 'DeliWer - Sustainability Achievement',
            text: shareText,
            url: shareUrl,
          });
        } else {
          navigator.clipboard.writeText(shareText);
          toast({
            title: "Link Copied!",
            description: "Share text copied to clipboard!",
          });
        }
        break;
    }

    setIsOpen(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button 
          variant="outline" 
          size="sm" 
          className="bg-gradient-to-r from-hero-green-500 to-dubai-blue-500 hover:from-hero-green-600 hover:to-dubai-blue-600 text-white border-none"
          data-testid="button-social-share"
        >
          <Share2 className="w-4 h-4 mr-2" />
          Share & Challenge Friends
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Share2 className="w-5 h-5 text-hero-green-500" />
            Share Your Eco-Impact & Challenge Friends
          </DialogTitle>
        </DialogHeader>
        
        <Tabs defaultValue="share" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="share">Share Achievement</TabsTrigger>
            <TabsTrigger value="challenges">Active Challenges</TabsTrigger>
          </TabsList>
          
          <TabsContent value="share" className="space-y-4">
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {[
                { platform: 'whatsapp', label: 'WhatsApp', color: 'bg-green-500' },
                { platform: 'twitter', label: 'Twitter', color: 'bg-blue-400' },
                { platform: 'facebook', label: 'Facebook', color: 'bg-blue-600' },
                { platform: 'linkedin', label: 'LinkedIn', color: 'bg-blue-700' },
                { platform: 'instagram', label: 'Instagram', color: 'bg-gradient-to-r from-purple-500 to-pink-500' },
                { platform: 'native', label: 'More Options', color: 'bg-gray-600' },
              ].map(({ platform, label, color }) => (
                <Button
                  key={platform}
                  onClick={() => handleShare(platform)}
                  className={`${color} hover:opacity-90 text-white`}
                  data-testid={`button-share-${platform}`}
                >
                  {label}
                </Button>
              ))}
            </div>
            
            <div className="mt-4 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
              <h4 className="font-semibold mb-2">Preview:</h4>
              <p className="text-sm text-gray-600 dark:text-gray-300">
                {generateShareContent(content?.type || 'achievement', 'native')}
              </p>
            </div>
          </TabsContent>
          
          <TabsContent value="challenges" className="space-y-4">
            <div className="space-y-3">
              {challenges.slice(0, 3).map((challenge: SocialChallenge) => (
                <Card key={challenge.id} className="border-l-4 border-l-hero-green-500">
                  <CardContent className="pt-4">
                    <div className="flex justify-between items-start mb-2">
                      <h4 className="font-semibold">{challenge.title}</h4>
                      <Badge variant="secondary">{challenge.pointsReward} points</Badge>
                    </div>
                    <p className="text-sm text-gray-600 dark:text-gray-300 mb-3">
                      {challenge.description}
                    </p>
                    <div className="flex items-center justify-between text-xs text-gray-500">
                      <span className="flex items-center gap-1">
                        <Users className="w-3 h-3" />
                        {challenge.currentParticipants}/{challenge.participantLimit}
                      </span>
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3 h-3" />
                        {challenge.duration} days
                      </span>
                      <Button
                        size="sm"
                        onClick={() => handleShare('whatsapp')}
                        className="bg-hero-green-500 hover:bg-hero-green-600 text-white"
                        data-testid={`button-share-challenge-${challenge.id}`}
                      >
                        Share Challenge
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
}