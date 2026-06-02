import { Helmet } from "react-helmet";
import { useState, createContext, useContext } from "react";
import { useMutation, useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Waves, MapPin, CheckCircle2, MessageCircle, ArrowRight,
  Building2, Eye, Sun, Users, Zap, Video, Star, Clock,
  Handshake, Globe2, Phone, TrendingUp, Shield, Award,
  ChevronRight, Rocket, Share2, BadgeCheck, Sparkles,
  CalendarClock, Wallet, Home, TreePine, Dumbbell, Coffee,
  Menu, X,
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { motion } from "framer-motion";
import { SiTelegram } from "react-icons/si";

const WA = "971523906019";
const TG = "https://t.me/+971523946311";
const waUrl = (msg: string) => `https://wa.me/${WA}?text=${encodeURIComponent(msg)}`;
const tgUrl = (msg: string) => `${TG}?start=${encodeURIComponent(msg)}`;

// ── i18n ──────────────────────────────────────────────────────────────────────
type Lang = "en" | "ru" | "zh";

const STRINGS = {
  en: {
    flag: "🇬🇧", label: "EN",
    heroTagline: "Your window closes soon.",
    heroDesc: "Six towers. 325m of Arabian Gulf waterfront. 360° uninterrupted sea views.",
    heroDesc2: "AED 20K secures your unit on a 30/70 plan. Delivery 2030. DeliWer brokers get first access — now, before the public launch.",
    num1BR: "1BR from", numBook: "Booking fee", numPlan: "Payment plan", numDel: "Delivery",
    ctaEoi: "Register My EOI", ctaTg: "Telegram", ctaWa: "WhatsApp",
    tgNote: "Telegram preferred for CIS · Russia · Asia · Global",
    tourBtn: "Book Founder Site Tour",
    finalH: "Questions? Talk to a DeliWer partner now.",
    finalP: "Available on Telegram & WhatsApp — UAE business hours + all global time zones.",
    finalTgNote: "Telegram preferred for CIS · Russia · China · Southeast Asia · Europe",
    tgPartner: "Telegram a Partner", waPartner: "WhatsApp a Partner",
    shareBtn: "Share with Brokers", shareWa: "Share on WhatsApp",
    navEoi: "Register EOI",
  },
  ru: {
    flag: "🇷🇺", label: "RU",
    heroTagline: "Ваше окно закрывается скоро.",
    heroDesc: "Шесть башен. 325 м береговой линии Аравийского залива. Панорамный вид 360°.",
    heroDesc2: "AED 20K фиксирует вашу квартиру по схеме 30/70. Сдача 2030. Брокеры DeliWer получают приоритетный доступ до публичного запуска.",
    num1BR: "1-комн. от", numBook: "Залог", numPlan: "Схема 30/70", numDel: "Сдача",
    ctaEoi: "Зарегистрировать интерес", ctaTg: "Telegram", ctaWa: "WhatsApp",
    tgNote: "Telegram — выбор для СНГ и России",
    tourBtn: "Виртуальный тур с основателем",
    finalH: "Вопросы? Свяжитесь с партнёром DeliWer.",
    finalP: "Доступны в Telegram и WhatsApp — ОАЭ и все мировые часовые пояса.",
    finalTgNote: "Telegram — предпочтительный канал для СНГ · России · Европы",
    tgPartner: "Написать в Telegram", waPartner: "Написать в WhatsApp",
    shareBtn: "Поделиться с брокерами", shareWa: "Поделиться в WhatsApp",
    navEoi: "Регистрация",
  },
  zh: {
    flag: "🇨🇳", label: "中文",
    heroTagline: "机会窗口即将关闭。",
    heroDesc: "六座塔楼，325米阿拉伯湾海岸线，360°无遮挡海景。",
    heroDesc2: "仅需 AED 2万 即可锁定房源，30/70付款计划，2030年竣工交付。DeliWer 经纪人享有优先认购权。",
    num1BR: "一居室起价", numBook: "预订金", numPlan: "30/70付款", numDel: "竣工",
    ctaEoi: "登记意向书", ctaTg: "Telegram", ctaWa: "WhatsApp",
    tgNote: "Telegram 是亚洲客户首选渠道",
    tourBtn: "预约创始人现场导览",
    finalH: "有疑问？立即联系 DeliWer 合作伙伴。",
    finalP: "Telegram 和 WhatsApp 均可联系 — 覆盖全球所有时区。",
    finalTgNote: "Telegram — 亚洲 · 东南亚 · 欧洲首选渠道",
    tgPartner: "Telegram 联系", waPartner: "WhatsApp 联系",
    shareBtn: "分享给经纪人", shareWa: "WhatsApp 分享",
    navEoi: "登记意向",
  },
} as const;

type Strings = typeof STRINGS.en;

const LangCtx = createContext<{ lang: Lang; setLang: (l: Lang) => void; s: Strings }>({
  lang: "en", setLang: () => {}, s: STRINGS.en,
});

const UNIT_TYPES = ["1 Bedroom – from AED 849K", "2 Bedrooms – from AED 1.384M", "3 Bedrooms – from AED 2.249M", "4 Bedroom / Penthouse"];
const BUDGETS = ["AED 750K – 1.2M", "AED 1.2M – 1.8M", "AED 1.8M – 2.5M", "AED 2.5M – 4M", "AED 4M+"];
const NATIONALITIES = ["Pakistani", "Indian", "British", "Egyptian", "Sudanese", "Jordanian", "Lebanese", "Other Arab", "European", "East Asian", "Other"];

const AMENITIES = [
  { icon: Waves, label: "325m Waterfront" },
  { icon: Eye, label: "360° Sea Views" },
  { icon: Dumbbell, label: "Wellness Centre" },
  { icon: Coffee, label: "Curated F&B" },
  { icon: TreePine, label: "Landscaped Parks" },
  { icon: Users, label: "Co-Living Lounges" },
  { icon: Zap, label: "Smart Home Tech" },
  { icon: Sun, label: "Solar Energy" },
];

const UNITS = [
  { type: "1BR", sqm: 74.91, units: 212, price: 849000, accent: "from-cyan-500 to-blue-600", highlight: "Best entry, highest rental yield" },
  { type: "2BR", sqm: 115.02, units: 236, price: 1384000, accent: "from-emerald-500 to-teal-600", highlight: "Most popular with families" },
  { type: "3BR", sqm: 179.35, units: 48, price: 2249000, accent: "from-violet-500 to-purple-600", highlight: "Limited availability — act fast" },
  { type: "4BR / PH", sqm: 319.01, units: 4, price: 0, accent: "from-amber-500 to-orange-600", highlight: "Ultra-exclusive — only 4 units" },
];

const BROKER_PERKS = [
  { icon: Wallet, t: "Priority EOI Access", d: "Register now and get first access before public launch — lock clients into the best units at launch pricing." },
  { icon: Video, t: "Founder-Led Site Tour", d: "We're located near Mamzar Beach. Book a live video walkthrough hosted by DeliWer founders on the ground." },
  { icon: Award, t: "Commission Advantage", d: "Early-bird broker commission structure with premium payout on every qualified unit sold through your referral." },
  { icon: Share2, t: "Viral Referral Chain", d: "Share your unique broker code. Every sub-referral you bring earns you a trailing override — build a passive income stream." },
];

const LOCATION_FACTS = [
  { label: "Dubai Int'l Airport", value: "9–15 min" },
  { label: "Al Qiyadah Metro", value: "5 min" },
  { label: "Mamzar Park", value: "5 min" },
  { label: "Al Hamza Mall", value: "5 min" },
  { label: "Medcare Hospital", value: "5 min" },
  { label: "Sharjah Airport", value: "20–25 min" },
  { label: "Al Ittihad Road", value: "4 min" },
  { label: "Sahara Centre", value: "6 min" },
];

// ── DeliWer Lifestyle nav — Mamzar only ──────────────────────────────────────
const NAV_ITEMS_EN = [
  { label: "The Project", href: "#overview" },
  { label: "Units",       href: "#units"    },
  { label: "Tour",        href: "#tour"     },
  { label: "Location",    href: "#location" },
  { label: "Brokers",     href: "#brokers"  },
];

const LANG_FLAGS: Record<Lang, string> = { en: "🇬🇧", ru: "🇷🇺", zh: "🇨🇳" };
const LANG_LABELS: Record<Lang, string> = { en: "EN", ru: "RU", zh: "中文" };

function LangSwitcher({ compact = false }: { compact?: boolean }) {
  const { lang, setLang } = useContext(LangCtx);
  const langs: Lang[] = ["en", "ru", "zh"];
  return (
    <div className={`flex items-center ${compact ? "gap-0.5" : "gap-1"} bg-slate-900 border border-slate-800 rounded-lg p-0.5`}>
      {langs.map((l) => (
        <button
          key={l}
          onClick={() => setLang(l)}
          className={`px-2 py-1 text-[10px] font-black rounded-md transition-all ${
            lang === l
              ? "bg-cyan-500 text-slate-950"
              : "text-slate-400 hover:text-white"
          }`}
        >
          {LANG_FLAGS[l]} {LANG_LABELS[l]}
        </button>
      ))}
    </div>
  );
}

function MamzarNav() {
  const [open, setOpen] = useState(false);
  const { s } = useContext(LangCtx);

  const go = (href: string) => {
    setOpen(false);
    const id = href.replace("#", "");
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <nav className="sticky top-0 z-50 border-b border-cyan-900/40 bg-slate-950/95 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-between h-14 gap-2">
        {/* Brand */}
        <a href="/" className="flex items-center gap-2 shrink-0">
          <Waves className="w-5 h-5 text-cyan-400" />
          <span className="font-black text-white tracking-tight">DeliWer</span>
          <span className="hidden sm:inline-block bg-cyan-500/15 border border-cyan-500/30 text-cyan-400 text-[9px] font-black uppercase tracking-widest px-2 py-0.5 rounded-full">
            Lifestyle
          </span>
        </a>

        {/* Desktop section links */}
        <div className="hidden lg:flex items-center gap-0.5 flex-1 justify-center">
          {NAV_ITEMS_EN.map((item) => (
            <button
              key={item.href}
              onClick={() => go(item.href)}
              className="px-3 py-1.5 text-xs font-bold uppercase tracking-widest rounded-lg text-slate-400 hover:text-white hover:bg-white/5 transition-colors"
            >
              {item.label}
            </button>
          ))}
          <button
            onClick={() => go("#eoi")}
            className="px-3 py-1.5 text-xs font-bold uppercase tracking-widest rounded-lg bg-cyan-500 hover:bg-cyan-400 text-slate-950 transition-colors ml-1"
          >
            {s.navEoi}
          </button>
        </div>

        {/* Desktop right: lang switcher + channels */}
        <div className="hidden md:flex items-center gap-2 shrink-0">
          <LangSwitcher compact />
          <Button
            size="sm"
            variant="outline"
            className="border-sky-500/50 text-sky-400 hover:bg-sky-500/10 font-black"
            onClick={() => window.open(TG, "_blank")}
          >
            <SiTelegram className="w-3.5 h-3.5 mr-1.5" /> {s.ctaTg}
          </Button>
          <Button
            size="sm"
            className="bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-black"
            onClick={() => window.open(waUrl("Hi DeliWer — I want to learn more about Alef Linar, Mamzar Beach pre-launch."), "_blank")}
          >
            <MessageCircle className="w-3.5 h-3.5 mr-1.5" /> {s.ctaWa}
          </Button>
        </div>

        {/* Mobile: lang + hamburger */}
        <div className="flex items-center gap-2 md:hidden">
          <LangSwitcher compact />
          <button
            className="p-2 text-slate-400 hover:text-white"
            onClick={() => setOpen(!open)}
            aria-label="Toggle menu"
          >
            {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile drawer */}
      {open && (
        <div className="md:hidden border-t border-cyan-900/30 bg-slate-950 px-4 py-3 space-y-1">
          {NAV_ITEMS_EN.map((item) => (
            <button
              key={item.href}
              onClick={() => go(item.href)}
              className="w-full text-left px-4 py-2.5 text-sm font-bold uppercase tracking-widest rounded-xl text-slate-400 hover:text-white hover:bg-white/5 transition-colors"
            >
              {item.label}
            </button>
          ))}
          <button
            onClick={() => go("#eoi")}
            className="w-full text-left px-4 py-2.5 text-sm font-bold uppercase tracking-widest rounded-xl bg-cyan-500/20 text-cyan-400 hover:bg-cyan-500/30 transition-colors"
          >
            {s.navEoi}
          </button>
          <div className="flex gap-2 pt-2">
            <Button size="sm" className="flex-1 bg-sky-500 hover:bg-sky-400 text-white font-black"
              onClick={() => { setOpen(false); window.open(TG, "_blank"); }}>
              <SiTelegram className="w-3.5 h-3.5 mr-1" /> {s.ctaTg}
            </Button>
            <Button size="sm" className="flex-1 bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-black"
              onClick={() => { setOpen(false); window.open(waUrl("Hi DeliWer — I want to learn more about Alef Linar, Mamzar Beach pre-launch."), "_blank"); }}>
              <MessageCircle className="w-3.5 h-3.5 mr-1" /> {s.ctaWa}
            </Button>
          </div>
        </div>
      )}
    </nav>
  );
}

const MARKET_STATS = [
  { v: "AED 18.5B", l: "Sharjah RE transactions Q1 2026" },
  { v: "+40.7%", l: "Year-on-year growth" },
  { v: "AED 3.5B", l: "April 2026 transactions alone" },
  { v: "78%", l: "Sales in residential segment" },
];

type EoiForm = {
  brokerName: string;
  brokerPhone: string;
  brokerEmail: string;
  brokerage: string;
  reraLicense: string;
  country: string;
  unitType: string;
  budget: string;
  clientName: string;
  clientPhone: string;
  clientNationality: string;
  tourRequested: boolean;
  earlybirdOpted: boolean;
  notes: string;
};

const EMPTY: EoiForm = {
  brokerName: "", brokerPhone: "", brokerEmail: "", brokerage: "",
  reraLicense: "", country: "", unitType: "", budget: "",
  clientName: "", clientPhone: "", clientNationality: "",
  tourRequested: false, earlybirdOpted: true, notes: "",
};

function scrollTo(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
}

function fmtAED(n: number) {
  if (!n) return "Call for price";
  return "AED " + n.toLocaleString("en-AE");
}

export default function MamzarBeach() {
  const { toast } = useToast();
  const [form, setForm] = useState<EoiForm>(EMPTY);
  const [submitted, setSubmitted] = useState(false);
  const [eoiRef, setEoiRef] = useState("");
  const [lang, setLang] = useState<Lang>("en");
  const s = STRINGS[lang];

  const { data: stats } = useQuery({
    queryKey: ["/api/mamzar/stats"],
    refetchInterval: 30000,
  });

  const submitEoi = useMutation({
    mutationFn: async (data: EoiForm) => {
      const res = await fetch("/api/mamzar/eoi", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error(await res.text());
      return res.json();
    },
    onSuccess: (data) => {
      setSubmitted(true);
      setEoiRef(data.referralCode);
      toast({ title: "EOI Registered!", description: `Your ref: ${data.referralCode}` });
    },
    onError: () => {
      toast({ title: "Error", description: "Please try again or WhatsApp us directly.", variant: "destructive" });
    },
  });

  const valid = form.brokerName.length >= 2 && form.brokerPhone.length >= 7;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!valid) return;
    submitEoi.mutate(form);
  };

  const shareMsg = `🏖️ Pre-Launch Opportunity — Alef Linar, Mamzar Beach Sharjah\n\n• 5 towers on a 325m waterfront\n• 360° Arabian Gulf views\n• 1BR from AED 849K | 30/70 plan | AED 20K to book\n• Ready 2030 | 9 min from Dubai Airport\n\nRegister your EOI now: ${window.location.href}\n\nVia DeliWer Real Estate`;

  return (
    <LangCtx.Provider value={{ lang, setLang, s }}>
    <div className="min-h-screen bg-slate-950 text-white font-sans">
      <Helmet>
        <title>Alef Linar Mamzar Beach — Pre-Launch | DeliWer Real Estate</title>
        <meta name="description" content="Exclusive pre-launch opportunity: Alef Linar, Mamzar Beach Sharjah. 5 waterfront towers, 360° sea views. 1BR from AED 849K, 30/70 payment plan, AED 20K booking. Register your EOI now." />
        <meta property="og:title" content="Alef Linar Mamzar Beach — Pre-Launch | DeliWer Real Estate" />
        <meta property="og:description" content="325m beachfront, 6 towers, 360° views of Arabian Gulf. 1BR from AED 849K. 30/70 payment plan. Register EOI now before public launch." />
      </Helmet>

      {/* ── STICKY NAV ──────────────────────────────────────────────── */}
      <MamzarNav />

      {/* ── HERO ─────────────────────────────────────────────────────── */}
      <section className="relative overflow-hidden min-h-[92vh] flex flex-col justify-center">
        {/* Gradient background — ocean theme */}
        <div className="absolute inset-0 bg-gradient-to-br from-slate-950 via-cyan-950/40 to-blue-950/60" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_rgba(6,182,212,0.15)_0%,_transparent_60%)]" />
        <div className="absolute bottom-0 left-0 right-0 h-64 bg-gradient-to-t from-slate-950 to-transparent" />

        {/* Floating wave lines */}
        <div className="absolute top-32 right-0 w-96 h-96 opacity-10">
          <svg viewBox="0 0 400 400" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M0 200 Q100 100 200 200 Q300 300 400 200" stroke="#06b6d4" strokeWidth="2" fill="none" />
            <path d="M0 240 Q100 140 200 240 Q300 340 400 240" stroke="#06b6d4" strokeWidth="1.5" fill="none" />
            <path d="M0 280 Q100 180 200 280 Q300 380 400 280" stroke="#06b6d4" strokeWidth="1" fill="none" />
          </svg>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-28">
          <div className="max-w-4xl">
            {/* Pre-launch badge */}
            <div className="flex flex-wrap items-center gap-2 mb-6">
              <Badge className="bg-red-500/20 text-red-300 border-red-500/40 animate-pulse font-bold px-3 py-1">
                <span className="w-2 h-2 rounded-full bg-red-400 inline-block mr-2 animate-ping" />
                PRE-LAUNCH · EOI OPEN NOW
              </Badge>
              <Badge className="bg-cyan-500/15 text-cyan-300 border-cyan-500/30">
                <MapPin className="w-3 h-3 mr-1" /> Mamzar Beach, Sharjah
              </Badge>
              {stats && (stats as any).total > 0 && (
                <Badge className="bg-emerald-500/15 text-emerald-300 border-emerald-500/30">
                  <Users className="w-3 h-3 mr-1" /> {(stats as any).total} brokers registered
                </Badge>
              )}
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black leading-tight mb-5">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 via-blue-200 to-cyan-400">
                Alef Linar
              </span>
              <br />
              <span className="text-white">Mamzar Beach</span>
              <br />
              <span className="text-slate-300 text-3xl sm:text-4xl lg:text-5xl font-bold">{s.heroTagline}</span>
            </h1>

            <p className="text-slate-300 text-lg sm:text-xl max-w-2xl mb-8 leading-relaxed">
              {s.heroDesc}{" "}
              <span className="text-white font-semibold">AED 20K</span>{" "}
              {s.heroDesc2}
            </p>

            {/* Key numbers bar */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-8">
              {[
                { v: "AED 849K", l: s.num1BR },
                { v: "AED 20K",  l: s.numBook },
                { v: "30 / 70", l: s.numPlan },
                { v: "2030",    l: s.numDel },
              ].map(({ v, l }) => (
                <div key={l} className="rounded-xl border border-cyan-500/20 bg-cyan-500/5 px-4 py-3 text-center">
                  <div className="text-xl sm:text-2xl font-black text-cyan-300">{v}</div>
                  <div className="text-xs text-slate-400 uppercase tracking-widest mt-0.5">{l}</div>
                </div>
              ))}
            </div>

            <div className="flex flex-wrap gap-3">
              <Button
                size="lg"
                className="h-13 px-7 bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-black text-base"
                onClick={() => scrollTo("eoi")}
              >
                <BadgeCheck className="w-5 h-5 mr-2" />
                {s.ctaEoi}
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="h-13 px-6 border-sky-500/50 text-sky-400 hover:bg-sky-500/10"
                onClick={() => window.open(TG, "_blank")}
              >
                <SiTelegram className="w-4 h-4 mr-2" />
                {s.ctaTg}
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="h-13 px-6 border-slate-600 text-slate-200 hover:bg-slate-800 hover:text-white"
                onClick={() => window.open(waUrl("Hi DeliWer — I want to book a virtual site tour for Alef Linar, Mamzar Beach."), "_blank")}
              >
                <MessageCircle className="w-4 h-4 mr-2" />
                {s.ctaWa}
              </Button>
            </div>
            <p className="text-[11px] text-slate-500 font-bold uppercase tracking-widest mt-1">
              {s.tgNote}
            </p>
          </div>
        </div>
      </section>

      {/* ── MARKET PULSE ──────────────────────────────────────────────── */}
      <section className="border-y border-cyan-500/10 bg-gradient-to-r from-cyan-950/30 via-slate-950 to-blue-950/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10">
          <div className="text-center mb-6">
            <Badge className="bg-emerald-500/15 text-emerald-300 border-emerald-500/30">
              <TrendingUp className="w-3.5 h-3.5 mr-1.5" /> Sharjah Real Estate Market Q1 2026
            </Badge>
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {MARKET_STATS.map(({ v, l }) => (
              <div key={l} className="text-center rounded-xl border border-slate-800 bg-slate-900/60 p-5">
                <div className="text-2xl sm:text-3xl font-black text-emerald-300">{v}</div>
                <div className="text-xs text-slate-400 mt-1">{l}</div>
              </div>
            ))}
          </div>
          <p className="text-center text-xs text-slate-500 mt-4">
            Source: Sharjah Real Estate Registration Department, Q1 2026. Freehold reforms have opened ownership to international buyers.
          </p>
        </div>
      </section>

      {/* ── PROJECT OVERVIEW ──────────────────────────────────────────── */}
      <section id="project" className="scroll-mt-20 py-20 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-14">
            <Badge className="bg-cyan-500/15 text-cyan-300 border-cyan-500/30 mb-3">
              <Building2 className="w-3.5 h-3.5 mr-1.5" /> About the Project
            </Badge>
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">
              To live here is to belong to the water
            </h2>
            <p className="text-slate-300 text-lg leading-relaxed">
              Alef Linar rises as a harmony of six towers along the tranquil shores of Al Mamzar, where the boundaries of home, skyline, and sea dissolve into one. Designed for families, investors, and residents who want Sharjah's calm with Dubai's connectivity.
            </p>
          </div>

          {/* Amenities grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-14">
            {AMENITIES.map(({ icon: Icon, label }) => (
              <div
                key={label}
                className="flex flex-col items-center gap-2 rounded-xl border border-slate-800 bg-slate-900/60 p-5 hover:border-cyan-500/30 transition"
              >
                <div className="w-10 h-10 rounded-xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center">
                  <Icon className="w-5 h-5 text-cyan-300" />
                </div>
                <span className="text-sm font-semibold text-white text-center">{label}</span>
              </div>
            ))}
          </div>

          {/* Design callout */}
          <div className="rounded-2xl border border-cyan-500/20 bg-gradient-to-br from-cyan-950/30 via-slate-900/60 to-blue-950/20 p-8 lg:p-10">
            <div className="grid lg:grid-cols-2 gap-8 items-center">
              <div>
                <h3 className="text-2xl font-bold mb-4 text-cyan-200">Architecture inspired by the wave</h3>
                <ul className="space-y-3 text-slate-300">
                  {[
                    "Ribbon-like balconies curving around each tower with glass balustrades",
                    "3.3m high ceilings and floor-to-ceiling windows in every residence",
                    "Custom kitchens with blue porcelain accents and smart home integration",
                    "EV charging, photovoltaic solar panels, rubberised low-carbon infrastructure",
                    "Delivery hub, on-site fuel kiosk, and amphitheatre on the ground plaza",
                  ].map((b) => (
                    <li key={b} className="flex gap-2.5">
                      <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                      <span className="text-sm">{b}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="space-y-3">
                {[
                  { icon: Home, t: "5 residential + 1 commercial tower", d: "Spread across 5.5 hectares of prime Mamzar waterfront" },
                  { icon: Waves, t: "325m water frontage", d: "360° panoramas of Arabian Gulf, Sharjah skyline & desert horizon" },
                  { icon: Shield, t: "Alef Group — Sharjah's master developer", d: "Design-led approach shaping communities with purpose and connection" },
                ].map(({ icon: Icon, t, d }) => (
                  <div key={t} className="flex gap-3 rounded-xl border border-slate-800 bg-slate-950/60 p-4">
                    <div className="w-9 h-9 rounded-lg bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center shrink-0">
                      <Icon className="w-4 h-4 text-cyan-300" />
                    </div>
                    <div>
                      <div className="font-semibold text-white text-sm">{t}</div>
                      <div className="text-xs text-slate-400 mt-0.5">{d}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── UNIT TYPOLOGIES ───────────────────────────────────────────── */}
      <section id="units" className="scroll-mt-20 py-20 border-t border-slate-900 bg-slate-950/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <Badge className="bg-violet-500/15 text-violet-300 border-violet-500/30 mb-3">
              <Wallet className="w-3.5 h-3.5 mr-1.5" /> Unit Typologies &amp; Pricing
            </Badge>
            <h2 className="text-3xl sm:text-4xl font-bold mb-3">
              500 total units. Pre-launch pricing ends soon.
            </h2>
            <p className="text-slate-400">
              All units secured on a 30/70 payment plan — AED 20,000 booking fee. 70% on handover in 2030.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            {UNITS.map(({ type, sqm, units, price, accent, highlight }) => (
              <Card
                key={type}
                className="bg-slate-900/70 border-slate-800 hover:border-slate-700 overflow-hidden flex flex-col transition"
              >
                <div className={`h-1.5 bg-gradient-to-r ${accent}`} />
                <CardContent className="p-5 flex flex-col flex-1">
                  <div className="text-2xl font-black text-white mb-1">{type}</div>
                  <div className="text-xs text-slate-500 uppercase tracking-widest mb-3">{sqm} sqm · {units} units</div>
                  <div className="text-lg font-bold text-cyan-300 mb-1">{fmtAED(price)}</div>
                  <div className="text-xs text-slate-400 mb-4 flex-1">{highlight}</div>
                  <Button
                    className="w-full h-10 bg-slate-800 hover:bg-slate-700 text-white font-semibold text-sm border border-slate-700"
                    onClick={() => {
                      document.getElementById("eoi")?.scrollIntoView({ behavior: "smooth" });
                      setForm(f => ({ ...f, unitType: UNIT_TYPES.find(u => u.startsWith(type.charAt(0))) || "" }));
                    }}
                  >
                    Register Interest
                    <ArrowRight className="w-3.5 h-3.5 ml-1.5" />
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Payment plan highlight */}
          <div className="rounded-2xl border border-emerald-500/30 bg-emerald-500/5 p-6 sm:p-8">
            <div className="grid md:grid-cols-3 gap-6 items-center">
              <div className="md:col-span-2">
                <div className="flex items-center gap-2 mb-2">
                  <CalendarClock className="w-5 h-5 text-emerald-300" />
                  <span className="font-black text-emerald-300 uppercase tracking-widest text-sm">30 / 70 Payment Plan</span>
                </div>
                <h3 className="text-xl sm:text-2xl font-bold text-white mb-2">
                  Secure your unit today with just AED 20,000
                </h3>
                <p className="text-slate-300 text-sm">
                  Pay 30% during construction milestones, 70% on handover in 2030. The most investor-friendly payment structure in the market right now — designed for both end-users and cash-flow investors.
                </p>
              </div>
              <div className="flex flex-col gap-2">
                <Button
                  className="w-full h-12 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black"
                  onClick={() => scrollTo("eoi")}
                >
                  <Rocket className="w-4 h-4 mr-2" /> Secure My Unit
                </Button>
                <Button
                  variant="outline"
                  className="w-full h-12 border-slate-600 text-slate-200 hover:bg-slate-800"
                  onClick={() => window.open(waUrl("Hi DeliWer — please send me the full payment plan schedule for Alef Linar Mamzar."), "_blank")}
                >
                  <MessageCircle className="w-4 h-4 mr-2" /> Get Payment Schedule
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── VIRTUAL SITE TOUR ─────────────────────────────────────────── */}
      <section id="tour" className="scroll-mt-20 py-20 border-t border-slate-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-10 items-center">
            <div>
              <Badge className="bg-fuchsia-500/15 text-fuchsia-300 border-fuchsia-500/30 mb-4">
                <Video className="w-3.5 h-3.5 mr-1.5" /> Founder-Led Virtual Site Tour
              </Badge>
              <h2 className="text-3xl sm:text-4xl font-bold mb-4">
                We're right there on the ground. Your clients aren't — yet.
              </h2>
              <p className="text-slate-300 mb-6 leading-relaxed">
                DeliWer founders are based near Mamzar Beach. We'll take your client on a live WhatsApp video tour of the site — walking the 325m waterfront, pointing out the tower positions, showing the Dubai skyline view, and answering every question in real time. No flights. No expensive site visits. Close deals from anywhere in the world.
              </p>
              <ul className="space-y-3 mb-8">
                {[
                  "Live video from the Mamzar beachfront — exactly where Linar towers will stand",
                  "Founder explains the view, connectivity, and investment thesis live",
                  "Your client gets a personalised walk through their chosen unit orientation",
                  "Recorded and sent to your client for sharing with family decision-makers",
                ].map((b) => (
                  <li key={b} className="flex gap-2.5 text-sm text-slate-300">
                    <CheckCircle2 className="w-4 h-4 text-fuchsia-400 shrink-0 mt-0.5" />
                    {b}
                  </li>
                ))}
              </ul>
              <Button
                className="h-12 px-6 bg-fuchsia-500 hover:bg-fuchsia-400 text-white font-black"
                onClick={() => window.open(waUrl("Hi DeliWer — I'd like to book a founder-led virtual site tour of Alef Linar, Mamzar Beach for my client. Please share available slots."), "_blank")}
              >
                <Video className="w-4 h-4 mr-2" /> Book a Live Tour on WhatsApp
              </Button>
            </div>

            <div className="grid grid-cols-2 gap-3">
              {[
                { icon: Clock, t: "30-min live session", d: "Scheduled around your client's time zone — UAE, UK, Pakistan, India and more." },
                { icon: Globe2, t: "Any language", d: "Arabic, English, Urdu, Hindi. We'll match a founder to your client's preference." },
                { icon: Video, t: "WhatsApp or Zoom", d: "No app downloads needed. Client joins the video call from their phone, wherever they are." },
                { icon: Star, t: "Exclusive broker benefit", d: "This live tour service is reserved for DeliWer registered brokers — not available to the public." },
              ].map(({ icon: Icon, t, d }) => (
                <div key={t} className="rounded-xl border border-fuchsia-500/20 bg-fuchsia-500/5 p-4">
                  <div className="w-8 h-8 rounded-lg bg-fuchsia-500/15 border border-fuchsia-500/30 flex items-center justify-center mb-2">
                    <Icon className="w-4 h-4 text-fuchsia-300" />
                  </div>
                  <div className="font-bold text-white text-sm">{t}</div>
                  <div className="text-xs text-slate-400 mt-1">{d}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── BROKER VALUE PROP ─────────────────────────────────────────── */}
      <section id="brokers" className="scroll-mt-20 py-20 border-t border-slate-900 bg-slate-950/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <Badge className="bg-amber-500/15 text-amber-300 border-amber-500/30 mb-3">
              <Handshake className="w-3.5 h-3.5 mr-1.5" /> Global Broker Programme
            </Badge>
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">
              An early-mover advantage built for brokers worldwide
            </h2>
            <p className="text-slate-300">
              Whether you're RERA-registered in Dubai, based in Pakistan, India, UK or Egypt — if you have clients with AED 850K–2.5M in purchasing power, this is your moment. DeliWer handles the ground work. You bring the client. We split the win.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
            {BROKER_PERKS.map(({ icon: Icon, t, d }) => (
              <div key={t} className="rounded-xl border border-amber-500/20 bg-amber-500/5 p-5 hover:border-amber-500/40 transition">
                <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center mb-3">
                  <Icon className="w-5 h-5 text-amber-300" />
                </div>
                <div className="font-bold text-white mb-1">{t}</div>
                <div className="text-sm text-slate-400">{d}</div>
              </div>
            ))}
          </div>

          {/* Virality / sharing module */}
          <div className="rounded-2xl border border-cyan-500/30 bg-gradient-to-r from-cyan-950/30 via-slate-900/60 to-blue-950/20 p-6 sm:p-8">
            <div className="grid md:grid-cols-2 gap-6 items-center">
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <Share2 className="w-5 h-5 text-cyan-300" />
                  <span className="font-black text-cyan-300 uppercase tracking-widest text-sm">Viral Referral Chain</span>
                </div>
                <h3 className="text-xl sm:text-2xl font-bold text-white mb-2">
                  Turn one registration into a network of commissions
                </h3>
                <p className="text-slate-300 text-sm mb-4">
                  Every broker who registers gets a unique referral code. When you share this page with other brokers who then register and close a deal, you earn a trailing override on their sales too. Build your sub-broker network from Day 1.
                </p>
                <div className="flex flex-wrap gap-2">
                  <Button
                    className="h-10 bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-black"
                    onClick={() => {
                      if (navigator.share) {
                        navigator.share({ title: "Alef Linar Mamzar Beach — Pre-Launch", text: shareMsg, url: window.location.href });
                      } else {
                        navigator.clipboard.writeText(shareMsg);
                        toast({ title: "Copied!", description: "Share message copied to clipboard." });
                      }
                    }}
                  >
                    <Share2 className="w-4 h-4 mr-2" /> Share with Brokers
                  </Button>
                  <Button
                    variant="outline"
                    className="h-10 border-slate-700 text-slate-200 hover:bg-slate-800"
                    onClick={() => window.open(`https://wa.me/?text=${encodeURIComponent(shareMsg)}`, "_blank")}
                  >
                    <MessageCircle className="w-4 h-4 mr-2" /> Share on WhatsApp
                  </Button>
                </div>
              </div>
              <div className="rounded-xl border border-slate-800 bg-slate-950/60 p-5">
                <div className="text-xs font-bold uppercase tracking-widest text-slate-500 mb-3">Example earnings</div>
                <div className="space-y-3">
                  {[
                    { unit: "1BR @ AED 849K", comm: "~AED 25,000", note: "Direct broker commission" },
                    { unit: "2BR @ AED 1.384M", comm: "~AED 41,000", note: "Direct broker commission" },
                    { unit: "Sub-broker close (1BR)", comm: "~AED 5,000", note: "Your trailing override" },
                  ].map(({ unit, comm, note }) => (
                    <div key={unit} className="flex items-center justify-between gap-3 py-2 border-b border-slate-800 last:border-0">
                      <div>
                        <div className="text-sm font-semibold text-white">{unit}</div>
                        <div className="text-xs text-slate-500">{note}</div>
                      </div>
                      <div className="text-emerald-300 font-black text-sm shrink-0">{comm}</div>
                    </div>
                  ))}
                </div>
                <p className="text-[10px] text-slate-600 mt-3">Indicative figures. Actual commission subject to partnership agreement terms.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── LOCATION ──────────────────────────────────────────────────── */}
      <section id="location" className="scroll-mt-20 py-20 border-t border-slate-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <Badge className="bg-emerald-500/15 text-emerald-300 border-emerald-500/30 mb-3">
              <MapPin className="w-3.5 h-3.5 mr-1.5" /> Strategic Location
            </Badge>
            <h2 className="text-3xl sm:text-4xl font-bold mb-3">
              Sharjah's calm. Dubai's 9-minute door.
            </h2>
            <p className="text-slate-400">
              Positioned on Corniche and Al Taawun Street with direct access to Al Wuheida Road — connecting Sharjah to Dubai in minutes.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3 mb-10">
            {LOCATION_FACTS.map(({ label, value }) => (
              <div key={label} className="flex items-center gap-3 rounded-xl border border-slate-800 bg-slate-900/60 p-4">
                <MapPin className="w-4 h-4 text-emerald-400 shrink-0" />
                <div>
                  <div className="text-sm font-semibold text-white">{label}</div>
                  <div className="text-xs text-emerald-300 font-bold">{value}</div>
                </div>
              </div>
            ))}
          </div>

          <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-6 sm:p-8">
            <h3 className="text-lg font-bold text-white mb-4">Why Mamzar over Palm Jumeirah?</h3>
            <div className="grid sm:grid-cols-3 gap-4">
              {[
                { t: "3–5× better value", d: "Comparable Arabian Gulf views and amenities at a fraction of Palm Jumeirah pricing — more accessible to a wider global buyer pool." },
                { t: "Freehold for expats", d: "Sharjah's freehold reforms now allow international buyers full ownership rights — opening a previously closed market to global capital." },
                { t: "Ready before the rush", d: "2030 delivery matches Dubai's World Expo residency wave — tenants and buyers will be competing for limited Mamzar waterfront stock." },
              ].map(({ t, d }) => (
                <div key={t} className="rounded-xl border border-emerald-500/20 bg-emerald-500/5 p-5">
                  <div className="font-bold text-emerald-300 mb-2">{t}</div>
                  <div className="text-sm text-slate-300">{d}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── EOI FORM ──────────────────────────────────────────────────── */}
      <section id="eoi" className="scroll-mt-20 py-20 border-t border-slate-900 bg-gradient-to-b from-cyan-950/20 via-slate-950 to-slate-950">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-10">
            <Badge className="bg-red-500/20 text-red-300 border-red-500/40 mb-3 animate-pulse">
              <span className="w-1.5 h-1.5 rounded-full bg-red-400 inline-block mr-2" />
              Limited Pre-Launch Slots
            </Badge>
            <h2 className="text-3xl sm:text-4xl font-bold mb-3">
              Register your Expression of Interest
            </h2>
            <p className="text-slate-300 max-w-xl mx-auto">
              Takes 60 seconds. You'll receive a unique broker referral code, priority access to unit selection, and a slot for the founder-led site tour.
            </p>
          </div>

          <Card className="bg-slate-900/80 border-cyan-500/30">
            <CardContent className="p-6 sm:p-8">
              {submitted ? (
                <div className="text-center py-10 space-y-5">
                  <div className="w-20 h-20 mx-auto rounded-full bg-emerald-500/15 border-2 border-emerald-500/40 flex items-center justify-center">
                    <CheckCircle2 className="w-10 h-10 text-emerald-400" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-white mb-1">You're in!</h3>
                    <p className="text-slate-300">Your EOI is registered. A DeliWer partner will contact you on WhatsApp within 1 business hour.</p>
                  </div>
                  <div className="rounded-xl border border-cyan-500/30 bg-cyan-500/5 p-4 inline-block">
                    <div className="text-xs text-cyan-400 uppercase tracking-widest font-bold mb-1">Your Broker Referral Code</div>
                    <div className="text-2xl font-black text-white">{eoiRef}</div>
                    <div className="text-xs text-slate-500 mt-1">Share this code with other brokers to earn override commissions</div>
                  </div>
                  <div className="flex flex-wrap justify-center gap-2">
                    <Button
                      className="bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black"
                      onClick={() => window.open(waUrl(`Hi DeliWer — I just registered my EOI for Alef Linar Mamzar (ref: ${eoiRef}). When can we schedule the founder site tour?`), "_blank")}
                    >
                      <Video className="w-4 h-4 mr-2" /> Book Site Tour Now
                    </Button>
                    <Button
                      variant="outline"
                      className="border-slate-600 text-slate-200 hover:bg-slate-800"
                      onClick={() => {
                        const msg = `🏖️ *Alef Linar Mamzar Beach — Pre-Launch*\n\nI just registered my broker EOI with DeliWer.\nJoin me — 5 towers on 325m Sharjah waterfront.\n1BR from AED 849K | 30/70 | 2030 delivery.\n\nRegister: ${window.location.href}\n\n(Use my code when you register: ${eoiRef})`;
                        window.open(`https://wa.me/?text=${encodeURIComponent(msg)}`, "_blank");
                      }}
                    >
                      <Share2 className="w-4 h-4 mr-2" /> Share &amp; Earn Override
                    </Button>
                  </div>
                  <Button variant="ghost" onClick={() => setSubmitted(false)} className="text-slate-500 text-sm">
                    Register another broker
                  </Button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="text-xs font-bold uppercase tracking-widest text-slate-500 border-b border-slate-800 pb-2">
                    Broker Details
                  </div>
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <Label className="text-xs font-bold uppercase tracking-widest text-slate-400">Full name *</Label>
                      <Input required value={form.brokerName} onChange={e => setForm(f => ({ ...f, brokerName: e.target.value }))} placeholder="e.g. Ahmed Hassan" className="bg-slate-950 border-slate-700 text-white h-11 placeholder:text-slate-600" />
                    </div>
                    <div className="space-y-1.5">
                      <Label className="text-xs font-bold uppercase tracking-widest text-slate-400">WhatsApp number *</Label>
                      <Input required type="tel" value={form.brokerPhone} onChange={e => setForm(f => ({ ...f, brokerPhone: e.target.value }))} placeholder="+971 50 000 0000" className="bg-slate-950 border-slate-700 text-white h-11 placeholder:text-slate-600" />
                    </div>
                  </div>
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <Label className="text-xs font-bold uppercase tracking-widest text-slate-400">Email</Label>
                      <Input type="email" value={form.brokerEmail} onChange={e => setForm(f => ({ ...f, brokerEmail: e.target.value }))} placeholder="you@email.com" className="bg-slate-950 border-slate-700 text-white h-11 placeholder:text-slate-600" />
                    </div>
                    <div className="space-y-1.5">
                      <Label className="text-xs font-bold uppercase tracking-widest text-slate-400">Country / City</Label>
                      <Input value={form.country} onChange={e => setForm(f => ({ ...f, country: e.target.value }))} placeholder="e.g. UAE, Pakistan, UK" className="bg-slate-950 border-slate-700 text-white h-11 placeholder:text-slate-600" />
                    </div>
                  </div>
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <Label className="text-xs font-bold uppercase tracking-widest text-slate-400">Brokerage / Company</Label>
                      <Input value={form.brokerage} onChange={e => setForm(f => ({ ...f, brokerage: e.target.value }))} placeholder="Optional" className="bg-slate-950 border-slate-700 text-white h-11 placeholder:text-slate-600" />
                    </div>
                    <div className="space-y-1.5">
                      <Label className="text-xs font-bold uppercase tracking-widest text-slate-400">RERA License (if UAE)</Label>
                      <Input value={form.reraLicense} onChange={e => setForm(f => ({ ...f, reraLicense: e.target.value }))} placeholder="Optional" className="bg-slate-950 border-slate-700 text-white h-11 placeholder:text-slate-600" />
                    </div>
                  </div>

                  <div className="text-xs font-bold uppercase tracking-widest text-slate-500 border-b border-slate-800 pb-2 pt-2">
                    Client Interest (optional — helps us prepare materials)
                  </div>
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <Label className="text-xs font-bold uppercase tracking-widest text-slate-400">Unit type of interest</Label>
                      <Select value={form.unitType} onValueChange={v => setForm(f => ({ ...f, unitType: v }))}>
                        <SelectTrigger className="bg-slate-950 border-slate-700 text-white h-11">
                          <SelectValue placeholder="Select unit type" />
                        </SelectTrigger>
                        <SelectContent className="bg-slate-900 border-slate-700 text-white">
                          {UNIT_TYPES.map(u => <SelectItem key={u} value={u} className="focus:bg-slate-800">{u}</SelectItem>)}
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-1.5">
                      <Label className="text-xs font-bold uppercase tracking-widest text-slate-400">Client budget</Label>
                      <Select value={form.budget} onValueChange={v => setForm(f => ({ ...f, budget: v }))}>
                        <SelectTrigger className="bg-slate-950 border-slate-700 text-white h-11">
                          <SelectValue placeholder="Select budget" />
                        </SelectTrigger>
                        <SelectContent className="bg-slate-900 border-slate-700 text-white">
                          {BUDGETS.map(b => <SelectItem key={b} value={b} className="focus:bg-slate-800">{b}</SelectItem>)}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <div className="grid sm:grid-cols-3 gap-4">
                    <div className="space-y-1.5">
                      <Label className="text-xs font-bold uppercase tracking-widest text-slate-400">Client name</Label>
                      <Input value={form.clientName} onChange={e => setForm(f => ({ ...f, clientName: e.target.value }))} placeholder="Optional" className="bg-slate-950 border-slate-700 text-white h-11 placeholder:text-slate-600" />
                    </div>
                    <div className="space-y-1.5">
                      <Label className="text-xs font-bold uppercase tracking-widest text-slate-400">Client WhatsApp</Label>
                      <Input type="tel" value={form.clientPhone} onChange={e => setForm(f => ({ ...f, clientPhone: e.target.value }))} placeholder="+XX XXX" className="bg-slate-950 border-slate-700 text-white h-11 placeholder:text-slate-600" />
                    </div>
                    <div className="space-y-1.5">
                      <Label className="text-xs font-bold uppercase tracking-widest text-slate-400">Client nationality</Label>
                      <Select value={form.clientNationality} onValueChange={v => setForm(f => ({ ...f, clientNationality: v }))}>
                        <SelectTrigger className="bg-slate-950 border-slate-700 text-white h-11">
                          <SelectValue placeholder="Select" />
                        </SelectTrigger>
                        <SelectContent className="bg-slate-900 border-slate-700 text-white">
                          {NATIONALITIES.map(n => <SelectItem key={n} value={n} className="focus:bg-slate-800">{n}</SelectItem>)}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  {/* Checkboxes */}
                  <div className="space-y-3 pt-1">
                    <div className="flex items-start gap-3 rounded-xl border border-fuchsia-500/20 bg-fuchsia-500/5 p-3.5">
                      <Checkbox
                        id="tour"
                        checked={form.tourRequested}
                        onCheckedChange={v => setForm(f => ({ ...f, tourRequested: !!v }))}
                        className="mt-0.5 border-fuchsia-400"
                      />
                      <label htmlFor="tour" className="text-sm text-slate-300 cursor-pointer">
                        <span className="font-semibold text-white">Book a founder-led virtual site tour</span> — we'll take your client live on WhatsApp from Mamzar Beach
                      </label>
                    </div>
                    <div className="flex items-start gap-3 rounded-xl border border-amber-500/20 bg-amber-500/5 p-3.5">
                      <Checkbox
                        id="earlybird"
                        checked={form.earlybirdOpted}
                        onCheckedChange={v => setForm(f => ({ ...f, earlybirdOpted: !!v }))}
                        className="mt-0.5 border-amber-400"
                      />
                      <label htmlFor="earlybird" className="text-sm text-slate-300 cursor-pointer">
                        <span className="font-semibold text-white">Opt-in to early-bird broker programme</span> — first unit allocation, priority pricing, and override commissions on sub-referrals
                      </label>
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <Label className="text-xs font-bold uppercase tracking-widest text-slate-400">Any notes / questions</Label>
                    <Input value={form.notes} onChange={e => setForm(f => ({ ...f, notes: e.target.value }))} placeholder="e.g. client wants sea-facing floor 8+, can pay 50% now..." className="bg-slate-950 border-slate-700 text-white h-11 placeholder:text-slate-600" />
                  </div>

                  <Button
                    type="submit"
                    disabled={!valid || submitEoi.isPending}
                    className="w-full h-13 bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-black text-base"
                  >
                    {submitEoi.isPending ? (
                      <span className="flex items-center gap-2"><Sparkles className="w-4 h-4 animate-spin" /> Registering…</span>
                    ) : (
                      <span className="flex items-center gap-2"><Rocket className="w-4 h-4" /> Register My EOI &amp; Get Broker Code</span>
                    )}
                  </Button>
                  <p className="text-center text-[11px] text-slate-600">
                    No commitment. Submitting this form does not obligate you to purchase. DeliWer operates as a referral concierge — all transactions are direct with Alef Group.
                  </p>
                </form>
              )}
            </CardContent>
          </Card>
        </div>
      </section>

      {/* ── FINAL CTA ─────────────────────────────────────────────────── */}
      <section className="py-16 border-t border-slate-900 bg-gradient-to-r from-cyan-950/30 via-slate-950 to-blue-950/20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <h3 className="text-2xl sm:text-3xl font-bold mb-3">
            {s.finalH}
          </h3>
          <p className="text-slate-400 mb-2">
            {s.finalP}
          </p>
          <p className="text-[11px] text-slate-500 font-bold uppercase tracking-widest mb-6">
            {s.finalTgNote}
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <Button
              size="lg"
              className="h-12 px-6 bg-sky-500 hover:bg-sky-400 text-white font-black"
              onClick={() => window.open(TG, "_blank")}
            >
              <SiTelegram className="w-4 h-4 mr-2" /> {s.tgPartner}
            </Button>
            <Button
              size="lg"
              className="h-12 px-6 bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-black"
              onClick={() => window.open(waUrl("Hi DeliWer — I want to learn more about Alef Linar, Mamzar Beach Sharjah and the broker EOI programme."), "_blank")}
            >
              <MessageCircle className="w-4 h-4 mr-2" /> {s.waPartner}
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="h-12 px-6 border-slate-600 text-slate-200 hover:bg-slate-800 hover:text-white"
              onClick={() => scrollTo("eoi")}
            >
              <BadgeCheck className="w-4 h-4 mr-2" /> Register EOI
            </Button>
            <Button
              size="lg"
              variant="ghost"
              className="h-12 px-6 text-slate-400 hover:text-white"
              onClick={() => {
                if (navigator.share) {
                  navigator.share({ title: "Alef Linar Mamzar Beach", text: shareMsg, url: window.location.href });
                } else {
                  navigator.clipboard.writeText(shareMsg);
                  toast({ title: "Copied!", description: "Share message copied." });
                }
              }}
            >
              <Share2 className="w-4 h-4 mr-2" /> Share with Brokers
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-slate-900 py-8 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <div className="flex items-center justify-center gap-2 mb-3">
            <Waves className="w-4 h-4 text-cyan-400" />
            <span className="font-black text-white">DeliWer</span>
            <span className="bg-cyan-500/15 border border-cyan-500/30 text-cyan-400 text-[9px] font-black uppercase tracking-widest px-2 py-0.5 rounded-full">Lifestyle</span>
          </div>
          <div className="flex justify-center gap-4 mb-4">
            <a href={TG} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 text-sky-400 hover:text-sky-300 text-xs font-bold transition-colors">
              <SiTelegram className="w-4 h-4" /> Telegram
            </a>
            <a href={waUrl("Hi DeliWer — I want to learn more about Alef Linar, Mamzar Beach.")} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 text-cyan-400 hover:text-cyan-300 text-xs font-bold transition-colors">
              <MessageCircle className="w-4 h-4" /> WhatsApp
            </a>
          </div>
          <p className="text-[11px] text-slate-600 max-w-2xl mx-auto">
            DeliWer Lifestyle is a referral and concierge service. We are not a licensed real estate broker or developer. All transactions are direct between the buyer and Alef Group. Prices, availability and payment plans are subject to change without notice. Information on this page is general and does not constitute financial or investment advice. © {new Date().getFullYear()} DeliWer. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
    </LangCtx.Provider>
  );
}
