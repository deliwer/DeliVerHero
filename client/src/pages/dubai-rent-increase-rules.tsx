import { SEOMeta } from "@/components/seo-meta";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Link } from "wouter";
import { motion } from "framer-motion";
import { FileText, MessageCircle, ArrowRight, CheckCircle2, AlertCircle, ChevronDown, ChevronUp } from "lucide-react";
import { useState } from "react";

function FAQItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border border-white/10 rounded-2xl overflow-hidden" data-testid="faq-item">
      <button className="w-full flex items-center justify-between gap-4 px-6 py-5 text-left text-white font-bold hover:bg-white/5 transition-colors"
        onClick={() => setOpen(!open)} aria-expanded={open}>
        <span>{q}</span>
        {open ? <ChevronUp className="w-5 h-5 text-blue-400 flex-shrink-0" /> : <ChevronDown className="w-5 h-5 text-blue-400 flex-shrink-0" />}
      </button>
      {open && <div className="px-6 pb-5 text-gray-300 leading-relaxed text-sm">{a}</div>}
    </div>
  );
}

const FAQ = [
  { q: "Can my landlord increase my rent without notice?", a: "No. Under Dubai law (Law No. 26 of 2007 as amended), a landlord must give at least 90 days' written notice before the end of the tenancy period if they intend to increase the rent. If they fail to provide this notice, the increase cannot be applied in the next year." },
  { q: "What is the RERA rent index?", a: "The RERA rent index (Real Estate Regulatory Authority) is an official tool published by Dubai Land Department that shows the minimum and maximum allowable rents per area, apartment type, and building category. Landlords must use this index to calculate allowable rent increases." },
  { q: "By how much can a landlord increase rent in Dubai?", a: "The increase limit depends on how far your current rent is below the RERA index for your area. If your rent is within 10% of the market rate, no increase is allowed. Increases are capped at 5%, 10%, 15%, or 20% depending on how far below market your rent currently sits." },
  { q: "What if my landlord tries to increase rent beyond RERA limits?", a: "You can dispute the increase at the Dubai Rental Dispute Settlement Centre (RDSC). You should file a rental dispute within 30 days and present evidence including your current tenancy contract and the RERA rent index showing your area's rates. The RDSC typically rules within a few weeks." },
  { q: "Does RERA apply to all properties in Dubai?", a: "RERA rent rules apply to most residential rental properties in Dubai. Some free zones and special developments may have their own regulations. It does not apply to short-term rentals (those under 6 months registered under the holiday home licence)." },
  { q: "Can a landlord increase rent during a tenancy contract?", a: "No. A landlord cannot increase your rent during the term of a current tenancy contract. Increases can only be applied at renewal, with 90 days' written notice." },
];

