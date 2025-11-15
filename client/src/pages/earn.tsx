import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  Gift, Smartphone, Droplets, ShoppingBag, Crown, Star, CheckCircle, 
  Users, Trophy, Zap, Shield, ArrowRight, Recycle, TrendingUp, Award, 
  Sparkles, UserPlus, Camera, Building2, Heart, Coffee
} from "lucide-react";
import { Link, useLocation } from "wouter";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { shopifyCartService } from "@/lib/shopify-cart";
import showerFilterCollage from "@assets/collage_1755270492135.jpg";
import membershipCard from "@assets/Aquacafe_byDeliWer_Card_Corners_1755482696304.png";
import pizzaImage from "@assets/stock_images/delicious_pizza_clos_ace0f742.jpg";
import bobaTeaImage from "@assets/stock_images/kulfi_indian_ice_cre_64eeba10.jpg";
import happyDiningImage from "@assets/stock_images/happy_people_eating__21b9cf0b.jpg";

export default function EarnRewards() {
  const [, setLocation] = useLocation();
  const [isOrderLoading, setIsOrderLoading] = useState(false);
  const { toast } = useToast();

  const handleOrderStarterKit = async () => {
    setIsOrderLoading(true);
    try {
      const starterKitProduct = {
        id: "aquacafe-starter-kit",
        variantId: "aquacafe-starter-kit-loyalty-gateway",
        title: "AquaCafe Planet Hero Starter Kit - Loyalty Gateway",
        variant: "Standard",
        price: 99,
        quantity: 1,
        image: "/aquacafe_shower_main_1755270492134.jpg",
      };
      
      await shopifyCartService.addToCart(starterKitProduct);
      
      toast({
        title: "Added to Cart!",
        description: "AquaCafe Loyalty Starter Kit (AED 99) - Your gateway to sustainability rewards",
      });
      
      setLocation('/cart');
    } catch (error) {
      console.error('Error adding to cart:', error);
      toast({
        title: "Error",
        description: "Failed to add to cart. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsOrderLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-dubai-gradient">
      <div className="container mx-auto px-4 py-12">
        
        {/* Hero Section - Start Your Journey */}
        <div className="text-center mb-16 relative overflow-hidden rounded-3xl bg-gradient-to-br from-emerald-900/40 to-blue-900/40 border-2 border-emerald-500/50 p-16 backdrop-blur-sm">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(34,197,94,0.1)_0%,transparent_70%)]"></div>
          <div className="relative z-10">
            <div className="inline-flex items-center gap-2 bg-emerald-500/20 text-emerald-400 px-6 py-3 rounded-full mb-8 border border-emerald-500/50">
              <Gift className="w-6 h-6" />
              <span className="font-bold text-lg">EARN REWARDS GATEWAY</span>
            </div>
            <h1 className="text-5xl md:text-7xl font-black text-white mb-8">
              Earn Planet Impact Credits
              <span className="block text-emerald-400 mt-4">Through Sustainable Actions</span>
            </h1>
            <p className="text-2xl text-gray-300 max-w-4xl mx-auto mb-12 leading-relaxed">
              Turn your everyday actions into rewards. Start with AquaCafe Loyalty, earn PICs through referrals, trade-ins, and purchases, then climb the Planet Hero leaderboard.
            </p>
          </div>
        </div>

        {/* Membership Journey - Step by Step */}
        <div className="mb-20">
          <h2 className="text-4xl md:text-5xl font-black text-white text-center mb-4">
            Your Membership Journey
          </h2>
          <p className="text-center text-xl text-gray-300 max-w-2xl mx-auto mb-16">
            Follow this simple path to start earning PICs and making an impact
          </p>
          
          <div className="grid md:grid-cols-3 gap-8 mb-12">
            {/* Step 1: Join AquaCafe Loyalty */}
            <Card className="bg-gradient-to-br from-emerald-900/40 to-green-900/40 border-2 border-emerald-500/50 hover-elevate relative overflow-hidden" data-testid="card-step-join">
              <div className="absolute top-4 right-4 w-12 h-12 bg-emerald-500 rounded-full flex items-center justify-center font-black text-2xl text-white">
                1
              </div>
              <CardHeader className="text-center pt-12">
                <div className="w-full h-48 mb-6 rounded-lg overflow-hidden">
                  <img 
                    src={showerFilterCollage} 
                    alt="AquaCafe Products" 
                    className="w-full h-full object-cover"
                  />
                </div>
                <CardTitle className="text-white text-3xl">Join AquaCafe Loyalty</CardTitle>
              </CardHeader>
              <CardContent className="text-center space-y-6">
                <div className="bg-amber-500/20 border-2 border-amber-500/50 rounded-lg p-4">
                  <div className="text-4xl font-black text-amber-400 mb-2">AED 99</div>
                  <div className="text-gray-300 text-lg">Starter Kit</div>
                </div>
                <div className="space-y-3 text-left">
                  <div className="flex items-start gap-3">
                    <CheckCircle className="w-6 h-6 text-emerald-400 flex-shrink-0 mt-1" />
                    <p className="text-gray-300">Get FREE water filter & Level 2 Planet Hero status</p>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle className="w-6 h-6 text-emerald-400 flex-shrink-0 mt-1" />
                    <p className="text-gray-300">Unlock referral bonuses & trade-in multipliers</p>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle className="w-6 h-6 text-emerald-400 flex-shrink-0 mt-1" />
                    <p className="text-gray-300">Earn instant PICs with every action</p>
                  </div>
                </div>
                <Button 
                  onClick={handleOrderStarterKit}
                  disabled={isOrderLoading}
                  className="w-full bg-gradient-to-r from-emerald-600 to-green-600 hover:from-emerald-500 hover:to-green-500 text-white font-bold py-6 text-lg"
                  data-testid="button-order-starter-kit-step1"
                >
                  <Zap className="w-5 h-5 mr-2" />
                  {isOrderLoading ? "ADDING..." : "Get Starter Kit - AED 99"}
                </Button>
              </CardContent>
            </Card>

            {/* Step 2: Earn PICs */}
            <Card className="bg-gradient-to-br from-blue-900/40 to-cyan-900/40 border-2 border-blue-500/50 hover-elevate relative overflow-hidden" data-testid="card-step-earn">
              <div className="absolute top-4 right-4 w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center font-black text-2xl text-white">
                2
              </div>
              <CardHeader className="text-center pt-12">
                <div className="w-full h-48 mb-6 rounded-lg overflow-hidden">
                  <img 
                    src={happyDiningImage} 
                    alt="People enjoying rewards" 
                    className="w-full h-full object-cover"
                  />
                </div>
                <CardTitle className="text-white text-3xl">Earn PICs Multiple Ways</CardTitle>
              </CardHeader>
              <CardContent className="text-center space-y-6">
                <div className="bg-blue-500/20 border-2 border-blue-500/50 rounded-lg p-4">
                  <div className="text-4xl font-black text-blue-400 mb-2">100+</div>
                  <div className="text-gray-300 text-lg">PICs per Action</div>
                </div>
                <div className="space-y-3 text-left">
                  <div className="flex items-start gap-3">
                    <UserPlus className="w-6 h-6 text-blue-400 flex-shrink-0 mt-1" />
                    <p className="text-gray-300"><strong>Refer Friends:</strong> 500 PICs per signup</p>
                  </div>
                  <div className="flex items-start gap-3">
                    <Smartphone className="w-6 h-6 text-blue-400 flex-shrink-0 mt-1" />
                    <p className="text-gray-300"><strong>Trade iPhones:</strong> Up to 2,000 PICs</p>
                  </div>
                  <div className="flex items-start gap-3">
                    <ShoppingBag className="w-6 h-6 text-blue-400 flex-shrink-0 mt-1" />
                    <p className="text-gray-300"><strong>Make Purchases:</strong> 1 PIC per AED spent</p>
                  </div>
                </div>
                <Link href="/aquacafe" className="block">
                  <Button 
                    className="w-full bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-500 hover:to-cyan-500 text-white font-bold py-6 text-lg"
                    data-testid="button-explore-ways-to-earn"
                  >
                    <Star className="w-5 h-5 mr-2" />
                    Explore Ways to Earn
                  </Button>
                </Link>
              </CardContent>
            </Card>

            {/* Step 3: Climb the Leaderboard */}
            <Card className="bg-gradient-to-br from-purple-900/40 to-pink-900/40 border-2 border-purple-500/50 hover-elevate relative overflow-hidden" data-testid="card-step-compete">
              <div className="absolute top-4 right-4 w-12 h-12 bg-purple-500 rounded-full flex items-center justify-center font-black text-2xl text-white">
                3
              </div>
              <CardHeader className="text-center pt-12">
                <div className="w-full h-48 mb-6 rounded-lg overflow-hidden bg-gradient-to-br from-purple-600/30 to-pink-600/30 flex items-center justify-center">
                  <Trophy className="w-32 h-32 text-purple-400" />
                </div>
                <CardTitle className="text-white text-3xl">Become a Planet Hero</CardTitle>
              </CardHeader>
              <CardContent className="text-center space-y-6">
                <div className="bg-purple-500/20 border-2 border-purple-500/50 rounded-lg p-4">
                  <div className="text-4xl font-black text-purple-400 mb-2">TOP 100</div>
                  <div className="text-gray-300 text-lg">Global Ranking</div>
                </div>
                <div className="space-y-3 text-left">
                  <div className="flex items-start gap-3">
                    <Crown className="w-6 h-6 text-purple-400 flex-shrink-0 mt-1" />
                    <p className="text-gray-300">Reach Level 10 for exclusive perks</p>
                  </div>
                  <div className="flex items-start gap-3">
                    <Award className="w-6 h-6 text-purple-400 flex-shrink-0 mt-1" />
                    <p className="text-gray-300">Earn bonus multipliers at each level</p>
                  </div>
                  <div className="flex items-start gap-3">
                    <Sparkles className="w-6 h-6 text-purple-400 flex-shrink-0 mt-1" />
                    <p className="text-gray-300">Get featured on global leaderboard</p>
                  </div>
                </div>
                <Link href="/leaderboard" className="block">
                  <Button 
                    className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white font-bold py-6 text-lg"
                    data-testid="button-view-leaderboard"
                  >
                    <Trophy className="w-5 h-5 mr-2" />
                    View Leaderboard
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Ways to Earn PICs - Visual Grid */}
        <div className="mb-20">
          <h2 className="text-4xl md:text-5xl font-black text-white text-center mb-4">
            How to Earn Planet Impact Credits
          </h2>
          <p className="text-center text-xl text-gray-300 max-w-2xl mx-auto mb-16">
            Every sustainable action you take earns you PICs. Use them for rewards, discounts, or to support global causes.
          </p>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Referrals */}
            <Card className="bg-card/40 backdrop-blur-sm border-2 hover-elevate" data-testid="card-earn-referrals">
              <CardHeader>
                <div className="w-full h-64 mb-4 rounded-lg overflow-hidden bg-gradient-to-br from-emerald-600/30 to-blue-600/30 flex items-center justify-center">
                  <UserPlus className="w-32 h-32 text-emerald-400" />
                </div>
                <CardTitle className="text-2xl flex items-center gap-2">
                  <UserPlus className="w-6 h-6 text-emerald-400" />
                  Refer Friends
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-baseline gap-2">
                  <span className="text-4xl font-black text-emerald-400">500</span>
                  <span className="text-gray-400">PICs per signup</span>
                </div>
                <p className="text-gray-300">
                  Invite friends to join AquaCafe Loyalty. You both earn PICs when they get their starter kit.
                </p>
                <Badge className="bg-emerald-500/20 text-emerald-400 border-emerald-500/50">
                  Recurring Rewards
                </Badge>
              </CardContent>
            </Card>

            {/* iPhone Trade-ins */}
            <Card className="bg-card/40 backdrop-blur-sm border-2 hover-elevate" data-testid="card-earn-tradein">
              <CardHeader>
                <div className="w-full h-64 mb-4 rounded-lg overflow-hidden bg-gradient-to-br from-blue-600/30 to-purple-600/30 flex items-center justify-center">
                  <Smartphone className="w-32 h-32 text-blue-400" />
                </div>
                <CardTitle className="text-2xl flex items-center gap-2">
                  <Smartphone className="w-6 h-6 text-blue-400" />
                  iPhone Trade-ins
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-baseline gap-2">
                  <span className="text-4xl font-black text-blue-400">2,000</span>
                  <span className="text-gray-400">PICs max</span>
                </div>
                <p className="text-gray-300">
                  Trade in your old iPhone and earn PICs based on its value. Members get 2x PIC multipliers.
                </p>
                <Link href="/exchange">
                  <Button variant="outline" className="w-full" data-testid="button-trade-in">
                    Trade Now <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </Link>
              </CardContent>
            </Card>

            {/* Purchases */}
            <Card className="bg-card/40 backdrop-blur-sm border-2 hover-elevate" data-testid="card-earn-purchases">
              <CardHeader>
                <div className="w-full h-64 mb-4 rounded-lg overflow-hidden">
                  <img 
                    src={pizzaImage} 
                    alt="Shopping and dining" 
                    className="w-full h-full object-cover"
                  />
                </div>
                <CardTitle className="text-2xl flex items-center gap-2">
                  <ShoppingBag className="w-6 h-6 text-amber-400" />
                  Purchases & Dining
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-baseline gap-2">
                  <span className="text-4xl font-black text-amber-400">1:1</span>
                  <span className="text-gray-400">AED to PIC ratio</span>
                </div>
                <p className="text-gray-300">
                  Earn 1 PIC for every AED spent on AquaCafe products and partner restaurants.
                </p>
                <Link href="/aquacafe">
                  <Button variant="outline" className="w-full" data-testid="button-shop-now">
                    Shop Now <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </Link>
              </CardContent>
            </Card>

            {/* Workshops & Events */}
            <Card className="bg-card/40 backdrop-blur-sm border-2 hover-elevate" data-testid="card-earn-events">
              <CardHeader>
                <div className="w-full h-64 mb-4 rounded-lg overflow-hidden">
                  <img 
                    src={bobaTeaImage} 
                    alt="Workshops and events" 
                    className="w-full h-full object-cover"
                  />
                </div>
                <CardTitle className="text-2xl flex items-center gap-2">
                  <Coffee className="w-6 h-6 text-orange-400" />
                  Workshops & Events
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-baseline gap-2">
                  <span className="text-4xl font-black text-orange-400">200</span>
                  <span className="text-gray-400">PICs per event</span>
                </div>
                <p className="text-gray-300">
                  Attend sustainability workshops, water demos at Baker's Kitchen, and AquaCafe events.
                </p>
                <Badge className="bg-orange-500/20 text-orange-400 border-orange-500/50">
                  Monthly Events
                </Badge>
              </CardContent>
            </Card>

            {/* Social Sharing */}
            <Card className="bg-card/40 backdrop-blur-sm border-2 hover-elevate" data-testid="card-earn-social">
              <CardHeader>
                <div className="w-full h-64 mb-4 rounded-lg overflow-hidden bg-gradient-to-br from-pink-600/30 to-rose-600/30 flex items-center justify-center">
                  <Camera className="w-32 h-32 text-pink-400" />
                </div>
                <CardTitle className="text-2xl flex items-center gap-2">
                  <Camera className="w-6 h-6 text-pink-400" />
                  Social Media Sharing
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-baseline gap-2">
                  <span className="text-4xl font-black text-pink-400">50</span>
                  <span className="text-gray-400">PICs per post</span>
                </div>
                <p className="text-gray-300">
                  Share your sustainability journey on social media and earn PICs for spreading awareness.
                </p>
                <Badge className="bg-pink-500/20 text-pink-400 border-pink-500/50">
                  Daily Limit: 5 posts
                </Badge>
              </CardContent>
            </Card>

            {/* Corporate Partnerships */}
            <Card className="bg-card/40 backdrop-blur-sm border-2 hover-elevate" data-testid="card-earn-corporate">
              <CardHeader>
                <div className="w-full h-64 mb-4 rounded-lg overflow-hidden bg-gradient-to-br from-slate-600/30 to-blue-600/30 flex items-center justify-center">
                  <Building2 className="w-32 h-32 text-slate-400" />
                </div>
                <CardTitle className="text-2xl flex items-center gap-2">
                  <Building2 className="w-6 h-6 text-slate-400" />
                  Corporate Actions
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-baseline gap-2">
                  <span className="text-4xl font-black text-slate-400">5,000+</span>
                  <span className="text-gray-400">PICs team bonus</span>
                </div>
                <p className="text-gray-300">
                  Companies can earn massive PIC bonuses through bulk trade-ins and sustainability initiatives.
                </p>
                <Link href="/corporate">
                  <Button variant="outline" className="w-full" data-testid="button-corporate-program">
                    Corporate Program <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Support Global Sustainability - Stars Integration */}
        <div className="mb-20">
          <Card className="bg-gradient-to-br from-amber-900/40 to-orange-900/40 border-2 border-amber-500/50 overflow-hidden">
            <CardContent className="p-12">
              <div className="grid md:grid-cols-2 gap-8 items-center">
                <div>
                  <div className="inline-flex items-center gap-2 bg-amber-500/20 text-amber-400 px-4 py-2 rounded-full mb-6 border border-amber-500/50">
                    <Star className="w-5 h-5" />
                    <span className="font-bold">SUPPORT GLOBAL CAUSES</span>
                  </div>
                  <h3 className="text-4xl font-black text-white mb-6">
                    Use Your PICs to Support Sustainability
                  </h3>
                  <p className="text-xl text-gray-300 mb-8">
                    Convert your Planet Impact Credits into Stars to support clean water access, e-waste recycling, 
                    and environmental campaigns worldwide. Every contribution makes a real difference.
                  </p>
                  <div className="space-y-4 mb-8">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 bg-amber-500/20 rounded-full flex items-center justify-center">
                        <Droplets className="w-6 h-6 text-amber-400" />
                      </div>
                      <span className="text-gray-300">Clean Water Projects</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 bg-amber-500/20 rounded-full flex items-center justify-center">
                        <Recycle className="w-6 h-6 text-amber-400" />
                      </div>
                      <span className="text-gray-300">E-Waste Collection & Recycling</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 bg-amber-500/20 rounded-full flex items-center justify-center">
                        <Heart className="w-6 h-6 text-amber-400" />
                      </div>
                      <span className="text-gray-300">Environmental Awareness</span>
                    </div>
                  </div>
                  <Link href="/impact">
                    <Button 
                      size="lg"
                      className="bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-500 hover:to-orange-500 text-white font-bold px-8 py-6 text-lg"
                      data-testid="button-support-causes"
                    >
                      <Star className="w-5 h-5 mr-2" />
                      Support Global Sustainability
                    </Button>
                  </Link>
                </div>
                <div className="relative">
                  <div className="aspect-square rounded-2xl bg-gradient-to-br from-amber-600/20 to-orange-600/20 border-2 border-amber-500/50 flex items-center justify-center">
                    <div className="text-center">
                      <Star className="w-32 h-32 text-amber-400 mx-auto mb-4" />
                      <div className="text-5xl font-black text-amber-400 mb-2">100 PICs</div>
                      <div className="text-gray-300 text-xl">=</div>
                      <div className="text-5xl font-black text-white mt-2">1 Star</div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* AquaCafe Membership Tiers */}
        <div className="mb-20">
          <h2 className="text-4xl md:text-5xl font-black text-white text-center mb-4">
            Membership Levels & Benefits
          </h2>
          <p className="text-center text-xl text-gray-300 max-w-2xl mx-auto mb-16">
            Climb the ranks and unlock exclusive perks with each level
          </p>

          <div className="grid md:grid-cols-4 gap-6">
            <Card className="bg-card/40 border-2 hover-elevate text-center" data-testid="card-level-1">
              <CardHeader>
                <div className="w-16 h-16 bg-gray-500 rounded-full mx-auto mb-4 flex items-center justify-center text-2xl font-black text-white">
                  1
                </div>
                <CardTitle className="text-xl">Starter</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-400 mb-4">0 - 500 PICs</p>
                <div className="space-y-2 text-sm text-gray-300">
                  <div>✓ Basic PIC earning</div>
                  <div>✓ 1x multiplier</div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-emerald-900/40 to-green-900/40 border-2 border-emerald-500/50 hover-elevate text-center" data-testid="card-level-2">
              <CardHeader>
                <div className="w-16 h-16 bg-emerald-500 rounded-full mx-auto mb-4 flex items-center justify-center text-2xl font-black text-white">
                  2
                </div>
                <CardTitle className="text-xl text-white">Planet Hero</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-300 mb-4">500 - 2,500 PICs</p>
                <div className="space-y-2 text-sm text-gray-300">
                  <div>✓ Starter Kit benefits</div>
                  <div>✓ 2x PIC multiplier</div>
                  <div>✓ Referral bonuses</div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-blue-900/40 to-cyan-900/40 border-2 border-blue-500/50 hover-elevate text-center" data-testid="card-level-5">
              <CardHeader>
                <div className="w-16 h-16 bg-blue-500 rounded-full mx-auto mb-4 flex items-center justify-center text-2xl font-black text-white">
                  5
                </div>
                <CardTitle className="text-xl text-white">Champion</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-300 mb-4">2,500 - 10,000 PICs</p>
                <div className="space-y-2 text-sm text-gray-300">
                  <div>✓ 3x PIC multiplier</div>
                  <div>✓ VIP events access</div>
                  <div>✓ Partner discounts</div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-purple-900/40 to-pink-900/40 border-2 border-purple-500/50 hover-elevate text-center" data-testid="card-level-10">
              <CardHeader>
                <div className="w-16 h-16 bg-purple-500 rounded-full mx-auto mb-4 flex items-center justify-center text-2xl font-black text-white">
                  10
                </div>
                <CardTitle className="text-xl text-white">Legend</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-300 mb-4">10,000+ PICs</p>
                <div className="space-y-2 text-sm text-gray-300">
                  <div>✓ 5x PIC multiplier</div>
                  <div>✓ Lifetime rewards</div>
                  <div>✓ Leaderboard featured</div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Final CTA */}
        <div className="text-center bg-gradient-to-r from-emerald-900/40 to-blue-900/40 rounded-3xl p-16 border-2 border-emerald-500/50">
          <h2 className="text-4xl md:text-5xl font-black text-white mb-6">
            Ready to Start Earning?
          </h2>
          <p className="text-2xl text-gray-300 max-w-3xl mx-auto mb-12">
            Join AquaCafe Loyalty today and unlock the full potential of Planet Impact Credits
          </p>
          <Button 
            size="lg"
            onClick={handleOrderStarterKit}
            disabled={isOrderLoading}
            className="bg-gradient-to-r from-emerald-600 to-green-600 hover:from-emerald-500 hover:to-green-500 text-white font-black px-16 py-8 text-2xl shadow-2xl rounded-full border-4 border-white/20"
            data-testid="button-order-starter-kit-final"
          >
            <Zap className="w-8 h-8 mr-3" />
            {isOrderLoading ? "ADDING TO CART..." : "Get Started - AED 99"}
          </Button>
          <p className="text-gray-400 mt-6">
            Join thousands of Planet Heroes making Dubai more sustainable
          </p>
        </div>

      </div>
    </div>
  );
}
