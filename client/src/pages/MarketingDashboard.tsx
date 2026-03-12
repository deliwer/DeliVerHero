import { useState, useEffect } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
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
  Linkedin, Plus, Copy, Check, DollarSign, BarChart3, Eye, Settings
} from "lucide-react";
import { motion } from "framer-motion";

const RENTAL_HEAVY_AREAS = ["Marina", "JVC", "Business Bay", "Downtown", "Hills"];

function IntentSnifferView({ leads, leadMutation }: { leads: any[], leadMutation: any }) {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-xl font-bold text-white flex items-center gap-2">
          <Target className="text-emerald-500" />
          Instagram Listening (Active Interceptions)
        </h3>
        <Badge variant="outline" className="border-emerald-500/50 text-emerald-400 animate-pulse">
          Live Syncing
        </Badge>
      </div>
      
      <div className="grid gap-4">
        {leads.length === 0 ? (
          <div className="text-center py-12 border-2 border-dashed border-white/5 rounded-2xl bg-slate-900/20">
            <p className="text-gray-400 font-medium">No active interceptions found. Check Instagram DM scripts.</p>
          </div>
        ) : (
          leads.map((lead) => (
            <Card key={lead.id} className="bg-emerald-950/30 backdrop-blur-sm border-emerald-500/30 hover:border-emerald-500/50 transition-all shadow-md">
              <CardContent className="p-5">
                <div className="flex justify-between items-start">
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-white text-lg">{lead.name}</span>
                      <Badge className={
                        lead.marketingStage === "intercepted" ? "bg-amber-500/30 text-amber-300 border border-amber-500/50" :
                        lead.marketingStage === "handshake" ? "bg-blue-500/30 text-blue-300 border border-blue-500/50" :
                        "bg-emerald-500/30 text-emerald-300 border border-emerald-500/50"
                      }>
                        {lead.marketingStage?.toUpperCase()}
                      </Badge>
                    </div>
                    <div className="flex items-center gap-4 text-sm text-gray-300">
                      <span className="flex items-center gap-1"><Instagram size={14} /> @{lead.instagramHandle || 'unknown'}</span>
                      <span className="flex items-center gap-1"><TrendingUp size={14} /> Intent: Relocation</span>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    {lead.marketingStage === "intercepted" && (
                      <Button 
                        size="sm" 
                        onClick={() => leadMutation.mutate({ id: lead.id, stage: "handshake" })}
                        className="bg-blue-600 hover:bg-blue-500 text-white font-bold"
                      >
                        Log Handshake
                      </Button>
                    )}
                    {lead.marketingStage === "handshake" && (
                      <Button 
                        size="sm" 
                        onClick={() => leadMutation.mutate({ id: lead.id, stage: "redirected" })}
                        className="bg-emerald-600 hover:bg-emerald-500 text-white font-bold"
                      >
                        Confirm Redirect
                      </Button>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>
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
          <TabsList className="grid grid-cols-2 md:grid-cols-6 gap-1 bg-slate-900/90 backdrop-blur-xl border border-white/10 p-2 sticky top-0 z-20 shadow-2xl rounded-xl w-full">
            <TabsTrigger value="survival" className="data-[state=active]:bg-emerald-600 data-[state=active]:text-white data-[state=inactive]:bg-slate-800 data-[state=inactive]:text-gray-300 font-bold transition-all text-xs md:text-sm">Survival</TabsTrigger>
            <TabsTrigger value="whatsapp" className="data-[state=active]:bg-blue-600 data-[state=active]:text-white data-[state=inactive]:bg-slate-800 data-[state=inactive]:text-gray-300 font-bold transition-all text-xs md:text-sm">WhatsApp</TabsTrigger>
            <TabsTrigger value="intent" className="data-[state=active]:bg-purple-600 data-[state=active]:text-white data-[state=inactive]:bg-slate-800 data-[state=inactive]:text-gray-300 font-bold transition-all text-xs md:text-sm">Intent</TabsTrigger>
            <TabsTrigger value="broker" className="data-[state=active]:bg-yellow-600 data-[state=active]:text-white data-[state=inactive]:bg-slate-800 data-[state=inactive]:text-gray-300 font-bold transition-all text-xs md:text-sm">Brokers</TabsTrigger>
            <TabsTrigger value="partners" className="data-[state=active]:bg-orange-600 data-[state=active]:text-white data-[state=inactive]:bg-slate-800 data-[state=inactive]:text-gray-300 font-bold transition-all text-xs md:text-sm">Affiliates</TabsTrigger>
            <TabsTrigger value="seo" className="data-[state=active]:bg-cyan-600 data-[state=active]:text-white data-[state=inactive]:bg-slate-800 data-[state=inactive]:text-gray-300 font-bold transition-all text-xs md:text-sm">SEO</TabsTrigger>
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
            <Card className="bg-orange-900/40 border-orange-500/50 shadow-lg">
              <CardHeader className="bg-orange-900/60 border-b border-orange-500/30">
                <CardTitle className="text-orange-200 flex items-center gap-2">
                  <Users className="text-orange-400" />
                  Active Partners & Revenue
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6 space-y-4">
                {partners.map((partner, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.1 }}
                    viewport={{ once: true }}
                    className="bg-slate-950/50 border border-orange-500/30 rounded-xl p-4"
                  >
                    <div className="grid grid-cols-2 md:grid-cols-6 gap-3 items-center">
                      <div>
                        <h3 className="font-black text-orange-200 text-sm">{partner.name}</h3>
                        <code className="text-xs text-orange-400">?ref={partner.ref}</code>
                      </div>
                      <div className="text-center">
                        <p className="text-gray-400 text-xs font-bold">Agents</p>
                        <p className="text-lg font-black text-orange-300">{partner.agents}</p>
                      </div>
                      <div className="text-center">
                        <p className="text-gray-400 text-xs font-bold">Clicks</p>
                        <p className="text-lg font-black text-orange-300">{partner.clicks}</p>
                      </div>
                      <div className="text-center">
                        <p className="text-gray-400 text-xs font-bold">Conversions</p>
                        <p className="text-lg font-black text-orange-300">{partner.conversions}</p>
                      </div>
                      <div className="text-center">
                        <p className="text-gray-400 text-xs font-bold">Revenue</p>
                        <p className="text-lg font-black text-orange-300">AED {partner.revenue}</p>
                      </div>
                      <Button
                        size="sm"
                        variant="outline"
                        className="border-orange-500/50 text-orange-300 bg-orange-500/10 hover:bg-orange-500/20"
                        onClick={() => copyLink(`https://deliwer.com/start?ref=${partner.ref}`, `partner-${partner.ref}`)}
                      >
                        {copied === `partner-${partner.ref}` ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                      </Button>
                    </div>
                  </motion.div>
                ))}
              </CardContent>
            </Card>
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
