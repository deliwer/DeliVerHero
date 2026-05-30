import { useState, useRef } from "react";
import { Link } from "wouter";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { Helmet } from "react-helmet";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  ChevronDown, MessageSquare, CheckCircle2, ArrowRight, Building2,
  Plane, MapPin, Globe, Shield, Users, DollarSign, Clock, Home,
  Briefcase, FileText, Zap, Star, Crown, Heart, Phone, Mail,
} from "lucide-react";

// ─── Shared helpers ──────────────────────────────────────────────────────────

function FadeUp({ children, delay = 0, className = "" }: { children: React.ReactNode; delay?: number; className?: string }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });
  return (
    <motion.div ref={ref} initial={{ opacity: 0, y: 22 }} animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, ease: "easeOut", delay }} className={className}>
      {children}
    </motion.div>
  );
}

function FAQItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border-b border-white/8 last:border-0">
      <button onClick={() => setOpen(o => !o)}
        className="w-full flex items-start justify-between gap-4 py-4 text-left group"
        data-testid={`faq-${q.slice(0, 20).replace(/\s+/g, "-").toLowerCase()}`}>
        <span className="font-semibold text-white/85 text-sm leading-snug group-hover:text-white transition-colors">{q}</span>
        <ChevronDown className={`w-4 h-4 text-white/30 shrink-0 mt-0.5 transition-transform duration-200 ${open ? "rotate-180" : ""}`} />
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.22 }}
            className="overflow-hidden">
            <p className="text-sm text-white/50 leading-relaxed pb-5 pr-6">{a}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// ─── Data ────────────────────────────────────────────────────────────────────

