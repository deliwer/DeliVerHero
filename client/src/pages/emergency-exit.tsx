import { useState } from "react";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  AlertTriangle, ShieldCheck, Plane, Anchor, Car, Phone, Mail,
  CheckCircle2, Copy, Check, Users, Heart, FileText, Zap,
  MapPin, Clock, ArrowRight, Globe, Lock, RefreshCw, Loader2
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const DUBAI_AREAS = [
  "Downtown Dubai", "Dubai Marina", "JBR (Jumeirah Beach Residence)",
  "Business Bay", "DIFC", "Jumeirah", "Deira", "Bur Dubai",
  "Mirdif", "Al Barsha", "JVC (Jumeirah Village Circle)", "Silicon Oasis",
  "Discovery Gardens", "International City", "Dubai Sports City",
  "Palm Jumeirah", "The Greens", "Al Nahda", "Satwa", "Karama",
  "Other / Outside Dubai"
];

const NATIONALITIES = [
  "Indian", "Pakistani", "Filipino", "British", "Egyptian", "Bangladeshi",
  "American", "Canadian", "Australian", "Chinese", "Russian", "German",
  "French", "Jordanian", "Lebanese", "Emirati", "Sri Lankan", "Nepali",
  "Nigerian", "South African", "Other"
];

const EMBASSIES: Record<string, { phone: string; address: string; emergency: string }> = {
  "Indian":     { phone: "+971 4 397 1333", address: "Consulate General, Bur Dubai", emergency: "+971 50 453 8600" },
  "Pakistani":  { phone: "+971 4 397 0412", address: "Consulate General, Bur Dubai", emergency: "+971 50 871 3010" },
  "Filipino":   { phone: "+971 4 220 7100", address: "Philippine Consulate, Deira", emergency: "+971 50 453 8600" },
  "British":    { phone: "+971 4 309 4444", address: "British Embassy, Al Seef", emergency: "+44 207 008 5000" },
  "American":   { phone: "+971 4 309 4000", address: "US Consulate General, Al Barsha", emergency: "+1 202 501 4444" },
  "Canadian":   { phone: "+971 4 404 8444", address: "Canadian Embassy, Abu Dhabi", emergency: "+1 613 996 8885" },
  "Australian": { phone: "+971 2 401 7500", address: "Australian Embassy, Abu Dhabi", emergency: "+61 2 6261 3305" },
};

const EXIT_ROUTES = [
  {
    name: "Dubai International Airport (DXB)",
    icon: Plane, color: "text-blue-400", bgColor: "bg-blue-500/10 border-blue-500/20",
    distance: "Central Dubai", driveTime: "10–30 min",
    tips: ["Terminal 1 (most international)", "Terminal 3 (Emirates)", "Check flight boards immediately", "Keep passport accessible at all times"],
    bestFor: "air",
  },
  {
    name: "Al Maktoum Airport (DWC)",
    icon: Plane, color: "text-violet-400", bgColor: "bg-violet-500/10 border-violet-500/20",
    distance: "Dubai South", driveTime: "45–60 min",
    tips: ["Less congested than DXB", "Good for evacuation charters", "Emirates Road (E311) access"],
    bestFor: "air",
  },
  {
    name: "Sharjah Airport (SHJ)",
    icon: Plane, color: "text-emerald-400", bgColor: "bg-emerald-500/10 border-emerald-500/20",
    distance: "20km from Dubai", driveTime: "20–40 min",
    tips: ["Budget carrier hub", "Air Arabia operates here", "Can be faster if DXB is congested"],
    bestFor: "air",
  },
  {
    name: "Oman Border (Hatta / Al Wajajah)",
    icon: Car, color: "text-amber-400", bgColor: "bg-amber-500/10 border-amber-500/20",
    distance: "Hatta / Al Ain direction", driveTime: "1.5–2 hrs",
    tips: ["Hatta border crossing (E44 highway)", "Al Wajajah crossing near Khatam Al Shaqlah", "Valid visa or visa-on-arrival required for Oman", "Fuel up before departing Dubai"],
    bestFor: "land",
  },
  {
    name: "Port Rashid / Dubai Cruise Terminal",
    icon: Anchor, color: "text-cyan-400", bgColor: "bg-cyan-500/10 border-cyan-500/20",
    distance: "Bur Dubai", driveTime: "10–20 min",
    tips: ["Ferry services to Muscat and Karachi", "Check berthing status via Dubai Ports Authority", "Best for large families with luggage"],
    bestFor: "sea",
  },
];

