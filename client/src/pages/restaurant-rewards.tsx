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
    // Middle Eastern Cuisine
    {
      id: "emily-chilly",
      name: "Emily Chilly",
      cuisine: "Lebanese & Middle Eastern",
      location: "Dubai Marina, JBR",
      phone: "+971 4 123 4567",
      website: "https://emilychilly.com",
      rating: 4.8,
      image: "/restaurants/emily-chilly-interior.jpg",
      specialOffer: "🌌 Metaverse Explorer Bonus: Double points for sustainability mission contributors",
      missionBonus: "🚀 Cosmic Rewards: Extra 150 points for every device traded in our planet protection program",
      rewards: [
        {
          points: 400,
          reward: "🍽️ Mezze Platter Voucher",
          value: "AED 25",
          available: true
        },
        {
          points: 800,
          reward: "🥙 Lebanese Feast for One",
          value: "AED 65",
          available: true
        },
        {
          points: 1800,
          reward: "🍷 Dinner Date Experience",
          value: "AED 150",
          available: true
        },
        {
          points: 4500,
          reward: "👨‍🍳 Private Lebanese Cooking Class",
          value: "AED 300",
          available: true
        }
      ]
    },
    {
      id: "al-hadheerah",
      name: "Al Hadheerah Desert Restaurant",
      cuisine: "Traditional Emirati",
      location: "Al Sahra Desert Resort",
      phone: "+971 4 832 9999",
      website: "https://alhadheerah.com",
      rating: 4.9,
      image: "/restaurants/al-hadheerah.jpg",
      specialOffer: "🏜️ Desert Gaming Vault: Traditional desert dining with modern sustainability rewards",
      missionBonus: "🐪 Nomad Points: Cultural immersion bonus for eco-warriors",
      rewards: [
        {
          points: 600,
          reward: "🍖 Emirati BBQ Platter",
          value: "AED 35",
          available: true
        },
        {
          points: 1200,
          reward: "🎭 Traditional Dinner & Show",
          value: "AED 85",
          available: true
        },
        {
          points: 2800,
          reward: "🌟 VIP Desert Experience",
          value: "AED 200",
          available: true
        }
      ]
    },

    // Asian Cuisine Hub
    {
      id: "nobu-dubai",
      name: "Nobu Dubai",
      cuisine: "Japanese Fine Dining",
      location: "Atlantis The Palm",
      phone: "+971 4 426 2626",
      website: "https://nobudubai.com",
      rating: 4.7,
      image: "/restaurants/nobu-dubai.jpg",
      specialOffer: "🍣 Samurai Rewards: Premium sushi experiences for metaverse champions",
      missionBonus: "⛩️ Zen Master Bonus: Meditation dining for planet protectors",
      rewards: [
        {
          points: 1500,
          reward: "🍱 Omakase Lunch Set",
          value: "AED 120",
          available: true
        },
        {
          points: 3500,
          reward: "🍣 Premium Sushi Experience",
          value: "AED 280",
          available: true
        },
        {
          points: 6000,
          reward: "👨‍🍳 Chef's Signature Tasting",
          value: "AED 450",
          available: false
        }
      ]
    },
    {
      id: "pai-thai",
      name: "Pai Thai Restaurant",
      cuisine: "Royal Thai",
      location: "Jumeirah Al Qasr",
      phone: "+971 4 366 8888",
      rating: 4.6,
      image: "/restaurants/pai-thai.jpg",
      specialOffer: "🌶️ Spice Galaxy: Authentic Thai flavors with cosmic point multipliers",
      missionBonus: "🐘 Thai Temple Blessing: Cultural bonus for sustainability heroes",
      rewards: [
        {
          points: 700,
          reward: "🍜 Royal Thai Curry Set",
          value: "AED 45",
          available: true
        },
        {
          points: 1400,
          reward: "🦐 Seafood Tom Yum Feast",
          value: "AED 95",
          available: true
        },
        {
          points: 3200,
          reward: "🍛 Royal Banquet for Two",
          value: "AED 220",
          available: true
        }
      ]
    },
    {
      id: "tresind-studio",
      name: "Tresind Studio",
      cuisine: "Modern Indian",
      location: "DIFC",
      phone: "+971 4 572 4545",
      rating: 4.8,
      image: "/restaurants/tresind-studio.jpg",
      specialOffer: "🌟 Bollywood Metaverse: Contemporary Indian with futuristic presentation",
      missionBonus: "🕉️ Karma Points: Spiritual dining rewards for environmental warriors",
      rewards: [
        {
          points: 900,
          reward: "🍛 Modern Indian Tasting",
          value: "AED 65",
          available: true
        },
        {
          points: 2100,
          reward: "🔥 Molecular Gastronomy Experience",
          value: "AED 150",
          available: true
        },
        {
          points: 4800,
          reward: "👑 Chef's Laboratory Journey",
          value: "AED 350",
          available: true
        }
      ]
    },

    // European Fine Dining
    {
      id: "la-petite-maison",
      name: "La Petite Maison",
      cuisine: "French Mediterranean",
      location: "DIFC",
      phone: "+971 4 439 0505",
      website: "https://lapetitemaison-dubai.com",
      rating: 4.7,
      image: "/restaurants/la-petite-maison.jpg",
      specialOffer: "🇫🇷 Parisian Portal: French elegance meets sustainability gaming",
      missionBonus: "🍷 Wine Cosmos: Premium vintages for eco-conscious diners",
      rewards: [
        {
          points: 1200,
          reward: "🥖 French Riviera Lunch",
          value: "AED 85",
          available: true
        },
        {
          points: 2800,
          reward: "🍾 Wine Pairing Dinner",
          value: "AED 200",
          available: true
        },
        {
          points: 5500,
          reward: "✨ Chef's Private Table",
          value: "AED 400",
          available: true
        }
      ]
    },
    {
      id: "osteria-mozza",
      name: "Osteria Mozza",
      cuisine: "Authentic Italian",
      location: "Hilton Dubai The Walk",
      phone: "+971 4 399 1111",
      rating: 4.5,
      image: "/restaurants/osteria-mozza.jpg",
      specialOffer: "🍕 Italian Space Station: Wood-fired pizzas with galactic gaming rewards",
      missionBonus: "🇮🇹 Nonna's Blessing: Family recipes for planet protectors",
      rewards: [
        {
          points: 600,
          reward: "🍕 Artisan Pizza & Salad",
          value: "AED 40",
          available: true
        },
        {
          points: 1300,
          reward: "🍝 Pasta & Wine Evening",
          value: "AED 90",
          available: true
        },
        {
          points: 2900,
          reward: "🧀 Truffle Tasting Experience",
          value: "AED 210",
          available: true
        }
      ]
    },

    // International Fusion & Cafes
    {
      id: "bb-restaurant",
      name: "B&B Restaurant",
      cuisine: "International Fusion",
      location: "Business Bay, Downtown",
      phone: "+971 4 987 6543",
      rating: 4.6,
      image: "/restaurants/bb-restaurant-dining.jpg",
      specialOffer: "🌍 Global Gaming Hub: International flavors with metaverse point boosters",
      missionBonus: "🍹 Fusion Reactor: Weekend brunch upgrades for mission contributors",
      rewards: [
        {
          points: 350,
          reward: "☕ Fusion Breakfast Bowl",
          value: "AED 25",
          available: true
        },
        {
          points: 750,
          reward: "🥂 Weekend Brunch Special",
          value: "AED 55",
          available: true
        },
        {
          points: 1700,
          reward: "🍾 Champagne Brunch for Two",
          value: "AED 120",
          available: true
        },
        {
          points: 3800,
          reward: "👨‍🍳 Chef's Fusion Laboratory",
          value: "AED 250",
          available: false
        }
      ]
    },
    {
      id: "suma-coffee",
      name: "Suma Coffee & Kitchen",
      cuisine: "Specialty Coffee & Brunch",
      location: "Al Serkal Avenue",
      phone: "+971 4 347 7749",
      rating: 4.4,
      image: "/restaurants/suma-coffee.jpg",
      specialOffer: "☕ Caffeine Cosmos: Artisan coffee with productivity point multipliers",
      missionBonus: "🌱 Bean to Cup Karma: Sustainable coffee rewards for eco-heroes",
      rewards: [
        {
          points: 200,
          reward: "☕ Premium Coffee & Pastry",
          value: "AED 15",
          available: true
        },
        {
          points: 450,
          reward: "🥐 Artisan Brunch Set",
          value: "AED 35",
          available: true
        },
        {
          points: 900,
          reward: "🧑‍🍳 Coffee Cupping Session",
          value: "AED 65",
          available: true
        }
      ]
    },

    // Dessert & Sweet Experiences
    {
      id: "sticky-pudding-co",
      name: "Sticky Pudding Co.",
      cuisine: "Gourmet Desserts",
      location: "City Walk",
      phone: "+971 4 232 4545",
      rating: 4.3,
      image: "/restaurants/sticky-pudding.jpg",
      specialOffer: "🍰 Sugar Rush Galaxy: Sweet rewards for metaverse achievements",
      missionBonus: "🍭 Candy Land Bonus: Extra dessert credits for planet savers",
      rewards: [
        {
          points: 300,
          reward: "🍮 Signature Sticky Pudding",
          value: "AED 20",
          available: true
        },
        {
          points: 650,
          reward: "🎂 Custom Cake Creation",
          value: "AED 45",
          available: true
        },
        {
          points: 1200,
          reward: "🍫 Chocolate Workshop Experience",
          value: "AED 85",
          available: true
        }
      ]
    },

    // Premium Steakhouse
    {
      id: "prime68",
      name: "Prime68 Steakhouse",
      cuisine: "Premium Steaks & Grills",
      location: "JW Marriott Marquis",
      phone: "+971 4 414 3000",
      website: "https://prime68dubai.com",
      rating: 4.6,
      image: "/restaurants/prime68.jpg",
      specialOffer: "🥩 Carnivore Cosmos: Premium steaks with galactic point rewards",
      missionBonus: "🔥 Grill Master Quest: BBQ experiences for environmental champions",
      rewards: [
        {
          points: 1800,
          reward: "🥩 Wagyu Steak Dinner",
          value: "AED 135",
          available: true
        },
        {
          points: 3200,
          reward: "🍖 Tomahawk Experience for Two",
          value: "AED 240",
          available: true
        },
        {
          points: 6500,
          reward: "👑 Ultimate Meat Lover's Journey",
          value: "AED 480",
          available: true
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
            <div className="relative">
              <Utensils className="w-12 h-12 text-emerald-400" />
              <div className="absolute -top-1 -right-1 w-4 h-4 bg-purple-500 rounded-full animate-pulse"></div>
            </div>
            <span className="text-4xl font-bold bg-gradient-to-r from-emerald-400 via-purple-400 to-blue-400 bg-clip-text text-transparent">
              🌌 Metaverse F&B Rewards 🚀
            </span>
          </div>
          <h1 className="text-4xl font-bold text-white mb-4">
            🍽️ Cosmic Dining Adventures Await
          </h1>
          <p className="text-xl text-gray-300 max-w-4xl mx-auto">
            Experience Dubai's finest restaurants through our metaverse tombola system! Earn Planet Points through sustainability missions, spin the cosmic wheel, and unlock premium dining vouchers across 10+ international cuisine partners.
          </p>
          <div className="mt-6 flex flex-wrap justify-center gap-3">
            <div className="bg-purple-900/30 border border-purple-500/30 rounded-full px-4 py-2 text-purple-300 text-sm">
              🎮 10+ Restaurant Partners
            </div>
            <div className="bg-blue-900/30 border border-blue-500/30 rounded-full px-4 py-2 text-blue-300 text-sm">
              🌍 8 International Cuisines
            </div>
            <div className="bg-emerald-900/30 border border-emerald-500/30 rounded-full px-4 py-2 text-emerald-300 text-sm">
              🏆 Premium Dining Experiences
            </div>
          </div>
        </div>

        {/* Metaverse Gaming Hub Banner */}
        <Card className="bg-gradient-to-r from-purple-900/40 via-indigo-900/40 to-pink-900/40 border-purple-500/50 mb-8 relative overflow-hidden">
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-4 left-8 w-2 h-2 bg-purple-400 rounded-full animate-pulse"></div>
            <div className="absolute top-8 right-12 w-1 h-1 bg-blue-400 rounded-full animate-pulse delay-300"></div>
            <div className="absolute bottom-6 left-16 w-2 h-2 bg-pink-400 rounded-full animate-pulse delay-700"></div>
            <div className="absolute bottom-8 right-8 w-1 h-1 bg-cyan-400 rounded-full animate-pulse delay-1000"></div>
          </div>
          <CardContent className="p-6 relative z-10">
            <div className="text-center">
              <div className="flex items-center justify-center gap-3 mb-4">
                <div className="relative">
                  <Heart className="w-8 h-8 text-purple-400" />
                  <div className="absolute -top-1 -right-1 w-3 h-3 bg-pink-500 rounded-full animate-ping"></div>
                </div>
                <span className="text-2xl font-bold text-white">🎮 Metaverse F&B Gaming Hub Active 🌌</span>
              </div>
              <p className="text-purple-200 mb-4">
                Every cosmic spin and dining experience powers global sustainability missions! 
                <br />🚀 Join 2,847+ heroes earning rewards while saving the planet through gaming.
              </p>
              <div className="grid grid-cols-4 gap-4 text-center max-w-2xl mx-auto">
                <div>
                  <div className="text-2xl font-bold text-purple-400">2,847</div>
                  <div className="text-purple-200 text-sm">🎮 Active Gamers</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-pink-400">47,392</div>
                  <div className="text-pink-200 text-sm">🎫 Vouchers Earned</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-cyan-400">156</div>
                  <div className="text-cyan-200 text-sm">🏆 Achievements</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-emerald-400">78</div>
                  <div className="text-emerald-200 text-sm">⏰ Days to GitEx</div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Metaverse Points Dashboard */}
        <Card className="bg-gradient-to-r from-purple-900/40 via-emerald-900/30 to-blue-900/40 border-purple-500/50 mb-12 relative overflow-hidden">
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-2 left-4 w-1 h-1 bg-emerald-400 rounded-full animate-pulse"></div>
            <div className="absolute top-6 right-8 w-2 h-2 bg-purple-400 rounded-full animate-pulse delay-300"></div>
            <div className="absolute bottom-4 left-6 w-1 h-1 bg-blue-400 rounded-full animate-pulse delay-700"></div>
          </div>
          <CardHeader>
            <CardTitle className="text-white text-center flex items-center justify-center gap-2 relative z-10">
              <div className="relative">
                <Coins className="w-6 h-6 text-purple-400" />
                <div className="absolute -top-1 -right-1 w-3 h-3 bg-emerald-500 rounded-full animate-pulse"></div>
              </div>
              🌌 Your Metaverse F&B Wallet
            </CardTitle>
          </CardHeader>
          <CardContent className="relative z-10">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              <div className="text-center">
                <div className="text-3xl font-bold text-purple-400">{userPoints.total}</div>
                <div className="text-purple-200 text-sm">⚡ Total Power</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-emerald-400">{userPoints.available}</div>
                <div className="text-emerald-200 text-sm">🎫 Spendable Credits</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-cyan-400">{userPoints.donated}</div>
                <div className="text-cyan-200 text-sm">💫 Mission Invested</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-pink-400">{userPoints.earned}</div>
                <div className="text-pink-200 text-sm">🎮 Today's Gains</div>
              </div>
            </div>
            
            <div className="text-center mt-6">
              <div className="bg-gradient-to-r from-purple-900/50 to-pink-900/50 border border-purple-500/50 rounded-lg p-4 inline-block">
                <div className="flex items-center gap-2 text-purple-300">
                  <div className="relative">
                    <Heart className="w-5 h-5" />
                    <div className="absolute -top-1 -right-1 w-2 h-2 bg-pink-500 rounded-full animate-ping"></div>
                  </div>
                  <span className="font-semibold">🚀 Metaverse Gaming Boost Active!</span>
                </div>
                <div className="text-purple-200 text-sm mt-1">
                  Playing the cosmic tombola earns 3x points at all F&B partners + sustainability impact
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