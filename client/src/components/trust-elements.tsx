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
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white tracking-tight mb-4">
            Why Trust DeliWer
          </h2>
          <p className="text-gray-300 text-lg max-w-2xl mx-auto font-light">
            Providing transparency and excellence in Dubai's most critical service sectors.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-20 items-center">
          <div className="space-y-6">
            {trustItems.map((item, i) => (
              <div key={i} className="flex gap-6 p-6 rounded-2xl bg-white/5 backdrop-blur-md border border-white/10 hover:bg-white/10 transition-all group">
                <div className="w-14 h-14 bg-primary/20 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform shadow-lg shadow-primary/20">
                  <item.icon className="w-7 h-7 text-primary" />
                </div>
                <div>
                  <h3 className="font-bold text-xl mb-1 text-white">{item.title}</h3>
                  <p className="text-gray-300 leading-relaxed font-light">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
          
          <div className="relative">
            <div className="absolute inset-0 bg-primary/30 blur-[150px] rounded-full animate-pulse" />
            <div className="space-y-6">
              <Card className="relative p-8 border-white/10 bg-black/40 backdrop-blur-2xl shadow-3xl overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 -mr-16 -mt-16 rounded-full blur-2xl" />
                <div className="space-y-8">
                  <div className="flex items-center gap-6">
                    <div className="w-16 h-16 rounded-2xl bg-primary/20 flex items-center justify-center border border-primary/30 shadow-xl shadow-primary/20">
                      <Star className="w-8 h-8 text-primary" />
                    </div>
                    <div>
                      <div className="text-3xl font-bold text-white tracking-tighter">100%</div>
                      <div className="text-sm text-primary uppercase tracking-[0.2em] font-bold mt-1">Execution Reliability</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-6">
                    <div className="w-16 h-16 rounded-2xl bg-primary/20 flex items-center justify-center border border-primary/30 shadow-xl shadow-primary/20">
                      <Users className="w-8 h-8 text-primary" />
                    </div>
                    <div>
                      <div className="text-3xl font-bold text-white tracking-tighter">Dubai-Wide</div>
                      <div className="text-sm text-primary uppercase tracking-[0.2em] font-bold mt-1">Strategic Service Coverage</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-6">
                    <div className="w-16 h-16 rounded-2xl bg-primary/20 flex items-center justify-center border border-primary/30 shadow-xl shadow-primary/20">
                      <Smartphone className="w-8 h-8 text-primary" />
                    </div>
                    <div>
                      <div className="text-3xl font-bold text-white tracking-tighter">Real-time</div>
                      <div className="text-sm text-primary uppercase tracking-[0.2em] font-bold mt-1">WhatsApp Sync & Updates</div>
                    </div>
                  </div>
                </div>
              </Card>

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
