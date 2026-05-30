import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Star, Quote, MapPin, ExternalLink } from "lucide-react";
import { SiGoogle, SiWhatsapp } from "react-icons/si";
import { SEOMeta } from "@/components/seo-meta";
import { useState, useMemo } from "react";
import NicoleImg from "@assets/Nicole_Oliver.jpeg";
import BeckyImg from "@assets/Becky_Choi_1776889041274.jpeg";

type ReviewService = "AquaCafe" | "Move-In" | "Visa" | "All";

interface Review {
  id: string;
  name: string;
  initials: string;
  location: string;
  nationality?: string;
  rating: number;
  text: string;
  date: string;
  service: Exclude<ReviewService, "All">;
  source: "google" | "whatsapp" | "direct";
  verified: boolean;
  reviewCount?: number;
  image?: string;
}

const REVIEWS: Review[] = [
  {
    id: "zoya-abassi",
    name: "Zoya Abassi",
    initials: "ZA",
    location: "Dubai",
    rating: 5,
    text:
      "I recently had shower filters installed in my shower heads, and I'm very happy with the results so far. The installation process was smooth and hassle-free, and the team was professional and efficient. Since using the filters, I've noticed a positive difference in water quality. The water feels cleaner and gentler, especially on skin and hair. Overall, a great experience so far — I would definitely recommend their service to anyone looking to improve their shower water quality.",
    date: "1 week ago",
    service: "AquaCafe",
    source: "google",
    verified: true,
    reviewCount: 10,
  },
  {
    id: "becky-choi",
    name: "Becky Choi",
    initials: "BC",
    location: "Dubai",
    rating: 5,
    text: "Great service and professional people.",
    date: "1 year ago",
    service: "AquaCafe",
    source: "google",
    verified: true,
    reviewCount: 23,
    image: BeckyImg,
  },
  {
    id: "syed-ghayoor-hassan",
    name: "Syed Ghayoor Hassan",
    initials: "SG",
    location: "Dubai",
    rating: 5,
    text: "Best service in town.",
    date: "2 years ago",
    service: "AquaCafe",
    source: "google",
    verified: true,
    reviewCount: 3,
  },
  {
    id: "nicole-oliver",
    name: "Nicole Oliver",
    initials: "NO",
    location: "Dubai Marina",
    nationality: "Germany",
    rating: 5,
    text:
      "Just moved into my new place at Marina and DeliWer set up the complete water system for me — including a free hair shower filter! The difference is incredible, my hair feels so much softer. The installation team was fast and professional. Worth every dirham!",
    date: "1 week ago",
    service: "AquaCafe",
    source: "direct",
    verified: true,
  },
  {
    id: "ahmed-mansoori",
    name: "Ahmed Al-Mansoori",
    initials: "AM",
    location: "Dubai Marina",
    rating: 5,
    text:
      "Excellent service! The installation was quick and professional. Water quality has improved dramatically since we switched to AquaCafe. Highly recommend!",
    date: "2 weeks ago",
    service: "AquaCafe",
    source: "direct",
    verified: true,
  },
  {
    id: "sarah-marina",
    name: "Sarah",
    initials: "S",
    location: "Dubai Marina",
    rating: 5,
    text: "Moved into Dubai in July, and our home was summer-ready on day one — hassle-free!",
    date: "1 month ago",
    service: "Move-In",
    source: "direct",
    verified: true,
  },
  {
    id: "ahmed-jvc",
    name: "Ahmed",
    initials: "A",
    location: "JVC",
    rating: 5,
    text: "AC serviced and water delivered in hours — DeliWer saved our move-in week.",
    date: "1 month ago",
    service: "Move-In",
    source: "direct",
    verified: true,
  },
  {
    id: "michael-downtown",
    name: "Michael",
    initials: "M",
    location: "Downtown Dubai",
    rating: 5,
    text: "Exit handover was smooth. Got our full deposit back without any issues.",
    date: "2 months ago",
    service: "Move-In",
    source: "direct",
    verified: true,
  },
  {
    id: "priya-bb",
    name: "Priya",
    initials: "P",
    location: "Business Bay",
    rating: 5,
    text: "Best home service experience in Dubai. One team, one timeline, zero stress.",
    date: "3 weeks ago",
    service: "Move-In",
    source: "direct",
    verified: true,
  },
  {
    id: "ahmed-maktoum",
    name: "Ahmed Al-Maktoum",
    initials: "AM",
    location: "Dubai",
    rating: 5,
    text:
      "Relocating to Dubai was seamless with DeliWer. From business setup to sustainable home services, they handled everything with extreme professionalism.",
    date: "1 month ago",
    service: "Visa",
    source: "direct",
    verified: true,
  },
  {
    id: "sarah-johnson",
    name: "Sarah Johnson",
    initials: "SJ",
    location: "Dubai",
    rating: 5,
    text:
      "The primary gateway for any entrepreneur moving to Dubai. Clean, fast, and the sustainable living integration is a game-changer.",
    date: "2 months ago",
    service: "Visa",
    source: "direct",
    verified: true,
  },
];

