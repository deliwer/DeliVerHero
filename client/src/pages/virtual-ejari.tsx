import { useState } from "react";
import { motion } from "framer-motion";
import { Link } from "wouter";
import { SEOMeta } from "@/components/seo-meta";
import {
  Shield, MessageCircle, Check, Zap, ChevronDown, ChevronUp,
  FileText, Building2, ArrowRight, Clock, RefreshCw, BadgeCheck,
  Briefcase, Globe, Star,
} from "lucide-react";

// ── Constants ──────────────────────────────────────────────────────────────────

const WA_NUMBER = "971523906019";

function openWA(msg: string) {
  window.open(`https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(msg)}`, "_blank");
}

const INCLUDED = [
  { icon: "📄", text: "Ejari-registered tenancy contract (DLD system)" },
  { icon: "🏢", text: "Official Dubai address for license submission to DED / RERA / IFZA / SHAMS" },
  { icon: "✅", text: "RERA-compliant unit — approved for commercial / business address use" },
  { icon: "🔏", text: "Stamped contract + scanned digital copy delivered within 48 hrs" },
  { icon: "♻️", text: "Annual renewal reminder and renewal coordination included" },
  { icon: "📬", text: "Address confirmation letter on DeliWer letterhead (if required)" },
];

const STEPS = [
  {
    n: "01",
    icon: MessageCircle,
    title: "WhatsApp DeliWer",
    body: "Tell us your license type (DED mainland, IFZA, SHAMS, DIFC, RERA broker card…) and the licensing authority. No forms — just a message.",
    color: "emerald",
  },
  {
    n: "02",
    icon: Building2,
    title: "Unit Assignment",
    body: "We assign a DLD-enrolled, business-address-approved unit in an eligible building. We confirm the unit type is accepted by your authority.",
    color: "teal",
  },
  {
    n: "03",
    icon: FileText,
    title: "Ejari Registration",
    body: "Your Ejari contract is generated, stamped, and registered under the DLD portal through an authorised RERA Appointed Trustee Centre.",
    color: "cyan",
  },
  {
    n: "04",
    icon: BadgeCheck,
    title: "Submit & Done",
    body: "Receive your stamped Ejari contract + digital copy. Submit directly to your licensing authority. We renew it automatically each year.",
    color: "blue",
  },
];

const LICENSE_TYPES = [
  "DED Mainland Trade License",
  "IFZA Free Zone License",
  "SHAMS Sharjah License",
  "RERA Broker Card Address",
  "Dubai Freelance Permit",
  "Sole Proprietorship",
  "LLC Address Registration",
  "DET (Tourism) License",
  "DIFC / ADGM Address",
  "Dubai South License",
  "Meydan Free Zone",
  "DAFZA / JAFZA",
];

const FAQ_ITEMS = [
  {
    q: "What is a Virtual Ejari for commercial license?",
    a: "It's a real, DLD-registered Ejari tenancy contract that provides a valid Dubai address for your trade license or broker card registration — without you renting or occupying a physical office. The unit is a genuine residential or commercial unit enrolled in the DLD system; DeliWer registers the contract on your behalf through an authorised RERA Trustee Centre.",
  },
  {
    q: "Is this legal and accepted by DED / RERA / IFZA?",
    a: "Yes. Ejari contracts issued through the DLD portal are official government documents. DeliWer only uses DLD-enrolled units and registers contracts through authorised RERA-appointed Trustee Centres. However, tenants must confirm with their specific licensing authority that the unit type (residential vs commercial) satisfies their jurisdiction's requirements. Some free zones require a commercial unit; we will advise accordingly.",
  },
  {
    q: "How quickly will I receive the contract?",
    a: "In most cases within 48 business hours after we confirm the unit and you provide the required details (Emirates ID / passport copy, name, license type). Urgent same-day processing is sometimes available — ask on WhatsApp.",
  },
  {
    q: "What documents do I need to provide?",
    a: "Emirates ID or passport copy, full name as it appears on the license application, license type and issuing authority, and (if already issued) your existing license number for renewal. That's it — no tenancy contract drafting needed from your side.",
  },
  {
    q: "What does it cost?",
    a: "Virtual Ejari contracts start from AED 1,500/year. Price varies by unit type, building, and whether same-day processing is required. WhatsApp us for a firm quote — usually provided within the hour.",
  },
  {
    q: "Can I use this address for DEWA activation or residency visa?",
    a: "No. Virtual Ejari is for commercial license / business address purposes only. It does not confer residential occupancy rights and cannot be used for DEWA residential activation or visa change-of-status applications.",
  },
  {
    q: "What happens at renewal?",
    a: "DeliWer sends a reminder 60 days before expiry and coordinates the renewal automatically. You'll receive the renewed contract without having to chase us.",
  },
];

function FAQItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div
      className="border border-white/8 rounded-2xl overflow-hidden cursor-pointer"
      onClick={() => setOpen(v => !v)}
    >
      <div className="flex items-center justify-between px-5 py-4 gap-3">
        <p className="text-white font-semibold text-sm leading-snug">{q}</p>
        {open ? <ChevronUp className="w-4 h-4 text-gray-500 shrink-0" /> : <ChevronDown className="w-4 h-4 text-gray-500 shrink-0" />}
      </div>
      {open && (
        <div className="px-5 pb-5 pt-0">
          <p className="text-gray-400 text-sm leading-relaxed">{a}</p>
        </div>
      )}
    </div>
  );
}

const STEP_COLORS: Record<string, string> = {
  emerald: "border-emerald-500/30 bg-emerald-500/8 text-emerald-400",
  teal:    "border-teal-500/30 bg-teal-500/8 text-teal-400",
  cyan:    "border-cyan-500/30 bg-cyan-500/8 text-cyan-400",
  blue:    "border-blue-500/30 bg-blue-500/8 text-blue-400",
};

const STEP_NUM_COLORS: Record<string, string> = {
  emerald: "text-emerald-400 bg-emerald-500/15 border-emerald-500/30",
  teal:    "text-teal-400 bg-teal-500/15 border-teal-500/30",
  cyan:    "text-cyan-400 bg-cyan-500/15 border-cyan-500/30",
  blue:    "text-blue-400 bg-blue-500/15 border-blue-500/30",
};

// ── Page ──────────────────────────────────────────────────────────────────────