const FAQS = [
  { q: "How do I move to Dubai as an expat in 2026?", a: "To move to Dubai: (1) Secure a job offer, investor visa, or self-sponsorship route. (2) Find a property on Bayut or Property Finder. (3) Sign a tenancy contract. (4) Register Ejari (mandatory tenancy registration via RERA Trustee Centres — AED 320 via DeliWer). (5) Activate DEWA (electricity and water). (6) Set up internet (eand or du). DeliWer coordinates steps 4–6 via WhatsApp, often completing them on the same day." },
  { q: "What is the cheapest way to rent in Dubai without an annual contract?", a: "DeliWer's Flex Living service offers monthly rooms in shared villas, private rooms, studios, and bed spaces from AED 550/month with no annual contract. Areas with the lowest prices include International City, Muhaisnah, Al Qusais, and Discovery Gardens. Jumeirah Village Circle (JVC) offers good value with strong amenities." },
  { q: "How much does it cost to live in Dubai per month in 2026?", a: "Single expat budget: AED 5,000–8,000/month (shared accommodation, public transport). Comfortable single: AED 8,000–15,000/month (private studio, car). Family: AED 15,000–35,000/month (2-3BR apartment, school fees, car). Income is 0% taxed. No VAT on rent. Cost of living is high but predictable — key savings come from avoiding annual rent traps by using flexible monthly options." },
  { q: "Do I need Ejari to live in Dubai?", a: "Yes. Ejari is mandatory for all rental contracts in Dubai under UAE law. Without Ejari, you cannot activate DEWA, get a Dubai address for official purposes, apply for a residence visa, or access many government services. Ejari must be registered at a RERA-authorized Trustee Centre. DeliWer handles this for AED 320 inclusive (government fee + coordination)." },
  { q: "How long does DEWA activation take?", a: "DEWA (Dubai Electricity and Water Authority) activation typically takes 1–3 business days after submitting required documents. Required: valid Ejari certificate, Emirates ID or passport, DEWA account number. DeliWer handles same-day DEWA activation coordination when documents are complete." },
  { q: "What visa do I need to live in Dubai?", a: "Common options: (1) Employment visa — sponsored by UAE employer. (2) Investor/partner visa — requires Free Zone or mainland company. (3) Golden Visa — 10-year residency for investors, exceptional talents, graduates. (4) Freelancer visa — via specific Free Zones (e.g., Dubai Media City, TECOM). (5) Retirement visa — for those 55+ with property or savings. DeliWer's relocation concierge can connect you with RERA-licensed business setup partners." },
  { q: "Which area of Dubai is best for expats?", a: "JVC (Jumeirah Village Circle): best value for money, newer buildings, strong community. Dubai Marina: waterfront, premium lifestyle, walkable. Business Bay / Downtown: central, DIFC access. JLT (Jumeirah Lake Towers): metro-accessible, lively. Al Barsha: mid-range, near Mall of the Emirates. International City: most affordable. For families: Dubai Hills Estate, Arabian Ranches, Mirdif." },
  { q: "Is it easy to move to Dubai from the UK?", a: "Yes — UAE has no formal immigration quota. UK nationals enter visa-free for 180 days and can convert to residence visa after securing employment or company registration. DeliWer can coordinate the full arrival package: Ejari, DEWA, movers, and cleaning from the day you sign your tenancy contract." },
  { q: "Can I move to Dubai from Pakistan?", a: "Yes. Pakistani nationals are one of Dubai's largest expat communities (~1.2M residents). Employment visas are the most common route. Pakistani passport holders receive UAE work/residence visas when sponsored by a UAE employer or via a Free Zone company. DeliWer serves the Pakistani community extensively across all Dubai areas." },
  { q: "What is a Dubai Golden Visa and how do I get one?", a: "The UAE Golden Visa grants 5 or 10-year renewable residency. Eligibility: property investment of AED 2M+; startup founders approved by an accredited UAE incubator; exceptional scientific, athletic, or cultural talent; graduates with GPA 3.75+ from accredited universities. DeliWer's relocation team can connect you with certified Golden Visa application support." },
  { q: "How much does Ejari registration cost in Dubai?", a: "AED 220 is the government fee. DeliWer charges AED 320 inclusive — this covers the government fee, typing centre coordination, document preparation, and submission. The certificate is typically issued within 1–3 business days. Same-day processing is possible when documents are complete." },
  { q: "Can I rent a room in Dubai month by month?", a: "Yes. DeliWer's Flex Living service offers rooms in Dubai on monthly basis with no annual contract required. Options include: private rooms in shared villas (AED 2,500–4,500/month), partition rooms (AED 550–1,500/month), bed spaces (AED 400–800/month), and studios (AED 3,500–6,000/month). All bills can be included." },
  { q: "How do I set up a company in Dubai as an expat?", a: "Two main routes: (1) Free Zone company — 100% foreign ownership, no UAE partner required, takes 2–7 days, costs AED 12,000–25,000/year. Best for service businesses, freelancers, digital companies. (2) Mainland company — requires UAE national partner or agent for certain activities. More flexibility for Dubai market access. DeliWer coordinates Free Zone setups across DAFZA, DIFC, DMCC, and 30+ other zones." },
  { q: "What is the Dubai move-in process step by step?", a: "Step 1: Sign tenancy contract (landlord provides). Step 2: Register Ejari at RERA Trustee Centre or via DeliWer (AED 320). Step 3: Apply for DEWA connection using Ejari number. Step 4: Book professional cleaning (move-in clean). Step 5: Arrange movers. Step 6: Set up internet (eand/du). Step 7: Register your address for Emirates ID. DeliWer bundles steps 2–6 into one WhatsApp-coordinated package." },
  { q: "What areas does DeliWer cover?", a: "DeliWer covers all 55+ Dubai areas including: JVC, Dubai Marina, Business Bay, Downtown Dubai, Al Barsha, Deira, Bur Dubai, JLT, International City, Discovery Gardens, Jumeirah, Al Nahda, Al Furjan, Mirdif, Dubai Silicon Oasis, Palm Jumeirah, Dubai Hills Estate, Arabian Ranches, DAMAC Hills, Motor City, Sports City, Al Quoz, Al Wasl, Al Satwa, Karama, Jumeirah Beach Residence (JBR), DIFC, and more." },
  { q: "How do I leave Dubai (move out)?", a: "Key steps: (1) Give notice to landlord (30–90 days as per contract). (2) Cancel Ejari. (3) Final DEWA reading and security deposit return. (4) Professional move-out cleaning. (5) Cancel UAE services (bank, phone, etc.). (6) Return visa/Emirates ID. DeliWer's Move-Out Concierge coordinates steps 2–4 and can advise on the full exit checklist." },
  { q: "Is Dubai safe for expats?", a: "Dubai consistently ranks as one of the world's safest cities. UAE crime rate is among the lowest globally. Political stability, strong rule of law, and active policing contribute. The Numbeo Safety Index consistently places Dubai in the top 5–10 globally. For regional emergency preparedness, DeliWer's Emergency Exit planning service is available at deliwer.com/wartime-readiness." },
  { q: "How do I travel to Dubai by private jet?", a: "DeliWer partners with 1FLT for private jet arrivals into Dubai (DXB, DWC, or Sharjah). The unique service: your Ejari, DEWA, and apartment move-in are coordinated to complete before you land, so you walk into a live home the same day. WhatsApp +971523906019 or visit deliwer.com/private-jet for same-day arrival packages." },
  { q: "What internet providers are available in Dubai?", a: "Dubai has two licensed internet providers: eand (formerly Etisalat) and du. Both offer fibre-to-home packages from AED 299/month. Home internet setup requires an Ejari certificate and Emirates ID. DeliWer can book the installation appointment and coordinate the signup process as part of the move-in package." },
  { q: "Can I bring my belongings to Dubai from abroad?", a: "Yes. Household goods can be shipped by sea (most cost-effective for full containers) or by air (faster, higher cost). Customs clearance requires your UAE residence visa and a packing list. DeliWer coordinates inbound relocation cargo for clients arriving from the UK, Pakistan, India, Russia, and other countries via its ChainTrack logistics network." },
];