const GOOGLE_REVIEW_URL = "https://g.page/r/CfIcac/review";
const GOOGLE_PROFILE_URL = "https://maps.app.goo.gl/YzW5KMW4QgPjAVM77";

const SERVICE_FILTERS: ReviewService[] = ["All", "AquaCafe", "Move-In", "Visa"];

export default function ReviewsPage() {
  const [filter, setFilter] = useState<ReviewService>("All");

  const filtered = useMemo(
    () => (filter === "All" ? REVIEWS : REVIEWS.filter((r) => r.service === filter)),
    [filter],
  );

  const avg =
    REVIEWS.reduce((sum, r) => sum + r.rating, 0) / REVIEWS.length;
  const totalGoogle = REVIEWS.filter((r) => r.source === "google").length;

  const reviewsSchema = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: "DeliWer",
    url: "https://www.deliwer.com/reviews",
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: avg.toFixed(1),
      reviewCount: String(REVIEWS.length),
      bestRating: "5",
      worstRating: "1",
    },
    review: REVIEWS.map((r) => ({
      "@type": "Review",
      author: { "@type": "Person", name: r.name },
      reviewRating: {
        "@type": "Rating",
        ratingValue: String(r.rating),
        bestRating: "5",
      },
      reviewBody: r.text,
      ...(r.source === "google" && {
        publisher: { "@type": "Organization", name: "Google" },
      }),
    })),
  };

  return (
    <>
      <SEOMeta
        title="Client Reviews - DeliWer Dubai"
        description="Read verified Google reviews and client testimonials for DeliWer Dubai — AquaCafe water filtration, Move-In services, and Visa & Relocation. 5-star service trusted by Dubai residents."
        canonical="https://www.deliwer.com/reviews"
      />
      <script
        type="application/ld+json"
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{ __html: JSON.stringify(reviewsSchema) }}
      />

      <main className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 text-white">
        {/* Hero */}
        <section className="px-4 pt-20 pb-12">
          <div className="max-w-5xl mx-auto text-center">
            <Badge
              className="mb-4 bg-blue-500/10 text-blue-300 border border-blue-500/30 hover:bg-blue-500/20"
              data-testid="badge-google-verified"
            >
              <SiGoogle className="w-3 h-3 mr-1.5" />
              Verified Google Reviews
            </Badge>
            <h1 className="text-4xl md:text-6xl font-black mb-4">
              What Dubai Says About <span className="text-emerald-400">DeliWer</span>
            </h1>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto mb-8">
              Real reviews from real customers across AquaCafe, Move-In, and Visa & Relocation services.
            </p>

            <div className="flex flex-wrap justify-center items-center gap-6 mb-8">
              <div className="text-center" data-testid="stat-rating">
                <div className="flex justify-center gap-1 mb-1">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-6 h-6 fill-amber-400 text-amber-400" />
                  ))}
                </div>
                <div className="text-3xl font-black">{avg.toFixed(1)}/5</div>
                <div className="text-xs text-gray-400 uppercase tracking-wider">
                  Average rating
                </div>
              </div>
              <div className="h-12 w-px bg-white/10 hidden sm:block" />
              <div className="text-center" data-testid="stat-reviews">
                <div className="text-3xl font-black">{REVIEWS.length}+</div>
                <div className="text-xs text-gray-400 uppercase tracking-wider">
                  Client reviews
                </div>
              </div>
              <div className="h-12 w-px bg-white/10 hidden sm:block" />
              <div className="text-center" data-testid="stat-google">
                <div className="text-3xl font-black flex items-center gap-2 justify-center">
                  <SiGoogle className="w-6 h-6 text-blue-400" />
                  {totalGoogle}
                </div>
                <div className="text-xs text-gray-400 uppercase tracking-wider">
                  Verified on Google
                </div>
              </div>
            </div>

            <div className="flex flex-wrap justify-center gap-3">
              <Button
                asChild
                size="lg"
                className="bg-blue-600 hover:bg-blue-700"
                data-testid="button-leave-google-review"
              >
                <a
                  href={GOOGLE_REVIEW_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <SiGoogle className="w-4 h-4 mr-2" />
                  Leave a Google Review
                </a>
              </Button>
              <Button
                asChild
                variant="outline"
                size="lg"
                className="border-emerald-500/50 text-emerald-300 hover:bg-emerald-500/10"
                data-testid="button-whatsapp-review"
              >
                <a
                  href="https://wa.me/971523906019?text=Hi%20DeliWer%2C%20I%27d%20like%20to%20share%20a%20review"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <SiWhatsapp className="w-4 h-4 mr-2" />
                  Share via WhatsApp
                </a>
              </Button>
            </div>
          </div>
        </section>

        {/* Filters */}
        <section className="px-4 pb-6">
          <div className="max-w-5xl mx-auto flex flex-wrap justify-center gap-2">
            {SERVICE_FILTERS.map((s) => (
              <Button
                key={s}
                variant={filter === s ? "default" : "outline"}
                size="sm"
                onClick={() => setFilter(s)}
                className={
                  filter === s
                    ? "bg-emerald-600 hover:bg-emerald-700"
                    : "border-white/20 text-white hover:bg-white/10"
                }
                data-testid={`filter-${s.toLowerCase().replace(/[^a-z]/g, "-")}`}
              >
                {s}
              </Button>
            ))}
          </div>
        </section>

        {/* Reviews grid */}
        <section className="px-4 pb-20">
          <div className="max-w-6xl mx-auto grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {filtered.map((r) => (
              <Card
                key={r.id}
                className="bg-slate-900/60 border-white/10 hover:border-blue-500/40 transition-all"
                data-testid={`review-card-${r.id}`}
              >
                <CardContent className="p-6">
                  <div className="flex items-start justify-between gap-3 mb-4">
                    <div className="flex items-center gap-3">
                      {r.image ? (
                        <img
                          src={r.image}
                          alt={r.name}
                          className="w-11 h-11 rounded-full object-cover border border-blue-500/30 shadow"
                          data-testid={`img-review-${r.id}`}
                        />
                      ) : (
                        <div className="w-11 h-11 rounded-full bg-slate-800 border border-white/10 flex items-center justify-center font-bold text-sm">
                          {r.initials}
                        </div>
                      )}
                      <div>
                        <div className="flex items-center gap-2 flex-wrap">
                          <p className="font-bold text-white text-sm">{r.name}</p>
                          {r.source === "google" && r.verified && (
                            <span
                              className="inline-flex items-center gap-1 text-[9px] font-bold uppercase tracking-wider px-1.5 py-0.5 rounded-full bg-blue-500/10 text-blue-300 border border-blue-500/30"
                              title="Verified Google Review"
                            >
                              <SiGoogle className="w-2.5 h-2.5" />
                              Google
                            </span>
                          )}
                        </div>
                        <p className="text-xs text-gray-400 flex items-center gap-1">
                          <MapPin className="w-3 h-3" />
                          {r.location}
                          {r.nationality && (
                            <span className="text-blue-400">· {r.nationality}</span>
                          )}
                        </p>
                      </div>
                    </div>
                    <Badge
                      variant="outline"
                      className="border-emerald-500/30 text-emerald-300 text-[10px]"
                    >
                      {r.service}
                    </Badge>
                  </div>

                  <div className="flex gap-1 mb-3">
                    {[...Array(r.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                    ))}
                  </div>

                  <Quote className="w-5 h-5 text-blue-400/40 mb-2" />
                  <p className="text-gray-300 text-sm leading-relaxed mb-4">
                    {r.text}
                  </p>
                  <p className="text-[11px] text-gray-500 uppercase tracking-wider">
                    {r.date}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>

          {filtered.length === 0 && (
            <p className="text-center text-gray-400 mt-12">
              No reviews in this category yet.
            </p>
          )}
        </section>

        {/* CTA footer */}
        <section className="px-4 pb-20">
          <div className="max-w-3xl mx-auto text-center bg-gradient-to-br from-emerald-500/10 to-blue-500/10 border border-emerald-500/20 rounded-2xl p-8">
            <h2 className="text-2xl md:text-3xl font-black mb-3">
              Loved working with us?
            </h2>
            <p className="text-gray-300 mb-6">
              Your review helps other Dubai residents discover hassle-free home
              services. It takes less than a minute.
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              <Button
                asChild
                size="lg"
                className="bg-blue-600 hover:bg-blue-700"
                data-testid="button-cta-google"
              >
                <a
                  href={GOOGLE_REVIEW_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <SiGoogle className="w-4 h-4 mr-2" />
                  Write a Google Review
                  <ExternalLink className="w-3 h-3 ml-2" />
                </a>
              </Button>
              <Button
                asChild
                variant="outline"
                size="lg"
                className="border-white/20 text-white hover:bg-white/10"
                data-testid="button-cta-profile"
              >
                <a
                  href={GOOGLE_PROFILE_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  View on Google Maps
                </a>
              </Button>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
