import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Truck, FileText, Zap, Sparkles, Package, Droplets,
  PackageOpen, CheckCircle2, MessageCircle, Home, ArrowLeftRight, LogOut,
  ChevronRight, X
} from "lucide-react";

export type FunnelScenario = "moving-in" | "moving-within" | "leaving";

interface RelocationFunnelProps {
  open: boolean;
  onClose: () => void;
  initialScenario?: FunnelScenario;
}

const SCENARIOS = [
  {
    key: "moving-in" as FunnelScenario,
    label: "Moving Into a New Home",
    icon: Home,
    color: "emerald",
    desc: "Just signed a lease and need everything set up",
  },
  {
    key: "moving-within" as FunnelScenario,
    label: "Moving to a Cheaper Rent",
    icon: ArrowLeftRight,
    color: "blue",
    desc: "Relocating within Dubai or UAE for better value",
  },
  {
    key: "leaving" as FunnelScenario,
    label: "Leaving Dubai / Exit Service",
    icon: LogOut,
    color: "amber",
    desc: "Need a full exit coordination package",
  },
];

const SERVICES = [
  { key: "movers", label: "Movers", icon: Truck },
  { key: "ejari", label: "Ejari Registration", icon: FileText },
  { key: "dewa", label: "DEWA Activation / Closure", icon: Zap },
  { key: "cleaning", label: "Cleaning", icon: Sparkles },
  { key: "storage", label: "Storage", icon: Package },
  { key: "water", label: "Water / Air Readiness Check", icon: Droplets },
  { key: "packing", label: "Packing Assistance", icon: PackageOpen },
];

const APARTMENT_SIZES = ["Studio", "1 Bedroom", "2 Bedrooms", "3 Bedrooms", "4+ Bedrooms / Villa"];

