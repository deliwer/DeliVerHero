
import { ContactForm } from "@/components/contact-form";
import { 
  Mail, Phone, MapPin, Clock, MessageCircle, Globe, Instagram, 
  Twitter, Linkedin, Youtube, Facebook, TrendingUp, Briefcase
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { contactInfo } from "@/lib/contact-info";
import { Button } from "@/components/ui/button";
import { TrustStrip } from "@/components/trust-strip";

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900" data-testid="contact-page">
      <section className="px-4 py-3 border-b border-white/10 bg-slate-950">
        <div className="max-w-4xl mx-auto">
          <TrustStrip variant="dark" showContact={true} />
        </div>
      </section>
      <div className="container mx-auto px-4 max-w-7xl py-12">
        {/* Hero Section with Introduction */}
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold text-white mb-6 flex items-center justify-center gap-4">
            <Globe className="w-12 h-12 text-emerald-400" />
            Welcome to DeliWer
          </h1>
          <div className="max-w-4xl mx-auto space-y-4">
            <h2 className="text-2xl font-semibold text-emerald-400">
              The World's First Shopping Metaverse & Sustainability Game
            </h2>
            <p className="text-xl text-gray-300 leading-relaxed">
              Join the revolution in sustainable living! DeliWer Shopping Metaverse is pioneering the future of 
              environmental conservation through gamified rewards. Earn Planet Points for your water conservation 
              efforts and eco-friendly practices while reducing carbon emissions through our innovative circular 
              exchange system.
            </p>
            <p className="text-lg text-gray-400">
              Transform your old iPhones into clean water solutions, save the planet, and get rewarded for it! 
              Together, we're building a sustainable future, one exchange at a time.
            </p>
          </div>
        </div>

        <div className="grid lg:grid-cols-5 gap-8">
          {/* Contact Information & Social */}
          <div className="lg:col-span-2 space-y-6">
            <Card className="bg-slate-800 border-slate-700">
              <CardContent className="p-6">
                <h3 className="text-xl font-semibold text-white mb-6 flex items-center gap-2">
                  <MessageCircle className="w-5 h-5 text-emerald-400" />
                  Get in Touch
                </h3>
                
                <div className="space-y-6">
                  <div className="flex items-start gap-3">
                    <Mail className="w-5 h-5 text-emerald-400 mt-0.5" />
                    <div>
                      <p className="text-white font-medium">Email</p>
                      <a href={`${contactInfo.ctas.emailBase}${contactInfo.company.email}`} className="text-gray-400 hover:text-emerald-400 transition-colors">
                        {contactInfo.company.email}
                      </a>
                      <br />
                      <a href={`${contactInfo.ctas.emailBase}${contactInfo.company.service}`} className="text-gray-400 hover:text-emerald-400 transition-colors text-sm">
                        {contactInfo.company.service}
                      </a>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <Phone className="w-5 h-5 text-emerald-400 mt-0.5" />
                    <div>
                      <p className="text-white font-medium">Phone & WhatsApp</p>
                      <a href={`tel:${contactInfo.company.phone}`} className="text-gray-400 hover:text-emerald-400 transition-colors">{contactInfo.company.phone}</a>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <MapPin className="w-5 h-5 text-emerald-400 mt-0.5" />
                    <div>
                      <p className="text-white font-medium">Address</p>
                      <p className="text-gray-400">
                        {contactInfo.company.address.name}<br />
                        {contactInfo.company.address.street}<br />
                        {contactInfo.company.address.zone}<br />
                        {contactInfo.company.address.city}
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <Clock className="w-5 h-5 text-emerald-400 mt-0.5" />
                    <div>
                      <p className="text-white font-medium">Business Hours</p>
                      <p className="text-gray-400">
                        {contactInfo.company.hours.weekdays}<br />
                        {contactInfo.company.hours.weekend}<br />
                        <span className="text-emerald-400 text-sm">{contactInfo.company.hours.support}</span>
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Social Media & Quick Links */}
            <Card className="bg-slate-800 border-slate-700">
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold text-white mb-4">Connect With Us</h3>
                <div className="space-y-4">
                  <p className="text-gray-400 text-sm">
                    Follow our sustainability journey and get instant updates:
                  </p>
                  <div className="grid grid-cols-2 gap-3">
                    <a 
                      href="https://facebook.com/deliwer" 
                      className="flex items-center gap-2 text-emerald-400 hover:text-emerald-300 text-sm font-medium transition-colors"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Facebook className="w-4 h-4" />
                      Facebook
                    </a>
                    <a 
                      href="https://instagram.com/vdeliwer" 
                      className="flex items-center gap-2 text-emerald-400 hover:text-emerald-300 text-sm font-medium transition-colors"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Instagram className="w-4 h-4" />
                      Instagram
                    </a>
                    <a 
                      href="https://twitter.com/vdeliwer" 
                      className="flex items-center gap-2 text-emerald-400 hover:text-emerald-300 text-sm font-medium transition-colors"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Twitter className="w-4 h-4" />
                      Twitter
                    </a>
                    <a 
                      href="https://youtube.com/@vdeliWer" 
                      className="flex items-center gap-2 text-emerald-400 hover:text-emerald-300 text-sm font-medium transition-colors"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Youtube className="w-4 h-4" />
                      YouTube
                    </a>
                    <a 
                      href="https://tiktok.com/@vdeliwer" 
                      className="flex items-center gap-2 text-emerald-400 hover:text-emerald-300 text-sm font-medium transition-colors"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Globe className="w-4 h-4" />
                      TikTok
                    </a>
                    <a 
                      href="https://linkedin.com/company/deliwer" 
                      className="flex items-center gap-2 text-emerald-400 hover:text-emerald-300 text-sm font-medium transition-colors"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Linkedin className="w-4 h-4" />
                      LinkedIn
                    </a>
                  </div>
                  <div className="pt-4 border-t border-slate-700 space-y-3">
                    <p className="text-sm text-gray-300 font-semibold">Discover More About Us:</p>
                    <div className="grid grid-cols-2 gap-3">
                      <a 
                        href={contactInfo.ctas.crunchbase}
                        className="flex items-center gap-2 text-blue-400 hover:text-blue-300 text-sm font-medium transition-colors"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <TrendingUp className="w-4 h-4" />
                        Crunchbase
                      </a>
                      <a 
                        href={contactInfo.ctas.gust}
                        className="flex items-center gap-2 text-amber-400 hover:text-amber-300 text-sm font-medium transition-colors"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <Briefcase className="w-4 h-4" />
                        Gust
                      </a>
                    </div>
                  </div>
                  <div className="pt-4 border-t border-slate-700 space-y-3">
                    <p className="text-sm text-gray-300 font-semibold">Founder Contacts:</p>
                    {contactInfo.founders.map((founder) => (
                      <div key={founder.name} className="text-sm">
                        <p className="text-white font-medium">{founder.name} - {founder.title}</p>
                        <div className="flex gap-2 mt-1">
                          <a 
                            href={`mailto:${founder.email}`} 
                            className="text-emerald-400 hover:text-emerald-300 text-xs"
                          >
                            Email
                          </a>
                          <span className="text-gray-600">•</span>
                          <a 
                            href={`${contactInfo.ctas.whatsappBase}${founder.whatsappLink}`}
                            className="text-emerald-400 hover:text-emerald-300 text-xs"
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            WhatsApp
                          </a>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-3 space-y-6">
            <Card className="bg-slate-800 border-slate-700">
              <CardHeader>
                <CardTitle className="text-white text-xl">Send us a Message</CardTitle>
                <p className="text-gray-400">
                  Have questions about our sustainability game or need help with your trade-in? 
                  We'd love to hear from you! Our team responds within 24 hours.
                </p>
              </CardHeader>
              <CardContent>
                <ContactForm />
              </CardContent>
            </Card>

            {/* Google Maps Embed */}
            <Card className="bg-slate-800 border-slate-700">
              <CardHeader>
                <CardTitle className="text-white text-xl flex items-center gap-2">
                  <MapPin className="w-5 h-5 text-emerald-400" />
                  Visit Our Office
                </CardTitle>
                <p className="text-gray-400">
                  Located in the heart of Dubai's business district
                </p>
              </CardHeader>
              <CardContent>
                <div className="rounded-lg overflow-hidden">
                  <iframe 
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d619.689590867552!2d55.37004855431323!3d25.26343187419722!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3e5f5dfd9c7ff531%3A0x523c98190a9a6d1a!2sDeliWer%20Shopping%20FZCO!5e0!3m2!1sen!2sae!4v1756616088732!5m2!1sen!2sae" 
                    width="100%" 
                    height="400" 
                    style={{border: 0}} 
                    allowFullScreen={true}
                    loading="lazy" 
                    referrerPolicy="no-referrer-when-downgrade"
                    className="w-full"
                  />
                </div>
                <div className="mt-4 p-4 bg-slate-700 rounded-lg">
                  <p className="text-sm text-gray-300">
                    <strong className="text-white">Address:</strong> DeliWer Shopping FZCO is located in Dubai Airport Freezone. 
                    We're easily accessible with dedicated parking and close proximity to major transportation hubs.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