const EMERGENCY_NUMBERS = [
  { label: "Police / Emergency", number: "999", icon: ShieldCheck, color: "text-red-400" },
  { label: "Ambulance", number: "998", icon: Heart, color: "text-rose-400" },
  { label: "Dubai Civil Defense", number: "997", icon: AlertTriangle, color: "text-orange-400" },
  { label: "Dubai Airport Ops", number: "+971 4 224 5555", icon: Plane, color: "text-blue-400" },
  { label: "Dubai Port Authority", number: "+971 4 881 5454", icon: Anchor, color: "text-cyan-400" },
  { label: "UAE IVR Helpline", number: "800 4673", icon: Phone, color: "text-emerald-400" },
  { label: "WhatsApp DeliWer Emergency", number: "+971523946311", icon: Phone, color: "text-green-400" },
];

const CHECKLIST_HOURS = [
  {
    label: "First 30 Minutes",
    color: "border-red-500/60 bg-red-950/30",
    badgeColor: "bg-red-500/20 text-red-300",
    items: [
      "Grab passport + visa documents for ALL family members",
      "Withdraw AED 2,000–5,000 cash (ATMs may fail)",
      "Charge all phones to 100% and find power banks",
      "Contact your emergency person outside UAE",
      "Locate your nearest exit route (airport / border / port)",
    ],
  },
  {
    label: "First 2 Hours",
    color: "border-amber-500/60 bg-amber-950/30",
    badgeColor: "bg-amber-500/20 text-amber-300",
    items: [
      "Pack essentials bag: medication, chargers, water, snacks",
      "Download offline maps (Google Maps area download)",
      "Book first available flight on ANY app (Skyscanner, Kayak, airline apps)",
      "Notify your landlord / employer via WhatsApp (screenshot proof)",
      "Transfer critical digital files to cloud (iCloud/Drive)",
      "Take photos of all important documents",
    ],
  },
  {
    label: "Hours 2–24",
    color: "border-yellow-500/60 bg-yellow-950/30",
    badgeColor: "bg-yellow-500/20 text-yellow-300",
    items: [
      "Cancel or suspend utility contracts if time allows",
      "Notify your bank (online banking from phone)",
      "Arrange pet transport if applicable",
      "Settle any critical medical needs / pick up medications",
      "Pack valuables: jewelry, hard drives, family photos",
      "Contact your embassy for emergency travel documents if passport missing",
    ],
  },
  {
    label: "Before Departure",
    color: "border-blue-500/60 bg-blue-950/30",
    badgeColor: "bg-blue-500/20 text-blue-300",
    items: [
      "Confirm your flight / transport booking",
      "Check all family members have their own documents",
      "Share your travel itinerary with your emergency contact",
      "Empty fridge / turn off gas / lock apartment",
      "Leave your building key with a trusted neighbor if possible",
      "Keep your EVX plan code accessible — share it with family",
    ],
  },
];

const VISA_EXIT_RULES: Record<string, string> = {
  employment: "You can exit the UAE at any time on your employment visa. No exit permit required since 2021.",
  resident: "Resident visa holders may exit freely. Ensure visa is not expired (overstay fines apply at the airport).",
  tourist: "Tourist visa holders can exit freely. Avoid overstaying — AED 100/day fine applies.",
  golden: "Golden visa holders have full exit freedom with no time restrictions.",
};

