import { useState } from "react";
import { Link } from "wouter";
import {
  Droplets, Leaf, Phone, Gift,
  Smartphone, Crown, Recycle, Globe, TreePine, Flame,
  Utensils, Sparkles, ArrowRight, Heart,
  MapPin, Coffee, Salad, Soup, Trophy, Zap, ChevronDown,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import aquacafeLogo from "@assets/AquaCafe_Logo_1756289482990.png";
import earnHeroBanner from "@assets/banner_1776801988936.jpg";
import bakersKitchenLogo from "@assets/BK_Logo_1756289175349.jpg";
import showerFilterCollage from "@assets/collage_1755270492135.jpg";
import membershipCard from "@assets/Aquacafe_byDeliWer_Card_Corners_1755482696304.png";
import wellnessDiningImg from "@assets/stock_images/happy_people_eating__cf5d7d81.jpg";

const STEPS = [
  {
    n: "1",
    sectionId: "section-bundle",
    accent: "from-cyan-500 to-blue-600",
    border: "border-cyan-500/40",
    color: "text-cyan-300",
    icon: Droplets,
    title: "Upgrade your water",
    sub: "AED 99 Starter Kit — alkaline Kangen water at home, FREE shower filter installed.",
    dxb: "1,000 DXBs",
  },
  {
    n: "2",
    sectionId: "section-tradein",
    accent: "from-blue-500 to-violet-600",
    border: "border-blue-500/40",
    color: "text-blue-300",
    icon: Smartphone,
    title: "Trade old electronics",
    sub: "Hand in any iPhone or device. Recover metals, earn DXBs, fund your next upgrade.",
    dxb: "Up to 5,000 DXBs",
  },
  {
    n: "3",
    sectionId: "section-wellness",
    accent: "from-amber-500 to-orange-500",
    border: "border-amber-500/40",
    color: "text-amber-300",
    icon: Utensils,
    title: "Redeem for real meals",
    sub: "Use DXBs for set lunches at Chill & Grill and partner restaurants across Dubai.",
    dxb: "AED 89–100 vouchers",
  },
];

const RESTAURANT_PARTNERS = [
  { name: "Chill & Grill", location: "Business Bay · Clover Bay Tower", perk: "Healthy set lunch · AED 89 value", accent: "from-emerald-500 to-teal-600", icon: Salad },
  { name: "AquaCafe", location: "Clover Bay Tower, Business Bay", perk: "Kangen water tasting + light bite", accent: "from-cyan-500 to-blue-600", icon: Coffee },
  { name: "Green Bowl Co.", location: "JLT Cluster R", perk: "Plant-forward bowl on us", accent: "from-lime-500 to-emerald-600", icon: Soup },
];

function CollapsibleSection({
  id, testid, children, summary, defaultOpen = false,
}: {
  id: string; testid: string; children: React.ReactNode;
  summary: React.ReactNode; defaultOpen?: boolean;
}) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <section id={id} className="w-full border-b border-white/10 scroll-mt-[200px]" data-testid={testid}>
      {/* Always-visible summary row */}
      <button
        onClick={() => setOpen((o) => !o)}
        data-testid={`toggle-${testid}`}
        className="w-full flex items-center justify-between gap-4 px-4 py-5 sm:px-8 hover:bg-white/[0.03] transition text-left"
        aria-expanded={open}
      >
        <div className="flex-1 min-w-0">{summary}</div>
        <ChevronDown
          className={`w-5 h-5 text-slate-400 flex-shrink-0 transition-transform duration-300 ${open ? "rotate-180" : ""}`}
        />
      </button>
      {/* Collapsible body */}
      <div className={`overflow-hidden transition-all duration-500 ease-in-out ${open ? "max-h-[9999px] opacity-100" : "max-h-0 opacity-0"}`}>
        <div className="px-4 pb-10 sm:px-8">{children}</div>
      </div>
    </section>
  );
}

