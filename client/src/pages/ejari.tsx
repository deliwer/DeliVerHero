import { useState, useEffect, type FormEvent } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link, useLocation } from "wouter";
import { SEOMeta } from "@/components/seo-meta";
import { Navigation } from "@/components/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import ejariVideoSrc from "@assets/Ejari-Service-Final_injaz_1772144918784.mp4";
import {
  Shield, MessageCircle, Check, Zap, ChevronDown, ChevronUp,
  FileText, Building2, ArrowRight, Clock, RefreshCw, BadgeCheck,
  Briefcase, Globe, Star, ShieldCheck, Fingerprint, ClipboardCheck,
  CheckCircle2, MessageSquare, Home, Droplets, Wind, Truck, Key,
  AlertCircle, LogOut, ArrowLeftRight, X as XIcon, Plane,
} from "lucide-react";
import { EjariFunnel, EjariScenario } from "@/components/ejari-funnel";

// ── Constants ──────────────────────────────────────────────────────────────────

const WA_NUMBER = "971523946311";

function openWA(msg: string) {
  window.open(`https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(msg)}`, "_blank");
}

// ── Business Ejari data ────────────────────────────────────────────────────────

const BIZ_INCLUDED = [
  { icon: "📄", text: "Ejari-registered tenancy contract (DLD system)" },
  { icon: "🏢", text: "Official Dubai address for license submission to DED / RERA / IFZA / SHAMS" },
  { icon: "✅", text: "RERA-compliant unit — approved for commercial / business address use" },
  { icon: "🔏", text: "Stamped contract + scanned digital copy delivered within 48 hrs" },
  { icon: "♻️", text: "Annual renewal reminder and renewal coordination included" },
  { icon: "📬", text: "Address confirmation letter on DeliWer letterhead (if required)" },
];

const BIZ_STEPS = [
  {
    n: "01", icon: MessageCircle, title: "WhatsApp DeliWer",
    body: "Tell us your license type (DED mainland, IFZA, SHAMS, DIFC, RERA broker card…) and the licensing authority. No forms — just a message.",
    color: "emerald",
  },
  {
    n: "02", icon: Building2, title: "Unit Assignment",
    body: "We assign a DLD-enrolled, business-address-approved unit in an eligible building. We confirm the unit type is accepted by your authority.",
    color: "teal",
  },
  {
    n: "03", icon: FileText, title: "Ejari Registration",
    body: "Your Ejari contract is generated, stamped, and registered under the DLD portal through an authorised RERA Appointed Trustee Centre.",
    color: "cyan",
  },
  {
    n: "04", icon: BadgeCheck, title: "Submit & Done",
    body: "Receive your stamped Ejari contract + digital copy. Submit directly to your licensing authority. We renew it automatically each year.",
    color: "blue",
  },
];

const LICENSE_TYPES = [
  "DED Mainland Trade License", "IFZA Free Zone License", "SHAMS Sharjah License",
  "RERA Broker Card Address", "Dubai Freelance Permit", "Sole Proprietorship",
  "LLC Address Registration", "DET (Tourism) License", "DIFC / ADGM Address",
  "Dubai South License", "Meydan Free Zone", "DAFZA / JAFZA",
];

const BIZ_FAQ = [
  {
    q: "What is a Business Ejari for commercial license?",
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
    a: "Business Ejari contracts start from AED 1,500/year. Price varies by unit type, building, and whether same-day processing is required. WhatsApp us for a firm quote — usually provided within the hour.",
  },
  {
    q: "Can I use this address for DEWA activation or residency visa?",
    a: "No. Business Ejari is for commercial license / business address purposes only. It does not confer residential occupancy rights and cannot be used for DEWA residential activation or visa change-of-status applications.",
  },
  {
    q: "What happens at renewal?",
    a: "DeliWer sends a reminder 60 days before expiry and coordinates the renewal automatically. You'll receive the renewed contract without having to chase us.",
  },
];

// ── Residential Ejari data ─────────────────────────────────────────────────────

