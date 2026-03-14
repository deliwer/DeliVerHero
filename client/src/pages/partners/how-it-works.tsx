import { Navigation } from "@/components/navigation";
import { PartnerSubNav } from "@/components/partner-subnav";
import { SEOMeta } from "@/components/seo-meta";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { CheckCircle2, Share2, Truck, DollarSign, ArrowRight, MessageCircle } from "lucide-react";
import { Link } from "wouter";
import { motion } from "framer-motion";

const STEPS = [
  {
    num: "1",
    icon: <Share2 className="w-7 h-7" />,
    title: "Share Your Referral Link",
    desc: "After signing up, you receive a unique link (e.g. deliwer.com/?ref=yourname). Share it via WhatsApp, email, Instagram, or LinkedIn with anyone moving into a Dubai apartment.",
    details: [
      "Unique URL tracks every click",
      "Referral code stored in browser for 30 days",
      "Works on mobile and desktop",
    ],
    color: "emerald",
  },
  {
    num: "2",
    icon: <MessageCircle className="w-7 h-7" />,
    title: "Tenant Books Move-In Coordination",
    desc: "When your referred tenant visits DeliWer and submits a move-in request, your referral code is automatically attached to their booking. They contact DeliWer via WhatsApp to confirm.",
    details: [
      "Tenant pays only normal vendor rates",
      "No extra charges from DeliWer",
      "Your code auto-populates in their request",
    ],
    color: "blue",
  },
  {
    num: "3",
    icon: <Truck className="w-7 h-7" />,
    title: "DeliWer Manages Vendors & Services",
    desc: "DeliWer coordinates all services: movers, Ejari registration, DEWA activation, and water/shower filter installation. Vendors complete the work and pay DeliWer an embedded coordination fee (10–15%).",
    details: [
      "Vetted, insured vendors",
      "One WhatsApp contact for everything",
      "Full coordination — tenant does nothing",
    ],
    color: "purple",
  },
  {
    num: "4",
    icon: <DollarSign className="w-7 h-7" />,
    title: "You Earn Commission",
    desc: "After the job is confirmed complete, your commission is calculated from DeliWer's coordination fee share. Commissions are paid monthly via bank transfer or UAE payment method of your choice.",
    details: [
      "Paid from vendor coordination revenue only",
      "Tenant cost is never increased",
      "Monthly payout, no minimums",
    ],
    color: "yellow",
  },
];

const COLOR_MAP: Record<string, string> = {
  emerald: "bg-emerald-500/10 border-emerald-500/20 text-emerald-400",
  blue: "bg-blue-500/10 border-blue-500/20 text-blue-400",
  purple: "bg-purple-500/10 border-purple-500/20 text-purple-400",
  yellow: "bg-yellow-500/10 border-yellow-500/20 text-yellow-400",
};

const NUM_MAP: Record<string, string> = {
  emerald: "bg-emerald-500 text-slate-950",
  blue: "bg-blue-500 text-slate-950",
  purple: "bg-purple-500 text-slate-950",
  yellow: "bg-yellow-500 text-slate-950",
};

export default function PartnersHowItWorks() {
  return (
    <div className="min-h-screen bg-slate-950 text-white font-sans">
      <SEOMeta
        title="How the DeliWer Partner Program Works | Step-by-Step Guide"
        description="Learn how to earn commissions as a DeliWer partner. Share your link, tenants book, DeliWer coordinates, you earn — simple."
      />
      <Navigation />
      <PartnerSubNav />

      <section className="py-16 px-4 max-w-3xl mx-auto space-y-12">
        {/* Header */}
        <div className="text-center space-y-3">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-500/10 border border-emerald-500/20 rounded-full text-emerald-400 text-xs font-black uppercase tracking-widest">
            How It Works
          </div>
          <h1 className="text-3xl md:text-5xl font-black uppercase tracking-tighter text-white leading-[0.9]">
            Four Simple Steps
          </h1>
          <p className="text-gray-400 font-medium leading-relaxed max-w-xl mx-auto">
            You refer. We coordinate. Vendors pay us. You earn. Tenants pay zero extra.
          </p>
        </div>

        {/* Steps */}
        <div className="space-y-6">
          {STEPS.map((step, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              viewport={{ once: true }}
            >
              <Card className="bg-white/5 border-white/10 rounded-2xl overflow-hidden">
                <CardContent className="p-6 md:p-8 flex gap-5 items-start">
                  <div className={`w-10 h-10 rounded-xl font-black text-xl flex items-center justify-center shrink-0 ${NUM_MAP[step.color]}`}>
                    {step.num}
                  </div>
                  <div className="space-y-3 flex-1">
                    <div className="flex items-center gap-3">
                      <div className={`p-2 rounded-xl border ${COLOR_MAP[step.color]}`}>
                        {step.icon}
                      </div>
                      <h3 className="text-lg font-black uppercase tracking-tight text-white">{step.title}</h3>
                    </div>
                    <p className="text-gray-400 font-medium leading-relaxed text-sm">{step.desc}</p>
                    <div className="space-y-1.5 pt-1">
                      {step.details.map((detail, j) => (
                        <div key={j} className="flex items-center gap-2 text-xs text-gray-300 font-medium">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                          {detail}
                        </div>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
              {i < STEPS.length - 1 && (
                <div className="flex justify-center my-2">
                  <ArrowRight className="w-5 h-5 text-emerald-500 rotate-90" />
                </div>
              )}
            </motion.div>
          ))}
        </div>

        {/* Key Principle */}
        <Card className="bg-emerald-950/40 border-emerald-500/20 rounded-2xl">
          <CardContent className="p-6 space-y-2 text-center">
            <p className="text-emerald-400 font-black uppercase text-xs tracking-widest">Key Principle</p>
            <p className="text-white font-black text-lg uppercase tracking-tight">Tenants never pay extra.</p>
            <p className="text-gray-400 text-sm font-medium leading-relaxed">
              Your commission comes exclusively from DeliWer's embedded coordination fee, which vendors include in their standard pricing. The tenant cost is identical whether or not there is a referral.
            </p>
          </CardContent>
        </Card>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/partners/join">
            <Button size="lg" className="bg-emerald-600 hover:bg-emerald-500 text-white font-black rounded-xl h-13 px-10 text-sm uppercase tracking-widest w-full sm:w-auto" data-testid="button-join-from-hiw">
              Become a Partner
            </Button>
          </Link>
          <Link href="/partners/earnings">
            <Button variant="outline" size="lg" className="border-emerald-500/40 text-emerald-400 hover:bg-emerald-500/10 rounded-xl h-13 px-10 text-sm font-black uppercase tracking-widest w-full sm:w-auto">
              See Earnings Examples →
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
}
