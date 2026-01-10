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
  Users,
  Calendar,
  MessageCircle,
  MapPin,
  Shield,
  FileCheck,
  Zap,
  Facebook,
  Linkedin,
  Mail,
  Phone,
  Search,
  Clock,
  Info
} from "lucide-react";

// Import lifestyle images
import marketImage from "@assets/stock_images/dubai_downtown_skyli_01395ddb.jpg";
import touristsHero from "@assets/stock_images/travelers_tourists_d_dc8fcb30.jpg";
import residentsHero from "@assets/stock_images/modern_dubai_apartme_3d49f8dc.jpg";
import investorsHero from "@assets/stock_images/luxury_dubai_real_es_778948b4.jpg";

export default function Housing() {
  const [enquiryOpen, setEnquiryOpen] = useState(false);
  const [selectedSegment, setSelectedSegment] = useState<"rent" | "buy" | "invest">("rent");
  const [showStayResponse, setShowStayResponse] = useState(false);

  const openEnquiry = (segment: "rent" | "buy" | "invest") => {
    setSelectedSegment(segment);
    setEnquiryOpen(true);
  };

  return (
    <div className="min-h-screen bg-background">
      <HousingEnquiryForm open={enquiryOpen} onOpenChange={setEnquiryOpen} segment={selectedSegment} />
      {/* MANDATORY DISCLAIMER BANNER */}
      <div className="bg-amber-500 py-2 px-4 text-center text-black font-bold text-sm">
        ⚠️ DeliWer does not sell property or act as a real estate agent.
      </div>
      {/* SECTION 1: HERO */}
      <section className="relative py-20 overflow-hidden min-h-[400px] flex items-center">
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `linear-gradient(135deg, rgba(15, 23, 42, 0.85) 0%, rgba(30, 41, 59, 0.8) 100%), url(${marketImage})`,
          }}
        ></div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6" data-testid="text-hero-title">
              Residence in Dubai.
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-400"> Managed Living Support.</span>
            </h1>
            <p className="text-lg md:text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
              We help you find, settle, and thrive in Dubai with dedicated relocation and community support.
            </p>
          </div>
        </div>
      </section>
      {/* SECTION 2: CORE MENU - RESIDENCE IN DUBAI */}
      <section className="relative py-16 px-4 bg-slate-950" id="residence-menu">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <p className="text-gray-400 max-w-xl mx-auto italic">DeliWer is built for people who actually live in Dubai.
            Not for listings. Not for commissions. Not for luxury theater.

            Just reliable execution — when it matters.</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto">
            {/* 1) New Resident Essentials */}
            <Card className="bg-slate-900 border-emerald-500/30 flex flex-col shadow-2xl hover-elevate" data-testid="card-essentials">
              <CardHeader>
                <div className="w-12 h-12 rounded-full bg-emerald-500/20 flex items-center justify-center mb-4 border border-emerald-500/50">
                  <Home className="w-6 h-6 text-emerald-400" />
                </div>
                <CardTitle className="text-xl text-white">New Resident Essentials</CardTitle>
                <CardDescription className="text-emerald-300/70 font-bold">
                  AED 1,499
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4 flex-1">
                <p className="text-gray-400 text-sm">FOR NEW RESIDENTS: Moving to Dubai or just arrived?</p>
                <ul className="space-y-2">
                  {[
                    "Deep move-in cleaning",
                    "Drinking water setup",
                    "Basic maintenance inspection",
                    "WhatsApp coordination",
                    "Priority scheduling"
                  ].map((feature, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-gray-300">
                      <CheckCircle2 className="w-4 h-4 text-emerald-500 mt-0.5 shrink-0" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
                <Button 
                  className="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-bold py-6 rounded-xl transition-all mt-auto"
                  onClick={() => openEnquiry("rent")}
                  data-testid="button-start-move-in"
                >
                  Start My Move-In
                </Button>
              </CardContent>
            </Card>

            {/* 2) Move-In Complete */}
            <Card className="bg-slate-900 border-blue-500/30 flex flex-col shadow-2xl hover-elevate" data-testid="card-move-in-complete">
              <CardHeader>
                <div className="w-12 h-12 rounded-full bg-blue-500/20 flex items-center justify-center mb-4 border border-blue-500/50">
                  <CheckCircle2 className="w-6 h-6 text-blue-400" />
                </div>
                <CardTitle className="text-xl text-white">Move-In Complete</CardTitle>
                <CardDescription className="text-blue-300/70 font-bold">
                  AED 2,999
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4 flex-1">
                <p className="text-gray-400 text-sm">For families and long-term residents who want everything handled.</p>
                <ul className="space-y-2">
                  {[
                    "Local moving assistance",
                    "Deep cleaning",
                    "Water setup",
                    "Maintenance fixes",
                    "Light furniture assembly",
                    "Dedicated move-in coordinator"
                  ].map((feature, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-gray-300">
                      <CheckCircle2 className="w-4 h-4 text-blue-500 mt-0.5 shrink-0" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
                <Button 
                  className="w-full bg-blue-600 hover:bg-blue-500 text-white font-bold py-6 rounded-xl transition-all mt-auto"
                  onClick={() => openEnquiry("rent")}
                  data-testid="button-book-move-in-complete"
                >
                  Book Move-In Complete
                </Button>
              </CardContent>
            </Card>

            {/* 3) Short-Term Living Support */}
            <Card className="bg-slate-900 border-orange-500/30 flex flex-col shadow-2xl hover-elevate" data-testid="card-short-term-support">
              <CardHeader>
                <div className="w-12 h-12 rounded-full bg-orange-500/20 flex items-center justify-center mb-4 border border-orange-500/50">
                  <Clock className="w-6 h-6 text-orange-400" />
                </div>
                <CardTitle className="text-xl text-white">Short-Term Living Setup</CardTitle>
                <CardDescription className="text-orange-300/70 font-bold">
                  AED 1,999 <span className="text-xs font-normal opacity-70">(excluding rent)</span>
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4 flex-1">
                <p className="text-gray-400 text-sm">Not ready for a long-term home? We coordinate short-term and serviced living, and handle the setup around it — so you can focus on work, family, or settling in.</p>
                <ul className="space-y-2">
                  {[
                    "Stay coordination",
                    "Cleaning & water setup",
                    "Maintenance support",
                    "Extension or relocation assistance"
                  ].map((feature, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-gray-300">
                      <CheckCircle2 className="w-4 h-4 text-orange-500 mt-0.5 shrink-0" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
                <Button 
                  className="w-full bg-orange-600 hover:bg-orange-500 text-white font-bold py-6 rounded-xl transition-all mt-auto"
                  onClick={() => openEnquiry("rent")}
                  data-testid="button-arrange-short-term"
                >
                  Arrange Short-Term Living
                </Button>
              </CardContent>
            </Card>

            {/* 4) Home Care Subscription */}
            <Card className="bg-slate-900 border-purple-500/30 flex flex-col shadow-2xl hover-elevate" data-testid="card-home-care">
              <CardHeader>
                <div className="w-12 h-12 rounded-full bg-purple-500/20 flex items-center justify-center mb-4 border border-purple-500/50">
                  <Zap className="w-6 h-6 text-purple-400" />
                </div>
                <CardTitle className="text-xl text-white">Home Care Subscription</CardTitle>
                <CardDescription className="text-purple-300/70 font-bold">
                  AED 299 / month
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4 flex-1">
                <p className="text-gray-400 text-sm">Once you’re settled, DeliWer continues supporting your home.</p>
                <ul className="space-y-2">
                  {[
                    "Priority maintenance",
                    "Discounted services",
                    "WhatsApp ticketing",
                    "Quarterly checkups"
                  ].map((feature, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-gray-200">
                      <CheckCircle2 className="w-4 h-4 text-purple-500 mt-0.5 shrink-0" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
                <Button 
                  className="w-full bg-purple-600 hover:bg-purple-500 text-white font-bold py-6 rounded-xl transition-all mt-auto"
                  onClick={() => openEnquiry("rent")}
                  data-testid="button-start-home-care"
                >
                  Start Home Care
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
      {/* SECTION 3: WHO THIS IS FOR */}
      <section className="py-20 px-4 bg-slate-900/30">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4 uppercase">FOR RESIDENTS & COMMUNITIES</h2>
            <div className="w-24 h-1 bg-blue-600 mx-auto rounded-full" />
            <p className="text-gray-400 mt-4 max-w-2xl mx-auto">Ongoing Home Support</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              { title: "Tourists & Visitors", icon: Users, color: "amber", img: touristsHero, features: ["Monthly options", "Managed apartments", "Flexible stay"] },
              { title: "New Residents", icon: Home, color: "green", img: residentsHero, features: ["Residence enablement", "Family communities", "School proximity"] },
              { title: "Investors & Founders", icon: TrendingUp, color: "purple", img: investorsHero, features: ["Residence units", "End-user support", "Market enablement"] }
            ].map((segment, idx) => (
              <div key={idx} className="group relative overflow-hidden rounded-2xl bg-slate-900 border border-slate-800 hover:border-blue-500/50 transition-all duration-500 shadow-xl">
                <div className="relative h-56 overflow-hidden">
                  <img src={segment.img} alt={segment.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent"></div>
                  <div className="absolute bottom-4 left-6">
                    <h3 className="text-2xl font-bold text-white">{segment.title}</h3>
                  </div>
                </div>
                <div className="p-6 space-y-4">
                  <ul className="space-y-3">
                    {segment.features.map((f, fidx) => (
                      <li key={fidx} className="flex items-center gap-3 text-gray-300 text-sm">
                        <CheckCircle2 className={`w-4 h-4 text-${segment.color}-500`} />
                        {f}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      {/* SECTION 4: EXPERT ADVISOR SPOTLIGHT */}
      <section className="py-16 px-4 bg-slate-900/50 border-t border-slate-800">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <Badge className="mb-4 bg-blue-600 text-white" data-testid="badge-featured-expert">
              Featured Expert Advisor
            </Badge>
            <h2 className="text-3xl md:text-5xl font-black text-white mb-4 uppercase">Meet Your Residence Enablement Expert</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <Card className="bg-slate-900 border-blue-500/30 col-span-full md:col-span-2 shadow-2xl" data-testid="card-advisor-profile">
              <CardContent className="p-8">
                <div className="flex flex-col md:flex-row gap-8">
                  <div className="flex-shrink-0">
                    <div className="w-24 h-24 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full flex items-center justify-center text-white font-black text-3xl border-4 border-slate-800 shadow-xl">
                      KHS
                    </div>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-3xl font-black text-white mb-2" data-testid="text-advisor-name">
                      Kalbe-Hussain Sheikh
                    </h3>
                    <div className="flex items-center gap-2 text-blue-400 font-bold text-sm mb-6 uppercase tracking-wider">
                      <Shield className="w-4 h-4" />
                      <span>Residence Enablement & Housing Advisor</span>
                    </div>
                    <p className="text-gray-300 leading-relaxed mb-8" data-testid="text-advisor-bio">
                      Specialized in connecting tourists, new residents, and entrepreneurs with ideal managed living solutions across Dubai's premium neighborhoods. Trusted partner with deep market insight and access to exclusive residence options.
                    </p>
                    <div className="flex flex-wrap gap-4">
                      <Button className="bg-green-600 hover:bg-green-500 text-white font-bold rounded-full px-6" data-testid="button-whatsapp-advisor">
                        WhatsApp: +971 55 657 3114
                      </Button>
                      <Button variant="outline" className="border-slate-700 text-white hover:bg-slate-800 rounded-full px-6" data-testid="button-linkedin-advisor">
                        LinkedIn Profile
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card className="bg-slate-900 border-slate-800 shadow-2xl" data-testid="card-expert-contact">
              <CardHeader>
                <CardTitle className="text-xl text-white flex items-center gap-2">
                  <Mail className="w-5 h-5 text-green-500" />
                  Support Team
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <div className="text-xs text-gray-500 uppercase font-black tracking-widest mb-1">Email</div>
                  <div className="text-green-500 font-bold">service@deliwer.com</div>
                </div>
                <div>
                  <div className="text-xs text-gray-500 uppercase font-black tracking-widest mb-1">WhatsApp</div>
                  <div className="text-green-500 font-bold">+971 55 657 3114</div>
                </div>
                <div className="pt-4 border-t border-slate-800 text-gray-500 text-xs italic">
                  Response time: Within 2-4 hours
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
      {/* MANDATORY DISCLAIMER FOOTER */}
      <footer className="py-12 px-4 bg-slate-950 border-t border-slate-900">
        <div className="container mx-auto text-center">
          <div className="inline-block bg-amber-500/10 border border-amber-500/20 rounded-full px-8 py-3 mb-6">
            <p className="text-amber-500 font-black text-sm uppercase tracking-widest" data-testid="footer-disclaimer">
              DeliWer does not sell property or act as a real estate agent.
            </p>
          </div>
          <p className="text-gray-600 text-xs">© {new Date().getFullYear()} DeliWer Residence Enablement. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
