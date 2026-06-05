import { useState } from "react";
import {
  Shield, Lock, Unlock, Gavel, Package, Users, BarChart3, Mail, Database,
  Settings, BellRing, Megaphone, LayoutGrid, UserCheck, Building2, Globe,
  TrendingUp, ShoppingCart, FileCheck, Truck, ChevronRight, LogOut,
  Layers, Zap, Eye, Map, Star, CreditCard, Radio, AlertCircle
} from "lucide-react";
import { useLocation } from "wouter";

const SESSION_KEY = "dw_founder_auth";

// ── DeliWer Admin Links ────────────────────────────────────────────────────────
const DELIWER_LINKS = [
  { href: "/marketing",              label: "Marketing Hub",       icon: Megaphone,   color: "violet",  desc: "Campaign dashboard & funnels" },
  { href: "/marketing/tenant-leads", label: "Tenant Leads",        icon: TrendingUp,  color: "purple",  desc: "Lead pipeline & capture" },
  { href: "/partner-dashboard",      label: "Partner Dashboard",   icon: LayoutGrid,  color: "indigo",  desc: "Broker & affiliate metrics" },
  { href: "/admin/brokers",          label: "Broker Admin",        icon: UserCheck,   color: "blue",    desc: "RERA broker management" },
  { href: "/broker-master-db",       label: "Broker Master DB",    icon: Database,    color: "sky",     desc: "Full broker record store" },
  { href: "/sendgrid-dashboard",     label: "Email Campaigns",     icon: Mail,        color: "cyan",    desc: "SendGrid sequences & stats" },
  { href: "/habtoor-admin",          label: "Habtoor Admin",       icon: Building2,   color: "amber",   desc: "Al Habtoor inventory & NDA" },
  { href: "/admin/alerts",           label: "Alert System",        icon: BellRing,    color: "orange",  desc: "Missed calls & notifications" },
  { href: "/capture-admin",          label: "Capture Admin",       icon: Radio,       color: "emerald", desc: "Visitor capture & sniffers" },
  { href: "/operations",             label: "Operations",          icon: Settings,    color: "slate",   desc: "Internal ops & scheduling" },
  { href: "/investor-dashboard",     label: "Investor Dashboard",  icon: BarChart3,   color: "violet",  desc: "Metrics & financial summary" },
  { href: "/mission-control-saqi-kawthar", label: "Mission Control", icon: Star,      color: "amber",   desc: "Saqi Al-Kawthar mission ops" },
  { href: "/admin/flex-rentals",     label: "Flex Admin",          icon: Map,         color: "blue",    desc: "Flex living inventory" },
  { href: "/admin/mamzar",           label: "Mamzar Admin",        icon: Eye,         color: "purple",  desc: "Mamzar Alef Linar EOI" },
] as const;

// ── ChainTrack Admin Links ─────────────────────────────────────────────────────
const CHAINTRACK_LINKS = [
  { href: "/admin/reverse-auction",  label: "Auction Admin",       icon: Gavel,       color: "orange",  desc: "Live reverse auction control" },
  { href: "/admin/wsc",             label: "WSC Admin",            icon: Package,     color: "blue",    desc: "WeSellCellular supplier feed" },
  { href: "/buy",                   label: "Buy Portal",           icon: ShoppingCart,color: "emerald", desc: "buy.chaintrack.com buyer mgmt" },
  { href: "/buy/demo",              label: "Demo Portal",          icon: Zap,         color: "amber",   desc: "No-auth sandbox walkthrough" },
  { href: "/buy/reverse-auction",   label: "Live Auction Page",    icon: TrendingUp,  color: "cyan",    desc: "Active buyer-facing auction" },
  { href: "/chaintrack",            label: "ChainTrack Info",      icon: Globe,       color: "sky",     desc: "Public marketing page" },
  { href: "/chaintrack-grading",    label: "Grading Page",         icon: FileCheck,   color: "purple",  desc: "Grading infrastructure page" },
  { href: "/chaintrack-sourcing",   label: "Sourcing Page",        icon: Layers,      color: "violet",  desc: "Remote sourcing marketplace" },
  { href: "/freight-broker",        label: "Freight Broker",       icon: Truck,       color: "indigo",  desc: "Logistics broker network" },
  { href: "/partners",              label: "Partners Page",        icon: Users,       color: "emerald", desc: "Broker & flipper programme" },
] as const;

type ColorKey = "violet" | "purple" | "indigo" | "blue" | "sky" | "cyan" | "amber" | "orange" | "emerald" | "slate";

