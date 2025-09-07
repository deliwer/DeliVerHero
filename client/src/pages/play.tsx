import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Coins, Trophy, Target, TrendingUp, Gift, Star, Crown, AlertTriangle, Users, Droplets, Zap } from "lucide-react";
import { Link } from "wouter";

export default function Play() {
  return (
    <div className="min-h-screen bg-dubai-gradient">
      <div className="container mx-auto px-4 py-8">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-hero-green-500/20 text-hero-green-400 px-4 py-2 rounded-full mb-6">
            <Trophy className="w-5 h-5" />
            <span className="font-medium">Planet Heroes Game</span>
          </div>
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
            Play for the Planet
            <span className="block text-hero-green-400">Earn Points, Create Impact</span>
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-8">
            Every sustainable action earns you Planet Points. Complete missions, trade devices, and help communities while building your hero status and unlocking exclusive rewards.
          </p>
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
                <Link href="/exchange">
                  <Button variant="outline" className="border-cyan-500 text-cyan-300 hover:bg-cyan-500/10">
                    <Droplets className="w-4 h-4 mr-2" />
                    Trade for Water Credits
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Point Earning Activities */}
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          <Card className="bg-slate-800/50 border-slate-700 backdrop-blur-sm">
            <CardHeader className="text-center">
              <Trophy className="w-12 h-12 text-hero-green-500 mx-auto mb-4" />
              <CardTitle className="text-white">iPhone Trade-Ins</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center">
                <div className="text-3xl font-bold text-hero-green-400 mb-2">100-600</div>
                <p className="text-gray-400 mb-4">Planet Points per trade based on device value and condition</p>
                <Link href="/exchange">
                  <Button className="bg-hero-green-600 hover:bg-hero-green-700 text-white">
                    Start Trade
                  </Button>
                </Link>
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
                <p className="text-gray-400 mb-4">Points for AquaCafe purchases and water system installations</p>
                <Link href="/aquacafe">
                  <Button className="bg-dubai-blue-600 hover:bg-dubai-blue-700 text-white">
                    Shop AquaCafe
                  </Button>
                </Link>
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
                <p className="text-gray-400 mb-4">Bonus points for bringing friends to the sustainability mission</p>
                <Link href="/community">
                  <Button className="bg-purple-600 hover:bg-purple-700 text-white">
                    Invite Friends
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

        {/* How to Play Guide */}
        <div className="bg-slate-800/50 border border-slate-700 rounded-2xl p-8 mb-8">
          <h3 className="text-2xl font-bold text-white mb-6 text-center">How to Play</h3>
          <div className="grid md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="bg-hero-green-500/20 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-hero-green-400">1</span>
              </div>
              <h4 className="font-bold text-white mb-2">Take Action</h4>
              <p className="text-gray-400 text-sm">Trade devices, buy water systems, or join missions</p>
            </div>
            <div className="text-center">
              <div className="bg-dubai-blue-500/20 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-dubai-blue-400">2</span>
              </div>
              <h4 className="font-bold text-white mb-2">Earn Points</h4>
              <p className="text-gray-400 text-sm">Get Planet Points for every sustainable action</p>
            </div>
            <div className="text-center">
              <div className="bg-purple-500/20 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-purple-400">3</span>
              </div>
              <h4 className="font-bold text-white mb-2">Level Up</h4>
              <p className="text-gray-400 text-sm">Advance from Bronze to Platinum Hero status</p>
            </div>
            <div className="text-center">
              <div className="bg-yellow-500/20 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-yellow-400">4</span>
              </div>
              <h4 className="font-bold text-white mb-2">Get Rewards</h4>
              <p className="text-gray-400 text-sm">Redeem points for products and experiences</p>
            </div>
          </div>
        </div>

        {/* CTA to Check Balance and Redeem */}
        <div className="text-center">
          <div className="bg-slate-800/50 border border-slate-700 rounded-2xl p-6 max-w-md mx-auto">
            <h3 className="text-lg font-bold text-white mb-4">Your Planet Points Balance</h3>
            <div className="text-4xl font-bold text-hero-green-400 mb-4">1,247</div>
            <p className="text-sm text-gray-400 mb-4">Ready to redeem for rewards</p>
            <Link href="/rewards">
              <Button className="bg-hero-green-600 hover:bg-hero-green-700 text-white w-full">
                <Gift className="w-4 h-4 mr-2" />
                View Rewards
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}