import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Home, 
  Building2, 
  TrendingUp, 
  ArrowRight, 
  CheckCircle2,
  Key,
  DollarSign,
  Shield,
  Users,
  Calendar,
  MessageCircle
} from "lucide-react";

export default function Housing() {
  const housingOptions = [
    {
      icon: Key,
      title: "Rent",
      subtitle: "Find Your Dubai Home",
      description: "Curated rental options for comfortable Dubai living.",
      features: [
        "Verified listings only",
        "Flexible lease terms",
        "Family-friendly communities",
        "24/7 support"
      ],
      cta: "Discuss Rental Options"
    },
    {
      icon: Home,
      title: "Buy",
      subtitle: "Invest in Your Future",
      description: "Freehold ownership for long-term residents.",
      features: [
        "Golden Visa eligible properties",
        "Prime locations",
        "Payment plan options",
        "Legal support included"
      ],
      cta: "Discuss Purchase Options"
    },
    {
      icon: TrendingUp,
      title: "Invest",
      subtitle: "Build Wealth in Dubai",
      description: "Strategic investment for sustainable returns.",
      features: [
        "Fractional ownership available",
        "High-yield opportunities",
        "Diversified portfolio",
        "Expert advisory"
      ],
      cta: "Discuss Investment Options"
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900/20 via-indigo-900/10 to-slate-900/20"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center max-w-4xl mx-auto">
            <Badge variant="secondary" className="mb-6 bg-blue-500/20 text-blue-400 border-blue-500/30">
              <Building2 className="w-3 h-3 mr-1" />
              Housing in Dubai
            </Badge>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6" data-testid="text-housing-title">
              Housing for living well
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-400"> — not speculation</span>
            </h1>
            <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto" data-testid="text-housing-description">
              Whether you're renting, buying, or investing, we help you find the right home in Dubai.
            </p>
            <Link href="/relocate">
              <Button size="lg" className="bg-blue-600 hover:bg-blue-500" data-testid="button-discuss-housing">
                <MessageCircle className="w-4 h-4 mr-2" />
                Discuss Housing Options
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <section className="py-16 px-4">
        <div className="container mx-auto">
          <div className="grid md:grid-cols-3 gap-6 mb-12">
            {housingOptions.map((option, index) => (
              <Card key={index} className="hover-elevate" data-testid={`card-housing-${option.title.toLowerCase()}`}>
                <CardHeader>
                  <div className="w-12 h-12 rounded-md bg-blue-500/10 flex items-center justify-center mb-4">
                    <option.icon className="w-6 h-6 text-blue-500" />
                  </div>
                  <Badge variant="outline" className="w-fit mb-2">{option.subtitle}</Badge>
                  <CardTitle className="text-2xl">{option.title}</CardTitle>
                  <CardDescription className="text-base">{option.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 mb-6">
                    {option.features.map((feature, idx) => (
                      <li key={idx} className="flex items-center gap-2 text-sm text-muted-foreground">
                        <CheckCircle2 className="w-4 h-4 text-blue-500" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                  <Link href="/relocate">
                    <Button className="w-full" data-testid={`button-housing-${option.title.toLowerCase()}`}>
                      {option.cta}
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 px-4 bg-gradient-to-r from-blue-900/20 to-indigo-900/20">
        <div className="container mx-auto">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-white mb-4">Ready to find your Dubai home?</h2>
            <p className="text-gray-300 mb-8">
              Speak with our housing advisors to explore options that match your lifestyle and goals.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link href="/relocate">
                <Button size="lg" className="bg-blue-600 hover:bg-blue-500" data-testid="button-book-housing-consultation">
                  <Calendar className="w-4 h-4 mr-2" />
                  Book a Free Expert Consultation
                </Button>
              </Link>
              <Link href="/relocate">
                <Button size="lg" variant="outline" className="border-white/30 text-white backdrop-blur-sm bg-white/10" data-testid="button-speak-advisor-housing">
                  <MessageCircle className="w-4 h-4 mr-2" />
                  Speak to an Advisor
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
