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
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { SEOMeta } from "@/components/seo-meta";
import { Navigation } from "@/components/navigation";
import {
  AlertTriangle, ShieldCheck, Loader2, Copy, Check, Users, Heart, Zap, Radio,
  MapPin, Package, Phone, Wifi, WifiOff, Flame, Wind, Droplets, Home,
  ChevronRight, AlertCircle, Clock, BookOpen, ArrowRight, CheckCircle2
} from "lucide-react";
import { Link } from "wouter";
import { motion } from "framer-motion";

const DUBAI_AREAS = [
  "Downtown Dubai", "Dubai Marina", "JBR (Jumeirah Beach Residence)",
  "Business Bay", "DIFC", "Jumeirah", "Deira", "Bur Dubai",
  "Mirdif", "Al Barsha", "JVC", "Silicon Oasis", "Discovery Gardens",
  "International City", "Dubai Sports City", "Palm Jumeirah",
  "The Greens", "Al Nahda", "Satwa", "Karama", "Other"
];

const SKILL_OPTIONS = [
  { id: "first_aid", label: "First Aid / CPR" },
  { id: "medical", label: "Medical Professional" },
  { id: "military", label: "Military / Law Enforcement (former)" },
  { id: "arabic", label: "Arabic Speaker" },
  { id: "driving", label: "Vehicle + Valid License" },
  { id: "comms", label: "Radio / Comms Equipment" },
  { id: "generator", label: "Generator Available" },
  { id: "hosting", label: "Space to Host Others" },
  { id: "logistics", label: "Logistics / Supply Chain" },
  { id: "mental_health", label: "Mental Health / Counseling" },
];

const ALERT_LEVELS = [
  {
    level: "NORMAL",
    color: "text-emerald-400",
    bg: "bg-emerald-500/10 border-emerald-500/30",
    badgeBg: "bg-emerald-500/20 text-emerald-300 border-emerald-500/40",
    dot: "bg-emerald-400",
    label: "Normal Operations",
    desc: "Standard conditions. Use this time to build readiness.",
    actions: [
      "Maintain a 72-hour supply kit at home",
      "Register your profile in this network",
      "Ensure all family documents are updated and accessible",
      "Identify your nearest exits from Dubai",
      "Establish a family communication plan",
      "Keep 2,000–5,000 AED cash at home at all times",
      "Charge backup power banks weekly",
      "Download offline maps of Dubai and Oman",
    ],
  },
  {
    level: "AMBER",
    color: "text-amber-400",
    bg: "bg-amber-500/10 border-amber-500/30",
    badgeBg: "bg-amber-500/20 text-amber-300 border-amber-500/40",
    dot: "bg-amber-400 animate-pulse",
    label: "Heightened Caution",
    desc: "Elevated risk. Begin monitoring and preparing actively.",
    actions: [
      "Verify your 72-hour kit is fully stocked",
      "Top up fuel to full tank immediately",
      "Withdraw maximum daily ATM limit",
      "Move important documents to a waterproof bag",
      "Limit unnecessary travel outside your area",
      "Contact your embassy and register your presence",
      "Activate family WhatsApp group and set check-in times",
      "Confirm your nearest safe zones (embassy, mall, hospital)",
      "Pre-download offline entertainment + communication apps",
      "Brief all household members on exit routes",
    ],
  },
  {
    level: "RED",
    color: "text-red-400",
    bg: "bg-red-500/10 border-red-500/30",
    badgeBg: "bg-red-500/20 text-red-300 border-red-500/40",
    dot: "bg-red-500 animate-pulse",
    label: "Imminent Threat",
    desc: "Immediate action required. Follow official guidance.",
    actions: [
      "Stay indoors unless ordered to evacuate",
      "Monitor official UAE government channels only (WAM, UAE government app)",
      "Shelter in an interior room away from windows",
      "Turn off gas at the mains; keep water supply open",
      "Charge ALL devices immediately",
      "Send location pin to emergency contact outside UAE",
      "Prepare evacuation bag — passport, cash, medication, charger",
      "Do NOT spread unverified information on social media",
      "Contact your employer / school to confirm status",
      "Check in with neighbors — especially elderly or alone",
    ],
  },
  {
    level: "BLACK",
    color: "text-rose-300",
    bg: "bg-rose-950/30 border-rose-500/40",
    badgeBg: "bg-rose-900/40 text-rose-200 border-rose-500/40",
    dot: "bg-rose-400 animate-ping",
    label: "Full Evacuation / Extreme Emergency",
    desc: "Execute your exit plan immediately. Do not delay.",
    actions: [
      "Call 999 if in immediate danger",
      "Execute your registered exit plan (use EVX code at deliwer.com/emergency-exit)",
      "Take: Passports, cash, medication, phone + charger, water",
      "Do NOT take unnecessary luggage — move fast",
      "Head to your pre-identified exit route (airport / Oman border / port)",
      "Contact your embassy emergency line for assistance",
      "Keep family together — designate a meeting point if separated",
      "Use offline maps — internet may be disrupted",
      "Do NOT return home until all-clear is officially declared",
      "Message your emergency contact your status every 2 hours",
    ],
  },
];

