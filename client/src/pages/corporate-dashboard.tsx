import { useState } from "react";
import { 
  TrendingUp, 
  Package, 
  DollarSign, 
  Clock, 
  Building2, 
  Users, 
  FileText, 
  Download,
  AlertCircle,
  CheckCircle2,
  Eye
} from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export function CorporateDashboardPage() {
  const [selectedPeriod, setSelectedPeriod] = useState("month");

  const stats = {
    totalTradeValue: 125400,
    devicesTraded: 245,
    activePurchaseOrders: 3,
    pendingQuotes: 7
  };

  const recentQuotes = [
    {
      id: "QT-2025-001",
      company: "Tech Solutions DMCC",
      deviceCount: 50,
      estimatedValue: 45000,
      status: "pending",
      createdAt: "2025-01-20",
      devices: "iPhone 15 Pro x30, MacBook Pro x20"
    },
    {
      id: "QT-2025-002", 
      company: "Emirates Financial Services",
      deviceCount: 125,
      estimatedValue: 89000,
      status: "approved",
      createdAt: "2025-01-18",
      devices: "iPhone 14 x100, iPad Pro x25"
    },
    {
      id: "QT-2025-003",
      company: "Dubai Logistics Hub",
      deviceCount: 75,
      estimatedValue: 32000,
      status: "under_review",
      createdAt: "2025-01-15",
      devices: "iPhone 13 x50, MacBook Air x25"
    }
  ];

  const purchaseOrders = [
    {
      id: "PO-2025-001",
      quote: "QT-2025-002",
      company: "Emirates Financial Services", 
      amount: 89000,
      status: "processing",
      pickupDate: "2025-01-25",
      paymentTerms: "NET 15"
    },
    {
      id: "PO-2025-002",
      quote: "QT-2024-456",
      company: "Al Habtoor Group",
      amount: 156000,
      status: "completed",
      pickupDate: "2025-01-10",
      paymentTerms: "NET 30"
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "pending": return "bg-yellow-600/20 text-yellow-300 border-yellow-500/30";
      case "approved": return "bg-green-600/20 text-green-300 border-green-500/30";
      case "under_review": return "bg-blue-600/20 text-blue-300 border-blue-500/30";
      case "processing": return "bg-purple-600/20 text-purple-300 border-purple-500/30";
      case "completed": return "bg-green-600/20 text-green-300 border-green-500/30";
      default: return "bg-gray-600/20 text-gray-300 border-gray-500/30";
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-white mb-2">
              ChainTrack Corporate Dashboard
            </h1>
            <p className="text-gray-300">
              Manage your bulk trade-ins and purchase orders
            </p>
          </div>
          <div className="flex items-center space-x-4">
            <Button variant="outline" className="border-slate-600">
              <Download className="w-4 h-4 mr-2" />
              Export Report
            </Button>
            <Button className="bg-blue-600 hover:bg-blue-700">
              <Package className="w-4 h-4 mr-2" />
              New Quote Request
            </Button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          <Card className="bg-slate-800/50 border-slate-700">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-400">Total Trade Value</p>
                  <p className="text-2xl font-bold text-white">
                    AED {stats.totalTradeValue.toLocaleString()}
                  </p>
                </div>
                <DollarSign className="w-8 h-8 text-green-400" />
              </div>
              <p className="text-sm text-green-400 mt-2">+12% from last month</p>
            </CardContent>
          </Card>

          <Card className="bg-slate-800/50 border-slate-700">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-400">Devices Traded</p>
                  <p className="text-2xl font-bold text-white">{stats.devicesTraded}</p>
                </div>
                <Package className="w-8 h-8 text-blue-400" />
              </div>
              <p className="text-sm text-blue-400 mt-2">+8% from last month</p>
            </CardContent>
          </Card>

          <Card className="bg-slate-800/50 border-slate-700">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-400">Active POs</p>
                  <p className="text-2xl font-bold text-white">{stats.activePurchaseOrders}</p>
                </div>
                <FileText className="w-8 h-8 text-purple-400" />
              </div>
              <p className="text-sm text-purple-400 mt-2">2 processing</p>
            </CardContent>
          </Card>

          <Card className="bg-slate-800/50 border-slate-700">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-400">Pending Quotes</p>
                  <p className="text-2xl font-bold text-white">{stats.pendingQuotes}</p>
                </div>
                <Clock className="w-8 h-8 text-yellow-400" />
              </div>
              <p className="text-sm text-yellow-400 mt-2">Average 18h response</p>
            </CardContent>
          </Card>
        </div>

        {/* Main Content Tabs */}
        <Tabs defaultValue="quotes" className="space-y-6">
          <TabsList className="bg-slate-800/50 border-slate-700">
            <TabsTrigger value="quotes" className="data-[state=active]:bg-blue-600">
              Quote Requests
            </TabsTrigger>
            <TabsTrigger value="orders" className="data-[state=active]:bg-blue-600">
              Purchase Orders
            </TabsTrigger>
            <TabsTrigger value="analytics" className="data-[state=active]:bg-blue-600">
              Analytics
            </TabsTrigger>
          </TabsList>

          {/* Quotes Tab */}
          <TabsContent value="quotes" className="space-y-4">
            <Card className="bg-slate-800/50 border-slate-700">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <FileText className="w-5 h-5" />
                  Recent Quote Requests
                </CardTitle>
                <CardDescription>
                  Track your bulk trade-in quote requests and their status
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentQuotes.map((quote) => (
                    <div key={quote.id} className="bg-slate-700/30 p-4 rounded-lg">
                      <div className="flex justify-between items-start mb-3">
                        <div>
                          <h3 className="text-white font-medium">{quote.id}</h3>
                          <p className="text-gray-400 text-sm">{quote.company}</p>
                        </div>
                        <Badge className={getStatusColor(quote.status)}>
                          {quote.status.replace('_', ' ')}
                        </Badge>
                      </div>
                      
                      <div className="grid md:grid-cols-3 gap-4 text-sm">
                        <div>
                          <p className="text-gray-400">Devices</p>
                          <p className="text-white">{quote.deviceCount} units</p>
                          <p className="text-gray-500 text-xs">{quote.devices}</p>
                        </div>
                        <div>
                          <p className="text-gray-400">Estimated Value</p>
                          <p className="text-white">AED {quote.estimatedValue.toLocaleString()}</p>
                        </div>
                        <div>
                          <p className="text-gray-400">Created</p>
                          <p className="text-white">{quote.createdAt}</p>
                        </div>
                      </div>
                      
                      <div className="flex justify-end space-x-2 mt-4">
                        <Button variant="outline" size="sm">
                          <Eye className="w-4 h-4 mr-2" />
                          View Details
                        </Button>
                        {quote.status === "approved" && (
                          <Button size="sm" className="bg-green-600 hover:bg-green-700">
                            <CheckCircle2 className="w-4 h-4 mr-2" />
                            Accept Quote
                          </Button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Purchase Orders Tab */}
          <TabsContent value="orders" className="space-y-4">
            <Card className="bg-slate-800/50 border-slate-700">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <Package className="w-5 h-5" />
                  Purchase Orders
                </CardTitle>
                <CardDescription>
                  Track your active and completed purchase orders
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {purchaseOrders.map((order) => (
                    <div key={order.id} className="bg-slate-700/30 p-4 rounded-lg">
                      <div className="flex justify-between items-start mb-3">
                        <div>
                          <h3 className="text-white font-medium">{order.id}</h3>
                          <p className="text-gray-400 text-sm">Quote: {order.quote}</p>
                        </div>
                        <Badge className={getStatusColor(order.status)}>
                          {order.status}
                        </Badge>
                      </div>
                      
                      <div className="grid md:grid-cols-4 gap-4 text-sm">
                        <div>
                          <p className="text-gray-400">Company</p>
                          <p className="text-white">{order.company}</p>
                        </div>
                        <div>
                          <p className="text-gray-400">Amount</p>
                          <p className="text-white">AED {order.amount.toLocaleString()}</p>
                        </div>
                        <div>
                          <p className="text-gray-400">Pickup Date</p>
                          <p className="text-white">{order.pickupDate}</p>
                        </div>
                        <div>
                          <p className="text-gray-400">Payment Terms</p>
                          <p className="text-white">{order.paymentTerms}</p>
                        </div>
                      </div>
                      
                      <div className="flex justify-end space-x-2 mt-4">
                        <Button variant="outline" size="sm">
                          <FileText className="w-4 h-4 mr-2" />
                          Download PO
                        </Button>
                        {order.status === "processing" && (
                          <Button size="sm" variant="outline">
                            <AlertCircle className="w-4 h-4 mr-2" />
                            Track Progress
                          </Button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Analytics Tab */}
          <TabsContent value="analytics" className="space-y-4">
            <div className="grid lg:grid-cols-2 gap-6">
              <Card className="bg-slate-800/50 border-slate-700">
                <CardHeader>
                  <CardTitle className="text-white flex items-center gap-2">
                    <TrendingUp className="w-5 h-5" />
                    Trade Volume Trends
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-64 flex items-center justify-center text-gray-400">
                    Trade volume chart placeholder
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-slate-800/50 border-slate-700">
                <CardHeader>
                  <CardTitle className="text-white flex items-center gap-2">
                    <Building2 className="w-5 h-5" />
                    Device Categories
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-300">iPhones</span>
                      <span className="text-white">65%</span>
                    </div>
                    <div className="w-full bg-slate-700 rounded-full h-2">
                      <div className="bg-blue-600 h-2 rounded-full" style={{width: '65%'}}></div>
                    </div>
                    
                    <div className="flex justify-between items-center">
                      <span className="text-gray-300">MacBooks</span>
                      <span className="text-white">25%</span>
                    </div>
                    <div className="w-full bg-slate-700 rounded-full h-2">
                      <div className="bg-green-600 h-2 rounded-full" style={{width: '25%'}}></div>
                    </div>
                    
                    <div className="flex justify-between items-center">
                      <span className="text-gray-300">iPads</span>
                      <span className="text-white">10%</span>
                    </div>
                    <div className="w-full bg-slate-700 rounded-full h-2">
                      <div className="bg-purple-600 h-2 rounded-full" style={{width: '10%'}}></div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}