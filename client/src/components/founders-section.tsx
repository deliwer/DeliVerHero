import { Linkedin, Phone, ShieldCheck } from "lucide-react";
import hassanJawadPhoto from "@assets/IMG_6980_1761497124453.jpg";
import rubabHassanPhoto from "@assets/RH_LI_1761497200169.jpg";

export function FoundersSection() {
  return (
    <section className="py-16 px-4 bg-slate-900/30">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-white mb-4 flex items-center justify-center">
            <ShieldCheck className="w-8 h-8 text-emerald-500 mr-3" />
            Meet Our Founders
          </h2>
          <p className="text-gray-300 text-lg">Trusted leaders driving Dubai's sustainability revolution</p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {/* Hassan Jawad */}
          <div className="glass rounded-2xl p-8 border border-slate-600/50 text-center">
            <div className="w-32 h-32 mx-auto mb-6 rounded-full overflow-hidden border-4 border-blue-500/50 shadow-xl">
              <img 
                src={hassanJawadPhoto} 
                alt="Hassan Jawad - Founder" 
                className="w-full h-full object-cover"
              />
            </div>
            <h3 className="text-xl font-bold text-white mb-2">Hassan Jawad</h3>
            <p className="text-emerald-400 font-medium mb-4">Founder</p>
            <p className="text-gray-300 text-sm mb-6">
              Leading Dubai's circular economy transformation through innovative technology solutions and sustainable commerce practices.
            </p>
            <div className="space-y-3">
              <a
                href="mailto:formatix@deliwer.com"
                className="inline-flex items-center bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors w-full justify-center"
                data-testid="link-hassan-email"
              >
                <Linkedin className="w-4 h-4 mr-2" />
                formatix@deliwer.com
              </a>
              <a
                href="tel:+971523906019"
                className="inline-flex items-center bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 rounded-lg font-medium transition-colors w-full justify-center"
                data-testid="link-hassan-phone"
              >
                <Phone className="w-4 h-4 mr-2" />
                +971 52 390 6019
              </a>
            </div>
          </div>

          {/* Rubab Hassan */}
          <div className="glass rounded-2xl p-8 border border-slate-600/50 text-center">
            <div className="w-32 h-32 mx-auto mb-6 rounded-full overflow-hidden border-4 border-emerald-500/50 shadow-xl">
              <img 
                src={rubabHassanPhoto} 
                alt="Rubab Hassan - Co-Founder & MD" 
                className="w-full h-full object-cover"
              />
            </div>
            <h3 className="text-xl font-bold text-white mb-2">Rubab Hassan</h3>
            <p className="text-emerald-400 font-medium mb-4">Co-Founder & MD</p>
            <p className="text-gray-300 text-sm mb-6">
              Empowering Dubai's health and sustainability mission through expert wellness coaching and environmental advocacy.
            </p>
            <div className="space-y-3">
              <a
                href="mailto:sales@deliwer.com"
                className="inline-flex items-center bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors w-full justify-center"
                data-testid="link-rubab-email"
              >
                <Linkedin className="w-4 h-4 mr-2" />
                sales@deliwer.com
              </a>
              <a
                href="tel:+971567148381"
                className="inline-flex items-center bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 rounded-lg font-medium transition-colors w-full justify-center"
                data-testid="link-rubab-phone"
              >
                <Phone className="w-4 h-4 mr-2" />
                +971 56 714 8381
              </a>
            </div>
          </div>
        </div>

        
      </div>
    </section>
  );
}