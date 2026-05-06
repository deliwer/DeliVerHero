import { useState, useRef, useEffect } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { SEOMeta } from "@/components/seo-meta";
import { Navigation } from "@/components/navigation";
import { DistressBrokerTrack } from "@/components/marketing/distress-broker-track";
import { PartnerSubNav } from "@/components/partner-subnav";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent } from "@/components/ui/card";
import {
  CheckCircle2, MessageCircle, Copy, Check, ShieldCheck,
  Star, Building2, ChevronDown, ChevronUp, QrCode, Zap,
  Home, ArrowRight, Users, TrendingUp, Clock,
  Crown, Sparkles, Award, Layers, BadgeCheck, KeyRound,
  FileSignature, Lock, BarChart2, MousePointer, Wallet,
  ChevronRight, AlertCircle, Activity, MapPin, Calculator,
  Hash, Target, Eye, Video, Send, Shield, X, BanIcon,
  ClipboardCheck, AlertTriangle, Building, Ruler, Camera,
} from "lucide-react";
import { Link } from "wouter";
import { useToast } from "@/hooks/use-toast";
import { buildWhatsAppMessage, openWhatsApp, logEvent } from "@/lib/referral";

function openWA(msg: string) { openWhatsApp(msg); }

// ── Habtoor Polo NDA-gated Inventory Section ───────────────────────────────

type HabtoorProperty = {
  id: string; serialNo: number; unitType: string; salePrice: number;
  buaSqft: number; areaSqft: number; structureType: string;
  status: string; views: string; claimsCount: number;
};

function formatMillions(n: number) {
  return n >= 1_000_000 ? `AED ${(n / 1_000_000).toFixed(1).replace(/\.0$/, "")}M` : `AED ${n.toLocaleString()}`;
}

function statusBadge(s: string) {
  if (s === "Vacant")  return "bg-emerald-500/15 text-emerald-400 border-emerald-500/30";
  if (s === "Rented")  return "bg-amber-500/15 text-amber-400 border-amber-500/30";
  if (s === "Hotel")   return "bg-sky-500/15 text-sky-400 border-sky-500/30";
  return "bg-slate-700 text-gray-400 border-white/10";
}

