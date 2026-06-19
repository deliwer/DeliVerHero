import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { SEOMeta } from "@/components/seo-meta";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import {
  CheckCircle2, Camera, Video, Wifi, Home, Wrench, Droplets, Zap,
  Building2, Users, ArrowRight, ChevronRight, Phone, Mail,
  ClipboardCheck, Star, Shield, Clock, MessageSquare, Globe
} from "lucide-react";
import { SiWhatsapp, SiTelegram } from "react-icons/si";

// ── Types ─────────────────────────────────────────────────────────────────────
interface BookingForm {
  name: string;
  email: string;
  phone: string;
  propertyType: string;
  communityArea: string;
  unitSize: string;
  serviceType: string;
  preferredDate: string;
  notes: string;
}

interface BrokerForm {
  brokerName: string;
  brokerPhone: string;
  brokerEmail: string;
  brokerage: string;
  clientName: string;
  clientPhone: string;
  communityArea: string;
  handoverDate: string;
  serviceType: string;
}

interface DeveloperForm {
  developerName: string;
  projectName: string;
  numberOfUnits: string;
  expectedHandoverDate: string;
  contactPerson: string;
  email: string;
  mobile: string;
  notes: string;
}

// ── Service packages ─────────────────────────────────────────────────────────
const SERVICES = [
  {
    id: "basic",
    title: "Basic Snagging",
    price: "AED 499",
    badge: "Most Popular",
    badgeColor: "bg-emerald-500",
    icon: ClipboardCheck,
    color: "border-emerald-500",
    features: ["Full property inspection", "Defect identification", "Photo report within 24hrs"],
  },
  {
    id: "premium",
    title: "Premium Snagging",
    price: "AED 899",
    badge: "Best Value",
    badgeColor: "bg-amber-500",
    icon: Star,
    color: "border-amber-500",
    features: [
      "Detailed snagging report",
      "HD video walkthrough",
      "Defect tracking system",
      "Follow-up verification visit",
    ],
  },
  {
    id: "remote",
    title: "Remote Investor Inspection",
    price: "AED 699",
    badge: "Overseas",
    badgeColor: "bg-blue-500",
    icon: Globe,
    color: "border-blue-500",
    features: [
      "Live video inspection",
      "Recorded walkthrough",
      "Remote PDF report",
      "WhatsApp / Zoom delivery",
    ],
  },
  {
    id: "move-in-readiness",
    title: "Move-In Readiness Package",
    price: "AED 1,799",
    badge: "Complete",
    badgeColor: "bg-purple-500",
    icon: Home,
    color: "border-purple-500",
    features: [
      "Full snagging inspection",
      "Professional deep cleaning",
      "AC inspection",
      "Water quality check",
      "Utility setup coordination",
      "Home readiness checklist",
    ],
  },
];

// ── Timeline steps ────────────────────────────────────────────────────────────
const TIMELINE = [
  { label: "Property Reserved", icon: Building2, done: true },
  { label: "Property Handover", icon: ClipboardCheck, done: true },
  { label: "Snagging Inspection", icon: Camera, active: true },
  { label: "Move-In Ready", icon: CheckCircle2 },
  { label: "Services Activated", icon: Zap },
  { label: "Resident Lifecycle", icon: Home },
];

// ── Next steps after snagging ─────────────────────────────────────────────────
const NEXT_STEPS = [
  { icon: Droplets, label: "Water Delivery", href: "/aquacafe" },
  { icon: Wrench, label: "AC Maintenance", href: "/home-services" },
  { icon: Home, label: "Deep Cleaning", href: "/home-services" },
  { icon: Zap, label: "DEWA Setup", href: "/dewa-activation" },
  { icon: Wifi, label: "Internet Setup", href: "/home-services" },
  { icon: Users, label: "Relocation Services", href: "/move-in-services" },
];

// ── api helper ────────────────────────────────────────────────────────────────
async function post(url: string, data: any) {
  const res = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error(await res.text());
  return res.json();
}

