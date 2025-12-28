import { Card, CardContent } from "@/components/ui/card";
import { Star, Quote } from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { DirhamSymbol } from "@/components/ui/dirham-symbol";

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
    model: "Move-In Partner",
    rating: 5,
    text: "Relocating to Dubai was seamless with DeliWer. From business setup to sustainable home services, they handled everything with extreme professionalism.",
    value: "Premium",
    reward: "Relocation Success"
  },
  {
    id: "2",
    name: "Sarah Johnson",
    initials: "SJ",
    model: "Business Founder",
    rating: 5,
    text: "The primary gateway for any entrepreneur moving to Dubai. Clean, fast, and the sustainable living integration is a game-changer.",
    value: "Corporate",
    reward: "Business Active"
  }
];

export function TestimonialsSection() {
  return (
    <section className="py-12 px-4 bg-slate-900/50" data-testid="testimonials-section">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-black text-white mb-4">
            Trusted by Global Professionals
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Join the community of founders and families who chose DeliWer for their Dubai journey.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {testimonials.map((testimonial) => (
            <Card 
              key={testimonial.id} 
              className="bg-slate-900/40 border-white/5 hover:border-blue-500/30 transition-all hover:shadow-2xl hover:shadow-blue-500/10 rounded-2xl overflow-hidden"
              data-testid={`testimonial-card-${testimonial.id}`}
            >
              <CardContent className="p-8">
                <div className="flex items-center gap-4 mb-6">
                  <Avatar className="h-12 w-12 border border-white/10">
                    <AvatarFallback className="bg-slate-800 text-white font-bold">{testimonial.initials}</AvatarFallback>
                  </Avatar>
                  <div>
                    <h3 className="text-white font-bold">{testimonial.name}</h3>
                    <p className="text-blue-400 text-xs font-medium uppercase tracking-wider">{testimonial.model}</p>
                  </div>
                </div>

                <p className="text-gray-300 text-base italic leading-relaxed mb-6">
                  "{testimonial.text}"
                </p>

                <div className="flex gap-1">
                  {Array.from({ length: 5 }).map((_, idx) => (
                    <Star 
                      key={idx} 
                      className="w-4 h-4 fill-blue-500 text-blue-500"
                    />
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
