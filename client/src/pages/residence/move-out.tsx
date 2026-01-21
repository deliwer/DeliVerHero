import { SEOMeta } from "@/components/seo-meta";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MessageCircle, CheckCircle, ShieldCheck, Zap, ArrowRight, Plane } from "lucide-react";
import { Link } from "wouter";

export default function MoveOutSubpage() {
  const WHATSAPP_NUMBER = "+971523946311";
  
  const getWhatsAppLink = (service: string) => {
    const text = `Hello DeliWer, I am interested in the Move-Out / Exit service for: ${service}`;
    return `https://wa.me/${WHATSAPP_NUMBER.replace(/\+/g, "").replace(/\s/g, "")}?text=${encodeURIComponent(text)}`;
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white selection:bg-emerald-500/30 font-sans">
      <SEOMeta 
        title="Exit Concierge & Move-Out Services Dubai | DeliWer"
        description="Dubai move-out services. Deposit recovery, utility closure, and professional cleaning. Leave Dubai without the stress."
      />
      
      <section className="relative py-20 px-4 overflow-hidden border-b border-white/5">
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <Badge className="mb-6 bg-emerald-500 text-white border-none py-2 px-6 rounded-full text-sm font-black uppercase tracking-widest">
            Exit & Move-Out
          </Badge>
          <h1 className="text-4xl md:text-7xl font-black uppercase tracking-tighter mb-6 leading-none">
            Exit cleanly. <br />
            <span className="text-emerald-500 italic font-serif lowercase tracking-normal">Recover your deposit.</span>
          </h1>
          <p className="text-xl text-gray-400 mb-10 max-w-2xl mx-auto leading-relaxed">
            Professional exit management including utility closures, handover support, and deposit recovery.
          </p>
          <Button 
            size="lg" 
            className="bg-emerald-600 hover:bg-emerald-500 text-white font-black rounded-xl px-12 h-16 text-lg shadow-xl"
            onClick={() => window.open(getWhatsAppLink('General Move-Out Enquiry'), '_blank')}
          >
            <MessageCircle className="mr-2 h-6 w-6" />
            Enquire via WhatsApp
          </Button>
        </div>
      </section>

      <section className="py-20 px-4 bg-slate-900/50">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { title: "Utility Closure", desc: "DEWA, gas, and telecom cancellation managed for you.", icon: Zap },
              { title: "Deposit Recovery", desc: "Painting, cleaning, and snag fixing to maximize your refund.", icon: ShieldCheck },
              { title: "Global Move", desc: "Introduction to trusted international shipping partners.", icon: Plane }
            ].map((item, i) => (
              <Card key={i} className="bg-white/5 border-white/10 rounded-[2rem] overflow-hidden">
                <CardHeader className="p-8 pb-0 text-center">
                  <div className="w-16 h-16 bg-emerald-500/20 rounded-2xl flex items-center justify-center mb-6 mx-auto">
                    <item.icon className="w-8 h-8 text-emerald-400" />
                  </div>
                  <CardTitle className="text-2xl font-black uppercase text-white">{item.title}</CardTitle>
                </CardHeader>
                <CardContent className="p-8 pt-4 text-center text-gray-400">
                  {item.desc}
                  <Button 
                    variant="link" 
                    className="mt-4 text-emerald-400 font-bold block mx-auto"
                    onClick={() => window.open(getWhatsAppLink(item.title), '_blank')}
                  >
                    Enquire Now <ArrowRight className="ml-2 w-4 h-4" />
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
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
