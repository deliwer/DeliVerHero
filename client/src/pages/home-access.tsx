import { Helmet } from "react-helmet";
import { Link } from "wouter";
import { useEffect, useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  ArrowRight,
  Home,
  KeyRound,
  Building2,
  Wallet,
  TrendingUp,
  Sparkles,
  ShieldCheck,
  CheckCircle2,
  Compass,
  Phone,
  MessageCircle,
  Truck,
  Wifi,
  Droplets,
  Zap,
  ClipboardCheck,
  FileSignature,
  PiggyBank,
  Repeat,
  Handshake,
  Star,
  ChevronRight,
  Calculator,
  Banknote,
} from "lucide-react";

import dubaiSkyline from "@assets/stock_images/dubai_skyline_sunset_21b85db0.jpg";
import keysHandover from "@assets/stock_images/keys_handover.jpg";
import dubaiApartment from "@assets/stock_images/dubai_apartment.jpg";
import damacSkyline from "@assets/stock_images/dubai_damac_skyline.jpg";

import logoDIB from "@assets/bank-logos/dib.png";
import logoENBD from "@assets/bank-logos/emirates-nbd.png";
import logoHSBC from "@assets/bank-logos/hsbc.png";

const WA_NUMBER = "971523946311";

// ─── Mortgage Partners ───────────────────────────────────────────────────────
const MORTGAGE_PARTNERS = [
  {
    name: "Holo",
    full: "Holo",
    tag: "Dubai's #1 digital mortgage platform",
    desc: "Compare every UAE bank in one search. Pre-approval in 24 hours.",
    bg: "#0A1F44",
    accent: "from-indigo-500 to-blue-600",
    initials: "HOLO",
  },
  {
    name: "DIB",
    full: "Dubai Islamic Bank",
    tag: "Sharia-compliant home finance",
    desc: "Murabaha & Ijara structures with up to 80% LTV for residents.",
    bg: "#006A4E",
    accent: "from-emerald-500 to-teal-600",
    logo: logoDIB,
  },
  {
    name: "HSBC",
    full: "HSBC UAE",
    tag: "Premier expat mortgage solutions",
    desc: "Cross-border income recognised. Ideal for global professionals.",
    bg: "#DB0011",
    accent: "from-red-500 to-rose-600",
    logo: logoHSBC,
  },
  {
    name: "ENBD",
    full: "Emirates NBD",
    tag: "Resident & non-resident mortgages",
    desc: "Fixed & variable plans. Pre-approval valid 60 days.",
    bg: "#1B3A6B",
    accent: "from-blue-500 to-indigo-600",
    logo: logoENBD,
  },
];

// ─── Developer Payment Plans ─────────────────────────────────────────────────
const DEVELOPERS = [
  {
    name: "Samana Developers",
    tag: "Post-Handover Specialist",
    plan: "10% Down · 1% Monthly",
    handover: "Up to 8 yrs post-handover payments",
    highlight: "Private-pool apartments from AED 750K",
    perk: "Zero DLD fees on selected towers",
    accent: "from-cyan-500 to-blue-600",
  },
  {
    name: "DAMAC Properties",
    tag: "Branded Residences",
    plan: "20% Down · 70/30 Split",
    handover: "Furnished, ready-to-rent units",
    highlight: "Trump, de GRISOGONO, Cavalli branded towers",
    perk: "Guaranteed ROI options up to 3 years",
    accent: "from-amber-500 to-orange-600",
  },
  {
    name: "Emaar Properties",
    tag: "Master Community Leader",
    plan: "10% Down · 80/20 Plan",
    handover: "Downtown, Creek, Arabian Ranches",
    highlight: "Blue-chip resale & rental demand",
    perk: "5-year residency on AED 2M+ purchase",
    accent: "from-emerald-500 to-teal-600",
  },
];

// ─── Move-In Services ────────────────────────────────────────────────────────
const MOVE_IN_SERVICES = [
  { icon: FileSignature, t: "Ejari Registration", d: "Tenancy contract attested & registered in 24 hours." },
  { icon: Zap, t: "DEWA Activation", d: "Electricity & water connected on move-in day." },
  { icon: Wifi, t: "Internet & TV", d: "Etisalat / du home plans installed within 48 hours." },
  { icon: Truck, t: "Movers & Packing", d: "Vetted, insured movers. Flat-rate quote." },
  { icon: Droplets, t: "Water Delivery", d: "AquaCafe alkaline water installed in your kitchen." },
  { icon: ClipboardCheck, t: "Readiness Audit", d: "AC service, deep-clean, locks changed before handover." },
];

// ─── Revenue Model Streams ───────────────────────────────────────────────────
const REVENUE_STREAMS = [
  { icon: Banknote, t: "Mortgage Referrals", d: "Bank & broker commissions when financing closes." },
  { icon: Repeat, t: "Lease-to-Own Partnerships", d: "Revenue share from developer rent-to-own programs." },
  { icon: KeyRound, t: "Rental Placements", d: "Landlord-side fees on verified tenant placements." },
  { icon: Building2, t: "Developer Referrals", d: "Off-plan & ready-unit commissions from partner developers." },
  { icon: Truck, t: "Move-In Services", d: "One-time fees on Ejari, DEWA, internet, movers, furnishing." },
  { icon: Sparkles, t: "Recurring Home Services", d: "Subscriptions: water, cleaning, AC service, maintenance." },
];

// ─── Helpers ─────────────────────────────────────────────────────────────────
function fmtAED(n: number) {
  if (!isFinite(n)) return "—";
  return "AED " + Math.round(n).toLocaleString("en-AE");
}

function buildWA(message: string) {
  return `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(message)}`;
}

// ─── Decision Tool ───────────────────────────────────────────────────────────
type DecisionInput = {
  salary: string;
  budget: string;
  downPayment: string;
  residency: string;
  area: string;
  timeline: string;
};

