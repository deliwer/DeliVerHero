import { useState } from "react";
import { Navigation } from "@/components/navigation";
import { SEOMeta } from "@/components/seo-meta";
import { ReferralLinkBar } from "@/components/referral-link-bar";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";
import {
  MessageCircle, Copy, Check, Zap, BookOpen, Users,
  ArrowRight, ChevronDown, ChevronUp, Link as LinkIcon, Star, BarChart3
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Link } from "wouter";

interface Script {
  id: string;
  scenario: string;
  audience: string;
  tag: string;
  tagColor: string;
  message: string;
}

const WHATSAPP_SCRIPTS: Script[] = [
  {
    id: "overpaying",
    scenario: "Check If Tenant Is Overpaying Rent",
    audience: "Any tenant due for renewal",
    tag: "High Intent",
    tagColor: "bg-emerald-500/20 text-emerald-300 border-emerald-500/30",
    message: `Hi [Tenant Name] 👋

Before you renew your lease, did you know there's a free tool that checks if you're overpaying rent in Dubai?

👉 https://deliwer.com/are-you-overpaying-rent-dubai

It takes 2 minutes and could save you thousands annually. Worth checking before signing anything.

— [Your Name]`
  },
  {
    id: "compare",
    scenario: "Before Renewing Rent — Compare Move vs Renew",
    audience: "Tenants with lease ending in 1–3 months",
    tag: "Decision Stage",
    tagColor: "bg-blue-500/20 text-blue-300 border-blue-500/30",
    message: `Hi [Tenant Name] 👋

Your lease is coming up — before you decide to renew, this tool compares what it would actually cost to move to a cheaper apartment vs staying where you are.

👉 https://deliwer.com/move-vs-renew-dubai

Most people are surprised by the results. Takes 2 minutes.

— [Your Name]`
  },
  {
    id: "moving-in",
    scenario: "New Tenant Moving In",
    audience: "Fresh tenants after lease signing",
    tag: "Move-In Ready",
    tagColor: "bg-purple-500/20 text-purple-300 border-purple-500/30",
    message: `Congratulations on your new apartment! 🏠

Moving in Dubai can be overwhelming. DeliWer coordinates everything so you don't have to manage multiple vendors:

✅ Ejari registration
✅ DEWA activation
✅ Professional movers
✅ Deep cleaning
✅ Water filter installation

👉 https://deliwer.com/start

Just tell them what you need and they'll coordinate everything from there.

— [Your Name]`
  },
  {
    id: "leaving",
    scenario: "Tenant Leaving Dubai",
    audience: "Expats at end of contract / exiting UAE",
    tag: "Exit Intent",
    tagColor: "bg-amber-500/20 text-amber-300 border-amber-500/30",
    message: `Leaving Dubai soon? 🌍

DeliWer has a concierge service that coordinates your entire exit — movers, cleaning, Ejari cancellation, utility closures — from just AED 900.

👉 https://deliwer.com/exit-dubai

Saves you a lot of last-minute chaos. Worth looking at.

— [Your Name]`
  },
  {
    id: "ejari",
    scenario: "After Ejari Registration",
    audience: "Tenants who just completed Ejari",
    tag: "Post-Ejari",
    tagColor: "bg-teal-500/20 text-teal-300 border-teal-500/30",
    message: `Great — Ejari is done! ✅

Now the move-in process starts. Most tenants need to set up:
→ DEWA (electricity & water)
→ Professional cleaning
→ Movers
→ Internet connection

DeliWer can coordinate all of this in one request:
👉 https://deliwer.com/move-in-package

Much easier than chasing separate vendors.

— [Your Name]`
  },
  {
    id: "building",
    scenario: "Building Welcome Message (Security / Concierge)",
    audience: "New residents in your building",
    tag: "Building Use",
    tagColor: "bg-slate-500/20 text-slate-300 border-slate-600/30",
    message: `Welcome to [Building Name]! 🏢

As you settle in, if you need help with movers, DEWA setup, cleaning, or Ejari — DeliWer coordinates all of it for Dubai residents.

👉 https://deliwer.com/move-in-package

They're a trusted partner for buildings across Dubai. Just reach out if you need anything.

[Your Name] — [Building Name] Team`
  },
];

