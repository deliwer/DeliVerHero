import { useState } from "react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Package,
  TruckIcon,
  CheckCircle,
  DollarSign,
  Globe,
  Zap,
  Shield,
  ArrowRight,
  Star,
  Clock,
  BarChart3,
  Users,
  Sparkles,
  Smartphone,
} from "lucide-react";
import { getLatestModels, getModelsBySeries, type iPhoneModel } from "@shared/iphone-catalog";
import iPhone17ProMaxBlue from "@assets/generated_images/iPhone_17_Pro_Max_Blue_5527e769.png";
import iPhone17Pro from "@assets/generated_images/iPhone_17_Pro_Natural_102f756e.png";
import iPhone17Plus from "@assets/generated_images/iPhone_17_Plus_Black_07e48dac.png";
import iPhone17 from "@assets/generated_images/iPhone_17_White_c97e6eb6.png";

export default function FulfillmentByDeliWer() {
  const [activeTab, setActiveTab] = useState<"buyer" | "seller">("seller");

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted">
      {/* Hero Section */}
      <section className="relative py-20 px-4 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-primary/10 to-accent/10"></div>
        <div className="max-w-6xl mx-auto relative z-10">
          <div className="text-center space-y-6">
            <Badge className="mb-4" variant="outline" data-testid="badge-fulfillment">
              <Zap className="w-3 h-3 mr-1" />
              Powered by ChainTrack Global Network
            </Badge>
            <h1 className="text-5xl md:text-6xl font-bold tracking-tight" data-testid="text-hero-title">
              Fulfillment by DeliWer
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto" data-testid="text-hero-subtitle">
              Sell iPhones without inventory. We handle sourcing, storage, and worldwide shipping
              so you can focus on growing your business.
            </p>
            <div className="flex flex-wrap gap-4 justify-center mt-8">
              <Link href="/signup">
                <Button size="lg" className="min-h-12" data-testid="button-join-reseller">
                  <Users className="w-5 h-5 mr-2" />
                  Join as Reseller
                </Button>
              </Link>
              <Link href="/chaintrack">
                <Button size="lg" variant="outline" className="min-h-12" data-testid="button-browse-inventory">
                  <Package className="w-5 h-5 mr-2" />
                  Browse Inventory
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Trust Indicators */}
      <section className="py-12 px-4 bg-card border-y">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="text-center space-y-2" data-testid="stat-verified-suppliers">
              <div className="text-3xl font-bold text-primary">200+</div>
              <div className="text-sm text-muted-foreground">Verified Suppliers</div>
            </div>
            <div className="text-center space-y-2" data-testid="stat-countries">
              <div className="text-3xl font-bold text-primary">50+</div>
              <div className="text-sm text-muted-foreground">Countries Served</div>
            </div>
            <div className="text-center space-y-2" data-testid="stat-orders">
              <div className="text-3xl font-bold text-primary">10K+</div>
              <div className="text-sm text-muted-foreground">Orders Fulfilled</div>
            </div>
            <div className="text-center space-y-2" data-testid="stat-delivery-time">
              <div className="text-3xl font-bold text-primary">48h</div>
              <div className="text-sm text-muted-foreground">Avg Delivery Time</div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4" data-testid="text-how-it-works-title">How It Works</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto" data-testid="text-how-it-works-subtitle">
              Simple, transparent, and efficient. Start selling in three steps.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <Card className="relative" data-testid="card-step-1">
              <div className="absolute -top-4 -left-4 w-12 h-12 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold text-xl">
                1
              </div>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="w-5 h-5 text-primary" />
                  Register & Verify
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <p className="text-muted-foreground">
                  Create your reseller account and complete KYC verification. Get approved within 24 hours.
                </p>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green-500" />
                    Business license upload
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green-500" />
                    Bank details verification
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green-500" />
                    Instant API access
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card className="relative" data-testid="card-step-2">
              <div className="absolute -top-4 -left-4 w-12 h-12 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold text-xl">
                2
              </div>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Package className="w-5 h-5 text-primary" />
                  List Our Inventory
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <p className="text-muted-foreground">
                  Access real-time pricing on verified iPhone inventory from global suppliers.
                </p>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green-500" />
                    Live inventory feed
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green-500" />
                    Competitive pricing tiers
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green-500" />
                    Specs & photos included
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card className="relative" data-testid="card-step-3">
              <div className="absolute -top-4 -left-4 w-12 h-12 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold text-xl">
                3
              </div>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TruckIcon className="w-5 h-5 text-primary" />
                  We Handle Everything
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <p className="text-muted-foreground">
                  You get the order, we fulfill it. Pay upfront, we source, inspect, and ship globally.
                </p>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green-500" />
                    Quality inspection
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green-500" />
                    Global shipping
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green-500" />
                    Real-time tracking
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Interactive iPhone Catalog */}
      <section className="py-20 px-4 bg-gradient-to-b from-muted to-background">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <Badge className="mb-4" variant="outline" data-testid="badge-new-lineup">
              <Sparkles className="w-3 h-3 mr-1" />
              New: iPhone 17 Lineup Available
            </Badge>
            <h2 className="text-4xl font-bold mb-4" data-testid="text-catalog-title">Browse Available Inventory</h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto" data-testid="text-catalog-subtitle">
              Access verified iPhone inventory from global suppliers. Real-time pricing and availability.
            </p>
          </div>

          {/* iPhone 17 Featured Section */}
          <div className="mb-12 bg-gradient-to-r from-primary/10 via-accent/10 to-primary/10 rounded-2xl p-8 border border-primary/20">
            <div className="text-center mb-8">
              <h3 className="text-3xl font-bold mb-2">iPhone 17 Series - Now Available</h3>
              <p className="text-muted-foreground">Pre-order for GITEX 2025 launch. Priority access for verified resellers.</p>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                { name: "iPhone 17 Pro Max", image: iPhone17ProMaxBlue, storage: "Up to 2TB", price: "From $485/unit (bulk 50+)" },
                { name: "iPhone 17 Pro", image: iPhone17Pro, storage: "Up to 1TB", price: "From $425/unit (bulk 50+)" },
                { name: "iPhone 17 Plus", image: iPhone17Plus, storage: "Up to 512GB", price: "From $385/unit (bulk 50+)" },
                { name: "iPhone 17", image: iPhone17, storage: "Up to 512GB", price: "From $345/unit (bulk 50+)" }
              ].map((model, idx) => (
                <Card key={idx} className="overflow-hidden hover:shadow-lg transition-shadow" data-testid={`card-catalog-${model.name.toLowerCase().replace(/\s+/g, '-')}`}>
                  <div className="p-4">
                    <div className="flex justify-center mb-4">
                      <img 
                        src={model.image} 
                        alt={model.name}
                        className="w-32 h-32 object-contain"
                        data-testid={`img-catalog-${model.name.toLowerCase().replace(/\s+/g, '-')}`}
                      />
                    </div>
                    <div className="text-center">
                      <h4 className="font-bold text-lg mb-1">{model.name}</h4>
                      <p className="text-sm text-muted-foreground mb-2">{model.storage}</p>
                      <p className="text-primary font-bold text-sm mb-3">{model.price}</p>
                      <div className="flex gap-2">
                        <Link href="/chaintrack" className="flex-1">
                          <Button variant="outline" size="sm" className="w-full" data-testid={`button-browse-${model.name.toLowerCase().replace(/\s+/g, '-')}`}>
                            Browse Stock
                          </Button>
                        </Link>
                        <Link href="/bulk-purchasing" className="flex-1">
                          <Button size="sm" className="w-full" data-testid={`button-quote-${model.name.toLowerCase().replace(/\s+/g, '-')}`}>
                            Get Quote
                          </Button>
                        </Link>
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
            <div className="text-center mt-8">
              <div className="flex flex-wrap gap-4 justify-center">
                <Link href="/bulk-purchasing">
                  <Button size="lg" data-testid="button-request-bulk-quote">
                    <Package className="w-5 h-5 mr-2" />
                    Request Bulk Quote
                  </Button>
                </Link>
                <Link href="/chaintrack">
                  <Button size="lg" variant="outline" data-testid="button-browse-all-inventory">
                    <Smartphone className="w-5 h-5 mr-2" />
                    Browse All Inventory
                  </Button>
                </Link>
              </div>
            </div>
          </div>

          {/* Procurement Process */}
          <div className="bg-card rounded-xl p-8 border">
            <h3 className="text-2xl font-bold mb-6 text-center">Procurement Process</h3>
            <div className="grid md:grid-cols-4 gap-6">
              <div className="text-center">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold text-primary">1</span>
                </div>
                <h4 className="font-bold mb-2">Browse & Select</h4>
                <p className="text-sm text-muted-foreground">Choose models, storage, condition from our live inventory</p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold text-primary">2</span>
                </div>
                <h4 className="font-bold mb-2">Get Quote</h4>
                <p className="text-sm text-muted-foreground">Instant pricing based on quantity and your tier level</p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold text-primary">3</span>
                </div>
                <h4 className="font-bold mb-2">Approve & Pay</h4>
                <p className="text-sm text-muted-foreground">Review terms, approve order, payment via bank transfer or Stripe</p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold text-primary">4</span>
                </div>
                <h4 className="font-bold mb-2">Track & Receive</h4>
                <p className="text-sm text-muted-foreground">Real-time tracking from source to your customer's door</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 px-4 bg-muted/50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4" data-testid="text-benefits-title">Why Choose Us</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto" data-testid="text-benefits-subtitle">
              Built for resellers who want to scale without the operational burden.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card data-testid="card-benefit-no-inventory">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Package className="w-5 h-5 text-primary" />
                  No Inventory Risk
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Zero capital tied up in stock. Only pay when your customer orders.
                </p>
              </CardContent>
            </Card>

            <Card data-testid="card-benefit-global">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Globe className="w-5 h-5 text-primary" />
                  Global Sourcing
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Access inventory from USA, UAE, Japan, China, and 50+ countries.
                </p>
              </CardContent>
            </Card>

            <Card data-testid="card-benefit-quality">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Shield className="w-5 h-5 text-primary" />
                  Quality Assured
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Every device inspected before shipping. Grade A, B, C verified standards.
                </p>
              </CardContent>
            </Card>

            <Card data-testid="card-benefit-pricing">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <DollarSign className="w-5 h-5 text-primary" />
                  Transparent Pricing
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Tier-based markup: 1% (Starter), 0.5% (Growth), negotiable (Enterprise).
                </p>
              </CardContent>
            </Card>

            <Card data-testid="card-benefit-shipping">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Clock className="w-5 h-5 text-primary" />
                  Fast Fulfillment
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  48-hour average fulfillment. Track every order from source to destination.
                </p>
              </CardContent>
            </Card>

            <Card data-testid="card-benefit-api">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Zap className="w-5 h-5 text-primary" />
                  API Integration
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Connect your store directly via API. Automated order sync and tracking.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Pricing Tiers */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4" data-testid="text-pricing-title">Transparent Pricing</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto" data-testid="text-pricing-subtitle">
              No hidden fees. Just simple markup based on your order volume.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <Card data-testid="card-tier-starter">
              <CardHeader>
                <CardTitle>Starter</CardTitle>
                <CardDescription>Perfect for getting started</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <div className="text-3xl font-bold">1%</div>
                  <div className="text-sm text-muted-foreground">Markup per order</div>
                </div>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green-500" />
                    Up to 50 orders/month
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green-500" />
                    Access to full inventory
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green-500" />
                    Quality inspection included
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green-500" />
                    Standard support
                  </li>
                </ul>
                <Button className="w-full" variant="outline" data-testid="button-tier-starter">
                  Get Started
                </Button>
              </CardContent>
            </Card>

            <Card className="border-primary shadow-lg" data-testid="card-tier-growth">
              <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                <Badge className="bg-primary text-primary-foreground">
                  <Star className="w-3 h-3 mr-1" />
                  Popular
                </Badge>
              </div>
              <CardHeader>
                <CardTitle>Growth</CardTitle>
                <CardDescription>For scaling businesses</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <div className="text-3xl font-bold">0.5%</div>
                  <div className="text-sm text-muted-foreground">Markup per order</div>
                </div>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green-500" />
                    50-500 orders/month
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green-500" />
                    Priority inventory access
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green-500" />
                    API integration
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green-500" />
                    Priority support
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green-500" />
                    Custom branding options
                  </li>
                </ul>
                <Button className="w-full" data-testid="button-tier-growth">
                  Start Growing
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </CardContent>
            </Card>

            <Card data-testid="card-tier-enterprise">
              <CardHeader>
                <CardTitle>Enterprise</CardTitle>
                <CardDescription>For high-volume operations</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <div className="text-3xl font-bold">Custom</div>
                  <div className="text-sm text-muted-foreground">Negotiable pricing</div>
                </div>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green-500" />
                    500+ orders/month
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green-500" />
                    Dedicated account manager
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green-500" />
                    White-label fulfillment
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green-500" />
                    NET 7-15 payment terms
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green-500" />
                    Custom integrations
                  </li>
                </ul>
                <Button className="w-full" variant="outline" data-testid="button-tier-enterprise">
                  Contact Sales
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-gradient-to-r from-primary/10 to-accent/10">
        <div className="max-w-4xl mx-auto text-center space-y-6">
          <h2 className="text-4xl font-bold" data-testid="text-cta-title">
            Ready to Scale Your iPhone Business?
          </h2>
          <p className="text-xl text-muted-foreground" data-testid="text-cta-subtitle">
            Join 200+ verified resellers using Fulfillment by DeliWer to grow globally.
          </p>
          <div className="flex flex-wrap gap-4 justify-center mt-8">
            <Button size="lg" className="min-h-12" data-testid="button-cta-join">
              <Users className="w-5 h-5 mr-2" />
              Join as Reseller
            </Button>
            <Button size="lg" variant="outline" className="min-h-12" data-testid="button-cta-learn-more">
              <BarChart3 className="w-5 h-5 mr-2" />
              View Documentation
            </Button>
          </div>
          <p className="text-sm text-muted-foreground" data-testid="text-cta-approval">
            24-hour approval process • No setup fees • Cancel anytime
          </p>
        </div>
      </section>
    </div>
  );
}
