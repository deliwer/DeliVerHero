import { SEOMeta } from "@/components/seo-meta";
import { Button } from "@/components/ui/button";
import { MessageSquare, AlertCircle, CheckCircle2, Droplet, Zap, Home, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import { Link, useLocation } from "wouter";
import { Navigation } from "@/components/navigation";
import { useEffect } from "react";

export default function StartPage() {
  const [location] = useLocation();

  // Referral tracking from URL parameters
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const referral = {
      partner: params.get("ref"),
      agent: params.get("agent"),
      campaign: params.get("campaign"),
      timestamp: new Date().toISOString()
    };

    if(referral.partner){
      if(!localStorage.getItem("deliwer_ref")){
        localStorage.setItem("deliwer_ref", JSON.stringify(referral));
      }
    }
  }, [location]);

  const handleWhatsApp = () => {
    const referralData = localStorage.getItem("deliwer_ref");
    const referral = referralData ? JSON.parse(referralData) : {};
    
    const message = `Hello DeliWer,\n\nI want the AquaCafe Move-In Welcome Service.\n\nReferral Partner: ${referral.partner || 'Direct'}\nAgent: ${referral.agent || ''}\n\nName:\nBuilding:\nMove-in date:`;
    window.open(`https://wa.me/971523946311?text=${encodeURIComponent(message)}`, '_blank');
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white selection:bg-emerald-500/30">
      <SEOMeta 
        title="AquaCafe Move-In Welcome Service Dubai | Ejari, Water & DEWA Setup | DeliWer"
        description="Moving to Dubai this week? Don't spend your first night without water. DeliWer's AquaCafe Move-In Welcome Service activates your home in minutes. AED 399. Book now via WhatsApp."
      />
      <Navigation />

      {/* Hero Section */}
      <section className="relative py-32 px-4 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-emerald-500/10 to-transparent pointer-events-none" />
        <div className="max-w-5xl mx-auto text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="space-y-8"
          >
            {/* Headline */}
            <h1 className="text-6xl md:text-8xl font-black uppercase tracking-tighter leading-none">
              Moving to Dubai <span className="text-emerald-500">this week?</span>
            </h1>

            {/* Problem Section */}
            <div className="max-w-4xl mx-auto space-y-4">
              <div className="flex items-center justify-center gap-3 bg-red-500/10 border border-red-500/30 rounded-2xl p-6">
                <AlertCircle className="w-7 h-7 text-red-500 flex-shrink-0" />
                <p className="text-2xl font-black text-white">
                  Don't spend your first night <span className="text-red-400">without water.</span>
                </p>
              </div>
            </div>

            {/* Key Benefits */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-3xl mx-auto">
              <div className="flex flex-col items-center gap-3 bg-white/5 border border-white/10 rounded-xl p-6">
                <Droplet className="w-8 h-8 text-blue-400" />
                <p className="font-bold text-sm">Water Activation</p>
              </div>
              <div className="flex flex-col items-center gap-3 bg-white/5 border border-white/10 rounded-xl p-6">
                <Zap className="w-8 h-8 text-yellow-400" />
                <p className="font-bold text-sm">DEWA & Ejari</p>
              </div>
              <div className="flex flex-col items-center gap-3 bg-white/5 border border-white/10 rounded-xl p-6">
                <Home className="w-8 h-8 text-emerald-400" />
                <p className="font-bold text-sm">Home Ready in Hours</p>
              </div>
            </div>

            {/* Positioning Statement */}
            <div className="max-w-4xl mx-auto space-y-4">
              <div className="bg-slate-800/60 border border-emerald-500/20 rounded-2xl p-6 text-left">
                <p className="text-emerald-300 font-medium text-base leading-relaxed">
                  Moving into a new home should feel welcoming.<br />
                  The AquaCafe Move-In Welcome Service helps residents settle in smoothly by coordinating essential move-in services.
                </p>
                <p className="text-gray-400 text-sm mt-3 font-medium">
                  AquaCafe represents DeliWer's home hospitality concept — ensuring water, comfort, and readiness when residents move into a new home.
                </p>
              </div>
            </div>

            {/* Solution Section */}
            <div className="max-w-4xl mx-auto space-y-4">
              <div className="flex items-center justify-center gap-3 bg-emerald-500/10 border border-emerald-500/30 rounded-2xl p-8">
                <div className="flex-1">
                  <p className="text-3xl font-black text-white mb-2">
                    DeliWer activates your home <span className="text-emerald-400">in minutes.</span>
                  </p>
                  <p className="text-emerald-100 font-medium text-lg">
                    AquaCafe Move-In Welcome Service: Ejari coordination, DEWA activation, water setup, and home readiness check.
                  </p>
                </div>
              </div>
            </div>

            {/* Offer & CTA */}
            <div className="space-y-6">
              <div className="bg-gradient-to-r from-emerald-600 to-emerald-500 rounded-3xl p-8 text-center">
                <p className="text-sm font-bold uppercase tracking-widest text-emerald-100 mb-1">AquaCafe Move-In Welcome Service</p>
                <p className="text-lg font-black text-emerald-100 mb-3">Move-In Coordination Package – 399</p>
                <p className="text-5xl md:text-6xl font-black text-white mb-4">AED 399</p>
                <p className="text-emerald-100 font-medium text-lg">
                  Ejari guidance · DEWA coordination · Water & AC checks · Move-in readiness
                </p>
              </div>

              <Button 
                size="lg" 
                className="w-full md:w-auto mx-auto block bg-white text-slate-950 hover:bg-gray-100 font-black h-16 px-12 rounded-2xl text-xl shadow-2xl"
                onClick={handleWhatsApp}
              >
                <MessageSquare className="w-6 h-6 mr-3" />
                Book via WhatsApp
              </Button>

              <p className="text-sm text-gray-400 font-medium">Response within 10 minutes • WhatsApp support</p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* What's Included Section */}
      <section className="py-24 px-4 bg-white/5 border-t border-white/10">
        <div className="max-w-5xl mx-auto">
          {/* A Welcome When You Move In */}
          <div className="bg-emerald-500/5 border border-emerald-500/20 rounded-2xl p-8 mb-12 text-center">
            <h2 className="text-2xl font-black uppercase tracking-tight text-emerald-400 mb-3">A Welcome When You Move In</h2>
            <p className="text-gray-300 font-medium leading-relaxed max-w-2xl mx-auto">
              When moving into a new home, small things make a big difference.<br />
              The AquaCafe Move-In Welcome Service coordinates essential setup tasks and helps residents start their new home experience smoothly.
            </p>
          </div>

          <h2 className="text-4xl md:text-5xl font-black uppercase mb-6 text-center">What's Included</h2>

          {/* Move-In Welcome Coordination Includes */}
          <div className="bg-slate-900/50 border border-white/10 rounded-2xl p-8 mb-10">
            <h3 className="text-xl font-black uppercase tracking-tight text-white mb-5">Move-In Welcome Coordination Includes</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {[
                "Ejari Registration Assistance or Home Service Coordination",
                "DEWA Activation Guidance",
                "Water Readiness Setup",
                "Air and Ventilation Readiness Check",
                "Packing and Movers Coordination",
                "Move-In Day Service Coordination",
                "Home Water Filter Welcome Bonus (where applicable)"
              ].map((item, i) => (
                <div key={i} className="flex items-start gap-3 text-sm text-gray-200">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[
              { icon: Home, title: "Ejari Coordination", desc: "Guide through official RERA-appointed trustee centers" },
              { icon: Zap, title: "DEWA Activation", desc: "Electricity setup and meter registration" },
              { icon: Droplet, title: "Water Activation", desc: "Water connection verified and tested" },
              { icon: CheckCircle2, title: "AC & Cooling Check", desc: "AC systems tested and sanitized" },
              { icon: Home, title: "Home Inspection", desc: "Full readiness assessment before move-in" },
              { icon: MessageSquare, title: "WhatsApp Support", desc: "Dedicated team coordination throughout" }
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                viewport={{ once: true }}
                className="flex gap-4 bg-white/5 border border-white/10 rounded-2xl p-6 hover:border-emerald-500/50 transition-all"
              >
                <div className="flex-shrink-0">
                  <div className="flex items-center justify-center h-12 w-12 rounded-lg bg-emerald-500/20">
                    <item.icon className="h-6 w-6 text-emerald-400" />
                  </div>
                </div>
                <div>
                  <h3 className="font-bold text-white mb-1">{item.title}</h3>
                  <p className="text-gray-400 text-sm">{item.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-24 px-4">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-black uppercase mb-12 text-center">How It Works</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {[
              { num: "1", title: "Book", desc: "Book via WhatsApp or form" },
              { num: "2", title: "We Assess", desc: "Review your building & setup" },
              { num: "3", title: "We Coordinate", desc: "Handle Ejari & utilities" },
              { num: "4", title: "Move In Ready", desc: "Home activated before arrival" }
            ].map((step, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                viewport={{ once: true }}
                className="relative"
              >
                <div className="bg-white/5 border border-white/10 rounded-2xl p-8 text-center h-full flex flex-col justify-center">
                  <div className="text-5xl font-black text-emerald-500 mb-4">{step.num}</div>
                  <h3 className="font-black text-xl mb-2">{step.title}</h3>
                  <p className="text-gray-400 text-sm">{step.desc}</p>
                </div>
                {i < 3 && (
                  <div className="hidden md:block absolute top-1/2 -right-3 w-6 h-0.5 bg-emerald-500/30" />
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-24 px-4 bg-gradient-to-r from-emerald-950/30 to-slate-950 border-t border-emerald-500/20">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-black uppercase mb-4">
              Ready to move in stress-free?
            </h2>
            <p className="text-xl text-gray-300 mb-8 font-medium">
              Join hundreds of tenants who activated their homes with DeliWer.
            </p>
            
            <div className="flex flex-col md:flex-row gap-4 justify-center">
              <Button 
                size="lg" 
                className="bg-emerald-600 hover:bg-emerald-500 font-black h-16 px-12 rounded-2xl text-lg shadow-xl shadow-emerald-900/30"
                onClick={handleWhatsApp}
                data-testid="button-whatsapp-book"
              >
                <MessageSquare className="w-6 h-6 mr-3" />
                Book Move-In Welcome (AED 399)
              </Button>

              <Link href="/relocate">
                <Button 
                  size="lg" 
                  variant="outline"
                  className="border-emerald-500/50 text-emerald-300 bg-emerald-500/10 hover:bg-emerald-500/20 font-black h-16 px-12 rounded-2xl text-lg"
                  data-testid="button-relocate-explore"
                >
                  Explore Full Relocation
                  <ArrowRight className="w-6 h-6 ml-3" />
                </Button>
              </Link>
            </div>

            <p className="text-sm text-gray-400 font-medium mt-6">
              WhatsApp chat • Response within 10 minutes
            </p>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
