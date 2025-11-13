import { useState } from "react";
import { Star, Trophy, Heart, Sparkles, TrendingUp, Users, Globe, ArrowRight, Gift, Shield, Award } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { useMutation, useQuery } from "@tanstack/react-query";
import { apiRequest, queryClient } from "@/lib/queryClient";

interface StarsTier {
  id: string;
  amountUSD: number;
  stars: number;
  label: string;
  color: string;
  popular?: boolean;
}

const STARS_TIERS: StarsTier[] = [
  { id: "tier-5", amountUSD: 5, stars: 50, label: "Starter", color: "from-blue-500 to-cyan-500" },
  { id: "tier-10", amountUSD: 10, stars: 100, label: "Supporter", color: "from-emerald-500 to-teal-500" },
  { id: "tier-20", amountUSD: 20, stars: 200, label: "Champion", color: "from-amber-500 to-orange-500", popular: true },
  { id: "tier-50", amountUSD: 50, stars: 500, label: "Hero", color: "from-purple-500 to-pink-500" },
  { id: "tier-100", amountUSD: 100, stars: 1000, label: "Legend", color: "from-red-500 to-rose-500" }
];

interface StarsLeaderboardEntry {
  contributorName: string;
  contributorEmail: string;
  totalStars: number;
  totalAmountUSD: number;
  isAnonymous: boolean;
}

interface StarsStats {
  totalContributions: number;
  totalAmountUSD: number;
  totalStarsAwarded: number;
  totalContributors: number;
}

