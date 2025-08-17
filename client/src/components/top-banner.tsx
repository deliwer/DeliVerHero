import { Gift, Share, Users } from "lucide-react";

export function TopBanner() {
  const generateAffiliateLink = () => {
    // GOAFFPRO integration: Generate shareable affiliate link
    const baseUrl = 'https://deliwer.com/join';
    const referralCode = 'HERO' + Math.random().toString(36).substr(2, 6).toUpperCase();
    return `${baseUrl}?ref=${referralCode}`;
  };

  const handleShareOffer = () => {
    const affiliateLink = generateAffiliateLink();
    const shareText = `🎁 Welcome Bonus: Get Bakers Kitchen AED100 Kangen Water voucher when you join DeliWer! 💧 World's First Sustainability Game - Trade iPhones for premium water systems while earning Planet Hero status! Join me: ${affiliateLink}`;
    
    if (navigator.share) {
      navigator.share({
        title: 'DeliWer Bakers Kitchen Bonus',
        text: shareText,
        url: affiliateLink
      });
    } else {
      navigator.clipboard.writeText(shareText);
      alert('Link copied to clipboard! Share with friends to unlock rewards.');
    }
  };

  return (
    <div className="bg-gradient-to-r from-amber-500 to-orange-500 text-black py-2 px-4 text-center text-sm font-medium relative group">
      <div className="flex items-center justify-center gap-2">
        <Gift className="inline w-4 h-4" />
        <span>Welcome Bonus: Get Bakers Kitchen AED100 Kangen Water voucher when a friend signs up!</span>
        <button 
          onClick={handleShareOffer}
          className="ml-2 bg-black/20 hover:bg-black/30 px-2 py-1 rounded-full transition-colors flex items-center gap-1"
          title="Share & Earn with GOAFFPRO"
        >
          <Share className="w-3 h-3" />
          <span className="text-xs font-bold">SHARE</span>
        </button>
      </div>
      
    </div>
  );
}
