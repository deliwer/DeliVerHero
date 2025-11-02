import { Card, CardContent } from "@/components/ui/card";
import { Star, Quote } from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

interface Testimonial {
  id: string;
  name: string;
  initials: string;
  model: string;
  rating: number;
  text: string;
  value: string;
  reward: string;
}

const testimonials: Testimonial[] = [
  {
    id: "1",
    name: "Ahmed Al-Maktoum",
    initials: "AM",
    model: "iPhone 14 Pro",
    rating: 5,
    text: "I sold my iPhone 14 Pro and got water credits to cover 6 months of delivery. The process was incredibly easy and the pickup was done within 24 hours!",
    value: "AED 2,200",
    reward: "6 months water delivery"
  },
  {
    id: "2",
    name: "Sarah Johnson",
    initials: "SJ",
    model: "iPhone 13",
    rating: 5,
    text: "Best trade-in experience ever! Got instant cash and the team made sure all my data was securely wiped. Highly recommend DeliWer!",
    value: "AED 1,200",
    reward: "Instant cash payout"
  },
  {
    id: "3",
    name: "Mohammed Hassan",
    initials: "MH",
    model: "iPhone 15 Pro Max",
    rating: 5,
    text: "Traded in my phone and earned 32,000 Planet Points! Used them for premium water systems and restaurant rewards. Amazing platform!",
    value: "AED 3,200",
    reward: "32,000 Planet Points"
  },
  {
    id: "4",
    name: "Fatima Al-Sharif",
    initials: "FA",
    model: "iPhone 12",
    rating: 5,
    text: "The live inspection video call was super convenient. Got a fair price and the whole process took less than 48 hours from quote to payment.",
    value: "AED 800",
    reward: "Water credits + cash"
  }
];

export function TestimonialsSection() {
  return (
    <section className="py-12 px-4" data-testid="testimonials-section">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-10">
          <h2 className="text-3xl md:text-4xl font-black text-white mb-4">
            <span className="bg-gradient-to-r from-emerald-400 to-blue-400 bg-clip-text text-transparent">
              What Our Customers Say
            </span>
          </h2>
          <p className="text-gray-300 text-lg max-w-2xl mx-auto">
            Join thousands of satisfied customers who have traded their iPhones with DeliWer
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {testimonials.map((testimonial) => (
            <Card 
              key={testimonial.id} 
              className="bg-slate-800/50 border-slate-700 hover:border-emerald-500/50 transition-all hover:shadow-lg hover:shadow-emerald-500/20"
              data-testid={`testimonial-card-${testimonial.id}`}
            >
              <CardContent className="p-6">
                <div className="flex items-start gap-3 mb-4">
                  <Avatar className="bg-gradient-to-r from-emerald-500 to-blue-500">
                    <AvatarFallback className="text-white font-bold">{testimonial.initials}</AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <h3 className="text-white font-bold text-sm">{testimonial.name}</h3>
                    <p className="text-gray-400 text-xs">Traded: {testimonial.model}</p>
                  </div>
                  <Quote className="w-6 h-6 text-emerald-500/30" />
                </div>

                <div className="flex gap-1 mb-3">
                  {Array.from({ length: 5 }).map((_, idx) => (
                    <Star 
                      key={idx} 
                      className={`w-4 h-4 ${idx < testimonial.rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-600'}`}
                    />
                  ))}
                </div>

                <p className="text-gray-300 text-sm mb-4 leading-relaxed">
                  {testimonial.text}
                </p>

                <div className="pt-4 border-t border-slate-700">
                  <div className="flex justify-between text-xs">
                    <span className="text-gray-400">Value:</span>
                    <span className="text-emerald-400 font-bold">{testimonial.value}</span>
                  </div>
                  <div className="flex justify-between text-xs mt-1">
                    <span className="text-gray-400">Reward:</span>
                    <span className="text-blue-400 font-semibold">{testimonial.reward}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center mt-8">
          <p className="text-gray-400 text-sm">
            ⭐ Rated 4.9/5 based on 1,247+ customer reviews
          </p>
        </div>
      </div>
    </section>
  );
}
