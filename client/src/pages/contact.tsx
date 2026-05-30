import { Navigation } from "@/components/navigation";
import { ContactForm } from "@/components/contact-form";
import {
  Mail, Phone, MapPin, Clock, MessageCircle, Globe, Instagram,
  Twitter, Linkedin, Youtube, Facebook, TrendingUp, Briefcase,
  Send, Video, Users, Zap, Building2, ChevronRight
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { contactInfo } from "@/lib/contact-info";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const CHANNELS = [
  {
    id: "whatsapp",
    name: "WhatsApp",
    handle: "+971 52 394 6311",
    href: "https://wa.me/971523906019?text=Hi%20DeliWer%2C%20I%20need%20help%20with%20my%20move.",
    color: "emerald",
    bgClass: "bg-emerald-500 hover:bg-emerald-400",
    textClass: "text-white",
    borderClass: "border-emerald-500/30",
    badgeClass: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
    icon: (
      <svg className="w-5 h-5 shrink-0" viewBox="0 0 24 24" fill="currentColor">
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
      </svg>
    ),
    response: "≤ 10 min",
    hours: "7 am – 11 pm GST",
    bestFor: ["Move-in / move-out bookings", "Ejari & DEWA queries", "Quick price checks", "General concierge requests"],
    note: "Primary channel — fastest response guaranteed.",
    newTab: true,
  },
  {
    id: "telegram-dm",
    name: "Telegram DM",
    handle: "t.me/+971523946311",
    href: "https://t.me/+971523946311",
    color: "sky",
    bgClass: "bg-[#229ED9] hover:bg-[#1a8bbf]",
    textClass: "text-white",
    borderClass: "border-sky-500/30",
    badgeClass: "bg-sky-500/10 text-sky-400 border-sky-500/20",
    icon: (
      <svg className="w-5 h-5 shrink-0" viewBox="0 0 24 24" fill="currentColor">
        <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z" />
      </svg>
    ),
    response: "≤ 20 min",
    hours: "7 am – 11 pm GST",
    bestFor: ["WhatsApp alternative", "Sharing documents & photos", "Detailed written requests", "Status updates"],
    note: "Personal DM to Hassan — same team, different app.",
    newTab: true,
  },
  {
    id: "telegram-channel",
    name: "ChainTrack Channel",
    handle: "@chaintracklogistics",
    href: "https://t.me/chaintracklogistics",
    color: "sky",
    bgClass: "bg-sky-700 hover:bg-sky-600",
    textClass: "text-white",
    borderClass: "border-sky-600/30",
    badgeClass: "bg-sky-900/30 text-sky-300 border-sky-700/20",
    icon: (
      <svg className="w-5 h-5 shrink-0" viewBox="0 0 24 24" fill="currentColor">
        <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z" />
      </svg>
    ),
    response: "Broadcast",
    hours: "New lot alerts daily",
    bestFor: ["ChainTrack lot updates", "B2B electronics sourcing news", "Flash auction announcements", "Logistics updates"],
    note: "Subscribe for real-time ChainTrack lot alerts.",
    newTab: true,
  },
  {
    id: "botim",
    name: "Botim",
    handle: "+971 52 394 6311",
    href: "tel:+971523946311",
    color: "purple",
    bgClass: "bg-purple-700 hover:bg-purple-600",
    textClass: "text-white",
    borderClass: "border-purple-500/30",
    badgeClass: "bg-purple-500/10 text-purple-300 border-purple-500/20",
    icon: <Phone className="w-5 h-5 shrink-0" />,
    response: "Direct call",
    hours: "9 am – 9 pm GST",
    bestFor: ["Backup when WhatsApp/Telegram unavailable", "UAE VoIP calls (Etisalat/du networks)", "Urgent escalations", "Calling from blocked apps"],
    note: "Backup channel — use if primary channels are unreachable.",
    newTab: false,
  },
  {
    id: "zoom",
    name: "Zoom",
    handle: "formatix@hotmail.com",
    href: "mailto:formatix@hotmail.com?subject=Zoom%20Meeting%20Request%20-%20DeliWer%20%2F%20ChainTrack&body=Hi%20Hassan%2C%0A%0AI%27d%20like%20to%20schedule%20a%20Zoom%20call.%0A%0ATopic%3A%20%5BRemote%20inspection%20%2F%20Consultation%20%2F%20Partnership%5D%0APreferred%20time%3A%20%5Byour%20timezone%20%2B%20slot%5D%0A%0AThanks",
    color: "blue",
    bgClass: "bg-blue-600 hover:bg-blue-500",
    textClass: "text-white",
    borderClass: "border-blue-500/30",
    badgeClass: "bg-blue-500/10 text-blue-300 border-blue-500/20",
    icon: <Video className="w-5 h-5 shrink-0" />,
    response: "Scheduled",
    hours: "By appointment",
    bestFor: ["Remote lot inspection (ChainTrack)", "B2B partnership calls", "Investor meetings", "Multi-party consultations"],
    note: "Email to book — include preferred time & timezone.",
    newTab: false,
  },
  {
    id: "teams",
    name: "Microsoft Teams",
    handle: "formatix@hotmail.com",
    href: "https://teams.microsoft.com/l/chat/0/0?users=formatix%40hotmail.com",
    color: "indigo",
    bgClass: "bg-indigo-600 hover:bg-indigo-500",
    textClass: "text-white",
    borderClass: "border-indigo-500/30",
    badgeClass: "bg-indigo-500/10 text-indigo-300 border-indigo-500/20",
    icon: <Users className="w-5 h-5 shrink-0" />,
    response: "Scheduled",
    hours: "By appointment",
    bestFor: ["Corporate / enterprise clients", "Remote inspection with screen share", "Legal & NDA review sessions", "Formal deal structuring"],
    note: "Preferred for corporate buyers and formal negotiations.",
    newTab: true,
  },
];

const colorMap: Record<string, { pill: string; dot: string; border: string; hover: string }> = {
  emerald: { pill: "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20", dot: "bg-emerald-400", border: "border-l-emerald-500", hover: "hover:border-emerald-500/40" },
  sky:     { pill: "bg-sky-500/10 text-sky-400 border border-sky-500/20",             dot: "bg-sky-400",     border: "border-l-sky-500",     hover: "hover:border-sky-500/40" },
  purple:  { pill: "bg-purple-500/10 text-purple-300 border border-purple-500/20",    dot: "bg-purple-400",  border: "border-l-purple-500",  hover: "hover:border-purple-500/40" },
  blue:    { pill: "bg-blue-500/10 text-blue-300 border border-blue-500/20",          dot: "bg-blue-400",    border: "border-l-blue-500",    hover: "hover:border-blue-500/40" },
  indigo:  { pill: "bg-indigo-500/10 text-indigo-300 border border-indigo-500/20",   dot: "bg-indigo-400",  border: "border-l-indigo-500",  hover: "hover:border-indigo-500/40" },
};

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-slate-950 text-white" data-testid="contact-page">
      <Navigation />

      {/* ── Hero ─────────────────────────────────────────────── */}
      <section className="pt-16 pb-10 px-4 text-center">
        <Badge className="bg-emerald-500/10 text-emerald-400 border-emerald-500/20 mb-4">CONTACT & CHANNELS</Badge>
        <h1 className="text-4xl md:text-5xl font-black uppercase tracking-tighter text-white mb-3">
          Reach Us on <span className="text-emerald-400">Any Channel</span>
        </h1>
        <p className="text-gray-400 max-w-xl mx-auto text-base leading-relaxed">
          WhatsApp is fastest — but we're reachable on Telegram, Botim, Zoom, and Microsoft Teams. Pick the channel that works best for you.
        </p>
        <div className="flex items-center justify-center gap-2 mt-4 text-xs text-gray-500 font-bold uppercase tracking-widest">
          <span className="inline-block w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          All channels monitored · Dubai (GST / UTC+4)
        </div>
      </section>

      {/* ── Channel Cards Grid ───────────────────────────────── */}
      <section className="px-4 pb-14 max-w-7xl mx-auto">
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {CHANNELS.map((ch) => {
            const c = colorMap[ch.color];
            return (
              <div
                key={ch.id}
                className={`bg-slate-900 border border-slate-800 border-l-4 ${c.border} ${c.hover} rounded-2xl p-6 flex flex-col gap-4 transition-colors`}
                data-testid={`card-channel-${ch.id}`}
              >
                {/* Header */}
                <div className="flex items-start justify-between gap-2">
                  <div className="flex items-center gap-3">
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${ch.bgClass} shrink-0`}>
                      {ch.icon}
                    </div>
                    <div>
                      <p className="font-black text-white text-sm uppercase tracking-wide">{ch.name}</p>
                      <p className="text-[11px] text-gray-500 font-mono mt-0.5">{ch.handle}</p>
                    </div>
                  </div>
                  <span className={`text-[10px] font-black px-2 py-0.5 rounded-full whitespace-nowrap shrink-0 ${c.pill}`}>
                    {ch.response}
                  </span>
                </div>

                {/* Hours */}
                <div className="flex items-center gap-1.5 text-[11px] text-gray-500">
                  <Clock className="w-3.5 h-3.5 shrink-0" />
                  {ch.hours}
                </div>

                {/* Best For */}
                <ul className="space-y-1.5">
                  {ch.bestFor.map((item) => (
                    <li key={item} className="flex items-start gap-2 text-[12px] text-gray-400">
                      <ChevronRight className="w-3 h-3 mt-0.5 shrink-0 text-gray-600" />
                      {item}
                    </li>
                  ))}
                </ul>

                {/* Note */}
                <p className="text-[11px] text-gray-600 italic border-t border-slate-800 pt-3">{ch.note}</p>

                {/* CTA */}
                <a
                  href={ch.href}
                  target={ch.newTab ? "_blank" : undefined}
                  rel={ch.newTab ? "noopener noreferrer" : undefined}
                  data-testid={`button-contact-${ch.id}`}
                  className={`inline-flex items-center justify-center gap-2 w-full ${ch.bgClass} ${ch.textClass} font-black text-xs uppercase tracking-widest px-4 py-2.5 rounded-xl transition-colors`}
                >
                  {ch.icon}
                  Open {ch.name}
                </a>
              </div>
            );
          })}
        </div>
      </section>

      {/* ── Which Channel Guide ──────────────────────────────── */}
      <section className="px-4 pb-14 max-w-5xl mx-auto">
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-8">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-9 h-9 bg-emerald-500/10 rounded-xl flex items-center justify-center">
              <Zap className="w-5 h-5 text-emerald-400" />
            </div>
            <div>
              <h2 className="font-black text-white uppercase tracking-wide text-sm">Which channel should I use?</h2>
              <p className="text-gray-500 text-xs mt-0.5">Quick reference — pick the right one first time</p>
            </div>
          </div>
          <div className="grid sm:grid-cols-2 gap-4">
            {[
              { q: "I want to book a move-in / move-out", a: "WhatsApp", color: "text-emerald-400" },
              { q: "I need to send documents or photos", a: "WhatsApp or Telegram DM", color: "text-sky-400" },
              { q: "WhatsApp is blocked on my network", a: "Telegram DM or Botim", color: "text-purple-300" },
              { q: "I want to inspect a ChainTrack lot remotely", a: "Zoom or Teams (book via email)", color: "text-blue-300" },
              { q: "I'm a corporate buyer / enterprise client", a: "Microsoft Teams", color: "text-indigo-300" },
              { q: "I want ChainTrack lot alerts automatically", a: "Join @chaintracklogistics on Telegram", color: "text-sky-300" },
              { q: "I can't reach WhatsApp or Telegram at all", a: "Call / Botim +971 52 394 6311", color: "text-purple-300" },
              { q: "I prefer email / formal written inquiry", a: "Zoom or Teams (formatix@hotmail.com)", color: "text-blue-300" },
            ].map(({ q, a, color }) => (
              <div key={q} className="flex items-start gap-3 bg-slate-800/50 rounded-xl p-4">
                <MessageCircle className="w-4 h-4 text-gray-600 mt-0.5 shrink-0" />
                <div>
                  <p className="text-[12px] text-gray-300 leading-relaxed">{q}</p>
                  <p className={`text-[12px] font-black mt-1 ${color}`}>→ {a}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Founders + Contact Form + Map ────────────────────── */}
      <section className="px-4 pb-16 max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-5 gap-8">

          {/* Left col: Founders + connect links */}
          <div className="lg:col-span-2 space-y-6">

            {/* Founder cards */}
            <div className="space-y-4">
              {contactInfo.founders.map((founder, index) => (
                <Card key={index} className="bg-slate-900 border-slate-800">
                  <CardContent className="p-5 flex items-center gap-4">
                    <Avatar className="h-14 w-14 border-2 border-emerald-500/30 shrink-0">
                      <AvatarImage
                        src={founder.name === "Hassan Jawad" ? "/assets/hassan-jawad.jpg" : founder.name === "Rubab Hassan" ? "/assets/rubab-hassan.jpg" : ""}
                        alt={founder.name}
                      />
                      <AvatarFallback className="bg-emerald-500/10 text-emerald-500 font-bold uppercase text-sm">
                        {founder.name.split(" ").map((n: string) => n[0]).join("")}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1 min-w-0">
                      <p className="font-black text-white text-sm uppercase tracking-tight">{founder.name}</p>
                      <p className="text-emerald-500 font-bold text-[10px] uppercase mb-2">{founder.title}</p>
                      <div className="flex flex-wrap gap-2">
                        {founder.linkedin && (
                          <a href={founder.linkedin} target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-blue-400 transition-colors">
                            <Linkedin className="w-4 h-4" />
                          </a>
                        )}
                        <a href={`mailto:${founder.email}`} className="text-gray-500 hover:text-emerald-400 transition-colors">
                          <Mail className="w-4 h-4" />
                        </a>
                        <a href={`${contactInfo.ctas.whatsappBase}${founder.whatsappLink}`} target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-emerald-400 transition-colors" title="WhatsApp">
                          <MessageCircle className="w-4 h-4" />
                        </a>
                        <a href="https://t.me/+971523946311" target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-sky-400 transition-colors" title="Telegram DM">
                          <Send className="w-4 h-4" />
                        </a>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Social & discovery links */}
            <Card className="bg-slate-900 border-slate-800">
              <CardContent className="p-5">
                <p className="text-xs font-black text-white uppercase tracking-widest mb-4">Follow & Discover</p>
                <div className="grid grid-cols-2 gap-2 mb-4">
                  {[
                    { href: contactInfo.social.facebook,  icon: <Facebook className="w-4 h-4" />,  label: "Facebook" },
                    { href: contactInfo.social.instagram, icon: <Instagram className="w-4 h-4" />, label: "Instagram" },
                    { href: contactInfo.social.twitter,   icon: <Twitter className="w-4 h-4" />,   label: "Twitter" },
                    { href: contactInfo.social.youtube,   icon: <Youtube className="w-4 h-4" />,   label: "YouTube" },
                    { href: contactInfo.social.tiktok,    icon: <Globe className="w-4 h-4" />,      label: "TikTok" },
                    { href: contactInfo.social.linkedin,  icon: <Linkedin className="w-4 h-4" />,  label: "LinkedIn" },
                  ].map(({ href, icon, label }) => (
                    <a key={label} href={href} target="_blank" rel="noopener noreferrer"
                      className="flex items-center gap-2 text-gray-500 hover:text-emerald-400 text-xs font-medium transition-colors">
                      {icon} {label}
                    </a>
                  ))}
                </div>
                <div className="border-t border-slate-800 pt-4 grid grid-cols-2 gap-2">
                  <a href={contactInfo.ctas.crunchbase} target="_blank" rel="noopener noreferrer"
                    className="flex items-center gap-1.5 text-blue-400 hover:text-blue-300 text-xs font-medium transition-colors">
                    <TrendingUp className="w-3.5 h-3.5" /> Crunchbase
                  </a>
                  <a href={contactInfo.ctas.gust} target="_blank" rel="noopener noreferrer"
                    className="flex items-center gap-1.5 text-amber-400 hover:text-amber-300 text-xs font-medium transition-colors">
                    <Briefcase className="w-3.5 h-3.5" /> Gust
                  </a>
                </div>
              </CardContent>
            </Card>

            {/* Office location */}
            <Card className="bg-slate-900 border-slate-800">
              <CardContent className="p-5">
                <p className="text-xs font-black text-white uppercase tracking-widest mb-3 flex items-center gap-2">
                  <Building2 className="w-4 h-4 text-emerald-400" /> Office
                </p>
                <p className="text-gray-400 text-sm leading-relaxed">
                  {contactInfo.company.address.name}<br />
                  {contactInfo.company.address.street}<br />
                  {contactInfo.company.address.city}
                </p>
                <p className="text-[11px] text-gray-600 mt-2 flex items-center gap-1.5">
                  <Clock className="w-3 h-3" /> Sun – Thu, 9 am – 6 pm GST
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Right col: Contact form + map */}
          <div className="lg:col-span-3 space-y-6">
            <Card className="bg-slate-900 border-slate-800">
              <CardHeader className="pb-2">
                <CardTitle className="text-white text-lg font-black uppercase tracking-tight">Send a Message</CardTitle>
                <p className="text-gray-400 text-sm">We'll respond via WhatsApp or email within 24 hours.</p>
              </CardHeader>
              <CardContent>
                <ContactForm />
              </CardContent>
            </Card>

            <Card className="bg-slate-900 border-slate-800">
              <CardHeader className="pb-2">
                <CardTitle className="text-white text-lg font-black uppercase tracking-tight flex items-center gap-2">
                  <MapPin className="w-5 h-5 text-emerald-400" /> Visit Our Office
                </CardTitle>
                <p className="text-gray-400 text-sm">Dubai Airport Freezone (DAFZA)</p>
              </CardHeader>
              <CardContent>
                <div className="rounded-xl overflow-hidden border border-slate-800">
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d619.689590867552!2d55.37004855431323!3d25.26343187419722!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3e5f5dfd9c7ff531%3A0x523c98190a9a6d1a!2sDeliWer%20Shopping%20FZCO!5e0!3m2!1sen!2sae!4v1756616088732!5m2!1sen!2sae"
                    width="100%"
                    height="300"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    title="DeliWer Office Map"
                  />
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </div>
  );
}
