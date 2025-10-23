import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Link } from "wouter";
import { User } from "@shared/schema";
import {
  Package,
  TrendingDown,
  Shield,
  Zap,
  Building2,
  Globe,
  CheckCircle2,
  ArrowRight,
  Phone,
  Search,
  BarChart3,
  Sparkles,
  Plane,
  Clock,
  DollarSign,
  Users,
  Star,
  Boxes,
} from "lucide-react";

export default function ChainTrackPage() {
  const { data: user, isLoading: userLoading } = useQuery<User>({
    queryKey: ['/api/user/profile'],
  });

  if (userLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
          <p className="mt-4 text-muted-foreground">Loading ChainTrack...</p>
        </div>
      </div>
    );
  }

  // Check if user is a verified B2B buyer
  if (user) {
    if (user.userType === 'b2b_buyer' && user.isB2BVerified) {
      return <ChainTrackDashboard />;
    } else if (user.userType === 'b2b_buyer' && !user.isB2BVerified) {
      return <VerificationPending />;
    } else {
      // Regular consumer trying to access B2B platform
      return <AccessDenied />;
    }
  }

  return <ChainTrackLanding />;
}

function VerificationPending() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-slate-100 dark:from-slate-950 dark:via-blue-950 dark:to-slate-900 flex items-center justify-center p-4">
      <Card className="max-w-2xl p-8 text-center">
        <div className="w-16 h-16 bg-yellow-100 dark:bg-yellow-900/30 rounded-full flex items-center justify-center mx-auto mb-6">
          <Shield className="w-8 h-8 text-yellow-600 dark:text-yellow-400" />
        </div>
        <h1 className="text-3xl font-bold mb-4">Verification Pending</h1>
        <p className="text-lg text-slate-600 dark:text-slate-400 mb-6">
          Thank you for registering as a B2B wholesale buyer. Your account is currently under review.
        </p>
        <p className="text-slate-600 dark:text-slate-400 mb-8">
          Our team is verifying your business credentials and trade license. This process typically takes 1-2 business days.
          You'll receive an email notification once your account is approved.
        </p>
        <div className="space-y-3">
          <p className="text-sm font-semibold text-slate-700 dark:text-slate-300">Need Help?</p>
          <p className="text-sm text-slate-600 dark:text-slate-400">
            Contact our B2B support team at <a href="mailto:b2b@deliwer.com" className="text-blue-600 dark:text-blue-400 hover:underline">b2b@deliwer.com</a>
          </p>
        </div>
      </Card>
    </div>
  );
}

function AccessDenied() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-slate-100 dark:from-slate-950 dark:via-blue-950 dark:to-slate-900 flex items-center justify-center p-4">
      <Card className="max-w-2xl p-8 text-center">
        <div className="w-16 h-16 bg-red-100 dark:bg-red-900/30 rounded-full flex items-center justify-center mx-auto mb-6">
          <Shield className="w-8 h-8 text-red-600 dark:text-red-400" />
        </div>
        <h1 className="text-3xl font-bold mb-4">B2B Access Required</h1>
        <p className="text-lg text-slate-600 dark:text-slate-400 mb-6">
          ChainTrack is exclusively for verified B2B wholesale buyers. Consumer accounts cannot access this platform.
        </p>
        <p className="text-slate-600 dark:text-slate-400 mb-8">
          If you're a wholesale buyer, please create a B2B account to access our inventory aggregation platform.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/">
            <Button variant="outline" size="lg" data-testid="button-back-home">
              Back to Homepage
            </Button>
          </Link>
          <Link href="/signup">
            <Button size="lg" className="gap-2" data-testid="button-request-b2b-access">
              Request B2B Access
              <ArrowRight className="w-4 h-4" />
            </Button>
          </Link>
        </div>
      </Card>
    </div>
  );
}

