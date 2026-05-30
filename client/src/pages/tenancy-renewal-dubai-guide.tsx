import { SEOMeta } from "@/components/seo-meta";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Link } from "wouter";
import { motion } from "framer-motion";
import { FileText, MessageCircle, ArrowRight, CheckCircle2, AlertCircle, ChevronDown, ChevronUp, Clock } from "lucide-react";
import { useState } from "react";

function FAQItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border border-white/10 rounded-2xl overflow-hidden" data-testid="faq-item">
      <button className="w-full flex items-center justify-between gap-4 px-6 py-5 text-left text-white font-bold hover:bg-white/5 transition-colors"
        onClick={() => setOpen(!open)} aria-expanded={open}>
        <span>{q}</span>
        {open ? <ChevronUp className="w-5 h-5 text-emerald-400 flex-shrink-0" /> : <ChevronDown className="w-5 h-5 text-emerald-400 flex-shrink-0" />}
      </button>
      {open && <div className="px-6 pb-5 text-gray-300 leading-relaxed text-sm">{a}</div>}
    </div>
  );
}

const FAQ = [
  { q: "How early should I start the tenancy renewal process in Dubai?", a: "Start at least 3 months before your lease expiry. Under Dubai law, a landlord must provide 90 days' notice of any rent increase. Starting early gives you time to review the RERA rent index, compare the renewal offer to moving costs, and coordinate your move if you decide to leave." },
  { q: "Can my landlord refuse to renew my tenancy?", a: "Yes, in certain conditions. A landlord can refuse renewal if they plan to sell the property, use it for personal use, or undertake major renovation. They must still provide 12 months' written notice via notary public or registered mail before the lease expiry." },
  { q: "What happens if I don't respond to a renewal notice?", a: "If neither party communicates intent before the renewal date, the tenancy typically auto-renews under the same terms. However, it's best to confirm in writing to avoid misunderstandings." },
  { q: "Do I need to register a new Ejari when renewing?", a: "Yes. In Dubai, an Ejari registration is required for each lease period, including renewals. A new tenancy contract must be signed and registered via an official Ejari trustee centre." },
  { q: "Can I negotiate a renewal offer below the RERA index?", a: "Yes. RERA caps define the maximum increase — not the minimum. If market conditions favour tenants or there is high vacancy in your building, you may be able to negotiate a freeze or even a reduction." },
];

const CHECKLIST = [
  { timing: "3 months before expiry", action: "Check your RERA rent index for your area and apartment type" },
  { timing: "3 months before expiry", action: "Review any renewal notice from your landlord" },
  { timing: "3 months before expiry", action: "Use the Move vs Renew Calculator to compare your options" },
  { timing: "2 months before expiry", action: "Negotiate with your landlord or confirm your decision to renew or move" },
  { timing: "2 months before expiry", action: "If moving: book movers and confirm your new tenancy" },
  { timing: "1 month before expiry", action: "If renewing: sign the new tenancy contract" },
  { timing: "1 month before expiry", action: "Register your renewal with Ejari via an official trustee centre" },
  { timing: "On or before expiry", action: "Ensure DEWA stays active (DEWA requires valid Ejari for continued service)" },
];

