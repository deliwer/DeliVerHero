import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { SEOMeta } from "@/components/seo-meta";
import {
  Shield, CheckCircle2, Cpu, Battery, Smartphone, Layers,
  BarChart3, Globe, ArrowRight, Award, Zap, Eye, FileCheck,
  Building2, Video, Target, Lock, Star, Activity, Search, Microscope
} from "lucide-react";
import { SiWhatsapp } from "react-icons/si";

const WHATSAPP_URL = "https://wa.me/971523946311?text=Hi%2C%20I%20want%20to%20learn%20about%20ChainTrack%20certified%20grading";

const GRADING_STAGES = [
  {
    step: "01",
    icon: Cpu,
    title: "Automated Hardware Diagnostics",
    desc: "Full chipset, modem, camera, sensor, and connectivity diagnostics run automatically via proprietary testing hardware.",
    checks: ["CPU / GPU benchmark", "Touch / display matrix test", "Camera & biometric scan", "Radio / SIM / Bluetooth / WiFi"],
    color: "cyan",
  },
  {
    step: "02",
    icon: Battery,
    title: "Battery Health Verification",
    desc: "Discharge-cycle testing determines true battery capacity. All grades above A require 80%+ battery health certification.",
    checks: ["Charge cycle count read", "Discharge capacity test", "Thermal stability check", "PMIC diagnostics"],
    color: "amber",
  },
  {
    step: "03",
    icon: Eye,
    title: "Cosmetic Grading Inspection",
    desc: "High-resolution optical scanning under standardized lighting conditions grades every unit against uniform cosmetic criteria.",
    checks: ["Display micro-scratch scan", "Chassis condition grading", "Button & port inspection", "IMEI / serial verification"],
    color: "blue",
  },
  {
    step: "04",
    icon: FileCheck,
    title: "Standardized Grade Assignment",
    desc: "Each unit is assigned a final grade — A+, A, B, C, or ASIS — following our institutional grading methodology.",
    checks: ["Grade certificate issued", "Batch IMEI manifest", "Condition photographic proof", "Escrow-ready documentation"],
    color: "emerald",
  },
  {
    step: "05",
    icon: Video,
    title: "Video Inspection Delivery",
    desc: "Buyers receive a recorded video inspection of their specific lot before funds are released from escrow.",
    checks: ["Per-unit video walkthrough", "Screen-on power-up footage", "Cosmetic close-up shots", "Packing & seal documentation"],
    color: "purple",
  },
];

const GRADES = [
  { grade: "A+", label: "Pristine", battery: "90%+", cosmetic: "Like new — zero visible marks", color: "emerald", border: "border-emerald-500/40", bg: "bg-emerald-500/10", text: "text-emerald-400" },
  { grade: "A", label: "Excellent", battery: "80%+", cosmetic: "Micro-scratches only, no chips", color: "cyan", border: "border-cyan-500/40", bg: "bg-cyan-500/10", text: "text-cyan-400" },
  { grade: "B", label: "Good", battery: "80%+", cosmetic: "Light wear, no cracks, fully functional", color: "blue", border: "border-blue-500/40", bg: "bg-blue-500/10", text: "text-blue-400" },
  { grade: "C", label: "Fair", battery: "70%+", cosmetic: "Visible wear, minor screen marks", color: "amber", border: "border-amber-500/40", bg: "bg-amber-500/10", text: "text-amber-400" },
  { grade: "ASIS", label: "Uninspected", battery: "Unknown", cosmetic: "For experienced buyers only", color: "orange", border: "border-orange-500/40", bg: "bg-orange-500/10", text: "text-orange-400" },
];

const TRUST_STATS = [
  { value: "50,000+", label: "Devices graded monthly" },
  { value: "99.2%", label: "Grade accuracy rate" },
  { value: "<24h", label: "Grading turnaround" },
  { value: "100%", label: "Video-verified lots" },
];

