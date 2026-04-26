import { SEOMeta } from "@/components/seo-meta";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Building2, Shield, TrendingUp, Globe, CheckCircle2, ArrowRight,
  Briefcase, FileText, Zap, Star, Users, DollarSign, Lock, Award,
  Plane, Package, Truck
} from "lucide-react";
import { SiWhatsapp } from "react-icons/si";
import heroBg from "@assets/stock_images/dubai_skyline_modern_806b4a5e.jpg";
import dubaiCorpBg from "@assets/stock_images/dubai_business_corpo_60a4c0bf.jpg";

const WHATSAPP = "https://wa.me/971523946311?text=Business%20Setup%20%26%20Visa%20enquiry%20%E2%80%93%20I%27d%20like%20to%20learn%20more";

const freezones = [
  {
    icon: Plane,
    name: "DAFZA",
    full: "Dubai Airport Freezone Authority",
    airport: "Dubai International Airport (DXB)",
    tag: "Most Connected Freezone in the World",
    color: "from-sky-900/40 to-slate-800/60",
    border: "border-sky-500/30",
    accent: "text-sky-400",
    highlights: [
      "Direct airport access — goods clear customs in hours, not days",
      "160,000+ flights per year through DXB — your supply chain never sleeps",
      "100% foreign ownership with zero corporate tax on qualifying income",
      "On-site warehousing, office suites, and logistics hubs",
      "Ideal for aviation, pharma, electronics, and high-value trade",
    ],
    stat: "1,700+",
    statLabel: "Companies in DAFZA",
  },
  {
    icon: Truck,
    name: "Dubai South",
    full: "Dubai South Free Zone",
    airport: "Al Maktoum International Airport (DWC)",
    tag: "The World's Largest Airport — Under Construction",
    color: "from-emerald-900/40 to-slate-800/60",
    border: "border-emerald-500/30",
    accent: "text-emerald-400",
    highlights: [
      "Al Maktoum International will handle 260M passengers/year at full capacity",
      "Direct link to Expo City Dubai — a permanent global business district",
      "Integrated with Jebel Ali Port via dedicated freight corridors",
      "Warehousing from 500 sqm to 50,000+ sqm available now",
      "Best for e-commerce, manufacturing, aerospace, and logistics",
    ],
    stat: "145 km²",
    statLabel: "Total Master Plan Area",
  },
  {
    icon: Package,
    name: "Commercity",
    full: "Dubai Commercity",
    airport: "Al Maktoum International Airport (DWC)",
    tag: "MENA's First Dedicated E-Commerce Freezone",
    color: "from-violet-900/40 to-slate-800/60",
    border: "border-violet-500/30",
    accent: "text-violet-400",
    highlights: [
      "Purpose-built for digital commerce, fulfilment, and cross-border trade",
      "Integrated fulfilment centres with last-mile delivery infrastructure",
      "Next to Al Maktoum Airport — fastest air cargo in the region",
      "Plug-and-play warehousing, offices, and retail showroom units",
      "Ideal for brands selling across GCC, South Asia, and East Africa",
    ],
    stat: "30 km²",
    statLabel: "Dedicated E-Commerce Zone",
  },
];

const services = [
  {
    icon: Building2,
    title: "Free Zone Company Formation",
    desc: "100% foreign ownership. DAFZA, Dubai South, Commercity, DMCC, IFZA, DIFC and more — we match you to the right zone.",
  },
  {
    icon: FileText,
    title: "Mainland Trade Licence",
    desc: "Trade anywhere in the UAE with a mainland licence. Full local market access without a local sponsor.",
  },
  {
    icon: Globe,
    title: "Investor & Golden Visa",
    desc: "Secure long-term UAE residency. 5-year and 10-year options for founders, investors, and skilled professionals.",
  },
  {
    icon: Users,
    title: "Visa Packages for Teams",
    desc: "Employment visas, family sponsorship, and PRO services bundled so you can onboard your whole team fast.",
  },
  {
    icon: Briefcase,
    title: "Bank Account Opening",
    desc: "Introductions to UAE banks and digital neo-banks. We guide you through the documentation maze.",
  },
  {
    icon: Zap,
    title: "Fast-Track Setup",
    desc: "From application to active trade licence in as little as 5–7 working days with our concierge pathway.",
  },
];

