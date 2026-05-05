import ejariVideoSrc from "@assets/Ejari-Service-Final_injaz_1772144918784.mp4";
import { SEOMeta } from "@/components/seo-meta";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  MessageSquare,
  CheckCircle2,
  ShieldCheck,
  Fingerprint,
  Building2,
  ClipboardCheck,
  Home,
  Droplets,
  Wind,
  Truck,
  Star,
  ChevronDown,
  ChevronUp,
  FileText,
  LogOut,
  ArrowLeftRight,
  X as XIcon,
} from "lucide-react";
import { AlertCircle } from "lucide-react";
import { motion } from "framer-motion";
import { Link, useLocation } from "wouter";
import { Navigation } from "@/components/navigation";
import { EjariFunnel, EjariScenario } from "@/components/ejari-funnel";
import { useEffect, useState } from "react";

const faqItems = [
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

function FAQItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div
      className="border border-white/10 rounded-2xl overflow-hidden"
      data-testid="faq-item"
    >
      <button
        className="w-full flex items-center justify-between gap-4 px-6 py-5 text-left text-white font-bold hover:bg-white/5 transition-colors"
        onClick={() => setOpen(!open)}
        data-testid="faq-toggle"
        aria-expanded={open}
      >
        <span>{q}</span>
        {open ? (
          <ChevronUp className="w-5 h-5 text-emerald-400 flex-shrink-0" />
        ) : (
          <ChevronDown className="w-5 h-5 text-emerald-400 flex-shrink-0" />
        )}
      </button>
      {open && (
        <div className="px-6 pb-5 text-gray-300 leading-relaxed text-sm" data-testid="faq-answer">
          {a}
        </div>
      )}
    </div>
  );
}