function ChainTrackLanding() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-slate-100 dark:from-slate-950 dark:via-blue-950 dark:to-slate-900">
      {/* Hero Section */}
      <div className="container mx-auto px-4 py-20">
        <div className="text-center max-w-4xl mx-auto">
          <div className="inline-flex items-center gap-2 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 px-4 py-2 rounded-full text-sm font-medium mb-4">
            <Globe className="w-4 h-4" />
            A DeliWer Shopping Metaverse Subsidiary
          </div>
          
          <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400 bg-clip-text text-transparent">
            ChainTrack
          </h1>
          
          <p className="text-xl md:text-2xl text-slate-700 dark:text-slate-300 mb-4">
            Dubai's Premier Mobile Sourcing Hub for MENA & Europe
          </p>
          
          <p className="text-lg text-slate-600 dark:text-slate-400 mb-6 max-w-2xl mx-auto">
            Source wholesale phones from US, Japan, and China auctions without traveling. 
            Access ASIS auction stock and ready-to-ship tested devices through one platform.
          </p>
          
          <div className="bg-blue-50 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-800 rounded-lg p-4 mb-8 max-w-2xl mx-auto">
            <p className="text-sm text-blue-800 dark:text-blue-300 flex items-center justify-center gap-2">
              <Sparkles className="w-4 h-4" />
              Serving buyers from Saudi Arabia, Iraq, Azerbaijan, North Africa & Europe
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/login">
              <Button size="lg" className="gap-2" data-testid="button-login">
                <Shield className="w-5 h-5" />
                Buyer Login
                <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
            <Link href="/signup">
              <Button size="lg" variant="outline" className="gap-2" data-testid="button-signup">
                Request Access
              </Button>
            </Link>
          </div>
        </div>

        {/* Why Dubai Over Travel */}
        <div className="mt-20 max-w-5xl mx-auto">
          <Card className="p-8 bg-gradient-to-br from-purple-50 to-blue-50 dark:from-purple-950/30 dark:to-blue-950/30 border-2 border-purple-200 dark:border-purple-800">
            <h2 className="text-3xl font-bold text-center mb-8">Why Source Through Dubai Instead of Traveling?</h2>
            
            <div className="grid md:grid-cols-3 gap-6 mb-6">
              <div className="flex flex-col items-center text-center">
                <div className="w-16 h-16 bg-red-100 dark:bg-red-900/30 rounded-full flex items-center justify-center mb-4">
                  <Plane className="w-8 h-8 text-red-600 dark:text-red-400" />
                </div>
                <h3 className="font-semibold mb-2">No Travel Required</h3>
                <p className="text-sm text-slate-600 dark:text-slate-400">
                  Save on flights, hotels, and visa costs. Source from your office in Dubai.
                </p>
              </div>
              
              <div className="flex flex-col items-center text-center">
                <div className="w-16 h-16 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mb-4">
                  <Clock className="w-8 h-8 text-green-600 dark:text-green-400" />
                </div>
                <h3 className="font-semibold mb-2">Instant Access</h3>
                <p className="text-sm text-slate-600 dark:text-slate-400">
                  Browse real-time inventory 24/7. No waiting for auction schedules.
                </p>
              </div>
              
              <div className="flex flex-col items-center text-center">
                <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center mb-4">
                  <DollarSign className="w-8 h-8 text-blue-600 dark:text-blue-400" />
                </div>
                <h3 className="font-semibold mb-2">Better Margins</h3>
                <p className="text-sm text-slate-600 dark:text-slate-400">
                  Lower service fees than traditional brokers. Transparent pricing.
                </p>
              </div>
            </div>
            
            <div className="bg-white dark:bg-slate-900 rounded-lg p-4 border border-slate-200 dark:border-slate-700">
              <p className="text-sm text-center text-slate-600 dark:text-slate-400">
                <strong className="text-slate-900 dark:text-slate-100">Strategic Location:</strong> Dubai serves as the perfect hub for MENA and European buyers, 
                with direct access to US, Japan, and China auction markets.
              </p>
            </div>
          </Card>
        </div>

        {/* Membership Tiers */}
        <div className="mt-24 max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">Membership Tiers</h2>
            <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
              Choose the tier that matches your monthly volume. All tiers cover our $500 minimum monthly cost or 0.5% transaction fee.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* On-Demand Tier */}
            <Card className="p-6 border-2 hover:border-blue-500 dark:hover:border-blue-400 transition-all">
              <div className="text-center mb-4">
                <h3 className="text-2xl font-bold mb-2">On-Demand</h3>
                <div className="text-3xl font-bold text-blue-600 dark:text-blue-400 mb-1">FREE</div>
                <p className="text-sm text-slate-500 dark:text-slate-400">No monthly commitment</p>
              </div>
              <div className="space-y-3 mb-6">
                <div className="flex items-start gap-2">
                  <CheckCircle2 className="w-5 h-5 text-green-600 dark:text-green-400 flex-shrink-0 mt-0.5" />
                  <span className="text-sm">Ready-to-Ship Stock Only</span>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle2 className="w-5 h-5 text-green-600 dark:text-green-400 flex-shrink-0 mt-0.5" />
                  <span className="text-sm">0.5% transaction fee</span>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle2 className="w-5 h-5 text-green-600 dark:text-green-400 flex-shrink-0 mt-0.5" />
                  <span className="text-sm">$500 minimum per month</span>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle2 className="w-5 h-5 text-green-600 dark:text-green-400 flex-shrink-0 mt-0.5" />
                  <span className="text-sm">Browse & compare prices</span>
                </div>
              </div>
              <Button variant="outline" className="w-full" data-testid="button-tier-ondemand">
                Start Free
              </Button>
            </Card>

            {/* Starter Tier */}
            <Card className="p-6 border-2 border-purple-500 dark:border-purple-400 relative">
              <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                <span className="bg-purple-500 text-white px-3 py-1 rounded-full text-xs font-semibold">
                  MOST POPULAR
                </span>
              </div>
              <div className="text-center mb-4">
                <h3 className="text-2xl font-bold mb-2">Starter</h3>
                <div className="text-3xl font-bold text-purple-600 dark:text-purple-400 mb-1">50+</div>
                <p className="text-sm text-slate-500 dark:text-slate-400">devices/month</p>
              </div>
              <div className="space-y-3 mb-6">
                <div className="flex items-start gap-2">
                  <CheckCircle2 className="w-5 h-5 text-green-600 dark:text-green-400 flex-shrink-0 mt-0.5" />
                  <span className="text-sm font-semibold">ASIS Auction Stock Access</span>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle2 className="w-5 h-5 text-green-600 dark:text-green-400 flex-shrink-0 mt-0.5" />
                  <span className="text-sm">Ready-to-Ship Stock</span>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle2 className="w-5 h-5 text-green-600 dark:text-green-400 flex-shrink-0 mt-0.5" />
                  <span className="text-sm">0.3% fee on ASIS stock</span>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle2 className="w-5 h-5 text-green-600 dark:text-green-400 flex-shrink-0 mt-0.5" />
                  <span className="text-sm">0.5% fee on tested stock</span>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle2 className="w-5 h-5 text-green-600 dark:text-green-400 flex-shrink-0 mt-0.5" />
                  <span className="text-sm">Priority support</span>
                </div>
              </div>
              <Button className="w-full bg-purple-600 hover:bg-purple-700" data-testid="button-tier-starter">
                Get Started
              </Button>
            </Card>

            {/* Growth Tier */}
            <Card className="p-6 border-2 hover:border-blue-500 dark:hover:border-blue-400 transition-all">
              <div className="text-center mb-4">
                <h3 className="text-2xl font-bold mb-2">Growth</h3>
                <div className="text-3xl font-bold text-blue-600 dark:text-blue-400 mb-1">250+</div>
                <p className="text-sm text-slate-500 dark:text-slate-400">devices/month</p>
              </div>
              <div className="space-y-3 mb-6">
                <div className="flex items-start gap-2">
                  <CheckCircle2 className="w-5 h-5 text-green-600 dark:text-green-400 flex-shrink-0 mt-0.5" />
                  <span className="text-sm">All Starter features</span>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle2 className="w-5 h-5 text-green-600 dark:text-green-400 flex-shrink-0 mt-0.5" />
                  <span className="text-sm">0.25% fee on ASIS stock</span>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle2 className="w-5 h-5 text-green-600 dark:text-green-400 flex-shrink-0 mt-0.5" />
                  <span className="text-sm">0.4% fee on tested stock</span>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle2 className="w-5 h-5 text-green-600 dark:text-green-400 flex-shrink-0 mt-0.5" />
                  <span className="text-sm">Dedicated account manager</span>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle2 className="w-5 h-5 text-green-600 dark:text-green-400 flex-shrink-0 mt-0.5" />
                  <span className="text-sm">Custom sourcing requests</span>
                </div>
              </div>
              <Button variant="outline" className="w-full" data-testid="button-tier-growth">
                Contact Sales
              </Button>
            </Card>

            {/* Enterprise Tier */}
            <Card className="p-6 border-2 border-amber-500 dark:border-amber-400 bg-gradient-to-br from-amber-50 to-yellow-50 dark:from-amber-950/20 dark:to-yellow-950/20">
              <div className="text-center mb-4">
                <div className="flex items-center justify-center gap-1 mb-2">
                  <Star className="w-5 h-5 text-amber-500" />
                  <h3 className="text-2xl font-bold">Enterprise</h3>
                  <Star className="w-5 h-5 text-amber-500" />
                </div>
                <div className="text-3xl font-bold text-amber-600 dark:text-amber-400 mb-1">500+</div>
                <p className="text-sm text-slate-500 dark:text-slate-400">devices/month</p>
              </div>
              <div className="space-y-3 mb-6">
                <div className="flex items-start gap-2">
                  <CheckCircle2 className="w-5 h-5 text-green-600 dark:text-green-400 flex-shrink-0 mt-0.5" />
                  <span className="text-sm">All Growth features</span>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle2 className="w-5 h-5 text-green-600 dark:text-green-400 flex-shrink-0 mt-0.5" />
                  <span className="text-sm font-semibold">Custom negotiated rates</span>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle2 className="w-5 h-5 text-green-600 dark:text-green-400 flex-shrink-0 mt-0.5" />
                  <span className="text-sm">Direct auction participation</span>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle2 className="w-5 h-5 text-green-600 dark:text-green-400 flex-shrink-0 mt-0.5" />
                  <span className="text-sm">API integration available</span>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle2 className="w-5 h-5 text-green-600 dark:text-green-400 flex-shrink-0 mt-0.5" />
                  <span className="text-sm">White-glove service</span>
                </div>
              </div>
              <Button className="w-full bg-amber-600 hover:bg-amber-700" data-testid="button-tier-enterprise">
                Request Quote
              </Button>
            </Card>
          </div>

          <div className="mt-8 text-center">
            <Card className="p-6 bg-slate-50 dark:bg-slate-900/50 border-2">
              <h3 className="font-semibold mb-3">Understanding Stock Types</h3>
              <div className="grid md:grid-cols-2 gap-6 text-left">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <Boxes className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                    <h4 className="font-semibold text-blue-600 dark:text-blue-400">ASIS Auction Stock</h4>
                  </div>
                  <p className="text-sm text-slate-600 dark:text-slate-400">
                    Untested devices directly from major auctions. Lower prices, higher volume. 
                    Best for buyers with in-house testing capabilities. Sold as-is without warranty.
                  </p>
                </div>
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <Shield className="w-5 h-5 text-green-600 dark:text-green-400" />
                    <h4 className="font-semibold text-green-600 dark:text-green-400">Ready-to-Ship Tested</h4>
                  </div>
                  <p className="text-sm text-slate-600 dark:text-slate-400">
                    Pre-tested, graded devices ready for immediate resale. Higher quality assurance. 
                    Includes warranties and detailed condition reports. Premium pricing.
                  </p>
                </div>
              </div>
            </Card>
          </div>
        </div>

        {/* How It Works */}
        <div className="mt-24 max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">How ChainTrack Works</h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-600 dark:bg-blue-500 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                1
              </div>
              <h3 className="text-xl font-semibold mb-2">Get Verified</h3>
              <p className="text-slate-600 dark:text-slate-400">
                Sign up with your business details and get verified as a B2B buyer.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-purple-600 dark:bg-purple-500 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                2
              </div>
              <h3 className="text-xl font-semibold mb-2">Browse Inventory</h3>
              <p className="text-slate-600 dark:text-slate-400">
                Access aggregated wholesale inventory from multiple trusted sources.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-green-600 dark:bg-green-500 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                3
              </div>
              <h3 className="text-xl font-semibold mb-2">Compare & Purchase</h3>
              <p className="text-slate-600 dark:text-slate-400">
                Compare prices, contact suppliers, and complete your wholesale purchases.
              </p>
            </div>
          </div>
        </div>

        {/* Global Market Coverage */}
        <div className="mt-24 max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">Global Market Coverage</h2>
          
          <div className="grid md:grid-cols-3 gap-6">
            <Card className="p-6 text-center">
              <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Building2 className="w-6 h-6 text-blue-600 dark:text-blue-400" />
              </div>
              <h3 className="text-lg font-semibold mb-2">United States</h3>
              <p className="text-sm text-slate-600 dark:text-slate-400">
                Access US market inventory with extensive iPhone and Samsung stock availability
              </p>
            </Card>

            <Card className="p-6 text-center">
              <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900/30 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Globe className="w-6 h-6 text-purple-600 dark:text-purple-400" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Japan</h3>
              <p className="text-sm text-slate-600 dark:text-slate-400">
                Premium Japan-sourced devices with high-quality grading standards
              </p>
            </Card>

            <Card className="p-6 text-center">
              <div className="w-12 h-12 bg-green-100 dark:bg-green-900/30 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Package className="w-6 h-6 text-green-600 dark:text-green-400" />
              </div>
              <h3 className="text-lg font-semibold mb-2">China</h3>
              <p className="text-sm text-slate-600 dark:text-slate-400">
                Competitive pricing on volume orders from China market sources
              </p>
            </Card>
          </div>
        </div>

        {/* Benefits for Buyers */}
        <div className="mt-24 max-w-4xl mx-auto">
          <Card className="p-8 bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-950/50 dark:to-purple-950/50 border-2">
            <h2 className="text-3xl font-bold text-center mb-8">Why Dubai Buyers Choose ChainTrack</h2>
            
            <div className="grid md:grid-cols-2 gap-6">
              <div className="flex gap-3">
                <CheckCircle2 className="w-6 h-6 text-green-600 dark:text-green-400 flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-semibold mb-1">Save Time</h3>
                  <p className="text-sm text-slate-600 dark:text-slate-400">
                    No more checking multiple platforms. Everything in one place.
                  </p>
                </div>
              </div>

              <div className="flex gap-3">
                <CheckCircle2 className="w-6 h-6 text-green-600 dark:text-green-400 flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-semibold mb-1">Best Prices</h3>
                  <p className="text-sm text-slate-600 dark:text-slate-400">
                    Instantly identify the lowest cost per unit across all sources.
                  </p>
                </div>
              </div>

              <div className="flex gap-3">
                <CheckCircle2 className="w-6 h-6 text-green-600 dark:text-green-400 flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-semibold mb-1">Quality Grades</h3>
                  <p className="text-sm text-slate-600 dark:text-slate-400">
                    Normalized grading system so you can compare apples to apples.
                  </p>
                </div>
              </div>

              <div className="flex gap-3">
                <CheckCircle2 className="w-6 h-6 text-green-600 dark:text-green-400 flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-semibold mb-1">No Stock Holdings</h3>
                  <p className="text-sm text-slate-600 dark:text-slate-400">
                    We aggregate inventory without holding physical stock.
                  </p>
                </div>
              </div>

              <div className="flex gap-3">
                <CheckCircle2 className="w-6 h-6 text-green-600 dark:text-green-400 flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-semibold mb-1">Verified Buyers Only</h3>
                  <p className="text-sm text-slate-600 dark:text-slate-400">
                    Exclusive access for verified resellers and retailers.
                  </p>
                </div>
              </div>

              <div className="flex gap-3">
                <CheckCircle2 className="w-6 h-6 text-green-600 dark:text-green-400 flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-semibold mb-1">Dubai-Focused</h3>
                  <p className="text-sm text-slate-600 dark:text-slate-400">
                    Tailored for the Dubai wholesale market with local support.
                  </p>
                </div>
              </div>
            </div>
          </Card>
        </div>

        {/* CTA Section */}
        <div className="mt-24 text-center max-w-2xl mx-auto">
          <h2 className="text-3xl font-bold mb-4">Ready to Get Started?</h2>
          <p className="text-lg text-slate-600 dark:text-slate-400 mb-8">
            Join verified buyers who are streamlining their wholesale phone purchasing with ChainTrack.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/signup">
              <Button size="lg" className="gap-2" data-testid="button-signup-cta">
                Request Buyer Access
                <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
            <Link href="/login">
              <Button size="lg" variant="outline" className="gap-2" data-testid="button-login-cta">
                Already a Member? Login
              </Button>
            </Link>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="border-t border-slate-200 dark:border-slate-800 bg-white/50 dark:bg-slate-900/50 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-12">
          <div className="text-center text-sm text-slate-600 dark:text-slate-400">
            <p className="mb-2">ChainTrack - B2B Wholesale Inventory Aggregation Platform</p>
            <p>Serving verified wholesale buyers in the Dubai market</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function ChainTrackDashboard() {
  const [searchQuery, setSearchQuery] = useState("");
  const [brandFilter, setBrandFilter] = useState("");
  const [gradeFilter, setGradeFilter] = useState("");
  const [sourceFilter, setSourceFilter] = useState("");

  const { data: inventory, isLoading } = useQuery<any[]>({
    queryKey: ['/api/chaintrack/inventory', { search: searchQuery, brand: brandFilter, grade: gradeFilter, sourceId: sourceFilter }],
    queryFn: async () => {
      const params = new URLSearchParams();
      if (searchQuery) params.append('search', searchQuery);
      if (brandFilter && brandFilter !== 'all') params.append('brand', brandFilter);
      if (gradeFilter && gradeFilter !== 'all') params.append('grade', gradeFilter);
      if (sourceFilter && sourceFilter !== 'all') params.append('sourceId', sourceFilter);
      
      const url = `/api/chaintrack/inventory${params.toString() ? `?${params.toString()}` : ''}`;
      const res = await fetch(url);
      if (!res.ok) throw new Error(`${res.status}: ${await res.text()}`);
      return res.json();
    },
  });

  const { data: sources } = useQuery<any[]>({
    queryKey: ['/api/chaintrack/sources'],
  });

  const uniqueBrands = inventory ? Array.from(new Set(inventory.map(item => item.brand))).sort() : [];
  const uniqueGrades = inventory ? Array.from(new Set(inventory.map(item => item.grade))).sort() : [];

  const formatPrice = (price: number, currency: string) => {
    const amount = price / 100;
    if (currency === "USD") return `$${amount.toFixed(2)}`;
    if (currency === "AED") return `AED ${amount.toFixed(2)}`;
    return `${currency} ${amount.toFixed(2)}`;
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-2">ChainTrack Inventory Dashboard</h1>
        <p className="text-muted-foreground">
          Wholesale phone inventory aggregated from multiple sources
        </p>
      </div>

      {/* Filters */}
      <Card className="p-6 mb-6">
        <h2 className="text-lg font-semibold mb-4">Search & Filter</h2>
        <div className="grid md:grid-cols-4 gap-4">
          <div>
            <Label htmlFor="search">Search</Label>
            <Input
              id="search"
              placeholder="Search model, brand..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              data-testid="input-search"
            />
          </div>
          <div>
            <Label htmlFor="brand">Brand</Label>
            <Select value={brandFilter} onValueChange={setBrandFilter}>
              <SelectTrigger id="brand" data-testid="select-brand">
                <SelectValue placeholder="All Brands" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Brands</SelectItem>
                {uniqueBrands.map((brand) => (
                  <SelectItem key={brand} value={brand}>{brand}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label htmlFor="grade">Grade</Label>
            <Select value={gradeFilter} onValueChange={setGradeFilter}>
              <SelectTrigger id="grade" data-testid="select-grade">
                <SelectValue placeholder="All Grades" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Grades</SelectItem>
                {uniqueGrades.map((grade) => (
                  <SelectItem key={grade} value={grade}>{grade}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label htmlFor="region">Region</Label>
            <Select value={sourceFilter} onValueChange={setSourceFilter}>
              <SelectTrigger id="region" data-testid="select-region">
                <SelectValue placeholder="All Regions" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Regions</SelectItem>
                {sources?.map((source) => (
                  <SelectItem key={source.id} value={source.id}>{source.region || 'Global'}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
      </Card>

      {/* Inventory Table */}
      <Card>
        <div className="p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold">Available Inventory</h2>
            <div className="text-sm text-muted-foreground">
              {inventory?.length || 0} items
            </div>
          </div>

          {isLoading ? (
            <div className="text-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
              <p className="mt-4 text-muted-foreground">Loading inventory...</p>
            </div>
          ) : inventory && inventory.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-3 px-4 font-semibold">Brand</th>
                    <th className="text-left py-3 px-4 font-semibold">Model</th>
                    <th className="text-left py-3 px-4 font-semibold">Storage</th>
                    <th className="text-left py-3 px-4 font-semibold">Grade</th>
                    <th className="text-left py-3 px-4 font-semibold">Qty</th>
                    <th className="text-left py-3 px-4 font-semibold">Price</th>
                    <th className="text-left py-3 px-4 font-semibold">Region</th>
                  </tr>
                </thead>
                <tbody>
                  {inventory.map((item) => (
                    <tr key={item.id} className="border-b hover:bg-muted/50" data-testid={`row-inventory-${item.id}`}>
                      <td className="py-3 px-4">{item.brand}</td>
                      <td className="py-3 px-4 font-medium">{item.model}</td>
                      <td className="py-3 px-4">{item.storage || '-'}</td>
                      <td className="py-3 px-4">
                        <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300">
                          {item.grade}
                        </span>
                      </td>
                      <td className="py-3 px-4">{item.availableQuantity}</td>
                      <td className="py-3 px-4 font-semibold">{formatPrice(item.price, item.currency)}</td>
                      <td className="py-3 px-4">
                        <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300">
                          {item.source?.region || 'Global'}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="text-center py-12">
              <Package className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">No Inventory Found</h3>
              <p className="text-muted-foreground">
                {searchQuery || brandFilter || gradeFilter || sourceFilter 
                  ? "Try adjusting your search filters."
                  : "Inventory data will appear here when uploaded."}
              </p>
            </div>
          )}
        </div>
      </Card>
    </div>
  );
}
