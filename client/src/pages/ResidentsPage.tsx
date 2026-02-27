import { useLocation, Link } from "wouter";
import { 
  CheckCircle2, 
  ArrowRight, 
  MessageSquare, 
  Zap, 
  Flame, 
  Shield,
  ShieldCheck
} from "lucide-react";
import { Navigation } from "@/components/navigation";
import { Helmet } from "react-helmet";
import { PartnerStrip, OperationalBadges } from "@/components/trust-strip";
import { Button } from "@/components/ui/button";

// Card components local to avoid import complexity
function Card({ children, className }: { children: React.ReactNode; className?: string }) {
  return <div className={`rounded-[3rem] border border-white/10 bg-white/5 text-card-foreground shadow-xl ${className}`}>{children}</div>;
}

function CardHeader({ children, className }: { children: React.ReactNode; className?: string }) {
  return <div className={`flex flex-col space-y-1.5 p-6 ${className}`}>{children}</div>;
}

function CardTitle({ children, className }: { children: React.ReactNode; className?: string }) {
  return <h3 className={`font-black uppercase tracking-tighter italic ${className}`}>{children}</h3>;
}

function CardContent({ children, className }: { children: React.ReactNode; className?: string }) {
  return <div className={`p-6 pt-0 ${className}`}>{children}</div>;
}

