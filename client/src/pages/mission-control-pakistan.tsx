import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import { useToast } from "@/hooks/use-toast";
import { 
  Droplets, 
  Users, 
  Target, 
  MapPin, 
  TrendingUp, 
  Award, 
  Share2, 
  Heart,
  Building,
  Camera,
  Trophy,
  Clock,
  Zap
} from "lucide-react";
import { Link } from "wouter";

interface MissionStats {
  filtersDeployed: number;
  targetFilters: number;
  peopleServed: number;
  fundingRaised: number;
  targetFunding: number;
  devicesContributed: number;
  daysRemaining: number;
  topContributors: Array<{
    name: string;
    devices: number;
    points: number;
  }>;
}

export default function MissionControlPakistan() {
  const [missionStats, setMissionStats] = useState<MissionStats>({
    filtersDeployed: 47,
    targetFilters: 500,
    peopleServed: 1175,
    fundingRaised: 235000,
    targetFunding: 2500000,
    devicesContributed: 156,
    daysRemaining: 78,
    topContributors: [
      { name: "Dubai Tech Hub", devices: 23, points: 5750 },
      { name: "Emirates Financial", devices: 18, points: 4500 },
      { name: "Sarah Ahmed", devices: 12, points: 3000 }
    ]
  });

  const [contributionAmount, setContributionAmount] = useState("");
  const [isContributing, setIsContributing] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    // Fetch real mission stats
    const fetchMissionStats = async () => {
      try {
        const response = await fetch('/api/missions/pakistan-flood/stats');
        if (response.ok) {
          const stats = await response.json();
          setMissionStats(prev => ({ ...prev, ...stats }));
        }
      } catch (error) {
        console.log('Loading mission data...');
      }
    };

    fetchMissionStats();
    const interval = setInterval(fetchMissionStats, 30000); // Update every 30 seconds

    return () => clearInterval(interval);
  }, []);

  const handleContribution = async (type: 'device' | 'direct') => {
    setIsContributing(true);
    
    try {
      const response = await fetch('/api/missions/pakistan-flood/contribute', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          type,
          amount: type === 'direct' ? parseFloat(contributionAmount) : 1,
          missionId: 'pakistan-flood-relief-2025'
        })
      });

      if (response.ok) {
        const result = await response.json();
        toast({
          title: "Contribution Successful! 💧",
          description: `You've helped bring clean water to ${result.peopleHelped} people in Pakistan!`
        });

        // Refresh stats
        setMissionStats(prev => ({
          ...prev,
          devicesContributed: prev.devicesContributed + 1,
          peopleServed: prev.peopleServed + (result.peopleHelped || 25)
        }));

        setContributionAmount("");
      }
    } catch (error) {
      toast({
        title: "Contribution Failed",
        description: "Please try again. Every device counts!",
        variant: "destructive"
      });
    } finally {
      setIsContributing(false);
    }
  };

  const progressPercentage = (missionStats.filtersDeployed / missionStats.targetFilters) * 100;
  const fundingPercentage = (missionStats.fundingRaised / missionStats.targetFunding) * 100;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      {/* Crisis Header */}
      <div className="bg-gradient-to-r from-blue-900/50 to-cyan-900/50 border-b border-slate-700">
        <div className="container mx-auto px-4 py-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="text-center md:text-left">
              <div className="flex items-center gap-3 mb-2">
                <Droplets className="w-8 h-8 text-cyan-400" />
                <span className="text-2xl font-bold text-white">CRISIS MISSION</span>
                <span className="bg-red-600 text-white px-3 py-1 rounded-full text-sm font-bold">
                  URGENT
                </span>
              </div>
              <h1 className="text-4xl font-bold text-white mb-2">
                Pakistan Flood Relief
              </h1>
              <p className="text-cyan-200 text-lg">
                2.3 million people need clean water after devastating floods
              </p>
            </div>
            
            <div className="text-center">
              <div className="text-4xl font-bold text-cyan-400">{missionStats.daysRemaining}</div>
              <div className="text-cyan-200">Days Remaining</div>
              <div className="text-sm text-gray-400 mt-1">Until GitEx 2025</div>
            </div>
          </div>
        </div>
      </div>

      {/* Mission Stats */}
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
          <Card className="bg-slate-800/50 border-slate-700 text-center">
            <CardContent className="p-6">
              <Droplets className="w-8 h-8 text-cyan-400 mx-auto mb-2" />
              <div className="text-2xl font-bold text-cyan-400">
                {missionStats.filtersDeployed}
              </div>
              <div className="text-gray-400 text-sm">Filters Deployed</div>
              <div className="text-xs text-cyan-300 mt-1">
                /{missionStats.targetFilters} target
              </div>
            </CardContent>
          </Card>

          <Card className="bg-slate-800/50 border-slate-700 text-center">
            <CardContent className="p-6">
              <Users className="w-8 h-8 text-emerald-400 mx-auto mb-2" />
              <div className="text-2xl font-bold text-emerald-400">
                {missionStats.peopleServed.toLocaleString()}
              </div>
              <div className="text-gray-400 text-sm">People Served</div>
              <div className="text-xs text-emerald-300 mt-1">
                Clean water access
              </div>
            </CardContent>
          </Card>

          <Card className="bg-slate-800/50 border-slate-700 text-center">
            <CardContent className="p-6">
              <TrendingUp className="w-8 h-8 text-blue-400 mx-auto mb-2" />
              <div className="text-2xl font-bold text-blue-400">
                AED {(missionStats.fundingRaised / 1000).toFixed(0)}K
              </div>
              <div className="text-gray-400 text-sm">Funding Raised</div>
              <div className="text-xs text-blue-300 mt-1">
                /AED {(missionStats.targetFunding / 1000000).toFixed(1)}M target
              </div>
            </CardContent>
          </Card>

          <Card className="bg-slate-800/50 border-slate-700 text-center">
            <CardContent className="p-6">
              <Zap className="w-8 h-8 text-purple-400 mx-auto mb-2" />
              <div className="text-2xl font-bold text-purple-400">
                {missionStats.devicesContributed}
              </div>
              <div className="text-gray-400 text-sm">Devices Contributed</div>
              <div className="text-xs text-purple-300 mt-1">
                Today
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Progress Bars */}
        <div className="grid md:grid-cols-2 gap-8 mb-12">
          <Card className="bg-slate-800/50 border-slate-700">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Target className="w-5 h-5 text-cyan-400" />
                Deployment Progress
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-400">Water Filters</span>
                  <span className="text-cyan-400">
                    {missionStats.filtersDeployed}/{missionStats.targetFilters}
                  </span>
                </div>
                <Progress value={progressPercentage} className="h-3" />
                <div className="text-center text-cyan-400 font-semibold">
                  {progressPercentage.toFixed(1)}% Complete
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-slate-800/50 border-slate-700">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Building className="w-5 h-5 text-blue-400" />
                Funding Progress
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-400">Amount Raised</span>
                  <span className="text-blue-400">
                    AED {(missionStats.fundingRaised / 1000).toFixed(0)}K
                  </span>
                </div>
                <Progress value={fundingPercentage} className="h-3" />
                <div className="text-center text-blue-400 font-semibold">
                  {fundingPercentage.toFixed(1)}% Funded
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Partnership Highlight */}
        <div className="grid md:grid-cols-2 gap-8 mb-12">
          {/* Sponsor */}
          <Card className="bg-gradient-to-r from-blue-900/30 to-cyan-900/30 border-blue-500/50">
            <CardContent className="p-8">
              <div className="text-center">
                <div className="flex justify-center items-center gap-4 mb-6">
                  <Building className="w-12 h-12 text-blue-400" />
                  <div>
                    <h2 className="text-2xl font-bold text-white">Mission Sponsor</h2>
                    <p className="text-blue-200">Proudly funded by</p>
                  </div>
                </div>
                
                <div className="text-3xl font-bold text-blue-400 mb-4">
                  AlifInvestments.com
                </div>
                
                <p className="text-blue-100 text-sm mb-6 max-w-2xl mx-auto">
                  "We're committed to transforming lives through technology and humanitarian impact. 
                  Every water filter deployed represents hope and dignity for flood-affected families."
                </p>
                
                <Button 
                  onClick={() => window.open('https://alifInvestments.com', '_blank')}
                  className="bg-blue-600 hover:bg-blue-700 w-full"
                >
                  <Building className="w-4 h-4 mr-2" />
                  Visit AlifInvestments.com
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Official Relief Partner */}
          <Card className="bg-gradient-to-r from-green-900/30 to-emerald-900/30 border-green-500/50">
            <CardContent className="p-8">
              <div className="text-center">
                <div className="flex justify-center items-center gap-4 mb-6">
                  <Heart className="w-12 h-12 text-green-400" />
                  <div>
                    <h2 className="text-2xl font-bold text-white">Official Relief Partner</h2>
                    <p className="text-green-200">Verified by</p>
                  </div>
                </div>
                
                <div className="text-3xl font-bold text-green-400 mb-4">
                  Pakistan Association Dubai
                </div>
                
                <p className="text-green-100 text-sm mb-6 max-w-2xl mx-auto">
                  "Our community stands united in this crisis. We verify every water filter deployment 
                  and ensure aid reaches the families who need it most in flood-affected areas."
                </p>
                
                <div className="flex flex-col gap-3">
                  <Button 
                    variant="outline" 
                    className="border-green-400 text-green-400 hover:bg-green-400 hover:text-black w-full"
                  >
                    <Heart className="w-4 h-4 mr-2" />
                    Verified Relief Partner
                  </Button>
                  <div className="text-xs text-green-300">
                    ✓ Community verification ✓ Local coordination ✓ Impact transparency
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Contribution Section */}
        <div className="grid md:grid-cols-2 gap-8 mb-12">
          <Card className="bg-slate-800/50 border-slate-700">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Droplets className="w-5 h-5 text-cyan-400" />
                Contribute Your Device
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-gray-300">
                Trade your old phone to fund a water filtration system for 25 people in Pakistan.
              </p>
              <div className="bg-cyan-900/20 p-4 rounded-lg">
                <div className="flex items-center gap-3 mb-2">
                  <Droplets className="w-5 h-5 text-cyan-400" />
                  <span className="text-cyan-400 font-semibold">Impact per device:</span>
                </div>
                <ul className="text-cyan-200 text-sm space-y-1">
                  <li>• 25 people get clean water for 6 months</li>
                  <li>• 1 family receives emergency water kit</li>
                  <li>• 250 Planet Points earned for restaurant rewards</li>
                </ul>
              </div>
              <Button 
                onClick={() => handleContribution('device')}
                disabled={isContributing}
                className="w-full bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-700 hover:to-blue-700"
              >
                {isContributing ? "Processing..." : "Contribute Device"}
              </Button>
            </CardContent>
          </Card>

          <Card className="bg-slate-800/50 border-slate-700">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Heart className="w-5 h-5 text-red-400" />
                Direct Donation
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-gray-300">
                Make a direct contribution to accelerate water filter deployment.
              </p>
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-300">
                  Donation Amount (AED)
                </label>
                <Input
                  type="number"
                  value={contributionAmount}
                  onChange={(e) => setContributionAmount(e.target.value)}
                  placeholder="Enter amount"
                  className="bg-slate-700 border-slate-600 text-white"
                />
              </div>
              <div className="text-sm text-gray-400">
                AED 5,000 = 1 complete water filtration system for a family
              </div>
              <Button 
                onClick={() => handleContribution('direct')}
                disabled={isContributing || !contributionAmount}
                className="w-full bg-gradient-to-r from-red-600 to-pink-600 hover:from-red-700 hover:to-pink-700"
              >
                {isContributing ? "Processing..." : "Donate Now"}
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Top Contributors */}
        <Card className="bg-slate-800/50 border-slate-700 mb-12">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <Trophy className="w-5 h-5 text-yellow-400" />
              Top Mission Contributors
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {missionStats.topContributors.map((contributor, index) => (
                <div key={index} className="flex items-center justify-between p-4 bg-slate-700/50 rounded-lg">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 bg-gradient-to-r from-yellow-600 to-orange-600 rounded-full flex items-center justify-center text-white font-bold">
                      #{index + 1}
                    </div>
                    <div>
                      <div className="text-white font-semibold">{contributor.name}</div>
                      <div className="text-gray-400 text-sm">{contributor.devices} devices contributed</div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-yellow-400 font-bold">{contributor.points} Points</div>
                    <div className="text-gray-400 text-sm">Restaurant rewards</div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Restaurant Rewards */}
        <Card className="bg-gradient-to-r from-emerald-900/30 to-green-900/30 border-emerald-500/50 mb-12">
          <CardHeader>
            <CardTitle className="text-white text-center text-2xl">
              🍽️ Restaurant Reward Partners
            </CardTitle>
            <p className="text-emerald-200 text-center">
              Redeem your Planet Points for delicious meals while supporting the mission
            </p>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-8">
              <div className="text-center">
                <h3 className="text-xl font-bold text-white mb-4">Emily Chilly</h3>
                <div className="space-y-2 text-emerald-200">
                  <div>🥙 500 points = AED 25 meal voucher</div>
                  <div>🍽️ 1,000 points = Free appetizer + main</div>
                  <div>🥂 2,500 points = Dinner for two with dessert</div>
                </div>
                <div className="mt-4 p-3 bg-emerald-900/50 rounded-lg">
                  <div className="text-emerald-400 font-bold">Special Mission Offer:</div>
                  <div className="text-emerald-200 text-sm">Double points for flood relief contributors</div>
                </div>
              </div>

              <div className="text-center">
                <h3 className="text-xl font-bold text-white mb-4">B&B Restaurant</h3>
                <div className="space-y-2 text-emerald-200">
                  <div>🍽️ 400 points = AED 20 dining credit</div>
                  <div>🥗 800 points = Complimentary lunch</div>
                  <div>🍳 2,000 points = Weekend brunch for two</div>
                </div>
                <div className="mt-4 p-3 bg-emerald-900/50 rounded-lg">
                  <div className="text-emerald-400 font-bold">Mission Bonus:</div>
                  <div className="text-emerald-200 text-sm">Free beverage per 100 points donated</div>
                </div>
              </div>
            </div>

            <div className="text-center mt-8">
              <Link href="/restaurant-rewards">
                <Button className="bg-emerald-600 hover:bg-emerald-700 px-8 py-3">
                  View All Restaurant Rewards
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>

        {/* Social Sharing */}
        <Card className="bg-slate-800/50 border-slate-700">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <Share2 className="w-5 h-5 text-blue-400" />
              Amplify the Impact
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-center space-y-4">
              <p className="text-gray-300">
                Share this mission and multiply the impact. Every share could save lives.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button className="bg-blue-600 hover:bg-blue-700">
                  <Share2 className="w-4 h-4 mr-2" />
                  Share on LinkedIn
                </Button>
                <Button className="bg-cyan-600 hover:bg-cyan-700">
                  <Camera className="w-4 h-4 mr-2" />
                  Share on Instagram
                </Button>
                <Button className="bg-gray-600 hover:bg-gray-700">
                  <MapPin className="w-4 h-4 mr-2" />
                  View Impact Map
                </Button>
              </div>
              
              <p className="text-sm text-gray-400">
                #WaterForPakistan #FloodRelief #AlifInvestments #PlanetHeroes
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}