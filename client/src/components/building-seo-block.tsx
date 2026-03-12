import { MessageSquare, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";

interface BuildingSEOBlockProps {
  building: string;
  community: string;
  ref: string;
}

export function BuildingSEOBlock({ building, community, ref: refCode }: BuildingSEOBlockProps) {
  const services = [
    "Ejari move-in support",
    "DEWA activation",
    "Home readiness inspection",
    "Water setup assistance",
    "Move-in coordination"
  ];

  return (
    <div className="py-8 px-4 md:px-6 bg-slate-900/50 border border-white/10 rounded-xl hover:border-emerald-500/30 transition-all">
      <div className="max-w-4xl mx-auto">
        <h3 className="text-lg font-black text-white mb-2">
          Move-In Concierge for {building}, {community}
        </h3>
        
        <p className="text-gray-300 text-sm mb-4 leading-relaxed">
          Tenants moving into {building} can now use DeliWer's move-in concierge services. From Ejari support to DEWA activation and home readiness inspection, we ensure your apartment is ready before you arrive. Book directly via WhatsApp.
        </p>

        <div className="flex flex-wrap gap-2 mb-4">
          {services.map((service, i) => (
            <div key={i} className="flex items-center gap-1 text-xs text-emerald-300">
              <CheckCircle2 className="w-3 h-3" />
              <span>{service}</span>
            </div>
          ))}
        </div>

        <div className="flex flex-col sm:flex-row gap-2">
          <a href={`https://wa.me/971523946311?text=Hi%20DeliWer%2C%20I%27m%20moving%20to%20${encodeURIComponent(building)}%20and%20need%20move-in%20support`} target="_blank" rel="noopener noreferrer">
            <Button size="sm" className="bg-emerald-600 hover:bg-emerald-500 text-white font-bold h-10">
              <MessageSquare className="w-4 h-4 mr-2" />
              Book on WhatsApp
            </Button>
          </a>
          
          <Link href="/move-in-services">
            <Button size="sm" variant="outline" className="border-white/20 text-gray-300 hover:text-white h-10">
              Learn More
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
