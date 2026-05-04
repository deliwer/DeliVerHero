import { useState } from "react";
import { useLocation } from "wouter";
import { useMutation } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { CheckCircle, ChevronRight, Home, Sparkles, Droplets, Wrench, Wind, Tv, Building, Phone, MapPin, Calendar, User, MessageCircle, Share2, Copy } from "lucide-react";

const LOCATIONS = [
  "Downtown Dubai", "Dubai Marina", "JBR", "Business Bay", "DIFC",
  "Jumeirah", "Palm Jumeirah", "JLT", "Sports City", "Al Barsha",
  "Mirdif", "Deira", "Bur Dubai", "Dubai Hills", "Arabian Ranches",
  "Motor City", "Discovery Gardens", "International City", "Other",
];

const SERVICES = [
  { id: "water", label: "Water / Filtration", icon: Droplets, color: "bg-blue-50 border-blue-200 text-blue-700" },
  { id: "ac", label: "AC / Maintenance", icon: Wind, color: "bg-cyan-50 border-cyan-200 text-cyan-700" },
  { id: "cleaning", label: "Cleaning", icon: Sparkles, color: "bg-purple-50 border-purple-200 text-purple-700" },
  { id: "appliances", label: "Appliances", icon: Tv, color: "bg-orange-50 border-orange-200 text-orange-700" },
  { id: "maintenance", label: "General Maintenance", icon: Wrench, color: "bg-yellow-50 border-yellow-200 text-yellow-700" },
  { id: "property", label: "Looking for Property", icon: Building, color: "bg-emerald-50 border-emerald-200 text-emerald-700" },
];

function useRefId() {
  if (typeof window === "undefined") return null;
  return new URLSearchParams(window.location.search).get("ref");
}

