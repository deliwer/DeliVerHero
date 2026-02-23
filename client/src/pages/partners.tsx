import { useState } from "react";
import { SEOMeta } from "@/components/seo-meta";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { CheckCircle2, ShieldCheck, Zap, Briefcase, DollarSign, Copy, Check, User } from "lucide-react";
import { motion } from "framer-motion";
import { SiWhatsapp } from "react-icons/si";
import { useToast } from "@/hooks/use-toast";
import { Navigation } from "@/components/navigation";

export default function BrokerSupportDubai() {
  const [agentName, setAgentName] = useState("");
  const [campaign, setCampaign] = useState("general");
  const [copied, setCopied] = useState(false);
  const { toast } = useToast();

  const whatsappLink = "https://wa.me/971523946311?text=Hi%20DeliWer,%20I%20am%20a%20broker%20and%20need%20move-in%20support%20for%20my%20client.";

  const handleAgentNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.toLowerCase().replace(/\s+/g, "_").replace(/[^a-z0-9_]/g, "");
    setAgentName(value);
  };

  const generatedLink = agentName 
    ? `${window.location.origin}/welcome?ref=${agentName}&utm_source=broker&utm_medium=referral&utm_campaign=${campaign}`
    : "";

  const copyToClipboard = async () => {
    if (!generatedLink) return;
    await navigator.clipboard.writeText(generatedLink);
    setCopied(true);
    toast({
      title: "Link Copy Success",
      description: "Your referral link is ready to share.",
    });
    setTimeout(() => setCopied(false), 2000);
  };

  const partners = [
    {
      name: "Strategic Leadership",
      role: "Core Distribution Engine",
      type: "Core",
      description: "Driving the vision and managing the relentless distribution engine for survival and market dominance."
    },
    {
      name: "Freelance Network",
      role: "Market Expansion Specialist",
      type: "Freelance",
      description: "Commission-only affiliates focused on relationship building and localized lead generation."
    }
  ];

  return (
    <div className="min-h-screen bg-dubai-gradient text-white selection:bg-emerald-500/40">
      <SEOMeta 
        title="Strategic Partners | Deliwer Dubai"
        description="Our network of core and freelance partners driving relocation excellence in Dubai."
      />
      
      {/* Micro Trust Line - Added for uniformity */}
      <Navigation />

      <div className="container mx-auto pt-20 pb-20 px-4 space-y-12">
        <div className="text-center space-y-4">
          <Badge className="bg-emerald-500/10 text-emerald-400 border-emerald-500/20 px-4 py-1">
            PARTNERSHIP NETWORK
          </Badge>
          <h1 className="text-5xl md:text-6xl font-black uppercase tracking-tighter">Strategic <span className="text-emerald-500">Partners</span></h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Combining core leadership with a vast network of freelance broker affiliates.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          {partners.slice(0, 2).map((partner, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
            >
              <Card className="bg-slate-900/40 backdrop-blur-md border-white/10 hover-elevate h-full overflow-hidden relative group">
                <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                <CardHeader className="flex flex-row items-center gap-4 relative z-10">
                  <div className="w-12 h-12 rounded-full bg-emerald-500/20 flex items-center justify-center border border-emerald-500/30">
                    <Briefcase className="text-emerald-500 w-6 h-6" />
                  </div>
                  <div>
                    <CardTitle className="text-lg font-bold text-white tracking-tight">{partner.name}</CardTitle>
                    <CardDescription className="text-emerald-400/70 text-xs font-bold uppercase tracking-widest">{partner.role}</CardDescription>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4 relative z-10">
                  <Badge 
                    variant={partner.type === 'Core' ? 'default' : 'secondary'} 
                    className={
                      partner.type === 'Freelance' ? 'bg-blue-500/20 text-blue-400 border-blue-500/30' : 
                      'bg-emerald-500 text-black font-bold'
                    }
                  >
                    {partner.type}
                  </Badge>
                  <p className="text-sm text-gray-300 leading-relaxed min-h-[60px]">
                    {partner.description}
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Existing Referral Generator Section */}
        <div className="max-w-3xl mx-auto pt-12 space-y-6">
          <div className="text-center space-y-2">
            <h3 className="text-2xl font-bold text-white uppercase tracking-tight">Generate Your Affiliate Link</h3>
            <p className="text-gray-400 text-sm italic">Get tracked instantly. Share your link with clients and track your 10% commission in real-time.</p>
          </div>
          
          <Card className="bg-slate-900/80 backdrop-blur-xl border-emerald-500/30 hover:border-emerald-500/60 transition-all shadow-2xl shadow-emerald-500/10">
            <CardHeader className="border-b border-white/5 pb-4">
              <div className="flex items-center justify-between">
                <CardTitle className="text-white uppercase tracking-tight flex items-center gap-2">
                  <Zap className="w-5 h-5 text-yellow-400 fill-yellow-400" />
                  Enhanced Referral Engine
                </CardTitle>
                <Badge className="bg-emerald-500 text-black font-black">10% COMMISSION</Badge>
              </div>
              <CardDescription className="text-gray-400">Custom tracking for freelance & agency partners.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6 pt-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-3">
                  <Label htmlFor="agent-name" className="text-xs uppercase font-bold tracking-widest text-emerald-500/70">Partner Identifier (ID)</Label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                    <Input
                      id="agent-name"
                      placeholder="e.g. smith_realty"
                      value={agentName}
                      onChange={handleAgentNameChange}
                      className="bg-black/40 border-white/10 text-white pl-10 h-12 focus:border-emerald-500/50 transition-all"
                    />
                  </div>
                  <p className="text-[10px] text-gray-500">This will be used to track your unique referrals.</p>
                </div>
                <div className="space-y-3">
                  <Label htmlFor="campaign" className="text-xs uppercase font-bold tracking-widest text-emerald-500/70">Conversion Goal</Label>
                  <Select value={campaign} onValueChange={setCampaign}>
                    <SelectTrigger id="campaign" className="bg-black/40 border-white/10 text-white h-12">
                      <SelectValue placeholder="Select goal" />
                    </SelectTrigger>
                    <SelectContent className="bg-slate-900 border-white/10 text-white">
                      <SelectItem value="general">Comprehensive Support</SelectItem>
                      <SelectItem value="ejari">Ejari & DEWA Only</SelectItem>
                      <SelectItem value="relocation">Full Relocation</SelectItem>
                      <SelectItem value="movein">Home Essentials Pack</SelectItem>
                    </SelectContent>
                  </Select>
                  <p className="text-[10px] text-gray-500">Target specific service landing pages.</p>
                </div>
              </div>

              <div className="pt-4 space-y-4">
                <Label className="text-xs uppercase font-bold tracking-widest text-emerald-500/70">Your Tracking Link</Label>
                <div className="flex gap-2">
                  <div className="relative flex-1">
                    <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
                      <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                    </div>
                    <Input
                      readOnly
                      value={generatedLink}
                      placeholder="Enter ID to generate link..."
                      className="bg-black/60 border-white/20 text-emerald-400 h-14 pl-8 font-mono text-sm"
                    />
                  </div>
                  <Button 
                    onClick={copyToClipboard} 
                    disabled={!generatedLink}
                    size="lg"
                    className="bg-emerald-600 hover:bg-emerald-500 text-white h-14 px-8 rounded-xl shadow-lg shadow-emerald-500/20 active-elevate-2"
                  >
                    {copied ? <CheckCircle2 className="h-5 w-5 mr-2" /> : <Copy className="h-5 w-5 mr-2" />}
                    {copied ? "Copied" : "Copy Link"}
                  </Button>
                </div>
                
                {generatedLink && (
                  <motion.div 
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="p-4 bg-emerald-500/5 border border-emerald-500/10 rounded-xl flex items-start gap-3"
                  >
                    <ShieldCheck className="w-5 h-5 text-emerald-500 flex-shrink-0 mt-0.5" />
                    <p className="text-xs text-emerald-200/70 leading-relaxed">
                      All traffic to this link is cookied for 30 days. Any conversion (WhatsApp, Form, or Order) will be attributed to your partner ID for commission payout.
                    </p>
                  </motion.div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      <section className="py-20 px-4 max-w-6xl mx-auto">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <h2 className="text-3xl font-black uppercase tracking-tight text-emerald-500">Why Partner?</h2>
            <div className="space-y-4">
              {[
                "Operational back-office support",
                "10% commission on services",
                "Premium client experience",
                "Weekly payouts via WhatsApp"
              ].map((item, i) => (
                <div key={i} className="flex gap-4 items-center">
                  <CheckCircle2 className="w-6 h-6 text-emerald-500 flex-shrink-0" />
                  <span className="font-bold text-gray-200">{item}</span>
                </div>
              ))}
            </div>
          </div>
          <Card className="bg-white/5 border-white/10 p-8 rounded-3xl">
            <CardContent className="p-0 space-y-6">
              <h3 className="text-2xl font-black uppercase text-center">Earnings</h3>
              <div className="space-y-4">
                <div className="flex justify-between border-b border-white/5 pb-2 text-sm">
                  <span>Ejari & DEWA Setup</span>
                  <span className="text-emerald-400">AED 100</span>
                </div>
                <div className="flex justify-between border-b border-white/5 pb-2 text-sm">
                  <span>Full Move-In Pack</span>
                  <span className="text-emerald-400">AED 500+</span>
                </div>
                <div className="flex justify-between border-b border-white/5 pb-2 text-sm">
                  <span>Relocation Concierge</span>
                  <span className="text-emerald-400">10% Share</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      <section className="py-20 px-4 bg-black/40 text-center">
        <div className="max-w-4xl mx-auto space-y-12">
          <h2 className="text-4xl font-black uppercase tracking-tighter">Protection Promise</h2>
          <p className="text-xl text-gray-300">No poaching. No listings. Pure support.</p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { icon: ShieldCheck, text: "No Poaching" },
              { icon: Zap, text: "Fast Setup" },
              { icon: Briefcase, text: "B2B Focus" },
              { icon: DollarSign, text: "Top Rates" }
            ].map((item, i) => (
              <div key={i} className="flex flex-col items-center gap-2">
                <item.icon className="w-8 h-8 text-emerald-500" />
                <span className="text-xs font-bold uppercase tracking-widest text-gray-400">{item.text}</span>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
