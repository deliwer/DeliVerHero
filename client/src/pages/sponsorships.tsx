import { useState, useEffect } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Separator } from "@/components/ui/separator";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { 
  Heart, 
  Building, 
  Shield, 
  Award, 
  Target, 
  Users, 
  Calendar,
  DollarSign,
  CheckCircle2,
  Clock,
  Droplet,
  Zap,
  Leaf,
  Fish,
  Globe
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

export default function SponsorshipsPage() {
  const [selectedMission, setSelectedMission] = useState<string | null>(null);
  const [selectedTier, setSelectedTier] = useState<string | null>(null);
  const [sponsorshipAmount, setSponsorshipAmount] = useState<number>(500);
  const [sponsorMessage, setSponsorMessage] = useState("");
  const [isAnonymous, setIsAnonymous] = useState(false);
  const [showSponsorForm, setShowSponsorForm] = useState(false);
  
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

    // For demo purposes, using a mock sponsor ID
    // In real app, this would come from authentication
    const mockSponsorId = "sponsor-1";

    sponsorshipMutation.mutate({
      sponsorId: mockSponsorId,
      missionId: selectedMission,
      tierId: selectedTier,
      amount: sponsorshipAmount * 100, // Convert to fils
      message: sponsorMessage || null,
      isAnonymous,
    });
  };

  if (missionsLoading || tiersLoading) {
    return (
      <div className="min-h-screen bg-dubai-gradient flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin w-12 h-12 border-4 border-hero-green-500 border-t-transparent rounded-full mx-auto mb-4" />
          <p className="text-white text-lg">Loading sponsorship opportunities...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-dubai-gradient">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Heart className="w-8 h-8 text-hero-green-500" />
            <h1 className="text-3xl md:text-4xl font-bold text-white">
              Dubai Mission Sponsors
            </h1>
          </div>
          <p className="text-lg text-gray-300 max-w-2xl mx-auto">
            Fund environmental missions across Dubai. Choose your impact level and help build a sustainable future.
          </p>
        </div>

        {/* Quick Action Section */}
        <div className="bg-gradient-to-r from-hero-green-500/20 to-dubai-blue-500/20 border border-hero-green-500/30 rounded-2xl p-6 mb-8">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-white mb-2">Ready to Make an Impact?</h2>
            <p className="text-gray-300 mb-4">Join Dubai's top companies funding sustainability missions</p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Button 
                className="bg-hero-green-500 hover:bg-hero-green-600 text-white font-bold px-8 py-3"
                onClick={() => document.getElementById('sponsorship-tiers')?.scrollIntoView({ behavior: 'smooth' })}
                data-testid="button-start-sponsoring"
              >
                Start Sponsoring Now
              </Button>
              <Button 
                variant="outline"
                className="border-white text-white hover:bg-white/10"
                onClick={() => document.getElementById('missions')?.scrollIntoView({ behavior: 'smooth' })}
                data-testid="button-view-missions"
              >
                View Active Missions
              </Button>
            </div>
          </div>
        </div>

        {/* Sponsorship Tiers */}
        <div className="mb-8" id="sponsorship-tiers">
          <h2 className="text-2xl font-bold text-center mb-6 text-white">Choose Your Impact Level</h2>
          <div className="grid md:grid-cols-4 gap-4">
            {(tiers as SponsorshipTier[] || []).map((tier: SponsorshipTier) => (
              <Card 
                key={tier.id}
                className={`cursor-pointer transition-all duration-300 hover:scale-105 bg-black/20 border-gray-700 ${
                  selectedTier === tier.id 
                    ? 'ring-2 ring-hero-green-500 bg-hero-green-500/10' 
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
                  <div className="text-sm text-hero-green-400 font-bold">
                    {formatCurrency(tier.minAmount)}
                    {tier.maxAmount ? ` - ${formatCurrency(tier.maxAmount)}` : '+'}
                  </div>
                </CardHeader>
                <CardContent className="pt-0">
                  <ul className="space-y-1 text-xs">
                    {tier.benefits.slice(0, 3).map((benefit, index) => (
                      <li key={index} className="flex items-start gap-2 text-gray-300">
                        <CheckCircle2 className="w-3 h-3 text-hero-green-500 mt-0.5 flex-shrink-0" />
                        <span>{benefit}</span>
                      </li>
                    ))}
                    {tier.benefits.length > 3 && (
                      <li className="text-hero-green-400 text-xs">+{tier.benefits.length - 3} more benefits</li>
                    )}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Available Missions */}
        <div className="mb-8" id="missions">
          <h2 className="text-2xl font-bold text-center mb-6 text-white">Active Environmental Missions</h2>
          <div className="grid lg:grid-cols-2 gap-4">
            {(missions as SponsoredMission[] || []).map((mission: SponsoredMission) => (
              <Card 
                key={mission.id}
                className={`cursor-pointer transition-all duration-300 hover:scale-102 bg-black/20 border-gray-700 ${
                  selectedMission === mission.id 
                    ? 'ring-2 ring-dubai-blue-500 bg-dubai-blue-500/10' 
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
                        <span className="font-medium text-hero-green-400">
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
                        <Users className="w-3 h-3 text-dubai-blue-500" />
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
        </div>

        {/* Sponsorship Form */}
        {selectedMission && selectedTier && (
          <Card className="max-w-lg mx-auto bg-black/20 border-gray-700">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-white">
                <DollarSign className="w-5 h-5 text-hero-green-500" />
                Confirm Your Sponsorship
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="bg-hero-green-500/10 border border-hero-green-500/30 p-4 rounded-lg">
                <h4 className="font-medium mb-2 text-white">Sponsorship Details</h4>
                <div className="space-y-1 text-sm text-gray-300">
                  <div><span className="text-gray-400">Mission:</span> {(missions as SponsoredMission[] || []).find((m: SponsoredMission) => m.id === selectedMission)?.title}</div>
                  <div><span className="text-gray-400">Level:</span> {(tiers as SponsorshipTier[] || []).find((t: SponsorshipTier) => t.id === selectedTier)?.name}</div>
                  <div><span className="text-gray-400">Amount:</span> <span className="text-hero-green-400 font-bold">{formatCurrency(sponsorshipAmount * 100)}</span></div>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2 text-white">Sponsorship Amount (AED)</label>
                <Input
                  type="number"
                  min={((tiers as SponsorshipTier[] || []).find((t: SponsorshipTier) => t.id === selectedTier)?.minAmount || 50000) / 100}
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
                  className="flex-1 bg-hero-green-500 hover:bg-hero-green-600 text-white font-bold"
                  data-testid="button-confirm-sponsorship"
                >
                  {sponsorshipMutation.isPending ? "Processing..." : "Sponsor Mission"}
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Call to Action for New Sponsors */}
        {!selectedMission && !selectedTier && (
          <div className="text-center mt-8">
            <div className="bg-gradient-to-r from-purple-500/20 to-pink-500/20 border border-purple-500/30 rounded-2xl p-6 max-w-md mx-auto">
              <Building className="w-10 h-10 text-purple-400 mx-auto mb-3" />
              <h3 className="text-lg font-bold mb-2 text-white">New to Sponsorship?</h3>
              <p className="text-gray-300 text-sm mb-4">
                Join Dubai's leading companies making environmental impact through mission sponsorship.
              </p>
              <Button 
                onClick={() => {
                  document.getElementById('sponsorship-tiers')?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="bg-purple-500 hover:bg-purple-600 text-white font-bold w-full"
                data-testid="button-register-sponsor"
              >
                Get Started Today
              </Button>
            </div>
          </div>
        )}

        {/* Bottom CTA */}
        <div className="text-center mt-12 mb-8">
          <div className="bg-gradient-to-r from-hero-green-500/10 to-dubai-blue-500/10 border border-hero-green-500/20 rounded-xl p-6 max-w-2xl mx-auto">
            <Globe className="w-8 h-8 text-hero-green-500 mx-auto mb-3" />
            <h3 className="text-xl font-bold text-white mb-2">Ready to Lead Dubai's Sustainability Movement?</h3>
            <p className="text-gray-300 mb-4">
              Select a mission and sponsorship tier above to make your environmental impact today.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Button 
                className="bg-gradient-to-r from-hero-green-500 to-emerald-600 hover:from-hero-green-600 hover:to-emerald-700 text-white font-bold px-6"
                onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                data-testid="button-scroll-to-top"
              >
                Choose Your Impact
              </Button>
              <Button 
                variant="outline"
                className="border-gray-600 text-gray-300 hover:bg-gray-800"
                onClick={() => {
                  toast({
                    title: "Contact Information",
                    description: "Email: sponsors@deliwer.com | WhatsApp: +971 50 944 6936",
                  });
                }}
                data-testid="button-contact-info"
              >
                Contact Support
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}