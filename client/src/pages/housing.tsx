import { Link } from "wouter";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CalendlyButton } from "@/components/calendly-popup";
import { HousingEnquiryForm } from "@/components/housing-enquiry-form";
import { 
  Home, 
  Building2, 
  TrendingUp, 
  ArrowRight, 
  CheckCircle2,
  Key,
  Briefcase,
  Users,
  Calendar,
  MessageCircle,
  MapPin,
  Shield,
  FileCheck,
  Zap,
  Share2,
  Facebook,
  Linkedin,
  Mail,
  Phone,
  ExternalLink
} from "lucide-react";

// Import lifestyle images
import residentsHero from "@assets/stock_images/modern_dubai_apartme_3d49f8dc.jpg";
import touristsHero from "@assets/stock_images/travelers_tourists_d_dc8fcb30.jpg";
import investorsHero from "@assets/stock_images/luxury_dubai_real_es_778948b4.jpg";
import marketImage from "@assets/stock_images/dubai_downtown_skyli_01395ddb.jpg";

export default function Housing() {
  const [enquiryOpen, setEnquiryOpen] = useState(false);
  const [selectedSegment, setSelectedSegment] = useState<"rent" | "buy" | "invest">("rent");

  const openEnquiry = (segment: "rent" | "buy" | "invest") => {
    setSelectedSegment(segment);
    setEnquiryOpen(true);
  };

  return (
    <div className="min-h-screen bg-background">
      <HousingEnquiryForm open={enquiryOpen} onOpenChange={setEnquiryOpen} segment={selectedSegment} />
      {/* SECTION 1: HERO - "Find Your Place in Dubai" */}
      <section className="relative py-20 overflow-hidden min-h-[500px] flex items-center">
        {/* Background Image with Dark Wash Overlay */}
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `linear-gradient(135deg, rgba(15, 23, 42, 0.75) 0%, rgba(30, 41, 59, 0.7) 50%, rgba(15, 23, 42, 0.75) 100%), url(${marketImage})`,
            backgroundSize: "cover",
            backgroundPosition: "center"
          }}
        ></div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6" data-testid="text-hero-title">
              Find the Right Home in Dubai.
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-400"> Without the Guesswork.</span>
            </h1>
            <p className="text-lg md:text-xl text-gray-300 mb-8 max-w-2xl mx-auto" data-testid="text-hero-subtext">
              Whether you're visiting, relocating, or investing — we help you navigate Dubai's housing market with clarity and care.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center flex-wrap">
              <Button 
                size="lg" 
                className="bg-blue-600 hover:bg-blue-500" 
                onClick={() => openEnquiry("rent")}
                data-testid="button-speak-advisor-primary"
              >
                <MessageCircle className="w-4 h-4 mr-2" />
                Speak to a Dubai Housing Advisor
              </Button>
              <Button 
                size="lg" 
                variant="outline"
                className="border-white/30 text-white backdrop-blur-sm bg-white/10" 
                onClick={() => openEnquiry("rent")}
                data-testid="button-explore-options"
              >
                <ArrowRight className="w-4 h-4 mr-2" />
                Explore Rent, Buy & Invest Options
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 2: WHO THIS IS FOR (3 Clarity Cards with Images) */}
      <section className="relative py-16 px-4">
        {/* Background Image with Dark Overlay */}
        <div 
          className="absolute inset-0 z-0"
          style={{
            backgroundImage: `linear-gradient(180deg, rgba(15, 23, 42, 0.85) 0%, rgba(30, 41, 59, 0.8) 100%)`,
            backgroundSize: "cover",
            backgroundPosition: "center"
          }}
        ></div>
        <div className="container mx-auto relative z-10">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4" data-testid="text-who-this-is-for">
              Who This Is For
            </h2>
            <p className="text-gray-300 max-w-2xl mx-auto" data-testid="text-clarity-description">
              We serve tourists, new residents, and investors. Each path is unique. We meet you where you are.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 mb-8">
            {/* Tourists & Short-Term Visitors */}
            <Card className="hover-elevate overflow-hidden" data-testid="card-who-tourists">
              <div className="relative h-48 overflow-hidden">
                <img 
                  src={touristsHero} 
                  alt="Tourists enjoying Dubai short-term rental" 
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
              </div>
              <CardHeader className="relative z-10">
                <div className="w-12 h-12 rounded-md bg-amber-500/10 flex items-center justify-center mb-4">
                  <Users className="w-6 h-6 text-amber-500" />
                </div>
                <CardTitle className="text-2xl">Tourists & Short-Term Visitors</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-amber-500 flex-shrink-0" />
                    Monthly rentals
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-amber-500 flex-shrink-0" />
                    Serviced apartments
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-amber-500 flex-shrink-0" />
                    Flexible options
                  </li>
                </ul>
              </CardContent>
            </Card>

            {/* New Residents */}
            <Card className="hover-elevate overflow-hidden" data-testid="card-who-residents">
              <div className="relative h-48 overflow-hidden">
                <img 
                  src={residentsHero} 
                  alt="Modern Dubai apartment for new residents" 
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
              </div>
              <CardHeader className="relative z-10">
                <div className="w-12 h-12 rounded-md bg-green-500/10 flex items-center justify-center mb-4">
                  <Home className="w-6 h-6 text-green-500" />
                </div>
                <CardTitle className="text-2xl">New Residents</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-green-500 flex-shrink-0" />
                    Long-term rentals
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-green-500 flex-shrink-0" />
                    Family-friendly communities
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-green-500 flex-shrink-0" />
                    Proximity to schools & work
                  </li>
                </ul>
              </CardContent>
            </Card>

            {/* Investors & Buyers */}
            <Card className="hover-elevate overflow-hidden" data-testid="card-who-investors">
              <div className="relative h-48 overflow-hidden">
                <img 
                  src={investorsHero} 
                  alt="Luxury Dubai investment property" 
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
              </div>
              <CardHeader className="relative z-10">
                <div className="w-12 h-12 rounded-md bg-purple-500/10 flex items-center justify-center mb-4">
                  <TrendingUp className="w-6 h-6 text-purple-500" />
                </div>
                <CardTitle className="text-2xl">Investors & Buyers</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-purple-500 flex-shrink-0" />
                    Residential investments
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-purple-500 flex-shrink-0" />
                    End-user homes
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-purple-500 flex-shrink-0" />
                    Fractional or long-term ownership
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>

          <div className="text-center">
            <Button 
              size="lg" 
              className="bg-blue-600 hover:bg-blue-500" 
              onClick={() => openEnquiry("rent")}
              data-testid="button-discuss-situation"
            >
              <MessageCircle className="w-4 h-4 mr-2" />
              Discuss Your Situation
            </Button>
          </div>
        </div>
      </section>

      {/* SECTION 3: HOW WE HELP (Trust Builder) */}
      <section className="relative py-16 px-4">
        {/* Background Overlay */}
        <div 
          className="absolute inset-0 z-0"
          style={{
            backgroundImage: `linear-gradient(180deg, rgba(15, 23, 42, 0.85) 0%, rgba(30, 41, 59, 0.8) 100%)`,
            backgroundSize: "cover",
            backgroundPosition: "center"
          }}
        ></div>
        <div className="container mx-auto relative z-10">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4" data-testid="text-how-we-help">
              How We Help
            </h2>
            <p className="text-gray-300 text-lg mb-8" data-testid="text-how-we-help-intro">
              We don't just show listings. We guide you through Dubai's real housing landscape.
            </p>

            <div className="grid md:grid-cols-2 gap-6 mb-8">
              {[
                { icon: MapPin, label: "Area & community guidance" },
                { icon: Key, label: "Rental & purchase advisory" },
                { icon: Building2, label: "Off-plan & ready properties" },
                { icon: Users, label: "Direct access to developers & landlords" },
                { icon: FileCheck, label: "Negotiation & paperwork support" },
                { icon: Shield, label: "Trusted broker partnerships" }
              ].map((item, idx) => (
                <div key={idx} className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-md bg-blue-500/10 flex items-center justify-center flex-shrink-0 mt-1">
                    <item.icon className="w-5 h-5 text-blue-400" />
                  </div>
                  <div>
                    <p className="text-white font-medium">{item.label}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="bg-blue-900/30 border border-blue-500/20 rounded-lg p-6 mb-8">
              <p className="text-gray-300 text-sm md:text-base">
                <span className="font-semibold text-blue-300">Working alongside trusted brokers and developers,</span> including <span className="font-semibold">Fäm Properties</span>, to ensure reliable, transparent outcomes.
              </p>
            </div>

            <Button 
              size="lg" 
              className="bg-blue-600 hover:bg-blue-500 w-full sm:w-auto" 
              onClick={() => openEnquiry("rent")}
              data-testid="button-book-consultation"
            >
              <Calendar className="w-4 h-4 mr-2" />
              Book a Housing Consultation
            </Button>
          </div>
        </div>
      </section>

      {/* SECTION 4: LIVE MARKET INSIGHT (AI-Assisted Context) */}
      <section className="relative py-16 px-4">
        {/* Background Overlay */}
        <div 
          className="absolute inset-0 z-0"
          style={{
            backgroundImage: `linear-gradient(180deg, rgba(15, 23, 42, 0.85) 0%, rgba(30, 41, 59, 0.8) 100%)`,
            backgroundSize: "cover",
            backgroundPosition: "center"
          }}
        ></div>
        <div className="container mx-auto relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <Badge variant="secondary" className="mb-6 bg-cyan-500/20 text-cyan-400 border-cyan-500/30">
              <Zap className="w-3 h-3 mr-1" />
              Market Intelligence
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4" data-testid="text-market-insight">
              Live Market Insight
            </h2>
            <p className="text-gray-300 text-lg mb-6" data-testid="text-market-insight-intro">
              We use market intelligence tools and data platforms to understand:
            </p>

            <div className="grid md:grid-cols-2 gap-4 mb-8 max-w-2xl mx-auto">
              {[
                "Pricing trends",
                "Rental yields",
                "Area demand",
                "Transaction history"
              ].map((item, idx) => (
                <div key={idx} className="flex items-center justify-center gap-2 py-2">
                  <CheckCircle2 className="w-5 h-5 text-cyan-400 flex-shrink-0" />
                  <span className="text-gray-300">{item}</span>
                </div>
              ))}
            </div>

            <p className="text-gray-400 text-sm mb-8">
              Inspired by platforms such as <span className="font-semibold text-gray-300">realiste.ai</span> and <span className="font-semibold text-gray-300">dxbinteract.com</span>, we position market intelligence as <span className="italic text-gray-300">advisor-led insight</span> — not algorithm-driven decisions.
            </p>

            <Button 
              size="lg" 
              className="bg-cyan-600 hover:bg-cyan-500" 
              onClick={() => openEnquiry("rent")}
              data-testid="button-market-conditions"
            >
              <MessageCircle className="w-4 h-4 mr-2" />
              Ask About Market Conditions
            </Button>
          </div>
        </div>
      </section>

      {/* SECTION 5: RENT | BUY | INVEST (Decision Path - Expandable Sections) */}
      <section className="py-16 px-4 bg-gradient-to-r from-slate-900/20 to-slate-800/20">
        <div className="container mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-12 text-center" data-testid="text-rent-buy-invest">
            Rent, Buy, or Invest
          </h2>

          <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {/* Rent */}
            <Card className="hover-elevate" data-testid="card-decision-rent">
              <CardHeader>
                <div className="w-12 h-12 rounded-md bg-blue-500/10 flex items-center justify-center mb-4">
                  <Key className="w-6 h-6 text-blue-500" />
                </div>
                <CardTitle className="text-2xl">Rent</CardTitle>
                <p className="text-sm text-cyan-300 mt-2">Perfect for travelers & relocating professionals</p>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3 mb-6">
                  <li className="flex items-start gap-2 text-sm text-muted-foreground">
                    <CheckCircle2 className="w-4 h-4 text-blue-500 mt-0.5 flex-shrink-0" />
                    <span>Short & long-term options</span>
                  </li>
                  <li className="flex items-start gap-2 text-sm text-muted-foreground">
                    <CheckCircle2 className="w-4 h-4 text-blue-500 mt-0.5 flex-shrink-0" />
                    <span>Furnished or unfurnished</span>
                  </li>
                  <li className="flex items-start gap-2 text-sm text-muted-foreground">
                    <CheckCircle2 className="w-4 h-4 text-blue-500 mt-0.5 flex-shrink-0" />
                    <span>Fast move-in support</span>
                  </li>
                </ul>
                <Button 
                  className="w-full" 
                  onClick={() => openEnquiry("rent")}
                  data-testid="button-talk-advisor-rent"
                >
                  Talk to an Advisor
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </CardContent>
            </Card>

            {/* Buy */}
            <Card className="hover-elevate" data-testid="card-decision-buy">
              <CardHeader>
                <div className="w-12 h-12 rounded-md bg-green-500/10 flex items-center justify-center mb-4">
                  <Home className="w-6 h-6 text-green-500" />
                </div>
                <CardTitle className="text-2xl">Buy</CardTitle>
                <p className="text-sm text-emerald-300 mt-2">For residents and Golden Visa seekers</p>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3 mb-6">
                  <li className="flex items-start gap-2 text-sm text-muted-foreground">
                    <CheckCircle2 className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                    <span>End-user homes</span>
                  </li>
                  <li className="flex items-start gap-2 text-sm text-muted-foreground">
                    <CheckCircle2 className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                    <span>Family residences</span>
                  </li>
                  <li className="flex items-start gap-2 text-sm text-muted-foreground">
                    <CheckCircle2 className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                    <span>Ready & off-plan</span>
                  </li>
                </ul>
                <Button 
                  className="w-full" 
                  onClick={() => openEnquiry("buy")}
                  data-testid="button-talk-advisor-buy"
                >
                  Talk to an Advisor
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </CardContent>
            </Card>

            {/* Invest */}
            <Card className="hover-elevate" data-testid="card-decision-invest">
              <CardHeader>
                <div className="w-12 h-12 rounded-md bg-purple-500/10 flex items-center justify-center mb-4">
                  <TrendingUp className="w-6 h-6 text-purple-500" />
                </div>
                <CardTitle className="text-2xl">Invest</CardTitle>
                <p className="text-sm text-violet-300 mt-2">For wealth-building entrepreneurs</p>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3 mb-6">
                  <li className="flex items-start gap-2 text-sm text-muted-foreground">
                    <CheckCircle2 className="w-4 h-4 text-purple-500 mt-0.5 flex-shrink-0" />
                    <span>Capital-safe options</span>
                  </li>
                  <li className="flex items-start gap-2 text-sm text-muted-foreground">
                    <CheckCircle2 className="w-4 h-4 text-purple-500 mt-0.5 flex-shrink-0" />
                    <span>Long-term appreciation</span>
                  </li>
                  <li className="flex items-start gap-2 text-sm text-muted-foreground">
                    <CheckCircle2 className="w-4 h-4 text-purple-500 mt-0.5 flex-shrink-0" />
                    <span>Rental income guidance</span>
                  </li>
                </ul>
                <Button 
                  className="w-full" 
                  onClick={() => openEnquiry("invest")}
                  data-testid="button-talk-advisor-invest"
                >
                  Talk to an Advisor
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* SECTION 6: CONNECTION TO RELOCATION (Bridge) */}
      <section className="py-16 px-4">
        <div className="container mx-auto">
          <div className="max-w-3xl mx-auto text-center bg-gradient-to-br from-indigo-900/30 to-blue-900/30 border border-blue-500/20 rounded-lg p-8 md:p-12">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4" data-testid="text-relocation-bridge">
              Many People Start Here
            </h2>
            <p className="text-gray-300 text-lg mb-8" data-testid="text-relocation-bridge-desc">
              Many people start by finding a home. Some go on to relocate their lives or businesses to Dubai. Whatever your journey, we're here to support you every step.
            </p>
            <Link href="/relocate">
              <Button 
                size="lg" 
                className="bg-indigo-600 hover:bg-indigo-500" 
                data-testid="button-explore-relocation"
              >
                <ArrowRight className="w-4 h-4 mr-2" />
                Explore Relocation Support
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* SECTION 7A: EXPERT ADVISOR SPOTLIGHT */}
      <section className="py-16 px-4 bg-gradient-to-r from-blue-600/20 to-indigo-600/20 border-y border-blue-500/20">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <Badge className="mb-4 bg-blue-600 text-white" data-testid="badge-featured-expert">
              Featured Expert Advisor
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Meet Your Real Estate Expert</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <Card className="bg-slate-800 border-blue-500/30 col-span-full md:col-span-2" data-testid="card-advisor-profile">
              <CardContent className="p-6">
                <div className="flex flex-col md:flex-row gap-6">
                  <div className="flex-shrink-0">
                    <div className="w-24 h-24 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full flex items-center justify-center text-white font-bold text-2xl">
                      KHS
                    </div>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-2xl font-bold text-white mb-1" data-testid="text-advisor-name">
                      Kalbe-Hussain Sheikh
                    </h3>
                    <p className="text-blue-400 font-semibold mb-3 text-lg" data-testid="text-advisor-title">
                      Dubai Real Estate Expert & Housing Advisor
                    </p>
                    <p className="text-gray-300 mb-4" data-testid="text-advisor-bio">
                      Specialized in connecting tourists, new residents, investors, and entrepreneurs with ideal properties across Dubai's premium neighborhoods. Trusted broker partner with deep market insight and access to exclusive listings.
                    </p>
                    <div className="flex flex-wrap gap-3">
                      <Button 
                        size="sm" 
                        className="bg-green-600 hover:bg-green-500 gap-2"
                        onClick={() => window.open('https://wa.me/+971556573114', '_blank')}
                        data-testid="button-whatsapp-advisor"
                      >
                        <MessageCircle className="w-4 h-4" />
                        WhatsApp: +971 55 657 3114
                      </Button>
                      <Button 
                        size="sm" 
                        variant="outline"
                        className="border-blue-500 text-blue-400 hover:bg-blue-500/10 gap-2"
                        onClick={() => window.open('https://www.linkedin.com/in/kalbe-hussain-b89bb1224/', '_blank')}
                        data-testid="button-linkedin-advisor"
                      >
                        <Linkedin className="w-4 h-4" />
                        LinkedIn Profile
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card className="bg-slate-800 border-green-500/30" data-testid="card-advisor-support">
              <CardHeader className="pb-3">
                <CardTitle className="text-lg text-white flex items-center gap-2">
                  <Mail className="w-4 h-4 text-green-500" />
                  Support Team
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div>
                  <p className="text-xs text-gray-400 mb-1">Email</p>
                  <a 
                    href="mailto:service@deliwer.com" 
                    className="text-green-400 hover:text-green-300 font-semibold text-sm break-all"
                    data-testid="link-support-email"
                  >
                    service@deliwer.com
                  </a>
                </div>
                <div>
                  <p className="text-xs text-gray-400 mb-1">WhatsApp</p>
                  <a 
                    href="https://wa.me/+971556573114" 
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-green-400 hover:text-green-300 font-semibold text-sm"
                    data-testid="link-advisor-whatsapp"
                  >
                    +971 55 657 3114
                  </a>
                </div>
                <p className="text-xs text-gray-500 mt-4 italic">
                  Response time: Within 2-4 hours
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* SECTION 7B: BROKER NETWORK & PARTNERSHIPS */}
      <section className="py-16 px-4 bg-slate-900/50">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <Badge className="mb-4 bg-purple-600 text-white" data-testid="badge-broker-network">
              Trusted Network
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Major Broker & Developer Network</h2>
            <p className="text-gray-300 max-w-2xl mx-auto">
              Our expert advisors work alongside Dubai's most reputable brokers, developers, and real estate firms to give you access to exclusive properties and market insights.
            </p>
          </div>
          <div className="grid md:grid-cols-4 gap-4 max-w-4xl mx-auto">
            {[
              { name: "Fäm Properties", highlight: "Trusted Partner" },
              { name: "Premium Brokers Network", highlight: "50+ Agents" },
              { name: "Major Developers", highlight: "Emaar, Damac, etc." },
              { name: "Exclusive Listings", highlight: "Off-Market Properties" }
            ].map((item, idx) => (
              <Card key={idx} className="bg-slate-800 border-purple-500/20 text-center p-4" data-testid={`card-broker-${idx}`}>
                <p className="text-purple-400 text-sm font-semibold mb-1">{item.highlight}</p>
                <p className="text-white font-semibold">{item.name}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 7C: SHARING & REFERRAL TOOLS */}
      <section className="py-16 px-4 bg-gradient-to-br from-blue-900/30 to-indigo-900/30">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <Badge className="mb-4 bg-blue-600 text-white" data-testid="badge-share-earn">
              Share & Earn Rewards
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Help Others Find Their Home</h2>
            <p className="text-gray-300 max-w-2xl mx-auto mb-8">
              Share DeliWer with your network and earn rewards when referrals complete housing transactions.
            </p>
          </div>
          <div className="max-w-2xl mx-auto space-y-6">
            <Card className="bg-slate-800 border-blue-500/30" data-testid="card-share-options">
              <CardContent className="p-8">
                <h3 className="text-xl font-semibold text-white mb-6">Share on Social Media</h3>
                <div className="grid md:grid-cols-2 gap-4">
                  <Button 
                    onClick={() => window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent('https://deliwer.com/housing')}`, '_blank')}
                    className="gap-2 bg-blue-600 hover:bg-blue-500 text-white"
                    data-testid="button-share-facebook-page"
                  >
                    <Facebook className="w-4 h-4" />
                    Share on Facebook
                  </Button>
                  <Button 
                    onClick={() => window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent('https://deliwer.com/housing')}`, '_blank')}
                    className="gap-2 bg-blue-700 hover:bg-blue-600 text-white"
                    data-testid="button-share-linkedin-page"
                  >
                    <Linkedin className="w-4 h-4" />
                    Share on LinkedIn
                  </Button>
                  <Button 
                    onClick={() => window.open(`https://wa.me/?text=${encodeURIComponent('Check out this amazing Dubai housing solution: https://deliwer.com/housing')}`, '_blank')}
                    className="gap-2 bg-green-600 hover:bg-green-500 text-white"
                    data-testid="button-share-whatsapp-page"
                  >
                    <MessageCircle className="w-4 h-4" />
                    Share on WhatsApp
                  </Button>
                  <Button 
                    onClick={() => window.open(`mailto:?subject=Amazing Dubai Housing Solution&body=${encodeURIComponent('Check out DeliWer for finding your perfect home in Dubai: https://deliwer.com/housing')}`, '_blank')}
                    className="gap-2 bg-red-600 hover:bg-red-500 text-white"
                    data-testid="button-share-email-page"
                  >
                    <Mail className="w-4 h-4" />
                    Share via Email
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-slate-800 border-green-500/30" data-testid="card-referral-link">
              <CardContent className="p-8">
                <h3 className="text-xl font-semibold text-white mb-4">Get Your Referral Link</h3>
                <p className="text-gray-300 mb-6">
                  Submit the form below to get a unique referral link you can share with friends. Track your referrals and earn rewards!
                </p>
                <Button 
                  size="lg"
                  onClick={() => openEnquiry("rent")}
                  className="w-full bg-green-600 hover:bg-green-500 gap-2"
                  data-testid="button-get-referral-link"
                >
                  <Share2 className="w-4 h-4" />
                  Start Your Enquiry & Get Referral Link
                </Button>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-r from-yellow-900/30 to-amber-900/30 border-yellow-600/30" data-testid="card-christmas-promotion">
              <CardContent className="p-8">
                <div className="flex gap-4">
                  <div className="text-3xl">🎄</div>
                  <div>
                    <h3 className="text-xl font-bold text-white mb-2">Holiday Season Special</h3>
                    <p className="text-gray-300 mb-3">
                      <strong>Bonus Referral Rewards</strong> during the Christmas & New Year travel season! More visitors = More opportunities to earn.
                    </p>
                    <p className="text-sm text-gray-400">Peak travel season: Dec 20 - Jan 10</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* SECTION 7: LEAD CAPTURE (No Friction) */}
      <section className="py-16 px-4 bg-gradient-to-br from-blue-900/30 to-indigo-900/30">
        <div className="container mx-auto">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4" data-testid="text-final-cta">
              Ready to Find Your Dubai Home?
            </h2>
            <p className="text-gray-300 text-lg mb-8" data-testid="text-final-cta-desc">
              Speak with our housing advisors to explore options that match your lifestyle and goals.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center flex-wrap">
              <Button 
                size="lg" 
                className="bg-blue-600 hover:bg-blue-500" 
                onClick={() => openEnquiry("rent")}
                data-testid="button-book-free-consultation"
              >
                <Calendar className="w-4 h-4 mr-2" />
                Book a Free Expert Consultation
              </Button>
              <Button 
                size="lg" 
                variant="outline" 
                className="border-white/30 text-white backdrop-blur-sm bg-white/10" 
                onClick={() => openEnquiry("rent")}
                data-testid="button-speak-advisor-final"
              >
                <MessageCircle className="w-4 h-4 mr-2" />
                Speak to an Advisor
              </Button>
            </div>
            <p className="text-gray-400 text-sm mt-8 italic">
              All leads tagged as "Housing Enquiry" are routed to our team at info@deliwer.com and Kalbe-Hussain Sheikh
            </p>
          </div>
        </div>
      </section>

      {/* CHRISTMAS LAUNCH FOOTER */}
      <section className="py-16 px-4 border-t border-gray-800 bg-slate-900/50">
        <div className="container mx-auto">
          <div className="max-w-4xl mx-auto">
            <div className="grid md:grid-cols-3 gap-8 mb-12">
              <div className="text-center" data-testid="footer-contact-support">
                <h3 className="text-white font-bold mb-3 flex items-center justify-center gap-2">
                  <Mail className="w-4 h-4 text-blue-400" />
                  Email Support
                </h3>
                <a href="mailto:service@deliwer.com" className="text-blue-400 hover:text-blue-300">
                  service@deliwer.com
                </a>
              </div>
              <div className="text-center" data-testid="footer-whatsapp-advisor">
                <h3 className="text-white font-bold mb-3 flex items-center justify-center gap-2">
                  <Phone className="w-4 h-4 text-green-400" />
                  Expert Advisor
                </h3>
                <a href="https://wa.me/+971556573114" target="_blank" rel="noopener noreferrer" className="text-green-400 hover:text-green-300">
                  Kalbe-Hussain Sheikh
                </a>
                <p className="text-xs text-gray-500 mt-1">WhatsApp: +971 55 657 3114</p>
              </div>
              <div className="text-center" data-testid="footer-linkedin-connection">
                <h3 className="text-white font-bold mb-3 flex items-center justify-center gap-2">
                  <Linkedin className="w-4 h-4 text-blue-500" />
                  Professional Network
                </h3>
                <a href="https://www.linkedin.com/in/kalbe-hussain-b89bb1224/" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:text-blue-300">
                  Connect on LinkedIn
                </a>
              </div>
            </div>

            <div className="border-t border-gray-800 pt-8 space-y-4 text-center">
              <p className="text-gray-400 text-sm">
                <span className="font-semibold text-gray-300">🎄 Christmas Launch 2024:</span> DeliWer Housing is equipped with maximum reach during the peak travel season. Backed by Dubai's trusted broker network.
              </p>
              <p className="text-gray-400 text-sm">
                <span className="font-semibold text-gray-300">Compliance Note:</span> All housing support is advisory. Final transactions are handled by licensed brokers and partners in accordance with UAE regulations. Kalbe-Hussain Sheikh is a trusted real estate advisor and broker partner.
              </p>
              <p className="text-gray-500 text-xs mt-6">
                DeliWer © 2024 | Powered by Expert Real Estate Advisors | All Leads Welcome
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
