import { useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import { useMutation } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { Upload, FileText, Calculator, Building2, Users, Clock, CheckCircle, Smartphone, Recycle, TrendingUp, Award } from "lucide-react";

export default function CorporateCombined() {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("cobone");
  
  // Cobone form state
  const [coboneFormData, setCoboneFormData] = useState({
    companyName: "",
    contactName: "",
    email: "",
    phone: "",
    industry: "",
    deviceCount: "",
    message: ""
  });

  // Bulk trade-in form state
  const [devices, setDevices] = useState([{ model: "", condition: "", quantity: 1, estimatedValue: 0 }]);
  const [companyInfo, setCompanyInfo] = useState({
    name: "",
    email: "",
    phone: "",
    department: "",
    employeeCount: ""
  });

  // Impact stats
  const [impact, setImpact] = useState({
    devices: 1000,
    water: 50000,
    co2: 3,
    corporates: 15,
  });

  const submitCoboneInquiry = useMutation({
    mutationFn: (data: any) => apiRequest("/api/corporate/inquiry", "POST", data),
    onSuccess: () => {
      toast({
        title: "Cobone Partnership Inquiry Submitted",
        description: "Our team will contact you within 24 hours to discuss your cobranded trade-in program.",
      });
      setCoboneFormData({
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

  const submitBulkInquiry = useMutation({
    mutationFn: (data: any) => apiRequest("/api/corporate/bulk-quote", "POST", data),
    onSuccess: () => {
      toast({
        title: "Bulk Trade-in Quote Requested",
        description: "We'll prepare your bulk quote and send it within 2 business hours.",
      });
      setDevices([{ model: "", condition: "", quantity: 1, estimatedValue: 0 }]);
      setCompanyInfo({
        name: "",
        email: "",
        phone: "",
        department: "",
        employeeCount: ""
      });
    },
    onError: () => {
      toast({
        title: "Quote Request Failed",
        description: "Please try again or contact us directly.",
        variant: "destructive",
      });
    },
  });

  const handleCoboneSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    submitCoboneInquiry.mutate({
      ...coboneFormData,
      program: "cobone-partnership"
    });
  };

  const handleBulkSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    submitBulkInquiry.mutate({
      companyInfo,
      devices,
      totalEstimate: devices.reduce((sum, device) => sum + (device.estimatedValue * device.quantity), 0)
    });
  };

  const handleCoboneInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setCoboneFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const addDevice = () => {
    setDevices([...devices, { model: "", condition: "", quantity: 1, estimatedValue: 0 }]);
  };

  const updateDevice = (index: number, field: string, value: any) => {
    const updated = devices.map((device, i) => 
      i === index ? { ...device, [field]: value } : device
    );
    setDevices(updated);
  };

  const totalEstimate = devices.reduce((sum, device) => sum + (device.estimatedValue * device.quantity), 0);

  return (
    <div className="bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 min-h-screen" data-testid="corporate-combined-page">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-white mb-4">
            Corporate Trade-in Solutions
          </h1>
          <p className="text-xl text-gray-300 max-w-4xl mx-auto">
            Choose between our cobranded partnership programs or direct bulk trade-in services. 
            Both options help your organization upgrade devices while maximizing environmental impact.
          </p>
        </div>

        {/* Stats Overview */}
        <div className="grid md:grid-cols-4 gap-6 mb-12">
          <Card className="bg-slate-800/50 border-slate-700">
            <CardContent className="pt-6">
              <div className="flex items-center space-x-4">
                <Building2 className="w-10 h-10 text-blue-400" />
                <div>
                  <p className="text-2xl font-bold text-white">500+</p>
                  <p className="text-gray-400">Corporate Clients</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="bg-slate-800/50 border-slate-700">
            <CardContent className="pt-6">
              <div className="flex items-center space-x-4">
                <Users className="w-10 h-10 text-green-400" />
                <div>
                  <p className="text-2xl font-bold text-white">50K+</p>
                  <p className="text-gray-400">Devices Processed</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="bg-slate-800/50 border-slate-700">
            <CardContent className="pt-6">
              <div className="flex items-center space-x-4">
                <Clock className="w-10 h-10 text-purple-400" />
                <div>
                  <p className="text-2xl font-bold text-white">24hr</p>
                  <p className="text-gray-400">Quote Turnaround</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-slate-800/50 border-slate-700">
            <CardContent className="pt-6">
              <div className="flex items-center space-x-4">
                <Award className="w-10 h-10 text-yellow-400" />
                <div>
                  <p className="text-2xl font-bold text-white">95%</p>
                  <p className="text-gray-400">Client Satisfaction</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-8">
            <TabsTrigger value="cobone" className="text-lg py-3">
              <div className="flex items-center gap-2">
                <TrendingUp className="w-5 h-5" />
                Cobone Partnership
              </div>
            </TabsTrigger>
            <TabsTrigger value="bulk" className="text-lg py-3">
              <div className="flex items-center gap-2">
                <Calculator className="w-5 h-5" />
                Bulk Trade-in
              </div>
            </TabsTrigger>
          </TabsList>

          {/* Cobone Partnership Tab */}
          <TabsContent value="cobone" className="space-y-8">
            {/* Cobone Partnership Hero */}
            <Card className="bg-gradient-to-r from-blue-600 to-green-500 text-white border-0">
              <CardContent className="pt-8 pb-8">
                <div className="flex justify-center items-center gap-8 mb-6">
                  <div className="text-3xl font-bold text-white">Cobone</div>
                  <div className="text-2xl text-white/80">×</div>
                  <div className="text-3xl font-bold text-white">DeliWer</div>
                </div>
                <h2 className="text-2xl font-bold text-center mb-4">
                  Exclusive Corporate Partnership Program
                </h2>
                <p className="text-center text-white/90 max-w-3xl mx-auto">
                  Join Cobone and DeliWer's exclusive corporate partnership program for enhanced 
                  device trade-in benefits and cobranded marketing opportunities in the UAE and Saudi markets.
                </p>
              </CardContent>
            </Card>

            {/* Partnership Benefits */}
            <div className="grid md:grid-cols-3 gap-6">
              <Card className="bg-slate-800/50 border-slate-700">
                <CardHeader>
                  <CardTitle className="text-white flex items-center gap-2">
                    <Smartphone className="w-6 h-6 text-blue-400" />
                    Premium Rates
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-400">
                    Access exclusive trade-in rates up to 20% higher than standard market rates through our partnership.
                  </p>
                </CardContent>
              </Card>

              <Card className="bg-slate-800/50 border-slate-700">
                <CardHeader>
                  <CardTitle className="text-white flex items-center gap-2">
                    <Building2 className="w-6 h-6 text-green-400" />
                    Cobranded Marketing
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-400">
                    Joint marketing campaigns and promotional materials featuring both Cobone and DeliWer branding.
                  </p>
                </CardContent>
              </Card>

              <Card className="bg-slate-800/50 border-slate-700">
                <CardHeader>
                  <CardTitle className="text-white flex items-center gap-2">
                    <Recycle className="w-6 h-6 text-purple-400" />
                    ESG Impact
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-400">
                    Comprehensive ESG reporting and sustainability metrics for your corporate responsibility goals.
                  </p>
                </CardContent>
              </Card>
            </div>

            {/* Cobone Partnership Form */}
            <Card className="bg-slate-800/50 border-slate-700">
              <CardHeader>
                <CardTitle className="text-white">Request Partnership Information</CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleCoboneSubmit} className="space-y-4">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="text-white text-sm font-medium">Company Name *</label>
                      <Input
                        name="companyName"
                        value={coboneFormData.companyName}
                        onChange={handleCoboneInputChange}
                        required
                        className="bg-slate-700 border-slate-600 text-white"
                        data-testid="input-cobone-company"
                      />
                    </div>
                    <div>
                      <label className="text-white text-sm font-medium">Contact Name *</label>
                      <Input
                        name="contactName"
                        value={coboneFormData.contactName}
                        onChange={handleCoboneInputChange}
                        required
                        className="bg-slate-700 border-slate-600 text-white"
                        data-testid="input-cobone-contact"
                      />
                    </div>
                  </div>
                  
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="text-white text-sm font-medium">Email *</label>
                      <Input
                        name="email"
                        type="email"
                        value={coboneFormData.email}
                        onChange={handleCoboneInputChange}
                        required
                        className="bg-slate-700 border-slate-600 text-white"
                        data-testid="input-cobone-email"
                      />
                    </div>
                    <div>
                      <label className="text-white text-sm font-medium">Phone</label>
                      <Input
                        name="phone"
                        value={coboneFormData.phone}
                        onChange={handleCoboneInputChange}
                        className="bg-slate-700 border-slate-600 text-white"
                        data-testid="input-cobone-phone"
                      />
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="text-white text-sm font-medium">Industry</label>
                      <Input
                        name="industry"
                        value={coboneFormData.industry}
                        onChange={handleCoboneInputChange}
                        className="bg-slate-700 border-slate-600 text-white"
                        data-testid="input-cobone-industry"
                      />
                    </div>
                    <div>
                      <label className="text-white text-sm font-medium">Expected Device Count</label>
                      <Input
                        name="deviceCount"
                        value={coboneFormData.deviceCount}
                        onChange={handleCoboneInputChange}
                        className="bg-slate-700 border-slate-600 text-white"
                        data-testid="input-cobone-device-count"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-white text-sm font-medium">Partnership Interests</label>
                    <Textarea
                      name="message"
                      value={coboneFormData.message}
                      onChange={handleCoboneInputChange}
                      placeholder="Tell us about your partnership goals and requirements..."
                      className="bg-slate-700 border-slate-600 text-white"
                      data-testid="textarea-cobone-message"
                    />
                  </div>

                  <Button 
                    type="submit"
                    disabled={submitCoboneInquiry.isPending}
                    className="w-full bg-gradient-to-r from-blue-600 to-green-500 hover:from-blue-700 hover:to-green-600"
                    data-testid="button-submit-cobone"
                  >
                    {submitCoboneInquiry.isPending ? "Submitting..." : "Request Partnership Information"}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Bulk Trade-in Tab */}
          <TabsContent value="bulk" className="space-y-8">
            {/* Process Steps */}
            <div className="grid md:grid-cols-4 gap-4 mb-8">
              <Card className="bg-slate-800/50 border-slate-700">
                <CardContent className="pt-6 text-center">
                  <FileText className="w-12 h-12 text-blue-400 mx-auto mb-3" />
                  <h3 className="text-white font-semibold mb-2">1. Submit Details</h3>
                  <p className="text-gray-400 text-sm">Provide device inventory and company information</p>
                </CardContent>
              </Card>
              
              <Card className="bg-slate-800/50 border-slate-700">
                <CardContent className="pt-6 text-center">
                  <Calculator className="w-12 h-12 text-green-400 mx-auto mb-3" />
                  <h3 className="text-white font-semibold mb-2">2. Get Quote</h3>
                  <p className="text-gray-400 text-sm">Receive detailed valuation within 24 hours</p>
                </CardContent>
              </Card>
              
              <Card className="bg-slate-800/50 border-slate-700">
                <CardContent className="pt-6 text-center">
                  <Upload className="w-12 h-12 text-purple-400 mx-auto mb-3" />
                  <h3 className="text-white font-semibold mb-2">3. Schedule Pickup</h3>
                  <p className="text-gray-400 text-sm">Arrange secure device collection</p>
                </CardContent>
              </Card>
              
              <Card className="bg-slate-800/50 border-slate-700">
                <CardContent className="pt-6 text-center">
                  <CheckCircle className="w-12 h-12 text-yellow-400 mx-auto mb-3" />
                  <h3 className="text-white font-semibold mb-2">4. Get Paid</h3>
                  <p className="text-gray-400 text-sm">Receive payment upon verification</p>
                </CardContent>
              </Card>
            </div>

            {/* Company Information Form */}
            <Card className="bg-slate-800/50 border-slate-700">
              <CardHeader>
                <CardTitle className="text-white">Company Information</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-white text-sm font-medium">Company Name *</label>
                    <Input
                      value={companyInfo.name}
                      onChange={(e) => setCompanyInfo(prev => ({...prev, name: e.target.value}))}
                      required
                      className="bg-slate-700 border-slate-600 text-white"
                      data-testid="input-bulk-company"
                    />
                  </div>
                  <div>
                    <label className="text-white text-sm font-medium">Department</label>
                    <Input
                      value={companyInfo.department}
                      onChange={(e) => setCompanyInfo(prev => ({...prev, department: e.target.value}))}
                      className="bg-slate-700 border-slate-600 text-white"
                      data-testid="input-bulk-department"
                    />
                  </div>
                  <div>
                    <label className="text-white text-sm font-medium">Contact Email *</label>
                    <Input
                      type="email"
                      value={companyInfo.email}
                      onChange={(e) => setCompanyInfo(prev => ({...prev, email: e.target.value}))}
                      required
                      className="bg-slate-700 border-slate-600 text-white"
                      data-testid="input-bulk-email"
                    />
                  </div>
                  <div>
                    <label className="text-white text-sm font-medium">Phone</label>
                    <Input
                      value={companyInfo.phone}
                      onChange={(e) => setCompanyInfo(prev => ({...prev, phone: e.target.value}))}
                      className="bg-slate-700 border-slate-600 text-white"
                      data-testid="input-bulk-phone"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Device Inventory */}
            <Card className="bg-slate-800/50 border-slate-700">
              <CardHeader>
                <CardTitle className="text-white">Device Inventory</CardTitle>
              </CardHeader>
              <CardContent>
                {devices.map((device, index) => (
                  <div key={index} className="grid md:grid-cols-4 gap-4 mb-4 p-4 bg-slate-700/50 rounded">
                    <div>
                      <label className="text-white text-sm font-medium">Device Model</label>
                      <Select value={device.model} onValueChange={(value) => updateDevice(index, 'model', value)}>
                        <SelectTrigger className="bg-slate-600 border-slate-500 text-white">
                          <SelectValue placeholder="Select model" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="iphone-15-pro">iPhone 15 Pro</SelectItem>
                          <SelectItem value="iphone-15">iPhone 15</SelectItem>
                          <SelectItem value="iphone-14-pro">iPhone 14 Pro</SelectItem>
                          <SelectItem value="iphone-14">iPhone 14</SelectItem>
                          <SelectItem value="iphone-13">iPhone 13</SelectItem>
                          <SelectItem value="samsung-s24">Samsung Galaxy S24</SelectItem>
                          <SelectItem value="samsung-s23">Samsung Galaxy S23</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <label className="text-white text-sm font-medium">Condition</label>
                      <Select value={device.condition} onValueChange={(value) => updateDevice(index, 'condition', value)}>
                        <SelectTrigger className="bg-slate-600 border-slate-500 text-white">
                          <SelectValue placeholder="Select condition" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="excellent">Excellent</SelectItem>
                          <SelectItem value="good">Good</SelectItem>
                          <SelectItem value="fair">Fair</SelectItem>
                          <SelectItem value="poor">Poor</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <label className="text-white text-sm font-medium">Quantity</label>
                      <Input
                        type="number"
                        min="1"
                        value={device.quantity}
                        onChange={(e) => updateDevice(index, 'quantity', parseInt(e.target.value) || 1)}
                        className="bg-slate-600 border-slate-500 text-white"
                      />
                    </div>
                    <div>
                      <label className="text-white text-sm font-medium">Est. Value (AED)</label>
                      <Input
                        type="number"
                        value={device.estimatedValue}
                        onChange={(e) => updateDevice(index, 'estimatedValue', parseFloat(e.target.value) || 0)}
                        className="bg-slate-600 border-slate-500 text-white"
                      />
                    </div>
                  </div>
                ))}
                
                <div className="flex justify-between items-center mt-4">
                  <Button 
                    type="button" 
                    onClick={addDevice}
                    variant="outline"
                    className="border-slate-600 text-white hover:bg-slate-700"
                    data-testid="button-add-device"
                  >
                    Add Another Device
                  </Button>
                  <div className="text-white">
                    <span className="text-lg font-semibold">Total Estimate: AED {totalEstimate.toLocaleString()}</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Submit Quote Request */}
            <Card className="bg-slate-800/50 border-slate-700">
              <CardContent className="pt-6">
                <Button 
                  onClick={handleBulkSubmit}
                  disabled={submitBulkInquiry.isPending}
                  className="w-full bg-gradient-to-r from-green-600 to-blue-500 hover:from-green-700 hover:to-blue-600"
                  data-testid="button-submit-bulk"
                >
                  {submitBulkInquiry.isPending ? "Submitting..." : "Request Bulk Quote"}
                </Button>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}