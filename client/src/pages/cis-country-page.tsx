import { motion } from "framer-motion";
import { Link } from "wouter";
import { Helmet } from "react-helmet";
import {
  Plane, Package, Shield, Zap, ArrowRight, CheckCircle2,
  MapPin, TrendingUp, Globe, ExternalLink,
} from "lucide-react";
import { SiWhatsapp, SiTelegram } from "react-icons/si";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import heroPhoneImg from "@assets/Hero_iPhone_1755786821791.avif";

const WA_NUMBER = "971523906019";
const WA_BASE = `https://wa.me/${WA_NUMBER}`;
const WA_COMMUNITY = "https://chat.whatsapp.com/LpJQy8fjkvlKmkt03tgZgG";
const TELEGRAM_CHANNEL = "https://t.me/chaintracklogistics";

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
};
const stagger = { visible: { transition: { staggerChildren: 0.09 } } };

function Sec({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0 }} variants={stagger} className={className}>
      {children}
    </motion.div>
  );
}
function Item({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return <motion.div variants={fadeUp} className={className}>{children}</motion.div>;
}

export interface CountryStat {
  value: string;
  label: string;
  color: string;
}

export interface CountryFAQ {
  question: string;
  answer: string;
}

export interface CountryPageConfig {
  country: string;
  flag: string;
  capital: string;
  airport: string;
  airportCode: string;
  slug: string;
  currency: string;
  region: string;
  transitTime: string;
  tagline: string;
  heroDesc: string;
  stats: CountryStat[];
  highlights: { icon: React.ElementType; title: string; desc: string }[];
  faqs: CountryFAQ[];
  seoTitle: string;
  seoDesc: string;
  seoKeywords: string;
  canonical: string;
  customNote?: string;
}

export default function CisCountryPage({ config }: { config: CountryPageConfig }) {
  const waMsg = encodeURIComponent(
    `Dubai Electronics Inquiry — ${config.country}\n\nI'm looking to source refurbished iPhones / electronics from Dubai to ${config.country}.\n\nPlease share available lots.`
  );

  const faqSchema = JSON.stringify({
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: config.faqs.map((f) => ({
      "@type": "Question",
      name: f.question,
      acceptedAnswer: { "@type": "Answer", text: f.answer },
    })),
  });

  const serviceSchema = JSON.stringify({
    "@context": "https://schema.org",
    "@type": "Service",
    name: `ChainTrack Electronics Supply — Dubai to ${config.country}`,
    provider: {
      "@type": "Organization",
      name: "DeliWer",
      url: "https://www.deliwer.com",
      contactPoint: {
        "@type": "ContactPoint",
        telephone: "+971523906019",
        contactType: "customer support",
        availableLanguage: ["English", "Russian", "Arabic"],
      },
    },
    serviceType: "Wholesale Electronics Sourcing & Air Cargo",
    areaServed: [{ "@type": "Country", name: config.country }],
    description: config.seoDesc,
    url: config.canonical,
  });

  return (
    <div className="min-h-screen bg-slate-950 text-white overflow-x-hidden">
      <Helmet>
        <title>{config.seoTitle}</title>
        <meta name="description" content={config.seoDesc} />
        <meta name="keywords" content={config.seoKeywords} />
        <meta property="og:title" content={config.seoTitle} />
        <meta property="og:description" content={config.seoDesc} />
        <meta property="og:url" content={config.canonical} />
        <meta property="og:type" content="website" />
        <link rel="canonical" href={config.canonical} />
        <meta name="robots" content="index, follow" />
        <script type="application/ld+json">{faqSchema}</script>
        <script type="application/ld+json">{serviceSchema}</script>
      </Helmet>

      {/* ── Hero ── */}
      <section className="relative overflow-hidden min-h-[480px] flex items-center">
        <div className="absolute inset-0">
          <img src={heroPhoneImg} alt="" className="w-full h-full object-cover opacity-[0.05]" />
          <div className="absolute inset-0 bg-gradient-to-b from-slate-950/80 via-slate-950/90 to-slate-950" />
        </div>
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(0,209,255,0.06),transparent_60%)]" />

        <div className="relative container mx-auto px-4 py-16 max-w-6xl">
          <Sec>
            <Item>
              <div className="flex items-center gap-2 mb-4">
                <Link href="/cis-electronics">
                  <span className="text-xs font-bold uppercase tracking-widest text-sky-400 hover:text-sky-300 cursor-pointer flex items-center gap-1">
                    ← CIS Electronics
                  </span>
                </Link>
                <span className="text-slate-600">·</span>
                <Badge variant="outline" className="border-slate-700 text-slate-400 text-[10px]">
                  {config.flag} {config.region}
                </Badge>
              </div>
            </Item>

            <Item>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black leading-none mb-4">
                <span className="text-white">Dubai iPhones</span>
                <br />
                <span className="text-sky-400">→ {config.flag} {config.country}</span>
              </h1>
            </Item>

            <Item>
              <p className="text-slate-300 text-lg max-w-2xl mb-2">{config.heroDesc}</p>
              {config.customNote && (
                <p className="text-emerald-400 text-sm font-semibold mb-6">{config.customNote}</p>
              )}
            </Item>

            <Item>
              <div className="flex items-center gap-2 text-sm text-slate-400 mb-8">
                <MapPin className="w-4 h-4 text-sky-400 shrink-0" />
                <span>Dubai DXB / DWC → {config.airport} ({config.airportCode})</span>
                <span className="text-slate-600">·</span>
                <Plane className="w-4 h-4 text-sky-400 shrink-0" />
                <span>{config.transitTime} air transit</span>
              </div>
            </Item>

            <Item className="flex flex-wrap gap-3">
              <a href={`${WA_BASE}?text=${waMsg}`} target="_blank" rel="noopener noreferrer">
                <Button className="bg-emerald-500 hover:bg-emerald-400 text-black font-black uppercase tracking-widest text-xs gap-2">
                  <SiWhatsapp className="w-4 h-4" />
                  WhatsApp Us
                </Button>
              </a>
              <a href={WA_COMMUNITY} target="_blank" rel="noopener noreferrer">
                <Button variant="outline" className="border-emerald-500/40 text-emerald-300 hover:bg-emerald-500/10 font-bold uppercase tracking-widest text-xs gap-2">
                  <SiWhatsapp className="w-4 h-4" />
                  {config.flag} Buyers Community
                </Button>
              </a>
              <a href={TELEGRAM_CHANNEL} target="_blank" rel="noopener noreferrer">
                <Button variant="ghost" className="text-sky-400 hover:text-sky-300 hover:bg-sky-500/10 font-bold uppercase tracking-widest text-xs gap-2">
                  <SiTelegram className="w-4 h-4" />
                  Telegram
                </Button>
              </a>
            </Item>
          </Sec>
        </div>
      </section>

      {/* ── Stats ── */}
      <section className="border-t border-slate-800/60 bg-slate-900/40 py-10">
        <div className="container mx-auto px-4 max-w-6xl">
          <Sec className="grid grid-cols-2 sm:grid-cols-4 gap-6">
            {config.stats.map((s, i) => (
              <Item key={i} className="text-center">
                <div className={`text-3xl font-black mb-1 ${s.color}`}>{s.value}</div>
                <div className="text-[11px] text-slate-400 uppercase tracking-wider leading-snug">{s.label}</div>
              </Item>
            ))}
          </Sec>
        </div>
      </section>

      {/* ── Why Dubai → Country ── */}
      <section className="py-16 border-t border-slate-800/60">
        <div className="container mx-auto px-4 max-w-6xl">
          <Sec>
            <Item className="mb-10">
              <h2 className="text-2xl sm:text-3xl font-black mb-2">
                Why Source from Dubai to {config.flag} {config.country}?
              </h2>
              <p className="text-slate-400 text-sm">
                Dubai is one of the world's top 3 electronics re-export hubs. ChainTrack connects {config.country} buyers directly to Grade A/B refurbished iPhone supply — with DAFZA escrow, remote inspection, and air cargo coordination.
              </p>
            </Item>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {config.highlights.map((h, i) => (
                <Item key={i} className="rounded-xl bg-slate-900 border border-slate-800 p-5">
                  <h.icon className="w-5 h-5 text-sky-400 mb-3" />
                  <div className="font-bold text-sm mb-1">{h.title}</div>
                  <div className="text-slate-400 text-xs leading-relaxed">{h.desc}</div>
                </Item>
              ))}
            </div>
          </Sec>
        </div>
      </section>

      {/* ── Process ── */}
      <section className="py-14 border-t border-slate-800/60 bg-slate-900/30">
        <div className="container mx-auto px-4 max-w-6xl">
          <Sec>
            <Item className="mb-8">
              <h2 className="text-2xl font-black mb-1">How It Works</h2>
              <p className="text-slate-400 text-sm">Dubai → {config.country} in 4 steps</p>
            </Item>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {[
                { n: "01", title: "Submit Requirement", desc: "Tell us the model, grade, quantity via WhatsApp or the CIS Electronics form." },
                { n: "02", title: "Supplier Bids", desc: "Verified Dubai suppliers compete in reverse auction — you see all offers." },
                { n: "03", title: "DAFZA Escrow", desc: "Funds held securely by DAFZA until inspection confirms grading." },
                { n: "04", title: `Air Cargo to ${config.airportCode}`, desc: `Express freight to ${config.airport}. Average ${config.transitTime} door-to-airport.` },
              ].map((step) => (
                <Item key={step.n} className="rounded-xl border border-slate-800 bg-slate-900 p-5">
                  <div className="text-sky-400 font-black text-xs mb-2 uppercase tracking-widest">{step.n}</div>
                  <div className="font-bold text-sm mb-1">{step.title}</div>
                  <div className="text-slate-400 text-xs leading-relaxed">{step.desc}</div>
                </Item>
              ))}
            </div>
          </Sec>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section className="py-14 border-t border-slate-800/60">
        <div className="container mx-auto px-4 max-w-4xl">
          <Sec>
            <Item className="mb-8">
              <h2 className="text-2xl font-black mb-1">
                Frequently Asked — Dubai iPhones to {config.flag} {config.country}
              </h2>
            </Item>
            <div className="space-y-4">
              {config.faqs.map((faq, i) => (
                <Item key={i} className="rounded-xl border border-slate-800 bg-slate-900 p-5">
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="w-4 h-4 text-sky-400 mt-0.5 shrink-0" />
                    <div>
                      <div className="font-bold text-sm mb-1.5">{faq.question}</div>
                      <div className="text-slate-400 text-xs leading-relaxed">{faq.answer}</div>
                    </div>
                  </div>
                </Item>
              ))}
            </div>
          </Sec>
        </div>
      </section>

      {/* ── Community CTA ── */}
      <section className="py-14 border-t border-slate-800/60 bg-emerald-950/20">
        <div className="container mx-auto px-4 max-w-4xl text-center">
          <Sec>
            <Item>
              <div className="text-4xl mb-3">{config.flag}</div>
              <h2 className="text-2xl font-black mb-2">
                {config.country} Buyers — Join the Community
              </h2>
              <p className="text-slate-400 text-sm mb-6 max-w-xl mx-auto">
                Connect with verified {config.country} importers and resellers sourcing iPhones from Dubai. Live lot alerts, group pricing, and peer intelligence — free to join.
              </p>
            </Item>
            <Item className="flex flex-col sm:flex-row gap-3 justify-center">
              <a href={WA_COMMUNITY} target="_blank" rel="noopener noreferrer">
                <Button className="bg-emerald-500 hover:bg-emerald-400 text-black font-black uppercase tracking-widest gap-2">
                  <SiWhatsapp className="w-4 h-4" />
                  Join {config.country} Buyers Community
                </Button>
              </a>
              <a href={TELEGRAM_CHANNEL} target="_blank" rel="noopener noreferrer">
                <Button variant="outline" className="border-sky-500/40 text-sky-300 hover:bg-sky-500/10 font-bold uppercase tracking-widest gap-2">
                  <SiTelegram className="w-4 h-4" />
                  Telegram Channel
                </Button>
              </a>
            </Item>
            <Item className="mt-6">
              <Link href="/cis-electronics">
                <span className="text-sky-400 hover:text-sky-300 text-xs font-bold uppercase tracking-widest cursor-pointer flex items-center gap-1 justify-center">
                  View All CIS Markets <ArrowRight className="w-3 h-3" />
                </span>
              </Link>
            </Item>
          </Sec>
        </div>
      </section>
    </div>
  );
}
