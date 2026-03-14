import { useState } from "react";
import { Navigation } from "@/components/navigation";
import { PartnerSubNav } from "@/components/partner-subnav";
import { SEOMeta } from "@/components/seo-meta";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Copy, Check, MessageCircle, BookOpen, ArrowRight } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Link } from "wouter";
import { motion } from "framer-motion";

const TEMPLATES = [
  {
    channel: "WhatsApp (Casual)",
    emoji: "💬",
    text: `Moving into a new place in Dubai? 🏠

DeliWer coordinates movers, Ejari registration, DEWA setup and more. It doesn't cost extra — they simply organize everything for you.

My referral link: [YOUR_LINK]

One WhatsApp contact manages everything. Stress-free move-in!`,
  },
  {
    channel: "WhatsApp (Professional)",
    emoji: "📱",
    text: `Hi [Name],

As you prepare to move into your new Dubai apartment, I wanted to share a helpful service.

DeliWer handles the full move-in coordination — movers, Ejari, DEWA activation, and water setup — at no extra charge. You pay only what vendors normally charge.

My referral link: [YOUR_LINK]

Happy to answer any questions.`,
  },
  {
    channel: "Email / LinkedIn",
    emoji: "📧",
    text: `Subject: Stress-Free Move-In Coordination in Dubai

Hi [Name],

Moving into a Dubai apartment involves more coordination than most people expect — Ejari registration, DEWA activation, moving company, water setup, and more.

DeliWer handles all of this in one WhatsApp conversation. You pay only vendor market rates — there's no service fee charged to tenants.

Get started here: [YOUR_LINK]

Best regards,
[Your Name]`,
  },
  {
    channel: "Instagram / Social Media",
    emoji: "📸",
    text: `Moving to Dubai? Skip the stress. 🇦🇪

DeliWer handles your entire move-in:
✅ Movers
✅ Ejari registration  
✅ DEWA activation
✅ Water & shower filter setup

One contact. Zero extra fees. Just vendor market rates.

Link in bio → [YOUR_LINK]

#DubaiMoveIn #Dubai #Expat #DubaiLiving`,
  },
  {
    channel: "Telegram Group",
    emoji: "✈️",
    text: `@here — if anyone is moving into a Dubai apartment soon, check this out:

DeliWer coordinates your entire move-in — movers, Ejari, DEWA, water filter — at no extra cost. They simply organize everything so you don't have to.

[YOUR_LINK]

I've used/referred this and it's genuinely helpful for new residents 👍`,
  },
];

const EXPLAINER_COPY = `Moving Into Dubai? Here's What DeliWer Does

When you sign a lease in Dubai, you need to handle several services before you can actually move in:

1. Ejari registration (required before utilities can be activated)
2. DEWA activation (electricity + water + security deposit)
3. Professional movers (to transport your belongings)
4. Water & air quality setup (shower filter, AC check)

This normally means calling 4–5 different vendors, coordinating dates, and following up multiple times.

DeliWer manages all of this through one WhatsApp conversation.

The cost? Exactly the same as if you booked each vendor yourself. DeliWer earns a small coordination fee directly from the vendors — not from you.

It's a no-brainer for anyone moving into Dubai.`;

