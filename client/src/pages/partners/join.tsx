import { useState } from "react";
import { Navigation } from "@/components/navigation";
import { PartnerSubNav } from "@/components/partner-subnav";
import { SEOMeta } from "@/components/seo-meta";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { CheckCircle2, Copy, Check, ArrowRight, Users } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Link } from "wouter";
import { motion } from "framer-motion";

const PARTNER_TYPES = [
  "Real Estate Agent",
  "Relocation Company",
  "Property Manager",
  "Influencer / Content Creator",
  "Corporate HR Team",
  "Building Concierge",
  "Community Leader",
  "Other",
];

export default function PartnersJoin() {
  const { toast } = useToast();
  const [submitted, setSubmitted] = useState(false);
  const [refLink, setRefLink] = useState("");
  const [copied, setCopied] = useState(false);
  const [form, setForm] = useState({
    fullName: "",
    companyName: "",
    partnerType: "",
    email: "",
    phone: "",
    website: "",
  });

  const handleChange = (field: string, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const generateRef = (name: string) =>
    name.toLowerCase().replace(/[^a-z0-9]/g, "").slice(0, 20);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.fullName || !form.email || !form.partnerType) {
      toast({ title: "Please fill in required fields", variant: "destructive" });
      return;
    }
    const ref = generateRef(form.companyName || form.fullName);
    const link = `https://deliwer.com/?ref=${ref}`;
    setRefLink(link);

    // Track via affiliate endpoint
    try {
      await fetch("/api/affiliate/track", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          affiliateCode: ref,
          event: "partner_signup",
          ...form,
        }),
      });
    } catch {}

    // Also notify via WhatsApp
    const waText = `New partner signup:\nName: ${form.fullName}\nCompany: ${form.companyName}\nType: ${form.partnerType}\nEmail: ${form.email}\nPhone: ${form.phone}\nWebsite: ${form.website}\nRef Code: ${ref}`;
    console.log("[Partner Signup]", form, ref);

    setSubmitted(true);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(refLink);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
    toast({ title: "Referral link copied!", description: "Share it with your clients to start earning." });
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white font-sans">
      <SEOMeta
        title="Join DeliWer Partner Program | Earn from Move-In Referrals"
        description="Sign up as a DeliWer partner and earn commission from every move-in referral. Real estate agents, relocation companies, and influencers welcome."
      />
      <Navigation />
      <PartnerSubNav />

      <section className="py-16 px-4 max-w-2xl mx-auto">
        {!submitted ? (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-8">
            <div className="text-center space-y-3">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-500/10 border border-emerald-500/20 rounded-full text-emerald-400 text-xs font-black uppercase tracking-widest">
                <Users className="w-3.5 h-3.5" /> Partner Application
              </div>
              <h1 className="text-3xl md:text-5xl font-black uppercase tracking-tighter text-white">Become a Partner</h1>
              <p className="text-gray-400 font-medium leading-relaxed">
                Fill in your details and we'll generate your unique referral link instantly. Start earning from the first tenant you refer.
              </p>
            </div>

            <Card className="bg-white/5 border-white/10 rounded-2xl">
              <CardContent className="p-8">
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <Label className="text-xs font-black uppercase text-emerald-400 tracking-widest">Full Name *</Label>
                      <Input
                        data-testid="input-full-name"
                        placeholder="e.g. Sarah Al Maktoum"
                        value={form.fullName}
                        onChange={(e) => handleChange("fullName", e.target.value)}
                        className="bg-slate-900 border-white/15 text-white placeholder:text-gray-600 h-11"
                        required
                      />
                    </div>
                    <div className="space-y-1.5">
                      <Label className="text-xs font-black uppercase text-emerald-400 tracking-widest">Company Name</Label>
                      <Input
                        data-testid="input-company-name"
                        placeholder="e.g. DeBacci Capital"
                        value={form.companyName}
                        onChange={(e) => handleChange("companyName", e.target.value)}
                        className="bg-slate-900 border-white/15 text-white placeholder:text-gray-600 h-11"
                      />
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <Label className="text-xs font-black uppercase text-emerald-400 tracking-widest">Partner Type *</Label>
                    <Select value={form.partnerType} onValueChange={(v) => handleChange("partnerType", v)}>
                      <SelectTrigger className="bg-slate-900 border-white/15 text-white h-11" data-testid="select-partner-type">
                        <SelectValue placeholder="Select your role" />
                      </SelectTrigger>
                      <SelectContent className="bg-slate-900 border-white/15 text-white">
                        {PARTNER_TYPES.map((t) => (
                          <SelectItem key={t} value={t} className="text-white">{t}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <Label className="text-xs font-black uppercase text-emerald-400 tracking-widest">Email *</Label>
                      <Input
                        data-testid="input-email"
                        type="email"
                        placeholder="you@example.com"
                        value={form.email}
                        onChange={(e) => handleChange("email", e.target.value)}
                        className="bg-slate-900 border-white/15 text-white placeholder:text-gray-600 h-11"
                        required
                      />
                    </div>
                    <div className="space-y-1.5">
                      <Label className="text-xs font-black uppercase text-emerald-400 tracking-widest">Phone</Label>
                      <Input
                        data-testid="input-phone"
                        placeholder="+971 50 000 0000"
                        value={form.phone}
                        onChange={(e) => handleChange("phone", e.target.value)}
                        className="bg-slate-900 border-white/15 text-white placeholder:text-gray-600 h-11"
                      />
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <Label className="text-xs font-black uppercase text-emerald-400 tracking-widest">Website or Social Media</Label>
                    <Input
                      data-testid="input-website"
                      placeholder="https://yoursite.com or @yourhandle"
                      value={form.website}
                      onChange={(e) => handleChange("website", e.target.value)}
                      className="bg-slate-900 border-white/15 text-white placeholder:text-gray-600 h-11"
                    />
                  </div>

                  <Button
                    type="submit"
                    data-testid="button-submit-partner"
                    size="lg"
                    className="w-full h-13 bg-emerald-600 hover:bg-emerald-500 text-white font-black uppercase tracking-widest rounded-xl shadow-xl shadow-emerald-500/20 text-sm"
                  >
                    Generate My Referral Link <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                  <p className="text-center text-[10px] text-gray-600 font-bold uppercase tracking-widest">
                    No fees · No minimum referrals · Monthly payouts
                  </p>
                </form>
              </CardContent>
            </Card>
          </motion.div>
        ) : (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-8 text-center">
            <div className="space-y-4">
              <div className="w-16 h-16 rounded-full bg-emerald-500 flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-8 h-8 text-slate-950" />
              </div>
              <h2 className="text-3xl font-black uppercase tracking-tighter text-white">Welcome to the Partner Network!</h2>
              <p className="text-gray-400 font-medium max-w-md mx-auto leading-relaxed">
                Your referral link is ready. Share it with clients moving to Dubai — when they book, you earn.
              </p>
            </div>

            <Card className="bg-emerald-950/40 border-emerald-500/30 rounded-2xl">
              <CardContent className="p-8 space-y-5">
                <div className="space-y-2">
                  <p className="text-[10px] text-gray-500 font-black uppercase tracking-widest">Your Referral Link</p>
                  <div className="flex items-center gap-3 bg-slate-900 border border-white/10 rounded-xl p-4">
                    <code className="flex-1 text-emerald-300 text-sm font-mono break-all text-left" data-testid="text-generated-link">{refLink}</code>
                    <Button
                      onClick={handleCopy}
                      size="sm"
                      className="bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg shrink-0"
                      data-testid="button-copy-generated-link"
                    >
                      {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                    </Button>
                  </div>
                </div>

                <div className="space-y-3 text-left">
                  <p className="text-[10px] text-gray-500 font-black uppercase tracking-widest">How to Use It</p>
                  {[
                    "Share the link with tenants moving into Dubai apartments",
                    "When they click and book, your referral code is tracked automatically",
                    "DeliWer coordinates their entire move-in at no extra cost to them",
                    "You receive your commission payment monthly",
                  ].map((tip, i) => (
                    <div key={i} className="flex items-start gap-2 text-sm text-gray-300 font-medium">
                      <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                      {tip}
                    </div>
                  ))}
                </div>

                <div className="pt-2 flex flex-col sm:flex-row gap-3">
                  <a
                    href={`https://wa.me/?text=${encodeURIComponent(`Moving into Dubai? DeliWer coordinates movers, Ejari, DEWA setup and more. It doesn't cost extra — they simply organize everything for you. Book here: ${refLink}`)}`}
                    target="_blank" rel="noreferrer"
                    className="flex-1"
                  >
                    <Button className="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-black rounded-xl h-11 text-xs uppercase tracking-widest" data-testid="button-share-whatsapp">
                      Share on WhatsApp
                    </Button>
                  </a>
                  <Link href="/partners/resources" className="flex-1">
                    <Button variant="outline" className="w-full border-white/15 text-gray-300 hover:bg-white/5 rounded-xl h-11 text-xs font-black uppercase tracking-widest">
                      Get Message Templates
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )}
      </section>
    </div>
  );
}
