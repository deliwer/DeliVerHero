import { useState } from 'react';
import { SEOMeta } from '@/components/seo-meta';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { LeaderboardWidget } from '@/components/leaderboard-widget';
import { SocialChallengesFeed } from '@/components/social-challenges-feed';
import { Link } from 'wouter';
import {
  Trophy, Users, Globe, Star, Zap, Calendar, MessageSquare,
  Share2, Gift, Target, Flame, Heart, CheckCircle, TrendingUp,
  MapPin, Droplet, Recycle, Send, Search, Plus, ExternalLink,
  MessageCircle, Play, Award, ArrowRight, Building2, Plane,
  Wind, Sun, Cpu, Train, Dumbbell, Leaf, Shield, Bike, Activity,
  ChevronRight, Sparkles, Home, Filter
} from 'lucide-react';

const NAV_TABS = [
  { id: "overview",     label: "Home",             icon: Home },
  { id: "league",       label: "🏆 Brokers League",  icon: Trophy },
  { id: "sports",       label: "Sports & Wellness", icon: Dumbbell },
  { id: "sustainability", label: "Sustainability",  icon: Leaf },
  { id: "future",       label: "Dubai Future",      icon: Sparkles },
  { id: "connect",      label: "Connect",           icon: Globe },
  { id: "leaderboard",  label: "Leaderboard",       icon: Award },
  { id: "events",       label: "Events",            icon: Calendar },
];

const COMMUNITY_STATS = [
  { value: "36,000+", label: "Members & Brokers", color: "text-emerald-400" },
  { value: "2.4M",    label: "Bottles Prevented",  color: "text-blue-400" },
  { value: "180T",    label: "CO₂ Saved",           color: "text-amber-400" },
  { value: "+23%",    label: "Monthly Growth",      color: "text-purple-400" },
];

const LEAGUE_SECTORS = [
  {
    title: "Real Estate Brokers League",
    subtitle: "Cricket Season 2026",
    description: "36,000+ Dubai real estate brokers compete across 16 teams in cricket, padel, football and more. Sponsored by top UAE developers.",
    stats: "16 teams · 250+ participants · AED 30,000+ exposure",
    icon: Trophy,
    color: "from-amber-500/20 to-yellow-500/10",
    border: "border-amber-400/30",
    badge: "ACTIVE SEASON",
    badgeColor: "bg-amber-500/20 text-amber-300",
    cta: "Join the League",
    href: "/league",
    emoji: "🏏",
  },
  {
    title: "Property Owners Circle",
    subtitle: "Landlord & Developer Network",
    description: "Connect with owners, developers, and landlords across Dubai. Share tenant insights, market data, and off-plan opportunities.",
    stats: "2,400+ owners · Mamzar · Habtoor · DAMAC",
    icon: Building2,
    color: "from-blue-500/20 to-cyan-500/10",
    border: "border-blue-400/30",
    badge: "OPEN",
    badgeColor: "bg-blue-500/20 text-blue-300",
    cta: "Explore Properties",
    href: "/realestate",
    emoji: "🏙️",
  },
  {
    title: "Recommerce Trade Network",
    subtitle: "Circular Economy Exchange",
    description: "Buy, sell and trade smartphones, electronics and devices. Every trade prevents e-waste and funds clean water missions.",
    stats: "15,000+ devices traded · iPhone · Samsung · MacBook",
    icon: Recycle,
    color: "from-green-500/20 to-emerald-500/10",
    border: "border-green-400/30",
    badge: "LIVE",
    badgeColor: "bg-green-500/20 text-green-300",
    cta: "Trade Now",
    href: "/exchange",
    emoji: "♻️",
  },
];

const SPORTS_PILLARS = [
  {
    icon: "🏏",
    title: "Cricket League",
    body: "The DeliWer Brokers Cricket League — 16 agency teams, 8-week season, full jersey branding and UAE's biggest real estate sports moment.",
    link: "/league",
    cta: "View League",
  },
  {
    icon: "🎾",
    title: "Padel & Tennis",
    body: "Padel tournaments at top Dubai courts — enter as an individual or represent your agency. Doubles and mixed formats available.",
    link: "/league",
    cta: "Sign Up",
  },
  {
    icon: "⚽",
    title: "Football",
    body: "5-a-side and 7-a-side agency leagues across Dubai Sports City, JVC and Motor City. Inter-district and inter-agency formats.",
    link: "/league",
    cta: "Join Team",
  },
  {
    icon: "🏊",
    title: "Triathlon & Run",
    body: "Dubai Marathon participants, triathlon teams and running groups from the community. Track your training and earn Hero Points.",
    link: "/earn",
    cta: "Track Run",
  },
  {
    icon: "🥗",
    title: "Healthy Living",
    body: "Nutrition challenges, clean eating missions, AquaCafe hydration tracking. Earn DXB points for hitting wellness milestones.",
    link: "/aquacafe",
    cta: "Start Mission",
  },
  {
    icon: "🧘",
    title: "Wellness & Mindfulness",
    body: "Yoga sessions, mindfulness retreats and community wellness days organised across Dubai parks and beach locations.",
    link: "/rewards",
    cta: "Earn Rewards",
  },
];

