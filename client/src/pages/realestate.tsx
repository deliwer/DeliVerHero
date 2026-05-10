import { Helmet } from "react-helmet";
import { Link } from "wouter";
import { useMemo, useState } from "react";
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
  CheckCircle2,
  ArrowRight,
  Phone,
  Sparkles,
  Building2,
  MessageCircle,
  Home,
  Calculator,
  ShieldCheck,
  KeyRound,
  Wallet,
  PiggyBank,
  Landmark,
  TrendingUp,
  Percent,
  FileSignature,
  Truck,
  Wifi,
  Droplets,
  Zap,
  ClipboardCheck,
  Globe2,
  BadgeCheck,
  Flame,
  ChevronRight,
  Handshake,
  Briefcase,
  Users,
  Trophy,
  Rocket,
  GraduationCap,
  FileText,
} from "lucide-react";

import { BrokerCTABanner } from "@/components/broker-cta-banner";
import dubaiSkyline from "@assets/stock_images/dubai_skyline_sunset_21b85db0.jpg";
import dubaiVilla from "@assets/stock_images/dubai_luxury_villa_i_9244d415.jpg";
import dubaiFamily from "@assets/stock_images/dubai_family_diverse_5745a5cf.jpg";
import keysHandover from "@assets/stock_images/keys_handover.jpg";
import damacSkyline from "@assets/stock_images/dubai_damac_skyline.jpg";

import logoDIB from "@assets/bank-logos/dib.png";
import logoENBD from "@assets/bank-logos/emirates-nbd.png";
import logoHSBC from "@assets/bank-logos/hsbc.png";
import logoADCB from "@assets/bank-logos/adcb.png";
import logoFAB from "@assets/bank-logos/fab.png";
import logoMashreq from "@assets/bank-logos/mashreq.png";

const WA_NUMBER = "971523946311";

type FinancePartner = {
  name: string;
  full: string;
  tag: string;
  bg: string;
  fg: string;
  logo?: string;
};

const FINANCE_PARTNERS: FinancePartner[] = [
  { name: "DIB",     full: "Dubai Islamic Bank",        tag: "Sharia-compliant home finance",     bg: "#006A4E", fg: "#FFFFFF", logo: logoDIB },
  { name: "ENBD",    full: "Emirates NBD",              tag: "Resident & non-resident mortgages", bg: "#1B3A6B", fg: "#FFFFFF", logo: logoENBD },
  { name: "HSBC",    full: "HSBC UAE",                  tag: "Premier expat mortgage solutions",  bg: "#DB0011", fg: "#FFFFFF", logo: logoHSBC },
  { name: "ADCB",    full: "Abu Dhabi Commercial Bank", tag: "Up to 80% LTV financing",           bg: "#E2231A", fg: "#FFFFFF", logo: logoADCB },
  { name: "FAB",     full: "First Abu Dhabi Bank",      tag: "Tailored UAE national & expat plans", bg: "#003E7E", fg: "#FFFFFF", logo: logoFAB },
  { name: "MASHREQ", full: "Mashreq Bank",              tag: "Pre-approval in 48 hours",          bg: "#FF6F1B", fg: "#FFFFFF", logo: logoMashreq },
  { name: "CBD",     full: "Commercial Bank of Dubai",  tag: "Flexible buy-to-let financing",     bg: "#7B0023", fg: "#FFFFFF" },
  { name: "RAKBANK", full: "RAKBANK",                   tag: "Competitive fixed-rate home loans", bg: "#FFC72C", fg: "#0B0B0B" },
];

const DEVELOPER_PLANS = [
  {
    name: "Samana Developers",
    tag: "Post-Handover Specialist",
    accent: "from-cyan-500 to-blue-600",
    plan: "10% Down · 1% Monthly",
    handover: "Up to 8 yrs post-handover",
    highlight: "Private pool apartments from AED 750K",
    perk: "Zero DLD fee on selected towers",
  },
  {
    name: "DAMAC Properties",
    tag: "Branded Residences",
    accent: "from-amber-500 to-orange-600",
    plan: "20% Down · 70/30 Split",
    handover: "Furnished, ready-to-rent units",
    highlight: "Trump, de GRISOGONO, Cavalli branded towers",
    perk: "Guaranteed ROI options up to 3 years",
  },
  {
    name: "Emaar Properties",
    tag: "Master Community Leader",
    accent: "from-emerald-500 to-teal-600",
    plan: "10% Down · 80/20 Plan",
    handover: "Downtown, Creek, Arabian Ranches",
    highlight: "Blue-chip resale & rental demand",
    perk: "Easy 5-year residency on AED 2M+ purchase",
  },
  {
    name: "Sobha Realty",
    tag: "Premium Build Quality",
    accent: "from-fuchsia-500 to-purple-600",
    plan: "20% Down · 60/40 Plan",
    handover: "Sobha Hartland & Hartland II",
    highlight: "Backwater villas & waterfront apartments",
    perk: "Free property management for first year",
  },
];

const CONCIERGE_SERVICES = [
  { icon: FileSignature, t: "Ejari Registration", d: "Tenancy contract attested, registered & shared with you in 24 hours." },
  { icon: Zap,           t: "DEWA Activation",    d: "Electricity & water connected on move-in day — no queues, no security deposit hassle." },
  { icon: Wifi,          t: "Internet & TV",      d: "Etisalat / du home plans pre-booked, installed within 48 hours." },
  { icon: Truck,         t: "Movers & Packing",   d: "Vetted, insured movers. Packing, transport, assembly — flat-rate quote." },
  { icon: Droplets,      t: "Water Delivery",     d: "AquaCafe alkaline water installed in your kitchen the day you arrive." },
  { icon: ClipboardCheck,t: "Home Readiness Audit", d: "AC service, deep-clean, locks changed, smart-home setup before key handover." },
];

const INVESTMENT_OPPS = [
  {
    icon: Flame,
    title: "Distress & Off-Plan Resale",
    desc: "Hand-picked units from owners who need to exit fast. 8–18% below market with clean title.",
    badge: "From AED 480K",
    accent: "text-amber-300 border-amber-500/30 bg-amber-500/10",
  },
  {
    icon: TrendingUp,
    title: "Cash-Flow Payment Plans",
    desc: "Buy off-plan, rent it out before handover. Use rental yield to cover instalments.",
    badge: "Net yield 6–9%",
    accent: "text-emerald-300 border-emerald-500/30 bg-emerald-500/10",
  },
  {
    icon: Globe2,
    title: "UAE Residency by Investment",
    desc: "AED 750K → 2-year visa · AED 2M → 10-year Golden Visa. We handle the paperwork end-to-end.",
    badge: "Golden Visa Eligible",
    accent: "text-cyan-300 border-cyan-500/30 bg-cyan-500/10",
  },
];

function fmtAED(n: number) {
  if (!isFinite(n)) return "—";
  return "AED " + Math.round(n).toLocaleString("en-AE");
}

