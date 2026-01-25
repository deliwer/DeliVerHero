import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  CheckCircle2,
  Tv,
  Sofa,
  RefrigeratorIcon,
  LayoutGrid,
  ArrowLeft
} from "lucide-react";
import { Link } from "wouter";
import { SEOMeta } from "@/components/seo-meta";

export default function EWastePage() {
  return (
    <div className="min-h-screen bg-slate-950 text-white selection:bg-emerald-500/30">
      <SEOMeta 
        title="Responsible E-Waste Handling | DeliWer Dubai"
        description="Responsible removal and E-waste handling in Dubai. Managed for you as part of DeliWer services."
      />

      {/* Hero Section - STRICT COMPLIANCE LAYER */}
      <div className="relative pt-32 pb-20 px-4 text-center border-b border-white/5 bg-gradient-to-b from-slate-900 to-slate-950">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-6xl font-black uppercase tracking-tighter mb-6 leading-tight">
            Responsible Removal & <br />
            <span className="text-emerald-500 italic font-serif lowercase tracking-normal">E-Waste Handling — Managed for You</span>
          </h1>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto leading-relaxed">
            Included as part of DeliWer move-out, trade-in, and replacement services.
          </p>
          {/* UX RULE: No primary CTA button in hero */}
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-6 py-24 space-y-24">
        
        {/* Section 1 — Why This Exists */}
        <section className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl font-black uppercase tracking-tight mb-8">
              Why Proper Disposal <span className="text-emerald-500">Matters in Dubai</span>
            </h2>
            <div className="space-y-6">
              {[
                "Improper disposal can delay handovers",
                "Landlords may raise disputes or withhold deposits",
                "Dubai has defined disposal expectations",
                "Expats want zero last-minute issues"
              ].map((text, i) => (
                <div key={i} className="flex items-start gap-4">
                  <div className="w-6 h-6 rounded-full bg-emerald-500/20 flex items-center justify-center mt-1">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                  </div>
                  <p className="text-gray-300 text-lg">{text}</p>
                </div>
              ))}
            </div>
          </div>
          <Card className="bg-white/5 border-white/10 p-8 rounded-3xl">
            <p className="text-gray-400 italic leading-relaxed">
              "What happens to the things I leave behind — and will this cause problems?"
            </p>
            <p className="text-sm text-emerald-500 font-bold mt-4 uppercase tracking-widest">Risk Avoidance & Compliance</p>
          </Card>
        </section>

        {/* Section 2 — How DeliWer Handles It */}
        <section>
          <h2 className="text-3xl font-black uppercase tracking-tight mb-12 text-center">How DeliWer Handles This for You</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { 
                step: "01", 
                title: "Assessment", 
                desc: "Conducted during move-out or replacement services." 
              },
              { 
                step: "02", 
                title: "Sorting", 
                desc: "Items categorized for Trade-In, Recycle, or Dispose." 
              },
              { 
                step: "03", 
                title: "Removal", 
                desc: "Handled via licensed, municipality-aligned partners." 
              }
            ].map((item, i) => (
              <div key={i} className="relative p-8 bg-white/5 border border-white/10 rounded-[2rem]">
                <div className="text-4xl font-black text-emerald-500/20 mb-4">{item.step}</div>
                <h3 className="text-xl font-black uppercase text-white mb-2">{item.title}</h3>
                <p className="text-gray-400 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
          <p className="text-center text-gray-500 mt-12 text-sm italic">
            Coordinated through approved partners aligned with local regulations.
          </p>
        </section>

        {/* Section 3 — What’s Included */}
        <Card className="bg-gradient-to-br from-slate-900 to-slate-950 border-white/10 p-12 rounded-[3rem]">
          <div className="grid md:grid-cols-2 gap-12">
            <div>
              <h3 className="text-2xl font-black uppercase mb-6">Automatically Included When You Use DeliWer For:</h3>
              <ul className="space-y-4">
                {["Move-Out Services", "Trade-In or Replacement", "Home Upgrades"].map((item, i) => (
                  <li key={i} className="flex items-center gap-3 text-gray-300">
                    <div className="w-2 h-2 rounded-full bg-emerald-500" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="text-2xl font-black uppercase mb-6">Examples List:</h3>
              <div className="grid grid-cols-2 gap-4">
                {[
                  { icon: Tv, label: "Electronics" },
                  { icon: Sofa, label: "Furniture" },
                  { icon: RefrigeratorIcon, label: "Appliances" },
                  { icon: LayoutGrid, label: "Fixtures" }
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-3 text-gray-400">
                    <item.icon className="w-5 h-5" />
                    <span className="text-sm">{item.label}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="mt-12 pt-8 border-t border-white/10 text-center">
            <p className="text-emerald-500 font-black text-xl uppercase tracking-tighter">You don’t need to book this separately.</p>
          </div>
        </Card>

        {/* Section 4 — What This Page Is Not */}
        <div className="text-center pt-12">
          <div className="inline-block px-8 py-4 bg-slate-900/50 border border-white/5 rounded-2xl">
            <div className="flex flex-wrap justify-center gap-x-8 gap-y-2 text-xs text-gray-600 font-medium">
              <span>• Not a public pickup service</span>
              <span>• Not a marketplace listing</span>
              <span>• Not a sustainability campaign</span>
            </div>
          </div>
        </div>

        {/* Footer Link Back */}
        <div className="text-center pt-20">
          <Link href="/residence/move-out">
            <Button variant="ghost" className="text-gray-400 hover:text-white gap-2">
              <ArrowLeft className="w-4 h-4" />
              Back to Move-Out Services
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
