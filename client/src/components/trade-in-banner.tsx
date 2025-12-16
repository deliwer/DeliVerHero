import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Smartphone, ArrowRight, Calculator, Sparkles, Shield } from "lucide-react";
import { Link } from "wouter";
import { DirhamSymbol } from "@/components/ui/dirham-symbol";

export function TradeInBanner() {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <Card 
      className="relative overflow-hidden border-2 border-emerald-500/50 bg-gradient-to-br from-emerald-900/40 via-slate-900/40 to-blue-900/40 backdrop-blur-md shadow-2xl"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      data-testid="trade-in-banner"
    >
      <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/10 via-blue-500/10 to-purple-500/10 animate-pulse" />
      <CardContent className="relative p-6 md:p-8">
        <div className="grid lg:grid-cols-2 gap-6 items-center">
          <div className="space-y-4">
            <div className="inline-flex items-center gap-2 bg-emerald-500/20 px-4 py-2 rounded-full border border-emerald-500/50">
              <Sparkles className="w-4 h-4 text-emerald-400" />
              <span className="text-sm font-bold text-emerald-300">New Trade-In Program</span>
            </div>
            
            <h2 className="text-3xl md:text-4xl font-black text-white leading-tight">
              <span className="bg-gradient-to-r from-emerald-400 to-blue-400 bg-clip-text text-transparent">
                Got an old iPhone?
              </span>
              <br />
              <span className="text-white">See its value in 30 seconds</span>
            </h2>
            
            <p className="text-lg text-gray-300 max-w-xl">
              Trade it & earn <span className="font-bold text-emerald-400">DXBs</span> (Dubai Carbon Tokens) - your universal reward currency. Free pickup for AquaCafe loyalty members within 24 hours across Dubai, Sharjah & Abu Dhabi.
            </p>

            <div className="flex flex-col sm:flex-row gap-3">
              <Link href="/#trade-in-calculator">
                <Button 
                  size="lg" 
                  className="group bg-gradient-to-r from-emerald-600 to-blue-600 hover:from-emerald-700 hover:to-blue-700 text-white font-bold shadow-lg hover:shadow-xl transition-all transform hover:scale-105"
                  data-testid="button-get-instant-quote"
                >
                  <Calculator className="w-5 h-5 mr-2" />
                  Get Instant Quote
                  <ArrowRight className={`w-5 h-5 ml-2 transition-transform ${isHovered ? 'translate-x-1' : ''}`} />
                </Button>
              </Link>
              
              <Link href="/#how-it-works">
                <Button 
                  size="lg" 
                  variant="outline"
                  className="border-2 border-emerald-500/50 bg-slate-800/50 hover:bg-emerald-500/10 text-white font-semibold"
                  data-testid="button-how-it-works"
                >
                  How It Works
                </Button>
              </Link>
            </div>

            <div className="flex items-center gap-4 text-sm text-gray-400">
              <div className="flex items-center gap-2">
                <Shield className="w-4 h-4 text-emerald-400" />
                <span>Data wiped securely</span>
              </div>
              <div className="flex items-center gap-2">
                <Smartphone className="w-4 h-4 text-blue-400" />
                <span>Certified quality</span>
              </div>
            </div>
          </div>

          <div className="hidden lg:block">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-emerald-500 to-blue-500 blur-3xl opacity-30 animate-pulse" />
              <div className="relative bg-slate-800/50 backdrop-blur-sm rounded-2xl p-6 border border-slate-700">
                <h3 className="text-lg font-bold text-white mb-4">Example Trade-In Values</h3>
                <div className="space-y-3">
                  {[
                    { model: "iPhone 17 Pro Max 256GB", condition: "Excellent", value: "3,850", points: "38,500 DXBs", highlight: true },
                    { model: "iPhone 16 Pro 256GB", condition: "Excellent", value: "3,200", points: "32,000 DXBs" },
                    { model: "iPhone 15 Pro Max 256GB", condition: "Good", value: "2,400", points: "24,000 DXBs" },
                  ].map((item, idx) => (
                    <div key={idx} className="flex justify-between items-center bg-slate-900/50 p-3 rounded-lg border border-slate-700/50">
                      <div>
                        <p className="text-white font-semibold text-sm">{item.model}</p>
                        <p className="text-gray-400 text-xs">{item.condition} condition</p>
                      </div>
                      <div className="text-right">
                        <p className="text-emerald-400 font-bold"><DirhamSymbol size={12} className="mr-0.5" />{item.value}</p>
                        <p className="text-blue-400 text-xs">{item.points}</p>
                      </div>
                    </div>
                  ))}
                </div>
                <p className="text-gray-400 text-xs mt-3 text-center">
                  * Values shown are estimates. Final offer depends on device inspection.
                </p>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
