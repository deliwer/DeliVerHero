import { useState, useEffect, useCallback, useRef } from "react";
import { Navigation } from "@/components/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Download, Users, Building2, Mail, Phone, ChevronLeft, ChevronRight, Loader2, X, MessageCircle } from "lucide-react";
import { SEOMeta } from "@/components/seo-meta";

interface Broker {
  n: string;
  r: string;
  c: string;
  e: string;
  p: string;
}

interface BrokerIndex {
  total: number;
  chunks: number;
  chunkSize: number;
  companies: string[];
}

const PAGE_SIZE = 50;

function normalize(str: string) {
  return str.toLowerCase().replace(/\s+/g, " ").trim();
}

export default function BrokerMasterDB() {
  const [index, setIndex] = useState<BrokerIndex | null>(null);
  const [allBrokers, setAllBrokers] = useState<Broker[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadProgress, setLoadProgress] = useState(0);
  const [search, setSearch] = useState("");
  const [companyFilter, setCompanyFilter] = useState("");
  const [page, setPage] = useState(1);
  const searchRef = useRef<HTMLInputElement>(null);

  // Load all chunk files
  useEffect(() => {
    async function loadAll() {
      try {
        const idxRes = await fetch("/data/brokers-index.json");
        const idx: BrokerIndex = await idxRes.json();
        setIndex(idx);

        const allData: Broker[] = [];
        for (let i = 0; i < idx.chunks; i++) {
          const res = await fetch(`/data/brokers-${i}.json`);
          const chunk: Broker[] = await res.json();
          allData.push(...chunk);
          setLoadProgress(Math.round(((i + 1) / idx.chunks) * 100));
        }
        setAllBrokers(allData);
        setLoading(false);
      } catch (e) {
        console.error(e);
        setLoading(false);
      }
    }
    loadAll();
  }, []);

  const filtered = useCallback(() => {
    if (!search && !companyFilter) return allBrokers;
    const s = normalize(search);
    const c = normalize(companyFilter);
    return allBrokers.filter((b) => {
      const matchSearch =
        !s ||
        normalize(b.n).includes(s) ||
        normalize(b.c).includes(s) ||
        normalize(b.e).includes(s) ||
        b.r.includes(s);
      const matchCompany = !c || normalize(b.c).includes(c);
      return matchSearch && matchCompany;
    });
  }, [allBrokers, search, companyFilter]);

  const results = filtered();
  const totalPages = Math.ceil(results.length / PAGE_SIZE);
  const pageData = results.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  function handleSearch(val: string) {
    setSearch(val);
    setPage(1);
  }

  function handleCompany(val: string) {
    setCompanyFilter(val === companyFilter ? "" : val);
    setPage(1);
  }

  function exportCSV() {
    const rows = [["Name", "RERA ID", "Company", "Email", "Phone"]];
    results.forEach((b) =>
      rows.push([b.n, b.r, b.c, b.e, b.p])
    );
    const csv = rows.map((r) => r.map((v) => `"${v}"`).join(",")).join("\n");
    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `deliwer-broker-db-${results.length}.csv`;
    a.click();
  }

  function whatsappBroker(broker: Broker) {
    const phone = broker.p.replace(/\D/g, "");
    const msg = encodeURIComponent(
      `Hi ${broker.n.split(" ")[0]}, I'm reaching out from DeliWer — Dubai's move-in concierge platform. We help your clients with Ejari, DEWA, movers, and cleaning after they sign a lease. You earn AED 150–800+ per referral. Would you like to know more?`
    );
    const num = phone.startsWith("971") ? phone : phone.startsWith("0") ? `971${phone.slice(1)}` : `971${phone}`;
    window.open(`https://wa.me/${num}?text=${msg}`, "_blank");
  }

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <SEOMeta
        title="Broker Master Database | DeliWer Partner Program"
        description="Internal broker directory — Dubai RERA-registered agents for DeliWer partner outreach."
      />
      <Navigation />

      <div className="pt-36 pb-20 px-4 max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-10 space-y-4"
        >
          <div className="flex items-center gap-3">
            <div className="inline-flex items-center gap-2 bg-emerald-500/10 border border-emerald-500/20 rounded-full px-4 py-1.5">
              <Users className="w-3.5 h-3.5 text-emerald-400" />
              <span className="text-emerald-400 font-black text-[10px] uppercase tracking-widest">Internal — Partner Outreach</span>
            </div>
          </div>
          <h1 className="text-5xl font-black uppercase tracking-tighter">
            Broker Master <span className="text-emerald-400">Database</span>
          </h1>
          <p className="text-gray-400 font-medium max-w-xl">
            Dubai RERA-registered real estate agents. Search, filter, and initiate WhatsApp outreach directly from this dashboard.
          </p>

          {/* Stats */}
          {index && (
            <div className="flex flex-wrap gap-4">
              <div className="bg-slate-900/60 border border-white/8 rounded-xl px-5 py-3 flex items-center gap-3">
                <Users className="w-4 h-4 text-emerald-400" />
                <div>
                  <div className="text-xs text-gray-500 uppercase tracking-widest font-black">Total Brokers</div>
                  <div className="text-2xl font-black text-white">{index.total.toLocaleString()}</div>
                </div>
              </div>
              <div className="bg-slate-900/60 border border-white/8 rounded-xl px-5 py-3 flex items-center gap-3">
                <Building2 className="w-4 h-4 text-blue-400" />
                <div>
                  <div className="text-xs text-gray-500 uppercase tracking-widest font-black">Brokerages</div>
                  <div className="text-2xl font-black text-white">{index.companies.length}+</div>
                </div>
              </div>
              {!loading && search || companyFilter ? (
                <div className="bg-slate-900/60 border border-emerald-500/20 rounded-xl px-5 py-3 flex items-center gap-3">
                  <Search className="w-4 h-4 text-emerald-400" />
                  <div>
                    <div className="text-xs text-gray-500 uppercase tracking-widest font-black">Filtered</div>
                    <div className="text-2xl font-black text-emerald-400">{results.length.toLocaleString()}</div>
                  </div>
                </div>
              ) : null}
            </div>
          )}
        </motion.div>

        {/* Loading state */}
        {loading && (
          <div className="flex flex-col items-center justify-center py-32 gap-6">
            <Loader2 className="w-10 h-10 text-emerald-400 animate-spin" />
            <div className="space-y-2 text-center">
              <p className="text-white font-black text-lg">Loading broker database…</p>
              <p className="text-gray-500 text-sm">{loadProgress}% — fetching {index?.total?.toLocaleString() ?? "34,621"} records</p>
            </div>
            <div className="w-64 h-2 bg-slate-800 rounded-full overflow-hidden">
              <div
                className="h-full bg-emerald-500 rounded-full transition-all duration-300"
                style={{ width: `${loadProgress}%` }}
              />
            </div>
          </div>
        )}

        {!loading && (
          <>
            {/* Search & filter bar */}
            <div className="flex flex-col md:flex-row gap-3 mb-6">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                <Input
                  ref={searchRef}
                  value={search}
                  onChange={(e) => handleSearch(e.target.value)}
                  placeholder="Search by name, company, email, or RERA ID…"
                  className="pl-10 h-12 bg-slate-900/60 border-white/10 text-white placeholder:text-gray-500 focus:border-emerald-500/50"
                  data-testid="input-broker-search"
                />
                {search && (
                  <button
                    onClick={() => handleSearch("")}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-white"
                  >
                    <X className="w-4 h-4" />
                  </button>
                )}
              </div>

              <Button
                onClick={exportCSV}
                variant="outline"
                className="border-emerald-500/40 text-emerald-300 hover:bg-emerald-500/10 font-black h-12 px-6 gap-2 uppercase tracking-widest text-xs whitespace-nowrap"
                data-testid="button-export-csv"
              >
                <Download className="w-4 h-4" />
                Export CSV ({results.length.toLocaleString()})
              </Button>
            </div>

            {/* Results count + pagination info */}
            <div className="flex items-center justify-between mb-4">
              <p className="text-gray-500 text-sm font-medium">
                Showing <span className="text-white font-black">{((page - 1) * PAGE_SIZE) + 1}–{Math.min(page * PAGE_SIZE, results.length)}</span> of <span className="text-white font-black">{results.length.toLocaleString()}</span> brokers
                {companyFilter && <span className="text-emerald-400"> · {companyFilter}</span>}
              </p>
              {companyFilter && (
                <button onClick={() => handleCompany("")} className="text-xs text-gray-500 hover:text-white flex items-center gap-1">
                  <X className="w-3 h-3" /> Clear company filter
                </button>
              )}
            </div>

            {/* Table */}
            <div className="bg-slate-900/40 border border-white/8 rounded-2xl overflow-hidden mb-6">
              {/* Table header */}
              <div className="grid grid-cols-[2fr_1fr_2fr_2fr_1fr_auto] gap-4 px-5 py-3 bg-slate-900/80 border-b border-white/8 text-[10px] text-gray-500 font-black uppercase tracking-widest">
                <span>Name</span>
                <span>RERA ID</span>
                <span>Brokerage</span>
                <span>Email</span>
                <span>Phone</span>
                <span>Action</span>
              </div>

              <AnimatePresence mode="wait">
                <motion.div
                  key={`${search}-${companyFilter}-${page}`}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.15 }}
                >
                  {pageData.length === 0 ? (
                    <div className="py-16 text-center text-gray-500">
                      <Search className="w-8 h-8 mx-auto mb-3 opacity-30" />
                      <p className="font-black">No brokers found</p>
                      <p className="text-sm mt-1">Try a different search term</p>
                    </div>
                  ) : (
                    pageData.map((broker, i) => (
                      <div
                        key={`${broker.r}-${i}`}
                        className="grid grid-cols-[2fr_1fr_2fr_2fr_1fr_auto] gap-4 items-center px-5 py-3.5 border-b border-white/5 hover:bg-white/3 transition-colors group"
                        data-testid={`row-broker-${i}`}
                      >
                        <span className="font-black text-white text-sm truncate">{broker.n}</span>
                        <span className="text-gray-400 text-xs font-mono">{broker.r}</span>
                        <button
                          onClick={() => handleCompany(broker.c)}
                          className="text-blue-400 text-xs hover:text-blue-300 text-left truncate transition-colors"
                          title={broker.c}
                          data-testid={`filter-company-${i}`}
                        >
                          {broker.c}
                        </button>
                        <a
                          href={broker.e && broker.e.includes("@") ? `mailto:${broker.e}` : undefined}
                          className="text-gray-400 text-xs hover:text-white truncate flex items-center gap-1.5 transition-colors"
                        >
                          {broker.e && broker.e.includes("@") && <Mail className="w-3 h-3 shrink-0 text-gray-600" />}
                          <span className="truncate">{broker.e}</span>
                        </a>
                        <span className="text-gray-500 text-xs font-mono">{broker.p || "—"}</span>
                        <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                          {broker.p && broker.p.replace(/\D/g, "").length >= 7 && (
                            <button
                              onClick={() => whatsappBroker(broker)}
                              className="w-7 h-7 rounded-lg bg-emerald-600/20 hover:bg-emerald-600/40 border border-emerald-500/30 flex items-center justify-center transition-all"
                              title="Send WhatsApp pitch"
                              data-testid={`whatsapp-broker-${i}`}
                            >
                              <MessageCircle className="w-3.5 h-3.5 text-emerald-400" />
                            </button>
                          )}
                        </div>
                      </div>
                    ))
                  )}
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex items-center justify-center gap-3">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setPage((p) => Math.max(1, p - 1))}
                  disabled={page === 1}
                  className="border-white/10 text-gray-400 hover:text-white hover:border-white/30 h-9 w-9 p-0"
                  data-testid="button-prev-page"
                >
                  <ChevronLeft className="w-4 h-4" />
                </Button>

                {/* Page numbers */}
                <div className="flex items-center gap-1">
                  {Array.from({ length: Math.min(7, totalPages) }, (_, i) => {
                    let p: number;
                    if (totalPages <= 7) {
                      p = i + 1;
                    } else if (page <= 4) {
                      p = i + 1;
                    } else if (page >= totalPages - 3) {
                      p = totalPages - 6 + i;
                    } else {
                      p = page - 3 + i;
                    }
                    return (
                      <button
                        key={p}
                        onClick={() => setPage(p)}
                        className={`w-9 h-9 rounded-lg text-sm font-black transition-all ${
                          p === page
                            ? "bg-emerald-600 text-white"
                            : "text-gray-500 hover:text-white hover:bg-white/5"
                        }`}
                        data-testid={`button-page-${p}`}
                      >
                        {p}
                      </button>
                    );
                  })}
                  {totalPages > 7 && page < totalPages - 3 && (
                    <>
                      <span className="text-gray-600 px-1">…</span>
                      <button
                        onClick={() => setPage(totalPages)}
                        className="w-9 h-9 rounded-lg text-sm font-black text-gray-500 hover:text-white hover:bg-white/5"
                      >
                        {totalPages}
                      </button>
                    </>
                  )}
                </div>

                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                  disabled={page === totalPages}
                  className="border-white/10 text-gray-400 hover:text-white hover:border-white/30 h-9 w-9 p-0"
                  data-testid="button-next-page"
                >
                  <ChevronRight className="w-4 h-4" />
                </Button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
