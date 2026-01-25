import { useRef } from "react";
import { Helmet } from "react-helmet";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { 
  ArrowRight,
  MessageCircle,
  Plane,
  Home,
  Check,
  Star,
  Users,
  Shield,
  DollarSign,
  LogOut,
} from "lucide-react";
import { motion } from "framer-motion";
import { TrustStrip, PartnerStrip, TestimonialCarousel } from "@/components/trust-strip";
import relocateHero from "@/assets/images/relocate-hero.jpg";

export default function Relocate() {
  const moveInRef = useRef<HTMLDivElement>(null);
  const moveOutRef = useRef<HTMLDivElement>(null);

  const scrollToMoveIn = () => {
    moveInRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const scrollToMoveOut = () => {
    moveOutRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const moveInPacks = [
    {
      name: "Essential Move-In",
      price: "299",
      description: "Basic home readiness and coordination.",
      features: [
        "Move-in coordination",
        "Basic home readiness check",
        "Utility checklist",
        "Issue reporting & follow-up"
      ]
    },
    {
      name: "Summer Ready Home",
      price: "599",
      recommended: true,
      description: "Complete cooling and water setup for Dubai's heat.",
      features: [
        "Everything in Essential",
        "AC inspection & basic service",
        "Cooling efficiency check",
        "Drinking water starter delivery",
        "Leak & water pressure check",
        "Minor fix coordination",
        "Priority support"
      ]
    },
    {
      name: "Full Relocation Comfort",
      price: "1,199",
      description: "The ultimate white-glove relocation experience.",
      features: [
        "Everything in Summer Ready",
        "Deep cleaning",
        "AC AMC (initial visit)",
        "Water subscription setup",
        "Trade-in / recycle coordination",
        "Dedicated relocation manager"
      ]
    }
  ];

  const moveOutPack = {
    name: "Smooth Exit Pack",
    price: "499",
    description: "Leave Dubai stress-free with everything handled.",
    features: [
      "Move-out coordination",
      "Final cleaning & inspection prep",
      "Utility closure coordination",
      "Trade-in / recycling service",
      "Landlord handover support",
      "Deposit protection checklist"
    ]
  };

  return (
    <div className="min-h-screen bg-dubai-gradient">
      <Helmet>
        <title>Dubai Relocation Services | Move-In & Move-Out Packs | DeliWer</title>
        <meta name="description" content="Moving to or from Dubai? Get fixed-price relocation packs. Move-in readiness, summer survival, and smooth exit — managed by one accountable team." />
      </Helmet>

      {/* Micro Trust Line - Always Above Fold */}
      <section className="px-4 py-3 border-b border-white/10">
        <div className="max-w-4xl mx-auto">
          <TrustStrip variant="dark" showContact={true} />
        </div>
      </section>

      {/* Hero Section */}
      <section className="relative px-4 py-16 md:py-24 overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${relocateHero})` }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/60 to-black/80" />
        <div className="relative max-w-4xl mx-auto text-center space-y-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-3xl md:text-5xl font-bold tracking-tight text-white mb-4">
              Relocating To or From Dubai? <br />
              <span className="text-blue-400">We Handle Your Home Before and After You Move.</span>
            </h1>
            <p className="text-lg md:text-xl text-blue-100/80 max-w-2xl mx-auto">
              Move-in readiness, summer survival, and smooth move-out — managed by one accountable team
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="flex flex-col sm:flex-row gap-4 justify-center pt-4"
          >
            <Button 
              onClick={scrollToMoveIn}
              className="bg-emerald-600 hover:bg-emerald-500 text-white gap-2 h-14 text-lg px-8"
              data-testid="button-moving-in"
            >
              <Home className="w-5 h-5" />
              I'm Moving Into Dubai
            </Button>
            <Button 
              onClick={scrollToMoveOut}
              className="bg-blue-600 hover:bg-blue-500 text-white gap-2 h-14 text-lg px-8"
              data-testid="button-moving-out"
            >
              <Plane className="w-5 h-5" />
              I'm Moving Out of Dubai
            </Button>
          </motion.div>
        </div>
      </section>

      {/* Partner Strip */}
      <section className="px-4">
        <div className="max-w-4xl mx-auto">
          <PartnerStrip />
        </div>
      </section>

      {/* Move-In Packs Section */}
      <section ref={moveInRef} id="move-in-packs" className="px-4 py-16 md:py-20">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Move-In Packs</h2>
            <p className="text-lg text-emerald-100/70 max-w-2xl mx-auto">
              Fixed-price packages to get your new Dubai home ready from day one
            </p>
            <p className="text-sm text-emerald-400 mt-2">No hidden fees • Apartments & Townhouses: Fixed Price • Villas: Custom Quote</p>
          </div>

          <div className="grid lg:grid-cols-3 gap-6">
            {moveInPacks.map((pack, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 * i }}
              >
                <Card 
                  className={`relative p-6 md:p-8 flex flex-col h-full transition-all ${
                    pack.recommended 
                      ? "border-2 border-emerald-500 shadow-xl shadow-emerald-500/20 bg-emerald-950/30" 
                      : "border border-slate-700 bg-black/40"
                  }`}
                >
                  {pack.recommended && (
                    <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-emerald-500 text-white px-4 py-1 rounded-full text-sm font-bold flex items-center gap-1">
                      <Star className="w-3 h-3 fill-current" />
                      Recommended
                    </div>
                  )}
                  
                  <div className="mb-6">
                    <h3 className="text-xl font-bold text-white mb-2">{pack.name}</h3>
                    <p className="text-gray-400 text-sm">{pack.description}</p>
                  </div>

                  <div className="mb-6">
                    <div className="flex items-baseline gap-1">
                      <span className="text-sm font-medium text-gray-400">From</span>
                      <span className="text-3xl font-bold text-emerald-400">AED {pack.price}</span>
                    </div>
                  </div>

                  <ul className="space-y-3 mb-8 flex-1">
                    {pack.features.map((feature, index) => (
                      <li key={index} className="flex gap-3 text-sm text-gray-300">
                        <div className="mt-0.5 bg-emerald-500/20 rounded-full p-0.5 shrink-0 h-5 w-5 flex items-center justify-center">
                          <Check className="w-3 h-3 text-emerald-400" />
                        </div>
                        {feature}
                      </li>
                    ))}
                  </ul>

                  <Button 
                    onClick={() => window.open(`https://wa.me/971523946311?text=Hi, I am interested in the ${pack.name} pack (AED ${pack.price}). Please let me know the next steps.`, '_blank')}
                    className={`w-full h-12 font-bold ${
                      pack.recommended 
                        ? "bg-emerald-600 hover:bg-emerald-500" 
                        : "bg-slate-700 hover:bg-slate-600"
                    }`}
                    data-testid={`button-pack-${pack.name.toLowerCase().replace(/\s+/g, '-')}`}
                  >
                    <MessageCircle className="w-4 h-4 mr-2" />
                    Select Pack
                  </Button>
                </Card>
              </motion.div>
            ))}
          </div>

          {/* Testimonial for Summer Ready */}
          <div className="mt-8 max-w-xl mx-auto">
            <div className="bg-emerald-950/30 border border-emerald-500/30 rounded-xl p-4 text-center">
              <div className="flex justify-center gap-1 mb-2">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                ))}
              </div>
              <p className="text-sm text-white italic">"AC serviced and water delivered in hours — DeliWer saved our move-in week."</p>
              <p className="text-xs text-emerald-100/60 mt-2">— Ahmed, JVC</p>
            </div>
          </div>
        </div>
      </section>

      {/* Move-Out Pack Section */}
      <section ref={moveOutRef} id="move-out-pack" className="px-4 py-16 md:py-20 border-t border-white/10">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Move-Out Pack</h2>
            <p className="text-lg text-blue-100/70 max-w-2xl mx-auto">
              Leave Dubai stress-free with your deposit secured
            </p>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Card className="p-6 md:p-8 border-2 border-blue-500/50 bg-blue-950/20">
              <div className="flex flex-col md:flex-row gap-8">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-12 h-12 rounded-full bg-blue-500/20 flex items-center justify-center">
                      <LogOut className="w-6 h-6 text-blue-400" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-white">{moveOutPack.name}</h3>
                      <p className="text-gray-400 text-sm">{moveOutPack.description}</p>
                    </div>
                  </div>

                  <ul className="space-y-3 mb-6">
                    {moveOutPack.features.map((feature, index) => (
                      <li key={index} className="flex gap-3 text-sm text-gray-300">
                        <div className="mt-0.5 bg-blue-500/20 rounded-full p-0.5 shrink-0 h-5 w-5 flex items-center justify-center">
                          <Check className="w-3 h-3 text-blue-400" />
                        </div>
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="flex flex-col justify-center items-center md:items-end gap-4 md:min-w-[200px]">
                  <div className="text-center md:text-right">
                    <div className="text-sm font-medium text-gray-400">From</div>
                    <div className="text-3xl font-bold text-blue-400">AED {moveOutPack.price}</div>
                  </div>
                  <Button 
                    onClick={() => window.open(`https://wa.me/971523946311?text=Hi, I am interested in the Smooth Exit Pack. I'm leaving Dubai and need help with move-out coordination.`, '_blank')}
                    className="bg-blue-600 hover:bg-blue-500 h-12 px-8 font-bold"
                    data-testid="button-exit-pack"
                  >
                    <MessageCircle className="w-4 h-4 mr-2" />
                    Select Exit Pack
                  </Button>
                </div>
              </div>
            </Card>
          </motion.div>

          {/* Exit testimonial */}
          <div className="mt-8 max-w-xl mx-auto">
            <div className="bg-blue-950/30 border border-blue-500/30 rounded-xl p-4 text-center">
              <div className="flex justify-center gap-1 mb-2">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                ))}
              </div>
              <p className="text-sm text-white italic">"Exit handover was smooth. Got our full deposit back without any issues."</p>
              <p className="text-xs text-blue-100/60 mt-2">— Michael, Downtown Dubai</p>
            </div>
          </div>
        </div>
      </section>

      {/* Trust Strip */}
      <section className="px-4 py-8 border-t border-white/10">
        <div className="max-w-4xl mx-auto">
          <div className="flex flex-wrap justify-center gap-6 md:gap-10 text-blue-100/70 text-sm">
            <div className="flex items-center gap-2">
              <Shield className="w-4 h-4 text-blue-400" />
              <span>Rental-friendly</span>
            </div>
            <div className="flex items-center gap-2">
              <DollarSign className="w-4 h-4 text-blue-400" />
              <span>Fixed pricing</span>
            </div>
            <div className="flex items-center gap-2">
              <Users className="w-4 h-4 text-blue-400" />
              <span>One accountable team</span>
            </div>
            <div className="flex items-center gap-2">
              <MessageCircle className="w-4 h-4 text-blue-400" />
              <span>WhatsApp available</span>
            </div>
          </div>
        </div>
      </section>

      {/* Residents Link */}
      <section className="px-4 py-8 text-center">
        <Link href="/residents" className="text-emerald-400 hover:text-emerald-300 transition-colors">
          Already living in Dubai? See resident services <ArrowRight className="w-4 h-4 inline ml-1" />
        </Link>
      </section>
    </div>
  );
}
