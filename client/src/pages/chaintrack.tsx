import { useState } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Link } from "wouter";
import { User, ChaintrackAuction, ChaintrackBid, ChaintrackSupplier } from "@shared/schema";
import { queryClient, apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
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
  Gavel,
  Plus,
  TrendingUp,
  AlertCircle,
  X,
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
    if (user.userType === 'b2b_buyer' && user.isB2BVerified) {
      return <ChainTrackDashboard user={user} />;
    } else if (user.userType === 'b2b_buyer' && !user.isB2BVerified) {
      return <VerificationPending />;
    } else {
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
          If you're a wholesale buyer, please create a B2B account to access our reverse bidding platform.
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
            Dubai's Premier Mobile Sourcing Hub - Reverse Bidding Platform
          </p>
          
          <p className="text-lg text-slate-600 dark:text-slate-400 mb-6 max-w-2xl mx-auto">
            Post your wholesale needs, let suppliers compete with reverse bids. Access ASIS auction stock and ready-to-ship tested devices from US, Japan, and China.
          </p>
          
          <div className="bg-gradient-to-r from-purple-50 to-blue-50 dark:from-purple-950/30 dark:to-blue-950/30 border-2 border-purple-200 dark:border-purple-800 rounded-lg p-6 mb-8 max-w-2xl mx-auto">
            <div className="flex items-center justify-center gap-2 mb-3">
              <Gavel className="w-6 h-6 text-purple-600 dark:text-purple-400" />
              <h3 className="text-lg font-bold text-purple-900 dark:text-purple-100">Reverse Bidding System</h3>
            </div>
            <p className="text-sm text-purple-800 dark:text-purple-300">
              <strong>You post what you need.</strong> Verified suppliers compete by bidding down the price. You choose the best offer.
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

        {/* How Reverse Bidding Works */}
        <div className="mt-24 max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">How Reverse Bidding Works</h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-600 dark:bg-blue-500 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                1
              </div>
              <h3 className="text-xl font-semibold mb-2">Post Your Need</h3>
              <p className="text-slate-600 dark:text-slate-400">
                Create an auction with your device requirements, quantity, and target price.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-purple-600 dark:bg-purple-500 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                2
              </div>
              <h3 className="text-xl font-semibold mb-2">Suppliers Compete</h3>
              <p className="text-slate-600 dark:text-slate-400">
                Verified suppliers place bids, competing to offer you the best price.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-green-600 dark:bg-green-500 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                3
              </div>
              <h3 className="text-xl font-semibold mb-2">Accept & Purchase</h3>
              <p className="text-slate-600 dark:text-slate-400">
                Review bids, accept the best offer, and complete your purchase.
              </p>
            </div>
          </div>
        </div>

        {/* Membership Tiers */}
        <div className="mt-24 max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">Membership Tiers</h2>
            <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
              Choose the tier that matches your monthly volume. All tiers include access to our reverse bidding platform.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="p-6 border-2 hover:border-blue-500 dark:hover:border-blue-400 transition-all">
              <div className="text-center mb-4">
                <h3 className="text-2xl font-bold mb-2">On-Demand</h3>
                <div className="text-3xl font-bold text-blue-600 dark:text-blue-400 mb-1">FREE</div>
                <p className="text-sm text-slate-500 dark:text-slate-400">0-49 devices/month</p>
              </div>
              <div className="space-y-3 mb-6">
                <div className="flex items-start gap-2">
                  <CheckCircle2 className="w-5 h-5 text-green-600 dark:text-green-400 flex-shrink-0 mt-0.5" />
                  <span className="text-sm">Ready-to-Ship Stock</span>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle2 className="w-5 h-5 text-green-600 dark:text-green-400 flex-shrink-0 mt-0.5" />
                  <span className="text-sm">0.5% transaction fee</span>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle2 className="w-5 h-5 text-green-600 dark:text-green-400 flex-shrink-0 mt-0.5" />
                  <span className="text-sm">$500 minimum/month</span>
                </div>
              </div>
              <Button variant="outline" className="w-full" data-testid="button-tier-ondemand">
                Start Free
              </Button>
            </Card>

            <Card className="p-6 border-2 border-purple-500 dark:border-purple-400 relative">
              <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                <Badge className="bg-purple-500">MOST POPULAR</Badge>
              </div>
              <div className="text-center mb-4">
                <h3 className="text-2xl font-bold mb-2">Starter</h3>
                <div className="text-3xl font-bold text-purple-600 dark:text-purple-400 mb-1">50+</div>
                <p className="text-sm text-slate-500 dark:text-slate-400">devices/month</p>
              </div>
              <div className="space-y-3 mb-6">
                <div className="flex items-start gap-2">
                  <CheckCircle2 className="w-5 h-5 text-green-600 dark:text-green-400 flex-shrink-0 mt-0.5" />
                  <span className="text-sm font-semibold">ASIS Auction Access</span>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle2 className="w-5 h-5 text-green-600 dark:text-green-400 flex-shrink-0 mt-0.5" />
                  <span className="text-sm">0.3% on ASIS stock</span>
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
                  <span className="text-sm">0.25% on ASIS stock</span>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle2 className="w-5 h-5 text-green-600 dark:text-green-400 flex-shrink-0 mt-0.5" />
                  <span className="text-sm">Account manager</span>
                </div>
              </div>
              <Button variant="outline" className="w-full" data-testid="button-tier-growth">
                Contact Sales
              </Button>
            </Card>

            <Card className="p-6 border-2 border-amber-500 dark:border-amber-400">
              <div className="text-center mb-4">
                <div className="flex items-center justify-center gap-1 mb-2">
                  <Star className="w-5 h-5 text-amber-500" />
                  <h3 className="text-2xl font-bold">Enterprise</h3>
                </div>
                <div className="text-3xl font-bold text-amber-600 dark:text-amber-400 mb-1">500+</div>
                <p className="text-sm text-slate-500 dark:text-slate-400">devices/month</p>
              </div>
              <div className="space-y-3 mb-6">
                <div className="flex items-start gap-2">
                  <CheckCircle2 className="w-5 h-5 text-green-600 dark:text-green-400 flex-shrink-0 mt-0.5" />
                  <span className="text-sm font-semibold">Custom rates</span>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle2 className="w-5 h-5 text-green-600 dark:text-green-400 flex-shrink-0 mt-0.5" />
                  <span className="text-sm">API integration</span>
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
        </div>

        {/* CTA */}
        <div className="mt-24 text-center max-w-2xl mx-auto">
          <h2 className="text-3xl font-bold mb-4">Ready to Get Started?</h2>
          <p className="text-lg text-slate-600 dark:text-slate-400 mb-8">
            Join verified buyers using reverse bidding to source wholesale phones at the best prices.
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
    </div>
  );
}

