import { SEOMeta } from "@/components/seo-meta";
import { Navigation } from "@/components/navigation";
import { Button } from "@/components/ui/button";
import { MessageSquare, Search, ArrowRight } from "lucide-react";
import { useLocation } from "wouter";
import { useMemo } from "react";

interface ServiceResult {
  title: string;
  description: string;
  url: string;
  keywords: string[];
  tag: string;
}

const SERVICES: ServiceResult[] = [
  {
    title: "Ejari Registration Dubai",
    description: "Register your tenancy contract through RERA-authorized Trustee Centers. AED 220, handled fully by DeliWer.",
    url: "/ejari-registration",
    keywords: ["ejari", "tenancy", "contract", "rera", "trustee", "landlord", "lease", "registration", "rent"],
    tag: "Legal",
  },
  {
    title: "DEWA Activation Dubai",
    description: "Coordinate your electricity and water connection for your new Dubai apartment. Fast, 1–3 day turnaround.",
    url: "/dewa-activation",
    keywords: ["dewa", "electricity", "water", "utility", "activation", "meter", "deposit", "connection", "power"],
    tag: "Utilities",
  },
  {
    title: "Move-In Concierge",
    description: "Full move-in bundle — Ejari, DEWA, professional movers, cleaning, internet setup. From AED 499.",
    url: "/move-in-services",
    keywords: ["move in", "moving", "movers", "relocation", "concierge", "bundle", "cleaning", "internet", "setup", "package", "apartment"],
    tag: "Concierge",
  },
  {
    title: "Flexible Monthly Rooms Dubai",
    description: "Rooms, shared villas, studios and bed spaces — monthly contracts, no annual commitment. From AED 550/mo.",
    url: "/flexible-rentals",
    keywords: ["room", "monthly", "flex", "accommodation", "shared", "villa", "studio", "bed space", "rent", "furnished", "short term", "partition"],
    tag: "Housing",
  },
  {
    title: "Broker Onboarding — Join DeliWer",
    description: "RERA-licensed brokers earn recurring commission on every service referral. No fee to join.",
    url: "/broker-onboard",
    keywords: ["broker", "agent", "rera license", "commission", "earn", "referral", "partner", "real estate agent", "join"],
    tag: "Brokers",
  },
  {
    title: "Dubai Business Setup & Golden Visa",
    description: "Free Zone company formation, mainland license, UAE Golden Visa, and investor visa assistance.",
    url: "/realestate",
    keywords: ["business", "freezone", "free zone", "company", "license", "visa", "golden", "investor", "setup", "mainland", "dafza", "incorporation"],
    tag: "Business",
  },
  {
    title: "Earn with DeliWer — Affiliate Program",
    description: "Share your referral link and earn commission every time someone books a DeliWer service.",
    url: "/earn",
    keywords: ["earn", "affiliate", "referral", "link", "income", "passive", "money", "reward", "commission"],
    tag: "Earn",
  },
  {
    title: "Water Filtration — AquaCafe & Icelandic Glacial",
    description: "Premium in-home water filtration, reverse osmosis systems, and shower filters for Dubai apartments.",
    url: "/products/icelandic-glacial",
    keywords: ["water filter", "aquacafe", "icelandic", "glacial", "filtration", "reverse osmosis", "shower filter", "drinking water", "ro"],
    tag: "Products",
  },
];

function score(service: ServiceResult, query: string): number {
  const q = query.toLowerCase();
  const words = q.split(/\s+/).filter(Boolean);
  let s = 0;
  for (const kw of service.keywords) {
    if (q.includes(kw)) s += kw.split(" ").length * 2;
  }
  for (const w of words) {
    if (service.title.toLowerCase().includes(w)) s += 3;
    if (service.description.toLowerCase().includes(w)) s += 1;
  }
  return s;
}

const TAG_COLORS: Record<string, string> = {
  Legal: "bg-blue-500/20 text-blue-300 border-blue-500/30",
  Utilities: "bg-yellow-500/20 text-yellow-300 border-yellow-500/30",
  Concierge: "bg-emerald-500/20 text-emerald-300 border-emerald-500/30",
  Housing: "bg-purple-500/20 text-purple-300 border-purple-500/30",
  Brokers: "bg-orange-500/20 text-orange-300 border-orange-500/30",
  Business: "bg-cyan-500/20 text-cyan-300 border-cyan-500/30",
  Earn: "bg-pink-500/20 text-pink-300 border-pink-500/30",
  Products: "bg-teal-500/20 text-teal-300 border-teal-500/30",
};

