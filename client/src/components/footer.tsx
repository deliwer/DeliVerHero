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
  Globe,
  TrendingUp
} from "lucide-react";
import { SiFacebook, SiTiktok } from "react-icons/si";
import { EmailSubscriptionForm } from "./email-subscription-form";

export function Footer() {
  const consumerLinks = [
    { label: "Home Service Launch", url: "/launch" },
    { label: "Explore", url: "/explore" },
    { label: "AquaCafe Loyalty", url: "/aquacafe" },
    { label: "Rewards", url: "/earn" },
  ];

  const b2bLinks = [
    { label: "ChainTrack B2B", url: "/chaintrack" },
    { label: "Corporate Trade-in", url: "/corporate" },
    { label: "Ambassadors", url: "/partners" },
    { label: "Investor Relations", url: "/invest" },
  ];

  const investorLinks = [
    { label: "Pitch Deck (Gust)", url: "https://www.gust.com/companies/deliwer" },
    { label: "Crunchbase Profile", url: "https://www.crunchbase.com/organization/deliwer-shopping" },
    { label: "Partners & Sponsors", url: "/partners" },
    { label: "Investment Dashboard", url: "/investor-dashboard" },
  ];

  const socialLinks = [
    { icon: SiFacebook, url: "https://facebook.com/deliwer", label: "Facebook" },
    { icon: Instagram, url: "https://instagram.com/vdeliwer", label: "Instagram" },
    { icon: Youtube, url: "https://youtube.com/@vdeliwer", label: "YouTube" },
    { icon: SiTiktok, url: "https://tiktok.com/@vdeliwer", label: "TikTok" },
    { icon: Twitter, url: "https://twitter.com/vdeliwer", label: "Twitter" },
    { icon: Linkedin, url: "https://linkedin.com/company/deliwer", label: "LinkedIn" }
  ];

  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-slate-900 border-t border-slate-700">
      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 py-16">
        {/* Highlighted Sponsorship Banner */}


        <div className="grid lg:grid-cols-4 md:grid-cols-2 gap-12">
          
          {/* Brand & Mission */}
          <div className="lg:col-span-1">
            <Link href="/" className="flex items-center mb-6 hover:opacity-80 transition-opacity">
              <span className="text-2xl font-bold text-white">DeliWer</span>
            </Link>
            
            <p className="text-gray-300 mb-6 leading-relaxed">
              World's First Sustainability Game. Trade your iPhone for premium water systems while earning Loyalty Member status and contributing to Dubai's environmental missions.
            </p>
            
            <div className="space-y-3 mb-6">
              <div className="flex items-center text-sm text-emerald-400 font-semibold">
                <Shield className="w-4 h-4 mr-2 text-emerald-500" />
                We support DubaiCan Initiative
              </div>
              <div className="flex items-center text-sm text-blue-400 font-semibold">
                <Building className="w-4 h-4 mr-2 text-blue-500" />
                Circle Dubai Initiative by Dubai Municipality
              </div>
              <div className="flex items-center text-sm text-gray-400">
                <Zap className="w-4 h-4 mr-2 text-amber-500" />
                2.4M+ Bottles Prevented
              </div>
              <div className="flex items-center text-sm text-gray-400">
                <Users className="w-4 h-4 mr-2 text-dubai-blue-500" />
                12,847 Loyalty Members
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

          {/* DeliWer Consumer Navigation */}
          <div>
            <h3 className="text-lg font-bold text-white mb-6 flex items-center">
              <Sparkles className="w-5 h-5 mr-2 text-hero-green-500" />
              DeliWer Consumer
            </h3>
            
            <div className="space-y-3">
              {consumerLinks.map((link, index) => (
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
          </div>

          {/* ChainTrack B2B Navigation */}
          <div>
            <h3 className="text-lg font-bold text-white mb-6 flex items-center">
              <Building className="w-5 h-5 mr-2 text-blue-500" />
              ChainTrack B2B
            </h3>
            
            <div className="space-y-3">
              {b2bLinks.map((link, index) => (
                <Link
                  key={index}
                  href={link.url}
                  className="flex items-center text-gray-400 hover:text-white transition-colors group"
                >
                  <ChevronRight className="w-4 h-4 mr-2 text-gray-600 group-hover:text-blue-500 transition-colors" />
                  {link.label}
                </Link>
              ))}
            </div>
          </div>

          {/* Investors & Partners */}
          <div>
            <h3 className="text-lg font-bold text-white mb-6 flex items-center">
              <TrendingUp className="w-5 h-5 mr-2 text-amber-500" />
              Investors & Partners
            </h3>
            
            <div className="space-y-3">
              {investorLinks.map((link, index) => (
                link.url.startsWith('http') ? (
                  <a
                    key={index}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center text-gray-400 hover:text-white transition-colors group"
                  >
                    <ChevronRight className="w-4 h-4 mr-2 text-gray-600 group-hover:text-amber-500 transition-colors" />
                    {link.label}
                  </a>
                ) : (
                  <Link
                    key={index}
                    href={link.url}
                    className="flex items-center text-gray-400 hover:text-white transition-colors group"
                  >
                    <ChevronRight className="w-4 h-4 mr-2 text-gray-600 group-hover:text-amber-500 transition-colors" />
                    {link.label}
                  </Link>
                )
              ))}
            </div>

            {/* Stay Connected */}
            <div className="mt-8">
              <h4 className="text-sm font-bold text-white mb-3 flex items-center">
                <Mail className="w-4 h-4 mr-2 text-hero-green-500" />
                Newsletter
              </h4>
              <EmailSubscriptionForm variant="footer" />
            </div>
          </div>
        </div>

        {/* Contact Information */}
        <div className="mt-12 pt-8 border-t border-slate-800">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div>
              <h4 className="text-sm font-bold text-white mb-4 uppercase tracking-wider">Management & Strategy</h4>
              <div className="space-y-4">
                <a href="tel:+971523946311" className="flex items-center text-gray-400 hover:text-white transition-colors group">
                  <Phone className="w-4 h-4 mr-3 text-dubai-blue-500" />
                  <div>
                    <div className="text-sm font-medium">Hassan Jawad</div>
                    <div className="text-xs text-gray-500">Founder & CEO | +971 52 394 6311</div>
                  </div>
                </a>
                <a href="tel:+971567148381" className="flex items-center text-gray-400 hover:text-white transition-colors group">
                  <Phone className="w-4 h-4 mr-3 text-dubai-blue-500" />
                  <div>
                    <div className="text-sm font-medium">Rubab Hassan</div>
                    <div className="text-xs text-gray-500">Co-Founder & MD | +971 56 714 8381</div>
                  </div>
                </a>
              </div>
            </div>
            
            <div>
              <h4 className="text-sm font-bold text-white mb-4 uppercase tracking-wider">Operations & Support</h4>
              <div className="space-y-4">
                <a href="tel:+971556573114" className="flex items-center text-gray-400 hover:text-white transition-colors group">
                  <Phone className="w-4 h-4 mr-3 text-dubai-blue-500" />
                  <div>
                    <div className="text-sm font-medium">Kalbe-Hussain</div>
                    <div className="text-xs text-gray-500">Customer Service | +971 55 657 3114</div>
                  </div>
                </a>
                <div className="flex items-start text-gray-400">
                  <MapPin className="w-4 h-4 mr-3 text-amber-500 mt-1" />
                  <div>
                    <div className="text-sm font-medium">Dubai Airport Freezone</div>
                    <div className="text-xs text-gray-500">50 9WC 523 Block C, Dubai UAE</div>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex flex-col space-y-3 justify-center">
              <a 
                href="https://wa.me/971523946311"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center bg-emerald-500 hover:bg-emerald-600 text-black px-4 py-2.5 rounded-lg font-bold transition-colors text-sm"
              >
                <Heart className="w-4 h-4 mr-2" />
                Contact Hassan (WhatsApp)
              </a>
              <a 
                href="https://wa.me/971504547110"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center bg-hero-green-500/20 border border-hero-green-500/50 hover:bg-hero-green-500/30 text-hero-green-400 px-4 py-2.5 rounded-lg font-bold transition-colors text-sm"
              >
                <Heart className="w-4 h-4 mr-2" />
                Contact Rubab (WhatsApp)
              </a>
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
                <Link href="/terms" className="hover:text-gray-300 transition-colors">Terms & Conditions</Link>
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
                DubaiCan & Circle Dubai Initiative
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