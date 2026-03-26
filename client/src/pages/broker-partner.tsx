import { useState } from "react";
import { SEOMeta } from "@/components/seo-meta";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { CheckCircle2, MessageCircle, Copy, Check, DollarSign, ShieldCheck, Star, Building2, ChevronDown, ChevronUp } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { buildWhatsAppMessage, openWhatsApp } from "@/lib/referral";

const SCRIPTS = [
  {
    title: "After Signing the Lease",
    scenario: "Send immediately after tenant signs the tenancy contract",
    script: `Hi [Tenant Name], congratulations on your new home! 🎉\n\nOne thing I always recommend — DeliWer handles everything you need after getting your keys: Ejari, DEWA setup, movers, and cleaning.\n\nHere's the link — they'll contact you directly:\n\n[YOUR REFERRAL LINK]\n\nThey respond fast on WhatsApp. Makes the whole move-in stress-free.`,
  },
  {
    title: "Pre-Move-In Follow-Up",
    scenario: "Send 1–2 weeks before the tenant's move-in date",
    script: `Hi [Tenant Name], your move-in is coming up soon!\n\nHave you sorted Ejari, DEWA, movers, and cleaning yet?\n\nI have a trusted partner that coordinates everything in one go:\n\n[YOUR REFERRAL LINK]\n\nLet me know if you need anything else!`,
  },
];

const STEPS = [
  { n: "01", title: "Get Your Referral Link", desc: "Enter your name below — your unique link is generated instantly." },
  { n: "02", title: "Share with Tenants", desc: "Send the link after lease signing via WhatsApp, email, or social." },
  { n: "03", title: "Earn 20% Commission", desc: "DeliWer handles everything. You earn on every completed coordination." },
];

