import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Checkbox } from "@/components/ui/checkbox";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
import { Loader2, Send } from "lucide-react";

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
        `,
        urgency: "high",
      });

      toast({
        title: "Enquiry submitted successfully!",
        description: "Our housing advisor will contact you within 24 hours.",
      });

      // Reset form and close dialog
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
      onOpenChange(false);
    } catch (error) {
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

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Contact Information */}
          <div className="space-y-4">
            <h3 className="font-semibold text-white">Contact Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input
                name="name"
                placeholder="Full Name *"
                value={formData.name}
                onChange={handleInputChange}
                className="bg-slate-900 border-slate-700"
                data-testid="input-enquiry-name"
              />
              <Input
                name="email"
                type="email"
                placeholder="Email *"
                value={formData.email}
                onChange={handleInputChange}
                className="bg-slate-900 border-slate-700"
                data-testid="input-enquiry-email"
              />
            </div>
            <Input
              name="phone"
              placeholder="Phone Number *"
              value={formData.phone}
              onChange={handleInputChange}
              className="bg-slate-900 border-slate-700"
              data-testid="input-enquiry-phone"
            />
          </div>

          {/* Budget */}
          <div className="space-y-4">
            <h3 className="font-semibold text-white">Budget</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-sm text-gray-400 block mb-2">Minimum Budget (AED)</label>
                <Input
                  name="budget"
                  placeholder="e.g., 50,000"
                  value={formData.budget}
                  onChange={handleInputChange}
                  className="bg-slate-900 border-slate-700"
                  data-testid="input-enquiry-budget-min"
                />
              </div>
              <div>
                <label className="text-sm text-gray-400 block mb-2">Maximum Budget (AED)</label>
                <Input
                  name="budgetMax"
                  placeholder="e.g., 200,000"
                  value={formData.budgetMax}
                  onChange={handleInputChange}
                  className="bg-slate-900 border-slate-700"
                  data-testid="input-enquiry-budget-max"
                />
              </div>
            </div>
          </div>

          {/* Areas of Interest */}
          <div className="space-y-4">
            <h3 className="font-semibold text-white">Areas of Interest</h3>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3 max-h-48 overflow-y-auto p-2 border border-slate-700 rounded-md bg-slate-900/30">
              {areaOptions.map(area => (
                <label key={area} className="flex items-center gap-2 cursor-pointer">
                  <Checkbox
                    checked={formData.areas.includes(area)}
                    onCheckedChange={() => handleAreaToggle(area)}
                    data-testid={`checkbox-area-${area.toLowerCase().replace(/\s+/g, '-')}`}
                  />
                  <span className="text-sm text-gray-300">{area}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Property Details */}
          <div className="space-y-4">
            <h3 className="font-semibold text-white">Property Details</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-sm text-gray-400 block mb-2">Property Type</label>
                <Select value={formData.propertyType} onValueChange={(value) => handleSelectChange('propertyType', value)}>
                  <SelectTrigger className="bg-slate-900 border-slate-700" data-testid="select-property-type">
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
                <label className="text-sm text-gray-400 block mb-2">Bedrooms</label>
                <Select value={formData.bedrooms} onValueChange={(value) => handleSelectChange('bedrooms', value)}>
                  <SelectTrigger className="bg-slate-900 border-slate-700" data-testid="select-bedrooms">
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
          </div>

          {/* Timeline */}
          <div className="space-y-4">
            <label className="text-sm text-gray-400 block">When are you looking to move?</label>
            <Select value={formData.timeline} onValueChange={(value) => handleSelectChange('timeline', value)}>
              <SelectTrigger className="bg-slate-900 border-slate-700" data-testid="select-timeline">
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

          {/* Additional Info */}
          <div className="space-y-4">
            <label className="text-sm text-gray-400 block">Any additional information?</label>
            <textarea
              name="additionalInfo"
              placeholder="Tell us anything else we should know (family status, work location, special requirements, etc.)"
              value={formData.additionalInfo}
              onChange={handleInputChange}
              className="w-full bg-slate-900 border border-slate-700 rounded-md px-3 py-2 text-white placeholder:text-gray-500 text-sm"
              rows={3}
              data-testid="textarea-enquiry-info"
            />
          </div>

          {/* Submit Button */}
          <div className="flex gap-3 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
              className="flex-1"
              data-testid="button-enquiry-cancel"
            >
              Cancel
            </Button>
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
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
