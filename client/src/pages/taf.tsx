import { Helmet } from "react-helmet";
import { Link } from "wouter";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import {
  Sparkles,
  Leaf,
  Utensils,
  Heart,
  Share2,
  MessageCircle,
  Copy,
  CheckCircle2,
  Coffee,
  Salad,
  Soup,
  ArrowRight,
} from "lucide-react";

const WA_NUMBER = "971523946311";

const RESTAURANT_PARTNERS = [
  {
    name: "Chill & Grill",
    location: "Business Bay",
    perk: "Healthy set lunch · AED 89 value",
    accent: "from-emerald-500 to-teal-600",
    icon: Salad,
  },
  {
    name: "AquaCafe",
    location: "Clover Bay Tower",
    perk: "Kangen water tasting + light bite",
    accent: "from-cyan-500 to-blue-600",
    icon: Coffee,
  },
  {
    name: "Green Bowl Co.",
    location: "JLT Cluster R",
    perk: "Plant-forward bowl on us",
    accent: "from-lime-500 to-emerald-600",
    icon: Soup,
  },
];

const STEPS = [
  {
    n: 1,
    title: "Grab your friend link",
    desc: "Tap WhatsApp or copy your personal share link. No sign-up forms, no network marketing.",
    icon: Share2,
  },
  {
    n: 2,
    title: "Send it to one friend who cares",
    desc: "They get a free Planet Hero starter — Kangen water bottle, restaurant voucher and the wellness passport.",
    icon: Heart,
  },
  {
    n: 3,
    title: "Lunch is on us",
    desc: "Once your friend completes their first sustainable swap, you both get a free lunch at any restaurant partner.",
    icon: Utensils,
  },
];

const buildWA = (msg: string) => `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(msg)}`;

