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
  Plane, 
  Shield, 
  ArrowRight,
  Home,
  CheckCircle2,
  Heart,
  MessageCircle,
  Award,
  Check,
  Calendar,
  Clock,
  Zap,
  Star,
  Quote,
  Smartphone,
  Droplets,
  Wifi,
  Truck,
  ShieldCheck,
  Plug
} from "lucide-react";
import dubaiSkyline from "@assets/stock_images/dubai_skyline_modern_806b4a5e.jpg";
import dubaiLifestyle from "@assets/stock_images/luxury_dubai_lifesty_e9f4e72e.jpg";
import relocationHero from "@assets/stock_images/relocation_hero.jpg";

export default function Relocate() {
  const { toast } = useToast();
  const searchString = useSearch();
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
    movingFrom: "",
    familySize: "",
    timeline: "",
    message: "I am interested in relocation services to Dubai."
  });

  const leadMutation = useMutation({
    mutationFn: async (data: typeof formData) => {
      return apiRequest("POST", "/api/relocate/leads", data);
    },
    onSuccess: () => {
      toast({
        title: "Relocation Request Sent",
        description: "Our specialists will contact you shortly.",
      });
      setFormData({
        name: "",
        email: "",
        phone: "",
        movingFrom: "",
        familySize: "",
        timeline: "",
        message: ""
      });
    }
  });

  const relocationServices = [
    {
      icon: Plane,
      title: "Moving & Shipping",
      description: "Global door-to-door relocation with full tracking and customs handling.",
      features: ["International Shipping", "Professional Packing", "Insurance Coverage"]
    },
    {
      icon: Home,
      title: "Home & Life Setup",
      description: "Finding your perfect home and settling your family with ease.",
      features: ["Property Search", "School Enrollment", "Healthcare Registration"]
    },
    {
      icon: Droplets,
      title: "Utilities & Essentials",
      description: "Immediate activation of critical services before you arrive.",
      features: ["Water & Electricity", "High-speed Internet", "Home Automation"]
    },
    {
      icon: Shield,
      title: "One Point of Accountability",
      description: "One team, one timeline, total transparency for your move.",
      features: ["Dedicated Manager", "Fixed Pricing", "24/7 Support"]
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>Dubai Relocation Services | Moving & Home Setup | DeliWer</title>
        <meta name="description" content="Moving to Dubai? We handle the entire relocation. International shipping, home setup, utilities, and lifestyle support." />
      </Helmet>

      {/* Hero Section */}
      <section className="relative h-[80vh] min-h-[600px] overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${relocationHero})` }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black/70" />
        <div className="relative z-10 h-full flex flex-col justify-center items-center text-center px-4">
          <Badge variant="secondary" className="mb-4 bg-emerald-500/20 backdrop-blur-sm border-emerald-500/30 text-emerald-400 font-bold">
            Dubai's #1 Relocation Orchestrator
          </Badge>
          <h1 className="text-4xl md:text-7xl font-black text-white mb-6 max-w-5xl leading-tight">
            Moving to Dubai? <br />
            <span className="text-emerald-400 text-3xl md:text-5xl">We Handle the Entire Relocation.</span>
          </h1>
          <p className="text-xl text-white/90 mb-10 max-w-3xl font-medium">
            Complete door-to-door transition—shipping, home setup, utilities, and local living support. Coordinated by one team. No stress.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button 
              size="lg" 
              className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold px-8 h-14 text-lg rounded-full"
              onClick={() => formRef.current?.scrollIntoView({ behavior: 'smooth' })}
            >
              Start Relocation Calculator
            </Button>
            <Link href="/residence">
              <Button 
                size="lg" 
                variant="outline" 
                className="border-white/30 text-white backdrop-blur-sm bg-white/10 hover:bg-white/20 font-bold h-14 px-8 rounded-full"
              >
                Find a Home? Visit Residence
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Services Overview */}
      <section className="py-24 relative overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center z-0 opacity-20 grayscale"
          style={{ backgroundImage: `url('https://images.unsplash.com/photo-1582653280643-e79c79219b19?auto=format&fit=crop&q=80')` }}
        />
        <div className="absolute inset-0 bg-white/90 dark:bg-slate-950/90 z-0" />
        <div className="max-w-6xl mx-auto px-4 relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Relocation Services</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">Everything you need to move and settle in Dubai, managed through a single point of contact.</p>
          </div>
          <div className="grid md:grid-cols-2 gap-8">
            {relocationServices.map((service, i) => (
              <Card key={i} className="hover-elevate border-slate-100 dark:border-slate-800 shadow-sm bg-card/50 backdrop-blur-sm">
                <CardHeader>
                  <div className="w-14 h-14 rounded-2xl bg-emerald-500/10 flex items-center justify-center mb-4">
                    <service.icon className="w-7 h-7 text-emerald-600" />
                  </div>
                  <CardTitle className="text-2xl">{service.title}</CardTitle>
                  <CardDescription className="text-lg">{service.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="grid grid-cols-1 gap-3">
                    {service.features.map((f, j) => (
                      <li key={j} className="flex items-center gap-3 text-slate-600 dark:text-slate-300 font-medium">
                        <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0" />
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

      {/* Exit Concierge Highlight */}
      <section className="py-24 relative overflow-hidden text-white">
        <div 
          className="absolute inset-0 bg-cover bg-center z-0"
          style={{ backgroundImage: `url('https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&q=80')` }}
        />
        <div className="absolute inset-0 bg-slate-900/80 backdrop-blur-sm z-0" />
        <div className="max-w-5xl mx-auto px-4 relative z-10">
          <div className="bg-slate-800/50 p-8 md:p-16 rounded-[2.5rem] border border-white/10 shadow-2xl backdrop-blur-md">
            <div className="flex flex-col md:flex-row gap-12 items-center">
              <div className="flex-1">
                <Badge className="mb-6 bg-red-500/20 text-red-400 border-red-500/30 px-4 py-1 text-sm font-bold uppercase tracking-widest">
                  Survival Grade Exit
                </Badge>
                <h2 className="text-4xl md:text-5xl font-black uppercase tracking-tighter mb-6">
                  Leaving Dubai? <br />
                  <span className="text-emerald-400">Don’t Lose Your Deposit.</span>
                </h2>
                <p className="text-xl text-slate-300 mb-8 leading-relaxed">
                  Our Exit Concierge manages final cleaning, snag fixing, DEWA closure, and landlord handover. We guarantee a seamless departure without loose ends.
                </p>
                <Link href="/exit">
                  <Button size="lg" className="bg-emerald-600 hover:bg-emerald-500 text-white font-black rounded-full px-12 h-16 text-lg shadow-xl">
                    Explore Exit Concierge
                    <ArrowRight className="ml-2 w-6 h-6" />
                  </Button>
                </Link>
              </div>
              <div className="grid grid-cols-2 gap-4 w-full md:w-auto shrink-0">
                {[
                  { icon: ShieldCheck, label: "Deposit Recovery" },
                  { icon: Plug, label: "Utility Closure" },
                  { icon: Plane, label: "Move Support" },
                  { icon: CheckCircle2, label: "Zero Admin" }
                ].map((item, i) => (
                  <div key={i} className="bg-white/5 border border-white/10 p-6 rounded-2xl flex flex-col items-center text-center gap-3">
                    <item.icon className="w-8 h-8 text-emerald-400" />
                    <span className="text-sm font-bold uppercase tracking-tight">{item.label}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4-Step Journey */}
      <section className="py-24 relative overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center z-0 opacity-10"
          style={{ backgroundImage: `url('https://images.unsplash.com/photo-1523217582562-09d0def993a6?auto=format&fit=crop&q=80')` }}
        />
        <div className="max-w-6xl mx-auto px-4 relative z-10">
          <h2 className="text-3xl font-bold text-center mb-16">Your 4-Step Relocation Journey</h2>
          <div className="grid md:grid-cols-4 gap-8">
            {[
              { step: "01", title: "Strategy Call", desc: "Consult with a specialist to map your move." },
              { step: "02", title: "Custom Roadmap", desc: "Receive a fixed-price relocation plan." },
              { step: "03", title: "Active Move", desc: "We manage shipping and setup in parallel." },
              { step: "04", title: "Welcome Home", desc: "Arrive to a fully functional home & life." }
            ].map((s, i) => (
              <div key={i} className="relative">
                <div className="text-5xl font-black text-emerald-500/20 mb-4">{s.step}</div>
                <h3 className="text-xl font-bold mb-2">{s.title}</h3>
                <p className="text-muted-foreground">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Lead Form */}
      <section id="lead-form" ref={formRef} className="py-24 relative overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-5"
          style={{ backgroundImage: `url(${dubaiLifestyle})` }}
        />
        <div className="relative z-10 max-w-4xl mx-auto px-4">
          <Card className="p-8 md:p-12 shadow-3xl border-emerald-100 dark:border-emerald-900/30">
            <div className="text-center mb-10">
              <h2 className="text-3xl md:text-4xl font-black mb-4">Relocation Enquiry</h2>
              <p className="text-muted-foreground text-lg">Receive a custom relocation quote within 24 hours with WhatsApp follow-up.</p>
            </div>
            <form onSubmit={(e) => { e.preventDefault(); leadMutation.mutate(formData); }} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label className="text-base">Full Name</Label>
                  <Input required className="h-12 text-lg" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} placeholder="John Doe" />
                </div>
                <div className="space-y-2">
                  <Label className="text-base">Email</Label>
                  <Input required type="email" className="h-12 text-lg" value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} placeholder="john@example.com" />
                </div>
              </div>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label className="text-base">Moving From (City/Country)</Label>
                  <Input required className="h-12 text-lg" value={formData.movingFrom} onChange={e => setFormData({...formData, movingFrom: e.target.value})} placeholder="London, UK" />
                </div>
                <div className="space-y-2">
                  <Label className="text-base">Timeline</Label>
                  <Select value={formData.timeline} onValueChange={v => setFormData({...formData, timeline: v})}>
                    <SelectTrigger className="h-12 text-lg"><SelectValue placeholder="When are you moving?" /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="immediate">Immediate (Next 30 days)</SelectItem>
                      <SelectItem value="1-3-months">1-3 Months</SelectItem>
                      <SelectItem value="3-6-months">3-6 Months</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="space-y-2">
                <Label className="text-base">Family Size</Label>
                <Select value={formData.familySize} onValueChange={v => setFormData({...formData, familySize: v})}>
                  <SelectTrigger className="h-12 text-lg"><SelectValue placeholder="Number of people" /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="single">Single / Individual</SelectItem>
                    <SelectItem value="couple">Couple</SelectItem>
                    <SelectItem value="family-small">Family (3-4 members)</SelectItem>
                    <SelectItem value="family-large">Family (5+ members)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label className="text-base">Special Requirements</Label>
                <Textarea value={formData.message} onChange={e => setFormData({...formData, message: e.target.value})} className="min-h-[120px] text-lg" placeholder="Mention pets, cars, or specific home setup needs..." />
              </div>
              <Button type="submit" className="w-full bg-emerald-600 hover:bg-emerald-700 h-14 text-xl font-bold rounded-full" disabled={leadMutation.isPending}>
                {leadMutation.isPending ? "Submitting..." : "Send My Request"}
              </Button>
            </form>
          </Card>
        </div>
      </section>

      {/* Visa Divider */}
      <section className="py-20 bg-slate-900 text-white">
        <div className="max-w-5xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">Need UAE Visa or Golden Visa Support?</h2>
          <p className="text-gray-400 text-lg mb-8 max-w-2xl mx-auto">While relocation handles your move, our Visa Services handle your legal residency and 10-year Golden Visa pathways.</p>
          <Link href="/relocate/visa">
            <Button size="lg" className="bg-white text-slate-900 hover:bg-slate-100 font-bold px-10 h-14 rounded-full">
              Explore Visa Services
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
}
