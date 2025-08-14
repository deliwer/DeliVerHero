import { type Hero, type InsertHero, type TradeIn, type InsertTradeIn, type ImpactStats, type Referral, type UpdateHero, type DubaiChallenge, type DubaiReward } from "@shared/schema";
import { randomUUID } from "crypto";

export interface IStorage {
  // Hero management
  getHero(id: string): Promise<Hero | undefined>;
  getHeroByEmail(email: string): Promise<Hero | undefined>;
  createHero(hero: InsertHero): Promise<Hero>;
  updateHero(id: string, updates: UpdateHero): Promise<Hero | undefined>;
  getTopHeroes(limit?: number): Promise<Hero[]>;
  getAllHeroes(): Promise<Hero[]>;

  // Trade-in management
  createTradeIn(tradeIn: InsertTradeIn): Promise<TradeIn>;
  getTradeInsByHero(heroId: string): Promise<TradeIn[]>;
  updateTradeInStatus(id: string, status: string): Promise<TradeIn | undefined>;

  // Impact stats
  getImpactStats(): Promise<ImpactStats | undefined>;
  updateImpactStats(stats: Partial<ImpactStats>): Promise<ImpactStats>;

  // Referrals
  createReferral(referrerId: string, refereeId: string): Promise<Referral>;
  getReferralsByHero(heroId: string): Promise<Referral[]>;

  // Dubai challenges operations
  getDubaiChallenges(): Promise<DubaiChallenge[]>;
  getDubaiChallenge(id: string): Promise<DubaiChallenge | undefined>;
  joinDubaiChallenge(challengeId: string, heroId: string): Promise<boolean>;
  
  // Dubai rewards operations
  getDubaiRewards(): Promise<DubaiReward[]>;
  getDubaiReward(id: string): Promise<DubaiReward | undefined>;
  claimDubaiReward(rewardId: string, heroId: string): Promise<boolean>;

  // Utility
  calculateTradeValue(phoneModel: string, condition: string): Promise<number>;
}

export class MemStorage implements IStorage {
  private heroes: Map<string, Hero>;
  private tradeIns: Map<string, TradeIn>;
  private impactStats: ImpactStats;
  private referrals: Map<string, Referral>;
  private dubaiChallenges: Map<string, DubaiChallenge>;
  private dubaiRewards: Map<string, DubaiReward>;

  constructor() {
    this.heroes = new Map();
    this.tradeIns = new Map();
    this.referrals = new Map();
    this.dubaiChallenges = new Map();
    this.dubaiRewards = new Map();
    
    // Initialize impact stats
    this.impactStats = {
      id: randomUUID(),
      totalBottlesPrevented: 847392,
      totalCo2Saved: 423700, // in grams (423.7 tons)
      totalRewards: 89200000, // AED 892K in fils
      activeHeroes: 12847,
      updatedAt: new Date(),
    };

    // Seed some initial heroes for the leaderboard
    this.seedInitialData();
    this.seedDubaiRewardsData();
  }