function ChainTrackDashboard({ user }: { user: User }) {
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2 flex items-center gap-3">
            <Gavel className="w-10 h-10 text-purple-600" />
            ChainTrack Reverse Bidding
          </h1>
          <p className="text-muted-foreground">
            Post your wholesale needs and let suppliers compete with the best prices
          </p>
        </div>

        <Tabs defaultValue="auctions" className="space-y-6">
          <TabsList>
            <TabsTrigger value="auctions" data-testid="tab-auctions">
              <Gavel className="w-4 h-4 mr-2" />
              All Auctions
            </TabsTrigger>
            <TabsTrigger value="my-auctions" data-testid="tab-my-auctions">
              <Package className="w-4 h-4 mr-2" />
              My Auctions
            </TabsTrigger>
            <TabsTrigger value="create" data-testid="tab-create">
              <Plus className="w-4 h-4 mr-2" />
              Create Auction
            </TabsTrigger>
          </TabsList>

          <TabsContent value="auctions">
            <AllAuctionsView />
          </TabsContent>

          <TabsContent value="my-auctions">
            <MyAuctionsView userId={user.id} />
          </TabsContent>

          <TabsContent value="create">
            <CreateAuctionView userId={user.id} />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}

function AllAuctionsView() {
  const { data: auctions, isLoading } = useQuery<ChaintrackAuction[]>({
    queryKey: ['/api/chaintrack/auctions'],
  });

  const activeAuctions = auctions?.filter(a => a.status === 'active') || [];

  if (isLoading) {
    return (
      <div className="text-center py-12">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
        <p className="mt-4 text-muted-foreground">Loading auctions...</p>
      </div>
    );
  }

  if (activeAuctions.length === 0) {
    return (
      <Card className="p-12 text-center">
        <Gavel className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
        <h3 className="text-xl font-semibold mb-2">No Active Auctions</h3>
        <p className="text-muted-foreground">
          Be the first to create an auction and get suppliers competing for your business!
        </p>
      </Card>
    );
  }

  return (
    <div className="grid gap-6">
      {activeAuctions.map((auction) => (
        <AuctionCard key={auction.id} auction={auction} />
      ))}
    </div>
  );
}

