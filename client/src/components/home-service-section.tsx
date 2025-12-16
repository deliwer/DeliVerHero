import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Droplets, 
  Smartphone, 
  Home, 
  ArrowRight, 
  Gift,
  Recycle
} from "lucide-react";

export function HomeServiceSection() {
  return (
    <section className="py-16 px-4 bg-gradient-to-br from-emerald-900/20 via-teal-900/10 to-blue-900/20" data-section="step-1">
      <div className="max-w-4xl mx-auto text-center">
        <Badge variant="secondary" className="mb-6 bg-emerald-500/20 text-emerald-400 border-emerald-500/30">
          <Home className="w-3 h-3 mr-1" />
          Home Service
        </Badge>
        
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-4" data-testid="text-home-service-section-title">
          Earn rewards through sustainable living
        </h2>
        <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
          Sustainable water, smart trade-ins, and everyday essentials — designed for life in Dubai.
        </p>

        {/* Service Cards */}
        <div className="grid md:grid-cols-3 gap-6 mb-10">
          <div className="glass rounded-2xl p-6 border border-emerald-500/30 bg-emerald-600/5">
            <div className="w-12 h-12 rounded-full bg-emerald-500/20 flex items-center justify-center mx-auto mb-4">
              <Droplets className="w-6 h-6 text-emerald-400" />
            </div>
            <h3 className="text-lg font-bold text-white mb-2">Water Solutions</h3>
            <p className="text-gray-400 text-sm">Premium filtration systems that eliminate plastic waste</p>
          </div>
          
          <div className="glass rounded-2xl p-6 border border-purple-500/30 bg-purple-600/5">
            <div className="w-12 h-12 rounded-full bg-purple-500/20 flex items-center justify-center mx-auto mb-4">
              <Smartphone className="w-6 h-6 text-purple-400" />
            </div>
            <h3 className="text-lg font-bold text-white mb-2">Smart Trade-In</h3>
            <p className="text-gray-400 text-sm">Turn old devices into value for sustainability products</p>
          </div>
          
          <div className="glass rounded-2xl p-6 border border-blue-500/30 bg-blue-600/5">
            <div className="w-12 h-12 rounded-full bg-blue-500/20 flex items-center justify-center mx-auto mb-4">
              <Gift className="w-6 h-6 text-blue-400" />
            </div>
            <h3 className="text-lg font-bold text-white mb-2">Rewards & Points</h3>
            <p className="text-gray-400 text-sm">Earn DXBs for every sustainable action</p>
          </div>
        </div>

        <Link href="/home-service">
          <Button size="lg" className="bg-emerald-600 hover:bg-emerald-500" data-testid="button-explore-home-services">
            <Recycle className="w-4 h-4 mr-2" />
            Explore Home Services
            <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        </Link>
      </div>
    </section>
  );
}
