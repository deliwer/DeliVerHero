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
  Laptop
} from 'lucide-react';

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

      <div className="container mx-auto px-4 py-12">
        {/* 1. HERO / INTRO */}
        <div className="text-center mb-20">
          <Badge variant="outline" className="mb-6 border-primary/30 text-primary px-4 py-1">
            Partnership Network
          </Badge>
          <h1 className="text-4xl md:text-6xl font-bold mb-6 tracking-tight">
            Partner with DeliWer — Dubai’s <span className="text-primary">End-to-End</span> Relocation & Concierge Network
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-10 leading-relaxed">
            DeliWer owns client relationships and lifecycle, while our trusted partners execute locally and internationally.
          </p>
          
          <div className="flex flex-wrap justify-center gap-4">
            <Button size="lg" onClick={() => scrollToSection('relocation-partners')} data-testid="button-apply-relocation">
              Apply to Become a Relocation Partner
            </Button>
            <Button size="lg" variant="outline" onClick={() => scrollToSection('secondary-partners')} data-testid="button-explore-secondary">
              Explore Secondary Partnerships
            </Button>
            <Button size="lg" variant="ghost" onClick={handleWhatsAppClick} className="border border-input" data-testid="button-whatsapp-desk">
              <MessageCircle className="w-5 h-5 mr-2" />
              WhatsApp Partnership Desk
            </Button>
          </div>
        </div>

        {/* 2. PRIORITY PARTNERSHIP BLOCK */}
        <section id="relocation-partners" className="mb-24 scroll-mt-20">
          <Card className="border-primary/20 bg-primary/5">
            <div className="grid md:grid-cols-2 gap-8 p-8 md:p-12 items-center">
              <div>
                <h2 className="text-3xl font-bold mb-6">Relocation & Logistics Partners — Our Core Syndication</h2>
                <div className="space-y-6">
                  <div className="flex gap-4">
                    <div className="mt-1 bg-primary/10 p-2 rounded-lg">
                      <Globe className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg">Who we look for:</h3>
                      <p className="text-muted-foreground">International movers, packers, freight, and logistics companies. Corporate relocation specialists and HR partners.</p>
                    </div>
                  </div>
                  
                  <div className="bg-background/50 rounded-xl p-6 border border-border">
                    <h3 className="font-semibold mb-4 flex items-center gap-2">
                      <Zap className="w-5 h-5 text-primary" />
                      DeliWer provides:
                    </h3>
                    <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
                      <li className="flex items-center gap-2">
                        <CheckCircle className="w-4 h-4 text-green-500" /> Client onboarding
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle className="w-4 h-4 text-green-500" /> Scope & SLA alignment
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle className="w-4 h-4 text-green-500" /> Dedicated WhatsApp coordinator
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle className="w-4 h-4 text-green-500" /> Revenue via wholesale agreements
                      </li>
                    </ul>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div>
                      <h4 className="font-semibold text-sm uppercase tracking-wider text-muted-foreground mb-2">Partner Role</h4>
                      <p className="text-sm">Execute Dubai-side relocation services safely and on time.</p>
                    </div>
                    <div>
                      <h4 className="font-semibold text-sm uppercase tracking-wider text-muted-foreground mb-2">DeliWer Role</h4>
                      <p className="text-sm">Owns client communication, lifecycle, and coordination.</p>
                    </div>
                  </div>

                  <Button size="lg" className="w-full sm:w-auto" data-testid="button-apply-relocation-inner">
                    Apply to Become a Relocation Partner
                  </Button>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-4">
                  <Card className="p-4 flex flex-col items-center text-center gap-3">
                    <Ship className="w-8 h-8 text-primary" />
                    <span className="text-sm font-medium">International Freight</span>
                  </Card>
                  <Card className="p-4 flex flex-col items-center text-center gap-3">
                    <Truck className="w-8 h-8 text-primary" />
                    <span className="text-sm font-medium">Local Logistics</span>
                  </Card>
                </div>
                <div className="space-y-4 pt-8">
                  <Card className="p-4 flex flex-col items-center text-center gap-3">
                    <Briefcase className="w-8 h-8 text-primary" />
                    <span className="text-sm font-medium">Corporate HR</span>
                  </Card>
                  <Card className="p-4 flex flex-col items-center text-center gap-3">
                    <Home className="w-8 h-8 text-primary" />
                    <span className="text-sm font-medium">Packers & Movers</span>
                  </Card>
                </div>
              </div>
            </div>
          </Card>
        </section>

        {/* 3. SECONDARY PARTNERSHIP BLOCK */}
        <section id="secondary-partners" className="mb-24 scroll-mt-20">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Secondary Partnerships — Home & Corporate Services</h2>
            <p className="text-muted-foreground">Access ongoing clients and lifecycle revenue without managing leads.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mb-12">
            <Card className="hover-elevate">
              <CardHeader>
                <div className="w-12 h-12 bg-blue-500/10 rounded-lg flex items-center justify-center mb-4">
                  <Wrench className="w-6 h-6 text-blue-500" />
                </div>
                <CardTitle>Home Services</CardTitle>
                <CardDescription>Cleaning, maintenance, AC, plumbing, pest control, water & essentials.</CardDescription>
              </CardHeader>
            </Card>

            <Card className="hover-elevate">
              <CardHeader>
                <div className="w-12 h-12 bg-purple-500/10 rounded-lg flex items-center justify-center mb-4">
                  <Building2 className="w-6 h-6 text-purple-500" />
                </div>
                <CardTitle>Corporate / HR</CardTitle>
                <CardDescription>Visa processing, PRO, corporate housing, employee lifestyle.</CardDescription>
              </CardHeader>
            </Card>

            <Card className="hover-elevate">
              <CardHeader>
                <div className="w-12 h-12 bg-emerald-500/10 rounded-lg flex items-center justify-center mb-4">
                  <Laptop className="w-6 h-6 text-emerald-500" />
                </div>
                <CardTitle>Tech & Support</CardTitle>
                <CardDescription>SaaS, payment, or coordination tools for the ecosystem.</CardDescription>
              </CardHeader>
            </Card>
          </div>

          <div className="text-center">
            <Button variant="outline" size="lg" data-testid="button-explore-secondary-inner">
              Explore Secondary Partnerships
            </Button>
          </div>
        </section>

        {/* 4. HOW IT WORKS SECTION */}
        <section className="mb-24 py-16 bg-muted/30 rounded-3xl px-8">
          <h2 className="text-3xl font-bold text-center mb-16">How It Works</h2>
          <div className="grid md:grid-cols-5 gap-8 relative">
            {[
              { title: 'Join the ecosystem', desc: 'Submit your profile for review' },
              { title: 'Scope alignment', desc: 'Define your role in the lifecycle' },
              { title: 'Pilot projects', desc: 'First jobs under DeliWer coordination' },
              { title: 'Feedback & onboarding', desc: 'Fully integrated as execution partner' },
              { title: 'Scale', desc: 'Recurring assignments from all segments' }
            ].map((step, i) => (
              <div key={i} className="flex flex-col items-center text-center relative z-10">
                <div className="w-12 h-12 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold mb-4">
                  {i + 1}
                </div>
                <h3 className="font-semibold mb-2">{step.title}</h3>
                <p className="text-sm text-muted-foreground">{step.desc}</p>
                {i < 4 && (
                  <div className="hidden md:block absolute top-6 left-[calc(50%+24px)] w-[calc(100%-48px)] h-[2px] bg-border" />
                )}
              </div>
            ))}
          </div>
        </section>

        {/* 5. TRUST & AUTHORITY SECTION */}
        <section className="mb-24 grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl font-bold mb-8">Trust & Authority</h2>
            <div className="space-y-4">
              {[
                { title: 'Demand Ownership', desc: 'Demand owned by DeliWer via LinkedIn Premium & Sales Navigator.' },
                { title: 'Accountability', desc: 'One coordinator per client ensures absolute accountability.' },
                { title: 'Full Lifecycle Coverage', desc: 'Pre-arrival, move-in, living, move-out — we cover it all.' },
                { title: 'Frictionless Comms', desc: 'Communication via WhatsApp — no app required for partners.' },
                { title: 'Revenue Focus', desc: 'Revenue through scoped projects, not client management overhead.' }
              ].map((item, i) => (
                <div key={i} className="flex gap-4 p-4 rounded-xl hover:bg-muted/50 transition-colors border border-transparent hover:border-border">
                  <Shield className="w-6 h-6 text-primary flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold">{item.title}</h3>
                    <p className="text-sm text-muted-foreground">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="relative">
            <div className="absolute inset-0 bg-primary/20 blur-3xl rounded-full" />
            <Card className="relative p-8 border-primary/20">
              <div className="space-y-6">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                    <Star className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <div className="text-2xl font-bold">100%</div>
                    <div className="text-sm text-muted-foreground">Execution Reliability</div>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                    <Users className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <div className="text-2xl font-bold">Dubai-Wide</div>
                    <div className="text-sm text-muted-foreground">Strategic Service Coverage</div>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                    <Smartphone className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <div className="text-2xl font-bold">Real-time</div>
                    <div className="text-sm text-muted-foreground">WhatsApp Sync & Updates</div>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </section>

        {/* 6. FINAL CTA SECTION */}
        <section className="text-center py-20 bg-primary text-primary-foreground rounded-3xl overflow-hidden relative">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-white/10 to-transparent" />
          <div className="relative z-10 px-4">
            <h2 className="text-3xl md:text-5xl font-bold mb-6">Start Partnering with DeliWer Today</h2>
            <p className="text-xl mb-10 max-w-2xl mx-auto opacity-90">
              Whether you specialize in international relocation, home setup, or corporate services, join our ecosystem to execute Dubai-side and grow with us.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button size="lg" variant="secondary" className="bg-white text-primary hover:bg-white/90" data-testid="button-apply-relocation-final">
                Apply to Become a Relocation Partner
              </Button>
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10" data-testid="button-explore-secondary-final">
                Explore Secondary Partnerships
              </Button>
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10" onClick={handleWhatsAppClick} data-testid="button-whatsapp-final">
                <MessageCircle className="w-5 h-5 mr-2" />
                WhatsApp Partnership Desk
              </Button>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
