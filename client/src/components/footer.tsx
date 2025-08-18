import { Link } from "wouter";
import { 
  Phone, 
  Mail, 
  MapPin, 
  Twitter, 
  Instagram, 
  Linkedin, 
  Youtube,
  Shield,
  Zap,
  Recycle,
  Users,
  Star,
  Heart,
  ChevronRight,
  Building,
  Award,
  Sparkles,
  Globe
} from "lucide-react";
import { SiFacebook, SiTiktok } from "react-icons/si";

export function Footer() {
  const currentYear = new Date().getFullYear();



  const quickLinks = [
    { label: "Trade-in iPhone Calculator", url: "/" },
    { label: "AquaCafe Planet Hero Program", url: "/aquacafe" },
    { label: "Planet Heroes Leaderboard", url: "/leaderboard" },
    { label: "Impact & Rewards Dashboard", url: "/impact-dashboard" },
    { label: "Community Hub", url: "/community" },
    { label: "Ambassador & Champion Programs", url: "/partners" }
  ];

  const sponsorshipTiers = [
    { name: "Bronze Sponsor", amount: "AED 500+", impact: "Fund 5 missions", color: "text-amber-600" },
    { name: "Silver Sponsor", amount: "AED 1,500+", impact: "Fund 15 missions", color: "text-gray-400" },
    { name: "Gold Sponsor", amount: "AED 5,000+", impact: "Fund 50 missions", color: "text-yellow-500" },
    { name: "Platinum Sponsor", amount: "AED 15,000+", impact: "Fund 150 missions", color: "text-purple-400" }
  ];

  const partnershipPrograms = [
    { label: "Delivery Agent Program", earnings: "AED 150-300/day" },
    { label: "Eco-Recycling Partner", earnings: "AED 50-150/device" },
    { label: "Restaurant Collection", earnings: "10% commission" },
    { label: "Community Ambassador", earnings: "Token rewards" }
  ];

  const socialLinks = [
    { icon: SiFacebook, url: "https://facebook.com/deliwer", label: "Facebook" },
    { icon: Instagram, url: "https://instagram.com/vdeliwer", label: "Instagram" },
    { icon: Youtube, url: "https://youtube.com/@vdeliwer", label: "YouTube" },
    { icon: SiTiktok, url: "https://tiktok.com/@vdeliwer", label: "TikTok" },
    { icon: Twitter, url: "https://twitter.com/vdeliwer", label: "Twitter" },
    { icon: Linkedin, url: "https://linkedin.com/company/deliwer", label: "LinkedIn" }
  ];

  return (
    <footer className="bg-slate-900 border-t border-slate-700">
      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 py-16">
        {/* Highlighted Sponsorship Banner */}


        <div className="grid lg:grid-cols-3 md:grid-cols-2 gap-12">
          
          {/* Brand & Mission */}
          <div className="lg:col-span-1">
            <div className="flex items-center mb-6">
              <span className="text-2xl font-bold text-white">DeliWer</span>
              <span className="ml-2 bg-hero-green-500 text-black px-2 py-1 rounded-full text-xs font-bold">
                HEROES
              </span>
            </div>
            
            <p className="text-gray-300 mb-6 leading-relaxed">
              World's First Sustainability Game. Trade your iPhone for premium water systems while earning Planet Hero status and contributing to Dubai's environmental missions.
            </p>
            
            <div className="space-y-3 mb-6">
              <div className="flex items-center text-sm text-emerald-400 font-semibold">
                <Shield className="w-4 h-4 mr-2 text-emerald-500" />
                We support Dubaican Initiative
              </div>
              <div className="flex items-center text-sm text-gray-400">
                <Zap className="w-4 h-4 mr-2 text-amber-500" />
                2.4M+ Bottles Prevented
              </div>
              <div className="flex items-center text-sm text-gray-400">
                <Users className="w-4 h-4 mr-2 text-dubai-blue-500" />
                12,847 Planet Heroes
              </div>
            </div>

            {/* Social Links */}
            <div className="flex space-x-4">
              {socialLinks.map(({ icon: Icon, url, label }) => (
                <a
                  key={label}
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 bg-slate-800 hover:bg-slate-700 rounded-lg flex items-center justify-center transition-colors group"
                  aria-label={label}
                >
                  <Icon className="w-5 h-5 text-gray-400 group-hover:text-white" />
                </a>
              ))}
            </div>
          </div>



          {/* Quick Navigation */}
          <div>
            <h3 className="text-lg font-bold text-white mb-6 flex items-center">
              <Globe className="w-5 h-5 mr-2 text-hero-green-500" />
              Platform Navigation
            </h3>
            
            <div className="space-y-3">
              {quickLinks.map((link, index) => (
                <Link
                  key={index}
                  href={link.url}
                  className="flex items-center text-gray-400 hover:text-white transition-colors group"
                >
                  <ChevronRight className="w-4 h-4 mr-2 text-gray-600 group-hover:text-hero-green-500 transition-colors" />
                  {link.label}
                </Link>
              ))}
            </div>

            {/* Platform Features */}
            <div className="mt-8 space-y-3">
              <div className="flex items-center text-sm text-emerald-400">
                <Sparkles className="w-4 h-4 mr-2" />
                Unified Device Trade Calculator
              </div>
              <div className="flex items-center text-sm text-amber-400">
                <Award className="w-4 h-4 mr-2" />
                AED 99 Planet Hero Starter Kit
              </div>
              <div className="flex items-center text-sm text-blue-400">
                <Users className="w-4 h-4 mr-2" />
                Ambassador Earnings Program
              </div>
            </div>

            {/* Environmental Impact Stats */}
            <div className="mt-6 p-4 bg-slate-800/50 rounded-lg border border-slate-700">
              <h4 className="text-sm font-bold text-white mb-3 flex items-center">
                <Recycle className="w-4 h-4 mr-2 text-hero-green-500" />
                Mission Impact
              </h4>
              <div className="grid grid-cols-2 gap-3 text-center">
                <div>
                  <div className="text-lg font-bold text-hero-green-500">180T</div>
                  <div className="text-xs text-gray-400">CO₂ Saved</div>
                </div>
                <div>
                  <div className="text-lg font-bold text-blue-500">2.4M</div>
                  <div className="text-xs text-gray-400">Bottles Prevented</div>
                </div>
              </div>
            </div>
          </div>

          {/* Partnership & Contact */}
          <div>
            <h3 className="text-lg font-bold text-white mb-6">Partnership & Contact</h3>

            {/* Contact Information */}
            <div className="space-y-4">
              <h4 className="text-sm font-bold text-white mb-3">Contact & Support</h4>
              
              <div className="space-y-3">
                <a 
                  href="tel:+971523946311"
                  className="flex items-center text-gray-400 hover:text-white transition-colors group"
                >
                  <Phone className="w-4 h-4 mr-3 text-dubai-blue-500" />
                  <div>
                    <div className="text-sm">+971 52 394 6311</div>
                    <div className="text-xs text-gray-500">24/7 Emergency Support</div>
                  </div>
                </a>
                
                <a 
                  href="mailto:partners@deliwer.com"
                  className="flex items-center text-gray-400 hover:text-white transition-colors group"
                >
                  <Mail className="w-4 h-4 mr-3 text-hero-green-500" />
                  <div>
                    <div className="text-sm">info@deliwer.com</div>
                    <div className="text-xs text-gray-500">Champion & Ambassador Inquiries</div>
                  </div>
                </a>
                
                <div className="flex items-start text-gray-400">
                  <MapPin className="w-4 h-4 mr-3 text-amber-500 mt-1" />
                  <div>
                    <div className="text-sm">Dubai Airport Freezone UAE</div>
                    <div className="text-xs text-gray-500">Serving all Emirates</div>
                  </div>
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-slate-700">
                <a 
                  href="https://wa.me/971523946311"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center w-full bg-hero-green-500 hover:bg-hero-green-600 text-black px-4 py-2 rounded-lg font-medium transition-colors"
                >
                  <Heart className="w-4 h-4 mr-2" />
                  WhatsApp Support
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Bottom Bar */}
      <div className="border-t border-slate-700 bg-slate-950">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="flex flex-col md:flex-row items-center space-y-2 md:space-y-0 md:space-x-6">
              <div className="text-sm text-gray-400">
                © {currentYear} DeliWer. All rights reserved.
              </div>
              <div className="flex items-center space-x-4 text-xs text-gray-500">
                <Link href="/privacy" className="hover:text-gray-300 transition-colors">Privacy Policy</Link>
                <span>•</span>
                <Link href="/terms" className="hover:text-gray-300 transition-colors">Terms of Service</Link>
                <span>•</span>
                <Link href="/environmental" className="hover:text-gray-300 transition-colors">Environmental Impact</Link>
                <span>•</span>
                <Link href="/sponsorships" className="hover:text-gray-300 transition-colors">Sponsorships</Link>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="flex items-center text-xs text-gray-500">
                <Globe className="w-3 h-3 mr-1 text-emerald-500" />
                World's First Sustainability Game
              </div>
              <div className="flex items-center text-xs text-emerald-400">
                <Star className="w-3 h-3 mr-1 text-emerald-500" />
                We support Dubaican Initiative
              </div>
              <div className="flex items-center text-xs text-gray-500">
                <Shield className="w-3 h-3 mr-1 text-hero-green-500" />
                ISO 14001 Environmental Standard
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}