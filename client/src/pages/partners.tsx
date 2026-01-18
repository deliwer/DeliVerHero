import { useState } from 'react';
import { Link } from 'wouter';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { useMutation } from '@tanstack/react-query';
import { apiRequest } from '@/lib/queryClient';
import {
  Building2,
  Users,
  Smartphone,
  CheckCircle,
  ArrowRight,
  Star,
  Zap,
  Shield,
  MessageCircle,
  Handshake,
  Globe,
  Rocket,
  Ship,
  Truck,
  Briefcase,
  Home,
  Wrench,
  Stethoscope,
  Laptop,
  ChefHat
} from 'lucide-react';

import relocationImg from "@assets/stock_images/dubai_relocation_log_70eb5cb1.jpg";
import corporateImg from "@assets/stock_images/modern_dubai_office__97a31756.jpg";
import homeImg from "@assets/stock_images/dubai_luxury_villa_i_9244d415.jpg";
import skylineImg from "@assets/stock_images/dubai_skyline_sunset_21b85db0.jpg";
import networkImg from "@assets/stock_images/dubai_business_corpo_60a4c0bf.jpg";
import logisticsImg from "@assets/stock_images/modern_logistics_war_f64b7709.jpg";

interface PartnerInquiry {
  email: string;
  partnerType: string;
  message: string;
}