export default function ResidentsPage() {
  const [location] = useLocation();

  return (
    <div className="min-h-screen bg-slate-950 text-white font-sans selection:bg-emerald-500/30">
      <Helmet>
        <title>Resident Support & Home Optimization | DeliWer Dubai</title>
        <meta name="description" content="Already settled in Dubai? DeliWer provides Ejari renewals, home optimization, and ongoing support for long-term residents." />
      </Helmet>

      <Navigation />

      <main className="pt-48 pb-24">
        {/* Hero Section */}
        <section className="max-w-7xl mx-auto px-6 mb-24 text-center space-y-8">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-[10px] font-black uppercase tracking-widest mx-auto">
            <Shield size={12} />
            Your Home Operating System
          </div>
          <h1 className="text-5xl md:text-8xl font-black tracking-tighter leading-[0.85] uppercase italic text-white">
            Settled in Dubai?<br />
            <span className="text-emerald-500">Live Optimized.</span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-400 max-w-3xl mx-auto font-bold uppercase tracking-tight">
            We are the operator, not just a service. From Ejari renewals to technical home readiness, we handle the friction of Dubai living.
          </p>
        </section>

        {/* Core Funnel - 2 Main Columns */}
        <section className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-12 mb-32">
          {/* Flagship: Move-In / Activation */}
          <Card className="relative border-emerald-500/30 overflow-hidden group hover:border-emerald-500 transition-all shadow-2xl shadow-emerald-900/10">
            <div className="absolute top-0 inset-x-0 h-2 bg-emerald-500" />
            <CardHeader className="p-12 text-center space-y-4">
              <div className="w-16 h-16 bg-emerald-500/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Zap className="w-8 h-8 text-emerald-500" />
              </div>
              <CardTitle className="text-4xl text-white">Move-In Concierge</CardTitle>
              <p className="text-gray-400 font-bold uppercase tracking-widest text-xs">Standard Technical Activation</p>
              <div className="text-5xl font-black text-white tracking-tighter mt-4">AED 399</div>
            </CardHeader>
            <CardContent className="p-12 pt-0 space-y-10">
              <ul className="space-y-4">
                {[
                  "Water readiness check",
                  "Shower filter installation",
                  "Basic AC filter clean",
                  "Essentials setup guidance",
                  "Direct WhatsApp support"
                ].map((f, i) => (
                  <li key={i} className="flex items-center gap-3 text-sm font-bold text-gray-200 uppercase tracking-tight">
                    <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0" />
                    {f}
                  </li>
                ))}
              </ul>
              <Link href="/relocate">
                <Button className="w-full h-20 bg-emerald-600 hover:bg-emerald-500 text-white font-black uppercase tracking-widest rounded-2xl text-xl shadow-xl transition-all">
                  Activate My Home <ArrowRight className="ml-2 w-6 h-6" />
                </Button>
              </Link>
            </CardContent>
          </Card>

          {/* Ejari Support */}
          <Card className="relative border-white/10 overflow-hidden group hover:border-white/20 transition-all">
            <CardHeader className="p-12 text-center space-y-4">
              <div className="w-16 h-16 bg-blue-500/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Flame className="w-8 h-8 text-blue-500" />
              </div>
              <CardTitle className="text-4xl text-white">Ejari Renewal</CardTitle>
              <p className="text-gray-400 font-bold uppercase tracking-widest text-xs">Compliance & Documentation</p>
              <div className="text-5xl font-black text-white tracking-tighter mt-4">AED 199</div>
            </CardHeader>
            <CardContent className="p-12 pt-0 space-y-10">
              <ul className="space-y-4">
                {[
                  "Trustee Center coordination",
                  "Documentation audit",
                  "UAE Pass biometric support",
                  "Fast-track processing",
                  "Digital certificate delivery"
                ].map((f, i) => (
                  <li key={i} className="flex items-center gap-3 text-sm font-bold text-gray-200 uppercase tracking-tight">
                    <CheckCircle2 className="w-5 h-5 text-blue-500 shrink-0" />
                    {f}
                  </li>
                ))}
              </ul>
              <Link href="/ejari-dubai">
                <Button variant="outline" className="w-full h-20 border-white/10 hover:bg-white/5 text-white font-black uppercase tracking-widest rounded-2xl text-xl transition-all">
                  Register Ejari <ArrowRight className="ml-2 w-6 h-6" />
                </Button>
              </Link>
            </CardContent>
          </Card>
        </section>

        {/* The Differentiator Section */}
        <section className="bg-white/5 border-y border-white/5 py-32 px-6">
          <div className="max-w-4xl mx-auto space-y-16">
            <div className="text-center space-y-4">
              <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tighter italic text-white">We Are Not Brokers.</h2>
              <p className="text-emerald-400 font-black uppercase tracking-[0.2em] text-sm">We are your Home's Operational Partner.</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              <div className="space-y-6">
                <h3 className="text-2xl font-black uppercase text-white flex items-center gap-3">
                  <ShieldCheck className="text-emerald-500 w-8 h-8" /> Operator Status
                </h3>
                <p className="text-gray-400 font-bold leading-relaxed">
                  Brokers exit once the lease is signed. Contractors only fix what's broken. DeliWer stays as your operator, ensuring your living experience is technicality-free.
                </p>
              </div>
              <div className="space-y-6">
                <h3 className="text-2xl font-black uppercase text-white flex items-center gap-3">
                  <Flame className="text-emerald-500 w-8 h-8" /> Ejari First
                </h3>
                <p className="text-gray-400 font-bold leading-relaxed">
                  Ejari is the foundation of everything in Dubai. By managing this core compliance through authorized Trustee Centers, we unlock your home's potential.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="py-20 bg-slate-950">
          <div className="max-w-4xl mx-auto">
            <PartnerStrip />
          </div>
        </section>

        {/* Ongoing Support Section */}
        <section className="max-w-7xl mx-auto px-6 py-32 space-y-16">
          <div className="text-center">
            <h2 className="text-3xl font-black uppercase tracking-widest text-gray-500">Ongoing Home Support</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { title: "Home Optimization", desc: "Energy and water efficiency audits for long-term savings." },
              { title: "Document Vault", desc: "Digital management of your Ejari, DEWA, and lease history." },
              { title: "Renewal Planning", desc: "Automated alerts and coordination for your next lease cycle." }
            ].map((item, i) => (
              <div key={i} className="p-10 rounded-[2.5rem] bg-white/5 border border-white/10 hover:border-emerald-500/30 transition-all space-y-4">
                <h3 className="text-2xl font-black uppercase text-white">{item.title}</h3>
                <p className="text-gray-400 font-medium leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="text-center pb-24 px-6">
          <Button 
            size="lg"
            className="bg-emerald-600 hover:bg-emerald-500 text-white px-16 h-24 text-2xl font-black uppercase tracking-widest rounded-3xl shadow-2xl active:scale-95 transition-all w-full md:w-auto"
            onClick={() => window.open('https://wa.me/971523946311?text=Hi,%20I%20am%20a%20current%20resident%20and%20need%20home%20optimization%20support.', '_blank')}
          >
            <MessageSquare className="w-8 h-8 mr-4 fill-current" />
            WhatsApp Resident Desk
          </Button>
        </section>
      </main>

      <footer className="py-20 px-6 text-center border-t border-white/5 bg-slate-950">
        <div className="max-w-4xl mx-auto space-y-8">
          <OperationalBadges variant="dark" />
          <p className="text-gray-500 text-[10px] font-black uppercase tracking-[0.3em]">© 2026 DeliWer. Built for the Dubai Living Journey.</p>
        </div>
      </footer>
    </div>
  );
}
