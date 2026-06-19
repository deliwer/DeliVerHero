import { SEOMeta } from "@/components/seo-meta";
import { Button } from "@/components/ui/button";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { Link } from "wouter";

export default function SnaggingAjman() {
  return (
    <>
      <SEOMeta
        title="Property Snagging Ajman | Handover Inspection | DeliWer"
        description="Professional property snagging and handover inspection in Ajman. Independent defect reports for Al Rashidiya, Emirates City, and all Ajman communities."
        canonical="https://deliwer.com/snagging-ajman"
        keywords="property snagging ajman, snagging inspection ajman, handover inspection ajman"
      />
      <section className="min-h-screen bg-slate-950 text-white py-20 px-4">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-4xl font-bold mb-4">Property Snagging in Ajman</h1>
          <p className="text-slate-300 text-lg mb-6">
            Independent property snagging and handover inspection across Ajman — Al Rashidiya, Emirates City, Al Nuaimiya, Corniche, and surrounding areas.
          </p>
          <ul className="space-y-3 mb-8">
            {[
              "Independent certified inspectors",
              "Detailed photo & video reports",
              "Affordable rates for Ajman properties",
              "Move-in readiness packages",
            ].map((item) => (
              <li key={item} className="flex items-center gap-2 text-slate-300">
                <CheckCircle2 className="h-4 w-4 text-emerald-400 flex-shrink-0" /> {item}
              </li>
            ))}
          </ul>
          <Link href="/snagging">
            <Button className="bg-emerald-600 hover:bg-emerald-700 text-white">
              Book Ajman Inspection <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
          <p className="mt-6 text-slate-500 text-sm">
            Serving: Al Rashidiya · Emirates City · Al Nuaimiya · Ajman Corniche · Al Jurf · Al Hamidiyah
          </p>
        </div>
      </section>
    </>
  );
}
