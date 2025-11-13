import { useState } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { 
  Ticket, 
  Calendar, 
  CheckCircle, 
  Clock, 
  AlertCircle, 
  Gift,
  Sparkles,
  Store,
  Percent,
  QrCode
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/hooks/use-toast";
import { apiRequest, queryClient } from "@/lib/queryClient";
import type { IssuedCoupon, CouponTemplate } from "@shared/schema";

interface CouponsPanelProps {
  heroId: string;
  theme?: "aquacafe" | "default";
  showTitle?: boolean;
}

export function CouponsPanel({ heroId, theme = "default", showTitle = true }: CouponsPanelProps) {
  const [selectedCoupon, setSelectedCoupon] = useState<IssuedCoupon | null>(null);
  const [redemptionLocation, setRedemptionLocation] = useState("");
  const [isRedemptionOpen, setIsRedemptionOpen] = useState(false);
  const { toast } = useToast();

  const isAquaCafe = theme === "aquacafe";

  // Fetch issued coupons for hero
  const { data: couponsData, isLoading, refetch } = useQuery<IssuedCoupon[]>({
    queryKey: ['/api/coupons/issued', heroId],
    queryFn: () => fetch(`/api/coupons/issued/${heroId}`).then(res => res.json()),
    enabled: !!heroId,
  });
  
  const coupons = Array.isArray(couponsData) ? couponsData : [];

  // Fetch coupon templates for reference
  const { data: templatesData } = useQuery<CouponTemplate[]>({
    queryKey: ['/api/coupons/templates'],
  });
  
  const templates = Array.isArray(templatesData) ? templatesData : [];

  // Redeem coupon mutation
  const redeemMutation = useMutation<IssuedCoupon, Error, { couponId: string; heroId: string; location: string }>({
    mutationFn: async (data) => {
      const response = await fetch('/api/coupons/redeem', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || 'Redemption failed');
      }
      return response.json();
    },
    onSuccess: (data) => {
      toast({
        title: "Coupon Redeemed!",
        description: "Your digital coupon has been successfully redeemed.",
        variant: "default",
      });
      
      // Invalidate and refetch coupons
      queryClient.invalidateQueries({ queryKey: ['/api/coupons/issued', heroId] });
      refetch();
      setSelectedCoupon(null);
      setRedemptionLocation("");
      setIsRedemptionOpen(false);
    },
    onError: (error: any) => {
      toast({
        title: "Redemption Failed",
        description: error.message || "Unable to redeem coupon",
        variant: "destructive",
      });
    },
  });

  const handleRedeemCoupon = () => {
    if (!selectedCoupon) return;
    
    redeemMutation.mutate({
      couponId: selectedCoupon.id,
      heroId,
      location: redemptionLocation || "Online",
    });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return isAquaCafe ? 'bg-cyan-500' : 'bg-emerald-500';
      case 'redeemed': return 'bg-gray-500';
      case 'expired': return 'bg-red-500';
      case 'cancelled': return 'bg-orange-500';
      default: return 'bg-gray-500';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'active': return <CheckCircle className="w-4 h-4" />;
      case 'redeemed': return <Gift className="w-4 h-4" />;
      case 'expired': return <Clock className="w-4 h-4" />;
      case 'cancelled': return <AlertCircle className="w-4 h-4" />;
      default: return <Ticket className="w-4 h-4" />;
    }
  };

  const isExpired = (coupon: IssuedCoupon) => {
    return new Date() > new Date(coupon.expiresAt);
  };

  const formatDate = (dateString: string | Date) => {
    const date = typeof dateString === 'string' ? new Date(dateString) : dateString;
    return date.toLocaleDateString('en-AE', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  const formatCurrency = (amount: number) => {
    return `AED ${(amount / 100).toFixed(2)}`;
  };

  // Find template for coupon
  const getTemplate = (coupon: IssuedCoupon): CouponTemplate | undefined => {
    return templates.find(t => t.id === coupon.templateId);
  };

  if (isLoading) {
    return (
      <Card className={`${isAquaCafe ? 'glass border-cyan-500/30' : 'glass border-slate-600'}`}>
        <CardContent className="p-6">
          <div className="animate-pulse space-y-4">
            <div className="h-6 bg-slate-700 rounded w-1/3"></div>
            <div className="space-y-3">
              {[...Array(3)].map((_, i) => (
                <div key={i} className="h-20 bg-slate-700 rounded"></div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className={`${isAquaCafe ? 'glass border-cyan-500/30 bg-gradient-to-br from-cyan-950/50 to-blue-950/50' : 'glass border-slate-600'}`} data-testid="coupons-panel">
      {showTitle && (
        <CardHeader className="pb-4">
          <CardTitle className={`text-center ${isAquaCafe ? 'text-cyan-100' : 'text-white'} text-xl`}>
            <div className="flex items-center justify-center gap-2">
              <Ticket className={`w-5 h-5 ${isAquaCafe ? 'text-cyan-400' : 'text-emerald-400'}`} />
              Digital Coupons Wallet
              <Sparkles className={`w-5 h-5 ${isAquaCafe ? 'text-cyan-400' : 'text-emerald-400'}`} />
            </div>
          </CardTitle>
        </CardHeader>
      )}

      <CardContent className="p-6">
        {coupons.length === 0 ? (
          <div className={`text-center py-8 ${isAquaCafe ? 'text-cyan-200' : 'text-gray-300'}`}>
            <Ticket className={`w-12 h-12 mx-auto mb-4 ${isAquaCafe ? 'text-cyan-400' : 'text-gray-400'}`} />
            <p className="text-lg font-medium mb-2">No Digital Coupons Yet</p>
            <p className="text-sm">Spin the tombola to win amazing coupons!</p>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className={`text-sm ${isAquaCafe ? 'text-cyan-300' : 'text-gray-300'}`}>
                {coupons.length} coupon{coupons.length !== 1 ? 's' : ''} in wallet
              </span>
              <Badge variant="secondary" className={`${isAquaCafe ? 'bg-cyan-500/20 text-cyan-200' : ''}`}>
                {coupons.filter((c: IssuedCoupon) => c.status === 'active' && !isExpired(c)).length} active
              </Badge>
            </div>

            <div className="grid gap-4">
              {coupons.map((coupon) => {
                const template = getTemplate(coupon);
                const expired = isExpired(coupon);
                const canRedeem = coupon.status === 'active' && !expired;

                return (
                  <Card 
                    key={coupon.id} 
                    className={`relative overflow-hidden border-2 transition-all hover:scale-[1.02] ${
                      canRedeem 
                        ? (isAquaCafe ? 'border-cyan-400/50 bg-gradient-to-r from-cyan-950/50 to-blue-950/50' : 'border-emerald-400/50 bg-gradient-to-r from-emerald-950/50 to-teal-950/50')
                        : 'border-gray-600/50 bg-gray-800/50'
                    }`}
                    data-testid={`coupon-${coupon.id}`}
                  >
                    {/* Coupon Header */}
                    <CardHeader className="pb-3">
                      <div className="flex justify-between items-start">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <Store className="w-4 h-4 text-blue-400" />
                            <span className="text-sm font-medium text-blue-400">
                              {template?.brand || 'AquaCafe'}
                            </span>
                            <Badge 
                              className={`${getStatusColor(coupon.status)} text-white text-xs`}
                            >
                              {getStatusIcon(coupon.status)}
                              <span className="ml-1 capitalize">{coupon.status}</span>
                            </Badge>
                          </div>
                          <h3 className={`font-bold text-lg ${isAquaCafe ? 'text-cyan-100' : 'text-white'}`}>
                            {template?.title || 'Digital Coupon'}
                          </h3>
                        </div>
                        
                        {/* Value Display */}
                        {template && (
                          <div className="text-right">
                            {template.faceValue > 0 && (
                              <div className={`text-2xl font-bold ${canRedeem ? (isAquaCafe ? 'text-cyan-400' : 'text-emerald-400') : 'text-gray-400'}`}>
                                {formatCurrency(template.faceValue)}
                              </div>
                            )}
                            {template.discountPercent && (
                              <div className={`text-xl font-bold ${canRedeem ? (isAquaCafe ? 'text-cyan-400' : 'text-emerald-400') : 'text-gray-400'} flex items-center gap-1`}>
                                <Percent className="w-4 h-4" />
                                {template.discountPercent}% OFF
                              </div>
                            )}
                          </div>
                        )}
                      </div>
                    </CardHeader>

                    <CardContent className="pt-0">
                      {/* Description */}
                      <p className={`text-sm mb-3 ${isAquaCafe ? 'text-cyan-200' : 'text-gray-300'}`}>
                        {template?.description || 'Digital reward coupon'}
                      </p>

                      {/* Coupon Details */}
                      <div className="space-y-2 mb-4">
                        {template?.minPurchase && (
                          <div className={`text-xs ${isAquaCafe ? 'text-cyan-300' : 'text-gray-400'}`}>
                            Minimum purchase: {formatCurrency(template.minPurchase)}
                          </div>
                        )}
                        
                        <div className="flex justify-between items-center text-xs">
                          <span className={`flex items-center gap-1 ${isAquaCafe ? 'text-cyan-300' : 'text-gray-400'}`}>
                            <Calendar className="w-3 h-3" />
                            Expires: {formatDate(coupon.expiresAt)}
                          </span>
                          
                          {coupon.usedCount > 0 && (
                            <span className={`${isAquaCafe ? 'text-cyan-300' : 'text-gray-400'}`}>
                              Used: {coupon.usedCount}/{template?.usageLimit || 1}
                            </span>
                          )}
                        </div>

                        {coupon.redeemedAt && (
                          <div className={`text-xs ${isAquaCafe ? 'text-cyan-300' : 'text-gray-400'}`}>
                            Redeemed: {formatDate(coupon.redeemedAt.toString())}
                            {coupon.redemptionLocation && ` at ${coupon.redemptionLocation}`}
                          </div>
                        )}
                      </div>

                      <Separator className="mb-4" />

                      {/* Action Buttons */}
                      <div className="flex gap-2">
                        {canRedeem ? (
                          <Dialog open={isRedemptionOpen} onOpenChange={setIsRedemptionOpen}>
                            <DialogTrigger asChild>
                              <Button
                                className={`flex-1 ${isAquaCafe 
                                  ? 'bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500' 
                                  : 'bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500'
                                } text-white font-medium`}
                                onClick={() => {
                                  setSelectedCoupon(coupon);
                                  setIsRedemptionOpen(true);
                                }}
                                data-testid={`button-redeem-${coupon.id}`}
                              >
                                <QrCode className="w-4 h-4 mr-2" />
                                Redeem Now
                              </Button>
                            </DialogTrigger>
                            <DialogContent className={`max-w-md ${isAquaCafe ? 'bg-slate-900 border-cyan-500/30' : 'bg-slate-900 border-slate-700'}`}>
                              <DialogHeader>
                                <DialogTitle className={`${isAquaCafe ? 'text-cyan-100' : 'text-white'}`}>
                                  Redeem Digital Coupon
                                </DialogTitle>
                              </DialogHeader>
                              
                              <div className="space-y-4">
                                <div className={`p-4 rounded-lg ${isAquaCafe ? 'bg-cyan-900/30 border border-cyan-500/30' : 'bg-slate-800 border border-slate-600'}`}>
                                  <h4 className={`font-semibold mb-2 ${isAquaCafe ? 'text-cyan-100' : 'text-white'}`}>
                                    {template?.title}
                                  </h4>
                                  <p className={`text-sm mb-2 ${isAquaCafe ? 'text-cyan-200' : 'text-gray-300'}`}>
                                    {template?.description}
                                  </p>
                                  <div className={`text-lg font-bold ${isAquaCafe ? 'text-cyan-400' : 'text-emerald-400'}`}>
                                    Code: {coupon.couponCode}
                                  </div>
                                </div>

                                <div className="space-y-2">
                                  <Label htmlFor="location" className={`${isAquaCafe ? 'text-cyan-200' : 'text-gray-200'}`}>
                                    Redemption Location (Optional)
                                  </Label>
                                  <Input
                                    id="location"
                                    value={redemptionLocation}
                                    onChange={(e) => setRedemptionLocation(e.target.value)}
                                    placeholder="Online, Store location, etc."
                                    className={`${isAquaCafe ? 'bg-cyan-950/50 border-cyan-500/30 text-cyan-100' : 'bg-slate-800 border-slate-600 text-white'}`}
                                    data-testid="input-redemption-location"
                                  />
                                </div>

                                <Button
                                  onClick={handleRedeemCoupon}
                                  disabled={redeemMutation.isPending}
                                  className={`w-full ${isAquaCafe 
                                    ? 'bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500' 
                                    : 'bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500'
                                  } text-white font-medium`}
                                  data-testid="button-confirm-redeem"
                                >
                                  {redeemMutation.isPending ? (
                                    <>
                                      <Sparkles className="w-4 h-4 mr-2 animate-spin" />
                                      Redeeming...
                                    </>
                                  ) : (
                                    <>
                                      <CheckCircle className="w-4 h-4 mr-2" />
                                      Confirm Redemption
                                    </>
                                  )}
                                </Button>
                              </div>
                            </DialogContent>
                          </Dialog>
                        ) : (
                          <Button
                            disabled
                            variant="outline"
                            className="flex-1 border-gray-600 text-gray-400"
                            data-testid={`button-unavailable-${coupon.id}`}
                          >
                            {expired ? 'Expired' : coupon.status === 'redeemed' ? 'Already Used' : 'Unavailable'}
                          </Button>
                        )}
                      </div>
                    </CardContent>

                    {/* Coupon Pattern Decoration */}
                    <div className="absolute top-0 right-0 w-16 h-16 opacity-10">
                      <div className="absolute inset-0 bg-gradient-to-br from-white to-transparent transform rotate-45"></div>
                    </div>
                  </Card>
                );
              })}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}