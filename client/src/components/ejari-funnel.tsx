import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  FileText, X as XIcon, CheckCircle2, MessageCircle,
  ChevronRight, Truck, Sparkles, Zap, Package, Droplets, Wrench,
  ClipboardList, LogOut, Home, ArrowLeftRight
} from "lucide-react";

export type EjariScenario = "register" | "cancel" | "move" | "leaving";

const SCENARIOS = [
  { key: "register" as EjariScenario, icon: FileText, label: "Register Ejari", desc: "New tenancy contract registration", color: "emerald" },
  { key: "cancel" as EjariScenario, icon: LogOut, label: "Cancel Ejari", desc: "Terminating my tenancy contract", color: "amber" },
  { key: "move" as EjariScenario, icon: ArrowLeftRight, label: "Move to New Apartment", desc: "Cancel old, register new Ejari", color: "blue" },
  { key: "leaving" as EjariScenario, icon: XIcon, label: "Leaving Dubai", desc: "Full exit & closure coordination", color: "red" },
];

const EJARI_STATUS_OPTIONS = ["Not yet started", "Documents ready", "Submitted — awaiting approval", "Need to cancel existing Ejari"];
const APARTMENT_SIZES = ["Studio", "1 Bedroom", "2 Bedrooms", "3 Bedrooms", "4+ Bedrooms / Villa"];

const ADDONS = [
  { key: "movers", label: "Movers Coordination", icon: Truck },
  { key: "cleaning", label: "Cleaning Service", icon: Sparkles },
  { key: "dewa", label: "DEWA Activation", icon: Zap },
  { key: "storage", label: "Storage Service", icon: Package },
  { key: "water", label: "Water Filter Installation", icon: Droplets },
  { key: "maintenance", label: "Maintenance Inspection", icon: Wrench },
];

const COLOR_BORDER: Record<string, string> = {
  emerald: "border-emerald-500 bg-emerald-500/10 text-emerald-400",
  amber: "border-amber-500 bg-amber-500/10 text-amber-400",
  blue: "border-blue-500 bg-blue-500/10 text-blue-400",
  red: "border-red-500 bg-red-500/10 text-red-400",
};
const COLOR_BTN: Record<string, string> = {
  emerald: "bg-emerald-600 hover:bg-emerald-500",
  amber: "bg-amber-600 hover:bg-amber-500",
  blue: "bg-blue-600 hover:bg-blue-500",
  red: "bg-red-600 hover:bg-red-500",
};

interface Props {
  open: boolean;
  onClose: () => void;
  initialScenario?: EjariScenario;
}

