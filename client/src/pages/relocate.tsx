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
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
import { 
  Plane, 
  Shield, 
  ArrowRight,
  Home,
  CheckCircle2,
  Phone,
  MessageCircle,
  Zap,
  Award
} from "lucide-react";
import dubaiSkyline from "@assets/stock_images/dubai_skyline_modern_806b4a5e.jpg";

export default function Relocate() {
  const { toast } = useToast();
  const searchString = useSearch();
  const formRef = useRef<HTMLDivElement>(null);
  
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    timeline: "",
    message: "",
  });

  const leadMutation = useMutation({
    mutationFn: async (data: typeof formData) => {
      return apiRequest("POST", "/api/relocate/leads", data);
    },
    onSuccess: () => {
      toast({
        title: "Thank you for your enquiry!",
        description: "Our relocation specialists will contact you within 24 hours.",
      });
      setFormData({
        name: "",
        email: "",
        phone: "",
        timeline: "",
        message: "",
      });
    },
    onError: (error: any) => {
      toast({
        title: "Submission failed",
        description: error.message || "Please try again or contact us directly.",
        variant: "destructive",
      });
    }
  });

  const relocationServices = [
    {
      icon: Plane,
      title: "Moving & Shipping",
      description: "Seamless door-to-door transition from anywhere in the world",
      features: ["Customs Clearance", "Pet Relocation", "Vehicle Shipping", "Global Tracking"]
    },
    {
      icon: Home,
      title: "Home Setup & Living Support",
      description: "Premium move-in services and essential living support",
      features: ["Professional Packing", "Furniture Assembly", "Storage Solutions", "Handover Coordination"]
    },
    {
      icon: Zap,
      title: "Utilities & Essentials",
      description: "Immediate activation of water, electricity, and high-speed internet",
      features: ["DEWA/FEWA Connection", "Internet & Mobile", "Gas Connection", "Water Filtration"]
    },
    {
      icon: Shield,
      title: "One Point Accountability",
      description: "A single coordinator for your entire relocation journey",
      features: ["Dedicated Specialist", "Status Dashboard", "Vendor Management", "24/7 Support"]
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>Moving to Dubai? We Handle the Entire Relocation | DeliWer</title>
        <meta name="description" content="Redefining Dubai relocation. Complete home setup, utilities, moving, and living support. One point of accountability for your seamless move to the UAE." />
      </Helmet>

      {/* Hero Section */}
      <section className="relative py-24 flex items-center justify-center overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${dubaiSkyline})` }}
        />
        <div className="absolute inset-0 bg-slate-950/80" />
        <div className="relative z-10 max-w-5xl mx-auto px-4 text-center">
          <Badge className="mb-4 bg-blue-500/20 text-blue-400 border-blue-500/30">
            Premium Relocation Services
          </Badge>
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
            Moving to Dubai? <span className="text-blue-400">We Handle the Entire Relocation.</span>
          </h1>
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            From door-to-door moving to utility activation and home setup. Focus on your new life, we'll handle the logistics.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button size="lg" className="bg-blue-600 hover:bg-blue-700" onClick={() => formRef.current?.scrollIntoView({ behavior: 'smooth' })}>
              Start Relocation Calculator
            </Button>
            <Link href="/relocate/visa">
              <Button size="lg" variant="outline" className="text-white border-white/20 hover:bg-white/10">
                Visa or Golden Visa? Visit Visa Services
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-20 bg-slate-50 dark:bg-slate-900/50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">Complete Relocation Support</h2>
            <p className="text-muted-foreground text-lg">Comprehensive moving and home settlement services for a stress-free transition.</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {relocationServices.map((service, i) => (
              <Card key={i} className="border-none shadow-lg hover-elevate bg-white dark:bg-slate-900">
                <CardHeader>
                  <div className="w-12 h-12 rounded-lg bg-blue-500/10 flex items-center justify-center mb-4">
                    <service.icon className="w-6 h-6 text-blue-600" />
                  </div>
                  <CardTitle className="text-xl">{service.title}</CardTitle>
                  <CardDescription>{service.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {service.features.map((f, j) => (
                      <li key={j} className="flex items-center text-sm gap-2">
                        <CheckCircle2 className="w-4 h-4 text-blue-500" />
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

      {/* Step Journey */}
      <section className="py-20 bg-background">
        <div className="max-w-5xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-16">Simple 4-Step Relocation Journey</h2>
          <div className="grid md:grid-cols-4 gap-8 relative">
            {[
              { step: "01", title: "Planning", desc: "Detailed consultation and logistical mapping" },
              { step: "02", title: "Move Management", desc: "Packing, shipping, and global logistics" },
              { step: "03", title: "Home Settlement", desc: "Handover, utilities, and furniture setup" },
              { step: "04", title: "Living Support", desc: "Ongoing assistance as you settle in" }
            ].map((s, i) => (
              <div key={i} className="text-center">
                <div className="w-12 h-12 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold text-xl mx-auto mb-4 shadow-lg">{s.step}</div>
                <h3 className="font-bold mb-2">{s.title}</h3>
                <p className="text-sm text-muted-foreground">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Enquiry Form */}
      <section id="lead-form" ref={formRef} className="py-20 bg-slate-950">
        <div className="max-w-3xl mx-auto px-4">
          <Card className="p-8 shadow-2xl">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold">Relocation Enquiry</h2>
              <p className="text-muted-foreground">Receive a personalized relocation quote and timeline.</p>
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
                <Label>Timeline</Label>
                <Select value={formData.timeline} onValueChange={v => setFormData({...formData, timeline: v})}>
                  <SelectTrigger><SelectValue placeholder="When are you moving?" /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="immediate">Within 1 month</SelectItem>
                    <SelectItem value="soon">1-3 months</SelectItem>
                    <SelectItem value="later">3-6 months</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>Relocation Needs</Label>
                <Textarea value={formData.message} onChange={e => setFormData({...formData, message: e.target.value})} className="min-h-[100px]" placeholder="Tell us about your requirements..." />
              </div>
              <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700" disabled={leadMutation.isPending}>
                <MessageCircle className="w-4 h-4 mr-2" />
                {leadMutation.isPending ? "Sending..." : "Get My Relocation Plan"}
              </Button>
            </form>
          </Card>
        </div>
      </section>

      {/* Visa Divider */}
      <section className="py-20 border-t border-slate-200 dark:border-slate-800">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-2xl font-bold mb-4">Need Visa or Golden Visa Support?</h2>
          <p className="text-muted-foreground mb-8">Our specialized visa team handles 10-year residency, family sponsorship, and professional visa processing separately from physical relocation.</p>
          <Link href="/relocate/visa">
            <Button size="lg" variant="outline" className="border-amber-500 text-amber-600 hover:bg-amber-50">
              Go to Visa Services
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
}
