import { SEOMeta } from "@/components/seo-meta";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Navigation } from "@/components/navigation";
import { TrendingUp, DollarSign, Users, CheckCircle2, MessageSquare } from "lucide-react";
import { motion } from "framer-motion";
import { Link } from "wouter";

export default function PartnerProgram() {
  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <SEOMeta 
        title="Partner Program | Earn 20% Commission | DeliWer"
        description="Join DeliWer's partner program and earn 20% commission on every Move-In Concierge booking you refer. Track conversions in real-time."
      />
      <Navigation />

      {/* Hero Section */}
      <section className="py-32 px-4 bg-gradient-to-b from-emerald-500/10 to-transparent pt-32">
        <div className="max-w-5xl mx-auto text-center space-y-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            <h1 className="text-6xl font-black uppercase">
              Earn 20% Commission <span className="text-emerald-500">Every Booking</span>
            </h1>
            <p className="text-xl text-gray-300 font-medium">
              Promote DeliWer's Move-In Concierge and get paid directly for every successful referral. Track everything in real-time.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Economics Section */}
      <section className="py-24 px-4 bg-white/5 border-t border-white/10">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-4xl font-black uppercase mb-12 text-center">Partner Economics</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            <Card className="bg-emerald-900/40 border-emerald-500/50 p-8">
              <div className="text-center space-y-4">
                <DollarSign className="w-12 h-12 text-emerald-400 mx-auto" />
                <h3 className="text-2xl font-black">Move-In Concierge Price</h3>
                <p className="text-5xl font-black text-emerald-300">AED 399</p>
                <p className="text-gray-400">Per booking</p>
              </div>
            </Card>

            <Card className="bg-blue-900/40 border-blue-500/50 p-8">
              <div className="text-center space-y-4">
                <TrendingUp className="w-12 h-12 text-blue-400 mx-auto" />
                <h3 className="text-2xl font-black">Your Commission</h3>
                <p className="text-5xl font-black text-blue-300">20%</p>
                <p className="text-gray-400">On every sale</p>
              </div>
            </Card>

            <Card className="bg-yellow-900/40 border-yellow-500/50 p-8">
              <div className="text-center space-y-4">
                <DollarSign className="w-12 h-12 text-yellow-400 mx-auto" />
                <h3 className="text-2xl font-black">You Earn</h3>
                <p className="text-5xl font-black text-yellow-300">AED 79.80</p>
                <p className="text-gray-400">Per conversion</p>
              </div>
            </Card>
          </div>

          {/* Example Scenarios */}
          <div className="space-y-8">
            <h3 className="text-3xl font-black text-center mb-8">Earnings Examples</h3>
            
            {[
              { referrals: 5, conversions: 1, rate: "20%", earnings: 79.80, period: "per month" },
              { referrals: 25, conversions: 5, rate: "20%", earnings: 399, period: "per month" },
              { referrals: 100, conversions: 20, rate: "20%", earnings: 1596, period: "per month" },
            ].map((scenario, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                viewport={{ once: true }}
                className="bg-slate-900/50 border border-emerald-500/30 rounded-2xl p-8"
              >
                <div className="grid grid-cols-2 md:grid-cols-5 gap-6 items-center">
                  <div>
                    <p className="text-gray-400 text-sm font-bold">REFERRALS</p>
                    <p className="text-3xl font-black text-white">{scenario.referrals}</p>
                  </div>
                  <div>
                    <p className="text-gray-400 text-sm font-bold">CONVERSIONS</p>
                    <p className="text-3xl font-black text-emerald-400">{scenario.conversions}</p>
                  </div>
                  <div>
                    <p className="text-gray-400 text-sm font-bold">RATE</p>
                    <p className="text-3xl font-black text-blue-400">{scenario.rate}</p>
                  </div>
                  <div>
                    <p className="text-gray-400 text-sm font-bold">YOU EARN</p>
                    <p className="text-3xl font-black text-yellow-400">AED {scenario.earnings}</p>
                  </div>
                  <div>
                    <p className="text-gray-400 text-xs font-bold uppercase">{scenario.period}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Commission Tracking Section */}
      <section className="py-24 px-4">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-4xl font-black uppercase mb-12 text-center">Real-Time Commission Tracking</h2>
          
          <Card className="bg-slate-900/50 border-cyan-500/30 p-8 mb-12">
            <h3 className="text-2xl font-black text-cyan-400 mb-8">How Partner Tracking Works</h3>
            
            <div className="space-y-6">
              {[
                {
                  step: "1",
                  title: "Get Your Unique Link",
                  desc: "Visit /partners and generate your custom link. Example: https://deliwer.com/start?ref=debacci&agent=yourname",
                  icon: "🔗"
                },
                {
                  step: "2",
                  title: "Share Everywhere",
                  desc: "Post on WhatsApp groups, LinkedIn, community channels, email. Every link click is tracked.",
                  icon: "📢"
                },
                {
                  step: "3",
                  title: "Customer Lands on /start",
                  desc: "Your unique ref parameter is stored in their browser (localStorage). Persists for 30 days.",
                  icon: "📲"
                },
                {
                  step: "4",
                  title: "Customer Books via WhatsApp",
                  desc: "When they book, your partner name & agent info auto-fills in the WhatsApp message to +971523946311",
                  icon: "💬"
                },
                {
                  step: "5",
                  title: "Conversion Logged",
                  desc: "DeliWer team receives booking with your attribution. Conversion counted in real-time dashboard.",
                  icon: "✅"
                },
                {
                  step: "6",
                  title: "Commission Calculated",
                  desc: "Automatically: AED 399 (booking) × 20% (commission) = AED 79.80 to you. Monthly payouts.",
                  icon: "💰"
                },
              ].map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.1 }}
                  viewport={{ once: true }}
                  className="flex gap-6 bg-slate-950/50 border border-cyan-500/20 rounded-xl p-6"
                >
                  <div className="flex-shrink-0 text-4xl">{item.icon}</div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-sm font-black text-cyan-400">Step {item.step}</span>
                      <h4 className="text-lg font-black text-white">{item.title}</h4>
                    </div>
                    <p className="text-gray-400 text-sm">{item.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </Card>

          {/* Real Example */}
          <Card className="bg-emerald-900/30 border-emerald-500/30 p-8">
            <h3 className="text-2xl font-black text-emerald-300 mb-6">Real-Time Example: DeBacci Capital</h3>
            
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-slate-950/50 border border-emerald-500/30 rounded-lg p-4">
                  <p className="text-gray-400 text-xs font-bold mb-2">LINK SHARED</p>
                  <code className="text-xs text-emerald-300 font-mono break-all">https://deliwer.com/start?ref=debacci&agent=john</code>
                </div>
                <div className="bg-slate-950/50 border border-blue-500/30 rounded-lg p-4">
                  <p className="text-gray-400 text-xs font-bold mb-2">CLICKS TRACKED</p>
                  <p className="text-2xl font-black text-blue-300">247</p>
                </div>
                <div className="bg-slate-950/50 border border-emerald-500/30 rounded-lg p-4">
                  <p className="text-gray-400 text-xs font-bold mb-2">CONVERSIONS</p>
                  <p className="text-2xl font-black text-emerald-300">18</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-slate-950/50 border border-yellow-500/30 rounded-lg p-4">
                  <p className="text-gray-400 text-xs font-bold mb-2">REVENUE GENERATED</p>
                  <p className="text-2xl font-black text-yellow-300">AED 7,182</p>
                  <p className="text-xs text-gray-500 mt-1">18 × AED 399</p>
                </div>
                <div className="bg-slate-950/50 border border-green-500/30 rounded-lg p-4">
                  <p className="text-gray-400 text-xs font-bold mb-2">YOUR COMMISSION (20%)</p>
                  <p className="text-2xl font-black text-green-300">AED 1,436.40</p>
                  <p className="text-xs text-gray-500 mt-1">AED 7,182 × 20%</p>
                </div>
                <div className="bg-slate-950/50 border border-purple-500/30 rounded-lg p-4">
                  <p className="text-gray-400 text-xs font-bold mb-2">CONVERSION RATE</p>
                  <p className="text-2xl font-black text-purple-300">7.3%</p>
                  <p className="text-xs text-gray-500 mt-1">18 ÷ 247 clicks</p>
                </div>
              </div>

              <div className="bg-slate-950/50 border border-cyan-500/20 rounded-lg p-6">
                <p className="text-gray-300 mb-4">
                  <strong className="text-white">Every metric is visible in real-time</strong> on the partner dashboard at <code className="text-cyan-400">/marketing</code>. 
                  Monitor your referrals, conversions, and earnings 24/7.
                </p>
              </div>
            </div>
          </Card>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 px-4 bg-gradient-to-r from-emerald-950/30 to-slate-950 border-t border-emerald-500/20">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl font-black uppercase mb-4">Ready to Start Earning?</h2>
            <p className="text-xl text-gray-300 mb-8">Generate your unique referral link and start promoting today.</p>
            
            <div className="flex flex-col md:flex-row gap-4 justify-center">
              <Link href="/partners">
                <Button size="lg" className="bg-emerald-600 hover:bg-emerald-500 font-black h-14 px-12 text-lg">
                  Generate Your Link →
                </Button>
              </Link>
              <a href="https://wa.me/971523946311">
                <Button size="lg" variant="outline" className="border-emerald-500/50 text-emerald-300 bg-emerald-500/10 hover:bg-emerald-500/20 font-black h-14 px-12 text-lg">
                  <MessageSquare className="w-5 h-5 mr-2" />
                  Questions? Chat Us
                </Button>
              </a>
            </div>

            <p className="text-sm text-gray-400 mt-6">
              Payouts calculated monthly. Zero hidden fees. 20% commission rate, guaranteed.
            </p>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