const HERO_SCENARIOS = [
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

export default function EjariDubai() {
  const [location] = useLocation();
  const [funnelOpen, setFunnelOpen] = useState(false);
  const [selectedScenario, setSelectedScenario] = useState<EjariScenario | null>(null);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const referral = {
      partner: params.get("ref"),
      agent: params.get("agent"),
      campaign: params.get("campaign"),
      timestamp: new Date().toISOString(),
    };
    if (referral.partner) {
      if (!localStorage.getItem("deliwer_ref")) {
        localStorage.setItem("deliwer_ref", JSON.stringify(referral));
      }
    }
  }, [location]);

  const handleWhatsApp = () => {
    const referralData = localStorage.getItem("deliwer_ref");
    const referral = referralData ? JSON.parse(referralData) : {};
    const message = `Hello DeliWer,\n\nI need Ejari Registration in Dubai.\n\nReferral Partner: ${referral.partner || "Direct"}\nAgent: ${referral.agent || ""}\n\nPlease send me more information.`;
    window.open(
      `https://wa.me/971523946311?text=${encodeURIComponent(message)}`,
      "_blank"
    );
  };

  const handleMoveInWhatsApp = () => {
    const referralData = localStorage.getItem("deliwer_ref");
    const referral = referralData ? JSON.parse(referralData) : {};
    const message = `Hello DeliWer,\n\nI'm interested in the AquaCafe Move-In Welcome Service.\n\nReferral Partner: ${referral.partner || "Direct"}\n\nPlease send me more information.`;
    window.open(
      `https://wa.me/971523946311?text=${encodeURIComponent(message)}`,
      "_blank"
    );
  };

  const steps = [
    {
      title: "Document Submission",
      description: "Upload your tenancy contract and Emirates ID via WhatsApp.",
      icon: ClipboardCheck,
    },
    {
      title: "Coordination Review",
      description:
        "We review and organize your documents for trustee center submission.",
      icon: Building2,
    },
    {
      title: "Trustee Processing",
      description:
        "Official RERA trustee center processes and verifies your documents.",
      icon: Fingerprint,
    },
    {
      title: "Ejari Registration",
      description:
        "Official Ejari certificate issued by authorized trustee center.",
      icon: CheckCircle2,
    },
  ];

  const moveInTasks = [
    { icon: ClipboardCheck, label: "Ejari Registration Support" },
    { icon: Droplets, label: "DEWA Activation Guidance" },
    { icon: Droplets, label: "Water Setup Readiness" },
    { icon: Wind, label: "Air and Ventilation Check" },
    { icon: Truck, label: "Movers and Packing Coordination" },
    { icon: Home, label: "Move-In Day Service Support" },
    { icon: Star, label: "Shower Filter Welcome Bonus" },
  ];

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqItems.map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.a,
      },
    })),
  };

  const localServiceSchema = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: "DeliWer – Ejari Registration & Move-In Coordination",
    url: "https://deliwer.com/ejari-dubai",
    telephone: "+971523946311",
    email: "info@deliwer.com",
    address: {
      "@type": "PostalAddress",
      addressLocality: "Dubai",
      addressCountry: "AE",
    },
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "DeliWer Services",
      itemListElement: [
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Ejari Registration Assistance",
            description:
              "DeliWer coordinates Ejari tenancy contract registration through official RERA-appointed trustee centers in Dubai.",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Move-In Coordination Services",
            description:
              "AquaCafe Move-In Welcome Service coordinating DEWA activation, water setup, movers, air checks, and move-in day support.",
          },
        },
      ],
    },
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white selection:bg-emerald-500/30">
      <SEOMeta
        title="Ejari Registration in Dubai – Easy Home Service Support | DeliWer"
        description="Register your Ejari with guided support and move-in coordination. DeliWer coordinates Ejari registration through official RERA trustee centers and helps with your full move-in readiness in Dubai."
      />

      {/* JSON-LD Schema Markup */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localServiceSchema) }}
      />

      <Navigation />

      {/* ───── HERO SECTION ───── */}
      <section className="relative py-24 px-4 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-emerald-500/10 to-transparent pointer-events-none" />
        <div className="max-w-5xl mx-auto text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-sm font-bold mb-6">
              <ShieldCheck className="w-4 h-4" />
              EJARI COORDINATION SERVICE · DUBAI
            </div>

            <h1 className="text-5xl md:text-7xl font-black uppercase tracking-tighter mb-4 leading-none">
              Register Ejari Online{" "}
              <span className="text-emerald-500">Without Visiting Government Offices</span>
            </h1>

            <p className="text-xl text-gray-300 font-medium max-w-2xl mx-auto mb-3">
              Get Ejari registration, DEWA activation, and move-in coordination handled in one place.
            </p>

            {/* Pain points inline */}
            <div className="flex flex-wrap justify-center gap-3 mb-10">
              {["Long queues", "Confusing paperwork", "Landlord coordination", "DEWA activation delays"].map(p => (
                <span key={p} className="flex items-center gap-1.5 bg-red-500/10 border border-red-500/20 rounded-full px-3 py-1 text-red-300 text-xs font-bold">
                  <AlertCircle className="w-3 h-3" />{p}
                </span>
              ))}
            </div>

            {/* ── SCENARIO SELECTOR ── */}
            <div className="max-w-3xl mx-auto mb-8">
              <p className="text-[11px] text-gray-500 font-black uppercase tracking-widest mb-4">What do you need help with?</p>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {HERO_SCENARIOS.map(s => {
                  const Icon = s.icon;
                  const isSelected = selectedScenario === s.key;
                  return (
                    <button
                      key={s.key}
                      data-testid={`hero-scenario-${s.key}`}
                      onClick={() => {
                        setSelectedScenario(s.key);
                        setFunnelOpen(true);
                      }}
                      className={`flex flex-col items-center gap-2 p-4 rounded-2xl border-2 bg-slate-900 transition-all text-center cursor-pointer ${
                        isSelected ? `border-${s.color}-500 bg-${s.color}-500/10` : `${SCENARIO_COLORS[s.color]} hover:bg-slate-800`
                      }`}
                    >
                      <div className={`w-10 h-10 rounded-xl bg-slate-800 flex items-center justify-center`}>
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
            </div>

            {/* Primary CTA */}
            <Button
              size="lg"
              className="bg-emerald-600 hover:bg-emerald-500 font-black h-16 px-12 rounded-2xl text-lg shadow-xl shadow-emerald-900/30 mb-3"
              onClick={() => { setSelectedScenario(null); setFunnelOpen(true); }}
              data-testid="button-ejari-start-setup"
            >
              <MessageSquare className="w-6 h-6 mr-3" />
              Start Ejari Setup
            </Button>

            <p className="text-sm text-gray-500 font-medium mb-10">
              Select a situation above or click to start · Response within 10 minutes
            </p>

            {/* Problem → Solution */}
            <div className="max-w-3xl mx-auto mb-10 grid md:grid-cols-2 gap-4">
              <div className="flex items-start gap-4 bg-red-500/10 border border-red-500/30 rounded-2xl p-5 text-left">
                <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-sm font-black text-white mb-1">The problem:</p>
                  <p className="text-sm text-gray-300 font-medium leading-relaxed">
                    Without Ejari you <span className="text-red-400 font-black">cannot activate DEWA</span> — and without DEWA you <span className="text-red-400 font-black">cannot move in legally</span>.
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-4 bg-emerald-500/10 border border-emerald-500/30 rounded-2xl p-5 text-left">
                <CheckCircle2 className="w-5 h-5 text-emerald-500 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-sm font-black text-white mb-1">Our solution:</p>
                  <p className="text-sm text-gray-300 font-medium leading-relaxed">
                    DeliWer <span className="text-emerald-400 font-black">handles the entire process via WhatsApp</span> — Ejari, DEWA, movers, and move-in coordination in one place.
                  </p>
                </div>
              </div>
            </div>

            {/* Video Section */}
            <div className="mb-6 max-w-2xl mx-auto w-full">
              <div className="rounded-3xl overflow-hidden border border-white/10 bg-slate-900 shadow-2xl">
                <div className="aspect-video relative cursor-pointer">
                  <video
                    id="ejari-video"
                    className="w-full h-full object-cover"
                    controls
                    playsInline
                    muted={false}
                    autoPlay={false}
                    preload="metadata"
                    poster="/deliwer-logo.png"
                    onClick={(e) => {
                      const video = e.currentTarget;
                      if (video.paused) { video.play(); } else { video.pause(); }
                    }}
                  >
                    <source
                      src={ejariVideoSrc}
                      type="video/mp4"
                    />
                    Your browser does not support the video tag.
                  </video>
                </div>
                <div className="p-4 bg-slate-900/50 backdrop-blur-sm border-t border-white/5 text-left">
                  <p className="text-sm text-gray-400 font-medium">
                    Watch: How DeliWer coordinates your Ejari registration from home.
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ───── WHAT IS EJARI ───── */}
      <section className="py-20 px-4 bg-white/3">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-black uppercase mb-6 text-white">
            What Is Ejari Registration?
          </h2>
          <p className="text-gray-300 text-lg leading-relaxed mb-6">
            Ejari is the official tenancy contract registration system operated
            by the Dubai Land Department (DLD). All rental agreements in Dubai
            must be registered through the Ejari system to be legally
            recognized.
          </p>
          <p className="text-gray-300 text-lg leading-relaxed mb-6">
            Ejari registration is mandatory for DEWA activation, internet
            installation, and residency visa applications. Without a valid
            Ejari registration in Dubai, tenants cannot complete any official
            onboarding process for their new home.
          </p>
          <p className="text-gray-300 text-lg leading-relaxed mb-6">
            The Ejari registration process requires the tenancy contract to be
            submitted to an authorized RERA-appointed trustee center, where it
            is verified against Dubai Land Department records. DeliWer
            coordinates this Ejari tenancy contract registration on your behalf
            so you do not need to visit a typing center.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">
            {[
              { label: "Ejari registration Dubai", icon: ClipboardCheck },
              {
                label: "Ejari tenancy contract registration",
                icon: Building2,
              },
              { label: "Ejari Dubai Land Department", icon: ShieldCheck },
            ].map((item) => (
              <div
                key={item.label}
                className="flex items-center gap-3 bg-emerald-500/10 border border-emerald-500/20 rounded-xl px-4 py-3"
              >
                <item.icon className="w-5 h-5 text-emerald-400 flex-shrink-0" />
                <span className="text-emerald-300 font-semibold text-sm">
                  {item.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ───── PROCESS STEPS ───── */}
      <section className="py-24 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {steps.map((step, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="bg-white/5 border-white/10 h-full hover:border-emerald-500/50 transition-colors">
                  <CardHeader>
                    <div className="w-12 h-12 rounded-xl bg-emerald-500/20 flex items-center justify-center mb-4">
                      <step.icon className="w-6 h-6 text-emerald-400" />
                    </div>
                    <CardTitle className="text-xl font-bold text-white">
                      {step.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-400 leading-relaxed">
                      {step.description}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ───── EJARI HOME SERVICE – with Move-In intro ───── */}
      <section className="py-20 px-4 bg-white/3">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-black uppercase mb-6 text-white">
            Ejari Home Service
          </h2>
          <p className="text-gray-300 text-lg leading-relaxed mb-6">
            DeliWer's Ejari home service allows residents to complete the full
            Ejari registration process from home via WhatsApp. We guide you
            through every document requirement, coordinate with official
            trustee centers, and ensure your Ejari online registration is
            submitted correctly and on time.
          </p>
          <p className="text-gray-300 text-lg leading-relaxed">
            Many residents registering Ejari are also preparing their homes for
            move-in. DeliWer helps coordinate essential move-in readiness
            through the{" "}
            <span className="text-emerald-400 font-semibold">
              AquaCafe Move-In Welcome Service
            </span>
            , so Ejari registration and home setup can happen together
            seamlessly.
          </p>
        </div>
      </section>

      {/* ───── MOVING IN? START WITH A WELCOME ───── */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-sm font-bold mb-6">
              <Home className="w-4 h-4" />
              AQUACAFE MOVE-IN WELCOME SERVICE
            </div>
            <h2 className="text-4xl md:text-5xl font-black uppercase tracking-tighter mb-6 text-white">
              Moving In?{" "}
              <span className="text-emerald-500">Start With a Welcome</span>
            </h2>
            <p className="text-gray-300 text-lg leading-relaxed mb-4">
              When residents move into a new home there are several tasks that
              must be completed before the home is fully ready.
            </p>
            <p className="text-gray-300 text-lg leading-relaxed mb-10">
              The AquaCafe Move-In Welcome Service coordinates important move-in
              tasks so residents can settle in more comfortably.
            </p>

            {/* Move-In Task List */}
            <div className="bg-slate-900/60 border border-white/10 rounded-3xl p-8">
              <h3 className="text-xl font-black uppercase text-white mb-6 tracking-wide">
                Move-In Welcome Coordination Includes:
              </h3>
              <ul className="space-y-4">
                {moveInTasks.map((task, idx) => (
                  <li key={idx} className="flex items-center gap-4">
                    <div className="w-9 h-9 rounded-xl bg-emerald-500/20 flex items-center justify-center flex-shrink-0">
                      <task.icon className="w-4 h-4 text-emerald-400" />
                    </div>
                    <span className="text-gray-200 font-medium">
                      {task.label}
                    </span>
                    <CheckCircle2 className="w-4 h-4 text-emerald-500 ml-auto flex-shrink-0" />
                  </li>
                ))}
              </ul>
              <p className="text-gray-500 text-sm mt-6">
                Services are coordinated where applicable. Availability subject
                to area and service scope.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ───── TRANSITION ───── */}
      <section className="py-12 px-4">
        <div className="max-w-3xl mx-auto text-center">
          <p className="text-lg text-gray-400 font-medium italic border-l-4 border-emerald-500/50 pl-6 text-left">
            "Many residents choose to combine Ejari registration with move-in
            coordination so everything is ready when they receive the keys."
          </p>
        </div>
      </section>

      {/* ───── PLAN YOUR MOVE-IN CTA ───── */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto bg-emerald-950/30 border border-emerald-500/20 rounded-[3rem] text-center p-12 space-y-6">
          <div className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-black uppercase tracking-widest">
            Ready to Begin?
          </div>
          <h2 className="text-4xl md:text-5xl font-black uppercase tracking-tighter text-white">
            Plan Your Move-In Smoothly
          </h2>
          <p className="text-gray-400 font-medium max-w-xl mx-auto">
            Start with Ejari, then coordinate everything else. DeliWer handles
            both so you can focus on settling in.
          </p>
          <div className="flex flex-col md:flex-row items-center justify-center gap-4 pt-2">
            <Button
              size="lg"
              className="bg-emerald-600 hover:bg-emerald-500 text-white font-black rounded-2xl px-10 h-14 text-lg shadow-xl w-full md:w-auto"
              onClick={handleWhatsApp}
              data-testid="button-book-ejari"
            >
              <MessageSquare className="w-5 h-5 mr-2" />
              Book Ejari Assistance
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-emerald-500/40 hover:bg-emerald-500/10 text-emerald-400 font-black rounded-2xl px-10 h-14 text-lg w-full md:w-auto"
              onClick={handleMoveInWhatsApp}
              data-testid="button-schedule-movein"
            >
              <Home className="w-5 h-5 mr-2" />
              Schedule Move-In Welcome
            </Button>
          </div>
        </div>
      </section>

      {/* ───── EXISTING FUNNEL SECTION ───── */}
      <section className="max-w-4xl mx-auto py-20 px-6 mb-24 bg-emerald-950/20 border border-emerald-500/20 rounded-[3rem] text-center space-y-8">
        <div className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-black uppercase tracking-widest">
          The DeliWer Standard
        </div>
        <h2 className="text-4xl md:text-6xl font-black text-white uppercase tracking-tighter italic">
          Ejari Done. Now What?
        </h2>
        <p className="text-gray-300 text-lg font-medium italic max-w-2xl mx-auto">
          Ejari is just the foundation. Most residents now follow up with our
          standard Move-In Activation to ensure the home is technically ready.
        </p>
        <div className="flex flex-col md:flex-row items-center justify-center gap-4 pt-4">
          <Link href="/relocate">
            <Button
              size="lg"
              className="bg-emerald-600 hover:bg-emerald-500 text-white font-black rounded-2xl px-10 h-16 text-xl shadow-xl transition-all w-full md:w-auto"
              data-testid="button-start-movein-activation"
            >
              Start Move-In Activation (AED 399)
            </Button>
          </Link>
          <Link href="/residents">
            <Button
              size="lg"
              variant="outline"
              className="border-white/10 hover:bg-white/5 text-white font-black rounded-2xl px-10 h-16 text-xl w-full md:w-auto"
              data-testid="button-explore-resident"
            >
              Explore Resident Services
            </Button>
          </Link>
        </div>
      </section>

      {/* ───── COORDINATION THROUGH OFFICIAL CHANNELS ───── */}
      <section className="py-24 px-4 bg-emerald-600">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-5xl font-black uppercase mb-8 text-slate-950">
            Coordination Through Official Channels
          </h2>
          <p className="text-xl text-emerald-100 mb-8">
            DeliWer coordinates and facilitates your Ejari registration through
            authorized RERA Appointed Trustee Centers. We streamline the
            process, but all registrations are completed by official channels.
          </p>

          <div className="bg-slate-950/20 rounded-2xl p-6 mb-12 border border-slate-950/10 text-left">
            <h3 className="text-slate-950 font-black uppercase text-sm mb-3 flex items-center gap-2">
              <ShieldCheck className="w-4 h-4" />
              Our Role
            </h3>
            <p className="text-slate-900 text-sm leading-relaxed font-medium">
              DeliWer is a service provider for coordination and facilitation.
              We guide tenants and landlords through the Ejari process via
              WhatsApp, help organize required documentation, and coordinate
              submissions with official RERA-appointed trustee centers. All
              Ejari registrations, verifications, and official certificates are
              issued by authorized trustee centers in compliance with Dubai Land
              Department (DLD) regulations.{" "}
              <span className="text-slate-950 font-black">
                System integrations with trustee center backends and RERA
                records are under development. Biometric authentication features
                will be available through future DLD REST app integration.
              </span>
            </p>
          </div>

          <div className="flex justify-center gap-8 items-center flex-wrap">
            <div className="flex items-center gap-2 text-slate-950 font-black uppercase tracking-wider">
              <CheckCircle2 className="w-6 h-6" />
              Official Channel Coordination
            </div>
            <div className="flex items-center gap-2 text-slate-950 font-black uppercase tracking-wider">
              <CheckCircle2 className="w-6 h-6" />
              DLD Compliant Process
            </div>
            <div className="flex items-center gap-2 text-slate-950 font-black uppercase tracking-wider">
              <CheckCircle2 className="w-6 h-6" />
              Trusted Facilitation
            </div>
          </div>
        </div>
      </section>

      {/* ───── SEO CONTENT ───── */}
      <section className="py-24 px-4 bg-white/5">
        <div className="max-w-4xl mx-auto prose prose-invert">
          <h2 className="text-3xl font-black uppercase mb-6">
            Why Choose DeliWer for Ejari Coordination?
          </h2>
          <p>
            Ejari is the foundation of your life in Dubai. It is mandatory for
            DEWA activation, internet installation, and residency visa
            applications. Traditional Ejari registration can take days,
            involving physical visits to typing centers.
          </p>
          <h3>WhatsApp-First Coordination</h3>
          <p>
            DeliWer transforms the Ejari registration process into a seamless
            WhatsApp experience. We guide you through documentation
            requirements, coordinate with official trustee centers, and ensure
            your Ejari online registration is submitted correctly. No physical
            visits needed — we handle the coordination.
          </p>
          <h3>Official Channel Compliance</h3>
          <p>
            All Ejari registrations are processed through authorized
            RERA-appointed trustee centers in full compliance with Dubai Land
            Department regulations. DeliWer's role is to facilitate and
            coordinate, ensuring a smooth Ejari registration experience while
            maintaining all official requirements.
          </p>
          <h3>Move-In Readiness</h3>
          <p>
            Beyond Ejari registration, DeliWer's AquaCafe Move-In Welcome
            Service helps coordinate DEWA activation guidance, water setup
            readiness, movers, and move-in day support. Many residents combine
            Ejari registration with move-in coordination so the entire
            relocation is handled in one place.
          </p>
          <h3>Future Enhancements</h3>
          <p>
            We are developing advanced features including direct trustee center
            backend integrations and biometric authentication through the DLD
            REST app. These will further streamline the Ejari registration
            process in the coming months.
          </p>
        </div>
      </section>

      {/* ───── FAQ SECTION ───── */}
      <section className="py-24 px-4">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-black uppercase tracking-widest mb-4">
              Local SEO · FAQ
            </div>
            <h2 className="text-3xl md:text-4xl font-black uppercase text-white">
              Ejari Registration – Common Questions
            </h2>
          </div>
          <div className="space-y-3">
            {faqItems.map((item, idx) => (
              <FAQItem key={idx} q={item.q} a={item.a} />
            ))}
          </div>
        </div>
      </section>

      <EjariFunnel open={funnelOpen} onClose={() => { setFunnelOpen(false); setSelectedScenario(null); }} initialScenario={selectedScenario ?? "register"} />
    </div>
  );
}
