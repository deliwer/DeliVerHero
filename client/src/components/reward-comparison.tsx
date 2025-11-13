import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Coins, Droplets, DollarSign, CheckCircle, Star } from "lucide-react";

interface RewardOption {
  type: string;
  icon: typeof Coins;
  title: string;
  description: string;
  exampleValue: string;
  benefits: string[];
  badge?: string;
  color: string;
}

export function RewardComparison() {
  const rewardOptions: RewardOption[] = [
    {
      type: "planet_points",
      icon: Star,
      title: "Planet Points",
      description: "Loyalty rewards you can use across our entire ecosystem",
      exampleValue: "iPhone 14 Pro = 22,000 Points",
      benefits: [
        "1 Point = AED 0.10 value",
        "Use for products, water delivery & dining",
        "Access to exclusive Planet Hero perks",
        "Never expire",
        "Earn 2X multiplier on select items"
      ],
      badge: "Most Popular",
      color: "from-purple-500 to-pink-500"
    },
    {
      type: "water_credits",
      icon: Droplets,
      title: "Water Credits",
      description: "Free premium water delivery subscription",
      exampleValue: "iPhone 14 Pro = 6 months delivery",
      benefits: [
        "Premium alkaline water",
        "Free home delivery",
        "Flexible scheduling",
        "Contributes to sustainability goals",
        "Can combine with Planet Points"
      ],
      badge: "Eco-Friendly",
      color: "from-blue-500 to-cyan-500"
    },
    {
      type: "instant_cash",
      icon: DollarSign,
      title: "Instant Cash",
      description: "Get paid directly to your account",
      exampleValue: "iPhone 14 Pro = AED 2,200",
      benefits: [
        "Payout within 48 hours",
        "Bank transfer or cash",
        "No minimum amount",
        "Transparent pricing",
        "Quick & simple process"
      ],
      badge: "Fast Payout",
      color: "from-emerald-500 to-green-500"
    }
  ];

  return (
    <section className="py-12 px-4" id="reward-options" data-testid="reward-comparison-section">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-10">
          <h2 className="text-3xl md:text-4xl font-black text-white mb-4">
            Choose Your <span className="bg-gradient-to-r from-emerald-400 to-blue-400 bg-clip-text text-transparent">Reward Type</span>
          </h2>
          <p className="text-gray-300 text-lg max-w-3xl mx-auto">
            Flexible options to suit your lifestyle. Mix and match or choose one reward type for maximum value.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {rewardOptions.map((option) => (
            <Card 
              key={option.type}
              className={`relative overflow-hidden bg-slate-800/50 border-slate-700 hover:border-opacity-100 transition-all group ${
                option.badge ? 'border-2' : ''
              }`}
              style={{
                borderColor: option.badge ? 'rgba(16, 185, 129, 0.5)' : undefined
              }}
              data-testid={`reward-option-${option.type}`}
            >
              {option.badge && (
                <div className="absolute top-4 right-4">
                  <Badge className={`bg-gradient-to-r ${option.color} text-white font-bold px-3 py-1`}>
                    {option.badge}
                  </Badge>
                </div>
              )}

              <CardHeader>
                <div className={`w-16 h-16 rounded-2xl bg-gradient-to-r ${option.color} p-3 mb-4 group-hover:scale-110 transition-transform`}>
                  <option.icon className="w-full h-full text-white" />
                </div>
                <CardTitle className="text-2xl text-white">{option.title}</CardTitle>
                <p className="text-gray-400 text-sm">{option.description}</p>
              </CardHeader>

              <CardContent>
                <div className="bg-slate-900/50 rounded-lg p-4 mb-4 border border-slate-700">
                  <p className="text-xs text-gray-400 mb-1">Example Value:</p>
                  <p className={`text-lg font-bold bg-gradient-to-r ${option.color} bg-clip-text text-transparent`}>
                    {option.exampleValue}
                  </p>
                </div>

                <div className="space-y-2">
                  {option.benefits.map((benefit, idx) => (
                    <div key={idx} className="flex items-start gap-2">
                      <CheckCircle className={`w-4 h-4 mt-0.5 flex-shrink-0 bg-gradient-to-r ${option.color} bg-clip-text text-transparent`} style={{ color: 'inherit' }} />
                      <span className="text-gray-300 text-sm">{benefit}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <Card className="mt-8 bg-gradient-to-r from-green-900/30 to-emerald-900/30 border-emerald-500/40" data-testid="info-pic">
          <CardContent className="pt-6">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-full bg-gradient-to-r from-green-500 to-emerald-500 flex items-center justify-center flex-shrink-0">
                <Star className="w-6 h-6 text-white" />
              </div>
              <div className="flex-1">
                <h3 className="text-xl font-bold text-white mb-3">Planet Impact Credits (PIC)</h3>
                <div className="space-y-2 text-gray-300">
                  <div className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 mt-1 flex-shrink-0 text-emerald-400" />
                    <p className="text-sm"><strong>What it is:</strong> A sustainability metric that tracks your environmental impact from trade-ins, measuring CO₂ and water offset contributions</p>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 mt-1 flex-shrink-0 text-emerald-400" />
                    <p className="text-sm"><strong>How you earn it:</strong> Automatically issued alongside any reward type you choose - every trade-in generates PIC regardless of your selected reward</p>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 mt-1 flex-shrink-0 text-emerald-400" />
                    <p className="text-sm"><strong>Why it matters:</strong> Share PIC with employers for CSR reporting, unlock sustainability status tiers, and maximize impact by choosing Planet Points for PIC acceleration</p>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="mt-10 text-center bg-gradient-to-r from-emerald-900/20 to-blue-900/20 rounded-2xl p-6 border border-emerald-500/30">
          <h3 className="text-xl font-bold text-white mb-3">💡 Pro Tip: Maximize Your Value</h3>
          <p className="text-gray-300 max-w-3xl mx-auto">
            Choose Planet Points for the highest value with 10:1 ratio (1 Point = AED 0.10). 
            Use points for premium products, restaurant rewards, and water delivery while earning sustainability impact credits!
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
