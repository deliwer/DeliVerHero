import { SEOMeta } from "@/components/seo-meta";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MessageSquare, CheckCircle, Package, Plug, ShieldCheck, Zap, Plane, Building } from "lucide-react";
import { useLocation } from "wouter";

export default function RelocateExitPage() {
  const [location] = useLocation();
  const searchParams = new URLSearchParams(window.location.search);
  const refCode = searchParams.get("ref") || "";

  const WHATSAPP_NUMBER = "+971523946311";
  const CEO_NUMBER = "+971523906019";
  
  const getWhatsAppLink = (message: string) => {
    const encodedMessage = encodeURIComponent(message);
    return `https://wa.me/${WHATSAPP_NUMBER.replace(/\+/g, "").replace(/\s/g, "")}?text=${encodedMessage}`;
  };

  const defaultMessage = "Hi, I am moving out of my Dubai apartment and need exit coordination support.";

  const WHATSAPP_LINK = getWhatsAppLink(defaultMessage);

  return (
    <div className="min-h-screen bg-white text-slate-900">
      <SEOMeta 
        title="Move-Out Coordination Dubai | Exit Support | DeliWer"
        description="Coordinate utilities, tenancy closure, landlord handover, and relocation logistics. Stress-free Dubai exit concierge."
      />

      {/* Hero Section */}
      <section className="relative py-24 px-4 bg-slate-950 text-white overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-slate-950/50 to-slate-950 z-0" />
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <Badge className="mb-6 bg-blue-500/10 text-blue-400 border-blue-500/20 py-2 px-4 rounded-full text-xs font-black tracking-widest uppercase">
            Exit & Relocation Logistics
          </Badge>
          <h1 className="text-5xl md:text-8xl font-black tracking-tighter leading-[0.85] mb-8 uppercase">
            Leaving Your <br />
            <span className="text-blue-500">Dubai Apartment?</span>
          </h1>
          <p className="text-xl md:text-2xl text-slate-400 mb-12 font-bold max-w-2xl mx-auto uppercase tracking-tight">
            Coordinate utilities, tenancy closure, landlord handover, and relocation logistics.
          </p>
          <div className="flex flex-col items-center gap-4">
            <Button 
              size="lg" 
              className="bg-blue-600 hover:bg-blue-500 text-white font-black rounded-2xl px-12 h-20 text-2xl shadow-2xl w-full md:w-auto uppercase tracking-widest active:scale-95 transition-all"
              onClick={() => window.open(WHATSAPP_LINK, '_blank')}
            >
              <MessageSquare className="mr-4 h-8 w-8" />
              Plan Move-Out Support
            </Button>
            <p className="text-slate-500 font-black uppercase tracking-[0.2em] text-[10px] mt-4">
              Response within 10 minutes
            </p>
          </div>
        </div>
      </section>

      {/* Includes Section */}
      <section className="py-24 px-4 bg-slate-900/50 border-y border-white/5">
        <div className="max-w-5xl mx-auto">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { title: "DEWA Final Bill", desc: "Coordination of final utility settlement." },
              { title: "Ejari Cancellation", desc: "Official termination of tenancy record." },
              { title: "Handover Guidance", desc: "Guidance for a clean landlord walkthrough." },
              { title: "Keys Coordination", desc: "Seamless keys handover layer for brokers." }
            ].map((item, i) => (
              <Card key={i} className="bg-white/5 border-white/10 p-6 rounded-3xl hover:border-blue-500/50 transition-all">
                <h3 className="text-lg font-black uppercase text-white mb-2">{item.title}</h3>
                <p className="text-slate-400 text-xs font-medium">{item.desc}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* What We Handle Section */}
      <section className="py-20 px-4 bg-slate-50">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-black uppercase tracking-tighter mb-12 text-center text-slate-900">What We Handle</h2>
          <div className="grid gap-6">
            {[
              {
                title: "Deposit Recovery",
                desc: "We manage final cleaning, snag fixing, and landlord handover to maximize your security deposit refund.",
                icon: ShieldCheck,
                color: "text-blue-600",
                bg: "bg-blue-50"
              },
              {
                title: "Utility & Liability Closure",
                desc: "DEWA, internet, telecom, and all final bills closed and settled for you. Zero loose ends.",
                icon: Plug,
                color: "text-amber-600",
                bg: "bg-amber-50"
              },
              {
                title: "International Move Support",
                desc: "Connect with trusted global moving partners for your next destination (USA, UK, Europe, Asia).",
                icon: Plane,
                color: "text-indigo-600",
                bg: "bg-indigo-50"
              }
            ].map((item, i) => (
              <Card key={i} className="border-none shadow-sm rounded-2xl overflow-hidden">
                <CardHeader className="flex flex-row items-start gap-6 p-8">
                  <div className={`${item.bg} p-4 rounded-2xl`}>
                    <item.icon className={`h-8 w-8 ${item.color}`} />
                  </div>
                  <div>
                    <CardTitle className="text-2xl font-bold mb-2">{item.title}</CardTitle>
                    <p className="text-slate-600 text-lg leading-relaxed">{item.desc}</p>
                  </div>
                </CardHeader>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Why DeliWer Section */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="bg-slate-900 text-white p-8 md:p-12 rounded-[2.5rem] shadow-2xl">
            <h2 className="text-3xl font-black mb-6">Why DeliWer</h2>
            <p className="text-xl text-slate-300 mb-8 leading-relaxed">
              Most Dubai exits fail due to missed steps, poor handover, and unmanaged admin.
              DeliWer acts as your <span className="text-white font-bold">single accountable exit partner</span> — so you leave clean, compliant, and stress-free.
            </p>
            <div className="grid md:grid-cols-2 gap-4">
              {[
                "UAE-experienced team",
                "WhatsApp-first support",
                "Process-driven exits",
                "Professional & confidential"
              ].map((point, i) => (
                <div key={i} className="flex items-center gap-3">
                  <CheckCircle className="h-5 w-5 text-emerald-500" />
                  <span className="text-lg font-medium">{point}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* For Expats & Families */}
      <section className="py-20 px-4 bg-emerald-50 text-center">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl font-black mb-4 text-emerald-900">Stop stressing. Start packing.</h2>
          <p className="text-xl text-emerald-800 mb-10">We handle the admin while you plan your next chapter.</p>
          <Button 
            size="lg" 
            className="bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-full px-12 h-16 text-lg shadow-lg"
            onClick={() => window.open(WHATSAPP_LINK, '_blank')}
          >
            <MessageSquare className="mr-2 h-6 w-6" />
            Chat on WhatsApp Now
          </Button>
        </div>
      </section>

      {/* Corporate Section */}
      <section className="py-20 px-4 border-t border-slate-100">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-black mb-6 text-slate-900">Professional Exit Concierge for Corporate & High-Net-Worth Clients</h2>
          <p className="text-xl text-slate-600 mb-12 max-w-2xl mx-auto">
            An unmanaged exit from Dubai creates financial risk, compliance issues, and reputational damage. DeliWer eliminates that risk.
          </p>
          <div className="grid md:grid-cols-3 gap-6 mb-12">
            {[
              { title: "Financial Security", desc: "Maximize deposit recovery" },
              { title: "Compliance Assurance", desc: "Close all liabilities" },
              { title: "Global Network", desc: "Seamless onward relocation" }
            ].map((v, i) => (
              <div key={i} className="p-6 bg-slate-50 rounded-2xl text-left border border-slate-100">
                <h3 className="font-bold text-lg mb-2 text-slate-900">{v.title}</h3>
                <p className="text-slate-600">{v.desc}</p>
              </div>
            ))}
          </div>
          <Button 
            variant="outline" 
            size="lg" 
            className="border-slate-900 text-slate-900 hover:bg-slate-900 hover:text-white font-bold rounded-full px-12 h-16 text-lg"
            onClick={() => window.open(WHATSAPP_LINK, '_blank')}
          >
            Request Corporate Exit Briefing
          </Button>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-20 px-4 bg-slate-900 text-white">
        <div className="max-w-4xl mx-auto">
          <div className="border border-slate-700 p-8 md:p-12 rounded-[2.5rem] bg-slate-800/50">
            <h2 className="text-3xl font-black mb-8">Need Immediate or Confidential Help?</h2>
            <div className="space-y-6 text-xl">
              <div className="flex flex-col md:flex-row md:items-center gap-2">
                <span className="text-slate-400">📲 WhatsApp (Fastest):</span>
                <a href={WHATSAPP_LINK} className="text-emerald-400 font-bold hover:underline">{WHATSAPP_NUMBER}</a>
              </div>
              <div className="flex flex-col md:flex-row md:items-center gap-2">
                <span className="text-slate-400">📞 CEO Line:</span>
                <a href={`tel:${CEO_NUMBER.replace(/\s/g, "")}`} className="text-white font-bold hover:underline">{CEO_NUMBER}</a>
              </div>
              <div className="flex flex-col md:flex-row md:items-center gap-2">
                <span className="text-slate-400">🌐 Website:</span>
                <a href="https://www.deliwer.com" className="text-blue-400 font-bold hover:underline">www.deliwer.com</a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Sticky Footer CTA */}
      <div className="fixed bottom-0 left-0 right-0 p-4 z-50 md:hidden bg-white/80 backdrop-blur-md border-t border-slate-100">
        <Button 
          className="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-bold h-14 rounded-xl shadow-2xl"
          onClick={() => window.open(WHATSAPP_LINK, '_blank')}
        >
          <MessageSquare className="mr-2 h-5 w-5" />
          Chat on WhatsApp — Leave Dubai Without Loose Ends
        </Button>
      </div>
      
      {/* Desktop Sticky WhatsApp */}
      <div className="hidden md:block fixed bottom-8 right-8 z-50">
        <Button 
          className="bg-emerald-600 hover:bg-emerald-500 text-white rounded-full h-16 w-16 p-0 shadow-2xl animate-bounce hover:animate-none"
          onClick={() => window.open(WHATSAPP_LINK, '_blank')}
        >
          <MessageSquare className="h-8 w-8" />
        </Button>
      </div>
    </div>
  );
}
