import { Link } from "wouter";
import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
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
  Gift
} from "lucide-react";
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

      {/* SECTION 1: HERO */}
      <section className="relative py-20 overflow-hidden min-h-[600px] flex items-center">
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `linear-gradient(135deg, rgba(15, 23, 42, 0.85) 0%, rgba(30, 41, 59, 0.8) 100%), url(${marketImage})`,
          }}
        ></div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-5xl lg:text-7xl font-bold text-white mb-6" data-testid="text-hero-title">
              Residence services for moving into a home in Dubai
            </h1>
            <p className="text-lg md:text-2xl text-gray-300 mb-8 max-w-3xl mx-auto">
              Support for every stage of living in Dubai — from finding a place to stay to getting fully set up after move-in.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Button 
                size="lg" 
                className="bg-blue-600 hover:bg-blue-500 text-white font-bold px-10 py-8 text-lg rounded-2xl shadow-2xl transition-all" 
                data-testid="button-start-journey"
                onClick={scrollToJourney}
              >
                Start your residence journey
              </Button>
              <Button size="lg" variant="outline" className="border-white/30 text-white backdrop-blur-sm bg-white/10 px-8 py-8 text-lg font-medium rounded-2xl hover:bg-white/20 transition-all" data-testid="button-whatsapp-contact">
                <MessageCircle className="w-5 h-5 mr-2" />
                WhatsApp +971 523 946 311
              </Button>
            </div>
            <p className="text-[12px] text-gray-400 mt-6 font-medium uppercase tracking-widest">
              Not a real estate agency. Not a property listing platform.
            </p>
          </div>
        </div>
      </section>

      {/* SECTION 2: JOURNEY INTRO */}
      <section 
        className="relative py-24 px-4 overflow-hidden"
        style={{
          backgroundImage: `url(${residentsHero})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundAttachment: 'fixed',
        }}
      >
        <div className="absolute inset-0 bg-black/75"></div>
        <div className="container mx-auto max-w-4xl text-center relative z-10">
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-8">Living in Dubai is a journey, not a transaction</h2>
          <div className="space-y-6 text-lg md:text-xl text-gray-300 leading-relaxed">
            <p>
              Finding a place, settling in, and managing daily life often involve different providers and confusing handoffs.
            </p>
            <p className="font-semibold text-blue-400">
              DeliWer brings these moments together — guiding residents before and after they move in.
            </p>
          </div>
        </div>
      </section>

      {/* SECTION 3: FIND A PLACE & COMMUNITY */}
      <section 
        ref={journeySectionRef} 
        className="relative py-20 px-4 overflow-hidden"
        style={{
          backgroundImage: `url(${ecosystemImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundAttachment: 'fixed',
        }}
      >
        <div className="absolute inset-0 bg-black/85"></div>
        <div className="container mx-auto max-w-6xl relative z-10">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-12 text-center uppercase tracking-wider">Find a Place & Community</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {[
              { title: "Find a Place to Stay", description: "Guidance for choosing the right living option based on stay duration, location, and budget — without agent pressure.", icon: Search },
              { title: "Short-Term Living (Managed)", description: "Arranged serviced apartments and short-term homes with move-in support and ongoing assistance.", icon: Clock },
              { title: "Community Living", description: "Support designed around real communities and buildings — not generic listings.", icon: Building2 }
            ].map((item, idx) => (
              <div key={idx} className="bg-black/40 backdrop-blur-md border border-white/10 rounded-2xl p-6 hover-elevate">
                <div className="w-12 h-12 bg-blue-600/20 rounded-xl flex items-center justify-center mb-4">
                  <item.icon className="w-6 h-6 text-blue-400" />
                </div>
                <h3 className="text-xl font-bold text-white mb-2">{item.title}</h3>
                <p className="text-gray-400 text-sm leading-relaxed">{item.description}</p>
              </div>
            ))}
          </div>
          <div className="flex justify-center">
            <Link href="/residence/find-a-place">
              <Button size="lg" className="bg-blue-600 hover:bg-blue-500 text-white font-bold px-8 py-6 rounded-xl" data-testid="link-explore-living">
                Explore Living Options
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* SECTION 4: MOVE-IN & SETUP */}
      <section 
        className="relative py-20 px-4 overflow-hidden border-t border-white/5"
        style={{
          backgroundImage: `url(${settlementImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundAttachment: 'fixed',
        }}
      >
        <div className="absolute inset-0 bg-black/85"></div>
        <div className="container mx-auto max-w-6xl relative z-10">
          <div className="text-center mb-12">
            <Badge className="bg-emerald-500 text-white px-4 py-1.5 rounded-full mb-4 animate-pulse">
              LIMITED TIME: JVC LAUNCH OFFER
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold text-white uppercase tracking-wider">Move-In & Home Setup</h2>
            <p className="text-emerald-400 font-bold mt-2">Claim your Free Shower Filter + AED 99 Starter Deal</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {[
              { title: "Move-In Services", description: "Essential services to prepare your home after keys are received.", icon: Key },
              { title: "Utilities & Home Setup", description: "Help with water, internet, and essential home services.", icon: Zap },
              { title: "Exclusive JVC Offer", description: "Free shower filter installation + AED 99 move-in starter for new residents.", icon: Gift, highlight: true }
            ].map((item, idx) => (
              <div key={idx} className={`bg-black/40 backdrop-blur-md border ${item.highlight ? 'border-emerald-500/50 shadow-[0_0_20px_rgba(16,185,129,0.2)]' : 'border-white/10'} rounded-2xl p-6 hover-elevate`}>
                <div className={`w-12 h-12 ${item.highlight ? 'bg-emerald-600/30' : 'bg-emerald-600/20'} rounded-xl flex items-center justify-center mb-4`}>
                  <item.icon className={`w-6 h-6 ${item.highlight ? 'text-emerald-400' : 'text-emerald-400'}`} />
                </div>
                <h3 className="text-xl font-bold text-white mb-2">{item.title}</h3>
                <p className="text-gray-400 text-sm leading-relaxed">{item.description}</p>
              </div>
            ))}
          </div>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/launch">
              <Button size="lg" className="bg-emerald-600 hover:bg-emerald-500 text-white font-bold px-8 py-6 rounded-xl shadow-[0_0_15px_rgba(16,185,129,0.4)]">
                Claim Launch Offer
                <Gift className="w-5 h-5 ml-2" />
              </Button>
            </Link>
            <Link href="/residence/move-in-services">
              <Button size="lg" variant="outline" className="border-white/30 text-white backdrop-blur-sm bg-white/10 px-8 py-6 rounded-xl hover:bg-white/20">
                Individual Services
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* SECTION 4: TWO CLEAR PATHS (PRIMARY CONVERSION) */}
      <section 
        className="relative py-24 px-4 overflow-hidden"
        style={{
          backgroundImage: `url(${settlementImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundAttachment: 'fixed',
        }}
      >
        <div className="absolute inset-0 bg-black/80"></div>
        <div className="container mx-auto max-w-5xl relative z-10">
          <div className="grid md:grid-cols-2 gap-8">
            {/* PATH 1: MOVE-IN SERVICES */}
            <Card className="bg-black/40 backdrop-blur-md border-white/10 overflow-hidden group hover:border-emerald-500/50 transition-all duration-500 shadow-2xl">
              <CardHeader className="p-8">
                <h3 className="text-3xl font-bold text-white mb-2">Move-In Services</h3>
                <p className="text-gray-400">Choose individual services you may need when settling into a new home in Dubai.</p>
              </CardHeader>
              <CardContent className="p-8 pt-0">
                <ul className="space-y-3 mb-8">
                  {["Initial cleaning", "Drinking water setup", "Basic maintenance checks", "Move-in day coordination"].map((item, i) => (
                    <li key={i} className="flex items-center gap-3 text-gray-300">
                      <CheckCircle2 className="w-5 h-5 text-emerald-500" />
                      {item}
                    </li>
                  ))}
                </ul>
                <Link href="/residence/move-in-services">
                  <Button className="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-bold py-6 rounded-xl" data-testid="link-move-in-services">
                    View move-in services
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </Link>
              </CardContent>
            </Card>

            {/* PATH 2: MOVE-IN PACKAGES */}
            <Card className="bg-black/40 backdrop-blur-md border-white/10 overflow-hidden group hover:border-blue-500/50 transition-all duration-500 shadow-2xl">
              <CardHeader className="p-8">
                <h3 className="text-3xl font-bold text-white mb-2">Move-In Packages</h3>
                <p className="text-gray-400">Bundled move-in solutions designed to reduce stress and avoid managing multiple vendors.</p>
              </CardHeader>
              <CardContent className="p-8 pt-0">
                <ul className="space-y-3 mb-8">
                  {["Starter homes", "Family apartments", "Full home setups"].map((item, i) => (
                    <li key={i} className="flex items-center gap-3 text-gray-300">
                      <CheckCircle2 className="w-5 h-5 text-blue-500" />
                      {item}
                    </li>
                  ))}
                </ul>
                <Link href="/residence/move-in-packages">
                  <Button className="w-full bg-blue-600 hover:bg-blue-500 text-white font-bold py-6 rounded-xl" data-testid="link-move-in-packages">
                    View move-in packages
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* SECTION 5: ANTI-BROKER TRUST STATEMENT */}
      <section className="relative py-20 px-4 overflow-hidden bg-black">
        <div className="container mx-auto max-w-3xl text-center relative z-10">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">Guidance, not listings</h2>
          <div className="space-y-4 text-lg text-gray-400">
            <p>We don’t display hundreds of properties.</p>
            <p>We don’t push agent commissions.</p>
            <p className="text-white font-semibold pt-4">
              Our role is to help residents make the right living decisions and support them after move-in.
            </p>
          </div>
        </div>
      </section>

      {/* SECTION 6: LOCATION SIGNAL */}
      <section className="py-12 px-4 bg-slate-950/50">
        <div className="container mx-auto text-center">
          <p className="text-gray-300 mb-2">
            Residence services currently support selected Dubai communities, including <span className="text-white font-bold">JVC</span>.
          </p>
          <p className="text-xs text-gray-500 italic">
            Coverage expands based on building access and demand.
          </p>
        </div>
      </section>

      {/* FINAL CTA (BOTTOM) */}
      <section 
        className="relative py-28 px-4 overflow-hidden"
        style={{
          backgroundImage: `url(${marketImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'bottom',
          backgroundAttachment: 'fixed',
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/90 to-black/80"></div>
        <div className="container mx-auto max-w-4xl text-center relative z-10">
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">Just received your keys?</h2>
          <p className="text-xl text-gray-400 mb-10">Start with what you need — services or a complete move-in plan.</p>
          
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <Link href="/residence/move-in-services">
              <Button className="w-full bg-emerald-600 hover:bg-emerald-500 py-6 rounded-xl font-bold">
                Start with services
              </Button>
            </Link>
            <Link href="/residence/move-in-packages">
              <Button className="w-full bg-blue-600 hover:bg-blue-500 py-6 rounded-xl font-bold">
                See move-in packages
              </Button>
            </Link>
            <Button variant="outline" className="w-full border-white/20 text-white py-6 rounded-xl font-bold hover:bg-white/10 backdrop-blur-sm">
              <MessageCircle className="w-5 h-5 mr-2" />
              WhatsApp us
            </Button>
          </div>
        </div>
      </section>

      {/* MANDATORY DISCLAIMER FOOTER */}
      <footer className="py-12 px-4 bg-black border-t border-white/5">
        <div className="container mx-auto text-center">
          <div className="inline-block bg-amber-500/10 border border-amber-500/20 rounded-full px-8 py-3 mb-6">
            <p className="text-amber-500 font-bold text-sm uppercase tracking-widest">
              DeliWer does not sell property or act as a real estate agent.
            </p>
          </div>
          <p className="text-gray-600 text-xs">© {new Date().getFullYear()} DeliWer Residence. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
