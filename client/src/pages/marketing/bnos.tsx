import { useQuery, useMutation } from "@tanstack/react-query";
import { Link } from "wouter";
import { queryClient, apiRequest } from "@/lib/queryClient";
import { MarketingSubNav } from "@/components/marketing/marketing-subnav";
import { Users, Video, DollarSign, MessageSquare, Zap, TrendingUp, CheckCircle, Clock, UserPlus, BookOpen } from "lucide-react";

interface BnosStats {
  recruitment: { total: number; today: number; thisWeek: number; pendingZoom: number; activated: number; pipeline: { status: string; cnt: number }[] };
  brokers: { total: number };
  finance: { total: number; open: number; funded: number };
}

const PIPELINE_LABELS: Record<string, string> = {
  applied: "Applied", contacted: "Contacted", interview_scheduled: "Interview",
  zoom_scheduled: "Zoom Scheduled", zoom_completed: "Zoom Done",
  training_completed: "Trained", activated: "Activated",
  inactive: "Inactive", rejected: "Rejected",
};

const MODULES = [
  { href: "/marketing/candidates", icon: UserPlus, label: "Candidates", desc: "LinkedIn & recruitment pipeline", color: "emerald" },
  { href: "/marketing/zoom-onboarding", icon: Video, label: "Zoom Onboarding", desc: "Schedule & track sessions", color: "blue" },
  { href: "/marketing/finance-crm", icon: DollarSign, label: "Finance Referrals", desc: "Track client referrals", color: "amber" },
  { href: "/marketing/templates", icon: BookOpen, label: "Templates", desc: "Message template library", color: "purple" },
  { href: "/marketing/whatsapp-gen", icon: MessageSquare, label: "WhatsApp Generator", desc: "Generate prefilled links", color: "green" },
  { href: "/marketing/commission", icon: TrendingUp, label: "Commission Config", desc: "Set rates by partner type", color: "rose" },
];

