import { MapPin, CheckCircle2, Shield } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

export function TrustAndProofSection() {
  const communities = ["JVC / JVT", "Business Bay", "Dubai Marina / JLT", "Barsha Heights"];
  const services = [
    "Move-in coordination",
    "Cleaning & maintenance",
    "Drinking water setup",
    "Short-term living support",
    "Ongoing home services",
    "Business & document assistance",
  ];

  const operationalProof = [
    "Supporting residents across multiple Dubai communities",
    "Handling regular move-ins and service requests",
    "Coordinating services through a single point of contact",
  ];

  return (
    <section className="py-16 px-4 bg-white text-slate-900 border-y border-slate-100" data-testid="section-trust-proof">
      <div className="container mx-auto max-w-6xl">
        {/* Section Header */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold mb-2">Trusted for everyday living in Dubai</h2>
          <p className="text-slate-600">
            DeliWer supports residents during move-in, setup, and ongoing home care across key Dubai communities.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12">
          <div className="space-y-10">
            {/* Active Communities */}
            <div>
              <h3 className="text-sm font-bold uppercase tracking-wider text-slate-400 mb-4 flex items-center gap-2">
                <MapPin className="w-4 h-4" /> Currently operating in:
              </h3>
              <div className="flex flex-wrap gap-2">
                {communities.map((c) => (
                  <Badge key={c} variant="secondary" className="bg-slate-100 text-slate-700 hover:bg-slate-200 border-none px-3 py-1">
                    {c}
                  </Badge>
                ))}
              </div>
            </div>

            {/* What Residents Use DeliWer For */}
            <div>
              <h3 className="text-sm font-bold uppercase tracking-wider text-slate-400 mb-4">What Residents Use DeliWer For</h3>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {services.map((s) => (
                  <li key={s} className="flex items-center gap-2 text-sm text-slate-700">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                    <span>{s}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Operational Proof */}
            <div className="bg-slate-50 p-6 rounded-xl border border-slate-100">
              <ul className="space-y-3">
                {operationalProof.map((p, i) => (
                  <li key={i} className="flex items-start gap-3 text-sm text-slate-600">
                    <Shield className="w-4 h-4 text-blue-500 mt-0.5 shrink-0" />
                    <span>{p}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="space-y-10">
            {/* Real Work Visuals Placeholder (Using existing assets if any or generic placeholders) */}
            <div>
              <h3 className="text-sm font-bold uppercase tracking-wider text-slate-400 mb-4">Operational Snapshot</h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="aspect-video bg-slate-100 rounded-lg flex items-center justify-center overflow-hidden border border-slate-200">
                   <div className="text-[10px] text-slate-400 text-center px-2">Move-in support in JVC</div>
                </div>
                <div className="aspect-video bg-slate-100 rounded-lg flex items-center justify-center overflow-hidden border border-slate-200">
                   <div className="text-[10px] text-slate-400 text-center px-2">Maintenance coordination</div>
                </div>
              </div>
            </div>

            {/* Resident Signal */}
            <div className="italic text-slate-600 border-l-2 border-blue-500 pl-4 py-2">
              Most residents come to DeliWer through building referrals and word of mouth.
            </div>

            {/* Clear Boundary Statement */}
            <div className="p-4 bg-amber-50 border border-amber-100 rounded-lg">
              <p className="text-sm font-bold text-amber-800">
                DeliWer is not a real estate agency.
              </p>
              <p className="text-xs text-amber-700 mt-1">
                We do not sell property, show listings, or earn commissions.
              </p>
            </div>

            {/* Reliability Statement */}
            <p className="text-xs text-slate-500 italic">
              DeliWer works with vetted local service partners to ensure consistent delivery across communities.
            </p>

            {/* Single CTA */}
            <div className="pt-4">
              <Button className="w-full sm:w-auto bg-slate-900 text-white hover:bg-slate-800 px-8 py-6 rounded-xl font-bold" data-testid="button-setup-residence">
                Set Up My Residence
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
