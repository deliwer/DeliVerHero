import { useState, useRef } from "react";
import { Helmet } from "react-helmet";
import { Link } from "wouter";
import { useMutation } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
import { 
  Plane, 
  Shield, 
  ArrowRight,
  CheckCircle2,
  Phone,
  MessageCircle,
  FileText,
  UserCheck,
  Globe,
  Award,
  Zap
} from "lucide-react";
import dubaiSkyline from "@assets/stock_images/dubai_skyline_modern_806b4a5e.jpg";

export default function VisaServices() {
  const { toast } = useToast();
  const formRef = useRef<HTMLDivElement>(null);
  
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    visaType: "",
    timeline: "",
    message: "I am interested in Visa and Golden Visa services in Dubai.",
  });

  const leadMutation = useMutation({
    mutationFn: async (data: typeof formData) => {
      return apiRequest("POST", "/api/relocate/leads", data);
    },
    onSuccess: () => {
      toast({
        title: "Enquiry Sent",
        description: "Our visa specialists will contact you shortly.",
      });
      setFormData({
        name: "",
        email: "",
        phone: "",
        visaType: "",
        timeline: "",
        message: "",
      });
    },
  });

  const visaServices = [
    {
      icon: Award,
      title: "Golden Visa (10-Year)",
      description: "Long-term residency for investors, entrepreneurs, and talents",
      features: ["Property Investment Route", "Business Investor Route", "Specialized Talent Route", "Family Sponsorship Included"]
    },
    {
      icon: UserCheck,
      title: "Residency Visas",
      description: "Standard employment and partner residency permits",
      features: ["Employment Visas", "Partner/Investor Visas", "Freelance Permits", "Remote Work Visas"]
    },
    {
      icon: Shield,
      title: "Family Sponsorship",
      description: "Bring your family to Dubai with full residency support",
      features: ["Spouse Sponsorship", "Children Sponsorship", "Parent Visas", "Domestic Staff Visas"]
    },
    {
      icon: FileText,
      title: "Document Services",
      description: "Complete handling of all legal and government paperwork",
      features: ["Medical & Emirates ID", "Degree Attestation", "Legal Translations", "Visa Cancellations"]
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>Dubai Visa & Golden Visa Services | 10-Year Residency | DeliWer</title>
        <meta name="description" content="Secure your Dubai Golden Visa and residency with DeliWer. Expert assistance for 10-year visas, family sponsorship, and professional visa processing." />
      </Helmet>

      {/* Hero Section */}
      <section className="relative py-24 flex items-center justify-center overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${dubaiSkyline})` }}
        />
        <div className="absolute inset-0 bg-slate-950/85" />
        <div className="relative z-10 max-w-5xl mx-auto px-4 text-center">
          <Badge className="mb-4 bg-amber-500/20 text-amber-400 border-amber-500/30">
            Residency & Visa Specialists
          </Badge>
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
            Secure Your Future in <span className="text-amber-400">Dubai</span>
          </h1>
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            Expert guidance for Golden Visas, long-term residency, and family sponsorship. We handle the complexity, you enjoy the lifestyle.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button size="lg" className="bg-amber-600 hover:bg-amber-700" onClick={() => formRef.current?.scrollIntoView({ behavior: 'smooth' })}>
              Check Eligibility
            </Button>
            <Link href="/relocate">
              <Button size="lg" variant="outline" className="text-white border-white/20 hover:bg-white/10">
                <Plane className="w-4 h-4 mr-2" />
                Relocation Services
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-20 bg-slate-50 dark:bg-slate-900/50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">Our Visa Solutions</h2>
            <p className="text-muted-foreground text-lg">Comprehensive residency management tailored to your specific needs.</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {visaServices.map((service, i) => (
              <Card key={i} className="border-none shadow-lg hover-elevate bg-white dark:bg-slate-900">
                <CardHeader>
                  <div className="w-12 h-12 rounded-lg bg-amber-500/10 flex items-center justify-center mb-4">
                    <service.icon className="w-6 h-6 text-amber-600" />
                  </div>
                  <CardTitle className="text-xl">{service.title}</CardTitle>
                  <CardDescription>{service.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {service.features.map((f, j) => (
                      <li key={j} className="flex items-center text-sm gap-2">
                        <CheckCircle2 className="w-4 h-4 text-amber-500" />
                        <span>{f}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Comparison Section */}
      <section className="py-20 bg-background">
        <div className="max-w-4xl mx-auto px-4">
          <Card className="border-amber-500/20 bg-amber-500/5 p-8 text-center">
            <h2 className="text-2xl font-bold mb-4">Why Choose the Golden Visa?</h2>
            <div className="grid md:grid-cols-3 gap-6 text-left mt-8">
              <div className="space-y-2">
                <div className="font-bold text-amber-600">10-Year Stability</div>
                <p className="text-sm text-muted-foreground">Long-term residency independent of employment or company sponsorship.</p>
              </div>
              <div className="space-y-2">
                <div className="font-bold text-amber-600">Family Security</div>
                <p className="text-sm text-muted-foreground">Sponsor your spouse and children for the same 10-year duration.</p>
              </div>
              <div className="space-y-2">
                <div className="font-bold text-amber-600">0% Personal Tax</div>
                <p className="text-sm text-muted-foreground">Fully enjoy your global and local earnings with zero personal income tax.</p>
              </div>
            </div>
            <div className="mt-8">
              <Link href="/relocate">
                <Button variant="link" className="text-amber-600">
                  Also need help with moving? View Relocation Services <ArrowRight className="ml-2 w-4 h-4" />
                </Button>
              </Link>
            </div>
          </Card>
        </div>
      </section>

      {/* Lead Form */}
      <section id="lead-form" ref={formRef} className="py-20 bg-slate-950 text-white relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-amber-500 rounded-full blur-[120px]" />
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-500 rounded-full blur-[120px]" />
        </div>
        <div className="relative z-10 max-w-3xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Start Your Visa Application</h2>
            <p className="text-gray-400">Our specialists will review your profile and contact you within 24 hours.</p>
          </div>
          <Card className="p-8 bg-slate-900 border-slate-800 text-white shadow-2xl">
            <form onSubmit={(e) => { e.preventDefault(); leadMutation.mutate(formData); }} className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label className="text-gray-300">Full Name</Label>
                  <Input required className="bg-slate-800 border-slate-700 text-white" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} placeholder="John Doe" />
                </div>
                <div className="space-y-2">
                  <Label className="text-gray-300">Email</Label>
                  <Input required type="email" className="bg-slate-800 border-slate-700 text-white" value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} placeholder="john@example.com" />
                </div>
              </div>
              <div className="space-y-2">
                <Label className="text-gray-300">Visa Category</Label>
                <Select value={formData.visaType} onValueChange={v => setFormData({...formData, visaType: v})}>
                  <SelectTrigger className="bg-slate-800 border-slate-700 text-white"><SelectValue placeholder="Select visa type" /></SelectTrigger>
                  <SelectContent className="bg-slate-800 border-slate-700 text-white">
                    <SelectItem value="golden">Golden Visa (10 Years)</SelectItem>
                    <SelectItem value="investor">Investor Visa</SelectItem>
                    <SelectItem value="employment">Employment/Remote Work</SelectItem>
                    <SelectItem value="family">Family Sponsorship</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label className="text-gray-300">Message (Optional)</Label>
                <Textarea className="bg-slate-800 border-slate-700 text-white min-h-[100px]" value={formData.message} onChange={e => setFormData({...formData, message: e.target.value})} />
              </div>
              <Button type="submit" className="w-full bg-amber-600 hover:bg-amber-700 text-white font-bold h-12" disabled={leadMutation.isPending}>
                <Zap className="w-4 h-4 mr-2 fill-current" />
                {leadMutation.isPending ? "Processing..." : "Submit Enquiry"}
              </Button>
            </form>
          </Card>
          <div className="mt-8 flex justify-center gap-6 text-gray-400">
            <div className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-amber-500" /> WhatsApp Support</div>
            <div className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-amber-500" /> Fast Response</div>
            <div className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-amber-500" /> Confidential</div>
          </div>
        </div>
      </section>

      {/* Simple Step Journey */}
      <section className="py-20 bg-background border-t border-slate-100 dark:border-slate-800">
        <div className="max-w-5xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-16">Your Path to Dubai Residency</h2>
          <div className="grid md:grid-cols-4 gap-8">
            {[
              { step: "01", title: "Free Audit", desc: "Profile assessment & eligibility check" },
              { step: "02", title: "Document Prep", desc: "Attestation & legal requirements" },
              { step: "03", title: "Submission", desc: "Government liaison & filing" },
              { step: "04", title: "Residency", desc: "Visa stamping & Emirates ID" }
            ].map((s, i) => (
              <div key={i} className="relative group">
                <div className="text-5xl font-black text-slate-100 dark:text-slate-800 absolute -top-8 left-0 z-0 group-hover:text-amber-500/10 transition-colors">{s.step}</div>
                <div className="relative z-10 pt-4">
                  <h3 className="font-bold text-lg mb-2">{s.title}</h3>
                  <p className="text-sm text-muted-foreground">{s.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
