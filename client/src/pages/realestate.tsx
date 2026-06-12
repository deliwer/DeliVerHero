import { Helmet } from "react-helmet";
import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MapPin, RefreshCw } from "lucide-react";

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
