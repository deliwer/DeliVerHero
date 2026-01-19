import { Card, CardContent } from "@/components/ui/card";
import { TrendingUp, ChevronRight } from "lucide-react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";

export default function ExitPage() {
  return (
    <div className="min-h-screen bg-slate-950 pt-24 pb-12 px-4">
      <div className="max-w-4xl mx-auto">
        <Link href="/">
          <Button variant="ghost" className="text-gray-400 hover:text-white mb-8">
            <ChevronRight className="w-4 h-4 mr-2 rotate-180" />
            Back to Home
          </Button>
        </Link>
        
        <div className="flex items-center gap-6 mb-12">
          <div className="w-20 h-20 bg-red-500/20 rounded-3xl flex items-center justify-center shrink-0">
            <TrendingUp className="w-10 h-10 text-red-400" />
          </div>
          <div>
            <h1 className="text-4xl md:text-5xl font-black text-white uppercase tracking-tighter">Move-Out & Exit</h1>
            <p className="text-xl text-emerald-400 font-medium">A professional exit as smooth as your arrival.</p>
          </div>
        </div>

        <div className="grid gap-8">
          <Card className="bg-white/5 border-white/10 backdrop-blur-xl rounded-[2rem] overflow-hidden">
            <CardContent className="p-8 md:p-12">
              <h2 className="text-2xl font-bold text-white mb-6 uppercase">Phase 4: Closure</h2>
              <p className="text-gray-400 text-lg leading-relaxed mb-8">
                Handover, compliance, and utility closure. We handle the final details so you can focus on your next destination.
              </p>
              <ul className="space-y-4">
                {[
                  "Final inspection & repair coordination",
                  "Utility account closure",
                  "Security deposit recovery",
                  "Compliance documentation"
                ].map((item, i) => (
                  <li key={i} className="flex items-center gap-3 text-white font-medium">
                    <div className="w-2 h-2 bg-emerald-500 rounded-full" />
                    {item}
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}