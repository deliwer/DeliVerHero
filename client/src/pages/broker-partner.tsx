import { useState } from "react";
import { SEOMeta } from "@/components/seo-meta";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { CheckCircle2, MessageCircle, Copy, Check, Users, TrendingUp, DollarSign, Building2, Star, ArrowRight, ChevronDown, ChevronUp, ShieldCheck } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { buildWhatsAppMessage, openWhatsApp } from "@/lib/referral";

const BROKER_SCRIPTS = [
  {
    title: "After Signing the Lease",
    scenario: "Send immediately after tenant signs the tenancy contract",
    script: `Hi [Tenant Name], congratulations on your new home! 🎉\n\nOne thing I always recommend to all my tenants — DeliWer handles everything you need after getting your keys: Ejari registration, DEWA setup, movers, and cleaning.\n\nI've arranged for you to get their service through my referral. Just click this link and they'll contact you directly:\n\n[YOUR REFERRAL LINK]\n\nThey respond fast on WhatsApp. Makes the whole move-in stress-free.`,
  },
  {
    title: "Pre-Move-In Follow-Up",
    scenario: "Send 1–2 weeks before tenant's move-in date",
    script: `Hi [Tenant Name], just checking in — your move-in is coming up soon!\n\nHave you sorted Ejari, DEWA activation, movers, and cleaning yet?\n\nIf not, I have a trusted partner that coordinates everything in one go — no need to chase multiple vendors.\n\nHere's the link to get started: [YOUR REFERRAL LINK]\n\nThey work fast and tenants love them. Let me know if you need anything else!`,
  },
  {
    title: "For Your Existing Client Database",
    scenario: "Send to your full WhatsApp contact list or CRM",
    script: `Hi everyone — if you or anyone you know is moving into a new apartment in Dubai, I'd love to share something useful.\n\nDeliWer coordinates the full move-in process: Ejari, DEWA, movers, cleaning, and more — all in one WhatsApp message.\n\nNo hidden fees, no tenant markup.\n\nHere's the link: [YOUR REFERRAL LINK]\n\nFeel free to share it with anyone who might be moving soon. Happy to answer any questions!`,
  },
  {
    title: "After Ejari Registration",
    scenario: "For clients who just completed Ejari and need next steps",
    script: `[Tenant Name], great news — Ejari is done! Now for the next steps:\n\nDEWA activation, keys collection, movers, and cleaning all need to happen in the right order.\n\nI recommend DeliWer — they coordinate all of this from one WhatsApp conversation. I've referred dozens of my clients and the feedback has been excellent.\n\nHere's the link: [YOUR REFERRAL LINK]\n\nThey'll reach out and guide you through everything.`,
  },
];


const PARTNER_TYPES = [
  { icon: Building2, title: "Real Estate Brokers", desc: "Refer every tenant after contract signing. Zero extra work for you." },
  { icon: Users, title: "Building Concierges", desc: "Earn commission helping residents with Ejari and move-in coordination." },
  { icon: Star, title: "Influencers", desc: "Share your unique link with your audience and earn per coordinated relocation." },
  { icon: TrendingUp, title: "Corporate HR Teams", desc: "Custom agreements for employee relocation packages." },
];

const COMMISSION = [
  { service: "Ejari Registration Referral", range: "20% referral fee", note: "Per completed registration" },
  { service: "Relocation Coordination", range: "15% – 30%", note: "Per completed move-in" },
  { service: "Partner Services Booked", range: "10% – 20%", note: "Cleaning, movers, DEWA" },
  { service: "Corporate Relocation", range: "Custom agreement", note: "Contact for details" },
];