export default function Earn() {
  return (
    <div className="min-h-screen w-full max-w-full overflow-x-hidden bg-slate-950">

      {/* ── HERO ── */}
      <section className="w-full relative overflow-hidden" data-testid="earn-hero-section">
        {/* Banner image */}
        <div className="relative w-full">
          <img src={earnHeroBanner} alt="Say No To Plastic — Earn DXBs with AquaCafe by DeliWer"
            className="w-full h-[calc(100svh-100px)] min-h-[620px] object-cover object-center" data-testid="img-earn-hero-banner" />
          <div className="absolute inset-0 bg-gradient-to-b from-slate-950/40 via-slate-950/55 to-slate-950" />

          <div className="absolute inset-0 flex flex-col justify-center pt-8 sm:pt-12">
            <div className="w-full max-w-5xl mx-auto px-4 sm:px-6 text-center">

              {/* Brand lockup */}
              <div className="flex flex-wrap items-center justify-center gap-2 mb-4">
                <div className="inline-flex items-center gap-1.5 bg-amber-500/20 text-amber-300 px-3 py-1 rounded-full border border-amber-400/40 text-[10px] sm:text-xs font-black uppercase tracking-widest">
                  <Globe className="w-3 h-3" /> Dubai Planet Heroes
                </div>
              </div>

              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black text-white mb-3 leading-[1.05] drop-shadow-2xl">
                Say No To Plastic.
                <span className="block bg-gradient-to-r from-emerald-300 via-cyan-300 to-amber-300 bg-clip-text text-transparent">Lunch is on us.</span>
              </h1>
              <p className="text-slate-300 text-sm sm:text-base max-w-2xl mx-auto mb-8 leading-relaxed">
                Earn <strong className="text-emerald-300">DXB tokens</strong> by switching to filtered water, trading in old electronics and attending wellness events. Redeem for real restaurant meals across Dubai. Every action for the planet earns you something back.
              </p>

              {/* 3-step process */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 max-w-3xl mx-auto">
                {STEPS.map((s) => {
                  const Icon = s.icon;
                  return (
                    <button
                      key={s.n}
                      onClick={() => { const el = document.getElementById(s.sectionId); if (el) el.scrollIntoView({ behavior: "smooth", block: "start" }); }}
                      className={`bg-slate-900/70 backdrop-blur rounded-2xl border ${s.border} p-4 text-left hover:brightness-110 hover:scale-[1.02] transition-all cursor-pointer w-full`}
                      data-testid={`hero-step-${s.n}`}
                    >
                      <div className="flex items-center gap-2 mb-2">
                        <div className={`w-7 h-7 rounded-lg bg-gradient-to-br ${s.accent} flex items-center justify-center font-black text-white text-xs flex-shrink-0`}>{s.n}</div>
                        <Icon className={`w-4 h-4 ${s.color}`} />
                        <span className={`text-[10px] font-black ${s.color} bg-white/5 border border-white/10 px-1.5 py-0.5 rounded-full ml-auto`}>{s.dxb}</span>
                      </div>
                      <div className="text-sm font-bold text-white mb-0.5">{s.title}</div>
                      <div className="text-[11px] text-slate-400 leading-snug">{s.sub}</div>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── COLLAPSIBLE SECTIONS ── */}
      <div className="w-full bg-slate-950" data-testid="earn-collapsibles">

        {/* Section 1 — Starter Kit Bundle */}
        <CollapsibleSection
          id="section-bundle"
          testid="section-bundle"
          defaultOpen={true}
          summary={
            <div className="flex flex-wrap items-center gap-3">
              <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center flex-shrink-0">
                <Gift className="w-4 h-4 text-white" />
              </div>
              <div>
                <span className="text-[10px] font-black uppercase tracking-widest text-cyan-400 block">Step 1 · AquaCafe Water Track</span>
                <span className="text-base sm:text-lg font-black text-white">AquaCafe Loyalty Bundle</span>
              </div>
              <Badge className="bg-amber-500/20 text-amber-300 border-amber-400/30 text-[10px] px-2">AED 99 · AED 1,000+ value</Badge>
            </div>
          }
        >
          <div className="pt-2">
            <div className="grid md:grid-cols-3 gap-5 mb-7" data-testid="loyalty-bundle-section">
              {/* Card 1 */}
              <div className="bg-slate-900/80 rounded-2xl border border-cyan-500/40 overflow-hidden flex flex-col" data-testid="bundle-card-shower">
                <img src={showerFilterCollage} alt="Free Ionic Shower Filter" className="w-full h-48 object-cover" />
                <div className="p-5 flex flex-col flex-1">
                  <Badge className="self-start bg-amber-500/30 text-amber-300 text-[10px] px-2 py-0 mb-2">Worth AED 399</Badge>
                  <h4 className="text-base font-bold text-white mb-1">FREE Ionic Shower Filter</h4>
                  <p className="text-xs text-gray-400 flex-1">Installed at home — purer water for skin and hair from day one.</p>
                </div>
              </div>
              {/* Card 2 */}
              <div className="bg-slate-900/80 rounded-2xl border border-blue-500/40 overflow-hidden flex flex-col" data-testid="bundle-card-membership">
                <img src={membershipCard} alt="AquaCafe Membership Card" className="w-full h-48 object-cover" />
                <div className="p-5 flex flex-col flex-1">
                  <Badge className="self-start bg-amber-500/30 text-amber-300 text-[10px] px-2 py-0 mb-2">Worth AED 299</Badge>
                  <h4 className="text-base font-bold text-white mb-1">Membership Card & Pro Install</h4>
                  <p className="text-xs text-gray-400 flex-1">Lifetime support, priority installs and your referral link activated.</p>
                </div>
              </div>
              {/* Card 3 */}
              <Link href="#section-wellness" data-testid="bundle-card-wellness"
                className="bg-slate-900/80 rounded-2xl border border-amber-500/40 overflow-hidden flex flex-col group hover:border-amber-400/70 transition">
                <div className="w-full h-48 relative overflow-hidden">
                  <img src={wellnessDiningImg} alt="Wellness & Healthy Dining" className="w-full h-full object-cover object-center" />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 via-transparent to-transparent" />
                </div>
                <div className="p-5 flex flex-col flex-1">
                  <Badge className="self-start bg-amber-500/30 text-amber-300 text-[10px] px-2 py-0 mb-2">Per referral</Badge>
                  <h4 className="text-base font-bold text-white mb-1">Wellness & Dining Vouchers</h4>
                  <p className="text-xs text-gray-400 flex-1">AED 100 Chill &amp; Grill voucher + wellness access for every friend you bring. <span className="text-amber-400 font-bold group-hover:underline">See partners →</span></p>
                </div>
              </Link>
            </div>
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
        </CollapsibleSection>

        {/* Section 2 — Electronics Exchange */}
        <CollapsibleSection
          id="section-tradein"
          testid="section-tradein"
          summary={
            <div className="flex flex-wrap items-center gap-3">
              <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-blue-500 to-violet-600 flex items-center justify-center flex-shrink-0">
                <Recycle className="w-4 h-4 text-white" />
              </div>
              <div>
                <span className="text-[10px] font-black uppercase tracking-widest text-blue-400 block">Step 2 · Electronics Exchange</span>
                <span className="text-base sm:text-lg font-black text-white">Trade Old Electronics. Earn Big.</span>
              </div>
              <Badge className="bg-blue-500/20 text-blue-300 border-blue-400/30 text-[10px] px-2">Up to 5,000 DXBs per trade</Badge>
            </div>
          }
        >
          <div className="pt-2 space-y-6">
            <p className="text-slate-400 text-sm max-w-xl">Inspired by The Circle Dubai — every device you trade in prevents e-waste, recovers precious metals and earns you DXB tokens.</p>
            <div className="grid md:grid-cols-3 gap-4">
              {[
                { icon: Smartphone, color: "text-blue-400", bg: "bg-blue-500/10 border-blue-500/30", title: "Check Device Value", desc: "Instant valuation for any iPhone or Android.", cta: "Get Quote →", href: "/exchange", testid: "tradein-check-value" },
                { icon: Leaf, color: "text-emerald-400", bg: "bg-emerald-500/10 border-emerald-500/30", title: "Environmental Impact", desc: "One traded device prevents up to 80kg of CO₂.", cta: "See Impact →", href: "/environmental", testid: "tradein-impact" },
                { icon: Zap, color: "text-purple-400", bg: "bg-purple-500/10 border-purple-500/30", title: "Stack Your DXBs", desc: "Trade-ins earn up to 5,000 DXBs. Redeem for meals or upgrades.", cta: "Play & Earn →", href: "/play", testid: "tradein-play" },
              ].map((c) => {
                const Icon = c.icon;
                return (
                  <div key={c.testid} data-testid={c.testid}
                    className={`bg-slate-900/70 rounded-2xl border ${c.bg} p-5 flex flex-col gap-3`}>
                    <Icon className={`w-6 h-6 ${c.color}`} />
                    <h3 className="text-sm font-bold text-white">{c.title}</h3>
                    <p className="text-slate-400 text-xs leading-relaxed flex-1">{c.desc}</p>
                    <Link href={c.href} className={`text-xs font-bold ${c.color} hover:underline`}>{c.cta}</Link>
                  </div>
                );
              })}
            </div>
            {/* How it works */}
            <div className="bg-slate-900/50 rounded-2xl border border-blue-500/20 overflow-hidden" data-testid="tradein-how-it-works">
              <div className="border-b border-blue-500/20 px-5 py-3 text-center">
                <h4 className="text-xs font-bold text-white uppercase tracking-wider">How iPhone Trade-In Works</h4>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3 p-5">
                {[
                  { n: 1, ring: "bg-blue-500/20 border-blue-500/40", text: "text-blue-400", title: "Get Quote", desc: "Select model & condition" },
                  { n: 2, ring: "bg-cyan-500/20 border-cyan-500/40", text: "text-cyan-400", title: "Ship or Drop-off", desc: "Free pickup or visit us" },
                  { n: 3, ring: "bg-emerald-500/20 border-emerald-500/40", text: "text-emerald-400", title: "Verification", desc: "We inspect your device" },
                  { n: 4, ring: "bg-purple-500/20 border-purple-500/40", text: "text-purple-400", title: "Get Rewarded", desc: "Instant DXBs + credit" },
                ].map((s) => (
                  <div key={s.n} className="flex md:flex-col items-center md:text-center gap-2.5">
                    <div className={`w-8 h-8 ${s.ring} border rounded-full flex items-center justify-center flex-shrink-0`}>
                      <span className={`text-xs font-black ${s.text}`}>{s.n}</span>
                    </div>
                    <div className="flex-1">
                      <h5 className="text-white font-bold text-xs">{s.title}</h5>
                      <p className="text-gray-400 text-[11px] mt-0.5">{s.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
              <div className="px-5 pb-5 flex justify-center">
                <Link href="/exchange" data-testid="button-tradein-cta"
                  className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-600 to-violet-600 hover:from-blue-500 hover:to-violet-500 text-white font-black px-8 py-3 rounded-full text-sm shadow-xl transition">
                  <Smartphone className="w-4 h-4" /> Start Trade-In
                </Link>
              </div>
            </div>
          </div>
        </CollapsibleSection>

        {/* Section 3 — Wellness & Restaurant Partners */}
        <CollapsibleSection
          id="section-wellness"
          testid="section-wellness"
          summary={
            <div className="flex flex-wrap items-center gap-3">
              <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-amber-500 to-orange-500 flex items-center justify-center flex-shrink-0">
                <Utensils className="w-4 h-4 text-white" />
              </div>
              <div>
                <span className="text-[10px] font-black uppercase tracking-widest text-amber-400 block">Step 3 · Wellness & Dining</span>
                <span className="text-base sm:text-lg font-black text-white">Redeem DXBs for Real Lunches</span>
              </div>
              <Badge className="bg-amber-500/20 text-amber-300 border-amber-400/30 text-[10px] px-2">AED 89–100 vouchers</Badge>
            </div>
          }
        >
          <div className="pt-2 space-y-6">
            <p className="text-slate-400 text-sm max-w-xl">Attend fitness and eco events across Dubai and dine at partner restaurants — redeem your DXBs for set lunches and vouchers.</p>

            {/* Wellness events — compact */}
            <div className="grid sm:grid-cols-2 gap-4">
              {[
                { icon: Heart, color: "text-rose-400", accent: "from-rose-500 to-pink-600", border: "border-rose-500/20", title: "Fitness & Mindfulness", desc: "Yoga and breathwork with certified instructors. Show your Planet Hero card.", dxb: "500 DXBs / session" },
                { icon: TreePine, color: "text-emerald-400", accent: "from-emerald-500 to-teal-600", border: "border-emerald-500/20", title: "Community Eco Events", desc: "Beach cleanups, e-waste drives and park planting days across Dubai.", dxb: "300–1,000 DXBs" },
              ].map((e, i) => {
                const Icon = e.icon;
                return (
                  <div key={i} data-testid={`wellness-card-${i}`}
                    className={`bg-slate-900/70 rounded-xl border ${e.border} p-4 flex gap-3`}>
                    <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${e.accent} flex items-center justify-center flex-shrink-0`}>
                      <Icon className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <h3 className="text-sm font-bold text-white mb-0.5">{e.title}</h3>
                      <p className="text-slate-400 text-xs leading-relaxed mb-1.5">{e.desc}</p>
                      <span className={`text-[10px] font-bold ${e.color} bg-slate-800 border border-white/10 px-2 py-0.5 rounded-full`}>{e.dxb}</span>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Restaurant partner directory */}
            <div>
              <p className="text-[10px] font-black uppercase tracking-widest text-slate-500 mb-3 flex items-center gap-1.5">
                <Utensils className="w-3 h-3" /> Restaurant Partner Directory
              </p>
              <div className="grid md:grid-cols-3 gap-4">
                {RESTAURANT_PARTNERS.map((r) => {
                  const Icon = r.icon;
                  return (
                    <div key={r.name} data-testid={`card-restaurant-${r.name.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`}
                      className="bg-slate-900/70 rounded-xl border border-slate-800 hover:border-emerald-500/40 transition p-4 space-y-2">
                      <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${r.accent} flex items-center justify-center`}>
                        <Icon className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <h4 className="text-sm font-bold text-white">{r.name}</h4>
                        <p className="text-[10px] uppercase tracking-widest text-slate-500 font-bold flex items-center gap-1 mt-0.5">
                          <MapPin className="w-2.5 h-2.5" />{r.location}
                        </p>
                      </div>
                      <p className="text-slate-300 text-xs">{r.perk}</p>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Partner logos */}
            <div className="flex flex-col sm:flex-row items-center gap-5 bg-slate-900/50 rounded-2xl border border-white/10 p-5" data-testid="wellness-partners-row">
              <div className="flex flex-col items-center gap-1">
                <img src={aquacafeLogo} alt="AquaCafe by DeliWer" className="h-10 w-auto object-contain" />
                <span className="text-[9px] font-black uppercase tracking-widest text-cyan-400">Water Filtration</span>
              </div>
              <span className="text-2xl font-black text-white/20">×</span>
              <div className="flex flex-col items-center gap-1">
                <img src={bakersKitchenLogo} alt="Chill & Grill" className="h-10 w-auto object-contain" />
                <span className="text-[9px] font-black uppercase tracking-widest text-amber-400">Healthy Dining</span>
              </div>
              <p className="sm:ml-auto text-xs text-slate-500 text-center sm:text-right">
                <MapPin className="w-3 h-3 inline mr-1" />Business Bay · Open Daily 9AM–11PM
              </p>
              <a
                href={`https://wa.me/971523946311?text=${encodeURIComponent("Hi DeliWer — I run a restaurant in Dubai and would love to join the Planet Hero loyalty programme.")}`}
                target="_blank" rel="noopener noreferrer" data-testid="button-restaurant-apply"
                className="inline-flex items-center gap-1.5 text-[11px] font-bold text-slate-400 hover:text-white border border-slate-700 hover:border-slate-500 px-3 py-1.5 rounded-full transition whitespace-nowrap">
                Add my restaurant <ArrowRight className="w-3 h-3" />
              </a>
            </div>
          </div>
        </CollapsibleSection>

        {/* Section 4 — Play & Earn */}
        <CollapsibleSection
          id="section-play"
          testid="section-play"
          summary={
            <div className="flex flex-wrap items-center gap-3">
              <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-amber-500 to-orange-500 flex items-center justify-center flex-shrink-0">
                <Trophy className="w-4 h-4 text-white" />
              </div>
              <div>
                <span className="text-[10px] font-black uppercase tracking-widest text-amber-400 block">Members · Keep Earning</span>
                <span className="text-base sm:text-lg font-black text-white">Play & Earn DXBs — Daily</span>
              </div>
              <Badge className="bg-amber-500/20 text-amber-300 border-amber-400/30 text-[10px] px-2">No purchase needed</Badge>
            </div>
          }
        >
          <div className="pt-2 space-y-5">
            <p className="text-slate-400 text-sm max-w-xl">Daily challenges, eco-games and community missions — each completed task drops DXBs to your Planet Hero balance.</p>
            <div className="grid sm:grid-cols-3 gap-4">
              {[
                { icon: Zap, color: "text-amber-400", bg: "bg-amber-500/10 border-amber-500/30", title: "Daily Challenges", desc: "Short sustainable actions that refresh every 24 hours. Streak bonuses multiply DXBs." },
                { icon: Globe, color: "text-emerald-400", bg: "bg-emerald-500/10 border-emerald-500/30", title: "Eco Missions", desc: "Report plastic waste, log refills and plant pledges. Real-world actions, real rewards." },
                { icon: Heart, color: "text-rose-400", bg: "bg-rose-500/10 border-rose-500/30", title: "Community Leaderboard", desc: "Compete with Dubai Planet Heroes for weekly prize pools and VIP event invitations." },
              ].map((c, i) => {
                const Icon = c.icon;
                return (
                  <div key={i} className={`bg-slate-900/70 rounded-xl border ${c.bg} p-4`} data-testid={`play-card-${i}`}>
                    <Icon className={`w-5 h-5 ${c.color} mb-2`} />
                    <h4 className="text-sm font-bold text-white mb-1">{c.title}</h4>
                    <p className="text-slate-400 text-xs leading-relaxed">{c.desc}</p>
                  </div>
                );
              })}
            </div>
            <div>
              <Link href="/play" data-testid="cta-play"
                className="inline-flex items-center gap-2 bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 text-white font-black px-8 py-3 rounded-full text-sm shadow-xl transition hover:scale-105">
                <Trophy className="w-4 h-4" /> Start Playing & Earning
              </Link>
            </div>
          </div>
        </CollapsibleSection>

      </div>

      {/* ── ENVIRONMENTAL CTA ── */}
      <section className="w-full py-14 px-4 bg-gradient-to-br from-emerald-950/40 via-slate-950 to-cyan-950/30 border-t border-white/10" data-testid="section-environmental-cta">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-xl sm:text-2xl md:text-3xl font-black text-white mb-3 leading-tight">
            The Planet Is the Heart of Our Business Model.
          </h2>
          <p className="text-slate-400 text-sm sm:text-base max-w-xl mx-auto mb-6 leading-relaxed">
            Every DXB token earned maps to a verified environmental action — less plastic, fewer devices in landfill, cleaner water and lower carbon.
          </p>
          <div className="flex flex-wrap gap-3 justify-center">
            <Link href="/environmental" data-testid="cta-environmental"
              className="inline-flex items-center gap-2 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-black px-7 py-3 rounded-full text-sm shadow-xl transition hover:scale-105">
              <TreePine className="w-4 h-4" /> See Our Environmental Impact
            </Link>
            <Link href="/taf" data-testid="cta-tell-a-friend"
              className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white border border-white/20 font-bold px-7 py-3 rounded-full text-sm transition">
              <Heart className="w-4 h-4" /> Tell a Friend · Free Lunch
            </Link>
          </div>
        </div>
      </section>

      {/* ── FOOTER CTA ── */}
      <footer className="w-full border-t border-emerald-500/20 bg-slate-950" data-testid="earn-footer">
        <div className="max-w-6xl mx-auto px-4 py-8">
          <div className="text-center mb-6">
            <h3 className="text-lg sm:text-xl font-black text-white mb-1">Ready to Become a Planet Hero?</h3>
            <p className="text-slate-500 text-xs">Join Dubai's growing community earning rewards while building a sustainable future.</p>
          </div>
          <div className="flex flex-wrap items-center justify-center gap-3">
            <a href={`https://wa.me/971523946311?text=${encodeURIComponent("Hi DeliWer! I'd like to order the AquaCafe AED 99 Starter Kit and join the Planet Heroes — please get me started.")}`}
              target="_blank" rel="noopener noreferrer" data-testid="footer-cta-wa"
              className="inline-flex items-center gap-2 bg-[#25D366] hover:bg-[#1ebe57] text-white font-black px-6 py-2.5 rounded-full text-sm shadow-lg transition hover:scale-105">
              <Phone className="w-4 h-4" /> Order Starter Kit · AED 99
            </a>
            <Link href="/exchange" data-testid="footer-cta-exchange"
              className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-bold px-6 py-2.5 rounded-full text-sm shadow-lg transition">
              <Smartphone className="w-4 h-4" /> Trade Your iPhone
            </Link>
            <Link href="/play" data-testid="footer-cta-play"
              className="inline-flex items-center gap-2 bg-amber-600 hover:bg-amber-700 text-white font-bold px-6 py-2.5 rounded-full text-sm shadow-lg transition">
              <Trophy className="w-4 h-4" /> Play & Earn
            </Link>
            <Link href="/taf" data-testid="footer-cta-taf"
              className="inline-flex items-center gap-2 bg-slate-700 hover:bg-slate-600 text-white font-bold px-6 py-2.5 rounded-full text-sm shadow-lg transition">
              <Heart className="w-4 h-4" /> Tell a Friend
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
