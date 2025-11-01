import { Card, CardContent } from "@/components/ui/card";
import { Star, Quote } from "lucide-react";
import { useState, useEffect } from "react";

interface Testimonial {
  id: number;
  name: string;
  location: string;
  rating: number;
  text: string;
  date: string;
}

const testimonials: Testimonial[] = [
  {
    id: 1,
    name: "Ahmed Al-Mansoori",
    location: "Dubai Marina",
    rating: 5,
    text: "Excellent service! The installation was quick and professional. Water quality has improved dramatically since we switched to AquaCafe. Highly recommend!",
    date: "2 weeks ago"
  },
  {
    id: 2,
    name: "Sarah Johnson",
    location: "Palm Jumeirah",
    rating: 5,
    text: "Best decision for our family. The water tastes amazing and we've stopped buying plastic bottles. The installation team was very knowledgeable.",
    date: "1 month ago"
  },
  {
    id: 3,
    name: "Mohammed Hassan",
    location: "Downtown Dubai",
    rating: 5,
    text: "Great value for money. The filtration system is top-notch and the customer service is outstanding. Installation was completed in under 2 hours.",
    date: "3 weeks ago"
  },
  {
    id: 4,
    name: "Emily Williams",
    location: "JBR",
    rating: 5,
    text: "We love our AquaCafe system! No more heavy water bottles to carry. The water tastes pure and fresh. Installation was seamless.",
    date: "1 week ago"
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
                <div>
                  <p className="font-bold text-lg">{currentTestimonial.name}</p>
                  <p className="text-sm text-muted-foreground">{currentTestimonial.location}</p>
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
