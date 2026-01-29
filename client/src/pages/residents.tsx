import { useRef, useState } from "react";
import { Helmet } from "react-helmet";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
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
  X
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { TrustStrip } from "@/components/trust-strip";
import { DirhamSymbol } from "@/components/dirham-symbol";
import homeConciergeBg from "@/assets/images/home-concierge-bg.jpg";
import maintenanceCardBg from "@/assets/images/maintenance-card-bg.jpg";
import conciergeCardBg from "@/assets/images/concierge-card-bg.jpg";

const WHATSAPP_NUMBER = "+971523946311";

export default function Residents() {
  const conciergeRef = useRef<HTMLDivElement>(null);
  const [showHandoff, setShowHandoff] = useState(false);
  const [handoffType, setHandoffType] = useState<"move" | "support" | "maintenance">("move");

  const scrollToConcierge = () => {
    conciergeRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white selection:bg-emerald-500/30 font-sans">
      <Helmet>
        <title>Dubai Home Concierge: Maintenance & Coordination | DeliWer</title>
        <meta name="description" content="Not movers. Your home concierge. We plan, coordinate, and manage everything around your move or daily home needs in Dubai." />
      </Helmet>

      {/* Trust Strip */}
      <section className="px-4 py-3 border-b border-white/10 bg-black/40">
        <div className="max-w-4xl mx-auto">
          <TrustStrip variant="dark" showContact={true} />
        </div>
      </section>

      {/* 1. HERO SECTION */}
      <section className="relative min-h-[60vh] flex items-center justify-center overflow-hidden px-4">
        <div 
          className="absolute inset-0 z-0 bg-cover bg-center opacity-30 scale-105"
          style={{ backgroundImage: `url(${homeConciergeBg})` }}
        />
        <div className="absolute inset-0 z-0 bg-gradient-to-b from-slate-950/40 via-slate-950/80 to-slate-950" />
        
        <div className="relative z-10 max-w-4xl mx-auto text-center space-y-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-4xl md:text-7xl font-black uppercase tracking-tighter mb-6 leading-[0.9]">
              Your Home, <br />
              <span className="text-emerald-500 italic font-serif lowercase tracking-normal">Coordinated.</span>
            </h1>
            <p className="text-xl md:text-2xl text-emerald-100/80 max-w-2xl mx-auto font-medium">
              We plan and manage everything around your move or home needs — without you dealing with multiple vendors.
            </p>
            <p className="text-[10px] text-gray-500 font-black uppercase tracking-[0.2em] mt-4">
              Not movers. Not contractors. Your home concierge.
            </p>
          </motion.div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              size="lg"
              className="bg-emerald-600 hover:bg-emerald-500 text-white h-16 px-10 text-lg font-black uppercase tracking-widest rounded-2xl shadow-2xl shadow-emerald-900/40"
              onClick={() => window.open(`https://wa.me/${WHATSAPP_NUMBER.replace(/\+/g, "").replace(/\s/g, "")}`, '_blank')}
            >
              <MessageSquare className="mr-2 h-6 w-6" /> Start on WhatsApp
            </Button>
            <Button 
              variant="outline"
              size="lg"
              className="border-white/10 text-white hover:bg-white/5 h-16 px-10 text-lg font-black uppercase tracking-widest rounded-2xl"
              onClick={scrollToConcierge}
            >
              Explore Services
            </Button>
          </div>
        </div>
      </section>

      {/* 2. SERVICE CARDS (3 ONLY) */}
      <section ref={conciergeRef} className="px-4 py-24 bg-slate-950">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-3 gap-8">
            
            {/* CARD 1 — MAINTENANCE */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <Card className="h-full relative bg-slate-900 border-white/10 hover-elevate transition-all duration-300 rounded-[2.5rem] overflow-hidden group">
                <div 
                  className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat opacity-20 transition-transform duration-700 group-hover:scale-110"
                  style={{ backgroundImage: `url(${maintenanceCardBg})` }}
                />
                <div className="absolute inset-0 z-0 bg-gradient-to-b from-slate-950/60 via-slate-950/90 to-slate-950" />

                <CardContent className="relative z-10 p-10 space-y-8 h-full flex flex-col text-center sm:text-left">
                  <div className="space-y-4">
                    <div className="w-16 h-16 rounded-3xl bg-emerald-500/10 flex items-center justify-center text-emerald-500 border border-emerald-500/20 mx-auto sm:mx-0">
                      <Hammer className="w-8 h-8" />
                    </div>
                    <div>
                      <h3 className="text-3xl font-black uppercase tracking-tighter text-white">Maintenance <br />Concierge</h3>
                      <p className="text-gray-300 font-bold text-base mt-2">One point of contact to assess, schedule, and manage trusted technicians.</p>
                    </div>
                  </div>

                  <div className="mt-auto pt-8">
                    <Button 
                      className="w-full h-16 bg-emerald-600 hover:bg-emerald-500 text-white font-black uppercase tracking-widest rounded-2xl shadow-xl shadow-emerald-900/40"
                      onClick={() => {
                        setHandoffType("maintenance");
                        setShowHandoff(true);
                      }}
                    >
                      Book Maintenance
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* CARD 2 — MOVE CONCIERGE (CORE CHANGE) */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
            >
              <Card className="h-full relative bg-slate-900 border-emerald-500/40 hover-elevate transition-all duration-300 rounded-[2.5rem] overflow-hidden group shadow-2xl shadow-emerald-500/10 scale-105 z-20 border-2">
                <div 
                  className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat opacity-25 transition-transform duration-700 group-hover:scale-110"
                  style={{ backgroundImage: `url(${conciergeCardBg})` }}
                />
                <div className="absolute inset-0 z-0 bg-gradient-to-b from-slate-950/40 via-slate-950/90 to-slate-950" />

                <CardContent className="relative z-10 p-10 space-y-8 h-full flex flex-col">
                  <div className="space-y-4">
                    <div className="flex justify-between items-start">
                      <div className="w-16 h-16 rounded-3xl bg-emerald-500 text-slate-950 flex items-center justify-center">
                        <ClipboardList className="w-8 h-8" />
                      </div>
                      <span className="bg-emerald-500 text-slate-950 text-[10px] font-black uppercase tracking-widest px-4 py-1.5 rounded-full shadow-lg">
                        Planning & Coordination Layer
                      </span>
                    </div>
                    <div>
                      <h3 className="text-3xl font-black uppercase tracking-tighter text-white">Move-In / Move-Out <br />Concierge</h3>
                      <p className="text-gray-100 font-bold text-lg mt-2 leading-tight">
                        We manage the planning and vendor coordination around your move — before, during, and after moving day. No trucks, no packing, just orchestration.
                      </p>
                    </div>
                  </div>

                  <div className="space-y-3 pt-6 border-t border-white/10">
                    {[
                      "Utility connections & disconnections",
                      "Home setup or clearance planning",
                      "Vendor scheduling & timelines",
                      "Furniture / appliance coordination",
                      "Single point of contact"
                    ].map((f, i) => (
                      <div key={i} className="flex gap-3 text-[12px] text-emerald-50 font-black uppercase tracking-tight items-center">
                        <CalendarCheck className="w-4 h-4 text-emerald-400 shrink-0" />
                        <span>{f}</span>
                      </div>
                    ))}
                    <p className="text-[10px] text-emerald-400/60 font-black uppercase tracking-widest mt-4 italic">
                      "This is not a movers service. We manage the process, not the truck."
                    </p>
                  </div>

                  <div className="mt-auto space-y-4 pt-8">
                    <Button 
                      className="w-full h-18 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black uppercase tracking-widest rounded-2xl shadow-xl shadow-emerald-500/20 text-lg"
                      onClick={() => {
                        setHandoffType("move");
                        setShowHandoff(true);
                      }}
                    >
                      Plan My Move
                    </Button>
                    <div className="text-center">
                      <p className="text-emerald-400/80 text-[10px] font-black uppercase tracking-widest leading-tight">
                        Already have movers? <br />We coordinate around them.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* CARD 3 — RESIDENT SUPPORT */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              <Card className="h-full relative bg-slate-900 border-white/10 hover-elevate transition-all duration-300 rounded-[2.5rem] overflow-hidden group">
                <CardContent className="relative z-10 p-10 space-y-8 h-full flex flex-col text-center sm:text-left">
                  <div className="space-y-4">
                    <div className="w-16 h-16 rounded-3xl bg-blue-500/10 flex items-center justify-center text-blue-400 border border-blue-500/20 mx-auto sm:mx-0">
                      <UserCheck className="w-8 h-8" />
                    </div>
                    <div>
                      <h3 className="text-3xl font-black uppercase tracking-tighter text-white">Resident Support <br />Concierge</h3>
                      <p className="text-gray-300 font-bold text-base mt-2">For professionals who want proactive home management and coordination.</p>
                    </div>
                  </div>

                  <div className="mt-auto pt-8">
                    <Button 
                      className="w-full h-16 bg-blue-600 hover:bg-blue-500 text-white font-black uppercase tracking-widest rounded-2xl shadow-xl shadow-blue-900/40"
                      onClick={() => {
                        setHandoffType("support");
                        setShowHandoff(true);
                      }}
                    >
                      View Support Services
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

          </div>
        </div>
      </section>

      {/* 4. Detailed Trust Points */}
      <section className="px-4 py-24 bg-slate-950">
        <div className="max-w-6xl mx-auto space-y-16">
          <div className="text-center">
            <h2 className="text-3xl md:text-5xl font-black uppercase tracking-tighter text-white">Designed for Real Homes in Dubai</h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { icon: MapPin, title: "Dubai-wide coverage", desc: "Apartments & villas in all major residential areas." },
              { icon: UserCheck, title: "Single point of contact", desc: "No chasing multiple technicians or vendors. We handle them all." },
              { icon: Clock, title: "Fast assessments", desc: "Same-day or next-day scheduling for urgent home fixing." },
              { icon: ShieldCheck, title: "Relocation specialists", desc: "Move-In & Move-Out experts protecting your deposit and sanity." },
              { icon: ShieldCheck, title: "Responsible removal", desc: "Furniture and e-waste handled compliantly and ethically." },
              { icon: Zap, title: "Zero Lead Loss", desc: "Every request is logged and actioned within minutes." }
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
              onClick={() => window.open(`https://wa.me/${WHATSAPP_NUMBER.replace(/\+/g, "").replace(/\s/g, "")}`, '_blank')}
            >
              <MessageSquare className="mr-2 h-6 w-6" /> Start on WhatsApp
            </Button>
            <Link href="/relocate">
              <Button variant="outline" size="lg" className="border-white/10 text-white hover:bg-white/5 h-20 px-12 rounded-2xl font-black uppercase tracking-widest flex gap-3 text-lg">
                Explore Relocation <ArrowRight className="w-5 h-5" />
              </Button>
            </Link>
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
                        "Ongoing home life coordination",
                        "Vendor management & follow-ups",
                        "Upgrade & transition support"
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
                    <h3 className="text-2xl md:text-3xl font-black uppercase tracking-tighter text-white">What Happens Next</h3>
                    <p className="text-gray-400 font-bold leading-tight">
                      {handoffType === "move" 
                        ? "Based on your situation, we’ll guide you to the right package."
                        : handoffType === "maintenance"
                          ? "We'll coordinate a technician to assess and resolve your maintenance needs."
                          : "Our support concierge will handle your household coordination."
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
                      <Link href="/resident-support-concierge" className="w-full">
                        <Button 
                          className="w-full h-20 bg-blue-600 hover:bg-blue-500 text-white font-black uppercase tracking-widest rounded-2xl text-xl"
                          onClick={() => setShowHandoff(false)}
                        >
                          Continue to Support
                        </Button>
                      </Link>
                    )}
                  </div>
                  <p className="text-[10px] text-gray-500 font-black uppercase tracking-[0.2em]">
                    "We plan, coordinate, and manage the process — not the truck."
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
