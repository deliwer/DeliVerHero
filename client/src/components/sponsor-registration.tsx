import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { Building, Mail, Phone, Globe, User, FileText } from "lucide-react";

interface SponsorRegistrationProps {
  onSuccess?: () => void;
  onCancel?: () => void;
}

export function SponsorRegistration({ onSuccess, onCancel }: SponsorRegistrationProps) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    organizationType: "",
    description: "",
    logoUrl: "",
    website: "",
    contactPerson: "",
    phone: "",
  });

  const { toast } = useToast();
  const queryClient = useQueryClient();

  const createSponsorMutation = useMutation({
    mutationFn: (data: any) => apiRequest("POST", "/api/sponsors", data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/sponsors"] });
      toast({
        title: "Registration Successful!",
        description: "Your sponsor registration has been submitted for verification.",
      });
      onSuccess?.();
    },
    onError: (error: any) => {
      toast({
        title: "Registration Failed",
        description: error.message || "Failed to register sponsor",
        variant: "destructive",
      });
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name || !formData.email || !formData.organizationType || 
        !formData.description || !formData.contactPerson) {
      toast({
        title: "Missing Required Fields",
        description: "Please fill in all required fields.",
        variant: "destructive",
      });
      return;
    }

    createSponsorMutation.mutate(formData);
  };

  const handleChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  return (
    <Card className="max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Building className="w-5 h-5 text-emerald-600" />
          Sponsor Registration
        </CardTitle>
        <p className="text-gray-600">
          Join our community of sustainability champions and start funding impactful environmental missions in Dubai.
        </p>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Organization Name */}
          <div>
            <Label htmlFor="name" className="flex items-center gap-2 mb-2">
              <Building className="w-4 h-4" />
              Organization Name *
            </Label>
            <Input
              id="name"
              value={formData.name}
              onChange={(e) => handleChange("name", e.target.value)}
              placeholder="Enter your organization name"
              required
              data-testid="input-organization-name"
            />
          </div>

          {/* Email */}
          <div>
            <Label htmlFor="email" className="flex items-center gap-2 mb-2">
              <Mail className="w-4 h-4" />
              Email Address *
            </Label>
            <Input
              id="email"
              type="email"
              value={formData.email}
              onChange={(e) => handleChange("email", e.target.value)}
              placeholder="contact@yourorganization.com"
              required
              data-testid="input-email"
            />
          </div>

          {/* Organization Type */}
          <div>
            <Label className="flex items-center gap-2 mb-2">
              <FileText className="w-4 h-4" />
              Organization Type *
            </Label>
            <Select 
              value={formData.organizationType} 
              onValueChange={(value) => handleChange("organizationType", value)}
            >
              <SelectTrigger data-testid="select-organization-type">
                <SelectValue placeholder="Select organization type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="ngo">Non-Governmental Organization (NGO)</SelectItem>
                <SelectItem value="government">Government Entity</SelectItem>
                <SelectItem value="corporate">Corporate/Business</SelectItem>
                <SelectItem value="foundation">Foundation</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Contact Person */}
          <div>
            <Label htmlFor="contactPerson" className="flex items-center gap-2 mb-2">
              <User className="w-4 h-4" />
              Contact Person *
            </Label>
            <Input
              id="contactPerson"
              value={formData.contactPerson}
              onChange={(e) => handleChange("contactPerson", e.target.value)}
              placeholder="Full name of primary contact"
              required
              data-testid="input-contact-person"
            />
          </div>

          {/* Phone */}
          <div>
            <Label htmlFor="phone" className="flex items-center gap-2 mb-2">
              <Phone className="w-4 h-4" />
              Phone Number
            </Label>
            <Input
              id="phone"
              value={formData.phone}
              onChange={(e) => handleChange("phone", e.target.value)}
              placeholder="+971-XX-XXX-XXXX"
              data-testid="input-phone"
            />
          </div>

          {/* Website */}
          <div>
            <Label htmlFor="website" className="flex items-center gap-2 mb-2">
              <Globe className="w-4 h-4" />
              Website
            </Label>
            <Input
              id="website"
              type="url"
              value={formData.website}
              onChange={(e) => handleChange("website", e.target.value)}
              placeholder="https://yourorganization.com"
              data-testid="input-website"
            />
          </div>

          {/* Logo URL */}
          <div>
            <Label htmlFor="logoUrl" className="flex items-center gap-2 mb-2">
              <Building className="w-4 h-4" />
              Logo URL
            </Label>
            <Input
              id="logoUrl"
              type="url"
              value={formData.logoUrl}
              onChange={(e) => handleChange("logoUrl", e.target.value)}
              placeholder="https://yourorganization.com/logo.png"
              data-testid="input-logo-url"
            />
          </div>

          {/* Description */}
          <div>
            <Label htmlFor="description" className="flex items-center gap-2 mb-2">
              <FileText className="w-4 h-4" />
              Organization Description *
            </Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) => handleChange("description", e.target.value)}
              placeholder="Describe your organization's mission and sustainability goals..."
              rows={4}
              required
              data-testid="input-description"
            />
          </div>

          {/* Benefits Information */}
          <div className="bg-emerald-50 p-4 rounded-lg">
            <h4 className="font-medium text-emerald-800 mb-2">What happens next?</h4>
            <ul className="text-sm text-emerald-700 space-y-1">
              <li>• Your application will be reviewed within 2-3 business days</li>
              <li>• Upon verification, you'll receive access to sponsor missions</li>
              <li>• You can choose from Bronze, Silver, Gold, or Platinum sponsorship levels</li>
              <li>• Track real-time impact of your sponsored environmental missions</li>
              <li>• Get featured recognition in the DeliWer community</li>
            </ul>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-4">
            {onCancel && (
              <Button 
                type="button"
                variant="outline" 
                onClick={onCancel}
                className="flex-1"
                data-testid="button-cancel-registration"
              >
                Cancel
              </Button>
            )}
            <Button 
              type="submit"
              disabled={createSponsorMutation.isPending}
              className="flex-1 bg-emerald-600 hover:bg-emerald-700"
              data-testid="button-submit-registration"
            >
              {createSponsorMutation.isPending ? "Submitting..." : "Submit Registration"}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}