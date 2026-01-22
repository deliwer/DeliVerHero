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
import relocationHero from "../assets/stock_images/relocation_hero.jpg";

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
        <title>Dubai Relocation Services | Home Setup & Moving | DeliWer</title>
        <meta name="description" content="Moving to Dubai? We handle the entire relocation. International shipping, home setup, utilities, and lifestyle support." />
      </Helmet>

      {/* Hero Section */}
      <section className="relative h-[90vh] min-h-[700px] overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url('https://images.unsplash.com/photo-1544984243-ec57ea16fe25?auto=format&fit=crop&q=80')` }}
        />
        <div className="absolute inset-0 bg-black/40 backdrop-blur-[2px]" />
        <div className="relative z-10 h-full flex flex-col justify-center items-center text-center px-4 max-w-5xl mx-auto">
          <h1 className="text-5xl md:text-8xl font-black text-white mb-8 leading-tight tracking-tight">
            Relocate to Dubai <br />
            <span className="text-emerald-400">Stress-Free.</span>
          </h1>
          <p className="text-2xl text-white/95 mb-12 max-w-2xl font-medium leading-relaxed">
            From international shipping to your first home, we coordinate every detail of your transition.
          </p>
          <div className="flex flex-wrap justify-center gap-6">
            <Button 
              size="lg" 
              className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold px-10 h-16 text-xl rounded-full shadow-2xl transition-transform hover:scale-105"
              onClick={() => formRef.current?.scrollIntoView({ behavior: 'smooth' })}
            >
              Start Your Move
            </Button>
            <Link href="/residence">
              <Button 
                size="lg" 
                variant="outline" 
                className="border-white/40 text-white backdrop-blur-md bg-white/10 hover:bg-white/20 font-bold h-16 px-10 rounded-full text-xl"
              >
                Find a Residence
                <ArrowRight className="ml-2 w-6 h-6" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Simplified Services Overview */}
      <section className="py-32 bg-slate-50 dark:bg-slate-900/50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-4 gap-12 text-center">
            {relocationServices.map((service, i) => (
              <div key={i} className="flex flex-col items-center group">
                <div className="w-20 h-20 rounded-3xl bg-emerald-500/10 flex items-center justify-center mb-8 transition-colors group-hover:bg-emerald-500/20">
                  <service.icon className="w-10 h-10 text-emerald-600" />
                </div>
                <h3 className="text-2xl font-bold mb-4">{service.title}</h3>
                <p className="text-muted-foreground text-lg leading-relaxed">{service.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* High Impact Visual - Exit Concierge */}
      <section className="relative py-40 overflow-hidden text-white">
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url('https://images.unsplash.com/photo-1582653280643-e79c79219b19?auto=format&fit=crop&q=80')` }}
        />
        <div className="absolute inset-0 bg-emerald-950/80 backdrop-blur-sm" />
        <div className="max-w-5xl mx-auto px-6 relative z-10 text-center">
          <h2 className="text-5xl md:text-7xl font-black mb-8 tracking-tighter">
            LEAVING DUBAI?
          </h2>
          <p className="text-2xl text-emerald-50 mb-12 max-w-3xl mx-auto leading-relaxed opacity-90">
            Secure your deposit. We handle the cleaning, utility closures, and landlord handovers so you can leave with peace of mind.
          </p>
          <Link href="/exit">
            <Button size="lg" className="bg-white text-emerald-900 hover:bg-emerald-50 font-black rounded-full px-16 h-20 text-2xl shadow-2xl">
              Exit Concierge
              <ArrowRight className="ml-2 w-8 h-8" />
            </Button>
          </Link>
        </div>
      </section>

      {/* Simplified Journey */}
      <section className="py-32">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-4xl font-black text-center mb-24">The Easy 4-Step Move</h2>
          <div className="grid md:grid-cols-4 gap-16 relative">
            {[
              { step: "01", title: "Plan", desc: "Expert strategy call." },
              { step: "02", title: "Price", desc: "Fixed-cost roadmap." },
              { step: "03", title: "Move", desc: "We manage everything." },
              { step: "04", title: "Live", desc: "Arrive home ready." }
            ].map((s, i) => (
              <div key={i} className="text-center">
                <div className="text-7xl font-black text-emerald-500/10 mb-6">{s.step}</div>
                <h3 className="text-2xl font-bold mb-4">{s.title}</h3>
                <p className="text-muted-foreground text-lg">{s.desc}</p>
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
