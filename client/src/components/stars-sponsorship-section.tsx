import { useState } from "react";
import { Star, Trophy, Heart, Sparkles, TrendingUp, Users, Globe, ArrowRight, Gift, Shield, Award, Recycle } from "lucide-react";
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
import sustainabilityImage from "@assets/stock_images/clean_water_sustaina_ba5cf3da.jpg";
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

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Hero Section with Image */}
        <div className="grid md:grid-cols-2 gap-8 items-center mb-12">
          {/* Left: Image */}
          <div className="order-2 md:order-1">
            <div className="rounded-2xl overflow-hidden shadow-2xl">
              <img
                src={sustainabilityImage}
                alt="Global Sustainability - Clean Water and Environmental Initiatives"
                className="w-full h-auto object-cover"
              />
            </div>
          </div>

          {/* Right: Content */}
          <div className="order-1 md:order-2">
            <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full border border-primary/20 mb-4">
              <Sparkles className="w-4 h-4 flex-shrink-0" />
              <span className="font-bold text-sm">AMPLIFY YOUR IMPACT</span>
            </div>
            
            <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent">
              Support Global Sustainability
            </h2>
            
            <p className="text-base text-muted-foreground mb-6">
              Join our mission to create lasting environmental impact. Every contribution supports clean water access, e-waste recycling, and sustainable communities worldwide.
            </p>

            {/* Compact Stats */}
            {stats && (
              <div className="flex flex-wrap gap-4 mb-6">
                <div className="flex items-center gap-2">
                  <div className="w-10 h-10 rounded-full bg-amber-500/20 flex items-center justify-center">
                    <Star className="w-5 h-5 text-amber-500" />
                  </div>
                  <div>
                    <div className="text-lg font-bold text-primary">{stats.totalStarsAwarded.toLocaleString()}</div>
                    <div className="text-xs text-muted-foreground">Stars Awarded</div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-10 h-10 rounded-full bg-emerald-500/20 flex items-center justify-center">
                    <TrendingUp className="w-5 h-5 text-emerald-500" />
                  </div>
                  <div>
                    <div className="text-lg font-bold text-primary">${stats.totalAmountUSD.toLocaleString()}</div>
                    <div className="text-xs text-muted-foreground">Raised</div>
                  </div>
                </div>
              </div>
            )}
          </div>
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
                  className={`w-full bg-gradient-to-r ${tier.color} text-white`}
                  data-testid={`button-purchase-stars-${tier.amountUSD}`}
                >
                  {purchaseMutation.isPending && selectedTier?.id === tier.id ? (
                    "Processing..."
                  ) : (
                    <>
                      Contribute <ArrowRight className="w-4 h-4 ml-1 flex-shrink-0" />
                    </>
                  )}
                </Button>
              </CardContent>
            </Card>
          ))}
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
    </section>
  );
}
