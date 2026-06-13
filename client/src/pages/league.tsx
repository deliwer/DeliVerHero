import { useState, useEffect, useRef, useCallback } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
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
  Instagram, Linkedin, Send, ChevronRight, Sun, Droplets,
  Lock, Plus, Trash2, Edit3, X
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

// Animated number counter hook
function useCountUp(target: number, duration = 1200) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (target === 0) return;
    const start = performance.now();
    const tick = (now: number) => {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      // ease-out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.round(eased * target));
      if (progress < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }, [target, duration]);
  return count;
}

// Pulsing dot for "live" feel
function LiveDot() {
  return (
    <span className="relative inline-flex h-2 w-2 mr-1.5">
      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
      <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
    </span>
  );
}

export default function LeaguePage() {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState<"team" | "sponsor" | "volunteer">("team");
  const [lightbox, setLightbox] = useState<string | null>(null);
  const [formData, setFormData] = useState({ name: "", company: "", email: "", mobile: "", role: "", message: "" });
  const [submitting, setSubmitting] = useState(false);
  const heroRef = useRef<HTMLDivElement>(null);

  // Live team counter
  const { data: leagueStats } = useQuery<{ teams: number; spots: number; available: number }>({
    queryKey: ["/api/league/stats"],
    refetchInterval: 30_000,
  });
  const animatedTeams = useCountUp(leagueStats?.teams ?? 0);
  const animatedAvailable = useCountUp(leagueStats?.available ?? 0);

  // Teams & matches data
  const qc = useQueryClient();
  const { data: teams = [] } = useQuery<any[]>({ queryKey: ["/api/league/teams"] });
  const { data: matches = [] } = useQuery<any[]>({ queryKey: ["/api/league/matches"] });

  // Admin panel state
  const [adminOpen, setAdminOpen] = useState(false);
  const [adminToken, setAdminToken] = useState("");
  const [adminAuthed, setAdminAuthed] = useState(false);
  const [adminTokenInput, setAdminTokenInput] = useState("");
  const [adminTab, setAdminTab] = useState<"teams" | "matches" | "broadcast">("teams");
  const [broadcastWeek, setBroadcastWeek] = useState("");
  const [broadcastCopied, setBroadcastCopied] = useState(false);

  const buildBroadcastMessage = () => {
    const weekMatches = broadcastWeek
      ? matches.filter((m: any) => m.week_label === broadcastWeek)
      : matches.filter((m: any) => m.status === "upcoming").slice(0, 4);
    const header = [
      `🏏 *Brokers Night Cricket League UAE 2026*`,
      broadcastWeek ? `📅 *${broadcastWeek} — Match Reminder*` : `📅 *Upcoming Matches*`,
      ``,
    ].join("\n");
    if (weekMatches.length === 0) return header + `No matches found for this week.\n\nRegister: https://deliwer.com/league`;
    const rows = weekMatches.map((m: any) =>
      `🟢 *${m.home_team}* vs *${m.away_team}*\n📆 ${m.match_date}${m.venue ? `\n📍 ${m.venue}` : ""}`
    ).join("\n\n");
    const footer = [
      ``,
      `🔗 Full schedule & registration: https://deliwer.com/league`,
      ``,
      `_Presented by Mariamain & DeliWer · +971 52 394 6311_`,
    ].join("\n");
    return header + rows + footer;
  };

  // New team form
  const [newTeam, setNewTeam] = useState({ team_name: "", agency: "", captain: "", group_name: "A", logo_emoji: "🏏" });
  // New match form
  const [newMatch, setNewMatch] = useState({ home_team: "", away_team: "", home_agency: "", away_agency: "", match_date: "", venue: "Majan Community Ground", group_name: "A", week_label: "", result: "", status: "upcoming" });
  // Edit match result
  const [editingMatch, setEditingMatch] = useState<any | null>(null);

  const adminFetch = (method: string, url: string, body?: any) =>
    fetch(url, {
      method,
      headers: { "Content-Type": "application/json", "x-admin-token": adminToken },
      body: body ? JSON.stringify(body) : undefined,
      credentials: "include",
    }).then(async r => { if (!r.ok) throw new Error(await r.text()); return r.json(); });

  const addTeamMut = useMutation({
    mutationFn: (body: any) => adminFetch("POST", "/api/league/teams", body),
    onSuccess: () => { qc.invalidateQueries({ queryKey: ["/api/league/teams"] }); qc.invalidateQueries({ queryKey: ["/api/league/stats"] }); setNewTeam({ team_name: "", agency: "", captain: "", group_name: "A", logo_emoji: "🏏" }); toast({ title: "Team added!" }); },
    onError: () => toast({ title: "Failed to add team", variant: "destructive" }),
  });

  const deleteTeamMut = useMutation({
    mutationFn: (id: number) => adminFetch("DELETE", `/api/league/teams/${id}`),
    onSuccess: () => { qc.invalidateQueries({ queryKey: ["/api/league/teams"] }); qc.invalidateQueries({ queryKey: ["/api/league/stats"] }); toast({ title: "Team removed" }); },
  });

  const addMatchMut = useMutation({
    mutationFn: (body: any) => adminFetch("POST", "/api/league/matches", body),
    onSuccess: () => { qc.invalidateQueries({ queryKey: ["/api/league/matches"] }); setNewMatch({ home_team: "", away_team: "", home_agency: "", away_agency: "", match_date: "", venue: "Majan Community Ground", group_name: "A", week_label: "", result: "", status: "upcoming" }); toast({ title: "Match added!" }); },
    onError: () => toast({ title: "Failed to add match", variant: "destructive" }),
  });

  const updateMatchMut = useMutation({
    mutationFn: ({ id, ...body }: any) => adminFetch("PATCH", `/api/league/matches/${id}`, body),
    onSuccess: () => { qc.invalidateQueries({ queryKey: ["/api/league/matches"] }); setEditingMatch(null); toast({ title: "Result updated!" }); },
  });

  const deleteMatchMut = useMutation({
    mutationFn: (id: number) => adminFetch("DELETE", `/api/league/matches/${id}`),
    onSuccess: () => { qc.invalidateQueries({ queryKey: ["/api/league/matches"] }); toast({ title: "Match removed" }); },
  });

  // Open admin panel — check URL
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (params.get("admin") === "1") setAdminOpen(true);
  }, []);

  const handleAdminAuth = () => {
    setAdminToken(adminTokenInput);
    setAdminAuthed(true);
  };

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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    const typeLabel = activeTab === "team" ? "Team Registration" : activeTab === "sponsor" ? "Sponsor Enquiry" : "Volunteer Registration";
    const roleLabel = formData.role || "Not specified";
    const lines = [
      `*Brokers Night Cricket League UAE 2026*`,
      `📋 *${typeLabel}*`,
      ``,
      `👤 Name: ${formData.name}`,
      `🏢 Company: ${formData.company}`,
      `📧 Email: ${formData.email}`,
      formData.mobile ? `📱 Mobile: ${formData.mobile}` : null,
      `🎯 Role: ${roleLabel}`,
      formData.message ? `💬 Message: ${formData.message}` : null,
    ].filter(Boolean).join("\n");
    window.open(`https://wa.me/971523946311?text=${encodeURIComponent(lines)}`, "_blank");
    setSubmitting(false);
    toast({ title: "Opening WhatsApp…", description: "Your details are pre-filled. Just hit send!" });
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

            {/* Live team counter */}
            <div className="max-w-4xl mx-auto mb-4">
              <div className="relative bg-emerald-950/60 border border-emerald-500/40 rounded-2xl p-5 backdrop-blur-sm overflow-hidden">
                {/* urgency progress bar */}
                {leagueStats && (
                  <div
                    className="absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-emerald-500 to-emerald-300 transition-all duration-1000"
                    style={{ width: `${(leagueStats.teams / leagueStats.spots) * 100}%` }}
                  />
                )}
                <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-emerald-500/20 rounded-xl flex items-center justify-center shrink-0">
                      <Trophy className="w-6 h-6 text-emerald-400" />
                    </div>
                    <div className="text-left">
                      <div className="flex items-center gap-1.5 text-emerald-300 text-xs font-bold uppercase tracking-widest mb-0.5">
                        <LiveDot /> Live Registration
                      </div>
                      <div className="flex items-baseline gap-2">
                        <span className="text-4xl font-black text-white tabular-nums">{animatedTeams}</span>
                        <span className="text-slate-400 text-sm">/ {leagueStats?.spots ?? 16} teams</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-col items-center sm:items-end gap-1">
                    <div className="text-3xl font-black text-yellow-400 tabular-nums">{animatedAvailable}</div>
                    <div className="text-xs text-slate-400 uppercase tracking-widest">spots remaining</div>
                    <Button
                      size="sm"
                      className="mt-1 bg-emerald-500 hover:bg-emerald-400 text-white font-bold rounded-xl text-xs px-4"
                      onClick={() => document.getElementById("register")?.scrollIntoView({ behavior: "smooth" })}
                    >
                      Register Now →
                    </Button>
                  </div>
                </div>
              </div>
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

        {/* ─── VENUE ─── */}
        <section id="venue" className="py-24 bg-gradient-to-b from-[#0d1420] to-[#0a0f1a] px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <Badge className="bg-emerald-500/10 text-emerald-400 border-emerald-500/30 mb-4">Venue</Badge>
              <h2 className="text-3xl sm:text-5xl font-black mb-3">Where the <span className="text-emerald-400">Action Happens</span></h2>
              <p className="text-slate-400 max-w-xl mx-auto">Night cricket under the lights — Majan Community Ground, Dubai. Parking on site. Easy access from Emirates Road.</p>
            </div>

            {/* Map + photos grid */}
            <div className="grid lg:grid-cols-2 gap-6 mb-8">
              {/* Google Maps embed */}
              <div className="rounded-2xl overflow-hidden border border-white/10 aspect-[4/3] lg:aspect-auto lg:min-h-[380px] relative">
                <iframe
                  title="Majan Community Ground"
                  src="https://maps.google.com/maps?q=Majan+Community+Football+Ground,+Dubai,+UAE&output=embed&hl=en&z=16"
                  width="100%"
                  height="100%"
                  style={{ border: 0, minHeight: "380px" }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="w-full h-full"
                />
              </div>

              {/* Photo grid */}
              <div className="grid grid-cols-2 gap-3">
                <div className="col-span-2 rounded-2xl overflow-hidden aspect-video">
                  <img
                    src="https://images.unsplash.com/photo-1624526267942-ab0ff8a3e972?w=900&auto=format&q=80"
                    alt="Cricket match night lights"
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="rounded-xl overflow-hidden aspect-square">
                  <img
                    src="https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?w=600&auto=format&q=80"
                    alt="Cricket ground"
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="rounded-xl overflow-hidden aspect-square">
                  <img
                    src="https://images.unsplash.com/photo-1531415074968-036ba1b575da?w=600&auto=format&q=80"
                    alt="Cricket action"
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                  />
                </div>
              </div>
            </div>

            {/* Venue info cards */}
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
              {[
                { icon: MapPin, label: "Address", value: "Majan Community Ground\nDubai, UAE", color: "text-emerald-400" },
                { icon: Calendar, label: "Match Days", value: "Weekly evenings\nJul – Sep 2026", color: "text-yellow-400" },
                { icon: Users, label: "Capacity", value: "250+ spectators\nBrokers & families welcome", color: "text-blue-400" },
                { icon: Shield, label: "Facilities", value: "Floodlit pitch\nParking · Refreshments", color: "text-purple-400" },
              ].map((item) => (
                <div key={item.label} className="bg-white/3 border border-white/8 rounded-2xl p-5 hover:border-emerald-500/20 transition-all">
                  <item.icon className={`w-6 h-6 ${item.color} mb-3`} />
                  <p className="text-xs text-slate-500 uppercase tracking-widest mb-1">{item.label}</p>
                  <p className="text-sm font-medium text-slate-200 whitespace-pre-line leading-snug">{item.value}</p>
                </div>
              ))}
            </div>

            {/* Directions CTA */}
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <a
                href="https://maps.app.goo.gl/4T2c2Wi7mCbj7Kqi8"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 bg-emerald-500 hover:bg-emerald-400 text-white font-bold px-8 py-3.5 rounded-xl transition-all text-sm"
              >
                <MapPin className="w-4 h-4" /> Get Directions on Google Maps
              </a>
              <button
                onClick={() => document.getElementById("register")?.scrollIntoView({ behavior: "smooth" })}
                className="inline-flex items-center justify-center gap-2 bg-white/5 hover:bg-white/10 border border-white/10 text-slate-200 font-bold px-8 py-3.5 rounded-xl transition-all text-sm"
              >
                <Trophy className="w-4 h-4 text-emerald-400" /> Register Your Team
              </button>
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

        {/* ─── LEADERBOARD ─── */}
        <section id="leaderboard" className="py-24 bg-gradient-to-b from-[#0d1420] to-[#0a0f1a] px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <Badge className="bg-emerald-500/10 text-emerald-400 border-emerald-500/30 mb-4">Leaderboard</Badge>
              <h2 className="text-3xl sm:text-5xl font-black mb-2">Teams &amp; <span className="text-emerald-400">Draw</span></h2>
              <p className="text-slate-400">Registered agencies competing for the trophy. Groups revealed as teams confirm.</p>
              {/* Admin link — subtle */}
              <button
                className="mt-4 text-xs text-slate-700 hover:text-slate-500 transition-colors"
                onClick={() => setAdminOpen(true)}
              >
                ⚙ Manage
              </button>
            </div>

            {teams.length === 0 ? (
              <div className="text-center py-20 border border-dashed border-white/10 rounded-2xl">
                <Trophy className="w-12 h-12 text-slate-700 mx-auto mb-4" />
                <p className="text-slate-500 font-semibold text-lg">Teams confirming soon</p>
                <p className="text-slate-600 text-sm mt-2">Registration is open — be among the first agencies to lock in your spot.</p>
                <Button className="mt-6 bg-emerald-500 hover:bg-emerald-400 text-white font-bold" onClick={() => document.getElementById("register")?.scrollIntoView({ behavior: "smooth" })}>
                  Register Your Team
                </Button>
              </div>
            ) : (
              <div className="grid lg:grid-cols-2 gap-8 mb-12">
                {(["A", "B"] as const).map(grp => {
                  const grpTeams = teams.filter((t: any) => t.group_name === grp);
                  if (grpTeams.length === 0) return null;
                  return (
                    <div key={grp}>
                      <div className="flex items-center gap-3 mb-4">
                        <div className="w-8 h-8 bg-emerald-500 rounded-lg flex items-center justify-center font-black text-sm">{grp}</div>
                        <h3 className="font-black text-xl">Group {grp}</h3>
                        <span className="text-slate-500 text-sm">{grpTeams.length} teams</span>
                      </div>
                      <div className="space-y-3">
                        {grpTeams.map((team: any, idx: number) => (
                          <div key={team.id} className="flex items-center gap-4 bg-white/3 border border-white/8 rounded-2xl p-4 hover:border-emerald-500/20 transition-all">
                            <div className="w-8 text-center font-black text-slate-600 text-sm">{idx + 1}</div>
                            <div className="text-2xl">{team.logo_emoji}</div>
                            <div className="flex-1 min-w-0">
                              <div className="font-bold text-white text-sm truncate">{team.team_name}</div>
                              <div className="text-xs text-slate-400 truncate">{team.agency}</div>
                              {team.captain && <div className="text-xs text-slate-600 truncate">Capt: {team.captain}</div>}
                            </div>
                            <div className="flex gap-3 text-xs shrink-0">
                              <div className="text-center">
                                <div className="font-black text-emerald-400 text-lg">{team.wins}</div>
                                <div className="text-slate-600">W</div>
                              </div>
                              <div className="text-center">
                                <div className="font-black text-rose-400 text-lg">{team.losses}</div>
                                <div className="text-slate-600">L</div>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  );
                })}
              </div>
            )}

            {/* Match schedule */}
            {matches.length > 0 && (
              <div>
                <h3 className="font-black text-xl mb-6 text-center">Match Schedule</h3>
                <div className="overflow-x-auto rounded-2xl border border-white/10">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="bg-white/5">
                        <th className="text-left p-3 text-slate-400 font-medium">Week</th>
                        <th className="text-left p-3 text-slate-400 font-medium">Match</th>
                        <th className="text-left p-3 text-slate-400 font-medium hidden sm:table-cell">Date</th>
                        <th className="text-left p-3 text-slate-400 font-medium hidden md:table-cell">Grp</th>
                        <th className="text-left p-3 text-slate-400 font-medium">Result</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-white/5">
                      {matches.map((m: any) => (
                        <tr key={m.id} className="hover:bg-white/3 transition-colors">
                          <td className="p-3 text-slate-500 text-xs">{m.week_label || "—"}</td>
                          <td className="p-3">
                            <span className="font-semibold text-white">{m.home_team}</span>
                            <span className="text-slate-500 mx-2">vs</span>
                            <span className="font-semibold text-white">{m.away_team}</span>
                          </td>
                          <td className="p-3 text-slate-400 hidden sm:table-cell">{m.match_date}</td>
                          <td className="p-3 hidden md:table-cell">
                            <span className="bg-emerald-500/20 text-emerald-400 text-xs px-2 py-0.5 rounded-full">{m.group_name}</span>
                          </td>
                          <td className="p-3">
                            {m.status === "completed" ? (
                              <span className="text-emerald-400 font-bold text-xs">{m.result || "Completed"}</span>
                            ) : (
                              <span className="bg-yellow-500/10 text-yellow-400 text-xs px-2 py-0.5 rounded-full">Upcoming</span>
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </div>
        </section>

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
              <Button type="submit" disabled={submitting} className="w-full bg-[#25D366] hover:bg-[#1ebe57] text-white font-bold py-4 rounded-xl text-base">
                <MessageCircle className="w-5 h-5 mr-2" />
                {submitting ? "Opening WhatsApp…" : activeTab === "team" ? "Send via WhatsApp — Register Team" : activeTab === "sponsor" ? "Send via WhatsApp — Sponsor Enquiry" : "Send via WhatsApp — Volunteer"}
              </Button>
              <p className="text-xs text-slate-500 text-center">
                Your details open pre-filled in WhatsApp — just hit send to <span className="text-slate-400">+971 52 394 6311</span>
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
              { icon: MapPin, label: "Venue", value: "Majan Community Ground, Dubai", href: "https://maps.app.goo.gl/4T2c2Wi7mCbj7Kqi8" },
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

        {/* ─── ADMIN MODAL ─── */}
        {adminOpen && (
          <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4" onClick={(e) => { if (e.target === e.currentTarget) setAdminOpen(false); }}>
            <div className="bg-[#0d1420] border border-white/10 rounded-2xl w-full max-w-3xl max-h-[90vh] overflow-y-auto">
              <div className="flex items-center justify-between p-6 border-b border-white/8">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-emerald-500/20 rounded-lg flex items-center justify-center"><Trophy className="w-4 h-4 text-emerald-400" /></div>
                  <h3 className="font-black text-lg">League Admin</h3>
                </div>
                <button onClick={() => setAdminOpen(false)} className="text-slate-500 hover:text-white transition-colors"><X className="w-5 h-5" /></button>
              </div>

              {!adminAuthed ? (
                <div className="p-8 max-w-sm mx-auto">
                  <Lock className="w-10 h-10 text-slate-600 mx-auto mb-4" />
                  <p className="text-slate-400 text-center mb-6 text-sm">Enter the admin token to manage teams and matches.</p>
                  <div className="space-y-3">
                    <Input
                      type="password"
                      placeholder="Admin token"
                      value={adminTokenInput}
                      onChange={e => setAdminTokenInput(e.target.value)}
                      onKeyDown={e => e.key === "Enter" && handleAdminAuth()}
                      className="bg-white/5 border-white/10 text-white placeholder:text-slate-600"
                    />
                    <Button className="w-full bg-emerald-500 hover:bg-emerald-400 text-white font-bold" onClick={handleAdminAuth}>
                      Unlock
                    </Button>
                  </div>
                </div>
              ) : (
                <div className="p-6">
                  {/* Tabs */}
                  <div className="flex rounded-xl border border-white/10 overflow-hidden mb-6">
                    {(["teams", "matches", "broadcast"] as const).map(t => (
                      <button key={t} onClick={() => setAdminTab(t)}
                        className={`flex-1 py-2.5 text-sm font-bold capitalize transition-all ${adminTab === t ? "bg-emerald-500 text-white" : "text-slate-400 hover:text-white hover:bg-white/5"}`}>
                        {t === "teams" ? `Teams (${teams.length})` : t === "matches" ? `Matches (${matches.length})` : "📣 Broadcast"}
                      </button>
                    ))}
                  </div>

                  {adminTab === "teams" && (
                    <div className="space-y-6">
                      {/* Add team form */}
                      <div className="bg-white/3 border border-white/8 rounded-2xl p-5">
                        <h4 className="font-bold mb-4 text-sm uppercase tracking-widest text-emerald-400">Add Team</h4>
                        <div className="grid sm:grid-cols-2 gap-3 mb-3">
                          <Input placeholder="Team name *" value={newTeam.team_name} onChange={e => setNewTeam(p => ({ ...p, team_name: e.target.value }))} className="bg-white/5 border-white/10 text-white placeholder:text-slate-600" />
                          <Input placeholder="Agency / Company *" value={newTeam.agency} onChange={e => setNewTeam(p => ({ ...p, agency: e.target.value }))} className="bg-white/5 border-white/10 text-white placeholder:text-slate-600" />
                          <Input placeholder="Captain name" value={newTeam.captain} onChange={e => setNewTeam(p => ({ ...p, captain: e.target.value }))} className="bg-white/5 border-white/10 text-white placeholder:text-slate-600" />
                          <Input placeholder="Emoji (🏏 🦅 🔥)" value={newTeam.logo_emoji} onChange={e => setNewTeam(p => ({ ...p, logo_emoji: e.target.value }))} className="bg-white/5 border-white/10 text-white placeholder:text-slate-600" />
                        </div>
                        <div className="flex gap-3 items-center">
                          <Select value={newTeam.group_name} onValueChange={v => setNewTeam(p => ({ ...p, group_name: v }))}>
                            <SelectTrigger className="w-32 bg-white/5 border-white/10 text-white"><SelectValue /></SelectTrigger>
                            <SelectContent><SelectItem value="A">Group A</SelectItem><SelectItem value="B">Group B</SelectItem></SelectContent>
                          </Select>
                          <Button className="bg-emerald-500 hover:bg-emerald-400 text-white font-bold" disabled={addTeamMut.isPending} onClick={() => addTeamMut.mutate(newTeam)}>
                            <Plus className="w-4 h-4 mr-1" /> Add Team
                          </Button>
                        </div>
                      </div>
                      {/* Team list */}
                      <div className="space-y-2">
                        {teams.map((team: any) => (
                          <div key={team.id} className="flex items-center gap-3 bg-white/3 border border-white/8 rounded-xl p-3">
                            <span className="text-xl">{team.logo_emoji}</span>
                            <div className="flex-1 min-w-0">
                              <div className="font-semibold text-sm">{team.team_name}</div>
                              <div className="text-xs text-slate-500">{team.agency} · Grp {team.group_name} · {team.wins}W {team.losses}L</div>
                            </div>
                            <button onClick={() => deleteTeamMut.mutate(team.id)} className="text-rose-500 hover:text-rose-400 p-1.5 rounded-lg hover:bg-rose-500/10 transition-all">
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        ))}
                        {teams.length === 0 && <p className="text-slate-600 text-sm text-center py-4">No teams yet.</p>}
                      </div>
                    </div>
                  )}

                  {adminTab === "matches" && (
                    <div className="space-y-6">
                      {/* Add match form */}
                      <div className="bg-white/3 border border-white/8 rounded-2xl p-5">
                        <h4 className="font-bold mb-4 text-sm uppercase tracking-widest text-emerald-400">Add Match</h4>
                        <div className="grid sm:grid-cols-2 gap-3 mb-3">
                          <Input placeholder="Home team *" value={newMatch.home_team} onChange={e => setNewMatch(p => ({ ...p, home_team: e.target.value }))} className="bg-white/5 border-white/10 text-white placeholder:text-slate-600" />
                          <Input placeholder="Away team *" value={newMatch.away_team} onChange={e => setNewMatch(p => ({ ...p, away_team: e.target.value }))} className="bg-white/5 border-white/10 text-white placeholder:text-slate-600" />
                          <Input placeholder="Home agency" value={newMatch.home_agency} onChange={e => setNewMatch(p => ({ ...p, home_agency: e.target.value }))} className="bg-white/5 border-white/10 text-white placeholder:text-slate-600" />
                          <Input placeholder="Away agency" value={newMatch.away_agency} onChange={e => setNewMatch(p => ({ ...p, away_agency: e.target.value }))} className="bg-white/5 border-white/10 text-white placeholder:text-slate-600" />
                          <Input placeholder="Date (e.g. Fri 17 Jul 2026)" value={newMatch.match_date} onChange={e => setNewMatch(p => ({ ...p, match_date: e.target.value }))} className="bg-white/5 border-white/10 text-white placeholder:text-slate-600" />
                          <Input placeholder="Week (e.g. Week 1)" value={newMatch.week_label} onChange={e => setNewMatch(p => ({ ...p, week_label: e.target.value }))} className="bg-white/5 border-white/10 text-white placeholder:text-slate-600" />
                          <Input placeholder="Venue" value={newMatch.venue} onChange={e => setNewMatch(p => ({ ...p, venue: e.target.value }))} className="bg-white/5 border-white/10 text-white placeholder:text-slate-600" />
                        </div>
                        <div className="flex gap-3 items-center flex-wrap">
                          <Select value={newMatch.group_name} onValueChange={v => setNewMatch(p => ({ ...p, group_name: v }))}>
                            <SelectTrigger className="w-32 bg-white/5 border-white/10 text-white"><SelectValue /></SelectTrigger>
                            <SelectContent><SelectItem value="A">Group A</SelectItem><SelectItem value="B">Group B</SelectItem></SelectContent>
                          </Select>
                          <Button className="bg-emerald-500 hover:bg-emerald-400 text-white font-bold" disabled={addMatchMut.isPending} onClick={() => addMatchMut.mutate(newMatch)}>
                            <Plus className="w-4 h-4 mr-1" /> Add Match
                          </Button>
                        </div>
                      </div>
                      {/* Match list */}
                      <div className="space-y-2">
                        {matches.map((m: any) => (
                          <div key={m.id} className="bg-white/3 border border-white/8 rounded-xl p-3">
                            {editingMatch?.id === m.id ? (
                              <div className="flex gap-2 items-center flex-wrap">
                                <Input placeholder="Result (e.g. Eagles won by 5 wkts)" value={editingMatch.result} onChange={e => setEditingMatch((p: any) => ({ ...p, result: e.target.value }))} className="flex-1 bg-white/5 border-white/10 text-white placeholder:text-slate-600 text-sm" />
                                <Select value={editingMatch.status} onValueChange={v => setEditingMatch((p: any) => ({ ...p, status: v }))}>
                                  <SelectTrigger className="w-32 bg-white/5 border-white/10 text-white text-sm"><SelectValue /></SelectTrigger>
                                  <SelectContent><SelectItem value="upcoming">Upcoming</SelectItem><SelectItem value="completed">Completed</SelectItem></SelectContent>
                                </Select>
                                <Button size="sm" className="bg-emerald-500 text-white" onClick={() => updateMatchMut.mutate(editingMatch)}>Save</Button>
                                <Button size="sm" variant="ghost" className="text-slate-400" onClick={() => setEditingMatch(null)}>Cancel</Button>
                              </div>
                            ) : (
                              <div className="flex items-center gap-3">
                                <div className="flex-1 min-w-0">
                                  <div className="text-sm font-semibold">{m.home_team} <span className="text-slate-500">vs</span> {m.away_team}</div>
                                  <div className="text-xs text-slate-500">{m.week_label && `${m.week_label} · `}{m.match_date} · Grp {m.group_name}</div>
                                  {m.result && <div className="text-xs text-emerald-400 mt-0.5">{m.result}</div>}
                                </div>
                                <span className={`text-xs px-2 py-0.5 rounded-full ${m.status === "completed" ? "bg-emerald-500/20 text-emerald-400" : "bg-yellow-500/10 text-yellow-400"}`}>{m.status}</span>
                                <button onClick={() => setEditingMatch({ ...m })} className="text-blue-400 hover:text-blue-300 p-1.5 rounded-lg hover:bg-blue-500/10 transition-all"><Edit3 className="w-4 h-4" /></button>
                                <button onClick={() => deleteMatchMut.mutate(m.id)} className="text-rose-500 hover:text-rose-400 p-1.5 rounded-lg hover:bg-rose-500/10 transition-all"><Trash2 className="w-4 h-4" /></button>
                              </div>
                            )}
                          </div>
                        ))}
                        {matches.length === 0 && <p className="text-slate-600 text-sm text-center py-4">No matches scheduled yet.</p>}
                      </div>
                    </div>
                  )}

                  {adminTab === "broadcast" && (
                    <div className="space-y-5">
                      <div className="bg-white/3 border border-white/8 rounded-2xl p-5">
                        <h4 className="font-bold mb-1 text-sm uppercase tracking-widest text-emerald-400">WhatsApp Broadcast</h4>
                        <p className="text-xs text-slate-500 mb-4">Generate a pre-formatted match reminder — copy it or open in WhatsApp to paste into a broadcast list or group.</p>

                        {/* Week filter */}
                        <div className="flex gap-3 items-center mb-4 flex-wrap">
                          <label className="text-xs text-slate-400 shrink-0">Filter by week:</label>
                          <Select value={broadcastWeek || "all"} onValueChange={v => setBroadcastWeek(v === "all" ? "" : v)}>
                            <SelectTrigger className="w-44 bg-white/5 border-white/10 text-white text-sm">
                              <SelectValue placeholder="All upcoming" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="all">All upcoming matches</SelectItem>
                              {Array.from(new Set(matches.filter((m: any) => m.week_label).map((m: any) => m.week_label))).map((wk: any) => (
                                <SelectItem key={wk} value={wk}>{wk}</SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>

                        {/* Message preview */}
                        <div className="bg-[#111827] border border-white/10 rounded-xl p-4 mb-4">
                          <p className="text-xs text-slate-500 mb-2 uppercase tracking-widest">Message Preview</p>
                          <pre className="text-sm text-slate-200 whitespace-pre-wrap font-sans leading-relaxed">{buildBroadcastMessage()}</pre>
                        </div>

                        {/* Action buttons */}
                        <div className="flex gap-3 flex-wrap">
                          <Button
                            className="bg-white/10 hover:bg-white/20 text-white border border-white/20 font-bold"
                            onClick={() => {
                              navigator.clipboard.writeText(buildBroadcastMessage());
                              setBroadcastCopied(true);
                              setTimeout(() => setBroadcastCopied(false), 2500);
                              toast({ title: broadcastCopied ? "Copied again!" : "Copied to clipboard!", description: "Paste into WhatsApp Broadcast or group." });
                            }}
                          >
                            {broadcastCopied ? <CheckCircle2 className="w-4 h-4 mr-2 text-emerald-400" /> : <MessageCircle className="w-4 h-4 mr-2" />}
                            {broadcastCopied ? "Copied!" : "Copy Message"}
                          </Button>
                          <Button
                            className="bg-[#25D366] hover:bg-[#1ebe57] text-white font-bold"
                            onClick={() => {
                              const msg = encodeURIComponent(buildBroadcastMessage());
                              window.open(`https://wa.me/971523946311?text=${msg}`, "_blank");
                            }}
                          >
                            <MessageCircle className="w-4 h-4 mr-2" />
                            Open in WhatsApp
                          </Button>
                        </div>
                      </div>

                      {/* Quick tip */}
                      <div className="bg-emerald-950/40 border border-emerald-500/20 rounded-xl p-4 text-xs text-slate-400 leading-relaxed">
                        <p className="font-bold text-emerald-400 mb-1">📋 How to broadcast</p>
                        <ol className="list-decimal list-inside space-y-1">
                          <li>Click <strong className="text-white">Copy Message</strong> above.</li>
                          <li>Open WhatsApp Business → <strong className="text-white">Broadcast Lists</strong>.</li>
                          <li>Select your broker contacts list and paste.</li>
                          <li>Alternatively, use <strong className="text-white">Open in WhatsApp</strong> to send directly from your phone.</li>
                        </ol>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        )}

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
