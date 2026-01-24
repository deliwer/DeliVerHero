import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Link } from "wouter";
import { Home, Plane, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

export default function LandingPage() {
  return (
    <div className="min-h-[80vh] flex flex-col items-center justify-center px-4 py-12 bg-dubai-gradient">
      <div className="max-w-4xl w-full text-center space-y-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-white mb-4">
            Welcome to <span className="text-emerald-400">DeliWer</span>
          </h1>
          <p className="text-xl text-emerald-100/80 max-w-2xl mx-auto">
            Your premium lifestyle partner in Dubai. Choose your journey to get started.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8 mt-12">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <Card className="bg-black/40 border-emerald-500/30 hover:border-emerald-500/60 transition-all duration-300 group overflow-hidden relative">
              <div className="absolute inset-0 bg-emerald-500/5 opacity-0 group-hover:opacity-100 transition-opacity" />
              <CardContent className="p-8 flex flex-col items-center text-center space-y-6">
                <div className="w-16 h-16 rounded-full bg-emerald-500/20 flex items-center justify-center text-emerald-400">
                  <Home className="w-8 h-8" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-white mb-2">Resident Mode</h2>
                  <p className="text-emerald-100/60 leading-relaxed">
                    Already in Dubai? Access home services, rewards, community events, and lifestyle perks.
                  </p>
                </div>
                <Link href="/home">
                  <Button className="w-full bg-emerald-600 hover:bg-emerald-500 text-white gap-2 h-12 text-lg">
                    Enter Dashboard <ArrowRight className="w-5 h-5" />
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <Card className="bg-black/40 border-blue-500/30 hover:border-blue-500/60 transition-all duration-300 group overflow-hidden relative">
              <div className="absolute inset-0 bg-blue-500/5 opacity-0 group-hover:opacity-100 transition-opacity" />
              <CardContent className="p-8 flex flex-col items-center text-center space-y-6">
                <div className="w-16 h-16 rounded-full bg-blue-500/20 flex items-center justify-center text-blue-400">
                  <Plane className="w-8 h-8" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-white mb-2">Relocation Mode</h2>
                  <p className="text-blue-100/60 leading-relaxed">
                    Planning to move? Discover visa assistance, housing, business setup, and concierge services.
                  </p>
                </div>
                <Link href="/relocate">
                  <Button className="w-full bg-blue-600 hover:bg-blue-500 text-white gap-2 h-12 text-lg">
                    Start Your Move <ArrowRight className="w-5 h-5" />
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
