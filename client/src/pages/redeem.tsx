import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Gift, Smartphone, Droplets, ShoppingBag, Crown, Star, CheckCircle } from "lucide-react";

export default function Redeem() {
  return (
    <div className="min-h-screen bg-dubai-gradient">
      <div className="container mx-auto px-4 py-8">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-hero-green-500/20 text-hero-green-400 px-4 py-2 rounded-full mb-6">
            <Gift className="w-5 h-5" />
            <span className="font-medium">Rewards Redemption</span>
          </div>
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
            Redeem Your Points
            <span className="block text-hero-green-400">Unlock Rewards</span>
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-8">
            Transform your Planet Points into amazing rewards. From the latest iPhone 17 to premium water systems, sustainable products, and exclusive experiences - your environmental impact pays off.
          </p>
        </div>

        {/* Point Balance */}
        <div className="bg-gradient-to-r from-slate-800/50 to-slate-700/50 rounded-2xl p-8 border border-slate-600 mb-12">
          <div className="text-center">
            <h3 className="text-lg text-gray-400 mb-2">Your Available Points</h3>
            <div className="text-6xl font-bold text-hero-green-400 mb-4">0</div>
            <div className="flex items-center justify-center gap-2">
              <Badge variant="secondary" className="bg-amber-500/20 text-amber-400">
                Bronze Hero
              </Badge>
              <span className="text-gray-400">•</span>
              <span className="text-gray-400">0 points to next level</span>
            </div>
          </div>
        </div>

        {/* Featured Rewards */}
        <div className="mb-12">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-white mb-4">Featured Rewards</h2>
            <p className="text-gray-300">Most popular redemptions from our sustainability heroes</p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* iPhone 17 */}
            <Card className="bg-slate-800/50 border-slate-700 backdrop-blur-sm relative overflow-hidden">
              <div className="absolute top-4 right-4">
                <Badge className="bg-yellow-500 text-black font-bold">MOST POPULAR</Badge>
              </div>
              <CardHeader className="text-center">
                <Smartphone className="w-16 h-16 text-hero-green-500 mx-auto mb-4" />
                <CardTitle className="text-white">iPhone 17 Pro Max</CardTitle>
                <div className="text-sm text-gray-400">Latest Apple Technology</div>
              </CardHeader>
              <CardContent>
                <div className="text-center mb-4">
                  <div className="text-3xl font-bold text-hero-green-400">1,200</div>
                  <div className="text-gray-400">Planet Points</div>
                </div>
                <div className="space-y-2 text-sm text-gray-400 mb-4">
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-hero-green-500" />
                    <span>128GB Storage</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-hero-green-500" />
                    <span>Pro Camera System</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-hero-green-500" />
                    <span>Free Trade-in Credit Applied</span>
                  </div>
                </div>
                <button className="w-full bg-hero-green-500 hover:bg-hero-green-600 text-white py-2 rounded-lg font-semibold transition-colors disabled:opacity-50 disabled:cursor-not-allowed" disabled>
                  Redeem (Need 1,200 points)
                </button>
              </CardContent>
            </Card>

            {/* AquaCafe System */}
            <Card className="bg-slate-800/50 border-slate-700 backdrop-blur-sm">
              <CardHeader className="text-center">
                <Droplets className="w-16 h-16 text-dubai-blue-500 mx-auto mb-4" />
                <CardTitle className="text-white">AquaCafe Premium</CardTitle>
                <div className="text-sm text-gray-400">Complete Water System</div>
              </CardHeader>
              <CardContent>
                <div className="text-center mb-4">
                  <div className="text-3xl font-bold text-dubai-blue-400">800</div>
                  <div className="text-gray-400">Planet Points</div>
                </div>
                <div className="space-y-2 text-sm text-gray-400 mb-4">
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-hero-green-500" />
                    <span>7-Stage Filtration</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-hero-green-500" />
                    <span>Shower Filter Included</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-hero-green-500" />
                    <span>Free Installation</span>
                  </div>
                </div>
                <button className="w-full bg-dubai-blue-500 hover:bg-dubai-blue-600 text-white py-2 rounded-lg font-semibold transition-colors disabled:opacity-50 disabled:cursor-not-allowed" disabled>
                  Redeem (Need 800 points)
                </button>
              </CardContent>
            </Card>

            {/* Exclusive Experience */}
            <Card className="bg-slate-800/50 border-slate-700 backdrop-blur-sm">
              <CardHeader className="text-center">
                <Crown className="w-16 h-16 text-yellow-500 mx-auto mb-4" />
                <CardTitle className="text-white">VIP Experience</CardTitle>
                <div className="text-sm text-gray-400">Exclusive Gold Hero Access</div>
              </CardHeader>
              <CardContent>
                <div className="text-center mb-4">
                  <div className="text-3xl font-bold text-yellow-400">1,500</div>
                  <div className="text-gray-400">Planet Points</div>
                </div>
                <div className="space-y-2 text-sm text-gray-400 mb-4">
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-hero-green-500" />
                    <span>Private Sustainability Tour</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-hero-green-500" />
                    <span>Meet DeliWer Founders</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-hero-green-500" />
                    <span>Exclusive Merchandise</span>
                  </div>
                </div>
                <button className="w-full bg-yellow-500 hover:bg-yellow-600 text-black py-2 rounded-lg font-semibold transition-colors disabled:opacity-50 disabled:cursor-not-allowed" disabled>
                  Redeem (Need 1,500 points)
                </button>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Rewards by Category */}
        <div className="mb-12">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-white mb-4">Rewards by Category</h2>
            <p className="text-gray-300">Browse rewards in different categories</p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-gradient-to-br from-hero-green-500/20 to-emerald-600/20 rounded-2xl p-6 border border-hero-green-500/30">
              <div className="text-center">
                <Smartphone className="w-12 h-12 text-hero-green-500 mx-auto mb-4" />
                <h3 className="text-xl font-bold text-white mb-2">Technology</h3>
                <p className="text-gray-400 text-sm mb-4">Latest gadgets and tech upgrades</p>
                <div className="text-sm text-hero-green-400 font-semibold">Starting at 400 points</div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-dubai-blue-500/20 to-blue-600/20 rounded-2xl p-6 border border-dubai-blue-500/30">
              <div className="text-center">
                <Droplets className="w-12 h-12 text-dubai-blue-500 mx-auto mb-4" />
                <h3 className="text-xl font-bold text-white mb-2">Water Systems</h3>
                <p className="text-gray-400 text-sm mb-4">Filters, purifiers, and accessories</p>
                <div className="text-sm text-dubai-blue-400 font-semibold">Starting at 200 points</div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-purple-500/20 to-pink-600/20 rounded-2xl p-6 border border-purple-500/30">
              <div className="text-center">
                <ShoppingBag className="w-12 h-12 text-purple-500 mx-auto mb-4" />
                <h3 className="text-xl font-bold text-white mb-2">Lifestyle</h3>
                <p className="text-gray-400 text-sm mb-4">Sustainable living products</p>
                <div className="text-sm text-purple-400 font-semibold">Starting at 100 points</div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-yellow-500/20 to-orange-600/20 rounded-2xl p-6 border border-yellow-500/30">
              <div className="text-center">
                <Star className="w-12 h-12 text-yellow-500 mx-auto mb-4" />
                <h3 className="text-xl font-bold text-white mb-2">Experiences</h3>
                <p className="text-gray-400 text-sm mb-4">Exclusive events and access</p>
                <div className="text-sm text-yellow-400 font-semibold">Starting at 500 points</div>
              </div>
            </div>
          </div>
        </div>

        {/* How Redemption Works */}
        <div className="mb-12">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-white mb-4">How Redemption Works</h2>
            <p className="text-gray-300">Simple process to claim your rewards</p>
          </div>
          
          <div className="grid md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="w-16 h-16 bg-hero-green-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-hero-green-400">1</span>
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">Choose Reward</h3>
              <p className="text-gray-400">Browse and select your preferred reward from our catalog</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-dubai-blue-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-dubai-blue-400">2</span>
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">Confirm Points</h3>
              <p className="text-gray-400">Verify you have sufficient Planet Points for redemption</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-purple-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-purple-400">3</span>
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">Process Order</h3>
              <p className="text-gray-400">Complete redemption and provide delivery details</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-emerald-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-emerald-400">4</span>
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">Receive Reward</h3>
              <p className="text-gray-400">Get your reward delivered or access granted within 48 hours</p>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center">
          <div className="bg-hero-green-500/10 border border-hero-green-500/30 rounded-2xl p-8">
            <Gift className="w-16 h-16 text-hero-green-500 mx-auto mb-4" />
            <h3 className="text-2xl font-bold text-white mb-4">
              Start Earning Points to Unlock Rewards
            </h3>
            <p className="text-gray-300 mb-6 max-w-2xl mx-auto">
              Begin collecting Planet Points today through iPhone trades and sustainable purchases to unlock these amazing rewards.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-hero-green-500 hover:bg-hero-green-600 text-white px-8 py-3 rounded-lg font-semibold transition-colors">
                Start Collecting Points
              </button>
              <button className="border border-slate-600 text-white hover:bg-slate-800 px-8 py-3 rounded-lg font-semibold transition-colors">
                View All Rewards
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}