import { SEOMeta } from "@/components/seo-meta";
import { Button } from "@/components/ui/button";
import { ArrowRight, CheckCircle2, Shield, Clock, Camera } from "lucide-react";
import { Link } from "wouter";

export default function PropertyHandoverInspection() {
  return (
    <>
      <SEOMeta
        title="Property Handover Inspection UAE | Snagging & Defect Report | DeliWer"
        description="Professional property handover inspection across the UAE. We identify defects before you accept the keys so the developer fixes them at no cost to you."
        canonical="https://deliwer.com/property-handover-inspection"
        keywords="property handover inspection uae, handover inspection dubai, new property inspection, developer handover checklist"
      />
      <section className="min-h-screen bg-slate-950 text-white py-20 px-4">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-4xl font-bold mb-4">Property Handover Inspection</h1>
          <p className="text-slate-300 text-lg mb-6">
            Before you accept the keys from your developer, have an independent inspector check every corner of your property. Our handover inspection ensures defects are documented and fixed — at the developer's cost, not yours.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
            {[
              { icon: Shield, label: "Independent", desc: "No developer affiliation" },
              { icon: Clock, label: "Fast Turnaround", desc: "Report within 24 hours" },
              { icon: Camera, label: "Photo Evidence", desc: "Every defect documented" },
            ].map(({ icon: Icon, label, desc }) => (
              <div key={label} className="bg-slate-800 rounded-lg p-4 text-center">
                <Icon className="h-6 w-6 text-emerald-400 mx-auto mb-2" />
                <p className="text-white font-medium">{label}</p>
                <p className="text-slate-400 text-sm">{desc}</p>
              </div>
            ))}
          </div>
          <ul className="space-y-3 mb-8">
            {[
              "Structural and finishing inspection",
              "Plumbing and electrical checks",
              "AC, ventilation, and appliance verification",
              "Window, door, and fixture inspection",
              "Detailed defect list for developer submission",
              "Follow-up re-inspection after rectification",
            ].map((item) => (
              <li key={item} className="flex items-center gap-2 text-slate-300">
                <CheckCircle2 className="h-4 w-4 text-emerald-400 flex-shrink-0" /> {item}
              </li>
            ))}
          </ul>
          <Link href="/snagging">
            <Button className="bg-emerald-600 hover:bg-emerald-700 text-white">
              Book Handover Inspection <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </div>
      </section>
    </>
  );
}
