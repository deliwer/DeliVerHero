import { useRef, useEffect } from "react";
import { Helmet } from "react-helmet";
import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { 
  ArrowRight,
  MessageCircle,
  Plane,
  Home,
  Check,
  Star,
  Shield,
  AlertTriangle,
  Zap,
  Clock,
  LogOut,
  ChevronRight
} from "lucide-react";
import { motion } from "framer-motion";
import { TrustStrip, PartnerStrip } from "@/components/trust-strip";
import relocateHero from "@/assets/images/relocate-hero.jpg";
import moveOutBg from "@/assets/images/move-out-bg.jpg";

export default function Relocate() {
  const [location] = useLocation();
  const moveInRef = useRef<HTMLDivElement>(null);
  const moveOutRef = useRef<HTMLDivElement>(null);

  const scrollToMoveIn = () => {
    moveInRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const scrollToMoveOut = () => {
    moveOutRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    const hash = window.location.hash;
    if (hash === '#move-in-packs') {
      setTimeout(scrollToMoveIn, 100);
    } else if (hash === '#move-out-packs') {
      setTimeout(scrollToMoveOut, 100);
    }
  }, [location]);

  const moveInOptions = [
    {
      name: "Essential",
      tagline: "Just the Basics",
      price: "299",
      description: "Ideal if you're on a budget but need a professional check.",
      features: ["Move-in coordination", "Safety readiness check", "Utility activation list"],
      color: "slate"
    },
    {
      name: "Summer Survival",
      tagline: "Most Popular",
      price: "599",
      recommended: true,
      description: "Crucial for Dubai. We ensure your AC actually cools and water is ready.",
      features: ["Everything in Essential", "Full AC service & deep coil clean", "Water pressure & leak audit", "Drinking water starter kit"],
      color: "emerald"
    },
    {
      name: "White Glove",
      tagline: "Zero Stress",
      price: "1,199",
      description: "Arrive at a perfect home. We handle the deep clean and all setups.",
      features: ["Everything in Summer", "Professional deep cleaning", "Dedicated account manager", "Smart home/WiFi setup assistance"],
      color: "blue"
    }
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-white selection:bg-blue-500/30 font-sans">
      <Helmet>
        <title>Dubai Relocation: Move-In & Secure Exit Packs | DeliWer</title>
        <meta name="description" content="Moving to or from Dubai? Secure your home readiness or protect your deposit with our fixed-price relocation and exit packages." />
      </Helmet>

      {/* Trust Strip */}
      <section className="px-4 py-3 border-b border-white/10 bg-black/40">
        <div className="max-w-4xl mx-auto">
          <TrustStrip variant="dark" showContact={true} />
        </div>
      </section>

      {/* Hero Section */}
      <section className="relative min-h-[70vh] flex items-center justify-center overflow-hidden px-4">
        <div 
          className="absolute inset-0 z-0 bg-cover bg-center opacity-40 scale-105"
          style={{ backgroundImage: `url(${relocateHero})` }}
        />
        <div className="absolute inset-0 z-0 bg-gradient-to-b from-slate-950/20 via-slate-950/80 to-slate-950" />
        
        <div className="relative z-10 max-w-4xl mx-auto text-center space-y-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-4xl md:text-6xl font-black uppercase tracking-tighter mb-6 leading-[0.9]">
              Moving in Dubai <br />
              <span className="text-blue-500 italic font-serif lowercase tracking-normal">Simplified.</span>
            </h1>
            <p className="text-xl md:text-2xl text-blue-100/80 max-w-2xl mx-auto font-medium">
              One accountable team to handle your home readiness or ensure a penalty-free exit.
            </p>
          </motion.div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              onClick={scrollToMoveIn}
              className="bg-emerald-600 hover:bg-emerald-500 text-white h-16 px-10 text-lg font-black uppercase tracking-widest rounded-2xl shadow-2xl shadow-emerald-900/40"
            >
              <Home className="mr-2 h-6 w-6" /> I'm Moving In
            </Button>
            <Button 
              onClick={scrollToMoveOut}
              className="bg-blue-600 hover:bg-blue-500 text-white h-16 px-10 text-lg font-black uppercase tracking-widest rounded-2xl shadow-2xl shadow-blue-900/40"
            >
              <Plane className="mr-2 h-6 w-6" /> I'm Moving Out
            </Button>
          </div>
        </div>
      </section>

      <PartnerStrip />

      {/* Move-In Section: Comparable Options */}
      <section ref={moveInRef} id="move-in-packs" className="px-4 py-24 bg-slate-950">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16 space-y-4">
            <h2 className="text-3xl md:text-5xl font-black uppercase tracking-tighter">Your New Home, <span className="text-emerald-500">Ready.</span></h2>
            <p className="text-gray-400 max-w-2xl mx-auto font-medium text-lg">Don't move into a hot, dusty apartment. Choose your readiness level below.</p>
          </div>

          <div className="grid lg:grid-cols-3 gap-4">
            {moveInOptions.map((opt, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="relative"
              >
                <Card className={`h-full bg-white/5 border-white/10 hover-elevate transition-all duration-300 rounded-[2.5rem] overflow-hidden ${opt.recommended ? 'ring-2 ring-emerald-500 shadow-2xl shadow-emerald-500/20' : ''}`}>
                  <CardContent className="p-8 flex flex-col h-full">
                    <div className="mb-8">
                      <span className={`text-[10px] font-black uppercase tracking-[0.2em] px-3 py-1 rounded-full ${opt.recommended ? 'bg-emerald-500 text-white' : 'bg-white/10 text-gray-400'}`}>
                        {opt.tagline}
                      </span>
                      <h3 className="text-3xl font-black uppercase mt-4">{opt.name}</h3>
                      <p className="text-gray-400 text-sm mt-2 font-medium">{opt.description}</p>
                    </div>

                    <div className="mb-8 bg-white/5 rounded-2xl p-4 border border-white/5">
                      <div className="flex items-baseline gap-1">
                        <span className="text-sm font-bold text-gray-500 uppercase">AED</span>
                        <span className="text-4xl font-black text-white">{opt.price}</span>
                        <span className="text-xs font-bold text-gray-500 ml-2">Fixed Price</span>
                      </div>
                    </div>

                    <ul className="space-y-4 mb-10 flex-1">
                      {opt.features.map((f, idx) => (
                        <li key={idx} className="flex gap-3 text-sm font-bold text-gray-300 items-start">
                          <Check className="w-5 h-5 text-emerald-500 shrink-0" />
                          <span>{f}</span>
                        </li>
                      ))}
                    </ul>

                    <Button 
                      className={`w-full h-14 rounded-xl font-black uppercase tracking-widest ${opt.recommended ? 'bg-emerald-600 hover:bg-emerald-500' : 'bg-white/10 hover:bg-white/20'}`}
                      onClick={() => window.open(`https://wa.me/971523946311?text=Hi, I want the ${opt.name} Move-In Pack for AED ${opt.price}.`, '_blank')}
                    >
                      Choose {opt.name}
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Move-Out Section: Risk Mitigation Messaging */}
      <section ref={moveOutRef} id="move-out-packs" className="relative px-4 py-24 border-y border-white/5 overflow-hidden">
        {/* Background Image with wash */}
        <div 
          className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat opacity-20"
          style={{ backgroundImage: `url(${moveOutBg})` }}
        />
        <div className="absolute inset-0 z-0 bg-gradient-to-b from-slate-950/80 via-slate-950/90 to-slate-950" />
        
        <div className="relative z-10 max-w-5xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-500/10 border border-blue-500/20 rounded-full text-blue-400 text-xs font-black uppercase tracking-widest">
                <Shield className="w-4 h-4" /> Deposit Protection
              </div>
              <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tighter leading-[0.9]">
                Leave Clean. Disconnect Right. <br />
                <span className="text-blue-500">Avoid Penalties.</span>
              </h2>
              <p className="text-xl text-gray-400 font-medium leading-relaxed">
                Furniture removal, old electronics handling, utility disconnections, and handover support — coordinated end-to-end.
              </p>
              
              <div className="grid gap-3">
                {[
                  { icon: AlertTriangle, text: "Landlord handover timelines & penalties", color: "amber" },
                  { icon: Home, text: "Furniture no longer needed", color: "blue" },
                  { icon: Zap, text: "Old appliances or electronics handling", color: "blue" },
                  { icon: Clock, text: "Utilities that must be disconnected correctly", color: "emerald" }
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-4 bg-white/5 p-4 rounded-2xl border border-white/5">
                    <item.icon className={`w-6 h-6 text-${item.color}-500`} />
                    <span className="font-bold text-gray-200">{item.text}</span>
                  </div>
                ))}
              </div>
            </div>

            <Card className="bg-slate-950 border-blue-500/30 rounded-[3rem] p-1 shadow-2xl shadow-blue-500/10">
              <CardContent className="p-10 space-y-8">
                <div className="space-y-2">
                  <h3 className="text-3xl font-black uppercase tracking-tight">One-Call Exit</h3>
                  <p className="text-blue-400 font-black uppercase tracking-widest text-xs">Total Compliance & Handover</p>
                </div>

                <div className="space-y-4">
                  {[
                    "Furniture removal or trade-off",
                    "Old appliances & electronics handled responsibly",
                    "AC, water, and utility disconnections",
                    "Clearance coordination for landlord handover",
                    "One point of contact — no chasing vendors"
                  ].map((f, i) => (
                    <div key={i} className="flex gap-3 text-sm font-bold text-gray-300">
                      <Check className="w-5 h-5 text-blue-500 shrink-0" />
                      <span>{f}</span>
                    </div>
                  ))}
                </div>

                <div className="pt-6 border-t border-white/10">
                  <div className="flex justify-between items-end mb-6">
                    <div>
                      <p className="text-gray-500 text-[10px] font-black uppercase tracking-widest">Starting From</p>
                      <p className="text-4xl font-black tracking-tighter">AED 499</p>
                    </div>
                    <p className="text-blue-400 text-[10px] font-black uppercase tracking-widest mb-1 underline">Apartments & Villas</p>
                  </div>
                  <div className="space-y-4">
                    <Button 
                      className="w-full h-16 bg-blue-600 hover:bg-blue-500 text-white font-black uppercase tracking-widest rounded-2xl text-lg shadow-xl shadow-blue-900/40"
                      onClick={() => window.open(`https://wa.me/971523946311?text=Hi, I am moving out and need to plan my move-out assessment.`, '_blank')}
                    >
                      Plan My Move-Out <ArrowRight className="ml-2 h-6 w-6" />
                    </Button>
                    <p className="text-[10px] text-center text-gray-500 font-black uppercase tracking-widest">
                      Fast assessment • Apartments & villas
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
          
          <div className="mt-16 pt-12 border-t border-white/5 text-center">
            <p className="text-gray-500 text-sm font-medium max-w-2xl mx-auto leading-relaxed">
              Closing a flat, villa, or office? <br />
              <span className="text-gray-400">Items that can’t be taken can be cleared as part of the move-out process.</span>
            </p>
          </div>
        </div>
      </section>

      {/* Social Proof / FAQ Micro-Section */}
      <section className="px-4 py-24 bg-slate-950">
        <div className="max-w-4xl mx-auto text-center space-y-12">
          <h3 className="text-2xl font-black uppercase tracking-tight">Trusted by Expats in JLT, Marina & Downtown</h3>
          <div className="flex flex-wrap justify-center gap-12 grayscale opacity-50">
            <span className="font-black italic text-2xl uppercase">Handover Pro</span>
            <span className="font-black italic text-2xl uppercase">Relo-Expert</span>
            <span className="font-black italic text-2xl uppercase">Dubai-Safe</span>
          </div>
          <Link href="/residents">
            <Button variant="link" className="text-gray-500 hover:text-emerald-400 font-black uppercase tracking-[0.2em] text-[10px]">
              Already settled? View Maintenance Services <ChevronRight className="w-3 h-3 ml-1" />
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
}