const FUTURE_PILLARS = [
  {
    icon: Wind,
    iconColor: "text-sky-400",
    bg: "from-sky-500/10 to-blue-500/5",
    border: "border-sky-400/20",
    title: "Clean Energy",
    body: "Solar, hydrogen and clean energy projects reshaping Dubai's grid. Planet Heroes earn points for reducing household energy consumption.",
    link: "/environmental",
  },
  {
    icon: Cpu,
    iconColor: "text-purple-400",
    bg: "from-purple-500/10 to-violet-500/5",
    border: "border-purple-400/20",
    title: "AI & Smart City",
    body: "Dubai's AI roadmap, smart logistics, predictive maintenance and autonomous services. ChainTrack integrates real-time AI routing.",
    link: "/chaintrack",
  },
  {
    icon: Plane,
    iconColor: "text-amber-400",
    bg: "from-amber-500/10 to-yellow-500/5",
    border: "border-amber-400/20",
    title: "Aerotropolis & DWC",
    body: "Dubai World Central and Al Maktoum airport — the world's largest aerotropolis. Logistics, freight and airport-adjacent communities.",
    link: "/chaintrack-logistics",
  },
  {
    icon: Train,
    iconColor: "text-emerald-400",
    bg: "from-emerald-500/10 to-green-500/5",
    border: "border-emerald-400/20",
    title: "Transport & Mobility",
    body: "Metro expansion, Hyperloop proposals, EV infrastructure and last-mile delivery reshaping how Dubai moves people and goods.",
    link: "/chaintrack",
  },
  {
    icon: Sun,
    iconColor: "text-orange-400",
    bg: "from-orange-500/10 to-amber-500/5",
    border: "border-orange-400/20",
    title: "Travel & Tourism",
    body: "Halal travel, luxury wellness retreats, eco-tourism and private aviation. DeliWer members unlock exclusive travel rewards.",
    link: "/earn",
  },
  {
    icon: Activity,
    iconColor: "text-rose-400",
    bg: "from-rose-500/10 to-pink-500/5",
    border: "border-rose-400/20",
    title: "Dubai Future District",
    body: "The 1km² Future District is home to startups, accelerators and innovation labs. Connect with founders, investors and ecosystem builders.",
    link: "/invest",
  },
];

const SUSTAINABILITY_ACTIONS = [
  { emoji: "💧", title: "Water Heroes", desc: "AquaCafe filter installation prevents plastic bottle waste — 2.4M bottles and counting.", pts: "+500 pts", link: "/aquacafe" },
  { emoji: "📱", title: "Recommerce", desc: "Trade in old devices. Each iPhone = 2,400 bottles prevented & clean water funded.", pts: "+750 pts", link: "/exchange" },
  { emoji: "🌳", title: "Carbon Offset", desc: "Complete eco missions to offset your carbon footprint and earn Green Hero badges.", pts: "+300 pts", link: "/play" },
  { emoji: "☀️", title: "Clean Energy", desc: "Report your renewable energy usage and earn community recognition.", pts: "+400 pts", link: "/environmental" },
  { emoji: "🚴", title: "Green Commute", desc: "Log cycling, walking or public transport trips and multiply your Planet Hero score.", pts: "+200 pts", link: "/earn" },
  { emoji: "🏖️", title: "Beach Cleanups", desc: "Join monthly Jumeirah beach cleanups with fellow Heroes. Earn Cleanup Champion badge.", pts: "+600 pts", link: "/play" },
];

const CONNECT_CHANNELS = [
  {
    type: "whatsapp",
    emoji: "💬",
    name: "DeliWer Shopping Metaverse — Dubai Heroes",
    desc: "Official WhatsApp community — daily missions, tips and celebration",
    members: "2,847",
    color: "border-green-400/30 bg-green-500/5",
    url: "https://chat.whatsapp.com/GcnBVI6Ere6GqOg0jb8L5O",
  },
  {
    type: "whatsapp",
    emoji: "💬",
    name: "AquaCafe Champions",
    desc: "Installation support, water quality tips and impact sharing",
    members: "1,643",
    color: "border-green-400/30 bg-green-500/5",
    url: "https://chat.whatsapp.com/EjlA3pKnhn8AcpxDEuTnvC",
  },
  {
    type: "league",
    emoji: "🏆",
    name: "Brokers League Community",
    desc: "36,000 real estate brokers — sports, deals, referrals and market intel",
    members: "36,000+",
    color: "border-amber-400/30 bg-amber-500/5",
    url: "/league",
    internal: true,
  },
  {
    type: "telegram",
    emoji: "✈️",
    name: "Global Water Heroes Network",
    desc: "International network connecting water sustainability projects",
    members: "12,456",
    color: "border-cyan-400/30 bg-cyan-500/5",
    url: "#",
  },
];

