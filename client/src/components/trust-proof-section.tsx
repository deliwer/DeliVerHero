import { MapPin, CheckCircle2, Shield, Star } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

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

  const testimonials = [
    {
      id: 1,
      name: "Ahmed Al-Maktoum",
      initials: "AM",
      model: "Move-In Partner",
      text: "Relocating to Dubai was seamless with DeliWer. From business setup to sustainable home services, they handled everything with extreme professionalism."
    },
    {
      id: 2,
      name: "Sarah Johnson",
      initials: "SJ",
      model: "Business Founder",
      text: "The primary go-to for setup in Business Bay. Everything was coordinated on WhatsApp. We didn't have to manage different vendors."
    }
  ];

  return (
    <section className="py-16 px-4 bg-white text-slate-900 border-y border-slate-100" data-testid="section-trust-proof">
      <div className="container mx-auto max-w-6xl">
        {/* Section Header */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold mb-4">Trusted for everyday living in Dubai</h2>
          <p className="text-slate-600 text-lg">
            DeliWer supports residents during move-in, setup, and ongoing home care across key Dubai communities.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-12">
          {/* Column 1: Core Operations */}
          <div className="space-y-10 lg:col-span-1">
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
              <ul className="grid grid-cols-1 gap-3">
                {services.map((s) => (
                  <li key={s} className="flex items-center gap-2 text-sm text-slate-700">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                    <span>{s}</span>
                  </li>
                ))}
              </ul>
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
          </div>

          {/* Column 2: Testimonials & Proof */}
          <div className="space-y-8 lg:col-span-1">
            <h3 className="text-sm font-bold uppercase tracking-wider text-slate-400 mb-4">Resident Feedback</h3>
            <div className="space-y-4">
              {testimonials.map((testimonial) => (
                <Card 
                  key={testimonial.id} 
                  className="bg-slate-50 border-slate-200 shadow-none rounded-xl overflow-hidden"
                  data-testid={`testimonial-card-${testimonial.id}`}
                >
                  <CardContent className="p-5">
                    <div className="flex items-center gap-3 mb-3">
                      <Avatar className="h-10 w-10 border border-slate-200">
                        <AvatarFallback className="bg-slate-200 text-slate-600 font-bold text-xs">{testimonial.initials}</AvatarFallback>
                      </Avatar>
                      <div>
                        <h4 className="text-slate-900 font-bold text-sm">{testimonial.name}</h4>
                        <p className="text-slate-500 text-[10px] font-medium uppercase tracking-wider">{testimonial.model}</p>
                      </div>
                    </div>
                    <p className="text-slate-600 text-sm italic leading-relaxed mb-3">
                      "{testimonial.text}"
                    </p>
                    <div className="flex gap-1">
                      {Array.from({ length: 5 }).map((_, idx) => (
                        <Star 
                          key={idx} 
                          className="w-3 h-3 fill-emerald-500 text-emerald-500"
                        />
                      ))}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
            
            <div className="italic text-slate-500 text-sm border-l-2 border-blue-500 pl-4 py-2">
              Most residents come to DeliWer through building referrals and word of mouth.
            </div>
          </div>

          {/* Column 3: Visuals & CTA */}
          <div className="space-y-10 lg:col-span-1">
            {/* Operational Proof */}
            <div className="bg-slate-50 p-6 rounded-xl border border-slate-100">
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-4">Reliability</h3>
              <ul className="space-y-3">
                {operationalProof.map((p, i) => (
                  <li key={i} className="flex items-start gap-3 text-sm text-slate-600">
                    <Shield className="w-4 h-4 text-blue-500 mt-0.5 shrink-0" />
                    <span>{p}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Real Work Visuals */}
            <div>
              <h3 className="text-sm font-bold uppercase tracking-wider text-slate-400 mb-4">Operational Snapshot</h3>
              <div className="grid grid-cols-2 gap-3">
                <div className="aspect-square bg-slate-100 rounded-lg flex flex-col items-center justify-center overflow-hidden border border-slate-200 p-2">
                   <div className="text-[10px] text-slate-500 text-center font-medium">Move-in support in JVC</div>
                </div>
                <div className="aspect-square bg-slate-100 rounded-lg flex flex-col items-center justify-center overflow-hidden border border-slate-200 p-2">
                   <div className="text-[10px] text-slate-500 text-center font-medium">Maintenance coordination</div>
                </div>
              </div>
            </div>

            {/* Reliability Statement */}
            <p className="text-xs text-slate-400 italic">
              DeliWer works with vetted local service partners to ensure consistent delivery across communities.
            </p>

            {/* Single CTA */}
            <div className="pt-4">
              <Button className="w-full bg-slate-900 text-white hover:bg-slate-800 px-8 py-6 rounded-xl font-bold text-lg" data-testid="button-setup-residence">
                Set Up My Residence
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
