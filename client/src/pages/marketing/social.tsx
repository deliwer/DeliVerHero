import { useState, useEffect, useCallback } from "react";
import { Link } from "wouter";
import { BrokerAccessBanner, StickyBrokerWhatsApp } from "@/components/marketing/broker-enhancement-bar";
import { MarketingSubNav } from "@/components/marketing/marketing-subnav";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import { useToast } from "@/hooks/use-toast";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  Linkedin, Instagram, Twitter, Facebook, Globe, Search, Zap,
  Play, Loader2, RefreshCw, Users, MessageSquare, Copy, Check,
  ExternalLink, ChevronDown, ChevronUp, MapPin, Building2, Phone,
  Mail, Star, Send, TrendingUp, Bot, Radio, Target, Eye,
  ArrowRight, Sparkles, Network
} from "lucide-react";
import { SiWhatsapp, SiLinkedin, SiInstagram, SiX, SiFacebook, SiTelegram } from "react-icons/si";
import { apiRequest } from "@/lib/queryClient";

const PLATFORM_ICONS: Record<string, any> = {
  linkedin: SiLinkedin,
  instagram: SiInstagram,
  twitter: SiX,
  facebook: SiFacebook,
  whatsapp: SiWhatsapp,
  telegram: SiTelegram,
  bayut: Globe,
  dubizzle: Globe,
};

const PLATFORM_COLORS: Record<string, string> = {
  linkedin: "#0077B5",
  instagram: "#E4405F",
  twitter: "#000000",
  facebook: "#1877F2",
  whatsapp: "#25D366",
  telegram: "#26A5E4",
  bayut: "#F5A623",
  dubizzle: "#FF6B00",
};

const CATEGORY_LABELS: Record<string, string> = {
  broker_group: "Broker Group",
  agent_network: "Agent Network",
  landlord_network: "Landlord Network",
  relocation: "Relocation",
  expat_community: "Expat Community",
  corporate_hr: "Corporate HR",
};

interface DiscoveryStats {
  isRunning: boolean;
  progress: { processed: number; total: number; found: number };
  stats: Record<string, number>;
}

interface BrokerSocial {
  id: string;
  name: string;
  email: string;
  phone?: string;
  company?: string;
  license?: string;
  linkedinUrl?: string;
  instagramHandle?: string;
  twitterHandle?: string;
  facebookUrl?: string;
  gmbUrl?: string;
  socialDiscoveryStatus?: string;
  socialDiscoveredAt?: string;
  socialNotes?: string;
}

interface Community {
  id: string;
  name: string;
  platform: string;
  category: string;
  size: string;
  description: string;
  engagementTip: string;
  url?: string;
}

interface OutreachMessage {
  communityId: string;
  platform: string;
  headline: string;
  body: string;
  callToAction: string;
  hashtags: string[];
  whatsappDeepLink?: string;
}

type Tab = "discovery" | "social-list" | "communities" | "gmb";

