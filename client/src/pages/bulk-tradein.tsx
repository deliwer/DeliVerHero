import { useState } from "react";
import { Upload, FileText, Calculator, Building2, Users, Clock, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export function BulkTradeInPage() {
  const [devices, setDevices] = useState([{ model: "", condition: "", quantity: 1, estimatedValue: 0 }]);
  const [companyInfo, setCompanyInfo] = useState({
    name: "",
    email: "",
    phone: "",
    department: "",
    employeeCount: ""
  });

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
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-white mb-4">
            ChainTrack Corporate Bulk Trade-in
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Streamline your corporate device refresh cycles with bulk trade-in solutions. 
            Get instant quotes for volume device exchanges.
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid md:grid-cols-3 gap-6 mb-12">
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
                  <p className="text-2xl font-bold text-white">24h</p>
                  <p className="text-gray-400">Quote Turnaround</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Bulk Device Input */}
          <Card className="bg-slate-800/50 border-slate-700">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Calculator className="w-6 h-6" />
                Device Inventory
              </CardTitle>
              <CardDescription>
                Add your devices for bulk trade-in evaluation
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {devices.map((device, index) => (
                <div key={index} className="bg-slate-700/30 p-4 rounded-lg space-y-4">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <Label className="text-gray-300">Device Model</Label>
                      <Select onValueChange={(value) => updateDevice(index, 'model', value)}>
                        <SelectTrigger className="bg-slate-700 border-slate-600">
                          <SelectValue placeholder="Select device model" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="iphone-15-pro">iPhone 15 Pro</SelectItem>
                          <SelectItem value="iphone-15">iPhone 15</SelectItem>
                          <SelectItem value="iphone-14-pro">iPhone 14 Pro</SelectItem>
                          <SelectItem value="iphone-14">iPhone 14</SelectItem>
                          <SelectItem value="iphone-13">iPhone 13</SelectItem>
                          <SelectItem value="macbook-pro-16">MacBook Pro 16"</SelectItem>
                          <SelectItem value="macbook-air">MacBook Air</SelectItem>
                          <SelectItem value="ipad-pro">iPad Pro</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div>
                      <Label className="text-gray-300">Condition</Label>
                      <Select onValueChange={(value) => updateDevice(index, 'condition', value)}>
                        <SelectTrigger className="bg-slate-700 border-slate-600">
                          <SelectValue placeholder="Device condition" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="excellent">Excellent</SelectItem>
                          <SelectItem value="good">Good</SelectItem>
                          <SelectItem value="fair">Fair</SelectItem>
                          <SelectItem value="poor">Poor</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <Label className="text-gray-300">Quantity</Label>
                      <Input
                        type="number"
                        min="1"
                        value={device.quantity}
                        onChange={(e) => updateDevice(index, 'quantity', parseInt(e.target.value) || 1)}
                        className="bg-slate-700 border-slate-600"
                      />
                    </div>
                    
                    <div>
                      <Label className="text-gray-300">Est. Value per Unit (AED)</Label>
                      <Input
                        type="number"
                        value={device.estimatedValue}
                        onChange={(e) => updateDevice(index, 'estimatedValue', parseFloat(e.target.value) || 0)}
                        className="bg-slate-700 border-slate-600"
                        placeholder="Auto-calculated"
                        readOnly
                      />
                    </div>
                  </div>
                </div>
              ))}
              
              <Button onClick={addDevice} variant="outline" className="w-full">
                Add Another Device
              </Button>
              
              <div className="bg-blue-600/20 border border-blue-500/30 rounded-lg p-4">
                <div className="flex justify-between items-center">
                  <span className="text-blue-300 font-medium">Total Estimated Value:</span>
                  <span className="text-2xl font-bold text-blue-200">AED {totalEstimate.toLocaleString()}</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Company Information */}
          <Card className="bg-slate-800/50 border-slate-700">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Building2 className="w-6 h-6" />
                Company Information
              </CardTitle>
              <CardDescription>
                Provide your company details for personalized bulk pricing
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label className="text-gray-300">Company Name</Label>
                <Input
                  value={companyInfo.name}
                  onChange={(e) => setCompanyInfo({ ...companyInfo, name: e.target.value })}
                  className="bg-slate-700 border-slate-600"
                  placeholder="Your company name"
                />
              </div>
              
              <div>
                <Label className="text-gray-300">Business Email</Label>
                <Input
                  type="email"
                  value={companyInfo.email}
                  onChange={(e) => setCompanyInfo({ ...companyInfo, email: e.target.value })}
                  className="bg-slate-700 border-slate-600"
                  placeholder="procurement@company.com"
                />
              </div>
              
              <div>
                <Label className="text-gray-300">Phone Number</Label>
                <Input
                  value={companyInfo.phone}
                  onChange={(e) => setCompanyInfo({ ...companyInfo, phone: e.target.value })}
                  className="bg-slate-700 border-slate-600"
                  placeholder="+971 XX XXX XXXX"
                />
              </div>
              
              <div>
                <Label className="text-gray-300">Department</Label>
                <Select onValueChange={(value) => setCompanyInfo({ ...companyInfo, department: value })}>
                  <SelectTrigger className="bg-slate-700 border-slate-600">
                    <SelectValue placeholder="Select department" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="procurement">Procurement</SelectItem>
                    <SelectItem value="it">IT Department</SelectItem>
                    <SelectItem value="finance">Finance</SelectItem>
                    <SelectItem value="operations">Operations</SelectItem>
                    <SelectItem value="facilities">Facilities</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <Label className="text-gray-300">Company Size</Label>
                <Select onValueChange={(value) => setCompanyInfo({ ...companyInfo, employeeCount: value })}>
                  <SelectTrigger className="bg-slate-700 border-slate-600">
                    <SelectValue placeholder="Number of employees" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1-50">1-50 employees</SelectItem>
                    <SelectItem value="51-200">51-200 employees</SelectItem>
                    <SelectItem value="201-500">201-500 employees</SelectItem>
                    <SelectItem value="501-1000">501-1000 employees</SelectItem>
                    <SelectItem value="1000+">1000+ employees</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* File Upload for Bulk CSV */}
              <div className="bg-slate-700/30 p-4 rounded-lg border-2 border-dashed border-slate-600">
                <div className="text-center">
                  <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                  <p className="text-gray-300 mb-2">Upload Device Inventory CSV</p>
                  <p className="text-sm text-gray-500">For large inventories (500+ devices)</p>
                  <Button variant="outline" className="mt-2">
                    <FileText className="w-4 h-4 mr-2" />
                    Choose File
                  </Button>
                </div>
              </div>
              
              <Button className="w-full bg-blue-600 hover:bg-blue-700" size="lg">
                <CheckCircle className="w-5 h-5 mr-2" />
                Submit Bulk Quote Request
              </Button>
              
              <p className="text-sm text-gray-400 text-center">
                You'll receive a detailed quote within 24 hours including pickup logistics and payment terms.
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Benefits Section */}
        <div className="mt-12">
          <h2 className="text-2xl font-bold text-white text-center mb-8">
            Why Choose ChainTrack for Corporate Trade-ins?
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            <Card className="bg-slate-800/50 border-slate-700">
              <CardContent className="pt-6 text-center">
                <CheckCircle className="w-12 h-12 text-green-400 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-white mb-2">Competitive Rates</h3>
                <p className="text-gray-400">Up to 15% higher trade-in values for bulk transactions</p>
              </CardContent>
            </Card>
            
            <Card className="bg-slate-800/50 border-slate-700">
              <CardContent className="pt-6 text-center">
                <Clock className="w-12 h-12 text-blue-400 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-white mb-2">Fast Processing</h3>
                <p className="text-gray-400">24-hour quote turnaround, 48-hour payment processing</p>
              </CardContent>
            </Card>
            
            <Card className="bg-slate-800/50 border-slate-700">
              <CardContent className="pt-6 text-center">
                <Building2 className="w-12 h-12 text-purple-400 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-white mb-2">Enterprise Support</h3>
                <p className="text-gray-400">Dedicated account managers and white-glove service</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}