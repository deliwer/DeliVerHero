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

  const defaultMessage = refCode 
    ? `Hello DeliWer, I am interested in the Exit Concierge service. Referral Code: ${refCode}`
    : "Hello DeliWer, I am interested in the Exit Concierge service.";

  const WHATSAPP_LINK = getWhatsAppLink(defaultMessage);

  return (
    <div className="min-h-screen bg-white text-slate-900">
      <SEOMeta 
        title="Exit Concierge Dubai | Close DEWA, Recover Deposit | DeliWer"
        description="Stress-free Dubai exit concierge. Deposit recovery, utility closure & relocation support. Chat on WhatsApp now."
      />

      {/* Hero Section */}
      <section className="relative py-20 px-4 bg-slate-900 text-white overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&q=80')] opacity-20 bg-cover bg-center" />
        <div className="absolute inset-0 bg-gradient-to-b from-slate-900/80 to-slate-900" />
        <div className="max-w-4xl mx-auto text-center relative z-10">
          {refCode === "DEBACCI20" && (
            <Badge className="mb-6 bg-emerald-500 text-white border-none py-2 px-4 rounded-full text-sm font-bold animate-pulse">
              DEBACCI GROUP EXCLUSIVE PARTNER OFFER
            </Badge>
          )}
          <h1 className="text-4xl md:text-6xl font-black tracking-tight mb-6">
            Leaving Dubai? Don’t lose your deposit or waste weeks on admin.
          </h1>
          <p className="text-xl md:text-2xl text-slate-300 mb-10">
            DeliWer Exit Concierge guarantees a seamless, stress-free departure from the UAE.
          </p>
          <div className="flex flex-col items-center gap-4">
            <div className="w-full md:w-auto space-y-3">
              <Button 
                size="lg" 
                className="bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-full px-8 h-16 text-lg w-full shadow-xl"
                onClick={() => window.open(WHATSAPP_LINK, '_blank')}
              >
                <MessageSquare className="mr-2 h-6 w-6" />
                Get Free Exit Consultation on WhatsApp
              </Button>
              {refCode && (
                <div className="p-4 bg-white/5 border border-white/10 rounded-2xl backdrop-blur-md">
                  <p className="text-emerald-400 font-bold mb-1">
                    Partner Tracking Active: {refCode}
                  </p>
                  <p className="text-xs text-slate-400">
                    Your referral is recorded. We track client names manually via WhatsApp for 5% commission calculation.
                  </p>
                </div>
              )}
            </div>
            <p className="text-slate-400 font-medium">
              Fastest response on WhatsApp: <span className="text-white">{WHATSAPP_NUMBER}</span>
            </p>
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
