import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Link } from "wouter";
import { Home, Plane, ArrowRight, MessageCircle, DollarSign, Shield, CheckCircle, MapPin, Mail } from "lucide-react";
import { motion } from "framer-motion";
import { TrustStrip, PartnerStrip, TestimonialCarousel, OperationalBadges } from "@/components/trust-strip";

import heroBg from "@/assets/hero-bg.png";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-dubai-gradient">
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
              Home Life in Dubai, <span className="text-emerald-400">Simplified.</span>
            </h1>
            <p className="text-xl text-emerald-100/80 max-w-2xl mx-auto">
              Practical home services for expats — whether you already live in Dubai or are moving in or out.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8 mt-12">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <Link href="/residents" data-testid="card-residents">
                <Card className="bg-black/40 border-emerald-500/30 hover:border-emerald-500/60 transition-all duration-300 group overflow-hidden relative h-full cursor-pointer">
                  <div className="absolute inset-0 bg-emerald-500/5 opacity-0 group-hover:opacity-100 transition-opacity" />
                  <CardContent className="p-8 flex flex-col items-center text-center space-y-6 h-full">
                    <div className="w-16 h-16 rounded-full bg-emerald-500/20 flex items-center justify-center text-emerald-400">
                      <Home className="w-8 h-8" />
                    </div>
                    <div className="flex-1">
                      <h2 className="text-2xl font-bold text-white mb-2">I Live in Dubai</h2>
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
              </Link>
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
                      <h2 className="text-2xl font-bold text-white mb-2">I'm Relocating</h2>
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
