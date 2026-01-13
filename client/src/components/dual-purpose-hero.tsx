import { useState } from "react";
import { Sparkles, ArrowRight, Building2, Heart, Zap, TrendingUp, Shield, CheckCircle2, Star, MessageCircle, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import heroImage from "@assets/generated_images/empty_dubai_apartment_interior_with_keys..png";
import ecosystemImage from "@assets/generated_images/peaceful_and_safe_dubai_environment_encouraging_relocation.png";
import settlementImage from "@assets/generated_images/cleaning_in_progress_in_a_dubai_home..png";
import nicolePhoto from "@assets/Nicole_Oliver.jpeg";
import residentProof from "@assets/IMG-20200320-WA0164_1768287785562.jpg";

export function DualPurposeHero() {
  return (
    <section className="relative overflow-hidden">
      {/* Main Hero Section */}
      <div className="relative py-20 sm:py-24 lg:py-32 px-4 overflow-hidden flex items-center min-h-[70vh]">
        {/* Full-width Hero Background Image */}
        <div 
          className="absolute inset-0 w-full h-full"
          style={{
            backgroundImage: `url(${heroImage})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center center',
            backgroundRepeat: 'no-repeat',
          }}
        >
          {/* Dark overlay for text readability */}
          <div className="absolute inset-0 bg-black/50"></div>
        </div>

        {/* Main Content */}
        <div className="max-w-4xl mx-auto relative z-10 text-center">
          {/* Simplified Headlines */}
          <div className="mb-10">
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
              <span className="text-white drop-shadow-2xl">Living in Dubai, made easier —starting with your move-in.</span>
            </h1>
            <p className="text-xl md:text-2xl text-white/90 font-medium max-w-3xl mx-auto drop-shadow-lg">We help residents settle in after they receive their keys — cleaning, setup, maintenance, and support.</p>
          </div>

          {/* CTA Section */}
          <div className="max-w-md mx-auto space-y-4">
            <Link href="/residence/move-in-services">
              <Button
                className="w-full bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white px-10 py-8 text-lg font-bold rounded-2xl shadow-2xl transition-all"
                data-testid="button-get-home-service-hero"
              >
                <Sparkles className="w-5 h-5 mr-3" />
                Get help moving in
              </Button>
            </Link>

            <p className="text-[12px] text-gray-300 mt-4 font-medium drop-shadow-md">
              No agents. No commissions. No pressure.
            </p>
          </div>
        </div>
      </div>
      {/* Trust & Proof Section Integrated */}
      <section 
        className="relative py-16 px-4 overflow-hidden"
        style={{
          backgroundImage: `url(${settlementImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundAttachment: 'fixed',
        }}
      >
        {/* Dark overlay for text readability */}
        <div className="absolute inset-0 bg-black/65"></div>

        <div className="max-w-6xl mx-auto relative z-10">
          {/* Section Header */}
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">Real people. Real help.</h2>
            <p className="text-lg md:text-xl text-gray-200 max-w-3xl mx-auto">Move-in services for new homes in Dubai — cleaning, water, maintenance & setup after you get the keys.</p>
          </div>

          {/* Secondary WhatsApp CTA */}
          <div className="mb-16 flex justify-center">
            <Button
              variant="outline"
              className="w-full max-w-md border-emerald-500/30 bg-emerald-500/10 text-emerald-400 hover:bg-emerald-500/20 px-10 py-8 text-lg font-bold rounded-2xl backdrop-blur-md transition-all flex items-center justify-center gap-3"
              onClick={() => window.open('https://wa.me/971523946311', '_blank')}
              data-testid="button-whatsapp-ecosystem-cta"
            >
              <MessageCircle className="w-6 h-6" />
              Chat on WhatsApp
            </Button>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 items-start">
            {/* Human Proof: Residents */}
            <div className="space-y-6">
              <h3 className="text-xs font-bold uppercase tracking-wider text-gray-400 mb-2 px-2">Real people. Real help.</h3>
              
              {/* Nikole */}
              <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-3xl p-6 hover-elevate transition-all">
                <div className="flex flex-col sm:flex-row gap-6 items-center">
                  <div className="shrink-0">
                    <Avatar className="h-20 w-20 border-2 border-emerald-500/30">
                      <AvatarImage src={nicolePhoto} alt="Nikole" className="object-cover" />
                      <AvatarFallback className="bg-emerald-500/20 text-emerald-400 font-bold">N</AvatarFallback>
                    </Avatar>
                  </div>
                  <div className="flex-1 text-center sm:text-left">
                    <div className="flex justify-center sm:justify-start gap-0.5 mb-2">
                      {[1, 2, 3, 4, 5].map((i) => (
                        <Star key={i} className="w-3 h-3 fill-amber-400 text-amber-400" />
                      ))}
                    </div>
                    <p className="text-white text-sm italic leading-relaxed mb-2 font-medium">
                      "DeliWer helped me set everything up so I could actually relax."
                    </p>
                    <div>
                      <h4 className="text-white font-bold text-sm">Nikole</h4>
                      <p className="text-emerald-400 text-[10px] font-bold uppercase tracking-widest flex items-center justify-center sm:justify-start gap-1">
                        <MapPinIcon className="w-3 h-3" /> JVC resident
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Resident Support */}
              <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-3xl p-6 hover-elevate transition-all">
                <div className="flex flex-col sm:flex-row gap-6 items-center">
                  <div className="shrink-0">
                    <Avatar className="h-20 w-20 border-2 border-emerald-500/30">
                      <AvatarImage src={residentProof} alt="Resident Support" className="object-cover" />
                      <AvatarFallback className="bg-emerald-500/20 text-emerald-400 font-bold">R</AvatarFallback>
                    </Avatar>
                  </div>
                  <div className="flex-1 text-center sm:text-left">
                    <div className="flex justify-center sm:justify-start gap-0.5 mb-2">
                      {[1, 2, 3, 4, 5].map((i) => (
                        <Star key={i} className="w-3 h-3 fill-amber-400 text-amber-400" />
                      ))}
                    </div>
                    <p className="text-white text-sm italic leading-relaxed mb-2 font-medium">
                      "The move-in coordination was a lifesaver. Everything handled by one person."
                    </p>
                    <div>
                      <h4 className="text-white font-bold text-sm">Resident Support</h4>
                      <p className="text-emerald-400 text-[10px] font-bold uppercase tracking-widest flex items-center justify-center sm:justify-start gap-1">
                        <MapPinIcon className="w-3 h-3" /> Community verified
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <p className="text-[10px] text-gray-400 italic px-2 border-l-2 border-emerald-500 ml-2">
                Supporting residents in Dubai's premier communities since Day One.
              </p>
            </div>

            {/* Operational Proof & CTA */}
            <div className="space-y-6">
              <div className="bg-black/40 backdrop-blur-md p-8 rounded-3xl border border-white/10">
                <h4 className="text-white font-bold mb-6 uppercase tracking-wider text-xs flex items-center gap-2">
                  <Shield className="w-4 h-4 text-blue-400" /> Operating across communities
                </h4>
                <ul className="space-y-4 text-gray-300 text-base">
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" /> 
                    <span>Not a real estate agency or moving company.</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" /> 
                    <span>Zero property sales or commission-based listings.</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" /> 
                    <span>Coordinating through a single human point of contact.</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" /> 
                    <span>Accountable until your home setup is complete.</span>
                  </li>
                </ul>
              </div>

              <div className="bg-amber-500/10 backdrop-blur-sm p-6 rounded-2xl border border-amber-500/20">
                <p className="text-gray-300 text-xs leading-relaxed text-center italic">
                  DeliWer works with vetted local service partners to ensure consistent delivery across JVC, JVT, Business Bay, and Marina.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </section>
  );
}

// Icon components - simplified
function MapPinIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
    </svg>
  );
}
