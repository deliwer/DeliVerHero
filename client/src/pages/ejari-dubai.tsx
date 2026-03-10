import { SEOMeta } from "@/components/seo-meta";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MessageSquare, CheckCircle2, ShieldCheck, Fingerprint, Building2, ClipboardCheck } from "lucide-react";
import { motion } from "framer-motion";
import { Link } from "wouter";
import { Navigation } from "@/components/navigation";

export default function EjariDubai() {
  const handleWhatsApp = () => {
    const text = "Hi DeliWer, I need help with Ejari coordination.";
    window.open(`https://wa.me/971523946311?text=${encodeURIComponent(text)}`, '_blank');
  };

  const steps = [
    {
      title: "Document Submission",
      description: "Upload your tenancy contract and Emirates ID via WhatsApp.",
      icon: ClipboardCheck
    },
    {
      title: "Coordination Review",
      description: "We review and organize your documents for trustee center submission.",
      icon: Building2
    },
    {
      title: "Trustee Processing",
      description: "Official RERA trustee center processes and verifies your documents.",
      icon: Fingerprint
    },
    {
      title: "Ejari Registration",
      description: "Official Ejari certificate issued by authorized trustee center.",
      icon: CheckCircle2
    }
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-white selection:bg-emerald-500/30">
      <SEOMeta 
        title="Ejari Coordination Dubai | Easy Registration | DeliWer"
        description="DeliWer coordinates your Ejari registration through official RERA trustee centers. Digital facilitation. Simple. Compliant. Fast."
      />
      <Navigation />

      {/* Hero Section */}
      <section className="relative py-24 px-4 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-emerald-500/10 to-transparent pointer-events-none" />
        <div className="max-w-7xl mx-auto text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-sm font-bold mb-6">
              <ShieldCheck className="w-4 h-4" />
              EJARI COORDINATION SERVICE
            </div>
            <h1 className="text-5xl md:text-7xl font-black uppercase tracking-tighter mb-6 leading-none">
              Digital Ejari <span className="text-emerald-500">Registration Assistance</span>
            </h1>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto mb-4 font-bold uppercase italic">
              Complete your Ejari registration in a few simple steps with guidance from our team.
            </p>
            {/* Video & Certificate Section */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start mb-12">
              <div className="relative h-64 md:h-[400px] rounded-3xl overflow-hidden border border-white/10 shadow-2xl">
                <img 
                  src="https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800&q=80" 
                  alt="Official Ejari Certificate" 
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 to-transparent flex items-end p-6">
                  <p className="text-white font-black uppercase text-sm tracking-widest">Official Ejari Coordination</p>
                </div>
              </div>
              <div className="rounded-3xl overflow-hidden border border-white/10 bg-slate-900 shadow-2xl">
                <div className="aspect-video relative group cursor-pointer">
                  <video 
                    id="ejari-video"
                    className="w-full h-full object-cover"
                    controls
                    playsInline
                    muted={false}
                    autoPlay={false}
                    preload="metadata"
                    poster="/deliwer-logo.png"
                    onClick={(e) => {
                      const video = e.currentTarget;
                      if (video.paused) {
                        video.play();
                      } else {
                        video.pause();
                      }
                    }}
                  >
                    <source src="https://deliwer.com/attached_assets/Ejari-Service-Final_injaz_1772144918784.mp4" type="video/mp4" />
                    Your browser does not support the video tag.
                  </video>
                </div>
                <div className="p-4 bg-slate-900/50 backdrop-blur-sm border-t border-white/5 text-left">
                  <p className="text-sm text-gray-400 font-medium">
                    Watch: How DeliWer coordinates your Ejari registration from home.
                  </p>
                </div>
              </div>
            </div>

            <div className="flex flex-col md:flex-row gap-4 justify-center">
              <div className="flex flex-col gap-2 w-full md:w-auto">
                <p className="text-xs text-emerald-500 font-black uppercase tracking-widest mb-1 text-center">Fill in your details below and our team will assist you with your Ejari registration</p>
                <Button size="lg" className="bg-emerald-600 hover:bg-emerald-500 font-black h-16 px-10 rounded-2xl text-lg shadow-lg shadow-emerald-900/20" onClick={handleWhatsApp}>
                  <MessageSquare className="w-6 h-6 mr-2" />
                  Start My Ejari Registration
                </Button>
                <p className="text-[10px] text-gray-500 font-bold uppercase tracking-tighter mt-1 italic text-center">Our team will review your details and guide you through the Ejari registration process.</p>
              </div>
              <Link href="/relocate">
                <Button size="lg" variant="outline" className="border-white/10 hover:bg-white/5 font-black h-16 px-10 rounded-2xl text-lg mt-auto md:mt-6">
                  <Zap className="w-6 h-6 mr-2" />
                  Explore Move-In Concierge
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-24 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {steps.map((step, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="bg-white/5 border-white/10 h-full hover:border-emerald-500/50 transition-colors">
                  <CardHeader>
                    <div className="w-12 h-12 rounded-xl bg-emerald-500/20 flex items-center justify-center mb-4">
                      <step.icon className="w-6 h-6 text-emerald-400" />
                    </div>
                    <CardTitle className="text-xl font-bold text-white">{step.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-400 leading-relaxed">{step.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Standard Funnel Section */}
      <section className="max-w-4xl mx-auto py-20 px-6 mb-24 bg-emerald-950/20 border border-emerald-500/20 rounded-[3rem] text-center space-y-8">
        <div className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-black uppercase tracking-widest">
          The DeliWer Standard
        </div>
        <h2 className="text-4xl md:text-6xl font-black text-white uppercase tracking-tighter italic">
          Ejari Done. Now What?
        </h2>
        <p className="text-gray-300 text-lg font-medium italic max-w-2xl mx-auto">
          Ejari is just the foundation. Most residents now follow up with our standard Move-In Activation to ensure the home is technically ready.
        </p>
        <div className="flex flex-col md:flex-row items-center justify-center gap-4 pt-4">
          <Link href="/relocate">
            <Button size="lg" className="bg-emerald-600 hover:bg-emerald-500 text-white font-black rounded-2xl px-10 h-16 text-xl shadow-xl transition-all w-full md:w-auto">
              Start Move-In Activation (AED 399)
            </Button>
          </Link>
          <Link href="/residents">
            <Button size="lg" variant="outline" className="border-white/10 hover:bg-white/5 text-white font-black rounded-2xl px-10 h-16 text-xl w-full md:w-auto">
              Explore Resident Services
            </Button>
          </Link>
        </div>
      </section>

      {/* Service Clarification Section */}
      <section className="py-24 px-4 bg-emerald-600">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-5xl font-black uppercase mb-8 text-slate-950">Coordination Through Official Channels</h2>
          <p className="text-xl text-emerald-100 mb-8">
            DeliWer coordinates and facilitates your Ejari registration through authorized RERA Appointed Trustee Centers. We streamline the process, but all registrations are completed by official channels.
          </p>
          
          {/* Service Scope Clarification */}
          <div className="bg-slate-950/20 rounded-2xl p-6 mb-12 border border-slate-950/10 text-left">
            <h3 className="text-slate-950 font-black uppercase text-sm mb-3 flex items-center gap-2">
              <ShieldCheck className="w-4 h-4" />
              Our Role
            </h3>
            <p className="text-slate-900 text-sm leading-relaxed font-medium">
              DeliWer is a service provider for coordination and facilitation. We guide tenants and landlords through the Ejari process via WhatsApp, help organize required documentation, and coordinate submissions with official RERA-appointed trustee centers. All Ejari registrations, verifications, and official certificates are issued by authorized trustee centers in compliance with Dubai Land Department (DLD) regulations. <span className="text-slate-950 font-black">System integrations with trustee center backends and RERA records are under development. Biometric authentication features will be available through future DLD REST app integration.</span>
            </p>
          </div>

          <div className="flex justify-center gap-8 items-center flex-wrap">
            <div className="flex items-center gap-2 text-slate-950 font-black uppercase tracking-wider">
              <CheckCircle2 className="w-6 h-6" />
              Official Channel Coordination
            </div>
            <div className="flex items-center gap-2 text-slate-950 font-black uppercase tracking-wider">
              <CheckCircle2 className="w-6 h-6" />
              DLD Compliant Process
            </div>
            <div className="flex items-center gap-2 text-slate-950 font-black uppercase tracking-wider">
              <CheckCircle2 className="w-6 h-6" />
              Trusted Facilitation
            </div>
          </div>
        </div>
      </section>

      {/* SEO Content Section */}
      <section className="py-24 px-4 bg-white/5">
        <div className="max-w-4xl mx-auto prose prose-invert">
          <h2 className="text-3xl font-black uppercase mb-6">Why Choose DeliWer for Ejari Coordination?</h2>
          <p>
            Ejari is the foundation of your life in Dubai. It is mandatory for DEWA activation, internet installation, and residency visa applications. Traditional Ejari registration can take days, involving physical visits to typing centers.
          </p>
          <h3>WhatsApp-First Coordination</h3>
          <p>
            DeliWer transforms the Ejari process into a seamless WhatsApp experience. We guide you through documentation requirements, coordinate with official trustee centers, and ensure your registration is submitted correctly. No physical visits needed—we handle the coordination.
          </p>
          <h3>Official Channel Compliance</h3>
          <p>
            All Ejari registrations are processed through authorized RERA-appointed trustee centers in full compliance with Dubai Land Department regulations. DeliWer's role is to facilitate and coordinate, ensuring a smooth experience while maintaining all official requirements.
          </p>
          <h3>Future Enhancements</h3>
          <p>
            We are developing advanced features including direct trustee center backend integrations and biometric authentication through the DLD REST app. These will further streamline the process in the coming months.
          </p>
        </div>
      </section>
    </div>
  );
}
