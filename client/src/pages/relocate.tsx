import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
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
  CheckCircle2
} from "lucide-react";

export default function Relocate() {
  const services = [
    {
      icon: Building2,
      title: "Business Setup",
      description: "Company formation, licensing, and corporate structuring in UAE free zones and mainland",
      features: ["Free Zone Setup", "Mainland LLC", "Branch Office", "Visa Processing"]
    },
    {
      icon: Home,
      title: "Relocation Services",
      description: "End-to-end relocation support for individuals and families moving to Dubai",
      features: ["Housing Assistance", "School Enrollment", "Healthcare Setup", "Banking Services"]
    },
    {
      icon: Briefcase,
      title: "Investment Advisory",
      description: "Strategic investment guidance for real estate, businesses, and golden visa eligibility",
      features: ["Real Estate Investment", "Business Acquisition", "Golden Visa", "Portfolio Advisory"]
    },
    {
      icon: Landmark,
      title: "Legal & Compliance",
      description: "Expert legal counsel for business operations, contracts, and regulatory compliance",
      features: ["Contract Review", "Regulatory Compliance", "IP Protection", "Labor Law"]
    }
  ];

  const benefits = [
    "Access to exclusive Dubai investment opportunities",
    "Personalized soft-landing orientation programs",
    "Direct connection to verified service partners",
    "Priority support from our relocation concierge",
    "Invitations to networking events and expeditions",
    "Member-only resources and market insights"
  ];

  return (
    <div className="min-h-screen bg-background">
      <section className="relative py-20 lg:py-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-background to-accent/10" />
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <Badge variant="secondary" className="mb-4" data-testid="badge-gateway">
              <Globe className="w-3 h-3 mr-1" />
              DeliWer Relocate Gateway
            </Badge>
            <h1 className="text-4xl lg:text-6xl font-bold mb-6" data-testid="text-hero-title">
              Your Gateway to 
              <span className="text-primary"> Dubai</span>
            </h1>
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto" data-testid="text-hero-description">
              Seamless relocation, business setup, and investment services for founders, 
              entrepreneurs, and families moving to the UAE.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link href="/relocate-community">
                <Button size="lg" data-testid="button-join-network">
                  <Users className="w-4 h-4 mr-2" />
                  Join the Member Network
                </Button>
              </Link>
              <Link href="/relocate-community#inner-ring">
                <Button size="lg" variant="outline" data-testid="button-inner-ring">
                  <Shield className="w-4 h-4 mr-2" />
                  Exclusive Inner Ring
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4" data-testid="text-services-title">Our Services</h2>
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

      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <Badge variant="outline" className="mb-4">
                <MapPin className="w-3 h-3 mr-1" />
                Why Dubai?
              </Badge>
              <h2 className="text-3xl font-bold mb-6" data-testid="text-why-dubai">
                The World's Business Hub
              </h2>
              <p className="text-muted-foreground mb-6">
                Dubai offers unparalleled opportunities for business growth, investment returns, 
                and quality of life. With zero personal income tax, world-class infrastructure, 
                and a strategic location connecting East and West, it's the ideal destination 
                for ambitious entrepreneurs and families.
              </p>
              <ul className="space-y-3 mb-8">
                {benefits.map((benefit, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-primary mt-0.5" />
                    <span className="text-muted-foreground">{benefit}</span>
                  </li>
                ))}
              </ul>
              <Link href="/relocate-community">
                <Button data-testid="button-explore-membership">
                  Explore Membership
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </Link>
            </div>
            <div className="relative">
              <Card className="p-8 bg-gradient-to-br from-primary/5 to-accent/5">
                <div className="text-center">
                  <Plane className="w-16 h-16 text-primary mx-auto mb-6" />
                  <h3 className="text-2xl font-bold mb-4">Ready to Start?</h3>
                  <p className="text-muted-foreground mb-6">
                    Join thousands of successful relocators who trusted DeliWer 
                    for their Dubai journey.
                  </p>
                  <div className="flex flex-col gap-3">
                    <Link href="/relocate-community">
                      <Button className="w-full" data-testid="button-start-journey">
                        Start Your Journey
                      </Button>
                    </Link>
                    <Link href="/contact">
                      <Button variant="outline" className="w-full" data-testid="button-contact-advisor">
                        Speak to an Advisor
                      </Button>
                    </Link>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4" data-testid="text-cta-title">
            Join the DeliWer Community
          </h2>
          <p className="text-primary-foreground/80 mb-8 max-w-2xl mx-auto">
            Connect with founders, investors, and partners. Access exclusive events, 
            investment opportunities, and personalized advisory services.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/relocate-community">
              <Button size="lg" variant="secondary" data-testid="button-join-circle">
                Join Relocate Circle
              </Button>
            </Link>
            <Link href="/relocate-community#inner-ring">
              <Button size="lg" variant="outline" className="border-primary-foreground/30 text-primary-foreground" data-testid="button-apply-inner">
                Apply for Inner Ring
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
