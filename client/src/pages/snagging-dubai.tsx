import { SEOMeta } from "@/components/seo-meta";
import { Button } from "@/components/ui/button";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { Link } from "wouter";

export default function SnaggingDubai() {
  return (
    <>
      <SEOMeta
        title="Property Snagging Dubai | Handover Inspection Services | DeliWer"
        description="Professional property snagging inspection in Dubai. Independent defect reports, video walkthroughs, and move-in readiness for all Dubai communities."
        canonical="https://deliwer.com/snagging-dubai"
        keywords="property snagging dubai, snagging inspection dubai, handover inspection dubai, property defects dubai"
      />
      <section className="min-h-screen bg-slate-950 text-white py-20 px-4">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-4xl font-bold mb-4">Property Snagging in Dubai</h1>
          <p className="text-slate-300 text-lg mb-6">
            Independent property snagging and handover inspection across all Dubai communities — JVC, Downtown, Business Bay, Dubai Marina, Palm Jumeirah, JBR, and more.
          </p>
          <ul className="space-y-3 mb-8">
            {[
              "Certified independent inspectors",
              "Photo and video defect reports",
              "Follow-up verification visits",
              "Broker referral commissions available",
              "Same-week scheduling",
            ].map((item) => (
              <li key={item} className="flex items-center gap-2 text-slate-300">
                <CheckCircle2 className="h-4 w-4 text-emerald-400 flex-shrink-0" /> {item}
              </li>
            ))}
          </ul>
          <Link href="/snagging">
            <Button className="bg-emerald-600 hover:bg-emerald-700 text-white">
              Book Dubai Inspection <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
          <p className="mt-6 text-slate-500 text-sm">
            Serving: Downtown Dubai · JVC · Business Bay · Dubai Marina · Palm Jumeirah · JBR · Dubai Hills · Arabian Ranches · Mirdif · Deira · Al Barsha · Discovery Gardens
          </p>
        </div>
      </section>
    </>
  );
}