function PlanCard({ profile, onCopy }: { profile: any; onCopy: () => void }) {
  const [copied, setCopied] = useState(false);
  const embassy = EMBASSIES[profile.nationality];
  const exitRoutes = EXIT_ROUTES.filter(r =>
    profile.preferredExitRoute === "any" || r.bestFor === profile.preferredExitRoute
  );

  const handleCopy = () => {
    navigator.clipboard.writeText(profile.planCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
    onCopy();
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6"
    >
      {/* Plan Code Banner */}
      <Card className="bg-emerald-950/60 border-emerald-500/50 shadow-lg shadow-emerald-900/20">
        <CardContent className="p-6">
          <div className="flex items-center gap-3 mb-3">
            <ShieldCheck className="w-6 h-6 text-emerald-400" />
            <div>
              <p className="text-emerald-300 font-bold text-lg">Exit Plan Registered</p>
              <p className="text-emerald-400/70 text-sm">Save your unique plan code — you'll need it to retrieve this plan</p>
            </div>
          </div>
          <div className="flex items-center gap-3 mt-4">
            <div className="flex-1 bg-slate-950/60 border border-emerald-500/30 rounded-xl px-5 py-3">
              <span className="text-emerald-300 font-mono font-bold text-2xl tracking-widest" data-testid="text-plan-code">
                {profile.planCode}
              </span>
            </div>
            <Button
              onClick={handleCopy}
              className="bg-emerald-600 hover:bg-emerald-700 text-white px-4"
              data-testid="button-copy-plan-code"
            >
              {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Personalized Summary */}
      <Card className="bg-slate-900/80 border-slate-700/60">
        <CardHeader className="pb-2">
          <CardTitle className="text-white text-base flex items-center gap-2">
            <Users className="w-4 h-4 text-amber-400" />
            Your Exit Profile — {profile.fullName}
          </CardTitle>
        </CardHeader>
        <CardContent className="grid grid-cols-2 gap-3 text-sm">
          {[
            { label: "Nationality", value: profile.nationality },
            { label: "Current Area", value: profile.currentArea },
            { label: "Visa Type", value: profile.visaType },
            { label: "Family Members", value: profile.familyCount },
            { label: "Has Pets", value: profile.hasPets ? "Yes" : "No" },
            { label: "Preferred Exit", value: profile.preferredExitRoute === "air" ? "✈ Air" : profile.preferredExitRoute === "sea" ? "⚓ Sea" : profile.preferredExitRoute === "land" ? "🚗 Land" : "Any available" },
          ].map(({ label, value }) => (
            <div key={label} className="bg-slate-800/50 rounded-lg px-3 py-2">
              <p className="text-slate-500 text-xs">{label}</p>
              <p className="text-white font-medium capitalize">{value}</p>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Visa Exit Rule */}
      <Card className="bg-blue-950/30 border-blue-500/30">
        <CardContent className="p-4 flex items-start gap-3">
          <FileText className="w-5 h-5 text-blue-400 shrink-0 mt-0.5" />
          <div>
            <p className="text-blue-300 font-semibold text-sm mb-1">Your Visa Exit Rule</p>
            <p className="text-blue-400/80 text-sm">{VISA_EXIT_RULES[profile.visaType] || "Verify your visa type before departure."}</p>
          </div>
        </CardContent>
      </Card>

      {/* Medical Alert */}
      {profile.medicalNeeds && (
        <Card className="bg-rose-950/30 border-rose-500/30">
          <CardContent className="p-4 flex items-start gap-3">
            <Heart className="w-5 h-5 text-rose-400 shrink-0 mt-0.5" />
            <div>
              <p className="text-rose-300 font-semibold text-sm mb-1">Medical Alert on File</p>
              <p className="text-rose-400/80 text-sm">{profile.medicalNeeds}</p>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Embassy Contact */}
      {embassy && (
        <Card className="bg-slate-900/80 border-slate-700/60">
          <CardHeader className="pb-2">
            <CardTitle className="text-white text-base flex items-center gap-2">
              <Globe className="w-4 h-4 text-violet-400" />
              Your Embassy in UAE ({profile.nationality})
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2 text-sm">
            <div className="flex justify-between py-2 border-b border-slate-700/40">
              <span className="text-slate-400">Main Line</span>
              <a href={`tel:${embassy.phone}`} className="text-white font-mono hover:text-emerald-400">{embassy.phone}</a>
            </div>
            <div className="flex justify-between py-2 border-b border-slate-700/40">
              <span className="text-slate-400">Emergency</span>
              <a href={`tel:${embassy.emergency}`} className="text-red-300 font-mono hover:text-red-200">{embassy.emergency}</a>
            </div>
            <div className="flex justify-between py-2">
              <span className="text-slate-400">Location</span>
              <span className="text-slate-300 text-right">{embassy.address}</span>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Recommended Exit Routes */}
      <div>
        <h3 className="text-white font-bold mb-3 flex items-center gap-2">
          <MapPin className="w-4 h-4 text-amber-400" />
          Your Recommended Exit Routes
        </h3>
        <div className="space-y-3">
          {(exitRoutes.length ? exitRoutes : EXIT_ROUTES).slice(0, 3).map((route) => (
            <Card key={route.name} className={`border ${route.bgColor}`}>
              <CardContent className="p-4">
                <div className="flex items-center gap-3 mb-2">
                  <route.icon className={`w-5 h-5 ${route.color}`} />
                  <span className={`font-bold text-sm ${route.color}`}>{route.name}</span>
                  <Badge className="ml-auto text-xs bg-slate-800 text-slate-400 border-slate-700">
                    ~{route.driveTime}
                  </Badge>
                </div>
                <ul className="space-y-1">
                  {route.tips.map((tip) => (
                    <li key={tip} className="text-slate-400 text-xs flex items-start gap-1.5">
                      <ArrowRight className="w-3 h-3 shrink-0 mt-0.5 text-slate-600" />
                      {tip}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Emergency Contact */}
      <Card className="bg-slate-900/80 border-slate-700/60">
        <CardContent className="p-4">
          <p className="text-slate-400 text-xs mb-2 uppercase tracking-wider font-bold">Your Emergency Contact (Outside UAE)</p>
          <p className="text-white font-bold">{profile.emergencyContactName}</p>
          <a href={`tel:${profile.emergencyContactPhone}`} className="text-emerald-400 font-mono text-sm hover:text-emerald-300">
            {profile.emergencyContactPhone}
          </a>
          <p className="text-slate-500 text-xs mt-1">{profile.emergencyContactCountry}</p>
        </CardContent>
      </Card>
    </motion.div>
  );
}

function RegistrationForm({ onSuccess }: { onSuccess: (profile: any) => void }) {
  const { toast } = useToast();
  const { register, handleSubmit, setValue, watch, formState: { errors } } = useForm({
    defaultValues: {
      fullName: "", nationality: "", currentArea: "", visaType: "",
      familyCount: "1", hasPets: false, medicalNeeds: "", vehicleAvailable: false,
      emergencyContactName: "", emergencyContactPhone: "", emergencyContactCountry: "",
      preferredExitRoute: "", whatsapp: "",
    }
  });

  const mutation = useMutation({
    mutationFn: (data: any) => apiRequest("POST", "/api/emergency-exit/register", data),
    onSuccess: (result: any) => {
      onSuccess(result);
      toast({ title: "Exit Plan Created", description: `Your plan code is ${result.planCode} — save it!` });
    },
    onError: (err: any) => {
      toast({ title: "Registration Failed", description: err.message || "Please try again", variant: "destructive" });
    },
  });

  return (
    <form onSubmit={handleSubmit((data) => mutation.mutate(data))} className="space-y-5">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <Label className="text-slate-300 text-sm">Full Name *</Label>
          <Input
            {...register("fullName", { required: true })}
            placeholder="As on passport"
            className="mt-1 bg-slate-800/60 border-slate-700 text-white placeholder:text-slate-500"
            data-testid="input-full-name"
          />
        </div>
        <div>
          <Label className="text-slate-300 text-sm">WhatsApp Number</Label>
          <Input
            {...register("whatsapp")}
            placeholder="+971 50 xxx xxxx"
            className="mt-1 bg-slate-800/60 border-slate-700 text-white placeholder:text-slate-500"
            data-testid="input-whatsapp"
          />
        </div>
        <div>
          <Label className="text-slate-300 text-sm">Nationality *</Label>
          <Select onValueChange={(v) => setValue("nationality", v)}>
            <SelectTrigger className="mt-1 bg-slate-800/60 border-slate-700 text-white" data-testid="select-nationality">
              <SelectValue placeholder="Select nationality" />
            </SelectTrigger>
            <SelectContent className="bg-slate-800 border-slate-700 text-white">
              {NATIONALITIES.map(n => <SelectItem key={n} value={n}>{n}</SelectItem>)}
            </SelectContent>
          </Select>
        </div>
        <div>
          <Label className="text-slate-300 text-sm">Current Area in UAE *</Label>
          <Select onValueChange={(v) => setValue("currentArea", v)}>
            <SelectTrigger className="mt-1 bg-slate-800/60 border-slate-700 text-white" data-testid="select-current-area">
              <SelectValue placeholder="Select your area" />
            </SelectTrigger>
            <SelectContent className="bg-slate-800 border-slate-700 text-white max-h-60 overflow-y-auto">
              {DUBAI_AREAS.map(a => <SelectItem key={a} value={a}>{a}</SelectItem>)}
            </SelectContent>
          </Select>
        </div>
        <div>
          <Label className="text-slate-300 text-sm">Visa Type *</Label>
          <Select onValueChange={(v) => setValue("visaType", v)}>
            <SelectTrigger className="mt-1 bg-slate-800/60 border-slate-700 text-white" data-testid="select-visa-type">
              <SelectValue placeholder="Select visa type" />
            </SelectTrigger>
            <SelectContent className="bg-slate-800 border-slate-700 text-white">
              <SelectItem value="employment">Employment / Work Visa</SelectItem>
              <SelectItem value="resident">Resident / Family Visa</SelectItem>
              <SelectItem value="tourist">Tourist / Visit Visa</SelectItem>
              <SelectItem value="golden">Golden Visa</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div>
          <Label className="text-slate-300 text-sm">Number of Family Members (incl. yourself) *</Label>
          <Input
            {...register("familyCount")}
            type="number" min="1" max="20"
            className="mt-1 bg-slate-800/60 border-slate-700 text-white"
            data-testid="input-family-count"
          />
        </div>
        <div>
          <Label className="text-slate-300 text-sm">Preferred Exit Route *</Label>
          <Select onValueChange={(v) => setValue("preferredExitRoute", v)}>
            <SelectTrigger className="mt-1 bg-slate-800/60 border-slate-700 text-white" data-testid="select-exit-route">
              <SelectValue placeholder="Select exit method" />
            </SelectTrigger>
            <SelectContent className="bg-slate-800 border-slate-700 text-white">
              <SelectItem value="air">✈ Air (Airport)</SelectItem>
              <SelectItem value="land">🚗 Land (Oman Border)</SelectItem>
              <SelectItem value="sea">⚓ Sea (Port)</SelectItem>
              <SelectItem value="any">Any available</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="flex gap-4 items-center pt-5">
          <label className="flex items-center gap-2 cursor-pointer">
            <input type="checkbox" {...register("hasPets")} className="w-4 h-4 accent-amber-500" data-testid="checkbox-has-pets" />
            <span className="text-slate-300 text-sm">Have pets</span>
          </label>
          <label className="flex items-center gap-2 cursor-pointer">
            <input type="checkbox" {...register("vehicleAvailable")} className="w-4 h-4 accent-emerald-500" data-testid="checkbox-vehicle" />
            <span className="text-slate-300 text-sm">Have a vehicle</span>
          </label>
        </div>
      </div>

      <div>
        <Label className="text-slate-300 text-sm">Medical Needs / Special Requirements (optional)</Label>
        <Textarea
          {...register("medicalNeeds")}
          placeholder="e.g. daily insulin, wheelchair user, pacemaker..."
          className="mt-1 bg-slate-800/60 border-slate-700 text-white placeholder:text-slate-500 resize-none"
          rows={2}
          data-testid="input-medical-needs"
        />
      </div>

      <div className="border-t border-slate-700/50 pt-4">
        <p className="text-amber-400 text-xs font-bold uppercase tracking-wider mb-3">Emergency Contact Outside UAE</p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <Label className="text-slate-300 text-sm">Contact Name *</Label>
            <Input
              {...register("emergencyContactName", { required: true })}
              placeholder="Full name"
              className="mt-1 bg-slate-800/60 border-slate-700 text-white placeholder:text-slate-500"
              data-testid="input-emergency-name"
            />
          </div>
          <div>
            <Label className="text-slate-300 text-sm">Contact Phone *</Label>
            <Input
              {...register("emergencyContactPhone", { required: true })}
              placeholder="+1 555 000 0000"
              className="mt-1 bg-slate-800/60 border-slate-700 text-white placeholder:text-slate-500"
              data-testid="input-emergency-phone"
            />
          </div>
          <div>
            <Label className="text-slate-300 text-sm">Their Country *</Label>
            <Input
              {...register("emergencyContactCountry", { required: true })}
              placeholder="e.g. India, UK, USA"
              className="mt-1 bg-slate-800/60 border-slate-700 text-white placeholder:text-slate-500"
              data-testid="input-emergency-country"
            />
          </div>
        </div>
      </div>

      <Button
        type="submit"
        className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-4 text-base"
        disabled={mutation.isPending}
        data-testid="button-register-plan"
      >
        {mutation.isPending ? (
          <><Loader2 className="w-5 h-5 mr-2 animate-spin" />Creating Your Exit Plan...</>
        ) : (
          <><ShieldCheck className="w-5 h-5 mr-2" />Register My Exit Plan</>
        )}
      </Button>

      <p className="text-slate-500 text-xs text-center">
        Your data is stored securely. We never share it with third parties.
        You'll receive a unique plan code to retrieve your plan anytime.
      </p>
    </form>
  );
}

function PlanLookup({ onFound }: { onFound: (p: any) => void }) {
  const [code, setCode] = useState("");
  const [searched, setSearched] = useState(false);
  const { toast } = useToast();

  const { data, isLoading, refetch } = useQuery<any>({
    queryKey: ["/api/emergency-exit/plan", code],
    queryFn: async () => {
      const res = await fetch(`/api/emergency-exit/plan/${code.trim().toUpperCase()}`);
      if (!res.ok) throw new Error("Plan not found");
      return res.json();
    },
    enabled: false,
    retry: false,
  });

  const handleSearch = async () => {
    if (!code.trim()) return;
    setSearched(true);
    try {
      const result = await refetch();
      if (result.data) onFound(result.data);
    } catch {
      toast({ title: "Plan Not Found", description: "Check your plan code and try again", variant: "destructive" });
    }
  };

  return (
    <div className="space-y-4">
      <p className="text-slate-400 text-sm">Enter the plan code (e.g. EVX-XXXXXXXX) you received when you first registered.</p>
      <div className="flex gap-3">
        <Input
          value={code}
          onChange={(e) => setCode(e.target.value.toUpperCase())}
          placeholder="EVX-XXXXXXXX"
          className="bg-slate-800/60 border-slate-700 text-white font-mono text-lg placeholder:text-slate-600 flex-1"
          data-testid="input-plan-code"
          onKeyDown={(e) => e.key === "Enter" && handleSearch()}
        />
        <Button
          onClick={handleSearch}
          className="bg-amber-600 hover:bg-amber-700 text-white"
          disabled={isLoading}
          data-testid="button-lookup-plan"
        >
          {isLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : <RefreshCw className="w-4 h-4" />}
        </Button>
      </div>
    </div>
  );
}

export default function EmergencyExitPage() {
  const [registeredProfile, setRegisteredProfile] = useState<any>(null);
  const [activeTab, setActiveTab] = useState("register");

  const { data: countData } = useQuery<any>({ queryKey: ["/api/emergency-exit/count"] });

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      {/* Hero */}
      <div className="relative bg-gradient-to-br from-red-950 via-slate-950 to-slate-950 border-b border-red-900/30">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,_var(--tw-gradient-stops))] from-red-900/20 via-transparent to-transparent pointer-events-none" />
        <div className="max-w-5xl mx-auto px-4 py-16 relative">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 bg-red-600/20 border border-red-500/40 rounded-xl animate-pulse">
              <AlertTriangle className="w-7 h-7 text-red-400" />
            </div>
            <Badge className="bg-red-500/20 text-red-300 border-red-500/40 text-xs font-bold uppercase tracking-widest">
              Emergency Service — Free for all UAE residents
            </Badge>
          </div>

          <h1 className="text-4xl md:text-5xl font-black text-white mb-4 leading-tight">
            UAE Emergency<br />
            <span className="text-red-400">Evacuation Exit Plan</span>
          </h1>
          <p className="text-slate-400 text-lg max-w-2xl mb-8">
            Register your profile now. In a crisis, you'll have a personalized exit strategy instantly — 
            routes, embassy contacts, 72-hour checklist, and your emergency contact on file.
          </p>

          <div className="flex flex-wrap gap-6">
            {[
              { icon: Zap, text: "Instant plan — no waiting" },
              { icon: Lock, text: "Secure & private" },
              { icon: Clock, text: "72-hour action guide" },
              { icon: Globe, text: "Embassy contacts included" },
            ].map(({ icon: Icon, text }) => (
              <div key={text} className="flex items-center gap-2 text-slate-400 text-sm">
                <Icon className="w-4 h-4 text-red-400" />
                {text}
              </div>
            ))}
          </div>

          {countData?.count > 0 && (
            <div className="mt-6 inline-flex items-center gap-2 bg-slate-900/60 border border-slate-700/40 rounded-full px-4 py-2 text-sm text-slate-400">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span><strong className="text-white">{countData.count.toLocaleString()}</strong> UAE residents registered</span>
            </div>
          )}
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 py-10 space-y-10">
        {/* Registration / Plan Lookup Card */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
          <div className="lg:col-span-3">
            <Card className="bg-slate-900/80 border-slate-700/60 shadow-xl">
              <CardHeader className="pb-3">
                <Tabs value={activeTab} onValueChange={setActiveTab}>
                  <TabsList className="bg-slate-800/80 border border-slate-700/50 w-full">
                    <TabsTrigger value="register" className="flex-1 data-[state=active]:bg-red-600 data-[state=active]:text-white" data-testid="tab-register">
                      Register New Plan
                    </TabsTrigger>
                    <TabsTrigger value="retrieve" className="flex-1 data-[state=active]:bg-amber-600 data-[state=active]:text-white" data-testid="tab-retrieve">
                      Retrieve My Plan
                    </TabsTrigger>
                  </TabsList>
                </Tabs>
              </CardHeader>
              <CardContent>
                <AnimatePresence mode="wait">
                  {!registeredProfile ? (
                    <motion.div key={activeTab} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                      {activeTab === "register" ? (
                        <RegistrationForm onSuccess={(result) => {
                          setRegisteredProfile(result);
                        }} />
                      ) : (
                        <PlanLookup onFound={setRegisteredProfile} />
                      )}
                    </motion.div>
                  ) : (
                    <div>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="text-slate-400 hover:text-white mb-4"
                        onClick={() => setRegisteredProfile(null)}
                        data-testid="button-back"
                      >
                        ← Register another / Look up different plan
                      </Button>
                      <PlanCard profile={registeredProfile} onCopy={() => {}} />
                    </div>
                  )}
                </AnimatePresence>
              </CardContent>
            </Card>
          </div>

          {/* Emergency Numbers Sidebar */}
          <div className="lg:col-span-2">
            <Card className="bg-red-950/30 border-red-500/30 sticky top-[116px]">
              <CardHeader className="pb-2">
                <CardTitle className="text-red-300 text-sm font-bold uppercase tracking-widest flex items-center gap-2">
                  <Phone className="w-4 h-4" />
                  Emergency Numbers UAE
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                {EMERGENCY_NUMBERS.map(({ label, number, icon: Icon, color }) => (
                  <a
                    key={label}
                    href={`tel:${number.replace(/\s/g, "")}`}
                    className="flex items-center justify-between py-2.5 px-3 rounded-lg bg-slate-900/60 hover:bg-slate-800/80 border border-slate-700/30 transition-colors group"
                    data-testid={`link-emergency-${label.toLowerCase().replace(/\s/g, "-")}`}
                  >
                    <div className="flex items-center gap-2">
                      <Icon className={`w-4 h-4 ${color}`} />
                      <span className="text-slate-300 text-xs group-hover:text-white">{label}</span>
                    </div>
                    <span className="text-white font-mono font-bold text-sm">{number}</span>
                  </a>
                ))}
              </CardContent>
            </Card>
          </div>
        </div>

        {/* 72-Hour Checklist */}
        <div>
          <h2 className="text-2xl font-black text-white mb-6 flex items-center gap-3">
            <Clock className="w-6 h-6 text-amber-400" />
            72-Hour Evacuation Checklist
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {CHECKLIST_HOURS.map((phase) => (
              <Card key={phase.label} className={`border ${phase.color}`}>
                <CardHeader className="pb-2">
                  <Badge className={`w-fit text-xs font-bold uppercase ${phase.badgeColor}`}>{phase.label}</Badge>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {phase.items.map((item) => (
                      <li key={item} className="flex items-start gap-2 text-sm text-slate-300">
                        <CheckCircle2 className="w-4 h-4 text-slate-500 shrink-0 mt-0.5" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* All Exit Routes */}
        <div>
          <h2 className="text-2xl font-black text-white mb-6 flex items-center gap-3">
            <MapPin className="w-6 h-6 text-blue-400" />
            All UAE Exit Routes
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {EXIT_ROUTES.map((route) => (
              <Card key={route.name} className={`border ${route.bgColor}`}>
                <CardContent className="p-5">
                  <div className="flex items-center gap-3 mb-3">
                    <route.icon className={`w-6 h-6 ${route.color}`} />
                    <div>
                      <p className={`font-bold text-sm ${route.color}`}>{route.name}</p>
                      <p className="text-slate-500 text-xs">{route.distance} · ~{route.driveTime}</p>
                    </div>
                  </div>
                  <ul className="space-y-1.5">
                    {route.tips.map((tip) => (
                      <li key={tip} className="text-slate-400 text-xs flex items-start gap-1.5">
                        <ArrowRight className="w-3 h-3 shrink-0 mt-0.5 text-slate-600" />
                        {tip}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Embassy Directory */}
        <div>
          <h2 className="text-2xl font-black text-white mb-6 flex items-center gap-3">
            <Globe className="w-6 h-6 text-violet-400" />
            Embassy Directory — UAE
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {Object.entries(EMBASSIES).map(([country, info]) => (
              <Card key={country} className="bg-slate-900/70 border-slate-700/50">
                <CardContent className="p-4">
                  <p className="text-white font-bold mb-3">{country} Embassy / Consulate</p>
                  <div className="space-y-1.5 text-sm">
                    <div className="flex justify-between">
                      <span className="text-slate-500">Main</span>
                      <a href={`tel:${info.phone}`} className="text-slate-300 font-mono hover:text-white">{info.phone}</a>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-500">Emergency</span>
                      <a href={`tel:${info.emergency}`} className="text-red-400 font-mono hover:text-red-300">{info.emergency}</a>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-500">Location</span>
                      <span className="text-slate-400 text-right text-xs">{info.address}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Footer CTA */}
        <Card className="bg-gradient-to-r from-red-950/60 to-slate-900/60 border-red-500/30 text-center">
          <CardContent className="py-10">
            <AlertTriangle className="w-10 h-10 text-red-400 mx-auto mb-4" />
            <h3 className="text-2xl font-black text-white mb-3">
              Don't wait for an emergency to prepare
            </h3>
            <p className="text-slate-400 mb-6 max-w-xl mx-auto">
              Registration takes 2 minutes. Your plan code is valid forever and retrieves your full exit profile instantly.
            </p>
            <Button
              className="bg-red-600 hover:bg-red-700 text-white font-bold px-8 py-3"
              onClick={() => { setActiveTab("register"); setRegisteredProfile(null); window.scrollTo({ top: 0, behavior: "smooth" }); }}
              data-testid="button-cta-register"
            >
              <ShieldCheck className="w-5 h-5 mr-2" />
              Register My Exit Plan Now — Free
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