function MyAuctionsView({ userId }: { userId: string }) {
  const { data: auctions, isLoading } = useQuery<ChaintrackAuction[]>({
    queryKey: ['/api/chaintrack/auctions', { buyerId: userId }],
  });

  if (isLoading) {
    return (
      <div className="text-center py-12">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
        <p className="mt-4 text-muted-foreground">Loading your auctions...</p>
      </div>
    );
  }

  if (!auctions || auctions.length === 0) {
    return (
      <Card className="p-12 text-center">
        <Package className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
        <h3 className="text-xl font-semibold mb-2">No Auctions Yet</h3>
        <p className="text-muted-foreground mb-4">
          Create your first auction to start receiving competitive bids from suppliers.
        </p>
      </Card>
    );
  }

  return (
    <div className="grid gap-6">
      {auctions.map((auction) => (
        <MyAuctionCard key={auction.id} auction={auction} />
      ))}
    </div>
  );
}

function AuctionCard({ auction }: { auction: ChaintrackAuction }) {
  const [showBidDialog, setShowBidDialog] = useState(false);
  const { data: bids } = useQuery<ChaintrackBid[]>({
    queryKey: ['/api/chaintrack/bids', { auctionId: auction.id }],
  });

  const lowestBid = bids?.length ? Math.min(...bids.map(b => b.bidPrice)) : null;
  const bidCount = bids?.length || 0;

  return (
    <Card className="p-6 hover:shadow-lg transition-shadow">
      <div className="flex justify-between items-start mb-4">
        <div className="flex-1">
          <h3 className="text-xl font-bold mb-2">{auction.deviceModel}</h3>
          <div className="flex flex-wrap gap-2 mb-3">
            <Badge variant="outline">{auction.deviceBrand}</Badge>
            <Badge variant="outline">{auction.storage || 'Any'}</Badge>
            <Badge variant="outline">{auction.condition}</Badge>
            <Badge variant="outline">{auction.quantity} units</Badge>
          </div>
          {auction.notes && (
            <p className="text-sm text-muted-foreground">{auction.notes}</p>
          )}
        </div>
        <div className="text-right ml-4">
          <div className="text-sm text-muted-foreground mb-1">Target Price</div>
          <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">
            ${(auction.targetPrice / 100).toFixed(2)}
          </div>
        </div>
      </div>

      <div className="flex items-center justify-between pt-4 border-t">
        <div className="flex gap-4 text-sm">
          <div className="flex items-center gap-1">
            <TrendingDown className="w-4 h-4 text-green-600" />
            <span>{bidCount} bid{bidCount !== 1 ? 's' : ''}</span>
          </div>
          {lowestBid && (
            <div className="flex items-center gap-1">
              <DollarSign className="w-4 h-4 text-purple-600" />
              <span className="font-semibold">${(lowestBid / 100).toFixed(2)} lowest</span>
            </div>
          )}
          <div className="flex items-center gap-1">
            <Clock className="w-4 h-4 text-slate-600" />
            <span>Ends {new Date(auction.auctionEndDate).toLocaleDateString()}</span>
          </div>
        </div>
        <Dialog open={showBidDialog} onOpenChange={setShowBidDialog}>
          <DialogTrigger asChild>
            <Button data-testid={`button-place-bid-${auction.id}`}>
              <Gavel className="w-4 h-4 mr-2" />
              Place Bid
            </Button>
          </DialogTrigger>
          <DialogContent>
            <PlaceBidForm auction={auction} onSuccess={() => setShowBidDialog(false)} />
          </DialogContent>
        </Dialog>
      </div>
    </Card>
  );
}

