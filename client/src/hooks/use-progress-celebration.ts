import { useState, useCallback } from "react";

interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  color: string;
  bgColor: string;
  points: number;
  isNew?: boolean;
}

interface ProgressChange {
  from: number;
  to: number;
  category: string;
}

interface ImpactStats {
  bottlesPrevented: number;
  co2Saved: number;
  pointsEarned: number;
}

interface CelebrationData {
  achievements: Achievement[];
  progressChange: ProgressChange;
  impactStats: ImpactStats;
}

export function useProgressCelebration() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [celebrationData, setCelebrationData] = useState<CelebrationData | null>(null);

  const showCelebration = useCallback((data: CelebrationData) => {
    setCelebrationData(data);
    setIsModalOpen(true);
  }, []);

  const hideCelebration = useCallback(() => {
    setIsModalOpen(false);
    // Clear data after animation completes
    setTimeout(() => {
      setCelebrationData(null);
    }, 300);
  }, []);

  const triggerTradeSuccessCelebration = useCallback((tradeValue: number, deviceType: string) => {
    // Calculate impact based on trade value
    const bottlesPrevented = Math.floor(tradeValue / 2); // Rough calculation
    const co2Saved = Math.floor(tradeValue * 0.002); // Rough calculation
    const pointsEarned = Math.floor(tradeValue * 2);
    
    // Determine progress increase based on trade value
    const progressIncrease = Math.min(Math.floor(tradeValue / 100), 5);
    
    const achievements: Achievement[] = [
      {
        id: "successful-trade",
        title: "Trade Completed!",
        description: `Successfully traded ${deviceType} for AED ${tradeValue}`,
        icon: "🎯",
        color: "text-emerald-500",
        bgColor: "bg-emerald-500/20",
        points: pointsEarned,
        isNew: true
      }
    ];

    // Add bonus achievements based on trade value
    if (tradeValue >= 1000) {
      achievements.push({
        id: "high-value-trade",
        title: "High Value Trade",
        description: "Completed a trade worth AED 1000+",
        icon: "💎",
        color: "text-purple-500",
        bgColor: "bg-purple-500/20",
        points: 500,
        isNew: true
      });
    }

    if (bottlesPrevented >= 50) {
      achievements.push({
        id: "bottle-saver",
        title: "Bottle Saver",
        description: `Prevented ${bottlesPrevented} plastic bottles from waste`,
        icon: "🍼",
        color: "text-blue-500",
        bgColor: "bg-blue-500/20",
        points: 250,
        isNew: true
      });
    }

    showCelebration({
      achievements,
      progressChange: {
        from: 60, // Current progress
        to: Math.min(60 + progressIncrease, 100),
        category: "Dubai 2030 Environmental"
      },
      impactStats: {
        bottlesPrevented,
        co2Saved,
        pointsEarned
      }
    });
  }, [showCelebration]);

  const triggerMilestoneCelebration = useCallback((milestone: string, progress: number) => {
    const achievements: Achievement[] = [
      {
        id: `milestone-${milestone}`,
        title: `${milestone} Milestone!`,
        description: `Reached ${progress}% of Dubai 2030 goals`,
        icon: "🏆",
        color: "text-amber-500",
        bgColor: "bg-amber-500/20",
        points: progress * 10,
        isNew: true
      }
    ];

    showCelebration({
      achievements,
      progressChange: {
        from: Math.max(progress - 10, 0),
        to: progress,
        category: "Dubai 2030 Environmental"
      },
      impactStats: {
        bottlesPrevented: Math.floor(progress * 20),
        co2Saved: Math.floor(progress * 5),
        pointsEarned: progress * 10
      }
    });
  }, [showCelebration]);

  const triggerLevelUpCelebration = useCallback((newLevel: string, points: number) => {
    const achievements: Achievement[] = [
      {
        id: `level-${newLevel}`,
        title: "Level Up!",
        description: `Reached ${newLevel} Hero status`,
        icon: "⭐",
        color: "text-amber-500",
        bgColor: "bg-amber-500/20",
        points: 1000,
        isNew: true
      }
    ];

    showCelebration({
      achievements,
      progressChange: {
        from: 60,
        to: 65,
        category: "Hero Level Progress"
      },
      impactStats: {
        bottlesPrevented: Math.floor(points / 10),
        co2Saved: Math.floor(points / 50),
        pointsEarned: points
      }
    });
  }, [showCelebration]);

  return {
    isModalOpen,
    celebrationData,
    showCelebration,
    hideCelebration,
    triggerTradeSuccessCelebration,
    triggerMilestoneCelebration,
    triggerLevelUpCelebration
  };
}