export default function DubaiRentIncreaseRules() {
  const handleWhatsApp = () => {
    window.open("https://wa.me/971523906019?text=" + encodeURIComponent("Hi DeliWer — I received a rent increase notice and want to know my options. Please help."), "_blank");
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <SEOMeta
        title="Dubai Rent Increase Rules 2025 | RERA Legal Limits Explained | DeliWer"
        description="Learn the rules for rent increases in Dubai under RERA law. Understand your rights as a tenant, the legal caps on rent increases, and what to do if your landlord breaks the rules."
      />

      {/* Hero */}
      <section className="relative py-24 px-4 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-950 via-blue-950/20 to-slate-950" />
        <div className="max-w-3xl mx-auto text-center relative z-10 space-y-6">
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <Badge className="bg-blue-500/10 text-blue-400 border-blue-500/20 px-4 py-2 text-xs font-black uppercase tracking-widest rounded-full mb-4 inline-flex">
              Tenant Rights Guide
            </Badge>
            <h1 className="text-5xl md:text-6xl font-black tracking-tighter leading-[0.9] uppercase">
              Dubai Rent<br />
              <span className="text-blue-400">Increase Rules</span>
            </h1>
            <p className="text-lg text-gray-400 font-medium max-w-xl mx-auto leading-relaxed mt-4">
              Everything Dubai tenants need to know about RERA rent increase laws, legal caps, notice requirements, and your rights.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="pb-20 px-4">
        <div className="max-w-3xl mx-auto space-y-10">

          {/* RERA Cap Table */}
          <div className="bg-slate-900 border border-white/10 rounded-3xl p-8 space-y-6">
            <div className="flex items-center gap-3">
              <FileText className="w-6 h-6 text-blue-400" />
              <h2 className="text-2xl font-black uppercase tracking-tighter text-white">RERA Rent Increase Caps</h2>
            </div>
            <p className="text-gray-400 font-medium text-sm leading-relaxed">
              Under Dubai Decree No. 43 of 2013, rent increases are capped based on how far your current rent is below the RERA market rate for your area and apartment type.
            </p>
            <div className="space-y-2">
              {[
                { range: "0–10% below market", cap: "No increase allowed", color: "text-emerald-400 bg-emerald-500/10 border-emerald-500/20" },
                { range: "11–20% below market", cap: "Maximum 5% increase", color: "text-blue-400 bg-blue-500/10 border-blue-500/20" },
                { range: "21–30% below market", cap: "Maximum 10% increase", color: "text-yellow-400 bg-yellow-500/10 border-yellow-500/20" },
                { range: "31–40% below market", cap: "Maximum 15% increase", color: "text-orange-400 bg-orange-500/10 border-orange-500/20" },
                { range: "Over 40% below market", cap: "Maximum 20% increase", color: "text-red-400 bg-red-500/10 border-red-500/20" },
              ].map((row) => {
                const [text, bg, border] = row.color.split(" ");
                return (
                  <div key={row.range} className={`flex items-center justify-between p-4 rounded-2xl border ${bg} ${border}`}>
                    <span className="text-gray-300 text-sm font-medium">{row.range}</span>
                    <span className={`${text} text-sm font-black`}>{row.cap}</span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Key Rules */}
          <div className="bg-slate-900 border border-white/10 rounded-3xl p-8 space-y-6">
            <h2 className="text-2xl font-black uppercase tracking-tighter text-white">Key Rules Every Tenant Must Know</h2>
            <div className="space-y-4">
              {[
                { icon: CheckCircle2, color: "text-emerald-400", text: "Your landlord must give 90 days' written notice before the lease end if they intend to increase rent." },
                { icon: CheckCircle2, color: "text-emerald-400", text: "Rent cannot be increased during an active tenancy contract — only at renewal." },
                { icon: CheckCircle2, color: "text-emerald-400", text: "The increase must be within RERA index limits for your area, apartment type, and building grade." },
                { icon: AlertCircle, color: "text-amber-400", text: "If you don't receive 90 days' notice, the landlord cannot apply the increase for the coming year." },
                { icon: AlertCircle, color: "text-amber-400", text: "You can dispute any increase that exceeds RERA caps at the Rental Dispute Settlement Centre (RDSC)." },
                { icon: AlertCircle, color: "text-amber-400", text: "If you are unsure whether an increase is legal, check the official RERA rent index on the Dubai REST app or dubailand.gov.ae." },
              ].map(({ icon: Icon, color, text }, i) => (
                <div key={i} className="flex gap-4">
                  <Icon className={`w-5 h-5 ${color} shrink-0 mt-0.5`} />
                  <p className="text-gray-300 text-sm font-medium leading-relaxed">{text}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Step-by-step response guide */}
          <div className="bg-slate-900 border border-white/10 rounded-3xl p-8 space-y-6">
            <h2 className="text-2xl font-black uppercase tracking-tighter text-white">What To Do If You Receive a Rent Increase Notice</h2>
            <div className="space-y-4">
              {[
                { step: "1", title: "Check the notice date", body: "Confirm whether 90 days' notice was given before your lease expiry. Calculate backwards from your lease end date." },
                { step: "2", title: "Check the RERA rent index", body: "Use the Dubai REST app or visit dubailand.gov.ae to look up the current market rent for your area and apartment type." },
                { step: "3", title: "Calculate the legal cap", body: "Use our free Rent Increase Calculator to see the maximum legal increase based on the RERA index." },
                { step: "4", title: "Compare: move vs renew", body: "Use our Move vs Renew Calculator to see if moving to a cheaper apartment saves you more than staying." },
                { step: "5", title: "Negotiate or dispute", body: "If the increase exceeds the legal cap, you can negotiate with your landlord or file a complaint at the RDSC at the Dubai Courts building." },
              ].map(({ step, title, body }) => (
                <div key={step} className="flex gap-5">
                  <div className="w-9 h-9 bg-blue-500/10 rounded-full flex items-center justify-center shrink-0 font-black text-blue-400 text-sm">{step}</div>
                  <div>
                    <p className="font-black text-white text-sm">{title}</p>
                    <p className="text-gray-400 text-xs font-medium mt-1 leading-relaxed">{body}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* CTA */}
          <div className="bg-emerald-950/40 border border-emerald-500/20 rounded-3xl p-8 space-y-5 text-center">
            <h2 className="text-2xl font-black uppercase tracking-tighter text-white">Considering Moving Instead?</h2>
            <p className="text-gray-400 font-medium text-sm max-w-xl mx-auto">If your landlord's increase makes moving more attractive, DeliWer coordinates your entire relocation — movers, Ejari, DEWA, cleaning, and more.</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button data-testid="button-whatsapp" onClick={handleWhatsApp}
                className="bg-emerald-600 hover:bg-emerald-500 text-white font-black rounded-2xl px-8 h-12 text-sm shadow-xl transition-all">
                <MessageCircle className="w-4 h-4 mr-2" />Discuss My Options
              </Button>
              <Link href="/move-vs-renew-dubai">
                <Button variant="outline" className="border-white/20 text-gray-400 hover:text-white font-black rounded-2xl px-8 h-12 text-sm transition-all">
                  Run Move vs Renew Calculator <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </Link>
            </div>
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