export default function SearchPage() {
  const [location] = useLocation();
  const params = new URLSearchParams(
    typeof window !== "undefined" ? window.location.search : ""
  );
  const query = params.get("q") || "";

  const results = useMemo(() => {
    if (!query.trim()) return SERVICES;
    return SERVICES.map((s) => ({ ...s, _score: score(s, query) }))
      .filter((s) => s._score > 0)
      .sort((a, b) => b._score - a._score);
  }, [query]);

  const waText = query
    ? `Hello DeliWer, I searched for "${query}" and need help. Can you assist?`
    : "Hello DeliWer, I need help finding the right service. Can you assist?";
  const waLink = `https://wa.me/971523906019?text=${encodeURIComponent(waText)}`;

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <SEOMeta
        title={query ? `Search: "${query}" | DeliWer Dubai` : "Search DeliWer Services Dubai"}
        description="Find Ejari registration, DEWA activation, monthly rooms, movers, business setup and more Dubai services from DeliWer."
        canonical="https://www.deliwer.com/search"
        noIndex={true}
      />
      <Navigation />

      <section className="pt-32 pb-20 px-4">
        <div className="max-w-3xl mx-auto">
          <div className="flex items-center gap-3 mb-2">
            <Search className="w-6 h-6 text-emerald-400" />
            <span className="text-emerald-400 font-semibold uppercase tracking-widest text-sm">Search</span>
          </div>

          {query ? (
            <h1 className="text-4xl md:text-5xl font-black uppercase tracking-tighter mb-2">
              Results for <span className="text-emerald-400">"{query}"</span>
            </h1>
          ) : (
            <h1 className="text-4xl md:text-5xl font-black uppercase tracking-tighter mb-2">
              All <span className="text-emerald-400">Services</span>
            </h1>
          )}

          <p className="text-gray-400 mb-10">
            {results.length > 0
              ? `${results.length} service${results.length !== 1 ? "s" : ""} found`
              : "No matching services — WhatsApp us below and we'll help directly."}
          </p>

          {results.length > 0 ? (
            <div className="space-y-4">
              {results.map((svc) => (
                <a
                  key={svc.url}
                  href={svc.url}
                  data-testid={`search-result-${svc.tag.toLowerCase()}`}
                  className="flex items-start justify-between gap-4 bg-white/5 border border-white/10 rounded-2xl p-6 hover:bg-white/10 hover:border-emerald-500/40 transition-all group"
                >
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-2">
                      <span
                        className={`text-xs font-bold uppercase tracking-widest px-2 py-0.5 rounded border ${TAG_COLORS[svc.tag] || "bg-white/10 text-gray-300 border-white/20"}`}
                      >
                        {svc.tag}
                      </span>
                    </div>
                    <h2 className="text-lg font-black uppercase tracking-tight mb-1 group-hover:text-emerald-400 transition-colors">
                      {svc.title}
                    </h2>
                    <p className="text-gray-400 text-sm leading-relaxed">{svc.description}</p>
                  </div>
                  <ArrowRight className="w-5 h-5 text-gray-500 group-hover:text-emerald-400 transition-colors flex-shrink-0 mt-1" />
                </a>
              ))}
            </div>
          ) : null}

          <div className="mt-10 bg-emerald-500/10 border border-emerald-500/30 rounded-2xl p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <p className="font-black uppercase tracking-tight text-white mb-1">
                Can't find what you need?
              </p>
              <p className="text-gray-400 text-sm">
                WhatsApp us — we'll find the right service for you in minutes.
              </p>
            </div>
            <a
              href={waLink}
              target="_blank"
              rel="noopener noreferrer"
              data-testid="button-search-whatsapp"
            >
              <Button className="bg-emerald-500 hover:bg-emerald-400 text-black font-black uppercase tracking-wider flex items-center gap-2 whitespace-nowrap">
                <MessageSquare className="w-4 h-4" />
                WhatsApp Us
              </Button>
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
