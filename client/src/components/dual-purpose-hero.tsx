import { useState } from "react";
import { Sparkles, ArrowRight, Building2, Heart, Zap, TrendingUp, Shield, CheckCircle2, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import heroImage from "@assets/generated_images/empty_dubai_apartment_interior_with_keys..png";
import ecosystemImage from "@assets/generated_images/peaceful_and_safe_dubai_environment_encouraging_relocation.png";
import settlementImage from "@assets/generated_images/cleaning_in_progress_in_a_dubai_home..png";

export function DualPurposeHero() {
  const testimonials = [
    {
      id: 1,
      name: "Ahmed Al-Maktoum",
      initials: "AM",
      model: "Move-In Partner",
      text: "Relocating to Dubai was seamless with DeliWer. From business setup to sustainable home services, they handled everything with extreme professionalism."
    },
    {
      id: 2,
      name: "Sarah Johnson",
      initials: "SJ",
      model: "Business Founder",
      text: "The primary go-to for setup in Business Bay. Everything was coordinated on WhatsApp. We didn't have to manage different vendors."
    }
  ];

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
              <span className="text-white drop-shadow-2xl">Living in Dubai, made easier — move-in.</span>
            </h1>
            <p className="text-xl md:text-2xl text-white/90 font-medium max-w-3xl mx-auto drop-shadow-lg">We help residents settle in after they receive their keys — cleaning, setup, maintenance, and support.</p>
          </div>

          {/* Primary CTA Only */}
          <div className="max-w-md mx-auto">
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
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">How DeliWer helps</h2>
            <p className="text-lg md:text-xl text-gray-200 max-w-3xl mx-auto">Move-in services for new homes in Dubai — cleaning, water, maintenance & setup after you get the keys.</p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Column 1: Core Operations */}
            <div className="space-y-6">
              <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-6 hover-elevate">
                <h3 className="text-sm font-bold uppercase tracking-wider text-emerald-400 mb-4 flex items-center gap-2">
                  <MapPin className="w-4 h-4" /> Currently operating in:
                </h3>
                <div className="flex flex-wrap gap-2">
                  {["JVC / JVT", "Business Bay", "Marina / JLT", "Barsha Heights"].map((c) => (
                    <span key={c} className="px-3 py-1 bg-white/20 rounded-full text-white text-xs font-medium border border-white/10">
                      {c}
                    </span>
                  ))}
                </div>
              </div>

              <div className="bg-amber-500/10 backdrop-blur-sm p-6 rounded-2xl border border-amber-500/20">
                <p className="text-amber-400 font-bold text-xs mb-2 uppercase tracking-tight">Not a real estate agency. Not a moving company.</p>
                <p className="text-gray-300 text-xs leading-relaxed">
                  We do not sell property, show listings, or earn commissions. We work with vetted local partners to ensure consistent delivery.
                </p>
              </div>
            </div>

            {/* Column 2: Resident Feedback */}
            <div className="space-y-4">
              <h3 className="text-xs font-bold uppercase tracking-wider text-gray-400 mb-2 px-2">Resident Feedback</h3>
              {testimonials.map((testimonial) => (
                <div key={testimonial.id} className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-5">
                  <div className="flex items-center gap-3 mb-3">
                    <Avatar className="h-10 w-10 border border-white/20">
                      <AvatarFallback className="bg-white/10 text-white font-bold text-xs">{testimonial.initials}</AvatarFallback>
                    </Avatar>
                    <div>
                      <h4 className="text-white font-bold text-sm">{testimonial.name}</h4>
                      <p className="text-emerald-400 text-[10px] font-medium uppercase tracking-wider">{testimonial.model}</p>
                    </div>
                  </div>
                  <p className="text-gray-300 text-sm italic leading-relaxed mb-3">
                    "{testimonial.text}"
                  </p>
                  <div className="flex gap-1">
                    {Array.from({ length: 5 }).map((_, idx) => (
                      <Star key={idx} className="w-3 h-3 fill-emerald-500 text-emerald-500" />
                    ))}
                  </div>
                </div>
              ))}
              <p className="text-xs text-gray-400 italic px-2 border-l-2 border-emerald-500 ml-2">
                Most residents come through building referrals and word of mouth.
              </p>
            </div>

            {/* Column 3: Operational Proof & CTA */}
            <div className="space-y-6">
              <div className="bg-black/40 backdrop-blur-md p-6 rounded-2xl border border-white/10">
                <h4 className="text-white font-bold mb-4 uppercase tracking-wider text-xs flex items-center gap-2">
                  <Shield className="w-4 h-4 text-blue-400" /> Current Operations
                </h4>
                <ul className="space-y-3 text-gray-300 text-sm">
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500" /> 
                    Supporting residents across multiple communities
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500" /> 
                    Handling regular move-ins and service requests
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500" /> 
                    Coordinating through a single point of contact
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500" /> 
                    One DeliWer coordinator remains responsible until setup is complete.
                  </li>
                </ul>
              </div>

              <div className="pt-2">
                <p className="text-[10px] text-gray-500 italic mt-3 text-center">
                  DeliWer works with vetted local service partners to ensure consistent delivery.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </section>
  );
}

// Icon components
function ShoppingCart({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
    </svg>
  );
}

function MapPin({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
    </svg>
  );
}