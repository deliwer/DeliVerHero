import { useEffect } from "react";
import { SEOMeta } from "@/components/seo-meta";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CheckCircle2, MessageCircle, ArrowRight, Zap } from "lucide-react";
import { Link } from "wouter";
import { buildWhatsAppMessage, openWhatsApp } from "@/lib/referral";

export default function BrokerSuccessPage() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  function handleWhatsApp() {
    openWhatsApp(buildWhatsAppMessage({
      intro: "Hi DeliWer, I just joined the broker partner program and I'm ready to start referring clients.",
    }));
  }

  return (
    <div className="min-h-screen bg-slate-950 text-white flex flex-col items-center justify-center px-4 py-24">
      <SEOMeta
        title="You're In | Broker Partner Program | DeliWer Dubai"
        description="Welcome to the DeliWer Broker Partner Program. Start sharing your referral link and earn per move-in."
      />

      <div className="max-w-md w-full text-center space-y-8">
        {/* Success icon */}
        <div className="flex justify-center">
          <div className="w-20 h-20 rounded-full bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center">
            <CheckCircle2 className="w-10 h-10 text-emerald-400" />
          </div>
        </div>

        <Badge className="bg-emerald-500/10 text-emerald-400 border-emerald-500/20 px-4 py-2 text-xs font-black uppercase tracking-widest rounded-full">
          You're In
        </Badge>

        <div className="space-y-3">
          <h1 className="text-4xl font-black uppercase tracking-tighter text-white">
            You're a <span className="text-emerald-400">DeliWer Partner</span>
          </h1>
          <p className="text-gray-400 text-base leading-relaxed">
            Your referral link is active. Every tenant you send to DeliWer earns you commission after their move-in is completed.
          </p>
        </div>

        {/* Next steps */}
        <div className="bg-slate-900 border border-white/5 rounded-2xl p-6 text-left space-y-4">
          <p className="text-[10px] font-black uppercase tracking-widest text-purple-400">Next Steps</p>
          {[
            "Share your link after every property viewing",
            "Send it after lease signing via WhatsApp",
            "DeliWer contacts your client and handles everything",
            "We notify you when they complete move-in",
          ].map((step, i) => (
            <div key={i} className="flex items-start gap-3">
              <div className="w-5 h-5 rounded-full bg-purple-500/20 border border-purple-500/30 flex items-center justify-center shrink-0 mt-0.5">
                <ArrowRight className="w-3 h-3 text-purple-400" />
              </div>
              <p className="text-gray-300 text-sm leading-relaxed">{step}</p>
            </div>
          ))}
        </div>

        {/* CTAs */}
        <div className="flex flex-col gap-3">
          <Button
            data-testid="button-success-whatsapp"
            size="lg"
            className="w-full bg-green-600 hover:bg-green-500 text-white font-black rounded-2xl h-13 text-base"
            onClick={handleWhatsApp}
          >
            <MessageCircle className="w-5 h-5 mr-2" />
            Confirm on WhatsApp
          </Button>
          <Link href="/broker-partner">
            <Button
              data-testid="button-success-back"
              size="lg"
              variant="outline"
              className="w-full border-white/10 text-white hover:bg-white/5 font-black rounded-2xl h-12 text-sm"
            >
              <Zap className="w-4 h-4 mr-2" />
              Get My Referral Link
            </Button>
          </Link>
        </div>

        <p className="text-gray-600 text-xs">
          Questions? WhatsApp us at{" "}
          <a
            data-testid="link-success-wa-number"
            href="https://wa.me/971523906019"
            target="_blank"
            rel="noopener noreferrer"
            className="text-purple-400 underline underline-offset-2"
          >
            +971 52 390 6019
          </a>
        </p>
      </div>
    </div>
  );
}
