import { 
  Trophy, 
  Target, 
  Users, 
  Zap, 
  ChevronRight, 
  Star, 
  Shield, 
  Globe, 
  Rocket,
  Droplets,
  Recycle,
  Handshake,
  Award,
  Sparkles,
  ArrowUpRight
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { Card } from "@/components/ui/card";
import planetHeroesImg from "@/assets/images/planet-heroes.jpg";

export default function PlanetHero() {
  return (
    <div className="min-h-screen bg-slate-950 text-white pb-20">
      {/* Hero Header */}
      <div className="relative pt-24 pb-32 px-4 overflow-hidden">
        <div 
          className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat opacity-30 grayscale hover:grayscale-0 transition-all duration-1000"
          style={{ backgroundImage: `url(${planetHeroesImg})` }}
        />
        <div className="absolute inset-0 z-0 bg-gradient-to-b from-[#0A3D62]/80 via-slate-950/90 to-slate-950" />
        
        <div className="relative z-10 max-w-5xl mx-auto text-center">
          <div className="mb-6 inline-flex items-center gap-2 px-4 py-1.5 bg-[#FFC845]/10 border border-[#FFC845]/20 rounded-full text-[#FFC845] text-sm font-bold uppercase tracking-widest">
            <Sparkles className="w-4 h-4" />
            Dubai Municipality Community Partner
          </div>
          <h1 className="text-5xl md:text-8xl font-black uppercase tracking-tighter mb-8 leading-[0.9]">
            The Planet<br />
            <span className="text-[#FFC845]">Heroes.</span>
          </h1>
          <p className="text-xl md:text-2xl text-slate-300 max-w-3xl mx-auto leading-relaxed font-medium mb-12">
            The elite layer of DeliWer members driving the transition to a circular economy through the Saqi Kawthar mission.
          </p>
          <div className="flex flex-col md:flex-row justify-center items-center gap-6">
            <Button size="lg" className="bg-[#FFC845] hover:bg-[#e6b43d] text-slate-950 font-black rounded-full px-12 h-20 text-xl shadow-2xl transition-all w-full md:w-auto active-elevate-2">
              Join the Alliance
              <ChevronRight className="w-5 h-5 ml-2" />
            </Button>
            <Link href="/relocate/exit">
              <Button size="lg" variant="outline" className="border-white/20 text-white hover:bg-white/10 rounded-full px-12 h-20 text-xl backdrop-blur-md font-bold">
                View Missions
              </Button>
            </Link>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 -mt-16 relative z-20">
        {/* Core Pillars */}
        <div className="grid md:grid-cols-3 gap-8 mb-24">
          <Card className="bg-slate-900 border-slate-800 p-8 hover-elevate rounded-3xl relative overflow-hidden group">
            <div className="absolute top-0 left-0 w-2 h-full bg-blue-500" />
            <Droplets className="w-12 h-12 text-blue-400 mb-6 group-hover:scale-110 transition-transform" />
            <h3 className="text-2xl font-black uppercase tracking-tight mb-4">Saqi Kawthar</h3>
            <p className="text-slate-400 leading-relaxed mb-6">Funding local atmospheric water generators through high-end tech recycling.</p>
            <div className="flex items-center text-blue-400 font-bold text-sm uppercase tracking-widest">
              Live Project <ArrowUpRight className="w-4 h-4 ml-2" />
            </div>
          </Card>

          <Card className="bg-slate-900 border-slate-800 p-8 hover-elevate rounded-3xl relative overflow-hidden group">
            <div className="absolute top-0 left-0 w-2 h-full bg-emerald-500" />
            <Recycle className="w-12 h-12 text-emerald-400 mb-6 group-hover:scale-110 transition-transform" />
            <h3 className="text-2xl font-black uppercase tracking-tight mb-4">Circular Loop</h3>
            <p className="text-slate-400 leading-relaxed mb-6">Direct household collection of furniture and electronics for Dubai Municipality initiatives.</p>
            <div className="flex items-center text-emerald-400 font-bold text-sm uppercase tracking-widest">
              Active Initiative <ArrowUpRight className="w-4 h-4 ml-2" />
            </div>
          </Card>

          <Card className="bg-slate-900 border-slate-800 p-8 hover-elevate rounded-3xl relative overflow-hidden group">
            <div className="absolute top-0 left-0 w-2 h-full bg-[#FFC845]" />
            <Handshake className="w-12 h-12 text-[#FFC845] mb-6 group-hover:scale-110 transition-transform" />
            <h3 className="text-2xl font-black uppercase tracking-tight mb-4">Hero Rewards</h3>
            <p className="text-slate-400 leading-relaxed mb-6">Exclusive benefits for participants in Dubai's leadership sustainability goals.</p>
            <div className="flex items-center text-[#FFC845] font-bold text-sm uppercase tracking-widest">
              Member Perks <ArrowUpRight className="w-4 h-4 ml-2" />
            </div>
          </Card>
        </div>

        {/* Leadership & Impact Section */}
        <div className="bg-slate-900/50 border border-slate-800 rounded-[3rem] p-12 mb-24">
          <div className="max-w-4xl mx-auto text-center">
            <Award className="w-16 h-16 text-[#FFC845] mx-auto mb-8" />
            <h2 className="text-4xl md:text-5xl font-black uppercase tracking-tighter mb-8 leading-tight">
              Aligned with Leadership<br />Sustainability Goals
            </h2>
            <p className="text-xl text-slate-300 mb-12 leading-relaxed">
              DeliWer's Planet Heroes initiative provides the operational muscle for residents to participate directly in Dubai's vision for a green future. We bridge the gap between policy and daily action.
            </p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              <div className="p-6 bg-slate-950/50 rounded-2xl border border-white/5">
                <div className="text-3xl font-black text-white mb-1">2050</div>
                <div className="text-[10px] text-slate-500 uppercase tracking-[0.2em] font-bold">Net Zero Goal</div>
              </div>
              <div className="p-6 bg-slate-950/50 rounded-2xl border border-white/5">
                <div className="text-3xl font-black text-white mb-1">100%</div>
                <div className="text-[10px] text-slate-500 uppercase tracking-[0.2em] font-bold">Local Processing</div>
              </div>
              <div className="p-6 bg-slate-950/50 rounded-2xl border border-white/5">
                <div className="text-3xl font-black text-white mb-1">ZERO</div>
                <div className="text-[10px] text-slate-500 uppercase tracking-[0.2em] font-bold">Landfill Target</div>
              </div>
              <div className="p-6 bg-slate-950/50 rounded-2xl border border-white/5">
                <div className="text-3xl font-black text-white mb-1">GOLD</div>
                <div className="text-[10px] text-slate-500 uppercase tracking-[0.2em] font-bold">Standard Ethics</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