const EVENTS = [
  {
    id: "cricket-2026",
    title: "🏏 Brokers Cricket League — Season Opener",
    description: "16 real estate agency teams battle in the UAE's biggest industry cricket event. Sponsorships, jersey branding and full media coverage.",
    date: "July 2026",
    participants: 250,
    reward: "Trophy + AED 10,000 sponsor package",
    status: "upcoming",
    badge: "SPORTS",
    badgeColor: "bg-amber-500/20 text-amber-300",
    link: "/league",
  },
  {
    id: "ramadan-bottles",
    title: "💧 1 Million Bottles by Ramadan",
    description: "Community-wide challenge to prevent 1 million plastic bottles. 80% complete — join now to earn the Golden Hero badge.",
    date: "Ongoing",
    participants: 8734,
    reward: "Golden Hero Badge + AED 1,000 voucher + 2X lifetime points",
    status: "active",
    badge: "SUSTAINABILITY",
    badgeColor: "bg-emerald-500/20 text-emerald-300",
    link: "/play",
  },
  {
    id: "beach-cleanup",
    title: "🏖️ Jumeirah Beach Community Cleanup",
    description: "Monthly cleanup with Planet Heroes. Build real-world impact with your community.",
    date: "Last Sunday of each month",
    participants: 89,
    reward: "Cleanup Champion Badge + 300 Hero Points",
    status: "upcoming",
    badge: "COMMUNITY",
    badgeColor: "bg-blue-500/20 text-blue-300",
    link: "/play",
  },
  {
    id: "future-summit",
    title: "🚀 Dubai Future District Networking",
    description: "Connect with startup founders, AI innovators, clean energy pioneers and Dubai's most ambitious community builders.",
    date: "Q3 2026",
    participants: 320,
    reward: "Innovation Badge + Exclusive Investor Access",
    status: "upcoming",
    badge: "FUTURE",
    badgeColor: "bg-purple-500/20 text-purple-300",
    link: "/invest",
  },
  {
    id: "padel-open",
    title: "🎾 DeliWer Padel Open",
    description: "Agency padel tournament — individuals, doubles and mixed. Top Dubai courts, prize pool and trophy presentation.",
    date: "August 2026",
    participants: 64,
    reward: "Champion Trophy + AED 5,000 Prize Pool",
    status: "upcoming",
    badge: "SPORTS",
    badgeColor: "bg-amber-500/20 text-amber-300",
    link: "/league",
  },
];

