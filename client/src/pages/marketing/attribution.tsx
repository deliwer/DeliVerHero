import { useEffect, useMemo, useState } from "react";
import { Link } from "wouter";
import { SEOMeta } from "@/components/seo-meta";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  Activity, Users, MessageCircle, Link2, RefreshCcw, Download,
  Lock, Search, ArrowLeft, ExternalLink,
} from "lucide-react";

interface Entry {
  ref: string;
  page: string;
  timestamp: string;
  action: "page_visit" | "whatsapp_click" | "link_generated";
  userAgent?: string;
  ip?: string;
}
interface Totals {
  total: number;
  whatsapp: number;
  visits: number;
  links: number;
  byRef: Record<string, number>;
}

const MARKETING_TABS = [
  { href: "/marketing", label: "Hub" },
  { href: "/marketing/dashboard", label: "Dashboard" },
  { href: "/marketing/leaderboard", label: "Leaderboard" },
  { href: "/marketing/partners", label: "Partners" },
  { href: "/marketing/recruit", label: "Recruit" },
  { href: "/marketing/social", label: "Social" },
  { href: "/marketing/control", label: "Control" },
  { href: "/marketing/attribution", label: "Attribution" },
];

export default function AttributionPage() {
  const [entries, setEntries] = useState<Entry[]>([]);
  const [totals, setTotals] = useState<Totals>({ total: 0, whatsapp: 0, visits: 0, links: 0, byRef: {} });
  const [loading, setLoading] = useState(false);
  const [filter, setFilter] = useState<"all" | "page_visit" | "whatsapp_click" | "link_generated">("all");
  const [q, setQ] = useState("");
  const [auto, setAuto] = useState(true);

  const load = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/attribution", { credentials: "same-origin" });
      const data = await res.json();
      setEntries(data.entries || []);
      setTotals(data.totals || { total: 0, whatsapp: 0, visits: 0, links: 0, byRef: {} });
    } catch (_) {}
    setLoading(false);
  };

  useEffect(() => { load(); }, []);
  useEffect(() => {
    if (!auto) return;
    const t = setInterval(load, 8000);
    return () => clearInterval(t);
  }, [auto]);

  const filtered = useMemo(() => {
    return entries.filter((e) => {
      if (filter !== "all" && e.action !== filter) return false;
      if (q) {
        const hay = `${e.ref} ${e.page} ${e.action}`.toLowerCase();
        if (!hay.includes(q.toLowerCase())) return false;
      }
      return true;
    });
  }, [entries, filter, q]);

  const topRefs = useMemo(() => {
    return Object.entries(totals.byRef).sort((a, b) => b[1] - a[1]).slice(0, 8);
  }, [totals]);

  const exportCSV = () => {
    const rows = [
      ["timestamp", "action", "ref", "page", "ip", "userAgent"],
      ...filtered.map((e) => [
        e.timestamp, e.action, e.ref, e.page, e.ip || "", (e.userAgent || "").replace(/"/g, "'"),
      ]),
    ];
    const csv = rows.map((r) => r.map((c) => `"${String(c)}"`).join(",")).join("\n");
    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `attribution-${Date.now()}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const fmt = (ts: string) => {
    try { return new Date(ts).toLocaleString("en-GB", { timeZone: "Asia/Dubai" }); }
    catch { return ts; }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <SEOMeta
        noIndex
        title="Attribution — Founder Console"
        description="Private founder-only attribution feed."
      />

      {/* Founder header */}
      <div className="bg-gradient-to-r from-rose-950/40 via-slate-900 to-slate-900 border-b border-rose-500/30">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <Link href="/marketing">
              <button className="text-gray-400 hover:text-white" data-testid="link-back-marketing">
                <ArrowLeft className="w-5 h-5" />
              </button>
            </Link>
            <Lock className="w-4 h-4 text-rose-400" />
            <span className="text-[10px] font-black uppercase tracking-widest text-rose-300">
              Founder Console · Private · Not Indexed
            </span>
          </div>
          <div className="flex items-center gap-2">
            <Button data-testid="button-refresh" onClick={load} disabled={loading} size="sm" variant="outline" className="border-slate-700 text-gray-300 hover:bg-slate-800">
              <RefreshCcw className={`w-3.5 h-3.5 mr-2 ${loading ? "animate-spin" : ""}`} /> Refresh
            </Button>
            <Button data-testid="button-export" onClick={exportCSV} size="sm" className="bg-emerald-600 hover:bg-emerald-500 font-black">
              <Download className="w-3.5 h-3.5 mr-2" /> Export CSV
            </Button>
          </div>
        </div>

        {/* Marketing sub-nav */}
        <div className="max-w-7xl mx-auto px-4 pb-2 -mt-1">
          <nav className="flex items-center overflow-x-auto no-scrollbar gap-1">
            {MARKETING_TABS.map((t) => {
              const active = typeof window !== "undefined" && window.location.pathname === t.href;
              return (
                <Link key={t.href} href={t.href}>
                  <span
                    data-testid={`tab-${t.label.toLowerCase()}`}
                    className={`px-3 py-1.5 text-[10px] font-black uppercase tracking-widest rounded-lg whitespace-nowrap cursor-pointer transition-all ${
                      active
                        ? "bg-emerald-500/20 text-emerald-300 border border-emerald-500/40"
                        : "text-gray-400 hover:text-white hover:bg-white/5 border border-transparent"
                    }`}
                  >
                    {t.label}
                  </span>
                </Link>
              );
            })}
          </nav>
        </div>
      </div>

      {/* Hero */}
      <section className="max-w-7xl mx-auto px-4 py-8">
        <h1 className="text-3xl md:text-4xl font-black uppercase tracking-tighter">
          Attribution Feed
        </h1>
        <p className="text-gray-400 text-sm mt-1">
          Live referrer events for credit-where-due commission accounting. Auto-refreshes every 8s.
        </p>

        {/* Stat tiles */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-6">
          {[
            { label: "Total Events", value: totals.total, icon: Activity, color: "text-white" },
            { label: "Page Visits", value: totals.visits, icon: Users, color: "text-cyan-400" },
            { label: "WhatsApp Clicks", value: totals.whatsapp, icon: MessageCircle, color: "text-emerald-400" },
            { label: "Links Generated", value: totals.links, icon: Link2, color: "text-purple-400" },
          ].map(({ label, value, icon: Icon, color }) => (
            <div key={label} className="bg-slate-900 border border-slate-800 rounded-2xl p-4" data-testid={`stat-${label.toLowerCase().replace(/\s+/g, "-")}`}>
              <Icon className={`w-4 h-4 ${color} mb-2`} />
              <div className={`text-2xl font-black ${color}`}>{value}</div>
              <div className="text-[10px] text-gray-500 font-semibold uppercase tracking-wider">{label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Top referrers */}
      <section className="max-w-7xl mx-auto px-4 pb-6">
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5">
          <h2 className="text-sm font-black uppercase tracking-widest text-gray-400 mb-3">Top Referrers</h2>
          {topRefs.length === 0 ? (
            <p className="text-gray-600 text-xs">No referral hits yet. Share your link to start tracking.</p>
          ) : (
            <div className="flex flex-wrap gap-2">
              {topRefs.map(([ref, count]) => (
                <Badge key={ref} className="bg-emerald-500/15 text-emerald-300 border-emerald-500/40 font-mono" data-testid={`badge-ref-${ref}`}>
                  {ref} · {count}
                </Badge>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Filters */}
      <section className="max-w-7xl mx-auto px-4 pb-4">
        <div className="flex flex-wrap items-center gap-3">
          <div className="flex items-center gap-2 bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 flex-1 min-w-[220px]">
            <Search className="w-4 h-4 text-gray-500" />
            <Input
              data-testid="input-search"
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Search ref, page, action…"
              className="border-0 bg-transparent h-8 px-0 focus-visible:ring-0"
            />
          </div>
          {(["all", "page_visit", "whatsapp_click", "link_generated"] as const).map((f) => (
            <button
              key={f}
              data-testid={`filter-${f}`}
              onClick={() => setFilter(f)}
              className={`px-3 py-1.5 text-[10px] font-black uppercase tracking-widest rounded-lg transition-all ${
                filter === f ? "bg-emerald-500/20 text-emerald-300 border border-emerald-500/40" : "bg-slate-800 text-gray-400 border border-slate-700 hover:text-white"
              }`}
            >
              {f.replace("_", " ")}
            </button>
          ))}
          <label className="flex items-center gap-2 text-xs text-gray-400">
            <input type="checkbox" checked={auto} onChange={(e) => setAuto(e.target.checked)} data-testid="checkbox-auto" />
            Auto-refresh
          </label>
        </div>
      </section>

      {/* Feed table */}
      <section className="max-w-7xl mx-auto px-4 pb-16">
        <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-slate-800/60 text-[10px] font-black uppercase tracking-widest text-gray-400">
                <tr>
                  <th className="text-left px-4 py-3">Time (Dubai)</th>
                  <th className="text-left px-4 py-3">Action</th>
                  <th className="text-left px-4 py-3">Referrer</th>
                  <th className="text-left px-4 py-3">Page</th>
                  <th className="text-left px-4 py-3">IP</th>
                </tr>
              </thead>
              <tbody>
                {filtered.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="px-4 py-10 text-center text-gray-500 text-xs">
                      No events match the current filters.
                    </td>
                  </tr>
                ) : (
                  filtered.map((e, i) => (
                    <tr key={i} className="border-t border-slate-800 hover:bg-slate-800/40" data-testid={`row-event-${i}`}>
                      <td className="px-4 py-2.5 text-gray-400 text-xs whitespace-nowrap">{fmt(e.timestamp)}</td>
                      <td className="px-4 py-2.5">
                        <span className={`text-[10px] font-black uppercase tracking-widest px-2 py-0.5 rounded-full ${
                          e.action === "whatsapp_click" ? "bg-emerald-500/15 text-emerald-300" :
                          e.action === "link_generated" ? "bg-purple-500/15 text-purple-300" :
                          "bg-cyan-500/15 text-cyan-300"
                        }`}>
                          {e.action.replace("_", " ")}
                        </span>
                      </td>
                      <td className="px-4 py-2.5 font-mono text-emerald-300 text-xs">{e.ref}</td>
                      <td className="px-4 py-2.5 text-gray-300 text-xs">
                        {e.page ? (
                          <a href={e.page} target="_blank" rel="noopener noreferrer" className="hover:text-white inline-flex items-center gap-1">
                            {e.page} <ExternalLink className="w-3 h-3" />
                          </a>
                        ) : "—"}
                      </td>
                      <td className="px-4 py-2.5 text-gray-500 text-xs font-mono">{e.ip || "—"}</td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
        <p className="text-[10px] text-gray-600 text-center mt-3">
          Last {entries.length} events · server-side ring buffer · resets on deploy.
        </p>
      </section>
    </div>
  );
}
