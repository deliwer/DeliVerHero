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
import { RewardComparison } from "@/components/reward-comparison";
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
  MapPin, 
  RefreshCw, 
  ShoppingCart, 
  Warehouse, 
  Recycle, 
  ChevronDown, 
  ChevronUp, 
  Coins 
} from "lucide-react";
import { SiLinkedin, SiFacebook, SiInstagram } from "react-icons/si";
import heroImage from '@assets/stock_images/business_professiona_0d25c8b9.jpg';
import warehouseImage from '@assets/stock_images/modern_warehouse_ful_49a92694.jpg';

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

  // Verified B2B buyers get the dashboard
  if (user?.userType === 'b2b_buyer' && user?.isB2BVerified) {
    return <ChainTrackDashboard user={user} />;
  }
  
  // Unverified B2B buyers see verification pending
  if (user?.userType === 'b2b_buyer' && !user?.isB2BVerified) {
    return <VerificationPending />;
  }

  // Everyone else (unauthenticated users, consumer users) sees the public landing page
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

function B2BPricingCalculator() {
  const [deviceModel, setDeviceModel] = useState("iPhone 17 Pro Max 256GB");
  const [condition, setCondition] = useState("Excellent");
  const [quantity, setQuantity] = useState(50);
  const [sourceCountry, setSourceCountry] = useState("India");
  const [memberTier, setMemberTier] = useState("starter");

  const basePrice = 485;
  const rodtepRebate = sourceCountry === "India" ? basePrice * 0.02 : 0;
  const commissionRate = memberTier === "ondemand" ? 0.005 : memberTier === "starter" ? 0.003 : memberTier === "growth" ? 0.0025 : 0.002;
  const commission = basePrice * quantity * commissionRate;
  const complianceFeePerUnit = 2.00;
  const complianceFees = complianceFeePerUnit * quantity;
  const totalCost = (basePrice * quantity) - rodtepRebate + commission + complianceFees;
  const pricePerUnit = totalCost / quantity;

  return (
    <Card className="p-8 bg-white dark:bg-slate-900" data-testid="b2b-calculator">
      <h3 className="text-2xl font-bold mb-6">B2B Wholesale Pricing Calculator</h3>
      
      <div className="grid md:grid-cols-2 gap-6 mb-8">
        <div>
          <Label>Device Model</Label>
          <Select value={deviceModel} onValueChange={setDeviceModel}>
            <SelectTrigger data-testid="select-calc-device">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="iPhone 17 Pro Max 512GB">iPhone 17 Pro Max 512GB</SelectItem>
              <SelectItem value="iPhone 17 Pro 256GB">iPhone 17 Pro 256GB</SelectItem>
              <SelectItem value="iPhone 17 Plus 256GB">iPhone 17 Plus 256GB</SelectItem>
              <SelectItem value="iPhone 17 128GB">iPhone 17 128GB</SelectItem>
              <SelectItem value="iPhone 16 Pro Max 512GB">iPhone 16 Pro Max 512GB</SelectItem>
              <SelectItem value="iPhone 15 Pro Max 512GB">iPhone 15 Pro Max 512GB</SelectItem>
              <SelectItem value="iPhone 15 Pro 256GB">iPhone 15 Pro 256GB</SelectItem>
              <SelectItem value="iPhone 14 Pro Max 256GB">iPhone 14 Pro Max 256GB</SelectItem>
              <SelectItem value="iPhone 13 Pro 256GB">iPhone 13 Pro 256GB</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div>
          <Label>Condition</Label>
          <Select value={condition} onValueChange={setCondition}>
            <SelectTrigger data-testid="select-calc-condition">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="New">New</SelectItem>
              <SelectItem value="Excellent">Excellent (A-Grade)</SelectItem>
              <SelectItem value="Good">Good (B-Grade)</SelectItem>
              <SelectItem value="ASIS">ASIS (As-Is)</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div>
          <Label>Quantity</Label>
          <Input
            type="number"
            value={quantity}
            onChange={(e) => setQuantity(parseInt(e.target.value) || 50)}
            min="1"
            data-testid="input-calc-quantity"
          />
        </div>

        <div>
          <Label>Source Country</Label>
          <Select value={sourceCountry} onValueChange={setSourceCountry}>
            <SelectTrigger data-testid="select-calc-country">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="India">🇮🇳 India (RODTEP 2%)</SelectItem>
              <SelectItem value="US">🇺🇸 United States</SelectItem>
              <SelectItem value="Japan">🇯🇵 Japan</SelectItem>
              <SelectItem value="China">🇨🇳 China</SelectItem>
              <SelectItem value="Europe">🇪🇺 Europe</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="md:col-span-2">
          <Label>Membership Tier</Label>
          <Select value={memberTier} onValueChange={setMemberTier}>
            <SelectTrigger data-testid="select-calc-tier">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="ondemand">On-Demand (0.5% fee)</SelectItem>
              <SelectItem value="starter">Starter (0.3% fee)</SelectItem>
              <SelectItem value="growth">Growth (0.25% fee)</SelectItem>
              <SelectItem value="enterprise">Enterprise (0.2% fee)</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-950/20 dark:to-purple-950/20 rounded-lg p-6 border-2 border-blue-200 dark:border-blue-800">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
          <div>
            <div className="text-sm text-slate-600 dark:text-slate-400">Base Price/Unit</div>
            <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">${basePrice}</div>
          </div>
          <div>
            <div className="text-sm text-slate-600 dark:text-slate-400">RODTEP Rebate</div>
            <div className="text-2xl font-bold text-green-600 dark:text-green-400">-${rodtepRebate.toFixed(2)}</div>
          </div>
          <div>
            <div className="text-sm text-slate-600 dark:text-slate-400">Platform Fee</div>
            <div className="text-2xl font-bold text-orange-600 dark:text-orange-400">${commission.toFixed(2)}</div>
          </div>
          <div>
            <div className="text-sm text-slate-600 dark:text-slate-400">Compliance Fees</div>
            <div className="text-2xl font-bold text-purple-600 dark:text-purple-400">${complianceFees.toFixed(2)}</div>
            <div className="text-xs text-slate-500 dark:text-slate-400">AML/KYC + Regulatory</div>
          </div>
        </div>

        <div className="border-t border-slate-300 dark:border-slate-700 pt-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-lg font-semibold">Total Cost ({quantity} units)</span>
            <span className="text-3xl font-bold text-purple-600 dark:text-purple-400">${totalCost.toFixed(2)}</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm text-slate-600 dark:text-slate-400">Price per Unit</span>
            <span className="text-xl font-bold text-slate-700 dark:text-slate-300">${pricePerUnit.toFixed(2)}</span>
          </div>
        </div>

        <div className="mt-6 flex gap-3">
          <Link href="/signup" className="flex-1">
            <Button className="w-full bg-purple-600 hover:bg-purple-700" data-testid="button-calc-signup">
              Request B2B Access
            </Button>
          </Link>
          <Button variant="outline" className="flex-1" data-testid="button-calc-contact">
            Contact Sales
          </Button>
        </div>
      </div>

      <div className="mt-6 text-center text-sm text-slate-500 dark:text-slate-400">
        <p>💡 Prices shown are estimates. Final pricing depends on real-time market conditions and reverse bidding results.</p>
      </div>
    </Card>
  );
}

