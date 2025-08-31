import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  Mail, 
  Phone, 
  MapPin, 
  MessageCircle,
  Clock,
  HelpCircle
} from 'lucide-react';
import { ContactForm } from "@/components/contact-form";

export default function AccountConsolidated() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 py-12" data-testid="contact-page">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-white mb-4 flex items-center justify-center gap-3">
            <HelpCircle className="w-10 h-10 text-emerald-400" />
            Contact Us
          </h1>
          <p className="text-xl text-gray-400">
            Get in touch with our team - we're here to help with your trade-in journey
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Contact Information */}
          <div className="lg:col-span-1 space-y-6">
            <Card className="bg-slate-800 border-slate-700">
              <CardContent className="p-6">
                <h3 className="text-xl font-semibold text-white mb-6 flex items-center gap-2">
                  <MessageCircle className="w-5 h-5 text-emerald-400" />
                  Contact Information
                </h3>
                
                <div className="space-y-6">
                  <div className="flex items-start gap-3">
                    <Mail className="w-5 h-5 text-emerald-400 mt-0.5" />
                    <div>
                      <p className="text-white font-medium">Email</p>
                      <a href="mailto:support@deliwer.com" className="text-gray-400 hover:text-emerald-400 transition-colors">
                        support@deliwer.com
                      </a>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <Phone className="w-5 h-5 text-emerald-400 mt-0.5" />
                    <div>
                      <p className="text-white font-medium">Phone</p>
                      <a href="tel:+971-4-123-4567" className="text-gray-400 hover:text-emerald-400 transition-colors">
                        +971 4 123 4567
                      </a>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <MapPin className="w-5 h-5 text-emerald-400 mt-0.5" />
                    <div>
                      <p className="text-white font-medium">Address</p>
                      <p className="text-gray-400">
                        Business Bay<br />
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
                        Friday - Saturday: 10:00 AM - 4:00 PM
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Quick Support */}
            <Card className="bg-slate-800 border-slate-700">
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold text-white mb-4">Quick Support</h3>
                <div className="space-y-3">
                  <p className="text-gray-400 text-sm">
                    For immediate assistance with your trade-in, you can also reach us through:
                  </p>
                  <div className="flex flex-col gap-2">
                    <a 
                      href="https://wa.me/971501234567" 
                      className="text-emerald-400 hover:text-emerald-300 text-sm font-medium transition-colors"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      WhatsApp Support
                    </a>
                    <a 
                      href="mailto:urgent@deliwer.com" 
                      className="text-emerald-400 hover:text-emerald-300 text-sm font-medium transition-colors"
                    >
                      Urgent Issues
                    </a>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-2">
            <Card className="bg-slate-800 border-slate-700">
              <CardHeader>
                <CardTitle className="text-white text-xl">Send us a Message</CardTitle>
                <p className="text-gray-400">
                  Fill out the form below and we'll get back to you within 24 hours
                </p>
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