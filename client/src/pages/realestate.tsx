import { Helmet } from "react-helmet";
import { Link } from "wouter";
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
} from "lucide-react";
import dubaiSkyline from "@assets/stock_images/dubai_skyline.jpg";
import dubaiApartment from "@assets/stock_images/dubai_apartment.jpg";
import brokerHandshake from "@assets/stock_images/broker_handshake.jpg";
import keysHandover from "@assets/stock_images/keys_handover.jpg";

const WA_NUMBER = "971523946311";
const WA_LINK =
  "https://wa.me/971523946311?text=Hi%2C%20I%E2%80%99m%20a%20Dubai%20broker.%20Interested%20in%20accessing%20below-market%20DAMAC%20inventory%20through%20DeliWer.%20Please%20share%20details.";

const PROPERTY_INTERESTS = [
  "Rental — Apartments (Studio/1BR)",
  "Rental — Apartments (2-3BR)",
  "Rental — Villas / Townhouses",
  "Sale — Distress / Below-Market Apartments",
  "Sale — Distress / Below-Market Villas",
  "Branded Residences",
  "Commercial / Business Bay",
  "Mixed — open to all",
];

const BUDGET_RANGES = [
  "Rental — Under AED 80K/yr",
  "Rental — AED 80–150K/yr",
  "Rental — AED 150–300K/yr",
  "Rental — AED 300K+/yr",
  "Sale — Under AED 1M",
  "Sale — AED 1M – 3M",
  "Sale — AED 3M – 10M",
  "Sale — AED 10M+",
  "Multiple tenants/buyers — varied",
];

const DEVELOPERS = [
  "EMAAR", "DAMAC", "NAKHEEL", "MERAAS", "SOBHA", "DUBAI PROPERTIES", "ALDAR", "AZIZI", "ELLINGTON", "BINGHATTI",
];

const COMMUNITIES = [
  "Downtown", "Dubai Marina", "JVC", "JVT", "Business Bay", "Dubai Hills", "Arabian Ranches",
  "DAMAC Hills", "Palm Jumeirah", "MBR City", "Town Square", "Al Furjan", "JLT", "Mirdif",
];