const RES_FAQ = [
  {
    q: "What documents are required for Ejari registration in Dubai?",
    a: "For Ejari registration in Dubai you typically need the original tenancy contract signed by both parties, the tenant's Emirates ID, the landlord's passport copy or Emirates ID, and the title deed of the property. DeliWer helps you organize and verify all required documents before submission to an official RERA-appointed trustee center.",
  },
  {
    q: "Can Ejari registration be done at home?",
    a: "Yes. Through DeliWer's WhatsApp-first coordination service, you can submit your documents remotely. We guide you through the entire process, organize your paperwork, and coordinate with official trustee centers on your behalf — no physical office visit required.",
  },
  {
    q: "How long does Ejari registration take?",
    a: "Ejari registration typically takes 1–3 business days once all required documents are in order. DeliWer speeds up the process by reviewing your documents upfront to prevent delays or rejections at the trustee center.",
  },
  {
    q: "Do I need Ejari before activating DEWA?",
    a: "Yes. Ejari registration is mandatory before you can activate DEWA electricity and water services in Dubai. Without Ejari you cannot move into your new home legally. DeliWer helps you complete Ejari first so DEWA activation can follow immediately.",
  },
  {
    q: "Can I coordinate move-in services with Ejari registration?",
    a: "Yes. Many residents choose to coordinate their move-in preparation while registering Ejari. DeliWer's AquaCafe Move-In Welcome Service helps coordinate essential setup tasks — from DEWA guidance and water readiness to movers and air checks — so everything is ready when you receive the keys.",
  },
];

const RES_SCENARIOS = [
  { key: "register" as EjariScenario, icon: FileText, label: "Register Ejari", desc: "New tenancy contract registration", color: "emerald" },
  { key: "cancel" as EjariScenario, icon: LogOut, label: "Cancel Ejari", desc: "Terminating my tenancy contract", color: "amber" },
  { key: "move" as EjariScenario, icon: ArrowLeftRight, label: "Move to New Apartment", desc: "Cancel old, register new Ejari", color: "blue" },
  { key: "leaving" as EjariScenario, icon: XIcon, label: "Leaving Dubai", desc: "Full exit & closure coordination", color: "red" },
];

const SCENARIO_COLORS: Record<string, string> = {
  emerald: "border-emerald-500/40 hover:border-emerald-500 text-emerald-400",
  amber: "border-amber-500/40 hover:border-amber-500 text-amber-400",
  blue: "border-blue-500/40 hover:border-blue-500 text-blue-400",
  red: "border-red-500/40 hover:border-red-500 text-red-400",
};

const RES_STEPS = [
  { title: "Document Submission", description: "Upload your tenancy contract and Emirates ID via WhatsApp.", icon: ClipboardCheck },
  { title: "Coordination Review", description: "We review and organize your documents for trustee center submission.", icon: Building2 },
  { title: "Trustee Processing", description: "Official RERA trustee center processes and verifies your documents.", icon: Fingerprint },
  { title: "Ejari Registration", description: "Official Ejari certificate issued by authorized trustee center.", icon: CheckCircle2 },
];

const STEP_COLORS: Record<string, string> = {
  emerald: "border-emerald-500/30 bg-emerald-500/8 text-emerald-400",
  teal: "border-teal-500/30 bg-teal-500/8 text-teal-400",
  cyan: "border-cyan-500/30 bg-cyan-500/8 text-cyan-400",
  blue: "border-blue-500/30 bg-blue-500/8 text-blue-400",
};

const STEP_NUM_COLORS: Record<string, string> = {
  emerald: "text-emerald-400 bg-emerald-500/15 border-emerald-500/30",
  teal: "text-teal-400 bg-teal-500/15 border-teal-500/30",
  cyan: "text-cyan-400 bg-cyan-500/15 border-cyan-500/30",
  blue: "text-blue-400 bg-blue-500/15 border-blue-500/30",
};

// ── Reusable FAQ item ─────────────────────────────────────────────────────────

function FAQItem({ q, a, accent = "emerald" }: { q: string; a: string; accent?: string }) {
  const [open, setOpen] = useState(false);
  const chevronColor = accent === "teal" ? "text-teal-400" : "text-emerald-400";
  return (
    <div className="border border-white/10 rounded-2xl overflow-hidden cursor-pointer" onClick={() => setOpen(v => !v)}>
      <div className="flex items-center justify-between gap-4 px-6 py-5 text-left text-white font-bold hover:bg-white/5 transition-colors">
        <span>{q}</span>
        {open
          ? <ChevronUp className={`w-5 h-5 ${chevronColor} flex-shrink-0`} />
          : <ChevronDown className={`w-5 h-5 ${chevronColor} flex-shrink-0`} />}
      </div>
      {open && (
        <div className="px-6 pb-5 text-gray-300 leading-relaxed text-sm">{a}</div>
      )}
    </div>
  );
}

