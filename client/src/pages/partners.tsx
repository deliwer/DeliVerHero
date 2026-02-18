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

  const partners = [
    { name: "Hassan Jawad", role: "Founder & Lead", type: "Core" },
    { name: "Freelance Broker Affiliate 1", role: "Relocation Scout", type: "Freelance" },
    { name: "Freelance Broker Affiliate 2", role: "Area Specialist (Marina)", type: "Freelance" },
    { name: "Freelance Broker Affiliate 3", role: "Area Specialist (Downtown)", type: "Freelance" },
  ];

  return (
    <div className="min-h-screen bg-dubai-gradient text-white selection:bg-emerald-500/30">
      <SEOMeta 
        title="Strategic Partners | Deliwer Dubai"
        description="Our network of core and freelance partners driving relocation excellence in Dubai."
      />
      
      <div className="container mx-auto pt-32 pb-20 px-4 space-y-12">
        <div className="text-center space-y-4">
          <Badge className="bg-emerald-500/10 text-emerald-400 border-emerald-500/20 px-4 py-1">
            PARTNERSHIP NETWORK
          </Badge>
          <h1 className="text-5xl md:text-6xl font-black uppercase tracking-tighter">Strategic <span className="text-emerald-500">Partners</span></h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Combining core leadership with a vast network of freelance broker affiliates to dominate the relocation industry.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {partners.map((partner, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
            >
              <Card className="bg-white/5 border-white/10 hover-elevate h-full">
                <CardHeader className="flex flex-row items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-emerald-500/20 flex items-center justify-center">
                    <Briefcase className="text-emerald-500 w-6 h-6" />
                  </div>
                  <div>
                    <CardTitle className="text-lg font-bold text-white">{partner.name}</CardTitle>
                    <CardDescription className="text-gray-400">{partner.role}</CardDescription>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <Badge variant={partner.type === 'Core' ? 'default' : 'secondary'} className={partner.type === 'Freelance' ? 'bg-blue-500/20 text-blue-400 border-blue-500/30' : 'bg-emerald-500 text-black'}>
                    {partner.type}
                  </Badge>
                  <p className="text-sm text-gray-300 leading-relaxed">
                    {partner.type === 'Core' 
                      ? "Driving the vision and managing the relentless distribution engine for survival launch."
                      : "Commission-only affiliate focused on indirect relationship building and lead generation."}
                  </p>
                  <div className="pt-2 flex items-center gap-2 text-xs font-bold text-emerald-500">
                    <CheckCircle2 className="w-4 h-4" />
                    DUBAI VERIFIED
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Existing Referral Generator Section */}
        <div className="max-w-2xl mx-auto pt-12">
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
        </div>
      </div>
    </div>
  );

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