export function StarsSponsorshipSection() {
  const [selectedTier, setSelectedTier] = useState<StarsTier | null>(null);
  const [contributorName, setContributorName] = useState("");
  const [contributorEmail, setContributorEmail] = useState("");
  const [isAnonymous, setIsAnonymous] = useState(false);
  const [displayOnLeaderboard, setDisplayOnLeaderboard] = useState(true);
  const { toast } = useToast();

  // Fetch leaderboard
  const { data: leaderboard } = useQuery<StarsLeaderboardEntry[]>({
    queryKey: ['/api/stars/leaderboard'],
  });

  // Fetch stats
  const { data: stats } = useQuery<StarsStats>({
    queryKey: ['/api/stars/stats'],
  });

  // Purchase mutation
  const purchaseMutation = useMutation({
    mutationFn: async (data: {
      amountUSD: number;
      starsAwarded: number;
      contributorName: string;
      contributorEmail: string;
      isAnonymous: boolean;
      displayOnLeaderboard: boolean;
    }) => {
      const response = await apiRequest('POST', '/api/stars/purchase', data);
      return response.json();
    },
    onSuccess: (data) => {
      // Invalidate queries to refresh data
      queryClient.invalidateQueries({ queryKey: ['/api/stars/leaderboard'] });
      queryClient.invalidateQueries({ queryKey: ['/api/stars/stats'] });

      // Show success message
      toast({
        title: "Purchase Initiated!",
        description: `Redirecting you to PayPal to complete your ${selectedTier?.amountUSD} USD contribution...`,
      });

      // Redirect to PayPal (will be implemented when backend is ready)
      if (data.approvalUrl) {
        window.location.href = data.approvalUrl;
      }
    },
    onError: (error) => {
      toast({
        title: "Purchase Failed",
        description: error instanceof Error ? error.message : "Please try again.",
        variant: "destructive",
      });
    },
  });

  const handlePurchase = (tier: StarsTier) => {
    if (!contributorName || !contributorEmail) {
      toast({
        title: "Information Required",
        description: "Please provide your name and email to continue.",
        variant: "destructive",
      });
      return;
    }

    purchaseMutation.mutate({
      amountUSD: tier.amountUSD,
      starsAwarded: tier.stars,
      contributorName,
      contributorEmail,
      isAnonymous,
      displayOnLeaderboard,
    });
  };

  return (
    <section className="py-16 px-4 relative overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 bg-gradient-to-b from-primary/5 to-transparent pointer-events-none" />
      <div className="absolute top-0 right-0 w-96 h-96 bg-primary/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-accent/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header Section */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full border border-primary/20 mb-4">
            <Sparkles className="w-4 h-4" />
            <span className="font-bold text-sm">AMPLIFY YOUR IMPACT</span>
          </div>
          
          <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent">
            Support Global Sustainability
          </h2>
          
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-6">
            Purchase Stars to support environmental initiatives worldwide. Your contribution funds clean water projects,
            renewable energy, and sustainable communities.
          </p>

          {/* Stats Display */}
          {stats && (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto mb-8">
              <Card className="p-4">
                <div className="flex flex-col items-center">
                  <Star className="w-6 h-6 text-amber-500 mb-2" />
                  <div className="text-2xl font-bold text-primary">{stats.totalStarsAwarded.toLocaleString()}</div>
                  <div className="text-xs text-muted-foreground">Stars Awarded</div>
                </div>
              </Card>
              <Card className="p-4">
                <div className="flex flex-col items-center">
                  <TrendingUp className="w-6 h-6 text-emerald-500 mb-2" />
                  <div className="text-2xl font-bold text-primary">${stats.totalAmountUSD.toLocaleString()}</div>
                  <div className="text-xs text-muted-foreground">Total Raised</div>
                </div>
              </Card>
              <Card className="p-4">
                <div className="flex flex-col items-center">
                  <Users className="w-6 h-6 text-blue-500 mb-2" />
                  <div className="text-2xl font-bold text-primary">{stats.totalContributors}</div>
                  <div className="text-xs text-muted-foreground">Contributors</div>
                </div>
              </Card>
              <Card className="p-4">
                <div className="flex flex-col items-center">
                  <Globe className="w-6 h-6 text-purple-500 mb-2" />
                  <div className="text-2xl font-bold text-primary">{stats.totalContributions}</div>
                  <div className="text-xs text-muted-foreground">Contributions</div>
                </div>
              </Card>
            </div>
          )}
        </div>

        {/* Stars Tiers */}
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4 mb-12">
          {STARS_TIERS.map((tier) => (
            <Card
              key={tier.id}
              className={`relative overflow-hidden transition-all duration-300 ${
                selectedTier?.id === tier.id ? 'ring-2 ring-primary shadow-lg scale-105' : 'hover:shadow-md'
              } ${tier.popular ? 'border-primary border-2' : ''}`}
              data-testid={`stars-tier-${tier.amountUSD}`}
            >
              {tier.popular && (
                <div className="absolute top-0 right-0 bg-primary text-primary-foreground px-3 py-1 text-xs font-bold rounded-bl-lg">
                  POPULAR
                </div>
              )}
              
              <CardHeader className="p-4">
                <div className={`w-12 h-12 rounded-full bg-gradient-to-br ${tier.color} mx-auto mb-2 flex items-center justify-center`}>
                  <Star className="w-6 h-6 text-white" />
                </div>
                <CardTitle className="text-center text-lg">{tier.label}</CardTitle>
              </CardHeader>

              <CardContent className="p-4 pt-0">
                <div className="text-center mb-4">
                  <div className="text-3xl font-bold text-primary mb-1">${tier.amountUSD}</div>
                  <div className="text-sm text-muted-foreground">{tier.stars} Stars</div>
                </div>

                <Button
                  onClick={() => {
                    setSelectedTier(tier);
                    handlePurchase(tier);
                  }}
                  disabled={purchaseMutation.isPending}
                  className={`w-full bg-gradient-to-r ${tier.color} text-white hover:opacity-90`}
                  data-testid={`button-purchase-stars-${tier.amountUSD}`}
                >
                  {purchaseMutation.isPending && selectedTier?.id === tier.id ? (
                    "Processing..."
                  ) : (
                    <>
                      Contribute <ArrowRight className="w-4 h-4 ml-1" />
                    </>
                  )}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Contributor Information Form */}
        <Card className="mb-12 max-w-2xl mx-auto">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Gift className="w-5 h-5 text-primary" />
              Your Information
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label htmlFor="contributor-name" className="block text-sm font-medium mb-2">
                Name
              </label>
              <input
                id="contributor-name"
                type="text"
                value={contributorName}
                onChange={(e) => setContributorName(e.target.value)}
                placeholder="Enter your name"
                className="w-full px-4 py-2 rounded-md border border-input bg-background"
                data-testid="input-contributor-name"
              />
            </div>

            <div>
              <label htmlFor="contributor-email" className="block text-sm font-medium mb-2">
                Email
              </label>
              <input
                id="contributor-email"
                type="email"
                value={contributorEmail}
                onChange={(e) => setContributorEmail(e.target.value)}
                placeholder="Enter your email"
                className="w-full px-4 py-2 rounded-md border border-input bg-background"
                data-testid="input-contributor-email"
              />
            </div>

            <div className="flex items-center gap-2">
              <input
                id="anonymous"
                type="checkbox"
                checked={isAnonymous}
                onChange={(e) => setIsAnonymous(e.target.checked)}
                className="rounded"
                data-testid="checkbox-anonymous"
              />
              <label htmlFor="anonymous" className="text-sm">
                Display as Anonymous on leaderboard
              </label>
            </div>

            <div className="flex items-center gap-2">
              <input
                id="display-leaderboard"
                type="checkbox"
                checked={displayOnLeaderboard}
                onChange={(e) => setDisplayOnLeaderboard(e.target.checked)}
                className="rounded"
                data-testid="checkbox-display-leaderboard"
              />
              <label htmlFor="display-leaderboard" className="text-sm">
                Show my contribution on the leaderboard
              </label>
            </div>
          </CardContent>
        </Card>

        {/* Leaderboard Section */}
        {leaderboard && leaderboard.length > 0 && (
          <Card className="max-w-4xl mx-auto">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Trophy className="w-5 h-5 text-amber-500" />
                Top Contributors
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {leaderboard.slice(0, 10).map((entry, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-3 rounded-lg bg-muted/50 hover-elevate"
                    data-testid={`leaderboard-entry-${index}`}
                  >
                    <div className="flex items-center gap-3">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold ${
                        index === 0 ? 'bg-amber-500 text-white' :
                        index === 1 ? 'bg-gray-400 text-white' :
                        index === 2 ? 'bg-orange-600 text-white' :
                        'bg-muted text-foreground'
                      }`}>
                        {index + 1}
                      </div>
                      <div>
                        <div className="font-semibold">{entry.contributorName}</div>
                        {!entry.isAnonymous && entry.contributorEmail && (
                          <div className="text-xs text-muted-foreground">{entry.contributorEmail}</div>
                        )}
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="flex items-center gap-1 text-amber-500 font-bold">
                        <Star className="w-4 h-4" />
                        {entry.totalStars.toLocaleString()}
                      </div>
                      <div className="text-xs text-muted-foreground">${entry.totalAmountUSD.toLocaleString()}</div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Impact Benefits */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
          <Card className="p-6">
            <div className="flex flex-col items-center text-center">
              <div className="w-12 h-12 rounded-full bg-emerald-500/20 flex items-center justify-center mb-4">
                <Heart className="w-6 h-6 text-emerald-500" />
              </div>
              <h3 className="font-bold mb-2">Clean Water Access</h3>
              <p className="text-sm text-muted-foreground">
                Fund water purification systems in communities lacking clean drinking water
              </p>
            </div>
          </Card>

          <Card className="p-6">
            <div className="flex flex-col items-center text-center">
              <div className="w-12 h-12 rounded-full bg-blue-500/20 flex items-center justify-center mb-4">
                <Shield className="w-6 h-6 text-blue-500" />
              </div>
              <h3 className="font-bold mb-2">Renewable Energy</h3>
              <p className="text-sm text-muted-foreground">
                Support solar panel installations and wind energy projects in developing regions
              </p>
            </div>
          </Card>

          <Card className="p-6">
            <div className="flex flex-col items-center text-center">
              <div className="w-12 h-12 rounded-full bg-purple-500/20 flex items-center justify-center mb-4">
                <Award className="w-6 h-6 text-purple-500" />
              </div>
              <h3 className="font-bold mb-2">Education & Training</h3>
              <p className="text-sm text-muted-foreground">
                Enable sustainability education programs and environmental awareness campaigns
              </p>
            </div>
          </Card>
        </div>
      </div>
    </section>
  );
}