// ── Page ──────────────────────────────────────────────────────────────────────

type Tab = "business" | "residential";

export default function EjariPage() {
  const [location] = useLocation();
  const [activeTab, setActiveTab] = useState<Tab>("business");
  const [funnelOpen, setFunnelOpen] = useState(false);
  const [selectedScenario, setSelectedScenario] = useState<EjariScenario | null>(null);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (params.get("tab") === "residential") setActiveTab("residential");
    const referral = {
      partner: params.get("ref"),
      agent: params.get("agent"),
      campaign: params.get("campaign"),
      timestamp: new Date().toISOString(),
    };
    if (referral.partner && !localStorage.getItem("deliwer_ref")) {
      localStorage.setItem("deliwer_ref", JSON.stringify(referral));
    }
  }, [location]);

  const bizWaMsg = "Hello DeliWer 👋\n\nI need a Business Ejari contract for my commercial license.\n\nLicense type / authority:\nCompany / applicant name:\n\nPlease advise on availability and pricing.";

  const handleResWhatsApp = () => {
    const ref = localStorage.getItem("deliwer_ref");
    const referral = ref ? JSON.parse(ref) : {};
    const msg = `Hello DeliWer,\n\nI need Ejari Registration in Dubai.\n\nReferral Partner: ${referral.partner || "Direct"}\n\nPlease send me more information.`;
    openWA(msg);
  };

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: "Ejari Registration Dubai — Residential & Commercial | DeliWer",
    description: "DLD-registered Ejari for trade licenses, broker card addresses (commercial), and residential tenancy contracts in Dubai. Processed through authorised RERA Trustee Centres.",
    provider: { "@type": "LocalBusiness", name: "DeliWer", url: "https://deliwer.com" },
    areaServed: { "@type": "City", name: "Dubai" },
  };

  return (
    <div className="min-h-screen bg-[#060810] text-white font-sans">
      <SEOMeta
        title="Ejari Dubai — Commercial & Residential | DLD Registered | RERA Trustee | DeliWer"
        description="Business Ejari for trade license address (DED, IFZA, SHAMS, RERA broker card) and residential Ejari registration in Dubai. Processed through authorised RERA Trustee Centres. Delivered within 48 hours."
        canonical="https://www.deliwer.com/ejari"
        keywords="ejari dubai, business ejari dubai, ejari for commercial license dubai, ejari for trade license, ejari for RERA broker card, virtual ejari dubai, residential ejari dubai, DLD registered address, RERA trustee centre, ejari registration dubai, deliwer ejari"
      />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <Navigation />

      {/* ── HERO ─────────────────────────────────────────────────────────────── */}
      <section className="relative pt-28 pb-16 px-4 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(20,184,166,0.12)_0%,transparent_60%)] pointer-events-none" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[300px] bg-teal-500/6 rounded-full blur-[120px] pointer-events-none" />

        <div className="relative max-w-4xl mx-auto text-center">
          <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="flex justify-center mb-6">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-teal-500/25 bg-teal-500/8 text-teal-400 text-xs font-semibold">
              <Shield className="w-3 h-3" />
              DLD Registered · Authorised RERA Trustee Centre · Dubai
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.05 }}>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-black leading-[1.06] tracking-tight text-white mb-5">
              Ejari Registration<br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-400 via-cyan-400 to-blue-400">Dubai — Commercial & Residential.</span>
            </h1>
            <p className="text-gray-400 text-lg sm:text-xl max-w-2xl mx-auto leading-relaxed mb-8">
              One service. Two purposes. Business Ejari for trade license addresses — Residential Ejari for DEWA activation and move-in.
              Delivered within <span className="text-white font-semibold">48 hours.</span>
            </p>
          </motion.div>

          {/* ── TAB SWITCHER ── */}
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="flex justify-center mb-10">
            <div className="flex items-center gap-1 p-1 rounded-2xl border border-white/10 bg-white/3 backdrop-blur-sm">
              <button
                onClick={() => setActiveTab("business")}
                className={`flex items-center gap-2 px-6 py-3 rounded-xl font-black text-xs uppercase tracking-widest transition-all ${
                  activeTab === "business"
                    ? "bg-gradient-to-r from-teal-600 to-cyan-600 text-white shadow-lg shadow-teal-900/40"
                    : "text-gray-400 hover:text-white hover:bg-white/5"
                }`}
                data-testid="tab-business-ejari"
              >
                <Briefcase className="w-3.5 h-3.5" />
                Business Ejari
                <span className="ml-1 text-[8px] font-black uppercase tracking-widest px-1.5 py-0.5 rounded-full bg-teal-500/20 text-teal-300 border border-teal-500/30">
                  Primary
                </span>
              </button>
              <button
                onClick={() => setActiveTab("residential")}
                className={`flex items-center gap-2 px-6 py-3 rounded-xl font-black text-xs uppercase tracking-widest transition-all ${
                  activeTab === "residential"
                    ? "bg-emerald-600 text-white shadow-lg shadow-emerald-900/40"
                    : "text-gray-400 hover:text-white hover:bg-white/5"
                }`}
                data-testid="tab-residential-ejari"
              >
                <Home className="w-3.5 h-3.5" />
                Residential Ejari
              </button>
            </div>
          </motion.div>

          {/* Trust signals */}
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}
            className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 mb-4">
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

      {/* ── TAB CONTENT ──────────────────────────────────────────────────────── */}
      <AnimatePresence mode="wait">
        {activeTab === "business" ? (
          <motion.div key="business" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.25 }}>
            <BusinessEjariContent waMsg={bizWaMsg} />
          </motion.div>
        ) : (
          <motion.div key="residential" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.25 }}>
            <ResidentialEjariContent
              onWhatsApp={handleResWhatsApp}
              funnelOpen={funnelOpen}
              setFunnelOpen={setFunnelOpen}
              selectedScenario={selectedScenario}
              setSelectedScenario={setSelectedScenario}
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── SHARED REGULATORY FOOTER ──────────────────────────────────────────── */}
      <section className="max-w-5xl mx-auto px-4 py-6">
        <div className="bg-amber-950/30 border border-amber-500/15 rounded-2xl px-5 py-4 flex items-start gap-3">
          <Shield className="w-3.5 h-3.5 text-amber-400/60 shrink-0 mt-0.5" />
          <p className="text-[10px] text-amber-200/50 leading-relaxed">
            <span className="font-black uppercase tracking-wider text-amber-300/60">Regulatory Notice · </span>
            All Ejari contracts are issued under Dubai Law No. 26 of 2007. DeliWer facilitates registration through authorised RERA Appointed Trustee Centres only. Business Ejari is for commercial address / license purposes and does not confer residential occupancy rights or DEWA residential activation. Clients must verify acceptance with their specific licensing authority. DeliWer does not provide legal advice.{" "}
            <a href="https://dubailand.gov.ae/en/eservices/ejari-system/" target="_blank" rel="noopener noreferrer" className="underline underline-offset-2 hover:text-amber-300/70 transition-colors">DLD Ejari Portal ↗</a>
          </p>
        </div>
      </section>

      <div className="pb-16" />

      {/* Ejari funnel modal (residential) */}
      {funnelOpen && (
        <EjariFunnel
          isOpen={funnelOpen}
          onClose={() => setFunnelOpen(false)}
          initialScenario={selectedScenario ?? undefined}
        />
      )}
    </div>
  );
}

