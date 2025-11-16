import { useState } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link } from "wouter";
import {
  Star,
  Heart,
  Users,
  Trophy,
  Recycle,
  ChevronDown,
  ChevronUp,
  ChevronRight,
  Building,
  Award,
  ShoppingCart,
  Handshake,
  Sparkles,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useToast } from "@/hooks/use-toast";
import { insertStarsPurchaseSchema, type StarsPurchase } from "@shared/schema";
import { queryClient } from "@/lib/queryClient";

interface StarsStats {
  totalContributions: number;
  totalAmountUSD: number;
  totalStarsAwarded: number;
}

const starsTiers = [
  { stars: 10, amount: 10, description: "Support clean water initiatives", color: "from-blue-500 to-cyan-500" },
  { stars: 25, amount: 25, description: "Fund recycling programs", color: "from-emerald-500 to-green-500" },
  { stars: 50, amount: 50, description: "Enable community awareness", color: "from-purple-500 to-pink-500" },
  { stars: 100, amount: 100, description: "Power multiple initiatives", color: "from-amber-500 to-orange-500" },
  { stars: 250, amount: 250, description: "Create lasting impact", color: "from-rose-500 to-red-500" },
];

export function SustainabilityJourneySection() {
  const [isExpanded, setIsExpanded] = useState(false);
  const [selectedTier, setSelectedTier] = useState<number | null>(null);
  const { toast } = useToast();

  const { data: stats } = useQuery<StarsStats>({
    queryKey: ['/api/stars/stats'],
  });

  const { data: leaderboard } = useQuery<StarsPurchase[]>({
    queryKey: ['/api/stars/leaderboard'],
  });

  const form = useForm({
    resolver: zodResolver(insertStarsPurchaseSchema),
    defaultValues: {
      starsTier: "10",
      contributorName: "",
      contributorEmail: "",
      isAnonymous: false,
      displayOnLeaderboard: true,
      heroId: undefined,
    },
  });

  const contributionMutation = useMutation({
    mutationFn: async (data: typeof insertStarsPurchaseSchema._type) => {
      const response = await fetch('/api/stars/contribute', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      if (!response.ok) throw new Error('Contribution failed');
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/stars/stats'] });
      queryClient.invalidateQueries({ queryKey: ['/api/stars/leaderboard'] });
      toast({
        title: "Thank you for your contribution!",
        description: `You've earned ${selectedTier} Planet Impact Credits!`,
      });
      form.reset();
      setSelectedTier(null);
    },
    onError: () => {
      toast({
        title: "Contribution failed",
        description: "Please try again later.",
        variant: "destructive",
      });
    },
  });

  const onSubmit = (data: typeof insertStarsContributionSchema._type) => {
    if (!selectedTier) {
      toast({
        title: "Please select a tier",
        description: "Choose a contribution level to continue.",
        variant: "destructive",
      });
      return;
    }
    contributionMutation.mutate(data);
  };

  return (
    <section className="py-12 px-4 bg-gradient-to-b from-slate-900 via-blue-900 to-slate-900">
      <div className="max-w-6xl mx-auto">
        {/* Always Visible Banner */}
        <div className="mb-6">
          {/* Sustainability Image Banner */}
          <div className="relative rounded-2xl overflow-hidden mb-6">
            <div className="absolute inset-0 bg-gradient-to-r from-emerald-900/90 via-blue-900/80 to-slate-900/90 z-10"></div>
            <img 
              src="https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=1200&h=400&fit=crop"
              alt="Global Sustainability"
              className="w-full h-64 object-cover"
            />
            <div className="absolute inset-0 z-20 flex flex-col items-center justify-center text-center p-8">
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
                Support Global <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-400">Sustainability</span>
              </h2>
              <p className="text-xl text-gray-200 max-w-3xl">
                Join our mission to create clean water access, enable responsible e-waste recycling, and drive environmental awareness campaigns worldwide.
              </p>
            </div>
          </div>

          {/* Global Stats - Always Visible */}
          <div className="grid grid-cols-2 gap-4 mb-6">
            <Card className="bg-gradient-to-br from-amber-500/10 to-orange-500/10 border-amber-500/20">
              <CardContent className="p-6 text-center">
                <div className="flex items-center justify-center gap-2 mb-2">
                  <Star className="w-6 h-6 text-amber-500" />
                  <div className="text-3xl font-bold text-white">{stats?.totalStarsAwarded.toLocaleString() || 0}</div>
                </div>
                <div className="text-sm text-gray-300">Planet Impact Credits Awarded</div>
              </CardContent>
            </Card>
            <Card className="bg-gradient-to-br from-emerald-500/10 to-green-500/10 border-emerald-500/20">
              <CardContent className="p-6 text-center">
                <div className="flex items-center justify-center gap-2 mb-2">
                  <Heart className="w-6 h-6 text-emerald-500" />
                  <div className="text-3xl font-bold text-white">${stats?.totalAmountUSD.toLocaleString() || 0}</div>
                </div>
                <div className="text-sm text-gray-300">Total Raised for Sustainability</div>
              </CardContent>
            </Card>
          </div>

          {/* Collapsible Toggle Button */}
          <div className="text-center">
            <Button
              onClick={() => setIsExpanded(!isExpanded)}
              size="lg"
              className="bg-gradient-to-r from-emerald-600 to-blue-600 hover:from-emerald-700 hover:to-blue-700 text-white px-8 py-6 text-xl font-bold shadow-xl"
              data-testid="button-toggle-sustainability"
            >
              <Handshake className="w-6 h-6 mr-3" />
              {isExpanded ? 'Hide' : 'Join the'} Sustainability Journey
              {isExpanded ? <ChevronUp className="w-6 h-6 ml-3" /> : <ChevronDown className="w-6 h-6 ml-3" />}
            </Button>
            <p className="text-gray-400 mt-4">
              {isExpanded ? 'Explore opportunities below' : 'Click to discover partnership opportunities, contribution tiers, and impact initiatives'}
            </p>
          </div>
        </div>

        {/* Collapsible Content */}
        {isExpanded && (
          <div className="animate-in slide-in-from-top duration-500 space-y-12">
            {/* Pathway Cards Section */}
            <div>
              <div className="text-center mb-12">
                <h3 className="text-4xl md:text-5xl font-bold text-white mb-6">
                  Discover Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-green-400">Path Forward</span>
                </h3>
                <p className="text-xl text-gray-300 max-w-4xl mx-auto">
                  Every path to environmental impact is unique. Whether you're exploring individual solutions, considering corporate sustainability, or building community initiatives - we're here to help you find what works best for your goals.
                </p>
              </div>

              <div className="grid md:grid-cols-3 gap-8 mb-12">
                {/* Individual Explorer */}
                <div className="bg-slate-800/50 rounded-2xl p-8 border border-cyan-500/30 hover:bg-slate-800/70 transition-all duration-300 group cursor-pointer">
                  <div className="w-16 h-16 bg-cyan-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
                    <Users className="w-8 h-8 text-cyan-400" />
                  </div>
                  <h4 className="text-2xl font-bold text-white mb-4">Individual Explorer</h4>
                  <p className="text-gray-300 mb-6 opacity-100 group-hover:opacity-80">Perfect for those curious about device recycling and water conservation.</p>
                  <div className="space-y-2 text-sm text-gray-400 mb-8 opacity-0 group-hover:opacity-100 max-h-0 group-hover:max-h-32 overflow-hidden transition-all duration-500">
                    <div>✓ Device valuation & trade</div>
                    <div>✓ Water filtration credits</div>
                    <div>✓ Planet Points earning</div>
                    <div>✓ Loyalty member benefits</div>
                  </div>
                  <Link 
                    href="/aquacafe"
                    className="inline-flex items-center justify-center w-full bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-700 hover:to-blue-700 text-white px-6 py-3 rounded-lg font-semibold transition-all"
                  >
                    Learn More
                    <ChevronRight className="w-5 h-5 ml-2" />
                  </Link>
                </div>

                {/* Corporate Solutions */}
                <div className="bg-slate-800/50 rounded-2xl p-8 border border-emerald-500/30 transform scale-105 hover:bg-slate-800/70 transition-all duration-300 group cursor-pointer">
                  <div className="w-16 h-16 bg-emerald-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
                    <Building className="w-8 h-8 text-emerald-400" />
                  </div>
                  <h4 className="text-2xl font-bold text-white mb-4">Corporate Solutions</h4>
                  <p className="text-gray-300 mb-6 opacity-100 group-hover:opacity-80">Designed for organizations interested in comprehensive sustainability programs.</p>
                  <div className="space-y-2 text-sm text-gray-400 mb-8 opacity-0 group-hover:opacity-100 max-h-0 group-hover:max-h-32 overflow-hidden transition-all duration-500">
                    <div>✓ Bulk device processing</div>
                    <div>✓ ESG impact reporting</div>
                    <div>✓ Employee engagement</div>
                    <div>✓ Enterprise discounts</div>
                  </div>
                  <Link 
                    href="/partners"
                    className="inline-flex items-center justify-center w-full bg-gradient-to-r from-emerald-600 to-green-600 hover:from-emerald-700 hover:to-green-700 text-white px-6 py-3 rounded-lg font-semibold transition-all"
                  >
                    Explore Options
                    <ChevronRight className="w-5 h-5 ml-2" />
                  </Link>
                </div>

                {/* Community Initiatives */}
                <div className="bg-slate-800/50 rounded-2xl p-8 border border-purple-500/30 hover:bg-slate-800/70 transition-all duration-300 group cursor-pointer">
                  <div className="w-16 h-16 bg-purple-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
                    <Heart className="w-8 h-8 text-purple-400" />
                  </div>
                  <h4 className="text-2xl font-bold text-white mb-4">Community Initiatives</h4>
                  <p className="text-gray-300 mb-6 opacity-100 group-hover:opacity-80">Ideal for neighborhoods and communities who want to collaborate on sustainability goals.</p>
                  <div className="space-y-2 text-sm text-gray-400 mb-8 opacity-0 group-hover:opacity-100 max-h-0 group-hover:max-h-32 overflow-hidden transition-all duration-500">
                    <div>✓ Community leaderboards</div>
                    <div>✓ Shared starter kits</div>
                    <div>✓ Collective impact tracking</div>
                    <div>✓ Group rewards & benefits</div>
                  </div>
                  <Link 
                    href="/leaderboard"
                    className="inline-flex items-center justify-center w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-6 py-3 rounded-lg font-semibold transition-all"
                  >
                    Discover Benefits
                    <ChevronRight className="w-5 h-5 ml-2" />
                  </Link>
                </div>
              </div>
            </div>

            {/* Starter Kit CTA */}
            <div className="bg-gradient-to-r from-blue-900/50 to-green-900/50 rounded-3xl p-12 border border-cyan-500/30">
              <div className="max-w-4xl mx-auto">
                <h3 className="text-3xl md:text-4xl font-bold text-white mb-6">
                  <Sparkles className="w-8 h-8 inline-block mr-2 text-emerald-400" />
                  Consider Our Starter Kit: AED 99
                </h3>
                <p className="text-xl text-gray-300 mb-8">
                  For those ready to take the next step, our starter kit provides everything you need to begin your sustainability journey. Includes complimentary installation (AED 299 value) and access to our complete ecosystem.
                </p>
                
                <div className="grid md:grid-cols-2 gap-8 mb-8">
                  <div className="text-left">
                    <h4 className="text-lg font-semibold text-white mb-4">Included in Starter Kit:</h4>
                    <div className="space-y-2 text-gray-300">
                      <div className="flex items-center"><Award className="w-4 h-4 text-green-400 mr-2" />5-Stage Water Filtration System</div>
                      <div className="flex items-center"><Award className="w-4 h-4 text-green-400 mr-2" />Discounted Installation for Loyalty Members (from AED 299)</div>
                      <div className="flex items-center"><Award className="w-4 h-4 text-green-400 mr-2" />Loyalty Membership Access</div>
                      <div className="flex items-center"><Award className="w-4 h-4 text-green-400 mr-2" />Planet Points Earning System</div>
                    </div>
                  </div>
                  <div className="text-left">
                    <h4 className="text-lg font-semibold text-white mb-4">Membership Benefits:</h4>
                    <div className="space-y-2 text-gray-300">
                      <div className="flex items-center"><Award className="w-4 h-4 text-blue-400 mr-2" />Device Trade-in Priority</div>
                      <div className="flex items-center"><Award className="w-4 h-4 text-blue-400 mr-2" />Partnership Program Access</div>
                      <div className="flex items-center"><Award className="w-4 h-4 text-blue-400 mr-2" />Community Challenges</div>
                      <div className="flex items-center"><Award className="w-4 h-4 text-blue-400 mr-2" />Exclusive Discounts & Rewards</div>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Link
                    href="/aquacafe"
                    className="inline-flex items-center justify-center bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white px-8 py-4 rounded-xl text-lg font-bold transition-all transform hover:scale-105"
                  >
                    <ShoppingCart className="w-6 h-6 mr-3" />
                    View Starter Kit Details
                  </Link>
                  <Link
                    href="/partners"
                    className="inline-flex items-center justify-center border-2 border-cyan-500 text-cyan-400 hover:bg-cyan-500 hover:text-white px-8 py-4 rounded-xl text-lg font-bold transition-all transform hover:scale-105"
                  >
                    <Handshake className="w-6 h-6 mr-3" />
                    Learn About Partnerships
                  </Link>
                </div>
              </div>
            </div>

            {/* Stars Tiers Selection */}
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-8">
                <h3 className="text-3xl font-bold text-white mb-4">
                  Choose Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-orange-400">Impact Level</span>
                </h3>
                <p className="text-gray-300">
                  Select a contribution tier to earn Planet Impact Credits (PICs) and support global sustainability initiatives
                </p>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-8">
                {starsTiers.map((tier) => (
                  <button
                    key={tier.stars}
                    type="button"
                    onClick={() => {
                      setSelectedTier(tier.stars);
                      form.setValue('starsTier', tier.amount.toString());
                    }}
                    className={`p-6 rounded-xl border-2 transition-all ${
                      selectedTier === tier.stars
                        ? `bg-gradient-to-br ${tier.color} border-white shadow-xl scale-105`
                        : 'bg-slate-800/50 border-gray-600 hover:border-gray-400'
                    }`}
                    data-testid={`tier-${tier.stars}`}
                  >
                    <div className="flex items-center justify-center gap-2 mb-2">
                      <Star className="w-6 h-6 text-amber-400" />
                      <div className="text-2xl font-bold text-white">{tier.stars}</div>
                    </div>
                    <div className="text-sm text-gray-300">${tier.amount}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Contribution Form */}
            <Card className="max-w-4xl mx-auto bg-slate-800/50 border-emerald-500/20">
              <CardHeader>
                <CardTitle className="text-2xl text-white">Make Your Contribution</CardTitle>
              </CardHeader>
              <CardContent>
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
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
                    <div className="flex flex-wrap gap-4">
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
                              <FormLabel className="text-sm cursor-pointer !mt-0 text-gray-300">
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
                              <FormLabel className="text-sm cursor-pointer !mt-0 text-gray-300">
                                Show on leaderboard
                              </FormLabel>
                            </div>
                          </FormItem>
                        )}
                      />
                    </div>
                    <Button
                      type="submit"
                      className="w-full bg-gradient-to-r from-emerald-600 to-green-600 hover:from-emerald-700 hover:to-green-700 text-white py-6 text-lg font-bold"
                      disabled={contributionMutation.isPending}
                      data-testid="button-submit-contribution"
                    >
                      {contributionMutation.isPending ? 'Processing...' : 'Complete Contribution'}
                    </Button>
                  </form>
                </Form>
              </CardContent>
            </Card>

            {/* Leaderboard */}
            {leaderboard && leaderboard.length > 0 && (
              <Card className="max-w-4xl mx-auto bg-slate-800/50 border-amber-500/20">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-white">
                    <Trophy className="w-5 h-5 text-amber-500" />
                    Top Contributors
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {leaderboard.slice(0, 10).map((entry, index) => (
                      <div
                        key={entry.id}
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
                            <div className="font-semibold text-white">{entry.contributorName}</div>
                            {!entry.isAnonymous && entry.contributorEmail && (
                              <div className="text-xs text-muted-foreground">{entry.contributorEmail}</div>
                            )}
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="flex items-center gap-1 text-amber-500 font-bold">
                            <Star className="w-4 h-4" />
                            {entry.starsAwarded?.toLocaleString() || 0}
                          </div>
                          <div className="text-xs text-muted-foreground">${entry.starsTier}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Impact Benefits */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card className="p-6 bg-slate-800/50 border-emerald-500/20">
                <div className="flex flex-col items-center text-center">
                  <div className="w-12 h-12 rounded-full bg-emerald-500/20 flex items-center justify-center mb-4">
                    <Heart className="w-6 h-6 text-emerald-500" />
                  </div>
                  <h3 className="font-bold mb-2 text-white">Clean Water Access</h3>
                  <p className="text-sm text-muted-foreground">
                    Fund water purification systems in communities lacking clean drinking water
                  </p>
                </div>
              </Card>

              <Card className="p-6 bg-slate-800/50 border-blue-500/20">
                <div className="flex flex-col items-center text-center">
                  <div className="w-12 h-12 rounded-full bg-blue-500/20 flex items-center justify-center mb-4">
                    <Recycle className="w-6 h-6 text-blue-500" />
                  </div>
                  <h3 className="font-bold mb-2 text-white">Recycling E-waste</h3>
                  <p className="text-sm text-muted-foreground">
                    Support responsible electronics recycling and device trade-in programs for sustainable tech consumption
                  </p>
                </div>
              </Card>

              <Card className="p-6 bg-slate-800/50 border-purple-500/20">
                <div className="flex flex-col items-center text-center">
                  <div className="w-12 h-12 rounded-full bg-purple-500/20 flex items-center justify-center mb-4">
                    <Users className="w-6 h-6 text-purple-500" />
                  </div>
                  <h3 className="font-bold mb-2 text-white">Awareness</h3>
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