export default function PartnersResources() {
  const { toast } = useToast();
  const [copiedIdx, setCopiedIdx] = useState<number | null>(null);
  const [copiedExplainer, setCopiedExplainer] = useState(false);

  const handleCopy = (text: string, idx: number) => {
    navigator.clipboard.writeText(text);
    setCopiedIdx(idx);
    setTimeout(() => setCopiedIdx(null), 2000);
    toast({ title: "Template copied!", description: "Replace [YOUR_LINK] with your referral link before sending." });
  };

  const handleCopyExplainer = () => {
    navigator.clipboard.writeText(EXPLAINER_COPY);
    setCopiedExplainer(true);
    setTimeout(() => setCopiedExplainer(false), 2000);
    toast({ title: "Explainer copy copied!" });
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white font-sans">
      <SEOMeta
        title="Partner Resources | DeliWer Marketing Templates & Messaging"
        description="Copy-paste WhatsApp, email, and social media templates for DeliWer partners. Ready-to-use messages to share with your clients."
      />
      <Navigation />
      <PartnerSubNav />

      <section className="py-16 px-4 max-w-3xl mx-auto space-y-12">

        {/* Header */}
        <div className="text-center space-y-3">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-500/10 border border-emerald-500/20 rounded-full text-emerald-400 text-xs font-black uppercase tracking-widest">
            <BookOpen className="w-3.5 h-3.5" /> Partner Resources
          </div>
          <h1 className="text-3xl md:text-5xl font-black uppercase tracking-tighter text-white leading-[0.9]">
            Marketing Templates
          </h1>
          <p className="text-gray-400 font-medium leading-relaxed max-w-xl mx-auto">
            Copy-paste messages ready to share via WhatsApp, email, Instagram, or Telegram. Just replace [YOUR_LINK] with your referral link.
          </p>
        </div>

        {/* How to use */}
        <Card className="bg-emerald-950/30 border-emerald-500/20 rounded-2xl">
          <CardContent className="p-5 space-y-2">
            <p className="text-emerald-400 font-black uppercase text-xs tracking-widest">Before You Start</p>
            <p className="text-gray-300 text-sm font-medium leading-relaxed">
              Replace <code className="bg-slate-900 px-2 py-0.5 rounded text-emerald-300 text-xs">[YOUR_LINK]</code> with your personal referral link from the{" "}
              <Link href="/partners/join" className="text-emerald-400 underline hover:no-underline">Join page</Link>.
              Your link format: <code className="bg-slate-900 px-2 py-0.5 rounded text-emerald-300 text-xs">https://deliwer.com/?ref=yourname</code>
            </p>
          </CardContent>
        </Card>

        {/* Message templates */}
        <div className="space-y-5">
          {TEMPLATES.map((tpl, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.07 }}
              viewport={{ once: true }}
            >
              <Card className="bg-white/5 border-white/10 rounded-2xl overflow-hidden">
                <CardContent className="p-0">
                  <div className="flex items-center justify-between px-5 pt-5 pb-3">
                    <div className="flex items-center gap-2">
                      <span className="text-lg">{tpl.emoji}</span>
                      <p className="text-white font-black text-sm uppercase tracking-tight">{tpl.channel}</p>
                    </div>
                    <Button
                      size="sm"
                      onClick={() => handleCopy(tpl.text, i)}
                      className="bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg h-8 px-3 font-black text-xs"
                      data-testid={`button-copy-template-${i}`}
                    >
                      {copiedIdx === i ? <Check className="w-3.5 h-3.5 mr-1" /> : <Copy className="w-3.5 h-3.5 mr-1" />}
                      {copiedIdx === i ? "Copied" : "Copy"}
                    </Button>
                  </div>
                  <pre className="px-5 pb-5 text-gray-400 text-xs font-mono leading-relaxed whitespace-pre-wrap bg-slate-900/50 mx-5 rounded-xl mb-5 p-4 border border-white/5">
                    {tpl.text}
                  </pre>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Service explainer copy */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-black uppercase tracking-tight text-white">Service Explainer Copy</h2>
            <Button
              size="sm"
              onClick={handleCopyExplainer}
              className="bg-slate-700 hover:bg-slate-600 text-white rounded-lg h-8 px-3 font-black text-xs"
              data-testid="button-copy-explainer"
            >
              {copiedExplainer ? <Check className="w-3.5 h-3.5 mr-1" /> : <Copy className="w-3.5 h-3.5 mr-1" />}
              {copiedExplainer ? "Copied" : "Copy All"}
            </Button>
          </div>
          <Card className="bg-white/5 border-white/10 rounded-2xl">
            <CardContent className="p-5">
              <pre className="text-gray-400 text-xs font-mono leading-relaxed whitespace-pre-wrap">{EXPLAINER_COPY}</pre>
            </CardContent>
          </Card>
          <p className="text-[10px] text-gray-600 font-bold uppercase tracking-widest">
            Feel free to adapt this for your audience. The key message: tenants pay no extra.
          </p>
        </div>

        {/* WhatsApp Share Quick Link */}
        <Card className="bg-slate-900 border-emerald-500/20 border rounded-2xl">
          <CardContent className="p-6 space-y-4">
            <div className="flex items-center gap-2">
              <MessageCircle className="w-5 h-5 text-emerald-400" />
              <h3 className="text-white font-black uppercase text-sm tracking-tight">Quick WhatsApp Share</h3>
            </div>
            <p className="text-gray-400 text-sm font-medium">
              Send the casual WhatsApp template directly. Remember to paste your referral link from the Join page.
            </p>
            <a
              href={`https://wa.me/?text=${encodeURIComponent("Moving into a new place in Dubai? 🏠\n\nDeliWer coordinates movers, Ejari registration, DEWA setup and more. It doesn't cost extra — they simply organize everything for you.\n\nMy referral link: [YOUR_LINK]\n\nOne WhatsApp contact manages everything. Stress-free move-in!")}`}
              target="_blank"
              rel="noreferrer"
              data-testid="link-whatsapp-share"
            >
              <Button className="bg-emerald-600 hover:bg-emerald-500 text-white font-black rounded-xl h-11 px-6 text-xs uppercase tracking-widest">
                <MessageCircle className="w-4 h-4 mr-2" /> Open in WhatsApp
              </Button>
            </a>
          </CardContent>
        </Card>

        {/* CTA */}
        <div className="text-center space-y-4 pt-4">
          <p className="text-gray-500 text-sm font-medium">Don't have your referral link yet?</p>
          <Link href="/partners/join">
            <Button size="lg" className="bg-emerald-600 hover:bg-emerald-500 text-white font-black rounded-xl h-13 px-10 text-sm uppercase tracking-widest" data-testid="button-join-from-resources">
              Get Your Referral Link <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
}
