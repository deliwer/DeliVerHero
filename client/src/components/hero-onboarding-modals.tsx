import { useState } from "react";
import { Trophy, Users, Target } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

// Hero Registration Modal Component
interface HeroRegistrationModalProps {
  open: boolean;
  onClose: () => void;
  onSuccess: (hero: any) => void;
}

export function HeroRegistrationModal({ open, onClose, onSuccess }: HeroRegistrationModalProps) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phoneModel: '',
    phoneCondition: '',
    dubaiZone: 'Dubai Marina'
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      // Calculate estimated trade value based on phone condition
      const tradeValue = calculateTradeValue(formData.phoneModel, formData.phoneCondition);
      
      const heroData = {
        ...formData,
        tradeValue,
        points: 0,
        level: "Bronze Hero"
      };
      
      // Simulate API call - replace with actual API call later
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      onSuccess(heroData);
    } catch (error) {
      console.error('Registration failed:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const calculateTradeValue = (model: string, condition: string) => {
    const baseValues: { [key: string]: number } = {
      'iPhone 15 Pro Max': 2800,
      'iPhone 15 Pro': 2400,
      'iPhone 15': 2000,
      'iPhone 14 Pro Max': 2200,
      'iPhone 14 Pro': 1800,
      'iPhone 14': 1400,
      'iPhone 13 Pro Max': 1600,
      'iPhone 13 Pro': 1200,
      'iPhone 13': 1000,
      'iPhone 12 Pro Max': 1200,
      'iPhone 12 Pro': 900,
      'iPhone 12': 700,
    };
    
    const conditionMultipliers: { [key: string]: number } = {
      'Excellent': 0.9,
      'Good': 0.75,
      'Fair': 0.6,
      'Poor': 0.4
    };
    
    const baseValue = baseValues[model] || 500;
    const multiplier = conditionMultipliers[condition] || 0.5;
    
    return Math.round(baseValue * multiplier);
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md bg-slate-900 border-slate-700">
        <DialogHeader>
          <DialogTitle className="text-white text-center flex items-center justify-center gap-2">
            <Trophy className="w-6 h-6 text-amber-500" />
            Join as Planet Hero
          </DialogTitle>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label className="text-gray-300">Name</Label>
            <Input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
              className="bg-slate-800 border-slate-600 text-white"
              placeholder="Your full name"
              required
              data-testid="input-hero-name"
            />
          </div>
          
          <div>
            <Label className="text-gray-300">Email</Label>
            <Input
              type="email"
              value={formData.email}
              onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
              className="bg-slate-800 border-slate-600 text-white"
              placeholder="your@email.com"
              required
              data-testid="input-hero-email"
            />
          </div>
          
          <div>
            <Label className="text-gray-300">iPhone Model</Label>
            <Select value={formData.phoneModel} onValueChange={(value) => setFormData(prev => ({ ...prev, phoneModel: value }))}>
              <SelectTrigger className="bg-slate-800 border-slate-600 text-white" data-testid="select-phone-model">
                <SelectValue placeholder="Select your iPhone" />
              </SelectTrigger>
              <SelectContent className="bg-slate-800 border-slate-600">
                <SelectItem value="iPhone 15 Pro Max">iPhone 15 Pro Max</SelectItem>
                <SelectItem value="iPhone 15 Pro">iPhone 15 Pro</SelectItem>
                <SelectItem value="iPhone 15">iPhone 15</SelectItem>
                <SelectItem value="iPhone 14 Pro Max">iPhone 14 Pro Max</SelectItem>
                <SelectItem value="iPhone 14 Pro">iPhone 14 Pro</SelectItem>
                <SelectItem value="iPhone 14">iPhone 14</SelectItem>
                <SelectItem value="iPhone 13 Pro Max">iPhone 13 Pro Max</SelectItem>
                <SelectItem value="iPhone 13 Pro">iPhone 13 Pro</SelectItem>
                <SelectItem value="iPhone 13">iPhone 13</SelectItem>
                <SelectItem value="iPhone 12 Pro Max">iPhone 12 Pro Max</SelectItem>
                <SelectItem value="iPhone 12 Pro">iPhone 12 Pro</SelectItem>
                <SelectItem value="iPhone 12">iPhone 12</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div>
            <Label className="text-gray-300">Phone Condition</Label>
            <Select value={formData.phoneCondition} onValueChange={(value) => setFormData(prev => ({ ...prev, phoneCondition: value }))}>
              <SelectTrigger className="bg-slate-800 border-slate-600 text-white" data-testid="select-phone-condition">
                <SelectValue placeholder="Select condition" />
              </SelectTrigger>
              <SelectContent className="bg-slate-800 border-slate-600">
                <SelectItem value="Excellent">Excellent - Like new</SelectItem>
                <SelectItem value="Good">Good - Minor scratches</SelectItem>
                <SelectItem value="Fair">Fair - Visible wear</SelectItem>
                <SelectItem value="Poor">Poor - Significant damage</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div>
            <Label className="text-gray-300">Dubai Zone</Label>
            <Select value={formData.dubaiZone} onValueChange={(value) => setFormData(prev => ({ ...prev, dubaiZone: value }))}>
              <SelectTrigger className="bg-slate-800 border-slate-600 text-white" data-testid="select-dubai-zone">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="bg-slate-800 border-slate-600">
                <SelectItem value="Dubai Marina">Dubai Marina</SelectItem>
                <SelectItem value="Downtown Dubai">Downtown Dubai</SelectItem>
                <SelectItem value="JBR">Jumeirah Beach Residence</SelectItem>
                <SelectItem value="Business Bay">Business Bay</SelectItem>
                <SelectItem value="DIFC">Dubai International Financial Centre</SelectItem>
                <SelectItem value="Jumeirah">Jumeirah</SelectItem>
                <SelectItem value="Deira">Deira</SelectItem>
                <SelectItem value="Bur Dubai">Bur Dubai</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          {formData.phoneModel && formData.phoneCondition && (
            <div className="bg-green-500/10 border border-green-500/30 rounded-lg p-4">
              <div className="text-center">
                <div className="text-green-400 font-bold text-lg">
                  Estimated Trade Value: AED {calculateTradeValue(formData.phoneModel, formData.phoneCondition)}
                </div>
                <div className="text-gray-400 text-sm">Plus Planet Points rewards!</div>
              </div>
            </div>
          )}
          
          <Button 
            type="submit" 
            disabled={isSubmitting || !formData.name || !formData.email || !formData.phoneModel || !formData.phoneCondition}
            className="w-full bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-400 hover:to-emerald-400 text-black font-bold"
            data-testid="button-submit-registration"
          >
            {isSubmitting ? 'Joining...' : 'Join Planet Heroes'}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}

// Mission Selection Modal Component
interface MissionSelectionModalProps {
  open: boolean;
  onClose: () => void;
  hero: any;
  onMissionSelect: (mission: any) => void;
}

export function MissionSelectionModal({ open, onClose, hero, onMissionSelect }: MissionSelectionModalProps) {
  const missions = [
    {
      id: 'pakistan-flood-relief',
      title: 'Pakistan Flood Relief Mission',
      description: 'Urgent mission to provide clean water access to flood victims in Pakistan',
      category: 'Crisis Response',
      pointsReward: 2500,
      urgency: 'URGENT',
      timeLimit: '7 days',
      icon: '🚨',
      participants: 1247,
      goal: 'Provide clean water for 10,000 families',
      gradient: 'from-red-500 to-orange-500'
    },
    {
      id: 'dubai-water-conservation',
      title: 'Dubai Water Conservation Challenge',
      description: 'Help Dubai reduce water waste by 20% through smart conservation practices',
      category: 'Local Impact',
      pointsReward: 1500,
      urgency: 'HIGH',
      timeLimit: '30 days',
      icon: '💧',
      participants: 856,
      goal: 'Save 1 million liters daily',
      gradient: 'from-blue-500 to-cyan-500'
    },
    {
      id: 'tech-recycling-program',
      title: 'Tech Recycling & Upcycling',
      description: 'Convert old electronics into sustainable solutions for communities',
      category: 'E-Waste',
      pointsReward: 2000,
      urgency: 'MEDIUM',
      timeLimit: '14 days',
      icon: '♻️',
      participants: 623,
      goal: 'Process 5,000 devices',
      gradient: 'from-purple-500 to-pink-500'
    },
    {
      id: 'restaurant-sustainability',
      title: 'Restaurant Rewards Program',
      description: 'Partner with Emily Chilly & B&B Restaurant for sustainable dining',
      category: 'Partnerships',
      pointsReward: 1000,
      urgency: 'MEDIUM',
      timeLimit: 'Ongoing',
      icon: '🍽️',
      participants: 1834,
      goal: 'Reduce food waste 50%',
      gradient: 'from-amber-500 to-yellow-500'
    }
  ];

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-4xl bg-slate-900 border-slate-700 max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-white text-center text-2xl">
            <span className="bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text text-transparent">
              Choose Your First Mission
            </span>
          </DialogTitle>
          {hero && (
            <div className="text-center mt-2">
              <div className="text-gray-300">Welcome, <span className="text-green-400 font-bold">{hero.name}</span>!</div>
              <div className="text-gray-400 text-sm">Select a mission to start earning Planet Points</div>
            </div>
          )}
        </DialogHeader>
        
        <div className="grid gap-4 mt-6">
          {missions.map((mission) => (
            <div
              key={mission.id}
              className={`p-6 bg-gradient-to-r ${mission.gradient}/10 border border-slate-600 rounded-xl hover:border-slate-500 transition-all cursor-pointer group`}
              onClick={() => onMissionSelect(mission)}
              data-testid={`mission-card-${mission.id}`}
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="text-3xl">{mission.icon}</div>
                  <div>
                    <h3 className="text-white font-bold text-lg group-hover:text-green-400 transition-colors">
                      {mission.title}
                    </h3>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="text-gray-400 text-sm">{mission.category}</span>
                      <span className={`text-xs px-2 py-1 rounded-full ${
                        mission.urgency === 'URGENT' ? 'bg-red-500/20 text-red-400' :
                        mission.urgency === 'HIGH' ? 'bg-orange-500/20 text-orange-400' :
                        'bg-blue-500/20 text-blue-400'
                      }`}>
                        {mission.urgency}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-green-400 font-bold text-xl">+{mission.pointsReward} PTS</div>
                  <div className="text-gray-400 text-sm">{mission.timeLimit}</div>
                </div>
              </div>
              
              <p className="text-gray-300 mb-4">{mission.description}</p>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4 text-sm text-gray-400">
                  <div className="flex items-center gap-1">
                    <Users className="w-4 h-4" />
                    {mission.participants.toLocaleString()} heroes
                  </div>
                  <div className="flex items-center gap-1">
                    <Target className="w-4 h-4" />
                    {mission.goal}
                  </div>
                </div>
                <Button
                  size="sm"
                  className="bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-400 hover:to-emerald-400 text-black font-bold"
                  data-testid={`button-select-${mission.id}`}
                >
                  Select Mission
                </Button>
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-6 text-center">
          <Button 
            variant="outline" 
            onClick={onClose}
            className="border-slate-600 text-gray-300 hover:bg-slate-800"
            data-testid="button-browse-later"
          >
            Browse More Missions Later
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}