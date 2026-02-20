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
  Users, 
  Target, 
  MessageSquare, 
  Send, 
  TrendingUp, 
  Zap, 
  Shield, 
  Search,
  CheckCircle2,
  Clock,
  ArrowRight,
  AlertTriangle,
  Loader2,
  Instagram,
  Phone,
  Linkedin,
  Plus
} from "lucide-react";

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
            <p className="text-gray-500 font-medium">No active interceptions found. Check Instagram DM scripts.</p>
          </div>
        ) : (
          leads.map((lead) => (
            <Card key={lead.id} className="bg-slate-900/60 backdrop-blur-sm border-white/10 hover:border-emerald-500/30 transition-all shadow-md">
              <CardContent className="p-5">
                <div className="flex justify-between items-start">
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-white text-lg">{lead.name}</span>
                      <Badge className={
                        lead.marketingStage === "intercepted" ? "bg-amber-500/20 text-amber-400" :
                        lead.marketingStage === "handshake" ? "bg-blue-500/20 text-blue-400" :
                        "bg-emerald-500/20 text-emerald-400"
                      }>
                        {lead.marketingStage?.toUpperCase()}
                      </Badge>
                    </div>
                    <div className="flex items-center gap-4 text-sm text-gray-400">
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
      // Simulate distribution to partner list
      await new Promise(resolve => setTimeout(resolve, 2000));
      return { success: true };
    },
    onSuccess: () => {
      toast({ title: "Distribution Launched", description: "Content is being sent to the partner network." });
    }
  });

  const handleGenerateContent = () => {
    generateContentMutation.mutate();
  };

  const handleLaunchDistribution = () => {
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
      // Added required security parameter for outreach trigger
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

  if (leadsLoading || streaksLoading || brokersLoading) {
    return <div className="flex items-center justify-center h-screen bg-slate-950"><Loader2 className="animate-spin text-emerald-500" /></div>;
  }

  const displayLeads = leads || [];
  const hassan = streaks?.find(s => s.name === "Hassan Jawad");
  const today = new Date().toISOString().split("T")[0];
  const missedDay = hassan && hassan.lastPosted !== today;

  return (
    <div className="min-h-screen bg-slate-950 text-white p-6 pb-24 relative overflow-hidden">
      <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&q=80')] bg-cover bg-center opacity-10 pointer-events-none" />
      <div className="absolute inset-0 bg-gradient-to-b from-slate-950/50 via-slate-950/80 to-slate-950 pointer-events-none" />
      <div className="max-w-7xl mx-auto space-y-8 relative z-10">
        <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border-b border-white/10 pb-6 bg-slate-900/40 backdrop-blur-md p-4 rounded-xl">
          <div className="space-y-1">
            <h1 className="text-4xl font-black uppercase tracking-tighter text-emerald-500">Founder Command Center</h1>
            <p className="text-gray-400 font-medium tracking-wide">Unified Reachout, Marketing & Survival Engine</p>
          </div>
          <div className="flex gap-4">
             <Button 
                onClick={() => {
                  const riskLevel = prompt("Enter Risk Level (Low/Medium/High):", "Medium");
                  toast({ title: `Risk Mode: ${riskLevel}`, description: "Adjusting lead priorities and outreach velocity." });
                }}
                variant="outline"
                className="border-red-500/30 text-red-400 bg-red-500/5 hover:bg-red-500/10"
              >
                <AlertTriangle className="h-4 w-4 mr-2" />
                Preempt Risk
              </Button>
             <Button 
                onClick={triggerDailyFounderReminder}
                disabled={isTriggering}
                variant="outline"
                className="border-emerald-500/30 text-emerald-400 bg-emerald-500/5"
              >
                {isTriggering ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4 mr-2" />}
                Trigger Outreach
              </Button>
          </div>
        </header>

        <Tabs defaultValue="survival" className="space-y-6 relative z-10">
          <TabsList className="bg-slate-900/90 backdrop-blur-xl border border-white/20 p-1 sticky top-0 z-20 shadow-2xl rounded-xl">
            <TabsTrigger value="survival" className="data-[state=active]:bg-emerald-500 data-[state=active]:text-black font-bold transition-all hover:bg-white/5">Founder Survival</TabsTrigger>
            <TabsTrigger value="whatsapp" className="data-[state=active]:bg-emerald-500 data-[state=active]:text-black font-bold transition-all hover:bg-white/5">WhatsApp Marketing</TabsTrigger>
            <TabsTrigger value="intent" className="data-[state=active]:bg-emerald-500 data-[state=active]:text-black font-bold transition-all hover:bg-white/5">Intent Sniffer</TabsTrigger>
            <TabsTrigger value="broker" className="data-[state=active]:bg-emerald-500 data-[state=active]:text-black font-bold transition-all hover:bg-white/5">Broker Intel</TabsTrigger>
            <TabsTrigger value="email" className="data-[state=active]:bg-emerald-500 data-[state=active]:text-black font-bold transition-all hover:bg-white/5">Email Campaigns</TabsTrigger>
            <TabsTrigger value="concierge" className="data-[state=active]:bg-emerald-500 data-[state=active]:text-black font-bold transition-all hover:bg-white/5">Concierge MVP</TabsTrigger>
          </TabsList>

          <TabsContent value="intent" className="space-y-6 bg-slate-900/80 backdrop-blur-md p-6 rounded-2xl border border-white/10 shadow-xl">
             <IntentSnifferView leads={displayLeads} leadMutation={leadMutation} />
          </TabsContent>

          <TabsContent value="whatsapp" className="space-y-6 bg-slate-900/80 backdrop-blur-md p-6 rounded-2xl border border-white/10 shadow-xl">
            <div className="grid md:grid-cols-2 gap-6">
              <Card className="bg-slate-950/50 border-white/10 shadow-lg">
                <CardHeader>
                  <CardTitle className="text-white flex items-center gap-2">
                    <MessageSquare className="text-emerald-500" />
                    Partner Outreach
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="p-4 bg-slate-900 rounded-xl border border-white/5">
                    <h4 className="font-bold text-white mb-2">Daily Content Generation</h4>
                    <p className="text-sm text-gray-400 mb-4">AI-generated messaging for potential real estate partners and movers.</p>
                    {generatedContent && (
                      <div className="mb-4 p-3 bg-slate-950 rounded-lg border border-emerald-500/20 text-xs text-gray-300 italic">
                        "{generatedContent}"
                      </div>
                    )}
                    <Button 
                      className="w-full bg-emerald-600 hover:bg-emerald-500"
                      onClick={handleGenerateContent}
                      disabled={generateContentMutation.isPending}
                    >
                      {generateContentMutation.isPending ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : null}
                      {generatedContent ? "Regenerate Post" : "Generate New Post"}
                    </Button>
                  </div>
                  <div className="p-4 bg-slate-900 rounded-xl border border-white/5">
                    <h4 className="font-bold text-white mb-2">WhatsApp Distribution</h4>
                    <p className="text-sm text-gray-400 mb-4">Broadcast content to verified broker lists and community groups.</p>
                    <Button 
                      variant="outline" 
                      className="w-full border-emerald-500/30 text-emerald-400"
                      onClick={handleLaunchDistribution}
                      disabled={distributeContentMutation.isPending || !generatedContent}
                    >
                      {distributeContentMutation.isPending ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : null}
                      Launch Distribution
                    </Button>
                  </div>
                </CardContent>
              </Card>
              <Card className="bg-slate-950/50 border-white/10 shadow-lg">
                <CardHeader>
                  <CardTitle className="text-white">Marketing Analytics</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center text-sm">
                      <span className="text-gray-400">Open Rate</span>
                      <span className="text-emerald-400 font-bold">84%</span>
                    </div>
                    <div className="flex justify-between items-center text-sm">
                      <span className="text-gray-400">Response Rate</span>
                      <span className="text-emerald-400 font-bold">12.5%</span>
                    </div>
                    <div className="flex justify-between items-center text-sm">
                      <span className="text-gray-400">Partner Conversions</span>
                      <span className="text-emerald-400 font-bold">28</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="survival" className="space-y-6 bg-slate-900/70 backdrop-blur-md p-6 rounded-2xl border border-white/10 shadow-xl">
             <div className="grid md:grid-cols-2 gap-6">
                <Card className="bg-slate-950/50 backdrop-blur-sm border-white/10 shadow-lg">
                  <CardHeader>
                    <CardTitle className="text-white flex items-center gap-2">
                      <Zap className="text-yellow-400" />
                      Ritual Tracker
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="flex items-center justify-between p-4 bg-slate-900 rounded-xl border border-white/5">
                      <div>
                        <p className="text-sm text-gray-400 uppercase tracking-widest font-bold">Hassan's Streak</p>
                        <p className="text-4xl font-black text-white">{hassan?.streak || 0} DAYS</p>
                      </div>
                      <Button 
                        size="lg"
                        onClick={() => streakMutation.mutate()}
                        disabled={!missedDay}
                        className={missedDay ? "bg-emerald-600 hover:bg-emerald-500" : "bg-slate-800 text-gray-500"}
                      >
                        {missedDay ? "Post Update" : "Completed Today"}
                      </Button>
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-slate-950/50 backdrop-blur-sm border-white/10 shadow-lg">
                  <CardHeader>
                    <CardTitle className="text-white flex items-center justify-between gap-2">
                      <div className="flex items-center gap-2">
                        <Shield className="text-emerald-500" />
                        Critical Intel
                      </div>
                      <Badge variant="outline" className="text-[10px] border-emerald-500/30 text-emerald-400">LIVE</Badge>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="p-3 bg-emerald-500/10 border border-emerald-500/20 rounded-lg group hover:bg-emerald-500/20 transition-colors">
                      <div className="flex justify-between items-start mb-1">
                        <span className="text-[10px] font-bold text-emerald-400 uppercase tracking-tighter">Market Alert</span>
                        <span className="text-[10px] text-emerald-400/60">Just now</span>
                      </div>
                      <p className="text-sm font-bold text-emerald-100">PRELAUNCH.AE: New handover list available. 450+ units in JVC & Business Bay ready for interception.</p>
                    </div>
                    <div className="p-3 bg-red-500/10 border border-red-500/20 rounded-lg group hover:bg-red-500/20 transition-colors">
                      <div className="flex justify-between items-start mb-1">
                        <span className="text-[10px] font-bold text-red-400 uppercase tracking-tighter">Market Alert</span>
                        <span className="text-[10px] text-red-400/60">2h ago</span>
                      </div>
                      <p className="text-sm font-bold text-red-100">MARINA SHIFT: 12% rent hike reported in Tiger Tower. Update relocation scripts.</p>
                    </div>
                    <div className="p-3 bg-blue-500/10 border border-blue-500/20 rounded-lg group hover:bg-blue-500/20 transition-colors">
                      <div className="flex justify-between items-start mb-1">
                        <span className="text-[10px] font-bold text-blue-400 uppercase tracking-tighter">Opportunity</span>
                        <span className="text-[10px] text-blue-400/60">5h ago</span>
                      </div>
                      <p className="text-sm font-bold text-blue-100">JVC HANDOVER: Plaza residences starting handovers. Prime for Move-In water kits.</p>
                    </div>
                    <div className="p-3 bg-emerald-500/10 border border-emerald-500/20 rounded-lg group hover:bg-emerald-500/20 transition-colors">
                      <div className="flex justify-between items-start mb-1">
                        <span className="text-[10px] font-bold text-emerald-400 uppercase tracking-tighter">Broker Pulse</span>
                        <span className="text-[10px] text-emerald-400/60">Just now</span>
                      </div>
                      <p className="text-sm font-bold text-emerald-100">PARTNER GROWTH: 3 new holiday home managers registered in Business Bay.</p>
                    </div>
                  </CardContent>
                </Card>
             </div>
          </TabsContent>

          <TabsContent value="broker" className="space-y-6 bg-slate-900/80 backdrop-blur-md p-6 rounded-2xl border border-white/10 shadow-xl">
            <div className="grid md:grid-cols-3 gap-6">
              <Card className="bg-slate-950/50 backdrop-blur-sm border-white/10 md:col-span-1 shadow-lg">
                <CardHeader><CardTitle className="text-white">Qualify Broker</CardTitle></CardHeader>
                <CardContent className="space-y-3">
                  <Input placeholder="Name" value={newBroker.name} onChange={e => setNewBroker({...newBroker, name: e.target.value})} className="bg-white/10 border-white/20 text-white placeholder:text-gray-500" />
                  <Input placeholder="Agency / Developer" value={newBroker.agency} onChange={e => setNewBroker({...newBroker, agency: e.target.value})} className="bg-white/10 border-white/20 text-white placeholder:text-gray-500" />
                  <Input placeholder="Area / Reach" value={newBroker.area} onChange={e => setNewBroker({...newBroker, area: e.target.value})} className="bg-white/10 border-white/20 text-white placeholder:text-gray-500" />
                  <div className="flex gap-2 mb-2">
                    <select 
                      value={newBroker.category} 
                      onChange={e => setNewBroker({...newBroker, category: e.target.value})}
                      className="w-full bg-slate-900 border border-white/20 text-white rounded-md p-2 text-sm"
                    >
                      <option value="brokerage">Brokerage</option>
                      <option value="developer">Developer</option>
                      <option value="holiday_home">Holiday Home</option>
                      <option value="discovered_online">Online Discovery</option>
                    </select>
                  </div>
                  <Button onClick={addBroker} className="w-full bg-emerald-600 hover:bg-emerald-500 font-bold" disabled={addBrokerMutation.isPending}>
                    {addBrokerMutation.isPending ? <Loader2 className="h-4 w-4 animate-spin" /> : "Save Intelligence"}
                  </Button>
                </CardContent>
              </Card>

              <div className="md:col-span-2 space-y-4">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xl font-bold text-white">Market Intelligence</h3>
                  <div className="flex gap-2">
                    {['all', 'brokerage', 'developer', 'holiday_home', 'discovered_online'].map(cat => (
                      <Badge 
                        key={cat} 
                        className={`cursor-pointer transition-colors ${filter === cat ? 'bg-emerald-500 text-black' : 'bg-slate-800 text-gray-300 hover:bg-emerald-500/50'}`}
                        onClick={() => setFilter(cat)}
                      >
                        {cat.replace('_', ' ')}
                      </Badge>
                    ))}
                  </div>
                </div>
                
                <div className="grid gap-3">
                  {filteredBrokers.map(b => (
                    <Card key={b.id} className="bg-slate-900/60 backdrop-blur-sm border-white/10 hover:border-emerald-500/30 transition-all shadow-md">
                      <CardContent className="p-4 flex justify-between items-center">
                        <div>
                          <div className="flex items-center gap-2">
                            <h4 className="font-bold text-white">{b.name}</h4>
                            <Badge className="bg-emerald-500/10 text-emerald-400 border-emerald-500/20 text-[10px]">{b.category?.toUpperCase()}</Badge>
                          </div>
                          <p className="text-sm text-gray-400">{b.agency} • {b.area}</p>
                        </div>
                        <div className="text-right">
                          <Badge variant="outline" className="border-emerald-500/30 text-emerald-400">Tier {b.tier || 3}</Badge>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="concierge" className="space-y-6 bg-slate-900/80 backdrop-blur-md p-6 rounded-2xl border border-white/10 shadow-xl">
            <div className="grid md:grid-cols-3 gap-6">
              <Card className="bg-slate-950/50 border-white/10 md:col-span-1 shadow-lg">
                <CardHeader><CardTitle className="text-white">Active Session</CardTitle></CardHeader>
                <CardContent className="space-y-4">
                  <Input placeholder="WhatsApp Phone" value={phone} onChange={e => setPhone(e.target.value)} className="bg-white/10 border-white/20 text-white" />
                  <div className="p-3 bg-emerald-500/10 border border-emerald-500/20 rounded-lg text-sm text-emerald-400">
                    <p className="font-bold">MVP Tip:</p>
                    <p>Use "move in Marina" or "I need cleaning" to test concierge intelligence.</p>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-slate-950/50 border-white/10 md:col-span-2 flex flex-col h-[500px] shadow-lg">
                <CardContent className="flex-1 overflow-y-auto p-4 space-y-4">
                  {conciergeMessages.map((msg, i) => (
                    <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                      <div className={`max-w-[80%] p-3 rounded-2xl ${msg.role === 'user' ? 'bg-emerald-600 text-white' : 'bg-slate-800 text-gray-200 border border-white/5'}`}>
                        {msg.content}
                      </div>
                    </div>
                  ))}
                </CardContent>
                <div className="p-4 border-t border-white/10 flex gap-2">
                  <Input 
                    placeholder="Type founder command..." 
                    value={conciergeInput} 
                    onChange={e => setConciergeInput(e.target.value)}
                    onKeyPress={e => e.key === 'Enter' && handleConciergeSend()}
                    className="bg-white/10 border-white/20 text-white"
                  />
                  <Button onClick={handleConciergeSend} className="bg-emerald-600 hover:bg-emerald-500">
                    <Send className="h-4 w-4" />
                  </Button>
                </div>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}