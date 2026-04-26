import { Link } from "wouter";
import { Helmet } from "react-helmet";
import {
  Droplets,
  Home,
  ChefHat,
  Utensils,
  Wrench,
  GraduationCap,
  ShieldCheck,
  Sparkles,
  HeartPulse,
  Leaf,
  Users,
  Award,
  Gift,
  ArrowRight,
  CheckCircle2,
  AlertTriangle,
  MessageCircle,
  Activity,
  FlaskConical,
  Building2,
  Briefcase,
  Star,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

import aquacafeTradeIn from "@assets/without_text_1756065010951.jpg";
import washingFace from "@assets/washing-face-01 (1)_1756065010952.jpg";

const WA_NUMBER = "971523946311";
const WA_HOME_INSTALL_MSG = encodeURIComponent(
  "Hi DeliWer! I'd like to book a Kangen Water setup consultation for my home/restaurant. Please share availability and pricing.",
);
const WA_CAREER_MSG = encodeURIComponent(
  "Hi DeliWer! I'm interested in joining the Home Services distributor track for Kangen Water installations. Please send me the next steps.",
);

const openHomeInstallWA = () =>
  window.open(`https://wa.me/${WA_NUMBER}?text=${WA_HOME_INSTALL_MSG}`, "_blank");
const openCareerWA = () =>
  window.open(`https://wa.me/${WA_NUMBER}?text=${WA_CAREER_MSG}`, "_blank");

const acidityProblems = [
  {
    icon: Droplets,
    title: "Acidic Filtered Water",
    body: "Most Dubai municipal supply is desalinated seawater, then filtered — leaving water that is mineral-poor and skews acidic at the tap.",
  },
  {
    icon: HeartPulse,
    title: "Skin & Hair Stress",
    body: "Daily exposure to acidic water is linked by residents to dryness, hair fall, scalp irritation, and dull skin.",
  },
  {
    icon: ChefHat,
    title: "Food Preparation Quality",
    body: "Cooking, washing produce, and brewing tea or coffee with acidic water affects taste, nutrient retention, and digestion.",
  },
  {
    icon: Activity,
    title: "Body pH & Wellness",
    body: "An acidic intake load makes it harder for the body to maintain balance — a foundation issue for long-term wellness.",
  },
];

const wellnessBenefits = [
  "Electrolyzed alkaline Kangen Water at every tap you choose",
  "Plastic-free hydration — eliminate single-use bottles",
  "Better cooking, washing, and brewing for the whole family",
  "Visible difference in skin and hair within weeks",
  "Same Kangen technology trusted in clinics and wellness studios",
  "Maintenance, filter changes, and water quality checks included",
];

const homeServiceSteps = [
  {
    n: "01",
    title: "Free On-Site Consultation",
    body: "A certified DeliWer technician visits your home or restaurant, tests your water, and recommends the right Kangen setup.",
  },
  {
    n: "02",
    title: "Professional Installation",
    body: "Clean, code-compliant install at your kitchen, prep area, or treatment line. Typical job completes in a single visit.",
  },
  {
    n: "03",
    title: "Wellness Onboarding",
    body: "We educate the household or kitchen team on usage levels (drinking, cooking, beauty, cleaning) so you get the full benefit.",
  },
  {
    n: "04",
    title: "Ongoing Care",
    body: "Filter changes, water quality reviews, and priority support — your setup keeps performing year after year.",
  },
];

const distributorRequirements = [
  "Hands-on aptitude for plumbing, fittings, and water treatment equipment",
  "Willingness to complete DeliWer's Kangen installer certification",
  "Comfort educating residents on water chemistry, acidity, and wellness",
  "Own transport in the UAE and ability to serve scheduled appointments",
  "Customer-first attitude — you represent the AquaCafe brand at the door",
];

const restaurantPartnerPerks = [
  "AED 100 vouchers to acquire new customers via the AquaCafe loyalty network",
  "Featured listing in the AquaCafe restaurant partner directory",
  "Co-branded campaigns with the DeliWer wellness community",
  "Kangen Water served with every meal — a real wellness differentiator",
  "Cross-referrals from home installations in your delivery zone",
];

export default function HomeServices() {
  return (
    <div
      className="min-h-screen w-full max-w-full overflow-x-hidden bg-gradient-to-br from-emerald-50 via-white to-cyan-50"
      data-testid="page-home-services"
    >
      <Helmet>
        <title>Home Services — Kangen Water Setup for Homes & Restaurants | DeliWer</title>
        <meta
          name="description"
          content="The DeliWer Home Services gateway: certified Kangen Water installation for Dubai homes and restaurants, a career path for distributors, and AquaCafe loyalty rewards for customer referrals."
        />
      </Helmet>

      {/* Hero */}
      <section className="relative w-full overflow-hidden">
        <img
          src={aquacafeTradeIn}
          alt="AquaCafe Kangen Water installation in Dubai home"
          className="absolute inset-0 w-full h-full object-cover"
          data-testid="img-home-services-hero"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-950/85 via-slate-900/80 to-cyan-900/80" />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-transparent to-slate-950/30" />

        <div className="relative max-w-6xl mx-auto px-4 py-20 sm:py-28 text-center">
          <Badge
            className="bg-emerald-500/15 border border-emerald-300/40 text-emerald-100 px-4 py-1.5 mb-6"
            data-testid="badge-home-services"
          >
            <Sparkles className="w-4 h-4 mr-2" />
            Wellness Foundation · Kangen Water Setup
          </Badge>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-5 text-white drop-shadow-lg">
            <span className="bg-gradient-to-r from-emerald-300 to-cyan-300 bg-clip-text text-transparent">
              Home Services
            </span>{" "}
            for Healthy Living
          </h1>

          <p className="text-lg sm:text-xl text-slate-100 mb-8 leading-relaxed max-w-3xl mx-auto drop-shadow">
            The DeliWer Home Services track is the gateway to{" "}
            <span className="font-semibold text-emerald-200">Kangen Water setup</span> for homes and
            restaurants — the foundation for wellness, food preparation, and a fit body free of
            acidity-driven disease.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mb-8">
            <Button
              onClick={openHomeInstallWA}
              data-testid="button-book-installation"
              className="w-full sm:w-auto bg-gradient-to-r from-emerald-500 to-cyan-500 hover:from-emerald-400 hover:to-cyan-400 text-slate-950 px-8 py-4 text-lg font-black rounded-xl shadow-2xl shadow-emerald-500/30 transition-all hover:scale-105"
            >
              <Wrench className="mr-3 w-6 h-6" />
              Book a Kangen Setup
            </Button>
            <Button
              onClick={openCareerWA}
              data-testid="button-join-career"
              className="w-full sm:w-auto bg-white/10 hover:bg-white/20 text-white border border-white/30 backdrop-blur px-8 py-4 text-lg font-bold rounded-xl transition-all"
            >
              <Briefcase className="mr-3 w-5 h-5" />
              Join the Distributor Track
            </Button>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm text-slate-200">
            <span className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-emerald-300" />
              Certified Installers
            </span>
            <span className="flex items-center gap-2">
              <Leaf className="w-4 h-4 text-emerald-300" />
              Plastic-Free Hydration
            </span>
            <span className="flex items-center gap-2">
              <HeartPulse className="w-4 h-4 text-emerald-300" />
              Wellness-First Approach
            </span>
          </div>
        </div>
      </section>

      {/* The acidity problem */}
      <section className="w-full py-16 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <Badge className="bg-amber-100 text-amber-800 border-amber-200 px-4 py-1.5 mb-4">
              <AlertTriangle className="w-4 h-4 mr-2" />
              Why This Matters in Dubai
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
              The Hidden Acidity Problem in Filtered Sea Water
            </h2>
            <p className="text-lg text-slate-600 max-w-3xl mx-auto">
              Dubai's tap supply starts as desalinated seawater. Even after filtration, what reaches
              your kitchen and bathroom is mineral-poor and acidic — which quietly affects your
              skin, your hair, your cooking, and your long-term wellness.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {acidityProblems.map((p) => (
              <Card
                key={p.title}
                className="border-amber-100 bg-amber-50/50 hover:shadow-lg transition-shadow"
                data-testid={`card-problem-${p.title.toLowerCase().replace(/\s+/g, "-")}`}
              >
                <CardContent className="p-6">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center mb-4">
                    <p.icon className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-lg font-bold text-slate-900 mb-2">{p.title}</h3>
                  <p className="text-sm text-slate-600 leading-relaxed">{p.body}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* The wellness solution */}
      <section className="w-full py-16 px-4 bg-gradient-to-br from-emerald-50 to-cyan-50">
        <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-10 items-center">
          <div>
            <Badge className="bg-emerald-600 text-white px-4 py-1.5 mb-4">
              <FlaskConical className="w-4 h-4 mr-2" />
              The Wellness Solution
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
              Electrolyzed Alkaline Kangen Water — Installed Where You Live & Cook
            </h2>
            <p className="text-lg text-slate-700 mb-6 leading-relaxed">
              DeliWer's Home Services team installs and educates around Kangen Water — alkaline
              ionized water from a clinically-trusted Japanese technology. It's the foundation for
              healthy hydration, better food preparation, and visibly healthier skin and hair.
            </p>
            <ul className="space-y-3">
              {wellnessBenefits.map((b) => (
                <li key={b} className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-emerald-600 mt-0.5 shrink-0" />
                  <span className="text-slate-700">{b}</span>
                </li>
              ))}
            </ul>
            <div className="mt-8 flex flex-col sm:flex-row gap-3">
              <Button
                onClick={openHomeInstallWA}
                data-testid="button-solution-book"
                className="bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-3 rounded-xl font-bold"
              >
                <MessageCircle className="mr-2 w-5 h-5" />
                Talk to a Wellness Advisor
              </Button>
              <Link href="/aquacafe">
                <Button
                  variant="outline"
                  data-testid="button-solution-aquacafe"
                  className="border-emerald-600 text-emerald-700 hover:bg-emerald-50 px-6 py-3 rounded-xl font-bold w-full sm:w-auto"
                >
                  Explore AquaCafe
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              </Link>
            </div>
          </div>

          <div className="relative rounded-3xl overflow-hidden shadow-2xl">
            <img
              src={washingFace}
              alt="Healthy skin from Kangen Water at home"
              className="w-full h-[420px] object-cover"
              data-testid="img-wellness-solution"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-emerald-950/70 via-transparent to-transparent" />
            <div className="absolute bottom-5 left-5 right-5 text-white">
              <div className="text-xs uppercase tracking-widest text-emerald-200 font-bold mb-1">
                Daily Wellness Ritual
              </div>
              <div className="text-xl font-bold">
                Kangen Water — for drinking, cooking, beauty & cleaning
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How home setup works */}
      <section className="w-full py-16 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
              How Your Home Setup Works
            </h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              From first call to long-term wellness — a simple, professional path.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5">
            {homeServiceSteps.map((s) => (
              <Card
                key={s.n}
                className="border-slate-200 hover:border-emerald-300 hover:shadow-lg transition-all"
                data-testid={`card-step-${s.n}`}
              >
                <CardContent className="p-6">
                  <div className="text-4xl font-black bg-gradient-to-br from-emerald-500 to-cyan-500 bg-clip-text text-transparent mb-3">
                    {s.n}
                  </div>
                  <h3 className="text-lg font-bold text-slate-900 mb-2">{s.title}</h3>
                  <p className="text-sm text-slate-600 leading-relaxed">{s.body}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Two tracks: Distributor + Restaurant Partner */}
      <section className="w-full py-16 px-4 bg-gradient-to-br from-slate-50 to-emerald-50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <Badge className="bg-purple-100 text-purple-800 border-purple-200 px-4 py-1.5 mb-4">
              <Users className="w-4 h-4 mr-2" />
              For Networkers & Partners
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
              Two Career Tracks Powering the Wellness Movement
            </h2>
            <p className="text-lg text-slate-600 max-w-3xl mx-auto">
              Home Services is more than installations. It's a network of skilled distributors and
              restaurant partners — together promoting healthy water and healthy food across Dubai.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-6">
            {/* Distributor Track */}
            <Card
              className="border-emerald-200 bg-white shadow-xl hover:shadow-2xl transition-shadow"
              data-testid="card-distributor-track"
            >
              <CardContent className="p-8">
                <div className="flex items-center gap-3 mb-5">
                  <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-emerald-500 to-cyan-600 flex items-center justify-center">
                    <Wrench className="w-7 h-7 text-white" />
                  </div>
                  <div>
                    <div className="text-xs uppercase tracking-widest text-emerald-700 font-bold">
                      Track 1
                    </div>
                    <h3 className="text-2xl font-bold text-slate-900">Home Services Distributor</h3>
                  </div>
                </div>

                <p className="text-slate-700 mb-5">
                  A specialised track for distributors who can demonstrate and install water
                  purification and Kangen treatment equipment, and educate residents about the
                  perils of acidic water and how to overcome it.
                </p>

                <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-4 mb-5">
                  <div className="flex items-center gap-2 mb-3">
                    <GraduationCap className="w-5 h-5 text-emerald-700" />
                    <span className="font-bold text-slate-900">Who this is for</span>
                  </div>
                  <ul className="space-y-2">
                    {distributorRequirements.map((r) => (
                      <li key={r} className="flex items-start gap-2 text-sm text-slate-700">
                        <CheckCircle2 className="w-4 h-4 text-emerald-600 mt-0.5 shrink-0" />
                        <span>{r}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="flex flex-col sm:flex-row gap-3">
                  <Link href="/partners/career" className="flex-1">
                    <Button
                      data-testid="button-distributor-career"
                      className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl py-3"
                    >
                      <Briefcase className="mr-2 w-5 h-5" />
                      Explore Career Path
                    </Button>
                  </Link>
                  <Button
                    onClick={openCareerWA}
                    data-testid="button-distributor-apply"
                    variant="outline"
                    className="flex-1 border-emerald-600 text-emerald-700 hover:bg-emerald-50 font-bold rounded-xl py-3"
                  >
                    <MessageCircle className="mr-2 w-5 h-5" />
                    Apply on WhatsApp
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Restaurant Partner Track */}
            <Card
              className="border-amber-200 bg-white shadow-xl hover:shadow-2xl transition-shadow"
              data-testid="card-restaurant-track"
            >
              <CardContent className="p-8">
                <div className="flex items-center gap-3 mb-5">
                  <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-amber-500 to-orange-500 flex items-center justify-center">
                    <Utensils className="w-7 h-7 text-white" />
                  </div>
                  <div>
                    <div className="text-xs uppercase tracking-widest text-amber-700 font-bold">
                      Track 2
                    </div>
                    <h3 className="text-2xl font-bold text-slate-900">Restaurant Partner</h3>
                  </div>
                </div>

                <p className="text-slate-700 mb-5">
                  Restaurants who care about food quality, health, and wellness can offer{" "}
                  <span className="font-bold text-amber-700">AED 100 vouchers</span> to acquire new
                  customers through the AquaCafe by DeliWer loyalty network — joining an alliance of
                  networkers promoting their food and brand.
                </p>

                <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 mb-5">
                  <div className="flex items-center gap-2 mb-3">
                    <Gift className="w-5 h-5 text-amber-700" />
                    <span className="font-bold text-slate-900">What partners get</span>
                  </div>
                  <ul className="space-y-2">
                    {restaurantPartnerPerks.map((r) => (
                      <li key={r} className="flex items-start gap-2 text-sm text-slate-700">
                        <CheckCircle2 className="w-4 h-4 text-amber-600 mt-0.5 shrink-0" />
                        <span>{r}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="flex flex-col sm:flex-row gap-3">
                  <Link href="/restaurant-partners" className="flex-1">
                    <Button
                      data-testid="button-restaurant-directory"
                      className="w-full bg-amber-600 hover:bg-amber-700 text-white font-bold rounded-xl py-3"
                    >
                      <Building2 className="mr-2 w-5 h-5" />
                      Restaurant Partner Directory
                    </Button>
                  </Link>
                  <Link href="/partner-program" className="flex-1">
                    <Button
                      data-testid="button-restaurant-join"
                      variant="outline"
                      className="w-full border-amber-600 text-amber-700 hover:bg-amber-50 font-bold rounded-xl py-3"
                    >
                      <ArrowRight className="mr-2 w-5 h-5" />
                      Join the Network
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Customer referral CTA — /earn and /taf */}
      <section className="w-full py-16 px-4 bg-gradient-to-br from-emerald-600 via-cyan-600 to-blue-600 relative overflow-hidden">
        <div className="absolute inset-0 bg-black/10" />
        <div className="relative max-w-6xl mx-auto">
          <div className="text-center mb-10">
            <Badge className="bg-white/15 border border-white/30 text-white px-4 py-1.5 mb-4">
              <Star className="w-4 h-4 mr-2" />
              Already a Customer?
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Refer Friends & Earn Together
            </h2>
            <p className="text-lg text-white/90 max-w-3xl mx-auto">
              Share the wellness movement. Every friend you bring into the AquaCafe loyalty network
              earns you rewards — and gets them a healthier home and table too.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <Card
              className="bg-white/10 backdrop-blur-sm border-white/20 hover:bg-white/15 transition-colors"
              data-testid="card-cta-earn"
            >
              <CardContent className="p-8 text-white">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 rounded-xl bg-yellow-400/20 border border-yellow-300/40 flex items-center justify-center">
                    <Award className="w-6 h-6 text-yellow-300" />
                  </div>
                  <h3 className="text-2xl font-bold">Start Earning DXBs</h3>
                </div>
                <p className="text-white/90 mb-5">
                  Activate your AED 99 starter kit, get your referral link, and earn DXB rewards on
                  every step of the wellness journey.
                </p>
                <Link href="/earn">
                  <Button
                    data-testid="button-cta-earn"
                    className="bg-yellow-400 hover:bg-yellow-300 text-slate-950 font-black rounded-xl px-6 py-3 w-full sm:w-auto"
                  >
                    <Award className="mr-2 w-5 h-5" />
                    Go to /earn
                    <ArrowRight className="ml-2 w-5 h-5" />
                  </Button>
                </Link>
              </CardContent>
            </Card>

            <Card
              className="bg-white/10 backdrop-blur-sm border-white/20 hover:bg-white/15 transition-colors"
              data-testid="card-cta-taf"
            >
              <CardContent className="p-8 text-white">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 rounded-xl bg-pink-400/20 border border-pink-300/40 flex items-center justify-center">
                    <Gift className="w-6 h-6 text-pink-300" />
                  </div>
                  <h3 className="text-2xl font-bold">Tell a Friend</h3>
                </div>
                <p className="text-white/90 mb-5">
                  Send a personal referral link via WhatsApp. You earn AED 100 restaurant vouchers,
                  your friend gets a FREE shower filter and full AquaCafe membership perks.
                </p>
                <Link href="/taf">
                  <Button
                    data-testid="button-cta-taf"
                    className="bg-pink-400 hover:bg-pink-300 text-slate-950 font-black rounded-xl px-6 py-3 w-full sm:w-auto"
                  >
                    <Gift className="mr-2 w-5 h-5" />
                    Go to /taf
                    <ArrowRight className="ml-2 w-5 h-5" />
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Footer pledge */}
      <section className="w-full py-12 px-4 bg-slate-950 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Home className="w-6 h-6 text-emerald-400" />
            <span className="text-sm uppercase tracking-widest text-emerald-300 font-bold">
              DeliWer Home Services
            </span>
          </div>
          <h3 className="text-2xl md:text-3xl font-bold mb-3">
            Wellness begins where you live, cook, and care for your family.
          </h3>
          <p className="text-slate-300 max-w-2xl mx-auto">
            Healthy water is the foundation of healthy food, healthy skin, and a fit body free of
            acidity-driven disease. The Home Services track is how we deliver that foundation —
            home by home, restaurant by restaurant, across Dubai.
          </p>
        </div>
      </section>
    </div>
  );
}
