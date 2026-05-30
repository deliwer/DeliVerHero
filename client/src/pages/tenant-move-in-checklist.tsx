import { SEOMeta } from "@/components/seo-meta";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Navigation } from "@/components/navigation";
import { CheckCircle2, MessageSquare, FileText, Zap, Droplets, Wifi, Sparkles, Home } from "lucide-react";
import { motion } from "framer-motion";
import { Link } from "wouter";

export default function TenantMoveInChecklist() {
  const checklist = [
    {
      title: "Ejari Registration",
      icon: FileText,
      description: "Register your tenancy with the Real Estate Regulatory Agency",
      details: [
        "Collect signed contract from landlord",
        "Visit RERA office or use online portal",
        "Pay registration fee (AED 370)",
        "Obtain Ejari certificate"
      ],
      color: "bg-blue-900/40 border-blue-500/30"
    },
    {
      title: "DEWA Activation",
      icon: Zap,
      description: "Connect electricity and water utilities to your apartment",
      details: [
        "Submit Ejari certificate to DEWA",
        "Choose meter type (individual/shared)",
        "Pay connection fee and deposit",
        "Receive meter activation confirmation"
      ],
      color: "bg-yellow-900/40 border-yellow-500/30"
    },
    {
      title: "Internet Installation",
      icon: Wifi,
      description: "Set up high-speed connectivity for your new home",
      details: [
        "Select internet provider (Etisalat, du, others)",
        "Schedule installation appointment",
        "Provide proof of residence (Ejari)",
        "Test connection before finalizing"
      ],
      color: "bg-purple-900/40 border-purple-500/30"
    },
    {
      title: "Deep Cleaning",
      icon: Sparkles,
      description: "Prepare apartment before moving furniture in",
      details: [
        "Professional deep clean of all rooms",
        "Sanitize kitchen and bathroom",
        "Polish floors and windows",
        "Move-in ready within 24 hours"
      ],
      color: "bg-green-900/40 border-green-500/30"
    },
    {
      title: "Water Filtration",
      icon: Droplets,
      description: "Ensure safe drinking water from day one",
      details: [
        "Test water quality on arrival",
        "Install RO filter system (if needed)",
        "Deliver bottled water starter supply",
        "Provide maintenance instructions"
      ],
      color: "bg-cyan-900/40 border-cyan-500/30"
    },
    {
      title: "Appliance Readiness",
      icon: Home,
      description: "Verify all appliances and systems work perfectly",
      details: [
        "AC servicing and filter replacement",
        "Refrigerator & kitchen appliance check",
        "Washing machine setup",
        "Full home safety inspection"
      ],
      color: "bg-emerald-900/40 border-emerald-500/30"
    }
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <SEOMeta 
        title="Dubai Tenant Move-In Checklist | Ejari, DEWA & Home Setup | DeliWer"
        description="Complete Dubai tenant move-in checklist: Ejari registration, DEWA activation, internet, cleaning, water filtration, and appliance readiness. Let DeliWer handle it all."
      />
      <Navigation />

      {/* Hero Section */}
      <section className="py-32 px-4 bg-gradient-to-b from-emerald-500/10 to-transparent pt-32">
        <div className="max-w-5xl mx-auto text-center space-y-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <h1 className="text-6xl font-black uppercase mb-4">
              Dubai Tenant Move-In Checklist
            </h1>
            <p className="text-xl text-gray-300 font-medium max-w-3xl mx-auto">
              6 essential steps to activate your new home. Handle them yourself or let DeliWer take care of everything.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Checklist Items */}
      <section className="py-24 px-4">
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {checklist.map((item, i) => {
              const Icon = item.icon;
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                  viewport={{ once: true }}
                >
                  <Card className={`${item.color} border rounded-2xl p-8 h-full`}>
                    <div className="flex items-start gap-4 mb-4">
                      <div className="flex-shrink-0">
                        <Icon className="w-8 h-8 text-emerald-400" />
                      </div>
                      <div>
                        <h3 className="text-2xl font-black text-white">{item.title}</h3>
                      </div>
                    </div>

                    <p className="text-gray-300 mb-6 text-sm leading-relaxed">
                      {item.description}
                    </p>

                    <div className="space-y-3">
                      {item.details.map((detail, j) => (
                        <div key={j} className="flex items-start gap-2">
                          <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
                          <span className="text-sm text-gray-200">{detail}</span>
                        </div>
                      ))}
                    </div>
                  </Card>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Why DeliWer Section */}
      <section className="py-24 px-4 bg-white/5 border-t border-white/10">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl font-black uppercase mb-4">The Simplest Solution</h2>
            <p className="text-xl text-gray-300 mb-8">
              Instead of managing 6 separate tasks across different departments and timeline delays, DeliWer handles your entire move-in orchestration in one go.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
              <Card className="bg-slate-900/50 border-emerald-500/30 p-6">
                <h3 className="text-2xl font-black text-emerald-400 mb-2">1 Contact</h3>
                <p className="text-gray-300 text-sm">Single WhatsApp number. No juggling between authorities and vendors.</p>
              </Card>
              <Card className="bg-slate-900/50 border-emerald-500/30 p-6">
                <h3 className="text-2xl font-black text-emerald-400 mb-2">1 Timeline</h3>
                <p className="text-gray-300 text-sm">Everything coordinated to complete before your arrival date.</p>
              </Card>
              <Card className="bg-slate-900/50 border-emerald-500/30 p-6">
                <h3 className="text-2xl font-black text-emerald-400 mb-2">1 Price</h3>
                <p className="text-gray-300 text-sm">AED 399 AquaCafe Move-In Welcome Service. Transparent. No surprises.</p>
              </Card>
            </div>

            <div className="flex flex-col md:flex-row gap-4 justify-center">
              <a href="https://wa.me/971523906019?text=Hi%20DeliWer%2C%20I%20just%20signed%20a%20lease%20and%20need%20help%20with%20my%20move-in%20checklist">
                <Button size="lg" className="bg-emerald-600 hover:bg-emerald-500 font-black h-14 px-12 text-lg">
                  <MessageSquare className="w-5 h-5 mr-2" />
                  Book on WhatsApp
                </Button>
              </a>
              <Link href="/move-in-services">
                <Button size="lg" variant="outline" className="border-emerald-500/50 text-emerald-300 bg-emerald-500/10 hover:bg-emerald-500/20 font-black h-14 px-12 text-lg">
                  Explore All Services
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