const LANDING_PAGES = [
  {
    label: "Rent Overpaying Check",
    url: "/are-you-overpaying-rent-dubai",
    desc: "Best for tenants due for renewal",
    color: "text-emerald-400",
  },
  {
    label: "Move vs Renew Calculator",
    url: "/move-vs-renew-dubai",
    desc: "Decision-stage tenants comparing options",
    color: "text-blue-400",
  },
  {
    label: "Move-In Start",
    url: "/start",
    desc: "New tenants who just signed lease",
    color: "text-purple-400",
  },
  {
    label: "Ejari Registration",
    url: "/ejari-dubai",
    desc: "Tenants who need Ejari setup",
    color: "text-teal-400",
  },
  {
    label: "Full Move-In Package",
    url: "/move-in-package",
    desc: "Tenants needing full service coordination",
    color: "text-amber-400",
  },
  {
    label: "Exit Dubai Concierge",
    url: "/exit-dubai",
    desc: "Tenants leaving the UAE",
    color: "text-red-400",
  },
];

function ScriptCard({ script }: { script: Script }) {
  const [expanded, setExpanded] = useState(false);
  const [copied, setCopied] = useState(false);
  const { toast } = useToast();

  const handleCopy = async () => {
    await navigator.clipboard.writeText(script.message);
    setCopied(true);
    toast({ title: "Script Copied", description: "Ready to paste into WhatsApp." });
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="bg-slate-900 border border-slate-700 rounded-2xl overflow-hidden hover:border-emerald-500/30 transition-all"
      data-testid={`script-card-${script.id}`}
    >
      <button
        className="w-full px-6 py-5 flex items-start gap-4 text-left"
        onClick={() => setExpanded(e => !e)}
        data-testid={`script-toggle-${script.id}`}
      >
        <div className="flex-1 space-y-2">
          <div className="flex flex-wrap items-center gap-2">
            <Badge className={`${script.tagColor} border text-[10px] font-black uppercase tracking-wider px-2 py-0.5`}>
              {script.tag}
            </Badge>
          </div>
          <h3 className="font-black text-white uppercase text-sm leading-snug">{script.scenario}</h3>
          <p className="text-[11px] text-gray-500 font-medium">Best for: {script.audience}</p>
        </div>
        <div className="shrink-0 mt-1 text-gray-500">
          {expanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
        </div>
      </button>

      {expanded && (
        <div className="px-6 pb-6 space-y-4">
          <div className="bg-slate-800 border border-slate-600 rounded-xl p-4">
            <pre className="text-sm text-gray-300 font-sans whitespace-pre-wrap leading-relaxed">
              {script.message}
            </pre>
          </div>
          <div className="flex gap-3">
            <Button
              onClick={handleCopy}
              className="bg-emerald-600 hover:bg-emerald-500 text-white font-black rounded-xl text-sm"
              data-testid={`button-copy-script-${script.id}`}
            >
              {copied ? (
                <><Check className="w-4 h-4 mr-2" />Copied!</>
              ) : (
                <><Copy className="w-4 h-4 mr-2" />Copy Script</>
              )}
            </Button>
            <Button
              variant="outline"
              className="border-slate-600 text-gray-400 hover:bg-slate-700 font-black rounded-xl text-sm"
              onClick={() => window.open("https://wa.me/?text=" + encodeURIComponent(script.message), "_blank")}
              data-testid={`button-whatsapp-script-${script.id}`}
            >
              <MessageCircle className="w-4 h-4 mr-2" />
              Open in WhatsApp
            </Button>
          </div>
        </div>
      )}
    </motion.div>
  );
}

export default function PartnerGrowthKit() {
  const [copiedPage, setCopiedPage] = useState<string | null>(null);
  const { toast } = useToast();

  const handleCopyPage = async (url: string) => {
    const full = `${window.location.origin}${url}`;
    await navigator.clipboard.writeText(full);
    setCopiedPage(url);
    toast({ title: "Link Copied", description: "Ready to share." });
    setTimeout(() => setCopiedPage(null), 2000);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <SEOMeta
        title="Partner Growth Kit | WhatsApp Scripts & Sharing Tools | DeliWer"
        description="Ready-to-send WhatsApp scripts, pre-built landing page links, and messaging templates for DeliWer distribution partners."
      />
      <Navigation />

      {/* Hero */}
      <section className="relative py-24 px-4 overflow-hidden border-b border-white/5">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-950 via-purple-950/10 to-slate-950" />
        <div className="max-w-4xl mx-auto relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="space-y-6"
          >
            <div className="inline-flex items-center gap-2 bg-purple-500/10 border border-purple-500/30 rounded-full px-4 py-2">
              <BookOpen className="w-4 h-4 text-purple-400" />
              <span className="text-purple-300 font-black text-xs uppercase tracking-wider">Partner Growth Kit</span>
            </div>
            <h1 className="text-4xl md:text-6xl font-black uppercase tracking-tighter leading-tight">
              Everything You Need<br />
              <span className="text-purple-400">To Share DeliWer</span>
            </h1>
            <p className="text-gray-400 font-medium max-w-2xl text-lg leading-relaxed">
              You already have the relationships. Use these ready-to-send WhatsApp scripts and landing page links to turn existing conversations into earned commissions.
            </p>

            <div className="flex flex-wrap gap-4 pt-2">
              <div className="flex items-center gap-2 text-sm text-emerald-300 font-bold">
                <Zap className="w-4 h-4" /> Ready-to-send scripts
              </div>
              <div className="flex items-center gap-2 text-sm text-emerald-300 font-bold">
                <LinkIcon className="w-4 h-4" /> Pre-built landing pages
              </div>
              <div className="flex items-center gap-2 text-sm text-emerald-300 font-bold">
                <Users className="w-4 h-4" /> Per-scenario messaging
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Core principle */}
      <section className="py-10 px-4 bg-emerald-950/20 border-b border-emerald-500/10">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-start gap-4">
            <Star className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
            <div>
              <p className="text-emerald-200 font-black text-sm uppercase tracking-wide mb-1">Key Principle</p>
              <p className="text-gray-300 font-medium leading-relaxed">
                You do NOT need to generate new leads. Use your existing tenant conversations, CRM databases, WhatsApp contacts, and in-person interactions. The scripts below are designed to fit naturally into conversations you're already having.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Referral Link Bar — prominent above all scripts */}
      <section className="pb-4 pt-10 px-4">
        <div className="max-w-3xl mx-auto">
          <div className="mb-3 flex items-center gap-2">
            <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
            <p className="text-[10px] font-black uppercase tracking-widest text-emerald-400">
              Step 0 — Get Your Link Before Sending Any Script
            </p>
          </div>
          <ReferralLinkBar label="Copy Your Referral Link First — Add It to Every Script" />
        </div>
      </section>

      {/* WhatsApp Scripts */}
      <section className="py-20 px-4">
        <div className="max-w-3xl mx-auto space-y-8">
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <MessageCircle className="w-5 h-5 text-emerald-400" />
              <h2 className="text-2xl font-black uppercase tracking-tighter text-white">WhatsApp Scripts</h2>
            </div>
            <p className="text-gray-400 font-medium text-sm">
              Each script is written for a specific tenant scenario. Pick the one that matches your conversation, copy it, and send. Replace <span className="text-emerald-400">[bracketed text]</span> with your details.
            </p>
          </div>

          <div className="space-y-4">
            {WHATSAPP_SCRIPTS.map(script => (
              <ScriptCard key={script.id} script={script} />
            ))}
          </div>
        </div>
      </section>

      {/* Landing Pages */}
      <section className="py-20 px-4 bg-slate-900/50 border-y border-white/5">
        <div className="max-w-3xl mx-auto space-y-8">
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <LinkIcon className="w-5 h-5 text-blue-400" />
              <h2 className="text-2xl font-black uppercase tracking-tighter text-white">Pre-Built Landing Pages</h2>
            </div>
            <p className="text-gray-400 font-medium text-sm">
              These pages are optimized for specific tenant situations. Add your referral code (<span className="text-blue-400 font-mono">?ref=yourcode</span>) to the end of any link to track your leads.
            </p>
          </div>

          <div className="space-y-3">
            {LANDING_PAGES.map((pg, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -10 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                className="flex items-center gap-4 bg-slate-900 border border-slate-700 rounded-2xl px-5 py-4 hover:border-blue-500/30 transition-all"
                data-testid={`landing-page-${i}`}
              >
                <div className="flex-1 min-w-0">
                  <p className={`font-black text-sm uppercase ${pg.color}`}>{pg.label}</p>
                  <p className="text-gray-500 text-[11px] font-medium mt-0.5">{pg.desc}</p>
                  <p className="text-gray-600 text-[10px] font-mono mt-1">deliwer.com{pg.url}</p>
                </div>
                <div className="flex gap-2 shrink-0">
                  <Button
                    size="sm"
                    variant="outline"
                    className="border-slate-600 text-gray-400 hover:bg-slate-700 rounded-lg text-xs"
                    onClick={() => handleCopyPage(pg.url)}
                    data-testid={`button-copy-page-${i}`}
                  >
                    {copiedPage === pg.url ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
                  </Button>
                  <Link href={pg.url}>
                    <Button
                      size="sm"
                      className="bg-blue-600 hover:bg-blue-500 text-white rounded-lg text-xs"
                      data-testid={`button-open-page-${i}`}
                    >
                      View <ArrowRight className="w-3 h-3 ml-1" />
                    </Button>
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="bg-blue-950/30 border border-blue-500/20 rounded-2xl p-5 space-y-2">
            <p className="text-[11px] font-black text-blue-400 uppercase tracking-widest">How to add your referral code</p>
            <p className="text-gray-400 text-sm font-medium">
              Take any link above and add <span className="text-blue-300 font-mono">?ref=yourcode</span> at the end. For example:
            </p>
            <p className="text-blue-300 font-mono text-xs bg-slate-900 rounded-lg px-3 py-2 break-all">
              https://deliwer.com/start?ref=johnsmith
            </p>
          </div>
        </div>
      </section>

      {/* Partner Scenarios Quick Guide */}
      <section className="py-20 px-4">
        <div className="max-w-3xl mx-auto space-y-8">
          <div className="space-y-3">
            <h2 className="text-2xl font-black uppercase tracking-tighter text-white">Which Script for Which Situation?</h2>
            <p className="text-gray-400 font-medium text-sm">Quick reference guide for common partner scenarios.</p>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            {[
              {
                situation: "Tenant is renewing lease",
                action: "Send the 'Compare Move vs Renew' or 'Overpaying Rent Check' script",
                color: "border-blue-500/30 bg-blue-950/20"
              },
              {
                situation: "Tenant just signed a new lease",
                action: "Send the 'New Tenant Moving In' script with the /start link",
                color: "border-purple-500/30 bg-purple-950/20"
              },
              {
                situation: "Just completed Ejari for a tenant",
                action: "Send the 'After Ejari Registration' script immediately",
                color: "border-teal-500/30 bg-teal-950/20"
              },
              {
                situation: "Tenant is leaving Dubai",
                action: "Send the 'Tenant Leaving Dubai' script with the /exit-dubai link",
                color: "border-amber-500/30 bg-amber-950/20"
              },
              {
                situation: "Building security / concierge",
                action: "Use the 'Building Welcome Message' for every new resident",
                color: "border-slate-500/30 bg-slate-800/20"
              },
              {
                situation: "Unsure which script to use",
                action: "Default to the 'New Tenant Moving In' script — it works for most situations",
                color: "border-emerald-500/30 bg-emerald-950/20"
              },
            ].map((item, i) => (
              <div key={i} className={`border rounded-2xl p-5 space-y-2 ${item.color}`} data-testid={`scenario-guide-${i}`}>
                <p className="text-[11px] font-black text-gray-500 uppercase tracking-widest">Situation</p>
                <p className="text-white font-bold text-sm">{item.situation}</p>
                <p className="text-[11px] font-black text-gray-500 uppercase tracking-widest pt-1">Action</p>
                <p className="text-gray-300 font-medium text-xs leading-relaxed">{item.action}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 px-4 text-center border-t border-purple-500/10 bg-purple-950/10">
        <div className="max-w-2xl mx-auto space-y-5">
          <h2 className="text-3xl font-black uppercase tracking-tighter text-white">
            "You already have the relationships.<br />
            <span className="text-purple-400">DeliWer helps you unlock their value."</span>
          </h2>
          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
            <Link href="/partner-dashboard">
              <Button size="lg" className="bg-emerald-600 hover:bg-emerald-500 text-white font-black rounded-xl h-12 px-8" data-testid="button-kit-to-dashboard">
                <BarChart3 className="w-4 h-4 mr-2" />
                View My Dashboard
              </Button>
            </Link>
            <Button
              size="lg"
              variant="outline"
              className="border-slate-600 text-gray-300 hover:bg-slate-800 font-black rounded-xl h-12 px-8"
              onClick={() => window.open("https://wa.me/971523906019?text=" + encodeURIComponent("Hi DeliWer, I'd like to get my referral code and join the partner network."), "_blank")}
              data-testid="button-kit-whatsapp"
            >
              <MessageCircle className="w-4 h-4 mr-2" />
              Get My Referral Code
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
