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
      <section className="px-4 py-3 border-b border-white/10 bg-slate-950">
        <div className="max-w-4xl mx-auto">
          <TrustStrip variant="dark" showContact={true} />
        </div>
      </section>
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
        <div className="grid md:grid-cols-2 gap-8 mb-16">
          <Card className="bg-slate-900 border-white/10 hover-elevate transition-all overflow-hidden">
            <CardContent className="p-8 flex items-center gap-6">
              <Avatar className="h-24 w-24 border-2 border-emerald-500/30">
                <AvatarImage src="/assets/hassan-jawad.jpg" alt="Hassan Jawad" />
                <AvatarFallback className="bg-emerald-500/10 text-emerald-500 font-bold uppercase">HJ</AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <h3 className="text-2xl font-black text-white uppercase tracking-tighter">Hassan Jawad</h3>
                <p className="text-emerald-500 font-bold text-sm uppercase mb-3">Founder</p>
                <div className="flex gap-4">
                  <a href="https://linkedin.com/in/hassanjawad" target="_blank" className="text-gray-400 hover:text-blue-400 transition-colors">
                    <Linkedin className="w-5 h-5" />
                  </a>
                  <a href="mailto:hassan@deliwer.com" className="text-gray-400 hover:text-emerald-400 transition-colors">
                    <Mail className="w-5 h-5" />
                  </a>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-slate-900 border-white/10 hover-elevate transition-all overflow-hidden">
            <CardContent className="p-8 flex items-center gap-6">
              <Avatar className="h-24 w-24 border-2 border-blue-500/30">
                <AvatarImage src="/assets/rubab-hassan.jpg" alt="Rubab Hassan" />
                <AvatarFallback className="bg-blue-500/10 text-blue-500 font-bold uppercase">RH</AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <h3 className="text-2xl font-black text-white uppercase tracking-tighter">Rubab Hassan</h3>
                <p className="text-blue-500 font-bold text-sm uppercase mb-3">Co-Founder & MD</p>
                <div className="flex gap-4">
                  <a href="https://linkedin.com/in/rubabhassan" target="_blank" className="text-gray-400 hover:text-blue-400 transition-colors">
                    <Linkedin className="w-5 h-5" />
                  </a>
                  <a href="mailto:rubab@deliwer.com" className="text-gray-400 hover:text-blue-400 transition-colors">
                    <Mail className="w-5 h-5" />
                  </a>
                </div>
              </div>
            </CardContent>
          </Card>
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
                        {contactInfo.company.address.city}
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-slate-800 border-slate-700">
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold text-white mb-4">Social Ecosystem</h3>
                <div className="grid grid-cols-2 gap-3">
                  <a href="https://instagram.com/vdeliwer" className="flex items-center gap-2 text-emerald-400 hover:text-emerald-300 text-sm font-medium transition-colors" target="_blank">
                    <Instagram className="w-4 h-4" /> Instagram
                  </a>
                  <a href="https://linkedin.com/company/deliwer" className="flex items-center gap-2 text-emerald-400 hover:text-emerald-300 text-sm font-medium transition-colors" target="_blank">
                    <Linkedin className="w-4 h-4" /> LinkedIn
                  </a>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="lg:col-span-3">
            <Card className="bg-slate-800 border-slate-700">
              <CardHeader>
                <CardTitle className="text-white text-xl">Direct Message</CardTitle>
                <p className="text-gray-400">Start your sustainability journey. Our team responds via WhatsApp or Email within 24 hours.</p>
              </CardHeader>
              <CardContent>
                <ContactForm />
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
