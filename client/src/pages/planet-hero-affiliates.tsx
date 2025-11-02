import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { 
  Share2, 
  Copy, 
  Users, 
  TrendingUp, 
  DollarSign,
  CheckCircle,
  Gift,
  Award,
  Facebook,
  Twitter,
  MessageCircle,
  Mail,
  ExternalLink,
  Percent
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { SEOMeta } from "@/components/seo-meta";

export default function PlanetHeroAffiliates() {
  const { toast } = useToast();
  const [referralCode] = useState("HERO" + Math.random().toString(36).substring(2, 8).toUpperCase());
  const referralLink = `https://deliwer.com/signup?ref=${referralCode}`;

  const copyToClipboard = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    toast({
      title: "Copied!",
      description: `${label} copied to clipboard`,
    });
  };

  const shareToSocial = (platform: string) => {
    const shareText = `Join me on Planet Hero and earn rewards while making Dubai greener! Use my referral code: ${referralCode}`;
    const shareUrl = encodeURIComponent(referralLink);
    const shareTextEncoded = encodeURIComponent(shareText);

    const urls = {
      whatsapp: `https://wa.me/?text=${shareTextEncoded}%20${shareUrl}`,
      twitter: `https://twitter.com/intent/tweet?text=${shareTextEncoded}&url=${shareUrl}`,
      facebook: `https://www.facebook.com/sharer/sharer.php?u=${shareUrl}`,
      email: `mailto:?subject=Join%20Planet%20Hero&body=${shareTextEncoded}%20${shareUrl}`,
    };

    window.open(urls[platform as keyof typeof urls], '_blank');
  };

  const mockReferrals = [
    { id: 1, name: "Ahmed K.", date: "2025-11-01", status: "Active", earnings: 100 },
    { id: 2, name: "Sarah M.", date: "2025-10-28", status: "Active", earnings: 100 },
    { id: 3, name: "Mohammed A.", date: "2025-10-25", status: "Pending", earnings: 0 },
  ];

  return (
    <div className="min-h-screen bg-dubai-gradient">
      <SEOMeta 
        title="Affiliate Program - Earn by Sharing"
        description="Join the Planet Hero Affiliate Program and earn rewards by sharing sustainable missions with your network."
      />

      {/* Header */}
      <section className="py-12 px-4 bg-gradient-to-br from-purple-900/30 to-pink-900/30">
        <div className="max-w-6xl mx-auto text-center">
          <Badge className="mb-6 bg-purple-500/20 text-purple-400 border-purple-500/50 px-6 py-2 text-lg" data-testid="badge-affiliate">
            <Share2 className="w-5 h-5 mr-2 inline" />
            Affiliate Program
          </Badge>
          
          <h1 className="text-5xl md:text-6xl font-black text-white mb-6">
            Affiliate Program
            <span className="block text-purple-400 mt-2">Earn by Sharing</span>
          </h1>
          
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Share Planet Hero with your network and earn AED 100 for every successful referral. Help build a greener Dubai while earning passive income.
          </p>
        </div>
      </section>

      {/* Stats Overview */}
      <section className="py-12 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-3 gap-6">
            <Card className="glass border-purple-500/30 hover:shadow-xl hover:shadow-purple-500/20 transition-all" data-testid="card-total-referrals">
              <CardHeader className="text-center pb-3">
                <Users className="w-12 h-12 text-purple-500 mx-auto mb-3" />
                <CardTitle className="text-white text-lg">Total Referrals</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <div className="text-4xl font-black text-purple-400 mb-2" data-testid="text-total-referrals">
                  {mockReferrals.length}
                </div>
                <p className="text-gray-400 text-sm">Active & Pending</p>
              </CardContent>
            </Card>

            <Card className="glass border-hero-green-500/30 hover:shadow-xl hover:shadow-hero-green-500/20 transition-all" data-testid="card-total-earnings">
              <CardHeader className="text-center pb-3">
                <DollarSign className="w-12 h-12 text-hero-green-500 mx-auto mb-3" />
                <CardTitle className="text-white text-lg">Total Earnings</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <div className="text-4xl font-black text-hero-green-400 mb-2" data-testid="text-total-earnings">
                  AED {mockReferrals.reduce((sum, r) => sum + r.earnings, 0)}
                </div>
                <p className="text-gray-400 text-sm">From Referrals</p>
              </CardContent>
            </Card>

            <Card className="glass border-amber-500/30 hover:shadow-xl hover:shadow-amber-500/20 transition-all" data-testid="card-conversion-rate">
              <CardHeader className="text-center pb-3">
                <TrendingUp className="w-12 h-12 text-amber-500 mx-auto mb-3" />
                <CardTitle className="text-white text-lg">Conversion Rate</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <div className="text-4xl font-black text-amber-400 mb-2" data-testid="text-conversion-rate">
                  67%
                </div>
                <p className="text-gray-400 text-sm">2 of 3 Converted</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Referral Code Section */}
      <section className="py-12 px-4">
        <div className="max-w-4xl mx-auto">
          <Card className="glass border-hero-green-500/30 bg-gradient-to-br from-hero-green-900/10 to-emerald-900/10">
            <CardHeader>
              <CardTitle className="text-white text-2xl flex items-center">
                <Gift className="w-6 h-6 mr-3 text-hero-green-500" />
                Your Referral Tools
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Referral Code */}
              <div>
                <Label htmlFor="referral-code" className="text-white mb-2 block">Your Referral Code</Label>
                <div className="flex gap-2">
                  <Input 
                    id="referral-code"
                    value={referralCode}
                    readOnly
                    className="bg-slate-800 border-slate-600 text-white font-mono text-lg"
                    data-testid="input-referral-code"
                  />
                  <Button 
                    onClick={() => copyToClipboard(referralCode, "Referral code")}
                    className="bg-dubai-blue-600 hover:bg-dubai-blue-700"
                    data-testid="button-copy-code"
                  >
                    <Copy className="w-4 h-4 mr-2" />
                    Copy
                  </Button>
                </div>
              </div>

              {/* Referral Link */}
              <div>
                <Label htmlFor="referral-link" className="text-white mb-2 block">Your Unique Referral Link</Label>
                <div className="flex gap-2">
                  <Input 
                    id="referral-link"
                    value={referralLink}
                    readOnly
                    className="bg-slate-800 border-slate-600 text-white"
                    data-testid="input-referral-link"
                  />
                  <Button 
                    onClick={() => copyToClipboard(referralLink, "Referral link")}
                    className="bg-hero-green-600 hover:bg-hero-green-700"
                    data-testid="button-copy-link"
                  >
                    <Copy className="w-4 h-4 mr-2" />
                    Copy
                  </Button>
                </div>
              </div>

              {/* Social Sharing */}
              <div>
                <Label className="text-white mb-3 block">Share on Social Media</Label>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  <Button 
                    onClick={() => shareToSocial('whatsapp')}
                    className="bg-green-600 hover:bg-green-700"
                    data-testid="button-share-whatsapp"
                  >
                    <MessageCircle className="w-4 h-4 mr-2" />
                    WhatsApp
                  </Button>
                  <Button 
                    onClick={() => shareToSocial('twitter')}
                    className="bg-blue-500 hover:bg-blue-600"
                    data-testid="button-share-twitter"
                  >
                    <Twitter className="w-4 h-4 mr-2" />
                    Twitter
                  </Button>
                  <Button 
                    onClick={() => shareToSocial('facebook')}
                    className="bg-blue-700 hover:bg-blue-800"
                    data-testid="button-share-facebook"
                  >
                    <Facebook className="w-4 h-4 mr-2" />
                    Facebook
                  </Button>
                  <Button 
                    onClick={() => shareToSocial('email')}
                    className="bg-gray-700 hover:bg-gray-800"
                    data-testid="button-share-email"
                  >
                    <Mail className="w-4 h-4 mr-2" />
                    Email
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Commission Structure */}
      <section className="py-12 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-10">
            <h2 className="text-4xl font-black text-white mb-4">
              Commission Structure
            </h2>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Transparent and generous rewards for every successful referral
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <Card className="glass border-hero-green-500/30">
              <CardHeader>
                <div className="w-16 h-16 rounded-full bg-hero-green-500/20 flex items-center justify-center mx-auto mb-4">
                  <Percent className="w-8 h-8 text-hero-green-500" />
                </div>
                <CardTitle className="text-white text-center text-2xl">Per Referral</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <div className="text-5xl font-black text-hero-green-400 mb-4">AED 100</div>
                <p className="text-gray-300 mb-4">
                  Earn AED 100 for every person who signs up using your referral code and completes their first mission.
                </p>
                <Badge className="bg-hero-green-500/20 text-hero-green-400 border-hero-green-500/50">
                  Instant Payment
                </Badge>
              </CardContent>
            </Card>

            <Card className="glass border-amber-500/30">
              <CardHeader>
                <div className="w-16 h-16 rounded-full bg-amber-500/20 flex items-center justify-center mx-auto mb-4">
                  <Award className="w-8 h-8 text-amber-500" />
                </div>
                <CardTitle className="text-white text-center text-2xl">Bonus Rewards</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <div className="text-5xl font-black text-amber-400 mb-4">+20%</div>
                <p className="text-gray-300 mb-4">
                  Earn an additional 20% bonus when you refer 10+ active Planet Heroes in a month.
                </p>
                <Badge className="bg-amber-500/20 text-amber-400 border-amber-500/50">
                  Performance Bonus
                </Badge>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Referral History */}
      <section className="py-12 px-4">
        <div className="max-w-6xl mx-auto">
          <Card className="glass border-slate-600">
            <CardHeader>
              <CardTitle className="text-white text-2xl">Referral History</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full" data-testid="table-referrals">
                  <thead>
                    <tr className="border-b border-slate-700">
                      <th className="text-left text-gray-400 font-semibold py-3 px-4">Name</th>
                      <th className="text-left text-gray-400 font-semibold py-3 px-4">Date</th>
                      <th className="text-left text-gray-400 font-semibold py-3 px-4">Status</th>
                      <th className="text-right text-gray-400 font-semibold py-3 px-4">Earnings</th>
                    </tr>
                  </thead>
                  <tbody>
                    {mockReferrals.map((referral) => (
                      <tr key={referral.id} className="border-b border-slate-800 hover:bg-slate-800/50" data-testid={`row-referral-${referral.id}`}>
                        <td className="py-3 px-4 text-white">{referral.name}</td>
                        <td className="py-3 px-4 text-gray-400">{referral.date}</td>
                        <td className="py-3 px-4">
                          <Badge 
                            className={referral.status === "Active" 
                              ? "bg-hero-green-500/20 text-hero-green-400 border-hero-green-500/50" 
                              : "bg-amber-500/20 text-amber-400 border-amber-500/50"
                            }
                          >
                            {referral.status}
                          </Badge>
                        </td>
                        <td className="py-3 px-4 text-right text-hero-green-400 font-bold">
                          AED {referral.earnings}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-16 px-4 bg-gradient-to-br from-slate-900/50 to-slate-800/50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-black text-white mb-4">
              How the Affiliate Program Works
            </h2>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Simple, transparent, and rewarding
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-20 h-20 rounded-full bg-gradient-to-br from-purple-500 to-pink-600 flex items-center justify-center mx-auto mb-4 shadow-lg shadow-purple-500/50">
                <span className="text-3xl font-black text-white">1</span>
              </div>
              <h3 className="text-xl font-bold text-white mb-3">Share Your Link</h3>
              <p className="text-gray-400">
                Copy your unique referral link and share it with friends, family, or your social media audience.
              </p>
            </div>

            <div className="text-center">
              <div className="w-20 h-20 rounded-full bg-gradient-to-br from-hero-green-500 to-emerald-600 flex items-center justify-center mx-auto mb-4 shadow-lg shadow-hero-green-500/50">
                <span className="text-3xl font-black text-white">2</span>
              </div>
              <h3 className="text-xl font-bold text-white mb-3">They Sign Up</h3>
              <p className="text-gray-400">
                When someone signs up using your link and completes their first mission, you both earn rewards.
              </p>
            </div>

            <div className="text-center">
              <div className="w-20 h-20 rounded-full bg-gradient-to-br from-amber-500 to-orange-600 flex items-center justify-center mx-auto mb-4 shadow-lg shadow-amber-500/50">
                <span className="text-3xl font-black text-white">3</span>
              </div>
              <h3 className="text-xl font-bold text-white mb-3">Earn Commission</h3>
              <p className="text-gray-400">
                Receive AED 100 instantly to your account. No limits, no caps, just unlimited earning potential.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
