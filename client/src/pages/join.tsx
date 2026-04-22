import { useEffect, useMemo, useState } from "react";
import { Link, useLocation } from "wouter";
import { SEOMeta } from "@/components/seo-meta";
import { Navigation } from "@/components/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import {
  CheckCircle2, ArrowRight, Building2, Droplets, MessageCircle,
  Sparkles, ShieldCheck, Users, Gift,
} from "lucide-react";
import { motion } from "framer-motion";
import { captureReferral, buildWhatsAppMessage, openWhatsApp } from "@/lib/referral";

const WA_NUMBER = "971523946311";

function getParam(name: string): string {
  if (typeof window === "undefined") return "";
  const p = new URLSearchParams(window.location.search);
  return p.get(name) || "";
}

function prettyName(raw: string): string {
  if (!raw) return "";
  return raw
    .replace(/[-_+]/g, " ")
    .replace(/\s+/g, " ")
    .trim()
    .split(" ")
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase())
    .join(" ");
}

export default function JoinPage() {
  const [, navigate] = useLocation();
  const [refCode, setRefCode] = useState("");
  const [refName, setRefName] = useState("");
  const [team, setTeam] = useState("");
  const [channel, setChannel] = useState("");
  const [trackParam, setTrackParam] = useState("");

  const [refereeName, setRefereeName] = useState("");
  const [refereeWhatsApp, setRefereeWhatsApp] = useState("");
  const [interest, setInterest] = useState<"broker" | "aquacafe" | "move-in" | "">("");

  useEffect(() => {
    captureReferral();
    const code = getParam("ref") || getParam("partner") || getParam("agent");
    setRefCode(code);
    setRefName(prettyName(getParam("refName") || getParam("from")));
    setTeam(getParam("team") || getParam("utm_campaign"));
    setChannel(getParam("utm_source") || getParam("src"));
    const t = getParam("track");
    setTrackParam(t);
    if (t === "broker" || t === "aquacafe") setInterest(t);
  }, []);

  const welcomeName = refName || (refCode ? prettyName(refCode) : "");

  const handleSubmit = () => {
    const intro = interest === "aquacafe"
      ? `Hi DeliWer! I was referred by ${welcomeName || refCode || "a partner"} and I want to join the *AquaCafe / Home Services* network.`
      : interest === "move-in"
      ? `Hi DeliWer! I was referred by ${welcomeName || refCode || "a partner"} and I need help with my Dubai *Move-In* (Ejari, DEWA, movers, setup).`
      : `Hi DeliWer! I was referred by ${welcomeName || refCode || "a partner"} and I want to join as a *Broker Partner*.`;

    const msg = buildWhatsAppMessage({
      intro,
      fields: {
        "Referee Name": refereeName,
        "Referee WhatsApp": refereeWhatsApp,
        Interest: interest || "Not specified",
      },
    });
    openWhatsApp(msg);
  };

  const continueTo = (path: string) => {
    // Preserve attribution in the next page so all downstream forms keep credit
    const qs = new URLSearchParams();
    if (refCode) qs.set("ref", refCode);
    if (refName) qs.set("refName", refName);
    if (team) qs.set("team", team);
    if (channel) qs.set("utm_source", channel);
    if (trackParam) qs.set("track", trackParam);
    const tail = qs.toString();
    navigate(tail ? `${path}?${tail}` : path);
  };

  const headline = useMemo(() => {
    if (welcomeName) return `Welcome, ${refereeName ? prettyName(refereeName) : "friend"} — ${welcomeName} sent you.`;
    return "Welcome to DeliWer.";
  }, [welcomeName, refereeName]);

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <SEOMeta
        title="You're Invited — Join DeliWer Dubai"
        description="A trusted DeliWer partner referred you. Activate your move-in services or join the partner network with verified attribution."
      />
      <Navigation />

      {/* Hero */}
      <section className="relative pt-24 pb-12 px-4 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-950/40 via-slate-950 to-slate-950 pointer-events-none" />
        <div className="absolute top-10 left-1/3 w-[500px] h-[300px] bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative max-w-3xl mx-auto text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            {welcomeName ? (
              <div className="inline-flex items-center gap-2 bg-emerald-500/15 border border-emerald-500/40 rounded-full px-5 py-2 mb-6">
                <Sparkles className="w-4 h-4 text-emerald-400" />
                <span className="text-emerald-300 font-black text-xs uppercase tracking-widest">
                  Personal Invitation
                </span>
              </div>
            ) : (
              <div className="inline-flex items-center gap-2 bg-slate-800 border border-slate-700 rounded-full px-5 py-2 mb-6">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                <span className="text-gray-300 font-black text-xs uppercase tracking-widest">Verified Network</span>
              </div>
            )}

            <h1 className="text-4xl md:text-6xl font-black uppercase tracking-tighter leading-none mb-5">
              {welcomeName ? (
                <>
                  <span className="text-white">{refereeName ? `Hi ${prettyName(refereeName)},` : "You were referred by"}</span>
                  <br />
                  <span className="bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent">
                    {welcomeName}
                  </span>
                </>
              ) : (
                <>Join the <span className="text-emerald-400">DeliWer</span> Network</>
              )}
            </h1>

            <p className="text-lg text-gray-300 max-w-xl mx-auto mb-2 leading-relaxed">
              {welcomeName
                ? `${welcomeName} invited you to DeliWer — Dubai's trusted move-in & home services concierge. Pick how you'd like to start below.`
                : "Pick how you'd like to start with DeliWer below — your selection will be activated within the same business day."}
            </p>

            {/* Attribution chips */}
            {(refCode || team || channel) && (
              <div className="flex flex-wrap justify-center gap-2 mt-6">
                {refCode && (
                  <span data-testid="chip-ref-code" className="text-[10px] font-black uppercase tracking-widest bg-emerald-500/15 text-emerald-300 border border-emerald-500/40 rounded-full px-3 py-1">
                    Referrer: {welcomeName || refCode}
                  </span>
                )}
                {team && (
                  <span data-testid="chip-team" className="text-[10px] font-black uppercase tracking-widest bg-cyan-500/15 text-cyan-300 border border-cyan-500/40 rounded-full px-3 py-1">
                    Team: {prettyName(team)}
                  </span>
                )}
                {channel && (
                  <span data-testid="chip-channel" className="text-[10px] font-black uppercase tracking-widest bg-purple-500/15 text-purple-300 border border-purple-500/40 rounded-full px-3 py-1">
                    Source: {channel}
                  </span>
                )}
              </div>
            )}
          </motion.div>
        </div>
      </section>

      {/* Choice cards */}
      <section className="py-10 px-4">
        <div className="max-w-5xl mx-auto grid md:grid-cols-3 gap-5">
          {[
            {
              id: "move-in" as const,
              title: "I'm Moving In",
              tagline: "Ejari, DEWA, movers & setup",
              icon: Building2,
              accent: "amber",
              cta: "Activate My Move-In",
              path: "/move-in-services",
            },
            {
              id: "broker" as const,
              title: "Join as Broker",
              tagline: "Earn AED 150–800 per move-in",
              icon: Users,
              accent: "emerald",
              cta: "Get My Broker Link",
              path: "/brokers",
            },
            {
              id: "aquacafe" as const,
              title: "Home Services / AquaCafe",
              tagline: "Worldwide water income",
              icon: Droplets,
              accent: "cyan",
              cta: "See Home Services",
              path: "/home-services",
            },
          ].map(({ id, title, tagline, icon: Icon, accent, cta, path }) => {
            const selected = interest === id;
            const ring =
              accent === "emerald" ? "border-emerald-500 bg-emerald-500/10" :
              accent === "cyan" ? "border-cyan-500 bg-cyan-500/10" :
              "border-amber-500 bg-amber-500/10";
            const iconC =
              accent === "emerald" ? "text-emerald-400" :
              accent === "cyan" ? "text-cyan-400" :
              "text-amber-400";
            return (
              <button
                key={id}
                data-testid={`card-interest-${id}`}
                onClick={() => setInterest(id)}
                className={`text-left rounded-2xl p-6 border-2 transition-all ${
                  selected ? ring : "border-slate-700 bg-slate-900 hover:border-slate-500"
                }`}
              >
                <Icon className={`w-8 h-8 mb-3 ${iconC}`} />
                <div className="font-black text-white text-base mb-1">{title}</div>
                <div className="text-gray-400 text-sm mb-4">{tagline}</div>
                <div className="flex items-center justify-between">
                  <span
                    onClick={(e) => { e.stopPropagation(); continueTo(path); }}
                    className={`text-xs font-black uppercase tracking-widest ${iconC} hover:underline cursor-pointer`}
                    data-testid={`link-continue-${id}`}
                  >
                    {cta} →
                  </span>
                  {selected && <CheckCircle2 className={`w-5 h-5 ${iconC}`} />}
                </div>
              </button>
            );
          })}
        </div>
      </section>

      {/* Quick WhatsApp form (attribution baked in) */}
      <section className="pb-20 px-4">
        <div className="max-w-2xl mx-auto bg-slate-900 border border-slate-700 rounded-3xl p-7">
          <div className="flex items-center gap-3 mb-5">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/15 border border-emerald-500/40 flex items-center justify-center">
              <Gift className="w-5 h-5 text-emerald-400" />
            </div>
            <div>
              <h2 className="text-xl font-black text-white">Claim Your Welcome</h2>
              <p className="text-gray-400 text-xs">
                {welcomeName ? `${welcomeName} will be credited as your referrer.` : "Your details go straight to our concierge team."}
              </p>
            </div>
          </div>

          <div className="grid sm:grid-cols-2 gap-4 mb-5">
            <div className="space-y-2">
              <Label className="text-[10px] font-black uppercase tracking-widest text-gray-400">Your Name *</Label>
              <Input
                data-testid="input-referee-name"
                value={refereeName}
                onChange={(e) => setRefereeName(e.target.value)}
                placeholder="Full name"
                className="bg-slate-800 border-slate-600 text-white placeholder:text-gray-600 rounded-xl h-11"
              />
            </div>
            <div className="space-y-2">
              <Label className="text-[10px] font-black uppercase tracking-widest text-gray-400">WhatsApp *</Label>
              <Input
                data-testid="input-referee-whatsapp"
                value={refereeWhatsApp}
                onChange={(e) => setRefereeWhatsApp(e.target.value)}
                placeholder="+971 / any country"
                className="bg-slate-800 border-slate-600 text-white placeholder:text-gray-600 rounded-xl h-11"
              />
            </div>
          </div>

          {/* Attribution preview */}
          <div className="bg-slate-800/60 rounded-2xl p-4 border border-slate-700 mb-5">
            <p className="text-[10px] font-black uppercase tracking-widest text-gray-500 mb-2">Attribution preview</p>
            <ul className="text-sm space-y-1">
              <li className="text-gray-300">
                <span className="text-gray-500">Referrer:</span>{" "}
                <span className="text-emerald-400 font-mono">{welcomeName || refCode || "— direct visit —"}</span>
              </li>
              {refCode && <li className="text-gray-300"><span className="text-gray-500">Code:</span> <span className="text-emerald-400 font-mono">{refCode}</span></li>}
              {team && <li className="text-gray-300"><span className="text-gray-500">Team:</span> <span className="text-cyan-400 font-mono">{prettyName(team)}</span></li>}
              {channel && <li className="text-gray-300"><span className="text-gray-500">Channel:</span> <span className="text-purple-400 font-mono">{channel}</span></li>}
              <li className="text-gray-300">
                <span className="text-gray-500">Interest:</span>{" "}
                <span className="text-white font-mono">{interest || "Not selected"}</span>
              </li>
            </ul>
          </div>

          <Button
            data-testid="button-submit-referee"
            onClick={handleSubmit}
            disabled={!refereeName || !refereeWhatsApp || !interest}
            size="lg"
            className="w-full bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 font-black h-14 text-base rounded-2xl"
          >
            <MessageCircle className="w-5 h-5 mr-2" /> Continue on WhatsApp
            <ArrowRight className="w-5 h-5 ml-2" />
          </Button>
          <p className="text-[10px] text-gray-600 text-center mt-3">
            Your referrer is credited automatically — same business day activation.
          </p>
        </div>
      </section>
    </div>
  );
}
