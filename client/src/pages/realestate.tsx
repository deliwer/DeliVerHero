import { Helmet } from "react-helmet";
import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { MapPin, RefreshCw, MessageCircle, ChevronDown } from "lucide-react";

const DUBAI_AREAS = [
  "Downtown Dubai",
  "Dubai Marina",
  "Business Bay",
  "Palm Jumeirah",
  "Jumeirah Village Circle (JVC)",
  "Dubai Hills Estate",
  "Emaar Beachfront",
  "Creek Harbour",
  "Meydan City",
  "Arabian Ranches",
  "Al Furjan",
  "Damac Hills",
  "Yas Island (Abu Dhabi)",
  "Other / Not sure yet",
];

const WHATSAPP_NUMBER = "971523946311";

function buildWhatsAppLink(area: string) {
  const msg = `Hi DeliWer! 👋 I've been browsing Dubai projects on your map and I'm interested in *${area}*. Can you help me arrange a viewing?`;
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(msg)}`;
}

function ProjectsMap() {
  const [mapKey, setMapKey] = useState(0);
  const [loading, setLoading] = useState(true);

  return (
    <div className="rounded-2xl overflow-hidden border border-slate-800 shadow-2xl relative" data-testid="div-map-embed">
      {loading && (
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-slate-900 z-10" style={{ height: 580 }}>
          <div className="w-8 h-8 border-4 border-emerald-500 border-t-transparent rounded-full animate-spin mb-3" />
          <p className="text-slate-400 text-sm">Loading map…</p>
        </div>
      )}
      <iframe
        key={mapKey}
        src="https://deliwer-shopping-metaverse.map.estate/en/map/uae-dubai/projectsEmbed"
        title="Dubai Projects Map"
        className="w-full"
        style={{ height: 580 }}
        allow="fullscreen"
        onLoad={() => setLoading(false)}
        onError={() => setLoading(false)}
      />
      <button
        onClick={() => { setLoading(true); setMapKey((k) => k + 1); }}
        className="absolute top-3 right-3 z-20 flex items-center gap-1.5 text-[11px] font-bold bg-slate-900/80 hover:bg-slate-800 border border-slate-700 text-slate-300 hover:text-white rounded-lg px-2.5 py-1.5 transition-all backdrop-blur"
        title="Reload map"
        data-testid="button-map-reload"
      >
        <RefreshCw className="w-3 h-3" /> Reload map
      </button>
    </div>
  );
}

function BookViewingCTA() {
  const [area, setArea] = useState("");
  const [open, setOpen] = useState(false);

  const selected = area || "Select an area you like…";
  const canBook = area !== "";

  return (
    <div className="mt-8 max-w-2xl mx-auto">
      <div className="rounded-2xl border border-emerald-500/25 bg-gradient-to-br from-emerald-950/50 to-slate-900 p-6 sm:p-8 shadow-xl">
        <div className="flex items-center gap-2 mb-1">
          <MessageCircle className="w-5 h-5 text-emerald-400" />
          <h3 className="text-lg font-bold text-white">Seen something you like?</h3>
        </div>
        <p className="text-slate-400 text-sm mb-5">
          Tell us which area caught your eye and we'll connect you with a verified viewing — no pressure, no broker fees.
        </p>

        <div className="relative mb-4" data-testid="area-selector">
          <button
            type="button"
            onClick={() => setOpen((o) => !o)}
            className="w-full flex items-center justify-between bg-slate-800 hover:bg-slate-700 border border-slate-700 hover:border-emerald-500/50 text-left rounded-xl px-4 py-3 text-sm transition-all"
          >
            <span className={area ? "text-white font-medium" : "text-slate-400"}>{selected}</span>
            <ChevronDown className={`w-4 h-4 text-slate-400 transition-transform ${open ? "rotate-180" : ""}`} />
          </button>

          {open && (
            <div className="absolute z-30 mt-1 w-full rounded-xl border border-slate-700 bg-slate-900 shadow-2xl overflow-hidden">
              {DUBAI_AREAS.map((a) => (
                <button
                  key={a}
                  type="button"
                  onClick={() => { setArea(a); setOpen(false); }}
                  className={`w-full text-left px-4 py-2.5 text-sm transition-colors hover:bg-emerald-500/10 hover:text-emerald-300 ${area === a ? "bg-emerald-500/15 text-emerald-300 font-semibold" : "text-slate-300"}`}
                >
                  {a}
                </button>
              ))}
            </div>
          )}
        </div>

        <a
          href={canBook ? buildWhatsAppLink(area) : undefined}
          target="_blank"
          rel="noopener noreferrer"
          onClick={!canBook ? (e) => e.preventDefault() : undefined}
          className={`flex items-center justify-center gap-2 w-full rounded-xl py-3.5 text-sm font-bold transition-all ${
            canBook
              ? "bg-emerald-500 hover:bg-emerald-400 text-slate-950 shadow-lg shadow-emerald-500/20 cursor-pointer"
              : "bg-slate-700 text-slate-500 cursor-not-allowed opacity-60"
          }`}
          data-testid="button-book-viewing"
        >
          <MessageCircle className="w-4 h-4" />
          {canBook ? `Book a Viewing in ${area} →` : "Pick an area first"}
        </a>

        <p className="mt-3 text-center text-[11px] text-slate-500">
          Opens WhatsApp · Free viewing coordination · No brokerage fee to you
        </p>
      </div>
    </div>
  );
}

function MapSection() {
  return (
    <div className="pb-16">
      <section className="py-10 px-4">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-7">
            <Badge className="mb-3 bg-emerald-500/15 text-emerald-300 border-emerald-500/30">
              <MapPin className="w-3.5 h-3.5 mr-1.5" /> Live Dubai Project Map
            </Badge>
            <h2 className="text-2xl sm:text-3xl font-bold mb-2" data-testid="heading-broker-map">
              Find Your Next Home in Dubai
            </h2>
            <p className="text-slate-400 max-w-2xl mx-auto text-sm sm:text-base">
              Browse live developments across Dubai — filter by area, developer and price range to shortlist the projects that match your lifestyle and budget.
            </p>
          </div>

          <ProjectsMap />

          <p className="mt-3 text-center text-[11px] text-slate-500">
            Interactive project map · Updated regularly · Data via Map.Estate
          </p>

          <BookViewingCTA />
        </div>
      </section>
    </div>
  );
}

export default function RealEstate() {
  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <Helmet>
        <title>Find Your Next Home in Dubai | Project Map | DeliWer</title>
        <meta
          name="description"
          content="Browse live Dubai property developments on an interactive map. Filter by area, developer and price — then connect with DeliWer to arrange viewings and move-in concierge."
        />
        <meta
          name="keywords"
          content="Dubai property map, buy apartment Dubai, Dubai new projects, Dubai developments, find home Dubai, move to Dubai"
        />
        <meta property="og:title" content="Find Your Next Home in Dubai — DeliWer" />
        <meta
          property="og:description"
          content="Browse live Dubai property developments. Filter by area, developer and budget — then let DeliWer handle your viewing and move-in."
        />
      </Helmet>

      <div id="project-map">
        <MapSection />
      </div>
    </div>
  );
}
