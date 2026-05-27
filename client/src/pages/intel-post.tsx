import { useState, useRef } from "react";
import { useParams, Link } from "wouter";
import { useQuery } from "@tanstack/react-query";
import { motion, useInView } from "framer-motion";
import { Helmet } from "react-helmet";
import {
  Clock, ArrowRight, ChevronDown, ChevronUp,
  Globe, MessageSquare, Truck,
} from "lucide-react";
import { SiWhatsapp, SiTelegram } from "react-icons/si";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import type { IntelPost } from "@shared/schema";

// ─── Animation helper ────────────────────────────────────────────────────────
function FadeUp({ children, delay = 0, className = "" }: {
  children: React.ReactNode; delay?: number; className?: string;
}) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  return (
    <motion.div ref={ref}
      initial={{ opacity: 0, y: 22 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.55, ease: "easeOut", delay }}
      className={className}
    >{children}</motion.div>
  );
}

// ─── Markdown renderer ────────────────────────────────────────────────────────
function ArticleBody({ md }: { md: string }) {
  return (
    <div className="space-y-4">
      {md.split("\n\n").map((para, i) => {
        if (para.startsWith("## ")) {
          return (
            <h2 key={i} className="text-xl font-black text-white mt-8 mb-1 first:mt-0">
              {para.slice(3)}
            </h2>
          );
        }
        if (!para.trim()) return null;
        const parts = para.split(/(\*\*.*?\*\*)/g);
        return (
          <p key={i} className="text-base text-white/55 leading-relaxed">
            {parts.map((part, j) =>
              part.startsWith("**") && part.endsWith("**")
                ? <strong key={j} className="text-white/80">{part.slice(2, -2)}</strong>
                : part
            )}
          </p>
        );
      })}
    </div>
  );
}

// ─── FAQ accordion ────────────────────────────────────────────────────────────
function FaqItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border-b border-white/6 last:border-0">
      <button
        className="w-full flex items-center justify-between gap-4 py-4 text-left group"
        onClick={() => setOpen(v => !v)}
      >
        <span className="text-sm font-bold text-white/75 group-hover:text-white transition-colors leading-snug">{q}</span>
        {open
          ? <ChevronUp className="w-4 h-4 text-white/25 shrink-0" />
          : <ChevronDown className="w-4 h-4 text-white/25 shrink-0" />
        }
      </button>
      {open && <p className="text-sm text-white/45 leading-relaxed pb-4 pr-8">{a}</p>}
    </div>
  );
}

