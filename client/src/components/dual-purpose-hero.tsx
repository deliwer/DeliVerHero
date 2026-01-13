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
import moveInBg from "@assets/generated_images/modern_dubai_apartment_handover_and_move-in_scene.png";
import emaarLogo from "@assets/generated_images/minimalist_white_emaar_developer_logo.png";
import damacLogo from "@assets/generated_images/minimalist_white_damac_developer_logo.png";
import nakheelLogo from "@assets/generated_images/minimalist_white_nakheel_developer_logo.png";
import binghattiLogo from "@assets/generated_images/minimalist_white_binghatti_developer_logo.png";

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
              <span className="text-white drop-shadow-2xl">Living in Dubai, made easier — start your move-in.</span>
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
          backgroundImage: `url(${moveInBg})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundAttachment: 'fixed',
        }}
      >
        {/* Dark overlay for text readability */}
        <div className="absolute inset-0 bg-black/75"></div>

        <div className="max-w-6xl mx-auto relative z-10">
          {/* Section Header */}
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-5xl text-white mb-4 font-normal">Why residents trust DeliWer during move-in</h2>
          </div>

          <div className="grid lg:grid-cols-2 gap-8 mb-16">
            {/* Block 1 — POSITIONAL TRUST (WHO WE ARE NOT) */}
            <div className="bg-black/40 backdrop-blur-md p-8 rounded-3xl border border-white/10 flex flex-col justify-center">
              <div className="flex items-center gap-3 mb-4 text-emerald-400">
                <Shield className="w-6 h-6" />
                <h3 className="text-lg font-bold uppercase tracking-wider">Who we are not</h3>
              </div>
              <div className="space-y-4 text-gray-200 text-lg">
                <p>DeliWer is not a real estate agency and does not list properties.</p>
                <p>We don’t earn commissions and we don’t push vendors.</p>
                <p className="font-bold text-white border-l-4 border-emerald-500 pl-4 py-2 bg-emerald-500/5 text-base">
                  Our role starts after you receive your apartment keys — when practical help matters most.
                </p>
              </div>
            </div>

            {/* Block 2 — LOCAL REALITY (WHERE WE OPERATE) */}
            <div className="bg-black/40 backdrop-blur-md p-8 rounded-3xl border border-white/10 flex flex-col justify-center">
              <div className="flex items-center gap-3 mb-4 text-blue-400">
                <Building2 className="w-6 h-6" />
                <h3 className="text-lg font-bold uppercase tracking-wider">Local Reality</h3>
              </div>
              <div className="space-y-4 text-gray-200 text-lg">
                <p>We currently support residents moving into selected Dubai communities, including JVC.</p>
                <p className="text-gray-400 italic text-base">
                  Coverage expands carefully, based on building access and on-ground readiness.
                </p>
              </div>
            </div>
          </div>

          <div className="grid lg:grid-cols-2 gap-8 items-center mb-16">
            {/* Block 3 — HUMAN PROOF (SINGLE, STRONG) */}
            <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-3xl p-8 hover-elevate transition-all font-extrabold">
              <div className="flex flex-col md:flex-row gap-8 items-center">
                <div className="shrink-0">
                  <Avatar className="h-24 w-24 border-2 border-emerald-500/30">
                    <AvatarImage src={nicolePhoto} alt="Nikole" className="object-cover" />
                    <AvatarFallback className="bg-emerald-500/20 text-emerald-400 font-bold text-xl">N</AvatarFallback>
                  </Avatar>
                </div>
                <div className="flex-1 text-center md:text-left">
                  <p className="text-white text-xl italic leading-relaxed mb-4 font-medium">
                    “I had just moved in and didn’t know where to start. DeliWer helped me get everything set up without dealing with multiple people.”
                  </p>
                  <div>
                    <h4 className="text-white font-bold text-lg">— Nikole</h4>
                    <p className="text-emerald-400 text-xs font-bold uppercase tracking-widest flex items-center justify-center md:justify-start gap-1 mt-1">
                      <MapPinIcon className="w-4 h-4" /> JVC resident
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Block — WHEN PEOPLE USE DELIWER */}
            <div className="bg-black/40 backdrop-blur-md p-8 rounded-3xl border border-white/10 flex flex-col justify-center">
              <div className="flex items-center gap-3 mb-4 text-amber-400">
                <Zap className="w-6 h-6" />
                <h3 className="text-lg font-bold uppercase tracking-wider">When people use DeliWer</h3>
              </div>
              <div className="space-y-6 text-gray-200">
                <div className="space-y-2">
                  <p className="text-xl font-medium text-white">Most people don’t struggle with finding a home.</p>
                  <p className="text-xl font-medium text-gray-400">They struggle with everything that comes after.</p>
                </div>
                <ul className="space-y-4">
                  {[
                    "You’ve just received your apartment keys",
                    "You’re moving into a new home",
                    "You need essentials set up quickly and correctly"
                  ].map((bullet, idx) => (
                    <li key={idx} className="flex items-start gap-3">
                      <CheckCircle2 className="w-6 h-6 text-emerald-500 shrink-0 mt-0.5" />
                      <span className="text-lg">{bullet}</span>
                    </li>
                  ))}
                </ul>
                <p className="font-bold text-white border-l-4 border-amber-500 pl-4 py-2 bg-amber-500/5 text-lg">
                  This is the exact moment DeliWer exists for.
                </p>
              </div>
            </div>

            {/* Block 4 — ECOSYSTEM SIGNAL (QUIET, NOT BRAGGY) */}
            <div className="space-y-6">
              <div className="bg-black/40 backdrop-blur-md p-8 rounded-3xl border border-white/10 h-full flex flex-col justify-center">
                <h4 className="text-gray-400 font-bold mb-4 uppercase tracking-wider text-xs">
                  Part of Dubai’s residential living ecosystem
                </h4>
                <p className="text-gray-300 text-base leading-relaxed">
                  DeliWer works alongside building teams, service providers, and community developments to support residents during move-in and early living stages.
                </p>
                {/* Logo Placeholder Area */}
                <div className="flex flex-wrap items-center gap-6 mt-8 opacity-60 grayscale hover:grayscale-0 transition-all">
                  <img src={emaarLogo} alt="Emaar" className="h-12 w-auto object-contain" />
                  <img src={damacLogo} alt="Damac" className="h-10 w-auto object-contain" />
                  <img src={nakheelLogo} alt="Nakheel" className="h-10 w-auto object-contain" />
                  <img src={binghattiLogo} alt="Binghatti" className="h-10 w-auto object-contain" />
                </div>
              </div>
            </div>
          </div>

          {/* Secondary WhatsApp CTA */}
          <div className="flex justify-center">
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
