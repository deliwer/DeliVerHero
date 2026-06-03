import { Helmet } from "react-helmet";
import { useState, createContext, useContext, useEffect } from "react";
import mamzarHeroImg from "@assets/mamzar-hero.png";
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
    heroHeadline: "Discover Dubai's Next Waterfront Neighbourhood Before Global Attention Arrives",
    heroSub: "Founder-guided virtual tours · Beachfront ownership from AED 849,000 · Priority access for investors and referral brokers",
    heroTagline: "Your window closes soon.",
    heroDesc: "Six towers. 325m of Arabian Gulf waterfront. 360° uninterrupted sea views.",
    heroDesc2: "secures your unit on a 30/70 plan. Delivery 2030. Brokers get first access — now, before public launch.",
    num1BR: "1BR from", numBook: "Booking fee", numPlan: "Payment plan", numDel: "Delivery",
    ctaEoi: "Register Priority Access", ctaTg: "Join Telegram", ctaWa: "WhatsApp Us",
    tgNote: "Telegram preferred · CIS · Russia · Asia · Global",
    tourBtn: "Book Founder Virtual Tour",
    finalH: "Questions? Talk to a DeliWer partner now.",
    finalP: "Available on Telegram & WhatsApp — UAE business hours + all global time zones.",
    finalTgNote: "Telegram preferred for CIS · Russia · China · Southeast Asia · Europe",
    tgPartner: "Telegram a Partner", waPartner: "WhatsApp a Partner",
    shareBtn: "Share with Brokers", shareWa: "Share on WhatsApp",
    navEoi: "Register EOI",
  },
  ru: {
    flag: "🇷🇺", label: "RU",
    heroHeadline: "Откройте следующий прибрежный район Дубая прежде, чем он привлечёт глобальное внимание",
    heroSub: "Виртуальные туры с основателем · Собственность у моря от AED 849 000 · Приоритетный доступ для инвесторов и брокеров",
    heroTagline: "Ваше окно возможностей закрывается.",
    heroDesc: "Шесть башен. 325 м береговой линии Аравийского залива. Панорамный вид 360°.",
    heroDesc2: "фиксирует вашу квартиру по схеме 30/70. Сдача 2030. Брокеры получают приоритетный доступ до публичного запуска.",
    num1BR: "1-комн. от", numBook: "Залог", numPlan: "30/70", numDel: "Сдача",
    ctaEoi: "Приоритетный доступ", ctaTg: "Telegram", ctaWa: "WhatsApp",
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
    heroHeadline: "在全球关注到来之前，率先发现迪拜下一个滨水街区",
    heroSub: "创始人亲导虚拟参观 · 海滨物业起价 AED 849,000 · 投资者与经纪人优先认购",
    heroTagline: "机会窗口即将关闭。",
    heroDesc: "六座塔楼，325米阿拉伯湾海岸线，360°无遮挡海景。",
    heroDesc2: "即可锁定房源，30/70付款计划，2030年竣工交付。经纪人享有优先认购权。",
    num1BR: "一居室起价", numBook: "预订金", numPlan: "30/70付款", numDel: "竣工",
    ctaEoi: "登记优先认购", ctaTg: "加入 Telegram", ctaWa: "WhatsApp 咨询",
    tgNote: "Telegram 是亚洲客户首选渠道",
    tourBtn: "预约创始人虚拟导览",
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
  const [lang, setLangState] = useState<Lang>(() => {
    try {
      const saved = localStorage.getItem("dw-mamzar-lang") as Lang | null;
      return saved && ["en", "ru", "zh"].includes(saved) ? saved : "en";
    } catch { return "en"; }
  });
  const setLang = (l: Lang) => {
    try { localStorage.setItem("dw-mamzar-lang", l); } catch {}
    setLangState(l);
  };
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
      <section className="relative overflow-hidden min-h-[95vh] flex flex-col justify-end lg:justify-center">
        {/* Full-bleed aerial photo */}
        <div className="absolute inset-0">
          <img
            src={mamzarHeroImg}
            alt="Alef Linar Mamzar Beach aerial view"
            className="w-full h-full object-cover object-center"
          />
          {/* Multi-layer overlay: strong left for text legibility, gentle right to keep image visible */}
          <div className="absolute inset-0 bg-gradient-to-r from-slate-950/96 via-slate-950/75 to-slate-950/20" />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-slate-950/30" />
          {/* Gold sunrise tint on the right */}
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_80%_30%,_rgba(251,191,36,0.08)_0%,_transparent_60%)]" />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24 w-full">
          <div className="max-w-2xl xl:max-w-3xl">
            {/* Pre-launch badges */}
            <div className="flex flex-wrap items-center gap-2 mb-7">
              <Badge className="bg-amber-500/20 text-amber-300 border-amber-500/40 font-bold px-3 py-1">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-400 inline-block mr-2 animate-ping" />
                PRE-LAUNCH · EOI OPEN
              </Badge>
              <Badge className="bg-white/10 text-white/80 border-white/20 backdrop-blur-sm">
                <MapPin className="w-3 h-3 mr-1" /> Mamzar Beach, Sharjah
              </Badge>
              <Badge className="bg-white/10 text-white/80 border-white/20 backdrop-blur-sm">
                <Building2 className="w-3 h-3 mr-1" /> Alef Group · 6 Towers
              </Badge>
              {stats && (stats as any).total > 0 && (
                <Badge className="bg-emerald-500/20 text-emerald-300 border-emerald-500/40">
                  <Users className="w-3 h-3 mr-1" /> {(stats as any).total} brokers registered
                </Badge>
              )}
            </div>

            {/* Main headline */}
            <h1 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-black leading-tight mb-5 text-white drop-shadow-lg">
              {s.heroHeadline}
            </h1>

            {/* Subheadline */}
            <p className="text-slate-300 text-base sm:text-lg max-w-xl mb-8 leading-relaxed font-medium">
              {s.heroSub}
            </p>

            {/* Key numbers bar */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-3 mb-8">
              {[
                { v: "AED 849K", l: s.num1BR },
                { v: "AED 20K",  l: s.numBook },
                { v: "30 / 70", l: s.numPlan },
                { v: "2030",    l: s.numDel },
              ].map(({ v, l }) => (
                <div key={l} className="rounded-xl border border-white/10 bg-slate-950/60 backdrop-blur-sm px-4 py-3 text-center">
                  <div className="text-lg sm:text-xl font-black text-amber-300">{v}</div>
                  <div className="text-[10px] text-slate-400 uppercase tracking-widest mt-0.5">{l}</div>
                </div>
              ))}
            </div>

            {/* CTAs */}
            <div className="flex flex-wrap gap-3 mb-3">
              <Button
                size="lg"
                className="h-12 px-7 bg-amber-400 hover:bg-amber-300 text-slate-950 font-black text-sm shadow-lg shadow-amber-900/30"
                onClick={() => scrollTo("eoi")}
              >
                <BadgeCheck className="w-5 h-5 mr-2" />
                {s.ctaEoi}
              </Button>
              <Button
                size="lg"
                className="h-12 px-6 bg-sky-500/90 hover:bg-sky-400 text-white font-black backdrop-blur-sm"
                onClick={() => window.open(TG, "_blank")}
              >
                <SiTelegram className="w-4 h-4 mr-2" />
                {s.ctaTg}
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="h-12 px-6 border-white/20 text-white hover:bg-white/10 backdrop-blur-sm font-semibold"
                onClick={() => window.open(waUrl("Hi DeliWer — I want to book a founder virtual tour for Alef Linar, Mamzar Beach."), "_blank")}
              >
                <Video className="w-4 h-4 mr-2 text-cyan-400" />
                {s.tourBtn}
              </Button>
            </div>
            <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">
              {s.tgNote}
            </p>
          </div>
        </div>

        {/* Bottom fade into next section */}
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-slate-950 to-transparent pointer-events-none" />
      </section>

      {/* ── PROJECT OVERVIEW ──────────────────────────────────────────── */}
      <section id="overview" className="scroll-mt-20 py-24 lg:py-32">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <p className="text-cyan-400 text-xs font-black uppercase tracking-widest mb-4">About the Project</p>
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-5 leading-snug">
              Six towers. 325 metres of waterfront.<br className="hidden sm:block" /> One defining moment.
            </h2>
            <p className="text-slate-400 text-lg leading-relaxed">
              Alef Linar rises along the shores of Al Mamzar — Sharjah's most anticipated waterfront address — where the Arabian Gulf meets Dubai's skyline. Designed for families and investors who want Sharjah's calm with Dubai's nine-minute door.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-px bg-slate-800/60 rounded-2xl overflow-hidden border border-slate-800">
            {[
              { icon: Waves, v: "325 m", l: "Waterfront" },
              { icon: Eye,   v: "360°",  l: "Sea views" },
              { icon: Home,  v: "500",   l: "Residences" },
              { icon: Sun,   v: "2030",  l: "Delivery" },
            ].map(({ icon: Icon, v, l }) => (
              <div key={l} className="bg-slate-950 flex flex-col items-center justify-center gap-2 py-10 px-6 text-center">
                <Icon className="w-6 h-6 text-cyan-400" />
                <div className="text-3xl font-black text-white">{v}</div>
                <div className="text-xs text-slate-500 uppercase tracking-widest">{l}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── UNIT TYPOLOGIES ───────────────────────────────────────────── */}
      <section id="units" className="scroll-mt-20 py-24 border-t border-slate-900">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-xl mx-auto mb-14">
            <p className="text-violet-400 text-xs font-black uppercase tracking-widest mb-4">Pricing &amp; Units</p>
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
              Pre-launch pricing. 30/70 plan.
            </h2>
            <p className="text-slate-500">AED 20,000 books your unit. 70% only on handover in 2030.</p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
            {UNITS.map(({ type, sqm, units, price, accent }) => (
              <div
                key={type}
                className="rounded-2xl border border-slate-800 bg-slate-900/50 overflow-hidden hover:border-slate-700 transition cursor-pointer"
                onClick={() => {
                  document.getElementById("eoi")?.scrollIntoView({ behavior: "smooth" });
                  setForm(f => ({ ...f, unitType: UNIT_TYPES.find(u => u.startsWith(type.charAt(0))) || "" }));
                }}
              >
                <div className={`h-1 bg-gradient-to-r ${accent}`} />
                <div className="p-6">
                  <div className="text-2xl font-black text-white mb-1">{type}</div>
                  <div className="text-xs text-slate-500 mb-4">{sqm} sqm · {units} units</div>
                  <div className="text-xl font-bold text-amber-300">{fmtAED(price)}</div>
                  <div className="text-xs text-slate-500 mt-1">from</div>
                </div>
              </div>
            ))}
          </div>

          <div className="rounded-2xl border border-slate-800 bg-slate-900/40 p-8 flex flex-col sm:flex-row items-center justify-between gap-6">
            <div>
              <div className="text-xs font-black uppercase tracking-widest text-emerald-400 mb-2">30 / 70 Payment Plan</div>
              <div className="text-xl font-bold text-white">AED 20,000 secures your unit today</div>
              <div className="text-sm text-slate-400 mt-1">30% during build · 70% on 2030 handover</div>
            </div>
            <Button className="h-12 px-8 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black shrink-0" onClick={() => scrollTo("eoi")}>
              <Rocket className="w-4 h-4 mr-2" /> Secure My Unit
            </Button>
          </div>
        </div>
      </section>

      {/* ── VIRTUAL SITE TOUR ─────────────────────────────────────────── */}
      <section id="tour" className="scroll-mt-20 py-24 border-t border-slate-900">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <p className="text-fuchsia-400 text-xs font-black uppercase tracking-widest mb-4">Founder-Led Virtual Tour</p>
              <h2 className="text-3xl sm:text-4xl font-bold text-white mb-5 leading-snug">
                We're on the ground.<br />Your clients can see it live.
              </h2>
              <p className="text-slate-400 text-lg leading-relaxed mb-8">
                DeliWer founders are based at Mamzar Beach. We take your client on a live video walk of the site — the waterfront, the tower positions, the Dubai skyline. No flights. Close deals from anywhere.
              </p>
              <div className="flex flex-col sm:flex-row gap-3">
                <Button
                  className="h-12 px-6 bg-fuchsia-500 hover:bg-fuchsia-400 text-white font-black"
                  onClick={() => window.open(waUrl("Hi DeliWer — I'd like to book a founder-led virtual site tour of Alef Linar, Mamzar Beach for my client. Please share available slots."), "_blank")}
                >
                  <Video className="w-4 h-4 mr-2" /> {s.tourBtn}
                </Button>
              </div>
            </div>

            <div className="space-y-4">
              {[
                { icon: Clock,  t: "30 minutes, any time zone", d: "Scheduled around your client — UAE, UK, Pakistan, India, China." },
                { icon: Globe2, t: "Arabic, English, Urdu, Hindi", d: "We match a founder to your client's language preference." },
                { icon: Star,   t: "Registered brokers only", d: "This service is reserved for DeliWer EOI-registered partners." },
              ].map(({ icon: Icon, t, d }) => (
                <div key={t} className="flex gap-4 items-start">
                  <div className="w-10 h-10 rounded-xl bg-fuchsia-500/10 border border-fuchsia-500/20 flex items-center justify-center shrink-0">
                    <Icon className="w-5 h-5 text-fuchsia-300" />
                  </div>
                  <div>
                    <div className="font-semibold text-white">{t}</div>
                    <div className="text-sm text-slate-500 mt-0.5">{d}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── BROKER PLATFORM ───────────────────────────────────────────── */}
      <section id="brokers" className="scroll-mt-20 py-24 border-t border-slate-900">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-20">
            <p className="text-amber-400 text-xs font-black uppercase tracking-widest mb-4">Broker Distribution Platform</p>
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-5 leading-snug">
              DeliWer is the infrastructure.<br />You are the distribution.
            </h2>
            <p className="text-slate-400 text-lg">
              Every broker who registers becomes a tracked distribution channel. We handle site tours, follow-up, and paperwork. You bring the client and collect the commission.
            </p>
          </div>

          {/* 3-step model */}
          <div className="grid sm:grid-cols-3 gap-px bg-slate-800/40 rounded-2xl overflow-hidden border border-slate-800 mb-16">
            {[
              { step: "01", icon: BadgeCheck, label: "Register", color: "text-amber-400", desc: "Submit your EOI in 60 seconds. Get your unique broker tracking code instantly." },
              { step: "02", icon: Share2,     label: "Refer",    color: "text-cyan-400",  desc: "Share your link with clients and sub-brokers. Every click and lead traces back to you." },
              { step: "03", icon: Wallet,     label: "Earn",     color: "text-emerald-400", desc: "We close the deal on the ground. You earn direct commission plus sub-broker overrides." },
            ].map(({ step, icon: Icon, label, color, desc }) => (
              <div key={step} className="bg-slate-950 px-8 py-10 text-center">
                <div className={`text-5xl font-black ${color} opacity-20 mb-4`}>{step}</div>
                <Icon className={`w-7 h-7 ${color} mx-auto mb-3`} />
                <div className="text-lg font-bold text-white mb-3">{label}</div>
                <div className="text-sm text-slate-500 leading-relaxed">{desc}</div>
              </div>
            ))}
          </div>

          {/* Commission table + share */}
          <div className="grid md:grid-cols-2 gap-8 items-start">
            <div className="rounded-2xl border border-slate-800 bg-slate-900/40 p-8">
              <p className="text-xs font-black uppercase tracking-widest text-slate-500 mb-6">Indicative earnings</p>
              <div className="space-y-4">
                {[
                  { unit: "1 Bedroom · AED 849K", comm: "~AED 25,000", note: "Direct commission" },
                  { unit: "2 Bedroom · AED 1.384M", comm: "~AED 41,000", note: "Direct commission" },
                  { unit: "Sub-broker close", comm: "~AED 5,000", note: "Trailing override (yours)" },
                ].map(({ unit, comm, note }) => (
                  <div key={unit} className="flex items-center justify-between pb-4 border-b border-slate-800 last:border-0 last:pb-0">
                    <div>
                      <div className="text-sm font-semibold text-white">{unit}</div>
                      <div className="text-xs text-slate-500 mt-0.5">{note}</div>
                    </div>
                    <div className="text-emerald-300 font-black">{comm}</div>
                  </div>
                ))}
              </div>
              <p className="text-[10px] text-slate-600 mt-5">Subject to partnership agreement. Figures are illustrative.</p>
            </div>

            <div className="rounded-2xl border border-amber-500/20 bg-amber-500/5 p-8">
              <p className="text-xs font-black uppercase tracking-widest text-amber-400 mb-4">Share &amp; build your network</p>
              <h3 className="text-xl font-bold text-white mb-3">
                Every broker you onboard earns you a trailing override.
              </h3>
              <p className="text-slate-400 text-sm mb-6 leading-relaxed">
                Register now. Share your referral code with other brokers. When they close, you earn too. Build your sub-network from Day 1 — no cost, no risk.
              </p>
              <div className="flex flex-col gap-3">
                <Button
                  className="h-11 bg-amber-400 hover:bg-amber-300 text-slate-950 font-black"
                  onClick={() => scrollTo("eoi")}
                >
                  <BadgeCheck className="w-4 h-4 mr-2" /> Register &amp; Get My Code
                </Button>
                <Button
                  variant="outline"
                  className="h-11 border-slate-700 text-slate-300 hover:bg-slate-800"
                  onClick={() => {
                    if (navigator.share) {
                      navigator.share({ title: "Alef Linar Mamzar Beach — Pre-Launch", text: shareMsg, url: window.location.href });
                    } else {
                      navigator.clipboard.writeText(shareMsg);
                      toast({ title: "Copied!", description: "Share message copied to clipboard." });
                    }
                  }}
                >
                  <Share2 className="w-4 h-4 mr-2" /> Share This Page
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── LOCATION ──────────────────────────────────────────────────── */}
      <section id="location" className="scroll-mt-20 py-24 border-t border-slate-900">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-xl mx-auto mb-14">
            <p className="text-emerald-400 text-xs font-black uppercase tracking-widest mb-4">Location</p>
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
              Sharjah's calm.<br />Dubai's 9-minute door.
            </h2>
            <p className="text-slate-500">
              Direct access to Al Wuheida Road from Corniche and Al Taawun Street.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {LOCATION_FACTS.map(({ label, value }) => (
              <div key={label} className="rounded-2xl border border-slate-800 bg-slate-900/40 p-6 text-center">
                <div className="text-2xl font-black text-emerald-300 mb-1">{value}</div>
                <div className="text-sm text-slate-500">{label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── EOI FORM ──────────────────────────────────────────────────── */}
      <section id="eoi" className="scroll-mt-20 py-24 border-t border-slate-900">
        <div className="max-w-lg mx-auto px-4 sm:px-6">
          <div className="text-center mb-12">
            <p className="text-amber-400 text-xs font-black uppercase tracking-widest mb-4">Priority Registration</p>
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
              Register your interest
            </h2>
            <p className="text-slate-500">
              60 seconds. You'll receive your broker code and a tour slot.
            </p>
          </div>

          {submitted ? (
            <div className="text-center space-y-6 py-8">
              <div className="w-16 h-16 mx-auto rounded-full bg-emerald-500/15 border-2 border-emerald-500/30 flex items-center justify-center">
                <CheckCircle2 className="w-8 h-8 text-emerald-400" />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-white mb-2">You're in.</h3>
                <p className="text-slate-400">A DeliWer partner will contact you on WhatsApp within 1 hour.</p>
              </div>
              <div className="rounded-2xl border border-amber-500/20 bg-amber-500/5 p-6">
                <p className="text-xs font-black uppercase tracking-widest text-amber-400 mb-2">Your Broker Code</p>
                <p className="text-3xl font-black text-white">{eoiRef}</p>
                <p className="text-xs text-slate-500 mt-2">Share this code — earn override on every sub-broker close</p>
              </div>
              <div className="flex flex-col sm:flex-row gap-3">
                <Button
                  className="flex-1 h-11 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black"
                  onClick={() => window.open(waUrl(`Hi DeliWer — I just registered my EOI for Alef Linar Mamzar (ref: ${eoiRef}). When can we schedule the founder site tour?`), "_blank")}
                >
                  <Video className="w-4 h-4 mr-2" /> Book Tour Now
                </Button>
                <Button
                  variant="outline"
                  className="flex-1 h-11 border-slate-700 text-slate-300 hover:bg-slate-800"
                  onClick={() => {
                    const msg = `🏖️ *Alef Linar Mamzar Beach — Pre-Launch*\n\nI just registered my broker EOI with DeliWer.\n1BR from AED 849K | 30/70 | 2030 delivery.\n\nRegister: ${window.location.href}\n\n(Code: ${eoiRef})`;
                    window.open(`https://wa.me/?text=${encodeURIComponent(msg)}`, "_blank");
                  }}
                >
                  <Share2 className="w-4 h-4 mr-2" /> Share &amp; Earn
                </Button>
              </div>
              <button onClick={() => setSubmitted(false)} className="text-xs text-slate-600 hover:text-slate-400 transition">
                Register another →
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label className="text-xs font-bold uppercase tracking-widest text-slate-500">Full name *</Label>
                <Input
                  required
                  value={form.brokerName}
                  onChange={e => setForm(f => ({ ...f, brokerName: e.target.value }))}
                  placeholder="Ahmed Hassan"
                  className="bg-slate-900 border-slate-700 text-white h-12 placeholder:text-slate-600 rounded-xl"
                />
              </div>

              <div className="space-y-2">
                <Label className="text-xs font-bold uppercase tracking-widest text-slate-500">WhatsApp number *</Label>
                <Input
                  required
                  type="tel"
                  value={form.brokerPhone}
                  onChange={e => setForm(f => ({ ...f, brokerPhone: e.target.value }))}
                  placeholder="+971 50 000 0000"
                  className="bg-slate-900 border-slate-700 text-white h-12 placeholder:text-slate-600 rounded-xl"
                />
              </div>

              <div className="space-y-2">
                <Label className="text-xs font-bold uppercase tracking-widest text-slate-500">Unit interest</Label>
                <Select value={form.unitType} onValueChange={v => setForm(f => ({ ...f, unitType: v }))}>
                  <SelectTrigger className="bg-slate-900 border-slate-700 text-white h-12 rounded-xl">
                    <SelectValue placeholder="Which unit type?" />
                  </SelectTrigger>
                  <SelectContent className="bg-slate-900 border-slate-700 text-white">
                    {UNIT_TYPES.map(u => <SelectItem key={u} value={u} className="focus:bg-slate-800">{u}</SelectItem>)}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-3 pt-2">
                <div className="flex items-start gap-3 rounded-xl border border-fuchsia-500/20 bg-fuchsia-500/5 p-4">
                  <Checkbox
                    id="tour"
                    checked={form.tourRequested}
                    onCheckedChange={v => setForm(f => ({ ...f, tourRequested: !!v }))}
                    className="mt-0.5 border-fuchsia-400"
                  />
                  <label htmlFor="tour" className="text-sm text-slate-400 cursor-pointer leading-snug">
                    <span className="text-white font-semibold">Book a founder virtual tour</span> — live WhatsApp video from Mamzar Beach for your client
                  </label>
                </div>
                <div className="flex items-start gap-3 rounded-xl border border-amber-500/20 bg-amber-500/5 p-4">
                  <Checkbox
                    id="earlybird"
                    checked={form.earlybirdOpted}
                    onCheckedChange={v => setForm(f => ({ ...f, earlybirdOpted: !!v }))}
                    className="mt-0.5 border-amber-400"
                  />
                  <label htmlFor="earlybird" className="text-sm text-slate-400 cursor-pointer leading-snug">
                    <span className="text-white font-semibold">Early-bird programme</span> — first unit allocation, priority pricing, sub-broker overrides
                  </label>
                </div>
              </div>

              <Button
                type="submit"
                disabled={!valid || submitEoi.isPending}
                className="w-full h-13 bg-amber-400 hover:bg-amber-300 text-slate-950 font-black text-base mt-2"
              >
                {submitEoi.isPending ? (
                  <span className="flex items-center gap-2"><Sparkles className="w-4 h-4 animate-spin" /> Registering…</span>
                ) : (
                  <span className="flex items-center gap-2"><Rocket className="w-4 h-4" /> Get My Broker Code</span>
                )}
              </Button>
              <p className="text-center text-[10px] text-slate-600 pt-1">
                No commitment. All transactions are direct with Alef Group.
              </p>
            </form>
          )}
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
