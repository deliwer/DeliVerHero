import { useQuery } from "@tanstack/react-query";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
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

  if (user) {
    return <ChainTrackDashboard />;
  }

  return <ChainTrackLanding />;
}

function ChainTrackLanding() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-slate-100 dark:from-slate-950 dark:via-blue-950 dark:to-slate-900">
      {/* Hero Section */}
      <div className="container mx-auto px-4 py-20">
        <div className="text-center max-w-4xl mx-auto">
          <div className="inline-flex items-center gap-2 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 px-4 py-2 rounded-full text-sm font-medium mb-6">
            <Globe className="w-4 h-4" />
            B2B Wholesale Inventory Platform
          </div>
          
          <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400 bg-clip-text text-transparent">
            ChainTrack
          </h1>
          
          <p className="text-xl md:text-2xl text-slate-700 dark:text-slate-300 mb-4">
            Aggregated Wholesale Phone Inventory for Dubai Buyers
          </p>
          
          <p className="text-lg text-slate-600 dark:text-slate-400 mb-8 max-w-2xl mx-auto">
            Access consolidated stock from WeSellCellular, GSMBid, and B2B Mobile Auction in one unified platform. 
            Compare prices, find the best deals, and streamline your wholesale purchasing.
          </p>

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

        {/* Features Grid */}
        <div className="grid md:grid-cols-3 gap-6 mt-20 max-w-5xl mx-auto">
          <Card className="p-6 border-2 hover:border-blue-500 dark:hover:border-blue-400 transition-colors">
            <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-lg flex items-center justify-center mb-4">
              <Package className="w-6 h-6 text-blue-600 dark:text-blue-400" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Unified Inventory</h3>
            <p className="text-slate-600 dark:text-slate-400">
              View stock from multiple suppliers in a single dashboard. No more switching between platforms.
            </p>
          </Card>

          <Card className="p-6 border-2 hover:border-blue-500 dark:hover:border-blue-400 transition-colors">
            <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900/30 rounded-lg flex items-center justify-center mb-4">
              <TrendingDown className="w-6 h-6 text-purple-600 dark:text-purple-400" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Price Comparison</h3>
            <p className="text-slate-600 dark:text-slate-400">
              Instantly compare prices across sources to find the best wholesale deals for your business.
            </p>
          </Card>

          <Card className="p-6 border-2 hover:border-blue-500 dark:hover:border-blue-400 transition-colors">
            <div className="w-12 h-12 bg-green-100 dark:bg-green-900/30 rounded-lg flex items-center justify-center mb-4">
              <BarChart3 className="w-6 h-6 text-green-600 dark:text-green-400" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Real-Time Updates</h3>
            <p className="text-slate-600 dark:text-slate-400">
              Get the latest inventory and pricing information from all connected sources.
            </p>
          </Card>
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

        {/* Inventory Sources */}
        <div className="mt-24 max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">Our Inventory Sources</h2>
          
          <div className="grid md:grid-cols-3 gap-6">
            <Card className="p-6 text-center">
              <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Building2 className="w-6 h-6 text-blue-600 dark:text-blue-400" />
              </div>
              <h3 className="text-lg font-semibold mb-2">WeSellCellular</h3>
              <p className="text-sm text-slate-600 dark:text-slate-400">
                US-based distributor with extensive iPhone and Samsung inventory
              </p>
            </Card>

            <Card className="p-6 text-center">
              <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900/30 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Zap className="w-6 h-6 text-purple-600 dark:text-purple-400" />
              </div>
              <h3 className="text-lg font-semibold mb-2">GSMBid</h3>
              <p className="text-sm text-slate-600 dark:text-slate-400">
                UAE auction platform with daily stock reports and competitive pricing
              </p>
            </Card>

            <Card className="p-6 text-center">
              <div className="w-12 h-12 bg-green-100 dark:bg-green-900/30 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Package className="w-6 h-6 text-green-600 dark:text-green-400" />
              </div>
              <h3 className="text-lg font-semibold mb-2">B2B Mobile Auction</h3>
              <p className="text-sm text-slate-600 dark:text-slate-400">
                Bulk lot auctions from US suppliers with volume discounts
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
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-2">ChainTrack Inventory Dashboard</h1>
        <p className="text-muted-foreground">
          Wholesale phone inventory aggregated from multiple sources
        </p>
      </div>

      <Card className="p-8 text-center">
        <Package className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
        <h2 className="text-2xl font-semibold mb-2">Inventory Dashboard Coming Soon</h2>
        <p className="text-muted-foreground mb-6">
          We're building the inventory dashboard with price comparison and filtering features.
        </p>
        <div className="grid md:grid-cols-3 gap-4 max-w-2xl mx-auto text-left">
          <div className="flex items-start gap-3">
            <Search className="w-5 h-5 text-blue-500 mt-1" />
            <div>
              <p className="font-medium">Search & Filter</p>
              <p className="text-sm text-muted-foreground">Find devices by model, brand, grade</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <TrendingDown className="w-5 h-5 text-green-500 mt-1" />
            <div>
              <p className="font-medium">Price Comparison</p>
              <p className="text-sm text-muted-foreground">Compare across all sources</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <BarChart3 className="w-5 h-5 text-purple-500 mt-1" />
            <div>
              <p className="font-medium">Live Updates</p>
              <p className="text-sm text-muted-foreground">Real-time inventory sync</p>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}
