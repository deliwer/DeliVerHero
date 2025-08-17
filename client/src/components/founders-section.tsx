import { Linkedin, Phone, ShieldCheck } from "lucide-react";

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
            <div className="w-24 h-24 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-6">
              <span className="text-2xl font-bold text-white">HJ</span>
            </div>
            <h3 className="text-xl font-bold text-white mb-2">Hassan Jawad</h3>
            <p className="text-emerald-400 font-medium mb-4">Founder, ReCommerce Pro</p>
            <p className="text-gray-300 text-sm mb-6">
              Leading Dubai's circular economy transformation through innovative technology solutions and sustainable commerce practices.
            </p>
            <a
              href="https://linkedin.com/in/formatix"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors"
            >
              <Linkedin className="w-4 h-4 mr-2" />
              Connect on LinkedIn
            </a>
          </div>

          {/* Rubab Hassan */}
          <div className="glass rounded-2xl p-8 border border-slate-600/50 text-center">
            <div className="w-24 h-24 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-full flex items-center justify-center mx-auto mb-6">
              <span className="text-2xl font-bold text-white">RH</span>
            </div>
            <h3 className="text-xl font-bold text-white mb-2">Rubab Hassan</h3>
            <p className="text-emerald-400 font-medium mb-2">Co-Founder & MD</p>
            <p className="text-amber-400 text-sm font-medium mb-4">Cancer Warrior & Health Coach</p>
            <p className="text-gray-300 text-sm mb-6">
              Empowering Dubai's health and sustainability mission through expert wellness coaching and environmental advocacy.
            </p>
            <div className="space-y-3">
              <a
                href="tel:+971567148381"
                className="inline-flex items-center bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 rounded-lg font-medium transition-colors w-full justify-center"
              >
                <Phone className="w-4 h-4 mr-2" />
                +971 56 714 8381
              </a>
              <p className="text-gray-400 text-xs">Available for health consultations</p>
            </div>
          </div>
        </div>

        {/* Trust Indicators */}
        <div className="mt-12 text-center">
          <div className="inline-flex items-center bg-slate-800/50 rounded-full px-6 py-3 border border-emerald-500/30">
            <ShieldCheck className="w-5 h-5 text-emerald-500 mr-2" />
            <span className="text-white font-medium">Trusted by 12,847+ Planet Heroes in Dubai</span>
          </div>
        </div>
      </div>
    </section>
  );
}