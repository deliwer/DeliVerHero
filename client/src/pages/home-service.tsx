import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CalendlyButton } from "@/components/calendly-popup";
import { Helmet } from "react-helmet";
import { 
  Droplets, 
  Home, 
  ArrowRight, 
  CheckCircle2, 
  Sparkles,
  Gift,
  Bike,
  ShoppingBag,
  Clock,
  MessageCircle,
  Smartphone,
  Recycle,
  Sun,
  Zap,
  Leaf,
  Users,
  Copy,
  Check,
  Thermometer,
  Waves,
  Gauge,
  Lightbulb
} from "lucide-react";
import { useState, useMemo } from "react";
import { useToast } from "@/hooks/use-toast";

import homeServiceHeroImg from "@assets/stock_images/professional_service_2cfeb661.jpg";

const homeServicesData = [
  {
    id: "ac-maint",
    title: "AC Maintenance & Servicing",
    description: "Prevent breakdowns, improve cooling efficiency, and extend AC life with scheduled or on-demand servicing.",
    price: "From AED 199",
    time: "60–90 min",
    property: "Apartment • Villa",
    icon: Thermometer,
    tag: "Core Service",
    color: "blue"
  },
  {
    id: "smart-water",
    title: "Smart Water Retrofit",
    description: "Reduce water waste and prevent leaks with smart meters, flow regulators, and auto shut-off systems.",
    price: "From AED 499",
    time: "2–4 hours",
    property: "Apartment • Villa",
    icon: Waves,
    tag: "Water Saving • Sustainability",
    color: "emerald"
  },
  {
    id: "ev-charger",
    title: "EV Charger Installation",
    description: "Home EV charger installation with load assessment and building compliance support.",
    price: "From AED 2,499",
    time: "1 Day",
    property: "Villa • Selected Apartments",
    icon: Zap,
    tag: "EV Ready Home",
    color: "blue"
  },
  {
    id: "smart-home",
    title: "Smart Home Starter Kit",
    description: "Smart lighting, thermostat, sensors, and mobile app control for everyday comfort and efficiency.",
    price: "From AED 899",
    time: "3–5 hours",
    property: "Apartment • Villa",
    icon: Lightbulb,
    tag: "Comfort • Control",
    color: "amber"
  },
  {
    id: "energy-monitor",
    title: "Home Energy Monitoring",
    description: "Track electricity usage in real time and identify savings without modifying DEWA infrastructure.",
    price: "From AED 399",
    time: "2–3 hours",
    property: "Apartment • Villa",
    icon: Gauge,
    tag: "Energy Insight",
    color: "emerald"
  },
  {
    id: "sustainable-upgrade",
    title: "Sustainable Home Upgrade",
    description: "Bundled water efficiency, energy monitoring, and smart controls for greener living.",
    price: "From AED 1,499",
    time: "1 Day",
    property: "Apartment • Villa",
    icon: Leaf,
    tag: "Best Value • Sustainability",
    color: "emerald"
  },
  {
    id: "recycle-removal",
    title: "Recycle & Removal",
    description: "Responsible removal and recycling of old appliances, fixtures, or furniture during upgrades or move-out.",
    price: "From AED 149",
    time: "Same Day",
    property: "Apartment • Villa",
    icon: Recycle,
    tag: "Circular Living",
    color: "orange"
  }
];

