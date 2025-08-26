import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Coins, Trophy, Target, TrendingUp, Gift, Star, Crown } from "lucide-react";

export default function Collect() {
  return (
    <div className="min-h-screen bg-dubai-gradient">
      <div className="container mx-auto px-4 py-8">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-hero-green-500/20 text-hero-green-400 px-4 py-2 rounded-full mb-6">
            <Coins className="w-5 h-5" />
            <span className="font-medium">Planet Points Playing</span>
          </div>
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
            Play for Planet Points
            <span className="block text-hero-green-400">Build Your Impact</span>
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-8">
            Every sustainable action earns you Planet Points. Play for points through iPhone trades, water system purchases, and environmental missions to unlock exclusive rewards and advance your hero status.
          </p>
        </div>

        {/* Point Sources */}
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          <Card className="bg-slate-800/50 border-slate-700 backdrop-blur-sm">
            <CardHeader className="text-center">
              <Trophy className="w-12 h-12 text-hero-green-500 mx-auto mb-4" />
              <CardTitle className="text-white">iPhone Trade-Ins</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center">
                <div className="text-3xl font-bold text-hero-green-400 mb-2">100-600</div>
                <p className="text-gray-400">Planet Points per trade based on device value and condition</p>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-slate-800/50 border-slate-700 backdrop-blur-sm">
            <CardHeader className="text-center">
              <Target className="w-12 h-12 text-dubai-blue-500 mx-auto mb-4" />
              <CardTitle className="text-white">Water Missions</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center">
                <div className="text-3xl font-bold text-dubai-blue-400 mb-2">50-200</div>
                <p className="text-gray-400">Points for AquaCafe purchases and water system installations</p>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-slate-800/50 border-slate-700 backdrop-blur-sm">
            <CardHeader className="text-center">
              <Gift className="w-12 h-12 text-purple-500 mx-auto mb-4" />
              <CardTitle className="text-white">Referral Rewards</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center">
                <div className="text-3xl font-bold text-purple-400 mb-2">25-100</div>
                <p className="text-gray-400">Bonus points for bringing friends to the sustainability mission</p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Next Steps CTA - Following prototype */}
        <div className="mb-8">
          <div className="text-center">
            <div className="bg-slate-800/50 border border-slate-700 rounded-2xl p-6">
              <h3 className="text-lg font-bold text-white mb-4">Your Wallet - Balance Preview</h3>
              <p className="text-sm text-gray-400 mb-2">Planet Points: <span className="font-bold text-hero-green-400">1,200</span></p>
              <p className="text-sm text-gray-400 mb-4">Litres delivered: <span className="font-bold">12,500</span></p>
              <a
                href="/redeem"
                className="inline-block px-6 py-3 rounded-xl bg-indigo-600 text-white font-bold hover:bg-indigo-700 transition-colors"
              >
                Redeem Now
              </a>
            </div>
          </div>
        </div>

        {/* Hero Levels */}
        <div className="mb-12">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-white mb-4">Hero Levels</h2>
            <p className="text-gray-300">Advance through hero levels as you earn Planet Points</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-gradient-to-br from-amber-600/20 to-yellow-600/20 rounded-2xl p-6 border border-amber-500/30">
              <div className="text-center">
                <div className="w-16 h-16 bg-amber-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Star className="w-8 h-8 text-amber-400" />
                </div>
                <h3 className="text-xl font-bold text-amber-400 mb-2">Bronze Hero</h3>
                <div className="text-2xl font-bold text-white mb-2">0-299 Points</div>
                <p className="text-gray-300 text-sm">Starting your sustainability journey</p>
                <div className="flex flex-wrap gap-1 mt-4 justify-center">
                  <Badge variant="secondary" className="bg-amber-500/20 text-amber-400 text-xs">Basic Rewards</Badge>
                  <Badge variant="secondary" className="bg-amber-500/20 text-amber-400 text-xs">Community Access</Badge>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-gray-400/20 to-gray-600/20 rounded-2xl p-6 border border-gray-400/30">
              <div className="text-center">
                <div className="w-16 h-16 bg-gray-400/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <TrendingUp className="w-8 h-8 text-gray-300" />
                </div>
                <h3 className="text-xl font-bold text-gray-300 mb-2">Silver Hero</h3>
                <div className="text-2xl font-bold text-white mb-2">300-599 Points</div>
                <p className="text-gray-300 text-sm">Making significant impact</p>
                <div className="flex flex-wrap gap-1 mt-4 justify-center">
                  <Badge variant="secondary" className="bg-gray-400/20 text-gray-300 text-xs">Premium Rewards</Badge>
                  <Badge variant="secondary" className="bg-gray-400/20 text-gray-300 text-xs">Exclusive Products</Badge>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-yellow-400/20 to-amber-500/20 rounded-2xl p-6 border border-yellow-400/30">
              <div className="text-center">
                <div className="w-16 h-16 bg-yellow-400/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Crown className="w-8 h-8 text-yellow-400" />
                </div>
                <h3 className="text-xl font-bold text-yellow-400 mb-2">Gold Hero</h3>
                <div className="text-2xl font-bold text-white mb-2">600+ Points</div>
                <p className="text-gray-300 text-sm">Elite sustainability champion</p>
                <div className="flex flex-wrap gap-1 mt-4 justify-center">
                  <Badge variant="secondary" className="bg-yellow-400/20 text-yellow-400 text-xs">VIP Access</Badge>
                  <Badge variant="secondary" className="bg-yellow-400/20 text-yellow-400 text-xs">Exclusive Events</Badge>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Current Status */}
        <div className="bg-gradient-to-r from-slate-800/50 to-slate-700/50 rounded-2xl p-8 border border-slate-600 mb-12">
          <h3 className="text-2xl font-bold text-white mb-6 text-center">Your Current Status</h3>
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 bg-hero-green-500/20 rounded-full flex items-center justify-center">
                  <Coins className="w-6 h-6 text-hero-green-500" />
                </div>
                <div>
                  <div className="text-2xl font-bold text-white">0 Points</div>
                  <div className="text-gray-400">Current Balance</div>
                </div>
              </div>
              <div className="w-full bg-slate-700 rounded-full h-3 mb-2">
                <div className="bg-hero-green-500 h-3 rounded-full w-0"></div>
              </div>
              <div className="text-sm text-gray-400">0 / 300 points to Silver Hero</div>
            </div>
            
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 bg-amber-500/20 rounded-full flex items-center justify-center">
                  <Star className="w-6 h-6 text-amber-400" />
                </div>
                <div>
                  <div className="text-2xl font-bold text-white">Bronze Hero</div>
                  <div className="text-gray-400">Current Level</div>
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-400">Next Milestone</span>
                  <span className="text-white">Silver Hero</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-400">Points Needed</span>
                  <span className="text-hero-green-400">300</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Ways to Earn */}
        <div className="mb-12">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-white mb-4">Ways to Earn Points</h2>
            <p className="text-gray-300">Multiple opportunities to earn Planet Points daily</p>
          </div>
          
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-slate-800/30 rounded-xl p-6 border border-slate-700">
              <div className="text-center">
                <div className="text-hero-green-400 text-2xl font-bold mb-2">+100-600</div>
                <h4 className="text-white font-semibold mb-2">Trade iPhone</h4>
                <p className="text-gray-400 text-sm">Exchange old devices for instant points</p>
              </div>
            </div>
            
            <div className="bg-slate-800/30 rounded-xl p-6 border border-slate-700">
              <div className="text-center">
                <div className="text-dubai-blue-400 text-2xl font-bold mb-2">+50-200</div>
                <h4 className="text-white font-semibold mb-2">Buy AquaCafe</h4>
                <p className="text-gray-400 text-sm">Purchase water systems and filters</p>
              </div>
            </div>
            
            <div className="bg-slate-800/30 rounded-xl p-6 border border-slate-700">
              <div className="text-center">
                <div className="text-purple-400 text-2xl font-bold mb-2">+25-100</div>
                <h4 className="text-white font-semibold mb-2">Refer Friends</h4>
                <p className="text-gray-400 text-sm">Bring others to the community</p>
              </div>
            </div>
            
            <div className="bg-slate-800/30 rounded-xl p-6 border border-slate-700">
              <div className="text-center">
                <div className="text-emerald-400 text-2xl font-bold mb-2">+10-50</div>
                <h4 className="text-white font-semibold mb-2">Daily Actions</h4>
                <p className="text-gray-400 text-sm">Complete sustainability missions</p>
              </div>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center">
          <div className="bg-hero-green-500/10 border border-hero-green-500/30 rounded-2xl p-8">
            <Coins className="w-16 h-16 text-hero-green-500 mx-auto mb-4" />
            <h3 className="text-2xl font-bold text-white mb-4">
              Start Playing for Planet Points Today
            </h3>
            <p className="text-gray-300 mb-6 max-w-2xl mx-auto">
              Begin your sustainability journey and start earning Planet Points with your first iPhone trade-in or AquaCafe purchase.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href="/exchange" className="bg-hero-green-500 hover:bg-hero-green-600 text-white px-8 py-3 rounded-lg font-semibold transition-colors inline-block text-center">
                Trade iPhone Now
              </a>
              <button className="border border-slate-600 text-white hover:bg-slate-800 px-8 py-3 rounded-lg font-semibold transition-colors">
                Explore AquaCafe
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}