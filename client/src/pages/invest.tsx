import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  TrendingUp, 
  Users, 
  Globe, 
  Zap, 
  Shield, 
  Award,
  ArrowUpRight,
  BarChart3,
  PieChart,
  Target
} from "lucide-react";
import { SiCrunchbase } from "react-icons/si";

export default function InvestPage() {
  const stats = [
    { label: "Bottles Prevented", value: "2.4M+", icon: Zap, color: "text-amber-500" },
    { label: "Loyalty Members", value: "12,847", icon: Users, color: "text-blue-500" },
    { label: "CO₂ Saved (Tons)", value: "180", icon: Globe, color: "text-emerald-500" },
    { label: "Initiatives Supported", value: "DubaiCan", icon: Shield, color: "text-dubai-blue-500" }
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-white py-20 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-6xl font-extrabold mb-6 bg-gradient-to-r from-hero-green-400 to-dubai-blue-400 bg-clip-text text-transparent">
            Invest in the Future of Sustainability
          </h1>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            DeliWer is the world's first sustainability game, gamifying environmental impact 
            starting with Dubai's most ambitious eco-initiatives.
          </p>
        </div>

        {/* Statistics Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {stats.map((stat, index) => (
            <Card key={index} className="bg-slate-900 border-slate-800 hover-elevate">
              <CardContent className="pt-6">
                <div className="flex items-center justify-between mb-4">
                  <stat.icon className={`w-8 h-8 ${stat.color}`} />
                  <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Live Stat</span>
                </div>
                <div className="text-3xl font-bold mb-1">{stat.value}</div>
                <div className="text-sm text-gray-400">{stat.label}</div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Pitch Deck Section */}
        <div className="grid md:grid-cols-2 gap-8 mb-16">
          <Card className="bg-slate-900 border-slate-800 p-8 flex flex-col justify-between hover-elevate">
            <div>
              <h2 className="text-2xl font-bold mb-4 flex items-center">
                <Target className="mr-2 text-hero-green-500" />
                Investment Pitch Deck
              </h2>
              <p className="text-gray-400 mb-8">
                View our detailed business model, growth projections, and expansion strategy 
                across the UAE and beyond.
              </p>
            </div>
            <div className="flex flex-wrap gap-4">
              <Button asChild className="bg-hero-green-500 hover:bg-hero-green-600 text-black">
                <a href="https://www.gust.com/companies/deliwer" target="_blank" rel="noopener noreferrer">
                  View on Gust <ArrowUpRight className="ml-2 w-4 h-4" />
                </a>
              </Button>
              <Button variant="outline" asChild className="border-slate-700 hover:bg-slate-800">
                <a href="https://www.crunchbase.com/organization/deliwer-shopping" target="_blank" rel="noopener noreferrer">
                  <SiCrunchbase className="mr-2 w-4 h-4" /> Crunchbase
                </a>
              </Button>
            </div>
          </Card>

          <Card className="bg-slate-900 border-slate-800 p-8 hover-elevate">
            <h2 className="text-2xl font-bold mb-4 flex items-center">
              <BarChart3 className="mr-2 text-blue-500" />
              Market Opportunity
            </h2>
            <div className="space-y-4">
              <div className="flex justify-between items-center p-3 bg-slate-800/50 rounded-lg">
                <span className="text-gray-300 font-medium">Dubai Circular Economy</span>
                <span className="text-hero-green-400 font-bold">Priority #1</span>
              </div>
              <div className="flex justify-between items-center p-3 bg-slate-800/50 rounded-lg">
                <span className="text-gray-300 font-medium">Plastic Reduction Goal</span>
                <span className="text-hero-green-400 font-bold">100% by 2026</span>
              </div>
              <div className="flex justify-between items-center p-3 bg-slate-800/50 rounded-lg">
                <span className="text-gray-300 font-medium">Consumer App Adoption</span>
                <span className="text-hero-green-400 font-bold">+240% YoY</span>
              </div>
            </div>
          </Card>
        </div>

        {/* Mission Vision */}
        <div className="bg-gradient-to-br from-slate-900 to-slate-950 border border-slate-800 rounded-2xl p-8 md:p-12 text-center">
          <h2 className="text-3xl font-bold mb-6">Our Dubai Impact Vision</h2>
          <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="space-y-2">
              <div className="w-12 h-12 bg-emerald-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <Globe className="text-emerald-500 w-6 h-6" />
              </div>
              <h3 className="font-bold">Scale</h3>
              <p className="text-sm text-gray-400 italic">Expanding to 100+ high-traffic locations across UAE by 2026.</p>
            </div>
            <div className="space-y-2">
              <div className="w-12 h-12 bg-blue-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <PieChart className="text-blue-500 w-6 h-6" />
              </div>
              <h3 className="font-bold">Ecosystem</h3>
              <p className="text-sm text-gray-400 italic">Connecting consumers, B2B inventory, and government initiatives.</p>
            </div>
            <div className="space-y-2">
              <div className="w-12 h-12 bg-amber-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <TrendingUp className="text-amber-500 w-6 h-6" />
              </div>
              <h3 className="font-bold">Growth</h3>
              <p className="text-sm text-gray-400 italic">Building the infrastructure for the UAE's circular economy.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
