
import { ContactForm } from "@/components/contact-form";
import { 
  Mail, Phone, MapPin, Clock, MessageCircle, Globe, Instagram, 
  Twitter, Linkedin, Youtube 
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 py-12" data-testid="contact-page">
      <div className="container mx-auto px-4 max-w-7xl">
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
                      <a href="mailto:info@deliwer.com" className="text-gray-400 hover:text-emerald-400 transition-colors">
                        info@deliwer.com
                      </a>
                      <br />
                      <a href="mailto:support@deliwer.com" className="text-gray-400 hover:text-emerald-400 transition-colors text-sm">
                        support@deliwer.com
                      </a>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <Phone className="w-5 h-5 text-emerald-400 mt-0.5" />
                    <div>
                      <p className="text-white font-medium">Phone & WhatsApp</p>
                      <a href="tel:+971545454595" className="text-gray-400 hover:text-emerald-400 transition-colors">+971 52 394 6311</a>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <MapPin className="w-5 h-5 text-emerald-400 mt-0.5" />
                    <div>
                      <p className="text-white font-medium">Address</p>
                      <p className="text-gray-400">
                        DeliWer Shopping FZCO<br />
                        Office 1001, API World Tower<br />
                        Sheikh Zayed Road<br />
                        Dubai, UAE
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <Clock className="w-5 h-5 text-emerald-400 mt-0.5" />
                    <div>
                      <p className="text-white font-medium">Business Hours</p>
                      <p className="text-gray-400">
                        Sunday - Thursday: 9:00 AM - 6:00 PM<br />
                        Friday - Saturday: 10:00 AM - 4:00 PM<br />
                        <span className="text-emerald-400 text-sm">24/7 Online Support Available</span>
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
                      href="https://instagram.com/deliwer.official" 
                      className="flex items-center gap-2 text-emerald-400 hover:text-emerald-300 text-sm font-medium transition-colors"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Instagram className="w-4 h-4" />
                      Instagram
                    </a>
                    <a 
                      href="https://twitter.com/deliwer_uae" 
                      className="flex items-center gap-2 text-emerald-400 hover:text-emerald-300 text-sm font-medium transition-colors"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Twitter className="w-4 h-4" />
                      Twitter
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
                    <a 
                      href="https://youtube.com/@deliwer" 
                      className="flex items-center gap-2 text-emerald-400 hover:text-emerald-300 text-sm font-medium transition-colors"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Youtube className="w-4 h-4" />
                      YouTube
                    </a>
                  </div>
                  <div className="pt-2">
                    <a 
                      href="https://wa.me/971545454595" 
                      className="inline-flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <MessageCircle className="w-4 h-4" />
                      WhatsApp Support
                    </a>
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
                    <strong className="text-white">Directions:</strong> We're located in API World Tower on Sheikh Zayed Road. 
                    Public transport and parking available. Metro: Business Bay Station (5 min walk).
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
