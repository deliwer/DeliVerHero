import { Card, CardContent } from "@/components/ui/card";
import { TrendingUp, MessageSquare, CheckCircle2, ShieldCheck, UserCheck, ChevronRight } from "lucide-react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import relocationHeroPng from "@assets/generated_images/professional_dubai_relocation_exit_concierge_ad..png";
import apartmentKeysPng from "@assets/generated_images/empty_dubai_apartment_interior_with_keys..png";

export default function ExitConciergePage() {
  const whatsappLink = "https://wa.me/971523946311?text=I%20am%20contacting%20from%20DeBacci%20Group%20Community.%20I%20need%20to%20start%20my%20exit%20concierge%20process.%20Please%20guide%20me%20through%20DEWA%2C%20Ejari%20and%20Deposit%20recovery.";

  return (
    <div className="min-h-screen bg-slate-950 pb-24">
      {/* Hero Section */}
      <section className="relative pt-32 pb-16 px-4 min-h-[60vh] flex items-center overflow-hidden">
        <div 
          className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url(${relocationHeroPng})` }}
        />
        <div className="absolute inset-0 z-0 bg-[#0A3D62]/90 backdrop-blur-[2px]" />

        <div className="max-w-4xl mx-auto text-center relative z-10">
          <h1 className="text-5xl md:text-7xl font-black text-white uppercase tracking-tighter mb-6 leading-none drop-shadow-2xl">
            Leaving Dubai?<br />
            <span className="text-[#FFC845]">We Handle Your Exit End-to-End</span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-200 mb-10 font-medium">
            DEWA · Ejari · Move-out · Deposit · Handover · Closure
          </p>
          <Button 
            size="lg" 
            className="bg-[#25D366] hover:bg-[#20bd5a] text-white font-black rounded-full px-12 h-20 text-xl shadow-2xl transition-all w-full md:w-auto active-elevate-2"
            onClick={() => window.open(whatsappLink, '_blank')}
          >
            <MessageSquare className="w-6 h-6 mr-2" />
            Chat on WhatsApp – Exit Checklist in 2 Minutes
          </Button>
        </div>
      </section>

      {/* 3-Step Visual Flow */}
      <section className="relative py-24 px-4 overflow-hidden">
        <div 
          className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat opacity-20 grayscale"
          style={{ backgroundImage: `url(${apartmentKeysPng})` }}
        />
        <div className="absolute inset-0 z-0 bg-slate-950/80" />

        <div className="max-w-6xl mx-auto relative z-10">
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white/5 border border-white/10 p-8 rounded-[2.5rem] hover-elevate transition-all backdrop-blur-sm">
              <div className="w-16 h-16 bg-blue-500/20 rounded-2xl flex items-center justify-center mb-6">
                <span className="text-3xl font-black text-blue-400">1</span>
              </div>
              <h3 className="text-2xl font-bold text-white uppercase mb-4">Exit Audit</h3>
              <p className="text-gray-300 leading-relaxed">Checklist + risks identified. We map out every closure needed for a clean break.</p>
            </div>
            
            <div className="bg-white/5 border border-white/10 p-8 rounded-[2.5rem] hover-elevate transition-all backdrop-blur-sm">
              <div className="w-16 h-16 bg-emerald-500/20 rounded-2xl flex items-center justify-center mb-6">
                <span className="text-3xl font-black text-emerald-400">2</span>
              </div>
              <h3 className="text-2xl font-bold text-white uppercase mb-4">Execution</h3>
              <p className="text-gray-300 leading-relaxed">Closures, handovers, and vendor coordination. We do the legwork while you focus on your move.</p>
            </div>

            <div className="bg-white/5 border border-white/10 p-8 rounded-[2.5rem] hover-elevate transition-all backdrop-blur-sm">
              <div className="w-16 h-16 bg-purple-500/20 rounded-2xl flex items-center justify-center mb-6">
                <span className="text-3xl font-black text-purple-400">3</span>
              </div>
              <h3 className="text-2xl font-bold text-white uppercase mb-4">Clean Exit</h3>
              <p className="text-gray-300 leading-relaxed">Confirmations & peace of mind. All accounts closed, deposits recovered, compliance secured.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Trust Layer */}
      <section className="py-24 px-4 bg-[#0A3D62]/20 border-y border-white/5">
        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center">
            <div className="flex flex-col items-center">
              <ShieldCheck className="w-12 h-12 text-[#FFC845] mb-6" />
              <span className="text-white font-bold uppercase tracking-widest text-sm">UAE-based team</span>
            </div>
            <div className="flex flex-col items-center">
              <UserCheck className="w-12 h-12 text-[#FFC845] mb-6" />
              <span className="text-white font-bold uppercase tracking-widest text-sm">Confidential handling</span>
            </div>
            <div className="flex flex-col items-center">
              <CheckCircle2 className="w-12 h-12 text-[#FFC845] mb-6" />
              <span className="text-white font-bold uppercase tracking-widest text-sm">Pros & Families</span>
            </div>
          </div>
        </div>
      </section>

      {/* De-Prioritization Label */}
      <div className="text-center py-8 opacity-40">
        <p className="text-gray-500 text-sm uppercase font-bold tracking-[0.2em]">Other services available on request</p>
      </div>

      {/* Footer (Exit-only) */}
      <footer className="py-12 px-4 border-t border-white/5 mt-12">
        <div className="max-w-4xl mx-auto text-center text-gray-500">
          <div className="flex flex-wrap justify-center gap-8 mb-6">
            <a href="https://wa.me/971523946311" className="hover:text-emerald-500 font-bold">WhatsApp</a>
            <a href="mailto:service@deliwer.com" className="hover:text-white">Email</a>
            <span>Dubai, United Arab Emirates</span>
          </div>
          <p className="text-xs uppercase tracking-widest opacity-50">© 2026 DeliWer Relocate</p>
        </div>
      </footer>

      {/* Sticky Bottom Bar */}
      <div className="fixed bottom-0 left-0 right-0 z-50 p-4 md:hidden">
        <Button 
          className="w-full bg-emerald-600 hover:bg-emerald-500 text-white rounded-2xl h-16 shadow-2xl font-black text-lg flex items-center justify-center gap-3"
          onClick={() => window.open(whatsappLink, '_blank')}
        >
          <MessageSquare className="w-6 h-6" />
          Chat for Exit Concierge
        </Button>
      </div>

      <div className="fixed bottom-8 right-8 z-50 hidden md:block">
        <Button 
          className="bg-emerald-600 hover:bg-emerald-500 text-white rounded-full h-20 px-10 shadow-2xl font-black text-xl flex items-center justify-center gap-4"
          onClick={() => window.open(whatsappLink, '_blank')}
        >
          <MessageSquare className="w-8 h-8" />
          Chat for Exit Concierge
        </Button>
      </div>
    </div>
  );
}