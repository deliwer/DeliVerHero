import { useState, useEffect, useCallback } from "react";
import { useMutation } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import {
  CheckCircle, ChevronRight, Home, Sparkles, Droplets, Wrench,
  Wind, Tv, Building, Phone, MapPin, Calendar, User, MessageCircle,
  Share2, Copy, Globe,
} from "lucide-react";

// ── Translations ──────────────────────────────────────────────────────────────
type Lang = "en" | "ar";

const T = {
  en: {
    dir: "ltr" as const,
    step: (n: number) => `Step ${n} of 4`,
    title1: "Set up your new home",
    title1b: "in 30 seconds",
    sub1: "What brings you here today?",
    intents: [
      { id: "move-in", label: "I just moved in 🏠", sub: "Set up utilities, water, cleaning & more" },
      { id: "upgrade", label: "I'm upgrading my home ✨", sub: "Maintenance, appliances, or deep clean" },
      { id: "moving", label: "I'm looking to move 🔍", sub: "Find a property + pre-plan your setup" },
    ],
    earnTitle: "Earn by referring",
    earnSub: "Share your referral link and earn rewards for every person you bring in.",
    copyLink: "Copy my referral link",
    copied: "Copied!",
    title2: "Let's get you sorted",
    sub2: "We'll send updates straight to WhatsApp",
    labelName: "Your Name",
    placeholderName: "e.g. Ahmed Al Mansouri",
    labelPhone: "WhatsApp Number",
    placeholderPhone: "+971 50 000 0000",
    phoneNote: "We'll only use this to send your setup summary",
    back: "Back",
    continue: "Continue",
    title3: "Tell us about your home",
    sub3: "Helps us match you with the right services",
    labelPropType: "Property Type",
    propTypes: ["Apartment", "Villa", "Office"],
    labelLocation: "Location",
    locationPlaceholder: "Select area...",
    labelBudget: "Budget Range (AED/month)",
    budgets: ["Under 5k", "5k–10k", "10k–20k", "20k+"],
    labelTimeline: "Timeline",
    timelines: [
      { id: "immediate", label: "Immediate — I need help now" },
      { id: "1-month", label: "Within the next month" },
      { id: "browsing", label: "Just browsing for now" },
    ],
    title4: "What do you need?",
    sub4: "Select all that apply — we'll match the right vendor",
    submitBtn: "Send via WhatsApp",
    successTitle: (name: string) => `You're all set, ${name}! 🎉`,
    successSub: "Your request is ready. Tap below to send it to our team on WhatsApp — we'll get back to you within minutes.",
    openWA: "Open WhatsApp Now",
    referEarnTitle: "Earn rewards by referring friends",
    referEarnSub: "Know someone moving to Dubai? Share your link and earn AED rewards for every successful referral.",
    shareLink: "Copy referral link",
    linkCopied: "Link copied!",
    resetBtn: "Submit another request",
    abandonTitle: "Still there?",
    abandonSub: "Skip the form — tap to message us directly on WhatsApp",
    abandonBtn: "Continue on WhatsApp",
    services: [
      { id: "water", label: "Water / Filtration" },
      { id: "ac", label: "AC / Maintenance" },
      { id: "cleaning", label: "Cleaning" },
      { id: "appliances", label: "Appliances" },
      { id: "maintenance", label: "General Maintenance" },
      { id: "property", label: "Looking for Property" },
    ],
  },
  ar: {
    dir: "rtl" as const,
    step: (n: number) => `الخطوة ${n} من 4`,
    title1: "جهّز منزلك الجديد",
    title1b: "في 30 ثانية",
    sub1: "ما الذي أتى بك إلى هنا اليوم؟",
    intents: [
      { id: "move-in", label: "انتقلت للتو 🏠", sub: "إعداد الكهرباء والمياه والتنظيف والمزيد" },
      { id: "upgrade", label: "أرقّي منزلي ✨", sub: "صيانة أو أجهزة أو تنظيف عميق" },
      { id: "moving", label: "أبحث عن سكن 🔍", sub: "ابحث عن عقار + خطط لإعدادك مسبقًا" },
    ],
    earnTitle: "اكسب من خلال الإحالة",
    earnSub: "شارك رابط الإحالة واكسب مكافآت عن كل شخص تجلبه.",
    copyLink: "انسخ رابط الإحالة",
    copied: "تم النسخ!",
    title2: "لنرتّب أمورك",
    sub2: "سنرسل التحديثات مباشرة عبر واتساب",
    labelName: "اسمك",
    placeholderName: "مثال: أحمد المنصوري",
    labelPhone: "رقم واتساب",
    placeholderPhone: "+971 50 000 0000",
    phoneNote: "سنستخدم هذا فقط لإرسال ملخص طلبك",
    back: "رجوع",
    continue: "متابعة",
    title3: "أخبرنا عن منزلك",
    sub3: "يساعدنا ذلك في مطابقتك مع الخدمات المناسبة",
    labelPropType: "نوع العقار",
    propTypes: ["شقة", "فيلا", "مكتب"],
    labelLocation: "الموقع",
    locationPlaceholder: "اختر المنطقة...",
    labelBudget: "نطاق الميزانية (درهم/شهر)",
    budgets: ["أقل من 5k", "5k–10k", "10k–20k", "20k+"],
    labelTimeline: "الجدول الزمني",
    timelines: [
      { id: "immediate", label: "فوري — أحتاج مساعدة الآن" },
      { id: "1-month", label: "خلال الشهر القادم" },
      { id: "browsing", label: "مجرد تصفح الآن" },
    ],
    title4: "ماذا تحتاج؟",
    sub4: "اختر كل ما ينطبق — سنرتب المورد المناسب",
    submitBtn: "إرسال عبر واتساب",
    successTitle: (name: string) => `أنت جاهز، ${name}! 🎉`,
    successSub: "طلبك جاهز. اضغط أدناه لإرساله إلى فريقنا عبر واتساب — سنعود إليك في غضون دقائق.",
    openWA: "افتح واتساب الآن",
    referEarnTitle: "اكسب مكافآت بإحالة أصدقائك",
    referEarnSub: "هل تعرف شخصًا ينتقل إلى دبي؟ شارك رابطك واكسب مكافآت بالدرهم.",
    shareLink: "نسخ رابط الإحالة",
    linkCopied: "تم نسخ الرابط!",
    resetBtn: "إرسال طلب آخر",
    abandonTitle: "هل ما زلت هنا؟",
    abandonSub: "تخطَّ النموذج — اضغط للتواصل معنا مباشرة عبر واتساب",
    abandonBtn: "المتابعة عبر واتساب",
    services: [
      { id: "water", label: "مياه / تصفية" },
      { id: "ac", label: "مكيف / صيانة" },
      { id: "cleaning", label: "تنظيف" },
      { id: "appliances", label: "أجهزة" },
      { id: "maintenance", label: "صيانة عامة" },
      { id: "property", label: "البحث عن عقار" },
    ],
  },
};

