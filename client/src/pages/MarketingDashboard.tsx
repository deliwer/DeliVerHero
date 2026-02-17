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
    refetchInterval: 5000, 
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

  const hassan = streaks?.find(s => s.name === "Hassan Jawad");
  const today = new Date().toISOString().split("T")[0];
  const missedDay = hassan && hassan.lastPosted !== today;

  return (
    <div className="min-h-screen bg-slate-950 text-white p-6 pb-24">
      <div className="max-w-7xl mx-auto space-y-8">
        <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border-b border-white/10 pb-6">
          <div className="space-y-1">
            <h1 className="text-4xl font-black uppercase tracking-tighter text-emerald-500">Founder Command Center</h1>
            <p className="text-gray-400 font-medium tracking-wide">Unified Reachout, Marketing & Survival Engine</p>
          </div>
          <div className="flex gap-4">
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

        <Tabs defaultValue="intent" className="space-y-6">
          <TabsList className="bg-slate-900 border-white/5 p-1">
            <TabsTrigger value="intent" className="data-[state=active]:bg-emerald-500 data-[state=active]:text-black">Intent Sniffer</TabsTrigger>
            <TabsTrigger value="survival" className="data-[state=active]:bg-emerald-500 data-[state=active]:text-black">Founder Survival</TabsTrigger>
            <TabsTrigger value="broker" className="data-[state=active]:bg-emerald-500 data-[state=active]:text-black">Broker Intel</TabsTrigger>
            <TabsTrigger value="email" className="data-[state=active]:bg-emerald-500 data-[state=active]:text-black">Email Campaigns</TabsTrigger>
            <TabsTrigger value="concierge" className="data-[state=active]:bg-emerald-500 data-[state=active]:text-black">Concierge MVP</TabsTrigger>
          </TabsList>

          <TabsContent value="intent" className="space-y-6">
             <div className="grid gap-4 md:grid-cols-4">
                {[
                  { label: "Intercepted", value: leads?.filter(l => l.marketingStage === "intercepted").length || 0, icon: Instagram, color: "text-pink-500" },
                  { label: "Handshake", value: leads?.filter(l => l.marketingStage === "handshake").length || 0, icon: MessageCircle, color: "text-blue-500" },
                  { label: "Redirected", value: leads?.filter(l => l.marketingStage === "redirected").length || 0, icon: ArrowRight, color: "text-emerald-500" },
                  { label: "Closed", value: leads?.filter(l => l.marketingStage === "closed").length || 0, icon: CheckCircle2, color: "text-emerald-400" },
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
                  {leads?.slice(0, 10).map(lead => (
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
          </TabsContent>

          <TabsContent value="survival" className="space-y-6">
             <div className="grid md:grid-cols-2 gap-6">
                <Card className="bg-slate-900 border-white/5">
                  <CardHeader><CardTitle>Daily Ritual</CardTitle></CardHeader>
                  <CardContent className="grid grid-cols-2 gap-3">
                    <Button onClick={() => window.open('https://chat.openai.com', '_blank')} className="bg-[#10a37f]"><SiOpenai className="mr-2" /> ChatGPT</Button>
                    <Button onClick={() => window.open('https://business.facebook.com', '_blank')} className="bg-[#1877F2]"><SiFacebook className="mr-2" /> Meta Suite</Button>
                    <Button onClick={() => streakMutation.mutate()} disabled={!missedDay} className="col-span-2">{missedDay ? "Mark Posted Today 🔥" : "Posted ✨"}</Button>
                  </CardContent>
                </Card>
                <Card className="bg-slate-900 border-white/5">
                  <CardHeader><CardTitle className="flex items-center gap-2"><Flame className="text-orange-500" /> Current Streak: {hassan?.streak || 0}</CardTitle></CardHeader>
                  <CardContent className="space-y-4">
                    <Progress value={((hassan?.streak || 0) % 30) * 3.33} className="h-2" />
                    <p className="text-xs text-center text-gray-500">Relentless Builder Mode Active</p>
                  </CardContent>
                </Card>
             </div>
          </TabsContent>

          <TabsContent value="broker" className="space-y-6">
            <div className="grid md:grid-cols-3 gap-6">
              <Card className="bg-slate-900 border-white/5 md:col-span-1">
                <CardHeader><CardTitle>Qualify Broker</CardTitle></CardHeader>
                <CardContent className="space-y-3">
                  <Input placeholder="Name" value={newBroker.name} onChange={e => setNewBroker({...newBroker, name: e.target.value})} className="bg-white/5 border-white/10" />
                  <Input placeholder="Agency" value={newBroker.agency} onChange={e => setNewBroker({...newBroker, agency: e.target.value})} className="bg-white/5 border-white/10" />
                  <Input placeholder="Area" value={newBroker.area} onChange={e => setNewBroker({...newBroker, area: e.target.value})} className="bg-white/5 border-white/10" />
                  <Button onClick={addBroker} className="w-full bg-emerald-600">Analyze Broker</Button>
                </CardContent>
              </Card>
              <div className="md:col-span-2 space-y-4">
                {brokers.map(b => (
                  <Card key={b.id} className="bg-slate-900 border-white/5">
                    <CardContent className="p-4 flex justify-between items-center">
                      <div>
                        <h4 className="font-bold">{b.name}</h4>
                        <p className="text-sm text-emerald-400">{b.agency} • {b.area}</p>
                      </div>
                      <Badge className="bg-emerald-500 text-black">Tier {b.tier}</Badge>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </TabsContent>

          <TabsContent value="email">
            <EmailCampaignManager />
          </TabsContent>

          <TabsContent value="concierge">
            <Card className="bg-slate-900 border-white/5 max-w-2xl mx-auto">
              <CardHeader>
                <Input placeholder="Phone context..." value={phone} onChange={e => setPhone(e.target.value)} className="bg-white/5 border-white/10" />
              </CardHeader>
              <CardContent className="h-[400px] flex flex-col">
                <ScrollArea className="flex-1 p-4 border rounded-md mb-4 border-white/5">
                  {conciergeMessages.map((m, i) => (
                    <div key={i} className={`mb-2 flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                      <span className={`p-2 rounded-lg text-sm ${m.role === 'user' ? 'bg-emerald-600' : 'bg-slate-800'}`}>{m.content}</span>
                    </div>
                  ))}
                </ScrollArea>
                <div className="flex gap-2">
                  <Input value={conciergeInput} onChange={e => setConciergeInput(e.target.value)} onKeyDown={e => e.key === 'Enter' && handleConciergeSend()} placeholder="Type message..." className="bg-white/5 border-white/10" />
                  <Button onClick={handleConciergeSend}><Send className="h-4 w-4" /></Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
