import { useState } from "react";
import { SEOMeta } from "@/components/seo-meta";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Copy, Check, TrendingUp, Users, DollarSign, BarChart3, Eye, MessageSquare, Settings, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import { useToast } from "@/hooks/use-toast";
import { Navigation } from "@/components/navigation";

export default function AffiliateManagement() {
  const [copied, setCopied] = useState<string | null>(null);
  const { toast } = useToast();

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

  const copyLink = (text: string, key: string) => {
    navigator.clipboard.writeText(text);
    setCopied(key);
    toast({ title: "Copied", description: "Link copied to clipboard" });
    setTimeout(() => setCopied(null), 2000);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <SEOMeta 
        title="Affiliate Management | DeliWer Growth Engine"
        description="Founder control center for affiliate and referral partner management, real-time analytics, and commission tracking."
      />
      <Navigation />

      <section className="py-16 px-4 pt-32">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-start md:items-center gap-4 mb-12">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex-1"
            >
              <h1 className="text-5xl font-black uppercase mb-4">Affiliate Management Center</h1>
              <p className="text-xl text-gray-300 font-medium">Real-time partner tracking, revenue analytics, and commission management.</p>
            </motion.div>
            <a href="/marketing/dashboard" data-testid="link-legacy-dashboard" className="flex-shrink-0">
              <Button 
                variant="outline"
                className="border-cyan-500/50 text-cyan-300 bg-cyan-500/10 hover:bg-cyan-500/20 font-bold whitespace-nowrap"
              >
                Marketing Dashboard
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </a>
          </div>

          {/* Key Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
            {[
              { icon: Users, label: "Active Partners", value: "6", color: "bg-blue-500/20 border-blue-500/50" },
              { icon: TrendingUp, label: "Total Conversions", value: "174", color: "bg-emerald-500/20 border-emerald-500/50" },
              { icon: DollarSign, label: "Commission Earned", value: "AED 34,872", color: "bg-yellow-500/20 border-yellow-500/50" },
              { icon: BarChart3, label: "Avg Conversion Rate", value: "8.1%", color: "bg-purple-500/20 border-purple-500/50" },
            ].map((metric, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                viewport={{ once: true }}
                className={`${metric.color} border rounded-xl p-6`}
              >
                <div className="flex items-center gap-3 mb-2">
                  <metric.icon className="w-6 h-6" />
                  <p className="text-xs font-black uppercase text-gray-400">{metric.label}</p>
                </div>
                <p className="text-3xl font-black text-white">{metric.value}</p>
              </motion.div>
            ))}
          </div>

          {/* Tabs with Visible Backgrounds */}
          <div className="space-y-8">
            <Tabs defaultValue="partners" className="w-full">
              <TabsList className="grid w-full grid-cols-3 mb-8 bg-white/5 p-1 rounded-xl border border-white/10">
                <TabsTrigger 
                  value="partners" 
                  className="data-[state=active]:bg-emerald-600 data-[state=active]:text-white data-[state=inactive]:bg-slate-900/50 data-[state=inactive]:text-gray-400 rounded-lg font-black uppercase text-xs"
                >
                  <Users className="w-4 h-4 mr-2" />
                  Partners
                </TabsTrigger>
                <TabsTrigger 
                  value="seolanding" 
                  className="data-[state=active]:bg-blue-600 data-[state=active]:text-white data-[state=inactive]:bg-slate-900/50 data-[state=inactive]:text-gray-400 rounded-lg font-black uppercase text-xs"
                >
                  <Eye className="w-4 h-4 mr-2" />
                  SEO Pages
                </TabsTrigger>
                <TabsTrigger 
                  value="settings" 
                  className="data-[state=active]:bg-purple-600 data-[state=active]:text-white data-[state=inactive]:bg-slate-900/50 data-[state=inactive]:text-gray-400 rounded-lg font-black uppercase text-xs"
                >
                  <Settings className="w-4 h-4 mr-2" />
                  Settings
                </TabsTrigger>
              </TabsList>

              {/* Partners Tab */}
              <TabsContent value="partners" className="space-y-6">
                <Card className="bg-white/5 border-emerald-500/30 p-6">
                  <h2 className="text-2xl font-black uppercase mb-6">Active Partners</h2>
                  <div className="space-y-4">
                    {partners.map((partner, i) => (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.1 }}
                        viewport={{ once: true }}
                        className="bg-emerald-950/30 border border-emerald-500/30 rounded-xl p-6"
                      >
                        <div className="grid grid-cols-1 md:grid-cols-6 gap-4 items-center mb-4">
                          <div>
                            <h3 className="font-black text-white text-lg">{partner.name}</h3>
                            <code className="text-xs text-gray-500 font-mono">?ref={partner.ref}</code>
                          </div>
                          <div className="text-center">
                            <p className="text-gray-400 text-xs uppercase font-bold">Agents</p>
                            <p className="text-2xl font-black text-emerald-400">{partner.agents}</p>
                          </div>
                          <div className="text-center">
                            <p className="text-gray-400 text-xs uppercase font-bold">Clicks</p>
                            <p className="text-2xl font-black text-blue-400">{partner.clicks}</p>
                          </div>
                          <div className="text-center">
                            <p className="text-gray-400 text-xs uppercase font-bold">Conversions</p>
                            <p className="text-2xl font-black text-emerald-400">{partner.conversions}</p>
                          </div>
                          <div className="text-center">
                            <p className="text-gray-400 text-xs uppercase font-bold">Revenue</p>
                            <p className="text-2xl font-black text-yellow-400">AED {partner.revenue}</p>
                          </div>
                          <div className="text-center">
                            <p className="text-gray-400 text-xs uppercase font-bold">Commission (20%)</p>
                            <p className="text-2xl font-black text-green-400">AED {partner.commission}</p>
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <Button
                            size="sm"
                            variant="outline"
                            className="border-emerald-500/50 text-emerald-400 hover:bg-emerald-500/20"
                            onClick={() => copyLink(`https://deliwer.com/start?ref=${partner.ref}`, `partner-${partner.ref}`)}
                          >
                            {copied === `partner-${partner.ref}` ? <Check className="w-4 h-4 mr-2" /> : <Copy className="w-4 h-4 mr-2" />}
                            Copy Link
                          </Button>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </Card>
              </TabsContent>

              {/* SEO Pages Tab */}
              <TabsContent value="seolanding" className="space-y-6">
                <Card className="bg-white/5 border-blue-500/30 p-6">
                  <h2 className="text-2xl font-black uppercase mb-6">SEO Landing Page Performance</h2>
                  <div className="space-y-4">
                    {seoPagesStats.map((page, i) => (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.1 }}
                        viewport={{ once: true }}
                        className="bg-blue-950/30 border border-blue-500/30 rounded-xl p-6"
                      >
                        <div className="grid grid-cols-1 md:grid-cols-5 gap-4 items-center mb-4">
                          <div>
                            <h3 className="font-black text-white text-lg">{page.page}</h3>
                            <p className="text-gray-400 text-xs mt-1">SEO Layer 4: Gateway Growth</p>
                          </div>
                          <div className="text-center">
                            <p className="text-gray-400 text-xs uppercase font-bold">Visits</p>
                            <p className="text-2xl font-black text-blue-400">{page.visits.toLocaleString()}</p>
                          </div>
                          <div className="text-center">
                            <p className="text-gray-400 text-xs uppercase font-bold">Conversions</p>
                            <p className="text-2xl font-black text-emerald-400">{page.conversions}</p>
                          </div>
                          <div className="text-center">
                            <p className="text-gray-400 text-xs uppercase font-bold">Rate</p>
                            <p className="text-2xl font-black text-yellow-400">{page.rate}</p>
                          </div>
                          <div className="text-center">
                            <p className="text-gray-400 text-xs uppercase font-bold">Revenue</p>
                            <p className="text-2xl font-black text-green-400">AED {(page.conversions * 399).toLocaleString()}</p>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </Card>
              </TabsContent>

              {/* Settings Tab */}
              <TabsContent value="settings" className="space-y-6">
                <Card className="bg-white/5 border-purple-500/30 p-6">
                  <h2 className="text-2xl font-black uppercase mb-6">System Settings</h2>
                  <div className="space-y-6">
                    <div className="bg-purple-950/30 border border-purple-500/30 rounded-xl p-6">
                      <h3 className="font-black text-white mb-4">Commission Rate</h3>
                      <div className="flex items-center gap-4">
                        <Input 
                          type="number" 
                          defaultValue="20" 
                          className="bg-slate-950 border-white/20 text-white w-24"
                          data-testid="input-commission-rate"
                        />
                        <span className="text-gray-400">% per conversion</span>
                      </div>
                    </div>

                    <div className="bg-purple-950/30 border border-purple-500/30 rounded-xl p-6">
                      <h3 className="font-black text-white mb-4">Service Price</h3>
                      <div className="flex items-center gap-4">
                        <span className="text-gray-400">AED</span>
                        <Input 
                          type="number" 
                          defaultValue="399" 
                          className="bg-slate-950 border-white/20 text-white w-24"
                          data-testid="input-service-price"
                        />
                      </div>
                    </div>

                    <div className="bg-purple-950/30 border border-purple-500/30 rounded-xl p-6">
                      <h3 className="font-black text-white mb-4">Partner Portal URL</h3>
                      <Input 
                        readOnly
                        value="https://deliwer.com/partners"
                        className="bg-slate-950 border-white/20 text-gray-400 cursor-not-allowed"
                      />
                    </div>

                    <div className="bg-purple-950/30 border border-purple-500/30 rounded-xl p-6">
                      <h3 className="font-black text-white mb-4">API Endpoint (Coming Soon)</h3>
                      <Input 
                        readOnly
                        value="POST /api/log-lead"
                        className="bg-slate-950 border-white/20 text-gray-400 cursor-not-allowed"
                      />
                      <p className="text-xs text-gray-500 mt-2">Logs conversions to Google Sheets ledger</p>
                    </div>

                    <Button className="w-full bg-purple-600 hover:bg-purple-500 font-black rounded-xl h-12">
                      Save Settings
                    </Button>
                  </div>
                </Card>
              </TabsContent>
            </Tabs>
          </div>

          {/* Quick Actions */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-6"
          >
            <Card className="bg-gradient-to-br from-emerald-500/10 to-transparent border-emerald-500/30 p-6">
              <h3 className="font-black text-white mb-4 flex items-center gap-2">
                <MessageSquare className="w-5 h-5 text-emerald-500" />
                WhatsApp Conversion Link
              </h3>
              <Input 
                readOnly
                value="https://wa.me/971523946311"
                className="bg-slate-950 border-white/20 text-gray-300 text-sm mb-3"
              />
              <Button
                size="sm"
                className="w-full bg-emerald-600 hover:bg-emerald-500"
                onClick={() => copyLink("https://wa.me/971523946311", "whatsapp")}
              >
                {copied === "whatsapp" ? <Check className="w-4 h-4 mr-2" /> : <Copy className="w-4 h-4 mr-2" />}
                Copy WhatsApp Number
              </Button>
            </Card>

            <Card className="bg-gradient-to-br from-blue-500/10 to-transparent border-blue-500/30 p-6">
              <h3 className="font-black text-white mb-4 flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-blue-500" />
                Base Referral Link
              </h3>
              <Input 
                readOnly
                value="https://deliwer.com/start"
                className="bg-slate-950 border-white/20 text-gray-300 text-sm mb-3"
              />
              <Button
                size="sm"
                className="w-full bg-blue-600 hover:bg-blue-500"
                onClick={() => copyLink("https://deliwer.com/start", "base")}
              >
                {copied === "base" ? <Check className="w-4 h-4 mr-2" /> : <Copy className="w-4 h-4 mr-2" />}
                Copy Base Link
              </Button>
            </Card>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
