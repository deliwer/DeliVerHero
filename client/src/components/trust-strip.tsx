import { MessageCircle, Mail, MapPin, CheckCircle, Phone, Star, Home, Users, Clock, Play } from "lucide-react";
import { SiGoogle, SiYoutube } from "react-icons/si";
import { Link } from "wouter";
import { trackFunnel } from "@/lib/funnel-track";

interface TrustStripProps {
  variant?: "light" | "dark";
  showContact?: boolean;
}

export function TrustStrip({ variant = "dark", showContact = true }: TrustStripProps) {
  const textClass = variant === "dark" ? "text-emerald-100/70" : "text-gray-600";
  const iconClass = variant === "dark" ? "text-emerald-400" : "text-emerald-600";
  
  return (
    <div className="inline-flex items-center gap-4 md:gap-8 text-sm whitespace-nowrap">
      {/* YouTube Channel CTA — positioned first for max conversion */}
      <a
        href="https://www.youtube.com/@vdeliwer"
        target="_blank"
        rel="noopener noreferrer"
        className="group relative inline-flex items-center gap-2.5 pr-3 pl-0.5 py-0.5 rounded-lg border border-red-500/40 bg-red-500/10 hover:bg-red-500/20 hover:border-red-500/60 transition-all duration-300 shrink-0"
        data-testid="trust-strip-youtube"
      >
        <span className="absolute inset-0 rounded-lg animate-pulse bg-red-500/5 pointer-events-none" />
        {/* Mini video thumbnail */}
        <div className="relative w-[52px] h-[30px] rounded-md overflow-hidden bg-slate-800 border border-red-500/30 shrink-0 flex items-center justify-center">
          <div className="absolute inset-0 bg-gradient-to-br from-red-900/60 via-slate-900/80 to-slate-800/90" />
          <div className="relative z-10 w-6 h-6 rounded-full bg-red-600 flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
            <Play className="w-3 h-3 text-white fill-white ml-0.5" />
          </div>
          <SiYoutube className="absolute bottom-0.5 right-0.5 w-2.5 h-2.5 text-red-500/80" />
        </div>
        <div className="flex flex-col gap-0.5">
          <span className="uppercase tracking-widest text-[8px] font-black text-red-400/70 leading-none">Free Training</span>
          <span className="uppercase tracking-widest text-[9px] font-black text-red-300 group-hover:text-red-200 transition-colors leading-none">Watch Now →</span>
        </div>
      </a>
      <div className="h-5 w-px bg-white/10 shrink-0" />

      {showContact && (
        <>
          <Link href="/earn">
            <span className="cursor-pointer inline-flex items-center gap-1.5 text-amber-400 hover:text-amber-300 transition-colors uppercase tracking-widest text-[10px] font-black" data-testid="trust-strip-earn">
              <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse shrink-0" />
              Earn Rewards
            </span>
          </Link>
          <Link href="/concierge-pricing">
            <span className={`cursor-pointer ${textClass} hover:text-white transition-colors uppercase tracking-widest text-[10px] font-black`}>Pricing</span>
          </Link>
          <Link href="/contact">
            <span className={`cursor-pointer ${textClass} hover:text-white transition-colors uppercase tracking-widest text-[10px] font-black`}>Contact</span>
          </Link>
          <Link href="/about">
            <span className={`cursor-pointer ${textClass} hover:text-white transition-colors uppercase tracking-widest text-[10px] font-black`}>About</span>
          </Link>
          <div className="h-4 w-px bg-white/10 hidden md:block mx-2" />
          <a 
            href="tel:+971523946311"
            className={`flex items-center gap-2 ${textClass} hover:text-white transition-colors`}
            data-testid="link-phone"
          >
            <Phone className={`w-4 h-4 ${iconClass}`} />
            <span>+971 52 394 6311</span>
          </a>
          <a 
            href="mailto:info@deliwer.com"
            className={`flex items-center gap-2 ${textClass} hover:text-white transition-colors`}
            data-testid="link-email"
          >
            <Mail className={`w-4 h-4 ${iconClass}`} />
            <span>info@deliwer.com</span>
          </a>
        </>
      )}
      <div className={`flex items-center gap-2 ${textClass}`}>
        <MapPin className={`w-4 h-4 ${iconClass}`} />
        <span>Dubai, UAE</span>
      </div>
      <div className={`flex items-center gap-2 ${textClass}`}>
        <CheckCircle className={`w-4 h-4 ${iconClass}`} />
        <span>Verified Services</span>
      </div>

    </div>
  );
}