export default function Partners() {
  const { toast } = useToast();
  const [inquiry, setInquiry] = useState<PartnerInquiry>({
    email: '',
    partnerType: '',
    message: ''
  });

  const partnershipMutation = useMutation({
    mutationFn: (data: PartnerInquiry) => apiRequest('/api/sponsors', 'POST', {
      name: `${data.partnerType} Partner Inquiry`,
      email: data.email,
      organizationType: data.partnerType,
      description: data.message || `Partnership inquiry for ${data.partnerType} program`,
      contactPerson: data.email.split('@')[0] || 'Partner Contact'
    }),
    onSuccess: () => {
      toast({
        title: 'Partnership Inquiry Submitted',
        description: 'DeliWer will analyze your requirements and contact you within 24 hours with a customized partnership plan.',
      });
      setInquiry({ email: '', partnerType: '', message: '' });
    },
    onError: () => {
      toast({
        title: 'Submission Failed',
        description: 'Please try again or contact us via WhatsApp.',
        variant: 'destructive',
      });
    },
  });

  const handleWhatsAppClick = () => {
    window.open('https://wa.me/971500000000', '_blank'); // Placeholder WhatsApp number
  };

  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Sticky WhatsApp Button */}
      <Button
        onClick={handleWhatsAppClick}
        className="fixed bottom-6 right-6 z-50 rounded-full w-14 h-14 bg-green-500 hover:bg-green-600 shadow-lg p-0"
        size="icon"
        data-testid="button-whatsapp-sticky"
      >
        <MessageCircle className="w-8 h-8 text-white" />
      </Button>

      {/* 1. HERO / INTRO with Background */}
      <div className="relative min-h-[80vh] flex items-center justify-center overflow-hidden">
        <div 
          className="absolute inset-0 z-0 scale-105"
          style={{
            backgroundImage: `url(${skylineImg})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        >
          <div className="absolute inset-0 bg-black/60 backdrop-blur-[2px]" />
        </div>
        
        <div className="container mx-auto px-4 py-20 relative z-10 text-center">
          <Badge variant="outline" className="mb-6 border-primary/50 text-primary-foreground bg-primary/20 backdrop-blur-md px-4 py-1">
            Partnership Network
          </Badge>
          <h1 className="text-4xl md:text-7xl font-bold mb-6 tracking-tight text-white">
            Partner with DeliWer — Dubai’s <span className="text-primary">End-to-End</span> Relocation & Concierge Network
          </h1>
          <p className="text-xl md:text-2xl text-gray-200 max-w-3xl mx-auto mb-10 leading-relaxed font-light">
            DeliWer owns client relationships and lifecycle, while our trusted partners execute locally and internationally.
          </p>
          
          <div className="flex flex-wrap justify-center gap-4">
            <Button size="lg" className="h-12 px-8" onClick={() => scrollToSection('relocation-partners')} data-testid="button-apply-relocation">
              Apply to Become a Relocation Partner
            </Button>
            <Button size="lg" variant="outline" className="h-12 px-8 bg-white/10 backdrop-blur-md border-white/20 text-white hover:bg-white/20" onClick={() => scrollToSection('secondary-partners')} data-testid="button-explore-secondary">
              Explore Secondary Partnerships
            </Button>
            <Button size="lg" variant="ghost" onClick={handleWhatsAppClick} className="h-12 px-8 border border-white/20 text-white hover:bg-white/10 backdrop-blur-md" data-testid="button-whatsapp-desk">
              <MessageCircle className="w-5 h-5 mr-2" />
              WhatsApp Partnership Desk
            </Button>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-16">
        {/* Watch Our Channel Section (Restored) */}
        <div className="bg-slate-900/80 rounded-3xl p-8 mb-24 border border-red-500/30 overflow-hidden relative">
          <div className="absolute inset-0 bg-gradient-to-br from-red-500/5 to-transparent" />
          <div className="relative z-10">
            <div className="flex flex-col md:flex-row items-center justify-between gap-6 mb-10">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 bg-red-500/20 rounded-full flex items-center justify-center">
                  <svg className="w-8 h-8 text-red-500" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                  </svg>
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-white">Watch Our Channel</h3>
                  <p className="text-gray-400">@vdeliwer - Latest AquaCafe Loyalty insights</p>
                </div>
              </div>
              <Button size="lg" className="bg-red-600 hover:bg-red-700 text-white" onClick={() => window.open('https://www.youtube.com/@vdeliwer', '_blank', 'noopener,noreferrer')} data-testid="button-subscribe-youtube">
                Subscribe on YouTube
              </Button>
            </div>
            <div className="grid md:grid-cols-2 gap-8">
              <Card className="bg-slate-950/50 border-white/5 overflow-hidden group">
                <div className="aspect-video relative">
                  <iframe 
                    className="w-full h-full" 
                    src="https://www.youtube-nocookie.com/embed/NeVhACQEXG4" 
                    title="AquaCafe Loyalty Program - Complete Overview" 
                    frameBorder="0" 
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                    allowFullScreen
                    data-testid="embed-video-1"
                  ></iframe>
                </div>
                <div className="p-4">
                  <h4 className="text-lg font-semibold text-white group-hover:text-red-400 transition-colors">AquaCafe Loyalty Program - Overview</h4>
                  <p className="text-sm text-gray-400 mt-2">Complete overview of the loyalty program mechanics</p>
                </div>
              </Card>
              <Card className="bg-slate-950/50 border-white/5 overflow-hidden group">
                <div className="aspect-video relative">
                  <iframe 
                    className="w-full h-full" 
                    src="https://www.youtube-nocookie.com/embed/f_-CblN9xEo" 
                    title="Loyalty Mechanics & ROI Deep Dive" 
                    frameBorder="0" 
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                    allowFullScreen
                    data-testid="embed-video-2"
                  ></iframe>
                </div>
                <div className="p-4">
                  <h4 className="text-lg font-semibold text-white group-hover:text-red-400 transition-colors">Loyalty Mechanics & ROI Deep Dive</h4>
                  <p className="text-sm text-gray-400 mt-2">Detailed ROI projections and financial mechanics</p>
                </div>
              </Card>
            </div>
          </div>
        </div>

        {/* 2. PRIORITY PARTNERSHIP BLOCK with Background */}
        <section id="relocation-partners" className="mb-24 scroll-mt-20 relative rounded-3xl overflow-hidden min-h-[600px] flex items-center">
          <div 
            className="absolute inset-0 z-0"
            style={{
              backgroundImage: `url(${relocationImg})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }}
          >
            <div className="absolute inset-0 bg-black/75 backdrop-blur-[1px]" />
          </div>
          
          <div className="relative z-10 p-8 md:p-16 w-full">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl md:text-5xl font-bold mb-8 text-white">Relocation & Logistics Partners — Our Core Syndication</h2>
                <div className="space-y-8">
                  <div className="flex gap-4">
                    <div className="mt-1 bg-primary/20 p-2 rounded-lg backdrop-blur-md border border-primary/30">
                      <Globe className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-xl text-white">Who we look for:</h3>
                      <p className="text-gray-300">International movers, packers, freight, and logistics companies. Corporate relocation specialists and HR partners.</p>
                    </div>
                  </div>
                  
                  <div className="bg-white/5 backdrop-blur-xl rounded-2xl p-8 border border-white/10">
                    <h3 className="font-semibold mb-6 flex items-center gap-2 text-white text-lg">
                      <Zap className="w-5 h-5 text-primary" />
                      DeliWer provides:
                    </h3>
                    <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-gray-200">
                      <li className="flex items-center gap-3">
                        <div className="w-5 h-5 rounded-full bg-green-500/20 flex items-center justify-center border border-green-500/30">
                          <CheckCircle className="w-3 h-3 text-green-400" />
                        </div>
                        Client onboarding
                      </li>
                      <li className="flex items-center gap-3">
                        <div className="w-5 h-5 rounded-full bg-green-500/20 flex items-center justify-center border border-green-500/30">
                          <CheckCircle className="w-3 h-3 text-green-400" />
                        </div>
                        Scope & SLA alignment
                      </li>
                      <li className="flex items-center gap-3">
                        <div className="w-5 h-5 rounded-full bg-green-500/20 flex items-center justify-center border border-green-500/30">
                          <CheckCircle className="w-3 h-3 text-green-400" />
                        </div>
                        Dedicated WhatsApp coordinator
                      </li>
                      <li className="flex items-center gap-3">
                        <div className="w-5 h-5 rounded-full bg-green-500/20 flex items-center justify-center border border-green-500/30">
                          <CheckCircle className="w-3 h-3 text-green-400" />
                        </div>
                        Revenue via wholesale agreements
                      </li>
                    </ul>
                  </div>

                  <Button size="lg" className="h-14 px-10 text-lg shadow-xl" onClick={handleWhatsAppClick} data-testid="button-apply-relocation-inner">
                    Apply to Become a Relocation Partner
                  </Button>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-4">
                  <Card className="p-6 flex flex-col items-center text-center gap-4 bg-white/5 backdrop-blur-md border-white/10 text-white">
                    <Ship className="w-10 h-10 text-primary" />
                    <span className="font-medium">International Freight</span>
                  </Card>
                  <Card className="p-6 flex flex-col items-center text-center gap-4 bg-white/5 backdrop-blur-md border-white/10 text-white">
                    <Truck className="w-10 h-10 text-primary" />
                    <span className="font-medium">Local Logistics</span>
                  </Card>
                </div>
                <div className="space-y-4 pt-8">
                  <Card className="p-6 flex flex-col items-center text-center gap-4 bg-white/5 backdrop-blur-md border-white/10 text-white">
                    <Briefcase className="w-10 h-10 text-primary" />
                    <span className="font-medium">Corporate HR</span>
                  </Card>
                  <Card className="p-6 flex flex-col items-center text-center gap-4 bg-white/5 backdrop-blur-md border-white/10 text-white">
                    <Home className="w-10 h-10 text-primary" />
                    <span className="font-medium">Packers & Movers</span>
                  </Card>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 3. SECONDARY PARTNERSHIP BLOCK with Backgrounds */}
        <section id="secondary-partners" className="mb-24 scroll-mt-20">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">Secondary Partnerships — Home & Corporate Services</h2>
            <p className="text-xl text-muted-foreground">Access ongoing clients and lifecycle revenue without managing leads.</p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 mb-12">
            {/* Home Services */}
            <div className="relative rounded-3xl overflow-hidden min-h-[400px] flex items-end group shadow-2xl">
              <div 
                className="absolute inset-0 z-0 transition-transform duration-700 group-hover:scale-110"
                style={{
                  backgroundImage: `url(${homeImg})`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                }}
              >
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
              </div>
              <div className="relative z-10 p-8 w-full">
                <div className="w-14 h-14 bg-blue-500/20 backdrop-blur-md rounded-xl flex items-center justify-center mb-6 border border-blue-500/30">
                  <Wrench className="w-8 h-8 text-blue-400" />
                </div>
                <h3 className="text-3xl font-bold text-white mb-4">Home Services</h3>
                <p className="text-gray-200 mb-8 max-w-md">Cleaning, maintenance, AC, plumbing, pest control, water & essentials.</p>
                <Button variant="secondary" className="bg-white/90 hover:bg-white text-blue-950 h-12 px-8" onClick={handleWhatsAppClick} data-testid="button-home-services">
                  Partner with Home Services
                </Button>
              </div>
            </div>

            {/* Corporate Services */}
            <div className="relative rounded-3xl overflow-hidden min-h-[400px] flex items-end group shadow-2xl">
              <div 
                className="absolute inset-0 z-0 transition-transform duration-700 group-hover:scale-110"
                style={{
                  backgroundImage: `url(${corporateImg})`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                }}
              >
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
              </div>
              <div className="relative z-10 p-8 w-full">
                <div className="w-14 h-14 bg-purple-500/20 backdrop-blur-md rounded-xl flex items-center justify-center mb-6 border border-purple-500/30">
                  <Building2 className="w-8 h-8 text-purple-400" />
                </div>
                <h3 className="text-3xl font-bold text-white mb-4">Corporate / HR</h3>
                <p className="text-gray-200 mb-8 max-w-md">Visa processing, PRO, corporate housing, employee lifestyle.</p>
                <Button variant="secondary" className="bg-white/90 hover:bg-white text-purple-950 h-12 px-8" onClick={handleWhatsAppClick} data-testid="button-corporate-services">
                  Join Corporate Network
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* 4. HOW IT WORKS SECTION with Background */}
        <section className="mb-24 relative rounded-3xl overflow-hidden py-24 px-8 border border-border/50 shadow-2xl">
          <div 
            className="absolute inset-0 z-0 scale-105"
            style={{
              backgroundImage: `url(${logisticsImg})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }}
          >
            <div className="absolute inset-0 bg-black/85 backdrop-blur-[2px]" />
          </div>
          
          <div className="relative z-10 max-w-6xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-bold text-center mb-24 text-white">How It Works</h2>
            <div className="grid md:grid-cols-5 gap-12 relative">
              {[
                { title: 'Join the ecosystem', desc: 'Submit your profile for review' },
                { title: 'Scope alignment', desc: 'Define your role in the lifecycle' },
                { title: 'Pilot projects', desc: 'First jobs under DeliWer coordination' },
                { title: 'Feedback & onboarding', desc: 'Fully integrated as execution partner' },
                { title: 'Scale', desc: 'Recurring assignments from all segments' }
              ].map((step, i) => (
                <div key={i} className="flex flex-col items-center text-center relative z-10 group">
                  <div className="w-20 h-20 rounded-2xl bg-primary text-primary-foreground flex items-center justify-center text-2xl font-bold mb-8 shadow-2xl shadow-primary/40 transform group-hover:scale-110 transition-transform rotate-3">
                    <span className="-rotate-3">{i + 1}</span>
                  </div>
                  <h3 className="font-bold text-xl mb-4 text-white tracking-tight">{step.title}</h3>
                  <p className="text-base text-gray-300 leading-relaxed font-light">{step.desc}</p>
                  {i < 4 && (
                    <div className="hidden md:block absolute top-10 left-[calc(50%+40px)] w-[calc(100%-80px)] h-[1px] bg-gradient-to-r from-primary/50 to-transparent" />
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 5. TRUST & AUTHORITY SECTION with Background */}
        <section className="mb-24 relative rounded-3xl overflow-hidden py-24 px-8 md:px-16 shadow-2xl">
          <div 
            className="absolute inset-0 z-0 scale-105"
            style={{
              backgroundImage: `url(${networkImg})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }}
          >
            <div className="absolute inset-0 bg-black/80 backdrop-blur-[1px]" />
          </div>
          
          <div className="relative z-10 grid md:grid-cols-2 gap-20 items-center">
            <div>
              <h2 className="text-4xl md:text-5xl font-bold mb-12 text-white tracking-tight">Trust & Authority</h2>
              <div className="space-y-6">
                {[
                  { title: 'Demand Ownership', desc: 'Demand owned by DeliWer via LinkedIn Premium & Sales Navigator.', icon: Globe },
                  { title: 'Accountability', desc: 'One coordinator per client ensures absolute accountability.', icon: Shield },
                  { title: 'Full Lifecycle Coverage', desc: 'Pre-arrival, move-in, living, move-out — we cover it all.', icon: Rocket },
                  { title: 'Frictionless Comms', desc: 'Communication via WhatsApp — no app required for partners.', icon: MessageCircle },
                  { title: 'Revenue Focus', desc: 'Revenue through scoped projects, not client management overhead.', icon: Zap }
                ].map((item, i) => (
                  <div key={i} className="flex gap-6 p-6 rounded-2xl bg-white/5 backdrop-blur-md border border-white/10 hover:bg-white/10 transition-all group">
                    <div className="w-14 h-14 bg-primary/20 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform shadow-lg shadow-primary/20">
                      <item.icon className="w-7 h-7 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-bold text-xl mb-1 text-white">{item.title}</h3>
                      <p className="text-gray-300 leading-relaxed font-light">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="relative">
              <div className="absolute inset-0 bg-primary/30 blur-[150px] rounded-full animate-pulse" />
              <Card className="relative p-12 border-white/10 bg-black/40 backdrop-blur-2xl shadow-3xl overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 -mr-16 -mt-16 rounded-full blur-2xl" />
                <div className="space-y-12">
                  <div className="flex items-center gap-8">
                    <div className="w-20 h-20 rounded-3xl bg-primary/20 flex items-center justify-center border border-primary/30 shadow-xl shadow-primary/20">
                      <Star className="w-10 h-10 text-primary" />
                    </div>
                    <div>
                      <div className="text-4xl font-bold text-white tracking-tighter">100%</div>
                      <div className="text-sm text-primary uppercase tracking-[0.2em] font-bold mt-2">Execution Reliability</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-8">
                    <div className="w-20 h-20 rounded-3xl bg-primary/20 flex items-center justify-center border border-primary/30 shadow-xl shadow-primary/20">
                      <Users className="w-10 h-10 text-primary" />
                    </div>
                    <div>
                      <div className="text-4xl font-bold text-white tracking-tighter">Dubai-Wide</div>
                      <div className="text-sm text-primary uppercase tracking-[0.2em] font-bold mt-2">Strategic Service Coverage</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-8">
                    <div className="w-20 h-20 rounded-3xl bg-primary/20 flex items-center justify-center border border-primary/30 shadow-xl shadow-primary/20">
                      <Smartphone className="w-10 h-10 text-primary" />
                    </div>
                    <div>
                      <div className="text-4xl font-bold text-white tracking-tighter">Real-time</div>
                      <div className="text-sm text-primary uppercase tracking-[0.2em] font-bold mt-2">WhatsApp Sync & Updates</div>
                    </div>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </section>

        {/* 6. FINAL CTA SECTION */}
        <section className="text-center py-28 bg-primary text-primary-foreground rounded-3xl overflow-hidden relative shadow-2xl shadow-primary/40">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-white/20 via-transparent to-transparent opacity-50" />
          <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10" />
          <div className="relative z-10 px-4">
            <h2 className="text-4xl md:text-7xl font-bold mb-10 tracking-tighter">Start Partnering with DeliWer Today</h2>
            <p className="text-xl md:text-2xl mb-16 max-w-3xl mx-auto opacity-90 font-light leading-relaxed">
              Whether you specialize in international relocation, home setup, or corporate services, join our ecosystem to execute Dubai-side and grow with us.
            </p>
            <div className="flex flex-wrap justify-center gap-6">
              <Button size="lg" variant="secondary" className="h-16 px-12 text-xl bg-white text-primary hover:bg-white/90 shadow-2xl transform hover:-translate-y-1 transition-transform" onClick={handleWhatsAppClick} data-testid="button-apply-relocation-final">
                Apply to Become a Relocation Partner
              </Button>
              <Button size="lg" variant="outline" className="h-16 px-12 text-xl border-white/40 text-white hover:bg-white/10 backdrop-blur-md shadow-2xl transform hover:-translate-y-1 transition-transform" onClick={() => scrollToSection('secondary-partners')} data-testid="button-explore-secondary-final">
                Explore Secondary Partnerships
              </Button>
              <Button size="lg" variant="outline" className="h-16 px-12 text-xl border-white/40 text-white hover:bg-white/10 backdrop-blur-md shadow-2xl transform hover:-translate-y-1 transition-transform" onClick={handleWhatsAppClick} data-testid="button-whatsapp-final">
                <MessageCircle className="w-6 h-6 mr-3" />
                WhatsApp Partnership Desk
              </Button>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
