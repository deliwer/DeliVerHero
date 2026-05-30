import { SEOMeta } from "@/components/seo-meta";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MessageCircle, CheckCircle, ShieldCheck, Zap, ArrowRight, Plane, Recycle, Users2 } from "lucide-react";
import { Link } from "wouter";

import moveOutHero from "@/assets/images/move-out-hero.jpg";

export default function MoveOutSubpage() {
  const WHATSAPP_NUMBER = "+971523906019";
  
  const getWhatsAppLink = (service: string) => {
    const text = `Hi, I’m planning a move-out and want to book a Smooth Exit assessment.`;
    return `https://wa.me/${WHATSAPP_NUMBER.replace(/\+/g, "").replace(/\s/g, "")}?text=${encodeURIComponent(text)}`;
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white selection:bg-emerald-500/30 font-sans">
      <SEOMeta 
        title="Exit Concierge & Move-Out Services Dubai | DeliWer"
        description="Dubai move-out services. Deposit recovery, utility closure, and professional cleaning. Leave Dubai without the stress."
      />
      
      <section className="relative py-20 px-4 overflow-hidden border-b border-white/5 min-h-[70vh] flex items-center justify-center">
        <div 
          className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat scale-105"
          style={{ backgroundImage: `url(${moveOutHero})` }}
        />
        <div className="absolute inset-0 z-0 bg-gradient-to-b from-slate-950/40 via-slate-950/70 to-slate-950" />
        
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <Badge className="mb-6 bg-emerald-500 text-white border-none py-2 px-6 rounded-full text-sm font-black uppercase tracking-widest">
            Smooth Exit Pack
          </Badge>
          <h1 className="text-4xl md:text-7xl font-black uppercase tracking-tighter mb-6 leading-none text-white drop-shadow-2xl">
            Leaving Dubai? <br />
            <span className="text-emerald-500 italic font-serif lowercase tracking-normal">We Handle Your Home Exit — End to End.</span>
          </h1>
          <p className="text-xl text-gray-200 mb-10 max-w-2xl mx-auto leading-relaxed font-bold">
            From assessment to handover, including trade-in and compliant disposal.
          </p>
          <Button 
            size="lg" 
            className="bg-emerald-600 hover:bg-emerald-500 text-white font-black rounded-xl px-12 h-16 text-lg shadow-xl"
            onClick={() => window.open(getWhatsAppLink('Smooth Exit Pack assessment'), '_blank')}
          >
            <MessageCircle className="mr-2 h-6 w-6" />
            Book Exit Assessment
          </Button>
        </div>
      </section>

      <section className="py-20 px-4 bg-slate-900/50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-black uppercase tracking-tight mb-4">What’s Included</h2>
          </div>
          <div className="grid md:grid-cols-3 lg:grid-cols-5 gap-6">
            {[
              { title: "Inspection", desc: "Move-out inspection coordination.", icon: Zap },
              { title: "Trade-In", desc: "Removal of unwanted items.", icon: ShieldCheck },
              { title: "E-Waste", desc: "Mandatory disposal handling.", icon: Recycle },
              { title: "Handover", desc: "Final readiness for handover.", icon: CheckCircle },
              { title: "Coordination", desc: "Single accountable coordination team.", icon: Users2 }
            ].map((item, i) => (
              <Card key={i} className="bg-white/5 border-white/10 rounded-2xl">
                <CardHeader className="p-6 pb-2 text-center">
                  <item.icon className="w-8 h-8 text-emerald-400 mx-auto mb-3" />
                  <CardTitle className="text-lg font-black uppercase text-white leading-tight">{item.title}</CardTitle>
                </CardHeader>
                <CardContent className="p-6 pt-0 text-center text-sm text-gray-400">
                  {item.desc}
                </CardContent>
              </Card>
            ))}
          </div>
          
          <div className="mt-8 text-center">
            <Link href="/ewaste">
              <Button variant="link" className="text-emerald-400 font-bold hover:text-emerald-300">
                Learn how disposal is handled <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
            </Link>
          </div>

          <div className="mt-16 max-w-lg mx-auto">
            <Card className="bg-emerald-950/20 border-emerald-500/20 p-8 text-center rounded-[2rem]">
              <h3 className="text-2xl font-black uppercase text-white mb-2">Smooth Exit Pack</h3>
              <div className="text-3xl font-black text-emerald-500 mb-4">From AED 499</div>
              <p className="text-gray-400 text-sm leading-relaxed mb-6">
                Includes exit clearance, trade-in coordination, and compliant disposal.
              </p>
              <div className="space-y-3 text-left mb-8">
                {[
                  "Designed for expats leaving Dubai",
                  "Prevents landlord & handover issues",
                  "No multiple vendors to manage",
                  "WhatsApp support throughout exit"
                ].map((text, i) => (
                  <div key={i} className="flex items-center gap-3 text-sm font-bold text-gray-300 uppercase tracking-tight">
                    <CheckCircle className="w-4 h-4 text-emerald-500 shrink-0" />
                    {text}
                  </div>
                ))}
              </div>
              <Button 
                className="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-black h-14 rounded-xl"
                onClick={() => window.open(getWhatsAppLink('Smooth Exit Pack assessment'), '_blank')}
              >
                Book Exit Assessment
              </Button>
            </Card>
          </div>
        </div>
      </section>

      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-2xl font-black uppercase mb-8 italic">Optional Add-On</h2>
          <Card className="bg-white/5 border-white/10 p-8 inline-block max-w-sm">
            <h3 className="text-xl font-black uppercase mb-4">Deep Cleaning / Painting</h3>
            <p className="text-gray-400 text-sm leading-relaxed mb-6">
              Need the property ready for immediate handover? Add deep cleaning or professional painting to your exit pack.
            </p>
            <Button 
              variant="outline" 
              className="border-emerald-500 text-emerald-400 hover:bg-emerald-500/10 w-full"
              onClick={() => window.open(getWhatsAppLink('Move-Out Add-ons (Cleaning/Painting)'), '_blank')}
            >
              Request Quote
            </Button>
          </Card>
        </div>
      </section>
      
      <section className="py-20 px-4 text-center">
        <h2 className="text-3xl font-black uppercase mb-12">Looking for a move-in plan?</h2>
        <Link href="/residence/move-in">
          <Button variant="outline" className="border-emerald-500 text-emerald-400 hover:bg-emerald-500/10 px-8 h-14 rounded-xl font-bold">
            Explore Move-In Services
          </Button>
        </Link>
      </section>
    </div>
  );
}
