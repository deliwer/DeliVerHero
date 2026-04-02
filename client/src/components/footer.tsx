import { Link } from "wouter";
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
  const consumerLinks = [
    { label: "Home Service", url: "/home" },
    { label: "Explore", url: "/explore" },
    { label: "AquaCafe Loyalty", url: "/aquacafe" },
    { label: "Rewards", url: "/earn" },
  ];

  const b2bLinks = [
    { label: "Broker Partner Program", url: "/broker-partner" },
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
          <div className="col-span-2 lg:col-span-2">
            <Link href="/" className="inline-flex items-center mb-3 hover:opacity-80 transition-opacity">
              <span className="text-xl font-black text-white tracking-tight">DeliWer</span>
              <span className="ml-1.5 text-xs font-black uppercase tracking-widest text-emerald-500 bg-emerald-500/10 px-1.5 py-0.5 rounded">Sustainability</span>
            </Link>

            <p className="text-gray-500 text-sm leading-relaxed mb-4 max-w-xs">
              World's First Sustainability Game — trade devices for premium water systems while contributing to Dubai's green missions.
            </p>

            {/* Stats row */}
            <div className="flex flex-wrap gap-x-4 gap-y-1.5 mb-4">
              <span className="flex items-center text-xs text-emerald-400 font-semibold">
                <Shield className="w-3 h-3 mr-1 text-emerald-500" />DubaiCan Initiative
              </span>
              <span className="flex items-center text-xs text-blue-400 font-semibold">
                <Building className="w-3 h-3 mr-1 text-blue-500" />Circle Dubai
              </span>
              <span className="flex items-center text-xs text-gray-500">
                <Zap className="w-3 h-3 mr-1 text-amber-500" />2.4M+ Bottles Saved
              </span>
              <span className="flex items-center text-xs text-gray-500">
                <Users className="w-3 h-3 mr-1 text-sky-500" />12,847 Members
              </span>
            </div>

            {/* Google Review CTA */}
            <a
              href="https://g.page/r/CRptmgoZmDxSEBI/review"
              target="_blank"
              rel="noopener noreferrer"
              data-testid="link-google-reviews"
              className="inline-flex items-center gap-1.5 bg-white/5 hover:bg-white/10 border border-white/10 hover:border-amber-400/40 text-amber-400 hover:text-amber-300 px-3 py-1.5 rounded-lg text-[11px] font-black uppercase tracking-widest transition-all mb-4"
            >
              <Star className="w-3 h-3 fill-amber-400" />
              Leave a Google Review
            </a>

            {/* Social icons */}
            <div className="flex flex-wrap gap-2">
              {socialLinks.map(({ icon: Icon, url, label, highlight }) => (
                <a
                  key={label}
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`w-8 h-8 rounded-lg flex items-center justify-center transition-colors group ${
                    highlight
                      ? "bg-blue-600/20 hover:bg-blue-600/40 border border-blue-500/30"
                      : "bg-slate-800 hover:bg-slate-700"
                  }`}
                  aria-label={label}
                  data-testid={`link-social-${label.toLowerCase().replace(/\s+/g, "-")}`}
                >
                  <Icon className={`w-4 h-4 ${highlight ? "text-blue-400 group-hover:text-white" : "text-gray-500 group-hover:text-white"}`} />
                </a>
              ))}
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
                  <div className="text-[11px] text-gray-600">CEO · +971 52 394 6311</div>
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
              <a
                href="https://wa.me/971523946311"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-1.5 bg-emerald-500 hover:bg-emerald-600 text-black px-3 py-2 rounded-lg font-black text-xs transition-colors"
              >
                <Heart className="w-3 h-3" />Hassan (WhatsApp)
              </a>
              <a
                href="https://wa.me/971504547110"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-1.5 bg-emerald-500/10 border border-emerald-500/30 hover:bg-emerald-500/20 text-emerald-400 px-3 py-2 rounded-lg font-black text-xs transition-colors"
              >
                <Heart className="w-3 h-3" />Rubab (WhatsApp)
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

            {/* PayPal Payment CTA */}
            <PaymentCTA variant="footer" />
          </div>
        </div>
      </div>

      {/* ── Social + Legal Bar ── */}
      <div className="relative z-10 border-t border-slate-800/80 bg-slate-950/70">
        <div className="max-w-7xl mx-auto px-4 py-4 flex flex-col md:flex-row items-center justify-between gap-3">

          {/* Social strip */}
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-[10px] text-gray-600 font-black uppercase tracking-widest mr-1 flex items-center gap-1">
              <Star className="w-3 h-3 text-amber-500" />Follow
            </span>
            {[
              { href: "https://g.page/r/CRptmgoZmDxSEBI/review", icon: SiGoogle, label: "Google", cls: "text-blue-400", testid: "strip-link-google" },
              { href: "https://instagram.com/vdeliwer", icon: Instagram, label: "IG", cls: "text-pink-400", testid: "strip-link-instagram" },
              { href: "https://facebook.com/deliwer", icon: SiFacebook, label: "FB", cls: "text-blue-300", testid: "strip-link-facebook" },
              { href: "https://youtube.com/@vdeliwer", icon: Youtube, label: "YT", cls: "text-red-400", testid: "strip-link-youtube" },
              { href: "https://tiktok.com/@vdeliwer", icon: SiTiktok, label: "TT", cls: "text-gray-300", testid: "strip-link-tiktok" },
              { href: "https://linkedin.com/company/deliwer", icon: Linkedin, label: "LI", cls: "text-blue-300", testid: "strip-link-linkedin" },
            ].map(({ href, icon: Icon, label, cls, testid }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                data-testid={testid}
                className={`w-7 h-7 rounded-md flex items-center justify-center bg-white/5 hover:bg-white/10 border border-white/5 ${cls} hover:text-white transition-all`}
                aria-label={label}
              >
                <Icon className="w-3.5 h-3.5" />
              </a>
            ))}
          </div>

          {/* Copyright + legal links */}
          <div className="flex flex-wrap items-center justify-center gap-x-3 gap-y-1 text-[11px] text-gray-600">
            <span>© {currentYear} DeliWer</span>
            <span className="hidden md:inline text-gray-700">·</span>
            <Link href="/privacy" className="hover:text-gray-400 transition-colors">Privacy</Link>
            <span className="text-gray-700">·</span>
            <Link href="/terms" className="hover:text-gray-400 transition-colors">Terms</Link>
            <span className="text-gray-700">·</span>
            <Link href="/environmental" className="hover:text-gray-400 transition-colors">Environment</Link>
            <span className="text-gray-700">·</span>
            <Link href="/sponsorships" className="hover:text-gray-400 transition-colors">Sponsorships</Link>
          </div>

          {/* Badges */}
          <div className="hidden xl:flex items-center gap-3 text-[10px]">
            <span className="flex items-center gap-1 text-gray-600">
              <Globe className="w-3 h-3 text-emerald-600" />World's First Sustainability Game
            </span>
            <span className="flex items-center gap-1 text-gray-600">
              <Shield className="w-3 h-3 text-emerald-600" />ISO 14001
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
