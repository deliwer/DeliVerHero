import { useState } from "react";
import { SEOMeta } from "@/components/seo-meta";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import {
  MessageSquare, CheckCircle2, ClipboardList, Zap, Truck, Home, ArrowRight, Star
} from "lucide-react";
import { Navigation } from "@/components/navigation";
import { motion } from "framer-motion";

const COST_MAP: Record<string, string> = {
  studio: "AED 2,800 – 3,600",
  "1br": "AED 3,200 – 4,200",
  "2br": "AED 3,800 – 5,200",
  "3br": "AED 4,500 – 6,000",
};

const APT_LABELS: Record<string, string> = {
  studio: "Studio",
  "1br": "1 Bedroom",
  "2br": "2 Bedroom",
  "3br": "3 Bedroom / Villa",
};

type FormState = {
  moveDate: string;
  aptType: string;
  area: string;
  needMovers: boolean | null;
  needEjari: boolean | null;
  needDEWA: boolean | null;
};

type PlanStep = { icon: React.ElementType; title: string; desc: string };

export default function MoveInPlan() {
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState<FormState>({
    moveDate: "",
    aptType: "",
    area: "",
    needMovers: null,
    needEjari: null,
    needDEWA: null,
  });

  const costRange = form.aptType ? COST_MAP[form.aptType] : "AED 3,250 – 4,500";
  const aptLabel = form.aptType ? APT_LABELS[form.aptType] : "your apartment";

  const planSteps: PlanStep[] = [
    ...(form.needEjari !== false
      ? [{ icon: ClipboardList, title: "Ejari Registration", desc: "DeliWer guides you through RERA-authorised trustee centers" }]
      : []),
    ...(form.needDEWA !== false
      ? [{ icon: Zap, title: "DEWA Activation", desc: "Electricity, water meter & security deposit set up" }]
      : []),
    ...(form.needMovers !== false
      ? [{ icon: Truck, title: "Schedule Movers", desc: "Vetted moving company coordinated to your move-in date" }]
      : []),
    { icon: Home, title: "Home Readiness Check", desc: "Water, shower filter, AC and ventilation confirmed ready" },
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.aptType) return;
    setSubmitted(true);
  };

  const handleWhatsApp = () => {
    const ref = (() => {
      try { return JSON.parse(localStorage.getItem("deliwer_ref") || "{}"); } catch { return {}; }
    })();

    const services = [
      form.needMovers !== false && "Movers coordination",
      form.needEjari !== false && "Ejari registration",
      form.needDEWA !== false && "DEWA activation",
      "Home readiness check",
    ].filter(Boolean).join(", ");

    const msg = [
      "Hi DeliWer, I've completed my Move-In Plan and want to start coordination.",
      "",
      `Apartment: ${aptLabel}`,
      `Area / Building: ${form.area || "TBD"}`,
      `Move-in date: ${form.moveDate || "TBD"}`,
      `Services needed: ${services}`,
      `Estimated vendor cost: ${costRange}`,
      ref.partner ? `Referred by: ${ref.partner}` : "",
      "",
      "Name:",
    ].filter((l) => l !== undefined).join("\n").trim();

    window.open(`https://wa.me/971523946311?text=${encodeURIComponent(msg)}`, "_blank");
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <SEOMeta
        title="Plan Your Dubai Move-In | DeliWer Move-In Coordinator"
        description="Fill in your move-in details and get a personalised coordination plan. DeliWer handles movers, Ejari, DEWA and more — at no extra charge."
      />
      <Navigation />

      <section className="pt-36 pb-16 px-4 max-w-2xl mx-auto space-y-10">

        {!submitted ? (
          <>
            {/* Header */}
            <div className="text-center space-y-3">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-500/10 border border-emerald-500/20 rounded-full text-emerald-400 text-xs font-black uppercase tracking-widest">
                <Star className="w-3.5 h-3.5" /> Move-In Planner
              </div>
              <h1 className="text-3xl md:text-5xl font-black uppercase tracking-tighter text-white">
                Build Your Move-In Plan
              </h1>
              <p className="text-gray-400 font-medium leading-relaxed">
                Answer a few quick questions and DeliWer will coordinate every service for your new home — at no extra cost.
              </p>
            </div>

            {/* Form */}
            <Card className="bg-white/5 border-white/10 rounded-2xl">
              <CardContent className="p-7">
                <form onSubmit={handleSubmit} className="space-y-6">

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    {/* Move-in date */}
                    <div className="space-y-1.5">
                      <Label className="text-[10px] font-black uppercase text-emerald-400 tracking-widest">Move-In Date</Label>
                      <Input
                        type="date"
                        data-testid="input-move-date"
                        value={form.moveDate}
                        onChange={(e) => setForm((p) => ({ ...p, moveDate: e.target.value }))}
                        className="bg-slate-900 border-white/15 text-white h-11"
                      />
                    </div>

                    {/* Apartment type */}
                    <div className="space-y-1.5">
                      <Label className="text-[10px] font-black uppercase text-emerald-400 tracking-widest">Apartment Type *</Label>
                      <Select
                        value={form.aptType}
                        onValueChange={(v) => setForm((p) => ({ ...p, aptType: v }))}
                      >
                        <SelectTrigger className="bg-slate-900 border-white/15 text-white h-11" data-testid="select-apt-type">
                          <SelectValue placeholder="Select size" />
                        </SelectTrigger>
                        <SelectContent className="bg-slate-900 border-white/15 text-white">
                          <SelectItem value="studio">Studio</SelectItem>
                          <SelectItem value="1br">1 Bedroom</SelectItem>
                          <SelectItem value="2br">2 Bedroom</SelectItem>
                          <SelectItem value="3br">3 Bedroom / Villa</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  {/* Area / building */}
                  <div className="space-y-1.5">
                    <Label className="text-[10px] font-black uppercase text-emerald-400 tracking-widest">Area or Building</Label>
                    <Input
                      placeholder="e.g. JVC, Dubai Marina, The Springs"
                      data-testid="input-area"
                      value={form.area}
                      onChange={(e) => setForm((p) => ({ ...p, area: e.target.value }))}
                      className="bg-slate-900 border-white/15 text-white placeholder:text-gray-600 h-11"
                    />
                  </div>

                  {/* Service toggles */}
                  {[
                    { key: "needMovers" as const, label: "Do you need movers?", desc: "Professional moving company to transport belongings" },
                    { key: "needEjari" as const, label: "Do you need Ejari registration?", desc: "Required before utilities can be activated" },
                    { key: "needDEWA" as const, label: "Do you need DEWA activation help?", desc: "Electricity, water meter and security deposit setup" },
                  ].map(({ key, label, desc }) => (
                    <div key={key} className="space-y-2">
                      <Label className="text-[10px] font-black uppercase text-emerald-400 tracking-widest">{label}</Label>
                      <p className="text-gray-600 text-xs font-medium">{desc}</p>
                      <div className="flex gap-3">
                        {["Yes", "No", "Not sure"].map((opt) => {
                          const val = opt === "Yes" ? true : opt === "No" ? false : null;
                          const active = form[key] === val;
                          return (
                            <button
                              key={opt}
                              type="button"
                              data-testid={`button-${key}-${opt.toLowerCase().replace(" ", "-")}`}
                              onClick={() => setForm((p) => ({ ...p, [key]: val }))}
                              className={`px-4 py-2 rounded-xl border text-xs font-black uppercase tracking-widest transition-all ${
                                active
                                  ? "bg-emerald-600 border-emerald-500 text-white"
                                  : "bg-white/5 border-white/10 text-gray-400 hover:border-emerald-500/40 hover:text-white"
                              }`}
                            >
                              {opt}
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  ))}

                  <Button
                    type="submit"
                    data-testid="button-generate-plan"
                    size="lg"
                    disabled={!form.aptType}
                    className="w-full h-13 bg-emerald-600 hover:bg-emerald-500 text-white font-black uppercase tracking-widest rounded-xl shadow-xl shadow-emerald-500/20 text-sm disabled:opacity-40"
                  >
                    Generate My Move-In Plan <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </form>
              </CardContent>
            </Card>
          </>
        ) : (
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} className="space-y-8">

            {/* Success header */}
            <div className="text-center space-y-3">
              <div className="w-14 h-14 rounded-full bg-emerald-500 flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-7 h-7 text-slate-950" />
              </div>
              <h2 className="text-3xl font-black uppercase tracking-tighter text-white">Your Move-In Plan</h2>
              <p className="text-gray-400 font-medium">
                Based on your answers, here's what DeliWer will coordinate for your {aptLabel} in {form.area || "Dubai"}.
              </p>
            </div>

            {/* Steps */}
            <Card className="bg-white/5 border-white/10 rounded-2xl">
              <CardContent className="p-6 space-y-4">
                {planSteps.map((step, i) => (
                  <div key={i} className="flex items-start gap-4">
                    <div className="w-9 h-9 rounded-xl bg-emerald-600 text-white font-black text-sm flex items-center justify-center shrink-0">
                      {i + 1}
                    </div>
                    <div className="flex-1 flex items-start gap-3">
                      <div className="p-2 rounded-lg bg-emerald-500/10 shrink-0">
                        <step.icon className="w-4 h-4 text-emerald-400" />
                      </div>
                      <div>
                        <p className="text-white font-black text-sm uppercase tracking-tight">{step.title}</p>
                        <p className="text-gray-400 text-xs font-medium mt-0.5">{step.desc}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Cost + key message */}
            <Card className="bg-emerald-950/30 border-emerald-500/25 rounded-2xl">
              <CardContent className="p-6 space-y-3">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-[10px] text-gray-500 font-black uppercase tracking-widest">Estimated vendor cost</p>
                    <p className="text-white font-black text-sm mt-0.5">{aptLabel}</p>
                  </div>
                  <p className="text-emerald-400 font-black text-2xl" data-testid="text-plan-cost">{costRange}</p>
                </div>
                <div className="border-t border-emerald-500/15 pt-3 space-y-1">
                  <p className="text-emerald-400 font-black text-xs uppercase tracking-widest">You pay only vendor costs.</p>
                  <p className="text-gray-400 text-xs font-medium leading-relaxed">
                    DeliWer coordinates everything. Our fee is paid by vendors — your total is exactly the same as booking each service yourself.
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* CTA */}
            <div className="space-y-3">
              <Button
                data-testid="button-plan-start-coordination"
                onClick={handleWhatsApp}
                size="lg"
                className="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-black rounded-xl h-14 text-sm uppercase tracking-widest shadow-xl shadow-emerald-900/30"
              >
                <MessageSquare className="w-5 h-5 mr-2" /> Start Coordination via WhatsApp
              </Button>
              <button
                onClick={() => setSubmitted(false)}
                className="w-full text-center text-gray-600 text-xs font-bold uppercase tracking-widest hover:text-gray-400 transition-colors"
              >
                ← Edit my plan
              </button>
            </div>
          </motion.div>
        )}
      </section>
    </div>
  );
}
