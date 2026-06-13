import { Link } from "wouter";
import { useQuery } from "@tanstack/react-query";
import {
  Phone,
  Mail,
  MapPin,
  Twitter,
  Instagram,
  Linkedin,
  Youtube,
  Shield,
  Zap,
  Users,
  Star,
  Heart,
  ChevronRight,
  Building,
  Sparkles,
  Globe,
  TrendingUp,
  CalendarCheck,
} from "lucide-react";

import { SiFacebook, SiTiktok, SiGoogle } from "react-icons/si";
import { EmailSubscriptionForm } from "./email-subscription-form";
import { PaymentCTA } from "./payment-cta";

function DubaiSkylineSVG() {
  return (
    <svg
      viewBox="0 0 1440 200"
      preserveAspectRatio="xMidYMax meet"
      className="absolute bottom-0 left-0 w-full h-full pointer-events-none opacity-[0.055]"
      aria-hidden="true"
    >
      <path
        d="M0 200 L0 178 L22 178 L22 168 L42 168 L42 176 L62 176 L62 162 L78 162 L78 172 L96 172
           L96 158 L112 158 L112 168 L128 168 L128 152 L146 152 L146 162 L162 162 L162 145 L180 145
           L180 158 L196 158 L196 140 L214 140 L214 152 L230 152 L230 135 L248 135 L248 148 L265 148
           L265 130 L282 130 L282 142 L298 142 L298 125 L316 125 L316 136 L333 136 L333 120 L350 120
           L350 132 L366 132 L366 115 L380 115 L380 104
           L382 104 L382 88 L384 88 L384 70 L386 70 L386 52 L387 52 L387 36 L388 36
           L388 22 L389 22 L389 12 L390 12 L390 6 L391 6 L391 2 L392 2 L392 0
           L393 0 L393 2 L394 2 L394 6 L395 6 L395 12 L396 12 L396 22 L397 22
           L397 36 L398 36 L398 52 L400 52 L400 70 L402 70 L402 88 L404 88 L404 104
           L406 104 L406 115 L418 115 L418 102 L436 102 L436 115 L453 115 L453 100
           L470 100 L470 112 L487 112 L487 95
           L504 95 L504 82 L506 82 L506 70 L508 70 L508 60 L510 60 L510 72 L512 72 L512 82 L514 82 L514 95
           L524 95 L524 83 L526 83 L526 71 L528 71 L528 61 L530 61 L530 71 L532 71 L532 83 L534 83 L534 95
           L548 95 L548 108 L565 108 L565 95 L582 95 L582 108 L598 108 L598 120 L615 120
           L615 108 L632 108 L632 120 L648 120 L648 105 L665 105 L665 118 L682 118
           L682 104 L700 104 L700 115 L717 115 L717 102 L734 102 L734 115 L750 115
           L750 128 L768 128 L768 140 L785 140 L785 128 L802 128 L802 142 L818 142
           L818 130 L836 130 L836 145 L853 145 L853 158 L870 158 L870 148 L888 148
           L888 160 L905 160 L905 170 L925 170 L925 160 L950 160 L950 170 L978 170
           L978 176 L1025 176 L1025 170 L1075 170 L1075 176 L1135 176 L1135 180
           L1220 180 L1220 184 L1340 184 L1340 188 L1440 188 L1440 200 Z"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.2"
        strokeLinejoin="round"
        className="text-emerald-400"
      />
    </svg>
  );
}

