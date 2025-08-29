import { useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { useMutation } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";

export default function CoboneCorporate() {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    companyName: "",
    contactName: "",
    email: "",
    phone: "",
    industry: "",
    deviceCount: "",
    message: ""
  });
  const [impact, setImpact] = useState({
    devices: 1000,
    water: 50000,
    co2: 3,
    corporates: 15,
  });

  const submitInquiry = useMutation({
    mutationFn: (data: any) => apiRequest("/api/corporate/inquiry", "POST", data),
    onSuccess: () => {
      toast({
        title: "Inquiry Submitted",
        description: "Our team will contact you within 24 hours to discuss your corporate trade-in program.",
      });
      setFormData({
        companyName: "",
        contactName: "",
        email: "",
        phone: "",
        industry: "",
        deviceCount: "",
        message: ""
      });
    },
    onError: () => {
      toast({
        title: "Submission Failed",
        description: "Please try again or contact us directly.",
        variant: "destructive",
      });
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    submitInquiry.mutate(formData);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  return (
    <div className="bg-white text-gray-800 min-h-screen" data-testid="cobone-corporate-page">
      {/* Hero Section */}
      <section className="text-center py-16 bg-gradient-to-r from-blue-600 to-green-500 text-white">
        <div className="flex justify-center items-center gap-8 mb-6">
          <div className="text-3xl font-bold text-white">Cobone</div>
          <div className="text-2xl text-white/80">×</div>
          <div className="text-3xl font-bold text-white">DeliWer</div>
        </div>
        <motion.h1 
          initial={{ opacity: 0, y: -20 }} 
          animate={{ opacity: 1, y: 0 }} 
          className="text-4xl font-bold mb-4"
          data-testid="hero-title"
        >
          Corporate CSR Trade-In Program
        </motion.h1>
        <p className="text-lg max-w-2xl mx-auto mb-6" data-testid="hero-description">
          Turn Old iPhones into Clean Water & CSR Impact — a co-branded initiative aligning business with sustainability.
        </p>
        <div className="flex justify-center gap-4">
          <Button 
            className="bg-white text-blue-600 font-semibold rounded-2xl shadow-md hover:bg-gray-50"
            data-testid="button-book-deal"
            onClick={() => document.getElementById('inquiry-form')?.scrollIntoView({ behavior: 'smooth' })}
          >
            Book Corporate Deal
          </Button>
          <Button 
            variant="outline" 
            className="bg-transparent border-white text-white rounded-2xl hover:bg-white/10"
            data-testid="button-download-kit"
          >
            Download CSR Kit
          </Button>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-12 px-6 grid md:grid-cols-3 gap-6 max-w-6xl mx-auto">
        {[
          { step: "1", title: "Trade-in iPhones", desc: "Corporate bulk or employee devices collected with instant valuation." },
          { step: "2", title: "Convert to AquaCafe Kits", desc: "Each phone funds a purification system delivered to employees or offices." },
          { step: "3", title: "CSR Recognition", desc: "Cobone & Deliwer co-branding, certificates, and leaderboard impact." },
        ].map((item, idx) => (
          <Card key={idx} className="rounded-2xl shadow-lg" data-testid={`step-card-${item.step}`}>
            <CardContent className="p-6 text-center">
              <h2 className="text-2xl font-bold text-blue-600 mb-2" data-testid={`step-number-${item.step}`}>
                Step {item.step}
              </h2>
              <p className="font-semibold mb-1" data-testid={`step-title-${item.step}`}>
                {item.title}
              </p>
              <p className="text-gray-600" data-testid={`step-description-${item.step}`}>
                {item.desc}
              </p>
            </CardContent>
          </Card>
        ))}
      </section>

      {/* Impact Counter */}
      <section className="bg-gray-100 py-12">
        <h2 className="text-3xl font-bold text-center mb-8" data-testid="impact-title">
          Live CSR Impact
        </h2>
        <div className="grid md:grid-cols-4 gap-6 max-w-6xl mx-auto px-6">
          {[
            { label: "Devices traded-in", value: impact.devices, testId: "stat-devices" },
            { label: "Liters purified", value: impact.water, testId: "stat-water" },
            { label: "CO₂ saved (tons)", value: impact.co2, testId: "stat-co2" },
            { label: "Corporate partners", value: impact.corporates, testId: "stat-partners" },
          ].map((stat, idx) => (
            <Card key={idx} className="rounded-2xl shadow-md text-center" data-testid={stat.testId}>
              <CardContent className="p-6">
                <p className="text-3xl font-bold text-blue-600" data-testid={`${stat.testId}-value`}>
                  {stat.value.toLocaleString()}
                </p>
                <p className="text-gray-700 mt-2" data-testid={`${stat.testId}-label`}>
                  {stat.label}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Corporate Benefits */}
      <section className="py-12 px-6 max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-8" data-testid="benefits-title">
          Corporate Benefits
        </h2>
        <div className="grid md:grid-cols-2 gap-6">
          {[
            "Immediate CSR impact aligned with UN SDGs", 
            "Employee perk – wellness benefit with water kits", 
            "Featured on Cobone CSR channel", 
            "Positive media & PR exposure"
          ].map((benefit, idx) => (
            <Card key={idx} className="rounded-2xl shadow-md" data-testid={`benefit-card-${idx}`}>
              <CardContent className="p-6 flex items-center">
                <span className="text-blue-600 text-xl font-bold mr-4" data-testid={`benefit-check-${idx}`}>
                  ✓
                </span>
                <p className="text-gray-700" data-testid={`benefit-text-${idx}`}>
                  {benefit}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Corporate Inquiry Form */}
      <section id="inquiry-form" className="py-12 px-6 bg-gray-50">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-8" data-testid="form-title">
            Get Your Corporate Quote
          </h2>
          <Card className="rounded-2xl shadow-lg">
            <CardContent className="p-8">
              <form onSubmit={handleSubmit} className="space-y-6" data-testid="corporate-inquiry-form">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-2" data-testid="label-company">
                      Company Name *
                    </label>
                    <Input
                      name="companyName"
                      value={formData.companyName}
                      onChange={handleInputChange}
                      required
                      data-testid="input-company-name"
                      placeholder="Enter your company name"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2" data-testid="label-contact">
                      Contact Name *
                    </label>
                    <Input
                      name="contactName"
                      value={formData.contactName}
                      onChange={handleInputChange}
                      required
                      data-testid="input-contact-name"
                      placeholder="Your full name"
                    />
                  </div>
                </div>
                
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-2" data-testid="label-email">
                      Email Address *
                    </label>
                    <Input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      data-testid="input-email"
                      placeholder="corporate@company.com"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2" data-testid="label-phone">
                      Phone Number *
                    </label>
                    <Input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      required
                      data-testid="input-phone"
                      placeholder="+971 50 123 4567"
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-2" data-testid="label-industry">
                      Industry *
                    </label>
                    <Input
                      name="industry"
                      value={formData.industry}
                      onChange={handleInputChange}
                      required
                      data-testid="input-industry"
                      placeholder="e.g., Financial Services, Technology"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2" data-testid="label-device-count">
                      Estimated Device Count
                    </label>
                    <Input
                      name="deviceCount"
                      value={formData.deviceCount}
                      onChange={handleInputChange}
                      data-testid="input-device-count"
                      placeholder="e.g., 50-100 devices"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2" data-testid="label-message">
                    Additional Information
                  </label>
                  <Textarea
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    rows={4}
                    data-testid="textarea-message"
                    placeholder="Tell us about your corporate sustainability goals..."
                  />
                </div>

                <Button
                  type="submit"
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-2xl"
                  disabled={submitInquiry.isPending}
                  data-testid="button-submit-inquiry"
                >
                  {submitInquiry.isPending ? "Submitting..." : "Submit Corporate Inquiry"}
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* CTA */}
      <section className="text-center py-16 bg-blue-600 text-white">
        <h2 className="text-3xl font-bold mb-4" data-testid="cta-title">
          Join the Movement
        </h2>
        <p className="max-w-xl mx-auto mb-6" data-testid="cta-description">
          Be among the first corporates in the UAE to lead a co-branded sustainability campaign with Cobone & Deliwer.
        </p>
        <Button 
          className="bg-white text-blue-600 font-semibold rounded-2xl shadow-md hover:bg-gray-50"
          data-testid="button-cta-deal"
          onClick={() => document.getElementById('inquiry-form')?.scrollIntoView({ behavior: 'smooth' })}
        >
          Book Corporate Deal
        </Button>
      </section>
    </div>
  );
}