import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Zap, Eye, EyeOff, Trash2, ExternalLink,
  Globe, Clock, ArrowRight, CheckCircle2, AlertCircle,
} from "lucide-react";
import type { IntelPost } from "@shared/schema";

// The outer PrivateGate on /marketing/* already requires this token
const ADMIN_SECRET = "deliwer-admin-2026";

const ROUTE_OPTIONS = [
  { value: "", label: "No specific route" },
  { value: "dubai-to-baku-electronics-logistics", label: "Dubai → Baku" },
  { value: "dubai-to-almaty-electronics-cargo", label: "Dubai → Almaty" },
  { value: "dubai-to-tashkent-electronics-logistics", label: "Dubai → Tashkent" },
  { value: "dubai-to-moscow-electronics-logistics", label: "Dubai → Moscow" },
  { value: "dubai-to-gawadar-logistics", label: "Dubai → Gawadar" },
  { value: "dubai-cis-electronics-logistics", label: "Dubai → CIS (general)" },
  { value: "dubai-charter-cargo-cis", label: "Dubai Air Charter CIS" },
  { value: "refurbished-iphone-sourcing-dubai", label: "Refurbished iPhone Sourcing" },
];

// ─── Simple markdown renderer ─────────────────────────────────────────────────
function renderBody(md: string) {
  return md.split("\n\n").map((para, i) => {
    if (para.startsWith("## ")) {
      return (
        <h2 key={i} className="text-base font-black text-white mt-6 mb-2">
          {para.slice(3)}
        </h2>
      );
    }
    if (!para.trim()) return null;
    return (
      <p key={i} className="text-sm text-white/55 leading-relaxed">
        {para.replace(/\*\*(.*?)\*\*/g, "$1")}
      </p>
    );
  });
}

