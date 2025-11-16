import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Coins, CheckCircle, Star, Sparkles, Gift, TrendingUp, Users, Heart } from "lucide-react";
import { Link } from "wouter";
import lifestyleRewardsImage from "@assets/stock_images/smartphone_trade-in__bd93d09e.jpg";
import { DirhamSymbol } from "@/components/ui/dirham-symbol";

export function RewardComparison() {
  return (
    <section className="py-12 px-4" id="reward-options" data-testid="reward-comparison-section">
      <div className="max-w-7xl mx-auto">
        {/* Hero Section with Lifestyle Image */}
        <div className="grid lg:grid-cols-2 gap-8 items-center mb-12">
          <div>
            <div className="inline-flex items-center gap-2 bg-emerald-500/20 px-4 py-2 rounded-full border border-emerald-500/50 mb-4">
              <Sparkles className="w-4 h-4 text-emerald-400" />
              <span className="text-sm font-bold text-emerald-300">Unified Rewards System</span>
            </div>
            
            <h2 className="text-3xl md:text-5xl font-black text-white mb-4 leading-tight">
              Earn <span className="bg-gradient-to-r from-emerald-400 to-blue-400 bg-clip-text text-transparent">PICs</span> with Every Trade-In
            </h2>
            
            <p className="text-gray-300 text-lg mb-6">
              <strong>Planet Impact Credits (PICs)</strong> are your universal reward currency. Earn them from every iPhone trade-in and redeem across products, water delivery, dining experiences, and exclusive lifestyle perks.
            </p>

            <div className="space-y-3 mb-6">
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-full bg-emerald-500/20 flex items-center justify-center flex-shrink-0">
                  <CheckCircle className="w-5 h-5 text-emerald-400" />
                </div>
                <div>
                  <h3 className="text-white font-bold">1 PIC = <DirhamSymbol size={14} className="mx-0.5" />0.10 value</h3>
                  <p className="text-gray-400 text-sm">Simple, transparent redemption across all rewards</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-full bg-blue-500/20 flex items-center justify-center flex-shrink-0">
                  <Gift className="w-5 h-5 text-blue-400" />
                </div>
                <div>
                  <h3 className="text-white font-bold">Universal redemption</h3>
                  <p className="text-gray-400 text-sm">Use for water systems, dining, products & more</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-full bg-purple-500/20 flex items-center justify-center flex-shrink-0">
                  <TrendingUp className="w-5 h-5 text-purple-400" />
                </div>
                <div>
                  <h3 className="text-white font-bold">Never expire</h3>
                  <p className="text-gray-400 text-sm">Your PICs stay active forever with exclusive Planet Hero perks</p>
                </div>
              </div>
            </div>

            <Link href="/#trade-in-calculator">
              <Button 
                size="lg"
                variant="default"
                className="bg-gradient-to-r from-emerald-600 to-blue-600 text-white font-bold"
                data-testid="button-start-trade-in"
              >
                <Coins className="w-5 h-5 mr-2" />
                Start Earning PICs
              </Button>
            </Link>
          </div>

          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-emerald-500 to-blue-500 blur-3xl opacity-20" />
            <div className="relative rounded-3xl overflow-hidden border-2 border-emerald-500/30">
              <img 
                src={lifestyleRewardsImage} 
                alt="Happy people enjoying sustainable lifestyle rewards with PICs" 
                className="w-full h-full object-cover"
                data-testid="img-lifestyle-rewards"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-6">
                <Badge className="bg-gradient-to-r from-emerald-500 to-blue-500 text-white font-bold px-4 py-2 mb-2">
                  Real Impact, Real Rewards
                </Badge>
                <p className="text-white text-sm font-medium">
                  Join thousands earning PICs through sustainable iPhone trade-ins
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* PICs Value Breakdown */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <Card className="bg-gradient-to-br from-emerald-900/30 to-emerald-800/20 border-emerald-500/40" data-testid="card-pics-value">
            <CardContent className="pt-6">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-r from-emerald-500 to-green-500 flex items-center justify-center">
                  <Coins className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-bold text-white">Example Trade Value</h3>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-gray-300">iPhone 14 Pro</span>
                  <span className="text-emerald-400 font-bold">22,000 PICs</span>
                </div>
                <div className="flex justify-between items-center text-sm">
                  <span className="text-gray-400">= Cash value</span>
                  <span className="text-emerald-300"><DirhamSymbol size={12} className="mr-0.5" />2,200</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-blue-900/30 to-blue-800/20 border-blue-500/40" data-testid="card-pics-usage">
            <CardContent className="pt-6">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-r from-blue-500 to-cyan-500 flex items-center justify-center">
                  <Heart className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-bold text-white">Use Your PICs</h3>
              </div>
              <div className="space-y-1 text-sm">
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-3 h-3 text-blue-400" />
                  <span className="text-gray-300">Premium water systems</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-3 h-3 text-blue-400" />
                  <span className="text-gray-300">Restaurant dining</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-3 h-3 text-blue-400" />
                  <span className="text-gray-300">Water delivery</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-3 h-3 text-blue-400" />
                  <span className="text-gray-300">Exclusive perks</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-purple-900/30 to-purple-800/20 border-purple-500/40" data-testid="card-pics-benefits">
            <CardContent className="pt-6">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center">
                  <Users className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-bold text-white">Planet Hero Perks</h3>
              </div>
              <div className="space-y-1 text-sm">
                <div className="flex items-center gap-2">
                  <Star className="w-3 h-3 text-purple-400" />
                  <span className="text-gray-300">2X PICs multiplier</span>
                </div>
                <div className="flex items-center gap-2">
                  <Star className="w-3 h-3 text-purple-400" />
                  <span className="text-gray-300">Exclusive events</span>
                </div>
                <div className="flex items-center gap-2">
                  <Star className="w-3 h-3 text-purple-400" />
                  <span className="text-gray-300">Priority support</span>
                </div>
                <div className="flex items-center gap-2">
                  <Star className="w-3 h-3 text-purple-400" />
                  <span className="text-gray-300">Impact tracking</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Impact Tracking Info */}
        <Card className="bg-gradient-to-r from-green-900/30 to-emerald-900/30 border-emerald-500/40" data-testid="info-pic">
          <CardContent className="pt-6">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-full bg-gradient-to-r from-green-500 to-emerald-500 flex items-center justify-center flex-shrink-0">
                <Star className="w-6 h-6 text-white" />
              </div>
              <div className="flex-1">
                <h3 className="text-xl font-bold text-white mb-3">Track Your Environmental Impact</h3>
                <div className="space-y-2 text-gray-300">
                  <div className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 mt-1 flex-shrink-0 text-emerald-400" />
                    <p className="text-sm"><strong>What PICs measure:</strong> Every trade-in generates PICs that track your CO₂ and water offset contributions to sustainability goals</p>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 mt-1 flex-shrink-0 text-emerald-400" />
                    <p className="text-sm"><strong>How you earn:</strong> Automatically awarded PICs with every iPhone trade-in - the better the device condition, the more PICs you earn</p>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 mt-1 flex-shrink-0 text-emerald-400" />
                    <p className="text-sm"><strong>Why it matters:</strong> Share your PIC balance with employers for CSR reporting, unlock sustainability tiers, and maximize impact through the circular economy</p>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="mt-10 text-center bg-gradient-to-r from-emerald-900/20 to-blue-900/20 rounded-2xl p-6 border border-emerald-500/30">
          <h3 className="text-xl font-bold text-white mb-3">💡 Maximize Your PICs Value</h3>
          <p className="text-gray-300 max-w-3xl mx-auto">
            With a 10:1 ratio (1 PIC = <DirhamSymbol size={14} className="mx-0.5" />0.10), every iPhone trade-in generates significant value. 
            Use your PICs for premium products, restaurant rewards, and water delivery while contributing to Dubai's sustainability goals!
          </p>
        </div>

        <div className="mt-6 text-center">
          <p className="text-xs text-gray-400 max-w-2xl mx-auto">
            * All trade-in iPhone prices shown are tentative estimates. Final valuations are subject to device testing and verification at our facility.
          </p>
        </div>
      </div>
    </section>
  );
}
