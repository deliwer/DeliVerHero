import { useState, useEffect } from "react";
import { TrendingUp, Award, Droplets, Zap } from "lucide-react";
import { Card } from "@/components/ui/card";

interface ActivityItem {
  id: string;
  user: string;
  action: string;
  value: string;
  timestamp: string;
  type: 'hero' | 'trade' | 'milestone' | 'challenge';
}

export function LiveActivityFeed() {
  const [activities, setActivities] = useState<ActivityItem[]>([]);

  useEffect(() => {
    // Simulate live activity updates
    const mockActivities: ActivityItem[] = [
      {
        id: '1',
        user: 'Sarah M.',
        action: 'just became Level 2 Hero!',
        value: '+500 pts',
        timestamp: '2 min ago',
        type: 'hero'
      },
      {
        id: '2', 
        user: 'Ahmed K.',
        action: 'earned "Water Warrior" badge',
        value: 'Badge unlock',
        timestamp: '5 min ago',
        type: 'milestone'
      },
      {
        id: '3',
        user: 'Fatima A.',
        action: 'prevented 500 bottles today',
        value: '500L saved',
        timestamp: '8 min ago',
        type: 'trade'
      },
      {
        id: '4',
        user: 'Omar R.',
        action: 'completed iPhone 14 trade',
        value: 'AED 1,200',
        timestamp: '12 min ago',
        type: 'trade'
      },
      {
        id: '5',
        user: 'Layla H.',
        action: 'joined Dubai leaderboard',
        value: 'Rank #45',
        timestamp: '15 min ago',
        type: 'hero'
      }
    ];

    setActivities(mockActivities);

    // Simulate new activity every 10 seconds
    const interval = setInterval(() => {
      const newActivity: ActivityItem = {
        id: Date.now().toString(),
        user: `Hero ${Math.floor(Math.random() * 100)}`,
        action: 'just traded their iPhone!',
        value: `AED ${900 + Math.floor(Math.random() * 600)}`,
        timestamp: 'Just now',
        type: 'trade'
      };
      
      setActivities(prev => [newActivity, ...prev.slice(0, 4)]);
    }, 10000);

    return () => clearInterval(interval);
  }, []);

  const getIcon = (type: ActivityItem['type']) => {
    switch (type) {
      case 'hero': return <Award className="w-4 h-4 text-hero-green-500" />;
      case 'trade': return <TrendingUp className="w-4 h-4 text-amber-500" />;
      case 'milestone': return <Zap className="w-4 h-4 text-dubai-blue-500" />;
      case 'challenge': return <Droplets className="w-4 h-4 text-blue-400" />;
      default: return <TrendingUp className="w-4 h-4 text-gray-400" />;
    }
  };

  return (
    <Card className="glass border border-slate-600 p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-bold text-white flex items-center">
          <TrendingUp className="w-5 h-5 mr-2 text-hero-green-500" />
          LIVE: Planet Heroes in Action
        </h3>
        <div className="flex items-center text-xs text-hero-green-400">
          <div className="w-2 h-2 bg-hero-green-400 rounded-full mr-2 animate-pulse"></div>
          Live Updates
        </div>
      </div>

      <div className="space-y-4 max-h-64 overflow-y-auto">
        {activities.map((activity) => (
          <div 
            key={activity.id} 
            className="flex items-center justify-between p-3 glass-light rounded-lg border border-slate-700 hover:border-hero-green-500/30 transition-all duration-300"
          >
            <div className="flex items-center space-x-3">
              {getIcon(activity.type)}
              <div>
                <p className="text-white text-sm">
                  <span className="font-semibold text-hero-green-400">{activity.user}</span>
                  {" " + activity.action}
                </p>
                <p className="text-gray-400 text-xs">{activity.timestamp}</p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-amber-500 font-bold text-sm">{activity.value}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6 text-center">
        <div className="inline-flex items-center px-4 py-2 glass rounded-full border border-hero-green-500/30">
          <Zap className="w-4 h-4 text-amber-500 mr-2" />
          <span className="text-white font-medium">YOU could be next! Start your hero journey</span>
        </div>
      </div>
    </Card>
  );
}