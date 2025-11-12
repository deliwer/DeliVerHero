import { Gift, Share, Users } from "lucide-react";

export function TopBanner() {
  const generateAffiliateLink = () => {
    // Generate shareable referral link
    const baseUrl = 'https://deliwer.com/join';
    const referralCode = 'HERO' + Math.random().toString(36).substr(2, 6).toUpperCase();
    return `${baseUrl}?ref=${referralCode}`;
  };

  const handleShareOffer = () => {
    const affiliateLink = generateAffiliateLink();
    const shareText = `🍕 Chill & Grill: Get D100 voucher when you join DeliWer! Pizza + Boba Tea for Two just D99. Refer friends, earn rewards! Join me: ${affiliateLink}`;
    
    if (navigator.share) {
      navigator.share({
        title: 'Chill & Grill D100 Voucher',
        text: shareText,
        url: affiliateLink
      });
    } else {
      navigator.clipboard.writeText(shareText);
      alert('Link copied to clipboard! Share with friends to unlock rewards.');
    }
  };

  return (
    <div className="bg-gradient-to-r from-orange-600 via-red-600 to-pink-600 text-white py-2 px-4 text-center text-sm font-medium relative group">
      <div className="flex items-center justify-center gap-2">
        <Gift className="inline w-4 h-4" />
        <span>🍕 Chill & Grill: Get D100 voucher for each friend signup! Pizza + Boba Tea for Two</span>
        <button 
          onClick={handleShareOffer}
          className="ml-2 bg-black/20 hover:bg-black/30 px-2 py-1 rounded-full transition-colors flex items-center gap-1"
          title="Share & Earn with Friends"
        >
          <Share className="w-3 h-3" />
          <span className="text-xs font-bold">SHARE</span>
        </button>
      </div>
      
    </div>
  );
}
