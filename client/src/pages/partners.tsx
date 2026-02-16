import { useState } from "react";
import { SEOMeta } from "@/components/seo-meta";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { CheckCircle2, ShieldCheck, Zap, Briefcase, DollarSign, Copy, Check } from "lucide-react";
import { motion } from "framer-motion";
import { SiWhatsapp } from "react-icons/si";
import { useToast } from "@/hooks/use-toast";

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

  return (
    <div className="min-h-screen bg-dubai-gradient text-white selection:bg-emerald-500/30">
      <SEOMeta 
        title="Broker Move-In Support Dubai | Partnership Program"
        description="Exclusive move-in support for Dubai real estate brokers. We handle Ejari, DEWA, and cleaning for your clients while you earn 10% commission."
      />

      <section className="pt-32 pb-20 px-4 text-center">
        <div className="max-w-4xl mx-auto space-y-8">
          <Badge className="bg-emerald-500/10 text-emerald-400 border-emerald-500/20 px-4 py-1 mb-4">
            BROKER EXCLUSIVE
          </Badge>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl md:text-7xl font-black uppercase tracking-tighter leading-tight"
          >
            Broker Move-In <br />
            <span className="text-emerald-500">Support Dubai</span>
          </motion.h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto font-medium">
            You close the deal. We handle the move-in chaos. You earn 10% commission.
          </p>
          <div className="flex flex-col md:flex-row gap-4 justify-center items-center">
            <Button 
              size="lg" 
              className="bg-emerald-600 hover:bg-emerald-500 text-white font-black rounded-2xl px-12 h-20 text-2xl shadow-2xl transition-all"
              onClick={() => window.open(whatsappLink, '_blank')}
            >
              <SiWhatsapp className="w-8 h-8 mr-4" />
              Join via WhatsApp
            </Button>
          </div>
        </div>
      </section>

      {/* Embedded Referral Link Generator */}
      <section className="py-12 px-4 max-w-2xl mx-auto">
        <Card className="bg-white/5 border-white/10 hover-elevate">
          <CardHeader>
            <CardTitle className="text-white uppercase tracking-tight">Referral Link Generator</CardTitle>
            <CardDescription className="text-gray-400">Instant tracking for your client referrals.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="agent-name" className="text-gray-300">Agent Name</Label>
                <Input
                  id="agent-name"
                  placeholder="e.g. john_doe"
                  value={agentName}
                  onChange={handleAgentNameChange}
                  className="bg-black/20 border-white/10 text-white"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="campaign" className="text-gray-300">Campaign</Label>
                <Select value={campaign} onValueChange={setCampaign}>
                  <SelectTrigger id="campaign" className="bg-black/20 border-white/10 text-white">
                    <SelectValue placeholder="Select campaign" />
                  </SelectTrigger>
                  <SelectContent className="bg-slate-900 border-white/10 text-white">
                    <SelectItem value="general">General</SelectItem>
                    <SelectItem value="ejari">Ejari</SelectItem>
                    <SelectItem value="relocation">Relocation</SelectItem>
                    <SelectItem value="movein">Move-In</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="pt-4 space-y-2">
              <div className="flex gap-2">
                <Input
                  readOnly
                  value={generatedLink}
                  placeholder="Link will appear here..."
                  className="bg-black/40 border-white/10 text-emerald-400"
                />
                <Button 
                  onClick={copyToClipboard} 
                  disabled={!generatedLink}
                  size="icon"
                  variant="outline"
                  className="border-white/10 hover:bg-emerald-500/20"
                >
                  {copied ? <Check className="h-4 w-4 text-emerald-500" /> : <Copy className="h-4 w-4" />}
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </section>

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
