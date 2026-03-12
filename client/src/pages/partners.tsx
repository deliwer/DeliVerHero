import { useState } from "react";
import { SEOMeta } from "@/components/seo-meta";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Copy, Check, Zap, Users, TrendingUp, Award, BarChart3, BookOpen } from "lucide-react";
import { motion } from "framer-motion";
import { useToast } from "@/hooks/use-toast";
import { Navigation } from "@/components/navigation";
import { Link } from "wouter";

export default function PartnersPage() {
  const [partnerName, setPartnerName] = useState("");
  const [agentName, setAgentName] = useState("");
  const [campaign, setCampaign] = useState("whatsapp");
  const [copied, setCopied] = useState(false);
  const { toast } = useToast();

  // Generate referral link
  const generateLink = () => {
    if (!partnerName) return "";
    const ref = partnerName.toLowerCase().replace(/\s+/g, "");
    const agent = agentName ? agentName.toLowerCase().replace(/\s+/g, "") : "";
    
    let link = `${window.location.origin}/start?ref=${ref}`;
    if (agent) link += `&agent=${agent}`;
    if (campaign) link += `&campaign=${campaign}`;
    
    return link;
  };

  const generatedLink = generateLink();

  const copyToClipboard = async () => {
    if (!generatedLink) return;
    await navigator.clipboard.writeText(generatedLink);
    setCopied(true);
    toast({
      title: "Link Copied",
      description: "Your referral link is ready to share.",
    });
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white selection:bg-emerald-500/30">
      <SEOMeta 
        title="Partner with DeliWer | Referral Program | Dubai Move-In Services"
        description="Join DeliWer's partner network and earn 20% commission. Generate your unique referral link and start earning today."
      />
      <Navigation />

      {/* Hero Section */}
      <section className="relative py-24 px-4 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-emerald-500/10 to-transparent pointer-events-none" />
        <div className="max-w-5xl mx-auto text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="space-y-8"
          >
            <h1 className="text-5xl md:text-7xl font-black uppercase tracking-tighter">
              Partner with <span className="text-emerald-500">DeliWer</span>
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto font-medium">
              Earn 20% commission on every Move-In Concierge booking you refer. Generate your unique link, share it with your network, and watch your earnings grow.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Link Generator Section */}
      <section className="py-24 px-4 bg-white/5 border-y border-white/10">
        <div className="max-w-2xl mx-auto">
          <Card className="bg-slate-900 border-emerald-500/30 p-8">
            <h2 className="text-3xl font-black uppercase mb-8 text-white">Generate Your Referral Link</h2>
            
            <div className="space-y-6">
              {/* Partner Name */}
              <div>
                <Label className="text-sm font-black uppercase text-emerald-400 mb-2 block">Partner Name *</Label>
                <Input
                  placeholder="e.g., DeBacci Capital, MyTablon"
                  value={partnerName}
                  onChange={(e) => setPartnerName(e.target.value)}
                  className="bg-slate-950 border-white/20 text-white placeholder:text-gray-500 h-12"
                  data-testid="input-partner-name"
                />
                <p className="text-xs text-gray-500 mt-2">This will be used to track your referrals</p>
              </div>

              {/* Agent Name */}
              <div>
                <Label className="text-sm font-black uppercase text-emerald-400 mb-2 block">Agent Name (Optional)</Label>
                <Input
                  placeholder="e.g., John Smith"
                  value={agentName}
                  onChange={(e) => setAgentName(e.target.value)}
                  className="bg-slate-950 border-white/20 text-white placeholder:text-gray-500 h-12"
                  data-testid="input-agent-name"
                />
                <p className="text-xs text-gray-500 mt-2">Identify the specific agent making the referral</p>
              </div>

              {/* Campaign */}
              <div>
                <Label className="text-sm font-black uppercase text-emerald-400 mb-2 block">Campaign</Label>
                <Select value={campaign} onValueChange={setCampaign}>
                  <SelectTrigger className="bg-slate-950 border-white/20 text-white h-12" data-testid="select-campaign">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-slate-900 border-white/20">
                    <SelectItem value="whatsapp">WhatsApp Community</SelectItem>
                    <SelectItem value="telegram">Telegram Group</SelectItem>
                    <SelectItem value="linkedin">LinkedIn</SelectItem>
                    <SelectItem value="email">Email</SelectItem>
                    <SelectItem value="personal">Personal Network</SelectItem>
                    <SelectItem value="building">Building Network</SelectItem>
                  </SelectContent>
                </Select>
                <p className="text-xs text-gray-500 mt-2">How you'll be sharing this link</p>
              </div>

              {/* Generated Link Display */}
              {generatedLink && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-emerald-500/10 border border-emerald-500/30 rounded-xl p-6"
                >
                  <p className="text-xs font-black uppercase text-emerald-400 mb-3">Your Referral Link</p>
                  <div className="flex items-center gap-2 bg-slate-950 rounded-lg p-4 border border-white/10">
                    <code className="text-sm text-gray-300 flex-1 break-all font-mono">{generatedLink}</code>
                    <Button
                      size="sm"
                      onClick={copyToClipboard}
                      className={`flex-shrink-0 transition-all ${
                        copied 
                          ? "bg-emerald-600 hover:bg-emerald-600" 
                          : "bg-emerald-600 hover:bg-emerald-500"
                      }`}
                      data-testid="button-copy-link"
                    >
                      {copied ? (
                        <>
                          <Check className="w-4 h-4" />
                        </>
                      ) : (
                        <>
                          <Copy className="w-4 h-4" />
                        </>
                      )}
                    </Button>
                  </div>
                </motion.div>
              )}

              {!partnerName && (
                <div className="bg-gray-500/10 border border-gray-500/30 rounded-xl p-4">
                  <p className="text-sm text-gray-400">Enter your partner name to generate your unique referral link</p>
                </div>
              )}
            </div>
          </Card>

          {/* Instructions */}
          <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { num: "1", title: "Generate", desc: "Create your unique referral link above" },
              { num: "2", title: "Share", desc: "Send to your WhatsApp, email, or social network" },
              { num: "3", title: "Earn", desc: "Get 20% commission on every successful booking" }
            ].map((step, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                viewport={{ once: true }}
                className="bg-white/5 border border-white/10 rounded-xl p-6 text-center"
              >
                <div className="text-3xl font-black text-emerald-500 mb-2">{step.num}</div>
                <h3 className="font-black uppercase text-white mb-2">{step.title}</h3>
                <p className="text-sm text-gray-400">{step.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Commission & Benefits Section */}
      <section className="py-24 px-4">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-4xl font-black uppercase mb-12 text-center">Why Partner with DeliWer</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[
              { icon: Award, title: "20% Commission", desc: "Earn AED 79.80 per AED 399 booking" },
              { icon: TrendingUp, title: "Unlimited Earnings", desc: "No cap on referrals or commissions" },
              { icon: Users, title: "High Conversion", desc: "WhatsApp-native funnel converts at 30%+" },
              { icon: Zap, title: "Instant Tracking", desc: "Real-time referral attribution via URL params" }
            ].map((benefit, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                viewport={{ once: true }}
                className="flex gap-4 bg-white/5 border border-white/10 rounded-xl p-6 hover:border-emerald-500/50 transition-all"
              >
                <div className="flex-shrink-0">
                  <div className="flex items-center justify-center h-12 w-12 rounded-lg bg-emerald-500/20">
                    <benefit.icon className="h-6 w-6 text-emerald-400" />
                  </div>
                </div>
                <div>
                  <h3 className="font-black text-white mb-1">{benefit.title}</h3>
                  <p className="text-gray-400 text-sm">{benefit.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Commission Tracking & Tools Section */}
      <section className="py-24 px-4 bg-gradient-to-b from-emerald-500/10 to-transparent border-t border-emerald-500/20">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-4xl font-black uppercase mb-4 text-center">Transparency & Tools for Success</h2>
          <p className="text-center text-gray-300 mb-12 max-w-3xl mx-auto">
            Real-time commission tracking and ready-to-use marketing templates to maximize your earning potential and confidence.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Commission Tracking Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0 }}
              viewport={{ once: true }}
            >
              <div className="h-full">
                <Link href="/partner-program">
                  <Card className="bg-emerald-900/40 border-emerald-500/50 p-8 hover:border-emerald-500 transition-all h-full cursor-pointer block">
                    <div className="flex items-start gap-4 mb-4">
                      <div className="flex items-center justify-center h-12 w-12 rounded-lg bg-emerald-500/30">
                        <BarChart3 className="h-6 w-6 text-emerald-300" />
                      </div>
                      <div>
                        <h3 className="text-2xl font-black text-emerald-300">Commission Tracking</h3>
                      </div>
                    </div>
                    <p className="text-gray-300 mb-6">
                      See real-time earnings, conversion rates, and detailed partner economics. Track every referral and watch your commission grow.
                    </p>
                    <div className="space-y-3 mb-6">
                      <div className="flex items-center gap-2 text-emerald-200 text-sm">
                        <div className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                        <span>Real-time referral tracking</span>
                      </div>
                      <div className="flex items-center gap-2 text-emerald-200 text-sm">
                        <div className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                        <span>AED 79.80 per successful booking</span>
                      </div>
                      <div className="flex items-center gap-2 text-emerald-200 text-sm">
                        <div className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                        <span>Monthly payouts, zero hidden fees</span>
                      </div>
                    </div>
                    <Button className="w-full bg-emerald-600 hover:bg-emerald-500 font-black">
                      Explore Commission Program →
                    </Button>
                  </Card>
                </Link>
              </div>
            </motion.div>

            {/* Community Toolkit Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              viewport={{ once: true }}
            >
              <div className="h-full">
                <Link href="/community-toolkit">
                  <Card className="bg-blue-900/40 border-blue-500/50 p-8 hover:border-blue-500 transition-all h-full cursor-pointer block">
                    <div className="flex items-start gap-4 mb-4">
                      <div className="flex items-center justify-center h-12 w-12 rounded-lg bg-blue-500/30">
                        <BookOpen className="h-6 w-6 text-blue-300" />
                      </div>
                      <div>
                        <h3 className="text-2xl font-black text-blue-300">Marketing Toolkit</h3>
                      </div>
                    </div>
                    <p className="text-gray-300 mb-6">
                      Copy-paste templates for WhatsApp, email, LinkedIn, and building groups. Start promoting immediately with tested messaging.
                    </p>
                    <div className="space-y-3 mb-6">
                      <div className="flex items-center gap-2 text-blue-200 text-sm">
                        <div className="w-1.5 h-1.5 rounded-full bg-blue-400" />
                        <span>WhatsApp & Telegram templates</span>
                      </div>
                      <div className="flex items-center gap-2 text-blue-200 text-sm">
                        <div className="w-1.5 h-1.5 rounded-full bg-blue-400" />
                        <span>LinkedIn & email messages</span>
                      </div>
                      <div className="flex items-center gap-2 text-blue-200 text-sm">
                        <div className="w-1.5 h-1.5 rounded-full bg-blue-400" />
                        <span>Pro tips for maximum conversions</span>
                      </div>
                    </div>
                    <Button className="w-full bg-blue-600 hover:bg-blue-500 font-black">
                      View Templates & Tips →
                    </Button>
                  </Card>
                </Link>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Partner Examples Section */}
      <section className="py-24 px-4 bg-white/5 border-t border-white/10">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-4xl font-black uppercase mb-12 text-center">Partner Categories</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { title: "Community Influencers", examples: ["WhatsApp Communities", "Telegram Groups", "LinkedIn Influencers"] },
              { title: "Real Estate Networks", examples: ["Real Estate Agents", "Relocation Consultants", "Property Managers"] },
              { title: "Building Partners", examples: ["Building Security", "Concierge Desks", "Tenant Groups"] },
              { title: "Corporate Partners", examples: ["HR Relocation Teams", "Corporate Movers", "Recruitment Agencies"] },
              { title: "Airbnb & Hosts", examples: ["Property Owners", "Airbnb Hosts", "Short-term Rentals"] },
              { title: "Content Creators", examples: ["Dubai Bloggers", "YouTube Channels", "Instagram Accounts"] }
            ].map((category, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                viewport={{ once: true }}
                className="bg-white/5 border border-white/10 rounded-xl p-6"
              >
                <h3 className="font-black text-white mb-4">{category.title}</h3>
                <ul className="space-y-2">
                  {category.examples.map((ex, j) => (
                    <li key={j} className="flex items-center gap-2 text-gray-400 text-sm">
                      <div className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                      {ex}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-24 px-4 bg-gradient-to-r from-emerald-950/30 to-slate-950 border-t border-emerald-500/20">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          <h2 className="text-4xl font-black uppercase">Ready to Start Earning?</h2>
          <p className="text-xl text-gray-300 font-medium">
            Generate your referral link above, share it with your network, and earn 20% commission on every successful booking.
          </p>
        </div>
      </section>
    </div>
  );
}
