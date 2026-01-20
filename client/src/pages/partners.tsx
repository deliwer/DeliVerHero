import { useState } from "react";
import { SEOMeta } from "@/components/seo-meta";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Handshake, 
  Users, 
  Globe, 
  CheckCircle, 
  MessageSquare,
  ShieldCheck,
  Zap,
  Building,
  ArrowRight,
  Target,
  Heart
} from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { insertLeadSchema, type InsertLead } from "@shared/schema";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";

export default function PartnersPage() {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<InsertLead>({
    resolver: zodResolver(insertLeadSchema),
    defaultValues: {
      type: "partner_primary",
      name: "",
      email: "",
      phone: "",
      company: "",
      interest: "community",
      message: "",
    },
  });

  async function onSubmit(data: InsertLead) {
    setIsSubmitting(true);
    try {
      await apiRequest("POST", "/api/leads", data);
      toast({
        title: "Partnership Request Received",
        description: "A partnership coordinator will reach out to you privately via WhatsApp.",
      });
      form.reset();
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Request Failed",
        description: "Please try again or contact us via WhatsApp.",
      });
    } finally {
      setIsSubmitting(false);
    }
  }

  const handleWhatsApp = () => {
    window.open('https://wa.me/971523946311?text=I%20am%20interested%20in%20becoming%20a%20Community%20Referral%20Partner', '_blank');
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <SEOMeta 
        title="Community-Led Partnerships | DeliWer Dubai"
        description="Partner with DeliWer to support your community members with discreet, concierge-grade exit services. Ideal for founders, investors, and professional networks."
      />

      {/* Hero Section */}
      <section className="relative py-24 px-4 overflow-hidden border-b border-white/5">
        <div className="absolute inset-0 bg-gradient-to-b from-blue-600/10 to-transparent pointer-events-none" />
        <div className="max-w-6xl mx-auto text-center relative z-10">
          <Badge className="mb-6 bg-blue-500/10 text-blue-400 border-blue-500/20 px-4 py-1">
            COMMUNITY-LED PARTNERSHIPS
          </Badge>
          <h1 className="text-5xl md:text-7xl font-black uppercase tracking-tighter mb-6">
            Partner With DeliWer
          </h1>
          <h2 className="text-2xl md:text-3xl font-bold text-blue-500 mb-8 uppercase tracking-tight">
            Where Trusted Communities Enable Seamless Dubai Exits
          </h2>
          <p className="text-xl md:text-2xl text-gray-400 max-w-3xl mx-auto mb-10 leading-relaxed">
            DeliWer partners with <strong>founder, investor, and professional communities</strong> to support members relocating out of Dubai through a discreet, concierge-grade Exit service.
          </p>
          <div className="flex flex-col items-center gap-4">
            <Button size="lg" className="bg-emerald-600 hover:bg-emerald-500 text-white font-black rounded-full px-12 h-16 text-lg shadow-xl" onClick={handleWhatsApp}>
              <MessageSquare className="w-6 h-6 mr-2" />
              Become a Community Referral Partner
            </Button>
            <p className="text-sm text-gray-500 italic">
              *For private communities and curated networks only.
            </p>
          </div>
        </div>
      </section>

      {/* Section 1 — PARTNERSHIP PHILOSOPHY */}
      <section className="py-24 px-4 border-b border-white/5 bg-slate-900/50">
        <div className="max-w-4xl mx-auto">
          <div className="flex flex-col items-center text-center mb-12">
            <ShieldCheck className="w-16 h-16 text-emerald-500 mb-6" />
            <h2 className="text-3xl md:text-5xl font-black uppercase tracking-tighter mb-6">
              Not Affiliates. Not Brokers.<br />
              <span className="text-emerald-500">Trusted Referral Partners.</span>
            </h2>
            <div className="space-y-6 text-xl text-gray-300 leading-relaxed">
              <p>
                DeliWer does not operate as a marketplace, broker network, or mass affiliate program.
              </p>
              <p>
                Instead, we collaborate with <strong>curated communities</strong> whose members value trust, speed, confidential handling, and zero administrative friction.
              </p>
              <p>
                Our partners act as <strong>referral nodes</strong>, introducing members to DeliWer when a Dubai exit becomes time-critical. All execution, coordination, and client handling remains with <strong>DeliWer</strong>.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 2 — WHO THIS PARTNERSHIP IS FOR */}
      <section className="py-24 px-4 bg-white/[0.02]">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-5xl font-black uppercase tracking-tighter mb-16 text-center">
            Ideal Partner Communities
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { title: "Founder & Investor Communities", icon: Users },
              { title: "Family Offices & Private Networks", icon: Building },
              { title: "Professional & Executive Groups", icon: Briefcase },
              { title: "Expat Leadership Circles", icon: Globe },
              { title: "HR & Global Mobility Networks", icon: Target }
            ].map((item, i) => (
              <Card key={i} className="bg-white/5 border-white/10 rounded-[2rem] hover-elevate transition-all">
                <CardHeader className="p-8">
                  <item.icon className="w-12 h-12 text-blue-500 mb-4" />
                  <CardTitle className="text-xl font-bold uppercase text-white">{item.title}</CardTitle>
                </CardHeader>
              </Card>
            ))}
          </div>
          <p className="text-center mt-12 text-xl text-gray-400">
            If your community includes people <strong>relocating internationally</strong>, this partnership creates immediate value.
          </p>
        </div>
      </section>

      {/* SECTION 3 & 4 — ROLES & RESPONSIBILITIES */}
      <section className="py-24 px-4 border-y border-white/5">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-16">
          <div>
            <h2 className="text-3xl font-black uppercase tracking-tighter mb-8 text-emerald-500 underline decoration-emerald-500/30 decoration-8 underline-offset-8">
              Your Role as a Partner
            </h2>
            <ul className="space-y-6">
              {[
                "Privately share a DeliWer Exit Concierge link",
                "Refer members who are exiting Dubai",
                "Do NOT manage clients or operations",
                "Do NOT carry liability or execution risk"
              ].map((item, i) => (
                <li key={i} className="flex items-center gap-4 text-xl text-gray-300">
                  <div className="w-8 h-8 rounded-full bg-emerald-500/20 flex items-center justify-center shrink-0">
                    <CheckCircle className="w-5 h-5 text-emerald-500" />
                  </div>
                  {item}
                </li>
              ))}
            </ul>
            <p className="mt-8 text-lg text-gray-500 italic">No onboarding of vendors. No service delivery. No follow-ups required.</p>
          </div>
          <div>
            <h2 className="text-3xl font-black uppercase tracking-tighter mb-8 text-blue-500 underline decoration-blue-500/30 decoration-8 underline-offset-8">
              What DeliWer Handles
            </h2>
            <ul className="space-y-4">
              {[
                "Exit Concierge coordination",
                "Deposit recovery & tenancy handover",
                "DEWA & utility closures",
                "Final bill settlements",
                "International relocation introductions",
                "Client communication & execution"
              ].map((item, i) => (
                <li key={i} className="flex items-center gap-4 text-xl text-gray-300">
                  <div className="w-8 h-8 rounded-full bg-blue-500/20 flex items-center justify-center shrink-0">
                    <Zap className="w-5 h-5 text-blue-500" />
                  </div>
                  {item}
                </li>
              ))}
            </ul>
            <p className="mt-8 text-lg text-blue-400 font-bold uppercase tracking-widest">Single Accountable Journey</p>
          </div>
        </div>
      </section>

      {/* SECTION 5 — WHY IT WORKS */}
      <section className="py-24 px-4 bg-slate-900/50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-5xl font-black uppercase tracking-tighter mb-16 text-center">
            Why This Model Works
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-6">
            {[
              { title: "High Urgency", desc: "Fast decisions for time-critical moves" },
              { title: "Concierge Quality", desc: "Protects your community reputation" },
              { title: "Transparent Tracking", desc: "Clear attribution for every referral" },
              { title: "Revenue Participation", desc: "Aligned incentives for your network" },
              { title: "Zero Overhead", desc: "No operational drag for your team" }
            ].map((item, i) => (
              <div key={i} className="p-6 bg-white/5 rounded-2xl border border-white/10 flex flex-col items-center text-center">
                <h4 className="font-bold text-white uppercase text-sm mb-3 text-blue-400">{item.title}</h4>
                <p className="text-gray-400 text-xs leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 6 — EXAMPLE */}
      <section className="py-24 px-4 border-b border-white/5 bg-emerald-600/5">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-2xl font-black uppercase tracking-tighter mb-8 text-gray-400">Example Community Partner</h2>
          <Card className="bg-slate-900/80 border-white/10 p-10 rounded-[2.5rem] shadow-2xl">
            <h3 className="text-3xl font-black text-white mb-4 uppercase tracking-tighter italic">Debacci Noble Family Community</h3>
            <p className="text-xl text-gray-400 leading-relaxed italic">
              "Founder and investor networks supporting members relocating globally."
            </p>
            <div className="mt-8 pt-8 border-t border-white/5">
              <p className="text-sm text-gray-500">Additional community partnerships are onboarded privately.</p>
            </div>
          </Card>
        </div>
      </section>

      {/* SECTION 7 — INTRODUCTIONS */}
      <section className="py-24 px-4 bg-white/[0.02]">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl md:text-5xl font-black uppercase tracking-tighter mb-12">
            Simple, Private Introductions
          </h2>
          <div className="space-y-8 text-xl text-gray-300">
            <p>Community partners typically share a single DeliWer exit link in trusted groups or introduce DeliWer directly to members in need.</p>
            <div className="flex flex-wrap justify-center gap-6 font-bold text-emerald-400 uppercase tracking-widest text-sm">
              <span>No Promotional Noise</span>
              <span>No Public Selling</span>
              <span>Just Relevant Help</span>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 8 — CTA */}
      <section id="apply-section" className="py-24 px-4 bg-blue-600/5">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tighter mb-4 text-white">Become a Community Referral Partner</h2>
            <p className="text-xl text-blue-400">Request private partnership access below.</p>
          </div>

          <Card className="bg-slate-900 border-white/10 p-8 md:p-12 rounded-[2.5rem]">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-gray-400 uppercase tracking-widest text-xs font-black">Full Name</FormLabel>
                        <FormControl>
                          <Input {...field} className="bg-white/5 border-white/10 h-14 text-white rounded-xl" placeholder="John Doe" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-gray-400 uppercase tracking-widest text-xs font-black">Email Address</FormLabel>
                        <FormControl>
                          <Input {...field} className="bg-white/5 border-white/10 h-14 text-white rounded-xl" placeholder="john@company.com" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <FormField
                    control={form.control}
                    name="phone"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-gray-400 uppercase tracking-widest text-xs font-black">Phone / WhatsApp</FormLabel>
                        <FormControl>
                          <Input {...field} className="bg-white/5 border-white/10 h-14 text-white rounded-xl" placeholder="+971 50 000 0000" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="company"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-gray-400 uppercase tracking-widest text-xs font-black">Community / Organization</FormLabel>
                        <FormControl>
                          <Input {...field} value={field.value ?? ""} className="bg-white/5 border-white/10 h-14 text-white rounded-xl" placeholder="e.g. Founders Network" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <FormField
                  control={form.control}
                  name="interest"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-gray-400 uppercase tracking-widest text-xs font-black">Community Type</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value ?? ""}>
                        <FormControl>
                          <SelectTrigger className="bg-white/5 border-white/10 h-14 text-white rounded-xl">
                            <SelectValue placeholder="Select community type" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent className="bg-slate-900 border-white/10 text-white">
                          <SelectItem value="founder_investor">Founder & Investor Network</SelectItem>
                          <SelectItem value="professional_group">Professional/Executive Group</SelectItem>
                          <SelectItem value="family_office">Family Office / Private Network</SelectItem>
                          <SelectItem value="other">Other Curated Community</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="message"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-gray-400 uppercase tracking-widest text-xs font-black">Community Overview</FormLabel>
                      <FormControl>
                        <Textarea {...field} value={field.value ?? ""} className="bg-white/5 border-white/10 min-h-[120px] text-white rounded-xl" placeholder="Briefly describe your members and network scale..." />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <Button 
                  type="submit" 
                  className="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-black h-16 rounded-xl text-lg uppercase tracking-widest transition-all"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Sending Request..." : "Request Partnership Access"}
                </Button>
                <p className="text-center text-xs text-gray-500 mt-4 italic">
                  Partnerships are reviewed to ensure alignment, confidentiality, and service standards.
                </p>
              </form>
            </Form>
          </Card>
        </div>
      </section>

      {/* Footer Note */}
      <footer className="py-12 px-4 border-t border-white/5 text-center bg-slate-950">
        <p className="text-gray-500 max-w-2xl mx-auto italic">
          DeliWer is a UAE-based coordination platform focused on relocation, exit, and settlement journeys — delivered through trusted partners and communities.
        </p>
      </footer>

      {/* Sticky WhatsApp */}
      <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-3">
        <Button 
          className="bg-emerald-600 hover:bg-emerald-500 text-white rounded-full h-16 w-16 p-0 shadow-2xl animate-bounce"
          onClick={handleWhatsApp}
        >
          <MessageSquare className="w-8 h-8" />
        </Button>
      </div>
    </div>
  );
}