export default function VirtualEjariPage() {
  const waMsg = "Hello DeliWer 👋\n\nI need a Virtual Ejari contract for my commercial license.\n\nLicense type / authority:\nCompany / applicant name:\n\nPlease advise on availability and pricing.";

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: "Virtual Ejari for Commercial License — Dubai",
    description: "DLD-registered Ejari tenancy contract for trade license and broker card address registration in Dubai. Processed through authorised RERA Trustee Centres.",
    provider: { "@type": "LocalBusiness", name: "DeliWer", url: "https://deliwer.com" },
    areaServed: { "@type": "City", name: "Dubai" },
    offers: {
      "@type": "Offer",
      priceCurrency: "AED",
      price: "1500",
      description: "Virtual Ejari contract from AED 1,500/year",
    },
  };

  return (
    <div className="min-h-screen bg-[#060810] text-white font-sans">
      <SEOMeta
        title="Virtual Ejari Dubai — Commercial License Address | DLD Registered | DeliWer"
        description="Get a DLD-registered Ejari contract for your Dubai trade license or RERA broker card address — without renting a physical office. Processed through authorised RERA Trustee Centres. Mainland LLC, IFZA, SHAMS, freelance permits, and more."
        canonical="https://www.deliwer.com/virtual-ejari"
        keywords="virtual ejari dubai, ejari for commercial license dubai, ejari for trade license dubai, ejari for freelance permit, ejari for IFZA license, ejari for RERA broker card, DLD registered address dubai, business address dubai ejari, mainland LLC ejari dubai"
      />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* ── HERO ─────────────────────────────────────────────────────────────── */}
      <section className="relative pt-24 pb-16 px-4 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(20,184,166,0.12)_0%,transparent_60%)] pointer-events-none" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[300px] bg-teal-500/6 rounded-full blur-[120px] pointer-events-none" />

        <div className="relative max-w-4xl mx-auto text-center">
          <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="flex justify-center mb-6">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-teal-500/25 bg-teal-500/8 text-teal-400 text-xs font-semibold">
              <Shield className="w-3 h-3" />
              DLD Registered · Authorised RERA Trustee Centre
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.05 }}>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-black leading-[1.06] tracking-tight text-white mb-5">
              Virtual Ejari for<br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-400 via-cyan-400 to-blue-400">Commercial License.</span>
            </h1>
            <p className="text-gray-400 text-lg sm:text-xl max-w-2xl mx-auto leading-relaxed mb-3">
              A real DLD-registered Ejari contract for your trade license address — without renting a full office.
              Delivered within <span className="text-white font-semibold">48 hours.</span>
            </p>
            <p className="text-gray-600 text-sm mb-10">
              Mainland LLC · IFZA · SHAMS · RERA Broker Card · DED · Freelance Permit · and more
            </p>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={() => openWA(waMsg)}
              data-testid="button-virtual-ejari-hero-wa"
              className="flex items-center gap-2.5 bg-[#25D366] hover:bg-[#1fbd5a] active:scale-95 text-white font-bold px-8 py-4 rounded-2xl transition-all shadow-[0_0_30px_rgba(37,211,102,0.3)] text-base">
              <MessageCircle className="w-5 h-5" /> Get Virtual Ejari — WhatsApp
            </button>
            <div className="text-center sm:text-left">
              <p className="text-white font-semibold text-sm">From AED 1,500 / year</p>
              <p className="text-gray-600 text-xs">Renewal included · DLD portal submission handled</p>
            </div>
          </motion.div>

          {/* Trust signals */}
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}
            className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 mt-10">
            {[
              { icon: Clock, text: "48-hr delivery" },
              { icon: Shield, text: "DLD registered" },
              { icon: RefreshCw, text: "Auto-renewal" },
              { icon: Globe, text: "All Dubai zones" },
            ].map(({ icon: Icon, text }) => (
              <div key={text} className="flex items-center gap-1.5 text-xs text-gray-500">
                <Icon className="w-3.5 h-3.5 text-teal-500/70" /> {text}
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── WHO IT'S FOR ─────────────────────────────────────────────────────── */}
      <section className="max-w-5xl mx-auto px-4 py-10">
        <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
          className="bg-white/3 border border-white/8 rounded-2xl p-5 sm:p-7">
          <p className="text-white font-bold text-sm mb-4 flex items-center gap-2">
            <Briefcase className="w-4 h-4 text-teal-400" /> Accepted license types &amp; authorities
          </p>
          <div className="flex flex-wrap gap-2">
            {LICENSE_TYPES.map(t => (
              <span key={t} className="text-[11px] font-semibold text-teal-300/70 bg-teal-950/50 border border-teal-500/20 rounded-lg px-3 py-1">{t}</span>
            ))}
            <span className="text-[11px] font-semibold text-gray-600 bg-white/3 border border-white/6 rounded-lg px-3 py-1">+ others — ask on WhatsApp</span>
          </div>
        </motion.div>
      </section>

      {/* ── INCLUDED + PROCESS ──────────────────────────────────────────────── */}
      <section className="max-w-5xl mx-auto px-4 py-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">

          {/* What's included */}
          <motion.div initial={{ opacity: 0, x: -16 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}
            className="bg-white/3 border border-white/8 rounded-2xl p-6">
            <p className="text-white font-bold text-sm mb-5 flex items-center gap-2">
              <Check className="w-4 h-4 text-teal-400" /> What's Included
            </p>
            <ul className="space-y-3.5">
              {INCLUDED.map(i => (
                <li key={i.text} className="flex items-start gap-3 text-sm text-gray-400">
                  <span className="shrink-0 mt-0.5">{i.icon}</span>
                  <span>{i.text}</span>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Pricing */}
          <motion.div initial={{ opacity: 0, x: 16 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}
            className="bg-gradient-to-br from-teal-950/60 via-[#0d1117] to-[#060810] border border-teal-500/20 rounded-2xl p-6 flex flex-col">
            <p className="text-white font-bold text-sm mb-5 flex items-center gap-2">
              <Star className="w-4 h-4 text-amber-400" /> Pricing
            </p>
            <div className="space-y-4 flex-1">
              {[
                { tier: "Standard", price: "AED 1,500", note: "per year", sub: "Delivered within 48 hrs · all license types", highlight: false },
                { tier: "Express", price: "AED 2,000", note: "per year", sub: "Same-day processing · priority Trustee Centre slot", highlight: true },
                { tier: "Renewal", price: "AED 1,200", note: "per year", sub: "Existing clients · 30-day advance reminder included", highlight: false },
              ].map(p => (
                <div key={p.tier} className={`rounded-xl border p-4 ${p.highlight ? "border-teal-500/40 bg-teal-500/10" : "border-white/6 bg-white/2"}`}>
                  <div className="flex items-baseline gap-1.5 mb-0.5">
                    <span className="text-white font-black text-xl">{p.price}</span>
                    <span className="text-gray-500 text-xs">{p.note}</span>
                    {p.highlight && <span className="text-[9px] font-black uppercase tracking-widest text-teal-300 bg-teal-500/15 border border-teal-500/30 rounded-full px-2 py-0.5 ml-1">Popular</span>}
                  </div>
                  <p className="text-xs font-semibold text-gray-500">{p.tier}</p>
                  <p className="text-xs text-gray-600 mt-1">{p.sub}</p>
                </div>
              ))}
            </div>
            <button
              onClick={() => openWA(waMsg)}
              className="mt-5 flex items-center justify-center gap-2 bg-[#25D366] hover:bg-[#1fbd5a] active:scale-95 text-white font-bold px-5 py-3 rounded-xl transition-all text-sm">
              <MessageCircle className="w-4 h-4" /> Get a Quote on WhatsApp
            </button>
          </motion.div>
        </div>
      </section>

      {/* ── STEP-BY-STEP PROCESS ─────────────────────────────────────────────── */}
      <section className="max-w-5xl mx-auto px-4 py-10">
        <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
          className="text-center mb-8">
          <div className="inline-flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-teal-400 bg-teal-500/10 border border-teal-500/20 px-3 py-1 rounded-full mb-3">
            <Zap className="w-3 h-3" /> Click Flow
          </div>
          <h2 className="text-white font-black text-2xl sm:text-3xl">How It Works — 4 Steps</h2>
          <p className="text-gray-500 text-sm mt-2">From WhatsApp message to stamped Ejari contract in your inbox.</p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {STEPS.map((s, i) => {
            const Icon = s.icon;
            return (
              <motion.div key={s.n} initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.06 }}
                className={`relative border rounded-2xl p-5 ${STEP_COLORS[s.color]}`}>
                <div className="flex items-start gap-4">
                  <div className={`shrink-0 w-9 h-9 rounded-xl border flex items-center justify-center font-black text-xs ${STEP_NUM_COLORS[s.color]}`}>
                    {s.n}
                  </div>
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <Icon className="w-4 h-4 shrink-0" />
                      <p className="text-white font-bold text-sm">{s.title}</p>
                    </div>
                    <p className="text-gray-500 text-xs leading-relaxed">{s.body}</p>
                  </div>
                </div>
                {i < STEPS.length - 1 && (
                  <div className="hidden sm:block absolute -right-2.5 top-1/2 -translate-y-1/2 z-10">
                    <ArrowRight className="w-4 h-4 text-gray-700" />
                  </div>
                )}
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* ── COMMERCIAL FUNNEL CTA ─────────────────────────────────────────────── */}
      <section className="max-w-5xl mx-auto px-4 py-10">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
          className="relative overflow-hidden rounded-3xl border border-teal-500/20 bg-gradient-to-br from-teal-950/60 via-[#0d1117] to-[#060810] p-7 sm:p-10">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(20,184,166,0.08)_0%,transparent_70%)] pointer-events-none" />
          <div className="relative grid grid-cols-1 sm:grid-cols-2 gap-8 items-center">
            <div>
              <p className="text-teal-400 font-black text-xs uppercase tracking-widest mb-2">Ready to start?</p>
              <h2 className="text-white font-black text-2xl sm:text-3xl leading-tight mb-3">Get Your Virtual Ejari<br />Within 48 Hours.</h2>
              <p className="text-gray-400 text-sm leading-relaxed mb-6">
                WhatsApp us your license type and authority. We'll confirm availability, assign the unit, and deliver a DLD-stamped Ejari contract — no office visits needed.
              </p>
              <div className="space-y-2">
                {[
                  "No physical office visit required",
                  "DLD portal registration — official government document",
                  "Accepted by DED, RERA, IFZA, SHAMS & more",
                  "Auto-renewal service included",
                ].map(b => (
                  <div key={b} className="flex items-center gap-2 text-sm text-gray-400">
                    <Check className="w-3.5 h-3.5 text-teal-400 shrink-0" /> {b}
                  </div>
                ))}
              </div>
            </div>
            <div className="flex flex-col gap-3">
              <button
                data-testid="button-virtual-ejari-cta-wa"
                onClick={() => openWA(waMsg)}
                className="flex items-center justify-center gap-2.5 bg-[#25D366] hover:bg-[#1fbd5a] active:scale-95 text-white font-bold px-7 py-4 rounded-2xl transition-all shadow-[0_0_20px_rgba(37,211,102,0.25)] text-sm">
                <MessageCircle className="w-4 h-4" /> Start on WhatsApp →
              </button>
              <a
                href="https://wa.me/971523906019"
                target="_blank" rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 border border-white/10 hover:border-white/20 text-gray-400 hover:text-white font-semibold px-7 py-3.5 rounded-2xl transition-all text-sm">
                Chat with an advisor
              </a>
              <p className="text-center text-gray-700 text-xs mt-1">+971 52 394 6311 · info@deliwer.com</p>
            </div>
          </div>
        </motion.div>
      </section>

      {/* ── REGULATORY NOTICE ─────────────────────────────────────────────────── */}
      <section className="max-w-5xl mx-auto px-4 py-6">
        <div className="bg-amber-950/30 border border-amber-500/15 rounded-2xl px-5 py-4 flex items-start gap-3">
          <Shield className="w-3.5 h-3.5 text-amber-400/60 shrink-0 mt-0.5" />
          <p className="text-[10px] text-amber-200/50 leading-relaxed">
            <span className="font-black uppercase tracking-wider text-amber-300/60">Regulatory Notice · </span>
            Virtual Ejari contracts are issued under Dubai Law No. 26 of 2007. The registered address must correspond to a real, DLD-enrolled unit. DeliWer facilitates Ejari registration through authorised RERA Appointed Trustee Centres only. The contract is valid for business address purposes; it does not confer residential occupancy rights or DEWA activation eligibility. Clients must verify with their specific licensing authority (DED, RERA, IFZA, SHAMS, DIFC, ADGM) that the unit type satisfies their jurisdiction's address requirements before submission. DeliWer does not guarantee acceptance by any licensing authority and does not provide legal advice.{" "}
            <a href="https://dubailand.gov.ae/en/eservices/ejari-system/" target="_blank" rel="noopener noreferrer" className="underline underline-offset-2 hover:text-amber-300/70 transition-colors">DLD Ejari Portal ↗</a>
          </p>
        </div>
      </section>

      {/* ── FAQ ───────────────────────────────────────────────────────────────── */}
      <section className="max-w-3xl mx-auto px-4 py-14">
        <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
          className="text-center mb-8">
          <h2 className="text-white font-black text-2xl sm:text-3xl">Common Questions</h2>
          <p className="text-gray-500 text-sm mt-2">Everything businesses ask before getting started.</p>
        </motion.div>
        <div className="space-y-2">
          {FAQ_ITEMS.map((f, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 8 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.04 }}>
              <FAQItem q={f.q} a={f.a} />
            </motion.div>
          ))}
        </div>
      </section>

      {/* ── RELATED LINKS ────────────────────────────────────────────────────── */}
      <section className="max-w-5xl mx-auto px-4 pb-16">
        <div className="border-t border-white/6 pt-8 flex flex-wrap gap-3">
          <span className="text-gray-600 text-xs mr-2 mt-1">Related services:</span>
          {[
            { label: "Ejari Registration (residential)", href: "/ejari-dubai" },
            { label: "Ejari Renewal", href: "/ejari-renewal" },
            { label: "Business Setup Dubai", href: "/relocate/business-setup" },
            { label: "Flexible Rentals", href: "/flexible-rentals" },
          ].map(l => (
            <Link key={l.href} href={l.href}
              className="text-xs text-teal-400/70 hover:text-teal-300 border border-teal-500/15 hover:border-teal-500/30 rounded-full px-3 py-1 transition-colors">
              {l.label} →
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
