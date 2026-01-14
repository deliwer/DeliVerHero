import { Sparkles, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import heroImage from "@assets/stock_images/dubai_home_lifestyle_37638b6f.jpg";

export function AIInteractiveHero() {
  return (
    <section className="relative py-12 sm:py-16 lg:py-20 px-4 overflow-hidden">
      {/* Full-width Hero Background Image */}
      <div 
        className="absolute inset-0 w-full h-full"
        style={{
          backgroundImage: `url(${heroImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center center',
          backgroundRepeat: 'no-repeat',
        }}
      >
        {/* Dark overlay for text readability */}
        <div className="absolute inset-0 bg-gradient-to-br from-black/60 via-black/65 to-black/60"></div>
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto relative z-10 text-center">
        {/* Main Headlines */}
        <div className="mb-10 sm:mb-12">
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-4 leading-tight">
            <span className="text-white drop-shadow-lg">Shop smart.</span>
          </h1>
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-6 leading-tight">
            <span className="relative inline-block">
              <span className="absolute inset-0 bg-black/70 blur-md rounded-lg px-4 py-2"></span>
              <span className="relative bg-clip-text bg-gradient-to-r from-emerald-300 via-teal-200 to-cyan-300 drop-shadow-lg font-bold px-4 py-2 text-[#14b491]" 
                    style={{ 
                      textShadow: '0 0 30px rgba(16, 185, 129, 1), 0 0 50px rgba(20, 184, 166, 0.8)',
                      filter: 'contrast(1.2) brightness(1.3)',
                    }}>Renew. Reuse. Relocate.</span>
            </span>
          </h2>
          <p className="text-lg sm:text-xl text-white/90 font-medium max-w-3xl mx-auto drop-shadow-lg">
            Many who start here eventually call Dubai home.
          </p>
        </div>

        {/* CTAs */}
        <div className="max-w-md mx-auto space-y-3">
          <Link href="/residence/move-in-services">
            <Button
              className="w-full bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white px-8 py-6 text-lg font-semibold rounded-xl shadow-xl transform hover:scale-105 transition-all duration-300 border border-white/20"
              data-testid="button-get-home-service"
            >
              <Sparkles className="w-5 h-5 mr-2" />
              Get Home Service
            </Button>
          </Link>
          
          <Link href="/relocate">
            <Button
              variant="outline"
              className="w-full border-white/30 text-white backdrop-blur-sm bg-white/10 px-6 py-5 text-base font-medium rounded-lg hover:bg-white/20 transition-all duration-200"
              data-testid="button-why-dubai"
            >
              Why People Choose Dubai
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}