export function Footer() {
  const { data: leagueStats } = useQuery<{ teams: number }>({
    queryKey: ["/api/league/stats"],
    refetchInterval: 30_000,
  });
  const teamCount = leagueStats?.teams ?? null;
  const spotsLeft = teamCount !== null ? Math.max(0, 16 - teamCount) : null;

  const consumerLinks = [
    { label: "Home Service", url: "/home" },
    { label: "Explore", url: "/explore" },
    { label: "AquaCafe Loyalty", url: "/aquacafe" },
    { label: "Rewards", url: "/earn" },
    { label: "🏏 Cricket League", url: "/league" },
  ];

  const b2bLinks = [
    { label: "Broker Partner Program", url: "/brokers" },
    { label: "ChainTrack Logistics", url: "/logistics" },
    { label: "Freight Broker Network", url: "/freight-broker" },
    { label: "ChainTrack B2B", url: "/chaintrack" },
    { label: "Corporate Trade-in", url: "/corporate" },
    { label: "Ambassadors", url: "/partners" },
    { label: "Investor Relations", url: "/invest" },
  ];

  const investorLinks = [
    { label: "Pitch Deck (Gust)", url: "https://www.gust.com/companies/deliwer" },
    { label: "Crunchbase Profile", url: "https://www.crunchbase.com/organization/deliwer-shopping" },
    { label: "Partners & Sponsors", url: "/partners" },
    { label: "Investment Dashboard", url: "/investor-dashboard" },
  ];

  const socialLinks = [
    { icon: SiGoogle, url: "https://g.page/r/CRptmgoZmDxSEBI/review", label: "Google Reviews", highlight: true },
    { icon: SiFacebook, url: "https://facebook.com/deliwer", label: "Facebook" },
    { icon: Instagram, url: "https://instagram.com/vdeliwer", label: "Instagram" },
    { icon: Youtube, url: "https://youtube.com/@vdeliwer", label: "YouTube" },
    { icon: SiTiktok, url: "https://tiktok.com/@vdeliwer", label: "TikTok" },
    { icon: Twitter, url: "https://twitter.com/vdeliwer", label: "Twitter" },
    { icon: Linkedin, url: "https://linkedin.com/company/deliwer", label: "LinkedIn" },
  ];

  const currentYear = new Date().getFullYear();

  const NavLink = ({ href, children, accent }: { href: string; children: React.ReactNode; accent?: string }) => {
    const isExternal = href.startsWith("http");
    const cls = `flex items-center text-gray-500 hover:text-white transition-colors text-sm group`;
    const chevron = <ChevronRight className={`w-3 h-3 mr-1.5 text-gray-700 group-hover:${accent || "text-white"} transition-colors flex-shrink-0`} />;
    return isExternal ? (
      <a href={href} target="_blank" rel="noopener noreferrer" className={cls}>{chevron}{children}</a>
    ) : (
      <Link href={href} className={cls}>{chevron}{children}</Link>
    );
  };

  return (
    <footer className="bg-slate-900 border-t border-slate-700/60 relative overflow-hidden">
      {/* ── Dubai Skyline Watermark ── */}
      <DubaiSkylineSVG />
      {/* ── Main Grid ── */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 pt-10 pb-8">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-x-8 gap-y-8">

          {/* Brand — spans 2 cols on lg */}
          <div className="col-span-2 lg:col-span-2 flex flex-col gap-4">

            {/* Logo */}
            <Link href="/" className="inline-flex items-center hover:opacity-80 transition-opacity">
              <span className="text-xl font-black text-white tracking-tight">DeliWer</span>
              <span className="ml-1.5 text-xs font-black uppercase tracking-widest text-hero-green-500 bg-hero-green-500/10 border border-hero-green-500/20 px-1.5 py-0.5 rounded">Sustainability</span>
            </Link>

            <p className="text-gray-500 text-sm leading-relaxed max-w-xs -mt-1">
              World's First Sustainability Game — trade devices for premium water systems while contributing to Dubai's green missions.
            </p>

            {/* ── Trust Signals Panel ── */}
            <div className="rounded-xl border border-hero-green-500/20 bg-gradient-to-br from-hero-green-500/5 via-transparent to-dubai-blue-900/20 p-3.5">
              <p className="text-[10px] font-black uppercase tracking-widest text-hero-green-500 mb-2.5 flex items-center gap-1.5">
                <Shield className="w-3 h-3" />Verified Partnerships & Impact
              </p>
              <div className="grid grid-cols-2 gap-2">
                <div className="flex items-center gap-1.5 bg-hero-green-500/10 border border-hero-green-500/20 rounded-lg px-2.5 py-1.5">
                  <Shield className="w-3 h-3 text-hero-green-500 flex-shrink-0" />
                  <span className="text-[11px] font-bold text-hero-green-400 leading-tight">DubaiCan Initiative</span>
                </div>
                <div className="flex items-center gap-1.5 bg-dubai-blue-500/10 border border-dubai-blue-500/20 rounded-lg px-2.5 py-1.5">
                  <Building className="w-3 h-3 text-dubai-blue-500 flex-shrink-0" />
                  <span className="text-[11px] font-bold text-dubai-blue-500 leading-tight">Circle Dubai</span>
                </div>
                <div className="flex items-center gap-1.5 bg-amber-500/10 border border-amber-500/20 rounded-lg px-2.5 py-1.5">
                  <Zap className="w-3 h-3 text-amber-400 flex-shrink-0" />
                  <span className="text-[11px] font-bold text-amber-400 leading-tight">2.4M+ Bottles Saved</span>
                </div>
                <div className="flex items-center gap-1.5 bg-sky-500/10 border border-sky-500/20 rounded-lg px-2.5 py-1.5">
                  <Users className="w-3 h-3 text-sky-400 flex-shrink-0" />
                  <span className="text-[11px] font-bold text-sky-400 leading-tight">12,847 Members</span>
                </div>
              </div>
            </div>

            {/* ── Feedback / Google Review CTA ── */}
            <a
              href="https://g.page/r/CRptmgoZmDxSEBI/review"
              target="_blank"
              rel="noopener noreferrer"
              data-testid="link-google-reviews"
              className="group relative overflow-hidden inline-flex items-center gap-2.5 rounded-xl border border-amber-500/30 bg-gradient-to-r from-amber-500/10 via-amber-400/5 to-transparent hover:from-amber-500/20 hover:border-amber-400/50 px-4 py-2.5 transition-all"
            >
              <div className="flex items-center gap-0.5">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-3 h-3 fill-amber-400 text-amber-400" />
                ))}
              </div>
              <div>
                <div className="text-xs font-black text-amber-300 uppercase tracking-wider leading-none">Leave a Google Review</div>
                <div className="text-[10px] text-amber-500/70 mt-0.5">Help us grow · Takes 30 seconds</div>
              </div>
              <ChevronRight className="w-4 h-4 text-amber-500/50 group-hover:text-amber-400 group-hover:translate-x-0.5 transition-all ml-auto flex-shrink-0" />
            </a>

            {/* ── Backlinking / Social Strip ── */}
            <div className="rounded-xl border border-dubai-blue-500/20 bg-dubai-blue-900/20 p-3">
              <p className="text-[10px] font-black uppercase tracking-widest text-dubai-blue-500 mb-2.5 flex items-center gap-1.5">
                <Globe className="w-3 h-3" />Follow & Connect
              </p>
              <div className="flex flex-wrap gap-1.5">
                {socialLinks.map(({ icon: Icon, url, label, highlight }) => (
                  <a
                    key={label}
                    href={url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`inline-flex items-center gap-1 px-2 py-1 rounded-lg text-[10px] font-bold transition-all ${
                      highlight
                        ? "bg-blue-600/25 hover:bg-blue-600/40 border border-blue-500/35 text-blue-300 hover:text-white"
                        : "bg-white/5 hover:bg-white/10 border border-white/10 text-gray-500 hover:text-white"
                    }`}
                    aria-label={label}
                    data-testid={`link-social-${label.toLowerCase().replace(/\s+/g, "-")}`}
                  >
                    <Icon className="w-3 h-3" />
                    <span>{label.replace(" Reviews", "")}</span>
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Services — Consumer + B2B stacked */}
          <div>
            <h3 className="text-xs font-black text-white uppercase tracking-widest mb-3 flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-emerald-500" />Consumer
            </h3>
            <div className="space-y-2 mb-5">
              {consumerLinks.map((link, i) => (
                <NavLink key={i} href={link.url} accent="text-emerald-500">{link.label}</NavLink>
              ))}
            </div>

            <h3 className="text-xs font-black text-white uppercase tracking-widest mb-3 flex items-center gap-1.5">
              <Building className="w-3.5 h-3.5 text-blue-500" />B2B
            </h3>
            <div className="space-y-2">
              {b2bLinks.map((link, i) => (
                <NavLink key={i} href={link.url} accent="text-blue-500">{link.label}</NavLink>
              ))}
            </div>
          </div>

          {/* Investors */}
          <div>
            <h3 className="text-xs font-black text-white uppercase tracking-widest mb-3 flex items-center gap-1.5">
              <TrendingUp className="w-3.5 h-3.5 text-amber-500" />Investors
            </h3>
            <div className="space-y-2 mb-5">
              {investorLinks.map((link, i) => (
                <NavLink key={i} href={link.url} accent="text-amber-500">{link.label}</NavLink>
              ))}
            </div>

            {/* Contacts */}
            <h3 className="text-xs font-black text-white uppercase tracking-widest mb-3 flex items-center gap-1.5">
              <Phone className="w-3.5 h-3.5 text-sky-500" />Contacts
            </h3>
            <div className="space-y-2.5">
              <a href="tel:+971523946311" className="flex items-start gap-2 text-gray-500 hover:text-white transition-colors group">
                <Phone className="w-3.5 h-3.5 mt-0.5 text-sky-600 flex-shrink-0" />
                <div>
                  <div className="text-xs font-semibold text-gray-400 group-hover:text-white">Hassan Jawad</div>
                  <div className="text-[11px] text-gray-600">Founder · +971 52 394 6311</div>
                </div>
              </a>
              <a href="tel:+971567148381" className="flex items-start gap-2 text-gray-500 hover:text-white transition-colors group">
                <Phone className="w-3.5 h-3.5 mt-0.5 text-sky-600 flex-shrink-0" />
                <div>
                  <div className="text-xs font-semibold text-gray-400 group-hover:text-white">Rubab Hassan</div>
                  <div className="text-[11px] text-gray-600">MD · +971 56 714 8381</div>
                </div>
              </a>
              <div className="flex items-start gap-2 text-gray-500">
                <MapPin className="w-3.5 h-3.5 mt-0.5 text-amber-600 flex-shrink-0" />
                <div className="text-[11px] text-gray-600">Dubai Airport Freezone<br />Block C, Dubai UAE</div>
              </div>
            </div>
          </div>

          {/* Connect & Pay */}
          <div>
            <h3 className="text-xs font-black text-white uppercase tracking-widest mb-3 flex items-center gap-1.5">
              <Heart className="w-3.5 h-3.5 text-emerald-500" />Connect
            </h3>
            <div className="flex flex-col gap-2 mb-5">
              {/* WhatsApp */}
              <a
                href="https://wa.me/971523906019"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-1.5 bg-emerald-500 hover:bg-emerald-600 text-black px-3 py-2 rounded-lg font-black text-xs transition-colors"
              >
                <Heart className="w-3 h-3" />Hassan (WhatsApp)
              </a>
              {/* Telegram */}
              <a
                href="https://t.me/+971523946311"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-1.5 bg-sky-500/10 border border-sky-500/30 hover:bg-sky-500/20 text-sky-400 px-3 py-2 rounded-lg font-black text-xs transition-colors"
              >
                <svg className="w-3 h-3" viewBox="0 0 24 24" fill="currentColor"><path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/></svg>
                Hassan (Telegram)
              </a>
              {/* Botim backup */}
              <a
                href="tel:+971523906019"
                className="inline-flex items-center justify-center gap-1.5 bg-purple-500/10 border border-purple-500/30 hover:bg-purple-500/20 text-purple-300 px-3 py-2 rounded-lg font-black text-xs transition-colors"
                title="Botim — backup channel if WhatsApp/Telegram unavailable"
              >
                <Phone className="w-3 h-3" />Botim +971 52 390 6019
              </a>
              {/* Rubab WhatsApp */}
              <a
                href="https://wa.me/971504547110"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-1.5 bg-emerald-500/10 border border-emerald-500/30 hover:bg-emerald-500/20 text-emerald-400 px-3 py-2 rounded-lg font-black text-xs transition-colors"
              >
                <Heart className="w-3 h-3" />Rubab (WhatsApp)
              </a>
              {/* ChainTrack Telegram channel */}
              <a
                href="https://t.me/chaintracklogistics"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-1.5 bg-sky-500/10 border border-sky-500/30 hover:bg-sky-500/20 text-sky-400 px-3 py-2 rounded-lg font-black text-xs transition-colors"
              >
                <svg className="w-3 h-3" viewBox="0 0 24 24" fill="currentColor"><path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/></svg>
                ChainTrack Channel
              </a>
              {/* Zoom — remote inspection */}
              <a
                href="mailto:formatix@hotmail.com?subject=Zoom%20Meeting%20Request%20-%20Remote%20Inspection&body=Hi%2C%20I%27d%20like%20to%20schedule%20a%20Zoom%20call%20for%20a%20ChainTrack%20remote%20inspection."
                className="inline-flex items-center justify-center gap-1.5 bg-blue-500/10 border border-blue-500/30 hover:bg-blue-500/20 text-blue-300 px-3 py-2 rounded-lg font-black text-xs transition-colors"
                title="Request a Zoom meeting for remote inspection"
              >
                <svg className="w-3 h-3" viewBox="0 0 24 24" fill="currentColor"><path d="M24 12c0 6.628-5.373 12-12 12S0 18.628 0 12 5.373 0 12 0s12 5.372 12 12zm-5.25-3.75H7.5C6.672 8.25 6 8.922 6 9.75v5.25c0 .826.672 1.5 1.5 1.5H18c.83 0 1.5-.674 1.5-1.5V9.75c0-.828-.67-1.5-1.5-1.5zM7.5 15V9.75H15V15H7.5zm12 0l-3-2.25V11.25L19.5 9v6z"/></svg>
                Zoom (formatix@hotmail.com)
              </a>
              {/* Microsoft Teams */}
              <a
                href="https://teams.microsoft.com/l/chat/0/0?users=formatix%40hotmail.com"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-1.5 bg-indigo-500/10 border border-indigo-500/30 hover:bg-indigo-500/20 text-indigo-300 px-3 py-2 rounded-lg font-black text-xs transition-colors"
                title="Chat or request a meeting on Microsoft Teams"
              >
                <svg className="w-3 h-3" viewBox="0 0 24 24" fill="currentColor"><path d="M24 12c0 6.628-5.373 12-12 12S0 18.628 0 12 5.373 0 12 0s12 5.372 12 12zm-9.857-4.875a1.875 1.875 0 1 0 0 3.75 1.875 1.875 0 0 0 0-3.75zM6 9.375A1.875 1.875 0 1 0 6 13.125 1.875 1.875 0 0 0 6 9.375zm8.143 1.5c.66 0 1.263.17 1.782.467.052-.02.108-.03.168-.03h2.282c.345 0 .625.28.625.625v3.688a2.5 2.5 0 0 1-2.5 2.5h-.25a2.5 2.5 0 0 1-2.5-2.5v-.188H12.5v.313A3.125 3.125 0 0 1 9.375 18.875h-.25A3.125 3.125 0 0 1 6 15.75V11c0-.345.28-.625.625-.625h2.75c.345 0 .625.28.625.625v.25c.52-.297 1.12-.5 1.768-.5h2.375z"/></svg>
                Teams (formatix@hotmail.com)
              </a>
              <Link href="/consult">
                <div className="inline-flex items-center justify-center gap-1.5 w-full bg-white/5 border border-white/10 hover:bg-white/10 text-gray-300 hover:text-white px-3 py-2 rounded-lg font-black text-xs transition-colors cursor-pointer">
                  <CalendarCheck className="w-3 h-3" />Book Consultation
                </div>
              </Link>
              <a
                href="mailto:admin@deliwer.com"
                className="inline-flex items-center justify-center gap-1.5 text-gray-600 hover:text-gray-400 text-xs transition-colors"
              >
                <Mail className="w-3 h-3" />admin@deliwer.com
              </a>
            </div>

            {/* Newsletter */}
            <h3 className="text-xs font-black text-white uppercase tracking-widest mb-2 flex items-center gap-1.5">
              <Mail className="w-3.5 h-3.5 text-emerald-500" />Newsletter
            </h3>
            <EmailSubscriptionForm variant="footer" />

          </div>
        </div>

        {/* ── League Feature Banner ── */}
        <div className="mt-8 mb-2">
          <Link href="/league">
            <div className="relative overflow-hidden rounded-2xl border border-emerald-500/30 cursor-pointer group">
              {/* Background photo */}
              <img
                src="https://images.unsplash.com/photo-1624526267942-ab0ff8a3e972?w=1400&auto=format&q=80"
                alt="Brokers Night Cricket League UAE 2026"
                className="absolute inset-0 w-full h-full object-cover object-center scale-105 group-hover:scale-110 transition-transform duration-700"
              />
              {/* Dark overlay */}
              <div className="absolute inset-0 bg-gradient-to-r from-[#0a0f1a]/95 via-[#0a0f1a]/70 to-emerald-900/40" />
              {/* Animated border glow */}
              <div className="absolute inset-0 rounded-2xl ring-1 ring-emerald-500/0 group-hover:ring-emerald-500/50 transition-all duration-500" />

              <div className="relative z-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 px-6 py-5 sm:px-8 sm:py-6">
                <div className="flex items-center gap-4">
                  {/* Pulsing live dot */}
                  <div className="shrink-0 w-12 h-12 rounded-xl bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center">
                    <span className="text-2xl">🏏</span>
                  </div>
                  <div>
                    <div className="flex items-center gap-2 mb-1 flex-wrap">
                      <span className="relative flex h-2 w-2">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
                      </span>
                      <span className="text-emerald-400 text-[10px] font-black uppercase tracking-widest">Registration Open</span>
                      {teamCount !== null && (
                        <span className={`text-[10px] font-black uppercase tracking-widest px-2 py-0.5 rounded-full ${
                          spotsLeft === 0
                            ? "bg-red-500/20 border border-red-500/40 text-red-400"
                            : spotsLeft !== null && spotsLeft <= 4
                            ? "bg-amber-500/20 border border-amber-500/40 text-amber-400"
                            : "bg-emerald-500/20 border border-emerald-500/40 text-emerald-400"
                        }`}>
                          {spotsLeft === 0
                            ? "Full — Join Waitlist"
                            : `${teamCount}/16 teams · ${spotsLeft} spot${spotsLeft === 1 ? "" : "s"} left`}
                        </span>
                      )}
                    </div>
                    <h3 className="text-white font-black text-base sm:text-lg leading-tight">
                      Brokers Night Cricket League<br className="sm:hidden" />
                      <span className="text-emerald-400"> UAE 2026</span>
                    </h3>
                    <p className="text-slate-400 text-xs mt-0.5">Play · Network · Grow — Majan Ground, Dubai · 16 Teams · Jul–Sep</p>
                  </div>
                </div>
                <div className="shrink-0 flex items-center gap-2 bg-emerald-500 group-hover:bg-emerald-400 text-white font-black text-sm px-5 py-2.5 rounded-xl transition-all">
                  Register →
                </div>
              </div>
            </div>
          </Link>
        </div>

        {/* ── Full-width Payment CTA ── */}
        <div className="mt-6 pt-6 border-t border-white/5">
          <PaymentCTA variant="footer" />
        </div>
      </div>
      {/* ── Bottom Bar ── */}
      <div className="relative z-10 border-t border-hero-green-500/10 bg-gradient-to-r from-dubai-blue-900/40 via-slate-950/80 to-hero-green-500/5">
        <div className="max-w-7xl mx-auto px-4 py-3 flex flex-col md:flex-row items-center justify-between gap-3">

          {/* Trust badges left */}
          <div className="flex items-center gap-2 flex-shrink-0">
            <span className="hidden sm:inline-flex items-center gap-1 text-[10px] font-black uppercase tracking-widest text-hero-green-500/70 bg-hero-green-500/8 border border-hero-green-500/15 px-2 py-1 rounded-full">
              <Globe className="w-2.5 h-2.5" />1st Sustainability Game
            </span>
            <span className="hidden sm:inline-flex items-center gap-1 text-[10px] font-black uppercase tracking-widest text-dubai-blue-500/70 bg-dubai-blue-500/8 border border-dubai-blue-500/15 px-2 py-1 rounded-full">
              <Shield className="w-2.5 h-2.5" />ISO 14001
            </span>
          </div>

          {/* Copyright + legal */}
          <div className="flex flex-wrap items-center justify-center gap-x-3 gap-y-1 text-[11px] text-gray-600 order-last md:order-none">
            <span className="text-gray-500 font-semibold">© {currentYear} DeliWer</span>
            <span className="text-slate-700">·</span>
            <Link href="/privacy" className="hover:text-hero-green-500 transition-colors">Privacy</Link>
            <span className="text-slate-700">·</span>
            <Link href="/terms" className="hover:text-hero-green-500 transition-colors">Terms</Link>
            <span className="text-slate-700">·</span>
            <Link href="/environmental" className="hover:text-hero-green-500 transition-colors">Environment</Link>
            <span className="text-slate-700">·</span>
            <Link href="/sponsorships" className="hover:text-hero-green-500 transition-colors">Sponsorships</Link>
          </div>

          {/* Social icon strip right */}
          <div className="flex items-center gap-1.5 flex-shrink-0">
            <span className="text-[9px] text-gray-700 font-black uppercase tracking-widest mr-1">Follow</span>
            {[
              { href: "https://g.page/r/CRptmgoZmDxSEBI/review", icon: SiGoogle, label: "Google", hoverCls: "hover:bg-blue-600/30 hover:border-blue-500/40 hover:text-blue-300", testid: "strip-link-google" },
              { href: "https://instagram.com/vdeliwer", icon: Instagram, label: "Instagram", hoverCls: "hover:bg-pink-600/25 hover:border-pink-500/30 hover:text-pink-400", testid: "strip-link-instagram" },
              { href: "https://facebook.com/deliwer", icon: SiFacebook, label: "Facebook", hoverCls: "hover:bg-blue-700/25 hover:border-blue-600/30 hover:text-blue-300", testid: "strip-link-facebook" },
              { href: "https://youtube.com/@vdeliwer", icon: Youtube, label: "YouTube", hoverCls: "hover:bg-red-700/25 hover:border-red-600/30 hover:text-red-400", testid: "strip-link-youtube" },
              { href: "https://tiktok.com/@vdeliwer", icon: SiTiktok, label: "TikTok", hoverCls: "hover:bg-white/10 hover:border-white/20 hover:text-white", testid: "strip-link-tiktok" },
              { href: "https://linkedin.com/company/deliwer", icon: Linkedin, label: "LinkedIn", hoverCls: "hover:bg-blue-700/25 hover:border-blue-600/30 hover:text-blue-300", testid: "strip-link-linkedin" },
            ].map(({ href, icon: Icon, label, hoverCls, testid }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                data-testid={testid}
                className={`w-6 h-6 rounded flex items-center justify-center bg-white/5 border border-white/5 text-gray-600 transition-all ${hoverCls}`}
                aria-label={label}
              >
                <Icon className="w-3 h-3" />
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
