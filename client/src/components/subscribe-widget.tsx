import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { Bell, Mail, CheckCircle, Loader2, Shield } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";

interface SubscribeWidgetProps {
  variant?: "banner" | "card" | "inline";
  source?: string;
  className?: string;
}

export default function SubscribeWidget({
  variant = "card",
  source = "emergency_prep",
  className = "",
}: SubscribeWidgetProps) {
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [subscribed, setSubscribed] = useState(false);
  const { toast } = useToast();

  const mutation = useMutation({
    mutationFn: async () =>
      apiRequest("POST", "/api/subscribe", { email, firstName, source }),
    onSuccess: (data: any) => {
      setSubscribed(true);
      toast({
        title: data.alreadySubscribed ? "Already subscribed!" : "You're in!",
        description: data.message || "Daily Dubai tips will hit your inbox every morning.",
      });
    },
    onError: (err: any) => {
      toast({ title: "Subscription failed", description: err.message, variant: "destructive" });
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.includes("@")) return;
    mutation.mutate();
  };

  if (subscribed) {
    return (
      <div className={`flex items-center gap-3 text-emerald-400 ${className}`}>
        <CheckCircle className="w-5 h-5 shrink-0" />
        <span className="text-sm font-semibold">Subscribed! Tips arrive every morning at 8am UAE.</span>
      </div>
    );
  }

  if (variant === "inline") {
    return (
      <form onSubmit={handleSubmit} className={`flex flex-col sm:flex-row gap-2 ${className}`}>
        <Input
          type="text"
          placeholder="First name (optional)"
          value={firstName}
          onChange={e => setFirstName(e.target.value)}
          className="bg-slate-800 border-slate-700 text-white placeholder:text-slate-500 h-10 sm:w-40"
          data-testid="input-subscribe-firstname"
        />
        <Input
          type="email"
          placeholder="your@email.com"
          value={email}
          onChange={e => setEmail(e.target.value)}
          required
          className="bg-slate-800 border-slate-700 text-white placeholder:text-slate-500 h-10 flex-1"
          data-testid="input-subscribe-email"
        />
        <Button
          type="submit"
          disabled={mutation.isPending || !email}
          className="bg-emerald-500 hover:bg-emerald-400 text-slate-900 font-bold h-10 px-6 shrink-0"
          data-testid="button-subscribe-submit"
        >
          {mutation.isPending ? <Loader2 className="w-4 h-4 animate-spin" /> : "Subscribe Free"}
        </Button>
      </form>
    );
  }

  if (variant === "banner") {
    return (
      <div className={`bg-slate-800/60 border border-slate-700 rounded-xl p-4 ${className}`}>
        <div className="flex items-start gap-3 mb-3">
          <Bell className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
          <div>
            <p className="text-white font-bold text-sm">Daily Dubai Tips & Emergency Alerts</p>
            <p className="text-slate-400 text-xs">Free. One email per day. Unsubscribe anytime.</p>
          </div>
        </div>
        <form onSubmit={handleSubmit} className="flex gap-2">
          <Input
            type="email"
            placeholder="your@email.com"
            value={email}
            onChange={e => setEmail(e.target.value)}
            required
            className="bg-slate-900 border-slate-600 text-white placeholder:text-slate-500 h-9 text-sm"
            data-testid="input-subscribe-banner-email"
          />
          <Button
            type="submit"
            disabled={mutation.isPending || !email}
            size="sm"
            className="bg-emerald-500 hover:bg-emerald-400 text-slate-900 font-bold shrink-0"
            data-testid="button-subscribe-banner"
          >
            {mutation.isPending ? <Loader2 className="w-3 h-3 animate-spin" /> : "Subscribe"}
          </Button>
        </form>
      </div>
    );
  }

  // card variant (default)
  return (
    <div className={`bg-gradient-to-br from-slate-800 to-slate-900 border border-slate-700 rounded-2xl p-6 ${className}`}>
      <div className="flex items-center gap-3 mb-4">
        <div className="w-10 h-10 bg-emerald-500/15 rounded-xl flex items-center justify-center">
          <Mail className="w-5 h-5 text-emerald-400" />
        </div>
        <div>
          <h3 className="text-white font-bold text-base">Daily Dubai Tips</h3>
          <p className="text-slate-500 text-xs">+ Emergency Alerts when it matters</p>
        </div>
      </div>

      <p className="text-slate-400 text-sm mb-5 leading-relaxed">
        Get one practical tip every morning at 8am UAE time — Dubai laws, expat banking, emergency prep, and more. Free forever.
      </p>

      <div className="grid grid-cols-2 gap-2 mb-5">
        {["Dubai laws & rent rules", "Emergency preparedness", "Expat banking tips", "Crisis alerts (FREE)"].map(item => (
          <div key={item} className="flex items-center gap-2">
            <CheckCircle className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
            <span className="text-slate-400 text-xs">{item}</span>
          </div>
        ))}
      </div>

      <form onSubmit={handleSubmit} className="space-y-2">
        <div className="flex gap-2">
          <Input
            type="text"
            placeholder="First name"
            value={firstName}
            onChange={e => setFirstName(e.target.value)}
            className="bg-slate-950 border-slate-700 text-white placeholder:text-slate-600 h-10 w-28"
            data-testid="input-subscribe-card-firstname"
          />
          <Input
            type="email"
            placeholder="your@email.com"
            value={email}
            onChange={e => setEmail(e.target.value)}
            required
            className="bg-slate-950 border-slate-700 text-white placeholder:text-slate-600 h-10 flex-1"
            data-testid="input-subscribe-card-email"
          />
        </div>
        <Button
          type="submit"
          disabled={mutation.isPending || !email}
          className="w-full bg-emerald-500 hover:bg-emerald-400 text-slate-900 font-bold h-10"
          data-testid="button-subscribe-card"
        >
          {mutation.isPending ? (
            <><Loader2 className="w-4 h-4 mr-2 animate-spin" />Subscribing...</>
          ) : (
            <><Bell className="w-4 h-4 mr-2" />Get Free Daily Tips</>
          )}
        </Button>
        <div className="flex items-center gap-2 text-slate-600 text-xs justify-center pt-1">
          <Shield className="w-3 h-3" />
          <span>No spam. Unsubscribe anytime. We respect your inbox.</span>
        </div>
      </form>
    </div>
  );
}