export default function Community() {
  const [activeTab, setActiveTab] = useState<string>("overview");
  const [forumSearch, setForumSearch] = useState("");

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-white">
      <SEOMeta
        title="Planet Heroes Community — Join Dubai's Sustainability Movement"
        description="Connect with 36,000+ Planet Heroes in Dubai. Sports, wellness, sustainability, real estate brokers league, AI, clean energy, and Dubai Future District initiatives. Join at planetheroes.deliwer.com."
        canonical="https://planetheroes.deliwer.com"
        ogType="website"
        keywords="Planet Heroes Dubai, sustainability community Dubai, Brokers League Dubai, eco rewards Dubai, green living UAE, Dubai Future District, real estate sports Dubai, clean energy UAE, recommerce Dubai, aerotropolis Dubai"
        webPageType="WebPage"
        breadcrumbs={[{ name: "Planet Heroes Community", url: "https://planetheroes.deliwer.com" }]}
        dateModified="2026-06-15"
        faqs={[
          { question: "What is Planet Heroes?", answer: "Planet Heroes is DeliWer's multidimensional community platform spanning sports, wellness, sustainability, real estate, recommerce and Dubai Future District initiatives." },
          { question: "What is the Brokers League?", answer: "The DeliWer Brokers League is a real estate industry sports competition with 36,000+ Dubai brokers competing in cricket, padel, football and more across 16 agency teams." },
          { question: "How do I earn rewards?", answer: "Complete sustainability missions, trade devices, join sports events, reduce plastic consumption, and refer friends. Points convert to real AED vouchers and exclusive badges." },
          { question: "Who can join?", answer: "Anyone in Dubai — real estate brokers, property owners, sustainability advocates, sports enthusiasts, entrepreneurs, and expats. Join free at planetheroes.deliwer.com." },
        ]}
      />

      {/* ── HERO ───────────────────────────────────────────────── */}
      <section className="relative pt-20 pb-16 px-4 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-emerald-900/30 via-slate-950/60 to-slate-950 pointer-events-none" />
        <div className="relative max-w-6xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-emerald-500/10 border border-emerald-500/20 rounded-full text-emerald-300 text-sm font-semibold mb-6">
            <Sparkles className="w-4 h-4" />
            Dubai Municipality Partner · Future District Member
          </div>

          <h1 className="text-5xl md:text-7xl font-black tracking-tight mb-4">
            <span className="text-white">PLANET</span>{" "}
            <span className="bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent">HEROES</span>
          </h1>
          <p className="text-lg md:text-xl text-slate-300 max-w-3xl mx-auto mb-10 leading-relaxed">
            Dubai's unified platform for sports, wellness, sustainability, real estate, recommerce, clean energy and Dubai Future District — all in one community.
          </p>

          {/* Stats row */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto mb-10">
            {COMMUNITY_STATS.map((s) => (
              <div key={s.label} className="bg-white/5 border border-white/10 rounded-2xl p-4">
                <div className={`text-3xl font-black ${s.color}`}>{s.value}</div>
                <div className="text-sm text-slate-400 mt-1">{s.label}</div>
              </div>
            ))}
          </div>

          {/* Quick CTAs */}
          <div className="flex flex-wrap justify-center gap-3">
            <Link href="/league">
              <Button className="bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold rounded-full px-6 h-11">
                <Trophy className="w-4 h-4 mr-2" />
                Brokers League
              </Button>
            </Link>
            <Link href="/play">
              <Button className="bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-full px-6 h-11">
                <Play className="w-4 h-4 mr-2" />
                Sustainability Missions
              </Button>
            </Link>
            <Link href="/earn">
              <Button variant="outline" className="border-white/20 text-white hover:bg-white/10 rounded-full px-6 h-11">
                <Zap className="w-4 h-4 mr-2" />
                Earn Rewards
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* ── NAV TABS ───────────────────────────────────────────── */}
      <div className="sticky top-0 z-20 bg-slate-950/90 backdrop-blur border-b border-white/10">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex gap-1 overflow-x-auto py-3 scrollbar-hide">
            {NAV_TABS.map(({ id, label, icon: Icon }) => (
              <button
                key={id}
                onClick={() => setActiveTab(id)}
                className={`flex-shrink-0 flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm font-semibold transition-all whitespace-nowrap ${
                  activeTab === id
                    ? 'bg-emerald-500 text-slate-950 shadow'
                    : 'text-slate-300 hover:bg-white/10'
                }`}
              >
                {id !== "league" && <Icon className="w-4 h-4" />}
                {label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* ── TAB CONTENT ───────────────────────────────────────── */}
      <section className="max-w-6xl mx-auto px-4 py-10">

        {/* ── HOME / OVERVIEW ── */}
        {activeTab === "overview" && (
          <div className="space-y-10">
            {/* Three sector cards */}
            <div>
              <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
                <Flame className="w-6 h-6 text-orange-400" />
                Community Pillars
              </h2>
              <div className="grid md:grid-cols-3 gap-5">
                {LEAGUE_SECTORS.map((s) => {
                  const Icon = s.icon;
                  return (
                    <div key={s.title} className={`bg-gradient-to-br ${s.color} border ${s.border} rounded-2xl p-6 hover:scale-[1.02] transition-transform`}>
                      <div className="flex items-start justify-between mb-3">
                        <span className="text-3xl">{s.emoji}</span>
                        <Badge className={`text-xs ${s.badgeColor} border-0`}>{s.badge}</Badge>
                      </div>
                      <h3 className="text-lg font-bold text-white mb-1">{s.title}</h3>
                      <p className="text-xs text-slate-400 mb-2">{s.subtitle}</p>
                      <p className="text-sm text-slate-300 mb-4">{s.description}</p>
                      <p className="text-xs text-slate-500 mb-4">{s.stats}</p>
                      <Link href={s.href}>
                        <Button size="sm" className="w-full bg-white/10 hover:bg-white/20 text-white border-0">
                          {s.cta} <ChevronRight className="w-3 h-3 ml-1" />
                        </Button>
                      </Link>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Active Challenge */}
            <div className="bg-gradient-to-r from-emerald-900/40 to-cyan-900/30 border border-emerald-500/30 rounded-2xl p-8">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse" />
                <span className="text-emerald-400 text-sm font-bold uppercase tracking-widest">Active Challenge</span>
              </div>
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-2xl font-bold text-white mb-2">1 Million Bottles by Ramadan</h3>
                  <p className="text-slate-300 mb-5">Join Dubai's biggest environmental mission. Every AquaCafe installation, device trade-in and eco mission counts.</p>
                  <div className="mb-4">
                    <div className="flex justify-between text-sm text-slate-400 mb-2">
                      <span>Community Progress</span><span className="text-emerald-400 font-bold">80% Complete</span>
                    </div>
                    <div className="w-full bg-slate-700 rounded-full h-3">
                      <div className="bg-gradient-to-r from-emerald-500 to-cyan-500 h-3 rounded-full" style={{ width: '80%' }} />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div className="text-center p-3 bg-white/5 rounded-xl">
                      <div className="text-2xl font-bold text-white">23</div>
                      <div className="text-xs text-slate-400">Days Left</div>
                    </div>
                    <div className="text-center p-3 bg-white/5 rounded-xl">
                      <div className="text-2xl font-bold text-white">200K</div>
                      <div className="text-xs text-slate-400">Bottles to Go</div>
                    </div>
                  </div>
                </div>
                <div>
                  <h4 className="text-sm font-bold text-slate-400 uppercase mb-3">Challenge Rewards</h4>
                  <div className="space-y-2 mb-5">
                    {[
                      { icon: Trophy, label: "Golden Hero Badge", color: "text-amber-400 border-amber-400/30 bg-amber-500/10" },
                      { icon: Gift, label: "AED 1,000 Voucher", color: "text-emerald-400 border-emerald-400/30 bg-emerald-500/10" },
                      { icon: Zap, label: "Lifetime 2X Points", color: "text-cyan-400 border-cyan-400/30 bg-cyan-500/10" },
                    ].map(({ icon: Icon, label, color }) => (
                      <div key={label} className={`flex items-center gap-3 p-3 border rounded-xl ${color}`}>
                        <Icon className="w-4 h-4" />
                        <span className="font-medium text-sm">{label}</span>
                      </div>
                    ))}
                  </div>
                  <Link href="/play">
                    <Button className="w-full bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 text-slate-950 font-bold">
                      <Target className="w-4 h-4 mr-2" /> Join Challenge
                    </Button>
                  </Link>
                </div>
              </div>
            </div>

            {/* Quick Links Grid */}
            <div>
              <h2 className="text-2xl font-bold mb-6">Quick Actions</h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {[
                  { emoji: "🏏", label: "Brokers League", href: "/league", color: "border-amber-400/30 hover:border-amber-400/60" },
                  { emoji: "💧", label: "AquaCafe Water", href: "/aquacafe", color: "border-blue-400/30 hover:border-blue-400/60" },
                  { emoji: "♻️", label: "Trade Devices", href: "/exchange", color: "border-emerald-400/30 hover:border-emerald-400/60" },
                  { emoji: "🚀", label: "Earn Rewards", href: "/earn", color: "border-purple-400/30 hover:border-purple-400/60" },
                  { emoji: "🏠", label: "Ejari & Move-In", href: "/ejari-registration", color: "border-cyan-400/30 hover:border-cyan-400/60" },
                  { emoji: "🌍", label: "Relocate to Dubai", href: "/relocate", color: "border-teal-400/30 hover:border-teal-400/60" },
                  { emoji: "📦", label: "ChainTrack Logistics", href: "/chaintrack", color: "border-orange-400/30 hover:border-orange-400/60" },
                  { emoji: "🌱", label: "Environmental", href: "/environmental", color: "border-green-400/30 hover:border-green-400/60" },
                ].map(({ emoji, label, href, color }) => (
                  <Link key={href} href={href}>
                    <div className={`bg-white/5 border ${color} rounded-2xl p-4 text-center transition-all hover:bg-white/10 cursor-pointer`}>
                      <div className="text-2xl mb-2">{emoji}</div>
                      <div className="text-sm font-semibold text-slate-200">{label}</div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ── BROKERS LEAGUE ── */}
        {activeTab === "league" && (
          <div className="space-y-8">
            <div className="bg-gradient-to-br from-amber-900/30 to-yellow-900/20 border border-amber-400/30 rounded-2xl p-8">
              <div className="flex items-center gap-3 mb-4">
                <span className="text-4xl">🏏</span>
                <div>
                  <h2 className="text-3xl font-black text-white">DeliWer Brokers League</h2>
                  <p className="text-amber-300 font-semibold">Cricket Season 2026 · Real Estate Industry Sports</p>
                </div>
              </div>
              <p className="text-slate-300 text-lg mb-6 max-w-3xl">
                The UAE's premier real estate industry sports league — 36,000 brokers, 16 agency teams, 8 weeks of cricket, padel, football and more. Your agency vs the world.
              </p>
              <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-6">
                {[
                  { v: "36,000+", l: "Broker Reach" },
                  { v: "250+", l: "Participants" },
                  { v: "16", l: "Teams" },
                  { v: "8 Wks", l: "Season" },
                  { v: "AED 30K+", l: "Sponsor Value" },
                ].map(({ v, l }) => (
                  <div key={l} className="text-center bg-white/5 rounded-xl p-3">
                    <div className="text-xl font-black text-amber-400">{v}</div>
                    <div className="text-xs text-slate-400">{l}</div>
                  </div>
                ))}
              </div>
              <div className="flex flex-wrap gap-3">
                <Link href="/league">
                  <Button className="bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold rounded-full px-8">
                    <Trophy className="w-4 h-4 mr-2" /> Join the League
                  </Button>
                </Link>
                <Link href="/league">
                  <Button variant="outline" className="border-amber-400/40 text-amber-300 hover:bg-amber-500/10 rounded-full px-8">
                    <Star className="w-4 h-4 mr-2" /> Sponsor a Team
                  </Button>
                </Link>
              </div>
            </div>

            {/* Future Sports */}
            <div>
              <h3 className="text-xl font-bold mb-4 text-slate-200">League Sports Calendar</h3>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {[
                  { emoji: "🏏", sport: "Cricket", status: "Active — Season 2026", color: "border-amber-400/30" },
                  { emoji: "🎾", sport: "Padel", status: "Coming Q3 2026", color: "border-blue-400/30" },
                  { emoji: "⚽", sport: "Football", status: "Coming Q4 2026", color: "border-emerald-400/30" },
                  { emoji: "🏐", sport: "Volleyball", status: "Planned 2027", color: "border-purple-400/30" },
                  { emoji: "👨‍👩‍👧", sport: "Family Days", status: "Quarterly Events", color: "border-pink-400/30" },
                  { emoji: "🏆", sport: "Awards Gala", status: "Annual — Dec 2026", color: "border-yellow-400/30" },
                ].map(({ emoji, sport, status, color }) => (
                  <Link key={sport} href="/league">
                    <div className={`bg-white/5 border ${color} rounded-2xl p-5 hover:bg-white/10 transition-all cursor-pointer`}>
                      <div className="text-3xl mb-3">{emoji}</div>
                      <h4 className="font-bold text-white">{sport}</h4>
                      <p className="text-xs text-slate-400 mt-1">{status}</p>
                    </div>
                  </Link>
                ))}
              </div>
            </div>

            {/* Property Owners + Recommerce */}
            <div className="grid md:grid-cols-2 gap-5">
              <div className="bg-blue-500/10 border border-blue-400/30 rounded-2xl p-6">
                <div className="text-3xl mb-3">🏙️</div>
                <h3 className="text-lg font-bold text-white mb-2">Property Owners Circle</h3>
                <p className="text-sm text-slate-300 mb-4">Landlords, developers and investors across Dubai. Market intelligence, broker referrals, and off-plan opportunities.</p>
                <Link href="/realestate">
                  <Button size="sm" className="bg-blue-600 hover:bg-blue-500 text-white">Explore Properties <ArrowRight className="w-3 h-3 ml-1" /></Button>
                </Link>
              </div>
              <div className="bg-emerald-500/10 border border-emerald-400/30 rounded-2xl p-6">
                <div className="text-3xl mb-3">♻️</div>
                <h3 className="text-lg font-bold text-white mb-2">Recommerce Trade Network</h3>
                <p className="text-sm text-slate-300 mb-4">Buy, sell and trade smartphones and electronics. Every trade funds clean water missions and earns Hero Points.</p>
                <Link href="/exchange">
                  <Button size="sm" className="bg-emerald-600 hover:bg-emerald-500 text-white">Trade Now <ArrowRight className="w-3 h-3 ml-1" /></Button>
                </Link>
              </div>
            </div>
          </div>
        )}

        {/* ── SPORTS & WELLNESS ── */}
        {activeTab === "sports" && (
          <div className="space-y-8">
            <div className="text-center max-w-2xl mx-auto mb-6">
              <h2 className="text-3xl font-black text-white mb-3">Sports & Wellness</h2>
              <p className="text-slate-300">From cricket to triathlon, padel to mindfulness — Planet Heroes live active, healthy, connected lives.</p>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
              {SPORTS_PILLARS.map((p) => (
                <div key={p.title} className="bg-white/5 border border-white/10 rounded-2xl p-6 hover:bg-white/8 hover:border-white/20 transition-all">
                  <div className="text-3xl mb-3">{p.icon}</div>
                  <h3 className="text-lg font-bold text-white mb-2">{p.title}</h3>
                  <p className="text-sm text-slate-300 mb-4 leading-relaxed">{p.body}</p>
                  <Link href={p.link}>
                    <Button size="sm" variant="outline" className="border-white/20 text-white hover:bg-white/10 text-xs">
                      {p.cta} <ArrowRight className="w-3 h-3 ml-1" />
                    </Button>
                  </Link>
                </div>
              ))}
            </div>

            {/* Wellness CTA */}
            <div className="bg-gradient-to-r from-rose-900/30 to-pink-900/20 border border-rose-400/30 rounded-2xl p-8 text-center">
              <Dumbbell className="w-10 h-10 text-rose-400 mx-auto mb-3" />
              <h3 className="text-2xl font-bold text-white mb-2">Your Wellness Journey Earns Points</h3>
              <p className="text-slate-300 mb-5 max-w-xl mx-auto">Log runs, cleanups, water habits and green commutes. Every healthy choice multiplies your Planet Hero score and earns real rewards.</p>
              <div className="flex flex-wrap justify-center gap-3">
                <Link href="/earn"><Button className="bg-rose-600 hover:bg-rose-500 text-white font-bold rounded-full">Start Earning</Button></Link>
                <Link href="/rewards"><Button variant="outline" className="border-rose-400/40 text-rose-300 hover:bg-rose-500/10 rounded-full">View Rewards</Button></Link>
              </div>
            </div>

            {/* Challenges Feed */}
            <div>
              <h3 className="text-xl font-bold mb-4">Social Challenges</h3>
              <SocialChallengesFeed />
            </div>
          </div>
        )}

        {/* ── SUSTAINABILITY ── */}
        {activeTab === "sustainability" && (
          <div className="space-y-8">
            <div className="text-center max-w-2xl mx-auto mb-6">
              <h2 className="text-3xl font-black text-white mb-3">Sustainability Actions</h2>
              <p className="text-slate-300">Every action earns Hero Points. Every point drives real environmental change in Dubai and beyond.</p>
            </div>

            {/* Action cards */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
              {SUSTAINABILITY_ACTIONS.map((a) => (
                <Link key={a.title} href={a.link}>
                  <div className="bg-white/5 border border-white/10 rounded-2xl p-6 hover:bg-white/8 hover:border-emerald-400/30 transition-all cursor-pointer h-full">
                    <div className="text-3xl mb-3">{a.emoji}</div>
                    <h3 className="text-lg font-bold text-white mb-2">{a.title}</h3>
                    <p className="text-sm text-slate-300 mb-4 leading-relaxed">{a.desc}</p>
                    <Badge className="bg-emerald-500/20 text-emerald-300 border-0">{a.pts}</Badge>
                  </div>
                </Link>
              ))}
            </div>

            {/* Impact stats */}
            <div className="bg-gradient-to-r from-emerald-900/30 to-teal-900/20 border border-emerald-500/30 rounded-2xl p-8">
              <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-emerald-400" /> Community Impact — Dubai
              </h3>
              <div className="grid md:grid-cols-3 gap-5">
                {[
                  { area: "Downtown Dubai", heroes: "3,247", pct: 85, color: "bg-emerald-500" },
                  { area: "Dubai Marina", heroes: "2,891", pct: 75, color: "bg-cyan-500" },
                  { area: "JBR & JLT", heroes: "1,956", pct: 60, color: "bg-amber-500" },
                ].map(({ area, heroes, pct, color }) => (
                  <div key={area} className="text-center p-5 bg-white/5 rounded-xl">
                    <div className="text-2xl font-bold text-white mb-1">{heroes}</div>
                    <div className="text-sm text-slate-300 mb-3">Heroes in {area}</div>
                    <div className="w-full bg-slate-700 rounded-full h-2">
                      <div className={`${color} h-2 rounded-full`} style={{ width: `${pct}%` }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Saqi Kawthar mission */}
            <div className="bg-gradient-to-r from-red-900/30 to-cyan-900/20 border border-red-500/30 rounded-2xl p-7">
              <div className="flex items-center gap-2 mb-3">
                <div className="w-2 h-2 bg-red-400 rounded-full animate-pulse" />
                <span className="text-red-400 text-sm font-bold uppercase tracking-widest">Urgent Mission</span>
              </div>
              <h3 className="text-xl font-bold text-white mb-2">🚨 Saqi Kawthar Project</h3>
              <p className="text-slate-300 mb-4">Help provide clean water to communities in critical need. Every device trade-in and AquaCafe installation funds water relief directly.</p>
              <Link href="/mission-control-saqi-kawthar">
                <Button className="bg-red-600 hover:bg-red-500 text-white font-bold">Join Mission <ArrowRight className="w-4 h-4 ml-2" /></Button>
              </Link>
            </div>
          </div>
        )}

        {/* ── DUBAI FUTURE ── */}
        {activeTab === "future" && (
          <div className="space-y-8">
            <div className="text-center max-w-2xl mx-auto mb-6">
              <h2 className="text-3xl font-black text-white mb-3">Dubai Future District</h2>
              <p className="text-slate-300">AI, clean energy, aerotropolis, smart transport and healthy living — Planet Heroes are at the forefront of Dubai's next chapter.</p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
              {FUTURE_PILLARS.map((p) => {
                const Icon = p.icon;
                return (
                  <Link key={p.title} href={p.link}>
                    <div className={`bg-gradient-to-br ${p.bg} border ${p.border} rounded-2xl p-6 hover:scale-[1.02] transition-transform cursor-pointer h-full`}>
                      <Icon className={`w-8 h-8 ${p.iconColor} mb-3`} />
                      <h3 className="text-lg font-bold text-white mb-2">{p.title}</h3>
                      <p className="text-sm text-slate-300 leading-relaxed">{p.body}</p>
                    </div>
                  </Link>
                );
              })}
            </div>

            {/* Airport / Aerotropolis highlight */}
            <div className="bg-gradient-to-r from-amber-900/20 to-sky-900/20 border border-amber-400/20 rounded-2xl p-8 flex flex-col md:flex-row items-center gap-8">
              <div className="text-7xl">✈️</div>
              <div>
                <h3 className="text-2xl font-bold text-white mb-2">Aerotropolis — Dubai World Central</h3>
                <p className="text-slate-300 mb-4">Al Maktoum International is growing into the world's largest airport city. ChainTrack connects cargo, logistics operators and import/export businesses across the aerotropolis zone.</p>
                <div className="flex flex-wrap gap-3">
                  <Link href="/chaintrack-logistics"><Button className="bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold">ChainTrack Logistics</Button></Link>
                  <Link href="/chaintrack"><Button variant="outline" className="border-amber-400/40 text-amber-300 hover:bg-amber-500/10">Freight Intelligence</Button></Link>
                </div>
              </div>
            </div>

            {/* Travel CTA */}
            <div className="grid md:grid-cols-2 gap-5">
              <div className="bg-violet-500/10 border border-violet-400/30 rounded-2xl p-6">
                <Cpu className="w-8 h-8 text-violet-400 mb-3" />
                <h3 className="text-lg font-bold text-white mb-2">AI & Smart City Hub</h3>
                <p className="text-sm text-slate-300 mb-4">Connect with Dubai's AI startup ecosystem, smart city initiatives and tech entrepreneurs building the future.</p>
                <Link href="/invest"><Button size="sm" className="bg-violet-600 hover:bg-violet-500 text-white">Explore AI Hub <ArrowRight className="w-3 h-3 ml-1" /></Button></Link>
              </div>
              <div className="bg-orange-500/10 border border-orange-400/30 rounded-2xl p-6">
                <Sun className="w-8 h-8 text-orange-400 mb-3" />
                <h3 className="text-lg font-bold text-white mb-2">Travel & Healthy Living</h3>
                <p className="text-sm text-slate-300 mb-4">Earn travel perks, wellness retreats and airport lounge access through your Planet Hero points and DXB rewards.</p>
                <Link href="/earn"><Button size="sm" className="bg-orange-600 hover:bg-orange-500 text-white">Earn Travel Perks <ArrowRight className="w-3 h-3 ml-1" /></Button></Link>
              </div>
            </div>
          </div>
        )}

        {/* ── CONNECT ── */}
        {activeTab === "connect" && (
          <div className="space-y-6">
            <div className="bg-gradient-to-br from-slate-800/60 to-slate-800/40 border border-white/10 rounded-2xl p-7 mb-2">
              <h2 className="text-2xl font-bold text-white mb-2 flex items-center gap-2">
                <Globe className="w-6 h-6 text-emerald-400" /> Connect Worldwide
              </h2>
              <p className="text-slate-300">Join our official channels and connect with Planet Heroes, brokers, sustainability advocates and Dubai Future District innovators.</p>
            </div>

            <div className="grid md:grid-cols-2 gap-5">
              {CONNECT_CHANNELS.map((c) => (
                <div key={c.name} className={`border ${c.color} rounded-2xl p-6`}>
                  <div className="flex items-start gap-3 mb-3">
                    <span className="text-2xl">{c.emoji}</span>
                    <div>
                      <h3 className="font-bold text-white text-sm">{c.name}</h3>
                      <p className="text-xs text-slate-400 capitalize mt-0.5">{c.type}</p>
                    </div>
                  </div>
                  <p className="text-sm text-slate-300 mb-4">{c.desc}</p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1.5 text-xs text-slate-400">
                      <Users className="w-3.5 h-3.5" />{c.members} members
                    </div>
                    {c.internal ? (
                      <Link href={c.url}>
                        <Button size="sm" className="bg-emerald-600 hover:bg-emerald-500 text-white text-xs">Join <ArrowRight className="w-3 h-3 ml-1" /></Button>
                      </Link>
                    ) : (
                      <Button size="sm" className="bg-emerald-600 hover:bg-emerald-500 text-white text-xs" onClick={() => window.open(c.url, '_blank')}>
                        <ExternalLink className="w-3 h-3 mr-1" /> Join
                      </Button>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* Forum / Post */}
            <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
              <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                <MessageCircle className="w-5 h-5 text-emerald-400" /> Heroes Forum
              </h3>
              <div className="relative mb-4">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500 w-4 h-4" />
                <input
                  type="text"
                  placeholder="Search discussions, missions, communities..."
                  value={forumSearch}
                  onChange={(e) => setForumSearch(e.target.value)}
                  className="w-full bg-slate-800 border border-slate-700 text-white rounded-xl pl-10 pr-4 py-3 text-sm focus:outline-none focus:border-emerald-500"
                />
              </div>
              <div className="flex flex-wrap gap-2 mb-5">
                {["Water Heroes", "Recommerce", "Brokers", "Clean Energy", "Sports", "Dubai Future"].map((tag) => (
                  <Badge key={tag} variant="outline" className="border-white/20 text-slate-300 hover:bg-white/10 cursor-pointer text-xs">#{tag}</Badge>
                ))}
              </div>
              <input
                type="text"
                placeholder="Share your Planet Hero journey..."
                className="w-full bg-slate-800 border border-slate-700 text-white rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-emerald-500 mb-3"
              />
              <Button className="bg-emerald-600 hover:bg-emerald-500 text-white font-semibold">
                <Send className="w-4 h-4 mr-2" /> Post to Community
              </Button>
            </div>
          </div>
        )}

        {/* ── LEADERBOARD ── */}
        {activeTab === "leaderboard" && (
          <div className="space-y-6">
            <div className="flex items-center justify-between mb-2">
              <h2 className="text-2xl font-bold text-white">Community Leaderboard</h2>
              <Link href="/leaderboard">
                <Button size="sm" variant="outline" className="border-white/20 text-white hover:bg-white/10 text-xs">Full Leaderboard <ArrowRight className="w-3 h-3 ml-1" /></Button>
              </Link>
            </div>
            <LeaderboardWidget showHeader={true} />
            <div className="grid md:grid-cols-2 gap-4">
              <div className="bg-amber-500/10 border border-amber-400/30 rounded-2xl p-5">
                <Trophy className="w-7 h-7 text-amber-400 mb-2" />
                <h3 className="font-bold text-white mb-1">Brokers League Table</h3>
                <p className="text-sm text-slate-300 mb-3">See how agency teams rank in the 2026 cricket season.</p>
                <Link href="/league"><Button size="sm" className="bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold">View League Table</Button></Link>
              </div>
              <div className="bg-emerald-500/10 border border-emerald-400/30 rounded-2xl p-5">
                <Leaf className="w-7 h-7 text-emerald-400 mb-2" />
                <h3 className="font-bold text-white mb-1">Hero Points Ranking</h3>
                <p className="text-sm text-slate-300 mb-3">Top Planet Heroes by sustainability missions, trades and referrals.</p>
                <Link href="/earn"><Button size="sm" className="bg-emerald-600 hover:bg-emerald-500 text-white font-bold">Earn Points</Button></Link>
              </div>
            </div>
          </div>
        )}

        {/* ── EVENTS ── */}
        {activeTab === "events" && (
          <div className="space-y-5">
            <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
              <Calendar className="w-6 h-6 text-emerald-400" /> Upcoming Events
            </h2>
            {EVENTS.map((ev) => (
              <div key={ev.id} className="bg-white/5 border border-white/10 rounded-2xl p-6 hover:border-white/20 transition-all">
                <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-lg font-bold text-white">{ev.title}</h3>
                      <Badge className={`text-xs border-0 ${ev.badgeColor}`}>{ev.badge}</Badge>
                      <Badge className={`text-xs border-0 ${ev.status === 'active' ? 'bg-emerald-500/20 text-emerald-300' : 'bg-blue-500/20 text-blue-300'}`}>
                        {ev.status === 'active' ? '● ACTIVE' : 'UPCOMING'}
                      </Badge>
                    </div>
                    <p className="text-slate-300 text-sm mb-3">{ev.description}</p>
                    <div className="flex flex-wrap items-center gap-4 text-xs text-slate-400">
                      <span className="flex items-center gap-1"><Calendar className="w-3.5 h-3.5" />{ev.date}</span>
                      <span className="flex items-center gap-1"><Users className="w-3.5 h-3.5" />{ev.participants.toLocaleString()} participants</span>
                    </div>
                  </div>
                  <div className="flex flex-col gap-2 md:items-end">
                    <div className="text-xs text-amber-300 flex items-center gap-1">
                      <Gift className="w-3.5 h-3.5" />{ev.reward}
                    </div>
                    <Link href={ev.link}>
                      <Button size="sm" className={`font-bold text-xs ${ev.status === 'active' ? 'bg-emerald-600 hover:bg-emerald-500 text-white' : 'bg-blue-600 hover:bg-blue-500 text-white'}`}>
                        {ev.status === 'active' ? 'Join Now' : 'Register'} <ArrowRight className="w-3 h-3 ml-1" />
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

      </section>
    </div>
  );
}
