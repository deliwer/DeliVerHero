import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { CheckCircle2, MessageSquare, ShieldCheck, Zap, ArrowRight, TrendingUp } from "lucide-react";
import { SiWhatsapp } from "react-icons/si";

export default function Partners() {
  const whatsappNumber = "+971523946311";
  const whatsappLink = `https://wa.me/${whatsappNumber.replace("+", "")}`;

  return (
    <div className="min-h-screen bg-background pb-20">
      {/* Hero Section */}
      <section className="relative pt-20 pb-32 overflow-hidden border-b">
        <div className="absolute inset-0 bg-emerald-500/5 -z-10" />
        <div className="container px-4 mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-6">
            Close the Rental. We Handle the Move. <span className="text-emerald-500 underline decoration-emerald-200">You Earn.</span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-10">
            After you secure the deal, DeliWer handles Ejari, move-in coordination, relocation services and compliance support — while you earn referral commission.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button size="lg" className="bg-emerald-600 hover:bg-emerald-700 min-h-12 px-8" asChild>
              <a href={whatsappLink} target="_blank" rel="noopener noreferrer">
                <SiWhatsapp className="mr-2 h-5 w-5" />
                Join via WhatsApp
              </a>
            </Button>
            <div className="text-sm font-medium text-muted-foreground">
              {whatsappNumber} | <a href="https://instagram.com/vdeliwer" target="_blank" rel="noopener noreferrer" className="hover:text-emerald-600">@vdeliwer</a>
            </div>
          </div>
        </div>
      </section>

      {/* Section 1 — The Broker Reality */}
      <section className="py-20 bg-muted/30">
        <div className="container px-4 mx-auto max-w-4xl">
          <h2 className="text-3xl font-bold mb-12 text-center">The Broker Reality</h2>
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div className="space-y-4">
              <p className="text-lg font-medium">After closing a rental, you still deal with:</p>
              {[
                "Ejari documentation chaos",
                "DEWA coordination confusion",
                "Tenant follow-ups",
                "Move-in scheduling stress",
                "Corporate relocation paperwork"
              ].map((item, i) => (
                <div key={i} className="flex items-start gap-3 text-muted-foreground">
                  <div className="mt-1.5 h-1.5 w-1.5 rounded-full bg-red-500 shrink-0" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
            <Card className="border-red-100 bg-red-50/50">
              <CardContent className="pt-6">
                <p className="text-xl font-semibold text-red-700 mb-2">This slows you down.</p>
                <p className="text-red-600 font-medium italic">And your next deal suffers.</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Section 2 — What DeliWer Handles */}
      <section className="py-20">
        <div className="container px-4 mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">We step in after deal closing only.</h2>
            <p className="text-muted-foreground">You stay focused on closing.</p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { title: "Ejari Registration Support", icon: CheckCircle2 },
              { title: "DEWA Assistance", icon: Zap },
              { title: "Move-In Concierge", icon: ArrowRight },
              { title: "Relocation & Corporate Setup", icon: ArrowRight },
              { title: "Inspection & Maintenance Coordination", icon: ShieldCheck }
            ].map((service, i) => (
              <Card key={i} className="hover-elevate">
                <CardContent className="pt-6 flex items-start gap-4">
                  <service.icon className="h-6 w-6 text-emerald-500 shrink-0" />
                  <h3 className="font-bold text-lg leading-tight">{service.title}</h3>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Section 3 — Commission Model */}
      <section className="py-20 bg-emerald-900 text-white overflow-hidden">
        <div className="container px-4 mx-auto max-w-4xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Transparent Commission Model</h2>
            <p className="text-emerald-100/70 italic">Commission confirmation shared weekly via WhatsApp. First referral payout prioritized.</p>
          </div>
          <div className="grid gap-4">
            {[
              { item: "Ejari referral", value: "Fixed commission" },
              { item: "Move-in package", value: "Flat share" },
              { item: "Relocation concierge", value: "Percentage share" },
              { item: "Corporate relocation", value: "Premium commission" }
            ].map((tier, i) => (
              <div key={i} className="flex justify-between items-center p-4 rounded-lg bg-white/5 border border-white/10">
                <span className="font-medium">{tier.item}</span>
                <span className="font-bold text-emerald-400">{tier.value}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Section 4 — Client Protection */}
      <section className="py-20">
        <div className="container px-4 mx-auto max-w-2xl text-center">
          <ShieldCheck className="h-16 w-16 text-emerald-500 mx-auto mb-6" />
          <h2 className="text-3xl font-bold mb-6">Client Protection Promise</h2>
          <div className="grid gap-4 text-left bg-muted/50 p-8 rounded-2xl">
            <p className="font-bold text-lg mb-2">We do NOT:</p>
            {[
              "List properties",
              "Market real estate",
              "Collect listings",
              "Compete with brokers"
            ].map((item, i) => (
              <div key={i} className="flex items-center gap-3 text-muted-foreground">
                <div className="h-2 w-2 rounded-full bg-muted-foreground/30" />
                <span>{item}</span>
              </div>
            ))}
            <div className="mt-4 pt-4 border-t border-muted-foreground/10 text-center font-bold text-emerald-600">
              Your client remains your client.
            </div>
          </div>
        </div>
      </section>

      {/* Section 5 — How It Works */}
      <section className="py-20 bg-muted/30">
        <div className="container px-4 mx-auto text-center">
          <h2 className="text-3xl font-bold mb-12">Simple. Trackable. Transparent.</h2>
          <div className="flex flex-wrap justify-center gap-8 max-w-5xl mx-auto">
            {[
              { step: "1", text: "Close rental" },
              { step: "2", text: "Share your referral link" },
              { step: "3", text: "Client contacts DeliWer" },
              { step: "4", text: "We log referral transparently" },
              { step: "5", text: "You receive commission" }
            ].map((step, i) => (
              <div key={i} className="flex flex-col items-center gap-4 w-40">
                <div className="h-12 w-12 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold text-xl">
                  {step.step}
                </div>
                <p className="font-medium text-sm leading-tight">{step.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Section 6 — Call to Action */}
      <section className="py-20">
        <div className="container px-4 mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold mb-4">Get Your Personal Referral Link</h2>
          <p className="text-muted-foreground mb-8">Message us on WhatsApp to start earning immediately.</p>
          <Card className="border-emerald-200 bg-emerald-50/50 p-8">
            <div className="space-y-6">
              <div className="text-2xl font-mono font-bold tracking-wider">
                deliwer.com/welcome?ref=yourname
              </div>
              <Button size="lg" className="w-full bg-emerald-600 hover:bg-emerald-700 h-14" asChild>
                <a href={whatsappLink} target="_blank" rel="noopener noreferrer">
                  <SiWhatsapp className="mr-2 h-6 w-6" />
                  Message +971523946311
                </a>
              </Button>
              <p className="text-sm text-muted-foreground">Follow <a href="https://instagram.com/vdeliwer" target="_blank" rel="noopener noreferrer" className="hover:text-emerald-600 font-medium">@vdeliwer</a> for partner highlights.</p>
            </div>
          </Card>
        </div>
      </section>
    </div>
  );
}