// ─────────────────────────────────────────────────────────────────────────────
export default function SnaggingPage() {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState<"book" | "broker" | "developer">("book");
  const [selectedService, setSelectedService] = useState("basic");

  // booking form
  const { register: regBook, handleSubmit: handleBook, setValue: setBook, formState: { errors: bookErrors } } = useForm<BookingForm>();
  // broker form
  const { register: regBroker, handleSubmit: handleBroker, setValue: setBroker } = useForm<BrokerForm>();
  // developer form
  const { register: regDev, handleSubmit: handleDev } = useForm<DeveloperForm>();

  const bookMutation = useMutation({
    mutationFn: (data: BookingForm) => post("/api/snagging/request", { ...data, serviceType: selectedService }),
    onSuccess: () => toast({ title: "✅ Inspection Booked!", description: "Our team will contact you within 2 hours to confirm." }),
    onError: () => toast({ title: "Error", description: "Please try again or WhatsApp us directly.", variant: "destructive" }),
  });

  const brokerMutation = useMutation({
    mutationFn: (data: BrokerForm) => post("/api/snagging/broker-referral", { ...data, source: "broker" }),
    onSuccess: () => toast({ title: "✅ Referral Submitted!", description: "We'll contact your client within 2 hours." }),
    onError: () => toast({ title: "Error", description: "Please try again.", variant: "destructive" }),
  });

  const devMutation = useMutation({
    mutationFn: (data: DeveloperForm) =>
      post("/api/snagging/developer-enquiry", { ...data, numberOfUnits: parseInt(data.numberOfUnits) || 0 }),
    onSuccess: () => toast({ title: "✅ Enquiry Received!", description: "Our bulk snagging team will reach out within 24 hours." }),
    onError: () => toast({ title: "Error", description: "Please try again.", variant: "destructive" }),
  });

  return (
    <>
      <SEOMeta
        title="Property Snagging Dubai | Move-In Readiness Inspection | DeliWer"
        description="Independent property snagging, handover inspection, and move-in readiness services in Dubai. Book online or via broker referral."
        canonical="https://deliwer.com/snagging"
        keywords="property snagging dubai, handover inspection, move-in readiness, snagging report dubai, property defects"
      />

      {/* ── HERO ──────────────────────────────────────────────────────────── */}
      <section className="relative bg-gradient-to-br from-slate-900 via-slate-800 to-emerald-950 text-white py-20 px-4 overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-500 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-amber-500 rounded-full blur-3xl" />
        </div>
        <div className="relative max-w-4xl mx-auto text-center">
          <Badge className="mb-4 bg-emerald-600 text-white">Property Snagging & Move-In Readiness</Badge>
          <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-4">
            Before You Move In,<br />
            <span className="text-emerald-400">Make Sure Everything Works</span>
          </h1>
          <p className="text-lg text-slate-300 mb-8 max-w-2xl mx-auto">
            Independent Property Snagging, Handover Inspection, and Move-In Readiness Services across Dubai.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Button
              size="lg"
              className="bg-emerald-600 hover:bg-emerald-700 text-white"
              onClick={() => document.getElementById("book-form")?.scrollIntoView({ behavior: "smooth" })}
            >
              Book Inspection <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
            <a href="https://wa.me/971523946311?text=Hi%2C%20I%20want%20to%20book%20a%20property%20snagging%20inspection." target="_blank" rel="noopener noreferrer">
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10 w-full sm:w-auto">
                <SiWhatsapp className="mr-2 h-4 w-4 text-emerald-400" /> WhatsApp Us
              </Button>
            </a>
          </div>
          {/* trust badges */}
          <div className="flex flex-wrap justify-center gap-6 mt-10 text-sm text-slate-400">
            <span className="flex items-center gap-1"><Shield className="h-4 w-4 text-emerald-400" /> Independent Inspectors</span>
            <span className="flex items-center gap-1"><Clock className="h-4 w-4 text-emerald-400" /> Report Within 24hrs</span>
            <span className="flex items-center gap-1"><CheckCircle2 className="h-4 w-4 text-emerald-400" /> 500+ Inspections</span>
          </div>
        </div>
      </section>

      {/* ── PROPERTY JOURNEY TIMELINE ────────────────────────────────────── */}
      <section className="py-12 px-4 bg-slate-950">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold text-white text-center mb-8">Your Property Journey</h2>
          <div className="flex flex-wrap justify-center items-center gap-2">
            {TIMELINE.map((step, i) => (
              <div key={step.label} className="flex items-center gap-2">
                <div className={`flex flex-col items-center ${step.active ? "text-emerald-400" : step.done ? "text-slate-400" : "text-slate-600"}`}>
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center border-2 ${step.active ? "border-emerald-400 bg-emerald-400/10" : step.done ? "border-slate-600 bg-slate-800" : "border-slate-700 bg-slate-900"}`}>
                    <step.icon className="h-4 w-4" />
                  </div>
                  <span className="text-xs mt-1 text-center max-w-[70px] leading-tight">{step.label}</span>
                </div>
                {i < TIMELINE.length - 1 && <ChevronRight className="h-4 w-4 text-slate-700 flex-shrink-0 mb-4" />}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── SERVICE PACKAGES ─────────────────────────────────────────────── */}
      <section className="py-16 px-4 bg-slate-900">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl font-bold text-white text-center mb-2">Choose Your Inspection</h2>
          <p className="text-slate-400 text-center mb-10">Transparent pricing. Professional reports. Same-week availability.</p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {SERVICES.map((svc) => (
              <Card
                key={svc.id}
                className={`bg-slate-800 border-2 cursor-pointer transition-all ${selectedService === svc.id ? svc.color + " shadow-lg shadow-emerald-500/10" : "border-slate-700 hover:border-slate-500"}`}
                onClick={() => {
                  setSelectedService(svc.id);
                  setBook("serviceType", svc.id);
                  document.getElementById("book-form")?.scrollIntoView({ behavior: "smooth" });
                }}
              >
                <CardHeader className="pb-2">
                  <div className="flex items-start justify-between">
                    <svc.icon className="h-7 w-7 text-emerald-400" />
                    <span className={`text-xs text-white px-2 py-0.5 rounded-full ${svc.badgeColor}`}>{svc.badge}</span>
                  </div>
                  <CardTitle className="text-white text-base mt-2">{svc.title}</CardTitle>
                  <CardDescription className="text-emerald-400 font-bold text-lg">{svc.price}</CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-1.5">
                    {svc.features.map((f) => (
                      <li key={f} className="flex items-start gap-2 text-sm text-slate-300">
                        <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400 mt-0.5 flex-shrink-0" />
                        {f}
                      </li>
                    ))}
                  </ul>
                  <Button
                    className={`w-full mt-4 ${selectedService === svc.id ? "bg-emerald-600 hover:bg-emerald-700" : "bg-slate-700 hover:bg-slate-600"} text-white`}
                    size="sm"
                  >
                    {selectedService === svc.id ? "Selected ✓" : "Select"}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* ── BOOKING / BROKER / DEVELOPER TABS ───────────────────────────── */}
      <section id="book-form" className="py-16 px-4 bg-slate-950">
        <div className="max-w-3xl mx-auto">
          {/* Tab switcher */}
          <div className="flex rounded-lg overflow-hidden border border-slate-700 mb-8">
            {([
              { key: "book", label: "Book Inspection" },
              { key: "broker", label: "Broker Referral" },
              { key: "developer", label: "Developer Enquiry" },
            ] as const).map((tab) => (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key)}
                className={`flex-1 py-3 text-sm font-medium transition-all ${activeTab === tab.key ? "bg-emerald-600 text-white" : "text-slate-400 hover:text-white bg-slate-800"}`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* ── BOOKING FORM ── */}
          {activeTab === "book" && (
            <Card className="bg-slate-800 border-slate-700">
              <CardHeader>
                <CardTitle className="text-white">Book Your Snagging Inspection</CardTitle>
                <CardDescription className="text-slate-400">We'll confirm your slot within 2 hours</CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleBook((d) => bookMutation.mutate(d))} className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label className="text-slate-300">Full Name *</Label>
                      <Input {...regBook("name", { required: true })} placeholder="Ahmed Al Mansoori" className="bg-slate-700 border-slate-600 text-white" />
                    </div>
                    <div>
                      <Label className="text-slate-300">Phone *</Label>
                      <Input {...regBook("phone", { required: true })} placeholder="+971 50 123 4567" className="bg-slate-700 border-slate-600 text-white" />
                    </div>
                    <div>
                      <Label className="text-slate-300">Email *</Label>
                      <Input {...regBook("email", { required: true })} type="email" placeholder="you@email.com" className="bg-slate-700 border-slate-600 text-white" />
                    </div>
                    <div>
                      <Label className="text-slate-300">Community / Area</Label>
                      <Input {...regBook("communityArea")} placeholder="JVC, Dubai Marina, Downtown…" className="bg-slate-700 border-slate-600 text-white" />
                    </div>
                    <div>
                      <Label className="text-slate-300">Property Type</Label>
                      <Select onValueChange={(v) => setBook("propertyType", v)}>
                        <SelectTrigger className="bg-slate-700 border-slate-600 text-white">
                          <SelectValue placeholder="Select type" />
                        </SelectTrigger>
                        <SelectContent className="bg-slate-800 border-slate-700">
                          {["Apartment", "Villa", "Townhouse", "Penthouse", "Office"].map((t) => (
                            <SelectItem key={t} value={t.toLowerCase()} className="text-white">{t}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label className="text-slate-300">Unit Size</Label>
                      <Select onValueChange={(v) => setBook("unitSize", v)}>
                        <SelectTrigger className="bg-slate-700 border-slate-600 text-white">
                          <SelectValue placeholder="Select size" />
                        </SelectTrigger>
                        <SelectContent className="bg-slate-800 border-slate-700">
                          {["Studio", "1BR", "2BR", "3BR", "4BR+"].map((s) => (
                            <SelectItem key={s} value={s} className="text-white">{s}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label className="text-slate-300">Preferred Date</Label>
                      <Input {...regBook("preferredDate")} type="date" className="bg-slate-700 border-slate-600 text-white" />
                    </div>
                    <div>
                      <Label className="text-slate-300">Selected Package</Label>
                      <div className="h-10 flex items-center px-3 rounded-md border border-slate-600 bg-slate-700 text-emerald-400 text-sm capitalize font-medium">
                        {selectedService.replace("-", " ")}
                      </div>
                    </div>
                  </div>
                  <div>
                    <Label className="text-slate-300">Additional Notes</Label>
                    <Textarea {...regBook("notes")} placeholder="Any specific concerns about the property?" className="bg-slate-700 border-slate-600 text-white" rows={3} />
                  </div>
                  <Button type="submit" className="w-full bg-emerald-600 hover:bg-emerald-700 text-white" disabled={bookMutation.isPending}>
                    {bookMutation.isPending ? "Submitting…" : "Book Inspection"}
                  </Button>
                  <p className="text-center text-xs text-slate-500">or WhatsApp us directly at <a href="https://wa.me/971523946311" className="text-emerald-400 underline">+971 52 394 6311</a></p>
                </form>
              </CardContent>
            </Card>
          )}

          {/* ── BROKER REFERRAL FORM ── */}
          {activeTab === "broker" && (
            <Card className="bg-slate-800 border-slate-700">
              <CardHeader>
                <CardTitle className="text-white">Submit a Client Snagging Request</CardTitle>
                <CardDescription className="text-slate-400">
                  Earn commission on every confirmed inspection. This service can be offered as part of your client's property handover experience.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleBroker((d) => brokerMutation.mutate(d))} className="space-y-4">
                  <p className="text-xs text-emerald-400 font-medium uppercase tracking-wide">Your Details</p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label className="text-slate-300">Your Name *</Label>
                      <Input {...regBroker("brokerName", { required: true })} placeholder="Broker / Agent Name" className="bg-slate-700 border-slate-600 text-white" />
                    </div>
                    <div>
                      <Label className="text-slate-300">Your Phone *</Label>
                      <Input {...regBroker("brokerPhone", { required: true })} placeholder="+971 50 000 0000" className="bg-slate-700 border-slate-600 text-white" />
                    </div>
                    <div>
                      <Label className="text-slate-300">Your Email</Label>
                      <Input {...regBroker("brokerEmail")} type="email" placeholder="broker@agency.com" className="bg-slate-700 border-slate-600 text-white" />
                    </div>
                    <div>
                      <Label className="text-slate-300">Brokerage / Agency</Label>
                      <Input {...regBroker("brokerage")} placeholder="Agency name" className="bg-slate-700 border-slate-600 text-white" />
                    </div>
                  </div>
                  <p className="text-xs text-emerald-400 font-medium uppercase tracking-wide mt-2">Client Details</p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label className="text-slate-300">Client Name *</Label>
                      <Input {...regBroker("clientName", { required: true })} placeholder="Client Full Name" className="bg-slate-700 border-slate-600 text-white" />
                    </div>
                    <div>
                      <Label className="text-slate-300">Client Phone *</Label>
                      <Input {...regBroker("clientPhone", { required: true })} placeholder="+971 50 000 0000" className="bg-slate-700 border-slate-600 text-white" />
                    </div>
                    <div>
                      <Label className="text-slate-300">Community / Area</Label>
                      <Input {...regBroker("communityArea")} placeholder="JVC, Business Bay…" className="bg-slate-700 border-slate-600 text-white" />
                    </div>
                    <div>
                      <Label className="text-slate-300">Expected Handover Date</Label>
                      <Input {...regBroker("handoverDate")} type="date" className="bg-slate-700 border-slate-600 text-white" />
                    </div>
                    <div className="md:col-span-2">
                      <Label className="text-slate-300">Inspection Type</Label>
                      <Select onValueChange={(v) => setBroker("serviceType", v)}>
                        <SelectTrigger className="bg-slate-700 border-slate-600 text-white">
                          <SelectValue placeholder="Select service" />
                        </SelectTrigger>
                        <SelectContent className="bg-slate-800 border-slate-700">
                          <SelectItem value="basic" className="text-white">Basic Snagging — AED 499</SelectItem>
                          <SelectItem value="premium" className="text-white">Premium Snagging — AED 899</SelectItem>
                          <SelectItem value="remote" className="text-white">Remote Inspection — AED 699</SelectItem>
                          <SelectItem value="move-in-readiness" className="text-white">Move-In Readiness Package — AED 1,799</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <div className="rounded-lg bg-emerald-900/30 border border-emerald-700 p-3 text-sm text-emerald-300">
                    💰 You earn <strong>10% commission</strong> on every confirmed inspection you refer.
                  </div>
                  <Button type="submit" className="w-full bg-emerald-600 hover:bg-emerald-700 text-white" disabled={brokerMutation.isPending}>
                    {brokerMutation.isPending ? "Submitting…" : "Submit Referral"}
                  </Button>
                </form>
              </CardContent>
            </Card>
          )}

          {/* ── DEVELOPER ENQUIRY FORM ── */}
          {activeTab === "developer" && (
            <Card className="bg-slate-800 border-slate-700">
              <CardHeader>
                <CardTitle className="text-white">Bulk Snagging for Developers</CardTitle>
                <CardDescription className="text-slate-400">We handle entire tower handovers. Let's discuss your project.</CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleDev((d) => devMutation.mutate(d))} className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label className="text-slate-300">Developer Name *</Label>
                      <Input {...regDev("developerName", { required: true })} placeholder="EMAAR, Damac, Meraas…" className="bg-slate-700 border-slate-600 text-white" />
                    </div>
                    <div>
                      <Label className="text-slate-300">Project Name *</Label>
                      <Input {...regDev("projectName", { required: true })} placeholder="e.g. Creek Views III" className="bg-slate-700 border-slate-600 text-white" />
                    </div>
                    <div>
                      <Label className="text-slate-300">Number of Units</Label>
                      <Input {...regDev("numberOfUnits")} type="number" placeholder="e.g. 250" className="bg-slate-700 border-slate-600 text-white" />
                    </div>
                    <div>
                      <Label className="text-slate-300">Expected Handover Date</Label>
                      <Input {...regDev("expectedHandoverDate")} type="date" className="bg-slate-700 border-slate-600 text-white" />
                    </div>
                    <div>
                      <Label className="text-slate-300">Contact Person *</Label>
                      <Input {...regDev("contactPerson", { required: true })} placeholder="Name & Role" className="bg-slate-700 border-slate-600 text-white" />
                    </div>
                    <div>
                      <Label className="text-slate-300">Mobile *</Label>
                      <Input {...regDev("mobile", { required: true })} placeholder="+971 50 000 0000" className="bg-slate-700 border-slate-600 text-white" />
                    </div>
                    <div className="md:col-span-2">
                      <Label className="text-slate-300">Email *</Label>
                      <Input {...regDev("email", { required: true })} type="email" placeholder="developer@project.com" className="bg-slate-700 border-slate-600 text-white" />
                    </div>
                    <div className="md:col-span-2">
                      <Label className="text-slate-300">Additional Notes</Label>
                      <Textarea {...regDev("notes")} placeholder="Special requirements, phased handovers, etc." className="bg-slate-700 border-slate-600 text-white" rows={3} />
                    </div>
                  </div>
                  <Button type="submit" className="w-full bg-emerald-600 hover:bg-emerald-700 text-white" disabled={devMutation.isPending}>
                    {devMutation.isPending ? "Submitting…" : "Submit Enquiry"}
                  </Button>
                </form>
              </CardContent>
            </Card>
          )}
        </div>
      </section>

      {/* ── REMOTE BOOKING OPTIONS ───────────────────────────────────────── */}
      <section className="py-12 px-4 bg-slate-900">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-2xl font-bold text-white mb-2">Book via Your Preferred Channel</h2>
          <p className="text-slate-400 mb-8">Overseas investor? No problem — we support remote booking and live video inspections.</p>
          <div className="flex flex-wrap justify-center gap-4">
            <a href="https://wa.me/971523946311?text=I%20want%20to%20book%20a%20property%20snagging%20inspection" target="_blank" rel="noopener noreferrer">
              <Button className="bg-[#25D366] hover:bg-[#20bd5a] text-white gap-2">
                <SiWhatsapp className="h-4 w-4" /> Book on WhatsApp
              </Button>
            </a>
            <a href="https://t.me/DeliWerSupport" target="_blank" rel="noopener noreferrer">
              <Button className="bg-[#229ED9] hover:bg-[#1e8ec4] text-white gap-2">
                <SiTelegram className="h-4 w-4" /> Book on Telegram
              </Button>
            </a>
            <a href="tel:+971523946311">
              <Button variant="outline" className="border-slate-600 text-white hover:bg-slate-700 gap-2">
                <Phone className="h-4 w-4" /> Call Us
              </Button>
            </a>
            <a href="mailto:info@deliwer.com">
              <Button variant="outline" className="border-slate-600 text-white hover:bg-slate-700 gap-2">
                <Mail className="h-4 w-4" /> Email Us
              </Button>
            </a>
          </div>
        </div>
      </section>

      {/* ── POST-SNAGGING: RECOMMENDED NEXT STEPS ───────────────────────── */}
      <section className="py-16 px-4 bg-slate-950">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold text-white text-center mb-2">Recommended Next Steps</h2>
          <p className="text-slate-400 text-center mb-8">After your snagging is complete, activate the services that make your home truly ready.</p>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
            {NEXT_STEPS.map((step) => (
              <a key={step.label} href={step.href} className="group">
                <Card className="bg-slate-800 border-slate-700 hover:border-emerald-600 transition-all h-full">
                  <CardContent className="flex flex-col items-center justify-center py-6 gap-2 text-center">
                    <step.icon className="h-8 w-8 text-emerald-400 group-hover:scale-110 transition-transform" />
                    <span className="text-white text-sm font-medium">{step.label}</span>
                    <ArrowRight className="h-3 w-3 text-slate-500 group-hover:text-emerald-400 transition-colors" />
                  </CardContent>
                </Card>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* ── SEO AREA LINKS ───────────────────────────────────────────────── */}
      <section className="py-10 px-4 bg-slate-900 border-t border-slate-800">
        <div className="max-w-4xl mx-auto">
          <h3 className="text-slate-400 text-sm font-medium uppercase tracking-wide mb-4 text-center">Snagging Services Across UAE</h3>
          <div className="flex flex-wrap justify-center gap-3">
            {[
              { label: "Snagging Dubai", href: "/snagging-dubai" },
              { label: "Snagging Sharjah", href: "/snagging-sharjah" },
              { label: "Snagging Ajman", href: "/snagging-ajman" },
              { label: "Property Handover Inspection", href: "/property-handover-inspection" },
              { label: "Move-In Readiness", href: "/move-in-readiness" },
            ].map((link) => (
              <a key={link.href} href={link.href} className="text-slate-400 hover:text-emerald-400 text-sm underline underline-offset-2 transition-colors">
                {link.label}
              </a>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
