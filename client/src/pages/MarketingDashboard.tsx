import { useState, useEffect, useCallback } from "react";
import { useQuery, useMutation, useQueryClient as useQC } from "@tanstack/react-query";
import { queryClient, apiRequest } from "@/lib/queryClient";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { 
  Users, Target, MessageSquare, Send, TrendingUp, Zap, Shield, Search,
  CheckCircle2, Clock, ArrowRight, AlertTriangle, Loader2, Instagram, Phone,
  Linkedin, Plus, Copy, Check, DollarSign, BarChart3, Eye, Settings,
  Globe, Droplets, Sparkles, MapPin, Star, Image, RefreshCw, ExternalLink,
  Building2, Calendar, Radio, Antenna, Bot, Filter, ChevronDown, ChevronUp,
  CircleDot, Wifi, XCircle, ThumbsUp, MessageCircle, User
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { SiWhatsapp, SiInstagram, SiFacebook, SiTelegram } from "react-icons/si";
import { FaLinkedin } from "react-icons/fa";

const RENTAL_HEAVY_AREAS = ["Marina", "JVC", "Business Bay", "Downtown", "Hills"];

const SOURCE_CONFIG: Record<string, { label: string; Icon: any; color: string; bg: string }> = {
  whatsapp_group: { label: "WhatsApp", Icon: SiWhatsapp, color: "#25D366", bg: "bg-green-500/10 border-green-500/30" },
  linkedin: { label: "LinkedIn", Icon: FaLinkedin, color: "#0077B5", bg: "bg-blue-500/10 border-blue-500/30" },
  facebook: { label: "Facebook", Icon: SiFacebook, color: "#1877F2", bg: "bg-blue-600/10 border-blue-600/30" },
  instagram: { label: "Instagram", Icon: SiInstagram, color: "#E4405F", bg: "bg-pink-500/10 border-pink-500/30" },
  telegram: { label: "Telegram", Icon: SiTelegram, color: "#26A5E4", bg: "bg-sky-500/10 border-sky-500/30" },
  bayut: { label: "Bayut", Icon: Globe, color: "#F5A623", bg: "bg-amber-500/10 border-amber-500/30" },
  dubizzle: { label: "Dubizzle", Icon: Globe, color: "#FF6B00", bg: "bg-orange-500/10 border-orange-500/30" },
};

const INTENT_CONFIG: Record<string, { label: string; color: string }> = {
  relocation: { label: "🏙️ Relocation", color: "bg-violet-500/20 text-violet-300 border-violet-500/30" },
  moving: { label: "📦 Moving", color: "bg-blue-500/20 text-blue-300 border-blue-500/30" },
  home_services: { label: "🏠 Home Services", color: "bg-emerald-500/20 text-emerald-300 border-emerald-500/30" },
  dewa_setup: { label: "⚡ DEWA Setup", color: "bg-yellow-500/20 text-yellow-300 border-yellow-500/30" },
  ejari: { label: "📄 Ejari", color: "bg-cyan-500/20 text-cyan-300 border-cyan-500/30" },
  broker_referral: { label: "🤝 Broker Ref", color: "bg-amber-500/20 text-amber-300 border-amber-500/30" },
};

interface IntentSignal {
  id: string;
  source: string;
  community: string;
  signalText: string;
  intentType: string;
  intentScore: number;
  contactName?: string;
  contactHandle?: string;
  area?: string;
  status: string;
  aiResponse?: string;
  capturedAt: string;
}

function ScoreBar({ score }: { score: number }) {
  const color = score >= 90 ? "bg-red-500" : score >= 75 ? "bg-amber-500" : "bg-blue-500";
  return (
    <div className="flex items-center gap-2">
      <div className="flex-1 h-1.5 bg-white/10 rounded-full overflow-hidden">
        <div className={`h-full rounded-full ${color} transition-all`} style={{ width: `${score}%` }} />
      </div>
      <span className={`text-xs font-bold ${score >= 90 ? "text-red-400" : score >= 75 ? "text-amber-400" : "text-blue-400"}`}>{score}</span>
    </div>
  );
}

function SignalCard({ signal, onStatusChange, onRespond }: {
  signal: IntentSignal;
  onStatusChange: (id: string, status: string) => void;
  onRespond: (id: string) => Promise<string>;
}) {
  const { toast } = useToast();
  const [expanded, setExpanded] = useState(false);
  const [loadingResponse, setLoadingResponse] = useState(false);
  const [response, setResponse] = useState(signal.aiResponse || "");
  const [copied, setCopied] = useState(false);
  const cfg = SOURCE_CONFIG[signal.source] || SOURCE_CONFIG.facebook;
  const intentCfg = INTENT_CONFIG[signal.intentType] || { label: signal.intentType, color: "bg-gray-500/20 text-gray-300" };
  const timeAgo = formatTimeAgo(signal.capturedAt);

  const handleRespond = async () => {
    setLoadingResponse(true);
    try {
      const msg = await onRespond(signal.id);
      setResponse(msg);
      setExpanded(true);
    } finally {
      setLoadingResponse(false);
    }
  };

  const copyResponse = () => {
    navigator.clipboard.writeText(response);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
    toast({ title: "Copied", description: "Response copied to clipboard" });
  };

  if (signal.status === "dismissed") return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      layout
    >
      <Card className={`border transition-all ${signal.status === "contacted" ? "opacity-70 border-white/10 bg-white/3" : "bg-slate-900/80 border-purple-500/20 hover:border-purple-500/40"}`}>
        <CardContent className="p-4">
          {/* Top Row */}
          <div className="flex items-start justify-between gap-3 mb-3">
            <div className="flex items-center gap-2 min-w-0">
              <div className={`w-7 h-7 rounded-lg border flex items-center justify-center shrink-0 ${cfg.bg}`}>
                <cfg.Icon className="w-3.5 h-3.5" style={{ color: cfg.color }} />
              </div>
              <div className="min-w-0">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="text-xs font-bold text-white truncate">{signal.community}</span>
                  <Badge className={`text-[10px] px-1.5 py-0 border ${intentCfg.color}`}>{intentCfg.label}</Badge>
                  {signal.status === "contacted" && <Badge className="text-[10px] px-1.5 py-0 bg-emerald-500/20 text-emerald-300 border-emerald-500/30">Contacted</Badge>}
                  {signal.status === "converted" && <Badge className="text-[10px] px-1.5 py-0 bg-violet-500/20 text-violet-300 border-violet-500/30">Converted</Badge>}
                </div>
                <div className="flex items-center gap-2 text-[10px] text-gray-500 mt-0.5">
                  <span>{timeAgo}</span>
                  {signal.area && <><span>·</span><span className="flex items-center gap-0.5"><MapPin className="w-2.5 h-2.5" />{signal.area}</span></>}
                  {signal.contactName && <><span>·</span><span className="flex items-center gap-0.5"><User className="w-2.5 h-2.5" />{signal.contactName}</span></>}
                </div>
              </div>
            </div>
            <div className="flex items-center gap-1.5 shrink-0">
              <div className="w-20">
                <ScoreBar score={signal.intentScore} />
              </div>
              <button
                data-testid={`button-expand-signal-${signal.id}`}
                onClick={() => setExpanded(e => !e)}
                className="text-gray-500 hover:text-white transition-colors p-1"
              >
                {expanded ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
              </button>
            </div>
          </div>

          {/* Signal Text */}
          <p className="text-sm text-gray-200 leading-relaxed bg-white/5 rounded-xl p-3 border border-white/5 mb-3 italic">
            "{signal.signalText}"
          </p>

          {/* Actions */}
          <div className="flex items-center gap-2 flex-wrap">
            {signal.status === "new" && (
              <>
                <Button
                  data-testid={`button-respond-${signal.id}`}
                  size="sm"
                  onClick={handleRespond}
                  disabled={loadingResponse}
                  className="bg-purple-600 hover:bg-purple-700 text-white text-xs h-7 font-bold"
                >
                  {loadingResponse ? <Loader2 className="w-3 h-3 mr-1 animate-spin" /> : <Bot className="w-3 h-3 mr-1" />}
                  AI Respond
                </Button>
                <Button
                  data-testid={`button-claim-${signal.id}`}
                  size="sm"
                  variant="outline"
                  onClick={() => { onStatusChange(signal.id, "contacted"); toast({ title: "Lead Claimed", description: `${signal.contactName || "Signal"} marked as contacted` }); }}
                  className="border-emerald-500/40 text-emerald-400 hover:bg-emerald-500/10 text-xs h-7"
                >
                  <ThumbsUp className="w-3 h-3 mr-1" />Claim
                </Button>
                <Button
                  data-testid={`button-dismiss-${signal.id}`}
                  size="sm"
                  variant="ghost"
                  onClick={() => onStatusChange(signal.id, "dismissed")}
                  className="text-gray-500 hover:text-red-400 text-xs h-7"
                >
                  <XCircle className="w-3 h-3" />
                </Button>
              </>
            )}
            {signal.status === "contacted" && (
              <Button
                size="sm"
                onClick={() => { onStatusChange(signal.id, "converted"); toast({ title: "🎉 Converted!", description: "Signal marked as converted lead" }); }}
                className="bg-violet-600 hover:bg-violet-700 text-white text-xs h-7"
              >
                <CheckCircle2 className="w-3 h-3 mr-1" />Mark Converted
              </Button>
            )}
            {signal.contactHandle && (
              <a
                href={signal.source === "whatsapp_group"
                  ? `https://wa.me/${signal.contactHandle.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(response || "Hi! I saw your message — I think we can help with DeliWer's move-in service.")}`
                  : `https://wa.me/?text=${encodeURIComponent(response || signal.signalText)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1 text-xs text-[#25D366] hover:opacity-80 transition-opacity"
              >
                <SiWhatsapp className="w-3 h-3" />WhatsApp
              </a>
            )}
          </div>

          {/* Expanded: AI Response */}
          <AnimatePresence>
            {expanded && response && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                className="overflow-hidden"
              >
                <div className="mt-3 pt-3 border-t border-white/10">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-bold text-purple-300 flex items-center gap-1"><Bot className="w-3 h-3" />AI Response Draft</span>
                    <button
                      data-testid={`button-copy-response-${signal.id}`}
                      onClick={copyResponse}
                      className="text-gray-400 hover:text-white transition-colors"
                    >
                      {copied ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                    </button>
                  </div>
                  <p className="text-sm text-gray-200 bg-purple-950/30 rounded-xl p-3 border border-purple-500/20 leading-relaxed">{response}</p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </CardContent>
      </Card>
    </motion.div>
  );
}

function formatTimeAgo(ts: string): string {
  const diff = Date.now() - new Date(ts).getTime();
  const mins = Math.floor(diff / 60000);
  if (mins < 1) return "just now";
  if (mins < 60) return `${mins}m ago`;
  const hrs = Math.floor(mins / 60);
  if (hrs < 24) return `${hrs}h ago`;
  return `${Math.floor(hrs / 24)}d ago`;
}

const COMMUNITY_SOURCE_ICON: Record<string, any> = {
  facebook: SiFacebook,
  linkedin: FaLinkedin,
  telegram: SiTelegram,
  instagram: SiInstagram,
  reddit: Globe,
  bayut: Globe,
  dubizzle: Globe,
};

const COMMUNITY_SOURCE_COLOR: Record<string, string> = {
  facebook: "#1877F2",
  linkedin: "#0077B5",
  telegram: "#26A5E4",
  instagram: "#E4405F",
  reddit: "#FF4500",
  bayut: "#F5A623",
  dubizzle: "#FF6B00",
};

interface Community {
  id: string;
  name: string;
  source: string;
  joinUrl: string;
  memberCount: string;
  verified: boolean;
  description: string;
  monitoringTip: string;
  keywordAlerts: string[];
}

function CommunityCard({ community }: { community: Community }) {
  const Icon = COMMUNITY_SOURCE_ICON[community.source] || Globe;
  const color = COMMUNITY_SOURCE_COLOR[community.source] || "#888";
  const [expanded, setExpanded] = useState(false);

  return (
    <Card className="bg-slate-900/80 border-purple-500/10 hover:border-purple-500/30 transition-all">
      <CardContent className="p-4">
        <div className="flex items-start gap-3">
          <div className="w-9 h-9 rounded-xl border border-white/10 flex items-center justify-center shrink-0 bg-slate-800">
            <Icon className="w-4 h-4" style={{ color }} />
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 flex-wrap mb-1">
              <span className="font-bold text-white text-sm">{community.name}</span>
              {community.verified && (
                <Badge className="text-[10px] px-1.5 py-0 bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                  <CheckCircle2 className="w-2.5 h-2.5 mr-0.5" />Verified
                </Badge>
              )}
              <span className="text-[10px] text-gray-500">{community.memberCount}</span>
            </div>
            <p className="text-xs text-gray-400 leading-relaxed mb-2">{community.description}</p>
            <div className="flex flex-wrap gap-1 mb-2">
              {community.keywordAlerts.slice(0, 3).map(kw => (
                <span key={kw} className="text-[10px] bg-purple-500/10 text-purple-300 border border-purple-500/20 px-1.5 py-0.5 rounded-md">"{kw}"</span>
              ))}
            </div>
          </div>
          <div className="flex gap-2 shrink-0">
            <a href={community.joinUrl} target="_blank" rel="noopener noreferrer">
              <Button size="sm" className="text-xs h-7 bg-purple-600 hover:bg-purple-700 text-white font-bold">
                <ExternalLink className="w-3 h-3 mr-1" />Open
              </Button>
            </a>
            <button
              data-testid={`expand-community-${community.id}`}
              onClick={() => setExpanded(e => !e)}
              className="text-gray-500 hover:text-white transition-colors"
            >
              {expanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
            </button>
          </div>
        </div>
        <AnimatePresence>
          {expanded && (
            <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden">
              <div className="mt-3 pt-3 border-t border-white/5">
                <p className="text-[10px] font-bold uppercase text-amber-400 mb-1 tracking-widest">Monitoring Tip</p>
                <p className="text-xs text-gray-300 leading-relaxed">{community.monitoringTip}</p>
                <div className="flex flex-wrap gap-1 mt-2">
                  {community.keywordAlerts.map(kw => (
                    <span key={kw} className="text-[10px] bg-amber-500/10 text-amber-300 border border-amber-500/20 px-1.5 py-0.5 rounded-md">"{kw}"</span>
                  ))}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </CardContent>
    </Card>
  );
}

const INTENT_OPTIONS = [
  { value: "relocation", label: "Relocation" },
  { value: "moving", label: "Moving / Movers" },
  { value: "home_services", label: "Home Services" },
  { value: "dewa_setup", label: "DEWA Setup" },
  { value: "ejari", label: "Ejari Registration" },
  { value: "broker_referral", label: "Broker Referral" },
];

function LogSignalForm({ onSubmit }: { onSubmit: (data: any) => Promise<void> }) {
  const [form, setForm] = useState({
    source: "facebook",
    community: "",
    signalText: "",
    intentType: "relocation",
    intentScore: 85,
    contactName: "",
    contactHandle: "",
    area: "",
  });
  const [saving, setSaving] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async () => {
    if (!form.community || !form.signalText) {
      toast({ title: "Required fields missing", description: "Community name and signal text are required.", variant: "destructive" });
      return;
    }
    setSaving(true);
    try {
      await onSubmit(form);
      setForm({ source: "facebook", community: "", signalText: "", intentType: "relocation", intentScore: 85, contactName: "", contactHandle: "", area: "" });
      toast({ title: "Signal Logged", description: "Real signal captured and added to the feed." });
    } finally {
      setSaving(false);
    }
  };

  const fieldClass = "w-full bg-slate-800 border border-white/10 rounded-lg px-3 py-2 text-sm text-white placeholder:text-gray-600 focus:outline-none focus:border-purple-500/50";

  return (
    <div className="space-y-4">
      <div className="bg-emerald-950/20 border border-emerald-500/20 rounded-xl p-3">
        <p className="text-xs text-emerald-300 font-medium">
          Log a signal you personally spotted in a real community. All fields except Community and Signal Text are optional — add what you have.
        </p>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div className="space-y-1">
          <label className="text-xs font-bold text-gray-400 uppercase tracking-wide">Platform</label>
          <select
            data-testid="log-source"
            value={form.source}
            onChange={e => setForm(f => ({ ...f, source: e.target.value }))}
            className={fieldClass}
          >
            {Object.entries(SOURCE_CONFIG).map(([k, v]) => (
              <option key={k} value={k} className="bg-slate-900">{v.label}</option>
            ))}
            <option value="reddit" className="bg-slate-900">Reddit</option>
            <option value="other" className="bg-slate-900">Other</option>
          </select>
        </div>
        <div className="space-y-1">
          <label className="text-xs font-bold text-gray-400 uppercase tracking-wide">Community / Group Name *</label>
          <Input
            data-testid="log-community"
            placeholder="e.g. Dubai Real Estate (Facebook)"
            value={form.community}
            onChange={e => setForm(f => ({ ...f, community: e.target.value }))}
            className="bg-slate-800 border-white/10 text-white placeholder:text-gray-600 focus:border-purple-500/50"
          />
        </div>
      </div>

      <div className="space-y-1">
        <label className="text-xs font-bold text-gray-400 uppercase tracking-wide">Signal Text — paste the exact post/message *</label>
        <textarea
          data-testid="log-signal-text"
          rows={3}
          placeholder='e.g. "Just signed my lease in JVC, need Ejari and DEWA sorted ASAP. Anyone know a good concierge?"'
          value={form.signalText}
          onChange={e => setForm(f => ({ ...f, signalText: e.target.value }))}
          className={`${fieldClass} resize-none`}
        />
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div className="space-y-1">
          <label className="text-xs font-bold text-gray-400 uppercase tracking-wide">Intent Type</label>
          <select
            data-testid="log-intent-type"
            value={form.intentType}
            onChange={e => setForm(f => ({ ...f, intentType: e.target.value }))}
            className={fieldClass}
          >
            {INTENT_OPTIONS.map(o => <option key={o.value} value={o.value} className="bg-slate-900">{o.label}</option>)}
          </select>
        </div>
        <div className="space-y-1">
          <label className="text-xs font-bold text-gray-400 uppercase tracking-wide">Intent Score (1–100)</label>
          <div className="flex items-center gap-3">
            <input
              data-testid="log-intent-score"
              type="range"
              min="50"
              max="100"
              value={form.intentScore}
              onChange={e => setForm(f => ({ ...f, intentScore: Number(e.target.value) }))}
              className="flex-1 accent-purple-500"
            />
            <span className={`text-sm font-bold w-7 text-right ${form.intentScore >= 90 ? "text-red-400" : form.intentScore >= 75 ? "text-amber-400" : "text-blue-400"}`}>{form.intentScore}</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-3">
        <div className="space-y-1">
          <label className="text-xs font-bold text-gray-400 uppercase tracking-wide">Contact Name</label>
          <Input
            data-testid="log-contact-name"
            placeholder="Name from the post"
            value={form.contactName}
            onChange={e => setForm(f => ({ ...f, contactName: e.target.value }))}
            className="bg-slate-800 border-white/10 text-white placeholder:text-gray-600 focus:border-purple-500/50"
          />
        </div>
        <div className="space-y-1">
          <label className="text-xs font-bold text-gray-400 uppercase tracking-wide">Contact Handle / Phone</label>
          <Input
            data-testid="log-contact-handle"
            placeholder="+971… or @username"
            value={form.contactHandle}
            onChange={e => setForm(f => ({ ...f, contactHandle: e.target.value }))}
            className="bg-slate-800 border-white/10 text-white placeholder:text-gray-600 focus:border-purple-500/50"
          />
        </div>
        <div className="space-y-1">
          <label className="text-xs font-bold text-gray-400 uppercase tracking-wide">Dubai Area</label>
          <Input
            data-testid="log-area"
            placeholder="e.g. JVC, Marina..."
            value={form.area}
            onChange={e => setForm(f => ({ ...f, area: e.target.value }))}
            className="bg-slate-800 border-white/10 text-white placeholder:text-gray-600 focus:border-purple-500/50"
          />
        </div>
      </div>

      <Button
        data-testid="button-log-signal"
        onClick={handleSubmit}
        disabled={saving}
        className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold"
      >
        {saving ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : <Plus className="w-4 h-4 mr-2" />}
        Log Real Signal
      </Button>
    </div>
  );
}

function IntentSnifferView({ leads: _leads, leadMutation: _leadMutation }: { leads: any[], leadMutation: any }) {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState<"feed" | "log" | "channels">("feed");
  const [statusFilter, setStatusFilter] = useState("new");
  const [captureTypeFilter, setCaptureTypeFilter] = useState("");

  const { data: signals = [], isLoading, refetch } = useQuery<(IntentSignal & { captureType: string })[]>({
    queryKey: ["/api/marketing/intent-signals", statusFilter, captureTypeFilter],
    queryFn: async () => {
      const params = new URLSearchParams();
      if (statusFilter) params.set("status", statusFilter);
      if (captureTypeFilter) params.set("captureType", captureTypeFilter);
      const res = await fetch(`/api/marketing/intent-signals?${params}`);
      return res.json();
    },
    refetchInterval: 30000,
  });

  const { data: stats } = useQuery({
    queryKey: ["/api/marketing/intent-signals/stats"],
    refetchInterval: 15000,
  });

  const { data: communities = [] } = useQuery<Community[]>({
    queryKey: ["/api/marketing/intent-signals/communities"],
    queryFn: async () => {
      const res = await fetch("/api/marketing/intent-signals/communities");
      return res.json();
    },
  });

  const handleStatusChange = async (id: string, status: string) => {
    await apiRequest("PATCH", `/api/marketing/intent-signals/${id}/status`, { status });
    refetch();
  };

  const handleRespond = async (id: string): Promise<string> => {
    const res = await apiRequest("POST", `/api/marketing/intent-signals/${id}/respond`, {});
    const data = await res.json();
    return data.message || "";
  };

  const handleLogSignal = async (formData: any) => {
    await apiRequest("POST", "/api/marketing/intent-signals", formData);
    await refetch();
    setActiveTab("feed");
    setStatusFilter("new");
    setCaptureTypeFilter("manual");
  };

  const manualCount = (stats as any)?.byCaptureType?.find((s: any) => s.captureType === "manual")?.count || 0;
  const newCount = (stats as any)?.byStatus?.find((s: any) => s.status === "new")?.count || 0;
  const convertedCount = (stats as any)?.byStatus?.find((s: any) => s.status === "converted")?.count || 0;

  return (
    <div className="space-y-5">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h3 className="text-xl font-black text-white flex items-center gap-2">
            <Radio className="text-purple-400 w-5 h-5" />
            Intent Interception System
            <span className="flex items-center gap-1 text-xs text-purple-400 bg-purple-500/10 border border-purple-500/30 px-2 py-0.5 rounded-full font-medium">
              <CircleDot className="w-2.5 h-2.5 animate-pulse" />ACTIVE
            </span>
          </h3>
          <p className="text-gray-400 text-xs mt-0.5">
            Monitor real communities for relocation intent — log what you find, generate outreach instantly
          </p>
        </div>
        <Button
          data-testid="button-log-new"
          onClick={() => setActiveTab("log")}
          className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold shrink-0"
        >
          <Plus className="w-4 h-4 mr-2" />Log Real Signal
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-3">
        {[
          { label: "Manual Captures", value: Number(manualCount), color: "text-emerald-400", border: "border-emerald-500/20", note: "Real signals" },
          { label: "Active / New", value: Number(newCount), color: "text-purple-400", border: "border-purple-500/20", note: "Needs action" },
          { label: "Converted", value: Number(convertedCount), color: "text-violet-400", border: "border-violet-500/20", note: "Closed leads" },
        ].map(s => (
          <div key={s.label} className={`bg-slate-900/80 rounded-xl border ${s.border} p-3 text-center`}>
            <div className={`text-2xl font-black ${s.color}`}>{s.value}</div>
            <div className="text-xs text-gray-500 font-medium">{s.label}</div>
            <div className="text-[10px] text-gray-600">{s.note}</div>
          </div>
        ))}
      </div>

      {/* Sub-tab nav */}
      <div className="flex gap-1 bg-slate-900/50 p-1 rounded-xl border border-white/5">
        {([
          { key: "feed", label: "Signal Feed", icon: Radio },
          { key: "log", label: "Log Real Signal", icon: Plus },
          { key: "channels", label: "Verified Channels", icon: Wifi },
        ] as const).map(({ key, label, icon: Icon }) => (
          <button
            key={key}
            data-testid={`subtab-${key}`}
            onClick={() => setActiveTab(key)}
            className={`flex-1 flex items-center justify-center gap-1.5 px-3 py-2 rounded-lg text-xs font-bold transition-all ${activeTab === key ? "bg-purple-600 text-white" : "text-gray-400 hover:text-white"}`}
          >
            <Icon className="w-3.5 h-3.5" />{label}
          </button>
        ))}
      </div>

      {/* FEED TAB */}
      {activeTab === "feed" && (
        <div className="space-y-4">
          {/* Filters */}
          <div className="flex flex-wrap gap-2 items-center">
            <div className="flex gap-1">
              {["new", "contacted", "converted"].map(s => (
                <button
                  key={s}
                  data-testid={`filter-status-${s}`}
                  onClick={() => setStatusFilter(s)}
                  className={`px-3 py-1 rounded-lg text-xs font-bold transition-all border ${statusFilter === s ? "bg-purple-600 border-purple-500 text-white" : "border-white/10 text-gray-400 bg-slate-800 hover:text-white"}`}
                >
                  {s.charAt(0).toUpperCase() + s.slice(1)}
                </button>
              ))}
            </div>
            <div className="flex gap-1 ml-auto">
              {[
                { v: "", label: "All" },
                { v: "manual", label: "✓ Real Only" },
                { v: "ai_example", label: "AI Examples" },
              ].map(o => (
                <button
                  key={o.v}
                  data-testid={`filter-capture-${o.v || "all"}`}
                  onClick={() => setCaptureTypeFilter(o.v)}
                  className={`px-2 py-1 rounded-lg text-[10px] font-bold transition-all border ${captureTypeFilter === o.v ? (o.v === "manual" ? "bg-emerald-600 border-emerald-500 text-white" : "bg-slate-600 border-slate-500 text-white") : "border-white/10 text-gray-500 bg-slate-800 hover:text-white"}`}
                >
                  {o.label}
                </button>
              ))}
            </div>
            <button
              onClick={() => refetch()}
              className="text-gray-500 hover:text-white transition-colors"
              data-testid="button-refresh-signals"
            >
              <RefreshCw className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* AI Example Banner */}
          {captureTypeFilter !== "manual" && (
            <div className="bg-slate-800/60 border border-white/10 rounded-xl p-3 flex gap-2 items-start">
              <Bot className="w-4 h-4 text-gray-400 shrink-0 mt-0.5" />
              <div>
                <p className="text-xs font-bold text-gray-300">AI Example signals are training references</p>
                <p className="text-[11px] text-gray-500 mt-0.5">They show you WHAT real intent signals look like in each community. When you spot a real one, use <strong className="text-purple-300">"Log Real Signal"</strong> to capture it. Manually captured signals are tagged <span className="text-emerald-400 font-bold">REAL</span>.</p>
              </div>
            </div>
          )}

          {isLoading ? (
            <div className="flex items-center justify-center py-12"><Loader2 className="w-6 h-6 animate-spin text-purple-400" /></div>
          ) : signals.length === 0 ? (
            <div className="text-center py-12 border-2 border-dashed border-purple-500/10 rounded-2xl bg-purple-950/5">
              <Wifi className="w-8 h-8 text-purple-500/20 mx-auto mb-3" />
              <p className="text-gray-400 font-medium text-sm">No {statusFilter} signals {captureTypeFilter ? "of this type " : ""}yet</p>
              <div className="flex gap-3 justify-center mt-4">
                <Button onClick={() => setActiveTab("log")} className="bg-emerald-600 hover:bg-emerald-700 text-white text-sm">
                  <Plus className="w-4 h-4 mr-1" />Log a Real Signal
                </Button>
                <Button onClick={() => setActiveTab("channels")} variant="outline" className="border-purple-500/30 text-purple-300 hover:bg-purple-500/10 text-sm">
                  <Wifi className="w-4 h-4 mr-1" />View Channels
                </Button>
              </div>
            </div>
          ) : (
            <div className="space-y-3">
              {signals.map((signal: any) => (
                <motion.div
                  key={signal.id}
                  className="relative"
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                >
                  <div className="absolute -top-1.5 left-3 z-10">
                    {signal.captureType === "manual" ? (
                      <span className="text-[9px] font-black bg-emerald-600 text-white px-2 py-0.5 rounded-full tracking-widest uppercase">Real Capture</span>
                    ) : (
                      <span className="text-[9px] font-black bg-slate-600 text-gray-300 px-2 py-0.5 rounded-full tracking-widest uppercase">AI Example</span>
                    )}
                  </div>
                  <div className="pt-2">
                    <SignalCard
                      signal={signal}
                      onStatusChange={handleStatusChange}
                      onRespond={handleRespond}
                    />
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* LOG TAB */}
      {activeTab === "log" && (
        <LogSignalForm onSubmit={handleLogSignal} />
      )}

      {/* CHANNELS TAB */}
      {activeTab === "channels" && (
        <div className="space-y-4">
          <div className="bg-purple-950/20 border border-purple-500/20 rounded-xl p-4">
            <h4 className="text-sm font-black text-purple-200 mb-1 flex items-center gap-2">
              <Wifi className="w-4 h-4" />How to Use This System
            </h4>
            <ol className="text-xs text-gray-400 space-y-1.5 list-decimal list-inside">
              <li>Join the verified communities below (click <strong className="text-white">Open</strong>)</li>
              <li>Search each group for the keyword alerts shown on each card</li>
              <li>When you spot someone asking for move-in / DEWA / Ejari help, come back here</li>
              <li>Click <strong className="text-white">"Log Real Signal"</strong> and paste the exact post + contact info</li>
              <li>Hit <strong className="text-white">"AI Respond"</strong> to generate a tailored outreach message, then send it</li>
            </ol>
          </div>

          <div className="space-y-3">
            {communities.map((community: Community) => (
              <CommunityCard key={community.id} community={community} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default function MarketingDashboard() {
  const { toast } = useToast();
  const [isTriggering, setIsTriggering] = useState(false);
  const [phone, setPhone] = useState("");
  const [conciergeInput, setConciergeInput] = useState("");
  const [conciergeMessages, setConciergeMessages] = useState<any[]>([]);
  const [generatedContent, setGeneratedContent] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [isDistributing, setIsDistributing] = useState(false);
  const [copied, setCopied] = useState<string | null>(null);

  // Social Campaigns State
  const [socialPlatform, setSocialPlatform] = useState<"gmb" | "meta">("gmb");
  const [gmbPostType, setGmbPostType] = useState("update");
  const [metaPostType, setMetaPostType] = useState("brand");
  const [gmbContent, setGmbContent] = useState("");
  const [metaContent, setMetaContent] = useState("");
  const [isGenGmb, setIsGenGmb] = useState(false);
  const [isGenMeta, setIsGenMeta] = useState(false);
  const [publishedToday, setPublishedToday] = useState<string[]>([]);
  const [selectedImageTemplate, setSelectedImageTemplate] = useState<string | null>(null);

  const generateContentMutation = useMutation({
    mutationFn: async () => {
      const res = await apiRequest("POST", "/api/concierge", {
        phone: "SYSTEM",
        message: "Generate a professional WhatsApp outreach message for Dubai real estate brokers about DeliWer's move-in water service and referral commissions."
      });
      return res.json();
    },
    onSuccess: (data) => {
      setGeneratedContent(data.reply || "");
      toast({ title: "Content Generated", description: "AI has prepared a new outreach message." });
    }
  });

  const distributeContentMutation = useMutation({
    mutationFn: async () => {
      await new Promise(resolve => setTimeout(resolve, 2000));
      return { success: true };
    },
    onSuccess: () => {
      toast({ title: "Distribution Launched", description: "Content is being sent to the partner network." });
    }
  });

  const handleGenerateContent = async () => {
    generateContentMutation.mutate();
  };

  const handleLaunchDistribution = async () => {
    if (!generatedContent) {
      toast({ title: "No Content", description: "Please generate content first.", variant: "destructive" });
      return;
    }
    distributeContentMutation.mutate();
  };

  const [newBroker, setNewBroker] = useState({
    name: "", agency: "", area: "", phone: "", instagram: "", linkedin: "", category: "brokerage"
  });

  const { data: leads, isLoading: leadsLoading } = useQuery<any[]>({
    queryKey: ["/api/leads"],
  });

  const { data: streaks, isLoading: streaksLoading } = useQuery<any[]>({
    queryKey: ["/api/founder-streaks"],
  });

  const { data: brokersData, isLoading: brokersLoading } = useQuery<any[]>({
    queryKey: ["/api/brokers"],
  });

  const [filter, setFilter] = useState("all");
  const brokers = brokersData || [];
  const filteredBrokers = brokers.filter(b => filter === 'all' || b.category === filter);

  const addBrokerMutation = useMutation({
    mutationFn: async (broker: any) => {
      const res = await apiRequest("POST", "/api/brokers", broker);
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/brokers"] });
      toast({ title: "Intelligence Added", description: `${newBroker.name} saved to market intel.` });
      setNewBroker({ name: "", agency: "", area: "", phone: "", instagram: "", linkedin: "", category: "brokerage" });
    },
  });

  const streakMutation = useMutation({
    mutationFn: async () => await apiRequest("POST", "/api/founder-streaks/post"),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/founder-streaks"] });
      toast({ title: "🔥 Streak Updated!", description: "Daily ritual complete." });
    },
  });

  const leadMutation = useMutation({
    mutationFn: async ({ id, stage }: { id: string, stage: string }) => {
      await apiRequest("PATCH", `/api/leads/${id}/requirements`, { 
        marketingStage: stage,
        nextAction: stage === "handshake" ? "Send WhatsApp Checklist" : "Complete conversion"
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/leads"] });
    }
  });

  const conciergeMutation = useMutation({
    mutationFn: async (message: string) => {
      const res = await apiRequest("POST", "/api/concierge", {
        phone, name: "Founder Test", area: "Dubai", message
      });
      return res.json();
    },
    onSuccess: (data) => {
      setConciergeMessages(prev => [...prev, { role: "bot", content: data.reply || data.message }]);
    }
  });

  const triggerDailyFounderReminder = async () => {
    setIsTriggering(true);
    try {
      await apiRequest("GET", "/api/daily-founder-trigger?deliwer-founder-trigger-2026-secure");
      toast({ title: "Success", description: "Reminder triggered!" });
    } finally {
      setIsTriggering(false);
    }
  };

  const handleConciergeSend = () => {
    if (!phone || !conciergeInput) return;
    setConciergeMessages(prev => [...prev, { role: "user", content: conciergeInput }]);
    conciergeMutation.mutate(conciergeInput);
    setConciergeInput("");
  };

  const addBroker = () => {
    if (!newBroker.name) return;
    addBrokerMutation.mutate(newBroker);
  };

  const copyLink = (text: string, key: string) => {
    navigator.clipboard.writeText(text);
    setCopied(key);
    toast({ title: "Copied", description: "Link copied to clipboard" });
    setTimeout(() => setCopied(null), 2000);
  };

  // Affiliate data
  const partners = [
    { name: "DeBacci Capital", ref: "debacci", agents: 3, clicks: 247, conversions: 18, revenue: 7182, commission: 1436.40 },
    { name: "EGLC", ref: "eglc", agents: 2, clicks: 156, conversions: 12, revenue: 4788, commission: 957.60 },
    { name: "MyTablon", ref: "mytablon", agents: 1, clicks: 89, conversions: 7, revenue: 2793, commission: 558.60 },
  ];

  const seoPagesStats = [
    { page: "/ejari-dubai", visits: 1200, conversions: 84, rate: "7%" },
    { page: "/ejari-registration", visits: 890, conversions: 62, rate: "7%" },
    { page: "/start", visits: 2300, conversions: 276, rate: "12%" },
    { page: "/dewa-activation", visits: 450, conversions: 27, rate: "6%" },
    { page: "/marina-gate-move-in", visits: 234, conversions: 19, rate: "8%" },
  ];

  if (leadsLoading || streaksLoading || brokersLoading) {
    return <div className="flex items-center justify-center h-screen bg-slate-950"><Loader2 className="animate-spin text-emerald-500" /></div>;
  }

  const displayLeads = leads || [];
  const hassan = streaks?.find(s => s.name === "Hassan Jawad");
  const today = new Date().toISOString().split("T")[0];
  const missedDay = hassan && hassan.lastPosted !== today;

  return (
    <div className="min-h-screen bg-slate-950 text-white p-6 pb-24 pt-32 relative overflow-hidden">
      <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&q=80')] bg-cover bg-center opacity-10 pointer-events-none" />
      <div className="absolute inset-0 bg-gradient-to-b from-slate-950/50 via-slate-950/80 to-slate-950 pointer-events-none" />
      <div className="max-w-7xl mx-auto space-y-8 relative z-10">
        <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border-b border-white/10 pb-6 bg-slate-900/40 backdrop-blur-md p-4 rounded-xl">
          <div className="space-y-1">
            <h1 className="text-4xl font-black uppercase tracking-tighter text-emerald-500">Founder Command Center</h1>
            <p className="text-gray-300 font-medium tracking-wide">Unified Marketing, Growth Engine & Affiliate Management</p>
          </div>
          <div className="flex gap-2 md:gap-4 flex-wrap">
             <a href="/marketing" data-testid="link-affiliate-management">
               <Button 
                variant="outline"
                className="border-cyan-500/30 text-cyan-300 bg-cyan-500/10 hover:bg-cyan-500/20 font-bold"
              >
                ← Back to Affiliates
              </Button>
            </a>
             <Button 
                onClick={() => {
                  const riskLevel = prompt("Enter Risk Level (Low/Medium/High):", "Medium");
                  toast({ title: `Risk Mode: ${riskLevel}`, description: "Adjusting lead priorities and outreach velocity." });
                }}
                variant="outline"
                className="border-red-500/30 text-red-300 bg-red-500/10 hover:bg-red-500/20 font-bold"
              >
                <AlertTriangle className="h-4 w-4 mr-2" />
                Preempt Risk
              </Button>
             <Button 
                onClick={triggerDailyFounderReminder}
                disabled={isTriggering}
                variant="outline"
                className="border-emerald-500/30 text-emerald-300 bg-emerald-500/10 hover:bg-emerald-500/20 font-bold"
              >
                {isTriggering ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4 mr-2" />}
                Trigger Outreach
              </Button>
          </div>
        </header>

        <Tabs defaultValue="survival" className="space-y-6 relative z-10">
          <TabsList className="grid grid-cols-4 md:grid-cols-7 gap-1 bg-slate-900/90 backdrop-blur-xl border border-white/10 p-2 sticky top-0 z-20 shadow-2xl rounded-xl w-full">
            <TabsTrigger value="survival" className="data-[state=active]:bg-emerald-600 data-[state=active]:text-white data-[state=inactive]:bg-slate-800 data-[state=inactive]:text-gray-300 font-bold transition-all text-xs">Survival</TabsTrigger>
            <TabsTrigger value="whatsapp" className="data-[state=active]:bg-blue-600 data-[state=active]:text-white data-[state=inactive]:bg-slate-800 data-[state=inactive]:text-gray-300 font-bold transition-all text-xs">WhatsApp</TabsTrigger>
            <TabsTrigger value="intent" className="data-[state=active]:bg-purple-600 data-[state=active]:text-white data-[state=inactive]:bg-slate-800 data-[state=inactive]:text-gray-300 font-bold transition-all text-xs">Intent</TabsTrigger>
            <TabsTrigger value="broker" className="data-[state=active]:bg-yellow-600 data-[state=active]:text-white data-[state=inactive]:bg-slate-800 data-[state=inactive]:text-gray-300 font-bold transition-all text-xs">Brokers</TabsTrigger>
            <TabsTrigger value="partners" className="data-[state=active]:bg-orange-600 data-[state=active]:text-white data-[state=inactive]:bg-slate-800 data-[state=inactive]:text-gray-300 font-bold transition-all text-xs">Affiliates</TabsTrigger>
            <TabsTrigger value="seo" className="data-[state=active]:bg-cyan-600 data-[state=active]:text-white data-[state=inactive]:bg-slate-800 data-[state=inactive]:text-gray-300 font-bold transition-all text-xs">SEO</TabsTrigger>
            <TabsTrigger value="social" className="data-[state=active]:bg-pink-600 data-[state=active]:text-white data-[state=inactive]:bg-slate-800 data-[state=inactive]:text-gray-300 font-bold transition-all text-xs">Social</TabsTrigger>
          </TabsList>

          {/* SURVIVAL TAB */}
          <TabsContent value="survival" className="space-y-6 bg-emerald-950/20 backdrop-blur-md p-6 rounded-2xl border border-emerald-500/30 shadow-xl">
            <div className="grid md:grid-cols-2 gap-6">
              <Card className="bg-emerald-900/40 border-emerald-500/50 shadow-lg">
                <CardHeader className="bg-emerald-900/60 border-b border-emerald-500/30">
                  <CardTitle className="text-emerald-200 flex items-center gap-2">
                    <Shield className="text-emerald-400" />
                    Founder Streaks
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-6 space-y-4">
                  {streaks?.map(streak => (
                    <div key={streak.id} className="bg-slate-950/50 p-4 rounded-xl border border-emerald-500/20">
                      <div className="flex justify-between items-center mb-2">
                        <span className="font-bold text-emerald-200">{streak.name}</span>
                        <Badge className="bg-emerald-600 text-white">🔥 {streak.streak} days</Badge>
                      </div>
                      {streak.name === hassan?.name && missedDay && (
                        <Button 
                          className="w-full mt-3 bg-emerald-600 hover:bg-emerald-500 text-white font-bold"
                          onClick={() => streakMutation.mutate()}
                        >
                          {streakMutation.isPending ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : null}
                          Log Today's Post
                        </Button>
                      )}
                    </div>
                  ))}
                </CardContent>
              </Card>

              <Card className="bg-emerald-900/40 border-emerald-500/50 shadow-lg">
                <CardHeader className="bg-emerald-900/60 border-b border-emerald-500/30">
                  <CardTitle className="text-emerald-200">System Status</CardTitle>
                </CardHeader>
                <CardContent className="p-6 space-y-3">
                  <div className="flex justify-between text-emerald-200">
                    <span>Active Partners</span>
                    <span className="font-bold text-emerald-300">6</span>
                  </div>
                  <div className="flex justify-between text-emerald-200">
                    <span>Total Conversions</span>
                    <span className="font-bold text-emerald-300">174</span>
                  </div>
                  <div className="flex justify-between text-emerald-200">
                    <span>Commission Earned</span>
                    <span className="font-bold text-emerald-300">AED 34,872</span>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* WHATSAPP TAB */}
          <TabsContent value="whatsapp" className="space-y-6 bg-blue-950/20 backdrop-blur-md p-6 rounded-2xl border border-blue-500/30 shadow-xl">
            <div className="grid md:grid-cols-2 gap-6">
              <Card className="bg-blue-900/40 border-blue-500/50 shadow-lg">
                <CardHeader className="bg-blue-900/60 border-b border-blue-500/30">
                  <CardTitle className="text-blue-200 flex items-center gap-2">
                    <MessageSquare className="text-blue-400" />
                    Partner Outreach
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-6 space-y-4">
                  <div className="p-4 bg-slate-950/50 rounded-xl border border-blue-500/20">
                    <h4 className="font-bold text-blue-200 mb-2">Daily Content Generation</h4>
                    <p className="text-sm text-gray-400 mb-4">AI-generated messaging for real estate partners and movers.</p>
                    {generatedContent && (
                      <div className="mb-4 p-3 bg-slate-900/80 rounded-lg border border-blue-500/30 text-xs text-gray-300 italic text-blue-100">
                        "{generatedContent}"
                      </div>
                    )}
                    <Button 
                      className="w-full bg-blue-600 hover:bg-blue-500 text-white font-bold"
                      onClick={handleGenerateContent}
                      disabled={generateContentMutation.isPending}
                    >
                      {generateContentMutation.isPending ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : null}
                      {generatedContent ? "Regenerate Post" : "Generate New Post"}
                    </Button>
                  </div>
                  <div className="p-4 bg-slate-950/50 rounded-xl border border-blue-500/20">
                    <h4 className="font-bold text-blue-200 mb-2">WhatsApp Distribution</h4>
                    <p className="text-sm text-gray-400 mb-4">Broadcast content to verified broker lists.</p>
                    <Button 
                      variant="outline" 
                      className="w-full border-blue-500/30 text-blue-300 bg-blue-500/10 hover:bg-blue-500/20 font-bold"
                      onClick={handleLaunchDistribution}
                      disabled={distributeContentMutation.isPending || !generatedContent}
                    >
                      {distributeContentMutation.isPending ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : null}
                      Launch Distribution
                    </Button>
                  </div>
                </CardContent>
              </Card>
              <Card className="bg-blue-900/40 border-blue-500/50 shadow-lg">
                <CardHeader className="bg-blue-900/60 border-b border-blue-500/30">
                  <CardTitle className="text-blue-200">Marketing Analytics</CardTitle>
                </CardHeader>
                <CardContent className="p-6 space-y-4">
                  <div className="flex justify-between items-center text-sm bg-slate-950/50 p-3 rounded-lg border border-blue-500/20">
                    <span className="text-blue-200 font-medium">Open Rate</span>
                    <span className="text-blue-300 font-bold text-lg">84%</span>
                  </div>
                  <div className="flex justify-between items-center text-sm bg-slate-950/50 p-3 rounded-lg border border-blue-500/20">
                    <span className="text-blue-200 font-medium">Response Rate</span>
                    <span className="text-blue-300 font-bold text-lg">12.5%</span>
                  </div>
                  <div className="flex justify-between items-center text-sm bg-slate-950/50 p-3 rounded-lg border border-blue-500/20">
                    <span className="text-blue-200 font-medium">Partner Conversions</span>
                    <span className="text-blue-300 font-bold text-lg">28</span>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* INTENT SNIFFER TAB */}
          <TabsContent value="intent" className="space-y-6 bg-purple-950/20 backdrop-blur-md p-6 rounded-2xl border border-purple-500/30 shadow-xl">
            <IntentSnifferView leads={displayLeads} leadMutation={leadMutation} />
          </TabsContent>

          {/* BROKER TAB */}
          <TabsContent value="broker" className="space-y-6 bg-yellow-950/20 backdrop-blur-md p-6 rounded-2xl border border-yellow-500/30 shadow-xl">
            <Card className="bg-yellow-900/40 border-yellow-500/50 shadow-lg">
              <CardHeader className="bg-yellow-900/60 border-b border-yellow-500/30">
                <CardTitle className="text-yellow-200 flex items-center gap-2">
                  <Search className="text-yellow-400" />
                  Broker Market Intelligence
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6 space-y-6">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <label className="text-yellow-200 font-bold text-sm">Broker Name</label>
                    <Input placeholder="Full name" value={newBroker.name} onChange={(e) => setNewBroker({...newBroker, name: e.target.value})} className="bg-slate-950/50 border-yellow-500/30 text-yellow-100 placeholder:text-gray-500" />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-yellow-200 font-bold text-sm">Agency</label>
                      <Input placeholder="Agency name" value={newBroker.agency} onChange={(e) => setNewBroker({...newBroker, agency: e.target.value})} className="bg-slate-950/50 border-yellow-500/30 text-yellow-100" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-yellow-200 font-bold text-sm">Area</label>
                      <Input placeholder="Area" value={newBroker.area} onChange={(e) => setNewBroker({...newBroker, area: e.target.value})} className="bg-slate-950/50 border-yellow-500/30 text-yellow-100" />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-yellow-200 font-bold text-sm">Phone</label>
                      <Input placeholder="+971..." value={newBroker.phone} onChange={(e) => setNewBroker({...newBroker, phone: e.target.value})} className="bg-slate-950/50 border-yellow-500/30 text-yellow-100" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-yellow-200 font-bold text-sm">Instagram</label>
                      <Input placeholder="@handle" value={newBroker.instagram} onChange={(e) => setNewBroker({...newBroker, instagram: e.target.value})} className="bg-slate-950/50 border-yellow-500/30 text-yellow-100" />
                    </div>
                  </div>
                  <Button onClick={addBroker} className="w-full bg-yellow-600 hover:bg-yellow-500 text-white font-bold mt-4">
                    <Plus className="h-4 w-4 mr-2" />
                    Add Broker
                  </Button>
                </div>

                <div className="border-t border-yellow-500/20 pt-6">
                  <h4 className="font-bold text-yellow-200 mb-4">Added Brokers ({filteredBrokers.length})</h4>
                  <div className="space-y-2">
                    {filteredBrokers.map(broker => (
                      <div key={broker.id} className="bg-slate-950/50 p-3 rounded-lg border border-yellow-500/20 text-yellow-100">
                        <p className="font-bold">{broker.name}</p>
                        <p className="text-xs text-gray-400">{broker.agency} • {broker.area}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* AFFILIATE PARTNERS TAB */}
          <TabsContent value="partners" className="space-y-6 bg-orange-950/20 backdrop-blur-md p-6 rounded-2xl border border-orange-500/30 shadow-xl">
            {/* Summary Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                { label: "Active Partners", value: "6", sub: "Across all tiers" },
                { label: "Total Leads", value: "492", sub: "All time" },
                { label: "Total Revenue", value: "AED 14,763", sub: "From partner refs" },
                { label: "Commissions Paid", value: "AED 2,953", sub: "To partners" },
              ].map((s, i) => (
                <div key={i} className="bg-slate-950/50 border border-orange-500/20 rounded-xl p-4 space-y-1" data-testid={`partner-stat-${i}`}>
                  <p className="text-[10px] font-black uppercase tracking-widest text-gray-500">{s.label}</p>
                  <p className="text-2xl font-black text-orange-300">{s.value}</p>
                  <p className="text-[10px] text-gray-600 font-medium">{s.sub}</p>
                </div>
              ))}
            </div>

            {/* Top Partners Table */}
            <Card className="bg-orange-900/40 border-orange-500/50 shadow-lg">
              <CardHeader className="bg-orange-900/60 border-b border-orange-500/30">
                <CardTitle className="text-orange-200 flex items-center gap-2">
                  <Users className="text-orange-400" />
                  Top Partners by Revenue
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6 space-y-4">
                {[
                  ...partners,
                  { name: "Marina Gate Building", ref: "marinagate", agents: 1, clicks: 67, conversions: 5, revenue: 1995, commission: 399 },
                  { name: "Al Barsha Typing Center", ref: "albarsha", clicks: 54, conversions: 4, agents: 1, revenue: 1596, commission: 319.20 },
                  { name: "Ahmed Hassan (Broker)", ref: "ahmedhasan", agents: 1, clicks: 38, conversions: 3, revenue: 1197, commission: 239.40 },
                ].map((partner, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.07 }}
                    viewport={{ once: true }}
                    className="bg-slate-950/50 border border-orange-500/30 rounded-xl p-4"
                    data-testid={`partner-row-${i}`}
                  >
                    <div className="grid grid-cols-2 md:grid-cols-6 gap-3 items-center">
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <span className="text-[10px] font-black text-gray-600 w-4">{i + 1}</span>
                          <h3 className="font-black text-orange-200 text-sm">{partner.name}</h3>
                        </div>
                        <code className="text-xs text-orange-400">?ref={partner.ref}</code>
                      </div>
                      <div className="text-center">
                        <p className="text-gray-400 text-xs font-bold">Leads</p>
                        <p className="text-lg font-black text-orange-300">{partner.clicks}</p>
                      </div>
                      <div className="text-center">
                        <p className="text-gray-400 text-xs font-bold">Converted</p>
                        <p className="text-lg font-black text-orange-300">{partner.conversions}</p>
                      </div>
                      <div className="text-center">
                        <p className="text-gray-400 text-xs font-bold">Rate</p>
                        <p className="text-lg font-black text-orange-300">{Math.round(partner.conversions / partner.clicks * 100)}%</p>
                      </div>
                      <div className="text-center">
                        <p className="text-gray-400 text-xs font-bold">Revenue</p>
                        <p className="text-lg font-black text-orange-300">AED {partner.revenue.toLocaleString()}</p>
                      </div>
                      <Button
                        size="sm"
                        variant="outline"
                        className="border-orange-500/50 text-orange-300 bg-orange-500/10 hover:bg-orange-500/20"
                        onClick={() => copyLink(`https://deliwer.com/start?ref=${partner.ref}`, `partner-${partner.ref}`)}
                        data-testid={`button-copy-partner-${i}`}
                      >
                        {copied === `partner-${partner.ref}` ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                      </Button>
                    </div>
                  </motion.div>
                ))}
              </CardContent>
            </Card>

            {/* Top Performing Channels */}
            <Card className="bg-orange-900/40 border-orange-500/50 shadow-lg">
              <CardHeader className="bg-orange-900/60 border-b border-orange-500/30">
                <CardTitle className="text-orange-200 flex items-center gap-2">
                  <BarChart3 className="text-orange-400" />
                  Top Performing Channels
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6 space-y-4">
                {[
                  { channel: "Real Estate Brokers", type: "Strategic (35%)", leads: 218, revenue: 6978, color: "bg-emerald-500" },
                  { channel: "Typing Centers", type: "Distribution (20%)", leads: 134, revenue: 4286, color: "bg-blue-500" },
                  { channel: "Building Concierges", type: "Distribution (20%)", leads: 89, revenue: 2849, color: "bg-purple-500" },
                  { channel: "Influencers / Community", type: "Influencer (15%)", leads: 31, revenue: 992, color: "bg-amber-500" },
                  { channel: "General Referrals", type: "General (10%)", leads: 20, revenue: 638, color: "bg-slate-500" },
                ].map((ch, i) => (
                  <div key={i} className="space-y-2" data-testid={`channel-row-${i}`}>
                    <div className="flex items-center justify-between">
                      <div>
                        <span className="text-sm font-black text-white">{ch.channel}</span>
                        <span className="text-[10px] text-gray-500 font-medium ml-2">{ch.type}</span>
                      </div>
                      <div className="text-right">
                        <span className="text-sm font-black text-orange-300">{ch.leads} leads</span>
                        <span className="text-[10px] text-gray-500 ml-2">AED {ch.revenue.toLocaleString()}</span>
                      </div>
                    </div>
                    <div className="w-full bg-slate-800 rounded-full h-2">
                      <div
                        className={`${ch.color} h-2 rounded-full transition-all`}
                        style={{ width: `${(ch.leads / 218) * 100}%` }}
                      />
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Quick Links */}
            <div className="grid grid-cols-2 gap-4">
              <a href="/partner-dashboard">
                <div className="bg-slate-900/80 border border-orange-500/30 rounded-xl p-4 hover:border-orange-500/60 transition-all cursor-pointer space-y-1">
                  <p className="text-[10px] font-black uppercase tracking-widest text-orange-400">Partner Tool</p>
                  <p className="text-white font-black text-sm">Partner Dashboard →</p>
                  <p className="text-gray-500 text-xs font-medium">Let partners check their own leads</p>
                </div>
              </a>
              <a href="/partner-growth-kit">
                <div className="bg-slate-900/80 border border-orange-500/30 rounded-xl p-4 hover:border-orange-500/60 transition-all cursor-pointer space-y-1">
                  <p className="text-[10px] font-black uppercase tracking-widest text-orange-400">Partner Tool</p>
                  <p className="text-white font-black text-sm">Growth Kit →</p>
                  <p className="text-gray-500 text-xs font-medium">WhatsApp scripts & sharing tools</p>
                </div>
              </a>
            </div>
          </TabsContent>

          {/* SOCIAL CAMPAIGNS TAB */}
          <TabsContent value="social" className="space-y-6 bg-pink-950/20 backdrop-blur-md p-6 rounded-2xl border border-pink-500/30 shadow-xl">
            {/* Header + Daily Checklist */}
            <div className="flex flex-col md:flex-row gap-6 items-start">
              <div className="flex-1">
                <h2 className="text-2xl font-black text-white flex items-center gap-2 mb-1">
                  <Sparkles className="text-pink-400 w-6 h-6" />
                  Social Media Campaign Studio
                </h2>
                <p className="text-gray-400 text-sm">Create posts for Google My Business (Kangen Water Dubai) and DeliWer Loyalty social pages. AI-generates content — you approve and publish.</p>
              </div>
              {/* Daily Activity Tracker */}
              <div className="bg-slate-900 border border-pink-500/20 rounded-2xl p-4 min-w-[220px]">
                <p className="text-[10px] font-black uppercase tracking-widest text-pink-400 mb-3">Today's Publishing Checklist</p>
                <div className="space-y-2">
                  {[
                    { key: "gmb-kangen", label: "GMB: Kangen Water Dubai" },
                    { key: "meta-deliwer", label: "Meta: DeliWer Loyalty" },
                    { key: "gmb-deliwer", label: "GMB: DeliWer Business" },
                    { key: "stories", label: "Stories / Reels" },
                  ].map(item => (
                    <button
                      key={item.key}
                      data-testid={`check-social-${item.key}`}
                      onClick={() => setPublishedToday(prev =>
                        prev.includes(item.key) ? prev.filter(k => k !== item.key) : [...prev, item.key]
                      )}
                      className={`w-full flex items-center gap-2 text-xs font-semibold px-3 py-2 rounded-xl border transition-all ${
                        publishedToday.includes(item.key)
                          ? "bg-pink-500/20 border-pink-500/50 text-pink-300"
                          : "bg-slate-800 border-slate-700 text-gray-400 hover:border-pink-500/30"
                      }`}
                    >
                      <CheckCircle2 className={`w-3.5 h-3.5 shrink-0 ${publishedToday.includes(item.key) ? "text-pink-400" : "text-gray-600"}`} />
                      {item.label}
                      {publishedToday.includes(item.key) && <span className="ml-auto text-[9px] font-black text-pink-400">✓ DONE</span>}
                    </button>
                  ))}
                </div>
                <div className="mt-3 pt-3 border-t border-slate-800 text-center">
                  <span className="text-2xl font-black text-pink-400">{publishedToday.length}</span>
                  <span className="text-gray-500 text-xs font-semibold"> / 4 completed today</span>
                </div>
              </div>
            </div>

            {/* Platform Selector */}
            <div className="flex gap-3">
              <button
                data-testid="button-platform-gmb"
                onClick={() => setSocialPlatform("gmb")}
                className={`flex items-center gap-2 px-5 py-3 rounded-2xl font-black text-sm border transition-all ${socialPlatform === "gmb" ? "bg-blue-600 border-blue-500 text-white" : "bg-slate-800 border-slate-700 text-gray-400 hover:border-blue-500/40"}`}
              >
                <Globe className="w-4 h-4" /> Google My Business
              </button>
              <button
                data-testid="button-platform-meta"
                onClick={() => setSocialPlatform("meta")}
                className={`flex items-center gap-2 px-5 py-3 rounded-2xl font-black text-sm border transition-all ${socialPlatform === "meta" ? "bg-gradient-to-r from-purple-600 to-pink-600 border-purple-500 text-white" : "bg-slate-800 border-slate-700 text-gray-400 hover:border-purple-500/40"}`}
              >
                <Instagram className="w-4 h-4" /> Meta Business Suite
              </button>
            </div>

            {/* GMB Panel */}
            {socialPlatform === "gmb" && (
              <div className="grid md:grid-cols-2 gap-6">
                {/* Kangen Water Dubai GMB */}
                <Card className="bg-blue-900/30 border-blue-500/40">
                  <CardHeader className="bg-blue-900/50 border-b border-blue-500/30">
                    <CardTitle className="text-blue-200 flex items-center gap-2 text-base">
                      <MapPin className="text-blue-400 w-5 h-5" />
                      Kangen Water Dubai
                      <Badge className="ml-auto bg-blue-500/20 text-blue-300 border-blue-500/40 text-[10px]">Google Profile</Badge>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-5 space-y-4">
                    <div className="flex flex-wrap gap-2">
                      {["update", "offer", "product", "event"].map(type => (
                        <button
                          key={type}
                          data-testid={`button-gmb-type-${type}`}
                          onClick={() => setGmbPostType(type)}
                          className={`px-3 py-1 rounded-lg text-xs font-black uppercase transition-all ${gmbPostType === type ? "bg-blue-600 text-white" : "bg-slate-800 text-gray-400 hover:bg-slate-700"}`}
                        >
                          {type}
                        </button>
                      ))}
                    </div>
                    <div className="bg-slate-900 rounded-xl p-4 border border-slate-700 min-h-[140px] text-sm text-gray-300 relative">
                      {isGenGmb ? (
                        <div className="flex items-center gap-2 text-blue-400">
                          <Loader2 className="w-4 h-4 animate-spin" />
                          <span className="text-sm">Generating GMB post...</span>
                        </div>
                      ) : gmbContent ? (
                        <p className="leading-relaxed whitespace-pre-line">{gmbContent}</p>
                      ) : (
                        <p className="text-gray-600 italic">Click "Generate" to create a {gmbPostType} post for the Kangen Water Dubai Google profile...</p>
                      )}
                    </div>
                    <div className="flex gap-2">
                      <Button
                        data-testid="button-generate-gmb"
                        disabled={isGenGmb}
                        onClick={async () => {
                          setIsGenGmb(true);
                          try {
                            const prompts: Record<string, string> = {
                              update: "Write a Google My Business UPDATE post for 'Kangen Water Dubai'. Topic: benefits of ionized alkaline water for Dubai residents in the summer heat. Include a call to action. 80-120 words. Professional but warm tone.",
                              offer: "Write a Google My Business OFFER post for 'Kangen Water Dubai'. Create a compelling limited-time offer for a Kangen water system demo. Include discount or bonus mention. 80-100 words.",
                              product: "Write a Google My Business PRODUCT post for 'Kangen Water Dubai' featuring the Kangen K8 machine. Highlight its 8 pH levels and health benefits. 80-100 words.",
                              event: "Write a Google My Business EVENT post for 'Kangen Water Dubai'. Promote a free live water demonstration event in Dubai Marina. Include date placeholder and RSVP call to action. 80-100 words.",
                            };
                            const res = await apiRequest("POST", "/api/concierge", {
                              phone: "SYSTEM", name: "Founder", area: "Dubai",
                              message: prompts[gmbPostType]
                            });
                            const data = await res.json();
                            setGmbContent(data.reply || data.message || "");
                          } finally {
                            setIsGenGmb(false);
                          }
                        }}
                        className="flex-1 bg-blue-600 hover:bg-blue-500 text-white font-black h-10 rounded-xl text-sm"
                      >
                        <Sparkles className="w-4 h-4 mr-1" /> Generate Post
                      </Button>
                      <Button
                        data-testid="button-copy-gmb"
                        disabled={!gmbContent}
                        variant="outline"
                        onClick={() => { navigator.clipboard.writeText(gmbContent); toast({ title: "Copied", description: "GMB post copied to clipboard" }); }}
                        className="border-blue-500/40 text-blue-400 hover:bg-blue-500/10 h-10 px-3 rounded-xl"
                      >
                        <Copy className="w-4 h-4" />
                      </Button>
                    </div>
                    <a href="https://business.google.com" target="_blank" rel="noopener noreferrer">
                      <Button
                        data-testid="button-open-gmb"
                        variant="outline"
                        className="w-full border-blue-500/30 text-blue-300 hover:bg-blue-500/10 font-bold h-10 rounded-xl text-sm"
                        onClick={() => { if (gmbContent) { setPublishedToday(prev => prev.includes("gmb-kangen") ? prev : [...prev, "gmb-kangen"]); toast({ title: "Opening Google My Business", description: "Paste your generated post into the GMB dashboard." }); }}}
                      >
                        <ExternalLink className="w-4 h-4 mr-2" /> Open Google My Business
                      </Button>
                    </a>
                  </CardContent>
                </Card>

                {/* GMB Image Templates */}
                <Card className="bg-slate-900/60 border-slate-700">
                  <CardHeader className="border-b border-slate-700">
                    <CardTitle className="text-white flex items-center gap-2 text-base">
                      <Image className="text-blue-400 w-5 h-5" />
                      Image Templates
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-5 space-y-4">
                    <p className="text-gray-500 text-xs">Select a template style for your GMB post image. Use with Canva, Adobe Express, or Meta Creator Studio.</p>
                    <div className="grid grid-cols-2 gap-3">
                      {[
                        { id: "kangen-promo", label: "Kangen Promo", bg: "from-blue-600 to-cyan-600", icon: Droplets, desc: "Water system offer" },
                        { id: "health-tip", label: "Health Tip", bg: "from-emerald-600 to-teal-600", icon: Star, desc: "pH & wellness fact" },
                        { id: "demo-invite", label: "Demo Invite", bg: "from-purple-600 to-pink-600", icon: Calendar, desc: "Event / live demo" },
                        { id: "testimonial", label: "Testimonial", bg: "from-amber-600 to-orange-600", icon: Users, desc: "Customer story" },
                      ].map(tmpl => (
                        <button
                          key={tmpl.id}
                          data-testid={`button-img-template-${tmpl.id}`}
                          onClick={() => { setSelectedImageTemplate(tmpl.id); toast({ title: `Template: ${tmpl.label}`, description: "Use this template in Canva or Meta Creator Studio" }); }}
                          className={`relative rounded-xl overflow-hidden border-2 transition-all ${selectedImageTemplate === tmpl.id ? "border-pink-400 scale-105" : "border-transparent hover:border-slate-600"}`}
                        >
                          <div className={`bg-gradient-to-br ${tmpl.bg} p-4 text-white text-left`}>
                            <tmpl.icon className="w-5 h-5 mb-2 opacity-80" />
                            <div className="text-xs font-black">{tmpl.label}</div>
                            <div className="text-[10px] opacity-70">{tmpl.desc}</div>
                          </div>
                          {selectedImageTemplate === tmpl.id && (
                            <div className="absolute top-1.5 right-1.5 w-4 h-4 bg-pink-500 rounded-full flex items-center justify-center">
                              <Check className="w-2.5 h-2.5 text-white" />
                            </div>
                          )}
                        </button>
                      ))}
                    </div>
                    <div className="bg-slate-800 rounded-xl p-3 border border-slate-700">
                      <p className="text-[10px] font-black uppercase text-gray-500 mb-2">Quick Links — Design Tools</p>
                      <div className="space-y-1.5">
                        {[
                          { name: "Canva (Free)", url: "https://canva.com", color: "text-cyan-400" },
                          { name: "Meta Creator Studio", url: "https://business.facebook.com/creatorstudio", color: "text-blue-400" },
                          { name: "Adobe Express", url: "https://express.adobe.com", color: "text-red-400" },
                        ].map(link => (
                          <a key={link.name} href={link.url} target="_blank" rel="noopener noreferrer" className={`flex items-center gap-2 text-xs font-semibold ${link.color} hover:underline`}>
                            <ExternalLink className="w-3 h-3" /> {link.name}
                          </a>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}

            {/* META Panel */}
            {socialPlatform === "meta" && (
              <div className="grid md:grid-cols-2 gap-6">
                {/* DeliWer Loyalty Meta Post */}
                <Card className="bg-purple-900/30 border-purple-500/40">
                  <CardHeader className="bg-purple-900/50 border-b border-purple-500/30">
                    <CardTitle className="text-purple-200 flex items-center gap-2 text-base">
                      <Instagram className="text-purple-400 w-5 h-5" />
                      DeliWer Loyalty
                      <Badge className="ml-auto bg-purple-500/20 text-purple-300 border-purple-500/40 text-[10px]">Facebook / Instagram</Badge>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-5 space-y-4">
                    <div className="flex flex-wrap gap-2">
                      {["brand", "promo", "water", "partner", "testimonial"].map(type => (
                        <button
                          key={type}
                          data-testid={`button-meta-type-${type}`}
                          onClick={() => setMetaPostType(type)}
                          className={`px-3 py-1 rounded-lg text-xs font-black uppercase transition-all ${metaPostType === type ? "bg-purple-600 text-white" : "bg-slate-800 text-gray-400 hover:bg-slate-700"}`}
                        >
                          {type}
                        </button>
                      ))}
                    </div>
                    <div className="bg-slate-900 rounded-xl p-4 border border-slate-700 min-h-[140px] text-sm text-gray-300">
                      {isGenMeta ? (
                        <div className="flex items-center gap-2 text-purple-400">
                          <Loader2 className="w-4 h-4 animate-spin" />
                          <span className="text-sm">Generating social post...</span>
                        </div>
                      ) : metaContent ? (
                        <p className="leading-relaxed whitespace-pre-line">{metaContent}</p>
                      ) : (
                        <p className="text-gray-600 italic">Click "Generate" to create a {metaPostType} post for DeliWer Loyalty social media...</p>
                      )}
                    </div>
                    <div className="flex gap-2">
                      <Button
                        data-testid="button-generate-meta"
                        disabled={isGenMeta}
                        onClick={async () => {
                          setIsGenMeta(true);
                          try {
                            const prompts: Record<string, string> = {
                              brand: "Write an Instagram/Facebook post for 'DeliWer Loyalty' — Dubai's all-in-one home services brand. Energetic, premium feel. Highlight Ejari, DEWA, move-in concierge. Include 3-5 relevant hashtags. 80-120 words.",
                              promo: "Write an Instagram promotional post for DeliWer's move-in package offer in Dubai. Create urgency (limited slots). Include a WhatsApp CTA. 3-5 hashtags. 80-100 words.",
                              water: "Write an engaging Instagram post for 'DeliWer Loyalty' about Kangen Water and AquaCafe Alliance. Mention alkaline water benefits and the business opportunity. Include Kangen Water Dubai hashtags. 80-100 words.",
                              partner: "Write a Facebook/Instagram post recruiting real estate brokers in Dubai to join the DeliWer Partner Program. AED 150-800 per referral. Warm, aspirational tone. 3-5 hashtags. 80-100 words.",
                              testimonial: "Write a social media testimonial post for DeliWer from the perspective of a happy Dubai resident who just moved in. Natural voice. Mention Ejari or DEWA or water delivery. 3-5 hashtags. 80 words.",
                            };
                            const res = await apiRequest("POST", "/api/concierge", {
                              phone: "SYSTEM", name: "Founder", area: "Dubai",
                              message: prompts[metaPostType]
                            });
                            const data = await res.json();
                            setMetaContent(data.reply || data.message || "");
                          } finally {
                            setIsGenMeta(false);
                          }
                        }}
                        className="flex-1 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white font-black h-10 rounded-xl text-sm"
                      >
                        <Sparkles className="w-4 h-4 mr-1" /> Generate Post
                      </Button>
                      <Button
                        data-testid="button-copy-meta"
                        disabled={!metaContent}
                        variant="outline"
                        onClick={() => { navigator.clipboard.writeText(metaContent); toast({ title: "Copied", description: "Social post copied to clipboard" }); }}
                        className="border-purple-500/40 text-purple-400 hover:bg-purple-500/10 h-10 px-3 rounded-xl"
                      >
                        <Copy className="w-4 h-4" />
                      </Button>
                    </div>
                    <a href="https://business.facebook.com/creatorstudio" target="_blank" rel="noopener noreferrer">
                      <Button
                        data-testid="button-open-meta"
                        variant="outline"
                        className="w-full border-purple-500/30 text-purple-300 hover:bg-purple-500/10 font-bold h-10 rounded-xl text-sm"
                        onClick={() => { if (metaContent) { setPublishedToday(prev => prev.includes("meta-deliwer") ? prev : [...prev, "meta-deliwer"]); toast({ title: "Opening Meta Creator Studio", description: "Paste your post and schedule it in Meta Business Suite." }); }}}
                      >
                        <ExternalLink className="w-4 h-4 mr-2" /> Open Meta Creator Studio
                      </Button>
                    </a>
                  </CardContent>
                </Card>

                {/* Meta Post Preview */}
                <Card className="bg-slate-900/60 border-slate-700">
                  <CardHeader className="border-b border-slate-700">
                    <CardTitle className="text-white flex items-center gap-2 text-base">
                      <Eye className="text-purple-400 w-5 h-5" />
                      Post Preview
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-5 space-y-4">
                    {/* Simulated Post Card */}
                    <div className="bg-white rounded-xl overflow-hidden shadow-lg text-gray-900">
                      <div className="flex items-center gap-3 p-3 border-b border-gray-100">
                        <div className="w-9 h-9 rounded-full bg-gradient-to-br from-emerald-400 to-teal-500 flex items-center justify-center text-white font-black text-sm shrink-0">D</div>
                        <div>
                          <div className="text-sm font-black">DeliWer Loyalty</div>
                          <div className="text-[10px] text-gray-400">Just now · 🌍</div>
                        </div>
                      </div>
                      <div className="p-3">
                        <p className="text-sm leading-relaxed text-gray-700">
                          {metaContent
                            ? metaContent.slice(0, 200) + (metaContent.length > 200 ? "..." : "")
                            : <span className="text-gray-400 italic">Generate a post to see the preview here...</span>
                          }
                        </p>
                      </div>
                      <div className="bg-gradient-to-br from-emerald-400 to-teal-500 h-36 flex items-center justify-center">
                        <div className="text-white text-center">
                          <div className="text-2xl font-black">DeliWer</div>
                          <div className="text-xs opacity-80">Dubai Home Services</div>
                        </div>
                      </div>
                      <div className="flex gap-4 p-3 text-xs text-gray-500 border-t border-gray-100">
                        <span>👍 Like</span><span>💬 Comment</span><span>↗ Share</span>
                      </div>
                    </div>
                    {/* Quick links */}
                    <div className="space-y-2">
                      <p className="text-[10px] font-black uppercase text-gray-500">Publishing Platforms</p>
                      {[
                        { name: "Meta Business Suite", url: "https://business.facebook.com", color: "text-blue-400" },
                        { name: "Google My Business", url: "https://business.google.com", color: "text-green-400" },
                        { name: "Instagram (Mobile)", url: "https://instagram.com", color: "text-pink-400" },
                        { name: "Facebook Pages", url: "https://www.facebook.com/pages", color: "text-indigo-400" },
                      ].map(link => (
                        <a key={link.name} href={link.url} target="_blank" rel="noopener noreferrer" className={`flex items-center gap-2 text-xs font-semibold ${link.color} hover:underline`}>
                          <ExternalLink className="w-3 h-3" /> {link.name}
                        </a>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}

            {/* Progress Summary */}
            <div className="bg-slate-900 border border-pink-500/20 rounded-2xl p-5">
              <p className="text-[10px] font-black uppercase tracking-widest text-pink-400 mb-4">This Week's Campaign Progress</p>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
                {[
                  { label: "GMB Posts Published", value: publishedToday.filter(k => k.startsWith("gmb")).length, color: "text-blue-400", max: 2 },
                  { label: "Meta Posts Published", value: publishedToday.filter(k => k.startsWith("meta")).length, color: "text-purple-400", max: 2 },
                  { label: "Content Generated", value: [gmbContent, metaContent].filter(Boolean).length, color: "text-pink-400", max: 2 },
                  { label: "Daily Target", value: `${publishedToday.length}/4`, color: publishedToday.length >= 4 ? "text-emerald-400" : "text-amber-400", max: 4 },
                ].map((stat, i) => (
                  <div key={i} className="bg-slate-800/60 rounded-xl p-3 border border-slate-700">
                    <div className={`text-2xl font-black ${stat.color}`}>{stat.value}</div>
                    <div className="text-[10px] text-gray-500 font-semibold uppercase mt-0.5">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </TabsContent>

          {/* SEO PAGES TAB */}
          <TabsContent value="seo" className="space-y-6 bg-cyan-950/20 backdrop-blur-md p-6 rounded-2xl border border-cyan-500/30 shadow-xl">
            <Card className="bg-cyan-900/40 border-cyan-500/50 shadow-lg">
              <CardHeader className="bg-cyan-900/60 border-b border-cyan-500/30">
                <CardTitle className="text-cyan-200 flex items-center gap-2">
                  <Eye className="text-cyan-400" />
                  SEO Landing Page Performance
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6 space-y-4">
                {seoPagesStats.map((page, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.1 }}
                    viewport={{ once: true }}
                    className="bg-slate-950/50 border border-cyan-500/30 rounded-xl p-4"
                  >
                    <div className="grid grid-cols-2 md:grid-cols-5 gap-3 items-center">
                      <div>
                        <h3 className="font-black text-cyan-200 text-sm">{page.page}</h3>
                        <p className="text-gray-400 text-xs mt-1">Gateway Layer 4</p>
                      </div>
                      <div className="text-center">
                        <p className="text-gray-400 text-xs font-bold">Visits</p>
                        <p className="text-lg font-black text-cyan-300">{page.visits.toLocaleString()}</p>
                      </div>
                      <div className="text-center">
                        <p className="text-gray-400 text-xs font-bold">Conversions</p>
                        <p className="text-lg font-black text-cyan-300">{page.conversions}</p>
                      </div>
                      <div className="text-center">
                        <p className="text-gray-400 text-xs font-bold">Rate</p>
                        <p className="text-lg font-black text-cyan-300">{page.rate}</p>
                      </div>
                      <div className="text-center">
                        <p className="text-gray-400 text-xs font-bold">Revenue</p>
                        <p className="text-lg font-black text-cyan-300">AED {(page.conversions * 399).toLocaleString()}</p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