// ── Inline quote form ─────────────────────────────────────────────────────────

const AUTHORITIES = [
  "DED — Mainland Trade License",
  "IFZA — Free Zone",
  "SHAMS — Sharjah Free Zone",
  "RERA — Broker Card",
  "Dubai Freelance Permit",
  "DET — Tourism License",
  "DIFC / ADGM",
  "Dubai South Free Zone",
  "Meydan Free Zone",
  "DAFZA / JAFZA",
  "Other — I'll specify on WhatsApp",
];

function QuoteForm() {
  const [licenseType, setLicenseType] = useState("");
  const [authority, setAuthority] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [urgency, setUrgency] = useState<"standard" | "express">("standard");
  const [submitted, setSubmitted] = useState(false);

  const isReady = licenseType.trim().length > 0 && authority.length > 0;

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!isReady) return;
    const msg =
      `Hello DeliWer 👋\n\nI'd like a quote for a Business Ejari contract.\n\n` +
      `License type: ${licenseType}\n` +
      `Licensing authority: ${authority}\n` +
      `Company / applicant name: ${companyName || "To be confirmed"}\n` +
      `Processing: ${urgency === "express" ? "Express (same-day)" : "Standard (48 hrs)"}\n\n` +
      `Please confirm availability and pricing.`;
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000);
    openWA(msg);
  };

  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="max-w-5xl mx-auto px-4 py-6"
    >
      <div className="relative overflow-hidden rounded-3xl border border-teal-500/30 bg-gradient-to-br from-teal-950/70 via-[#0a1018] to-[#060810] p-6 sm:p-8 shadow-[0_0_60px_-20px_rgba(20,184,166,0.25)]">
        {/* glow */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,rgba(20,184,166,0.1)_0%,transparent_60%)] pointer-events-none" />

        <div className="relative">
          {/* Header */}
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-xl bg-teal-500/15 border border-teal-500/30 flex items-center justify-center shrink-0">
              <MessageCircle className="w-5 h-5 text-teal-400" />
            </div>
            <div>
              <p className="text-white font-black text-base leading-none">Get an Instant Quote</p>
              <p className="text-gray-500 text-xs mt-0.5">Fill in 3 fields — we'll reply within the hour</p>
            </div>
            <div className="ml-auto hidden sm:flex items-center gap-1.5 text-[10px] font-black uppercase tracking-widest text-teal-400 bg-teal-500/10 border border-teal-500/20 px-3 py-1.5 rounded-full">
              <span className="w-1.5 h-1.5 rounded-full bg-teal-400 animate-pulse" />
              No forms — opens WhatsApp
            </div>
          </div>

          <form onSubmit={handleSubmit} className="grid grid-cols-1 sm:grid-cols-2 gap-4">

            {/* License type */}
            <div className="flex flex-col gap-1.5">
              <label className="text-[10px] font-black uppercase tracking-widest text-gray-400">
                License Type <span className="text-teal-400">*</span>
              </label>
              <input
                type="text"
                value={licenseType}
                onChange={e => setLicenseType(e.target.value)}
                placeholder="e.g. LLC, Sole Proprietorship, Freelance Permit…"
                className="bg-white/5 border border-white/10 hover:border-teal-500/40 focus:border-teal-500/60 rounded-xl px-4 py-3 text-sm text-white placeholder:text-gray-600 outline-none transition-colors"
                data-testid="quote-license-type"
              />
            </div>

            {/* Authority */}
            <div className="flex flex-col gap-1.5">
              <label className="text-[10px] font-black uppercase tracking-widest text-gray-400">
                Licensing Authority <span className="text-teal-400">*</span>
              </label>
              <select
                value={authority}
                onChange={e => setAuthority(e.target.value)}
                className="bg-white/5 border border-white/10 hover:border-teal-500/40 focus:border-teal-500/60 rounded-xl px-4 py-3 text-sm text-white outline-none transition-colors appearance-none cursor-pointer"
                style={{ backgroundImage: "none" }}
                data-testid="quote-authority"
              >
                <option value="" disabled className="bg-slate-900 text-gray-400">Select authority…</option>
                {AUTHORITIES.map(a => (
                  <option key={a} value={a} className="bg-slate-900 text-white">{a}</option>
                ))}
              </select>
            </div>

            {/* Company name */}
            <div className="flex flex-col gap-1.5">
              <label className="text-[10px] font-black uppercase tracking-widest text-gray-400">
                Company / Applicant Name <span className="text-gray-600 font-medium normal-case tracking-normal">(optional)</span>
              </label>
              <input
                type="text"
                value={companyName}
                onChange={e => setCompanyName(e.target.value)}
                placeholder="As it will appear on the license"
                className="bg-white/5 border border-white/10 hover:border-teal-500/40 focus:border-teal-500/60 rounded-xl px-4 py-3 text-sm text-white placeholder:text-gray-600 outline-none transition-colors"
                data-testid="quote-company-name"
              />
            </div>

            {/* Urgency */}
            <div className="flex flex-col gap-1.5">
              <label className="text-[10px] font-black uppercase tracking-widest text-gray-400">Processing Speed</label>
              <div className="flex gap-2 h-[46px]">
                <button
                  type="button"
                  onClick={() => setUrgency("standard")}
                  className={`flex-1 flex items-center justify-center gap-1.5 rounded-xl border text-xs font-black uppercase tracking-widest transition-all ${
                    urgency === "standard"
                      ? "bg-teal-500/15 border-teal-500/50 text-teal-300"
                      : "bg-white/3 border-white/8 text-gray-500 hover:text-white hover:border-white/20"
                  }`}
                  data-testid="quote-urgency-standard"
                >
                  <Clock className="w-3 h-3" /> 48 hrs
                </button>
                <button
                  type="button"
                  onClick={() => setUrgency("express")}
                  className={`flex-1 flex items-center justify-center gap-1.5 rounded-xl border text-xs font-black uppercase tracking-widest transition-all ${
                    urgency === "express"
                      ? "bg-amber-500/15 border-amber-500/50 text-amber-300"
                      : "bg-white/3 border-white/8 text-gray-500 hover:text-white hover:border-white/20"
                  }`}
                  data-testid="quote-urgency-express"
                >
                  <Zap className="w-3 h-3" /> Same-day
                </button>
              </div>
            </div>

            {/* Submit */}
            <div className="sm:col-span-2">
              <button
                type="submit"
                disabled={!isReady}
                data-testid="quote-submit"
                className={`w-full flex items-center justify-center gap-2.5 font-bold px-7 py-4 rounded-2xl transition-all text-sm ${
                  submitted
                    ? "bg-emerald-600 text-white"
                    : isReady
                    ? "bg-[#25D366] hover:bg-[#1fbd5a] active:scale-[0.98] text-white shadow-[0_0_30px_rgba(37,211,102,0.3)]"
                    : "bg-white/5 text-gray-600 border border-white/8 cursor-not-allowed"
                }`}
              >
                {submitted ? (
                  <>
                    <CheckCircle2 className="w-4 h-4" /> Opening WhatsApp…
                  </>
                ) : (
                  <>
                    <MessageCircle className="w-4 h-4" />
                    {isReady ? "Get My Quote on WhatsApp →" : "Fill in license type & authority to continue"}
                  </>
                )}
              </button>
              {urgency === "express" && isReady && !submitted && (
                <p className="text-center text-amber-400/70 text-[11px] mt-2 font-semibold">
                  Express +AED 500 · Same-day Trustee Centre slot subject to availability
                </p>
              )}
            </div>
          </form>
        </div>
      </div>
    </motion.section>
  );
}

