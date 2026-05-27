import { useRef } from "react";
import { Link } from "wouter";
import { useQuery } from "@tanstack/react-query";
import { motion, useInView } from "framer-motion";
import { Helmet } from "react-helmet";
import { Clock, ArrowRight, Truck, Globe } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import type { IntelPost } from "@shared/schema";

function FadeUp({ children, delay = 0, className = "" }: {
  children: React.ReactNode; delay?: number; className?: string;
}) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  return (
    <motion.div ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, ease: "easeOut", delay }}
      className={className}
    >{children}</motion.div>
  );
}

export default function IntelIndexPage() {
  const { data: posts = [], isLoading } = useQuery<IntelPost[]>({
    queryKey: ["/api/intel/posts"],
    queryFn: async () => {
      const r = await fetch("/api/intel/posts");
      return r.json();
    },
  });

  return (
    <div className="min-h-screen bg-[#070B14] text-white" style={{ fontFamily: "'Inter', 'DM Sans', sans-serif" }}>
      <Helmet>
        <title>Trade Intelligence — ChainTrack Dubai Electronics Logistics</title>
        <meta name="description" content="Real-time trade intelligence from ChainTrack's Dubai electronics logistics network. Corridor updates, pricing windows, escrow insights, and CIS market intelligence." />
        <meta name="keywords" content="dubai electronics trade intelligence, cis cargo corridor updates, refurbished iphone market intel, dafza logistics news, dubai recommerce insights" />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href="https://chaintrack.com/intel" />
      </Helmet>

      {/* Nav */}
      <nav className="border-b border-white/6 bg-[#070B14]/95 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-5xl mx-auto px-6 h-14 flex items-center justify-between gap-4">
          <Link href="/logistics">
            <div className="flex items-center gap-2 cursor-pointer">
              <div className="w-6 h-6 rounded-lg bg-amber-500/15 border border-amber-500/20 flex items-center justify-center">
                <Truck className="w-3 h-3 text-amber-400" />
              </div>
              <span className="text-[11px] font-black uppercase tracking-widest text-white/50">ChainTrack</span>
            </div>
          </Link>
          <div className="flex items-center gap-3 text-[10px] font-black uppercase tracking-widest">
            <Link href="/chaintrack">
              <span className="text-white/30 hover:text-white/60 transition-colors cursor-pointer">① Source</span>
            </Link>
            <span className="text-white/15">→</span>
            <Link href="/logistics">
              <span className="text-white/30 hover:text-white/60 transition-colors cursor-pointer">② Ship</span>
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="pt-16 pb-12 px-6">
        <div className="max-w-5xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <Badge className="bg-amber-500/15 text-amber-300 border-amber-500/25 gap-1.5 mb-5 text-xs font-bold px-3 py-1">
              <Globe className="w-3 h-3" /> Trade Intelligence
            </Badge>
            <h1 className="text-4xl md:text-5xl font-black text-white leading-tight mb-4">
              Dubai Electronics<br />
              <span className="text-amber-400">Trade Intel.</span>
            </h1>
            <p className="text-base text-white/45 max-w-xl leading-relaxed">
              Corridor updates, pricing windows, escrow insights, and CIS market intelligence — direct from ChainTrack's operational network.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Articles */}
      <section className="px-6 pb-16 border-t border-white/6">
        <div className="max-w-5xl mx-auto pt-10">

          {isLoading && (
            <div className="grid md:grid-cols-2 gap-4">
              {[1, 2, 3, 4].map(i => (
                <div key={i} className="border border-white/6 rounded-2xl p-6 animate-pulse bg-white/[0.02] h-40" />
              ))}
            </div>
          )}

          {!isLoading && posts.length === 0 && (
            <div className="text-center py-20">
              <p className="text-white/25 text-sm">No articles published yet.</p>
              <p className="text-white/15 text-xs mt-1">Check back soon for trade intelligence updates.</p>
            </div>
          )}

          <div className="grid md:grid-cols-2 gap-4">
            {posts.map((post, i) => (
              <FadeUp key={post.id} delay={i * 0.05}>
                <Link href={`/intel/${post.slug}`}>
                  <div
                    className="border border-white/8 rounded-2xl p-6 h-full flex flex-col gap-4 bg-white/[0.02] hover:bg-white/[0.04] hover:border-white/20 transition-all cursor-pointer group"
                    data-testid={`intel-article-${post.id}`}
                  >
                    <div className="flex items-start justify-between gap-3">
                      <Badge className="bg-amber-500/10 text-amber-400/80 border-amber-500/15 text-[10px] font-bold px-2.5 py-0.5 shrink-0">
                        Trade Intel
                      </Badge>
                      <div className="flex items-center gap-1 text-white/25 text-[11px]">
                        <Clock className="w-3 h-3" />
                        {post.readTime} min
                      </div>
                    </div>

                    <div className="flex-1">
                      <h2 className="font-black text-white text-base leading-snug mb-2 group-hover:text-amber-100 transition-colors">
                        {post.title}
                      </h2>
                      <p className="text-sm text-white/40 leading-relaxed line-clamp-3">
                        {post.metaDescription}
                      </p>
                    </div>

                    <div className="flex items-center justify-between pt-3 border-t border-white/6">
                      {post.publishedAt && (
                        <span className="text-[10px] text-white/25">
                          {new Date(post.publishedAt).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" })}
                        </span>
                      )}
                      <span className="ml-auto flex items-center gap-1 text-[11px] font-bold text-amber-400/60 group-hover:text-amber-400 transition-colors">
                        Read <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
                      </span>
                    </div>
                  </div>
                </Link>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      {/* Footer cross-links */}
      <section className="border-t border-white/6 px-6 py-10">
        <div className="max-w-5xl mx-auto grid sm:grid-cols-2 gap-4">
          <Link href="/chaintrack">
            <div className="border border-white/8 rounded-xl p-4 flex items-center justify-between gap-3 hover:border-white/20 transition-colors cursor-pointer group">
              <div>
                <p className="text-xs font-bold text-white/60 group-hover:text-white transition-colors">Source inventory</p>
                <p className="text-[11px] text-white/25 mt-0.5">Live lots on ChainTrack marketplace →</p>
              </div>
              <ArrowRight className="w-4 h-4 text-white/20 group-hover:text-white/50 transition-colors shrink-0" />
            </div>
          </Link>
          <Link href="/logistics">
            <div className="border border-white/8 rounded-xl p-4 flex items-center justify-between gap-3 hover:border-white/20 transition-colors cursor-pointer group">
              <div>
                <p className="text-xs font-bold text-white/60 group-hover:text-white transition-colors">Arrange delivery</p>
                <p className="text-[11px] text-white/25 mt-0.5">DAFZA intake · Escrow · Global freight →</p>
              </div>
              <ArrowRight className="w-4 h-4 text-white/20 group-hover:text-white/50 transition-colors shrink-0" />
            </div>
          </Link>
        </div>
      </section>
    </div>
  );
}
