import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Droplets, 
  Smartphone, 
  Home, 
  ArrowRight, 
  CheckCircle2, 
  Leaf, 
  Sparkles,
  Recycle,
  Gift,
  Shield,
  Plane,
  Globe
} from "lucide-react";

export default function HomeService() {
  const services = [
    {
      icon: Droplets,
      title: "Smart Water Solutions",
      description: "Smart, sustainable water solutions designed for modern Dubai living.",
      features: ["Premium filtration systems", "Zero plastic waste", "Health-focused hydration", "Eco-friendly living"],
      href: "/aquacafe",
      cta: "Explore Water Solutions"
    },
    {
      icon: Smartphone,
      title: "Smart Asset Conversion",
      description: "Smart asset conversion to support sustainable lifestyles.",
      features: ["iPhone trade-in for water systems", "Cross-category trading", "Free pickup within 24 hours", "Certified data wipe"],
      href: "/exchange",
      cta: "Start Trade-In"
    },
    {
      icon: Recycle,
      title: "Circular Economy Rewards",
      description: "Earn DXBs (Dubai Carbon Tokens) for sustainable living",
      features: ["Planet Hero points system", "Community leaderboards", "Partner vouchers & rewards", "Impact tracking dashboard"],
      href: "/rewards",
      cta: "View Rewards"
    },
    {
      icon: Gift,
      title: "Home Essentials Delivery",
      description: "Sustainable everyday essentials delivered to your doorstep",
      features: ["Eco-friendly products", "Subscription options", "Same-day delivery", "Zero-waste packaging"],
      href: "/products",
      cta: "Shop Essentials"
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-900/20 via-teal-900/10 to-blue-900/20"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center max-w-4xl mx-auto">
            <Badge variant="secondary" className="mb-6 bg-emerald-500/20 text-emerald-400 border-emerald-500/30">
              <Home className="w-3 h-3 mr-1" />
              Home Service
            </Badge>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6" data-testid="text-home-service-title">
              Earn rewards through sustainable
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-400"> everyday living</span>
            </h1>
            <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto" data-testid="text-home-service-description">
              Sustainable water, smart trade-ins, and everyday essentials — designed for life in Dubai.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link href="/relocate">
                <Button size="lg" className="bg-emerald-600 hover:bg-emerald-500" data-testid="button-book-consultation-home-service">
                  <Sparkles className="w-4 h-4 mr-2" />
                  Book a Free Expert Consultation
                </Button>
              </Link>
              <Link href="/relocate">
                <Button size="lg" variant="outline" className="border-white/30 text-white backdrop-blur-sm bg-white/10" data-testid="button-speak-advisor-home-service">
                  <Globe className="w-4 h-4 mr-2" />
                  Speak to an Advisor
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-16 px-4">
        <div className="container mx-auto">
          <div className="grid md:grid-cols-2 gap-6 mb-12">
            {services.map((service, index) => (
              <Card key={index} className="hover-elevate" data-testid={`card-service-${index}`}>
                <CardHeader>
                  <div className="w-12 h-12 rounded-md bg-emerald-500/10 flex items-center justify-center mb-4">
                    <service.icon className="w-6 h-6 text-emerald-500" />
                  </div>
                  <CardTitle className="text-xl">{service.title}</CardTitle>
                  <CardDescription>{service.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 mb-6">
                    {service.features.map((feature, idx) => (
                      <li key={idx} className="flex items-center gap-2 text-sm text-muted-foreground">
                        <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                  <Link href={service.href}>
                    <Button className="w-full" data-testid={`button-service-${index}`}>
                      {service.cta}
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Why Dubai Section */}
      <section className="py-16 px-4 bg-muted/30">
        <div className="container mx-auto">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <Badge variant="outline" className="mb-4">
              <Globe className="w-3 h-3 mr-1" />
              Dubai Advantage
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold mb-4" data-testid="text-dubai-advantage-title">
              Why Dubai for Sustainable Living?
            </h2>
            <p className="text-muted-foreground">
              Dubai combines world-class infrastructure with ambitious sustainability goals, 
              making it the ideal place for conscious consumption.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-6 mb-12">
            <Card className="text-center">
              <CardContent className="pt-6">
                <div className="w-14 h-14 rounded-full bg-emerald-500/10 flex items-center justify-center mx-auto mb-4">
                  <Leaf className="w-7 h-7 text-emerald-500" />
                </div>
                <h3 className="font-semibold text-lg mb-2">Net Zero by 2050</h3>
                <p className="text-muted-foreground text-sm">UAE's ambitious sustainability vision</p>
              </CardContent>
            </Card>
            <Card className="text-center">
              <CardContent className="pt-6">
                <div className="w-14 h-14 rounded-full bg-teal-500/10 flex items-center justify-center mx-auto mb-4">
                  <Sparkles className="w-7 h-7 text-teal-500" />
                </div>
                <h3 className="font-semibold text-lg mb-2">Innovation Hub</h3>
                <p className="text-muted-foreground text-sm">Leading cleantech and sustainable solutions</p>
              </CardContent>
            </Card>
            <Card className="text-center">
              <CardContent className="pt-6">
                <div className="w-14 h-14 rounded-full bg-blue-500/10 flex items-center justify-center mx-auto mb-4">
                  <Shield className="w-7 h-7 text-blue-500" />
                </div>
                <h3 className="font-semibold text-lg mb-2">Quality of Life</h3>
                <p className="text-muted-foreground text-sm">World-class living standards</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Relocation Bridge CTA */}
      <section className="py-16 px-4 bg-gradient-to-br from-emerald-900/20 via-teal-900/10 to-blue-900/20">
        <div className="container mx-auto">
          <div className="max-w-3xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2 mb-6">
              <Plane className="w-4 h-4 text-emerald-400" />
              <span className="text-sm text-white/80">Thinking Long-Term?</span>
            </div>
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-4" data-testid="text-relocation-bridge">
              Ready to make Dubai your home?
            </h2>
            <p className="text-gray-300 mb-8 max-w-2xl mx-auto">
              Many who start with sustainable shopping go on to build their lives in Dubai. 
              Discover capital relocation, Golden Visa options, and family settlement services.
            </p>
            <Link href="/relocate">
              <Button size="lg" data-testid="button-relocate-bridge">
                <Plane className="w-4 h-4 mr-2" />
                Thinking Long-Term in Dubai?
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
