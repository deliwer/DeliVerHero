import { SEOMeta } from "@/components/seo-meta";
import { Button } from "@/components/ui/button";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { Link } from "wouter";

export default function SnaggingSharjah() {
  return (
    <>
      <SEOMeta
        title="Property Snagging Sharjah | Handover Inspection | DeliWer"
        description="Professional property snagging and handover inspection in Sharjah. Independent defect reports for Al Majaz, Al Nahda, Muwaileh, and all Sharjah communities."
        canonical="https://deliwer.com/snagging-sharjah"
        keywords="property snagging sharjah, snagging inspection sharjah, handover inspection sharjah"
      />
      <section className="min-h-screen bg-slate-950 text-white py-20 px-4">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-4xl font-bold mb-4">Property Snagging in Sharjah</h1>
          <p className="text-slate-300 text-lg mb-6">
            Independent property snagging and handover inspection across Sharjah — Al Majaz, Al Nahda, Muwaileh, Al Khan, Aljada, and more.
          </p>
          <ul className="space-y-3 mb-8">
            {[
              "Certified independent inspectors",
              "Detailed defect photo reports",
              "Remote inspection for overseas investors",
              "Move-in readiness packages available",
            ].map((item) => (
              <li key={item} className="flex items-center gap-2 text-slate-300">
                <CheckCircle2 className="h-4 w-4 text-emerald-400 flex-shrink-0" /> {item}
              </li>
            ))}
          </ul>
          <Link href="/snagging">
            <Button className="bg-emerald-600 hover:bg-emerald-700 text-white">
              Book Sharjah Inspection <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
          <p className="mt-6 text-slate-500 text-sm">
            Serving: Al Majaz · Al Nahda · Muwaileh · Aljada · Al Khan · Al Taawun · Halwan Suburb · Wasit
          </p>
        </div>
      </section>
    </>
  );
}
