import { Link } from "wouter";
import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Home, 
  Building2, 
  ArrowRight, 
  CheckCircle2,
  Key,
  MapPin,
  Shield,
  Zap,
  MessageCircle,
  Clock,
  Search,
  Info,
  Gift,
  ArrowDownCircle,
  LogOut
} from "lucide-react";
import { ExitPricingCalculator } from "@/components/exit-pricing-calculator";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

// Import lifestyle images
import marketImage from "@assets/stock_images/dubai_downtown_skyli_01395ddb.jpg";
import residentsHero from "@assets/stock_images/modern_dubai_apartme_3d49f8dc.jpg";
import ecosystemImage from "@assets/generated_images/peaceful_and_safe_dubai_environment_encouraging_relocation.png";
import settlementImage from "@assets/generated_images/dubai_urban_community_services_background.png";

export default function Residence() {
  const journeySectionRef = useRef<HTMLElement>(null);

  const scrollToJourney = () => {
    journeySectionRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-background">
      {/* MANDATORY DISCLAIMER BANNER */}
      <div className="bg-amber-500 py-2 px-4 text-center text-black font-bold text-sm">
        ⚠️ DeliWer does not sell property or act as a real estate agent. Not a property listing platform.
      </div>

      {/* SECTION 1: HERO - SIMPLIFIED */}
      <section className="relative py-28 overflow-hidden min-h-[70vh] flex items-center">
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `linear-gradient(rgba(0,0,0,0.6), rgba(0,0,0,0.6)), url(${marketImage})`,
          }}
        ></div>
        
        <div className="container mx-auto px-6 relative z-10 text-center">
          <h1 className="text-5xl md:text-8xl font-black text-white mb-8 tracking-tighter" data-testid="text-hero-title">
            DUBAI RESIDENCE <br />
            <span className="text-blue-400">MADE SIMPLE.</span>
          </h1>
          <p className="text-xl md:text-2xl text-white/90 mb-12 max-w-2xl mx-auto font-medium">
            Find your home, settle in, and live stress-free. Guidance for every stage of your Dubai life.
          </p>
          <div className="flex flex-wrap justify-center gap-6">
            <Button 
              size="lg" 
              className="bg-blue-600 hover:bg-blue-500 text-white font-black px-12 h-20 text-xl rounded-full shadow-2xl transition-transform hover:scale-105" 
              onClick={scrollToJourney}
            >
              Start Journey
            </Button>
            <Button 
              size="lg" 
              variant="outline" 
              className="border-white/40 text-white backdrop-blur-md bg-white/10 px-12 h-20 text-xl font-black rounded-full hover:bg-white/20"
              onClick={() => window.open('https://wa.me/971523946311?text=Hi, I need help with residence services in Dubai.', '_blank')}
            >
              <MessageCircle className="w-8 h-8 mr-3" />
              WhatsApp Us
            </Button>
          </div>
          <p className="text-xs text-white/50 mt-8 uppercase tracking-[0.3em] font-bold">
            No Agents. No Pressure. Just Support.
          </p>
        </div>
      </section>

      {/* SECTION 2: SIMPLIFIED THREE PATHS WITH BACKGROUND */}
      <section ref={journeySectionRef} className="relative py-32 overflow-hidden text-white">
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${residentsHero})` }}
        />
        <div className="absolute inset-0 bg-slate-950/80 backdrop-blur-sm" />
        <div className="container mx-auto max-w-7xl px-6 relative z-10">
          <div className="text-center mb-24">
            <h2 className="text-4xl md:text-6xl font-black mb-6 tracking-tighter">HOW CAN WE HELP?</h2>
            <p className="text-xl text-slate-300 max-w-2xl mx-auto">Choose your path and let us handle the rest.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-12">
            {[
              { 
                title: "FIND A HOME", 
                desc: "Guidance on locations, stay duration, and community living without broker pressure.",
                link: "/residence/find-a-place",
                icon: Search,
                color: "blue"
              },
              { 
                title: "MOVE-IN", 
                desc: "Cleaning, utilities, internet, and furniture setup. Everything ready for your arrival.",
                link: "/residence/move-in-services",
                icon: ArrowDownCircle,
                color: "emerald"
              },
              { 
                title: "MOVE-OUT", 
                desc: "Professional exit concierge. Deposit recovery, cleaning, and utility closures.",
                link: "/residence/move-out-services",
                icon: LogOut,
                color: "red"
              }
            ].map((path, i) => (
              <div key={i} className="flex flex-col items-center text-center group">
                <div className={`w-24 h-24 rounded-[2rem] bg-${path.color}-500/20 flex items-center justify-center mb-10 transition-all group-hover:scale-110 backdrop-blur-md border border-white/10`}>
                  <path.icon className={`w-12 h-12 text-${path.color}-400`} />
                </div>
                <h3 className="text-3xl font-black mb-4 tracking-tight">{path.title}</h3>
                <p className="text-lg text-slate-300 mb-10 leading-relaxed">{path.desc}</p>
                <Link href={path.link}>
                  <Button variant="outline" className={`border-${path.color}-500/40 text-${path.color}-400 hover:bg-${path.color}-500/10 font-bold rounded-full px-8 h-12 backdrop-blur-sm`}>
                    Explore {path.title.toLowerCase()}
                  </Button>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 3: WHATSAPP QUICK ACTION */}
      <section className="relative py-32 overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${settlementImage})` }}
        />
        <div className="absolute inset-0 bg-blue-950/90 backdrop-blur-md" />
        <div className="container mx-auto max-w-5xl px-6 relative z-10 text-center text-white">
          <Badge className="bg-emerald-500 text-white px-6 py-2 rounded-full mb-8 text-lg font-black tracking-widest uppercase">
            JVC Residents
          </Badge>
          <h2 className="text-5xl md:text-7xl font-black mb-8 tracking-tighter">
            JUST GOT YOUR KEYS?
          </h2>
          <p className="text-2xl text-blue-100 mb-12 max-w-3xl mx-auto leading-relaxed">
            Message us on WhatsApp for a free shower filter installation and your AED 99 move-in starter deal.
          </p>
          <Button 
            size="lg" 
            className="bg-emerald-600 hover:bg-emerald-500 text-white font-black rounded-full px-16 h-20 text-2xl shadow-2xl transition-all hover:scale-105"
            onClick={() => window.open('https://wa.me/971523946311?text=Hi, I am a JVC resident and I want to claim the move-in offer.', '_blank')}
          >
            <MessageCircle className="w-10 h-10 mr-4 animate-bounce" />
            Claim on WhatsApp
          </Button>
        </div>
      </section>

      {/* Pricing Calculator Section */}
      <section className="py-24 px-4 bg-slate-950">
        <div className="container mx-auto max-w-4xl">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-black uppercase tracking-tighter mb-4">Calculate Your Move-In Cost</h2>
            <p className="text-gray-400 text-lg">Transparent pricing for move-in packages across Dubai.</p>
          </div>
          <ExitPricingCalculator isMoveIn />
        </div>
      </section>

      {/* SECTION 5: ANTI-BROKER TRUST STATEMENT */}
      <section className="relative py-20 px-4 overflow-hidden bg-black text-center">
        <div className="container mx-auto max-w-3xl relative z-10">
          <h2 className="text-3xl md:text-5xl font-black text-white mb-8 tracking-tighter">GUIDANCE, NOT LISTINGS</h2>
          <div className="space-y-4 text-xl text-gray-400 font-medium">
            <p>No generic property listings.</p>
            <p>No broker commissions.</p>
            <p className="text-blue-400 font-black pt-4 text-2xl uppercase">
              Pure support for residents.
            </p>
          </div>
        </div>
      </section>

      {/* FINAL CTA (BOTTOM) */}
      <section 
        className="relative py-32 px-6 overflow-hidden text-center"
        style={{
          backgroundImage: `url(${marketImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'bottom',
        }}
      >
        <div className="absolute inset-0 bg-black/90 backdrop-blur-sm"></div>
        <div className="container mx-auto max-w-4xl relative z-10">
          <h2 className="text-4xl md:text-6xl font-black text-white mb-6 tracking-tighter uppercase">Ready to Start?</h2>
          <p className="text-xl text-gray-400 mb-12 font-medium">Our team is ready to guide you through your move.</p>
          
          <div className="flex flex-wrap justify-center gap-6">
            <Button 
              className="bg-emerald-600 hover:bg-emerald-500 text-white font-black px-12 h-20 text-xl rounded-full shadow-2xl transition-all hover:scale-105"
              onClick={() => window.open('https://wa.me/971523946311?text=Hi, I am ready to start my residence journey.', '_blank')}
            >
              <MessageCircle className="w-8 h-8 mr-3" />
              WhatsApp Us
            </Button>
            <Link href="/residence/move-in-packages">
              <Button size="lg" variant="outline" className="border-white/40 text-white backdrop-blur-md bg-white/10 px-12 h-20 text-xl font-black rounded-full hover:bg-white/20">
                View Packages
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* MANDATORY DISCLAIMER FOOTER */}
      <footer className="py-12 px-4 bg-black border-t border-white/5">
        <div className="container mx-auto text-center">
          <p className="text-amber-500 font-black text-sm uppercase tracking-widest mb-6">
            DeliWer does not sell property or act as a real estate agent.
          </p>
          <p className="text-gray-600 text-xs font-medium">© {new Date().getFullYear()} DeliWer Residence. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