const SALARY_BANDS = [
  "Under AED 15K / month",
  "AED 15K – 25K",
  "AED 25K – 40K",
  "AED 40K – 70K",
  "AED 70K+",
];

const BUDGET_BANDS = [
  "Under AED 80K / yr (rent)",
  "AED 80K – 150K / yr (rent)",
  "AED 150K – 300K / yr (rent or mortgage)",
  "AED 750K – 1.5M (purchase)",
  "AED 1.5M – 3M (purchase)",
  "AED 3M+ (purchase)",
];

const DOWN_PAYMENT_BANDS = [
  "None yet",
  "Under AED 50K saved",
  "AED 50K – 150K saved",
  "AED 150K – 400K saved",
  "AED 400K+ saved",
];

const RESIDENCY = [
  "UAE Resident (Employed)",
  "UAE Resident (Self-employed / Founder)",
  "Golden Visa Holder",
  "Non-resident / Relocating to Dubai",
  "GCC National",
];

const AREAS = [
  "Downtown / Business Bay",
  "Dubai Marina / JBR",
  "Palm Jumeirah",
  "JVC / JVT",
  "Dubai Hills / Arabian Ranches",
  "Creek / MBR City",
  "Open to suggestions",
];

const TIMELINES = [
  "Need to move in 30 days",
  "Within 3 months",
  "Within 6 months",
  "12+ months — exploring",
];

type Recommendation = {
  path: "rent" | "lease-to-own" | "buy" | "finance-later";
  title: string;
  why: string;
  steps: string[];
  cta: string;
  ctaHref: string;
  accent: string;
  icon: typeof Home;
};

function recommend(input: DecisionInput): Recommendation {
  const wantsToBuyNow =
    input.budget.includes("purchase") &&
    (input.downPayment.includes("400K+") || input.downPayment.includes("150K – 400K"));
  const hasBuyBudgetButLowDown =
    input.budget.includes("purchase") &&
    (input.downPayment.includes("None") || input.downPayment.includes("Under AED 50K"));
  const renterToday = input.budget.includes("rent");
  const urgent = input.timeline.includes("30 days") || input.timeline.includes("3 months");
  const longHorizon = input.timeline.includes("12+");

  if (wantsToBuyNow && !urgent) {
    return {
      path: "buy",
      title: "Buy now — you're mortgage-ready",
      why: "Your budget and down payment line up with current Dubai mortgage criteria. We'll match you to the right bank and property.",
      steps: [
        "Pre-approval via Holo, DIB, HSBC or ENBD (24–72h)",
        "Shortlist 5 properties matching your area & budget",
        "DeliWer handles Ejari, DEWA, movers & water on handover day",
      ],
      cta: "Get Mortgage Pre-Approval",
      ctaHref: "#mortgage",
      accent: "from-emerald-500 to-teal-600",
      icon: KeyRound,
    };
  }

  if (hasBuyBudgetButLowDown || (input.budget.includes("purchase") && longHorizon)) {
    return {
      path: "lease-to-own",
      title: "Lease-to-Own — start renting, end up owning",
      why: "You want to own but the down payment isn't there yet. Our lease-to-own partners convert part of your rent into future equity.",
      steps: [
        "Move into a partner property on a standard 12-month lease",
        "A portion of every rent payment is credited toward purchase",
        "Convert to ownership in Year 2 or 3 with reduced down payment",
      ],
      cta: "Explore Lease-to-Own Homes",
      ctaHref: "#lease-to-own",
      accent: "from-fuchsia-500 to-purple-600",
      icon: Repeat,
    };
  }

  if (renterToday && urgent) {
    return {
      path: "rent",
      title: "Rent now — move in within 30 days",
      why: "Speed matters. We'll secure a verified rental, handle Ejari & DEWA, and have your home ready before the cheque clears.",
      steps: [
        "Curated shortlist in your area (within 48h)",
        "Tenancy paperwork + Ejari registered for you",
        "DEWA, internet, movers & water organised for move-in day",
      ],
      cta: "Find a Rental + Move-In",
      ctaHref: "#rental",
      accent: "from-cyan-500 to-blue-600",
      icon: Home,
    };
  }

  return {
    path: "finance-later",
    title: "Rent today, finance later — build your buying position",
    why: "You're early in the journey. Rent comfortably now, save toward a down payment, and we'll set up your mortgage when you're ready.",
    steps: [
      "Rent + move-in handled in one WhatsApp thread",
      "Personal advisor reviews your buying readiness every 6 months",
      "Pre-approval triggered when down payment hits target",
    ],
    cta: "Start with a Rental",
    ctaHref: "#rental",
    accent: "from-amber-500 to-orange-600",
    icon: PiggyBank,
  };
}

const HOME_ACCESS_STORAGE_KEY = "deliwer_home_access_decision_v1";

function loadStoredDecision(): DecisionInput | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = window.localStorage.getItem(HOME_ACCESS_STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw);
    if (!parsed || typeof parsed !== "object") return null;
    return {
      salary: parsed.salary || "",
      budget: parsed.budget || "",
      downPayment: parsed.downPayment || "",
      residency: parsed.residency || "",
      area: parsed.area || "",
      timeline: parsed.timeline || "",
    };
  } catch {
    return null;
  }
}

function persistDecision(input: DecisionInput) {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(HOME_ACCESS_STORAGE_KEY, JSON.stringify(input));
    window.dispatchEvent(new CustomEvent("deliwer:home-access-updated"));
  } catch {
    /* noop */
  }
}

