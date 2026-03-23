import { useState } from "react";
import { SEOMeta } from "@/components/seo-meta";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Globe, Shield, TrendingUp, MessageSquare, CheckCircle2, Clock,
  MapPin, ArrowRight, User, Calendar, Star, AlertTriangle,
  Briefcase, Home, Plane, ChevronRight
} from "lucide-react";
import { SiWhatsapp } from "react-icons/si";
import heroBg from "@assets/stock_images/dubai_skyline_sunset_21b85db0.jpg";

const WHATSAPP = "https://wa.me/971523946311?text=I%27d%20like%20to%20book%20a%20Relocation%20Consultation%20session";

const situations = [
  {
    icon: AlertTriangle,
    label: "Security Concerns",
    desc: "Regional instability is making me reconsider my base",
    color: "text-amber-400",
    bg: "bg-amber-500/10 border-amber-500/20",
  },
  {
    icon: Briefcase,
    label: "Business Relocation",
    desc: "I'm exploring where to base my company and team",
    color: "text-sky-400",
    bg: "bg-sky-500/10 border-sky-500/20",
  },
  {
    icon: Home,
    label: "Family Move",
    desc: "We need a safe, stable environment for our family",
    color: "text-emerald-400",
    bg: "bg-emerald-500/10 border-emerald-500/20",
  },
  {
    icon: TrendingUp,
    label: "Wealth & Asset Protection",
    desc: "I want to protect assets in a stable jurisdiction",
    color: "text-violet-400",
    bg: "bg-violet-500/10 border-violet-500/20",
  },
];

const comparisons = [
  {
    city: "Dubai",
    flag: "🇦🇪",
    pros: ["0% income tax", "Golden Visa stability", "World's busiest airport hub", "Strong rule of law", "Politically neutral"],
    cons: ["Summer heat", "Regional proximity to conflict zones"],
    verdict: "Stay if your business is global. Leave if your risk tolerance is low.",
    score: 92,
    scoreColor: "text-emerald-400",
    borderColor: "border-emerald-500/30",
  },
  {
    city: "Singapore",
    flag: "🇸🇬",
    pros: ["Safe, stable government", "Asia-Pacific gateway", "Strong financial system", "English-speaking"],
    cons: ["High cost of living", "Strict regulations", "Corporate tax 17%"],
    verdict: "Best Asia pivot. Costs are 2–3× higher than Dubai.",
    score: 85,
    scoreColor: "text-sky-400",
    borderColor: "border-sky-500/20",
  },
  {
    city: "Lisbon",
    flag: "🇵🇹",
    pros: ["NHR tax regime", "EU access", "Affordable living", "Quality of life"],
    cons: ["NHR benefits phasing out", "Slower business setup", "Limited MENA market access"],
    verdict: "Good for EU lifestyle. Less strategic for trade.",
    score: 74,
    scoreColor: "text-amber-400",
    borderColor: "border-amber-500/20",
  },
  {
    city: "London",
    flag: "🇬🇧",
    pros: ["Global financial centre", "English law", "Deep talent pool", "Cultural familiarity"],
    cons: ["45% top income tax", "High cost", "Post-Brexit friction", "Winter lifestyle"],
    verdict: "For finance. Poor value unless you're in capital markets.",
    score: 65,
    scoreColor: "text-rose-400",
    borderColor: "border-rose-500/20",
  },
];

const covered = [
  "Your current situation: staying or leaving Dubai?",
  "Security risk assessment — what the data actually shows vs media narrative",
  "Dubai-specific advantages you may be undervaluing",
  "Top global alternatives ranked for your profile (business, family, wealth)",
  "Tax implications of each relocation option",
  "Visa and residency pathways — timelines and requirements",
  "Cost of living comparison: Dubai vs alternatives",
  "Action plan: what to do in the next 30 / 90 / 180 days",
];

