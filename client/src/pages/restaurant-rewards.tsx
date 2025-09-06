import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { 
  Utensils, 
  Star, 
  Gift, 
  MapPin, 
  Clock, 
  Phone,
  Globe,
  Award,
  Coins,
  CheckCircle,
  Heart
} from "lucide-react";

interface Restaurant {
  id: string;
  name: string;
  cuisine: string;
  location: string;
  phone: string;
  website?: string;
  rating: number;
  image: string;
  specialOffer: string;
  rewards: Array<{
    points: number;
    reward: string;
    value: string;
    available: boolean;
  }>;
  missionBonus?: string;
}

interface UserPoints {
  total: number;
  available: number;
  donated: number;
  earned: number;
}

export default function RestaurantRewards() {
  const [userPoints, setUserPoints] = useState<UserPoints>({
    total: 1250,
    available: 850,
    donated: 400,
    earned: 200
  });

  const [selectedReward, setSelectedReward] = useState<{
    restaurantId: string;
    rewardIndex: number;
  } | null>(null);

  const [isRedeeming, setIsRedeeming] = useState(false);
  const { toast } = useToast();

  const restaurants: Restaurant[] = [
    {
      id: "emily-chilly",
      name: "Emily Chilly",
      cuisine: "Lebanese & Middle Eastern",
      location: "Dubai Marina, JBR",
      phone: "+971 4 123 4567",
      website: "https://emilychilly.com",
      rating: 4.8,
      image: "/restaurants/emily-chilly-interior.jpg",
      specialOffer: "Double points for Pakistan flood relief contributors",
      missionBonus: "Extra 100 points for every device donated to mission",
      rewards: [
        {
          points: 500,
          reward: "AED 25 Meal Voucher",
          value: "AED 25",
          available: true
        },
        {
          points: 1000,
          reward: "Free Appetizer + Main Course",
          value: "AED 65",
          available: true
        },
        {
          points: 2500,
          reward: "Dinner for Two with Dessert",
          value: "AED 150",
          available: false
        },
        {
          points: 5000,
          reward: "Private Lebanese Cooking Class",
          value: "AED 300",
          available: true
        }
      ]
    },
    {
      id: "bb-restaurant",
      name: "B&B Restaurant",
      cuisine: "International Fusion",
      location: "Business Bay, Downtown",
      phone: "+971 4 987 6543",
      rating: 4.6,
      image: "/restaurants/bb-restaurant-dining.jpg",
      specialOffer: "Free beverage for every 100 points donated to Pakistan mission",
      missionBonus: "Weekend brunch upgrade for mission contributors",
      rewards: [
        {
          points: 400,
          reward: "AED 20 Dining Credit",
          value: "AED 20",
          available: true
        },
        {
          points: 800,
          reward: "Complimentary Lunch",
          value: "AED 45",
          available: true
        },
        {
          points: 2000,
          reward: "Weekend Brunch for Two",
          value: "AED 120",
          available: true
        },
        {
          points: 4000,
          reward: "Chef's Table Experience",
          value: "AED 250",
          available: false
        }
      ]
    }
  ];

  useEffect(() => {
    // Fetch user's current planet points
    const fetchUserPoints = async () => {
      try {
        const response = await fetch('/api/users/points');
        if (response.ok) {
          const points = await response.json();
          setUserPoints(points);
        }
      } catch (error) {
        console.log('Loading user points...');
      }
    };

    fetchUserPoints();
  }, []);

  const handleRedemption = async (restaurantId: string, rewardIndex: number) => {
    const restaurant = restaurants.find(r => r.id === restaurantId);
    const reward = restaurant?.rewards[rewardIndex];
    
    if (!restaurant || !reward) return;
    
    if (userPoints.available < reward.points) {
      toast({
        title: "Insufficient Points",
        description: `You need ${reward.points - userPoints.available} more points for this reward.`,
        variant: "destructive"
      });
      return;
    }

    setIsRedeeming(true);
    setSelectedReward({ restaurantId, rewardIndex });

    try {
      const response = await fetch('/api/restaurants/redeem', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          restaurantId,
          rewardIndex,
          pointsUsed: reward.points
        })
      });

      if (response.ok) {
        const result = await response.json();
        
        toast({
          title: "Reward Redeemed! 🎉",
          description: `${reward.reward} at ${restaurant.name}. Check your email for the voucher code: ${result.voucherCode}`
        });

        // Update user points
        setUserPoints(prev => ({
          ...prev,
          available: prev.available - reward.points,
          total: prev.total - reward.points
        }));
      } else {
        throw new Error('Redemption failed');
      }
    } catch (error) {
      toast({
        title: "Redemption Failed",
        description: "Please try again or contact support.",
        variant: "destructive"
      });
    } finally {
      setIsRedeeming(false);
      setSelectedReward(null);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 py-12">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex justify-center items-center gap-4 mb-6">
            <Utensils className="w-12 h-12 text-emerald-400" />
            <span className="text-4xl font-bold bg-gradient-to-r from-emerald-400 to-blue-400 bg-clip-text text-transparent">
              Restaurant Rewards
            </span>
          </div>
          <h1 className="text-4xl font-bold text-white mb-4">
            Dine for Pakistan Relief
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Redeem your Planet Points for amazing meals while supporting Pakistan flood relief. Every bite helps families in need!
          </p>
        </div>

        {/* Mission Impact Banner */}
        <Card className="bg-gradient-to-r from-cyan-900/30 to-blue-900/30 border-cyan-500/50 mb-8">
          <CardContent className="p-6">
            <div className="text-center">
              <div className="flex items-center justify-center gap-3 mb-4">
                <Heart className="w-8 h-8 text-cyan-400" />
                <span className="text-2xl font-bold text-white">Pakistan Flood Relief Mission Active</span>
              </div>
              <p className="text-cyan-200 mb-4">
                Every meal you enjoy with Planet Points contributes to clean water for flood victims. 
                <br />Verified by Pakistan Association Dubai.
              </p>
              <div className="grid grid-cols-3 gap-4 text-center max-w-md mx-auto">
                <div>
                  <div className="text-2xl font-bold text-cyan-400">47/500</div>
                  <div className="text-cyan-200 text-sm">Water Filters Deployed</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-emerald-400">1,175</div>
                  <div className="text-emerald-200 text-sm">People Served</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-blue-400">78</div>
                  <div className="text-blue-200 text-sm">Days to GitEx 2025</div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* User Points Dashboard */}
        <Card className="bg-gradient-to-r from-emerald-900/30 to-green-900/30 border-emerald-500/50 mb-12">
          <CardHeader>
            <CardTitle className="text-white text-center flex items-center justify-center gap-2">
              <Coins className="w-6 h-6 text-emerald-400" />
              Your Planet Points Balance
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              <div className="text-center">
                <div className="text-3xl font-bold text-emerald-400">{userPoints.total}</div>
                <div className="text-emerald-200 text-sm">Total Earned</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-green-400">{userPoints.available}</div>
                <div className="text-green-200 text-sm">Available to Spend</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-400">{userPoints.donated}</div>
                <div className="text-blue-200 text-sm">Donated to Mission</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-purple-400">{userPoints.earned}</div>
                <div className="text-purple-200 text-sm">Earned Today</div>
              </div>
            </div>
            
            <div className="text-center mt-6">
              <div className="bg-yellow-900/30 border border-yellow-500/50 rounded-lg p-4 inline-block">
                <div className="flex items-center gap-2 text-yellow-400">
                  <Heart className="w-5 h-5" />
                  <span className="font-semibold">Pakistan Relief Bonus Active!</span>
                </div>
                <div className="text-yellow-200 text-sm mt-1">
                  Contributing to flood relief earns 2x points at all partner restaurants
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Restaurant Partners */}
        <div className="space-y-8">
          {restaurants.map((restaurant) => (
            <Card key={restaurant.id} className="bg-slate-800/50 border-slate-700 overflow-hidden">
              <div className="md:flex">
                <div className="md:w-1/3">
                  <div className="h-64 md:h-full bg-gradient-to-br from-emerald-500/20 to-blue-500/20 flex items-center justify-center">
                    <div className="text-center">
                      <Utensils className="w-16 h-16 text-emerald-400 mx-auto mb-4" />
                      <div className="text-white font-semibold">{restaurant.name}</div>
                      <div className="text-gray-400">{restaurant.cuisine}</div>
                    </div>
                  </div>
                </div>
                
                <div className="md:w-2/3 p-6">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h2 className="text-2xl font-bold text-white mb-2">{restaurant.name}</h2>
                      <div className="flex items-center gap-4 text-gray-400 text-sm mb-2">
                        <span className="flex items-center gap-1">
                          <MapPin className="w-4 h-4" />
                          {restaurant.location}
                        </span>
                        <span className="flex items-center gap-1">
                          <Phone className="w-4 h-4" />
                          {restaurant.phone}
                        </span>
                      </div>
                      <div className="flex items-center gap-2 mb-4">
                        <div className="flex items-center">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={`w-4 h-4 ${
                                i < Math.floor(restaurant.rating)
                                  ? "fill-yellow-400 text-yellow-400"
                                  : "text-gray-600"
                              }`}
                            />
                          ))}
                        </div>
                        <span className="text-yellow-400 font-semibold">{restaurant.rating}</span>
                      </div>
                    </div>
                    
                    {restaurant.website && (
                      <Button
                        onClick={() => window.open(restaurant.website, '_blank')}
                        variant="outline"
                        size="sm"
                        className="border-emerald-500 text-emerald-400 hover:bg-emerald-500 hover:text-black"
                      >
                        <Globe className="w-4 h-4 mr-2" />
                        Website
                      </Button>
                    )}
                  </div>

                  {/* Special Offers */}
                  <div className="bg-emerald-900/20 border border-emerald-500/30 rounded-lg p-4 mb-6">
                    <div className="flex items-center gap-2 mb-2">
                      <Gift className="w-5 h-5 text-emerald-400" />
                      <span className="text-emerald-400 font-semibold">Pakistan Relief Special</span>
                    </div>
                    <p className="text-emerald-200 text-sm mb-2">{restaurant.specialOffer}</p>
                    {restaurant.missionBonus && (
                      <p className="text-emerald-300 text-sm font-medium">{restaurant.missionBonus}</p>
                    )}
                  </div>

                  {/* Rewards */}
                  <div className="space-y-3">
                    <h3 className="text-white font-semibold flex items-center gap-2">
                      <Award className="w-5 h-5 text-yellow-400" />
                      Available Rewards
                    </h3>
                    
                    <div className="grid md:grid-cols-2 gap-3">
                      {restaurant.rewards.map((reward, index) => (
                        <div
                          key={index}
                          className={`p-4 rounded-lg border ${
                            reward.available && userPoints.available >= reward.points
                              ? "bg-emerald-900/20 border-emerald-500/30"
                              : "bg-slate-700/30 border-slate-600/30"
                          }`}
                        >
                          <div className="flex justify-between items-start mb-2">
                            <div className="flex-1">
                              <div className="text-white font-medium text-sm">{reward.reward}</div>
                              <div className="text-gray-400 text-xs">Value: {reward.value}</div>
                            </div>
                            <div className="text-right">
                              <div className="text-emerald-400 font-bold">{reward.points}</div>
                              <div className="text-gray-400 text-xs">points</div>
                            </div>
                          </div>
                          
                          <Button
                            onClick={() => handleRedemption(restaurant.id, index)}
                            disabled={
                              !reward.available ||
                              userPoints.available < reward.points ||
                              isRedeeming ||
                              (selectedReward?.restaurantId === restaurant.id && selectedReward?.rewardIndex === index)
                            }
                            size="sm"
                            className={`w-full ${
                              reward.available && userPoints.available >= reward.points
                                ? "bg-emerald-600 hover:bg-emerald-700"
                                : "bg-gray-600 cursor-not-allowed"
                            }`}
                          >
                            {isRedeeming && selectedReward?.restaurantId === restaurant.id && selectedReward?.rewardIndex === index
                              ? "Redeeming..."
                              : !reward.available
                              ? "Temporarily Unavailable"
                              : userPoints.available < reward.points
                              ? `Need ${reward.points - userPoints.available} more points`
                              : "Redeem Now"
                            }
                          </Button>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* Earn More Points */}
        <Card className="bg-gradient-to-r from-blue-900/30 to-purple-900/30 border-blue-500/50 mt-12">
          <CardHeader>
            <CardTitle className="text-white text-center flex items-center justify-center gap-2">
              <Coins className="w-6 h-6 text-blue-400" />
              Earn More Planet Points for Pakistan Relief
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-3 gap-6 text-center">
              <div className="space-y-2">
                <div className="w-12 h-12 bg-emerald-600 rounded-full flex items-center justify-center mx-auto">
                  <Utensils className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-white font-semibold">Trade Devices</h3>
                <p className="text-gray-300 text-sm">Get 250 points per device traded for Pakistan flood relief</p>
                <Button size="sm" className="bg-emerald-600 hover:bg-emerald-700">
                  Trade Now
                </Button>
              </div>
              
              <div className="space-y-2">
                <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center mx-auto">
                  <Heart className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-white font-semibold">Direct Donation</h3>
                <p className="text-gray-300 text-sm">Earn 1 point per AED donated to flood relief</p>
                <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
                  Donate
                </Button>
              </div>
              
              <div className="space-y-2">
                <div className="w-12 h-12 bg-purple-600 rounded-full flex items-center justify-center mx-auto">
                  <Award className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-white font-semibold">Refer Friends</h3>
                <p className="text-gray-300 text-sm">Get 100 points for each friend who joins the mission</p>
                <Button size="sm" className="bg-purple-600 hover:bg-purple-700">
                  Share Link
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* How It Works */}
        <Card className="bg-slate-800/50 border-slate-700 mt-12">
          <CardHeader>
            <CardTitle className="text-white text-center">How Restaurant Rewards Work</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-4 gap-6 text-center">
              <div className="space-y-3">
                <div className="w-12 h-12 bg-emerald-600 rounded-full flex items-center justify-center mx-auto text-white font-bold">
                  1
                </div>
                <h3 className="text-white font-semibold">Earn Points</h3>
                <p className="text-gray-300 text-sm">Trade devices or donate to Pakistan flood relief mission</p>
              </div>
              
              <div className="space-y-3">
                <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center mx-auto text-white font-bold">
                  2
                </div>
                <h3 className="text-white font-semibold">Choose Reward</h3>
                <p className="text-gray-300 text-sm">Browse available rewards from Emily Chilly & B&B Restaurant</p>
              </div>
              
              <div className="space-y-3">
                <div className="w-12 h-12 bg-purple-600 rounded-full flex items-center justify-center mx-auto text-white font-bold">
                  3
                </div>
                <h3 className="text-white font-semibold">Redeem</h3>
                <p className="text-gray-300 text-sm">Get instant voucher code via email and SMS</p>
              </div>
              
              <div className="space-y-3">
                <div className="w-12 h-12 bg-green-600 rounded-full flex items-center justify-center mx-auto text-white font-bold">
                  4
                </div>
                <h3 className="text-white font-semibold">Enjoy & Help</h3>
                <p className="text-gray-300 text-sm">Visit restaurant and present code - your meal helps Pakistan flood victims</p>
              </div>
            </div>
            
            <div className="text-center mt-8 p-4 bg-blue-900/20 rounded-lg">
              <p className="text-blue-200 text-sm">
                <CheckCircle className="w-4 h-4 inline mr-2" />
                All rewards verified by restaurant partners • Impact verified by Pakistan Association Dubai
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}