import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  CheckCircle2, 
  MessageSquare, 
  Clock, 
  ShieldCheck,
  TrendingDown,
  AlertTriangle,
  Users,
  Zap
} from "lucide-react";
import { DirhamSymbol } from "@/components/dirham-symbol";

const WHATSAPP_NUMBER = "971523946311";

type PricingTier = {
  id: string;
  name: string;
  price: string;
  priceSuffix?: string;
  description: string;
  features: string[];
  badge?: string;
  ctaText: string;
  isMain?: boolean;
  diyRisk?: string;
  saving?: string;
  urgency?: string;
};

type ConciergePricingProps = {
  category: "move" | "maintenance" | "support";
  onSelect?: (tier: PricingTier) => void;
};

const pricingData: Record<ConciergePricingProps["category"], PricingTier[]> = {
  move: [
    {
      id: "move_activation",
      name: "Move-In Activation",
      price: "399",
      description: "Studio & 1–2 bed apartments within 7 days of move-in.",
      features: [
        "60–90 minute activation visit",
        "Shower filter supply + installation",
        "1 AC filter clean (removable only)",
        "Water readiness check",
        "Essentials setup guidance",
        "WhatsApp follow-up support"
      ],
      badge: "Standard Preparation",
      ctaText: "Book This Package",
      diyRisk: "Most tenants waste 8–12 hrs chasing vendors separately",
      saving: "Save ~AED 600 vs. booking each service individually"
    },
    {
      id: "move_core",
      name: "Standard Move Coordination",
      price: "899",
      description: "Families or tenants needing multi-vendor coordination.",
      features: [
        "Vendor scheduling & follow-up",
        "Full move-in timeline management",
        "Single point of contact",
        "Post-move quality checklist",
        "DEWA activation guidance",
        "Priority response 7am–10pm"
      ],
      badge: "Most Popular",
      ctaText: "Book This Package",
      isMain: true,
      diyRisk: "Without coordination, 60% of Dubai move-ins have a critical delay",
      saving: "Save AED 1,200+ vs. managing vendors yourself",
      urgency: "Only 4 coordinator slots available this week"
    },
    {
      id: "move_premium",
      name: "Executive Exit & Protection",
      price: "2,499",
      description: "HNWIs or families requiring guaranteed deposit recovery.",
      features: [
        "Full security deposit recovery strategy",
        "Furniture removal & disposal",
        "Deep cleaning coordination",
        "Landlord handover negotiation",
        "Legal documentation support",
        "Dedicated account manager"
      ],
      badge: "Total Peace of Mind",
      ctaText: "Book This Package",
      diyRisk: "Average Dubai tenant loses AED 3,500+ in deposit disputes",
      saving: "Protect up to AED 20,000 in deposit"
    }
  ],
  maintenance: [
    {
      id: "maint_assessment",
      name: "Issue Assessment",
      price: "149",
      description: "Professional diagnostic before coordinating repairs.",
      features: [
        "On-site inspection visit",
        "Root-cause fault diagnosis",
        "Written report & next steps",
        "No surprise costs"
      ],
      badge: "Best First Step",
      ctaText: "Book Assessment",
      diyRisk: "Guessing without diagnosis = wrong fix, double the cost",
      saving: "Avoid AED 500–2,000 in unnecessary repair attempts"
    },
    {
      id: "maint_core",
      name: "Maintenance Coordination",
      price: "599",
      description: "End-to-end managed resolution of your home issue.",
      features: [
        "End-to-end issue coordination",
        "Vetted specialist assignment",
        "Quality oversight & sign-off",
        "Single point of contact",
        "Before & after documentation",
        "Follow-up guarantee"
      ],
      badge: "Most Chosen",
      ctaText: "Activate Concierge",
      isMain: true,
      diyRisk: "Unmanaged contractors miss 40% of maintenance deadlines in Dubai",
      saving: "Save 10–15 hrs of your time managing trades",
      urgency: "Limited coordinator availability — book to secure your slot"
    },
    {
      id: "maint_premium",
      name: "Priority Resolution",
      price: "1,999",
      description: "Urgent management for critical home failures.",
      features: [
        "Same-day priority response",
        "Outcome protection guarantee",
        "Escalation oversight",
        "Emergency vendor network",
        "Full resolution accountability"
      ],
      badge: "Zero-Risk Response",
      ctaText: "Get Priority Support",
      diyRisk: "Every hour without AC or water in Dubai costs comfort & health",
      saving: "Fastest path to resolution — no waiting, no runaround"
    }
  ],
  support: [
    {
      id: "support_one_time",
      name: "One-Time Coordination",
      price: "199",
      description: "Help with a specific household task or unexpected issue.",
      features: [
        "Managed coordination layer",
        "Urgent assessment",
        "Quick resolution mapping",
        "WhatsApp communication"
      ],
      badge: "Best First Step",
      ctaText: "Book Now",
      diyRisk: "One wrong vendor can cost you 3x the service fee",
      saving: "One call handles what takes you 5 calls to organise"
    },
    {
      id: "support_monthly",
      name: "Monthly Resident Support",
      price: "999",
      priceSuffix: "/mo",
      description: "Proactive management of your home's ongoing needs.",
      features: [
        "Dedicated accountable manager",
        "Unlimited issue coordination",
        "Routine vendor scheduling",
        "Monthly home health report",
        "Priority 7-day response",
        "Cancellable anytime"
      ],
      badge: "Most Chosen",
      ctaText: "Activate Support",
      isMain: true,
      diyRisk: "Most Dubai expats spend 4+ hrs/month managing home issues",
      saving: "Your time is worth more than AED 999 a month",
      urgency: "Sign up now — monthly slots limited by area"
    },
    {
      id: "support_premium",
      name: "Priority Resident Care",
      price: "2,999",
      priceSuffix: "/mo",
      description: "Executive-level coordination for zero-friction living.",
      features: [
        "Priority handling & escalation",
        "Lifestyle assistance included",
        "Managed helpdesk 7am–midnight",
        "Proactive home monitoring",
        "Concierge errand coordination"
      ],
      badge: "Elite Service",
      ctaText: "Get Priority Support",
      diyRisk: "Executive time is too valuable to spend on home management",
      saving: "The equivalent of a part-time home manager at a fraction of the cost"
    }
  ]
};