function DemoDashboardPreview() {
  const [activeTab, setActiveTab] = useState("discover");

  const sampleAuctions = [
    {
      id: "demo-1",
      device: "Refurbished iPhone 15 Pro Max",
      category: "Preowned Mobile",
      quantity: 100,
      targetPrice: 485,
      currentBestBid: 475,
      bidsCount: 12,
      timeRemaining: "2 days",
      sourceCountry: "UAE"
    },
    {
      id: "demo-2",
      device: "Refurbished Samsung S24 Ultra",
      category: "Preowned Mobile",
      quantity: 150,
      targetPrice: 425,
      currentBestBid: 415,
      bidsCount: 9,
      timeRemaining: "18 hours",
      sourceCountry: "Japan"
    },
    {
      id: "demo-3",
      device: "Premium Reconditioned Coffee Machines",
      category: "Household Goods",
      quantity: 200,
      targetPrice: 450,
      currentBestBid: 438,
      bidsCount: 15,
      timeRemaining: "5 hours",
      sourceCountry: "USA"
    },
    {
      id: "demo-4",
      device: "Eco-Friendly Refurbished Home Appliances",
      category: "Household Goods",
      quantity: 250,
      targetPrice: 380,
      currentBestBid: 372,
      bidsCount: 18,
      timeRemaining: "3 days",
      sourceCountry: "India"
    }
  ];

  return (
    <div className="space-y-6" data-testid="demo-dashboard">
      <div className="bg-gradient-to-r from-purple-500 to-blue-500 text-white rounded-lg p-6">
        <h2 className="text-2xl font-bold mb-2">Welcome to ChainTrack Demo</h2>
        <p className="opacity-90">This is a sample view of our B2B wholesale platform. Real data is available after verification.</p>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="discover">Discover</TabsTrigger>
          <TabsTrigger value="mybids">My Bids</TabsTrigger>
          <TabsTrigger value="compliance">Compliance</TabsTrigger>
        </TabsList>

        <TabsContent value="discover" className="space-y-4 mt-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold">Active Auctions</h3>
            <Badge className="bg-green-500">Live</Badge>
          </div>

          {sampleAuctions.map((auction) => (
            <Card key={auction.id} className="p-6 hover:shadow-lg transition-shadow border-2">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <Recycle className="w-5 h-5 text-emerald-500" />
                    <h4 className="font-bold text-lg">{auction.device}</h4>
                    <Badge variant="outline" className="bg-emerald-500/10 text-emerald-600 border-emerald-500/20">{auction.category}</Badge>
                    <Badge variant="outline">{auction.sourceCountry}</Badge>
                  </div>
                  <p className="text-sm text-slate-600 dark:text-slate-400">{auction.quantity} units</p>
                </div>
                <div className="text-right">
                  <div className="text-sm text-slate-600 dark:text-slate-400">Best Bid</div>
                  <div className="text-2xl font-bold text-green-600 dark:text-green-400">${auction.currentBestBid}</div>
                  <div className="text-xs text-slate-500">Target: ${auction.targetPrice}</div>
                </div>
              </div>

              <div className="flex items-center gap-6 text-sm mb-4">
                <div className="flex items-center gap-1">
                  <Users className="w-4 h-4 text-purple-600" />
                  <span>{auction.bidsCount} bids</span>
                </div>
                <div className="flex items-center gap-1">
                  <Clock className="w-4 h-4 text-orange-600" />
                  <span>{auction.timeRemaining} left</span>
                </div>
              </div>

              <Button className="w-full" disabled data-testid={`button-demo-bid-${auction.id}`}>
                <Shield className="w-4 h-4 mr-2" />
                Place Bid (Requires Verification)
              </Button>
            </Card>
          ))}
        </TabsContent>

        <TabsContent value="mybids" className="mt-6">
          <Card className="p-8 text-center">
            <Gavel className="w-12 h-12 text-slate-400 mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">No Active Bids</h3>
            <p className="text-slate-600 dark:text-slate-400 mb-4">
              Your active bids will appear here after verification
            </p>
          </Card>
        </TabsContent>

        <TabsContent value="compliance" className="mt-6">
          <Card className="p-6">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 bg-amber-100 dark:bg-amber-900/30 rounded-full flex items-center justify-center">
                <Shield className="w-6 h-6 text-amber-600 dark:text-amber-400" />
              </div>
              <div>
                <h3 className="font-bold text-lg">Compliance Center</h3>
                <p className="text-sm text-slate-600 dark:text-slate-400">KYC/AML verification required</p>
              </div>
            </div>

            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 bg-slate-50 dark:bg-slate-800 rounded">
                <span>Business License</span>
                <Badge variant="outline">Pending Upload</Badge>
              </div>
              <div className="flex items-center justify-between p-3 bg-slate-50 dark:bg-slate-800 rounded">
                <span>Trade License</span>
                <Badge variant="outline">Pending Upload</Badge>
              </div>
              <div className="flex items-center justify-between p-3 bg-slate-50 dark:bg-slate-800 rounded">
                <span>Bank Verification</span>
                <Badge variant="outline">Pending</Badge>
              </div>
            </div>

            <Button className="w-full mt-6" data-testid="button-demo-verify">
              Complete Verification to Unlock
            </Button>
          </Card>
        </TabsContent>
      </Tabs>

      <Card className="p-6 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-950/20 dark:to-purple-950/20 border-2 border-blue-300 dark:border-blue-700">
        <div className="text-center">
          <h3 className="text-lg font-bold mb-2">Ready to Access Real Platform?</h3>
          <p className="text-sm text-slate-600 dark:text-slate-400 mb-4">
            Get verified to place real bids, access full inventory, and benefit from escrow protection
          </p>
          <div className="flex gap-3 justify-center">
            <Link href="/signup">
              <Button className="bg-blue-600 hover:bg-blue-700" data-testid="button-demo-signup">
                Request B2B Access
              </Button>
            </Link>
            <Link href="/login">
              <Button variant="outline" data-testid="button-demo-login">
                Login
              </Button>
            </Link>
          </div>
        </div>
      </Card>
    </div>
  );
}

