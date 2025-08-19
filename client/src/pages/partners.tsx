
import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Progress } from "@/components/ui/progress";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { 
  Users, 
  Award, 
  Building, 
  Handshake, 
  Trophy,
  Star,
  Crown,
  Sparkles,
  ArrowRight,
  CheckCircle,
  Target,
  Zap,
  Globe,
  Heart,
  TrendingUp,
  DollarSign,
  CheckCircle2,
  Clock,
  Droplet,
  Leaf,
  Fish
} from "lucide-react";

interface SponsoredMission {
  id: string;
  title: string;
  description: string;
  category: string;
  targetZone: string | null;
  fundingGoal: number;
  currentFunding: number;
  participantLimit: number | null;
  currentParticipants: number;
  pointsReward: number;
  environmentalGoal: string;
  timeLimit: number | null;
  status: string;
  isActive: boolean;
  createdAt: string;
  startsAt: string | null;
  expiresAt: string | null;
}

interface SponsorshipTier {
  id: string;
  name: string;
  minAmount: number;
  maxAmount: number | null;
  benefits: string[];
  badgeColor: string;
  priority: number;
  isActive: boolean;
  createdAt: string;
}

const categoryIcons = {
  water: Droplet,
  energy: Zap,
  biodiversity: Fish,
  waste: Globe,
  transport: Globe
};