// ─── Main admin page ──────────────────────────────────────────────────────────
export default function MarketingIntelPage() {
  const [brief, setBrief] = useState("");
  const [selectedRoute, setSelectedRoute] = useState("");
  const [preview, setPreview] = useState<any>(null);
  const [generating, setGenerating] = useState(false);
  const [genError, setGenError] = useState("");
  const [saveMsg, setSaveMsg] = useState("");

  const qc = useQueryClient();
  const headers = { "Content-Type": "application/json", "x-admin-secret": ADMIN_SECRET };

  const { data: posts = [], isLoading } = useQuery<IntelPost[]>({
    queryKey: ["/api/intel/posts", "admin"],
    queryFn: async () => {
      const r = await fetch("/api/intel/posts", { headers });
      return r.json();
    },
  });

  const publishMutation = useMutation({
    mutationFn: async (id: string) => {
      const r = await fetch(`/api/intel/posts/${id}/publish`, { method: "PATCH", headers });
      return r.json();
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["/api/intel/posts", "admin"] }),
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      await fetch(`/api/intel/posts/${id}`, { method: "DELETE", headers });
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["/api/intel/posts", "admin"] }),
  });

  const saveMutation = useMutation({
    mutationFn: async (data: any) => {
      const r = await fetch("/api/intel/posts", {
        method: "POST",
        headers,
        body: JSON.stringify(data),
      });
      if (!r.ok) throw new Error((await r.json()).error || "Save failed");
      return r.json();
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["/api/intel/posts", "admin"] });
      setSaveMsg("Saved.");
      setTimeout(() => setSaveMsg(""), 3000);
      setPreview(null);
      setBrief("");
    },
  });

  async function generate() {
    if (!brief.trim()) return;
    setGenerating(true);
    setGenError("");
    setPreview(null);
    try {
      const r = await fetch("/api/intel/generate", {
        method: "POST",
        headers,
        body: JSON.stringify({ brief, route: selectedRoute }),
      });
      const data = await r.json();
      if (!r.ok) throw new Error(data.error || "Generation failed");
      setPreview(data);
    } catch (e: any) {
      setGenError(e.message);
    } finally {
      setGenerating(false);
    }
  }

  function save(publish: boolean) {
    if (!preview) return;
    saveMutation.mutate({
      ...preview,
      brief,
      route: selectedRoute || null,
      status: publish ? "published" : "draft",
      publishedAt: publish ? new Date().toISOString() : null,
    });
  }

  const published = posts.filter(p => p.status === "published");
  const drafts = posts.filter(p => p.status === "draft");

  return (
    <div className="min-h-screen bg-[#080c14] text-white" style={{ fontFamily: "'Inter', 'DM Sans', sans-serif" }}>
      {/* Nav */}
      <div className="border-b border-white/8 bg-[#080c14]/95 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-6 h-12 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <Link href="/marketing">
              <span className="text-white/30 hover:text-white/60 text-[10px] font-black uppercase tracking-widest transition-colors cursor-pointer">← Marketing</span>
            </Link>
            <span className="text-white/10">/</span>
            <span className="text-amber-400 text-[10px] font-black uppercase tracking-widest">Trade Intel</span>
          </div>
          <div className="flex items-center gap-3">
            <Link href="/intel">
              <span className="text-[10px] text-white/25 hover:text-white/50 transition-colors font-mono cursor-pointer">/intel →</span>
            </Link>
            <span className="text-[10px] text-white/20 font-mono">{posts.length} article{posts.length !== 1 ? "s" : ""}</span>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8 grid lg:grid-cols-[1fr_380px] gap-8">

        {/* ── Left: Generator + Preview ── */}
        <div className="space-y-5">
          <div>
            <h1 className="text-xl font-black text-white mb-1">Trade Intel Generator</h1>
            <p className="text-white/30 text-sm">Paste an operator brief → AI generates SEO article → save or publish.</p>
          </div>

          {/* Brief input */}
          <div className="border border-white/8 rounded-2xl p-6 bg-white/[0.02]">
            <p className="text-[10px] font-black uppercase tracking-widest text-white/25 mb-3">Operator Brief</p>
            <textarea
              value={brief}
              onChange={e => setBrief(e.target.value)}
              placeholder={`Paste a shipment update, pricing observation, or trade insight.\n\nExample: "500 iPhone 14 Pro Max Grade B landed DAFZA from Dubai, heading Almaty. Buyer confirmed, escrow released. Margin ~44% vs Almaty retail."`}
              rows={5}
              className="w-full bg-transparent text-white/80 text-sm leading-relaxed placeholder:text-white/20 outline-none resize-none"
              data-testid="textarea-intel-brief"
            />
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 mt-4 pt-4 border-t border-white/6">
              <select
                value={selectedRoute}
                onChange={e => setSelectedRoute(e.target.value)}
                className="bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-white/70 text-xs outline-none flex-1 min-w-0"
                data-testid="select-intel-route"
              >
                {ROUTE_OPTIONS.map(o => (
                  <option key={o.value} value={o.value} className="bg-[#0d1424]">{o.label}</option>
                ))}
              </select>
              <Button
                onClick={generate}
                disabled={!brief.trim() || generating}
                className="bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold gap-2 shrink-0"
                data-testid="button-generate-intel"
              >
                <Zap className="w-4 h-4" />
                {generating ? "Generating…" : "Generate with AI"}
              </Button>
            </div>
            {genError && (
              <p className="text-red-400 text-xs mt-3 flex items-center gap-1.5">
                <AlertCircle className="w-3.5 h-3.5 shrink-0" /> {genError}
              </p>
            )}
          </div>

          {/* Preview */}
          {generating && (
            <div className="border border-white/6 rounded-2xl p-8 flex items-center justify-center gap-3">
              <div className="w-5 h-5 border-2 border-amber-500/30 border-t-amber-500 rounded-full animate-spin" />
              <span className="text-white/35 text-sm">Generating article…</span>
            </div>
          )}

          {preview && !generating && (
            <div className="border border-amber-500/20 rounded-2xl bg-amber-500/[0.02] overflow-hidden">
              {/* Preview header */}
              <div className="px-6 py-4 border-b border-amber-500/15 flex items-center justify-between gap-3">
                <div>
                  <p className="text-[10px] font-black uppercase tracking-widest text-amber-400/60 mb-0.5">Generated Preview</p>
                  <p className="text-xs text-white/30 font-mono">/intel/{preview.slug}</p>
                </div>
                <div className="flex items-center gap-1.5 text-white/25">
                  <Clock className="w-3 h-3" />
                  <span className="text-[11px]">{preview.readTime} min read</span>
                </div>
              </div>

              <div className="px-6 py-5">
                {/* Title */}
                <h1 className="text-xl font-black text-white mb-3 leading-tight">{preview.title}</h1>

                {/* Meta description */}
                <p className="text-xs text-amber-300/60 bg-amber-500/8 border border-amber-500/15 rounded-xl px-3 py-2 mb-4 leading-relaxed">
                  {preview.metaDescription}
                </p>

                {/* Keywords */}
                <div className="flex flex-wrap gap-1.5 mb-5">
                  {preview.keywords?.split(",").slice(0, 7).map((kw: string) => (
                    <span key={kw} className="text-[10px] text-white/30 border border-white/8 rounded-full px-2.5 py-0.5">{kw.trim()}</span>
                  ))}
                </div>

                {/* Body */}
                <div className="space-y-2 mb-5 max-h-64 overflow-y-auto pr-2">
                  {renderBody(preview.body || "")}
                </div>

                {/* FAQs */}
                {preview.faqs?.length > 0 && (
                  <div className="border-t border-white/6 pt-4">
                    <p className="text-[10px] font-black uppercase tracking-widest text-white/20 mb-3">FAQs ({preview.faqs.length})</p>
                    <div className="space-y-2.5">
                      {preview.faqs.map((f: any, i: number) => (
                        <div key={i} className="text-xs">
                          <p className="text-white/65 font-bold mb-0.5">Q: {f.q}</p>
                          <p className="text-white/35 leading-relaxed">A: {f.a}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Save actions */}
              <div className="px-6 py-4 border-t border-amber-500/15 flex items-center gap-3 flex-wrap">
                <Button
                  onClick={() => save(false)}
                  disabled={saveMutation.isPending}
                  variant="outline"
                  className="border-white/15 text-white/70 hover:bg-white/5 font-bold"
                  data-testid="button-save-draft"
                >
                  Save as Draft
                </Button>
                <Button
                  onClick={() => save(true)}
                  disabled={saveMutation.isPending}
                  className="bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold gap-2"
                  data-testid="button-save-publish"
                >
                  <Globe className="w-4 h-4" /> Save & Publish
                </Button>
                <Button
                  onClick={() => setPreview(null)}
                  variant="ghost"
                  className="text-white/30 hover:text-white/60 text-sm ml-auto"
                >
                  Discard
                </Button>
                {saveMsg && (
                  <span className="text-emerald-400 text-xs flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5" /> {saveMsg}
                  </span>
                )}
                {saveMutation.isError && (
                  <span className="text-red-400 text-xs flex items-center gap-1">
                    <AlertCircle className="w-3.5 h-3.5" /> Save failed
                  </span>
                )}
              </div>
            </div>
          )}
        </div>

        {/* ── Right: Posts list ── */}
        <div className="space-y-5">

          {/* Published */}
          <div>
            <p className="text-[10px] font-black uppercase tracking-widest text-white/25 mb-3">
              Published ({published.length})
            </p>
            {isLoading && (
              <div className="space-y-2">
                {[1, 2].map(i => (
                  <div key={i} className="border border-white/6 rounded-xl p-4 animate-pulse bg-white/[0.02] h-24" />
                ))}
              </div>
            )}
            {!isLoading && published.length === 0 && (
              <div className="border border-white/6 rounded-xl p-5 text-center">
                <p className="text-white/20 text-xs">No published articles yet.</p>
              </div>
            )}
            <div className="space-y-2">
              {published.map(post => (
                <PostCard key={post.id} post={post}
                  onPublish={() => publishMutation.mutate(post.id)}
                  onDelete={() => { if (confirm("Delete?")) deleteMutation.mutate(post.id); }}
                  pending={publishMutation.isPending || deleteMutation.isPending}
                />
              ))}
            </div>
          </div>

          {/* Drafts */}
          {drafts.length > 0 && (
            <div>
              <p className="text-[10px] font-black uppercase tracking-widest text-white/25 mb-3">
                Drafts ({drafts.length})
              </p>
              <div className="space-y-2">
                {drafts.map(post => (
                  <PostCard key={post.id} post={post}
                    onPublish={() => publishMutation.mutate(post.id)}
                    onDelete={() => { if (confirm("Delete?")) deleteMutation.mutate(post.id); }}
                    pending={publishMutation.isPending || deleteMutation.isPending}
                  />
                ))}
              </div>
            </div>
          )}

          {/* Public link */}
          <div className="border border-white/6 rounded-xl p-4">
            <p className="text-[10px] font-black uppercase tracking-widest text-white/20 mb-2">Public index</p>
            <Link href="/intel">
              <div className="flex items-center justify-between text-xs text-white/35 hover:text-white/60 transition-colors cursor-pointer group">
                <span className="font-mono">/intel</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
              </div>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Post card ────────────────────────────────────────────────────────────────
function PostCard({ post, onPublish, onDelete, pending }: {
  post: IntelPost;
  onPublish: () => void;
  onDelete: () => void;
  pending: boolean;
}) {
  const published = post.status === "published";
  return (
    <div
      className={`border rounded-xl p-4 ${published ? "border-emerald-500/20 bg-emerald-500/[0.02]" : "border-white/6 bg-white/[0.015]"}`}
      data-testid={`intel-post-${post.id}`}
    >
      <div className="flex items-start gap-2 mb-1">
        <p className="text-sm font-bold text-white/75 leading-snug flex-1 min-w-0 line-clamp-2">{post.title}</p>
        <Badge className={
          published
            ? "bg-emerald-500/15 text-emerald-300 border-emerald-500/20 text-[9px] shrink-0"
            : "bg-white/5 text-white/30 border-white/8 text-[9px] shrink-0"
        }>
          {post.status}
        </Badge>
      </div>
      <p className="text-[10px] text-white/25 font-mono mb-3">/intel/{post.slug}</p>
      <div className="flex items-center gap-1.5">
        <button
          onClick={onPublish}
          disabled={pending}
          className={`text-[10px] font-black uppercase tracking-widest flex items-center gap-1 px-2.5 py-1.5 rounded-lg transition-colors ${
            published ? "text-amber-400 hover:bg-amber-500/10" : "text-emerald-400 hover:bg-emerald-500/10"
          }`}
          data-testid={`button-toggle-${post.id}`}
        >
          {published ? <><EyeOff className="w-3 h-3" />Unpublish</> : <><Eye className="w-3 h-3" />Publish</>}
        </button>
        {published && (
          <Link href={`/intel/${post.slug}`} target="_blank">
            <button className="text-[10px] font-black uppercase tracking-widest flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-sky-400 hover:bg-sky-500/10 transition-colors">
              <ExternalLink className="w-3 h-3" />View
            </button>
          </Link>
        )}
        <button
          onClick={onDelete}
          disabled={pending}
          className="ml-auto text-[10px] flex items-center px-2.5 py-1.5 rounded-lg text-red-400/50 hover:text-red-400 hover:bg-red-500/10 transition-colors"
          data-testid={`button-delete-${post.id}`}
        >
          <Trash2 className="w-3 h-3" />
        </button>
      </div>
    </div>
  );
}
