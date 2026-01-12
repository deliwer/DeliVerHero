import { useState } from "react";
import { Link } from "wouter";
import { Star, Trophy, Heart, Sparkles, TrendingUp, Users, Globe, ArrowRight, Gift, Shield, Award, Recycle, ChevronDown, ChevronUp, Handshake, Building, ChevronRight, Gamepad2, Coins } from "lucide-react";
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
        {/* Collapsible Section Header - Matching Water Section Style */}
        <div className="text-center mb-8">
          <h2 className="text-3xl md:text-5xl font-black mb-4">
            <button
              className="cursor-pointer hover:scale-105 transition-all duration-300 border-0 bg-transparent p-0 inline-flex items-center gap-3"
              onClick={() => setShowSustainabilitySection(!showSustainabilitySection)}
              aria-expanded={showSustainabilitySection}
              aria-label="Toggle Live in Dubai section"
              data-testid="button-join-sustainability-journey"
            >
              <span className="bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent">
                Relocate & Play: Dubai's Green Future
              </span>
              {showSustainabilitySection ? (
                <ChevronUp className="w-8 h-8 text-emerald-400" />
              ) : (
                <ChevronDown className="w-8 h-8 text-emerald-400" />
              )}
            </button>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-4">
            Relocation with purpose: Gamifying sustainability for Dubai residents
          </p>
        </div>

        {/* Always Visible Banner - Relocation & Gaming Focus */}
        <Card className="mb-8 overflow-hidden border-2 border-primary/20">
          <CardContent className="p-0">
            <div className="grid md:grid-cols-2 gap-0">
              {/* Image Side */}
              <div className="relative h-full min-h-[400px] md:min-h-[500px] flex items-center justify-center bg-gradient-to-br from-emerald-50 to-blue-50 dark:from-emerald-950 dark:to-blue-950 p-8">
                <div className="w-full max-w-md">
                  <img
                    src={sustainabilityImage}
                    alt="Dubai Green Relocation - Planet Hero Gaming"
                    className="w-full h-auto rounded-lg shadow-lg"
                    data-testid="image-sustainability-banner"
                  />
                </div>
              </div>

              {/* Content Side */}
              <div className="p-8 md:p-12 flex flex-col justify-center bg-gradient-to-br from-primary/5 to-accent/5">
                <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full border border-primary/20 mb-4 w-fit">
                  <Gamepad2 className="w-4 h-4 flex-shrink-0" />
                  <span className="font-bold text-sm text-emerald-500">RESIDENT IMPACT</span>
                </div>

                <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 bg-gradient-to-r from-emerald-500 via-teal-500 to-blue-500 bg-clip-text text-transparent">
                  Live, Play, Impact Dubai
                </h2>

                <p className="text-base md:text-lg text-muted-foreground mb-6">
                  Make Dubai your home and join Planet Hero Gaming. Every mission you complete in the game funds local environmental impact, from water security to e-waste recycling.
                </p>

                {/* Compact Stats */}
                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div className="bg-card/50 rounded-lg p-4 border border-border">
                    <div className="text-xs text-muted-foreground mb-1">Impact Tokens</div>
                    <div className="text-2xl font-bold text-primary">DXB Earned</div>
                  </div>
                  <div className="bg-card/50 rounded-lg p-4 border border-border">
                    <div className="text-xs text-muted-foreground mb-1">Local Support</div>
                    <div className="text-2xl font-bold text-primary">Partners</div>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-3">
                  <Link href="/play" className="flex-1">
                    <Button className="w-full bg-emerald-500 hover:bg-emerald-600 text-white font-bold rounded-full">
                      Start Playing
                    </Button>
                  </Link>
                  <Link href="/earn" className="flex-1">
                    <Button variant="outline" className="w-full border-emerald-500 text-emerald-500 hover:bg-emerald-500/10 rounded-full">
                      Earn DXB
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Partners CTA - Refined for Calm, Human Feel */}
        <div className="mb-12 max-w-2xl mx-auto text-center">
          <div className="space-y-6">
            <p className="text-lg text-muted-foreground italic">
              "We believe in making Dubai's green transition simple for everyone."
            </p>
            <Link href="/partners" className="block">
              <Button
                size="lg"
                className="w-full bg-slate-900 hover:bg-slate-800 text-white font-bold py-6 text-lg shadow-xl rounded-full border border-white/10 transform hover:scale-105 transition-all"
                data-testid="button-partners-link"
              >
                <Handshake className="w-5 h-5 mr-3" />
                Partner with DeliWer
                <ArrowRight className="w-5 h-5 ml-3" />
              </Button>
            </Link>
            <p className="text-xs text-gray-500 uppercase tracking-widest">
              Quietly building the future of JVC
            </p>
          </div>
        </div>

        {/* Expandable Content - Shows when expanded */}
        {showSustainabilitySection && (
          <div id="sustainability-options" className="animate-in slide-in-from-top duration-500">

            {/* Discover Your Path Forward - Updated for Relocation Focus */}
            <div className="mb-12">
              <div className="text-center mb-8">
                <h3 className="text-3xl md:text-4xl font-bold mb-4">
                  Why Dubai? <span className="bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent">Relocate with Purpose</span>
                </h3>
                <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
                  Dubai isn't just a destination; it's a global leader in sustainability. Join our community of residents turning daily actions into environmental impact.
                </p>
              </div>

              <div className="grid md:grid-cols-3 gap-6 mb-8">
                {/* Step 1: Resident Hero */}
                <div className="relative">
                  <Card className="h-full overflow-hidden border-2 border-cyan-500/30 hover-elevate" data-testid="card-individual-explorer">
                    <CardContent className="p-6">
                      <div className="flex items-center gap-3 mb-4">
                        <div className="w-12 h-12 bg-cyan-500/20 rounded-full flex items-center justify-center flex-shrink-0">
                          <Gamepad2 className="w-6 h-6 text-cyan-400" />
                        </div>
                      </div>
                      <h4 className="text-xl font-bold mb-3">Resident Hero</h4>
                      <p className="text-muted-foreground mb-4">
                        Play to Earn DXB tokens while contributing to Dubai's green transition.
                      </p>
                      <div className="space-y-2 text-sm mb-6">
                        <div className="flex items-center gap-2 text-muted-foreground">
                          <Coins className="w-4 h-4 text-amber-400" />
                          Earn DXB for sustainable choices
                        </div>
                        <div className="flex items-center gap-2 text-muted-foreground">
                          <Shield className="w-4 h-4 text-emerald-400" />
                          Support local eco-missions
                        </div>
                      </div>
                      <Link href="/play">
                        <Button className="w-full bg-cyan-600 hover:bg-cyan-700">
                          Start Playing
                          <ChevronRight className="w-4 h-4 ml-2" />
                        </Button>
                      </Link>
                    </CardContent>
                  </Card>
                </div>

                {/* Step 2: Eco-Sponsorship */}
                <div className="relative">
                  <Card className="h-full overflow-hidden border-2 border-emerald-500/30 hover-elevate" data-testid="card-corporate-solutions">
                    <CardContent className="p-6">
                      <div className="flex items-center gap-3 mb-4">
                        <div className="w-12 h-12 bg-emerald-500/20 rounded-full flex items-center justify-center flex-shrink-0">
                          <Handshake className="w-6 h-6 text-emerald-400" />
                        </div>
                      </div>
                      <h4 className="text-xl font-bold mb-3">Partner with Us</h4>
                      <p className="text-muted-foreground mb-4">
                        Scale your impact. Sponsors enable large-scale environmental projects across the UAE.
                      </p>
                      <Link href="/partners">
                        <Button className="w-full bg-emerald-600 hover:bg-emerald-700">
                          Partner Portal
                          <ChevronRight className="w-4 h-4 ml-2" />
                        </Button>
                      </Link>
                    </CardContent>
                  </Card>
                </div>

                {/* Step 3: Token Economy */}
                <div className="relative">
                  <Card className="h-full overflow-hidden border-2 border-purple-500/30 hover-elevate" data-testid="card-community-initiatives">
                    <CardContent className="p-6">
                      <div className="flex items-center gap-3 mb-4">
                        <div className="w-12 h-12 bg-purple-500/20 rounded-full flex items-center justify-center flex-shrink-0">
                          <TrendingUp className="w-6 h-6 text-purple-400" />
                        </div>
                      </div>
                      <h4 className="text-xl font-bold mb-3">DXB Economy</h4>
                      <p className="text-muted-foreground mb-4">
                        Your DXB tokens represent real-world impact. Learn how to maximize your earnings.
                      </p>
                      <Link href="/earn">
                        <Button className="w-full bg-purple-600 hover:bg-purple-700">
                          Learn Earning
                          <ChevronRight className="w-4 h-4 ml-2" />
                        </Button>
                      </Link>
                    </CardContent>
                  </Card>
                </div>
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
                      <div className="text-xs text-muted-foreground">{tier.stars} DXBs</div>
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
                      <div className="text-sm text-muted-foreground">${selectedTier.amountUSD} = {selectedTier.stars} Dubai Carbon Tokens</div>
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
                  <p className="text-center text-sm text-muted-foreground mt-6 italic">Many residents continue using DeliWer for ongoing home services after move-in.</p>
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
