import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Coins, Trophy, Target, TrendingUp, Gift, Star, Crown, AlertTriangle, Users, Droplets, Zap, Award } from "lucide-react";
import { Link } from "wouter";

export default function Play() {
  return (
    <div className="min-h-screen bg-dubai-gradient">
      <div className="container mx-auto px-4 py-8">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-slate-800/50 text-gray-300 px-4 py-2 rounded-full mb-6 border border-slate-600">
            <Target className="w-5 h-5" />
            <span className="font-medium">Professional Sustainability Platform</span>
          </div>
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
            Sustainability Missions
            <span className="block text-hero-green-400">Measurable Impact, Tangible Rewards</span>
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-8">
            Strategic sustainability platform for professionals and organizations. Execute high-impact missions, optimize resource trading, and access exclusive sustainability benefits through our proven point-based system.
          </p>
          
          {/* Key Metrics */}
          <div className="grid md:grid-cols-3 gap-4 max-w-2xl mx-auto mb-8">
            <div className="bg-slate-800/50 rounded-lg p-4 border border-slate-600">
              <div className="text-2xl font-bold text-hero-green-400">12,847</div>
              <div className="text-sm text-gray-400">Active Professionals</div>
            </div>
            <div className="bg-slate-800/50 rounded-lg p-4 border border-slate-600">
              <div className="text-2xl font-bold text-blue-400">2.4M</div>
              <div className="text-sm text-gray-400">Bottles Prevented</div>
            </div>
            <div className="bg-slate-800/50 rounded-lg p-4 border border-slate-600">
              <div className="text-2xl font-bold text-amber-400">180 tons</div>
              <div className="text-sm text-gray-400">CO₂ Reduced</div>
            </div>
          </div>
        </div>

        {/* 🚨 Pakistan Relief Mega Mission - Featured */}
        <div className="mb-12">
          <div className="bg-gradient-to-r from-red-900/50 to-cyan-900/50 rounded-2xl p-8 border-2 border-red-500/30 backdrop-blur-sm relative overflow-hidden">
            <div className="absolute inset-0 bg-red-600/5 animate-pulse"></div>
            <div className="relative z-10">
              <div className="flex items-center gap-3 mb-6">
                <AlertTriangle className="w-8 h-8 text-red-400 animate-pulse" />
                <Badge className="bg-red-600/20 text-red-300 border border-red-500/30">
                  🚨 MEGA MISSION - URGENT
                </Badge>
              </div>
              <h2 className="text-3xl font-bold text-white mb-4">Pakistan Flood Relief Mission</h2>
              <p className="text-gray-300 mb-6 text-lg">
                Help provide clean water to flood-affected communities in Pakistan. Your trades and donations directly fund solar-powered water purification stations.
              </p>
              
              <div className="grid md:grid-cols-3 gap-4 mb-6">
                <div className="bg-black/30 rounded-lg p-4 text-center">
                  <div className="text-2xl font-bold text-cyan-400">2,547</div>
                  <div className="text-sm text-gray-400">People Served</div>
                </div>
                <div className="bg-black/30 rounded-lg p-4 text-center">
                  <div className="text-2xl font-bold text-red-400">12</div>
                  <div className="text-sm text-gray-400">Stations Active</div>
                </div>
                <div className="bg-black/30 rounded-lg p-4 text-center">
                  <div className="text-2xl font-bold text-yellow-400">AED 45K</div>
                  <div className="text-sm text-gray-400">Raised So Far</div>
                </div>
              </div>

              <div className="flex gap-4">
                <Link href="/mission-control-pakistan">
                  <Button className="bg-red-600 hover:bg-red-700 text-white">
                    <Zap className="w-4 h-4 mr-2" />
                    Join Mission Control
                  </Button>
                </Link>
                <Link href="/earn">
                  <Button variant="outline" className="border-cyan-500 text-cyan-300 hover:bg-cyan-500/10">
                    <Droplets className="w-4 h-4 mr-2" />
                    Trade for Water Credits
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Strategic iPhone Exchange - Primary CTA */}
        <div className="mb-12">
          <div className="bg-gradient-to-r from-slate-900/80 to-slate-800/80 rounded-2xl p-8 border border-hero-green-500/30 backdrop-blur-sm">
            <div className="text-center mb-8">
              <div className="flex items-center justify-center gap-2 mb-4">
                <Trophy className="w-8 h-8 text-hero-green-400" />
                <h2 className="text-3xl font-bold text-white">Strategic Device Exchange Program</h2>
              </div>
              <p className="text-gray-300 text-lg max-w-2xl mx-auto">
                Transform your unused iPhones into measurable sustainability impact. Professional-grade valuation with immediate Planet Points allocation.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8 mb-8">
              <div className="bg-black/30 rounded-xl p-6 border border-hero-green-500/20">
                <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                  <Target className="w-5 h-5 text-hero-green-400" />
                  Immediate Value Recognition
                </h3>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-400">iPhone 13/14/15 Series</span>
                    <span className="font-bold text-hero-green-400">300-600 points</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-400">iPhone 11/12 Series</span>
                    <span className="font-bold text-hero-green-400">150-300 points</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-400">iPhone X and older</span>
                    <span className="font-bold text-hero-green-400">50-150 points</span>
                  </div>
                </div>
              </div>

              <div className="bg-black/30 rounded-xl p-6 border border-blue-500/20">
                <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                  <Zap className="w-5 h-5 text-blue-400" />
                  Cross-Category Advantage
                </h3>
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                    <span className="text-gray-300">Water system purchases</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                    <span className="text-gray-300">Restaurant rewards access</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                    <span className="text-gray-300">Premium membership benefits</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                    <span className="text-gray-300">Exclusive partner offers</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link href="/exchange">
                <Button className="bg-hero-green-600 hover:bg-hero-green-700 text-white px-8 py-3 text-lg">
                  <Trophy className="w-5 h-5 mr-2" />
                  Execute Device Exchange
                </Button>
              </Link>
              <Link href="/aquacafe">
                <Button variant="outline" className="border-blue-500 text-blue-300 hover:bg-blue-500/10 px-8 py-3 text-lg">
                  <Target className="w-5 h-5 mr-2" />
                  Join Loyalty Program First
                </Button>
              </Link>
            </div>
          </div>
        </div>

        {/* Additional Earning Opportunities */}
        <div className="grid md:grid-cols-2 gap-6 mb-12">

          <Card className="bg-slate-800/50 border-slate-700 backdrop-blur-sm">
            <CardHeader className="text-center">
              <Target className="w-12 h-12 text-dubai-blue-500 mx-auto mb-4" />
              <CardTitle className="text-white">Water System Investments</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center">
                <div className="text-3xl font-bold text-dubai-blue-400 mb-2">50-200</div>
                <p className="text-gray-400 mb-4">Points earned through AquaCafe system purchases and installations</p>
                <Link href="/aquacafe">
                  <Button className="bg-dubai-blue-600 hover:bg-dubai-blue-700 text-white">
                    View Systems
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-slate-800/50 border-slate-700 backdrop-blur-sm">
            <CardHeader className="text-center">
              <Users className="w-12 h-12 text-purple-500 mx-auto mb-4" />
              <CardTitle className="text-white">Network Expansion</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center">
                <div className="text-3xl font-bold text-purple-400 mb-2">25-100</div>
                <p className="text-gray-400 mb-4">Strategic referral bonuses for expanding the professional network</p>
                <Link href="/community">
                  <Button className="bg-purple-600 hover:bg-purple-700 text-white">
                    Join Community
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Community Challenges */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold text-white text-center mb-8">Community Challenges</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <Card className="bg-slate-800/50 border-slate-700">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <Users className="w-5 h-5 text-yellow-500" />
                  Dubai Neighborhood Challenge
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-300 mb-4">
                  Compete with your local community to see which Dubai neighborhood can collect the most Planet Points this month.
                </p>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-gray-400">Progress:</span>
                  <span className="font-bold text-yellow-400">2,847 / 5,000 points</span>
                </div>
                <div className="w-full bg-slate-700 rounded-full h-2">
                  <div className="bg-yellow-500 h-2 rounded-full" style={{width: '57%'}}></div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-slate-800/50 border-slate-700">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <Droplets className="w-5 h-5 text-cyan-500" />
                  Weekly Water Impact Goal
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-300 mb-4">
                  Help our community reach 50,000 liters of clean water delivered this week through collective actions.
                </p>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-gray-400">Progress:</span>
                  <span className="font-bold text-cyan-400">38,291 / 50,000 L</span>
                </div>
                <div className="w-full bg-slate-700 rounded-full h-2">
                  <div className="bg-cyan-500 h-2 rounded-full" style={{width: '77%'}}></div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Strategic Implementation Framework */}
        <div className="bg-slate-800/50 border border-slate-700 rounded-2xl p-8 mb-8">
          <h3 className="text-2xl font-bold text-white mb-6 text-center">Strategic Implementation Framework</h3>
          <div className="grid md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="bg-hero-green-500/20 rounded-xl w-16 h-16 flex items-center justify-center mx-auto mb-4 border border-hero-green-500/30">
                <span className="text-xl font-bold text-hero-green-400">01</span>
              </div>
              <h4 className="font-bold text-white mb-2">Execute Actions</h4>
              <p className="text-gray-400 text-sm">Implement strategic device exchanges, water system investments, and mission participation</p>
            </div>
            <div className="text-center">
              <div className="bg-dubai-blue-500/20 rounded-xl w-16 h-16 flex items-center justify-center mx-auto mb-4 border border-dubai-blue-500/30">
                <span className="text-xl font-bold text-dubai-blue-400">02</span>
              </div>
              <h4 className="font-bold text-white mb-2">Accumulate Capital</h4>
              <p className="text-gray-400 text-sm">Build Planet Points portfolio through verified sustainable activities</p>
            </div>
            <div className="text-center">
              <div className="bg-purple-500/20 rounded-xl w-16 h-16 flex items-center justify-center mx-auto mb-4 border border-purple-500/30">
                <span className="text-xl font-bold text-purple-400">03</span>
              </div>
              <h4 className="font-bold text-white mb-2">Advance Tier Status</h4>
              <p className="text-gray-400 text-sm">Progress through Bronze, Silver, Gold, and Platinum professional tiers</p>
            </div>
            <div className="text-center">
              <div className="bg-yellow-500/20 rounded-xl w-16 h-16 flex items-center justify-center mx-auto mb-4 border border-yellow-500/30">
                <span className="text-xl font-bold text-yellow-400">04</span>
              </div>
              <h4 className="font-bold text-white mb-2">Access Benefits</h4>
              <p className="text-gray-400 text-sm">Unlock exclusive products, services, and partnership opportunities</p>
            </div>
          </div>
        </div>

        {/* Portfolio Summary & Actions */}
        <div className="text-center">
          <div className="bg-gradient-to-r from-slate-800/80 to-slate-700/80 border border-slate-600 rounded-2xl p-8 max-w-2xl mx-auto backdrop-blur-sm">
            <h3 className="text-2xl font-bold text-white mb-6">Current Portfolio Status</h3>
            
            <div className="grid md:grid-cols-3 gap-4 mb-6">
              <div className="text-center">
                <div className="text-3xl font-bold text-hero-green-400 mb-1">1,247</div>
                <div className="text-sm text-gray-400">Planet Points</div>
              </div>
              <div className="text-center">
                <div className="text-xl font-bold text-amber-400 mb-1">Bronze</div>
                <div className="text-sm text-gray-400">Current Tier</div>
              </div>
              <div className="text-center">
                <div className="text-xl font-bold text-blue-400 mb-1">753</div>
                <div className="text-sm text-gray-400">To Silver</div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/rewards">
                <Button className="bg-hero-green-600 hover:bg-hero-green-700 text-white px-6 py-3">
                  <Award className="w-4 h-4 mr-2" />
                  Access Rewards Marketplace
                </Button>
              </Link>
              <Link href="/community">
                <Button variant="outline" className="border-amber-500 text-amber-300 hover:bg-amber-500/10 px-6 py-3">
                  <TrendingUp className="w-4 h-4 mr-2" />
                  View Community Hub
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}