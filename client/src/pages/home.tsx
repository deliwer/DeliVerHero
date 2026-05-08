import { Navigation } from "@/components/navigation";
import { useState, useEffect } from "react";
import { SEOMeta } from "@/components/seo-meta";
import { Helmet } from "react-helmet";
import { 
  Zap, MessageSquare, CheckCircle2, Thermometer, Droplets, 
  AlertTriangle, Coins, ShieldCheck, Check, Home as HomeIcon,
  Wrench, Cpu, Layout, ArrowRight, LogOut, ClipboardList, CalendarCheck, UserCheck,
  Package, Settings, MoveHorizontal, Truck, FileCheck, Clock, Star, Building2, ChevronDown, Sparkles
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { TrustStrip, PartnerStrip } from "@/components/trust-strip";
import { PaymentCTA } from "@/components/payment-cta";
import { BrokerCTABanner } from "@/components/broker-cta-banner";
import { motion } from "framer-motion";

import maintenanceHero from "@/assets/images/maintenance-hero.jpg";
import waterLifestyleImg from "@/assets/images/water-lifestyle.jpg";

const BUNDLE_SIZES = [
  { key: "studio", label: "Studio", rooms: "Studio", cost: 3250, breakdown: { movers: 1200, ejari: 350, dewa: 1200, filter: 500 } },
  { key: "1br", label: "1 Bedroom", rooms: "1 BR", cost: 3600, breakdown: { movers: 1400, ejari: 350, dewa: 1350, filter: 500 } },
  { key: "2br", label: "2 Bedrooms", rooms: "2 BR", cost: 4000, breakdown: { movers: 1800, ejari: 350, dewa: 1350, filter: 500 } },
  { key: "3br_villa", label: "3 BR / Villa", rooms: "3+ BR", cost: 4500, breakdown: { movers: 2400, ejari: 350, dewa: 1250, filter: 500 } },
];

export default function Home() {
  const [selectedSize, setSelectedSize] = useState("1br");

  const handleWhatsApp = (serviceName?: string) => {
    const text = serviceName 
      ? `Hi DeliWer, I just signed a lease in Dubai and need move-in support for ${serviceName}`
      : "Hi DeliWer, I just signed a lease in Dubai and need move-in support";
    window.open(`https://wa.me/971523946311?text=${encodeURIComponent(text)}`, '_blank');
  };

  const handleBundleWhatsApp = () => {
    const size = BUNDLE_SIZES.find(s => s.key === selectedSize) ?? BUNDLE_SIZES[1];
    const text = `Hi DeliWer, I just signed a lease in Dubai and I'd like to book the Starter Move-In Bundle for a ${size.rooms} apartment. Estimated vendor cost: AED ${size.cost.toLocaleString()}. Please coordinate.`;
    window.open(`https://wa.me/971523946311?text=${encodeURIComponent(text)}`, '_blank');
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white selection:bg-emerald-500/40 font-sans">
      <SEOMeta 
        title="AquaCafe Move-In Welcome Service Dubai | Home Activation Services | DeliWer"
        description="DeliWer helps expatriates and tenants in Dubai plan and activate their new homes after Ejari, with the AquaCafe Move-In Welcome Service, home activation (AED 399), and water quality setup. WhatsApp booking available."
      />
      <Helmet>
        <meta name="keywords" content="Dubai move in services, Move-In Activation Dubai, Ejari support, tenant home activation, water setup Dubai, relocation concierge" />
        <script type="application/ld+json">
        {`
        {
          "@context": "https://schema.org",
          "@type": "LocalBusiness",
          "name": "DeliWer",
          "url": "https://www.deliwer.com",
          "logo": "https://www.deliwer.com/logo.png",
          "description": "AquaCafe Move-In Welcome Service providing Ejari readiness support, apartment activation, relocation coordination, and water quality setup services.",
          "areaServed": {
            "@type": "City",
            "name": "Dubai"
          },
          "address": {
            "@type": "PostalAddress",
            "addressLocality": "Dubai",
            "addressCountry": "AE"
          },
          "contactPoint": {
            "@type": "ContactPoint",
            "telephone": "+971523946311",
            "contactType": "customer service",
            "areaServed": "AE",
            "availableLanguage": ["English"]
          }
        }
        `}
        </script>
        <script type="application/ld+json">
        {`
        {
          "@context": "https://schema.org",
          "@type": "WebSite",
          "name": "DeliWer",
          "url": "https://www.deliwer.com",
          "potentialAction": {
            "@type": "SearchAction",
            "target": "https://www.deliwer.com/?s={search_term_string}",
            "query-input": "required name=search_term_string"
          }
        }
        `}
        </script>
        <script type="application/ld+json">
        {`
        {
          "@context": "https://schema.org",
          "@type": "Service",
          "serviceType": "Move-In Activation & Planning",
          "provider": {
            "@type": "LocalBusiness",
            "name": "DeliWer"
          },
          "areaServed": {
            "@type": "City",
            "name": "Dubai"
          },
          "offers": {
            "@type": "Offer",
            "price": "399",
            "priceCurrency": "AED",
            "description": "Move-In Activation including shower filter installation, AC filter cleaning, and water quality assessment."
          }
        }
        `}
        </script>
        <script type="application/ld+json">
        {`
        {
          "@context": "https://schema.org",
          "@type": "FAQPage",
          "mainEntity": [
            {
              "@type": "Question",
              "name": "What is Move-In Planning?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "A structured session that prepares your Ejari documentation, utility sequencing, and move-in readiness plan."
              }
            },
            {
              "@type": "Question",
              "name": "Is Move-In Planning free?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "Move-In Planning is FREE when bundled with Move-In Activation (AED 399), or AED 99 standalone."
              }
            },
            {
              "@type": "Question",
              "name": "What is included in Move-In Activation?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "Activation includes shower filter installation, AC filter cleaning, water quality assessment, and essentials setup guidance."
              }
            },
            {
              "@type": "Question",
              "name": "Do you help with Ejari?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "Yes, we provide Ejari readiness support and trustee booking guidance during the Move-In Planning stage."
              }
            }
          ]
        }
        `}
        </script>
        <script type="application/ld+json">
        {`
        {
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          "itemListElement": [
            {
              "@type": "ListItem",
              "position": 1,
              "name": "Home",
              "item": "https://www.deliwer.com"
            },
            {
              "@type": "ListItem",
              "position": 2,
              "name": "Residents",
              "item": "https://www.deliwer.com/residents"
            },
            {
              "@type": "ListItem",
              "position": 3,
              "name": "Relocate",
              "item": "https://www.deliwer.com/relocate"
            }
          ]
        }
        `}
        </script>
      </Helmet>
      {/* ── HERO ── */}
      <section className="relative min-h-[95vh] flex items-center justify-center overflow-hidden px-4 text-center">
        <div
          className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat opacity-15"
          style={{ backgroundImage: `url(${maintenanceHero})` }}
        />
        <div className="absolute inset-0 z-0 bg-gradient-to-b from-slate-950/60 via-slate-950/90 to-slate-950" />

        <div className="relative z-10 max-w-4xl mx-auto space-y-10 py-20">
          <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="space-y-4">
            <div className="inline-flex items-center gap-2 bg-emerald-500/10 border border-emerald-500/20 rounded-full px-5 py-2 text-emerald-400 text-xs font-black uppercase tracking-widest">
              <CheckCircle2 className="w-3.5 h-3.5" /> Dubai's Default Move-In Platform
            </div>
            <h1 className="text-6xl md:text-8xl font-black tracking-tighter leading-[0.88] drop-shadow-2xl text-white uppercase">
              Your Entire<br />Move-In.<br /><span className="text-emerald-400">One Message.</span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-300 font-medium max-w-2xl mx-auto leading-relaxed">
              Ejari. DEWA. Movers. Cleaning. Water filter. All coordinated by DeliWer — without you chasing a single vendor.
            </p>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size="lg"
              data-testid="button-hero-whatsapp"
              className="bg-emerald-600 hover:bg-emerald-500 text-white font-black rounded-2xl px-10 h-16 text-lg shadow-2xl shadow-emerald-500/20"
              onClick={() => handleWhatsApp()}
            >
              <MessageSquare className="w-5 h-5 mr-2" /> Start on WhatsApp
            </Button>
            <Button
              size="lg"
              variant="outline"
              data-testid="button-hero-bundle"
              className="border-white/20 text-white hover:bg-white/5 font-black rounded-2xl px-10 h-16 text-lg"
              onClick={() => document.getElementById("starter-bundle")?.scrollIntoView({ behavior: "smooth" })}
            >
              See What's Included <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </motion.div>

          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }} className="flex flex-wrap justify-center gap-6 text-sm text-gray-400 pt-4 border-t border-white/10">
            {[
              { icon: <ShieldCheck className="w-4 h-4 text-emerald-400" />, text: "No hidden fees" },
              { icon: <CheckCircle2 className="w-4 h-4 text-emerald-400" />, text: "Verified vendors only" },
              { icon: <Clock className="w-4 h-4 text-emerald-400" />, text: "20+ hours saved" },
              { icon: <Star className="w-4 h-4 text-emerald-400" />, text: "WhatsApp-first" },
            ].map((item, i) => (
              <div key={i} className="flex items-center gap-2 font-medium">{item.icon} {item.text}</div>
            ))}
          </motion.div>
        </div>
      </section>
      {/* ── THE PAIN ── */}
      <section className="py-20 px-4 bg-slate-900/60 border-y border-white/5">
        <div className="max-w-4xl mx-auto space-y-10">
          <div className="text-center space-y-3">
            <h2 className="text-3xl md:text-4xl font-black uppercase tracking-tighter text-white">
              The moment you sign a lease in Dubai,<br className="hidden md:block" /><span className="text-gray-400"> all of this lands on your plate.</span>
            </h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {[
              { icon: <FileCheck className="w-5 h-5" />, label: "Ejari Registration", pain: "Requires specific documents, trustee center booking" },
              { icon: <Zap className="w-5 h-5" />, label: "DEWA Activation", pain: "Electricity & water on requires its own process" },
              { icon: <Truck className="w-5 h-5" />, label: "Find Vetted Movers", pain: "Quoting, scheduling, trusting the right crew" },
              { icon: <Sparkles className="w-5 h-5" />, label: "Apartment Cleaning", pain: "Before furniture arrives, deep clean is essential" },
              { icon: <Droplets className="w-5 h-5" />, label: "Water Filter Setup", pain: "Dubai tap water is treated but filtration is standard" },
              { icon: <Package className="w-5 h-5" />, label: "Coordinate Timing", pain: "Everything must happen in the right order" },
              { icon: <Settings className="w-5 h-5" />, label: "Internet & Utilities", pain: "Multiple providers, multiple timeslots to manage" },
              { icon: <Wrench className="w-5 h-5" />, label: "AC & Home Check", pain: "Filters, appliances, handover snagging" },
            ].map((item, i) => (
              <div key={i} className="bg-slate-900 border border-slate-700/60 rounded-2xl p-4 space-y-2 hover:border-red-500/20 transition-all">
                <div className="text-red-400/70">{item.icon}</div>
                <div className="font-black text-white text-xs uppercase tracking-tight">{item.label}</div>
                <div className="text-gray-600 text-[10px] font-medium leading-relaxed">{item.pain}</div>
              </div>
            ))}
          </div>
          <div className="text-center space-y-4">
            <div className="inline-block bg-emerald-500/10 border border-emerald-500/20 rounded-2xl px-8 py-5">
              <p className="text-emerald-300 font-black text-lg md:text-xl">DeliWer handles all of it — from one WhatsApp message.</p>
              <p className="text-gray-400 text-sm font-medium mt-1">You pay only normal vendor market rates. We coordinate everything behind the scenes.</p>
            </div>
            <div>
              <Button
                data-testid="button-pain-cta"
                size="lg"
                className="bg-emerald-600 hover:bg-emerald-500 text-white font-black rounded-2xl px-10 h-14 text-base"
                onClick={() => handleWhatsApp()}
              >
                <MessageSquare className="w-4 h-4 mr-2" /> Start on WhatsApp — It's Free to Ask
              </Button>
            </div>
          </div>
        </div>
      </section>
      {/* ==========================================
           STARTER MOVE-IN BUNDLE SECTION
         ========================================== */}
      <section id="starter-bundle" className="py-24 px-4 bg-slate-950 border-b border-white/5">
        <div className="max-w-5xl mx-auto space-y-14">

          {/* Header */}
          <div className="text-center space-y-4">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-500/10 border border-emerald-500/20 rounded-full text-emerald-400 text-xs font-black uppercase tracking-widest">
              <Star className="w-3.5 h-3.5" /> Starter Move-In Bundle
            </div>
            <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tighter text-white leading-[0.9]">
              All Coordinated.<br /><span className="text-emerald-400">Zero Extra Fees.</span>
            </h2>
            <p className="text-lg text-gray-300 max-w-2xl mx-auto font-medium leading-relaxed">
              You pay exactly what vendors charge — we handle all coordination behind the scenes.
              No markup. No hidden charges. Just one smooth move-in.
            </p>
          </div>

          {/* Trust Badges */}
          <div className="flex flex-wrap justify-center gap-4">
            {[
              { icon: <ShieldCheck className="w-4 h-4" />, text: "No Hidden Fees" },
              { icon: <Package className="w-4 h-4" />, text: "All-in-One Move-In" },
              { icon: <Clock className="w-4 h-4" />, text: "20+ Hours Saved" },
              { icon: <CheckCircle2 className="w-4 h-4" />, text: "Verified Vendors" },
            ].map((badge, i) => (
              <div key={i} className="flex items-center gap-2 px-4 py-2 bg-emerald-500/10 border border-emerald-500/25 rounded-full text-emerald-300 text-xs font-black uppercase tracking-widest" data-testid={`badge-trust-${i}`}>
                {badge.icon} {badge.text}
              </div>
            ))}
          </div>

          {/* Main Content: Calculator + Services side by side */}
          <div className="grid md:grid-cols-2 gap-8 items-start">

            {/* Left: Apartment Size Selector + Cost Estimate */}
            <Card className="bg-white/5 border-white/10 rounded-[2rem] overflow-hidden">
              <CardContent className="p-8 space-y-6">
                <div className="space-y-2">
                  <p className="text-emerald-400 font-black uppercase tracking-widest text-xs">Step 1 — Select Your Apartment Size</p>
                  <h3 className="text-xl font-black uppercase text-white">Personalize Your Cost Estimate</h3>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  {BUNDLE_SIZES.map((size) => (
                    <button
                      key={size.key}
                      data-testid={`btn-size-${size.key}`}
                      onClick={() => setSelectedSize(size.key)}
                      className={`flex flex-col items-center gap-1.5 p-4 rounded-2xl border-2 transition-all font-black text-sm uppercase tracking-tight ${
                        selectedSize === size.key
                          ? "border-emerald-500 bg-emerald-500/15 text-emerald-300"
                          : "border-white/10 bg-white/5 text-gray-400 hover:border-white/25"
                      }`}
                    >
                      <Building2 className="w-5 h-5" />
                      {size.label}
                    </button>
                  ))}
                </div>

                {/* Dynamic Cost Display */}
                {(() => {
                  const size = BUNDLE_SIZES.find(s => s.key === selectedSize) ?? BUNDLE_SIZES[1];
                  return (
                    <div className="space-y-3 pt-2 border-t border-white/10">
                      <p className="text-[10px] text-gray-500 font-black uppercase tracking-widest">Estimated Market Vendor Costs</p>
                      {[
                        { label: "Professional Movers", icon: <Truck className="w-3.5 h-3.5" />, cost: size.breakdown.movers },
                        { label: "Ejari Registration", icon: <FileCheck className="w-3.5 h-3.5" />, cost: size.breakdown.ejari },
                        { label: "DEWA Activation & Deposit", icon: <Zap className="w-3.5 h-3.5" />, cost: size.breakdown.dewa },
                        { label: "Water / Shower Filter Setup", icon: <Droplets className="w-3.5 h-3.5" />, cost: size.breakdown.filter },
                      ].map((item, i) => (
                        <div key={i} className="flex items-center justify-between text-sm">
                          <span className="flex items-center gap-2 text-gray-300 font-medium">
                            <span className="text-emerald-400">{item.icon}</span>
                            {item.label}
                          </span>
                          <span className="text-white font-black">AED {item.cost.toLocaleString()}</span>
                        </div>
                      ))}
                      <div className="flex items-center justify-between pt-3 border-t border-emerald-500/20">
                        <span className="text-emerald-400 font-black uppercase text-sm tracking-tight">You Pay (Vendor Cost)</span>
                        <span className="text-emerald-400 font-black text-2xl" data-testid="text-bundle-total">AED {size.cost.toLocaleString()}</span>
                      </div>
                      <p className="text-[10px] text-gray-500 font-bold uppercase tracking-widest">
                        DeliWer coordination included — at no extra charge to you.
                      </p>
                    </div>
                  );
                })()}
              </CardContent>
            </Card>

            {/* Right: What's Included + CTA */}
            <div className="space-y-6">
              <Card className="bg-slate-900 border-emerald-500/25 border-2 rounded-[2rem] overflow-hidden shadow-2xl shadow-emerald-500/5">
                <CardContent className="p-8 space-y-6">
                  <div className="space-y-1">
                    <p className="text-emerald-400 font-black uppercase tracking-widest text-xs">What's Included</p>
                    <h3 className="text-xl font-black uppercase text-white">Starter Bundle Services</h3>
                  </div>
                  <div className="space-y-3">
                    {[
                      { icon: <Truck className="w-4 h-4 text-emerald-400" />, title: "Professional Movers", desc: "Vetted, insured moving crew — scheduled & coordinated" },
                      { icon: <FileCheck className="w-4 h-4 text-emerald-400" />, title: "Ejari Registration", desc: "Authorized trustee support — get your certificate fast" },
                      { icon: <Zap className="w-4 h-4 text-emerald-400" />, title: "DEWA Activation & Deposit", desc: "Electricity & water activated before you arrive" },
                      { icon: <Droplets className="w-4 h-4 text-emerald-400" />, title: "Water / Shower Filter Setup", desc: "AquaCafe shower filter supplied & installed" },
                    ].map((item, i) => (
                      <div key={i} className="flex gap-3 p-3 rounded-xl bg-white/5 border border-white/5">
                        <div className="mt-0.5 shrink-0">{item.icon}</div>
                        <div>
                          <p className="text-white font-black text-sm uppercase tracking-tight">{item.title}</p>
                          <p className="text-gray-500 text-xs font-medium mt-0.5">{item.desc}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Messaging block */}
              <div className="p-6 bg-emerald-950/40 border border-emerald-500/20 rounded-2xl space-y-3">
                <p className="text-emerald-300 font-black text-sm leading-snug">
                  "Relax — pay only what you would pay for movers & utilities. We handle the rest."
                </p>
                <p className="text-gray-400 text-xs font-medium leading-relaxed">
                  DeliWer earns an embedded coordination fee from vendors (10–15%), already included in market rates. Partners earn 30% of that fee. No extra charges reach you as the tenant.
                </p>
              </div>

              <Button
                data-testid="button-bundle-whatsapp"
                size="lg"
                className="w-full h-16 bg-emerald-600 hover:bg-emerald-500 text-white font-black uppercase tracking-widest rounded-2xl text-base shadow-xl shadow-emerald-500/20 transition-all"
                onClick={handleBundleWhatsApp}
              >
                <MessageSquare className="w-5 h-5 mr-2" />
                Book Starter Bundle on WhatsApp
              </Button>
              <p className="text-center text-[10px] text-gray-600 font-bold uppercase tracking-widest">No hidden fees · No upfront DeliWer charge · Just vendor market rates</p>
            </div>
          </div>
        </div>
      </section>
      <div className="py-12 border-y border-white/5 bg-slate-900/50">
        <div className="max-w-4xl mx-auto px-6 text-center space-y-4">
          <p className="text-emerald-400 font-black uppercase tracking-[0.3em] text-xs">Plan → Activate → Settle</p>
          <p className="text-gray-400 font-bold leading-relaxed uppercase text-[10px] tracking-widest max-w-2xl mx-auto">
            DeliWer provides move-in coordination services in Dubai, helping expatriates transition from Ejari to home activation.
          </p>
        </div>
      </div>
      <section id="service-cards" className="py-24 px-6 bg-slate-950">
        <div className="container mx-auto max-w-7xl">
          <div className="text-center mb-20 space-y-6">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-500/10 border border-emerald-500/20 rounded-full text-emerald-400 text-xs font-black uppercase tracking-widest mx-auto">
              <ShieldCheck className="w-4 h-4" /> 100% Home Service Solution
            </div>
            <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tighter">Your Move-In Steps</h2>
            <p className="text-slate-400 max-w-2xl mx-auto font-medium text-xl italic font-serif">A structured path to your new Dubai home.</p>
          </div>
          
          <div className="grid lg:grid-cols-3 gap-8">
            {/* STEP 1 — MOVE-IN PLANNING */}
            <Link href="/residents?stage=ejari">
              <Card className="bg-white/5 border-white/10 hover-elevate transition-all duration-300 rounded-[2.5rem] overflow-hidden h-full cursor-pointer flex flex-col">
                <CardContent className="p-10 space-y-6 flex-1 flex flex-col">
                  <div className="w-16 h-16 rounded-2xl bg-emerald-500/10 flex items-center justify-center text-emerald-400 border border-emerald-500/20">
                    <ClipboardList className="w-8 h-8" />
                  </div>
                  <h3 className="text-2xl font-black uppercase tracking-tight text-[#ffffff]">Step 1 — Move-In Planning Session</h3>
                  <p className="text-slate-400 font-bold leading-relaxed">
                    We structure everything between lease signing and home readiness.
                  </p>
                  <div className="space-y-2 pt-4 border-t border-white/5">
                    {[
                      "Ejari document checklist review",
                      "Trustee booking guidance",
                      "DEWA & utility timing plan",
                      "Internet & utilities sequencing",
                      "Move-in readiness roadmap",
                      "Water setup preview",
                      "WhatsApp coordination"
                    ].map((f, i) => (
                      <div key={i} className="flex gap-2 text-[10px] font-black uppercase tracking-widest text-gray-300 items-center">
                        <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                        {f}
                      </div>
                    ))}
                  </div>
                  <div className="p-4 bg-white/5 rounded-2xl border border-white/5 mt-4">
                    <p className="text-[10px] font-black uppercase text-emerald-400">FREE when bundled with Activation (AED 399)</p>
                    <p className="text-[10px] font-bold text-gray-500 uppercase">Standalone: AED 99</p>
                  </div>
                  <div className="mt-auto pt-8">
                    <Button className="w-full h-14 bg-emerald-600 hover:bg-emerald-500 text-white font-black uppercase tracking-widest rounded-xl">
                      Book Move-In Planning
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </Link>

            {/* STEP 2 — MOVE-IN ACTIVATION */}
            <Link href="/relocate?type=activation">
              <Card className="bg-slate-900 border-emerald-500/30 hover-elevate transition-all duration-300 rounded-[2.5rem] overflow-hidden h-full cursor-pointer flex flex-col scale-105 shadow-2xl shadow-emerald-500/5 z-10 border-2">
                <CardContent className="p-10 space-y-6 flex-1 flex flex-col">
                  <div className="flex justify-between items-start">
                    <div className="w-16 h-16 rounded-2xl bg-emerald-500 text-slate-950 flex items-center justify-center">
                      <Zap className="w-8 h-8" />
                    </div>
                    <Badge variant="outline" className="border-emerald-500/30 text-emerald-400 text-[10px] font-black uppercase px-3 py-1">
                      Most Popular
                    </Badge>
                  </div>
                  <h3 className="text-2xl font-black uppercase tracking-tight text-[#ffffff]">Step 2 — Move-In Activation (AED 399)</h3>
                  <p className="text-emerald-50 font-bold leading-relaxed">
                    A structured 60–90 minute visit to activate and prepare your apartment before move-in.
                  </p>
                  <div className="space-y-2 pt-4 border-t border-white/10">
                    {[
                      "Shower filter supply & installation",
                      "1 AC filter clean (removable filter only)",
                      "Water quality assessment",
                      "Personalized filtration recommendation",
                      "Essentials setup guidance",
                      "WhatsApp follow-up support"
                    ].map((f, i) => (
                      <div key={i} className="flex gap-2 text-[10px] font-black uppercase tracking-widest text-emerald-100 items-center">
                        <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                        {f}
                      </div>
                    ))}
                  </div>
                  <p className="text-[10px] font-black text-emerald-400 uppercase tracking-widest mt-4">Most customers bundle Planning + Activation and save AED 99.</p>
                  <div className="mt-auto pt-8">
                    <Button className="w-full h-14 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black uppercase tracking-widest rounded-xl shadow-xl shadow-emerald-500/20">
                      Book Move-In Activation
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </Link>

            {/* STEP 3 — RELOCATION SUPPORT */}
            <Link href="/relocate?type=relocation">
              <Card className="bg-white/5 border-white/10 hover-elevate transition-all duration-300 rounded-[2.5rem] overflow-hidden h-full cursor-pointer flex flex-col">
                <CardContent className="p-10 space-y-6 flex-1 flex flex-col">
                  <div className="w-16 h-16 rounded-2xl bg-blue-500/10 flex items-center justify-center text-blue-400 border border-blue-500/20">
                    <Package className="w-8 h-8" />
                  </div>
                  <h3 className="text-2xl font-black uppercase tracking-tight">Step 3 — Relocation & Family Support</h3>
                  <p className="text-slate-400 font-bold leading-relaxed">
                    For families and tenants requiring full coordination across utilities, scheduling, and phased move-in.
                  </p>
                  <div className="space-y-2 pt-4 border-t border-white/5">
                    <div className="flex gap-2 text-xs font-black uppercase tracking-widest text-gray-300 items-center">
                      <CheckCircle2 className="w-4 h-4 text-blue-400" />
                      Essential Relocation (AED 899)
                    </div>
                    <div className="flex gap-2 text-xs font-black uppercase tracking-widest text-gray-300 items-center">
                      <CheckCircle2 className="w-4 h-4 text-blue-400" />
                      Premium Relocation (AED 2499)
                    </div>
                  </div>
                  <div className="mt-auto pt-8">
                    <Button className="w-full h-14 bg-blue-600 hover:bg-blue-500 text-white font-black uppercase tracking-widest rounded-xl">
                      Explore Relocation Support
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </Link>
          </div>
        </div>
      </section>
      {/* How the Process Works */}
      <section className="py-20 px-6 bg-slate-900/30 border-y border-white/5">
        <div className="max-w-3xl mx-auto text-center space-y-10">
          <h2 className="text-2xl md:text-3xl font-black uppercase tracking-tighter text-white">How the Process Works</h2>
          <div className="space-y-4 text-left">
            {[
              { step: "1", text: "Tell us about your move-in" },
              { step: "2", text: "We coordinate planning for Ejari and relocation services" },
              { step: "3", text: "You confirm the services you need" },
              { step: "4", text: "Payment happens through the selected service providers" }
            ].map(({ step, text }) => (
              <div key={step} className="flex items-center gap-5 bg-white/5 border border-white/10 rounded-2xl px-6 py-4">
                <div className="w-9 h-9 rounded-xl bg-emerald-500 text-slate-950 font-black text-lg flex items-center justify-center flex-shrink-0">{step}</div>
                <span className="text-gray-200 font-medium">{text}</span>
              </div>
            ))}
          </div>
        </div>
      </section>
      {/* A Trusted Partner During Your Move */}
      <section className="py-20 px-6 bg-emerald-950/20 border-y border-emerald-500/10">
        <div className="max-w-3xl mx-auto text-center space-y-6">
          <ShieldCheck className="w-12 h-12 text-emerald-400 mx-auto" />
          <h2 className="text-3xl md:text-4xl font-black uppercase tracking-tighter text-white">
            A Trusted Partner During Your Move
          </h2>
          <p className="text-gray-300 text-lg leading-relaxed italic">
            Relocating can involve multiple providers and unexpected tasks.
          </p>
          <p className="text-gray-400 leading-relaxed max-w-xl mx-auto">
            DeliWer helps residents coordinate these services so the transition into their new home is more organized and less stressful.
          </p>
          <div className="flex flex-col md:flex-row gap-4 justify-center pt-2">
            <Link href="/ejari-dubai">
              <Button className="bg-emerald-600 hover:bg-emerald-500 text-white font-black rounded-2xl px-8 h-12 text-sm uppercase tracking-widest w-full md:w-auto" data-testid="button-ejari-trust">
                Start Ejari Registration
              </Button>
            </Link>
            <Link href="/relocate">
              <Button variant="outline" className="border-emerald-500/40 text-emerald-400 hover:bg-emerald-500/10 font-black rounded-2xl px-8 h-12 text-sm uppercase tracking-widest w-full md:w-auto" data-testid="button-movein-trust">
                Plan Your Move-In
              </Button>
            </Link>
          </div>
        </div>
      </section>
      {/* Trust / Living Image Section */}
      <section className="relative py-24 md:py-32 overflow-hidden text-white">
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${waterLifestyleImg})` }}
        />
        <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" />
        <div className="container mx-auto px-6 relative z-10 text-center max-w-4xl">
          <ShieldCheck className="w-16 h-16 text-emerald-400 mx-auto mb-8" />
          <h2 className="text-3xl md:text-5xl font-black mb-8 tracking-tighter uppercase leading-tight">
            Dubai Living, <span className="text-emerald-400">Organized.</span>
          </h2>
          <p className="text-xl text-slate-200 font-medium mb-12 italic font-serif">
            DeliWer is your Dubai move-in coordination partner — the team that turns tenancy into a settled home. We help tenants and expatriates plan their move, activate utilities and services, and set up clean water and living essentials with one WhatsApp-managed experience.
          </p>
          <Button 
            size="lg"
            className="bg-emerald-600 text-white font-black rounded-full px-12 h-16 text-lg hover:bg-emerald-500 transition-all active-elevate-2 shadow-2xl shadow-emerald-900/40"
            onClick={() => handleWhatsApp("General Consultation")}
          >
            WhatsApp Support
          </Button>
        </div>
      </section>
      {/* SEO Focused Paragraph */}
      <section className="py-12 bg-slate-950 border-b border-white/5">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <p className="text-gray-400 font-bold leading-relaxed uppercase text-xs tracking-widest">
            DeliWer provides move-in coordination services in Dubai, helping expatriates and tenants transition from tenancy paperwork (Ejari) to home activation and sustainable living. Our WhatsApp-managed approach simplifies planning, utilities, and water setup so you can settle in with confidence.
          </p>
        </div>
      </section>
      {/* Water Discovery Section */}
      <section id="water-setup-dubai" className="py-24 px-6 bg-slate-900 border-y border-white/5">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          <h2 className="text-3xl md:text-5xl font-black uppercase tracking-tighter text-white">Water Quality & Filtration — A Key Move-In Step</h2>
          <div className="space-y-4 text-gray-400 font-bold text-lg leading-relaxed">
            <p>
              Many tenants discover water quality issues after move-in. Our activation includes a water quality check and upgrade recommendations so you start with clean water from day one.
            </p>
            <p>
              This ensures your apartment is fully ready from day one — clean air, clean water, and properly activated utilities.
            </p>
          </div>
        </div>
      </section>
      {/* FAQ Section */}
      <section id="move-in-faq" className="py-24 px-6 bg-slate-950">
        <div className="max-w-4xl mx-auto space-y-16">
          <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tighter text-white text-center">Frequently Asked Questions</h2>
          <div className="grid gap-8">
            {[
              { q: "What is Move-In Planning?", a: "A structured session that prepares your documentation, utilities, and timeline for settling in." },
              { q: "Is Planning free?", a: "It’s FREE when you book Move-In Activation (AED 399), or AED 99 standalone." },
              { q: "What is included in Activation?", a: "Home readiness checks — AC, shower filter, water quality, and essentials." },
              { q: "Do you help with Ejari?", a: "Yes — through guidance and trustee coordination." }
            ].map((faq, i) => (
              <div key={i} className="p-8 bg-white/5 rounded-3xl border border-white/10 space-y-4">
                <h3 className="text-xl font-black uppercase text-emerald-400">{faq.q}</h3>
                <p className="text-gray-400 font-bold leading-relaxed uppercase text-xs tracking-widest">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      {/* Broker CTA */}
      <section className="py-8 px-4 bg-slate-950 border-b border-white/5">
        <div className="max-w-4xl mx-auto">
          <BrokerCTABanner context="RERA Broker? Refer your clients after lease signing. Earn AED 300–800 per move-in — no minimums, free to join." />
        </div>
      </section>
      {/* Trust Signal Strip */}
      {/* Payment CTA Banner */}
      <section className="py-10 px-4 bg-slate-950">
        <div className="max-w-4xl mx-auto">
          <PaymentCTA
            variant="banner"
            title="Ready to Pay for Your Services?"
            subtitle="Agreed services on WhatsApp? Pay securely via PayPal to formatix@deliwer.com — or ask us for bank transfer details for remote orders."
          />
        </div>
      </section>
      <section id="trust-strip" className="py-12 bg-emerald-950/20 border-y border-white/5">
        <div className="max-w-4xl mx-auto flex flex-wrap justify-center gap-8 md:gap-16 text-center">
          {[
            "✔ Transparent scope",
            "✔ No hidden activation fees",
            "✔ WhatsApp coordination",
            "✔ Designed for Dubai tenants"
          ].map((trust, i) => (
            <span key={i} className="text-emerald-400 font-black uppercase tracking-widest text-xs">{trust}</span>
          ))}
        </div>
      </section>
      {/* Simple Footer */}
      <footer className="py-16 px-4 border-t border-white/5 bg-slate-950">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          <div className="flex justify-center">
            <img src="/deliwer-logo.png" alt="DeliWer Logo" className="h-12 w-auto brightness-110" />
          </div>
          <div className="flex flex-col md:flex-row justify-center items-center gap-8">
            <a href="https://wa.me/971523946311" className="text-emerald-400 font-black uppercase tracking-widest text-sm hover:underline">WhatsApp Support</a>
            <a href="mailto:service@deliwer.com" className="text-gray-400 font-bold hover:text-white">service@deliwer.com</a>
            <span className="text-gray-600 text-sm font-bold uppercase tracking-tight">Dubai, United Arab Emirates</span>
          </div>
          <p className="text-gray-700 text-[10px] font-black uppercase tracking-[0.3em]">© 2026 DELIWER HOME SERVICES. ALL RIGHTS RESERVED.</p>
        </div>
      </footer>
    </div>
  );
}
