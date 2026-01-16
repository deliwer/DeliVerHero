import { Card, CardContent } from "@/components/ui/card";
import { Shield, Clock, MapPin, CheckCircle, Award, Users, Globe, Briefcase } from "lucide-react";

export function TrustElements() {
  const features = [
    {
      icon: Award,
      title: "Dealroom Verified",
      description: "Global startup & investor ecosystem intelligence platform recognizes DeliWer's expertise",
      badge: "Verified"
    },
    {
      icon: Users,
      title: "FounderHQ Partner",
      description: "Part of Dubai's official founders ecosystem with verified credentials",
      badge: "Partner"
    },
    {
      icon: Globe,
      title: "Dubai's #1 Hub",
      description: "Recognized as top emerging market for founders, investors & families",
      badge: "Market Leader"
    },
    {
      icon: Briefcase,
      title: "Partner-Led Model",
      description: "Vetted network of business setup, visa, and real estate partners",
      badge: "Vetted"
    }
  ];

  return (
    <section className="py-16 px-4" data-testid="trust-elements-section">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-black text-white mb-4">
            Why Trust DeliWer
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Providing transparency and excellence in Dubai's most critical service sectors.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, idx) => (
            <div 
              key={idx}
              className="bg-slate-900/40 p-6 rounded-2xl border border-white/5 hover:border-blue-500/20 transition-all text-center"
              data-testid={`trust-feature-${idx}`}
            >
              <div className="w-12 h-12 bg-blue-500/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <feature.icon className="w-6 h-6 text-blue-500" />
              </div>
              <h3 className="text-white font-bold mb-2">{feature.title}</h3>
              <p className="text-gray-400 text-sm leading-relaxed">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
