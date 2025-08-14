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
  ChevronRight
} from "lucide-react";

export function Footer() {
  const currentYear = new Date().getFullYear();



  const quickLinks = [
    { label: "iPhone Trade Calculator", url: "/" },
    { label: "AquaCafe Systems", url: "/aquacafe" },
    { label: "Planet Heroes Leaderboard", url: "/leaderboard" },
    { label: "Community Hub", url: "/community" },
    { label: "Partnership Programs", url: "/partners" },
    { label: "Delivery Network", url: "/delivery" },
    { label: "Impact Dashboard", url: "/impact" }
  ];

  const partnershipPrograms = [
    { label: "Delivery Agent Program", earnings: "AED 150-300/day" },
    { label: "Eco-Recycling Partner", earnings: "AED 50-150/device" },
    { label: "Restaurant Collection", earnings: "10% commission" },
    { label: "Community Ambassador", earnings: "Token rewards" }
  ];

  const socialLinks = [
    { icon: Twitter, url: "https://twitter.com/deliwerdubai", label: "Twitter" },
    { icon: Instagram, url: "https://instagram.com/deliwerdubai", label: "Instagram" },
    { icon: Linkedin, url: "https://linkedin.com/company/deliwer", label: "LinkedIn" },
    { icon: Youtube, url: "https://youtube.com/@deliwerdubai", label: "YouTube" }
  ];

  return (
    <footer className="bg-slate-900 border-t border-slate-700">
      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 py-16">
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
              Dubai's leading environmental sustainability platform. Trade your iPhone for premium water systems while earning Planet Hero status and building a greener future.
            </p>
            
            <div className="space-y-3 mb-6">
              <div className="flex items-center text-sm text-gray-400">
                <Shield className="w-4 h-4 mr-2 text-hero-green-500" />
                Dubai Municipality Certified
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
            <h3 className="text-lg font-bold text-white mb-6">Platform Navigation</h3>
            
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

            {/* Environmental Impact Stats */}
            <div className="mt-8 p-4 bg-slate-800/50 rounded-lg border border-slate-700">
              <h4 className="text-sm font-bold text-white mb-3 flex items-center">
                <Recycle className="w-4 h-4 mr-2 text-hero-green-500" />
                Real-Time Impact
              </h4>
              <div className="grid grid-cols-2 gap-3 text-center">
                <div>
                  <div className="text-lg font-bold text-hero-green-500">180T</div>
                  <div className="text-xs text-gray-400">CO₂ Saved</div>
                </div>
                <div>
                  <div className="text-lg font-bold text-blue-500">2.4M</div>
                  <div className="text-xs text-gray-400">Bottles</div>
                </div>
              </div>
            </div>
          </div>

          {/* Partnership & Contact */}
          <div>
            <h3 className="text-lg font-bold text-white mb-6">Partnership Opportunities</h3>
            
            <div className="space-y-3 mb-8">
              {partnershipPrograms.map((program, index) => (
                <div key={index} className="flex justify-between items-center p-3 bg-slate-800/30 rounded border border-slate-700">
                  <span className="text-sm text-gray-300">{program.label}</span>
                  <span className="text-xs text-hero-green-500 font-medium">{program.earnings}</span>
                </div>
              ))}
            </div>

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
                    <div className="text-xs text-gray-500">Partnership Inquiries</div>
                  </div>
                </a>
                
                <div className="flex items-start text-gray-400">
                  <MapPin className="w-4 h-4 mr-3 text-amber-500 mt-1" />
                  <div>
                    <div className="text-sm">Dubai, UAE</div>
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
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="flex items-center text-xs text-gray-500">
                <Star className="w-3 h-3 mr-1 text-amber-500" />
                Dubai Municipality Certified Platform
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