export default function SocialAgentPage() {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [tab, setTab] = useState<Tab>("discovery");
  const [discoveryLimit, setDiscoveryLimit] = useState(50);
  const [socialFilter, setSocialFilter] = useState("found");
  const [copiedId, setCopiedId] = useState("");
  const [expandedBroker, setExpandedBroker] = useState<string | null>(null);
  const [expandedCommunity, setExpandedCommunity] = useState<string | null>(null);
  const [generatingMsg, setGeneratingMsg] = useState<Record<string, boolean>>({});
  const [communityMessages, setCommunityMessages] = useState<Record<string, OutreachMessage>>({});
  const [dmMessages, setDmMessages] = useState<Record<string, Record<string, { subject?: string; message: string }>>>({});
  const [dmPlatform, setDmPlatform] = useState<Record<string, string>>({});
  const [gmbSearch, setGmbSearch] = useState("");

  const { data: discoveryStats, refetch: refetchStats } = useQuery<DiscoveryStats>({
    queryKey: ["/api/marketing/social-discovery/stats"],
    refetchInterval: (data) => ((data as any)?.isRunning ? 2000 : 10000),
  });

  const { data: communitiesData } = useQuery<Community[]>({
    queryKey: ["/api/marketing/communities"],
  });

  const { data: brokerSocialData, isLoading: brokersLoading } = useQuery<{ brokers: BrokerSocial[]; total: number }>({
    queryKey: ["/api/marketing/broker-social-list", socialFilter],
    queryFn: () => fetch(`/api/marketing/broker-social-list?status=${socialFilter}&limit=50`).then(r => r.json()),
  });

  const startDiscovery = useMutation({
    mutationFn: () => apiRequest("POST", "/api/marketing/social-discovery/run", { limit: discoveryLimit }),
    onSuccess: () => {
      toast({ title: "Discovery Agent Started", description: `Scanning up to ${discoveryLimit} brokers for social handles...` });
      refetchStats();
    },
    onError: (err: any) => toast({ title: "Error", description: err.message, variant: "destructive" }),
  });

  const generateCommunityMessage = useCallback(async (communityId: string, style = "value_prop") => {
    setGeneratingMsg(prev => ({ ...prev, [communityId]: true }));
    try {
      const res = await apiRequest("POST", `/api/marketing/communities/${communityId}/message`, { style });
      const data = await res.json();
      setCommunityMessages(prev => ({ ...prev, [communityId]: data }));
    } catch (err: any) {
      toast({ title: "Error generating message", description: err.message, variant: "destructive" });
    } finally {
      setGeneratingMsg(prev => ({ ...prev, [communityId]: false }));
    }
  }, [toast]);

  const generateDM = useCallback(async (brokerId: string, platform: string) => {
    const key = `${brokerId}_${platform}`;
    setGeneratingMsg(prev => ({ ...prev, [key]: true }));
    try {
      const res = await apiRequest("POST", `/api/marketing/broker-master/${brokerId}/direct-message`, { platform });
      const data = await res.json();
      setDmMessages(prev => ({ ...prev, [brokerId]: { ...(prev[brokerId] || {}), [platform]: data } }));
    } catch (err: any) {
      toast({ title: "Error generating DM", description: err.message, variant: "destructive" });
    } finally {
      setGeneratingMsg(prev => ({ ...prev, [key]: false }));
    }
  }, [toast]);

  function copyText(text: string, id: string) {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(""), 2000);
  }

  const totalBrokers = discoveryStats
    ? Object.values(discoveryStats.stats).reduce((a, b) => a + b, 0)
    : 0;
  const foundCount = discoveryStats?.stats?.found || 0;
  const pendingCount = (discoveryStats?.stats?.pending || 0) + (discoveryStats?.stats?.discovering || 0);
  const progressPct = discoveryStats?.isRunning && discoveryStats.progress.total > 0
    ? Math.round((discoveryStats.progress.processed / discoveryStats.progress.total) * 100)
    : 0;

  return (
    <div className="min-h-screen bg-[#0a0f1e] text-white font-sans">
      <MarketingSubNav />
      <BrokerAccessBanner compact />
      {/* Header */}
      <div className="sticky top-0 z-50 bg-[#0a0f1e]/95 backdrop-blur border-b border-white/10">
        <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link href="/marketing" className="text-xl font-black tracking-tight hover:text-emerald-400 transition-colors">DELIWER</Link>
            <span className="text-xs bg-violet-500/20 text-violet-400 px-2 py-0.5 rounded-full border border-violet-500/30">
              🤖 Social Agent
            </span>
          </div>
          <nav className="flex items-center gap-1">
            <Link href="/marketing/recruit" className="text-xs px-3 py-1.5 rounded-lg text-gray-400 hover:text-white hover:bg-white/10 transition-all">Broker Engine</Link>
            <Link href="/marketing/control" className="text-xs px-3 py-1.5 rounded-lg text-gray-400 hover:text-white hover:bg-white/10 transition-all">Command Center</Link>
          </nav>
        </div>
      </div>
      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Hero */}
        <div className="mb-8">
          <div className="flex items-center gap-2 mb-2">
            <Bot className="w-5 h-5 text-violet-400" />
            <span className="text-xs text-violet-400 font-semibold uppercase tracking-widest">Autonomous Social Intelligence</span>
          </div>
          <h1 className="text-3xl font-black mb-2">Social Discovery & Outreach Agent</h1>
          <p className="text-gray-400 max-w-2xl">
            AI-powered agent that discovers LinkedIn, Instagram, GMB, and social handles for 35,000+ RERA brokers — then generates hyper-personalized outreach to target Dubai's relocation market.
          </p>
        </div>

        {/* KPI Strip */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-8">
          {[
            { label: "Total Brokers", value: totalBrokers.toLocaleString(), icon: Users, color: "text-blue-400" },
            { label: "Handles Found", value: foundCount.toLocaleString(), icon: Search, color: "text-emerald-400" },
            { label: "Pending Scan", value: pendingCount.toLocaleString(), icon: Radio, color: "text-amber-400" },
            { label: "Communities", value: (communitiesData?.length || 10).toString(), icon: Network, color: "text-violet-400" },
          ].map((kpi) => (
            <Card key={kpi.label} className="bg-white/5 border-white/10">
              <CardContent className="p-4">
                <kpi.icon className={`w-4 h-4 ${kpi.color} mb-2`} />
                <div className="text-2xl font-black text-[#ffffff]">{kpi.value}</div>
                <div className="text-xs text-gray-400">{kpi.label}</div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Tabs */}
        <div className="flex gap-1 mb-6 bg-white/5 rounded-xl p-1 w-full overflow-x-auto">
          {([
            { id: "discovery", label: "Discovery Agent", icon: Bot },
            { id: "social-list", label: "Social Handles", icon: Search },
            { id: "communities", label: "Communities", icon: Network },
            { id: "gmb", label: "GMB & Outreach", icon: MapPin },
          ] as const).map(t => (
            <button
              key={t.id}
              data-testid={`tab-${t.id}`}
              onClick={() => setTab(t.id)}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all whitespace-nowrap flex-1 justify-center ${tab === t.id ? "bg-violet-600 text-white" : "text-gray-400 hover:text-white"}`}
            >
              <t.icon className="w-3.5 h-3.5" />
              {t.label}
            </button>
          ))}
        </div>

        {/* ── Tab: Discovery Agent ── */}
        {tab === "discovery" && (
          <div className="space-y-6">
            {/* Agent Control */}
            <Card className="bg-gradient-to-br from-violet-900/30 to-blue-900/20 border-violet-500/20">
              <CardContent className="p-6">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
                  <div>
                    <h2 className="text-lg font-bold mb-1 flex items-center gap-2">
                      <Sparkles className="w-4 h-4 text-violet-400" />
                      AI Social Handle Discovery
                    </h2>
                    <p className="text-sm text-gray-400">
                      Agent scans broker name + company + email domain to infer LinkedIn, Instagram, Twitter, Facebook, and Google My Business handles using GPT-4o.
                    </p>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="flex items-center gap-2">
                      <span className="text-xs text-gray-400">Batch size:</span>
                      <select
                        data-testid="select-discovery-limit"
                        value={discoveryLimit}
                        onChange={e => setDiscoveryLimit(Number(e.target.value))}
                        className="bg-white/10 border border-white/20 rounded-lg px-2 py-1 text-sm text-white"
                      >
                        {[25, 50, 100, 250, 500].map(v => (
                          <option key={v} value={v} className="bg-gray-900">{v} brokers</option>
                        ))}
                      </select>
                    </div>
                    <Button
                      data-testid="button-start-discovery"
                      onClick={() => startDiscovery.mutate()}
                      disabled={startDiscovery.isPending || discoveryStats?.isRunning}
                      className="bg-violet-600 hover:bg-violet-700 text-white font-bold"
                    >
                      {(startDiscovery.isPending || discoveryStats?.isRunning) ? (
                        <><Loader2 className="w-4 h-4 mr-2 animate-spin" />Running...</>
                      ) : (
                        <><Play className="w-4 h-4 mr-2" />Run Agent</>
                      )}
                    </Button>
                  </div>
                </div>

                {/* Progress Bar */}
                {discoveryStats?.isRunning && (
                  <div className="mb-4">
                    <div className="flex justify-between text-xs text-gray-400 mb-1">
                      <span>Scanning brokers...</span>
                      <span>{discoveryStats.progress.processed} / {discoveryStats.progress.total} ({discoveryStats.progress.found} found)</span>
                    </div>
                    <Progress value={progressPct} className="h-2 bg-white/10" />
                  </div>
                )}

                {/* Stats Breakdown */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  {[
                    { label: "Pending", value: discoveryStats?.stats?.pending || 0, color: "bg-gray-500/20 text-gray-400 border-gray-500/20" },
                    { label: "Discovering", value: discoveryStats?.stats?.discovering || 0, color: "bg-blue-500/20 text-blue-400 border-blue-500/20" },
                    { label: "Found", value: discoveryStats?.stats?.found || 0, color: "bg-emerald-500/20 text-emerald-400 border-emerald-500/20" },
                    { label: "Not Found", value: discoveryStats?.stats?.not_found || 0, color: "bg-red-500/20 text-red-400 border-red-500/20" },
                  ].map(s => (
                    <div key={s.label} className={`rounded-xl border px-4 py-3 ${s.color}`}>
                      <div className="text-xl font-black">{s.value.toLocaleString()}</div>
                      <div className="text-xs font-medium">{s.label}</div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* How it works */}
            <Card className="bg-white/5 border-white/10">
              <CardContent className="p-6">
                <h3 className="font-bold mb-4 flex items-center gap-2 text-[#f5f5f5]"><Zap className="w-4 h-4 text-amber-400" />How the Agent Works</h3>
                <div className="grid sm:grid-cols-3 gap-4">
                  {[
                    { step: "1", title: "Ingests Broker Data", desc: "Reads name, company, email, and RERA license from Master DB" },
                    { step: "2", title: "AI Inference", desc: "GPT-4o infers LinkedIn slugs, Instagram handles, and GMB listings based on naming patterns and email domain" },
                    { step: "3", title: "Updates DB", desc: "Saves discovered handles with confidence score — ready for direct outreach via Social Handles tab" },
                  ].map(s => (
                    <div key={s.step} className="flex gap-3">
                      <div className="w-7 h-7 rounded-full bg-violet-600/30 border border-violet-500/30 flex items-center justify-center text-xs font-bold text-violet-400 shrink-0">{s.step}</div>
                      <div>
                        <div className="font-semibold text-sm mb-0.5 text-[#ffffff]">{s.title}</div>
                        <div className="text-xs text-gray-400">{s.desc}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* ── Tab: Social Handles List ── */}
        {tab === "social-list" && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex gap-2 flex-wrap">
                {["found", "pending", "not_found", "discovering"].map(s => (
                  <button
                    key={s}
                    data-testid={`filter-${s}`}
                    onClick={() => setSocialFilter(s)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all border ${socialFilter === s ? "bg-violet-600 border-violet-500 text-white" : "border-white/10 text-gray-400 hover:text-white bg-white/5"}`}
                  >
                    {s.replace("_", " ").replace(/\b\w/g, c => c.toUpperCase())}
                  </button>
                ))}
              </div>
              <span className="text-xs text-gray-500">{brokerSocialData?.total?.toLocaleString() || 0} brokers</span>
            </div>

            {brokersLoading ? (
              <div className="flex items-center justify-center py-20"><Loader2 className="w-6 h-6 animate-spin text-violet-400" /></div>
            ) : (
              <div className="space-y-3">
                {(brokerSocialData?.brokers || []).map((broker) => (
                  <Card key={broker.id} className="bg-white/5 border-white/10 hover:border-white/20 transition-colors">
                    <CardContent className="p-4">
                      <div className="flex items-start justify-between gap-3">
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 flex-wrap mb-1">
                            <span className="font-semibold text-sm truncate text-[#ffffff]" data-testid={`broker-name-${broker.id}`}>{broker.name}</span>
                            {broker.company && <span className="text-xs text-gray-400 truncate">{broker.company}</span>}
                            <Badge className={`text-[10px] px-1.5 py-0 ${broker.socialDiscoveryStatus === "found" ? "bg-emerald-500/20 text-emerald-400 border-emerald-500/30" : broker.socialDiscoveryStatus === "discovering" ? "bg-blue-500/20 text-blue-400 border-blue-500/30" : "bg-gray-500/20 text-gray-400 border-gray-500/20"}`}>
                              {broker.socialDiscoveryStatus || "pending"}
                            </Badge>
                          </div>
                          {broker.socialNotes && (
                            <p className="text-xs text-gray-500 mb-2">{broker.socialNotes}</p>
                          )}
                          <div className="flex flex-wrap gap-2">
                            {broker.linkedinUrl && (
                              <a href={broker.linkedinUrl} target="_blank" rel="noopener noreferrer" data-testid={`link-linkedin-${broker.id}`} className="flex items-center gap-1 text-xs text-[#0077B5] hover:opacity-80 transition-opacity">
                                <SiLinkedin className="w-3 h-3" />LinkedIn
                              </a>
                            )}
                            {broker.instagramHandle && (
                              <span className="flex items-center gap-1 text-xs text-[#E4405F]">
                                <SiInstagram className="w-3 h-3" />@{broker.instagramHandle}
                              </span>
                            )}
                            {broker.twitterHandle && (
                              <span className="flex items-center gap-1 text-xs text-gray-300">
                                <SiX className="w-3 h-3" />@{broker.twitterHandle}
                              </span>
                            )}
                            {broker.facebookUrl && (
                              <a href={broker.facebookUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 text-xs text-[#1877F2] hover:opacity-80 transition-opacity">
                                <SiFacebook className="w-3 h-3" />Facebook
                              </a>
                            )}
                            {broker.gmbUrl && (
                              <a href={broker.gmbUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 text-xs text-amber-400 hover:opacity-80 transition-opacity">
                                <MapPin className="w-3 h-3" />GMB
                              </a>
                            )}
                          </div>
                        </div>
                        <button
                          data-testid={`button-expand-${broker.id}`}
                          onClick={() => setExpandedBroker(expandedBroker === broker.id ? null : broker.id)}
                          className="text-gray-500 hover:text-white transition-colors p-1"
                        >
                          {expandedBroker === broker.id ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                        </button>
                      </div>

                      {/* Expanded: DM Generator */}
                      {expandedBroker === broker.id && (
                        <div className="mt-4 pt-4 border-t border-white/10">
                          <div className="flex items-center gap-2 mb-3">
                            <MessageSquare className="w-4 h-4 text-violet-400" />
                            <span className="text-sm font-semibold">Generate Direct Message</span>
                          </div>
                          <div className="flex gap-2 mb-3 flex-wrap">
                            {(["linkedin", "instagram", "whatsapp", "email"] as const).map(p => (
                              <button
                                key={p}
                                data-testid={`button-platform-${p}-${broker.id}`}
                                onClick={() => {
                                  setDmPlatform(prev => ({ ...prev, [broker.id]: p }));
                                  generateDM(broker.id, p);
                                }}
                                disabled={generatingMsg[`${broker.id}_${p}`]}
                                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium border border-white/20 hover:border-white/40 bg-white/5 hover:bg-white/10 transition-all"
                              >
                                {generatingMsg[`${broker.id}_${p}`] ? <Loader2 className="w-3 h-3 animate-spin" /> : null}
                                {p.charAt(0).toUpperCase() + p.slice(1)}
                              </button>
                            ))}
                          </div>

                          {dmMessages[broker.id] && Object.entries(dmMessages[broker.id]).map(([platform, dm]) => (
                            <div key={platform} className="bg-white/5 rounded-xl p-3 mb-2 border border-white/10">
                              <div className="flex items-center justify-between mb-2">
                                <Badge className="text-[10px] bg-white/10 text-gray-300 border-white/20">{platform}</Badge>
                                <button
                                  data-testid={`button-copy-dm-${broker.id}-${platform}`}
                                  onClick={() => copyText(dm.message, `dm-${broker.id}-${platform}`)}
                                  className="text-gray-400 hover:text-white transition-colors"
                                >
                                  {copiedId === `dm-${broker.id}-${platform}` ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                                </button>
                              </div>
                              {dm.subject && <div className="text-xs text-gray-400 mb-1"><strong>Subject:</strong> {dm.subject}</div>}
                              <p className="text-sm text-gray-200 leading-relaxed">{dm.message}</p>

                              {(platform === 'whatsapp' && broker.phone) && (
                                <a
                                  href={`https://wa.me/${broker.phone.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(dm.message)}`}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  data-testid={`link-whatsapp-${broker.id}`}
                                  className="mt-2 inline-flex items-center gap-1.5 text-xs text-[#25D366] hover:opacity-80 transition-opacity"
                                >
                                  <SiWhatsapp className="w-3 h-3" />Open in WhatsApp
                                </a>
                              )}
                              {(platform === 'linkedin' && broker.linkedinUrl) && (
                                <a
                                  href={broker.linkedinUrl}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="mt-2 inline-flex items-center gap-1.5 text-xs text-[#0077B5] hover:opacity-80 transition-opacity"
                                >
                                  <SiLinkedin className="w-3 h-3" />Open Profile
                                </a>
                              )}
                            </div>
                          ))}
                        </div>
                      )}
                    </CardContent>
                  </Card>
                ))}

                {(brokerSocialData?.brokers || []).length === 0 && (
                  <div className="text-center py-20 text-gray-500">
                    <Search className="w-8 h-8 mx-auto mb-3 opacity-30" />
                    <p className="text-sm">No brokers with <strong>{socialFilter.replace("_", " ")}</strong> status yet.</p>
                    {socialFilter !== "found" && (
                      <p className="text-xs mt-1">Run the Discovery Agent to start scanning social handles.</p>
                    )}
                  </div>
                )}
              </div>
            )}
          </div>
        )}

        {/* ── Tab: Communities ── */}
        {tab === "communities" && (
          <div className="space-y-4">
            <div className="mb-4 p-4 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-300 text-sm flex items-start gap-3">
              <Target className="w-4 h-4 shrink-0 mt-0.5" />
              <div>
                <strong>Intent Capture Strategy:</strong> Target these Dubai RE communities to intercept relocation intent early. Generate AI messages for each platform and reach brokers where they already engage.
              </div>
            </div>

            <div className="grid sm:grid-cols-2 gap-4">
              {(communitiesData || []).map((community) => {
                const Icon = PLATFORM_ICONS[community.platform] || Globe;
                const color = PLATFORM_COLORS[community.platform] || "#888";
                const isExpanded = expandedCommunity === community.id;
                const msg = communityMessages[community.id];

                return (
                  <Card key={community.id} className="bg-white/5 border-white/10 hover:border-white/20 transition-colors">
                    <CardContent className="p-4">
                      <div className="flex items-start gap-3 mb-3">
                        <div className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0" style={{ backgroundColor: `${color}22`, border: `1px solid ${color}44` }}>
                          <Icon className="w-4 h-4" style={{ color }} />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between gap-2 mb-0.5">
                            <span className="font-semibold text-sm truncate text-[#f5f5f5]" data-testid={`community-name-${community.id}`}>{community.name}</span>
                            {community.url && (
                              <a href={community.url} target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-white transition-colors shrink-0">
                                <ExternalLink className="w-3 h-3" />
                              </a>
                            )}
                          </div>
                          <div className="flex items-center gap-2">
                            <Badge className="text-[10px] px-1.5 py-0 bg-white/10 text-gray-300 border-white/10 capitalize">
                              {community.platform}
                            </Badge>
                            <Badge className="text-[10px] px-1.5 py-0 bg-blue-500/20 text-blue-300 border-blue-500/20">
                              {CATEGORY_LABELS[community.category] || community.category}
                            </Badge>
                            <span className="text-xs text-gray-500">{community.size}</span>
                          </div>
                        </div>
                      </div>

                      <p className="text-xs text-gray-400 mb-2">{community.description}</p>

                      <div className="bg-emerald-500/10 border border-emerald-500/20 rounded-lg px-3 py-2 mb-3">
                        <p className="text-xs text-emerald-300"><strong>Tip:</strong> {community.engagementTip}</p>
                      </div>

                      <div className="flex items-center gap-2">
                        <Button
                          data-testid={`button-generate-message-${community.id}`}
                          size="sm"
                          onClick={() => {
                            generateCommunityMessage(community.id);
                            setExpandedCommunity(community.id);
                          }}
                          disabled={generatingMsg[community.id]}
                          className="bg-violet-600/80 hover:bg-violet-600 text-white text-xs h-7"
                        >
                          {generatingMsg[community.id] ? <Loader2 className="w-3 h-3 mr-1 animate-spin" /> : <Sparkles className="w-3 h-3 mr-1" />}
                          Generate Message
                        </Button>
                        {msg && (
                          <button
                            onClick={() => setExpandedCommunity(isExpanded ? null : community.id)}
                            className="text-xs text-gray-400 hover:text-white flex items-center gap-1 transition-colors"
                          >
                            {isExpanded ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
                            {isExpanded ? "Hide" : "Show"} message
                          </button>
                        )}
                      </div>

                      {isExpanded && msg && (
                        <div className="mt-3 pt-3 border-t border-white/10 space-y-2">
                          <div className="flex items-center justify-between">
                            <span className="text-xs font-semibold text-violet-300">{msg.headline}</span>
                            <button
                              data-testid={`button-copy-message-${community.id}`}
                              onClick={() => copyText(`${msg.headline}\n\n${msg.body}\n\n${msg.callToAction}\n\n${msg.hashtags.map(h => '#' + h).join(' ')}`, community.id)}
                              className="text-gray-400 hover:text-white transition-colors"
                            >
                              {copiedId === community.id ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                            </button>
                          </div>
                          <p className="text-sm text-gray-200 leading-relaxed">{msg.body}</p>
                          <p className="text-xs text-emerald-400 font-medium">{msg.callToAction}</p>
                          <div className="flex flex-wrap gap-1">
                            {msg.hashtags.map(h => (
                              <span key={h} className="text-[10px] text-blue-400 bg-blue-500/10 px-1.5 py-0.5 rounded">#{h}</span>
                            ))}
                          </div>
                          {msg.whatsappDeepLink && (
                            <a
                              href={msg.whatsappDeepLink}
                              target="_blank"
                              rel="noopener noreferrer"
                              data-testid={`link-whatsapp-community-${community.id}`}
                              className="inline-flex items-center gap-1.5 text-xs text-[#25D366] hover:opacity-80 transition-opacity mt-1"
                            >
                              <SiWhatsapp className="w-3 h-3" />Share via WhatsApp
                            </a>
                          )}
                        </div>
                      )}
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>
        )}

        {/* ── Tab: GMB & Outreach ── */}
        {tab === "gmb" && (
          <div className="space-y-6">
            <Card className="bg-white/5 border-white/10">
              <CardContent className="p-6">
                <h2 className="font-bold mb-2 flex items-center gap-2 text-[#ffffff]"><MapPin className="w-4 h-4 text-amber-400" />Google My Business Targeting</h2>
                <p className="text-sm text-gray-400 mb-4">
                  Search real estate companies by name to find their Google My Business profile and launch targeted outreach. The agent has pre-mapped GMB URLs for 35,000+ RERA-licensed brokerages.
                </p>
                <div className="flex gap-2 mb-4">
                  <Input
                    data-testid="input-gmb-search"
                    placeholder="Search company name (e.g. Emaar, Coldwell Banker, DAMAC...)"
                    value={gmbSearch}
                    onChange={e => setGmbSearch(e.target.value)}
                    className="bg-white/5 border-white/10 text-white placeholder:text-gray-500"
                  />
                  <Button
                    data-testid="button-gmb-search"
                    className="bg-amber-600 hover:bg-amber-700 text-white shrink-0"
                    onClick={() => {
                      if (gmbSearch.trim()) {
                        window.open(`https://www.google.com/maps/search/${encodeURIComponent(gmbSearch + ' real estate Dubai')}`, '_blank');
                      }
                    }}
                  >
                    <Search className="w-4 h-4 mr-2" />Search GMB
                  </Button>
                </div>

                <div className="grid sm:grid-cols-2 gap-3">
                  {[
                    { name: "Emaar Properties", gmbQ: "Emaar Properties Dubai" },
                    { name: "Coldwell Banker", gmbQ: "Coldwell Banker Dubai" },
                    { name: "DAMAC Properties", gmbQ: "DAMAC Properties Dubai" },
                    { name: "FAM Real Estate", gmbQ: "FAM Real Estate Dubai" },
                    { name: "Betterhomes", gmbQ: "Betterhomes Dubai" },
                    { name: "Allsopp & Allsopp", gmbQ: "Allsopp Allsopp Dubai" },
                    { name: "Provident Real Estate", gmbQ: "Provident Real Estate Dubai" },
                    { name: "Dacha Real Estate", gmbQ: "Dacha Real Estate Dubai" },
                  ].map(company => (
                    <a
                      key={company.name}
                      href={`https://www.google.com/maps/search/${encodeURIComponent(company.gmbQ)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      data-testid={`link-gmb-${company.name.replace(/\s/g, '-').toLowerCase()}`}
                      className="flex items-center justify-between p-3 rounded-xl bg-white/5 border border-white/10 hover:border-amber-500/30 hover:bg-amber-500/5 transition-all group"
                    >
                      <div className="flex items-center gap-3">
                        <Building2 className="w-4 h-4 text-amber-400" />
                        <span className="text-sm font-medium text-[#ffffff]">{company.name}</span>
                      </div>
                      <ExternalLink className="w-3 h-3 text-gray-500 group-hover:text-amber-400 transition-colors" />
                    </a>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Outreach Playbook */}
            <Card className="bg-white/5 border-white/10">
              <CardContent className="p-6">
                <h2 className="font-bold mb-4 flex items-center gap-2 text-[#ffffff]"><TrendingUp className="w-4 h-4 text-emerald-400" />Founder Outreach Playbook</h2>
                <div className="space-y-4">
                  {[
                    {
                      channel: "Google My Business",
                      icon: MapPin,
                      color: "text-amber-400",
                      action: "Message via GMB → review/Q&A section",
                      steps: [
                        "Search brokerage on Google Maps",
                        "Click 'Suggest an edit' or 'Ask a question'",
                        "Or call the GMB phone directly with DeliWer pitch",
                        "If listed, message via their GMB website contact form",
                      ],
                    },
                    {
                      channel: "LinkedIn Company Pages",
                      icon: SiLinkedin,
                      color: "text-[#0077B5]",
                      action: "Follow + comment on recent posts → InMail",
                      steps: [
                        "Find company page via social handles list",
                        "Follow the company and like/comment on 1 post",
                        "Send InMail to company admin or founder",
                        "Use the AI-generated LinkedIn DM template",
                      ],
                    },
                    {
                      channel: "Instagram DMs",
                      icon: SiInstagram,
                      color: "text-[#E4405F]",
                      action: "Story reply → DM → partner offer",
                      steps: [
                        "Find broker via @instagramHandle from social list",
                        "React to their latest story",
                        "Send casual DM using AI-generated template",
                        "Follow up after 48 hours with partner link",
                      ],
                    },
                    {
                      channel: "WhatsApp Direct",
                      icon: SiWhatsapp,
                      color: "text-[#25D366]",
                      action: "One-tap outreach from broker phone number",
                      steps: [
                        "Use phone number from Master DB",
                        "Click WhatsApp icon in Social Handles tab",
                        "Pre-filled message opens in WhatsApp Web",
                        "Edit and send — track response in Broker Engine",
                      ],
                    },
                  ].map(play => (
                    <div key={play.channel} className="p-4 rounded-xl bg-white/5 border border-white/10">
                      <div className="flex items-center gap-2 mb-2">
                        <play.icon className={`w-4 h-4 ${play.color}`} />
                        <span className="font-semibold text-sm text-[#ffffff]">{play.channel}</span>
                        <Badge className="text-[10px] bg-white/10 text-gray-400 border-white/10">{play.action}</Badge>
                      </div>
                      <ol className="space-y-1 pl-4">
                        {play.steps.map((step, i) => (
                          <li key={i} className="text-xs text-gray-400 list-decimal">{step}</li>
                        ))}
                      </ol>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
      <StickyBrokerWhatsApp />
    </div>
  );
}
