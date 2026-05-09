import { useEffect, useState, useMemo } from "react";
import { Link } from "wouter";
import { useQuery } from "@tanstack/react-query";
import { fetchSheetData, buildWhatsAppURL, DEMO_LEADS } from "@/lib/marketing-tracker";
import { BrokerAccessBanner, StickyBrokerWhatsApp } from "@/components/marketing/broker-enhancement-bar";
import { MarketingSubNav } from "@/components/marketing/marketing-subnav";
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell,
} from "recharts";

const UTM_COLORS = ["#10b981", "#3b82f6", "#f59e0b", "#8b5cf6", "#ef4444", "#06b6d4", "#f97316"];
const FUNNEL_LABELS: Record<string, string> = {
  trust_strip_click: "Trust Strip Click",
  partners_broker_auto_scroll: "Partners Auto-scroll",
  partners_broker_cta: "Partners CTA",
  academy_join_cta: "Academy Join CTA",
  brokers_page_view: "Brokers Page View",
  stage_selected: "Stage Selected",
  stage_whatsapp: "Stage WhatsApp",
  funnel_submitted: "Form Submitted",
  funnel_goto_brokers: "Go to Brokers CTA",
  urgency_get_slot: "Urgency Get Slot",
};

export default function FounderControl() {
  const [leads, setLeads] = useState<any[]>([]);
  const [view, setView] = useState<"overview" | "leads" | "partners" | "funnel">("overview");
  const [filter, setFilter] = useState("all");

  const { data: funnelReport, isLoading: funnelLoading } = useQuery<any>({
    queryKey: ["/api/broker/funnel-report"],
    refetchInterval: 30000,
  });

  useEffect(() => {
    document.title = "Founder Command Center | DeliWer";
    fetchSheetData().then((data) => {
      setLeads(data.length > 0 ? data : DEMO_LEADS);
    });
  }, []);

  const today = new Date().toISOString().slice(0, 10);

  const stats = useMemo(() => {
    const todayLeads = leads.filter((l) => String(l.timestamp).slice(0, 10) === today);
    const closed = leads.filter((l) => l.status === "Closed");
    const totalRevenue = leads.reduce((s, l) => s + (Number(l.revenue) || 0), 0);
    const totalPartnerShare = leads.reduce((s, l) => s + (Number(l.partnerShare) || 0), 0);
    const partners = new Set(leads.map((l) => l.source).filter((s) => s && s !== "organic"));
    const convRate = leads.length > 0 ? Math.round((closed.length / leads.length) * 100) : 0;
    const revenuePerLead = leads.length > 0 ? Math.round(totalRevenue / leads.length) : 0;
    return {
      todayLeads: todayLeads.length,
      totalLeads: leads.length,
      closed: closed.length,
      convRate,
      totalRevenue,
      totalPartnerShare,
      netRevenue: totalRevenue - totalPartnerShare,
      activePartners: partners.size,
      revenuePerLead,
    };
  }, [leads, today]);

  const partnerBreakdown = useMemo(() => {
    const map: Record<string, { name: string; leads: number; closed: number; revenue: number; partnerShare: number }> = {};
    for (const l of leads) {
      const src = l.source || "organic";
      if (!map[src]) map[src] = { name: src, leads: 0, closed: 0, revenue: 0, partnerShare: 0 };
      map[src].leads++;
      if (l.status === "Closed") map[src].closed++;
      map[src].revenue += Number(l.revenue) || 0;
      map[src].partnerShare += Number(l.partnerShare) || 0;
    }
    return Object.values(map).sort((a, b) => b.leads - a.leads);
  }, [leads]);

  const filteredLeads = useMemo(() => {
    if (filter === "all") return leads;
    return leads.filter((l) => l.status === filter);
  }, [leads, filter]);

  return (
    <div className="min-h-screen bg-[#0a0f1e] text-white font-sans">
      <MarketingSubNav />
      <BrokerAccessBanner compact />
      <div className="sticky top-0 z-50 bg-[#0a0f1e]/95 backdrop-blur border-b border-white/10">
        <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link href="/marketing" className="text-xl font-black tracking-tight hover:text-emerald-400 transition-colors">DELIWER</Link>
            <span className="text-xs bg-red-500/20 text-red-400 px-2 py-0.5 rounded-full border border-red-500/30">🎛️ Founder Control</span>
          </div>
          <nav className="flex items-center gap-1">
            <Link href="/marketing/leaderboard" className="text-xs px-3 py-1.5 rounded-lg text-gray-400 hover:text-white hover:bg-white/10 transition-all">Leaderboard</Link>
            <Link href="/marketing/partners" className="text-xs px-3 py-1.5 rounded-lg text-gray-400 hover:text-white hover:bg-white/10 transition-all">Partners</Link>
          </nav>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="text-2xl font-black">Command Center</h1>
            <p className="text-gray-400 text-sm">Live performance overview — {new Date().toLocaleDateString("en-AE", { weekday: "long", year: "numeric", month: "long", day: "numeric" })}</p>
          </div>
          <a
            href={buildWhatsAppURL("general", "control-center")}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-emerald-500 hover:bg-emerald-400 text-black font-bold px-4 py-2 rounded-lg text-sm transition-all"
            data-testid="button-open-whatsapp"
          >
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
            Open WhatsApp
          </a>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-8">
          {[
            { label: "Leads Today", value: stats.todayLeads, sub: "new enquiries", icon: "📥", color: "text-white" },
            { label: "Total Leads", value: stats.totalLeads, sub: "all time", icon: "👥", color: "text-blue-400" },
            { label: "Conversion Rate", value: `${stats.convRate}%`, sub: `${stats.closed} closed`, icon: "📈", color: "text-emerald-400" },
            { label: "Active Partners", value: stats.activePartners, sub: "unique sources", icon: "🤝", color: "text-amber-400" },
          ].map((s) => (
            <div key={s.label} className="bg-white/5 border border-white/10 rounded-xl p-4" data-testid={`kpi-${s.label.toLowerCase().replace(/\s/g, "-")}`}>
              <div className="text-xl mb-1">{s.icon}</div>
              <div className={`text-2xl font-black ${s.color}`}>{s.value}</div>
              <div className="text-xs font-medium mt-0.5">{s.label}</div>
              <div className="text-xs text-gray-600">{s.sub}</div>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-3 gap-3 mb-8">
          {[
            { label: "Gross Revenue", value: `${stats.totalRevenue.toLocaleString()} AED`, color: "text-white" },
            { label: "Partner Payouts", value: `${stats.totalPartnerShare.toLocaleString()} AED`, color: "text-amber-400" },
            { label: "Net Revenue", value: `${stats.netRevenue.toLocaleString()} AED`, color: "text-emerald-400" },
          ].map((s) => (
            <div key={s.label} className="bg-white/5 border border-white/10 rounded-xl p-4 text-center">
              <div className={`text-xl sm:text-2xl font-black ${s.color}`}>{s.value}</div>
              <div className="text-xs text-gray-500 mt-1">{s.label}</div>
            </div>
          ))}
        </div>

        <div className="flex items-center gap-1 mb-4 border-b border-white/10 pb-1">
          {(["overview", "leads", "partners", "funnel"] as const).map((t) => (
            <button
              key={t}
              onClick={() => setView(t)}
              className={`px-4 py-2 text-sm font-medium capitalize transition-all ${
                view === t ? "text-white border-b-2 border-emerald-500 -mb-px" : "text-gray-500 hover:text-gray-300"
              }`}
              data-testid={`tab-${t}`}
            >
              {t === "funnel" ? "Broker Funnel" : t}
            </button>
          ))}
        </div>

        {view === "overview" && (
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-white/5 border border-white/10 rounded-2xl p-5">
              <h3 className="font-bold text-sm mb-4">Lead Status Breakdown</h3>
              {(["New", "Contacted", "Closed"] as const).map((status) => {
                const count = leads.filter((l) => l.status === status).length;
                const pct = leads.length > 0 ? Math.round((count / leads.length) * 100) : 0;
                return (
                  <div key={status} className="mb-3" data-testid={`status-bar-${status.toLowerCase()}`}>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-gray-400">{status}</span>
                      <span className="font-semibold">{count} ({pct}%)</span>
                    </div>
                    <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                      <div
                        className={`h-full rounded-full transition-all ${
                          status === "Closed" ? "bg-emerald-500" :
                          status === "Contacted" ? "bg-blue-500" : "bg-gray-500"
                        }`}
                        style={{ width: `${pct}%` }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="bg-white/5 border border-white/10 rounded-2xl p-5">
              <h3 className="font-bold text-sm mb-4">Intent Breakdown</h3>
              {["move", "renew", "exit", "ejari", "dewa"].map((intent) => {
                const count = leads.filter((l) => l.intent === intent).length;
                const pct = leads.length > 0 ? Math.round((count / leads.length) * 100) : 0;
                const icons: Record<string, string> = { move: "🏠", renew: "🔄", exit: "🚪", ejari: "📄", dewa: "⚡" };
                return count > 0 ? (
                  <div key={intent} className="flex items-center gap-3 mb-2" data-testid={`intent-${intent}`}>
                    <span className="text-base">{icons[intent]}</span>
                    <div className="flex-1">
                      <div className="h-1.5 bg-white/10 rounded-full overflow-hidden">
                        <div className="h-full bg-blue-500 rounded-full" style={{ width: `${pct}%` }} />
                      </div>
                    </div>
                    <span className="text-xs text-gray-400 w-20 text-right capitalize">{intent} — {count}</span>
                  </div>
                ) : null;
              })}
            </div>
          </div>
        )}

        {view === "leads" && (
          <div className="bg-white/5 border border-white/10 rounded-2xl overflow-hidden">
            <div className="px-5 py-4 border-b border-white/10 flex items-center gap-2 flex-wrap">
              {["all", "New", "Contacted", "Closed"].map((f) => (
                <button
                  key={f}
                  onClick={() => setFilter(f)}
                  className={`text-xs px-3 py-1.5 rounded-lg transition-all ${
                    filter === f ? "bg-emerald-500 text-black font-semibold" : "bg-white/5 text-gray-400 hover:text-white border border-white/10"
                  }`}
                  data-testid={`filter-${f.toLowerCase()}`}
                >
                  {f === "all" ? "All" : f}
                </button>
              ))}
              <span className="ml-auto text-xs text-gray-500">{filteredLeads.length} leads</span>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-white/10">
                    {["Date", "Name", "Phone", "Intent", "Source", "Status", "Revenue"].map((h) => (
                      <th key={h} className="text-left px-4 py-3 text-xs text-gray-500 font-medium">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {filteredLeads.map((lead, i) => (
                    <tr key={i} className="border-b border-white/5 hover:bg-white/3 transition-colors" data-testid={`lead-${i}`}>
                      <td className="px-4 py-3 text-gray-500 text-xs">{String(lead.timestamp).slice(0, 10)}</td>
                      <td className="px-4 py-3 font-medium">{lead.name}</td>
                      <td className="px-4 py-3 text-gray-400 text-xs">{lead.phone}</td>
                      <td className="px-4 py-3 capitalize text-gray-400 text-xs">{lead.intent}</td>
                      <td className="px-4 py-3 text-blue-400 text-xs">{lead.source}</td>
                      <td className="px-4 py-3">
                        <span className={`text-xs px-2 py-0.5 rounded-full border ${
                          lead.status === "Closed" ? "bg-emerald-500/15 text-emerald-400 border-emerald-500/30" :
                          lead.status === "Contacted" ? "bg-blue-500/15 text-blue-400 border-blue-500/30" :
                          "bg-gray-500/15 text-gray-400 border-gray-500/30"
                        }`}>
                          {lead.status}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-amber-400 font-semibold text-xs">
                        {lead.revenue ? `${Number(lead.revenue).toLocaleString()} AED` : "—"}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {view === "partners" && (
          <div className="bg-white/5 border border-white/10 rounded-2xl overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-white/10">
                    {["Partner", "Leads", "Closed", "Conv %", "Revenue", "Their Cut", "Net"].map((h) => (
                      <th key={h} className="text-left px-4 py-3 text-xs text-gray-500 font-medium">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {partnerBreakdown.map((p, i) => (
                    <tr key={p.name} className="border-b border-white/5 hover:bg-white/3 transition-colors" data-testid={`partner-row-${i}`}>
                      <td className="px-4 py-3 font-semibold">{p.name}</td>
                      <td className="px-4 py-3">{p.leads}</td>
                      <td className="px-4 py-3 text-emerald-400">{p.closed}</td>
                      <td className="px-4 py-3 text-blue-400">
                        {p.leads > 0 ? Math.round((p.closed / p.leads) * 100) : 0}%
                      </td>
                      <td className="px-4 py-3 text-white">{p.revenue.toLocaleString()} AED</td>
                      <td className="px-4 py-3 text-amber-400">{p.partnerShare.toLocaleString()} AED</td>
                      <td className="px-4 py-3 text-emerald-400 font-semibold">
                        {(p.revenue - p.partnerShare).toLocaleString()} AED
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {view === "funnel" && (
          <div className="space-y-6">
            {/* Summary KPIs */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {[
                { label: "Total Events", value: funnelReport?.total ?? "—", color: "text-white", icon: "📊" },
                { label: "Unique Sessions", value: funnelReport?.uniqueSessions ?? "—", color: "text-blue-400", icon: "👤" },
                { label: "Form Submissions", value: funnelReport?.byEvent?.funnel_submitted ?? 0, color: "text-emerald-400", icon: "✅" },
                { label: "UTM Sources", value: funnelReport?.utmSourceChart?.length ?? 0, color: "text-amber-400", icon: "🔗" },
              ].map((s) => (
                <div key={s.label} className="bg-white/5 border border-white/10 rounded-xl p-4" data-testid={`funnel-kpi-${s.label.toLowerCase().replace(/\s/g, "-")}`}>
                  <div className="text-xl mb-1">{s.icon}</div>
                  <div className={`text-2xl font-black ${s.color}`}>{funnelLoading ? "…" : s.value}</div>
                  <div className="text-xs font-medium mt-0.5 text-gray-400">{s.label}</div>
                </div>
              ))}
            </div>

            {/* UTM Source Breakdown */}
            <div className="bg-white/5 border border-white/10 rounded-2xl p-5">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-bold text-sm">UTM Source Breakdown</h3>
                <span className="text-xs text-gray-500">Total funnel events by traffic source</span>
              </div>
              {funnelLoading ? (
                <div className="h-48 flex items-center justify-center text-gray-500 text-sm">Loading…</div>
              ) : !funnelReport?.utmSourceChart?.length ? (
                <div className="h-48 flex flex-col items-center justify-center text-gray-500 text-sm gap-2">
                  <span className="text-3xl">📭</span>
                  <span>No funnel events recorded yet.</span>
                  <span className="text-xs text-gray-600">Events are tracked as visitors move through the broker funnel.</span>
                </div>
              ) : (
                <ResponsiveContainer width="100%" height={220}>
                  <BarChart data={funnelReport.utmSourceChart} margin={{ top: 4, right: 8, left: -16, bottom: 4 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.06)" />
                    <XAxis dataKey="source" tick={{ fill: "#9ca3af", fontSize: 11 }} axisLine={false} tickLine={false} />
                    <YAxis tick={{ fill: "#9ca3af", fontSize: 11 }} axisLine={false} tickLine={false} allowDecimals={false} />
                    <Tooltip
                      contentStyle={{ background: "#1e293b", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 8, fontSize: 12 }}
                      labelStyle={{ color: "#fff", fontWeight: 700 }}
                      itemStyle={{ color: "#10b981" }}
                      formatter={(v: number) => [v, "Events"]}
                    />
                    <Bar dataKey="count" radius={[4, 4, 0, 0]} maxBarSize={56}>
                      {funnelReport.utmSourceChart.map((_: any, idx: number) => (
                        <Cell key={idx} fill={UTM_COLORS[idx % UTM_COLORS.length]} />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              )}
            </div>

            {/* Funnel Step Drop-off */}
            <div className="bg-white/5 border border-white/10 rounded-2xl p-5">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-bold text-sm">Broker Funnel Step Analysis</h3>
                <span className="text-xs text-gray-500">Events per stage — identifies drop-off points</span>
              </div>
              {funnelLoading ? (
                <div className="h-48 flex items-center justify-center text-gray-500 text-sm">Loading…</div>
              ) : (
                <div className="space-y-2.5">
                  {(funnelReport?.funnel ?? []).map((step: { step: string; count: number }, i: number) => {
                    const maxCount = Math.max(1, ...((funnelReport?.funnel ?? []).map((s: any) => s.count)));
                    const pct = Math.round((step.count / maxCount) * 100);
                    const label = FUNNEL_LABELS[step.step] ?? step.step;
                    return (
                      <div key={step.step} className="flex items-center gap-3" data-testid={`funnel-step-${i}`}>
                        <span className="text-xs text-gray-500 w-5 text-right font-mono">{i + 1}</span>
                        <div className="flex-1">
                          <div className="flex justify-between text-xs mb-1">
                            <span className="text-gray-300">{label}</span>
                            <span className="font-semibold text-white">{step.count}</span>
                          </div>
                          <div className="h-1.5 bg-white/10 rounded-full overflow-hidden">
                            <div
                              className="h-full rounded-full transition-all duration-500"
                              style={{ width: `${pct}%`, backgroundColor: UTM_COLORS[i % UTM_COLORS.length] }}
                            />
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>

            {/* Stage Distribution */}
            {funnelReport?.byStage && Object.keys(funnelReport.byStage).length > 0 && (
              <div className="bg-white/5 border border-white/10 rounded-2xl p-5">
                <h3 className="font-bold text-sm mb-4">Career Stage Interest</h3>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {Object.entries(funnelReport.byStage as Record<string, number>)
                    .sort(([, a], [, b]) => b - a)
                    .map(([stage, count], i) => (
                      <div key={stage} className="bg-white/5 border border-white/10 rounded-xl p-3 text-center" data-testid={`stage-dist-${i}`}>
                        <div className="text-xl font-black" style={{ color: UTM_COLORS[i % UTM_COLORS.length] }}>{count}</div>
                        <div className="text-xs text-gray-400 mt-0.5 capitalize">{stage}</div>
                      </div>
                    ))}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
      <StickyBrokerWhatsApp />
    </div>
  );
}