export default function BrokerPartnerPage() {
  const [partnerName, setPartnerName] = useState("");
  const [copied, setCopied] = useState(false);
  const [copiedScript, setCopiedScript] = useState<number | null>(null);
  const [expandedScript, setExpandedScript] = useState<number | null>(null);
  const { toast } = useToast();

  const generateLink = () => {
    if (!partnerName.trim()) return "";
    const ref = partnerName.toLowerCase().replace(/\s+/g, "").replace(/[^a-z0-9]/g, "");
    return `${window.location.origin}/ejari-dubai?ref=${ref}`;
  };

  const generatedLink = generateLink();

  const copyLink = async () => {
    if (!generatedLink) return;
    await navigator.clipboard.writeText(generatedLink);
    setCopied(true);
    toast({ title: "Link copied!", description: "Share this with your tenants to earn commission." });
    setTimeout(() => setCopied(false), 2500);
  };

  const handleWhatsApp = () => {
    openWhatsApp(buildWhatsAppMessage({
      intro: "Hi DeliWer, I'm a real estate broker interested in the partner referral program.",
      fields: { Name: partnerName || undefined },
    }));
  };

  const copyScript = async (idx: number, text: string) => {
    const link = generatedLink || "deliwer.com?ref=YOURCODE";
    await navigator.clipboard.writeText(text.replace(/\[YOUR REFERRAL LINK\]/g, link));
    setCopiedScript(idx);
    toast({ title: "Script copied!", description: "Replace [Tenant Name] and paste into WhatsApp." });
    setTimeout(() => setCopiedScript(null), 2500);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <SEOMeta
        title="Broker Partner Program | Earn Commission on Ejari Referrals | DeliWer"
        description="Real estate brokers earn 20% referral commission referring tenants for Ejari registration and relocation coordination. DeliWer handles everything — you earn without extra work."
      />

      {/* Hero */}
      <section className="relative py-28 px-4 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1600&h=900&fit=crop&q=80"
            alt="Dubai luxury real estate"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-br from-slate-950/95 via-purple-950/70 to-slate-950/90" />
        </div>

        <div className="max-w-3xl mx-auto text-center relative z-10 space-y-6">
          <Badge className="bg-purple-500/10 text-purple-400 border-purple-500/20 px-4 py-2 text-xs font-black uppercase tracking-widest rounded-full">
            Partner Referral Program
          </Badge>
          <h1 className="text-5xl md:text-7xl font-black tracking-tighter leading-[0.88] uppercase">
            Earn 20%<br />
            <span className="text-purple-400">Per Ejari Referral</span>
          </h1>
          <p className="text-lg text-gray-400 font-medium max-w-xl mx-auto">
            Refer tenants after lease signing. DeliWer handles everything — Ejari, DEWA, movers. You earn every time.
          </p>
          <Button
            data-testid="button-broker-join"
            size="lg"
            className="bg-purple-600 hover:bg-purple-500 text-white font-black rounded-2xl px-10 h-14 text-lg shadow-2xl"
            onClick={() => handleWhatsApp()}
          >
            <MessageCircle className="w-5 h-5 mr-2" />
            Join the Partner Program
          </Button>

          {/* Trust strip */}
          <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 pt-1" data-testid="hero-trust-strip">
            {[
              { icon: ShieldCheck, label: "RERA Partner Network" },
              { icon: CheckCircle2, label: "32,000+ Brokers" },
              { icon: Star, label: "Same-Day Ejari" },
              { icon: Building2, label: "DLD Licensed" },
            ].map(({ icon: Icon, label }) => (
              <div key={label} className="flex items-center gap-1.5 text-slate-400 text-xs font-semibold">
                <Icon className="w-3.5 h-3.5 text-purple-400 shrink-0" />
                {label}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-16 px-4 border-t border-white/5">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-xl font-black uppercase tracking-tighter text-white text-center mb-8">How It Works</h2>
          <div className="space-y-6">
            {STEPS.map((s) => (
              <div key={s.n} className="flex gap-5 items-start">
                <div className="text-2xl font-black text-purple-400/30 w-10 shrink-0 leading-none pt-0.5">{s.n}</div>
                <div>
                  <p className="font-black text-white uppercase tracking-tight text-sm">{s.title}</p>
                  <p className="text-gray-500 text-sm mt-0.5">{s.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Earnings snapshot */}
      <section className="py-10 px-4 border-y border-white/5 bg-purple-950/20">
        <div className="max-w-2xl mx-auto">
          <div className="grid grid-cols-3 gap-4 text-center">
            {[
              { value: "20%", label: "Referral fee per Ejari" },
              { value: "150 AED", label: "Average commission" },
              { value: "750 AED", label: "Est. monthly (5 referrals)" },
            ].map((stat, i) => (
              <div key={i} data-testid={`broker-earning-${i}`}>
                <div className="text-2xl font-black text-purple-400">{stat.value}</div>
                <div className="text-[11px] text-gray-500 font-medium mt-0.5">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Link Generator */}
      <section className="py-16 px-4 bg-slate-900/50 border-b border-white/5">
        <div className="max-w-xl mx-auto space-y-5">
          <h2 className="text-xl font-black uppercase tracking-tighter text-white text-center">Get Your Referral Link</h2>
          <Input
            data-testid="input-broker-name"
            value={partnerName}
            onChange={e => setPartnerName(e.target.value)}
            placeholder="Your name or company (e.g. John Smith)"
            className="bg-slate-800 border-slate-600 text-white placeholder:text-gray-600 rounded-xl h-12"
          />
          {generatedLink ? (
            <div className="bg-slate-800 border border-purple-500/30 rounded-xl p-3 flex items-center gap-3">
              <div className="flex-1 text-sm text-purple-300 font-mono break-all">{generatedLink}</div>
              <Button
                data-testid="button-broker-copy"
                size="sm"
                className="bg-purple-600 hover:bg-purple-500 text-white rounded-lg shrink-0"
                onClick={copyLink}
              >
                {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
              </Button>
            </div>
          ) : (
            <p className="text-[11px] text-gray-600 text-center">Enter your name above to generate your unique link</p>
          )}
          <Button
            data-testid="button-broker-whatsapp-request"
            size="lg"
            className="w-full bg-purple-600 hover:bg-purple-500 text-white font-black rounded-xl h-12"
            onClick={() => handleWhatsApp()}
          >
            <MessageCircle className="w-4 h-4 mr-2" />
            Request Referral Code via WhatsApp
          </Button>
        </div>
      </section>

      {/* WhatsApp Scripts */}
      <section className="py-16 px-4 border-b border-white/5">
        <div className="max-w-xl mx-auto space-y-4">
          <h2 className="text-xl font-black uppercase tracking-tighter text-white text-center mb-6">Ready-to-Send Scripts</h2>
          {SCRIPTS.map((s, i) => (
            <div key={i} className="bg-slate-900 border border-slate-700 rounded-2xl overflow-hidden hover:border-purple-500/30 transition-colors">
              <button
                data-testid={`button-broker-script-toggle-${i}`}
                className="w-full flex items-center justify-between p-4 text-left"
                onClick={() => setExpandedScript(expandedScript === i ? null : i)}
              >
                <div>
                  <div className="font-black text-white text-sm uppercase tracking-tight">{s.title}</div>
                  <div className="text-[11px] text-gray-500 mt-0.5">{s.scenario}</div>
                </div>
                {expandedScript === i
                  ? <ChevronUp className="w-4 h-4 text-purple-400 shrink-0" />
                  : <ChevronDown className="w-4 h-4 text-gray-600 shrink-0" />}
              </button>
              {expandedScript === i && (
                <div className="px-4 pb-4 space-y-3">
                  <div className="bg-slate-800 rounded-xl p-4 border border-white/5">
                    <pre className="text-gray-300 text-xs leading-relaxed whitespace-pre-wrap">
                      {s.script.replace(/\[YOUR REFERRAL LINK\]/g, generatedLink || "deliwer.com?ref=YOURCODE")}
                    </pre>
                  </div>
                  <Button
                    data-testid={`button-broker-copy-script-${i}`}
                    size="sm"
                    className="bg-purple-600 hover:bg-purple-500 text-white font-black rounded-xl px-4 h-8 text-xs"
                    onClick={() => copyScript(i, s.script)}
                  >
                    {copiedScript === i ? <><Check className="w-3 h-3 mr-1" />Copied!</> : <><Copy className="w-3 h-3 mr-1" />Copy Script</>}
                  </Button>
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-16 px-4 text-center">
        <div className="max-w-md mx-auto space-y-4">
          <DollarSign className="w-8 h-8 text-purple-400 mx-auto" />
          <h2 className="text-2xl font-black uppercase tracking-tighter text-white">Start Earning Today</h2>
          <p className="text-gray-500 text-sm">Get your referral code set up in minutes via WhatsApp.</p>
          <Button
            data-testid="button-broker-final-cta"
            size="lg"
            className="bg-purple-600 hover:bg-purple-500 text-white font-black rounded-2xl px-10 h-13 text-base shadow-2xl"
            onClick={() => handleWhatsApp()}
          >
            <MessageCircle className="w-5 h-5 mr-2" />
            Join the Partner Program
          </Button>
        </div>
      </section>
    </div>
  );
}
