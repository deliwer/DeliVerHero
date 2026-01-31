import { useState } from "react";
import { SEOMeta } from "@/components/seo-meta";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Users, 
  CheckCircle, 
  MessageSquare,
  Zap,
  Building,
  Target,
  Briefcase,
  Globe
} from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { insertLeadSchema, type InsertLead } from "@shared/schema";
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
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
      name: "",
      email: "",
      phone: "",
      service: "community",
      requirements: "",
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
        description="Partner with DeliWer to support your community members with discreet, concierge-grade exit services."
      />

      {/* Hero Section */}
      <section className="relative py-20 px-4 overflow-hidden border-b border-white/5">
        <div className="absolute inset-0 bg-gradient-to-b from-blue-600/10 to-transparent pointer-events-none" />
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <Badge className="mb-6 bg-blue-500/10 text-blue-400 border-blue-500/20 px-4 py-1">
            PARTNERSHIP
          </Badge>
          <h1 className="text-4xl md:text-6xl font-black uppercase tracking-tighter mb-6">
            Partner With DeliWer
          </h1>
          <p className="text-lg md:text-xl text-gray-400 max-w-2xl mx-auto mb-10 leading-relaxed">
            Support your community members with discreet, concierge-grade Dubai exit services. We handle the friction; you provide the trust.
          </p>
          <div className="flex flex-col items-center gap-4">
            <Button size="lg" className="bg-emerald-600 hover:bg-emerald-500 text-white font-black rounded-full px-12 h-16 text-lg shadow-xl" onClick={handleWhatsApp} data-testid="button-partner-whatsapp">
              <MessageSquare className="w-6 h-6 mr-2" />
              WhatsApp Partnership Query
            </Button>
          </div>
        </div>
      </section>

      {/* Philosophy - Condensed */}
      <section className="py-16 px-4 border-b border-white/5 bg-slate-900/50">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-2xl md:text-4xl font-black uppercase tracking-tighter mb-6">
            Trusted Referral <span className="text-emerald-500">Nodes</span>
          </h2>
          <p className="text-lg text-gray-300 leading-relaxed">
            DeliWer collaborates with <strong>curated networks</strong> whose members value speed and confidentiality. You refer; we execute. No operational drag for your team.
          </p>
        </div>
      </section>

      {/* Ideal Partner Communities - Simplified Grid */}
      <section className="py-16 px-4 bg-white/[0.02]">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            {[
              { title: "Founders", icon: Users },
              { title: "Offices", icon: Building },
              { title: "Executives", icon: Briefcase },
              { title: "Leadership", icon: Globe },
              { title: "HR/Mobility", icon: Target }
            ].map((item, i) => (
              <div key={i} className="bg-white/5 border border-white/10 rounded-2xl p-6 text-center hover-elevate transition-all" data-testid={`card-ideal-partner-${i}`}>
                <item.icon className="w-8 h-8 text-blue-500 mx-auto mb-3" />
                <span className="text-xs font-bold uppercase text-gray-300 block">{item.title}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Responsibilities - Side by Side Condensed */}
      <section className="py-16 px-4 border-y border-white/5">
        <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-12">
          <div className="space-y-6">
            <h3 className="text-xl font-black uppercase text-emerald-500 border-l-4 border-emerald-500 pl-4">Your Role</h3>
            <ul className="space-y-3 text-gray-300 font-medium">
              <li className="flex items-center gap-3">
                <CheckCircle className="w-4 h-4 text-emerald-500" /> Share exit concierge link
              </li>
              <li className="flex items-center gap-3">
                <CheckCircle className="w-4 h-4 text-emerald-500" /> Refer exiting members
              </li>
              <li className="flex items-center gap-3">
                <CheckCircle className="w-4 h-4 text-emerald-500" /> Zero operational liability
              </li>
            </ul>
          </div>
          <div className="space-y-6">
            <h3 className="text-xl font-black uppercase text-blue-500 border-l-4 border-blue-500 pl-4">DeliWer Handles</h3>
            <ul className="space-y-3 text-gray-300 font-medium">
              <li className="flex items-center gap-3">
                <Zap className="w-4 h-4 text-blue-500" /> Utility & bill settlements
              </li>
              <li className="flex items-center gap-3">
                <Zap className="w-4 h-4 text-blue-500" /> Deposit recovery & handover
              </li>
              <li className="flex items-center gap-3">
                <Zap className="w-4 h-4 text-blue-500" /> Full client coordination
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* Form Section - Cleaned up */}
      <section id="apply-section" className="py-20 px-4 bg-blue-600/5">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-5xl font-black uppercase tracking-tighter mb-4">Request Access</h2>
            <p className="text-lg text-blue-400">Join our private referral network.</p>
          </div>

          <Card className="bg-slate-900 border-white/10 p-6 md:p-10 rounded-[2rem]" data-testid="card-partnership-form">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Input {...field} className="bg-white/5 border-white/10 h-12 text-white rounded-lg" placeholder="Full Name" data-testid="input-name" />
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
                        <FormControl>
                          <Input {...field} className="bg-white/5 border-white/10 h-12 text-white rounded-lg" placeholder="Email Address" data-testid="input-email" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="phone"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Input {...field} className="bg-white/5 border-white/10 h-12 text-white rounded-lg" placeholder="WhatsApp Number" data-testid="input-phone" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="service"
                    render={({ field }) => (
                      <FormItem>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger className="bg-white/5 border-white/10 h-12 text-white rounded-lg" data-testid="select-service">
                              <SelectValue placeholder="Community Type" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent className="bg-slate-900 border-white/10 text-white">
                            <SelectItem value="community">Founder Network</SelectItem>
                            <SelectItem value="professional_group">Professional Group</SelectItem>
                            <SelectItem value="family_office">Family Office</SelectItem>
                            <SelectItem value="other">Other</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <FormField
                  control={form.control}
                  name="requirements"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Textarea {...field} value={field.value ?? ""} className="bg-white/5 border-white/10 min-h-[100px] text-white rounded-lg" placeholder="Briefly describe your network..." data-testid="textarea-requirements" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <Button 
                  type="submit" 
                  className="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-black h-14 rounded-lg text-lg uppercase tracking-widest transition-all"
                  disabled={isSubmitting}
                  data-testid="button-submit-partnership"
                >
                  {isSubmitting ? "Sending..." : "Submit Access Request"}
                </Button>
                <p className="text-center text-sm text-gray-500 mt-4 italic">
                  Partnerships are reviewed for alignment and service standards.
                </p>
              </form>
            </Form>
          </Card>
        </div>
      </section>

      {/* Footer Note */}
      <footer className="py-12 px-4 border-t border-white/5 text-center bg-slate-950">
        <p className="text-gray-500 max-w-2xl mx-auto italic" data-testid="text-footer-note">
          DeliWer is a UAE-based coordination platform focused on relocation, exit, and settlement journeys.
        </p>
      </footer>

      {/* Sticky WhatsApp */}
      <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-3">
        <Button 
          className="bg-emerald-600 hover:bg-emerald-500 text-white rounded-full h-16 w-16 p-0 shadow-2xl animate-bounce"
          onClick={handleWhatsApp}
          data-testid="button-sticky-whatsapp"
        >
          <MessageSquare className="w-8 h-8" />
        </Button>
      </div>
    </div>
  );
}
