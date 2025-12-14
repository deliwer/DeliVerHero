import { useState } from "react";
import { Link } from "wouter";
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
  Globe, 
  Building2, 
  Users, 
  Plane, 
  Shield, 
  ArrowRight,
  MapPin,
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
  Send
} from "lucide-react";
import dubaiSkyline from "@assets/stock_images/dubai_skyline_modern_806b4a5e.jpg";
import dubaiLifestyle from "@assets/stock_images/luxury_dubai_lifesty_e9f4e72e.jpg";

export default function Relocate() {
  const [audienceType, setAudienceType] = useState<"consumer" | "business">("consumer");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    capitalRange: "",
    familySize: "",
    businessType: "",
    timeline: "",
    message: ""
  });

  const services = [
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
      icon: Home,
      title: "Family Relocation",
      description: "End-to-end relocation support for individuals and families moving to Dubai",
      features: ["Housing Assistance", "School Enrollment", "Healthcare Setup", "Banking Services"]
    },
    {
      icon: Landmark,
      title: "Legal & Compliance",
      description: "Expert legal counsel for business operations, contracts, and regulatory compliance",
      features: ["Contract Review", "Regulatory Compliance", "IP Protection", "Labor Law"]
    }
  ];

  const dubaiAdvantages = [
    { icon: DollarSign, title: "0% Personal Income Tax", description: "Keep more of what you earn" },
    { icon: Shield, title: "Political Stability", description: "Safe haven for global capital" },
    { icon: Globe, title: "Strategic Location", description: "Gateway between East and West" },
    { icon: TrendingUp, title: "Business-Friendly", description: "Rapid company setup in days" },
    { icon: Heart, title: "World-Class Healthcare", description: "Top-tier medical facilities" },
    { icon: GraduationCap, title: "Premium Education", description: "International schools and universities" }
  ];

  const comparisonData = [
    { 
      city: "Dubai", 
      taxFree: true, 
      businessSetup: "1-3 days", 
      safety: "Very High", 
      lifestyle: "Luxury + Zen", 
      sustainability: "Advanced",
      highlight: true
    },
    { 
      city: "Singapore", 
      taxFree: false, 
      businessSetup: "1-2 weeks", 
      safety: "Very High", 
      lifestyle: "Modern", 
      sustainability: "High",
      highlight: false
    },
    { 
      city: "Panama", 
      taxFree: true, 
      businessSetup: "2-4 weeks", 
      safety: "Moderate", 
      lifestyle: "Relaxed", 
      sustainability: "Moderate",
      highlight: false
    },
    { 
      city: "Georgia", 
      taxFree: false, 
      businessSetup: "1 week", 
      safety: "Moderate", 
      lifestyle: "Emerging", 
      sustainability: "Low",
      highlight: false
    }
  ];

  const lifestyleFeatures = [
    { icon: Sun, title: "Year-Round Sunshine", description: "300+ days of clear skies" },
    { icon: ShoppingBag, title: "World-Class Shopping", description: "Luxury brands and unique experiences" },
    { icon: Leaf, title: "Sustainable Living", description: "Green initiatives and eco-conscious communities" },
    { icon: Heart, title: "Zen Wellness", description: "Spas, retreats, and holistic health centers" }
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Lead form submitted:", formData);
  };

  return (
    <div className="min-h-screen bg-background">
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
            Dubai: Where Capital, Culture & 
            <span className="text-primary"> Climate-Positive Living</span> Converge
          </h1>
          <p className="text-lg md:text-xl text-white/90 mb-8 max-w-3xl" data-testid="text-hero-description">
            Relocate your capital, family, and business to a safe, thriving, and sustainable city. 
            Expert consulting for founders, investors, and families seeking the ultimate global hub.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <a href="#lead-form">
              <Button size="lg" className="bg-primary text-primary-foreground" data-testid="button-start-journey">
                <Plane className="w-4 h-4 mr-2" />
                Start Your Relocation Journey
              </Button>
            </a>
            <a href="#comparison">
              <Button size="lg" variant="outline" className="border-white/30 text-white backdrop-blur-sm bg-white/10" data-testid="button-compare">
                <Scale className="w-4 h-4 mr-2" />
                Compare Global Destinations
              </Button>
            </a>
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
              <DollarSign className="w-3 h-3 mr-1" />
              Core Revenue Driver
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold mb-4" data-testid="text-capital-title">
              Capital Relocation Consulting
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Our flagship service: strategic guidance for high-net-worth individuals and businesses 
              seeking to optimize their global footprint through Dubai.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {dubaiAdvantages.map((advantage, index) => (
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
        </div>
      </section>

      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4" data-testid="text-services-title">
              {audienceType === "consumer" ? "Personal Relocation Services" : "Business & Investment Services"}
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Comprehensive support for every step of your Dubai journey
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

      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <Badge variant="outline" className="mb-4">
                <Heart className="w-3 h-3 mr-1" />
                Lifestyle & Culture
              </Badge>
              <h2 className="text-3xl md:text-4xl font-bold mb-6" data-testid="text-lifestyle-title">
                A Zen & Abundant Lifestyle
              </h2>
              <p className="text-muted-foreground mb-8">
                Dubai offers more than business opportunities. Enjoy safety, world-class schools, 
                healthcare, shopping, and climate-conscious living in one of the world's most 
                cosmopolitan cities.
              </p>
              <div className="grid grid-cols-2 gap-4">
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
                <p className="text-sm text-muted-foreground">Nationalities call Dubai home</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="comparison" className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <Badge variant="outline" className="mb-4">
              <Globe className="w-3 h-3 mr-1" />
              Global Comparison
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold mb-4" data-testid="text-comparison-title">
              Why Dubai vs Other Free-World Cities
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              See how Dubai compares to other popular destinations for capital relocation
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
        </div>
      </section>

      <section id="lead-form" className="py-20 bg-muted/50">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto">
            <div className="text-center mb-10">
              <Badge variant="outline" className="mb-4">
                <Send className="w-3 h-3 mr-1" />
                Get Started
              </Badge>
              <h2 className="text-3xl md:text-4xl font-bold mb-4" data-testid="text-form-title">
                Assess Your Relocation Readiness
              </h2>
              <p className="text-muted-foreground">
                Complete this form and our expert advisors will create a personalized 
                relocation roadmap for you.
              </p>
            </div>
            <Card>
              <CardContent className="pt-6">
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">Full Name</Label>
                      <Input 
                        id="name" 
                        placeholder="Your name"
                        value={formData.name}
                        onChange={(e) => setFormData({...formData, name: e.target.value})}
                        data-testid="input-name"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email Address</Label>
                      <Input 
                        id="email" 
                        type="email"
                        placeholder="you@example.com"
                        value={formData.email}
                        onChange={(e) => setFormData({...formData, email: e.target.value})}
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
                  </div>
                  <div className="grid md:grid-cols-2 gap-4">
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
                  <div className="space-y-2">
                    <Label htmlFor="message">Additional Information</Label>
                    <Textarea 
                      id="message"
                      placeholder="Tell us about your goals, concerns, or specific requirements..."
                      value={formData.message}
                      onChange={(e) => setFormData({...formData, message: e.target.value})}
                      className="min-h-[100px]"
                      data-testid="textarea-message"
                    />
                  </div>
                  <Button type="submit" className="w-full" size="lg" data-testid="button-submit-form">
                    <Send className="w-4 h-4 mr-2" />
                    Submit & Get Your Personalized Roadmap
                  </Button>
                  <p className="text-xs text-center text-muted-foreground">
                    By submitting, you agree to our privacy policy. We respect your data.
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
            Join the DeliWer Community
          </h2>
          <p className="text-primary-foreground/80 mb-8 max-w-2xl mx-auto">
            Connect with founders, investors, and partners. Access exclusive events, 
            investment opportunities, and personalized advisory services.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/relocate-community">
              <Button size="lg" variant="secondary" data-testid="button-join-circle">
                <Users className="w-4 h-4 mr-2" />
                Join Relocate Circle
              </Button>
            </Link>
            <Link href="/relocate-community#inner-ring">
              <Button size="lg" variant="outline" className="border-primary-foreground/30 text-primary-foreground" data-testid="button-apply-inner">
                <Shield className="w-4 h-4 mr-2" />
                Apply for Inner Ring
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