export function RelocationFunnel({ open, onClose, initialScenario }: RelocationFunnelProps) {
  const [step, setStep] = useState(initialScenario ? 2 : 1);
  const [scenario, setScenario] = useState<FunnelScenario | null>(initialScenario ?? null);
  const [form, setForm] = useState({
    name: "",
    whatsapp: "",
    moveDate: "",
    currentArea: "",
    newArea: "",
    apartmentSize: "",
  });
  const [services, setServices] = useState<string[]>([]);
  const [refCode, setRefCode] = useState<string | null>(null);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const ref = params.get("ref") || sessionStorage.getItem("deliwer_ref");
    if (ref) setRefCode(ref);
  }, []);

  useEffect(() => {
    if (open) {
      if (initialScenario) {
        setScenario(initialScenario);
        setStep(2);
      } else {
        setStep(1);
        setScenario(null);
      }
      setForm({ name: "", whatsapp: "", moveDate: "", currentArea: "", newArea: "", apartmentSize: "" });
      setServices([]);
    }
  }, [open, initialScenario]);

  const toggleService = (key: string) => {
    setServices(prev => prev.includes(key) ? prev.filter(s => s !== key) : [...prev, key]);
  };

  const scenarioLabel = SCENARIOS.find(s => s.key === scenario)?.label ?? "";

  const handleWhatsApp = () => {
    const serviceLabels = services.map(k => SERVICES.find(s => s.key === k)?.label).filter(Boolean).join(", ");
    const ref = refCode ? `\nReferral source: ${refCode}` : "";
    const source = `\nPage source: ${window.location.pathname}`;
    const timestamp = `\nTimestamp: ${new Date().toLocaleString("en-GB", { timeZone: "Asia/Dubai" })}`;

    const msg = [
      `I need relocation coordination.`,
      `Scenario: ${scenarioLabel}.`,
      form.currentArea && form.newArea ? `Moving from ${form.currentArea} to ${form.newArea}.` : "",
      form.moveDate ? `Move date: ${form.moveDate}.` : "",
      form.apartmentSize ? `Apartment size: ${form.apartmentSize}.` : "",
      form.name ? `Name: ${form.name}.` : "",
      form.whatsapp ? `WhatsApp: ${form.whatsapp}.` : "",
      serviceLabels ? `Services needed: ${serviceLabels}.` : "",
      ref,
      source,
      timestamp,
    ].filter(Boolean).join(" ").trim();

    window.open(`https://wa.me/971523946311?text=${encodeURIComponent(msg)}`, "_blank");
    setStep(4);
  };

  const colorMap: Record<string, string> = {
    emerald: "border-emerald-500 bg-emerald-500/10 text-emerald-400",
    blue: "border-blue-500 bg-blue-500/10 text-blue-400",
    amber: "border-amber-500 bg-amber-500/10 text-amber-400",
  };
  const btnColorMap: Record<string, string> = {
    emerald: "bg-emerald-600 hover:bg-emerald-500",
    blue: "bg-blue-600 hover:bg-blue-500",
    amber: "bg-amber-600 hover:bg-amber-500",
  };
  const activeBg = scenario ? (colorMap[SCENARIOS.find(s => s.key === scenario)?.color ?? "emerald"] ?? colorMap.emerald) : colorMap.emerald;
  const activeBtn = scenario ? (btnColorMap[SCENARIOS.find(s => s.key === scenario)?.color ?? "emerald"] ?? btnColorMap.emerald) : btnColorMap.emerald;

  return (
    <Dialog open={open} onOpenChange={v => !v && onClose()}>
      <DialogContent className="bg-slate-900 border-slate-700 text-white max-w-lg w-full rounded-3xl p-0 overflow-hidden">
        <div className="p-6 border-b border-slate-700 flex items-center justify-between">
          <div>
            <div className="text-[10px] text-emerald-400 font-black uppercase tracking-widest mb-1">
              Step {step} of 4
            </div>
            <DialogTitle className="text-lg font-black uppercase tracking-tight text-white">
              {step === 1 && "What's your situation?"}
              {step === 2 && "Quick details"}
              {step === 3 && "Services needed"}
              {step === 4 && "You're all set!"}
            </DialogTitle>
          </div>
          <button onClick={onClose} className="text-gray-500 hover:text-white transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 space-y-4 max-h-[70vh] overflow-y-auto">

          {/* STEP 1 — Scenario */}
          {step === 1 && (
            <div className="space-y-3">
              {SCENARIOS.map(s => {
                const Icon = s.icon;
                const isSelected = scenario === s.key;
                return (
                  <button
                    key={s.key}
                    data-testid={`funnel-scenario-${s.key}`}
                    onClick={() => setScenario(s.key)}
                    className={`w-full flex items-center gap-4 p-4 rounded-2xl border-2 transition-all text-left ${
                      isSelected ? colorMap[s.color] : "border-slate-700 bg-slate-800 hover:border-slate-500"
                    }`}
                  >
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${isSelected ? "" : "bg-slate-700"}`}>
                      <Icon className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="font-black text-sm uppercase tracking-tight text-white">{s.label}</div>
                      <div className="text-[11px] text-gray-400 font-medium">{s.desc}</div>
                    </div>
                    {isSelected && <CheckCircle2 className="w-5 h-5 ml-auto shrink-0 text-current" />}
                  </button>
                );
              })}
            </div>
          )}

          {/* STEP 2 — Discovery Form */}
          {step === 2 && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1.5">
                  <Label className="text-[11px] font-black uppercase tracking-widest text-gray-400">Your Name</Label>
                  <Input
                    data-testid="funnel-input-name"
                    value={form.name}
                    onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
                    placeholder="Full name"
                    className="bg-slate-800 border-slate-600 text-white placeholder:text-gray-600 rounded-xl h-11"
                  />
                </div>
                <div className="space-y-1.5">
                  <Label className="text-[11px] font-black uppercase tracking-widest text-gray-400">WhatsApp Number</Label>
                  <Input
                    data-testid="funnel-input-whatsapp"
                    value={form.whatsapp}
                    onChange={e => setForm(f => ({ ...f, whatsapp: e.target.value }))}
                    placeholder="+971 50 000 0000"
                    className="bg-slate-800 border-slate-600 text-white placeholder:text-gray-600 rounded-xl h-11"
                  />
                </div>
              </div>
              <div className="space-y-1.5">
                <Label className="text-[11px] font-black uppercase tracking-widest text-gray-400">Move Date</Label>
                <Input
                  data-testid="funnel-input-movedate"
                  type="date"
                  value={form.moveDate}
                  onChange={e => setForm(f => ({ ...f, moveDate: e.target.value }))}
                  className="bg-slate-800 border-slate-600 text-white rounded-xl h-11 [color-scheme:dark]"
                />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1.5">
                  <Label className="text-[11px] font-black uppercase tracking-widest text-gray-400">Current Area</Label>
                  <Input
                    data-testid="funnel-input-current-area"
                    value={form.currentArea}
                    onChange={e => setForm(f => ({ ...f, currentArea: e.target.value }))}
                    placeholder="e.g. JBR, Marina"
                    className="bg-slate-800 border-slate-600 text-white placeholder:text-gray-600 rounded-xl h-11"
                  />
                </div>
                <div className="space-y-1.5">
                  <Label className="text-[11px] font-black uppercase tracking-widest text-gray-400">New Area</Label>
                  <Input
                    data-testid="funnel-input-new-area"
                    value={form.newArea}
                    onChange={e => setForm(f => ({ ...f, newArea: e.target.value }))}
                    placeholder="e.g. DIFC, Business Bay"
                    className="bg-slate-800 border-slate-600 text-white placeholder:text-gray-600 rounded-xl h-11"
                  />
                </div>
              </div>
              <div className="space-y-1.5">
                <Label className="text-[11px] font-black uppercase tracking-widest text-gray-400">Apartment Size</Label>
                <div className="flex flex-wrap gap-2">
                  {APARTMENT_SIZES.map(size => (
                    <button
                      key={size}
                      data-testid={`funnel-size-${size.replace(/\s+/g, "-").toLowerCase()}`}
                      onClick={() => setForm(f => ({ ...f, apartmentSize: size }))}
                      className={`px-3 py-1.5 rounded-xl text-xs font-black uppercase tracking-tight border-2 transition-all ${
                        form.apartmentSize === size
                          ? "border-emerald-500 bg-emerald-500/10 text-emerald-400"
                          : "border-slate-700 bg-slate-800 text-gray-400 hover:border-slate-500"
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* STEP 3 — Services */}
          {step === 3 && (
            <div className="space-y-3">
              <p className="text-[11px] text-gray-400 font-bold uppercase tracking-widest">Select all that apply</p>
              {SERVICES.map(s => {
                const Icon = s.icon;
                const isChecked = services.includes(s.key);
                return (
                  <button
                    key={s.key}
                    data-testid={`funnel-service-${s.key}`}
                    onClick={() => toggleService(s.key)}
                    className={`w-full flex items-center gap-4 p-4 rounded-2xl border-2 transition-all text-left ${
                      isChecked ? activeBg : "border-slate-700 bg-slate-800 hover:border-slate-600"
                    }`}
                  >
                    <Icon className="w-5 h-5 shrink-0" />
                    <span className="font-black text-sm uppercase tracking-tight text-white">{s.label}</span>
                    {isChecked && <CheckCircle2 className="w-5 h-5 ml-auto shrink-0 text-current" />}
                  </button>
                );
              })}
            </div>
          )}

          {/* STEP 4 — Confirmation */}
          {step === 4 && (
            <div className="text-center py-4 space-y-6">
              <div className="w-20 h-20 bg-emerald-500/10 rounded-full flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-10 h-10 text-emerald-400" />
              </div>
              <div className="space-y-2">
                <h3 className="text-xl font-black uppercase text-white">Coordinator Notified!</h3>
                <p className="text-gray-400 font-medium leading-relaxed">
                  Your relocation coordinator will confirm everything on WhatsApp shortly.
                </p>
              </div>
              <div className="bg-slate-800 rounded-2xl p-4 text-left space-y-2">
                <p className="text-[10px] text-gray-500 font-black uppercase tracking-widest">What happens next</p>
                {[
                  "A coordinator reviews your request",
                  "You get a WhatsApp confirmation within 10 minutes",
                  "All vendors are briefed and scheduled",
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-2 text-sm text-gray-300 font-medium">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                    {item}
                  </div>
                ))}
              </div>
              <Button
                data-testid="funnel-btn-whatsapp-again"
                className={`w-full h-12 text-white font-black rounded-xl ${activeBtn}`}
                onClick={() => handleWhatsApp()}
              >
                <MessageCircle className="w-4 h-4 mr-2" />
                Open WhatsApp
              </Button>
            </div>
          )}
        </div>

        {/* Footer nav */}
        {step < 4 && (
          <div className="p-6 border-t border-slate-700 flex gap-3">
            {step > 1 && (
              <Button
                variant="outline"
                className="border-slate-600 text-gray-400 hover:bg-slate-800 rounded-xl h-12 flex-1"
                onClick={() => setStep(s => s - 1)}
              >
                Back
              </Button>
            )}
            {step === 1 && (
              <Button
                data-testid="funnel-btn-next-1"
                disabled={!scenario}
                className={`h-12 flex-1 text-white font-black rounded-xl ${activeBtn}`}
                onClick={() => setStep(2)}
              >
                Continue <ChevronRight className="w-4 h-4 ml-1" />
              </Button>
            )}
            {step === 2 && (
              <Button
                data-testid="funnel-btn-next-2"
                className={`h-12 flex-1 text-white font-black rounded-xl ${activeBtn}`}
                onClick={() => setStep(3)}
              >
                Choose Services <ChevronRight className="w-4 h-4 ml-1" />
              </Button>
            )}
            {step === 3 && (
              <Button
                data-testid="funnel-btn-confirm"
                className={`h-12 flex-1 text-white font-black rounded-xl ${activeBtn}`}
                onClick={handleWhatsApp}
              >
                <MessageCircle className="w-4 h-4 mr-2" />
                Confirm on WhatsApp
              </Button>
            )}
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
