import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { CheckCircle2, MessageSquare, ArrowRight } from "lucide-react";
import { SiWhatsapp } from "react-icons/si";
import { TrustStrip } from "@/components/trust-strip";

export default function BusinessSetup() {
  const whatsappUrl = "https://wa.me/yournumber?text=Business%20Setup%20enquiry%20%E2%80%93%20Free%20Zone%20%2F%20Trading";

  return (
    <div className="min-h-screen bg-slate-950 text-white flex flex-col items-center">
      <section className="w-full px-4 py-3 border-b border-white/10 bg-slate-950">
        <div className="max-w-4xl mx-auto">
          <TrustStrip variant="dark" showContact={true} />
        </div>
      </section>
      {/* 1️⃣ HERO — INTENT CONFIRMATION */}
      <section className="w-full max-w-4xl px-4 py-16 md:py-24 text-center">
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">
          Business Setup in Dubai — Done Right, Without Guesswork
        </h1>
        <p className="text-xl text-muted-foreground mb-8">
          Free Zone company formation, trading licenses & setup support — including DAFZA.
        </p>
        
        <div className="flex flex-col items-center gap-3">
          <Button 
            size="lg" 
            className="bg-[#25D366] hover:bg-[#20ba5a] text-white min-h-[3.5rem] px-8 text-lg font-semibold rounded-full shadow-lg transition-transform hover:scale-105 active:scale-95 flex items-center gap-2"
            asChild
          >
            <a href={whatsappUrl} target="_blank" rel="noopener noreferrer">
              <SiWhatsapp className="w-6 h-6" />
              Talk to a Setup Advisor (WhatsApp)
            </a>
          </Button>
          <p className="text-sm text-muted-foreground">
            Free Zone • Trading • Fast timelines
          </p>
        </div>
      </section>

      {/* 2️⃣ WHO THIS IS FOR (INTENT FILTER) */}
      <section className="w-full max-w-2xl px-4 py-12 border-t border-border/50">
        <h2 className="text-2xl font-bold mb-6 text-center">This is for you if you are:</h2>
        <div className="space-y-4">
          {[
            "A trader, importer, or exporter",
            "In electronics, phones, or refurbished goods",
            "Planning to set up in a Dubai Free Zone",
            "Looking for DAFZA, DMCC, IFZA, or similar zones"
          ].map((item, i) => (
            <div key={i} className="flex items-start gap-3 bg-muted/30 p-4 rounded-lg">
              <CheckCircle2 className="w-5 h-5 text-primary mt-0.5 shrink-0" />
              <span className="text-lg">{item}</span>
            </div>
          ))}
        </div>
      </section>

      {/* 3️⃣ WHAT WE HELP WITH (NO FLUFF) */}
      <section className="w-full max-w-2xl px-4 py-12 border-t border-border/50">
        <h2 className="text-2xl font-bold mb-6 text-center">What we help with</h2>
        <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[
            "Free Zone selection (DAFZA, DMCC, IFZA, etc.)",
            "Trading & commercial license guidance",
            "Setup timelines and cost clarity",
            "Basic relocation coordination"
          ].map((item, i) => (
            <li key={i} className="flex items-center gap-2 p-3 border rounded-md">
              <ArrowRight className="w-4 h-4 text-primary shrink-0" />
              <span className="text-base">{item}</span>
            </li>
          ))}
        </ul>
      </section>

      {/* 4️⃣ HOW IT WORKS (DE-RISKING) */}
      <section className="w-full max-w-2xl px-4 py-12 border-t border-border/50 bg-muted/10">
        <h2 className="text-2xl font-bold mb-8 text-center">How it works</h2>
        <div className="grid gap-8">
          {[
            { step: 1, text: "Share your business activity on WhatsApp" },
            { step: 2, text: "We confirm the right Free Zone & license" },
            { step: 3, text: "We guide setup and next steps" }
          ].map((step, i) => (
            <div key={i} className="flex items-center gap-6">
              <div className="w-10 h-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold shrink-0">
                {step.step}
              </div>
              <p className="text-lg font-medium">{step.text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 5️⃣ SECONDARY CTA (REPEAT ACTION) */}
      <section className="w-full max-w-2xl px-4 py-16 text-center">
        <Button 
          size="lg" 
          variant="default"
          className="bg-[#25D366] hover:bg-[#20ba5a] text-white min-h-[3.5rem] px-8 text-lg font-semibold rounded-full shadow-lg transition-transform hover:scale-105 active:scale-95 flex items-center gap-2 mx-auto"
          asChild
        >
          <a href={whatsappUrl} target="_blank" rel="noopener noreferrer">
            <SiWhatsapp className="w-6 h-6" />
            Start Business Setup Discussion
          </a>
        </Button>
      </section>

      {/* 6️⃣ SOFT CROSS-LINK */}
      <footer className="w-full max-w-2xl px-4 py-8 border-t border-border/20 text-center text-muted-foreground">
        <p className="text-sm">
          Relocating as part of your setup? <br className="md:hidden" />
          <a href="/relocate" className="text-primary hover:underline inline-flex items-center gap-1 font-medium ml-1">
            We can coordinate visa & housing support <ArrowRight className="w-3 h-3" />
          </a>
        </p>
      </footer>
    </div>
  );
}