const COLOR: Record<ColorKey, { card: string; icon: string; label: string }> = {
  violet:  { card: "border-violet-500/25 hover:border-violet-500/50 hover:bg-violet-500/5",  icon: "text-violet-400",  label: "text-violet-300" },
  purple:  { card: "border-purple-500/25 hover:border-purple-500/50 hover:bg-purple-500/5",  icon: "text-purple-400",  label: "text-purple-300" },
  indigo:  { card: "border-indigo-500/25 hover:border-indigo-500/50 hover:bg-indigo-500/5",  icon: "text-indigo-400",  label: "text-indigo-300" },
  blue:    { card: "border-blue-500/25   hover:border-blue-500/50   hover:bg-blue-500/5",    icon: "text-blue-400",    label: "text-blue-300" },
  sky:     { card: "border-sky-500/25    hover:border-sky-500/50    hover:bg-sky-500/5",     icon: "text-sky-400",     label: "text-sky-300" },
  cyan:    { card: "border-cyan-500/25   hover:border-cyan-500/50   hover:bg-cyan-500/5",    icon: "text-cyan-400",    label: "text-cyan-300" },
  amber:   { card: "border-amber-500/25  hover:border-amber-500/50  hover:bg-amber-500/5",   icon: "text-amber-400",   label: "text-amber-300" },
  orange:  { card: "border-orange-500/25 hover:border-orange-500/50 hover:bg-orange-500/5",  icon: "text-orange-400",  label: "text-orange-300" },
  emerald: { card: "border-emerald-500/25 hover:border-emerald-500/50 hover:bg-emerald-500/5", icon: "text-emerald-400", label: "text-emerald-300" },
  slate:   { card: "border-slate-500/25  hover:border-slate-500/50  hover:bg-slate-500/5",   icon: "text-slate-400",   label: "text-slate-300" },
};

function LinkCard({ href, label, icon: Icon, color, desc }: { href: string; label: string; icon: any; color: ColorKey; desc: string }) {
  const c = COLOR[color] ?? COLOR.slate;
  return (
    <a href={href} data-testid={`founder-link-${label.toLowerCase().replace(/\s+/g, "-")}`}
      className={`group flex flex-col gap-2 rounded-xl border bg-white/[0.02] p-3.5 transition-all cursor-pointer ${c.card}`}>
      <Icon className={`w-4.5 h-4.5 ${c.icon} shrink-0`} />
      <div className="font-black text-white text-xs leading-tight">{label}</div>
      <div className="text-[10px] text-slate-500 leading-snug group-hover:text-slate-400 transition-colors">{desc}</div>
      <ChevronRight className="w-3 h-3 text-slate-700 group-hover:text-slate-400 transition-colors ml-auto -mt-1" />
    </a>
  );
}