const AREAS = [
  { a: "Jumeirah Village Circle", rent: "AED 4,500–9,000/mo", vibe: "Value · Community", transport: "Car / Bus" },
  { a: "Dubai Marina",            rent: "AED 7,000–18,000/mo", vibe: "Premium · Waterfront", transport: "Metro · Walk" },
  { a: "Business Bay",           rent: "AED 6,000–14,000/mo", vibe: "Central · Corporate", transport: "Metro" },
  { a: "Jumeirah Lake Towers",   rent: "AED 5,500–11,000/mo", vibe: "Lively · Metro access", transport: "Metro" },
  { a: "Al Barsha",              rent: "AED 4,000–8,500/mo",  vibe: "Mid-range · Practical", transport: "Metro · Bus" },
  { a: "International City",     rent: "AED 1,200–3,500/mo",  vibe: "Budget · Diverse", transport: "Bus" },
  { a: "Dubai Hills Estate",     rent: "AED 8,000–22,000/mo", vibe: "Family · Green", transport: "Car" },
  { a: "Al Nahda",               rent: "AED 3,000–6,000/mo",  vibe: "Affordable · Bustling", transport: "Metro" },
];

const WA = "https://wa.me/971523906019?text=Dubai%20Relocation%20Enquiry";

const SCHEMA = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Article",
      "@id": "https://www.deliwer.com/dubai-relocation-guide#article",
      "headline": "The Complete Dubai Relocation Guide 2026 — Ejari, DEWA, Visas & Everything Else",
      "description": "The definitive guide to relocating to Dubai in 2026. Covers visa options, Ejari registration, DEWA activation, best areas, cost of living, monthly accommodation, and how to move in same-day.",
      "author": { "@type": "Organization", "name": "DeliWer", "url": "https://www.deliwer.com" },
      "publisher": { "@type": "Organization", "name": "DeliWer", "logo": { "@type": "ImageObject", "url": "https://www.deliwer.com/deliwer-logo.png" } },
      "datePublished": "2026-05-25",
      "dateModified": "2026-05-25",
      "mainEntityOfPage": "https://www.deliwer.com/dubai-relocation-guide",
      "inLanguage": "en-AE",
      "keywords": "Dubai relocation guide, move to Dubai, Ejari registration, DEWA activation, Dubai expat guide 2026, Dubai visa, Dubai rent guide, Dubai areas guide"
    },
    {
      "@type": "HowTo",
      "name": "How to Move to Dubai Step by Step",
      "description": "Complete step-by-step guide to relocating to Dubai as an expat in 2026",
      "totalTime": "P14D",
      "estimatedCost": { "@type": "MonetaryAmount", "currency": "AED", "value": "320" },
      "step": [
        { "@type": "HowToStep", "position": 1, "name": "Secure a UAE Visa", "text": "Apply for a UAE employment visa, investor visa, freelancer permit, or Golden Visa. Employment visas are sponsored by a UAE employer. Self-sponsorship options include Free Zone companies." },
        { "@type": "HowToStep", "position": 2, "name": "Find a Property", "text": "Search Bayut, Property Finder, or Dubizzle for apartments or rooms in Dubai. For monthly (no-contract) options, use DeliWer's Flex Living service." },
        { "@type": "HowToStep", "position": 3, "name": "Sign the Tenancy Contract", "text": "Sign the RERA-compliant tenancy contract with your landlord. Keep the original — it is required for Ejari registration." },
        { "@type": "HowToStep", "position": 4, "name": "Register Ejari", "text": "Register your tenancy contract at a RERA-authorized Trustee Centre. Required by UAE law. Cost: AED 320 via DeliWer (includes government fee). Time: 1–3 business days." },
        { "@type": "HowToStep", "position": 5, "name": "Activate DEWA", "text": "Apply for DEWA (Dubai Electricity and Water Authority) connection using your Ejari number. Activation takes 1–3 business days. DeliWer coordinates on your behalf." },
        { "@type": "HowToStep", "position": 6, "name": "Set Up Internet", "text": "Choose between eand (Etisalat) or du for home fibre. Plans from AED 299/month. Requires Ejari and Emirates ID. DeliWer books the appointment." },
        { "@type": "HowToStep", "position": 7, "name": "Move In", "text": "Arrange professional move-in cleaning and movers. DeliWer provides vetted moving teams and deep cleaning services. You're home." },
      ]
    },
    {
      "@type": "FAQPage",
      "mainEntity": FAQS.map(f => ({
        "@type": "Question",
        "name": f.q,
        "acceptedAnswer": { "@type": "Answer", "text": f.a }
      }))
    }
  ]
};

