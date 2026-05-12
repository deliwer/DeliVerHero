import { useState, useMemo, useEffect } from "react";
import { motion } from "framer-motion";
import { Navigation } from "@/components/navigation";
import { SEOMeta } from "@/components/seo-meta";
import { MessageCircle, MapPin, Key } from "lucide-react";
import {
  FLEXIBLE_LISTINGS,
  PROPERTY_TYPE_LABELS,
  type PropertyType,
  type FlexibleListing,
} from "@/data/flexible-rentals";
import { logEvent } from "@/lib/referral";

const WA_NUMBER = "971523946311";

const TYPE_PILLS: { label: string; value: PropertyType | "all" }[] = [
  { label: "All", value: "all" },
  { label: "Villa Room", value: "villa-share" },
  { label: "Private Room", value: "room" },
  { label: "Studio", value: "studio" },
  { label: "Partition", value: "partition" },
  { label: "Bed Space", value: "bedspace" },
];

function buildWAInquiry(listing: FlexibleListing, brokerRef: string): string {
  return [
    `Hello DeliWer 👋`,
    `I'm interested in ${listing.title} in ${listing.area}.`,
    `Monthly Price: AED ${listing.monthlyPrice.toLocaleString()}`,
    brokerRef ? `Referred by: ${brokerRef}` : "",
  ]
    .filter(Boolean)
    .join("\n");
}

function buildGeneralWA(brokerRef: string): string {
  return [
    `Hello DeliWer 👋`,
    `I'm looking for flexible accommodation in Dubai — no annual contract.`,
    `Please help me find the right option.`,
    brokerRef ? `Referred by: ${brokerRef}` : "",
  ]
    .filter(Boolean)
    .join("\n");
}

function ListingCard({
  listing,
  brokerRef,
}: {
  listing: FlexibleListing;
  brokerRef: string;
}) {
  function inquire() {
    const msg = buildWAInquiry(listing, brokerRef);
    logEvent({
      ref: brokerRef || undefined,
      page: `/flexible-rentals`,
      timestamp: new Date().toISOString(),
      action: "whatsapp_click",
    });
    window.open(
      `https://wa.me/${listing.whatsappNumber}?text=${encodeURIComponent(msg)}`,
      "_blank"
    );
  }

  const typeLabel = PROPERTY_TYPE_LABELS[listing.type];
  const topAmenities = listing.amenities.slice(0, 3);

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.35 }}
      className="bg-slate-900/60 border border-white/8 rounded-2xl p-6 flex flex-col gap-5 hover:border-white/15 transition-colors"
    >
      <div className="flex flex-col gap-1.5">
        <span className="text-xs text-gray-500 font-medium">{typeLabel} · {listing.area}</span>
        <h3 className="text-white font-semibold text-base leading-snug">{listing.title}</h3>
        {listing.highlight && (
          <p className="text-emerald-400 text-sm">{listing.highlight}</p>
        )}
      </div>

      <div className="flex items-end gap-1">
        <span className="text-2xl font-bold text-white">
          AED {listing.monthlyPrice.toLocaleString()}
        </span>
        <span className="text-gray-500 text-sm mb-0.5">/month</span>
        {listing.billsIncluded && (
          <span className="ml-2 mb-0.5 text-xs text-teal-400 font-medium">bills incl.</span>
        )}
      </div>

      <div className="flex flex-wrap gap-2">
        {topAmenities.map((a) => (
          <span
            key={a}
            className="text-xs text-gray-500 bg-white/5 rounded-lg px-2.5 py-1"
          >
            {a}
          </span>
        ))}
      </div>

      <div className="flex items-center justify-between pt-1 border-t border-white/5">
        <span className="text-xs text-gray-600">Available: {listing.availableFrom}</span>
        <button
          onClick={inquire}
          data-testid={`button-inquire-${listing.id}`}
          className="flex items-center gap-1.5 bg-[#25D366] hover:bg-[#22c55e] text-white text-xs font-semibold px-4 py-2 rounded-xl transition-colors"
        >
          <MessageCircle className="w-3.5 h-3.5" />
          Inquire
        </button>
      </div>
    </motion.div>
  );
}

