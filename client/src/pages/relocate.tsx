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
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
import { contactInfo } from "@/lib/contact-info";
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
  MessageCircle,
  Award,
  ExternalLink,
  X,
  Check,
  Mail
} from "lucide-react";
import dubaiSkyline from "@assets/stock_images/dubai_skyline_modern_806b4a5e.jpg";
import dubaiLifestyle from "@assets/stock_images/luxury_dubai_lifesty_e9f4e72e.jpg";
import dubaiFamily from "@assets/stock_images/dubai_family_diverse_5745a5cf.jpg";
import wellnessResidence from "@assets/stock_images/modern_wellness_luxu_b13619f6.jpg";
import coworkingOffice from "@assets/stock_images/modern_office_cowork_bfc0360b.jpg";
import businessTeamMeeting from "@assets/generated_images/diverse_business_team_in_dubai_office_meeting.png";
import dubaiMarinaAerial from "@assets/generated_images/dubai_marina_and_business_district_aerial_view.png";
import foundersSuccess from "@assets/generated_images/international_founders_celebrating_startup_success.png";
import familyLuxury from "@assets/generated_images/happy_family_in_modern_dubai_luxury_apartment.png";
import professionalOffice from "@assets/generated_images/professional_team_in_modern_corporate_office_space.png";
import celebratingProfessionals from "@assets/generated_images/international_professionals_celebrating_at_dubai_event.png";
import dubaiBusiness from "@assets/generated_images/dubai_skyline_with_modern_business_architecture.png";

