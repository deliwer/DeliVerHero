import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { 
  Building2, 
  Users, 
  TrendingUp, 
  Leaf, 
  CheckCircle,
  ArrowUpRight,
  DollarSign,
  Target,
  Award,
  FileText,
  Calculator,
  BarChart3,
  Shield
} from "lucide-react";

export default function CorporatePartnerPortal() {
  const [employees, setEmployees] = useState(500);
  const [engagementRate, setEngagementRate] = useState(0.65);

  const pricingTiers = [
    {
      name: "Bronze",
      price: 2500,
      minAmount: 50000,
      maxAmount: 199900,
      color: "#CD7F32",
      benefits: [
        "Logo on mission page",
        "Monthly impact report",
        "Community recognition",
        "Basic ESG metrics",
        "Email support"
      ],
      recommended: false
    },
    {
      name: "Silver",
      price: 5000,
      minAmount: 200000,
      maxAmount: 499900,
      color: "#C0C0C0",
      benefits: [
        "Featured logo placement",
        "Weekly impact reports",
        "Sponsor spotlight",
        "Direct hero engagement",
        "Priority support",
        "Custom branding"
      ],
      recommended: false
    },
    {
      name: "Gold",
      price: 10000,
      minAmount: 500000,
      maxAmount: 999900,
      color: "#FFD700",
      benefits: [
        "Premium logo placement",
        "Real-time dashboard access",
        "Monthly sponsor meetup",
        "Media coverage",
        "Custom impact metrics",
        "API access",
        "Dedicated account manager"
      ],
      recommended: true
    },
    {
      name: "Platinum",
      price: 25000,
      minAmount: 1000000,
      maxAmount: null,
      color: "#E5E4E2",
      benefits: [
        "Exclusive branding opportunity",
        "Dedicated success manager",
        "Quarterly strategy sessions",
        "VIP event access",
        "Co-marketing opportunities",
        "Custom mission creation",
        "White-label options",
        "Full API integration"
      ],
      recommended: false
    }
  ];

  // ROI Calculator
  const calculateROI = () => {
    const activeEmployees = Math.floor(employees * engagementRate);
    const avgBottlesPerEmployee = 150;
    const co2PerBottle = 0.082;
    const costPerTonCO2Traditional = 45;
    
    const totalBottles = activeEmployees * avgBottlesPerEmployee;
    const co2Saved = (totalBottles * co2PerBottle) / 1000; // in tonnes
    const traditionalCost = co2Saved * costPerTonCO2Traditional;
    const ourCost = employees * 20; // AED 20 per employee/month
    const savings = traditionalCost - ourCost;
    const roi = ((savings / ourCost) * 100);

    return {
      activeEmployees,
      totalBottles,
      co2Saved: co2Saved.toFixed(2),
      traditionalCost: traditionalCost.toFixed(0),
      ourCost,
      savings: savings.toFixed(0),
      roi: roi.toFixed(1),
      employeeEngagement: (engagementRate * 100).toFixed(0)
    };
  };

  const roi = calculateROI();

  const esgMetrics = {
    carbonFootprintReduction: 34,
    employeeWellbeing: 78,
    communityImpact: 92,
    brandReputation: 85,
    certifications: ["GRI", "CDP", "ISO 14064"]
  };

  const successStories = [
    {
      company: "Emirates NBD",
      employees: 8500,
      co2Saved: 425,
      bottlesPrevented: 1275000,
      engagement: 71,
      tier: "Platinum"
    },
    {
      company: "Dubai Properties",
      employees: 2300,
      co2Saved: 156,
      bottlesPrevented: 345000,
      engagement: 68,
      tier: "Gold"
    },
    {
      company: "Majid Al Futtaim",
      employees: 5400,
      co2Saved: 289,
      bottlesPrevented: 810000,
      engagement: 74,
      tier: "Platinum"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
      <div className="max-w-7xl mx-auto p-6 space-y-6">
        
        {/* Header */}
        <div className="text-center mb-12">
          <Badge className="bg-hero-green-500/20 text-hero-green-400 border-hero-green-500/30 mb-4">
            Corporate Partner Portal
          </Badge>
          <h1 className="text-4xl md:text-5xl font-black text-white mb-4">
            Employee Engagement Meets <span className="text-hero-green-400">Climate Action</span>
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Transform your workforce into climate heroes while achieving measurable ESG goals and verified carbon impact
          </p>
        </div>

        {/* ROI Calculator */}
        <Card className="border-slate-700 bg-gradient-to-br from-blue-900/20 to-purple-900/20">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <Calculator className="w-6 h-6 text-blue-400" />
              Corporate ROI Calculator
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-8">
              {/* Inputs */}
              <div className="space-y-6">
                <div>
                  <Label htmlFor="employees" className="text-gray-300">Number of Employees</Label>
                  <Input
                    id="employees"
                    type="number"
                    value={employees}
                    onChange={(e) => setEmployees(parseInt(e.target.value) || 0)}
                    className="mt-2 bg-slate-800 border-slate-600 text-white"
                    data-testid="input-employees"
                  />
                </div>
                <div>
                  <Label htmlFor="engagement" className="text-gray-300">
                    Expected Engagement Rate: {(engagementRate * 100).toFixed(0)}%
                  </Label>
                  <input
                    id="engagement"
                    type="range"
                    min="0.1"
                    max="1"
                    step="0.05"
                    value={engagementRate}
                    onChange={(e) => setEngagementRate(parseFloat(e.target.value))}
                    className="w-full mt-2"
                    data-testid="slider-engagement"
                  />
                  <div className="flex justify-between text-sm text-gray-500 mt-1">
                    <span>10%</span>
                    <span>100%</span>
                  </div>
                </div>
              </div>

              {/* Results */}
              <div className="space-y-3">
                <div className="p-4 bg-slate-800/50 rounded-lg">
                  <div className="text-sm text-gray-400 mb-1">Active Participants</div>
                  <div className="text-2xl font-bold text-white">{roi.activeEmployees.toLocaleString()}</div>
                </div>
                <div className="p-4 bg-slate-800/50 rounded-lg">
                  <div className="text-sm text-gray-400 mb-1">Annual CO₂ Reduction</div>
                  <div className="text-2xl font-bold text-hero-green-400">{roi.co2Saved} tonnes</div>
                </div>
                <div className="p-4 bg-slate-800/50 rounded-lg">
                  <div className="text-sm text-gray-400 mb-1">vs Traditional Carbon Offsets</div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-400">Savings:</span>
                    <span className="text-2xl font-bold text-hero-green-400">AED {roi.savings}</span>
                  </div>
                  <div className="flex justify-between items-center mt-2 pt-2 border-t border-slate-700">
                    <span className="text-gray-400">ROI:</span>
                    <span className="text-xl font-bold text-hero-green-400">{roi.roi}%</span>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Pricing Tiers */}
        <div>
          <h2 className="text-3xl font-bold text-white mb-6 text-center">Partnership Tiers</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {pricingTiers.map((tier, idx) => (
              <Card 
                key={idx} 
                className={`border-2 ${
                  tier.recommended 
                    ? 'border-hero-green-500 bg-gradient-to-br from-hero-green-900/20 to-hero-green-700/20' 
                    : 'border-slate-700'
                }`}
              >
                <CardHeader>
                  <div className="flex justify-between items-start mb-2">
                    <CardTitle className="text-white">{tier.name}</CardTitle>
                    {tier.recommended && (
                      <Badge className="bg-hero-green-500/20 text-hero-green-400 border-hero-green-500/30">
                        Popular
                      </Badge>
                    )}
                  </div>
                  <div className="text-3xl font-bold text-white mb-1">
                    AED {tier.price.toLocaleString()}
                    <span className="text-sm text-gray-400 font-normal">/month</span>
                  </div>
                  <div className="text-xs text-gray-500">
                    Min: AED {tier.minAmount.toLocaleString()}
                  </div>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 mb-6">
                    {tier.benefits.map((benefit, bidx) => (
                      <li key={bidx} className="flex items-start gap-2 text-sm text-gray-300">
                        <CheckCircle className="w-4 h-4 text-hero-green-400 flex-shrink-0 mt-0.5" />
                        <span>{benefit}</span>
                      </li>
                    ))}
                  </ul>
                  <Button 
                    className={`w-full ${
                      tier.recommended 
                        ? 'bg-hero-green-500 text-black' 
                        : 'bg-slate-700 text-white'
                    }`}
                    data-testid={`button-select-${tier.name.toLowerCase()}`}
                  >
                    Select {tier.name}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Employee Engagement Dashboard Preview */}
        <Card className="border-slate-700">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <BarChart3 className="w-6 h-6 text-purple-400" />
              Employee Engagement Dashboard Preview
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-4 gap-4">
              <div className="p-4 bg-gradient-to-br from-blue-900/20 to-blue-700/20 rounded-lg border border-blue-500/30">
                <div className="text-sm text-blue-400 mb-2">Active Users</div>
                <div className="text-2xl font-bold text-white mb-1">{roi.activeEmployees}</div>
                <div className="text-xs text-gray-400">{roi.employeeEngagement}% engagement</div>
              </div>
              <div className="p-4 bg-gradient-to-br from-hero-green-900/20 to-hero-green-700/20 rounded-lg border border-hero-green-500/30">
                <div className="text-sm text-hero-green-400 mb-2">Impact Created</div>
                <div className="text-2xl font-bold text-white mb-1">{roi.totalBottles.toLocaleString()}</div>
                <div className="text-xs text-gray-400">bottles prevented</div>
              </div>
              <div className="p-4 bg-gradient-to-br from-purple-900/20 to-purple-700/20 rounded-lg border border-purple-500/30">
                <div className="text-sm text-purple-400 mb-2">Team Challenges</div>
                <div className="text-2xl font-bold text-white mb-1">12</div>
                <div className="text-xs text-gray-400">active missions</div>
              </div>
              <div className="p-4 bg-gradient-to-br from-amber-900/20 to-amber-700/20 rounded-lg border border-amber-500/30">
                <div className="text-sm text-amber-400 mb-2">Leaderboard</div>
                <div className="text-2xl font-bold text-white mb-1">#3</div>
                <div className="text-xs text-gray-400">in Dubai</div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* ESG Reporting */}
        <Card className="border-slate-700">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <FileText className="w-6 h-6 text-hero-green-400" />
              Automated ESG Reporting
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-3">
                <div className="p-4 bg-slate-800/50 rounded-lg">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-gray-300">Carbon Footprint Reduction</span>
                    <Badge className="bg-hero-green-500/20 text-hero-green-400 border-hero-green-500/30">
                      {esgMetrics.carbonFootprintReduction}%
                    </Badge>
                  </div>
                  <div className="w-full bg-slate-700 rounded-full h-2">
                    <div 
                      className="bg-gradient-to-r from-hero-green-500 to-emerald-500 h-2 rounded-full"
                      style={{ width: `${esgMetrics.carbonFootprintReduction}%` }}
                    />
                  </div>
                </div>
                <div className="p-4 bg-slate-800/50 rounded-lg">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-gray-300">Employee Wellbeing</span>
                    <Badge className="bg-blue-500/20 text-blue-400 border-blue-500/30">
                      {esgMetrics.employeeWellbeing}%
                    </Badge>
                  </div>
                  <div className="w-full bg-slate-700 rounded-full h-2">
                    <div 
                      className="bg-gradient-to-r from-blue-500 to-cyan-500 h-2 rounded-full"
                      style={{ width: `${esgMetrics.employeeWellbeing}%` }}
                    />
                  </div>
                </div>
                <div className="p-4 bg-slate-800/50 rounded-lg">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-gray-300">Community Impact</span>
                    <Badge className="bg-purple-500/20 text-purple-400 border-purple-500/30">
                      {esgMetrics.communityImpact}%
                    </Badge>
                  </div>
                  <div className="w-full bg-slate-700 rounded-full h-2">
                    <div 
                      className="bg-gradient-to-r from-purple-500 to-pink-500 h-2 rounded-full"
                      style={{ width: `${esgMetrics.communityImpact}%` }}
                    />
                  </div>
                </div>
              </div>

              <div className="space-y-3">
                <div className="text-sm font-medium text-gray-300 mb-3">Compliance & Certifications</div>
                {esgMetrics.certifications.map((cert, idx) => (
                  <div key={idx} className="flex items-center justify-between p-3 bg-slate-800/30 rounded-lg">
                    <div className="flex items-center gap-3">
                      <Shield className="w-4 h-4 text-hero-green-400" />
                      <span className="text-white">{cert}</span>
                    </div>
                    <Badge className="bg-hero-green-500/20 text-hero-green-400 border-hero-green-500/30">
                      Aligned
                    </Badge>
                  </div>
                ))}
                <Button className="w-full mt-4 bg-slate-700 text-white" data-testid="button-download-report">
                  <FileText className="w-4 h-4 mr-2" />
                  Download Sample Report
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Success Stories */}
        <Card className="border-slate-700">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <Award className="w-6 h-6 text-amber-400" />
              Corporate Success Stories
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {successStories.map((story, idx) => (
                <div key={idx} className="p-5 bg-slate-800/50 rounded-lg">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="text-xl font-bold text-white mb-1">{story.company}</h3>
                      <Badge className="bg-amber-500/20 text-amber-400 border-amber-500/30">
                        {story.tier} Partner
                      </Badge>
                    </div>
                    <div className="text-right">
                      <div className="text-sm text-gray-400">Employees</div>
                      <div className="text-lg font-bold text-white">{story.employees.toLocaleString()}</div>
                    </div>
                  </div>
                  <div className="grid grid-cols-3 gap-4">
                    <div>
                      <div className="text-sm text-gray-400">CO₂ Saved</div>
                      <div className="text-lg font-bold text-hero-green-400">{story.co2Saved} tonnes</div>
                    </div>
                    <div>
                      <div className="text-sm text-gray-400">Bottles Prevented</div>
                      <div className="text-lg font-bold text-blue-400">{(story.bottlesPrevented / 1000).toLocaleString()}K</div>
                    </div>
                    <div>
                      <div className="text-sm text-gray-400">Engagement</div>
                      <div className="text-lg font-bold text-purple-400">{story.engagement}%</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* CTA */}
        <Card className="border-slate-700 bg-gradient-to-br from-hero-green-900/20 to-blue-900/20">
          <CardContent className="p-8 text-center">
            <h3 className="text-2xl font-bold text-white mb-2">Ready to Transform Your Corporate Impact?</h3>
            <p className="text-gray-300 mb-6 max-w-2xl mx-auto">
              Join leading Dubai corporations in creating measurable environmental change while boosting employee engagement
            </p>
            <div className="flex gap-3 justify-center flex-wrap">
              <Button className="bg-hero-green-500 text-black gap-2" data-testid="button-schedule-demo">
                Schedule Demo
                <ArrowUpRight className="w-4 h-4" />
              </Button>
              <Button variant="outline" className="gap-2" data-testid="button-download-brochure">
                <FileText className="w-4 h-4" />
                Download Brochure
              </Button>
              <Button variant="outline" className="gap-2" data-testid="button-contact-sales">
                <Building2 className="w-4 h-4" />
                Contact Sales
              </Button>
            </div>
          </CardContent>
        </Card>

      </div>
    </div>
  );
}