function ChainTrackLanding() {
  const [showDemo, setShowDemo] = useState(false);
  const [showCalculator, setShowCalculator] = useState(false);
  const [showRewards, setShowRewards] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-slate-100 dark:from-slate-950 dark:via-blue-950 dark:to-slate-900">
      {/* Hero Image Section */}
      <div className="relative h-96 overflow-hidden">
        <img 
          src={heroImage} 
          alt="B2B wholesale professionals discussing iPhone inventory" 
          className="w-full h-full object-cover brightness-75"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-blue-900/60 to-slate-900/80"></div>
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center max-w-4xl px-4">
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm text-white px-4 py-2 rounded-full text-sm font-medium">
                <MapPin className="w-4 h-4" />
                Operating from Dubai Airport Freezone
              </div>
              <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm text-white px-4 py-2 rounded-full text-sm font-medium">
                <Shield className="w-4 h-4" />
                15,000+ Verified Trades
              </div>
            </div>
            
            <h1 className="text-5xl md:text-6xl font-bold mb-6 text-white">
              ChainTrack Sustainability Hub
            </h1>
            
            <p className="text-xl md:text-2xl text-white mb-4">
              Preowned Mobiles, Household Goods & Refurbished Items
            </p>
            
            <p className="text-lg text-white/90 mb-8 max-w-2xl mx-auto">
              The ultimate B2B marketplace for sustainable commerce. 
              Buy and sell refurbished electronics and household essentials with full transparency and verified quality.
            </p>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-20">
        {/* Hero Section Content */}
        <div className="text-center max-w-4xl mx-auto -mt-12">

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-6">
            <Button 
              size="lg" 
              className="gap-2 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700" 
              onClick={() => setShowDemo(true)}
              data-testid="button-try-demo"
            >
              <Sparkles className="w-5 h-5" />
              Try Platform Demo
              <ArrowRight className="w-4 h-4" />
            </Button>
            <Button 
              size="lg" 
              variant="outline"
              className="gap-2 border-emerald-500/50 text-emerald-600 dark:text-emerald-400"
              onClick={() => setShowRewards(!showRewards)}
              data-testid="button-wholesale-rewards"
            >
              <Coins className="w-5 h-5" />
              Wholesale Rewards
              {showRewards ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
            </Button>
            <Link href="/login">
              <Button size="lg" variant="outline" className="gap-2" data-testid="button-login">
                <Shield className="w-5 h-5" />
                Buyer Login
              </Button>
            </Link>
            <Link href="/signup">
              <Button size="lg" variant="outline" className="gap-2" data-testid="button-signup">
                Request B2B Access
              </Button>
            </Link>
          </div>

          {/* DXB Rewards Toggle Section */}
          {showRewards && (
            <div className="mb-12 animate-in fade-in slide-in-from-top-4 duration-500 text-left">
              <div className="bg-slate-900/40 rounded-3xl border border-emerald-500/20 overflow-hidden backdrop-blur-sm">
                <div className="p-4 bg-emerald-500/10 border-b border-emerald-500/20">
                  <p className="text-xs font-bold text-emerald-400 uppercase tracking-widest text-center">Advanced B2B Feature: DXB Tokens Launching Soon</p>
                </div>
                <RewardComparison />
              </div>
            </div>
          )}

          {/* Trust Badges */}
          <div className="flex flex-wrap justify-center gap-4 text-sm text-slate-600 dark:text-slate-400 mb-6">
            <div className="flex items-center gap-1">
              <CheckCircle2 className="w-4 h-4 text-green-600" />
              <span>Escrow Protection</span>
            </div>
            <div className="flex items-center gap-1">
              <CheckCircle2 className="w-4 h-4 text-green-600" />
              <span>AML/KYC Verified</span>
            </div>
            <div className="flex items-center gap-1">
              <CheckCircle2 className="w-4 h-4 text-green-600" />
              <span>24-48hr Processing</span>
            </div>
          </div>

          {/* Social Media Links */}
          <div className="flex items-center justify-center gap-4 mb-8">
            <a 
              href="https://linkedin.com/company/chaintrack" 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-all hover:scale-105"
              data-testid="link-linkedin"
            >
              <SiLinkedin className="w-5 h-5" />
              <span className="font-medium">LinkedIn</span>
            </a>
            <a 
              href="https://facebook.com/chaintrack" 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-all hover:scale-105"
              data-testid="link-facebook"
            >
              <SiFacebook className="w-5 h-5" />
              <span className="font-medium">Facebook</span>
            </a>
            <a 
              href="https://instagram.com/chaintrack" 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white rounded-lg transition-all hover:scale-105"
              data-testid="link-instagram"
            >
              <SiInstagram className="w-5 h-5" />
              <span className="font-medium">Instagram</span>
            </a>
          </div>

          {/* B2B Pricing Calculator CTA */}
          <Card className="p-6 bg-gradient-to-r from-amber-50 to-orange-50 dark:from-amber-950/20 dark:to-orange-950/20 border-2 border-amber-300 dark:border-amber-700">
            <div className="flex items-center justify-between">
              <div className="text-left">
                <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100 mb-1">
                  📊 Try Our B2B Pricing Calculator
                </h3>
                <p className="text-sm text-slate-600 dark:text-slate-400">
                  Get instant wholesale pricing estimates with export benefits & compliance fees
                </p>
              </div>
              <Button 
                onClick={() => setShowCalculator(!showCalculator)}
                className="bg-amber-600 hover:bg-amber-700"
                data-testid="button-toggle-calculator"
              >
                {showCalculator ? "Hide" : "Calculate"} Pricing
              </Button>
            </div>
          </Card>
        </div>

        {/* B2B Pricing Calculator Section */}
        {showCalculator && (
          <div className="mt-12 max-w-4xl mx-auto">
            <B2BPricingCalculator />
          </div>
        )}

        {/* Demo Mode Modal */}
        <Dialog open={showDemo} onOpenChange={setShowDemo}>
          <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle className="text-2xl">ChainTrack Platform Demo</DialogTitle>
            </DialogHeader>
            <DemoDashboardPreview />
          </DialogContent>
        </Dialog>

        {/* Global Regions & Inventory Categories */}
        <div className="mt-20 max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Global Wholesale Marketplace</h2>
            <p className="text-lg text-slate-600 dark:text-slate-400">
              Source from major markets with unique regional advantages and device specifications
            </p>
          </div>

          <div className="grid md:grid-cols-3 lg:grid-cols-5 gap-6 mb-12">
            <Card className="p-6 text-center hover:shadow-lg transition-shadow border-2 border-orange-300 dark:border-orange-700 bg-gradient-to-br from-orange-50 to-white dark:from-orange-950/20 dark:to-slate-900" data-testid="card-region-india">
              <div className="w-16 h-16 bg-gradient-to-br from-orange-500 to-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <Globe className="w-8 h-8 text-white" />
              </div>
              <Badge className="mb-3 bg-orange-500 text-white">FEATURED</Badge>
              <h3 className="text-xl font-bold mb-2">India</h3>
              <p className="text-sm text-slate-600 dark:text-slate-400 mb-3">Export incentives & dual-SIM specs</p>
              <div className="space-y-1 text-xs text-left">
                <p className="flex items-center gap-1">
                  <CheckCircle2 className="w-3 h-3 text-green-600" />
                  <span>RODTEP 2% rebate</span>
                </p>
                <p className="flex items-center gap-1">
                  <CheckCircle2 className="w-3 h-3 text-green-600" />
                  <span>GST refund eligible</span>
                </p>
                <p className="flex items-center gap-1">
                  <CheckCircle2 className="w-3 h-3 text-green-600" />
                  <span>India-specific bands</span>
                </p>
              </div>
            </Card>

            <Card className="p-6 text-center hover:shadow-lg transition-shadow border-2 border-blue-200 dark:border-blue-800" data-testid="card-region-us">
              <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
                <Globe className="w-8 h-8 text-blue-600 dark:text-blue-400" />
              </div>
              <h3 className="text-xl font-bold mb-2 mt-9">United States</h3>
              <p className="text-sm text-slate-600 dark:text-slate-400 mb-3">Premium tested devices & auction lots</p>
              <div className="space-y-1 text-xs text-left">
                <p className="flex items-center gap-1">
                  <CheckCircle2 className="w-3 h-3 text-blue-600" />
                  <span>Factory unlocked</span>
                </p>
                <p className="flex items-center gap-1">
                  <CheckCircle2 className="w-3 h-3 text-blue-600" />
                  <span>High-grade cosmetics</span>
                </p>
              </div>
            </Card>

            <Card className="p-6 text-center hover:shadow-lg transition-shadow border-2 border-red-200 dark:border-red-800" data-testid="card-region-japan">
              <div className="w-16 h-16 bg-red-100 dark:bg-red-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
                <Globe className="w-8 h-8 text-red-600 dark:text-red-400" />
              </div>
              <h3 className="text-xl font-bold mb-2 mt-9">Japan</h3>
              <p className="text-sm text-slate-600 dark:text-slate-400 mb-3">Pristine refurbished stock</p>
              <div className="space-y-1 text-xs text-left">
                <p className="flex items-center gap-1">
                  <CheckCircle2 className="w-3 h-3 text-red-600" />
                  <span>A+ grade dominant</span>
                </p>
                <p className="flex items-center gap-1">
                  <CheckCircle2 className="w-3 h-3 text-red-600" />
                  <span>Strict quality control</span>
                </p>
              </div>
            </Card>

            <Card className="p-6 text-center hover:shadow-lg transition-shadow border-2 border-yellow-200 dark:border-yellow-800" data-testid="card-region-china">
              <div className="w-16 h-16 bg-yellow-100 dark:bg-yellow-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
                <Globe className="w-8 h-8 text-yellow-600 dark:text-yellow-400" />
              </div>
              <h3 className="text-xl font-bold mb-2 mt-9">China</h3>
              <p className="text-sm text-slate-600 dark:text-slate-400 mb-3">Volume inventory & competitive pricing</p>
              <div className="space-y-1 text-xs text-left">
                <p className="flex items-center gap-1">
                  <CheckCircle2 className="w-3 h-3 text-yellow-600" />
                  <span>Bulk quantities</span>
                </p>
                <p className="flex items-center gap-1">
                  <CheckCircle2 className="w-3 h-3 text-yellow-600" />
                  <span>Lowest cost basis</span>
                </p>
              </div>
            </Card>

            <Card className="p-6 text-center hover:shadow-lg transition-shadow border-2 border-purple-200 dark:border-purple-800" data-testid="card-region-europe">
              <div className="w-16 h-16 bg-purple-100 dark:bg-purple-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
                <Globe className="w-8 h-8 text-purple-600 dark:text-purple-400" />
              </div>
              <h3 className="text-xl font-bold mb-2 mt-9">Europe</h3>
              <p className="text-sm text-slate-600 dark:text-slate-400 mb-3">Certified & compliant devices</p>
              <div className="space-y-1 text-xs text-left">
                <p className="flex items-center gap-1">
                  <CheckCircle2 className="w-3 h-3 text-purple-600" />
                  <span>CE certified</span>
                </p>
                <p className="flex items-center gap-1">
                  <CheckCircle2 className="w-3 h-3 text-purple-600" />
                  <span>Full compliance</span>
                </p>
              </div>
            </Card>
          </div>

          {/* Inventory Types */}
          <div className="grid md:grid-cols-2 gap-6">
            <Card className="p-8 border-2 border-amber-300 dark:border-amber-700">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-amber-100 dark:bg-amber-900/30 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Gavel className="w-6 h-6 text-amber-600 dark:text-amber-400" />
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-2">ASIS Auction Stock</h3>
                  <p className="text-slate-600 dark:text-slate-400 mb-3">
                    As-is devices from liquidation auctions and returns. Lower prices for buyers who can grade and refurbish.
                  </p>
                  <div className="flex flex-wrap gap-2">
                    <Badge variant="outline" className="border-amber-400 text-amber-700 dark:text-amber-300">Lower Cost</Badge>
                    <Badge variant="outline" className="border-amber-400 text-amber-700 dark:text-amber-300">Bulk Volume</Badge>
                    <Badge variant="outline" className="border-amber-400 text-amber-700 dark:text-amber-300">Requires Grading</Badge>
                  </div>
                </div>
              </div>
            </Card>

            <Card className="p-8 border-2 border-green-300 dark:border-green-700">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-green-100 dark:bg-green-900/30 rounded-lg flex items-center justify-center flex-shrink-0">
                  <CheckCircle2 className="w-6 h-6 text-green-600 dark:text-green-400" />
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-2">Ready-to-Ship Tested</h3>
                  <p className="text-slate-600 dark:text-slate-400 mb-3">
                    Pre-tested, graded, and refurbished devices ready for immediate resale. Quality guaranteed.
                  </p>
                  <div className="flex flex-wrap gap-2">
                    <Badge variant="outline" className="border-green-400 text-green-700 dark:text-green-300">Tested & Graded</Badge>
                    <Badge variant="outline" className="border-green-400 text-green-700 dark:text-green-300">Ready to Sell</Badge>
                    <Badge variant="outline" className="border-green-400 text-green-700 dark:text-green-300">Quality Assured</Badge>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </div>

        {/* Traditional vs Reverse Bidding Comparison */}
        <div className="mt-24 max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Traditional Buying vs Reverse Bidding</h2>
            <p className="text-lg text-slate-600 dark:text-slate-400">
              See how our platform saves you time and money
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Traditional Buying */}
            <Card className="p-8 bg-slate-100 dark:bg-slate-900 border-2 border-slate-300 dark:border-slate-700">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 bg-slate-300 dark:bg-slate-700 rounded-lg flex items-center justify-center">
                  <ShoppingCart className="w-6 h-6 text-slate-600 dark:text-slate-400" />
                </div>
                <h3 className="text-2xl font-bold">Traditional Buying</h3>
              </div>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-slate-400 dark:bg-slate-600 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-white text-xs font-bold">1</span>
                  </div>
                  <div>
                    <p className="font-semibold text-slate-700 dark:text-slate-300">Contact Multiple Suppliers</p>
                    <p className="text-sm text-slate-600 dark:text-slate-400">Spend hours reaching out individually</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-slate-400 dark:bg-slate-600 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-white text-xs font-bold">2</span>
                  </div>
                  <div>
                    <p className="font-semibold text-slate-700 dark:text-slate-300">Wait for Quotes</p>
                    <p className="text-sm text-slate-600 dark:text-slate-400">Days of back-and-forth emails</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-slate-400 dark:bg-slate-600 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-white text-xs font-bold">3</span>
                  </div>
                  <div>
                    <p className="font-semibold text-slate-700 dark:text-slate-300">Manual Comparison</p>
                    <p className="text-sm text-slate-600 dark:text-slate-400">Spreadsheet management and price negotiation</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-slate-400 dark:bg-slate-600 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-white text-xs font-bold">4</span>
                  </div>
                  <div>
                    <p className="font-semibold text-slate-700 dark:text-slate-300">Place Order</p>
                    <p className="text-sm text-slate-600 dark:text-slate-400">Hope you got the best deal</p>
                  </div>
                </div>
                <div className="mt-6 pt-6 border-t border-slate-300 dark:border-slate-700">
                  <p className="text-sm text-slate-600 dark:text-slate-400">⏱️ Timeline: 3-7 days</p>
                  <p className="text-sm text-slate-600 dark:text-slate-400">💰 No guarantee of best price</p>
                </div>
              </div>
            </Card>

            {/* Reverse Bidding */}
            <Card className="p-8 bg-gradient-to-br from-purple-50 to-blue-50 dark:from-purple-950/30 dark:to-blue-950/30 border-2 border-purple-400 dark:border-purple-600 shadow-lg">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 bg-purple-500 rounded-lg flex items-center justify-center">
                  <Gavel className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-purple-900 dark:text-purple-100">ChainTrack Reverse Bidding</h3>
              </div>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-white text-xs font-bold">1</span>
                  </div>
                  <div>
                    <p className="font-semibold text-purple-900 dark:text-purple-100">Post Your Requirement</p>
                    <p className="text-sm text-purple-800 dark:text-purple-200">One form, all suppliers notified instantly</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-purple-500 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-white text-xs font-bold">2</span>
                  </div>
                  <div>
                    <p className="font-semibold text-purple-900 dark:text-purple-100">Suppliers Compete</p>
                    <p className="text-sm text-purple-800 dark:text-purple-200">They bid DOWN to win your business</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-white text-xs font-bold">3</span>
                  </div>
                  <div>
                    <p className="font-semibold text-purple-900 dark:text-purple-100">Live Price Tracking</p>
                    <p className="text-sm text-purple-800 dark:text-purple-200">See bids in real-time, choose the best offer</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-white text-xs font-bold">4</span>
                  </div>
                  <div>
                    <p className="font-semibold text-purple-900 dark:text-purple-100">Accept Best Bid</p>
                    <p className="text-sm text-purple-800 dark:text-purple-200">Guaranteed competitive pricing</p>
                  </div>
                </div>
                <div className="mt-6 pt-6 border-t border-purple-300 dark:border-purple-700">
                  <p className="text-sm font-semibold text-purple-900 dark:text-purple-100">⚡ Timeline: 24-48 hours</p>
                  <p className="text-sm font-semibold text-purple-900 dark:text-purple-100">✅ Best price guaranteed by competition</p>
                </div>
              </div>
            </Card>
          </div>
        </div>

        {/* Complete International Buyer Journey */}
        <div className="mt-24 max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">Complete International Buyer Journey</h2>
            <p className="text-lg text-slate-600 dark:text-slate-400">
              End-to-end process with full compliance and escrow protection
            </p>
          </div>

          <div className="grid md:grid-cols-7 gap-4">
            <div className="relative">
              <Card className="p-6 border-2 border-blue-400 bg-blue-50 dark:bg-blue-950/20" data-testid="card-journey-browse">
                <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center text-white font-bold text-lg mx-auto mb-3">
                  1
                </div>
                <h4 className="font-bold text-center mb-2">Browse</h4>
                <p className="text-xs text-center text-slate-600 dark:text-slate-400">
                  Search inventory by country, grade, & specs
                </p>
                <div className="mt-2 text-center">
                  <Badge variant="outline" className="text-xs">10 min</Badge>
                </div>
              </Card>
              <ArrowRight className="hidden md:block absolute -right-6 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400" />
            </div>

            <div className="relative">
              <Card className="p-6 border-2 border-purple-400 bg-purple-50 dark:bg-purple-950/20" data-testid="card-journey-compare">
                <div className="w-12 h-12 bg-purple-500 rounded-full flex items-center justify-center text-white font-bold text-lg mx-auto mb-3">
                  2
                </div>
                <h4 className="font-bold text-center mb-2">Compare</h4>
                <p className="text-xs text-center text-slate-600 dark:text-slate-400">
                  Regional pricing, specs, export benefits
                </p>
                <div className="mt-2 text-center">
                  <Badge variant="outline" className="text-xs">15 min</Badge>
                </div>
              </Card>
              <ArrowRight className="hidden md:block absolute -right-6 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400" />
            </div>

            <div className="relative">
              <Card className="p-6 border-2 border-green-400 bg-green-50 dark:bg-green-950/20" data-testid="card-journey-bid">
                <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center text-white font-bold text-lg mx-auto mb-3">
                  3
                </div>
                <h4 className="font-bold text-center mb-2">Bid</h4>
                <p className="text-xs text-center text-slate-600 dark:text-slate-400">
                  Post requirement, suppliers compete
                </p>
                <div className="mt-2 text-center">
                  <Badge variant="outline" className="text-xs">24-48 hrs</Badge>
                </div>
              </Card>
              <ArrowRight className="hidden md:block absolute -right-6 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400" />
            </div>

            <div className="relative">
              <Card className="p-6 border-2 border-amber-400 bg-amber-50 dark:bg-amber-950/20" data-testid="card-journey-escrow">
                <div className="w-12 h-12 bg-amber-500 rounded-full flex items-center justify-center text-white font-bold text-lg mx-auto mb-3">
                  4
                </div>
                <h4 className="font-bold text-center mb-2">Escrow</h4>
                <p className="text-xs text-center text-slate-600 dark:text-slate-400">
                  Secure payment, full buyer protection
                </p>
                <div className="mt-2 text-center">
                  <Badge variant="outline" className="text-xs">1-2 days</Badge>
                </div>
              </Card>
              <ArrowRight className="hidden md:block absolute -right-6 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400" />
            </div>

            <div className="relative">
              <Card className="p-6 border-2 border-red-400 bg-red-50 dark:bg-red-950/20" data-testid="card-journey-compliance">
                <div className="w-12 h-12 bg-red-500 rounded-full flex items-center justify-center text-white font-bold text-lg mx-auto mb-3">
                  5
                </div>
                <h4 className="font-bold text-center mb-2">Compliance</h4>
                <p className="text-xs text-center text-slate-600 dark:text-slate-400">
                  Export docs, GST, customs clearance
                </p>
                <div className="mt-2 text-center">
                  <Badge variant="outline" className="text-xs">3-5 days</Badge>
                </div>
              </Card>
              <ArrowRight className="hidden md:block absolute -right-6 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400" />
            </div>

            <div className="relative">
              <Card className="p-6 border-2 border-indigo-400 bg-indigo-50 dark:bg-indigo-950/20" data-testid="card-journey-shipping">
                <div className="w-12 h-12 bg-indigo-500 rounded-full flex items-center justify-center text-white font-bold text-lg mx-auto mb-3">
                  6
                </div>
                <h4 className="font-bold text-center mb-2">Shipping</h4>
                <p className="text-xs text-center text-slate-600 dark:text-slate-400">
                  Air freight to Dubai, real-time tracking
                </p>
                <div className="mt-2 text-center">
                  <Badge variant="outline" className="text-xs">5-7 days</Badge>
                </div>
              </Card>
              <ArrowRight className="hidden md:block absolute -right-6 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400" />
            </div>

            <div>
              <Card className="p-6 border-2 border-green-500 bg-gradient-to-br from-green-50 to-blue-50 dark:from-green-950/20 dark:to-blue-950/20" data-testid="card-journey-delivery">
                <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-blue-500 rounded-full flex items-center justify-center text-white font-bold text-lg mx-auto mb-3">
                  ✓
                </div>
                <h4 className="font-bold text-center mb-2">Delivery</h4>
                <p className="text-xs text-center text-slate-600 dark:text-slate-400">
                  Receive at Dubai Airport Freezone
                </p>
                <div className="mt-2 text-center">
                  <Badge className="text-xs bg-green-500 text-white">Complete</Badge>
                </div>
              </Card>
            </div>
          </div>

          <div className="mt-8 p-6 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-950/20 dark:to-purple-950/20 rounded-xl border-2 border-blue-200 dark:border-blue-800">
            <div className="text-center">
              <h3 className="text-2xl font-bold mb-2">Total Timeline: 14-21 Days</h3>
              <p className="text-slate-600 dark:text-slate-400 mb-4">
                From posting your requirement to receiving inventory at Dubai Airport Freezone
              </p>
              <div className="flex flex-wrap justify-center gap-3">
                <Badge variant="outline" className="text-sm">Full Escrow Protection</Badge>
                <Badge variant="outline" className="text-sm">Export Documentation Managed</Badge>
                <Badge variant="outline" className="text-sm">GST Refund Processing</Badge>
                <Badge variant="outline" className="text-sm">Air Freight Included</Badge>
              </div>
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

        {/* Regional Price & Spec Comparison */}
        <div className="mt-24 max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">Regional Comparison: iPhone 13 Pro 256GB</h2>
            <p className="text-lg text-slate-600 dark:text-slate-400">
              Real market advantages across source countries
            </p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-slate-100 dark:bg-slate-800">
                  <th className="p-4 text-left border-b-2 border-slate-300 dark:border-slate-600">Source Country</th>
                  <th className="p-4 text-center border-b-2 border-slate-300 dark:border-slate-600">Avg Price (USD)</th>
                  <th className="p-4 text-center border-b-2 border-slate-300 dark:border-slate-600">Device Specs</th>
                  <th className="p-4 text-left border-b-2 border-slate-300 dark:border-slate-600">Key Advantages</th>
                  <th className="p-4 text-left border-b-2 border-slate-300 dark:border-slate-600">Export Benefits</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-slate-200 dark:border-slate-700 bg-orange-50/50 dark:bg-orange-950/10">
                  <td className="p-4 font-semibold">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 bg-gradient-to-br from-orange-500 to-green-600 rounded-full"></div>
                      <span>India</span>
                      <Badge className="ml-1 bg-orange-500 text-white text-xs">HOT</Badge>
                    </div>
                  </td>
                  <td className="p-4 text-center font-bold text-green-600 dark:text-green-400">$485</td>
                  <td className="p-4 text-sm">
                    <div className="space-y-1">
                      <div className="flex items-center gap-1 justify-center">
                        <CheckCircle2 className="w-3 h-3 text-green-600" />
                        <span>Dual SIM</span>
                      </div>
                      <div className="flex items-center gap-1 justify-center">
                        <CheckCircle2 className="w-3 h-3 text-green-600" />
                        <span>B3/B5/B40</span>
                      </div>
                    </div>
                  </td>
                  <td className="p-4 text-sm">
                    <div>Competitive base pricing, dual-SIM demand in MENA</div>
                  </td>
                  <td className="p-4 text-sm">
                    <div className="space-y-1">
                      <div className="flex items-center gap-1">
                        <DollarSign className="w-3 h-3 text-green-600" />
                        <span className="font-semibold">RODTEP: 2% rebate</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <DollarSign className="w-3 h-3 text-green-600" />
                        <span>GST refund on export</span>
                      </div>
                    </div>
                  </td>
                </tr>

                <tr className="border-b border-slate-200 dark:border-slate-700">
                  <td className="p-4 font-semibold">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 bg-blue-500 rounded-full"></div>
                      <span>United States</span>
                    </div>
                  </td>
                  <td className="p-4 text-center font-bold">$525</td>
                  <td className="p-4 text-sm">
                    <div className="space-y-1">
                      <div className="flex items-center gap-1 justify-center">
                        <CheckCircle2 className="w-3 h-3 text-blue-600" />
                        <span>Single SIM (eSIM)</span>
                      </div>
                      <div className="flex items-center gap-1 justify-center">
                        <CheckCircle2 className="w-3 h-3 text-blue-600" />
                        <span>B2/B4/B5/B12</span>
                      </div>
                    </div>
                  </td>
                  <td className="p-4 text-sm">
                    <div>Unlocked devices, premium condition grades available</div>
                  </td>
                  <td className="p-4 text-sm text-slate-500 dark:text-slate-400">
                    Standard export procedures
                  </td>
                </tr>

                <tr className="border-b border-slate-200 dark:border-slate-700">
                  <td className="p-4 font-semibold">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 bg-red-500 rounded-full"></div>
                      <span>Japan</span>
                    </div>
                  </td>
                  <td className="p-4 text-center font-bold">$545</td>
                  <td className="p-4 text-sm">
                    <div className="space-y-1">
                      <div className="flex items-center gap-1 justify-center">
                        <CheckCircle2 className="w-3 h-3 text-red-600" />
                        <span>Single SIM</span>
                      </div>
                      <div className="flex items-center gap-1 justify-center">
                        <CheckCircle2 className="w-3 h-3 text-red-600" />
                        <span>JP bands</span>
                      </div>
                    </div>
                  </td>
                  <td className="p-4 text-sm">
                    <div>Highest quality grading (A+ dominant), pristine cosmetics</div>
                  </td>
                  <td className="p-4 text-sm text-slate-500 dark:text-slate-400">
                    Standard export procedures
                  </td>
                </tr>

                <tr className="border-b border-slate-200 dark:border-slate-700">
                  <td className="p-4 font-semibold">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 bg-yellow-500 rounded-full"></div>
                      <span>China</span>
                    </div>
                  </td>
                  <td className="p-4 text-center font-bold text-green-600 dark:text-green-400">$470</td>
                  <td className="p-4 text-sm">
                    <div className="space-y-1">
                      <div className="flex items-center gap-1 justify-center">
                        <CheckCircle2 className="w-3 h-3 text-yellow-600" />
                        <span>Dual SIM</span>
                      </div>
                      <div className="flex items-center gap-1 justify-center">
                        <CheckCircle2 className="w-3 h-3 text-yellow-600" />
                        <span>CN bands</span>
                      </div>
                    </div>
                  </td>
                  <td className="p-4 text-sm">
                    <div>Lowest cost, high volume availability</div>
                  </td>
                  <td className="p-4 text-sm text-slate-500 dark:text-slate-400">
                    Standard export procedures
                  </td>
                </tr>

                <tr className="border-b border-slate-200 dark:border-slate-700">
                  <td className="p-4 font-semibold">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 bg-purple-500 rounded-full"></div>
                      <span>Europe</span>
                    </div>
                  </td>
                  <td className="p-4 text-center font-bold">$555</td>
                  <td className="p-4 text-sm">
                    <div className="space-y-1">
                      <div className="flex items-center gap-1 justify-center">
                        <CheckCircle2 className="w-3 h-3 text-purple-600" />
                        <span>Single SIM (eSIM)</span>
                      </div>
                      <div className="flex items-center gap-1 justify-center">
                        <CheckCircle2 className="w-3 h-3 text-purple-600" />
                        <span>EU bands</span>
                      </div>
                    </div>
                  </td>
                  <td className="p-4 text-sm">
                    <div>CE certified, full regulatory compliance</div>
                  </td>
                  <td className="p-4 text-sm text-slate-500 dark:text-slate-400">
                    Standard EU export procedures
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="mt-6 p-6 bg-gradient-to-r from-orange-50 to-green-50 dark:from-orange-950/20 dark:to-green-950/20 rounded-xl border-2 border-orange-200 dark:border-orange-800">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-green-600 rounded-lg flex items-center justify-center flex-shrink-0">
                <TrendingDown className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="text-xl font-bold mb-2">India Advantage: Save $50 per device after export rebates</h3>
                <p className="text-slate-700 dark:text-slate-300 mb-3">
                  On a 1,000-device order, India sourcing with RODTEP rebates saves you approximately <span className="font-bold text-green-600 dark:text-green-400">$50,000 compared to US sourcing</span>, while still accessing dual-SIM models perfect for MENA markets.
                </p>
                <div className="flex flex-wrap gap-3">
                  <Badge variant="outline" className="border-orange-400 text-orange-700 dark:text-orange-300">
                    RODTEP 2% Cash Rebate
                  </Badge>
                  <Badge variant="outline" className="border-green-400 text-green-700 dark:text-green-300">
                    GST Refund on Export
                  </Badge>
                  <Badge variant="outline" className="border-blue-400 text-blue-700 dark:text-blue-300">
                    Dual-SIM for MENA Markets
                  </Badge>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Final CTA */}
        <div className="mt-24 text-center max-w-3xl mx-auto">
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-500 dark:to-purple-500 rounded-2xl p-12 text-white shadow-2xl">
            <div className="flex items-center justify-center gap-2 mb-4">
              <Plane className="w-8 h-8" />
              <h2 className="text-3xl font-bold">Start Sourcing from Dubai Airport Freezone</h2>
            </div>
            <p className="text-lg mb-2 text-blue-100">
              Join wholesale buyers sourcing inventory efficiently through reverse bidding
            </p>
            <p className="text-sm mb-8 text-blue-200">
              🌍 Global Markets: India • US • Japan • China • Europe<br />
              📦 Inventory Types: ASIS Auction • Ready-to-Ship Tested<br />
              ⚡ Fast Turnaround: 24-48 hours to best price<br />
              💰 India Advantage: RODTEP 2% rebate + GST refunds
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/signup">
                <Button size="lg" variant="secondary" className="gap-2 bg-white text-purple-600 hover:bg-blue-50" data-testid="button-signup-cta">
                  <Shield className="w-5 h-5" />
                  Request B2B Access
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </Link>
              <Link href="/login">
                <Button size="lg" variant="outline" className="gap-2 border-white text-white hover:bg-white/10" data-testid="button-login-cta">
                  Buyer Login
                </Button>
              </Link>
            </div>
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
            <Globe className="w-10 h-10 text-purple-600" />
            ChainTrack Global Wholesale
          </h1>
          <p className="text-muted-foreground">
            Source phones from India, US, Japan, China & Europe with full compliance
          </p>
        </div>

        <Tabs defaultValue="marketplace" className="space-y-6">
          <TabsList className="grid grid-cols-3 lg:grid-cols-6 w-full">
            <TabsTrigger value="marketplace" data-testid="tab-marketplace">
              <ShoppingCart className="w-4 h-4 mr-2" />
              <span className="hidden sm:inline">Marketplace</span>
              <span className="sm:hidden">Market</span>
            </TabsTrigger>
            <TabsTrigger value="countries" data-testid="tab-countries">
              <Globe className="w-4 h-4 mr-2" />
              <span className="hidden sm:inline">Countries</span>
              <span className="sm:hidden">Regions</span>
            </TabsTrigger>
            <TabsTrigger value="inventory" data-testid="tab-inventory">
              <Warehouse className="w-4 h-4 mr-2" />
              <span className="hidden sm:inline">Inventory</span>
              <span className="sm:hidden">Stock</span>
            </TabsTrigger>
            <TabsTrigger value="auctions" data-testid="tab-auctions">
              <Gavel className="w-4 h-4 mr-2" />
              <span className="hidden sm:inline">Auctions</span>
              <span className="sm:hidden">Bids</span>
            </TabsTrigger>
            <TabsTrigger value="my-auctions" data-testid="tab-my-auctions">
              <Package className="w-4 h-4 mr-2" />
              <span className="hidden sm:inline">My Orders</span>
              <span className="sm:hidden">Orders</span>
            </TabsTrigger>
            <TabsTrigger value="create" data-testid="tab-create">
              <Plus className="w-4 h-4 mr-2" />
              <span className="hidden sm:inline">Post Need</span>
              <span className="sm:hidden">Post</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="marketplace">
            <WholesaleMarketplaceView />
          </TabsContent>

          <TabsContent value="countries">
            <SourceCountriesView />
          </TabsContent>

          <TabsContent value="inventory">
            <LiveInventoryView />
          </TabsContent>

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