export function OperationalBadges({ variant = "dark" }: { variant?: "light" | "dark" }) {
  const bgClass = variant === "dark" ? "bg-white/5 border-white/10" : "bg-emerald-50 border-emerald-100";
  const textClass = variant === "dark" ? "text-white" : "text-gray-800";
  const subTextClass = variant === "dark" ? "text-emerald-100/70" : "text-gray-600";
  
  const badges = [
    { icon: Home, value: "1000+", label: "Homes Serviced" },
    { icon: Clock, value: "Same Day", label: "Assessment Available" },
    { icon: Users, value: "Trusted", label: "By Expat Communities" },
  ];
  
  return (
    <div className="flex flex-wrap justify-center gap-4 md:gap-6">
      {badges.map((badge, i) => (
        <div 
          key={i} 
          className={`flex items-center gap-3 px-4 py-2 rounded-lg border ${bgClass}`}
        >
          <badge.icon className={`w-5 h-5 ${variant === "dark" ? "text-emerald-400" : "text-emerald-600"}`} />
          <div>
            <div className={`font-bold text-sm ${textClass}`}>{badge.value}</div>
            <div className={`text-xs ${subTextClass}`}>{badge.label}</div>
          </div>
        </div>
      ))}
    </div>
  );
}

export function PartnerStrip() {
  return (
    <div className="py-8 border-t border-b border-white/10 space-y-6">
      {/* Premier Govt Services Partner — highlighted row */}
      <div className="rounded-xl border border-amber-400/30 bg-amber-400/5 px-6 py-4 flex flex-col sm:flex-row items-center justify-center gap-4 text-center sm:text-left">
        <div className="flex flex-col items-center sm:items-start gap-1">
          <span className="text-[9px] text-amber-400 font-black uppercase tracking-widest">Premier Government Services Ecosystem Partner</span>
          <a
            href="https://www.apbmcdxb.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-base font-black text-white hover:text-amber-300 transition-colors"
          >Advance Plus Management Consultancy</a>
          <span className="text-[10px] text-white/40">Government Services · Business Setup · PRO Services — Dubai</span>
        </div>
        <a
          href="https://www.apbmcdxb.com"
          target="_blank"
          rel="noopener noreferrer"
          className="shrink-0 text-[10px] font-black uppercase tracking-widest text-amber-400 border border-amber-400/40 px-3 py-1.5 rounded-lg hover:bg-amber-400/10 transition-all"
        >apmcdxb.com →</a>
      </div>
      {/* Ecosystem & Distribution Partners */}
      <div className="grid md:grid-cols-2 gap-6">
        <div className="space-y-3">
          <p className="text-[10px] text-blue-400 font-black uppercase tracking-widest text-center">Ecosystem Partners</p>
          <div className="flex justify-center items-center gap-6">
            <div className="flex flex-col items-center gap-1.5 group">
              <div className="w-10 h-10 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center font-bold text-blue-400 text-sm group-hover:border-blue-500/60 transition-all">TC</div>
              <span className="text-[10px] font-black uppercase tracking-widest text-white/40 group-hover:text-white transition-colors">Trustee Centers</span>
            </div>
            <div className="flex flex-col items-center gap-1.5 group">
              <div className="w-10 h-10 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center font-bold text-blue-400 text-sm group-hover:border-blue-500/60 transition-all">SGM</div>
              <span className="text-[10px] font-black uppercase tracking-widest text-white/40 group-hover:text-white transition-colors">Smart Global Movers</span>
            </div>
          </div>
        </div>

        <div className="space-y-3 md:border-l md:border-white/10 md:pl-6">
          <p className="text-[10px] text-emerald-400 font-black uppercase tracking-widest text-center">Distribution Partners</p>
          <div className="flex justify-center items-center gap-6">
            <div className="flex flex-col items-center gap-1.5 group">
              <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center font-bold text-emerald-400 text-sm group-hover:border-emerald-500/60 transition-all">RE</div>
              <span className="text-[10px] font-black uppercase tracking-widest text-white/40 group-hover:text-white transition-colors">Real Estate Agencies</span>
            </div>
            <div className="flex flex-col items-center gap-1.5 group">
              <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center font-bold text-emerald-400 text-sm group-hover:border-emerald-500/60 transition-all">GLG</div>
              <span className="text-[10px] font-black uppercase tracking-widest text-white/40 group-hover:text-white transition-colors">Global Living Group</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

const testimonials = [
  {
    quote: "Shower filters installed smoothly and hassle-free — water feels noticeably cleaner and gentler on skin and hair. Definitely recommend.",
    author: "Zoya Abassi",
    location: "Dubai",
    rating: 5,
    verified: true,
  },
  {
    quote: "Moved into Dubai in July, and our home was summer-ready on day one — hassle-free!",
    author: "Sarah",
    location: "Dubai Marina",
    rating: 5
  },
  {
    quote: "AC serviced and water delivered in hours — DeliWer saved our move-in week.",
    author: "Ahmed",
    location: "JVC",
    rating: 5
  },
  {
    quote: "Exit handover was smooth. Got our full deposit back without any issues.",
    author: "Michael",
    location: "Downtown Dubai",
    rating: 5
  },
  {
    quote: "Best home service experience in Dubai. One team, one timeline, zero stress.",
    author: "Priya",
    location: "Business Bay",
    rating: 5
  },
  {
    quote: "Great service and professional people.",
    author: "Becky Choi",
    location: "Dubai",
    rating: 5,
    verified: true,
  },
  {
    quote: "Best service in town.",
    author: "Syed Ghayoor Hassan",
    location: "Dubai",
    rating: 5,
    verified: true,
  }
];

export function TestimonialCarousel({ variant = "dark", limit = 3 }: { variant?: "light" | "dark"; limit?: number }) {
  const cardBg = variant === "dark" ? "bg-white/5 border-white/10" : "bg-white border-gray-200";
  const textClass = variant === "dark" ? "text-white" : "text-gray-800";
  const subTextClass = variant === "dark" ? "text-emerald-100/70" : "text-gray-500";
  
  return (
    <div className="overflow-hidden">
      <div className="flex flex-wrap justify-center gap-4">
        {testimonials.slice(0, limit).map((t, i) => (
          <div 
            key={i} 
            className={`flex-1 min-w-[280px] max-w-[350px] p-5 rounded-xl border ${cardBg}`}
          >
            <div className="flex gap-1 mb-3">
              {[...Array(t.rating)].map((_, j) => (
                <Star key={j} className="w-4 h-4 fill-amber-400 text-amber-400" />
              ))}
            </div>
            <p className={`text-sm ${textClass} mb-3 leading-relaxed`}>"{t.quote}"</p>
            <p className={`text-xs ${subTextClass} flex items-center gap-2 flex-wrap`}>
              <span>— {t.author}, {t.location}</span>
              {(t as any).verified && (
                <span
                  className="inline-flex items-center gap-1 text-[9px] font-bold uppercase tracking-wider px-1.5 py-0.5 rounded-full bg-blue-500/10 text-blue-400 border border-blue-500/30"
                  title="Verified Google Review"
                  data-testid={`badge-google-verified-${i}`}
                >
                  <SiGoogle className="w-2.5 h-2.5" />
                  Google
                </span>
              )}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

export function ProcessMicroflow({ variant = "dark" }: { variant?: "light" | "dark" }) {
  const textClass = variant === "dark" ? "text-white" : "text-gray-800";
  const subTextClass = variant === "dark" ? "text-emerald-100/70" : "text-gray-600";
  const iconBg = variant === "dark" ? "bg-emerald-500/20" : "bg-emerald-100";
  const iconColor = variant === "dark" ? "text-emerald-400" : "text-emerald-600";
  const lineColor = variant === "dark" ? "bg-emerald-500/30" : "bg-emerald-200";
  
  const steps = [
    { number: "1", title: "Book Your Pack", desc: "Choose your service" },
    { number: "2", title: "We Inspect", desc: "Prepare your home" },
    { number: "3", title: "Move-In Ready", desc: "Start living!" }
  ];
  
  return (
    <div className="flex flex-wrap justify-center items-start gap-4 md:gap-8">
      {steps.map((step, i) => (
        <div key={i} className="flex items-center gap-4">
          <div className="text-center">
            <div className={`w-12 h-12 rounded-full ${iconBg} flex items-center justify-center mx-auto mb-2`}>
              <span className={`font-bold text-lg ${iconColor}`}>{step.number}</span>
            </div>
            <div className={`text-sm font-medium ${textClass}`}>{step.title}</div>
            <div className={`text-xs ${subTextClass}`}>{step.desc}</div>
          </div>
          {i < steps.length - 1 && (
            <div className={`hidden md:block w-12 h-0.5 ${lineColor} mt-[-20px]`} />
          )}
        </div>
      ))}
    </div>
  );
}