// ─── Page ────────────────────────────────────────────────────────────────────

export default function DubaiRelocationGuide() {
  return (
    <div className="min-h-screen bg-slate-950 text-white" style={{ fontFamily: "'Inter','DM Sans',sans-serif" }}>
      <Helmet>
        <title>Complete Dubai Relocation Guide 2026 — Ejari, DEWA, Visas & Move-In | DeliWer</title>
        <meta name="description" content="The definitive Dubai relocation guide for expats in 2026. How to register Ejari (AED 320), activate DEWA, get a UAE visa, find monthly rooms, and move in same-day. All coordinated via WhatsApp by DeliWer." />
        <meta name="keywords" content="Dubai relocation guide 2026, move to Dubai expat, how to move to Dubai, Ejari registration Dubai, DEWA activation Dubai, Dubai visa guide, Dubai rent guide, Dubai areas for expats, monthly rooms Dubai, Dubai cost of living 2026, move to Dubai from UK, move to Dubai from Pakistan, Dubai Golden Visa" />
        <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1" />
        <link rel="canonical" href="https://www.deliwer.com/dubai-relocation-guide" />
        <meta property="og:title" content="Complete Dubai Relocation Guide 2026 — DeliWer" />
        <meta property="og:description" content="How to move to Dubai: Ejari, DEWA, visa, areas, costs, monthly rooms — all in one guide. Coordinated via WhatsApp." />
        <meta property="og:type" content="article" />
        <meta property="og:url" content="https://www.deliwer.com/dubai-relocation-guide" />
        <meta property="og:image" content="https://www.deliwer.com/deliwer-og-image.png" />
        <meta property="og:site_name" content="DeliWer" />
        <meta property="og:locale" content="en_AE" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Complete Dubai Relocation Guide 2026 — DeliWer" />
        <meta name="twitter:description" content="Ejari, DEWA, visas, areas, cost of living — the definitive Dubai expat guide." />
        <meta name="geo.region" content="AE-DU" />
        <meta name="geo.placename" content="Dubai, United Arab Emirates" />
        <meta name="geo.position" content="25.2048;55.2708" />
        <meta name="ICBM" content="25.2048, 55.2708" />
        <script type="application/ld+json">{JSON.stringify(SCHEMA)}</script>
      </Helmet>

      {/* Hero */}
      <section className="relative pt-28 pb-16 px-6 overflow-hidden border-b border-white/6">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_40%_at_50%_0%,rgba(16,185,129,0.07),transparent)]" />
        <div className="max-w-5xl mx-auto relative z-10">
          <motion.div initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.55 }}>
            <div className="flex flex-wrap gap-2 mb-5">
              <Badge className="bg-emerald-500/15 text-emerald-300 border-emerald-500/25 text-xs font-bold px-3 py-1">
                <MapPin className="w-3 h-3 mr-1" /> Dubai, UAE
              </Badge>
              <Badge className="bg-white/6 text-white/50 border-white/10 text-xs font-bold px-3 py-1">Updated May 2026</Badge>
              <Badge className="bg-white/6 text-white/50 border-white/10 text-xs font-bold px-3 py-1">20 FAQs · Step-by-Step Guide</Badge>
            </div>
            <h1 className="text-4xl md:text-6xl font-black leading-[1.06] tracking-tight mb-5">
              The Complete Dubai<br />
              <span className="text-emerald-400">Relocation Guide 2026</span>
            </h1>
            <p className="text-lg text-white/50 max-w-2xl mb-8 leading-relaxed">
              Everything you need to move to Dubai — from visa options to Ejari registration, DEWA activation, best areas, cost of living, and same-day move-in coordination. Written by DeliWer, Dubai's move-in concierge platform.
            </p>
            <div className="flex flex-col sm:flex-row gap-3">
              <a href={WA} target="_blank" rel="noopener noreferrer">
                <Button size="lg" className="bg-emerald-600 hover:bg-emerald-500 text-white font-bold px-8 gap-2 h-12">
                  <MessageSquare className="w-5 h-5" /> Start My Move-In (WhatsApp)
                </Button>
              </a>
              <Link href="/relocate">
                <Button size="lg" variant="outline" className="border-white/12 text-white/60 hover:bg-white/4 px-8 gap-2 h-12">
                  View All Services <ArrowRight className="w-4 h-4" />
                </Button>
              </Link>
            </div>
          </motion.div>

          {/* Quick stats */}
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4, duration: 0.5 }}
            className="mt-12 pt-10 border-t border-white/6 grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { v: "3.5M+", l: "Expats in Dubai" },
              { v: "180+",  l: "Nationalities living here" },
              { v: "0%",    l: "Personal income tax" },
              { v: "1 Day", l: "Ejari + DEWA via DeliWer" },
            ].map(s => (
              <div key={s.l}>
                <p className="text-2xl md:text-3xl font-black text-emerald-400">{s.v}</p>
                <p className="text-xs text-white/30 mt-1">{s.l}</p>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Why Dubai */}
      <section className="py-16 px-6 border-b border-white/6">
        <div className="max-w-5xl mx-auto">
          <FadeUp className="mb-8">
            <h2 className="text-2xl md:text-3xl font-black text-white mb-2">Why Dubai?</h2>
            <p className="text-white/40 text-sm">The world's most popular expat destination for six consecutive years</p>
          </FadeUp>
          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4">
            {[
              { icon: DollarSign, t: "Zero Income Tax",       d: "No personal income tax, no VAT on residential rent. Your salary stays yours.", c: "text-emerald-400 bg-emerald-500/10" },
              { icon: Globe,      t: "Gateway to 3 Continents", d: "Dubai is within 8 hours of 2/3 of the world's population. Emirates hub.", c: "text-sky-400 bg-sky-500/10" },
              { icon: Shield,     t: "World's Safest City",    d: "Consistently top 5 globally in safety indices. Strong rule of law.", c: "text-violet-400 bg-violet-500/10" },
              { icon: Briefcase,  t: "Free Zone Economy",      d: "100% foreign ownership in 30+ Free Zones. Business setup in 2–7 days.", c: "text-amber-400 bg-amber-500/10" },
              { icon: Heart,      t: "World-Class Healthcare", d: "JCI-accredited hospitals. Dubai Health Authority regulated. MOHAP system.", c: "text-rose-400 bg-rose-500/10" },
              { icon: Users,      t: "180+ Nationalities",     d: "The world's most multicultural city. Every community, every cuisine, every network.", c: "text-emerald-400 bg-emerald-500/10" },
            ].map(r => (
              <FadeUp key={r.t} delay={0.05}>
                <div className="border border-white/8 bg-white/2 rounded-2xl p-5 flex gap-4">
                  <div className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 ${r.c}`}>
                    <r.icon className="w-4.5 h-4.5" />
                  </div>
                  <div>
                    <p className="font-bold text-white text-sm mb-1">{r.t}</p>
                    <p className="text-xs text-white/40 leading-relaxed">{r.d}</p>
                  </div>
                </div>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      {/* Step-by-step guide */}
      <section className="py-16 px-6 border-b border-white/6 bg-white/[0.015]">
        <div className="max-w-5xl mx-auto">
          <FadeUp className="mb-10">
            <Badge className="bg-emerald-500/15 text-emerald-400 border-emerald-500/25 mb-4 gap-1.5">
              <FileText className="w-3.5 h-3.5" /> Step-by-Step Guide
            </Badge>
            <h2 className="text-2xl md:text-3xl font-black text-white mb-2">How to Move to Dubai — Every Step</h2>
            <p className="text-white/35 text-sm">From visa application to your first night in your new home</p>
          </FadeUp>
          <div className="max-w-3xl">
            {[
              { n: "01", t: "Secure a UAE Visa",           d: "Employment (employer-sponsored), Investor/Partner (Free Zone or mainland company), Golden Visa (AED 2M+ property or exceptional talent), Freelancer (TECOM, DMC, others). Timeline: 5–30 days depending on visa type.", icon: FileText, who: "Your employer / business setup agent" },
              { n: "02", t: "Find Your Property",          d: "Search Bayut, Property Finder, or Dubizzle. For no-contract monthly rooms, use DeliWer Flex Living (from AED 550/month). Annual leases: cheques paid in advance (1–4 cheques typical).", icon: Home, who: "Yourself or a RERA-licensed agent" },
              { n: "03", t: "Sign Tenancy Contract",       d: "Landlord provides RERA-compliant contract. Read it carefully — notice period, maintenance obligations, renewal terms. You'll need the original for Ejari.", icon: FileText, who: "Landlord + you" },
              { n: "04", t: "Register Ejari",              d: "Mandatory under UAE law. Register at a RERA Trustee Centre or via DeliWer (AED 320 inclusive). Documents: tenancy contract, Emirates ID/passport, landlord ID, title deed. Time: 1–3 days.", icon: Building2, who: "DeliWer (AED 320) or Trustee Centre" },
              { n: "05", t: "Activate DEWA",               d: "Apply online or via DeliWer using your Ejari number. Security deposit: AED 1,000–4,000 (refundable). Activation: 1–3 business days. Includes electricity and water.", icon: Zap, who: "DeliWer (coordinated)" },
              { n: "06", t: "Set Up Internet",             d: "Choose eand (Etisalat) or du. Fibre from AED 299/month. Booking requires Ejari + Emirates ID. DeliWer books installation appointments. Time: 3–7 days.", icon: Globe, who: "DeliWer (coordinated)" },
              { n: "07", t: "Move In",                     d: "Professional deep-clean before moving furniture. Vetted movers for packing and transport. DeliWer provides both. Can be coordinated for same day as DEWA activation.", icon: Home, who: "DeliWer movers + cleaners" },
            ].map((s, i) => (
              <FadeUp key={s.n} delay={i * 0.06}>
                <div className="flex gap-5 mb-0">
                  <div className="flex flex-col items-center shrink-0">
                    <div className="w-9 h-9 rounded-xl bg-emerald-500/15 border border-emerald-500/25 flex items-center justify-center">
                      <s.icon className="w-4 h-4 text-emerald-400" />
                    </div>
                    {i < 6 && <div className="w-0.5 flex-1 min-h-[28px] my-1 bg-white/8" />}
                  </div>
                  <div className="pb-7 flex-1">
                    <div className="flex flex-wrap items-center gap-2 mb-1">
                      <span className="text-[10px] font-black text-white/20 uppercase tracking-widest">{s.n}</span>
                      <h3 className="font-bold text-white text-sm">{s.t}</h3>
                    </div>
                    <p className="text-xs text-white/45 leading-relaxed mb-1.5">{s.d}</p>
                    <p className="text-[10px] text-emerald-400/60 font-semibold">Handled by: {s.who}</p>
                  </div>
                </div>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      {/* Areas Guide */}
      <section className="py-16 px-6 border-b border-white/6">
        <div className="max-w-5xl mx-auto">
          <FadeUp className="mb-8">
            <h2 className="text-2xl md:text-3xl font-black text-white mb-2">Dubai Areas Guide</h2>
            <p className="text-white/35 text-sm">Key neighbourhoods with average 1BR apartment rents (May 2026)</p>
          </FadeUp>
          <FadeUp>
            <div className="rounded-2xl border border-white/8 overflow-hidden">
              <div className="grid grid-cols-4 px-5 py-3 bg-white/4 border-b border-white/8">
                {["Area", "1BR Rent", "Vibe", "Transport"].map(h => (
                  <span key={h} className="text-[10px] font-black uppercase tracking-widest text-white/30">{h}</span>
                ))}
              </div>
              {AREAS.map((a, i) => (
                <div key={a.a} className={`grid grid-cols-4 px-5 py-3.5 items-center ${i % 2 === 0 ? "" : "bg-white/[0.015]"} border-b border-white/5 last:border-0`}>
                  <span className="text-sm font-semibold text-white">{a.a}</span>
                  <span className="text-xs text-emerald-400 font-bold">{a.rent}</span>
                  <span className="text-xs text-white/40">{a.vibe}</span>
                  <span className="text-xs text-white/30">{a.transport}</span>
                </div>
              ))}
            </div>
            <p className="text-xs text-white/20 mt-2 pl-1">Indicative market rates — contact DeliWer for live listings</p>
          </FadeUp>
        </div>
      </section>

      {/* Cost of living */}
      <section className="py-16 px-6 border-b border-white/6 bg-white/[0.015]">
        <div className="max-w-5xl mx-auto">
          <FadeUp className="mb-8">
            <h2 className="text-2xl md:text-3xl font-black text-white mb-2">Cost of Living in Dubai 2026</h2>
          </FadeUp>
          <div className="grid md:grid-cols-3 gap-4">
            {[
              { type: "Single (Budget)", range: "AED 5,000–8,000/mo", items: ["Shared room/partition: AED 1,500", "Food & groceries: AED 800", "Transport (RTA): AED 300", "Phone & internet: AED 200", "Entertainment: AED 500"], color: "border-sky-500/25 bg-sky-500/5" },
              { type: "Single (Comfortable)", range: "AED 8,000–15,000/mo", items: ["Private studio: AED 4,500–6,000", "Car (fuel + insurance): AED 1,500", "Dining out 3x/week: AED 1,200", "Gym & wellness: AED 300", "Savings buffer: AED 2,000+"], color: "border-emerald-500/25 bg-emerald-500/5" },
              { type: "Family (2 adults, 1 child)", range: "AED 18,000–35,000/mo", items: ["2–3BR apartment: AED 8,000–15,000", "Private school: AED 3,000–8,000", "Car + running: AED 2,500", "Groceries & dining: AED 3,000", "Insurance & leisure: AED 2,000"], color: "border-amber-500/25 bg-amber-500/5" },
            ].map(b => (
              <FadeUp key={b.type} delay={0.06}>
                <div className={`border ${b.color} rounded-2xl p-6 h-full`}>
                  <p className="text-[10px] font-black uppercase tracking-widest text-white/30 mb-1">{b.type}</p>
                  <p className="text-xl font-black text-white mb-4">{b.range}</p>
                  <ul className="space-y-2">
                    {b.items.map(item => (
                      <li key={item} className="flex items-start gap-2 text-xs text-white/50">
                        <CheckCircle2 className="w-3.5 h-3.5 text-white/20 shrink-0 mt-0.5" />{item}
                      </li>
                    ))}
                  </ul>
                </div>
              </FadeUp>
            ))}
          </div>
          <FadeUp className="mt-6">
            <div className="border border-white/6 rounded-2xl p-5 bg-white/2">
              <p className="text-xs text-white/40 leading-relaxed">
                <strong className="text-white/70">Key saving tips:</strong> Use RTA metro/bus (AED 4–8/trip vs AED 25–50 taxi). Buy from Carrefour, LuLu Hypermarket, or Al Maya. Use Flex Living for flexible monthly rooms without annual contract lock-in. Get free trade zone licence for business to claim company perks.
              </p>
            </div>
          </FadeUp>
        </div>
      </section>

      {/* Private Jet crosslink */}
      <section className="py-12 px-6 border-b border-white/6">
        <div className="max-w-5xl mx-auto">
          <FadeUp>
            <div className="rounded-2xl border border-amber-500/25 bg-amber-950/20 p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-5">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-amber-500/15 flex items-center justify-center shrink-0">
                  <Crown className="w-5 h-5 text-amber-400" />
                </div>
                <div>
                  <Badge className="bg-amber-500/15 text-amber-300 border-amber-500/25 text-[10px] mb-1.5">DeliWer × 1FLT</Badge>
                  <h3 className="font-bold text-white text-sm mb-1">Arriving by Private Jet?</h3>
                  <p className="text-xs text-white/45 leading-relaxed max-w-md">
                    Land in Dubai and walk into a live apartment — Ejari registered, DEWA on, cleaning done — before you clear customs. DeliWer and 1FLT synchronise your arrival and move-in into one seamless experience.
                  </p>
                </div>
              </div>
              <Link href="/private-jet" className="shrink-0">
                <Button className="bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold gap-2 whitespace-nowrap">
                  Private Jet Arrival <ArrowRight className="w-4 h-4" />
                </Button>
              </Link>
            </div>
          </FadeUp>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16 px-6 border-b border-white/6">
        <div className="max-w-3xl mx-auto">
          <FadeUp className="mb-8">
            <Badge className="bg-white/8 text-white/50 border-white/10 mb-4">20 Frequently Asked Questions</Badge>
            <h2 className="text-2xl md:text-3xl font-black text-white mb-2">Dubai Relocation FAQs</h2>
            <p className="text-white/35 text-sm">Every question answered — optimised for AI search and Google featured snippets</p>
          </FadeUp>
          <FadeUp>
            <div className="border border-white/8 rounded-2xl px-5 bg-white/2">
              {FAQS.map(f => <FAQItem key={f.q} q={f.q} a={f.a} />)}
            </div>
          </FadeUp>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-16 px-6">
        <div className="max-w-2xl mx-auto text-center">
          <FadeUp>
            <div className="w-12 h-12 rounded-2xl bg-emerald-500/12 border border-emerald-500/20 flex items-center justify-center mx-auto mb-5">
              <Home className="w-6 h-6 text-emerald-400" />
            </div>
            <h2 className="text-2xl md:text-3xl font-black text-white mb-3">Ready to Move In?</h2>
            <p className="text-white/40 mb-6 text-sm leading-relaxed max-w-md mx-auto">
              WhatsApp DeliWer with your move-in date and property address. We handle Ejari, DEWA, cleaning, movers, and internet — often same-day.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center mb-5">
              <a href={WA} target="_blank" rel="noopener noreferrer">
                <Button size="lg" className="bg-[#25D366] hover:bg-[#20bd5a] text-white font-bold px-8 gap-2 h-12 w-full sm:w-auto">
                  <MessageSquare className="w-5 h-5" /> WhatsApp Now
                </Button>
              </a>
              <a href="mailto:info@deliwer.com">
                <Button size="lg" variant="outline" className="border-white/12 text-white/55 hover:bg-white/4 px-8 h-12 w-full sm:w-auto">
                  info@deliwer.com
                </Button>
              </a>
            </div>
            <div className="flex flex-wrap justify-center gap-4 text-xs text-white/20">
              {["Ejari AED 320", "DEWA Activation", "Monthly Rooms from AED 550", "Movers Dubai", "Move-Out Concierge"].map(t => (
                <span key={t} className="flex items-center gap-1.5">
                  <span className="w-1 h-1 rounded-full bg-white/15" />{t}
                </span>
              ))}
            </div>
          </FadeUp>
        </div>
      </section>
    </div>
  );
}