export default function Partners() {
  const [selectedMission, setSelectedMission] = useState<string | null>(null);
  const [selectedTier, setSelectedTier] = useState<string | null>(null);
  const [sponsorshipAmount, setSponsorshipAmount] = useState<number>(500);
  const [sponsorMessage, setSponsorMessage] = useState("");
  const [isAnonymous, setIsAnonymous] = useState(false);
  
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const { data: missions, isLoading: missionsLoading } = useQuery({
    queryKey: ["/api/sponsored-missions"],
  });

  const { data: tiers, isLoading: tiersLoading } = useQuery({
    queryKey: ["/api/sponsorship-tiers"],
  });

  const sponsorshipMutation = useMutation({
    mutationFn: (data: any) => apiRequest("POST", "/api/mission-sponsorships", data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/sponsored-missions"] });
      toast({
        title: "Sponsorship Created!",
        description: "Your mission sponsorship has been submitted for approval.",
      });
      setSelectedMission(null);
      setSelectedTier(null);
      setSponsorshipAmount(500);
      setSponsorMessage("");
    },
    onError: (error: any) => {
      toast({
        title: "Sponsorship Failed",
        description: error.message || "Failed to create sponsorship",
        variant: "destructive",
      });
    },
  });

  const formatCurrency = (amount: number) => {
    return `AED ${(amount / 100).toFixed(0)}`;
  };

  const getFundingPercentage = (current: number, goal: number) => {
    return Math.min((current / goal) * 100, 100);
  };

  const getCategoryIcon = (category: string) => {
    const Icon = categoryIcons[category as keyof typeof categoryIcons] || Globe;
    return <Icon className="w-5 h-5" />;
  };

  const handleSponsorMission = async () => {
    if (!selectedMission || !selectedTier) {
      toast({
        title: "Missing Selection",
        description: "Please select both a mission and sponsorship tier.",
        variant: "destructive",
      });
      return;
    }

    const mockSponsorId = "sponsor-1";

    sponsorshipMutation.mutate({
      sponsorId: mockSponsorId,
      missionId: selectedMission,
      tierId: selectedTier,
      amount: sponsorshipAmount * 100,
      message: sponsorMessage || null,
      isAnonymous,
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-950 to-slate-900 pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <div className="flex items-center justify-center gap-2 mb-6">
            <Building className="w-12 h-12 text-emerald-400" />
            <Sparkles className="w-8 h-8 text-yellow-400" />
          </div>
          <h1 className="text-5xl font-bold text-white mb-6 bg-gradient-to-r from-emerald-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">
            Partners & Champions
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Join our mission to transform technology recycling through strategic partnerships, 
            champion programs, and mission sponsorships that create real environmental impact.
          </p>
        </div>

        {/* Tabs for Partners and Sponsorships */}
        <Tabs defaultValue="champions" className="mb-16">
          <TabsList className="grid w-full max-w-md mx-auto grid-cols-2 mb-12">
            <TabsTrigger value="champions" className="flex items-center gap-2">
              <Crown className="w-4 h-4" />
              Champions & Ambassadors
            </TabsTrigger>
            <TabsTrigger value="sponsors" className="flex items-center gap-2">
              <Building className="w-4 h-4" />
              Mission Sponsors
            </TabsTrigger>
          </TabsList>

          {/* Champions & Ambassadors Tab */}
          <TabsContent value="champions" className="space-y-12">
            {/* Champion Tiers */}
            <div className="grid md:grid-cols-3 gap-8">
              <Card className="bg-gradient-to-br from-amber-900/20 to-yellow-900/20 border-amber-500/30">
                <CardHeader className="text-center">
                  <div className="flex justify-center mb-4">
                    <div className="p-4 bg-gradient-to-br from-amber-500 to-yellow-600 rounded-full">
                      <Crown className="w-8 h-8 text-white" />
                    </div>
                  </div>
                  <CardTitle className="text-2xl text-amber-400">Gold Champion</CardTitle>
                  <CardDescription className="text-amber-200">Elite Partnership Level</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <CheckCircle className="w-5 h-5 text-green-400" />
                      <span className="text-gray-300">Premium brand visibility</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle className="w-5 h-5 text-green-400" />
                      <span className="text-gray-300">Co-marketing opportunities</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle className="w-5 h-5 text-green-400" />
                      <span className="text-gray-300">Exclusive event access</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle className="w-5 h-5 text-green-400" />
                      <span className="text-gray-300">Impact report priority</span>
                    </div>
                  </div>
                  <Button className="w-full bg-amber-500 hover:bg-amber-600 text-white">
                    Become Gold Champion
                  </Button>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-br from-gray-400/20 to-slate-500/20 border-gray-400/30">
                <CardHeader className="text-center">
                  <div className="flex justify-center mb-4">
                    <div className="p-4 bg-gradient-to-br from-gray-400 to-slate-500 rounded-full">
                      <Trophy className="w-8 h-8 text-white" />
                    </div>
                  </div>
                  <CardTitle className="text-2xl text-gray-300">Silver Champion</CardTitle>
                  <CardDescription className="text-gray-400">Premium Partnership</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <CheckCircle className="w-5 h-5 text-green-400" />
                      <span className="text-gray-300">Brand partnership benefits</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle className="w-5 h-5 text-green-400" />
                      <span className="text-gray-300">Marketing collaboration</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle className="w-5 h-5 text-green-400" />
                      <span className="text-gray-300">Impact tracking access</span>
                    </div>
                  </div>
                  <Button className="w-full bg-gray-500 hover:bg-gray-600 text-white">
                    Become Silver Champion
                  </Button>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-br from-orange-800/20 to-amber-800/20 border-orange-500/30">
                <CardHeader className="text-center">
                  <div className="flex justify-center mb-4">
                    <div className="p-4 bg-gradient-to-br from-orange-500 to-amber-600 rounded-full">
                      <Star className="w-8 h-8 text-white" />
                    </div>
                  </div>
                  <CardTitle className="text-2xl text-orange-400">Bronze Champion</CardTitle>
                  <CardDescription className="text-orange-200">Foundation Partnership</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <CheckCircle className="w-5 h-5 text-green-400" />
                      <span className="text-gray-300">Community recognition</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle className="w-5 h-5 text-green-400" />
                      <span className="text-gray-300">Partnership badge</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle className="w-5 h-5 text-green-400" />
                      <span className="text-gray-300">Impact updates</span>
                    </div>
                  </div>
                  <Button className="w-full bg-orange-500 hover:bg-orange-600 text-white">
                    Become Bronze Champion
                  </Button>
                </CardContent>
              </Card>
            </div>

            {/* Ambassador Program */}
            <Card className="bg-gradient-to-br from-blue-900/20 to-indigo-900/20 border-blue-500/30">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <Users className="w-8 h-8 text-blue-400" />
                  <div>
                    <CardTitle className="text-2xl text-blue-400">Ambassador Program</CardTitle>
                    <CardDescription className="text-blue-200">
                      Become a voice for sustainable technology
                    </CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-8">
                  <div className="space-y-4">
                    <h4 className="text-lg font-semibold text-white">What Ambassadors Do</h4>
                    <ul className="space-y-2">
                      <li className="flex items-center gap-2">
                        <Handshake className="w-5 h-5 text-green-400" />
                        <span className="text-gray-300">Share DeliWer Heroes mission</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <Target className="w-5 h-5 text-green-400" />
                        <span className="text-gray-300">Drive community engagement</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <Globe className="w-5 h-5 text-green-400" />
                        <span className="text-gray-300">Promote environmental awareness</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <Heart className="w-5 h-5 text-green-400" />
                        <span className="text-gray-300">Support fellow heroes</span>
                      </li>
                    </ul>
                  </div>
                  <div className="space-y-4">
                    <h4 className="text-lg font-semibold text-white">Ambassador Benefits</h4>
                    <ul className="space-y-2">
                      <li className="flex items-center gap-2">
                        <Zap className="w-5 h-5 text-yellow-400" />
                        <span className="text-gray-300">Exclusive ambassador badge</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <TrendingUp className="w-5 h-5 text-yellow-400" />
                        <span className="text-gray-300">Performance bonuses</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <Crown className="w-5 h-5 text-yellow-400" />
                        <span className="text-gray-300">Leadership opportunities</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <Award className="w-5 h-5 text-yellow-400" />
                        <span className="text-gray-300">Recognition program</span>
                      </li>
                    </ul>
                  </div>
                </div>
                <div className="mt-6 flex justify-center">
                  <Button className="bg-blue-500 hover:bg-blue-600 text-white px-8">
                    Apply to be an Ambassador
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Mission Sponsors Tab */}
          <TabsContent value="sponsors" className="space-y-12">
            {/* Sponsorship Overview */}
            <Card className="bg-gradient-to-br from-emerald-900/20 to-green-900/20 border-emerald-500/30">
              <CardHeader className="text-center">
                <CardTitle className="text-3xl text-emerald-400">Mission Sponsorship Program</CardTitle>
                <CardDescription className="text-emerald-200 text-lg">
                  Partner with us to sponsor individual trade-in missions and maximize environmental impact
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-3 gap-6 mt-8">
                  <div className="text-center">
                    <div className="flex justify-center mb-4">
                      <div className="p-3 bg-emerald-500 rounded-full">
                        <Target className="w-8 h-8 text-white" />
                      </div>
                    </div>
                    <h4 className="text-lg font-semibold text-white mb-2">Mission-Specific Sponsorship</h4>
                    <p className="text-gray-300">Sponsor individual device trade-ins and track direct impact</p>
                  </div>
                  <div className="text-center">
                    <div className="flex justify-center mb-4">
                      <div className="p-3 bg-blue-500 rounded-full">
                        <Globe className="w-8 h-8 text-white" />
                      </div>
                    </div>
                    <h4 className="text-lg font-semibold text-white mb-2">Global Impact Tracking</h4>
                    <p className="text-gray-300">Real-time reporting on environmental and social outcomes</p>
                  </div>
                  <div className="text-center">
                    <div className="flex justify-center mb-4">
                      <div className="p-3 bg-purple-500 rounded-full">
                        <Heart className="w-8 h-8 text-white" />
                      </div>
                    </div>
                    <h4 className="text-lg font-semibold text-white mb-2">Brand Alignment</h4>
                    <p className="text-gray-300">Demonstrate corporate social responsibility authentically</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Sponsorship Tiers */}
            <div className="grid md:grid-cols-2 gap-8">
              <Card className="bg-gradient-to-br from-purple-900/20 to-pink-900/20 border-purple-500/30">
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <Building className="w-8 h-8 text-purple-400" />
                    <div>
                      <CardTitle className="text-xl text-purple-400">Enterprise Sponsorship</CardTitle>
                      <CardDescription className="text-purple-200">
                        Large-scale mission sponsorship
                      </CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <Badge variant="secondary" className="bg-purple-500/20 text-purple-300">
                    $5,000+ per month
                  </Badge>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <CheckCircle className="w-5 h-5 text-green-400" />
                      <span className="text-gray-300">100+ missions per month</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle className="w-5 h-5 text-green-400" />
                      <span className="text-gray-300">Branded sponsor recognition</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle className="w-5 h-5 text-green-400" />
                      <span className="text-gray-300">Custom impact reports</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle className="w-5 h-5 text-green-400" />
                      <span className="text-gray-300">Co-marketing opportunities</span>
                    </div>
                  </div>
                  <Button className="w-full bg-purple-500 hover:bg-purple-600 text-white">
                    Become Enterprise Sponsor
                  </Button>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-br from-teal-900/20 to-cyan-900/20 border-teal-500/30">
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <Handshake className="w-8 h-8 text-teal-400" />
                    <div>
                      <CardTitle className="text-xl text-teal-400">Community Sponsorship</CardTitle>
                      <CardDescription className="text-teal-200">
                        Focused mission support
                      </CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <Badge variant="secondary" className="bg-teal-500/20 text-teal-300">
                    $1,000+ per month
                  </Badge>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <CheckCircle className="w-5 h-5 text-green-400" />
                      <span className="text-gray-300">25+ missions per month</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle className="w-5 h-5 text-green-400" />
                      <span className="text-gray-300">Sponsor badge display</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle className="w-5 h-5 text-green-400" />
                      <span className="text-gray-300">Monthly impact summaries</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle className="w-5 h-5 text-green-400" />
                      <span className="text-gray-300">Community recognition</span>
                    </div>
                  </div>
                  <Button className="w-full bg-teal-500 hover:bg-teal-600 text-white">
                    Become Community Sponsor
                  </Button>
                </CardContent>
              </Card>
            </div>

            {/* Sponsorship Benefits */}
            <Card className="bg-gradient-to-br from-indigo-900/20 to-blue-900/20 border-indigo-500/30">
              <CardHeader>
                <CardTitle className="text-2xl text-indigo-400 text-center">
                  Why Sponsor DeliWer Heroes Missions?
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                  <div className="text-center space-y-3">
                    <div className="flex justify-center">
                      <div className="p-3 bg-green-500 rounded-full">
                        <Globe className="w-6 h-6 text-white" />
                      </div>
                    </div>
                    <h4 className="font-semibold text-white">Environmental Impact</h4>
                    <p className="text-sm text-gray-300">Directly contribute to reducing electronic waste</p>
                  </div>
                  <div className="text-center space-y-3">
                    <div className="flex justify-center">
                      <div className="p-3 bg-blue-500 rounded-full">
                        <TrendingUp className="w-6 h-6 text-white" />
                      </div>
                    </div>
                    <h4 className="font-semibold text-white">Measurable Results</h4>
                    <p className="text-sm text-gray-300">Track exact environmental and social outcomes</p>
                  </div>
                  <div className="text-center space-y-3">
                    <div className="flex justify-center">
                      <div className="p-3 bg-purple-500 rounded-full">
                        <Heart className="w-6 h-6 text-white" />
                      </div>
                    </div>
                    <h4 className="font-semibold text-white">Brand Authenticity</h4>
                    <p className="text-sm text-gray-300">Genuine commitment to sustainability</p>
                  </div>
                  <div className="text-center space-y-3">
                    <div className="flex justify-center">
                      <div className="p-3 bg-orange-500 rounded-full">
                        <Users className="w-6 h-6 text-white" />
                      </div>
                    </div>
                    <h4 className="font-semibold text-white">Community Connection</h4>
                    <p className="text-sm text-gray-300">Connect with environmentally conscious consumers</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Active Missions for Sponsorship */}
            {!missionsLoading && missions && Array.isArray(missions) && missions.length > 0 && (
              <div className="space-y-6">
                <h3 className="text-2xl font-bold text-center text-white">Choose Missions to Sponsor</h3>
                
                {/* Sponsorship Tiers Selection */}
                {!tiersLoading && tiers && Array.isArray(tiers) && tiers.length > 0 && (
                  <div className="mb-6">
                    <h4 className="text-lg font-semibold text-white mb-4 text-center">Select Your Sponsorship Level</h4>
                    <div className="grid md:grid-cols-4 gap-4">
                      {(tiers as SponsorshipTier[])?.map((tier: SponsorshipTier) => (
                        <Card 
                          key={tier.id}
                          className={`cursor-pointer transition-all duration-300 hover:scale-105 bg-black/20 border-gray-700 ${
                            selectedTier === tier.id 
                              ? 'ring-2 ring-emerald-500 bg-emerald-500/10' 
                              : 'hover:bg-black/30'
                          }`}
                          onClick={() => {
                            setSelectedTier(tier.id);
                            setSponsorshipAmount(tier.minAmount / 100);
                          }}
                          data-testid={`tier-${tier.name.toLowerCase().replace(' ', '-')}`}
                        >
                          <CardHeader className="text-center pb-2">
                            <div 
                              className="w-10 h-10 rounded-full mx-auto mb-2 flex items-center justify-center"
                              style={{ backgroundColor: tier.badgeColor }}
                            >
                              <Award className="w-5 h-5 text-white" />
                            </div>
                            <CardTitle className="text-white text-base">{tier.name}</CardTitle>
                            <div className="text-sm text-emerald-400 font-bold">
                              {formatCurrency(tier.minAmount)}
                              {tier.maxAmount ? ` - ${formatCurrency(tier.maxAmount)}` : '+'}
                            </div>
                          </CardHeader>
                          <CardContent className="pt-0">
                            <ul className="space-y-1 text-xs">
                              {tier.benefits.slice(0, 3).map((benefit, index) => (
                                <li key={index} className="flex items-start gap-2 text-gray-300">
                                  <CheckCircle2 className="w-3 h-3 text-emerald-500 mt-0.5 flex-shrink-0" />
                                  <span>{benefit}</span>
                                </li>
                              ))}
                              {tier.benefits.length > 3 && (
                                <li className="text-emerald-400 text-xs">+{tier.benefits.length - 3} more benefits</li>
                              )}
                            </ul>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  </div>
                )}

                {/* Available Missions */}
                <div className="grid lg:grid-cols-2 gap-4">
                  {(missions as SponsoredMission[])?.map((mission: SponsoredMission) => (
                    <Card 
                      key={mission.id}
                      className={`cursor-pointer transition-all duration-300 hover:scale-102 bg-black/20 border-gray-700 ${
                        selectedMission === mission.id 
                          ? 'ring-2 ring-blue-500 bg-blue-500/10' 
                          : 'hover:bg-black/30'
                      }`}
                      onClick={() => setSelectedMission(mission.id)}
                      data-testid={`mission-${mission.id}`}
                    >
                      <CardHeader className="pb-3">
                        <div className="flex items-center gap-2 mb-2">
                          {getCategoryIcon(mission.category)}
                          <Badge 
                            variant="secondary"
                            className={`text-xs ${
                              mission.status === 'active' ? 'bg-green-500/20 text-green-400 border-green-500' :
                              mission.status === 'funding' ? 'bg-yellow-500/20 text-yellow-400 border-yellow-500' :
                              'bg-gray-500/20 text-gray-400 border-gray-500'
                            }`}
                          >
                            {mission.status.charAt(0).toUpperCase() + mission.status.slice(1)}
                          </Badge>
                          {mission.targetZone && (
                            <Badge variant="outline" className="text-xs border-gray-500 text-gray-300">{mission.targetZone}</Badge>
                          )}
                        </div>
                        <CardTitle className="text-white text-lg">{mission.title}</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-gray-300 text-sm mb-4">{mission.description.slice(0, 120)}...</p>
                        
                        <div className="space-y-3">
                          <div>
                            <div className="flex justify-between text-xs mb-1 text-gray-400">
                              <span>Funding Progress</span>
                              <span className="font-medium text-emerald-400">
                                {Math.round(getFundingPercentage(mission.currentFunding, mission.fundingGoal))}%
                              </span>
                            </div>
                            <Progress 
                              value={getFundingPercentage(mission.currentFunding, mission.fundingGoal)} 
                              className="h-2 bg-gray-700"
                            />
                            <div className="text-xs text-gray-400 mt-1">
                              {formatCurrency(mission.currentFunding)} / {formatCurrency(mission.fundingGoal)}
                            </div>
                          </div>

                          <div className="grid grid-cols-2 gap-2 text-xs">
                            <div className="flex items-center gap-1 text-gray-300">
                              <Users className="w-3 h-3 text-blue-500" />
                              <span>{mission.currentParticipants} joined</span>
                            </div>
                            <div className="flex items-center gap-1 text-gray-300">
                              <Award className="w-3 h-3 text-purple-500" />
                              <span>{mission.pointsReward} pts</span>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>

                {/* Sponsorship Form */}
                {selectedMission && selectedTier && (
                  <Card className="max-w-lg mx-auto bg-black/20 border-gray-700 mt-8">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2 text-white">
                        <DollarSign className="w-5 h-5 text-emerald-500" />
                        Confirm Your Sponsorship
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="bg-emerald-500/10 border border-emerald-500/30 p-4 rounded-lg">
                        <h4 className="font-medium mb-2 text-white">Sponsorship Details</h4>
                        <div className="space-y-1 text-sm text-gray-300">
                          <div><span className="text-gray-400">Mission:</span> {(missions as SponsoredMission[])?.find((m: SponsoredMission) => m.id === selectedMission)?.title}</div>
                          <div><span className="text-gray-400">Level:</span> {(tiers as SponsorshipTier[])?.find((t: SponsorshipTier) => t.id === selectedTier)?.name}</div>
                          <div><span className="text-gray-400">Amount:</span> <span className="text-emerald-400 font-bold">{formatCurrency(sponsorshipAmount * 100)}</span></div>
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-medium mb-2 text-white">Sponsorship Amount (AED)</label>
                        <Input
                          type="number"
                          min={((tiers as SponsorshipTier[])?.find((t: SponsorshipTier) => t.id === selectedTier)?.minAmount || 50000) / 100}
                          value={sponsorshipAmount}
                          onChange={(e) => setSponsorshipAmount(Number(e.target.value))}
                          className="bg-black/30 border-gray-600 text-white"
                          data-testid="input-sponsorship-amount"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium mb-2 text-white">Message to Community (Optional)</label>
                        <Textarea
                          placeholder="Share why this mission matters to you..."
                          value={sponsorMessage}
                          onChange={(e) => setSponsorMessage(e.target.value)}
                          className="bg-black/30 border-gray-600 text-white placeholder-gray-400"
                          data-testid="input-sponsor-message"
                        />
                      </div>

                      <div className="flex items-center space-x-2">
                        <Checkbox 
                          id="anonymous"
                          checked={isAnonymous}
                          onCheckedChange={(checked) => setIsAnonymous(checked as boolean)}
                          data-testid="checkbox-anonymous"
                        />
                        <label htmlFor="anonymous" className="text-sm text-gray-300">
                          Sponsor anonymously
                        </label>
                      </div>

                      <div className="flex gap-3 pt-2">
                        <Button 
                          variant="outline" 
                          onClick={() => {
                            setSelectedMission(null);
                            setSelectedTier(null);
                          }}
                          className="flex-1 border-gray-600 text-gray-300 hover:bg-gray-800"
                          data-testid="button-cancel-sponsorship"
                        >
                          Cancel
                        </Button>
                        <Button 
                          onClick={handleSponsorMission}
                          disabled={sponsorshipMutation.isPending}
                          className="flex-1 bg-emerald-500 hover:bg-emerald-600 text-white font-bold"
                          data-testid="button-confirm-sponsorship"
                        >
                          {sponsorshipMutation.isPending ? "Processing..." : "Sponsor Mission"}
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                )}
              </div>
            )}
          </TabsContent>
        </Tabs>

        {/* Call to Action */}
        <div className="text-center py-16">
          <h2 className="text-3xl font-bold text-white mb-6">
            Ready to Make an Impact Together?
          </h2>
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            Join our growing network of partners and champions working to transform technology recycling worldwide.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button className="bg-emerald-500 hover:bg-emerald-600 text-white px-8 py-3 text-lg">
              Become a Partner
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
            <Button variant="outline" className="border-gray-400 text-gray-300 hover:bg-gray-800 px-8 py-3 text-lg">
              Learn More
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
