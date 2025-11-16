import { useState } from "react";
import { Link } from "wouter";
import { Star, Trophy, Heart, Sparkles, TrendingUp, Users, Globe, ArrowRight, Gift, Shield, Award, Recycle, ChevronDown, ChevronUp, Handshake, Building, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Form, FormControl, FormField, FormItem, FormLabel } from "@/components/ui/form";
import { useToast } from "@/hooks/use-toast";
import { useMutation, useQuery } from "@tanstack/react-query";
import { apiRequest, queryClient } from "@/lib/queryClient";
import sustainabilityImage from "@assets/stock_images/people_volunteers_co_32938821.jpg";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

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

const contributorFormSchema = z.object({
  contributorName: z.string().min(1, "Name is required"),
  contributorEmail: z.string().email("Valid email is required"),
  isAnonymous: z.boolean().default(false),
  displayOnLeaderboard: z.boolean().default(true),
});

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
  const [showSustainabilitySection, setShowSustainabilitySection] = useState(false);
  const { toast } = useToast();

  // Form with zod validation
  const form = useForm<z.infer<typeof contributorFormSchema>>({
    resolver: zodResolver(contributorFormSchema),
    defaultValues: {
      contributorName: "",
      contributorEmail: "",
      isAnonymous: false,
      displayOnLeaderboard: true,
    },
  });

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

  const handlePurchase = async (tier: StarsTier) => {
    // Trigger validation
    const isValid = await form.trigger();
    
    if (!isValid) {
      const errors = form.formState.errors;
      const errorMessage = errors.contributorName?.message || errors.contributorEmail?.message || "Please provide valid information to continue.";
      
      toast({
        title: "Information Required",
        description: errorMessage,
        variant: "destructive",
      });
      return;
    }

    const formValues = form.getValues();
    
    purchaseMutation.mutate({
      amountUSD: tier.amountUSD,
      starsAwarded: tier.stars,
      contributorName: formValues.contributorName,
      contributorEmail: formValues.contributorEmail,
      isAnonymous: formValues.isAnonymous,
      displayOnLeaderboard: formValues.displayOnLeaderboard,
    });
  };

  return (
    <section className="py-12 px-4 relative overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 bg-gradient-to-b from-primary/5 to-transparent pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Always Visible Banner - Image & Text Side by Side */}
        <Card className="mb-8 overflow-hidden border-2 border-primary/20">
          <CardContent className="p-0">
            <div className="grid md:grid-cols-2 gap-0">
              {/* Image Side */}
              <div className="relative h-full min-h-[400px] md:min-h-[500px]">
                <img
                  src={sustainabilityImage}
                  alt="Global Sustainability - Hands in Hand for Environmental Impact"
                  className="w-full h-full object-cover"
                  data-testid="image-sustainability-banner"
                />
              </div>

              {/* Content Side */}
              <div className="p-8 md:p-12 flex flex-col justify-center bg-gradient-to-br from-primary/5 to-accent/5">
                <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full border border-primary/20 mb-4 w-fit">
                  <Sparkles className="w-4 h-4 flex-shrink-0" />
                  <span className="font-bold text-sm">AMPLIFY YOUR IMPACT</span>
                </div>

                <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent">
                  Support Global Sustainability
                </h2>

                <p className="text-base md:text-lg text-muted-foreground mb-6">
                  Join our mission to create lasting environmental impact. Every contribution supports clean water access, e-waste recycling, and sustainable communities worldwide.
                </p>

                {/* Stats - Always Visible */}
                {stats && (
                  <div className="grid grid-cols-2 gap-4 mb-6">
                    <div className="bg-card/50 rounded-lg p-4 border border-border">
                      <div className="flex items-center gap-2 mb-2">
                        <div className="w-8 h-8 rounded-full bg-amber-500/20 flex items-center justify-center">
                          <Star className="w-4 h-4 text-amber-500" />
                        </div>
                        <span className="text-xs text-muted-foreground">Stars Awarded</span>
                      </div>
                      <div className="text-2xl font-bold text-primary">{stats.totalStarsAwarded.toLocaleString()}</div>
                    </div>
                    <div className="bg-card/50 rounded-lg p-4 border border-border">
                      <div className="flex items-center gap-2 mb-2">
                        <div className="w-8 h-8 rounded-full bg-emerald-500/20 flex items-center justify-center">
                          <TrendingUp className="w-4 h-4 text-emerald-500" />
                        </div>
                        <span className="text-xs text-muted-foreground">Raised</span>
                      </div>
                      <div className="text-2xl font-bold text-primary">${stats.totalAmountUSD.toLocaleString()}</div>
                    </div>
                  </div>
                )}

                <div className="flex flex-col gap-3">
                  <Button
                    onClick={() => setShowSustainabilitySection(!showSustainabilitySection)}
                    size="lg"
                    className="bg-gradient-to-r from-emerald-600 to-blue-600 hover:from-emerald-700 hover:to-blue-700 text-white font-bold shadow-xl w-full"
                    data-testid="button-join-sustainability-journey"
                  >
                    <Handshake className="w-5 h-5 mr-2" />
                    {showSustainabilitySection ? 'Hide Details' : 'Join the Sustainability Journey'}
                    {showSustainabilitySection ? <ChevronUp className="w-5 h-5 ml-2" /> : <ChevronDown className="w-5 h-5 ml-2" />}
                  </Button>
                  <Link href="/partners" className="w-full">
                    <Button
                      size="lg"
                      variant="outline"
                      className="font-bold border-2 border-primary w-full"
                      data-testid="button-partners-link"
                    >
                      <Handshake className="w-5 h-5 mr-2" />
                      Learn About Partnerships
                    </Button>
                  </Link>
                </div>
                <p className="text-muted-foreground text-sm mt-4 text-center">
                  {showSustainabilitySection ? 'Explore contribution options below' : 'Click to explore how you can make a difference'}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Collapsible Content */}
        {showSustainabilitySection && (
          <div className="animate-in slide-in-from-top duration-500">
            {/* Discover Your Path Forward - Step 1, 2, 3 Pattern */}
            <div className="mb-12">
              <div className="text-center mb-8">
                <h3 className="text-3xl md:text-4xl font-bold mb-4">
                  Discover Your <span className="bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent">Path Forward</span>
                </h3>
                <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
                  Every path to environmental impact is unique. Whether you're exploring individual solutions, considering corporate sustainability, or building community initiatives - we're here to help you find what works best for your goals.
                </p>
              </div>

              <div className="grid md:grid-cols-3 gap-6 mb-8">
                {/* Step 1: Individual Explorer */}
                <div className="relative">
                  <Card className="h-full overflow-hidden border-2 border-cyan-500/30 hover-elevate" data-testid="card-individual-explorer">
                    <CardContent className="p-6">
                      <div className="flex items-center gap-3 mb-4">
                        <div className="w-12 h-12 bg-cyan-500/20 rounded-full flex items-center justify-center flex-shrink-0">
                          <span className="text-2xl font-bold text-cyan-400">1</span>
                        </div>
                        <div className="w-12 h-12 bg-cyan-500/20 rounded-full flex items-center justify-center flex-shrink-0">
                          <Users className="w-6 h-6 text-cyan-400" />
                        </div>
                      </div>
                      <h4 className="text-xl font-bold mb-3">Individual Explorer</h4>
                      <p className="text-muted-foreground mb-4">
                        Perfect for those curious about device recycling and water conservation.
                      </p>
                      <div className="space-y-2 text-sm mb-6">
                        <div className="flex items-center gap-2 text-muted-foreground">
                          <div className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
                          Device valuation & trade
                        </div>
                        <div className="flex items-center gap-2 text-muted-foreground">
                          <div className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
                          Water filtration credits
                        </div>
                        <div className="flex items-center gap-2 text-muted-foreground">
                          <div className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
                          Planet Points earning
                        </div>
                        <div className="flex items-center gap-2 text-muted-foreground">
                          <div className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
                          Loyalty member benefits
                        </div>
                      </div>
                      <Link href="/aquacafe">
                        <Button className="w-full bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-700 hover:to-blue-700" data-testid="button-learn-individual">
                          Learn More
                          <ChevronRight className="w-4 h-4 ml-2" />
                        </Button>
                      </Link>
                    </CardContent>
                  </Card>
                  <div className="hidden md:block absolute top-1/2 -right-3 transform -translate-y-1/2 z-10">
                    <ArrowRight className="w-6 h-6 text-emerald-400" />
                  </div>
                </div>

                {/* Step 2: Corporate Solutions */}
                <div className="relative">
                  <Card className="h-full overflow-hidden border-2 border-emerald-500/30 hover-elevate" data-testid="card-corporate-solutions">
                    <CardContent className="p-6">
                      <div className="flex items-center gap-3 mb-4">
                        <div className="w-12 h-12 bg-emerald-500/20 rounded-full flex items-center justify-center flex-shrink-0">
                          <span className="text-2xl font-bold text-emerald-400">2</span>
                        </div>
                        <div className="w-12 h-12 bg-emerald-500/20 rounded-full flex items-center justify-center flex-shrink-0">
                          <Building className="w-6 h-6 text-emerald-400" />
                        </div>
                      </div>
                      <h4 className="text-xl font-bold mb-3">Corporate Solutions</h4>
                      <p className="text-muted-foreground mb-4">
                        Designed for organizations interested in comprehensive sustainability programs.
                      </p>
                      <div className="space-y-2 text-sm mb-6">
                        <div className="flex items-center gap-2 text-muted-foreground">
                          <div className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                          Bulk device processing
                        </div>
                        <div className="flex items-center gap-2 text-muted-foreground">
                          <div className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                          ESG impact reporting
                        </div>
                        <div className="flex items-center gap-2 text-muted-foreground">
                          <div className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                          Employee engagement
                        </div>
                        <div className="flex items-center gap-2 text-muted-foreground">
                          <div className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                          Enterprise discounts
                        </div>
                      </div>
                      <Link href="/partners">
                        <Button className="w-full bg-gradient-to-r from-emerald-600 to-green-600 hover:from-emerald-700 hover:to-green-700" data-testid="button-explore-corporate">
                          Explore Options
                          <ChevronRight className="w-4 h-4 ml-2" />
                        </Button>
                      </Link>
                    </CardContent>
                  </Card>
                  <div className="hidden md:block absolute top-1/2 -right-3 transform -translate-y-1/2 z-10">
                    <ArrowRight className="w-6 h-6 text-purple-400" />
                  </div>
                </div>

                {/* Step 3: Community Initiatives */}
                <Card className="h-full overflow-hidden border-2 border-purple-500/30 hover-elevate" data-testid="card-community-initiatives">
                  <CardContent className="p-6">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-12 h-12 bg-purple-500/20 rounded-full flex items-center justify-center flex-shrink-0">
                        <span className="text-2xl font-bold text-purple-400">3</span>
                      </div>
                      <div className="w-12 h-12 bg-purple-500/20 rounded-full flex items-center justify-center flex-shrink-0">
                        <Heart className="w-6 h-6 text-purple-400" />
                      </div>
                    </div>
                    <h4 className="text-xl font-bold mb-3">Community Initiatives</h4>
                    <p className="text-muted-foreground mb-4">
                      Ideal for neighborhoods and communities who want to collaborate on sustainability goals.
                    </p>
                    <div className="space-y-2 text-sm mb-6">
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <div className="w-1.5 h-1.5 rounded-full bg-purple-400" />
                        Community leaderboards
                      </div>
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <div className="w-1.5 h-1.5 rounded-full bg-purple-400" />
                        Shared starter kits
                      </div>
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <div className="w-1.5 h-1.5 rounded-full bg-purple-400" />
                        Collective impact tracking
                      </div>
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <div className="w-1.5 h-1.5 rounded-full bg-purple-400" />
                        Group rewards & benefits
                      </div>
                    </div>
                    <Link href="/leaderboard">
                      <Button className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700" data-testid="button-discover-community">
                        Discover Benefits
                        <ChevronRight className="w-4 h-4 ml-2" />
                      </Button>
                    </Link>
                  </CardContent>
                </Card>
              </div>
            </div>

            {/* Compact Interactive Stars Tiers */}
            <div className="mb-12">
          <Card className="overflow-hidden">
            <CardContent className="p-6">
              {/* Tier Selection Grid - Compact */}
              <div className="grid grid-cols-2 md:grid-cols-5 gap-3 mb-6">
                {STARS_TIERS.map((tier) => (
                  <button
                    key={tier.id}
                    onClick={() => setSelectedTier(tier)}
                    className={`relative p-4 rounded-lg border-2 transition-all ${
                      selectedTier?.id === tier.id
                        ? 'border-primary bg-primary/10 shadow-lg'
                        : 'border-border hover-elevate'
                    }`}
                    data-testid={`stars-tier-${tier.amountUSD}`}
                  >
                    {tier.popular && (
                      <Badge className="absolute -top-2 -right-2 bg-primary text-xs px-2 py-0">
                        Popular
                      </Badge>
                    )}
                    <div className={`w-10 h-10 rounded-full bg-gradient-to-br ${tier.color} mx-auto mb-2 flex items-center justify-center`}>
                      <Star className="w-5 h-5 text-white" />
                    </div>
                    <div className="text-center">
                      <div className="text-sm font-semibold text-foreground mb-1">{tier.label}</div>
                      <div className="text-xl font-bold text-primary">${tier.amountUSD}</div>
                      <div className="text-xs text-muted-foreground">{tier.stars} PICs</div>
                    </div>
                  </button>
                ))}
              </div>

              {/* Selected Tier Action */}
              {selectedTier && (
                <div className="bg-muted/30 rounded-lg p-4 flex items-center justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <div className={`w-12 h-12 rounded-full bg-gradient-to-br ${selectedTier.color} flex items-center justify-center flex-shrink-0`}>
                      <Star className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <div className="font-bold text-foreground">{selectedTier.label} Tier</div>
                      <div className="text-sm text-muted-foreground">${selectedTier.amountUSD} = {selectedTier.stars} Planet Impact Credits</div>
                    </div>
                  </div>
                  <Button
                    onClick={() => handlePurchase(selectedTier)}
                    disabled={purchaseMutation.isPending}
                    className={`bg-gradient-to-r ${selectedTier.color} text-white flex-shrink-0`}
                    data-testid={`button-purchase-stars-${selectedTier.amountUSD}`}
                  >
                    {purchaseMutation.isPending ? (
                      "Processing..."
                    ) : (
                      <>
                        Contribute <ArrowRight className="w-4 h-4 ml-1 flex-shrink-0" />
                      </>
                    )}
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Compact Contributor Form */}
        <Card className="mb-12 max-w-3xl mx-auto">
          <CardContent className="p-6">
            <Form {...form}>
              <div className="grid md:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="contributorName"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input
                          {...field}
                          placeholder="Your name"
                          data-testid="input-contributor-name"
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="contributorEmail"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input
                          {...field}
                          type="email"
                          placeholder="Your email"
                          data-testid="input-contributor-email"
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
              </div>
              <div className="flex flex-wrap gap-4 mt-4">
                <FormField
                  control={form.control}
                  name="isAnonymous"
                  render={({ field }) => (
                    <FormItem>
                      <div className="flex items-center gap-2">
                        <FormControl>
                          <Checkbox
                            checked={field.value}
                            onCheckedChange={field.onChange}
                            data-testid="checkbox-anonymous"
                          />
                        </FormControl>
                        <FormLabel className="text-sm cursor-pointer !mt-0">
                          Display as Anonymous
                        </FormLabel>
                      </div>
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="displayOnLeaderboard"
                  render={({ field }) => (
                    <FormItem>
                      <div className="flex items-center gap-2">
                        <FormControl>
                          <Checkbox
                            checked={field.value}
                            onCheckedChange={field.onChange}
                            data-testid="checkbox-display-leaderboard"
                          />
                        </FormControl>
                        <FormLabel className="text-sm cursor-pointer !mt-0">
                          Show on leaderboard
                        </FormLabel>
                      </div>
                    </FormItem>
                  )}
                />
              </div>
            </Form>
          </CardContent>
        </Card>

            {/* Leaderboard Section */}
            {leaderboard && leaderboard.length > 0 && (
              <Card className="max-w-4xl mx-auto mb-12">
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
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
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
                    <Recycle className="w-6 h-6 text-blue-500" />
                  </div>
                  <h3 className="font-bold mb-2">Recycling E-waste</h3>
                  <p className="text-sm text-muted-foreground">
                    Support responsible electronics recycling and device trade-in programs for sustainable tech consumption
                  </p>
                </div>
              </Card>

              <Card className="p-6">
                <div className="flex flex-col items-center text-center">
                  <div className="w-12 h-12 rounded-full bg-purple-500/20 flex items-center justify-center mb-4">
                    <Users className="w-6 h-6 text-purple-500" />
                  </div>
                  <h3 className="font-bold mb-2">Awareness</h3>
                  <p className="text-sm text-muted-foreground">
                    Enable community awareness programs and environmental action campaigns
                  </p>
                </div>
              </Card>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
