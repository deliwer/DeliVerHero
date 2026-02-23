import { ContactForm } from "@/components/contact-form";
import { 
  Mail, Phone, MapPin, Clock, MessageCircle, Globe, Instagram, 
  Twitter, Linkedin, Youtube, Facebook, TrendingUp, Briefcase,
  Gamepad2, Leaf
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { contactInfo } from "@/lib/contact-info";
import { Button } from "@/components/ui/button";
import { TrustStrip } from "@/components/trust-strip";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-slate-950 text-white" data-testid="contact-page">
      <Navigation />
      <div className="container mx-auto px-4 max-w-7xl py-12">
        {/* Hero Section with Concept */}
        <div className="text-center mb-16">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Badge className="bg-emerald-500/10 text-emerald-400 border-emerald-500/20">GLOBAL CONVERSATIONAL COMMERCE</Badge>
          </div>
          <h1 className="text-5xl md:text-6xl font-black text-white mb-6 uppercase tracking-tighter">
            Play to Protect. <span className="text-emerald-500">Trade to Save.</span>
          </h1>
          <div className="max-w-4xl mx-auto space-y-6">
            <div className="grid md:grid-cols-3 gap-6 mb-8">
              <div className="p-6 bg-white/5 rounded-2xl border border-white/10">
                <Gamepad2 className="w-10 h-10 text-emerald-400 mx-auto mb-4" />
                <h3 className="font-bold text-white uppercase text-sm mb-2">The Game</h3>
                <p className="text-xs text-gray-400">Transforming lifestyle choices into environmental impact through play.</p>
              </div>
              <div className="p-6 bg-white/5 rounded-2xl border border-white/10">
                <Leaf className="w-10 h-10 text-emerald-400 mx-auto mb-4" />
                <h3 className="font-bold text-white uppercase text-sm mb-2">Sustainability</h3>
                <p className="text-xs text-gray-400">Reducing carbon through circular trade and water conservation.</p>
              </div>
              <div className="p-6 bg-white/5 rounded-2xl border border-white/10">
                <Globe className="w-10 h-10 text-emerald-400 mx-auto mb-4" />
                <h3 className="font-bold text-white uppercase text-sm mb-2">Expansion</h3>
                <p className="text-xs text-gray-400">Starting in Dubai. Scaling global community impact by 2027.</p>
              </div>
            </div>
            
            <p className="text-xl text-gray-300 leading-relaxed font-medium italic">
              "DeliWer is not just a platform; it's a <strong>Conversational Sustainability Game</strong>. We use the power of WhatsApp commerce to gamify the circular economy — starting with Dubai's high-intent communities."
            </p>
          </div>
        </div>

        {/* Founder Profiles */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {contactInfo.founders.map((founder, index) => (
            <Card key={index} className="bg-slate-900 border-white/10 hover-elevate transition-all overflow-hidden">
              <CardContent className="p-8 flex items-center gap-6">
                <Avatar className="h-24 w-24 border-2 border-emerald-500/30">
                  <AvatarImage 
                    src={founder.name === "Hassan Jawad" ? "/assets/hassan-jawad.jpg" : founder.name === "Rubab Hassan" ? "/assets/rubab-hassan.jpg" : ""} 
                    alt={founder.name} 
                  />
                  <AvatarFallback className="bg-emerald-500/10 text-emerald-500 font-bold uppercase">
                    {founder.name.split(' ').map(n => n[0]).join('')}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <h3 className="text-xl font-black text-white uppercase tracking-tighter">{founder.name}</h3>
                  <p className="text-emerald-500 font-bold text-xs uppercase mb-3">{founder.title}</p>
                  <div className="flex gap-4">
                    {founder.linkedin && (
                      <a href={founder.linkedin} target="_blank" className="text-gray-400 hover:text-blue-400 transition-colors">
                        <Linkedin className="w-5 h-5" />
                      </a>
                    )}
                    <a href={`mailto:${founder.email}`} className="text-gray-400 hover:text-emerald-400 transition-colors">
                      <Mail className="w-5 h-5" />
                    </a>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid lg:grid-cols-5 gap-8">
          {/* Contact Information & Social */}
          <div className="lg:col-span-2 space-y-6">
            <Card className="bg-slate-800 border-slate-700">
              <CardContent className="p-6">
                <h3 className="text-xl font-semibold text-white mb-6 flex items-center gap-2">
                  <MessageCircle className="w-5 h-5 text-emerald-400" />
                  Need immediate assistance?
                </h3>
                
                <div className="space-y-6">
                  <div className="flex items-start gap-3">
                    <Mail className="w-5 h-5 text-emerald-400 mt-0.5" />
                    <div>
                      <p className="text-white font-medium">Support Email</p>
                      <a href="mailto:support@deliwer.com" className="text-gray-400 hover:text-emerald-400 transition-colors">
                        support@deliwer.com
                      </a>
                      <p className="text-xs text-gray-500 mt-1">General: info@deliwer.com</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <Phone className="w-5 h-5 text-emerald-400 mt-0.5" />
                    <div>
                      <p className="text-white font-medium">WhatsApp & Call</p>
                      <a href="tel:+971523946311" className="text-gray-400 hover:text-emerald-400 transition-colors">+971 52 394 6311</a>
                      <p className="text-xs text-gray-500 mt-1">Direct: +971 52 390 6019</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <MapPin className="w-5 h-5 text-emerald-400 mt-0.5" />
                    <div>
                      <p className="text-white font-medium">Office Location</p>
                      <p className="text-gray-400">
                        {contactInfo.company.address.name}<br />
                        {contactInfo.company.address.street}<br />
                        {contactInfo.company.address.city}
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-slate-800 border-slate-700">
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold text-white mb-4">Connect With Us</h3>
                <p className="text-gray-400 text-sm mb-4">Follow our sustainability journey and get instant updates:</p>
                <div className="grid grid-cols-2 gap-3">
                  <a href={contactInfo.social.facebook} className="flex items-center gap-2 text-emerald-400 hover:text-emerald-300 text-sm font-medium transition-colors" target="_blank">
                    <Facebook className="w-4 h-4" /> Facebook
                  </a>
                  <a href={contactInfo.social.instagram} className="flex items-center gap-2 text-emerald-400 hover:text-emerald-300 text-sm font-medium transition-colors" target="_blank">
                    <Instagram className="w-4 h-4" /> Instagram
                  </a>
                  <a href={contactInfo.social.twitter} className="flex items-center gap-2 text-emerald-400 hover:text-emerald-300 text-sm font-medium transition-colors" target="_blank">
                    <Twitter className="w-4 h-4" /> Twitter
                  </a>
                  <a href={contactInfo.social.youtube} className="flex items-center gap-2 text-emerald-400 hover:text-emerald-300 text-sm font-medium transition-colors" target="_blank">
                    <Youtube className="w-4 h-4" /> YouTube
                  </a>
                  <a href={contactInfo.social.tiktok} className="flex items-center gap-2 text-emerald-400 hover:text-emerald-300 text-sm font-medium transition-colors" target="_blank">
                    <Globe className="w-4 h-4" /> TikTok
                  </a>
                  <a href={contactInfo.social.linkedin} className="flex items-center gap-2 text-emerald-400 hover:text-emerald-300 text-sm font-medium transition-colors" target="_blank">
                    <Linkedin className="w-4 h-4" /> LinkedIn
                  </a>
                </div>
                
                <div className="pt-6 border-t border-slate-700 mt-6">
                  <p className="text-sm text-gray-300 font-semibold mb-3">Discover More About Us:</p>
                  <div className="grid grid-cols-2 gap-3">
                    <a href={contactInfo.ctas.crunchbase} target="_blank" className="flex items-center gap-2 text-blue-400 hover:text-blue-300 text-sm font-medium transition-colors">
                      <TrendingUp className="w-4 h-4" /> Crunchbase
                    </a>
                    <a href={contactInfo.ctas.gust} target="_blank" className="flex items-center gap-2 text-amber-400 hover:text-amber-300 text-sm font-medium transition-colors">
                      <Briefcase className="w-4 h-4" /> Gust
                    </a>
                  </div>
                </div>

                <div className="pt-6 border-t border-slate-700 mt-6">
                  <p className="text-sm text-gray-300 font-semibold mb-3">Founder Contacts:</p>
                  <div className="space-y-4">
                    {contactInfo.founders.map((founder, idx) => (
                      <div key={idx} className="text-sm">
                        <p className="text-white font-medium">{founder.name} - {founder.title}</p>
                        <div className="flex gap-2 mt-1">
                          <a href={`mailto:${founder.email}`} className="text-emerald-400 hover:text-emerald-300 text-xs">Email</a>
                          <span className="text-gray-600">•</span>
                          <a href={`${contactInfo.ctas.whatsappBase}${founder.whatsappLink}`} target="_blank" className="text-emerald-400 hover:text-emerald-300 text-xs">WhatsApp</a>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="lg:col-span-3 space-y-6">
            <Card className="bg-slate-800 border-slate-700">
              <CardHeader>
                <CardTitle className="text-white text-xl">Direct Message</CardTitle>
                <p className="text-gray-400">Start your sustainability journey. Our team responds via WhatsApp or Email within 24 hours.</p>
              </CardHeader>
              <CardContent>
                <ContactForm />
              </CardContent>
            </Card>

            <Card className="bg-slate-800 border-slate-700">
              <CardHeader>
                <CardTitle className="text-white text-xl flex items-center gap-2">
                  <MapPin className="w-5 h-5 text-emerald-400" />
                  Visit Our Office
                </CardTitle>
                <p className="text-gray-400">Located in the heart of Dubai's business district</p>
              </CardHeader>
              <CardContent>
                <div className="rounded-lg overflow-hidden border border-slate-700">
                  <iframe 
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d619.689590867552!2d55.37004855431323!3d25.26343187419722!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3e5f5dfd9c7ff531%3A0x523c98190a9a6d1a!2sDeliWer%20Shopping%20FZCO!5e0!3m2!1sen!2sae!4v1756616088732!5m2!1sen!2sae" 
                    width="100%" 
                    height="350" 
                    style={{border: 0}} 
                    allowFullScreen={true}
                    loading="lazy" 
                    referrerPolicy="no-referrer-when-downgrade"
                  />
                </div>
                <div className="mt-4 p-4 bg-slate-900/50 rounded-lg">
                  <p className="text-sm text-gray-300">
                    <strong className="text-white">DeliWer Shopping FZCO:</strong> Located in Dubai Airport Freezone (DAFZA). 
                    Easily accessible with dedicated parking and close to major transit hubs.
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
