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
  Building2, 
  Users, 
  Plane, 
  Shield, 
  ArrowRight,
  Briefcase,
  Home,
  Landmark,
  CheckCircle2,
  TrendingUp,
  Heart,
  GraduationCap,
  Leaf,
  ShoppingBag,
  Sun,
  DollarSign,
  Scale,
  Send,
  Baby,
  Stethoscope,
  Building,
  Star,
  Quote,
  Calendar,
  HelpCircle,
  Phone,
  MessageCircle
} from "lucide-react";
import dubaiSkyline from "@assets/stock_images/dubai_skyline_modern_806b4a5e.jpg";
import dubaiLifestyle from "@assets/stock_images/luxury_dubai_lifesty_e9f4e72e.jpg";
import dubaiFamily from "@assets/stock_images/dubai_family_diverse_5745a5cf.jpg";
import wellnessResidence from "@assets/stock_images/modern_wellness_luxu_b13619f6.jpg";
import coworkingOffice from "@assets/stock_images/modern_office_cowork_bfc0360b.jpg";

export default function Relocate() {
  const { toast } = useToast();
  const searchString = useSearch();
  const formRef = useRef<HTMLDivElement>(null);
  const [audienceType, setAudienceType] = useState<"consumer" | "business">("consumer");
  
  // Parse service query parameter for direct booking flow
  const serviceParam = new URLSearchParams(searchString).get("service");
  
  const getServiceMessage = () => {
    if (serviceParam === "smart-home") {
      return "I'm interested in a Smart Home consultation for water filtration and home automation setup.";
    } else if (serviceParam === "home-service") {
      return "I'm interested in Home Service consultation including installation and maintenance options.";
    }
    return "";
  };
  
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    capitalRange: "",
    familySize: "",
    businessType: "",
    timeline: "",
    message: getServiceMessage()
  });
  
  // Auto-scroll to form and pre-fill message when service param is present
  useEffect(() => {
    if (serviceParam && formRef.current) {
      setTimeout(() => {
        formRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 500);
      setFormData(prev => ({ ...prev, message: getServiceMessage() }));
    }
  }, [serviceParam]);

  const leadMutation = useMutation({
    mutationFn: async (data: typeof formData & { audienceType: string }) => {
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
        capitalRange: "",
        familySize: "",
        businessType: "",
        timeline: "",
        message: ""
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

  const testimonials = [
    {
      name: "Michael Chen",
      role: "Tech Founder",
      location: "Relocated from Singapore",
      content: "DeliWer made our move seamless. Within 3 weeks, we had our company set up, visas processed, and kids enrolled in top international schools. The ROI on their consulting fee was immediate.",
      rating: 5,
      capital: "$2M+ relocated"
    },
    {
      name: "Sarah Al-Rashid",
      role: "Investment Director",
      location: "Relocated from London",
      content: "The tax savings alone in the first year covered their entire consulting fee 10x over. Their network of partners for real estate and banking is unmatched.",
      rating: 5,
      capital: "$5M+ relocated"
    },
    {
      name: "The Martinez Family",
      role: "Family of 5",
      location: "Relocated from Miami",
      content: "Moving with three kids seemed daunting. DeliWer handled everything - school applications, housing, healthcare setup. We felt at home within weeks.",
      rating: 5,
      familySize: "5 members"
    }
  ];

  const faqItems = [
    {
      question: "How long does the Dubai relocation process take?",
      answer: "For business setup, most companies can be operational within 1-3 days. Family relocation typically takes 2-4 weeks for full settlement including visas, housing, and school enrollment. Our expedited service can reduce this timeline significantly."
    },
    {
      question: "What is the minimum investment for a Golden Visa?",
      answer: "The UAE Golden Visa requires a minimum AED 2 million ($545,000 USD) investment in real estate, or establishing a company with minimum capital requirements. We help you structure investments to maximize visa benefits while meeting your financial goals."
    },
    {
      question: "Is there really 0% personal income tax in Dubai?",
      answer: "Yes, the UAE has no personal income tax, no capital gains tax, and no inheritance tax. Corporate tax was introduced at 9% for profits over AED 375,000, but many free zone companies remain exempt. We structure your presence to maximize these benefits legally."
    },
    {
      question: "What schools are available for expatriate children?",
      answer: "Dubai has 200+ international schools offering British, American, IB, Indian, French, and other curricula. Top schools include GEMS, JESS, Dubai College, and more. We help with school selection, applications, and securing admission."
    },
    {
      question: "How does DeliWer help with capital relocation?",
      answer: "We provide end-to-end consulting including: legal compliance for wealth transfer, optimal corporate structuring, banking relationships, real estate investment for Golden Visa eligibility, and ongoing advisory for tax optimization."
    },
    {
      question: "What makes Dubai safer than other relocation destinations?",
      answer: "Dubai consistently ranks among the world's safest cities with extremely low crime rates, political stability, world-class healthcare, and a family-friendly environment. The UAE's strict laws and efficient enforcement create a secure living environment."
    }
  ];

  const consumerServices = [
    {
      icon: Home,
      title: "Family Relocation",
      description: "End-to-end relocation support for individuals and families moving to Dubai",
      features: ["Housing Assistance", "School Enrollment", "Healthcare Setup", "Banking Services"]
    },
    {
      icon: GraduationCap,
      title: "Education Planning",
      description: "Navigate Dubai's world-class international school system for your children",
      features: ["School Selection", "Admission Support", "Curriculum Guidance", "Extracurricular Activities"]
    },
    {
      icon: Stethoscope,
      title: "Healthcare Access",
      description: "Connect with premium healthcare providers and secure comprehensive coverage",
      features: ["Hospital Registration", "Insurance Setup", "Specialist Referrals", "Emergency Care Access"]
    },
    {
      icon: Heart,
      title: "Lifestyle Concierge",
      description: "Personalized support for settling into your new Dubai lifestyle",
      features: ["Community Integration", "Social Networking", "Recreation Planning", "Cultural Orientation"]
    }
  ];

  const businessServices = [
    {
      icon: DollarSign,
      title: "Capital Relocation",
      description: "Strategic tax optimization and wealth structuring for global investors",
      features: ["Tax-Free Income", "Wealth Structuring", "Asset Protection", "Investment Advisory"]
    },
    {
      icon: Building2,
      title: "Business Setup",
      description: "Company formation, licensing, and corporate structuring in UAE free zones and mainland",
      features: ["Free Zone Setup", "Mainland LLC", "Branch Office", "Visa Processing"]
    },
    {
      icon: Building,
      title: "Real Estate Investment",
      description: "Access exclusive investment properties with Golden Visa eligibility",
      features: ["Off-Plan Projects", "Commercial Assets", "Golden Visa Properties", "Portfolio Management"]
    },
    {
      icon: Landmark,
      title: "Legal & Compliance",
      description: "Expert legal counsel for business operations, contracts, and regulatory compliance",
      features: ["Contract Review", "Regulatory Compliance", "IP Protection", "Labor Law"]
    }
  ];

  const consumerAdvantages = [
    { icon: Shield, title: "World's Safest City", description: "Low crime rate and family-friendly environment" },
    { icon: GraduationCap, title: "Top International Schools", description: "200+ schools offering global curricula" },
    { icon: Heart, title: "World-Class Healthcare", description: "JCI-accredited hospitals and specialists" },
    { icon: Sun, title: "Year-Round Sunshine", description: "Perfect weather for outdoor living" },
    { icon: Baby, title: "Family-Focused Culture", description: "Child-friendly amenities everywhere" },
    { icon: ShoppingBag, title: "Premium Lifestyle", description: "World-class shopping and entertainment" }
  ];

  const businessAdvantages = [
    { icon: DollarSign, title: "0% Personal Income Tax", description: "Keep more of what you earn" },
    { icon: Shield, title: "Political Stability", description: "Safe haven for global capital" },
    { icon: Globe, title: "Strategic Location", description: "Gateway between East and West" },
    { icon: TrendingUp, title: "Business-Friendly", description: "Rapid company setup in 1-3 days" },
    { icon: Building, title: "Golden Visa Program", description: "10-year residency for investors" },
    { icon: Landmark, title: "Free Zone Benefits", description: "100% foreign ownership allowed" }
  ];

  const comparisonData = [
    { city: "Dubai", taxFree: true, businessSetup: "1-3 days", safety: "Very High", lifestyle: "Luxury + Zen", sustainability: "Advanced", highlight: true },
    { city: "Singapore", taxFree: false, businessSetup: "1-2 weeks", safety: "Very High", lifestyle: "Modern", sustainability: "High", highlight: false },
    { city: "Panama", taxFree: true, businessSetup: "2-4 weeks", safety: "Moderate", lifestyle: "Relaxed", sustainability: "Moderate", highlight: false },
    { city: "Georgia", taxFree: false, businessSetup: "1 week", safety: "Moderate", lifestyle: "Emerging", sustainability: "Low", highlight: false }
  ];

  const consumerLifestyleFeatures = [
    { icon: Sun, title: "Year-Round Sunshine", description: "300+ days of clear skies for family activities" },
    { icon: Baby, title: "Family-Friendly", description: "Parks, beaches, and entertainment for all ages" },
    { icon: Heart, title: "Health & Wellness", description: "World-class spas, gyms, and wellness centers" },
    { icon: ShoppingBag, title: "Premium Amenities", description: "World-class malls, restaurants, and leisure" }
  ];

  const businessLifestyleFeatures = [
    { icon: Globe, title: "Global Connectivity", description: "Direct flights to 260+ destinations" },
    { icon: Building, title: "Premium Offices", description: "World-class business districts and co-working" },
    { icon: Leaf, title: "Sustainable Living", description: "Green initiatives and eco-conscious communities" },
    { icon: Heart, title: "Work-Life Balance", description: "Zen living meets professional excellence" }
  ];

  const services = audienceType === "consumer" ? consumerServices : businessServices;
  const advantages = audienceType === "consumer" ? consumerAdvantages : businessAdvantages;
  const lifestyleFeatures = audienceType === "consumer" ? consumerLifestyleFeatures : businessLifestyleFeatures;

  const heroTagline = audienceType === "consumer" 
    ? "A calm, thoughtful approach to relocating your family. Expert guidance for those seeking safety, quality education, and a sustainable way of life."
    : "A trusted advisory for founders, investors, and families considering Dubai as their next chapter. Private consultations tailored to your goals.";

  const sectionTitle = audienceType === "consumer" 
    ? "Why Families Choose Dubai"
    : "Capital Relocation Consulting";

  const sectionDescription = audienceType === "consumer"
    ? "Discover why Dubai is the top choice for families seeking safety, education, and quality of life."
    : "Our flagship service: strategic guidance for high-net-worth individuals and businesses seeking to optimize their global footprint through Dubai.";

  const formTitle = audienceType === "consumer"
    ? "Begin Your Family's Journey"
    : "Book a Private Relocation Conversation";

  const formDescription = audienceType === "consumer"
    ? "Share a few details and our family relocation advisors will reach out for a private, no-obligation conversation."
    : "Share a few details and our expert advisors will schedule a confidential consultation tailored to your goals.";

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    leadMutation.mutate({ ...formData, audienceType });
  };

  const schemaOrgData = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    "name": "DeliWer Relocation Consulting",
    "description": "Premium Dubai relocation consulting for families, investors, and businesses. Capital relocation, Golden Visa, business setup, and family settlement services.",
    "url": "https://deliwer.com/relocate",
    "logo": "https://deliwer.com/logo.png",
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Dubai",
      "addressCountry": "AE"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": "25.2048",
      "longitude": "55.2708"
    },
    "areaServed": ["Global", "UAE", "Dubai"],
    "serviceType": ["Relocation Consulting", "Capital Relocation", "Business Setup", "Golden Visa Services"],
    "priceRange": "$$$",
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.9",
      "reviewCount": "127"
    }
  };

  const faqSchemaData = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqItems.map(item => ({
      "@type": "Question",
      "name": item.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": item.answer
      }
    }))
  };

  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>Dubai Relocation Consulting | Capital & Family Relocation Services | DeliWer</title>
        <meta name="description" content="Expert Dubai relocation consulting for investors, families & businesses. 0% income tax, Golden Visa, business setup in 1-3 days. Free consultation. Start your Dubai journey today." />
        <meta name="keywords" content="Dubai relocation, capital relocation, Golden Visa UAE, Dubai business setup, family relocation Dubai, tax-free living, UAE immigration, Dubai expat services" />
        <link rel="canonical" href="https://deliwer.com/relocate" />
        
        <meta property="og:title" content="Dubai Relocation Consulting | Capital & Family Relocation | DeliWer" />
        <meta property="og:description" content="Relocate your capital, family & business to Dubai. 0% income tax, Golden Visa eligibility, business setup in 1-3 days. Expert consulting services." />
        <meta property="og:image" content="https://deliwer.com/og-relocate.jpg" />
        <meta property="og:url" content="https://deliwer.com/relocate" />
        <meta property="og:type" content="website" />
        
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Dubai Relocation Consulting | DeliWer" />
        <meta name="twitter:description" content="Expert Dubai relocation for investors & families. 0% tax, Golden Visa, fast business setup." />
        
        <script type="application/ld+json">{JSON.stringify(schemaOrgData)}</script>
        <script type="application/ld+json">{JSON.stringify(faqSchemaData)}</script>
      </Helmet>

      {/* Sticky Mobile CTA */}
      <div className="fixed bottom-0 left-0 right-0 z-50 p-3 bg-background/95 backdrop-blur-sm border-t md:hidden">
        <div className="flex gap-2">
          <a href="#lead-form" className="flex-1">
            <Button className="w-full" size="lg" data-testid="button-mobile-cta">
              <MessageCircle className="w-4 h-4 mr-2" />
              Book a Private Conversation
            </Button>
          </a>
          <a href="tel:+97142501500">
            <Button variant="outline" size="lg" data-testid="button-mobile-call">
              <Phone className="w-4 h-4" />
            </Button>
          </a>
        </div>
      </div>

      <section className="relative h-screen min-h-[600px] overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${dubaiSkyline})` }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black/70" />
        <div className="relative z-10 h-full flex flex-col justify-center items-center text-center px-4">
          <Badge variant="secondary" className="mb-6 bg-white/10 backdrop-blur-sm border-white/20 text-white" data-testid="badge-hero">
            <Globe className="w-3 h-3 mr-1" />
            The Modern Free-World Capital Hub
          </Badge>
          <h1 className="text-4xl md:text-5xl lg:text-7xl font-bold text-white mb-6 max-w-5xl" data-testid="text-hero-title">
            Relocate Capital.
            <span className="text-primary"> Rebalance Life.</span>
          </h1>
          <p className="text-lg md:text-xl text-white/90 mb-4 max-w-3xl" data-testid="text-hero-description">
            Dubai offers peace, opportunity, and global belonging — without compromise.
          </p>
          <p className="text-base text-white/70 mb-8 max-w-2xl" data-testid="text-hero-subtext">
            For families, founders, and investors choosing stability, sustainability, and long-term abundance.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <a href="#lead-form">
              <Button size="lg" className="bg-primary text-primary-foreground" data-testid="button-start-journey">
                <MessageCircle className="w-4 h-4 mr-2" />
                Book a Private Relocation Conversation
              </Button>
            </a>
            <Link href="/community">
              <Button size="lg" variant="outline" className="border-white/30 text-white backdrop-blur-sm bg-white/10" data-testid="button-community">
                <Users className="w-4 h-4 mr-2" />
                Stay Connected with Our Community
              </Button>
            </Link>
          </div>
          <div className="flex flex-wrap items-center justify-center gap-4 mt-8">
            <Button
              variant={audienceType === "consumer" ? "default" : "ghost"}
              size="sm"
              onClick={() => setAudienceType("consumer")}
              className={audienceType === "consumer" ? "" : "text-white/70"}
              data-testid="button-toggle-consumer"
            >
              <Users className="w-4 h-4 mr-2" />
              Individuals & Families
            </Button>
            <Button
              variant={audienceType === "business" ? "default" : "ghost"}
              size="sm"
              onClick={() => setAudienceType("business")}
              className={audienceType === "business" ? "" : "text-white/70"}
              data-testid="button-toggle-business"
            >
              <Briefcase className="w-4 h-4 mr-2" />
              Businesses & Investors
            </Button>
          </div>
        </div>
      </section>

      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <Badge variant="outline" className="mb-4">
              {audienceType === "consumer" ? (
                <><Users className="w-3 h-3 mr-1" />Family Benefits</>
              ) : (
                <><DollarSign className="w-3 h-3 mr-1" />Core Revenue Driver</>
              )}
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold mb-4" data-testid="text-capital-title">
              {sectionTitle}
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              {sectionDescription}
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {advantages.map((advantage, index) => (
              <Card key={index} className="text-center hover-elevate" data-testid={`card-advantage-${index}`}>
                <CardContent className="pt-6">
                  <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                    <advantage.icon className="w-7 h-7 text-primary" />
                  </div>
                  <h3 className="font-semibold text-lg mb-2">{advantage.title}</h3>
                  <p className="text-muted-foreground text-sm">{advantage.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
          <div className="text-center">
            <a href="#lead-form">
              <Button size="lg" data-testid="button-advantages-cta">
                <ArrowRight className="w-4 h-4 mr-2" />
                Get Your Free Consultation
              </Button>
            </a>
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4" data-testid="text-services-title">
              {audienceType === "consumer" ? "Family Relocation Services" : "Business & Investment Services"}
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              {audienceType === "consumer" 
                ? "Comprehensive support for your family's transition to Dubai"
                : "Comprehensive support for every step of your business journey"}
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {services.map((service, index) => (
              <Card key={index} className="hover-elevate" data-testid={`card-service-${index}`}>
                <CardHeader>
                  <div className="w-12 h-12 rounded-md bg-primary/10 flex items-center justify-center mb-4">
                    <service.icon className="w-6 h-6 text-primary" />
                  </div>
                  <CardTitle className="text-lg">{service.title}</CardTitle>
                  <CardDescription>{service.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {service.features.map((feature, idx) => (
                      <li key={idx} className="flex items-center gap-2 text-sm text-muted-foreground">
                        <CheckCircle2 className="w-4 h-4 text-primary" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* How People Actually Live in Dubai Section */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <Badge variant="outline" className="mb-4">
              <Home className="w-3 h-3 mr-1" />
              Real Life in Dubai
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold mb-4" data-testid="text-living-title">
              How People Actually Live in Dubai
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Beyond the headlines — discover the everyday reality of families, founders, and investors who call Dubai home.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {/* Tranquil Living */}
            <Card className="overflow-hidden" data-testid="card-tranquil-living">
              <div className="relative h-48">
                <img 
                  src={wellnessResidence} 
                  alt="Wellness-focused Dubai residence" 
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <div className="absolute bottom-4 left-4 right-4">
                  <Badge className="bg-white/20 backdrop-blur-sm border-white/30 text-white">
                    <Heart className="w-3 h-3 mr-1" />
                    Tranquil Living
                  </Badge>
                </div>
              </div>
              <CardContent className="pt-6">
                <h3 className="font-bold text-xl mb-3">Tranquil Residences & Conscious Living</h3>
                <p className="text-muted-foreground text-sm mb-4">
                  Dubai now offers wellness-focused residences designed for calm, longevity, and balance. 
                  Nature-integrated communities prioritize light, air quality, and mindful design.
                </p>
                <p className="text-xs text-muted-foreground italic">
                  Inspired by concepts such as Wellcube Life — wellness-driven, tranquil residential ecosystems.
                </p>
              </CardContent>
            </Card>

            {/* Fractional Ownership */}
            <Card className="overflow-hidden" data-testid="card-fractional-ownership">
              <div className="relative h-48">
                <img 
                  src={dubaiFamily} 
                  alt="Diverse Dubai community" 
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <div className="absolute bottom-4 left-4 right-4">
                  <Badge className="bg-white/20 backdrop-blur-sm border-white/30 text-white">
                    <TrendingUp className="w-3 h-3 mr-1" />
                    Modern Ownership
                  </Badge>
                </div>
              </div>
              <CardContent className="pt-6">
                <h3 className="font-bold text-xl mb-3">Fractional Ownership for a New World</h3>
                <p className="text-muted-foreground text-sm mb-4">
                  Live, invest, or diversify without full capital lock-in — an emerging model for global citizens 
                  seeking flexibility and reduced risk exposure.
                </p>
                <p className="text-xs text-muted-foreground italic">
                  An exploratory pathway for those considering partial ownership as part of modern capital allocation.
                </p>
              </CardContent>
            </Card>

            {/* Business Setup */}
            <Card className="overflow-hidden" data-testid="card-business-setup">
              <div className="relative h-48">
                <img 
                  src={coworkingOffice} 
                  alt="Dubai business ecosystem" 
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <div className="absolute bottom-4 left-4 right-4">
                  <Badge className="bg-white/20 backdrop-blur-sm border-white/30 text-white">
                    <Building2 className="w-3 h-3 mr-1" />
                    Business Ecosystem
                  </Badge>
                </div>
              </div>
              <CardContent className="pt-6">
                <h3 className="font-bold text-xl mb-3">Business Setup with Ecosystem Access</h3>
                <p className="text-muted-foreground text-sm mb-4">
                  From licensing to operational support, Dubai enables founders to establish quickly and scale globally. 
                  Free zones provide 100% ownership and streamlined processes.
                </p>
                <p className="text-xs text-muted-foreground italic">
                  Business ecosystems such as DubaiSouthBH illustrate how zones support international founders.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Why Dubai Now Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <Badge variant="outline" className="mb-4">
                <Globe className="w-3 h-3 mr-1" />
                Why Dubai, Why Now
              </Badge>
              <h2 className="text-3xl md:text-4xl font-bold mb-4" data-testid="text-why-dubai-title">
                The Modern Free World's Operating System
              </h2>
            </div>
            <div className="prose prose-lg max-w-none dark:prose-invert">
              <p className="text-lg text-muted-foreground text-center mb-8">
                Unlike other relocation hubs, Dubai uniquely combines what matters most to global citizens and families seeking a fresh start.
              </p>
              <div className="grid md:grid-cols-2 gap-6">
                <Card className="p-6" data-testid="card-dubai-advantage-1">
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <Shield className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <h4 className="font-semibold mb-2">Political Neutrality & Safety</h4>
                      <p className="text-sm text-muted-foreground">A stable haven with one of the world's lowest crime rates, welcoming all backgrounds equally.</p>
                    </div>
                  </div>
                </Card>
                <Card className="p-6" data-testid="card-dubai-advantage-2">
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <Building className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <h4 className="font-semibold mb-2">World-Class Infrastructure</h4>
                      <p className="text-sm text-muted-foreground">From healthcare to education to transport — everything works, and works exceptionally well.</p>
                    </div>
                  </div>
                </Card>
                <Card className="p-6" data-testid="card-dubai-advantage-3">
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <Users className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <h4 className="font-semibold mb-2">Cultural Diversity (200+ Nationalities)</h4>
                      <p className="text-sm text-muted-foreground">Your children grow up with global perspectives. Your network spans continents from day one.</p>
                    </div>
                  </div>
                </Card>
                <Card className="p-6" data-testid="card-dubai-advantage-4">
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <Heart className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <h4 className="font-semibold mb-2">Lifestyle + Ambition Coexistence</h4>
                      <p className="text-sm text-muted-foreground">Build your business by day, enjoy pristine beaches and world-class dining by evening.</p>
                    </div>
                  </div>
                </Card>
              </div>
              <div className="text-center mt-8">
                <p className="text-muted-foreground mb-6">
                  Panama, Georgia, and other emerging destinations offer pieces of the puzzle — Dubai delivers the complete picture.
                </p>
                <a href="#lead-form">
                  <Button size="lg" data-testid="button-why-dubai-cta">
                    <ArrowRight className="w-4 h-4 mr-2" />
                    Explore Your Dubai Pathway
                  </Button>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <Badge variant="outline" className="mb-4">
              <Star className="w-3 h-3 mr-1" />
              Success Stories
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold mb-4" data-testid="text-testimonials-title">
              Trusted by 500+ Relocated Families & Investors
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Real stories from clients who successfully relocated to Dubai with our guidance
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="relative" data-testid={`card-testimonial-${index}`}>
                <CardContent className="pt-6">
                  <Quote className="w-8 h-8 text-primary/20 absolute top-4 right-4" />
                  <div className="flex gap-1 mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-primary text-primary" />
                    ))}
                  </div>
                  <p className="text-muted-foreground mb-6 italic">"{testimonial.content}"</p>
                  <div className="border-t pt-4">
                    <p className="font-semibold">{testimonial.name}</p>
                    <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                    <p className="text-xs text-muted-foreground">{testimonial.location}</p>
                    <Badge variant="secondary" className="mt-2 text-xs">
                      {testimonial.capital || testimonial.familySize}
                    </Badge>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <Badge variant="outline" className="mb-4">
                <Heart className="w-3 h-3 mr-1" />
                {audienceType === "consumer" ? "Family Life" : "Lifestyle & Culture"}
              </Badge>
              <h2 className="text-3xl md:text-4xl font-bold mb-6" data-testid="text-lifestyle-title">
                {audienceType === "consumer" ? "A Safe & Enriching Life for Your Family" : "A Zen & Abundant Lifestyle"}
              </h2>
              <p className="text-muted-foreground mb-8">
                {audienceType === "consumer" 
                  ? "Dubai offers an exceptional quality of life for families. Enjoy world-class schools, safe neighborhoods, family-friendly entertainment, and a multicultural community that welcomes newcomers."
                  : "Dubai offers more than business opportunities. Enjoy safety, world-class amenities, and climate-conscious living in one of the world's most cosmopolitan cities."}
              </p>
              <div className="grid grid-cols-2 gap-4 mb-6">
                {lifestyleFeatures.map((feature, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-md bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <feature.icon className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <h4 className="font-medium text-sm">{feature.title}</h4>
                      <p className="text-xs text-muted-foreground">{feature.description}</p>
                    </div>
                  </div>
                ))}
              </div>
              <a href="#lead-form">
                <Button data-testid="button-lifestyle-cta">
                  <MessageCircle className="w-4 h-4 mr-2" />
                  Discuss Your Lifestyle Goals
                </Button>
              </a>
            </div>
            <div className="relative">
              <img 
                src={dubaiLifestyle} 
                alt="Dubai luxury lifestyle" 
                className="rounded-md shadow-lg w-full h-[400px] object-cover"
                data-testid="img-lifestyle"
              />
              <div className="absolute -bottom-6 -left-6 bg-card p-4 rounded-md shadow-lg">
                <p className="text-2xl font-bold text-primary">200+</p>
                <p className="text-sm text-muted-foreground">
                  {audienceType === "consumer" ? "International schools" : "Nationalities call Dubai home"}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="comparison" className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <Badge variant="outline" className="mb-4">
              <Globe className="w-3 h-3 mr-1" />
              Global Comparison
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold mb-4" data-testid="text-comparison-title">
              {audienceType === "consumer" 
                ? "Why Families Choose Dubai Over Other Cities"
                : "Why Dubai vs Other Free-World Cities"}
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              {audienceType === "consumer"
                ? "See how Dubai compares to other popular family relocation destinations"
                : "See how Dubai compares to other popular destinations for capital relocation"}
            </p>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse" data-testid="table-comparison">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-4 px-4 font-semibold">City</th>
                  <th className="text-center py-4 px-4 font-semibold">Tax-Free Income</th>
                  <th className="text-center py-4 px-4 font-semibold">Business Setup</th>
                  <th className="text-center py-4 px-4 font-semibold">Safety</th>
                  <th className="text-center py-4 px-4 font-semibold">Lifestyle</th>
                  <th className="text-center py-4 px-4 font-semibold">Sustainability</th>
                </tr>
              </thead>
              <tbody>
                {comparisonData.map((row, index) => (
                  <tr 
                    key={index} 
                    className={`border-b ${row.highlight ? "bg-primary/5" : ""}`}
                    data-testid={`row-comparison-${index}`}
                  >
                    <td className="py-4 px-4 font-medium">
                      {row.city}
                      {row.highlight && (
                        <Badge variant="default" className="ml-2 text-xs">Recommended</Badge>
                      )}
                    </td>
                    <td className="text-center py-4 px-4">
                      {row.taxFree ? (
                        <CheckCircle2 className="w-5 h-5 text-green-500 mx-auto" />
                      ) : (
                        <span className="text-muted-foreground">No</span>
                      )}
                    </td>
                    <td className="text-center py-4 px-4 text-muted-foreground">{row.businessSetup}</td>
                    <td className="text-center py-4 px-4">
                      <Badge variant={row.safety === "Very High" ? "default" : "secondary"}>
                        {row.safety}
                      </Badge>
                    </td>
                    <td className="text-center py-4 px-4 text-muted-foreground">{row.lifestyle}</td>
                    <td className="text-center py-4 px-4">
                      <Badge variant={row.sustainability === "Advanced" ? "default" : row.sustainability === "High" ? "secondary" : "outline"}>
                        {row.sustainability}
                      </Badge>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="text-center mt-8">
            <a href="#lead-form">
              <Button size="lg" data-testid="button-comparison-cta">
                <ArrowRight className="w-4 h-4 mr-2" />
                Get Your Dubai Relocation Plan
              </Button>
            </a>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-12">
              <Badge variant="outline" className="mb-4">
                <HelpCircle className="w-3 h-3 mr-1" />
                FAQ
              </Badge>
              <h2 className="text-3xl md:text-4xl font-bold mb-4" data-testid="text-faq-title">
                Frequently Asked Questions
              </h2>
              <p className="text-muted-foreground">
                Everything you need to know about relocating to Dubai
              </p>
            </div>
            <Accordion type="single" collapsible className="w-full" data-testid="accordion-faq">
              {faqItems.map((item, index) => (
                <AccordionItem key={index} value={`item-${index}`}>
                  <AccordionTrigger className="text-left" data-testid={`faq-trigger-${index}`}>
                    {item.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground" data-testid={`faq-content-${index}`}>
                    {item.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </section>

      <section id="lead-form" ref={formRef} className="py-20 bg-muted/50">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto">
            <div className="text-center mb-10">
              <Badge variant="outline" className="mb-4">
                <Send className="w-3 h-3 mr-1" />
                Get Started
              </Badge>
              <h2 className="text-3xl md:text-4xl font-bold mb-4" data-testid="text-form-title">
                {formTitle}
              </h2>
              <p className="text-muted-foreground">
                {formDescription}
              </p>
            </div>
            <Card>
              <CardContent className="pt-6">
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">Full Name *</Label>
                      <Input 
                        id="name" 
                        placeholder="Your name"
                        value={formData.name}
                        onChange={(e) => setFormData({...formData, name: e.target.value})}
                        required
                        data-testid="input-name"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email Address *</Label>
                      <Input 
                        id="email" 
                        type="email"
                        placeholder="you@example.com"
                        value={formData.email}
                        onChange={(e) => setFormData({...formData, email: e.target.value})}
                        required
                        data-testid="input-email"
                      />
                    </div>
                  </div>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="phone">Phone Number</Label>
                      <Input 
                        id="phone" 
                        placeholder="+1 (555) 000-0000"
                        value={formData.phone}
                        onChange={(e) => setFormData({...formData, phone: e.target.value})}
                        data-testid="input-phone"
                      />
                    </div>
                    {audienceType === "business" ? (
                      <div className="space-y-2">
                        <Label htmlFor="capitalRange">Capital to Relocate</Label>
                        <Select 
                          value={formData.capitalRange}
                          onValueChange={(value) => setFormData({...formData, capitalRange: value})}
                        >
                          <SelectTrigger data-testid="select-capital">
                            <SelectValue placeholder="Select range" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="under-100k">Under $100,000</SelectItem>
                            <SelectItem value="100k-500k">$100,000 - $500,000</SelectItem>
                            <SelectItem value="500k-1m">$500,000 - $1,000,000</SelectItem>
                            <SelectItem value="1m-5m">$1,000,000 - $5,000,000</SelectItem>
                            <SelectItem value="5m-plus">$5,000,000+</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    ) : (
                      <div className="space-y-2">
                        <Label htmlFor="familySize">Family Size</Label>
                        <Select 
                          value={formData.familySize}
                          onValueChange={(value) => setFormData({...formData, familySize: value})}
                        >
                          <SelectTrigger data-testid="select-family">
                            <SelectValue placeholder="Select size" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="single">Individual</SelectItem>
                            <SelectItem value="couple">Couple</SelectItem>
                            <SelectItem value="small-family">Family (1-2 children)</SelectItem>
                            <SelectItem value="large-family">Family (3+ children)</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    )}
                  </div>
                  <div className="grid md:grid-cols-2 gap-4">
                    {audienceType === "consumer" ? (
                      <div className="space-y-2">
                        <Label htmlFor="schoolPreference">School Preference</Label>
                        <Select 
                          value={formData.businessType}
                          onValueChange={(value) => setFormData({...formData, businessType: value})}
                        >
                          <SelectTrigger data-testid="select-school">
                            <SelectValue placeholder="Select curriculum" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="british">British Curriculum</SelectItem>
                            <SelectItem value="american">American Curriculum</SelectItem>
                            <SelectItem value="ib">International Baccalaureate</SelectItem>
                            <SelectItem value="indian">Indian Curriculum</SelectItem>
                            <SelectItem value="other">Other / Not Sure</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    ) : (
                      <div className="space-y-2">
                        <Label htmlFor="businessType">Business/Investment Interest</Label>
                        <Select 
                          value={formData.businessType}
                          onValueChange={(value) => setFormData({...formData, businessType: value})}
                        >
                          <SelectTrigger data-testid="select-business">
                            <SelectValue placeholder="Select type" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="startup">Startup / Tech Company</SelectItem>
                            <SelectItem value="trading">Trading / Import-Export</SelectItem>
                            <SelectItem value="consulting">Consulting / Professional Services</SelectItem>
                            <SelectItem value="real-estate">Real Estate Investment</SelectItem>
                            <SelectItem value="passive">Passive Investment / Retirement</SelectItem>
                            <SelectItem value="other">Other</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    )}
                    <div className="space-y-2">
                      <Label htmlFor="timeline">Relocation Timeline</Label>
                      <Select 
                        value={formData.timeline}
                        onValueChange={(value) => setFormData({...formData, timeline: value})}
                      >
                        <SelectTrigger data-testid="select-timeline">
                          <SelectValue placeholder="When?" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="immediate">Within 1 month</SelectItem>
                          <SelectItem value="soon">1-3 months</SelectItem>
                          <SelectItem value="planning">3-6 months</SelectItem>
                          <SelectItem value="exploring">6+ months (exploring)</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="message">
                      {audienceType === "consumer" ? "Tell us about your family's needs" : "Additional Information"}
                    </Label>
                    <Textarea 
                      id="message"
                      placeholder={audienceType === "consumer" 
                        ? "Tell us about your children's ages, educational needs, lifestyle preferences..."
                        : "Tell us about your goals, concerns, or specific requirements..."}
                      value={formData.message}
                      onChange={(e) => setFormData({...formData, message: e.target.value})}
                      className="min-h-[100px]"
                      data-testid="textarea-message"
                    />
                  </div>
                  <Button 
                    type="submit" 
                    className="w-full" 
                    size="lg" 
                    disabled={leadMutation.isPending}
                    data-testid="button-submit-form"
                  >
                    {leadMutation.isPending ? (
                      <>Processing...</>
                    ) : (
                      <>
                        <Send className="w-4 h-4 mr-2" />
                        {audienceType === "consumer" 
                          ? "Submit & Get Your Family Transition Plan"
                          : "Submit & Get Your Personalized Roadmap"}
                      </>
                    )}
                  </Button>
                  <p className="text-xs text-center text-muted-foreground">
                    By submitting, you agree to our privacy policy. We respect your data and will respond within 24 hours.
                  </p>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <section className="py-20 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4" data-testid="text-cta-title">
            {audienceType === "consumer" 
              ? "Join the DeliWer Family Community"
              : "Join the DeliWer Investor Network"}
          </h2>
          <p className="text-primary-foreground/80 mb-8 max-w-2xl mx-auto">
            {audienceType === "consumer"
              ? "Connect with other relocating families, access exclusive resources, and get personalized support for your Dubai journey."
              : "Connect with founders, investors, and partners. Access exclusive events, investment opportunities, and personalized advisory services."}
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/relocate-community">
              <Button size="lg" variant="secondary" data-testid="button-join-circle">
                <Users className="w-4 h-4 mr-2" />
                {audienceType === "consumer" ? "Join Family Circle" : "Join Relocate Circle"}
              </Button>
            </Link>
            <Link href="/relocate-community#inner-ring">
              <Button size="lg" variant="outline" className="border-primary-foreground/30 text-primary-foreground" data-testid="button-apply-inner">
                <Shield className="w-4 h-4 mr-2" />
                {audienceType === "consumer" ? "Apply for VIP Support" : "Apply for Inner Ring"}
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* PHASE 6: PARTNERS (Trust Expansion - Revealed Last) */}
      <section className="py-16 bg-muted/30 mb-16 md:mb-0">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto">
            <Badge variant="outline" className="mb-4">
              <Landmark className="w-3 h-3 mr-1" />
              Partner Ecosystem
            </Badge>
            <h2 className="text-2xl md:text-3xl font-bold mb-4" data-testid="text-partner-ecosystem">
              Trusted Partners for Your Dubai Journey
            </h2>
            <p className="text-muted-foreground mb-8">
              Our vetted network of real estate, business setup, and lifestyle partners 
              ensures a seamless transition to your new life in Dubai.
            </p>
            <div className="grid md:grid-cols-3 gap-4 mb-8">
              <div className="p-4 rounded-lg bg-background border">
                <Building2 className="w-6 h-6 text-emerald-500 mx-auto mb-2" />
                <h3 className="font-semibold text-sm">Real Estate</h3>
                <p className="text-xs text-muted-foreground">Tranquil living concepts</p>
              </div>
              <div className="p-4 rounded-lg bg-background border">
                <Briefcase className="w-6 h-6 text-blue-500 mx-auto mb-2" />
                <h3 className="font-semibold text-sm">Business Setup</h3>
                <p className="text-xs text-muted-foreground">Dubai South BH & more</p>
              </div>
              <div className="p-4 rounded-lg bg-background border">
                <Heart className="w-6 h-6 text-pink-500 mx-auto mb-2" />
                <h3 className="font-semibold text-sm">Lifestyle & Services</h3>
                <p className="text-xs text-muted-foreground">Premium amenities</p>
              </div>
            </div>
            <Link href="/partners">
              <Button size="lg" variant="outline" data-testid="button-explore-partners">
                <ArrowRight className="w-4 h-4 mr-2" />
                Explore Partner Ecosystem
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