function WholesaleMarketplaceView() {
  return (
    <div className="space-y-6">
      <div className="grid md:grid-cols-2 gap-6">
        <Card className="p-8 border-2 border-amber-300 dark:border-amber-700 hover:shadow-xl transition-shadow cursor-pointer" data-testid="card-asis-stock">
          <div className="flex items-start gap-4">
            <div className="w-16 h-16 bg-amber-100 dark:bg-amber-900/30 rounded-lg flex items-center justify-center flex-shrink-0">
              <Gavel className="w-8 h-8 text-amber-600 dark:text-amber-400" />
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-2">
                <h3 className="text-2xl font-bold">ASIS Auction Stock</h3>
                <Badge className="bg-amber-500 text-white">LOWEST PRICES</Badge>
              </div>
              <p className="text-slate-600 dark:text-slate-400 mb-4">
                As-is devices from liquidation auctions. Perfect for buyers who can grade & refurbish. Access requires Starter tier or higher.
              </p>
              <div className="space-y-2 mb-4">
                <div className="flex items-center gap-2">
                  <TrendingDown className="w-4 h-4 text-green-600" />
                  <span className="text-sm">30-50% below market price</span>
                </div>
                <div className="flex items-center gap-2">
                  <Boxes className="w-4 h-4 text-blue-600" />
                  <span className="text-sm">Bulk lots available (100-1000+ units)</span>
                </div>
                <div className="flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 text-amber-600" />
                  <span className="text-sm">Requires grading/testing capability</span>
                </div>
              </div>
              <Button className="w-full" data-testid="button-browse-asis">
                Browse ASIS Auctions
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </div>
          </div>
        </Card>

        <Card className="p-8 border-2 border-green-300 dark:border-green-700 hover:shadow-xl transition-shadow cursor-pointer" data-testid="card-ready-to-ship">
          <div className="flex items-start gap-4">
            <div className="w-16 h-16 bg-green-100 dark:bg-green-900/30 rounded-lg flex items-center justify-center flex-shrink-0">
              <CheckCircle2 className="w-8 h-8 text-green-600 dark:text-green-400" />
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-2">
                <h3 className="text-2xl font-bold">Ready-to-Ship</h3>
                <Badge className="bg-green-500 text-white">QUALITY ASSURED</Badge>
              </div>
              <p className="text-slate-600 dark:text-slate-400 mb-4">
                Pre-tested, graded (A+ to C), and refurbished devices ready for immediate resale. Available to all tiers.
              </p>
              <div className="space-y-2 mb-4">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-green-600" />
                  <span className="text-sm">Tested & cosmetically graded</span>
                </div>
                <div className="flex items-center gap-2">
                  <Plane className="w-4 h-4 text-blue-600" />
                  <span className="text-sm">Ships within 24-48 hours</span>
                </div>
                <div className="flex items-center gap-2">
                  <Shield className="w-4 h-4 text-purple-600" />
                  <span className="text-sm">Quality guarantee included</span>
                </div>
              </div>
              <Button className="w-full bg-green-600 hover:bg-green-700" data-testid="button-browse-ready">
                Browse Ready Stock
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </div>
          </div>
        </Card>
      </div>

      <Card className="p-6">
        <h3 className="text-xl font-bold mb-4">Quick Comparison</h3>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b">
                <th className="text-left p-3">Feature</th>
                <th className="text-center p-3">ASIS Auction</th>
                <th className="text-center p-3">Ready-to-Ship</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b">
                <td className="p-3">Price Point</td>
                <td className="p-3 text-center">30-50% below market</td>
                <td className="p-3 text-center">Market competitive</td>
              </tr>
              <tr className="border-b">
                <td className="p-3">Tier Access</td>
                <td className="p-3 text-center">Starter+ (50+ devices/month)</td>
                <td className="p-3 text-center">All tiers (On-Demand+)</td>
              </tr>
              <tr className="border-b">
                <td className="p-3">Grading</td>
                <td className="p-3 text-center">You grade & test</td>
                <td className="p-3 text-center">Pre-graded A+ to C</td>
              </tr>
              <tr>
                <td className="p-3">Transaction Fee</td>
                <td className="p-3 text-center">0.3% (Starter)</td>
                <td className="p-3 text-center">0.5%</td>
              </tr>
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}

function SourceCountriesView() {
  return (
    <div className="space-y-6">
      <Card className="p-6 bg-gradient-to-r from-orange-50 to-green-50 dark:from-orange-950/20 dark:to-green-950/20 border-2 border-orange-200 dark:border-orange-800">
        <div className="flex items-center gap-3 mb-3">
          <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-green-600 rounded-full flex items-center justify-center">
            <TrendingDown className="w-6 h-6 text-white" />
          </div>
          <div>
            <h3 className="text-2xl font-bold">India - Featured Source Country</h3>
            <Badge className="bg-orange-500 text-white">Best Value for MENA Markets</Badge>
          </div>
        </div>
        <p className="text-slate-700 dark:text-slate-300 mb-4">
          Source dual-SIM iPhones from India with 2% RODTEP export rebate + GST refunds. Perfect for UAE & MENA markets where dual-SIM is in high demand.
        </p>
        <div className="grid md:grid-cols-3 gap-4">
          <div className="p-4 bg-white dark:bg-slate-900 rounded-lg">
            <DollarSign className="w-8 h-8 text-green-600 mb-2" />
            <p className="font-bold">$485 avg (iPhone 13 Pro)</p>
            <p className="text-sm text-slate-600 dark:text-slate-400">After RODTEP rebate</p>
          </div>
          <div className="p-4 bg-white dark:bg-slate-900 rounded-lg">
            <Phone className="w-8 h-8 text-blue-600 mb-2" />
            <p className="font-bold">Dual-SIM Models</p>
            <p className="text-sm text-slate-600 dark:text-slate-400">India-specific variants</p>
          </div>
          <div className="p-4 bg-white dark:bg-slate-900 rounded-lg">
            <BarChart3 className="w-8 h-8 text-purple-600 mb-2" />
            <p className="font-bold">Bands B3/B5/B40</p>
            <p className="text-sm text-slate-600 dark:text-slate-400">MENA-optimized</p>
          </div>
        </div>
      </Card>

      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="p-6 hover:shadow-lg transition-shadow" data-testid="card-country-us">
          <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center mb-4">
            <Globe className="w-6 h-6 text-white" />
          </div>
          <h4 className="font-bold text-lg mb-2">United States</h4>
          <p className="text-sm text-slate-600 dark:text-slate-400 mb-3">Premium unlocked devices, high cosmetic grades</p>
          <div className="space-y-1 text-xs">
            <p>• $525 avg (iPhone 13 Pro)</p>
            <p>• Single SIM (eSIM)</p>
            <p>• Bands B2/B4/B5/B12</p>
          </div>
        </Card>

        <Card className="p-6 hover:shadow-lg transition-shadow" data-testid="card-country-japan">
          <div className="w-12 h-12 bg-red-500 rounded-full flex items-center justify-center mb-4">
            <Globe className="w-6 h-6 text-white" />
          </div>
          <h4 className="font-bold text-lg mb-2">Japan</h4>
          <p className="text-sm text-slate-600 dark:text-slate-400 mb-3">Highest quality grading, pristine cosmetics</p>
          <div className="space-y-1 text-xs">
            <p>• $545 avg (iPhone 13 Pro)</p>
            <p>• Single SIM</p>
            <p>• A+ grade dominant</p>
          </div>
        </Card>

        <Card className="p-6 hover:shadow-lg transition-shadow" data-testid="card-country-china">
          <div className="w-12 h-12 bg-yellow-500 rounded-full flex items-center justify-center mb-4">
            <Globe className="w-6 h-6 text-white" />
          </div>
          <h4 className="font-bold text-lg mb-2">China</h4>
          <p className="text-sm text-slate-600 dark:text-slate-400 mb-3">Volume inventory, lowest cost basis</p>
          <div className="space-y-1 text-xs">
            <p>• $470 avg (iPhone 13 Pro)</p>
            <p>• Dual SIM</p>
            <p>• High volume availability</p>
          </div>
        </Card>

        <Card className="p-6 hover:shadow-lg transition-shadow" data-testid="card-country-europe">
          <div className="w-12 h-12 bg-purple-500 rounded-full flex items-center justify-center mb-4">
            <Globe className="w-6 h-6 text-white" />
          </div>
          <h4 className="font-bold text-lg mb-2">Europe</h4>
          <p className="text-sm text-slate-600 dark:text-slate-400 mb-3">CE certified, full regulatory compliance</p>
          <div className="space-y-1 text-xs">
            <p>• $555 avg (iPhone 13 Pro)</p>
            <p>• Single SIM (eSIM)</p>
            <p>• EU bands</p>
          </div>
        </Card>
      </div>
    </div>
  );
}

function LiveInventoryView() {
  return (
    <Card className="p-8 text-center">
      <Warehouse className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
      <h3 className="text-2xl font-semibold mb-2">Live Inventory Coming Soon</h3>
      <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
        Browse real-time inventory from all source countries with advanced filtering by model, grade, specs, and source region.
        For now, use reverse auctions to post your requirements and get competitive bids.
      </p>
      <div className="flex flex-wrap justify-center gap-3">
        <Badge variant="outline">Filter by Country</Badge>
        <Badge variant="outline">Grade Selection</Badge>
        <Badge variant="outline">Spec Comparison</Badge>
        <Badge variant="outline">Bulk Pricing</Badge>
      </div>
    </Card>
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
          <h3 className="text-xl font-bold mb-2">{auction.title}</h3>
          <div className="flex flex-wrap gap-2 mb-3">
            <Badge variant="outline">{auction.productType}</Badge>
            <Badge variant="outline">{auction.condition}</Badge>
            <Badge variant="outline">{auction.quantity} units</Badge>
            {auction.gradeRequired && (
              <Badge variant="outline">Grade {auction.gradeRequired}</Badge>
            )}
          </div>
          {auction.description && (
            <p className="text-sm text-muted-foreground">{auction.description}</p>
          )}
        </div>
        <div className="text-right ml-4">
          <div className="text-sm text-muted-foreground mb-1">Target Price</div>
          <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">
            ${(auction.startingPrice / 100).toFixed(2)}
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
            <span>Ends {new Date(auction.endDate).toLocaleDateString()}</span>
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
            <h3 className="text-xl font-bold">{auction.title}</h3>
            <Badge className={statusColors[auction.status as keyof typeof statusColors]}>
              {auction.status}
            </Badge>
          </div>
          <div className="flex flex-wrap gap-2 mb-3">
            <Badge variant="outline">{auction.productType}</Badge>
            <Badge variant="outline">{auction.condition}</Badge>
            <Badge variant="outline">{auction.quantity} units</Badge>
            {auction.gradeRequired && (
              <Badge variant="outline">Grade {auction.gradeRequired}</Badge>
            )}
          </div>
        </div>
        <div className="text-right ml-4">
          <div className="text-sm text-muted-foreground mb-1">Target Price</div>
          <div className="text-2xl font-bold">${(auction.startingPrice / 100).toFixed(2)}</div>
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
      return apiRequest('POST', `/api/chaintrack/bids/${bid.id}/accept`, { buyerId });
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
      return apiRequest('POST', `/api/chaintrack/bids/${bid.id}/reject`);
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
      return apiRequest('POST', '/api/chaintrack/bids', {
        auctionId: auction.id,
        supplierId: 'temp-supplier-id', // This should come from the user's supplier profile
        bidPrice: Math.round(parseFloat(bidPrice) * 100),
        quantity: parseInt(quantity),
        deliveryTimeframe: '7-10 days',
        notes,
        status: 'active',
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
            Target price: ${(auction.startingPrice / 100).toFixed(2)}
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
      return apiRequest('POST', '/api/chaintrack/auctions', {
        buyerId: userId,
        title: `${formData.deviceBrand} ${formData.deviceModel}`.trim(),
        description: formData.notes || `${formData.deviceBrand} ${formData.deviceModel} ${formData.storage || ''}`.trim(),
        productType: formData.deviceModel,
        quantity: parseInt(formData.quantity),
        condition: formData.condition,
        gradeRequired: null,
        startingPrice: Math.round(parseFloat(formData.targetPrice) * 100),
        reservePrice: Math.round(parseFloat(formData.targetPrice) * 100),
        endDate: new Date(formData.auctionEndDate),
        deliveryLocation: 'Dubai',
        paymentTerms: 'NET 30',
        status: 'active',
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
              placeholder="e.g., iPhone 17 Pro Max"
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

