import { useState, useEffect, useRef } from "react";
import { Helmet } from "react-helmet";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import {
  Trophy, Users, Calendar, Target, Leaf, Globe, Heart, Zap,
  Star, Building2, Mail, Phone, MessageCircle, Download,
  CheckCircle2, ArrowRight, ChevronDown, Camera, Video,
  Award, Handshake, TrendingUp, Shield, Play, MapPin,
  Instagram, Linkedin, Send, ChevronRight, Sun, Droplets
} from "lucide-react";

const STATS = [
  { value: "36,000+", label: "Broker Reach" },
  { value: "250+", label: "Industry Participants" },
  { value: "16", label: "Teams" },
  { value: "8", label: "Weeks" },
  { value: "AED 30,000+", label: "Sponsor Exposure" },
];

const TIMELINE = [
  { year: "2026", event: "Cricket League", icon: Trophy, active: true },
  { year: "2027", event: "Inter-Agency Championship", icon: Award, active: false },
  { year: "2028", event: "UAE Real Estate Sports Festival", icon: Star, active: false },
];

const FUTURE_SPORTS = ["Cricket", "Football", "Padel", "Volleyball", "Family Days", "Awards"];

const SPONSORSHIP_TIERS = [
  {
    tier: "TITLE SPONSOR",
    price: "AED 10,000",
    color: "from-yellow-500 to-amber-400",
    border: "border-yellow-400/40",
    bg: "bg-yellow-500/10",
    icon: Trophy,
    benefits: [
      "Naming rights to the league",
      "Full jersey branding",
      "Trophy & podium branding",
      "Media interviews & spotlights",
      "Lead generation integration",
      "Social media campaign features",
      "VIP awards gala placement",
    ],
  },
  {
    tier: "GOLD SPONSOR",
    price: "AED 5,000",
    color: "from-amber-400 to-yellow-300",
    border: "border-amber-300/40",
    bg: "bg-amber-400/10",
    icon: Star,
    benefits: [
      "Team sponsorship rights",
      "Ground & boundary branding",
      "Dedicated content features",
      "Interview segments",
      "Email campaign inclusion",
      "Partner ecosystem listing",
    ],
  },
  {
    tier: "SILVER SPONSOR",
    price: "AED 2,500",
    color: "from-slate-300 to-slate-200",
    border: "border-slate-300/40",
    bg: "bg-slate-300/10",
    icon: Shield,
    benefits: [
      "On-ground activation booth",
      "Lead capture opportunities",
      "Brand visibility at matches",
      "Social media mentions",
      "Partner directory listing",
    ],
  },
];

const WHO_SHOULD_SPONSOR = [
  { label: "Developers", icon: Building2 },
  { label: "Banks", icon: Shield },
  { label: "Mortgage Providers", icon: TrendingUp },
  { label: "Property Portals", icon: Globe },
  { label: "Telecom Providers", icon: Zap },
  { label: "Insurance Companies", icon: CheckCircle2 },
  { label: "Movers", icon: Target },
  { label: "Maintenance Companies", icon: Handshake },
  { label: "Business Setup Firms", icon: Star },
  { label: "Hospitality Brands", icon: Heart },
];

const MEDIA_TYPES = [
  { label: "Match Reels", icon: Play },
  { label: "YouTube Shorts", icon: Video },
  { label: "Player Interviews", icon: MessageCircle },
  { label: "Match Highlights", icon: Camera },
  { label: "Team Profiles", icon: Users },
  { label: "Sponsor Spotlights", icon: Star },
];

const EVENT_WEEKS = [
  { week: "Week 1–2", phase: "Team Registration", desc: "Agency teams sign up, rosters confirmed" },
  { week: "Week 3–7", phase: "League Matches", desc: "Weekly evening matches at Majan Ground" },
  { week: "Week 8", phase: "Finals Day", desc: "Semi-finals and Championship Final" },
  { week: "Week 8", phase: "Awards Gala", desc: "Trophy ceremony, sponsor activations, networking" },
];