function RequestAccessForm() {
  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
    company: "",
    rera: "",
    interest: "",
    budget: "",
    notes: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const valid =
    form.name && form.phone && form.interest && form.budget;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!valid) return;
    const lines = [
      "Hi DeliWer — Broker Access Request for DAMAC Distress Inventory",
      "",
      `Name: ${form.name}`,
      `WhatsApp: ${form.phone}`,
      form.email ? `Email: ${form.email}` : "",
      form.company ? `Brokerage: ${form.company}` : "",
      form.rera ? `RERA / BRN: ${form.rera}` : "",
      `Interested in: ${form.interest}`,
      `Buyer budget: ${form.budget}`,
      form.notes ? `Notes: ${form.notes}` : "",
      "",
      "Please add me to the limited broker pool.",
    ].filter(Boolean);
    const msg = encodeURIComponent(lines.join("\n"));
    window.open(`https://wa.me/${WA_NUMBER}?text=${msg}`, "_blank");
    setSubmitted(true);
  };

  return (
    <section
      id="request-access"
      data-testid="section-request-access"
      className="relative scroll-mt-32"
    >
      <div className="absolute inset-0 bg-gradient-to-b from-amber-950/30 via-slate-950 to-slate-950 pointer-events-none" />
      <div className="relative max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-8">
          <Badge className="bg-amber-500/15 text-amber-300 border-amber-500/30 mb-3">
            <Lock className="w-3.5 h-3.5 mr-1.5" /> Limited Broker Slots
          </Badge>
          <h2
            className="text-3xl sm:text-4xl font-bold mb-3"
            data-testid="heading-request-access-form"
          >
            Join the Commission-Only Broker Network
          </h2>
          <p className="text-slate-300 text-base sm:text-lg max-w-xl mx-auto">
            Tell us what your tenants &amp; buyers are looking for. We'll route live
            rental and below-market inventory across all major Dubai developers — onboarded within 24 hours.
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
                  business hours. Keep WhatsApp handy.
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
                      data-testid="input-access-name"
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
                      data-testid="input-access-phone"
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
                      data-testid="input-access-email"
                      type="email"
                      value={form.email}
                      onChange={(e) =>
                        setForm((f) => ({ ...f, email: e.target.value }))
                      }
                      placeholder="you@brokerage.ae"
                      className="bg-slate-950 border-slate-700 text-white placeholder:text-slate-600 h-11"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <Label className="text-xs font-bold uppercase tracking-widest text-slate-400">
                      Brokerage
                    </Label>
                    <Input
                      data-testid="input-access-company"
                      value={form.company}
                      onChange={(e) =>
                        setForm((f) => ({ ...f, company: e.target.value }))
                      }
                      placeholder="Company name"
                      className="bg-slate-950 border-slate-700 text-white placeholder:text-slate-600 h-11"
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <Label className="text-xs font-bold uppercase tracking-widest text-slate-400">
                    RERA / BRN
                  </Label>
                  <Input
                    data-testid="input-access-rera"
                    value={form.rera}
                    onChange={(e) =>
                      setForm((f) => ({ ...f, rera: e.target.value }))
                    }
                    placeholder="Your RERA card or BRN number"
                    className="bg-slate-950 border-slate-700 text-white placeholder:text-slate-600 h-11"
                  />
                </div>

                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <Label className="text-xs font-bold uppercase tracking-widest text-slate-400">
                      Interested In *
                    </Label>
                    <Select
                      value={form.interest}
                      onValueChange={(v) =>
                        setForm((f) => ({ ...f, interest: v }))
                      }
                    >
                      <SelectTrigger
                        data-testid="select-access-interest"
                        className="bg-slate-950 border-slate-700 text-white h-11"
                      >
                        <SelectValue placeholder="Apartments, villas, ..." />
                      </SelectTrigger>
                      <SelectContent className="bg-slate-900 border-slate-700 text-white">
                        {PROPERTY_INTERESTS.map((p) => (
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
                      Buyer Budget *
                    </Label>
                    <Select
                      value={form.budget}
                      onValueChange={(v) =>
                        setForm((f) => ({ ...f, budget: v }))
                      }
                    >
                      <SelectTrigger
                        data-testid="select-access-budget"
                        className="bg-slate-950 border-slate-700 text-white h-11"
                      >
                        <SelectValue placeholder="Select budget range" />
                      </SelectTrigger>
                      <SelectContent className="bg-slate-900 border-slate-700 text-white">
                        {BUDGET_RANGES.map((b) => (
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
                    data-testid="input-access-notes"
                    rows={3}
                    value={form.notes}
                    onChange={(e) =>
                      setForm((f) => ({ ...f, notes: e.target.value }))
                    }
                    placeholder="Specific community, timing, buyer profile..."
                    className="w-full bg-slate-950 border border-slate-700 text-white placeholder:text-slate-600 rounded-md px-3 py-2 text-sm focus:outline-none focus:border-amber-500/60"
                  />
                </div>

                <Button
                  type="submit"
                  disabled={!valid}
                  size="lg"
                  className="w-full h-12 bg-amber-500 hover:bg-amber-400 disabled:opacity-50 text-slate-950 font-black"
                  data-testid="button-submit-access-request"
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
        <title>Dubai Brokers: Access Below-Market DAMAC Units | DeliWer</title>
        <meta
          name="description"
          content="Join a limited group of Dubai brokers accessing distress-driven DAMAC inventory. Close faster and earn more per deal with DeliWer."
        />
        <meta
          property="og:title"
          content="Dubai Brokers: Access Below-Market DAMAC Units | DeliWer"
        />
        <meta
          property="og:description"
          content="Priority access to distress-driven DAMAC inventory + earn more per transaction with DeliWer move-in services."
        />
      </Helmet>

      {/* SECTION 1: HERO */}
      <section className="relative overflow-hidden border-b border-amber-500/20">
        <img
          src={dubaiSkyline}
          alt="Dubai skyline at sunset with luxury DAMAC towers"
          className="absolute inset-0 w-full h-full object-cover opacity-40"
          data-testid="img-hero-bg"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-slate-950/85 via-slate-950/75 to-amber-950/60" />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-slate-950/40" />
        <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-28 text-center">
          <Badge
            className="bg-emerald-500/15 text-emerald-300 border-emerald-500/30 mb-5"
            data-testid="badge-broker-access"
          >
            <Crown className="w-3.5 h-3.5 mr-1.5" /> Dubai Rental Reset · Broker Intelligence Network
          </Badge>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight mb-5">
            Dubai's New Rental Reality —{" "}
            <span className="bg-gradient-to-r from-emerald-400 via-amber-300 to-orange-500 bg-clip-text text-transparent">
              Supply Now Outpaces Demand
            </span>
          </h1>
          <p className="text-lg sm:text-xl text-slate-300 mb-4 leading-relaxed max-w-3xl mx-auto">
            Population shift, expat exits and reshuffling preferences after the war have flipped the rental market.{" "}
            <strong className="text-white">Indigenous tenants and remaining expats now hold the leverage</strong> — and brokers
            who move first close first.
          </p>
          <p className="text-sm sm:text-base text-slate-400 mb-7 leading-relaxed max-w-3xl mx-auto">
            DeliWer routes verified <strong className="text-white">rental-ready inventory</strong> across all major developers
            and communities to a closed broker pool — plus a secondary stream of{" "}
            <strong className="text-amber-300">distress &amp; below-market sale deals</strong> when sellers need speed.
          </p>

          {/* Developer logos strip */}
          <div className="flex flex-wrap gap-2 justify-center mb-3" data-testid="strip-developers">
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
          {/* Communities strip */}
          <div className="flex flex-wrap gap-1.5 justify-center mb-7 max-w-3xl mx-auto" data-testid="strip-communities">
            {COMMUNITIES.map((c) => (
              <span
                key={c}
                className="text-[10px] sm:text-xs px-2 py-0.5 rounded-full bg-emerald-500/5 border border-emerald-500/20 text-emerald-200/80"
                data-testid={`chip-community-${c.toLowerCase().replace(/\s+/g, "-")}`}
              >
                {c}
              </span>
            ))}
          </div>

          <div className="flex flex-wrap gap-3 justify-center">
            <a href="#request-access">
              <Button
                size="lg"
                className="bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-semibold"
                data-testid="button-hero-request-access"
              >
                Join Broker Network
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </a>
            <a href={WA_LINK} target="_blank" rel="noopener noreferrer">
              <Button
                size="lg"
                variant="outline"
                className="border-amber-500/50 text-amber-200 hover:bg-amber-500/10"
                data-testid="button-hero-whatsapp"
              >
                <Phone className="w-4 h-4 mr-2" />
                WhatsApp Broker Desk
              </Button>
            </a>
          </div>

          <p
            className="text-xs text-slate-400 mt-5 flex items-center justify-center gap-1.5"
            data-testid="text-trust-line"
          >
            <Lock className="w-3.5 h-3.5" />
            Commission-only · Zero signup fee · RERA-verified brokers only
          </p>

          <div className="mt-8 inline-flex items-center gap-2 bg-emerald-500/10 border border-emerald-500/30 text-emerald-200 rounded-full px-4 py-2 text-sm">
            <Sparkles className="w-4 h-4" />
            <strong className="text-white">100% commission-only referral model</strong> — earn on every closed lease &amp; sale
          </div>
        </div>
      </section>

      {/* SECTION 1B: PROOF STRIP */}
      <section className="border-b border-slate-800 bg-slate-950/60" data-testid="section-proof-strip">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6 grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
          {[
            { v: "10+", l: "Major developers covered" },
            { v: "Rental-First", l: "Primary deal flow" },
            { v: "Commission-Only", l: "Zero broker fees" },
            { v: "10 min", l: "WhatsApp response" },
          ].map((s, i) => (
            <div key={i} data-testid={`proof-stat-${i}`}>
              <div className="text-2xl sm:text-3xl font-black text-amber-300">{s.v}</div>
              <div className="text-[11px] uppercase tracking-widest text-slate-400 mt-1">
                {s.l}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* SECTION 1C: REQUEST ACCESS FORM (restored, in-page) */}
      <RequestAccessForm />

      {/* SECTION 2: POSITIONING */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
        <h2 className="text-3xl sm:text-4xl font-bold mb-5" data-testid="heading-positioning">
          Not another listing source
        </h2>
        <p className="text-lg text-slate-300 leading-relaxed mb-3">
          This is not a portal or open inventory list.
        </p>
        <p className="text-lg text-slate-300 leading-relaxed">
          We work with a small pool of brokers to route serious buyers into{" "}
          <strong className="text-white">below-market</strong> opportunities and help{" "}
          <strong className="text-white">close deals faster</strong>.
        </p>
      </section>

      {/* SECTION 3: VALUE STACK */}
      <section className="relative overflow-hidden border-y border-slate-800">
        <img
          src={dubaiApartment}
          alt="Luxury Dubai apartment interior"
          className="absolute inset-0 w-full h-full object-cover opacity-25"
          data-testid="img-value-bg"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-slate-950/90 via-slate-950/85 to-slate-950/90" />
        <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center mb-10">
            <h2 className="text-3xl sm:text-4xl font-bold" data-testid="heading-value-stack">
              What you unlock
            </h2>
          </div>
          <div className="grid sm:grid-cols-2 gap-5">
            {[
              {
                icon: Building2,
                text: (
                  <>
                    <strong className="text-white">Rental-first inventory</strong> across Emaar,
                    DAMAC, Nakheel, Sobha, Meraas, Aldar, Ellington &amp; more
                  </>
                ),
              },
              {
                icon: TrendingDown,
                text: (
                  <>
                    <strong className="text-white">Secondary distress &amp; below-market sale deals</strong>{" "}
                    when sellers need fast exit
                  </>
                ),
              },
              {
                icon: Zap,
                text: (
                  <>
                    <strong className="text-white">Faster lease &amp; closure cycles</strong> with
                    DeliWer move-in support (Ejari, DEWA, movers handled)
                  </>
                ),
              },
              {
                icon: Sparkles,
                text: (
                  <>
                    <strong className="text-white">100% commission-only</strong> — no signup,
                    no retainer, paid on every closed lease &amp; sale
                  </>
                ),
              },
            ].map((item, i) => (
              <Card
                key={i}
                className="bg-slate-950/60 border-slate-800 hover-elevate"
                data-testid={`card-value-${i}`}
              >
                <CardContent className="p-5 flex items-start gap-4">
                  <div className="w-11 h-11 rounded-lg bg-amber-500/15 flex items-center justify-center flex-shrink-0">
                    <item.icon className="w-5 h-5 text-amber-300" />
                  </div>
                  <p className="text-slate-300 leading-relaxed pt-2">{item.text}</p>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="mt-8 flex flex-wrap gap-3 justify-center">
            <a href="#request-access">
              <Button
                size="lg"
                className="bg-amber-500 hover:bg-amber-400 text-slate-950 font-semibold"
                data-testid="button-value-request-access"
              >
                Request Access <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </a>
          </div>
        </div>
      </section>

      {/* SECTION 3B: BROKER INTELLIGENCE + COMMISSION-ONLY ENGINE */}
      <section className="relative border-y border-emerald-500/20 bg-gradient-to-b from-slate-950 via-emerald-950/15 to-slate-950" data-testid="section-broker-intel">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center mb-10">
            <Badge className="bg-emerald-500/15 text-emerald-300 border-emerald-500/30 mb-3">
              <Crown className="w-3.5 h-3.5 mr-1.5" /> Broker Intelligence Engine
            </Badge>
            <h2 className="text-3xl sm:text-4xl font-bold mb-3" data-testid="heading-broker-intel">
              The Commission-Only Referral System Rewriting Dubai Real Estate
            </h2>
            <p className="text-slate-300 text-base sm:text-lg max-w-3xl mx-auto">
              Built for the post-war reality: shrinking demand, expat reshuffle, and an indigenous rental market
              that finally negotiates back. We arm you with the live signal — you close the deal.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-5 mb-10">
            {[
              {
                icon: TrendingDown,
                title: "Live Market Signal",
                desc: "Daily WhatsApp drops on rental demand by community, distress sale alerts, and developer-specific incentive windows.",
              },
              {
                icon: Building2,
                title: "Multi-Developer Reach",
                desc: "Emaar · DAMAC · Nakheel · Sobha · Meraas · Aldar · Azizi · Ellington · Binghatti — one broker pool, every major developer.",
              },
              {
                icon: Handshake,
                title: "Tenant & Buyer Routing",
                desc: "Indigenous-leaning tenants and serious buyers routed straight to vetted brokers — no portal, no cold leads.",
              },
              {
                icon: Sparkles,
                title: "Commission-Only Model",
                desc: "Zero signup. Zero retainer. Zero monthly fee. You earn on every closed lease, every sale, every move-in service.",
              },
              {
                icon: Zap,
                title: "60-Second Onboarding",
                desc: "RERA-verified brokers go live the same day — first inventory drop within 24 hours, paid out monthly.",
              },
              {
                icon: Lock,
                title: "Closed Network Advantage",
                desc: "Capped pool per community to protect deal density. Your leads don't compete with 500 other agents.",
              },
            ].map((item, i) => (
              <Card
                key={i}
                className="bg-slate-950/70 border-emerald-500/20 hover-elevate"
                data-testid={`card-intel-${i}`}
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

          {/* Commission tiers */}
          <div className="bg-slate-950/80 border border-amber-500/30 rounded-2xl p-6 sm:p-8" data-testid="card-commission-tiers">
            <h3 className="text-xl sm:text-2xl font-bold text-center mb-2">
              Commission-Only · Three Earning Layers
            </h3>
            <p className="text-center text-slate-400 text-sm mb-6">
              Stack all three. No caps. Paid monthly via bank transfer with full statement.
            </p>
            <div className="grid md:grid-cols-3 gap-4">
              {[
                {
                  tag: "Layer 1",
                  title: "Rental Commissions",
                  amt: "Standard 5%",
                  note: "Annual rent commission on every closed lease — landlord-paid.",
                  color: "border-emerald-500/40 bg-emerald-500/5",
                },
                {
                  tag: "Layer 2",
                  title: "Distress Sale Bonus",
                  amt: "Up to 3% gross",
                  note: "On below-market sale closures from our distress inventory feed.",
                  color: "border-amber-500/40 bg-amber-500/5",
                },
                {
                  tag: "Layer 3",
                  title: "Move-In Service Override",
                  amt: "AED 300–800/deal",
                  note: "Per buyer/tenant who uses DeliWer Ejari, DEWA, movers or AquaCafe.",
                  color: "border-orange-500/40 bg-orange-500/5",
                },
              ].map((t, i) => (
                <div
                  key={i}
                  className={`rounded-xl border ${t.color} p-5`}
                  data-testid={`tier-${i}`}
                >
                  <div className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2">
                    {t.tag}
                  </div>
                  <div className="text-base font-bold text-white mb-1">{t.title}</div>
                  <div className="text-2xl font-black text-amber-300 mb-2">{t.amt}</div>
                  <p className="text-xs text-slate-300 leading-relaxed">{t.note}</p>
                </div>
              ))}
            </div>
            <div className="mt-7 flex flex-wrap gap-3 justify-center">
              <a href="#request-access">
                <Button
                  size="lg"
                  className="bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-semibold"
                  data-testid="button-intel-request-access"
                >
                  Onboard as Broker · Free <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 4: WHY IT WORKS */}
      <section className="relative overflow-hidden">
        <img
          src={brokerHandshake}
          alt="Real estate broker handshake"
          className="absolute inset-0 w-full h-full object-cover opacity-20"
          data-testid="img-why-bg"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-950/85 to-slate-950" />
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-8">
          <h2 className="text-3xl sm:text-4xl font-bold" data-testid="heading-why-it-works">
            Why brokers are using this
          </h2>
        </div>
        <p className="text-lg text-slate-300 leading-relaxed text-center mb-8">
          In a slower market, <strong className="text-white">speed wins deals</strong>.
        </p>
        <div className="space-y-3 max-w-2xl mx-auto">
          {[
            "Remove friction at closing",
            "Offer a ready-to-move-in advantage to buyers",
            "Monetize beyond just commission",
          ].map((t) => (
            <div
              key={t}
              className="flex items-start gap-3 bg-slate-900/60 border border-slate-800 rounded-lg p-4"
              data-testid={`item-why-${t.toLowerCase().replace(/\s+/g, "-")}`}
            >
              <CheckCircle2 className="w-5 h-5 text-emerald-400 mt-0.5 flex-shrink-0" />
              <span className="text-slate-200">{t}</span>
            </div>
          ))}
        </div>
        </div>
      </section>

      {/* SECTION 5: SCARCITY */}
      <section className="bg-slate-900/40 border-y border-slate-800">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
          <Badge className="bg-red-500/15 text-red-300 border-red-500/30 mb-4">
            <Lock className="w-3.5 h-3.5 mr-1.5" /> Limited Spots
          </Badge>
          <h2 className="text-3xl sm:text-4xl font-bold mb-5" data-testid="heading-scarcity">
            Limited access
          </h2>
          <p className="text-lg text-slate-300 leading-relaxed mb-8">
            We're onboarding a small number of active brokers to keep deal flow
            high-quality.
          </p>
          <div className="space-y-3 text-left max-w-md mx-auto">
            {["Not open to everyone", "Priority given to brokers closing monthly deals"].map(
              (t) => (
                <div
                  key={t}
                  className="flex items-center gap-3 bg-slate-950/60 border border-amber-500/20 rounded-lg p-4"
                  data-testid={`item-scarcity-${t.toLowerCase().replace(/\s+/g, "-").slice(0, 30)}`}
                >
                  <CheckCircle2 className="w-5 h-5 text-amber-300 flex-shrink-0" />
                  <span className="text-slate-200">{t}</span>
                </div>
              )
            )}
          </div>
        </div>
      </section>

      {/* SECTION 6: PROCESS */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-10">
          <h2 className="text-3xl sm:text-4xl font-bold" data-testid="heading-process">
            How it works
          </h2>
        </div>
        <div className="grid md:grid-cols-3 gap-5">
          {[
            { n: "1", title: "Request access", desc: "Quick application — under 2 minutes." },
            {
              n: "2",
              title: "Get added to priority broker pool",
              desc: "Onboarded with deal flow & support.",
            },
            {
              n: "3",
              title: "Receive opportunities + close faster",
              desc: "Distress inventory + move-in support.",
            },
          ].map((s) => (
            <Card
              key={s.n}
              className="bg-slate-900/60 border-slate-800 hover-elevate"
              data-testid={`card-step-${s.n}`}
            >
              <CardContent className="p-6">
                <div className="w-10 h-10 rounded-full bg-amber-500 text-slate-950 font-bold flex items-center justify-center mb-3">
                  {s.n}
                </div>
                <h3 className="text-lg font-semibold text-white mb-1.5">{s.title}</h3>
                <p className="text-sm text-slate-400 leading-relaxed">{s.desc}</p>
              </CardContent>
            </Card>
          ))}
        </div>
        <div className="mt-8 flex flex-wrap gap-3 justify-center">
          <a href="#request-access">
            <Button
              size="lg"
              className="bg-amber-500 hover:bg-amber-400 text-slate-950 font-semibold"
              data-testid="button-process-request-access"
            >
              Request Access <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </a>
        </div>
      </section>

      {/* SECTION 6B: BROKER FAQ */}
      <section className="bg-slate-900/40 border-y border-slate-800" data-testid="section-faq">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center mb-8">
            <h2 className="text-3xl sm:text-4xl font-bold" data-testid="heading-faq">
              Broker FAQs
            </h2>
            <p className="text-slate-400 mt-2 text-sm">
              Quick answers to what brokers ask before joining
            </p>
          </div>
          <div className="space-y-3">
            {[
              {
                q: "Is this rental, sale, or both?",
                a: "Both — but rental is primary. The post-war population shift has flipped Dubai into a tenant-favoured market with supply outpacing demand. Sale deals are secondary, focused on distress and below-market inventory when sellers need a fast exit.",
              },
              {
                q: "Which developers and communities are covered?",
                a: "Emaar, DAMAC, Nakheel, Sobha, Meraas, Aldar, Azizi, Ellington, Binghatti, Dubai Properties — across Downtown, Marina, Business Bay, Dubai Hills, JVC, JVT, Palm Jumeirah, MBR City, Arabian Ranches, DAMAC Hills, Town Square, Al Furjan, JLT, Mirdif and more.",
              },
              {
                q: "Do I need a RERA card?",
                a: "Yes — active RERA-licensed brokers only. We verify before granting inventory access.",
              },
              {
                q: "Is there any signup or monthly fee?",
                a: "Zero. 100% commission-only. No signup, no retainer, no monthly. You only earn — we only earn when you close.",
              },
              {
                q: "How does the three-layer commission stack work?",
                a: "Layer 1: standard rental commission on every closed lease. Layer 2: up to 3% bonus on distress sale closures. Layer 3: AED 300–800 per move-in service (Ejari, DEWA, movers, AquaCafe). All paid monthly via bank transfer with full statement.",
              },
              {
                q: "Will I lose my client to DeliWer?",
                a: "Never. Your client stays your client — we only handle move-in logistics. You keep the relationship and full sales / leasing commission.",
              },
              {
                q: "How fast can I start?",
                a: "Same day. Submit the form or WhatsApp us — onboarded brokers receive their first inventory drop and live market signal within 24 hours.",
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

      {/* SECTION 7: FINAL CTA */}
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
            Get Access Before Slots Fill
          </h2>
          <p className="text-slate-300 mb-8 text-lg">
            Limited broker onboarding window. Priority for brokers closing monthly.
          </p>
          <div className="flex flex-wrap gap-3 justify-center">
            <a href="#request-access">
              <Button
                size="lg"
                className="bg-amber-500 hover:bg-amber-400 text-slate-950 font-semibold"
                data-testid="button-final-request-access"
              >
                Request Access <ArrowRight className="w-4 h-4 ml-2" />
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
          DeliWer Real Estate · DAMAC Preferred Partner
        </div>
        <div>realestate.deliwer.com · Dubai, UAE</div>
      </footer>

      {/* Sticky WhatsApp Button (mobile + desktop) */}
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
