import { SEOMeta } from "@/components/seo-meta";
import { Navigation } from "@/components/navigation";
import { useEffect, useState } from "react";
import { MessageSquare, Users, MousePointer, TrendingUp, RefreshCw, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";

type DwEvent = { t: string; src: string; ts: number };

function getEvents(): DwEvent[] {
  try { return JSON.parse(localStorage.getItem("dw_events") || "[]"); } catch { return []; }
}

function clearEvents() {
  localStorage.removeItem("dw_events");
  localStorage.removeItem("dw_partners_visits");
}

function fmt(ts: number) {
  return new Date(ts).toLocaleString("en-AE", { timeZone: "Asia/Dubai", hour12: false });
}

export default function SurvivalDashboard() {
  const [events, setEvents] = useState<DwEvent[]>([]);
  const [now, setNow] = useState(Date.now());

  const refresh = () => { setEvents(getEvents()); setNow(Date.now()); };

  useEffect(() => {
    refresh();
    const id = setInterval(refresh, 5000);
    return () => clearInterval(id);
  }, []);

  const waClicks = events.filter(e => e.t === "wa_click");
  const partnerClicks = events.filter(e => e.t === "partners_click");
  const today = new Date(); today.setHours(0, 0, 0, 0);
  const todayWa = waClicks.filter(e => e.ts >= today.getTime());

  const bySrc = waClicks.reduce<Record<string, number>>((acc, e) => {
    acc[e.src] = (acc[e.src] || 0) + 1; return acc;
  }, {});

  return (
    <div className="min-h-screen bg-slate-950 text-white font-sans">
      <SEOMeta title="Survival Dashboard | DeliWer Internal" description="" />
      <Navigation />
      <div className="max-w-4xl mx-auto px-4 pt-28 pb-20 space-y-10">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-black uppercase tracking-tighter text-white">Survival Dashboard</h1>
            <p className="text-gray-500 text-sm font-medium mt-1">WhatsApp clicks · /partners visits · Lead tracking — via localStorage</p>
          </div>
          <div className="flex gap-3">
            <Button size="sm" variant="outline" className="border-white/20 text-white hover:bg-white/5" onClick={refresh}>
              <RefreshCw className="w-4 h-4 mr-2" /> Refresh
            </Button>
            <Button size="sm" variant="outline" className="border-red-500/30 text-red-400 hover:bg-red-500/10" onClick={() => { clearEvents(); refresh(); }}>
              <Trash2 className="w-4 h-4 mr-2" /> Clear
            </Button>
          </div>
        </div>

        {/* STATS */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { icon: <MessageSquare className="w-5 h-5 text-emerald-400" />, label: "Total WA Clicks", value: waClicks.length },
            { icon: <TrendingUp className="w-5 h-5 text-emerald-400" />, label: "WA Clicks Today", value: todayWa.length },
            { icon: <Users className="w-5 h-5 text-emerald-400" />, label: "/partners Clicks", value: partnerClicks.length },
            { icon: <MousePointer className="w-5 h-5 text-emerald-400" />, label: "Total Events", value: events.length },
          ].map((stat, i) => (
            <div key={i} className="bg-slate-900 border border-white/8 rounded-2xl p-6 space-y-3">
              <div className="w-10 h-10 bg-emerald-500/10 rounded-xl flex items-center justify-center">{stat.icon}</div>
              <div className="text-3xl font-black text-white">{stat.value}</div>
              <div className="text-gray-500 text-xs font-black uppercase tracking-widest">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* BY SOURCE */}
        {Object.keys(bySrc).length > 0 && (
          <div className="bg-slate-900 border border-white/8 rounded-2xl p-6 space-y-4">
            <h2 className="font-black text-white uppercase tracking-tight">WhatsApp Clicks by Source</h2>
            <div className="space-y-2">
              {Object.entries(bySrc).sort((a, b) => b[1] - a[1]).map(([src, count]) => (
                <div key={src} className="flex items-center justify-between py-2 border-b border-white/5 last:border-0">
                  <span className="text-gray-300 font-bold text-sm uppercase tracking-wide">{src}</span>
                  <span className="text-emerald-400 font-black text-lg">{count}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* EVENT LOG */}
        <div className="bg-slate-900 border border-white/8 rounded-2xl p-6 space-y-4">
          <h2 className="font-black text-white uppercase tracking-tight">Recent Events</h2>
          {events.length === 0 ? (
            <p className="text-gray-600 font-medium text-sm">No events yet. Events are captured when visitors click WhatsApp buttons or visit /partners.</p>
          ) : (
            <div className="space-y-2 max-h-96 overflow-y-auto">
              {[...events].reverse().map((e, i) => (
                <div key={i} className="flex items-center justify-between py-2 border-b border-white/5 last:border-0 text-sm">
                  <div className="flex items-center gap-3">
                    <span className={`px-2 py-0.5 rounded-full text-xs font-black uppercase ${e.t === "wa_click" ? "bg-emerald-500/15 text-emerald-400" : "bg-blue-500/15 text-blue-400"}`}>{e.t}</span>
                    <span className="text-gray-400 font-medium">{e.src}</span>
                  </div>
                  <span className="text-gray-600 font-medium text-xs">{fmt(e.ts)}</span>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* INSTRUCTIONS */}
        <div className="bg-slate-900/60 border border-white/5 rounded-2xl p-6 space-y-4">
          <h2 className="font-black text-white uppercase tracking-tight text-sm">How Tracking Works</h2>
          <ul className="space-y-2 text-sm text-gray-400 font-medium">
            <li>• Events are stored in <code className="text-emerald-400 bg-white/5 px-1 rounded">localStorage</code> under <code className="text-emerald-400 bg-white/5 px-1 rounded">dw_events</code> — no backend required.</li>
            <li>• Every WhatsApp button click on the homepage, /partners, /move-in-services-dubai, and /relocation-to-dubai-for-founders is captured with its source.</li>
            <li>• /partners page visits are tracked separately under <code className="text-emerald-400 bg-white/5 px-1 rounded">dw_partners_visits</code>.</li>
            <li>• To add Google Analytics: add <code className="text-emerald-400 bg-white/5 px-1 rounded">gtag('event', 'wa_click', &#123; src &#125;)</code> inside each tracking onClick.</li>
            <li>• Max 200 events stored. Dashboard auto-refreshes every 5 seconds.</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