export default function Relocate() {
  const { toast } = useToast();
  const searchString = useSearch();
  const formRef = useRef<HTMLDivElement>(null);
  const [showChristmasPopup, setShowChristmasPopup] = useState(false);
  
  // Load Calendly script
  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://assets.calendly.com/assets/external/widget.js';
    script.async = true;
    document.body.appendChild(script);
  }, []);
  
  // Check if today is Christmas 2025
  useEffect(() => {
    const today = new Date();
    const isChristmas = today.getMonth() === 11 && today.getDate() === 25;
    if (isChristmas && !sessionStorage.getItem("christmasPopupShown")) {
      setTimeout(() => setShowChristmasPopup(true), 1000);
      sessionStorage.setItem("christmasPopupShown", "true");
    }
  }, []);
  
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
    message: getServiceMessage(),
    investmentIntent: "",
    linkedinProfile: ""
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
        capitalRange: "",
        familySize: "",
        businessType: "",
        timeline: "",
        message: "",
        investmentIntent: "",
        linkedinProfile: ""
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
      {/* Christmas 25% Off Popup - Shows on Dec 25 */}
      <Dialog open={showChristmasPopup} onOpenChange={setShowChristmasPopup}>
        <DialogContent className="sm:max-w-md bg-gradient-to-br from-red-950/80 to-green-950/80 border-2 border-green-500 z-[9999]" data-testid="dialog-christmas">
          <DialogHeader>
            <DialogTitle className="text-center text-2xl md:text-3xl font-bold text-white mb-2" data-testid="text-christmas-title">
              Your Last-Minute Chance
            </DialogTitle>
            <DialogDescription className="text-center text-emerald-300 font-semibold text-base mb-2" data-testid="text-christmas-desc">
              Christmas Day Deal: 25% OFF Your Dubai Relocation
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="bg-gradient-to-r from-green-500/30 to-red-500/30 backdrop-blur-sm rounded-lg p-6 text-center border-2 border-green-400/50">
              <p className="text-4xl font-black text-emerald-300 mb-2">25% OFF</p>
              <p className="text-white text-sm mb-2">Save $2,500 - $5,000+ on your relocation package</p>
              <p className="text-red-300 text-lg font-bold mb-2">TODAY ONLY</p>
              <div className="text-gray-200 text-xs space-y-1">
                <p>Only 3 spots remaining for consultations</p>
                <p>Offer expires midnight UTC</p>
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <a href="#lead-form" className="w-full">
                <Button 
                  className="w-full bg-green-600 hover:bg-green-700 text-white font-bold text-base" 
                  size="lg"
                  onClick={() => setShowChristmasPopup(false)}
                  data-testid="button-claim-christmas"
                >
                  <Check className="w-5 h-5 mr-2" />
                  Secure My 25% Christmas Discount
                </Button>
              </a>
              <Button 
                variant="outline" 
                className="w-full border-white/30 text-white hover:bg-white/10" 
                size="lg"
                onClick={() => setShowChristmasPopup(false)}
                data-testid="button-close-christmas"
              >
                Maybe Later
              </Button>
            </div>
            <div className="bg-yellow-500/20 border border-yellow-500/50 rounded p-3">
              <p className="text-xs text-white text-center">
                <span className="font-bold">⚠️ Limited Capacity:</span> Consultations book fast during holidays. Claim now to lock in your spot.
              </p>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      <Helmet>
        <title>Dubai Relocation Consulting | Capital & Family Relocation Services | DeliWer</title>
        <meta name="description" content="Expert Dubai relocation consulting for investors, families & businesses. Validated by Dealroom. 0% income tax, Golden Visa, business setup in 1-3 days. Part of Dubai's founders ecosystem. Start your Dubai journey today." />
        <meta name="keywords" content="Dubai relocation, capital relocation, Golden Visa UAE, Dubai business setup, family relocation Dubai, tax-free living, UAE immigration, Dubai expat services, Dealroom verified, FounderHQ ecosystem" />
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

      {/* Launch Offer Banner */}
      <div className="bg-gradient-to-r from-amber-600/20 to-orange-600/20 border-b border-amber-500/40 backdrop-blur-sm">
        <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-center gap-3 text-center">
          <span className="text-sm md:text-base font-semibold text-white">
            Limited Time: 25% OFF Relocation Consulting Fees — Enroll by Dec 31, 2025
          </span>
        </div>
      </div>

      {/* Sticky Mobile CTA */}
      <div className="fixed bottom-0 left-0 right-0 z-50 p-3 bg-background/95 backdrop-blur-sm border-t md:hidden">
        <div className="flex gap-2">
          <a href="#lead-form" className="flex-1">
            <Button className="w-full" size="lg" data-testid="button-mobile-cta">
              <MessageCircle className="w-4 h-4 mr-2" />
              Book Strategy Call
            </Button>
          </a>
          <a href="tel:+97142501500">
            <Button variant="outline" size="lg" data-testid="button-mobile-call">
              <Phone className="w-4 h-4" />
            </Button>
          </a>
        </div>
      </div>

      {/* Trust Signals Section - Dealroom & FounderHQ */}
      <section className="py-12 bg-gradient-to-r from-blue-950/30 to-purple-950/30 border-y border-blue-900/30">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-md bg-blue-500/20 flex items-center justify-center flex-shrink-0">
                <Award className="w-5 h-5 text-blue-400" />
              </div>
              <div>
                <h3 className="font-semibold text-white mb-1">Dealroom Verified</h3>
                <p className="text-sm text-gray-300">Global startup & investor ecosystem intelligence platform recognizes DeliWer's expertise</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-md bg-purple-500/20 flex items-center justify-center flex-shrink-0">
                <Users className="w-5 h-5 text-purple-400" />
              </div>
              <div>
                <h3 className="font-semibold text-white mb-1">FounderHQ Partner</h3>
                <p className="text-sm text-gray-300">Part of Dubai's official founders ecosystem with verified credentials</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-md bg-emerald-500/20 flex items-center justify-center flex-shrink-0">
                <Globe className="w-5 h-5 text-emerald-400" />
              </div>
              <div>
                <h3 className="font-semibold text-white mb-1">Dubai's #1 Hub</h3>
                <p className="text-sm text-gray-300">Recognized as top emerging market for founders, investors & families</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-md bg-orange-500/20 flex items-center justify-center flex-shrink-0">
                <Briefcase className="w-5 h-5 text-orange-400" />
              </div>
              <div>
                <h3 className="font-semibold text-white mb-1">Partner-Led Model</h3>
                <p className="text-sm text-gray-300">Vetted network of business setup, visa, and real estate partners</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="relative h-screen min-h-[600px] overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${dubaiSkyline})` }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black/70" />
        <div className="relative z-10 h-full flex flex-col justify-center items-center text-center px-4">
          <Badge variant="secondary" className="mb-4 bg-white/10 backdrop-blur-sm border-white/20 text-white animate-pulse" data-testid="badge-hero">
            <Award className="w-3 h-3 mr-1" />
            Validated by Dealroom. Part of FounderHQ Ecosystem.
          </Badge>
          <div className="mb-6 inline-block bg-red-500/20 border border-red-500/50 rounded-full px-4 py-2">
            <p className="text-red-300 text-sm font-bold">LIMITED TIME: 25% OFF + Only 3 Spots Left Today</p>
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-7xl font-black text-white mb-4 max-w-5xl leading-tight" data-testid="text-hero-title">
            Relocate to Dubai in 30–60 Days
            <span className="text-amber-300 block mt-2">With a Trusted Local Operator</span>
          </h1>
          <p className="text-lg md:text-xl text-white/90 mb-4 max-w-3xl font-semibold" data-testid="text-hero-description">
            Business setup in 1-3 days. Golden Visa within weeks. Zero income tax. Partner-led execution. No upfront DeliWer fees.
          </p>
          <p className="text-base text-white/70 mb-8 max-w-2xl" data-testid="text-hero-subtext">
            Trusted by 500+ families and founders. We earn via partner referrals—your success is our incentive. Limited Christmas intake.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button 
              size="lg" 
              className="bg-green-600 hover:bg-green-700 text-white font-bold text-base px-8" 
              data-testid="button-start-journey"
              onClick={() => {
                if (formRef.current) {
                  formRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }
              }}
            >
              <Check className="w-5 h-5 mr-2" />
              Claim 25% Christmas Offer
            </Button>
            <Button 
              size="lg" 
              variant="outline" 
              className="border-white/30 text-white backdrop-blur-sm bg-white/10 hover:bg-white/20 font-semibold" 
              data-testid="button-free-call"
              onClick={() => {
                const calendlyWindow = window as any;
                if (calendlyWindow.Calendly) {
                  calendlyWindow.Calendly.initPopupWidget({url: 'https://calendly.com/deliwer/consultation'});
                } else {
                  window.open('https://calendly.com/deliwer/consultation', '_blank');
                }
              }}
            >
              <Calendar className="w-4 h-4 mr-2" />
              Schedule Free Call (30 min)
            </Button>
          </div>
        </div>
      </section>

      {/* Market Pricing Context Section */}
      <section className="relative py-20 overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${dubaiMarinaAerial})` }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-blue-950/85 via-blue-900/75 to-purple-950/85" />
        <div className="relative z-10 max-w-5xl mx-auto px-4">
          <div className="text-center mb-12">
            <h3 className="text-3xl md:text-4xl font-bold text-white mb-3">Market Reality Check</h3>
            <p className="text-blue-100 text-lg">What Similar Services Cost Across the Industry</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            <Card className="bg-blue-900/40 border-blue-400/30 backdrop-blur-sm">
              <CardContent className="pt-6">
                <p className="text-sm text-blue-200 mb-2 font-medium">UAE Business Setup + Visa</p>
                <p className="text-3xl font-bold text-white">$5K – $15K</p>
              </CardContent>
            </Card>
            <Card className="bg-purple-900/40 border-purple-400/30 backdrop-blur-sm">
              <CardContent className="pt-6">
                <p className="text-sm text-purple-200 mb-2 font-medium">Golden Visa Advisory</p>
                <p className="text-3xl font-bold text-white">$3K – $10K</p>
              </CardContent>
            </Card>
            <Card className="bg-emerald-900/40 border-emerald-400/30 backdrop-blur-sm">
              <CardContent className="pt-6">
                <p className="text-sm text-emerald-200 mb-2 font-medium">Relocation Concierge</p>
                <p className="text-3xl font-bold text-white">$10K – $30K</p>
              </CardContent>
            </Card>
            <Card className="bg-orange-900/40 border-orange-400/30 backdrop-blur-sm">
              <CardContent className="pt-6">
                <p className="text-sm text-orange-200 mb-2 font-medium">Capital Migration Advisory</p>
                <p className="text-3xl font-bold text-white">$20K – $50K+</p>
              </CardContent>
            </Card>
          </div>
          <div className="bg-gradient-to-r from-emerald-600/30 to-teal-600/30 border-2 border-emerald-400/60 backdrop-blur-sm rounded-lg p-8 text-center">
            <h4 className="text-xl font-bold text-emerald-100 mb-3">DeliWer's Breakthrough Model</h4>
            <p className="text-emerald-50 text-lg font-semibold mb-3">
              You pay partners directly. DeliWer earns 20-30% referral share.
            </p>
            <p className="text-emerald-200">
              Your success is our incentive. No upfront consulting fees. Aligned interests from day one.
            </p>
          </div>
        </div>
      </section>

      {/* ICP Targeting Section */}
      <section className="relative py-20 overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${foundersSuccess})` }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-slate-950/80 via-slate-900/75 to-slate-950/85" />
        <div className="relative z-10 max-w-5xl mx-auto px-4">
          <div className="text-center mb-12">
            <Badge variant="outline" className="mb-4 bg-white/10 backdrop-blur-sm border-white/20 text-white">
              <Users className="w-3 h-3 mr-1" />
              Ideal for You If...
            </Badge>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 text-white">Are You Ready to Make the Move?</h2>
            <p className="text-gray-200 max-w-2xl mx-auto text-lg">
              We specialize in helping founders, entrepreneurs, and families from these backgrounds relocate successfully
            </p>
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            {[
              { Icon: Building2, country: "Canadian Founders", pain: "Tax pressure, housing crisis seeking lifestyle arbitrage" },
              { Icon: TrendingUp, country: "US Tech Founders", pain: "Tax optimization + professional ecosystem expansion" },
              { Icon: Briefcase, country: "UK Entrepreneurs", pain: "Non-dom uncertainty + business growth opportunity" },
              { Icon: Globe, country: "EU Freelancers & Agencies", pain: "Tax efficiency + access to global markets" },
              { Icon: Heart, country: "South Asian HNW Families", pain: "Safe haven + family-first infrastructure + familiar market" },
              { Icon: DollarSign, country: "Global Investors", pain: "Capital structuring + Golden Visa eligibility" }
            ].map((item, idx) => (
              <Card key={idx} className="hover-elevate bg-slate-900/60 border-slate-700/50 backdrop-blur-sm" data-testid={`card-icp-${idx}`}>
                <CardContent className="pt-6">
                  <item.Icon className="w-8 h-8 text-emerald-400 mb-3" />
                  <h4 className="font-semibold mb-2 text-white text-lg">{item.country}</h4>
                  <p className="text-sm text-gray-300">{item.pain}</p>
                </CardContent>
              </Card>
            ))}
          </div>
          <div className="text-center mt-12">
            <p className="text-gray-200 mb-6 text-lg">Sound like you? Let's start your Dubai pathway.</p>
            <Button 
              size="lg" 
              className="bg-emerald-600 hover:bg-emerald-700 text-white font-semibold"
              onClick={() => {
                if (formRef.current) {
                  formRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }
              }}
            >
              <MessageCircle className="w-4 h-4 mr-2" />
              Book Your Strategy Call
            </Button>
          </div>
        </div>
      </section>

      {/* Core Services Section */}
      <section className="relative py-20 overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${professionalOffice})` }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-purple-950/85 via-blue-950/80 to-slate-950/85" />
        <div className="relative z-10 container mx-auto px-4">
          <div className="text-center mb-12">
            <Badge variant="outline" className="mb-4 bg-white/10 backdrop-blur-sm border-white/20 text-white">
              <DollarSign className="w-3 h-3 mr-1" />
              Our Services
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white" data-testid="text-services-title">
              Complete Business & Investment Services
            </h2>
            <p className="text-gray-200 max-w-2xl mx-auto">
              Comprehensive support for capital relocation, business setup, and investment opportunities
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {businessServices.map((service, index) => (
              <Card key={index} className="hover-elevate bg-slate-900/60 border-slate-700/50 backdrop-blur-sm" data-testid={`card-service-${index}`}>
                <CardHeader>
                  <div className="w-12 h-12 rounded-md bg-emerald-500/20 flex items-center justify-center mb-4">
                    <service.icon className="w-6 h-6 text-emerald-400" />
                  </div>
                  <CardTitle className="text-lg text-white">{service.title}</CardTitle>
                  <CardDescription className="text-gray-300">{service.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {service.features.map((feature, idx) => (
                      <li key={idx} className="flex items-center gap-2 text-sm text-gray-300">
                        <CheckCircle2 className="w-4 h-4 text-emerald-400" />
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


      {/* Why Dubai Now Section */}
      <section className="relative py-20 overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${dubaiBusiness})` }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-slate-950/85 via-slate-900/80 to-slate-950/85" />
        <div className="relative z-10 container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <Badge variant="outline" className="mb-4 bg-white/10 backdrop-blur-sm border-white/20 text-white">
                <Globe className="w-3 h-3 mr-1" />
                Why Dubai, Why Now
              </Badge>
              <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white" data-testid="text-why-dubai-title">
                The Modern Free World's Operating System
              </h2>
            </div>
            <div className="prose prose-lg max-w-none dark:prose-invert">
              <p className="text-lg text-gray-200 text-center mb-8">
                Unlike other relocation hubs, Dubai uniquely combines what matters most to global citizens and families seeking a fresh start.
              </p>
              <div className="grid md:grid-cols-2 gap-6">
                <Card className="p-6 bg-slate-900/60 border-slate-700/50 backdrop-blur-sm" data-testid="card-dubai-advantage-1">
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-full bg-emerald-500/20 flex items-center justify-center flex-shrink-0">
                      <Shield className="w-5 h-5 text-emerald-400" />
                    </div>
                    <div>
                      <h4 className="font-semibold mb-2 text-white">Political Neutrality & Safety</h4>
                      <p className="text-sm text-gray-300">A stable haven with one of the world's lowest crime rates, welcoming all backgrounds equally.</p>
                    </div>
                  </div>
                </Card>
                <Card className="p-6 bg-slate-900/60 border-slate-700/50 backdrop-blur-sm" data-testid="card-dubai-advantage-2">
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-full bg-emerald-500/20 flex items-center justify-center flex-shrink-0">
                      <Building className="w-5 h-5 text-emerald-400" />
                    </div>
                    <div>
                      <h4 className="font-semibold mb-2 text-white">World-Class Infrastructure</h4>
                      <p className="text-sm text-gray-300">From healthcare to education to transport — everything works, and works exceptionally well.</p>
                    </div>
                  </div>
                </Card>
                <Card className="p-6 bg-slate-900/60 border-slate-700/50 backdrop-blur-sm" data-testid="card-dubai-advantage-3">
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-full bg-emerald-500/20 flex items-center justify-center flex-shrink-0">
                      <Users className="w-5 h-5 text-emerald-400" />
                    </div>
                    <div>
                      <h4 className="font-semibold mb-2 text-white">Cultural Diversity (200+ Nationalities)</h4>
                      <p className="text-sm text-gray-300">Your children grow up with global perspectives. Your network spans continents from day one.</p>
                    </div>
                  </div>
                </Card>
                <Card className="p-6 bg-slate-900/60 border-slate-700/50 backdrop-blur-sm" data-testid="card-dubai-advantage-4">
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-full bg-emerald-500/20 flex items-center justify-center flex-shrink-0">
                      <Heart className="w-5 h-5 text-emerald-400" />
                    </div>
                    <div>
                      <h4 className="font-semibold mb-2 text-white">Lifestyle + Ambition Coexistence</h4>
                      <p className="text-sm text-gray-300">Build your business by day, enjoy pristine beaches and world-class dining by evening.</p>
                    </div>
                  </div>
                </Card>
              </div>
              <div className="text-center mt-8">
                <p className="text-gray-300 mb-6">
                  Panama, Georgia, and other emerging destinations offer pieces of the puzzle — Dubai delivers the complete picture.
                </p>
                <Button 
                  size="lg" 
                  className="bg-emerald-600 hover:bg-emerald-700 text-white" 
                  data-testid="button-why-dubai-cta"
                  onClick={() => {
                    if (formRef.current) {
                      formRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
                    }
                  }}
                >
                  <ArrowRight className="w-4 h-4 mr-2" />
                  Explore Your Dubai Pathway
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="relative py-20 overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${celebratingProfessionals})` }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-purple-950/85 via-blue-950/80 to-purple-950/85" />
        <div className="relative z-10 container mx-auto px-4">
          <div className="text-center mb-12">
            <Badge variant="outline" className="mb-4 bg-white/10 backdrop-blur-sm border-white/20 text-white">
              <Star className="w-3 h-3 mr-1" />
              Success Stories
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white" data-testid="text-testimonials-title">
              Trusted by 500+ Relocated Families & Investors
            </h2>
            <p className="text-gray-200 max-w-2xl mx-auto">
              Real stories from clients who successfully relocated to Dubai with our guidance
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="relative bg-slate-900/60 border-slate-700/50 backdrop-blur-sm" data-testid={`card-testimonial-${index}`}>
                <CardContent className="pt-6">
                  <Quote className="w-8 h-8 text-emerald-400/30 absolute top-4 right-4" />
                  <div className="flex gap-1 mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-emerald-400 text-emerald-400" />
                    ))}
                  </div>
                  <p className="text-gray-200 mb-6 italic">"{testimonial.content}"</p>
                  <div className="border-t border-slate-700 pt-4">
                    <p className="font-semibold text-white">{testimonial.name}</p>
                    <p className="text-sm text-gray-300">{testimonial.role}</p>
                    <p className="text-xs text-gray-400">{testimonial.location}</p>
                    <Badge variant="secondary" className="mt-2 text-xs bg-emerald-600/30 text-emerald-200 border-emerald-500/30">
                      {testimonial.capital || testimonial.familySize}
                    </Badge>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Why Dubai Section */}
      <section className="relative py-20 overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${dubaiLifestyle})` }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/75 via-black/70 to-black/60" />
        <div className="relative z-10 container mx-auto px-4">
          <div className="max-w-2xl">
            <Badge variant="outline" className="mb-4 bg-white/10 backdrop-blur-sm border-white/20 text-white">
              <Heart className="w-3 h-3 mr-1" />
              Why Dubai For Business
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-white">World-Class Living Meets Global Business</h2>
            <p className="text-gray-200 mb-8">
              Dubai offers the complete package: business growth, lifestyle excellence, and financial optimization. Attract world-class talent, maintain work-life balance, and build wealth in a politically stable, cosmopolitan hub.
            </p>
            <div className="grid grid-cols-2 gap-4 mb-6">
              {businessLifestyleFeatures.map((feature, index) => (
                <div key={index} className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-md bg-white/10 flex items-center justify-center flex-shrink-0">
                    <feature.icon className="w-5 h-5 text-emerald-400" />
                  </div>
                  <div>
                    <h4 className="font-medium text-sm text-white">{feature.title}</h4>
                    <p className="text-xs text-gray-300">{feature.description}</p>
                  </div>
                </div>
              ))}
            </div>
            <Button 
              className="bg-emerald-600 hover:bg-emerald-700"
              onClick={() => {
                if (formRef.current) {
                  formRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }
              }}
            >
              <MessageCircle className="w-4 h-4 mr-2" />
              Schedule Expert Consultation
            </Button>
            <div className="mt-8 bg-white/10 backdrop-blur-sm border border-white/20 rounded-md p-4">
              <p className="text-2xl font-bold text-emerald-400">200+</p>
              <p className="text-sm text-gray-200">Nationalities call Dubai home</p>
            </div>
          </div>
        </div>
      </section>

      <section className="relative py-20 overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${dubaiBusiness})` }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-indigo-950/85 via-blue-950/80 to-indigo-950/85" />
        <div className="relative z-10 container mx-auto px-4">
          <div className="text-center mb-12">
            <Badge variant="outline" className="mb-4 bg-white/10 backdrop-blur-sm border-white/20 text-white">
              <Globe className="w-3 h-3 mr-1" />
              Global Comparison
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white" data-testid="text-comparison-title">
              Why Dubai vs Other Global Cities
            </h2>
            <p className="text-gray-200 max-w-2xl mx-auto">
              See how Dubai compares to other premier destinations for capital relocation and business growth
            </p>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse bg-slate-900/60 backdrop-blur-sm rounded-lg overflow-hidden" data-testid="table-comparison">
              <thead>
                <tr className="border-b border-slate-700">
                  <th className="text-left py-4 px-4 font-semibold text-white">City</th>
                  <th className="text-center py-4 px-4 font-semibold text-white">Tax-Free Income</th>
                  <th className="text-center py-4 px-4 font-semibold text-white">Business Setup</th>
                  <th className="text-center py-4 px-4 font-semibold text-white">Safety</th>
                  <th className="text-center py-4 px-4 font-semibold text-white">Lifestyle</th>
                  <th className="text-center py-4 px-4 font-semibold text-white">Sustainability</th>
                </tr>
              </thead>
              <tbody>
                {comparisonData.map((row, index) => (
                  <tr 
                    key={index} 
                    className={`border-b border-slate-700 ${row.highlight ? "bg-emerald-600/10" : ""}`}
                    data-testid={`row-comparison-${index}`}
                  >
                    <td className="py-4 px-4 font-medium text-white">
                      {row.city}
                      {row.highlight && (
                        <Badge className="ml-2 text-xs bg-emerald-600 text-white">Recommended</Badge>
                      )}
                    </td>
                    <td className="text-center py-4 px-4">
                      {row.taxFree ? (
                        <CheckCircle2 className="w-5 h-5 text-emerald-400 mx-auto" />
                      ) : (
                        <span className="text-gray-400">No</span>
                      )}
                    </td>
                    <td className="text-center py-4 px-4 text-gray-300">{row.businessSetup}</td>
                    <td className="text-center py-4 px-4">
                      <Badge variant={row.safety === "Very High" ? "default" : "secondary"}>
                        {row.safety}
                      </Badge>
                    </td>
                    <td className="text-center py-4 px-4 text-gray-300">{row.lifestyle}</td>
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
            <Button 
              size="lg" 
              className="bg-emerald-600 hover:bg-emerald-700 text-white" 
              data-testid="button-comparison-cta"
              onClick={() => {
                if (formRef.current) {
                  formRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }
              }}
            >
              <ArrowRight className="w-4 h-4 mr-2" />
              Get Your Dubai Relocation Plan
            </Button>
          </div>
        </div>
      </section>

      {/* Pricing & Consulting Charges Section */}
      <section className="py-20 bg-gradient-to-r from-blue-900/40 to-purple-900/40 border-b border-blue-800/60 relative overflow-hidden">
        <div className="absolute top-4 right-4 bg-red-600/40 border border-red-500 rounded-lg px-3 py-1 text-xs font-bold text-red-100 animate-pulse">
          Only 3 Spots Available Today
        </div>
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-16">
            <Badge variant="outline" className="mb-4 border-blue-600 bg-blue-900/30">
              <TrendingUp className="w-3 h-3 mr-1" />
              Investment-Grade Service
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-slate-900" data-testid="text-pricing-title">
              Relocation Consulting Fees (25% OFF Today)
            </h2>
            <p className="text-slate-700 max-w-2xl mx-auto mb-2 font-medium">
              Investment as low as $3,746. One-time fee. Lifetime support.
            </p>
            <p className="text-sm text-orange-600 font-semibold">
              Save $2,500 - $5,000 with today's holiday offer
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {/* Consumer Package */}
            <Card className="border-emerald-500/50 bg-white/95 shadow-md hover:border-emerald-400/80 transition-colors" data-testid="card-family-package">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-slate-900">
                  <Home className="w-5 h-5 text-emerald-600" />
                  Family Relocation
                </CardTitle>
                <CardDescription className="text-slate-600">Complete family transition</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <p className="text-3xl font-bold text-primary mb-1">$4,995</p>
                  <p className="text-sm text-muted-foreground">Full service package</p>
                  <p className="text-xs text-emerald-500 font-semibold mt-2">25% OFF = $3,746 (until Dec 31)</p>
                </div>
                <div className="space-y-3">
                  <div className="flex gap-2 items-start">
                    <Check className="w-4 h-4 text-emerald-500 mt-0.5 flex-shrink-0" />
                    <span className="text-sm">School enrollment assistance</span>
                  </div>
                  <div className="flex gap-2 items-start">
                    <Check className="w-4 h-4 text-emerald-500 mt-0.5 flex-shrink-0" />
                    <span className="text-sm">Housing & neighborhood guidance</span>
                  </div>
                  <div className="flex gap-2 items-start">
                    <Check className="w-4 h-4 text-emerald-500 mt-0.5 flex-shrink-0" />
                    <span className="text-sm">Healthcare & lifestyle setup</span>
                  </div>
                  <div className="flex gap-2 items-start">
                    <Check className="w-4 h-4 text-emerald-500 mt-0.5 flex-shrink-0" />
                    <span className="text-sm">3 months follow-up support</span>
                  </div>
                </div>
                <Button 
                  className="w-full" 
                  onClick={() => {
                    if (formRef.current) {
                      formRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
                    }
                  }}
                  data-testid="button-family-cta"
                >
                  Get Started
                </Button>
              </CardContent>
            </Card>

            {/* Business Package (Featured) */}
            <Card className="border-primary/80 ring-2 ring-primary/40 bg-white/98 shadow-lg hover:ring-primary/60 transition-all relative" data-testid="card-business-package">
              <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                <Badge className="bg-primary text-primary-foreground font-semibold">Most Popular</Badge>
              </div>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-slate-900">
                  <Briefcase className="w-5 h-5 text-blue-600" />
                  Capital & Business Setup
                </CardTitle>
                <CardDescription className="text-slate-600">Entrepreneurs & investors</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <p className="text-3xl font-bold text-primary mb-1">$9,995</p>
                  <p className="text-sm text-muted-foreground">Comprehensive advisory</p>
                  <p className="text-xs text-primary font-semibold mt-2">25% OFF = $7,496 (until Dec 31)</p>
                </div>
                <div className="space-y-3">
                  <div className="flex gap-2 items-start">
                    <Check className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                    <span className="text-sm">Golden Visa structuring</span>
                  </div>
                  <div className="flex gap-2 items-start">
                    <Check className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                    <span className="text-sm">Business setup (Free Zone/Mainland)</span>
                  </div>
                  <div className="flex gap-2 items-start">
                    <Check className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                    <span className="text-sm">Tax optimization planning</span>
                  </div>
                  <div className="flex gap-2 items-start">
                    <Check className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                    <span className="text-sm">Banking & capital transfer</span>
                  </div>
                  <div className="flex gap-2 items-start">
                    <Check className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                    <span className="text-sm">6 months VIP support</span>
                  </div>
                </div>
                <Button 
                  className="w-full" 
                  onClick={() => {
                    if (formRef.current) {
                      formRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
                    }
                  }}
                  data-testid="button-business-cta"
                >
                  Book Consultation
                </Button>
              </CardContent>
            </Card>

            {/* Premium Package */}
            <Card className="border-purple-500/50 bg-white/95 shadow-md hover:border-purple-400/80 transition-colors" data-testid="card-premium-package">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-slate-900">
                  <Star className="w-5 h-5 text-purple-600" />
                  Premium VIP
                </CardTitle>
                <CardDescription className="text-slate-600">White-glove service</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <p className="text-3xl font-bold text-primary mb-1">$19,995</p>
                  <p className="text-sm text-muted-foreground">Ultimate support</p>
                  <p className="text-xs text-purple-500 font-semibold mt-2">25% OFF = $14,996 (until Dec 31)</p>
                </div>
                <div className="space-y-3">
                  <div className="flex gap-2 items-start">
                    <Check className="w-4 h-4 text-purple-500 mt-0.5 flex-shrink-0" />
                    <span className="text-sm">Everything in Capital package</span>
                  </div>
                  <div className="flex gap-2 items-start">
                    <Check className="w-4 h-4 text-purple-500 mt-0.5 flex-shrink-0" />
                    <span className="text-sm">Dedicated account manager</span>
                  </div>
                  <div className="flex gap-2 items-start">
                    <Check className="w-4 h-4 text-purple-500 mt-0.5 flex-shrink-0" />
                    <span className="text-sm">Multi-asset portfolio setup</span>
                  </div>
                  <div className="flex gap-2 items-start">
                    <Check className="w-4 h-4 text-purple-500 mt-0.5 flex-shrink-0" />
                    <span className="text-sm">12 months concierge service</span>
                  </div>
                  <div className="flex gap-2 items-start">
                    <Check className="w-4 h-4 text-purple-500 mt-0.5 flex-shrink-0" />
                    <span className="text-sm">Priority partner access</span>
                  </div>
                </div>
                <Button 
                  className="w-full bg-purple-600 hover:bg-purple-700" 
                  onClick={() => {
                    if (formRef.current) {
                      formRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
                    }
                  }}
                  data-testid="button-premium-cta"
                >
                  Schedule VIP Call
                </Button>
              </CardContent>
            </Card>
          </div>
          <div className="text-center mt-10 bg-gradient-to-r from-emerald-600/30 to-teal-600/30 border-2 border-emerald-400/60 rounded-lg p-8">
            <p className="text-base text-white mb-3 font-semibold">
              Breakthrough Offer: All packages include free onboarding consultation + 24/7 WhatsApp support
            </p>
            <div className="flex flex-col gap-2 text-emerald-200 font-semibold mb-4">
              <p className="flex items-center justify-center gap-2">
                <Check className="w-4 h-4" /> Money-back guarantee if not satisfied within 7 days
              </p>
              <p className="flex items-center justify-center gap-2">
                <Check className="w-4 h-4" /> 25% OFF all packages through Dec 31, 2025
              </p>
              <p className="flex items-center justify-center gap-2">
                <Check className="w-4 h-4" /> Limited to 3 new clients this month (exclusive access)
              </p>
            </div>
            <Button 
              variant="default" 
              size="lg" 
              className="bg-emerald-600 hover:bg-emerald-700" 
              data-testid="button-schedule-calendly"
              onClick={() => {
                // Open Calendly popup with window type annotation
                const calendlyWindow = window as any;
                if (calendlyWindow.Calendly) {
                  calendlyWindow.Calendly.showPopupWidget('https://calendly.com/deliwer/consultation');
                } else {
                  window.open('https://calendly.com/deliwer/consultation', '_blank');
                }
              }}
            >
              <Calendar className="w-4 h-4 mr-2" />
              Lock In Your Spot Now (Calendly)
            </Button>
          </div>
        </div>
      </section>

      {/* Investment Readiness Validation Form - PRIMARY CTA */}
      <section ref={formRef} id="lead-form" className="py-20 bg-gradient-to-b from-emerald-950/20 to-teal-950/20 border-y border-emerald-900/30">
        <div className="max-w-3xl mx-auto px-4">
          <div className="text-center mb-10">
            <Badge variant="outline" className="mb-4 border-emerald-500/50 bg-emerald-500/10">
              <Award className="w-3 h-3 mr-1" />
              Book Your Strategy Call
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold mb-4" data-testid="text-validation-title">
              Talk to a Dubai Relocation Expert
            </h2>
            <p className="text-muted-foreground max-w-xl mx-auto">
              Schedule a confidential 30-minute strategy call with our investment advisors. We'll assess your goals and create a personalized Dubai pathway.
            </p>
          </div>
          <Card className="border-emerald-500/30 bg-emerald-950/20">
            <CardContent className="pt-8">
              <form onSubmit={(e) => {
                e.preventDefault();
                leadMutation.mutate({...formData, investmentIntent: "strategy-call"});
              }} className="space-y-5">
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="inv-name">Full Name *</Label>
                    <Input 
                      id="inv-name"
                      placeholder="Your name"
                      value={formData.name}
                      onChange={(e) => setFormData({...formData, name: e.target.value})}
                      required
                      data-testid="input-inv-name"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="inv-email">Email *</Label>
                    <Input 
                      id="inv-email"
                      type="email"
                      placeholder="you@example.com"
                      value={formData.email}
                      onChange={(e) => setFormData({...formData, email: e.target.value})}
                      required
                      data-testid="input-inv-email"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="linkedin">LinkedIn Profile (Optional)</Label>
                  <Input 
                    id="linkedin"
                    type="url"
                    placeholder="https://linkedin.com/in/yourprofile"
                    value={formData.linkedinProfile}
                    onChange={(e) => setFormData({...formData, linkedinProfile: e.target.value})}
                    data-testid="input-linkedin"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="investment-intent">Investment Interest *</Label>
                  <Select 
                    value={formData.investmentIntent}
                    onValueChange={(value) => setFormData({...formData, investmentIntent: value})}
                  >
                    <SelectTrigger data-testid="select-investment">
                      <SelectValue placeholder="Select area of interest" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="tech-startup">Tech Startup / Scale-up</SelectItem>
                      <SelectItem value="real-estate">Real Estate Investment</SelectItem>
                      <SelectItem value="venture">Venture Capital / Angel Investing</SelectItem>
                      <SelectItem value="ecommerce">E-commerce / Trade</SelectItem>
                      <SelectItem value="crypto">Web3 / Crypto Ecosystem</SelectItem>
                      <SelectItem value="multi">Multi-sector Portfolio</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <Button 
                  type="submit" 
                  className="w-full bg-emerald-600 hover:bg-emerald-700" 
                  size="lg"
                  disabled={leadMutation.isPending}
                  data-testid="button-validate-investment"
                >
                  {leadMutation.isPending ? (
                    <>Validating...</>
                  ) : (
                    <>
                      <ExternalLink className="w-4 h-4 mr-2" />
                      Validate Investment Readiness
                    </>
                  )}
                </Button>
                <p className="text-xs text-center text-muted-foreground">
                  Connect your Dealroom or Gust profile. We'll match you with Dubai opportunities.
                </p>
              </form>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="relative py-20 overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${dubaiBusiness})` }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-slate-950/85 to-slate-950/85" />
        <div className="relative z-10 container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-12">
              <Badge variant="outline" className="mb-4 bg-white/10 backdrop-blur-sm border-white/20 text-white">
                <HelpCircle className="w-3 h-3 mr-1" />
                FAQ
              </Badge>
              <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white" data-testid="text-faq-title">
                Frequently Asked Questions
              </h2>
              <p className="text-gray-200">
                Everything you need to know about relocating to Dubai
              </p>
            </div>
            <Accordion type="single" collapsible className="w-full bg-slate-900/60 backdrop-blur-sm p-6 rounded-lg border border-slate-700/50" data-testid="accordion-faq">
              {faqItems.map((item, index) => (
                <AccordionItem key={index} value={`item-${index}`} className="border-b border-slate-700">
                  <AccordionTrigger className="text-left text-white hover:text-emerald-300" data-testid={`faq-trigger-${index}`}>
                    {item.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-gray-300" data-testid={`faq-content-${index}`}>
                    {item.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </section>

      {/* Pricing Justification Section */}
      <section className="relative py-20 overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${businessTeamMeeting})` }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-blue-950/85 to-indigo-950/85" />
        <div className="relative z-10 max-w-4xl mx-auto px-4">
          <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-lg p-10 md:p-14">
            <h3 className="text-3xl md:text-4xl font-bold text-white mb-6">Why Our Pricing Delivers Breakthrough Value</h3>
            <div className="grid md:grid-cols-2 gap-8 text-white">
              <div>
                <h4 className="text-xl font-semibold text-emerald-300 mb-3 flex items-start gap-2">
                  <Check className="w-6 h-6 mt-0.5 flex-shrink-0" />
                  Aligned Incentives
                </h4>
                <p className="text-gray-100 leading-relaxed">
                  We earn only when you succeed. No upfront consulting fees mean zero risk for you. Your relocation success directly drives our revenue.
                </p>
              </div>
              <div>
                <h4 className="text-xl font-semibold text-emerald-300 mb-3 flex items-start gap-2">
                  <Check className="w-6 h-6 mt-0.5 flex-shrink-0" />
                  Vetted Partner Network
                </h4>
                <p className="text-gray-100 leading-relaxed">
                  Leverage partnerships built over years. Partners compete for your business, keeping costs competitive and service quality high.
                </p>
              </div>
              <div>
                <h4 className="text-xl font-semibold text-emerald-300 mb-3 flex items-start gap-2">
                  <Check className="w-6 h-6 mt-0.5 flex-shrink-0" />
                  Speed = Lower Cost
                </h4>
                <p className="text-gray-100 leading-relaxed">
                  30-60 day relocations mean lower operational costs. We pass savings to you. Traditional consultants charge premium for speed.
                </p>
              </div>
              <div>
                <h4 className="text-xl font-semibold text-emerald-300 mb-3 flex items-start gap-2">
                  <Check className="w-6 h-6 mt-0.5 flex-shrink-0" />
                  Transparent Cost Structure
                </h4>
                <p className="text-gray-100 leading-relaxed">
                  You see exactly what partners charge. No hidden DeliWer markup. You control spending while we ensure quality execution.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Methods Section */}
      <section className="relative py-20 overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${familyLuxury})` }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-emerald-950/85 to-teal-950/85" />
        <div className="relative z-10 max-w-5xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">Get in Touch</h2>
            <p className="text-emerald-100 text-lg">Multiple ways to start your Dubai journey</p>
          </div>
          <div className="grid md:grid-cols-2 gap-6 mb-8">
            <Card className="hover-elevate bg-slate-900/60 border-slate-700/50 backdrop-blur-sm">
              <CardContent className="pt-6">
                <Calendar className="w-8 h-8 text-emerald-400 mb-4" />
                <h3 className="font-semibold mb-2 text-white">Schedule a Call</h3>
                <p className="text-sm text-gray-300 mb-4">Free 30-minute strategy call with our relocation expert</p>
                <Button 
                  className="w-full bg-emerald-600 hover:bg-emerald-700"
                  onClick={() => {
                    const calendlyWindow = window as any;
                    if (calendlyWindow.Calendly) {
                      calendlyWindow.Calendly.initPopupWidget({url: contactInfo.ctas.calendly});
                    } else {
                      window.open(contactInfo.ctas.calendly, '_blank');
                    }
                  }}
                  data-testid="button-calendly-card"
                >
                  Via Calendly
                </Button>
              </CardContent>
            </Card>
            <Card className="hover-elevate bg-slate-900/60 border-slate-700/50 backdrop-blur-sm">
              <CardContent className="pt-6">
                <Send className="w-8 h-8 text-orange-400 mb-4" />
                <h3 className="font-semibold mb-2 text-white">Email Us</h3>
                <p className="text-sm text-gray-300 mb-4">Send your details and we'll respond within 24 hours</p>
                <a href={`${contactInfo.ctas.emailBase}${contactInfo.company.service}`}>
                  <Button className="w-full bg-orange-600 hover:bg-orange-700" data-testid="button-email-card">
                    {contactInfo.company.service}
                  </Button>
                </a>
              </CardContent>
            </Card>
          </div>
          
          <div className="bg-slate-800/40 border border-slate-700/50 rounded-lg p-6 mb-8">
            <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
              <MessageCircle className="w-5 h-5 text-blue-400" />
              Reach Out to Our Founders
            </h3>
            <div className="grid md:grid-cols-3 gap-4">
              {contactInfo.founders.map((founder) => (
                <div key={founder.name} className="p-4 bg-slate-900/40 rounded border border-slate-700/30">
                  <p className="text-white font-semibold text-sm mb-1">{founder.name}</p>
                  <p className="text-xs text-emerald-300 mb-3">{founder.title}</p>
                  <div className="space-y-2">
                    <a 
                      href={`${contactInfo.ctas.emailBase}${founder.email}`}
                      className="flex items-center gap-2 text-gray-300 hover:text-emerald-400 transition-colors text-xs"
                    >
                      <Mail className="w-3 h-3" />
                      {founder.email}
                    </a>
                    <a 
                      href={`${contactInfo.ctas.whatsappBase}${founder.whatsappLink}?text=Hi%20${founder.name.replace(' ', '%20')}%2C%20I%27m%20interested%20in%20relocating%20to%20Dubai`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 text-gray-300 hover:text-blue-400 transition-colors text-xs"
                    >
                      <MessageCircle className="w-3 h-3" />
                      {founder.whatsapp}
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Investor Network CTA */}
      <section className="py-16 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Join the DeliWer Investor Network</h2>
          <p className="text-primary-foreground/80 mb-8 max-w-2xl mx-auto">
            Connect with founders, investors, and venture partners. Access exclusive investment opportunities, events, and personalized advisory.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/relocate-community">
              <Button size="lg" variant="secondary">
                <Users className="w-4 h-4 mr-2" />
                Join Investor Circle
              </Button>
            </Link>
            <Link href="/relocate-community#inner-ring">
              <Button size="lg" variant="outline" className="border-primary-foreground/30 text-primary-foreground">
                <Shield className="w-4 h-4 mr-2" />
                Apply for Inner Ring
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* PHASE 6: PARTNERS (Trust Expansion - Revealed Last) */}
      <section className="py-20 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 mb-16 md:mb-0">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-4xl mx-auto mb-16">
            <Badge className="mb-4 bg-emerald-500/20 text-emerald-400 border-emerald-500/30">
              <Landmark className="w-3 h-3 mr-1" />
              Partner Ecosystem
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white" data-testid="text-partner-ecosystem">
              Trusted Partners for Your Dubai Journey
            </h2>
            <p className="text-gray-400 mb-8 text-lg leading-relaxed">
              Our vetted network of real estate, business setup, and lifestyle partners 
              ensures a seamless transition to your new life in Dubai.
            </p>
          </div>

          {/* Category Overview */}
          <div className="grid md:grid-cols-3 gap-4 mb-16">
            <div className="p-6 rounded-lg bg-white/5 border border-white/10 backdrop-blur-sm hover-elevate">
              <Building2 className="w-8 h-8 text-emerald-400 mx-auto mb-3" />
              <h3 className="font-semibold text-white mb-2">Workspaces</h3>
              <p className="text-sm text-gray-400">Co-working and office solutions</p>
            </div>
            <div className="p-6 rounded-lg bg-white/5 border border-white/10 backdrop-blur-sm hover-elevate">
              <Briefcase className="w-8 h-8 text-blue-400 mx-auto mb-3" />
              <h3 className="font-semibold text-white mb-2">Freezones</h3>
              <p className="text-sm text-gray-400">Business setup & operations</p>
            </div>
            <div className="p-6 rounded-lg bg-white/5 border border-white/10 backdrop-blur-sm hover-elevate">
              <Heart className="w-8 h-8 text-pink-400 mx-auto mb-3" />
              <h3 className="font-semibold text-white mb-2">Lifestyle</h3>
              <p className="text-sm text-gray-400">Premium amenities & services</p>
            </div>
          </div>

          {/* Workspaces Section */}
          <div className="mb-16">
            <h3 className="text-2xl font-bold text-white mb-8 flex items-center gap-2">
              <Building2 className="w-6 h-6 text-emerald-400" />
              Featured Workspaces
            </h3>
            <div className="grid md:grid-cols-4 gap-6">
              {[
                { name: "FoundersHQ", description: "Startup ecosystem & community" },
                { name: "Scality", description: "Innovation & tech workspace" },
                { name: "in5", description: "Entrepreneurship & growth hub" },
                { name: "Expo City", description: "Events & exhibition space" }
              ].map((workspace, idx) => (
                <div 
                  key={idx} 
                  className="p-6 rounded-lg bg-gradient-to-br from-emerald-900/30 to-emerald-900/10 border border-emerald-500/30 hover-elevate transition-all"
                >
                  <div className="flex items-center justify-center h-20 bg-white/5 rounded-lg mb-4 border border-emerald-500/20">
                    <span className="text-2xl font-bold text-emerald-400">{workspace.name.substring(0, 2).toUpperCase()}</span>
                  </div>
                  <h4 className="font-semibold text-white mb-2 text-center">{workspace.name}</h4>
                  <p className="text-sm text-gray-400 text-center">{workspace.description}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Freezones Section */}
          <div className="mb-16">
            <h3 className="text-2xl font-bold text-white mb-8 flex items-center gap-2">
              <Briefcase className="w-6 h-6 text-blue-400" />
              Premium Freezones
            </h3>
            <div className="grid md:grid-cols-3 lg:grid-cols-6 gap-4">
              {[
                { name: "DAFZA", description: "Dubai Airport Freezone" },
                { name: "Commercity", description: "Commerce hub" },
                { name: "IFZA", description: "International Freezone" },
                { name: "RAKEZ", description: "Ras Al Khaimah" },
                { name: "Dubai South", description: "Southern gateway" },
                { name: "Future District", description: "Innovation zone" }
              ].map((freezone, idx) => (
                <div 
                  key={idx} 
                  className="p-4 rounded-lg bg-gradient-to-br from-blue-900/30 to-blue-900/10 border border-blue-500/30 hover-elevate transition-all"
                >
                  <div className="flex items-center justify-center h-16 bg-white/5 rounded-lg mb-3 border border-blue-500/20">
                    <span className="text-lg font-bold text-blue-400">{freezone.name.substring(0, 2).toUpperCase()}</span>
                  </div>
                  <h4 className="font-semibold text-white mb-1 text-sm text-center">{freezone.name}</h4>
                  <p className="text-xs text-gray-400 text-center">{freezone.description}</p>
                </div>
              ))}
            </div>
          </div>

          {/* CTA Button */}
          <div className="text-center">
            <Link href="/partners">
              <Button size="lg" className="bg-gradient-to-r from-emerald-600 to-blue-600 hover:from-emerald-700 hover:to-blue-700 text-white" data-testid="button-explore-partners">
                <ArrowRight className="w-4 h-4 mr-2" />
                Explore Full Partner Ecosystem
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
