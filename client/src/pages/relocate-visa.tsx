import { useState, useEffect, useRef } from "react";
import { Helmet } from "react-helmet";
import { Link, useSearch } from "wouter";
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
  Globe, 
  Users, 
  Plane, 
  Shield, 
  ArrowRight,
  Briefcase,
  Home,
  CheckCircle2,
  TrendingUp,
  Heart,
  DollarSign,
  MessageCircle,
  Award,
  Check,
  Calendar,
  Clock,
  Zap,
  Star,
  Quote
} from "lucide-react";
import dubaiSkyline from "@assets/stock_images/dubai_skyline_modern_806b4a5e.jpg";
import dubaiMarinaAerial from "@assets/generated_images/dubai_marina_and_business_district_aerial_view.png";
import professionalOffice from "@assets/generated_images/professional_team_in_modern_corporate_office_space.png";

export default function VisaServices() {
  const { toast } = useToast();
  const formRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://assets.calendly.com/assets/external/widget.js';
    script.async = true;
    document.body.appendChild(script);
  }, []);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    visaType: "",
    timeline: "",
    message: "I am interested in Golden Visa / UAE Visa services."
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
        message: ""
      });
    }
  });

  const visaPathways = [
    {
      title: "Real Estate Investment",
      amount: "AED 2M+",
      description: "Property purchase with 10-year Golden Visa eligibility.",
      icon: Home,
      color: "bg-blue-900/40 border-blue-400/30"
    },
    {
      title: "Business Establishment",
      amount: "Flexible",
      description: "Company setup + investor visa for entrepreneurs.",
      icon: Briefcase,
      color: "bg-purple-900/40 border-purple-400/30"
    },
    {
      title: "Investor Portfolio",
      amount: "AED 10M+",
      description: "Portfolio-based residency for high-net-worth individuals.",
      icon: DollarSign,
      color: "bg-emerald-900/40 border-emerald-400/30"
    },
    {
      title: "Talent / Executive",
      amount: "Specialized",
      description: "For executives, researchers, and specialized specialists.",
      icon: Award,
      color: "bg-orange-900/40 border-orange-400/30"
    }
  ];

  const faqItems = [
    {
      question: "What is the UAE Golden Visa?",
      answer: "The Golden Visa is a long-term residence visa which enables foreign talents to live, work or study in the UAE while enjoying exclusive benefits including 10-year residency, no need for a national sponsor, and 100% ownership of their business on UAE's mainland."
    },
    {
      question: "Can I sponsor my family with a Golden Visa?",
      answer: "Yes, the Golden Visa allows you to sponsor your family members, including spouse and children regardless of their age, and domestic helpers without limit on the number."
    },
    {
      question: "What is the processing time?",
      answer: "Typical processing time for a Golden Visa is between 30 to 60 days, depending on the pathway chosen and documentation readiness."
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>UAE Golden Visa & Visa Services | Dubai Residency | DeliWer</title>
        <meta name="description" content="Secure your 10-year UAE Golden Visa. Expert guidance on investment, talent, and business residency pathways in Dubai." />
      </Helmet>

      {/* Hero Section */}
      <section className="relative py-24 overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${dubaiMarinaAerial})` }}
        />
        <div className="absolute inset-0 bg-slate-950/80" />
        <div className="relative z-10 max-w-5xl mx-auto px-4 text-center">
          <Badge className="mb-4 bg-blue-500/20 text-blue-400 border-blue-500/30">
            Residency & Visas
          </Badge>
          <h1 className="text-4xl md:text-7xl font-black text-white mb-6">
            UAE Golden Visa <span className="text-blue-400">Services</span>
          </h1>
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            Your gateway to 10-year residency, tax optimization, and a global lifestyle. Unified visa processing for you and your family.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button size="lg" className="bg-blue-600 hover:bg-blue-700 font-bold" onClick={() => formRef.current?.scrollIntoView({ behavior: 'smooth' })}>
              Start Visa Application
            </Button>
            <Link href="/relocate">
              <Button size="lg" variant="outline" className="text-white border-white/20 hover:bg-white/10">
                Need Relocation? Visit Relocate
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Pathways Grid */}
      <section className="py-20 bg-slate-50 dark:bg-slate-900/50">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Golden Visa Pathways</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">Choose the residency route that best fits your investment or professional profile.</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {visaPathways.map((path, i) => (
              <Card key={i} className={`${path.color} border backdrop-blur-sm hover-elevate`}>
                <CardContent className="pt-6">
                  <path.icon className="w-8 h-8 text-white mb-4" />
                  <p className="text-xs font-bold text-white/70 uppercase tracking-wider mb-1">{path.title}</p>
                  <p className="text-2xl font-bold text-white mb-2">{path.amount}</p>
                  <p className="text-sm text-white/80">{path.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Unified Advantage */}
      <section className="py-20 border-y border-slate-200 dark:border-slate-800">
        <div className="max-w-4xl mx-auto px-4">
          <div className="bg-blue-600 rounded-3xl p-8 md:p-12 text-white text-center shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 right-0 p-4 opacity-10">
              <Shield className="w-32 h-32" />
            </div>
            <h3 className="text-2xl md:text-3xl font-bold mb-6">The DeliWer Visa Advantage</h3>
            <p className="text-lg text-blue-100 mb-8">
              We don't just process papers. We coordinate your entire residency journey, ensuring your Golden Visa integrates perfectly with your business and tax structure.
            </p>
            <div className="grid sm:grid-cols-3 gap-4">
              <div className="bg-white/10 rounded-xl p-4">
                <p className="font-bold text-xl">100%</p>
                <p className="text-xs text-blue-200">Success Rate</p>
              </div>
              <div className="bg-white/10 rounded-xl p-4">
                <p className="font-bold text-xl">30-60 Days</p>
                <p className="text-xs text-blue-200">Average Processing</p>
              </div>
              <div className="bg-white/10 rounded-xl p-4">
                <p className="font-bold text-xl">Family</p>
                <p className="text-xs text-blue-200">Visas Included</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Lead Form */}
      <section id="lead-form" ref={formRef} className="py-20 bg-white dark:bg-slate-950">
        <div className="max-w-3xl mx-auto px-4">
          <Card className="p-8 shadow-2xl border-blue-100 dark:border-blue-900">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold">Start Your Residency Journey</h2>
              <p className="text-muted-foreground mt-2">Get a complimentary consultation with a Golden Visa specialist.</p>
            </div>
            <form onSubmit={(e) => { e.preventDefault(); leadMutation.mutate(formData); }} className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Full Name</Label>
                  <Input required value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} placeholder="John Doe" />
                </div>
                <div className="space-y-2">
                  <Label>Email</Label>
                  <Input required type="email" value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} placeholder="john@example.com" />
                </div>
              </div>
              <div className="space-y-2">
                <Label>Visa Pathway</Label>
                <Select value={formData.visaType} onValueChange={v => setFormData({...formData, visaType: v})}>
                  <SelectTrigger><SelectValue placeholder="Select interest" /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="real-estate">Real Estate Investment</SelectItem>
                    <SelectItem value="business">Business / Entrepreneur</SelectItem>
                    <SelectItem value="talent">Talent / Executive</SelectItem>
                    <SelectItem value="other">Other UAE Visa</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>Message</Label>
                <Textarea value={formData.message} onChange={e => setFormData({...formData, message: e.target.value})} className="min-h-[100px]" />
              </div>
              <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 font-bold" disabled={leadMutation.isPending}>
                {leadMutation.isPending ? "Submitting..." : "Get Started"}
              </Button>
            </form>
          </Card>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20 bg-slate-50 dark:bg-slate-900/50">
        <div className="max-w-3xl mx-auto px-4">
          <h2 className="text-2xl font-bold mb-8 text-center">Frequently Asked Questions</h2>
          <Accordion type="single" collapsible>
            {faqItems.map((item, i) => (
              <AccordionItem key={i} value={`item-${i}`}>
                <AccordionTrigger>{item.question}</AccordionTrigger>
                <AccordionContent>{item.answer}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>
    </div>
  );
}