export default function HomeService() {
  const { toast } = useToast();
  const [copied, setCopied] = useState(false);
  const referralCode = useMemo(() => "DELIWER" + Math.random().toString(36).substr(2, 6).toUpperCase(), []);
  const referralLink = useMemo(() => `https://deliwer.com/home-service?ref=${referralCode}`, [referralCode]);

  const handleWhatsApp = (serviceName: string) => {
    const text = `Hi DeliWer, I'm interested in the ${serviceName} assessment for my home.`;
    window.open(`https://wa.me/971523946311?text=${encodeURIComponent(text)}`, '_blank');
  };

  const handleCopyReferral = () => {
    navigator.clipboard.writeText(referralLink);
    setCopied(true);
    toast({
      title: "Referral Link Copied!",
      description: "Share with friends to earn rewards when they sign up.",
    });
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Helmet>
        <title>Home Services & Smart Upgrades Dubai | DeliWer</title>
        <meta name="description" content="Essential maintenance and smart upgrades for apartments and villas in Dubai — installed, managed, and supported by DeliWer." />
      </Helmet>

      {/* Hero Section */}
      <section className="relative py-24 overflow-hidden bg-slate-950 text-white">
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-40"
          style={{ backgroundImage: `url(${homeServiceHeroImg})` }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 to-slate-950" />
        <div className="container mx-auto px-6 relative z-10 text-center">
          <Badge className="bg-emerald-500/20 text-emerald-400 border-emerald-500/30 mb-6 px-4 py-1.5 rounded-full">
            Dubai Home Operations
          </Badge>
          <h1 className="text-4xl md:text-7xl font-black mb-6 tracking-tighter uppercase">
            Home Services & <br /><span className="text-emerald-400">Smart Upgrades</span>
          </h1>
          <p className="text-xl md:text-2xl text-slate-300 max-w-3xl mx-auto leading-relaxed mb-10">
            Essential maintenance and smart upgrades for apartments and villas in Dubai — installed, managed, and supported by DeliWer.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button 
              size="lg" 
              className="bg-emerald-600 hover:bg-emerald-500 text-white font-black rounded-full px-10 h-16 text-lg"
              onClick={() => handleWhatsApp("General Home Services")}
            >
              <MessageCircle className="w-5 h-5 mr-2" />
              WhatsApp Us
            </Button>
            <Link href="/launch">
              <Button size="lg" variant="outline" className="border-white/20 text-white backdrop-blur-md bg-white/5 px-10 h-16 text-lg font-black rounded-full hover:bg-white/10">
                View Launch Offers
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-24 px-6 bg-slate-50 dark:bg-slate-950">
        <div className="container mx-auto max-w-7xl">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {homeServicesData.map((service) => (
              <Card key={service.id} className="bg-white dark:bg-slate-900 border-slate-200 dark:border-white/5 rounded-[2rem] overflow-hidden group hover:shadow-2xl transition-all duration-500 hover:-translate-y-1">
                <CardHeader className="p-8 pb-4">
                  <div className={`w-16 h-16 rounded-2xl bg-${service.color}-500/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
                    <service.icon className={`w-8 h-8 text-${service.color}-500`} />
                  </div>
                  <Badge variant="secondary" className="mb-4 bg-slate-100 dark:bg-white/5 text-slate-600 dark:text-slate-400 border-transparent text-[10px] font-black tracking-widest uppercase">
                    {service.tag}
                  </Badge>
                  <CardTitle className="text-2xl font-black tracking-tight mb-2 uppercase">
                    {service.title}
                  </CardTitle>
                  <CardDescription className="text-base text-slate-500 dark:text-slate-400 leading-relaxed min-h-[3rem]">
                    {service.description}
                  </CardDescription>
                </CardHeader>
                <CardContent className="p-8 pt-4 space-y-6">
                  <div className="flex flex-wrap gap-4 text-sm font-bold uppercase tracking-tight">
                    <div className="flex items-center gap-1.5 text-emerald-600 dark:text-emerald-400">
                      <Clock className="w-4 h-4" />
                      {service.time}
                    </div>
                    <div className="flex items-center gap-1.5 text-blue-600 dark:text-blue-400">
                      <Home className="w-4 h-4" />
                      {service.property}
                    </div>
                  </div>
                  
                  <div className="pt-4 border-t border-slate-100 dark:border-white/5">
                    <p className="text-xs text-slate-400 uppercase font-black tracking-widest mb-1">Starting Price</p>
                    <p className="text-3xl font-black text-slate-900 dark:text-white">{service.price}</p>
                  </div>

                  <div className="grid grid-cols-1 gap-3 pt-4">
                    <Button 
                      onClick={() => handleWhatsApp(service.title)}
                      className="w-full bg-slate-900 dark:bg-white text-white dark:text-slate-950 font-black h-14 rounded-xl text-base hover:opacity-90 transition-opacity"
                    >
                      Book Assessment
                    </Button>
                    <Button 
                      variant="ghost"
                      onClick={() => handleWhatsApp(service.title)}
                      className="w-full text-slate-500 dark:text-slate-400 font-black h-14 rounded-xl text-base hover:bg-slate-100 dark:hover:bg-white/5"
                    >
                      <MessageCircle className="w-4 h-4 mr-2" />
                      WhatsApp Inquiry
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Referral Section */}
      <section className="py-24 px-6 bg-emerald-600 text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl" />
        <div className="container mx-auto max-w-4xl text-center relative z-10">
          <Badge className="bg-white/20 text-white border-white/30 mb-8 px-4 py-1.5 rounded-full uppercase tracking-widest font-black text-xs">
            Refer & Earn
          </Badge>
          <h2 className="text-4xl md:text-6xl font-black mb-8 tracking-tighter uppercase">Share the <br />Sustainability</h2>
          <p className="text-xl text-emerald-50 mb-12 font-medium max-w-2xl mx-auto">
            Refer a friend to DeliWer Home Services and you both get AED 100 credit toward your next smart upgrade.
          </p>
          <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-[2rem] p-4 flex flex-col md:flex-row items-center gap-4 max-w-2xl mx-auto">
            <code className="bg-black/20 px-6 py-4 rounded-xl font-mono text-lg flex-1 text-center md:text-left overflow-hidden text-ellipsis whitespace-nowrap">
              {referralCode}
            </code>
            <Button 
              onClick={handleCopyReferral}
              className="w-full md:w-auto bg-white text-emerald-600 font-black h-14 px-10 rounded-xl shadow-xl hover:bg-emerald-50"
            >
              {copied ? <Check className="w-5 h-5 mr-2" /> : <Copy className="w-5 h-5 mr-2" />}
              {copied ? "Copied!" : "Copy Link"}
            </Button>
          </div>
        </div>
      </section>

      {/* Footer Disclaimer */}
      <footer className="py-12 px-6 bg-slate-950 border-t border-white/5 text-center">
        <div className="container mx-auto">
          <p className="text-amber-500 font-black text-sm uppercase tracking-widest mb-6">
            Supported by Dubai Municipality & DEWA Guidelines
          </p>
          <p className="text-slate-500 text-xs font-medium max-w-2xl mx-auto">
            © {new Date().getFullYear()} DeliWer Home Operations. All services are performed by licensed professionals according to UAE safety and building regulations.
          </p>
        </div>
      </footer>
    </div>
  );
}