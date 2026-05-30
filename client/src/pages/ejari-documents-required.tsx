import { useState } from "react";
import { SEOMeta } from "@/components/seo-meta";
import { Button } from "@/components/ui/button";
import { EjariFunnel } from "@/components/ejari-funnel";
import { CheckCircle2, AlertCircle, ArrowRight, MessageCircle } from "lucide-react";

const TENANT_DOCS = [
  { doc: "Emirates ID (copy)", note: "Both sides required. Scan or WhatsApp photo accepted." },
  { doc: "Signed Tenancy Contract", note: "Must be signed by both tenant and landlord. Ejari-compliant format required." },
  { doc: "Security Deposit Receipt", note: "Proof of security deposit payment to landlord." },
];

const LANDLORD_DOCS = [
  { doc: "Landlord Passport Copy", note: "For non-UAE national landlords." },
  { doc: "Landlord Emirates ID", note: "For UAE national landlords." },
  { doc: "Property Title Deed", note: "Proves landlord ownership of the property." },
  { doc: "Power of Attorney (if applicable)", note: "If a property management company is acting on behalf of the owner." },
];

export default function EjariDocumentsRequiredPage() {
  const [funnelOpen, setFunnelOpen] = useState(false);

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <SEOMeta
        title="Ejari Documents Required Dubai | Complete Checklist | DeliWer"
        description="Full list of documents required for Ejari registration in Dubai. Tenant and landlord documents, what to prepare, and how DeliWer helps you avoid rejection."
      />

      <section className="relative py-24 px-4 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-950 via-emerald-950/20 to-slate-950" />
        <div className="max-w-3xl mx-auto text-center relative z-10 space-y-6">
          <h1 className="text-4xl md:text-6xl font-black tracking-tighter leading-[0.9] uppercase">
            Ejari Documents<br /><span className="text-emerald-400">Required in Dubai</span>
          </h1>
          <p className="text-lg text-gray-400 font-medium leading-relaxed">
            Missing or incorrect documents are the #1 cause of Ejari rejection. Here is the complete checklist of what you need — and how DeliWer verifies everything before submission.
          </p>
          <Button data-testid="button-ejari-docs-cta" size="lg" className="bg-emerald-600 hover:bg-emerald-500 text-white font-black rounded-2xl px-10 h-14 text-lg" onClick={() => setFunnelOpen(true)}>
            Start Ejari Setup <ArrowRight className="w-5 h-5 ml-2" />
          </Button>
        </div>
      </section>

      <section className="py-20 px-4 bg-slate-900/50 border-y border-white/5">
        <div className="max-w-3xl mx-auto space-y-10">
          <div className="space-y-6">
            <h2 className="text-2xl font-black uppercase tracking-tighter text-white">Tenant Documents</h2>
            {TENANT_DOCS.map((item, i) => (
              <div key={i} className="flex gap-4 items-start bg-slate-900 border border-emerald-500/20 rounded-2xl p-5" data-testid={`tenant-doc-${i}`}>
                <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                <div>
                  <div className="font-black text-white uppercase text-sm">{item.doc}</div>
                  <div className="text-gray-400 text-xs font-medium mt-0.5">{item.note}</div>
                </div>
              </div>
            ))}
          </div>
          <div className="space-y-6">
            <h2 className="text-2xl font-black uppercase tracking-tighter text-white">Landlord Documents</h2>
            {LANDLORD_DOCS.map((item, i) => (
              <div key={i} className="flex gap-4 items-start bg-slate-900 border border-blue-500/20 rounded-2xl p-5" data-testid={`landlord-doc-${i}`}>
                <CheckCircle2 className="w-5 h-5 text-blue-400 shrink-0 mt-0.5" />
                <div>
                  <div className="font-black text-white uppercase text-sm">{item.doc}</div>
                  <div className="text-gray-400 text-xs font-medium mt-0.5">{item.note}</div>
                </div>
              </div>
            ))}
          </div>
          <div className="bg-amber-500/10 border border-amber-500/30 rounded-2xl p-6 flex gap-4">
            <AlertCircle className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
            <div>
              <h3 className="font-black text-white uppercase text-sm mb-1">DeliWer Document Check</h3>
              <p className="text-gray-400 text-xs font-medium leading-relaxed">
                Before submitting to a trustee center, DeliWer reviews all your documents to catch errors. This prevents rejection, saves time, and ensures first-time approval.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 px-4 bg-emerald-950/20 border-t border-emerald-500/10 text-center">
        <div className="max-w-2xl mx-auto space-y-6">
          <h2 className="text-4xl font-black uppercase tracking-tighter text-white">Ready to Submit Your Ejari?</h2>
          <p className="text-gray-400 font-medium">Share your documents via WhatsApp. DeliWer reviews, organizes, and submits for you.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button data-testid="button-ejari-docs-funnel" size="lg" className="bg-emerald-600 hover:bg-emerald-500 text-white font-black rounded-2xl px-10 h-14 text-lg" onClick={() => setFunnelOpen(true)}>
              Start Ejari Setup
            </Button>
            <Button size="lg" variant="outline" className="border-slate-600 text-white hover:bg-slate-800 rounded-2xl px-10 h-14" onClick={() => window.open("https://wa.me/971523906019?text=" + encodeURIComponent("Hello, I have all my Ejari documents ready. Can you help me submit?"), "_blank")}>
              <MessageCircle className="w-4 h-4 mr-2" /> WhatsApp Us
            </Button>
          </div>
        </div>
      </section>

      <EjariFunnel open={funnelOpen} onClose={() => setFunnelOpen(false)} initialScenario="register" />
    </div>
  );
}
