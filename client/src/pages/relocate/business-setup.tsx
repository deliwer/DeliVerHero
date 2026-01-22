import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CalendlyButton } from "@/components/calendly-popup";
import { SEOMeta } from "@/components/seo-meta";
import { Briefcase, ArrowRight, CheckCircle2 } from "lucide-react";
import businessSetupImg from "@assets/stock_images/dubai_skyline_modern_806b4a5e.jpg";

export default function BusinessSetupPage() {
  return (
    <div className="min-h-screen bg-background">
      <SEOMeta 
        title="Business Setup Dubai | Capital Relocation Services | DeliWer"
        description="Establish your business in Dubai with ease. From licensing and visas to office setup and corporate compliance."
      />
      
      <section className="py-24 px-4 relative overflow-hidden" style={{ backgroundImage: `url(${businessSetupImg})`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
        <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/75 to-black/40"></div>
        <div className="container mx-auto max-w-5xl relative z-10">
          <div className="grid lg:grid-cols-2 gap-8 items-center">
            <div>
              <div className="inline-flex items-center gap-2 bg-emerald-500/30 rounded-full px-4 py-2 mb-6 border border-emerald-400/50">
                <Briefcase className="w-4 h-4 text-emerald-300" />
                <span className="text-sm font-semibold text-emerald-200">Business Setup</span>
              </div>
              <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">
                Capital Relocation. <span className="text-emerald-300">Simplified.</span>
              </h2>
              <p className="text-lg text-white/90 mb-6 font-medium">
                Establish your presence in Dubai with ease. From licensing and visas to office setup and corporate compliance, our specialists handle the complexity while you focus on growth.
              </p>
              <ul className="space-y-3 mb-8">
                <li className="flex items-center gap-3 text-white/85">
                  <CheckCircle2 className="w-5 h-5 text-emerald-300 flex-shrink-0" />
                  Freezone & Mainland Licensing
                </li>
                <li className="flex items-center gap-3 text-white/85">
                  <CheckCircle2 className="w-5 h-5 text-emerald-300 flex-shrink-0" />
                  Corporate Bank Account Opening
                </li>
                <li className="flex items-center gap-3 text-white/85">
                  <CheckCircle2 className="w-5 h-5 text-emerald-300 flex-shrink-0" />
                  Golden Visa & Investor Residency
                </li>
              </ul>
              <div className="flex flex-wrap gap-3">
                <CalendlyButton 
                  size="lg" 
                  className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold px-8 h-14 rounded-full shadow-lg transition-all"
                >
                  Book Free Consultation
                  <ArrowRight className="ml-2 w-5 h-5" />
                </CalendlyButton>
                <CalendlyButton 
                  size="lg" 
                  variant="outline" 
                  className="border-white/20 text-white hover:bg-white/10 backdrop-blur-sm h-14 rounded-full px-8"
                >
                  Speak to an Expert
                </CalendlyButton>
              </div>
            </div>
            <div className="relative">
              <div className="aspect-[4/3] rounded-2xl overflow-hidden relative shadow-2xl border border-white/10">
                <img 
                  src={businessSetupImg} 
                  alt="Modern Dubai office for business setup" 
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent"></div>
                <div className="absolute bottom-4 left-4 right-4">
                  <p className="text-white font-bold text-lg">Dubai Corporate Setup</p>
                  <p className="text-white/90 text-sm">Professional business establishment</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 px-4 bg-slate-950 text-center">
        <h2 className="text-3xl font-bold text-white mb-8">Ready to start?</h2>
        <p className="text-gray-400 mb-12 max-w-2xl mx-auto">
          Our team of specialists is ready to help you navigate the Dubai business landscape.
        </p>
        <Link href="/relocate">
          <Button variant="outline" className="border-emerald-500 text-emerald-400 hover:bg-emerald-500/10 h-14 px-8 rounded-full">
            Back to Relocation Overview
          </Button>
        </Link>
      </section>
    </div>
  );
}
