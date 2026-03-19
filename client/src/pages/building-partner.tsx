import { useState } from "react";
import { SEOMeta } from "@/components/seo-meta";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Copy, Check, CheckCircle2, MessageCircle, ArrowRight, Truck, Sparkles, Zap, Droplets, ChevronDown, ChevronUp } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { buildWhatsAppMessage, openWhatsApp } from "@/lib/referral";

const BUILDING_SCRIPTS = [
  {
    title: "Welcome Message for New Residents",
    scenario: "Send on the day a new tenant moves in or collects keys",
    script: `Welcome to [Building Name]! 🏠\n\nTo make your move-in smooth, I recommend DeliWer — they coordinate everything:\n\n✅ Ejari registration\n✅ DEWA activation\n✅ Movers\n✅ Apartment cleaning\n✅ Water filter setup\n\nHere's the link: [YOUR REFERRAL LINK]\n\nThey'll handle it all via WhatsApp. Let me know if you need anything else from the building side!`,
  },
  {
    title: "When a Resident Asks for Movers",
    scenario: "Quick response when any resident asks for recommendations",
    script: `For movers, I recommend DeliWer — we've had great feedback from residents here.\n\nThey don't just coordinate movers — they handle the full move-in: Ejari, DEWA, cleaning, all in one place.\n\nHere's the link: [YOUR REFERRAL LINK]\n\nJust message them on WhatsApp and they'll sort everything out for you.`,
  },
  {
    title: "Post in Building WhatsApp Group",
    scenario: "Share in the building residents group for maximum reach",
    script: `Hi everyone 👋\n\nFor anyone moving in soon or needing help with Ejari, DEWA, movers, or cleaning — DeliWer is a service we recommend for residents here.\n\nThey coordinate the full move-in process in one WhatsApp conversation. Very smooth, no hidden fees.\n\nLink here: [YOUR REFERRAL LINK]\n\nFeel free to share with friends and family moving to Dubai!`,
  },
];

const DAILY_QUESTIONS = [
  { q: "Can you recommend movers?", a: "Share your DeliWer referral link. Tenants get fully coordinated movers — you earn commission." },
  { q: "How do I set up DEWA?", a: "DeliWer handles DEWA activation alongside Ejari — another reason to refer every new resident." },
  { q: "Where can I get my apartment cleaned?", a: "DeliWer coordinates professional cleaning services with vetted companies across Dubai." },
  { q: "Is there anyone who does move-in setups?", a: "Yes — DeliWer's full move-in coordination service covers everything from movers to water filters." },
];

const HOW_IT_WORKS = [
  { step: "01", title: "Register as a Building Partner", desc: "WhatsApp DeliWer and receive a referral link for your building (e.g. /ejari-dubai?ref=marinagatesecurity)." },
  { step: "02", title: "Share with New Residents", desc: "When tenants move in or ask for help, hand them your referral card or send your link via WhatsApp." },
  { step: "03", title: "DeliWer Coordinates Everything", desc: "Tenants submit a request — DeliWer handles movers, cleaning, utilities, and more." },
  { step: "04", title: "You Receive Commission", desc: "20% referral fee per completed coordination. Paid out monthly to your WhatsApp-registered account." },
];