const LOCATIONS = [
  "Downtown Dubai", "Dubai Marina", "JBR", "Business Bay", "DIFC",
  "Jumeirah", "Palm Jumeirah", "JLT", "Sports City", "Al Barsha",
  "Mirdif", "Deira", "Bur Dubai", "Dubai Hills", "Arabian Ranches",
  "Motor City", "Discovery Gardens", "International City", "Other",
];

const SERVICE_STYLES = [
  "bg-blue-50 border-blue-200 text-blue-700",
  "bg-cyan-50 border-cyan-200 text-cyan-700",
  "bg-purple-50 border-purple-200 text-purple-700",
  "bg-orange-50 border-orange-200 text-orange-700",
  "bg-yellow-50 border-yellow-200 text-yellow-700",
  "bg-emerald-50 border-emerald-200 text-emerald-700",
];

const SERVICE_ICONS = [Droplets, Wind, Sparkles, Tv, Wrench, Building];

function useRefId() {
  if (typeof window === "undefined") return null;
  return new URLSearchParams(window.location.search).get("ref");
}

const ABANDON_DELAY = 30_000; // 30 seconds idle

export default function Capture() {
  const refId = useRefId();
  const [lang, setLang] = useState<Lang>("en");
  const t = T[lang];

  const [step, setStep] = useState(1);
  const [intent, setIntent] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [propertyType, setPropertyType] = useState("");
  const [location, setLocation] = useState("");
  const [budget, setBudget] = useState("");
  const [timeline, setTimeline] = useState("");
  const [services, setServices] = useState<string[]>([]);
  const [waUrl, setWaUrl] = useState("");
  const [copied, setCopied] = useState(false);
  const [showAbandon, setShowAbandon] = useState(false);

  // ── Idle / Abandon detection ────────────────────────────────────────────────
  const resetTimer = useCallback(() => {
    setShowAbandon(false);
  }, []);

  useEffect(() => {
    if (step >= 5) { setShowAbandon(false); return; }
    const timer = setTimeout(() => setShowAbandon(true), ABANDON_DELAY);
    const events = ["click", "keydown", "scroll", "touchstart", "mousemove"];
    const reset = () => { clearTimeout(timer); resetTimer(); };
    events.forEach(e => window.addEventListener(e, reset, { passive: true }));
    return () => {
      clearTimeout(timer);
      events.forEach(e => window.removeEventListener(e, reset));
    };
  }, [step, resetTimer]);

  // ── Abandon WhatsApp URL (no form data required) ────────────────────────────
  const abandonWaUrl = `https://wa.me/971523906019?text=${encodeURIComponent("Hi DeliWer, I need help setting up my new home in Dubai. Can you assist?")}`;

  const submitMutation = useMutation({
    mutationFn: (body: any) => apiRequest("POST", "/api/tenant-capture/leads", body),
    onSuccess: async (res) => {
      const data = await res.json();
      setWaUrl(data.waUrl);
      setStep(5);
    },
  });

  const toggleService = (id: string) =>
    setServices(s => s.includes(id) ? s.filter(x => x !== id) : [...s, id]);

  const handleSubmit = () => {
    submitMutation.mutate({
      name, phone, intent,
      propertyType, location, budget, timeline,
      servicesNeeded: services,
      referrerId: refId || undefined,
    });
  };

  const copyReferralLink = () => {
    navigator.clipboard.writeText(`${window.location.origin}/capture?ref=${refId || "SHARE"}`);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const progress = Math.min((step / 4) * 100, 100);

  const resetForm = () => {
    setStep(1); setIntent(""); setName(""); setPhone("");
    setServices([]); setPropertyType(""); setLocation(""); setBudget(""); setTimeline("");
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col" dir={t.dir}>

      {/* Top bar */}
      {step < 5 && (
        <div className="bg-white border-b border-gray-100 px-4 py-3 flex items-center gap-3">
          <div className="w-8 h-8 bg-emerald-500 rounded-full flex items-center justify-center flex-shrink-0">
            <Home className="w-4 h-4 text-white" />
          </div>
          <div className="flex-1">
            <p className="text-xs text-gray-500 font-medium">{t.step(Math.min(step, 4))}</p>
            <div className="mt-1 h-1.5 bg-gray-100 rounded-full overflow-hidden">
              <div className="h-full bg-emerald-500 rounded-full transition-all duration-500" style={{ width: `${progress}%` }} />
            </div>
          </div>
          <div className="flex items-center gap-2 flex-shrink-0">
            {refId && (
              <span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                via {refId}
              </span>
            )}
            {/* Language toggle */}
            <button
              data-testid="button-lang-toggle"
              onClick={() => setLang(l => l === "en" ? "ar" : "en")}
              className="flex items-center gap-1 px-2.5 py-1 rounded-full border border-gray-200 bg-white text-[11px] font-bold text-gray-600 hover:border-emerald-400 hover:text-emerald-600 transition"
            >
              <Globe className="w-3 h-3" />
              {lang === "en" ? "عربي" : "EN"}
            </button>
          </div>
        </div>
      )}

      <div className="flex-1 flex flex-col max-w-md mx-auto w-full px-4 py-6">

        {/* ── STEP 1 — Intent ── */}
        {step === 1 && (
          <div className="flex flex-col gap-5 animate-in fade-in slide-in-from-bottom-4 duration-300">
            <div>
              <h1 className="text-2xl font-black text-gray-900 leading-tight">
                {t.title1}<br />
                <span className="text-emerald-500">{t.title1b}</span>
              </h1>
              <p className="text-gray-500 text-sm mt-1">{t.sub1}</p>
            </div>
            <div className="flex flex-col gap-3">
              {t.intents.map(opt => (
                <button
                  key={opt.id}
                  data-testid={`intent-${opt.id}`}
                  onClick={() => { setIntent(opt.id); setStep(2); }}
                  className="w-full text-left p-4 bg-white rounded-2xl border-2 border-gray-100 hover:border-emerald-400 hover:shadow-md transition-all group"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-bold text-gray-900 text-base">{opt.label}</p>
                      <p className="text-xs text-gray-500 mt-0.5">{opt.sub}</p>
                    </div>
                    <ChevronRight className={`w-5 h-5 text-gray-300 group-hover:text-emerald-500 transition-colors ${lang === "ar" ? "rotate-180" : ""}`} />
                  </div>
                </button>
              ))}
            </div>
            <div className="mt-2 p-4 bg-emerald-50 rounded-2xl border border-emerald-100">
              <p className="text-xs font-bold text-emerald-700 flex items-center gap-1.5">
                <Share2 className="w-3.5 h-3.5 flex-shrink-0" /> {t.earnTitle}
              </p>
              <p className="text-xs text-emerald-600 mt-1">{t.earnSub}</p>
              <button
                onClick={copyReferralLink}
                data-testid="button-copy-referral"
                className="mt-2 flex items-center gap-1.5 text-[11px] font-bold text-emerald-700 bg-white border border-emerald-200 px-3 py-1.5 rounded-full transition hover:bg-emerald-500 hover:text-white"
              >
                <Copy className="w-3 h-3" /> {copied ? t.copied : t.copyLink}
              </button>
            </div>
          </div>
        )}

        {/* ── STEP 2 — Name + Phone ── */}
        {step === 2 && (
          <div className="flex flex-col gap-5 animate-in fade-in slide-in-from-bottom-4 duration-300">
            <div>
              <h2 className="text-2xl font-black text-gray-900">{t.title2}</h2>
              <p className="text-gray-500 text-sm mt-1">{t.sub2}</p>
            </div>
            <div className="flex flex-col gap-3">
              <div>
                <label className="text-xs font-bold text-gray-600 uppercase tracking-wider flex items-center gap-1 mb-1.5">
                  <User className="w-3.5 h-3.5" /> {t.labelName}
                </label>
                <input
                  type="text"
                  data-testid="input-name"
                  value={name}
                  onChange={e => setName(e.target.value)}
                  placeholder={t.placeholderName}
                  className="w-full px-4 py-3.5 rounded-2xl border-2 border-gray-100 focus:border-emerald-400 outline-none text-gray-900 text-base bg-white transition"
                />
              </div>
              <div>
                <label className="text-xs font-bold text-gray-600 uppercase tracking-wider flex items-center gap-1 mb-1.5">
                  <Phone className="w-3.5 h-3.5" /> {t.labelPhone}
                </label>
                <input
                  type="tel"
                  data-testid="input-phone"
                  value={phone}
                  onChange={e => setPhone(e.target.value)}
                  placeholder={t.placeholderPhone}
                  dir="ltr"
                  className="w-full px-4 py-3.5 rounded-2xl border-2 border-gray-100 focus:border-emerald-400 outline-none text-gray-900 text-base bg-white transition"
                />
                <p className="text-xs text-gray-400 mt-1 mx-1">{t.phoneNote}</p>
              </div>
            </div>
            <div className="flex gap-3 mt-2">
              <button onClick={() => setStep(1)} className="flex-1 py-3.5 rounded-2xl border-2 border-gray-200 text-gray-600 font-bold text-sm transition hover:bg-gray-100">{t.back}</button>
              <button
                data-testid="button-step2-next"
                onClick={() => { if (name.trim() && phone.trim()) setStep(3); }}
                disabled={!name.trim() || !phone.trim()}
                className="flex-1 py-3.5 rounded-2xl bg-emerald-500 hover:bg-emerald-600 disabled:opacity-40 text-white font-bold text-sm transition flex items-center justify-center gap-2"
              >
                {t.continue} <ChevronRight className={`w-4 h-4 ${lang === "ar" ? "rotate-180" : ""}`} />
              </button>
            </div>
          </div>
        )}

        {/* ── STEP 3 — Property details ── */}
        {step === 3 && (
          <div className="flex flex-col gap-5 animate-in fade-in slide-in-from-bottom-4 duration-300">
            <div>
              <h2 className="text-2xl font-black text-gray-900">{t.title3}</h2>
              <p className="text-gray-500 text-sm mt-1">{t.sub3}</p>
            </div>
            <div className="flex flex-col gap-4">
              <div>
                <label className="text-xs font-bold text-gray-600 uppercase tracking-wider mb-1.5 block">{t.labelPropType}</label>
                <div className="flex gap-2">
                  {t.propTypes.map((type, i) => {
                    const enType = ["Apartment", "Villa", "Office"][i];
                    return (
                      <button
                        key={enType}
                        data-testid={`property-${enType.toLowerCase()}`}
                        onClick={() => setPropertyType(enType)}
                        className={`flex-1 py-3 rounded-xl border-2 font-bold text-sm transition ${propertyType === enType ? "border-emerald-500 bg-emerald-50 text-emerald-700" : "border-gray-100 bg-white text-gray-600 hover:border-gray-300"}`}
                      >
                        {type}
                      </button>
                    );
                  })}
                </div>
              </div>
              <div>
                <label className="text-xs font-bold text-gray-600 uppercase tracking-wider flex items-center gap-1 mb-1.5">
                  <MapPin className="w-3.5 h-3.5" /> {t.labelLocation}
                </label>
                <select
                  data-testid="select-location"
                  value={location}
                  onChange={e => setLocation(e.target.value)}
                  dir="ltr"
                  className="w-full px-4 py-3.5 rounded-2xl border-2 border-gray-100 focus:border-emerald-400 outline-none text-gray-900 text-base bg-white transition"
                >
                  <option value="">{t.locationPlaceholder}</option>
                  {LOCATIONS.map(l => <option key={l} value={l}>{l}</option>)}
                </select>
              </div>
              <div>
                <label className="text-xs font-bold text-gray-600 uppercase tracking-wider mb-1.5 block">{t.labelBudget}</label>
                <div className="grid grid-cols-2 gap-2">
                  {t.budgets.map((b, i) => {
                    const enBudget = ["Under 5k", "5k–10k", "10k–20k", "20k+"][i];
                    return (
                      <button
                        key={enBudget}
                        data-testid={`budget-${enBudget}`}
                        onClick={() => setBudget(enBudget)}
                        className={`py-2.5 rounded-xl border-2 font-bold text-sm transition ${budget === enBudget ? "border-emerald-500 bg-emerald-50 text-emerald-700" : "border-gray-100 bg-white text-gray-600 hover:border-gray-300"}`}
                      >
                        {b}
                      </button>
                    );
                  })}
                </div>
              </div>
              <div>
                <label className="text-xs font-bold text-gray-600 uppercase tracking-wider flex items-center gap-1 mb-1.5">
                  <Calendar className="w-3.5 h-3.5" /> {t.labelTimeline}
                </label>
                <div className="flex flex-col gap-2">
                  {t.timelines.map(tl => (
                    <button
                      key={tl.id}
                      data-testid={`timeline-${tl.id}`}
                      onClick={() => setTimeline(tl.id)}
                      className={`w-full text-left px-4 py-3 rounded-xl border-2 font-medium text-sm transition ${timeline === tl.id ? "border-emerald-500 bg-emerald-50 text-emerald-700" : "border-gray-100 bg-white text-gray-600 hover:border-gray-300"}`}
                    >
                      {tl.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>
            <div className="flex gap-3 mt-2">
              <button onClick={() => setStep(2)} className="flex-1 py-3.5 rounded-2xl border-2 border-gray-200 text-gray-600 font-bold text-sm transition hover:bg-gray-100">{t.back}</button>
              <button
                data-testid="button-step3-next"
                onClick={() => setStep(4)}
                className="flex-1 py-3.5 rounded-2xl bg-emerald-500 hover:bg-emerald-600 text-white font-bold text-sm transition flex items-center justify-center gap-2"
              >
                {t.continue} <ChevronRight className={`w-4 h-4 ${lang === "ar" ? "rotate-180" : ""}`} />
              </button>
            </div>
          </div>
        )}

        {/* ── STEP 4 — Services ── */}
        {step === 4 && (
          <div className="flex flex-col gap-5 animate-in fade-in slide-in-from-bottom-4 duration-300">
            <div>
              <h2 className="text-2xl font-black text-gray-900">{t.title4}</h2>
              <p className="text-gray-500 text-sm mt-1">{t.sub4}</p>
            </div>
            <div className="grid grid-cols-2 gap-3">
              {t.services.map((s, i) => {
                const Icon = SERVICE_ICONS[i];
                const active = services.includes(s.id);
                const style = SERVICE_STYLES[i];
                return (
                  <button
                    key={s.id}
                    data-testid={`service-${s.id}`}
                    onClick={() => toggleService(s.id)}
                    className={`relative p-4 rounded-2xl border-2 text-left transition-all ${active ? style + " border-current shadow-sm" : "bg-white border-gray-100 text-gray-600 hover:border-gray-300"}`}
                  >
                    {active && <CheckCircle className="w-4 h-4 absolute top-2.5 right-2.5 text-current opacity-70" />}
                    <Icon className="w-6 h-6 mb-2" />
                    <p className="text-xs font-bold leading-tight">{s.label}</p>
                  </button>
                );
              })}
            </div>
            <div className="flex gap-3 mt-2">
              <button onClick={() => setStep(3)} className="flex-1 py-3.5 rounded-2xl border-2 border-gray-200 text-gray-600 font-bold text-sm transition hover:bg-gray-100">{t.back}</button>
              <button
                data-testid="button-submit"
                onClick={handleSubmit}
                disabled={submitMutation.isPending || services.length === 0}
                className="flex-1 py-3.5 rounded-2xl bg-[#25D366] hover:bg-[#1ebe57] disabled:opacity-40 text-white font-bold text-sm transition flex items-center justify-center gap-2"
              >
                {submitMutation.isPending
                  ? <span className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  : <><MessageCircle className="w-4 h-4" /> {t.submitBtn}</>
                }
              </button>
            </div>
          </div>
        )}

        {/* ── STEP 5 — Success ── */}
        {step === 5 && (
          <div className="flex flex-col items-center gap-6 py-6 animate-in fade-in slide-in-from-bottom-4 duration-300 text-center">
            <div className="w-20 h-20 bg-emerald-100 rounded-full flex items-center justify-center">
              <CheckCircle className="w-10 h-10 text-emerald-500" />
            </div>
            <div>
              <h2 className="text-2xl font-black text-gray-900">{t.successTitle(name)}</h2>
              <p className="text-gray-500 text-sm mt-2 max-w-xs mx-auto">{t.successSub}</p>
            </div>
            <a
              href={waUrl}
              target="_blank"
              rel="noopener noreferrer"
              data-testid="button-open-whatsapp"
              className="w-full py-4 rounded-2xl bg-[#25D366] hover:bg-[#1ebe57] text-white font-black text-base transition flex items-center justify-center gap-2 shadow-lg"
            >
              <MessageCircle className="w-5 h-5" /> {t.openWA}
            </a>
            <div className="w-full p-4 bg-emerald-50 rounded-2xl border border-emerald-100 text-left">
              <p className="text-xs font-black text-emerald-700 mb-2 flex items-center gap-1.5">
                <Share2 className="w-3.5 h-3.5" /> {t.referEarnTitle}
              </p>
              <p className="text-xs text-emerald-600 mb-3">{t.referEarnSub}</p>
              <button
                onClick={copyReferralLink}
                data-testid="button-share-referral"
                className="w-full py-2.5 rounded-xl bg-white border border-emerald-300 text-emerald-700 font-bold text-sm transition hover:bg-emerald-500 hover:text-white flex items-center justify-center gap-2"
              >
                <Copy className="w-3.5 h-3.5" /> {copied ? t.linkCopied : t.shareLink}
              </button>
            </div>
            <button onClick={resetForm} className="text-sm text-gray-400 hover:text-gray-600 transition">
              {t.resetBtn}
            </button>
          </div>
        )}
      </div>

      {/* ── ABANDON / IDLE FALLBACK BANNER ── */}
      {showAbandon && step < 5 && (
        <div className="fixed bottom-0 left-0 right-0 z-50 animate-in slide-in-from-bottom-4 duration-300">
          <div className="mx-auto max-w-md px-4 pb-4">
            <div className="bg-[#075E54] text-white rounded-2xl p-4 shadow-2xl flex items-center gap-3">
              <div className="w-10 h-10 bg-[#25D366] rounded-full flex items-center justify-center flex-shrink-0">
                <MessageCircle className="w-5 h-5 text-white" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-black text-sm">{t.abandonTitle}</p>
                <p className="text-[11px] text-white/70 mt-0.5">{t.abandonSub}</p>
              </div>
              <div className="flex flex-col gap-1.5 flex-shrink-0">
                <a
                  href={abandonWaUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  data-testid="button-abandon-whatsapp"
                  className="px-3 py-1.5 bg-[#25D366] hover:bg-[#1ebe57] text-white text-[11px] font-black rounded-xl transition whitespace-nowrap"
                >
                  {t.abandonBtn}
                </a>
                <button
                  onClick={() => setShowAbandon(false)}
                  className="text-[10px] text-white/50 hover:text-white/80 transition text-center"
                >
                  {lang === "en" ? "Dismiss" : "إغلاق"}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