  private seedInitialData() {
    const initialHeroes: Hero[] = [
      {
        id: "founder-1",
        name: "Khalid Al-Mansoori",
        email: "khalid@deliwer.com",
        phoneModel: "iPhone 15 Pro Max",
        phoneCondition: "excellent",
        tradeValue: 1500,
        points: 8750,
        level: "Gold Hero",
        badges: ["Water Warrior", "Eco Champion", "Planet Founder", "Community Leader"],
        bottlesPrevented: 5247,
        co2Saved: 2623,
        referralCount: 23,
        dubaiZone: "Dubai Marina",
        rewardsEarned: [],
        challengesCompleted: [],
        sustainabilityStreak: 15,
        dubaiZone: "Business Bay",
        rewardsEarned: [],
        challengesCompleted: [],
        sustainabilityStreak: 8,
        isActive: true,
        createdAt: new Date("2024-01-15"),
        updatedAt: new Date(),
      },
      {
        id: "founder-2",
        name: "Amira Bin Rashid",
        email: "amira@deliwer.com",
        phoneModel: "iPhone 15 Pro",
        phoneCondition: "excellent",
        tradeValue: 1400,
        points: 7890,
        level: "Gold Hero",
        badges: ["Water Guardian", "Eco Innovator", "Tech Pioneer"],
        bottlesPrevented: 4891,
        co2Saved: 2445,
        referralCount: 18,
        dubaiZone: "Business Bay",
        rewardsEarned: [],
        challengesCompleted: [],
        sustainabilityStreak: 8,
        isActive: true,
        createdAt: new Date("2024-01-20"),
        updatedAt: new Date(),
      },
      {
        id: "founder-3",
        name: "Omar Al-Zaabi",
        email: "omar@deliwer.com",
        phoneModel: "iPhone 14 Pro Max",
        phoneCondition: "excellent",
        tradeValue: 1300,
        points: 7345,
        level: "Gold Hero",
        badges: ["Planet Protector", "Sustainability Expert", "Green Leader"],
        bottlesPrevented: 4156,
        co2Saved: 2078,
        referralCount: 15,
        dubaiZone: "Business Bay",
        rewardsEarned: [],
        challengesCompleted: [],
        sustainabilityStreak: 8,
        isActive: true,
        createdAt: new Date("2024-02-01"),
        updatedAt: new Date(),
      },
      {
        id: "founder-4",
        name: "Fatima Al-Hashimi",
        email: "fatima@deliwer.com",
        phoneModel: "iPhone 15",
        phoneCondition: "excellent",
        tradeValue: 1200,
        points: 6890,
        level: "Gold Hero",
        badges: ["Water Warrior", "Eco Champion", "Impact Driver"],
        bottlesPrevented: 3789,
        co2Saved: 1894,
        referralCount: 14,
        dubaiZone: "Business Bay",
        rewardsEarned: [],
        challengesCompleted: [],
        sustainabilityStreak: 8,
        isActive: true,
        createdAt: new Date("2024-02-15"),
        updatedAt: new Date(),
      },
      {
        id: "founder-5",
        name: "Mohammed Al-Maktoum",
        email: "mohammed@deliwer.com",
        phoneModel: "iPhone 14 Pro",
        phoneCondition: "excellent",
        tradeValue: 1200,
        points: 6234,
        level: "Gold Hero",
        badges: ["Planet Hero", "Community Builder", "Eco Advocate"],
        bottlesPrevented: 3456,
        co2Saved: 1728,
        referralCount: 12,
        dubaiZone: "Business Bay",
        rewardsEarned: [],
        challengesCompleted: [],
        sustainabilityStreak: 8,
        isActive: true,
        createdAt: new Date("2024-03-01"),
        updatedAt: new Date(),
      },
      {
        id: "founder-6",
        name: "Noura Al-Suwaidi",
        email: "noura@deliwer.com",
        phoneModel: "iPhone 13 Pro Max",
        phoneCondition: "excellent",
        tradeValue: 1100,
        points: 5789,
        level: "Silver Hero",
        badges: ["Water Guardian", "Eco Pioneer"],
        bottlesPrevented: 3123,
        co2Saved: 1561,
        referralCount: 11,
        dubaiZone: "Business Bay",
        rewardsEarned: [],
        challengesCompleted: [],
        sustainabilityStreak: 8,
        isActive: true,
        createdAt: new Date("2024-03-15"),
        updatedAt: new Date(),
      },
      {
        id: "founder-7",
        name: "Hassan Al-Nuaimi",
        email: "hassan@deliwer.com",
        phoneModel: "iPhone 14",
        phoneCondition: "excellent",
        tradeValue: 1000,
        points: 5345,
        level: "Silver Hero",
        badges: ["Planet Protector", "Green Innovator"],
        bottlesPrevented: 2891,
        co2Saved: 1445,
        referralCount: 10,
        dubaiZone: "Business Bay",
        rewardsEarned: [],
        challengesCompleted: [],
        sustainabilityStreak: 8,
        isActive: true,
        createdAt: new Date("2024-04-01"),
        updatedAt: new Date(),
      },
      {
        id: "founder-8",
        name: "Mariam Al-Kaabi",
        email: "mariam@deliwer.com",
        phoneModel: "iPhone 13 Pro",
        phoneCondition: "excellent",
        tradeValue: 1000,
        points: 4890,
        level: "Silver Hero",
        badges: ["Water Warrior", "Eco Champion"],
        bottlesPrevented: 2657,
        co2Saved: 1328,
        referralCount: 9,
        dubaiZone: "Business Bay",
        rewardsEarned: [],
        challengesCompleted: [],
        sustainabilityStreak: 8,
        isActive: true,
        createdAt: new Date("2024-04-15"),
        updatedAt: new Date(),
      },
      {
        id: "founder-9",
        name: "Abdullah Al-Mansouri",
        email: "abdullah@deliwer.com",
        phoneModel: "iPhone 12 Pro Max",
        phoneCondition: "excellent",
        tradeValue: 900,
        points: 4456,
        level: "Silver Hero",
        badges: ["Planet Hero", "Community Leader"],
        bottlesPrevented: 2423,
        co2Saved: 1211,
        referralCount: 8,
        dubaiZone: "Business Bay",
        rewardsEarned: [],
        challengesCompleted: [],
        sustainabilityStreak: 8,
        isActive: true,
        createdAt: new Date("2024-05-01"),
        updatedAt: new Date(),
      },
      {
        id: "founder-10",
        name: "Aisha Al-Qasimi",
        email: "aisha@deliwer.com",
        phoneModel: "iPhone 13",
        phoneCondition: "good",
        tradeValue: 850,
        points: 4123,
        level: "Silver Hero",
        badges: ["Water Guardian", "Eco Advocate"],
        bottlesPrevented: 2234,
        co2Saved: 1117,
        referralCount: 7,
        dubaiZone: "Business Bay",
        rewardsEarned: [],
        challengesCompleted: [],
        sustainabilityStreak: 8,
        isActive: true,
        createdAt: new Date("2024-05-15"),
        updatedAt: new Date(),
      },
      {
        id: "founder-11",
        name: "Rashid Al-Mazrouei",
        email: "rashid@deliwer.com",
        phoneModel: "iPhone 12 Pro",
        phoneCondition: "excellent",
        tradeValue: 800,
        points: 3789,
        level: "Silver Hero",
        badges: ["Planet Protector"],
        bottlesPrevented: 2001,
        co2Saved: 1000,
        referralCount: 6,
        dubaiZone: "Business Bay",
        rewardsEarned: [],
        challengesCompleted: [],
        sustainabilityStreak: 8,
        isActive: true,
        createdAt: new Date("2024-06-01"),
        updatedAt: new Date(),
      },
      {
        id: "founder-12",
        name: "Hind Al-Otaiba",
        email: "hind@deliwer.com",
        phoneModel: "iPhone 12",
        phoneCondition: "good",
        tradeValue: 700,
        points: 3456,
        level: "Bronze Hero",
        badges: ["Water Warrior"],
        bottlesPrevented: 1834,
        co2Saved: 917,
        referralCount: 5,
        dubaiZone: "Business Bay",
        rewardsEarned: [],
        challengesCompleted: [],
        sustainabilityStreak: 8,
        isActive: true,
        createdAt: new Date("2024-06-15"),
        updatedAt: new Date(),
      },
      {
        id: "founder-13",
        name: "Saeed Al-Shamsi",
        email: "saeed@deliwer.com",
        phoneModel: "iPhone 11 Pro Max",
        phoneCondition: "excellent",
        tradeValue: 700,
        points: 3234,
        level: "Bronze Hero",
        badges: ["Eco Champion"],
        bottlesPrevented: 1723,
        co2Saved: 861,
        referralCount: 4,
        dubaiZone: "Business Bay",
        rewardsEarned: [],
        challengesCompleted: [],
        sustainabilityStreak: 8,
        isActive: true,
        createdAt: new Date("2024-07-01"),
        updatedAt: new Date(),
      },
      {
        id: "founder-14",
        name: "Layla Al-Dhaheri",
        email: "layla@deliwer.com",
        phoneModel: "iPhone 11 Pro",
        phoneCondition: "good",
        tradeValue: 600,
        points: 2890,
        level: "Bronze Hero",
        badges: ["Planet Hero"],
        bottlesPrevented: 1567,
        co2Saved: 783,
        referralCount: 4,
        dubaiZone: "Business Bay",
        rewardsEarned: [],
        challengesCompleted: [],
        sustainabilityStreak: 8,
        isActive: true,
        createdAt: new Date("2024-07-15"),
        updatedAt: new Date(),
      },
      {
        id: "founder-15",
        name: "Ali Al-Falasi",
        email: "ali@deliwer.com",
        phoneModel: "iPhone 11",
        phoneCondition: "good",
        tradeValue: 500,
        points: 2567,
        level: "Bronze Hero",
        badges: ["Water Guardian"],
        bottlesPrevented: 1389,
        co2Saved: 694,
        referralCount: 3,
        dubaiZone: "Business Bay",
        rewardsEarned: [],
        challengesCompleted: [],
        sustainabilityStreak: 8,
        isActive: true,
        createdAt: new Date("2024-08-01"),
        updatedAt: new Date(),
      },
      {
        id: "community-1",
        name: "Sarah Mitchell",
        email: "sarah.mitchell@community.ae",
        phoneModel: "iPhone 14 Pro",
        phoneCondition: "good",
        tradeValue: 1100,
        points: 2234,
        level: "Bronze Hero",
        badges: ["Community Supporter"],
        bottlesPrevented: 1234,
        co2Saved: 617,
        referralCount: 2,
        dubaiZone: "Business Bay",
        rewardsEarned: [],
        challengesCompleted: [],
        sustainabilityStreak: 8,
        isActive: true,
        createdAt: new Date("2024-08-05"),
        updatedAt: new Date(),
      },
      {
        id: "community-2",
        name: "David Chen",
        email: "david.chen@community.ae",
        phoneModel: "iPhone 13 Pro",
        phoneCondition: "fair",
        tradeValue: 800,
        points: 1987,
        level: "Bronze Hero",
        badges: ["Eco Newcomer"],
        bottlesPrevented: 1098,
        co2Saved: 549,
        referralCount: 2,
        dubaiZone: "Business Bay",
        rewardsEarned: [],
        challengesCompleted: [],
        sustainabilityStreak: 8,
        isActive: true,
        createdAt: new Date("2024-08-08"),
        updatedAt: new Date(),
      },
      {
        id: "community-3",
        name: "Emma Rodriguez",
        email: "emma.rodriguez@community.ae",
        phoneModel: "iPhone 12 Pro",
        phoneCondition: "good",
        tradeValue: 750,
        points: 1756,
        level: "Bronze Hero",
        badges: ["Water Supporter"],
        bottlesPrevented: 967,
        co2Saved: 483,
        referralCount: 1,
        dubaiZone: "Business Bay",
        rewardsEarned: [],
        challengesCompleted: [],
        sustainabilityStreak: 8,
        isActive: true,
        createdAt: new Date("2024-08-10"),
        updatedAt: new Date(),
      },
      {
        id: "community-4",
        name: "James Wilson",
        email: "james.wilson@community.ae",
        phoneModel: "iPhone 11 Pro",
        phoneCondition: "good",
        tradeValue: 600,
        points: 1523,
        level: "Bronze Hero",
        badges: ["Planet Newcomer"],
        bottlesPrevented: 834,
        co2Saved: 417,
        referralCount: 1,
        dubaiZone: "Business Bay",
        rewardsEarned: [],
        challengesCompleted: [],
        sustainabilityStreak: 8,
        isActive: true,
        createdAt: new Date("2024-08-12"),
        updatedAt: new Date(),
      },
      {
        id: "community-5",
        name: "Lisa Thompson",
        email: "lisa.thompson@community.ae",
        phoneModel: "iPhone 12",
        phoneCondition: "fair",
        tradeValue: 550,
        points: 1289,
        level: "Bronze Hero",
        badges: ["Eco Starter"],
        bottlesPrevented: 723,
        co2Saved: 361,
        referralCount: 1,
        dubaiZone: "Business Bay",
        rewardsEarned: [],
        challengesCompleted: [],
        sustainabilityStreak: 8,
        isActive: true,
        createdAt: new Date("2024-08-13"),
        updatedAt: new Date(),
      }
    ];

    initialHeroes.forEach(hero => this.heroes.set(hero.id, hero));
  }

