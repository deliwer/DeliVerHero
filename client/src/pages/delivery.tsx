import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Truck, 
  MapPin, 
  Clock, 
  Phone, 
  Calendar, 
  Shield, 
  CheckCircle,
  Zap,
  Users,
  Package,
  Navigation,
  AlertCircle,
  Star,
  Headphones
} from 'lucide-react';

interface DeliveryZone {
  name: string;
  areas: string[];
  timeSlots: string[];
  fee: number;
  nextDay: boolean;
}

interface TrackingUpdate {
  status: string;
  time: string;
  location: string;
  icon: React.ReactNode;
  completed: boolean;
}

export default function Delivery() {
  const [selectedZone, setSelectedZone] = useState<string>("zone1");
  const [selectedTimeSlot, setSelectedTimeSlot] = useState<string>("");
  const [trackingNumber, setTrackingNumber] = useState<string>("");

  const deliveryZones: Record<string, DeliveryZone> = {
    zone1: {
      name: "Dubai City Center",
      areas: ["Downtown Dubai", "DIFC", "Business Bay", "Marina", "JBR"],
      timeSlots: ["9:00-11:00", "11:00-13:00", "14:00-16:00", "16:00-18:00", "18:00-20:00"],
      fee: 0,
      nextDay: true
    },
    zone2: {
      name: "Dubai Suburbs",
      areas: ["Jumeirah", "Umm Suqeim", "Al Barsha", "Motor City", "Sports City"],
      timeSlots: ["10:00-12:00", "14:00-16:00", "16:00-18:00"],
      fee: 25,
      nextDay: false
    },
    zone3: {
      name: "Extended Dubai",
      areas: ["Dubai Investment Park", "Dubailand", "Dubai South", "International City"],
      timeSlots: ["10:00-14:00", "14:00-18:00"],
      fee: 50,
      nextDay: false
    }
  };

  const sampleTracking: TrackingUpdate[] = [
    {
      status: "Order Confirmed",
      time: "Today, 2:30 PM",
      location: "DeliWer Processing Center",
      icon: <CheckCircle className="w-5 h-5 text-hero-green-500" />,
      completed: true
    },
    {
      status: "Quality Check & Packaging",
      time: "Today, 4:15 PM", 
      location: "Dubai Fulfillment Hub",
      icon: <Package className="w-5 h-5 text-hero-green-500" />,
      completed: true
    },
    {
      status: "Out for Delivery",
      time: "Tomorrow, 8:00 AM",
      location: "Local Delivery Hub",
      icon: <Truck className="w-5 h-5 text-amber-500" />,
      completed: false
    },
    {
      status: "Delivered",
      time: "Tomorrow, 10:30 AM (Est.)",
      location: "Your Location",
      icon: <CheckCircle className="w-5 h-5 text-gray-400" />,
      completed: false
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white">
      {/* Hero Section */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              <span className="bg-gradient-to-r from-hero-green-500 to-dubai-blue-500 bg-clip-text text-transparent">
                DeliWer
              </span>
              <br />
              <span className="text-3xl md:text-4xl">Express Delivery Network</span>
            </h1>
            <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto">
              From iPhone trade-in to AquaCafe delivery - Dubai's fastest sustainable logistics network
            </p>
            
            <div className="flex flex-wrap justify-center gap-4 mb-8">
              <Badge className="bg-hero-green-500/20 text-hero-green-500 border-hero-green-500/30 px-4 py-2">
                <Zap className="w-4 h-4 mr-2" />
                Same-Day Delivery
              </Badge>
              <Badge className="bg-dubai-blue-500/20 text-dubai-blue-500 border-dubai-blue-500/30 px-4 py-2">
                <Shield className="w-4 h-4 mr-2" />
                Eco-Friendly Fleet
              </Badge>
              <Badge className="bg-amber-500/20 text-amber-500 border-amber-500/30 px-4 py-2">
                <Users className="w-4 h-4 mr-2" />
                Community Drivers
              </Badge>
            </div>
          </div>

          {/* Delivery Zones Map */}
          <Card className="glass border-slate-600 mb-12">
            <CardContent className="p-8 bg-gradient-to-br from-slate-900/80 to-slate-800/90 backdrop-blur-sm">
              <h2 className="text-2xl font-bold text-white mb-6 text-center flex items-center justify-center">
                <MapPin className="w-6 h-6 text-hero-green-500 mr-2" />
                Dubai Delivery Coverage
              </h2>
              
              <div className="grid md:grid-cols-3 gap-6 mb-8">
                {Object.entries(deliveryZones).map(([zoneId, zone]) => (
                  <div 
                    key={zoneId}
                    className={`p-6 rounded-xl border-2 cursor-pointer transition-all ${
                      selectedZone === zoneId 
                        ? 'border-hero-green-500 bg-hero-green-500/10' 
                        : 'border-slate-600 bg-slate-700/30 hover:border-slate-500'
                    }`}
                    onClick={() => setSelectedZone(zoneId)}
                  >
                    <h3 className="text-lg font-bold text-white mb-2">{zone.name}</h3>
                    <div className="space-y-2 mb-4">
                      {zone.areas.map((area, index) => (
                        <div key={index} className="text-sm text-gray-300">{area}</div>
                      ))}
                    </div>
                    <div className="flex justify-between items-center">
                      <span className={`text-sm font-bold ${zone.fee === 0 ? 'text-hero-green-500' : 'text-amber-500'}`}>
                        {zone.fee === 0 ? 'FREE' : `AED ${zone.fee}`}
                      </span>
                      {zone.nextDay && (
                        <Badge className="bg-amber-500/20 text-amber-500 border-amber-500/30">
                          Next Day
                        </Badge>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              {/* Time Slot Selection */}
              {selectedZone && (
                <div className="mt-8 p-6 bg-slate-700/30 rounded-xl">
                  <h3 className="text-lg font-bold text-white mb-4">Select Delivery Time</h3>
                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
                    {deliveryZones[selectedZone].timeSlots.map((slot, index) => (
                      <button
                        key={index}
                        onClick={() => setSelectedTimeSlot(slot)}
                        className={`p-3 rounded-lg border transition-all ${
                          selectedTimeSlot === slot
                            ? 'border-hero-green-500 bg-hero-green-500/20 text-hero-green-500'
                            : 'border-slate-600 text-gray-300 hover:border-slate-500'
                        }`}
                      >
                        <Clock className="w-4 h-4 mx-auto mb-1" />
                        <div className="text-sm font-medium">{slot}</div>
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Live Tracking Demo */}
          <Card className="glass border-slate-600 mb-12">
            <CardContent className="p-8 bg-gradient-to-br from-slate-800/85 to-slate-900/90 backdrop-blur-sm">
              <h2 className="text-2xl font-bold text-white mb-6 text-center flex items-center justify-center">
                <Navigation className="w-6 h-6 text-dubai-blue-500 mr-2" />
                Live Order Tracking
              </h2>

              <div className="max-w-md mx-auto mb-8">
                <div className="flex gap-2">
                  <input
                    type="text"
                    placeholder="Enter tracking number (e.g., DW2025-001234)"
                    value={trackingNumber}
                    onChange={(e) => setTrackingNumber(e.target.value)}
                    className="flex-1 bg-slate-700 text-white rounded-lg px-4 py-3 border border-slate-600 focus:border-dubai-blue-500 focus:outline-none"
                  />
                  <Button className="bg-dubai-blue-500 hover:bg-dubai-blue-600 text-white px-6">
                    Track
                  </Button>
                </div>
              </div>

              {/* Sample Tracking Timeline */}
              <div className="max-w-2xl mx-auto">
                <h3 className="text-lg font-bold text-white mb-4 text-center">Sample: Order #DW2025-001234</h3>
                <div className="space-y-4">
                  {sampleTracking.map((update, index) => (
                    <div key={index} className="flex items-start space-x-4">
                      <div className={`p-2 rounded-full ${update.completed ? 'bg-slate-700' : 'bg-slate-600'}`}>
                        {update.icon}
                      </div>
                      <div className="flex-1">
                        <div className="flex justify-between items-start">
                          <div>
                            <h4 className={`font-semibold ${update.completed ? 'text-white' : 'text-gray-400'}`}>
                              {update.status}
                            </h4>
                            <p className="text-sm text-gray-400">{update.location}</p>
                          </div>
                          <span className="text-sm text-gray-500">{update.time}</span>
                        </div>
                        {index < sampleTracking.length - 1 && (
                          <div className={`w-px h-8 ml-4 mt-2 ${update.completed ? 'bg-hero-green-500' : 'bg-slate-600'}`}></div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Delivery Features */}
          <div className="grid md:grid-cols-3 gap-8 mb-12">
            <Card className="glass border-slate-600">
              <CardContent className="p-6 bg-gradient-to-br from-slate-900/70 to-slate-800/80 backdrop-blur-sm text-center">
                <div className="w-16 h-16 bg-hero-green-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Truck className="w-8 h-8 text-hero-green-500" />
                </div>
                <h3 className="text-lg font-bold text-white mb-2">Electric Fleet</h3>
                <p className="text-gray-300 text-sm mb-4">100% electric delivery vehicles reducing carbon footprint by 80%</p>
                <Badge className="bg-hero-green-500/20 text-hero-green-500 border-hero-green-500/30">
                  Zero Emissions
                </Badge>
              </CardContent>
            </Card>

            <Card className="glass border-slate-600">
              <CardContent className="p-6 bg-gradient-to-br from-slate-900/70 to-slate-800/80 backdrop-blur-sm text-center">
                <div className="w-16 h-16 bg-dubai-blue-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Shield className="w-8 h-8 text-dubai-blue-500" />
                </div>
                <h3 className="text-lg font-bold text-white mb-2">Secure Handling</h3>
                <p className="text-gray-300 text-sm mb-4">Temperature-controlled transport for water systems and electronics</p>
                <Badge className="bg-dubai-blue-500/20 text-dubai-blue-500 border-dubai-blue-500/30">
                  Climate Controlled
                </Badge>
              </CardContent>
            </Card>

            <Card className="glass border-slate-600">
              <CardContent className="p-6 bg-gradient-to-br from-slate-900/70 to-slate-800/80 backdrop-blur-sm text-center">
                <div className="w-16 h-16 bg-amber-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Star className="w-8 h-8 text-amber-500" />
                </div>
                <h3 className="text-lg font-bold text-white mb-2">5-Star Service</h3>
                <p className="text-gray-300 text-sm mb-4">Professional installation and setup by certified technicians</p>
                <Badge className="bg-amber-500/20 text-amber-500 border-amber-500/30">
                  Expert Setup
                </Badge>
              </CardContent>
            </Card>
          </div>

          {/* Community Delivery Network */}
          <Card className="glass border-slate-600 mb-12">
            <CardContent className="p-8 bg-gradient-to-br from-slate-900/80 to-slate-800/90 backdrop-blur-sm">
              <h2 className="text-2xl font-bold text-white mb-6 text-center flex items-center justify-center">
                <Users className="w-6 h-6 text-amber-500 mr-2" />
                Community Delivery Heroes
              </h2>
              
              <div className="grid md:grid-cols-2 gap-8 mb-8">
                <div>
                  <h3 className="text-lg font-bold text-white mb-4">Become a Delivery Partner</h3>
                  <ul className="space-y-3 text-gray-300">
                    <li className="flex items-center">
                      <CheckCircle className="w-5 h-5 text-hero-green-500 mr-3" />
                      Earn AED 150-300 per day
                    </li>
                    <li className="flex items-center">
                      <CheckCircle className="w-5 h-5 text-hero-green-500 mr-3" />
                      Flexible working hours
                    </li>
                    <li className="flex items-center">
                      <CheckCircle className="w-5 h-5 text-hero-green-500 mr-3" />
                      Use your own vehicle or ours
                    </li>
                    <li className="flex items-center">
                      <CheckCircle className="w-5 h-5 text-hero-green-500 mr-3" />
                      Weekly payouts + bonuses
                    </li>
                    <li className="flex items-center">
                      <CheckCircle className="w-5 h-5 text-hero-green-500 mr-3" />
                      Environmental impact rewards
                    </li>
                  </ul>
                </div>
                
                <div>
                  <h3 className="text-lg font-bold text-white mb-4">Join Our Mission</h3>
                  <p className="text-gray-300 mb-6">
                    Be part of Dubai's green transformation. Every delivery helps build a sustainable future while earning you competitive income.
                  </p>
                  
                  <div className="space-y-4">
                    <Button className="w-full bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-black py-3 font-bold">
                      <Users className="mr-2 w-5 h-5" />
                      Apply to Become a Driver
                    </Button>
                    
                    <div className="grid grid-cols-2 gap-4 text-center">
                      <div className="p-3 bg-slate-700/50 rounded-lg">
                        <div className="text-2xl font-bold text-hero-green-500">247</div>
                        <div className="text-sm text-gray-400">Active Drivers</div>
                      </div>
                      <div className="p-3 bg-slate-700/50 rounded-lg">
                        <div className="text-2xl font-bold text-dubai-blue-500">4.8★</div>
                        <div className="text-sm text-gray-400">Average Rating</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Contact & Support */}
          <Card className="glass border-slate-600">
            <CardContent className="p-8 bg-gradient-to-br from-slate-900/80 to-slate-800/90 backdrop-blur-sm">
              <h2 className="text-2xl font-bold text-white mb-6 text-center flex items-center justify-center">
                <Headphones className="w-6 h-6 text-hero-green-500 mr-2" />
                24/7 Delivery Support
              </h2>
              
              <div className="grid md:grid-cols-3 gap-6 text-center">
                <div>
                  <Phone className="w-8 h-8 text-dubai-blue-500 mx-auto mb-3" />
                  <h3 className="font-bold text-white mb-2">Emergency Support</h3>
                  <a href="tel:+971523906019" className="text-dubai-blue-500 hover:underline">
                    +971 52 390 6019
                  </a>
                  <p className="text-sm text-gray-400 mt-1">24/7 Hotline</p>
                </div>
                
                <div>
                  <Calendar className="w-8 h-8 text-hero-green-500 mx-auto mb-3" />
                  <h3 className="font-bold text-white mb-2">Schedule Delivery</h3>
                  <a href="mailto:delivery@deliwer.com" className="text-hero-green-500 hover:underline">
                    delivery@deliwer.com
                  </a>
                  <p className="text-sm text-gray-400 mt-1">Custom scheduling</p>
                </div>
                
                <div>
                  <AlertCircle className="w-8 h-8 text-amber-500 mx-auto mb-3" />
                  <h3 className="font-bold text-white mb-2">Report Issues</h3>
                  <a href="https://wa.me/971523906019" className="text-amber-500 hover:underline">
                    WhatsApp Support
                  </a>
                  <p className="text-sm text-gray-400 mt-1">Instant messaging</p>
                </div>
              </div>
              
              <div className="text-center mt-8">
                <p className="text-gray-300 mb-4">
                  Track your delivery, schedule pickup, or report any issues through our integrated support system
                </p>
                <Button className="bg-gradient-to-r from-hero-green-500 to-dubai-blue-500 hover:from-hero-green-600 hover:to-dubai-blue-600 text-white px-8 py-3 font-bold">
                  <Headphones className="mr-2 w-5 h-5" />
                  Contact Support Center
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
}