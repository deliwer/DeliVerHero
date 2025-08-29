
import { ContactForm } from "@/components/contact-form";
import { Mail, Phone, MapPin, Clock, MessageCircle } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 py-12">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-white mb-4">Get in Touch</h1>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Have questions about DeliWer? We're here to help you on your sustainability journey.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {/* Contact Information */}
          <div className="lg:col-span-1 space-y-6">
            <Card className="bg-slate-800 border-slate-700">
              <CardContent className="p-6">
                <h3 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
                  <MessageCircle className="w-5 h-5 text-emerald-400" />
                  Contact Information
                </h3>
                
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <Mail className="w-5 h-5 text-emerald-400 mt-0.5" />
                    <div>
                      <p className="text-white font-medium">Email</p>
                      <a href="mailto:support@deliwer.com" className="text-gray-400 hover:text-emerald-400">
                        support@deliwer.com
                      </a>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <Phone className="w-5 h-5 text-emerald-400 mt-0.5" />
                    <div>
                      <p className="text-white font-medium">Phone</p>
                      <a href="tel:+971-4-123-4567" className="text-gray-400 hover:text-emerald-400">
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

            <Card className="bg-slate-800 border-slate-700">
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold text-white mb-4">Quick Support</h3>
                <div className="space-y-3">
                  <a 
                    href="/faq" 
                    className="block text-emerald-400 hover:text-emerald-300 transition-colors"
                  >
                    📚 Frequently Asked Questions
                  </a>
                  <a 
                    href="/support" 
                    className="block text-blue-400 hover:text-blue-300 transition-colors"
                  >
                    🎧 Technical Support Center
                  </a>
                  <a 
                    href="/community" 
                    className="block text-purple-400 hover:text-purple-300 transition-colors"
                  >
                    👥 Community Forum
                  </a>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-2">
            <ContactForm />
          </div>
        </div>
      </div>
    </div>
  );
}
