import { Link } from "wouter";
import {
  Droplets, Leaf, Phone, Gift,
  Smartphone, Crown, Recycle, Globe, TreePine, Flame,
  Utensils, Sparkles, ArrowRight, Heart,
  MapPin, Coffee, Salad, Soup, Trophy, Zap,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import aquacafeLogo from "@assets/AquaCafe_Logo_1756289482990.png";
import earnHeroBanner from "@assets/banner_1776801988936.jpg";
import bakersKitchenLogo from "@assets/BK_Logo_1756289175349.jpg";
import showerFilterCollage from "@assets/collage_1755270492135.jpg";
import membershipCard from "@assets/Aquacafe_byDeliWer_Card_Corners_1755482696304.png";

const PILLARS = [
  {
    icon: Droplets, accent: "from-cyan-500 to-blue-600", border: "border-cyan-500/40",
    tag: "AquaCafe · Water Track", title: "Ditch Plastic Bottles",
    desc: "Switch to alkaline Kangen water at home. Every refill earns DXBs and removes a single-use bottle from the ecosystem.",
    cta: "Get Starter Kit", href: "#section-bundle", dxb: "1,000 DXBs welcome bonus",
    testid: "pillar-aquacafe",
  },
  {
    icon: Recycle, accent: "from-blue-500 to-violet-600", border: "border-blue-500/40",
    tag: "Electronics · Trade-In", title: "Upgrade & Earn",
    desc: "Trade old iPhones and electronics for DXBs. Prevent e-waste, recover precious metals and get rewarded for circular action.",
    cta: "Trade Your iPhone", href: "/exchange", dxb: "Up to 5,000 DXBs per trade",
    testid: "pillar-exchange",
  },
  {
    icon: Sparkles, accent: "from-violet-500 to-rose-500", border: "border-violet-500/40",
    tag: "Wellness · Dining", title: "Live Well, Eat Well",
    desc: "Attend sustainability and wellness events, dine at partner restaurants, and redeem DXBs for meals across Dubai.",
    cta: "See Partners", href: "#section-wellness", dxb: "Up to 1,000 DXBs per event",
    testid: "pillar-wellness",
  },
];

const RESTAURANT_PARTNERS = [
  { name: "Chill & Grill", location: "Business Bay · Clover Bay Tower", perk: "Healthy set lunch · AED 89 value", accent: "from-emerald-500 to-teal-600", icon: Salad },
  { name: "AquaCafe", location: "Clover Bay Tower, Business Bay", perk: "Kangen water tasting + light bite", accent: "from-cyan-500 to-blue-600", icon: Coffee },
  { name: "Green Bowl Co.", location: "JLT Cluster R", perk: "Plant-forward bowl on us", accent: "from-lime-500 to-emerald-600", icon: Soup },
];

const WELLNESS_EVENTS = [
  { icon: Heart, color: "text-rose-400", accent: "from-rose-500 to-pink-600", title: "Fitness & Mindfulness", desc: "Yoga and breathwork sessions with sustainability-certified instructors. Show your Planet Hero card at the door.", dxb: "500 DXBs / session" },
  { icon: TreePine, color: "text-emerald-400", accent: "from-emerald-500 to-teal-600", title: "Community Eco Events", desc: "Beach cleanups, park planting days and e-waste drives across Dubai. Each checked-in event earns DXBs.", dxb: "300–1,000 DXBs" },
];

export default function Earn() {
  return (
    <div className="min-h-screen w-full max-w-full overflow-x-hidden bg-slate-950">

      {/* ── Earn Submenu ── */}
      <nav className="relative z-30 w-full bg-slate-950/95 backdrop-blur border-y border-emerald-500/30 shadow-lg pt-[40px] sm:pt-[50px]" data-testid="earn-submenu">
        <div className="max-w-7xl mx-auto px-3 py-3 overflow-x-auto">
          <div className="flex items-center gap-2 min-w-max">
            {[
              { id: 'section-pillars', label: 'Activities', icon: Globe },
              { id: 'section-bundle', label: 'Starter Kit', icon: Gift },
              { id: 'section-tradein', label: 'Trade-In', icon: Smartphone },
              { id: 'section-wellness', label: 'Wellness & Dining', icon: Utensils },
              { id: 'section-play', label: 'Play & Earn', icon: Trophy },
            ].map((item) => {
              const Icon = item.icon;
              return (
                <button key={item.id}
                  onClick={() => { const el = document.getElementById(item.id); if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' }); }}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-slate-800/60 hover:bg-emerald-600/30 border border-slate-700 hover:border-emerald-500/60 text-gray-300 hover:text-white text-xs sm:text-sm font-semibold transition-all whitespace-nowrap"
                  data-testid={`submenu-${item.label.toLowerCase().replace(/\s+/g, '-')}`}>
                  <Icon className="w-3.5 h-3.5" />
                  {item.label}
                </button>
              );
            })}
          </div>
        </div>
      </nav>

      {/* ── HERO ── */}
      <section className="w-full relative overflow-hidden" data-testid="earn-hero-section">
        <div className="relative w-full">
          <img src={earnHeroBanner} alt="Say No To Plastic — Dubai sustainability through AquaCafe by DeliWer"
            className="w-full h-[420px] sm:h-[520px] md:h-[600px] object-cover" data-testid="img-earn-hero-banner" />
          <div className="absolute inset-0 bg-gradient-to-b from-slate-950/60 via-slate-950/55 to-emerald-950/85" />
          <div className="absolute inset-0 flex items-center">
            <div className="w-full max-w-6xl mx-auto px-4 sm:px-6 text-center">
              <div className="inline-flex items-center gap-2 bg-emerald-500/20 backdrop-blur text-emerald-200 px-4 sm:px-5 py-2 rounded-full mb-5 border border-emerald-300/40 font-bold text-xs sm:text-sm uppercase tracking-widest">
                <Leaf className="w-4 h-4" />Say No To Plastic<Leaf className="w-4 h-4" />
              </div>
              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black text-white mb-4 sm:mb-5 leading-[1.05] drop-shadow-2xl">
                Say No To Plastic.
                <span className="block bg-gradient-to-r from-emerald-300 via-cyan-300 to-amber-300 bg-clip-text text-transparent">Lunch is on us.</span>
              </h1>
              <p className="text-base sm:text-lg md:text-xl text-slate-100 mb-7 max-w-3xl mx-auto leading-relaxed drop-shadow">
                <strong className="text-white">AquaCafe by DeliWer</strong> is more than a deal — it's a{" "}
                <strong className="text-emerald-300">loyalty member network</strong> with a clear career path.
                Start with <strong className="text-amber-300">Kangen Water home services</strong> as your gateway,
                graduate into Move-in &amp; Setup home services, and earn lifetime rewards at every step.
              </p>
              <a
                href={`https://wa.me/971523946311?text=${encodeURIComponent("Hi DeliWer! I'd like to order the AquaCafe AED 99 Starter Kit and join the Loyalty Network — please get me started.")}`}
                target="_blank" rel="noopener noreferrer" data-testid="button-wa-order-starter-kit"
                className="inline-flex items-center justify-center bg-[#25D366] hover:bg-[#1ebe57] text-white px-8 py-4 rounded-full text-base sm:text-lg font-black shadow-2xl transition-all hover:scale-105">
                <Phone className="w-5 h-5 mr-2" />Order AED 99 Starter Kit on WhatsApp
              </a>
              <div className="text-xs sm:text-sm text-slate-300 mt-3">
                Includes FREE Ionic Shower Filter · Membership Card · 1,000 Welcome DXBs ·{" "}
                <span className="text-amber-300 font-semibold">AED 1,000+ lifetime value</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── IDENTITY BANNER ── */}
      <section className="w-full py-10 px-4 bg-gradient-to-r from-emerald-950/60 via-slate-950 to-blue-950/60 border-b border-emerald-500/20" data-testid="identity-banner">
        <div className="max-w-5xl mx-auto text-center">
          <div className="flex flex-wrap items-center justify-center gap-3 mb-4">
            <img src={aquacafeLogo} alt="AquaCafe by DeliWer" className="h-10 w-auto object-contain" />
            <span className="text-white/30 text-2xl font-thin">×</span>
            <div className="inline-flex items-center gap-2 bg-amber-500/20 text-amber-300 px-4 py-1.5 rounded-full border border-amber-400/40 text-xs font-black uppercase tracking-widest">
              <Globe className="w-3.5 h-3.5" /> Dubai Planet Heroes
            </div>
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-white mb-3 leading-tight">
            The World's Most Unique Loyalty Programme
          </h2>
          <p className="text-slate-300 text-base sm:text-lg max-w-3xl mx-auto leading-relaxed">
            We reward your eco-friendly lifestyle with <strong className="text-emerald-300">DXB tokens</strong> — from switching to filtered water and trading in old electronics, to decarbonising your routine and joining wellness missions. Every action for the planet earns you something back.
          </p>
          <div className="flex flex-wrap justify-center gap-3 mt-6">
            <Badge className="bg-emerald-500/15 text-emerald-300 border-emerald-500/30 px-3 py-1.5 text-xs font-bold"><Recycle className="w-3 h-3 mr-1.5 inline" />E-Waste Circularity</Badge>
            <Badge className="bg-cyan-500/15 text-cyan-300 border-cyan-500/30 px-3 py-1.5 text-xs font-bold"><Droplets className="w-3 h-3 mr-1.5 inline" />Plastic Elimination</Badge>
            <Badge className="bg-blue-500/15 text-blue-300 border-blue-500/30 px-3 py-1.5 text-xs font-bold"><Flame className="w-3 h-3 mr-1.5 inline" />Climate Decarbonisation</Badge>
            <Badge className="bg-amber-500/15 text-amber-300 border-amber-500/30 px-3 py-1.5 text-xs font-bold"><Sparkles className="w-3 h-3 mr-1.5 inline" />Gamified Missions</Badge>
          </div>
        </div>
      </section>

      {/* ── 3 PILLARS ── */}
      <section id="section-pillars" className="w-full py-14 px-4 bg-slate-950 scroll-mt-[200px]" data-testid="section-pillars">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-10">
            <p className="text-xs font-black uppercase tracking-widest text-emerald-400 mb-2">Community Sustainability Activities</p>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-white">Three Ways to Earn for the Planet</h2>
            <p className="text-slate-400 mt-2 max-w-2xl mx-auto">Each activity is a mission. Every mission earns DXBs. Every DXB redeems for meals, upgrades and experiences.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-5">
            {PILLARS.map((p) => {
              const Icon = p.icon;
              return (
                <div key={p.testid} data-testid={p.testid}
                  className={`relative bg-slate-900/70 rounded-2xl border ${p.border} overflow-hidden flex flex-col group hover:scale-[1.02] transition-transform`}>
                  <div className={`h-1.5 bg-gradient-to-r ${p.accent}`} />
                  <div className="p-6 flex flex-col flex-1">
                    <div className={`inline-flex w-12 h-12 rounded-xl bg-gradient-to-br ${p.accent} items-center justify-center mb-4`}>
                      <Icon className="w-6 h-6 text-white" />
                    </div>
                    <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-1">{p.tag}</p>
                    <h3 className="text-xl font-black text-white mb-2">{p.title}</h3>
                    <p className="text-slate-400 text-sm leading-relaxed flex-1">{p.desc}</p>
                    <div className="mt-4 flex items-center justify-between">
                      <span className="text-xs font-bold text-emerald-300 bg-emerald-500/10 border border-emerald-500/30 px-2.5 py-1 rounded-full">{p.dxb}</span>
                      <Link href={p.href} data-testid={`cta-${p.testid}`}
                        className={`inline-flex items-center gap-1.5 text-sm font-bold text-white bg-gradient-to-r ${p.accent} px-4 py-2 rounded-full hover:opacity-90 transition`}>
                        {p.cta} <ArrowRight className="w-3.5 h-3.5" />
                      </Link>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── STARTER KIT BUNDLE ── */}
      <section id="section-bundle" className="w-full py-14 px-4 bg-gradient-to-br from-slate-950 to-emerald-950/30 border-y border-emerald-500/20 scroll-mt-[200px]" data-testid="aquacafe-loyalty-bundle-section">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-8">
            <div className="inline-flex items-center gap-2 bg-amber-500/20 text-amber-300 px-4 py-2 rounded-full mb-3 border border-amber-400/40 text-xs sm:text-sm font-bold uppercase tracking-widest">
              <Gift className="w-4 h-4" />AquaCafe Loyalty Bundle · AED 1,000+ value
            </div>
            <h3 className="text-2xl sm:text-3xl md:text-4xl font-black text-white">
              One AED 99 Kit. <span className="text-emerald-400">Three Lifetime Benefits.</span>
            </h3>
            <p className="text-gray-300 mt-2 max-w-xl mx-auto text-sm sm:text-base">
              One WhatsApp message. No forms, no waiting — we deliver and install.
            </p>
          </div>

          {/* Three benefit cards — big images */}
          <div className="grid md:grid-cols-3 gap-5 mb-8" data-testid="loyalty-bundle-section">
            {/* Card 1 — Shower Filter */}
            <div className="bg-slate-900/80 rounded-2xl border border-cyan-500/40 overflow-hidden flex flex-col" data-testid="bundle-card-shower">
              <img src={showerFilterCollage} alt="Free Ionic Shower Filter"
                className="w-full h-48 object-cover" />
              <div className="p-5 flex flex-col flex-1">
                <Badge className="self-start bg-amber-500/30 text-amber-300 text-[10px] px-2 py-0 mb-2">Worth AED 399</Badge>
                <h4 className="text-base font-bold text-white mb-1">FREE Ionic Shower Filter</h4>
                <p className="text-xs text-gray-400 flex-1">Installed at home — purer water for skin and hair from day one.</p>
              </div>
            </div>

            {/* Card 2 — Membership Card */}
            <div className="bg-slate-900/80 rounded-2xl border border-blue-500/40 overflow-hidden flex flex-col" data-testid="bundle-card-membership">
              <img src={membershipCard} alt="AquaCafe Membership Card"
                className="w-full h-48 object-cover" />
              <div className="p-5 flex flex-col flex-1">
                <Badge className="self-start bg-amber-500/30 text-amber-300 text-[10px] px-2 py-0 mb-2">Worth AED 299</Badge>
                <h4 className="text-base font-bold text-white mb-1">Membership Card & Pro Install</h4>
                <p className="text-xs text-gray-400 flex-1">Lifetime support, priority installs and your referral link activated.</p>
              </div>
            </div>

            {/* Card 3 — Wellness & Dining (links to section) */}
            <Link href="#section-wellness" data-testid="bundle-card-wellness"
              className="bg-slate-900/80 rounded-2xl border border-amber-500/40 overflow-hidden flex flex-col group hover:border-amber-400/70 transition">
              <div className="w-full h-48 bg-gradient-to-br from-amber-500/30 via-orange-500/20 to-rose-500/20 flex flex-col items-center justify-center gap-3 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-amber-500 to-orange-600 opacity-20" />
                <img src={bakersKitchenLogo} alt="Chill & Grill" className="h-16 w-auto object-contain relative z-10 opacity-90" />
                <div className="flex gap-2 relative z-10">
                  <Utensils className="w-6 h-6 text-amber-300" />
                  <Heart className="w-6 h-6 text-rose-300" />
                </div>
              </div>
              <div className="p-5 flex flex-col flex-1">
                <Badge className="self-start bg-amber-500/30 text-amber-300 text-[10px] px-2 py-0 mb-2">Per referral</Badge>
                <h4 className="text-base font-bold text-white mb-1">Wellness & Dining Vouchers</h4>
                <p className="text-xs text-gray-400 flex-1">AED 100 Chill &amp; Grill voucher + wellness events access for every friend you bring. <span className="text-amber-400 font-bold group-hover:underline">See all partners →</span></p>
              </div>
            </Link>
          </div>

          {/* Single zero-friction CTA */}
          <div className="text-center">
            <a
              href={`https://wa.me/971523946311?text=${encodeURIComponent("Hi DeliWer! I'd like the AquaCafe AED 99 Starter Kit — please activate my membership and referral link.")}`}
              target="_blank" rel="noopener noreferrer" data-testid="button-bundle-wa"
              className="inline-flex items-center justify-center bg-[#25D366] hover:bg-[#1ebe57] text-white font-black px-10 py-4 rounded-full text-base sm:text-lg shadow-2xl transition-all hover:scale-105">
              <Phone className="w-5 h-5 mr-2" />Get Started on WhatsApp · AED 99
            </a>
            <p className="text-slate-500 text-xs mt-3">FREE Ionic Shower Filter · Membership Card · 1,000 Welcome DXBs</p>
          </div>
        </div>
      </section>

      {/* ── ELECTRONICS EXCHANGE ── */}
      <section id="section-tradein" className="w-full py-14 px-4 bg-gradient-to-br from-blue-950/20 via-slate-950 to-violet-950/20 border-b border-blue-500/20 scroll-mt-[200px]" data-testid="section-tradein">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-10">
            <div className="inline-flex items-center gap-2 bg-blue-500/15 text-blue-300 border border-blue-500/30 px-4 py-2 rounded-full text-xs font-black uppercase tracking-widest mb-4">
              <Recycle className="w-3.5 h-3.5" /> Upgrade & Exchange
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-white mb-3">
              Trade Old Electronics. <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-violet-400">Earn Big.</span>
            </h2>
            <p className="text-slate-400 max-w-2xl mx-auto">Inspired by The Circle Dubai — every device you trade in prevents e-waste, recovers precious metals and earns you DXB tokens.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-5 mb-8">
            {[
              { icon: Smartphone, color: "text-blue-400", bg: "bg-blue-500/10 border-blue-500/30", title: "Check Your Device Value", desc: "Instant valuation for any iPhone or Android — get your DXBs estimate in seconds.", cta: "Get Quote →", href: "/exchange", testid: "tradein-check-value" },
              { icon: Leaf, color: "text-emerald-400", bg: "bg-emerald-500/10 border-emerald-500/30", title: "Environmental Impact", desc: "One traded device prevents up to 80kg of CO₂, recovers gold, silver and rare metals.", cta: "See Impact →", href: "/environmental", testid: "tradein-impact" },
              { icon: Zap, color: "text-purple-400", bg: "bg-purple-500/10 border-purple-500/30", title: "Stack Your DXBs", desc: "Every trade-in earns up to 5,000 DXBs. Redeem for meals, wellness events or upgrades.", cta: "Play & Earn →", href: "/play", testid: "tradein-play" },
            ].map((c) => {
              const Icon = c.icon;
              return (
                <div key={c.testid} data-testid={c.testid}
                  className={`bg-slate-900/70 rounded-2xl border ${c.bg} p-5 flex flex-col gap-3 hover:scale-[1.01] transition-transform`}>
                  <Icon className={`w-7 h-7 ${c.color}`} />
                  <h3 className="text-base font-bold text-white">{c.title}</h3>
                  <p className="text-slate-400 text-sm leading-relaxed flex-1">{c.desc}</p>
                  <Link href={c.href} className={`text-sm font-bold ${c.color} hover:underline`}>{c.cta}</Link>
                </div>
              );
            })}
          </div>
          <div className="bg-slate-900/50 rounded-2xl border border-blue-500/20 overflow-hidden" data-testid="tradein-how-it-works">
            <div className="bg-slate-900/40 border-b border-blue-500/20 px-5 py-3 text-center">
              <h4 className="text-xs sm:text-sm font-bold text-white uppercase tracking-wider">How iPhone Trade-In Works</h4>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 p-5 sm:p-6">
              {[
                { n: 1, ring: 'bg-blue-500/20 border-blue-500/40', text: 'text-blue-400', title: 'Get Quote', desc: 'Select model & condition' },
                { n: 2, ring: 'bg-cyan-500/20 border-cyan-500/40', text: 'text-cyan-400', title: 'Ship or Drop-off', desc: 'Free pickup or visit us' },
                { n: 3, ring: 'bg-emerald-500/20 border-emerald-500/40', text: 'text-emerald-400', title: 'Verification', desc: 'We inspect your device' },
                { n: 4, ring: 'bg-purple-500/20 border-purple-500/40', text: 'text-purple-400', title: 'Get Rewarded', desc: 'Instant DXBs + credit' },
              ].map((s) => (
                <div key={s.n} className="flex md:flex-col items-center md:text-center gap-2.5">
                  <div className={`w-9 h-9 ${s.ring} border rounded-full flex items-center justify-center flex-shrink-0`}>
                    <span className={`text-sm font-black ${s.text}`}>{s.n}</span>
                  </div>
                  <div className="flex-1">
                    <h5 className="text-white font-bold text-xs sm:text-sm">{s.title}</h5>
                    <p className="text-gray-400 text-[11px] sm:text-xs mt-0.5">{s.desc}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="px-5 pb-5 flex justify-center">
              <Link href="/exchange" data-testid="button-tradein-cta"
                className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-600 to-violet-600 hover:from-blue-500 hover:to-violet-500 text-white font-black px-8 py-3 rounded-full text-sm sm:text-base shadow-xl transition">
                <Smartphone className="w-5 h-5" /> Start Trade-In
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── WELLNESS & RESTAURANT PARTNERS (merged) ── */}
      <section id="section-wellness" className="w-full py-14 px-4 bg-gradient-to-br from-violet-950/20 via-slate-950 to-amber-950/10 border-b border-violet-500/20 scroll-mt-[200px]" data-testid="section-wellness">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-10">
            <div className="inline-flex items-center gap-2 bg-violet-500/15 text-violet-300 border border-violet-500/30 px-4 py-2 rounded-full text-xs font-black uppercase tracking-widest mb-4">
              <Sparkles className="w-3.5 h-3.5" /> Wellness Events & Restaurant Partners
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-white mb-3">Earn DXBs. Redeem for Real Lunches.</h2>
            <p className="text-slate-400 max-w-2xl mx-auto">Attend events, dine at partner restaurants and redeem your DXBs for set lunches and dining vouchers across Dubai.</p>
          </div>

          {/* Wellness event types */}
          <div className="grid sm:grid-cols-2 gap-5 mb-8">
            {WELLNESS_EVENTS.map((e, i) => {
              const Icon = e.icon;
              return (
                <div key={i} data-testid={`wellness-card-${i}`}
                  className="bg-slate-900/70 rounded-2xl border border-violet-500/20 overflow-hidden hover:scale-[1.01] transition-transform">
                  <div className={`h-1.5 bg-gradient-to-r ${e.accent}`} />
                  <div className="p-5 flex gap-4">
                    <div className={`inline-flex w-11 h-11 rounded-xl bg-gradient-to-br ${e.accent} items-center justify-center flex-shrink-0`}>
                      <Icon className="w-5 h-5 text-white" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-base font-bold text-white mb-1">{e.title}</h3>
                      <p className="text-slate-400 text-sm leading-relaxed mb-2">{e.desc}</p>
                      <span className={`text-xs font-bold ${e.color} bg-slate-800 border border-white/10 px-2.5 py-1 rounded-full`}>{e.dxb}</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Restaurant partners */}
          <h3 className="text-base font-black text-white uppercase tracking-widest text-center mb-5 opacity-70">
            <Utensils className="w-4 h-4 inline mr-2 opacity-60" />Restaurant Partner Directory
          </h3>
          <div className="grid md:grid-cols-3 gap-5 mb-8">
            {RESTAURANT_PARTNERS.map((r) => {
              const Icon = r.icon;
              return (
                <div key={r.name} data-testid={`card-restaurant-${r.name.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`}
                  className="bg-slate-900/70 rounded-2xl border border-slate-800 hover:border-emerald-500/40 transition overflow-hidden">
                  <div className={`h-1.5 bg-gradient-to-r ${r.accent}`} />
                  <div className="p-5 space-y-3">
                    <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${r.accent} flex items-center justify-center`}>
                      <Icon className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h4 className="text-lg font-bold text-white">{r.name}</h4>
                      <p className="text-xs uppercase tracking-widest text-slate-400 font-bold mt-0.5 flex items-center gap-1">
                        <MapPin className="w-3 h-3" />{r.location}
                      </p>
                    </div>
                    <p className="text-slate-300 text-sm">{r.perk}</p>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Partner logo row */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6 bg-slate-900/50 rounded-2xl border border-white/10 p-5" data-testid="wellness-partners-row">
            <div className="flex flex-col items-center gap-1">
              <img src={aquacafeLogo} alt="AquaCafe by DeliWer" className="h-12 w-auto object-contain" />
              <span className="text-[10px] font-black uppercase tracking-widest text-cyan-400">Water Filtration</span>
            </div>
            <span className="text-3xl font-black text-white/20">×</span>
            <div className="flex flex-col items-center gap-1">
              <img src={bakersKitchenLogo} alt="Chill & Grill" className="h-12 w-auto object-contain" />
              <span className="text-[10px] font-black uppercase tracking-widest text-amber-400">Healthy Dining · Open Daily 9AM–11PM</span>
            </div>
            <div className="sm:ml-auto text-center sm:text-right">
              <a href={`https://wa.me/971523946311?text=${encodeURIComponent("Hi DeliWer — I run a restaurant in Dubai and would love to join the Planet Hero loyalty programme.")}`}
                target="_blank" rel="noopener noreferrer" data-testid="button-restaurant-apply"
                className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-300 hover:text-white border border-slate-700 hover:border-slate-500 px-4 py-2 rounded-full transition">
                Add my restaurant <ArrowRight className="w-3 h-3" />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ── PLAY & EARN ── */}
      <section id="section-play" className="w-full py-14 px-4 bg-gradient-to-br from-amber-950/30 via-slate-950 to-emerald-950/20 border-b border-amber-500/20 scroll-mt-[200px]" data-testid="section-play">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 bg-amber-500/15 text-amber-300 border border-amber-500/30 px-4 py-2 rounded-full text-xs font-black uppercase tracking-widest mb-5">
            <Trophy className="w-3.5 h-3.5" /> Play & Earn DXBs
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-white mb-4 leading-tight">
            Keep Coming Back.<br className="hidden sm:block" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-orange-400">More Play = More DXBs.</span>
          </h2>
          <p className="text-slate-300 text-base sm:text-lg max-w-xl mx-auto mb-8 leading-relaxed">
            Daily challenges, eco-games and community missions — each completed task drops DXBs directly to your Planet Hero balance. No purchase needed to play.
          </p>
          <div className="grid sm:grid-cols-3 gap-4 mb-8 text-left">
            {[
              { icon: Zap, color: "text-amber-400", bg: "bg-amber-500/10 border-amber-500/30", title: "Daily Challenges", desc: "Short sustainable actions that refresh every 24 hours. Streak bonuses multiply your DXBs." },
              { icon: Globe, color: "text-emerald-400", bg: "bg-emerald-500/10 border-emerald-500/30", title: "Eco Missions", desc: "Report plastic waste, log refills and plant pledges. Real-world actions, real rewards." },
              { icon: Heart, color: "text-rose-400", bg: "bg-rose-500/10 border-rose-500/30", title: "Community Leaderboard", desc: "Compete with Dubai Planet Heroes for weekly prize pools and VIP event invitations." },
            ].map((c, i) => {
              const Icon = c.icon;
              return (
                <div key={i} className={`bg-slate-900/70 rounded-2xl border ${c.bg} p-5`} data-testid={`play-card-${i}`}>
                  <Icon className={`w-6 h-6 ${c.color} mb-3`} />
                  <h4 className="text-sm font-bold text-white mb-1">{c.title}</h4>
                  <p className="text-slate-400 text-xs leading-relaxed">{c.desc}</p>
                </div>
              );
            })}
          </div>
          <Link href="/play" data-testid="cta-play"
            className="inline-flex items-center justify-center gap-2 bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 text-white font-black px-10 py-4 rounded-full text-base sm:text-lg shadow-2xl transition hover:scale-105">
            <Trophy className="w-5 h-5" /> Start Playing & Earning
          </Link>
        </div>
      </section>

      {/* ── ENVIRONMENTAL CTA ── */}
      <section className="w-full py-14 px-4 bg-gradient-to-br from-emerald-950/40 via-slate-950 to-cyan-950/30" data-testid="section-environmental-cta">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 bg-emerald-500/15 text-emerald-300 border border-emerald-500/30 px-4 py-2 rounded-full text-xs font-black uppercase tracking-widest mb-5">
            <Globe className="w-3.5 h-3.5" /> Environmental Action
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-white mb-4 leading-tight">
            The Planet Is the Heart of<br className="hidden sm:block" /> Our Business Model.
          </h2>
          <p className="text-slate-300 text-base sm:text-lg max-w-2xl mx-auto mb-7 leading-relaxed">
            Every DXB token earned maps to a verified environmental action — less plastic, fewer devices in landfill, cleaner water and lower carbon. See the real impact your choices are making.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link href="/environmental" data-testid="cta-environmental"
              className="inline-flex items-center justify-center gap-2 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-black px-8 py-4 rounded-full text-base shadow-2xl transition hover:scale-105">
              <TreePine className="w-5 h-5" /> See Our Environmental Impact
            </Link>
            <Link href="/taf" data-testid="cta-tell-a-friend"
              className="inline-flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 text-white border border-white/20 font-bold px-8 py-4 rounded-full text-base transition">
              <Heart className="w-5 h-5" /> Tell a Friend · Get Free Lunch
            </Link>
          </div>
        </div>
      </section>

      {/* ── FOOTER CTA ── */}
      <footer className="w-full border-t border-emerald-500/20 bg-slate-950" data-testid="earn-footer">
        <div className="max-w-6xl mx-auto px-4 py-10">
          <div className="text-center mb-7">
            <h3 className="text-xl sm:text-2xl font-black text-white mb-2">Ready to Become a Planet Hero?</h3>
            <p className="text-slate-400 text-sm">Join Dubai's growing community earning rewards while building a sustainable future.</p>
          </div>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <a href={`https://wa.me/971523946311?text=${encodeURIComponent("Hi DeliWer! I'd like to order the AquaCafe AED 99 Starter Kit and join the Planet Heroes — please get me started.")}`}
              target="_blank" rel="noopener noreferrer" data-testid="footer-cta-wa"
              className="inline-flex items-center gap-2 bg-[#25D366] hover:bg-[#1ebe57] text-white font-black px-7 py-3 rounded-full text-sm shadow-lg transition hover:scale-105">
              <Phone className="w-4 h-4" /> Order Starter Kit on WhatsApp
            </a>
            <Link href="/exchange" data-testid="footer-cta-exchange"
              className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-bold px-7 py-3 rounded-full text-sm shadow-lg transition">
              <Smartphone className="w-4 h-4" /> Trade Your iPhone
            </Link>
            <Link href="/play" data-testid="footer-cta-play"
              className="inline-flex items-center gap-2 bg-amber-600 hover:bg-amber-700 text-white font-bold px-7 py-3 rounded-full text-sm shadow-lg transition">
              <Trophy className="w-4 h-4" /> Play & Earn
            </Link>
            <Link href="/taf" data-testid="footer-cta-taf"
              className="inline-flex items-center gap-2 bg-slate-700 hover:bg-slate-600 text-white font-bold px-7 py-3 rounded-full text-sm shadow-lg transition">
              <Heart className="w-4 h-4" /> Tell a Friend
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
