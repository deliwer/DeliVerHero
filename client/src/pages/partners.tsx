import { useState } from "react";
import { SEOMeta } from "@/components/seo-meta";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Link } from "wouter";
import { 
  Handshake, 
  Truck, 
  Users, 
  Settings, 
  Globe, 
  Briefcase, 
  CheckCircle, 
  MessageSquare,
  ArrowRight,
  ShieldCheck,
  Zap,
  Building,
  Rocket
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
      interest: "logistics",
      message: "",
    },
  });

  async function onSubmit(data: InsertLead) {
    setIsSubmitting(true);
    try {
      await apiRequest("POST", "/api/leads", data);
      toast({
        title: "Application Submitted",
        description: "One of our partner coordinators will reach out via WhatsApp shortly.",
      });
      form.reset();
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Submission Failed",
        description: "Please try again or contact us via WhatsApp.",
      });
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <SEOMeta 
        title="Become a Relocation Partner | DeliWer Dubai"
        description="Join Dubai's most advanced relocation orchestration network. We own the demand and client lifecycle, you execute excellence. Partnerships for logistics, HR, and home services."
      />

      {/* Hero Section */}
      <section className="relative py-24 px-4 overflow-hidden border-b border-white/5">
        <div className="absolute inset-0 bg-gradient-to-b from-blue-600/10 to-transparent pointer-events-none" />
        <div className="max-w-6xl mx-auto text-center relative z-10">
          <Badge className="mb-6 bg-blue-500/10 text-blue-400 border-blue-500/20 px-4 py-1">
            B2B PARTNERSHIP PROGRAM
          </Badge>
          <h1 className="text-5xl md:text-7xl font-black uppercase tracking-tighter mb-6">
            DeliWer Owns Demand.<br />
            <span className="text-blue-500">Partners Execute Excellence.</span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-400 max-w-3xl mx-auto mb-10 leading-relaxed">
            We manage the client lifecycle. You provide the muscle. 
            Join the ecosystem orchestrating relocation for international talent and corporate HR.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button size="lg" className="bg-blue-600 hover:bg-blue-500 text-white font-black rounded-full px-12 h-16 text-lg shadow-xl" onClick={() => document.getElementById('apply-section')?.scrollIntoView({ behavior: 'smooth' })}>
              Apply to Partner
            </Button>
            <Button size="lg" variant="outline" className="border-white/10 text-white hover:bg-white/5 rounded-full px-12 h-16 text-lg" onClick={() => window.open('https://wa.me/971523946311', '_blank')}>
              WhatsApp Inquiry
            </Button>
          </div>
          
          
        </div>
      </section>

      {/* Primary Focus: Relocation & Logistics */}
      <section className="py-24 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="mb-16">
            <h2 className="text-3xl md:text-5xl font-black uppercase tracking-tighter mb-4">Relocation & Logistics</h2>
            <p className="text-xl text-blue-400 font-medium">Our Primary Partnership Focus</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="bg-white/5 border-white/10 rounded-[2.5rem] overflow-hidden hover-elevate transition-all">
              <CardHeader className="p-8">
                <Truck className="w-12 h-12 text-blue-500 mb-4" />
                <CardTitle className="text-2xl font-black uppercase text-white">International Movers</CardTitle>
                <CardDescription className="text-gray-400 text-lg">
                  Freight forwarders and international moving companies for global relocation.
                </CardDescription>
              </CardHeader>
              <CardContent className="p-8 pt-0">
                <ul className="space-y-4 text-gray-400 font-medium">
                  <li className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-blue-500 shrink-0" />
                    Customs Compliance Support
                  </li>
                  <li className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-blue-500 shrink-0" />
                    Door-to-Door Coordination
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card className="bg-white/5 border-white/10 rounded-[2.5rem] overflow-hidden hover-elevate transition-all">
              <CardHeader className="p-8">
                <Building className="w-12 h-12 text-emerald-500 mb-4" />
                <CardTitle className="text-2xl font-black uppercase text-white">Corporate HR</CardTitle>
                <CardDescription className="text-gray-400 text-lg">
                  HR managers and recruitment firms relocating employees to Dubai.
                </CardDescription>
              </CardHeader>
              <CardContent className="p-8 pt-0">
                <ul className="space-y-4 text-gray-400 font-medium">
                  <li className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-emerald-500 shrink-0" />
                    Seamless Employee Onboarding
                  </li>
                  <li className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-emerald-500 shrink-0" />
                    Lifecycle Support for Talent
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card className="bg-white/5 border-white/10 rounded-[2.5rem] overflow-hidden hover-elevate transition-all">
              <CardHeader className="p-8">
                <Users className="w-12 h-12 text-purple-500 mb-4" />
                <CardTitle className="text-2xl font-black uppercase text-white">Destination Services</CardTitle>
                <CardDescription className="text-gray-400 text-lg">
                  Local experts handling visas, school search, and home finding.
                </CardDescription>
              </CardHeader>
              <CardContent className="p-8 pt-0">
                <ul className="space-y-4 text-gray-400 font-medium">
                  <li className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-purple-500 shrink-0" />
                    Local Compliance Expertise
                  </li>
                  <li className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-purple-500 shrink-0" />
                    Exclusive Client Referrals
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Secondary Partnerships */}
      <section className="py-24 px-4 bg-white/[0.02]">
        <div className="max-w-6xl mx-auto">
          <div className="mb-16">
            <h2 className="text-3xl font-black uppercase tracking-tighter mb-4 text-gray-400">Secondary Partnerships</h2>
            <p className="text-lg text-gray-500 font-medium">Home Services, Lifestyle & Tech Support</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 opacity-80 hover:opacity-100 transition-opacity">
            {['Home Cleaning', 'Maintenance', 'Pet Relocation', 'Tech Setup'].map((item) => (
              <div key={item} className="bg-white/5 border border-white/10 p-6 rounded-2xl hover-elevate">
                <h3 className="text-xl font-bold uppercase mb-2 text-white">{item}</h3>
                <p className="text-sm text-gray-500">Integrated into the move-in lifecycle.</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How it Works */}
      <section className="py-24 px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-5xl font-black uppercase tracking-tighter mb-16 text-center underline decoration-blue-500 decoration-8 underline-offset-8">The Partner Journey</h2>
          <div className="space-y-12 relative">
            <div className="absolute left-8 top-0 bottom-0 w-1 bg-white/5 hidden md:block" />
            
            {[
              { title: "Join Network", desc: "Submit application and verify credentials.", icon: Globe },
              { title: "Define Scope", desc: "We align your execution capabilities with our client demand.", icon: Settings },
              { title: "Pilot Project", desc: "Execute your first project under DeliWer orchestration.", icon: Zap },
              { title: "Scale Excellence", desc: "Unlock recurring revenue through our client lifecycle.", icon: Rocket }
            ].map((step, idx) => ( step.icon &&
              <div key={idx} className="flex flex-col md:flex-row gap-8 items-start relative z-10">
                <div className="w-16 h-16 rounded-2xl bg-slate-900 border border-white/10 flex items-center justify-center text-blue-500 shrink-0 shadow-2xl">
                  <step.icon className="w-8 h-8" />
                </div>
                <div>
                  <h3 className="text-2xl font-black uppercase mb-2 text-white">{step.title}</h3>
                  <p className="text-lg text-gray-400 leading-relaxed">{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Application Form */}
      <section id="apply-section" className="py-24 px-4 bg-blue-600/5">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-black uppercase tracking-tighter mb-4 text-white">Apply for Partnership</h2>
            <p className="text-xl text-blue-400">Join the relocation ecosystem in Dubai.</p>
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
                        <FormLabel className="text-gray-400 uppercase tracking-widest text-xs font-black">Company Name</FormLabel>
                        <FormControl>
                          <Input {...field} value={field.value ?? ""} className="bg-white/5 border-white/10 h-14 text-white rounded-xl" placeholder="Logistics Co." />
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
                      <FormLabel className="text-gray-400 uppercase tracking-widest text-xs font-black">Primary Service Focus</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value ?? ""}>
                        <FormControl>
                          <SelectTrigger className="bg-white/5 border-white/10 h-14 text-white rounded-xl">
                            <SelectValue placeholder="Select service" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent className="bg-slate-900 border-white/10 text-white">
                          <SelectItem value="logistics">Relocation & Logistics</SelectItem>
                          <SelectItem value="hr">Corporate HR Partnership</SelectItem>
                          <SelectItem value="home_services">Secondary Home Services</SelectItem>
                          <SelectItem value="tech">Tech & Concierge Support</SelectItem>
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
                      <FormLabel className="text-gray-400 uppercase tracking-widest text-xs font-black">Operational Scope / Benefits</FormLabel>
                      <FormControl>
                        <Textarea {...field} value={field.value ?? ""} className="bg-white/5 border-white/10 min-h-[150px] text-white rounded-xl" placeholder="Tell us about your fleet, expertise, or corporate requirements..." />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <Button 
                  type="submit" 
                  className="w-full bg-blue-600 hover:bg-blue-500 text-white font-black h-16 rounded-xl text-lg uppercase tracking-widest"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Submitting..." : "Apply to Become a Relocation Partner"}
                </Button>
              </form>
            </Form>
          </Card>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-24 px-4 border-t border-white/5 text-center">
        <h2 className="text-4xl md:text-5xl font-black uppercase tracking-tighter mb-6">Dubai Relocation Without Loose Ends.</h2>
        <p className="text-xl text-gray-400 mb-12">One WhatsApp. One coordinator. No loose ends.</p>
        <Button size="lg" className="bg-white hover:bg-gray-200 text-black font-black rounded-full px-16 h-20 text-xl shadow-2xl transition-all" onClick={() => window.open('https://wa.me/971523946311', '_blank')}>
          <MessageSquare className="w-6 h-6 mr-3" />
          Talk to a DeliWer Coordinator
        </Button>
      </section>

      {/* Sticky WhatsApp - Specific for Partners */}
      <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-3">
        <Button 
          className="bg-emerald-600 hover:bg-emerald-500 text-white rounded-full h-16 w-16 p-0 shadow-2xl animate-bounce"
          onClick={() => window.open('https://wa.me/971523946311', '_blank')}
        >
          <MessageSquare className="w-8 h-8" />
        </Button>
      </div>
    </div>
  );
}
