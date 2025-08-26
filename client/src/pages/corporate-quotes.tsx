import { useState } from "react";
import { 
  Calculator, 
  FileText, 
  Building2, 
  Clock, 
  CheckCircle, 
  AlertCircle,
  Download,
  Send,
  DollarSign
} from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";

export function CorporateQuotesPage() {
  const [quoteRequest, setQuoteRequest] = useState({
    companyName: "",
    contactName: "",
    email: "",
    phone: "",
    urgency: "",
    deviceDetails: "",
    quantity: "",
    preferredPickup: "",
    additionalNotes: ""
  });

  const sampleQuotes = [
    {
      id: "QT-2025-001",
      companyName: "Tech Solutions DMCC",
      deviceType: "iPhone 15 Pro",
      quantity: 50,
      unitPrice: 900,
      totalValue: 45000,
      status: "pending",
      validUntil: "2025-02-01",
      responseTime: "18 hours"
    },
    {
      id: "QT-2025-002",
      companyName: "Emirates Financial Services", 
      deviceType: "MacBook Pro 16\"",
      quantity: 25,
      unitPrice: 1200,
      totalValue: 30000,
      status: "approved",
      validUntil: "2025-02-05",
      responseTime: "12 hours"
    },
    {
      id: "QT-2025-003",
      companyName: "Dubai Logistics Hub",
      deviceType: "iPad Pro 12.9\"",
      quantity: 100,
      unitPrice: 400,
      totalValue: 40000,
      status: "under_review",
      validUntil: "2025-01-30",
      responseTime: "24 hours"
    }
  ];

  const pricingTiers = [
    {
      tier: "Volume Basic",
      minQuantity: "50-99 units",
      premiumRate: "5%",
      responseTime: "24 hours",
      features: ["Standard pricing", "Email support", "Basic reporting"]
    },
    {
      tier: "Volume Plus", 
      minQuantity: "100-499 units",
      premiumRate: "10%",
      responseTime: "12 hours",
      features: ["Premium pricing", "Priority support", "Advanced reporting", "Dedicated account manager"]
    },
    {
      tier: "Enterprise",
      minQuantity: "500+ units",
      premiumRate: "15%",
      responseTime: "6 hours",
      features: ["Enterprise pricing", "24/7 support", "Custom reporting", "White-glove service", "Flexible payment terms"]
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "pending": return "bg-yellow-600/20 text-yellow-300 border-yellow-500/30";
      case "approved": return "bg-green-600/20 text-green-300 border-green-500/30";
      case "under_review": return "bg-blue-600/20 text-blue-300 border-blue-500/30";
      default: return "bg-gray-600/20 text-gray-300 border-gray-500/30";
    }
  };

  const handleSubmitQuote = () => {
    console.log("Submitting quote request:", quoteRequest);
    // API call would go here
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-white mb-4">
            Corporate Bulk Quotes
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Get competitive bulk pricing for your corporate device trade-ins. 
            Submit your requirements and receive customized quotes within hours.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Quote Request Form */}
          <div className="lg:col-span-2">
            <Card className="bg-slate-800/50 border-slate-700">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <Calculator className="w-6 h-6" />
                  Submit Quote Request
                </CardTitle>
                <CardDescription>
                  Provide details about your devices for an accurate bulk quote
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <Label className="text-gray-300">Company Name *</Label>
                    <Input
                      value={quoteRequest.companyName}
                      onChange={(e) => setQuoteRequest({ ...quoteRequest, companyName: e.target.value })}
                      className="bg-slate-700 border-slate-600"
                      placeholder="Your company name"
                    />
                  </div>
                  
                  <div>
                    <Label className="text-gray-300">Contact Person *</Label>
                    <Input
                      value={quoteRequest.contactName}
                      onChange={(e) => setQuoteRequest({ ...quoteRequest, contactName: e.target.value })}
                      className="bg-slate-700 border-slate-600"
                      placeholder="Your full name"
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <Label className="text-gray-300">Business Email *</Label>
                    <Input
                      type="email"
                      value={quoteRequest.email}
                      onChange={(e) => setQuoteRequest({ ...quoteRequest, email: e.target.value })}
                      className="bg-slate-700 border-slate-600"
                      placeholder="procurement@company.com"
                    />
                  </div>
                  
                  <div>
                    <Label className="text-gray-300">Phone Number *</Label>
                    <Input
                      value={quoteRequest.phone}
                      onChange={(e) => setQuoteRequest({ ...quoteRequest, phone: e.target.value })}
                      className="bg-slate-700 border-slate-600"
                      placeholder="+971 XX XXX XXXX"
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <Label className="text-gray-300">Quote Urgency</Label>
                    <Select onValueChange={(value) => setQuoteRequest({ ...quoteRequest, urgency: value })}>
                      <SelectTrigger className="bg-slate-700 border-slate-600">
                        <SelectValue placeholder="When do you need this?" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="asap">ASAP (6 hours)</SelectItem>
                        <SelectItem value="24h">Within 24 hours</SelectItem>
                        <SelectItem value="week">Within a week</SelectItem>
                        <SelectItem value="month">Within a month</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div>
                    <Label className="text-gray-300">Total Quantity</Label>
                    <Input
                      type="number"
                      value={quoteRequest.quantity}
                      onChange={(e) => setQuoteRequest({ ...quoteRequest, quantity: e.target.value })}
                      className="bg-slate-700 border-slate-600"
                      placeholder="Number of devices"
                    />
                  </div>
                </div>

                <div>
                  <Label className="text-gray-300">Device Details *</Label>
                  <Textarea
                    value={quoteRequest.deviceDetails}
                    onChange={(e) => setQuoteRequest({ ...quoteRequest, deviceDetails: e.target.value })}
                    className="bg-slate-700 border-slate-600 min-h-[100px]"
                    placeholder="List all device models, conditions, and quantities. Example:&#10;- iPhone 15 Pro (Excellent) x 50&#10;- MacBook Pro 16&quot; (Good) x 25&#10;- iPad Air (Fair) x 30"
                  />
                </div>

                <div>
                  <Label className="text-gray-300">Preferred Pickup Location</Label>
                  <Input
                    value={quoteRequest.preferredPickup}
                    onChange={(e) => setQuoteRequest({ ...quoteRequest, preferredPickup: e.target.value })}
                    className="bg-slate-700 border-slate-600"
                    placeholder="Office address or pickup preference"
                  />
                </div>

                <div>
                  <Label className="text-gray-300">Additional Notes</Label>
                  <Textarea
                    value={quoteRequest.additionalNotes}
                    onChange={(e) => setQuoteRequest({ ...quoteRequest, additionalNotes: e.target.value })}
                    className="bg-slate-700 border-slate-600"
                    placeholder="Any special requirements, payment preferences, or additional information"
                  />
                </div>

                <Button 
                  onClick={handleSubmitQuote}
                  className="w-full bg-blue-600 hover:bg-blue-700" 
                  size="lg"
                >
                  <Send className="w-5 h-5 mr-2" />
                  Submit Quote Request
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Pricing Tiers & Recent Quotes */}
          <div className="space-y-6">
            {/* Pricing Tiers */}
            <Card className="bg-slate-800/50 border-slate-700">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <DollarSign className="w-5 h-5" />
                  Volume Pricing Tiers
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {pricingTiers.map((tier, index) => (
                  <div key={index} className="bg-slate-700/30 p-4 rounded-lg">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="text-white font-medium">{tier.tier}</h3>
                      <Badge className="bg-green-600/20 text-green-300 border-green-500/30">
                        +{tier.premiumRate}
                      </Badge>
                    </div>
                    <p className="text-gray-400 text-sm mb-2">{tier.minQuantity}</p>
                    <p className="text-blue-300 text-sm mb-3">
                      <Clock className="inline w-3 h-3 mr-1" />
                      {tier.responseTime}
                    </p>
                    <ul className="text-xs text-gray-400 space-y-1">
                      {tier.features.map((feature, idx) => (
                        <li key={idx} className="flex items-center">
                          <CheckCircle className="w-3 h-3 mr-2 text-green-400" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Recent Quotes Status */}
            <Card className="bg-slate-800/50 border-slate-700">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <FileText className="w-5 h-5" />
                  Recent Quote Status
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {sampleQuotes.map((quote) => (
                  <div key={quote.id} className="bg-slate-700/30 p-3 rounded-lg">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-white text-sm font-medium">{quote.id}</span>
                      <Badge className={getStatusColor(quote.status)}>
                        {quote.status.replace('_', ' ')}
                      </Badge>
                    </div>
                    <p className="text-gray-400 text-xs mb-1">{quote.companyName}</p>
                    <p className="text-gray-300 text-sm">
                      {quote.quantity}x {quote.deviceType}
                    </p>
                    <div className="flex justify-between items-center mt-2">
                      <span className="text-green-400 font-medium">
                        AED {quote.totalValue.toLocaleString()}
                      </span>
                      <span className="text-xs text-gray-500">
                        {quote.responseTime}
                      </span>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Information Section */}
        <div className="mt-12">
          <Card className="bg-slate-800/50 border-slate-700">
            <CardContent className="pt-6">
              <div className="grid md:grid-cols-3 gap-8 text-center">
                <div>
                  <Clock className="w-12 h-12 text-blue-400 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-white mb-2">Fast Response</h3>
                  <p className="text-gray-400">
                    Get your quote within 6-24 hours depending on volume and urgency
                  </p>
                </div>
                
                <div>
                  <Building2 className="w-12 h-12 text-green-400 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-white mb-2">Enterprise Ready</h3>
                  <p className="text-gray-400">
                    Dedicated account managers and white-glove service for large accounts
                  </p>
                </div>
                
                <div>
                  <AlertCircle className="w-12 h-12 text-purple-400 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-white mb-2">Transparent Pricing</h3>
                  <p className="text-gray-400">
                    No hidden fees. Clear breakdown of all costs and premium rates
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}