// ─── Main page ────────────────────────────────────────────────────────────────
export default function IntelPostPage() {
  const { slug } = useParams<{ slug: string }>();
  const WA = "https://wa.me/971523946311?text=ChainTrack%20trade%20intel%20enquiry";
  const TG = "https://t.me/chaintracklogistics";

  const { data: post, isLoading, isError } = useQuery<IntelPost>({
    queryKey: ["/api/intel/posts", slug],
    queryFn: async () => {
      const r = await fetch(`/api/intel/posts/${slug}`);
      if (!r.ok) throw new Error("Not found");
      return r.json();
    },
  });

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#070B14] flex items-center justify-center">
        <div className="w-6 h-6 border-2 border-amber-500/30 border-t-amber-500 rounded-full animate-spin" />
      </div>
    );
  }

  if (isError || !post) {
    return (
      <div className="min-h-screen bg-[#070B14] text-white flex items-center justify-center px-6">
        <div className="text-center">
          <p className="text-white/30 text-sm mb-4">Article not found.</p>
          <Link href="/intel">
            <Button className="bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold">
              Browse all articles →
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": (post.faqs as Array<{ q: string; a: string }>).map(f => ({
      "@type": "Question",
      "name": f.q,
      "acceptedAnswer": { "@type": "Answer", "text": f.a },
    })),
  };

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": post.title,
    "description": post.metaDescription,
    "datePublished": post.publishedAt,
    "author": { "@type": "Organization", "name": "ChainTrack Logistics" },
    "publisher": { "@type": "Organization", "name": "ChainTrack by DeliWer", "url": "https://chaintrack.com" },
  };

  const publishedDate = post.publishedAt
    ? new Date(post.publishedAt).toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" })
    : null;

  return (
    <div className="min-h-screen bg-[#070B14] text-white" style={{ fontFamily: "'Inter', 'DM Sans', sans-serif" }}>
      <Helmet>
        <title>{post.title} | ChainTrack Trade Intelligence</title>
        <meta name="description" content={post.metaDescription} />
        <meta name="keywords" content={post.keywords} />
        <meta name="robots" content="index, follow, max-image-preview:large" />
        <meta property="og:title" content={post.title} />
        <meta property="og:description" content={post.metaDescription} />
        <meta property="og:type" content="article" />
        <link rel="canonical" href={`https://chaintrack.com/intel/${post.slug}`} />
        <script type="application/ld+json">{JSON.stringify(faqSchema)}</script>
        <script type="application/ld+json">{JSON.stringify(articleSchema)}</script>
      </Helmet>

      {/* ── Nav ──────────────────────────────────────────────────────────── */}
      <nav className="border-b border-white/6 bg-[#070B14]/95 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-3xl mx-auto px-6 h-14 flex items-center justify-between gap-4">
          <Link href="/logistics">
            <div className="flex items-center gap-2 cursor-pointer">
              <div className="w-6 h-6 rounded-lg bg-amber-500/15 border border-amber-500/20 flex items-center justify-center">
                <Truck className="w-3 h-3 text-amber-400" />
              </div>
              <span className="text-[11px] font-black uppercase tracking-widest text-white/50">ChainTrack</span>
            </div>
          </Link>
          <Link href="/intel">
            <span className="text-[10px] font-black uppercase tracking-widest text-white/25 hover:text-white/50 transition-colors cursor-pointer">
              ← All articles
            </span>
          </Link>
        </div>
      </nav>

      {/* ── Pipeline indicator ── */}
      <div className="bg-[#070B14] border-b border-white/5">
        <div className="max-w-3xl mx-auto px-6 py-2 flex items-center gap-2 text-[10px] font-black uppercase tracking-widest">
          <Link href="/chaintrack">
            <span className="text-white/25 hover:text-amber-400 transition-colors cursor-pointer">① Source</span>
          </Link>
          <span className="text-white/10 mx-1.5">→</span>
          <Link href="/logistics">
            <span className="text-white/25 hover:text-amber-400 transition-colors cursor-pointer">② Ship</span>
          </Link>
          <span className="text-white/10 mx-1.5">·</span>
          <span className="text-amber-400/70">Trade Intel</span>
        </div>
      </div>

      {/* ── Article ──────────────────────────────────────────────────────── */}
      <article className="max-w-3xl mx-auto px-6 pt-12 pb-8">
        {/* Meta */}
        <motion.div initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
          <div className="flex flex-wrap items-center gap-2 mb-6">
            <Badge className="bg-amber-500/15 text-amber-300 border-amber-500/25 gap-1.5 text-xs font-bold px-3 py-1">
              Trade Intelligence
            </Badge>
            <div className="flex items-center gap-1.5 text-white/30 text-xs">
              <Clock className="w-3 h-3" />
              <span>{post.readTime} min read</span>
            </div>
            {publishedDate && (
              <span className="text-white/25 text-xs">{publishedDate}</span>
            )}
            {post.route && (
              <Link href={`/${post.route}`}>
                <Badge className="bg-sky-500/10 text-sky-400/70 border-sky-500/20 text-xs cursor-pointer hover:bg-sky-500/20 transition-colors">
                  {post.route.replace(/-/g, " → ").replace(" → electronics → logistics", "").replace(" → electronics → cargo", "")}
                </Badge>
              </Link>
            )}
          </div>

          <h1 className="text-3xl md:text-4xl font-black text-white leading-tight mb-4">{post.title}</h1>
          <p className="text-base text-white/40 leading-relaxed mb-8 border-l-2 border-amber-500/30 pl-4">
            {post.metaDescription}
          </p>
        </motion.div>

        {/* Body */}
        <FadeUp>
          <ArticleBody md={post.body} />
        </FadeUp>

        {/* Keywords */}
        <FadeUp className="mt-10 pt-6 border-t border-white/6">
          <p className="text-[10px] font-black uppercase tracking-widest text-white/20 mb-3">Topics</p>
          <div className="flex flex-wrap gap-1.5">
            {post.keywords.split(",").map(kw => (
              <span key={kw} className="text-[10px] text-white/30 border border-white/8 rounded-full px-2.5 py-0.5">
                {kw.trim()}
              </span>
            ))}
          </div>
        </FadeUp>
      </article>

      {/* ── FAQs ─────────────────────────────────────────────────────────── */}
      {(post.faqs as any[]).length > 0 && (
        <section className="max-w-3xl mx-auto px-6 pb-10">
          <FadeUp>
            <p className="text-[10px] font-black uppercase tracking-widest text-white/25 mb-4">Frequently asked</p>
            <div className="border border-white/8 rounded-2xl bg-white/[0.015] px-5">
              {(post.faqs as Array<{ q: string; a: string }>).map(f => (
                <FaqItem key={f.q} {...f} />
              ))}
            </div>
          </FadeUp>
        </section>
      )}

      {/* ── CTA ──────────────────────────────────────────────────────────── */}
      <section className="max-w-3xl mx-auto px-6 pb-14">
        <FadeUp>
          <div className="border border-amber-500/20 bg-amber-500/4 rounded-2xl p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-5">
            <div>
              <p className="font-black text-white text-base mb-1">Act on this intelligence.</p>
              <p className="text-white/40 text-sm">Enquire via WhatsApp — lot specifications, escrow terms, delivery arrangements.</p>
            </div>
            <div className="flex gap-2.5 shrink-0">
              <a href={WA} target="_blank" rel="noopener noreferrer">
                <Button className="bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold gap-2" data-testid="button-intel-wa">
                  <SiWhatsapp className="w-4 h-4" /> WhatsApp
                </Button>
              </a>
              <a href={TG} target="_blank" rel="noopener noreferrer">
                <Button variant="outline" className="border-white/15 text-white/60 hover:bg-white/5 gap-2" data-testid="button-intel-tg">
                  <SiTelegram className="w-4 h-4 text-sky-400" />
                </Button>
              </a>
            </div>
          </div>
        </FadeUp>

        {/* Cross-links */}
        <FadeUp className="mt-4 grid sm:grid-cols-2 gap-3">
          <Link href="/chaintrack">
            <div className="border border-white/8 rounded-xl p-4 flex items-center justify-between gap-3 hover:border-white/20 transition-colors cursor-pointer group">
              <div>
                <p className="text-xs font-bold text-white/60 group-hover:text-white transition-colors">Source the inventory</p>
                <p className="text-[11px] text-white/25 mt-0.5">Live auctions on ChainTrack →</p>
              </div>
              <ArrowRight className="w-4 h-4 text-white/20 group-hover:text-white/50 transition-colors shrink-0" />
            </div>
          </Link>
          <Link href="/logistics">
            <div className="border border-white/8 rounded-xl p-4 flex items-center justify-between gap-3 hover:border-white/20 transition-colors cursor-pointer group">
              <div>
                <p className="text-xs font-bold text-white/60 group-hover:text-white transition-colors">Arrange delivery</p>
                <p className="text-[11px] text-white/25 mt-0.5">DAFZA intake · Escrow · Ship →</p>
              </div>
              <ArrowRight className="w-4 h-4 text-white/20 group-hover:text-white/50 transition-colors shrink-0" />
            </div>
          </Link>
        </FadeUp>

        {/* More articles */}
        <FadeUp className="mt-4">
          <Link href="/intel">
            <div className="border border-white/6 rounded-xl p-4 flex items-center justify-between gap-3 hover:border-white/15 transition-colors cursor-pointer group">
              <div className="flex items-center gap-2">
                <Globe className="w-4 h-4 text-white/20" />
                <p className="text-xs text-white/40 group-hover:text-white/60 transition-colors">Browse all trade intelligence articles</p>
              </div>
              <ArrowRight className="w-4 h-4 text-white/20 group-hover:text-white/50 transition-colors shrink-0" />
            </div>
          </Link>
        </FadeUp>
      </section>
    </div>
  );
}