export function EjariFunnel({ open, onClose, initialScenario }: Props) {
  const [step, setStep] = useState(initialScenario ? 2 : 1);
  const [scenario, setScenario] = useState<EjariScenario | null>(initialScenario ?? null);
  const [form, setForm] = useState({ name: "", whatsapp: "", area: "", apartmentSize: "", moveDate: "", ejariStatus: "" });
  const [addons, setAddons] = useState<string[]>([]);
  const [refCode, setRefCode] = useState<string | null>(null);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const ref = params.get("ref") || sessionStorage.getItem("deliwer_ref") || localStorage.getItem("deliwer_ejari_ref");
    if (ref) setRefCode(ref);
  }, []);

  useEffect(() => {
    if (open) {
      if (initialScenario) { setScenario(initialScenario); setStep(2); }
      else { setStep(1); setScenario(null); }
      setForm({ name: "", whatsapp: "", area: "", apartmentSize: "", moveDate: "", ejariStatus: "" });
      setAddons([]);
    }
  }, [open, initialScenario]);

  const toggleAddon = (key: string) => setAddons(prev => prev.includes(key) ? prev.filter(a => a !== key) : [...prev, key]);

  const sc = SCENARIOS.find(s => s.key === scenario);
  const activeColor = sc?.color ?? "emerald";
  const activeBorder = COLOR_BORDER[activeColor];
  const activeBtn = COLOR_BTN[activeColor];

  const sendWhatsApp = () => {
    const addonLabels = addons.map(k => ADDONS.find(a => a.key === k)?.label).filter(Boolean).join(", ");
    const ref = refCode ? `\nReferral: ${refCode}` : "";
    const source = `\nSource: ${window.location.pathname}`;
    const ts = `\nTimestamp: ${new Date().toLocaleString("en-GB", { timeZone: "Asia/Dubai" })}`;
    const msg = [
      `Hello, I need help with Ejari and relocation. I submitted the form on deliwer.com.`,
      `Service: ${sc?.label ?? "Ejari enquiry"}.`,
      form.name ? `Name: ${form.name}.` : "",
      form.whatsapp ? `WhatsApp: ${form.whatsapp}.` : "",
      form.area ? `Area: ${form.area}.` : "",
      form.apartmentSize ? `Apt size: ${form.apartmentSize}.` : "",
      form.moveDate ? `Move date: ${form.moveDate}.` : "",
      form.ejariStatus ? `Ejari status: ${form.ejariStatus}.` : "",
      addonLabels ? `Add-ons: ${addonLabels}.` : "",
      ref, source, ts,
    ].filter(Boolean).join(" ");
    window.open(`https://wa.me/971523946311?text=${encodeURIComponent(msg)}`, "_blank");
    setStep(4);
  };

  return (
    <Dialog open={open} onOpenChange={v => !v && onClose()}>
      <DialogContent className="bg-slate-900 border-slate-700 text-white max-w-lg w-full rounded-3xl p-0 overflow-hidden">
        <div className="p-6 border-b border-slate-700 flex items-center justify-between">
          <div>
            <div className="text-[10px] text-emerald-400 font-black uppercase tracking-widest mb-1">Step {step} of 4</div>
            <DialogTitle className="text-lg font-black uppercase tracking-tight text-white">
              {step === 1 && "What do you need help with?"}
              {step === 2 && "Your tenancy details"}
              {step === 3 && "Any add-on services?"}
              {step === 4 && "Request received!"}
            </DialogTitle>
          </div>
          <button onClick={onClose} className="text-gray-500 hover:text-white transition-colors"><XIcon className="w-5 h-5" /></button>
        </div>

        <div className="p-6 space-y-3 max-h-[70vh] overflow-y-auto">

          {step === 1 && (
            <div className="space-y-3">
              {SCENARIOS.map(s => {
                const Icon = s.icon;
                const isSelected = scenario === s.key;
                return (
                  <button key={s.key} data-testid={`ejari-scenario-${s.key}`} onClick={() => setScenario(s.key)}
                    className={`w-full flex items-center gap-4 p-4 rounded-2xl border-2 transition-all text-left ${isSelected ? COLOR_BORDER[s.color] : "border-slate-700 bg-slate-800 hover:border-slate-500"}`}>
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

          {step === 2 && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1.5">
                  <Label className="text-[11px] font-black uppercase tracking-widest text-gray-400">Tenant Name</Label>
                  <Input data-testid="ejari-input-name" value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))} placeholder="Full name" className="bg-slate-800 border-slate-600 text-white placeholder:text-gray-600 rounded-xl h-11" />
                </div>
                <div className="space-y-1.5">
                  <Label className="text-[11px] font-black uppercase tracking-widest text-gray-400">WhatsApp Number</Label>
                  <Input data-testid="ejari-input-whatsapp" value={form.whatsapp} onChange={e => setForm(f => ({ ...f, whatsapp: e.target.value }))} placeholder="+971 50 000 0000" className="bg-slate-800 border-slate-600 text-white placeholder:text-gray-600 rounded-xl h-11" />
                </div>
              </div>
              <div className="space-y-1.5">
                <Label className="text-[11px] font-black uppercase tracking-widest text-gray-400">Property Area</Label>
                <Input data-testid="ejari-input-area" value={form.area} onChange={e => setForm(f => ({ ...f, area: e.target.value }))} placeholder="e.g. JBR, Marina, DIFC, Business Bay" className="bg-slate-800 border-slate-600 text-white placeholder:text-gray-600 rounded-xl h-11" />
              </div>
              <div className="space-y-1.5">
                <Label className="text-[11px] font-black uppercase tracking-widest text-gray-400">Apartment Size</Label>
                <div className="flex flex-wrap gap-2">
                  {APARTMENT_SIZES.map(size => (
                    <button key={size} data-testid={`ejari-size-${size.replace(/\s+/g, "-").toLowerCase()}`} onClick={() => setForm(f => ({ ...f, apartmentSize: size }))}
                      className={`px-3 py-1.5 rounded-xl text-xs font-black uppercase tracking-tight border-2 transition-all ${form.apartmentSize === size ? "border-emerald-500 bg-emerald-500/10 text-emerald-400" : "border-slate-700 bg-slate-800 text-gray-400 hover:border-slate-500"}`}>
                      {size}
                    </button>
                  ))}
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1.5">
                  <Label className="text-[11px] font-black uppercase tracking-widest text-gray-400">Move Date</Label>
                  <Input data-testid="ejari-input-movedate" type="date" value={form.moveDate} onChange={e => setForm(f => ({ ...f, moveDate: e.target.value }))} className="bg-slate-800 border-slate-600 text-white rounded-xl h-11 [color-scheme:dark]" />
                </div>
                <div className="space-y-1.5">
                  <Label className="text-[11px] font-black uppercase tracking-widest text-gray-400">Ejari Status</Label>
                  <select data-testid="ejari-input-status" value={form.ejariStatus} onChange={e => setForm(f => ({ ...f, ejariStatus: e.target.value }))}
                    className="w-full bg-slate-800 border border-slate-600 text-white rounded-xl h-11 px-3 text-xs font-medium appearance-none">
                    <option value="">Select status...</option>
                    {EJARI_STATUS_OPTIONS.map(opt => <option key={opt} value={opt}>{opt}</option>)}
                  </select>
                </div>
              </div>
              <div className="bg-slate-800 border border-slate-600 rounded-xl p-3 flex items-center gap-3">
                <ClipboardList className="w-4 h-4 text-gray-500 shrink-0" />
                <p className="text-[11px] text-gray-500 font-medium">Tenancy contract can be uploaded via WhatsApp after this form — your coordinator will request it.</p>
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="space-y-3">
              <p className="text-[11px] text-gray-400 font-bold uppercase tracking-widest">Optional — select all that apply</p>
              {ADDONS.map(addon => {
                const Icon = addon.icon;
                const isChecked = addons.includes(addon.key);
                return (
                  <button key={addon.key} data-testid={`ejari-addon-${addon.key}`} onClick={() => toggleAddon(addon.key)}
                    className={`w-full flex items-center gap-4 p-4 rounded-2xl border-2 transition-all text-left ${isChecked ? activeBorder : "border-slate-700 bg-slate-800 hover:border-slate-600"}`}>
                    <Icon className="w-5 h-5 shrink-0" />
                    <span className="font-black text-sm uppercase tracking-tight text-white">{addon.label}</span>
                    {isChecked && <CheckCircle2 className="w-5 h-5 ml-auto shrink-0 text-current" />}
                  </button>
                );
              })}
            </div>
          )}

          {step === 4 && (
            <div className="text-center py-4 space-y-6">
              <div className="w-20 h-20 bg-emerald-500/10 rounded-full flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-10 h-10 text-emerald-400" />
              </div>
              <div className="space-y-2">
                <h3 className="text-xl font-black uppercase text-white">Ejari Coordination Request Received!</h3>
                <p className="text-gray-400 font-medium leading-relaxed">Your Ejari coordinator will confirm everything on WhatsApp shortly.</p>
              </div>
              <div className="bg-slate-800 rounded-2xl p-4 text-left space-y-2">
                <p className="text-[10px] text-gray-500 font-black uppercase tracking-widest">Next steps</p>
                {["Coordinator reviews your request", "You receive WhatsApp confirmation within 10 minutes", "Documents and scheduling handled for you"].map((item, i) => (
                  <div key={i} className="flex items-center gap-2 text-sm text-gray-300 font-medium">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />{item}
                  </div>
                ))}
              </div>
              <Button data-testid="ejari-btn-whatsapp-again" className={`w-full h-12 text-white font-black rounded-xl ${activeBtn}`} onClick={sendWhatsApp}>
                <MessageCircle className="w-4 h-4 mr-2" />Contact DeliWer Concierge
              </Button>
            </div>
          )}
        </div>

        {step < 4 && (
          <div className="p-6 border-t border-slate-700 flex gap-3">
            {step > 1 && (
              <Button variant="outline" className="border-slate-600 text-gray-400 hover:bg-slate-800 rounded-xl h-12 flex-1" onClick={() => setStep(s => s - 1)}>Back</Button>
            )}
            {step === 1 && <Button data-testid="ejari-btn-next-1" disabled={!scenario} className={`h-12 flex-1 text-white font-black rounded-xl ${activeBtn}`} onClick={() => setStep(2)}>Continue <ChevronRight className="w-4 h-4 ml-1" /></Button>}
            {step === 2 && <Button data-testid="ejari-btn-next-2" className={`h-12 flex-1 text-white font-black rounded-xl ${activeBtn}`} onClick={() => setStep(3)}>Add-on Services <ChevronRight className="w-4 h-4 ml-1" /></Button>}
            {step === 3 && <Button data-testid="ejari-btn-confirm" className={`h-12 flex-1 text-white font-black rounded-xl ${activeBtn}`} onClick={sendWhatsApp}><MessageCircle className="w-4 h-4 mr-2" />Confirm on WhatsApp</Button>}
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