function FadeIn({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  return (
    <motion.div ref={ref} initial={{ opacity: 0, y: 24 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.5, delay }}>
      {children}
    </motion.div>
  );
}

export default function ChainTrackGradingPage() {
  return (
    <div className="min-h-screen bg-[#050910] text-white">
      <SEOMeta
        title="Certified Grading Infrastructure | ChainTrack"
        description="Remote sourcing confidence powered by institutional grading standards. Automated diagnostics, standardized cosmetic grading, battery testing, and video inspection delivery."
      />

      {/* Hero */}
      <section className="relative overflow-hidden pt-20 pb-16 border-b border-[#1E293B]">
        <div className="absolute inset-0 bg-gradient-to-br from-cyan-900/20 via-transparent to-blue-900/10 pointer-events-none" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-cyan-500/5 blur-[120px] rounded-full pointer-events-none" />
        <div className="max-w-6xl mx-auto px-6">
          <FadeIn>
            <div className="flex items-center gap-3 mb-6">
              <Badge className="bg-cyan-500/10 text-cyan-400 border-cyan-500/30 uppercase tracking-widest text-[10px] font-black">
                <Shield className="w-3 h-3 mr-1.5" /> Certified Infrastructure
              </Badge>
              <Badge className="bg-[#0D1424] text-slate-400 border-[#1E293B] uppercase tracking-widest text-[10px] font-black">
                Dubai CommerCity Ecosystem
              </Badge>
            </div>
            <h1 className="text-5xl md:text-6xl font-black leading-tight mb-6">
              Remote Sourcing Confidence<br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">
                Powered by Institutional Grading
              </span>
            </h1>
            <p className="text-xl text-slate-400 max-w-2xl mb-8 leading-relaxed">
              Every ChainTrack lot undergoes automated device testing, standardized grading, cosmetic verification, and battery diagnostics — so importers can source remotely with institutional confidence.
            </p>
            <div className="flex flex-wrap gap-4">
              <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer">
                <Button className="bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-black uppercase tracking-widest text-xs gap-2">
                  <SiWhatsapp className="w-4 h-4" /> Request Grading Report
                </Button>
              </a>
              <Link href="/chaintrack">
                <Button variant="outline" className="border-[#1E293B] text-slate-300 hover:text-white hover:border-slate-500 font-bold uppercase tracking-widest text-xs gap-2">
                  View Live Lots <ArrowRight className="w-4 h-4" />
                </Button>
              </Link>
            </div>
          </FadeIn>

          {/* Stats */}
          <FadeIn delay={0.1}>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-14">
              {TRUST_STATS.map((s, i) => (
                <div key={i} className="bg-[#0D1424] border border-[#1E293B] rounded-2xl px-5 py-4 text-center">
                  <div className="text-3xl font-black text-cyan-400 mb-1">{s.value}</div>
                  <div className="text-xs text-slate-500 uppercase tracking-wider">{s.label}</div>
                </div>
              ))}
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Grading Scale */}
      <section className="py-20 border-b border-[#1E293B]">
        <div className="max-w-6xl mx-auto px-6">
          <FadeIn>
            <div className="text-center mb-14">
              <h2 className="text-3xl font-black mb-4">Uniform Grading Methodology</h2>
              <p className="text-slate-400 max-w-xl mx-auto">Every device graded by ChainTrack is assigned a standardized grade following our enterprise-level inspection criteria.</p>
            </div>
          </FadeIn>
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            {GRADES.map((g, i) => (
              <FadeIn key={i} delay={i * 0.08}>
                <div className={`rounded-2xl border ${g.border} ${g.bg} p-5 h-full`}>
                  <div className={`text-4xl font-black ${g.text} mb-2`}>{g.grade}</div>
                  <div className={`text-sm font-bold ${g.text} mb-3`}>{g.label}</div>
                  <div className="space-y-2 text-xs text-slate-400">
                    <div className="flex items-start gap-1.5">
                      <Battery className={`w-3 h-3 ${g.text} mt-0.5 shrink-0`} />
                      <span>Battery: {g.battery}</span>
                    </div>
                    <div className="flex items-start gap-1.5">
                      <Eye className={`w-3 h-3 ${g.text} mt-0.5 shrink-0`} />
                      <span>{g.cosmetic}</span>
                    </div>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* 5-Stage Process */}
      <section className="py-20 border-b border-[#1E293B]">
        <div className="max-w-6xl mx-auto px-6">
          <FadeIn>
            <div className="text-center mb-14">
              <Badge className="bg-[#0D1424] border-[#1E293B] text-slate-400 uppercase tracking-widest text-[10px] mb-4">5-Stage Process</Badge>
              <h2 className="text-3xl font-black mb-4">How Every Device Gets Certified</h2>
              <p className="text-slate-400 max-w-xl mx-auto">Powered by certified grading ecosystems and advanced testing infrastructure in Dubai's free zone network.</p>
            </div>
          </FadeIn>
          <div className="space-y-6">
            {GRADING_STAGES.map((stage, i) => {
              const Icon = stage.icon;
              const colorMap: Record<string, string> = {
                cyan: "border-cyan-500/30 bg-cyan-500/10 text-cyan-400",
                amber: "border-amber-500/30 bg-amber-500/10 text-amber-400",
                blue: "border-blue-500/30 bg-blue-500/10 text-blue-400",
                emerald: "border-emerald-500/30 bg-emerald-500/10 text-emerald-400",
                purple: "border-purple-500/30 bg-purple-500/10 text-purple-400",
              };
              const cls = colorMap[stage.color];
              return (
                <FadeIn key={i} delay={i * 0.07}>
                  <Card className="bg-[#0D1424] border-[#1E293B] hover:border-cyan-500/20 transition-colors p-6">
                    <div className="flex items-start gap-5">
                      <div className={`w-12 h-12 rounded-xl border flex items-center justify-center shrink-0 ${cls}`}>
                        <Icon className="w-5 h-5" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-3 mb-2">
                          <span className="text-[10px] font-black text-slate-600 tracking-widest">STEP {stage.step}</span>
                          <h3 className="text-lg font-black text-white">{stage.title}</h3>
                        </div>
                        <p className="text-sm text-slate-400 mb-4 leading-relaxed">{stage.desc}</p>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                          {stage.checks.map((c, j) => (
                            <div key={j} className="flex items-center gap-1.5 text-xs text-slate-400">
                              <CheckCircle2 className="w-3 h-3 text-emerald-400 shrink-0" />
                              {c}
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </Card>
                </FadeIn>
              );
            })}
          </div>
        </div>
      </section>

      {/* Dubai CommerCity Ecosystem */}
      <section className="py-20 border-b border-[#1E293B]">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <FadeIn>
              <Badge className="bg-[#0D1424] border-[#1E293B] text-slate-400 uppercase tracking-widest text-[10px] mb-4">Infrastructure</Badge>
              <h2 className="text-3xl font-black mb-5">
                Dubai CommerCity<br />
                <span className="text-cyan-400">Grading Ecosystem</span>
              </h2>
              <p className="text-slate-400 leading-relaxed mb-6">
                ChainTrack operates within Dubai's enterprise-grade testing infrastructure — automated testing plants equipped with diagnostic hardware purpose-built for high-volume refurbished device verification.
              </p>
              <ul className="space-y-3">
                {[
                  "Automated testing plants in Dubai Free Zones",
                  "Enterprise-grade diagnostic equipment",
                  "Uniform grading methodology across all lots",
                  "DAFZA & Commercity escrow verification",
                  "IMEI database cross-check on every unit",
                  "Batch certification with photographic evidence",
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-2.5 text-sm text-slate-300">
                    <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                    {item}
                  </li>
                ))}
              </ul>
            </FadeIn>
            <FadeIn delay={0.1}>
              <div className="grid grid-cols-2 gap-4">
                {[
                  { icon: Building2, label: "DAFZA", sub: "Dubai Airport Freezone", badge: "Primary Hub" },
                  { icon: Globe, label: "Commercity", sub: "Dubai South Freezone", badge: "E-Commerce Zone" },
                  { icon: Microscope, label: "Testing Plants", sub: "Automated diagnostics", badge: "100+ Stations" },
                  { icon: Lock, label: "Escrow Verified", sub: "Funds held until confirmed", badge: "Zero-Risk" },
                ].map((item, i) => {
                  const Icon = item.icon;
                  return (
                    <Card key={i} className="bg-[#0D1424] border-[#1E293B] p-5">
                      <Icon className="w-6 h-6 text-cyan-400 mb-3" />
                      <div className="text-sm font-bold text-white mb-1">{item.label}</div>
                      <div className="text-xs text-slate-500 mb-2">{item.sub}</div>
                      <Badge className="bg-cyan-500/10 text-cyan-400 border-cyan-500/20 text-[9px] uppercase tracking-wider">{item.badge}</Badge>
                    </Card>
                  );
                })}
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* Verified by ChainTrack Banner */}
      <section className="py-16">
        <div className="max-w-6xl mx-auto px-6">
          <FadeIn>
            <div className="bg-gradient-to-br from-cyan-900/30 to-blue-900/20 border border-cyan-500/20 rounded-3xl p-10 text-center">
              <div className="inline-flex items-center gap-2 bg-cyan-500/10 border border-cyan-500/30 rounded-full px-4 py-2 mb-6">
                <Shield className="w-4 h-4 text-cyan-400" />
                <span className="text-sm font-black text-cyan-400 uppercase tracking-widest">Verified by ChainTrack</span>
              </div>
              <h2 className="text-3xl md:text-4xl font-black mb-4">
                Source Remotely. Arrive Confidently.
              </h2>
              <p className="text-slate-400 max-w-xl mx-auto mb-8 leading-relaxed">
                Every certified lot includes a grading report, video inspection, IMEI manifest, and escrow documentation — giving remote importers the institutional confidence of an on-site buyer.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer">
                  <Button className="bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-black uppercase tracking-widest text-xs gap-2">
                    <SiWhatsapp className="w-4 h-4" /> Request Grading for My Lot
                  </Button>
                </a>
                <Link href="/chaintrack">
                  <Button variant="outline" className="border-[#1E293B] text-slate-300 hover:text-white font-bold uppercase tracking-widest text-xs gap-2">
                    Browse Live Auctions <ArrowRight className="w-4 h-4" />
                  </Button>
                </Link>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>
    </div>
  );
}
