import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Checkbox } from "@/components/ui/checkbox";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
import { trackFormSubmission, trackCTA, getStoredUTM } from "@/lib/analytics";
import { Loader2, Send, Share2, Copy, CheckCircle2, Home, DollarSign, MapPin, Building2, Clock, FileText, Mail, Phone, User, Facebook, Linkedin, MessageCircle, Link as LinkIcon } from "lucide-react";

interface HousingEnquiryFormProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  segment?: "rent" | "buy" | "invest";
}

export function HousingEnquiryForm({ open, onOpenChange, segment = "rent" }: HousingEnquiryFormProps) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    segment: segment,
    budget: "",
    budgetMax: "",
    areas: [] as string[],
    propertyType: "",
    bedrooms: "",
    timeline: "",
    additionalInfo: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const { toast } = useToast();

  const areaOptions = [
    "Downtown Dubai",
    "Marina",
    "JBR",
    "Palm Jumeirah",
    "Business Bay",
    "DIFC",
    "Arabian Ranches",
    "Jumeirah",
    "Dubai Hills Estate",
    "Deira",
    "Bur Dubai",
    "Dune",
    "Open to suggestions"
  ];

  const steps = [
    { title: "Contact", icon: User },
    { title: "Budget", icon: DollarSign },
    { title: "Preferences", icon: MapPin },
    { title: "Details", icon: Building2 },
  ];

  const handleAreaToggle = (area: string) => {
    setFormData(prev => ({
      ...prev,
      areas: prev.areas.includes(area)
        ? prev.areas.filter(a => a !== area)
        : [...prev.areas, area]
    }));
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name || !formData.email || !formData.phone) {
      toast({
        title: "Missing required fields",
        description: "Please fill in name, email, and phone number.",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);

    try {
      const utmParams = getStoredUTM();
      await apiRequest("/api/contact", "POST", {
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        subject: `Housing ${formData.segment === 'rent' ? 'Rental' : formData.segment === 'buy' ? 'Purchase' : 'Investment'} Enquiry`,
        category: "sales",
        message: `
Segment: ${formData.segment.toUpperCase()}

Budget: ${formData.budget}${formData.budgetMax ? ` - ${formData.budgetMax}` : ''}
Areas of Interest: ${formData.areas.join(', ') || 'Not specified'}
Property Type: ${formData.propertyType || 'Not specified'}
Bedrooms: ${formData.bedrooms || 'Not specified'}
Timeline: ${formData.timeline || 'Not specified'}

Additional Info: ${formData.additionalInfo || 'None'}

UTM Source: ${utmParams.utmSource || 'Direct'}
UTM Medium: ${utmParams.utmMedium || 'N/A'}
UTM Campaign: ${utmParams.utmCampaign || 'N/A'}
        `,
        urgency: "high",
      });

      toast({
        title: "Enquiry Sent",
        description: "We'll be in touch shortly to discuss your residence requirements.",
      });
      setIsSubmitted(true);
      trackFormSubmission('housing_enquiry', true, { segment: formData.segment, ...utmParams });
      toast({
        title: "Enquiry submitted successfully!",
        description: "Our housing advisor will contact you within 24 hours.",
      });
    } catch (error) {
      trackFormSubmission('housing_enquiry', false, { segment: formData.segment });
      toast({
        title: "Failed to submit enquiry",
        description: "Please try again or contact us directly.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const segmentLabel = {
    rent: "Rental",
    buy: "Purchase",
    invest: "Investment"
  };

  const referralLink = `https://deliwer.com/residence?ref=${formData.email?.split('@')[0] || 'friend'}`;

  const handleShareReferral = (platform: 'whatsapp' | 'email' | 'copy' | 'facebook' | 'linkedin') => {
    const message = `I found the perfect housing solution on DeliWer! They helped me find my ideal ${formData.segment} property in Dubai. Check it out: ${referralLink}`;
    const encodedMessage = encodeURIComponent(message);

    switch (platform) {
      case 'whatsapp':
        window.open(`https://wa.me/?text=${encodedMessage}`);
        break;
      case 'email':
        window.open(`mailto:?subject=Check Out DeliWer Housing&body=${encodedMessage}`);
        break;
      case 'copy':
        navigator.clipboard.writeText(referralLink);
        toast({
          title: "Link copied!",
          description: "Referral link copied to clipboard.",
        });
        break;
      case 'facebook':
        window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(referralLink)}`);
        break;
      case 'linkedin':
        window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(referralLink)}`);
        break;
    }
  };

  if (isSubmitted) {
    return (
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className="max-w-md" data-testid="dialog-housing-success">
          <div className="text-center space-y-6 py-8">
            <div className="flex justify-center">
              <div className="bg-green-500/20 p-4 rounded-full">
                <CheckCircle2 className="w-12 h-12 text-green-500" />
              </div>
            </div>
            
            <div>
              <h2 className="text-2xl font-bold text-white mb-2" data-testid="text-success-title">
                Enquiry Submitted!
              </h2>
              <p className="text-gray-400">
                {formData.name}, we've received your {formData.segment} enquiry. Our housing advisors will contact you within 24 hours.
              </p>
            </div>

            <div className="bg-slate-800/50 border border-slate-700 rounded-lg p-4 text-left space-y-3">
              <p className="text-sm font-semibold text-gray-300">What's Next?</p>
              <ul className="text-sm text-gray-400 space-y-2">
                <li className="flex gap-2">
                  <span className="text-blue-500 font-bold">1.</span>
                  <span>We'll verify your preferences and timeline</span>
                </li>
                <li className="flex gap-2">
                  <span className="text-blue-500 font-bold">2.</span>
                  <span>Our expert will match properties to your needs</span>
                </li>
                <li className="flex gap-2">
                  <span className="text-blue-500 font-bold">3.</span>
                  <span>You'll receive curated options within 24 hours</span>
                </li>
              </ul>
            </div>

            <div className="border-t border-slate-700 pt-6">
              <p className="text-sm font-semibold text-gray-300 mb-4">Share & Earn Rewards</p>
              <p className="text-xs text-gray-400 mb-4">Refer a friend and both get exclusive benefits when they complete a housing transaction</p>
              
              <div className="grid grid-cols-2 gap-2 mb-4">
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => handleShareReferral('whatsapp')}
                  className="gap-2 text-xs"
                  data-testid="button-share-whatsapp"
                >
                  <MessageCircle className="w-3 h-3" />
                  WhatsApp
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => handleShareReferral('email')}
                  className="gap-2 text-xs"
                  data-testid="button-share-email"
                >
                  <Mail className="w-3 h-3" />
                  Email
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => handleShareReferral('facebook')}
                  className="gap-2 text-xs"
                  data-testid="button-share-facebook"
                >
                  <Facebook className="w-3 h-3" />
                  Facebook
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => handleShareReferral('linkedin')}
                  className="gap-2 text-xs"
                  data-testid="button-share-linkedin"
                >
                  <Linkedin className="w-3 h-3" />
                  LinkedIn
                </Button>
              </div>

              <Button
                size="sm"
                variant="secondary"
                onClick={() => handleShareReferral('copy')}
                className="w-full gap-2"
                data-testid="button-copy-referral"
              >
                <Copy className="w-3 h-3" />
                Copy Referral Link
              </Button>
            </div>

            <Button
              onClick={() => {
                setIsSubmitted(false);
                onOpenChange(false);
                setFormData({
                  name: "",
                  email: "",
                  phone: "",
                  segment: segment,
                  budget: "",
                  budgetMax: "",
                  areas: [],
                  propertyType: "",
                  bedrooms: "",
                  timeline: "",
                  additionalInfo: "",
                });
                setCurrentStep(0);
              }}
              className="w-full bg-blue-600 hover:bg-blue-500"
              data-testid="button-close-success"
            >
              Close
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto" data-testid="dialog-housing-enquiry">
        <DialogHeader>
          <DialogTitle data-testid="text-enquiry-title">
            {segmentLabel[segment]} Enquiry Form
          </DialogTitle>
          <DialogDescription data-testid="text-enquiry-description">
            Tell us more about what you're looking for. Our advisors will match you with the perfect home.
          </DialogDescription>
        </DialogHeader>

        {/* Progress Indicator */}
        <div className="flex gap-2 mb-6">
          {steps.map((step, index) => {
            const Icon = step.icon;
            const isActive = currentStep === index;
            const isCompleted = index < currentStep;
            
            return (
              <div key={index} className="flex flex-col items-center flex-1">
                <button
                  onClick={() => setCurrentStep(index)}
                  className={`mb-2 p-2 rounded-full transition-all ${
                    isCompleted
                      ? 'bg-green-500'
                      : isActive
                      ? 'bg-blue-600'
                      : 'bg-slate-700'
                  }`}
                  data-testid={`button-step-${index}`}
                >
                  <Icon className="w-4 h-4 text-white" />
                </button>
                <span className="text-xs text-gray-400 text-center">{step.title}</span>
              </div>
            );
          })}
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Step 1: Contact Information */}
          {currentStep === 0 && (
            <div className="space-y-4 animate-in fade-in">
              <h3 className="font-semibold text-white flex items-center gap-2">
                <User className="w-4 h-4 text-blue-500" />
                Contact Information
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs text-gray-400 block mb-1.5 font-medium">Full Name *</label>
                  <Input
                    name="name"
                    placeholder="John Smith"
                    value={formData.name}
                    onChange={handleInputChange}
                    className="bg-white border-gray-300 text-black placeholder:text-gray-400 focus:border-blue-500 focus:ring-blue-500"
                    data-testid="input-enquiry-name"
                  />
                </div>
                <div>
                  <label className="text-xs text-gray-400 block mb-1.5 font-medium">Email *</label>
                  <Input
                    name="email"
                    type="email"
                    placeholder="john@example.com"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="bg-white border-gray-300 text-black placeholder:text-gray-400 focus:border-blue-500 focus:ring-blue-500"
                    data-testid="input-enquiry-email"
                  />
                </div>
              </div>
              <div>
                <label className="text-xs text-gray-400 block mb-1.5 font-medium">Phone Number *</label>
                <Input
                  name="phone"
                  placeholder="+971 55 123 4567"
                  value={formData.phone}
                  onChange={handleInputChange}
                  className="bg-white border-gray-300 text-black placeholder:text-gray-400 focus:border-blue-500 focus:ring-blue-500"
                  data-testid="input-enquiry-phone"
                />
              </div>
            </div>
          )}

          {/* Step 2: Budget */}
          {currentStep === 1 && (
            <div className="space-y-4 animate-in fade-in">
              <h3 className="font-semibold text-white flex items-center gap-2">
                <DollarSign className="w-4 h-4 text-green-500" />
                Budget Range
              </h3>
              <p className="text-sm text-gray-400">What's your {formData.segment === 'rent' ? 'monthly' : 'total'} budget?</p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs text-gray-400 block mb-1.5 font-medium">
                    Minimum ({formData.segment === 'rent' ? 'Monthly' : 'Total'}) AED
                  </label>
                  <Input
                    name="budget"
                    placeholder="50,000"
                    value={formData.budget}
                    onChange={handleInputChange}
                    className="bg-white border-gray-300 text-black placeholder:text-gray-400 focus:border-blue-500 focus:ring-blue-500"
                    data-testid="input-enquiry-budget-min"
                  />
                </div>
                <div>
                  <label className="text-xs text-gray-400 block mb-1.5 font-medium">Maximum AED</label>
                  <Input
                    name="budgetMax"
                    placeholder="200,000"
                    value={formData.budgetMax}
                    onChange={handleInputChange}
                    className="bg-white border-gray-300 text-black placeholder:text-gray-400 focus:border-blue-500 focus:ring-blue-500"
                    data-testid="input-enquiry-budget-max"
                  />
                </div>
              </div>
            </div>
          )}

          {/* Step 3: Preferences */}
          {currentStep === 2 && (
            <div className="space-y-4 animate-in fade-in">
              <h3 className="font-semibold text-white flex items-center gap-2">
                <MapPin className="w-4 h-4 text-purple-500" />
                Areas of Interest
              </h3>
              <p className="text-sm text-gray-400">Select all areas you'd like to explore</p>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3 max-h-64 overflow-y-auto p-3 border border-gray-300 rounded-lg bg-gray-50">
                {areaOptions.map(area => (
                  <label key={area} className="flex items-center gap-2 cursor-pointer hover:bg-blue-50 p-2 rounded transition-colors">
                    <Checkbox
                      checked={formData.areas.includes(area)}
                      onCheckedChange={() => handleAreaToggle(area)}
                      data-testid={`checkbox-area-${area.toLowerCase().replace(/\s+/g, '-')}`}
                    />
                    <span className="text-sm text-gray-700">{area}</span>
                  </label>
                ))}
              </div>
            </div>
          )}

          {/* Step 4: Details */}
          {currentStep === 3 && (
            <div className="space-y-4 animate-in fade-in">
              <h3 className="font-semibold text-white flex items-center gap-2">
                <Building2 className="w-4 h-4 text-amber-500" />
                Property & Timeline
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs text-gray-400 block mb-1.5 font-medium">Property Type</label>
                  <Select value={formData.propertyType} onValueChange={(value) => handleSelectChange('propertyType', value)}>
                    <SelectTrigger className="bg-white border-gray-300 text-gray-900" data-testid="select-property-type">
                      <SelectValue placeholder="Select type..." />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="studio">Studio</SelectItem>
                      <SelectItem value="apartment">Apartment</SelectItem>
                      <SelectItem value="villa">Villa</SelectItem>
                      <SelectItem value="townhouse">Townhouse</SelectItem>
                      <SelectItem value="penthouse">Penthouse</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <label className="text-xs text-gray-400 block mb-1.5 font-medium">Bedrooms</label>
                  <Select value={formData.bedrooms} onValueChange={(value) => handleSelectChange('bedrooms', value)}>
                    <SelectTrigger className="bg-white border-gray-300 text-gray-900" data-testid="select-bedrooms">
                      <SelectValue placeholder="Select bedrooms..." />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="studio">Studio</SelectItem>
                      <SelectItem value="1">1 Bedroom</SelectItem>
                      <SelectItem value="2">2 Bedrooms</SelectItem>
                      <SelectItem value="3">3 Bedrooms</SelectItem>
                      <SelectItem value="4">4 Bedrooms</SelectItem>
                      <SelectItem value="5+">5+ Bedrooms</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              <div>
                <label className="text-xs text-gray-400 block mb-1.5 font-medium flex items-center gap-2">
                  <Clock className="w-4 h-4" />
                  When are you looking to move?
                </label>
                <Select value={formData.timeline} onValueChange={(value) => handleSelectChange('timeline', value)}>
                  <SelectTrigger className="bg-white border-gray-300 text-gray-900" data-testid="select-timeline">
                    <SelectValue placeholder="Select timeline..." />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="immediately">Immediately (within 2 weeks)</SelectItem>
                    <SelectItem value="1month">1 Month</SelectItem>
                    <SelectItem value="2-3months">2-3 Months</SelectItem>
                    <SelectItem value="4-6months">4-6 Months</SelectItem>
                    <SelectItem value="6+months">6+ Months</SelectItem>
                    <SelectItem value="flexible">Flexible</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="text-xs text-gray-400 block mb-1.5 font-medium flex items-center gap-2">
                  <FileText className="w-4 h-4" />
                  Any additional information?
                </label>
                <textarea
                  name="additionalInfo"
                  placeholder="Family status, work location, special requirements, etc."
                  value={formData.additionalInfo}
                  onChange={handleInputChange}
                  className="w-full bg-white border border-gray-300 rounded-md px-3 py-2 text-gray-900 placeholder:text-gray-400 text-sm focus:border-blue-500 focus:ring-blue-500"
                  rows={3}
                  data-testid="textarea-enquiry-info"
                />
              </div>
            </div>
          )}

          {/* Navigation Buttons */}
          <div className="flex gap-3 pt-4 border-t border-gray-200">
            <Button
              type="button"
              variant="outline"
              onClick={() => {
                if (currentStep > 0) {
                  setCurrentStep(currentStep - 1);
                } else {
                  onOpenChange(false);
                }
              }}
              className="flex-1"
              data-testid="button-enquiry-previous"
            >
              {currentStep === 0 ? "Cancel" : "Back"}
            </Button>
            {currentStep < 3 ? (
              <Button
                type="button"
                onClick={() => setCurrentStep(currentStep + 1)}
                className="flex-1 bg-blue-600 hover:bg-blue-500"
                data-testid="button-enquiry-next"
              >
                Next
              </Button>
            ) : (
              <Button
                type="submit"
                disabled={isSubmitting}
                className="flex-1 bg-blue-600 hover:bg-blue-500"
                data-testid="button-enquiry-submit"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Submitting...
                  </>
                ) : (
                  <>
                    <Send className="w-4 h-4 mr-2" />
                    Submit Enquiry
                  </>
                )}
              </Button>
            )}
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
