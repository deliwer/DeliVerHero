import { Helmet } from "react-helmet";
import { Badge } from "@/components/ui/badge";
import { MapPin } from "lucide-react";

function BrokerIntelSection() {
  return (
    <div className="pb-16">
      {/* Map Section */}
      <section className="py-10 px-4">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-7">
            <Badge className="mb-3 bg-emerald-500/15 text-emerald-300 border-emerald-500/30">
              <MapPin className="w-3.5 h-3.5 mr-1.5" /> Dubai Property Intelligence
            </Badge>
            <h2 className="text-2xl sm:text-3xl font-bold mb-2" data-testid="heading-broker-map">
              Explore Dubai Projects &amp; Narrow Your Focus
            </h2>
            <p className="text-slate-400 max-w-2xl mx-auto text-sm sm:text-base">
              Browse live developments across Dubai. Once you've identified your target areas, apply for Inner Circle access to receive unit-level inventory through our verified WhatsApp &amp; Telegram channels.
            </p>
          </div>

          <div className="rounded-2xl overflow-hidden border border-slate-800 shadow-2xl" data-testid="div-map-embed">
            <iframe
              src="https://deliwer-shopping-metaverse.map.estate/en/map/uae-dubai/projectsEmbed"
              title="Dubai Projects Map"
              className="w-full"
              style={{ height: 580 }}
              loading="lazy"
              allow="fullscreen"
            />
          </div>
          <p className="mt-2 text-center text-[11px] text-slate-500">
            Interactive project map · Explore developments by area, developer and price range · Data via Map.Estate
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
        <title>Dubai Property Map | Broker Intelligence | DeliWer</title>
        <meta
          name="description"
          content="Broker inner circle access for verified Dubai RERA brokers — explore projects on the map and access exclusive unit inventory via private WhatsApp & Telegram channels."
        />
        <meta
          name="keywords"
          content="Dubai broker inner circle, RERA broker Dubai, Dubai property map, Dubai projects map, Dubai unit inventory, move-in concierge Dubai"
        />
        <meta property="og:title" content="Dubai Property Intelligence & Broker Map — DeliWer" />
        <meta
          property="og:description"
          content="Verified RERA brokers: browse Dubai projects on an interactive map and access exclusive unit inventory through the Inner Circle programme."
        />
      </Helmet>

      <div id="broker-intel">
        <BrokerIntelSection />
      </div>
    </div>
  );
}
