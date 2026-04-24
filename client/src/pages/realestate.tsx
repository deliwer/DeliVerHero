import { Helmet } from "react-helmet";
import { useState } from "react";
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
  Crown,
  TrendingDown,
  Handshake,
  Zap,
  CheckCircle2,
  ArrowRight,
  Phone,
  Lock,
  Sparkles,
  Building2,
  MessageCircle,
  Home,
  Briefcase,
  Users,
  Truck,
  ShieldCheck,
  Repeat,
  Eye,
  FileSignature,
  Network,
  KeyRound,
  Search,
  PlusCircle,
  Globe2,
} from "lucide-react";
import dubaiSkyline from "@assets/stock_images/dubai_skyline.jpg";
import dubaiApartment from "@assets/stock_images/dubai_apartment.jpg";
import brokerHandshake from "@assets/stock_images/broker_handshake.jpg";
import keysHandover from "@assets/stock_images/keys_handover.jpg";

const WA_NUMBER = "971523946311";
const WA_LINK =
  "https://wa.me/971523946311?text=Hi%20DeliWer%20Real%20Estate%20%E2%80%94%20I%27d%20like%20to%20learn%20more%20about%20your%20infrastructure%20platform.";

const DEVELOPERS = [
  "EMAAR", "DAMAC", "NAKHEEL", "SOBHA", "MERAAS", "DANUBE", "ALDAR", "AZIZI", "ELLINGTON", "BINGHATTI",
];

const FINANCE_PARTNERS = [
  { name: "DIB", full: "Dubai Islamic Bank", tag: "Sharia-compliant home finance" },
  { name: "ENBD", full: "Emirates NBD", tag: "Resident & non-resident mortgages" },
  { name: "HSBC", full: "HSBC UAE", tag: "Premier expat mortgage solutions" },
  { name: "CBD", full: "Commercial Bank of Dubai", tag: "Flexible buy-to-let financing" },
  { name: "RAKBANK", full: "RAKBANK", tag: "Competitive fixed-rate home loans" },
  { name: "ADCB", full: "Abu Dhabi Commercial Bank", tag: "Up to 80% LTV financing" },
  { name: "FAB", full: "First Abu Dhabi Bank", tag: "Tailored UAE national & expat plans" },
  { name: "MASHREQ", full: "Mashreq Bank", tag: "Pre-approval in 48 hours" },
];

const ROLES = [
  "Buyer",
  "Tenant",
  "Relocation Client",
  "Independent Broker",
  "Licensed Brokerage Partner",
  "Developer",
  "Landlord (Rental Inventory)",
  "Landlord (Distress Inventory)",
  "Strategic Partner",
];

const INTERESTS = [
  "Find a property to buy",
  "Find a property to rent",
  "Relocate to Dubai",
  "List rental inventory",
  "List sale inventory (incl. distress)",
  "Distribute developer inventory",
  "Join broker network",
  "Move-in services only",
];

