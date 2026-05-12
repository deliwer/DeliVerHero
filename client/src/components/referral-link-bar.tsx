import { useState } from "react";
import { Copy, Check, MessageCircle, Link2, Zap, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { logEvent } from "@/lib/referral";

interface ReferralLinkBarProps {
  defaultName?: string;
  compact?: boolean;
  label?: string;
}

function getSavedLink(): { link: string; name: string } {
  try {
    const link = localStorage.getItem("broker_ref_link") || "";
    const name = localStorage.getItem("broker_ref_name") || "";
    return { link, name };
  } catch {
    return { link: "", name: "" };
  }
}

export function ReferralLinkBar({ defaultName = "", compact = false, label }: ReferralLinkBarProps) {
  const { toast } = useToast();
  const saved = getSavedLink();
  const [name, setName] = useState(defaultName || saved.name);
  const [refLink, setRefLink] = useState(saved.link);
  const [copied, setCopied] = useState(false);

  function generateLink() {
    if (!name.trim()) {
      toast({ title: "Enter your name first", variant: "destructive" });
      return;
    }
    const slug = name
      .trim()
      .toLowerCase()
      .replace(/\s+/g, "-")
      .replace(/[^a-z0-9-]/g, "")
      .slice(0, 20);
    const code = `${slug}-${Math.random().toString(36).slice(2, 6)}`;
    const link = `${window.location.origin}/move-in?ref=${code}`;
    setRefLink(link);
    try {
      localStorage.setItem("broker_ref_link", link);
      localStorage.setItem("broker_ref_name", name.trim());
    } catch {}
    logEvent({
      ref: code,
      page: window.location.pathname,
      timestamp: new Date().toISOString(),
      action: "link_generated",
    });
    toast({ title: "Referral link generated!", description: "Copy and share with your clients." });
  }

  async function copyLink() {
    if (!refLink) return;
    await navigator.clipboard.writeText(refLink);
    setCopied(true);
    toast({ title: "Referral link copied!", description: "Paste it into WhatsApp or your listings." });
    setTimeout(() => setCopied(false), 2500);
  }

  function shareOnWA() {
    const text = `Hi! Here's my DeliWer referral link for Ejari, DEWA & move-in services in Dubai:\n${refLink}\n\nShare it with anyone moving to Dubai and we both benefit!`;
    window.open(`https://wa.me/?text=${encodeURIComponent(text)}`, "_blank");
  }

  function resetLink() {
    setRefLink("");
    setName("");
    try {
      localStorage.removeItem("broker_ref_link");
      localStorage.removeItem("broker_ref_name");
    } catch {}
  }

  return (
    <div
      className={`rounded-2xl border-2 border-emerald-500/40 bg-gradient-to-br from-emerald-950/70 via-slate-900 to-emerald-950/40 shadow-[0_0_40px_-12px_rgba(16,185,129,0.3)] overflow-hidden ${compact ? "p-4" : "p-5 md:p-6"}`}
    >
      <div className="flex items-center gap-3 mb-4">
        <div className="w-10 h-10 rounded-xl bg-emerald-500/25 border border-emerald-500/40 flex items-center justify-center shrink-0">
          <Link2 className="w-5 h-5 text-emerald-400" />
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-[10px] font-black uppercase tracking-widest text-emerald-400 leading-none mb-0.5">
            {label || "Your Broker Referral Link"}
          </p>
          <p className="text-white font-black text-sm leading-tight truncate">
            {refLink ? "Ready to copy & share" : "Generate your unique link — earn on every referral"}
          </p>
        </div>
        <span className="shrink-0 inline-flex items-center gap-1 bg-emerald-500/15 border border-emerald-500/25 rounded-full px-2.5 py-1 text-[9px] font-black uppercase tracking-widest text-emerald-400">
          <Zap className="w-2.5 h-2.5" /> Free
        </span>
      </div>

      {!refLink ? (
        <div className="flex flex-col sm:flex-row gap-2">
          <Input
            placeholder="Your name (e.g. Ahmed Al Rashid)"
            value={name}
            onChange={(e) => setName(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && generateLink()}
            className="flex-1 bg-slate-900/80 border-emerald-500/20 focus:border-emerald-500/50 text-white placeholder:text-gray-600 h-11 rounded-xl font-semibold text-sm"
            data-testid="refbar-name-input"
          />
          <Button
            onClick={generateLink}
            className="bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black uppercase tracking-widest text-xs h-11 px-5 rounded-xl whitespace-nowrap shrink-0 shadow-[0_0_20px_-4px_rgba(16,185,129,0.5)] hover:shadow-[0_0_30px_-4px_rgba(16,185,129,0.7)] transition-all"
            data-testid="refbar-generate"
          >
            <Zap className="w-3.5 h-3.5 mr-1.5" /> Generate My Link
          </Button>
        </div>
      ) : (
        <div className="space-y-3">
          <div className="flex items-center gap-2 bg-slate-950/80 border border-emerald-500/25 rounded-xl px-3 py-2.5">
            <Link2 className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
            <code className="flex-1 text-emerald-300 text-xs font-mono truncate">{refLink}</code>
          </div>

          <div className="grid grid-cols-2 gap-2">
            <button
              onClick={copyLink}
              className={`flex items-center justify-center gap-2 rounded-xl py-3 font-black uppercase tracking-wide text-xs transition-all active:scale-95 ${
                copied
                  ? "bg-emerald-500 text-slate-950 shadow-[0_0_20px_-4px_rgba(16,185,129,0.6)]"
                  : "bg-emerald-500/20 border-2 border-emerald-500/40 text-emerald-300 hover:bg-emerald-500/30 hover:border-emerald-500/60"
              }`}
              data-testid="refbar-copy-big"
            >
              {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
              <span>{copied ? "Copied!" : "Copy My Link"}</span>
            </button>
            <button
              onClick={shareOnWA}
              className="flex items-center justify-center gap-2 bg-[#25D366]/15 border-2 border-[#25D366]/35 text-[#25D366] rounded-xl py-3 font-black uppercase tracking-wide text-xs hover:bg-[#25D366]/25 hover:border-[#25D366]/55 transition-all active:scale-95"
              data-testid="refbar-wa-share"
            >
              <MessageCircle className="w-4 h-4" />
              <span>Share on WhatsApp</span>
            </button>
          </div>

          <div className="flex items-center justify-between pt-0.5">
            <p className="text-[10px] text-gray-600 font-semibold">
              30-day attribution · Earn AED 150–800 per client booked
            </p>
            <button
              onClick={resetLink}
              className="flex items-center gap-1 text-[10px] text-gray-700 hover:text-gray-400 uppercase tracking-wider font-bold transition-colors"
              data-testid="refbar-reset"
            >
              <RefreshCw className="w-2.5 h-2.5" /> Reset
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
