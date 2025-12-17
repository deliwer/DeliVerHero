import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CalendlyButton } from "@/components/calendly-popup";
import { 
  Droplets, 
  Home, 
  ArrowRight, 
  CheckCircle2, 
  Sparkles,
  Gift,
  Plane,
  Globe,
  Bike,
  ShoppingBag,
  Scissors,
  Wrench,
  Package,
  Clock,
  MessageCircle
} from "lucide-react";

export default function HomeService() {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-900/20 via-teal-900/10 to-blue-900/20"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center max-w-4xl mx-auto">
            <Badge variant="secondary" className="mb-6 bg-emerald-500/20 text-emerald-400 border-emerald-500/30">
              <Home className="w-3 h-3 mr-1" />
              DeliWer Home Service
            </Badge>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6" data-testid="text-home-service-title">
              Everything you need.
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-400"> Without leaving home.</span>
            </h1>
            <p className="text-xl text-muted-foreground mb-4 max-w-2xl mx-auto" data-testid="text-home-service-description">
              We keep you fed. We keep your water clean. We give you your time back.
            </p>
            <p className="text-lg text-muted-foreground/80 mb-8 max-w-2xl mx-auto">
              Designed for Dubai living. Built for busy lives.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <CalendlyButton 
                size="lg" 
                data-testid="button-book-consultation-home-service"
              >
                <Sparkles className="w-4 h-4 mr-2" />
                Book a Free Home Service Consultation
              </CalendlyButton>
            </div>
          </div>
        </div>
      </section>

      {/* Water Service Section */}
      <section className="py-16 px-4" id="water-service">
        <div className="container mx-auto max-w-5xl">
          <div className="grid lg:grid-cols-2 gap-8 items-center">
            <div>
              <div className="inline-flex items-center gap-2 bg-blue-500/10 rounded-full px-4 py-2 mb-6">
                <Droplets className="w-4 h-4 text-blue-400" />
                <span className="text-sm text-blue-400 font-medium">Water Service Package</span>
              </div>
              <h2 className="text-3xl md:text-4xl font-bold mb-4" data-testid="text-water-service-title">
                Clean water. Calm living.
              </h2>
              <p className="text-lg text-muted-foreground mb-6">
                Enjoy a continuous supply of clean, filtered drinking water at home — without the hassle.
              </p>
              <ul className="space-y-3 mb-8">
                <li className="flex items-center gap-3 text-muted-foreground">
                  <CheckCircle2 className="w-5 h-5 text-emerald-500 flex-shrink-0" />
                  Home water service setup
                </li>
                <li className="flex items-center gap-3 text-muted-foreground">
                  <CheckCircle2 className="w-5 h-5 text-emerald-500 flex-shrink-0" />
                  Reliable refills & maintenance
                </li>
                <li className="flex items-center gap-3 text-muted-foreground">
                  <Gift className="w-5 h-5 text-emerald-500 flex-shrink-0" />
                  <span><strong className="text-foreground">Free shower filter</strong> with every demo</span>
                </li>
              </ul>
              <Card className="bg-emerald-500/5 border-emerald-500/20 mb-6">
                <CardContent className="pt-6">
                  <div className="flex items-center justify-between flex-wrap gap-4">
                    <div>
                      <p className="text-sm text-muted-foreground mb-1">Special Offer</p>
                      <p className="text-2xl font-bold text-emerald-500">Demo for AED 99</p>
                      <p className="text-sm text-muted-foreground">Includes free shower filter</p>
                    </div>
                    <Badge variant="secondary" className="bg-emerald-500/20 text-emerald-400">
                      Limited Time
                    </Badge>
                  </div>
                </CardContent>
              </Card>
              <div className="flex flex-wrap gap-3">
                <CalendlyButton 
                  size="lg" 
                  data-testid="button-speak-water-expert"
                >
                  <Droplets className="w-4 h-4 mr-2" />
                  Schedule a Water Consultation
                </CalendlyButton>
                <Link href="/aquacafe">
                  <Button size="lg" variant="outline" data-testid="button-learn-more-water">
                    <MessageCircle className="w-4 h-4 mr-2" />
                    Learn More
                  </Button>
                </Link>
              </div>
            </div>
            <div className="relative">
              <div className="aspect-square rounded-2xl bg-gradient-to-br from-blue-500/20 to-teal-500/20 flex items-center justify-center">
                <Droplets className="w-32 h-32 text-blue-400/50" />
              </div>
              <p className="text-center text-sm text-muted-foreground mt-4 italic">
                Because clean water shouldn't require effort.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Errand Runner Section - Featured */}
      <section className="py-16 px-4 bg-gradient-to-br from-orange-900/10 via-amber-900/5 to-yellow-900/10" id="errand-runner">
        <div className="container mx-auto max-w-5xl">
          <div className="grid lg:grid-cols-2 gap-8 items-center">
            <div className="order-2 lg:order-1 relative">
              <div className="aspect-square rounded-2xl bg-gradient-to-br from-orange-500/20 to-amber-500/20 flex items-center justify-center">
                <Bike className="w-32 h-32 text-orange-400/50" />
              </div>
              <Card className="absolute -bottom-4 -right-4 bg-background/95 backdrop-blur border-orange-500/20">
                <CardContent className="p-4">
                  <p className="text-sm text-muted-foreground mb-1">Fun fact</p>
                  <p className="text-sm font-medium">Some clients have even asked for a <strong>single ice-cream</strong>.</p>
                </CardContent>
              </Card>
            </div>
            <div className="order-1 lg:order-2">
              <div className="inline-flex items-center gap-2 bg-orange-500/10 rounded-full px-4 py-2 mb-6">
                <Bike className="w-4 h-4 text-orange-400" />
                <span className="text-sm text-orange-400 font-medium">DeliWery Errand Runner</span>
              </div>
              <h2 className="text-3xl md:text-4xl font-bold mb-4" data-testid="text-errand-runner-title">
                Anything DeliWered. Wherever. Whenever.
              </h2>
              <p className="text-lg text-muted-foreground mb-6">
                Stuck in traffic? Forgot something important? Let us handle it. Our errand runners take care of your to-do list so you can focus on what matters.
              </p>
              <div className="grid sm:grid-cols-2 gap-3 mb-8">
                <div className="flex items-center gap-2 text-muted-foreground">
                  <CheckCircle2 className="w-4 h-4 text-orange-500 flex-shrink-0" />
                  <span className="text-sm">Picking up dry cleaning</span>
                </div>
                <div className="flex items-center gap-2 text-muted-foreground">
                  <CheckCircle2 className="w-4 h-4 text-orange-500 flex-shrink-0" />
                  <span className="text-sm">Paying bills</span>
                </div>
                <div className="flex items-center gap-2 text-muted-foreground">
                  <CheckCircle2 className="w-4 h-4 text-orange-500 flex-shrink-0" />
                  <span className="text-sm">Delivering office items</span>
                </div>
                <div className="flex items-center gap-2 text-muted-foreground">
                  <CheckCircle2 className="w-4 h-4 text-orange-500 flex-shrink-0" />
                  <span className="text-sm">Grocery & pharmacy runs</span>
                </div>
                <div className="flex items-center gap-2 text-muted-foreground">
                  <CheckCircle2 className="w-4 h-4 text-orange-500 flex-shrink-0" />
                  <span className="text-sm">Last-minute gifts</span>
                </div>
                <div className="flex items-center gap-2 text-muted-foreground">
                  <CheckCircle2 className="w-4 h-4 text-orange-500 flex-shrink-0" />
                  <span className="text-sm">School & document drop-offs</span>
                </div>
              </div>
              <Card className="bg-amber-500/5 border-amber-500/20 mb-6">
                <CardContent className="pt-6 pb-4">
                  <p className="text-sm text-muted-foreground flex items-center gap-2">
                    <Gift className="w-4 h-4 text-amber-500" />
                    Sometimes... we'll even treat you to lunch.
                  </p>
                </CardContent>
              </Card>
              <div className="flex flex-wrap gap-3">
                <CalendlyButton 
                  size="lg" 
                  data-testid="button-request-errand"
                >
                  <Bike className="w-4 h-4 mr-2" />
                  Request an Errand
                </CalendlyButton>
                <CalendlyButton 
                  size="lg" 
                  variant="outline" 
                  data-testid="button-talk-advisor"
                >
                  <MessageCircle className="w-4 h-4 mr-2" />
                  Talk to an Advisor
                </CalendlyButton>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Concierge Section */}
      <section className="py-16 px-4" id="concierge">
        <div className="container mx-auto max-w-5xl">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 bg-purple-500/10 rounded-full px-4 py-2 mb-6">
              <ShoppingBag className="w-4 h-4 text-purple-400" />
              <span className="text-sm text-purple-400 font-medium">Concierge & Everyday Help</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold mb-4" data-testid="text-concierge-title">
              A helping hand, on demand.
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Send someone else to handle life's small but time-consuming tasks. Think of it as your personal helper in the city.
            </p>
          </div>
          
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
            <Card className="text-center hover-elevate">
              <CardContent className="pt-6">
                <div className="w-12 h-12 rounded-full bg-purple-500/10 flex items-center justify-center mx-auto mb-4">
                  <ShoppingBag className="w-6 h-6 text-purple-500" />
                </div>
                <h3 className="font-semibold mb-2">Grocery Shopping</h3>
                <p className="text-sm text-muted-foreground">We shop, you relax</p>
              </CardContent>
            </Card>
            <Card className="text-center hover-elevate">
              <CardContent className="pt-6">
                <div className="w-12 h-12 rounded-full bg-purple-500/10 flex items-center justify-center mx-auto mb-4">
                  <Clock className="w-6 h-6 text-purple-500" />
                </div>
                <h3 className="font-semibold mb-2">School Runs</h3>
                <p className="text-sm text-muted-foreground">Safe & reliable pickup</p>
              </CardContent>
            </Card>
            <Card className="text-center hover-elevate">
              <CardContent className="pt-6">
                <div className="w-12 h-12 rounded-full bg-purple-500/10 flex items-center justify-center mx-auto mb-4">
                  <Package className="w-6 h-6 text-purple-500" />
                </div>
                <h3 className="font-semibold mb-2">Contract Delivery</h3>
                <p className="text-sm text-muted-foreground">Important docs handled</p>
              </CardContent>
            </Card>
          </div>
          
          <div className="text-center">
            <CalendlyButton 
              size="lg" 
              data-testid="button-book-concierge"
            >
              <Sparkles className="w-4 h-4 mr-2" />
              Book a Concierge Consultation
            </CalendlyButton>
          </div>
        </div>
      </section>

      {/* Home Essentials Section */}
      <section className="py-16 px-4 bg-muted/30" id="home-essentials">
        <div className="container mx-auto max-w-5xl">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 bg-teal-500/10 rounded-full px-4 py-2 mb-6">
              <Home className="w-4 h-4 text-teal-400" />
              <span className="text-sm text-teal-400 font-medium">Home Essentials & Services</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold mb-4" data-testid="text-home-essentials-title">
              Your home, taken care of.
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              We connect you with trusted services for daily living. All coordinated — so you don't have to chase multiple providers.
            </p>
          </div>
          
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            <Card className="hover-elevate">
              <CardContent className="pt-6 text-center">
                <div className="w-10 h-10 rounded-md bg-teal-500/10 flex items-center justify-center mx-auto mb-3">
                  <Package className="w-5 h-5 text-teal-500" />
                </div>
                <h3 className="font-medium text-sm mb-1">Laundry & Dry Cleaning</h3>
              </CardContent>
            </Card>
            <Card className="hover-elevate">
              <CardContent className="pt-6 text-center">
                <div className="w-10 h-10 rounded-md bg-teal-500/10 flex items-center justify-center mx-auto mb-3">
                  <Gift className="w-5 h-5 text-teal-500" />
                </div>
                <h3 className="font-medium text-sm mb-1">Pharmacy Delivery</h3>
              </CardContent>
            </Card>
            <Card className="hover-elevate">
              <CardContent className="pt-6 text-center">
                <div className="w-10 h-10 rounded-md bg-teal-500/10 flex items-center justify-center mx-auto mb-3">
                  <Wrench className="w-5 h-5 text-teal-500" />
                </div>
                <h3 className="font-medium text-sm mb-1">Home Maintenance</h3>
              </CardContent>
            </Card>
            <Card className="hover-elevate">
              <CardContent className="pt-6 text-center">
                <div className="w-10 h-10 rounded-md bg-teal-500/10 flex items-center justify-center mx-auto mb-3">
                  <Scissors className="w-5 h-5 text-teal-500" />
                </div>
                <h3 className="font-medium text-sm mb-1">Mobile Salon</h3>
              </CardContent>
            </Card>
          </div>
          
          <div className="text-center">
            <CalendlyButton 
              size="lg" 
              variant="outline"
              data-testid="button-discuss-home-support"
            >
              <MessageCircle className="w-4 h-4 mr-2" />
              Discuss Home Support Options
            </CalendlyButton>
          </div>
        </div>
      </section>

      {/* Relocation Bridge CTA */}
      <section className="py-20 px-4 bg-gradient-to-br from-emerald-900/20 via-teal-900/10 to-blue-900/20">
        <div className="container mx-auto">
          <div className="max-w-3xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2 mb-6">
              <Plane className="w-4 h-4 text-emerald-400" />
              <span className="text-sm text-foreground/80">From Home Service to Long-Term Living</span>
            </div>
            <h2 className="text-2xl md:text-3xl font-bold mb-4" data-testid="text-relocation-bridge">
              Many of our members start with home services.
            </h2>
            <p className="text-muted-foreground mb-2">
              Some later choose to <strong className="text-foreground">build their lives in Dubai</strong>.
            </p>
            <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
              If you're thinking long-term — housing, relocation, or investment — we can guide you.
            </p>
            <Link href="/relocate">
              <Button size="lg" data-testid="button-relocate-bridge">
                <Globe className="w-4 h-4 mr-2" />
                Explore Living & Relocation Options
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Legal Note */}
      <section className="py-8 px-4 border-t border-border/50">
        <div className="container mx-auto max-w-3xl text-center">
          <p className="text-xs text-muted-foreground">
            All services comply with UAE laws and company policies. Requests must be portable and legal.
          </p>
        </div>
      </section>
    </div>
  );
}
