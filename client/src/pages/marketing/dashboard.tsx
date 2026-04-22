import { useEffect, useState, useMemo } from "react";
import { Link } from "wouter";
import { fetchSheetData, getReferralLink, buildWhatsAppURL } from "@/lib/marketing-tracker";
import { BrokerAccessBanner, StickyBrokerWhatsApp } from "@/components/marketing/broker-enhancement-bar";
import { MarketingSubNav } from "@/components/marketing/marketing-subnav";

export default function PartnerDashboard() {
  const [partnerName, setPartnerName] = useState(localStorage.getItem("dw_partner") || "");
  const [inputName, setInputName] = useState("");
  const [leads, setLeads] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    document.title = "Partner Dashboard | DeliWer Marketing";
    fetchSheetData().then(setLeads);
  }, []);

  const myLeads = useMemo(() => {
    if (!partnerName) return [];
    const slug = partnerName.toLowerCase().replace(/\s+/g, "-");
    return leads.filter((l) => l.source === slug || l.source === partnerName);
  }, [leads, partnerName]);

  const stats = useMemo(() => {
    const total = myLeads.length;
    const closed = myLeads.filter((l) => l.status === "Closed").length;
    const contacted = myLeads.filter((l) => l.status === "Contacted").length;
    const earnings = myLeads.reduce((sum, l) => sum + (Number(l.partnerShare) || 0), 0);
    const convRate = total > 0 ? Math.round((closed / total) * 100) : 0;
    return { total, closed, contacted, earnings, convRate };
  }, [myLeads]);

  function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    if (!inputName.trim()) return;
    localStorage.setItem("dw_partner", inputName.trim());
    setPartnerName(inputName.trim());
  }

  function copyLink() {
    navigator.clipboard.writeText(getReferralLink(partnerName));
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  return (
    <div className="min-h-screen bg-[#0a0f1e] text-white font-sans">
      <MarketingSubNav />
      <BrokerAccessBanner compact />
      <div className="sticky top-0 z-50 bg-[#0a0f1e]/95 backdrop-blur border-b border-white/10">
        <div className="max-w-5xl mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link href="/marketing" className="text-xl font-black tracking-tight hover:text-emerald-400 transition-colors">DELIWER</Link>
            <span className="text-xs bg-blue-500/20 text-blue-400 px-2 py-0.5 rounded-full border border-blue-500/30">Partner Dashboard</span>
          </div>
          <nav className="flex items-center gap-1">
            <Link href="/marketing" className="text-xs px-3 py-1.5 rounded-lg text-gray-400 hover:text-white hover:bg-white/10 transition-all">Hub</Link>
            <Link href="/marketing/leaderboard" className="text-xs px-3 py-1.5 rounded-lg text-gray-400 hover:text-white hover:bg-white/10 transition-all">Leaderboard</Link>
          </nav>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 py-10">
        {!partnerName ? (
          <div className="max-w-md mx-auto">
            <div className="text-center mb-8">
              <h1 className="text-3xl font-black mb-2">Partner Dashboard</h1>
              <p className="text-gray-400">Enter your partner name to view your leads and earnings</p>
            </div>
            <form onSubmit={handleLogin} className="bg-white/5 border border-white/10 rounded-2xl p-6 space-y-4">
              <div>
                <label className="text-xs text-gray-400 mb-1 block">Your Partner Name</label>
                <input
                  type="text"
                  required
                  value={inputName}
                  onChange={(e) => setInputName(e.target.value)}
                  placeholder="e.g. Ali Real Estate"
                  className="w-full bg-white/5 border border-white/15 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-emerald-500/60 transition-colors"
                  data-testid="input-partner-name"
                />
              </div>
              <button
                type="submit"
                className="w-full bg-emerald-500 hover:bg-emerald-400 text-black font-bold py-3 rounded-xl transition-all"
                data-testid="button-view-dashboard"
              >
                View My Dashboard →
              </button>
              <p className="text-center text-xs text-gray-500">No password needed. Your name = your dashboard.</p>
            </form>
          </div>
        ) : (
          <>
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
              <div>
                <h1 className="text-2xl font-black">{partnerName}</h1>
                <p className="text-gray-400 text-sm">Partner Performance Overview</p>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={copyLink}
                  className="flex items-center gap-2 bg-white/10 hover:bg-white/15 border border-white/15 px-4 py-2 rounded-lg text-sm transition-all"
                  data-testid="button-copy-link"
                >
                  {copied ? "✅ Copied!" : "🔗 Copy My Link"}
                </button>
                <button
                  onClick={() => { setPartnerName(""); localStorage.removeItem("dw_partner"); }}
                  className="text-xs text-gray-500 hover:text-white px-3 py-2 transition-colors"
                  data-testid="button-switch-partner"
                >
                  Switch
                </button>
              </div>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
              {[
                { label: "Total Leads", value: stats.total, icon: "👥", color: "text-white" },
                { label: "Closed Deals", value: stats.closed, icon: "✅", color: "text-emerald-400" },
                { label: "Conversion", value: `${stats.convRate}%`, icon: "📈", color: "text-blue-400" },
                { label: "Earnings (AED)", value: stats.earnings.toLocaleString(), icon: "💰", color: "text-amber-400" },
              ].map((stat) => (
                <div key={stat.label} className="bg-white/5 border border-white/10 rounded-xl p-4" data-testid={`stat-${stat.label.toLowerCase().replace(/\s/g, "-")}`}>
                  <div className="text-xl mb-1">{stat.icon}</div>
                  <div className={`text-2xl font-black ${stat.color}`}>{stat.value}</div>
                  <div className="text-xs text-gray-500 mt-0.5">{stat.label}</div>
                </div>
              ))}
            </div>

            <div className="grid md:grid-cols-3 gap-4 mb-8">
              <div className="md:col-span-2 bg-white/5 border border-white/10 rounded-2xl overflow-hidden">
                <div className="px-5 py-4 border-b border-white/10 flex items-center justify-between">
                  <h2 className="font-bold text-sm">Your Leads</h2>
                  <span className="text-xs text-gray-500">{myLeads.length} total</span>
                </div>
                {myLeads.length === 0 ? (
                  <div className="px-5 py-12 text-center">
                    <p className="text-gray-500 text-sm">No leads found for <strong>"{partnerName}"</strong></p>
                    <p className="text-xs text-gray-600 mt-1">Share your link to start earning</p>
                  </div>
                ) : (
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="border-b border-white/10">
                          <th className="text-left px-5 py-3 text-xs text-gray-500 font-medium">Name</th>
                          <th className="text-left px-5 py-3 text-xs text-gray-500 font-medium">Intent</th>
                          <th className="text-left px-5 py-3 text-xs text-gray-500 font-medium">Status</th>
                          <th className="text-right px-5 py-3 text-xs text-gray-500 font-medium">Your Cut</th>
                        </tr>
                      </thead>
                      <tbody>
                        {myLeads.map((lead, i) => (
                          <tr key={i} className="border-b border-white/5 hover:bg-white/3 transition-colors" data-testid={`lead-row-${i}`}>
                            <td className="px-5 py-3 font-medium">{lead.name}</td>
                            <td className="px-5 py-3 capitalize text-gray-400">{lead.intent}</td>
                            <td className="px-5 py-3">
                              <span className={`text-xs px-2 py-0.5 rounded-full border ${
                                lead.status === "Closed" ? "bg-emerald-500/15 text-emerald-400 border-emerald-500/30" :
                                lead.status === "Contacted" ? "bg-blue-500/15 text-blue-400 border-blue-500/30" :
                                "bg-gray-500/15 text-gray-400 border-gray-500/30"
                              }`}>
                                {lead.status}
                              </span>
                            </td>
                            <td className="px-5 py-3 text-right text-amber-400 font-semibold">
                              {lead.partnerShare ? `${Number(lead.partnerShare).toLocaleString()} AED` : "—"}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>

              <div className="space-y-4">
                <div className="bg-emerald-500/10 border border-emerald-500/20 rounded-2xl p-5">
                  <h3 className="font-bold text-emerald-400 text-sm mb-3">Your Referral Link</h3>
                  <code className="text-xs text-gray-300 bg-black/30 px-3 py-2 rounded-lg block mb-3 break-all">
                    {getReferralLink(partnerName)}
                  </code>
                  <button
                    onClick={copyLink}
                    className="w-full bg-emerald-500 hover:bg-emerald-400 text-black font-bold py-2.5 rounded-lg text-sm transition-all"
                    data-testid="button-copy-referral"
                  >
                    {copied ? "✅ Copied!" : "Copy Link"}
                  </button>
                </div>
                <div className="bg-white/5 border border-white/10 rounded-2xl p-5">
                  <h3 className="font-bold text-sm mb-3">Share via WhatsApp</h3>
                  <a
                    href={`https://wa.me/?text=${encodeURIComponent(`🏠 Moving in Dubai? Let DeliWer handle everything — Ejari, DEWA, movers & more.\n\nGet started: ${getReferralLink(partnerName)}`)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 w-full bg-[#25D366]/20 hover:bg-[#25D366]/30 border border-[#25D366]/30 text-[#25D366] font-semibold py-2.5 px-4 rounded-lg text-sm transition-all"
                    data-testid="button-share-whatsapp"
                  >
                    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
                    Share Now
                  </a>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
      <StickyBrokerWhatsApp />
    </div>
  );
}
