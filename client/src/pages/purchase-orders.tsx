import { useState } from "react";
import { 
  Package, 
  FileText, 
  Download, 
  Eye, 
  Truck, 
  CreditCard, 
  Calendar,
  CheckCircle2,
  Clock,
  AlertTriangle,
  Building2
} from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export function PurchaseOrdersPage() {
  const [filterStatus, setFilterStatus] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");

  const purchaseOrders = [
    {
      id: "PO-2025-001",
      quoteId: "QT-2025-002",
      companyName: "Emirates Financial Services",
      contactPerson: "Ahmad Al-Maktoum",
      deviceCount: 125,
      totalAmount: 89000,
      status: "processing",
      createdDate: "2025-01-18",
      pickupDate: "2025-01-25",
      completionDate: null,
      paymentTerms: "NET 15",
      paymentStatus: "pending",
      deviceTypes: [
        { type: "iPhone 14", quantity: 100, unitPrice: 650 },
        { type: "iPad Pro", quantity: 25, unitPrice: 1560 }
      ],
      documents: [
        { name: "Purchase Order.pdf", type: "po", size: "245 KB" },
        { name: "Device Inventory.xlsx", type: "inventory", size: "89 KB" }
      ],
      logistics: {
        pickupAddress: "Emirates Financial Services, DIFC, Dubai",
        pickupContact: "+971 4 XXX XXXX",
        estimatedDuration: "2-3 hours",
        specialInstructions: "Security clearance required. Contact reception 30 mins before arrival."
      }
    },
    {
      id: "PO-2025-002",
      quoteId: "QT-2024-456",
      companyName: "Al Habtoor Group",
      contactPerson: "Sarah Johnson",
      deviceCount: 200,
      totalAmount: 156000,
      status: "completed",
      createdDate: "2025-01-05",
      pickupDate: "2025-01-10",
      completionDate: "2025-01-12",
      paymentTerms: "NET 30",
      paymentStatus: "paid",
      deviceTypes: [
        { type: "iPhone 15 Pro", quantity: 150, unitPrice: 900 },
        { type: "MacBook Pro 16\"", quantity: 50, unitPrice: 1200 }
      ],
      documents: [
        { name: "Purchase Order.pdf", type: "po", size: "267 KB" },
        { name: "Completion Certificate.pdf", type: "certificate", size: "156 KB" },
        { name: "Payment Receipt.pdf", type: "receipt", size: "78 KB" }
      ],
      logistics: {
        pickupAddress: "Al Habtoor Business Tower, Dubai Marina",
        pickupContact: "+971 4 YYY YYYY",
        estimatedDuration: "4-5 hours",
        specialInstructions: "Bulk pickup requires freight elevator booking."
      }
    },
    {
      id: "PO-2025-003",
      quoteId: "QT-2025-001",
      companyName: "Tech Solutions DMCC",
      contactPerson: "Mohamed Hassan",
      deviceCount: 50,
      totalAmount: 45000,
      status: "pending_approval",
      createdDate: "2025-01-20",
      pickupDate: "2025-01-28",
      completionDate: null,
      paymentTerms: "NET 7",
      paymentStatus: "pending",
      deviceTypes: [
        { type: "iPhone 15 Pro", quantity: 30, unitPrice: 900 },
        { type: "MacBook Pro 14\"", quantity: 20, unitPrice: 1350 }
      ],
      documents: [
        { name: "Quote Approval.pdf", type: "quote", size: "189 KB" }
      ],
      logistics: {
        pickupAddress: "DMCC Business Centre, JLT, Dubai",
        pickupContact: "+971 4 ZZZ ZZZZ",
        estimatedDuration: "1-2 hours",
        specialInstructions: "Office hours pickup preferred (9 AM - 5 PM)."
      }
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "pending_approval": return "bg-yellow-600/20 text-yellow-300 border-yellow-500/30";
      case "processing": return "bg-blue-600/20 text-blue-300 border-blue-500/30";
      case "completed": return "bg-green-600/20 text-green-300 border-green-500/30";
      case "cancelled": return "bg-red-600/20 text-red-300 border-red-500/30";
      default: return "bg-gray-600/20 text-gray-300 border-gray-500/30";
    }
  };

  const getPaymentStatusColor = (status: string) => {
    switch (status) {
      case "pending": return "bg-yellow-600/20 text-yellow-300 border-yellow-500/30";
      case "paid": return "bg-green-600/20 text-green-300 border-green-500/30";
      case "overdue": return "bg-red-600/20 text-red-300 border-red-500/30";
      default: return "bg-gray-600/20 text-gray-300 border-gray-500/30";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "pending_approval": return <Clock className="w-4 h-4" />;
      case "processing": return <Package className="w-4 h-4" />;
      case "completed": return <CheckCircle2 className="w-4 h-4" />;
      case "cancelled": return <AlertTriangle className="w-4 h-4" />;
      default: return <FileText className="w-4 h-4" />;
    }
  };

  const filteredOrders = purchaseOrders.filter(order => {
    const matchesStatus = filterStatus === "all" || order.status === filterStatus;
    const matchesSearch = order.companyName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         order.id.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-white mb-2">
              Purchase Orders Management
            </h1>
            <p className="text-gray-300">
              Track and manage your corporate bulk trade-in purchase orders
            </p>
          </div>
          <Button className="bg-blue-600 hover:bg-blue-700">
            <Package className="w-4 h-4 mr-2" />
            Create New PO
          </Button>
        </div>

        {/* Filters and Search */}
        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <div className="flex-1">
            <Input
              placeholder="Search by company name or PO number..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="bg-slate-800/50 border-slate-700"
            />
          </div>
          <Select value={filterStatus} onValueChange={setFilterStatus}>
            <SelectTrigger className="bg-slate-800/50 border-slate-700 w-full md:w-48">
              <SelectValue placeholder="Filter by status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="pending_approval">Pending Approval</SelectItem>
              <SelectItem value="processing">Processing</SelectItem>
              <SelectItem value="completed">Completed</SelectItem>
              <SelectItem value="cancelled">Cancelled</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Purchase Orders List */}
        <div className="space-y-6">
          {filteredOrders.map((order) => (
            <Card key={order.id} className="bg-slate-800/50 border-slate-700">
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="text-white flex items-center gap-3">
                      {getStatusIcon(order.status)}
                      {order.id}
                      <Badge className={getStatusColor(order.status)}>
                        {order.status.replace('_', ' ')}
                      </Badge>
                    </CardTitle>
                    <CardDescription className="mt-2">
                      <div className="flex items-center gap-4 text-sm">
                        <span className="flex items-center gap-1">
                          <Building2 className="w-4 h-4" />
                          {order.companyName}
                        </span>
                        <span>•</span>
                        <span>{order.deviceCount} devices</span>
                        <span>•</span>
                        <span>AED {order.totalAmount.toLocaleString()}</span>
                      </div>
                    </CardDescription>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge className={getPaymentStatusColor(order.paymentStatus)}>
                      {order.paymentStatus}
                    </Badge>
                  </div>
                </div>
              </CardHeader>
              
              <CardContent>
                <Tabs defaultValue="overview" className="w-full">
                  <TabsList className="grid w-full grid-cols-4 bg-slate-700/50">
                    <TabsTrigger value="overview">Overview</TabsTrigger>
                    <TabsTrigger value="devices">Devices</TabsTrigger>
                    <TabsTrigger value="logistics">Logistics</TabsTrigger>
                    <TabsTrigger value="documents">Documents</TabsTrigger>
                  </TabsList>
                  
                  <TabsContent value="overview" className="mt-4">
                    <div className="grid md:grid-cols-3 gap-6">
                      <div className="space-y-4">
                        <div>
                          <h4 className="text-sm font-medium text-gray-400 mb-2">Contact Information</h4>
                          <p className="text-white">{order.contactPerson}</p>
                          <p className="text-gray-400 text-sm">Quote: {order.quoteId}</p>
                        </div>
                        
                        <div>
                          <h4 className="text-sm font-medium text-gray-400 mb-2">Payment Terms</h4>
                          <p className="text-white">{order.paymentTerms}</p>
                          <p className="text-gray-400 text-sm">
                            Status: <span className="capitalize">{order.paymentStatus}</span>
                          </p>
                        </div>
                      </div>
                      
                      <div className="space-y-4">
                        <div>
                          <h4 className="text-sm font-medium text-gray-400 mb-2">Timeline</h4>
                          <div className="space-y-2 text-sm">
                            <div className="flex justify-between">
                              <span className="text-gray-400">Created:</span>
                              <span className="text-white">{order.createdDate}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-gray-400">Pickup:</span>
                              <span className="text-white">{order.pickupDate}</span>
                            </div>
                            {order.completionDate && (
                              <div className="flex justify-between">
                                <span className="text-gray-400">Completed:</span>
                                <span className="text-white">{order.completionDate}</span>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                      
                      <div className="space-y-4">
                        <div>
                          <h4 className="text-sm font-medium text-gray-400 mb-2">Total Value</h4>
                          <p className="text-2xl font-bold text-white">
                            AED {order.totalAmount.toLocaleString()}
                          </p>
                          <p className="text-gray-400 text-sm">
                            {order.deviceCount} devices total
                          </p>
                        </div>
                      </div>
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="devices" className="mt-4">
                    <div className="space-y-4">
                      <h4 className="text-lg font-medium text-white">Device Breakdown</h4>
                      {order.deviceTypes.map((device, index) => (
                        <div key={index} className="bg-slate-700/30 p-4 rounded-lg">
                          <div className="flex justify-between items-center">
                            <div>
                              <h5 className="text-white font-medium">{device.type}</h5>
                              <p className="text-gray-400 text-sm">Quantity: {device.quantity}</p>
                            </div>
                            <div className="text-right">
                              <p className="text-white">AED {device.unitPrice}/unit</p>
                              <p className="text-gray-400 text-sm">
                                Total: AED {(device.quantity * device.unitPrice).toLocaleString()}
                              </p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="logistics" className="mt-4">
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <h4 className="text-lg font-medium text-white mb-4">Pickup Details</h4>
                        <div className="space-y-3">
                          <div>
                            <p className="text-gray-400 text-sm">Address</p>
                            <p className="text-white">{order.logistics.pickupAddress}</p>
                          </div>
                          <div>
                            <p className="text-gray-400 text-sm">Contact</p>
                            <p className="text-white">{order.logistics.pickupContact}</p>
                          </div>
                          <div>
                            <p className="text-gray-400 text-sm">Estimated Duration</p>
                            <p className="text-white">{order.logistics.estimatedDuration}</p>
                          </div>
                        </div>
                      </div>
                      
                      <div>
                        <h4 className="text-lg font-medium text-white mb-4">Special Instructions</h4>
                        <div className="bg-slate-700/30 p-4 rounded-lg">
                          <p className="text-gray-300">{order.logistics.specialInstructions}</p>
                        </div>
                        
                        <div className="mt-4 space-y-2">
                          <Button variant="outline" className="w-full">
                            <Truck className="w-4 h-4 mr-2" />
                            Track Pickup
                          </Button>
                          <Button variant="outline" className="w-full">
                            <Calendar className="w-4 h-4 mr-2" />
                            Reschedule Pickup
                          </Button>
                        </div>
                      </div>
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="documents" className="mt-4">
                    <div className="space-y-4">
                      <h4 className="text-lg font-medium text-white">Available Documents</h4>
                      {order.documents.map((doc, index) => (
                        <div key={index} className="flex items-center justify-between bg-slate-700/30 p-4 rounded-lg">
                          <div className="flex items-center gap-3">
                            <FileText className="w-5 h-5 text-blue-400" />
                            <div>
                              <p className="text-white font-medium">{doc.name}</p>
                              <p className="text-gray-400 text-sm">{doc.size}</p>
                            </div>
                          </div>
                          <Button variant="outline" size="sm">
                            <Download className="w-4 h-4 mr-2" />
                            Download
                          </Button>
                        </div>
                      ))}
                    </div>
                  </TabsContent>
                </Tabs>
                
                <div className="flex justify-end space-x-2 mt-6 pt-4 border-t border-slate-700">
                  <Button variant="outline">
                    <Eye className="w-4 h-4 mr-2" />
                    View Full Details
                  </Button>
                  {order.status === "pending_approval" && (
                    <Button className="bg-green-600 hover:bg-green-700">
                      <CheckCircle2 className="w-4 h-4 mr-2" />
                      Approve PO
                    </Button>
                  )}
                  {order.paymentStatus === "pending" && order.status === "completed" && (
                    <Button className="bg-blue-600 hover:bg-blue-700">
                      <CreditCard className="w-4 h-4 mr-2" />
                      Process Payment
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredOrders.length === 0 && (
          <Card className="bg-slate-800/50 border-slate-700">
            <CardContent className="pt-8 pb-8 text-center">
              <Package className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-white mb-2">No Purchase Orders Found</h3>
              <p className="text-gray-400 mb-4">
                {searchTerm || filterStatus !== "all" 
                  ? "No purchase orders match your current filters." 
                  : "You haven't created any purchase orders yet."}
              </p>
              <Button className="bg-blue-600 hover:bg-blue-700">
                Create Your First PO
              </Button>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}