export default function BnosDashboard() {
  const { data: stats, isLoading } = useQuery<BnosStats>({ queryKey: ["/api/bnos/stats"] });

  const seedMutation = useMutation({
    mutationFn: () => apiRequest("POST", "/api/bnos/templates/seed"),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["/api/bnos/stats"] }),
  });

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <MarketingSubNav />
      <div className="max-w-7xl mx-auto px-4 py-8 space-y-8">

        {/* Header */}
        <div className="flex items-start justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <Zap className="w-5 h-5 text-emerald-400" />
              <span className="text-xs font-black uppercase tracking-widest text-emerald-400">BNOS</span>
            </div>
            <h1 className="text-3xl font-black tracking-tight">Broker Network<br /><span className="text-emerald-400">Operating System</span></h1>
            <p className="text-slate-400 text-sm mt-2">Recruitment · Onboarding · Finance Referrals · Templates · WhatsApp</p>
          </div>
          <button
            onClick={() => seedMutation.mutate()}
            disabled={seedMutation.isPending}
            className="text-xs px-4 py-2 rounded-lg bg-slate-800 border border-slate-700 hover:border-emerald-500/50 text-slate-300 hover:text-white transition-all"
            data-testid="btn-seed-templates"
          >
            {seedMutation.isPending ? "Seeding…" : "Seed Default Templates"}
          </button>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { label: "Candidates Today", value: stats?.recruitment.today ?? "–", icon: UserPlus, color: "emerald" },
            { label: "This Week", value: stats?.recruitment.thisWeek ?? "–", icon: TrendingUp, color: "blue" },
            { label: "Pending Zoom", value: stats?.recruitment.pendingZoom ?? "–", icon: Video, color: "amber" },
            { label: "Activated", value: stats?.recruitment.activated ?? "–", icon: CheckCircle, color: "green" },
            { label: "RERA Brokers (DB)", value: stats?.brokers.total?.toLocaleString() ?? "–", icon: Users, color: "purple" },
            { label: "Finance Referrals", value: stats?.finance.total ?? "–", icon: DollarSign, color: "rose" },
            { label: "Open Cases", value: stats?.finance.open ?? "–", icon: Clock, color: "orange" },
            { label: "Funded Cases", value: stats?.finance.funded ?? "–", icon: CheckCircle, color: "emerald" },
          ].map(({ label, value, icon: Icon, color }) => (
            <div key={label} className="bg-slate-900/60 border border-slate-800 rounded-xl p-4">
              <div className={`w-8 h-8 rounded-lg bg-${color}-500/15 flex items-center justify-center mb-3`}>
                <Icon className={`w-4 h-4 text-${color}-400`} />
              </div>
              <div className="text-2xl font-black">{isLoading ? <span className="animate-pulse text-slate-600">···</span> : value}</div>
              <div className="text-xs text-slate-500 mt-0.5 uppercase tracking-wider">{label}</div>
            </div>
          ))}
        </div>

        {/* Recruitment Pipeline */}
        {stats?.recruitment.pipeline && stats.recruitment.pipeline.length > 0 && (
          <div className="bg-slate-900/60 border border-slate-800 rounded-xl p-5">
            <h2 className="text-sm font-black uppercase tracking-widest text-slate-300 mb-4">Recruitment Pipeline</h2>
            <div className="flex flex-wrap gap-3">
              {stats.recruitment.pipeline
                .sort((a, b) => {
                  const order = ["applied","contacted","interview_scheduled","zoom_scheduled","zoom_completed","training_completed","activated","inactive","rejected"];
                  return order.indexOf(a.status) - order.indexOf(b.status);
                })
                .map(({ status, cnt }) => (
                  <div key={status} className="flex items-center gap-2 bg-slate-800/80 border border-slate-700 rounded-lg px-3 py-2">
                    <span className="text-xs text-slate-400 uppercase tracking-wider">{PIPELINE_LABELS[status] ?? status}</span>
                    <span className="text-sm font-black text-white">{cnt}</span>
                  </div>
                ))}
            </div>
          </div>
        )}

        {/* Module Grid */}
        <div>
          <h2 className="text-sm font-black uppercase tracking-widest text-slate-400 mb-4">Modules</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {MODULES.map(({ href, icon: Icon, label, desc, color }) => (
              <Link key={href} href={href}>
                <div className={`group bg-slate-900/60 border border-slate-800 hover:border-${color}-500/40 rounded-xl p-5 cursor-pointer transition-all hover:bg-slate-900`}>
                  <div className={`w-10 h-10 rounded-xl bg-${color}-500/15 flex items-center justify-center mb-3 group-hover:bg-${color}-500/25 transition-colors`}>
                    <Icon className={`w-5 h-5 text-${color}-400`} />
                  </div>
                  <div className="font-black text-white">{label}</div>
                  <div className="text-xs text-slate-500 mt-1">{desc}</div>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* Quick Contact */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <a href="https://wa.me/971523946311?text=Hi%20DeliWer%20Recruitment%20Team" target="_blank" rel="noopener noreferrer"
            className="flex items-center gap-4 bg-emerald-900/20 border border-emerald-700/30 rounded-xl p-4 hover:border-emerald-500/60 transition-all">
            <MessageSquare className="w-8 h-8 text-emerald-400 flex-shrink-0" />
            <div>
              <div className="font-black text-emerald-300">Recruitment WhatsApp</div>
              <div className="text-xs text-slate-400">+971 52 394 6311 · Marketing & Recruitment</div>
            </div>
          </a>
          <a href="https://wa.me/971523906019?text=Hi%20DeliWer%20Finance%20Team" target="_blank" rel="noopener noreferrer"
            className="flex items-center gap-4 bg-blue-900/20 border border-blue-700/30 rounded-xl p-4 hover:border-blue-500/60 transition-all">
            <DollarSign className="w-8 h-8 text-blue-400 flex-shrink-0" />
            <div>
              <div className="font-black text-blue-300">Finance Activation WhatsApp</div>
              <div className="text-xs text-slate-400">+971 52 390 6019 · Finance & Activation</div>
            </div>
          </a>
        </div>
      </div>
    </div>
  );
}
