import { SEOMeta } from "@/components/seo-meta";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Navigation } from "@/components/navigation";
import { Handshake, Users, TrendingUp, MessageSquare, Mail, CheckCircle2 } from "lucide-react";
import { motion } from "framer-motion";

export default function RelocationAlliance() {
  const partnerTypes = [
    {
      title: "Relocation Companies",
      icon: Users,
      description: "Close the property deal. We activate the home.",
      benefits: [
        "White-label AquaCafe Move-In Welcome Service for your clients",
        "Referral commission on every booking",
        "Dedicated support for your portfolio",
        "Seamless handover process"
      ]
    },
    {
      title: "Moving & Logistics",
      icon: TrendingUp,
      description: "Coordinate the logistics layer. We ensure home readiness.",
      benefits: [
        "Joint service offerings to expand value",
        "Coordinated timelines for seamless transitions",
        "Revenue sharing on integrated packages",
        "Client satisfaction guarantee"
      ]
    },
    {
      title: "Real Estate Brokers",
      icon: Handshake,
      description: "Sell the apartment. We deliver the experience.",
      benefits: [
        "Tenant retention through superior move-in experience",
        "Competitive advantage over rival brokers",
        "Referral incentives per successful activation",
        "Marketing materials & co-branding available"
      ]
    },
    {
      title: "Cargo & Shipping",
      icon: Users,
      description: "Import the belongings. We prepare the home.",
      benefits: [
        "Coordinated arrival & home-ready timeline",
        "One unified point of contact for clients",
        "Referral partnerships",
        "Cross-promotion opportunities"
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <SEOMeta 
        title="DeliWer Relocation Alliance | Partner Program for Moving Companies | Dubai"
        description="Partner with DeliWer's AquaCafe Move-In Welcome Service. Relocation companies, movers, and brokers can refer clients and earn commissions. Let's grow together."
      />
      <Navigation />

      {/* Hero Section */}
      <section className="py-32 px-4 bg-gradient-to-b from-blue-500/10 to-transparent pt-32">
        <div className="max-w-5xl mx-auto text-center space-y-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <h1 className="text-6xl font-black uppercase mb-6 leading-tight">
              You Close the Deal <br />
              <span className="text-blue-400">We Activate the Home</span>
            </h1>
            <p className="text-xl text-gray-300 font-medium max-w-3xl mx-auto">
              DeliWer's Relocation Alliance partners with moving companies, real estate brokers, and logistics providers to deliver seamless move-in experiences in Dubai.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Partner Types */}
      <section className="py-24 px-4">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-4xl font-black uppercase text-center mb-12">
            Built for Every Partner Type
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {partnerTypes.map((partner, i) => {
              const Icon = partner.icon;
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                  viewport={{ once: true }}
                >
                  <Card className="bg-slate-900/50 border-white/10 p-8 h-full hover:border-blue-500/30 transition-all">
                    <div className="flex items-start gap-4 mb-4">
                      <Icon className="w-8 h-8 text-blue-400 flex-shrink-0" />
                      <div>
                        <h3 className="text-2xl font-black text-white">{partner.title}</h3>
                      </div>
                    </div>

                    <p className="text-gray-300 mb-6 italic">{partner.description}</p>

                    <div className="space-y-3">
                      {partner.benefits.map((benefit, j) => (
                        <div key={j} className="flex items-start gap-2">
                          <CheckCircle2 className="w-4 h-4 text-blue-400 flex-shrink-0 mt-0.5" />
                          <span className="text-sm text-gray-200">{benefit}</span>
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

      {/* How It Works */}
      <section className="py-24 px-4 bg-white/5 border-t border-white/10">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl font-black uppercase text-center mb-12">How the Alliance Works</h2>

          <div className="space-y-6">
            {[
              {
                num: "1",
                title: "You Refer Your Client",
                desc: "Share DeliWer's WhatsApp number with your client or tenant after they sign the lease."
              },
              {
                num: "2",
                title: "Client Contacts Us",
                desc: "Tenant reaches out via WhatsApp with their building, arrival date, and move-in needs."
              },
              {
                num: "3",
                title: "We Coordinate Everything",
                desc: "Ejari, DEWA, internet, cleaning, water—all orchestrated to complete before arrival."
              },
              {
                num: "4",
                title: "You Earn Commission",
                desc: "You receive referral fees per successful move-in. No complexity. Monthly payouts."
              },
              {
                num: "5",
                title: "Client Gets White-Glove Service",
                desc: "They arrive to a fully activated home. Zero stress. Maximum satisfaction."
              }
            ].map((step, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.1 }}
                viewport={{ once: true }}
                className="flex gap-6 bg-slate-900/50 border border-blue-500/20 rounded-xl p-6"
              >
                <div className="text-3xl font-black text-blue-400 flex-shrink-0">{step.num}</div>
                <div>
                  <h3 className="text-lg font-black text-white mb-2">{step.title}</h3>
                  <p className="text-gray-400">{step.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 px-4 bg-gradient-to-r from-blue-950/30 to-slate-950 border-t border-blue-500/20">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl font-black uppercase mb-4">Ready to Partner?</h2>
            <p className="text-xl text-gray-300 mb-8">
              Let's grow together. Contact DeliWer to discuss partnership opportunities, commission rates, and white-label solutions.
            </p>

            <div className="flex flex-col md:flex-row gap-4 justify-center">
              <a href="https://wa.me/971523906019?text=Hi%20DeliWer%2C%20I%27m%20interested%20in%20partnership%20opportunities%20for%20move-in%20services">
                <Button size="lg" className="bg-blue-600 hover:bg-blue-500 font-black h-14 px-12 text-lg">
                  <MessageSquare className="w-5 h-5 mr-2" />
                  Chat on WhatsApp
                </Button>
              </a>
              <a href="mailto:info@deliwer.com?subject=Relocation Alliance Partnership">
                <Button size="lg" variant="outline" className="border-blue-500/50 text-blue-300 bg-blue-500/10 hover:bg-blue-500/20 font-black h-14 px-12 text-lg">
                  <Mail className="w-5 h-5 mr-2" />
                  Email Us
                </Button>
              </a>
            </div>

            <p className="text-sm text-gray-400 mt-6">
              Currently partnering with movers, brokers, and relocation companies across UAE.
            </p>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