function DecisionTool() {
  const stored = loadStoredDecision();
  const empty: DecisionInput = {
    salary: "",
    budget: "",
    downPayment: "",
    residency: "",
    area: "",
    timeline: "",
  };
  const initial = stored ?? empty;
  const initialAllFilled = stored
    ? Object.values(stored).every((v) => v && v.length > 0)
    : false;

  const [step, setStep] = useState(initialAllFilled ? 6 : 0);
  const [input, setInput] = useState<DecisionInput>(initial);

  useEffect(() => {
    persistDecision(input);
  }, [input]);

  const fields: { key: keyof DecisionInput; label: string; options: string[]; icon: typeof Wallet }[] = [
    { key: "salary", label: "Monthly salary band", options: SALARY_BANDS, icon: Wallet },
    { key: "budget", label: "Housing budget", options: BUDGET_BANDS, icon: Calculator },
    { key: "downPayment", label: "Down payment saved", options: DOWN_PAYMENT_BANDS, icon: PiggyBank },
    { key: "residency", label: "Residency status", options: RESIDENCY, icon: ShieldCheck },
    { key: "area", label: "Preferred area", options: AREAS, icon: Compass },
    { key: "timeline", label: "Move-in timeline", options: TIMELINES, icon: Star },
  ];

  const total = fields.length;
  const isLast = step === total;
  const current = fields[step];
  const result = useMemo(() => (isLast ? recommend(input) : null), [isLast, input]);
  const allFilled = fields.every((f) => input[f.key]);

  const reset = () => {
    setInput({ salary: "", budget: "", downPayment: "", residency: "", area: "", timeline: "" });
    setStep(0);
  };

  if (isLast && result) {
    const Icon = result.icon;
    const waMessage = `Hi DeliWer — based on the Home Access tool, my recommended path is: ${result.title}.

Salary: ${input.salary}
Budget: ${input.budget}
Down payment: ${input.downPayment}
Residency: ${input.residency}
Area: ${input.area}
Timeline: ${input.timeline}

Please walk me through next steps.`;

    return (
      <Card className="bg-slate-900/80 border-emerald-500/30 backdrop-blur" data-testid="card-decision-result">
        <CardContent className="p-6 sm:p-8 space-y-6">
          <div className="flex items-start gap-4">
            <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${result.accent} flex items-center justify-center shrink-0`}>
              <Icon className="w-7 h-7 text-white" />
            </div>
            <div>
              <Badge className="bg-emerald-500/15 text-emerald-300 border-emerald-500/30 mb-2">
                <CheckCircle2 className="w-3.5 h-3.5 mr-1.5" /> Your recommended path
              </Badge>
              <h3 className="text-2xl sm:text-3xl font-bold text-white" data-testid="text-recommendation-title">
                {result.title}
              </h3>
            </div>
          </div>

          <p className="text-slate-300 text-base sm:text-lg leading-relaxed">{result.why}</p>

          <div className="space-y-2.5">
            {result.steps.map((s, i) => (
              <div key={i} className="flex items-start gap-3" data-testid={`text-step-${i}`}>
                <div className="w-6 h-6 rounded-full bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 text-xs font-bold flex items-center justify-center shrink-0 mt-0.5">
                  {i + 1}
                </div>
                <span className="text-slate-200">{s}</span>
              </div>
            ))}
          </div>

          <div className="flex flex-col sm:flex-row gap-3 pt-2">
            <a href={buildWA(waMessage)} target="_blank" rel="noopener noreferrer" className="flex-1">
              <Button
                className="w-full bg-emerald-500 hover:bg-emerald-600 text-white h-12 text-base font-bold"
                data-testid="button-result-whatsapp"
              >
                <MessageCircle className="w-5 h-5 mr-2" /> Continue on WhatsApp
              </Button>
            </a>
            <a href={result.ctaHref} className="flex-1">
              <Button
                variant="outline"
                className="w-full border-slate-600 text-slate-200 hover:bg-slate-800 h-12 text-base font-bold"
                data-testid="button-result-section"
              >
                {result.cta} <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </a>
          </div>

          <button
            onClick={reset}
            className="text-sm text-slate-400 hover:text-white underline underline-offset-4"
            data-testid="button-decision-restart"
          >
            Restart the questionnaire
          </button>
        </CardContent>
      </Card>
    );
  }

  const StepIcon = current.icon;

  return (
    <Card className="bg-slate-900/80 border-slate-800 backdrop-blur" data-testid="card-decision-tool">
      <CardContent className="p-6 sm:p-8 space-y-6">
        <div className="flex items-center justify-between">
          <Badge className="bg-emerald-500/15 text-emerald-300 border-emerald-500/30">
            Step {step + 1} of {total}
          </Badge>
          <div className="flex gap-1">
            {fields.map((_, i) => (
              <div
                key={i}
                className={`h-1.5 w-6 rounded-full ${i <= step ? "bg-emerald-500" : "bg-slate-700"}`}
              />
            ))}
          </div>
        </div>

        <div className="flex items-start gap-3">
          <div className="w-10 h-10 rounded-lg bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center shrink-0">
            <StepIcon className="w-5 h-5 text-emerald-300" />
          </div>
          <div>
            <Label className="text-xs font-bold uppercase tracking-widest text-slate-400">
              {current.label}
            </Label>
            <h3 className="text-xl sm:text-2xl font-bold text-white mt-1">
              {step === 0 && "What's your monthly salary?"}
              {step === 1 && "What's your housing budget?"}
              {step === 2 && "Do you have a down payment saved?"}
              {step === 3 && "What's your UAE residency status?"}
              {step === 4 && "Which area are you considering?"}
              {step === 5 && "When do you need to move?"}
            </h3>
          </div>
        </div>

        <div className="grid sm:grid-cols-2 gap-2.5">
          {current.options.map((opt) => {
            const selected = input[current.key] === opt;
            return (
              <button
                key={opt}
                onClick={() => setInput((s) => ({ ...s, [current.key]: opt }))}
                className={`text-left p-4 rounded-xl border transition-all ${
                  selected
                    ? "border-emerald-500/60 bg-emerald-500/10 text-white"
                    : "border-slate-700 bg-slate-950 text-slate-300 hover:border-slate-500 hover:bg-slate-900"
                }`}
                data-testid={`button-option-${current.key}-${opt.replace(/\s+/g, "-").toLowerCase()}`}
              >
                <div className="flex items-center justify-between gap-2">
                  <span className="text-sm font-medium">{opt}</span>
                  {selected && <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />}
                </div>
              </button>
            );
          })}
        </div>

        <div className="flex justify-between items-center pt-2">
          <Button
            variant="ghost"
            onClick={() => setStep((s) => Math.max(0, s - 1))}
            disabled={step === 0}
            className="text-slate-400 hover:text-white disabled:opacity-30"
            data-testid="button-decision-back"
          >
            Back
          </Button>
          <Button
            onClick={() => setStep((s) => s + 1)}
            disabled={!input[current.key]}
            className="bg-emerald-500 hover:bg-emerald-600 text-white font-bold disabled:opacity-40"
            data-testid="button-decision-next"
          >
            {step === total - 1 ? (allFilled ? "See My Recommendation" : "See My Recommendation") : "Next"}
            <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}

// ─── Smart Path Menu (sticky, Decision Tool aware) ───────────────────────────
const PATH_LINKS: { label: string; href: string; match: Recommendation["path"][] }[] = [
  { label: "Rent", href: "#rental", match: ["rent", "finance-later"] },
  { label: "Lease-to-Own", href: "#lease-to-own", match: ["lease-to-own"] },
  { label: "Buy", href: "#mortgage", match: ["buy"] },
  { label: "Finance", href: "#mortgage", match: ["buy", "finance-later"] },
  { label: "Developers", href: "#developers", match: [] },
  { label: "Move In", href: "#move-in", match: [] },
];

function SmartPathMenu() {
  const [input, setInput] = useState<DecisionInput | null>(null);
  const [stuck, setStuck] = useState(false);

  useEffect(() => {
    const sync = () => setInput(loadStoredDecision());
    sync();
    const onUpdate = () => sync();
    const onStorage = (e: StorageEvent) => {
      if (e.key === HOME_ACCESS_STORAGE_KEY) sync();
    };
    window.addEventListener("deliwer:home-access-updated", onUpdate);
    window.addEventListener("storage", onStorage);
    return () => {
      window.removeEventListener("deliwer:home-access-updated", onUpdate);
      window.removeEventListener("storage", onStorage);
    };
  }, []);

  useEffect(() => {
    const onScroll = () => setStuck(window.scrollY > 480);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const filledCount = input
    ? Object.values(input).filter((v) => v && v.length > 0).length
    : 0;
  const hasAll = filledCount === 6;
  const rec = hasAll && input ? recommend(input) : null;

  const summaryLabel = rec
    ? rec.path === "rent"
      ? "Rent now"
      : rec.path === "lease-to-own"
      ? "Lease-to-Own"
      : rec.path === "buy"
      ? "Buy now"
      : "Rent → Buy later"
    : null;

  const waLines = input
    ? ([
        rec
          ? `Hi DeliWer — based on the Home Access tool, my recommended path is: ${rec.title}.`
          : "Hi DeliWer — I started the Home Access tool and want to compare my options.",
        "",
        input.salary && `Salary: ${input.salary}`,
        input.budget && `Budget: ${input.budget}`,
        input.downPayment && `Down payment: ${input.downPayment}`,
        input.residency && `Residency: ${input.residency}`,
        input.area && `Area: ${input.area}`,
        input.timeline && `Timeline: ${input.timeline}`,
        "",
        "Please share matching mortgage and lease-to-own options.",
      ].filter(Boolean) as string[])
    : ["Hi DeliWer — I'd like help renting, lease-to-own or buying a home in Dubai."];

  const waHref = buildWA(waLines.join("\n"));

  return (
    <section
      className={`sticky top-0 z-30 border-y border-slate-800 transition-all ${
        stuck
          ? "bg-slate-950/95 backdrop-blur shadow-lg shadow-slate-950/40"
          : "bg-slate-900/40"
      }`}
      data-testid="section-smart-path-menu"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
        <div className="flex items-center gap-3 sm:gap-4">
          {/* Status pill (left) */}
          <div className="shrink-0 hidden sm:flex items-center gap-2">
            {rec ? (
              <a
                href="#decision-tool"
                className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-gradient-to-r ${rec.accent} text-white text-xs font-bold shadow-md`}
                data-testid="badge-recommended-path"
              >
                <CheckCircle2 className="w-3.5 h-3.5" />
                {summaryLabel}
              </a>
            ) : input && filledCount > 0 ? (
              <a
                href="#decision-tool"
                className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 text-xs font-bold"
                data-testid="badge-progress"
              >
                <Compass className="w-3.5 h-3.5" />
                {filledCount}/6 · Continue
              </a>
            ) : (
              <span className="text-slate-400 font-bold uppercase tracking-widest text-xs">
                Help me
              </span>
            )}
          </div>

          {/* Scrollable menu (center) */}
          <nav className="flex-1 overflow-x-auto scrollbar-none">
            <div className="flex items-center gap-1 sm:gap-1.5 min-w-max">
              {PATH_LINKS.map((p) => {
                const isRecommended = rec ? p.match.includes(rec.path) : false;
                return (
                  <a
                    key={p.label}
                    href={p.href}
                    className={`px-3 py-1.5 rounded-full text-sm font-semibold transition whitespace-nowrap ${
                      isRecommended
                        ? "bg-emerald-500/15 text-emerald-300 border border-emerald-500/40"
                        : "text-slate-300 hover:text-white hover:bg-slate-800/60 border border-transparent"
                    }`}
                    data-testid={`link-path-${p.label.toLowerCase().replace(/\s+/g, "-")}`}
                  >
                    {p.label}
                  </a>
                );
              })}
            </div>
          </nav>

          {/* CTAs (right) */}
          <div className="shrink-0 flex items-center gap-2">
            <a href="#mortgage" className="hidden md:block">
              <Button
                size="sm"
                variant="outline"
                className="border-blue-500/40 bg-blue-500/10 text-blue-200 hover:bg-blue-500/20 hover:text-white font-bold h-9"
                data-testid="button-menu-mortgage"
              >
                <Banknote className="w-4 h-4 mr-1.5" /> Compare Mortgages
              </Button>
            </a>
            <a href={waHref} target="_blank" rel="noopener noreferrer">
              <Button
                size="sm"
                className="bg-emerald-500 hover:bg-emerald-600 text-white font-bold h-9"
                data-testid="button-menu-whatsapp"
              >
                <MessageCircle className="w-4 h-4 sm:mr-1.5" />
                <span className="hidden sm:inline">
                  {rec ? "WhatsApp My Path" : "WhatsApp Advisor"}
                </span>
              </Button>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── WhatsApp Pill (page-specific, consistent with site-wide pill) ───────────
