import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Link } from "wouter";
import { Wrench, Droplets, Zap, Recycle, ArrowRight, MessageCircle, Shield, DollarSign, Users } from "lucide-react";
import { motion } from "framer-motion";
import { TrustStrip, TestimonialCarousel, ProcessMicroflow } from "@/components/trust-strip";

const actionTiles = [
  {
    id: "maintenance",
    title: "Something Needs Fixing",
    description: "AC, plumbing, electrical, or emergency repairs",
    icon: Wrench,
    color: "emerald",
    href: "/contact?service=maintenance",
    cta: "Book Maintenance"
  },
  {
    id: "water",
    title: "I Need Water or Essentials",
    description: "Water delivery, household supplies, and everyday needs",
    icon: Droplets,
    color: "blue",
    href: "/products",
    cta: "Order Water & Essentials"
  },
  {
    id: "upgrade",
    title: "I Want to Improve my Home",
    description: "Interior Fitouts, Smart Home Systems",
    icon: Zap,
    color: "amber",
    href: "/contact?service=upgrade",
    cta: "Upgrade My Home"
  },
  {
    id: "tradein",
    title: "I Need to Remove or Replace Items",
    description: "Trade-in old items, e-waste recycling, responsible disposal",
    icon: Recycle,
    color: "green",
    href: "/ewaste",
    cta: "Trade-In / Recycle"
  }
];

const colorClasses = {
  emerald: {
    bg: "bg-emerald-500/20",
    text: "text-emerald-400",
    border: "border-emerald-500/30",
    hoverBorder: "hover:border-emerald-500/60",
    button: "bg-emerald-600 hover:bg-emerald-500"
  },
  blue: {
    bg: "bg-blue-500/20",
    text: "text-blue-400",
    border: "border-blue-500/30",
    hoverBorder: "hover:border-blue-500/60",
    button: "bg-blue-600 hover:bg-blue-500"
  },
  amber: {
    bg: "bg-amber-500/20",
    text: "text-amber-400",
    border: "border-amber-500/30",
    hoverBorder: "hover:border-amber-500/60",
    button: "bg-amber-600 hover:bg-amber-500"
  },
  green: {
    bg: "bg-green-500/20",
    text: "text-green-400",
    border: "border-green-500/30",
    hoverBorder: "hover:border-green-500/60",
    button: "bg-green-600 hover:bg-green-500"
  }
};

export default function ResidentsPage() {
  const scrollToTiles = () => {
    document.getElementById('action-tiles')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-dubai-gradient">
      {/* Micro Trust Line - Always Above Fold */}
      <section className="px-4 py-3 border-b border-white/10">
        <div className="max-w-4xl mx-auto">
          <TrustStrip variant="dark" showContact={true} />
        </div>
      </section>

      {/* Hero Section */}
      <section className="px-4 py-16 md:py-20">
        <div className="max-w-4xl mx-auto text-center space-y-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-3xl md:text-5xl font-bold tracking-tight text-white mb-4">
              Everything Your Dubai Home Needs — <span className="text-emerald-400">Without the Hassle</span>
            </h1>
            <p className="text-lg md:text-xl text-emerald-100/80 max-w-2xl mx-auto">
              Maintenance, water, essentials, and support — designed for expats in rental homes
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <Button 
              onClick={scrollToTiles}
              className="bg-emerald-600 hover:bg-emerald-500 text-white gap-2 h-12 text-lg px-8"
              data-testid="button-get-help"
            >
              Get Help With My Home <ArrowRight className="w-5 h-5" />
            </Button>
          </motion.div>
        </div>
      </section>

      {/* Action Tiles Section */}
      <section id="action-tiles" className="px-4 py-12 md:py-16">
        <div className="max-w-5xl mx-auto">
          <div className="grid md:grid-cols-2 gap-6">
            {actionTiles.map((tile, index) => {
              const colors = colorClasses[tile.color as keyof typeof colorClasses];
              return (
                <motion.div
                  key={tile.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.1 * index }}
                >
                  <Card className={`bg-black/40 ${colors.border} ${colors.hoverBorder} transition-all duration-300 group overflow-hidden relative h-full`}>
                    <div className={`absolute inset-0 ${colors.bg} opacity-0 group-hover:opacity-50 transition-opacity`} />
                    <CardContent className="p-6 md:p-8 flex flex-col space-y-4 h-full relative">
                      <div className={`w-14 h-14 rounded-full ${colors.bg} flex items-center justify-center ${colors.text}`}>
                        <tile.icon className="w-7 h-7" />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-xl font-bold text-white mb-2">{tile.title}</h3>
                        <p className="text-gray-300/70">{tile.description}</p>
                      </div>
                      <Link href={tile.href}>
                        <Button 
                          className={`w-full ${colors.button} text-white gap-2`}
                          data-testid={`button-${tile.id}`}
                        >
                          {tile.cta} <ArrowRight className="w-4 h-4" />
                        </Button>
                      </Link>
                    </CardContent>
                  </Card>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Process Microflow */}
      <section className="px-4 py-12 border-t border-white/10">
        <div className="max-w-4xl mx-auto">
          <h3 className="text-lg font-semibold text-white text-center mb-8">How It Works</h3>
          <ProcessMicroflow variant="dark" />
        </div>
      </section>

      {/* Testimonials */}
      <section className="px-4 py-12">
        <div className="max-w-5xl mx-auto">
          <h3 className="text-lg font-semibold text-white text-center mb-8">What Residents Say</h3>
          <TestimonialCarousel variant="dark" limit={2} />
        </div>
      </section>

      {/* Trust Strip */}
      <section className="px-4 py-8 border-t border-white/10">
        <div className="max-w-4xl mx-auto">
          <div className="flex flex-wrap justify-center gap-6 md:gap-10 text-emerald-100/70 text-sm">
            <div className="flex items-center gap-2">
              <Shield className="w-4 h-4 text-emerald-400" />
              <span>Rental-friendly</span>
            </div>
            <div className="flex items-center gap-2">
              <DollarSign className="w-4 h-4 text-emerald-400" />
              <span>Fixed pricing</span>
            </div>
            <div className="flex items-center gap-2">
              <Users className="w-4 h-4 text-emerald-400" />
              <span>One accountable team</span>
            </div>
            <div className="flex items-center gap-2">
              <MessageCircle className="w-4 h-4 text-emerald-400" />
              <span>WhatsApp available</span>
            </div>
          </div>
        </div>
      </section>

      {/* Relocate Link */}
      <section className="px-4 py-8 text-center">
        <Link href="/relocate" className="text-blue-400 hover:text-blue-300 transition-colors">
          Moving in or moving out of Dubai? <ArrowRight className="w-4 h-4 inline ml-1" />
        </Link>
      </section>
    </div>
  );
}
