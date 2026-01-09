import { useState, useEffect, useRef } from "react";
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
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
import { 
  Building2, 
  DollarSign, 
  CheckCircle2, 
  Briefcase, 
  Building, 
  Landmark, 
  Shield, 
  Globe, 
  TrendingUp, 
  MessageCircle, 
  Award,
  ArrowRight,
  FileText,
  UserCheck,
  ClipboardCheck
} from "lucide-react";
import professionalOffice from "@assets/generated_images/professional_team_in_modern_corporate_office_space.png";
import coworkingOffice from "@assets/stock_images/modern_office_cowork_bfc0360b.jpg";
import businessTeamMeeting from "@assets/generated_images/diverse_business_team_in_dubai_office_meeting.png";
import foundersSuccess from "@assets/generated_images/international_founders_celebrating_startup_success.png";
import dubaiBusiness from "@assets/generated_images/dubai_skyline_with_modern_business_architecture.png";

export default function BusinessSetup() {
  const { toast } = useToast();
  const formRef = useRef<HTMLDivElement>(null);
  
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    businessType: "",
    timeline: "",
    message: "I am interested in Business Setup and Corporate Services in Dubai.",
  });

  const leadMutation = useMutation({
    mutationFn: async (data: typeof formData) => {
      return apiRequest("POST", "/api/relocate/leads", data);
    },
    onSuccess: () => {
      toast({
        title: "Enquiry Sent",
        description: "Our corporate specialists will contact you shortly.",
      });
      setFormData({
        name: "",
        email: "",
        phone: "",
        businessType: "",
        timeline: "",
        message: "",
      });
    },
  });

  const businessServices = [
    {
      icon: Building2,
      title: "Company Setup",
      description: "Fast-track company formation in Free Zones or Mainland",
      features: ["License Issuance", "MOA Drafting", "Office Solutions", "Corporate Bank Accounts"]
    },
    {
      icon: UserCheck,
      title: "PRO Services",
      description: "Expert government liaison and document processing",
      features: ["Labor & Immigration", "Trade License Renewals", "Legal Translations", "Notary Services"]
    },
    {
      icon: ClipboardCheck,
      title: "Visa Assistance",
      description: "Complete residency and visa management for teams",
      features: ["Investor Visas", "Employee Visas", "Family Sponsorship", "Visa Renewals"]
    },
    {
      icon: FileText,
      title: "Document Clearing",
      description: "End-to-end administrative and renewal management",
      features: ["Document Attestation", "Trade Name Approval", "Ministry Approvals", "Renewal Tracking"]
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>Business Setup Dubai | Company Formation & PRO Services | DeliWer</title>
        <meta name="description" content="Professional company setup, PRO services, and visa assistance in Dubai. Fast-track your business with DeliWer's corporate services management." />
      </Helmet>

      {/* Hero Section */}
      <section className="relative py-24 flex items-center justify-center overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${dubaiBusiness})` }}
        />
        <div className="absolute inset-0 bg-slate-950/80" />
        <div className="relative z-10 max-w-5xl mx-auto px-4 text-center">
          <Badge className="mb-4 bg-emerald-500/20 text-emerald-400 border-emerald-500/30">
            Corporate Services
          </Badge>
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
            Business Setup in <span className="text-emerald-400">Dubai</span>
          </h1>
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            Strategic company formation, PRO services, and visa assistance for global entrepreneurs and investors.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button size="lg" className="bg-emerald-600 hover:bg-emerald-700" onClick={() => formRef.current?.scrollIntoView({ behavior: 'smooth' })}>
              Start Your Setup
            </Button>
            <Link href="/relocate">
              <Button size="lg" variant="outline" className="text-white border-white/20 hover:bg-white/10">
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
            <h2 className="text-3xl font-bold mb-4">Core Corporate Services</h2>
            <p className="text-muted-foreground">Everything you need to establish and manage your business presence in the UAE.</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {businessServices.map((service, i) => (
              <Card key={i} className="border-none shadow-lg hover-elevate bg-white dark:bg-slate-900">
                <CardHeader>
                  <div className="w-12 h-12 rounded-lg bg-emerald-500/10 flex items-center justify-center mb-4">
                    <service.icon className="w-6 h-6 text-emerald-600" />
                  </div>
                  <CardTitle>{service.title}</CardTitle>
                  <CardDescription>{service.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {service.features.map((f, j) => (
                      <li key={j} className="flex items-center text-sm gap-2">
                        <CheckCircle2 className="w-4 h-4 text-emerald-500" />
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

      {/* Lead Form */}
      <section id="lead-form" ref={formRef} className="py-20 relative">
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-10"
          style={{ backgroundImage: `url(${coworkingOffice})` }}
        />
        <div className="relative z-10 max-w-3xl mx-auto px-4">
          <Card className="p-8 shadow-2xl">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold">Consult with our Experts</h2>
              <p className="text-muted-foreground">Receive a personalized roadmap for your Dubai business setup.</p>
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
                <Label>Business Type</Label>
                <Select value={formData.businessType} onValueChange={v => setFormData({...formData, businessType: v})}>
                  <SelectTrigger><SelectValue placeholder="Select business type" /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="freezone">Free Zone</SelectItem>
                    <SelectItem value="mainland">Mainland LLC</SelectItem>
                    <SelectItem value="offshore">Offshore</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>Message</Label>
                <Textarea value={formData.message} onChange={e => setFormData({...formData, message: e.target.value})} className="min-h-[100px]" />
              </div>
              <Button type="submit" className="w-full bg-emerald-600 hover:bg-emerald-700" disabled={leadMutation.isPending}>
                {leadMutation.isPending ? "Submitting..." : "Get Started"}
              </Button>
            </form>
          </Card>
        </div>
      </section>
    </div>
  );
}