export default function FlexibleRentalsPage() {
  const [selectedType, setSelectedType] = useState<PropertyType | "all">("all");

  const brokerRef = useMemo(() => {
    if (typeof window === "undefined") return "";
    const params = new URLSearchParams(window.location.search);
    return (
      params.get("ref") ||
      params.get("broker") ||
      params.get("partner") ||
      localStorage.getItem("deliwer_ref") ||
      ""
    );
  }, []);

  useEffect(() => {
    if (brokerRef) {
      logEvent({
        ref: brokerRef,
        page: "/flexible-rentals",
        timestamp: new Date().toISOString(),
        action: "page_visit",
      });
    }
  }, [brokerRef]);

  const filtered = useMemo(() => {
    if (selectedType === "all") return FLEXIBLE_LISTINGS;
    return FLEXIBLE_LISTINGS.filter((l) => l.type === selectedType);
  }, [selectedType]);

  function openWA() {
    const msg = buildGeneralWA(brokerRef);
    window.open(
      `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(msg)}`,
      "_blank"
    );
  }

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <SEOMeta
        title="Flex Living Dubai | Rooms, Villas & Studios | No Annual Contract | DeliWer"
        description="Find flexible monthly accommodation in Dubai — rooms, shared villas, studios, bed spaces. No annual contract. Move in this week via WhatsApp."
      />
      <Navigation />

      {/* ── HERO ── */}
      <section className="relative pt-28 pb-20 px-4 overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <img
            src="https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=1920&q=80"
            alt=""
            className="absolute inset-0 w-full h-full object-cover object-center opacity-20"
            aria-hidden="true"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-slate-950/80 via-slate-950/70 to-slate-950" />
        </div>

        <div className="relative z-10 max-w-2xl mx-auto text-center space-y-6">
          <p className="text-emerald-400 text-sm font-medium tracking-wide">
            Flex Living · Dubai
          </p>

          <h1 className="text-4xl md:text-5xl font-bold text-white leading-tight">
            A place to stay.<br />
            <span className="text-gray-400 font-normal">No annual contract required.</span>
          </h1>

          <p className="text-gray-400 text-lg leading-relaxed max-w-xl mx-auto">
            Rooms, shared villas, studios and bed spaces — from AED 550/month.
            Month-to-month. Move in this week.
          </p>

          <div className="flex flex-col sm:flex-row gap-3 justify-center pt-2">
            <button
              onClick={openWA}
              data-testid="button-find-place-wa"
              className="flex items-center justify-center gap-2 bg-[#25D366] hover:bg-[#22c55e] text-white font-semibold px-8 py-3.5 rounded-2xl transition-colors text-sm"
            >
              <MessageCircle className="w-4 h-4" />
              Find my place on WhatsApp
            </button>
            <button
              onClick={() => document.getElementById("listings")?.scrollIntoView({ behavior: "smooth" })}
              data-testid="button-browse-listings"
              className="flex items-center justify-center gap-2 border border-white/15 hover:border-white/30 text-gray-400 hover:text-white font-medium px-8 py-3.5 rounded-2xl transition-colors text-sm"
            >
              Browse listings
            </button>
          </div>

          <p className="text-xs text-gray-600">
            Response within 2 hours · No upfront commitment
          </p>
        </div>
      </section>

      {/* ── HOW IT WORKS ── */}
      <section className="py-16 px-4">
        <div className="max-w-3xl mx-auto">
          <p className="text-center text-gray-500 text-sm font-medium mb-10">How it works</p>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                n: "1",
                title: "Tell us your budget",
                desc: "WhatsApp us your budget, type, and preferred area. Takes 30 seconds.",
              },
              {
                n: "2",
                title: "We send you options",
                desc: "Within 2 hours we share 2–3 matching places with photos and prices.",
              },
              {
                n: "3",
                title: "Move in",
                desc: "Confirm, pay first month, and move in. No Ejari, no cheques, no agency fees.",
              },
            ].map((step) => (
              <div key={step.n} className="space-y-3">
                <span className="text-3xl font-bold text-slate-800">{step.n}</span>
                <h3 className="text-white font-semibold">{step.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── LISTINGS ── */}
      <section id="listings" className="py-16 px-4">
        <div className="max-w-5xl mx-auto space-y-8">

          {/* Type filter */}
          <div className="flex flex-wrap gap-2">
            {TYPE_PILLS.map((pill) => (
              <button
                key={pill.value}
                onClick={() => setSelectedType(pill.value)}
                data-testid={`filter-${pill.value}`}
                className={`px-4 py-2 rounded-xl text-sm font-medium border transition-colors ${
                  selectedType === pill.value
                    ? "bg-white text-slate-950 border-white"
                    : "border-white/10 text-gray-500 hover:border-white/20 hover:text-gray-300"
                }`}
              >
                {pill.label}
              </button>
            ))}
          </div>

          {/* Grid */}
          <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-5">
            {filtered.map((listing) => (
              <ListingCard key={listing.id} listing={listing} brokerRef={brokerRef} />
            ))}
          </div>

          {filtered.length === 0 && (
            <p className="text-center text-gray-600 py-16">No listings in this category right now.</p>
          )}
        </div>
      </section>

      {/* ── BOTTOM CTA ── */}
      <section className="py-20 px-4">
        <div className="max-w-xl mx-auto text-center space-y-5">
          <h2 className="text-2xl font-semibold text-white">
            Not sure what you need?
          </h2>
          <p className="text-gray-500 leading-relaxed">
            Message us on WhatsApp. Tell us your budget and we'll handle the rest —
            no forms, no long process.
          </p>
          <button
            onClick={openWA}
            data-testid="button-bottom-wa"
            className="inline-flex items-center gap-2 bg-[#25D366] hover:bg-[#22c55e] text-white font-semibold px-8 py-3.5 rounded-2xl transition-colors text-sm"
          >
            <MessageCircle className="w-4 h-4" />
            WhatsApp us now
          </button>

          <div className="pt-4 border-t border-white/5">
            <button
              onClick={() =>
                window.open(
                  `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(
                    "Hello DeliWer 👋\n\nI have a space to list for flexible rental in Dubai. Please help me find tenants."
                  )}`,
                  "_blank"
                )
              }
              data-testid="button-list-space"
              className="inline-flex items-center gap-1.5 text-gray-600 hover:text-gray-400 text-sm transition-colors"
            >
              <Key className="w-3.5 h-3.5" />
              Have a space to list? Message us
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