// ── Business Ejari section ────────────────────────────────────────────────────

function BusinessEjariContent({ waMsg }: { waMsg: string }) {
  return (
    <div>
      {/* Who it's for */}
      <section className="max-w-5xl mx-auto px-4 py-6">
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

      {/* Inline quote form */}
      <QuoteForm />

      {/* What's included + Pricing */}
      <section className="max-w-5xl mx-auto px-4 py-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <motion.div initial={{ opacity: 0, x: -16 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}
            className="bg-white/3 border border-white/8 rounded-2xl p-6">
            <p className="text-white font-bold text-sm mb-5 flex items-center gap-2">
              <Check className="w-4 h-4 text-teal-400" /> What's Included
            </p>
            <ul className="space-y-3.5">
              {BIZ_INCLUDED.map(i => (
                <li key={i.text} className="flex items-start gap-3 text-sm text-gray-400">
                  <span className="shrink-0 mt-0.5">{i.icon}</span>
                  <span>{i.text}</span>
                </li>
              ))}
            </ul>
          </motion.div>

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

      {/* Step-by-step */}
      <section className="max-w-5xl mx-auto px-4 py-10">
        <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-8">
          <div className="inline-flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-teal-400 bg-teal-500/10 border border-teal-500/20 px-3 py-1 rounded-full mb-3">
            <Zap className="w-3 h-3" /> Process
          </div>
          <h2 className="text-white font-black text-2xl sm:text-3xl">How It Works — 4 Steps</h2>
          <p className="text-gray-500 text-sm mt-2">From WhatsApp message to stamped Ejari contract in your inbox.</p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {BIZ_STEPS.map((s, i) => {
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
                {i < BIZ_STEPS.length - 1 && (
                  <div className="hidden sm:block absolute -right-2.5 top-1/2 -translate-y-1/2 z-10">
                    <ArrowRight className="w-4 h-4 text-gray-700" />
                  </div>
                )}
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* CTA Block */}
      <section className="max-w-5xl mx-auto px-4 py-10">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
          className="relative overflow-hidden rounded-3xl border border-teal-500/20 bg-gradient-to-br from-teal-950/60 via-[#0d1117] to-[#060810] p-7 sm:p-10">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(20,184,166,0.08)_0%,transparent_70%)] pointer-events-none" />
          <div className="relative grid grid-cols-1 sm:grid-cols-2 gap-8 items-center">
            <div>
              <p className="text-teal-400 font-black text-xs uppercase tracking-widest mb-2">Ready to start?</p>
              <h2 className="text-white font-black text-2xl sm:text-3xl leading-tight mb-3">Get Your Business Ejari<br />Within 48 Hours.</h2>
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
                data-testid="button-biz-ejari-cta-wa"
                onClick={() => openWA(waMsg)}
                className="flex items-center justify-center gap-2.5 bg-[#25D366] hover:bg-[#1fbd5a] active:scale-95 text-white font-bold px-7 py-4 rounded-2xl transition-all shadow-[0_0_20px_rgba(37,211,102,0.25)] text-sm">
                <MessageCircle className="w-4 h-4" /> Start on WhatsApp →
              </button>
              <a
                href="https://wa.me/971523946311"
                target="_blank" rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 border border-white/10 hover:border-white/20 text-gray-400 hover:text-white font-semibold px-7 py-3.5 rounded-2xl transition-all text-sm">
                Chat with an advisor
              </a>
              <p className="text-center text-gray-700 text-xs mt-1">+971 52 394 6311 · info@deliwer.com</p>
            </div>
          </div>
        </motion.div>
      </section>

      {/* Business Ejari FAQ */}
      <section className="max-w-3xl mx-auto px-4 py-10">
        <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-8">
          <h2 className="text-white font-black text-2xl sm:text-3xl">Common Questions</h2>
          <p className="text-gray-500 text-sm mt-2">Everything businesses ask before getting started.</p>
        </motion.div>
        <div className="space-y-2">
          {BIZ_FAQ.map((f, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 8 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.04 }}>
              <FAQItem q={f.q} a={f.a} accent="teal" />
            </motion.div>
          ))}
        </div>
      </section>

      {/* Related links */}
      <section className="max-w-5xl mx-auto px-4 pb-10">
        <div className="border-t border-white/6 pt-8 flex flex-wrap gap-3">
          <span className="text-gray-600 text-xs mr-2 mt-1">Related services:</span>
          {[
            { label: "Ejari Renewal", href: "/ejari-renewal" },
            { label: "Flex Living Rentals", href: "/flexible-rentals" },
            { label: "Move-In Coordination", href: "/relocate" },
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

// ── Residential Ejari section ─────────────────────────────────────────────────

function ResidentialEjariContent({
  onWhatsApp,
  funnelOpen,
  setFunnelOpen,
  selectedScenario,
  setSelectedScenario,
}: {
  onWhatsApp: () => void;
  funnelOpen: boolean;
  setFunnelOpen: (v: boolean) => void;
  selectedScenario: EjariScenario | null;
  setSelectedScenario: (v: EjariScenario | null) => void;
}) {
  return (
    <div>
      {/* Scenario selector */}
      <section className="max-w-4xl mx-auto px-4 py-6">
        <p className="text-center text-[11px] text-gray-500 font-black uppercase tracking-widest mb-5">What do you need help with?</p>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {RES_SCENARIOS.map(s => {
            const Icon = s.icon;
            const isSelected = selectedScenario === s.key;
            return (
              <button
                key={s.key}
                data-testid={`hero-scenario-${s.key}`}
                onClick={() => { setSelectedScenario(s.key); setFunnelOpen(true); }}
                className={`flex flex-col items-center gap-2 p-4 rounded-2xl border-2 bg-slate-900 transition-all text-center cursor-pointer ${
                  isSelected ? `border-${s.color}-500 bg-${s.color}-500/10` : `${SCENARIO_COLORS[s.color]} hover:bg-slate-800`
                }`}
              >
                <div className="w-10 h-10 rounded-xl bg-slate-800 flex items-center justify-center">
                  <Icon className={`w-5 h-5 ${SCENARIO_COLORS[s.color].split(" ")[2]}`} />
                </div>
                <div>
                  <div className="font-black text-xs uppercase tracking-tight text-white leading-tight">{s.label}</div>
                  <div className="text-[10px] text-gray-500 font-medium mt-0.5">{s.desc}</div>
                </div>
              </button>
            );
          })}
        </div>

        <div className="flex flex-col sm:flex-row gap-3 mt-6 justify-center">
          <Button
            size="lg"
            className="bg-emerald-600 hover:bg-emerald-500 font-black h-14 px-10 rounded-2xl text-base shadow-xl shadow-emerald-900/30"
            onClick={() => { setSelectedScenario(null); setFunnelOpen(true); }}
            data-testid="button-ejari-start-setup"
          >
            <MessageSquare className="w-5 h-5 mr-2" />
            Start Ejari Setup
          </Button>
          <Button size="lg" variant="outline"
            className="border-emerald-500/40 text-emerald-400 hover:bg-emerald-500/10 font-black h-14 px-10 rounded-2xl text-base"
            onClick={onWhatsApp}>
            <MessageCircle className="w-5 h-5 mr-2" />
            WhatsApp Us
          </Button>
        </div>
        <p className="text-center text-sm text-gray-500 mt-3">Response within 10 minutes · AED 220 government fee</p>
      </section>

      {/* Problem → Solution */}
      <section className="max-w-4xl mx-auto px-4 py-4">
        <div className="grid md:grid-cols-2 gap-4">
          <div className="flex items-start gap-4 bg-red-500/10 border border-red-500/30 rounded-2xl p-5">
            <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-sm font-black text-white mb-1">The problem:</p>
              <p className="text-sm text-gray-300 leading-relaxed">Without Ejari you <span className="text-red-400 font-black">cannot activate DEWA</span> — and without DEWA you <span className="text-red-400 font-black">cannot move in legally</span>.</p>
            </div>
          </div>
          <div className="flex items-start gap-4 bg-emerald-500/10 border border-emerald-500/30 rounded-2xl p-5">
            <CheckCircle2 className="w-5 h-5 text-emerald-500 flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-sm font-black text-white mb-1">Our solution:</p>
              <p className="text-sm text-gray-300 leading-relaxed">DeliWer <span className="text-emerald-400 font-black">handles the full process via WhatsApp</span> — Ejari, DEWA guidance, and move-in coordination in one place.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Steps */}
      <section className="max-w-5xl mx-auto px-4 py-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {RES_STEPS.map((step, idx) => (
            <motion.div key={idx} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: idx * 0.1 }} viewport={{ once: true }}>
              <Card className="bg-white/5 border-white/10 h-full hover:border-emerald-500/50 transition-colors">
                <CardHeader>
                  <div className="w-12 h-12 rounded-xl bg-emerald-500/20 flex items-center justify-center mb-4">
                    <step.icon className="w-6 h-6 text-emerald-400" />
                  </div>
                  <CardTitle className="text-xl font-bold text-white">{step.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-400 leading-relaxed">{step.description}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Move-in cross-sell */}
      <section className="py-5 px-4 bg-emerald-950/50 border-y border-emerald-500/20">
        <div className="max-w-5xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center shrink-0">
              <Plane className="w-5 h-5 text-emerald-400" />
            </div>
            <div>
              <p className="font-black text-white text-sm uppercase tracking-tight">Moving to Dubai?</p>
              <p className="text-emerald-400/80 text-xs font-semibold mt-0.5">Ejari + DEWA + movers + home setup — all coordinated in one WhatsApp thread</p>
            </div>
          </div>
          <Link href="/relocate">
            <Button className="bg-emerald-600 hover:bg-emerald-500 font-black text-sm rounded-xl px-6 h-10 whitespace-nowrap shrink-0 gap-2" data-testid="cta-ejari-movein-crosssell">
              <Key className="w-4 h-4" /> Move-In Coordination <ArrowRight className="w-4 h-4" />
            </Button>
          </Link>
        </div>
      </section>

      {/* Residential FAQ */}
      <section className="max-w-3xl mx-auto px-4 py-10">
        <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-8">
          <h2 className="text-white font-black text-2xl sm:text-3xl">Residential Ejari FAQ</h2>
        </motion.div>
        <div className="space-y-2">
          {RES_FAQ.map((f, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 8 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.04 }}>
              <FAQItem q={f.q} a={f.a} accent="emerald" />
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );
}
