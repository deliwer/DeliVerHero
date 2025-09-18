import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Gift, Smartphone, Droplets, ShoppingBag, Crown, Star, CheckCircle, Utensils, Coffee, Heart } from "lucide-react";
import { Link } from "wouter";

export default function Rewards() {
  return (
    <div className="min-h-screen bg-dubai-gradient">
      <div className="container mx-auto px-4 py-8">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-hero-green-500/20 text-hero-green-400 px-4 py-2 rounded-full mb-6">
            <Gift className="w-5 h-5" />
            <span className="font-medium">Planet Points Rewards</span>
          </div>
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
            Rewards Marketplace
            <span className="block text-hero-green-400">Your Impact Pays Off</span>
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-8">
            Transform your Planet Points into amazing rewards. From the latest tech and premium water systems to restaurant vouchers and exclusive experiences - your environmental impact has real value.
          </p>
          
          {/* Planet Points Gaming CTA */}
          <div className="bg-gradient-to-r from-purple-600/20 to-hero-green-600/20 border border-purple-500/40 rounded-2xl p-6 mb-8 max-w-4xl mx-auto">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-purple-500/20 rounded-full">
                  <Star className="w-8 h-8 text-yellow-400" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-white mb-2">🎮 Earn More Planet Points</h3>
                  <p className="text-gray-300">Play games, spin the Tombola wheel, and unlock achievements to boost your points balance</p>
                </div>
              </div>
              <Link href="/play">
                <Button className="bg-gradient-to-r from-purple-600 to-hero-green-600 hover:from-purple-700 hover:to-hero-green-700 text-white px-6 py-3 font-bold">
                  🎰 Play Now
                </Button>
              </Link>
            </div>
          </div>
        </div>

        {/* Point Balance */}
        <div className="bg-gradient-to-r from-slate-800/50 to-slate-700/50 rounded-2xl p-8 border border-slate-600 mb-12">
          <div className="text-center">
            <h3 className="text-lg text-gray-400 mb-2">Your Available Points</h3>
            <div className="text-6xl font-bold text-hero-green-400 mb-4">1,247</div>
            <div className="flex items-center justify-center gap-2">
              <Badge variant="secondary" className="bg-amber-500/20 text-amber-400">
                <Crown className="w-4 h-4 mr-1" />
                Bronze Hero
              </Badge>
              <span className="text-gray-400">•</span>
              <span className="text-gray-400">753 points to Silver</span>
            </div>
          </div>
        </div>

        {/* 🍽️ Restaurant Rewards - Featured Section */}
        <div className="mb-12">
          <div className="bg-gradient-to-r from-orange-900/50 to-yellow-900/50 rounded-2xl p-8 border border-orange-500/30 backdrop-blur-sm">
            <div className="text-center mb-8">
              <div className="flex items-center justify-center gap-2 mb-4">
                <Utensils className="w-8 h-8 text-orange-400" />
                <h2 className="text-3xl font-bold text-white">Restaurant Rewards</h2>
              </div>
              <p className="text-gray-300 text-lg">
                Enjoy delicious meals at Dubai's best restaurants while continuing your sustainability journey.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-6 mb-6">
              <Card className="bg-black/30 border-orange-500/30">
                <CardHeader>
                  <CardTitle className="text-white flex items-center gap-2">
                    <Coffee className="w-5 h-5 text-orange-500" />
                    Bakers Kitchen Partnership
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-300 mb-4">
                    Premium healthy dining experience with organic ingredients and sustainable practices.
                  </p>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-orange-400 font-bold">200 points</span>
                    <span className="text-gray-400">AED 50 voucher</span>
                  </div>
                  <Button className="bg-orange-600 hover:bg-orange-700 text-white w-full">
                    Redeem Voucher
                  </Button>
                </CardContent>
              </Card>

              <Card className="bg-black/30 border-yellow-500/30">
                <CardHeader>
                  <CardTitle className="text-white flex items-center gap-2">
                    <Heart className="w-5 h-5 text-yellow-500" />
                    Local Partner Network
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-300 mb-4">
                    Growing network of eco-conscious restaurants across Dubai offering exclusive Planet Hero discounts.
                  </p>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-yellow-400 font-bold">100-500 points</span>
                    <span className="text-gray-400">Various discounts</span>
                  </div>
                  <Button className="bg-yellow-600 hover:bg-yellow-700 text-white w-full">
                    Browse Partners
                  </Button>
                </CardContent>
              </Card>
            </div>

            <div className="text-center">
              <Link href="/restaurant-rewards">
                <Button className="bg-gradient-to-r from-orange-600 to-yellow-600 hover:from-orange-700 hover:to-yellow-700 text-white">
                  <Utensils className="w-4 h-4 mr-2" />
                  Explore All Restaurant Rewards
                </Button>
              </Link>
            </div>
          </div>
        </div>

        {/* Quick Redemption Options */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-white text-center mb-8">Quick Redemptions</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <Card className="bg-slate-800/50 border-slate-700">
              <CardHeader className="text-center">
                <Droplets className="w-12 h-12 text-emerald-500 mx-auto mb-4" />
                <CardTitle className="text-white">AquaCafe Credits</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <p className="text-gray-400 mb-4">Use points to discount your Starter Kit & refills.</p>
                <div className="text-2xl font-bold text-emerald-400 mb-4">50 points = AED 25</div>
                <Link href="/aquacafe">
                  <Button className="bg-emerald-600 hover:bg-emerald-700 text-white w-full">
                    Apply at Checkout
                  </Button>
                </Link>
              </CardContent>
            </Card>

            <Card className="bg-slate-800/50 border-slate-700">
              <CardHeader className="text-center">
                <ShoppingBag className="w-12 h-12 text-purple-500 mx-auto mb-4" />
                <CardTitle className="text-white">Partner Discounts</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <p className="text-gray-400 mb-4">Eco-friendly brands and sustainable products.</p>
                <div className="text-2xl font-bold text-purple-400 mb-4">Various Points</div>
                <Button className="bg-purple-600 hover:bg-purple-700 text-white w-full">
                  Browse Offers
                </Button>
              </CardContent>
            </Card>

            <Card className="bg-slate-800/50 border-slate-700">
              <CardHeader className="text-center">
                <Crown className="w-12 h-12 text-yellow-500 mx-auto mb-4" />
                <CardTitle className="text-white">Hero Status Perks</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <p className="text-gray-400 mb-4">Unlock Silver, Gold, and Platinum Hero benefits.</p>
                <div className="text-2xl font-bold text-yellow-400 mb-4">Level Rewards</div>
                <Link href="/leaderboard">
                  <Button className="bg-yellow-600 hover:bg-yellow-700 text-white w-full">
                    Check Status
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Premium Rewards */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-white text-center mb-8">Premium Rewards</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* iPhone 17 */}
            <Card className="bg-gradient-to-br from-slate-800/50 to-slate-700/50 border-slate-600">
              <CardHeader>
                <div className="w-full h-48 bg-gradient-to-br from-gray-900 to-black rounded-lg flex items-center justify-center mb-4">
                  <Smartphone className="w-20 h-20 text-white" />
                </div>
                <CardTitle className="text-white">iPhone 17 Pro</CardTitle>
                <Badge className="bg-hero-green-500/20 text-hero-green-400 w-fit">
                  Featured Reward
                </Badge>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-2xl font-bold text-hero-green-400">2,500 points</span>
                  <span className="text-gray-400 line-through">AED 4,999</span>
                </div>
                <p className="text-gray-300 mb-4 text-sm">
                  Latest iPhone with maximum trade-in credit applied for lowest point cost.
                </p>
                <Button className="w-full bg-hero-green-600 hover:bg-hero-green-700 text-white">
                  Redeem Now
                </Button>
              </CardContent>
            </Card>

            {/* Premium Water System */}
            <Card className="bg-gradient-to-br from-slate-800/50 to-slate-700/50 border-slate-600">
              <CardHeader>
                <div className="w-full h-48 bg-gradient-to-br from-blue-900 to-cyan-900 rounded-lg flex items-center justify-center mb-4">
                  <Droplets className="w-20 h-20 text-cyan-400" />
                </div>
                <CardTitle className="text-white">Hero Elite Water System</CardTitle>
                <Badge className="bg-dubai-blue-500/20 text-dubai-blue-400 w-fit">
                  Most Popular
                </Badge>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-2xl font-bold text-dubai-blue-400">1,800 points</span>
                  <span className="text-gray-400 line-through">AED 2,299</span>
                </div>
                <p className="text-gray-300 mb-4 text-sm">
                  Premium under-sink water purification system with professional installation.
                </p>
                <Button className="w-full bg-dubai-blue-600 hover:bg-dubai-blue-700 text-white">
                  Redeem Now
                </Button>
              </CardContent>
            </Card>

            {/* Exclusive Experience */}
            <Card className="bg-gradient-to-br from-slate-800/50 to-slate-700/50 border-slate-600">
              <CardHeader>
                <div className="w-full h-48 bg-gradient-to-br from-purple-900 to-pink-900 rounded-lg flex items-center justify-center mb-4">
                  <Star className="w-20 h-20 text-purple-400" />
                </div>
                <CardTitle className="text-white">VIP Dubai Experience</CardTitle>
                <Badge className="bg-purple-500/20 text-purple-400 w-fit">
                  Limited Edition
                </Badge>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-2xl font-bold text-purple-400">1,200 points</span>
                  <span className="text-gray-400">AED 1,500 value</span>
                </div>
                <p className="text-gray-300 mb-4 text-sm">
                  Exclusive Dubai sustainability tour with dining and unique experiences.
                </p>
                <Button className="w-full bg-purple-600 hover:bg-purple-700 text-white">
                  Redeem Now
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Redemption Process */}
        <div className="bg-slate-800/50 border border-slate-700 rounded-2xl p-8">
          <h3 className="text-2xl font-bold text-white mb-6 text-center">How Redemption Works</h3>
          <div className="grid md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="bg-hero-green-500/20 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="w-8 h-8 text-hero-green-400" />
              </div>
              <h4 className="font-bold text-white mb-2">Choose Reward</h4>
              <p className="text-gray-400 text-sm">Select from our curated rewards marketplace</p>
            </div>
            <div className="text-center">
              <div className="bg-dubai-blue-500/20 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <Gift className="w-8 h-8 text-dubai-blue-400" />
              </div>
              <h4 className="font-bold text-white mb-2">Redeem Points</h4>
              <p className="text-gray-400 text-sm">Use your earned Planet Points for payment</p>
            </div>
            <div className="text-center">
              <div className="bg-purple-500/20 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <ShoppingBag className="w-8 h-8 text-purple-400" />
              </div>
              <h4 className="font-bold text-white mb-2">Instant Delivery</h4>
              <p className="text-gray-400 text-sm">Get vouchers instantly or schedule delivery</p>
            </div>
            <div className="text-center">
              <div className="bg-yellow-500/20 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <Star className="w-8 h-8 text-yellow-400" />
              </div>
              <h4 className="font-bold text-white mb-2">Enjoy & Share</h4>
              <p className="text-gray-400 text-sm">Share your impact with the community</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}