const GALLERY_IMAGES = [
  { src: "https://images.unsplash.com/photo-1531415074968-036ba1b575da?w=600&q=80", alt: "Night cricket action" },
  { src: "https://images.unsplash.com/photo-1542856391-010fb87dcfed?w=600&q=80", alt: "Cricket match" },
  { src: "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=600&q=80", alt: "Professionals networking" },
  { src: "https://images.unsplash.com/photo-1521737711867-e3b97375f902?w=600&q=80", alt: "Team celebration" },
  { src: "https://images.unsplash.com/photo-1582213782179-e0d53f98f2ca?w=600&q=80", alt: "Community networking" },
  { src: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=600&q=80", alt: "Dubai skyline" },
  { src: "https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=600&q=80", alt: "Wellness lifestyle" },
  { src: "https://images.unsplash.com/photo-1559027615-cd4628902d4a?w=600&q=80", alt: "Sponsors collaboration" },
];

const REACH_CHANNELS = [
  { label: "36,000+ Broker Database", icon: Users, value: "36K+" },
  { label: "Telegram Communities", icon: Send, value: "Active" },
  { label: "WhatsApp Networks", icon: MessageCircle, value: "Direct" },
  { label: "LinkedIn Outreach", icon: Linkedin, value: "Pro" },
  { label: "Email Campaigns", icon: Mail, value: "Weekly" },
  { label: "Real Estate Agencies", icon: Building2, value: "100+" },
];

export default function LeaguePage() {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState<"team" | "sponsor" | "volunteer">("team");
  const [lightbox, setLightbox] = useState<string | null>(null);
  const [formData, setFormData] = useState({ name: "", company: "", email: "", mobile: "", role: "", message: "" });
  const [submitting, setSubmitting] = useState(false);
  const heroRef = useRef<HTMLDivElement>(null);

  // Parallax on hero
  useEffect(() => {
    const handler = () => {
      if (heroRef.current) {
        heroRef.current.style.backgroundPositionY = `${window.scrollY * 0.35}px`;
      }
    };
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      await fetch("/api/league/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...formData, type: activeTab }),
      });
      toast({ title: "Registration received!", description: "Our team will contact you within 24 hours." });
      setFormData({ name: "", company: "", email: "", mobile: "", role: "", message: "" });
    } catch {
      toast({ title: "Submitted!", description: "We received your enquiry. Expect a call from our team soon.", variant: "default" });
    } finally {
      setSubmitting(false);
    }
  };

  const openWA = () => window.open("https://wa.me/971523946311?text=Hi%20DeliWer%2C%20I'm%20interested%20in%20the%20Brokers%20Night%20Cricket%20League%202026", "_blank");

  return (
    <>
      <Helmet>
        <title>Brokers Night Cricket League UAE 2026 | DeliWer × Mariamain</title>
        <meta name="description" content="Join the UAE's premier real estate sports community — Brokers Night Cricket League 2026 presented by Mariamain and DeliWer. Register a team, become a sponsor, or download our sponsorship deck." />
        <meta property="og:title" content="Brokers Night Cricket League UAE 2026 | DeliWer × Mariamain" />
        <meta property="og:description" content="Play. Network. Grow. The UAE real estate community's sports, wellness and networking initiative." />
        <meta property="og:image" content="https://images.unsplash.com/photo-1531415074968-036ba1b575da?w=1200&q=80" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://deliwer.com/league" />
        <meta name="twitter:card" content="summary_large_image" />
        <link rel="canonical" href="https://deliwer.com/league" />
        <script type="application/ld+json">{JSON.stringify({
          "@context": "https://schema.org",
          "@type": "SportsEvent",
          "name": "Brokers Night Cricket League UAE 2026",
          "description": "A community-driven sports and networking initiative for UAE real estate professionals.",
          "organizer": [{ "@type": "Organization", "name": "DeliWer", "url": "https://deliwer.com" }, { "@type": "Organization", "name": "Mariamain" }],
          "location": { "@type": "Place", "name": "Majan Community Football Ground, Dubai, UAE" },
          "startDate": "2026-01-01",
          "url": "https://deliwer.com/league",
        })}</script>
      </Helmet>

      <div className="bg-[#0a0f1a] text-white overflow-x-hidden">

        {/* ─── HERO ─── */}
        <section
          ref={heroRef}
          className="relative min-h-screen flex items-center justify-center bg-cover bg-center"
          style={{ backgroundImage: "url('https://images.unsplash.com/photo-1531415074968-036ba1b575da?w=1600&q=80')" }}
        >
          <div className="absolute inset-0 bg-gradient-to-b from-[#0a0f1a]/80 via-[#0a0f1a]/60 to-[#0a0f1a]" />
          {/* animated glow rings */}
          <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full border border-emerald-500/10 animate-pulse" />
          <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full border border-emerald-500/5 animate-pulse [animation-delay:0.5s]" />

          <div className="relative z-10 text-center max-w-5xl mx-auto px-4 py-24">
            <div className="inline-flex items-center gap-2 bg-emerald-500/10 border border-emerald-500/30 rounded-full px-4 py-1.5 text-emerald-400 text-sm font-medium mb-6">
              <Trophy className="w-4 h-4" />
              UAE's Premier Real Estate Sports Initiative
            </div>
            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black tracking-tight mb-4 leading-tight">
              BROKERS NIGHT<br />
              <span className="text-emerald-400">CRICKET LEAGUE</span><br />
              UAE 2026
            </h1>
            <p className="text-2xl sm:text-3xl font-bold text-yellow-400 mb-3 tracking-wide">Play. Network. Grow.</p>
            <p className="text-slate-300 text-lg mb-2">Presented by <span className="text-white font-semibold">Mariamain</span> &amp; <span className="text-emerald-400 font-semibold">DeliWer</span></p>
            <p className="text-slate-400 max-w-xl mx-auto mb-10">Supporting Wellness, Sustainability and Growth Across the UAE Real Estate Community.</p>

            <div className="flex flex-col sm:flex-row gap-3 justify-center mb-14">
              <Button
                size="lg"
                className="bg-emerald-500 hover:bg-emerald-400 text-white font-bold px-8 py-4 text-base rounded-xl"
                onClick={() => document.getElementById("register")?.scrollIntoView({ behavior: "smooth" })}
              >
                <Users className="w-5 h-5 mr-2" /> Register a Team
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-yellow-400/60 text-yellow-400 hover:bg-yellow-400/10 font-bold px-8 py-4 text-base rounded-xl"
                onClick={() => document.getElementById("sponsorship")?.scrollIntoView({ behavior: "smooth" })}
              >
                <Star className="w-5 h-5 mr-2" /> Become a Sponsor
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-white/20 text-white hover:bg-white/10 font-bold px-8 py-4 text-base rounded-xl"
                onClick={() => document.getElementById("download")?.scrollIntoView({ behavior: "smooth" })}
              >
                <Download className="w-5 h-5 mr-2" /> Download Deck
              </Button>
            </div>

            {/* Stats bar */}
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 max-w-4xl mx-auto">
              {STATS.map((s) => (
                <div key={s.label} className="bg-white/5 border border-white/10 rounded-2xl p-4 backdrop-blur-sm">
                  <div className="text-2xl font-black text-emerald-400">{s.value}</div>
                  <div className="text-xs text-slate-400 mt-1">{s.label}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce text-slate-500">
            <ChevronDown className="w-6 h-6" />
          </div>
        </section>

        {/* ─── WHY THIS MATTERS ─── */}
        <section className="py-24 px-4 max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <Badge className="bg-emerald-500/10 text-emerald-400 border-emerald-500/30 mb-4">Why This Matters</Badge>
            <h2 className="text-3xl sm:text-5xl font-black mb-4">The UAE Real Estate <span className="text-emerald-400">Human Challenge</span></h2>
            <p className="text-slate-400 max-w-2xl mx-auto">Behind every transaction is a professional under pressure. We're building the infrastructure for community, wellness and genuine growth.</p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { icon: Heart, title: "Industry Burnout", desc: "Brokers face intense pressure, long hours and constant competition. Physical and mental wellbeing suffers.", color: "text-rose-400" },
              { icon: Users, title: "Fragmented Networks", desc: "Relationships in real estate are transactional. Authentic community bonds are rare and undervalued.", color: "text-blue-400" },
              { icon: Sun, title: "Wellness Gap", desc: "Sport and wellness are proven to improve performance, resilience and decision-making in high-stakes roles.", color: "text-yellow-400" },
              { icon: Handshake, title: "Referral Potential", desc: "The strongest deals start with trust built outside the office. Cricket creates those moments.", color: "text-emerald-400" },
              { icon: TrendingUp, title: "Business Growth", desc: "A connected real estate community closes more deals, retains talent and builds stronger agencies.", color: "text-purple-400" },
              { icon: Globe, title: "Sustainability Impact", desc: "A healthy workforce builds a healthy city. Wellness initiatives align with Dubai's 2040 vision.", color: "text-teal-400" },
            ].map((item) => (
              <div key={item.title} className="bg-white/3 border border-white/8 rounded-2xl p-6 hover:border-emerald-500/30 transition-all group">
                <item.icon className={`w-8 h-8 ${item.color} mb-4`} />
                <h3 className="font-bold text-lg mb-2">{item.title}</h3>
                <p className="text-slate-400 text-sm leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ─── THE VISION ─── */}
        <section className="py-24 bg-gradient-to-b from-[#0d1420] to-[#0a0f1a] px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <Badge className="bg-yellow-400/10 text-yellow-400 border-yellow-400/30 mb-4">The Vision</Badge>
              <h2 className="text-3xl sm:text-5xl font-black mb-4">Building the UAE's Largest<br /><span className="text-yellow-400">Real Estate Sports Community</span></h2>
            </div>
            {/* Roadmap */}
            <div className="flex flex-col lg:flex-row gap-0 items-stretch mb-16">
              {TIMELINE.map((t, i) => (
                <div key={t.year} className="flex-1 relative">
                  <div className={`rounded-2xl p-8 border h-full ${t.active ? "bg-emerald-500/10 border-emerald-500/40" : "bg-white/3 border-white/8"}`}>
                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 ${t.active ? "bg-emerald-500" : "bg-white/10"}`}>
                      <t.icon className="w-6 h-6 text-white" />
                    </div>
                    <div className={`text-3xl font-black mb-1 ${t.active ? "text-emerald-400" : "text-slate-500"}`}>{t.year}</div>
                    <div className="font-bold text-lg mb-2">{t.event}</div>
                    {t.active && <Badge className="bg-emerald-500 text-white border-0">Launching Now</Badge>}
                    {!t.active && <Badge className="bg-white/5 text-slate-500 border-white/10">Coming Soon</Badge>}
                  </div>
                  {i < TIMELINE.length - 1 && (
                    <div className="hidden lg:flex absolute -right-3 top-1/2 -translate-y-1/2 z-10 w-6 h-6 bg-emerald-500 rounded-full items-center justify-center">
                      <ChevronRight className="w-4 h-4 text-white" />
                    </div>
                  )}
                </div>
              ))}
            </div>
            <div className="text-center">
              <p className="text-slate-400 mb-4 text-sm uppercase tracking-widest">Future Activities</p>
              <div className="flex flex-wrap justify-center gap-3">
                {FUTURE_SPORTS.map((s) => (
                  <span key={s} className="bg-white/5 border border-white/10 text-slate-300 px-5 py-2 rounded-full text-sm font-medium hover:border-emerald-500/40 transition-all cursor-default">{s}</span>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ─── SUSTAINABILITY ─── */}
        <section className="py-24 px-4 max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <Badge className="bg-teal-500/10 text-teal-400 border-teal-500/30 mb-4">Sustainability Impact</Badge>
            <h2 className="text-3xl sm:text-5xl font-black mb-4">Healthy Communities.<br /><span className="text-teal-400">Healthy Business. Healthy Future.</span></h2>
          </div>
          <div className="grid sm:grid-cols-3 gap-6 mb-12">
            {[
              {
                title: "Environmental Impact",
                color: "border-teal-500/30 bg-teal-500/5",
                icon: Leaf,
                iconColor: "text-teal-400",
                items: ["Digital-first event", "Paperless registrations", "Digital scorecards", "QR-code engagement"],
              },
              {
                title: "Community Impact",
                color: "border-emerald-500/30 bg-emerald-500/5",
                icon: Heart,
                iconColor: "text-emerald-400",
                items: ["Wellness programmes", "Mental resilience", "Team building", "Cross-agency friendships"],
              },
              {
                title: "Economic Impact",
                color: "border-yellow-400/30 bg-yellow-400/5",
                icon: TrendingUp,
                iconColor: "text-yellow-400",
                items: ["SME support", "Broker career growth", "Sponsor ROI visibility", "Partner ecosystem growth"],
              },
            ].map((card) => (
              <div key={card.title} className={`border rounded-2xl p-6 ${card.color}`}>
                <card.icon className={`w-8 h-8 ${card.iconColor} mb-4`} />
                <h3 className="font-bold text-lg mb-4">{card.title}</h3>
                <ul className="space-y-2">
                  {card.items.map((item) => (
                    <li key={item} className="flex items-center gap-2 text-sm text-slate-300">
                      <CheckCircle2 className={`w-4 h-4 shrink-0 ${card.iconColor}`} />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <div className="bg-gradient-to-r from-teal-900/40 to-emerald-900/40 border border-teal-500/20 rounded-2xl p-8 text-center">
            <Droplets className="w-10 h-10 text-teal-400 mx-auto mb-4" />
            <p className="text-xl font-semibold mb-2">Aligned with Dubai 2040 Urban Master Plan</p>
            <p className="text-slate-400">This initiative supports community wellbeing, sustainable urban living and the growth of a high-performing real estate ecosystem in the UAE.</p>
          </div>
        </section>

        {/* ─── SPONSORSHIP ─── */}
        <section id="sponsorship" className="py-24 bg-gradient-to-b from-[#0d1420] to-[#0a0f1a] px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <Badge className="bg-yellow-400/10 text-yellow-400 border-yellow-400/30 mb-4">Sponsorship Opportunity</Badge>
              <h2 className="text-3xl sm:text-5xl font-black mb-4">Connect With UAE Real Estate<br /><span className="text-yellow-400">Decision Makers</span></h2>
              <p className="text-slate-400 max-w-2xl mx-auto">Your brand in front of 36,000+ brokers, agencies and real estate professionals across the UAE.</p>
            </div>
            <div className="grid lg:grid-cols-3 gap-6 mb-12">
              {SPONSORSHIP_TIERS.map((tier) => (
                <div key={tier.tier} className={`border ${tier.border} ${tier.bg} rounded-2xl p-6 flex flex-col relative overflow-hidden`}>
                  {tier.tier === "TITLE SPONSOR" && (
                    <div className="absolute top-0 right-0 bg-yellow-500 text-black text-xs font-bold px-3 py-1 rounded-bl-xl">RECOMMENDED</div>
                  )}
                  <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${tier.color} flex items-center justify-center mb-4`}>
                    <tier.icon className="w-5 h-5 text-white" />
                  </div>
                  <h3 className="font-black text-lg tracking-wide mb-1">{tier.tier}</h3>
                  <div className={`text-3xl font-black bg-gradient-to-r ${tier.color} bg-clip-text text-transparent mb-4`}>{tier.price}</div>
                  <ul className="space-y-2 mb-6 flex-1">
                    {tier.benefits.map((b) => (
                      <li key={b} className="flex items-start gap-2 text-sm text-slate-300">
                        <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                        {b}
                      </li>
                    ))}
                  </ul>
                  <Button
                    className="w-full font-bold bg-white/10 hover:bg-white/20 text-white border border-white/20"
                    onClick={() => { setActiveTab("sponsor"); document.getElementById("register")?.scrollIntoView({ behavior: "smooth" }); }}
                  >
                    Enquire Now <ArrowRight className="w-4 h-4 ml-1" />
                  </Button>
                </div>
              ))}
            </div>

            {/* Comparison table */}
            <div className="overflow-x-auto rounded-2xl border border-white/10">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-white/5">
                    <th className="text-left p-4 text-slate-400 font-medium">Benefit</th>
                    <th className="text-center p-4 text-yellow-400 font-bold">Title</th>
                    <th className="text-center p-4 text-amber-300 font-bold">Gold</th>
                    <th className="text-center p-4 text-slate-300 font-bold">Silver</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {[
                    ["Naming Rights", true, false, false],
                    ["Jersey Branding", true, false, false],
                    ["Trophy Branding", true, false, false],
                    ["Team Sponsorship", true, true, false],
                    ["Ground Branding", true, true, false],
                    ["Media Interviews", true, true, false],
                    ["Activation Booth", true, true, true],
                    ["Lead Capture", true, true, true],
                    ["Social Media Features", true, true, true],
                    ["Email Campaigns", true, true, false],
                  ].map(([label, t, g, s]) => (
                    <tr key={label as string} className="hover:bg-white/3 transition-colors">
                      <td className="p-4 text-slate-300">{label as string}</td>
                      <td className="p-4 text-center">{t ? <CheckCircle2 className="w-4 h-4 text-yellow-400 mx-auto" /> : <span className="text-slate-600">—</span>}</td>
                      <td className="p-4 text-center">{g ? <CheckCircle2 className="w-4 h-4 text-amber-300 mx-auto" /> : <span className="text-slate-600">—</span>}</td>
                      <td className="p-4 text-center">{s ? <CheckCircle2 className="w-4 h-4 text-slate-400 mx-auto" /> : <span className="text-slate-600">—</span>}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* ─── MARKETING REACH ─── */}
        <section className="py-24 px-4 max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <Badge className="bg-blue-500/10 text-blue-400 border-blue-500/30 mb-4">Marketing Reach</Badge>
            <h2 className="text-3xl sm:text-5xl font-black mb-4">Your Brand Reaches<br /><span className="text-blue-400">36,000+ Real Estate Professionals</span></h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-12">
            {REACH_CHANNELS.map((ch) => (
              <div key={ch.label} className="flex items-center gap-4 bg-white/3 border border-white/8 rounded-2xl p-5 hover:border-blue-500/30 transition-all">
                <div className="w-12 h-12 bg-blue-500/10 border border-blue-500/20 rounded-xl flex items-center justify-center shrink-0">
                  <ch.icon className="w-6 h-6 text-blue-400" />
                </div>
                <div>
                  <div className="font-semibold text-sm">{ch.label}</div>
                  <div className="text-blue-400 text-xs font-bold">{ch.value}</div>
                </div>
              </div>
            ))}
          </div>
          {/* Funnel */}
          <div className="bg-gradient-to-b from-blue-900/20 to-transparent border border-blue-500/20 rounded-2xl p-8">
            <h3 className="font-bold text-center mb-6 text-slate-300">Audience Funnel</h3>
            <div className="flex flex-col items-center gap-1 max-w-sm mx-auto">
              {[
                { label: "Database Reach", w: "w-full", val: "36,000+" },
                { label: "Engaged Community", w: "w-4/5", val: "5,000+" },
                { label: "Direct Participants", w: "w-3/5", val: "250+" },
                { label: "Sponsor Touchpoints", w: "w-2/5", val: "100+" },
              ].map((f) => (
                <div key={f.label} className={`${f.w} bg-blue-500/20 border border-blue-500/20 rounded-lg py-2 px-4 text-center transition-all`}>
                  <span className="text-sm text-blue-300 font-medium">{f.label}</span>
                  <span className="text-blue-400 font-bold ml-2">{f.val}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ─── WHO SHOULD SPONSOR ─── */}
        <section className="py-20 bg-gradient-to-b from-[#0d1420] to-[#0a0f1a] px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <Badge className="bg-purple-500/10 text-purple-400 border-purple-500/30 mb-4">Who Should Sponsor</Badge>
              <h2 className="text-3xl sm:text-4xl font-black mb-2">Is Your Brand in the <span className="text-purple-400">Real Estate Ecosystem?</span></h2>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
              {WHO_SHOULD_SPONSOR.map((item) => (
                <div key={item.label} className="bg-white/3 border border-white/8 rounded-2xl p-5 text-center hover:border-purple-500/30 hover:bg-purple-500/5 transition-all cursor-default group">
                  <item.icon className="w-7 h-7 text-purple-400 mx-auto mb-3 group-hover:scale-110 transition-transform" />
                  <p className="text-sm font-medium text-slate-300">{item.label}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ─── EVENT FORMAT ─── */}
        <section className="py-24 px-4 max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <Badge className="bg-emerald-500/10 text-emerald-400 border-emerald-500/30 mb-4">Event Format</Badge>
            <h2 className="text-3xl sm:text-5xl font-black mb-2">The Tournament <span className="text-emerald-400">Journey</span></h2>
            <p className="text-slate-400">Majan Community Football Ground, Dubai — weekly evening matches</p>
          </div>
          <div className="relative">
            <div className="hidden lg:block absolute left-1/2 top-0 bottom-0 w-px bg-emerald-500/20" />
            <div className="space-y-8">
              {EVENT_WEEKS.map((w, i) => (
                <div key={i} className={`flex flex-col lg:flex-row gap-6 items-center ${i % 2 === 1 ? "lg:flex-row-reverse" : ""}`}>
                  <div className="flex-1">
                    <div className={`bg-white/3 border border-white/8 rounded-2xl p-6 hover:border-emerald-500/30 transition-all ${i % 2 === 1 ? "lg:text-right" : ""}`}>
                      <p className="text-emerald-400 text-sm font-bold uppercase tracking-widest mb-1">{w.week}</p>
                      <h3 className="text-xl font-black mb-2">{w.phase}</h3>
                      <p className="text-slate-400 text-sm">{w.desc}</p>
                    </div>
                  </div>
                  <div className="relative z-10 w-10 h-10 bg-emerald-500 rounded-full flex items-center justify-center shrink-0 font-black text-sm">
                    {i + 1}
                  </div>
                  <div className="flex-1 hidden lg:block" />
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ─── MEDIA ─── */}
        <section className="py-20 bg-gradient-to-b from-[#0d1420] to-[#0a0f1a] px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <Badge className="bg-pink-500/10 text-pink-400 border-pink-500/30 mb-4">Media &amp; Content</Badge>
              <h2 className="text-3xl sm:text-4xl font-black mb-2">Amplified Across <span className="text-pink-400">Every Platform</span></h2>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
              {MEDIA_TYPES.map((m) => (
                <div key={m.label} className="bg-white/3 border border-white/8 rounded-2xl p-6 text-center hover:border-pink-500/30 transition-all group">
                  <div className="w-12 h-12 bg-pink-500/10 rounded-xl flex items-center justify-center mx-auto mb-3 group-hover:bg-pink-500/20 transition-colors">
                    <m.icon className="w-6 h-6 text-pink-400" />
                  </div>
                  <p className="font-semibold text-sm">{m.label}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ─── GALLERY ─── */}
        <section className="py-24 px-4 max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <Badge className="bg-white/10 text-slate-300 border-white/20 mb-4">Gallery</Badge>
            <h2 className="text-3xl sm:text-4xl font-black mb-2">The <span className="text-emerald-400">Community</span> in Action</h2>
          </div>
          <div className="columns-2 sm:columns-3 lg:columns-4 gap-3 space-y-3">
            {GALLERY_IMAGES.map((img) => (
              <div
                key={img.src}
                className="break-inside-avoid cursor-pointer overflow-hidden rounded-xl group"
                onClick={() => setLightbox(img.src)}
              >
                <img
                  src={img.src}
                  alt={img.alt}
                  loading="lazy"
                  className="w-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
            ))}
          </div>
        </section>

        {/* Lightbox */}
        {lightbox && (
          <div className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4" onClick={() => setLightbox(null)}>
            <img src={lightbox} alt="Gallery" className="max-w-full max-h-full rounded-xl object-contain" />
            <button className="absolute top-4 right-4 text-white bg-white/10 rounded-full p-2 hover:bg-white/20" onClick={() => setLightbox(null)}>✕</button>
          </div>
        )}

        {/* ─── PARTNERS ─── */}
        <section className="py-20 bg-gradient-to-b from-[#0d1420] to-[#0a0f1a] px-4">
          <div className="max-w-4xl mx-auto text-center">
            <Badge className="bg-white/10 text-slate-300 border-white/20 mb-4">Partners</Badge>
            <h2 className="text-3xl sm:text-4xl font-black mb-10">Presented By</h2>
            <div className="grid sm:grid-cols-3 gap-6 items-center">
              <div className="bg-white/5 border border-white/10 rounded-2xl p-8 hover:border-emerald-500/30 transition-all">
                <div className="text-2xl font-black text-emerald-400 mb-1">DeliWer</div>
                <p className="text-slate-400 text-sm">Dubai's Premier Relocation & Concierge Ecosystem</p>
              </div>
              <div className="bg-white/5 border border-white/10 rounded-2xl p-8 hover:border-yellow-400/30 transition-all">
                <div className="text-2xl font-black text-yellow-400 mb-1">Mariamain</div>
                <p className="text-slate-400 text-sm">Community Cricket &amp; Lifestyle Initiative — UAE</p>
              </div>
              <div className="bg-white/3 border border-dashed border-white/10 rounded-2xl p-8 text-center">
                <div className="text-slate-500 text-sm mb-1">Your Brand Here</div>
                <div className="text-slate-600 text-xs">Become a Title Sponsor</div>
              </div>
            </div>
          </div>
        </section>

        {/* ─── DOWNLOAD CENTER ─── */}
        <section id="download" className="py-24 px-4 max-w-4xl mx-auto text-center">
          <div className="mb-12">
            <Badge className="bg-emerald-500/10 text-emerald-400 border-emerald-500/30 mb-4">Download Center</Badge>
            <h2 className="text-3xl sm:text-4xl font-black mb-4">Sponsor Resources</h2>
            <p className="text-slate-400">Professional materials for potential sponsors, partners and media.</p>
          </div>
          <div className="grid sm:grid-cols-3 gap-4">
            {[
              { label: "Sponsorship Proposal", desc: "Full investment details & benefits", icon: Download, href: "/api/league/download/proposal" },
              { label: "Team Registration Pack", desc: "Rules, format & registration guide", icon: Download, href: "/api/league/download/team-pack" },
              { label: "Partnership Brochure", desc: "Overview for agency partners", icon: Download, href: "/api/league/download/brochure" },
            ].map((doc) => (
              <a
                key={doc.label}
                href={doc.href}
                className="flex flex-col items-center gap-3 bg-white/3 border border-white/8 rounded-2xl p-6 hover:border-emerald-500/30 hover:bg-emerald-500/5 transition-all group"
                onClick={(e) => { e.preventDefault(); toast({ title: `${doc.label} requested`, description: "Contact partners@deliwer.com to receive the full document." }); }}
              >
                <div className="w-12 h-12 bg-emerald-500/10 rounded-xl flex items-center justify-center group-hover:bg-emerald-500/20 transition-colors">
                  <doc.icon className="w-6 h-6 text-emerald-400" />
                </div>
                <div className="text-sm font-bold">{doc.label}</div>
                <div className="text-xs text-slate-500">{doc.desc}</div>
              </a>
            ))}
          </div>
          <p className="text-slate-500 text-sm mt-6">
            For immediate access, email <a href="mailto:partners@deliwer.com" className="text-emerald-400 hover:underline">partners@deliwer.com</a>
          </p>
        </section>

        {/* ─── REGISTRATION FORMS ─── */}
        <section id="register" className="py-24 bg-gradient-to-b from-[#0d1420] to-[#0a0f1a] px-4">
          <div className="max-w-2xl mx-auto">
            <div className="text-center mb-10">
              <Badge className="bg-emerald-500/10 text-emerald-400 border-emerald-500/30 mb-4">Registration</Badge>
              <h2 className="text-3xl sm:text-4xl font-black mb-2">Get <span className="text-emerald-400">Involved</span></h2>
              <p className="text-slate-400">Fill in your details and our team will be in touch within 24 hours.</p>
            </div>

            {/* Tab switcher */}
            <div className="flex rounded-xl border border-white/10 overflow-hidden mb-8">
              {(["team", "sponsor", "volunteer"] as const).map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`flex-1 py-3 text-sm font-bold capitalize transition-all ${activeTab === tab ? "bg-emerald-500 text-white" : "text-slate-400 hover:text-white hover:bg-white/5"}`}
                >
                  {tab === "team" ? "Register Team" : tab === "sponsor" ? "Become Sponsor" : "Volunteer"}
                </button>
              ))}
            </div>

            <form onSubmit={handleSubmit} className="bg-white/3 border border-white/8 rounded-2xl p-6 sm:p-8 space-y-4">
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <Label className="text-slate-300 mb-1.5 block text-sm">Full Name *</Label>
                  <Input required value={formData.name} onChange={(e) => setFormData(p => ({ ...p, name: e.target.value }))} placeholder="Your name" className="bg-white/5 border-white/10 text-white placeholder:text-slate-600" />
                </div>
                <div>
                  <Label className="text-slate-300 mb-1.5 block text-sm">Company / Agency *</Label>
                  <Input required value={formData.company} onChange={(e) => setFormData(p => ({ ...p, company: e.target.value }))} placeholder="Company name" className="bg-white/5 border-white/10 text-white placeholder:text-slate-600" />
                </div>
              </div>
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <Label className="text-slate-300 mb-1.5 block text-sm">Email *</Label>
                  <Input required type="email" value={formData.email} onChange={(e) => setFormData(p => ({ ...p, email: e.target.value }))} placeholder="you@company.com" className="bg-white/5 border-white/10 text-white placeholder:text-slate-600" />
                </div>
                <div>
                  <Label className="text-slate-300 mb-1.5 block text-sm">Mobile (UAE)</Label>
                  <Input value={formData.mobile} onChange={(e) => setFormData(p => ({ ...p, mobile: e.target.value }))} placeholder="+971 5x xxx xxxx" className="bg-white/5 border-white/10 text-white placeholder:text-slate-600" />
                </div>
              </div>
              <div>
                <Label className="text-slate-300 mb-1.5 block text-sm">Your Role</Label>
                <Select value={formData.role} onValueChange={(v) => setFormData(p => ({ ...p, role: v }))}>
                  <SelectTrigger className="bg-white/5 border-white/10 text-white">
                    <SelectValue placeholder="Select your role" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="broker">Real Estate Broker</SelectItem>
                    <SelectItem value="agency">Agency Manager / Owner</SelectItem>
                    <SelectItem value="developer">Developer</SelectItem>
                    <SelectItem value="sponsor">Brand / Sponsor</SelectItem>
                    <SelectItem value="media">Media Partner</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label className="text-slate-300 mb-1.5 block text-sm">Message</Label>
                <Textarea value={formData.message} onChange={(e) => setFormData(p => ({ ...p, message: e.target.value }))} placeholder="Tell us more — team name, sponsorship tier, or how you'd like to get involved..." rows={4} className="bg-white/5 border-white/10 text-white placeholder:text-slate-600 resize-none" />
              </div>
              <Button type="submit" disabled={submitting} className="w-full bg-emerald-500 hover:bg-emerald-400 text-white font-bold py-4 rounded-xl text-base">
                {submitting ? "Sending..." : activeTab === "team" ? "Register My Team" : activeTab === "sponsor" ? "Send Sponsor Enquiry" : "Register as Volunteer"}
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
              <p className="text-xs text-slate-500 text-center">
                Submissions sent to <span className="text-slate-400">partners@deliwer.com</span> &amp; <span className="text-slate-400">marketing@deliwer.com</span>
              </p>
            </form>
          </div>
        </section>

        {/* ─── CONTACT ─── */}
        <section className="py-20 px-4 max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <Badge className="bg-white/10 text-slate-300 border-white/20 mb-4">Contact</Badge>
            <h2 className="text-3xl font-black mb-2">Let's <span className="text-emerald-400">Talk</span></h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { icon: Phone, label: "Call / WhatsApp", value: "+971 52 394 6311", href: "tel:+971523946311" },
              { icon: Mail, label: "Partners Email", value: "partners@deliwer.com", href: "mailto:partners@deliwer.com" },
              { icon: Mail, label: "Marketing Email", value: "marketing@deliwer.com", href: "mailto:marketing@deliwer.com" },
              { icon: MapPin, label: "Venue", value: "Majan Community Ground, Dubai", href: "#" },
            ].map((c) => (
              <a key={c.label} href={c.href} className="bg-white/3 border border-white/8 rounded-2xl p-5 hover:border-emerald-500/30 transition-all group">
                <c.icon className="w-6 h-6 text-emerald-400 mb-3" />
                <p className="text-xs text-slate-500 mb-1">{c.label}</p>
                <p className="text-sm font-medium text-slate-200 group-hover:text-white transition-colors">{c.value}</p>
              </a>
            ))}
          </div>
          <div className="flex flex-col sm:flex-row gap-3 justify-center mt-8">
            <Button className="bg-[#25D366] hover:bg-[#1ebe57] text-white font-bold" onClick={openWA}>
              <MessageCircle className="w-4 h-4 mr-2" /> Chat on WhatsApp
            </Button>
            <Button variant="outline" className="border-blue-400/40 text-blue-400 hover:bg-blue-400/10" asChild>
              <a href="https://t.me/+971523946311" target="_blank" rel="noopener noreferrer">
                <Send className="w-4 h-4 mr-2" /> Telegram
              </a>
            </Button>
          </div>
        </section>

        {/* ─── FOOTER STRIP ─── */}
        <div className="border-t border-white/8 py-8 px-4 text-center">
          <p className="text-slate-500 text-sm max-w-2xl mx-auto">
            "Brokers Night Cricket League UAE 2026 is a community initiative promoting wellness, networking, sustainability and professional growth across the UAE real estate ecosystem."
          </p>
          <p className="text-slate-600 text-xs mt-3">
            © 2026 DeliWer &amp; Mariamain · <a href="https://deliwer.com" className="hover:text-emerald-400 transition-colors">deliwer.com</a> · <a href="mailto:info@deliwer.com" className="hover:text-emerald-400 transition-colors">info@deliwer.com</a>
          </p>
        </div>

      </div>
    </>
  );
}
