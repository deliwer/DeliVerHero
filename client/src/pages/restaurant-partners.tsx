import { useMemo, useState } from "react";
import { Link } from "wouter";
import {
  MapPin, Clock, Phone, MessageCircle, Search, Utensils, Bike,
  Gift, Star, ChefHat, Navigation, ArrowLeft, Droplets,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";

const WA_NUMBER = "971523906019";
const waLink = (msg: string) =>
  `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(msg)}`;

type Partner = {
  id: string;
  name: string;
  area: string;
  address: string;
  cuisines: string[];
  signature: string[];
  hours: string;
  delivery: { radiusKm: number; eta: string; minOrder: number; fee: number };
  mapsUrl: string;
  voucher: string;
  flagship?: boolean;
};

const PARTNERS: Partner[] = [
  {
    id: "chill-grill-business-bay",
    name: "Chill & Grill — Business Bay",
    area: "Business Bay",
    address: "Clover Bay Tower, Business Bay, Dubai",
    cuisines: ["Healthy Bowls", "Grill", "Breakfast", "Family"],
    signature: ["Family Grill Platter", "Kangen-infused Smoothies", "Fresh Bread Daily"],
    hours: "Daily · 9AM – 11PM",
    delivery: { radiusKm: 8, eta: "30–45 min", minOrder: 60, fee: 0 },
    mapsUrl: "https://maps.app.goo.gl/CPc5Ms4rToGQdYxg7",
    voucher: "AED 100 voucher accepted",
    flagship: true,
  },
  {
    id: "boba-downtown",
    name: "Boba & Bites — Downtown",
    area: "Downtown Dubai",
    address: "Burj Views, Downtown Dubai",
    cuisines: ["Boba Tea", "Snacks", "Desserts"],
    signature: ["Boba Tea for Two", "Matcha Cloud", "Dessert Box"],
    hours: "Daily · 10AM – 12AM",
    delivery: { radiusKm: 6, eta: "25–40 min", minOrder: 45, fee: 5 },
    mapsUrl: "https://maps.google.com/?q=Downtown+Dubai",
    voucher: "AED 100 voucher accepted",
  },
  {
    id: "pizza-marina",
    name: "Stone Oven Pizzeria — Marina",
    area: "Dubai Marina",
    address: "Marina Walk, Dubai Marina",
    cuisines: ["Pizza", "Italian", "Family"],
    signature: ["Pizza for Two", "Truffle Margherita", "Garlic Knots"],
    hours: "Daily · 11AM – 1AM",
    delivery: { radiusKm: 7, eta: "30–50 min", minOrder: 70, fee: 8 },
    mapsUrl: "https://maps.google.com/?q=Dubai+Marina",
    voucher: "AED 100 voucher accepted",
  },
  {
    id: "healthy-jlt",
    name: "Green Leaf Kitchen — JLT",
    area: "Jumeirah Lake Towers",
    address: "Cluster Y, JLT, Dubai",
    cuisines: ["Healthy Bowls", "Vegan", "Breakfast"],
    signature: ["Power Breakfast Combo", "Quinoa Bowl", "Cold-Pressed Juices"],
    hours: "Daily · 8AM – 10PM",
    delivery: { radiusKm: 6, eta: "25–40 min", minOrder: 50, fee: 5 },
    mapsUrl: "https://maps.google.com/?q=JLT+Dubai",
    voucher: "AED 100 voucher accepted",
  },
  {
    id: "grill-jvc",
    name: "Smoke House Grill — JVC",
    area: "Jumeirah Village Circle",
    address: "Circle Mall, JVC, Dubai",
    cuisines: ["Grill", "BBQ", "Family"],
    signature: ["Family Grill", "Charcoal Wings", "Lamb Chops"],
    hours: "Daily · 12PM – 12AM",
    delivery: { radiusKm: 7, eta: "35–55 min", minOrder: 60, fee: 7 },
    mapsUrl: "https://maps.google.com/?q=JVC+Dubai",
    voucher: "AED 100 voucher accepted",
  },
  {
    id: "breakfast-deira",
    name: "Sunrise Café — Deira",
    area: "Deira",
    address: "Al Rigga, Deira, Dubai",
    cuisines: ["Breakfast", "Bakery", "Coffee"],
    signature: ["Breakfast Combo", "Fresh Bakery Box", "Specialty Coffee"],
    hours: "Daily · 7AM – 11PM",
    delivery: { radiusKm: 5, eta: "25–40 min", minOrder: 40, fee: 5 },
    mapsUrl: "https://maps.google.com/?q=Deira+Dubai",
    voucher: "AED 100 voucher accepted",
  },
];

const CUISINE_FILTERS = [
  "All", "Healthy Bowls", "Grill", "Pizza", "Boba Tea", "Breakfast", "Vegan", "BBQ", "Family",
];

export default function RestaurantPartners() {
  const [query, setQuery] = useState("");
  const [cuisine, setCuisine] = useState("All");

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return PARTNERS.filter((p) => {
      const matchesQuery =
        !q ||
        p.name.toLowerCase().includes(q) ||
        p.area.toLowerCase().includes(q) ||
        p.cuisines.some((c) => c.toLowerCase().includes(q));
      const matchesCuisine = cuisine === "All" || p.cuisines.includes(cuisine);
      return matchesQuery && matchesCuisine;
    });
  }, [query, cuisine]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-white to-emerald-50">
      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-br from-amber-600 via-orange-600 to-emerald-700 text-white">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.15),transparent_60%)]" />
        <div className="relative max-w-6xl mx-auto px-4 py-14 sm:py-20">
          <Link
            href="/aquacafe-alliance"
            className="inline-flex items-center gap-2 text-white/80 hover:text-white text-sm mb-6"
            data-testid="link-back-alliance"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to AquaCafe Alliance
          </Link>

          <div className="inline-flex items-center gap-2 bg-white/15 backdrop-blur-sm rounded-full px-4 py-1.5 mb-5 text-xs font-bold uppercase tracking-widest border border-white/20">
            <Bike className="w-4 h-4" />
            Chill &amp; Grill Home Delivery Network
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black mb-4 drop-shadow">
            Restaurant Partner Directory
          </h1>
          <p className="text-lg sm:text-xl text-white/90 max-w-3xl mb-7 leading-relaxed">
            Order home delivery from your nearest <strong>Chill &amp; Grill</strong> partner —
            redeem your <strong>AED 100 referral voucher</strong>, choose from a variety of menus,
            and enjoy meals paired with revitalized Kangen Water.
          </p>

          {/* Quick stats */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 max-w-3xl">
            <Stat label="Partner Restaurants" value={`${PARTNERS.length}+`} />
            <Stat label="Delivery Radius" value="Up to 8 km" />
            <Stat label="Avg. ETA" value="30–45 min" />
            <Stat label="Voucher Value" value="AED 100" />
          </div>
        </div>
      </section>

      {/* How home delivery works */}
      <section className="w-full py-12 px-4 bg-white border-b border-gray-100">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">
            How Chill &amp; Grill Home Delivery Works
          </h2>
          <p className="text-gray-600 mb-8 max-w-2xl">
            One network, many menus. Your AquaCafe membership unlocks delivery + voucher redemption across
            every partner — find the nearest one and order in minutes.
          </p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { icon: MapPin, title: "1. Find Nearest", text: "Search by area or cuisine to find the closest partner in our network." },
              { icon: Utensils, title: "2. Pick a Menu", text: "Browse signature dishes — pizza, grill, boba, healthy bowls, breakfast." },
              { icon: Bike, title: "3. Order Delivery", text: "Place your order on WhatsApp — delivery within 30–45 minutes typically." },
              { icon: Gift, title: "4. Redeem Voucher", text: "Apply your AED 100 referral voucher at checkout. Stack with member perks." },
            ].map(({ icon: Icon, title, text }) => (
              <div
                key={title}
                className="bg-gradient-to-br from-amber-50 to-emerald-50 rounded-2xl p-5 border border-amber-100"
                data-testid={`step-${title.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`}
              >
                <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-amber-500 to-orange-500 flex items-center justify-center mb-3 shadow-md">
                  <Icon className="w-5 h-5 text-white" />
                </div>
                <div className="font-bold text-gray-900 mb-1">{title}</div>
                <div className="text-sm text-gray-600 leading-snug">{text}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Filters */}
      <section className="w-full py-8 px-4 bg-gray-50 border-b border-gray-100 sticky top-0 z-10 backdrop-blur-sm bg-gray-50/90">
        <div className="max-w-6xl mx-auto flex flex-col gap-4">
          <div className="flex items-center gap-3">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <Input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search by name, area, or cuisine (e.g. Marina, pizza, boba)…"
                className="pl-9 bg-white"
                data-testid="input-search-partners"
              />
            </div>
            <Badge variant="secondary" className="hidden sm:inline-flex" data-testid="text-results-count">
              {filtered.length} result{filtered.length === 1 ? "" : "s"}
            </Badge>
          </div>
          <div className="flex flex-wrap gap-2">
            {CUISINE_FILTERS.map((c) => (
              <button
                key={c}
                onClick={() => setCuisine(c)}
                data-testid={`filter-cuisine-${c.toLowerCase().replace(/\s+/g, "-")}`}
                className={`text-xs font-bold px-3 py-1.5 rounded-full border transition-colors ${
                  cuisine === c
                    ? "bg-amber-500 text-slate-950 border-amber-500"
                    : "bg-white text-gray-700 border-gray-200 hover:border-amber-300"
                }`}
              >
                {c}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Partner Grid */}
      <section className="w-full py-12 px-4">
        <div className="max-w-6xl mx-auto">
          {filtered.length === 0 ? (
            <div className="text-center py-16 text-gray-500" data-testid="text-no-results">
              No partners match your search. Try a different area or cuisine.
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filtered.map((p) => (
                <PartnerCard key={p.id} partner={p} />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Become a partner */}
      <section className="w-full py-14 px-4 bg-gradient-to-br from-emerald-700 to-amber-700 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <ChefHat className="w-10 h-10 mx-auto mb-3 text-amber-200" />
          <h2 className="text-3xl sm:text-4xl font-bold mb-3">
            Run a restaurant? Join the Chill &amp; Grill network.
          </h2>
          <p className="text-white/90 max-w-2xl mx-auto mb-6">
            Acquire new customers from the AquaCafe member base, accept the AED 100 referral voucher,
            and design your own menu offers. Zero onboarding fees.
          </p>
          <Button
            onClick={() =>
              window.open(
                waLink(
                  "Hi DeliWer! I run a restaurant in Dubai and would like to join the Chill & Grill home delivery partner network."
                ),
                "_blank"
              )
            }
            data-testid="button-wa-become-partner"
            className="bg-[#25D366] hover:bg-[#1ebe57] text-white text-lg px-8 py-4 rounded-full font-bold shadow-2xl"
          >
            <MessageCircle className="w-5 h-5 mr-2" />
            Apply on WhatsApp
          </Button>
        </div>
      </section>
    </div>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="bg-white/10 backdrop-blur-sm border border-white/15 rounded-xl px-4 py-3">
      <div className="text-2xl font-black">{value}</div>
      <div className="text-[11px] uppercase tracking-widest text-white/80">{label}</div>
    </div>
  );
}

function PartnerCard({ partner }: { partner: Partner }) {
  const orderMsg = `Hi! I'd like to order home delivery from ${partner.name} (${partner.area}) and apply my AED 100 AquaCafe referral voucher.`;
  return (
    <div
      className="bg-white rounded-2xl border border-gray-200 shadow-sm hover:shadow-xl transition-shadow overflow-hidden flex flex-col"
      data-testid={`card-partner-${partner.id}`}
    >
      <div className="p-5 flex-1 flex flex-col">
        <div className="flex items-start justify-between gap-2 mb-2">
          <div>
            <div className="flex items-center gap-2 flex-wrap">
              <h3 className="text-lg font-bold text-gray-900" data-testid={`text-partner-name-${partner.id}`}>
                {partner.name}
              </h3>
              {partner.flagship && (
                <Badge className="bg-amber-500 text-slate-950 hover:bg-amber-500 text-[10px]">
                  <Star className="w-3 h-3 mr-1" /> Flagship
                </Badge>
              )}
            </div>
            <div className="flex items-center gap-1.5 text-xs text-gray-500 mt-1">
              <MapPin className="w-3.5 h-3.5 text-amber-500" />
              {partner.area}
            </div>
          </div>
        </div>

        <div className="text-sm text-gray-600 mb-3">{partner.address}</div>

        <div className="flex flex-wrap gap-1.5 mb-3">
          {partner.cuisines.map((c) => (
            <span key={c} className="text-[11px] px-2 py-0.5 rounded-full bg-amber-50 border border-amber-200 text-amber-700 font-semibold">
              {c}
            </span>
          ))}
        </div>

        <div className="bg-gray-50 rounded-xl p-3 mb-3">
          <div className="text-[11px] uppercase tracking-widest text-gray-500 font-bold mb-1.5 flex items-center gap-1.5">
            <Utensils className="w-3.5 h-3.5 text-orange-500" /> Signature Menus
          </div>
          <ul className="text-sm text-gray-700 space-y-0.5">
            {partner.signature.map((s) => (
              <li key={s}>• {s}</li>
            ))}
          </ul>
        </div>

        <div className="grid grid-cols-2 gap-2 text-xs mb-3">
          <InfoRow icon={Bike} label="ETA" value={partner.delivery.eta} />
          <InfoRow icon={Navigation} label="Radius" value={`${partner.delivery.radiusKm} km`} />
          <InfoRow icon={Clock} label="Hours" value={partner.hours.replace("Daily · ", "")} />
          <InfoRow
            icon={Gift}
            label="Delivery"
            value={partner.delivery.fee === 0 ? "FREE" : `AED ${partner.delivery.fee}`}
          />
        </div>

        <div className="flex items-center gap-2 bg-emerald-50 border border-emerald-200 rounded-lg px-3 py-2 mb-4">
          <Droplets className="w-4 h-4 text-emerald-600 shrink-0" />
          <div className="text-xs text-emerald-800 font-semibold">
            {partner.voucher} · Min order AED {partner.delivery.minOrder}
          </div>
        </div>

        <div className="mt-auto grid grid-cols-2 gap-2">
          <Button
            onClick={() => window.open(waLink(orderMsg), "_blank")}
            data-testid={`button-order-${partner.id}`}
            className="bg-[#25D366] hover:bg-[#1ebe57] text-white font-bold text-sm"
          >
            <MessageCircle className="w-4 h-4 mr-1.5" />
            Order
          </Button>
          <a
            href={partner.mapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            data-testid={`link-maps-${partner.id}`}
            className="inline-flex items-center justify-center gap-1.5 bg-white border border-gray-300 text-gray-800 font-bold text-sm rounded-md hover:bg-gray-50 transition-colors"
          >
            <MapPin className="w-4 h-4" />
            Maps
          </a>
        </div>
      </div>
    </div>
  );
}

function InfoRow({
  icon: Icon,
  label,
  value,
}: {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  value: string;
}) {
  return (
    <div className="flex items-center gap-1.5 text-gray-600">
      <Icon className="w-3.5 h-3.5 text-amber-500 shrink-0" />
      <span className="text-gray-500">{label}:</span>
      <span className="font-semibold text-gray-800 truncate">{value}</span>
    </div>
  );
}
