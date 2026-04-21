import { useState, useRef } from "react";
import { Helmet } from "react-helmet";
import { useMutation } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
import {
  Building2,
  Home,
  Briefcase,
  TrendingDown,
  Handshake,
  Crown,
  Zap,
  ShieldCheck,
  Percent,
  KeyRound,
  Phone,
  ArrowRight,
  CheckCircle2,
  MapPin,
  Flame,
  Award,
} from "lucide-react";

const damacOffers = [
  {
    title: "DAMAC Hills 2 — Distress Resale",
    type: "Residential Villa",
    location: "Dubailand",
    priceLabel: "From AED 1.65M",
    discount: "Up to 22% below market",
    perks: ["Owner motivated", "Direct from owner", "DLD waiver applicable"],
    tag: "Hot Deal",
  },
  {
    title: "DAMAC Bay by Cavalli",
    type: "Luxury Branded Apartment",
    location: "Dubai Harbour",
    priceLabel: "From AED 2.95M",
    discount: "8% Preferred Partner Rebate",
    perks: ["Post-handover plan", "0% commission to buyer", "Furnished options"],
    tag: "Exclusive",
  },
  {
    title: "DAMAC Lagoons — Resale Inventory",
    type: "Townhouse / Villa",
    location: "Dubailand",
    priceLabel: "From AED 2.2M",
    discount: "Below original developer price",
    perks: ["Ready to move", "Crystal lagoon community", "High rental yield"],
    tag: "Distress",
  },
  {
    title: "DAMAC Towers — Business Bay",
    type: "Commercial / Serviced Office",
    location: "Business Bay",
    priceLabel: "Lease from AED 95/sqft",
    discount: "3 months rent-free option",
    perks: ["Fitted units", "Flexible payment", "Investor priced"],
    tag: "Commercial",
  },
];

const valueProps = [
  {
    icon: Crown,
    title: "DAMAC Preferred Partner",
    desc: "Direct access to exclusive DAMAC inventory, owner pools, and pre-launch allocations through our partnership track.",
  },
  {
    icon: TrendingDown,
    title: "Distress Deals First",
    desc: "Curated list of motivated-seller and post-war reset opportunities — both residential and commercial across Dubai.",
  },
  {
    icon: Zap,
    title: "Fast-Start Brokerage",
    desc: "New company setup with RERA-licensed brokers to capture immediate cash flow from rent and sales commissions.",
  },
  {
    icon: Handshake,
    title: "Owner-Direct Network",
    desc: "Close personal links with DAMAC owners unlock private listings unavailable on portals — better pricing, faster closings.",
  },
];

const fastStartSteps = [
  { step: "Day 1–7", title: "License & Brand", desc: "RERA brokerage license, trade name, ejari, and DAMAC partner onboarding." },
  { step: "Day 8–21", title: "Inventory & Listings", desc: "Lock exclusive DAMAC stock + 200+ distress resale & rental listings live." },
  { step: "Day 22–45", title: "First Commissions", desc: "Activate WhatsApp & buyer-network funnel; close first rent + resale deals." },
  { step: "Day 46–90", title: "Scale & Recur", desc: "Hire commission-only agents, layer property management & relocation upsell." },
];

