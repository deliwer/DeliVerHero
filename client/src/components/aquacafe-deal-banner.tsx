import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Gift, Share2, Copy, CheckCircle, QrCode } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useMutation, useQuery } from "@tanstack/react-query";
import { apiRequest, queryClient } from "@/lib/queryClient";
import { DirhamSymbol } from "@/components/dirham-symbol";

export function AquaCafeDealBanner() {
  const { toast } = useToast();
  const [claimedVoucher, setClaimedVoucher] = useState<any>(null);
  const [copied, setCopied] = useState(false);

  // Get user's referral link (assuming we have user context)
  const referralCode = "HERO123"; // TODO: Get from user context
  const referralLink = `${window.location.origin}/aquacafe-deal?ref=${referralCode}`;

  const claimVoucherMutation = useMutation({
    mutationFn: () => apiRequest('/api/vouchers/claim-deal', 'POST', {
      dealType: 'chill-grill-pizza-boba-tea',
    }),
    onSuccess: (data) => {
      setClaimedVoucher(data);
      toast({
        title: "Voucher Claimed! 🎉",
        description: "Your Chill & Grill voucher code is ready to use!",
      });
      queryClient.invalidateQueries({ queryKey: ['/api/vouchers/my-vouchers'] });
    },
    onError: () => {
      toast({
        title: "Claim Failed",
        description: "Please try again or contact support.",
        variant: "destructive",
      });
    },
  });

  const handleCopyReferralLink = () => {
    navigator.clipboard.writeText(referralLink);
    setCopied(true);
    toast({
      title: "Link Copied!",
      description: "Share with friends to earn rewards",
    });
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section className="w-full py-16 px-4 bg-gradient-to-br from-orange-600 via-red-600 to-pink-600 relative overflow-hidden" data-testid="section-aquacafe-deal">
      {/* Background pattern */}
      <div className="absolute inset-0 bg-black/10"></div>
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmZmZmYiIGZpbGwtb3BhY2l0eT0iMC4wNSI+PHBhdGggZD0iTTM2IDM0djItaDJ2LTJoLTJ6bTAtNHYyaDJ2LTJoLTJ6bTAtNHYyaDJ2LTJoLTJ6Ii8+PC9nPjwvZz48L3N2Zz4=')] opacity-20"></div>
      
      <div className="relative max-w-6xl mx-auto">
        <Card className="bg-white/95 backdrop-blur-sm border-4 border-orange-400 shadow-2xl overflow-hidden">
          <div className="grid md:grid-cols-2 gap-6 p-6 md:p-8">
            {/* Left: Deal Information */}
            <div className="space-y-6">
              <div>
                <Badge className="bg-green-600 text-white mb-3 text-sm px-3 py-1" data-testid="badge-loyalty-deal">
                  🌊 AquaCafe Loyalty Deal
                </Badge>
                <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-3" data-testid="text-deal-title">
                  Chill & Grill
                </h2>
                <p className="text-2xl text-gray-700 mb-2">
                  Pizza + Boba Tea for Two
                </p>
                <div className="flex items-center gap-2 text-gray-600 text-sm mb-4">
                  <span>Healthy and refreshing meal if you refer one friend</span>
                </div>
              </div>

              {/* Price Display */}
              <div className="flex items-baseline gap-3">
                <div className="flex items-center gap-2">
                  <DirhamSymbol size={32} className="text-orange-600" />
                  <span className="text-5xl font-bold text-orange-600" data-testid="text-price">99</span>
                </div>
                <span className="text-gray-500 text-lg">for two persons</span>
              </div>

              {/* Images Preview */}
              <div className="grid grid-cols-3 gap-3">
                <div className="aspect-square rounded-lg overflow-hidden bg-gray-100 flex items-center justify-center text-4xl">
                  🍕
                </div>
                <div className="aspect-square rounded-lg overflow-hidden bg-gray-100 flex items-center justify-center text-4xl">
                  🍨
                </div>
                <div className="aspect-square rounded-lg overflow-hidden bg-gray-100 flex items-center justify-center text-4xl">
                  🥤
                </div>
              </div>

              <p className="text-sm text-gray-600">
                Show your generated code at Aqua Cafe to redeem. Limited time offer. T&C apply.
              </p>
            </div>

            {/* Right: Action Buttons */}
            <div className="flex flex-col justify-center space-y-4">
              {!claimedVoucher ? (
                <>
                  <Button
                    size="lg"
                    onClick={() => claimVoucherMutation.mutate()}
                    disabled={claimVoucherMutation.isPending}
                    className="w-full h-16 text-xl font-bold bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-700 hover:to-red-700"
                    data-testid="button-claim-deal"
                  >
                    <Gift className="w-6 h-6 mr-2" />
                    {claimVoucherMutation.isPending ? "Claiming..." : "Claim Deal"}
                  </Button>
                  
                  <Button
                    variant="outline"
                    size="lg"
                    onClick={() => window.open('https://www.deliwer.com/aquacafe', '_blank')}
                    className="w-full h-14 text-lg border-2 border-gray-300"
                    data-testid="button-visit-aquacafe"
                  >
                    Visit deliwer.com/aquacafe
                  </Button>
                </>
              ) : (
                <div className="bg-green-50 border-2 border-green-500 rounded-xl p-6 space-y-4" data-testid="container-claimed-voucher">
                  <div className="flex items-center gap-2 text-green-700">
                    <CheckCircle className="w-6 h-6" />
                    <span className="font-bold text-lg">Voucher Claimed!</span>
                  </div>
                  <div className="bg-white rounded-lg p-4 border border-green-200">
                    <p className="text-sm text-gray-600 mb-2">Your Code:</p>
                    <p className="text-3xl font-mono font-bold text-center tracking-wider text-gray-900" data-testid="text-voucher-code">
                      {claimedVoucher.code}
                    </p>
                  </div>
                  <Button
                    variant="outline"
                    className="w-full"
                    data-testid="button-view-qr"
                  >
                    <QrCode className="w-5 h-5 mr-2" />
                    View QR Code
                  </Button>
                </div>
              )}

              <div className="pt-4 border-t border-gray-200">
                <p className="text-sm font-semibold text-gray-700 mb-3">
                  🎁 Refer friends, earn <DirhamSymbol size={12} className="inline mx-1" />100 per signup!
                </p>
                <Button
                  variant="outline"
                  size="lg"
                  onClick={handleCopyReferralLink}
                  className="w-full h-12 border-2 border-blue-300 hover:bg-blue-50"
                  data-testid="button-copy-referral"
                >
                  {copied ? (
                    <>
                      <CheckCircle className="w-5 h-5 mr-2 text-green-600" />
                      Copied!
                    </>
                  ) : (
                    <>
                      <Copy className="w-5 h-5 mr-2" />
                      Copy referral link
                    </>
                  )}
                </Button>
              </div>
            </div>
          </div>
        </Card>

        {/* Branding Note */}
        <p className="text-center text-white/90 text-sm mt-4">
          <span className="font-semibold">AquaCafe</span> by DeliWer • <span className="font-semibold">Chill & Grill</span> Ghost Kitchen by DeliWer
        </p>
      </div>
    </section>
  );
}
