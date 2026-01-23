import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Check, MessageCircle, Thermometer, Droplets, Home, Clock, ShieldCheck, MapPin } from "lucide-react";
import { Helmet } from "react-helmet";

export default function SummerReadyHome() {
  const handleWhatsApp = (service: string) => {
    const message = encodeURIComponent(`Hi DeliWer, I'm interested in the ${service}. Can you help me make my home summer-ready?`);
    window.open(`https://wa.me/971523946311?text=${message}`, "_blank");
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Helmet>
        <title>Dubai Summer Ready Home | Move-In Pack | DeliWer</title>
        <meta name="description" content="Move into a Dubai home that's summer-ready from day one. Cooling, water, and essential readiness inspected and fixed by DeliWer." />
      </Helmet>

      {/* Hero Section */}
      <section className="relative py-24 md:py-32 overflow-hidden bg-slate-950 text-white">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?q=80&w=2070&auto=format&fit=crop')] bg-cover bg-center opacity-40 grayscale" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-slate-950" />
        <div className="container mx-auto px-6 relative z-10 text-center">
          <Badge className="bg-emerald-500/20 text-emerald-400 border-emerald-500/30 mb-6 px-4 py-1.5 rounded-full uppercase tracking-widest font-black text-xs">
            Survival GTM Strategy
          </Badge>
          <h1 className="text-5xl md:text-8xl font-black mb-6 tracking-tighter uppercase leading-none">
            Move Into a Dubai Home <br />
            <span className="text-emerald-400">Summer-Ready</span> <br />
            From Day One
          </h1>
          <p className="text-xl md:text-2xl text-slate-200 max-w-3xl mx-auto leading-relaxed mb-12 font-medium">
            Cooling, water, and essential home readiness — inspected, fixed, and supported by DeliWer.
          </p>
          <div className="flex flex-col md:flex-row justify-center items-center gap-4">
            <Button 
              size="lg" 
              className="w-full md:w-auto bg-emerald-600 hover:bg-emerald-500 text-white font-black rounded-full px-12 h-20 text-xl shadow-[0_0_50px_-12px_rgba(16,185,129,0.5)] transition-all hover:scale-105"
              onClick={() => handleWhatsApp("Summer Ready Assessment")}
            >
              Book Summer Ready Assessment
            </Button>
            <Button 
              variant="outline"
              size="lg" 
              className="w-full md:w-auto border-white/20 hover:bg-white/10 text-white font-black rounded-full px-12 h-20 text-xl"
              onClick={() => handleWhatsApp("General Inquiry")}
            >
              <MessageCircle className="w-6 h-6 mr-2" />
              WhatsApp Us
            </Button>
          </div>
        </div>
      </section>

      {/* Target Audience Section */}
      <section className="py-20 px-6 bg-slate-50 dark:bg-slate-900/50">
        <div className="container mx-auto max-w-7xl">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-5xl font-black mb-8 tracking-tighter uppercase">Who This Is For</h2>
              <div className="space-y-4">
                {[
                  "New expats moving to Dubai",
                  "Rental apartments & townhouses",
                  "Summer move-ins (May - September)",
                  "Relocations via agents / GLG / SGM"
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-4 bg-white dark:bg-slate-800 p-4 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-700">
                    <div className="bg-emerald-100 dark:bg-emerald-900/30 p-2 rounded-full">
                      <Check className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
                    </div>
                    <span className="font-bold text-lg">{item}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="bg-amber-50 dark:bg-amber-900/10 border border-amber-100 dark:border-amber-900/30 p-8 rounded-[2.5rem]">
              <h3 className="text-2xl font-black mb-4 uppercase text-amber-700 dark:text-amber-500">Not For:</h3>
              <ul className="space-y-2 text-slate-600 dark:text-slate-400 font-medium text-lg">
                <li>• Long renovation projects</li>
                <li>• Luxury fit-outs</li>
                <li>• Solar installs</li>
              </ul>
              <p className="mt-6 text-sm text-amber-600/60 font-bold uppercase tracking-widest">Efficiency first. No scope creep.</p>
            </div>
          </div>
        </div>
      </section>

      {/* The Money Section - Core Offer */}
      <section className="py-24 px-6 relative overflow-hidden">
        <div className="container mx-auto max-w-5xl">
          <div className="text-center mb-16">
            <Badge className="mb-4 bg-emerald-100 text-emerald-700 border-emerald-200">The Survival Pack</Badge>
            <h2 className="text-4xl md:text-6xl font-black mb-6 tracking-tighter uppercase">Dubai Summer Ready Home <br /><span className="text-emerald-500">Move-In Pack</span></h2>
            <p className="text-xl text-slate-500 font-medium italic">"Before your first night, we make sure your home can survive Dubai summer."</p>
          </div>

          <Card className="border-4 border-slate-950 shadow-[20px_20px_0_0_rgba(2,6,23,1)] rounded-[3rem] overflow-hidden">
            <CardContent className="p-0">
              <div className="grid md:grid-cols-2">
                <div className="p-8 md:p-12 bg-white">
                  <h3 className="text-3xl font-black mb-8 uppercase">What's Inside</h3>
                  <div className="space-y-8">
                    <div className="flex gap-4">
                      <div className="bg-blue-50 p-3 rounded-2xl h-fit">
                        <Thermometer className="w-6 h-6 text-blue-600" />
                      </div>
                      <div>
                        <h4 className="font-black text-xl uppercase mb-1">Cooling Readiness</h4>
                        <p className="text-slate-600 font-medium">AC inspection, basic servicing, airflow efficiency check, and early fault detection.</p>
                      </div>
                    </div>
                    <div className="flex gap-4">
                      <div className="bg-cyan-50 p-3 rounded-2xl h-fit">
                        <Droplets className="w-6 h-6 text-cyan-600" />
                      </div>
                      <div>
                        <h4 className="font-black text-xl uppercase mb-1">Water Readiness</h4>
                        <p className="text-slate-600 font-medium">Drinking water starter delivery, leak check, and water pressure scan.</p>
                      </div>
                    </div>
                    <div className="flex gap-4">
                      <div className="bg-emerald-50 p-3 rounded-2xl h-fit">
                        <Home className="w-6 h-6 text-emerald-600" />
                      </div>
                      <div>
                        <h4 className="font-black text-xl uppercase mb-1">Home Readiness</h4>
                        <p className="text-slate-600 font-medium">Minor fixes coordination, emergency support access, and handover summary.</p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="bg-slate-950 text-white p-8 md:p-12 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center gap-2 mb-8">
                      <Badge variant="outline" className="border-white/20 text-white">Featured Offer</Badge>
                    </div>
                    <div className="mb-8">
                      <span className="text-slate-400 uppercase font-black tracking-widest text-sm">Price</span>
                      <div className="text-5xl md:text-7xl font-black mt-2">From <span className="text-emerald-400">AED 399</span></div>
                    </div>
                    <div className="grid grid-cols-2 gap-4 mb-12">
                      <div className="bg-white/5 p-4 rounded-2xl border border-white/10">
                        <Clock className="w-5 h-5 mb-2 text-emerald-400" />
                        <div className="text-xs uppercase font-black text-slate-500">Service Time</div>
                        <div className="font-bold">2–4 Hours</div>
                      </div>
                      <div className="bg-white/5 p-4 rounded-2xl border border-white/10">
                        <MapPin className="w-5 h-5 mb-2 text-emerald-400" />
                        <div className="text-xs uppercase font-black text-slate-500">Property</div>
                        <div className="font-bold">Apt • T-House</div>
                      </div>
                    </div>
                  </div>
                  <Button 
                    className="w-full bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black h-20 text-2xl rounded-2xl shadow-xl shadow-emerald-500/20 transition-all hover:scale-[1.02] active:scale-[0.98]"
                    onClick={() => handleWhatsApp("Summer Ready Pack Booking")}
                  >
                    Book Assessment
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Trust & Clarity Section */}
      <section className="py-20 px-6 bg-slate-900 text-white">
        <div className="container mx-auto max-w-7xl">
          <div className="grid md:grid-cols-3 gap-8">
            <div className="flex flex-col items-center text-center p-8 bg-white/5 rounded-3xl border border-white/10">
              <ShieldCheck className="w-12 h-12 text-emerald-400 mb-6" />
              <h3 className="text-xl font-black uppercase mb-4">No Long Contracts</h3>
              <p className="text-slate-400 font-medium">Simple one-time payment for immediate survival. No hidden commitments.</p>
            </div>
            <div className="flex flex-col items-center text-center p-8 bg-white/5 rounded-3xl border border-white/10">
              <ShieldCheck className="w-12 h-12 text-blue-400 mb-6" />
              <h3 className="text-xl font-black uppercase mb-4">New Expats Only</h3>
              <p className="text-slate-400 font-medium">Designed specifically for the unique challenges of moving into Dubai rental homes.</p>
            </div>
            <div className="flex flex-col items-center text-center p-8 bg-white/5 rounded-3xl border border-white/10">
              <ShieldCheck className="w-12 h-12 text-cyan-400 mb-6" />
              <h3 className="text-xl font-black uppercase mb-4">Expert Teams</h3>
              <p className="text-slate-400 font-medium">Partnered with licensed AC and maintenance professionals across Dubai.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Optional Add-Ons Section (Post-Booking Context) */}
      <section className="py-24 px-6 bg-white dark:bg-slate-950">
        <div className="container mx-auto max-w-4xl text-center">
          <h2 className="text-3xl font-black uppercase mb-12 tracking-tighter">Beyond Survival</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { label: "AC AMC", color: "bg-blue-50" },
              { label: "Water Sub", color: "bg-cyan-50" },
              { label: "Smart Retrofit", color: "bg-emerald-50" },
              { label: "Trade-In", color: "bg-amber-50" }
            ].map((addon, i) => (
              <div key={i} className={`${addon.color} p-6 rounded-2xl border border-slate-100 dark:bg-slate-900 dark:border-slate-800`}>
                <div className="font-black uppercase text-sm">{addon.label}</div>
                <div className="text-[10px] uppercase font-bold text-slate-400 mt-2">Available after booking</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-6 bg-slate-950 border-t border-white/5 text-center">
        <div className="container mx-auto">
          <p className="text-amber-500 font-black text-sm uppercase tracking-widest mb-6">
            Supported by Dubai Municipality & DEWA Guidelines
          </p>
          <p className="text-slate-500 text-xs font-medium max-w-2xl mx-auto">
            © {new Date().getFullYear()} DeliWer Home Operations. All services are performed by licensed professionals according to UAE safety and building regulations.
          </p>
        </div>
      </footer>
    </div>
  );
}