export default function FounderControlPage() {
  const [, navigate] = useLocation();
  const [section, setSection] = useState<"deliwer" | "chaintrack">("deliwer");

  const lock = () => {
    sessionStorage.removeItem(SESSION_KEY);
    navigate("/");
  };

  return (
    <div className="min-h-screen text-white" style={{ background: "#04060f" }}>
      {/* Header */}
      <header className="sticky top-0 z-40 border-b border-white/6" style={{ background: "rgba(4,6,15,0.96)", backdropFilter: "blur(12px)" }}>
        <div className="max-w-7xl mx-auto px-5 h-14 flex items-center gap-4">
          <div className="flex items-center gap-2.5">
            <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-violet-600 to-purple-700 flex items-center justify-center">
              <Shield className="w-3.5 h-3.5 text-white" />
            </div>
            <div>
              <span className="text-[9px] font-black uppercase tracking-[0.2em] text-white/40">Founder</span>
              <div className="text-white font-black text-sm leading-tight -mt-0.5">Control Room</div>
            </div>
          </div>

          <div className="flex items-center gap-1 ml-4 p-1 rounded-xl border border-white/8 bg-white/3">
            {(["deliwer", "chaintrack"] as const).map(s => (
              <button key={s} onClick={() => setSection(s)} data-testid={`tab-${s}`}
                className={`px-4 py-1.5 rounded-lg text-[10px] font-black uppercase tracking-widest transition-all ${
                  section === s
                    ? s === "deliwer" ? "bg-orange-500/80 text-white" : "bg-orange-500 text-white"
                    : "text-white/30 hover:text-white/60"
                }`}>
                {s === "deliwer" ? "🟠 DeliWer" : "🔗 ChainTrack"}
              </button>
            ))}
          </div>

          <div className="ml-auto flex items-center gap-2">
            <div className="hidden sm:flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-emerald-500/10 border border-emerald-500/20">
              <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-[9px] font-black uppercase tracking-widest text-emerald-400">Session Active</span>
            </div>
            <button onClick={lock} data-testid="button-lock-founder"
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-red-900/40 text-red-500/60 hover:text-red-400 hover:border-red-500/40 hover:bg-red-500/8 transition-all text-[9px] font-black uppercase tracking-widest">
              <Lock className="w-3 h-3" /> Lock & Exit
            </button>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-5 py-8">
        {section === "deliwer" ? (
          <div>
            {/* DeliWer Section Header */}
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-xl bg-orange-500/20 border border-orange-500/30 flex items-center justify-center">
                <span className="text-xl">🟠</span>
              </div>
              <div>
                <div className="text-[9px] font-black uppercase tracking-widest text-orange-400/60 mb-0.5">DeliWer Relocations</div>
                <h1 className="text-white font-black text-xl">DeliWer Admin</h1>
                <p className="text-slate-500 text-xs">Marketing · Brokers · Operations · Investor</p>
              </div>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3">
              {DELIWER_LINKS.map(l => (
                <LinkCard key={l.href} href={l.href} label={l.label} icon={l.icon} color={l.color as ColorKey} desc={l.desc} />
              ))}
            </div>

            {/* Quick notes */}
            <div className="mt-8 rounded-xl border border-white/5 bg-white/2 p-4">
              <div className="text-[9px] font-black uppercase tracking-widest text-white/20 mb-3">Session Info</div>
              <div className="grid sm:grid-cols-3 gap-4 text-xs">
                <div><span className="text-slate-600">Password:</span> <span className="text-slate-400 font-mono">deliwer-admin-2026</span></div>
                <div><span className="text-slate-600">Session key:</span> <span className="text-slate-400 font-mono">dw_founder_auth</span></div>
                <div><span className="text-slate-600">Scope:</span> <span className="text-slate-400">All /marketing, /admin, /operations paths</span></div>
              </div>
            </div>
          </div>
        ) : (
          <div>
            {/* ChainTrack Section Header */}
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-xl bg-orange-500/20 border border-orange-500/30 flex items-center justify-center">
                <span className="text-xl">🔗</span>
              </div>
              <div>
                <div className="text-[9px] font-black uppercase tracking-widest text-orange-400/60 mb-0.5">ChainTrack B2B Platform</div>
                <h1 className="text-white font-black text-xl">ChainTrack Admin</h1>
                <p className="text-slate-500 text-xs">Reverse Auction · Buyer Portal · Supplier Feeds</p>
              </div>
            </div>

            {/* Status banner */}
            <div className="rounded-xl border border-amber-500/25 bg-amber-500/5 px-4 py-3 flex items-start gap-2.5 mb-5">
              <AlertCircle className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
              <div className="text-xs text-amber-300/80 leading-relaxed">
                <strong className="text-amber-400">Beta / Pre-production phase.</strong> Buyer authentication and payment rails are active in sandbox mode. Real transactions require production deployment sign-off.
                The demo portal (<code className="font-mono bg-amber-900/30 px-1 rounded">/buy/demo</code>) is fully public — no sign-in required.
              </div>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3">
              {CHAINTRACK_LINKS.map(l => (
                <LinkCard key={l.href} href={l.href} label={l.label} icon={l.icon} color={l.color as ColorKey} desc={l.desc} />
              ))}
            </div>

            {/* Buyer demo credentials */}
            <div className="mt-6 rounded-xl border border-blue-500/20 bg-blue-500/5 p-4">
              <div className="text-[9px] font-black uppercase tracking-widest text-blue-400 mb-3">Demo Buyer Credentials</div>
              <div className="grid sm:grid-cols-3 gap-3 text-xs">
                <div><span className="text-slate-600">Email:</span> <span className="text-blue-300 font-mono">demo@chaintrack.com</span></div>
                <div><span className="text-slate-600">Password:</span> <span className="text-blue-300 font-mono">Demo@ChainTrack2026</span></div>
                <div><span className="text-slate-600">Tier:</span> <span className="text-emerald-400 font-semibold">Verified · KYC approved</span></div>
              </div>
              <div className="mt-2 text-[10px] text-slate-600">
                Pre-seeded with 12 simulated orders · AED 148,500 spend history · metadata flag: isDemoAccount=true
              </div>
            </div>

            {/* ChainTrack session key */}
            <div className="mt-3 rounded-xl border border-white/5 bg-white/2 p-4">
              <div className="text-[9px] font-black uppercase tracking-widest text-white/20 mb-3">ChainTrack Session Keys</div>
              <div className="grid sm:grid-cols-3 gap-4 text-xs">
                <div><span className="text-slate-600">Buyer portal password:</span> <span className="text-slate-400 font-mono">deliwer-admin-2026</span></div>
                <div><span className="text-slate-600">Session key:</span> <span className="text-slate-400 font-mono">buy_founder_auth</span></div>
                <div><span className="text-slate-600">Demo route:</span> <span className="text-slate-400 font-mono">/buy/demo (public)</span></div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