const categoryTags: Record<ConciergePricingProps["category"], string> = {
  move: "move_concierge",
  maintenance: "maintenance_concierge",
  support: "resident_support"
};

export function ConciergePricing({ category }: ConciergePricingProps) {
  const tiers = pricingData[category];

  const handleWhatsApp = (tier: PricingTier) => {
    const text = `Hi DeliWer, I want to book the ${tier.name} (AED ${tier.price}${tier.priceSuffix ?? ""}) package.`;
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`, '_blank');
  };

  return (
    <div className="max-w-7xl mx-auto px-4">
      {/* Anchoring header */}
      <div className="text-center mb-10">
        <div className="inline-flex items-center gap-2 bg-amber-500/10 border border-amber-500/20 rounded-full px-4 py-2 mb-4">
          <AlertTriangle className="w-4 h-4 text-amber-400" />
          <span className="text-amber-300 text-xs font-black uppercase tracking-widest">
            Most Dubai tenants lose AED 3,000–8,000 by handling this alone
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 items-start">
        {tiers.map((tier, idx) => (
          <motion.div
            key={tier.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1 }}
            viewport={{ once: true }}
          >
            <Card 
              className={`relative flex flex-col rounded-[2.5rem] border-white/10 transition-all duration-300 overflow-visible ${
                tier.isMain 
                  ? "bg-slate-900 border-emerald-500/60 scale-105 shadow-2xl shadow-emerald-500/20 z-10" 
                  : "bg-slate-900/50 hover:bg-slate-900 hover:border-white/20"
              }`}
            >
              {tier.badge && (
                <div className={`absolute -top-4 left-1/2 -translate-x-1/2 px-5 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest shadow-lg whitespace-nowrap ${
                  tier.isMain ? "bg-emerald-500 text-slate-950" : "bg-white/10 text-white"
                }`}>
                  {tier.isMain && <span className="mr-1">★</span>}{tier.badge}
                </div>
              )}

              <CardHeader className="pt-10 pb-4 text-center">
                <CardTitle className="text-xl font-black uppercase tracking-tighter text-white mb-4">
                  {tier.name}
                </CardTitle>

                {/* Price display with psychological anchoring */}
                <div className="mt-2">
                  <div className="flex items-center justify-center gap-1">
                    <span className={`text-xs font-black uppercase tracking-widest mr-1 ${tier.isMain ? "text-emerald-400" : "text-gray-500"}`}>AED</span>
                    <span className={`text-5xl font-black tracking-tighter ${tier.isMain ? "text-white" : "text-gray-200"}`}>{tier.price}</span>
                    {tier.priceSuffix && (
                      <span className="text-gray-400 font-bold ml-1 text-sm self-end mb-2">{tier.priceSuffix}</span>
                    )}
                  </div>
                  {tier.saving && (
                    <div className="flex items-center justify-center gap-1.5 mt-2">
                      <TrendingDown className="w-3 h-3 text-emerald-400" />
                      <span className="text-[10px] text-emerald-400 font-black uppercase tracking-wider">{tier.saving}</span>
                    </div>
                  )}
                </div>
              </CardHeader>

              <CardContent className="flex-1 flex flex-col space-y-5 px-6 pb-8">
                <p className="text-center text-gray-400 text-sm font-medium leading-relaxed border-b border-white/5 pb-4">
                  {tier.description}
                </p>

                {/* Features */}
                <div className="space-y-3 flex-1">
                  {tier.features.map((feature, i) => (
                    <div key={i} className="flex items-start gap-3 text-sm font-medium text-gray-200">
                      <CheckCircle2 className={`w-4 h-4 shrink-0 mt-0.5 ${tier.isMain ? "text-emerald-500" : "text-gray-500"}`} />
                      <span>{feature}</span>
                    </div>
                  ))}
                </div>

                {/* DIY Risk warning — loss aversion trigger */}
                {tier.diyRisk && (
                  <div className="bg-red-500/5 border border-red-500/15 rounded-2xl px-4 py-3">
                    <div className="flex items-start gap-2">
                      <AlertTriangle className="w-3.5 h-3.5 text-red-400 shrink-0 mt-0.5" />
                      <p className="text-[10px] text-red-300/80 font-medium leading-relaxed">{tier.diyRisk}</p>
                    </div>
                  </div>
                )}

                {/* Urgency — scarcity cue */}
                {tier.urgency && (
                  <div className="flex items-center gap-2 bg-amber-500/5 border border-amber-500/20 rounded-xl px-3 py-2">
                    <Clock className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                    <span className="text-[10px] text-amber-300 font-black uppercase tracking-wide">{tier.urgency}</span>
                  </div>
                )}

                {/* Social proof for main tier */}
                {tier.isMain && (
                  <div className="flex items-center justify-center gap-2">
                    <Users className="w-3.5 h-3.5 text-gray-500" />
                    <span className="text-[10px] text-gray-500 font-medium">Chosen by most Dubai residents</span>
                  </div>
                )}

                <Button 
                  onClick={() => handleWhatsApp(tier)}
                  data-testid={`button-pricing-${tier.id}`}
                  className={`w-full h-14 font-black uppercase tracking-widest rounded-2xl text-base shadow-xl transition-all ${
                    tier.isMain 
                      ? "bg-emerald-500 hover:bg-emerald-400 text-slate-950 shadow-emerald-500/30" 
                      : "bg-white/5 hover:bg-white/10 text-white border border-white/10"
                  }`}
                >
                  <MessageSquare className="w-4 h-4 mr-2" />
                  {tier.ctaText}
                </Button>
                <p className="text-center text-[10px] text-gray-600 font-medium">
                  Response within 10 min · WhatsApp only
                </p>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Trust footer */}
      <div className="mt-12 flex flex-wrap justify-center gap-6 text-center">
        {[
          { icon: ShieldCheck, text: "No hidden fees" },
          { icon: Zap, text: "Response in 10 min" },
          { icon: Users, text: "Vetted partner network" },
          { icon: Clock, text: "Cancel anytime" },
        ].map((item, i) => (
          <div key={i} className="flex items-center gap-2 text-gray-500 text-xs font-medium">
            <item.icon className="w-4 h-4 text-emerald-500/50" />
            <span>{item.text}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
