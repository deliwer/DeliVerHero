import { Card, CardContent } from "@/components/ui/card";
import { Star, Quote } from "lucide-react";
import { SiGoogle } from "react-icons/si";
import { useState, useEffect } from "react";
import NicoleImg from "@assets/Nicole_Oliver.jpeg";

interface Testimonial {
  id: number;
  name: string;
  location: string;
  nationality?: string;
  rating: number;
  text: string;
  date: string;
  image?: string;
  verified?: boolean;
  source?: "google";
  reviewCount?: number;
}

const testimonials: Testimonial[] = [
  {
    id: 0,
    name: "Zoya Abassi",
    location: "Dubai",
    rating: 5,
    text: "I recently had shower filters installed in my shower heads, and I'm very happy with the results so far. The installation process was smooth and hassle-free, and the team was professional and efficient. Since using the filters, I've noticed a positive difference in water quality. The water feels cleaner and gentler, especially on skin and hair. Overall, a great experience so far — I would definitely recommend their service to anyone looking to improve their shower water quality.",
    date: "1 week ago",
    verified: true,
    source: "google",
    reviewCount: 10
  },
  {
    id: 1,
    name: "Nicole Oliver",
    location: "Dubai Marina",
    nationality: "Germany",
    rating: 5,
    text: "Just moved into my new place at Marina and DeliWer set up the complete water system for me — including a free hair shower filter! The difference is incredible, my hair feels so much softer. The installation team was fast and professional. Worth every dirham!",
    date: "1 week ago",
    image: NicoleImg
  },
  {
    id: 2,
    name: "Ahmed Al-Mansoori",
    location: "Dubai Marina",
    rating: 5,
    text: "Excellent service! The installation was quick and professional. Water quality has improved dramatically since we switched to AquaCafe. Highly recommend!",
    date: "2 weeks ago"
  },
  {
    id: 3,
    name: "Sarah Johnson",
    location: "Palm Jumeirah",
    rating: 5,
    text: "Best decision for our family. The water tastes amazing and we've stopped buying plastic bottles. The installation team was very knowledgeable.",
    date: "1 month ago"
  },
  {
    id: 4,
    name: "Mohammed Hassan",
    location: "Downtown Dubai",
    rating: 5,
    text: "Great value for money. The filtration system is top-notch and the customer service is outstanding. Installation was completed in under 2 hours.",
    date: "3 weeks ago"
  },
  {
    id: 5,
    name: "Emily Williams",
    location: "JBR",
    rating: 5,
    text: "We love our AquaCafe system! No more heavy water bottles to carry. The water tastes pure and fresh. Installation was seamless.",
    date: "1 week ago"
  },
  {
    id: 6,
    name: "bk choi",
    location: "Dubai",
    rating: 5,
    text: "Great service and professional people.",
    date: "1 year ago",
    verified: true,
    source: "google",
    reviewCount: 23
  },
  {
    id: 7,
    name: "Syed Ghayoor Hassan",
    location: "Dubai",
    rating: 5,
    text: "Best service in town.",
    date: "2 years ago",
    verified: true,
    source: "google",
    reviewCount: 3
  }
];

export function AquaCafeTestimonials() {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const currentTestimonial = testimonials[currentIndex];

  return (
    <section className="py-12 bg-white dark:bg-gray-900">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">
          What Our Dubai Customers Say
        </h2>
        <p className="text-center text-muted-foreground mb-10">
          Trusted by hundreds of families across Dubai
        </p>

        <div className="max-w-4xl mx-auto">
          <Card className="border-2 shadow-xl">
            <CardContent className="p-8">
              <Quote className="w-12 h-12 text-blue-400 mb-4 opacity-50" />

              <p className="text-lg md:text-xl mb-6 italic text-gray-700 dark:text-gray-300">
                "{currentTestimonial.text}"
              </p>

              <div className="flex items-center justify-between flex-wrap gap-4">
                <div className="flex items-center gap-4">
                  {currentTestimonial.image ? (
                    <img
                      src={currentTestimonial.image}
                      alt={currentTestimonial.name}
                      data-testid={`img-testimonial-${currentTestimonial.id}`}
                      className="w-14 h-14 rounded-full object-cover border-2 border-blue-200 shadow-md"
                    />
                  ) : (
                    <div className="w-14 h-14 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center text-blue-600 dark:text-blue-300 font-bold text-lg border-2 border-blue-200">
                      {currentTestimonial.name.split(" ").map(n => n[0]).join("")}
                    </div>
                  )}
                  <div>
                    <div className="flex items-center gap-2 flex-wrap">
                      <p className="font-bold text-lg">{currentTestimonial.name}</p>
                      {currentTestimonial.verified && currentTestimonial.source === "google" && (
                        <span
                          className="inline-flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-blue-50 dark:bg-blue-950 text-blue-700 dark:text-blue-300 border border-blue-200 dark:border-blue-800"
                          data-testid={`badge-verified-${currentTestimonial.id}`}
                          title="Verified Google Review"
                        >
                          <SiGoogle className="w-3 h-3" />
                          Verified Google Review
                        </span>
                      )}
                    </div>
                    <p className="text-sm text-muted-foreground">
                      {currentTestimonial.location}
                      {currentTestimonial.nationality && (
                        <span className="ml-1 text-blue-500">· {currentTestimonial.nationality}</span>
                      )}
                      {currentTestimonial.reviewCount && (
                        <span className="ml-1 text-muted-foreground">· {currentTestimonial.reviewCount} reviews</span>
                      )}
                    </p>
                  </div>
                </div>

                <div className="flex flex-col items-end gap-2">
                  <div className="flex gap-1">
                    {[...Array(currentTestimonial.rating)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 fill-amber-400 text-amber-400" />
                    ))}
                  </div>
                  <p className="text-xs text-muted-foreground">{currentTestimonial.date}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="flex justify-center gap-2 mt-6">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`w-3 h-3 rounded-full transition-all ${
                  index === currentIndex
                    ? 'bg-blue-600 w-8'
                    : 'bg-gray-300 dark:bg-gray-600 hover:bg-gray-400'
                }`}
                aria-label={`View testimonial ${index + 1}`}
                data-testid={`button-testimonial-${index}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
