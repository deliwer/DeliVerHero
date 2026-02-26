import { SEOMeta } from "@/components/seo-meta";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MessageSquare, CheckCircle2, ShieldCheck, Fingerprint, Building2, ClipboardCheck } from "lucide-react";
import { motion } from "framer-motion";

export default function EjariDubai() {
  const handleWhatsApp = () => {
    const text = "Hi DeliWer, I need Ejari verification and biometrics support.";
    window.open(`https://wa.me/971523946311?text=${encodeURIComponent(text)}`, '_blank');
  };

  const steps = [
    {
      title: "Document Submission",
      description: "Upload your tenancy contract and Emirates ID via WhatsApp.",
      icon: ClipboardCheck
    },
    {
      title: "Trustee Verification",
      description: "As an appointed trustee center, we verify your documents instantly.",
      icon: Building2
    },
    {
      title: "Biometric Authentication",
      description: "Secure verification via UAE Pass biometrics integration.",
      icon: Fingerprint
    },
    {
      title: "Instant Ejari",
      description: "Receive your official Ejari certificate within minutes.",
      icon: CheckCircle2
    }
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-white selection:bg-emerald-500/30">
      <SEOMeta 
        title="Ejari Verification Dubai | Trustee Center & Biometrics | DeliWer"
        description="Official Ejari verification for tenants and landlords. Secure biometric authentication via UAE Pass. Fast, digital, and reliable."
      />

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
              APPOINTED TRUSTEE CENTER
            </div>
            <h1 className="text-5xl md:text-7xl font-black uppercase tracking-tighter mb-6 leading-none">
              Digital Ejari <span className="text-emerald-500">Verification</span>
            </h1>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto mb-10">
              Tenants & Landlords: Complete your Ejari registration instantly with biometric verification. No queues, no hassle.
            </p>

            {/* Video Explanation Section */}
            <div className="max-w-4xl mx-auto mb-12 rounded-3xl overflow-hidden border border-white/10 bg-slate-900 shadow-2xl">
              <div className="aspect-video relative group cursor-pointer">
                <video 
                  id="ejari-video"
                  className="w-full h-full object-cover"
                  controls
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
                  <source src="/attached_assets/Ejari-Service-Final_injaz_1772144918784.mp4" type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
              </div>
              <div className="p-4 bg-slate-900/50 backdrop-blur-sm border-t border-white/5">
                <p className="text-sm text-gray-400 font-medium">
                  Watch: How DeliWer & AQARI (Injaz) facilitate your Ejari Trustee Center journey.
                </p>
              </div>
            </div>

            <div className="flex flex-col md:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-emerald-600 hover:bg-emerald-500 font-black h-16 px-10 rounded-2xl text-lg shadow-lg shadow-emerald-900/20" onClick={handleWhatsApp}>
                <MessageSquare className="w-6 h-6 mr-2" />
                Start via WhatsApp
              </Button>
              <Button size="lg" variant="outline" className="border-white/10 hover:bg-white/5 font-black h-16 px-10 rounded-2xl text-lg">
                <Fingerprint className="w-6 h-6 mr-2" />
                UAE Pass Biometrics
              </Button>
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

      {/* Trust Section */}
      <section className="py-24 px-4 bg-emerald-600">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-5xl font-black uppercase mb-8 text-slate-950">Secure Biometric Verification</h2>
          <p className="text-xl text-emerald-100 mb-8">
            We utilize UAE Pass biometrics to ensure the highest level of security for both landlords and tenants. Our trustee center status allows us to issue Ejari certificates directly to your email.
          </p>
          
          {/* Full Disclaimer */}
          <div className="bg-slate-950/20 rounded-2xl p-6 mb-12 border border-slate-950/10 text-left">
            <h3 className="text-slate-950 font-black uppercase text-sm mb-3 flex items-center gap-2">
              <ShieldCheck className="w-4 h-4" />
              Full Service Disclaimer
            </h3>
            <p className="text-slate-900 text-sm leading-relaxed font-medium">
              DeliWer operates as a digital facilitation platform in partnership with <span className="font-bold">AQARI (Injaz)</span>, an authorized RERA Appointed Trustee Center. All Ejari services, including contract registration, verification, and biometric processing, are carried out through our partner's official Trustee Center status. We facilitate the secure collection of documentation and coordinate the UAE Pass biometric authentication process to ensure compliance with Dubai Land Department (DLD) regulations.
            </p>
          </div>

          <div className="flex justify-center gap-8 items-center flex-wrap">
            <div className="flex items-center gap-2 text-slate-950 font-black uppercase tracking-wider">
              <CheckCircle2 className="w-6 h-6" />
              Real-time Validation
            </div>
            <div className="flex items-center gap-2 text-slate-950 font-black uppercase tracking-wider">
              <CheckCircle2 className="w-6 h-6" />
              Official RERA Approved
            </div>
            <div className="flex items-center gap-2 text-slate-950 font-black uppercase tracking-wider">
              <CheckCircle2 className="w-6 h-6" />
              Instant Certificate
            </div>
          </div>
        </div>
      </section>

      {/* SEO Content Section */}
      <section className="py-24 px-4 bg-white/5">
        <div className="max-w-4xl mx-auto prose prose-invert">
          <h2 className="text-3xl font-black uppercase mb-6">Why Choose DeliWer for Ejari?</h2>
          <p>
            Ejari is the foundation of your life in Dubai. It is mandatory for DEWA activation, internet installation, and residency visa applications. Traditional Ejari registration can take days, involving physical visits to typing centers.
          </p>
          <h3>Digital-First Approach</h3>
          <p>
            DeliWer transforms this process into a seamless digital experience. By integrating WhatsApp with our trustee center backend, we allow you to upload documents from your phone. Our system automatically validates the tenancy contract against RERA records.
          </p>
          <h3>Biometrics & UAE Pass</h3>
          <p>
            Security is paramount. We use biometric authentication (similar to UAE Pass) to verify the identity of the signer. This prevents fraud and ensures that the Ejari is issued correctly the first time.
          </p>
        </div>
      </section>
    </div>
  );
}