const SUPPLY_KIT = [
  {
    category: "Water & Food",
    icon: Droplets,
    color: "text-blue-400",
    items: [
      "3L water per person per day (minimum 9L for 3 days)",
      "Non-perishable food: canned goods, energy bars, nuts, dates",
      "Manual can opener",
      "Baby food / formula if applicable",
      "Pet food if applicable",
    ],
  },
  {
    category: "Documents & Money",
    icon: BookOpen,
    color: "text-amber-400",
    items: [
      "Passports (all family members)",
      "UAE residence visa / entry stamp",
      "Insurance cards",
      "Birth certificates",
      "AED 5,000 cash in small denominations",
      "USD 500 or EUR 400 (international use)",
      "USB drive with scanned document copies",
    ],
  },
  {
    category: "Medical & Health",
    icon: Heart,
    color: "text-rose-400",
    items: [
      "First aid kit (bandages, antiseptic, painkillers)",
      "30-day supply of prescription medications",
      "Blood type cards for all family members",
      "Spare glasses / contact lenses",
      "Hand sanitizer + masks",
      "Basic ORS (oral rehydration salts)",
    ],
  },
  {
    category: "Power & Communications",
    icon: Zap,
    color: "text-yellow-400",
    items: [
      "Fully charged power banks (min. 20,000 mAh)",
      "Car chargers for phones",
      "Battery-powered or hand-crank radio",
      "Spare SIM card (roaming enabled)",
      "Flashlights + spare batteries",
      "Whistle (for signaling if trapped)",
    ],
  },
  {
    category: "Tools & Shelter",
    icon: Home,
    color: "text-emerald-400",
    items: [
      "Multipurpose knife / Swiss Army knife",
      "Duct tape and rope",
      "Emergency foil blankets (1 per person)",
      "Dust masks / N95 respirators",
      "Waterproof bag for documents",
      "Local area map (printed)",
    ],
  },
];

const COMMS_PLAN = [
  {
    step: "1",
    title: "Designate One Person Outside UAE",
    desc: "Choose one family member or close friend outside the UAE as your primary contact. Everyone in your household should have their number memorized.",
    color: "border-blue-500/40 bg-blue-950/20",
  },
  {
    step: "2",
    title: "Set Fixed Check-in Times",
    desc: "Agree on check-in times: 8:00 AM and 8:00 PM daily. If no contact within 4 hours of a missed time, the contact person initiates emergency protocols.",
    color: "border-amber-500/40 bg-amber-950/20",
  },
  {
    step: "3",
    title: "Use Multiple Channels",
    desc: "Primary: WhatsApp. Backup 1: SMS. Backup 2: Voice call. Backup 3: Email. If all fail, use Zello or offline mesh apps (Meshtastic/Bridgefy).",
    color: "border-emerald-500/40 bg-emerald-950/20",
  },
  {
    step: "4",
    title: "Family Meeting Point",
    desc: "Set two meeting points: one near your home (e.g., building lobby), one further away (e.g., a nearby mall). Everyone knows both without needing a phone.",
    color: "border-violet-500/40 bg-violet-950/20",
  },
  {
    step: "5",
    title: "Code Word Protocol",
    desc: "Agree on a code word meaning 'I am safe but can't speak freely'. If someone uses the code word, the other person takes immediate action to help.",
    color: "border-rose-500/40 bg-rose-950/20",
  },
];

