import { Card } from "@/components/ui/card";
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
  Building2,
  Users2,
  Truck,
  Leaf
} from "lucide-react";
import { Link } from "wouter";
import ewasteHeroImg from "@/assets/images/ewaste-hero.jpg";
import planetHeroesImg from "@/assets/images/planet-heroes.jpg";

export default function EWastePage() {
  return (
    <div className="min-h-screen bg-slate-950 text-white">
      {/* Hero Section */}
      <div className="relative h-[60vh] flex items-center justify-center overflow-hidden">
        <div 
          className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat opacity-40"
          style={{ backgroundImage: `url(${ewasteHeroImg})` }}
        />
        <div className="absolute inset-0 z-0 bg-gradient-to-b from-slate-950/20 via-slate-950/60 to-slate-950" />
        
        <div className="relative z-10 text-center px-4 max-w-5xl">
          <div className="mb-6 inline-flex items-center gap-2 px-4 py-1.5 bg-emerald-500/10 border border-emerald-500/20 rounded-full text-emerald-400 text-sm font-bold uppercase tracking-wider">
            <Building2 className="w-4 h-4" />
            Dubai Municipality Alignment
          </div>
          <h1 className="text-5xl md:text-7xl font-black uppercase tracking-tighter mb-6 bg-gradient-to-r from-emerald-400 via-blue-400 to-emerald-400 bg-clip-text text-transparent">
            Circular Economy<br />Relocation Service
          </h1>
          <p className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto leading-relaxed font-medium">
            Supporting UAE sustainability goals through professional residential collection of furniture and electronics for local processing.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 pb-20">
        {/* Municipality Initiative Section */}
        <div className="grid md:grid-cols-2 gap-12 items-center mb-24">
          <div>
            <h2 className="text-3xl font-black uppercase tracking-tight mb-6 flex items-center gap-3">
              <Recycle className="w-8 h-8 text-emerald-400" />
              Municipality Initiative
            </h2>
            <p className="text-gray-400 text-lg mb-8 leading-relaxed">
              DeliWer's e-waste and furniture collection services are fully aligned with the <strong>Dubai Municipality Waste Department</strong>. We provide residents with a professional gateway to dispose of bulky items and retired technology, ensuring 100% local processing and resource recovery.
            </p>
            <div className="space-y-4">
              <div className="flex items-start gap-4 p-4 bg-slate-900/50 border border-slate-800 rounded-xl">
                <Truck className="w-6 h-6 text-blue-400 shrink-0" />
                <div>
                  <h4 className="font-bold text-white uppercase text-sm">Direct Home Collection</h4>
                  <p className="text-gray-400 text-xs">Scheduled pickup for furniture and electronics directly from your doorstep.</p>
                </div>
              </div>
              <div className="flex items-start gap-4 p-4 bg-slate-900/50 border border-slate-800 rounded-xl">
                <Leaf className="w-6 h-6 text-emerald-400 shrink-0" />
                <div>
                  <h4 className="font-bold text-white uppercase text-sm">Sustainability Goals</h4>
                  <p className="text-gray-400 text-xs">Contributing to UAE's Net Zero 2050 through efficient waste diversion.</p>
                </div>
              </div>
            </div>
          </div>
          <div className="relative group">
            <img 
              src={planetHeroesImg} 
              alt="Sustainability in Action" 
              className="rounded-3xl border border-white/5 shadow-2xl transition-transform duration-500 group-hover:scale-[1.02]"
            />
            <div className="absolute -bottom-6 -right-6 bg-[#FFC845] p-6 rounded-2xl shadow-xl text-slate-950 max-w-xs">
              <div className="flex items-center gap-2 mb-2">
                <Users2 className="w-5 h-5" />
                <span className="font-bold uppercase text-xs tracking-widest">Planet Heroes</span>
              </div>
              <p className="text-sm font-medium">Join thousands of DeliWer loyalty members actively participating in local environmental missions.</p>
            </div>
          </div>
        </div>

        {/* Saqi Kawthar Project Section */}
        <Card className="bg-slate-900 border-slate-800 mb-24 overflow-hidden">
          <div className="grid md:grid-cols-2">
            <div className="p-8 md:p-12">
              <div className="flex items-center gap-2 mb-4 text-emerald-400">
                <Droplets className="w-6 h-6" />
                <span className="font-bold uppercase tracking-wider">The Saqi Kawthar Project</span>
              </div>
              <h2 className="text-3xl font-bold mb-6 uppercase tracking-tight">Life-Giving Water from Tech Trade-ins</h2>
              <p className="text-gray-400 mb-6 leading-relaxed">
                Our flagship initiative connects the world of high-end technology with the fundamental 
                need for clean water. By trading in your iPhone or e-waste, you directly fund 
                the installation of atmospheric water generators and advanced filtration systems.
              </p>
              <ul className="space-y-4 mb-8">
                <li className="flex items-start gap-3">
                  <Shield className="w-5 h-5 text-emerald-500 mt-1" />
                  <span className="text-sm text-gray-300">Eliminate 2,000+ plastic bottles per year with every home system</span>
                </li>
                <li className="flex items-start gap-3">
                  <Smartphone className="w-5 h-5 text-blue-500 mt-1" />
                  <span className="text-sm text-gray-300">Responsible recycling of 100% of e-waste components</span>
                </li>
                <li className="flex items-start gap-3">
                  <Zap className="w-5 h-5 text-amber-500 mt-1" />
                  <span className="text-sm text-gray-300">Powered by sustainable energy solutions</span>
                </li>
              </ul>
              <Button asChild size="lg" className="bg-emerald-500 hover:bg-emerald-600 text-black font-bold uppercase tracking-wider rounded-full px-8">
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
        <div className="grid md:grid-cols-3 gap-8 mb-24">
          <Card className="bg-slate-900 border-slate-800 p-8 hover-elevate rounded-2xl">
            <Cpu className="w-12 h-12 text-amber-500 mb-6" />
            <h3 className="text-xl font-bold mb-3 uppercase tracking-tight">Resource Recovery</h3>
            <p className="text-sm text-gray-400 leading-relaxed">
              Recovering precious metals like gold, silver, and palladium from e-waste reduces the 
              need for destructive mining operations.
            </p>
          </Card>
          <Card className="bg-slate-900 border-slate-800 p-8 hover-elevate rounded-2xl">
            <Globe className="w-12 h-12 text-emerald-500 mb-6" />
            <h3 className="text-xl font-bold mb-3 uppercase tracking-tight">Carbon Footprint</h3>
            <p className="text-sm text-gray-400 leading-relaxed">
              Extending device lifecycles and local recycling saves 180+ tons of CO2 
              emissions annually across our Dubai network.
            </p>
          </Card>
          <Card className="bg-slate-900 border-slate-800 p-8 hover-elevate rounded-2xl">
            <TrendingUp className="w-12 h-12 text-blue-500 mb-6" />
            <h3 className="text-xl font-bold mb-3 uppercase tracking-tight">Sustainable Growth</h3>
            <p className="text-sm text-gray-400 leading-relaxed">
              Our B2B ChainTrack platform ensures wholesale inventory follows a strict 
              circular path, minimizing landfill contributions.
            </p>
          </Card>
        </div>

        {/* Impact Stats */}
        <div className="bg-slate-900/50 border border-slate-800 rounded-3xl p-12 text-center">
          <h2 className="text-3xl font-black uppercase tracking-tighter mb-12">Environmental Milestones</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-12">
            <div>
              <div className="text-4xl font-black text-emerald-400">100%</div>
              <div className="text-xs text-gray-500 uppercase font-bold tracking-widest mt-2">Recycle Rate</div>
            </div>
            <div>
              <div className="text-4xl font-black text-blue-400">2.4M</div>
              <div className="text-xs text-gray-500 uppercase font-bold tracking-widest mt-2">Bottles Saved</div>
            </div>
            <div>
              <div className="text-4xl font-black text-[#FFC845]">12k+</div>
              <div className="text-xs text-gray-500 uppercase font-bold tracking-widest mt-2">Active Heroes</div>
            </div>
            <div>
              <div className="text-4xl font-black text-purple-400">50+</div>
              <div className="text-xs text-gray-500 uppercase font-bold tracking-widest mt-2">B2B Partners</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}