export default function Capture() {
  const refId = useRefId();
  const [, navigate] = useLocation();

  const [step, setStep] = useState(1);
  const [intent, setIntent] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [propertyType, setPropertyType] = useState("");
  const [location, setLocation] = useState("");
  const [budget, setBudget] = useState("");
  const [timeline, setTimeline] = useState("");
  const [services, setServices] = useState<string[]>([]);
  const [waUrl, setWaUrl] = useState("");
  const [copied, setCopied] = useState(false);

  const submitMutation = useMutation({
    mutationFn: (body: any) => apiRequest("POST", "/api/tenant-capture/leads", body),
    onSuccess: async (res) => {
      const data = await res.json();
      setWaUrl(data.waUrl);
      setStep(5);
    },
  });

  const toggleService = (id: string) => {
    setServices(s => s.includes(id) ? s.filter(x => x !== id) : [...s, id]);
  };

  const handleSubmit = () => {
    submitMutation.mutate({
      name, phone, intent,
      propertyType, location, budget, timeline,
      servicesNeeded: services,
      referrerId: refId || undefined,
    });
  };

  const copyReferralLink = () => {
    const link = `${window.location.origin}/capture?ref=${refId || "SHARE"}`;
    navigator.clipboard.writeText(link);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const progress = Math.min((step / 4) * 100, 100);

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {step < 5 && (
        <div className="bg-white border-b border-gray-100 px-4 py-3 flex items-center gap-3">
          <div className="w-8 h-8 bg-emerald-500 rounded-full flex items-center justify-center">
            <Home className="w-4 h-4 text-white" />
          </div>
          <div className="flex-1">
            <p className="text-xs text-gray-500 font-medium">Step {Math.min(step, 4)} of 4</p>
            <div className="mt-1 h-1.5 bg-gray-100 rounded-full overflow-hidden">
              <div
                className="h-full bg-emerald-500 rounded-full transition-all duration-500"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>
          {refId && (
            <span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
              via {refId}
            </span>
          )}
        </div>
      )}

      <div className="flex-1 flex flex-col max-w-md mx-auto w-full px-4 py-6">

        {/* STEP 1 — Intent */}
        {step === 1 && (
          <div className="flex flex-col gap-5 animate-in fade-in slide-in-from-bottom-4 duration-300">
            <div>
              <h1 className="text-2xl font-black text-gray-900 leading-tight">
                Set up your new home<br />
                <span className="text-emerald-500">in 30 seconds</span>
              </h1>
              <p className="text-gray-500 text-sm mt-1">What brings you here today?</p>
            </div>
            <div className="flex flex-col gap-3">
              {[
                { id: "move-in", label: "I just moved in 🏠", sub: "Set up utilities, water, cleaning & more" },
                { id: "upgrade", label: "I'm upgrading my home ✨", sub: "Maintenance, appliances, or deep clean" },
                { id: "moving", label: "I'm looking to move 🔍", sub: "Find a property + pre-plan your setup" },
              ].map(opt => (
                <button
                  key={opt.id}
                  data-testid={`intent-${opt.id}`}
                  onClick={() => { setIntent(opt.id); setStep(2); }}
                  className="w-full text-left p-4 bg-white rounded-2xl border-2 border-gray-100 hover:border-emerald-400 hover:shadow-md transition-all group"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-bold text-gray-900 text-base">{opt.label}</p>
                      <p className="text-xs text-gray-500 mt-0.5">{opt.sub}</p>
                    </div>
                    <ChevronRight className="w-5 h-5 text-gray-300 group-hover:text-emerald-500 transition-colors" />
                  </div>
                </button>
              ))}
            </div>
            <div className="mt-2 p-4 bg-emerald-50 rounded-2xl border border-emerald-100">
              <p className="text-xs font-bold text-emerald-700 flex items-center gap-1.5">
                <Share2 className="w-3.5 h-3.5" /> Earn by referring
              </p>
              <p className="text-xs text-emerald-600 mt-1">
                Share your referral link and earn rewards for every person you bring in.
              </p>
              <button
                onClick={copyReferralLink}
                data-testid="button-copy-referral"
                className="mt-2 flex items-center gap-1.5 text-[11px] font-bold text-emerald-700 bg-white border border-emerald-200 px-3 py-1.5 rounded-full transition hover:bg-emerald-500 hover:text-white"
              >
                <Copy className="w-3 h-3" /> {copied ? "Copied!" : "Copy my referral link"}
              </button>
            </div>
          </div>
        )}

        {/* STEP 2 — Name + Phone */}
        {step === 2 && (
          <div className="flex flex-col gap-5 animate-in fade-in slide-in-from-bottom-4 duration-300">
            <div>
              <h2 className="text-2xl font-black text-gray-900">Let's get you sorted</h2>
              <p className="text-gray-500 text-sm mt-1">We'll send updates straight to WhatsApp</p>
            </div>
            <div className="flex flex-col gap-3">
              <div>
                <label className="text-xs font-bold text-gray-600 uppercase tracking-wider flex items-center gap-1 mb-1.5">
                  <User className="w-3.5 h-3.5" /> Your Name
                </label>
                <input
                  type="text"
                  data-testid="input-name"
                  value={name}
                  onChange={e => setName(e.target.value)}
                  placeholder="e.g. Ahmed Al Mansouri"
                  className="w-full px-4 py-3.5 rounded-2xl border-2 border-gray-100 focus:border-emerald-400 outline-none text-gray-900 text-base bg-white transition"
                />
              </div>
              <div>
                <label className="text-xs font-bold text-gray-600 uppercase tracking-wider flex items-center gap-1 mb-1.5">
                  <Phone className="w-3.5 h-3.5" /> WhatsApp Number
                </label>
                <input
                  type="tel"
                  data-testid="input-phone"
                  value={phone}
                  onChange={e => setPhone(e.target.value)}
                  placeholder="+971 50 000 0000"
                  className="w-full px-4 py-3.5 rounded-2xl border-2 border-gray-100 focus:border-emerald-400 outline-none text-gray-900 text-base bg-white transition"
                />
                <p className="text-xs text-gray-400 mt-1 ml-1">We'll only use this to send your setup summary</p>
              </div>
            </div>
            <div className="flex gap-3 mt-2">
              <button onClick={() => setStep(1)} className="flex-1 py-3.5 rounded-2xl border-2 border-gray-200 text-gray-600 font-bold text-sm transition hover:bg-gray-100">
                Back
              </button>
              <button
                data-testid="button-step2-next"
                onClick={() => { if (name.trim() && phone.trim()) setStep(3); }}
                disabled={!name.trim() || !phone.trim()}
                className="flex-2 flex-1 py-3.5 rounded-2xl bg-emerald-500 hover:bg-emerald-600 disabled:opacity-40 text-white font-bold text-sm transition flex items-center justify-center gap-2"
              >
                Continue <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* STEP 3 — Property details */}
        {step === 3 && (
          <div className="flex flex-col gap-5 animate-in fade-in slide-in-from-bottom-4 duration-300">
            <div>
              <h2 className="text-2xl font-black text-gray-900">Tell us about your home</h2>
              <p className="text-gray-500 text-sm mt-1">Helps us match you with the right services</p>
            </div>
            <div className="flex flex-col gap-4">
              <div>
                <label className="text-xs font-bold text-gray-600 uppercase tracking-wider mb-1.5 block">Property Type</label>
                <div className="flex gap-2">
                  {["Apartment", "Villa", "Office"].map(t => (
                    <button
                      key={t}
                      data-testid={`property-${t.toLowerCase()}`}
                      onClick={() => setPropertyType(t)}
                      className={`flex-1 py-3 rounded-xl border-2 font-bold text-sm transition ${propertyType === t ? "border-emerald-500 bg-emerald-50 text-emerald-700" : "border-gray-100 bg-white text-gray-600 hover:border-gray-300"}`}
                    >
                      {t}
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <label className="text-xs font-bold text-gray-600 uppercase tracking-wider flex items-center gap-1 mb-1.5">
                  <MapPin className="w-3.5 h-3.5" /> Location
                </label>
                <select
                  data-testid="select-location"
                  value={location}
                  onChange={e => setLocation(e.target.value)}
                  className="w-full px-4 py-3.5 rounded-2xl border-2 border-gray-100 focus:border-emerald-400 outline-none text-gray-900 text-base bg-white transition"
                >
                  <option value="">Select area...</option>
                  {LOCATIONS.map(l => <option key={l} value={l}>{l}</option>)}
                </select>
              </div>
              <div>
                <label className="text-xs font-bold text-gray-600 uppercase tracking-wider mb-1.5 block">Budget Range (AED/month)</label>
                <div className="grid grid-cols-2 gap-2">
                  {["Under 5k", "5k–10k", "10k–20k", "20k+"].map(b => (
                    <button
                      key={b}
                      data-testid={`budget-${b}`}
                      onClick={() => setBudget(b)}
                      className={`py-2.5 rounded-xl border-2 font-bold text-sm transition ${budget === b ? "border-emerald-500 bg-emerald-50 text-emerald-700" : "border-gray-100 bg-white text-gray-600 hover:border-gray-300"}`}
                    >
                      {b}
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <label className="text-xs font-bold text-gray-600 uppercase tracking-wider flex items-center gap-1 mb-1.5">
                  <Calendar className="w-3.5 h-3.5" /> Timeline
                </label>
                <div className="flex flex-col gap-2">
                  {[
                    { id: "immediate", label: "Immediate — I need help now" },
                    { id: "1-month", label: "Within the next month" },
                    { id: "browsing", label: "Just browsing for now" },
                  ].map(t => (
                    <button
                      key={t.id}
                      data-testid={`timeline-${t.id}`}
                      onClick={() => setTimeline(t.id)}
                      className={`w-full text-left px-4 py-3 rounded-xl border-2 font-medium text-sm transition ${timeline === t.id ? "border-emerald-500 bg-emerald-50 text-emerald-700" : "border-gray-100 bg-white text-gray-600 hover:border-gray-300"}`}
                    >
                      {t.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>
            <div className="flex gap-3 mt-2">
              <button onClick={() => setStep(2)} className="flex-1 py-3.5 rounded-2xl border-2 border-gray-200 text-gray-600 font-bold text-sm transition hover:bg-gray-100">Back</button>
              <button
                data-testid="button-step3-next"
                onClick={() => setStep(4)}
                className="flex-1 py-3.5 rounded-2xl bg-emerald-500 hover:bg-emerald-600 text-white font-bold text-sm transition flex items-center justify-center gap-2"
              >
                Continue <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* STEP 4 — Services */}
        {step === 4 && (
          <div className="flex flex-col gap-5 animate-in fade-in slide-in-from-bottom-4 duration-300">
            <div>
              <h2 className="text-2xl font-black text-gray-900">What do you need?</h2>
              <p className="text-gray-500 text-sm mt-1">Select all that apply — we'll match the right vendor</p>
            </div>
            <div className="grid grid-cols-2 gap-3">
              {SERVICES.map(s => {
                const Icon = s.icon;
                const active = services.includes(s.id);
                return (
                  <button
                    key={s.id}
                    data-testid={`service-${s.id}`}
                    onClick={() => toggleService(s.id)}
                    className={`relative p-4 rounded-2xl border-2 text-left transition-all ${active ? s.color + " border-current shadow-sm" : "bg-white border-gray-100 text-gray-600 hover:border-gray-300"}`}
                  >
                    {active && <CheckCircle className="w-4 h-4 absolute top-2.5 right-2.5 text-current opacity-70" />}
                    <Icon className="w-6 h-6 mb-2" />
                    <p className="text-xs font-bold leading-tight">{s.label}</p>
                  </button>
                );
              })}
            </div>
            <div className="flex gap-3 mt-2">
              <button onClick={() => setStep(3)} className="flex-1 py-3.5 rounded-2xl border-2 border-gray-200 text-gray-600 font-bold text-sm transition hover:bg-gray-100">Back</button>
              <button
                data-testid="button-submit"
                onClick={handleSubmit}
                disabled={submitMutation.isPending || services.length === 0}
                className="flex-1 py-3.5 rounded-2xl bg-[#25D366] hover:bg-[#1ebe57] disabled:opacity-40 text-white font-bold text-sm transition flex items-center justify-center gap-2"
              >
                {submitMutation.isPending ? (
                  <span className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                ) : (
                  <><MessageCircle className="w-4 h-4" /> Send via WhatsApp</>
                )}
              </button>
            </div>
          </div>
        )}

        {/* STEP 5 — Success + WhatsApp redirect */}
        {step === 5 && (
          <div className="flex flex-col items-center gap-6 py-6 animate-in fade-in slide-in-from-bottom-4 duration-300 text-center">
            <div className="w-20 h-20 bg-emerald-100 rounded-full flex items-center justify-center">
              <CheckCircle className="w-10 h-10 text-emerald-500" />
            </div>
            <div>
              <h2 className="text-2xl font-black text-gray-900">You're all set, {name}! 🎉</h2>
              <p className="text-gray-500 text-sm mt-2 max-w-xs mx-auto">
                Your request is ready. Tap below to send it to our team on WhatsApp — we'll get back to you within minutes.
              </p>
            </div>
            <a
              href={waUrl}
              target="_blank"
              rel="noopener noreferrer"
              data-testid="button-open-whatsapp"
              className="w-full py-4 rounded-2xl bg-[#25D366] hover:bg-[#1ebe57] text-white font-black text-base transition flex items-center justify-center gap-2 shadow-lg"
            >
              <MessageCircle className="w-5 h-5" /> Open WhatsApp Now
            </a>
            <div className="w-full p-4 bg-emerald-50 rounded-2xl border border-emerald-100 text-left">
              <p className="text-xs font-black text-emerald-700 mb-2 flex items-center gap-1.5">
                <Share2 className="w-3.5 h-3.5" /> Earn rewards by referring friends
              </p>
              <p className="text-xs text-emerald-600 mb-3">
                Know someone moving to Dubai? Share your link and earn AED rewards for every successful referral.
              </p>
              <button
                onClick={copyReferralLink}
                data-testid="button-share-referral"
                className="w-full py-2.5 rounded-xl bg-white border border-emerald-300 text-emerald-700 font-bold text-sm transition hover:bg-emerald-500 hover:text-white flex items-center justify-center gap-2"
              >
                <Copy className="w-3.5 h-3.5" /> {copied ? "Link copied!" : "Copy referral link"}
              </button>
            </div>
            <button
              onClick={() => { setStep(1); setIntent(""); setName(""); setPhone(""); setServices([]); setPropertyType(""); setLocation(""); setBudget(""); setTimeline(""); }}
              className="text-sm text-gray-400 hover:text-gray-600 transition"
            >
              Submit another request
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