export default function BuildingPartnerPage() {
  const [buildingName, setBuildingName] = useState("");
  const [copied, setCopied] = useState(false);
  const [copiedScript, setCopiedScript] = useState<number | null>(null);
  const [expandedScript, setExpandedScript] = useState<number | null>(0);
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({ name: "", building: "", whatsapp: "", area: "" });
  const { toast } = useToast();

  const generateLink = () => {
    if (!buildingName.trim()) return "";
    const ref = buildingName.toLowerCase().replace(/\s+/g, "").replace(/[^a-z0-9]/g, "");
    return `${window.location.origin}/ejari-dubai?ref=${ref}`;
  };

  const generatedLink = generateLink();

  const copyLink = async () => {
    if (!generatedLink) return;
    await navigator.clipboard.writeText(generatedLink);
    setCopied(true);
    toast({ title: "Link Copied!", description: "Share this with residents or print it for your desk." });
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
    if (!form.name && !form.building) return;
    openWhatsApp(buildWhatsAppMessage({
      intro: "Hello DeliWer, I'm a building security / concierge team interested in the partner referral program.",
      fields: {
        Name: form.name || undefined,
        Building: form.building || undefined,
        WhatsApp: form.whatsapp || undefined,
        Area: form.area || undefined,
      },
    }));
    setSubmitted(true);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <SEOMeta
        title="Building Security & Concierge Partner Program | DeliWer Dubai"
        description="Building security and concierge teams in Dubai can earn commission referring tenants to DeliWer's relocation coordination service. 20% per referral — no extra work."
      />

      {/* Hero */}
      <section className="relative py-28 px-4 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-950 via-blue-950/20 to-slate-950" />
        <div className="max-w-4xl mx-auto text-center relative z-10 space-y-8">
          <Badge className="bg-blue-500/10 text-blue-400 border-blue-500/20 px-4 py-2 text-xs font-black uppercase tracking-widest rounded-full">
            Building Partner Program
          </Badge>
          <h1 className="text-5xl md:text-7xl font-black tracking-tighter leading-[0.88] uppercase">
            Building Security &amp; Concierges<br />
            <span className="text-blue-400">Can Earn from Tenant Moves</span>
          </h1>
          <p className="text-xl text-gray-400 font-medium max-w-2xl mx-auto leading-relaxed">
            Tenants moving in or out of your building frequently ask for mover recommendations. DeliWer gives you a simple referral link that turns every question into commission.
          </p>
          <div className="inline-flex items-center gap-3 bg-blue-500/10 border border-blue-500/30 rounded-2xl px-6 py-4">
            <CheckCircle2 className="w-5 h-5 text-blue-400" />
            <span className="text-blue-300 font-black text-lg uppercase">20% Referral Fee · Works from Your WhatsApp</span>
          </div>
          <Button
            data-testid="button-building-hero-join"
            size="lg"
            className="bg-blue-600 hover:bg-blue-500 text-white font-black rounded-2xl px-10 h-16 text-xl shadow-2xl"
            onClick={() => document.getElementById("building-join-form")?.scrollIntoView({ behavior: "smooth" })}
          >
            Join the Partner Network <ArrowRight className="w-5 h-5 ml-2" />
          </Button>
        </div>
      </section>

      {/* Questions You Already Answer */}
      <section className="py-20 px-4 border-y border-white/5 bg-slate-900/30">
        <div className="max-w-4xl mx-auto space-y-8">
          <div className="text-center space-y-3">
            <h2 className="text-3xl font-black uppercase tracking-tighter text-white">
              Questions You Answer Every Week
            </h2>
            <p className="text-gray-400 font-medium">Turn those recommendations into paid referrals.</p>
          </div>
          <div className="grid md:grid-cols-2 gap-5">
            {DAILY_QUESTIONS.map((item, i) => (
              <div key={i} className="bg-slate-900 border border-slate-700 rounded-2xl p-6 space-y-3 hover:border-blue-500/30 transition-all">
                <div className="text-blue-400 font-black text-sm">"{item.q}"</div>
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
              <div key={i} className="flex gap-6 items-start" data-testid={`building-step-${i}`}>
                <div className="text-3xl font-black text-blue-400/30 w-12 shrink-0">{item.step}</div>
                <div>
                  <h3 className="font-black text-white uppercase tracking-tight mb-1">{item.title}</h3>
                  <p className="text-gray-400 text-sm font-medium">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Earnings Example */}
      <section className="py-20 px-4 bg-slate-900/50 border-y border-white/5">
        <div className="max-w-3xl mx-auto space-y-8">
          <h2 className="text-3xl font-black uppercase tracking-tighter text-white text-center">Example Earnings</h2>
          <div className="bg-blue-950/30 border border-blue-500/20 rounded-3xl p-8 space-y-5">
            {[
              { label: "Tenants referred per month", value: "5 moves" },
              { label: "Average referral commission", value: "150 AED" },
              { label: "Monthly earning potential", value: "750 AED", highlight: true },
            ].map((row, i) => (
              <div key={i} className={`flex items-center justify-between py-3 ${i < 2 ? "border-b border-white/5" : ""}`} data-testid={`building-earning-${i}`}>
                <span className={`font-medium ${row.highlight ? "font-black text-white" : "text-gray-400"}`}>{row.label}</span>
                <span className={`font-black text-lg ${row.highlight ? "text-blue-400 text-2xl" : "text-white"}`}>{row.value}</span>
              </div>
            ))}
          </div>
          <p className="text-[11px] text-gray-600 text-center font-medium">Actual earnings vary. Commission paid monthly on completed relocations.</p>
        </div>
      </section>

      {/* Services Tenants Get */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto space-y-8">
          <h2 className="text-3xl font-black uppercase tracking-tighter text-white text-center">What Tenants Get via Your Link</h2>
          <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { icon: Truck, label: "Movers" },
              { icon: Sparkles, label: "Cleaning" },
              { icon: Zap, label: "DEWA Setup" },
              { icon: Droplets, label: "Water Filter" },
            ].map((s, i) => {
              const Icon = s.icon;
              return (
                <div key={i} className="flex flex-col items-center gap-3 bg-slate-900 border border-slate-700 rounded-2xl p-5 text-center hover:border-blue-500/30 transition-all">
                  <div className="w-10 h-10 bg-blue-500/10 rounded-xl flex items-center justify-center">
                    <Icon className="w-5 h-5 text-blue-400" />
                  </div>
                  <span className="font-black text-white text-xs uppercase">{s.label}</span>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Link Generator */}
      <section className="py-20 px-4 bg-slate-900/50 border-y border-white/5">
        <div className="max-w-2xl mx-auto space-y-8">
          <h2 className="text-3xl font-black uppercase tracking-tighter text-white text-center">Generate Your Building Referral Link</h2>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label className="text-[11px] font-black uppercase tracking-widest text-gray-400">Building Name</Label>
              <Input
                data-testid="input-building-name"
                value={buildingName}
                onChange={e => setBuildingName(e.target.value)}
                placeholder="e.g. Marina Gate, Damac Hills"
                className="bg-slate-800 border-slate-600 text-white placeholder:text-gray-600 rounded-xl h-12 text-lg"
              />
            </div>
            {generatedLink && (
              <div className="bg-slate-800 border border-blue-500/30 rounded-2xl p-4 flex items-center gap-3">
                <div className="flex-1 text-sm text-blue-300 font-mono break-all">{generatedLink}</div>
                <Button
                  data-testid="button-building-copy-link"
                  size="sm"
                  className="bg-blue-600 hover:bg-blue-500 text-white rounded-xl shrink-0"
                  onClick={copyLink}
                >
                  {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                </Button>
              </div>
            )}
            {generatedLink && (
              <p className="text-[11px] text-gray-500 font-medium">Print this link as a QR code for your security desk, or share it on WhatsApp with residents.</p>
            )}
          </div>
        </div>
      </section>

      {/* WhatsApp Scripts */}
      <section className="py-20 px-4 bg-slate-900/30 border-y border-white/5">
        <div className="max-w-3xl mx-auto space-y-8">
          <div className="text-center space-y-3">
            <Badge className="bg-blue-500/10 text-blue-400 border-blue-500/20 px-4 py-1.5 text-[10px] font-black uppercase tracking-widest rounded-full">Ready-to-Send Scripts</Badge>
            <h2 className="text-3xl font-black uppercase tracking-tighter text-white">WhatsApp Scripts for Building Teams</h2>
            <p className="text-gray-400 font-medium text-sm max-w-xl mx-auto">You're already talking to residents every day. Here's exactly what to send — no selling required.</p>
          </div>
          <div className="space-y-3">
            {BUILDING_SCRIPTS.map((s, i) => (
              <div key={i} className="bg-slate-900 border border-slate-700 rounded-2xl overflow-hidden hover:border-blue-500/30 transition-all">
                <button
                  data-testid={`button-building-script-toggle-${i}`}
                  className="w-full flex items-center justify-between p-5 text-left"
                  onClick={() => setExpandedScript(expandedScript === i ? null : i)}
                >
                  <div>
                    <div className="font-black text-white text-sm uppercase tracking-tight">{s.title}</div>
                    <div className="text-[11px] text-gray-500 font-medium mt-0.5">{s.scenario}</div>
                  </div>
                  {expandedScript === i ? <ChevronUp className="w-4 h-4 text-blue-400 shrink-0" /> : <ChevronDown className="w-4 h-4 text-gray-500 shrink-0" />}
                </button>
                {expandedScript === i && (
                  <div className="px-5 pb-5 space-y-4">
                    <div className="bg-slate-800 rounded-xl p-4 border border-white/5">
                      <pre className="text-gray-300 text-xs font-medium leading-relaxed whitespace-pre-wrap">{s.script.replace(/\[YOUR REFERRAL LINK\]/g, generatedLink || "deliwer.com?ref=YOURCODE")}</pre>
                    </div>
                    <Button
                      data-testid={`button-building-copy-script-${i}`}
                      size="sm"
                      className="bg-blue-600 hover:bg-blue-500 text-white font-black rounded-xl px-5 h-9 text-xs"
                      onClick={() => copyScript(i, s.script)}
                    >
                      {copiedScript === i ? <><Check className="w-3.5 h-3.5 mr-1.5" />Copied!</> : <><Copy className="w-3.5 h-3.5 mr-1.5" />Copy Script</>}
                    </Button>
                  </div>
                )}
              </div>
            ))}
          </div>
          <p className="text-[11px] text-gray-600 text-center font-medium">Generate your building referral link above to auto-fill it in every script before copying.</p>
        </div>
      </section>

      {/* Registration Form */}
      <section id="building-join-form" className="py-20 px-4">
        <div className="max-w-2xl mx-auto space-y-8">
          <div className="text-center space-y-3">
            <h2 className="text-3xl font-black uppercase tracking-tighter text-white">Register as a Partner</h2>
            <p className="text-gray-400 font-medium">Our team will activate your referral code and contact you on WhatsApp.</p>
          </div>
          {submitted ? (
            <div className="bg-blue-500/10 border border-blue-500/30 rounded-3xl p-10 text-center space-y-4">
              <CheckCircle2 className="w-12 h-12 text-blue-400 mx-auto" />
              <h3 className="text-2xl font-black text-white uppercase">Request Received!</h3>
              <p className="text-gray-300 font-medium">Our team will activate your referral code and contact you on WhatsApp within the day.</p>
            </div>
          ) : (
            <div className="bg-slate-900 border border-slate-700 rounded-3xl p-8 space-y-5">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label className="text-[11px] font-black uppercase tracking-widest text-gray-400">Your Name</Label>
                  <Input data-testid="input-building-form-name" value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))} placeholder="Full name" className="bg-slate-800 border-slate-600 text-white placeholder:text-gray-600 rounded-xl h-11" />
                </div>
                <div className="space-y-2">
                  <Label className="text-[11px] font-black uppercase tracking-widest text-gray-400">Building Name</Label>
                  <Input data-testid="input-building-form-building" value={form.building} onChange={e => setForm(f => ({ ...f, building: e.target.value }))} placeholder="Building / compound name" className="bg-slate-800 border-slate-600 text-white placeholder:text-gray-600 rounded-xl h-11" />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label className="text-[11px] font-black uppercase tracking-widest text-gray-400">WhatsApp</Label>
                  <Input data-testid="input-building-form-whatsapp" value={form.whatsapp} onChange={e => setForm(f => ({ ...f, whatsapp: e.target.value }))} placeholder="+971 50 000 0000" className="bg-slate-800 border-slate-600 text-white placeholder:text-gray-600 rounded-xl h-11" />
                </div>
                <div className="space-y-2">
                  <Label className="text-[11px] font-black uppercase tracking-widest text-gray-400">Area</Label>
                  <Input data-testid="input-building-form-area" value={form.area} onChange={e => setForm(f => ({ ...f, area: e.target.value }))} placeholder="e.g. JBR, Marina" className="bg-slate-800 border-slate-600 text-white placeholder:text-gray-600 rounded-xl h-11" />
                </div>
              </div>
              <Button
                data-testid="button-building-join-submit"
                size="lg"
                className="w-full bg-blue-600 hover:bg-blue-500 text-white font-black rounded-2xl h-14 text-lg"
                onClick={handleJoin}
                disabled={!form.name && !form.building}
              >
                <MessageCircle className="w-5 h-5 mr-2" />
                Join the Partner Network
              </Button>
            </div>
          )}
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20 px-4 bg-blue-950/20 border-t border-blue-500/10 text-center">
        <div className="max-w-2xl mx-auto space-y-6">
          <h2 className="text-4xl font-black uppercase tracking-tighter text-white">Ready to Start Earning?</h2>
          <p className="text-gray-400 font-medium">Message DeliWer on WhatsApp and your referral link will be active within minutes.</p>
          <Button
            data-testid="button-building-whatsapp-final"
            size="lg"
            className="bg-blue-600 hover:bg-blue-500 text-white font-black rounded-2xl px-12 h-14 text-xl"
            onClick={() => window.open("https://wa.me/971523946311?text=" + encodeURIComponent("Hi, I'm a building security / concierge team interested in the DeliWer partner referral program."), "_blank")}
          >
            <MessageCircle className="w-5 h-5 mr-2" />
            WhatsApp DeliWer
          </Button>
        </div>
      </section>
    </div>
  );
}