export default function TenancyRenewalDubaiGuide() {
  const handleWhatsApp = () => {
    window.open("https://wa.me/971523906019?text=" + encodeURIComponent("Hi DeliWer — my tenancy is coming up for renewal and I need help deciding whether to move or renew. Please advise."), "_blank");
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <SEOMeta
        title="Tenancy Renewal Dubai Guide 2025 | Renew or Move? | DeliWer"
        description="Complete guide to tenancy renewal in Dubai. Learn the process, your rights, RERA rules, Ejari renewal requirements, and when moving is a smarter option."
      />

      {/* Hero */}
      <section className="relative py-24 px-4 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-950 via-emerald-950/20 to-slate-950" />
        <div className="max-w-3xl mx-auto text-center relative z-10 space-y-6">
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <Badge className="bg-emerald-500/10 text-emerald-400 border-emerald-500/20 px-4 py-2 text-xs font-black uppercase tracking-widest rounded-full mb-4 inline-flex">
              Complete Tenant Guide
            </Badge>
            <h1 className="text-5xl md:text-6xl font-black tracking-tighter leading-[0.9] uppercase">
              Tenancy Renewal<br />
              <span className="text-emerald-400">Dubai Guide</span>
            </h1>
            <p className="text-lg text-gray-400 font-medium max-w-xl mx-auto leading-relaxed mt-4">
              Everything you need to know about renewing your lease in Dubai — including Ejari, RERA rules, negotiation tips, and when moving makes more financial sense.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="pb-20 px-4">
        <div className="max-w-3xl mx-auto space-y-10">

          {/* Overview */}
          <div className="bg-slate-900 border border-white/10 rounded-3xl p-8 space-y-5">
            <h2 className="text-2xl font-black uppercase tracking-tighter text-white">The Tenancy Renewal Process in Dubai</h2>
            <p className="text-gray-400 font-medium text-sm leading-relaxed">
              Renewing a tenancy in Dubai involves reviewing your landlord's renewal offer, checking it against the RERA rent index, negotiating if necessary, signing a new tenancy contract, and re-registering with Ejari. The entire process should start at least 3 months before your lease expiry.
            </p>
            <div className="space-y-3">
              {[
                "Review your current lease expiry date",
                "Check the RERA rent index for your area and apartment type",
                "Compare your landlord's offer to the legal maximum",
                "Decide: renew at the offered rate, negotiate, or move",
                "Sign the new tenancy contract",
                "Register the new contract via Ejari",
              ].map((step, i) => (
                <div key={i} className="flex gap-4 items-start">
                  <div className="w-7 h-7 bg-emerald-500/10 rounded-full flex items-center justify-center shrink-0 font-black text-emerald-400 text-xs">{i + 1}</div>
                  <p className="text-gray-300 text-sm font-medium leading-relaxed pt-1">{step}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Timeline Checklist */}
          <div className="bg-slate-900 border border-white/10 rounded-3xl p-8 space-y-6">
            <div className="flex items-center gap-3">
              <Clock className="w-6 h-6 text-emerald-400" />
              <h2 className="text-2xl font-black uppercase tracking-tighter text-white">Renewal Timeline Checklist</h2>
            </div>
            <div className="space-y-3">
              {CHECKLIST.map(({ timing, action }, i) => (
                <div key={i} className="flex gap-4">
                  <div className="shrink-0 text-right min-w-[110px]">
                    <span className="text-[11px] font-black text-emerald-400 uppercase tracking-wider">{timing}</span>
                  </div>
                  <div className="flex gap-3 items-start">
                    <CheckCircle2 className="w-4 h-4 text-gray-600 shrink-0 mt-0.5" />
                    <span className="text-gray-300 text-sm font-medium leading-relaxed">{action}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Renew vs Move section */}
          <div className="bg-slate-900 border border-white/10 rounded-3xl p-8 space-y-5">
            <h2 className="text-2xl font-black uppercase tracking-tighter text-white">When Moving Is Smarter Than Renewing</h2>
            <div className="space-y-4">
              {[
                { icon: AlertCircle, color: "text-amber-400", text: "Your landlord is increasing rent by more than 10% and market rents nearby are flat or falling." },
                { icon: AlertCircle, color: "text-amber-400", text: "A similar or better apartment in your area or nearby is available for significantly less rent." },
                { icon: AlertCircle, color: "text-amber-400", text: "You're paying significantly above the RERA market index and your landlord won't negotiate." },
                { icon: CheckCircle2, color: "text-emerald-400", text: "Moving costs (movers, Ejari, DEWA) are typically AED 3,000–8,000. If the annual rent saving exceeds this, moving pays for itself in year one." },
                { icon: CheckCircle2, color: "text-emerald-400", text: "DeliWer coordinates your move from start to finish so you don't manage multiple vendors." },
              ].map(({ icon: Icon, color, text }, i) => (
                <div key={i} className="flex gap-4 items-start">
                  <Icon className={`w-5 h-5 ${color} shrink-0 mt-0.5`} />
                  <p className="text-gray-300 text-sm font-medium leading-relaxed">{text}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Tools CTA */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Link href="/move-vs-renew-dubai">
              <div className="bg-violet-950/30 border border-violet-500/20 rounded-3xl p-6 hover:border-violet-500/40 transition-all cursor-pointer group space-y-3">
                <h3 className="text-lg font-black uppercase tracking-tighter text-white group-hover:text-violet-400 transition-colors">Move vs Renew Calculator</h3>
                <p className="text-gray-400 text-sm font-medium">Enter your numbers to see which option saves you more.</p>
                <span className="text-violet-400 text-xs font-black flex items-center gap-1">Run the numbers <ArrowRight className="w-3 h-3" /></span>
              </div>
            </Link>
            <Link href="/rent-increase-calculator-dubai">
              <div className="bg-blue-950/30 border border-blue-500/20 rounded-3xl p-6 hover:border-blue-500/40 transition-all cursor-pointer group space-y-3">
                <h3 className="text-lg font-black uppercase tracking-tighter text-white group-hover:text-blue-400 transition-colors">Rent Increase Calculator</h3>
                <p className="text-gray-400 text-sm font-medium">Check if your landlord's increase is within RERA limits.</p>
                <span className="text-blue-400 text-xs font-black flex items-center gap-1">Check increase limit <ArrowRight className="w-3 h-3" /></span>
              </div>
            </Link>
          </div>

          {/* WhatsApp CTA */}
          <div className="bg-emerald-950/40 border border-emerald-500/20 rounded-3xl p-8 text-center space-y-5">
            <h2 className="text-2xl font-black uppercase tracking-tighter text-white">Need Help Deciding?</h2>
            <p className="text-gray-400 font-medium text-sm">Our team helps Dubai tenants navigate renewal decisions and coordinates full relocations when moving is the better choice.</p>
            <Button data-testid="button-whatsapp" onClick={handleWhatsApp}
              className="bg-emerald-600 hover:bg-emerald-500 text-white font-black rounded-2xl px-10 h-14 text-base shadow-xl transition-all">
              <MessageCircle className="w-5 h-5 mr-2" />
              Discuss My Renewal Options
            </Button>
          </div>

          {/* FAQ */}
          <div className="space-y-4">
            <h2 className="text-2xl font-black uppercase tracking-tighter text-white">Frequently Asked Questions</h2>
            <div className="space-y-3">
              {FAQ.map((item) => <FAQItem key={item.q} q={item.q} a={item.a} />)}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
