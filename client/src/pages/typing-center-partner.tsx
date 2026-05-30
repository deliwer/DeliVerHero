import { useState } from "react";
import { SEOMeta } from "@/components/seo-meta";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Copy, Check, CheckCircle2, MessageCircle, ArrowRight, FileText, Zap, Truck, Sparkles, ChevronDown, ChevronUp } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { buildWhatsAppMessage, openWhatsApp } from "@/lib/referral";

const TYPING_SCRIPTS = [
  {
    title: "Right After Ejari — Tenant Still at Your Counter",
    scenario: "Say this or WhatsApp the tenant immediately after completing Ejari",
    script: `Your Ejari is registered! 🎉\n\nNow for the next steps — DEWA activation, movers, cleaning — everything can be coordinated in one WhatsApp with DeliWer.\n\nI've partnered with them so you get priority service. Here's the link:\n\n[YOUR REFERRAL LINK]\n\nJust message them and they'll take it from there. No hidden costs, no tenant markup.`,
  },
  {
    title: "Print Card / QR on Your Counter",
    scenario: "Static message to display or send when tenants ask for help",
    script: `Moving into a new apartment? DeliWer coordinates everything:\n\n✅ Ejari (already done!)\n✅ DEWA activation\n✅ Vetted movers\n✅ Apartment cleaning\n✅ Water filter setup\n\nAll in one WhatsApp conversation.\n\n👉 [YOUR REFERRAL LINK]\n\nNo markup on tenant — they pay standard market rates.`,
  },
  {
    title: "WhatsApp to New Tenant When They Ask About Moving",
    scenario: "When a tenant asks 'what do I do next after Ejari?'",
    script: `Great question! After Ejari, most tenants need:\n\n1. DEWA activation\n2. Movers coordination\n3. Apartment cleaning\n4. Water filter (required in many buildings)\n\nI personally recommend DeliWer — they handle all of this. Many of our clients use them.\n\nHere's the link to get started: [YOUR REFERRAL LINK]`,
  },
];

const TENANT_QUESTIONS = [
  { q: "Do you know any movers?", a: "Share your DeliWer referral link — tenants get vetted movers coordinated for them." },
  { q: "How do I activate DEWA?", a: "DeliWer coordinates DEWA activation after Ejari — another referral opportunity." },
  { q: "Where can I get cleaning done?", a: "DeliWer's network includes vetted cleaning companies across Dubai." },
  { q: "Is my water safe?", a: "DeliWer's AquaCafe water filter service is often the first thing tenants request." },
];

const HOW_IT_WORKS = [
  { step: "01", title: "Register as a Typing Center Partner", desc: "WhatsApp DeliWer to receive your unique referral link tied to your center's name." },
  { step: "02", title: "Share After Every Ejari", desc: "After registering Ejari for a tenant, share your link via WhatsApp or a printed card in your office." },
  { step: "03", title: "DeliWer Handles the Move", desc: "The tenant submits their request. DeliWer coordinates movers, cleaning, DEWA, and more." },
  { step: "04", title: "You Earn Commission", desc: "20% referral fee per completed relocation coordination. Tracked and paid monthly." },
];

