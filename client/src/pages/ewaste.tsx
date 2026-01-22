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
  LayoutGrid,
  ArrowUpRight,
  Target,
  CalendarCheck
} from "lucide-react";
import { Link } from "wouter";
import ewasteHeroImg from "@/assets/images/ewaste-hero.jpg";
import planetHeroesImg from "@/assets/images/planet-heroes.jpg";

export default function EWastePage() {
  return (
    <div className="min-h-screen bg-slate-950 text-white selection:bg-emerald-500/30">
      {/* Hero Section - Minimalist & Spacious */}
      <div className="relative h-[85vh] flex items-center justify-center overflow-hidden">
        <div 
          className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat opacity-30 scale-105 transition-transform duration-[20000ms] ease-linear"
          style={{ backgroundImage: `url(${ewasteHeroImg})` }}
        />
        <div className="absolute inset-0 z-0 bg-gradient-to-b from-slate-950/20 via-slate-950/40 to-slate-950" />
        
        <div className="relative z-10 text-center px-4 max-w-4xl">
          <div className="mb-8 inline-flex items-center gap-2 px-5 py-2 bg-emerald-500/5 border border-emerald-500/10 rounded-full text-emerald-400/80 text-xs font-bold uppercase tracking-[0.2em] animate-in fade-in slide-in-from-bottom-4 duration-1000">
            <ShoppingBag className="w-3.5 h-3.5" />
            Sustainable Living
          </div>
          <h1 className="text-6xl md:text-9xl font-black uppercase tracking-tighter mb-8 bg-gradient-to-r from-emerald-400 via-white to-blue-400 bg-clip-text text-transparent leading-[0.85]">
            Live Better.<br />Consume Less.
          </h1>
          <p className="text-lg md:text-xl text-gray-400 max-w-2xl mx-auto leading-relaxed font-medium mb-12 opacity-90">
            A conscious approach to technology. Transition from ownership to contribution within Dubai's circular economy.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
            <Button asChild size="lg" className="bg-[#FFC845] hover:bg-[#e6b43d] text-slate-950 font-black uppercase tracking-widest rounded-full px-12 h-16 text-sm active-elevate-2 shadow-2xl transition-all">
              <Link href="/contact">
                Book Collection
              </Link>
            </Button>
            <Button asChild size="lg" variant="ghost" className="text-white hover:bg-white/5 font-bold uppercase tracking-widest rounded-full px-12 h-16 text-sm backdrop-blur-sm">
              <Link href="/aquacafe">
                Explore AquaCafe
              </Link>
            </Button>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 pb-32 space-y-40">
        {/* Planet Heroes - Focused & Visual */}
        <div className="relative group">
          <div className="grid md:grid-cols-2 gap-20 items-center">
            <div className="relative">
              <div className="absolute -inset-10 bg-emerald-500/10 blur-[120px] rounded-full" />
              <img 
                src={planetHeroesImg} 
                alt="Community" 
                className="relative z-10 rounded-[3rem] border border-white/5 grayscale hover:grayscale-0 transition-all duration-1000 shadow-2xl"
              />
            </div>

            <div className="space-y-8">
              <div className="space-y-4">
                <div className="text-[#FFC845] font-black uppercase tracking-[0.2em] text-xs">Mission Layer</div>
                <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tighter leading-none">
                  Everyday<br />Impact.
                </h2>
                <p className="text-gray-400 text-lg leading-relaxed max-w-md">
                  Gamified sustainability that rewards your transition to a circular lifestyle.
                </p>
              </div>
              
              <div className="flex gap-6">
                <Button asChild variant="outline" className="border-white/10 text-white hover:bg-white/5 rounded-full px-8 h-12 text-xs font-black uppercase tracking-widest">
                  <Link href="/rewards">Rewards Dashboard</Link>
                </Button>
                <Button asChild variant="ghost" className="text-gray-500 hover:text-white text-xs font-black uppercase tracking-widest">
                  <Link href="/community">Community hub</Link>
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Municipality Initiative - Clean & Information Light */}
        <div className="grid md:grid-cols-2 gap-24 items-center">
          <div className="space-y-8 order-2 md:order-1">
            <div className="space-y-4">
              <div className="text-emerald-400 font-black uppercase tracking-[0.2em] text-xs">Municipality Link</div>
              <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tighter leading-none text-white">
                Zero<br />Waste.
              </h2>
              <p className="text-gray-400 text-lg leading-relaxed max-w-md">
                Direct doorstep collection of furniture and electronics for local resource recovery.
              </p>
            </div>
            
            <Button asChild size="lg" className="bg-[#FFC845] hover:bg-[#e6b43d] text-slate-950 font-black uppercase tracking-widest rounded-full px-12 h-16 text-sm">
              <Link href="/contact">Schedule Pickup</Link>
            </Button>
          </div>

          <div className="bg-slate-900/40 border border-white/5 p-12 rounded-[3rem] backdrop-blur-xl space-y-8 order-1 md:order-2">
             <div className="space-y-4">
               <Droplets className="w-12 h-12 text-emerald-400 opacity-50" />
               <h3 className="text-2xl font-black uppercase tracking-tight">Hydration 2.0</h3>
               <p className="text-gray-500 font-medium leading-relaxed">
                 Eliminate plastic with AquaCafe setup. Atmospheric water for the conscious home.
               </p>
             </div>
             <Button asChild variant="outline" className="w-full border-white/10 hover:bg-white/5 h-14 rounded-2xl uppercase font-black tracking-widest text-xs text-white">
               <Link href="/aquacafe">Switch to circular water</Link>
             </Button>
          </div>
        </div>

        {/* Impact Stats - Silent & Powerful */}
        <div className="pt-20 border-t border-white/5">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-12">
            {[
              { label: "Recycle Rate", val: "100%", color: "text-emerald-400" },
              { label: "Bottles Saved", val: "2.4M", color: "text-blue-400" },
              { label: "Active Heroes", val: "12k+", color: "text-[#FFC845]" },
              { label: "B2B Partners", val: "50+", color: "text-purple-400" }
            ].map((s, i) => (
              <div key={i} className="space-y-2">
                <div className={`text-4xl md:text-5xl font-black ${s.color}`}>{s.val}</div>
                <div className="text-[10px] text-gray-600 uppercase font-black tracking-[0.3em]">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}