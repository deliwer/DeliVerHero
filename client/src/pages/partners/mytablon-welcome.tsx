import { SEOMeta } from "@/components/seo-meta";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Navigation } from "@/components/navigation";
import { MessageSquare, TrendingUp, DollarSign, Users } from "lucide-react";
import { motion } from "framer-motion";
import { Link } from "wouter";

export default function MytablonWelcome() {
  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <SEOMeta 
        title="Welcome MyTablon | Earn 20% on Every Referral | DeliWer"
        description="Welcome to DeliWer's partner program. Earn AED 79.80 per booking referral. Track your conversions in real-time."
      />
      <Navigation />

      <section className="py-32 px-4 bg-gradient-to-b from-red-500/10 to-transparent pt-32">
        <div className="max-w-5xl mx-auto text-center space-y-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            <h1 className="text-6xl font-black uppercase">
              Welcome <span className="text-red-500">MyTablon</span>
            </h1>
            <p className="text-xl text-gray-300 font-medium">
              Help your community members activate their Dubai homes. Earn 20% commission on every referral.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-3xl mx-auto mt-12">
            <Card className="bg-red-900/40 border-red-500/50 p-6">
              <Users className="w-10 h-10 text-red-400 mb-3" />
              <p className="font-bold mb-1">Your Partner Code</p>
              <code className="text-red-300 font-mono">mytablon</code>
            </Card>
            <Card className="bg-emerald-900/40 border-emerald-500/50 p-6">
              <DollarSign className="w-10 h-10 text-emerald-400 mb-3" />
              <p className="font-bold mb-1">Commission Per Booking</p>
              <p className="text-emerald-300 text-2xl font-black">AED 79.80</p>
            </Card>
            <Card className="bg-yellow-900/40 border-yellow-500/50 p-6">
              <TrendingUp className="w-10 h-10 text-yellow-400 mb-3" />
              <p className="font-bold mb-1">Service Price</p>
              <p className="text-yellow-300 text-2xl font-black">AED 399</p>
            </Card>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-24 px-4">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-4xl font-black uppercase mb-12 text-center">How It Works for MyTablon</h2>
          
          <div className="space-y-6">
            {[
              {
                num: "1",
                title: "Share Your Link",
                desc: "Your unique referral link: https://deliwer.com/start?ref=mytablon&agent=YOUR_NAME"
              },
              {
                num: "2",
                title: "Community Shares",
                desc: "Post in your groups, LinkedIn, WhatsApp. Your network clicks and lands on /start"
              },
              {
                num: "3",
                title: "They Book",
                desc: "Customer books via WhatsApp. Your referral data auto-fills in their booking message"
              },
              {
                num: "4",
                title: "We Track It",
                desc: "Every conversion is logged with your attribution. Real-time dashboard at /marketing"
              },
              {
                num: "5",
                title: "You Get Paid",
                desc: "AED 79.80 per booking. Monthly payouts. Zero hidden fees. 20% guaranteed."
              }
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.1 }}
                viewport={{ once: true }}
                className="flex gap-6 bg-slate-900/50 border border-red-500/30 rounded-xl p-6"
              >
                <div className="text-3xl font-black text-red-400 flex-shrink-0">{item.num}</div>
                <div>
                  <h3 className="text-xl font-black text-white mb-2">{item.title}</h3>
                  <p className="text-gray-400">{item.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 px-4 bg-gradient-to-r from-red-950/30 to-slate-950 border-t border-red-500/20">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          <h2 className="text-4xl font-black uppercase">Ready to Start Earning?</h2>
          <p className="text-xl text-gray-300">Your unique referral link is ready to share.</p>
          
          <div className="flex flex-col md:flex-row gap-4 justify-center">
            <Link href="/partners">
              <Button size="lg" className="bg-red-600 hover:bg-red-500 font-black h-14 px-12 text-lg">
                Manage Your Referrals →
              </Button>
            </Link>
            <Link href="/partner-program">
              <Button size="lg" variant="outline" className="border-red-500/50 text-red-300 bg-red-500/10 hover:bg-red-500/20 font-black h-14 px-12 text-lg">
                Learn More About Commission
              </Button>
            </Link>
          </div>

          <p className="text-gray-400 text-sm">Questions? Contact us on WhatsApp</p>
          <a href="https://wa.me/971523906019">
            <Button variant="outline" className="border-emerald-500/50 text-emerald-300">
              <MessageSquare className="w-4 h-4 mr-2" />
              WhatsApp Support
            </Button>
          </a>
        </div>
      </section>
    </div>
  );
}
