import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CalendlyButton } from "@/components/calendly-popup";
import { Helmet } from "react-helmet";
import { SocialSharingWidget } from "@/components/social-sharing-widget";
import { 
  Bike, 
  ArrowRight, 
  CheckCircle2, 
  Sparkles,
  Gift,
  Clock,
  MapPin,
  Zap,
  Users,
  Share2,
  Copy,
  Check
} from "lucide-react";
import { useState, useMemo } from "react";
import { useToast } from "@/hooks/use-toast";
import errandRunnerImg from "@assets/stock_images/errand_delivery_serv_6f2364e8.jpg";

export default function ErrandPage() {
  const { toast } = useToast();
  const [copied, setCopied] = useState(false);
  const referralCode = useMemo(() => "ERRAND" + Math.random().toString(36).substr(2, 6).toUpperCase(), []);
  const referralLink = useMemo(() => `https://deliwer.com/errand?ref=${referralCode}`, [referralCode]);

  const handleCopyReferral = () => {
    navigator.clipboard.writeText(referralLink);
    setCopied(true);
    toast({
      title: "Referral Link Copied!",
      description: "Share with friends and earn rewards for each sign-up.",
    });
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>Errand Runner Service Dubai | Personal Delivery & Concierge | DeliWer</title>
        <meta name="description" content="Professional errand runner service in Dubai. Same-day delivery, bill payments, grocery runs, dry cleaning pickup. Book your errand today - AED 29 first errand!" />
        <meta name="keywords" content="errand runner Dubai, personal delivery service, concierge service UAE, same-day delivery, bill payment service, grocery delivery Dubai" />
        <meta property="og:title" content="Errand Runner Service Dubai | DeliWer" />
        <meta property="og:description" content="Get your errands done fast. Anything DeliWered. Wherever. Whenever." />
        <meta property="og:type" content="website" />
        <link rel="canonical" href="https://deliwer.com/errand" />
      </Helmet>

      {/* Hero Section - Eye-catching */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-orange-900/20 via-red-900/10 to-pink-900/20"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center max-w-4xl mx-auto">
            <Badge variant="secondary" className="mb-6 bg-orange-500/20 text-orange-400 border-orange-500/30">
              <Bike className="w-3 h-3 mr-1" />
              DeliWer Errand Runner
            </Badge>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6" data-testid="text-errand-hero-title">
              Your Time Is Valuable.
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-red-400"> Let Us Handle It.</span>
            </h1>
            <p className="text-xl text-muted-foreground mb-4 max-w-2xl mx-auto" data-testid="text-errand-hero-description">
              Stuck in traffic? Forgot something important? Our errand runners handle your to-do list so you can focus on what matters.
            </p>
            <p className="text-lg text-muted-foreground/80 mb-8 max-w-2xl mx-auto">
              Same-day service. Trusted runners. AED 29 for your first errand.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <CalendlyButton 
                size="lg" 
                data-testid="button-book-errand"
              >
                <Sparkles className="w-4 h-4 mr-2" />
                Request Your First Errand
              </CalendlyButton>
              <Link href="/home-service">
                <Button size="lg" variant="outline" data-testid="button-explore-home-services">
                  <ArrowRight className="w-4 h-4 mr-2" />
                  Explore More Home Services
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Main Service Section */}
      <section className="py-16 px-4">
        <div className="container mx-auto max-w-5xl">
          <div className="grid lg:grid-cols-2 gap-8 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold mb-4" data-testid="text-errand-main-title">
                Anything DeliWered. <span className="text-orange-400">Wherever. Whenever.</span>
              </h2>
              <p className="text-lg text-muted-foreground mb-6">
                From paying bills to picking up groceries, our reliable runners take care of life's small but time-consuming tasks. Focus on what matters while we handle the rest.
              </p>
              
              <div className="space-y-4 mb-8">
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-orange-500/20 flex items-center justify-center flex-shrink-0 mt-1">
                    <CheckCircle2 className="w-4 h-4 text-orange-500" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">Flexible Scheduling</h3>
                    <p className="text-sm text-muted-foreground">Book on-demand or schedule for later</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-orange-500/20 flex items-center justify-center flex-shrink-0 mt-1">
                    <CheckCircle2 className="w-4 h-4 text-orange-500" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">Real-Time Tracking</h3>
                    <p className="text-sm text-muted-foreground">Track your errand every step of the way</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-orange-500/20 flex items-center justify-center flex-shrink-0 mt-1">
                    <CheckCircle2 className="w-4 h-4 text-orange-500" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">Vetted Runners</h3>
                    <p className="text-sm text-muted-foreground">Professional, background-checked team members</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-orange-500/20 flex items-center justify-center flex-shrink-0 mt-1">
                    <CheckCircle2 className="w-4 h-4 text-orange-500" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">Payment Proof</h3>
                    <p className="text-sm text-muted-foreground">Get photos and receipts for every transaction</p>
                  </div>
                </div>
              </div>

              <Card className="bg-orange-500/5 border-orange-500/20 mb-6">
                <CardContent className="pt-6">
                  <div className="flex items-center justify-between flex-wrap gap-4">
                    <div>
                      <p className="text-sm text-muted-foreground mb-1">First Errand Special</p>
                      <p className="text-2xl font-bold text-orange-500">AED 29</p>
                      <p className="text-sm text-muted-foreground">Was AED 49</p>
                    </div>
                    <Badge variant="secondary" className="bg-orange-500/20 text-orange-400">
                      Limited Time
                    </Badge>
                  </div>
                </CardContent>
              </Card>

              <CalendlyButton 
                size="lg" 
                data-testid="button-request-errand-main"
              >
                <Bike className="w-4 h-4 mr-2" />
                Request Your Errand Now
              </CalendlyButton>
            </div>
            <div className="relative">
              <div className="aspect-[4/3] rounded-2xl overflow-hidden relative">
                <img 
                  src={errandRunnerImg} 
                  alt="Errand runner on bike delivering in Dubai" 
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent"></div>
                <div className="absolute bottom-4 left-4 right-4">
                  <p className="text-white font-semibold text-lg">Fast & Reliable Service</p>
                  <p className="text-white/80 text-sm">Your personal helper in Dubai</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* What We Can Do Section */}
      <section className="py-16 px-4 bg-muted/30">
        <div className="container mx-auto max-w-5xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4" data-testid="text-errand-services">
              What Can We Handle?
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Pretty much anything portable and legal. Here are some common requests:
            </p>
          </div>
          
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
            <Card className="hover-elevate">
              <CardContent className="pt-6">
                <div className="w-10 h-10 rounded-md bg-orange-500/10 flex items-center justify-center mb-3">
                  <Gift className="w-5 h-5 text-orange-500" />
                </div>
                <h3 className="font-medium mb-2">Shopping & Pickup</h3>
                <p className="text-sm text-muted-foreground">Grocery, pharmacy, gifts, returns</p>
              </CardContent>
            </Card>
            <Card className="hover-elevate">
              <CardContent className="pt-6">
                <div className="w-10 h-10 rounded-md bg-orange-500/10 flex items-center justify-center mb-3">
                  <Clock className="w-5 h-5 text-orange-500" />
                </div>
                <h3 className="font-medium mb-2">Bill Payments</h3>
                <p className="text-sm text-muted-foreground">Utility bills, fees, deposits</p>
              </CardContent>
            </Card>
            <Card className="hover-elevate">
              <CardContent className="pt-6">
                <div className="w-10 h-10 rounded-md bg-orange-500/10 flex items-center justify-center mb-3">
                  <MapPin className="w-5 h-5 text-orange-500" />
                </div>
                <h3 className="font-medium mb-2">Dry Cleaning & Delivery</h3>
                <p className="text-sm text-muted-foreground">Drop-off, pickup, delivery</p>
              </CardContent>
            </Card>
            <Card className="hover-elevate">
              <CardContent className="pt-6">
                <div className="w-10 h-10 rounded-md bg-orange-500/10 flex items-center justify-center mb-3">
                  <Zap className="w-5 h-5 text-orange-500" />
                </div>
                <h3 className="font-medium mb-2">Document Delivery</h3>
                <p className="text-sm text-muted-foreground">Office, school, government offices</p>
              </CardContent>
            </Card>
            <Card className="hover-elevate">
              <CardContent className="pt-6">
                <div className="w-10 h-10 rounded-md bg-orange-500/10 flex items-center justify-center mb-3">
                  <Gift className="w-5 h-5 text-orange-500" />
                </div>
                <h3 className="font-medium mb-2">Last-Minute Gifts</h3>
                <p className="text-sm text-muted-foreground">Same-day gift delivery</p>
              </CardContent>
            </Card>
            <Card className="hover-elevate">
              <CardContent className="pt-6">
                <div className="w-10 h-10 rounded-md bg-orange-500/10 flex items-center justify-center mb-3">
                  <Users className="w-5 h-5 text-orange-500" />
                </div>
                <h3 className="font-medium mb-2">School Runs</h3>
                <p className="text-sm text-muted-foreground">Safe & reliable pickup service</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Referral & Affiliate Marketing Section - PROMINENT */}
      <section className="py-16 px-4 bg-gradient-to-br from-pink-900/10 via-rose-900/5 to-red-900/10" id="referral">
        <div className="container mx-auto max-w-4xl">
          <div className="text-center mb-10">
            <div className="inline-flex items-center gap-2 bg-pink-500/10 rounded-full px-4 py-2 mb-6">
              <Users className="w-4 h-4 text-pink-400" />
              <span className="text-sm text-pink-400 font-medium">Earn Together Program</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold mb-4" data-testid="text-referral-errand-title">
              Refer Friends. <span className="text-pink-400">Earn Rewards.</span>
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Share your unique referral link and get rewarded every time a friend books an errand!
            </p>
          </div>

          <Card className="mb-8">
            <CardContent className="pt-6">
              <div className="grid md:grid-cols-3 gap-6 text-center mb-8">
                <div>
                  <div className="w-12 h-12 rounded-full bg-pink-500/10 flex items-center justify-center mx-auto mb-3">
                    <Share2 className="w-6 h-6 text-pink-500" />
                  </div>
                  <h3 className="font-semibold mb-1">Share Your Link</h3>
                  <p className="text-sm text-muted-foreground">Invite friends via your unique code</p>
                </div>
                <div>
                  <div className="w-12 h-12 rounded-full bg-pink-500/10 flex items-center justify-center mx-auto mb-3">
                    <Users className="w-6 h-6 text-pink-500" />
                  </div>
                  <h3 className="font-semibold mb-1">Friends Book</h3>
                  <p className="text-sm text-muted-foreground">They request their first errand</p>
                </div>
                <div>
                  <div className="w-12 h-12 rounded-full bg-pink-500/10 flex items-center justify-center mx-auto mb-3">
                    <Gift className="w-6 h-6 text-pink-500" />
                  </div>
                  <h3 className="font-semibold mb-1">You Both Earn</h3>
                  <p className="text-sm text-muted-foreground">Get AED 50 credit + Planet Points</p>
                </div>
              </div>

              <div className="bg-muted/50 rounded-lg p-4 mb-6">
                <p className="text-sm text-muted-foreground mb-2">Your Referral Link</p>
                <div className="flex items-center gap-2">
                  <code className="flex-1 bg-background rounded px-3 py-2 text-sm overflow-hidden text-ellipsis">
                    {referralLink}
                  </code>
                  <Button 
                    size="icon" 
                    variant="outline" 
                    onClick={handleCopyReferral}
                    data-testid="button-copy-errand-referral"
                  >
                    {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                  </Button>
                </div>
              </div>

              <div className="flex flex-wrap justify-center gap-3">
                <SocialSharingWidget 
                  content={{
                    type: 'trade',
                    title: 'DeliWer Errand Runner',
                    description: 'Get your errands done fast! Same-day delivery, bill payments, grocery runs in Dubai.',
                    value: 50,
                    url: referralLink
                  }}
                />
              </div>
            </CardContent>
          </Card>

          <div className="text-center">
            <p className="text-sm text-muted-foreground mb-4">
              Unlimited referrals. Unlimited rewards. Share the love!
            </p>
            <Link href="/home-service">
              <Button variant="outline" data-testid="button-explore-all-services">
                Explore All DeliWer Home Services
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Cross-sell to Home Services */}
      <section className="py-20 px-4 bg-gradient-to-br from-teal-900/20 via-emerald-900/10 to-blue-900/20">
        <div className="container mx-auto">
          <div className="max-w-3xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2 mb-6">
              <Sparkles className="w-4 h-4 text-emerald-400" />
              <span className="text-sm text-foreground/80">Everything You Need at Home</span>
            </div>
            <h2 className="text-2xl md:text-3xl font-bold mb-4" data-testid="text-cross-sell-title">
              Need more than errands?
            </h2>
            <p className="text-muted-foreground mb-2">
              DeliWer's home services include <strong className="text-foreground">water filtration, solar panels, EV charging, eco-cleaning, and more.</strong>
            </p>
            <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
              One platform. All your home needs covered.
            </p>
            <Link href="/home-service">
              <Button size="lg" data-testid="button-home-services-bridge">
                <Sparkles className="w-4 h-4 mr-2" />
                Discover All Home Services
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 px-4">
        <div className="container mx-auto max-w-3xl">
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-12" data-testid="text-faq-title">
            Frequently Asked Questions
          </h2>
          
          <div className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">How quickly can you complete an errand?</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">Most errands are completed within 2-4 hours. For urgent requests, we offer express service within 1 hour.</p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Is payment secure?</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">Yes! All payments are processed securely through our platform. You'll receive photos and receipts for every transaction.</p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">What areas of Dubai do you service?</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">We service all major areas of Dubai and surrounding emirates. Check availability in your area when booking.</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Footer */}
      <section className="py-12 px-4 border-t border-border/50 bg-muted/20">
        <div className="container mx-auto max-w-3xl text-center">
          <h3 className="text-xl font-bold mb-4">Ready to get your first errand done?</h3>
          <CalendlyButton 
            size="lg" 
            data-testid="button-final-cta-errand"
          >
            <Sparkles className="w-4 h-4 mr-2" />
            Book Now - AED 29 First Errand
          </CalendlyButton>
        </div>
      </section>
    </div>
  );
}