function HomeAccessWhatsAppPill() {
  const handleClick = () => {
    try {
      const currentClicks = parseInt(localStorage.getItem("wa_clicks") || "0");
      localStorage.setItem("wa_clicks", (currentClicks + 1).toString());
    } catch {
      /* noop */
    }
    const stored = loadStoredDecision();
    const filled = stored && Object.values(stored).filter((v) => v && v.length > 0).length;
    const intro =
      stored && filled
        ? `Hi DeliWer — I'm exploring Home Access options${
            stored.area ? ` in ${stored.area}` : ""
          }${stored.budget ? ` (budget ${stored.budget})` : ""}. Please help me with next steps.`
        : "Hi DeliWer — I'd like help renting, lease-to-own or buying a home in Dubai.";
    window.open(buildWA(intro), "_blank", "noopener,noreferrer");
  };

  return (
    <button
      onClick={handleClick}
      data-testid="button-home-access-whatsapp"
      title="Chat on WhatsApp — reply within 10 minutes"
      className="fixed bottom-5 right-5 z-50 inline-flex items-center gap-2 bg-[#25D366] hover:bg-[#1ebe5b] text-white font-semibold px-4 py-3 rounded-full shadow-lg shadow-emerald-900/30 transition-transform hover:scale-105 active:scale-95"
    >
      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
      </svg>
      <span className="hidden sm:inline whitespace-nowrap">Chat on WhatsApp</span>
    </button>
  );
}

