import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Helmet } from "react-helmet";
import { 
  Sparkles, 
  ArrowRight, 
  Gift, 
  CheckCircle2, 
  Droplets,
  Calculator,
  QrCode,
  MessageCircle,
  Users,
  Utensils
} from "lucide-react";
import { SiWhatsapp } from "react-icons/si";

export default function HomeServiceLaunch() {
  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>DeliWer Move-In Launch | Exclusive JVC Move-In Offer</title>
        <meta name="description" content="Start living comfortably from Day One. Exclusive move-in offer for JVC residents: Free shower filter installation and AED 99 starter deal." />
      </Helmet>

      {/* Hero Section */}
      <section className="relative py-20 lg:py-32 overflow-hidden bg-dubai-gradient">
        <div className="container mx-auto px-4 relative z-10 text-center">
          <Badge variant="outline" className="mb-6 bg-primary/10 text-primary border-primary/20 px-4 py-1.5 text-sm font-medium">
            For new residents moving into JVC & nearby communities
          </Badge>
          <h1 className="text-4xl md:text-6xl font-extrabold text-foreground mb-6 tracking-tight" data-testid="text-launch-title">
            Just Moved Into Your <span className="text-primary">Apartment?</span>
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground mb-10 max-w-2xl mx-auto leading-relaxed">
            Start living comfortably from Day One — without running around Dubai.
          </p>
          <Link href="/residence/move-in-services">
            <Button size="lg" className="h-12 px-8 text-lg font-semibold hover-elevate active-elevate-2" data-testid="button-cta-hero">
              Check Your Move-In Offer <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
        </div>
      </section>

      {/* SECTION 2 — THE FREE GIFT (HOOK) */}
      <section className="py-20 px-4 bg-muted/30">
        <div className="container mx-auto max-w-4xl">
          <Card className="border-primary/20 shadow-xl overflow-hidden hover-elevate">
            <div className="grid md:grid-cols-2">
              <div className="p-8 md:p-12 flex flex-col justify-center bg-primary/5">
                <div className="inline-flex items-center gap-2 text-primary font-bold text-xl mb-4">
                  <Gift className="w-6 h-6" />
                  <span>Free Gift</span>
                </div>
                <h2 className="text-3xl font-bold mb-4">🎁 Free Shower Filter + Installation</h2>
                <p className="text-muted-foreground leading-relaxed">
                  If you’ve recently rented a new apartment, you’re eligible for a free shower filter with installation as part of DeliWer’s move-in launch.
                </p>
              </div>
              <div className="p-8 md:p-12 bg-card">
                <h3 className="font-bold text-lg mb-6">Why this matters:</h3>
                <ul className="space-y-4">
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-primary mt-1 shrink-0" />
                    <span>Dubai water affects skin & hair</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-primary mt-1 shrink-0" />
                    <span>Most residents realize this too late</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-primary mt-1 shrink-0" />
                    <span>We fix it on Day One</span>
                  </li>
                </ul>
                <p className="mt-8 text-sm font-medium text-muted-foreground/80 border-t pt-4">
                  * Limited to first-time move-ins only.
                </p>
              </div>
            </div>
          </Card>
        </div>
      </section>

      {/* SECTION 3 — AED 99 MOVE-IN DEAL (ANCHOR) */}
      <section className="py-20 px-4">
        <div className="container mx-auto max-w-5xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">JVC Move-In Starter — <span className="text-primary">AED 99</span></h2>
            <p className="text-lg text-muted-foreground">Designed for residents who just got their keys.</p>
          </div>
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div className="space-y-6">
              <div className="flex gap-4 p-4 rounded-xl bg-card border hover-elevate transition-all">
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                  <Sparkles className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h4 className="font-bold text-lg">Move-in guidance</h4>
                  <p className="text-muted-foreground">Expert advice for your first days</p>
                </div>
              </div>
              <div className="flex gap-4 p-4 rounded-xl bg-card border hover-elevate transition-all">
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                  <Droplets className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h4 className="font-bold text-lg">Water filtration setup check</h4>
                  <p className="text-muted-foreground">Full assessment of your home's water</p>
                </div>
              </div>
              <div className="flex gap-4 p-4 rounded-xl bg-card border hover-elevate transition-all">
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                  <CheckCircle2 className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h4 className="font-bold text-lg">Essential services coordination</h4>
                  <p className="text-muted-foreground">We handle the boring stuff for you</p>
                </div>
              </div>
              <div className="flex gap-4 p-4 rounded-xl bg-card border hover-elevate transition-all">
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                  <MessageCircle className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h4 className="font-bold text-lg">Priority WhatsApp support</h4>
                  <p className="text-muted-foreground">Direct line to our concierge team</p>
                </div>
              </div>
            </div>
            <Card className="bg-primary text-primary-foreground p-8 md:p-12 text-center h-full flex flex-col justify-center">
              <h3 className="text-2xl font-bold mb-4">Exclusive Launch Access</h3>
              <p className="text-primary-foreground/90 mb-8 leading-relaxed">
                This offer is not public and available only through our launch partners.
              </p>
              <Link href="/residence/move-in-services">
                <Button variant="secondary" size="lg" className="w-full text-lg h-12 font-bold hover-elevate active-elevate-2">
                  Activate Offer Now
                </Button>
              </Link>
            </Card>
          </div>
        </div>
      </section>

      {/* SECTION 4 — BONUS PERKS (LOCAL & HUMAN) */}
      <section className="py-20 px-4 bg-primary/5">
        <div className="container mx-auto max-w-3xl text-center">
          <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
            <Utensils className="w-8 h-8 text-primary" />
          </div>
          <h2 className="text-3xl font-bold mb-4">🍔 Chill & Grill Voucher</h2>
          <p className="text-xl text-muted-foreground mb-8">
            Enjoy a complimentary food voucher from a local JVC restaurant partner when you activate your move-in support.
          </p>
          <p className="italic text-muted-foreground/80">
            (Because moving in shouldn’t mean skipping meals.)
          </p>
        </div>
      </section>

      {/* SECTION 5 — HOW IT WORKS (SIMPLE FLOW) */}
      <section className="py-20 px-4">
        <div className="container mx-auto max-w-5xl">
          <h2 className="text-3xl font-bold text-center mb-16">How It Works</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-8">
            <div className="text-center group">
              <div className="w-16 h-16 rounded-full bg-card border shadow-sm flex items-center justify-center mx-auto mb-6 group-hover:bg-primary group-hover:text-primary-foreground transition-all">
                <QrCode className="w-8 h-8" />
              </div>
              <p className="font-medium">Scan the QR or visit this page</p>
            </div>
            <div className="text-center group">
              <div className="w-16 h-16 rounded-full bg-card border shadow-sm flex items-center justify-center mx-auto mb-6 group-hover:bg-primary group-hover:text-primary-foreground transition-all">
                <Calculator className="w-8 h-8" />
              </div>
              <p className="font-medium">Use the Move-In Calculator</p>
            </div>
            <div className="text-center group">
              <div className="w-16 h-16 rounded-full bg-card border shadow-sm flex items-center justify-center mx-auto mb-6 group-hover:bg-primary group-hover:text-primary-foreground transition-all">
                <Sparkles className="w-8 h-8" />
              </div>
              <p className="font-medium">See your AED 99 launch offer</p>
            </div>
            <div className="text-center group">
              <div className="w-16 h-16 rounded-full bg-card border shadow-sm flex items-center justify-center mx-auto mb-6 group-hover:bg-primary group-hover:text-primary-foreground transition-all">
                <Gift className="w-8 h-8" />
              </div>
              <p className="font-medium">Get your free filter + voucher</p>
            </div>
            <div className="text-center group">
              <div className="w-16 h-16 rounded-full bg-card border shadow-sm flex items-center justify-center mx-auto mb-6 group-hover:bg-primary group-hover:text-primary-foreground transition-all">
                <MessageCircle className="w-8 h-8" />
              </div>
              <p className="font-medium">We coordinate on WhatsApp</p>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 6 — WHO THIS IS FOR */}
      <section className="py-20 px-4 bg-muted/50">
        <div className="container mx-auto max-w-4xl">
          <h2 className="text-3xl font-bold text-center mb-12">Who This Launch Is For</h2>
          <div className="grid sm:grid-cols-2 gap-4">
            <div className="p-6 bg-card rounded-xl border flex items-center gap-4 hover-elevate transition-all">
              <Users className="w-6 h-6 text-primary" />
              <span className="font-semibold text-lg">New tenants</span>
            </div>
            <div className="p-6 bg-card rounded-xl border flex items-center gap-4 hover-elevate transition-all">
              <Sparkles className="w-6 h-6 text-primary" />
              <span className="font-semibold text-lg">Renters moving into JVC</span>
            </div>
            <div className="p-6 bg-card rounded-xl border flex items-center gap-4 hover-elevate transition-all">
              <Users className="w-6 h-6 text-primary" />
              <span className="font-semibold text-lg">Families & Professionals Relocating</span>
            </div>
            <div className="p-6 bg-card rounded-xl border flex items-center gap-4 hover-elevate transition-all">
              <CheckCircle2 className="w-6 h-6 text-primary" />
              <span className="font-semibold text-lg">Anyone who wants help after keys</span>
            </div>
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="py-24 px-4 bg-primary text-primary-foreground relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl"></div>
        <div className="container mx-auto max-w-3xl text-center relative z-10">
          <h2 className="text-4xl font-bold mb-6">Just moved in?</h2>
          <p className="text-xl mb-10 text-primary-foreground/90">
            Check your eligibility and activate your move-in support now.
          </p>
          <Link href="/residence/move-in-services">
            <Button variant="secondary" size="lg" className="h-14 px-10 text-xl font-bold hover-elevate active-elevate-2 shadow-2xl">
              👉 Go to Move-In Services Calculator
            </Button>
          </Link>
        </div>
      </section>

      {/* CONTACT (CLEAR & REPEATED) */}
      <footer className="py-16 px-4 bg-card border-t">
        <div className="container mx-auto max-w-4xl">
          <div className="grid md:grid-cols-2 gap-12 text-center md:text-left">
            <div>
              <h3 className="text-2xl font-bold mb-6">Get in Touch</h3>
              <div className="space-y-4">
                <a 
                  href="https://wa.me/971523946311" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center justify-center md:justify-start gap-3 text-lg font-medium text-primary hover:underline"
                >
                  <SiWhatsapp className="w-6 h-6" />
                  +971 52 394 6311
                </a>
                <p className="text-muted-foreground text-lg">
                  Website: <a href="https://www.deliwer.com" className="hover:underline font-semibold">www.deliwer.com</a>
                </p>
              </div>
            </div>
            <div className="flex flex-col justify-center">
              <p className="text-muted-foreground leading-relaxed">
                DeliWer is your personal move-in partner in Dubai, dedicated to making your transition to a new home as smooth as possible.
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
