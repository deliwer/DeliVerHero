import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Link, useLocation } from "wouter";
import { Home, Plane, ArrowRight, MessageCircle, DollarSign, Shield, CheckCircle, MapPin, Mail, X, CheckCircle2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { TrustStrip, PartnerStrip, TestimonialCarousel, OperationalBadges } from "@/components/trust-strip";
import { useState, useEffect } from "react";

import heroBg from "@/assets/hero-bg-concierge.png";

export default function LandingPage() {
  const [, setLocation] = useLocation();
  const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {
    // Check if the popup has been shown in this session
    const popupShown = sessionStorage.getItem("deliwer_popup_shown");
    if (!popupShown) {
      // We'll trigger it when they click the button, not automatically
    }
  }, []);

  const handleResidentsClick = () => {
    const popupShown = sessionStorage.getItem("deliwer_popup_shown");
    if (!popupShown) {
      setShowPopup(true);
    } else {
      setLocation("/residents");
    }
  };

  const handlePopupChoice = (route: string, tag?: string) => {
    sessionStorage.setItem("deliwer_popup_shown", "true");
    setShowPopup(false);
    if (tag) {
      // In a real app, we'd append this to the WhatsApp URL or state
      // For now, we just route
    }
    setLocation(route);
  };

  return (
    <div className="min-h-screen bg-dubai-gradient">
      {/* Part 2: Dismissible Modal */}
      <AnimatePresence>
        {showPopup && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-950/90 backdrop-blur-xl">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="max-w-xl w-full bg-slate-900 border border-emerald-500/30 rounded-[3rem] p-10 md:p-14 relative shadow-2xl overflow-hidden"
            >
              <button 
                onClick={() => setShowPopup(false)}
                className="absolute top-8 right-8 text-gray-500 hover:text-white transition-colors"
              >
                <X className="w-8 h-8" />
              </button>

              <div className="space-y-8">
                <div className="space-y-4">
                  <h3 className="text-3xl md:text-4xl font-black uppercase tracking-tighter text-white">How DeliWer Helps Residents</h3>
                  <p className="text-xl text-emerald-100 font-bold leading-tight">
                    DeliWer is not a mover or a contractor.
                  </p>
                  <p className="text-lg text-gray-300">
                    We sit on top of them — planning, coordinating, and managing everything so you don’t have to.
                  </p>
                  <p className="text-sm text-emerald-400 font-black uppercase tracking-widest">
                    One point of contact. One WhatsApp. Fewer mistakes.
                  </p>
                </div>

                <div className="space-y-4">
                  <Button 
                    onClick={() => handlePopupChoice("/residents", "maintenance_flow")}
                    className="w-full h-16 bg-emerald-600 hover:bg-emerald-500 text-white font-black uppercase tracking-widest rounded-2xl flex items-center justify-between px-8"
                  >
                    <span>I need something fixed at home</span>
                    <ArrowRight className="w-5 h-5" />
                  </Button>
                  <Button 
                    onClick={() => handlePopupChoice("/relocate", "move_flow")}
                    className="w-full h-16 bg-blue-600 hover:bg-blue-500 text-white font-black uppercase tracking-widest rounded-2xl flex items-center justify-between px-8"
                  >
                    <span>I’m moving in or moving out</span>
                    <ArrowRight className="w-5 h-5" />
                  </Button>
                  <Button 
                    onClick={() => handlePopupChoice("/residents", "life_concierge_flow")}
                    variant="outline"
                    className="w-full h-16 border-white/10 text-white hover:bg-white/5 font-black uppercase tracking-widest rounded-2xl flex items-center justify-between px-8"
                  >
                    <span>Something else came up</span>
                    <ArrowRight className="w-5 h-5" />
                  </Button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Micro Trust Line - Always Above Fold */}
      <section className="px-4 py-3 border-b border-white/10">
        <div className="max-w-4xl mx-auto">
          <TrustStrip variant="dark" showContact={true} />
        </div>
      </section>

      {/* Hero Section */}
      <section className="min-h-[80vh] flex flex-col items-center justify-center px-4 py-12 relative overflow-hidden">
        {/* Background Image with Wash */}
        <div 
          className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat"
          style={{ 
            backgroundImage: `url(${heroBg})`,
          }}
        >
          <div className="absolute inset-0 bg-black/60 backdrop-blur-[2px]" />
        </div>

        <div className="max-w-4xl w-full text-center space-y-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-white mb-4">
              Your Personal Dubai <span className="text-emerald-400">Life Concierge.</span>
            </h1>
            <p className="text-xl text-emerald-100/90 max-w-2xl mx-auto font-medium">
              We orchestrate your home, your move, and your life in the city — so you can focus on living, while we handle the complexity.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8 mt-12">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <div onClick={handleResidentsClick} data-testid="card-residents" className="cursor-pointer">
                <Card className="bg-black/40 border-emerald-500/30 hover:border-emerald-500/60 transition-all duration-300 group overflow-hidden relative h-full">
                  <div className="absolute inset-0 bg-emerald-500/5 opacity-0 group-hover:opacity-100 transition-opacity" />
                  <CardContent className="p-8 flex flex-col items-center text-center space-y-6 h-full">
                    <div className="w-16 h-16 rounded-full bg-emerald-500/20 flex items-center justify-center text-emerald-400">
                      <Home className="w-8 h-8" />
                    </div>
                    <div className="flex-1">
                      <h2 className="text-2xl font-bold text-white mb-2">I’m Living in Dubai</h2>
                      <p className="text-emerald-100/60 leading-relaxed">
                        Access home services, water delivery, maintenance, and lifestyle perks designed for expat rentals.
                      </p>
                    </div>
                    <div className="w-full">
                      <Button 
                        className="w-full bg-emerald-600 hover:bg-emerald-500 text-white gap-2 h-12 text-lg"
                        data-testid="button-residents"
                      >
                        Explore Services <ArrowRight className="w-5 h-5" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <Link href="/relocate" data-testid="card-relocate">
                <Card className="bg-black/40 border-blue-500/30 hover:border-blue-500/60 transition-all duration-300 group overflow-hidden relative h-full cursor-pointer">
                  <div className="absolute inset-0 bg-blue-500/5 opacity-0 group-hover:opacity-100 transition-opacity" />
                  <CardContent className="p-8 flex flex-col items-center text-center space-y-6 h-full">
                    <div className="w-16 h-16 rounded-full bg-blue-500/20 flex items-center justify-center text-blue-400">
                      <Plane className="w-8 h-8" />
                    </div>
                    <div className="flex-1">
                      <h2 className="text-2xl font-bold text-white mb-2">I’m Relocating</h2>
                      <p className="text-blue-100/60 leading-relaxed">
                        Moving to or from Dubai? Get move-in packs, exit support, and concierge services.
                      </p>
                    </div>
                    <div className="w-full">
                      <Button 
                        className="w-full bg-blue-600 hover:bg-blue-500 text-white gap-2 h-12 text-lg"
                        data-testid="button-relocate"
                      >
                        View Packages <ArrowRight className="w-5 h-5" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="mt-6"
          >
            <Link href="/business-setup">
              <span className="text-emerald-100/40 text-sm font-medium hover:text-emerald-400 transition-colors cursor-pointer">
                Setting up a company in Dubai? → <span className="underline decoration-emerald-500/30 underline-offset-4">Business Setup</span>
              </span>
            </Link>
          </motion.div>

          {/* Quick Trust Signals */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="mt-8"
          >
            <div className="flex flex-wrap justify-center gap-6 text-emerald-100/60 text-sm">
              <div className="flex items-center gap-2">
                <MessageCircle className="w-4 h-4 text-emerald-400" />
                <span>WhatsApp support</span>
              </div>
              <div className="flex items-center gap-2">
                <DollarSign className="w-4 h-4 text-emerald-400" />
                <span>Fixed pricing</span>
              </div>
              <div className="flex items-center gap-2">
                <Shield className="w-4 h-4 text-emerald-400" />
                <span>Rental-friendly services</span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Partner/Endorsement Strip */}
      <section className="px-4">
        <div className="max-w-4xl mx-auto">
          <PartnerStrip />
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="px-4 py-12">
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <h2 className="text-2xl font-bold text-white text-center mb-8">What Our Clients Say</h2>
            <TestimonialCarousel variant="dark" limit={3} />
          </motion.div>
        </div>
      </section>

      {/* Operational Badges */}
      <section className="px-4 py-12 border-t border-white/10">
        <div className="max-w-4xl mx-auto">
          <OperationalBadges variant="dark" />
        </div>
      </section>
    </div>
  );
}
