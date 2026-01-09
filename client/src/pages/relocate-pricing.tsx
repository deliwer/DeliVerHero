import { useState, useRef } from "react";
import { Helmet } from "react-helmet";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Plane, 
  ArrowRight, 
  DollarSign, 
  Globe, 
  Clock, 
  Shield, 
  CheckCircle2,
  Users,
  Briefcase,
  Key
} from "lucide-react";
import dubaiSkyline from "@assets/stock_images/dubai_skyline_modern_806b4a5e.jpg";

export default function InternationalRelocationPricing() {
  const formRef = useRef<HTMLDivElement>(null);

  const pricingPackages = [
    {
      name: "Starter Relocation",
      price: "$2,995",
      description: "Essential support for individuals",
      features: [
        "International Logistics Coordination",
        "Document Attestation Support",
        "Basic Housing Search",
        "Bank Account Opening Assistance"
      ]
    },
    {
      name: "Family Premium",
      price: "$4,995",
      description: "Full family transition support",
      features: [
        "Door-to-Door Logistics Management",
        "School Enrollment Assistance",
        "Golden Visa Eligibility Assessment",
        "Comprehensive Housing Strategy",
        "Utility Setup (DEWA/Internet)"
      ],
      featured: true
    },
    {
      name: "Corporate Executive",
      price: "Custom",
      description: "White-glove service for HNWIs",
      features: [
        "Private VIP Airport Handling",
        "Bespoke Wealth Structuring",
        "Luxury Property Portfolio Access",
        "24/7 Lifestyle Concierge",
        "Dedicated Relocation Manager"
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>International Relocation Pricing | Dubai Move Plans | DeliWer</title>
        <meta name="description" content="Transparent pricing for your international move to Dubai. Compare relocation packages for families, individuals, and corporate executives." />
      </Helmet>

      {/* Hero Section */}
      <section className="relative py-24 overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${dubaiSkyline})` }}
        />
        <div className="absolute inset-0 bg-slate-950/80" />
        <div className="relative z-10 max-w-4xl mx-auto px-4 text-center">
          <Badge className="mb-4 bg-blue-500/20 text-blue-400 border-blue-500/30">
            Transparent Pricing
          </Badge>
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
            Move to Dubai <span className="text-blue-400">Seamlessly</span>
          </h1>
          <p className="text-xl text-gray-300 mb-8">
            Compare our relocation packages designed for a smooth transition to the UAE.
          </p>
        </div>
      </section>

      {/* Pricing Grid */}
      <section className="py-20 bg-slate-50 dark:bg-slate-900/50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8">
            {pricingPackages.map((pkg, i) => (
              <Card key={i} className={`relative border-none shadow-xl transition-all hover:scale-105 ${pkg.featured ? 'ring-2 ring-blue-500 bg-white dark:bg-slate-800' : 'bg-white dark:bg-slate-900'}`}>
                {pkg.featured && (
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-blue-500 text-white px-4 py-1 rounded-full text-sm font-bold">
                    Most Popular
                  </div>
                )}
                <CardHeader className="text-center">
                  <CardTitle className="text-2xl">{pkg.name}</CardTitle>
                  <CardDescription>{pkg.description}</CardDescription>
                  <div className="mt-4">
                    <span className="text-4xl font-bold">{pkg.price}</span>
                  </div>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-4 mb-8">
                    {pkg.features.map((feat, j) => (
                      <li key={j} className="flex items-start gap-3 text-sm">
                        <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0" />
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                  <Button className={`w-full ${pkg.featured ? 'bg-blue-600 hover:bg-blue-700' : ''}`}>
                    Select Package
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose DeliWer */}
      <section className="py-20">
        <div className="max-w-5xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold">Why Fragmented Moves Fail</h2>
            <p className="text-muted-foreground mt-4">Juggling multiple agents leads to delays and hidden costs. DeliWer unifies the journey.</p>
          </div>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="flex gap-4">
              <div className="w-12 h-12 rounded-lg bg-red-500/10 flex items-center justify-center shrink-0">
                <Clock className="w-6 h-6 text-red-500" />
              </div>
              <div>
                <h4 className="font-bold">No Timely Coordination</h4>
                <p className="text-sm text-muted-foreground">Traditional moves take 4-6 months. We complete transitions in under 60 days.</p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="w-12 h-12 rounded-lg bg-blue-500/10 flex items-center justify-center shrink-0">
                <Shield className="w-6 h-6 text-blue-500" />
              </div>
              <div>
                <h4 className="font-bold">Fixed Price Guarantee</h4>
                <p className="text-sm text-muted-foreground">No hidden surcharges for customs or last-mile delivery. One fee, start to finish.</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
