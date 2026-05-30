import { useState } from "react";
import { motion } from "framer-motion";
import { Link } from "wouter";
import {
  Smartphone, Package, Globe, ArrowRight, CheckCircle2, MessageSquare,
  Video, Search, Plane, Handshake, MapPinned, Users, Shield,
  ChevronRight, Zap, Star,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { Helmet } from "react-helmet";
import heroPhoneImg from "@assets/Hero_iPhone_1755786821791.avif";

const WA_NUMBER = "971523906019";
const WA_BASE = `https://wa.me/${WA_NUMBER}`;

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: "easeOut" } },
};
const stagger = { visible: { transition: { staggerChildren: 0.1 } } };

function Section({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0 }} variants={stagger} className={className}>
      {children}
    </motion.div>
  );
}
function Item({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return <motion.div variants={fadeUp} className={className}>{children}</motion.div>;
}

const PRODUCTS = [
  { icon: Smartphone, name: "Used iPhones", sub: "Grade A/B refurbished · Bulk available" },
  { icon: Smartphone, name: "Refurbished Smartphones", sub: "Mixed brands · Tested & graded" },
  { icon: Package, name: "Laptops", sub: "Business & consumer grade" },
  { icon: Package, name: "Tablets", sub: "iPads & Android · Various specs" },
  { icon: Package, name: "Consumer Electronics", sub: "Accessories, wearables & more" },
];

const SERVICES = [
  { icon: Search, name: "Supplier Sourcing", desc: "Access Dubai's refurbished electronics supplier network without being physically present." },
  { icon: Video, name: "Remote Inspections", desc: "Video-based device inspection and grading verification before purchase and export." },
  { icon: Plane, name: "Air Cargo Coordination", desc: "Express air freight from Dubai to CIS markets via direct and charter routes." },
  { icon: Package, name: "Charter Shipment Support", desc: "Flexible charter cargo for bulk and urgent electronics shipments." },
  { icon: Handshake, name: "Broker Partnerships", desc: "Revenue-sharing arrangements for CIS importers, resellers, and freight coordinators." },
];

const MARKETS = [
  "Azerbaijan", "Kazakhstan", "Uzbekistan", "Russia", "Georgia", "Kyrgyzstan",
];

const WHY = [
  { icon: Globe, title: "Dubai Network Access", desc: "Direct access to Dubai's refurbished electronics supply chain — one of the world's largest re-export hubs." },
  { icon: Package, title: "Logistics Coordination", desc: "Air cargo, charter shipment, and sea-air multimodal routing into CIS and Central Asian markets." },
  { icon: Shield, title: "Trusted Inspection Process", desc: "Remote video inspections, device grading verification, and supplier coordination before payment." },
  { icon: Zap, title: "Flexible Shipment Models", desc: "From single pallets to full container loads. Zero-inventory coordination models available." },
  { icon: Star, title: "Revenue-Share Partnerships", desc: "Commission-based arrangements — no upfront investment required to start sourcing and selling." },
  { icon: MapPinned, title: "Azerbaijan Local Coordination", desc: "Local coordination support available in Azerbaijan for last-mile distribution across the CIS region." },
];

export default function CisElectronicsPage() {
  const { toast } = useToast();
  const [form, setForm] = useState({
    company: "", country: "", whatsapp: "", product: "", volume: "", logistics: "",
  });
  const [submitting, setSubmitting] = useState(false);

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) {
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!form.company || !form.country || !form.whatsapp) {
      toast({ title: "Please fill in the required fields", variant: "destructive" });
      return;
    }
    setSubmitting(true);
    const msg = `CIS Electronics Inquiry\n\nCompany: ${form.company}\nCountry: ${form.country}\nWhatsApp: ${form.whatsapp}\nProduct: ${form.product}\nMonthly Volume: ${form.volume}\nLogistics Requirement: ${form.logistics}`;
    window.open(`${WA_BASE}?text=${encodeURIComponent(msg)}`, "_blank");
    toast({ title: "Opening WhatsApp", description: "We'll respond to your inquiry promptly." });
    setSubmitting(false);
  }

  return (
    <div className="min-h-screen bg-slate-950 text-white overflow-x-hidden">
      <Helmet>
        <title>Dubai Refurbished iPhone &amp; Electronics Supply for CIS Markets | ChainTrack by DeliWer</title>
        <meta name="description" content="Source refurbished iPhones, smartphones, laptops and consumer electronics from Dubai for CIS markets — Azerbaijan, Kazakhstan, Uzbekistan, Russia. Remote inspection, air cargo &amp; charter logistics via ChainTrack by DeliWer." />
        <meta name="keywords" content="Dubai refurbished iPhone, electronics supply CIS, used phones Dubai export, Azerbaijan electronics import, Kazakhstan smartphones Dubai, Uzbekistan refurbished devices, air cargo Dubai CIS, ChainTrack logistics, Dubai electronics broker" />
        <meta property="og:title" content="Dubai Refurbished Electronics Supply for CIS Markets | ChainTrack" />
        <meta property="og:description" content="Access Dubai's refurbished electronics supply chain. iPhones, laptops, and consumer devices for CIS importers — broker partnerships, remote inspection, charter logistics." />
        <meta property="og:url" content="https://www.deliwer.com/cis-electronics" />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="https://www.deliwer.com/og-chaintrack-electronics.jpg" />
        <link rel="canonical" href="https://www.deliwer.com/cis-electronics" />
        <meta name="geo.region" content="AE-DU" />
        <meta name="geo.placename" content="Dubai, UAE" />
        <meta name="robots" content="index, follow" />
      </Helmet>

      {/* ── HERO ── */}
      <section className="relative min-h-[80vh] flex items-center justify-center px-6 pt-20 pb-16 overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <img
            src={heroPhoneImg}
            alt="Dubai refurbished electronics supply"
            className="absolute inset-0 w-full h-full object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-br from-slate-950/92 via-slate-950/78 to-slate-950/88" />
          {/* ── Text overlay gradient — makes hero header pop ── */}
          <div className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(ellipse 88% 70% at 50% 44%, rgba(2,6,23,0.82) 0%, rgba(2,6,23,0.42) 56%, transparent 100%)" }} />
          <div className="absolute top-1/4 left-1/3 w-96 h-96 bg-sky-500/12 rounded-full blur-3xl" />
          <div className="absolute bottom-1/4 right-1/4 w-72 h-72 bg-violet-500/12 rounded-full blur-3xl" />
        </div>

        <div className="relative max-w-5xl mx-auto text-center">
          <Section>
            <Item>
              <Badge className="bg-sky-500/15 text-sky-300 border-sky-500/30 px-4 py-1.5 text-sm font-medium mb-6 inline-flex gap-2">
                <Smartphone className="w-3.5 h-3.5" />
                Dubai Electronics Supply · CIS Markets
              </Badge>
            </Item>
            <Item>
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-black tracking-tight mb-6 leading-none">
                <span className="block text-white">Dubai Refurbished iPhone</span>
                <span className="block bg-gradient-to-r from-sky-400 to-violet-400 bg-clip-text text-transparent mt-2">
                  &amp; Electronics Supply
                </span>
                <span className="block text-white mt-2">for CIS Markets</span>
              </h1>
            </Item>
            <Item>
              <p className="text-xl text-slate-300 max-w-3xl mx-auto leading-relaxed mb-10">
                Sourcing, inspections, charter logistics, and broker-powered distribution support from Dubai.
              </p>
            </Item>
            <Item>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a href="#inquiry">
                  <Button size="lg" className="bg-sky-500 hover:bg-sky-400 text-white font-bold px-8 gap-2">
                    Request Supply &amp; Logistics Support
                    <ArrowRight className="w-5 h-5" />
                  </Button>
                </a>
                <a href={WA_BASE} target="_blank" rel="noopener noreferrer">
                  <Button size="lg" className="bg-[#25D366] hover:bg-[#20bd5a] text-white font-bold px-8 gap-2">
                    <MessageSquare className="w-5 h-5" />
                    WhatsApp Us
                  </Button>
                </a>
                <Link href="/chaintrack">
                  <Button size="lg" variant="outline" className="border-sky-500/40 text-sky-300 hover:bg-sky-500/10 hover:border-sky-400/60 font-bold px-8 gap-2 transition-all">
                    <Smartphone className="w-5 h-5" />
                    Browse Marketplace
                    <ChevronRight className="w-4 h-4" />
                  </Button>
                </Link>
              </div>
            </Item>
          </Section>
        </div>
      </section>

      {/* ── TRUST STRIP ── */}
      <div className="py-5 px-6 border-y border-sky-500/15 bg-sky-500/5">
        <div className="max-w-5xl mx-auto flex flex-wrap justify-center gap-x-8 gap-y-2 text-xs font-black uppercase tracking-widest text-sky-300">
          {["Dubai Network Access", "Remote Inspection Support", "Charter Logistics", "Broker Partnerships", "Azerbaijan Local Coordination", "Zero Inventory Models"].map((t) => (
            <span key={t} className="flex items-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5 text-sky-500 shrink-0" />
              {t}
            </span>
          ))}
        </div>
      </div>

      {/* ── PRODUCTS ── */}
      <section className="py-24 px-6 border-b border-slate-800">
        <div className="max-w-5xl mx-auto">
          <Section className="text-center mb-14">
            <Item>
              <Badge className="bg-slate-700 text-slate-300 border-slate-600 mb-4">Products Available</Badge>
            </Item>
            <Item>
              <h2 className="text-3xl md:text-4xl font-black text-white mb-3">
                What We <span className="text-sky-400">Source from Dubai</span>
              </h2>
            </Item>
          </Section>
          <Section className="grid grid-cols-2 md:grid-cols-5 gap-4">
            {PRODUCTS.map((p) => (
              <Item key={p.name}>
                <div className="flex flex-col items-center text-center p-5 rounded-2xl border border-slate-800 bg-slate-900 hover:border-sky-500/30 transition-colors">
                  <p.icon className="w-8 h-8 text-sky-400 mb-3" />
                  <p className="text-white font-bold text-sm mb-1">{p.name}</p>
                  <p className="text-slate-500 text-xs leading-tight">{p.sub}</p>
                </div>
              </Item>
            ))}
          </Section>
        </div>
      </section>

      {/* ── SERVICES ── */}
      <section className="py-24 px-6 border-b border-slate-800 bg-slate-900/40">
        <div className="max-w-5xl mx-auto">
          <Section className="text-center mb-14">
            <Item>
              <Badge className="bg-violet-500/15 text-violet-300 border-violet-500/30 mb-4">Services</Badge>
            </Item>
            <Item>
              <h2 className="text-3xl md:text-4xl font-black text-white mb-3">
                End-to-End <span className="text-violet-400">Coordination</span>
              </h2>
            </Item>
          </Section>
          <Section className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {SERVICES.map((s) => (
              <Item key={s.name}>
                <div className="flex items-start gap-4 p-5 rounded-xl border border-slate-800 bg-slate-950 hover:border-violet-500/30 transition-colors h-full">
                  <div className="w-10 h-10 rounded-xl bg-violet-500/10 flex items-center justify-center shrink-0">
                    <s.icon className="w-5 h-5 text-violet-400" />
                  </div>
                  <div>
                    <p className="text-white font-bold text-sm mb-1">{s.name}</p>
                    <p className="text-slate-500 text-xs leading-relaxed">{s.desc}</p>
                  </div>
                </div>
              </Item>
            ))}
          </Section>
        </div>
      </section>

      {/* ── TARGET MARKETS ── */}
      <section className="py-24 px-6 border-b border-slate-800">
        <div className="max-w-4xl mx-auto text-center">
          <Section>
            <Item>
              <Badge className="bg-emerald-500/15 text-emerald-300 border-emerald-500/30 mb-4">Target Markets</Badge>
            </Item>
            <Item>
              <h2 className="text-3xl md:text-4xl font-black text-white mb-8">
                We Ship Into <span className="text-emerald-400">These Markets</span>
              </h2>
            </Item>
            <Item>
              <div className="flex flex-wrap justify-center gap-3">
                {MARKETS.map((m) => (
                  <div key={m} className="flex items-center gap-2 px-5 py-2.5 rounded-full border border-emerald-500/25 bg-emerald-500/8 text-emerald-300 font-bold text-sm">
                    <Globe className="w-4 h-4" />
                    {m}
                  </div>
                ))}
              </div>
            </Item>
          </Section>
        </div>
      </section>

      {/* ── WHY DELIWER ── */}
      <section className="py-24 px-6 border-b border-slate-800 bg-slate-900/30">
        <div className="max-w-5xl mx-auto">
          <Section className="text-center mb-14">
            <Item>
              <Badge className="bg-amber-500/15 text-amber-300 border-amber-500/30 mb-4">Why DeliWer</Badge>
            </Item>
            <Item>
              <h2 className="text-3xl md:text-4xl font-black text-white mb-3">
                Your Dubai <span className="text-amber-400">Logistics Partner</span>
              </h2>
            </Item>
          </Section>
          <Section className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {WHY.map((w) => (
              <Item key={w.title}>
                <div className="p-6 rounded-2xl border border-slate-800 bg-slate-950 hover:border-amber-500/30 transition-colors">
                  <div className="w-10 h-10 rounded-xl bg-amber-500/10 flex items-center justify-center mb-4">
                    <w.icon className="w-5 h-5 text-amber-400" />
                  </div>
                  <h3 className="text-white font-bold text-sm mb-2">{w.title}</h3>
                  <p className="text-slate-500 text-xs leading-relaxed">{w.desc}</p>
                </div>
              </Item>
            ))}
          </Section>
        </div>
      </section>

      {/* ── INQUIRY FORM ── */}
      <section id="inquiry" className="py-24 px-6">
        <div className="max-w-2xl mx-auto">
          <Section className="text-center mb-12">
            <Item>
              <Badge className="bg-sky-500/15 text-sky-300 border-sky-500/30 mb-4">Inquiry</Badge>
            </Item>
            <Item>
              <h2 className="text-3xl md:text-4xl font-black text-white mb-3">
                Request Supply &amp; Logistics Support
              </h2>
            </Item>
            <Item>
              <p className="text-slate-400 text-sm max-w-md mx-auto">
                Tell us your requirement and we'll respond within 24 hours via WhatsApp.
              </p>
            </Item>
          </Section>

          <motion.form
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            onSubmit={handleSubmit}
            className="bg-slate-900 border border-slate-800 rounded-2xl p-8 space-y-5"
          >
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-black uppercase tracking-widest text-gray-400 mb-2 block">Company Name *</label>
                <Input
                  name="company"
                  value={form.company}
                  onChange={handleChange}
                  placeholder="Your company name"
                  className="bg-slate-800 border-white/10 text-white placeholder:text-gray-600 rounded-xl h-12"
                  required
                />
              </div>
              <div>
                <label className="text-xs font-black uppercase tracking-widest text-gray-400 mb-2 block">Country *</label>
                <Input
                  name="country"
                  value={form.country}
                  onChange={handleChange}
                  placeholder="e.g. Azerbaijan"
                  className="bg-slate-800 border-white/10 text-white placeholder:text-gray-600 rounded-xl h-12"
                  required
                />
              </div>
            </div>

            <div>
              <label className="text-xs font-black uppercase tracking-widest text-gray-400 mb-2 block">WhatsApp Number *</label>
              <Input
                name="whatsapp"
                value={form.whatsapp}
                onChange={handleChange}
                placeholder="+994 XX XXX XXXX"
                className="bg-slate-800 border-white/10 text-white placeholder:text-gray-600 rounded-xl h-12"
                required
              />
            </div>

            <div>
              <label className="text-xs font-black uppercase tracking-widest text-gray-400 mb-2 block">Product Requirement</label>
              <Input
                name="product"
                value={form.product}
                onChange={handleChange}
                placeholder="e.g. Used iPhones 13 Pro Max, Grade A"
                className="bg-slate-800 border-white/10 text-white placeholder:text-gray-600 rounded-xl h-12"
              />
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-black uppercase tracking-widest text-gray-400 mb-2 block">Monthly Volume</label>
                <Input
                  name="volume"
                  value={form.volume}
                  onChange={handleChange}
                  placeholder="e.g. 100 units / month"
                  className="bg-slate-800 border-white/10 text-white placeholder:text-gray-600 rounded-xl h-12"
                />
              </div>
              <div>
                <label className="text-xs font-black uppercase tracking-widest text-gray-400 mb-2 block">Logistics Requirement</label>
                <Input
                  name="logistics"
                  value={form.logistics}
                  onChange={handleChange}
                  placeholder="e.g. Air cargo to Baku"
                  className="bg-slate-800 border-white/10 text-white placeholder:text-gray-600 rounded-xl h-12"
                />
              </div>
            </div>

            <Button
              type="submit"
              disabled={submitting}
              size="lg"
              className="w-full bg-sky-500 hover:bg-sky-400 text-white font-black uppercase tracking-widest h-14 rounded-xl gap-2"
            >
              <MessageSquare className="w-5 h-5" />
              Request Supply &amp; Logistics Support
            </Button>

            <p className="text-center text-xs text-gray-600 font-semibold">
              Submitting opens WhatsApp — we respond within 24 hours
            </p>
          </motion.form>
        </div>
      </section>

      {/* ── FINAL CTA ── */}
      <section className="py-16 px-6 border-t border-slate-800 bg-slate-900/30">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-2xl md:text-3xl font-black text-white mb-4">
            Ready to start sourcing from Dubai?
          </h2>
          <p className="text-slate-400 mb-8 text-sm">
            Contact our coordination desk on WhatsApp — available for CIS importers, brokers, and logistics partners.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center flex-wrap">
            <a href={WA_BASE} target="_blank" rel="noopener noreferrer">
              <Button size="lg" className="bg-[#25D366] hover:bg-[#20bd5a] text-white font-bold px-8 gap-2">
                <MessageSquare className="w-5 h-5" />
                WhatsApp: +971 52 390 6019
              </Button>
            </a>
            <Link href="/broker-onboard">
              <Button size="lg" className="bg-emerald-600 hover:bg-emerald-500 text-white font-bold px-8 gap-2">
                <Handshake className="w-5 h-5" />
                Become a Broker Partner
              </Button>
            </Link>
            <Link href="/logistics">
              <Button size="lg" variant="outline" className="border-slate-600 text-slate-300 hover:text-white gap-2">
                View Logistics Services
                <ChevronRight className="w-4 h-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
