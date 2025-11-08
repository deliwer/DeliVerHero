import { useState } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import {
  Package,
  Globe,
  Filter,
  ShoppingCart,
  Gavel,
  TrendingDown,
  CheckCircle,
  Star,
  Sparkles,
  Clock,
  MapPin,
  Search,
} from "lucide-react";
import { IPHONE_CATALOG, getLatestModels } from "@shared/iphone-catalog";
import iPhone17ProMaxBlue from "@assets/generated_images/iPhone_17_Pro_Max_Blue_5527e769.png";
import iPhone17Pro from "@assets/generated_images/iPhone_17_Pro_Natural_102f756e.png";
import iPhone17Plus from "@assets/generated_images/iPhone_17_Plus_Black_07e48dac.png";
import iPhone17 from "@assets/generated_images/iPhone_17_White_c97e6eb6.png";
import { queryClient, apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";

export default function BulkPurchasingPage() {
  const [selectedModel, setSelectedModel] = useState<string>("all");
  const [selectedCondition, setSelectedCondition] = useState<string>("all");
  const [selectedRegion, setSelectedRegion] = useState<string>("all");
  const [showQuoteDialog, setShowQuoteDialog] = useState(false);
  const { toast } = useToast();

  const iphone17Models = getLatestModels();

  const mockInventory = [
    {
      id: "1",
      model: "iPhone 17 Pro Max",
      storage: "256GB",
      color: "Blue Titanium",
      condition: "New",
      quantity: 150,
      pricePerUnit: 485,
      region: "USA",
      grade: "A+",
      image: iPhone17ProMaxBlue,
    },
    {
      id: "2",
      model: "iPhone 17 Pro",
      storage: "256GB",
      color: "Natural Titanium",
      condition: "New",
      quantity: 200,
      pricePerUnit: 425,
      region: "UAE",
      grade: "A+",
      image: iPhone17Pro,
    },
    {
      id: "3",
      model: "iPhone 17 Plus",
      storage: "128GB",
      color: "Black",
      condition: "Like New",
      quantity: 100,
      pricePerUnit: 365,
      region: "Japan",
      grade: "A",
      image: iPhone17Plus,
    },
    {
      id: "4",
      model: "iPhone 17",
      storage: "128GB",
      color: "White",
      condition: "New",
      quantity: 180,
      pricePerUnit: 345,
      region: "China",
      grade: "A+",
      image: iPhone17,
    },
    {
      id: "5",
      model: "iPhone 16 Pro Max",
      storage: "512GB",
      color: "Black Titanium",
      condition: "Like New",
      quantity: 80,
      pricePerUnit: 450,
      region: "USA",
      grade: "A",
    },
    {
      id: "6",
      model: "iPhone 15 Pro Max",
      storage: "256GB",
      color: "Natural Titanium",
      condition: "Refurbished",
      quantity: 120,
      pricePerUnit: 380,
      region: "Europe",
      grade: "B+",
    },
  ];

  const filteredInventory = mockInventory.filter((item) => {
    if (selectedModel !== "all" && !item.model.includes(selectedModel)) return false;
    if (selectedCondition !== "all" && item.condition !== selectedCondition) return false;
    if (selectedRegion !== "all" && item.region !== selectedRegion) return false;
    return true;
  });

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted">
      {/* Hero Section */}
      <section className="relative py-16 px-4 overflow-hidden border-b">
        <div className="absolute inset-0 bg-gradient-to-r from-primary/10 to-accent/10"></div>
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-center space-y-6">
            <Badge className="mb-4" variant="outline" data-testid="badge-bulk-purchasing">
              <Package className="w-3 h-3 mr-1" />
              B2B Wholesale Procurement
            </Badge>
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight" data-testid="text-hero-title">
              Bulk iPhone Purchasing
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto" data-testid="text-hero-subtitle">
              Browse ready-to-ship inventory or submit auction requests. Access verified global supply with anonymous supplier listings.
            </p>
            <div className="flex flex-wrap gap-4 justify-center mt-8">
              <Link href="/chaintrack">
                <Button size="lg" variant="outline" data-testid="button-reverse-auction">
                  <Gavel className="w-5 h-5 mr-2" />
                  Submit Reverse Auction
                </Button>
              </Link>
              <Link href="/signup">
                <Button size="lg" data-testid="button-become-buyer">
                  <CheckCircle className="w-5 h-5 mr-2" />
                  Become Verified Buyer
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* iPhone 17 Spotlight */}
      <section className="py-12 px-4 bg-gradient-to-r from-primary/5 to-accent/5">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-8">
            <Badge className="mb-4" data-testid="badge-iphone17-spotlight">
              <Sparkles className="w-3 h-3 mr-1" />
              iPhone 17 - GITEX 2025 Launch
            </Badge>
            <h2 className="text-3xl font-bold mb-2">Pre-Order iPhone 17 Inventory</h2>
            <p className="text-muted-foreground">Priority access for verified B2B buyers. Lock in pricing now.</p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { name: "iPhone 17 Pro Max", image: iPhone17ProMaxBlue, qty: "150+ units", price: "$485/unit" },
              { name: "iPhone 17 Pro", image: iPhone17Pro, qty: "200+ units", price: "$425/unit" },
              { name: "iPhone 17 Plus", image: iPhone17Plus, qty: "100+ units", price: "$365/unit" },
              { name: "iPhone 17", image: iPhone17, qty: "180+ units", price: "$345/unit" },
            ].map((model, idx) => (
              <Card key={idx} className="text-center hover:shadow-lg transition-shadow" data-testid={`card-iphone17-${model.name.toLowerCase().replace(/\s+/g, '-')}`}>
                <CardContent className="p-6">
                  <img src={model.image} alt={model.name} className="w-24 h-24 object-contain mx-auto mb-4" />
                  <h3 className="font-bold mb-1">{model.name}</h3>
                  <p className="text-sm text-muted-foreground mb-1">{model.qty} available</p>
                  <p className="text-primary font-bold">{model.price}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Main Content - Inventory Browser */}
      <section className="py-12 px-4">
        <div className="max-w-7xl mx-auto">
          <Tabs defaultValue="ready-to-ship" className="w-full">
            <TabsList className="grid w-full max-w-md mx-auto grid-cols-2 mb-8">
              <TabsTrigger value="ready-to-ship" data-testid="tab-ready-to-ship">
                <Package className="w-4 h-4 mr-2" />
                Ready to Ship
              </TabsTrigger>
              <TabsTrigger value="auction-request" data-testid="tab-auction-request">
                <Gavel className="w-4 h-4 mr-2" />
                Request Quote
              </TabsTrigger>
            </TabsList>

            <TabsContent value="ready-to-ship">
              {/* Filters */}
              <Card className="mb-8">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Filter className="w-5 h-5" />
                    Filter Inventory
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-4 gap-4">
                    <div>
                      <Label htmlFor="model-filter">Model</Label>
                      <Select value={selectedModel} onValueChange={setSelectedModel}>
                        <SelectTrigger id="model-filter" data-testid="select-model-filter">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">All Models</SelectItem>
                          <SelectItem value="iPhone 17">iPhone 17 Series</SelectItem>
                          <SelectItem value="iPhone 16">iPhone 16 Series</SelectItem>
                          <SelectItem value="iPhone 15">iPhone 15 Series</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label htmlFor="condition-filter">Condition</Label>
                      <Select value={selectedCondition} onValueChange={setSelectedCondition}>
                        <SelectTrigger id="condition-filter" data-testid="select-condition-filter">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">All Conditions</SelectItem>
                          <SelectItem value="New">New</SelectItem>
                          <SelectItem value="Like New">Like New</SelectItem>
                          <SelectItem value="Refurbished">Refurbished</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label htmlFor="region-filter">Source Region</Label>
                      <Select value={selectedRegion} onValueChange={setSelectedRegion}>
                        <SelectTrigger id="region-filter" data-testid="select-region-filter">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">All Regions</SelectItem>
                          <SelectItem value="USA">USA</SelectItem>
                          <SelectItem value="UAE">UAE</SelectItem>
                          <SelectItem value="Japan">Japan</SelectItem>
                          <SelectItem value="China">China</SelectItem>
                          <SelectItem value="Europe">Europe</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="flex items-end">
                      <Button
                        variant="outline"
                        className="w-full"
                        onClick={() => {
                          setSelectedModel("all");
                          setSelectedCondition("all");
                          setSelectedRegion("all");
                        }}
                        data-testid="button-clear-filters"
                      >
                        Clear Filters
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Inventory Grid */}
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredInventory.map((item) => (
                  <Card key={item.id} className="hover:shadow-lg transition-shadow" data-testid={`card-inventory-${item.id}`}>
                    <CardHeader>
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <CardTitle className="text-lg mb-1">{item.model}</CardTitle>
                          <CardDescription>
                            {item.storage} • {item.color}
                          </CardDescription>
                        </div>
                        {item.image && (
                          <img src={item.image} alt={item.model} className="w-16 h-16 object-contain" />
                        )}
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-muted-foreground">Condition</span>
                        <Badge variant="outline">{item.condition}</Badge>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-muted-foreground">Grade</span>
                        <div className="flex items-center gap-1">
                          <Star className="w-4 h-4 text-amber-500 fill-current" />
                          <span className="font-bold">{item.grade}</span>
                        </div>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-muted-foreground">Region</span>
                        <div className="flex items-center gap-1">
                          <MapPin className="w-4 h-4 text-primary" />
                          <span>{item.region}</span>
                        </div>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-muted-foreground">Available</span>
                        <Badge className="bg-green-500/10 text-green-700 dark:text-green-400">
                          {item.quantity} units
                        </Badge>
                      </div>
                      <div className="pt-4 border-t">
                        <div className="flex items-baseline justify-between mb-3">
                          <span className="text-sm text-muted-foreground">Price per unit</span>
                          <span className="text-2xl font-bold text-primary">${item.pricePerUnit}</span>
                        </div>
                        <div className="flex gap-2">
                          <Dialog open={showQuoteDialog} onOpenChange={setShowQuoteDialog}>
                            <DialogTrigger asChild>
                              <Button className="flex-1" data-testid={`button-request-quote-${item.id}`}>
                                Request Quote
                              </Button>
                            </DialogTrigger>
                            <DialogContent>
                              <DialogHeader>
                                <DialogTitle>Request Bulk Quote</DialogTitle>
                                <DialogDescription>
                                  Fill out the form below to get a custom quote for {item.model}
                                </DialogDescription>
                              </DialogHeader>
                              <div className="space-y-4 pt-4">
                                <div>
                                  <Label htmlFor="quote-quantity">Quantity</Label>
                                  <Input
                                    id="quote-quantity"
                                    type="number"
                                    placeholder="Minimum 50 units"
                                    min="50"
                                    data-testid="input-quote-quantity"
                                  />
                                </div>
                                <div>
                                  <Label htmlFor="quote-company">Company Name</Label>
                                  <Input id="quote-company" placeholder="Your company" data-testid="input-quote-company" />
                                </div>
                                <div>
                                  <Label htmlFor="quote-email">Email</Label>
                                  <Input
                                    id="quote-email"
                                    type="email"
                                    placeholder="your@email.com"
                                    data-testid="input-quote-email"
                                  />
                                </div>
                                <Button
                                  className="w-full"
                                  onClick={() => {
                                    toast({
                                      title: "Quote Requested",
                                      description: "We'll send you a detailed quote within 24 hours.",
                                    });
                                    setShowQuoteDialog(false);
                                  }}
                                  data-testid="button-submit-quote"
                                >
                                  Submit Request
                                </Button>
                              </div>
                            </DialogContent>
                          </Dialog>
                          <Link href="/chaintrack">
                            <Button variant="outline" data-testid={`button-view-details-${item.id}`}>
                              View Details
                            </Button>
                          </Link>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              {filteredInventory.length === 0 && (
                <Card className="p-12">
                  <div className="text-center text-muted-foreground">
                    <Search className="w-12 h-12 mx-auto mb-4 opacity-50" />
                    <p className="text-lg font-semibold mb-2">No inventory found</p>
                    <p>Try adjusting your filters or check back later for new stock.</p>
                  </div>
                </Card>
              )}
            </TabsContent>

            <TabsContent value="auction-request">
              <Card>
                <CardHeader>
                  <CardTitle>Submit Reverse Auction Request</CardTitle>
                  <CardDescription>
                    Request quotes for specific quantities and let suppliers compete to win your business.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="auction-model">iPhone Model *</Label>
                      <Select>
                        <SelectTrigger id="auction-model" data-testid="select-auction-model">
                          <SelectValue placeholder="Select model" />
                        </SelectTrigger>
                        <SelectContent>
                          {IPHONE_CATALOG.slice(0, 10).map((model) => (
                            <SelectItem key={model.id} value={model.id}>
                              {model.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label htmlFor="auction-storage">Storage</Label>
                      <Select>
                        <SelectTrigger id="auction-storage" data-testid="select-auction-storage">
                          <SelectValue placeholder="Select storage" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="128GB">128GB</SelectItem>
                          <SelectItem value="256GB">256GB</SelectItem>
                          <SelectItem value="512GB">512GB</SelectItem>
                          <SelectItem value="1TB">1TB</SelectItem>
                          <SelectItem value="2TB">2TB</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label htmlFor="auction-condition">Condition *</Label>
                      <Select>
                        <SelectTrigger id="auction-condition" data-testid="select-auction-condition">
                          <SelectValue placeholder="Select condition" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="new">New</SelectItem>
                          <SelectItem value="like-new">Like New</SelectItem>
                          <SelectItem value="refurbished">Refurbished</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label htmlFor="auction-quantity">Quantity *</Label>
                      <Input
                        id="auction-quantity"
                        type="number"
                        placeholder="Minimum 50"
                        min="50"
                        data-testid="input-auction-quantity"
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="auction-target-price">Target Price (per unit)</Label>
                    <Input
                      id="auction-target-price"
                      type="number"
                      placeholder="USD"
                      data-testid="input-auction-target-price"
                    />
                  </div>

                  <div>
                    <Label htmlFor="auction-delivery">Delivery Location</Label>
                    <Input
                      id="auction-delivery"
                      placeholder="City, Country"
                      data-testid="input-auction-delivery"
                    />
                  </div>

                  <div className="bg-muted/50 rounded-lg p-6">
                    <h4 className="font-semibold mb-3 flex items-center gap-2">
                      <TrendingDown className="w-5 h-5 text-primary" />
                      How Reverse Auctions Work
                    </h4>
                    <ol className="space-y-2 text-sm text-muted-foreground">
                      <li className="flex gap-2">
                        <span className="font-bold text-primary">1.</span>
                        <span>Submit your requirements and target pricing</span>
                      </li>
                      <li className="flex gap-2">
                        <span className="font-bold text-primary">2.</span>
                        <span>Verified suppliers compete to offer the best price</span>
                      </li>
                      <li className="flex gap-2">
                        <span className="font-bold text-primary">3.</span>
                        <span>Review bids and select the winning supplier</span>
                      </li>
                      <li className="flex gap-2">
                        <span className="font-bold text-primary">4.</span>
                        <span>Escrow payment ensures secure transaction</span>
                      </li>
                    </ol>
                  </div>

                  <div className="flex gap-4">
                    <Link href="/chaintrack" className="flex-1">
                      <Button className="w-full" size="lg" data-testid="button-submit-auction">
                        <Gavel className="w-5 h-5 mr-2" />
                        Submit Auction Request
                      </Button>
                    </Link>
                    <Button variant="outline" size="lg" data-testid="button-save-draft">
                      <Clock className="w-5 h-5 mr-2" />
                      Save Draft
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </section>

      {/* Features */}
      <section className="py-12 px-4 bg-muted/50">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">Why Buy in Bulk from Us?</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Globe className="w-5 h-5 text-primary" />
                  Anonymous Sourcing
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Suppliers remain anonymous until purchase. Browse by region, condition, and quantity without revealing your identity.
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-primary" />
                  Quality Verified
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Every device inspected and graded before listing. A+, A, B+ grades with detailed condition reports.
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingDown className="w-5 h-5 text-primary" />
                  Best Pricing
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Competitive pricing through reverse auctions. Volume discounts and membership tiers for frequent buyers.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </div>
  );
}
