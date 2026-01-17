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
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
import { 
  Shield, 
  ArrowRight,
  Briefcase,
  Home,
  CheckCircle2,
  DollarSign,
  Award,
  Check,
  Star,
  Quote,
  Building,
  Globe,
  TrendingUp,
  Landmark
} from "lucide-react";
import dubaiMarinaAerial from "@assets/stock_images/dubai_skyline_modern_806b4a5e.jpg";
import professionalOffice from "@assets/stock_images/luxury_dubai_lifesty_e9f4e72e.jpg";

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

  const testimonials = [
    {
      name: "Michael Chen",
      role: "Tech Founder",
      location: "Relocated from Singapore",
      content: "DeliWer's Golden Visa strategy was game-changing. Within 60 days, my company was set up in a free zone, I had 10-year residency secured, and my family received Golden Visa sponsorship.",
      rating: 5,
      capital: "$2M+ relocated"
    },
    {
      name: "Sarah Al-Rashid",
      role: "Investment Director",
      location: "Relocated from London",
      content: "As a non-dom struggling with UK tax, Dubai's Golden Visa program via DeliWer was perfect. Zero personal income tax and direct access to DIFC and DMCC opportunities.",
      rating: 5,
      capital: "$5M+ relocated"
    },
    {
      name: "The Martinez Family",
      role: "Family of 5",
      location: "Relocated from Miami",
      content: "Moving with three kids seemed daunting. DeliWer handled everything - Golden Visa pathways for the whole family, residency secured for 10 years.",
      rating: 5,
      familySize: "5 members"
    }
  ];

  const faqItems = [
    {
      question: "What are the Golden Visa pathways available in Dubai?",
      answer: "The UAE offers multiple Golden Visa routes: (1) Real estate investment (AED 2M+), (2) Business establishment, (3) Investor visas (AED 10M+ portfolio), (4) Talent visas for executives/specialists. DeliWer guides you to the optimal pathway."
    },
    {
      question: "Can my spouse and children get Golden Visas too?",
      answer: "Yes. Golden Visa family sponsorship allows your spouse and dependent children to receive 10-year residency visas, creating long-term stability for your family."
    },
    {
      question: "How long does it take to get a Golden Visa?",
      answer: "Golden Visa processing typically takes 30-60 days for real estate investments or business establishment. Our expedited network accelerates this significantly."
    },
    {
      question: "Is there really 0% personal income tax in Dubai?",
      answer: "Yes, the UAE has zero personal income tax, no capital gains tax, and no inheritance tax. This applies whether you earn through a business, investments, or employment."
    }
  ];

  const businessAdvantages = [
    { icon: DollarSign, title: "0% Personal Income Tax", description: "Zero tax on your personal income + capital gains + inheritance" },
    { icon: Building, title: "Golden Visa Program", description: "10-year residency for you, spouse & children via investment or business" },
    { icon: Globe, title: "Fastest Business Setup", description: "1-3 days to operational status across UAE free zones" },
    { icon: Shield, title: "100% Foreign Ownership", description: "Mainland, DIFC, DMCC, DAFZA, Dubai South—all accessible" },
    { icon: TrendingUp, title: "Capital Relocation Hub", description: "Strategic structuring for wealth protection & tax optimization" },
    { icon: Landmark, title: "Unified Ecosystem", description: "One pathway covers business, family, capital, and residency" }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>UAE Golden Visa & Visa Services | Dubai Residency | DeliWer</title>
        <meta name="description" content="Secure your 10-year UAE Golden Visa. Expert guidance on investment, talent, and business residency pathways in Dubai." />
      </Helmet>

      {/* Hero Section */}
      <section className="relative h-[80vh] min-h-[600px] overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${dubaiMarinaAerial})` }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black/70" />
        <div className="relative z-10 h-full flex flex-col justify-center items-center text-center px-4">
          <Badge className="mb-4 bg-blue-500/20 text-blue-400 border-blue-500/30">
            Residency & Visas
          </Badge>
          <h1 className="text-4xl md:text-7xl font-black text-white mb-6">
            UAE Golden Visa <span className="text-blue-400">Services</span>
          </h1>
          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            Your gateway to 10-year residency, tax optimization, and a global lifestyle. Unified visa processing for you and your family.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button size="lg" className="bg-blue-600 hover:bg-blue-700 font-bold h-14 px-8 rounded-full" onClick={() => formRef.current?.scrollIntoView({ behavior: 'smooth' })}>
              Start Visa Application
            </Button>
            <Link href="/relocate">
              <Button size="lg" variant="outline" className="text-white border-white/20 hover:bg-white/10 h-14 px-8 rounded-full">
                Need Relocation? Visit Relocate
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Advantages Section */}
      <section className="py-20 bg-white dark:bg-slate-950">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Why Choose Dubai's Golden Visa?</h2>
            <p className="text-muted-foreground">The world's most competitive residency program for investors and founders.</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {businessAdvantages.map((adv, i) => (
              <div key={i} className="flex gap-4 p-6 rounded-2xl bg-slate-50 dark:bg-slate-900 hover-elevate transition-all">
                <div className="w-12 h-12 rounded-xl bg-blue-500/10 flex items-center justify-center shrink-0">
                  <adv.icon className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <h3 className="font-bold text-lg mb-1">{adv.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{adv.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pathways Grid */}
      <section className="py-20 bg-slate-50 dark:bg-slate-900/50">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Residency Pathways</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">Choose the residency route that best fits your investment or professional profile.</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {visaPathways.map((path, i) => (
              <Card key={i} className={`${path.color} border-none backdrop-blur-sm hover-elevate shadow-xl`}>
                <CardContent className="pt-8">
                  <path.icon className="w-10 h-10 text-white mb-6" />
                  <p className="text-xs font-bold text-white/70 uppercase tracking-wider mb-1">{path.title}</p>
                  <p className="text-2xl font-bold text-white mb-3">{path.amount}</p>
                  <p className="text-sm text-white/80 leading-relaxed">{path.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-24 bg-white dark:bg-slate-950">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-16">Investor Success Stories</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((t, i) => (
              <Card key={i} className="bg-slate-50 dark:bg-slate-900 border-none shadow-sm hover-elevate">
                <CardContent className="pt-8">
                  <div className="flex gap-1 mb-4">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                  <Quote className="w-8 h-8 text-blue-500/20 mb-4" />
                  <p className="text-muted-foreground italic mb-6">"{t.content}"</p>
                  <div className="border-t pt-4">
                    <p className="font-bold">{t.name}</p>
                    <p className="text-xs text-blue-600 font-semibold">{t.role}</p>
                    <p className="text-xs text-muted-foreground">{t.location}</p>
                    <Badge variant="outline" className="mt-3 bg-blue-500/5 text-blue-600 border-blue-200">
                      {t.capital || t.familySize}
                    </Badge>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Unified Advantage */}
      <section className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-slate-950 opacity-90" />
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900/20 to-transparent" />
        <div className="relative z-10 max-w-4xl mx-auto px-4 text-center">
          <div className="bg-blue-600 rounded-3xl p-8 md:p-12 text-white shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 right-0 p-4 opacity-10">
              <Shield className="w-32 h-32" />
            </div>
            <h3 className="text-3xl font-bold mb-6">The DeliWer Visa Advantage</h3>
            <p className="text-lg text-blue-100 mb-10 leading-relaxed">
              We coordinate your entire residency journey, ensuring your Golden Visa integrates perfectly with your business setup and long-term goals in the UAE.
            </p>
            <div className="grid sm:grid-cols-3 gap-6">
              <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/10">
                <p className="font-black text-3xl mb-1">100%</p>
                <p className="text-xs text-blue-200 font-bold uppercase tracking-widest">Success Rate</p>
              </div>
              <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/10">
                <p className="font-black text-3xl mb-1">30-60</p>
                <p className="text-xs text-blue-200 font-bold uppercase tracking-widest">Day Processing</p>
              </div>
              <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/10">
                <p className="font-black text-3xl mb-1">Full</p>
                <p className="text-xs text-blue-200 font-bold uppercase tracking-widest">Family Support</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Lead Form */}
      <section id="lead-form" ref={formRef} className="py-24 bg-white dark:bg-slate-950">
        <div className="max-w-3xl mx-auto px-4">
          <Card className="p-8 md:p-12 shadow-3xl border-blue-100 dark:border-blue-900/30">
            <div className="text-center mb-10">
              <h2 className="text-3xl font-black mb-4">Visa Eligibility Check</h2>
              <p className="text-muted-foreground text-lg">Receive a personalized Golden Visa assessment within 24 hours.</p>
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
              <div className="space-y-2">
                <Label className="text-base">Visa Pathway Interest</Label>
                <Select value={formData.visaType} onValueChange={v => setFormData({...formData, visaType: v})}>
                  <SelectTrigger className="h-12 text-lg"><SelectValue placeholder="Select interest" /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="real-estate">Real Estate (AED 2M+)</SelectItem>
                    <SelectItem value="business">Business / Entrepreneur</SelectItem>
                    <SelectItem value="talent">Specialized Talent / Executive</SelectItem>
                    <SelectItem value="investor">Investor (AED 10M+)</SelectItem>
                    <SelectItem value="other">Other UAE Visa</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label className="text-base">Message</Label>
                <Textarea value={formData.message} onChange={e => setFormData({...formData, message: e.target.value})} className="min-h-[120px] text-lg" />
              </div>
              <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 h-14 text-xl font-bold rounded-full" disabled={leadMutation.isPending}>
                {leadMutation.isPending ? "Submitting..." : "Get Free Assessment"}
              </Button>
            </form>
          </Card>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-24 bg-slate-50 dark:bg-slate-900/50">
        <div className="max-w-3xl mx-auto px-4">
          <h2 className="text-3xl font-bold mb-12 text-center">Residency FAQs</h2>
          <Accordion type="single" collapsible className="w-full space-y-4">
            {faqItems.map((item, i) => (
              <AccordionItem key={i} value={`item-${i}`} className="bg-white dark:bg-slate-900 border rounded-2xl px-6">
                <AccordionTrigger className="text-lg hover:no-underline">{item.question}</AccordionTrigger>
                <AccordionContent className="text-muted-foreground text-base pb-6 leading-relaxed">
                  {item.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>
    </div>
  );
}
