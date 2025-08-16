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
      <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-blue-50 to-purple-50 flex items-center justify-center">
        <div className="animate-spin w-8 h-8 border-4 border-emerald-600 border-t-transparent rounded-full" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-blue-50 to-purple-50">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Heart className="w-8 h-8 text-emerald-600" />
            <h1 className="text-4xl font-bold bg-gradient-to-r from-emerald-600 to-blue-600 bg-clip-text text-transparent">
              Mission Sponsorship Hub
            </h1>
          </div>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Partner with sustainability groups and environment organizations to fund impactful missions across Dubai. 
            Choose your sponsorship level and make a real difference.
          </p>
        </div>

        {/* Sponsorship Tiers */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-center mb-8">Choose Your Sponsorship Level</h2>
          <div className="grid md:grid-cols-4 gap-6">
            {(tiers as SponsorshipTier[] || []).map((tier: SponsorshipTier) => (
              <Card 
                key={tier.id}
                className={`cursor-pointer transition-all duration-300 hover:scale-105 ${
                  selectedTier === tier.id 
                    ? 'ring-4 ring-emerald-500 bg-emerald-50' 
                    : 'hover:shadow-lg'
                }`}
                onClick={() => {
                  setSelectedTier(tier.id);
                  setSponsorshipAmount(tier.minAmount / 100);
                }}
                data-testid={`tier-${tier.name.toLowerCase().replace(' ', '-')}`}
              >
                <CardHeader className="text-center">
                  <div 
                    className="w-12 h-12 rounded-full mx-auto mb-3 flex items-center justify-center"
                    style={{ backgroundColor: tier.badgeColor }}
                  >
                    <Award className="w-6 h-6 text-white" />
                  </div>
                  <CardTitle className="text-lg">{tier.name}</CardTitle>
                  <div className="text-sm text-gray-600">
                    {formatCurrency(tier.minAmount)}
                    {tier.maxAmount ? ` - ${formatCurrency(tier.maxAmount)}` : '+'}
                  </div>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-sm">
                    {tier.benefits.map((benefit, index) => (
                      <li key={index} className="flex items-start gap-2">
                        <CheckCircle2 className="w-4 h-4 text-emerald-600 mt-0.5 flex-shrink-0" />
                        <span>{benefit}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Available Missions */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-center mb-8">Available Missions to Sponsor</h2>
          <div className="grid lg:grid-cols-2 gap-8">
            {(missions as SponsoredMission[] || []).map((mission: SponsoredMission) => (
              <Card 
                key={mission.id}
                className={`cursor-pointer transition-all duration-300 hover:scale-102 ${
                  selectedMission === mission.id 
                    ? 'ring-4 ring-blue-500 bg-blue-50' 
                    : 'hover:shadow-lg'
                }`}
                onClick={() => setSelectedMission(mission.id)}
                data-testid={`mission-${mission.id}`}
              >
                <CardHeader>
                  <div className="flex items-center gap-3 mb-2">
                    {getCategoryIcon(mission.category)}
                    <Badge 
                      variant="secondary"
                      className={`${
                        mission.status === 'active' ? 'bg-green-100 text-green-800' :
                        mission.status === 'funding' ? 'bg-yellow-100 text-yellow-800' :
                        'bg-gray-100 text-gray-800'
                      }`}
                    >
                      {mission.status.charAt(0).toUpperCase() + mission.status.slice(1)}
                    </Badge>
                    {mission.targetZone && (
                      <Badge variant="outline">{mission.targetZone}</Badge>
                    )}
                  </div>
                  <CardTitle className="text-xl">{mission.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 mb-4">{mission.description}</p>
                  
                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between text-sm mb-2">
                        <span>Funding Progress</span>
                        <span className="font-medium">
                          {formatCurrency(mission.currentFunding)} / {formatCurrency(mission.fundingGoal)}
                        </span>
                      </div>
                      <Progress 
                        value={getFundingPercentage(mission.currentFunding, mission.fundingGoal)} 
                        className="h-2"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div className="flex items-center gap-2">
                        <Target className="w-4 h-4 text-emerald-600" />
                        <span>{mission.environmentalGoal}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Users className="w-4 h-4 text-blue-600" />
                        <span>{mission.currentParticipants} participants</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Award className="w-4 h-4 text-purple-600" />
                        <span>{mission.pointsReward} points reward</span>
                      </div>
                      {mission.timeLimit && (
                        <div className="flex items-center gap-2">
                          <Clock className="w-4 h-4 text-orange-600" />
                          <span>{mission.timeLimit} days</span>
                        </div>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Sponsorship Form */}
        {selectedMission && selectedTier && (
          <Card className="max-w-2xl mx-auto">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <DollarSign className="w-5 h-5" />
                Complete Your Sponsorship
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <label className="block text-sm font-medium mb-2">Sponsorship Amount (AED)</label>
                <Input
                  type="number"
                  min={((tiers as SponsorshipTier[] || []).find((t: SponsorshipTier) => t.id === selectedTier)?.minAmount || 50000) / 100}
                  max={(tiers as SponsorshipTier[] || []).find((t: SponsorshipTier) => t.id === selectedTier)?.maxAmount ? 
                       (((tiers as SponsorshipTier[] || []).find((t: SponsorshipTier) => t.id === selectedTier)?.maxAmount || 0) / 100) : 
                       undefined}
                  value={sponsorshipAmount}
                  onChange={(e) => setSponsorshipAmount(Number(e.target.value))}
                  data-testid="input-sponsorship-amount"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Message to Community (Optional)</label>
                <Textarea
                  placeholder="Share why this mission is important to you..."
                  value={sponsorMessage}
                  onChange={(e) => setSponsorMessage(e.target.value)}
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
                <label htmlFor="anonymous" className="text-sm">
                  Sponsor anonymously
                </label>
              </div>

              <Separator />

              <div className="bg-gray-50 p-4 rounded-lg">
                <h4 className="font-medium mb-2">Sponsorship Summary</h4>
                <div className="space-y-1 text-sm text-gray-600">
                  <div>Mission: {(missions as SponsoredMission[] || []).find((m: SponsoredMission) => m.id === selectedMission)?.title}</div>
                  <div>Tier: {(tiers as SponsorshipTier[] || []).find((t: SponsorshipTier) => t.id === selectedTier)?.name}</div>
                  <div>Amount: {formatCurrency(sponsorshipAmount * 100)}</div>
                  <div>Anonymous: {isAnonymous ? 'Yes' : 'No'}</div>
                </div>
              </div>

              <div className="flex gap-4">
                <Button 
                  variant="outline" 
                  onClick={() => {
                    setSelectedMission(null);
                    setSelectedTier(null);
                  }}
                  className="flex-1"
                  data-testid="button-cancel-sponsorship"
                >
                  Cancel
                </Button>
                <Button 
                  onClick={handleSponsorMission}
                  disabled={sponsorshipMutation.isPending}
                  className="flex-1 bg-emerald-600 hover:bg-emerald-700"
                  data-testid="button-confirm-sponsorship"
                >
                  {sponsorshipMutation.isPending ? "Processing..." : "Confirm Sponsorship"}
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Call to Action for New Sponsors */}
        {!showSponsorForm && (
          <div className="text-center mt-16">
            <Card className="max-w-md mx-auto">
              <CardContent className="pt-6">
                <Building className="w-12 h-12 text-emerald-600 mx-auto mb-4" />
                <h3 className="text-xl font-bold mb-2">New Sponsor?</h3>
                <p className="text-gray-600 mb-4">
                  Join our community of sustainability champions and start funding impactful environmental missions.
                </p>
                <Button 
                  onClick={() => setShowSponsorForm(true)}
                  className="bg-emerald-600 hover:bg-emerald-700"
                  data-testid="button-register-sponsor"
                >
                  Register as Sponsor
                </Button>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
}