const consultants = [
  {
    name: "Senior Relocation Advisor",
    specialty: "Dubai & GCC Strategy",
    experience: "12+ years",
    icon: "🇦🇪",
  },
  {
    name: "International Mobility Expert",
    specialty: "Europe & Asia Pacific",
    experience: "9+ years",
    icon: "🌍",
  },
  {
    name: "Wealth & Residency Consultant",
    specialty: "Tax Optimisation & Visas",
    experience: "15+ years",
    icon: "💼",
  },
];

type FormState = "idle" | "submitting" | "success" | "error";

export default function ConsultPage() {
  const [form, setForm] = useState({ name: "", email: "", phone: "", situation: "", message: "" });
  const [formState, setFormState] = useState<FormState>("idle");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));
  };

  const handleSituationSelect = (label: string) => {
    setForm((f) => ({ ...f, situation: label }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.phone) return;
    setFormState("submitting");
    try {
      const res = await fetch("/api/consult", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (res.ok) {
        setFormState("success");
      } else {
        setFormState("error");
      }
    } catch {
      setFormState("error");
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <SEOMeta
        title="Dubai Relocation Consultation — Stay, Move, or Set Up?"
        description="Book a 1-on-1 session with a DeliWer relocation consultant. We help expats and entrepreneurs decide: stay in Dubai, move cheaper, or set up elsewhere. Actionable, personalised advice."
        canonical="https://www.deliwer.com/consult"
        keywords="Dubai relocation consultant, Dubai vs Singapore, Dubai vs London, leave Dubai, stay in Dubai, expat financial planning Dubai, Dubai cost of living, relocate from Dubai, Dubai digital nomad visa, where to move from Dubai, relocation consultation UAE"
      />

      {/* ── HERO ── */}
      <section className="relative min-h-[80vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-cover bg-center bg-no-repeat" style={{ backgroundImage: `url(${heroBg})` }} />
        <div className="absolute inset-0 bg-gradient-to-b from-slate-950/75 via-slate-950/60 to-slate-950" />
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950/70 via-transparent to-slate-950/70" />
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-slate-950 to-transparent" />

        <div className="relative z-10 max-w-4xl mx-auto px-4 text-center pt-32 pb-20">
          <Badge className="mb-6 bg-amber-500/15 text-amber-400 border border-amber-500/30 text-xs font-bold uppercase tracking-widest px-4 py-2 backdrop-blur-sm">
            Private Relocation Consultation
          </Badge>
          <h1 className="text-5xl md:text-6xl font-black uppercase tracking-tight leading-none mb-6 drop-shadow-2xl">
            Stay in Dubai<br />
            <span className="text-emerald-400">Or Leave?</span><br />
            <span className="text-3xl md:text-4xl text-gray-200 font-bold normal-case tracking-tight">Get Professional Advice.</span>
          </h1>
          <p className="text-lg text-gray-200 max-w-2xl mx-auto mb-8 drop-shadow leading-relaxed">
            Book a one-on-one session with a relocation consultant. We cut through the noise — media panic, regional security concerns, tax comparisons — and give you a clear, personalised action plan.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button
              size="lg"
              className="bg-emerald-500 hover:bg-emerald-400 text-black font-black uppercase tracking-widest text-sm px-10 py-6 rounded-2xl flex items-center gap-2 shadow-xl shadow-emerald-500/30"
              onClick={() => document.getElementById("booking")?.scrollIntoView({ behavior: "smooth" })}
              data-testid="button-cta-book-session"
            >
              <Calendar className="w-5 h-5" />
              Book Your Session
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-white/30 bg-white/5 backdrop-blur-sm text-white hover:bg-white/15 font-bold uppercase tracking-widest text-sm px-10 py-6 rounded-2xl flex items-center gap-2"
              onClick={() => window.open(WHATSAPP, "_blank")}
              data-testid="button-cta-whatsapp-hero"
            >
              <SiWhatsapp className="w-5 h-5" />
              WhatsApp First
            </Button>
          </div>
          <div className="flex items-center justify-center gap-6 mt-8 text-xs text-gray-400">
            <div className="flex items-center gap-2"><Clock className="w-4 h-4 text-emerald-400" /> 60-min session</div>
            <div className="flex items-center gap-2"><User className="w-4 h-4 text-emerald-400" /> 1-on-1 private</div>
            <div className="flex items-center gap-2"><Globe className="w-4 h-4 text-emerald-400" /> Video or WhatsApp</div>
          </div>
        </div>
      </section>

      {/* ── WHAT'S YOUR SITUATION? ── */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-black uppercase tracking-tight mb-4">
              What's Your <span className="text-emerald-400">Situation?</span>
            </h2>
            <p className="text-gray-400 max-w-xl mx-auto">Our consultants are equipped to advise across all relocation scenarios — from urgent security-driven moves to long-term lifestyle optimisation.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {situations.map((s) => (
              <div key={s.label} className={`flex items-start gap-4 border ${s.bg} rounded-2xl p-5`} data-testid={`card-situation-${s.label.toLowerCase().replace(/\s/g, "-")}`}>
                <div className={`w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center shrink-0`}>
                  <s.icon className={`w-5 h-5 ${s.color}`} />
                </div>
                <div>
                  <div className={`font-black text-white text-base mb-1`}>{s.label}</div>
                  <p className="text-gray-400 text-sm">{s.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── WHAT'S COVERED ── */}
      <section className="py-20 px-4 bg-slate-900/50">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-black uppercase tracking-tight mb-4">
              What We <span className="text-emerald-400">Cover</span>
            </h2>
            <p className="text-gray-400 max-w-xl mx-auto">Every session is custom — but these are the topics we always address.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {covered.map((item, i) => (
              <div key={i} className="flex items-start gap-3 bg-slate-800/40 border border-white/5 rounded-xl p-4" data-testid={`item-covered-${i}`}>
                <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                <p className="text-gray-300 text-sm">{item}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── DUBAI vs THE WORLD ── */}
      <section className="py-20 px-4">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-black uppercase tracking-tight mb-4">
              Dubai vs <span className="text-emerald-400">The Alternatives</span>
            </h2>
            <p className="text-gray-400 max-w-2xl mx-auto">Our consultants give you an objective comparison — not a sales pitch. Here's a snapshot of how the top destinations stack up right now.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {comparisons.map((c) => (
              <Card key={c.city} className={`bg-slate-800/50 border ${c.borderColor} hover:border-opacity-60 transition-colors`} data-testid={`card-comparison-${c.city.toLowerCase()}`}>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <span className="text-3xl">{c.flag}</span>
                      <div>
                        <div className="font-black text-white text-xl">{c.city}</div>
                        <div className="flex items-center gap-1">
                          <span className="text-xs text-gray-500 uppercase tracking-wider">Score</span>
                          <span className={`text-lg font-black ${c.scoreColor}`}>{c.score}</span>
                          <span className="text-gray-600 text-xs">/100</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="mb-3">
                    <div className="text-[10px] font-black uppercase tracking-widest text-emerald-400 mb-2">Pros</div>
                    <div className="space-y-1">
                      {c.pros.map((p) => (
                        <div key={p} className="flex items-center gap-2">
                          <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 shrink-0" />
                          <span className="text-gray-300 text-xs">{p}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="mb-4">
                    <div className="text-[10px] font-black uppercase tracking-widest text-rose-400 mb-2">Watch Out</div>
                    <div className="space-y-1">
                      {c.cons.map((con) => (
                        <div key={con} className="flex items-center gap-2">
                          <div className="w-1.5 h-1.5 rounded-full bg-rose-400 shrink-0" />
                          <span className="text-gray-400 text-xs">{con}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="bg-white/5 rounded-xl p-3 border border-white/5">
                    <p className="text-gray-300 text-xs italic">"{c.verdict}"</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
          <p className="text-center text-gray-600 text-xs mt-6">Scores are indicative and based on DeliWer's internal relocation framework. Your consultant will assess based on your specific profile.</p>
        </div>
      </section>

      {/* ── MEET THE CONSULTANTS ── */}
      <section className="py-20 px-4 bg-slate-900/50">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-black uppercase tracking-tight mb-4">
              Your <span className="text-emerald-400">Consultant</span>
            </h2>
            <p className="text-gray-400 max-w-xl mx-auto">Senior advisors with boots-on-the-ground experience in Dubai and global relocation markets.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {consultants.map((c) => (
              <div key={c.name} className="bg-slate-800/50 border border-white/10 rounded-2xl p-6 text-center hover:border-emerald-500/30 transition-colors" data-testid={`card-consultant-${c.name.toLowerCase().replace(/\s/g, "-")}`}>
                <div className="text-4xl mb-4">{c.icon}</div>
                <div className="font-black text-white text-base mb-1">{c.name}</div>
                <div className="text-emerald-400 text-xs font-bold uppercase tracking-wider mb-2">{c.specialty}</div>
                <Badge className="bg-white/5 text-gray-400 border border-white/10 text-[10px]">{c.experience} experience</Badge>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── BOOKING FORM ── */}
      <section id="booking" className="py-24 px-4">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-12">
            <Badge className="mb-4 bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-xs font-bold uppercase tracking-widest px-4 py-2">
              Book Your Session
            </Badge>
            <h2 className="text-3xl md:text-4xl font-black uppercase tracking-tight mb-4">
              Reserve Your <span className="text-emerald-400">Slot</span>
            </h2>
            <p className="text-gray-400">Fill in your details. We'll confirm your session within 2 hours during business hours.</p>
          </div>

          {formState === "success" ? (
            <div className="bg-emerald-900/30 border border-emerald-500/30 rounded-3xl p-12 text-center">
              <CheckCircle2 className="w-16 h-16 text-emerald-400 mx-auto mb-4" />
              <h3 className="font-black text-white text-2xl mb-3">Request Received!</h3>
              <p className="text-gray-300 mb-6">We'll confirm your consultation slot via WhatsApp within 2 hours.</p>
              <Button
                className="bg-emerald-500 hover:bg-emerald-400 text-black font-black uppercase tracking-widest text-xs px-8 py-5 rounded-xl flex items-center gap-2 mx-auto"
                onClick={() => window.open(WHATSAPP, "_blank")}
                data-testid="button-success-whatsapp"
              >
                <SiWhatsapp className="w-4 h-4" /> Chat on WhatsApp Too
              </Button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="bg-slate-900/60 border border-white/10 rounded-3xl p-8 space-y-6" data-testid="form-consult-booking">

              {/* Situation selector */}
              <div>
                <Label className="text-xs font-black uppercase tracking-widest text-gray-400 mb-3 block">Your Primary Reason</Label>
                <div className="grid grid-cols-2 gap-3">
                  {situations.map((s) => (
                    <button
                      type="button"
                      key={s.label}
                      onClick={() => handleSituationSelect(s.label)}
                      className={`text-left p-3 rounded-xl border text-sm font-bold transition-all ${
                        form.situation === s.label
                          ? `${s.bg} ${s.color} border-opacity-60`
                          : "border-white/10 text-gray-400 hover:border-white/20"
                      }`}
                      data-testid={`button-situation-${s.label.toLowerCase().replace(/\s/g, "-")}`}
                    >
                      {s.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Name */}
              <div>
                <Label htmlFor="name" className="text-xs font-black uppercase tracking-widest text-gray-400 mb-2 block">Full Name *</Label>
                <Input
                  id="name"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  placeholder="Your full name"
                  required
                  className="bg-slate-800/60 border-white/10 text-white placeholder:text-gray-600 rounded-xl h-12 focus:border-emerald-500/50"
                  data-testid="input-name"
                />
              </div>

              {/* Email + Phone */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="email" className="text-xs font-black uppercase tracking-widest text-gray-400 mb-2 block">Email *</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={form.email}
                    onChange={handleChange}
                    placeholder="you@example.com"
                    required
                    className="bg-slate-800/60 border-white/10 text-white placeholder:text-gray-600 rounded-xl h-12 focus:border-emerald-500/50"
                    data-testid="input-email"
                  />
                </div>
                <div>
                  <Label htmlFor="phone" className="text-xs font-black uppercase tracking-widest text-gray-400 mb-2 block">WhatsApp Number *</Label>
                  <Input
                    id="phone"
                    name="phone"
                    type="tel"
                    value={form.phone}
                    onChange={handleChange}
                    placeholder="+971 50 000 0000"
                    required
                    className="bg-slate-800/60 border-white/10 text-white placeholder:text-gray-600 rounded-xl h-12 focus:border-emerald-500/50"
                    data-testid="input-phone"
                  />
                </div>
              </div>

              {/* Message */}
              <div>
                <Label htmlFor="message" className="text-xs font-black uppercase tracking-widest text-gray-400 mb-2 block">Tell Us Your Situation</Label>
                <Textarea
                  id="message"
                  name="message"
                  value={form.message}
                  onChange={handleChange}
                  placeholder="e.g. I've been in Dubai 4 years with my family. Considering Singapore or Portugal. Need help deciding..."
                  rows={4}
                  className="bg-slate-800/60 border-white/10 text-white placeholder:text-gray-600 rounded-xl focus:border-emerald-500/50 resize-none"
                  data-testid="input-message"
                />
              </div>

              {/* Submit */}
              <Button
                type="submit"
                size="lg"
                disabled={formState === "submitting"}
                className="w-full bg-emerald-500 hover:bg-emerald-400 text-black font-black uppercase tracking-widest text-sm py-6 rounded-xl flex items-center justify-center gap-2 shadow-lg shadow-emerald-500/20 disabled:opacity-60"
                data-testid="button-submit-booking"
              >
                {formState === "submitting" ? (
                  <div className="w-5 h-5 border-2 border-black border-t-transparent rounded-full animate-spin" />
                ) : (
                  <>
                    <Calendar className="w-5 h-5" />
                    Book My Consultation Session
                  </>
                )}
              </Button>

              {formState === "error" && (
                <p className="text-rose-400 text-sm text-center">Something went wrong. Please try WhatsApp instead.</p>
              )}

              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-white/10" />
                </div>
                <div className="relative text-center">
                  <span className="bg-slate-900/60 px-4 text-xs text-gray-600 uppercase tracking-widest">or</span>
                </div>
              </div>

              <Button
                type="button"
                size="lg"
                variant="outline"
                className="w-full border-[#25D366]/40 text-[#25D366] hover:bg-[#25D366]/10 font-black uppercase tracking-widest text-sm py-6 rounded-xl flex items-center justify-center gap-2"
                onClick={() => window.open(WHATSAPP, "_blank")}
                data-testid="button-whatsapp-form"
              >
                <SiWhatsapp className="w-5 h-5" />
                Message Us on WhatsApp Instead
              </Button>

              <p className="text-center text-gray-600 text-xs">Sessions are conducted via Zoom, Google Meet, or WhatsApp video. Response within 2 hours Mon–Sat.</p>
            </form>
          )}
        </div>
      </section>

      {/* ── QUICK FAQ ── */}
      <section className="py-16 px-4 bg-slate-900/50">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-2xl font-black uppercase tracking-tight mb-8 text-center">Common Questions</h2>
          <div className="space-y-4">
            {[
              { q: "How long is a session?", a: "60 minutes. We also offer 30-minute quick-fire sessions for focused questions." },
              { q: "Is this for individuals or companies?", a: "Both. We advise expat families, solo founders, and corporate teams relocating their HQ or key personnel." },
              { q: "What if I'm already outside Dubai?", a: "Our advisors can help you evaluate whether to return or settle elsewhere — fully remotely." },
              { q: "Are you biased toward Dubai?", a: "No. We give honest assessments. If another destination is better for you, we'll say so." },
            ].map((item, i) => (
              <div key={i} className="bg-slate-800/40 border border-white/5 rounded-xl p-5" data-testid={`faq-item-${i}`}>
                <div className="font-bold text-white text-sm mb-2 flex items-start gap-2">
                  <ChevronRight className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  {item.q}
                </div>
                <p className="text-gray-400 text-sm pl-6">{item.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
