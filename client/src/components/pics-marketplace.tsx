import { useState } from "react";
import { Star, TrendingUp, ArrowRight, Heart, Recycle, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { useToast } from "@/hooks/use-toast";
import { useMutation, useQuery } from "@tanstack/react-query";
import { apiRequest, queryClient } from "@/lib/queryClient";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

interface PICTier {
  id: string;
  amountUSD: number;
  pics: number;
  label: string;
  color: string;
  popular?: boolean;
}

const PIC_TIERS: PICTier[] = [
  { id: "tier-20", amountUSD: 20, pics: 20, label: "Starter", color: "from-blue-500 to-cyan-500" },
  { id: "tier-50", amountUSD: 50, pics: 50, label: "Supporter", color: "from-emerald-500 to-teal-500" },
  { id: "tier-100", amountUSD: 100, pics: 100, label: "Champion", color: "from-amber-500 to-orange-500", popular: true },
  { id: "tier-250", amountUSD: 250, pics: 250, label: "Hero", color: "from-purple-500 to-pink-500" },
  { id: "tier-500", amountUSD: 500, pics: 500, label: "Legend", color: "from-red-500 to-rose-500" }
];

const contributorFormSchema = z.object({
  contributorName: z.string().min(1, "Name is required"),
  contributorEmail: z.string().email("Valid email is required"),
  isAnonymous: z.boolean().default(false),
  displayOnLeaderboard: z.boolean().default(true),
});

interface StarsStats {
  totalContributions: number;
  totalAmountUSD: number;
  totalStarsAwarded: number;
  totalContributors: number;
}

export function PICSMarketplace() {
  const [selectedTier, setSelectedTier] = useState<PICTier | null>(null);
  const { toast } = useToast();

  const form = useForm<z.infer<typeof contributorFormSchema>>({
    resolver: zodResolver(contributorFormSchema),
    defaultValues: {
      contributorName: "",
      contributorEmail: "",
      isAnonymous: false,
      displayOnLeaderboard: true,
    },
  });

  // Fetch stats (using Stars API, convert to PICs for display)
  const { data: stats } = useQuery<StarsStats>({
    queryKey: ['/api/stars/stats'],
  });

  // Purchase mutation (uses Stars API backend with 10:1 conversion)
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
      queryClient.invalidateQueries({ queryKey: ['/api/stars/stats'] });
      queryClient.invalidateQueries({ queryKey: ['/api/stars/leaderboard'] });

      toast({
        title: "Purchase Initiated!",
        description: `Redirecting you to PayPal to complete your $${selectedTier?.amountUSD} USD contribution for ${selectedTier?.pics} PICs...`,
      });

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

  const handlePurchase = async (tier: PICTier) => {
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
    
    // Convert PICs to Stars for backend (10 Stars = 1 PIC)
    const starsAmount = tier.pics * 10;
    
    purchaseMutation.mutate({
      amountUSD: tier.amountUSD,
      starsAwarded: starsAmount,
      contributorName: formValues.contributorName,
      contributorEmail: formValues.contributorEmail,
      isAnonymous: formValues.isAnonymous,
      displayOnLeaderboard: formValues.displayOnLeaderboard,
    });
  };

  // Convert Stars stats to PICs for display
  const totalPICs = stats ? Math.floor(stats.totalStarsAwarded / 10) : 0;

  return (
    <div className="space-y-8">
      {/* Stats Section */}
      {stats && stats.totalAmountUSD > 0 && (
        <div className="flex flex-wrap gap-6 justify-center mb-8">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full bg-amber-500/20 flex items-center justify-center">
              <Star className="w-6 h-6 text-amber-400" />
            </div>
            <div>
              <div className="text-2xl font-bold text-emerald-400">{totalPICs.toLocaleString()}</div>
              <div className="text-sm text-gray-400">PICs Funded</div>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full bg-emerald-500/20 flex items-center justify-center">
              <TrendingUp className="w-6 h-6 text-emerald-400" />
            </div>
            <div>
              <div className="text-2xl font-bold text-emerald-400">${stats.totalAmountUSD.toLocaleString()}</div>
              <div className="text-sm text-gray-400">Total Raised</div>
            </div>
          </div>
        </div>
      )}

      {/* PIC Purchase Tiers */}
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
        {PIC_TIERS.map((tier) => (
          <Card
            key={tier.id}
            className={`relative overflow-hidden transition-all duration-300 bg-slate-800/50 border-slate-700 ${
              selectedTier?.id === tier.id ? 'ring-2 ring-emerald-500 shadow-lg scale-105' : 'hover:shadow-md hover:border-emerald-500/50'
            } ${tier.popular ? 'border-emerald-500 border-2' : ''}`}
            data-testid={`pic-tier-${tier.amountUSD}`}
          >
            {tier.popular && (
              <div className="absolute top-0 right-0 bg-emerald-500 text-white px-3 py-1 text-xs font-bold rounded-bl-lg">
                POPULAR
              </div>
            )}
            
            <CardHeader className="p-4">
              <div className={`w-12 h-12 rounded-full bg-gradient-to-br ${tier.color} mx-auto mb-2 flex items-center justify-center`}>
                <Star className="w-6 h-6 text-white" />
              </div>
              <CardTitle className="text-center text-lg text-white">{tier.label}</CardTitle>
            </CardHeader>

            <CardContent className="p-4 pt-0">
              <div className="text-center mb-4">
                <div className="text-3xl font-bold text-emerald-400 mb-1">${tier.amountUSD}</div>
                <div className="text-sm text-gray-300">{tier.pics} PICs</div>
                <div className="text-xs text-gray-500 mt-1">($1 = 1 PIC)</div>
              </div>

              <Button
                onClick={() => {
                  setSelectedTier(tier);
                  handlePurchase(tier);
                }}
                disabled={purchaseMutation.isPending}
                className={`w-full bg-gradient-to-r ${tier.color} text-white hover:opacity-90`}
                data-testid={`button-purchase-pic-${tier.amountUSD}`}
              >
                {purchaseMutation.isPending && selectedTier?.id === tier.id ? (
                  "Processing..."
                ) : (
                  <>
                    Fund Impact <ArrowRight className="w-4 h-4 ml-1 flex-shrink-0" />
                  </>
                )}
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Contributor Form */}
      <Card className="max-w-3xl mx-auto bg-slate-800/50 border-slate-700">
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
                        className="bg-slate-900/50 border-slate-700 text-white"
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
                        className="bg-slate-900/50 border-slate-700 text-white"
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
                      <Label className="text-sm text-gray-300 cursor-pointer !mt-0">
                        Display as Anonymous
                      </Label>
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
                      <Label className="text-sm text-gray-300 cursor-pointer !mt-0">
                        Show on leaderboard
                      </Label>
                    </div>
                  </FormItem>
                )}
              />
            </div>
          </Form>
        </CardContent>
      </Card>

      {/* Impact Benefits */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="p-6 bg-slate-800/50 border-slate-700">
          <div className="flex flex-col items-center text-center">
            <div className="w-12 h-12 rounded-full bg-emerald-500/20 flex items-center justify-center mb-4">
              <Heart className="w-6 h-6 text-emerald-400" />
            </div>
            <h3 className="font-bold text-white mb-2">Clean Water Access</h3>
            <p className="text-sm text-gray-400">
              Fund water purification systems in communities lacking clean drinking water
            </p>
          </div>
        </Card>

        <Card className="p-6 bg-slate-800/50 border-slate-700">
          <div className="flex flex-col items-center text-center">
            <div className="w-12 h-12 rounded-full bg-blue-500/20 flex items-center justify-center mb-4">
              <Recycle className="w-6 h-6 text-blue-400" />
            </div>
            <h3 className="font-bold text-white mb-2">Recycling E-waste</h3>
            <p className="text-sm text-gray-400">
              Support responsible electronics recycling and device trade-in programs
            </p>
          </div>
        </Card>

        <Card className="p-6 bg-slate-800/50 border-slate-700">
          <div className="flex flex-col items-center text-center">
            <div className="w-12 h-12 rounded-full bg-purple-500/20 flex items-center justify-center mb-4">
              <Users className="w-6 h-6 text-purple-400" />
            </div>
            <h3 className="font-bold text-white mb-2">Community Awareness</h3>
            <p className="text-sm text-gray-400">
              Enable community awareness programs and environmental action campaigns
            </p>
          </div>
        </Card>
      </div>
    </div>
  );
}
