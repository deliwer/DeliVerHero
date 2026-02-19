import { leadApplications, type LeadApplication } from "@shared/schema";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { useQuery, useMutation } from "@tanstack/react-query";
import { 
  Instagram, MessageCircle, ArrowRight, Loader2, Radio, ExternalLink, 
  Send, Flame, CheckCircle2, Trophy, AlertCircle, Search, UserPlus,
  TrendingUp, Zap, Trash2, Mail, MessageSquare, Bot, User, Copy,
  Linkedin
} from "lucide-react";
import { SiOpenai, SiFacebook, SiWhatsapp } from "react-icons/si";
import { queryClient, apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { useState, useEffect } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ScrollArea } from "@/components/ui/scroll-area";
import { motion, AnimatePresence } from "framer-motion";
import { EmailCampaignManager } from "@/components/email-campaign-manager";

const RENTAL_HEAVY_AREAS = [
  "Marina", "Downtown", "JVC", "Business Bay", "JLT", "Silicon Oasis", "DIFC", "Palm Jumeirah"
];

function IntentSnifferView({ leads, leadMutation }: { leads: any[], leadMutation: any }) {
  const { data: liveLeads } = useQuery<any[]>({
    queryKey: ["/api/leads"],
    refetchInterval: 5000,
  });
  
  const displayLeads = liveLeads || leads;

  return (
    <div className="space-y-6">
      <div className="grid gap-4 md:grid-cols-4">
        {[
          { label: "Intercepted", value: displayLeads?.filter(l => l.marketingStage === "intercepted").length || 0, icon: Instagram, color: "text-pink-500" },
          { label: "Handshake", value: displayLeads?.filter(l => l.marketingStage === "handshake").length || 0, icon: MessageCircle, color: "text-blue-500" },
          { label: "Redirected", value: displayLeads?.filter(l => l.marketingStage === "redirected").length || 0, icon: ArrowRight, color: "text-emerald-500" },
          { label: "Closed", value: displayLeads?.filter(l => l.marketingStage === "closed").length || 0, icon: CheckCircle2, color: "text-emerald-400" },
        ].map((stat, i) => (
          <Card key={i} className="bg-slate-900 border-white/5">
            <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
              <CardTitle className="text-sm font-medium">{stat.label}</CardTitle>
              <stat.icon className={`h-4 w-4 ${stat.color}`} />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
            </CardContent>
          </Card>
        ))}
      </div>
      <Card className="bg-slate-900 border-white/5">
        <CardHeader><CardTitle className="flex items-center gap-2"><Radio className="w-5 h-5 text-emerald-500 animate-pulse" /> Live Intent Stream</CardTitle></CardHeader>
        <CardContent className="space-y-4">
          {displayLeads?.slice(0, 10).map(lead => (
            <div key={lead.id} className="flex items-center justify-between p-4 border border-white/5 rounded-xl bg-slate-950/50">
              <div>
                <p className="font-bold text-pink-400">@{lead.instagramHandle || lead.firstName}</p>
                <p className="text-sm text-gray-400 italic">{lead.notes}</p>
              </div>
              <Button size="sm" onClick={() => {
                  window.open(`https://wa.me/971523946311?text=Hi, I'm interested!`, "_blank");
                  leadMutation.mutate({ id: lead.id, stage: "redirected" });
              }} className="bg-emerald-600 hover:bg-emerald-500"><SiWhatsapp className="mr-2" /> WhatsApp</Button>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}

export default function MarketingDashboard() {
  const { toast } = useToast();
  const [isTriggering, setIsTriggering] = useState(false);
  const [phone, setPhone] = useState("");
  const [conciergeInput, setConciergeInput] = useState("");
  const [conciergeMessages, setConciergeMessages] = useState<any[]>([]);
  const [brokers, setBrokers] = useState<any[]>([]);
  const [newBroker, setNewBroker] = useState({
    name: "", agency: "", area: "", phone: "", instagram: "", linkedin: ""
  });

  const { data: leads, isLoading: leadsLoading } = useQuery<any[]>({
    queryKey: ["/api/leads"],
    // Moving interval-based refreshing to a nested component for performance
  });

  const { data: streaks, isLoading: streaksLoading } = useQuery<any[]>({
    queryKey: ["/api/founder-streaks"],
  });

  useEffect(() => {
    const saved = localStorage.getItem("deliwer_broker_intel");
    if (saved) setBrokers(JSON.parse(saved));
  }, []);

  const saveBrokers = (data: any[]) => {
    localStorage.setItem("deliwer_broker_intel", JSON.stringify(data));
    setBrokers(data);
  };

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
      await apiRequest("GET", "/api/daily-founder-trigger");
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
    if (!newBroker.name || !newBroker.agency) return;
    const score = RENTAL_HEAVY_AREAS.some(a => newBroker.area.toLowerCase().includes(a.toLowerCase())) ? 80 : 50;
    const broker = { ...newBroker, id: Date.now().toString(), score, tier: score >= 80 ? "A" : "B" };
    saveBrokers([broker, ...brokers]);
    setNewBroker({ name: "", agency: "", area: "", phone: "", instagram: "", linkedin: "" });
  };

  if (leadsLoading || streaksLoading) {
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
            <TabsTrigger value="intent" className="data-[state=active]:bg-emerald-500 data-[state=active]:text-black font-bold transition-all hover:bg-white/5">Intent Sniffer</TabsTrigger>
            <TabsTrigger value="broker" className="data-[state=active]:bg-emerald-500 data-[state=active]:text-black font-bold transition-all hover:bg-white/5">Broker Intel</TabsTrigger>
            <TabsTrigger value="email" className="data-[state=active]:bg-emerald-500 data-[state=active]:text-black font-bold transition-all hover:bg-white/5">Email Campaigns</TabsTrigger>
            <TabsTrigger value="concierge" className="data-[state=active]:bg-emerald-500 data-[state=active]:text-black font-bold transition-all hover:bg-white/5">Concierge MVP</TabsTrigger>
          </TabsList>

          <TabsContent value="intent" className="space-y-6 bg-slate-900/80 backdrop-blur-md p-6 rounded-2xl border border-white/10 shadow-xl">
             <IntentSnifferView leads={displayLeads} leadMutation={leadMutation} />
          </TabsContent>

          <TabsContent value="survival" className="space-y-6 bg-slate-900/70 backdrop-blur-md p-6 rounded-2xl border border-white/10 shadow-xl">
             <div className="grid md:grid-cols-2 gap-6">
                <Card className="bg-slate-950/50 backdrop-blur-sm border-white/10 shadow-lg">
                  <CardHeader>
                    <CardTitle className="text-white">Relentless Distribution Engine</CardTitle>
                    <CardDescription className="text-gray-300">Generate daily content and distribute to Meta Business Suite</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-2 gap-3">
                      <Button onClick={() => window.open('https://chat.openai.com', '_blank')} className="bg-[#10a37f]"><SiOpenai className="mr-2" /> ChatGPT AI</Button>
                      <Button onClick={() => window.open('https://business.facebook.com/latest/composer', '_blank')} className="bg-[#1877F2]"><SiFacebook className="mr-2" /> Meta Suite</Button>
                    </div>

                    <div className="p-3 bg-emerald-500/10 border border-emerald-500/20 rounded-lg space-y-2">
                      <Label className="text-[10px] uppercase font-bold text-emerald-400">Image Generation Prompt</Label>
                      <p className="text-xs text-gray-300 italic">"Cinematic high-end Dubai apartment interior, sunset view over Burj Khalifa, minimalist water delivery aesthetic, 8k resolution, professional architectural photography"</p>
                      <Button variant="outline" size="sm" className="w-full text-[10px] h-7 border-emerald-500/30" onClick={() => {
                        navigator.clipboard.writeText("Cinematic high-end Dubai apartment interior, sunset view over Burj Khalifa, minimalist water delivery aesthetic, 8k resolution, professional architectural photography");
                        toast({ title: "Prompt Copied!", description: "Paste into ChatGPT for image generation." });
                      }}>Copy Image Prompt</Button>
                    </div>
                    
                    <div className="space-y-2 border-t border-white/5 pt-4">
                      <div className="flex justify-between items-center">
                        <Label className="text-xs uppercase tracking-widest text-gray-500">Agentic Outreach Partners</Label>
                        <Button variant="link" size="sm" className="h-auto p-0 text-[10px] text-emerald-500" onClick={() => {
                          const postLink = prompt("Enter Post/Image Link to include:");
                          if (postLink) {
                            const script = `Check out our latest update: ${postLink}\n\nMoving to Dubai this week? 🇦🇪 Don't spend your first night without water. Deliwer sets up your hydration and home essentials in 10 mins. Link in bio! @vedeliwer #DubaiRelocation`;
                            navigator.clipboard.writeText(script);
                            toast({ title: "Message Prepared!", description: "Script with link copied to clipboard." });
                          }
                        }}>+ Add Post Link</Button>
                      </div>
                      <div className="grid grid-cols-1 gap-2">
                        {[
                          { name: "Allsopp & Allsopp", phone: "97144294444" },
                          { name: "Betterhomes", phone: "971600522233" },
                          { name: "Haus & Haus", phone: "97143025800" },
                          { name: "fäm Properties", phone: "97143691700" },
                          { name: "DRE Real Estate", phone: "97144271147" },
                          { name: "White & Co", phone: "97145830255" }
                        ].map((partner, i) => (
                          <div key={i} className="flex items-center justify-between p-3 bg-slate-950/50 rounded-lg border border-white/5 hover:border-emerald-500/30 transition-colors">
                            <span className="text-sm font-bold">{partner.name}</span>
                            <Button size="sm" variant="ghost" onClick={() => {
                              const script = "Moving to Dubai this week? 🇦🇪 Don't spend your first night without water. Deliwer sets up your hydration and home essentials in 10 mins. Link in bio! @vedeliwer #DubaiRelocation";
                              window.open(`https://wa.me/${partner.phone}?text=${encodeURIComponent(script)}`, '_blank');
                            }} className="text-emerald-400 hover:text-emerald-300">
                              <SiWhatsapp className="h-4 w-4" />
                            </Button>
                          </div>
                        ))}
                      </div>
                    </div>

                    <Button onClick={() => streakMutation.mutate()} disabled={!missedDay} className="w-full bg-emerald-600 hover:bg-emerald-500">
                      {missedDay ? "🔥 Confirm Daily Meta + IG Post" : "✨ Daily Ritual Complete"}
                    </Button>
                  </CardContent>
                </Card>
                
                <div className="space-y-6">
                  <Card className="bg-slate-900 border-white/5">
                    <CardHeader><CardTitle className="flex items-center gap-2"><Flame className="text-orange-500" /> Relentless Streak: {hassan?.streak || 0}</CardTitle></CardHeader>
                    <CardContent className="space-y-4">
                      <Progress value={((hassan?.streak || 0) % 30) * 3.33} className="h-2" />
                      <div className="flex justify-between text-[10px] uppercase tracking-widest text-gray-500 font-black">
                        <span>Day 0</span>
                        <span>Level Up at 30</span>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="bg-slate-900 border-white/5">
                    <CardHeader>
                      <CardTitle className="text-sm flex items-center gap-2">
                        <Bot className="w-4 h-4 text-emerald-500" /> 
                        Daily Script Generator
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="p-3 bg-slate-950 rounded-lg border border-white/5 text-sm italic text-gray-400">
                        "Moving to Dubai this week? 🇦🇪 Don't spend your first night without water. Deliwer sets up your hydration and home essentials in 10 mins. Link in bio! @vedeliwer #DubaiRelocation"
                      </div>
                      <Button variant="link" className="text-emerald-500 p-0 h-auto mt-2 text-xs" onClick={() => {
                        navigator.clipboard.writeText("Moving to Dubai this week? 🇦🇪 Don't spend your first night without water. Deliwer sets up your hydration and home essentials in 10 mins. Link in bio! @vedeliwer #DubaiRelocation");
                        toast({ title: "Copied!", description: "Script ready for Meta Suite." });
                      }}>
                        <Copy className="w-3 h-3 mr-1" /> Copy to Clipboard
                      </Button>
                    </CardContent>
                  </Card>
                </div>
             </div>
          </TabsContent>

          <TabsContent value="broker" className="space-y-6 bg-slate-900/80 backdrop-blur-md p-6 rounded-2xl border border-white/10 shadow-xl">
            <div className="grid md:grid-cols-3 gap-6">
              <Card className="bg-slate-950/50 backdrop-blur-sm border-white/10 md:col-span-1 shadow-lg">
                <CardHeader><CardTitle className="text-white">Qualify Broker</CardTitle></CardHeader>
                <CardContent className="space-y-3">
                  <Input placeholder="Name" value={newBroker.name} onChange={e => setNewBroker({...newBroker, name: e.target.value})} className="bg-white/10 border-white/20 text-white placeholder:text-gray-500" />
                  <Input placeholder="Agency" value={newBroker.agency} onChange={e => setNewBroker({...newBroker, agency: e.target.value})} className="bg-white/10 border-white/20 text-white placeholder:text-gray-500" />
                  <Input placeholder="Area" value={newBroker.area} onChange={e => setNewBroker({...newBroker, area: e.target.value})} className="bg-white/10 border-white/20 text-white placeholder:text-gray-500" />
                  <Button onClick={addBroker} className="w-full bg-emerald-600 hover:bg-emerald-500 font-bold">Analyze Broker</Button>
                </CardContent>
              </Card>
              <div className="md:col-span-2 space-y-4">
                {brokers.map(b => (
                  <Card key={b.id} className="bg-slate-900/60 backdrop-blur-sm border-white/10 hover:border-emerald-500/30 transition-all shadow-md">
                    <CardContent className="p-4 flex justify-between items-center">
                      <div>
                        <h4 className="font-bold text-white">{b.name}</h4>
                        <p className="text-sm text-emerald-400 font-medium">{b.agency} • {b.area}</p>
                      </div>
                      <Badge className="bg-emerald-500 text-black font-black">Tier {b.tier}</Badge>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </TabsContent>

          <TabsContent value="email">
            <EmailCampaignManager />
          </TabsContent>

          <TabsContent value="concierge" className="space-y-6 bg-slate-900/80 backdrop-blur-md p-6 rounded-2xl border border-white/10 shadow-xl">
            <Card className="bg-slate-950/50 backdrop-blur-sm border-white/10 max-w-2xl mx-auto shadow-lg">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <Bot className="w-5 h-5 text-emerald-500" />
                  AI Concierge Terminal
                </CardTitle>
                <Input placeholder="Phone context..." value={phone} onChange={e => setPhone(e.target.value)} className="bg-white/10 border-white/20 text-white placeholder:text-gray-500 mt-2" />
              </CardHeader>
              <CardContent className="h-[400px] flex flex-col">
                <ScrollArea className="flex-1 p-4 border rounded-md mb-4 border-white/10 bg-black/20">
                  {conciergeMessages.map((m, i) => (
                    <div key={i} className={`mb-2 flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                      <span className={`p-2 px-4 rounded-2xl text-sm shadow-sm ${m.role === 'user' ? 'bg-emerald-600 text-white rounded-tr-none' : 'bg-slate-800 text-gray-100 rounded-tl-none border border-white/5'}`}>{m.content}</span>
                    </div>
                  ))}
                </ScrollArea>
                <div className="flex gap-2">
                  <Input value={conciergeInput} onChange={e => setConciergeInput(e.target.value)} onKeyDown={e => e.key === 'Enter' && handleConciergeSend()} placeholder="Type message..." className="bg-white/10 border-white/20 text-white placeholder:text-gray-600" />
                  <Button onClick={handleConciergeSend} className="bg-emerald-600 hover:bg-emerald-500"><Send className="h-4 w-4" /></Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