function PartnerForm() {
  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
    company: "",
    role: "",
    interest: "",
    notes: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const valid = form.name && form.phone && form.role && form.interest;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!valid) return;
    const lines = [
      "Hi DeliWer Real Estate — Partnership Request",
      "",
      `Name: ${form.name}`,
      `WhatsApp: ${form.phone}`,
      form.email ? `Email: ${form.email}` : "",
      form.company ? `Company: ${form.company}` : "",
      `Role: ${form.role}`,
      `Interested in: ${form.interest}`,
      form.notes ? `Notes: ${form.notes}` : "",
      "",
      "Please reach out with next steps.",
    ].filter(Boolean);
    const msg = encodeURIComponent(lines.join("\n"));
    window.open(`https://wa.me/${WA_NUMBER}?text=${msg}`, "_blank");
    setSubmitted(true);
  };

  return (
    <section
      id="partner"
      data-testid="section-partner-form"
      className="relative scroll-mt-24"
    >
      <div className="absolute inset-0 bg-gradient-to-b from-amber-950/20 via-slate-950 to-slate-950 pointer-events-none" />
      <div className="relative max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-8">
          <Badge className="bg-amber-500/15 text-amber-300 border-amber-500/30 mb-3">
            <Network className="w-3.5 h-3.5 mr-1.5" /> Join the Platform
          </Badge>
          <h2
            className="text-3xl sm:text-4xl font-bold mb-3"
            data-testid="heading-partner-form"
          >
            One Form. Every Role.
          </h2>
          <p className="text-slate-300 text-base sm:text-lg max-w-xl mx-auto">
            Whether you're buying, renting, listing, partnering or distributing —
            tell us who you are and we'll route you to the right desk.
          </p>
        </div>

        <Card className="bg-slate-900/80 border-amber-500/30 backdrop-blur">
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
                  Request Sent on WhatsApp
                </h3>
                <p className="text-slate-300 max-w-md mx-auto">
                  We'll review your details and reply within{" "}
                  <strong className="text-white">10 minutes</strong> during
                  business hours.
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
                    <Label className="text-xs font-bold uppercase tracking-widest text-slate-400">
                      Full Name *
                    </Label>
                    <Input
                      data-testid="input-partner-name"
                      required
                      value={form.name}
                      onChange={(e) =>
                        setForm((f) => ({ ...f, name: e.target.value }))
                      }
                      placeholder="e.g. Ahmed Hassan"
                      className="bg-slate-950 border-slate-700 text-white placeholder:text-slate-600 h-11"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <Label className="text-xs font-bold uppercase tracking-widest text-slate-400">
                      WhatsApp *
                    </Label>
                    <Input
                      data-testid="input-partner-phone"
                      required
                      type="tel"
                      value={form.phone}
                      onChange={(e) =>
                        setForm((f) => ({ ...f, phone: e.target.value }))
                      }
                      placeholder="+971 50 000 0000"
                      className="bg-slate-950 border-slate-700 text-white placeholder:text-slate-600 h-11"
                    />
                  </div>
                </div>

                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <Label className="text-xs font-bold uppercase tracking-widest text-slate-400">
                      Email
                    </Label>
                    <Input
                      data-testid="input-partner-email"
                      type="email"
                      value={form.email}
                      onChange={(e) =>
                        setForm((f) => ({ ...f, email: e.target.value }))
                      }
                      placeholder="you@company.ae"
                      className="bg-slate-950 border-slate-700 text-white placeholder:text-slate-600 h-11"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <Label className="text-xs font-bold uppercase tracking-widest text-slate-400">
                      Company / Brokerage
                    </Label>
                    <Input
                      data-testid="input-partner-company"
                      value={form.company}
                      onChange={(e) =>
                        setForm((f) => ({ ...f, company: e.target.value }))
                      }
                      placeholder="Optional"
                      className="bg-slate-950 border-slate-700 text-white placeholder:text-slate-600 h-11"
                    />
                  </div>
                </div>

                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <Label className="text-xs font-bold uppercase tracking-widest text-slate-400">
                      I am a *
                    </Label>
                    <Select
                      value={form.role}
                      onValueChange={(v) =>
                        setForm((f) => ({ ...f, role: v }))
                      }
                    >
                      <SelectTrigger
                        data-testid="select-partner-role"
                        className="bg-slate-950 border-slate-700 text-white h-11"
                      >
                        <SelectValue placeholder="Select your role" />
                      </SelectTrigger>
                      <SelectContent className="bg-slate-900 border-slate-700 text-white">
                        {ROLES.map((p) => (
                          <SelectItem
                            key={p}
                            value={p}
                            className="focus:bg-slate-800"
                          >
                            {p}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-1.5">
                    <Label className="text-xs font-bold uppercase tracking-widest text-slate-400">
                      I want to *
                    </Label>
                    <Select
                      value={form.interest}
                      onValueChange={(v) =>
                        setForm((f) => ({ ...f, interest: v }))
                      }
                    >
                      <SelectTrigger
                        data-testid="select-partner-interest"
                        className="bg-slate-950 border-slate-700 text-white h-11"
                      >
                        <SelectValue placeholder="Select intent" />
                      </SelectTrigger>
                      <SelectContent className="bg-slate-900 border-slate-700 text-white">
                        {INTERESTS.map((b) => (
                          <SelectItem
                            key={b}
                            value={b}
                            className="focus:bg-slate-800"
                          >
                            {b}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-1.5">
                  <Label className="text-xs font-bold uppercase tracking-widest text-slate-400">
                    Anything else? (optional)
                  </Label>
                  <textarea
                    data-testid="input-partner-notes"
                    rows={3}
                    value={form.notes}
                    onChange={(e) =>
                      setForm((f) => ({ ...f, notes: e.target.value }))
                    }
                    placeholder="Community, budget, timing, inventory size..."
                    className="w-full bg-slate-950 border border-slate-700 text-white placeholder:text-slate-600 rounded-md px-3 py-2 text-sm focus:outline-none focus:border-amber-500/60"
                  />
                </div>

                <Button
                  type="submit"
                  disabled={!valid}
                  size="lg"
                  className="w-full h-12 bg-amber-500 hover:bg-amber-400 disabled:opacity-50 text-slate-950 font-black"
                  data-testid="button-submit-partner-request"
                >
                  <MessageCircle className="w-4 h-4 mr-2" />
                  Submit via WhatsApp
                </Button>

                <p className="text-[11px] text-slate-500 text-center">
                  Opens WhatsApp with your details pre-filled. We typically reply
                  within 10 minutes.
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
  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <Helmet>
        <title>DeliWer Real Estate — Dubai's Real Estate Infrastructure Platform</title>
        <meta
          name="description"
          content="Buy, rent, invest and move in — all in one platform. DeliWer connects developers, landlords, brokers, tenants and buyers across Dubai with managed transactions and post-move-in services."
        />
        <meta name="keywords" content="Dubai rentals, Dubai property investment, distress property Dubai, developer inventory Dubai, move-in services Dubai" />
        <meta
          property="og:title"
          content="DeliWer Real Estate — Dubai's Real Estate Infrastructure Platform"
        />
        <meta
          property="og:description"
          content="Access premium developer inventory, distress opportunities, rentals, relocation support and move-in services through DeliWer's infrastructure platform."
        />
      </Helmet>

      {/* SECTION 1: HERO */}
      <section className="relative overflow-hidden border-b border-amber-500/20">
        <img
          src={dubaiSkyline}
          alt="Dubai skyline at sunset"
          className="absolute inset-0 w-full h-full object-cover opacity-40"
          data-testid="img-hero-bg"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-slate-950/85 via-slate-950/75 to-amber-950/60" />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-slate-950/40" />
        <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-28 text-center">
          <Badge
            className="bg-emerald-500/15 text-emerald-300 border-emerald-500/30 mb-5"
            data-testid="badge-platform"
          >
            <Globe2 className="w-3.5 h-3.5 mr-1.5" /> Real Estate Infrastructure Platform · Dubai
          </Badge>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight mb-5">
            Dubai Real Estate,{" "}
            <span className="bg-gradient-to-r from-emerald-400 via-amber-300 to-orange-500 bg-clip-text text-transparent">
              Reinvented Beyond Brokerage
            </span>
          </h1>
          <p className="text-lg sm:text-xl text-slate-300 mb-4 leading-relaxed max-w-3xl mx-auto">
            <strong className="text-white">Buy, Rent, Invest &amp; Move In — all in one platform.</strong>{" "}
            Access premium developer inventory, distress opportunities, rentals,
            relocation support and move-in services through DeliWer's infrastructure platform.
          </p>
          <p className="text-sm sm:text-base text-slate-400 mb-7 leading-relaxed max-w-3xl mx-auto">
            DeliWer is <em>not</em> a brokerage. We are{" "}
            <strong className="text-amber-300">demand + inventory distribution + move-in infrastructure</strong>.
            A licensed real estate partner handles every contract, escrow and formal closing.
          </p>

          {/* Developer logos strip */}
          <div className="flex flex-wrap gap-2 justify-center mb-7" data-testid="strip-developers">
            {DEVELOPERS.map((d) => (
              <span
                key={d}
                className="text-[10px] sm:text-xs font-black tracking-widest px-2.5 py-1 rounded-md bg-white/5 border border-white/10 text-slate-200"
                data-testid={`chip-developer-${d.toLowerCase().replace(/\s+/g, "-")}`}
              >
                {d}
              </span>
            ))}
          </div>

          <div className="flex flex-wrap gap-3 justify-center">
            <a href="#partner">
              <Button
                size="lg"
                className="bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-semibold"
                data-testid="button-hero-find"
              >
                <Search className="w-4 h-4 mr-2" />
                Find Property
              </Button>
            </a>
            <a href="#partner">
              <Button
                size="lg"
                className="bg-amber-500 hover:bg-amber-400 text-slate-950 font-semibold"
                data-testid="button-hero-list"
              >
                <PlusCircle className="w-4 h-4 mr-2" />
                List Property
              </Button>
            </a>
            <a href="#brokers">
              <Button
                size="lg"
                variant="outline"
                className="border-emerald-500/50 text-emerald-200 hover:bg-emerald-500/10"
                data-testid="button-hero-broker"
              >
                <Handshake className="w-4 h-4 mr-2" />
                Partner as Broker
              </Button>
            </a>
            <a href="#developers">
              <Button
                size="lg"
                variant="outline"
                className="border-amber-500/50 text-amber-200 hover:bg-amber-500/10"
                data-testid="button-hero-developer"
              >
                <Building2 className="w-4 h-4 mr-2" />
                Developer Partnerships
              </Button>
            </a>
          </div>

          <p
            className="text-xs text-slate-400 mt-5 flex items-center justify-center gap-1.5"
            data-testid="text-trust-line"
          >
            <ShieldCheck className="w-3.5 h-3.5" />
            Licensed closing partner · Managed lead distribution · CRM-tracked transactions
          </p>
        </div>
      </section>

      {/* SECTION 1B: WHO WE WORK WITH */}
      <section className="border-b border-slate-800 bg-slate-950/60" data-testid="section-audiences">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <p className="text-center text-xs uppercase tracking-widest text-slate-400 mb-5">
            One platform · Eight stakeholders
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-3">
            {[
              { icon: Building2, label: "Developers" },
              { icon: KeyRound, label: "Landlords" },
              { icon: Home, label: "Rental Owners" },
              { icon: Briefcase, label: "Brokerages" },
              { icon: Handshake, label: "Brokers" },
              { icon: Users, label: "Tenants" },
              { icon: Crown, label: "Buyers" },
              { icon: Truck, label: "Relocation" },
            ].map((a, i) => (
              <div
                key={i}
                className="flex flex-col items-center gap-1.5 bg-slate-900/40 border border-slate-800 rounded-lg p-3 text-center"
                data-testid={`audience-${a.label.toLowerCase()}`}
              >
                <a.icon className="w-5 h-5 text-amber-300" />
                <span className="text-xs text-slate-200 font-semibold">{a.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 2: HOW DELIWER REVENUE WORKS */}
      <section className="relative overflow-hidden border-b border-slate-800" data-testid="section-revenue">
        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center mb-10">
            <Badge className="bg-emerald-500/15 text-emerald-300 border-emerald-500/30 mb-3">
              <Sparkles className="w-3.5 h-3.5 mr-1.5" /> Five Revenue Streams
            </Badge>
            <h2 className="text-3xl sm:text-4xl font-bold mb-3" data-testid="heading-revenue">
              How DeliWer Revenue Works
            </h2>
            <p className="text-slate-300 text-base sm:text-lg max-w-3xl mx-auto">
              We monetize across the full property lifecycle — from inventory to closing
              to recurring move-in services.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-5">
            {/* 1. Developer Inventory */}
            <Card className="bg-slate-900/60 border-slate-800 hover-elevate" data-testid="card-revenue-developer">
              <CardContent className="p-6">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-11 h-11 rounded-lg bg-amber-500/15 flex items-center justify-center">
                    <Building2 className="w-5 h-5 text-amber-300" />
                  </div>
                  <div>
                    <div className="text-[10px] font-black uppercase tracking-widest text-amber-300/80">Stream 1</div>
                    <h3 className="text-lg font-bold text-white">Developer Inventory Revenue</h3>
                  </div>
                </div>
                <p className="text-sm text-slate-300 mb-3 leading-relaxed">
                  Developers provide inventory · DeliWer generates demand · Licensed
                  partner brokerage closes the deal.
                </p>
                <div className="rounded-lg border border-amber-500/30 bg-amber-500/5 p-3">
                  <div className="text-[10px] uppercase tracking-widest text-slate-400 mb-1">Sample split</div>
                  <div className="text-sm text-white font-semibold">Developer commission: 4–7%</div>
                  <div className="text-xs text-slate-300 mt-1">
                    Split between Broker · Licensed Brokerage Partner · DeliWer
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* 2. Rental Commission */}
            <Card className="bg-slate-900/60 border-slate-800 hover-elevate" data-testid="card-revenue-rental">
              <CardContent className="p-6">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-11 h-11 rounded-lg bg-emerald-500/15 flex items-center justify-center">
                    <Home className="w-5 h-5 text-emerald-300" />
                  </div>
                  <div>
                    <div className="text-[10px] font-black uppercase tracking-widest text-emerald-300/80">Stream 2</div>
                    <h3 className="text-lg font-bold text-white">Rental Commission Revenue</h3>
                  </div>
                </div>
                <p className="text-sm text-slate-300 mb-3 leading-relaxed">
                  DeliWer provides leads · Broker facilitates showings · Licensed
                  partner handles the closing.
                </p>
                <div className="rounded-lg border border-emerald-500/30 bg-emerald-500/5 p-3">
                  <div className="text-[10px] uppercase tracking-widest text-slate-400 mb-1">Flow</div>
                  <div className="text-xs text-slate-200 font-mono">
                    Lead → Viewing → Offer → Ejari → Commission
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* 3. Distress Property */}
            <Card className="bg-slate-900/60 border-slate-800 hover-elevate" data-testid="card-revenue-distress">
              <CardContent className="p-6">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-11 h-11 rounded-lg bg-orange-500/15 flex items-center justify-center">
                    <TrendingDown className="w-5 h-5 text-orange-300" />
                  </div>
                  <div>
                    <div className="text-[10px] font-black uppercase tracking-widest text-orange-300/80">Stream 3</div>
                    <h3 className="text-lg font-bold text-white">Distress Property Revenue</h3>
                  </div>
                </div>
                <p className="text-sm text-slate-300 mb-3 leading-relaxed">
                  Urgent sellers, distress buyers, below-market deals and quick liquidation
                  opportunities — matched fast.
                </p>
                <div className="grid grid-cols-3 gap-2 text-center">
                  {["Referral fees", "Closing commissions", "Asset services"].map((x) => (
                    <div key={x} className="rounded-md border border-orange-500/30 bg-orange-500/5 p-2 text-[11px] text-orange-200 font-semibold">
                      {x}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* 4. Move-In Revenue (highlighted) */}
            <Card className="bg-gradient-to-br from-amber-500/20 via-slate-900/80 to-emerald-500/15 border-amber-400/60 hover-elevate ring-2 ring-amber-400/40 shadow-lg shadow-amber-500/10" data-testid="card-revenue-movein">
              <CardContent className="p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 rounded-lg bg-amber-400 flex items-center justify-center shadow-md shadow-amber-500/30">
                    <Truck className="w-6 h-6 text-slate-950" />
                  </div>
                  <div>
                    <div className="inline-block text-[10px] font-black uppercase tracking-widest text-slate-950 bg-amber-300 px-2 py-0.5 rounded mb-1">
                      Stream 4 · Major Differentiator
                    </div>
                    <h3 className="text-xl font-bold text-white">Move-In Revenue</h3>
                  </div>
                </div>
                <p className="text-sm text-white mb-4 leading-relaxed font-medium">
                  After every transaction, DeliWer monetizes the move-in lifecycle:
                </p>
                <div className="flex flex-wrap gap-2">
                  {[
                    "Ejari", "DEWA", "Internet", "Moving", "Furniture",
                    "Water Delivery", "Repairs", "Maintenance", "Emergency Prep",
                  ].map((s) => (
                    <span
                      key={s}
                      className="text-xs px-3 py-1.5 rounded-full bg-amber-400 border border-amber-300 text-slate-950 font-bold shadow-sm"
                    >
                      {s}
                    </span>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* 5. Property Management */}
            <Card className="bg-slate-900/60 border-slate-800 hover-elevate md:col-span-2" data-testid="card-revenue-pm">
              <CardContent className="p-6">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-11 h-11 rounded-lg bg-emerald-500/15 flex items-center justify-center">
                    <Repeat className="w-5 h-5 text-emerald-300" />
                  </div>
                  <div>
                    <div className="text-[10px] font-black uppercase tracking-widest text-emerald-300/80">Stream 5</div>
                    <h3 className="text-lg font-bold text-white">Property Management Revenue</h3>
                  </div>
                </div>
                <p className="text-sm text-slate-300 mb-3 leading-relaxed">
                  Recurring landlord revenue across the holding period:
                </p>
                <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 text-center">
                  {[
                    "Tenant sourcing",
                    "Renewals",
                    "Maintenance",
                    "Furnishing",
                    "Short-term optimization",
                  ].map((x) => (
                    <div key={x} className="rounded-md border border-emerald-500/30 bg-emerald-500/5 p-2 text-[11px] text-emerald-200 font-semibold">
                      {x}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* SECTION 3: HOW WE PROTECT TRANSACTIONS */}
      <section className="relative border-b border-slate-800" data-testid="section-protection">
        <div className="absolute inset-0 bg-gradient-to-b from-slate-950 via-emerald-950/10 to-slate-950 pointer-events-none" />
        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center mb-10">
            <Badge className="bg-emerald-500/15 text-emerald-300 border-emerald-500/30 mb-3">
              <ShieldCheck className="w-3.5 h-3.5 mr-1.5" /> Anti-Leakage by Design
            </Badge>
            <h2 className="text-3xl sm:text-4xl font-bold mb-3" data-testid="heading-protection">
              How We Protect Transactions
            </h2>
            <p className="text-slate-300 text-base sm:text-lg max-w-3xl mx-auto">
              Every lead, viewing and contract is governed by infrastructure designed
              to keep deals — and revenue — inside the network.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5 mb-10">
            {[
              {
                icon: Network,
                title: "Managed Lead Distribution",
                desc: "No raw leads distributed. Every lead routed through DeliWer's qualification and assignment layer.",
              },
              {
                icon: Eye,
                title: "Controlled Viewing Process",
                desc: "DeliWer or the licensed partner controls first access — viewings logged and chaperoned where needed.",
              },
              {
                icon: FileSignature,
                title: "Licensed Closing Process",
                desc: "All contracts, escrow and formal closings are executed exclusively by our licensed real estate partner.",
              },
              {
                icon: Repeat,
                title: "CRM Tracking",
                desc: "Viewing → Offer → Contract → Closing — every stage timestamped, attributed and auditable.",
              },
              {
                icon: Crown,
                title: "Broker Membership Access",
                desc: "Optional plans (Free · Pro · Enterprise) determine inventory tier, lead volume and override structure.",
              },
              {
                icon: Lock,
                title: "Closed Network Advantage",
                desc: "Capped pool per community — your leads don't compete with hundreds of agents on portals.",
              },
            ].map((item, i) => (
              <Card
                key={i}
                className="bg-slate-950/70 border-emerald-500/20 hover-elevate"
                data-testid={`card-protect-${i}`}
              >
                <CardContent className="p-5">
                  <div className="w-11 h-11 rounded-lg bg-emerald-500/15 flex items-center justify-center mb-3">
                    <item.icon className="w-5 h-5 text-emerald-300" />
                  </div>
                  <h3 className="text-base font-bold text-white mb-1.5">{item.title}</h3>
                  <p className="text-sm text-slate-300 leading-relaxed">{item.desc}</p>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Membership tiers */}
          <div className="bg-slate-950/80 border border-amber-500/30 rounded-2xl p-6 sm:p-8" data-testid="card-membership-tiers">
            <h3 className="text-xl sm:text-2xl font-bold text-center mb-2">
              Broker Membership Plans
            </h3>
            <p className="text-center text-slate-400 text-sm mb-6">
              Choose the access tier that matches your deal volume.
            </p>
            <div className="grid md:grid-cols-3 gap-4">
              {[
                {
                  tag: "Free",
                  title: "Starter",
                  amt: "AED 0",
                  features: ["Rental leads", "Standard inventory", "Monthly payouts"],
                  color: "border-slate-600 bg-slate-800/30",
                },
                {
                  tag: "Pro",
                  title: "Active Broker",
                  amt: "Performance-based",
                  features: ["Distress feed access", "Priority lead routing", "Move-in overrides"],
                  color: "border-emerald-500/40 bg-emerald-500/5",
                },
                {
                  tag: "Enterprise",
                  title: "Brokerage Partner",
                  amt: "Custom",
                  features: ["Developer inventory", "White-label CRM", "Co-branded campaigns"],
                  color: "border-amber-500/40 bg-amber-500/5",
                },
              ].map((t, i) => (
                <div
                  key={i}
                  className={`rounded-xl border ${t.color} p-5`}
                  data-testid={`membership-${t.tag.toLowerCase()}`}
                >
                  <div className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2">
                    {t.tag}
                  </div>
                  <div className="text-base font-bold text-white mb-1">{t.title}</div>
                  <div className="text-2xl font-black text-amber-300 mb-3">{t.amt}</div>
                  <ul className="space-y-1.5">
                    {t.features.map((f) => (
                      <li key={f} className="flex items-start gap-2 text-xs text-slate-300">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 mt-0.5 flex-shrink-0" />
                        <span>{f}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 4: BROKER PARTNERSHIP */}
      <section
        id="brokers"
        className="relative overflow-hidden border-b border-slate-800 scroll-mt-24"
        data-testid="section-brokers"
      >
        <img
          src={brokerHandshake}
          alt="Real estate broker handshake"
          className="absolute inset-0 w-full h-full object-cover opacity-20"
          data-testid="img-brokers-bg"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-950/85 to-slate-950" />
        <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center mb-10">
            <Badge className="bg-emerald-500/15 text-emerald-300 border-emerald-500/30 mb-3">
              <Handshake className="w-3.5 h-3.5 mr-1.5" /> Broker Partnerships
            </Badge>
            <h2 className="text-3xl sm:text-4xl font-bold mb-3" data-testid="heading-brokers">
              Close More Deals Without Paying for Leads
            </h2>
            <p className="text-slate-300 text-base sm:text-lg max-w-3xl mx-auto">
              Plug into a feed of developer inventory, rental leads, distress deals
              and relocation clients — backed by recurring move-in overrides.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
            {[
              { icon: Building2, t: "Developer inventory" },
              { icon: Home, t: "Rental leads" },
              { icon: TrendingDown, t: "Distress inventory" },
              { icon: Truck, t: "Relocation clients" },
              { icon: Repeat, t: "Recurring referral revenue" },
              { icon: ShieldCheck, t: "Licensed closing support" },
            ].map((b, i) => (
              <div
                key={i}
                className="flex items-center gap-3 bg-slate-950/70 border border-slate-800 rounded-lg p-4"
                data-testid={`broker-benefit-${i}`}
              >
                <b.icon className="w-5 h-5 text-emerald-300 flex-shrink-0" />
                <span className="text-slate-200 text-sm font-semibold">{b.t}</span>
              </div>
            ))}
          </div>

          <div className="flex flex-wrap gap-3 justify-center">
            <a href="https://www.deliwer.com/broker-partner" target="_blank" rel="noopener noreferrer">
              <Button
                size="lg"
                className="bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-semibold"
                data-testid="button-brokers-partner"
              >
                Partner With DeliWer <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </a>
            <a href={WA_LINK} target="_blank" rel="noopener noreferrer">
              <Button
                size="lg"
                variant="outline"
                className="border-emerald-500/50 text-emerald-200 hover:bg-emerald-500/10"
                data-testid="button-brokers-whatsapp"
              >
                <Phone className="w-4 h-4 mr-2" /> Talk to Broker Desk
              </Button>
            </a>
          </div>
        </div>
      </section>

      {/* SECTION 5: DEVELOPER PARTNERSHIP */}
      <section
        id="developers"
        className="relative overflow-hidden border-b border-slate-800 scroll-mt-24"
        data-testid="section-developers"
      >
        <img
          src={dubaiApartment}
          alt="Luxury Dubai apartment interior"
          className="absolute inset-0 w-full h-full object-cover opacity-20"
          data-testid="img-developers-bg"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-slate-950/90 via-amber-950/30 to-slate-950/90" />
        <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center mb-10">
            <Badge className="bg-amber-500/15 text-amber-300 border-amber-500/30 mb-3">
              <Building2 className="w-3.5 h-3.5 mr-1.5" /> Developer Partnerships
            </Badge>
            <h2 className="text-3xl sm:text-4xl font-bold mb-3" data-testid="heading-developers">
              Sell Inventory Faster Through DeliWer Distribution
            </h2>
            <p className="text-slate-300 text-base sm:text-lg max-w-3xl mx-auto">
              Move units faster with an end-to-end demand engine —
              from broker network to relocation clients to post-move-in monetization.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            {[
              { icon: Network, t: "Broker network" },
              { icon: Truck, t: "Relocation clients" },
              { icon: Repeat, t: "Move-in monetization" },
              { icon: Users, t: "Tenant conversion" },
            ].map((b, i) => (
              <Card key={i} className="bg-slate-950/70 border-amber-500/20 hover-elevate" data-testid={`developer-benefit-${i}`}>
                <CardContent className="p-5 text-center">
                  <div className="w-11 h-11 mx-auto rounded-lg bg-amber-500/15 flex items-center justify-center mb-3">
                    <b.icon className="w-5 h-5 text-amber-300" />
                  </div>
                  <div className="text-sm font-bold text-white">{b.t}</div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="flex flex-wrap gap-3 justify-center">
            <a href="#partner">
              <Button
                size="lg"
                className="bg-amber-500 hover:bg-amber-400 text-slate-950 font-semibold"
                data-testid="button-developers-partner"
              >
                Partner With Us <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </a>
          </div>
        </div>
      </section>

      {/* SECTION 5b: FINANCE PARTNERS — UAE banks for mortgages & buyer funding */}
      <section
        id="finance-partners"
        className="relative overflow-hidden border-b border-slate-800 scroll-mt-24"
        data-testid="section-finance-partners"
      >
        <div className="absolute inset-0 bg-gradient-to-b from-slate-950 via-blue-950/20 to-slate-950" />
        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center mb-10">
            <Badge className="bg-blue-500/15 text-blue-300 border-blue-500/30 mb-3">
              <ShieldCheck className="w-3.5 h-3.5 mr-1.5" /> Finance Partners
            </Badge>
            <h2 className="text-3xl sm:text-4xl font-bold mb-3" data-testid="heading-finance-partners">
              Mortgage & Funding Deals — Pre-arranged for Our Buyers
            </h2>
            <p className="text-slate-300 text-base sm:text-lg max-w-3xl mx-auto">
              DeliWer refers qualified buyers directly to UAE's leading banks for
              competitive mortgage rates, fast pre-approvals, and exclusive funding
              packages on developer & resale inventory.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            {FINANCE_PARTNERS.map((p) => (
              <Card
                key={p.name}
                className="bg-slate-950/70 border-blue-500/20 hover-elevate"
                data-testid={`finance-partner-${p.name.toLowerCase()}`}
              >
                <CardContent className="p-5 text-center">
                  <div className="w-14 h-14 mx-auto rounded-xl bg-blue-500/10 border border-blue-500/30 flex items-center justify-center mb-3">
                    <span className="font-black text-blue-300 text-sm tracking-tight">{p.name}</span>
                  </div>
                  <div className="text-sm font-bold text-white mb-1">{p.full}</div>
                  <div className="text-xs text-slate-400 leading-snug">{p.tag}</div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="grid md:grid-cols-3 gap-3 mb-8">
            {[
              { icon: Repeat, t: "Pre-approval in 48 hours" },
              { icon: ShieldCheck, t: "Resident & non-resident options" },
              { icon: Network, t: "Sharia-compliant & conventional" },
            ].map((b, i) => (
              <div
                key={i}
                className="flex items-center gap-3 bg-slate-950/70 border border-blue-500/20 rounded-lg p-4"
                data-testid={`finance-benefit-${i}`}
              >
                <b.icon className="w-5 h-5 text-blue-300 flex-shrink-0" />
                <span className="text-slate-200 text-sm font-semibold">{b.t}</span>
              </div>
            ))}
          </div>

          <div className="flex flex-wrap gap-3 justify-center">
            <a href="#partner">
              <Button
                size="lg"
                className="bg-blue-500 hover:bg-blue-400 text-slate-950 font-semibold"
                data-testid="button-finance-request"
              >
                Request Mortgage Pre-Approval <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </a>
            <a
              href={`https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(
                "Hi DeliWer Real Estate — I'd like to be referred to a UAE bank for mortgage / property funding."
              )}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button
                size="lg"
                variant="outline"
                className="border-blue-500/50 text-blue-200 hover:bg-blue-500/10"
                data-testid="button-finance-whatsapp"
              >
                <Phone className="w-4 h-4 mr-2" /> Talk to Finance Desk
              </Button>
            </a>
          </div>

          <p className="text-center text-xs text-slate-500 mt-6 max-w-2xl mx-auto">
            Bank referrals are facilitated by DeliWer. Final approval, terms and rates are issued by the respective bank under their UAE Central Bank-regulated lending policies.
          </p>
        </div>
      </section>

      {/* SECTION 6: CUSTOMER FUNNEL VISUAL */}
      <section className="border-b border-slate-800 bg-slate-950" data-testid="section-funnel">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center mb-10">
            <h2 className="text-3xl sm:text-4xl font-bold mb-3" data-testid="heading-funnel">
              The DeliWer Funnel
            </h2>
            <p className="text-slate-300 text-base sm:text-lg max-w-3xl mx-auto">
              From inventory to move-in to recurring revenue — every step of the
              transaction lives on one platform.
            </p>
          </div>

          <div className="grid md:grid-cols-7 gap-3 items-stretch">
            {[
              { icon: Building2, t: "Developer / Landlord Inventory", c: "amber" },
              { icon: Globe2, t: "DeliWer Platform", c: "emerald" },
              { icon: Network, t: "Broker Network", c: "emerald" },
              { icon: FileSignature, t: "Licensed Brokerage Partner", c: "amber" },
              { icon: Users, t: "Buyer / Tenant", c: "emerald" },
              { icon: Truck, t: "Move-In Services", c: "amber" },
              { icon: Repeat, t: "Recurring Revenue", c: "emerald" },
            ].map((s, i, arr) => (
              <div key={i} className="relative flex flex-col items-center" data-testid={`funnel-step-${i}`}>
                <div
                  className={`w-full h-full rounded-xl border p-4 flex flex-col items-center text-center gap-2 ${
                    s.c === "amber"
                      ? "border-amber-500/30 bg-amber-500/5"
                      : "border-emerald-500/30 bg-emerald-500/5"
                  }`}
                >
                  <div
                    className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                      s.c === "amber" ? "bg-amber-500/20" : "bg-emerald-500/20"
                    }`}
                  >
                    <s.icon className={`w-5 h-5 ${s.c === "amber" ? "text-amber-300" : "text-emerald-300"}`} />
                  </div>
                  <div className="text-[11px] sm:text-xs font-bold text-white leading-tight">
                    {s.t}
                  </div>
                  <div className="text-[10px] text-slate-400">Step {i + 1}</div>
                </div>
                {i < arr.length - 1 && (
                  <ArrowRight className="hidden md:block absolute -right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-600 z-10" />
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 7: PARTNER FORM */}
      <PartnerForm />

      {/* SECTION 8: FAQ */}
      <section className="bg-slate-900/40 border-y border-slate-800" data-testid="section-faq">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center mb-8">
            <h2 className="text-3xl sm:text-4xl font-bold" data-testid="heading-faq">
              Frequently Asked
            </h2>
            <p className="text-slate-400 mt-2 text-sm">
              Quick answers from the DeliWer Real Estate platform
            </p>
          </div>
          <div className="space-y-3">
            {[
              {
                q: "Is DeliWer a brokerage?",
                a: "No. DeliWer is a real estate infrastructure platform — demand generation, inventory distribution and move-in services. A separate licensed real estate partner handles every contract, escrow and formal closing.",
              },
              {
                q: "Who is DeliWer Real Estate for?",
                a: "Developers, landlords, rental owners, brokerages, independent brokers, tenants, buyers, relocation clients and strategic partners — all transacting on one platform.",
              },
              {
                q: "How do brokers get paid?",
                a: "Through standard rental commissions, distress sale bonuses on closures from our distress feed, and per-deal overrides on move-in services (Ejari, DEWA, movers, AquaCafe). Paid monthly with a full statement.",
              },
              {
                q: "How does DeliWer prevent broker leakage?",
                a: "Managed lead distribution, controlled first viewings, licensed closing process, and CRM tracking from viewing → offer → contract → closing. Optional broker membership tiers (Free / Pro / Enterprise) determine access.",
              },
              {
                q: "Which developers and communities are covered?",
                a: "DAMAC, Emaar, Sobha, Danube, Nakheel, Meraas, Aldar, Azizi, Ellington, Binghatti — across Downtown, Marina, Business Bay, Dubai Hills, JVC, JVT, Palm Jumeirah, MBR City, Arabian Ranches and more.",
              },
              {
                q: "What are move-in services?",
                a: "Post-transaction monetization: Ejari, DEWA, internet, moving, furniture, water delivery, repairs, maintenance and emergency preparedness packages. This is DeliWer's major differentiator and a recurring revenue layer.",
              },
              {
                q: "How fast can I get started?",
                a: "Same day. Submit the partner form or WhatsApp us — onboarded partners are routed to the right desk and typically activated within 24 hours.",
              },
            ].map((f, i) => (
              <details
                key={i}
                className="group bg-slate-950/60 border border-slate-800 rounded-lg p-4 hover:border-amber-500/30 transition-colors"
                data-testid={`faq-item-${i}`}
              >
                <summary className="cursor-pointer flex items-center justify-between gap-3 text-white font-semibold list-none">
                  <span>{f.q}</span>
                  <span className="text-amber-300 text-xl group-open:rotate-45 transition-transform shrink-0">
                    +
                  </span>
                </summary>
                <p className="mt-3 text-slate-300 text-sm leading-relaxed">{f.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 9: FINAL CTA */}
      <section className="relative overflow-hidden border-t border-amber-500/20">
        <img
          src={keysHandover}
          alt="Keys handover for new Dubai apartment"
          className="absolute inset-0 w-full h-full object-cover opacity-30"
          data-testid="img-cta-bg"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-slate-950/90 via-amber-950/40 to-slate-950/90" />
        <div className="relative max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
          <h2
            className="text-3xl sm:text-5xl font-bold mb-6"
            data-testid="heading-final-cta"
          >
            Dubai's First Real Estate{" "}
            <span className="bg-gradient-to-r from-emerald-400 via-amber-300 to-orange-500 bg-clip-text text-transparent">
              Transaction + Move-In
            </span>{" "}
            Infrastructure Platform
          </h2>
          <p className="text-slate-300 mb-8 text-lg">
            Buyers · Tenants · Developers · Brokers · Landlords · Partners — one platform,
            measurable revenue streams.
          </p>
          <div className="flex flex-wrap gap-3 justify-center">
            <a href="#partner">
              <Button
                size="lg"
                className="bg-amber-500 hover:bg-amber-400 text-slate-950 font-semibold"
                data-testid="button-final-partner"
              >
                Get Started <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </a>
            <a href={WA_LINK} target="_blank" rel="noopener noreferrer">
              <Button
                size="lg"
                variant="outline"
                className="border-emerald-500/50 text-emerald-200 hover:bg-emerald-500/10"
                data-testid="button-final-whatsapp"
              >
                <Phone className="w-4 h-4 mr-2" />
                Chat on WhatsApp
              </Button>
            </a>
          </div>
        </div>
      </section>

      <footer className="border-t border-slate-800 py-8 text-center text-sm text-slate-500">
        <div className="flex items-center justify-center gap-2 mb-1">
          <Building2 className="w-4 h-4 text-amber-300" />
          DeliWer Real Estate · Infrastructure Platform · Closings via Licensed Partner
        </div>
        <div>realestate.deliwer.com · Dubai, UAE</div>
      </footer>

      {/* Sticky WhatsApp Button */}
      <a
        href={WA_LINK}
        target="_blank"
        rel="noopener noreferrer"
        data-testid="button-sticky-whatsapp"
        className="fixed bottom-5 right-5 z-50 inline-flex items-center gap-2 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-semibold px-4 py-3 rounded-full shadow-lg shadow-emerald-500/30 transition-transform hover:scale-105"
      >
        <Phone className="w-5 h-5" />
        <span className="hidden sm:inline">WhatsApp</span>
      </a>
    </div>
  );
}