  private seedDubaiRewardsData() {
    // Seed Dubai challenges
    const challenges: DubaiChallenge[] = [
      {
        id: "challenge-1",
        title: "Dubai Marina Water Challenge",
        description: "Install AquaCafe system and reduce 100 plastic bottles this month",
        category: "water",
        targetZone: "Dubai Marina",
        pointsReward: 500,
        rewardItem: "AED 50 voucher + Water Hero badge",
        timeLimit: 30,
        participantLimit: 100,
        currentParticipants: 67,
        isActive: true,
        createdAt: new Date(),
        expiresAt: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
      },
      {
        id: "challenge-2",
        title: "Business Bay Energy Mission",
        description: "Reduce energy consumption by 20% using smart home tech",
        category: "energy",
        targetZone: "Business Bay",
        pointsReward: 750,
        rewardItem: "Smart device upgrade + Energy Hero badge",
        timeLimit: 45,
        participantLimit: 50,
        currentParticipants: 23,
        isActive: true,
        createdAt: new Date(),
        expiresAt: new Date(Date.now() + 45 * 24 * 60 * 60 * 1000),
      }
    ];

    // Seed Dubai rewards
    const rewards: DubaiReward[] = [
      {
        id: "reward-1",
        title: "Burj Khalifa Observation Deck",
        description: "Skip-the-line tickets for Level 148 + 125",
        category: "experience",
        partner: "Emaar Entertainment",
        value: 35000,
        pointsCost: 2500,
        availableQuantity: 10,
        claimedQuantity: 3,
        zoneRestriction: "Downtown Dubai",
        isActive: true,
        createdAt: new Date(),
        expiresAt: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000),
      },
      {
        id: "reward-2",
        title: "Gold Souk Sustainability Shopping",
        description: "AED 200 voucher for eco-certified jewelry",
        category: "voucher",
        partner: "Dubai Gold & Jewellery Group",
        value: 20000,
        pointsCost: 1500,
        availableQuantity: 25,
        claimedQuantity: 8,
        zoneRestriction: null,
        isActive: true,
        createdAt: new Date(),
        expiresAt: new Date(Date.now() + 60 * 24 * 60 * 60 * 1000),
      }
    ];

