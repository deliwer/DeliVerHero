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
  "Apartments (1-2BR)",
  "Apartments (3BR+)",
  "Villas",
  "Townhouses",
  "Branded Residences",
  "Commercial / Business Bay",
  "Mixed — open to all",
];

const BUDGET_RANGES = [
  "Under AED 1M",
  "AED 1M – 3M",
  "AED 3M – 5M",
  "AED 5M – 10M",
  "AED 10M+",
  "Multiple buyers — varied",
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
            Request Broker Access
          </h2>
          <p className="text-slate-300 text-base sm:text-lg max-w-xl mx-auto">
            Tell us what your buyers are looking for. We'll match you to the live
            DAMAC distress inventory and onboard you within 24 hours.
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
            className="bg-amber-500/15 text-amber-300 border-amber-500/30 mb-5"
            data-testid="badge-broker-access"
          >
            <Crown className="w-3.5 h-3.5 mr-1.5" /> For Active Dubai Brokers
          </Badge>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight mb-5">
            Access{" "}
            <span className="bg-gradient-to-r from-amber-400 to-orange-500 bg-clip-text text-transparent">
              Below-Market DAMAC Units
            </span>{" "}
            + Close Deals Faster
          </h1>
          <p className="text-lg sm:text-xl text-slate-300 mb-7 leading-relaxed max-w-3xl mx-auto">
            For a limited group of active Dubai brokers. Get priority access to{" "}
            <strong className="text-white">distress-driven inventory</strong> +{" "}
            <strong className="text-white">earn more per transaction</strong>.
          </p>

          <div className="flex flex-wrap gap-3 justify-center">
            <a href="#request-access">
              <Button
                size="lg"
                className="bg-amber-500 hover:bg-amber-400 text-slate-950 font-semibold"
                data-testid="button-hero-request-access"
              >
                Request Access
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </a>
            <a href={WA_LINK} target="_blank" rel="noopener noreferrer">
              <Button
                size="lg"
                variant="outline"
                className="border-emerald-500/50 text-emerald-200 hover:bg-emerald-500/10"
                data-testid="button-hero-whatsapp"
              >
                <Phone className="w-4 h-4 mr-2" />
                WhatsApp Now
              </Button>
            </a>
          </div>

          <p
            className="text-xs text-slate-400 mt-5 flex items-center justify-center gap-1.5"
            data-testid="text-trust-line"
          >
            <Lock className="w-3.5 h-3.5" />
            Limited broker onboarding • Priority access
          </p>

          <div className="mt-8 inline-flex items-center gap-2 bg-emerald-500/10 border border-emerald-500/30 text-emerald-200 rounded-full px-4 py-2 text-sm">
            <Sparkles className="w-4 h-4" />
            Earn <strong className="text-white">AED 300–800 extra per deal</strong>{" "}
            via DeliWer move-in services
          </div>
        </div>
      </section>

      {/* SECTION 1B: PROOF STRIP */}
      <section className="border-b border-slate-800 bg-slate-950/60" data-testid="section-proof-strip">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6 grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
          {[
            { v: "120+", l: "Active Dubai brokers" },
            { v: "AED 800", l: "Avg extra per deal" },
            { v: "10 min", l: "WhatsApp response" },
            { v: "DAMAC", l: "Preferred Partner" },
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
                icon: TrendingDown,
                text: (
                  <>
                    <strong className="text-white">Distress-driven DAMAC inventory</strong>{" "}
                    (below market)
                  </>
                ),
              },
              {
                icon: Zap,
                text: (
                  <>
                    <strong className="text-white">Faster deal closures</strong> with move-in
                    support (utilities, essentials handled)
                  </>
                ),
              },
              {
                icon: Sparkles,
                text: (
                  <>
                    <strong className="text-white">Additional commission layer</strong> via
                    DeliWer services
                  </>
                ),
              },
              {
                icon: Handshake,
                text: <>Buyer routing (when available)</>,
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
                q: "Do I need a RERA card?",
                a: "Yes — active RERA-licensed brokers only. We verify before granting inventory access.",
              },
              {
                q: "Is there any signup fee?",
                a: "No fees. Free to join. You only earn — we get paid when your buyer closes.",
              },
              {
                q: "How is the AED 300–800 extra paid?",
                a: "Per move-in service your buyer takes (Ejari, DEWA, movers, AquaCafe). Paid monthly via bank transfer with full statement.",
              },
              {
                q: "Will I lose my client to DeliWer?",
                a: "Never. Your client stays your client — we only handle move-in logistics. You keep the relationship and full sales commission.",
              },
              {
                q: "How fast can I start?",
                a: "Same day. Submit the form or WhatsApp us — onboarded brokers receive their first inventory drop within 24 hours.",
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
