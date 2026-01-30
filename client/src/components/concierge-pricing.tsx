import { Helmet } from "react-helmet";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { 
  CheckCircle2, 
  MessageSquare, 
  Zap, 
  Clock, 
  ShieldCheck,
  Info
} from "lucide-react";
import { DirhamSymbol } from "@/components/dirham-symbol";
import { 
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

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
};

type ConciergePricingProps = {
  category: "move" | "maintenance" | "support";
  onSelect?: (tier: PricingTier) => void;
};

const pricingData: Record<ConciergePricingProps["category"], PricingTier[]> = {
  move: [
    {
      id: "move_essential",
      name: "Essential Move-In",
      price: "199",
      description: "Critical utility setup and basic coordination for a stress-free first night.",
      features: ["DEWA & Chiller setup", "Internet coordination", "Entry permit assistance"],
      badge: "Market Entry",
      ctaText: "Get Started"
    },
    {
      id: "move_core",
      name: "Standard Move Coordination",
      price: "899",
      description: "Full end-to-end orchestration of your move, managing timelines and vendors.",
      features: ["Vendor scheduling", "Timeline management", "Single point of contact", "Post-move checklist"],
      badge: "Most Popular",
      ctaText: "Activate Concierge",
      isMain: true
    },
    {
      id: "move_premium",
      name: "Executive Exit & Protection",
      price: "2499",
      description: "Complete deposit protection and relocation management for a guaranteed smooth exit.",
      features: ["Security deposit recovery", "Furniture removal prep", "Deep cleaning coordination", "Landlord handover"],
      badge: "Total Peace of Mind",
      ctaText: "Secure My Exit"
    }
  ],
  maintenance: [
    {
      id: "maint_assessment",
      name: "Issue Assessment",
      price: "149",
      description: "Professional diagnostic visit to confirm the root cause before coordinating repairs.",
      features: ["On-site inspection", "Fault diagnosis", "Clear next steps"],
      badge: "Best First Step",
      ctaText: "Book Assessment"
    },
    {
      id: "maint_core",
      name: "Maintenance Coordination",
      price: "599",
      description: "Managed resolution of your home issue, including scheduling and quality oversight.",
      features: ["End-to-end coordination", "Vetted specialist management", "Single point of contact"],
      badge: "Most Chosen",
      ctaText: "Activate Concierge",
      isMain: true
    },
    {
      id: "maint_premium",
      name: "Priority Resolution",
      price: "1999",
      description: "Urgent management for critical home failures that require immediate orchestration.",
      features: ["Priority response", "Outcome protection", "Escalation oversight"],
      badge: "For Zero-Risk Needs",
      ctaText: "Get Priority Support"
    }
  ],
  support: [
    {
      id: "support_one_time",
      name: "One-Time Coordination",
      price: "199",
      description: "Help with a specific household coordination task or unexpected requirement.",
      features: ["Managed support layer", "Urgent assessment", "Quick resolution mapping"],
      badge: "Best First Step",
      ctaText: "Book Assessment"
    },
    {
      id: "support_monthly",
      name: "Monthly Resident Support",
      price: "999",
      priceSuffix: "/mo",
      description: "Proactive management of your ongoing household needs and vendor follow-ups.",
      features: ["Accountable manager", "Routine coordination", "Vendor scheduling"],
      badge: "Most Chosen",
      ctaText: "Activate Support",
      isMain: true
    },
    {
      id: "support_premium",
      name: "Priority Resident Care",
      price: "2999",
      priceSuffix: "/mo",
      description: "Executive-level coordination for residents who require zero-friction living.",
      features: ["Priority handling", "Lifestyle assistance", "Managed helpdesk"],
      badge: "For Zero-Risk Needs",
      ctaText: "Get Priority Support"
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
  const serviceTag = categoryTags[category];

  const handleWhatsApp = (tier: PricingTier) => {
    const text = `${serviceTag.replace('_', ' ').toUpperCase()} – ${tier.name} – Inquiry`;
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`, '_blank');
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 px-4 max-w-7xl mx-auto">
      {tiers.map((tier) => (
        <Card 
          key={tier.id} 
          className={`relative flex flex-col rounded-[2.5rem] border-white/10 transition-all duration-300 overflow-visible ${
            tier.isMain 
              ? "bg-slate-900 border-emerald-500/50 scale-105 shadow-2xl shadow-emerald-500/10 z-10" 
              : "bg-slate-900/50 hover:bg-slate-900"
          }`}
        >
          {tier.badge && (
            <div className={`absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full text-[10px] font-black uppercase tracking-widest shadow-lg ${
              tier.isMain ? "bg-emerald-500 text-slate-950" : "bg-white/10 text-white"
            }`}>
              {tier.badge}
            </div>
          )}

          <CardHeader className="pt-10 pb-6 text-center">
            <CardTitle className="text-2xl font-black uppercase tracking-tighter text-white">
              {tier.name}
            </CardTitle>
            <div className="mt-4 flex items-center justify-center gap-1">
              <DirhamSymbol className={`w-6 h-6 ${tier.isMain ? "text-emerald-500" : "text-gray-400"}`} />
              <span className="text-5xl font-black text-white tracking-tighter">{tier.price}</span>
              {tier.priceSuffix && (
                <span className="text-gray-400 font-bold ml-1">{tier.priceSuffix}</span>
              )}
            </div>
          </CardHeader>

          <CardContent className="flex-1 space-y-8 px-8">
            <p className="text-center text-gray-400 text-sm font-bold leading-tight">
              {tier.description}
            </p>

            <div className="space-y-4">
              {tier.features.map((feature, i) => (
                <div key={i} className="flex items-center gap-3 text-sm font-bold text-gray-200 uppercase tracking-tight">
                  <CheckCircle2 className={`w-5 h-5 shrink-0 ${tier.isMain ? "text-emerald-500" : "text-gray-400"}`} />
                  <span>{feature}</span>
                </div>
              ))}
            </div>

            <div className="pt-4 mt-auto">
              <Button 
                onClick={() => handleWhatsApp(tier)}
                className={`w-full h-16 font-black uppercase tracking-widest rounded-2xl text-lg shadow-xl transition-all ${
                  tier.isMain 
                    ? "bg-emerald-500 hover:bg-emerald-400 text-slate-950 shadow-emerald-500/20" 
                    : "bg-white/5 hover:bg-white/10 text-white border border-white/10"
                }`}
              >
                {tier.ctaText}
              </Button>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