    challenges.forEach(challenge => this.dubaiChallenges.set(challenge.id, challenge));
    rewards.forEach(reward => this.dubaiRewards.set(reward.id, reward));
  }

  async getHero(id: string): Promise<Hero | undefined> {
    return this.heroes.get(id);
  }

  async getHeroByEmail(email: string): Promise<Hero | undefined> {
    return Array.from(this.heroes.values()).find(hero => hero.email === email);
  }

  async createHero(insertHero: InsertHero): Promise<Hero> {
    const id = randomUUID();
    const points = 100; // Base points for trade-in
    const bottlesPrevented = Math.floor(insertHero.tradeValue / 0.5); // ~0.5 AED per bottle
    const co2Saved = Math.floor(bottlesPrevented * 0.5); // 0.5g CO2 per bottle
    
    let level = "Bronze Hero";
    if (points >= 600) level = "Gold Hero";
    else if (points >= 300) level = "Silver Hero";

    const hero: Hero = {
      id,
      ...insertHero,
      points,
      level,
      badges: ["Water Warrior"],
      bottlesPrevented,
      co2Saved,
      referralCount: 0,
      dubaiZone: "Business Bay",
        rewardsEarned: [],
        challengesCompleted: [],
        sustainabilityStreak: 8,
        isActive: true,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    
    this.heroes.set(id, hero);
    
    // Update impact stats
    this.impactStats.totalBottlesPrevented += bottlesPrevented;
    this.impactStats.totalCo2Saved += co2Saved;
    this.impactStats.totalRewards += insertHero.tradeValue * 100; // Convert to fils
    this.impactStats.activeHeroes += 1;
    this.impactStats.updatedAt = new Date();
    
    return hero;
  }

  async updateHero(id: string, updates: UpdateHero): Promise<Hero | undefined> {
    const hero = this.heroes.get(id);
    if (!hero) return undefined;

    const updatedHero: Hero = {
      ...hero,
      ...updates,
      updatedAt: new Date(),
    };

    this.heroes.set(id, updatedHero);
    return updatedHero;
  }

  async getTopHeroes(limit: number = 10): Promise<Hero[]> {
    return Array.from(this.heroes.values())
      .filter(hero => hero.isActive)
      .sort((a, b) => b.points - a.points)
      .slice(0, limit);
  }

  async getAllHeroes(): Promise<Hero[]> {
    return Array.from(this.heroes.values()).filter(hero => hero.isActive);
  }

  async createTradeIn(insertTradeIn: InsertTradeIn): Promise<TradeIn> {
    const id = randomUUID();
    const tradeIn: TradeIn = {
      id,
      ...insertTradeIn,
      pickupAddress: insertTradeIn.pickupAddress || null,
      pickupDate: insertTradeIn.pickupDate || null,
      status: "pending",
      completedAt: null,
      createdAt: new Date(),
    };
    
    this.tradeIns.set(id, tradeIn);
    return tradeIn;
  }

  async getTradeInsByHero(heroId: string): Promise<TradeIn[]> {
    return Array.from(this.tradeIns.values()).filter(tradeIn => tradeIn.heroId === heroId);
  }

  async updateTradeInStatus(id: string, status: string): Promise<TradeIn | undefined> {
    const tradeIn = this.tradeIns.get(id);
    if (!tradeIn) return undefined;

    const updatedTradeIn: TradeIn = {
      ...tradeIn,
      status,
      completedAt: status === "completed" ? new Date() : tradeIn.completedAt,
    };

    this.tradeIns.set(id, updatedTradeIn);
    return updatedTradeIn;
  }

  async getImpactStats(): Promise<ImpactStats> {
    return this.impactStats;
  }

  async updateImpactStats(stats: Partial<ImpactStats>): Promise<ImpactStats> {
    this.impactStats = {
      ...this.impactStats,
      ...stats,
      updatedAt: new Date(),
    };
    return this.impactStats;
  }

  async createReferral(referrerId: string, refereeId: string): Promise<Referral> {
    const id = randomUUID();
    const referral: Referral = {
      id,
      referrerId,
      refereeId,
      pointsEarned: 50,
      createdAt: new Date(),
    };
    
    this.referrals.set(id, referral);
    
    // Update referrer's points and referral count
    const referrer = this.heroes.get(referrerId);
    if (referrer) {
      await this.updateHero(referrerId, {
        points: referrer.points + 50,
        referralCount: referrer.referralCount + 1,
      });
    }
    
    return referral;
  }

  async getReferralsByHero(heroId: string): Promise<Referral[]> {
    return Array.from(this.referrals.values()).filter(referral => referral.referrerId === heroId);
  }

  async getDubaiChallenges(): Promise<DubaiChallenge[]> {
    return Array.from(this.dubaiChallenges.values()).filter(challenge => challenge.isActive);
  }

  async getDubaiChallenge(id: string): Promise<DubaiChallenge | undefined> {
    return this.dubaiChallenges.get(id);
  }

  async joinDubaiChallenge(challengeId: string, heroId: string): Promise<boolean> {
    const challenge = this.dubaiChallenges.get(challengeId);
    const hero = this.heroes.get(heroId);
    
    if (!challenge || !hero || !challenge.isActive) {
      return false;
    }

    if (challenge.participantLimit && challenge.currentParticipants >= challenge.participantLimit) {
      return false;
    }

    const updatedChallenge = {
      ...challenge,
      currentParticipants: challenge.currentParticipants + 1
    };
    this.dubaiChallenges.set(challengeId, updatedChallenge);

    const challengesCompleted = Array.isArray(hero.challengesCompleted) ? hero.challengesCompleted : [];
    const updatedHero = {
      ...hero,
      challengesCompleted: [...challengesCompleted, challengeId],
      updatedAt: new Date()
    };
    this.heroes.set(heroId, updatedHero);

    return true;
  }

  async getDubaiRewards(): Promise<DubaiReward[]> {
    return Array.from(this.dubaiRewards.values()).filter(reward => reward.isActive);
  }

  async getDubaiReward(id: string): Promise<DubaiReward | undefined> {
    return this.dubaiRewards.get(id);
  }

  async claimDubaiReward(rewardId: string, heroId: string): Promise<boolean> {
    const reward = this.dubaiRewards.get(rewardId);
    const hero = this.heroes.get(heroId);
    
    if (!reward || !hero || !reward.isActive) {
      return false;
    }

    if (hero.points < reward.pointsCost) {
      return false;
    }

    if (reward.availableQuantity && reward.claimedQuantity >= reward.availableQuantity) {
      return false;
    }

    const updatedReward = {
      ...reward,
      claimedQuantity: reward.claimedQuantity + 1
    };
    this.dubaiRewards.set(rewardId, updatedReward);

    const rewardsEarned = Array.isArray(hero.rewardsEarned) ? hero.rewardsEarned : [];
    const updatedHero = {
      ...hero,
      points: hero.points - reward.pointsCost,
      rewardsEarned: [...rewardsEarned, rewardId],
      updatedAt: new Date()
    };
    this.heroes.set(heroId, updatedHero);

    return true;
  }

  async calculateTradeValue(phoneModel: string, condition: string): Promise<number> {
    const baseValues: Record<string, number> = {
      "iPhone 15 Pro Max": 1500,
      "iPhone 15 Pro": 1400,
      "iPhone 15": 1200,
      "iPhone 14 Pro Max": 1300,
      "iPhone 14 Pro": 1200,
      "iPhone 14": 1000,
      "iPhone 13 Pro Max": 1100,
      "iPhone 13 Pro": 1000,
      "iPhone 13": 900,
      "iPhone 12 Pro Max": 900,
      "iPhone 12 Pro": 800,
      "iPhone 12": 700,
      "iPhone 11 Pro Max": 700,
      "iPhone 11 Pro": 600,
      "iPhone 11": 500,
    };

    const conditionMultipliers: Record<string, number> = {
      "excellent": 1.0,
      "good": 0.85,
      "fair": 0.65,
      "poor": 0.4,
    };

    const baseValue = baseValues[phoneModel] || 300;
    const multiplier = conditionMultipliers[condition] || 0.4;
    
    return Math.floor(baseValue * multiplier);
  }
}

export const storage = new MemStorage();
