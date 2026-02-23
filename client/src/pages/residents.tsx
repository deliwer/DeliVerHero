import { useRef, useState } from "react";
import { Helmet } from "react-helmet";
import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  MessageSquare, 
  ArrowRight, 
  CheckCircle2, 
  Clock, 
  MapPin, 
  UserCheck, 
  ShieldCheck,
  Zap,
  Hammer,
  ClipboardList,
  CalendarCheck,
  X,
  AlertTriangle,
  Package
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { DirhamSymbol } from "@/components/dirham-symbol";
import homeConciergeBg from "@/assets/images/home-concierge-bg.jpg";
import maintenanceCardBg from "@/assets/images/maintenance-card-bg.jpg";
import conciergeCardBg from "@/assets/images/concierge-card-bg.jpg";
import { Navigation } from "@/components/navigation";

const WHATSAPP_NUMBER = "+971523946311";

export default function Residents() {
  const conciergeRef = useRef<HTMLDivElement>(null);
  const [showHandoff, setShowHandoff] = useState(false);
  const [handoffType, setHandoffType] = useState<"move" | "support" | "maintenance">("move");
  const [location] = useLocation();
  const searchParams = new URLSearchParams(window.location.search);
  const stage = searchParams.get("stage");

  const getHeadline = () => {
    if (stage === "ejari") return "Ejari Completed? Start Your Move-In Planning Properly.";
    if (stage === "handover") return "Got Your Keys? Activate Your Home Before Moving In.";
    return "Start Your Move-In the Right Way.";
  };

  const getWhatsAppPrefill = () => {
    if (stage === "ejari") return "Hi DeliWer, I completed Ejari and want to start move-in planning.";
    if (stage === "handover") return "Hi DeliWer, I received my keys and want to plan my move-in.";
    return "Hi DeliWer, I want to book the Move-In Planning Session.";
  };

  const scrollToConcierge = () => {
    conciergeRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white selection:bg-emerald-500/40 font-sans">
      <Helmet>
        <title>Move-In Planning & Activation in Dubai | DeliWer</title>
        <meta name="description" content="Start your move-in with a structured planning session. FREE when bundled with Move-In Activation (AED 399). WhatsApp booking for home readiness and water setup." />
      </Helmet>

      {/* Navigation */}
      <Navigation />

      {/* 1. HERO SECTION */}
      <section className="relative min-h-[80vh] flex items-center justify-center overflow-hidden px-4">
        <div 
          className="absolute inset-0 z-0 bg-cover bg-center opacity-30 scale-105"
          style={{ backgroundImage: `url(${homeConciergeBg})` }}
        />
        <div className="absolute inset-0 z-0 bg-gradient-to-b from-slate-950/40 via-slate-950/80 to-slate-950" />
        
        <div className="relative z-10 max-w-5xl mx-auto text-center space-y-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="space-y-6"
          >
            <h1 id="hero-headline" className="text-5xl md:text-8xl font-black uppercase tracking-tighter leading-[0.85]">
              {getHeadline()}
            </h1>
            <div className="flex items-center justify-center gap-4">
              <div className="h-px w-12 bg-emerald-500" />
              <p className="text-xl text-emerald-400 font-bold uppercase tracking-[0.2em]">
                Ejari & DEWA Support • AED 399
              </p>
              <div className="h-px w-12 bg-emerald-500" />
            </div>
            <p className="text-gray-300 max-w-2xl mx-auto font-medium text-lg leading-relaxed uppercase tracking-tight">
              The essential first-step visit for every Dubai tenant. 100% Home Service — we handle the foundations at your place so you don't have to leave.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-6 mt-12">
              <Button 
                onClick={scrollToConcierge}
                size="lg"
                className="bg-emerald-600 hover:bg-emerald-500 text-white h-24 px-16 text-2xl font-black uppercase tracking-widest rounded-[2rem] shadow-2xl shadow-emerald-900/40 w-full sm:w-auto active-elevate-2 transition-all"
              >
                Browse All Services
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* 2. SERVICE SECTIONS */}
      <section ref={conciergeRef} className="px-4 py-24 bg-slate-950">
        <div className="max-w-7xl mx-auto space-y-24">
          
          {/* STEP 1 - PLANNING SESSION */}
          <div id="planning-section" className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="space-y-4">
                <Badge className="bg-emerald-500 text-slate-950 px-4 py-1 uppercase font-black tracking-widest">Step 1</Badge>
                <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tighter text-white leading-none">Move-In <br /><span className="text-emerald-500">Planning Session</span></h2>
                <p className="text-gray-400 font-bold text-xl leading-tight">Before you move in, we structure the critical steps between lease signing and home activation.</p>
              </div>
              <ul className="space-y-4">
                {[
                  "Ejari document checklist review",
                  "Trustee booking guidance",
                  "DEWA & utility timing plan",
                  "Internet & utilities sequencing",
                  "Move-in readiness roadmap",
                  "WhatsApp coordination",
                  "Water quality assessment included"
                ].map((item, i) => (
                  <li key={i} className="flex gap-4 items-center text-gray-200 font-bold uppercase tracking-tight text-sm">
                    <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
              <div className="p-6 bg-white/5 rounded-3xl border border-white/10 space-y-4">
                <p className="text-lg font-black uppercase text-white">Pricing:</p>
                <p className="text-emerald-400 font-black text-2xl">FREE <span className="text-white/60 text-sm font-bold lowercase tracking-normal">when bundled with Activation (AED 399)</span></p>
                <p className="text-white/60 font-bold text-sm">Standalone: AED 99</p>
              </div>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button 
                  onClick={() => window.location.href='/relocate?type=activation'}
                  className="bg-emerald-600 hover:bg-emerald-500 text-white h-16 px-8 font-black uppercase tracking-widest rounded-2xl flex-1"
                >
                  Book Planning + Activation
                </Button>
                <Button 
                  onClick={() => window.location.href='/relocate?type=planning-only'}
                  variant="outline"
                  className="border-white/20 text-white hover:bg-white/5 h-16 px-8 font-black uppercase tracking-widest rounded-2xl flex-1"
                >
                  Book Planning Only
                </Button>
              </div>
            </div>
            <div className="relative aspect-square rounded-[3rem] overflow-hidden border border-white/10">
              <div className="absolute inset-0 bg-emerald-500/20 mix-blend-overlay" />
              <img src={maintenanceCardBg} alt="Planning" className="w-full h-full object-cover opacity-40" />
            </div>
          </div>

          <div className="h-px bg-white/10 w-full" />

          {/* STEP 2 - ACTIVATION */}
          <div id="activation-section" className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="order-2 lg:order-1 relative aspect-square rounded-[3rem] overflow-hidden border border-white/10">
              <div className="absolute inset-0 bg-blue-500/20 mix-blend-overlay" />
              <img src={conciergeCardBg} alt="Activation" className="w-full h-full object-cover opacity-40" />
            </div>
            <div className="order-1 lg:order-2 space-y-8">
              <div className="space-y-4">
                <Badge className="bg-blue-500 text-white px-4 py-1 uppercase font-black tracking-widest">Step 2</Badge>
                <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tighter text-white leading-none">Move-In <br /><span className="text-blue-500">Activation</span></h2>
                <p className="text-emerald-400 font-black uppercase tracking-widest text-sm italic">Includes complimentary Move-In Planning Session.</p>
                <div className="flex items-center gap-2">
                  <DirhamSymbol className="w-6 h-6 text-blue-500" />
                  <span className="text-5xl font-black text-white tracking-tighter">399</span>
                </div>
              </div>
              <ul className="space-y-4">
                {[
                  "60–90 min activation visit",
                  "Shower filter supply & installation",
                  "1 AC filter clean (removable only)",
                  "Water readiness check + upgrade suggestion",
                  "Essentials setup guidance",
                  "WhatsApp follow-up support"
                ].map((item, i) => (
                  <li key={i} className="flex gap-4 items-center text-gray-200 font-bold uppercase tracking-tight text-sm">
                    <CheckCircle2 className="w-5 h-5 text-blue-500 shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
              <div className="p-6 bg-white/5 rounded-3xl border border-white/10 space-y-2">
                <p className="text-xs font-black uppercase text-red-500 tracking-widest">Not Included:</p>
                <p className="text-[10px] text-gray-400 font-bold uppercase tracking-tight">Deep AC servicing, gas refill, full duct cleaning, extra hardware beyond listed scope</p>
              </div>
              <Button 
                onClick={() => window.open(`https://wa.me/971523946311?text=${encodeURIComponent("Hi DeliWer, I want to book the Move-In Activation (AED 399) and water setup.")}`, '_blank')}
                className="w-full h-20 bg-blue-600 hover:bg-blue-500 text-white font-black uppercase tracking-widest rounded-3xl shadow-2xl shadow-blue-900/40 text-xl"
              >
                Book Move-In Activation
              </Button>
            </div>
          </div>

        </div>
      </section>

      {/* 4. Detailed Trust Points */}
      <section className="px-4 py-24 bg-slate-950">
        <div className="max-w-6xl mx-auto space-y-16">
          <div className="text-center space-y-4">
            <h2 className="text-3xl md:text-5xl font-black uppercase tracking-tighter text-white">100% Home Service Solution</h2>
            <p className="text-emerald-500 font-black uppercase tracking-widest text-sm italic">The Feather in our Cap: We come to you, so you don't have to leave.</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { icon: ShieldCheck, title: "Zero Travel Required", desc: "Process your Ejari, DEWA, and home setup from your office or existing home." },
              { icon: Package, title: "Document Errands", desc: "Document pick & drop-off for AED 99. We handle the physical logistics." },
              { icon: UserCheck, title: "Single point of contact", desc: "No chasing multiple technicians or vendors. We handle them all." },
              { icon: Clock, title: "Fast assessments", desc: "Same-day or next-day scheduling for urgent home fixing." },
              { icon: MapPin, title: "Dubai-wide coverage", desc: "Apartments & villas in all major residential areas." },
              { icon: ShieldCheck, title: "Relocation specialists", desc: "Move-In & Move-Out experts protecting your deposit and sanity." }
            ].map((item, i) => (
              <div key={i} className="flex gap-6 p-8 bg-white/5 rounded-3xl border border-white/5 hover:border-emerald-500/20 transition-colors group">
                <item.icon className="w-8 h-8 text-emerald-500 shrink-0 group-hover:scale-110 transition-transform" />
                <div className="space-y-2">
                  <h4 className="font-black uppercase text-sm text-white">{item.title}</h4>
                  <p className="text-gray-400 text-xs font-medium leading-relaxed uppercase tracking-tight">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. Footer CTA */}
      <section className="px-4 py-24 bg-emerald-950/20 border-t border-white/5">
        <div className="max-w-4xl mx-auto text-center space-y-12">
          <div className="space-y-4">
            <h3 className="text-3xl md:text-5xl font-black uppercase text-white tracking-tighter leading-[0.9]">Ready to simplify <br />your Dubai home?</h3>
            <p className="text-gray-400 font-bold max-w-xl mx-auto">Let our concierge handle the complexity. One message starts the orchestration.</p>
          </div>
          <div className="flex flex-col md:flex-row justify-center items-center gap-6">
            <Button 
              size="lg" 
              className="bg-emerald-600 hover:bg-emerald-500 text-white font-black uppercase tracking-widest h-20 px-12 rounded-2xl group transition-all text-xl shadow-2xl shadow-emerald-900/40"
              onClick={() => window.open(`https://wa.me/971523946311?text=${encodeURIComponent("Hi DeliWer, I want to book a Move-In Activation visit.")}`, '_blank')}
            >
              Start on WhatsApp
            </Button>
          </div>
        </div>
      </section>

      {/* 5. Loyalty Section (NEW — Resident Privileges) */}
      <section className="px-4 py-24 bg-slate-900/50 border-t border-white/5">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-8">
              <div className="space-y-4">
                <div className="bg-emerald-500 text-slate-950 font-black px-4 py-1 rounded-full uppercase tracking-widest text-[10px] inline-block">
                  Resident Privileges
                </div>
                <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tighter text-white leading-tight">
                  Loyalty Unlocked <br />
                  <span className="text-emerald-500 italic font-serif lowercase tracking-normal">after first booking.</span>
                </h2>
                <p className="text-gray-400 font-bold text-lg max-w-xl">
                  Being a DeliWer resident means more than just a well-coordinated home. It means exclusive access to the best of Dubai.
                </p>
              </div>

              <div className="grid sm:grid-cols-2 gap-6">
                {[
                  { title: "Free Shower Filter", desc: "Professional installation included on first upgrade." },
                  { title: "Partner F&B Vouchers", desc: "Exclusive rewards at Dubai's top venues." },
                  { title: "Priority Scheduling", desc: "First-in-line access to our concierge team." },
                  { title: "Dedicated Contact", desc: "Direct access to your personal home coordinator." }
                ].map((perk, i) => (
                  <div key={i} className="p-6 bg-white/5 rounded-2xl border border-white/5 space-y-2">
                    <h4 className="text-emerald-400 font-black uppercase text-xs tracking-widest">{perk.title}</h4>
                    <p className="text-gray-500 text-[11px] font-bold uppercase tracking-tight leading-relaxed">{perk.desc}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="relative">
              <div className="absolute -inset-4 bg-emerald-500/10 blur-3xl rounded-full" />
              <Card className="relative bg-slate-950 border-white/10 p-8 rounded-[3rem] shadow-2xl overflow-hidden">
                <div className="space-y-6 relative z-10 text-center">
                  <div className="flex justify-between items-center border-b border-white/5 pb-6">
                    <h3 className="text-xl font-black uppercase tracking-widest text-white">Privilege Pass</h3>
                    <div className="w-12 h-12 bg-emerald-500/20 rounded-2xl flex items-center justify-center">
                      <Zap className="w-6 h-6 text-emerald-500" />
                    </div>
                  </div>
                  <div className="py-8">
                    <h4 className="text-2xl font-black uppercase text-white mb-2 tracking-tighter">Unlock with Your Next Service</h4>
                    <p className="text-gray-400 font-bold text-sm uppercase tracking-widest">Available after your first DeliWer service.</p>
                  </div>
                  <div className="pt-6">
                    <Button 
                      className="w-full h-16 bg-white text-slate-950 hover:bg-gray-200 font-black uppercase tracking-widest rounded-2xl"
                      onClick={() => {
                        conciergeRef.current?.scrollIntoView({ behavior: 'smooth' });
                      }}
                    >
                      Browse Services
                    </Button>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* 3. HANDOFF LOGIC (CRITICAL UX) */}
      <AnimatePresence>
        {showHandoff && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-950/90 backdrop-blur-xl">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="max-w-xl w-full bg-slate-900 border border-emerald-500/30 rounded-[3rem] p-10 md:p-14 relative shadow-2xl overflow-hidden"
            >
              <button 
                onClick={() => setShowHandoff(false)}
                className="absolute top-8 right-8 text-gray-500 hover:text-white transition-colors"
              >
                <X className="w-8 h-8" />
              </button>

              <div className="space-y-12">
                <div className="space-y-6">
                  <h3 className="text-3xl md:text-4xl font-black uppercase tracking-tighter text-white">
                    {handoffType === "move" 
                      ? "Move Coordination" 
                      : handoffType === "maintenance" 
                        ? "Maintenance Concierge" 
                        : "Resident Support"
                    }
                  </h3>
                  <div className="space-y-4">
                    {handoffType === "move" ? (
                      [
                        "Planning & coordination",
                        "Utilities & setup",
                        "Clearance & handover prep"
                      ].map((item, i) => (
                        <div key={i} className="flex gap-4 items-center text-lg font-bold text-gray-200 uppercase tracking-tight">
                          <CheckCircle2 className="w-6 h-6 text-emerald-500" />
                          <span>{item}</span>
                        </div>
                      ))
                    ) : handoffType === "maintenance" ? (
                      [
                        "AC, electrical & plumbing audit",
                        "Coordination of vetted specialists",
                        "Single-visit accountability"
                      ].map((item, i) => (
                        <div key={i} className="flex gap-4 items-center text-lg font-bold text-gray-200 uppercase tracking-tight">
                          <CheckCircle2 className="w-6 h-6 text-emerald-500" />
                          <span>{item}</span>
                        </div>
                      ))
                    ) : (
                      [
                        "Managed concierge service",
                        "Requests assessed first",
                        "Coordinated execution"
                      ].map((item, i) => (
                        <div key={i} className="flex gap-4 items-center text-lg font-bold text-gray-200 uppercase tracking-tight">
                          <CheckCircle2 className="w-6 h-6 text-blue-400" />
                          <span>{item}</span>
                        </div>
                      ))
                    )}
                  </div>
                </div>

                <div className="h-px bg-white/10 w-full" />

                <div className="space-y-8 text-center">
                  <div className="space-y-2">
                    <h3 className="text-2xl md:text-3xl font-black uppercase tracking-tighter text-white">
                      {handoffType === "support" ? "Your Everyday Concierge" : "What Happens Next"}
                    </h3>
                    <p className="text-gray-400 font-bold leading-tight">
                      {handoffType === "move" 
                        ? "Based on your situation, we’ll guide you to the right package."
                        : handoffType === "maintenance"
                          ? "We'll coordinate a technician to assess and resolve your maintenance needs."
                          : "Resident Support+ is for everything that doesn’t fit neatly into moving or maintenance. Tell us what you need — we’ll figure out the best way to handle it."
                      }
                    </p>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-4">
                    {handoffType === "move" ? (
                      <>
                        <Link href="/relocate#move-in-packs" className="flex-1">
                          <Button 
                            className="w-full h-20 bg-emerald-600 hover:bg-emerald-500 text-white font-black uppercase tracking-widest rounded-2xl text-xl"
                            onClick={() => setShowHandoff(false)}
                          >
                            I'm Moving In
                          </Button>
                        </Link>
                        <Link href="/relocate#move-out-packs" className="flex-1">
                          <Button 
                            className="w-full h-20 bg-blue-600 hover:bg-blue-500 text-white font-black uppercase tracking-widest rounded-2xl text-xl"
                            onClick={() => setShowHandoff(false)}
                          >
                            I'm Moving Out
                          </Button>
                        </Link>
                      </>
                    ) : handoffType === "maintenance" ? (
                      <Link href="/maintenance-concierge" className="w-full">
                        <Button 
                          className="w-full h-20 bg-emerald-600 hover:bg-emerald-500 text-white font-black uppercase tracking-widest rounded-2xl text-xl"
                          onClick={() => setShowHandoff(false)}
                        >
                          Continue to Concierge
                        </Button>
                      </Link>
                    ) : (
                      <Button 
                        className="w-full h-20 bg-blue-600 hover:bg-blue-500 text-white font-black uppercase tracking-widest rounded-2xl text-xl"
                        onClick={() => {
                          const text = "Hi, I need Resident Support+. Something urgent came up and I need help coordinating it.";
                          window.open(`https://wa.me/${WHATSAPP_NUMBER.replace(/\+/g, "").replace(/\s/g, "")}?text=${encodeURIComponent(text)}`, '_blank');
                          setShowHandoff(false);
                        }}
                      >
                        Continue on WhatsApp
                      </Button>
                    )}
                  </div>
                  <p className="text-[10px] text-gray-500 font-black uppercase tracking-[0.2em]">
                    {handoffType === "support" ? "Not a task marketplace. Managed support only." : "\"We plan, coordinate, and manage the process — not the truck.\""}
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
