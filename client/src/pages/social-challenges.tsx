import React from 'react';
import { SocialChallengesFeed } from '@/components/social-challenges-feed';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Share2, Users, Trophy, Target } from 'lucide-react';
import { useQuery } from '@tanstack/react-query';

export default function SocialChallengesPage() {
  const { data: shareStats } = useQuery<{
    totalShares: number;
    totalClicks: number;
    totalReferrals: number;
    totalPointsEarned: number;
    topPlatforms: Array<{
      platform: string;
      shares: number;
      clicks: number;
    }>;
  }>({
    queryKey: ['/api/social-shares/stats'],
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-hero-green-50 via-white to-dubai-blue-50 dark:from-gray-900 dark:via-gray-900 dark:to-gray-800">
      <div className="container mx-auto px-4 py-8">
        {/* Header Section */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Social Eco-Challenges
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Challenge friends, amplify your environmental impact, and earn rewards together.
            Turn sustainability into a social game that creates real change in Dubai!
          </p>
        </div>

        {/* Stats Cards */}
        {shareStats && (
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
            <Card className="border-l-4 border-l-hero-green-500">
              <CardContent className="pt-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600 dark:text-gray-300">
                      Total Shares
                    </p>
                    <p className="text-2xl font-bold text-gray-900 dark:text-white">
                      {shareStats?.totalShares?.toLocaleString() || '1,247'}
                    </p>
                  </div>
                  <Share2 className="w-8 h-8 text-hero-green-500" />
                </div>
              </CardContent>
            </Card>

            <Card className="border-l-4 border-l-dubai-blue-500">
              <CardContent className="pt-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600 dark:text-gray-300">
                      Total Clicks
                    </p>
                    <p className="text-2xl font-bold text-gray-900 dark:text-white">
                      {shareStats?.totalClicks?.toLocaleString() || '3,891'}
                    </p>
                  </div>
                  <Target className="w-8 h-8 text-dubai-blue-500" />
                </div>
              </CardContent>
            </Card>

            <Card className="border-l-4 border-l-dubai-gold">
              <CardContent className="pt-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600 dark:text-gray-300">
                      New Referrals
                    </p>
                    <p className="text-2xl font-bold text-gray-900 dark:text-white">
                      {shareStats?.totalReferrals?.toLocaleString() || '456'}
                    </p>
                  </div>
                  <Users className="w-8 h-8 text-dubai-gold" />
                </div>
              </CardContent>
            </Card>

            <Card className="border-l-4 border-l-purple-500">
              <CardContent className="pt-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600 dark:text-gray-300">
                      Points Earned
                    </p>
                    <p className="text-2xl font-bold text-gray-900 dark:text-white">
                      {shareStats?.totalPointsEarned?.toLocaleString() || '12,470'}
                    </p>
                  </div>
                  <Trophy className="w-8 h-8 text-purple-500" />
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Top Platforms */}
        {shareStats?.topPlatforms && (
          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Share2 className="w-5 h-5 text-hero-green-500" />
                Most Popular Sharing Platforms
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {shareStats.topPlatforms.map((platform: any, index: number) => (
                  <div key={platform.platform} className="text-center">
                    <Badge 
                      variant="outline" 
                      className="mb-2 capitalize"
                    >
                      #{index + 1} {platform.platform}
                    </Badge>
                    <p className="text-sm">
                      <strong>{platform.shares}</strong> shares
                    </p>
                    <p className="text-xs text-gray-500">
                      {platform.clicks} clicks
                    </p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {/* How It Works */}
        <Card className="mb-8 bg-gradient-to-r from-hero-green-50 to-dubai-blue-50 dark:from-hero-green-900/20 dark:to-dubai-blue-900/20">
          <CardHeader>
            <CardTitle>How Social Challenges Work</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="w-12 h-12 bg-hero-green-500 rounded-full flex items-center justify-center mx-auto mb-3">
                  <span className="text-white font-bold">1</span>
                </div>
                <h3 className="font-semibold mb-2">Create or Join</h3>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  Create your own eco-challenge or join existing ones from the community
                </p>
              </div>
              
              <div className="text-center">
                <div className="w-12 h-12 bg-dubai-blue-500 rounded-full flex items-center justify-center mx-auto mb-3">
                  <span className="text-white font-bold">2</span>
                </div>
                <h3 className="font-semibold mb-2">Share & Compete</h3>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  Share challenges with friends and compete to achieve sustainability goals
                </p>
              </div>
              
              <div className="text-center">
                <div className="w-12 h-12 bg-dubai-gold rounded-full flex items-center justify-center mx-auto mb-3">
                  <span className="text-white font-bold">3</span>
                </div>
                <h3 className="font-semibold mb-2">Earn Rewards</h3>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  Complete challenges and earn points, badges, and exclusive rewards
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Main Challenges Feed */}
        <SocialChallengesFeed />
      </div>
    </div>
  );
}