function HabtoorSection() {
  const { toast } = useToast();
  const qc = useQueryClient();

  // ── Identity state (persisted in localStorage for session)
  const [phone, setPhone] = useState(() => typeof window !== "undefined" ? localStorage.getItem("hpv_phone") || "" : "");
  const [name,  setName]  = useState(() => typeof window !== "undefined" ? localStorage.getItem("hpv_name")  || "" : "");
  const [email, setEmail] = useState("");
  const [rera,  setRera]  = useState("");
  const [brokerage, setBrokerage] = useState("");

  // ── UI state
  const [ndaStep, setNdaStep] = useState<"form" | "terms" | "done">("form");
  const [ndaChecked, setNdaChecked] = useState(false);
  const [filterType, setFilterType] = useState("all");
  const [filterStatus, setFilterStatus] = useState("all");
  const [activeModal, setActiveModal] = useState<"claim" | "vr" | "report" | "my-claims" | null>(null);
  const [selectedProp, setSelectedProp] = useState<HabtoorProperty | null>(null);

  // ── Claim form
  const [claimClient, setClaimClient] = useState({ name: "", phone: "", nationality: "", budget: "", notes: "" });

  // ── VR form
  const [vrForm, setVrForm] = useState({ clientName: "", clientPhone: "", preferredDate: "", preferredTime: "", tourType: "recorded" });

  // ── Report form
  const [reportForm, setReportForm] = useState({ claimId: "", closingPrice: "", tenantName: "", tenantPhone: "", tenantEmail: "", tenantNationality: "", reraTransactionNo: "", notes: "" });

  // ── NDA status query
  const ndaQuery = useQuery<{ accepted: boolean; blacklisted?: boolean }>({
    queryKey: ["/api/habtoor/nda-status", phone],
    queryFn: () => phone.length > 6 ? fetch(`/api/habtoor/nda-status?phone=${encodeURIComponent(phone)}`).then(r => r.json()) : Promise.resolve({ accepted: false }),
    enabled: phone.length > 6,
  });
  const ndaAccepted = ndaQuery.data?.accepted === true;
  const isBlacklisted = ndaQuery.data?.blacklisted === true;

  // ── Inventory query (only if NDA accepted)
  const inventoryQuery = useQuery<HabtoorProperty[]>({
    queryKey: ["/api/habtoor/inventory"],
    queryFn: () => fetch("/api/habtoor/inventory").then(r => r.json()),
    enabled: ndaAccepted,
  });

  // ── My claims query
  const myClaimsQuery = useQuery<any[]>({
    queryKey: ["/api/habtoor/my-claims", phone],
    queryFn: () => fetch(`/api/habtoor/my-claims?phone=${encodeURIComponent(phone)}`).then(r => r.json()),
    enabled: ndaAccepted && activeModal === "my-claims",
  });

  // ── Mutations
  const ndaMutation = useMutation({
    mutationFn: (body: any) => apiRequest("POST", "/api/habtoor/nda", body),
    onSuccess: () => {
      localStorage.setItem("hpv_phone", phone);
      localStorage.setItem("hpv_name", name);
      qc.invalidateQueries({ queryKey: ["/api/habtoor/nda-status", phone] });
      setNdaStep("done");
      toast({ title: "Access granted", description: "You now have access to the Al Habtoor Polo inventory under NDA/NCA." });
    },
    onError: (e: any) => toast({ title: "Error", description: e.message || "Could not record NDA", variant: "destructive" }),
  });

  const claimMutation = useMutation({
    mutationFn: (body: any) => apiRequest("POST", "/api/habtoor/claim", body),
    onSuccess: (data: any) => {
      qc.invalidateQueries({ queryKey: ["/api/habtoor/inventory"] });
      setActiveModal(null);
      const msg = `Lead Claim — Ref: ${data.deliwerRefCode}\nBroker: ${name} (${phone})\nProperty: ${selectedProp?.unitType} ${selectedProp?.structureType} | ${selectedProp?.views}\nClient: ${claimClient.name || "TBC"}\n\nThis claim is logged and protected under NDA/NCA. DeliWer will coordinate access.`;
      window.open(`https://wa.me/971523946311?text=${encodeURIComponent(msg)}`, "_blank");
      toast({ title: "Lead claimed!", description: `Ref: ${data.deliwerRefCode}. WhatsApp confirmation sent to DeliWer.` });
      setClaimClient({ name: "", phone: "", nationality: "", budget: "", notes: "" });
    },
    onError: (e: any) => toast({ title: "Claim failed", description: e.message || "Try again", variant: "destructive" }),
  });

  const vrMutation = useMutation({
    mutationFn: (body: any) => apiRequest("POST", "/api/habtoor/vr-request", body),
    onSuccess: (data: any) => {
      setActiveModal(null);
      window.open(data.whatsappUrl, "_blank");
      toast({ title: "VR Tour requested!", description: "DeliWer will coordinate with the property manager. WhatsApp sent." });
      setVrForm({ clientName: "", clientPhone: "", preferredDate: "", preferredTime: "", tourType: "recorded" });
    },
    onError: (e: any) => toast({ title: "Request failed", description: e.message || "Try again", variant: "destructive" }),
  });

  const reportMutation = useMutation({
    mutationFn: (body: any) => apiRequest("POST", "/api/habtoor/deal-report", body),
    onSuccess: () => {
      setActiveModal(null);
      toast({ title: "Deal reported!", description: "DeliWer will verify and process commission. Thank you for closing via DeliWer channels." });
      setReportForm({ claimId: "", closingPrice: "", tenantName: "", tenantPhone: "", tenantEmail: "", tenantNationality: "", reraTransactionNo: "", notes: "" });
    },
    onError: (e: any) => toast({ title: "Report failed", description: e.message || "Try again", variant: "destructive" }),
  });

  // ── Filtered inventory
  const inventory = inventoryQuery.data || [];
  const filtered = inventory.filter(p => {
    if (filterType !== "all" && p.unitType !== filterType) return false;
    if (filterStatus !== "all" && p.status.trim() !== filterStatus) return false;
    return true;
  });

  function openClaim(p: HabtoorProperty) { setSelectedProp(p); setActiveModal("claim"); }
  function openVR(p: HabtoorProperty)    { setSelectedProp(p); setActiveModal("vr"); }
  function closeModal() { setActiveModal(null); setSelectedProp(null); }

  function handleNdaSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!phone.trim() || !name.trim()) {
      toast({ title: "Name & phone required", variant: "destructive" }); return;
    }
    if (!ndaChecked) {
      toast({ title: "Please accept the NDA/NCA terms", variant: "destructive" }); return;
    }
    ndaMutation.mutate({ brokerPhone: phone.trim(), brokerName: name.trim(), brokerEmail: email.trim() || undefined, reraLicense: rera.trim() || undefined, brokerage: brokerage.trim() || undefined });
  }

  function handleClaim(e: React.FormEvent) {
    e.preventDefault();
    if (!selectedProp) return;
    claimMutation.mutate({ propertyId: selectedProp.id, brokerPhone: phone, brokerName: name, brokerEmail: email || undefined, reraLicense: rera || undefined, brokerage: brokerage || undefined, clientName: claimClient.name || undefined, clientPhone: claimClient.phone || undefined, clientNationality: claimClient.nationality || undefined, clientBudget: claimClient.budget || undefined, claimNotes: claimClient.notes || undefined });
  }

  function handleVR(e: React.FormEvent) {
    e.preventDefault();
    if (!selectedProp) return;
    vrMutation.mutate({ propertyId: selectedProp.id, brokerPhone: phone, brokerName: name, ...vrForm });
  }

  function handleReport(e: React.FormEvent) {
    e.preventDefault();
    if (!selectedProp || !reportForm.claimId) return;
    reportMutation.mutate({ propertyId: selectedProp.id, brokerPhone: phone, brokerName: name, claimId: reportForm.claimId, closingPrice: reportForm.closingPrice ? parseInt(reportForm.closingPrice) : undefined, tenantName: reportForm.tenantName || undefined, tenantPhone: reportForm.tenantPhone || undefined, tenantEmail: reportForm.tenantEmail || undefined, tenantNationality: reportForm.tenantNationality || undefined, reraTransactionNo: reportForm.reraTransactionNo || undefined, notes: reportForm.notes || undefined, closingChannel: "deliwer" });
  }

  const inputCls = "bg-slate-900 border-white/10 text-white placeholder:text-gray-600 h-10 text-sm";
  const labelCls = "text-[10px] font-black uppercase tracking-widest text-amber-400";

  return (
    <section id="habtoor-polo" className="py-16 px-4 bg-slate-950 border-t border-white/5">
      <div className="max-w-5xl mx-auto space-y-10">

        {/* ── Header ── */}
        <div className="text-center space-y-3">
          <Badge className="bg-amber-500/15 text-amber-300 border-amber-500/30 px-4 py-1.5 text-[10px] font-black uppercase tracking-widest rounded-full">
            <Shield className="w-3 h-3 mr-1.5" /> Inner Circle — Confidential Inventory
          </Badge>
          <h2 className="text-3xl md:text-4xl font-black uppercase tracking-tighter text-white">
            Al Habtoor Polo<br /><span className="text-amber-400">Exclusive Listing Access</span>
          </h2>
          <p className="text-gray-400 text-sm max-w-xl mx-auto leading-relaxed">
            55 villas &amp; semi-detached homes at Al Habtoor Polo Resort &amp; Club, Dubai. Access is gated by NDA/NCA. Unit numbers are never disclosed — all viewings are arranged via DeliWer with full property-manager coordination.
          </p>

          {/* ── Anti-poaching warning ── */}
          <div className="inline-flex items-start gap-3 bg-red-950/40 border border-red-500/25 rounded-2xl px-5 py-4 text-left max-w-2xl mx-auto">
            <AlertTriangle className="w-5 h-5 text-red-400 shrink-0 mt-0.5" />
            <div>
              <p className="text-red-300 font-black text-xs uppercase tracking-wide mb-1">Zero-Tolerance Anti-Poaching Policy</p>
              <p className="text-red-200/70 text-xs leading-relaxed">
                All tenant data is logged and cross-referenced. Any deal closed outside DeliWer channels, or any broker found bypassing DeliWer or approaching landlords/managers directly, will be permanently blacklisted from the network and reported to RERA. Tenant data is retained as evidence.
              </p>
            </div>
          </div>
        </div>

        {/* ── NDA Gate ── */}
        {isBlacklisted ? (
          <div className="max-w-lg mx-auto text-center space-y-4 py-8">
            <BanIcon className="w-12 h-12 text-red-500 mx-auto" />
            <h3 className="text-xl font-black text-red-400 uppercase">Access Denied</h3>
            <p className="text-gray-500 text-sm">This number has been restricted from the DeliWer broker network. Contact DeliWer if you believe this is an error.</p>
          </div>
        ) : !ndaAccepted ? (
          <Card className="max-w-xl mx-auto bg-slate-900/80 border-amber-500/20 rounded-2xl">
            <CardContent className="p-6 space-y-5">
              {ndaStep !== "terms" ? (
                <>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-amber-500/15 border border-amber-500/30 flex items-center justify-center shrink-0">
                      <Lock className="w-5 h-5 text-amber-400" />
                    </div>
                    <div>
                      <p className="font-black text-white text-sm uppercase tracking-tight">NDA / NCA Required</p>
                      <p className="text-gray-500 text-xs">Enter your details to access the confidential property list</p>
                    </div>
                  </div>
                  <form onSubmit={e => { e.preventDefault(); setNdaStep("terms"); }} className="space-y-3">
                    <div className="grid grid-cols-2 gap-3">
                      <div className="space-y-1.5">
                        <Label className={labelCls}>Full Name *</Label>
                        <Input data-testid="input-hpv-name" placeholder="Your name" value={name} onChange={e => setName(e.target.value)} className={inputCls} required />
                      </div>
                      <div className="space-y-1.5">
                        <Label className={labelCls}>WhatsApp Phone *</Label>
                        <Input data-testid="input-hpv-phone" placeholder="+971 50 000 0000" value={phone} onChange={e => setPhone(e.target.value)} className={inputCls} required />
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      <div className="space-y-1.5">
                        <Label className={labelCls}>RERA License No.</Label>
                        <Input data-testid="input-hpv-rera" placeholder="Optional but recommended" value={rera} onChange={e => setRera(e.target.value)} className={inputCls} />
                      </div>
                      <div className="space-y-1.5">
                        <Label className={labelCls}>Brokerage / Agency</Label>
                        <Input data-testid="input-hpv-brokerage" placeholder="Your company" value={brokerage} onChange={e => setBrokerage(e.target.value)} className={inputCls} />
                      </div>
                    </div>
                    <div className="space-y-1.5">
                      <Label className={labelCls}>Email</Label>
                      <Input data-testid="input-hpv-email" type="email" placeholder="you@example.com" value={email} onChange={e => setEmail(e.target.value)} className={inputCls} />
                    </div>
                    <Button type="submit" data-testid="button-hpv-review-nda" className="w-full h-10 bg-amber-600 hover:bg-amber-500 text-black font-black uppercase tracking-widest rounded-xl text-sm">
                      <FileSignature className="w-4 h-4 mr-2" /> Review NDA / NCA Terms
                    </Button>
                  </form>
                </>
              ) : (
                <form onSubmit={handleNdaSubmit} className="space-y-4">
                  <p className="text-[10px] font-black uppercase tracking-widest text-amber-400 mb-1">Non-Disclosure & Non-Circumvention Agreement</p>
                  <div className="bg-slate-950 border border-white/10 rounded-xl p-4 space-y-2 text-xs text-gray-400 leading-relaxed max-h-52 overflow-y-auto">
                    <p className="font-bold text-white">DeliWer Realty — NDA / NCA (Summary)</p>
                    <p>By accepting, <strong className="text-white">{name}</strong> (<strong className="text-white">{phone}</strong>) agrees to the following binding terms:</p>
                    <p><strong className="text-amber-300">1. Confidentiality.</strong> All property details, unit references, owner/landlord identities, tenant data, and pricing received through DeliWer are strictly confidential and may not be shared with any third party without prior written consent from DeliWer.</p>
                    <p><strong className="text-amber-300">2. Non-Circumvention.</strong> Broker shall not directly or indirectly contact property owners, landlords, or managers identified through DeliWer's network. All communications must be routed through DeliWer.</p>
                    <p><strong className="text-amber-300">3. Exclusive Channel.</strong> All deals arising from properties accessed through this platform must be registered and closed through DeliWer's RERA-licensed brokerage channels.</p>
                    <p><strong className="text-amber-300">4. Tenant Data Protection.</strong> Client/tenant data submitted during lead claims is logged and retained. Any match with deals closed outside DeliWer constitutes a breach of this agreement.</p>
                    <p><strong className="text-amber-300">5. Enforcement.</strong> Breach entitles DeliWer to: (a) permanent blacklisting from the network, (b) RERA complaint filing, (c) pursuit of damages equivalent to the commission lost. IP address and device data are logged.</p>
                    <p><strong className="text-amber-300">6. Virtual Viewing.</strong> Property tours (live or recorded) are facilitated without exposing unit numbers. Broker agrees not to attempt to identify units through external means.</p>
                    <p className="text-gray-500 text-[10px]">This agreement is governed by UAE law. By ticking the checkbox below, you acknowledge you have read, understood, and accept these terms.</p>
                  </div>
                  <label className="flex items-start gap-3 cursor-pointer" data-testid="label-hpv-nda-accept">
                    <div className={`w-5 h-5 rounded border mt-0.5 flex items-center justify-center shrink-0 cursor-pointer transition-colors ${ndaChecked ? "bg-amber-500 border-amber-500" : "border-white/20 bg-slate-900"}`} onClick={() => setNdaChecked(!ndaChecked)}>
                      {ndaChecked && <Check className="w-3 h-3 text-black" />}
                    </div>
                    <span className="text-xs text-gray-300 leading-relaxed">I, <strong className="text-white">{name}</strong>, confirm that I have read and agree to the NDA/NCA terms above. I understand that my IP, device data and any submitted tenant information may be used as evidence in the event of a breach.</span>
                  </label>
                  <div className="grid grid-cols-2 gap-3">
                    <Button type="button" variant="outline" className="border-white/10 text-gray-400 hover:bg-white/5 font-black rounded-xl h-10 text-xs" onClick={() => setNdaStep("form")}>
                      Back
                    </Button>
                    <Button type="submit" data-testid="button-hpv-accept-nda" disabled={!ndaChecked || ndaMutation.isPending} className="h-10 bg-amber-600 hover:bg-amber-500 text-black font-black uppercase tracking-widest rounded-xl text-xs">
                      {ndaMutation.isPending ? "Recording..." : "Accept & Access Inventory"}
                    </Button>
                  </div>
                </form>
              )}
            </CardContent>
          </Card>
        ) : (
          /* ── Inventory (NDA accepted) ── */
          <div className="space-y-6">

            {/* ── Access confirmed banner ── */}
            <div className="flex flex-wrap items-center justify-between gap-4 bg-emerald-950/30 border border-emerald-500/20 rounded-2xl px-5 py-3">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
                <span className="text-emerald-300 font-black text-sm">NDA Active — {name}</span>
                <span className="text-gray-500 text-xs">· All access is logged</span>
              </div>
              <div className="flex gap-2">
                <Button size="sm" variant="outline" data-testid="button-hpv-my-claims" className="border-amber-500/30 text-amber-300 hover:bg-amber-500/10 text-xs font-black rounded-xl h-8" onClick={() => setActiveModal("my-claims")}>
                  <ClipboardCheck className="w-3.5 h-3.5 mr-1.5" /> My Claims
                </Button>
              </div>
            </div>

            {/* ── Filters ── */}
            <div className="flex flex-wrap gap-3 items-center">
              <span className="text-[10px] font-black uppercase tracking-widest text-gray-500">Filter:</span>
              {["all", "4BR", "5BR", "6BR"].map(t => (
                <button key={t} data-testid={`filter-type-${t}`} onClick={() => setFilterType(t)} className={`px-3 py-1 rounded-lg text-xs font-black border transition-colors ${filterType === t ? "bg-amber-500/20 border-amber-500/40 text-amber-300" : "border-white/10 text-gray-500 hover:border-white/20"}`}>
                  {t === "all" ? "All Types" : t}
                </button>
              ))}
              <div className="w-px h-4 bg-white/10 mx-1" />
              {["all", "Vacant", "Rented", "Hotel"].map(s => (
                <button key={s} data-testid={`filter-status-${s}`} onClick={() => setFilterStatus(s)} className={`px-3 py-1 rounded-lg text-xs font-black border transition-colors ${filterStatus === s ? "bg-purple-500/20 border-purple-500/40 text-purple-300" : "border-white/10 text-gray-500 hover:border-white/20"}`}>
                  {s === "all" ? "All Status" : s}
                </button>
              ))}
              <span className="ml-auto text-[10px] text-gray-600 font-bold">{filtered.length} of {inventory.length} properties</span>
            </div>

            {/* ── Property grid ── */}
            {inventoryQuery.isLoading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {Array.from({ length: 6 }).map((_, i) => <div key={i} className="h-52 rounded-2xl bg-slate-800/60 animate-pulse" />)}
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {filtered.map(p => (
                  <div key={p.id} data-testid={`card-property-${p.id}`} className="bg-slate-900 border border-white/8 rounded-2xl p-5 space-y-4 hover:border-amber-500/30 transition-colors group">
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <p className="font-black text-white text-lg leading-none">{p.unitType}</p>
                        <p className="text-gray-500 text-xs mt-0.5">{p.structureType}</p>
                      </div>
                      <Badge className={`${statusBadge(p.status.trim())} text-[10px] font-black px-2 py-0.5 rounded-lg border`}>
                        {p.status.trim()}
                      </Badge>
                    </div>
                    <div className="space-y-1.5">
                      <p className="text-amber-400 font-black text-xl">{formatMillions(p.salePrice)}</p>
                      <div className="flex items-center gap-1 text-gray-500 text-xs">
                        <MapPin className="w-3 h-3 shrink-0" /> {p.views}
                      </div>
                      <div className="flex gap-4 text-gray-600 text-xs">
                        <span>{p.buaSqft.toLocaleString()} BUA sqft</span>
                        <span>{Math.round(p.areaSqft).toLocaleString()} Plot sqft</span>
                      </div>
                      <div className="text-gray-700 text-[10px] font-bold">
                        {p.claimsCount > 0 ? `${p.claimsCount} active claim${p.claimsCount !== 1 ? "s" : ""}` : "No claims yet"}
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-2 pt-1">
                      <Button size="sm" data-testid={`button-claim-${p.id}`} onClick={() => openClaim(p)} className="h-8 bg-amber-600 hover:bg-amber-500 text-black font-black rounded-lg text-xs">
                        <Target className="w-3.5 h-3.5 mr-1" /> Claim Lead
                      </Button>
                      <Button size="sm" data-testid={`button-vr-${p.id}`} variant="outline" onClick={() => openVR(p)} className="h-8 border-purple-500/30 text-purple-300 hover:bg-purple-500/10 font-black rounded-lg text-xs">
                        <Video className="w-3.5 h-3.5 mr-1" /> VR Tour
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* ── Trust pillars ── */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 pt-2">
              {[
                { icon: Shield, label: "NDA Protected", color: "text-amber-400" },
                { icon: Eye, label: "No Unit Numbers", color: "text-purple-400" },
                { icon: ClipboardCheck, label: "RERA Channels Only", color: "text-emerald-400" },
                { icon: AlertTriangle, label: "Audit Trail Active", color: "text-red-400" },
              ].map(({ icon: Icon, label, color }) => (
                <div key={label} className="flex items-center gap-2.5 bg-slate-900/60 border border-white/6 rounded-xl px-4 py-3">
                  <Icon className={`w-4 h-4 shrink-0 ${color}`} />
                  <span className="text-gray-400 text-xs font-bold">{label}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ── Modals ── */}
        {activeModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm" onClick={e => { if (e.target === e.currentTarget) closeModal(); }}>
            <div className="bg-slate-900 border border-white/10 rounded-2xl w-full max-w-md shadow-2xl overflow-y-auto max-h-[90vh]">

              {/* ── My Claims Modal ── */}
              {activeModal === "my-claims" && (
                <div className="p-6 space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="font-black text-white uppercase text-sm">My Active Claims</h3>
                    <button onClick={closeModal} className="text-gray-500 hover:text-white"><X className="w-5 h-5" /></button>
                  </div>
                  {myClaimsQuery.isLoading && <div className="h-20 bg-slate-800 animate-pulse rounded-xl" />}
                  {myClaimsQuery.data?.length === 0 && <p className="text-gray-500 text-sm text-center py-6">No claims yet. Claim a lead from the inventory above.</p>}
                  {myClaimsQuery.data?.map((c: any) => (
                    <div key={c.id} data-testid={`claim-row-${c.id}`} className="bg-slate-800 border border-white/8 rounded-xl p-4 space-y-2">
                      <div className="flex items-start justify-between gap-2">
                        <div>
                          <p className="font-black text-white text-sm">{c.property?.unitType} {c.property?.structureType}</p>
                          <p className="text-gray-500 text-xs">{c.property?.views} · {c.property ? formatMillions(c.property.salePrice) : ""}</p>
                        </div>
                        <Badge className={`text-[10px] font-black border px-2 py-0.5 ${c.status === "active" ? "bg-emerald-500/15 text-emerald-400 border-emerald-500/30" : "bg-slate-700 text-gray-400 border-white/10"}`}>
                          {c.status}
                        </Badge>
                      </div>
                      <p className="text-gray-600 text-[10px] font-mono">{c.deliwerRefCode}</p>
                      {c.status === "active" && (
                        <Button size="sm" className="w-full h-8 bg-purple-600 hover:bg-purple-500 text-white font-black text-xs rounded-lg" onClick={() => { setSelectedProp(c.property); setReportForm(p => ({ ...p, claimId: c.id })); setActiveModal("report"); }}>
                          <ClipboardCheck className="w-3.5 h-3.5 mr-1.5" /> Report Deal Closure
                        </Button>
                      )}
                    </div>
                  ))}
                </div>
              )}

              {/* ── Claim Lead Modal ── */}
              {activeModal === "claim" && selectedProp && (
                <form onSubmit={handleClaim} className="p-6 space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-black text-white uppercase text-sm">Claim Lead</h3>
                      <p className="text-amber-400 text-xs font-bold">{selectedProp.unitType} {selectedProp.structureType} · {selectedProp.views} · {formatMillions(selectedProp.salePrice)}</p>
                    </div>
                    <button type="button" onClick={closeModal} className="text-gray-500 hover:text-white"><X className="w-5 h-5" /></button>
                  </div>
                  <div className="bg-amber-950/30 border border-amber-500/20 rounded-xl p-3 text-xs text-amber-200/80 leading-relaxed">
                    <strong className="text-amber-300">Claiming this lead</strong> records your name, phone, IP address and client details. All deal activity is monitored. Closing outside DeliWer channels constitutes NDA breach.
                  </div>
                  <div className="space-y-3">
                    <p className="text-[10px] font-black uppercase text-gray-500 tracking-widest">Your Identity (from NDA)</p>
                    <div className="flex gap-2 text-xs text-gray-400 bg-slate-800 rounded-xl px-3 py-2">
                      <span className="font-bold text-white">{name}</span> <span>·</span> <span>{phone}</span>
                    </div>
                  </div>
                  <div className="space-y-3">
                    <p className="text-[10px] font-black uppercase text-gray-500 tracking-widest">Client Details (optional but recommended)</p>
                    <div className="grid grid-cols-2 gap-2">
                      <div className="space-y-1">
                        <Label className={labelCls}>Client Name</Label>
                        <Input data-testid="input-claim-client-name" placeholder="Client name" value={claimClient.name} onChange={e => setClaimClient(p => ({ ...p, name: e.target.value }))} className={inputCls} />
                      </div>
                      <div className="space-y-1">
                        <Label className={labelCls}>Client Phone</Label>
                        <Input data-testid="input-claim-client-phone" placeholder="+971 ..." value={claimClient.phone} onChange={e => setClaimClient(p => ({ ...p, phone: e.target.value }))} className={inputCls} />
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      <div className="space-y-1">
                        <Label className={labelCls}>Nationality</Label>
                        <Input data-testid="input-claim-nationality" placeholder="e.g. British" value={claimClient.nationality} onChange={e => setClaimClient(p => ({ ...p, nationality: e.target.value }))} className={inputCls} />
                      </div>
                      <div className="space-y-1">
                        <Label className={labelCls}>Budget Range</Label>
                        <Input data-testid="input-claim-budget" placeholder="e.g. AED 6-7M" value={claimClient.budget} onChange={e => setClaimClient(p => ({ ...p, budget: e.target.value }))} className={inputCls} />
                      </div>
                    </div>
                    <div className="space-y-1">
                      <Label className={labelCls}>Notes</Label>
                      <Input data-testid="input-claim-notes" placeholder="Any additional context" value={claimClient.notes} onChange={e => setClaimClient(p => ({ ...p, notes: e.target.value }))} className={inputCls} />
                    </div>
                  </div>
                  <Button type="submit" data-testid="button-submit-claim" disabled={claimMutation.isPending} className="w-full h-10 bg-amber-600 hover:bg-amber-500 text-black font-black uppercase rounded-xl text-sm">
                    {claimMutation.isPending ? "Claiming..." : "Claim Lead + Notify DeliWer via WhatsApp"}
                  </Button>
                </form>
              )}

              {/* ── VR Tour Modal ── */}
              {activeModal === "vr" && selectedProp && (
                <form onSubmit={handleVR} className="p-6 space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-black text-white uppercase text-sm">Request Virtual Tour</h3>
                      <p className="text-purple-400 text-xs font-bold">{selectedProp.unitType} {selectedProp.structureType} · {selectedProp.views}</p>
                    </div>
                    <button type="button" onClick={closeModal} className="text-gray-500 hover:text-white"><X className="w-5 h-5" /></button>
                  </div>
                  <div className="bg-purple-950/30 border border-purple-500/20 rounded-xl p-3 text-xs text-purple-200/80 leading-relaxed">
                    DeliWer coordinates with the property manager or landlord to arrange a <strong className="text-purple-300">live video call</strong> or send a <strong className="text-purple-300">recorded walkthrough</strong>. Unit numbers and exact locations are never disclosed in the media.
                  </div>
                  <div className="space-y-1">
                    <Label className={labelCls}>Tour Type *</Label>
                    <div className="grid grid-cols-2 gap-2">
                      {["recorded", "live"].map(t => (
                        <button key={t} type="button" data-testid={`button-tour-type-${t}`} onClick={() => setVrForm(p => ({ ...p, tourType: t }))} className={`py-2 rounded-xl text-xs font-black border transition-colors ${vrForm.tourType === t ? "bg-purple-500/20 border-purple-500/40 text-purple-300" : "border-white/10 text-gray-500"}`}>
                          {t === "recorded" ? "📹 Recorded Video" : "🔴 Live Video Call"}
                        </button>
                      ))}
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <div className="space-y-1">
                      <Label className={labelCls}>Client Name</Label>
                      <Input data-testid="input-vr-client-name" placeholder="Optional" value={vrForm.clientName} onChange={e => setVrForm(p => ({ ...p, clientName: e.target.value }))} className={inputCls} />
                    </div>
                    <div className="space-y-1">
                      <Label className={labelCls}>Client Phone</Label>
                      <Input data-testid="input-vr-client-phone" placeholder="Optional" value={vrForm.clientPhone} onChange={e => setVrForm(p => ({ ...p, clientPhone: e.target.value }))} className={inputCls} />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <div className="space-y-1">
                      <Label className={labelCls}>Preferred Date</Label>
                      <Input data-testid="input-vr-date" type="date" value={vrForm.preferredDate} onChange={e => setVrForm(p => ({ ...p, preferredDate: e.target.value }))} className={inputCls} />
                    </div>
                    <div className="space-y-1">
                      <Label className={labelCls}>Preferred Time</Label>
                      <Input data-testid="input-vr-time" type="time" value={vrForm.preferredTime} onChange={e => setVrForm(p => ({ ...p, preferredTime: e.target.value }))} className={inputCls} />
                    </div>
                  </div>
                  <Button type="submit" data-testid="button-submit-vr" disabled={vrMutation.isPending} className="w-full h-10 bg-purple-600 hover:bg-purple-500 text-white font-black uppercase rounded-xl text-sm">
                    {vrMutation.isPending ? "Requesting..." : <><Camera className="w-4 h-4 mr-2" /> Request Tour via WhatsApp</>}
                  </Button>
                </form>
              )}

              {/* ── Deal Report Modal ── */}
              {activeModal === "report" && selectedProp && (
                <form onSubmit={handleReport} className="p-6 space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-black text-white uppercase text-sm">Report Deal Closure</h3>
                      <p className="text-emerald-400 text-xs font-bold">{selectedProp.unitType} {selectedProp.structureType} · {selectedProp.views}</p>
                    </div>
                    <button type="button" onClick={closeModal} className="text-gray-500 hover:text-white"><X className="w-5 h-5" /></button>
                  </div>
                  <div className="bg-emerald-950/30 border border-emerald-500/20 rounded-xl p-3 text-xs text-emerald-200/80 leading-relaxed">
                    Report the deal so DeliWer can verify, process commission, and register the transaction through RERA-licensed channels. Tenant data is retained for anti-poaching audit.
                  </div>
                  {!reportForm.claimId && (
                    <div className="space-y-1">
                      <Label className={labelCls}>Your Claim Ref Code *</Label>
                      <Input data-testid="input-report-claim-id" placeholder="DLW-HPV-... (from My Claims)" value={reportForm.claimId} onChange={e => setReportForm(p => ({ ...p, claimId: e.target.value }))} className={inputCls} required />
                    </div>
                  )}
                  {reportForm.claimId && <p className="text-gray-600 text-[10px] font-mono">Claim: {reportForm.claimId.slice(0, 8).toUpperCase()}...</p>}
                  <div className="grid grid-cols-2 gap-2">
                    <div className="space-y-1">
                      <Label className={labelCls}>Closing Price (AED)</Label>
                      <Input data-testid="input-report-price" type="number" placeholder="e.g. 6200000" value={reportForm.closingPrice} onChange={e => setReportForm(p => ({ ...p, closingPrice: e.target.value }))} className={inputCls} />
                    </div>
                    <div className="space-y-1">
                      <Label className={labelCls}>RERA Txn No.</Label>
                      <Input data-testid="input-report-rera" placeholder="Optional" value={reportForm.reraTransactionNo} onChange={e => setReportForm(p => ({ ...p, reraTransactionNo: e.target.value }))} className={inputCls} />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <div className="space-y-1">
                      <Label className={labelCls}>Tenant Name *</Label>
                      <Input data-testid="input-report-tenant-name" placeholder="Full name" value={reportForm.tenantName} onChange={e => setReportForm(p => ({ ...p, tenantName: e.target.value }))} className={inputCls} />
                    </div>
                    <div className="space-y-1">
                      <Label className={labelCls}>Tenant Phone *</Label>
                      <Input data-testid="input-report-tenant-phone" placeholder="+971 ..." value={reportForm.tenantPhone} onChange={e => setReportForm(p => ({ ...p, tenantPhone: e.target.value }))} className={inputCls} />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <div className="space-y-1">
                      <Label className={labelCls}>Tenant Email</Label>
                      <Input data-testid="input-report-tenant-email" type="email" placeholder="Optional" value={reportForm.tenantEmail} onChange={e => setReportForm(p => ({ ...p, tenantEmail: e.target.value }))} className={inputCls} />
                    </div>
                    <div className="space-y-1">
                      <Label className={labelCls}>Tenant Nationality</Label>
                      <Input data-testid="input-report-nationality" placeholder="e.g. British" value={reportForm.tenantNationality} onChange={e => setReportForm(p => ({ ...p, tenantNationality: e.target.value }))} className={inputCls} />
                    </div>
                  </div>
                  <div className="space-y-1">
                    <Label className={labelCls}>Notes</Label>
                    <Input data-testid="input-report-notes" placeholder="Any additional details" value={reportForm.notes} onChange={e => setReportForm(p => ({ ...p, notes: e.target.value }))} className={inputCls} />
                  </div>
                  <Button type="submit" data-testid="button-submit-report" disabled={reportMutation.isPending || !reportForm.claimId} className="w-full h-10 bg-emerald-600 hover:bg-emerald-500 text-white font-black uppercase rounded-xl text-sm">
                    {reportMutation.isPending ? "Submitting..." : <><Send className="w-4 h-4 mr-2" /> Submit Deal Report</>}
                  </Button>
                </form>
              )}

            </div>
          </div>
        )}

      </div>
    </section>
  );
}

// ── WhatsApp Agentic Onboarding Wizard ─────────────────────────────────────

const WA_OB = "971523946311";

interface OBData {
  name: string; phone: string; rera: string; brokerage: string; area: string;
  code: string; tenantName: string; tenantPhone: string;
  moveArea: string; moveDate: string; services: string; month: string;
}
const OB_DEFAULT: OBData = {
  name: "", phone: "", rera: "", brokerage: "", area: "",
  code: "", tenantName: "", tenantPhone: "",
  moveArea: "", moveDate: "", services: "", month: "",
};

function buildOBMsg(step: number, d: OBData): string {
  switch (step) {
    case 0: return `Hi DeliWer 👋 I want to join the Broker Partner program.

Name: ${d.name || "—"}
WhatsApp: ${d.phone || "—"}
RERA License: ${d.rera || "—"}
Agency / Brokerage: ${d.brokerage || "—"}
Area of focus: ${d.area || "—"}

Please register my account and confirm receipt.
— deliwer.com/brokers`;
    case 1: return `Hi DeliWer ✅ I confirm and accept the Broker Partner terms:

• AED 150–800 per confirmed move-in referral
• 50/50 commission split on routed sales & leases
• Monthly bank payouts
• All tenant activity routes exclusively through DeliWer
• No direct approach to landlords or property managers

Name: ${d.name || "—"} | ${d.phone || "—"}

Ready to receive my unique referral link.
— deliwer.com/brokers`;
    case 2: return `Hi DeliWer 🔗 Please activate my referral link.

Name: ${d.name || "—"}
Phone: ${d.phone || "—"}
RERA: ${d.rera || "—"}${d.code ? `\nRef Code (if pre-assigned): ${d.code}` : ""}

Ready to start referring clients.
— deliwer.com/brokers`;
    case 3: return `Hi DeliWer 📋 Sending my first referral:

Tenant Name: ${d.tenantName || "—"}
Tenant Phone: ${d.tenantPhone || "—"}
Area / Property: ${d.moveArea || "—"}
Approx Move-In: ${d.moveDate || "—"}
Services Needed: ${d.services || "Ejari + DEWA + Movers"}

My Ref Code: ${d.code || "—"}

Please contact them with the DeliWer move-in package.
— deliwer.com/brokers`;
    case 4: return `Hi DeliWer 💰 Requesting my payout statement.

Name: ${d.name || "—"}
Ref Code: ${d.code || "—"}
Period: ${d.month || "—"}

Please send my commission breakdown and initiate transfer.
— deliwer.com/brokers`;
    default: return "";
  }
}

const OB_STEPS = [
  {
    label: "Register",
    title: "Introduce Yourself",
    subtitle: "Send your broker profile — DeliWer confirms receipt within 2–4 hrs",
    icon: Users,
    color: "emerald",
    fields: [
      { key: "name",      label: "Full Name",           placeholder: "Your full name",           required: true },
      { key: "phone",     label: "WhatsApp Number",     placeholder: "+971 50 000 0000",         required: true },
      { key: "rera",      label: "RERA License No.",    placeholder: "Optional but recommended", required: false },
      { key: "brokerage", label: "Agency / Brokerage",  placeholder: "Your company",             required: false },
      { key: "area",      label: "Primary Area / Focus",placeholder: "e.g. Dubai Marina, JVC",  required: false },
    ],
    afterSend: "DeliWer replies within 2–4 hrs confirming your profile is registered.",
  },
  {
    label: "Confirm Terms",
    title: "Accept Commission Structure",
    subtitle: "One message confirms you understand the partner terms — no paperwork",
    icon: CheckCircle2,
    color: "purple",
    fields: [],
    afterSend: "DeliWer replies with your unique referral code and link activation.",
  },
  {
    label: "Get Your Link",
    title: "Request Your Referral Link",
    subtitle: "Once DeliWer sends your code, you can start sharing immediately",
    icon: Zap,
    color: "amber",
    fields: [
      { key: "code", label: "Your Ref Code (if already received)", placeholder: "e.g. debacci — leave blank if not yet received", required: false },
    ],
    afterSend: "DeliWer activates your trackable link. Share it with every tenant you sign.",
  },
  {
    label: "First Referral",
    title: "Send Your First Tenant",
    subtitle: "One message hands off the tenant — DeliWer handles everything from here",
    icon: Send,
    color: "sky",
    fields: [
      { key: "tenantName",  label: "Tenant Name",          placeholder: "Full name",                required: true },
      { key: "tenantPhone", label: "Tenant WhatsApp",       placeholder: "+971 50 000 0000",         required: true },
      { key: "moveArea",    label: "Area / Property",       placeholder: "e.g. Dubai Marina, Apt 12B",required: false },
      { key: "moveDate",    label: "Approx Move-In Date",   placeholder: "e.g. June 2026",           required: false },
      { key: "services",    label: "Services Needed",       placeholder: "Ejari + DEWA + Movers",    required: false },
    ],
    afterSend: "DeliWer contacts the tenant directly and handles the full move-in. You earn when it confirms.",
  },
  {
    label: "Get Paid",
    title: "Request Your Commission",
    subtitle: "Monthly payouts — one message triggers your earnings statement",
    icon: Wallet,
    color: "yellow",
    fields: [
      { key: "month", label: "Month / Period", placeholder: "e.g. May 2026", required: true },
    ],
    afterSend: "DeliWer sends your commission breakdown within 24 hrs and initiates bank transfer.",
  },
];

const COLOR_MAP: Record<string, { badge: string; border: string; btn: string; text: string; bg: string; dot: string }> = {
  emerald: { badge: "bg-emerald-500/15 text-emerald-400 border-emerald-500/30", border: "border-emerald-500/30", btn: "bg-emerald-600 hover:bg-emerald-500", text: "text-emerald-400", bg: "bg-emerald-500/5", dot: "bg-emerald-500" },
  purple:  { badge: "bg-purple-500/15 text-purple-400 border-purple-500/30",   border: "border-purple-500/30",   btn: "bg-purple-600 hover:bg-purple-500",   text: "text-purple-400",  bg: "bg-purple-500/5",  dot: "bg-purple-500" },
  amber:   { badge: "bg-amber-500/15 text-amber-400 border-amber-500/30",      border: "border-amber-500/30",    btn: "bg-amber-600 hover:bg-amber-500",    text: "text-amber-400",   bg: "bg-amber-500/5",   dot: "bg-amber-500" },
  sky:     { badge: "bg-sky-500/15 text-sky-400 border-sky-500/30",            border: "border-sky-500/30",      btn: "bg-sky-600 hover:bg-sky-500",        text: "text-sky-400",     bg: "bg-sky-500/5",     dot: "bg-sky-500" },
  yellow:  { badge: "bg-yellow-500/15 text-yellow-400 border-yellow-500/30",   border: "border-yellow-500/30",   btn: "bg-yellow-500 hover:bg-yellow-400 text-black", text: "text-yellow-400", bg: "bg-yellow-500/5", dot: "bg-yellow-500" },
};

function BrokerWhatsAppOnboarding() {
  const { toast } = useToast();
  const [step, setStep] = useState<number>(() => {
    try { return parseInt(localStorage.getItem("ob_step") || "0", 10); } catch { return 0; }
  });
  const [data, setData] = useState<OBData>(() => {
    try { return { ...OB_DEFAULT, ...(JSON.parse(localStorage.getItem("ob_data") || "{}")) }; } catch { return OB_DEFAULT; }
  });
  const [sent, setSent] = useState<number[]>(() => {
    try { return JSON.parse(localStorage.getItem("ob_sent") || "[]"); } catch { return []; }
  });
  const [copied, setCopied] = useState(false);

  function persist(newData: OBData, newStep: number, newSent: number[]) {
    try {
      localStorage.setItem("ob_step", String(newStep));
      localStorage.setItem("ob_data", JSON.stringify(newData));
      localStorage.setItem("ob_sent", JSON.stringify(newSent));
    } catch {}
  }

  function setField(key: keyof OBData, val: string) {
    const nd = { ...data, [key]: val };
    setData(nd);
    persist(nd, step, sent);
  }

  function goToStep(s: number) {
    setStep(s);
    persist(data, s, sent);
  }

  function markSent() {
    const ns = [...new Set([...sent, step])];
    setSent(ns);
    persist(data, step, ns);
  }

  function advanceStep() {
    markSent();
    const next = Math.min(step + 1, OB_STEPS.length - 1);
    goToStep(next);
    setTimeout(() => window.scrollBy({ top: 100, behavior: "smooth" }), 80);
  }

  async function copyMsg() {
    try {
      await navigator.clipboard.writeText(buildOBMsg(step, data));
      setCopied(true);
      toast({ title: "Message copied", description: "Paste it into any chat app." });
      setTimeout(() => setCopied(false), 2500);
    } catch {}
  }

  function openWaStep() {
    const msg = buildOBMsg(step, data);
    window.open(`https://wa.me/${WA_OB}?text=${encodeURIComponent(msg)}`, "_blank");
  }

  const cur = OB_STEPS[step];
  const c = COLOR_MAP[cur.color];
  const Icon = cur.icon;
  const msg = buildOBMsg(step, data);
  const isSent = sent.includes(step);
  const allDone = sent.length === OB_STEPS.length;

  return (
    <div id="onboard" className="py-16 px-4 bg-gradient-to-b from-slate-950 via-slate-900/40 to-slate-950 border-b border-white/5">
      <div className="max-w-3xl mx-auto space-y-8">

        {/* Header */}
        <div className="text-center space-y-2">
          <Badge className="bg-emerald-500/10 border-emerald-500/25 text-emerald-400 text-[10px] font-black uppercase tracking-widest px-4 py-1.5">
            <MessageCircle className="w-3 h-3 mr-1.5" /> WhatsApp Onboarding — Zero Cost · No API
          </Badge>
          <h2 className="text-2xl md:text-3xl font-black uppercase tracking-tighter text-white">
            5-Step Broker Activation
          </h2>
          <p className="text-gray-500 text-sm max-w-lg mx-auto">
            Complete your setup entirely over WhatsApp. Each step generates a ready-to-send message — you just tap send.
          </p>
        </div>

        {/* Step Progress */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1">
          {OB_STEPS.map((s, i) => {
            const done = sent.includes(i);
            const active = i === step;
            const cc = COLOR_MAP[s.color];
            const SIcon = s.icon;
            return (
              <button
                key={i}
                data-testid={`ob-step-${i}`}
                onClick={() => goToStep(i)}
                className={`flex items-center gap-2 px-3 py-2 rounded-xl border text-xs font-black whitespace-nowrap transition-all shrink-0 ${
                  done  ? "bg-emerald-500/10 border-emerald-500/30 text-emerald-400" :
                  active ? `${cc.bg} ${cc.border} ${cc.text}` :
                  "border-white/8 text-gray-600 hover:text-gray-400 hover:border-white/15"
                }`}
              >
                {done ? <CheckCircle2 className="w-3.5 h-3.5" /> : <SIcon className="w-3.5 h-3.5" />}
                <span className="hidden sm:inline">{s.label}</span>
                <span className="sm:hidden">{i + 1}</span>
              </button>
            );
          })}
        </div>

        {/* Active Step Card */}
        <div className={`rounded-2xl border ${c.border} ${c.bg} overflow-hidden`}>

          {/* Step header */}
          <div className="px-6 pt-6 pb-4 space-y-1">
            <div className="flex items-center gap-3">
              <div className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 ${c.badge}`}>
                <Icon className="w-4.5 h-4.5" />
              </div>
              <div>
                <p className={`text-[10px] font-black uppercase tracking-widest ${c.text}`}>Step {step + 1} of {OB_STEPS.length} · {cur.label}</p>
                <h3 className="text-white font-black text-lg uppercase tracking-tight leading-none">{cur.title}</h3>
              </div>
              {isSent && <Badge className="ml-auto bg-emerald-500/15 text-emerald-400 border-emerald-500/30 text-[10px] font-black uppercase">✓ Sent</Badge>}
            </div>
            <p className="text-gray-400 text-sm pl-12">{cur.subtitle}</p>
          </div>

          <div className="px-6 pb-6 space-y-5">
            {/* Form Fields */}
            {cur.fields.length > 0 && (
              <div className={`grid grid-cols-1 ${cur.fields.length >= 4 ? "sm:grid-cols-2" : ""} gap-3`}>
                {cur.fields.map(f => (
                  <div key={f.key} className="space-y-1.5">
                    <label className="text-[10px] font-black uppercase tracking-widest text-gray-500">
                      {f.label}{f.required && <span className={`ml-1 ${c.text}`}>*</span>}
                    </label>
                    <Input
                      data-testid={`ob-field-${f.key}`}
                      placeholder={f.placeholder}
                      value={(data as any)[f.key]}
                      onChange={e => setField(f.key as keyof OBData, e.target.value)}
                      className="bg-slate-900 border-white/10 text-white placeholder:text-gray-600 h-10 text-sm rounded-xl"
                    />
                  </div>
                ))}
              </div>
            )}

            {/* Message Preview */}
            <div className="space-y-2">
              <p className="text-[10px] font-black uppercase tracking-widest text-gray-500">Message Preview</p>
              <div className="bg-slate-950 border border-white/8 rounded-xl p-4 relative group">
                <pre className="text-xs text-gray-300 leading-relaxed font-mono whitespace-pre-wrap break-words">{msg}</pre>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="space-y-3">
              <div className="flex gap-3">
                <button
                  data-testid={`ob-copy-${step}`}
                  onClick={copyMsg}
                  className="flex items-center gap-2 px-4 py-2.5 rounded-xl border border-white/10 text-gray-400 hover:text-white hover:border-white/20 text-xs font-black uppercase tracking-widest transition-all bg-white/3 hover:bg-white/6"
                >
                  {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  {copied ? "Copied" : "Copy"}
                </button>
                <button
                  data-testid={`ob-send-${step}`}
                  onClick={openWaStep}
                  className={`flex-1 flex items-center justify-center gap-2 px-6 py-2.5 rounded-xl text-white text-sm font-black uppercase tracking-widest transition-all ${c.btn} shadow-lg`}
                >
                  <MessageCircle className="w-4 h-4" />
                  Open in WhatsApp → Send
                </button>
              </div>

              {/* After-send info + advance */}
              <div className="bg-slate-900/60 border border-white/6 rounded-xl px-4 py-3 flex items-start gap-3">
                <Clock className="w-4 h-4 text-gray-500 shrink-0 mt-0.5" />
                <div className="flex-1">
                  <p className="text-xs text-gray-400 leading-relaxed">{cur.afterSend}</p>
                </div>
              </div>

              {/* Confirm + advance */}
              <div className="flex gap-3">
                {step > 0 && (
                  <button
                    data-testid="ob-back"
                    onClick={() => goToStep(step - 1)}
                    className="px-4 py-2 rounded-xl border border-white/10 text-gray-500 hover:text-white text-xs font-black uppercase tracking-widest transition-all"
                  >
                    ← Back
                  </button>
                )}
                {step < OB_STEPS.length - 1 ? (
                  <button
                    data-testid="ob-advance"
                    onClick={advanceStep}
                    className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 text-white text-xs font-black uppercase tracking-widest transition-all"
                  >
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" /> I've Sent This → Next Step
                  </button>
                ) : (
                  <button
                    data-testid="ob-finish"
                    onClick={advanceStep}
                    className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-black uppercase tracking-widest transition-all"
                  >
                    <Star className="w-3.5 h-3.5" /> Complete Onboarding
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Completion Banner */}
        {allDone && (
          <div className="bg-emerald-950/40 border border-emerald-500/30 rounded-2xl px-6 py-5 flex items-center gap-4">
            <div className="w-10 h-10 rounded-full bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center shrink-0">
              <CheckCircle2 className="w-5 h-5 text-emerald-400" />
            </div>
            <div>
              <p className="font-black text-emerald-300 text-sm uppercase tracking-wide">Onboarding Complete</p>
              <p className="text-gray-400 text-xs mt-0.5">You've sent all 5 steps. DeliWer is processing your account. Track your earnings at <Link href="/partner-dashboard" className="text-emerald-400 hover:underline">Partner Dashboard →</Link></p>
            </div>
          </div>
        )}

        {/* Reset link */}
        <div className="text-center">
          <button
            data-testid="ob-reset"
            onClick={() => {
              try { localStorage.removeItem("ob_step"); localStorage.removeItem("ob_data"); localStorage.removeItem("ob_sent"); } catch {}
              setStep(0); setData(OB_DEFAULT); setSent([]);
            }}
            className="text-[10px] text-gray-700 hover:text-gray-500 uppercase tracking-widest font-bold transition-colors"
          >
            Reset onboarding progress
          </button>
        </div>
      </div>
    </div>
  );
}

// ── Static data ────────────────────────────────────────────────────────────

const CAREER_STEPS = [
  { step: "01", title: "Get Your Free Link", desc: "Enter your name, generate your unique referral link in seconds. No fees, no commitment.", color: "emerald", icon: Zap, locked: false },
  { step: "02", title: "Refer Clients & Earn", desc: "Share your link after viewings or lease signings. Earn AED 300–800 per move-in you refer.", color: "purple", icon: TrendingUp, locked: false },
  { step: "03", title: "Join the Inner Circle", desc: "Unlock deal flow, performance tracking, 50/50 commission splits and exclusive DAMAC inventory.", color: "amber", icon: Crown, locked: true },
];

const EARN_HIGHLIGHTS = [
  { icon: Award, label: "Move-In Override", value: "AED 300–800", sub: "per closed lease referral" },
  { icon: TrendingUp, label: "Lease & Sale Splits", value: "50 / 50", sub: "on all routed deals" },
  { icon: Building2, label: "Distress Inventory", value: "Below Market", sub: "DAMAC secondary units" },
  { icon: ShieldCheck, label: "Monthly Payouts", value: "Tracked", sub: "statement per deal" },
];

const BROKER_TYPES = [
  { icon: Building2, label: "RERA-Licensed Brokers", desc: "Plug your pipeline into a vetted referral network." },
  { icon: KeyRound, label: "Resale & Distress Specialists", desc: "Exclusive below-market DAMAC inventory under NDA." },
  { icon: Home, label: "Rental Agents & PMs", desc: "Turn every lease into recurring referral income." },
];

const AREA_DATA: Record<string, { deals: number; avgComm: number; priority: string }> = {
  "Dubai Marina / JBR":      { deals: 9,  avgComm: 3200, priority: "HIGH" },
  "Downtown / Business Bay": { deals: 7,  avgComm: 3800, priority: "HIGH" },
  "JVC / JVT":               { deals: 12, avgComm: 2400, priority: "MEDIUM" },
  "Dubai Hills / MBR City":  { deals: 6,  avgComm: 4100, priority: "HIGH" },
  "Deira / Bur Dubai":       { deals: 11, avgComm: 1900, priority: "MEDIUM" },
  "Sharjah":                 { deals: 8,  avgComm: 1600, priority: "MEDIUM" },
  "Ajman":                   { deals: 5,  avgComm: 1200, priority: "LOW" },
};

const MOCK_OPPORTUNITIES = [
  { id: "LD-2026-0041", type: "2BR Apartment", area: "Dubai Marina", need: "Tenant Needed", commission: 3200, slots: 2, priority: "HIGH" },
  { id: "LD-2026-0038", type: "Studio", area: "JVC", need: "Move-In Package", commission: 1800, slots: 3, priority: "MEDIUM" },
  { id: "LD-2026-0035", type: "3BR Villa", area: "Dubai Hills", need: "Tenant + Services", commission: 5500, slots: 1, priority: "HIGH" },
  { id: "LD-2026-0033", type: "1BR Apartment", area: "Business Bay", need: "Ejari + Setup", commission: 2600, slots: 2, priority: "HIGH" },
  { id: "LD-2026-0029", type: "Retail Unit", area: "Deira", need: "Commercial Tenant", commission: 4800, slots: 1, priority: "MEDIUM" },
  { id: "LD-2026-0027", type: "2BR Apartment", area: "JBR", need: "Tenant Needed", commission: 3600, slots: 3, priority: "MEDIUM" },
];

const SCRIPTS = [
  {
    title: "After Property Viewing",
    scenario: "Send after the viewing when the client is interested",
    script: `Hi [Client Name], great speaking with you today! 🏠\n\nIf this is the one, here's how to sort everything fast:\n\nDeliWer handles Ejari, DEWA, movers and setup in one place — and I get notified the moment they're in.\n\n[YOUR REFERRAL LINK]\n\nThey'll contact you directly on WhatsApp. Makes the whole process stress-free.`,
  },
  {
    title: "After Lease Signing",
    scenario: "Send immediately after the tenancy contract is signed",
    script: `Hi [Tenant Name], congratulations on your new home! 🎉\n\nOne thing I always recommend — DeliWer handles everything you need after getting your keys: Ejari, DEWA setup, movers, and cleaning.\n\nHere's the link — they'll contact you directly:\n\n[YOUR REFERRAL LINK]\n\nThey respond fast on WhatsApp.`,
  },
  {
    title: "Secondary Market / Distress Sale",
    scenario: "Pitch a buyer on a below-market DAMAC distress unit",
    script: `Hi [Buyer Name], I have access to a vetted off-market DAMAC distress unit that fits your budget — priced below current market for fast movement.\n\nI can share the dossier (price, comparables, demand signal) once we're aligned on the area.\n\nReply YES and I'll send it across today.\n\n[YOUR REFERRAL LINK]`,
  },
  {
    title: "Broker-to-Broker Outreach",
    scenario: "Invite another RERA broker into the network",
    script: `Hi [Name], quick one — DeliWer Realty gives RERA brokers reserved community pools and below-market DAMAC distress inventory under NDA. 50/50 splits on routed leases & sales, plus the move-in service override on top.\n\nWant to look at the inner-circle deck? → [YOUR REFERRAL LINK]`,
  },
];

const PARTNER_TYPES = [
  "RERA Real Estate Broker", "Rental Agent", "Secondary Market / Resale Agent",
  "Property Manager", "Brokerage Team Lead", "Independent Agent", "Other",
];

// ── Helpers ────────────────────────────────────────────────────────────────

function cleanName(name: string) {
  return name.toLowerCase().trim().replace(/\s+/g, "_").replace(/[^a-z0-9_]/g, "");
}

function generateLeadId() {
  const n = Math.floor(1000 + Math.random() * 9000);
  return `LD-${new Date().getFullYear()}-${n}`;
}

function formatAED(n: number) {
  return `AED ${n.toLocaleString()}`;
}

// ── Sub-components ─────────────────────────────────────────────────────────

function QRCodeDisplay({ url }: { url: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [ready, setReady] = useState(false);
  useEffect(() => {
    if (!url || !canvasRef.current) return;
    import("qrcode").then((QR) => {
      QR.toCanvas(canvasRef.current!, url, { width: 160, margin: 2, color: { dark: "#a855f7", light: "#0f172a" } }, (e) => { if (!e) setReady(true); });
    }).catch(() => {});
  }, [url]);
  return (
    <div className="flex flex-col items-center gap-2">
      <canvas ref={canvasRef} className={`rounded-xl border border-purple-500/30 transition-opacity duration-300 ${ready ? "opacity-100" : "opacity-0"}`} style={{ width: 160, height: 160 }} />
      {!ready && <div className="w-40 h-40 rounded-xl border border-purple-500/30 bg-slate-800 animate-pulse" />}
      <p className="text-[10px] text-gray-600 font-medium">Scan to share</p>
    </div>
  );
}

/** Animated live-stat ticker for the hero */
function LiveStatBar() {
  const stats = [
    { value: "31", label: "Active Opportunities" },
    { value: "AED 148K", label: "Pipeline This Week" },
    { value: "14", label: "Brokers Closed Deals" },
  ];
  return (
    <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-6" data-testid="hero-live-stats">
      {stats.map((s, i) => (
        <div key={i} className="flex items-center gap-2">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
          </span>
          <span className="text-emerald-300 font-black text-sm">{s.value}</span>
          <span className="text-gray-500 text-xs">{s.label}</span>
        </div>
      ))}
    </div>
  );
}

/** Scarcity badge color */
function priorityColor(p: string) {
  if (p === "HIGH") return "bg-red-500/15 text-red-400 border-red-500/25";
  if (p === "MEDIUM") return "bg-amber-500/15 text-amber-400 border-amber-500/25";
  return "bg-slate-700/60 text-gray-400 border-white/10";
}

// ── Main page ──────────────────────────────────────────────────────────────

export default function BrokerPartnerPage() {
  const [partnerName, setPartnerName] = useState("");
  const [generatedRef, setGeneratedRef] = useState("");
  const [generatedLink, setGeneratedLink] = useState("");
  const [leadId, setLeadId] = useState("");
  const [copied, setCopied] = useState(false);
  const [copiedScript, setCopiedScript] = useState<number | null>(null);
  const [expandedScript, setExpandedScript] = useState<number | null>(null);
  const [showQR, setShowQR] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [appForm, setAppForm] = useState({ fullName: "", companyName: "", partnerType: "", email: "", phone: "", dealsClosed: "", hasTenants: "", areaFocus: "" });

  // Calculator
  const [selectedArea, setSelectedArea] = useState("");
  const [showCalc, setShowCalc] = useState(false);
  const [claimedSlots, setClaimedSlots] = useState<Record<string, number>>({});

  // AI Assistant widget
  const [aiOpen, setAiOpen] = useState(false);
  const [aiAssigned, setAiAssigned] = useState(false);
  const [captureForm, setCaptureForm] = useState({ clientType: "", phone: "", unit: "" });
  const [showCapture, setShowCapture] = useState(false);

  const generatorRef = useRef<HTMLDivElement>(null);
  const applyRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

  const calcData = selectedArea ? AREA_DATA[selectedArea] : null;

  function handleGenerate() {
    if (!partnerName.trim()) {
      toast({ title: "Enter your name", description: "Type your name to generate your unique referral link." });
      return;
    }
    const ref = cleanName(partnerName);
    const lid = generateLeadId();
    const link = `https://www.deliwer.com/move-in?ref=${ref}`;
    setGeneratedRef(ref);
    setGeneratedLink(link);
    setLeadId(lid);
    setShowQR(false);
    logEvent({ ref, page: "/brokers", timestamp: new Date().toISOString(), action: "link_generated" });
    toast({ title: "Your link is ready!", description: `Lead ID ${lid} — share it after the next viewing.` });
  }

  function handleKeyDown(e: React.KeyboardEvent) { if (e.key === "Enter") handleGenerate(); }

  async function copyLink() {
    if (!generatedLink) return;
    await navigator.clipboard.writeText(generatedLink);
    setCopied(true);
    toast({ title: "Copied!", description: "Paste into WhatsApp right after the viewing." });
    setTimeout(() => setCopied(false), 2500);
  }

  function shareOnWhatsApp() {
    const msg = `My referral link ${leadId ? `(${leadId}) ` : ""}— I help clients complete their move-in (Ejari, movers, setup) fast: ${generatedLink}`;
    window.open(`https://wa.me/?text=${encodeURIComponent(msg)}`, "_blank");
    logEvent({ ref: generatedRef, page: "/brokers", timestamp: new Date().toISOString(), action: "whatsapp_click" });
  }

  function claimOpportunity(opp: typeof MOCK_OPPORTUNITIES[0]) {
    const remaining = Math.max(0, opp.slots - (claimedSlots[opp.id] || 0));
    if (remaining === 0) return;
    setClaimedSlots(prev => ({ ...prev, [opp.id]: (prev[opp.id] || 0) + 1 }));
    const msg = `Hi DeliWer — I'm a broker and I want to claim opportunity ${opp.id} (${opp.type} · ${opp.area}). My referral code: ${generatedRef || "pending"}`;
    window.open(`https://wa.me/971523946311?text=${encodeURIComponent(msg)}`, "_blank");
  }

  function handleJoinWhatsApp() {
    openWA(buildWhatsAppMessage({
      intro: "Hi DeliWer, I'm a real estate broker interested in the partner referral program.",
      fields: { Name: appForm.fullName || partnerName || undefined },
    }));
  }

  async function copyScript(idx: number, text: string) {
    const link = generatedLink || "https://www.deliwer.com/move-in?ref=YOURCODE";
    await navigator.clipboard.writeText(text.replace(/\[YOUR REFERRAL LINK\]/g, link));
    setCopiedScript(idx);
    toast({ title: "Script copied!", description: "Replace [Client Name] and paste into WhatsApp." });
    setTimeout(() => setCopiedScript(null), 2500);
  }

  function scrollTo(ref: React.RefObject<HTMLDivElement>) {
    ref.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  async function handleAppSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!appForm.fullName || !appForm.email || !appForm.partnerType) {
      toast({ title: "Please fill required fields", variant: "destructive" });
      return;
    }
    const ref = cleanName(appForm.companyName || appForm.fullName);
    const lid = generateLeadId();
    const link = `https://deliwer.com/?ref=${ref}`;
    try {
      await fetch("/api/affiliate/track", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ affiliateCode: ref, event: "partner_signup", leadId: lid, ...appForm }),
      });
    } catch {}
    setGeneratedLink(link);
    setGeneratedRef(ref);
    setLeadId(lid);
    setSubmitted(true);
    toast({ title: "Welcome to the Network!", description: `Your Lead ID is ${lid}. We'll reach out within 24h.` });
    generatorRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });
  }

  return (
    <div className="min-h-screen bg-slate-950 text-white pb-24 md:pb-0">
      <SEOMeta
        title="Brokers — Real Estate Referral Career | DeliWer"
        description="RERA brokers and rental agents: join DeliWer's broker referral network. Earn AED 300–800 per move-in, 50/50 commission splits, and exclusive DAMAC distress inventory."
      />
      <Navigation />
      <PartnerSubNav />

      {/* ── HERO ──────────────────────────────────────────── */}
      <section className="relative min-h-[580px] md:min-h-[640px] flex items-center pt-24 md:pt-28 pb-16 px-4 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img src="https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1800&h=900&fit=crop&q=80" alt="Dubai real estate" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-br from-slate-950/85 via-purple-950/60 to-slate-950/85" />
        </div>
        <div className="max-w-2xl mx-auto text-center relative z-10 space-y-6 bg-slate-950/55 backdrop-blur-sm rounded-3xl px-8 py-10 border border-white/5 shadow-2xl shadow-black/50">
          <Badge className="bg-purple-500/15 text-purple-300 border-purple-500/30 px-4 py-2 text-xs font-black uppercase tracking-widest rounded-full">
            DeliWer Broker Program
          </Badge>
          <h1 className="text-4xl md:text-5xl font-black tracking-tighter leading-[0.9] uppercase">
            Access Real Estate Deals.<br />
            <span className="text-emerald-400">Earn Per Closing</span>{" "}
            <span className="text-purple-400">with DeliWer.</span>
          </h1>
          <p className="text-base text-gray-300 max-w-md mx-auto leading-relaxed">
            Join Dubai's fastest-growing broker referral network. Real deals, real commissions, zero upfront cost. Start earning today.
          </p>

          <LiveStatBar />

          <div className="flex flex-col sm:flex-row gap-3 justify-center pt-2">
            <Button data-testid="button-hero-get-link" size="lg" className="bg-emerald-600 hover:bg-emerald-500 text-white font-black rounded-2xl px-10 h-14 text-base shadow-2xl shadow-emerald-900/40" onClick={() => scrollTo(generatorRef)}>
              <Zap className="w-5 h-5 mr-2" /> Start Earning Now
            </Button>
            <Button data-testid="button-hero-have-deal" size="lg" variant="outline" className="border-amber-500/30 text-amber-300 hover:bg-amber-500/10 font-black rounded-2xl px-8 h-14 text-base" onClick={() => document.getElementById("opportunities")?.scrollIntoView({ behavior: "smooth" })}>
              <Target className="w-5 h-5 mr-2" /> I Have a Deal
            </Button>
          </div>

          {/* ── Broker Control Dashboard link ── */}
          <div className="flex justify-center pt-1">
            <Link href="/partner-dashboard" className="text-[#ffffff]">
              <button data-testid="button-broker-control-dashboard" className="inline-flex items-center gap-2 text-xs text-gray-400 hover:text-emerald-300 border border-white/10 hover:border-emerald-500/30 rounded-xl px-5 py-2.5 transition-all bg-white/5 hover:bg-emerald-500/10 font-bold uppercase tracking-widest">
                <BarChart2 className="w-3.5 h-3.5" /> Broker Operations Dashboard
              </button>
            </Link>
          </div>
        </div>
      </section>

      {/* ── MICRO-ALERT STRIP ────────────────────────────── */}
      <div className="bg-slate-900/80 border-b border-white/5 px-4 py-2.5">
        <div className="max-w-4xl mx-auto flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-8">
          <div className="flex items-center gap-2 text-xs">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500" />
            </span>
            <span className="text-red-300 font-black">2 opportunities claimed in the last hour</span>
          </div>
          <div className="hidden sm:block w-px h-4 bg-white/10" />
          <div className="flex items-center gap-2 text-xs text-amber-300 font-black">
            <AlertCircle className="w-3.5 h-3.5 text-amber-400" />
            You missed AED 6,400 in deals today — don't miss tomorrow's
          </div>
          <div className="hidden sm:block w-px h-4 bg-white/10" />
          <div className="flex items-center gap-2 text-xs text-gray-400 font-bold">
            <Users className="w-3.5 h-3.5 text-emerald-400" />
            10 brokers onboarding this week · <span className="text-emerald-400">4 slots left</span>
          </div>
        </div>
      </div>

      {/* ── 3-STEP CAREER PATH ───────────────────────────── */}
      <section className="py-14 px-4 bg-slate-900/40 border-y border-white/5">
        <div className="max-w-4xl mx-auto">
          <p className="text-center text-[10px] font-black uppercase tracking-widest text-emerald-400 mb-2">Your Career Path</p>
          <h2 className="text-2xl font-black uppercase tracking-tighter text-white text-center mb-10">3 Steps. Go At Your Own Pace.</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 relative">
            {CAREER_STEPS.map((s, i) => {
              const Icon = s.icon;
              const colorMap: Record<string, string> = {
                emerald: "border-emerald-500/40 bg-emerald-500/[0.06] text-emerald-400",
                purple:  "border-purple-500/40 bg-purple-500/[0.06] text-purple-400",
                amber:   "border-amber-500/40 bg-amber-500/[0.06] text-amber-400",
              };
              const iconBg: Record<string, string> = {
                emerald: "bg-emerald-500/15 border-emerald-500/30 text-emerald-300",
                purple:  "bg-purple-500/15 border-purple-500/30 text-purple-300",
                amber:   "bg-amber-500/15 border-amber-500/30 text-amber-300",
              };
              return (
                <div key={s.step} data-testid={`step-career-${i}`} className={`relative rounded-2xl border p-6 space-y-4 ${colorMap[s.color]}`}>
                  {s.locked && <div className="absolute top-4 right-4"><Lock className="w-4 h-4 text-amber-400 opacity-60" /></div>}
                  <div className="flex items-center gap-3">
                    <div className={`w-10 h-10 rounded-xl border flex items-center justify-center shrink-0 ${iconBg[s.color]}`}>
                      <Icon className="w-5 h-5" />
                    </div>
                    <span className="text-[10px] font-black text-gray-500 uppercase tracking-widest">Step {s.step}</span>
                  </div>
                  <div>
                    <h3 className="font-black text-white text-base uppercase tracking-tight mb-1">{s.title}</h3>
                    <p className="text-gray-400 text-sm leading-relaxed">{s.desc}</p>
                  </div>
                  {i < CAREER_STEPS.length - 1 && (
                    <div className="hidden md:block absolute -right-2 top-1/2 -translate-y-1/2 z-10">
                      <ChevronRight className="w-4 h-4 text-gray-600" />
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── WHATSAPP ONBOARDING WIZARD ───────────────────── */}
      <BrokerWhatsAppOnboarding />

      {/* ── DEVELOPER & COMMUNITY OPPORTUNITIES ─────────── */}
      <section id="communities" className="py-16 px-4 bg-slate-950 border-b border-white/5">
        <div className="max-w-5xl mx-auto space-y-8">
          <div className="text-center space-y-2">
            <p className="text-[10px] font-black uppercase tracking-widest text-emerald-400">Exclusive Inventory Access</p>
            <h2 className="text-2xl md:text-3xl font-black uppercase tracking-tighter text-white">Developer &amp; Community Opportunities</h2>
            <p className="text-gray-500 text-sm max-w-lg mx-auto">Choose your track. Each community has its own inventory, commission structure and access gate. NDA required for all tracks.</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Al Habtoor Polo */}
            <button
              data-testid="community-card-habtoor"
              onClick={() => document.getElementById("habtoor-polo")?.scrollIntoView({ behavior: "smooth" })}
              className="group text-left text-[#ffffff] bg-slate-900 border border-amber-500/25 hover:border-amber-400/60 rounded-2xl p-5 space-y-4 transition-all hover:bg-amber-500/5 hover:shadow-lg hover:shadow-amber-900/20"
            >
              <div className="flex items-start justify-between gap-2">
                <div className="w-11 h-11 rounded-xl bg-amber-500/15 border border-amber-500/30 flex items-center justify-center shrink-0">
                  <Crown className="w-5 h-5 text-amber-400" />
                </div>
                <Badge className="bg-amber-500/10 border-amber-500/25 text-amber-400 text-[9px] font-black uppercase tracking-wide">Active</Badge>
              </div>
              <div>
                <p className="font-black text-white text-sm uppercase tracking-tight">Al Habtoor Polo</p>
                <p className="text-amber-400/80 text-[10px] font-bold mt-0.5">Resort &amp; Club</p>
              </div>
              <div className="space-y-1.5">
                <div className="flex items-center gap-1.5 text-xs text-gray-400"><Building className="w-3 h-3 text-amber-400" /> 55 Villas &amp; Semi-Detached</div>
                <div className="flex items-center gap-1.5 text-xs text-gray-400"><Lock className="w-3 h-3 text-amber-400" /> NDA / NCA Gated</div>
                <div className="flex items-center gap-1.5 text-xs text-emerald-400 font-bold"><TrendingUp className="w-3 h-3" /> 50/50 Split + Override</div>
              </div>
              <div className="flex items-center gap-1.5 text-[10px] text-amber-400 font-black uppercase tracking-wider group-hover:gap-2.5 transition-all">
                <ChevronRight className="w-3.5 h-3.5" /> View Inventory
              </div>
            </button>

            {/* DAMAC */}
            <button
              data-testid="community-card-damac"
              onClick={() => document.getElementById("damac")?.scrollIntoView({ behavior: "smooth" })}
              className="group text-left text-[#ffffff] bg-slate-900 border border-purple-500/25 hover:border-purple-400/60 rounded-2xl p-5 space-y-4 transition-all hover:bg-purple-500/5 hover:shadow-lg hover:shadow-purple-900/20"
            >
              <div className="flex items-start justify-between gap-2">
                <div className="w-11 h-11 rounded-xl bg-purple-500/15 border border-purple-500/30 flex items-center justify-center shrink-0">
                  <Building2 className="w-5 h-5 text-purple-400" />
                </div>
                <Badge className="bg-purple-500/10 border-purple-500/25 text-purple-400 text-[9px] font-black uppercase tracking-wide">Distress</Badge>
              </div>
              <div>
                <p className="font-black text-white text-sm uppercase tracking-tight">DAMAC</p>
                <p className="text-purple-400/80 text-[10px] font-bold mt-0.5">Secondary Market</p>
              </div>
              <div className="space-y-1.5">
                <div className="flex items-center gap-1.5 text-xs text-gray-400"><Building className="w-3 h-3 text-purple-400" /> Below-Market Resale Units</div>
                <div className="flex items-center gap-1.5 text-xs text-gray-400"><Lock className="w-3 h-3 text-purple-400" /> Inner Circle Access</div>
                <div className="flex items-center gap-1.5 text-xs text-emerald-400 font-bold"><TrendingUp className="w-3 h-3" /> Higher Per-Deal Commission</div>
              </div>
              <div className="flex items-center gap-1.5 text-[10px] text-purple-400 font-black uppercase tracking-wider group-hover:gap-2.5 transition-all">
                <ChevronRight className="w-3.5 h-3.5" /> View Distress Inventory
              </div>
            </button>

            {/* SAMANA */}
            <a
              data-testid="community-card-samana"
              href="https://wa.me/971523946311?text=Hi%20DeliWer%20%E2%80%94%20I%27m%20a%20broker%20interested%20in%20SAMANA%20community%20inventory%20access.%20Please%20share%20the%20NDA."
              target="_blank"
              rel="noopener noreferrer"
              className="group text-left text-[#ffffff] bg-slate-900 border border-sky-500/25 hover:border-sky-400/60 rounded-2xl p-5 space-y-4 transition-all hover:bg-sky-500/5 hover:shadow-lg hover:shadow-sky-900/20 block"
            >
              <div className="flex items-start justify-between gap-2">
                <div className="w-11 h-11 rounded-xl bg-sky-500/15 border border-sky-500/30 flex items-center justify-center shrink-0">
                  <Sparkles className="w-5 h-5 text-sky-400" />
                </div>
                <Badge className="bg-sky-500/10 border-sky-500/25 text-sky-400 text-[9px] font-black uppercase tracking-wide">New</Badge>
              </div>
              <div>
                <p className="font-black text-white text-sm uppercase tracking-tight">SAMANA</p>
                <p className="text-sky-400/80 text-[10px] font-bold mt-0.5">Developer Track</p>
              </div>
              <div className="space-y-1.5">
                <div className="flex items-center gap-1.5 text-xs text-gray-400"><Building className="w-3 h-3 text-sky-400" /> Off-Plan &amp; Handover Units</div>
                <div className="flex items-center gap-1.5 text-xs text-gray-400"><Lock className="w-3 h-3 text-sky-400" /> NDA Required</div>
                <div className="flex items-center gap-1.5 text-xs text-emerald-400 font-bold"><TrendingUp className="w-3 h-3" /> Developer Commission Rate</div>
              </div>
              <div className="flex items-center gap-1.5 text-[10px] text-sky-400 font-black uppercase tracking-wider group-hover:gap-2.5 transition-all">
                <MessageCircle className="w-3.5 h-3.5" /> Request Access
              </div>
            </a>

            {/* MEYDAN */}
            <a
              data-testid="community-card-meydan"
              href="https://wa.me/971523946311?text=Hi%20DeliWer%20%E2%80%94%20I%27m%20a%20broker%20interested%20in%20MEYDAN%20community%20inventory%20access.%20Please%20share%20the%20NDA."
              target="_blank"
              rel="noopener noreferrer"
              className="group text-left text-[#ffffff] bg-slate-900 border border-emerald-500/25 hover:border-emerald-400/60 rounded-2xl p-5 space-y-4 transition-all hover:bg-emerald-500/5 hover:shadow-lg hover:shadow-emerald-900/20 block"
            >
              <div className="flex items-start justify-between gap-2">
                <div className="w-11 h-11 rounded-xl bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center shrink-0">
                  <MapPin className="w-5 h-5 text-emerald-400" />
                </div>
                <Badge className="bg-emerald-500/10 border-emerald-500/25 text-emerald-400 text-[9px] font-black uppercase tracking-wide">New</Badge>
              </div>
              <div>
                <p className="font-black text-white text-sm uppercase tracking-tight">MEYDAN</p>
                <p className="text-emerald-400/80 text-[10px] font-bold mt-0.5">Community Track</p>
              </div>
              <div className="space-y-1.5">
                <div className="flex items-center gap-1.5 text-xs text-gray-400"><Building className="w-3 h-3 text-emerald-400" /> Villas &amp; Townhouses</div>
                <div className="flex items-center gap-1.5 text-xs text-gray-400"><Lock className="w-3 h-3 text-emerald-400" /> NDA Required</div>
                <div className="flex items-center gap-1.5 text-xs text-emerald-400 font-bold"><TrendingUp className="w-3 h-3" /> High-Value Lease Splits</div>
              </div>
              <div className="flex items-center gap-1.5 text-[10px] text-emerald-400 font-black uppercase tracking-wider group-hover:gap-2.5 transition-all">
                <MessageCircle className="w-3.5 h-3.5" /> Request Access
              </div>
            </a>
          </div>

          <p className="text-center text-[10px] text-gray-600 font-bold uppercase tracking-widest">
            More communities coming · EMAAR · NAKHEEL · MERAAS · Contact DeliWer to reserve your track
          </p>

          {/* ── Action Layer ── */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
            <button
              data-testid="button-action-find-deals"
              onClick={() => document.getElementById("opportunities")?.scrollIntoView({ behavior: "smooth" })}
              className="group bg-slate-900 border border-emerald-500/25 hover:border-emerald-400/60 rounded-2xl p-5 text-left transition-all hover:bg-emerald-500/5 space-y-3 text-[#ffffff]"
            >
              <div className="w-10 h-10 rounded-xl bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center">
                <Eye className="w-5 h-5 text-emerald-400" />
              </div>
              <div>
                <p className="font-black text-white text-sm uppercase tracking-tight">Find Deals</p>
                <p className="text-gray-500 text-xs mt-0.5 leading-relaxed">Browse open opportunities with slot availability and live commissions.</p>
              </div>
              <div className="flex items-center gap-1 text-[10px] text-emerald-400 font-black uppercase tracking-wider group-hover:gap-2 transition-all">
                <ChevronRight className="w-3.5 h-3.5" /> View Feed
              </div>
            </button>

            <button
              data-testid="button-action-capture-deal"
              onClick={() => setShowCapture(v => !v)}
              className="group bg-slate-900 border border-purple-500/25 hover:border-purple-400/60 rounded-2xl p-5 text-left transition-all hover:bg-purple-500/5 space-y-3 text-[#ffffff]"
            >
              <div className="w-10 h-10 rounded-xl bg-purple-500/15 border border-purple-500/30 flex items-center justify-center">
                <Send className="w-5 h-5 text-purple-400" />
              </div>
              <div>
                <p className="font-black text-white text-sm uppercase tracking-tight">Capture a Deal</p>
                <p className="text-gray-500 text-xs mt-0.5 leading-relaxed">Submit a tenant, landlord, or vacant unit for immediate commission processing.</p>
              </div>
              <div className="flex items-center gap-1 text-[10px] text-purple-400 font-black uppercase tracking-wider group-hover:gap-2 transition-all">
                <ChevronRight className="w-3.5 h-3.5" /> Submit Now
              </div>
            </button>

            <button
              data-testid="button-action-track-earnings"
              onClick={() => window.open("https://wa.me/971523946311?text=Hi%20DeliWer%20%E2%80%94%20I%20want%20to%20check%20my%20earnings%20and%20commission%20status.", "_blank")}
              className="group bg-slate-900 border border-amber-500/25 hover:border-amber-400/60 rounded-2xl p-5 text-left transition-all hover:bg-amber-500/5 space-y-3 text-[#ffffff]"
            >
              <div className="w-10 h-10 rounded-xl bg-amber-500/15 border border-amber-500/30 flex items-center justify-center">
                <Wallet className="w-5 h-5 text-amber-400" />
              </div>
              <div>
                <p className="font-black text-white text-sm uppercase tracking-tight">Track Earnings</p>
                <p className="text-gray-500 text-xs mt-0.5 leading-relaxed">View pending commissions, closed deals, and monthly statements via WhatsApp.</p>
              </div>
              <div className="flex items-center gap-1 text-[10px] text-amber-400 font-black uppercase tracking-wider group-hover:gap-2 transition-all">
                <ChevronRight className="w-3.5 h-3.5" /> Open Earnings
              </div>
            </button>
          </div>

          {/* ── Quick Capture Form (inline, toggled) ── */}
          {showCapture && (
            <div className="bg-slate-900 border border-purple-500/25 rounded-2xl p-5 space-y-4 animate-in fade-in slide-in-from-top-2 duration-200">
              <div className="flex items-center justify-between">
                <p className="text-[11px] font-black uppercase tracking-widest text-purple-400">Capture a Deal</p>
                <button onClick={() => setShowCapture(false)} className="text-gray-600 hover:text-white transition-colors"><X className="w-4 h-4" /></button>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="space-y-1.5">
                  <label className="text-[10px] font-black uppercase tracking-widest text-gray-400">Client Type</label>
                  <Select value={captureForm.clientType} onValueChange={v => setCaptureForm(p => ({ ...p, clientType: v }))}>
                    <SelectTrigger className="bg-slate-800 border-white/10 text-white h-9 text-sm rounded-xl" data-testid="select-capture-type">
                      <SelectValue placeholder="Select..." />
                    </SelectTrigger>
                    <SelectContent className="bg-slate-900 border-white/10 text-white">
                      <SelectItem value="tenant" className="text-white">Tenant</SelectItem>
                      <SelectItem value="landlord" className="text-white">Landlord</SelectItem>
                      <SelectItem value="vacant" className="text-white">Vacant Unit</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-1.5">
                  <label className="text-[10px] font-black uppercase tracking-widest text-gray-400">Client Phone</label>
                  <Input data-testid="input-capture-phone" placeholder="+971 50 000 0000" value={captureForm.phone} onChange={e => setCaptureForm(p => ({ ...p, phone: e.target.value }))} className="bg-slate-800 border-white/10 text-white placeholder:text-gray-600 h-9 text-sm rounded-xl" />
                </div>
                <div className="space-y-1.5">
                  <label className="text-[10px] font-black uppercase tracking-widest text-gray-400">Unit / Area</label>
                  <Input data-testid="input-capture-unit" placeholder="e.g. 2BR JVC" value={captureForm.unit} onChange={e => setCaptureForm(p => ({ ...p, unit: e.target.value }))} className="bg-slate-800 border-white/10 text-white placeholder:text-gray-600 h-9 text-sm rounded-xl" />
                </div>
              </div>
              <Button
                data-testid="button-capture-submit"
                className="w-full h-10 bg-purple-600 hover:bg-purple-500 text-white font-black uppercase tracking-widest rounded-xl text-sm"
                onClick={() => {
                  if (!captureForm.clientType) { toast({ title: "Select client type", variant: "destructive" }); return; }
                  const lid = generateLeadId();
                  const msg = `Deal Capture — ${lid}\nType: ${captureForm.clientType}\nPhone: ${captureForm.phone || "TBC"}\nUnit: ${captureForm.unit || "TBC"}\nBroker ref: ${generatedRef || "pending"}`;
                  window.open(`https://wa.me/971523946311?text=${encodeURIComponent(msg)}`, "_blank");
                  toast({ title: `Deal captured! Ref: ${lid}`, description: "DeliWer will coordinate within 2 hours." });
                  setShowCapture(false);
                  setCaptureForm({ clientType: "", phone: "", unit: "" });
                }}
              >
                <Send className="w-4 h-4 mr-2" /> Submit Deal to DeliWer
              </Button>
            </div>
          )}
        </div>
      </section>

      {/* ── REFERRAL LINK GENERATOR (THE HOOK) ──────────── */}
      <section ref={generatorRef} id="get-link" className="py-16 px-4 bg-slate-900/50 border-b border-white/5">
        <div className="max-w-lg mx-auto space-y-6">
          <div className="text-center space-y-2">
            <p className="text-[10px] font-black uppercase tracking-widest text-emerald-400">Start Here · Free · Instant</p>
            <h2 className="text-2xl font-black uppercase tracking-tighter text-white">Get Your Referral Link</h2>
            <p className="text-gray-500 text-sm">Enter your name. Your link + Lead ID are generated instantly.</p>
          </div>

          <div className="flex gap-3">
            <Input
              data-testid="input-broker-name"
              value={partnerName}
              onChange={e => setPartnerName(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Your name (e.g. Ahmed Al Mansoori)"
              className="bg-slate-800 border-slate-700 text-white placeholder:text-gray-600 rounded-xl h-13 flex-1 text-sm"
            />
            <Button data-testid="button-broker-generate" size="lg" className="bg-emerald-600 hover:bg-emerald-500 text-white font-black rounded-xl h-13 px-6 shrink-0" onClick={handleGenerate}>
              Generate
            </Button>
          </div>

          {generatedLink ? (
            <div className="space-y-4 animate-in fade-in slide-in-from-bottom-4 duration-300">
              {/* Lead ID badge */}
              <div className="flex items-center gap-3 bg-slate-800/60 border border-emerald-500/20 rounded-xl px-4 py-3">
                <Hash className="w-4 h-4 text-emerald-400 shrink-0" />
                <div className="flex-1">
                  <p className="text-[10px] text-gray-500 font-black uppercase tracking-widest">Your Lead ID</p>
                  <p className="text-emerald-300 font-black text-sm font-mono" data-testid="text-lead-id">{leadId}</p>
                </div>
                <Badge className="bg-emerald-500/15 border-emerald-500/25 text-emerald-400 text-[9px] font-black uppercase">Active</Badge>
              </div>

              {/* Referral link */}
              <div className="bg-slate-800/80 border border-emerald-500/30 rounded-xl p-4 flex items-center gap-3">
                <div className="flex-1 text-sm text-emerald-300 font-mono break-all" data-testid="text-generated-link">{generatedLink}</div>
                <Button data-testid="button-broker-copy" size="sm" className="bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg shrink-0 h-9" onClick={copyLink}>
                  {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                </Button>
              </div>

              {/* WhatsApp tracking link */}
              <div className="bg-slate-800/40 border border-white/5 rounded-xl px-4 py-3 flex items-center gap-3">
                <MessageCircle className="w-4 h-4 text-green-400 shrink-0" />
                <div className="flex-1">
                  <p className="text-[10px] text-gray-500 font-black uppercase tracking-widest">WhatsApp Tracking Link</p>
                  <code className="text-green-300 text-xs font-mono">wa.me/971523946311?text={leadId}</code>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <Button data-testid="button-broker-copy-link" className="bg-slate-700 hover:bg-slate-600 text-white font-black rounded-xl h-11 text-sm" onClick={copyLink}>
                  {copied ? <><Check className="w-4 h-4 mr-2" />Copied!</> : <><Copy className="w-4 h-4 mr-2" />Copy Link</>}
                </Button>
                <Button data-testid="button-broker-share-whatsapp" className="bg-green-600 hover:bg-green-500 text-white font-black rounded-xl h-11 text-sm" onClick={shareOnWhatsApp}>
                  <MessageCircle className="w-4 h-4 mr-2" /> Share via WhatsApp
                </Button>
              </div>
              <button
                data-testid="button-broker-toggle-qr"
                className="flex items-center gap-2 text-gray-500 hover:text-emerald-400 text-xs font-semibold transition-colors mx-auto"
                onClick={() => setShowQR(v => !v)}
              >
                <QrCode className="w-3.5 h-3.5" />
                {showQR ? "Hide QR Code" : "Show QR Code for in-person sharing"}
                {showQR ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
              </button>
              {showQR && <div className="flex justify-center py-2 animate-in fade-in duration-200"><QRCodeDisplay url={generatedLink} /></div>}
              <p className="text-center text-[10px] text-gray-600 font-bold uppercase tracking-widest">No fees · No minimums · Start sharing today</p>
            </div>
          ) : (
            <div className="text-center py-8 text-gray-700">
              <QrCode className="w-12 h-12 mx-auto mb-3 opacity-20" />
              <p className="text-sm">Your link + Lead ID will appear here</p>
            </div>
          )}
        </div>
      </section>


      {/* ── WHAT YOU EARN ────────────────────────────────── */}
      <section id="what-you-earn" className="py-14 px-4 border-b border-white/5 bg-slate-950">
        <div className="max-w-4xl mx-auto">
          <p className="text-center text-[10px] font-black uppercase tracking-widest text-emerald-400 mb-2">What You Earn</p>
          <h2 className="text-2xl font-black uppercase tracking-tighter text-white text-center mb-8">Real Income, Stacked Per Deal.</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {EARN_HIGHLIGHTS.map((h) => (
              <div
                key={h.label}
                data-testid={`highlight-${h.label.toLowerCase().replace(/\s/g, "-")}`}
                className="rounded-2xl border border-emerald-500/20 bg-slate-900/60 p-5 space-y-3 text-center"
              >
                <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center mx-auto">
                  <h.icon className="w-5 h-5 text-emerald-300" />
                </div>
                <div className="text-xl font-black text-white">{h.value}</div>
                <div>
                  <p className="font-black text-white text-xs uppercase tracking-tight">{h.label}</p>
                  <p className="text-emerald-400 text-[10px] font-semibold mt-0.5">{h.sub}</p>
                </div>
              </div>
            ))}
          </div>
          <p className="text-center text-[10px] text-gray-600 font-bold uppercase tracking-widest mt-6">
            Full commission details and payouts unlocked in the Inner Circle
          </p>

          {/* ── Earnings Calculator ── */}
          <div className="bg-slate-900 border border-emerald-500/20 rounded-2xl p-5 mt-2">
            <div className="flex items-center gap-2 mb-4">
              <Calculator className="w-4 h-4 text-emerald-400 shrink-0" />
              <p className="text-[11px] font-black uppercase tracking-widest text-emerald-400">Your Weekly Earning Potential</p>
            </div>
            <Select value={selectedArea} onValueChange={v => { setSelectedArea(v); setShowCalc(true); }}>
              <SelectTrigger className="bg-slate-800 border-white/10 text-white h-10 text-sm rounded-xl" data-testid="select-area-calc">
                <SelectValue placeholder="Select your area of focus" />
              </SelectTrigger>
              <SelectContent className="bg-slate-900 border-white/10 text-white">
                {Object.keys(AREA_DATA).map(a => <SelectItem key={a} value={a} className="text-white">{a}</SelectItem>)}
              </SelectContent>
            </Select>
            {showCalc && calcData && (
              <div className="grid grid-cols-3 gap-3 mt-4 animate-in fade-in slide-in-from-bottom-2 duration-200">
                <div className="bg-slate-800 border border-white/5 rounded-xl p-3 text-center">
                  <p className="text-emerald-400 font-black text-lg">{calcData.deals}</p>
                  <p className="text-[10px] text-gray-500 font-bold uppercase tracking-wide mt-0.5">Deals Available</p>
                </div>
                <div className="bg-slate-800 border border-white/5 rounded-xl p-3 text-center">
                  <p className="text-white font-black text-lg">AED {calcData.avgComm.toLocaleString()}</p>
                  <p className="text-[10px] text-gray-500 font-bold uppercase tracking-wide mt-0.5">Avg Commission</p>
                </div>
                <div className="bg-emerald-950/50 border border-emerald-500/25 rounded-xl p-3 text-center">
                  <p className="text-emerald-300 font-black text-lg">AED {(calcData.deals * calcData.avgComm).toLocaleString()}</p>
                  <p className="text-[10px] text-gray-500 font-bold uppercase tracking-wide mt-0.5">Potential</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>


      {/* ── LIVE OPPORTUNITY FEED ────────────────────────── */}
      <section id="opportunities" className="py-14 px-4 bg-slate-950 border-b border-white/5">
        <div className="max-w-4xl mx-auto space-y-6">
          <div className="flex items-start justify-between gap-4 flex-wrap">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
                </span>
                <p className="text-[10px] font-black uppercase tracking-widest text-emerald-400">Live · Updated Daily</p>
              </div>
              <h2 className="text-2xl font-black uppercase tracking-tighter text-white">Open Opportunities</h2>
              <p className="text-gray-500 text-sm">Claim a lead via WhatsApp. First claim = your ownership lock.</p>
            </div>
            <Badge className="bg-red-500/15 border-red-500/25 text-red-400 text-xs font-black uppercase tracking-wide shrink-0">
              <AlertCircle className="w-3 h-3 mr-1.5" /> {MOCK_OPPORTUNITIES.filter(o => o.slots === 1).length} slots closing soon
            </Badge>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {MOCK_OPPORTUNITIES.map((opp) => {
              const remaining = Math.max(0, opp.slots - (claimedSlots[opp.id] || 0));
              const isFull = remaining === 0;
              return (
                <div
                  key={opp.id}
                  data-testid={`opportunity-${opp.id}`}
                  className={`bg-slate-900 border rounded-2xl p-5 space-y-4 transition-colors ${isFull ? "border-slate-700/50 opacity-60" : "border-white/8 hover:border-emerald-500/25"}`}
                >
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <p className="font-black text-white text-sm uppercase tracking-tight">{opp.type}</p>
                      <p className="text-gray-500 text-xs mt-0.5 flex items-center gap-1"><MapPin className="w-3 h-3" />{opp.area}</p>
                    </div>
                    <Badge className={`text-[9px] font-black uppercase border shrink-0 ${isFull ? "bg-slate-700/50 text-gray-500 border-white/10" : priorityColor(opp.priority)}`}>
                      {isFull ? "FULL" : opp.priority}
                    </Badge>
                  </div>

                  <div className="space-y-1.5">
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-gray-500">{opp.need}</span>
                      <span className="font-black text-emerald-300">{formatAED(opp.commission)}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      {Array.from({ length: 3 }).map((_, i) => (
                        <div key={i} className={`h-1.5 flex-1 rounded-full transition-colors duration-300 ${i < remaining ? "bg-emerald-500" : "bg-slate-700"}`} />
                      ))}
                      <span className={`text-[10px] font-semibold ml-1 shrink-0 transition-colors ${isFull ? "text-red-400" : remaining === 1 ? "text-amber-400" : "text-gray-500"}`}>
                        {isFull ? "Claimed" : remaining === 1 ? "1 slot left!" : `${remaining} slots`}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <code className="text-[10px] text-gray-600 font-mono">{opp.id}</code>
                    <Button
                      data-testid={`button-claim-${opp.id}`}
                      size="sm"
                      disabled={isFull}
                      className={`font-black rounded-xl h-8 px-4 text-xs transition-all ${isFull ? "bg-slate-700 text-gray-500 cursor-not-allowed" : "bg-emerald-600 hover:bg-emerald-500 text-white"}`}
                      onClick={() => claimOpportunity(opp)}
                    >
                      {isFull ? "All Claimed" : "Claim Lead →"}
                    </Button>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Gated — more behind inner circle */}
          <div className="relative rounded-2xl border border-amber-500/15 bg-slate-900/40 p-6 overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-amber-500/5 to-transparent pointer-events-none" />
            <div className="flex flex-col sm:flex-row items-center gap-4 justify-between relative">
              <div className="text-center sm:text-left space-y-1">
                <p className="font-black text-white text-sm uppercase tracking-tight">+ 24 More Opportunities This Week</p>
                <p className="text-gray-500 text-xs">Inner Circle members get full deal flow — residential, commercial, DAMAC distress.</p>
              </div>
              <a href="https://wa.me/971523946311?text=Hi%20DeliWer%20%E2%80%94%20I%E2%80%99m%20a%20broker%20and%20want%20Inner%20Circle%20access%20to%20the%20full%20opportunity%20feed." target="_blank" rel="noopener noreferrer" className="shrink-0 text-[#ffffff]">
                <Button data-testid="button-more-opps" className="bg-amber-500 hover:bg-amber-400 text-black font-black rounded-xl h-10 px-6 text-sm shadow-lg shadow-amber-900/30">
                  <Crown className="w-4 h-4 mr-2" /> Unlock Full Feed
                </Button>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ── INNER CIRCLE (GATED) ─────────────────────────── */}
      <section id="inner-circle" className="relative py-20 px-4 border-b border-amber-500/20 bg-gradient-to-b from-slate-950 via-amber-950/10 to-slate-950 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_60%_40%,rgba(251,191,36,0.07),transparent_60%)] pointer-events-none" />
        <div className="relative max-w-3xl mx-auto space-y-8">
          <div className="text-center space-y-4">
            <div className="inline-flex items-center gap-2 bg-amber-500/15 border border-amber-500/30 rounded-full px-5 py-2">
              <Crown className="w-4 h-4 text-amber-400" />
              <span className="text-amber-400 text-[11px] font-black uppercase tracking-widest">Realty Inner Circle</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-black uppercase tracking-tighter text-white leading-tight">
              Where Real Growth <span className="text-amber-400">Actually Happens.</span>
            </h2>
            <p className="text-gray-300 text-sm md:text-base leading-relaxed max-w-xl mx-auto">
              The referral link is step one. Inner Circle members get deal flow, vetted inventory, live tracking, and shared commission — all under a simple NDA.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {[
              { icon: Building2, title: "Reserved Deal Pool", desc: "Lock specific developers and communities. Capped seats per area so you're never competing with the crowd." },
              { icon: Sparkles,  title: "Daily Inventory Drops", desc: "Rental demand signals and distress sale alerts — sourced before they hit any portal." },
              { icon: BarChart2, title: "Live Performance Dashboard", desc: "See your clicks, referrals, closed deals and pending commissions in one place." },
              { icon: TrendingUp, title: "50/50 Commission + Override", desc: "Full split on every routed lease and sale, plus AED 300–800 move-in override on top." },
            ].map((b, i) => (
              <div key={b.title} data-testid={`inner-circle-benefit-${i}`} className="bg-slate-900/70 border border-amber-500/20 rounded-2xl p-5 hover:border-amber-500/40 transition-colors flex gap-4">
                <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center shrink-0">
                  <b.icon className="w-5 h-5 text-amber-300" />
                </div>
                <div>
                  <h3 className="text-sm font-black text-white uppercase tracking-tight mb-1">{b.title}</h3>
                  <p className="text-xs text-gray-400 leading-relaxed">{b.desc}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="bg-slate-950/80 border border-amber-500/30 rounded-2xl p-6 space-y-4">
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-amber-400" />
              <p className="text-xs font-black text-amber-300 uppercase tracking-widest">Three Short Agreements · Same-Day Onboarding</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              {[
                { icon: FileSignature, title: "Non-Circumvention", desc: "No bypassing DeliWer on clients routed through the network." },
                { icon: ShieldCheck,   title: "Confidentiality (NDA)", desc: "Inventory intelligence stays inside the network." },
                { icon: BadgeCheck,    title: "Non-Compete", desc: "Reserved community stays yours while you're active." },
              ].map((t, i) => (
                <div key={t.title} data-testid={`nda-term-${i}`} className="bg-amber-500/5 border border-amber-500/15 rounded-xl p-4">
                  <t.icon className="w-4 h-4 text-amber-300 mb-2" />
                  <h4 className="text-xs font-black text-white uppercase tracking-tight mb-1">{t.title}</h4>
                  <p className="text-[11px] text-gray-400 leading-relaxed">{t.desc}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <a href="https://wa.me/971523946311?text=Hi%20DeliWer%20Realty%20%E2%80%94%20I%E2%80%99m%20a%20RERA%20broker%20applying%20to%20the%20Inner%20Circle%20Track.%20Please%20share%20the%20NDA%20to%20get%20started." target="_blank" rel="noopener noreferrer" className="text-[#ffffff]">
              <Button data-testid="button-inner-circle-apply" size="lg" className="bg-amber-500 hover:bg-amber-400 text-black font-black h-13 px-10 text-sm rounded-2xl shadow-2xl shadow-amber-900/40">
                <Crown className="w-5 h-5 mr-2" /> Apply for Inner Circle · Sign NDA
              </Button>
            </a>
            <Link href="/realestate" className="text-[#ffffff]">
              <Button data-testid="button-realty-engine" size="lg" variant="outline" className="border-emerald-500/30 text-emerald-300 hover:bg-emerald-500/10 font-black h-13 px-8 text-sm rounded-2xl">
                <Building2 className="w-4 h-4 mr-2" /> Realty Intelligence Engine
              </Button>
            </Link>
          </div>
          <p className="text-center text-[10px] text-gray-600 uppercase tracking-widest font-semibold">
            Active RERA brokers only · Capped seats · Same-day onboarding
          </p>

          {/* ── Office Access + Support Trust Layer ── */}
          <div className="bg-slate-900/60 border border-amber-500/15 rounded-2xl p-5 grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div className="space-y-2">
              <p className="text-[10px] font-black uppercase tracking-widest text-amber-400 flex items-center gap-1.5"><Building className="w-3.5 h-3.5" /> Office Access</p>
              <div className="space-y-1.5">
                {["Twar — Al Qusais", "Business Bay — Central Hub", "Deira — RERA Walk-in Support"].map(loc => (
                  <div key={loc} className="flex items-center gap-2 text-xs text-gray-400">
                    <CheckCircle2 className="w-3.5 h-3.5 text-amber-400 shrink-0" /> {loc}
                  </div>
                ))}
              </div>
            </div>
            <div className="space-y-2">
              <p className="text-[10px] font-black uppercase tracking-widest text-amber-400 flex items-center gap-1.5"><ShieldCheck className="w-3.5 h-3.5" /> Support Includes</p>
              <div className="space-y-1.5">
                {["Ejari Processing — same day", "PRO Services — all tenancy types", "Documentation Handling — end to end"].map(s => (
                  <div key={s} className="flex items-center gap-2 text-xs text-gray-400">
                    <CheckCircle2 className="w-3.5 h-3.5 text-amber-400 shrink-0" /> {s}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── DAMAC DISTRESS INVENTORY ─────────────────────── */}
      <section id="damac" className="py-14 px-4 border-b border-white/5 bg-gradient-to-br from-slate-950 via-purple-950/10 to-slate-950">
        <div className="max-w-4xl mx-auto text-center space-y-3 mb-8">
          <div className="flex items-center justify-center gap-2 mb-2">
            <span className="text-[10px] font-black uppercase tracking-widest text-gray-500">Developer &amp; Community Opportunities</span>
            <ChevronRight className="w-3 h-3 text-gray-600" />
            <span className="text-[10px] font-black uppercase tracking-widest text-purple-400">DAMAC Track</span>
          </div>
          <Badge className="bg-purple-500/10 border-purple-500/20 text-purple-400 text-[10px] font-black uppercase tracking-widest">
            Secondary Market · DAMAC Distress Inventory
          </Badge>
          <h2 className="text-2xl font-black uppercase tracking-tighter text-white">Below-Market Resale Track</h2>
          <p className="text-gray-400 text-sm max-w-lg mx-auto leading-relaxed">
            Resale specialists get access to vetted DAMAC distress inventory — higher per-deal commissions, active buyer lists, fast movement.
          </p>
        </div>
        <div className="max-w-5xl mx-auto">
          <DistressBrokerTrack />
        </div>
      </section>

      {/* ── AL HABTOOR POLO INVENTORY ─────────────────────── */}
      <HabtoorSection />

      {/* ── COPY-PASTE SCRIPTS ────────────────────────────── */}
      <section id="scripts" className="py-14 px-4 border-b border-white/5 bg-slate-900/20">
        <div className="max-w-xl mx-auto space-y-4">
          <div className="text-center space-y-2 mb-6">
            <p className="text-[10px] font-black uppercase tracking-widest text-purple-400">Ready to Send</p>
            <h2 className="text-2xl font-black uppercase tracking-tighter text-white">Copy-Paste Scripts</h2>
            <p className="text-gray-500 text-sm">Generate your link above, then paste it into any script below.</p>
          </div>
          {SCRIPTS.map((s, i) => (
            <div key={i} className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden hover:border-purple-500/25 transition-colors">
              <button
                data-testid={`button-script-toggle-${i}`}
                className="w-full flex items-center justify-between p-4 text-left"
                onClick={() => setExpandedScript(expandedScript === i ? null : i)}
              >
                <div>
                  <div className="font-black text-white text-sm uppercase tracking-tight">{s.title}</div>
                  <div className="text-[11px] text-gray-600 mt-0.5">{s.scenario}</div>
                </div>
                {expandedScript === i
                  ? <ChevronUp className="w-4 h-4 text-purple-400 shrink-0" />
                  : <ChevronDown className="w-4 h-4 text-gray-600 shrink-0" />}
              </button>
              {expandedScript === i && (
                <div className="px-4 pb-4 space-y-3">
                  <div className="bg-slate-800 rounded-xl p-4 border border-white/5">
                    <pre className="text-gray-300 text-xs leading-relaxed whitespace-pre-wrap font-sans">
                      {s.script.replace(/\[YOUR REFERRAL LINK\]/g, generatedLink || "https://www.deliwer.com/move-in?ref=YOURCODE")}
                    </pre>
                  </div>
                  <div className="flex gap-2">
                    <Button data-testid={`button-copy-script-${i}`} size="sm" className="bg-purple-600 hover:bg-purple-500 text-white font-black rounded-xl px-4 h-8 text-xs" onClick={() => copyScript(i, s.script)}>
                      {copiedScript === i ? <><Check className="w-3 h-3 mr-1" />Copied!</> : <><Copy className="w-3 h-3 mr-1" />Copy</>}
                    </Button>
                    <Button data-testid={`button-send-script-wa-${i}`} size="sm" className="bg-green-700 hover:bg-green-600 text-white font-black rounded-xl px-4 h-8 text-xs" onClick={() => {
                      const msg = s.script.replace(/\[YOUR REFERRAL LINK\]/g, generatedLink || "https://www.deliwer.com/move-in?ref=YOURCODE").replace(/\[Tenant Name\]|\[Client Name\]|\[Buyer Name\]|\[Name\]/g, "");
                      window.open(`https://wa.me/?text=${encodeURIComponent(msg)}`, "_blank");
                    }}>
                      <MessageCircle className="w-3 h-3 mr-1" /> Send on WhatsApp
                    </Button>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* ── PARTNER APPLICATION FORM ─────────────────────── */}
      <section ref={applyRef} id="apply" className="py-14 px-4 border-b border-white/5 bg-slate-900/40">
        <div className="max-w-lg mx-auto">
          {!submitted ? (
            <div className="space-y-7">
              <div className="text-center space-y-2">
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-500/10 border border-emerald-500/20 rounded-full text-emerald-400 text-xs font-black uppercase tracking-widest">
                  <BadgeCheck className="w-3.5 h-3.5" /> Join the Network
                </div>
                <h2 className="text-2xl font-black uppercase tracking-tighter text-white">Apply as a Broker</h2>
                <p className="text-gray-500 text-sm max-w-sm mx-auto">Fill in the basics. We'll generate your referral link + Lead ID and reach out on WhatsApp within 24 hours.</p>
              </div>
              <Card className="bg-white/5 border-white/8 rounded-2xl">
                <CardContent className="p-6">
                  <form onSubmit={handleAppSubmit} className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-1.5">
                        <Label className="text-[10px] font-black uppercase text-emerald-400 tracking-widest">Full Name *</Label>
                        <Input data-testid="input-full-name" placeholder="Your name" value={appForm.fullName} onChange={e => setAppForm(p => ({ ...p, fullName: e.target.value }))} className="bg-slate-900 border-white/10 text-white placeholder:text-gray-600 h-11" required />
                      </div>
                      <div className="space-y-1.5">
                        <Label className="text-[10px] font-black uppercase text-emerald-400 tracking-widest">Brokerage</Label>
                        <Input data-testid="input-company-name" placeholder="Company (optional)" value={appForm.companyName} onChange={e => setAppForm(p => ({ ...p, companyName: e.target.value }))} className="bg-slate-900 border-white/10 text-white placeholder:text-gray-600 h-11" />
                      </div>
                    </div>
                    <div className="space-y-1.5">
                      <Label className="text-[10px] font-black uppercase text-emerald-400 tracking-widest">Broker Type *</Label>
                      <Select value={appForm.partnerType} onValueChange={v => setAppForm(p => ({ ...p, partnerType: v }))}>
                        <SelectTrigger className="bg-slate-900 border-white/10 text-white h-11" data-testid="select-partner-type">
                          <SelectValue placeholder="Select your role" />
                        </SelectTrigger>
                        <SelectContent className="bg-slate-900 border-white/10 text-white">
                          {PARTNER_TYPES.map(t => <SelectItem key={t} value={t} className="text-white">{t}</SelectItem>)}
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-1.5">
                        <Label className="text-[10px] font-black uppercase text-emerald-400 tracking-widest">Email *</Label>
                        <Input data-testid="input-email" type="email" placeholder="you@example.com" value={appForm.email} onChange={e => setAppForm(p => ({ ...p, email: e.target.value }))} className="bg-slate-900 border-white/10 text-white placeholder:text-gray-600 h-11" required />
                      </div>
                      <div className="space-y-1.5">
                        <Label className="text-[10px] font-black uppercase text-emerald-400 tracking-widest">Phone</Label>
                        <Input data-testid="input-phone" placeholder="+971 50 000 0000" value={appForm.phone} onChange={e => setAppForm(p => ({ ...p, phone: e.target.value }))} className="bg-slate-900 border-white/10 text-white placeholder:text-gray-600 h-11" />
                      </div>
                    </div>
                    <div className="border-t border-white/5 pt-4 space-y-3">
                      <p className="text-[10px] font-black uppercase tracking-widest text-purple-400">Activity Profile</p>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="space-y-1.5">
                          <Label className="text-[10px] font-black uppercase text-gray-400 tracking-widest">Deals Closed (Last 30 Days)</Label>
                          <Select value={appForm.dealsClosed} onValueChange={v => setAppForm(p => ({ ...p, dealsClosed: v }))}>
                            <SelectTrigger className="bg-slate-900 border-white/10 text-white h-10 text-sm" data-testid="select-deals-closed">
                              <SelectValue placeholder="Select range" />
                            </SelectTrigger>
                            <SelectContent className="bg-slate-900 border-white/10 text-white">
                              {["0", "1–2", "3–5", "6–10", "10+"].map(v => <SelectItem key={v} value={v} className="text-white">{v}</SelectItem>)}
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="space-y-1.5">
                          <Label className="text-[10px] font-black uppercase text-gray-400 tracking-widest">Active Tenants / Landlords?</Label>
                          <Select value={appForm.hasTenants} onValueChange={v => setAppForm(p => ({ ...p, hasTenants: v }))}>
                            <SelectTrigger className="bg-slate-900 border-white/10 text-white h-10 text-sm" data-testid="select-has-tenants">
                              <SelectValue placeholder="Select..." />
                            </SelectTrigger>
                            <SelectContent className="bg-slate-900 border-white/10 text-white">
                              <SelectItem value="tenants" className="text-white">Active Tenants</SelectItem>
                              <SelectItem value="landlords" className="text-white">Active Landlords</SelectItem>
                              <SelectItem value="both" className="text-white">Both</SelectItem>
                              <SelectItem value="neither" className="text-white">Neither Yet</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="space-y-1.5">
                          <Label className="text-[10px] font-black uppercase text-gray-400 tracking-widest">Area of Focus</Label>
                          <Select value={appForm.areaFocus} onValueChange={v => setAppForm(p => ({ ...p, areaFocus: v }))}>
                            <SelectTrigger className="bg-slate-900 border-white/10 text-white h-10 text-sm" data-testid="select-area-focus">
                              <SelectValue placeholder="Select area" />
                            </SelectTrigger>
                            <SelectContent className="bg-slate-900 border-white/10 text-white">
                              {Object.keys(AREA_DATA).map(a => <SelectItem key={a} value={a} className="text-white">{a}</SelectItem>)}
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                    </div>
                    <Button type="submit" data-testid="button-submit-partner" size="lg" className="w-full h-12 bg-emerald-600 hover:bg-emerald-500 text-white font-black uppercase tracking-widest rounded-xl shadow-xl shadow-emerald-500/20 text-sm">
                      Get My Referral Link + Lead ID <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                    <p className="text-center text-[10px] text-gray-600 font-bold uppercase tracking-widest">No fees · No minimum referrals · Monthly payouts</p>
                  </form>
                </CardContent>
              </Card>
              <div className="flex justify-center">
                <Button data-testid="button-broker-join-wa" variant="outline" className="border-white/10 text-gray-400 hover:bg-white/5 font-black rounded-xl h-11 text-xs uppercase tracking-widest" onClick={handleJoinWhatsApp}>
                  <MessageCircle className="w-4 h-4 mr-2" /> Prefer WhatsApp? Join directly
                </Button>
              </div>
            </div>
          ) : (
            <div className="space-y-7 text-center animate-in fade-in slide-in-from-bottom-4 duration-300">
              <div className="w-16 h-16 rounded-full bg-emerald-500 flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-8 h-8 text-slate-950" />
              </div>
              <div className="space-y-2">
                <h2 className="text-2xl font-black uppercase tracking-tighter text-white">Welcome to the Network!</h2>
                <p className="text-gray-400 text-sm max-w-sm mx-auto">Your referral link and Lead ID are active. We'll reach out on WhatsApp within 24 hours.</p>
              </div>
              <Card className="bg-emerald-950/40 border-emerald-500/25 rounded-2xl">
                <CardContent className="p-6 space-y-4">
                  {leadId && (
                    <div className="flex items-center gap-3 bg-slate-900 border border-white/10 rounded-xl px-4 py-3">
                      <Hash className="w-4 h-4 text-emerald-400 shrink-0" />
                      <div className="flex-1 text-left">
                        <p className="text-[10px] text-gray-500 font-black uppercase tracking-widest">Your Lead ID</p>
                        <p className="text-emerald-300 font-black font-mono" data-testid="text-success-lead-id">{leadId}</p>
                      </div>
                    </div>
                  )}
                  <div className="flex items-center gap-3 bg-slate-900 border border-white/10 rounded-xl p-4">
                    <code className="flex-1 text-emerald-300 text-sm font-mono break-all text-left">{generatedLink}</code>
                    <Button onClick={copyLink} size="sm" className="bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg shrink-0" data-testid="button-copy-generated-link">
                      {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                    </Button>
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <Link href="/realestate" className="flex-1 text-[#ffffff]">
                      <Button className="w-full bg-amber-600 hover:bg-amber-500 text-white font-black rounded-xl h-10 text-xs">
                        <Building2 className="w-4 h-4 mr-2" /> Realty Engine
                      </Button>
                    </Link>
                    <a href="https://wa.me/971523946311?text=Hi%20DeliWer%20%E2%80%94%20I%20just%20applied%20as%20a%20broker%20and%20want%20to%20learn%20about%20the%20Inner%20Circle." target="_blank" rel="noopener noreferrer" className="flex-1 text-[#ffffff]">
                      <Button variant="outline" className="w-full border-amber-500/30 text-amber-400 hover:bg-amber-500/10 font-black rounded-xl h-10 text-xs">
                        <Crown className="w-4 h-4 mr-2" /> Inner Circle
                      </Button>
                    </a>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}
        </div>
      </section>

      {/* ── FINAL CTA ─────────────────────────────────────── */}
      <section className="py-14 px-4 bg-gradient-to-r from-emerald-950/30 via-slate-900/80 to-purple-950/30">
        <div className="max-w-xl mx-auto text-center space-y-5">
          <h2 className="text-2xl font-black uppercase tracking-tighter text-white">Ready to Close Your First Deal?</h2>
          <p className="text-gray-500 text-sm max-w-md mx-auto leading-relaxed">
            Start with your free referral link — no forms, no wait. Or apply to the broker network for the full career track.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Button data-testid="button-final-get-link" size="lg" className="flex-1 bg-emerald-600 hover:bg-emerald-500 text-white font-black rounded-2xl h-12 text-sm shadow-2xl" onClick={() => scrollTo(generatorRef)}>
              <Zap className="w-4 h-4 mr-2" /> Get My Free Link
            </Button>
            <Button data-testid="button-final-apply" size="lg" variant="outline" className="flex-1 border-purple-500/30 text-purple-300 hover:bg-purple-500/10 font-black rounded-2xl h-12 text-sm" onClick={() => scrollTo(applyRef)}>
              <BadgeCheck className="w-4 h-4 mr-2" /> Apply as a Broker
            </Button>
            <Button data-testid="button-final-wa" size="lg" variant="outline" className="flex-1 border-white/10 text-gray-300 hover:bg-white/5 font-black rounded-2xl h-12 text-sm" onClick={handleJoinWhatsApp}>
              <MessageCircle className="w-4 h-4 mr-2" /> WhatsApp
            </Button>
          </div>
        </div>
      </section>

      {/* ── URGENCY FOOTER STRIP ─────────────────────────── */}
      <div className="py-4 px-4 bg-red-950/30 border-t border-red-500/20">
        <p className="text-center text-sm font-black text-red-300 uppercase tracking-widest">
          ⚡ Only 10 brokers will be onboarded this week. Applications close Sunday.
        </p>
      </div>

      {/* ── AI ASSISTANT WIDGET ─────────────────────────── */}
      <div className="fixed bottom-20 right-4 z-50 md:bottom-6 md:right-6" data-testid="ai-assistant-widget">
        {aiOpen ? (
          <div className="w-80 bg-slate-900 border border-emerald-500/30 rounded-2xl shadow-2xl shadow-black/60 overflow-hidden animate-in fade-in slide-in-from-bottom-4 duration-200">
            <div className="flex items-center justify-between px-4 py-3 bg-emerald-950/60 border-b border-emerald-500/20">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span className="text-xs font-black text-emerald-300 uppercase tracking-widest">DeliWer AI Assistant</span>
              </div>
              <button onClick={() => setAiOpen(false)} className="text-gray-500 hover:text-white transition-colors"><X className="w-4 h-4" /></button>
            </div>
            <div className="p-4 space-y-4">
              {!aiAssigned ? (
                <>
                  <p className="text-sm text-gray-300 leading-relaxed bg-slate-800/60 rounded-xl px-3 py-3 border border-white/5">
                    You are in <strong className="text-white">{selectedArea || "Dubai"}</strong>.<br />
                    <strong className="text-emerald-400">{selectedArea ? AREA_DATA[selectedArea]?.deals ?? 6 : 6} rental units</strong> need tenants this week.<br />
                    Avg commission <strong className="text-white">AED {selectedArea ? AREA_DATA[selectedArea]?.avgComm.toLocaleString() ?? "3,000" : "3,000"}</strong>.<br />
                    <span className="text-gray-400 text-xs">Want me to assign deals?</span>
                  </p>
                  <div className="flex gap-2">
                    <Button
                      data-testid="button-ai-assign-deals"
                      size="sm"
                      className="flex-1 bg-emerald-600 hover:bg-emerald-500 text-white font-black rounded-xl h-9 text-xs"
                      onClick={() => {
                        setAiAssigned(true);
                        toast({ title: "Deals assigned!", description: `${selectedArea ? AREA_DATA[selectedArea]?.deals ?? 6 : 6} opportunities queued for you. Check the feed below.` });
                        document.getElementById("opportunities")?.scrollIntoView({ behavior: "smooth" });
                      }}
                    >
                      <Zap className="w-3 h-3 mr-1" /> Assign Deals
                    </Button>
                    <Button
                      data-testid="button-ai-show-more"
                      size="sm"
                      variant="outline"
                      className="flex-1 border-white/10 text-gray-400 hover:bg-white/5 font-black rounded-xl h-9 text-xs"
                      onClick={() => { setSelectedArea("Dubai Marina / JBR"); setShowCalc(true); document.getElementById("what-you-earn")?.scrollIntoView({ behavior: "smooth" }); }}
                    >
                      Show More
                    </Button>
                  </div>
                </>
              ) : (
                <div className="space-y-3 text-center py-2">
                  <CheckCircle2 className="w-8 h-8 text-emerald-400 mx-auto" />
                  <p className="text-sm font-black text-white">Deals assigned to your queue!</p>
                  <p className="text-xs text-gray-400">Scroll down to the Open Opportunities feed to claim your slots.</p>
                  <Button size="sm" className="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-black rounded-xl h-9 text-xs" onClick={() => { setAiOpen(false); document.getElementById("opportunities")?.scrollIntoView({ behavior: "smooth" }); }}>
                    View Opportunities
                  </Button>
                </div>
              )}
            </div>
          </div>
        ) : (
          <button
            data-testid="button-ai-open"
            onClick={() => setAiOpen(true)}
            className="group flex items-center gap-2 bg-emerald-600 hover:bg-emerald-500 text-white font-black rounded-2xl px-4 py-3 shadow-2xl shadow-emerald-900/50 transition-all hover:scale-105"
          >
            <Sparkles className="w-4 h-4" />
            <span className="text-sm hidden sm:block text-[#ffffff]">AI Assistant</span>
            <div className="w-2 h-2 rounded-full bg-white animate-pulse" />
          </button>
        )}
      </div>

      {/* ── STICKY MOBILE BAR ─────────────────────────────── */}
      <div data-testid="sticky-mobile-bar" className="fixed bottom-0 left-0 right-0 z-50 md:hidden bg-slate-950/95 backdrop-blur-md border-t border-white/10 p-3 flex gap-2">
        <Button data-testid="button-sticky-get-link" size="lg" className="flex-1 bg-emerald-600 hover:bg-emerald-500 text-white font-black rounded-xl h-12 text-sm shadow-2xl" onClick={() => scrollTo(generatorRef)}>
          <Zap className="w-4 h-4 mr-2" /> Get My Link
        </Button>
        <Button data-testid="button-sticky-inner-circle" size="lg" className="flex-1 bg-amber-500 hover:bg-amber-400 text-black font-black rounded-xl h-12 text-sm" onClick={() => document.getElementById("inner-circle")?.scrollIntoView({ behavior: "smooth" })}>
          <Crown className="w-4 h-4 mr-2" /> Inner Circle
        </Button>
      </div>
    </div>
  );
}