function MyAuctionCard({ auction }: { auction: ChaintrackAuction }) {
  const { data: bids } = useQuery<ChaintrackBid[]>({
    queryKey: ['/api/chaintrack/bids', { auctionId: auction.id }],
  });

  const activeBids = bids?.filter(b => b.status === 'active') || [];
  const winningBid = activeBids.length > 0 ? activeBids.reduce((min, bid) => 
    bid.bidPrice < min.bidPrice ? bid : min
  ) : null;

  const statusColors = {
    active: 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300',
    closed: 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300',
    completed: 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300',
  };

  return (
    <Card className="p-6">
      <div className="flex justify-between items-start mb-4">
        <div className="flex-1">
          <div className="flex items-center gap-3 mb-2">
            <h3 className="text-xl font-bold">{auction.deviceModel}</h3>
            <Badge className={statusColors[auction.status as keyof typeof statusColors]}>
              {auction.status}
            </Badge>
          </div>
          <div className="flex flex-wrap gap-2 mb-3">
            <Badge variant="outline">{auction.deviceBrand}</Badge>
            <Badge variant="outline">{auction.storage || 'Any'}</Badge>
            <Badge variant="outline">{auction.condition}</Badge>
            <Badge variant="outline">{auction.quantity} units</Badge>
          </div>
        </div>
        <div className="text-right ml-4">
          <div className="text-sm text-muted-foreground mb-1">Target Price</div>
          <div className="text-2xl font-bold">${(auction.targetPrice / 100).toFixed(2)}</div>
        </div>
      </div>

      {activeBids.length > 0 && (
        <div className="mb-4 p-4 bg-slate-50 dark:bg-slate-900 rounded-lg">
          <h4 className="font-semibold mb-3 flex items-center gap-2">
            <TrendingDown className="w-4 h-4" />
            Active Bids ({activeBids.length})
          </h4>
          <div className="space-y-2">
            {activeBids.slice(0, 3).map((bid) => (
              <BidItem key={bid.id} bid={bid} auctionId={auction.id} buyerId={auction.buyerId} />
            ))}
          </div>
        </div>
      )}

      {auction.status === 'active' && activeBids.length === 0 && (
        <div className="text-center py-4 bg-slate-50 dark:bg-slate-900 rounded-lg">
          <AlertCircle className="w-8 h-8 text-muted-foreground mx-auto mb-2" />
          <p className="text-sm text-muted-foreground">No bids yet. Share this auction with suppliers!</p>
        </div>
      )}
    </Card>
  );
}