export default function TypingCenterPartnerPage() {
  const [centerName, setCenterName] = useState("");
  const [copied, setCopied] = useState(false);
  const [copiedScript, setCopiedScript] = useState<number | null>(null);
  const [expandedScript, setExpandedScript] = useState<number | null>(0);
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({ name: "", company: "", whatsapp: "", area: "" });
  const { toast } = useToast();

  const generateLink = () => {
    if (!centerName.trim()) return "";
    const ref = centerName.toLowerCase().replace(/\s+/g, "").replace(/[^a-z0-9]/g, "");
    return `${window.location.origin}/ejari-dubai?ref=${ref}`;
  };

  const generatedLink = generateLink();

  const copyLink = async () => {
    if (!generatedLink) return;
    await navigator.clipboard.writeText(generatedLink);
    setCopied(true);
    toast({ title: "Link Copied!", description: "Share this with tenants after every Ejari registration." });
    setTimeout(() => setCopied(false), 2500);
  };

  const copyScript = async (idx: number, text: string) => {
    const linkPlaceholder = generatedLink || "deliwer.com?ref=YOURCODE";
    const filled = text.replace(/\[YOUR REFERRAL LINK\]/g, linkPlaceholder);
    await navigator.clipboard.writeText(filled);
    setCopiedScript(idx);
    toast({ title: "Script Copied!", description: "Paste directly into WhatsApp." });
    setTimeout(() => setCopiedScript(null), 2500);
  };

  const handleJoin = () => {
    if (!form.name && !form.company) return;
    openWhatsApp(buildWhatsAppMessage({
      intro: "Hello DeliWer, I'm an Ejari typing center interested in the partner referral program.",
      fields: {
        Name: form.name || undefined,
        Center: form.company || undefined,
        WhatsApp: form.whatsapp || undefined,
        Area: form.area || undefined,
      },
    }));
    setSubmitted(true);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <SEOMeta
        title="Ejari Typing Centers | Earn Referral Commission | DeliWer Partner"
        description="Ejari typing centers in Dubai can earn commission referring tenants for relocation coordination. DeliWer handles movers, cleaning, DEWA — you earn 20% per referral."
      />

      {/* Hero */}
      <section className="relative py-28 px-4 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-950 via-emerald-950/20 to-slate-950" />
        <div className="max-w-4xl mx-auto text-center relative z-10 space-y-8">
          <Badge className="bg-emerald-500/10 text-emerald-400 border-emerald-500/20 px-4 py-2 text-xs font-black uppercase tracking-widest rounded-full">
            Typing Center Partner Program
          </Badge>
          <h1 className="text-5xl md:text-7xl font-black tracking-tighter leading-[0.88] uppercase">
            Ejari Typing Centers<br />
            <span className="text-emerald-400">Can Earn from Relocation Referrals</span>
          </h1>
          <p className="text-xl text-gray-400 font-medium max-w-2xl mx-auto leading-relaxed">
            Tenants often ask for mover recommendations, cleaning services, and utility help during Ejari registration. Simply share your referral link and earn 20% commission.
          </p>
          <div className="inline-flex items-center gap-3 bg-emerald-500/10 border border-emerald-500/30 rounded-2xl px-6 py-4">
            <CheckCircle2 className="w-5 h-5 text-emerald-400" />
            <span className="text-emerald-300 font-black text-lg uppercase">20% Referral Fee · No Extra Work</span>
          </div>
          <Button
            data-testid="button-typing-hero-join"
            size="lg"
            className="bg-emerald-600 hover:bg-emerald-500 text-white font-black rounded-2xl px-10 h-16 text-xl shadow-2xl"
            onClick={() => document.getElementById("typing-join-form")?.scrollIntoView({ behavior: "smooth" })}
          >
            Join the Partner Network <ArrowRight className="w-5 h-5 ml-2" />
          </Button>
        </div>
      </section>

      {/* Tenant Questions You Already Answer */}
      <section className="py-20 px-4 border-y border-white/5 bg-slate-900/30">
        <div className="max-w-4xl mx-auto space-y-8">
          <div className="text-center space-y-3">
            <h2 className="text-3xl font-black uppercase tracking-tighter text-white">
              Tenants Are Already Asking These Questions
            </h2>
            <p className="text-gray-400 font-medium">Every Ejari registration is a relocation opportunity — you just need the right referral link ready.</p>
          </div>
          <div className="grid md:grid-cols-2 gap-5">
            {TENANT_QUESTIONS.map((item, i) => (
              <div key={i} className="bg-slate-900 border border-slate-700 rounded-2xl p-6 space-y-3 hover:border-emerald-500/30 transition-all">
                <div className="text-emerald-400 font-black text-sm">"{item.q}"</div>
                <p className="text-gray-400 text-xs font-medium leading-relaxed">{item.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 px-4">
        <div className="max-w-3xl mx-auto space-y-10">
          <h2 className="text-3xl font-black uppercase tracking-tighter text-white text-center">How It Works</h2>
          <div className="space-y-5">
            {HOW_IT_WORKS.map((item, i) => (
              <div key={i} className="flex gap-6 items-start">
                <div className="text-3xl font-black text-emerald-400/30 w-12 shrink-0">{item.step}</div>
                <div>
                  <h3 className="font-black text-white uppercase tracking-tight mb-1">{item.title}</h3>
                  <p className="text-gray-400 text-sm font-medium">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* What Tenants Get */}
      <section className="py-20 px-4 bg-slate-900/50 border-y border-white/5">
        <div className="max-w-4xl mx-auto space-y-8">
          <h2 className="text-3xl font-black uppercase tracking-tighter text-white text-center">What DeliWer Gives Your Tenants</h2>
          <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { icon: Truck, label: "Movers Coordination" },
              { icon: Sparkles, label: "Cleaning Service" },
              { icon: Zap, label: "DEWA Activation" },
              { icon: FileText, label: "Full Ejari Support" },
            ].map((s, i) => {
              const Icon = s.icon;
              return (
                <div key={i} className="flex flex-col items-center gap-3 bg-slate-900 border border-slate-700 rounded-2xl p-5 text-center">
                  <div className="w-10 h-10 bg-emerald-500/10 rounded-xl flex items-center justify-center">
                    <Icon className="w-5 h-5 text-emerald-400" />
                  </div>
                  <span className="font-black text-white text-xs uppercase">{s.label}</span>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Link Generator */}
      <section className="py-20 px-4">
        <div className="max-w-2xl mx-auto space-y-8">
          <h2 className="text-3xl font-black uppercase tracking-tighter text-white text-center">Generate Your Referral Link</h2>
          <p className="text-gray-400 font-medium text-center">Enter your center name to instantly create your unique referral link.</p>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label className="text-[11px] font-black uppercase tracking-widest text-gray-400">Typing Center Name</Label>
              <Input
                data-testid="input-typing-center-name"
                value={centerName}
                onChange={e => setCenterName(e.target.value)}
                placeholder="e.g. Al Barsha Typing Center"
                className="bg-slate-800 border-slate-600 text-white placeholder:text-gray-600 rounded-xl h-12 text-lg"
              />
            </div>
            {generatedLink && (
              <div className="bg-slate-800 border border-emerald-500/30 rounded-2xl p-4 flex items-center gap-3">
                <div className="flex-1 text-sm text-emerald-300 font-mono break-all">{generatedLink}</div>
                <Button
                  data-testid="button-typing-copy-link"
                  size="sm"
                  className="bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl shrink-0"
                  onClick={copyLink}
                >
                  {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                </Button>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* WhatsApp Scripts */}
      <section className="py-20 px-4 bg-slate-900/30 border-y border-white/5">
        <div className="max-w-3xl mx-auto space-y-8">
          <div className="text-center space-y-3">
            <Badge className="bg-emerald-500/10 text-emerald-400 border-emerald-500/20 px-4 py-1.5 text-[10px] font-black uppercase tracking-widest rounded-full">Ready-to-Send Scripts</Badge>
            <h2 className="text-3xl font-black uppercase tracking-tighter text-white">WhatsApp Scripts for Typing Centers</h2>
            <p className="text-gray-400 font-medium text-sm max-w-xl mx-auto">Use these at your counter or send via WhatsApp after every Ejari. Your link auto-fills when generated above.</p>
          </div>
          <div className="space-y-3">
            {TYPING_SCRIPTS.map((s, i) => (
              <div key={i} className="bg-slate-900 border border-slate-700 rounded-2xl overflow-hidden hover:border-emerald-500/30 transition-all">
                <button
                  data-testid={`button-typing-script-toggle-${i}`}
                  className="w-full flex items-center justify-between p-5 text-left"
                  onClick={() => setExpandedScript(expandedScript === i ? null : i)}
                >
                  <div>
                    <div className="font-black text-white text-sm uppercase tracking-tight">{s.title}</div>
                    <div className="text-[11px] text-gray-500 font-medium mt-0.5">{s.scenario}</div>
                  </div>
                  {expandedScript === i ? <ChevronUp className="w-4 h-4 text-emerald-400 shrink-0" /> : <ChevronDown className="w-4 h-4 text-gray-500 shrink-0" />}
                </button>
                {expandedScript === i && (
                  <div className="px-5 pb-5 space-y-4">
                    <div className="bg-slate-800 rounded-xl p-4 border border-white/5">
                      <pre className="text-gray-300 text-xs font-medium leading-relaxed whitespace-pre-wrap">{s.script.replace(/\[YOUR REFERRAL LINK\]/g, generatedLink || "deliwer.com?ref=YOURCODE")}</pre>
                    </div>
                    <Button
                      data-testid={`button-typing-copy-script-${i}`}
                      size="sm"
                      className="bg-emerald-600 hover:bg-emerald-500 text-white font-black rounded-xl px-5 h-9 text-xs"
                      onClick={() => copyScript(i, s.script)}
                    >
                      {copiedScript === i ? <><Check className="w-3.5 h-3.5 mr-1.5" />Copied!</> : <><Copy className="w-3.5 h-3.5 mr-1.5" />Copy Script</>}
                    </Button>
                  </div>
                )}
              </div>
            ))}
          </div>
          <p className="text-[11px] text-gray-600 text-center font-medium">Generate your referral link above to auto-fill it in every script before copying.</p>
        </div>
      </section>

      {/* Registration Form */}
      <section id="typing-join-form" className="py-20 px-4 bg-slate-900/50 border-y border-white/5">
        <div className="max-w-2xl mx-auto space-y-8">
          <div className="text-center space-y-3">
            <h2 className="text-3xl font-black uppercase tracking-tighter text-white">Register as a Partner</h2>
            <p className="text-gray-400 font-medium">Our team will activate your referral code and contact you on WhatsApp.</p>
          </div>
          {submitted ? (
            <div className="bg-emerald-500/10 border border-emerald-500/30 rounded-3xl p-10 text-center space-y-4">
              <CheckCircle2 className="w-12 h-12 text-emerald-400 mx-auto" />
              <h3 className="text-2xl font-black text-white uppercase">Request Received!</h3>
              <p className="text-gray-300 font-medium">Our team will activate your referral code and contact you on WhatsApp within the day.</p>
            </div>
          ) : (
            <div className="bg-slate-900 border border-slate-700 rounded-3xl p-8 space-y-5">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label className="text-[11px] font-black uppercase tracking-widest text-gray-400">Your Name</Label>
                  <Input data-testid="input-typing-name" value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))} placeholder="Full name" className="bg-slate-800 border-slate-600 text-white placeholder:text-gray-600 rounded-xl h-11" />
                </div>
                <div className="space-y-2">
                  <Label className="text-[11px] font-black uppercase tracking-widest text-gray-400">Center Name</Label>
                  <Input data-testid="input-typing-company" value={form.company} onChange={e => setForm(f => ({ ...f, company: e.target.value }))} placeholder="Typing center name" className="bg-slate-800 border-slate-600 text-white placeholder:text-gray-600 rounded-xl h-11" />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label className="text-[11px] font-black uppercase tracking-widest text-gray-400">WhatsApp</Label>
                  <Input data-testid="input-typing-whatsapp" value={form.whatsapp} onChange={e => setForm(f => ({ ...f, whatsapp: e.target.value }))} placeholder="+971 50 000 0000" className="bg-slate-800 border-slate-600 text-white placeholder:text-gray-600 rounded-xl h-11" />
                </div>
                <div className="space-y-2">
                  <Label className="text-[11px] font-black uppercase tracking-widest text-gray-400">Area / Location</Label>
                  <Input data-testid="input-typing-area" value={form.area} onChange={e => setForm(f => ({ ...f, area: e.target.value }))} placeholder="e.g. Al Barsha, Deira" className="bg-slate-800 border-slate-600 text-white placeholder:text-gray-600 rounded-xl h-11" />
                </div>
              </div>
              <Button
                data-testid="button-typing-join-submit"
                size="lg"
                className="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-black rounded-2xl h-14 text-lg"
                onClick={handleJoin}
                disabled={!form.name && !form.company}
              >
                <MessageCircle className="w-5 h-5 mr-2" />
                Join the Partner Network
              </Button>
            </div>
          )}
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20 px-4 bg-emerald-950/20 border-t border-emerald-500/10 text-center">
        <div className="max-w-2xl mx-auto space-y-6">
          <h2 className="text-4xl font-black uppercase tracking-tighter text-white">Questions?</h2>
          <p className="text-gray-400 font-medium">Message DeliWer directly on WhatsApp — we'll set up your referral code within minutes.</p>
          <Button
            data-testid="button-typing-whatsapp-direct"
            size="lg"
            className="bg-emerald-600 hover:bg-emerald-500 text-white font-black rounded-2xl px-12 h-14 text-xl"
            onClick={() => window.open("https://wa.me/971523906019?text=" + encodeURIComponent("Hi, I run an Ejari typing center and I'm interested in the DeliWer partner referral program."), "_blank")}
          >
            <MessageCircle className="w-5 h-5 mr-2" />
            WhatsApp DeliWer
          </Button>
        </div>
      </section>
    </div>
  );
}