const taxBenefits = [
  { label: "0%", detail: "Personal income tax — keep every dirham you earn" },
  { label: "9%", detail: "Corporate tax only on profits above AED 375,000 — the rest is tax-free" },
  { label: "0%", detail: "Capital gains tax on investments and asset sales" },
  { label: "0%", detail: "Inheritance or wealth tax — full asset protection" },
  { label: "100%", detail: "Profit repatriation — move money home with no restrictions" },
  { label: "200+", detail: "Double Tax Treaty countries protecting your global income" },
];

const advantages = [
  "Strategic position between Europe, Asia, and Africa",
  "World-class logistics hub — Jebel Ali is the largest port in the region",
  "Stable AED pegged to USD since 1997 — zero currency risk",
  "Zero restrictions on foreign exchange",
  "Digital-first government — licence renewals, visas, and permits online",
  "Over 45 free zones each tailored to an industry",
  "Strong rule of law with DIFC and ADGM international courts",
  "No minimum capital requirement in most free zones",
];

const warContext = [
  {
    icon: Shield,
    title: "Safe Haven — Redefined",
    desc: "While regional conflict unsettles neighbouring economies, Dubai's political neutrality and security partnerships keep business uninterrupted. 75+ global airlines still fly daily.",
  },
  {
    icon: Lock,
    title: "Asset Protection",
    desc: "Dubai's legal system separates personal assets from business liabilities. Free Zone entities add offshore-style protections with full foreign ownership.",
  },
  {
    icon: TrendingUp,
    title: "Inflow of Capital & Talent",
    desc: "Every global crisis accelerates Dubai's growth. Capital and talent fleeing instability lands here. The economy grew 3.4% in 2024 with record FDI.",
  },
  {
    icon: Award,
    title: "Upcoming Incentives (2025–2027)",
    desc: "The UAE's 'We the UAE 2031' vision commits AED 600 billion in GDP target. New digital economy licences and R&D grants are rolling out for early movers.",
  },
];

const steps = [
  { step: "01", title: "Free Consultation", desc: "Tell us your business model. We recommend the right structure and zone in 24 hours." },
  { step: "02", title: "Document Prep", desc: "We collect and verify your documents. Passport, proof of address, business plan — we handle the checklist." },
  { step: "03", title: "Licence Issued", desc: "Your trade licence is issued. Bank account and visa applications follow in parallel." },
  { step: "04", title: "Open for Business", desc: "You're live. Hire staff, sign contracts, and start trading — all fully compliant." },
];