export default function BrokerPartnerPage() {
  const [partnerName, setPartnerName] = useState("");
  const [copied, setCopied] = useState(false);
  const [copiedScript, setCopiedScript] = useState<number | null>(null);
  const [expandedScript, setExpandedScript] = useState<number | null>(0);
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
    toast({ title: "Link Copied!", description: "Share this link with your tenants to earn commission." });
    setTimeout(() => setCopied(false), 2500);
  };

  const handleWhatsApp = () => {
    openWhatsApp(buildWhatsAppMessage({
      intro: "Hi DeliWer, I'm a real estate broker interested in the partner referral program.",
      fields: { Name: partnerName || undefined },
    }));
  };

  const copyScript = async (idx: number, text: string) => {
    const linkPlaceholder = generatedLink || "deliwer.com?ref=YOURCODE";
    const filled = text.replace(/\[YOUR REFERRAL LINK\]/g, linkPlaceholder);
    await navigator.clipboard.writeText(filled);
    setCopiedScript(idx);
    toast({ title: "Script Copied!", description: "Replace [Tenant Name] and paste into WhatsApp." });
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
        {/* Hero background image */}
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1600&h=900&fit=crop&q=80"
            alt="Dubai luxury real estate"
            className="w-full h-full object-cover"
          />
          {/* Dark gradient overlay so text stays legible */}
          <div className="absolute inset-0 bg-gradient-to-br from-slate-950/95 via-purple-950/70 to-slate-950/90" />
        </div>

        <div className="max-w-4xl mx-auto text-center relative z-10 space-y-8">
          <Badge className="bg-purple-500/10 text-purple-400 border-purple-500/20 px-4 py-2 text-xs font-black uppercase tracking-widest rounded-full">
            Partner Referral Program
          </Badge>
          <h1 className="text-5xl md:text-7xl font-black tracking-tighter leading-[0.88] uppercase">
            Earn Commission<br />
            <span className="text-purple-400">Referring Tenants for Ejari Setup</span>
          </h1>
          <p className="text-xl text-gray-400 font-medium max-w-2xl mx-auto leading-relaxed">
            No extra work. DeliWer handles the Ejari coordination, move-in setup, and utilities. You earn a referral commission for every tenant you refer.
          </p>
          <div className="inline-flex items-center gap-3 bg-purple-500/10 border border-purple-500/30 rounded-2xl px-6 py-4">
            <DollarSign className="w-5 h-5 text-purple-400" />
            <span className="text-purple-300 font-black text-lg uppercase">20% Referral Fee Per Ejari Completed</span>
          </div>
          <Button
            data-testid="button-broker-join"
            size="lg"
            className="bg-purple-600 hover:bg-purple-500 text-white font-black rounded-2xl px-10 h-16 text-xl shadow-2xl"
            onClick={() => handleWhatsApp()}
          >
            <MessageCircle className="w-5 h-5 mr-2" />
            Join the Partner Program
          </Button>

          {/* Trust strip */}
          <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 pt-2" data-testid="hero-trust-strip">
            {[
              { icon: ShieldCheck, label: "RERA-Registered Partner Network" },
              { icon: CheckCircle2, label: "32,000+ Brokers Reached" },
              { icon: Star, label: "Same-Day Ejari Processing" },
              { icon: Building2, label: "DLD-Licensed Operations" },
            ].map(({ icon: Icon, label }) => (
              <div key={label} className="flex items-center gap-1.5 text-slate-300 text-xs font-semibold">
                <Icon className="w-3.5 h-3.5 text-purple-400 shrink-0" />
                {label}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Partner Types */}
      <section className="py-20 px-4 border-y border-white/5 bg-slate-900/30">
        <div className="max-w-4xl mx-auto space-y-8">
          <h2 className="text-2xl font-black uppercase tracking-tighter text-white text-center">Who Can Join</h2>
          <div className="grid md:grid-cols-2 gap-5">
            {PARTNER_TYPES.map((pt, i) => {
              const Icon = pt.icon;
              return (
                <div key={i} className="flex gap-4 bg-slate-900 border border-slate-700 rounded-2xl p-6 hover:border-purple-500/30 transition-all">
                  <div className="w-10 h-10 bg-purple-500/10 rounded-xl flex items-center justify-center shrink-0">
                    <Icon className="w-5 h-5 text-purple-400" />
                  </div>
                  <div className="space-y-1">
                    <h3 className="font-black text-white uppercase text-sm">{pt.title}</h3>
                    <p className="text-gray-400 text-xs font-medium">{pt.desc}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 px-4">
        <div className="max-w-3xl mx-auto space-y-10">
          <h2 className="text-3xl font-black uppercase tracking-tighter text-white text-center">How It Works</h2>
          <div className="space-y-5">
            {[
              { step: "01", title: "Get Your Referral Link", desc: "Enter your name below to generate a unique referral link (e.g. /ejari-dubai?ref=yourname)." },
              { step: "02", title: "Share with Tenants", desc: "Send the link to tenants after lease signing via WhatsApp, email, or social media." },
              { step: "03", title: "DeliWer Handles Everything", desc: "Tenants submit their details, coordinator takes over — Ejari, utilities, moving, cleaning." },
              { step: "04", title: "You Earn Commission", desc: "20% referral fee for every completed Ejari or relocation coordination. Tracked manually, paid out monthly." },
            ].map((item, i) => (
              <div key={i} className="flex gap-6 items-start">
                <div className="text-3xl font-black text-purple-400/30 w-12 shrink-0">{item.step}</div>
                <div>
                  <h3 className="font-black text-white uppercase tracking-tight mb-1">{item.title}</h3>
                  <p className="text-gray-400 text-sm font-medium">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Link Generator */}
      <section className="py-20 px-4 bg-slate-900/50 border-y border-white/5">
        <div className="max-w-2xl mx-auto space-y-8">
          <div className="text-center space-y-3">
            <h2 className="text-3xl font-black uppercase tracking-tighter text-white">Generate Your Referral Link</h2>
            <p className="text-gray-400 font-medium">Enter your name or company name to create your unique partner link.</p>
          </div>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label className="text-[11px] font-black uppercase tracking-widest text-gray-400">Your Name / Company</Label>
              <Input
                data-testid="input-broker-name"
                value={partnerName}
                onChange={e => setPartnerName(e.target.value)}
                placeholder="e.g. John Smith, ABC Realty"
                className="bg-slate-800 border-slate-600 text-white placeholder:text-gray-600 rounded-xl h-12 text-lg"
              />
            </div>
            {generatedLink && (
              <div className="bg-slate-800 border border-purple-500/30 rounded-2xl p-4 flex items-center gap-3">
                <div className="flex-1 text-sm text-purple-300 font-mono break-all">{generatedLink}</div>
                <Button
                  data-testid="button-broker-copy"
                  size="sm"
                  className="bg-purple-600 hover:bg-purple-500 text-white rounded-xl shrink-0"
                  onClick={copyLink}
                >
                  {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                </Button>
              </div>
            )}
            {!partnerName.trim() && (
              <p className="text-[11px] text-gray-600 font-medium text-center">Enter your name above to generate your unique link</p>
            )}
          </div>
          <div className="bg-slate-900 border border-slate-700 rounded-2xl p-5 space-y-2">
            <p className="text-[10px] text-gray-500 font-black uppercase tracking-widest">How tracking works</p>
            <p className="text-gray-400 text-xs font-medium leading-relaxed">
              When a tenant visits your link, the referral code is captured automatically and appended to their WhatsApp message to DeliWer. Example: <span className="text-purple-400 font-mono">"I came from referral broker123 and need Ejari setup."</span>
            </p>
          </div>
          <Button
            data-testid="button-broker-whatsapp-request"
            size="lg"
            className="w-full bg-purple-600 hover:bg-purple-500 text-white font-black rounded-2xl h-14 text-lg"
            onClick={() => handleWhatsApp()}
          >
            <MessageCircle className="w-5 h-5 mr-2" />
            Request Your Referral Code via WhatsApp
          </Button>
        </div>
      </section>

      {/* WhatsApp Scripts */}
      <section className="py-20 px-4 bg-slate-900/30 border-y border-white/5">
        <div className="max-w-3xl mx-auto space-y-8">
          <div className="text-center space-y-3">
            <Badge className="bg-purple-500/10 text-purple-400 border-purple-500/20 px-4 py-1.5 text-[10px] font-black uppercase tracking-widest rounded-full">Ready-to-Send Scripts</Badge>
            <h2 className="text-3xl font-black uppercase tracking-tighter text-white">WhatsApp Scripts for Brokers</h2>
            <p className="text-gray-400 font-medium text-sm max-w-xl mx-auto">You already have these conversations. Here's exactly what to send — and when to send it.</p>
          </div>
          <div className="space-y-3">
            {BROKER_SCRIPTS.map((s, i) => (
              <div key={i} className="bg-slate-900 border border-slate-700 rounded-2xl overflow-hidden hover:border-purple-500/30 transition-all">
                <button
                  data-testid={`button-broker-script-toggle-${i}`}
                  className="w-full flex items-center justify-between p-5 text-left"
                  onClick={() => setExpandedScript(expandedScript === i ? null : i)}
                >
                  <div>
                    <div className="font-black text-white text-sm uppercase tracking-tight">{s.title}</div>
                    <div className="text-[11px] text-gray-500 font-medium mt-0.5">{s.scenario}</div>
                  </div>
                  {expandedScript === i ? <ChevronUp className="w-4 h-4 text-purple-400 shrink-0" /> : <ChevronDown className="w-4 h-4 text-gray-500 shrink-0" />}
                </button>
                {expandedScript === i && (
                  <div className="px-5 pb-5 space-y-4">
                    <div className="bg-slate-800 rounded-xl p-4 border border-white/5">
                      <pre className="text-gray-300 text-xs font-medium leading-relaxed whitespace-pre-wrap">{s.script.replace(/\[YOUR REFERRAL LINK\]/g, generatedLink || "deliwer.com?ref=YOURCODE")}</pre>
                    </div>
                    <Button
                      data-testid={`button-broker-copy-script-${i}`}
                      size="sm"
                      className="bg-purple-600 hover:bg-purple-500 text-white font-black rounded-xl px-5 h-9 text-xs"
                      onClick={() => copyScript(i, s.script)}
                    >
                      {copiedScript === i ? <><Check className="w-3.5 h-3.5 mr-1.5" />Copied!</> : <><Copy className="w-3.5 h-3.5 mr-1.5" />Copy Script</>}
                    </Button>
                  </div>
                )}
              </div>
            ))}
          </div>
          <p className="text-[11px] text-gray-600 text-center font-medium">Your referral link is auto-inserted when you generate it above. Replace [Tenant Name] before sending.</p>
        </div>
      </section>

      {/* Earnings Example */}
      <section className="py-20 px-4">
        <div className="max-w-3xl mx-auto space-y-8">
          <h2 className="text-3xl font-black uppercase tracking-tighter text-white text-center">Broker Earnings Example</h2>
          <div className="bg-purple-950/30 border border-purple-500/20 rounded-3xl p-8 space-y-5">
            {[
              { label: "Tenants referred per month", value: "5 moves" },
              { label: "Average referral commission", value: "150 AED" },
              { label: "Monthly earning potential", value: "750 AED", highlight: true },
            ].map((row, i) => (
              <div key={i} className={`flex items-center justify-between py-3 ${i < 2 ? "border-b border-white/5" : ""}`} data-testid={`broker-earning-${i}`}>
                <span className={`font-medium ${row.highlight ? "font-black text-white" : "text-gray-400"}`}>{row.label}</span>
                <span className={`font-black text-lg ${row.highlight ? "text-purple-400 text-2xl" : "text-white"}`}>{row.value}</span>
              </div>
            ))}
          </div>
          <p className="text-[11px] text-gray-600 text-center font-medium">
            Based on 5 completed relocation coordinations at 150 AED average commission. Actual results may vary.
          </p>
        </div>
      </section>

      {/* Commission Table */}
      <section className="py-20 px-4 bg-slate-900/50 border-y border-white/5">
        <div className="max-w-3xl mx-auto space-y-8">
          <h2 className="text-3xl font-black uppercase tracking-tighter text-white text-center">Commission Structure</h2>
          <div className="space-y-3">
            {COMMISSION.map((item, i) => (
              <div key={i} className="flex items-center justify-between bg-slate-900 border border-slate-700 rounded-2xl p-5" data-testid={`commission-row-${i}`}>
                <div>
                  <div className="font-black text-white uppercase text-sm">{item.service}</div>
                  <div className="text-[11px] text-gray-500 font-medium mt-0.5">{item.note}</div>
                </div>
                <div className="text-purple-400 font-black text-lg shrink-0">{item.range}</div>
              </div>
            ))}
          </div>
          <p className="text-[11px] text-gray-600 text-center font-medium">Commission is tracked manually and paid out monthly. Contact DeliWer for onboarding.</p>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-20 px-4 bg-slate-900/50 border-y border-white/5">
        <div className="max-w-4xl mx-auto grid md:grid-cols-3 gap-6">
          {[
            { title: "No Extra Work", desc: "You refer — we handle everything. Ejari, DEWA, movers, cleaning — all coordinated by DeliWer." },
            { title: "Happy Clients", desc: "Your tenants get professional support and a seamless move-in experience — better referrals for you." },
            { title: "Passive Income", desc: "Earn commission on every referral you've ever made — even months later, as long as the job completes." },
          ].map((item, i) => (
            <Card key={i} className="bg-slate-900 border-slate-700 rounded-2xl p-6 space-y-3">
              <CheckCircle2 className="w-6 h-6 text-emerald-400" />
              <h3 className="font-black text-white uppercase text-sm">{item.title}</h3>
              <p className="text-gray-400 text-xs font-medium leading-relaxed">{item.desc}</p>
            </Card>
          ))}
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20 px-4 bg-purple-950/20 border-t border-purple-500/10 text-center">
        <div className="max-w-2xl mx-auto space-y-6">
          <h2 className="text-4xl font-black uppercase tracking-tighter text-white">Start Earning Today</h2>
          <p className="text-gray-400 font-medium">Message DeliWer on WhatsApp to get your referral code set up within minutes.</p>
          <Button
            data-testid="button-broker-final-cta"
            size="lg"
            className="bg-purple-600 hover:bg-purple-500 text-white font-black rounded-2xl px-12 h-16 text-xl shadow-2xl"
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