function BidItem({ bid, auctionId, buyerId }: { bid: ChaintrackBid; auctionId: string; buyerId: string }) {
  const { toast } = useToast();
  const { data: supplier } = useQuery<ChaintrackSupplier>({
    queryKey: ['/api/chaintrack/suppliers', bid.supplierId],
  });

  const acceptBidMutation = useMutation({
    mutationFn: async () => {
      return apiRequest(`/api/chaintrack/bids/${bid.id}/accept`, {
        method: 'POST',
        body: JSON.stringify({ buyerId }),
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/chaintrack/bids'] });
      queryClient.invalidateQueries({ queryKey: ['/api/chaintrack/auctions'] });
      toast({ title: "Success", description: "Bid accepted successfully!" });
    },
    onError: (error: any) => {
      toast({ 
        title: "Error", 
        description: error.message || "Failed to accept bid", 
        variant: "destructive" 
      });
    },
  });

  const rejectBidMutation = useMutation({
    mutationFn: async () => {
      return apiRequest(`/api/chaintrack/bids/${bid.id}/reject`, {
        method: 'POST',
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/chaintrack/bids'] });
      toast({ title: "Success", description: "Bid rejected" });
    },
  });

  return (
    <div className="flex items-center justify-between p-3 bg-white dark:bg-slate-800 rounded border">
      <div className="flex-1">
        <div className="flex items-center gap-2 mb-1">
          <span className="font-semibold">${(bid.bidPrice / 100).toFixed(2)}</span>
          <span className="text-xs text-muted-foreground">per unit</span>
          {bid.isWinning && (
            <Badge className="bg-green-600 text-white">Lowest Bid</Badge>
          )}
        </div>
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Users className="w-3 h-3" />
          <span>{supplier?.companyName || 'Loading...'}</span>
          {supplier?.verificationStatus === 'verified' && (
            <CheckCircle2 className="w-3 h-3 text-green-600" />
          )}
        </div>
        {bid.notes && (
          <p className="text-xs text-muted-foreground mt-1">{bid.notes}</p>
        )}
      </div>
      <div className="flex gap-2 ml-4">
        <Button 
          size="sm" 
          variant="outline"
          onClick={() => rejectBidMutation.mutate()}
          disabled={rejectBidMutation.isPending}
          data-testid={`button-reject-bid-${bid.id}`}
        >
          <X className="w-4 h-4" />
        </Button>
        <Button 
          size="sm"
          onClick={() => acceptBidMutation.mutate()}
          disabled={acceptBidMutation.isPending}
          data-testid={`button-accept-bid-${bid.id}`}
        >
          <CheckCircle2 className="w-4 h-4 mr-1" />
          Accept
        </Button>
      </div>
    </div>
  );
}

function PlaceBidForm({ auction, onSuccess }: { auction: ChaintrackAuction; onSuccess: () => void }) {
  const [bidPrice, setBidPrice] = useState('');
  const [quantity, setQuantity] = useState(auction.quantity.toString());
  const [notes, setNotes] = useState('');
  const { toast } = useToast();

  const placeBidMutation = useMutation({
    mutationFn: async () => {
      return apiRequest('/api/chaintrack/bids', {
        method: 'POST',
        body: JSON.stringify({
          auctionId: auction.id,
          supplierId: 'temp-supplier-id', // This should come from the user's supplier profile
          bidPrice: Math.round(parseFloat(bidPrice) * 100),
          quantity: parseInt(quantity),
          deliveryTimeframe: '7-10 days',
          notes,
          status: 'active',
        }),
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/chaintrack/bids'] });
      queryClient.invalidateQueries({ queryKey: ['/api/chaintrack/auctions'] });
      toast({ title: "Success", description: "Bid placed successfully!" });
      onSuccess();
    },
    onError: (error: any) => {
      toast({ 
        title: "Error", 
        description: error.message || "Failed to place bid", 
        variant: "destructive" 
      });
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!bidPrice || parseFloat(bidPrice) <= 0) {
      toast({ title: "Error", description: "Please enter a valid bid price", variant: "destructive" });
      return;
    }
    placeBidMutation.mutate();
  };

  return (
    <div>
      <DialogHeader>
        <DialogTitle>Place Your Bid</DialogTitle>
      </DialogHeader>
      <form onSubmit={handleSubmit} className="space-y-4 mt-4">
        <div>
          <Label htmlFor="bid-price">Bid Price (per unit)</Label>
          <div className="relative">
            <DollarSign className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input
              id="bid-price"
              type="number"
              step="0.01"
              value={bidPrice}
              onChange={(e) => setBidPrice(e.target.value)}
              className="pl-9"
              placeholder="0.00"
              data-testid="input-bid-price"
            />
          </div>
          <p className="text-xs text-muted-foreground mt-1">
            Target price: ${(auction.targetPrice / 100).toFixed(2)}
          </p>
        </div>

        <div>
          <Label htmlFor="quantity">Quantity</Label>
          <Input
            id="quantity"
            type="number"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
            data-testid="input-bid-quantity"
          />
        </div>

        <div>
          <Label htmlFor="notes">Notes (Optional)</Label>
          <Textarea
            id="notes"
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            placeholder="Additional information about your offer..."
            data-testid="textarea-bid-notes"
          />
        </div>

        {bidPrice && quantity && (
          <div className="p-4 bg-slate-50 dark:bg-slate-900 rounded-lg">
            <div className="text-sm text-muted-foreground mb-1">Total Bid Amount</div>
            <div className="text-2xl font-bold text-purple-600 dark:text-purple-400">
              ${(parseFloat(bidPrice) * parseInt(quantity)).toFixed(2)}
            </div>
          </div>
        )}

        <Button 
          type="submit" 
          className="w-full" 
          disabled={placeBidMutation.isPending}
          data-testid="button-submit-bid"
        >
          {placeBidMutation.isPending ? "Placing Bid..." : "Place Bid"}
        </Button>
      </form>
    </div>
  );
}

function CreateAuctionView({ userId }: { userId: string }) {
  const [formData, setFormData] = useState({
    deviceBrand: '',
    deviceModel: '',
    storage: '',
    condition: '',
    quantity: '',
    targetPrice: '',
    auctionEndDate: '',
    notes: '',
  });
  const { toast } = useToast();

  const createAuctionMutation = useMutation({
    mutationFn: async () => {
      return apiRequest('/api/chaintrack/auctions', {
        method: 'POST',
        body: JSON.stringify({
          buyerId: userId,
          deviceBrand: formData.deviceBrand,
          deviceModel: formData.deviceModel,
          storage: formData.storage || null,
          condition: formData.condition,
          quantity: parseInt(formData.quantity),
          targetPrice: Math.round(parseFloat(formData.targetPrice) * 100),
          auctionEndDate: new Date(formData.auctionEndDate),
          notes: formData.notes || null,
          status: 'active',
        }),
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/chaintrack/auctions'] });
      toast({ title: "Success", description: "Auction created successfully!" });
      setFormData({
        deviceBrand: '',
        deviceModel: '',
        storage: '',
        condition: '',
        quantity: '',
        targetPrice: '',
        auctionEndDate: '',
        notes: '',
      });
    },
    onError: (error: any) => {
      toast({ 
        title: "Error", 
        description: error.message || "Failed to create auction", 
        variant: "destructive" 
      });
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    createAuctionMutation.mutate();
  };

  return (
    <Card className="p-6 max-w-2xl mx-auto">
      <h2 className="text-2xl font-bold mb-6">Create New Auction</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="brand">Device Brand *</Label>
            <Select value={formData.deviceBrand} onValueChange={(v) => setFormData({...formData, deviceBrand: v})}>
              <SelectTrigger id="brand" data-testid="select-brand">
                <SelectValue placeholder="Select brand" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Apple">Apple</SelectItem>
                <SelectItem value="Samsung">Samsung</SelectItem>
                <SelectItem value="Google">Google</SelectItem>
                <SelectItem value="OnePlus">OnePlus</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label htmlFor="model">Device Model *</Label>
            <Input
              id="model"
              value={formData.deviceModel}
              onChange={(e) => setFormData({...formData, deviceModel: e.target.value})}
              placeholder="e.g., iPhone 15 Pro Max"
              data-testid="input-model"
            />
          </div>

          <div>
            <Label htmlFor="storage">Storage</Label>
            <Select value={formData.storage} onValueChange={(v) => setFormData({...formData, storage: v})}>
              <SelectTrigger id="storage" data-testid="select-storage">
                <SelectValue placeholder="Select storage" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="64GB">64GB</SelectItem>
                <SelectItem value="128GB">128GB</SelectItem>
                <SelectItem value="256GB">256GB</SelectItem>
                <SelectItem value="512GB">512GB</SelectItem>
                <SelectItem value="1TB">1TB</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label htmlFor="condition">Condition *</Label>
            <Select value={formData.condition} onValueChange={(v) => setFormData({...formData, condition: v})}>
              <SelectTrigger id="condition" data-testid="select-condition">
                <SelectValue placeholder="Select condition" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="New">New</SelectItem>
                <SelectItem value="Excellent">Excellent</SelectItem>
                <SelectItem value="Good">Good</SelectItem>
                <SelectItem value="Fair">Fair</SelectItem>
                <SelectItem value="ASIS">ASIS (As-Is)</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label htmlFor="quantity">Quantity *</Label>
            <Input
              id="quantity"
              type="number"
              value={formData.quantity}
              onChange={(e) => setFormData({...formData, quantity: e.target.value})}
              placeholder="Number of units"
              data-testid="input-quantity"
            />
          </div>

          <div>
            <Label htmlFor="targetPrice">Target Price (per unit) *</Label>
            <div className="relative">
              <DollarSign className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                id="targetPrice"
                type="number"
                step="0.01"
                value={formData.targetPrice}
                onChange={(e) => setFormData({...formData, targetPrice: e.target.value})}
                className="pl-9"
                placeholder="0.00"
                data-testid="input-target-price"
              />
            </div>
          </div>

          <div>
            <Label htmlFor="endDate">Auction End Date *</Label>
            <Input
              id="endDate"
              type="date"
              value={formData.auctionEndDate}
              onChange={(e) => setFormData({...formData, auctionEndDate: e.target.value})}
              data-testid="input-end-date"
            />
          </div>
        </div>

        <div>
          <Label htmlFor="notes">Additional Requirements</Label>
          <Textarea
            id="notes"
            value={formData.notes}
            onChange={(e) => setFormData({...formData, notes: e.target.value})}
            placeholder="Specify any additional requirements, packaging needs, shipping preferences..."
            rows={4}
            data-testid="textarea-notes"
          />
        </div>

        {formData.targetPrice && formData.quantity && (
          <div className="p-4 bg-blue-50 dark:bg-blue-950/30 rounded-lg border border-blue-200 dark:border-blue-800">
            <div className="text-sm text-blue-800 dark:text-blue-300 mb-1">Estimated Total Value</div>
            <div className="text-3xl font-bold text-blue-600 dark:text-blue-400">
              ${(parseFloat(formData.targetPrice) * parseInt(formData.quantity)).toFixed(2)}
            </div>
          </div>
        )}

        <Button 
          type="submit" 
          className="w-full" 
          size="lg"
          disabled={createAuctionMutation.isPending}
          data-testid="button-create-auction"
        >
          {createAuctionMutation.isPending ? "Creating Auction..." : "Create Auction"}
        </Button>
      </form>
    </Card>
  );
}