export default function SetupPage() {
  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <SEOMeta
        title="Dubai Business Setup & Free Zone Company Formation"
        description="Set up your company in a Dubai Free Zone in as little as 7 days. DAFZA, Dubai South, and Commercity licences — zero tax, 100% ownership, visa sponsorship. DeliWer handles everything."
        canonical="https://www.deliwer.com/setup"
        keywords="Dubai business setup, free zone Dubai, DAFZA setup, Dubai South free zone, Commercity Dubai, company formation UAE, 100% foreign ownership UAE, zero tax Dubai, Dubai trade licence, Dubai investor visa, Golden Visa UAE, LLC mainland Dubai, UAE business registration"
      />

      {/* ── HERO with image background ── */}
      <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
        {/* Background image */}
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url(${heroBg})` }}
        />
        {/* Dark gradient overlays */}
        <div className="absolute inset-0 bg-gradient-to-b from-slate-950/70 via-slate-950/50 to-slate-950" />
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950/60 via-transparent to-slate-950/60" />
        <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-slate-950 to-transparent" />

        {/* Content */}
        <div className="relative z-10 max-w-5xl mx-auto px-4 text-center pt-32 pb-24">
          <Badge className="mb-6 bg-emerald-500/15 text-emerald-400 border border-emerald-500/30 text-xs font-bold uppercase tracking-widest px-4 py-2 backdrop-blur-sm">
            Dubai Business Setup &amp; Visa Services
          </Badge>
          <h1 className="text-5xl md:text-7xl font-black uppercase tracking-tight leading-none mb-6 drop-shadow-2xl">
            Build Your Base <br />
            <span className="text-emerald-400">In Center of the World</span><br />
            Safest Business Hub
          </h1>
          <p className="text-xl text-gray-200 max-w-2xl mx-auto mb-4 drop-shadow-lg">
            While instability reshapes the region, Dubai doubles down on business. Zero income tax, full foreign ownership, and a legal system built for global entrepreneurs.
          </p>
          <p className="text-base text-gray-300 max-w-xl mx-auto mb-10 drop-shadow">
            Free Zone · Mainland · Golden Visa · Bank Account — everything set up for you, fast.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button
              size="lg"
              className="bg-emerald-500 hover:bg-emerald-400 text-black font-black uppercase tracking-widest text-sm px-10 py-6 rounded-2xl flex items-center gap-2 shadow-xl shadow-emerald-500/30"
              onClick={() => window.open(WHATSAPP, "_blank")}
              data-testid="button-cta-whatsapp-hero"
            >
              <SiWhatsapp className="w-5 h-5" />
              Start Your Setup — WhatsApp
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-white/30 bg-white/5 backdrop-blur-sm text-white hover:bg-white/15 font-bold uppercase tracking-widest text-sm px-10 py-6 rounded-2xl"
              onClick={() => document.getElementById("freezones")?.scrollIntoView({ behavior: "smooth" })}
              data-testid="button-cta-explore"
            >
              View Airport Free Zones <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </div>
          <p className="text-xs text-gray-400 mt-6">No upfront fees until you're ready. Free consultation always.</p>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-50">
          <div className="w-px h-10 bg-gradient-to-b from-transparent to-emerald-400" />
        </div>
      </section>

      {/* ── AIRPORT FREE ZONES SPOTLIGHT ── */}
      <section id="freezones" className="py-24 px-4 relative">
        {/* Subtle background image */}
        <div
          className="absolute inset-0 bg-cover bg-center opacity-5"
          style={{ backgroundImage: `url(${dubaiCorpBg})` }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-slate-950 via-slate-950/95 to-slate-950" />

        <div className="relative max-w-6xl mx-auto">
          <div className="text-center mb-14">
            <Badge className="mb-4 bg-sky-500/10 text-sky-400 border border-sky-500/20 text-xs font-bold uppercase tracking-widest px-4 py-2">
              Premium Airport Free Zones
            </Badge>
            <h2 className="text-3xl md:text-5xl font-black uppercase tracking-tight mb-5">
              Built Around Dubai's <span className="text-sky-400">Two Airports</span>
            </h2>
            <p className="text-gray-400 max-w-3xl mx-auto text-lg leading-relaxed">
              DAFZA, Dubai South, and Commercity are purpose-built around Dubai International and Al Maktoum airports — giving your business direct access to 90M+ annual passengers, instant air freight, and the most globally connected supply chain on earth.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {freezones.map((fz) => (
              <div
                key={fz.name}
                className={`relative bg-gradient-to-br ${fz.color} border ${fz.border} rounded-3xl overflow-hidden group hover:scale-[1.02] transition-transform duration-300`}
                data-testid={`card-freezone-${fz.name.toLowerCase().replace(/\s/g, "-")}`}
              >
                {/* Header */}
                <div className="p-6 border-b border-white/10">
                  <div className={`w-12 h-12 rounded-2xl bg-white/10 flex items-center justify-center mb-4`}>
                    <fz.icon className={`w-6 h-6 ${fz.accent}`} />
                  </div>
                  <div className={`text-xs font-black uppercase tracking-widest ${fz.accent} mb-1`}>{fz.name}</div>
                  <h3 className="text-white font-black text-xl leading-tight mb-1">{fz.full}</h3>
                  <div className="flex items-center gap-2 text-gray-400 text-xs mb-3">
                    <Plane className="w-3 h-3" />
                    {fz.airport}
                  </div>
                  <Badge className={`bg-white/5 border border-white/10 text-gray-300 text-[10px] font-bold uppercase tracking-wider px-3 py-1`}>
                    {fz.tag}
                  </Badge>
                </div>

                {/* Stat */}
                <div className="px-6 py-4 border-b border-white/10 flex items-baseline gap-3">
                  <div className={`text-3xl font-black ${fz.accent}`}>{fz.stat}</div>
                  <div className="text-gray-400 text-xs uppercase tracking-wider">{fz.statLabel}</div>
                </div>

                {/* Highlights */}
                <div className="p-6 space-y-3">
                  {fz.highlights.map((h) => (
                    <div key={h} className="flex items-start gap-2">
                      <CheckCircle2 className={`w-4 h-4 ${fz.accent} shrink-0 mt-0.5`} />
                      <p className="text-gray-300 text-sm leading-snug">{h}</p>
                    </div>
                  ))}
                </div>

                {/* CTA */}
                <div className="px-6 pb-6">
                  <Button
                    className={`w-full font-black uppercase tracking-widest text-xs py-5 rounded-xl bg-white/10 hover:bg-white/20 text-white border border-white/10 transition-colors`}
                    onClick={() => window.open(WHATSAPP, "_blank")}
                    data-testid={`button-freezone-cta-${fz.name.toLowerCase()}`}
                  >
                    <SiWhatsapp className="w-4 h-4 mr-2" />
                    Set Up in {fz.name}
                  </Button>
                </div>
              </div>
            ))}
          </div>

          {/* Global connectivity callout */}
          <div className="mt-10 bg-gradient-to-r from-sky-900/20 to-emerald-900/20 border border-white/10 rounded-2xl p-8 text-center">
            <Globe className="w-8 h-8 text-emerald-400 mx-auto mb-3" />
            <h3 className="font-black text-white text-xl uppercase tracking-tight mb-3">
              Unmatched Global Connectivity
            </h3>
            <p className="text-gray-400 max-w-3xl mx-auto text-sm leading-relaxed">
              Dubai International (DXB) is the world's busiest international airport by passenger volume. Al Maktoum International (DWC) is set to become the world's largest. Together, they position businesses registered in DAFZA, Dubai South, and Commercity at the centre of global trade flows — connecting Europe, Asia, Africa, and the Americas with sub-24-hour freight reach to 2.5 billion people.
            </p>
          </div>
        </div>
      </section>

      {/* ── WHY DUBAI RIGHT NOW ── */}
      <section className="py-20 px-4 bg-slate-900/50">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-black uppercase tracking-tight mb-4">
              Why Dubai — <span className="text-emerald-400">Right Now</span>
            </h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              Regional conflict and economic uncertainty are accelerating the global flight to stability. Dubai is the landing pad.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {warContext.map((item) => (
              <Card key={item.title} className="bg-slate-800/50 border-white/10 hover:border-emerald-500/30 transition-colors">
                <CardContent className="p-6 flex gap-5">
                  <div className="shrink-0 w-12 h-12 rounded-xl bg-emerald-500/10 flex items-center justify-center">
                    <item.icon className="w-6 h-6 text-emerald-400" />
                  </div>
                  <div>
                    <h3 className="font-black text-white text-lg mb-2">{item.title}</h3>
                    <p className="text-gray-400 text-sm leading-relaxed">{item.desc}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* ── TAX BENEFITS ── */}
      <section className="py-20 px-4">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-black uppercase tracking-tight mb-4">
              Tax Benefits That <span className="text-emerald-400">Actually Matter</span>
            </h2>
            <p className="text-gray-400 max-w-xl mx-auto">Dubai's tax framework is one of the most competitive on the planet. Here's what that means for your bottom line.</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {taxBenefits.map((t) => (
              <div key={t.label + t.detail} className="bg-gradient-to-br from-emerald-900/20 to-slate-800/40 border border-emerald-500/20 rounded-2xl p-6 text-center" data-testid={`card-tax-${t.label}`}>
                <div className="text-4xl font-black text-emerald-400 mb-2">{t.label}</div>
                <p className="text-gray-300 text-sm leading-snug">{t.detail}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── SERVICES ── */}
      <section id="services" className="py-20 px-4 bg-slate-900/50">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-black uppercase tracking-tight mb-4">
              What We <span className="text-emerald-400">Handle For You</span>
            </h2>
            <p className="text-gray-400 max-w-xl mx-auto">End-to-end setup — from picking your free zone to holding your trade licence in your hands.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {services.map((s) => (
              <Card key={s.title} className="bg-slate-800/50 border-white/10 hover:border-emerald-500/30 transition-all hover:-translate-y-1 duration-200">
                <CardContent className="p-6">
                  <div className="w-12 h-12 rounded-xl bg-emerald-500/10 flex items-center justify-center mb-4">
                    <s.icon className="w-6 h-6 text-emerald-400" />
                  </div>
                  <h3 className="font-black text-white text-base mb-2">{s.title}</h3>
                  <p className="text-gray-400 text-sm leading-relaxed">{s.desc}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* ── STRUCTURAL ADVANTAGES ── */}
      <section className="py-20 px-4">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-black uppercase tracking-tight mb-4">
              The Structural <span className="text-emerald-400">Advantages</span>
            </h2>
            <p className="text-gray-400 max-w-xl mx-auto">Beyond the taxes — the infrastructure, geography, and legal ecosystem that make Dubai a permanent business decision.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {advantages.map((adv) => (
              <div key={adv} className="flex items-start gap-3 bg-slate-800/30 border border-white/5 rounded-xl p-4" data-testid="item-advantage">
                <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                <p className="text-gray-300 text-sm">{adv}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── HOW IT WORKS ── */}
      <section className="py-20 px-4 bg-slate-900/50">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-black uppercase tracking-tight mb-4">
              How It <span className="text-emerald-400">Works</span>
            </h2>
            <p className="text-gray-400">From WhatsApp message to active trade licence — here's the path.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {steps.map((s, i) => (
              <div key={s.step} className="relative text-center" data-testid={`step-${s.step}`}>
                <div className="text-6xl font-black text-emerald-500/10 mb-2">{s.step}</div>
                <h3 className="font-black text-white text-base mb-2">{s.title}</h3>
                <p className="text-gray-400 text-sm">{s.desc}</p>
                {i < steps.length - 1 && (
                  <ArrowRight className="hidden md:block absolute top-6 -right-3 w-5 h-5 text-emerald-500/30" />
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── UPCOMING INCENTIVES ── */}
      <section className="py-16 px-4">
        <div className="max-w-5xl mx-auto">
          <div className="bg-gradient-to-r from-emerald-900/40 to-slate-800/60 border border-emerald-500/20 rounded-3xl p-10 text-center">
            <DollarSign className="w-12 h-12 text-emerald-400 mx-auto mb-4" />
            <h2 className="text-2xl md:text-3xl font-black uppercase tracking-tight mb-4">
              Upcoming Incentives — Get in Early
            </h2>
            <p className="text-gray-300 max-w-2xl mx-auto mb-6 leading-relaxed">
              The UAE's <strong className="text-white">We the UAE 2031</strong> vision targets AED 600 billion GDP. New programmes launching in 2025–2027 include: <strong className="text-emerald-400">Digital Economy Licences</strong> at subsidised rates, <strong className="text-emerald-400">R&D Tax Credits</strong> for tech companies, <strong className="text-emerald-400">SME Growth Grants</strong> through Abu Dhabi and Dubai SME, and expanded <strong className="text-emerald-400">Golden Visa</strong> categories for remote workers and creatives.
            </p>
            <p className="text-sm text-gray-500">Early movers lock in the best rates and fastest approvals. The window is now.</p>
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="py-20 px-4 bg-slate-900/50">
        <div className="max-w-2xl mx-auto text-center">
          <Star className="w-10 h-10 text-emerald-400 mx-auto mb-4" />
          <h2 className="text-3xl md:text-4xl font-black uppercase tracking-tight mb-4">
            Ready to Set Up <span className="text-emerald-400">in Dubai?</span>
          </h2>
          <p className="text-gray-400 mb-8">Message us on WhatsApp. Tell us what you're building. We'll come back with a recommendation within 24 hours — no jargon, no pressure.</p>
          <Button
            size="lg"
            className="bg-emerald-500 hover:bg-emerald-400 text-black font-black uppercase tracking-widest text-sm px-12 py-6 rounded-2xl flex items-center gap-2 mx-auto shadow-lg shadow-emerald-500/20"
            onClick={() => window.open(WHATSAPP, "_blank")}
            data-testid="button-cta-whatsapp-bottom"
          >
            <SiWhatsapp className="w-5 h-5" />
            WhatsApp — Start Free Consultation
          </Button>
          <p className="text-xs text-gray-600 mt-4">Free Zone · Mainland · Golden Visa · Corporate Banking</p>
        </div>
      </section>
    </div>
  );
}
