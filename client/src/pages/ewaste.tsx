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
  Leaf,
  ShoppingBag,
  Gift,
  LayoutGrid
} from "lucide-react";
import { Link } from "wouter";
import ewasteHeroImg from "@/assets/images/ewaste-hero.jpg";
import planetHeroesImg from "@/assets/images/planet-heroes.jpg";

export default function EWastePage() {
  return (
    <div className="min-h-screen bg-slate-950 text-white">
      {/* Hero Section - Everyday Living & Sustainable Products */}
      <div className="relative h-[70vh] flex items-center justify-center overflow-hidden">
        <div 
          className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat opacity-40 scale-105"
          style={{ backgroundImage: `url(${ewasteHeroImg})` }}
        />
        <div className="absolute inset-0 z-0 bg-gradient-to-b from-slate-950/40 via-slate-950/80 to-slate-950" />
        
        <div className="relative z-10 text-center px-4 max-w-5xl">
          <div className="mb-6 inline-flex items-center gap-2 px-4 py-1.5 bg-emerald-500/10 border border-emerald-500/20 rounded-full text-emerald-400 text-sm font-bold uppercase tracking-wider animate-in fade-in slide-in-from-bottom-4 duration-700">
            <ShoppingBag className="w-4 h-4" />
            Sustainable Living Goals
          </div>
          <h1 className="text-5xl md:text-8xl font-black uppercase tracking-tighter mb-6 bg-gradient-to-r from-emerald-400 via-white to-blue-400 bg-clip-text text-transparent leading-[0.9]">
            Live Better,<br />Consume Smarter.
          </h1>
          <p className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto leading-relaxed font-medium mb-10">
            Achieve your daily environmental goals by choosing sustainable tech and furniture. 
            Turn your consumption into a contribution to Dubai's circular economy.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button asChild size="lg" className="bg-emerald-500 hover:bg-emerald-600 text-black font-black uppercase tracking-widest rounded-full px-10 h-16 text-lg active-elevate-2 shadow-xl shadow-emerald-500/20">
              <Link href="/aquacafe">
                Explore AquaCafe <ArrowRight className="ml-2 w-5 h-5" />
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="border-white/20 text-white hover:bg-white/10 font-bold uppercase tracking-widest rounded-full px-10 h-16 text-lg backdrop-blur-md">
              <Link href="/products">
                Shop Sustainable
              </Link>
            </Button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 pb-20">
        {/* Planet Heroes Interactivity & Missions */}
        <div className="grid md:grid-cols-2 gap-12 items-center mb-32 -mt-10 relative z-20">
          <div className="relative group">
            <div className="absolute -inset-4 bg-emerald-500/20 blur-3xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
            <img 
              src={planetHeroesImg} 
              alt="Sustainability in Action" 
              className="relative z-10 rounded-[2.5rem] border border-white/10 shadow-2xl transition-all duration-500 group-hover:scale-[1.01] group-hover:rotate-1"
            />
            <div className="absolute -bottom-6 -right-6 z-20 bg-[#FFC845] p-8 rounded-[2rem] shadow-2xl text-slate-950 max-w-xs animate-in zoom-in duration-1000">
              <div className="flex items-center gap-2 mb-3">
                <Users2 className="w-6 h-6" />
                <span className="font-black uppercase text-sm tracking-widest">Community Hub</span>
              </div>
              <p className="text-sm font-bold leading-tight mb-4">Join 12,000+ residents achieving daily environmental milestones.</p>
              <Link href="/community" className="inline-flex items-center text-xs font-black uppercase tracking-tighter border-b-2 border-slate-950 pb-0.5 hover:opacity-70 transition-opacity">
                Visit Community <ArrowUpRight className="ml-1 w-3 h-3" />
              </Link>
            </div>
          </div>

          <div className="pl-4">
            <div className="inline-flex items-center gap-2 text-emerald-400 font-bold uppercase tracking-widest text-xs mb-4">
              <Target className="w-4 h-4" />
              Daily Environmental Goals
            </div>
            <h2 className="text-4xl md:text-5xl font-black uppercase tracking-tight mb-6 leading-none">
              Missions Integrated With <span className="text-[#FFC845]">Everyday Living.</span>
            </h2>
            <p className="text-gray-400 text-lg mb-8 leading-relaxed font-medium">
              We've gamified sustainability. Every piece of e-waste recycled and every sustainable product consumed contributes to your Planet Hero ranking and unlocks exclusive <strong>/rewards</strong>.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
              <div className="flex items-center gap-4 p-5 bg-slate-900/40 border border-slate-800 rounded-2xl hover:bg-slate-900/60 transition-colors">
                <Gift className="w-8 h-8 text-[#FFC845] shrink-0" />
                <div>
                  <h4 className="font-bold text-white uppercase text-xs tracking-wider">Rewards Tier</h4>
                  <p className="text-gray-500 text-[10px] font-bold">Unlock exclusive Dubai perks.</p>
                </div>
              </div>
              <div className="flex items-center gap-4 p-5 bg-slate-900/40 border border-slate-800 rounded-2xl hover:bg-slate-900/60 transition-colors">
                <LayoutGrid className="w-8 h-8 text-blue-400 shrink-0" />
                <div>
                  <h4 className="font-bold text-white uppercase text-xs tracking-wider">Mission Control</h4>
                  <p className="text-gray-500 text-[10px] font-bold">Track your impact in real-time.</p>
                </div>
              </div>
            </div>
            <Button asChild size="lg" className="bg-white text-black hover:bg-gray-200 font-black uppercase tracking-widest rounded-full px-8 shadow-xl shadow-white/5">
              <Link href="/rewards">
                View Your Rewards
              </Link>
            </Button>
          </div>
        </div>

        {/* Municipality Initiative Section */}
        <div className="grid md:grid-cols-2 gap-16 items-center mb-32">
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
          <Card className="bg-slate-900 border-slate-800 p-1 bg-gradient-to-br from-emerald-500/10 to-blue-500/10 rounded-3xl overflow-hidden">
             <div className="p-8">
               <div className="flex items-center gap-3 mb-6">
                 <div className="w-12 h-12 bg-emerald-500/20 rounded-full flex items-center justify-center text-emerald-400">
                    <Droplets className="w-6 h-6" />
                 </div>
                 <h3 className="text-2xl font-black uppercase tracking-tight">The AquaCafe Ecosystem</h3>
               </div>
               <p className="text-gray-400 mb-8 font-medium">
                 Upgrade your home with atmospheric water generators. Eliminate single-use plastic while enjoying premium hydration. 
                 It's the ultimate sustainable product for everyday living.
               </p>
               <Button asChild className="w-full bg-emerald-500 hover:bg-emerald-600 text-black font-black uppercase tracking-widest rounded-xl h-14">
                 <Link href="/aquacafe">
                   Switch to AquaCafe
                 </Link>
               </Button>
             </div>
          </Card>
        </div>

        {/* Saqi Kawthar Project Section */}
        <Card className="bg-slate-900 border-slate-800 mb-32 overflow-hidden rounded-[2.5rem]">
          <div className="grid md:grid-cols-2">
            <div className="p-8 md:p-16">
              <div className="flex items-center gap-2 mb-4 text-emerald-400">
                <Droplets className="w-6 h-6" />
                <span className="font-bold uppercase tracking-wider">The Saqi Kawthar Project</span>
              </div>
              <h2 className="text-4xl font-black mb-6 uppercase tracking-tight leading-none">Life-Giving Water from Tech Trade-ins</h2>
              <p className="text-gray-400 mb-8 leading-relaxed font-medium">
                Our flagship initiative connects the world of high-end technology with the fundamental 
                need for clean water. By trading in your iPhone or e-waste, you directly fund 
                the installation of atmospheric water generators and advanced filtration systems.
              </p>
              <ul className="space-y-4 mb-10">
                <li className="flex items-start gap-3">
                  <Shield className="w-5 h-5 text-emerald-500 mt-1" />
                  <span className="text-sm text-gray-300 font-bold">Eliminate 2,000+ plastic bottles per year with every home system</span>
                </li>
                <li className="flex items-start gap-3">
                  <Smartphone className="w-5 h-5 text-blue-500 mt-1" />
                  <span className="text-sm text-gray-300 font-bold">Responsible recycling of 100% of e-waste components</span>
                </li>
                <li className="flex items-start gap-3">
                  <Zap className="w-5 h-5 text-amber-500 mt-1" />
                  <span className="text-sm text-gray-300 font-bold">Powered by sustainable energy solutions</span>
                </li>
              </ul>
              <Button asChild size="lg" className="bg-emerald-500 hover:bg-emerald-600 text-black font-black uppercase tracking-wider rounded-full px-12 h-16">
                <Link href="/products">
                  Join the Mission <ArrowRight className="ml-2 w-4 h-4" />
                </Link>
              </Button>
            </div>
            <div className="bg-gradient-to-br from-emerald-900/40 via-blue-900/20 to-slate-900 flex items-center justify-center p-12 relative overflow-hidden">
              <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10" />
              <div className="relative w-full aspect-square max-w-sm">
                <div className="absolute inset-0 bg-emerald-500/20 rounded-full animate-pulse blur-2xl" />
                <div className="absolute inset-4 border-4 border-dashed border-emerald-500/30 rounded-full animate-[spin_20s_linear_infinite]" />
                <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-8">
                  <Smartphone className="w-20 h-20 text-emerald-400 mb-4 drop-shadow-[0_0_15px_rgba(16,185,129,0.5)]" />
                  <ArrowRight className="w-10 h-10 text-white/50 mb-4 rotate-90" />
                  <Droplets className="w-20 h-20 text-blue-400 drop-shadow-[0_0_15px_rgba(96,165,250,0.5)]" />
                </div>
              </div>
            </div>
          </div>
        </Card>

        {/* Circular Economy Impact */}
        <div className="grid md:grid-cols-3 gap-8 mb-32">
          <Card className="bg-slate-900 border-slate-800 p-10 hover-elevate rounded-[2rem] border-t-emerald-500/50 border-t-2">
            <Cpu className="w-14 h-14 text-amber-500 mb-8" />
            <h3 className="text-2xl font-black mb-4 uppercase tracking-tight">Resource Recovery</h3>
            <p className="text-base text-gray-400 leading-relaxed font-medium">
              Recovering precious metals like gold, silver, and palladium from e-waste reduces the 
              need for destructive mining operations.
            </p>
          </Card>
          <Card className="bg-slate-900 border-slate-800 p-10 hover-elevate rounded-[2rem] border-t-blue-500/50 border-t-2">
            <Globe className="w-14 h-14 text-emerald-500 mb-8" />
            <h3 className="text-2xl font-black mb-4 uppercase tracking-tight">Carbon Footprint</h3>
            <p className="text-base text-gray-400 leading-relaxed font-medium">
              Extending device lifecycles and local recycling saves 180+ tons of CO2 
              emissions annually across our Dubai network.
            </p>
          </Card>
          <Card className="bg-slate-900 border-slate-800 p-10 hover-elevate rounded-[2rem] border-t-[#FFC845]/50 border-t-2">
            <TrendingUp className="w-14 h-14 text-blue-500 mb-8" />
            <h3 className="text-2xl font-black mb-4 uppercase tracking-tight">Sustainable Growth</h3>
            <p className="text-base text-gray-400 leading-relaxed font-medium">
              Our B2B ChainTrack platform ensures wholesale inventory follows a strict 
              circular path, minimizing landfill contributions.
            </p>
          </Card>
        </div>

        {/* Impact Stats */}
        <div className="bg-slate-900/50 border border-slate-800 rounded-[3rem] p-16 text-center relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-emerald-500/50 to-transparent" />
          <h2 className="text-4xl font-black uppercase tracking-tighter mb-16">Environmental Milestones</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-16">
            <div>
              <div className="text-5xl font-black text-emerald-400 mb-2">100%</div>
              <div className="text-xs text-gray-500 uppercase font-black tracking-[0.2em]">Recycle Rate</div>
            </div>
            <div>
              <div className="text-5xl font-black text-blue-400 mb-2">2.4M</div>
              <div className="text-xs text-gray-500 uppercase font-black tracking-[0.2em]">Bottles Saved</div>
            </div>
            <div>
              <div className="text-5xl font-black text-[#FFC845] mb-2">12k+</div>
              <div className="text-xs text-gray-500 uppercase font-black tracking-[0.2em]">Active Heroes</div>
            </div>
            <div>
              <div className="text-5xl font-black text-purple-400 mb-2">50+</div>
              <div className="text-xs text-gray-500 uppercase font-black tracking-[0.2em]">B2B Partners</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}