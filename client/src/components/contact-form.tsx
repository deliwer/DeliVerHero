import { useState } from "react";
import { Send, Mail, Phone, MessageCircle, Building, User, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
import { contactInfo } from "@/lib/contact-info";

interface ContactFormProps {
  type?: "general" | "support" | "sales" | "partnership" | "feedback" | "complaint";
  prefilledSubject?: string;
}

export function ContactForm({ type = "general", prefilledSubject }: ContactFormProps) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    subject: prefilledSubject || "",
    category: type as "general" | "support" | "sales" | "partnership" | "feedback" | "complaint",
    message: "",
    urgency: "normal",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Create WhatsApp message
      const messageText = `Hello DeliWer Team,\n\nNew Inquiry from Website:\n\nName: ${formData.name}\nEmail: ${formData.email}\nPhone: ${formData.phone}\nCompany: ${formData.company || 'N/A'}\nSubject: ${formData.subject}\nCategory: ${formData.category}\nUrgency: ${formData.urgency}\n\nMessage: ${formData.message}`;
      const whatsappUrl = `${contactInfo.ctas.whatsappBase}${contactInfo.company.whatsapp}?text=${encodeURIComponent(messageText)}`;

      // Still log to DB for backup/tracking
      await apiRequest("POST", "/api/contact", formData);
      
      // Redirect to WhatsApp
      window.open(whatsappUrl, '_blank');

      toast({
        title: "Inquiry Initiated",
        description: "Opening WhatsApp to send your message...",
      });

      // Reset form
      setFormData({
        name: "",
        email: "",
        phone: "",
        company: "",
        subject: "",
        category: type,
        message: "",
        urgency: "normal",
      });
    } catch (error) {
      toast({
        title: "Failed to process inquiry",
        description: "Please try contacting us directly via WhatsApp.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const getFormTitle = () => {
    switch (type) {
      case "support": return "Get Support";
      case "sales": return "Sales Inquiry";
      case "partnership": return "Partnership Inquiry";
      default: return "Contact Us";
    }
  };

  const getFormDescription = () => {
    switch (type) {
      case "support": return "Need help with your account or have technical issues?";
      case "sales": return "Interested in our products or bulk pricing?";
      case "partnership": return "Let's discuss collaboration opportunities";
      default: return "We'd love to hear from you. Send us a message and we'll respond as soon as possible.";
    }
  };

  return (
    <Card className="w-full max-w-2xl bg-slate-800 border-slate-700">
      <CardHeader className="space-y-1">
        <CardTitle className="text-2xl font-bold text-center text-white flex items-center justify-center gap-2">
          <MessageCircle className="w-6 h-6 text-emerald-400" />
          {getFormTitle()}
        </CardTitle>
        <p className="text-center text-gray-400">
          {getFormDescription()}
        </p>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label htmlFor="name" className="text-sm font-medium text-gray-300">
                Full Name *
              </label>
              <div className="relative">
                <User className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input
                  id="name"
                  name="name"
                  placeholder="Your full name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="pl-10 bg-slate-700 border-slate-600 text-white placeholder:text-gray-400 focus:bg-slate-700 focus:border-emerald-500"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <label htmlFor="email" className="text-sm font-medium text-gray-300">
                Email Address *
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="your.email@example.com"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="pl-10 bg-slate-700 border-slate-600 text-white placeholder:text-gray-400 focus:bg-slate-700 focus:border-emerald-500"
                  required
                />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label htmlFor="phone" className="text-sm font-medium text-gray-300">
                Phone Number
              </label>
              <div className="relative">
                <Phone className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input
                  id="phone"
                  name="phone"
                  type="tel"
                  placeholder="+971 50 123 4567"
                  value={formData.phone}
                  onChange={handleInputChange}
                  className="pl-10 bg-slate-700 border-slate-600 text-white placeholder:text-gray-400 focus:bg-slate-700 focus:border-emerald-500"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label htmlFor="company" className="text-sm font-medium text-gray-300">
                Company (Optional)
              </label>
              <div className="relative">
                <Building className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input
                  id="company"
                  name="company"
                  placeholder="Your company name"
                  value={formData.company}
                  onChange={handleInputChange}
                  className="pl-10 bg-slate-700 border-slate-600 text-white placeholder:text-gray-400 focus:bg-slate-700 focus:border-emerald-500"
                />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label htmlFor="category" className="text-sm font-medium text-gray-300">
                Category
              </label>
              <Select
                value={formData.category}
                onValueChange={(value) => setFormData(prev => ({ ...prev, category: value as "general" | "support" | "sales" | "partnership" | "feedback" | "complaint" }))}
              >
                <SelectTrigger className="bg-slate-700 border-slate-600 text-white">
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="general">General Inquiry</SelectItem>
                  <SelectItem value="support">Technical Support</SelectItem>
                  <SelectItem value="sales">Sales & Pricing</SelectItem>
                  <SelectItem value="partnership">Partnership</SelectItem>
                  <SelectItem value="feedback">Feedback</SelectItem>
                  <SelectItem value="complaint">Complaint</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <label htmlFor="urgency" className="text-sm font-medium text-gray-300">
                Urgency
              </label>
              <Select
                value={formData.urgency}
                onValueChange={(value) => setFormData(prev => ({ ...prev, urgency: value }))}
              >
                <SelectTrigger className="bg-slate-700 border-slate-600 text-white">
                  <SelectValue placeholder="Select urgency" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="low">Low - Response within 3 days</SelectItem>
                  <SelectItem value="normal">Normal - Response within 24 hours</SelectItem>
                  <SelectItem value="high">High - Response within 4 hours</SelectItem>
                  <SelectItem value="urgent">Urgent - Response within 1 hour</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <label htmlFor="subject" className="text-sm font-medium text-gray-300">
              Subject *
            </label>
            <Input
              id="subject"
              name="subject"
              placeholder="Brief description of your inquiry"
              value={formData.subject}
              onChange={handleInputChange}
              className="bg-slate-700 border-slate-600 text-white placeholder:text-gray-400 focus:bg-slate-700 focus:border-emerald-500"
              required
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="message" className="text-sm font-medium text-gray-300">
              Message *
            </label>
            <Textarea
              id="message"
              name="message"
              placeholder="Please provide details about your inquiry..."
              value={formData.message}
              onChange={handleInputChange}
              rows={6}
              className="bg-slate-700 border-slate-600 text-white placeholder:text-gray-400 focus:bg-slate-700 focus:border-emerald-500"
              required
            />
          </div>

          <Button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-gradient-to-r from-emerald-600 to-blue-600 hover:from-emerald-700 hover:to-blue-700 text-white font-medium"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Processing...
              </>
            ) : (
              <>
                <MessageCircle className="mr-2 h-4 w-4" />
                Continue to WhatsApp
              </>
            )}
          </Button>

          <div className="text-center space-y-2">
            <p className="text-sm text-gray-400">
              Need immediate assistance?
            </p>
            <div className="flex justify-center gap-4 text-sm">
              <a href="tel:+971523906019" className="text-emerald-400 hover:text-emerald-300">📞 +971 52 390 6019</a>
              <a href="mailto:support@deliwer.com" className="text-blue-400 hover:text-blue-300">
                ✉️ support@deliwer.com
              </a>
            </div>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