export default function TellAFriend() {
  const { toast } = useToast();
  const [copied, setCopied] = useState(false);

  const shareUrl =
    typeof window !== "undefined"
      ? `${window.location.origin}/taf?ref=friend`
      : "https://deliwer.com/taf?ref=friend";

  const friendMsg =
    "Hey 👋 — saying no to single-use plastic in Dubai is way easier than you think. " +
    "I joined DeliWer's Planet Hero programme and we both get a free lunch at a partner restaurant when you start. " +
    `Take a look: ${shareUrl}`;

  const waHref = buildWA(friendMsg);

  const copyLink = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl);
      setCopied(true);
      toast({
        title: "Link copied",
        description: "Send it to a friend on WhatsApp, iMessage or anywhere else.",
      });
      setTimeout(() => setCopied(false), 2200);
    } catch {
      toast({
        title: "Couldn't copy",
        description: "Long-press the link to copy it manually.",
        variant: "destructive",
      });
    }
  };

  const nativeShare = async () => {
    if (typeof navigator !== "undefined" && (navigator as any).share) {
      try {
        await (navigator as any).share({
          title: "Say No to Plastic — Lunch is on us",
          text: friendMsg,
          url: shareUrl,
        });
      } catch {
        /* user cancelled */
      }
    } else {
      copyLink();
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <Helmet>
        <title>Tell a Friend · Say No to Plastic — Lunch is on us · DeliWer</title>
        <meta
          name="description"
          content="Share the Planet Hero programme with one friend. They get a sustainable starter kit, you both get a free lunch at a Dubai restaurant partner. No network marketing — just kindness."
        />
        <meta property="og:title" content="Tell a Friend · DeliWer Planet Hero" />
        <meta
          property="og:description"
          content="Say No to Plastic. Tell one friend, you both get a free lunch at a partner restaurant."
        />
        <link rel="canonical" href="https://deliwer.com/taf" />
      </Helmet>

      {/* HERO */}
      <section className="relative overflow-hidden border-b border-slate-800">
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-900/40 via-slate-950 to-amber-900/20" />
        <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24 text-center">
          <Badge className="bg-emerald-500/15 text-emerald-300 border-emerald-500/30 mb-5 text-xs font-bold tracking-widest uppercase">
            <Leaf className="w-3.5 h-3.5 mr-1.5" /> Say No to Plastic
          </Badge>
          <h1
            className="text-4xl sm:text-5xl lg:text-6xl font-black leading-[1.05] mb-5"
            data-testid="heading-taf-hero"
          >
            Tell a friend.{" "}
            <span className="bg-gradient-to-r from-emerald-400 via-amber-300 to-orange-400 bg-clip-text text-transparent">
              Lunch is on us.
            </span>
          </h1>
          <p className="text-slate-300 text-lg sm:text-xl max-w-2xl mx-auto mb-8">
            No commissions. No network marketing. Just share the Planet Hero
            initiative with one friend who cares — and you both get a free lunch
            at a Dubai restaurant partner.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <a href={waHref} target="_blank" rel="noopener noreferrer">
              <Button
                size="lg"
                className="bg-emerald-500 hover:bg-emerald-600 text-white font-bold h-12 px-6 w-full sm:w-auto"
                data-testid="button-taf-whatsapp"
              >
                <MessageCircle className="w-5 h-5 mr-2" /> Share on WhatsApp
              </Button>
            </a>
            <Button
              size="lg"
              variant="outline"
              onClick={copyLink}
              className="border-emerald-500/40 bg-transparent text-emerald-300 hover:bg-emerald-500/10 hover:text-emerald-200 font-bold h-12 px-6 w-full sm:w-auto"
              data-testid="button-taf-copy"
            >
              {copied ? (
                <>
                  <CheckCircle2 className="w-5 h-5 mr-2" /> Link copied
                </>
              ) : (
                <>
                  <Copy className="w-5 h-5 mr-2" /> Copy friend link
                </>
              )}
            </Button>
            <Button
              size="lg"
              variant="ghost"
              onClick={nativeShare}
              className="text-slate-300 hover:text-white hover:bg-slate-800 font-bold h-12 px-6 w-full sm:w-auto"
              data-testid="button-taf-share"
            >
              <Share2 className="w-5 h-5 mr-2" /> More ways
            </Button>
          </div>
          <p className="text-xs text-slate-500 mt-6 max-w-md mx-auto">
            One link. One friend. One free lunch each. That's it.
          </p>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="border-b border-slate-800" data-testid="section-how-it-works">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-20">
          <div className="text-center mb-12">
            <h2
              className="text-3xl sm:text-4xl font-bold mb-3"
              data-testid="heading-how-it-works"
            >
              Three steps. Zero pressure.
            </h2>
            <p className="text-slate-400 text-lg max-w-2xl mx-auto">
              Built for casual sharing — not for building downlines.
            </p>
          </div>

          <div className="grid sm:grid-cols-3 gap-6">
            {STEPS.map((s) => (
              <Card
                key={s.n}
                className="bg-slate-900/70 border-slate-800 hover:border-emerald-500/40 transition"
                data-testid={`card-step-${s.n}`}
              >
                <CardContent className="p-6 space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center text-emerald-300 font-black">
                      {s.n}
                    </div>
                    <s.icon className="w-5 h-5 text-emerald-400" />
                  </div>
                  <h3 className="text-lg font-bold text-white">{s.title}</h3>
                  <p className="text-slate-400 text-sm leading-relaxed">{s.desc}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* RESTAURANT PARTNERS */}
      <section
        id="restaurants"
        className="border-b border-slate-800 bg-gradient-to-b from-slate-950 via-emerald-950/10 to-slate-950"
        data-testid="section-restaurants"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-20">
          <div className="text-center mb-10">
            <Badge className="bg-amber-500/15 text-amber-300 border-amber-500/30 mb-3">
              <Utensils className="w-3.5 h-3.5 mr-1.5" /> Restaurant Partners
            </Badge>
            <h2
              className="text-3xl sm:text-4xl font-bold mb-3"
              data-testid="heading-restaurants"
            >
              Pick where lunch lands
            </h2>
            <p className="text-slate-400 text-lg max-w-2xl mx-auto">
              Partner restaurants that share our sustainability and wellness
              values — your free lunch comes from one of these.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {RESTAURANT_PARTNERS.map((r) => (
              <Card
                key={r.name}
                className="bg-slate-900/70 border-slate-800 hover:border-emerald-500/40 transition overflow-hidden"
                data-testid={`card-restaurant-${r.name.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`}
              >
                <div className={`h-1.5 bg-gradient-to-r ${r.accent}`} />
                <CardContent className="p-6 space-y-3">
                  <div
                    className={`w-12 h-12 rounded-xl bg-gradient-to-br ${r.accent} flex items-center justify-center`}
                  >
                    <r.icon className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white">{r.name}</h3>
                    <p className="text-xs uppercase tracking-widest text-slate-400 font-bold mt-1">
                      {r.location}
                    </p>
                  </div>
                  <p className="text-slate-300 text-sm leading-relaxed">
                    {r.perk}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="mt-10 text-center">
            <a
              href={buildWA(
                "Hi DeliWer — I run a restaurant in Dubai and would love to join the Planet Hero loyalty programme. Please share partnership details."
              )}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button
                variant="outline"
                className="border-slate-600 text-slate-200 hover:bg-slate-800 font-bold"
                data-testid="button-restaurant-apply"
              >
                Add my restaurant <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </a>
          </div>
        </div>
      </section>

      {/* CASUAL VS COMMERCIAL CLARIFIER */}
      <section className="border-b border-slate-800" data-testid="section-clarifier">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-20">
          <div className="grid md:grid-cols-2 gap-6">
            <Card
              className="bg-slate-900/70 border-emerald-500/40"
              data-testid="card-track-casual"
            >
              <CardContent className="p-6 sm:p-8 space-y-3">
                <Badge className="bg-emerald-500/15 text-emerald-300 border-emerald-500/30">
                  You are here
                </Badge>
                <h3 className="text-2xl font-bold text-white">
                  Tell a Friend (Casual)
                </h3>
                <p className="text-slate-300 text-sm leading-relaxed">
                  Share the Planet Hero initiative with friends because it
                  matters. Reward = a free lunch at a partner restaurant. No
                  tiers, no quotas, no recruiting.
                </p>
                <ul className="space-y-2 pt-2">
                  {[
                    "One link, one friend",
                    "Free lunch each — that's it",
                    "Powered by sustainability, not commissions",
                  ].map((b) => (
                    <li
                      key={b}
                      className="flex gap-2 text-slate-200 text-sm"
                    >
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                      {b}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            <Card
              className="bg-slate-900/40 border-slate-800"
              data-testid="card-track-career"
            >
              <CardContent className="p-6 sm:p-8 space-y-3">
                <Badge className="bg-slate-800 text-slate-300 border-slate-700">
                  Looking for income?
                </Badge>
                <h3 className="text-2xl font-bold text-white">
                  Partner & Earn (Career)
                </h3>
                <p className="text-slate-400 text-sm leading-relaxed">
                  If you'd rather grow this commercially as a broker or
                  distributor with tiered commissions, we have a separate
                  career-track programme.
                </p>
                <ul className="space-y-2 pt-2">
                  {[
                    "RERA & independent broker onboarding",
                    "Distributor → Senior → District Lead",
                    "Tiered commissions and quarterly bonuses",
                  ].map((b) => (
                    <li
                      key={b}
                      className="flex gap-2 text-slate-300 text-sm"
                    >
                      <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                      {b}
                    </li>
                  ))}
                </ul>
                <Link href="/partners" className="block pt-2">
                  <Button
                    variant="outline"
                    className="w-full border-slate-600 text-slate-200 hover:bg-slate-800 font-bold"
                    data-testid="button-go-partners"
                  >
                    Visit Partner Programme <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="relative overflow-hidden" data-testid="section-final-cta">
        <div className="absolute inset-0 bg-gradient-to-b from-emerald-950/20 via-slate-950 to-slate-950" />
        <div className="relative max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24 text-center">
          <Sparkles className="w-12 h-12 text-emerald-400 mx-auto mb-4" />
          <h2
            className="text-3xl sm:text-4xl lg:text-5xl font-black mb-5"
            data-testid="heading-final-cta"
          >
            One friend. One free lunch. One less plastic bottle.
          </h2>
          <p className="text-slate-300 text-lg mb-7">
            That's the whole point.
          </p>
          <a href={waHref} target="_blank" rel="noopener noreferrer">
            <Button
              size="lg"
              className="bg-emerald-500 hover:bg-emerald-600 text-white font-bold h-12 px-8"
              data-testid="button-final-share"
            >
              <MessageCircle className="w-5 h-5 mr-2" /> Share on WhatsApp
            </Button>
          </a>
          <div className="mt-6">
            <Link href="/wellness">
              <Button
                variant="ghost"
                className="text-emerald-300 hover:text-emerald-200 hover:bg-emerald-500/10 font-bold"
                data-testid="button-final-wellness"
              >
                Or explore the Wellness Journey <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
