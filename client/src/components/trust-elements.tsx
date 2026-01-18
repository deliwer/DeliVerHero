import { Shield, Star, Users, Smartphone, Globe, Rocket, Zap, MessageCircle } from "lucide-react";
import { Card } from "@/components/ui/card";
import networkImg from "@assets/stock_images/dubai_business_corpo_60a4c0bf.jpg";

export function TrustElements() {
  const trustItems = [
    { title: 'Demand Ownership', desc: 'Demand owned by DeliWer via LinkedIn Premium & Sales Navigator.', icon: Globe },
    { title: 'Accountability', desc: 'One coordinator per client ensures absolute accountability.', icon: Shield },
    { title: 'Full Lifecycle Coverage', desc: 'Pre-arrival, move-in, living, move-out — we cover it all.', icon: Rocket },
    { title: 'Frictionless Comms', desc: 'Communication via WhatsApp — no app required for partners.', icon: MessageCircle },
    { title: 'Revenue Focus', desc: 'Revenue through scoped projects, not client management overhead.', icon: Zap }
  ];

  const features = [
    {
      icon: Star,
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
      description: "Recognized as top emerging market for founders and global investors",
      badge: "Vetted"
    }
  ];

  return (
    <section className="mb-24 relative rounded-3xl overflow-hidden py-24 px-8 md:px-16 shadow-2xl" data-testid="trust-elements-section">
      <div 
        className="absolute inset-0 z-0 scale-105"
        style={{
          backgroundImage: `url(${networkImg})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div className="absolute inset-0 bg-black/80 backdrop-blur-[1px]" />
      </div>
      
      <div className="relative z-10 max-w-6xl mx-auto">
        <div className="max-w-xl mx-auto">
          <div className="relative">
            <div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {features.map((feature, idx) => (
                  <div 
                    key={idx}
                    className="bg-white/5 p-4 rounded-xl border border-white/10 hover:border-primary/30 transition-all text-center backdrop-blur-md"
                  >
                    <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-3">
                      <feature.icon className="w-5 h-5 text-primary" />
                    </div>
                    <h4 className="text-white font-bold text-sm mb-1">{feature.title}</h4>
                    <p className="text-gray-400 text-[10px] leading-tight">{feature.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
