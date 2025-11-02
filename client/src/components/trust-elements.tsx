import { Card, CardContent } from "@/components/ui/card";
import { Shield, Clock, MapPin, CheckCircle, Smartphone, Award, Lock, TrendingUp } from "lucide-react";

export function TrustElements() {
  const features = [
    {
      icon: Shield,
      title: "Certified Data Wipe",
      description: "Military-grade data erasure guaranteed. Your privacy is our priority.",
      badge: "100% Secure"
    },
    {
      icon: Clock,
      title: "24-Hour Pickup",
      description: "Free collection within 24 hours. Schedule at your convenience.",
      badge: "Fast Service"
    },
    {
      icon: MapPin,
      title: "UAE-Wide Coverage",
      description: "Serving Dubai, Sharjah, Abu Dhabi, and surrounding areas.",
      badge: "All Emirates"
    },
    {
      icon: CheckCircle,
      title: "Guaranteed Payout",
      description: "Payment within 48 hours after device received & inspected.",
      badge: "Verified"
    },
    {
      icon: Smartphone,
      title: "Expert Inspection",
      description: "Professional evaluation by certified technicians.",
      badge: "Certified"
    },
    {
      icon: Award,
      title: "Best Value Promise",
      description: "Competitive rates for all iPhone models and conditions.",
      badge: "Top Prices"
    },
    {
      icon: Lock,
      title: "Secure Process",
      description: "End-to-end encrypted transactions and secure device handling.",
      badge: "Protected"
    },
    {
      icon: TrendingUp,
      title: "Sustainability Impact",
      description: "Every trade-in contributes to Dubai's 2030 sustainability missions.",
      badge: "Eco-Friendly"
    }
  ];

  return (
    <section className="py-12 px-4 bg-slate-900/30" data-testid="trust-elements-section">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-10">
          <h2 className="text-3xl md:text-4xl font-black text-white mb-4">
            Why Trust <span className="bg-gradient-to-r from-emerald-400 to-blue-400 bg-clip-text text-transparent">DeliWer</span>
          </h2>
          <p className="text-gray-300 text-lg max-w-2xl mx-auto">
            We're committed to providing a secure, transparent, and hassle-free trade-in experience
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {features.map((feature, idx) => (
            <Card 
              key={idx}
              className="bg-slate-800/50 border-slate-700 hover:border-emerald-500/50 transition-all group"
              data-testid={`trust-feature-${idx}`}
            >
              <CardContent className="p-5">
                <div className="flex items-start gap-3 mb-3">
                  <div className="bg-gradient-to-r from-emerald-500 to-blue-500 p-2 rounded-lg group-hover:scale-110 transition-transform">
                    <feature.icon className="w-5 h-5 text-white" />
                  </div>
                  <div className="flex-1">
                    <div className="inline-block bg-emerald-500/20 px-2 py-0.5 rounded text-xs text-emerald-400 font-bold mb-2">
                      {feature.badge}
                    </div>
                    <h3 className="text-white font-bold text-sm mb-1">{feature.title}</h3>
                  </div>
                </div>
                <p className="text-gray-400 text-xs leading-relaxed">{feature.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="mt-12 bg-gradient-to-r from-emerald-900/20 to-blue-900/20 rounded-2xl p-6 border border-emerald-500/30">
          <h3 className="text-xl font-bold text-white mb-4 text-center">Common Questions</h3>
          <div className="grid md:grid-cols-2 gap-4">
            {[
              {
                q: "What condition is accepted?",
                a: "We accept all conditions from Excellent to Poor. Value varies based on condition."
              },
              {
                q: "How long until I receive my reward?",
                a: "Payment/credits within 48 hours after device received and inspected."
              },
              {
                q: "Is pickup really free?",
                a: "Yes! Free collection across Dubai, Sharjah & Abu Dhabi within 24 hours."
              },
              {
                q: "How is my data protected?",
                a: "We use military-grade erasure software with certification guarantee."
              }
            ].map((faq, idx) => (
              <div key={idx} className="bg-slate-800/30 p-4 rounded-lg" data-testid={`faq-${idx}`}>
                <h4 className="text-emerald-400 font-semibold text-sm mb-2">{faq.q}</h4>
                <p className="text-gray-300 text-xs">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
