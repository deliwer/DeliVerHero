import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Link } from "wouter";
import { Wrench, Droplets, Zap, Recycle, ArrowRight, MessageCircle, Shield, DollarSign, Users } from "lucide-react";
import { motion } from "framer-motion";
import { TrustStrip, TestimonialCarousel, ProcessMicroflow } from "@/components/trust-strip";
import residentsHero from "@/assets/images/residents-hero.jpg";

const actionTiles = [
  {
    id: "tradein",
    title: "I Need to Remove or Replace Items",
    description: "Trade-in old items, e-waste recycling, responsible disposal",
    icon: Recycle,
    color: "green",
    href: "/ewaste",
    cta: "Trade-In / Recycle",
    featured: true
  },
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
  return (
    <div className="min-h-screen bg-slate-950 text-white selection:bg-emerald-500/30">
      {/* Micro Trust Line - Always Above Fold */}
      <section className="px-4 py-3 border-b border-white/10 bg-black/40">
        <div className="max-w-4xl mx-auto">
          <TrustStrip variant="dark" showContact={true} />
        </div>
      </section>

      {/* Hero Section */}
      <section className="relative min-h-[70vh] flex items-center justify-center overflow-hidden">
        <div 
          className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat scale-105"
          style={{ backgroundImage: `url(${residentsHero})` }}
        />
        {/* Dark Wash Gradient */}
        <div className="absolute inset-0 z-0 bg-gradient-to-b from-slate-950/40 via-slate-950/70 to-slate-950" />
        
        <div className="relative z-10 text-center px-4 max-w-4xl py-24 space-y-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-4xl md:text-6xl font-black uppercase tracking-tighter mb-6 leading-[0.9] text-white">
              Sustainable Living <br />
              <span className="bg-gradient-to-r from-emerald-400 to-emerald-600 bg-clip-text text-transparent italic">Simplified for Dubai</span>
            </h1>
            <p className="text-lg md:text-xl text-gray-200 max-w-2xl mx-auto leading-relaxed">
              Your home, fully managed. From maintenance and water to responsible trade-ins and upgrades.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="flex flex-wrap justify-center gap-4"
          >
            <Button 
              size="lg"
              className="bg-emerald-600 hover:bg-emerald-500 text-white font-black uppercase tracking-wider rounded-xl h-14 px-8 shadow-xl shadow-emerald-900/20"
              onClick={() => document.getElementById('action-tiles')?.scrollIntoView({ behavior: 'smooth' })}
            >
              Explore Services
            </Button>
            <Link href="/ewaste">
              <Button 
                variant="outline"
                size="lg"
                className="border-white/20 text-white backdrop-blur-md bg-white/5 hover:bg-white/10 font-black uppercase tracking-wider rounded-xl h-14 px-8"
              >
                Trade-In Now
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Action Tiles Section */}
      <section id="action-tiles" className="px-4 py-24 bg-slate-950">
        <div className="max-w-5xl mx-auto">
          <div className="grid md:grid-cols-2 gap-8">
            {actionTiles.map((tile, index) => {
              const colors = colorClasses[tile.color as keyof typeof colorClasses];
              return (
                <motion.div
                  key={tile.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.1 * index }}
                  className={tile.featured ? "md:col-span-2" : ""}
                >
                  <Card className={`bg-white/5 border-white/10 hover-elevate transition-all duration-300 group overflow-hidden relative h-full rounded-[2rem] ${tile.featured ? 'border-emerald-500/30' : ''}`}>
                    <CardContent className={`p-8 flex flex-col space-y-6 h-full relative ${tile.featured ? 'md:flex-row md:items-center md:space-y-0 md:gap-12' : ''}`}>
                      <div className={`w-16 h-16 rounded-2xl ${colors.bg} flex items-center justify-center ${colors.text} shrink-0 shadow-inner`}>
                        <tile.icon className="w-8 h-8" />
                      </div>
                      <div className="flex-1">
                        <h3 className={`${tile.featured ? 'text-3xl' : 'text-xl'} font-black uppercase tracking-tight text-white mb-2`}>{tile.title}</h3>
                        <p className="text-gray-400 leading-relaxed">{tile.description}</p>
                      </div>
                      <Link href={tile.href} className={tile.featured ? 'md:w-64' : 'w-full'}>
                        <Button 
                          className={`w-full ${colors.button} text-white font-black uppercase tracking-widest h-14 rounded-xl gap-2`}
                          data-testid={`button-${tile.id}`}
                        >
                          {tile.cta} <ArrowRight className="w-5 h-5" />
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

      {/* Process Section */}
      <section className="px-4 py-24 border-t border-white/5 bg-slate-900/30">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-black uppercase tracking-tighter text-white">The DeliWer Journey</h2>
            <p className="text-gray-400 mt-2 uppercase tracking-widest text-xs font-bold">Book • Inspect • Ready</p>
          </div>
          <ProcessMicroflow variant="dark" />
        </div>
      </section>

      {/* Testimonials */}
      <section className="px-4 py-24">
        <div className="max-w-5xl mx-auto">
          <h3 className="text-2xl font-black uppercase text-white text-center mb-12">Trusted by 1000+ Dubai Homes</h3>
          <TestimonialCarousel variant="dark" limit={2} />
        </div>
      </section>

      {/* Operational Trust Strip */}
      <section className="px-4 py-12 border-t border-white/5 bg-black/20">
        <div className="max-w-5xl mx-auto">
          <div className="flex flex-wrap justify-center gap-8 md:gap-16 text-gray-400 text-sm font-bold uppercase tracking-widest">
            <div className="flex items-center gap-3">
              <Shield className="w-5 h-5 text-emerald-500" />
              <span>Rental-friendly</span>
            </div>
            <div className="flex items-center gap-3">
              <DollarSign className="w-5 h-5 text-emerald-500" />
              <span>Fixed pricing</span>
            </div>
            <div className="flex items-center gap-3">
              <Users className="w-5 h-5 text-emerald-500" />
              <span>One accountable team</span>
            </div>
            <div className="flex items-center gap-3">
              <MessageCircle className="w-5 h-5 text-emerald-500" />
              <span>WhatsApp Support</span>
            </div>
          </div>
        </div>
      </section>

      {/* Journey Guide */}
      <section className="px-4 py-16 text-center border-t border-white/5">
        <Link href="/relocate" className="group inline-flex items-center gap-2 text-emerald-400 hover:text-emerald-300 font-black uppercase tracking-widest transition-all">
          Moving in or out of Dubai? 
          <span className="group-hover:translate-x-1 transition-transform">
            <ArrowRight className="w-5 h-5" />
          </span>
        </Link>
      </section>
    </div>
  );
}