function RentVsOwnCalculator() {
  const [price, setPrice] = useState(1500000);
  const [downPct, setDownPct] = useState(20);
  const [rate, setRate] = useState(4.25);
  const [years, setYears] = useState(25);
  const [rent, setRent] = useState(95000);
  const [horizon, setHorizon] = useState(5);

  const result = useMemo(() => {
    const down = price * (downPct / 100);
    const principal = price - down;
    const r = rate / 100 / 12;
    const n = years * 12;
    const monthly = r === 0 ? principal / n : (principal * r) / (1 - Math.pow(1 + r, -n));

    const annualMortgage = monthly * 12;
    const serviceCharges = price * 0.012;
    const ownTotal = down + (annualMortgage + serviceCharges) * horizon;

    let rentTotal = 0;
    let yearly = rent;
    for (let i = 0; i < horizon; i++) {
      rentTotal += yearly;
      yearly *= 1.05;
    }

    const equityBuilt = horizon * annualMortgage * 0.32 + down;
    const netOwnCost = ownTotal - equityBuilt;
    const savings = rentTotal - netOwnCost;

    return { monthly, down, ownTotal, rentTotal, savings };
  }, [price, downPct, rate, years, rent, horizon]);

  return (
    <Card className="bg-slate-900/70 border-slate-800 backdrop-blur" data-testid="card-calculator">
      <CardContent className="p-6 sm:p-8">
        <div className="grid lg:grid-cols-2 gap-8">
          <div className="space-y-5">
            <div>
              <Label className="text-xs font-bold uppercase tracking-widest text-slate-400">Property price</Label>
              <Input
                type="number"
                value={price}
                onChange={(e) => setPrice(Math.max(0, Number(e.target.value)))}
                className="bg-slate-950 border-slate-700 text-white h-11 mt-1.5"
                data-testid="input-calc-price"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label className="text-xs font-bold uppercase tracking-widest text-slate-400">Down payment %</Label>
                <Input
                  type="number"
                  value={downPct}
                  onChange={(e) => setDownPct(Math.min(100, Math.max(0, Number(e.target.value))))}
                  className="bg-slate-950 border-slate-700 text-white h-11 mt-1.5"
                  data-testid="input-calc-down"
                />
              </div>
              <div>
                <Label className="text-xs font-bold uppercase tracking-widest text-slate-400">Mortgage rate %</Label>
                <Input
                  type="number"
                  step="0.05"
                  value={rate}
                  onChange={(e) => setRate(Math.max(0, Number(e.target.value)))}
                  className="bg-slate-950 border-slate-700 text-white h-11 mt-1.5"
                  data-testid="input-calc-rate"
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label className="text-xs font-bold uppercase tracking-widest text-slate-400">Term (years)</Label>
                <Input
                  type="number"
                  value={years}
                  onChange={(e) => setYears(Math.min(30, Math.max(1, Number(e.target.value))))}
                  className="bg-slate-950 border-slate-700 text-white h-11 mt-1.5"
                  data-testid="input-calc-years"
                />
              </div>
              <div>
                <Label className="text-xs font-bold uppercase tracking-widest text-slate-400">Compare to rent (AED/yr)</Label>
                <Input
                  type="number"
                  value={rent}
                  onChange={(e) => setRent(Math.max(0, Number(e.target.value)))}
                  className="bg-slate-950 border-slate-700 text-white h-11 mt-1.5"
                  data-testid="input-calc-rent"
                />
              </div>
            </div>
            <div>
              <Label className="text-xs font-bold uppercase tracking-widest text-slate-400">Horizon (years)</Label>
              <div className="flex gap-2 mt-2">
                {[3, 5, 7, 10].map((h) => (
                  <button
                    key={h}
                    type="button"
                    onClick={() => setHorizon(h)}
                    data-testid={`button-horizon-${h}`}
                    className={`flex-1 h-10 rounded-md text-sm font-semibold border transition ${
                      horizon === h
                        ? "bg-emerald-500 border-emerald-400 text-slate-950"
                        : "bg-slate-950 border-slate-700 text-slate-300 hover:border-slate-500"
                    }`}
                  >
                    {h}y
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <div className="rounded-xl border border-slate-800 bg-slate-950/60 p-5">
              <div className="text-xs font-bold uppercase tracking-widest text-slate-500">Estimated monthly mortgage</div>
              <div className="text-3xl sm:text-4xl font-black text-white mt-1" data-testid="text-calc-monthly">
                {fmtAED(result.monthly)}
              </div>
              <div className="text-xs text-slate-500 mt-1">Down payment today: {fmtAED(result.down)}</div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="rounded-xl border border-slate-800 bg-slate-950/60 p-4">
                <div className="text-[11px] font-bold uppercase tracking-widest text-slate-500">Cost to OWN ({horizon}y)</div>
                <div className="text-lg font-bold text-white mt-1" data-testid="text-calc-own">{fmtAED(result.ownTotal)}</div>
                <div className="text-[11px] text-slate-500 mt-0.5">Down + mortgage + fees</div>
              </div>
              <div className="rounded-xl border border-slate-800 bg-slate-950/60 p-4">
                <div className="text-[11px] font-bold uppercase tracking-widest text-slate-500">Cost to RENT ({horizon}y)</div>
                <div className="text-lg font-bold text-white mt-1" data-testid="text-calc-rent">{fmtAED(result.rentTotal)}</div>
                <div className="text-[11px] text-slate-500 mt-0.5">+5% annual escalation</div>
              </div>
            </div>

            <div
              className={`rounded-xl border p-5 ${
                result.savings >= 0
                  ? "border-emerald-500/40 bg-emerald-500/10"
                  : "border-amber-500/40 bg-amber-500/10"
              }`}
              data-testid="card-calc-result"
            >
              <div className="flex items-start gap-3">
                <div className={`w-9 h-9 rounded-lg flex items-center justify-center ${result.savings >= 0 ? "bg-emerald-500/20 text-emerald-300" : "bg-amber-500/20 text-amber-300"}`}>
                  {result.savings >= 0 ? <PiggyBank className="w-5 h-5" /> : <Wallet className="w-5 h-5" />}
                </div>
                <div>
                  <div className={`text-sm font-bold ${result.savings >= 0 ? "text-emerald-200" : "text-amber-200"}`}>
                    {result.savings >= 0
                      ? `Owning saves you ${fmtAED(Math.abs(result.savings))} over ${horizon} years`
                      : `Renting is ${fmtAED(Math.abs(result.savings))} cheaper over ${horizon} years`}
                  </div>
                  <div className="text-xs text-slate-300 mt-1">
                    Based on equity build-up and current Dubai rental escalation. Get a personalised report from a DeliWer advisor.
                  </div>
                </div>
              </div>
            </div>

            <Button
              className="w-full h-12 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black"
              onClick={() => {
                const msg = encodeURIComponent(
                  `Hi DeliWer — I just used the Rent vs Own calculator.\n\nProperty: AED ${price.toLocaleString()}\nDown: ${downPct}%\nRate: ${rate}%\nTerm: ${years} yrs\nHorizon: ${horizon} yrs\n\nPlease send me a personalised eligibility report.`
                );
                window.open(`https://wa.me/${WA_NUMBER}?text=${msg}`, "_blank");
              }}
              data-testid="button-calc-report"
            >
              <MessageCircle className="w-4 h-4 mr-2" />
              Get my personalised report
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

const RESIDENCY_OPTIONS = [
  "UAE Resident",
  "GCC National",
  "Non-Resident Expat",
  "UAE National",
];

const PROPERTY_TYPES = [
  "Apartment (Ready)",
  "Apartment (Off-plan)",
  "Townhouse / Villa",
  "Investment unit",
  "Not sure yet",
];

const BUDGETS = [
  "Under AED 750K",
  "AED 750K – 1.5M",
  "AED 1.5M – 3M",
  "AED 3M – 6M",
  "AED 6M+",
];

function EligibilityForm() {
  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
    residency: "",
    propertyType: "",
    budget: "",
    notes: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const valid = form.name && form.phone && form.residency && form.budget;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!valid) return;
    const lines = [
      "Hi DeliWer — Home Financing Eligibility Request",
      "",
      `Name: ${form.name}`,
      `WhatsApp: ${form.phone}`,
      form.email ? `Email: ${form.email}` : "",
      `Residency status: ${form.residency}`,
      form.propertyType ? `Property type: ${form.propertyType}` : "",
      `Budget: ${form.budget}`,
      form.notes ? `Notes: ${form.notes}` : "",
      "",
      "Please share my mortgage options and developer payment plans.",
    ].filter(Boolean);
    const msg = encodeURIComponent(lines.join("\n"));
    window.open(`https://wa.me/${WA_NUMBER}?text=${msg}`, "_blank");
    setSubmitted(true);
  };

  return (
    <section
      id="eligibility"
      data-testid="section-eligibility-form"
      className="relative scroll-mt-24"
    >
      <div className="absolute inset-0 bg-gradient-to-b from-emerald-950/20 via-slate-950 to-slate-950 pointer-events-none" />
      <div className="relative max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-20">
        <div className="text-center mb-8">
          <Badge className="bg-emerald-500/15 text-emerald-300 border-emerald-500/30 mb-3">
            <BadgeCheck className="w-3.5 h-3.5 mr-1.5" /> Free · 60-second form
          </Badge>
          <h2
            className="text-3xl sm:text-4xl font-bold mb-3"
            data-testid="heading-eligibility-form"
          >
            Check your home financing eligibility
          </h2>
          <p className="text-slate-300 text-base sm:text-lg max-w-xl mx-auto">
            Tell us a few basics. We&apos;ll match you to the right bank, payment plan and concierge package — and reply on WhatsApp within minutes.
          </p>
        </div>

        <Card className="bg-slate-900/80 border-emerald-500/30 backdrop-blur">
          <CardContent className="p-6 sm:p-8">
            {submitted ? (
              <div
                className="text-center py-10 space-y-4"
                data-testid="state-form-submitted"
              >
                <div className="w-16 h-16 mx-auto rounded-full bg-emerald-500/20 border-2 border-emerald-500/50 flex items-center justify-center">
                  <CheckCircle2 className="w-8 h-8 text-emerald-400" />
                </div>
                <h3 className="text-2xl font-bold text-white">
                  Request sent on WhatsApp
                </h3>
                <p className="text-slate-300 max-w-md mx-auto">
                  A finance advisor will reply within{" "}
                  <strong className="text-white">10 minutes</strong> during business hours with your eligibility snapshot.
                </p>
                <Button
                  variant="outline"
                  onClick={() => setSubmitted(false)}
                  className="border-slate-600 text-slate-300"
                  data-testid="button-form-restart"
                >
                  Submit another request
                </Button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <Label className="text-xs font-bold uppercase tracking-widest text-slate-400">Full name *</Label>
                    <Input
                      data-testid="input-eligibility-name"
                      required
                      value={form.name}
                      onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
                      placeholder="e.g. Ahmed Hassan"
                      className="bg-slate-950 border-slate-700 text-white placeholder:text-slate-600 h-11"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <Label className="text-xs font-bold uppercase tracking-widest text-slate-400">WhatsApp *</Label>
                    <Input
                      data-testid="input-eligibility-phone"
                      required
                      type="tel"
                      value={form.phone}
                      onChange={(e) => setForm((f) => ({ ...f, phone: e.target.value }))}
                      placeholder="+971 50 000 0000"
                      className="bg-slate-950 border-slate-700 text-white placeholder:text-slate-600 h-11"
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <Label className="text-xs font-bold uppercase tracking-widest text-slate-400">Email</Label>
                  <Input
                    data-testid="input-eligibility-email"
                    type="email"
                    value={form.email}
                    onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
                    placeholder="you@email.com"
                    className="bg-slate-950 border-slate-700 text-white placeholder:text-slate-600 h-11"
                  />
                </div>

                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <Label className="text-xs font-bold uppercase tracking-widest text-slate-400">Residency *</Label>
                    <Select
                      value={form.residency}
                      onValueChange={(v) => setForm((f) => ({ ...f, residency: v }))}
                    >
                      <SelectTrigger
                        data-testid="select-eligibility-residency"
                        className="bg-slate-950 border-slate-700 text-white h-11"
                      >
                        <SelectValue placeholder="Select status" />
                      </SelectTrigger>
                      <SelectContent className="bg-slate-900 border-slate-700 text-white">
                        {RESIDENCY_OPTIONS.map((p) => (
                          <SelectItem key={p} value={p} className="focus:bg-slate-800">{p}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-1.5">
                    <Label className="text-xs font-bold uppercase tracking-widest text-slate-400">Property type</Label>
                    <Select
                      value={form.propertyType}
                      onValueChange={(v) => setForm((f) => ({ ...f, propertyType: v }))}
                    >
                      <SelectTrigger
                        data-testid="select-eligibility-property"
                        className="bg-slate-950 border-slate-700 text-white h-11"
                      >
                        <SelectValue placeholder="Optional" />
                      </SelectTrigger>
                      <SelectContent className="bg-slate-900 border-slate-700 text-white">
                        {PROPERTY_TYPES.map((p) => (
                          <SelectItem key={p} value={p} className="focus:bg-slate-800">{p}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-1.5">
                  <Label className="text-xs font-bold uppercase tracking-widest text-slate-400">Budget *</Label>
                  <Select
                    value={form.budget}
                    onValueChange={(v) => setForm((f) => ({ ...f, budget: v }))}
                  >
                    <SelectTrigger
                      data-testid="select-eligibility-budget"
                      className="bg-slate-950 border-slate-700 text-white h-11"
                    >
                      <SelectValue placeholder="Select budget range" />
                    </SelectTrigger>
                    <SelectContent className="bg-slate-900 border-slate-700 text-white">
                      {BUDGETS.map((b) => (
                        <SelectItem key={b} value={b} className="focus:bg-slate-800">{b}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-1.5">
                  <Label className="text-xs font-bold uppercase tracking-widest text-slate-400">Anything we should know? (optional)</Label>
                  <textarea
                    data-testid="input-eligibility-notes"
                    rows={3}
                    value={form.notes}
                    onChange={(e) => setForm((f) => ({ ...f, notes: e.target.value }))}
                    placeholder="Income, area preference, timeline, first-time buyer..."
                    className="w-full bg-slate-950 border border-slate-700 text-white placeholder:text-slate-600 rounded-md px-3 py-2 text-sm focus:outline-none focus:border-emerald-500/60"
                  />
                </div>

                <Button
                  type="submit"
                  disabled={!valid}
                  size="lg"
                  className="w-full h-12 bg-emerald-500 hover:bg-emerald-400 disabled:opacity-50 text-slate-950 font-black"
                  data-testid="button-submit-eligibility"
                >
                  <MessageCircle className="w-4 h-4 mr-2" />
                  Check eligibility on WhatsApp
                </Button>

                <p className="text-[11px] text-slate-500 text-center">
                  No credit pull. We share your details only with banks you approve.
                </p>
              </form>
            )}
          </CardContent>
        </Card>
      </div>
    </section>
  );
}

export default function RealEstate() {
  const [showFullDisclosure, setShowFullDisclosure] = useState(false);
  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <Helmet>
        <title>Home Financing & Move-In Concierge in Dubai | DeliWer</title>
        <meta
          name="description"
          content="Compare mortgages, discover flexible developer payment plans from Emaar, DAMAC, Sobha and Samana, get pre-approval and move into your Dubai home with DeliWer concierge services."
        />
        <meta
          name="keywords"
          content="Dubai home financing, Dubai mortgage, developer payment plan Dubai, Emaar payment plan, DAMAC payment plan, Sobha payment plan, Samana payment plan, move-in concierge Dubai, rent vs buy Dubai"
        />
        <meta property="og:title" content="Own Your Home in Dubai — Without the Guesswork | DeliWer" />
        <meta
          property="og:description"
          content="Compare mortgages, explore developer payment plans and let DeliWer handle Ejari, DEWA, internet and move-in — all in one place."
        />
      </Helmet>

      {/* HERO */}
      <section className="relative overflow-hidden border-b border-emerald-500/20">
        <img
          src={dubaiSkyline}
          alt="Dubai skyline at sunset"
          className="absolute inset-0 w-full h-full object-cover opacity-40"
          data-testid="img-hero-bg"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-slate-950/90 via-slate-950/75 to-emerald-950/60" />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-slate-950/50" />
        <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-28 text-center">
          <div className="flex flex-wrap items-center justify-center gap-2 mb-5">
            <Badge
              className="bg-emerald-500/15 text-emerald-300 border-emerald-500/30"
              data-testid="badge-hero"
            >
              <Home className="w-3.5 h-3.5 mr-1.5" /> Dubai Home Ownership · Concierge
            </Badge>
            <Link href="/" data-testid="link-hero-home">
              <span className="inline-flex items-center gap-1 text-[10px] font-black uppercase tracking-widest text-slate-300 hover:text-emerald-300 border border-slate-700 hover:border-emerald-500/40 rounded-full px-3 py-1 transition-all cursor-pointer">
                ← Just need move-in? <span className="text-emerald-300">DeliWer Home</span>
              </span>
            </Link>
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight mb-5">
            Own Your Home in Dubai —{" "}
            <span className="bg-gradient-to-r from-emerald-300 via-cyan-300 to-emerald-400 bg-clip-text text-transparent">
              Without the Guesswork
            </span>
          </h1>
          <p className="text-lg sm:text-xl text-slate-300 mb-7 leading-relaxed max-w-3xl mx-auto">
            Compare mortgages, discover flexible developer payment plans, get financing approvals and move into your home with DeliWer concierge services.
          </p>

          <div className="flex flex-wrap justify-center gap-3 mb-10">
            <Button
              size="lg"
              className="h-12 px-6 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black"
              onClick={() => scrollTo("eligibility")}
              data-testid="button-hero-eligibility"
            >
              <BadgeCheck className="w-4 h-4 mr-2" /> Check Eligibility
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="h-12 px-6 border-cyan-400/40 text-cyan-200 hover:bg-cyan-500/10 hover:text-white"
              onClick={() => scrollTo("payment-plans")}
              data-testid="button-hero-plans"
            >
              <Building2 className="w-4 h-4 mr-2" /> Explore Payment Plans
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="h-12 px-6 border-slate-600 text-slate-200 hover:bg-slate-800 hover:text-white"
              onClick={() => window.open(`https://wa.me/${WA_NUMBER}?text=${encodeURIComponent("Hi DeliWer — I'd like to speak to a finance advisor about buying a home in Dubai.")}`, "_blank")}
              data-testid="button-hero-advisor"
            >
              <Phone className="w-4 h-4 mr-2" /> Speak to Finance Advisor
            </Button>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 max-w-3xl mx-auto">
            {[
              { k: "8+", v: "Partner banks" },
              { k: "30+", v: "Developer plans" },
              { k: "48h", v: "Pre-approval" },
              { k: "1", v: "WhatsApp to start" },
            ].map((x) => (
              <div
                key={x.v}
                className="rounded-xl border border-slate-800 bg-slate-900/60 backdrop-blur px-3 py-3"
                data-testid={`stat-${x.v.toLowerCase().replace(/\s+/g, "-")}`}
              >
                <div className="text-2xl sm:text-3xl font-black text-emerald-300">{x.k}</div>
                <div className="text-[11px] uppercase tracking-widest text-slate-400 mt-0.5">{x.v}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 1: MORTGAGE FINANCING */}
      <section id="financing" className="relative scroll-mt-24 border-b border-slate-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-20">
          <div className="grid lg:grid-cols-12 gap-10 items-start">
            <div className="lg:col-span-5">
              <Badge className="bg-cyan-500/15 text-cyan-300 border-cyan-500/30 mb-3">
                <Landmark className="w-3.5 h-3.5 mr-1.5" /> Step 1 · Mortgage Financing
              </Badge>
              <h2 className="text-3xl sm:text-4xl font-bold mb-4" data-testid="heading-financing">
                Pre-approval from Dubai&apos;s top banks — without queuing
              </h2>
              <p className="text-slate-300 leading-relaxed mb-6">
                We work with leading UAE banks and licensed mortgage brokers to give you side-by-side comparisons,
                affordability checks and warm introductions. First-time buyer? You get a dedicated advisor who
                walks you through DLD, valuation and trustee fees.
              </p>
              <ul className="space-y-3 mb-7">
                {[
                  { i: ShieldCheck, t: "Pre-approval support",  d: "Indicative offer in 48 hours from up to 3 banks." },
                  { i: Percent,    t: "Mortgage comparisons",   d: "Fixed, variable, Islamic — compare APR, tenure & flexibility." },
                  { i: Calculator, t: "Affordability tools",     d: "DBR-aware calculators that respect UAE Central Bank caps." },
                  { i: Sparkles,   t: "First-time buyer guidance", d: "End-to-end help with NOC, DLD 4%, broker fees & valuation." },
                ].map(({ i: Icon, t, d }) => (
                  <li key={t} className="flex gap-3" data-testid={`item-financing-${t.toLowerCase().replace(/\s+/g, "-")}`}>
                    <div className="w-9 h-9 rounded-lg bg-cyan-500/15 border border-cyan-500/30 text-cyan-300 flex items-center justify-center shrink-0">
                      <Icon className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="font-bold text-white">{t}</div>
                      <div className="text-sm text-slate-400">{d}</div>
                    </div>
                  </li>
                ))}
              </ul>
              <Button
                size="lg"
                className="h-12 bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-black"
                onClick={() => scrollTo("eligibility")}
                data-testid="button-financing-cta"
              >
                Get pre-approved <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </div>

            <div className="lg:col-span-7">
              <div className="rounded-2xl border border-slate-800 bg-gradient-to-br from-slate-900 to-slate-950 p-6 sm:p-7">
                <div className="flex items-center justify-between mb-5">
                  <div className="text-xs font-bold uppercase tracking-widest text-slate-500">Partner banks &amp; mortgage desks</div>
                  <Badge className="bg-emerald-500/10 text-emerald-300 border-emerald-500/30">No hidden fees</Badge>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  {FINANCE_PARTNERS.map((b) => (
                    <div
                      key={b.name}
                      className="group rounded-xl border border-slate-800 bg-slate-950/80 hover:border-slate-700 transition p-3 flex flex-col items-center justify-between text-center min-h-[112px]"
                      data-testid={`bank-${b.name.toLowerCase()}`}
                      title={b.full}
                    >
                      {b.logo ? (
                        <div className="w-full h-12 rounded-md bg-white flex items-center justify-center px-2.5 mb-2 ring-1 ring-slate-200/10">
                          <img
                            src={b.logo}
                            alt={`${b.full} logo`}
                            className="max-h-9 max-w-full object-contain"
                            loading="lazy"
                          />
                        </div>
                      ) : (
                        <div
                          className="w-full h-12 rounded-md flex items-center justify-center font-black text-base tracking-tight mb-2"
                          style={{ backgroundColor: b.bg, color: b.fg }}
                        >
                          {b.name}
                        </div>
                      )}
                      <div>
                        <div className="text-[11px] font-bold text-slate-200 leading-tight">{b.full}</div>
                        <div className="text-[10px] text-slate-500 leading-tight mt-0.5">{b.tag}</div>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-6 grid grid-cols-3 gap-3">
                  {[
                    { k: "Up to 80%", v: "LTV for residents" },
                    { k: "From 3.99%", v: "Indicative rate" },
                    { k: "25 yrs", v: "Max tenure" },
                  ].map((x) => (
                    <div key={x.v} className="rounded-xl border border-slate-800 bg-slate-950/60 p-3 text-center">
                      <div className="text-lg font-black text-white">{x.k}</div>
                      <div className="text-[10px] uppercase tracking-widest text-slate-500 mt-0.5">{x.v}</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Structured disclaimer block */}
              <div
                className="mt-4 rounded-xl border border-slate-800 bg-slate-950/60 p-4 sm:p-5"
                data-testid="block-finance-disclaimer"
              >
                <div className="flex items-start gap-3">
                  <div className="w-9 h-9 shrink-0 rounded-lg bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 flex items-center justify-center">
                    <ShieldCheck className="w-4 h-4" />
                  </div>
                  <div className="flex-1">
                    <div className="text-[11px] font-bold uppercase tracking-widest text-cyan-300 mb-2">
                      How DeliWer earns &amp; what to know
                    </div>
                    <ul className="grid sm:grid-cols-2 gap-x-4 gap-y-1.5 text-xs text-slate-400">
                      <li className="flex gap-1.5"><span className="text-emerald-400">•</span><span><span className="text-slate-200 font-semibold">Zero buyer fees.</span> Banks &amp; brokers pay our referral fee, not you.</span></li>
                      <li className="flex gap-1.5"><span className="text-emerald-400">•</span><span><span className="text-slate-200 font-semibold">Bank-neutral.</span> We compare lenders — you choose &amp; sign directly.</span></li>
                      <li className="flex gap-1.5"><span className="text-emerald-400">•</span><span><span className="text-slate-200 font-semibold">Indicative figures.</span> Final rate, LTV &amp; tenure set by the lender.</span></li>
                      <li className="flex gap-1.5"><span className="text-emerald-400">•</span><span><span className="text-slate-200 font-semibold">UAE-regulated.</span> All terms follow UAE Central Bank &amp; DLD rules.</span></li>
                    </ul>
                    <div className="text-[10px] text-slate-600 mt-3">
                      Bank logos are property of their respective owners and shown for identification only. DeliWer is a referral concierge, not a licensed mortgage broker; all loan agreements are issued and signed directly with the lending bank.
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 2: DEVELOPER PAYMENT PLANS */}
      <section id="payment-plans" className="relative scroll-mt-24 border-b border-slate-900">
        <img
          src={damacSkyline}
          alt="Dubai developer skyline"
          className="absolute inset-0 w-full h-full object-cover opacity-10"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-slate-950 via-slate-950/95 to-slate-950" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-20">
          <div className="text-center max-w-3xl mx-auto mb-10">
            <Badge className="bg-amber-500/15 text-amber-300 border-amber-500/30 mb-3">
              <Building2 className="w-3.5 h-3.5 mr-1.5" /> Step 2 · Developer Payment Plans
            </Badge>
            <h2 className="text-3xl sm:text-4xl font-bold mb-3" data-testid="heading-payment-plans">
              Flexible plans from Dubai&apos;s leading developers
            </h2>
            <p className="text-slate-300">
              Skip the mortgage and pay directly to the developer. Low down payments, post-handover instalments, guaranteed-rental and investor offers — curated weekly.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {DEVELOPER_PLANS.map((d) => (
              <Card
                key={d.name}
                className="bg-slate-900/70 border-slate-800 hover:border-slate-700 transition overflow-hidden"
                data-testid={`card-developer-${d.name.toLowerCase().replace(/\s+/g, "-")}`}
              >
                <div className={`h-1.5 bg-gradient-to-r ${d.accent}`} />
                <CardContent className="p-5">
                  <div className="text-xs font-bold uppercase tracking-widest text-slate-500">{d.tag}</div>
                  <div className="text-xl font-black text-white mt-1 mb-3">{d.name}</div>

                  <div className="rounded-lg border border-slate-800 bg-slate-950/60 px-3 py-2 mb-3">
                    <div className="text-[10px] uppercase tracking-widest text-slate-500">Signature plan</div>
                    <div className="text-sm font-bold text-emerald-300">{d.plan}</div>
                  </div>

                  <ul className="space-y-2 text-sm text-slate-300 mb-4">
                    <li className="flex gap-2"><KeyRound className="w-4 h-4 text-cyan-300 shrink-0 mt-0.5" /><span>{d.handover}</span></li>
                    <li className="flex gap-2"><Sparkles className="w-4 h-4 text-amber-300 shrink-0 mt-0.5" /><span>{d.highlight}</span></li>
                    <li className="flex gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" /><span>{d.perk}</span></li>
                  </ul>

                  <button
                    onClick={() => window.open(`https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(`Hi DeliWer — please send me current ${d.name} payment plans and available units.`)}`, "_blank")}
                    className="w-full text-left text-sm font-bold text-emerald-300 hover:text-emerald-200 inline-flex items-center justify-between border-t border-slate-800 pt-3"
                    data-testid={`button-developer-${d.name.toLowerCase().replace(/\s+/g, "-")}`}
                  >
                    See current units <ChevronRight className="w-4 h-4" />
                  </button>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="mt-8 flex flex-wrap justify-center gap-3 text-[11px] uppercase tracking-widest text-slate-500">
            <span>Also available:</span>
            {["Nakheel", "Meraas", "Aldar", "Azizi", "Ellington", "Binghatti", "Danube"].map((d) => (
              <span key={d} className="text-slate-300">{d}</span>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 3: RENT vs OWN CALCULATOR */}
      <section id="calculator" className="relative scroll-mt-24 border-b border-slate-900">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-20">
          <div className="text-center max-w-3xl mx-auto mb-8">
            <Badge className="bg-fuchsia-500/15 text-fuchsia-300 border-fuchsia-500/30 mb-3">
              <Calculator className="w-3.5 h-3.5 mr-1.5" /> Step 3 · Rent vs Own Calculator
            </Badge>
            <h2 className="text-3xl sm:text-4xl font-bold mb-3" data-testid="heading-calculator">
              Should you keep paying rent — or buy?
            </h2>
            <p className="text-slate-300">
              Plug in your numbers. We&apos;ll show you the real cost of ownership versus renting over your chosen horizon, including service charges, mortgage interest and rental escalation.
            </p>
          </div>

          <RentVsOwnCalculator />
        </div>
      </section>

      {/* SECTION 4: MOVE-IN CONCIERGE — slim teaser, full flow lives on home root */}
      <section id="concierge" className="relative scroll-mt-24 border-b border-slate-900">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
          <div className="rounded-2xl border border-emerald-500/30 bg-gradient-to-br from-slate-900 via-slate-900 to-emerald-950/30 overflow-hidden">
            <div className="grid md:grid-cols-5 items-stretch">
              <div className="md:col-span-2 relative min-h-[200px]">
                <img src={keysHandover} alt="Keys handover" className="absolute inset-0 w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-r from-slate-950/40 via-slate-950/10 to-slate-900" />
              </div>
              <div className="md:col-span-3 p-6 sm:p-8 flex flex-col justify-center">
                <Badge className="bg-emerald-500/15 text-emerald-300 border-emerald-500/30 self-start mb-3">
                  <Truck className="w-3.5 h-3.5 mr-1.5" /> Step 4 · Move-In Concierge
                </Badge>
                <h2 className="text-2xl sm:text-3xl font-bold text-white mb-2" data-testid="heading-concierge">
                  From keys to kettle in 24 hours
                </h2>
                <p className="text-sm text-slate-300 mb-5">
                  Once your offer is accepted, DeliWer handles Ejari, DEWA, internet, movers and deep-clean — vetted vendors, flat-rate, one WhatsApp thread.
                </p>
                <div className="flex flex-wrap gap-2">
                  <Link href="/" data-testid="link-concierge-home">
                    <Button className="h-11 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black">
                      <Home className="w-4 h-4 mr-2" /> See full move-in flow
                    </Button>
                  </Link>
                  <Button
                    variant="outline"
                    className="h-11 border-slate-700 text-slate-200 hover:bg-slate-800 hover:text-white"
                    onClick={() => window.open(`https://wa.me/${WA_NUMBER}?text=${encodeURIComponent("Hi DeliWer — I just bought a home in Dubai and need full move-in concierge (Ejari, DEWA, movers, internet).")}`, "_blank")}
                    data-testid="button-concierge-whatsapp"
                  >
                    <MessageCircle className="w-4 h-4 mr-2" /> Start on WhatsApp
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 5: INVESTMENT OPPORTUNITIES */}
      <section id="invest" className="relative scroll-mt-24 border-b border-slate-900">
        <img
          src={dubaiVilla}
          alt="Dubai luxury villa"
          className="absolute inset-0 w-full h-full object-cover opacity-15"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-slate-950 via-slate-950/90 to-slate-950" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-20">
          <div className="text-center max-w-3xl mx-auto mb-10">
            <Badge className="bg-amber-500/15 text-amber-300 border-amber-500/30 mb-3">
              <TrendingUp className="w-3.5 h-3.5 mr-1.5" /> Step 5 · Investment Opportunities
            </Badge>
            <h2 className="text-3xl sm:text-4xl font-bold mb-3" data-testid="heading-invest">
              Buy smart. Earn yield. Earn residency.
            </h2>
            <p className="text-slate-300">
              Beyond your primary home, DeliWer surfaces curated opportunities for investors — distress deals, cash-flow payment plans and Golden Visa-eligible properties.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-5">
            {INVESTMENT_OPPS.map(({ icon: Icon, title, desc, badge, accent }) => (
              <Card
                key={title}
                className="bg-slate-900/70 border-slate-800 hover:border-slate-700 transition"
                data-testid={`card-invest-${title.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`}
              >
                <CardContent className="p-6">
                  <div className={`inline-flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-widest border rounded-full px-2.5 py-1 ${accent}`}>
                    <Icon className="w-3.5 h-3.5" /> {badge}
                  </div>
                  <div className="text-xl font-bold text-white mt-3 mb-2">{title}</div>
                  <div className="text-sm text-slate-400">{desc}</div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="mt-8 text-center">
            <Button
              size="lg"
              className="h-12 px-6 bg-amber-500 hover:bg-amber-400 text-slate-950 font-black"
              onClick={() => window.open(`https://wa.me/${WA_NUMBER}?text=${encodeURIComponent("Hi DeliWer — share this week's investor opportunities (distress deals, cash-flow plans, Golden Visa eligible).")}`, "_blank")}
              data-testid="button-invest-cta"
            >
              Get this week&apos;s investor list <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </div>
        </div>
      </section>

      {/* BROKERS & PARTNERS CAREER PATH */}
      <section id="partners" className="relative scroll-mt-24 border-b border-slate-900">
        <div className="absolute inset-0 bg-gradient-to-b from-slate-950 via-emerald-950/10 to-slate-950 pointer-events-none" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-20">
          <div className="text-center max-w-3xl mx-auto mb-10">
            <Badge className="bg-cyan-500/15 text-cyan-300 border-cyan-500/30 mb-3">
              <Briefcase className="w-3.5 h-3.5 mr-1.5" /> Brokers · Mortgage Advisors · Developer Reps
            </Badge>
            <h2 className="text-3xl sm:text-4xl font-bold mb-3" data-testid="heading-partners">
              Build a recurring income with DeliWer Finance
            </h2>
            <p className="text-slate-300">
              We&apos;re building Dubai&apos;s home-ownership concierge — and we pay generously to the people who bring buyers, sellers and tenants into the funnel. WhatsApp-first onboarding, no portals to log into, payouts in AED.
            </p>
          </div>

          {/* Career path tracks */}
          <div className="grid md:grid-cols-3 gap-5">
            {[
              {
                icon: Handshake,
                tier: "Track 1 · Independent Broker",
                tagline: "RERA cardholders & freelance agents",
                payout: "Up to 50%",
                payoutLabel: "commission share",
                accent: "from-emerald-500 to-teal-600",
                badgeClass: "bg-emerald-500/10 text-emerald-300 border-emerald-500/30",
                bullets: [
                  "Refer buyers, tenants or sellers via WhatsApp",
                  "We close finance + concierge — you keep your client",
                  "50/50 commission split on every closure",
                  "Recurring override on AquaCafe + move-in services",
                ],
                cta: "Apply as Independent Broker",
                msg: "Hi DeliWer Finance — I'm an independent / RERA broker applying to the Independent Broker track. Please share onboarding & commission terms.",
              },
              {
                icon: Users,
                tier: "Track 2 · Mortgage Advisor",
                tagline: "Bank relationship managers & freelancers",
                payout: "Per-deal",
                payoutLabel: "AED 2,000 – 8,000",
                accent: "from-cyan-500 to-blue-600",
                badgeClass: "bg-cyan-500/10 text-cyan-300 border-cyan-500/30",
                bullets: [
                  "Place pre-approved buyers with our developers",
                  "We send you warm leads weekly via WhatsApp",
                  "Fixed bounty per disbursed mortgage",
                  "Bonus tier for first-time buyer conversions",
                ],
                cta: "Apply as Mortgage Advisor",
                msg: "Hi DeliWer Finance — I'm a mortgage advisor applying to the Mortgage Advisor track. Please share lead-flow & bounty terms.",
              },
              {
                icon: Trophy,
                tier: "Track 3 · Developer Rep",
                tagline: "Inventory managers at developers",
                payout: "Inventory",
                payoutLabel: "distribution partner",
                accent: "from-amber-500 to-orange-600",
                badgeClass: "bg-amber-500/10 text-amber-300 border-amber-500/30",
                bullets: [
                  "Push payment-plan inventory through our funnel",
                  "Co-branded WhatsApp drops to 8K+ buyers",
                  "Priority placement on /finance#payment-plans",
                  "Monthly demand & yield intelligence dossier",
                ],
                cta: "Apply as Developer Partner",
                msg: "Hi DeliWer Finance — I represent a developer and want to distribute inventory through your platform. Please share partner terms.",
              },
            ].map(({ icon: Icon, tier, tagline, payout, payoutLabel, accent, badgeClass, bullets, cta, msg }) => (
              <Card
                key={tier}
                className="bg-slate-900/70 border-slate-800 hover:border-slate-700 transition overflow-hidden flex flex-col"
                data-testid={`card-track-${tier.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`}
              >
                <div className={`h-1.5 bg-gradient-to-r ${accent}`} />
                <CardContent className="p-6 flex flex-col flex-1">
                  <div className="flex items-start justify-between gap-3 mb-3">
                    <div className="w-10 h-10 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-center">
                      <Icon className="w-5 h-5 text-emerald-300" />
                    </div>
                    <div className={`text-right border rounded-lg px-2.5 py-1 ${badgeClass}`}>
                      <div className="text-base font-black leading-none">{payout}</div>
                      <div className="text-[9px] uppercase tracking-widest opacity-80 mt-0.5">{payoutLabel}</div>
                    </div>
                  </div>
                  <div className="text-[11px] uppercase tracking-widest text-slate-500">{tier}</div>
                  <div className="text-lg font-bold text-white mt-0.5 mb-3">{tagline}</div>

                  <ul className="space-y-2 mb-5 text-sm text-slate-300 flex-1">
                    {bullets.map((b) => (
                      <li key={b} className="flex gap-2">
                        <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                        <span>{b}</span>
                      </li>
                    ))}
                  </ul>

                  <Button
                    onClick={() => window.open(`https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(msg)}`, "_blank")}
                    className="w-full h-11 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black"
                    data-testid={`button-apply-${tier.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`}
                  >
                    <MessageCircle className="w-4 h-4 mr-2" />
                    {cta}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Onboarding journey */}
          <div className="mt-12">
            <div className="text-center mb-8">
              <Badge className="bg-fuchsia-500/15 text-fuchsia-300 border-fuchsia-500/30 mb-3">
                <Rocket className="w-3.5 h-3.5 mr-1.5" /> Onboarding · 3 Steps · WhatsApp-first
              </Badge>
              <h3 className="text-2xl sm:text-3xl font-bold" data-testid="heading-onboarding">
                Live and earning in 48 hours
              </h3>
            </div>

            <div className="grid md:grid-cols-4 gap-4">
              {[
                { n: "01", icon: MessageCircle, t: "Apply on WhatsApp", d: "Pick your track. Send your name, RERA / company and city. No portal sign-up." },
                { n: "02", icon: GraduationCap, t: "Quick onboarding call", d: "15-minute briefing on commission, NCA / NDA, lead-routing rules." },
                { n: "03", icon: Sparkles,      t: "Get your first leads", d: "We push qualified buyer / tenant intent into your WhatsApp the same week." },
                { n: "04", icon: Wallet,        t: "Get paid in AED",     d: "Payouts on closure or disbursement — bank transfer or wallet, your choice." },
              ].map(({ n, icon: Icon, t, d }) => (
                <div
                  key={n}
                  className="rounded-xl border border-slate-800 bg-slate-900/60 p-5 hover:border-slate-700 transition"
                  data-testid={`step-onboarding-${n}`}
                >
                  <div className="flex items-center justify-between mb-3">
                    <div className="text-2xl font-black text-slate-700">{n}</div>
                    <div className="w-9 h-9 rounded-lg bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 flex items-center justify-center">
                      <Icon className="w-4 h-4" />
                    </div>
                  </div>
                  <div className="font-bold text-white">{t}</div>
                  <div className="text-sm text-slate-400 mt-1">{d}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Bottom partner CTA bar */}
          <div className="mt-10 rounded-2xl border border-emerald-500/30 bg-gradient-to-r from-emerald-500/10 via-cyan-500/5 to-emerald-500/10 p-6 sm:p-7">
            <div className="grid md:grid-cols-3 gap-5 items-center">
              <div className="md:col-span-2">
                <div className="text-xs font-bold uppercase tracking-widest text-emerald-300 mb-1">
                  Not sure which track fits?
                </div>
                <div className="text-xl sm:text-2xl font-bold text-white">
                  Talk to our partner desk on WhatsApp — we&apos;ll route you in 10 minutes.
                </div>
              </div>
              <div className="flex flex-wrap md:justify-end gap-2">
                <Button
                  className="h-11 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black"
                  onClick={() => window.open(`https://wa.me/${WA_NUMBER}?text=${encodeURIComponent("Hi DeliWer Finance — I'd like to join the partner network. Please help me pick the right track.")}`, "_blank")}
                  data-testid="button-partner-desk"
                >
                  <MessageCircle className="w-4 h-4 mr-2" /> Chat with Partner Desk
                </Button>
                <Button
                  variant="outline"
                  className="h-11 border-slate-700 text-slate-200 hover:bg-slate-800 hover:text-white"
                  onClick={() => window.open(`https://wa.me/${WA_NUMBER}?text=${encodeURIComponent("Hi DeliWer Finance — please send me the partner deck (commission tiers + onboarding).")}`, "_blank")}
                  data-testid="button-partner-deck"
                >
                  Get partner deck
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ELIGIBILITY FORM */}
      <EligibilityForm />

      {/* REGULATORY DISCLOSURE & LIABILITY PROTECTION */}
      <section id="disclosure" className="relative scroll-mt-24 border-b border-slate-900 bg-slate-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
          <div className="text-center max-w-3xl mx-auto mb-8">
            <Badge className="bg-slate-700/40 text-slate-200 border-slate-600 mb-3">
              <ShieldCheck className="w-3.5 h-3.5 mr-1.5" /> Regulatory Disclosure &amp; Disclaimer
            </Badge>
            <h2 className="text-2xl sm:text-3xl font-bold text-white mb-2" data-testid="heading-disclosure">
              Important information about DeliWer Finance
            </h2>
            <p className="text-sm text-slate-400">
              Read this notice carefully before using any service on this page. By engaging with DeliWer Finance via WhatsApp or web you confirm you have understood and accepted the terms below.
            </p>
          </div>

          {/* Top regulatory pills */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3 mb-8">
            {[
              { i: Landmark,    t: "Concierge, not a lender",   d: "Loans are issued solely by licensed UAE banks." },
              { i: ShieldCheck, t: "UAE Central Bank rules",    d: "All mortgage products are bank-regulated." },
              { i: Building2,   t: "DLD &amp; RERA aware",      d: "Property transfers follow Dubai Land Department." },
              { i: FileText,    t: "No advice given",            d: "Information is general only — not financial advice." },
            ].map(({ i: Icon, t, d }) => (
              <div
                key={t}
                className="rounded-xl border border-slate-800 bg-slate-900/60 p-4"
                data-testid={`disclosure-pill-${t.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`}
              >
                <div className="w-9 h-9 rounded-lg bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 flex items-center justify-center mb-2">
                  <Icon className="w-4 h-4" />
                </div>
                <div className="font-bold text-white text-sm" dangerouslySetInnerHTML={{ __html: t }} />
                <div className="text-xs text-slate-400 mt-1" dangerouslySetInnerHTML={{ __html: d }} />
              </div>
            ))}
          </div>

          {/* Read full / collapse toggle */}
          <div className="flex justify-center mb-6">
            <button
              type="button"
              onClick={() => setShowFullDisclosure((v) => !v)}
              className="inline-flex items-center gap-2 text-xs font-black uppercase tracking-widest text-slate-300 hover:text-emerald-300 border border-slate-700 hover:border-emerald-500/40 rounded-full px-4 py-2 transition-all"
              data-testid="button-toggle-disclosure"
              aria-expanded={showFullDisclosure}
            >
              {showFullDisclosure ? "Hide full disclosure" : "Read full disclosure"}
              <ChevronRight className={`w-3.5 h-3.5 transition-transform ${showFullDisclosure ? "rotate-90" : ""}`} />
            </button>
          </div>

          {/* Detailed disclosure body — collapsed by default to reduce overload */}
          {showFullDisclosure && (
          <div className="grid lg:grid-cols-2 gap-5">
            <div
              className="rounded-2xl border border-slate-800 bg-slate-900/60 p-6"
              data-testid="block-disclosure-nature"
            >
              <div className="flex items-center gap-2 mb-3">
                <div className="w-8 h-8 rounded-lg bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 flex items-center justify-center">
                  <Landmark className="w-4 h-4" />
                </div>
                <div className="text-sm font-black uppercase tracking-widest text-emerald-300">
                  Nature of service
                </div>
              </div>
              <ul className="space-y-2 text-sm text-slate-300">
                <li className="flex gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" /><span>DeliWer Finance is a <span className="text-white font-semibold">referral &amp; concierge service</span>. We are not a bank, mortgage broker, real-estate broker, fund or licensed financial advisor.</span></li>
                <li className="flex gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" /><span>All <span className="text-white font-semibold">mortgage products</span> are issued, underwritten and serviced exclusively by UAE-licensed banks regulated by the <span className="text-white font-semibold">Central Bank of the UAE</span>.</span></li>
                <li className="flex gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" /><span>All <span className="text-white font-semibold">property transactions</span> are executed by RERA-registered brokers and the <span className="text-white font-semibold">Dubai Land Department (DLD)</span>. Title transfer, Oqood, NOC and Ejari are managed under DLD rules.</span></li>
                <li className="flex gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" /><span>Developer payment plans are direct contracts between the buyer and the developer. DeliWer is not a party to the sale.</span></li>
              </ul>
            </div>

            <div
              className="rounded-2xl border border-slate-800 bg-slate-900/60 p-6"
              data-testid="block-disclosure-no-advice"
            >
              <div className="flex items-center gap-2 mb-3">
                <div className="w-8 h-8 rounded-lg bg-amber-500/15 border border-amber-500/30 text-amber-300 flex items-center justify-center">
                  <FileText className="w-4 h-4" />
                </div>
                <div className="text-sm font-black uppercase tracking-widest text-amber-300">
                  No advice · Indicative figures
                </div>
              </div>
              <ul className="space-y-2 text-sm text-slate-300">
                <li className="flex gap-2"><CheckCircle2 className="w-4 h-4 text-amber-300 shrink-0 mt-0.5" /><span>Content on this page is <span className="text-white font-semibold">general information only</span> and does not constitute legal, tax, investment or financial advice. Consult a qualified professional before deciding.</span></li>
                <li className="flex gap-2"><CheckCircle2 className="w-4 h-4 text-amber-300 shrink-0 mt-0.5" /><span>Rates, LTV, tenure, fees and yields shown are <span className="text-white font-semibold">indicative</span>, may change without notice and are subject to lender / developer approval and prevailing market conditions.</span></li>
                <li className="flex gap-2"><CheckCircle2 className="w-4 h-4 text-amber-300 shrink-0 mt-0.5" /><span>Eligibility, final pricing and contractual terms are determined solely by the bank, developer or service provider — not DeliWer.</span></li>
                <li className="flex gap-2"><CheckCircle2 className="w-4 h-4 text-amber-300 shrink-0 mt-0.5" /><span>Past performance, rental yields and capital appreciation figures are not a guarantee of future results.</span></li>
              </ul>
            </div>

            <div
              className="rounded-2xl border border-slate-800 bg-slate-900/60 p-6"
              data-testid="block-disclosure-liability"
            >
              <div className="flex items-center gap-2 mb-3">
                <div className="w-8 h-8 rounded-lg bg-rose-500/15 border border-rose-500/30 text-rose-300 flex items-center justify-center">
                  <ShieldCheck className="w-4 h-4" />
                </div>
                <div className="text-sm font-black uppercase tracking-widest text-rose-300">
                  Liability protection &amp; non-encumbrance
                </div>
              </div>
              <ul className="space-y-2 text-sm text-slate-300">
                <li className="flex gap-2"><CheckCircle2 className="w-4 h-4 text-rose-300 shrink-0 mt-0.5" /><span>DeliWer accepts <span className="text-white font-semibold">no liability</span> for losses, damages, missed opportunities or any direct, indirect, incidental or consequential claim arising from reliance on the information shown here.</span></li>
                <li className="flex gap-2"><CheckCircle2 className="w-4 h-4 text-rose-300 shrink-0 mt-0.5" /><span>DeliWer holds <span className="text-white font-semibold">no charge, lien, mortgage, encumbrance or beneficial interest</span> over any property, deposit or loan facility introduced through this page.</span></li>
                <li className="flex gap-2"><CheckCircle2 className="w-4 h-4 text-rose-300 shrink-0 mt-0.5" /><span>All payments — down payments, fees, instalments, transfer charges — are made <span className="text-white font-semibold">directly to the bank, developer or DLD</span>. DeliWer never holds client funds in escrow.</span></li>
                <li className="flex gap-2"><CheckCircle2 className="w-4 h-4 text-rose-300 shrink-0 mt-0.5" /><span>DeliWer is compensated by referral fees from finance / property partners — disclosed on request — at <span className="text-white font-semibold">no extra cost</span> to the buyer.</span></li>
              </ul>
            </div>

            <div
              className="rounded-2xl border border-slate-800 bg-slate-900/60 p-6"
              data-testid="block-disclosure-data"
            >
              <div className="flex items-center gap-2 mb-3">
                <div className="w-8 h-8 rounded-lg bg-cyan-500/15 border border-cyan-500/30 text-cyan-300 flex items-center justify-center">
                  <MessageCircle className="w-4 h-4" />
                </div>
                <div className="text-sm font-black uppercase tracking-widest text-cyan-300">
                  WhatsApp · Data &amp; consent
                </div>
              </div>
              <ul className="space-y-2 text-sm text-slate-300">
                <li className="flex gap-2"><CheckCircle2 className="w-4 h-4 text-cyan-300 shrink-0 mt-0.5" /><span>By initiating a WhatsApp chat you consent to DeliWer contacting you on that number to coordinate your finance, property or move-in request.</span></li>
                <li className="flex gap-2"><CheckCircle2 className="w-4 h-4 text-cyan-300 shrink-0 mt-0.5" /><span>Personal data shared on WhatsApp is processed in line with the <span className="text-white font-semibold">UAE Personal Data Protection Law (PDPL)</span> and shared with relevant banks / developers only with your consent.</span></li>
                <li className="flex gap-2"><CheckCircle2 className="w-4 h-4 text-cyan-300 shrink-0 mt-0.5" /><span>You may withdraw consent and request deletion at any time by sending <span className="text-white font-semibold">"STOP"</span> or <span className="text-white font-semibold">"DELETE"</span> on the same WhatsApp thread.</span></li>
                <li className="flex gap-2"><CheckCircle2 className="w-4 h-4 text-cyan-300 shrink-0 mt-0.5" /><span>Bank, developer, regulator and city names &amp; logos used on this page belong to their respective owners and are shown for identification only.</span></li>
              </ul>
            </div>
          </div>
          )}

          {/* Footer fineprint */}
          <div className="mt-8 rounded-xl border border-slate-800 bg-slate-900/40 px-5 py-4 text-[11px] leading-relaxed text-slate-500">
            <span className="text-slate-300 font-bold">DeliWer Finance</span> is a trading division of DeliWer Concierge Services, Dubai. We operate as a digital concierge connecting buyers with UAE-licensed banks, RERA-registered brokers and approved property developers. Nothing on this page is an offer, solicitation or invitation to buy or sell any financial product or property, nor does it create a fiduciary, advisory or agency relationship between DeliWer and the user. Use of this site, the WhatsApp service and all referral introductions is governed by UAE law and the courts of Dubai. © {new Date().getFullYear()} DeliWer. All rights reserved.
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="relative">
        <img
          src={dubaiFamily}
          alt="Family at home in Dubai"
          className="absolute inset-0 w-full h-full object-cover opacity-25"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/85 to-emerald-950/40" />
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
          <h3 className="text-2xl sm:text-3xl font-bold mb-3" data-testid="heading-final-cta">
            From financing to first night in your new home — one team.
          </h3>
          <p className="text-slate-300 mb-6 max-w-2xl mx-auto">
            DeliWer is your Dubai home ownership gateway. Finance → property → move-in → recurring services. Start with a free WhatsApp consultation.
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <Button
              size="lg"
              className="h-12 px-6 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black"
              onClick={() => scrollTo("eligibility")}
              data-testid="button-final-eligibility"
            >
              <BadgeCheck className="w-4 h-4 mr-2" /> Check Eligibility
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="h-12 px-6 border-slate-600 text-slate-200 hover:bg-slate-800 hover:text-white"
              onClick={() => window.open(`https://wa.me/${WA_NUMBER}?text=${encodeURIComponent("Hi DeliWer — I'd like to speak to a finance advisor.")}`, "_blank")}
              data-testid="button-final-advisor"
            >
              <Phone className="w-4 h-4 mr-2" /> Speak to Finance Advisor
            </Button>
          </div>
        </div>
      </section>

      {/* Broker CTA */}
      <section className="py-10 px-4 border-t border-slate-800">
        <div className="max-w-4xl mx-auto">
          <BrokerCTABanner context="RERA broker? Refer buyers or tenants to DeliWer after deal close — earn AED 150–800+ per move-in referral, free to join." />
        </div>
      </section>
    </div>
  );
}
