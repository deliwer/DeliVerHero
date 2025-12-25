import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  Zap, 
  Recycle, 
  Globe, 
  Shield, 
  ArrowRight,
  Droplets,
  Cpu,
  Smartphone,
  TrendingUp,
  Impact
} from "lucide-react";
import { Link } from "wouter";

export default function EWastePage() {
  return (
    <div className="min-h-screen bg-slate-950 text-white py-20 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-6xl font-extrabold mb-6 bg-gradient-to-r from-emerald-400 to-blue-400 bg-clip-text text-transparent">
            E-Waste Revolution: Circular Economy by DeliWer
          </h1>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            Turning retired technology into sustainable life-giving resources. Join the 
            Saqi Kawthar project mission to eliminate plastic and electronic waste.
          </p>
        </div>

        {/* Saqi Kawthar Project Section */}
        <Card className="bg-slate-900 border-slate-800 mb-16 overflow-hidden">
          <div className="grid md:grid-cols-2">
            <div className="p-8 md:p-12">
              <div className="flex items-center gap-2 mb-4 text-emerald-400">
                <Droplets className="w-6 h-6" />
                <span className="font-bold uppercase tracking-wider">The Saqi Kawthar Project</span>
              </div>
              <h2 className="text-3xl font-bold mb-6">Life-Giving Water from Tech Trade-ins</h2>
              <p className="text-gray-400 mb-6 leading-relaxed">
                Our flagship initiative connects the world of high-end technology with the fundamental 
                need for clean water. By trading in your iPhone or e-waste, you directly fund 
                the installation of atmospheric water generators and advanced filtration systems.
              </p>
              <ul className="space-y-4 mb-8">
                <li className="flex items-start gap-3">
                  <Shield className="w-5 h-5 text-emerald-500 mt-1" />
                  <span>Eliminate 2,000+ plastic bottles per year with every home system</span>
                </li>
                <li className="flex items-start gap-3">
                  <Smartphone className="w-5 h-5 text-blue-500 mt-1" />
                  <span>Responsible recycling of 100% of e-waste components</span>
                </li>
                <li className="flex items-start gap-3">
                  <Zap className="w-5 h-5 text-amber-500 mt-1" />
                  <span>Powered by sustainable energy solutions</span>
                </li>
              </ul>
              <Button asChild className="bg-emerald-500 hover:bg-emerald-600 text-black">
                <Link href="/products">
                  Join the Mission <ArrowRight className="ml-2 w-4 h-4" />
                </Link>
              </Button>
            </div>
            <div className="bg-gradient-to-br from-emerald-900/20 to-blue-900/20 flex items-center justify-center p-12">
              <div className="relative w-full aspect-square max-w-sm">
                <div className="absolute inset-0 bg-emerald-500/10 rounded-full animate-pulse" />
                <div className="absolute inset-4 border-2 border-dashed border-emerald-500/20 rounded-full" />
                <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-8">
                  <Smartphone className="w-16 h-16 text-emerald-400 mb-4" />
                  <ArrowRight className="w-8 h-8 text-white mb-4 rotate-90" />
                  <Droplets className="w-16 h-16 text-blue-400" />
                </div>
              </div>
            </div>
          </div>
        </Card>

        {/* Circular Economy Impact */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          <Card className="bg-slate-900 border-slate-800 p-6 hover-elevate">
            <Cpu className="w-10 h-10 text-amber-500 mb-4" />
            <h3 className="text-xl font-bold mb-2">Resource Recovery</h3>
            <p className="text-sm text-gray-400">
              Recovering precious metals like gold, silver, and palladium from e-waste reduces the 
              need for destructive mining operations.
            </p>
          </Card>
          <Card className="bg-slate-900 border-slate-800 p-6 hover-elevate">
            <Globe className="w-10 h-10 text-emerald-500 mb-4" />
            <h3 className="text-xl font-bold mb-2">Carbon Footprint</h3>
            <p className="text-sm text-gray-400">
              Extending device lifecycles and local recycling saves 180+ tons of CO2 
              emissions annually across our Dubai network.
            </p>
          </Card>
          <Card className="bg-slate-900 border-slate-800 p-6 hover-elevate">
            <TrendingUp className="w-10 h-10 text-blue-500 mb-4" />
            <h3 className="text-xl font-bold mb-2">Sustainable Growth</h3>
            <p className="text-sm text-gray-400">
              Our B2B ChainTrack platform ensures wholesale inventory follows a strict 
              circular path, minimizing landfill contributions.
            </p>
          </Card>
        </div>

        {/* Impact Stats */}
        <div className="bg-slate-900/50 border border-slate-800 rounded-2xl p-8 text-center">
          <h2 className="text-2xl font-bold mb-8">Our Environmental Milestone</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div>
              <div className="text-3xl font-bold text-emerald-400">100%</div>
              <div className="text-xs text-gray-500 uppercase mt-1">Recycle Rate</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-blue-400">2.4M</div>
              <div className="text-xs text-gray-500 uppercase mt-1">Bottles Saved</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-amber-400">12k+</div>
              <div className="text-xs text-gray-500 uppercase mt-1">Active Heroes</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-purple-400">50+</div>
              <div className="text-xs text-gray-500 uppercase mt-1">B2B Partners</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
