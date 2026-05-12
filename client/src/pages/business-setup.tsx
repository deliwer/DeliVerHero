import { useState, useEffect, useRef } from "react";
import { SEOMeta } from "@/components/seo-meta";
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
  ClipboardCheck,
  HelpCircle,
  Phone,
  Settings
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
    <div className="min-h-screen bg-background flex">
      {/* Sidebar / Support Menu */}
      <aside className="hidden lg:flex w-64 flex-col bg-slate-900 border-r border-slate-800 p-6 space-y-8 sticky top-0 h-screen">
        <div className="space-y-4">
          <h3 className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Business Support</h3>
          <nav className="space-y-2">
            <Link href="/relocate/business-setup" className="flex items-center gap-3 px-3 py-2 rounded-lg bg-emerald-500/10 text-emerald-400">
              <Building2 className="w-4 h-4" />
              <span className="text-sm font-medium">Company Setup</span>
            </Link>
            <Link href="/relocate/pricing" className="flex items-center gap-3 px-3 py-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors">
              <DollarSign className="w-4 h-4" />
              <span className="text-sm font-medium">Pricing Plans</span>
            </Link>
          </nav>
        </div>

        <div className="space-y-4">
          <h3 className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Global Move</h3>
          <nav className="space-y-2">
            <Link href="/relocate" className="flex items-center gap-3 px-3 py-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors">
              <Globe className="w-4 h-4" />
              <span className="text-sm font-medium">Relocate Home</span>
            </Link>
          </nav>
        </div>

        <div className="mt-auto space-y-4 pt-8 border-t border-slate-800">
          <div className="flex items-center gap-3 px-3 py-2 text-slate-400">
            <Phone className="w-4 h-4" />
            <span className="text-sm">+971 4 250 1500</span>
          </div>
          <Button variant="outline" className="w-full border-slate-700 text-slate-300 hover:bg-slate-800">
            <HelpCircle className="w-4 h-4 mr-2" />
            Help Center
          </Button>
        </div>
      </aside>

      <main className="flex-1">
        <SEOMeta
          title="Business Setup Dubai | Free Zone & Mainland Company Formation | DeliWer"
          description="Set up a company in Dubai with expert support. DeliWer handles Free Zone and mainland license applications, PRO services, visa assistance, and document clearing. Fast-track your Dubai business formation via WhatsApp."
          canonical="https://www.deliwer.com/business-setup"
          keywords="Business Setup Dubai, Dubai company formation, Free Zone Dubai, DAFZA company setup, Dubai South free zone, mainland trade license Dubai, PRO services Dubai, Golden Visa Dubai, visa assistance Dubai, company registration Dubai, DeliWer business setup"
          faqs={[
            { question: "How do I set up a company in Dubai?", answer: "To set up a company in Dubai you choose between a Free Zone license (DAFZA, Dubai South, Commercity, etc.) or a mainland trade license. DeliWer guides you through selecting the right structure, prepares the documents, and coordinates with the relevant authorities. WhatsApp +971523946311 to start." },
            { question: "What is the difference between Free Zone and mainland in Dubai?", answer: "A Dubai Free Zone company is 100% foreign-owned and ideal for international business, but restricted from trading directly within the UAE market. A mainland company can trade anywhere in the UAE but requires a local service agent or partner for some license types. DeliWer helps you choose the right structure." },
            { question: "How long does Dubai business setup take?", answer: "Free Zone company formation in Dubai can take 3–7 business days with correct documents. Mainland licenses typically take 5–14 business days. DeliWer fast-tracks the process by coordinating all filings and follow-ups." },
            { question: "Can I get a UAE Golden Visa through business setup?", answer: "Yes. Qualifying business owners and investors in Dubai can apply for a 5–10 year UAE Golden (Investor) Visa. DeliWer can coordinate both the company setup and the Golden Visa application simultaneously." }
          ]}
          serviceSchema={{ name: "Dubai Business Setup & Company Formation", description: "DeliWer handles Free Zone and mainland company formation, PRO services, visa assistance, and document clearing for businesses in Dubai." }}
          dateModified="2026-05-12"
        />

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

      {/* Comparison Table Section (Moved from Relocate) */}
      <section className="relative py-20 overflow-hidden bg-slate-950">
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-30"
          style={{ backgroundImage: `url(${professionalOffice})` }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950/90 via-slate-900/85 to-slate-950/90" />
        <div className="relative z-10 max-w-6xl mx-auto px-4">
          <div className="text-center mb-12">
            <h3 className="text-3xl md:text-4xl font-bold text-white mb-3">Dubai vs Premium Free Zones</h3>
            <p className="text-gray-200 text-lg">Why DeliWer's unified approach outperforms fragmented free zone setups</p>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-slate-800/60 border-b border-slate-600">
                  <th className="text-left py-4 px-4 font-semibold text-white">Feature</th>
                  <th className="text-center py-4 px-4 font-semibold text-white">DIFC</th>
                  <th className="text-center py-4 px-4 font-semibold text-white">DMCC</th>
                  <th className="text-center py-4 px-4 font-semibold text-white">DAFZA</th>
                  <th className="text-center py-4 px-4 font-semibold text-white">Dubai South</th>
                  <th className="text-center py-4 px-4 font-semibold text-white bg-emerald-600/40 border-l border-emerald-500">DeliWer (Unified)</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-slate-700 hover:bg-slate-800/30">
                  <td className="py-4 px-4 text-white font-medium">Golden Visa Eligibility</td>
                  <td className="text-center py-4 px-4 text-gray-400">⚠️ Limited</td>
                  <td className="text-center py-4 px-4 text-gray-400">⚠️ Limited</td>
                  <td className="text-center py-4 px-4 text-gray-400">⚠️ Limited</td>
                  <td className="text-center py-4 px-4 text-gray-400">⚠️ Limited</td>
                  <td className="text-center py-4 px-4 text-emerald-300 bg-emerald-600/20 border-l border-emerald-500 font-semibold">✓ Clear Paths</td>
                </tr>
                <tr className="border-b border-slate-700 hover:bg-slate-800/30">
                  <td className="py-4 px-4 text-white font-medium">Family Visa Included</td>
                  <td className="text-center py-4 px-4 text-gray-400">❌ No</td>
                  <td className="text-center py-4 px-4 text-gray-400">❌ No</td>
                  <td className="text-center py-4 px-4 text-gray-400">❌ No</td>
                  <td className="text-center py-4 px-4 text-gray-400">❌ No</td>
                  <td className="text-center py-4 px-4 text-emerald-300 bg-emerald-600/20 border-l border-emerald-500 font-semibold">✓ Spouse + Kids</td>
                </tr>
                <tr className="border-b border-slate-700 hover:bg-slate-800/30">
                  <td className="py-4 px-4 text-white font-medium">Business Setup Speed</td>
                  <td className="text-center py-4 px-4 text-gray-300">1-2 weeks</td>
                  <td className="text-center py-4 px-4 text-gray-300">1-2 weeks</td>
                  <td className="text-center py-4 px-4 text-gray-300">1-3 days</td>
                  <td className="text-center py-4 px-4 text-gray-300">1-3 days</td>
                  <td className="text-center py-4 px-4 text-emerald-300 bg-emerald-600/20 border-l border-emerald-500 font-semibold">✓ 1-3 days</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>
      </main>
    </div>
  );
}

