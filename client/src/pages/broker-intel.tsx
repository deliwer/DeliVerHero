import { useState, useEffect } from "react";
import { SEOMeta } from "@/components/seo-meta";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { 
  Search, 
  UserPlus, 
  MessageSquare, 
  Linkedin, 
  Instagram, 
  Copy, 
  Download, 
  Upload,
  AlertTriangle,
  TrendingUp,
  Award,
  Zap,
  CheckCircle2,
  Trash2
} from "lucide-react";
import { SiWhatsapp } from "react-icons/si";
import { useToast } from "@/hooks/use-toast";
import { motion, AnimatePresence } from "framer-motion";

interface Broker {
  id: string;
  name: string;
  agency: string;
  area: string;
  phone: string;
  instagram: string;
  linkedin: string;
  score: number;
  tier: string;
  strategy: string;
}

const RENTAL_HEAVY_AREAS = [
  "Marina", "Downtown", "JVC", "Business Bay", "JLT", "Silicon Oasis", "DIFC", "Palm Jumeirah"
];

export default function BrokerIntelPage() {
  const [brokers, setBrokers] = useState<Broker[]>([]);
  const [newBroker, setNewBroker] = useState({
    name: "",
    agency: "",
    area: "",
    phone: "",
    instagram: "",
    linkedin: ""
  });
  const { toast } = useToast();

  useEffect(() => {
    const saved = localStorage.getItem("deliwer_broker_intel");
    if (saved) {
      setBrokers(JSON.parse(saved));
    }
  }, []);

  const saveToLocal = (data: Broker[]) => {
    localStorage.setItem("deliwer_broker_intel", JSON.stringify(data));
    setBrokers(data);
  };

  const calculateIntel = (brokerData: typeof newBroker) => {
    let score = 50;
    const isRentalHeavy = RENTAL_HEAVY_AREAS.some(area => 
      brokerData.area.toLowerCase().includes(area.toLowerCase())
    );

    if (isRentalHeavy) score += 30;
    if (brokerData.agency.toLowerCase().includes("real estate")) score += 5;
    
    let tier = "C";
    let strategy = "Operational Relief Focus";

    if (score >= 80) {
      tier = "A";
      strategy = "High-Volume Strategic Partnership";
    } else if (score >= 65) {
      tier = "B";
      strategy = "Boutique Concierge Focus";
    }

    return { score, tier, strategy };
  };

  const addBroker = () => {
    if (!newBroker.name || !newBroker.agency) {
      toast({ title: "Name and Agency are required", variant: "destructive" });
      return;
    }

    const { score, tier, strategy } = calculateIntel(newBroker);
    const broker: Broker = {
      ...newBroker,
      id: Date.now().toString(),
      score,
      tier,
      strategy
    };

    const updated = [broker, ...brokers];
    saveToLocal(updated);
    setNewBroker({ name: "", agency: "", area: "", phone: "", instagram: "", linkedin: "" });
    toast({ title: "Broker added to intelligence system" });
  };

  const deleteBroker = (id: string) => {
    const updated = brokers.filter(b => b.id !== id);
    saveToLocal(updated);
  };

  const generateMessages = (broker: Broker) => {
    const refLink = `https://deliwer.com/welcome?ref=${broker.name.toLowerCase().replace(/\s+/g, '_')}_${broker.agency.toLowerCase().replace(/\s+/g, '_')}`;
    
    return {
      whatsapp: `Hi ${broker.name}, great to connect 🤝\n\nWe help brokers earn from post-rental services like Ejari, move-in coordination and relocation — without interfering in your deals.\n\nWe operate strictly after closing.\n\nI noticed you're active in ${broker.area}. I’d love to generate your personal referral link immediately so you can start earning from your closed rentals.\n\nYour link would be: ${refLink}`,
      linkedin: `Hi ${broker.name}, noticed you’re closing multiple ${broker.area} rentals with ${broker.agency}. We support brokers in that segment with post-Ejari and relocation services so you can stay focused on the next deal. Would love to share how our partnership model works.`,
      instagram: `Hi ${broker.name}! Love your content on ${broker.area} properties. Are you currently offering post-move services (Ejari, DEWA, relocation) to your clients? We help brokers automate that and earn referral commission. Check out deliwer.com/partners`
    };
  };

  const copyToClipboard = (text: string, type: string) => {
    navigator.clipboard.writeText(text);
    toast({ title: `${type} message copied!` });
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white p-4 md:p-8 selection:bg-emerald-500/30">
      <SEOMeta title="Broker Intelligence Engine | DeliWer" />

      <div className="max-w-7xl mx-auto space-y-8">
        <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border-b border-white/10 pb-6">
          <div className="space-y-1">
            <h1 className="text-3xl font-black uppercase tracking-tighter">Broker Intel Engine</h1>
            <p className="text-gray-400 font-medium tracking-wide">Intent Capture & Qualitative Scoring System</p>
          </div>
          <div className="flex gap-4">
            <Badge variant="outline" className="border-emerald-500/30 text-emerald-400 bg-emerald-500/5 px-4 py-1">
              AGENTIC MODE ACTIVE
            </Badge>
          </div>
        </header>

        <div className="bg-amber-500/10 border border-amber-500/20 rounded-xl p-4 flex items-start gap-3">
          <AlertTriangle className="h-5 w-5 text-amber-500 shrink-0 mt-0.5" />
          <p className="text-sm text-amber-200/80 font-medium">
            <strong>COMPLIANCE WARNING:</strong> Only contact brokers via publicly shared business contacts. Comply with UAE data regulations. No automated blasting allowed.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Input Panel */}
          <div className="lg:col-span-1 space-y-6">
            <Card className="bg-slate-900 border-white/5 rounded-2xl">
              <CardHeader>
                <CardTitle className="text-lg uppercase tracking-widest font-black flex items-center gap-2">
                  <UserPlus className="h-5 w-5 text-emerald-500" />
                  Qualify Broker
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label className="text-xs uppercase text-gray-500 font-bold">Full Name</Label>
                  <Input 
                    value={newBroker.name}
                    onChange={e => setNewBroker({...newBroker, name: e.target.value})}
                    placeholder="e.g. Ahmed Keller" 
                    className="bg-white/5 border-white/10"
                  />
                </div>
                <div className="space-y-2">
                  <Label className="text-xs uppercase text-gray-500 font-bold">Agency Name</Label>
                  <Input 
                    value={newBroker.agency}
                    onChange={e => setNewBroker({...newBroker, agency: e.target.value})}
                    placeholder="e.g. Allsopp & Allsopp" 
                    className="bg-white/5 border-white/10"
                  />
                </div>
                <div className="space-y-2">
                  <Label className="text-xs uppercase text-gray-500 font-bold">Specialized Area</Label>
                  <Input 
                    value={newBroker.area}
                    onChange={e => setNewBroker({...newBroker, area: e.target.value})}
                    placeholder="e.g. Dubai Marina" 
                    className="bg-white/5 border-white/10"
                  />
                </div>
                <div className="space-y-2">
                  <Label className="text-xs uppercase text-gray-500 font-bold">Public Phone/WhatsApp</Label>
                  <Input 
                    value={newBroker.phone}
                    onChange={e => setNewBroker({...newBroker, phone: e.target.value})}
                    placeholder="+971..." 
                    className="bg-white/5 border-white/10"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label className="text-xs uppercase text-gray-500 font-bold">Instagram</Label>
                    <Input 
                      value={newBroker.instagram}
                      onChange={e => setNewBroker({...newBroker, instagram: e.target.value})}
                      placeholder="@handle" 
                      className="bg-white/5 border-white/10 text-xs"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-xs uppercase text-gray-500 font-bold">LinkedIn</Label>
                    <Input 
                      value={newBroker.linkedin}
                      onChange={e => setNewBroker({...newBroker, linkedin: e.target.value})}
                      placeholder="linkedin.com/in/..." 
                      className="bg-white/5 border-white/10 text-xs"
                    />
                  </div>
                </div>
                <Button 
                  onClick={addBroker}
                  className="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-black uppercase tracking-widest h-12 mt-4"
                >
                  <Zap className="h-4 w-4 mr-2 fill-current" />
                  Generate Intel
                </Button>
              </CardContent>
            </Card>

            <Card className="bg-slate-900 border-white/5 rounded-2xl border-dashed">
              <CardContent className="py-8 flex flex-col items-center justify-center text-center space-y-4">
                <Upload className="h-10 w-10 text-gray-600" />
                <div className="space-y-1">
                  <h3 className="font-bold text-gray-400">Bulk Import</h3>
                  <p className="text-xs text-gray-600">Upload CSV from manual research</p>
                </div>
                <Button variant="outline" className="border-white/10 text-gray-400 hover:bg-white/5 font-bold uppercase tracking-widest text-xs">
                  Upload CSV
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* List Panel */}
          <div className="lg:col-span-2 space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-black uppercase tracking-widest flex items-center gap-2">
                <TrendingUp className="h-5 w-5 text-blue-500" />
                Intelligence Feed
              </h2>
              <span className="text-xs font-bold text-gray-500 uppercase tracking-widest">{brokers.length} Identified Brokers</span>
            </div>

            <div className="space-y-4">
              <AnimatePresence>
                {brokers.length === 0 ? (
                  <div className="py-20 text-center space-y-4 border-2 border-dashed border-white/5 rounded-3xl">
                    <Search className="h-12 w-12 text-gray-800 mx-auto" />
                    <p className="text-gray-600 font-medium">No broker intel captured yet. Start by qualifying an individual agent.</p>
                  </div>
                ) : (
                  brokers.map((broker) => {
                    const messages = generateMessages(broker);
                    return (
                      <motion.div
                        key={broker.id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                      >
                        <Card className="bg-slate-900 border-white/5 rounded-2xl overflow-hidden hover:border-emerald-500/30 transition-all">
                          <CardContent className="p-0">
                            <div className="p-6 flex flex-col md:flex-row gap-6">
                              <div className="flex-1 space-y-4">
                                <div className="flex items-start justify-between">
                                  <div>
                                    <h3 className="text-xl font-black uppercase tracking-tight">{broker.name}</h3>
                                    <p className="text-emerald-400 font-bold text-sm">{broker.agency} • {broker.area}</p>
                                  </div>
                                  <div className="flex flex-col items-end gap-2">
                                    <Badge className={`${
                                      broker.tier === 'A' ? 'bg-emerald-500' : 
                                      broker.tier === 'B' ? 'bg-blue-500' : 'bg-gray-600'
                                    } text-black font-black px-3 py-1 rounded-full`}>
                                      TIER {broker.tier}
                                    </Badge>
                                    <span className="text-[10px] font-black uppercase tracking-widest text-gray-500">Score: {broker.score}</span>
                                  </div>
                                </div>

                                <div className="bg-white/5 rounded-xl p-3 border border-white/5">
                                  <span className="text-[10px] font-black uppercase tracking-widest text-gray-500 block mb-1">Recommended Strategy</span>
                                  <p className="text-sm font-bold text-gray-200">{broker.strategy}</p>
                                </div>
                                
                                <div className="flex gap-2">
                                  <Button 
                                    size="sm" 
                                    variant="ghost" 
                                    className="h-8 px-2 text-gray-500 hover:text-white"
                                    onClick={() => deleteBroker(broker.id)}
                                  >
                                    <Trash2 className="h-3 w-3 mr-1" />
                                    Delete
                                  </Button>
                                </div>
                              </div>

                              <div className="w-full md:w-80 bg-black/30 p-4 space-y-4">
                                <h4 className="text-xs font-black uppercase tracking-[0.2em] text-gray-500 border-b border-white/5 pb-2">Outreach Templates</h4>
                                
                                <div className="space-y-3">
                                  <div className="space-y-1.5">
                                    <div className="flex justify-between items-center">
                                      <span className="text-[10px] font-black uppercase text-emerald-400 flex items-center gap-1">
                                        <SiWhatsapp className="h-2.5 w-2.5" /> WhatsApp
                                      </span>
                                      <Button size="icon" variant="ghost" className="h-5 w-5" onClick={() => copyToClipboard(messages.whatsapp, "WhatsApp")}>
                                        <Copy className="h-3 w-3" />
                                      </Button>
                                    </div>
                                    <p className="text-[11px] text-gray-400 line-clamp-2 bg-white/5 p-2 rounded-md italic">"{messages.whatsapp}"</p>
                                  </div>

                                  <div className="space-y-1.5">
                                    <div className="flex justify-between items-center">
                                      <span className="text-[10px] font-black uppercase text-blue-400 flex items-center gap-1">
                                        <Linkedin className="h-2.5 w-2.5" /> LinkedIn
                                      </span>
                                      <Button size="icon" variant="ghost" className="h-5 w-5" onClick={() => copyToClipboard(messages.linkedin, "LinkedIn")}>
                                        <Copy className="h-3 w-3" />
                                      </Button>
                                    </div>
                                    <p className="text-[11px] text-gray-400 line-clamp-2 bg-white/5 p-2 rounded-md italic">"{messages.linkedin}"</p>
                                  </div>

                                  <div className="space-y-1.5">
                                    <div className="flex justify-between items-center">
                                      <span className="text-[10px] font-black uppercase text-pink-400 flex items-center gap-1">
                                        <Instagram className="h-2.5 w-2.5" /> Instagram
                                      </span>
                                      <Button size="icon" variant="ghost" className="h-5 w-5" onClick={() => copyToClipboard(messages.instagram, "Instagram")}>
                                        <Copy className="h-3 w-3" />
                                      </Button>
                                    </div>
                                    <p className="text-[11px] text-gray-400 line-clamp-2 bg-white/5 p-2 rounded-md italic">"{messages.instagram}"</p>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      </motion.div>
                    );
                  })
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
