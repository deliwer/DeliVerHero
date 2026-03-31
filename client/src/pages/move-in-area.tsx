import { useEffect, useState } from "react";
import { useParams, Link } from "wouter";
import { SEOMeta } from "@/components/seo-meta";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  MessageCircle, ArrowRight, CheckCircle2, FileText, Truck,
  Zap, Wifi, Droplets, MapPin, Star, Users, Calculator,
  ExternalLink,
} from "lucide-react";
import {
  AREAS, PROPERTY_TYPES, TOP_AREAS_FOR_VARIANTS,
  getAreaBySlug, getOtherAreas,
} from "@/data/move-in-areas";

const WHATSAPP_NUMBER = "971523946311";

function buildWhatsAppLink(area: string, ref: string, source: string, propertyType?: string) {
  const propText = propertyType ? ` (${propertyType.toUpperCase()})` : "";
  const refText = ref ? ` Ref: ${ref}` : "";
  const text = `I found a property in ${area}${propText}. I want full move-in support.${refText}`;
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`;
}

// Static cost estimator
const APARTMENT_COSTS: Record<string, { movers: string; ejari: string; setup: string }> = {
  studio: { movers: "AED 800–1,200", ejari: "AED 320", setup: "AED 450–700" },
  "1br": { movers: "AED 1,000–1,800", ejari: "AED 320", setup: "AED 500–900" },
  "2br": { movers: "AED 1,400–2,500", ejari: "AED 320", setup: "AED 700–1,200" },
  "3br": { movers: "AED 2,000–3,500", ejari: "AED 320", setup: "AED 900–1,500" },
  villa: { movers: "AED 3,000–6,000", ejari: "AED 320", setup: "AED 1,200–2,000" },
};

function CostEstimator({ defaultType }: { defaultType?: string }) {
  const [aptType, setAptType] = useState(defaultType || "1br");
  const costs = APARTMENT_COSTS[aptType] || APARTMENT_COSTS["1br"];

  return (
    <div className="bg-slate-900 border border-slate-700 rounded-2xl p-6 space-y-5">
      <h3 className="text-lg font-black uppercase tracking-tight text-white flex items-center gap-2">
        <Calculator className="w-5 h-5 text-emerald-400" />
        Move-In Cost Estimator
      </h3>
      <div className="space-y-2">
        <label className="text-xs text-gray-400 uppercase font-black tracking-widest">Apartment Type</label>
        <div className="flex flex-wrap gap-2">
          {Object.entries(APARTMENT_COSTS).map(([key]) => (
            <button
              key={key}
              data-testid={`estimator-type-${key}`}
              onClick={() => setAptType(key)}
              className={`px-4 py-2 rounded-xl text-xs font-black uppercase border transition-all ${
                aptType === key
                  ? "bg-emerald-600 border-emerald-500 text-white"
                  : "bg-slate-800 border-slate-600 text-gray-400 hover:border-emerald-500"
              }`}
            >
              {key === "1br" ? "1 BR" : key === "2br" ? "2 BR" : key === "3br" ? "3 BR" : key.charAt(0).toUpperCase() + key.slice(1)}
            </button>
          ))}
        </div>
      </div>
      <div className="grid grid-cols-3 gap-3">
        <div className="bg-slate-800 rounded-xl p-3 text-center">
          <p className="text-xs text-gray-500 uppercase font-black mb-1">Movers</p>
          <p className="text-emerald-400 font-black text-sm">{costs.movers}</p>
        </div>
        <div className="bg-slate-800 rounded-xl p-3 text-center">
          <p className="text-xs text-gray-500 uppercase font-black mb-1">Ejari</p>
          <p className="text-emerald-400 font-black text-sm">{costs.ejari}</p>
        </div>
        <div className="bg-slate-800 rounded-xl p-3 text-center">
          <p className="text-xs text-gray-500 uppercase font-black mb-1">Setup</p>
          <p className="text-emerald-400 font-black text-sm">{costs.setup}</p>
        </div>
      </div>
      <p className="text-xs text-gray-500 font-medium">* Estimates only. Exact quotes provided via WhatsApp.</p>
    </div>
  );
}

export default function MoveInAreaPage() {
  const params = useParams<{ area: string; propertyType?: string }>();
  const areaSlug = params.area || "";
  const propertyTypeSlug = params.propertyType || "";

  // Referral tracking
  const [ref, setRef] = useState("");
  const [source, setSource] = useState("");

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const urlRef = urlParams.get("ref") || urlParams.get("agent") || "";
    const urlSource = urlParams.get("source") || "";

    if (urlRef) {
      localStorage.setItem("deliwer_ref", urlRef);
      setRef(urlRef);
    } else {
      setRef(localStorage.getItem("deliwer_ref") || "");
    }

    if (urlSource) {
      localStorage.setItem("deliwer_source", urlSource);
      setSource(urlSource);
    } else {
      setSource(localStorage.getItem("deliwer_source") || "");
    }
  }, []);

  const area = getAreaBySlug(areaSlug);
  const propertyType = propertyTypeSlug ? PROPERTY_TYPES[propertyTypeSlug] : null;
  const otherAreas = getOtherAreas(areaSlug, 10);

  // If area not found, show 404-like state
  if (!area) {
    return (
      <div className="min-h-screen bg-slate-950 text-white flex items-center justify-center">
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-black uppercase">Area Not Found</h1>
          <p className="text-gray-400">We couldn't find move-in info for that area.</p>
          <Link href="/move-in/jvc">
            <Button className="bg-emerald-600 hover:bg-emerald-500 rounded-2xl">Browse JVC</Button>
          </Link>
        </div>
      </div>
    );
  }

  const displayName = area.shortName ? `${area.name} (${area.shortName})` : area.name;
  const h1Area = propertyType ? `${propertyType.label} in ${area.name}` : area.name;
  const waLink = buildWhatsAppLink(area.name, ref, source, propertyType?.label);

  const metaTitle = propertyType
    ? `Move to ${area.name} – ${propertyType.label} | Ejari, Movers & Setup | DeliWer`
    : `Move to ${area.name} | Ejari, Movers & Setup | DeliWer`;

  const metaDescription = propertyType
    ? `Found a ${propertyType.label} in ${area.name}? Get Ejari, movers, and full move-in setup in one place. No upfront cost.`
    : `Found a home in ${area.name}? Get Ejari, movers, and full move-in setup in one place. No upfront cost.`;

  const isTopArea = TOP_AREAS_FOR_VARIANTS.includes(areaSlug);

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <SEOMeta
        title={metaTitle}
        description={metaDescription}
        canonical={`https://www.deliwer.com/move-in/${areaSlug}${propertyTypeSlug ? `/${propertyTypeSlug}` : ""}`}
        keywords={`move in ${area.name}, ejari ${area.name}, movers ${area.name}, dubai relocation ${area.name}, dewa ${area.name}, move to ${area.name} dubai${propertyType ? `, ${propertyType.label} ${area.name} dubai` : ""}`}
        serviceSchema={{
          name: `Move-In Services — ${area.name}${propertyType ? ` (${propertyType.label})` : ""}`,
          description: `Ejari registration, DEWA activation, movers, and full move-in coordination for tenants moving to ${area.name}, Dubai.`,
          area: area.name,
        }}
        faqs={[
          {
            question: `How do I register Ejari when moving to ${area.name}?`,
            answer: `After signing your tenancy contract in ${area.name}, you need to register it via Ejari — Dubai's official RERA system. DeliWer handles the full Ejari registration process for AED 320. Just send your tenancy contract and Emirates ID via WhatsApp.`,
          },
          {
            question: `How much does it cost to move into an apartment in ${area.name}?`,
            answer: `Moving into ${area.name} typically costs: Ejari registration AED 320, professional movers AED 800–2,500 depending on apartment size, DEWA connection fee AED 110, and optional cleaning AED 400–900. DeliWer can provide an exact quote.`,
          },
          {
            question: `Does DeliWer serve ${area.name}?`,
            answer: `Yes. DeliWer coordinates move-in services across all Dubai areas including ${area.name}. Contact us on WhatsApp with your property address and move-in date.`,
          },
          {
            question: `How long does DEWA activation take in ${area.name}?`,
            answer: `DEWA activation in ${area.name} takes 1–3 business days after Ejari registration is complete. DeliWer coordinates the DEWA connection as part of the move-in package.`,
          },
        ]}
      />

      {/* Hero */}
      <section className="relative py-24 px-4 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-950 via-emerald-950/20 to-slate-950" />
        <div className="max-w-4xl mx-auto text-center relative z-10 space-y-7">
          <Badge
            data-testid="badge-area-label"
            className="bg-emerald-500/10 text-emerald-400 border-emerald-500/20 px-4 py-2 text-xs font-black uppercase tracking-widest rounded-full"
          >
            <MapPin className="w-3.5 h-3.5 mr-1.5 inline" />
            {displayName} · Dubai
          </Badge>

          <h1 className="text-5xl md:text-6xl font-black tracking-tighter leading-[0.9] uppercase" data-testid="heading-area-title">
            Moving to{" "}
            <span className="text-emerald-400">{h1Area}?</span>
            <br />Complete Your Move-In in 24 Hours
          </h1>

          <p className="text-xl text-gray-400 font-medium max-w-2xl mx-auto leading-relaxed">
            Found a home on Bayut or Property Finder?{" "}
            <span className="text-white font-black">DeliWer handles everything after.</span>
          </p>

          {/* Services grid */}
          <div className="grid grid-cols-3 sm:grid-cols-6 gap-3 max-w-2xl mx-auto">
            {[
              { icon: FileText, label: "Ejari" },
              { icon: Truck, label: "Movers" },
              { icon: Zap, label: "DEWA" },
              { icon: Wifi, label: "Internet" },
              { icon: Droplets, label: "Water" },
              { icon: Star, label: "Cleaning" },
            ].map((s, i) => {
              const Icon = s.icon;
              return (
                <div key={i} className="bg-slate-900 border border-slate-700 rounded-2xl p-3 flex flex-col items-center gap-1.5">
                  <Icon className="w-4 h-4 text-emerald-400" />
                  <span className="text-xs font-black uppercase text-white">{s.label}</span>
                </div>
              );
            })}
          </div>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-2">
            <Button
              data-testid="button-whatsapp-primary"
              size="lg"
              className="bg-emerald-600 hover:bg-emerald-500 text-white font-black rounded-2xl px-10 h-14 text-lg shadow-2xl"
              onClick={() => window.open(waLink, "_blank")}
            >
              <MessageCircle className="w-5 h-5 mr-2" />
              Start My Move-In on WhatsApp
            </Button>
            <Link href="/ejari">
              <Button
                data-testid="button-ejari-link"
                size="lg"
                variant="outline"
                className="border-slate-600 text-white hover:bg-slate-800 rounded-2xl px-8 h-14"
              >
                <FileText className="w-4 h-4 mr-2" />
                Register Ejari
              </Button>
            </Link>
          </div>
          <p className="text-xs text-gray-500 font-medium uppercase tracking-widest">No signup · No account · 24H WhatsApp response</p>
        </div>
      </section>

      {/* Pain Points */}
      <section className="py-16 px-4 bg-slate-900/50 border-y border-white/5">
        <div className="max-w-3xl mx-auto space-y-6">
          <h2 className="text-3xl font-black uppercase tracking-tighter text-center">
            Why Move-In in {area.name} Is Stressful
          </h2>
          <div className="grid sm:grid-cols-2 gap-4">
            {[
              { title: "Ejari Delays", desc: "Registration takes days if you don't know the process — blocking DEWA connection." },
              { title: "Multiple Vendors", desc: "Coordinating movers, cleaning, and utilities separately wastes hours and causes conflicts." },
              { title: "Hidden Moving Costs", desc: "Unvetted movers quote low and add charges on the day. Know costs upfront." },
              { title: "Deposit Confusion", desc: "Security deposit rules, cheque formats, and handover receipts catch tenants off guard." },
            ].map((p, i) => (
              <div key={i} className="bg-slate-900 border border-slate-700 rounded-2xl p-5">
                <h3 className="font-black text-white uppercase text-sm mb-2">{p.title}</h3>
                <p className="text-gray-400 text-sm font-medium leading-relaxed">{p.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Solution */}
      <section className="py-16 px-4">
        <div className="max-w-3xl mx-auto text-center space-y-6">
          <Badge className="bg-slate-800 text-gray-300 border-slate-700 px-3 py-1 text-xs font-black uppercase tracking-widest rounded-full">
            The DeliWer Solution
          </Badge>
          <h2 className="text-4xl font-black uppercase tracking-tighter">
            One Platform. <span className="text-emerald-400">Zero Upfront Coordination Cost.</span>
          </h2>
          <p className="text-gray-400 font-medium leading-relaxed max-w-xl mx-auto">
            Message us on WhatsApp with your {area.name} address. We coordinate the entire move-in — one timeline, one contact, fully confirmed.
          </p>
          <div className="grid sm:grid-cols-3 gap-4 text-left pt-2">
            {[
              { step: "01", title: "Tell Us Your Property", desc: "Share your {area} address and move-in date on WhatsApp.".replace("{area}", area.name) },
              { step: "02", title: "We Coordinate", desc: "Ejari, movers, DEWA, internet, cleaning — all scheduled and confirmed." },
              { step: "03", title: "Move In Smoothly", desc: "Keys in hand, utilities live, home ready. Done in 24–72 hours." },
            ].map((s, i) => (
              <div key={i} className="bg-slate-900 border border-slate-700 rounded-2xl p-5 space-y-2">
                <span className="text-emerald-500 font-black text-xs uppercase tracking-widest">{s.step}</span>
                <h3 className="font-black text-white uppercase text-sm">{s.title}</h3>
                <p className="text-gray-400 text-sm font-medium leading-relaxed">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Included */}
      <section className="py-16 px-4 bg-slate-900/50 border-y border-white/5">
        <div className="max-w-3xl mx-auto space-y-8">
          <h2 className="text-3xl font-black uppercase tracking-tighter text-center">Services Included</h2>
          <div className="space-y-4">
            {[
              { icon: FileText, title: "Ejari Registration", desc: "Official RERA tenancy contract registration at Dubai Land Department-approved typing centres." },
              { icon: Truck, title: "Movers & Packing", desc: "Vetted moving companies with transparent quotes. No surprise charges on the day." },
              { icon: Zap, title: "DEWA Setup", desc: "Electricity and water connection activated before your move-in date." },
              { icon: Wifi, title: "Internet Connection", desc: "Etisalat or du plan selected, applied, and appointment booked for you." },
              { icon: Star, title: "Move-In Cleaning", desc: "Deep clean by professional teams so your new home is ready on arrival." },
              { icon: Droplets, title: "Storage (if needed)", desc: "Short-term storage solutions if your belongings arrive before your new home is ready." },
            ].map((s, i) => {
              const Icon = s.icon;
              return (
                <div key={i} className="flex gap-4 items-start">
                  <div className="w-10 h-10 bg-emerald-500/10 border border-emerald-500/20 rounded-xl flex items-center justify-center shrink-0">
                    <Icon className="w-5 h-5 text-emerald-400" />
                  </div>
                  <div>
                    <h3 className="font-black text-white uppercase text-sm mb-1">{s.title}</h3>
                    <p className="text-gray-400 text-sm font-medium leading-relaxed">{s.desc}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Cost Estimator */}
      <section className="py-16 px-4">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-3xl font-black uppercase tracking-tighter text-center mb-8">
            Estimate Your {area.name} Move-In Cost
          </h2>
          <CostEstimator defaultType={propertyTypeSlug || "1br"} />
        </div>
      </section>

      {/* Property type variants (only on area pages, not property type pages) */}
      {!propertyTypeSlug && isTopArea && (
        <section className="py-12 px-4 bg-slate-900/50 border-y border-white/5">
          <div className="max-w-3xl mx-auto space-y-5">
            <h2 className="text-2xl font-black uppercase tracking-tighter text-center">Browse by Property Type in {area.name}</h2>
            <div className="flex flex-wrap gap-3 justify-center">
              {["studio", "1br", "2br"].map((type) => (
                <Link key={type} href={`/move-in/${areaSlug}/${type}`}>
                  <button
                    data-testid={`link-property-type-${type}`}
                    className="bg-slate-800 hover:bg-emerald-600 border border-slate-600 hover:border-emerald-500 text-white font-black uppercase text-sm px-6 py-3 rounded-xl transition-all"
                  >
                    {type === "1br" ? "1 Bedroom" : type === "2br" ? "2 Bedroom" : "Studio"}
                  </button>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Trust block */}
      <section className="py-16 px-4">
        <div className="max-w-3xl mx-auto">
          <div className="bg-gradient-to-br from-emerald-950/40 to-slate-900 border border-emerald-500/20 rounded-2xl p-8 text-center space-y-4">
            <Users className="w-8 h-8 text-emerald-400 mx-auto" />
            <h2 className="text-2xl font-black uppercase tracking-tighter">Trusted Across Dubai</h2>
            <div className="grid sm:grid-cols-2 gap-4 text-left max-w-lg mx-auto">
              {[
                { label: "Used by tenants across Dubai", icon: CheckCircle2 },
                { label: "Partner network execution", icon: CheckCircle2 },
                { label: "Verified & licensed vendors", icon: CheckCircle2 },
                { label: "Transparent pricing always", icon: CheckCircle2 },
              ].map((t, i) => {
                const Icon = t.icon;
                return (
                  <div key={i} className="flex items-center gap-3">
                    <Icon className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span className="text-sm font-black text-gray-300">{t.label}</span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Existing funnel links */}
      <section className="py-12 px-4 border-t border-white/5">
        <div className="max-w-3xl mx-auto space-y-4">
          <h2 className="text-xl font-black uppercase tracking-tighter text-center text-gray-400">Related Services</h2>
          <div className="flex flex-wrap gap-3 justify-center">
            <Link href="/ejari">
              <button data-testid="link-ejari" className="flex items-center gap-2 bg-slate-800 border border-slate-700 text-gray-300 hover:text-white hover:border-emerald-500 font-black uppercase text-xs px-4 py-2 rounded-xl transition-all">
                <FileText className="w-3.5 h-3.5" /> Ejari Registration
              </button>
            </Link>
            <Link href="/ejari-dubai">
              <button data-testid="link-ejari-dubai" className="flex items-center gap-2 bg-slate-800 border border-slate-700 text-gray-300 hover:text-white hover:border-emerald-500 font-black uppercase text-xs px-4 py-2 rounded-xl transition-all">
                <FileText className="w-3.5 h-3.5" /> Ejari Dubai
              </button>
            </Link>
            <button
              data-testid="link-whatsapp-support"
              onClick={() => window.open(waLink, "_blank")}
              className="flex items-center gap-2 bg-slate-800 border border-slate-700 text-gray-300 hover:text-white hover:border-emerald-500 font-black uppercase text-xs px-4 py-2 rounded-xl transition-all"
            >
              <MessageCircle className="w-3.5 h-3.5" /> WhatsApp Support
            </button>
          </div>
        </div>
      </section>

      {/* Broker referral banner */}
      <section className="py-10 px-4 bg-slate-900/40 border-y border-white/5">
        <div className="max-w-2xl mx-auto flex flex-col sm:flex-row items-center gap-4 text-center sm:text-left">
          <div className="flex-1 space-y-1">
            <p className="font-black text-white uppercase text-sm">Are you an agent?</p>
            <p className="text-gray-400 text-sm font-medium">Earn by referring your clients to DeliWer move-in coordination.</p>
          </div>
          <Link href="/broker-partner">
            <Button
              data-testid="button-broker-referral"
              variant="outline"
              className="border-emerald-500/40 text-emerald-400 hover:bg-emerald-950/30 rounded-xl font-black uppercase text-xs shrink-0"
            >
              <ExternalLink className="w-3.5 h-3.5 mr-1.5" /> Earn as a Broker
            </Button>
          </Link>
        </div>
      </section>

      {/* Internal linking - Popular Move-In Areas */}
      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto space-y-6">
          <h2 className="text-2xl font-black uppercase tracking-tighter text-center">Popular Move-In Areas</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
            {otherAreas.map((a) => (
              <Link key={a.slug} href={`/move-in/${a.slug}`}>
                <div
                  data-testid={`link-area-${a.slug}`}
                  className="bg-slate-900 border border-slate-700 hover:border-emerald-500 rounded-xl p-3 text-center transition-all cursor-pointer group"
                >
                  <p className="text-xs font-black uppercase text-gray-400 group-hover:text-emerald-400 transition-colors leading-tight">
                    {a.shortName || a.name}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20 px-4 bg-emerald-950/20 border-t border-emerald-500/10 text-center">
        <div className="max-w-2xl mx-auto space-y-6">
          <h2 className="text-4xl font-black uppercase tracking-tighter">
            Ready to Move Into {area.name}?
          </h2>
          <p className="text-gray-400 font-medium">
            Tell us your situation — your coordinator confirms on WhatsApp within 10 minutes.
          </p>
          <Button
            data-testid="button-whatsapp-final-cta"
            size="lg"
            className="bg-emerald-600 hover:bg-emerald-500 text-white font-black rounded-2xl px-12 h-14 text-lg shadow-2xl"
            onClick={() => window.open(waLink, "_blank")}
          >
            <MessageCircle className="w-5 h-5 mr-2" />
            Start on WhatsApp <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        </div>
      </section>
    </div>
  );
}
