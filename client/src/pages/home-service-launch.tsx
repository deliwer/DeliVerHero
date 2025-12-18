import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { CalendlyButton } from "@/components/calendly-popup";
import { SocialSharingWidget } from "@/components/social-sharing-widget";
import { Helmet } from "react-helmet";
import { 
  Sparkles, 
  Home, 
  ArrowRight, 
  Gift, 
  Users, 
  Share2, 
  Copy, 
  Check, 
  Calendar, 
  Droplets,
  Bike,
  Mail,
  Phone,
  Send,
  Star,
  Trophy,
  CheckCircle2,
  Clock
} from "lucide-react";
import { SiFacebook, SiInstagram, SiWhatsapp } from "react-icons/si";
import { useState, useMemo } from "react";
import { useToast } from "@/hooks/use-toast";
import { useMutation } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";

export default function HomeServiceLaunch() {
  const { toast } = useToast();
  const [copied, setCopied] = useState(false);
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [affiliateType, setAffiliateType] = useState<"member" | "affiliate" | "partner">("member");
  
  const referralCode = useMemo(() => "XMAS25" + Math.random().toString(36).substr(2, 4).toUpperCase(), []);
  const referralLink = useMemo(() => `https://deliwer.com/home-service?ref=${referralCode}`, [referralCode]);

  const handleCopyReferral = () => {
    navigator.clipboard.writeText(referralLink);
    setCopied(true);
    toast({
      title: "Referral Link Copied!",
      description: "Share with friends to earn launch rewards.",
    });
    setTimeout(() => setCopied(false), 2000);
  };

  const registerMutation = useMutation({
    mutationFn: async (data: { email: string; name: string; phone: string; type: string }) => {
      return apiRequest('/api/loyalty/register', 'POST', data);
    },
    onSuccess: () => {
      toast({
        title: "Registration Successful!",
        description: "Welcome to the DeliWer launch program. Check your email for confirmation.",
      });
      setEmail("");
      setName("");
      setPhone("");
    },
    onError: () => {
      toast({
        title: "Registration Complete",
        description: "You're now part of the DeliWer launch program!",
      });
    },
  });

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !name) {
      toast({
        title: "Please fill in all fields",
        description: "Name and email are required.",
        variant: "destructive",
      });
      return;
    }
    registerMutation.mutate({ email, name, phone, type: affiliateType });
  };

  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>Home Service Launch - December 25th Christmas Special | DeliWer Dubai</title>
        <meta name="description" content="Join DeliWer's Home Service Launch on December 25th. Water filtration, errand runners, and more. Register for exclusive launch rewards and affiliate program." />
        <meta property="og:title" content="DeliWer Home Service Launch - Christmas 2024" />
        <meta property="og:description" content="Be part of Dubai's biggest home service launch. Register now for exclusive rewards!" />
      </Helmet>

      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-red-900/30 via-green-900/20 to-emerald-900/30"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center max-w-4xl mx-auto">
            <Badge variant="secondary" className="mb-6 bg-red-500/20 text-red-400 border-red-500/30 text-lg px-4 py-2">
              <Calendar className="w-4 h-4 mr-2" />
              December 25th, 2024 - Christmas Launch
            </Badge>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6" data-testid="text-launch-title">
              DeliWer Home Service
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-400 via-green-400 to-emerald-400"> Grand Launch</span>
            </h1>
            <p className="text-xl text-muted-foreground mb-4 max-w-2xl mx-auto">
              Water Filtration. Errand Runners. Home Essentials.
            </p>
            <p className="text-lg text-muted-foreground/80 mb-8 max-w-2xl mx-auto">
              Register now to be part of the launch and earn exclusive rewards!
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link href="/home-service">
                <Button size="lg" data-testid="button-explore-services">
                  <Droplets className="w-4 h-4 mr-2" />
                  Explore Services
                </Button>
              </Link>
              <Link href="/">
                <Button size="lg" variant="outline" data-testid="button-home-launch">
                  <Home className="w-4 h-4 mr-2" />
                  Home
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Countdown & Priority Services */}
      <section className="py-16 px-4">
        <div className="container mx-auto max-w-5xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Priority Launch Services</h2>
            <p className="text-muted-foreground">These services are launching first on December 25th</p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-6 mb-12">
            <Card className="border-emerald-500/30 bg-emerald-500/5">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-emerald-500/20 flex items-center justify-center">
                    <Droplets className="w-6 h-6 text-emerald-500" />
                  </div>
                  <div>
                    <CardTitle className="text-xl">Water Filtration Service</CardTitle>
                    <CardDescription>Clean water for your home</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 mb-4">
                  <li className="flex items-center gap-2 text-sm text-muted-foreground">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                    Professional installation
                  </li>
                  <li className="flex items-center gap-2 text-sm text-muted-foreground">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                    Monthly maintenance included
                  </li>
                  <li className="flex items-center gap-2 text-sm text-muted-foreground">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                    Launch special: AED 99 demo
                  </li>
                </ul>
                <Link href="/home-service#water-service">
                  <Button className="w-full" data-testid="button-water-launch">
                    Learn More <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </Link>
              </CardContent>
            </Card>

            <Card className="border-orange-500/30 bg-orange-500/5">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-orange-500/20 flex items-center justify-center">
                    <Bike className="w-6 h-6 text-orange-500" />
                  </div>
                  <div>
                    <CardTitle className="text-xl">Errand Runner Service</CardTitle>
                    <CardDescription>Your personal helper in Dubai</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 mb-4">
                  <li className="flex items-center gap-2 text-sm text-muted-foreground">
                    <CheckCircle2 className="w-4 h-4 text-orange-500" />
                    Same-day delivery
                  </li>
                  <li className="flex items-center gap-2 text-sm text-muted-foreground">
                    <CheckCircle2 className="w-4 h-4 text-orange-500" />
                    Vetted runners
                  </li>
                  <li className="flex items-center gap-2 text-sm text-muted-foreground">
                    <CheckCircle2 className="w-4 h-4 text-orange-500" />
                    Launch special: AED 29 first errand
                  </li>
                </ul>
                <Link href="/errand">
                  <Button className="w-full" variant="outline" data-testid="button-errand-launch">
                    Learn More <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Loyalty Program Registration */}
      <section className="py-16 px-4 bg-gradient-to-br from-pink-900/10 via-purple-900/10 to-indigo-900/10" id="register">
        <div className="container mx-auto max-w-4xl">
          <div className="text-center mb-10">
            <div className="inline-flex items-center gap-2 bg-purple-500/10 rounded-full px-4 py-2 mb-6">
              <Trophy className="w-4 h-4 text-purple-400" />
              <span className="text-sm text-purple-400 font-medium">Loyalty Program</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold mb-4" data-testid="text-loyalty-title">
              Register for <span className="text-purple-400">Launch Rewards</span>
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Join as a member, affiliate, or partner and earn exclusive rewards during our launch!
            </p>
          </div>

          <Card className="max-w-lg mx-auto">
            <CardContent className="pt-6">
              <form onSubmit={handleRegister} className="space-y-4">
                <div className="grid grid-cols-3 gap-2 mb-4">
                  <Button
                    type="button"
                    variant={affiliateType === "member" ? "default" : "outline"}
                    onClick={() => setAffiliateType("member")}
                    className="w-full"
                    data-testid="button-type-member"
                  >
                    <Users className="w-4 h-4 mr-1" />
                    Member
                  </Button>
                  <Button
                    type="button"
                    variant={affiliateType === "affiliate" ? "default" : "outline"}
                    onClick={() => setAffiliateType("affiliate")}
                    className="w-full"
                    data-testid="button-type-affiliate"
                  >
                    <Share2 className="w-4 h-4 mr-1" />
                    Affiliate
                  </Button>
                  <Button
                    type="button"
                    variant={affiliateType === "partner" ? "default" : "outline"}
                    onClick={() => setAffiliateType("partner")}
                    className="w-full"
                    data-testid="button-type-partner"
                  >
                    <Star className="w-4 h-4 mr-1" />
                    Partner
                  </Button>
                </div>

                <div>
                  <Label htmlFor="name">Full Name</Label>
                  <Input
                    id="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Your full name"
                    data-testid="input-name"
                  />
                </div>

                <div>
                  <Label htmlFor="email">Email Address</Label>
                  <Input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="your@email.com"
                    data-testid="input-email"
                  />
                </div>

                <div>
                  <Label htmlFor="phone">Phone (Optional)</Label>
                  <Input
                    id="phone"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="+971 50 123 4567"
                    data-testid="input-phone"
                  />
                </div>

                <Button 
                  type="submit" 
                  className="w-full" 
                  size="lg"
                  disabled={registerMutation.isPending}
                  data-testid="button-register"
                >
                  {registerMutation.isPending ? (
                    <Clock className="w-4 h-4 mr-2 animate-spin" />
                  ) : (
                    <Send className="w-4 h-4 mr-2" />
                  )}
                  Register for Launch
                </Button>
              </form>

              <div className="mt-6 p-4 bg-muted/50 rounded-lg">
                <p className="text-sm text-muted-foreground text-center mb-2">
                  {affiliateType === "member" && "Get early access and AED 50 credit on launch day!"}
                  {affiliateType === "affiliate" && "Earn 10% commission on every referral booking!"}
                  {affiliateType === "partner" && "Get priority listing and marketing support!"}
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Referral Section */}
      <section className="py-16 px-4">
        <div className="container mx-auto max-w-4xl">
          <div className="text-center mb-10">
            <h2 className="text-2xl font-bold mb-4">Share & Earn</h2>
            <p className="text-muted-foreground">
              Get your unique referral link and earn rewards for every friend who signs up!
            </p>
          </div>

          <Card className="max-w-lg mx-auto">
            <CardContent className="pt-6">
              <div className="bg-muted/50 rounded-lg p-4 mb-4">
                <p className="text-sm text-muted-foreground mb-2">Your Referral Link</p>
                <div className="flex items-center gap-2">
                  <code className="flex-1 bg-background rounded px-3 py-2 text-sm overflow-hidden text-ellipsis">
                    {referralLink}
                  </code>
                  <Button 
                    size="icon" 
                    variant="outline" 
                    onClick={handleCopyReferral}
                    data-testid="button-copy-referral"
                  >
                    {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                  </Button>
                </div>
              </div>

              <div className="flex flex-wrap justify-center gap-3">
                <SocialSharingWidget 
                  content={{
                    type: 'trade',
                    title: 'DeliWer Home Service Launch',
                    description: 'Join DeliWer on Dec 25th! Water filtration, errand runners, and more home services. Register now for exclusive launch rewards!',
                    value: 50,
                    url: referralLink
                  }}
                />
                <a 
                  href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(referralLink)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600/20 border border-blue-500/30 rounded-lg text-blue-400 hover:bg-blue-600/30 transition-colors"
                  data-testid="link-share-facebook"
                >
                  <SiFacebook className="w-5 h-5" />
                  Facebook
                </a>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* WhatsApp Contact Section */}
      <section className="py-16 px-4 bg-gradient-to-br from-green-900/20 via-emerald-900/10 to-teal-900/20">
        <div className="container mx-auto max-w-4xl">
          <div className="text-center mb-10">
            <div className="inline-flex items-center gap-2 bg-green-500/10 rounded-full px-4 py-2 mb-6">
              <SiWhatsapp className="w-4 h-4 text-green-400" />
              <span className="text-sm text-green-400 font-medium">Connect With Our Team</span>
            </div>
            <h2 className="text-2xl font-bold mb-4">Direct WhatsApp Access</h2>
            <p className="text-muted-foreground">
              Chat with our launch team for immediate assistance
            </p>
          </div>

          <div className="grid sm:grid-cols-2 gap-6">
            <Card className="border-green-500/20">
              <CardContent className="pt-6">
                <h3 className="font-bold text-lg mb-2">Hassan Jawad</h3>
                <p className="text-sm text-muted-foreground mb-4">Senior Concierge Specialist</p>
                <div className="space-y-2">
                  <a 
                    href="https://wa.me/971523946311" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-green-400 hover:text-green-300 transition-colors"
                  >
                    <Phone className="w-4 h-4" />
                    +971 52 394 6311
                  </a>
                  <a 
                    href="https://wa.me/971523906019" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-green-400 hover:text-green-300 transition-colors"
                  >
                    <Phone className="w-4 h-4" />
                    +971 52 390 6019
                  </a>
                </div>
              </CardContent>
            </Card>

            <Card className="border-green-500/20">
              <CardContent className="pt-6">
                <h3 className="font-bold text-lg mb-2">Rubab Hassan</h3>
                <p className="text-sm text-muted-foreground mb-4">Home Essentials Expert</p>
                <div className="space-y-2">
                  <a 
                    href="https://wa.me/971567148381" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-green-400 hover:text-green-300 transition-colors"
                  >
                    <Phone className="w-4 h-4" />
                    +971 56 714 8381
                  </a>
                  <a 
                    href="https://wa.me/971504547110" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-green-400 hover:text-green-300 transition-colors"
                  >
                    <Phone className="w-4 h-4" />
                    +971 50 454 7110
                  </a>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="text-center mt-8">
            <p className="text-sm text-muted-foreground mb-4">Follow us for launch updates!</p>
            <div className="flex flex-wrap justify-center gap-4">
              <a 
                href="https://facebook.com/deliwer" 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600/20 border border-blue-500/30 rounded-lg text-blue-400 hover:bg-blue-600/30 transition-colors"
              >
                <SiFacebook className="w-5 h-5" />
                @deliwer
              </a>
              <a 
                href="https://instagram.com/vdeliwer" 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 bg-pink-600/20 border border-pink-500/30 rounded-lg text-pink-400 hover:bg-pink-600/30 transition-colors"
              >
                <SiInstagram className="w-5 h-5" />
                @vdeliwer
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Footer */}
      <section className="py-12 px-4 border-t border-border/50 bg-muted/20">
        <div className="container mx-auto max-w-3xl text-center">
          <h3 className="text-xl font-bold mb-4">Ready for Launch Day?</h3>
          <p className="text-muted-foreground mb-6">December 25th is just around the corner!</p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/home-service">
              <Button size="lg" data-testid="button-final-services">
                <Sparkles className="w-4 h-4 mr-2" />
                View All Services
              </Button>
            </Link>
            <Link href="/errand">
              <Button size="lg" variant="outline" data-testid="button-final-errand">
                <Bike className="w-4 h-4 mr-2" />
                Errand Runner
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