// ─── Page ────────────────────────────────────────────────────────────────────
export default function HomeAccess() {
  const heroWA = buildWA(
    "Hi DeliWer — I'd like to speak to an advisor about renting, lease-to-own or buying a home in Dubai."
  );

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <Helmet>
        <title>Home Access in Dubai · Rent, Lease-to-Own or Buy with DeliWer</title>
        <meta
          name="description"
          content="DeliWer is Dubai's Home Access Platform. Compare flexible payment plans, mortgage options, lease-to-own opportunities and move into your next home — all in one WhatsApp thread."
        />
        <meta property="og:title" content="DeliWer · Dubai's Home Access Platform" />
        <meta
          property="og:description"
          content="Rent, lease-to-own or buy your home in Dubai. Compare payment plans, mortgages and lease-to-own with DeliWer."
        />
        <meta property="og:image" content={dubaiSkyline} />
        <link rel="canonical" href="https://deliwer.com/home-access" />
      </Helmet>

      {/* ── HERO ──────────────────────────────────────────────────────────── */}
      <section className="relative overflow-hidden" data-testid="section-hero">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${dubaiSkyline})` }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-slate-950/85 via-slate-950/80 to-slate-950" />
        <div className="absolute inset-0 bg-gradient-to-r from-emerald-950/30 via-transparent to-blue-950/30" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24 lg:py-32">
          <div className="max-w-3xl">
            <Badge className="bg-emerald-500/15 text-emerald-300 border-emerald-500/30 mb-5 text-xs font-bold tracking-widest uppercase">
              <Sparkles className="w-3.5 h-3.5 mr-1.5" /> Dubai's Home Access Platform
            </Badge>
            <h1
              className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-black leading-[1.05] mb-6"
              data-testid="heading-hero"
            >
              Rent,{" "}
              <span className="bg-gradient-to-r from-emerald-400 via-cyan-300 to-blue-400 bg-clip-text text-transparent">
                Lease-to-Own
              </span>{" "}
              or Buy Your Home in Dubai
            </h1>
            <p className="text-lg sm:text-xl text-slate-200 leading-relaxed mb-8 max-w-2xl">
              Compare flexible payment plans, mortgage options, lease-to-own opportunities
              and move into your next home with DeliWer.
            </p>

            <div className="flex flex-col sm:flex-row gap-3">
              <a href="#decision-tool">
                <Button
                  size="lg"
                  className="bg-emerald-500 hover:bg-emerald-600 text-white h-12 px-6 text-base font-bold w-full sm:w-auto"
                  data-testid="button-hero-check-options"
                >
                  Check My Options <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
              </a>
              <a href="#developers">
                <Button
                  size="lg"
                  variant="outline"
                  className="border-slate-500 bg-slate-900/70 text-white hover:bg-slate-800 h-12 px-6 text-base font-bold w-full sm:w-auto"
                  data-testid="button-hero-explore-homes"
                >
                  <Home className="w-5 h-5 mr-2" /> Explore Homes
                </Button>
              </a>
              <a href={heroWA} target="_blank" rel="noopener noreferrer">
                <Button
                  size="lg"
                  variant="outline"
                  className="border-emerald-500/50 bg-transparent text-emerald-300 hover:bg-emerald-500/10 hover:text-emerald-200 h-12 px-6 text-base font-bold w-full sm:w-auto"
                  data-testid="button-hero-advisor"
                >
                  <Phone className="w-5 h-5 mr-2" /> Speak to Advisor
                </Button>
              </a>
            </div>

            <div className="flex flex-wrap items-center gap-x-6 gap-y-2 mt-10 text-sm text-slate-300">
              <span className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" /> 6 paths · 1 advisor
              </span>
              <span className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" /> WhatsApp-first
              </span>
              <span className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" /> Move-in handled end-to-end
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* ── SMART PATH MENU (sticky, Decision Tool aware) ──────────────────── */}
      <SmartPathMenu />

      {/* ── DECISION TOOL ─────────────────────────────────────────────────── */}
      <section id="decision-tool" className="scroll-mt-24" data-testid="section-decision-tool">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
          <div className="text-center mb-10">
            <Badge className="bg-emerald-500/15 text-emerald-300 border-emerald-500/30 mb-3">
              <Compass className="w-3.5 h-3.5 mr-1.5" /> 60-second guided tool
            </Badge>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-3" data-testid="heading-decision-tool">
              Which path is right for you?
            </h2>
            <p className="text-slate-300 text-lg max-w-2xl mx-auto">
              Answer six quick questions. We'll recommend whether to rent, lease-to-own,
              buy now, or finance later — and connect you to the right partner.
            </p>
          </div>
          <DecisionTool />
        </div>
      </section>

      {/* ── LEASE-TO-OWN ──────────────────────────────────────────────────── */}
      <section id="lease-to-own" className="scroll-mt-24 bg-gradient-to-b from-slate-950 via-fuchsia-950/10 to-slate-950" data-testid="section-lease-to-own">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <Badge className="bg-fuchsia-500/15 text-fuchsia-300 border-fuchsia-500/30 mb-3">
                <Repeat className="w-3.5 h-3.5 mr-1.5" /> Lease-to-Own
              </Badge>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4" data-testid="heading-lease-to-own">
                Rent today. Own tomorrow.
              </h2>
              <p className="text-slate-300 text-lg leading-relaxed mb-6">
                You don't need a 20% down payment to start your ownership journey.
                Our developer and landlord partners offer programmes that convert
                a portion of your rent into equity toward purchase.
              </p>

              <div className="space-y-4 mb-8">
                {[
                  { t: "Rent today", d: "Move in immediately on a standard 12-month lease." },
                  { t: "Build an ownership path", d: "A locked purchase price is set at signing." },
                  { t: "Convert rent to equity", d: "Up to 30% of rent paid is credited toward your down payment." },
                ].map((s, i) => (
                  <div key={s.t} className="flex gap-4">
                    <div className="w-9 h-9 rounded-lg bg-fuchsia-500/15 border border-fuchsia-500/30 text-fuchsia-300 font-bold flex items-center justify-center shrink-0">
                      {i + 1}
                    </div>
                    <div>
                      <h3 className="text-white font-bold mb-1">{s.t}</h3>
                      <p className="text-slate-400 text-sm">{s.d}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="flex flex-wrap gap-3">
                <a href="#decision-tool">
                  <Button className="bg-fuchsia-500 hover:bg-fuchsia-600 text-white font-bold" data-testid="button-lease-check-eligibility">
                    Check Lease-to-Own Eligibility <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </a>
                <a href={buildWA("Hi DeliWer — please share lease-to-own homes available right now.")} target="_blank" rel="noopener noreferrer">
                  <Button variant="outline" className="border-slate-600 text-slate-200 hover:bg-slate-800" data-testid="button-lease-whatsapp">
                    <MessageCircle className="w-4 h-4 mr-2" /> WhatsApp Available Homes
                  </Button>
                </a>
              </div>
            </div>

            <div className="relative">
              <div className="absolute -inset-4 bg-gradient-to-br from-fuchsia-500/20 to-purple-600/10 rounded-3xl blur-2xl" />
              <Card className="relative bg-slate-900/80 border-fuchsia-500/30 overflow-hidden">
                <div className="aspect-[4/3] relative">
                  <img src={keysHandover} alt="Keys handover" className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/30 to-transparent" />
                </div>
                <CardContent className="p-6 space-y-3">
                  <div className="flex items-center gap-2">
                    <Handshake className="w-5 h-5 text-fuchsia-300" />
                    <h3 className="font-bold text-white">Developer & Landlord Partners</h3>
                  </div>
                  <p className="text-slate-300 text-sm">
                    Live programmes with Samana, DAMAC and select Emaar units, plus
                    landlord-funded rent-credit schemes in JVC, Business Bay and Dubai South.
                  </p>
                  <div className="flex flex-wrap gap-2 pt-2">
                    <Badge className="bg-slate-800 text-slate-200 border-slate-700">Up to 30% rent credit</Badge>
                    <Badge className="bg-slate-800 text-slate-200 border-slate-700">2–3 year conversion</Badge>
                    <Badge className="bg-slate-800 text-slate-200 border-slate-700">Locked price</Badge>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* ── MORTGAGE ──────────────────────────────────────────────────────── */}
      <section id="mortgage" className="scroll-mt-24" data-testid="section-mortgage">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
          <div className="text-center mb-12">
            <Badge className="bg-blue-500/15 text-blue-300 border-blue-500/30 mb-3">
              <Banknote className="w-3.5 h-3.5 mr-1.5" /> Mortgage Options
            </Badge>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-3" data-testid="heading-mortgage">
              Compare every UAE mortgage in one search
            </h2>
            <p className="text-slate-300 text-lg max-w-2xl mx-auto">
              We've integrated with Dubai's leading digital mortgage platform and the
              banks expats trust most — so pre-approval takes hours, not weeks.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {MORTGAGE_PARTNERS.map((p) => (
              <Card
                key={p.name}
                className="bg-slate-900/70 border-slate-800 hover:border-blue-500/50 transition group overflow-hidden"
                data-testid={`card-mortgage-${p.name.toLowerCase()}`}
              >
                <div
                  className="h-40 flex items-center justify-center relative p-6 bg-white"
                >
                  {p.logo ? (
                    <img
                      src={p.logo}
                      alt={p.full}
                      className="max-h-24 max-w-[85%] object-contain drop-shadow-sm"
                    />
                  ) : (
                    <div
                      className="text-white font-black text-4xl sm:text-5xl tracking-tight px-6 py-4 rounded-xl"
                      style={{ background: p.bg }}
                    >
                      {p.initials}
                    </div>
                  )}
                  <div className={`absolute inset-0 bg-gradient-to-br ${p.accent} opacity-0 group-hover:opacity-10 transition pointer-events-none`} />
                </div>
                <CardContent className="p-5 space-y-2">
                  <h3 className="font-bold text-white text-lg">{p.full}</h3>
                  <p className="text-xs uppercase tracking-widest text-emerald-300 font-bold">{p.tag}</p>
                  <p className="text-sm text-slate-400 leading-relaxed">{p.desc}</p>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="mt-10 flex flex-col sm:flex-row gap-3 justify-center">
            <a href="#decision-tool">
              <Button className="bg-blue-500 hover:bg-blue-600 text-white font-bold h-12 px-6" data-testid="button-mortgage-preapproval">
                Get Pre-Approved <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </a>
            <a href={buildWA("Hi DeliWer — I'd like to compare UAE mortgage options. Please send me the latest rates.")} target="_blank" rel="noopener noreferrer">
              <Button variant="outline" className="border-slate-600 text-slate-200 hover:bg-slate-800 h-12 px-6 font-bold" data-testid="button-mortgage-whatsapp">
                <MessageCircle className="w-4 h-4 mr-2" /> Talk to a Mortgage Advisor
              </Button>
            </a>
          </div>
        </div>
      </section>

      {/* ── DEVELOPER PLANS ───────────────────────────────────────────────── */}
      <section id="developers" className="scroll-mt-24 bg-gradient-to-b from-slate-950 via-amber-950/10 to-slate-950" data-testid="section-developers">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
          <div className="text-center mb-12">
            <Badge className="bg-amber-500/15 text-amber-300 border-amber-500/30 mb-3">
              <Building2 className="w-3.5 h-3.5 mr-1.5" /> Developer Payment Plans
            </Badge>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-3" data-testid="heading-developers">
              Off-plan with payment plans you can afford
            </h2>
            <p className="text-slate-300 text-lg max-w-2xl mx-auto">
              Skip the 20% down payment. Buy direct from Dubai's top developers with
              long post-handover plans starting from 1% per month.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {DEVELOPERS.map((d) => (
              <Card
                key={d.name}
                className="bg-slate-900/70 border-slate-800 hover:border-amber-500/40 transition overflow-hidden"
                data-testid={`card-developer-${d.name.toLowerCase().replace(/\s+/g, "-")}`}
              >
                <div className={`h-2 bg-gradient-to-r ${d.accent}`} />
                <CardContent className="p-6 space-y-4">
                  <div>
                    <Badge className="bg-slate-800 text-slate-300 border-slate-700 mb-2 text-xs">{d.tag}</Badge>
                    <h3 className="text-2xl font-bold text-white">{d.name}</h3>
                  </div>
                  <div className={`bg-gradient-to-r ${d.accent} bg-clip-text text-transparent text-2xl font-black`}>
                    {d.plan}
                  </div>
                  <ul className="space-y-2 text-sm text-slate-300">
                    <li className="flex gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />{d.handover}</li>
                    <li className="flex gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />{d.highlight}</li>
                    <li className="flex gap-2"><Star className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />{d.perk}</li>
                  </ul>
                  <a
                    href={buildWA(`Hi DeliWer — please send me current ${d.name} payment plans and available units.`)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block"
                  >
                    <Button variant="outline" className="w-full border-slate-600 text-slate-200 hover:bg-slate-800" data-testid={`button-developer-${d.name.toLowerCase().replace(/\s+/g, "-")}`}>
                      View Available Units <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                  </a>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* ── RENTAL ────────────────────────────────────────────────────────── */}
      <section id="rental" className="scroll-mt-24" data-testid="section-rental">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="relative order-2 lg:order-1">
              <div className="absolute -inset-4 bg-gradient-to-br from-cyan-500/20 to-blue-600/10 rounded-3xl blur-2xl" />
              <Card className="relative bg-slate-900/80 border-cyan-500/30 overflow-hidden">
                <div className="aspect-[4/3] relative">
                  <img src={dubaiApartment} alt="Dubai apartment" className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/30 to-transparent" />
                </div>
                <CardContent className="p-6 space-y-3">
                  <div className="flex items-center gap-2">
                    <Home className="w-5 h-5 text-cyan-300" />
                    <h3 className="font-bold text-white">Just need a place — fast</h3>
                  </div>
                  <p className="text-slate-300 text-sm">
                    Verified rentals across Dubai with full move-in service included.
                    Sign the cheque, we handle the rest.
                  </p>
                  <div className="flex flex-wrap gap-2 pt-2">
                    <Badge className="bg-slate-800 text-slate-200 border-slate-700">Verified listings</Badge>
                    <Badge className="bg-slate-800 text-slate-200 border-slate-700">Ejari handled</Badge>
                    <Badge className="bg-slate-800 text-slate-200 border-slate-700">Move-in ready</Badge>
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="order-1 lg:order-2">
              <Badge className="bg-cyan-500/15 text-cyan-300 border-cyan-500/30 mb-3">
                <Home className="w-3.5 h-3.5 mr-1.5" /> Rental
              </Badge>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4" data-testid="heading-rental">
                Need housing now? We move you in within days.
              </h2>
              <p className="text-slate-300 text-lg leading-relaxed mb-6">
                For users who simply need housing now. We shortlist verified rentals,
                negotiate with the landlord, and integrate every DeliWer move-in service
                so you can settle in immediately.
              </p>
              <ul className="space-y-3 mb-8">
                {[
                  "Curated shortlist in 48 hours",
                  "Cheque, contract & negotiation handled",
                  "Ejari + DEWA + internet on move-in day",
                  "Movers, water and home readiness included",
                ].map((s) => (
                  <li key={s} className="flex gap-3 text-slate-200">
                    <CheckCircle2 className="w-5 h-5 text-cyan-400 shrink-0 mt-0.5" />
                    {s}
                  </li>
                ))}
              </ul>
              <div className="flex flex-wrap gap-3">
                <a href={buildWA("Hi DeliWer — I need to rent a home in Dubai. Please send me available options.")} target="_blank" rel="noopener noreferrer">
                  <Button className="bg-cyan-500 hover:bg-cyan-600 text-white font-bold" data-testid="button-rental-whatsapp">
                    <MessageCircle className="w-4 h-4 mr-2" /> Find Me a Rental
                  </Button>
                </a>
                <Link href="/relocate">
                  <Button variant="outline" className="border-slate-600 text-slate-200 hover:bg-slate-800" data-testid="button-rental-move-in">
                    See Move-In Services <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── MOVE-IN ───────────────────────────────────────────────────────── */}
      <section id="move-in" className="scroll-mt-24 bg-gradient-to-b from-slate-950 via-emerald-950/10 to-slate-950" data-testid="section-move-in">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
          <div className="text-center mb-12">
            <Badge className="bg-emerald-500/15 text-emerald-300 border-emerald-500/30 mb-3">
              <Truck className="w-3.5 h-3.5 mr-1.5" /> Move-In Services
            </Badge>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-3" data-testid="heading-move-in">
              Every path ends with one move-in day
            </h2>
            <p className="text-slate-300 text-lg max-w-2xl mx-auto">
              Whether you rent, lease-to-own or buy — DeliWer owns the move-in
              relationship so your home is ready the day you walk in.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {MOVE_IN_SERVICES.map((s) => (
              <Card
                key={s.t}
                className="bg-slate-900/70 border-slate-800 hover:border-emerald-500/40 transition"
                data-testid={`card-service-${s.t.toLowerCase().replace(/\s+/g, "-")}`}
              >
                <CardContent className="p-6 space-y-3">
                  <div className="w-11 h-11 rounded-xl bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center">
                    <s.icon className="w-5 h-5 text-emerald-300" />
                  </div>
                  <h3 className="font-bold text-white text-lg">{s.t}</h3>
                  <p className="text-slate-400 text-sm leading-relaxed">{s.d}</p>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="mt-10 text-center">
            <Link href="/relocate">
              <Button variant="outline" className="border-slate-600 text-slate-200 hover:bg-slate-800 h-12 px-6 font-bold" data-testid="button-move-in-explore">
                Explore Full Move-In Suite <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* ── REVENUE MODEL ─────────────────────────────────────────────────── */}
      <section className="bg-slate-900/40 border-y border-slate-800" data-testid="section-revenue">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
          <div className="text-center mb-12">
            <Badge className="bg-amber-500/15 text-amber-300 border-amber-500/30 mb-3">
              <TrendingUp className="w-3.5 h-3.5 mr-1.5" /> How DeliWer Earns
            </Badge>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-3" data-testid="heading-revenue">
              Six revenue streams. One trusted advisor.
            </h2>
            <p className="text-slate-300 text-lg max-w-2xl mx-auto">
              We're not a brokerage and not a mortgage company. We're a Home Access
              Platform — paid by the partners we connect you to, never by you twice.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {REVENUE_STREAMS.map((r) => (
              <div
                key={r.t}
                className="p-6 rounded-2xl bg-slate-900/70 border border-slate-800 hover:border-amber-500/40 transition"
                data-testid={`card-revenue-${r.t.toLowerCase().replace(/\s+/g, "-")}`}
              >
                <div className="flex items-start gap-4">
                  <div className="w-11 h-11 rounded-xl bg-amber-500/15 border border-amber-500/30 flex items-center justify-center shrink-0">
                    <r.icon className="w-5 h-5 text-amber-300" />
                  </div>
                  <div>
                    <h3 className="font-bold text-white mb-1">{r.t}</h3>
                    <p className="text-slate-400 text-sm leading-relaxed">{r.d}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FINAL CTA ─────────────────────────────────────────────────────── */}
      <section className="relative overflow-hidden" data-testid="section-final-cta">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-30"
          style={{ backgroundImage: `url(${damacSkyline})` }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-slate-950/90 via-slate-950/95 to-slate-950" />

        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-28 text-center">
          <Badge className="bg-emerald-500/15 text-emerald-300 border-emerald-500/30 mb-4">
            <Sparkles className="w-3.5 h-3.5 mr-1.5" /> One platform. Every path.
          </Badge>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black mb-5" data-testid="heading-final-cta">
            Your Dubai home — your way
          </h2>
          <p className="text-slate-300 text-lg sm:text-xl max-w-2xl mx-auto mb-8">
            Whether you're moving in next week or buying in two years, start the
            same place: one WhatsApp thread with a DeliWer Home Access advisor.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <a href="#decision-tool">
              <Button size="lg" className="bg-emerald-500 hover:bg-emerald-600 text-white font-bold h-12 px-8 w-full sm:w-auto" data-testid="button-final-check-options">
                Check My Options <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </a>
            <a href={heroWA} target="_blank" rel="noopener noreferrer">
              <Button size="lg" variant="outline" className="border-slate-500 bg-slate-900/70 text-white hover:bg-slate-800 font-bold h-12 px-8 w-full sm:w-auto" data-testid="button-final-advisor">
                <MessageCircle className="w-5 h-5 mr-2" /> Speak to Advisor
              </Button>
            </a>
          </div>
        </div>
      </section>

      <HomeAccessWhatsAppPill />
    </div>
  );
}