const SHELTER_LOCATIONS = [
  { name: "Dubai Mall", area: "Downtown", type: "Commercial (reinforced structure)" },
  { name: "Mall of the Emirates", area: "Al Barsha", type: "Commercial (reinforced structure)" },
  { name: "Dubai World Trade Centre", area: "Trade Centre", type: "Civil infrastructure" },
  { name: "Rashid Hospital", area: "Bur Dubai", type: "Medical facility" },
  { name: "Dubai International Airport T1/T3", area: "Garhoud", type: "Aviation + civil shelter" },
  { name: "Al Maktoum International Airport", area: "Dubai South", type: "Aviation + open ground" },
  { name: "Jebel Ali Port", area: "Dubai South", type: "Industrial shelter + sea exit" },
];

function JoinForm({ onSuccess }: { onSuccess: (code: string) => void }) {
  const { toast } = useToast();
  const { register, handleSubmit, setValue, watch, formState: { errors } } = useForm({
    defaultValues: {
      fullName: "", phone: "", whatsapp: "", area: "",
      familyCount: "1", hasPets: false, medicalNeeds: "",
      alertPreference: "whatsapp", hasSupplyKit: false, hasEvacPlan: false,
    }
  });

  const [selectedSkills, setSelectedSkills] = useState<string[]>([]);

  const toggleSkill = (id: string) => {
    setSelectedSkills(prev =>
      prev.includes(id) ? prev.filter(s => s !== id) : [...prev, id]
    );
  };

  const mutation = useMutation({
    mutationFn: (data: any) => apiRequest("POST", "/api/wartime/register", { ...data, skills: selectedSkills }),
    onSuccess: (result: any) => {
      onSuccess(result.memberCode);
      toast({ title: "Readiness Network Joined!", description: `Your member code: ${result.memberCode}` });
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
          <Input {...register("fullName", { required: true })}
            placeholder="As on your ID"
            className="mt-1 bg-slate-800/60 border-slate-700 text-white placeholder:text-slate-500"
            data-testid="input-wartime-name" />
        </div>
        <div>
          <Label className="text-slate-300 text-sm">Mobile / WhatsApp *</Label>
          <Input {...register("phone", { required: true })}
            placeholder="+971 50 xxx xxxx"
            className="mt-1 bg-slate-800/60 border-slate-700 text-white placeholder:text-slate-500"
            data-testid="input-wartime-phone" />
        </div>
        <div>
          <Label className="text-slate-300 text-sm">Area in Dubai *</Label>
          <Select onValueChange={(v) => setValue("area", v)}>
            <SelectTrigger className="mt-1 bg-slate-800/60 border-slate-700 text-white" data-testid="select-wartime-area">
              <SelectValue placeholder="Select your area" />
            </SelectTrigger>
            <SelectContent className="bg-slate-800 border-slate-700 text-white max-h-60 overflow-y-auto">
              {DUBAI_AREAS.map(a => <SelectItem key={a} value={a}>{a}</SelectItem>)}
            </SelectContent>
          </Select>
        </div>
        <div>
          <Label className="text-slate-300 text-sm">Family Members (incl. yourself)</Label>
          <Input {...register("familyCount")}
            type="number" min="1" max="20"
            className="mt-1 bg-slate-800/60 border-slate-700 text-white"
            data-testid="input-wartime-family" />
        </div>
      </div>

      <div>
        <Label className="text-slate-300 text-sm mb-2 block">Your Relevant Skills (select all that apply)</Label>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
          {SKILL_OPTIONS.map(({ id, label }) => (
            <button
              key={id}
              type="button"
              onClick={() => toggleSkill(id)}
              className={`text-left text-xs px-3 py-2 rounded-lg border transition-all ${
                selectedSkills.includes(id)
                  ? "bg-amber-500/20 border-amber-500/60 text-amber-300"
                  : "bg-slate-800/40 border-slate-700/50 text-slate-400 hover:border-slate-500"
              }`}
              data-testid={`skill-${id}`}
            >
              {selectedSkills.includes(id) ? "✓ " : ""}{label}
            </button>
          ))}
        </div>
      </div>

      <div>
        <Label className="text-slate-300 text-sm">Medical Needs / Special Requirements</Label>
        <Textarea {...register("medicalNeeds")}
          placeholder="e.g. wheelchair, diabetes, oxygen dependency..."
          className="mt-1 bg-slate-800/60 border-slate-700 text-white placeholder:text-slate-500 resize-none"
          rows={2}
          data-testid="input-wartime-medical" />
      </div>

      <div className="flex flex-wrap gap-5 py-2">
        <label className="flex items-center gap-2 cursor-pointer">
          <input type="checkbox" {...register("hasPets")} className="w-4 h-4 accent-amber-500" />
          <span className="text-slate-300 text-sm">Have pets</span>
        </label>
        <label className="flex items-center gap-2 cursor-pointer">
          <input type="checkbox" {...register("hasSupplyKit")} className="w-4 h-4 accent-emerald-500" />
          <span className="text-slate-300 text-sm">Already have a 72h supply kit</span>
        </label>
        <label className="flex items-center gap-2 cursor-pointer">
          <input type="checkbox" {...register("hasEvacPlan")} className="w-4 h-4 accent-blue-500" />
          <span className="text-slate-300 text-sm">Have an evacuation plan</span>
        </label>
      </div>

      <Button
        type="submit"
        className="w-full bg-amber-600 hover:bg-amber-700 text-black font-black py-4 text-base"
        disabled={mutation.isPending}
        data-testid="button-join-wartime"
      >
        {mutation.isPending ? (
          <><Loader2 className="w-5 h-5 mr-2 animate-spin" />Joining the Network...</>
        ) : (
          <><ShieldCheck className="w-5 h-5 mr-2" />Join the Readiness Network</>
        )}
      </Button>

      <p className="text-slate-500 text-xs text-center">
        Free to join. Your data is stored securely and only used to coordinate local preparedness networks.
      </p>
    </form>
  );
}

function SuccessBanner({ code }: { code: string }) {
  const [copied, setCopied] = useState(false);
  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <motion.div initial={{ opacity: 0, scale: 0.97 }} animate={{ opacity: 1, scale: 1 }}
      className="space-y-4">
      <Card className="bg-emerald-950/60 border-emerald-500/50">
        <CardContent className="p-6 space-y-4">
          <div className="flex items-center gap-3">
            <ShieldCheck className="w-6 h-6 text-emerald-400" />
            <div>
              <p className="text-emerald-300 font-black text-lg">Network Joined — You Are Registered</p>
              <p className="text-emerald-400/70 text-sm">Save your member code below</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="flex-1 bg-slate-950/60 border border-emerald-500/30 rounded-xl px-5 py-3">
              <span className="text-emerald-300 font-mono font-bold text-2xl tracking-widest" data-testid="text-member-code">{code}</span>
            </div>
            <Button onClick={handleCopy} className="bg-emerald-600 hover:bg-emerald-700 text-white" data-testid="button-copy-member-code">
              {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
            </Button>
          </div>
        </CardContent>
      </Card>
      <div className="flex flex-col sm:flex-row gap-3">
        <Link href="/emergency-exit" className="flex-1">
          <Button className="w-full bg-red-600 hover:bg-red-700 text-white font-bold">
            Register Exit Plan →
          </Button>
        </Link>
        <Button variant="outline" className="flex-1 border-slate-600 text-slate-300"
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}>
          View Readiness Guide ↑
        </Button>
      </div>
    </motion.div>
  );
}

export default function WartimeReadinessPage() {
  const [memberCode, setMemberCode] = useState<string | null>(null);
  const { data: countData } = useQuery<any>({ queryKey: ["/api/wartime/count"] });

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <SEOMeta
        title="UAE Wartime & Crisis Readiness Network | Emergency Preparedness Dubai | DeliWer"
        description="Join Dubai's expat crisis preparedness network. Get readiness instructions, alert level guides, 72-hour supply checklists, shelter-in-place protocols, and community coordination tools for UAE residents."
        canonical="https://www.deliwer.com/wartime-readiness"
        keywords="UAE wartime preparedness, Dubai emergency readiness, expat crisis plan UAE, Dubai evacuation plan, war preparedness Dubai, emergency network UAE, crisis management Dubai, UAE expat safety, Dubai shelter plan, emergency checklist Dubai"
      />
      <Navigation />

      {/* Hero */}
      <div className="relative bg-gradient-to-br from-amber-950 via-slate-950 to-slate-950 border-b border-amber-900/30 pt-[104px]">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-amber-900/15 via-transparent to-transparent pointer-events-none" />
        <div className="max-w-5xl mx-auto px-4 py-14 relative">
          <div className="flex items-center gap-3 mb-6 flex-wrap">
            <div className="p-2 bg-amber-600/20 border border-amber-500/40 rounded-xl">
              <Radio className="w-6 h-6 text-amber-400" />
            </div>
            <Badge className="bg-amber-500/20 text-amber-300 border-amber-500/40 text-xs font-black uppercase tracking-widest">
              Free Membership — UAE Residents Only
            </Badge>
            {countData?.count > 0 && (
              <Badge className="bg-slate-800 text-slate-300 border-slate-700 text-xs">
                {countData.count.toLocaleString()} members registered
              </Badge>
            )}
          </div>

          <h1 className="text-4xl md:text-5xl font-black text-white mb-4 leading-tight">
            UAE Crisis & Wartime<br />
            <span className="text-amber-400">Readiness Network</span>
          </h1>
          <p className="text-slate-400 text-lg max-w-2xl mb-8">
            Register your household. Know your alert level. Have a plan. This free network gives UAE
            residents structured preparedness instructions — from normal conditions through full evacuation.
          </p>

          <div className="flex flex-wrap gap-5">
            {[
              { icon: Radio, text: "4-level alert system" },
              { icon: Package, text: "72h supply kit guide" },
              { icon: MapPin, text: "Shelter-in-place protocol" },
              { icon: Users, text: "Community coordination" },
            ].map(({ icon: Icon, text }) => (
              <div key={text} className="flex items-center gap-2 text-slate-400 text-sm">
                <Icon className="w-4 h-4 text-amber-400" />
                {text}
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 py-10 space-y-14">

        {/* Alert Level System */}
        <div>
          <h2 className="text-2xl font-black text-white mb-2 flex items-center gap-3">
            <AlertCircle className="w-6 h-6 text-amber-400" />
            Alert Level System
          </h2>
          <p className="text-slate-500 text-sm mb-6">Know which level applies and what to do at each stage. Monitor official UAE government channels (WAM, UAE government app) for official alerts.</p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {ALERT_LEVELS.map((level) => (
              <Card key={level.level} className={`border ${level.bg}`}>
                <CardHeader className="pb-2">
                  <div className="flex items-center gap-3">
                    <div className={`w-3 h-3 rounded-full ${level.dot}`} />
                    <Badge className={`text-xs font-black uppercase ${level.badgeBg}`}>{level.level}</Badge>
                    <span className={`font-bold text-sm ${level.color}`}>{level.label}</span>
                  </div>
                  <p className="text-slate-500 text-xs mt-1">{level.desc}</p>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-1.5">
                    {level.actions.map((action) => (
                      <li key={action} className="flex items-start gap-2 text-sm text-slate-300">
                        <ChevronRight className="w-3 h-3 shrink-0 mt-1 text-slate-600" />
                        {action}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Join Form + Registration */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8" id="join">
          <div className="lg:col-span-3">
            <Card className="bg-slate-900/80 border-slate-700/60 shadow-xl">
              <CardHeader>
                <CardTitle className="text-white text-xl flex items-center gap-3">
                  <ShieldCheck className="w-5 h-5 text-amber-400" />
                  Join the Readiness Network
                </CardTitle>
                <p className="text-slate-400 text-sm">Register your household so local area coordinators can include you in emergency response. Takes 2 minutes.</p>
              </CardHeader>
              <CardContent>
                {memberCode ? (
                  <SuccessBanner code={memberCode} />
                ) : (
                  <JoinForm onSuccess={setMemberCode} />
                )}
              </CardContent>
            </Card>
          </div>

          {/* Emergency Contacts Sidebar */}
          <div className="lg:col-span-2 space-y-4">
            <Card className="bg-red-950/30 border-red-500/30">
              <CardHeader className="pb-2">
                <CardTitle className="text-red-300 text-xs font-black uppercase tracking-widest flex items-center gap-2">
                  <Phone className="w-4 h-4" />
                  UAE Emergency Numbers
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                {[
                  { label: "Police / Emergency", num: "999" },
                  { label: "Ambulance", num: "998" },
                  { label: "Civil Defense", num: "997" },
                  { label: "Coast Guard", num: "996" },
                  { label: "Dubai Police", num: "+971 4 609 6999" },
                  { label: "Dubai Health Authority", num: "800 342" },
                  { label: "Government Helpline", num: "800 4673" },
                ].map(({ label, num }) => (
                  <a key={label} href={`tel:${num.replace(/\s/g, "")}`}
                    className="flex justify-between items-center py-2 px-3 rounded-lg bg-slate-900/60 hover:bg-slate-800/80 border border-slate-700/30 transition-colors"
                    data-testid={`link-wartime-${label.toLowerCase().replace(/\s/g, "-")}`}>
                    <span className="text-slate-400 text-xs">{label}</span>
                    <span className="text-white font-mono font-bold text-sm">{num}</span>
                  </a>
                ))}
              </CardContent>
            </Card>

            <Card className="bg-amber-950/30 border-amber-500/30">
              <CardContent className="p-4">
                <p className="text-amber-300 font-bold text-sm mb-2 flex items-center gap-2">
                  <AlertTriangle className="w-4 h-4" />
                  Also register your Exit Plan
                </p>
                <p className="text-slate-400 text-xs mb-3">If you need to leave the UAE fast, your registered exit plan gives you a personalized evacuation strategy.</p>
                <Link href="/emergency-exit">
                  <Button className="w-full bg-red-600 hover:bg-red-700 text-white text-xs font-bold" data-testid="button-wartime-to-exit">
                    Register Exit Plan →
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* 72h Supply Kit */}
        <div>
          <h2 className="text-2xl font-black text-white mb-2 flex items-center gap-3">
            <Package className="w-6 h-6 text-emerald-400" />
            72-Hour Household Supply Kit
          </h2>
          <p className="text-slate-500 text-sm mb-6">Build this kit before a crisis. Each category below represents a minimum viable emergency supply set for a household of 3–4 people.</p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {SUPPLY_KIT.map(({ category, icon: Icon, color, items }) => (
              <Card key={category} className="bg-slate-900/70 border-slate-700/50">
                <CardHeader className="pb-2">
                  <CardTitle className="text-base flex items-center gap-2">
                    <Icon className={`w-5 h-5 ${color}`} />
                    <span className={color}>{category}</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-1.5">
                    {items.map((item) => (
                      <li key={item} className="flex items-start gap-2 text-xs text-slate-400">
                        <CheckCircle2 className="w-3 h-3 shrink-0 mt-0.5 text-slate-600" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Communication Plan */}
        <div>
          <h2 className="text-2xl font-black text-white mb-2 flex items-center gap-3">
            <Wifi className="w-6 h-6 text-blue-400" />
            Communication Plan — When Networks Fail
          </h2>
          <p className="text-slate-500 text-sm mb-6">In a severe crisis, internet and mobile networks may be overloaded or shut down. Build your communication plan now.</p>
          <div className="space-y-3">
            {COMMS_PLAN.map(({ step, title, desc, color }) => (
              <Card key={step} className={`border ${color}`}>
                <CardContent className="p-4 flex items-start gap-4">
                  <div className="w-8 h-8 rounded-full bg-slate-800 border border-slate-600 flex items-center justify-center shrink-0 font-black text-sm text-white">
                    {step}
                  </div>
                  <div>
                    <p className="text-white font-bold text-sm mb-1">{title}</p>
                    <p className="text-slate-400 text-xs">{desc}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <Card className="mt-4 bg-slate-800/40 border-slate-700/40">
            <CardContent className="p-4 flex items-start gap-3">
              <WifiOff className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
              <div>
                <p className="text-amber-300 font-bold text-sm">If all networks fail</p>
                <p className="text-slate-400 text-xs mt-1">
                  Use <strong className="text-white">Zello</strong> (push-to-talk radio over any connection),
                  <strong className="text-white"> Bridgefy</strong> (Bluetooth mesh — no internet needed, range ~330m),
                  or <strong className="text-white">Meshtastic</strong> (LoRa radio mesh).
                  Download these apps now, before you need them.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Shelter Locations */}
        <div>
          <h2 className="text-2xl font-black text-white mb-2 flex items-center gap-3">
            <Home className="w-6 h-6 text-violet-400" />
            Known Safe Assembly Locations — Dubai
          </h2>
          <p className="text-slate-500 text-sm mb-6">These locations are structurally robust and have been used as assembly or shelter points. Always follow official UAE civil defense guidance.</p>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-slate-700/50">
                  <th className="text-left py-3 px-4 text-slate-400 font-bold text-xs uppercase tracking-wider">Location</th>
                  <th className="text-left py-3 px-4 text-slate-400 font-bold text-xs uppercase tracking-wider">Area</th>
                  <th className="text-left py-3 px-4 text-slate-400 font-bold text-xs uppercase tracking-wider">Type</th>
                </tr>
              </thead>
              <tbody>
                {SHELTER_LOCATIONS.map(({ name, area, type }) => (
                  <tr key={name} className="border-b border-slate-800/50 hover:bg-slate-800/30 transition-colors">
                    <td className="py-3 px-4 text-white font-medium">{name}</td>
                    <td className="py-3 px-4 text-slate-400">{area}</td>
                    <td className="py-3 px-4 text-slate-500 text-xs">{type}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Official Channels */}
        <Card className="bg-slate-900/60 border-slate-700/40">
          <CardContent className="p-6">
            <h3 className="text-white font-black text-lg mb-4 flex items-center gap-2">
              <Radio className="w-5 h-5 text-blue-400" />
              Official UAE Information Channels — Trust Only These
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
              {[
                { name: "UAE Government Portal", url: "u.ae", type: "Official Gov" },
                { name: "UAE Ministry of Interior", url: "moi.gov.ae", type: "Police / Security" },
                { name: "WAM (UAE State News Agency)", url: "wam.ae", type: "Official News" },
                { name: "Dubai Media Office", url: "mediaoffice.ae", type: "Official Announcements" },
                { name: "Dubai Civil Defense", url: "dcd.gov.ae", type: "Fire / Emergency" },
                { name: "NCEMA (National Crisis Authority)", url: "ncema.gov.ae", type: "National Emergency" },
              ].map(({ name, url, type }) => (
                <a key={name} href={`https://${url}`} target="_blank" rel="noopener noreferrer"
                  className="flex items-center justify-between py-2 px-3 bg-slate-800/50 rounded-lg hover:bg-slate-800 border border-slate-700/30 transition-colors">
                  <div>
                    <p className="text-white font-medium">{name}</p>
                    <p className="text-slate-500 text-xs">{url}</p>
                  </div>
                  <Badge className="bg-blue-500/15 text-blue-300 border-blue-500/30 text-xs">{type}</Badge>
                </a>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* CTA to Emergency Exit */}
        <Card className="bg-gradient-to-r from-red-950/60 to-slate-900/60 border-red-500/30 text-center">
          <CardContent className="py-10">
            <AlertTriangle className="w-10 h-10 text-red-400 mx-auto mb-4" />
            <h3 className="text-2xl font-black text-white mb-3">Have a registered exit plan?</h3>
            <p className="text-slate-400 mb-6 max-w-xl mx-auto">
              Readiness + an exit plan = full preparedness. Register your personalized evacuation
              exit strategy at our Emergency Exit page — free for all UAE residents.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link href="/emergency-exit">
                <Button className="bg-red-600 hover:bg-red-700 text-white font-bold px-8 py-3" data-testid="button-wartime-exit-cta">
                  Register Emergency Exit Plan →
                </Button>
              </Link>
              <Button variant="outline" className="border-slate-600 text-slate-300 hover:text-white px-8"
                onClick={() => document.getElementById("join")?.scrollIntoView({ behavior: "smooth" })}
                data-testid="button-wartime-join-cta">
                Join Readiness Network ↑
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
