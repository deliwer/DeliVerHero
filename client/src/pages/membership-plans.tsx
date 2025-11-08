import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Link } from "wouter";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { 
  Check, 
  X, 
  TrendingUp, 
  Shield, 
  Zap, 
  Star, 
  Building2,
  DollarSign,
  ArrowRight,
  Calculator
} from "lucide-react";
import { ChaintrackMembershipTier } from "@shared/schema";

export default function MembershipPlansPage() {
  const [monthlyVolume, setMonthlyVolume] = useState(10000);
  const [avgOrderValue, setAvgOrderValue] = useState(500);

  const { data: tiers, isLoading } = useQuery<ChaintrackMembershipTier[]>({
    queryKey: ['/api/memberships/tiers'],
  });

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
          <p className="mt-4 text-muted-foreground">Loading membership plans...</p>
        </div>
      </div>
    );
  }

  const ordersPerMonth = Math.floor(monthlyVolume / avgOrderValue);
  const devicesPerMonth = ordersPerMonth;

  const calculateROI = (tier: ChaintrackMembershipTier) => {
    const monthlyFee = tier.monthlyFeeUSD / 100;
    const transactionFees = (monthlyVolume * tier.transactionFeePercent) / 10000;
    const totalCost = monthlyFee + transactionFees;
    const costPerDevice = devicesPerMonth > 0 ? totalCost / devicesPerMonth : 0;
    const savingsVsOnDemand = tiers && tiers.length > 0 
      ? (monthlyVolume * ((tiers[0].transactionFeePercent || 50) - tier.transactionFeePercent)) / 10000
      : 0;
    
    return {
      monthlyFee,
      transactionFees,
      totalCost,
      costPerDevice,
      savingsVsOnDemand
    };
  };

  const sortedTiers = tiers ? [...tiers].sort((a, b) => (a.priority || 0) - (b.priority || 0)) : [];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-slate-100 dark:from-slate-950 dark:via-blue-950 dark:to-slate-900">
      <div className="container mx-auto px-4 py-16">
        {/* Hero Section */}
        <div className="text-center max-w-4xl mx-auto mb-16">
          <Badge className="mb-4" variant="outline" data-testid="badge-membership">
            <Star className="w-3 h-3 mr-1" />
            ChainTrack Membership Plans
          </Badge>
          <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400 bg-clip-text text-transparent">
            Choose Your Plan
          </h1>
          <p className="text-xl text-slate-600 dark:text-slate-400 mb-4">
            Flexible pricing for wholesale buyers of all sizes
          </p>
          <p className="text-lg text-slate-500 dark:text-slate-500">
            Lower fees, more features, better support as you scale
          </p>
        </div>

        {/* ROI Calculator */}
        <Card className="max-w-4xl mx-auto mb-12 p-6 bg-gradient-to-r from-purple-50 to-blue-50 dark:from-purple-950/20 dark:to-blue-950/20 border-2 border-purple-300 dark:border-purple-700">
          <div className="flex items-center gap-3 mb-6">
            <Calculator className="w-8 h-8 text-purple-600 dark:text-purple-400" />
            <div>
              <h3 className="text-2xl font-bold">ROI Calculator</h3>
              <p className="text-sm text-muted-foreground">See how much you save based on your volume</p>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <Label>Monthly Order Volume (USD)</Label>
              <Input
                type="number"
                value={monthlyVolume}
                onChange={(e) => setMonthlyVolume(parseInt(e.target.value) || 0)}
                placeholder="10000"
                data-testid="input-monthly-volume"
              />
              <p className="text-xs text-muted-foreground mt-1">Total value of orders per month</p>
            </div>
            <div>
              <Label>Average Order Value (USD)</Label>
              <Input
                type="number"
                value={avgOrderValue}
                onChange={(e) => setAvgOrderValue(parseInt(e.target.value) || 1)}
                placeholder="500"
                data-testid="input-avg-order-value"
              />
              <p className="text-xs text-muted-foreground mt-1">Average per order</p>
            </div>
          </div>

          <div className="mt-4 p-4 bg-white dark:bg-slate-900 rounded-lg">
            <div className="grid md:grid-cols-3 gap-4 text-center">
              <div>
                <div className="text-sm text-muted-foreground">Orders/Month</div>
                <div className="text-2xl font-bold text-primary">{ordersPerMonth}</div>
              </div>
              <div>
                <div className="text-sm text-muted-foreground">Devices/Month</div>
                <div className="text-2xl font-bold text-primary">{devicesPerMonth}</div>
              </div>
              <div>
                <div className="text-sm text-muted-foreground">Volume</div>
                <div className="text-2xl font-bold text-primary">${monthlyVolume.toLocaleString()}</div>
              </div>
            </div>
          </div>
        </Card>

        {/* Tier Comparison */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6 mb-12">
          {sortedTiers.map((tier) => {
            const roi = calculateROI(tier);
            const isRecommended = tier.badgeText?.includes("Popular") || tier.badgeText?.includes("Best Value");
            const meetsMinimum = devicesPerMonth >= tier.minDevicesPerMonth;

            return (
              <Card 
                key={tier.id} 
                className={`relative ${isRecommended ? 'border-2 border-primary shadow-xl scale-105' : ''}`}
                data-testid={`card-tier-${tier.tierCode}`}
              >
                {tier.badgeText && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                    <Badge 
                      style={{ backgroundColor: tier.badgeColor || undefined }}
                      className="text-white"
                    >
                      {tier.badgeText}
                    </Badge>
                  </div>
                )}

                <CardHeader className="text-center">
                  <CardTitle className="text-2xl">{tier.tierName}</CardTitle>
                  <CardDescription>
                    {tier.minDevicesPerMonth > 0 
                      ? `${tier.minDevicesPerMonth.toLocaleString()}+ devices/mo`
                      : "No minimum"
                    }
                  </CardDescription>
                  
                  <div className="mt-4">
                    <div className="text-4xl font-bold">
                      ${(tier.monthlyFeeUSD / 100).toLocaleString()}
                    </div>
                    <div className="text-sm text-muted-foreground">/month</div>
                    <div className="text-xs text-muted-foreground mt-1">
                      + {(tier.transactionFeePercent / 100).toFixed(2)}% per transaction
                    </div>
                  </div>
                </CardHeader>

                <CardContent className="space-y-4">
                  {/* ROI for this tier */}
                  <div className="p-3 bg-slate-50 dark:bg-slate-800 rounded-lg space-y-2">
                    <div className="text-xs text-muted-foreground">Your Cost Estimate:</div>
                    <div className="flex justify-between text-sm">
                      <span>Monthly Fee:</span>
                      <span className="font-semibold">${roi.monthlyFee.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Transaction Fees:</span>
                      <span className="font-semibold">${roi.transactionFees.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-sm font-bold border-t pt-2">
                      <span>Total Monthly:</span>
                      <span className="text-primary">${roi.totalCost.toFixed(2)}</span>
                    </div>
                    {roi.savingsVsOnDemand > 0 && (
                      <div className="text-xs text-green-600 dark:text-green-400 flex items-center gap-1">
                        <TrendingUp className="w-3 h-3" />
                        Save ${roi.savingsVsOnDemand.toFixed(2)}/mo vs Pay-As-You-Go
                      </div>
                    )}
                  </div>

                  {/* Features */}
                  <div className="space-y-2">
                    {(tier.features as string[] || []).map((feature, idx) => (
                      <div key={idx} className="flex items-start gap-2 text-sm">
                        <Check className="w-4 h-4 text-green-600 dark:text-green-400 mt-0.5 shrink-0" />
                        <span>{feature}</span>
                      </div>
                    ))}
                  </div>

                  {!meetsMinimum && tier.minDevicesPerMonth > 0 && (
                    <div className="p-3 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg border border-yellow-200 dark:border-yellow-800">
                      <div className="text-xs text-yellow-800 dark:text-yellow-200 flex items-center gap-1">
                        <X className="w-3 h-3" />
                        Volume too low for this tier
                      </div>
                    </div>
                  )}

                  <Link href="/signup">
                    <Button 
                      className="w-full gap-2"
                      variant={isRecommended ? "default" : "outline"}
                      disabled={!meetsMinimum && tier.minDevicesPerMonth > 0}
                      data-testid={`button-select-${tier.tierCode}`}
                    >
                      {tier.monthlyFeeUSD === 0 ? "Start Free" : "Subscribe Now"}
                      <ArrowRight className="w-4 h-4" />
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Trust Indicators */}
        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          <div className="text-center">
            <Shield className="w-12 h-12 text-blue-600 dark:text-blue-400 mx-auto mb-4" />
            <h3 className="font-bold mb-2">Escrow Protection</h3>
            <p className="text-sm text-muted-foreground">All transactions secured with escrow</p>
          </div>
          <div className="text-center">
            <Zap className="w-12 h-12 text-purple-600 dark:text-purple-400 mx-auto mb-4" />
            <h3 className="font-bold mb-2">24-48h Processing</h3>
            <p className="text-sm text-muted-foreground">Fast order fulfillment and shipping</p>
          </div>
          <div className="text-center">
            <Building2 className="w-12 h-12 text-green-600 dark:text-green-400 mx-auto mb-4" />
            <h3 className="font-bold mb-2">Verified Suppliers</h3>
            <p className="text-sm text-muted-foreground">200+ KYC-verified global suppliers</p>
          </div>
        </div>
      </div>
    </div>
  );
}