export default function RealEstate() {
  const { toast } = useToast();
  const formRef = useRef<HTMLDivElement>(null);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    interest: "",
    propertyType: "",
    budget: "",
    message: "I am interested in DAMAC distress deals and brokerage opportunities.",
  });

  const leadMutation = useMutation({
    mutationFn: async (data: typeof formData) => {
      return await apiRequest("POST", "/api/leads", {
        name: data.name,
        email: data.email,
        phone: data.phone,
        service: "Real Estate — DAMAC Partner",
        message: `Interest: ${data.interest} | Type: ${data.propertyType} | Budget: ${data.budget} | ${data.message}`,
      });
    },
    onSuccess: () => {
      toast({
        title: "Request received",
        description: "Our DAMAC desk will reach out within 24 hours with matching inventory.",
      });
      setFormData({
        name: "",
        email: "",
        phone: "",
        interest: "",
        propertyType: "",
        budget: "",
        message: "I am interested in DAMAC distress deals and brokerage opportunities.",
      });
    },
    onError: () => {
      toast({
        title: "Could not submit",
        description: "Please try again or WhatsApp us directly.",
        variant: "destructive",
      });
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.phone) {
      toast({
        title: "Missing details",
        description: "Name, email and phone are required.",
        variant: "destructive",
      });
      return;
    }
    leadMutation.mutate(formData);
  };

  const scrollToForm = () => {
    formRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <Helmet>
        <title>DeliWer Real Estate — DAMAC Preferred Partner | Distress Deals Dubai</title>
        <meta
          name="description"
          content="Dubai commercial & residential distress deals, rentals and resale. DAMAC preferred partner brokerage with exclusive inventory, owner-direct pricing and fast-start commission model."
        />
        <meta property="og:title" content="DeliWer Real Estate — DAMAC Preferred Partner" />
        <meta
          property="og:description"
          content="Exclusive DAMAC inventory and distress deals in Dubai. Brokerage built for the post-war reset market."
        />
      </Helmet>
      {/* Hero */}
      <section className="relative overflow-hidden border-b border-amber-500/20">
        <div className="absolute inset-0 bg-gradient-to-br from-amber-500/10 via-slate-900 to-slate-950" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-28">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <Badge
                className="bg-amber-500/15 text-amber-300 border-amber-500/30 mb-5"
                data-testid="badge-damac-partner"
              >
                <Crown className="w-3.5 h-3.5 mr-1.5" /> DAMAC Preferred Partner
              </Badge>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight mb-5">
                Dubai Distress Deals &{" "}
                <span className="bg-gradient-to-r from-amber-400 to-orange-500 bg-clip-text text-transparent">
                  DAMAC Exclusives
                </span>
              </h1>
              <p className="text-lg text-slate-300 mb-7 leading-relaxed">
                A new brokerage built for the regional reset. Direct access to motivated-seller
                inventory, exclusive DAMAC allocations, and owner-direct rental & resale across
                Dubai's commercial and residential market.
              </p>
              <div className="flex flex-wrap gap-3">
                <Button
                  size="lg"
                  className="bg-amber-500 hover:bg-amber-400 text-slate-950 font-semibold"
                  onClick={scrollToForm}
                  data-testid="button-hero-get-deals"
                >
                  Get Today's Deal List
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="border-amber-500/40 text-amber-200 hover:bg-amber-500/10"
                  onClick={() =>
                    window.open(
                      "https://wa.me/971504547110?text=I%20want%20DAMAC%20distress%20deal%20list",
                      "_blank"
                    )
                  }
                  data-testid="button-hero-whatsapp"
                >
                  <Phone className="w-4 h-4 mr-2" />
                  WhatsApp Desk
                </Button>
              </div>
              <div className="grid grid-cols-3 gap-4 mt-10 max-w-lg">
                <div data-testid="stat-listings">
                  <div className="text-2xl font-bold text-amber-300">200+</div>
                  <div className="text-xs text-slate-400">Distress listings</div>
                </div>
                <div data-testid="stat-discount">
                  <div className="text-2xl font-bold text-amber-300">22%</div>
                  <div className="text-xs text-slate-400">Avg. below market</div>
                </div>
                <div data-testid="stat-close">
                  <div className="text-2xl font-bold text-amber-300">14d</div>
                  <div className="text-xs text-slate-400">Avg. close time</div>
                </div>
              </div>
            </div>

            <Card className="bg-slate-900/70 border-amber-500/20 backdrop-blur">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-amber-300">
                  <Flame className="w-5 h-5" />
                  Today's Featured Opportunity
                </CardTitle>
                <CardDescription className="text-slate-400">
                  Refreshed daily from owner-direct & DAMAC partner pool
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <div className="text-xl font-semibold text-[#ffffff]">DAMAC Hills 2 — 4BR Villa</div>
                    <div className="text-sm text-slate-400 flex items-center gap-1 mt-1">
                      <MapPin className="w-3.5 h-3.5" /> Dubailand
                    </div>
                  </div>
                  <Badge className="bg-red-500/15 text-red-300 border-red-500/30">
                    -22% Distress
                  </Badge>
                </div>
                <div className="grid grid-cols-2 gap-3 text-sm">
                  <div className="bg-slate-800/60 rounded-lg p-3">
                    <div className="text-slate-400 text-xs">Asking</div>
                    <div className="text-amber-300 font-semibold">AED 1.65M</div>
                  </div>
                  <div className="bg-slate-800/60 rounded-lg p-3">
                    <div className="text-slate-400 text-xs">Market</div>
                    <div className="text-slate-300 font-semibold line-through">AED 2.12M</div>
                  </div>
                </div>
                <ul className="text-sm text-slate-300 space-y-1.5">
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400" /> Motivated owner — quick close
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400" /> Vacant on transfer
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400" /> 0% buyer commission via partner
                  </li>
                </ul>
                <Button
                  className="w-full bg-amber-500 hover:bg-amber-400 text-slate-950 font-semibold"
                  onClick={scrollToForm}
                  data-testid="button-featured-claim"
                >
                  Reserve a Viewing
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
      {/* Value Props */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-12">
          <Badge className="bg-amber-500/15 text-amber-300 border-amber-500/30 mb-3">
            Why DeliWer Real Estate
          </Badge>
          <h2 className="text-3xl sm:text-4xl font-bold">
            Built for the Post-War Reset Market
          </h2>
          <p className="text-slate-400 mt-3 max-w-2xl mx-auto">
            Regional uncertainty has reshuffled Dubai's property cap stack. We turn that
            dislocation into commission income for brokers and below-market entry for buyers.
          </p>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {valueProps.map((vp) => (
            <Card
              key={vp.title}
              className="bg-slate-900/60 border-slate-800 hover-elevate"
              data-testid={`card-value-${vp.title.toLowerCase().replace(/\s+/g, "-")}`}
            >
              <CardHeader>
                <div className="w-11 h-11 rounded-lg bg-amber-500/15 flex items-center justify-center mb-2">
                  <vp.icon className="w-5 h-5 text-amber-300" />
                </div>
                <CardTitle className="text-lg text-[#ffffff]">{vp.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-slate-400 leading-relaxed">{vp.desc}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>
      {/* DAMAC Offers */}
      <section className="bg-slate-900/40 border-y border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="flex items-end justify-between flex-wrap gap-4 mb-8">
            <div>
              <Badge className="bg-amber-500/15 text-amber-300 border-amber-500/30 mb-3">
                Live Inventory
              </Badge>
              <h2 className="text-3xl sm:text-4xl font-bold">
                DAMAC Exclusive & Distress Picks
              </h2>
              <p className="text-slate-400 mt-2">
                Hand-picked across residential, branded, commercial and resale segments.
              </p>
            </div>
            <Button
              variant="outline"
              className="border-amber-500/40 text-amber-200 hover:bg-amber-500/10"
              onClick={scrollToForm}
              data-testid="button-request-full-list"
            >
              Request Full List
            </Button>
          </div>

          <div className="grid md:grid-cols-2 gap-5">
            {damacOffers.map((o, idx) => (
              <Card
                key={idx}
                className="bg-slate-950/60 border-slate-800 hover-elevate overflow-hidden"
                data-testid={`card-offer-${idx}`}
              >
                <CardHeader>
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <Badge className="bg-amber-500/15 text-amber-300 border-amber-500/30 mb-2">
                        {o.tag}
                      </Badge>
                      <CardTitle className="text-xl text-[#ffffff]">{o.title}</CardTitle>
                      <CardDescription className="text-slate-400 mt-1">
                        {o.type} · {o.location}
                      </CardDescription>
                    </div>
                    <div className="text-right">
                      <div className="text-amber-300 font-semibold">{o.priceLabel}</div>
                      <div className="text-xs text-emerald-400 mt-1">{o.discount}</div>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-1.5 text-sm text-slate-300 mb-4">
                    {o.perks.map((p) => (
                      <li key={p} className="flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                        {p}
                      </li>
                    ))}
                  </ul>
                  <Button
                    size="sm"
                    className="bg-amber-500 hover:bg-amber-400 text-slate-950 font-semibold"
                    onClick={scrollToForm}
                    data-testid={`button-offer-enquire-${idx}`}
                  >
                    Enquire Now <ArrowRight className="w-4 h-4 ml-1.5" />
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
      {/* Two business tracks */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid lg:grid-cols-2 gap-6">
          <Card className="bg-slate-900/60 border-amber-500/20">
            <CardHeader>
              <Badge className="bg-emerald-500/15 text-emerald-300 border-emerald-500/30 w-fit mb-2">
                For Buyers & Tenants
              </Badge>
              <CardTitle className="text-2xl flex items-center gap-2 text-[#ffffff]">
                <Home className="w-6 h-6 text-amber-300" />
                Residential & Commercial Deals
              </CardTitle>
              <CardDescription className="text-slate-400">
                Rent and buy below-market in the wake of the regional shake-out.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-3 text-sm text-slate-300">
              {[
                "Distress resale across DAMAC, Marina, JVC, Business Bay",
                "Commercial offices & retail with flexible payment terms",
                "Owner-direct rentals — no inflated portal pricing",
                "End-to-end concierge: ejari, DEWA, move-in (DeliWer ecosystem)",
              ].map((t) => (
                <div key={t} className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 mt-0.5 flex-shrink-0" />
                  <span>{t}</span>
                </div>
              ))}
              <Button
                className="bg-amber-500 hover:bg-amber-400 text-slate-950 font-semibold mt-3"
                onClick={scrollToForm}
                data-testid="button-track-buyers"
              >
                Send Me Matching Properties
              </Button>
            </CardContent>
          </Card>

          <Card className="bg-slate-900/60 border-amber-500/20">
            <CardHeader>
              <Badge className="bg-amber-500/15 text-amber-300 border-amber-500/30 w-fit mb-2">
                For Brokers & Partners
              </Badge>
              <CardTitle className="text-2xl flex items-center gap-2 text-[#ffffff]">
                <Briefcase className="w-6 h-6 text-amber-300" />
                Fast-Start Brokerage Model
              </CardTitle>
              <CardDescription className="text-slate-400">
                Commission-based seats inside a new RERA-licensed company built around DAMAC.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-3 text-sm text-slate-300">
              {[
                "Up to 70% commission split on closed deals",
                "Exclusive DAMAC inventory & qualified buyer leads",
                "WhatsApp + AI lead engine plugged into DeliWer network",
                "Zero desk fees — pure performance economics",
              ].map((t) => (
                <div key={t} className="flex items-start gap-2">
                  <Percent className="w-4 h-4 text-amber-300 mt-0.5 flex-shrink-0" />
                  <span>{t}</span>
                </div>
              ))}
              <Button
                className="bg-amber-500 hover:bg-amber-400 text-slate-950 font-semibold mt-3"
                onClick={scrollToForm}
                data-testid="button-track-brokers"
              >
                Apply as Broker Partner
              </Button>
            </CardContent>
          </Card>
        </div>
      </section>
      {/* Fast Start Roadmap */}
      <section className="bg-slate-900/40 border-y border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center mb-10">
            <Badge className="bg-amber-500/15 text-amber-300 border-amber-500/30 mb-3">
              90-Day Fast Start
            </Badge>
            <h2 className="text-3xl sm:text-4xl font-bold">From Setup to Cash in 90 Days</h2>
            <p className="text-slate-400 mt-3 max-w-2xl mx-auto">
              A focused playbook to stand up a DAMAC-anchored brokerage and start booking
              commissions immediately.
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {fastStartSteps.map((s, i) => (
              <Card
                key={s.step}
                className="bg-slate-950/60 border-slate-800"
                data-testid={`card-step-${i}`}
              >
                <CardContent className="p-5">
                  <div className="text-amber-300 text-xs font-semibold tracking-wider mb-2">
                    {s.step}
                  </div>
                  <div className="font-semibold mb-1.5 flex items-center gap-2 text-[#ffffff]">
                    <KeyRound className="w-4 h-4 text-amber-300" />
                    {s.title}
                  </div>
                  <p className="text-sm text-slate-400 leading-relaxed">{s.desc}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
      {/* Lead Form */}
      <section ref={formRef} className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <Card className="bg-slate-900/70 border-amber-500/30">
          <CardHeader className="text-center">
            <Badge className="bg-amber-500/15 text-amber-300 border-amber-500/30 mx-auto mb-3 w-fit">
              <Award className="w-3.5 h-3.5 mr-1.5" />
              Talk to the DAMAC Desk
            </Badge>
            <CardTitle className="text-2xl sm:text-3xl text-[#ffffff]">
              Get Distress Deals & Partner Terms
            </CardTitle>
            <CardDescription className="text-slate-400">
              Tell us what you need — we respond within 24 hours with matching inventory or
              partner pack.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="re-name" className="text-[#ffffff]">Full Name</Label>
                  <Input
                    id="re-name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="bg-slate-950 border-slate-700"
                    data-testid="input-name"
                  />
                </div>
                <div>
                  <Label htmlFor="re-phone" className="text-[#ffffff]">Phone / WhatsApp</Label>
                  <Input
                    id="re-phone"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="bg-slate-950 border-slate-700"
                    data-testid="input-phone"
                  />
                </div>
              </div>
              <div className="text-[#ffffff]">
                <Label htmlFor="re-email" className="text-[#ffffff]">Email</Label>
                <Input
                  id="re-email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="bg-slate-950 border-slate-700"
                  data-testid="input-email"
                />
              </div>
              <div className="grid sm:grid-cols-3 gap-4">
                <div className="text-[#ffffff]">
                  <Label className="text-[#ffffff]">I am a</Label>
                  <Select
                    value={formData.interest}
                    onValueChange={(v) => setFormData({ ...formData, interest: v })}
                  >
                    <SelectTrigger className="bg-slate-950 border-slate-700" data-testid="select-interest">
                      <SelectValue placeholder="Select" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="buyer">Buyer / Investor</SelectItem>
                      <SelectItem value="tenant">Tenant</SelectItem>
                      <SelectItem value="broker">Broker / Agent</SelectItem>
                      <SelectItem value="owner">Owner Selling</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label className="text-[#ffffff]">Property Type</Label>
                  <Select
                    value={formData.propertyType}
                    onValueChange={(v) => setFormData({ ...formData, propertyType: v })}
                  >
                    <SelectTrigger className="bg-slate-950 border-slate-700" data-testid="select-type">
                      <SelectValue placeholder="Select" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="apartment">Apartment</SelectItem>
                      <SelectItem value="villa">Villa / Townhouse</SelectItem>
                      <SelectItem value="commercial">Commercial / Office</SelectItem>
                      <SelectItem value="any">Any DAMAC Inventory</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label className="text-[#ffffff]">Budget</Label>
                  <Select
                    value={formData.budget}
                    onValueChange={(v) => setFormData({ ...formData, budget: v })}
                  >
                    <SelectTrigger className="bg-slate-950 border-slate-700" data-testid="select-budget">
                      <SelectValue placeholder="Select" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="under-1m">Under AED 1M</SelectItem>
                      <SelectItem value="1-3m">AED 1M – 3M</SelectItem>
                      <SelectItem value="3-7m">AED 3M – 7M</SelectItem>
                      <SelectItem value="7m-plus">AED 7M+</SelectItem>
                      <SelectItem value="rental">Rental Only</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div>
                <Label htmlFor="re-message" className="text-[#ffffff]">Notes</Label>
                <Textarea
                  id="re-message"
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  rows={3}
                  className="bg-slate-950 border-slate-700"
                  data-testid="input-message"
                />
              </div>
              <Button
                type="submit"
                size="lg"
                disabled={leadMutation.isPending}
                className="w-full bg-amber-500 hover:bg-amber-400 text-slate-950 font-semibold"
                data-testid="button-submit-lead"
              >
                {leadMutation.isPending ? "Sending..." : "Send My Request"}
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
              <p className="text-xs text-slate-500 text-center flex items-center justify-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5" />
                Confidential. Owner-direct. RERA-compliant.
              </p>
            </form>
          </CardContent>
        </Card>
      </section>
      <footer className="border-t border-slate-800 py-8 text-center text-sm text-slate-500">
        <div className="flex items-center justify-center gap-2 mb-1">
          <Building2 className="w-4 h-4 text-amber-300" />
          DeliWer Real Estate · DAMAC Preferred Partner
        </div>
        <div>realestate.deliwer.com · Dubai, UAE</div>
      </footer>
    </div>
  );
}
